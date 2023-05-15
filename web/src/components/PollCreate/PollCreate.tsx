import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  StyledButton,
  StyledInput,
  StyledTextArea,
  PollElementContainer,
} from "../../components/GlobalStyles";

import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import DeadLineInput from "./DeadlineInput";
import AllowedUsersInput from "../AllowedUsers/AllowedUsersInput";
import PollElement from "./PollElement";
// import AllowedUsersList from "../AllowedUsers/AllowedUsersList";

const PollCreate = () => {
  const [deadlineDate, setDeadlineDate] = useState<string | null>(null);
  const [privatePoll, setPrivatePoll] = useState<boolean>(false);
  const [anonymous, setAnonymous] = useState(false);
  const [allowedUsers, setAllowedUsers] = useState<string[]>([]);

  return (
    <>
      <PollCreateContainer>
        <PollElementContainer>
          <PollTitleInput type='text' placeholder='Enter poll title' />
          <StyledTextArea placeholder='Enter poll description' />
          <DeadLineInput onChange={setDeadlineDate} />
          <CustomCheckBox
            id='anonymous'
            label='Anonymous Voting'
            onChange={setAnonymous}
          />
          <AllowedUsersInput users={allowedUsers} setUsers={setAllowedUsers} />
        </PollElementContainer>
        {/* <AllowedUsersList></AllowedUsersList> */}
        <PollElement />
        <StyledButton onClick={() => {}} type='button'>
          Add Question
        </StyledButton>
      </PollCreateContainer>
    </>
  );
};

const PollCreateContainer = styled.div`
  flex-direction: column;
  display: flex;
  gap: 20px;
  align-items: end;
`;

const PollTitleInput = styled(StyledInput)`
  width: auto;
`;

export default PollCreate;
