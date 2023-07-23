import { cardDatas } from "@/feature/cardDatas";
import { UserInfoType } from "@/types/users";
import Image from "next/image";
import { memo } from "react";

// eslint-disable-next-line react/display-name
const Profile = memo(({ userInfo }: { userInfo: UserInfoType }) => {
  const role = userInfo.role!;
  const roleInfo = (() => {
    if (role == "polis") {
      return {
        roleName: "ボムポリス",
        roleExplanation: "爆発する前に解除チップを揃えれば勝利です。",
        roleBgColorClass: "bg-game-blue",
        roleTextColorClass: "text-game-blue",
        roleImgSrc: "/svg/polis.svg",
      };
    } else {
      return {
        roleName: "ボマー",
        roleExplanation: "解除チップが揃う前に爆発させれば勝利です。",
        roleBgColorClass: "bg-game-red",
        roleTextColorClass: "text-game-red",
        roleImgSrc: "/svg/bomber.svg",
      };
    }
  })();

  return (
    <div
      className={`${roleInfo.roleBgColorClass} w-full h-full min-h-screen pb-28 flex justify-center items-center`}
    >
      <div className="mt-24 pt-20 w-11/12 bg-game-main-color rounded-lg relative">
        <div className="absolute top-0 left-1/2 w-40 h-40 rounded-full -translate-y-1/2 -translate-x-1/2 bg-white flex justify-center items-center">
          <Image
            src={roleInfo.roleImgSrc}
            alt="roleImg"
            width={80}
            height={80}
          />
        </div>
        <div className="py-5 w-full h-full flex flex-col items-center">
          <div
            className={`${roleInfo.roleTextColorClass} text-center text-4xl font-bold`}
          >
            {roleInfo.roleName}
          </div>
          <div className="w-10/12 mt-5">
            <p className="w-full text-center text-xl text-game-gray">
              {roleInfo.roleExplanation}
            </p>
          </div>
          <div className="mt-5 w-full">
            <p className="ml-4 text-sm text-game-gray">手持ちカード</p>
            <div className="mt-2 pb-5 w-full overflow-x-auto flex justify-start">
              {userInfo.hidden_cards!.map((cardName, key) => (
                <div
                  key={key}
                  className="mx-2 w-32 h-32 bg-white drop-shadow-md rounded-lg flex-shrink-0 flex justify-center items-center"
                >
                  <Image
                    src={cardDatas[cardName].src}
                    alt="card"
                    width={72}
                    height={72}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
