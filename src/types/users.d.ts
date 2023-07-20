export type UserInfoType = {
  user_name: string;
  user_type: string;
  role?: string;
  hidden_cards?: string[];
  show_cards?: string[];
};

export type MembersInfoListType = UserInfoType[];
