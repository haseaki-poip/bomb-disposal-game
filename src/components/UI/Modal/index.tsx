import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full h-screen bg-black opacity-60"></div>
      <div className="fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
};

export default Modal;
