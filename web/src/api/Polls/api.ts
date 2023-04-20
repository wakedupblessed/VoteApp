import { IPoll, IQuestion, IOption } from "./interfaces";
import FAKE_DATA from "./FAKE_DATA";

export class PollApi {
  static async getAll(test: boolean) {
    if (test) {
      return FAKE_DATA;
    }

    // we will make request on server later;
  }
}
