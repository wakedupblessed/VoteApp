import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { X } from "react-bootstrap-icons";

import { PollElementContainer } from "../GlobalStyles";
import AllowedUsersSelector from "./AllowedUsersSelector";
import { User } from "../../api/Auth/interfaces";

interface AllowsUsersProps {
  setAllowedUsers: (value: number[]) => void;
}

const AllowedUsers = ({ setAllowedUsers }: AllowsUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const handleUserDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  useEffect(() => {
    setAllowedUsers(users.map(user => user.id));
  }, [users]);

  return (
    <PollElementContainer>
      Choose users who will have permission to take part in this survey:
      <AllowedUsersSelector users={users} updateUsersList={setUsers} />
      {users.length > 0 && (
        <SelectedUsersContainer>
          {users.map(user => (
            <SelectedUser key={user.id}>
              {user.username}
              <StyledX onClick={() => handleUserDelete(user.id)} />
            </SelectedUser>
          ))}
        </SelectedUsersContainer>
      )}
    </PollElementContainer>
  );
};

const SelectedUsersContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  gap: 5px;
`;

const SelectedUser = styled.div`
  background-color: rgba(211, 211, 211, 28%);
  border-radius: 3px;
  padding: 7px;
  display: flex;
  align-items: center;
`;

const StyledX = styled(X)`
  cursor: pointer;
  margin-left: 10px;
`;

export default AllowedUsers;
