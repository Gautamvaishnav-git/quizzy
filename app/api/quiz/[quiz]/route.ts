import { Logger } from "@/lib/utils/logger";
import sendResponse from "@/lib/utils/sendResponse";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "../../db";
import { questions } from "../../db/schema/schema";

export interface IContext {
  params: {
    quiz: number;
  };
}

export async function GET(request: NextRequest, context: IContext) {
  try {
    const quiz = await db.query.questions.findFirst({ where: eq(questions.id, context.params.quiz) });
    return sendResponse({ success: true, data: quiz }, "quiz fetched successfully", 200);
  } catch (error) {
    const logger = new Logger(error, __filename);
    return sendResponse({ success: true }, logger.message, 200);
  }
}
