import React from "react";
import styled from "styled-components";

import { Square, Circle } from "react-bootstrap-icons";
import { QuestionType } from "../../api/Polls/interfaces/polls";

export const Checkbox = ({
  type,
}: {
  type: QuestionType.MultipleChoice | QuestionType.SingleChoice;
}) => {
  return (
    <>
      {type === QuestionType.MultipleChoice ? (
        <StyledSquare />
      ) : (
        <StyledCircle />
      )}
    </>
  );
};

const StyledSquare = styled(Square)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
`;

const StyledCircle = styled(Circle)`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
`;
