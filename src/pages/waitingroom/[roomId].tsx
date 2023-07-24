import EditUserName from "@/components/WaitingRoom/EditUserName";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ShareButton from "@/components/WaitingRoom/ShareButton";
import useRealTimeMembers from "@/components/hooks/useRealTimeMembers";
import MemberList from "@/components/WaitingRoom/MemberList";
import TransitionButtons from "@/components/WaitingRoom/TransitionButtons";
import useConfirmEligibility from "@/components/hooks/useConfirmEligibility";

const WaitingRoom = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const { membersInfoList } = useRealTimeMembers(roomId);
  const { userId } = useConfirmEligibility(roomId, "waiting");

  const isLogin = useMemo(() => {
    return userId != null && membersInfoList[userId]?.user_type;
  }, [userId, membersInfoList]);

  if (!isLogin) {
    return <div></div>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-login-main-color pt-16">
      <div className="w-fit mx-auto relative">
        <h2 className="text-center text-white font-bold text-xl">{roomId}</h2>
        <div className="absolute top-1/2 right-0 translate-x-10 -translate-y-1/2">
          <ShareButton roomId={roomId as string} />
        </div>
      </div>
      <EditUserName
        userName={membersInfoList[userId!].user_name}
        userId={userId!}
        roomId={roomId as string}
      />
      <MemberList membersInfoList={membersInfoList} />
      <div className="w-full mt-8">
        <TransitionButtons
          userId={userId!}
          roomId={roomId as string}
          userInfo={membersInfoList[userId!]}
        />
      </div>
    </div>
  );
};

export default WaitingRoom;
