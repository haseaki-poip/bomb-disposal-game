import Modal from "@/components/UI/Modal";
import SquareButton from "@/components/UI/SquareButton";
import { roleDatas } from "@/feature/roleDatas";
import { GamesInfoType, RoleType } from "@/types/games";
import { MembersInfoListType } from "@/types/users";
import Image from "next/image";
import { memo } from "react";
import FinishButtons from "./FinishButtons";

type Props = {
  membersInfoList: MembersInfoListType;
  userId: number;
  gameInfo: GamesInfoType;
  roomId: string;
};

// eslint-disable-next-line react/display-name
const ResultModal = memo(
  ({ membersInfoList, userId, gameInfo, roomId }: Props) => {
    const winnerInfo = roleDatas[gameInfo.winner as RoleType];

    return (
      <Modal>
        <div className="w-11/12 py-6 bg-game-main-color rounded-lg">
          <div className="w-full px-8">
            <p className="text-sm text-game-gray">勝利チーム</p>
            <div
              className={`${winnerInfo.roleTextColorClass} text-center text-4xl font-bold mt-2`}
            >
              {winnerInfo.roleName}
            </div>
            <div className="mt-2 w-fit mx-auto">
              <Image
                src={winnerInfo.roleImgSrc}
                alt="roleImg"
                width={80}
                height={80}
              />
            </div>
          </div>
          <div className="w-full mt-8">
            <p className="ml-8 text-sm text-game-gray">ボムポリスチーム</p>
            <div className="mt-2 pb-4 pl-7 w-full overflow-x-auto flex justify-start">
              {membersInfoList.map((memberInfo, key) => {
                if (memberInfo.role != "polis") return;
                return (
                  <div
                    key={key}
                    className="mx-1 py-1 px-2 w-20 bg-game-blue drop-shadow-md rounded-full flex-shrink-0 text-white text-center text-xs overflow-hidden whitespace-nowrap truncate"
                  >
                    {memberInfo.user_name}
                  </div>
                );
              })}
            </div>
            <div className="w-full">
              <p className="ml-8 text-sm text-game-gray">ボマーチーム</p>
              <div className="mt-2 pb-4 pl-7 w-full overflow-x-auto flex justify-start">
                {membersInfoList.map((memberInfo, key) => {
                  if (memberInfo.role != "bomber") return;
                  return (
                    <div
                      key={key}
                      className="mx-1 py-1 px-2 w-20 bg-game-red drop-shadow-md rounded-full flex-shrink-0 text-white text-center text-xs overflow-hidden whitespace-nowrap truncate"
                    >
                      {memberInfo.user_name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 w-full">
            <FinishButtons userInfo={membersInfoList[userId]} roomId={roomId} />
          </div>
        </div>
      </Modal>
    );
  }
);

export default ResultModal;
