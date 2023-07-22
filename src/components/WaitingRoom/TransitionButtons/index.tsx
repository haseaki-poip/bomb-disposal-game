import SquareButton from "@/components/UI/SquareButton";
import useRealTimeRooms from "@/components/hooks/useRealtimeRooms";
import { CustomError } from "@/lib/error";
import { startGame } from "@/lib/firebase/db/gameControl";
import { deleteUserInfoInRoom } from "@/lib/leavingRoom";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect } from "react";

type Props = {
  userId: number;
  roomId: string;
};

// eslint-disable-next-line react/display-name
const TransitionButtons = memo(({ userId, roomId }: Props) => {
  const router = useRouter();
  const { realtimeRoomsInfo } = useRealTimeRooms(roomId);

  // 退出処理
  const leavingRoomPropcess = () => {
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
    return;
  };

  //　ゲームスタート処理
  const startGameProcess = async () => {
    try {
      await startGame(roomId);
      router.push(`/game/${roomId}`);
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message);
      } else {
        alert("エラーが発生しスタートできません。");
      }
    }
  };

  // useEffectによる監視でゲーム画面へ遷移
  useEffect(() => {
    if (realtimeRoomsInfo?.status == "inGame") {
      router.push(`/game/${roomId}`);
    }
  }, [realtimeRoomsInfo?.status]);

  return (
    <div className="flex justify-center">
      <div className="mx-4">
        <SquareButton
          value="退出"
          btnColor="red"
          handleButton={() => leavingRoomPropcess()}
        />
      </div>
      <div className="mx-4">
        <SquareButton
          value="スタート"
          btnColor="blue"
          handleButton={() => startGameProcess()}
        />
      </div>
    </div>
  );
});

export default TransitionButtons;
