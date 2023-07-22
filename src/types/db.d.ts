import { RoomsInfoType } from "./rooms";
import { MembersType } from "./users";

export type DBType = {
  members: MembersType;
  rooms: RoomsInfoType;
  games?: GamesInfoType;
};
