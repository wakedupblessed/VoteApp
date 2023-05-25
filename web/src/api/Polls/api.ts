// import { IPoll, IQuestion, IOption } from "./interfaces";
import axios from "axios";

import { POLLS_PREVIEW, GET_POLL } from "./urls";
import { PollDTO, PollPreviewDTO } from "./interfaces/polls";

export class PollApi {
  static async getAllPreview(): Promise<PollPreviewDTO[] | null> {
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
}
