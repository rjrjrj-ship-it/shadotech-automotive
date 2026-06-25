import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, Music, Navigation, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Installation CarPlay Luxembourg — Apple CarPlay & Android Auto Kayl",
  description:
    "Installation Apple CarPlay et Android Auto sur tous véhicules au Luxembourg. Navigation, musique, appels mains libres. Basé à Kayl — garanti compatible.",
  keywords: ["CarPlay Luxembourg", "installation Apple CarPlay Luxembourg", "Android Auto Luxembourg", "CarPlay Kayl", "autoradio CarPlay Luxembourg"],
  alternates: { canonical: "https://shadotech.lu/carplay" },
};

const compatibleBrands = [
  "Audi", "BMW", "Mercedes", "Volkswagen", "Seat", "Skoda",
  "Peugeot", "Renault", "Citroën", "Ford", "Toyota", "Honda",
  "Hyundai", "Kia", "Volvo", "Porsche", "Land Rover", "Jaguar",
];

export default function CarplayPage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-[#111111] to-[#111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[#6B7280]">
            <li><Link href="/" className="hover:text-white">Accueil</Link></li>
            <li>/</li>
            <li className="text-[#C62D36]">CarPlay</li>
          </ol>
        </nav>
        <span className="inline-block px-3 py-1 bg-gray-500/10 border border-gray-500/20 text-gray-300 text-xs font-medium rounded-full mb-4">
          Apple CarPlay · Android Auto
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Installation CarPlay<span className="block text-gradient">Luxembourg</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
          Nous intégrons Apple CarPlay et Android Auto sur votre véhicule, même si celui-ci n&apos;en est
          pas équipé d&apos;origine. Navigation, musique, appels mains libres — l&apos;intégration est native,
          comme si c&apos;était d&apos;usine. Basé à <strong className="text-white">Kayl, Luxembourg</strong>.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            { icon: <Navigation size={22} className="text-[#C62D36]" />, title: "Navigation intégrée", desc: "Google Maps, Waze, Apple Maps sur votre écran d'origine." },
            { icon: <Music size={22} className="text-[#C62D36]" />, title: "Musique & streaming", desc: "Spotify, Apple Music, YouTube Music sans téléphone visible." },
            { icon: <Phone size={22} className="text-[#C62D36]" />, title: "Appels mains libres", desc: "Contacts et appels sur l'écran, voix au volant." },
            { icon: <Smartphone size={22} className="text-[#C62D36]" />, title: "Intégration native", desc: "Rendu d'origine, aucune modification visible de l'extérieur." },
          ].map((f) => (
            <div key={f.title} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-5 hover:border-gray-500/40 transition-colors flex gap-4">
              <div className="w-10 h-10 bg-[#111111] rounded-xl flex items-center justify-center shrink-0">{f.icon}</div>
              <div>
                <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                <p className="text-[#6B7280] text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-5">Marques <span className="text-gradient">compatibles</span></h2>
          <div className="flex flex-wrap gap-2">
            {compatibleBrands.map((b) => (
              <span key={b} className="px-3 py-1 bg-[#1A1A1A] border border-[#2E2E2E] text-[#9CA3AF] rounded-full text-sm hover:border-[#C62D36]/40 transition-colors">
                {b}
              </span>
            ))}
          </div>
          <p className="text-[#6B7280] text-sm mt-3">Compatible avec la plupart des véhicules. Contactez-nous pour vérifier la compatibilité du vôtre.</p>
        </div>

        <div className="text-center">
          <Link href="/contact" className="px-6 py-3 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all inline-block">
            Vérifier la compatibilité de mon véhicule
          </Link>
        </div>
      </div>
    </section>
  );
}
