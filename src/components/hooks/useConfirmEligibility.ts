import { CustomError } from "@/lib/error";
import { confirmRoom } from "@/lib/firebase/db/roomControl";
import router from "next/router";
import { useState, useEffect, useRef } from "react";
import nookies from "nookies";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "@/redux/userIdSlice";

const useConfirmEligibility = (
  roomId: string | string[] | undefined,
  nowRoomStatus: "waiting" | "inGame" | "finish"
) => {
  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch();
  const beEligible = useRef(false);

  useEffect(() => {
    if (!roomId) return;
    // 一度資格を確認している場合は2度目はしない
    if (beEligible.current) return;
    // reduxに保管してあるuserIdをまず確認
    if (userId !== null) {
      beEligible.current = true;
      return;
    }

    // reduxにuserIdがない場合cookiesを確認
    const cookies = nookies.get();
    const secretId = cookies.secretId;
    const cookieUserId = cookies.userId;

    if (!secretId || !cookieUserId) {
      router.push("/login");
      return;
    }

    // cookiesをもとにroomに参加できる資格があるのか確認
    (async () => {
      try {
        const roomStatus = await confirmRoom(roomId as string, secretId);

        switch (roomStatus) {
          case "finish":
            throw new CustomError("すでにルームは終了しています");
          case "inGame":
            if (nowRoomStatus == roomStatus) {
              dispatch(setUserId(Number(cookieUserId)));
              beEligible.current == true;
              break;
            }
            router.push(`/waitingroom/${roomId}`);
            break;
          case "waiting":
            if (nowRoomStatus == roomStatus) {
              dispatch(setUserId(Number(cookieUserId)));
              beEligible.current == true;
              break;
            }
            router.push(`/game/${roomId}`);
            break;
          default:
            throw new Error(roomStatus satisfies never);
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

  return {
    userId,
  };
};

export default useConfirmEligibility;
