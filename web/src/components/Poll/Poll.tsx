import styled from "styled-components";
import { QuestionsContainer } from "../Questions/QuestionsContainer";
import { gradientAnimation, StyleValues } from "../GlobalStyles";
import { format, isValid } from "date-fns";

import { IPoll } from "../../api/Polls/interfaces";

export const Poll = (poll: IPoll) => {
  const dateToString = (startDate: Date, endDate: Date) =>
    isValid(startDate) && isValid(endDate) ? `${format(startDate, "d.M.y H:mm")} - ${format(endDate, "d.M.y H:mm")}` : "deadline not set";

  return (
    <StyledPoll>
      <PollInfo>
        <PollTitle>{poll.title}</PollTitle>
        <PollAuthor>poll.creator</PollAuthor>
      </PollInfo>
      <StyledDetails>
        <summary>poll's details</summary>
        <p>{poll.description}</p>
        <SyledPollDetails>
          <div><p>Avalible:<br />{dateToString(poll.creationDate, poll.endDate)}</p></div>
          <div>
            <p>{poll.numberOfVote} answers</p>
            <p>type: {poll.isAnonymous ? "anonymous" : "not anonymous"}</p>
          </div>
        </SyledPollDetails>
      </StyledDetails>
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

const PollAuthor = styled.p`
  height: fit-content;
  font-size: ${StyleValues.commonFontWeight};
  font-weight: normal;
`;

const StyledPoll = styled.div`
  margin-top: 20px; 
  width: calc(100% - 35px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-weight: normal;
  display: flex;
  background: #fff;
  position: relative;
  border-radius: 3px;

  &:after {
    content: "";
    position: absolute;
    top: calc(-1 * 3px);
    left: calc(-1 * 3px);
    height: calc(100% + 3px * 2);
    width: calc(100% + 3px * 2);
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    border-radius: calc(2 * 3px);
    z-index: -1;
    animation: ${gradientAnimation} 15s ease infinite;
    background-size: 400% 400%;
  }
`;

const PollTitle = styled.h3`
  margin: 0;
  font-weight: normal;
`;


const SyledPollDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-top: 5px;
  padding-left: 30px;
  font-size: ${StyleValues.smallFontWeight};

  & > div {
    width: calc(100% / 2 - 5px);
  }
`;

const StyledDetails = styled.details`
  padding: 10px 10px 5px 15px;
  font-size: ${StyleValues.smallFontWeight};
  & > p{
    padding-left: 30px;
  }
`;