import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Sun, Eye, Thermometer, CheckCircle, ArrowRight } from "lucide-react";
import { VehicleBookingWizard } from "@/components/booking/VehicleBookingWizard";

export const metadata: Metadata = {
  title: "Vitres Teintées Luxembourg — Pose professionnelle à Kayl",
  description:
    "Pose de vitres teintées homologuées au Luxembourg. Films SUNTEK professionnels — 7 teintes disponibles de 3% à 70% VLT. Citadine, berline, SUV, utilitaire. Réservation en ligne avec tarif instantané. Basé à Kayl.",
  keywords: [
    "vitres teintées Luxembourg",
    "film teinté SUNTEK Luxembourg",
    "pose vitres teintées Kayl",
    "teinte vitres homologuée Luxembourg",
    "prix vitres teintées Luxembourg",
    "SUNTEK film voiture Luxembourg",
  ],
  alternates: { canonical: "https://shadotech.lu/vitres-teintees" },
  openGraph: {
    title: "Vitres Teintées Luxembourg — Shadotech Automotive",
    description:
      "Films professionnels certifiés. Tarif calculé en ligne, réservation en 2 minutes. Basé à Kayl, Luxembourg.",
    url: "https://shadotech.lu/vitres-teintees",
  },
};

const benefits = [
  {
    icon: <Shield size={22} className="text-[#C62D36]" />,
    title: "Protection UV 99%",
    desc: "Bloque jusqu'à 99% des rayons UV nocifs pour vous et vos passagers.",
  },
  {
    icon: <Thermometer size={22} className="text-[#C62D36]" />,
    title: "Réduction thermique",
    desc: "Jusqu'à 60% de chaleur en moins dans l'habitacle. Climatisation plus efficace.",
  },
  {
    icon: <Eye size={22} className="text-[#C62D36]" />,
    title: "Anti-éblouissement",
    desc: "Conduite plus sécurisée grâce à la réduction de l'éblouissement solaire.",
  },
  {
    icon: <Sun size={22} className="text-[#C62D36]" />,
    title: "Confidentialité",
    desc: "Protégez vos objets et passagers des regards indiscrets.",
  },
];

const faqItems = [
  {
    q: "Quelle teinte SUNTEK choisir pour rester légal au Luxembourg ?",
    a: "Le SUNTEK 70% VLT est le seul film légal sur toutes les vitres, y compris le pare-brise et les vitres avant. Pour les vitres arrières (latérales arrières et lunette), les teintes 50%, 35%, 30%, 20%, 15% et 3% sont utilisables. Nous vous guidons selon votre usage lors de la prise de RDV.",
  },
  {
    q: "Quelle est la qualité des films SUNTEK HP ?",
    a: "La gamme SUNTEK HP (High Performance) est une gamme professionnelle conçue pour une durabilité maximale. Elle bloque 99% des UV, offre une bonne réduction thermique et résiste au décollement et aux bulles. C'est la gamme que nous utilisons sur toutes nos teintes, de 3% à 70% VLT.",
  },
  {
    q: "Combien de temps dure la pose ?",
    a: "Entre 2h et 4h selon le nombre de vitres et le type de véhicule. La plupart des poses sont réalisées le jour même.",
  },
  {
    q: "Le film SUNTEK est-il garanti ?",
    a: "Oui. Tous nos films SUNTEK HP sont garantis 5 ans contre le décollement, les bulles et la décoloration. Garantie fabricant incluse.",
  },
  {
    q: "Dois-je laisser ma voiture plusieurs jours ?",
    a: "Non ! Votre véhicule vous est rendu le jour même. Il est conseillé d'attendre 3 jours avant de baisser les vitres pour le séchage optimal du film SUNTEK HP.",
  },
  {
    q: "Proposez-vous le film PPF en même temps ?",
    a: "Oui, nous pouvons combiner vitres teintées SUNTEK et PPF lors d'un même rendez-vous. Demandez un devis combiné via notre formulaire.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Vitres Teintées",
  provider: {
    "@type": "LocalBusiness",
    name: "Shadotech Automotive",
    address: { "@type": "PostalAddress", streetAddress: "53 Rue de Noertzange", postalCode: "3670", addressLocality: "Kayl", addressCountry: "LU" },
  },
  areaServed: { "@type": "Country", name: "Luxembourg" },
  description:
    "Pose de film teinté professionnel SUNTEK sur vitres automobiles. 7 teintes disponibles de 3% à 70% VLT.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "70",
    highPrice: "700",
    offerCount: "6",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://shadotech.lu" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Vitres Teintées",
      item: "https://shadotech.lu/vitres-teintees",
    },
  ],
};

export default function VitresTeintees() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#111111] via-[#111] to-[#111111] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C62D36]/8 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'ariane" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li className="text-[#2E2E2E]">/</li>
              <li className="text-[#C62D36]">Vitres Teintées</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#C62D36]/10 border border-[#C62D36]/20 text-[#C62D36] text-xs font-medium rounded-full mb-4">
                Service premium · Films certifiés
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Vitres Teintées
                <span className="block text-gradient">Luxembourg</span>
              </h1>
              <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
                Pose professionnelle de film teinté{" "}
                <strong className="text-white">SUNTEK</strong> sur tous types de véhicules à{" "}
                <strong className="text-white">Kayl, Luxembourg</strong>. 7 teintes disponibles de
                3% à 70% VLT, garantis 5 ans. Tarif calculé en temps réel.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#reservation"
                  className="px-6 py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(230,57,70,0.4)]"
                >
                  Réserver maintenant
                </a>
                <a
                  href="#avantages"
                  className="px-6 py-3 border border-[#2E2E2E] hover:border-[#C62D36] text-white rounded-full transition-all"
                >
                  Découvrir les avantages
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "99%", label: "Filtration UV" },
                { value: "60%", label: "Réduction chaleur" },
                { value: "5 ans", label: "Garantie film" },
                { value: "1 jour", label: "Délai pose" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-5 text-center hover:border-[#C62D36]/40 transition-colors"
                >
                  <div className="text-3xl font-bold text-gradient mb-1">{s.value}</div>
                  <div className="text-[#6B7280] text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#111111]" id="avantages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Pourquoi teinter{" "}
              <span className="text-gradient">vos vitres ?</span>
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">
              Au-delà de l&apos;esthétique, le film teinté offre de réels avantages pour votre confort
              et la protection de votre véhicule.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-6 hover:border-[#C62D36]/30 transition-colors"
              >
                <div className="w-10 h-10 bg-[#111111] rounded-xl flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{b.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Ce qui est <span className="text-gradient">inclus</span>
              </h2>
              <ul className="space-y-3">
                {[
                  "Préparation et dégraissage des vitres",
                  "Pose du film par un poseur certifié",
                  "Découpe sur mesure par ordinateur (Plotter)",
                  "Contrôle qualité avant restitution",
                  "Notice d'entretien et conseils de séchage",
                  "Garantie fabricant SUNTEK HP 5 ans",
                  "Certificat de conformité fourni",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#9CA3AF]">
                    <CheckCircle size={18} className="text-[#C62D36] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Film comparison — 2 gammes */}
            <div className="space-y-3">
              {/* HP */}
              <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#2E2E2E] flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold">SunTek® HP — High Performance</span>
                    <p className="text-[#6B7280] text-xs mt-0.5">Film hybride métallisé · Aspect réfléchissant · Garantie 5 ans</p>
                  </div>
                  <span className="text-[#9CA3AF] text-xs font-medium bg-[#2A2A2A] px-2 py-1 rounded-lg">7 teintes</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2E2E2E]">
                      <th className="text-left p-3 text-[#6B7280] text-xs">Teinte</th>
                      <th className="text-center p-3 text-[#6B7280] text-xs">VLT</th>
                      <th className="text-center p-3 text-[#6B7280] text-xs">Légal LU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { pct: 70, legal: "all",       legalLabel: "✓ Toutes vitres" },
                      { pct: 50, legal: "rear",      legalLabel: "Arr. recommandé" },
                      { pct: 35, legal: "rear",      legalLabel: "Arr. recommandé" },
                      { pct: 30, legal: "rear-only", legalLabel: "Arr. uniquement" },
                      { pct: 20, legal: "rear-only", legalLabel: "Arr. uniquement" },
                      { pct: 15, legal: "rear-only", legalLabel: "Arr. uniquement" },
                      { pct:  3, legal: "rear-only", legalLabel: "Arr. uniquement" },
                    ].map((f) => (
                      <tr key={f.pct} className="border-b border-[#2E2E2E] last:border-0">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded border border-white/10 shrink-0" style={{ background: `rgba(0,0,0,${1 - f.pct / 100})` }} />
                            <span className="text-white text-sm font-medium">{f.pct}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center text-[#9CA3AF] text-sm">{f.pct}% VLT</td>
                        <td className="p-3 text-center">
                          <span className={`text-xs ${f.legal === "all" ? "text-green-400 font-medium" : f.legal === "rear" ? "text-amber-400" : "text-orange-400"}`}>{f.legalLabel}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Evolve */}
              <div className="bg-[#1A1A1A] border border-[#C62D36]/30 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#C62D36]/20 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">SunTek® Evolve — Céramique</span>
                      <span className="text-[10px] bg-[#C62D36] text-white px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">Premium</span>
                    </div>
                    <p className="text-[#6B7280] text-xs mt-0.5">Nano-céramique · Protection thermique & UV maximale · Sans interférence radio</p>
                  </div>
                  <span className="text-[#C62D36] text-xs font-medium bg-[#C62D36]/10 px-2 py-1 rounded-lg">7 teintes</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2E2E2E]">
                      <th className="text-left p-3 text-[#6B7280] text-xs">Teinte</th>
                      <th className="text-center p-3 text-[#6B7280] text-xs">VLT</th>
                      <th className="text-center p-3 text-[#6B7280] text-xs">Légal LU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { pct: 70, legal: "all",       legalLabel: "✓ Toutes vitres" },
                      { pct: 50, legal: "rear",      legalLabel: "Arr. recommandé" },
                      { pct: 35, legal: "rear",      legalLabel: "Arr. recommandé" },
                      { pct: 30, legal: "rear-only", legalLabel: "Arr. uniquement" },
                      { pct: 20, legal: "rear-only", legalLabel: "Arr. uniquement" },
                      { pct: 15, legal: "rear-only", legalLabel: "Arr. uniquement" },
                      { pct:  3, legal: "rear-only", legalLabel: "Arr. uniquement" },
                    ].map((f) => (
                      <tr key={f.pct} className="border-b border-[#2E2E2E] last:border-0">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded border border-white/10 shrink-0" style={{ background: `rgba(0,0,0,${1 - f.pct / 100})` }} />
                            <span className="text-white text-sm font-medium">{f.pct}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center text-[#9CA3AF] text-sm">{f.pct}% VLT</td>
                        <td className="p-3 text-center">
                          <span className={`text-xs ${f.legal === "all" ? "text-green-400 font-medium" : f.legal === "rear" ? "text-amber-400" : "text-orange-400"}`}>{f.legalLabel}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[#6B7280] text-xs text-center">
                VLT = Visible Light Transmission · Réglementation : Règlement grand-ducal du 23 novembre 1955 modifié
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-24 bg-[#111111]" id="reservation">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#C62D36] text-sm font-semibold uppercase tracking-widest">
              Réservation en ligne
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Calculez votre tarif &amp;{" "}
              <span className="text-gradient">réservez en 2 min</span>
            </h2>
            <p className="text-[#6B7280]">
              Sélectionnez votre véhicule et le film souhaité pour obtenir un tarif instantané.
            </p>
          </div>
          <VehicleBookingWizard />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            FAQ — Vitres Teintées{" "}
            <span className="text-gradient">Luxembourg</span>
          </h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer text-white font-medium list-none hover:text-[#C62D36] transition-colors">
                  {item.q}
                  <span className="text-[#C62D36] text-xl group-open:rotate-45 transition-transform shrink-0 ml-3">+</span>
                </summary>
                <p className="px-5 pb-5 text-[#6B7280] text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white mb-6">Nos autres services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { href: "/covering", label: "Covering" },
              { href: "/ppf", label: "PPF" },
              { href: "/ciel-etoile", label: "Ciel Étoilé" },
              { href: "/lumiere-ambiance", label: "Lumière d'Ambiance" },
              { href: "/carplay", label: "CarPlay" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-between p-3 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-[#9CA3AF] hover:text-white hover:border-[#C62D36]/40 transition-all text-sm"
              >
                {l.label}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
