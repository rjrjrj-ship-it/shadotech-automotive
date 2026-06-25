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

  // Requires PAYPAL_CLIENT_ID + PAYPAL_CLIENT_SECRET in .env.local
  /*
  const base = process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

  const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  const { access_token } = await tokenRes.json();

  const orderRes = await fetch(`${base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{
        amount: { currency_code: "EUR", value: booking.price.toFixed(2) },
        description: `${booking.serviceLabel} — ${booking.brand} ${booking.model} — ${booking.date}`,
        custom_id: booking.id,
      }],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/vitres-teintees/confirmation?id=${booking.id}&status=success`,
        cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/vitres-teintees/confirmation?id=${booking.id}&status=cancel`,
      },
    }),
  });
  const order = await orderRes.json();
  const approveLink = order.links?.find((l: { rel: string; href: string }) => l.rel === "approve")?.href;
  return NextResponse.json({ url: approveLink, orderId: order.id });
  */

  return NextResponse.json({
    error: "PayPal non configuré. Ajoutez PAYPAL_CLIENT_ID et PAYPAL_CLIENT_SECRET dans .env.local",
    bookingId,
  }, { status: 501 });
}
