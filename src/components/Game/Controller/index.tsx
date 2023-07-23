import Image from "next/image";
import { memo } from "react";

// eslint-disable-next-line react/display-name
const Controller = memo(() => {
  return (
    <div className="w-full h-full min-h-screen bg-game-main-color pt-32 pb-28 flex flex-col justify-around items-center relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-game-blue flex justify-center items-center">
        <h1 className="text-6xl font-bold text-white text-shadow-md">解除</h1>
      </div>
      <div className="w-56 text-game-gray text-4xl font-bold relative">
        <div className="absolute top-1/2 left-0 -rotate-90 -translate-y-1/2 -translate-x-full">
          <Image src="/svg/scissors.svg" alt="はさみ" width={48} height={48} />
        </div>
        <div className="w-full px-2 text-center overflow-hidden whitespace-nowrap truncate">
          さいとう
        </div>
      </div>
      <div className="w-10/12">
        <p className="text-sm text-game-gray">解除チップ</p>
        <div className="mt-2 px-4 w-full h-20 bg-white rounded-lg drop-shadow-md flex items-center overflow-x-auto">
          <div className="w-16 h-16 mx-2 rounded-full bg-game-blue drop-shadow-lg flex-shrink-0"></div>
          <div className="w-16 h-16 mx-2 rounded-full bg-game-blue drop-shadow-lg flex-shrink-0"></div>
          <div className="w-16 h-16 mx-2 rounded-full bg-game-blue drop-shadow-lg flex-shrink-0"></div>
          <div className="w-16 h-16 mx-2 rounded-full bg-game-blue drop-shadow-lg flex-shrink-0"></div>
          <div className="w-16 h-16 mx-2 rounded-full bg-game-blue drop-shadow-lg flex-shrink-0"></div>
          <div className="w-16 h-16 mx-2 rounded-full bg-game-blue drop-shadow-lg flex-shrink-0"></div>
          <div className="w-16 h-16 mx-2 rounded-full bg-game-blue drop-shadow-lg flex-shrink-0"></div>
        </div>
      </div>

      <div className="pb-5 px-4 w-full overflow-x-auto flex justify-start">
        <div
          //   key={key}
          className="mx-2 w-32 h-32 bg-white drop-shadow-md rounded-lg flex-shrink-0 flex justify-center items-center"
        >
          {/* <Image
                    src={cardDatas[cardName].src}
                    alt="card"
                    width={72}
                    height={72}
                  /> */}
        </div>
      </div>
      <div className="fixed bottom-28 right-4 w-20 h-20 rounded-full bg-game-orange drop-shadow-2xl flex justify-center items-center">
        <Image src="/svg/scissors.svg" alt="はさみ" width={48} height={48} />
      </div>
    </div>
  );
});

export default Controller;
