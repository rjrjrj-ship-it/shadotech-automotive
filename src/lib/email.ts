import type { Booking } from "@/lib/bookings";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export function buildInvoiceHtml(booking: Booking): string {
  const invoiceNum = `INV-${booking.id}`;
  const today = new Date().toLocaleDateString("fr-FR");

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
  <tr><td>
    <table width="600" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2e2e2e;">

      <!-- Header -->
      <tr>
        <td style="background:#C62D36;padding:32px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <div style="color:#fff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">SHADOTECH</div>
                <div style="color:rgba(255,255,255,0.7);font-size:13px;margin-top:2px;">Automotive</div>
              </td>
              <td align="right">
                <div style="color:#fff;font-size:20px;font-weight:700;">FACTURE</div>
                <div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:4px;">${invoiceNum}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Company + Client info -->
      <tr>
        <td style="padding:32px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="vertical-align:top;">
                <div style="color:#6B7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Prestataire</div>
                <div style="color:#fff;font-size:14px;font-weight:600;">Shadotech Automotive</div>
                <div style="color:#9CA3AF;font-size:13px;line-height:1.6;margin-top:4px;">
                  53 Rue de Noertzange<br>
                  3670 Kayl, Luxembourg<br>
                  contact@shadotech.lu
                </div>
              </td>
              <td width="50%" style="vertical-align:top;padding-left:20px;">
                <div style="color:#6B7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Client</div>
                <div style="color:#fff;font-size:14px;font-weight:600;">${booking.firstName} ${booking.lastName}</div>
                <div style="color:#9CA3AF;font-size:13px;line-height:1.6;margin-top:4px;">
                  ${booking.email}<br>
                  ${booking.phone}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Dates -->
      <tr>
        <td style="padding:24px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#111;border-radius:8px;padding:16px 20px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color:#6B7280;font-size:12px;">Date de facturation</td>
                    <td align="right" style="color:#9CA3AF;font-size:12px;">${today}</td>
                  </tr>
                  <tr>
                    <td style="color:#6B7280;font-size:12px;padding-top:6px;">Référence</td>
                    <td align="right" style="color:#9CA3AF;font-size:12px;padding-top:6px;">${booking.id}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Service details -->
      <tr>
        <td style="padding:24px 40px 0;">
          <div style="color:#6B7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Détail de la prestation</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #2e2e2e;">
            <tr style="background:#111;">
              <td style="padding:10px 16px;color:#6B7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Description</td>
              <td align="center" style="padding:10px 16px;color:#6B7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Durée</td>
              <td align="right" style="padding:10px 16px;color:#6B7280;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Montant</td>
            </tr>
            <tr style="background:#1a1a1a;border-top:1px solid #2e2e2e;">
              <td style="padding:16px;">
                <div style="color:#fff;font-size:14px;font-weight:600;">${booking.serviceLabel}</div>
                <div style="color:#9CA3AF;font-size:12px;margin-top:4px;">${booking.brand} ${booking.model} · ${booking.finition} · ${booking.years}</div>
                <div style="color:#9CA3AF;font-size:12px;margin-top:2px;">RDV : ${formatDate(booking.date)} à ${booking.startTime}</div>
              </td>
              <td align="center" style="padding:16px;color:#9CA3AF;font-size:13px;">${booking.duration} min</td>
              <td align="right" style="padding:16px;color:#fff;font-size:14px;font-weight:700;">${booking.price.toFixed(2)} €</td>
            </tr>
            <tr style="background:#111;border-top:1px solid #2e2e2e;">
              <td colspan="2" align="right" style="padding:14px 16px;color:#9CA3AF;font-size:12px;">Sous-total HT</td>
              <td align="right" style="padding:14px 16px;color:#9CA3AF;font-size:13px;">${(booking.price / 1.17).toFixed(2)} €</td>
            </tr>
            <tr style="background:#111;">
              <td colspan="2" align="right" style="padding:8px 16px;color:#9CA3AF;font-size:12px;">TVA 17%</td>
              <td align="right" style="padding:8px 16px;color:#9CA3AF;font-size:13px;">${(booking.price - booking.price / 1.17).toFixed(2)} €</td>
            </tr>
            <tr style="background:#C62D36;">
              <td colspan="2" align="right" style="padding:16px;color:#fff;font-size:14px;font-weight:700;">TOTAL TTC</td>
              <td align="right" style="padding:16px;color:#fff;font-size:18px;font-weight:800;">${booking.price.toFixed(2)} €</td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Payment confirmed -->
      <tr>
        <td style="padding:24px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#052e16;border:1px solid #166534;border-radius:8px;padding:14px 16px;">
                <span style="color:#4ade80;font-size:13px;font-weight:600;">✓ Paiement confirmé — ${booking.paymentMethod === "stripe" ? "Carte bancaire (Stripe)" : "PayPal"}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:32px 40px;border-top:1px solid #2e2e2e;margin-top:24px;">
          <div style="color:#6B7280;font-size:12px;text-align:center;line-height:1.7;">
            Shadotech Automotive · 53 Rue de Noertzange · 3670 Kayl · Luxembourg<br>
            contact@shadotech.lu · shadotech.lu<br>
            <span style="color:#3d3d3d;font-size:11px;">Document généré automatiquement — TVA LU incluse à 17%</span>
          </div>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function sendInvoiceEmail(booking: Booking): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Email] RESEND_API_KEY not set — invoice not sent for", booking.id);
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const html = buildInvoiceHtml(booking);
  const dateFormatted = new Date(booking.date).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });

  // Invoice to client
  await resend.emails.send({
    from: "Shadotech Automotive <noreply@shadotech.lu>",
    to: booking.email,
    subject: `Votre facture Shadotech Automotive — RDV du ${dateFormatted}`,
    html,
  });

  // Internal notification
  await resend.emails.send({
    from: "Shadotech RDV <noreply@shadotech.lu>",
    to: "contact@shadotech.lu",
    subject: `✅ Nouveau RDV confirmé — ${booking.firstName} ${booking.lastName} — ${booking.date} ${booking.startTime}`,
    html: `
      <div style="font-family:sans-serif;background:#111;color:#fff;padding:32px;border-radius:12px;">
        <h2 style="color:#C62D36;">Nouveau rendez-vous confirmé</h2>
        <p><strong>Client :</strong> ${booking.firstName} ${booking.lastName}</p>
        <p><strong>Email :</strong> ${booking.email}</p>
        <p><strong>Téléphone :</strong> ${booking.phone}</p>
        <p><strong>Véhicule :</strong> ${booking.brand} ${booking.model} · ${booking.finition}</p>
        <p><strong>Prestation :</strong> ${booking.serviceLabel}</p>
        <p><strong>Date :</strong> ${dateFormatted} à ${booking.startTime} – ${booking.endTime}</p>
        <p><strong>Montant :</strong> <span style="color:#C62D36;font-size:18px;font-weight:bold;">${booking.price}€</span></p>
        <p><strong>Paiement :</strong> ${booking.paymentMethod} · ${booking.paymentId}</p>
        <p><strong>Réf :</strong> ${booking.id}</p>
      </div>
    `,
  });
}
