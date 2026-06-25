import { NextRequest, NextResponse } from "next/server";
import { getBookingById } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { bookingId } = await req.json();

  const booking = await getBookingById(bookingId);
  if (!booking) return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
  if (booking.status === "confirmed") {
    return NextResponse.json({ error: "Déjà payé" }, { status: 400 });
  }

  // Requires STRIPE_SECRET_KEY in .env.local
  /*
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: booking.email,
    line_items: [{
      price_data: {
        currency: "eur",
        unit_amount: booking.price * 100,
        product_data: {
          name: `${booking.serviceLabel} — ${booking.brand} ${booking.model}`,
          description: `RDV le ${booking.date} à ${booking.startTime}`,
        },
      },
      quantity: 1,
    }],
    metadata: { bookingId: booking.id },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/vitres-teintees/confirmation?id=${booking.id}&status=success`,
    cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/vitres-teintees/confirmation?id=${booking.id}&status=cancel`,
  });

  return NextResponse.json({ url: session.url });
  */

  return NextResponse.json({
    error: "Stripe non configuré. Ajoutez STRIPE_SECRET_KEY dans .env.local",
    bookingId,
  }, { status: 501 });
}
