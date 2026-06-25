import { NextRequest, NextResponse } from "next/server";
import type { BookingFormData } from "@/types/booking";

export async function POST(req: NextRequest) {
  try {
    const data: BookingFormData = await req.json();

    // --- Email via Resend ---
    // Uncomment and configure when RESEND_API_KEY is set in .env.local
    /*
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Confirmation client
    await resend.emails.send({
      from: "Shadotech Automotive <noreply@shadotech.lu>",
      to: data.email,
      subject: "Confirmation de votre demande de rendez-vous — Shadotech Automotive",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #111; color: #f5f5f5; padding: 40px; border-radius: 12px;">
          <h2 style="color: #C62D36;">Votre demande de RDV est bien reçue !</h2>
          <p>Bonjour ${data.firstName},</p>
          <p>Nous avons bien reçu votre demande de rendez-vous pour :</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><td style="color:#9CA3AF;padding:6px 0;">Véhicule</td><td>${data.vehicleBrand} ${data.vehicleModel}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Type</td><td>${data.vehicleType}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Film</td><td>${data.filmType}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Vitres</td><td>${data.windowCount}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Date souhaitée</td><td>${data.preferredDate} à ${data.preferredTime}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;font-weight:bold;">Estimation</td><td style="color:#C62D36;font-weight:bold;font-size:18px;">${data.estimatedPrice}€</td></tr>
          </table>
          <p>Nous vous confirmerons le créneau dans les 24 heures.</p>
          <p style="color:#6B7280;">Shadotech Automotive — 53 Rue de Noertzange, 3670 Kayl, Luxembourg</p>
        </div>
      `,
    });

    // Notification interne
    await resend.emails.send({
      from: "Shadotech RDV <noreply@shadotech.lu>",
      to: "contact@shadotech.lu",
      subject: `Nouveau RDV — ${data.firstName} ${data.lastName} — ${data.preferredDate}`,
      html: `<pre>${JSON.stringify(data, null, 2)}</pre>`,
    });
    */

    // --- Google Calendar ---
    // Requires GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN in .env.local
    // See docs/google-calendar-setup.md for OAuth2 setup instructions
    /*
    const { google } = await import("googleapis");
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const [year, month, day] = data.preferredDate.split("-").map(Number);
    const [hour, minute] = data.preferredTime.split(":").map(Number);
    const start = new Date(year, month - 1, day, hour, minute);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // +3h

    await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `RDV Vitres Teintées — ${data.firstName} ${data.lastName}`,
        description: `Véhicule: ${data.vehicleBrand} ${data.vehicleModel} (${data.licensePlate})\nFilm: ${data.filmType}\nVitres: ${data.windowCount}\nEstimation: ${data.estimatedPrice}€\nTel: ${data.phone}\nEmail: ${data.email}\nMessage: ${data.message || "—"}`,
        start: { dateTime: start.toISOString(), timeZone: "Europe/Luxembourg" },
        end: { dateTime: end.toISOString(), timeZone: "Europe/Luxembourg" },
        attendees: [{ email: data.email, displayName: `${data.firstName} ${data.lastName}` }],
        colorId: "11",
      },
    });
    */

    console.log("[Reservation] New booking received:", {
      name: `${data.firstName} ${data.lastName}`,
      date: data.preferredDate,
      time: data.preferredTime,
      vehicle: `${data.vehicleBrand} ${data.vehicleModel}`,
      price: data.estimatedPrice,
    });

    return NextResponse.json({ success: true, message: "Réservation reçue avec succès." });
  } catch (error) {
    console.error("[Reservation] Error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
