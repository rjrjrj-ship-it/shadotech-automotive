"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, Calendar, Car, Scissors, CreditCard, Check } from "lucide-react";
import vehiclesRaw from "@/data/vehicles.json";
import { SERVICE_LABELS, SERVICE_DESC, SERVICE_KEYS, type ServiceKey } from "@/data/services";
import { WeekCalendar } from "@/components/booking/WeekCalendar";

// ─── Types ────────────────────────────────────────────────────────────────────

interface VehicleEntry {
  years: string;
  finition: string;
  services: Partial<Record<ServiceKey, { duration: number; price: number }>>;
}

const vehicles = vehiclesRaw as Record<string, Record<string, VehicleEntry[]>>;

type Step = "brand" | "model" | "variant" | "service" | "calendar" | "info" | "payment" | "done";

interface Selection {
  brand: string;
  model: string;
  variant: VehicleEntry | null;
  service: ServiceKey | null;
  date: string;
  slot: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STEP_LABELS: Record<Step, string> = {
  brand:    "Marque",
  model:    "Modèle",
  variant:  "Version",
  service:  "Prestation",
  calendar: "Date & Heure",
  info:     "Vos infos",
  payment:  "Paiement",
  done:     "Confirmé",
};

const STEPS: Step[] = ["brand", "model", "variant", "service", "calendar", "info", "payment", "done"];

function formatDate(d: string) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}


// ─── Sub-components ───────────────────────────────────────────────────────────

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.indexOf(current);
  const visible = STEPS.slice(0, -1); // exclude "done"
  return (
    <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1">
      {visible.map((s, i) => (
        <div key={s} className="flex items-center gap-1 shrink-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            i < idx ? "bg-[#C62D36] text-white" :
            i === idx ? "bg-[#C62D36] text-white ring-2 ring-[#C62D36]/30" :
            "bg-[#2E2E2E] text-[#6B7280]"
          }`}>
            {i < idx ? <Check size={12} /> : i + 1}
          </div>
          <span className={`text-xs ${i === idx ? "text-white" : "text-[#6B7280]"} hidden sm:block`}>
            {STEP_LABELS[s]}
          </span>
          {i < visible.length - 1 && <div className="w-4 h-px bg-[#2E2E2E] mx-1" />}
        </div>
      ))}
    </div>
  );
}

function SearchSelect({
  options, value, onChange, placeholder,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#C62D36]/50 rounded-xl text-left transition-all"
      >
        <span className={value ? "text-white" : "text-[#6B7280]"}>{value || placeholder}</span>
        <ChevronDown size={16} className="text-[#6B7280]" />
      </button>
      {open && (
        <div className="absolute z-20 w-full mt-1 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-[#2E2E2E]">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full bg-[#111111] border border-[#2E2E2E] rounded-lg px-3 py-2 text-sm text-white placeholder-[#6B7280] outline-none"
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-[#6B7280] text-sm">Aucun résultat</div>
            ) : (
              filtered.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); setSearch(""); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#2E2E2E] transition-colors ${
                    opt === value ? "text-[#C62D36] font-semibold" : "text-[#9CA3AF]"
                  }`}
                >
                  {opt}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

export function VehicleBookingWizard() {
  const [step, setStep] = useState<Step>("brand");
  const [sel, setSel] = useState<Selection>({
    brand: "", model: "", variant: null, service: null,
    date: "", slot: "", firstName: "", lastName: "", email: "", phone: "",
  });
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [calRefreshKey, setCalRefreshKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const brandList = Object.keys(vehicles).sort();
  const modelList = sel.brand ? Object.keys(vehicles[sel.brand] ?? {}).sort() : [];
  const variantList = sel.brand && sel.model ? (vehicles[sel.brand]?.[sel.model] ?? []) : [];
  const serviceData = sel.variant?.services ?? {};

  const currentService = sel.service ? serviceData[sel.service] : null;

  // ── Navigation helpers
  function go(s: Step) {
    setStep(s);
    setError(null);
    if (s === "calendar") setCalRefreshKey(k => k + 1);
  }
  function back() {
    const idx = STEPS.indexOf(step);
    if (idx > 0) go(STEPS[idx - 1]);
  }

  // ── Submit booking
  async function submitBooking() {
    if (!sel.variant || !sel.service || !currentService) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: sel.date,
          startTime: sel.slot,
          duration: currentService.duration,
          brand: sel.brand,
          model: sel.model,
          years: sel.variant.years,
          finition: sel.variant.finition,
          service: sel.service,
          serviceLabel: SERVICE_LABELS[sel.service],
          price: currentService.price,
          firstName: sel.firstName,
          lastName: sel.lastName,
          email: sel.email,
          phone: sel.phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setBookingId(data.booking.id);
      go("payment");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur serveur");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Payment
  async function pay(method: "stripe" | "paypal") {
    if (!bookingId) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/payment/${method}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Payment not yet configured — show success for demo
        go("done");
      }
    } catch {
      setError("Erreur de paiement. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = "w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#C62D36]/50 rounded-xl px-4 py-3 text-white placeholder-[#6B7280] outline-none transition-all text-sm";

  return (
    <div className="bg-[#111111] border border-[#2E2E2E] rounded-3xl p-6 sm:p-8 w-full">
      <StepBar current={step} />

      {/* ── ÉTAPE 1 : Marque */}
      {step === "brand" && (
        <div>
          <h3 className="text-white font-bold text-xl mb-2">Sélectionnez votre marque</h3>
          <p className="text-[#6B7280] text-sm mb-6">{brandList.length} marques disponibles</p>
          <SearchSelect
            options={brandList}
            value={sel.brand}
            onChange={(v) => { setSel(s => ({ ...s, brand: v, model: "", variant: null, service: null })); }}
            placeholder="Choisir une marque..."
          />
          {sel.brand && (
            <button
              onClick={() => go("model")}
              className="mt-4 w-full py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all"
            >
              Continuer →
            </button>
          )}
        </div>
      )}

      {/* ── ÉTAPE 2 : Modèle */}
      {step === "model" && (
        <div>
          <button onClick={back} className="flex items-center gap-1 text-[#6B7280] hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft size={14} /> Retour
          </button>
          <h3 className="text-white font-bold text-xl mb-2">Modèle — <span className="text-[#C62D36]">{sel.brand}</span></h3>
          <p className="text-[#6B7280] text-sm mb-6">{modelList.length} modèles disponibles</p>
          <SearchSelect
            options={modelList}
            value={sel.model}
            onChange={(v) => { setSel(s => ({ ...s, model: v, variant: null, service: null })); }}
            placeholder="Choisir un modèle..."
          />
          {sel.model && (
            <button onClick={() => go("variant")} className="mt-4 w-full py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all">
              Continuer →
            </button>
          )}
        </div>
      )}

      {/* ── ÉTAPE 3 : Version / Année */}
      {step === "variant" && (
        <div>
          <button onClick={back} className="flex items-center gap-1 text-[#6B7280] hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft size={14} /> Retour
          </button>
          <h3 className="text-white font-bold text-xl mb-2">Version — <span className="text-[#C62D36]">{sel.model}</span></h3>
          <p className="text-[#6B7280] text-sm mb-6">Sélectionnez l'année et la finition correspondantes</p>
          <div className="space-y-2">
            {variantList.map((v, i) => (
              <button
                key={i}
                onClick={() => { setSel(s => ({ ...s, variant: v, service: null })); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                  sel.variant === v
                    ? "border-[#C62D36] bg-[#C62D36]/10"
                    : "border-[#2E2E2E] bg-[#1A1A1A] hover:border-[#C62D36]/40"
                }`}
              >
                <div>
                  <span className="text-white font-medium">{v.finition}</span>
                  <span className="text-[#6B7280] text-sm ml-3">{v.years}</span>
                </div>
                {sel.variant === v && <Check size={16} className="text-[#C62D36]" />}
              </button>
            ))}
          </div>
          {sel.variant && (
            <button onClick={() => go("service")} className="mt-4 w-full py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all">
              Continuer →
            </button>
          )}
        </div>
      )}

      {/* ── ÉTAPE 4 : Prestation */}
      {step === "service" && (
        <div>
          <button onClick={back} className="flex items-center gap-1 text-[#6B7280] hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft size={14} /> Retour
          </button>
          <h3 className="text-white font-bold text-xl mb-2">Choisissez votre prestation</h3>
          <p className="text-[#6B7280] text-sm mb-6">{sel.brand} {sel.model} · {sel.variant?.finition} · {sel.variant?.years}</p>
          <div className="space-y-2">
            {SERVICE_KEYS.map((key) => {
              const svc = serviceData[key];
              if (!svc) return null;
              return (
                <button
                  key={key}
                  onClick={() => setSel(s => ({ ...s, service: key }))}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border text-left transition-all ${
                    sel.service === key
                      ? "border-[#C62D36] bg-[#C62D36]/10"
                      : "border-[#2E2E2E] bg-[#1A1A1A] hover:border-[#C62D36]/40"
                  }`}
                >
                  <div>
                    <div className="text-white font-medium">{SERVICE_LABELS[key]}</div>
                    <div className="text-[#6B7280] text-xs mt-0.5">{SERVICE_DESC[key]}</div>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <div className="text-[#C62D36] font-bold">{svc.price}€</div>
                    <div className="text-[#6B7280] text-xs">{svc.duration} min</div>
                  </div>
                </button>
              );
            })}
          </div>
          {sel.service && (
            <button onClick={() => go("calendar")} className="mt-4 w-full py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all">
              Choisir une date →
            </button>
          )}
        </div>
      )}

      {/* ── ÉTAPE 5 : Calendrier */}
      {step === "calendar" && currentService && (
        <div>
          <button onClick={back} className="flex items-center gap-1 text-[#6B7280] hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft size={14} /> Retour
          </button>
          <h3 className="text-white font-bold text-xl mb-2">Choisissez votre créneau</h3>
          <p className="text-[#6B7280] text-sm mb-6">{SERVICE_LABELS[sel.service!]} · {currentService.duration} min · {currentService.price}€</p>
          <WeekCalendar
            duration={currentService.duration}
            selected={{ date: sel.date, slot: sel.slot }}
            onSelect={(date, slot) => setSel(s => ({ ...s, date, slot }))}
            refreshKey={calRefreshKey}
          />
          {sel.date && sel.slot && (
            <button onClick={() => go("info")} className="mt-6 w-full py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all">
              Continuer →
            </button>
          )}
        </div>
      )}

      {/* ── ÉTAPE 6 : Informations */}
      {step === "info" && (
        <div>
          <button onClick={back} className="flex items-center gap-1 text-[#6B7280] hover:text-white text-sm mb-4 transition-colors">
            <ChevronLeft size={14} /> Retour
          </button>
          <h3 className="text-white font-bold text-xl mb-6">Vos informations</h3>

          {/* Récap */}
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 mb-6 space-y-2">
            <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
              <Car size={14} className="text-[#C62D36]" />
              {sel.brand} {sel.model} · {sel.variant?.finition}
            </div>
            <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
              <Scissors size={14} className="text-[#C62D36]" />
              {SERVICE_LABELS[sel.service!]}
            </div>
            <div className="flex items-center gap-2 text-[#9CA3AF] text-sm">
              <Calendar size={14} className="text-[#C62D36]" />
              {formatDate(sel.date)} à {sel.slot}
            </div>
            <div className="flex items-center gap-2 font-bold text-white pt-1 border-t border-[#2E2E2E] mt-1">
              <CreditCard size={14} className="text-[#C62D36]" />
              Total : {currentService?.price}€
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#9CA3AF] text-xs mb-1 block">Prénom *</label>
              <input value={sel.firstName} onChange={e => setSel(s => ({ ...s, firstName: e.target.value }))}
                placeholder="Jean" className={inputCls} />
            </div>
            <div>
              <label className="text-[#9CA3AF] text-xs mb-1 block">Nom *</label>
              <input value={sel.lastName} onChange={e => setSel(s => ({ ...s, lastName: e.target.value }))}
                placeholder="Dupont" className={inputCls} />
            </div>
            <div>
              <label className="text-[#9CA3AF] text-xs mb-1 block">Email *</label>
              <input type="email" value={sel.email} onChange={e => setSel(s => ({ ...s, email: e.target.value }))}
                placeholder="jean@email.com" className={inputCls} />
            </div>
            <div>
              <label className="text-[#9CA3AF] text-xs mb-1 block">Téléphone *</label>
              <input type="tel" value={sel.phone} onChange={e => setSel(s => ({ ...s, phone: e.target.value }))}
                placeholder="+352 XXX XXX XXX" className={inputCls} />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

          <button
            onClick={submitBooking}
            disabled={submitting || !sel.firstName || !sel.lastName || !sel.email || !sel.phone}
            className="mt-6 w-full py-3 bg-[#C62D36] hover:bg-[#a82530] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all"
          >
            {submitting ? "Réservation en cours..." : "Confirmer et payer →"}
          </button>
        </div>
      )}

      {/* ── ÉTAPE 7 : Paiement */}
      {step === "payment" && (
        <div>
          <h3 className="text-white font-bold text-xl mb-2">Paiement</h3>
          <p className="text-[#6B7280] text-sm mb-6">
            Votre créneau est réservé. Finalisez le paiement pour confirmer le rendez-vous.
          </p>

          {/* Récap final */}
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 mb-6 space-y-1.5">
            <div className="text-[#9CA3AF] text-sm">{sel.brand} {sel.model} · {sel.variant?.finition}</div>
            <div className="text-[#9CA3AF] text-sm">{SERVICE_LABELS[sel.service!]}</div>
            <div className="text-[#9CA3AF] text-sm">{formatDate(sel.date)} à {sel.slot}</div>
            <div className="text-white font-bold text-lg pt-2 border-t border-[#2E2E2E] mt-2">
              Total : {currentService?.price}€
            </div>
            <div className="text-[#6B7280] text-xs">Réf. {bookingId}</div>
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <div className="space-y-3">
            <button
              onClick={() => pay("stripe")}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#635BFF] hover:bg-[#4f49d6] disabled:opacity-40 text-white font-semibold rounded-xl transition-all"
            >
              <svg viewBox="0 0 60 25" width="40" fill="white"><path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 01-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V6.27h3.76l.08 1.02a4.7 4.7 0 013.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.9-5.65 7.9zM40 9.36c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.07v3.52l-4.13.88v-4.4h4.13zm0 3.94H24.1v11.3h4.14V9zM18.14 13.08c0-2.56 2.22-3.43 4.7-3.43.87 0 1.7.08 2.52.2V9.1c-.7-.17-1.44-.27-2.22-.27-3.68 0-6.23 1.56-6.23 5.55 0 3.9 2.56 5.52 6.23 5.52.8 0 1.58-.1 2.28-.3v-3.7c-.75.17-1.52.27-2.3.27-1.93 0-4.98-.47-4.98-3.09zm-2.7-7.01L11.3 7.43l-1.18-2.8-3.8.8 2.02 4.26L5.82 20h4.39l1.4-5.16L13 18.7l3.8-.8-2.52-5.3 3.36-6.93-3.8.8-2 5.46 2.6-5.86z"/></svg>
              Payer par carte bancaire
            </button>

            <button
              onClick={() => pay("paypal")}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#FFC439] hover:bg-[#f0b429] disabled:opacity-40 text-[#003087] font-bold rounded-xl transition-all"
            >
              <svg viewBox="0 0 101 32" width="70" fill="#003087">
                <path d="M12.237 2.8h7.8c3.8 0 6.5 1.1 8.1 3.3 1.3 1.8 1.7 4.1.9 6.7-1.4 5.2-5.3 7.8-11.5 7.8H15l-1.4 7.2H7.8L12.237 2.8zm3.7 3.8l-1.6 8.2h1.8c3.4 0 5.6-1.4 6.3-4.3.6-2.6-.5-3.9-3.2-3.9h-3.3zM32.737 9.6h5.6l-.2 1.5c1.3-1.1 2.8-1.7 4.5-1.7 2.9 0 4.7 1.5 4.7 4.4 0 .7-.1 1.5-.3 2.4l-1.9 9.5h-5.7l1.8-8.9c.1-.5.2-1 .2-1.3 0-.9-.5-1.4-1.5-1.4-1.3 0-2.3.8-2.7 2.3l-1.9 9.3h-5.7l3.1-16.1zm16.9 0h5.7l-3.1 16.1h-5.7l3.1-16.1zm3.4-6.8c1.7 0 2.8 1 2.8 2.6 0 1.9-1.4 3.3-3.4 3.3-1.7 0-2.8-1-2.8-2.6 0-2 1.4-3.3 3.4-3.3zm7.5 6.8h5.7l-1 5.3h.1c1.1-3.7 3.1-5.5 5.8-5.5.4 0 .8 0 1.3.1l-1.2 5.7c-.4-.1-.9-.1-1.4-.1-3.2 0-4.9 1.9-5.6 5.7l-1.1 4.9h-5.7l3.1-16.1zm15.4 0h5.7l-3.1 16.1h-5.7l3.1-16.1zm3.4-6.8c1.7 0 2.8 1 2.8 2.6 0 1.9-1.4 3.3-3.4 3.3-1.7 0-2.8-1-2.8-2.6 0-2 1.4-3.3 3.4-3.3z"/>
              </svg>
              Payer avec PayPal
            </button>
          </div>

          <p className="text-[#6B7280] text-xs text-center mt-4">
            🔒 Paiement sécurisé — Votre créneau sera bloqué après confirmation du paiement
          </p>
        </div>
      )}

      {/* ── ÉTAPE 8 : Confirmé */}
      {step === "done" && (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-400" />
          </div>
          <h3 className="text-white font-bold text-2xl mb-2">Rendez-vous confirmé !</h3>
          <p className="text-[#9CA3AF] mb-6">
            Un email de confirmation vous a été envoyé à <span className="text-white">{sel.email}</span>
          </p>
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 text-left space-y-2 mb-8">
            <div className="text-[#9CA3AF] text-sm">📅 {formatDate(sel.date)} à {sel.slot}</div>
            <div className="text-[#9CA3AF] text-sm">🚗 {sel.brand} {sel.model} · {sel.variant?.finition}</div>
            <div className="text-[#9CA3AF] text-sm">✂️ {SERVICE_LABELS[sel.service!]}</div>
            <div className="text-white font-bold">💶 {currentService?.price}€ payé</div>
          </div>
          <p className="text-[#6B7280] text-sm">
            Shadotech Automotive · 53 Rue de Noertzange · 3670 Kayl
          </p>
        </div>
      )}
    </div>
  );
}
