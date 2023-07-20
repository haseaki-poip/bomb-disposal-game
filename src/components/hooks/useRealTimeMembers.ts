import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDB } from "@/lib/firebase/firebase";
import { MembersInfoListType } from "@/types/users";

const useRealTimeMembers = (roomId: string | undefined) => {
  const [membersInfoList, setMembersInfoList] = useState<MembersInfoListType>(
    []
  );
  useEffect(() => {
    if (!roomId) return;

    try {
      const membersRef = ref(realtimeDB, `${roomId}/members`);
      // データ更新時にリアルタイムで発火
      onValue(membersRef, (snapshot) => {
        const membersList: MembersInfoListType = snapshot.val().members_list;

        setMembersInfoList(membersList);
      });
    } catch (e) {
      alert(
        "データを正常に取得することができませんでした。リロードを行なってください。"
      );
    }
  }, []);

  return {
    membersInfoList: membersInfoList,
  };
};

export default useRealTimeMembers;
