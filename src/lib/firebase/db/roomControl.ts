import { ref, update, set, push, get, child } from "firebase/database";
import { realtimeDB } from "../firebase";
import { CustomError } from "../../error";
import { MembersInfoListType, UserInfoType } from "@/types/users";
import { RoomsInfoType } from "@/types/rooms";
import { confirmCookiesInRoom } from "@/lib/cookies/cookies";

// シークレットIDの生成
const generateSecretId = (): string => {
  const idLength = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let secretId = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    secretId += characters.charAt(randomIndex);
  }

  return secretId;
};

// ルームの確認
export const confirmRoom = async (roomId: string, secretId: string) => {
  const dbRef = ref(realtimeDB);
  const snapshotRooms = await get(child(dbRef, `${roomId}/rooms`));
  const roomsInfo: RoomsInfoType = await snapshotRooms.val();

  if (!roomsInfo) {
    throw new CustomError("ルームが存在しません。");
  }
  if (roomsInfo.secret_id != secretId) {
    throw new CustomError("secretIdが一致しませんでした。");
  }

  return roomsInfo.status;
};

// ルームの作成
export const createRoom = async () => {
  const secretId = generateSecretId();

  const postListRefRooms = ref(realtimeDB, "/");
  const newPostRefRooms = push(postListRefRooms);
  await set(newPostRefRooms, {
    rooms: { secret_id: secretId, status: "waiting" } satisfies RoomsInfoType,
    members: {
      existed_last_id: 0,
      members_list: [
        {
          user_name: "user0",
          user_type: "admin",
        },
      ] satisfies MembersInfoListType,
    },
  });

  const roomId = newPostRefRooms.key;
  if (!roomId) {
    throw new CustomError("エラーが発生しルームを作成できませんでした。");
  }

  return {
    roomId: roomId,
    secretId: secretId,
    userId: 0,
  };
};

// ルーム参加
export const loginRoom = async (
  roomId: string
): Promise<{
  roomId: string;
  secretId: string;
  userId: number;
}> => {
  const dbRef = ref(realtimeDB);
  const snapshotRooms = await get(child(dbRef, `${roomId}/rooms`));
  const roomsInfo: RoomsInfoType = await snapshotRooms.val();
  if (!roomsInfo) {
    throw new CustomError("ルームが存在しません。");
  }

  const secretId = roomsInfo.secret_id;
  // cookieにそのルームの情報が保存されていれば、新規には登録せずにログイン
  const roomCookies = confirmCookiesInRoom();
  if (roomCookies.secretId == secretId && roomCookies.userId != null) {
    return {
      roomId: roomId,
      secretId: secretId,
      userId: Number(roomCookies.userId),
    };
  }

  if (roomsInfo.status != "waiting") {
    throw new CustomError(
      "こちらのルームはゲーム中またはゲームが終了しているため参加できません。"
    );
  }

  const snapshotMembers = await get(child(dbRef, `${roomId}/members`));
  const membersInfo = await snapshotMembers.val();

  if (!membersInfo) {
    throw new CustomError("ルームが存在しません。");
  }

  const membersInfoList: MembersInfoListType = membersInfo.members_list;
  if (membersInfoList.length >= 8) {
    throw new CustomError(
      "ルーム内の人数がすでに上限に達しているため参加できません。"
    );
  }

  // 追加するUser情報を作成
  const userId = membersInfoList.length;
  const existedLastId = membersInfo.existed_last_id + 1;
  const userName = `user${existedLastId}`;
  const userInfo: UserInfoType = {
    user_name: userName,
    user_type: "normal",
  };

  await update(child(dbRef, `${roomId}/members`), {
    existed_last_id: existedLastId,
    members_list: [...membersInfoList, userInfo],
  });

  return {
    roomId: roomId,
    secretId: secretId,
    userId: userId,
  };
};
