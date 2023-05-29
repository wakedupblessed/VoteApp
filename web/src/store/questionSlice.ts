import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { QuestionDTO, OptionUpsert, OptionDelete } from "./interfaces";

export interface RootState {
  questions: {
    questionsData: QuestionDTO[];
  };
}

export const questionSlice = createSlice({
  name: "questions",
  initialState: { questionsData: [] } as RootState["questions"],
  reducers: {
    create: (state, action: PayloadAction<QuestionDTO>) => {
      state.questionsData.push({
        ...action.payload,
        option_data: [],
      });
    },

    update: (state, action: PayloadAction<QuestionDTO>) => {
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

    deleteQuestion: (state, action: PayloadAction<number>) => {
      state.questionsData = state.questionsData.filter(
        question => question.question_info.index !== action.payload
      );
    },

    addQuestionOption: (state, action: PayloadAction<OptionUpsert>) => {
      const { questionIndex, title, optionIndex } = action.payload;
      const question = state.questionsData.find(
        q => q.question_info.index === questionIndex
      );
      if (question) {
        question.option_data!.push({ questionIndex, title, optionIndex });
      }
    },

    updateQuestionOption: (state, action: PayloadAction<OptionUpsert>) => {
      const { questionIndex, optionIndex, title } = action.payload;
      const question = state.questionsData.find(
        q => q.question_info.index === questionIndex
      );
      if (question && question.option_data![optionIndex]) {
        question.option_data![optionIndex].title = title;
      }
    },

    deleteQuestionOption: (state, action: PayloadAction<OptionDelete>) => {
      const { questionIndex, optionIndex } = action.payload;
      const question = state.questionsData.find(
        q => q.question_info.index === questionIndex
      );
      if (question && question.option_data![optionIndex]) {
        question.option_data!.splice(optionIndex, 1);
      }
    },

    clear: state => {
      state.questionsData = [];
    },
  },
});

export default questionSlice.reducer;

export const {
  create,
  update,
  deleteQuestion,
  addQuestionOption,
  updateQuestionOption,
  deleteQuestionOption,
  clear,
} = questionSlice.actions;
