import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const username = req.cookies.get("admin_user")?.value ?? null;
  return NextResponse.json({ username });
}
