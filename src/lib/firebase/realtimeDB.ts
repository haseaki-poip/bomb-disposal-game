import { ref, update, set, push, get, child } from "firebase/database";
import { realtimeDB } from "./firebase";
import { CustomError } from "../error";

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

// ルームの作成
export const createRoom = async () => {
  const secretId = generateSecretId();

  const postListRefRooms = ref(realtimeDB, "/");
  const newPostRefRooms = push(postListRefRooms);
  await set(newPostRefRooms, {
    rooms: { secret_id: secretId, status: "waiting" },
    members: {
      members_list: [
        {
          user_name: "user1",
          user_type: "admin",
        },
      ],
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

export const loginRoom = async (roomId: string) => {
  const dbRef = ref(realtimeDB);
  const snapshotRooms = await get(child(dbRef, `${roomId}/rooms`));
  const roomsInfo = await snapshotRooms.val();
  if (!roomsInfo) {
    throw new CustomError("ルームが存在しません。");
  }

  const secretId = roomsInfo.secretId;

  const snapshotMembers = await get(child(dbRef, `${roomId}/members`));
  const membersInfo = await snapshotMembers.val();

  if (!membersInfo) {
    throw new CustomError("ルームが存在しません。");
  }

  const membersInfoList = membersInfo.members_list;
  if (membersInfoList.length >= 8) {
    throw new CustomError(
      "ルーム内の人数がすでに上限に達しているため参加できません。"
    );
  }

  const userId = membersInfoList.length;
  const userName = `user${userId}`;
  const userInfo = {
    user_name: userName,
    user_type: "normal",
  };
  await update(child(dbRef, `${roomId}/members`), {
    members_list: [...membersInfoList, userInfo],
  });

  return {
    roomId: roomId,
    secretId: secretId,
    userId: userId,
  };
};

// idからメンバー情報取得
export const getMembersInfo = async (roomId: string) => {
  const dbRef = ref(realtimeDB);
  const snapshot = await get(child(dbRef, `${roomId}/members`));
  const membesInfoList = (await snapshot.val()) ?? null;
  return membesInfoList;
};
