import { IPoll, IQuestion, IOption } from "./interfaces";
import FAKE_DATA from "./FAKE_DATA";

export class PollApi {
  static async getAll(test: boolean) {
    if (test) {
      return FAKE_DATA;
    }

    // we will make request on server later;
  }

  static async get(id: string, test: boolean): Promise<IPoll | undefined> {
    if (test) {
      return FAKE_DATA.items.find((poll) => poll.id === id);
    }

    // we will make request on server later;
  }
}
