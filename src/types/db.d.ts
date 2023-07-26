import { RoomsInfoType } from "./rooms";
import { MembersType } from "./users";
import { GamesInfoType } from "./games";

export type DBType = {
  members: MembersType;
  rooms: RoomsInfoType;
  games?: GamesInfoType;
};
