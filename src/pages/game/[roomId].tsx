import Controller from "@/components/Game/Controller";
import Profile from "@/components/Game/Profile";
import SwitchComponents from "@/components/Game/SwitchComponents";
import useConfirmEligibility from "@/components/hooks/useConfirmEligibility";
import useRealTimeGames from "@/components/hooks/useRealTimeGames";
import useRealTimeMembers from "@/components/hooks/useRealTimeMembers";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const Game = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { membersInfoList } = useRealTimeMembers(roomId);
  const { userId } = useConfirmEligibility(roomId, "inGame");
  const [isProfilePage, setIsProfilePage] = useState(true);
  const { realtimeGamesInfo } = useRealTimeGames(roomId);

  const isLogin = useMemo(() => {
    return (
      userId != null &&
      membersInfoList[userId]?.user_type &&
      realtimeGamesInfo?.release_num
    );
  }, [userId, membersInfoList, realtimeGamesInfo]);

  if (!isLogin) {
    return <div></div>;
  }

  return (
    <>
      {isProfilePage ? (
        <Profile userInfo={membersInfoList[userId!]} />
      ) : (
        <Controller
          membersInfoList={membersInfoList}
          userId={userId!}
          gamesInfo={realtimeGamesInfo!}
        />
      )}

      <div className="fixed bottom-0 left-0 z-30 w-full shadow">
        <SwitchComponents
          isProfilePage={isProfilePage}
          setIsProfilePage={setIsProfilePage}
        />
      </div>
    </>
  );
};

export default Game;
