import { NextResponse } from "next/server";
import { getBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json({ bookings });
}
