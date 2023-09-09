import { NextResponse } from "next/server";

export default function sendResponse<DT = unknown>(data: DT, message: string, status: number, config?: ResponseInit) {
  return NextResponse.json({ message, data, status }, config);
}

export interface ResponseInternal<T> {
  message: string;
  data: T;
  status: number;
}
