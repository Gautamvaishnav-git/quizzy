import { IQuiz } from "@/app/api/db/schema/schema";
import { ResponseInternal } from "@/lib/utils/sendResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/quiz",
  }),
  endpoints: (builder) => ({
    postQuiz: builder.mutation<ResponseInternal<{ success: boolean }>, IQuiz>({
      query: (payload) => ({
        url: "/create",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { usePostQuizMutation } = quizApi;
