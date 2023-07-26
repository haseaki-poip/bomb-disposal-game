import Modal from "@/components/UI/Modal";
import SquareButton from "@/components/UI/SquareButton";
import Image from "next/image";
import { memo } from "react";

// eslint-disable-next-line react/display-name
const ResultModal = memo(() => {
  return (
    <Modal>
      <div className="w-11/12 py-6 bg-game-main-color rounded-lg">
        <div className="w-full px-8">
          <p className="text-sm text-game-gray">勝利チーム</p>
          <div
            // className={`${roleInfo.roleTextColorClass} text-center text-4xl font-bold mt-20`}
            className={`text-game-blue text-center text-4xl font-bold mt-2`}
          >
            ボムポリス
            {/* {roleInfo.roleName} */}
          </div>
          <div className="mt-2 w-fit mx-auto">
            <Image
              // src={roleInfo.roleImgSrc}
              src="/svg/polis.svg"
              alt="roleImg"
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className="w-full mt-8">
          <p className="ml-8 text-sm text-game-gray">ボムポリスチーム</p>
          <div className="mt-2 pb-4 pl-7 w-full overflow-x-auto flex justify-start">
            <div
              //   key={key}
              className="mx-1 py-1 px-2 w-20 bg-game-blue drop-shadow-md rounded-full flex-shrink-0 text-white text-center text-xs overflow-hidden whitespace-nowrap truncate"
            >
              さとう
            </div>
          </div>
          <div className="w-full">
            <p className="ml-8 text-sm text-game-gray">ボマーチーム</p>
            <div className="mt-2 pb-4 pl-7 w-full overflow-x-auto flex justify-start">
              <div
                //   key={key}
                className="mx-1 py-1 px-2 w-20 bg-game-red drop-shadow-md rounded-full flex-shrink-0 text-white text-center text-xs overflow-hidden whitespace-nowrap truncate"
              >
                さとう
              </div>
            </div>
          </div>

          <div className="mt-8 w-full flex justify-center">
            {/* {userInfo.user_type == "admin" ? ( */}
            <div className="mx-4">
              <SquareButton
                value="終了"
                btnColor="red"
                handleButton={() => {}}
              />
            </div>
            <div className="mx-4">
              <SquareButton
                value="続ける"
                btnColor="blue"
                handleButton={() => {}}
              />
            </div>
            {/* ) : null} */}
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default ResultModal;
