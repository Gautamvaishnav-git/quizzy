import sendResponse from "@/lib/utils/sendResponse";
import { NextRequest } from "next/server";
import { IUser, users } from "../../db/schema/schema";
import { db } from "../../db";
import { Logger } from "../../../../lib/utils/logger";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Pick<IUser, "email" | "password" | "userName">;
    const inserted = await db
      .insert(users)
      .values({ ...body })
      .returning();
    return sendResponse({ success: true, data: inserted?.[0] }, "Sign Up in successfully!", 200);
  } catch (error) {
    const logger = new Logger(error, __filename);
    return sendResponse({ success: false, error: logger.error }, logger.message, 500);
  }
}
