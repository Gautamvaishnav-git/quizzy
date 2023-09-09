import { IQuiz } from "@/app/api/db/schema/schema";
import { IQuizSchema } from "@/app/quiz/create/page";
import { ResponseInternal } from "@/lib/utils/sendResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/quiz",
  }),
  tagTypes: ["listQuiz", "getQuiz"],
  endpoints: (builder) => ({
    // create a quiz.
    postQuiz: builder.mutation<ResponseInternal<{ success: boolean }>, IQuizSchema>({
      query: (payload) => ({
        url: "/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["listQuiz"],
    }),

    // list all quiz.
    listQuiz: builder.query<ResponseInternal<{ success: boolean; questions: IQuiz[] }>, void>({
      query: () => "/list",
      providesTags: ["listQuiz", "getQuiz"],
    }),

    // get a single quiz.
    getQuiz: builder.query<ResponseInternal<{ success: boolean; question: IQuiz }>, { quizId: number }>({
      query: ({ quizId }) => "/" + quizId,
      providesTags: ["getQuiz"],
    }),
  }),
});

export const { usePostQuizMutation, useListQuizQuery, useGetQuizQuery } = quizApi;
