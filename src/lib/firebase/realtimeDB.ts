import { ref, update, set, push, get, child } from "firebase/database";
import { realtimeDB } from "./firebase";

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
    members: [
      {
        user_name: "user1",
        user_type: "admin",
      },
    ],
  });

  const roomId = newPostRefRooms.key;
  if (!roomId) {
    return null;
  }

  return {
    roomId: roomId,
    secretId: secretId,
    userId: 0,
  };
};

// idからメンバー情報取得
export const getMembersInfo = async (roomId: string) => {
  const dbRef = ref(realtimeDB);
  const snapshot = await get(child(dbRef, `${roomId}/members`));
  const membesInfoList = (await snapshot.val()) ?? null;
  return membesInfoList;
};
