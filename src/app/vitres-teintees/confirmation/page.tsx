"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef, Suspense } from "react";
import { Check, XCircle, Clock, RefreshCw, Mail } from "lucide-react";

interface Booking {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  brand: string;
  model: string;
  finition: string;
  service: string;
  serviceLabel: string;
  price: number;
  firstName: string;
  email: string;
  paymentMethod: string | null;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

// ─── States ───────────────────────────────────────────────────────────────────

type PageState = "verifying" | "confirmed" | "failed" | "cancelled";

function ConfirmationContent() {
  const params  = useSearchParams();
  const router  = useRouter();
  const id      = params.get("id");
  const status  = params.get("status"); // "success" | "cancel" | "failed"

  const [pageState, setPageState]   = useState<PageState>("verifying");
  const [booking, setBooking]       = useState<Booking | null>(null);
  const [retrying, setRetrying]     = useState(false);
  const [payMethod, setPayMethod]   = useState<"stripe" | "paypal" | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptsRef = useRef(0);

  // Fetch booking and check status
  async function fetchBooking(): Promise<Booking | null> {
    if (!id) return null;
    try {
      const r = await fetch(`/api/bookings/${id}`);
      if (!r.ok) return null;
      const d = await r.json();
      return d.booking ?? null;
    } catch { return null; }
  }

  // Start polling until confirmed or timeout
  function startPolling() {
    attemptsRef.current = 0;
    pollRef.current = setInterval(async () => {
      attemptsRef.current++;
      const b = await fetchBooking();
      if (b?.status === "confirmed") {
        clearInterval(pollRef.current!);
        setBooking(b);
        setPageState("confirmed");
      } else if (attemptsRef.current >= 20) {
        // 20 × 2s = 40s timeout
        clearInterval(pollRef.current!);
        setPageState("failed");
        setBooking(b);
      }
    }, 2000);
  }

  useEffect(() => {
    if (!id) { setPageState("failed"); return; }

    if (status === "cancel") {
      // Free the slot
      fetch(`/api/bookings/${id}`, { method: "DELETE" }).catch(() => {});
      setPageState("cancelled");
      return;
    }

    if (status === "success") {
      // Check immediately, then poll if still pending
      fetchBooking().then(b => {
        if (b?.status === "confirmed") {
          setBooking(b);
          setPageState("confirmed");
        } else {
          setBooking(b);
          startPolling();
        }
      });
    }

    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, status]);

  // Retry payment
  async function retry(method: "stripe" | "paypal") {
    if (!id) return;
    setRetrying(true);
    setPayMethod(method);
    try {
      const r = await fetch(`/api/payment/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id }),
      });
      const d = await r.json();
      if (d.url) {
        window.location.href = d.url;
      } else {
        // Dev mode — confirm directly
        setPageState("confirmed");
      }
    } catch {
      setRetrying(false);
    }
  }

  // ── Verifying ─────────────────────────────────────────────────────────────
  if (pageState === "verifying") {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#C62D36]/10 border border-[#C62D36]/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Clock size={36} className="text-[#C62D36]" />
          </div>
          <h1 className="text-white font-bold text-2xl mb-3">Vérification du paiement…</h1>
          <p className="text-[#9CA3AF] mb-2">Nous confirmons votre paiement avec le prestataire.</p>
          <p className="text-[#6B7280] text-sm">Cela peut prendre quelques secondes, ne fermez pas cette page.</p>
          <div className="flex justify-center gap-1.5 mt-6">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#C62D36] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Confirmed ─────────────────────────────────────────────────────────────
  if (pageState === "confirmed") {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
              <Check size={36} className="text-green-400" />
            </div>
            <h1 className="text-white font-bold text-3xl mb-2">Rendez-vous confirmé !</h1>
            <p className="text-[#9CA3AF]">
              Votre paiement a bien été reçu. Un email de confirmation et votre facture ont été envoyés à{" "}
              <span className="text-white font-medium">{booking?.email}</span>.
            </p>
          </div>

          {booking && (
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-6 space-y-3 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-[#2E2E2E]">
                <span className="text-[#6B7280] text-sm">Référence</span>
                <span className="text-white font-mono text-sm">{booking.id}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[#6B7280] text-sm">Véhicule</span>
                <span className="text-white text-sm text-right">{booking.brand} {booking.model} · {booking.finition}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[#6B7280] text-sm">Prestation</span>
                <span className="text-white text-sm text-right max-w-[60%]">{booking.serviceLabel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280] text-sm">Date</span>
                <span className="text-white text-sm">{formatDate(booking.date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280] text-sm">Horaire</span>
                <span className="text-white text-sm">{booking.startTime} – {booking.endTime}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#2E2E2E]">
                <span className="text-white font-semibold">Total payé</span>
                <span className="text-[#C62D36] font-bold text-xl">{booking.price} €</span>
              </div>
            </div>
          )}

          <div className="bg-[#1A1A1A] border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3 mb-6">
            <Mail size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[#9CA3AF] text-sm">
              Votre <strong className="text-white">facture PDF</strong> et votre confirmation de rendez-vous ont été envoyés par email. Vérifiez vos spams si vous ne recevez rien dans 5 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1 py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl text-center transition-all">
              Retour à l'accueil
            </Link>
            <Link href="/contact" className="flex-1 py-3 border border-[#2E2E2E] hover:border-[#C62D36] text-[#9CA3AF] hover:text-white rounded-xl text-center transition-all text-sm">
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Failed / Timeout ──────────────────────────────────────────────────────
  if (pageState === "failed") {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={36} className="text-red-400" />
          </div>
          <h1 className="text-white font-bold text-2xl mb-2">Paiement non confirmé</h1>
          <p className="text-[#9CA3AF] mb-8">
            Le paiement n'a pas pu être vérifié. Votre créneau est encore réservé pendant 15 minutes.
            Réessayez maintenant pour le confirmer.
          </p>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => retry("stripe")}
              disabled={retrying}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#635BFF] hover:bg-[#4f49d6] disabled:opacity-50 text-white font-semibold rounded-xl transition-all"
            >
              {retrying && payMethod === "stripe"
                ? <RefreshCw size={16} className="animate-spin" />
                : <CreditCardIcon />}
              Réessayer par carte bancaire
            </button>
            <button
              onClick={() => retry("paypal")}
              disabled={retrying}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#FFC439] hover:bg-[#f0b429] disabled:opacity-50 text-[#003087] font-bold rounded-xl transition-all"
            >
              {retrying && payMethod === "paypal"
                ? <RefreshCw size={16} className="animate-spin text-[#003087]" />
                : <PaypalIcon />}
              Réessayer avec PayPal
            </button>
          </div>

          <div className="border-t border-[#2E2E2E] pt-6 space-y-3">
            <p className="text-[#6B7280] text-sm">Si le problème persiste, contactez-nous :</p>
            <Link href="/contact" className="block py-3 border border-[#2E2E2E] hover:border-[#C62D36] text-[#9CA3AF] hover:text-white rounded-xl transition-all text-sm">
              Formulaire de contact
            </Link>
            <Link href="/vitres-teintees#reservation" className="block py-3 text-[#6B7280] hover:text-white transition-all text-sm">
              Recommencer une réservation
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Cancelled ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#2E2E2E] border border-[#3E3E3E] rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={36} className="text-[#6B7280]" />
        </div>
        <h1 className="text-white font-bold text-2xl mb-2">Réservation annulée</h1>
        <p className="text-[#9CA3AF] mb-8">Vous avez annulé le paiement. Le créneau a été libéré.</p>
        <Link href="/vitres-teintees#reservation" className="inline-block px-8 py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all">
          Faire une nouvelle réservation
        </Link>
      </div>
    </div>
  );
}

function CreditCardIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  );
}
function PaypalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#003087">
      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 2.72a.771.771 0 01.76-.641h6.714c2.324 0 3.981.542 4.923 1.61.904 1.03 1.139 2.395.696 4.061-.962 3.565-3.378 5.373-7.185 5.373H8.44l-1.364 8.214zm3.086-10.3h1.414c2.056 0 3.226-1.021 3.7-3.218.228-1.06.14-1.876-.263-2.438-.402-.561-1.133-.843-2.171-.843H11.4l-1.238 6.499z"/>
    </svg>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
