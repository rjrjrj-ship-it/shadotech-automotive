import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function isValidSession(username: string, token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET ?? "shadotech-panel-2026";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(username));
  const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return token === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token    = request.cookies.get("admin_session")?.value;
    const username = request.cookies.get("admin_user")?.value;

    if (!token || !username || !(await isValidSession(username, token))) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
