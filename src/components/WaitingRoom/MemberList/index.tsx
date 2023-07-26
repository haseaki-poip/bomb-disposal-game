import { MembersInfoListType } from "@/types/users";
import { memo } from "react";

// eslint-disable-next-line react/display-name
const MemberList = memo(
  ({ membersInfoList }: { membersInfoList: MembersInfoListType }) => {
    return (
      <div className="w-9/12 h-[45vh] mt-6 mx-auto overflow-y-scroll">
        <ul className="w-full text-center text-white text-3xl">
          {membersInfoList.map((memberInfo, index) => {
            return (
              <li
                key={index}
                className="w-full my-3 overflow-hidden whitespace-nowrap truncate"
              >
                {memberInfo.user_name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default MemberList;
