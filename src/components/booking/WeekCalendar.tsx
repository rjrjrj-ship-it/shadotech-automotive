"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const DAY_SHORT   = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS_FR   = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const MONTHS_SHORT = ["jan","fév","mar","avr","mai","jun","jul","aoû","sep","oct","nov","déc"];

const DAY_START   = 9 * 60;    // 9h00
const DAY_END     = 18 * 60;   // 18h00
const SLOT_H      = 52;        // px per 30-min row — full view without scroll
const TOTAL_ROWS  = (DAY_END - DAY_START) / 30; // 18 rows
const GUTTER_W    = 64;        // px for time gutter

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function fromMin(m: number) {
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}
function dateStr(d: Date) {
  return d.toISOString().slice(0, 10);
}
function getMonday(d: Date) {
  const dt = new Date(d);
  const day = dt.getDay();
  dt.setDate(dt.getDate() + (day === 0 ? -6 : 1 - day));
  dt.setHours(0, 0, 0, 0);
  return dt;
}
function addDays(d: Date, n: number) {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + n);
  return dt;
}
function formatWeekTitle(monday: Date) {
  const sat = addDays(monday, 5);
  const d1 = monday.getDate(), mo1 = MONTHS_SHORT[monday.getMonth()], y1 = monday.getFullYear();
  const d2 = sat.getDate(),   mo2 = MONTHS_SHORT[sat.getMonth()],   y2 = sat.getFullYear();
  if (y1 === y2 && mo1 === mo2) return `${d1} – ${d2} ${mo1} ${y1}`;
  if (y1 === y2) return `${d1} ${mo1} – ${d2} ${mo2} ${y1}`;
  return `${d1} ${mo1} ${y1} – ${d2} ${mo2} ${y2}`;
}
function formatDayFull(ds: string) {
  const d = new Date(ds);
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface OccupiedSlot { start: string; end: string; }
interface DayData { occupied: OccupiedSlot[]; available: string[]; }
type WeekData = Record<string, DayData>;

interface Props {
  duration: number;
  selected: { date: string; slot: string };
  onSelect: (date: string, slot: string) => void;
  refreshKey?: number;
}

// ─── Time Gutter ─────────────────────────────────────────────────────────────

function TimeGutter() {
  const totalH = TOTAL_ROWS * SLOT_H;
  return (
    <div className="shrink-0 relative bg-[#111111] border-r border-[#333333]" style={{ width: GUTTER_W, height: totalH }}>
      {Array.from({ length: TOTAL_ROWS + 1 }).map((_, i) => {
        const min = DAY_START + i * 30;
        const isHour = min % 60 === 0;
        return (
          <div
            key={i}
            className="absolute right-0 flex items-center"
            style={{ top: i === 0 ? 2 : i * SLOT_H - 9, height: 18, paddingRight: 10 }}
          >
            <span className={`text-right leading-none whitespace-nowrap ${
              isHour ? "text-[#9CA3AF] text-xs font-semibold" : "text-[#4B5563] text-[10px]"
            }`}>
              {fromMin(min)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Day Column ───────────────────────────────────────────────────────────────

function DayColumn({
  date, dayData, duration, selected, hovered, onSelect, onHover, isPast,
}: {
  date: string;
  dayData: DayData | undefined;
  duration: number;
  selected: { date: string; slot: string };
  hovered: { date: string; slot: string } | null;
  onSelect: (date: string, slot: string) => void;
  onHover: (v: { date: string; slot: string } | null) => void;
  isPast: boolean;
}) {
  const occupied  = dayData?.occupied ?? [];
  const available = new Set(dayData?.available ?? []);
  const totalH    = TOTAL_ROWS * SLOT_H;

  const yOf  = (t: string) => ((toMin(t) - DAY_START) / 30) * SLOT_H;
  const hOf  = (mins: number) => (mins / 30) * SLOT_H;

  const previewSlot =
    hovered?.date === date ? hovered.slot :
    selected.date === date ? selected.slot : null;

  const isSelectedDay = selected.date === date;

  return (
    <div
      className="flex-1 min-w-0 relative border-r border-[#2A2A2A]"
      style={{ height: totalH }}
    >
      {/* Horizontal grid lines */}
      {Array.from({ length: TOTAL_ROWS }).map((_, i) => (
        <div
          key={i}
          className={`absolute left-0 right-0 ${i % 2 === 0 ? "border-t border-[#2A2A2A]" : "border-t border-[#1E1E1E]"}`}
          style={{ top: i * SLOT_H }}
        />
      ))}

      {/* Available slot hit areas */}
      {!isPast && Array.from(available).map(slot => {
        const isThisSelected = selected.date === date && selected.slot === slot;
        return (
          <div
            key={slot}
            className="absolute left-0 right-0 cursor-pointer group touch-manipulation select-none"
            style={{ top: yOf(slot), height: SLOT_H }}
            onMouseEnter={() => onHover({ date, slot })}
            onMouseLeave={() => onHover(null)}
            onPointerDown={(e) => { e.preventDefault(); onSelect(date, slot); }}
          >
            <div className={`absolute inset-x-1 inset-y-0.5 rounded-md border transition-all
              ${isThisSelected
                ? "bg-[#C62D36]/20 border-[#C62D36]/60"
                : "bg-emerald-500/10 border-emerald-500/25 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50"
              }`}
            >
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-emerald-400 text-[10px] font-semibold pointer-events-none">
                {slot}
              </span>
            </div>
          </div>
        );
      })}

      {/* Preview block */}
      {previewSlot && !isPast && (
        <div
          className="absolute left-1.5 right-1.5 rounded-lg pointer-events-none z-20 transition-all"
          style={{
            top: yOf(previewSlot) + 3,
            height: hOf(duration) - 6,
            background: isSelectedDay && hovered?.date !== date
              ? "rgba(198,45,54,0.92)"
              : "rgba(198,45,54,0.25)",
            border: `2px ${isSelectedDay && hovered?.date !== date ? "solid" : "dashed"} rgba(198,45,54,0.8)`,
          }}
        >
          <div className="px-2.5 pt-2">
            <div className="text-white text-xs font-bold leading-tight">
              {previewSlot} – {fromMin(toMin(previewSlot) + duration)}
            </div>
            <div className="text-white/70 text-[10px] mt-0.5">{duration} min</div>
          </div>
        </div>
      )}

      {/* Occupied blocks */}
      {occupied.map((o, i) => {
        const dur = toMin(o.end) - toMin(o.start);
        return (
          <div
            key={i}
            className="absolute left-1.5 right-1.5 rounded-lg z-10 bg-[#C62D36] border border-[#9B1C28] shadow-lg"
            style={{ top: yOf(o.start) + 3, height: hOf(dur) - 6 }}
          >
            <div className="px-2.5 pt-2">
              <div className="text-white text-xs font-bold leading-tight">{o.start} – {o.end}</div>
              <div className="text-white/80 text-[10px] font-semibold mt-0.5">Indisponible</div>
            </div>
          </div>
        );
      })}

      {/* Past overlay */}
      {isPast && (
        <div className="absolute inset-0 bg-[#111111]/50 z-30 pointer-events-none" />
      )}
    </div>
  );
}

// ─── Week Calendar ────────────────────────────────────────────────────────────

export function WeekCalendar({ duration, selected, onSelect, refreshKey = 0 }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [monday, setMonday]   = useState(() => getMonday(today));
  const [weekData, setWeekData] = useState<WeekData>({});
  const [loading, setLoading]  = useState(false);
  const [hovered, setHovered]  = useState<{ date: string; slot: string } | null>(null);
  const [view, setView]        = useState<"week" | "day">("week");
  const [dayView, setDayView]  = useState(dateStr(today));

  // Switch to day view on mobile after hydration
  useEffect(() => {
    if (window.innerWidth < 640) setView("day");
  }, []);
  const fetchRef = useRef("");

  const fetchWeek = useCallback(async (mon: Date) => {
    const key = dateStr(mon);
    fetchRef.current = key;
    setLoading(true);
    try {
      const r = await fetch(`/api/week-slots?weekStart=${key}&duration=${duration}&t=${Date.now()}`);
      const d = await r.json();
      setWeekData(d.week ?? {});
    } catch { setWeekData({}); }
    finally { setLoading(false); }
  }, [duration]);

  useEffect(() => { fetchWeek(monday); }, [monday, fetchWeek, refreshKey]);

  const days = Array.from({ length: 6 }, (_, i) => addDays(monday, i));
  const visibleDays = view === "week" ? days : [new Date(dayView)];

  return (
    <div className="rounded-2xl overflow-hidden border border-[#333333] bg-[#111111] shadow-2xl">

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#1A1A1A] border-b border-[#333333]">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setMonday(m => addDays(m, -7)); fetchRef.current = ""; }}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#9CA3AF] hover:text-white transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => { setMonday(m => addDays(m, 7)); fetchRef.current = ""; }}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#9CA3AF] hover:text-white transition-all"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={() => { setMonday(getMonday(today)); fetchRef.current = ""; }}
            className="px-3.5 h-9 text-sm font-medium rounded-xl bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#9CA3AF] hover:text-white transition-all"
          >
            Aujourd'hui
          </button>
        </div>

        <span className="text-white font-bold text-base hidden sm:block">
          {view === "week" ? formatWeekTitle(monday) : formatDayFull(dayView)}
        </span>

        <div className="flex rounded-xl overflow-hidden border border-[#333333]">
          {(["week", "day"] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                view === v
                  ? "bg-[#C62D36] text-white"
                  : "bg-[#2A2A2A] text-[#9CA3AF] hover:text-white"
              }`}
            >
              {v === "week" ? "Semaine" : "Jour"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Day headers ── */}
      <div className="flex bg-[#161616] border-b border-[#333333]" style={{ paddingLeft: GUTTER_W }}>
        {visibleDays.map((d, i) => {
          const ds      = dateStr(d);
          const isToday = ds === dateStr(today);
          const isPast  = d < today;
          const data    = weekData[ds];
          const freeCount = data?.available.length ?? null;

          return (
            <div
              key={ds}
              className={`flex-1 min-w-0 text-center py-3 border-r border-[#2A2A2A] cursor-pointer transition-colors select-none
                ${isPast ? "opacity-40" : "hover:bg-[#1E1E1E]"}`}
              onClick={() => { if (!isPast) { setView("day"); setDayView(ds); } }}
            >
              <div className="text-[#6B7280] text-xs font-medium uppercase tracking-wide">
                {DAY_SHORT[view === "week" ? i : new Date(ds).getDay() - 1]}
              </div>
              <div className={`mx-auto mt-1 w-9 h-9 flex items-center justify-center rounded-full text-base font-bold transition-all ${
                isToday ? "bg-[#C62D36] text-white" : "text-white"
              }`}>
                {d.getDate()}
              </div>
              {freeCount !== null && !isPast && (
                <div className={`text-[11px] mt-1 font-medium ${freeCount > 0 ? "text-emerald-400" : "text-[#6B7280]"}`}>
                  {freeCount > 0 ? `${freeCount} libre${freeCount > 1 ? "s" : ""}` : "Complet"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Grid ── */}
      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-[#6B7280]">
            <div className="w-6 h-6 border-2 border-[#C62D36] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Chargement des disponibilités...</span>
          </div>
        ) : (
          <div className="flex">
            <TimeGutter />
            {visibleDays.map((d) => {
              const ds     = dateStr(d);
              const isPast = d < today;
              return (
                <DayColumn
                  key={ds}
                  date={ds}
                  dayData={weekData[ds]}
                  duration={duration}
                  selected={selected}
                  hovered={hovered}
                  onSelect={onSelect}
                  onHover={setHovered}
                  isPast={isPast}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ── Legend + selected ── */}
      <div className="px-5 py-3 border-t border-[#333333] bg-[#1A1A1A] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#C62D36] border border-[#9B1C28]" />
            <span className="text-[#9CA3AF]">Indisponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-dashed border-[#C62D36]/70 bg-[#C62D36]/20" />
            <span className="text-[#9CA3AF]">Votre créneau ({duration} min)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500/15 border border-emerald-500/30" />
            <span className="text-[#9CA3AF]">Disponible</span>
          </div>
        </div>

        {selected.date && selected.slot ? (
          <div className="flex items-center gap-2 bg-[#C62D36]/15 border border-[#C62D36]/40 rounded-lg px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-[#C62D36]" />
            <span className="text-white text-xs font-semibold">
              {formatDayFull(selected.date)} · {selected.slot} – {fromMin(toMin(selected.slot) + duration)}
            </span>
          </div>
        ) : (
          <span className="text-[#6B7280] text-xs italic">Survolez pour prévisualiser, cliquez pour sélectionner</span>
        )}
      </div>
    </div>
  );
}
