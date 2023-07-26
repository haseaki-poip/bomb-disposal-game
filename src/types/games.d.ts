export type CardType = "しーん" | "Boom" | "解除";
export type RoleType = "bomber" | "polis";

export type GamesInfoType = {
  processor: number;
  result: CardType;
  release_num: number;
  success_num: number;
  winner: RoleType | "";
};
