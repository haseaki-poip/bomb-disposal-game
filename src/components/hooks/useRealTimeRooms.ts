import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { realtimeDB } from "@/lib/firebase/firebase";
import { RoomsInfoType } from "@/types/rooms";

const useRealTimeRooms = (roomId: string | string[] | undefined) => {
  const [realtimeRoomsInfo, setRealtimeRoomsInfo] = useState<RoomsInfoType>();
  useEffect(() => {
    if (!roomId) return;

    const roomsRef = ref(realtimeDB, `${roomId}/rooms`);
    try {
      // データ更新時にリアルタイムで発火
      onValue(roomsRef, (snapshot) => {
        const roomsInfo: RoomsInfoType = snapshot.val();

        setRealtimeRoomsInfo(roomsInfo);
      });
    } catch (e) {
      alert(
        "データを正常に取得することができませんでした。リロードを行なってください。"
      );
    }
  }, [roomId]);

  return {
    realtimeRoomsInfo,
  };
};

export default useRealTimeRooms;
