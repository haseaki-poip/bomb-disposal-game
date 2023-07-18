import { getMembersInfo } from "@/lib/firebase/realtimeDB";

const Login = () => {
  const confirm = async () => {
    await getMembersInfo("12345");
  };
  return <div onClick={() => confirm()}>Login Page</div>;
};

export default Login;
