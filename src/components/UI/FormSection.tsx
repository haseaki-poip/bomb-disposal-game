import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};
const FormSection = ({ title, children }: Props) => {
  return (
    <div className="border-white border-[1px] rounded-lg w-10/12 pb-9 flex flex-col items-center">
      <div className="w-56 text-4xl font-bold text-center bg-login-main-color -translate-y-1/2 text-white">
        {title}
      </div>
      {children}
    </div>
  );
};

export default FormSection;
