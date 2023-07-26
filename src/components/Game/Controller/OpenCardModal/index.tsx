import Modal from "@/components/UI/Modal";
import { cardDatas } from "@/feature/cardDatas";
import { MembersInfoListType } from "@/types/users";
import Image from "next/image";
import { memo, useState } from "react";

type Props = {
  membersInfoList: MembersInfoListType;
  userId: number;
  closeModal: () => void;
};

// eslint-disable-next-line react/display-name
const OpenCardModal = memo(({ membersInfoList, userId, closeModal }: Props) => {
  const [selectedUserId, setSelectedUserId] = useState(userId == 0 ? 1 : 0);

  return (
    <Modal closeModal={closeModal}>
      <div className="w-11/12 py-6 bg-game-main-color rounded-lg">
        <div className="w-full px-8">
          <label className="w-full">
            <p className="text-sm text-game-gray">解除相手を選択</p>
            <div className="w-64 h-12 rounded-full bg-white mx-auto mt-2 relative">
              <div className="absolute top-1/2 right-5 -translate-y-1/2">
                <Image src="/svg/arrow.svg" alt="矢印" width={20} height={20} />
              </div>
              <select
                className="absolute top-0 left-0 px-10 w-full h-full rounded-full bg-transparent border-[1px] border-game-gray outline-none text-center text-xl font-bold appearance-none overflow-hidden whitespace-nowrap truncate"
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
              >
                {membersInfoList.map((memberInfo, key) => {
                  if (key == userId) return null;
                  return (
                    <option value={key} key={key}>
                      {memberInfo.user_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </label>
        </div>

        <div className="mt-8 w-full">
          <p className="ml-8 text-sm text-game-gray">手持ちカード</p>
          <div className="mt-2 px-6 pb-5 w-full overflow-x-auto flex justify-start">
            {[
              ...Array(membersInfoList[selectedUserId].hidden_cards?.length),
            ].map((_, key) => (
              <div
                key={key}
                className="mx-2 w-32 h-32 bg-white drop-shadow-md rounded-lg flex-shrink-0 flex justify-center items-center"
              >
                <Image src="/svg/touch.svg" alt="card" width={72} height={72} />
              </div>
            ))}

            {(membersInfoList[selectedUserId].show_cards ?? []).map(
              (cardName, key) => {
                return (
                  <div
                    key={key}
                    className="mx-2 w-32 h-32 bg-white drop-shadow-md rounded-lg flex-shrink-0 flex justify-center items-center relative overflow-hidden"
                  >
                    <Image
                      src={cardDatas[cardName].src}
                      alt="card"
                      width={72}
                      height={72}
                    />
                    <div className="absolute top-0 left-0 w-full h-32 bg-black opacity-40"></div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default OpenCardModal;
