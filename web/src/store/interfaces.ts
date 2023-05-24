export interface OptionData {
  title: string;
}

export interface QuestionData {
  question_info: {
    index: number;
    title: string;
    question_type: "SingleChoice" | "MultipleChoice" | "OpenAnswer" | null;
  };
  option_data?: OptionDataUpsert[] | undefined;
}

export interface OptionDataUpsert {
  questionIndex: number;
  optionIndex: number;
  title: string;
}

export interface OptionDataDelete {
  questionIndex: number;
  optionIndex: number;
}
