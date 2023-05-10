import { useParams } from "react-router";
import { PollApi } from "../../api/Polls/api";
import { Poll } from "../../components/Poll/Poll";
import { useEffect, useState } from "react";
import { IPoll } from "../../api/Polls/interfaces";
import { useNavigate } from "react-router";

export const PollDetail = () => {
  const [poll, setPoll] = useState<IPoll | undefined>(undefined);

  const { pollId } = useParams();
  const navigate = useNavigate();

  const getPoll = async (pollId: string | undefined) => {
    if (!pollId) throw new Error("error");

    const poll = await PollApi.get(pollId!, true);

    if (!poll) {
      throw new Error("error");
    }

    setPoll(poll);
  };

  const loadPoll = async () => {
    try {
      await getPoll(pollId!);
    } catch (error) {
      navigate("not-found");
    }
  };

  loadPoll();

  useEffect(() => {
    loadPoll();
  }, [pollId]);

  return <>{poll && <Poll {...poll} />}</>;
};
