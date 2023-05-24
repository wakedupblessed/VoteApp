import React from "react";
import { StyledInput } from "../GlobalStyles";
import styled from "styled-components";

const AnswerElement = () => {
  return (
    <AnswerElementContainer>
      <AnswerInput placeholder='Enter answer' readOnly />
    </AnswerElementContainer>
  );
};

const AnswerElementContainer = styled.div`
  display: flex;
  width: 50%;
`;

const AnswerInput = styled(StyledInput)`
  flex-grow: 1;
`;

export default AnswerElement;
