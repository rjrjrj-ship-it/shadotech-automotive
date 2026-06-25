import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Réalisations — Portfolio Shadotech Automotive Luxembourg",
  description:
    "Découvrez les réalisations de Shadotech Automotive : vitres teintées, covering, PPF, ciel étoilé et CarPlay sur des véhicules au Luxembourg.",
  alternates: { canonical: "https://shadotech.lu/realisations" },
};

const projects = [
  { title: "BMW X5 — Vitres Teintées", tag: "Vitres Teintées", location: "Luxembourg-Ville" },
  { title: "Tesla Model 3 — Covering Noir Mat", tag: "Covering", location: "Esch-sur-Alzette" },
  { title: "Porsche 911 — PPF Full Front", tag: "PPF", location: "Kayl" },
  { title: "Mercedes Classe V — Ciel Étoilé", tag: "Ciel Étoilé", location: "Dudelange" },
  { title: "Range Rover — Lumière Ambiance", tag: "Lumière d'Ambiance", location: "Bettembourg" },
  { title: "Audi A4 2017 — CarPlay", tag: "CarPlay", location: "Differdange" },
  { title: "VW Golf 8 — Vitres Teintées", tag: "Vitres Teintées", location: "Pétange" },
  { title: "BMW M4 — Covering Caméléon", tag: "Covering", location: "Luxembourg-Ville" },
  { title: "Lamborghini Urus — PPF Full Car", tag: "PPF", location: "Kayl" },
];

const tagColors: Record<string, string> = {
  "Vitres Teintées": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Covering": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "PPF": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Ciel Étoilé": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "Lumière d'Ambiance": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "CarPlay": "bg-gray-500/10 text-gray-300 border-gray-500/20",
};

export default function RealisationsPage() {
  return (
    <section className="pt-32 pb-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nos <span className="text-gradient">Réalisations</span>
          </h1>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            Un aperçu de nos dernières interventions au Luxembourg.
            Chaque projet est unique et réalisé avec le même soin.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl overflow-hidden hover:border-[#C62D36]/30 transition-colors"
            >
              {/* Placeholder for real photos */}
              <div className="aspect-video bg-gradient-to-br from-[#2E2E2E] to-[#1A1A1A] flex items-center justify-center">
                <span className="text-4xl opacity-40">🚗</span>
              </div>
              <div className="p-4">
                <span className={`inline-block px-2 py-0.5 text-xs rounded-full border mb-2 ${tagColors[p.tag] || "bg-[#C62D36]/10 text-[#C62D36] border-[#C62D36]/20"}`}>
                  {p.tag}
                </span>
                <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                <p className="text-[#6B7280] text-xs">{p.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#6B7280] mb-4">Retrouvez toutes nos réalisations sur Instagram</p>
          <a
            href="https://www.instagram.com/shadotechautomotive/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#2E2E2E] hover:border-[#C62D36] text-white rounded-full transition-all inline-flex items-center gap-2"
          >
            Voir sur Instagram
          </a>
        </div>

        <div className="mt-12 text-center">
          <Link href="/contact" className="px-8 py-3.5 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-full transition-all inline-block">
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </section>
  );
}
