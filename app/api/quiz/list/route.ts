import { verifyToken } from "@/lib/utils/jwt";
import sendResponse from "@/lib/utils/sendResponse";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "../../db";
import { IUser, questions } from "../../db/schema/schema";
import { Logger } from "../../../../lib/utils/logger";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return sendResponse({ success: false }, "Unauthorized", 401);
    }
    const user = verifyToken<Pick<IUser, "id">>(token);
    if (!user) {
      return sendResponse({ success: false }, "Unauthorized", 401);
    }
    const quizzes = await db.query.questions.findMany({ where: eq(questions.userId, Number(user?.id)) });
    return sendResponse({ success: true, questions: quizzes }, "Quiz fetched successfully", 200);
  } catch (error) {
    const logger = new Logger(error, __filename);
    return sendResponse({ success: false }, logger.message, 500);
  }
}
