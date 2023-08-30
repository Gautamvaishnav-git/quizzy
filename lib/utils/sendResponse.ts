export default function sendResponse<DT = unknown>(data: DT, message: string, status: number, config?: ResponseInit) {
  return new Response(JSON.stringify({ message, data, status }), { status, ...config });
}

export interface ResponseInternal<T> {
  message: string;
  data: T;
  status: number;
}
