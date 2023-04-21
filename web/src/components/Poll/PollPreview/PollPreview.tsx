import styled from "styled-components";
import { format, isValid } from "date-fns";

import { gradientAnimation, StyleValues } from "../../GlobalStyles";
import { IPoll } from "../../../api/Polls/interfaces";

export const PollPreview = (poll: IPoll) => {
  // for home page

  const dateToString = (startDate: Date, endDate: Date) =>
    isValid(startDate) && isValid(endDate) ? `${format(startDate, "d.M.y H:mm")} - ${format(endDate, "d.M.y H:mm")}` : "deadline not set";

  return (
    <StyledPollPreview>
      <div>
        <PollPreviewHeader><p>{poll.title}</p><p>{poll.author}</p></PollPreviewHeader>
      </div>
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
    </StyledPollPreview>
  );
};

const StyledPollPreview = styled.div`
  width: calc(100% - 35px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-weight: normal;
  font-size: ${StyleValues.commonFontWeight};
  border-radius: 4px;
  display: flex;
  background-color: #fff;
  color: #000;
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

const PollPreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  & > p:first-child {
    font-weight: bold;
  }
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
  padding: 5px 10px 0 15px;
  font-size: ${StyleValues.smallFontWeight};
  & > p{
    padding-left: 30px;
  }
`;