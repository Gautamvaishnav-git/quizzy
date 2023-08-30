import sendResponse from "@/lib/utils/sendResponse";
import { NextRequest } from "next/server";
import { db } from "../db";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  // const results = await db
  //   .select()
  //   .from(questions)
  //   .where(and(inArray(questions.id, [3, 2, 5, 6, 7]), or(notIlike(questions.option1, "%E"), not(eq(questions.id, 4)))));
  // const results = await db.query.users.findFirst({
  //   with: {
  //     profile: true,
  //     questions: true,
  //   },
  // });

  // const results = await db.query.questions.findFirst({
  //   with: {
  //     user: true,
  //     questionCategories: {
  //       with: {
  //         category: true,
  //         // question: true
  //       },
  //     },
  //   },
  // });

  // const results = await db.query.categories.findFirst({
  //   with: {
  //     questions: true,
  //   },
  // });

  const results = await db.query.questionsOnCategory.findMany({
    with: {
      category: true,
      question: true,
    },
  });

  console.log(req.url);
  return sendResponse(results, "ok", 200);
}
