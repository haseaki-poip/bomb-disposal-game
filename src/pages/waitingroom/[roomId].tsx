import EditUserName from "@/components/WaitingRoom/EditUserName";
import { useRouter } from "next/router";
import { useEffect } from "react";
import nookies from "nookies";
import { CustomError } from "@/lib/error";
import { confirmRoom } from "@/lib/firebase/db/roomControl";
import ShareButton from "@/components/WaitingRoom/ShareButton";

const WaitingRoom = () => {
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    if (!roomId) return;

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

  return (
    <div className="w-full h-full min-h-screen bg-login-main-color pt-16">
      <div className="w-fit mx-auto relative">
        <h2 className="text-center text-white font-bold text-xl">{roomId}</h2>
        <div className="absolute top-1/2 right-0 translate-x-10 -translate-y-1/2">
          <ShareButton roomId={roomId as string} />
        </div>
      </div>
      <EditUserName />
    </div>
  );
};

export default WaitingRoom;
