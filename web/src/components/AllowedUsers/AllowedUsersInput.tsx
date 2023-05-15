import React, { useState } from "react";
import { CheckBoxWithInputArea } from "../GlobalStyles";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import AllowedUsersSelector from "./AllowedUsersSelector";

interface AllowedUsersInputProps {
  users: string[];
  setUsers: (value: string[]) => void;
}

const AllowedUsersInput = ({ users, setUsers }: AllowedUsersInputProps) => {
  const [privatePoll, setPrivatePoll] = useState<boolean>(false);

  return (
    <CheckBoxWithInputArea>
      <CustomCheckBox
        id='private'
        label='Private Poll'
        onChange={setPrivatePoll}
      />
      {privatePoll && (
        <AllowedUsersSelector users={users} updateUsersList={setUsers} />
      )}
    </CheckBoxWithInputArea>
  );
};

export default AllowedUsersInput;
