import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ciel Étoilé Voiture Luxembourg — Plafond LED fibre optique Kayl",
  description:
    "Installation de ciel étoilé en fibre optique LED dans votre voiture au Luxembourg. Sur mesure, télécommande RGB, effet galaxie. Basé à Kayl.",
  keywords: ["ciel étoilé voiture Luxembourg", "plafond fibre optique LED voiture", "starlight headliner Luxembourg", "ciel étoilé Kayl"],
  alternates: { canonical: "https://shadotech.lu/ciel-etoile" },
};

export default function CielEtolePage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#050510] to-[#111111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
            <li><Link href="/" className="hover:text-white">Accueil</Link></li>
            <li>/</li>
            <li className="text-[#C62D36]">Ciel Étoilé</li>
          </ol>
        </nav>
        <span className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium rounded-full mb-4">
          Fibre Optique LED · Sur mesure
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ciel Étoilé<span className="block text-gradient">Luxembourg</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
          Transformez le plafond de votre véhicule en un véritable ciel étoilé. Des centaines de fibres
          optiques LED créent un effet galaxie somptueux, contrôlable via télécommande ou application.
          Réalisé entièrement <strong className="text-white">sur mesure à Kayl, Luxembourg</strong>.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: "⭐", title: "Effet galaxie réaliste", desc: "Centaines de fibres optiques pour un rendu exceptionnel." },
            { icon: "🎨", title: "RGB 16 millions de couleurs", desc: "Changez la couleur des étoiles à volonté." },
            { icon: "📱", title: "Contrôle smartphone", desc: "Application dédiée pour personnaliser les effets." },
            { icon: "📱", title: "Pose sur mesure", desc: "Adaptation à tous types de véhicules." },
          ].map((f) => (
            <div key={f.title} className="bg-[#1A1A1A] border border-indigo-900/40 rounded-2xl p-5 hover:border-indigo-500/40 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-[#6B7280] text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-900/20 to-[#1A1A1A] border border-indigo-800/30 rounded-2xl p-8 text-center mb-8">
          <p className="text-[#9CA3AF] mb-4">Chaque installation est unique et réalisée entièrement à la main.</p>
          <Link href="/contact" className="px-6 py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all inline-block">
            Demander un devis ciel étoilé
          </Link>
        </div>
      </div>
    </section>
  );
}
