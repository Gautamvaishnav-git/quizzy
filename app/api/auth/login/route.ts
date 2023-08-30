import sendResponse from "@/lib/utils/sendResponse";
import { NextRequest } from "next/server";
import { insertUserSchema, users } from "../../db/schema/schema";
import { Logger } from "../../quiz/utils/logger";
import { db } from "../../db";
import { and, eq } from "drizzle-orm";
import { generateToken } from "@/lib/utils/jwt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const credentials = insertUserSchema.pick({ email: true, password: true }).parse(body);
    const isExists = await db
      .select()
      .from(users)
      .where(and(eq(users.email, credentials.email), eq(users.password, credentials.password)));

    if (isExists.length === 0) {
      return sendResponse({}, "invalid credentials", 401);
    }
    const token = generateToken({ email: credentials.email, password: credentials.password });
    return sendResponse({ success: true }, "Logged in successfully!", 200, {
      headers: {
        "Set-Cookie": `token=${token}; path=/; HttpOnly; SameSite=Strict; Secure`,
      },
    });
  } catch (error) {
    const logger = new Logger(error, __filename);
    return sendResponse({ success: false }, logger.message, 500);
  }
}
