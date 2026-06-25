import { NextRequest, NextResponse } from "next/server";
import { createBooking, getAvailableSlots, cleanupExpiredPending } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const required = ["date", "startTime", "duration", "brand", "model", "service",
      "serviceLabel", "price", "firstName", "lastName", "email", "phone"];
    for (const f of required) {
      if (!body[f]) return NextResponse.json({ error: `Champ manquant: ${f}` }, { status: 400 });
    }

    await cleanupExpiredPending();

    const available = await getAvailableSlots(body.date, body.duration);
    if (!available.includes(body.startTime)) {
      return NextResponse.json({ error: "Ce créneau n'est plus disponible." }, { status: 409 });
    }

    const startMin = timeToMin(body.startTime);
    const endTime  = minToTime(startMin + Number(body.duration));

    const booking = await createBooking({
      date:          body.date,
      startTime:     body.startTime,
      endTime,
      duration:      Number(body.duration),
      brand:         body.brand,
      model:         body.model,
      years:         body.years ?? "",
      finition:      body.finition ?? "",
      service:       body.service,
      serviceLabel:  body.serviceLabel,
      price:         Number(body.price),
      firstName:     body.firstName,
      lastName:      body.lastName,
      email:         body.email,
      phone:         body.phone,
      paymentMethod: null,
      paymentId:     null,
    });

    return NextResponse.json({ booking });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function timeToMin(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function minToTime(m: number) { return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; }
