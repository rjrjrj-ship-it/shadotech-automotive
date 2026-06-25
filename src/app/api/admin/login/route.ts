import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const VALID_ID  = "shado-rem";
const VALID_PWD = "5shadotech-admin";
const SECRET    = "shadotech-panel-2026";

export async function POST(req: NextRequest) {
  const { identifiant, motdepasse } = await req.json();

  if (identifiant !== VALID_ID || motdepasse !== VALID_PWD) {
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
  }

  const token = crypto
    .createHmac("sha256", SECRET)
    .update(`${VALID_ID}:${VALID_PWD}`)
    .digest("hex");

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8h
    path: "/",
  });
  return res;
}
