import { removeCookiesInRoom } from "./cookies/cookies";
import { deleteUserInfo } from "./firebase/db/userControl";

export const deleteUserInfoInRoom = (roomId: string, userId: number) => {
  deleteUserInfo(roomId, userId);
  removeCookiesInRoom();
};
