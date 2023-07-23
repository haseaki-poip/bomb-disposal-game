import { CustomError } from "@/lib/error";
import { confirmRoom } from "@/lib/firebase/db/roomControl";
import router from "next/router";
import { useState, useEffect, useRef } from "react";
import nookies from "nookies";

const useConfirmEligibility = (
  roomId: string | string[] | undefined,
  nowRoomStatus: "waiting" | "inGame" | "finish"
) => {
  const [userId, setUserId] = useState<number | null>(null);
  const beEligible = useRef(false);

  useEffect(() => {
    if (!roomId) return;
    if (beEligible.current) return;

    const cookies = nookies.get();
    const secretId = cookies.secretId;
    const userId = cookies.userId;

    if (!secretId || !userId) {
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
              setUserId(Number(userId));
              beEligible.current == true;
              break;
            }
            router.push(`/game/${roomId}`);
            break;
          case "waiting":
            if (nowRoomStatus == roomStatus) {
              setUserId(Number(userId));
              beEligible.current == true;
              break;
            }
            router.push(`/waitingroom/${roomId}`);
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
