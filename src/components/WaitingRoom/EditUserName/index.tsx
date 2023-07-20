import { memo } from "react";
import { useState } from "react";
import Image from "next/image";

// eslint-disable-next-line react/display-name
const EditUserName = memo(() => {
  const [userName, setUserName] = useState("user0");
  const [isEdit, setIsEdit] = useState(false);
  const onChangeUserName = (userName: string) => {
    setIsEdit(true);
    setUserName(userName);
  };

  const saveUserName = () => {
    setIsEdit(false);
  };

  return (
    <div className="w-72 h-12 mt-12 mx-auto border-[1px] border-white rounded-lg relative">
      <div className="absolute top-0 left-0 -translate-y-full text-white text-xs">
        マイネーム
      </div>
      <label>
        <input
          className="w-60 h-full outline-none bg-transparent text-lg text-center text-white"
          value={userName}
          onChange={(e) => onChangeUserName(e.target.value)}
        />
        {isEdit ? null : (
          <div className="absolute top-1/2 right-4 z-0 -translate-y-1/2">
            <Image src="/svg/edit.svg" width="20" height="20" alt="share" />
          </div>
        )}
      </label>
      {isEdit ? (
        <div
          className="absolute top-1/2 right-4 z-0 -translate-y-1/2 transition-transform"
          onClick={() => saveUserName()}
        >
          <Image
            src="/svg/save.svg"
            width="20"
            height="20"
            alt="share"
            className="animate-pulse"
          />
        </div>
      ) : null}
    </div>
  );
});
export default EditUserName;
