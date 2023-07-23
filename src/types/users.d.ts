import type { CardType } from "./games";

export type UserInfoType = {
  user_name: string;
  user_type: string;
  role?: "bomber" | "polis";
  hidden_cards?: CardType[];
  show_cards?: CardType[];
};

export type MembersInfoListType = UserInfoType[];

export type MembersType = {
  existed_last_id: number;
  members_list: MembersInfoListType;
};
