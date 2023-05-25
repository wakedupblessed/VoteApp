import axios from "axios";

import {
  POLLS_PREVIEW,
  GET_POLL,
  CREATE_POLL,
  VOTE,
  POLLS_ALLOWED_PREVIEW,
} from "./urls";
import { PollDTO, PollPreviewDTO, PollVote } from "./interfaces/polls";
import { PollDTO as PollCreate } from "../../store/interfaces";
import { AuthTokens } from "../Auth/api";

export class PollApi {
  static async getAll(): Promise<PollPreviewDTO[] | null> {
    try {
      const response = await axios.get(POLLS_PREVIEW);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  static async getAllowed(
    user_id: number,
    token: string
  ): Promise<PollPreviewDTO[] | null> {
    try {
      const url = `${POLLS_ALLOWED_PREVIEW}/${user_id}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  static async get(id: string): Promise<PollDTO | null> {
    try {
      const url = `${GET_POLL}/${id}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  static async create(poll: PollCreate, token: string) {
    try {
      const response = await axios.post(CREATE_POLL, poll, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async vote(question: PollVote, token: string) {
    try {
      const response = await axios.post(VOTE, question, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
