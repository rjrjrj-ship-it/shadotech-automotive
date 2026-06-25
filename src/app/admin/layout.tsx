"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, FileText, LogOut, Menu, X } from "lucide-react";

const NAV = [
  { href: "/admin/calendrier", label: "Calendrier",  icon: CalendarDays },
  { href: "/admin/factures",   label: "Factures",    icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-[#111111] border-r border-[#2E2E2E] h-screen sticky top-0">
        <div className="px-5 py-6 border-b border-[#2E2E2E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C62D36] flex items-center justify-center text-white font-bold text-sm">S</div>
            <div>
              <div className="text-white text-sm font-bold leading-tight">Shadotech</div>
              <div className="text-[#6B7280] text-xs">Panel Admin</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === href
                  ? "bg-[#C62D36]/15 text-[#C62D36] border border-[#C62D36]/25"
                  : "text-[#6B7280] hover:text-white hover:bg-[#1A1A1A]"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#2E2E2E]">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={17} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#111111] border-b border-[#2E2E2E] flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C62D36] flex items-center justify-center text-white font-bold text-xs">S</div>
          <span className="text-white font-bold text-sm">Panel Admin</span>
        </div>
        <button onClick={() => setOpen(o => !o)} className="text-[#9CA3AF] hover:text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)}>
          <aside className="w-56 bg-[#111111] border-r border-[#2E2E2E] h-full pt-16" onClick={e => e.stopPropagation()}>
            <nav className="px-3 py-4 space-y-1">
              {NAV.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === href ? "bg-[#C62D36]/15 text-[#C62D36]" : "text-[#6B7280] hover:text-white hover:bg-[#1A1A1A]"
                  }`}
                >
                  <Icon size={17} />{label}
                </Link>
              ))}
            </nav>
            <div className="px-3 border-t border-[#2E2E2E] pt-4">
              <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#6B7280] hover:text-red-400 w-full">
                <LogOut size={17} />Déconnexion
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0 lg:p-8 p-4 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
}
