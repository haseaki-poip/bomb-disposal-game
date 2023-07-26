import Image from "next/image";
import { memo } from "react";

// eslint-disable-next-line react/display-name
const ShareButton = memo(({ roomId }: { roomId: string }) => {
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

  return (
    <div onClick={() => shareRoomId()}>
      <Image src="/svg/share.svg" width="28" height="28" alt="share" />
    </div>
  );
});

export default ShareButton;
