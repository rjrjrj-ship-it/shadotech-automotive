import { NextRequest, NextResponse } from "next/server";
import { getOccupiedSlots } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const weekStart = searchParams.get("weekStart");
  const duration  = Number(searchParams.get("duration") ?? 60);

  if (!weekStart || !/^\d{4}-\d{2}-\d{2}$/.test(weekStart)) {
    return NextResponse.json({ error: "weekStart invalide" }, { status: 400 });
  }

  const result: Record<string, { occupied: { start: string; end: string }[]; available: string[] }> = {};

  for (let i = 0; i < 6; i++) {
    try {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().slice(0, 10);
      const occupied  = await getOccupiedSlots(dateStr);
      const available = computeAvailable(occupied, duration);
      result[dateStr]  = { occupied, available };
    } catch (e) {
      console.error("[week-slots] Error for day", i, e);
    }
  }

  return NextResponse.json({ week: result });
}

function toMin(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function fromMin(m: number) { return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; }

function computeAvailable(occupied: { start: string; end: string }[], duration: number): string[] {
  const slots: string[] = [];
  for (let t = 9 * 60; t + duration <= 18 * 60; t += 30) {
    const blocked = occupied.some(o => toMin(o.start) < t + duration && toMin(o.end) > t);
    if (!blocked) slots.push(fromMin(t));
  }
  return slots;
}
