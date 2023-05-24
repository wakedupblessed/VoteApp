import { QuestionType } from "../api/Polls/interfaces";

export const formatOption = (option: QuestionType): string => {
  switch (option) {
    case QuestionType.SingleChoice:
      return "Single Choice";
    case QuestionType.MultipleChoice:
      return "Multiple Choice";
    case QuestionType.OpenAnswer:
      return "Open Answer";
  }
};

export const reverseFormatOption = (
  option: QuestionType | null
): "SingleChoice" | "MultipleChoice" | "OpenAnswer" | null => {
  switch (option) {
    case QuestionType.SingleChoice:
      return "SingleChoice";
    case QuestionType.MultipleChoice:
      return "MultipleChoice";
    case QuestionType.OpenAnswer:
      return "OpenAnswer";
    default:
      return null;
  }
};
