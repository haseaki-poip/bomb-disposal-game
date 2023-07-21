import { ref, update, set, push, get, child } from "firebase/database";
import { realtimeDB } from "../firebase";
import { CustomError } from "../../error";
import { MembersInfoListType } from "@/types/users";

export const deleteUserInfo = async (roomId: string, userId: number) => {
  const dbRef = ref(realtimeDB);
  const snapshotMembers = await get(child(dbRef, `${roomId}/members`));
  const membersInfo = await snapshotMembers.val();

  if (!membersInfo) {
    throw new CustomError("ルームが存在しません。");
  }

  const membersInfoList: MembersInfoListType = membersInfo.members_list;

  membersInfoList.splice(userId, 1);

  await update(child(dbRef, `${roomId}/members`), {
    existed_last_id: membersInfo.existed_last_id,
    members_list: membersInfoList,
  });
};
