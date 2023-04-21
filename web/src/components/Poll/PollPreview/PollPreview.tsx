import styled from "styled-components";
import { format, isValid } from "date-fns";

import { gradientAnimation } from "../../GlobalStyles";
import { IPoll } from "../../../api/Polls/interfaces";

export const PollPreview = (poll: IPoll) => {
  // for home page

  const dateToString = (date: Date) =>
    isValid(date) ? format(date, "d.M.y H:mm") : "";

  return (
    <StyledPollPreview>
      <PollPreviewInfo>
        <PollPreviewTitle>{poll.title}</PollPreviewTitle>
        <PollPreviewAuthor>{poll.author}</PollPreviewAuthor>
      </PollPreviewInfo>
      <StyledDetails>
        <StyledSummary>poll's details</StyledSummary>

        <StyledParagraph>{poll.description}</StyledParagraph>
        <SyledPollDetails>
          <PollDetailsColumn>
            <p>
              Avalible:
              <br />
              {dateToString(poll.creationDate)} - {dateToString(poll.endDate)}
            </p>
          </PollDetailsColumn>
          <PollDetailsColumn>
            <p>{poll.numberOfVote} answers</p>
            <p>type: {poll.isAnonymous ? "anonymous" : "not anonymous"}</p>
          </PollDetailsColumn>
        </SyledPollDetails>
      </StyledDetails>
    </StyledPollPreview>
  );
};

const PollDetailsColumn = styled.div``;

const SyledPollDetails = styled.div`
  display: flex;
  flex-direction: row;

  gap: 10px;
  padding-top: 2px;
  padding-left: 30px;
  font-size: 15px;
`;

const StyledDetails = styled.details`
  padding: 5px 0 0 15px;
`;

const StyledSummary = styled.summary`
  padding-top: 10px;
  font-size: 17px;
`;

const StyledParagraph = styled.p`
  padding-top: 5px;
  padding-left: 30px;
  font-size: 15px;

  margin: 5px;
`;

const PollPreviewInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PollPreviewAuthor = styled.h4`
  font-size: 17px;
  font-weight: normal;
`;

const StyledPollPreview = styled.div`
  margin: 3px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 15px;
  font-weight: normal;
  border-radius: 4px;
  display: flex;
  background-color: #fff;
  color: #000;

  flex-basis: calc(50% - 10px);
  margin: 5px; 

  background: #fff;
  position: relative;
  border-radius: 3px;
  margin-top: 21px;

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

const PollPreviewTitle = styled.h3`
  margin: 0;
  font-weight: normal;
`;
