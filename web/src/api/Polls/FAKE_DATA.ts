import { ApiResponse, PollResponse } from "./interfaces";

const FAKE_DATA: ApiResponse = {
  items: [
    {
      id: "1",
      title: "What's your favorite color?",
      description: "Choose your favorite color from the options below.",
      is_anonymous: false,
      tags: null,
      number_of_vote: 5,
      creation_date: new Date(""),
      voters: null,
      question: [
        {
          title: "dsfsfs",
          options: [
            {
              name: "Red",
              is_correct: null,
              number_of_vote: 10,
            },
            {
              name: "Blue",
              is_correct: true,
              number_of_vote: 15,
            },
            {
              name: "Green",
              is_correct: false,
              number_of_vote: 5,
            },
            {
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
