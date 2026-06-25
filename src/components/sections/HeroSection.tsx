"use client";

import Link from "next/link";
import { ArrowRight, Star, Shield, Award } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll("[data-count]");
            counters.forEach((el) => {
              const target = parseInt(el.getAttribute("data-count") || "0");
              let current = 0;
              const step = target / 60;
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                el.textContent = Math.floor(current) + "+";
              }, 16);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a1111] to-[#111111]" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C62D36]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C62D36]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#C62D36 1px, transparent 1px), linear-gradient(90deg, #C62D36 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C62D36]/30 bg-[#C62D36]/10 text-[#C62D36] text-sm font-medium mb-8">
          <Star size={14} fill="#C62D36" />
          <span>Spécialiste #1 Customisation Auto au Luxembourg</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-none">
          <span className="block text-white">Transformez</span>
          <span className="block text-gradient">votre véhicule</span>
          <span className="block text-white">comme jamais</span>
        </h1>

        <p className="text-[#9CA3AF] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Vitres teintées, covering, PPF, ciel étoilé et CarPlay.
          Basé à <strong className="text-white">Kayl, Luxembourg</strong> — intervention sur tout le pays.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-8 py-4 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,57,70,0.5)] text-lg"
          >
            Prendre rendez-vous
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/realisations"
            className="flex items-center gap-2 px-8 py-4 border border-[#2E2E2E] hover:border-[#C62D36] text-white font-semibold rounded-full transition-all duration-300 text-lg"
          >
            Voir nos réalisations
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
          {[
            { icon: <Shield size={16} />, label: "Films certifiés" },
            { icon: <Award size={16} />, label: "Garantie 5 ans" },
            { icon: <Star size={16} fill="currentColor" />, label: "4.9/5 avis clients" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-[#9CA3AF] text-sm">
              <span className="text-[#C62D36]">{b.icon}</span>
              {b.label}
            </div>
          ))}
        </div>

        {/* Stats counter */}
        <div
          ref={counterRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { count: 5000, label: "Véhicules traités" },
            { count: 15, label: "Ans d'expérience" },
            { count: 6, label: "Services premium" },
            { count: 98, label: "% satisfaction" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-4 hover:border-[#C62D36]/50 transition-colors"
            >
              <div
                data-count={stat.count}
                className="text-3xl font-bold text-gradient mb-1"
                suppressHydrationWarning
              >
                0+
              </div>
              <div className="text-[#6B7280] text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B7280] text-xs">
        <span>Défiler</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-[#C62D36] to-transparent" />
      </div>
    </section>
  );
}
