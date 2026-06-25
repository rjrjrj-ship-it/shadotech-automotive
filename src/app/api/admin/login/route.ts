import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const VALID_ID  = process.env.ADMIN_USER ?? "";
  const VALID_PWD = process.env.ADMIN_PASS ?? "";
  const SECRET    = process.env.ADMIN_SECRET ?? "shadotech-panel-2026";

  const { identifiant, motdepasse } = await req.json();

  if (!VALID_ID || !VALID_PWD) {
    return NextResponse.json({ error: "Configuration serveur manquante." }, { status: 500 });
  }

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
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return res;
}
