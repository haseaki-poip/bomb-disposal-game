import { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { realtimeDB } from "@/lib/firebase/firebase";
import { GamesInfoType } from "@/types/games";

const useRealTimeGames = (roomId: string | string[] | undefined) => {
  const [realtimeGamesInfo, setRealtimeGameInfo] = useState<GamesInfoType>();
  useEffect(() => {
    if (!roomId) return;

    const gamesRef = ref(realtimeDB, `${roomId}/games`);
    try {
      // データ更新時にリアルタイムで発火
      onValue(gamesRef, (snapshot) => {
        const gamesInfo: GamesInfoType = snapshot.val();

        setRealtimeGameInfo(gamesInfo);
      });
    } catch (e) {
      alert(
        "データを正常に取得することができませんでした。リロードを行なってください。"
      );
    }
  }, [roomId]);

  return {
    realtimeGamesInfo,
  };
};

export default useRealTimeGames;
