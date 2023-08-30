import { IQuiz } from "@/zod/createQuiz.z";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const quizInitialState: IQuiz[] = [];

const quizSlice = createSlice({
  name: "quiz",
  initialState: quizInitialState,
  reducers: {
    createQuiz: (state, action: PayloadAction<IQuiz>) => {
      state.push(action.payload);
      return state;
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      return state.filter((quiz) => quiz.quizID !== action.payload);
    },
  },
});

export const { createQuiz, deleteQuiz } = quizSlice.actions;

export default quizSlice.reducer;
