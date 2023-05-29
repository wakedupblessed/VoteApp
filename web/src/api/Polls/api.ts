import axios from "axios";

import {
  POLLS_PREVIEW,
  GET_POLL,
  CREATE_POLL,
  VOTE,
  POLLS_ALLOWED_PREVIEW,
  USERS,
  VOTE_STATISTIC,
  USER_POLLS,
  DELETE_POLL,
} from "./urls";
import {
  PollDTO,
  PollPreviewDTO,
  PollVote,
  UsersDTO,
  PollStatisticDTO,
} from "./interfaces/polls";
import { PollDTO as PollCreate } from "../../store/interfaces";

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

  static async getUsersPoll(
    id: number,
    token: string
  ): Promise<PollPreviewDTO[] | null> {
    try {
      const url = `${USER_POLLS}/${id}`;
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

    return null;
  }

  static async deletePoll(id: string, token: string) {
    try {
      const response = await axios.post(DELETE_POLL, id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        return response;
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

  static async getVoteStatistic(
    poll_id: string,
    user_id: number,
    token: string
  ): Promise<PollStatisticDTO | null> {
    try {
      const url = `${VOTE_STATISTIC}/${poll_id}/${user_id}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {}

    return null;
  }

  static async getUsers(token: string): Promise<UsersDTO | null> {
    try {
      const response = await axios.get(USERS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        if (response.data === null) {
          return null;
        }
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }
}
