import { NextRequest, NextResponse } from "next/server";
import { ResponseInternal } from "./lib/utils/sendResponse";
import axios from "axios";
import { verifyToken } from "./lib/utils/jwt";
import { IUser } from "./app/api/db/schema/schema";

export default async function middleware(req: NextRequest) {
  try {
    let cookie = req.cookies;
    let token = cookie.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
    const res = await fetch("http://localhost:3000/api/auth/authorize", {
      method: "GET",
      headers: {
        Cookie: `token=${token}; path=/; HttpOnly; SameSite=Strict; Secure`,
      },
    });
    const data: ResponseInternal<{ success: boolean }> = await res.json();
    if (res.status == 200 && data.data.success) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl), { statusText: "Unauthorized" });
    }
  } catch (e) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl), { statusText: "Unauthorized" });
  }
}
export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // how  I can put auth/login and auth/register in the matcher
  matcher: ["/((?!auth/login|auth/signup|_next/static|_next/image|favicon.ico|api).*)"],
  // matcher: ["/quiz/:path*"],
};
