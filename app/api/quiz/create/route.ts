import { verifyToken } from "@/lib/utils/jwt";
import sendResponse from "@/lib/utils/sendResponse";
import { NextRequest } from "next/server";
import { Logger } from "../../../../lib/utils/logger";
import { db } from "../../db";
import type { IQuiz, IUser } from "../../db/schema/schema";
import { questions, quizSchema } from "../../db/schema/schema";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IQuiz;
    const user = request.cookies.get("token");
    const userVerified = verifyToken<IUser>(String(user?.value));
    const payload = {
      ...body,
      userId: userVerified.id!,
    };
    quizSchema.parse(payload);
    const createQuiz = await db.insert(questions).values(payload).returning();
    return sendResponse<{ success: boolean; user: Partial<IQuiz> }>({ success: true, user: createQuiz?.[0] }, "Quiz created successfully", 200);
  } catch (e) {
    const message = new Logger(e, __filename).message;
    return sendResponse({ success: false }, message, 500);
  }
}
