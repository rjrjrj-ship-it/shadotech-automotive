import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, startTime, duration, brand, model, years, finition,
            service, serviceLabel, price, firstName, lastName, email, phone } = body;

    if (!date || !startTime || !duration) {
      return NextResponse.json({ error: "date, startTime et duration sont requis" }, { status: 400 });
    }

    // Compute endTime
    const [h, m] = startTime.split(":").map(Number);
    const endMin = h * 60 + m + Number(duration);
    const endTime = `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;

    const booking = await createBooking({
      date,
      startTime,
      endTime,
      duration: Number(duration),
      brand: brand || "—",
      model: model || "—",
      years: years || "",
      finition: finition || "",
      service: service || "block",
      serviceLabel: serviceLabel || "Créneau bloqué",
      price: Number(price) || 0,
      firstName: firstName || "Shadotech",
      lastName: lastName || "",
      email: email || "contact@shadotech.lu",
      phone: phone || "",
      paymentMethod: null,
      paymentId: null,
    });

    // Auto-confirm admin-created bookings
    const { getSupabase } = await import("@/lib/supabase");
    await getSupabase().from("bookings").update({ status: "confirmed" }).eq("id", booking.id);
    booking.status = "confirmed";

    return NextResponse.json({ booking });
  } catch (e) {
    console.error("[admin/create]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
