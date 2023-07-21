import SquareButton from "@/components/UI/SquareButton";
import { CustomError } from "@/lib/error";
import { deleteUserInfoInRoom } from "@/lib/leavingRoom";
import { useRouter } from "next/router";
import { memo, useCallback } from "react";

type Props = {
  userId: number;
  roomId: string;
};

// eslint-disable-next-line react/display-name
const TransitionButtons = memo(({ userId, roomId }: Props) => {
  const router = useRouter();

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
    return;
  }, [roomId, userId]);

  return (
    <div className="flex justify-center">
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
  );
});

export default TransitionButtons;
