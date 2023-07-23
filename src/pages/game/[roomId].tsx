import useConfirmEligibility from "@/components/hooks/useConfirmEligibility";
import useRealTimeMembers from "@/components/hooks/useRealTimeMembers";
import { useRouter } from "next/router";
import { useMemo } from "react";

const Game = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { membersInfoList } = useRealTimeMembers(roomId);
  const { userId } = useConfirmEligibility(roomId, "inGame");

  const isLogin = useMemo(() => {
    return userId != null && membersInfoList[userId]?.user_type;
  }, [userId, membersInfoList]);

  if (!isLogin) {
    return <div></div>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-login-main-color pt-16"></div>
  );
};

export default Game;
