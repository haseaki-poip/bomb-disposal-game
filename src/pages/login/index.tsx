import SquareButton from "@/components/UI/SquareButton";
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
      <SquareButton
        value="作成"
        btnColor="white"
        handleButton={() => confirm()}
      />
      <SquareButton
        value="参加"
        btnColor="orange"
        handleButton={() => createRoomProcess()}
      />
    </div>
  );
};

export default Login;
