import { IQuiz } from "@/app/api/db/schema/schema";
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
    deleteQuiz: (state, action: PayloadAction<number>) => {
      return state.filter((quiz) => quiz.id !== action.payload);
    },
  },
});

export const { createQuiz, deleteQuiz } = quizSlice.actions;

export default quizSlice.reducer;
