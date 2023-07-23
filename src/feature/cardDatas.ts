import { CardType } from "@/types/users";

type CardDatas = {
  [key in CardType]: {
    src: string;
  };
};

export const cardDatas: CardDatas = {
  ["しーん"]: {
    src: "/svg/sleep.svg",
  },
  ["Boom"]: {
    src: "/svg/boom.svg",
  },
  ["解除"]: {
    src: "/svg/release.svg",
  },
};
