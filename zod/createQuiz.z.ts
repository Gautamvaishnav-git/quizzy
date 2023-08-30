import * as z from "zod";
export const createQuizSchema = z
  .object({
    question: z.string(z.number()).min(1, { message: "Enter question!" }),
    option1: z.string(z.number()).min(1),
    option2: z.string(z.number()).min(1),
    option3: z.string(z.number()).min(1),
    option4: z.string(z.number()).min(1),
    quizID: z.string(z.number()).optional(),
    answer: z.string(z.number({ required_error: "Answer is required!" })),
    description: z.string().optional(),
  })
  .refine(
    (values) => {
      switch (values.answer) {
        case values.option1:
          return true;
        case values.option2:
          return true;
        case values.option3:
          return true;
        case values.option4:
          return true;
        default:
          return false;
      }
    },
    {
      message: "Choose correct answer!",
      path: ["answer"],
    }
  );

export type IQuiz = z.infer<typeof createQuizSchema>;
