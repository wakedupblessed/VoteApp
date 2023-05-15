import React from "react";
import styled from "styled-components";
import PollCreate from "../../components/PollCreate/PollCreate";

const CreatePollPage = () => {
  return (
    <PollCreateArea>
      <PollCreate />
    </PollCreateArea>
  );
};

const PollCreateArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-direction: column;
  gap: 20px;
`;

const CheckBoxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const CheckBoxWithInputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CreatePollPage;
