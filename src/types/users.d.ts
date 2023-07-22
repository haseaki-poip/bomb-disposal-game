export type UserInfoType = {
  user_name: string;
  user_type: string;
  role?: ("bomber" | "polis")[];
  hidden_cards?: string[];
  show_cards?: string[];
};

export type MembersInfoListType = UserInfoType[];

export type MembersType = {
  existed_last_id: number;
  members_list: MembersInfoListType;
};
