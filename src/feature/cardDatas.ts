import { CardType } from "@/types/games";

type CardDatas = {
  [key in CardType]: {
    src: string;
    bgColorCss: string;
  };
};

export const cardDatas: CardDatas = {
  ["しーん"]: {
    src: "/svg/sleep.svg",
    bgColorCss: "bg-game-gray",
  },
  ["Boom"]: {
    src: "/svg/boom.svg",
    bgColorCss: "bg-game-red",
  },
  ["解除"]: {
    src: "/svg/release.svg",
    bgColorCss: "bg-game-blue",
  },
};
