import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Eye, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "PPF Paint Protection Film Luxembourg — Protection peinture à Kayl",
  description:
    "Film de protection peinture PPF au Luxembourg. Invisible, auto-cicatrisant, garanti 10 ans. XPEL, SunTek, 3M. Basé à Kayl — devis gratuit.",
  keywords: ["PPF Luxembourg", "paint protection film Luxembourg", "film protection peinture Kayl", "protection peinture voiture Luxembourg", "XPEL Luxembourg"],
  alternates: { canonical: "https://shadotech.lu/ppf" },
};

const features = [
  { icon: <Shield size={22} className="text-emerald-400" />, title: "Protection maximale", desc: "Résiste aux gravillons, impacts, rayures légères et produits chimiques." },
  { icon: <RefreshCw size={22} className="text-[#C62D36]" />, title: "Auto-cicatrisant", desc: "Les micro-rayures disparaissent d'elles-mêmes à la chaleur (soleil ou eau chaude)." },
  { icon: <Eye size={22} className="text-emerald-400" />, title: "Quasi invisible", desc: "Film ultra-transparent qui respecte la couleur et le brillant d'origine." },
  { icon: <Zap size={22} className="text-[#C62D36]" />, title: "Hydrophobe", desc: "La saleté, la pluie et les insectes glissent et se nettoient facilement." },
];

const coverageOptions = [
  { name: "Partiel Avant", desc: "Capot, ailes avant, pare-chocs, rétros", price: "À partir de 500€" },
  { name: "Complet Avant", desc: "+ montants A, phares, bas de caisse", price: "À partir de 900€" },
  { name: "Carrosserie 70%", desc: "Toutes les zones exposées aux impacts", price: "Sur devis" },
  { name: "Full Car", desc: "Protection intégrale de la carrosserie", price: "Sur devis" },
];

const faqItems = [
  { q: "Le PPF est-il vraiment invisible ?", a: "Oui. Les films PPF modernes sont ultra-transparents et ne modifient pas la couleur d'origine. Seul un —il très exercé peut détecter la présence du film." },
  { q: "Combien de temps dure un film PPF ?", a: "Les films PPF premium (XPEL, SunTek) sont garantis 10 ans contre le jaunissement, le décollement et les bulles." },
  { q: "Le PPF peut-il être posé sur un covering ?", a: "Oui, les deux se combinent très bien. Le PPF sur un covering préserve ce dernier tout en protégeant la carrosserie." },
  { q: "Quelle différence entre PPF et vernis céramique ?", a: "Le PPF est un film physique qui protège des impacts et rayures. Le vernis céramique est un traitement chimique qui facilite l'entretien. Les deux sont complémentaires." },
];

export default function PPFPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="pt-32 pb-20 bg-gradient-to-b from-[#111111] to-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li>/</li>
              <li className="text-[#C62D36]">PPF</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full mb-4">
              Paint Protection Film · Garanti 10 ans
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              PPF — Protection<span className="block text-gradient">Peinture Luxembourg</span>
            </h1>
            <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
              Le film de protection peinture PPF est la solution ultime pour préserver l&apos;état d&apos;origine de votre véhicule. Invisible, auto-cicatrisant, garanti 10 ans. Nous utilisons les meilleures marques : <strong className="text-white">XPEL, SunTek, 3M</strong>.
            </p>
            <Link href="/contact" className="px-6 py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all inline-block">
              Obtenir un devis PPF
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((f) => (
              <div key={f.title} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 bg-[#111111] rounded-xl flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-white mb-8 text-center">Options de <span className="text-gradient">couverture</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coverageOptions.map((o) => (
              <div key={o.name} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-5 hover:border-emerald-500/40 transition-colors">
                <div className="text-white font-bold mb-2">{o.name}</div>
                <div className="text-[#6B7280] text-sm mb-3">{o.desc}</div>
                <div className="text-emerald-400 font-semibold text-sm">{o.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">FAQ PPF Luxembourg</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="group bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl overflow-hidden">
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

      <section className="py-12 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[{ href: "/vitres-teintees", label: "Vitres Teintées" }, { href: "/covering", label: "Covering" }, { href: "/ciel-etoile", label: "Ciel Étoilé" }, { href: "/lumiere-ambiance", label: "Lumière d'Ambiance" }, { href: "/carplay", label: "CarPlay" }].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center justify-between p-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-[#9CA3AF] hover:text-white hover:border-[#C62D36]/40 transition-all text-sm">
                {l.label}<ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
