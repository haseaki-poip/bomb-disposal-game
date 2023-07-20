import FormSection from "@/components/UI/FormSection";
import SquareButton from "@/components/UI/SquareButton";
import { saveCookiesInRoom } from "@/lib/cookies/cookies";
import { CustomError } from "@/lib/error";
import { createRoom, loginRoom } from "@/lib/firebase/db/roomControl";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const Login = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const createRoomProcess = async () => {
    try {
      const response = await createRoom();

      const roomId = response.roomId;
      const secretId = response.secretId;
      const userId = response.userId;

      saveCookiesInRoom(secretId, userId);

      router.push(`/waitingroom/${roomId}`);
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message);
      } else {
        alert("エラーが発生しました");
      }
    }
  };

  const loginRoomProcess = useCallback(async () => {
    try {
      const response = await loginRoom(roomId);
      const secretId = response.secretId;
      const userId = response.userId;

      saveCookiesInRoom(secretId, userId);

      router.push(`/waitingroom/${roomId}`);
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message);
      } else {
        alert("エラーが発生しました");
      }
    }
  }, [roomId]);

  return (
    <div className="w-full h-full min-h-screen bg-login-main-color pt-16 flex flex-col items-center justify-center">
      <div className="w-full flex justify-center">
        <FormSection title="ルーム作成">
          <SquareButton
            value="作成"
            btnColor="white"
            handleButton={() => createRoomProcess()}
          />
        </FormSection>
      </div>
      <div className="mt-16 w-full flex justify-center">
        <FormSection title="ルーム参加">
          <div className="w-full text-center mb-8">
            <input
              className="bg-transparent border-[1px] border-white rounded-lg w-10/12 h-12 text-center text-white text-lg outline-none"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <SquareButton
            value="参加"
            btnColor="orange"
            handleButton={() => loginRoomProcess()}
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
