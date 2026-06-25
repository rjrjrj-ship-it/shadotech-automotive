import { NextRequest, NextResponse } from "next/server";
import { getBookingById, cancelBooking } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({ booking });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ok = await cancelBooking(id);
  if (!ok) return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
