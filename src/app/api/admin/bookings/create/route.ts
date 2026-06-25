import { NextRequest, NextResponse } from "next/server";
import { createBooking, confirmBooking } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, startTime, duration, brand, model, years, finition,
            service, serviceLabel, price, firstName, lastName, email, phone } = body;

    if (!date || !startTime || !duration) {
      return NextResponse.json({ error: "date, startTime et duration sont requis" }, { status: 400 });
    }

    const [h, m] = startTime.split(":").map(Number);
    const endMin = h * 60 + m + Number(duration);
    const endTime = `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`;

    const createdBy = req.cookies.get("admin_user")?.value ?? null;

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
      createdBy,
    });

    // Auto-confirm (bypass payment for admin-created bookings)
    const confirmed = await confirmBooking(booking.id, "admin");
    return NextResponse.json({ booking: confirmed ?? { ...booking, status: "confirmed" } });
  } catch (e) {
    console.error("[admin/create]", e);
    const msg = e instanceof Error ? e.message : JSON.stringify(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
