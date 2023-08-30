import { IQuiz, createQuizSchema } from "@/zod/createQuiz.z";
import { NextRequest, NextResponse } from "next/server";
import { Logger } from "../utils/logger";

export async function POST(request: NextRequest, context: unknown) {
  try {
    const body: IQuiz = await request.json();
    createQuizSchema.parse(body);
    return NextResponse.json({ connected: "yes got it" });
  } catch (e) {
    const message = new Logger(e, __filename).sendMessage();
    return NextResponse.json(message);
  }
}
