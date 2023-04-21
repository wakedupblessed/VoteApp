import { useState, useEffect } from "react";
import styled from "styled-components";

import { gradientAnimation, StyledHr } from "../../GlobalStyles";
import { IPoll } from "../../../api/Polls/interfaces";
import { PollApi } from "../../../api/Polls/api";
import { Poll } from "../Poll";
import { PollPreview } from "./PollPreview";

export const PollsPreviewContainer = () => {
  const [polls, setPolls] = useState<IPoll[] | null>(null);

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
      return (
        <>
        <PollPreview key={item.id} {...item}></PollPreview>
        </>
      );
    });
  };

  return <PollPreviewContainer>{renderPollItems()}</PollPreviewContainer>;
};

const PollPreviewContainer = styled.div`
  margin-top: 20px;
  position: relative;
  left: 3px;
  display: flex;
  flex-direction: column;
`;
