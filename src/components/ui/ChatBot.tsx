"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, X, ChevronRight, RotateCcw } from "lucide-react";
import { COMPANY } from "@/lib/utils";

type MessageRole = "bot" | "user";

interface Message {
  id: number;
  role: MessageRole;
  text: string;
  options?: Option[];
}

interface Option {
  label: string;
  value: string;
  emoji?: string;
}

// ─── Conversation flows ──────────────────────────────────────────────────────

const FLOWS: Record<string, (ctx: Context) => Step> = {

  start: () => ({
    text: "Bonjour ! 👋 Je suis l'assistant Shadotech.\n\nComment puis-je vous aider aujourd'hui ?",
    options: [
      { label: "Vitres Teintées", value: "vitres", emoji: "🪟" },
      { label: "Covering", value: "covering", emoji: "🎨" },
      { label: "PPF — Protection Peinture", value: "ppf", emoji: "🛡️" },
      { label: "Ciel Étoilé", value: "ciel", emoji: "✨" },
      { label: "Lumière d'Ambiance", value: "lumiere", emoji: "💡" },
      { label: "CarPlay", value: "carplay", emoji: "📱" },
      { label: "Autre / Renseignement", value: "other", emoji: "💬" },
    ],
  }),

  // ── Vitres teintées ──
  vitres: () => ({
    text: "Super ! Pour les vitres teintées, nous utilisons exclusivement les films **SUNTEK HP** — 7 teintes disponibles.\n\nQuel type de véhicule avez-vous ?",
    options: [
      { label: "Citadine", value: "vt_citadine", emoji: "🚗" },
      { label: "Berline", value: "vt_berline", emoji: "🚘" },
      { label: "SUV / 4x4", value: "vt_suv", emoji: "🚙" },
      { label: "Break", value: "vt_break", emoji: "🚐" },
      { label: "Utilitaire", value: "vt_utilitaire", emoji: "🚌" },
      { label: "Cabriolet", value: "vt_cabriolet", emoji: "🏎️" },
    ],
  }),

  vt_citadine: () => ({ text: "", options: [], _goto: "vt_teinte" }),
  vt_berline:  () => ({ text: "", options: [], _goto: "vt_teinte" }),
  vt_suv:      () => ({ text: "", options: [], _goto: "vt_teinte" }),
  vt_break:    () => ({ text: "", options: [], _goto: "vt_teinte" }),
  vt_utilitaire: () => ({ text: "", options: [], _goto: "vt_teinte" }),
  vt_cabriolet: () => ({ text: "", options: [], _goto: "vt_teinte" }),

  vt_teinte: (ctx) => {
    const vehicle = ctx.vehicle ?? "berline";
    const names: Record<string, string> = {
      citadine: "citadine", berline: "berline", suv: "SUV",
      break: "break", utilitaire: "utilitaire", cabriolet: "cabriolet",
    };
    return {
      text: `Parfait pour votre ${names[vehicle]} !\n\nQuelle teinte souhaitez-vous ? (VLT = lumière transmise — plus c'est bas, plus c'est sombre)`,
      options: [
        { label: "70% VLT — Légal toutes vitres", value: "vt_price_70", emoji: "✅" },
        { label: "50% VLT — Discret", value: "vt_price_50", emoji: "🌤️" },
        { label: "35% VLT — Équilibré", value: "vt_price_35", emoji: "🌥️" },
        { label: "30% VLT — Prononcé", value: "vt_price_30", emoji: "⛅" },
        { label: "20% VLT — Sombre", value: "vt_price_20", emoji: "🌑" },
        { label: "15% VLT — Très sombre", value: "vt_price_15", emoji: "🌑" },
        { label: "3% VLT — Limo", value: "vt_price_03", emoji: "🖤" },
      ],
    };
  },

  vt_price_70: (ctx) => buildVtPrice(ctx, 70),
  vt_price_50: (ctx) => buildVtPrice(ctx, 50),
  vt_price_35: (ctx) => buildVtPrice(ctx, 35),
  vt_price_30: (ctx) => buildVtPrice(ctx, 30),
  vt_price_20: (ctx) => buildVtPrice(ctx, 20),
  vt_price_15: (ctx) => buildVtPrice(ctx, 15),
  vt_price_03: (ctx) => buildVtPrice(ctx, 3),

  // ── Covering ──
  covering: () => ({
    text: "Le covering permet de changer la couleur de votre voiture sans peinture — 100% réversible.\n\nQuel type de finition vous intéresse ?",
    options: [
      { label: "Mat", value: "cov_cta", emoji: "🖤" },
      { label: "Brillant", value: "cov_cta", emoji: "✨" },
      { label: "Satiné", value: "cov_cta", emoji: "🪞" },
      { label: "Chrome / Miroir", value: "cov_cta", emoji: "💫" },
      { label: "Caméléon", value: "cov_cta", emoji: "🦎" },
      { label: "Carbone", value: "cov_cta", emoji: "⚡" },
      { label: "Je ne sais pas encore", value: "cov_cta", emoji: "💬" },
    ],
  }),

  cov_cta: () => ({
    text: "Super choix ! Le tarif dépend de la surface à couvrir (partiel ou complet).\n\nNous établissons un devis gratuit après inspection du véhicule. Prenons rendez-vous !",
    options: [],
    _cta: true,
  }),

  // ── PPF ──
  ppf: () => ({
    text: "Le PPF (Paint Protection Film) est un film transparent qui protège votre peinture des gravillons, rayures et UV. Auto-cicatrisant et garanti 10 ans.\n\nQuelle zone souhaitez-vous protéger ?",
    options: [
      { label: "Partiel avant (capot, ailes, pare-chocs)", value: "ppf_cta", emoji: "🛡️" },
      { label: "Complet avant + montants A", value: "ppf_cta", emoji: "🛡️" },
      { label: "Full car — protection totale", value: "ppf_cta", emoji: "🚗" },
      { label: "Phares uniquement", value: "ppf_cta", emoji: "💡" },
      { label: "Je veux un conseil", value: "ppf_cta", emoji: "💬" },
    ],
  }),

  ppf_cta: () => ({
    text: "Excellent choix pour protéger votre investissement ! Le PPF est invisible et préserve la valeur de revente.\n\nNous établissons un devis sur mesure après inspection. Prenons rendez-vous !",
    options: [],
    _cta: true,
  }),

  // ── Ciel étoilé ──
  ciel: () => ({
    text: "Le ciel étoilé transforme votre plafond en un vrai ciel nocturne grâce à des centaines de fibres optiques LED.\n\nVous souhaitez :",
    options: [
      { label: "Plafond complet", value: "ciel_cta", emoji: "🌌" },
      { label: "Plafond partiel", value: "ciel_cta", emoji: "✨" },
      { label: "Avec contrôle smartphone", value: "ciel_cta", emoji: "📱" },
      { label: "Je veux voir des exemples", value: "ciel_real", emoji: "📸" },
    ],
  }),

  ciel_real: () => ({
    text: "Retrouvez nos réalisations de ciels étoilés sur notre page portfolio et Instagram !",
    options: [],
    _cta: true,
    _links: [
      { label: "Voir les réalisations", href: "/realisations" },
    ],
  }),

  ciel_cta: () => ({
    text: "Magnifique projet ! Chaque installation est unique et réalisée entièrement à la main.\n\nContactez-nous pour un devis personnalisé.",
    options: [],
    _cta: true,
  }),

  // ── Lumière ambiance ──
  lumiere: () => ({
    text: "L'éclairage d'ambiance LED RGB transforme l'intérieur de votre voiture avec des millions de couleurs, contrôlables depuis votre smartphone.\n\nPour quel usage ?",
    options: [
      { label: "Ambiance intérieure (portes, tapis)", value: "lumiere_cta", emoji: "💡" },
      { label: "Plafond LED", value: "lumiere_cta", emoji: "🌈" },
      { label: "Sous-châssis extérieur", value: "lumiere_cta", emoji: "🚗" },
      { label: "Pack complet", value: "lumiere_cta", emoji: "✨" },
    ],
  }),

  lumiere_cta: () => ({
    text: "Parfait ! L'installation comprend les rubans LED, le contrôleur Bluetooth et la mise en service.\n\nContactez-nous pour un devis.",
    options: [],
    _cta: true,
  }),

  // ── CarPlay ──
  carplay: () => ({
    text: "Nous installons Apple CarPlay et Android Auto sur tous les véhicules, même sans compatibilité d'origine.\n\nVotre véhicule est :",
    options: [
      { label: "Compatible d'origine (activation)", value: "carplay_cta", emoji: "✅" },
      { label: "Non compatible (remplacement autoradio)", value: "carplay_cta", emoji: "🔧" },
      { label: "Je ne sais pas", value: "carplay_cta", emoji: "❓" },
    ],
  }),

  carplay_cta: () => ({
    text: "Pas de souci ! Nous vérifions la compatibilité lors du rendez-vous et proposons la meilleure solution.\n\nPrenons rendez-vous !",
    options: [],
    _cta: true,
  }),

  // ── Autre ──
  other: () => ({
    text: "Bien sûr ! Notre équipe est disponible pour répondre à toutes vos questions.\n\nComment préférez-vous nous contacter ?",
    options: [],
    _cta: true,
  }),
};

// ─── Price helper ─────────────────────────────────────────────────────────────

const PRICES: Record<string, Record<number, number>> = {
  citadine:    { 70: 38, 50: 44, 35: 50, 30: 54, 20: 60, 15: 66, 3: 74 },
  berline:     { 70: 42, 50: 50, 35: 58, 30: 62, 20: 70, 15: 76, 3: 85 },
  suv:         { 70: 48, 50: 58, 35: 68, 30: 74, 20: 83, 15: 91, 3: 100 },
  break:       { 70: 44, 50: 53, 35: 62, 30: 67, 20: 74, 15: 82, 3: 90 },
  utilitaire:  { 70: 52, 50: 64, 35: 75, 30: 82, 20: 91, 15: 100, 3: 110 },
  cabriolet:   { 70: 44, 50: 52, 35: 60, 30: 65, 20: 73, 15: 80, 3: 88 },
};

function buildVtPrice(ctx: Context, vlt: number): Step {
  const vehicle = ctx.vehicle ?? "berline";
  const pricePerWindow = PRICES[vehicle]?.[vlt] ?? 50;
  const min = pricePerWindow * 2;
  const max = pricePerWindow * 7;
  const legalNote = vlt === 70
    ? "✅ Ce film est légal sur toutes les vitres au Luxembourg."
    : vlt === 50
    ? "⚠️ Recommandé pour les vitres arrières."
    : "⚠️ Réservé aux vitres arrières uniquement (Code de la Route LU).";

  return {
    text: `Film SUNTEK HP ${vlt}% VLT — ${legalNote}\n\n💰 **Estimation : ${min}€ à ${max}€** selon le nombre de vitres (${pricePerWindow}€/vitre).\n\nPour un tarif exact, utilisez notre outil de réservation en ligne ou prenez rendez-vous.`,
    options: [],
    _cta: true,
    _links: [
      { label: "Réserver & calculer le tarif exact", href: "/vitres-teintees#reservation" },
    ],
  };
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step {
  text: string;
  options: Option[];
  _cta?: boolean;
  _goto?: string;
  _links?: { label: string; href: string }[];
}

interface Context {
  vehicle?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

let msgId = 0;
const newId = () => ++msgId;

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [ctx, setCtx] = useState<Context>({});
  const [ctaLinks, setCtaLinks] = useState<{ label: string; href: string }[]>([]);
  const [showCta, setShowCta] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-open on mount + welcome message
  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      triggerStep("start", {});
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Show notification dot after 4s if not opened
  useEffect(() => {
    const t = setTimeout(() => setHasNewMsg(true), 4000);
    return () => clearTimeout(t);
  }, []);

  function triggerStep(key: string, currentCtx: Context) {
    const flowFn = FLOWS[key];
    if (!flowFn) return;

    const step = flowFn(currentCtx);

    // Redirect without message
    if (step._goto) {
      triggerStep(step._goto, currentCtx);
      return;
    }

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "bot",
          text: step.text,
          options: step.options,
        },
      ]);
      if (step._cta) {
        setShowCta(true);
        setCtaLinks(step._links ?? []);
      }
    }, 700);
  }

  function handleOption(opt: Option, userLabel: string) {
    // Add user message
    setMessages((prev) => [
      ...prev.map((m) => ({ ...m, options: [] })), // hide previous options
      { id: newId(), role: "user", text: userLabel },
    ]);
    setShowCta(false);

    // Update context
    const newCtx = { ...ctx };
    if (opt.value.startsWith("vt_") && !opt.value.startsWith("vt_price") && !opt.value.startsWith("vt_teinte")) {
      newCtx.vehicle = opt.value.replace("vt_", "");
    }
    setCtx(newCtx);

    triggerStep(opt.value, newCtx);
  }

  function reset() {
    setMessages([]);
    setCtx({});
    setShowCta(false);
    setCtaLinks([]);
    triggerStep("start", {});
  }

  const formatText = (text: string) =>
    text.split("\n").map((line, i) => {
      // Bold **text**
      const parts = line.split(/\*\*(.+?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((p, j) =>
            j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p
          )}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(true); setHasNewMsg(false); }}
        className={`fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full bg-[#C62D36] hover:bg-[#a82530] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${open ? "hidden" : "flex"}`}
        aria-label="Ouvrir le chat"
      >
        <MessageCircle size={24} />
        {hasNewMsg && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-[#111111] animate-pulse" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[340px] sm:w-[380px] max-h-[600px] flex flex-col rounded-2xl border border-[#2E2E2E] shadow-2xl bg-[#111111] overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-[#2E2E2E]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#C62D36] flex items-center justify-center text-white font-bold text-sm shrink-0">
                S
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1A1A1A]" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Shadotech Assistant</div>
                <div className="text-green-400 text-xs">En ligne</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={reset} className="text-[#6B7280] hover:text-white transition-colors p-1" aria-label="Recommencer" title="Recommencer">
                <RotateCcw size={15} />
              </button>
              <button onClick={() => setOpen(false)} className="text-[#6B7280] hover:text-white transition-colors p-1" aria-label="Fermer">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${msg.role === "user" ? "order-2" : ""}`}>
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-[#C62D36] flex items-center justify-center text-white text-xs font-bold mb-1">
                      S
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#C62D36] text-white rounded-tr-sm"
                      : "bg-[#1A1A1A] border border-[#2E2E2E] text-[#9CA3AF] rounded-tl-sm"
                  }`}>
                    {formatText(msg.text)}
                  </div>
                  {/* Options */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value + opt.label}
                          onClick={() => handleOption(opt, `${opt.emoji ? opt.emoji + " " : ""}${opt.label}`)}
                          className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#2E2E2E] hover:border-[#C62D36] hover:text-white text-[#9CA3AF] rounded-xl text-sm text-left transition-all group"
                        >
                          {opt.emoji && <span>{opt.emoji}</span>}
                          <span className="flex-1">{opt.label}</span>
                          <ChevronRight size={12} className="text-[#6B7280] group-hover:text-[#C62D36] shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-[#C62D36] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* CTA Footer */}
          {showCta && (
            <div className="px-4 pb-4 pt-2 border-t border-[#2E2E2E] space-y-2">
              {ctaLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl text-sm transition-all"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#2E2E2E] hover:border-[#C62D36] text-[#9CA3AF] hover:text-white rounded-xl text-sm transition-all"
              >
                📋 Formulaire de contact
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#2E2E2E] hover:border-[#25D366] text-[#9CA3AF] hover:text-[#25D366] rounded-xl text-sm transition-all"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.102 1.523 5.824L0 24l6.361-1.498A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.847 0-3.594-.484-5.112-1.334L2.5 21.5l.855-4.257A9.95 9.95 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
