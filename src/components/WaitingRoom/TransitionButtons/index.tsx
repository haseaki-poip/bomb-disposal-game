import SquareButton from "@/components/UI/SquareButton";
import useRealTimeRooms from "@/components/hooks/useRealTimeRooms";
import { CustomError } from "@/lib/error";
import { startGame } from "@/lib/firebase/db/gameControl";
import { deleteUserInfoInRoom } from "@/lib/leavingRoom";
import { setUserId } from "@/redux/userIdSlice";
import { UserInfoType } from "@/types/users";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  userId: number;
  roomId: string;
  userInfo: UserInfoType;
};

// eslint-disable-next-line react/display-name
const TransitionButtons = memo(({ userId, roomId, userInfo }: Props) => {
  const router = useRouter();
  const { realtimeRoomsInfo } = useRealTimeRooms(roomId);
  const dispatch = useDispatch();

  // 退出処理
  const leavingRoomPropcess = () => {
    try {
      deleteUserInfoInRoom(roomId as string, userId);
      dispatch(setUserId(null));
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
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message);
      } else {
        console.log(e);
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
      {userInfo.user_type == "admin" ? (
        <div className="mx-4">
          <SquareButton
            value="スタート"
            btnColor="blue"
            handleButton={() => startGameProcess()}
          />
        </div>
      ) : null}
    </div>
  );
});

export default TransitionButtons;
