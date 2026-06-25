import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function sha256hex(text: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function makeSessionToken(username: string): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "shadotech-panel-2026";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(username));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: NextRequest) {
  const { identifiant, motdepasse } = await req.json();

  if (!identifiant || !motdepasse) {
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
  }

  const hash = await sha256hex(motdepasse);

  const { data, error } = await getSupabase()
    .from("admin_users")
    .select("username")
    .eq("username", identifiant)
    .eq("password_hash", hash)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
  }

  const token = await makeSessionToken(data.username);

  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 8,
    path: "/",
  };

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, cookieOpts);
  res.cookies.set("admin_user", data.username, cookieOpts);
  return res;
}
