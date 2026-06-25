import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Shield, Award } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "À propos — Shadotech Automotive Kayl Luxembourg",
  description:
    "Découvrez Shadotech Automotive, spécialiste de la customisation automobile basé à Kayl, Luxembourg. Notre histoire, notre équipe et notre zone d'intervention.",
  alternates: { canonical: "https://shadotech.lu/a-propos" },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de Shadotech Automotive",
    url: "https://shadotech.lu/a-propos",
    mainEntity: {
      "@type": "LocalBusiness",
      name: COMPANY.name,
      foundingDate: "2016",
      address: { "@type": "PostalAddress", streetAddress: "53 Rue de Noertzange", postalCode: "3670", addressLocality: "Kayl", addressCountry: "LU" },
      areaServed: { "@type": "Country", name: "Luxembourg" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-32 pb-20 bg-gradient-to-b from-[#111111] to-[#111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li>/</li>
              <li className="text-[#C62D36]">À propos</li>
            </ol>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            À propos de{" "}
            <span className="text-gradient">Shadotech Automotive</span>
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-[#9CA3AF] text-lg leading-relaxed mb-6">
              Fondée à <strong className="text-white">Kayl, Luxembourg</strong>, Shadotech Automotive
              est née d&apos;une passion commune pour l&apos;automobile et le soin apporté aux détails.
              Depuis notre création, nous nous sommes spécialisés dans la customisation et la protection
              automobile premium, avec un atelier dédié au c—ur du Luxembourg.
            </p>
            <p className="text-[#9CA3AF] text-lg leading-relaxed mb-10">
              Notre équipe de poseurs certifiés maîtrise les techniques les plus avancées : du film de
              protection peinture (PPF) à la pose de vitres teintées homologuées, en passant par le
              covering carrosserie, le ciel étoilé en fibre optique et l&apos;intégration CarPlay.
              Chaque intervention est réalisée avec des matériaux de première qualité et une exigence
              absolue de finition.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                { icon: <Shield className="text-[#C62D36]" size={24} />, title: "Certifiés", desc: "Poseurs formés et certifiés par les fabricants 3M, XPEL, LLumar." },
                { icon: <Award className="text-[#C62D36]" size={24} />, title: "+8 ans d'expérience", desc: "Des centaines de véhicules traités depuis notre création." },
                { icon: <MapPin className="text-[#C62D36]" size={24} />, title: "Tout le Luxembourg", desc: "Atelier à Kayl, interventions partout au Grand-Duché." },
              ].map((item) => (
                <div key={item.title} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-5">
                  <div className="mb-3">{item.icon}</div>
                  <div className="text-white font-semibold mb-1">{item.title}</div>
                  <div className="text-[#6B7280] text-sm">{item.desc}</div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Zone d&apos;intervention</h2>
            <p className="text-[#9CA3AF] leading-relaxed mb-4">
              Notre atelier est situé à <strong className="text-white">Kayl</strong>, dans le canton
              d&apos;Esch-sur-Alzette. Nous intervenons sur l&apos;ensemble du Grand-Duché de Luxembourg,
              notamment à Luxembourg-Ville, Esch-sur-Alzette, Differdange, Dudelange, Bettembourg,
              Pétange et leurs environs.
            </p>
            <p className="text-[#9CA3AF] leading-relaxed mb-8">
              Des interventions transfrontalières sont également possibles. Contactez-nous pour en discuter.
            </p>

            <div className="text-center">
              <Link href="/contact" className="px-8 py-3.5 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all inline-block">
                Prendre contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
