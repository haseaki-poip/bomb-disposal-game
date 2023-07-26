import { RoleType } from "@/types/games";
type RoleData = {
  roleName: string;
  roleExplanation: string;
  roleBgColorClass: string;
  roleTextColorClass: string;
  roleImgSrc: string;
};

export const roleDatas: { [key in RoleType]: RoleData } = {
  polis: {
    roleName: "ボムポリス",
    roleExplanation: "爆発する前に解除チップを揃えれば勝利です。",
    roleBgColorClass: "bg-game-blue",
    roleTextColorClass: "text-game-blue",
    roleImgSrc: "/svg/polis.svg",
  },
  bomber: {
    roleName: "ボマー",
    roleExplanation: "解除チップが揃う前に爆発させれば勝利です。",
    roleBgColorClass: "bg-game-red",
    roleTextColorClass: "text-game-red",
    roleImgSrc: "/svg/bomber.svg",
  },
};
