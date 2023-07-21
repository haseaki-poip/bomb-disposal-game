import EditUserName from "@/components/WaitingRoom/EditUserName";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import nookies from "nookies";
import { CustomError } from "@/lib/error";
import { confirmRoom } from "@/lib/firebase/db/roomControl";
import ShareButton from "@/components/WaitingRoom/ShareButton";
import useRealTimeMembers from "@/components/hooks/useRealTimeMembers";
import MemberList from "@/components/WaitingRoom/MemberList";
import SquareButton from "@/components/UI/SquareButton";
import { deleteUserInfoInRoom } from "@/lib/leavingRoom";

const WaitingRoom = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [userId, setUserId] = useState<number | null>(null);
  const { membersInfoList } = useRealTimeMembers(roomId);

  // 退出処理
  const leavingRoom = useCallback(() => {
    if (!roomId || userId == null) return;
    try {
      deleteUserInfoInRoom(roomId as string, userId);
      router.push("/login");
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message);
      } else {
        alert("エラーが発生し退出できませんでした。");
      }
    }
  }, [roomId, userId]);

  useEffect(() => {
    if (!roomId) return;

    const cookies = nookies.get();
    const secretId = cookies.secretId;
    const userId = cookies.userId;

    if (!secretId || !userId) {
      router.push("/login");
      return;
    }

    setUserId(Number(userId));

    // cookiesをもとにroomに参加できる資格があるのか確認
    (async () => {
      try {
        const roomStatus = await confirmRoom(roomId as string, secretId);
        if (roomStatus == "finish") {
          throw new CustomError("すでにルームは終了しています");
        }
      } catch (e) {
        if (e instanceof CustomError) {
          alert(e.message);
        } else {
          alert("エラーが発生しました。ログイン画面に戻ります。");
        }
        router.push("/login");
        return;
      }
    })();
  }, [roomId]);

  if (userId == null || membersInfoList.length == 0) {
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
      <EditUserName userName={membersInfoList[userId].user_name} />
      <MemberList membersInfoList={membersInfoList} />
      <div className="w-full mt-8 flex justify-center">
        <div className="mx-4">
          <SquareButton
            value="退出"
            btnColor="red"
            handleButton={() => leavingRoom()}
          />
        </div>
        <div className="mx-4">
          <SquareButton
            value="スタート"
            btnColor="blue"
            handleButton={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
