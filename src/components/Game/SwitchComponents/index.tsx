import ProfileIcon from "@/components/UI/svg/ProfileIcon";
import TouchIcon from "@/components/UI/svg/TouchIcon";
import { memo } from "react";

type Props = {
  isProfilePage: boolean;
  setIsProfilePage: (isProfilePage: boolean) => void;
};

// eslint-disable-next-line react/display-name
const SwitchComponents = memo(({ isProfilePage, setIsProfilePage }: Props) => {
  return (
    <div className="w-full h-24 bg-white flex justify-center items-center">
      <div className="mx-14" onClick={() => setIsProfilePage(false)}>
        <TouchIcon isActive={!isProfilePage} />
      </div>
      <div className="mx-14" onClick={() => setIsProfilePage(true)}>
        <ProfileIcon isActive={isProfilePage} />
      </div>
    </div>
  );
});

export default SwitchComponents;
