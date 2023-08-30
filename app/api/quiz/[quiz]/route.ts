import createObjectOfQueryParams from "@/lib/utils/createQueryParams";
import { NextResponse, NextRequest } from "next/server";

interface IContext {
  params: {
    quiz: string;
  };
}

export function GET(request: NextRequest, context: IContext) {
  const query = createObjectOfQueryParams(request.url);
  return NextResponse.json({
    message: "Hello from api route",
    params: context.params.quiz,
    query,
  });
}
