import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  QuestionDataDTO,
  OptionDataUpsert,
  OptionDataDelete,
} from "./interfaces";

export interface RootState {
  questions: {
    questionsData: QuestionDataDTO[];
  };
}

export const questionSlice = createSlice({
  name: "questions",
  initialState: { questionsData: [] } as RootState["questions"],
  reducers: {
    create: (state, action: PayloadAction<QuestionDataDTO>) => {
      state.questionsData.push({
        ...action.payload,
        option_data: [],
      });
    },

    update: (state, action: PayloadAction<QuestionDataDTO>) => {
      const updatedQuestion = action.payload;
      const indexToUpdate = updatedQuestion.question_info.index;

      state.questionsData = state.questionsData.map(question => {
        if (question.question_info.index === indexToUpdate) {
          return {
            question_info: updatedQuestion.question_info,
            option_data: updatedQuestion.option_data || question.option_data,
          };
        }
        return question;
      });
    },

    addQuestionOption: (state, action: PayloadAction<OptionDataUpsert>) => {
      const { questionIndex, title, optionIndex } = action.payload;
      const question = state.questionsData.find(
        q => q.question_info.index === questionIndex
      );
      if (question) {
        question.option_data!.push({ questionIndex, title, optionIndex });
      }
    },

    updateQuestionOption: (state, action: PayloadAction<OptionDataUpsert>) => {
      const { questionIndex, optionIndex, title } = action.payload;
      const question = state.questionsData.find(
        q => q.question_info.index === questionIndex
      );
      if (question && question.option_data![optionIndex]) {
        question.option_data![optionIndex].title = title;
      }
    },

    deleteQuestionOption: (state, action: PayloadAction<OptionDataDelete>) => {
      const { questionIndex, optionIndex } = action.payload;
      const question = state.questionsData.find(
        q => q.question_info.index === questionIndex
      );
      if (question && question.option_data![optionIndex]) {
        question.option_data!.splice(optionIndex, 1);
      }
    },
  },
});

export default questionSlice.reducer;
export const {
  create,
  update,
  addQuestionOption,
  updateQuestionOption,
  deleteQuestionOption,
} = questionSlice.actions;
