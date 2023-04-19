import { useState, useEffect } from "react";
import styled from "styled-components";

import { gradientAnimation } from "../GlobalStyles";
import { PollResponse } from "../../api/Polls/interfaces";
import { PollApi } from "../../api/Polls/api";
import { Poll } from "./Poll";

export const PollsContainer = () => {
  const [polls, setPolls] = useState<PollResponse[] | null>(null);

  async function getResponse() {
    const result = await PollApi.getAll(true);

    if (result?.items && result?.items.length > 0) {
      setPolls(result.items);
    }
  }

  useEffect(() => {
    getResponse();
  }, []);

  const renderPollItems = () => {
    return polls?.map((item) => {
      return <Poll {...item}></Poll>;
    });
  };

  return <PollContainer>{renderPollItems()}</PollContainer>;
};

const PollContainer = styled.div`

  display: flex;
  margin: 20px 0;

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
