import SquareButton from "@/components/UI/SquareButton";
import { RootState } from "@/redux/store";
import { UserInfoType } from "@/types/users";
import { memo, useEffect } from "react";
import { setUserId } from "@/redux/userIdSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { CustomError } from "@/lib/error";
import { continueGame, finishGame } from "@/lib/firebase/db/gameControl";
import useRealTimeRooms from "@/components/hooks/useRealTimeRooms";
import { removeCookiesInRoom } from "@/lib/cookies/cookies";

type Props = {
  userInfo: UserInfoType;
  roomId: string;
};

// eslint-disable-next-line react/display-name
const FinishButtons = memo(({ userInfo, roomId }: Props) => {
  const { realtimeRoomsInfo } = useRealTimeRooms(roomId);
  const router = useRouter();
  const dispatch = useDispatch();

  // コンティニュー処理
  const continueGameProcess = async () => {
    try {
      await continueGame(roomId);
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message);
      } else {
        console.log(e);
        alert("エラーが発生しました。");
      }
    }
  };

  // ルーム終了処理
  const finishGameProcess = async () => {
    try {
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

  // useEffectによる監視でページ遷移
  useEffect(() => {
    if (realtimeRoomsInfo?.status == "waiting") {
      router.push(`/waitingroom/${roomId}`);
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
              value="終了"
              btnColor="red"
              handleButton={() => finishGameProcess()}
            />
          </div>
          <div className="mx-4">
            <SquareButton
              value="続ける"
              btnColor="blue"
              handleButton={() => continueGameProcess()}
            />
          </div>
        </>
      ) : null}
    </div>
  );
});

export default FinishButtons;
