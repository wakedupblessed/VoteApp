import { useParams } from "react-router";
import { PollApi } from "../../api/Polls/api";
import { Poll } from "../../components/Poll/Poll";
import { useEffect, useState } from "react";
import { PollDTO } from "../../api/Polls/interfaces/polls";
import { useNavigate } from "react-router";

export const PollDetail = () => {
  const [poll, setPoll] = useState<PollDTO | null>(null);
  const { pollId } = useParams();
  const navigate = useNavigate();

  const getPoll = async () => {
    try {
      if (!pollId) {
        throw new Error("Poll ID is not provided");
      }

      const poll = await PollApi.get(pollId);

      if (!poll) {
        throw new Error("Poll not found");
      }

      setPoll(poll);
    } catch (error) {
      console.log(error);
      navigate("/not-found");
    }
  };

  useEffect(() => {
    getPoll();
  }, [pollId, navigate]);

  return <>{poll && <Poll {...poll} />}</>;
};
