import sendResponse from "@/lib/utils/sendResponse";
import { NextRequest } from "next/server";
import { Logger } from "../../../../lib/utils/logger";
import { verifyToken } from "@/lib/utils/jwt";
import { IUser, users } from "../../db/schema/schema";
import { db } from "../../db";
import { and, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    let token = request.cookies.get("token");
    if (!token) {
      return sendResponse({ success: false }, "Unauthorized", 401);
    }
    const credentials = verifyToken<Pick<IUser, "email" | "password">>(token.value);
    if (!credentials) {
      return sendResponse({ success: false }, "Unauthorized", 401);
    }

    const userExists = await db
      .select()
      .from(users)
      .where(and(eq(users.email, credentials.email), eq(users.password, credentials.password)));

    if (!userExists) return sendResponse({ success: false }, "Unauthorized", 401);

    return sendResponse({ success: true }, "Authorized", 200);
  } catch (error) {
    let logger = new Logger(error, __filename);
    return sendResponse({ success: false }, logger.message, 500);
  }
}
