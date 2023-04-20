import { ApiResponse, QuestionType } from "./interfaces";

const FAKE_DATA: ApiResponse = {
  items: [
    {
      id: "1",
      title: "Long poll title 111111111111",
      description: "poll description",
      author: "poll author",
      is_anonymous: false,
      numberOfVote: 5,
      creationDate: new Date(""),
      endDate:new Date(""),
      responders: null,
      question: [
        {
          id: "chmonia",
          title: "Question title long 22222222222222",
          type: QuestionType.SingleChoice,
          options: [
            {
              id: "chmo",
              title: "Red",
            },
            {
              id: "chmo2",
              title: "Green",
            },
            {
              id: "chmo3",
              title: "Yellow",
            },
          ],
        },
        {
          id: "favfruit",
          title: "What is your favorite fruit?",
          type: QuestionType.MultipleChoice,
          options: [
            {
              id: "apple",
              title: "Apple",
            },
            {
              id: "banana",
              title: "Banana",
            },
            {
              id: "orange",
              title: "Orange",
            },
            {
              id: "strawberry",
              title: "Strawberry",
            }
          ]
        },
      ],
    },
  ],
};

export default FAKE_DATA;
