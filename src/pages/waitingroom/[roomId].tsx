import EditUserName from "@/components/WaitingRoom/EditUserName";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import nookies from "nookies";
import { CustomError } from "@/lib/error";
import { confirmRoom } from "@/lib/firebase/db/roomControl";

const WaitingRoom = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const shareRoomId = () => {
    const waitingRoomUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login?roomId=${roomId}`;
    const shareText = `Bomb Disposalゲームへの招待です。\nroom id: ${roomId}\n以下のURLにアクセスしてください。\n${waitingRoomUrl}`;

    if (navigator.share) {
      navigator
        .share({
          text: shareText,
        })
        .catch((error) => {
          console.error("シェアに失敗しました。", error);
        });
    } else {
      alert("お使いのデバイスではシェア機能を利用できません");
    }
  };

  useEffect(() => {
    const cookies = nookies.get();
    const secretId = cookies.secretId;
    const userId = cookies.userId;

    if (!secretId || !userId || !roomId) {
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
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-login-main-color pt-16">
      <div className="w-fit mx-auto relative">
        <h2 className="text-center text-white font-bold text-xl">{roomId}</h2>
        <div
          className="absolute top-1/2 right-0 translate-x-10 -translate-y-1/2"
          onClick={() => shareRoomId()}
        >
          <Image src="/svg/share.svg" width="28" height="28" alt="share" />
        </div>
      </div>
      <EditUserName />
    </div>
  );
};

export default WaitingRoom;
