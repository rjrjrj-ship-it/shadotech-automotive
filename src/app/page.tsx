import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Shield, Award, Zap } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shadotech Automotive — Vitres Teintées, Covering & PPF Luxembourg",
  description:
    "Shadotech Automotive à Kayl, Luxembourg : vitres teintées homologuées, covering film carrosserie, PPF protection peinture, ciel étoilé LED, lumière d'ambiance RGB et installation CarPlay. Devis gratuit.",
  alternates: { canonical: "https://shadotech.lu" },
};

const whyUs = [
  {
    icon: <Shield className="text-[#C62D36]" size={24} />,
    title: "Matériaux certifiés",
    desc: "Films haut de gamme des marques leaders : 3M, LLumar, XPEL, Hexis.",
  },
  {
    icon: <Award className="text-[#C62D36]" size={24} />,
    title: "Garantie fabricant",
    desc: "Garantie allant jusqu'à 10 ans selon le produit choisi.",
  },
  {
    icon: <Zap className="text-[#C62D36]" size={24} />,
    title: "Pose rapide & soignée",
    desc: "Interventions réalisées en une journée, sans compromettre la qualité.",
  },
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Les vitres teintées sont-elles légales au Luxembourg ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Au Luxembourg, le film homologué 70% VLT est légal sur toutes les vitres. Les films plus sombres sont autorisés uniquement sur les vitres arrières.",
        },
      },
      {
        "@type": "Question",
        name: "Combien de temps dure la pose de vitres teintées ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "2 à 4 heures selon le nombre de vitres et le type de véhicule.",
        },
      },
      {
        "@type": "Question",
        name: "Intervenez-vous partout au Luxembourg ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notre atelier est à Kayl. Nous intervenons sur tout le pays. Contactez-nous pour les interventions à domicile.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <HeroSection />
      <ServicesGrid />

      {/* Why us */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#C62D36] text-sm font-semibold uppercase tracking-widest">
                Pourquoi nous choisir
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-6">
                L&apos;excellence{" "}
                <span className="text-gradient">au service</span> de votre véhicule
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
                Shadotech Automotive, c&apos;est une équipe passionnée basée à{" "}
                <strong className="text-white">Kayl, Luxembourg</strong>, engagée à livrer
                un résultat premium sur chaque véhicule.
              </p>
              <div className="space-y-6">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/a-propos"
                className="mt-8 inline-flex items-center gap-2 text-[#C62D36] font-semibold hover:gap-3 transition-all"
              >
                En savoir plus sur Shadotech <ArrowRight size={18} />
              </Link>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#2E2E2E] aspect-square max-w-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2589.4!2d6.036!3d49.492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s53+Rue+de+Noertzange%2C+3670+Kayl%2C+Luxembourg!5e0!3m2!1sfr!2slu"
                className="w-full h-full"
                style={{ filter: "invert(90%) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shadotech Automotive — Kayl, Luxembourg"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/90 backdrop-blur rounded-xl p-3 border border-[#2E2E2E]">
                <div className="flex items-center gap-2 text-white text-sm font-medium mb-1">
                  <MapPin size={14} className="text-[#C62D36]" />
                  {COMPANY.address}
                </div>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-2 text-[#6B7280] text-xs hover:text-white transition-colors"
                >
                  <Phone size={12} />
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* FAQ */}
      <section className="py-24 bg-[#111111]" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Questions <span className="text-gradient">fréquentes</span>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Les vitres teintées sont-elles légales au Luxembourg ?",
                a: "Au Luxembourg, le film homologué 70% VLT est légal sur toutes les vitres. Les films plus sombres sont autorisés uniquement sur les vitres arrières.",
              },
              {
                q: "Combien de temps dure la pose de vitres teintées ?",
                a: "2 à 4 heures selon le nombre de vitres et le type de véhicule. Généralement réalisé en une journée.",
              },
              {
                q: "Intervenez-vous partout au Luxembourg ?",
                a: "Notre atelier est à Kayl. Nous intervenons sur tout le pays. Contactez-nous pour les interventions à domicile.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer text-white font-medium list-none hover:text-[#C62D36] transition-colors">
                  {item.q}
                  <span className="text-[#C62D36] text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-5 pb-5 text-[#6B7280] text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-[#1a1111] via-[#1a1111] to-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(230,57,70,0.15)_0%,_transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Prêt à transformer{" "}
            <span className="text-gradient">votre véhicule</span> ?
          </h2>
          <p className="text-[#9CA3AF] text-lg mb-10">
            Réservez en ligne en 2 minutes. Devis gratuit, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-4 bg-[#C62D36] hover:bg-[#a82530] text-white font-bold rounded-full text-lg transition-all hover:shadow-[0_0_40px_rgba(230,57,70,0.5)]"
            >
              Réserver maintenant
            </Link>
            <a
              href={`tel:${COMPANY.phone}`}
              className="px-10 py-4 border border-[#C62D36]/50 text-white font-bold rounded-full text-lg hover:border-[#C62D36] transition-all"
            >
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
