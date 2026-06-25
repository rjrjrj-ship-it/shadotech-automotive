"use client";

import { useState, useEffect, useMemo } from "react";
import { FileText, Download, Search, CheckSquare, Square, Eye, FileDown, ChevronDown, ArrowUpDown, X } from "lucide-react";
import { buildInvoiceHtml } from "@/lib/email";

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
  years: string;
  service: string;
  serviceLabel: string;
  price: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  paymentMethod: string | null;
  paymentId: string | null;
  createdAt: string;
}

type SortKey = "date" | "name" | "price" | "status";
type SortDir = "asc" | "desc";

const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function formatDate(d: string) {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function monthLabel(d: string) {
  const dt = new Date(d + "T00:00:00");
  return `${MONTHS_FR[dt.getMonth()]} ${dt.getFullYear()}`;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pending:   "bg-amber-500/15 text-amber-400 border-amber-500/30",
    cancelled: "bg-[#2E2E2E] text-[#6B7280] border-[#3A3A3A]",
  };
  const labels: Record<string, string> = { confirmed: "Confirmé", pending: "En attente", cancelled: "Annulé" };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${styles[status] ?? styles.cancelled}`}>
      {labels[status] ?? status}
    </span>
  );
}

function openInvoice(booking: Booking) {
  const html = buildInvoiceHtml(booking as Parameters<typeof buildInvoiceHtml>[0]);
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html + `
    <style>@media screen{body{cursor:default}}</style>
    <script>
      window.onload = function() {
        var btn = document.createElement('div');
        btn.innerHTML = '<button onclick="window.print()" style="position:fixed;top:16px;right:16px;background:#C62D36;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;z-index:9999;">⬇ Télécharger PDF</button>';
        document.body.appendChild(btn);
      };
    <\/script>
  `);
  win.document.close();
}

function exportSelected(bookings: Booking[]) {
  if (!bookings.length) return;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
    <style>@media print { .pagebreak { page-break-after: always; } } body { margin: 0; background: white; }</style>
  </head><body>` +
    bookings.map((b, i) =>
      `<div class="${i < bookings.length - 1 ? "pagebreak" : ""}">${buildInvoiceHtml(b as Parameters<typeof buildInvoiceHtml>[0])}</div>`
    ).join("") +
  `<script>window.onload=function(){window.print();}<\/script></body></html>`;
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}

export default function AdminFacturesPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState<"all" | "confirmed" | "pending" | "cancelled">("confirmed");
  const [sortKey, setSortKey]   = useState<SortKey>("date");
  const [sortDir, setSortDir]   = useState<SortDir>("desc");
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [groupByMonth, setGroupByMonth] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then(r => r.json())
      .then(d => setBookings(d.bookings ?? []))
      .finally(() => setLoading(false));
  }, []);

  // Available months from bookings
  const availableMonths = useMemo(() => {
    const set = new Set<string>();
    bookings.forEach(b => {
      const key = b.date.slice(0, 7); // "2026-06"
      set.add(key);
    });
    return Array.from(set).sort().reverse();
  }, [bookings]);

  const filtered = useMemo(() => {
    return bookings
      .filter(b => filter === "all" || b.status === filter)
      .filter(b => monthFilter === "all" || b.date.startsWith(monthFilter))
      .filter(b => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          b.firstName.toLowerCase().includes(q) ||
          b.lastName.toLowerCase().includes(q) ||
          b.brand.toLowerCase().includes(q) ||
          b.model.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.serviceLabel.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.phone.includes(q)
        );
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === "date")   cmp = a.date.localeCompare(b.date);
        if (sortKey === "name")   cmp = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        if (sortKey === "price")  cmp = a.price - b.price;
        if (sortKey === "status") cmp = a.status.localeCompare(b.status);
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [bookings, filter, monthFilter, search, sortKey, sortDir]);

  // Group by month
  const grouped = useMemo(() => {
    if (!groupByMonth) return { "": filtered };
    const groups: Record<string, Booking[]> = {};
    filtered.forEach(b => {
      const key = monthLabel(b.date);
      if (!groups[key]) groups[key] = [];
      groups[key].push(b);
    });
    return groups;
  }, [filtered, groupByMonth]);

  const confirmedFiltered = filtered.filter(b => b.status === "confirmed");

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  function toggleAll() {
    if (selected.size === confirmedFiltered.length) setSelected(new Set());
    else setSelected(new Set(confirmedFiltered.map(b => b.id)));
  }

  function toggle(id: string) {
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  const selectedBookings = bookings.filter(b => selected.has(b.id));
  const totalConfirmed   = bookings.filter(b => b.status === "confirmed").length;
  const totalRevenue     = bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.price, 0);
  const filteredRevenue  = filtered.filter(b => b.status === "confirmed").reduce((s, b) => s + b.price, 0);

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => toggleSort(k)} className={`flex items-center gap-1 transition-colors ${sortKey === k ? "text-white" : "text-[#6B7280] hover:text-[#9CA3AF]"}`}>
      {label}
      <ArrowUpDown size={11} className={sortKey === k ? "text-[#C62D36]" : ""} />
    </button>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-white font-bold text-2xl">Factures</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">
            {totalConfirmed} factures · {totalRevenue.toFixed(0)}€ total
          </p>
        </div>
        {selected.size > 0 && (
          <button
            onClick={() => exportSelected(selectedBookings)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all text-sm"
          >
            <FileDown size={16} />
            Exporter {selected.size} facture{selected.size > 1 ? "s" : ""} PDF
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Confirmées",      value: totalConfirmed,                                         color: "text-white" },
          { label: "Chiffre d'affaires", value: `${totalRevenue.toFixed(0)}€`,                      color: "text-[#C62D36]" },
          { label: "En attente",      value: bookings.filter(b => b.status === "pending").length,    color: "text-amber-400" },
          { label: filteredRevenue !== totalRevenue ? "CA filtré" : "Annulées",
            value: filteredRevenue !== totalRevenue ? `${filteredRevenue.toFixed(0)}€` : bookings.filter(b => b.status === "cancelled").length,
            color: filteredRevenue !== totalRevenue ? "text-emerald-400" : "text-[#6B7280]" },
        ].map(s => (
          <div key={s.label} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[#6B7280] text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Nom, véhicule, email, référence…"
            className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl pl-9 pr-9 py-2.5 text-white placeholder-[#6B7280] text-sm outline-none focus:border-[#C62D36]/50 transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Month filter */}
        <div className="relative">
          <select
            value={monthFilter}
            onChange={e => setMonthFilter(e.target.value)}
            className="appearance-none bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-3 py-2.5 pr-8 text-sm text-white outline-none focus:border-[#C62D36]/50 transition-all cursor-pointer"
          >
            <option value="all">Tous les mois</option>
            {availableMonths.map(m => {
              const [y, mo] = m.split("-");
              return <option key={m} value={m}>{MONTHS_FR[Number(mo) - 1]} {y}</option>;
            })}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
        </div>

        {/* Status filter */}
        <div className="flex rounded-xl overflow-hidden border border-[#2E2E2E]">
          {(["all", "confirmed", "pending", "cancelled"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 text-xs font-medium transition-all ${filter === f ? "bg-[#C62D36] text-white" : "bg-[#1A1A1A] text-[#6B7280] hover:text-white"}`}>
              {f === "all" ? "Toutes" : f === "confirmed" ? "Confirmées" : f === "pending" ? "En attente" : "Annulées"}
            </button>
          ))}
        </div>

        {/* Group toggle */}
        <button
          onClick={() => setGroupByMonth(g => !g)}
          className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${groupByMonth ? "bg-[#C62D36]/15 border-[#C62D36]/30 text-[#C62D36]" : "bg-[#1A1A1A] border-[#2E2E2E] text-[#6B7280] hover:text-white"}`}
        >
          Par mois
        </button>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#6B7280] text-xs">{filtered.length} résultat{filtered.length !== 1 ? "s" : ""}</span>
        {filtered.length > 0 && filter !== "pending" && (
          <span className="text-[#6B7280] text-xs">{filteredRevenue.toFixed(0)}€ sur la sélection</span>
        )}
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#2E2E2E] rounded-2xl overflow-hidden">
        {/* Column headers */}
        <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-[#2E2E2E] gap-3">
          <button onClick={toggleAll} className="text-[#6B7280] hover:text-white transition-colors shrink-0">
            {selected.size === confirmedFiltered.length && confirmedFiltered.length > 0
              ? <CheckSquare size={16} className="text-[#C62D36]" />
              : <Square size={16} />}
          </button>
          <div className="grid grid-cols-12 flex-1 gap-2 text-[10px] font-semibold uppercase tracking-wide">
            <div className="col-span-4"><SortBtn k="name" label="Client / Véhicule" /></div>
            <div className="col-span-3 hidden sm:block text-[#6B7280]">Prestation</div>
            <div className="col-span-2 hidden md:block"><SortBtn k="date" label="Date" /></div>
            <div className="col-span-1"><SortBtn k="price" label="Prix" /></div>
            <div className="col-span-2"><SortBtn k="status" label="Statut" /></div>
          </div>
          <div className="w-16 shrink-0" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-[#6B7280]">
            <div className="w-5 h-5 border-2 border-[#C62D36] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Chargement…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <FileText size={36} className="text-[#3B3B3B] mx-auto mb-3" />
            <p className="text-[#6B7280] text-sm">Aucune facture trouvée</p>
            {(search || filter !== "all" || monthFilter !== "all") && (
              <button onClick={() => { setSearch(""); setFilter("all"); setMonthFilter("all"); }} className="mt-3 text-[#C62D36] text-xs hover:underline">
                Réinitialiser les filtres
              </button>
            )}
          </div>
        ) : (
          <div>
            {Object.entries(grouped).map(([month, rows]) => (
              <div key={month}>
                {/* Month separator */}
                {month && (
                  <div className="flex items-center gap-3 px-4 py-2 bg-[#141414] border-b border-[#1E1E1E]">
                    <span className="text-[#6B7280] text-xs font-semibold">{month}</span>
                    <div className="flex-1 h-px bg-[#2E2E2E]" />
                    <span className="text-[#6B7280] text-xs">{rows.length} RDV · {rows.filter(b => b.status === "confirmed").reduce((s, b) => s + b.price, 0).toFixed(0)}€</span>
                  </div>
                )}
                <div className="divide-y divide-[#1A1A1A]">
                  {rows.map(b => {
                    const isConfirmed = b.status === "confirmed";
                    const isSelected  = selected.has(b.id);
                    return (
                      <div
                        key={b.id}
                        className={`flex items-center px-4 py-3 gap-3 hover:bg-[#161616] transition-colors ${isSelected ? "bg-[#C62D36]/5 border-l-2 border-[#C62D36]" : ""}`}
                      >
                        <button
                          onClick={() => isConfirmed && toggle(b.id)}
                          className={`shrink-0 transition-colors ${isConfirmed ? "text-[#6B7280] hover:text-[#C62D36]" : "text-[#2A2A2A] cursor-not-allowed"}`}
                        >
                          {isSelected ? <CheckSquare size={15} className="text-[#C62D36]" /> : <Square size={15} />}
                        </button>

                        <div className="grid grid-cols-12 flex-1 gap-2 items-center min-w-0">
                          {/* Client */}
                          <div className="col-span-4 min-w-0">
                            <div className="text-white text-sm font-semibold truncate">{b.firstName} {b.lastName}</div>
                            <div className="text-[#6B7280] text-xs truncate">{b.brand} {b.model}{b.finition ? ` · ${b.finition}` : ""}</div>
                            <div className="text-[#3B3B3B] text-[10px] font-mono mt-0.5">{b.id}</div>
                          </div>
                          {/* Prestation */}
                          <div className="col-span-3 hidden sm:block min-w-0">
                            <div className="text-[#9CA3AF] text-xs truncate">{b.serviceLabel}</div>
                            {b.paymentMethod && (
                              <div className="text-[#3B3B3B] text-[10px] capitalize">{b.paymentMethod}</div>
                            )}
                          </div>
                          {/* Date */}
                          <div className="col-span-2 hidden md:block">
                            <div className="text-[#9CA3AF] text-xs">{formatDate(b.date)}</div>
                            <div className="text-[#6B7280] text-[10px]">{b.startTime}–{b.endTime}</div>
                          </div>
                          {/* Price */}
                          <div className="col-span-1">
                            <span className={`font-bold text-sm ${b.price > 0 ? "text-white" : "text-[#6B7280]"}`}>{b.price > 0 ? `${b.price}€` : "—"}</span>
                          </div>
                          {/* Status */}
                          <div className="col-span-2">
                            <StatusBadge status={b.status} />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 shrink-0 w-16 justify-end">
                          {isConfirmed && b.price > 0 && (
                            <>
                              <button
                                onClick={() => openInvoice(b)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:text-white hover:bg-[#2E2E2E] transition-all"
                                title="Voir la facture"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => exportSelected([b])}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:text-[#C62D36] hover:bg-[#C62D36]/10 transition-all"
                                title="Télécharger PDF"
                              >
                                <Download size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
