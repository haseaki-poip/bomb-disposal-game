import { cardDatas } from "@/feature/cardDatas";
import { GamesInfoType } from "@/types/games";
import { MembersInfoListType } from "@/types/users";
import Image from "next/image";
import { memo, useState } from "react";
import OpenCardModal from "./OpenCardModal";

type Props = {
  membersInfoList: MembersInfoListType;
  gamesInfo: GamesInfoType;
  userId: number;
};

// eslint-disable-next-line react/display-name
const Controller = memo(({ membersInfoList, gamesInfo, userId }: Props) => {
  const [isOpenCardModal, setIsOpenCardModal] = useState(false);
  return (
    <>
      {isOpenCardModal ? (
        <OpenCardModal
          membersInfoList={membersInfoList}
          userId={userId}
          closeModal={() => setIsOpenCardModal(false)}
        />
      ) : null}
      <div className="w-full h-full min-h-screen bg-game-main-color pt-32 pb-28 flex flex-col justify-center items-center relative">
        <div
          className={`${
            cardDatas[gamesInfo.result].bgColorCss
          } absolute top-0 left-0 w-full h-32 flex justify-center items-center`}
        >
          <h1 className="text-6xl font-bold text-white text-shadow-md">
            {gamesInfo.result}
          </h1>
        </div>
        <div className="mt-8 w-56 text-game-gray text-4xl font-bold relative">
          <div className="absolute top-1/2 left-0 -rotate-90 -translate-y-1/2 -translate-x-full">
            <Image
              src="/svg/scissors.svg"
              alt="はさみ"
              width={48}
              height={48}
            />
          </div>
          <div className="w-full px-2 text-center overflow-hidden whitespace-nowrap truncate">
            {membersInfoList[gamesInfo.processor].user_name}
          </div>
        </div>
        <div className="mt-12 w-11/12">
          <p className="text-sm text-game-gray">解除チップ</p>
          <div className="mt-2 px-4 w-full h-20 bg-white rounded-lg drop-shadow-md flex items-center overflow-x-auto">
            {[...Array(gamesInfo.success_num)].map((_, key) => (
              <div
                key={key}
                className="w-16 h-16 mx-2 rounded-full bg-game-blue drop-shadow-lg flex-shrink-0"
              ></div>
            ))}
            {[...Array(gamesInfo.release_num - gamesInfo.success_num)].map(
              (_, key) => (
                <div
                  key={key}
                  className="w-16 h-16 mx-2 rounded-full bg-game-gray drop-shadow-lg flex-shrink-0"
                ></div>
              )
            )}
          </div>
        </div>

        <div className="mt-8 pb-5 pl-4 pr-20 w-full overflow-x-auto flex justify-start">
          {membersInfoList.map((memberInfo, key) => (
            <div
              key={key}
              className="mx-2 w-40 h-40 bg-white drop-shadow-md rounded-lg flex-shrink-0 flex flex-col justify-start items-center"
            >
              <div className="mt-2 w-10/12 text-center text-game-gray text-lg overflow-hidden whitespace-nowrap truncate">
                {memberInfo.user_name}
              </div>
              <div className="mt-4 w-10/12 container grid grid-cols-3 gap-4">
                {(memberInfo.show_cards ?? []).map((cardName, key) => {
                  return (
                    <Image
                      key={key}
                      src={cardDatas[cardName].src}
                      alt="card"
                      width={32}
                      height={32}
                    />
                  );
                })}
                {[...Array(memberInfo.hidden_cards?.length ?? 0)].map(
                  (_, key) => {
                    return (
                      <Image
                        key={key}
                        src="/svg/questionmark.svg"
                        alt="card"
                        width={32}
                        height={32}
                      />
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>

        {gamesInfo.processor == userId ? (
          <div
            className="fixed bottom-28 right-4 w-20 h-20 rounded-full bg-game-orange drop-shadow-2xl flex justify-center items-center"
            onClick={() => setIsOpenCardModal(true)}
          >
            <Image
              src="/svg/scissors.svg"
              alt="はさみ"
              width={48}
              height={48}
            />
          </div>
        ) : null}
      </div>
    </>
  );
});

export default Controller;
