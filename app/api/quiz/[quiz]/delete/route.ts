import { Logger } from "@/lib/utils/logger";
import sendResponse from "@/lib/utils/sendResponse";
import { NextRequest } from "next/server";
import { IContext } from "../route";
import { db } from "@/app/api/db";
import { questions } from "@/app/api/db/schema/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest, context: IContext) {
  try {
    await db.delete(questions).where(eq(questions.id, context.params.quiz));
    return sendResponse({ success: true }, "Quiz deleted successfully.", 202);
  } catch (error) {
    const { message } = new Logger(error, __filename);
    return sendResponse({ success: true }, message, 500);
  }
}
