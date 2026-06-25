"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, User, Car, Scissors, XCircle, AlertTriangle, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  years?: string;
  serviceLabel: string;
  price: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DAY_SHORT  = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS_FR  = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const MONTHS_S   = ["jan","fév","mar","avr","mai","jun","jul","aoû","sep","oct","nov","déc"];
const DAY_START  = 9 * 60;
const DAY_END    = 18 * 60;
const SLOT_H     = 38;
const TOTAL_ROWS = (DAY_END - DAY_START) / 30;
const GUTTER_W   = 60;

const STATUS_COLORS: Record<string, string> = {
  confirmed: "bg-emerald-600 border-emerald-500",
  pending:   "bg-amber-600 border-amber-500",
  cancelled: "bg-[#3A3A3A] border-[#4A4A4A]",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toMin(t: string) { const [h,m] = t.split(":").map(Number); return h*60+m; }
function fromMin(m: number) { return `${String(Math.floor(m/60)).padStart(2,"0")}:${String(m%60).padStart(2,"0")}`; }
function dateStr(d: Date) { return d.toISOString().slice(0,10); }
function getMonday(d: Date) {
  const dt = new Date(d); const day = dt.getDay();
  dt.setDate(dt.getDate() + (day===0 ? -6 : 1-day)); dt.setHours(0,0,0,0); return dt;
}
function addDays(d: Date, n: number) { const dt = new Date(d); dt.setDate(dt.getDate()+n); return dt; }
function formatWeekTitle(m: Date) {
  const s = addDays(m,5);
  const [d1,mo1,y1] = [m.getDate(), MONTHS_S[m.getMonth()], m.getFullYear()];
  const [d2,mo2]    = [s.getDate(), MONTHS_S[s.getMonth()]];
  if (mo1===mo2) return `${d1} – ${d2} ${mo1} ${y1}`;
  return `${d1} ${mo1} – ${d2} ${mo2} ${y1}`;
}

// ─── Confirmation Modal ───────────────────────────────────────────────────────

function CancelModal({ booking, onConfirm, onClose, loading }: {
  booking: Booking;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-[#6B7280] hover:text-white transition-colors">
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-red-400" />
        </div>

        <h2 className="text-white font-bold text-xl text-center mb-1">Annuler ce rendez-vous ?</h2>
        <p className="text-[#6B7280] text-sm text-center mb-6">Cette action est irréversible. Le créneau sera libéré.</p>

        {/* Booking recap */}
        <div className="bg-[#111111] border border-[#2E2E2E] rounded-xl p-4 space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-[#6B7280]">Client</span>
            <span className="text-white font-medium">{booking.firstName} {booking.lastName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B7280]">Véhicule</span>
            <span className="text-white">{booking.brand} {booking.model}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B7280]">Prestation</span>
            <span className="text-white text-right max-w-[60%]">{booking.serviceLabel}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#6B7280]">Date</span>
            <span className="text-white">{new Date(booking.date).toLocaleDateString("fr-FR",{day:"numeric",month:"long"})} à {booking.startTime}</span>
          </div>
          <div className="flex justify-between text-sm pt-1 border-t border-[#2E2E2E] mt-1">
            <span className="text-[#6B7280]">Montant</span>
            <span className="text-[#C62D36] font-bold">{booking.price}€</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[#2E2E2E] hover:border-[#4A4A4A] text-[#9CA3AF] hover:text-white rounded-xl text-sm font-medium transition-all"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            {loading
              ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Annulation…</>
              : <><XCircle size={15} />Confirmer l'annulation</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Panel (rendered at page level, no overflow issues) ────────────────

function DetailPanel({ booking, onClose, onCancelRequest }: {
  booking: Booking;
  onClose: () => void;
  onCancelRequest: (b: Booking) => void;
}) {
  const statusLabel: Record<string, string> = { confirmed: "Confirmé", pending: "En attente", cancelled: "Annulé" };
  const statusDot: Record<string, string>   = { confirmed: "bg-emerald-400", pending: "bg-amber-400", cancelled: "bg-gray-500" };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-[#1A1A1A] border border-[#3A3A3A] rounded-2xl p-5 w-full max-w-sm shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[#6B7280] hover:text-white transition-colors">
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2.5 h-2.5 rounded-full ${statusDot[booking.status] ?? "bg-gray-500"}`} />
          <span className="text-white font-bold text-base">{statusLabel[booking.status] ?? booking.status}</span>
          <span className="text-[#6B7280] text-xs ml-auto">{booking.startTime}–{booking.endTime}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <User size={14} className="text-[#6B7280] mt-0.5 shrink-0" />
            <div>
              <div className="text-white text-sm font-semibold">{booking.firstName} {booking.lastName}</div>
              <div className="text-[#6B7280] text-xs">{booking.email}</div>
              <div className="text-[#6B7280] text-xs">{booking.phone}</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Car size={14} className="text-[#6B7280] mt-0.5 shrink-0" />
            <div>
              <div className="text-white text-sm">{booking.brand} {booking.model}</div>
              <div className="text-[#6B7280] text-xs">{booking.finition} · {booking.years}</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Scissors size={14} className="text-[#6B7280] mt-0.5 shrink-0" />
            <div className="text-white text-sm">{booking.serviceLabel}</div>
          </div>
          <div className="pt-2 border-t border-[#2E2E2E] flex justify-between items-center">
            <span className="text-[#6B7280] text-xs">Montant</span>
            <span className="text-[#C62D36] font-bold text-base">{booking.price}€</span>
          </div>
        </div>

        {booking.status !== "cancelled" && (
          <button
            onClick={() => { onClose(); onCancelRequest(booking); }}
            className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl text-sm font-semibold transition-all"
          >
            <XCircle size={15} />
            Annuler ce rendez-vous
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────

function BookingCard({ booking, pixH, onShowDetail }: {
  booking: Booking;
  pixH: number;
  onShowDetail: (b: Booking) => void;
}) {
  const colorClass = STATUS_COLORS[booking.status] ?? STATUS_COLORS.confirmed;
  const compact = pixH < 56;

  return (
    <div
      className={`absolute left-1.5 right-1.5 rounded-lg border shadow-lg cursor-pointer z-10 overflow-hidden transition-all hover:brightness-110 ${colorClass}`}
      style={{ top: 3, height: pixH - 6 }}
      onClick={() => onShowDetail(booking)}
    >
      <div className="px-2 pt-1">
        <div className="text-white text-[11px] font-bold leading-tight truncate">
          {booking.startTime}–{booking.endTime}
        </div>
        {!compact && (
          <>
            <div className="text-white/90 text-[11px] font-semibold truncate mt-0.5">
              {booking.firstName} {booking.lastName}
            </div>
            <div className="text-white/70 text-[10px] truncate">
              {booking.brand} {booking.model}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Day Column ───────────────────────────────────────────────────────────────

const BREAK_START = "12:30";
const BREAK_END   = "13:00";

function DayColumn({ date, bookings, isToday, isPast, onShowDetail }: {
  date: string; bookings: Booking[]; isToday: boolean; isPast: boolean;
  onShowDetail: (b: Booking) => void;
}) {
  const totalH = TOTAL_ROWS * SLOT_H;
  const yOf = (t: string) => ((toMin(t) - DAY_START) / 30) * SLOT_H;
  const hOf = (min: number) => (min / 30) * SLOT_H;

  return (
    <div className={`flex-1 min-w-0 relative border-r border-[#2A2A2A]`} style={{ height: totalH }}>
      {/* Grid lines */}
      {Array.from({ length: TOTAL_ROWS }).map((_, i) => (
        <div key={i} className={`absolute left-0 right-0 ${i%2===0 ? "border-t border-[#252525]" : "border-t border-[#1C1C1C]"}`} style={{ top: i*SLOT_H }} />
      ))}

      {/* Break block */}
      <div
        className="absolute left-1.5 right-1.5 rounded-lg z-10 bg-[#2A2A2A] border border-[#383838] flex items-center justify-center"
        style={{ top: yOf(BREAK_START)+3, height: hOf(30)-6 }}
      >
        <span className="text-[#6B7280] text-[10px] font-medium">Pause déjeuner</span>
      </div>

      {/* Bookings */}
      {bookings.map(b => {
        const dur = toMin(b.endTime) - toMin(b.startTime);
        return (
          <div key={b.id} className="absolute left-0 right-0" style={{ top: yOf(b.startTime), height: hOf(dur) }}>
            <BookingCard booking={b} pixH={hOf(dur)} onShowDetail={onShowDetail} />
          </div>
        );
      })}

      {/* Past overlay */}
      {isPast && <div className="absolute inset-0 bg-[#0A0A0A]/50 pointer-events-none z-20" />}
    </div>
  );
}

// ─── Time Gutter ─────────────────────────────────────────────────────────────

function TimeGutter() {
  return (
    <div className="shrink-0 relative bg-[#0A0A0A] border-r border-[#2A2A2A]" style={{ width: GUTTER_W, height: TOTAL_ROWS*SLOT_H }}>
      {Array.from({ length: TOTAL_ROWS+1 }).map((_, i) => {
        const min = DAY_START + i*30;
        const isH = min%60===0;
        return (
          <div key={i} className="absolute right-0 flex items-center" style={{ top: i===0?2:i*SLOT_H-8, paddingRight:8 }}>
            <span className={`text-right whitespace-nowrap ${isH?"text-[#9CA3AF] text-xs font-semibold":"text-[#3B3B3B] text-[10px]"}`}>
              {fromMin(min)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminCalendrierPage() {
  const today = new Date(); today.setHours(0,0,0,0);
  const [monday, setMonday] = useState(() => getMonday(today));
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"week"|"day">("week");
  const [dayView, setDayView] = useState(dateStr(today));
  const fetchRef = useRef("");
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    const key = dateStr(monday);
    if (fetchRef.current === key && allBookings.length) return;
    fetchRef.current = key;
    setLoading(true);
    try {
      const r = await fetch("/api/admin/bookings");
      const d = await r.json();
      setAllBookings(d.bookings ?? []);
    } catch { setAllBookings([]); }
    finally { setLoading(false); }
  }, [monday]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  async function confirmCancel() {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await fetch(`/api/bookings/${cancelTarget.id}`, { method: "DELETE" });
      setAllBookings(prev => prev.map(b => b.id === cancelTarget.id ? { ...b, status: "cancelled" } : b));
      setCancelTarget(null);
    } finally {
      setCancelling(false);
    }
  }

  const days = Array.from({ length: 6 }, (_, i) => addDays(monday, i));
  const visibleDays = view === "week" ? days : [new Date(dayView)];

  function bookingsForDay(ds: string) {
    return allBookings.filter(b => b.date === ds && b.status !== "cancelled");
  }

  const todayCount = allBookings.filter(b => b.date === dateStr(today) && b.status === "confirmed").length;
  const weekCount  = days.reduce((acc, d) => acc + allBookings.filter(b => b.date===dateStr(d) && b.status==="confirmed").length, 0);

  return (
    <div>
      {/* Detail panel */}
      {detailBooking && (
        <DetailPanel
          booking={detailBooking}
          onClose={() => setDetailBooking(null)}
          onCancelRequest={(b) => { setCancelTarget(b); }}
        />
      )}

      {/* Cancel modal */}
      {cancelTarget && (
        <CancelModal
          booking={cancelTarget}
          onConfirm={confirmCancel}
          onClose={() => setCancelTarget(null)}
          loading={cancelling}
        />
      )}

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-bold text-2xl">Calendrier</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">
            {todayCount} RDV aujourd'hui · {weekCount} cette semaine
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-600" /><span className="text-[#9CA3AF]">Confirmé</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-600" /><span className="text-[#9CA3AF]">En attente</span></div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-[#2E2E2E] bg-[#111111] shadow-xl">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#161616] border-b border-[#2E2E2E]">
          <div className="flex items-center gap-1.5">
            <button onClick={() => { setMonday(m => addDays(m,-7)); fetchRef.current=""; }} className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#9CA3AF] hover:text-white transition-all">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => { setMonday(m => addDays(m,7)); fetchRef.current=""; }} className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#9CA3AF] hover:text-white transition-all">
              <ChevronRight size={16} />
            </button>
            <button onClick={() => { setMonday(getMonday(today)); fetchRef.current=""; }} className="px-3.5 h-9 text-sm font-medium rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#9CA3AF] hover:text-white transition-all">
              Aujourd'hui
            </button>
          </div>
          <span className="text-white font-bold hidden sm:block">{formatWeekTitle(monday)}</span>
          <div className="flex rounded-xl overflow-hidden border border-[#2E2E2E]">
            {(["week","day"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-4 py-2 text-sm font-medium transition-all ${view===v?"bg-[#C62D36] text-white":"bg-[#2A2A2A] text-[#9CA3AF] hover:text-white"}`}>
                {v==="week"?"Semaine":"Jour"}
              </button>
            ))}
          </div>
        </div>

        {/* Day headers */}
        <div className="flex bg-[#141414] border-b border-[#2E2E2E]" style={{ paddingLeft: GUTTER_W }}>
          {visibleDays.map((d, i) => {
            const ds = dateStr(d);
            const isToday = ds === dateStr(today);
            const dayBookings = bookingsForDay(ds);
            return (
              <div key={ds} className={`flex-1 min-w-0 text-center py-3 border-r border-[#2A2A2A] cursor-pointer transition-colors hover:bg-[#1A1A1A] select-none`}
                onClick={() => { setView("day"); setDayView(ds); }}>
                <div className="text-[#6B7280] text-xs font-medium uppercase tracking-wide">
                  {DAY_SHORT[view==="week" ? i : new Date(ds).getDay()-1]}
                </div>
                <div className={`mx-auto mt-1 w-9 h-9 flex items-center justify-center rounded-full text-base font-bold ${isToday?"bg-[#C62D36] text-white":"text-white"}`}>
                  {d.getDate()}
                </div>
                <div className={`text-[11px] mt-1 font-medium ${dayBookings.length>0?"text-[#C62D36]":"text-[#3B3B3B]"}`}>
                  {dayBookings.length>0 ? `${dayBookings.length} RDV` : "—"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-24 text-[#6B7280]">
            <div className="w-5 h-5 border-2 border-[#C62D36] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Chargement…</span>
          </div>
        ) : (
          <div className="flex">
            <TimeGutter />
            {visibleDays.map(d => {
              const ds = dateStr(d);
              return (
                <DayColumn
                  key={ds}
                  date={ds}
                  bookings={bookingsForDay(ds)}
                  isToday={ds===dateStr(today)}
                  isPast={d<today}
                  onShowDetail={setDetailBooking}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
