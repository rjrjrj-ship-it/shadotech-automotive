import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";

function getExpectedToken() {
  const id     = process.env.ADMIN_USER ?? "";
  const pwd    = process.env.ADMIN_PASS ?? "";
  const secret = process.env.ADMIN_SECRET ?? "shadotech-panel-2026";
  return crypto.createHmac("sha256", secret).update(`${id}:${pwd}`).digest("hex");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin_session")?.value;
    if (session !== getExpectedToken()) {
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
