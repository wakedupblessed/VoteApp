import { ApiResponse, QuestionType } from "./interfaces";

const FAKE_DATA: ApiResponse = {
  items: [
    {
      id: "1",
      title: "Long poll title 111111111111",
      description:
        "poll description poll description poll description poll description poll description poll description poll description poll description poll description poll description poll description poll description poll description poll description poll description poll description ",
      author: "poll author",
      isAnonymous: false,
      numberOfVote: 5,
      creationDate: new Date(""),
      endDate: new Date(""),
      responders: null,
      question: [
        {
          id: "chmonia",
          title: "Question title long 22222222222222",
          type: QuestionType.OpenAnswer,
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
          type: QuestionType.SingleChoice,
          options: [
            {
              id: "apple-id",
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
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Short poll title",
      description: "a brief poll description",
      author: "John Smith",
      isAnonymous: true,
      numberOfVote: 0,
      creationDate: new Date(),
      endDate: new Date(),
      responders: null,
      question: [
        {
          id: "gender",
          title: "What is your gender?",
          type: QuestionType.SingleChoice,
          options: [
            {
              id: "male",
              title: "Male",
            },
            {
              id: "female",
              title: "Female",
            },
            {
              id: "nonbinary",
              title: "Non-binary",
            },
            {
              id: "other",
              title: "Other",
            },
          ],
        },
        {
          id: "programming",
          title: "What programming languages do you know?",
          type: QuestionType.SingleChoice,
          options: [
            {
              id: "python",
              title: "Python",
            },
            {
              id: "java",
              title: "Java",
            },
            {
              id: "javascript",
              title: "JavaScript",
            },
            {
              id: "c++",
              title: "C++",
            },
            {
              id: "ruby",
              title: "Ruby",
            },
            {
              id: "other",
              title: "Other",
            },
          ],
        },
      ],
    },
  ],
};

export default FAKE_DATA;
