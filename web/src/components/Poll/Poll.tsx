import styled from "styled-components";
import { QuestionsContainer } from "./Question";

import { IPoll } from "../../api/Polls/interfaces";

export const Poll = (poll: IPoll) => {
  return (
    <StyledPoll>
      <PollInfo>
        <PollTitle>{poll.title}</PollTitle>
        <PollAuthor>poll.creator</PollAuthor>
      </PollInfo>
      <QuestionsContainer questions={poll.question} />
    </StyledPoll>
  );
};

const PollInfo = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const PollAuthor = styled.h4`
  height: fit-content;
  font-size: 15px;
  font-weight: normal;
`;

const StyledPoll = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  font-weight: normal;
  border-radius: 4px;
  display: flex;
  background-color: #fff;
  color: #000;
  width: 100%;
`;

const PollTitle = styled.h3`
  margin: 0;
  font-weight: normal;
`;
