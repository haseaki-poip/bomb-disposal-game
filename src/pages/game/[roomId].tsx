import SwitchComponents from "@/components/Game/SwitchComponents";
import useConfirmEligibility from "@/components/hooks/useConfirmEligibility";
import useRealTimeMembers from "@/components/hooks/useRealTimeMembers";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const Game = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { membersInfoList } = useRealTimeMembers(roomId);
  const { userId } = useConfirmEligibility(roomId, "inGame");
  const [isProfilePage, setIsProfilePage] = useState(true);

  const isLogin = useMemo(() => {
    return userId != null && membersInfoList[userId]?.user_type;
  }, [userId, membersInfoList]);

  if (!isLogin) {
    return <div></div>;
  }

  return (
    <>
      <div className="w-full h-full min-h-screen bg-game-main-color pt-16"></div>
      <div className="fixed bottom-0 left-0 z-50 w-full shadow">
        <SwitchComponents
          isProfilePage={isProfilePage}
          setIsProfilePage={setIsProfilePage}
        />
      </div>
    </>
  );
};

export default Game;
