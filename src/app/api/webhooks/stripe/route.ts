import { NextRequest, NextResponse } from "next/server";
import { confirmBooking } from "@/lib/bookings";
import { sendInvoiceEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const body = await req.text();
  const sig  = req.headers.get("stripe-signature") ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { metadata?: { bookingId?: string }; payment_intent?: string };
    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      const booking = await confirmBooking(bookingId, session.payment_intent ?? "stripe");
      if (booking) {
        await sendInvoiceEmail(booking).catch(e => console.error("[Email] Failed:", e));
      }
    }
  }

  return NextResponse.json({ received: true });
}
