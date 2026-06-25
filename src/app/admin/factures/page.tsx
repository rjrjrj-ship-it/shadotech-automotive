"use client";

import { useState, useEffect } from "react";
import { FileText, Download, Search, Filter, CheckSquare, Square, Eye, FileDown } from "lucide-react";
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

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { day:"numeric", month:"short", year:"numeric" });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pending:   "bg-amber-500/15 text-amber-400 border-amber-500/30",
    cancelled: "bg-[#2E2E2E] text-[#6B7280] border-[#3A3A3A]",
  };
  const labels: Record<string, string> = { confirmed:"Confirmé", pending:"En attente", cancelled:"Annulé" };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${styles[status]}`}>
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
    <style>
      @media print { .pagebreak { page-break-after: always; } }
      body { margin: 0; background: white; }
    </style>
  </head><body>` +
    bookings.map((b, i) =>
      `<div class="${i < bookings.length - 1 ? 'pagebreak' : ''}">${buildInvoiceHtml(b as Parameters<typeof buildInvoiceHtml>[0])}</div>`
    ).join("") +
  `<script>window.onload=function(){window.print();}<\/script></body></html>`;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}

export default function AdminFacturesPage() {
  const [bookings, setBookings]   = useState<Booking[]>([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState<"all"|"confirmed"|"pending">("all");

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then(r => r.json())
      .then(d => setBookings(d.bookings ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings
    .filter(b => filter === "all" || b.status === filter)
    .filter(b => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        b.firstName.toLowerCase().includes(q) ||
        b.lastName.toLowerCase().includes(q) ||
        b.brand.toLowerCase().includes(q) ||
        b.model.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const confirmedFiltered = filtered.filter(b => b.status === "confirmed");

  function toggleAll() {
    if (selected.size === confirmedFiltered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(confirmedFiltered.map(b => b.id)));
    }
  }

  function toggle(id: string) {
    setSelected(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  const selectedBookings = bookings.filter(b => selected.has(b.id));

  const totalConfirmed = bookings.filter(b => b.status === "confirmed").length;
  const totalRevenue   = bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + b.price, 0);

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-white font-bold text-2xl">Factures</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">
            {totalConfirmed} factures · {totalRevenue.toFixed(2)}€ de chiffre d'affaires
          </p>
        </div>
        {selected.size > 0 && (
          <button
            onClick={() => exportSelected(selectedBookings)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all text-sm"
          >
            <FileDown size={16} />
            Exporter {selected.size} facture{selected.size > 1 ? "s" : ""} (PDF)
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total factures",    value: totalConfirmed,              color: "text-white" },
          { label: "Chiffre d'affaires", value: `${totalRevenue.toFixed(0)}€`, color: "text-[#C62D36]" },
          { label: "En attente",        value: bookings.filter(b=>b.status==="pending").length, color: "text-amber-400" },
          { label: "Sélectionnés",      value: selected.size,               color: "text-emerald-400" },
        ].map(s => (
          <div key={s.label} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[#6B7280] text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher client, véhicule, référence…"
            className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-[#6B7280] text-sm outline-none focus:border-[#C62D36]/50 transition-all"
          />
        </div>
        <div className="flex rounded-xl overflow-hidden border border-[#2E2E2E]">
          {(["all","confirmed","pending"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 text-xs font-medium transition-all ${filter===f?"bg-[#C62D36] text-white":"bg-[#1A1A1A] text-[#6B7280] hover:text-white"}`}>
              {f==="all"?"Toutes":f==="confirmed"?"Confirmées":"En attente"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#2E2E2E] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-[#2E2E2E] gap-3">
          <button onClick={toggleAll} className="text-[#6B7280] hover:text-white transition-colors shrink-0">
            {selected.size === confirmedFiltered.length && confirmedFiltered.length > 0
              ? <CheckSquare size={16} className="text-[#C62D36]" />
              : <Square size={16} />}
          </button>
          <div className="grid grid-cols-6 flex-1 gap-3 text-[#6B7280] text-xs font-semibold uppercase tracking-wide">
            <span className="col-span-2">Client / Véhicule</span>
            <span className="hidden sm:block">Prestation</span>
            <span className="hidden md:block">Date RDV</span>
            <span>Montant</span>
            <span>Statut</span>
          </div>
          <div className="w-16 text-[#6B7280] text-xs font-semibold uppercase tracking-wide">Actions</div>
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
          </div>
        ) : (
          <div className="divide-y divide-[#1E1E1E]">
            {filtered.map(b => {
              const isConfirmed = b.status === "confirmed";
              const isSelected  = selected.has(b.id);
              return (
                <div
                  key={b.id}
                  className={`flex items-center px-4 py-3.5 gap-3 hover:bg-[#1A1A1A] transition-colors ${isSelected ? "bg-[#C62D36]/5" : ""}`}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => isConfirmed && toggle(b.id)}
                    className={`shrink-0 transition-colors ${isConfirmed ? "text-[#6B7280] hover:text-[#C62D36]" : "text-[#2E2E2E] cursor-not-allowed"}`}
                  >
                    {isSelected ? <CheckSquare size={16} className="text-[#C62D36]" /> : <Square size={16} />}
                  </button>

                  {/* Info */}
                  <div className="grid grid-cols-6 flex-1 gap-3 items-center min-w-0">
                    <div className="col-span-2 min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{b.firstName} {b.lastName}</div>
                      <div className="text-[#6B7280] text-xs truncate">{b.brand} {b.model} · {b.finition}</div>
                      <div className="text-[#3B3B3B] text-[10px] font-mono">{b.id}</div>
                    </div>
                    <div className="hidden sm:block text-[#9CA3AF] text-xs truncate">{b.serviceLabel}</div>
                    <div className="hidden md:block text-[#9CA3AF] text-xs">
                      {formatDate(b.date)}<br/>
                      <span className="text-[#6B7280]">{b.startTime}–{b.endTime}</span>
                    </div>
                    <div className="text-white font-bold text-sm">{b.price}€</div>
                    <div><StatusBadge status={b.status} /></div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {isConfirmed && (
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
        )}
      </div>
    </div>
  );
}
