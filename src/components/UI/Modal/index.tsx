import { ReactNode } from "react";

type Props = {
  closeModal: () => void;
  children: ReactNode;
};

const Modal = ({ children, closeModal }: Props) => {
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full h-screen bg-black opacity-60"></div>
      <div className="fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center">
        {children}
        <div
          className="fixed bottom-28 right-4 w-20 h-20 rounded-full bg-game-gray drop-shadow-2xl flex justify-center items-center"
          onClick={() => closeModal()}
        >
          <div className="w-12 h-12 relative">
            <i className="w-full h-1 bg-white absolute top-1/2 left-0 -translate-y-1/2 rotate-45"></i>
            <i className="w-full h-1 bg-white absolute top-1/2 left-0 -translate-y-1/2 -rotate-45"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
