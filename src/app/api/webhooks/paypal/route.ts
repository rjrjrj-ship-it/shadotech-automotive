import { NextRequest, NextResponse } from "next/server";
import { confirmBooking } from "@/lib/bookings";
import { sendInvoiceEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const bookingId = body.resource?.custom_id;
    const paymentId = body.resource?.id;
    if (bookingId) {
      const booking = await confirmBooking(bookingId, paymentId);
      if (booking) {
        await sendInvoiceEmail(booking).catch(e => console.error("[Email] Failed:", e));
      }
    }
  }

  return NextResponse.json({ received: true });
}
