"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#111111]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/icon-color.svg"
              alt="Shadotech Automotive"
              width={36}
              height={36}
              className="group-hover:scale-110 transition-transform"
              priority
            />
            <Image
              src="/logo-white.svg"
              alt="Shadotech Automotive"
              width={160}
              height={160}
              className="hidden sm:block h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="text-sm text-[#A0A0A0] hover:text-white transition-colors duration-200 relative group"
              >
                {s.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C62D36] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/realisations"
              className="text-sm text-[#A0A0A0] hover:text-white transition-colors"
            >
              Réalisations
            </Link>
            <Link
              href="/a-propos"
              className="text-sm text-[#A0A0A0] hover:text-white transition-colors"
            >
              À propos
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${COMPANY.phone}`}
              className="flex items-center gap-2 text-sm text-[#A0A0A0] hover:text-white transition-colors"
            >
              <Phone size={14} />
              <span>{COMPANY.phone}</span>
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 bg-[#C62D36] hover:bg-[#a82530] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(198,45,54,0.4)]"
            >
              Prendre RDV
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#111111] border-t border-[#2E2E2E] px-4 py-6 flex flex-col gap-4">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="text-[#A0A0A0] hover:text-white py-2 border-b border-[#2E2E2E]"
              onClick={() => setOpen(false)}
            >
              {s.icon} {s.label}
            </Link>
          ))}
          <Link href="/realisations" className="text-[#A0A0A0] hover:text-white py-2 border-b border-[#2E2E2E]" onClick={() => setOpen(false)}>Réalisations</Link>
          <Link href="/a-propos" className="text-[#A0A0A0] hover:text-white py-2 border-b border-[#2E2E2E]" onClick={() => setOpen(false)}>À propos</Link>
          <Link href="/contact" className="text-[#A0A0A0] hover:text-white py-2 border-b border-[#2E2E2E]" onClick={() => setOpen(false)}>Contact</Link>
          <Link
            href="/contact"
            className="mt-2 py-3 bg-[#C62D36] text-white font-semibold rounded-full text-center"
            onClick={() => setOpen(false)}
          >
            Prendre RDV
          </Link>
        </div>
      )}
    </header>
  );
}
