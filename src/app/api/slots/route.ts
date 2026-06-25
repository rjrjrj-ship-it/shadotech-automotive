import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date     = searchParams.get("date");
  const duration = Number(searchParams.get("duration") ?? 60);

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date invalide" }, { status: 400 });
  }

  const slots = await getAvailableSlots(date, duration);
  return NextResponse.json({ slots });
}
