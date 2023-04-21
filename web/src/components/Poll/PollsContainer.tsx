import { useState, useEffect } from "react";
import styled from "styled-components";


import { ApiResponse, IPoll } from "../../api/Polls/interfaces";
import { PollApi } from "../../api/Polls/api";
import { Poll } from "./Poll";

export const PollsContainer = () => {
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
      return <Poll key={item.id} {...item}></Poll>;
    });
  };

  return <PollContainer>{renderPollItems()}</PollContainer>;
};

const PollContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
