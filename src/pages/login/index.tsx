import FormSection from "@/components/UI/FormSection";
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
    <div className="w-full h-full min-h-screen bg-login-main-color pt-16 flex flex-col items-center justify-center">
      <div className="w-full flex justify-center">
        <FormSection title="ルーム作成">
          <SquareButton
            value="作成"
            btnColor="white"
            handleButton={() => confirm()}
          />
        </FormSection>
      </div>
      <div className="mt-16 w-full flex justify-center">
        <FormSection title="ルーム参加">
          <div className="w-full text-center mb-8">
            <input className="bg-transparent border-[1px] border-white rounded-lg w-10/12 h-12 text-center text-white text-lg outline-none" />
          </div>
          <SquareButton
            value="参加"
            btnColor="orange"
            handleButton={() => createRoomProcess()}
          />
        </FormSection>
      </div>
      <div className="mt-8 font-bold text-5xl text-center text-white">
        Bomb Disposal
      </div>
    </div>
  );
};

export default Login;
