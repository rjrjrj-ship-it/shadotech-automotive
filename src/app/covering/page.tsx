import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette, Shield, RotateCcw, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Covering Voiture Luxembourg — Changement de couleur à Kayl",
  description:
    "Covering automobile professionnel au Luxembourg. Finitions mat, brillant, satiné, chromé. Tous coloris disponibles. Basé à Kayl — devis gratuit.",
  keywords: ["covering voiture Luxembourg", "wrapping auto Luxembourg", "changement couleur voiture Kayl", "film carrosserie Luxembourg"],
  alternates: { canonical: "https://shadotech.lu/covering" },
};

const finishes = [
  { name: "Mat", desc: "Aspect velours élégant, très tendance", popular: false },
  { name: "Brillant", desc: "Rendu similaire à la peinture neuve", popular: true },
  { name: "Satiné", desc: "Entre mat et brillant, effet premium", popular: false },
  { name: "Chrome", desc: "Reflet miroir spectaculaire", popular: false },
  { name: "Caméléon", desc: "Change de couleur selon l'angle", popular: false },
  { name: "Carbon", desc: "Texture fibre de carbone", popular: true },
];

const faqItems = [
  { q: "Le covering abîme-t-il la peinture ?", a: "Non, bien au contraire. Le film covering protège la peinture d'origine des rayures légères et des UV. À son retrait, la peinture est parfaitement préservée." },
  { q: "Combien de temps dure un covering ?", a: "Un covering professionnel dure entre 5 et 7 ans selon l'entretien et l'exposition aux UV. Un lavage régulier à la main prolonge sa durée de vie." },
  { q: "Peut-on faire un covering partiel ?", a: "Oui ! Nous réalisons des coverings partiels : toit, capot, pare-chocs, rétroviseurs, ou les éléments de votre choix." },
];

export default function CoveringPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Covering Automobile",
    provider: { "@type": "LocalBusiness", name: "Shadotech Automotive" },
    areaServed: { "@type": "Country", name: "Luxembourg" },
    description: "Covering et wrapping automobile professionnel au Luxembourg.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-32 pb-20 bg-gradient-to-b from-[#111111] to-[#1A1A1A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
              <li>/</li>
              <li className="text-[#C62D36]">Covering</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium rounded-full mb-4">
                Covering &amp; Wrapping
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Covering Auto<span className="block text-gradient">Luxembourg</span>
              </h1>
              <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
                Transformez l&apos;aspect de votre véhicule sans peinture. Des centaines de coloris,
                finitions mat, brillant, satiné, chrome et caméléon. Réversible, protecteur, 100% personnalisable.
              </p>
              <Link href="/contact" className="px-6 py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all inline-block">
                Demander un devis
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Palette size={20} className="text-purple-400" />, title: "Des centaines de coloris", desc: "Films 3M, Avery, Hexis" },
                { icon: <Shield size={20} className="text-[#C62D36]" />, title: "Peinture protégée", desc: "Préserve la valeur revente" },
                { icon: <RotateCcw size={20} className="text-[#C62D36]" />, title: "100% réversible", desc: "Retrait sans trace" },
                { icon: <Sparkles size={20} className="text-purple-400" />, title: "Effet showroom", desc: "Résultat professionnel" },
              ].map((item) => (
                <div key={item.title} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-4 hover:border-purple-500/40 transition-colors">
                  <div className="mb-2">{item.icon}</div>
                  <div className="text-white text-sm font-semibold mb-1">{item.title}</div>
                  <div className="text-[#6B7280] text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Finitions <span className="text-gradient">disponibles</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {finishes.map((f) => (
              <div key={f.name} className={`relative bg-[#1A1A1A] border rounded-2xl p-4 text-center ${f.popular ? "border-[#C62D36]/40" : "border-[#2E2E2E]"}`}>
                {f.popular && <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#C62D36] text-white text-[10px] rounded-full">Populaire</span>}
                <div className="text-white font-semibold mb-1">{f.name}</div>
                <div className="text-[#6B7280] text-xs">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">FAQ Covering</h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="group bg-[#111111] border border-[#2E2E2E] rounded-xl overflow-hidden">
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
            {[
              { href: "/vitres-teintees", label: "Vitres Teintées" },
              { href: "/ppf", label: "PPF" },
              { href: "/ciel-etoile", label: "Ciel Étoilé" },
              { href: "/lumiere-ambiance", label: "Lumière d'Ambiance" },
              { href: "/carplay", label: "CarPlay" },
            ].map((l) => (
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
