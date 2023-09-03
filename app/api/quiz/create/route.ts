import { NextRequest, NextResponse } from "next/server";
import type { IQuiz, IUser } from "../../db/schema/schema";
import { questions, quizSchema, users } from "../../db/schema/schema";
import { Logger } from "../utils/logger";
import sendResponse from "@/lib/utils/sendResponse";
import { verifyToken } from "@/lib/utils/jwt";
import { db } from "../../db";
import { and, eq } from "drizzle-orm";
import { verify } from "crypto";

export async function POST(request: NextRequest, context: unknown) {
  try {
    const body = (await request.json()) as IQuiz;
    const user = request.cookies.get("token");
    const userVerified = verifyToken<IUser>(String(user?.value));
    const isExists = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(userVerified.id)));
    // quizSchema.parse(body);
    if (!isExists?.[0]) {
      return sendResponse({ success: false }, "user not found", 500);
    }

    const createQuiz = await db
      .insert(questions)
      .values({
        ...body,
        userId: isExists[0].id,
      })
      .returning();
    return sendResponse<{ success: boolean; user: Partial<IQuiz> }>({ success: true, user: createQuiz?.[0] }, "Quiz created successfully", 200);
  } catch (e) {
    const message = new Logger(e, __filename).message;
    return sendResponse({ success: false }, message, 500);
  }
}
