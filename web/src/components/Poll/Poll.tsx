import styled from "styled-components";

import { PollResponse } from "../../api/Polls/interfaces";

export const Poll = (poll: PollResponse) => {
  return (
    <StyledPoll>
      <StyledH3>{poll.title}</StyledH3>
    </StyledPoll>
  );
};

const StyledPoll = styled.div`
  border-radius: var(--borderWidth);
  display: flex;
  background-color: #000;
  color: #fff;
  width: 100%;
`;

const StyledH3 = styled.h3`
  margin: 0;
`;
