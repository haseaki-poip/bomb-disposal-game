import SquareButton from "@/components/UI/SquareButton";
import useRealTimeRooms from "@/components/hooks/useRealTimeRooms";
import { removeCookiesInRoom } from "@/lib/cookies/cookies";
import { CustomError } from "@/lib/error";
import { finishGame, startGame } from "@/lib/firebase/db/gameControl";
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
      // ポップアップで確認
      if (!confirm("本当にルームを退出しますか？")) {
        return;
      }
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

  // ルーム終了処理
  const finishGameProcess = async () => {
    try {
      // ポップアップで確認
      if (
        !confirm("本当にルームを削除しますか？メンバー全員が退出されます。")
      ) {
        return;
      }
      finishGame(roomId);
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message);
      } else {
        alert("エラーが発生しルームを終了できませんでした。");
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

  // useEffectによる監視でページ遷移
  useEffect(() => {
    if (realtimeRoomsInfo?.status == "inGame") {
      router.push(`/game/${roomId}`);
    }
    if (realtimeRoomsInfo?.status == "finish") {
      router.push(`/login`);
      removeCookiesInRoom();
      dispatch(setUserId(null));
    }
  }, [realtimeRoomsInfo?.status]);

  return (
    <div className="flex justify-center">
      {userInfo.user_type == "admin" ? (
        <>
          <div className="mx-4">
            <SquareButton
              value="退出"
              btnColor="red"
              handleButton={() => finishGameProcess()}
            />
          </div>
          <div className="mx-4">
            <SquareButton
              value="スタート"
              btnColor="blue"
              handleButton={() => startGameProcess()}
            />
          </div>
        </>
      ) : (
        <div className="mx-4">
          <SquareButton
            value="退出"
            btnColor="red"
            handleButton={() => leavingRoomPropcess()}
          />
        </div>
      )}
    </div>
  );
});

export default TransitionButtons;
