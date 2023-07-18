import { createRoom, getMembersInfo } from "@/lib/firebase/realtimeDB";

const Login = () => {
  const confirm = async () => {
    await getMembersInfo("12345");
  };
  const createRoomProcess = async () => {
    const response = await createRoom();
    if (!response) {
      return;
    }
    const roomId = response.roomId;
    const selectId = response.secretId;
  };
  return (
    <div>
      <div onClick={() => confirm()}>confirm</div>
      <div onClick={() => createRoomProcess()}>create room</div>
    </div>
  );
};

export default Login;
