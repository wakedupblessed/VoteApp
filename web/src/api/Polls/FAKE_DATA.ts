import { ApiResponse, PollResponse, QuestionType } from "./interfaces";

const FAKE_DATA: ApiResponse = {
  items: [
    {
      id: "1",
      title: "Long poll title 111111111111",
      description: "Choose your favorite color from the options below.",
      is_anonymous: false,
      tags: null,
      number_of_vote: 5,
      creation_date: new Date(""),
      voters: null,
      question: [
        {
          id: "chmonia",
          title: "Question title long 22222222222222",
          type: QuestionType.SingleChoice,
          options: [
            {
              id: "chmo",
              name: "Red",
              is_correct: null,
              number_of_vote: 10,
            },
            {
              id: "chmo1",
              name: "Blue",
              is_correct: true,
              number_of_vote: 15,
            },
            {
              id: "chmo2",
              name: "Green",
              is_correct: false,
              number_of_vote: 5,
            },
            {
              id: "chmo3",
              name: "Yellow",
              is_correct: false,
              number_of_vote: 2,
            },
          ],
        },
      ],
    },
  ],
};

export default FAKE_DATA;
