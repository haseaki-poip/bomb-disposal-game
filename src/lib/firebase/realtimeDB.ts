import { ref, update, set, push, get, child } from "firebase/database";
import { realtimeDB } from "./firebase";

// idからメンバー情報取得
export const getMembersInfo = async (roomId: string) => {
  const dbRef = ref(realtimeDB);
  const snapshot = await get(child(dbRef, `members/${roomId}`));
  const { members_info: membesInfo } = (await snapshot.val()) ?? {
    members_info: null,
  };
  return membesInfo;
};
