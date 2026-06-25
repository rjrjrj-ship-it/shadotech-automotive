import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    slug: "vitres-teintees",
    icon: "🪟",
    title: "Vitres Teintées",
    description:
      "Films professionnels certifiés. Réduction UV, chaleur et éblouissement. Réservation en ligne avec tarif instantané.",
    highlight: "Réservation en ligne",
    color: "from-blue-900/20 to-blue-800/10",
    border: "border-blue-800/30 hover:border-blue-500/50",
  },
  {
    slug: "covering",
    icon: "🎨",
    title: "Covering",
    description:
      "Changez la couleur de votre véhicule sans peinture. Finitions mat, brillant, satiné, chrome. Des centaines de coloris.",
    highlight: "Changement de couleur",
    color: "from-purple-900/20 to-purple-800/10",
    border: "border-purple-800/30 hover:border-purple-500/50",
  },
  {
    slug: "ppf",
    icon: "🛡️",
    title: "PPF — Protection Peinture",
    description:
      "Film transparent ultra-résistant. Protection contre les gravillons, rayures, UV et produits chimiques. Auto-cicatrisant.",
    highlight: "Garanti 10 ans",
    color: "from-emerald-900/20 to-emerald-800/10",
    border: "border-emerald-800/30 hover:border-emerald-500/50",
  },
  {
    slug: "ciel-etoile",
    icon: "✨",
    title: "Ciel Étoilé",
    description:
      "Transformation de votre plafond avec des centaines de fibres optiques LED. Ambiance unique sur mesure.",
    highlight: "Sur mesure",
    color: "from-indigo-900/20 to-indigo-800/10",
    border: "border-indigo-800/30 hover:border-indigo-500/50",
  },
  {
    slug: "lumiere-ambiance",
    icon: "📱",
    title: "Lumière d'Ambiance",
    description:
      "Éclairage LED RGB intérieur personnalisé. Contrôle via application smartphone. Des millions de couleurs.",
    highlight: "RGB 16M couleurs",
    color: "from-yellow-900/20 to-yellow-800/10",
    border: "border-yellow-800/30 hover:border-yellow-500/50",
  },
  {
    slug: "carplay",
    icon: "📱",
    title: "Apple CarPlay",
    description:
      "Installation et intégration CarPlay/Android Auto sur tous véhicules. Navigation, musique, appels mains libres.",
    highlight: "Compatible tous véhicules",
    color: "from-gray-900/20 to-gray-800/10",
    border: "border-gray-700/30 hover:border-gray-400/50",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-24 bg-[#111111]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C62D36] text-sm font-semibold uppercase tracking-widest">
            Nos prestations
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Services <span className="text-gradient">premium</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Du film de protection à la personnalisation complète, chaque service est réalisé
            avec des matériaux certifiés et une finition irréprochable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className={`group relative bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]`}
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <div className="inline-block px-2 py-0.5 bg-[#C62D36]/10 border border-[#C62D36]/20 text-[#C62D36] text-xs font-medium rounded-full mb-3">
                {s.highlight}
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="flex items-center gap-2 text-[#C62D36] text-sm font-medium group-hover:gap-3 transition-all">
                En savoir plus
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
