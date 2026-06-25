import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lumière d'Ambiance Voiture Luxembourg — LED RGB intérieur Kayl",
  description:
    "Installation d'éclairage d'ambiance LED RGB dans votre voiture au Luxembourg. Contrôle smartphone, 16M couleurs, effets musicaux. Basé à Kayl.",
  keywords: ["lumière ambiance voiture Luxembourg", "éclairage LED intérieur voiture Luxembourg", "LED RGB voiture Kayl", "ambient light voiture Luxembourg"],
  alternates: { canonical: "https://shadotech.lu/lumiere-ambiance" },
};

export default function LumiereAmbiancePage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#111111] to-[#111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
            <li><Link href="/" className="hover:text-white">Accueil</Link></li>
            <li>/</li>
            <li className="text-[#C62D36]">Lumière d&apos;Ambiance</li>
          </ol>
        </nav>
        <span className="inline-block px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full mb-4">
          LED RGB · 16M couleurs
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Lumière d&apos;Ambiance<span className="block text-gradient">Luxembourg</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
          Personnalisez l&apos;intérieur de votre véhicule avec un éclairage d&apos;ambiance LED RGB sur mesure.
          Sous les sièges, dans les portières, sous le tableau de bord — des millions de couleurs à portée
          de téléphone. Installé par nos experts à <strong className="text-white">Kayl, Luxembourg</strong>.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: "🌈", title: "16M de couleurs", desc: "Ruban LED RGB adressable pour une personnalisation infinie." },
            { icon: "🎨", title: "Mode musical", desc: "Les LEDs réagissent au rythme de votre musique." },
            { icon: "📱", title: "App smartphone", desc: "Contrôle total depuis votre téléphone via Bluetooth." },
          ].map((f) => (
            <div key={f.title} className="bg-[#1A1A1A] border border-yellow-900/30 rounded-2xl p-5 hover:border-yellow-500/40 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-[#6B7280] text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/contact" className="px-6 py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all inline-block">
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
}
