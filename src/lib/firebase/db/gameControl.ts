import { ref, update, set, push, get, child } from "firebase/database";
import { realtimeDB } from "../firebase";
import { CustomError } from "../../error";
import { MembersInfoListType, MembersType, UserInfoType } from "@/types/users";
import { RoomsInfoType } from "@/types/rooms";
import { DBType } from "@/types/db";
import { CardType, GamesInfoType, RoleType } from "@/types/games";
import { removeCookiesInRoom } from "@/lib/cookies/cookies";

// カードのリストを人数分に分けた二次元配列にする
const splitArrayIntoChunks = (array: string[], chunkSize: number) => {
  const chunks = [];
  while (array.length) {
    chunks.push(array.splice(0, chunkSize));
  }
  return chunks;
};

export const startGame = async (roomId: string) => {
  const dbRef = ref(realtimeDB);
  const snapshot = await get(child(dbRef, `${roomId}`));
  const allDataInRoom: DBType = await snapshot.val();
  if (!allDataInRoom) {
    throw new CustomError("ルームが存在しません。");
  }

  const roomsInfo = allDataInRoom.rooms;
  const membersInfo = allDataInRoom.members;
  const membersInfoList = membersInfo.members_list;
  const membersNum = membersInfoList.length;

  if (membersNum < 2) {
    throw new CustomError("2人以上でないとゲームを始めることはできません。");
  }

  // ルームのステータスを変更
  const roomsInfoChangedStatus = {
    ...roomsInfo,
    status: "inGame",
  };

  // ゲーム情報を新規に作成
  const gamesInfo: GamesInfoType = {
    processor: Math.floor(Math.random() * membersNum),
    result: "しーん",
    release_num: membersNum >= 3 ? membersNum : 3,
    success_num: 0,
    winner: "",
  };

  // Userのゲームでの役割やカードの設定
  const silenceCardNum = membersNum >= 3 ? membersNum * 4 - 1 : 11;
  const releaseCardNum = membersNum >= 3 ? membersNum : 3;
  const cardsList: CardType[] = [];
  cardsList.push("Boom");
  for (let i = 1; i <= silenceCardNum; i++) {
    cardsList.push("しーん");
  }
  for (let j = 1; j <= releaseCardNum; j++) {
    cardsList.push("解除");
  }
  // cardリストをランダムに入れ替える
  cardsList.sort(() => Math.random() - 0.5);

  const splitedCardsList = splitArrayIntoChunks(
    cardsList,
    membersNum >= 3 ? 5 : 8
  ) as CardType[][];

  // ボマーとなるuserIdを決定
  const roleList: RoleType[] = (() => {
    switch (membersNum) {
      case 2:
        return ["polis", "bomber"];
      case 3:
        return ["polis", "polis", "bomber", "bomber"];
      case 4:
        return ["polis", "polis", "polis", "bomber", "bomber"];
      case 5:
        return ["polis", "polis", "polis", "bomber", "bomber"];
      case 6:
        return ["polis", "polis", "polis", "polis", "bomber", "bomber"];
      case 7:
        return [
          "polis",
          "polis",
          "polis",
          "polis",
          "bomber",
          "bomber",
          "bomber",
        ];
      case 8:
        return [
          "polis",
          "polis",
          "polis",
          "polis",
          "bomber",
          "bomber",
          "bomber",
        ];
      default:
        return [];
    }
  })();
  roleList.sort(() => Math.random() - 0.5);

  const membersInfoListAddedInfo = membersInfoList.map(
    (membersInfo, userId) => {
      // myCardsは自分のプロフィールで表示する時順番がわからないようにランダムに並び替えて表示
      const myCards = splitedCardsList[userId].concat();
      myCards.sort(() => Math.random() - 0.5);

      return {
        ...membersInfo,
        role: roleList[userId],
        hidden_cards: splitedCardsList[userId],
        my_cards: myCards,
        show_cards: [],
      } satisfies UserInfoType;
    }
  );

  await update(child(dbRef, `${roomId}`), {
    members: {
      existed_last_id: membersInfo.existed_last_id,
      members_list: membersInfoListAddedInfo,
    },
    rooms: roomsInfoChangedStatus,
    games: gamesInfo,
  });
};

export const selectCard = async (
  roomId: string,
  targetUserId: number,
  targetCardIndex: number
) => {
  const dbRef = ref(realtimeDB);
  const snapshot = await get(child(dbRef, `${roomId}`));
  const allDataInRoom: DBType = await snapshot.val();
  if (!allDataInRoom) {
    throw new CustomError("ルームが存在しません。");
  }

  const gamesInfo = allDataInRoom.games!;
  const membersInfo = allDataInRoom.members;

  // member情報の更新
  const membersInfoList: MembersInfoListType = membersInfo.members_list;
  const changedMembersInfoList = membersInfoList.concat();
  const targetUserInfo = changedMembersInfoList[targetUserId];
  // 対象のカード名を抽出し、hidden_cardsから削除
  const targetCardName = targetUserInfo.hidden_cards!.splice(
    targetCardIndex,
    1
  )[0];
  // 対象のカードをshow_cardsに追加
  targetUserInfo.show_cards = [
    ...(targetUserInfo.show_cards ?? []),
    targetCardName,
  ];

  // game情報の更新
  const changedSuccessNum =
    gamesInfo.success_num + (targetCardName == "解除" ? 1 : 0);
  const changedWinner = (() => {
    if (changedSuccessNum >= gamesInfo.release_num) {
      return "polis";
    }
    if (targetCardName == "Boom") {
      return "bomber";
    }
    return "";
  })();

  const changedGamesInfo: GamesInfoType = {
    ...gamesInfo,
    processor: targetUserId,
    result: targetCardName,
    success_num: changedSuccessNum,
    winner: changedWinner,
  };

  await update(child(dbRef, `${roomId}`), {
    ...allDataInRoom,
    games: changedGamesInfo,
    members: {
      existed_last_id: membersInfo.existed_last_id,
      members_list: changedMembersInfoList,
    } satisfies MembersType,
  });
};

export const continueGame = async (roomId: string) => {
  const dbRef = ref(realtimeDB);
  const snapshot = await get(child(dbRef, `${roomId}/rooms`));
  const roomsInfo: RoomsInfoType = await snapshot.val();

  if (!roomsInfo) {
    throw new CustomError("ルームが存在しません。");
  }

  await update(child(dbRef, `${roomId}/rooms`), {
    ...roomsInfo,
    status: "waiting",
  } satisfies RoomsInfoType);
};

export const finishGame = async (roomId: string) => {
  const dbRef = ref(realtimeDB);
  const snapshot = await get(child(dbRef, `${roomId}/rooms`));
  const roomsInfo: RoomsInfoType = await snapshot.val();

  if (!roomsInfo) {
    throw new CustomError("ルームが存在しません。");
  }

  await update(child(dbRef, `${roomId}/rooms`), {
    ...roomsInfo,
    status: "finish",
  } satisfies RoomsInfoType);
};
