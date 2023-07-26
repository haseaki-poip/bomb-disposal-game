import Controller from "@/components/Game/Controller";
import Profile from "@/components/Game/Profile";
import ResultModal from "@/components/Game/ResultModal";
import SwitchComponents from "@/components/Game/SwitchComponents";
import Loading from "@/components/UI/Loading";
import useConfirmEligibility from "@/components/hooks/useConfirmEligibility";
import useRealTimeGames from "@/components/hooks/useRealTimeGames";
import useRealTimeMembers from "@/components/hooks/useRealTimeMembers";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";

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
    return <Loading />;
  }

  return (
    <>
      {realtimeGamesInfo?.winner ? (
        <ResultModal
          membersInfoList={membersInfoList}
          userId={userId!}
          gameInfo={realtimeGamesInfo}
          roomId={roomId as string}
        />
      ) : null}
      {isProfilePage ? (
        <Profile userInfo={membersInfoList[userId!]} />
      ) : (
        <Controller
          membersInfoList={membersInfoList}
          userId={userId!}
          gamesInfo={realtimeGamesInfo!}
        />
      )}

      <div className="absolute bottom-0 left-0 z-30 w-full shadow">
        <SwitchComponents
          isProfilePage={isProfilePage}
          setIsProfilePage={setIsProfilePage}
        />
      </div>
    </>
  );
};

export default Game;
