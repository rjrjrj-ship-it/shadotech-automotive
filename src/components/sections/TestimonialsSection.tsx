import { Star } from "lucide-react";

const reviews = [
  {
    name: "Marc Hoffmann",
    location: "Luxembourg-Ville",
    rating: 5,
    date: "2024-11-15",
    text: "Vitres teintées sur mon BMW X5 — résultat impeccable. Équipe pro, délai respecté. Je recommande vivement !",
    service: "Vitres Teintées",
  },
  {
    name: "Sophie Klein",
    location: "Esch-sur-Alzette",
    rating: 5,
    date: "2024-10-28",
    text: "Covering complet sur ma Tesla Model 3 en mat noir. La qualité de pose est exceptionnelle, impossible de voir les raccords.",
    service: "Covering",
  },
  {
    name: "Thomas Schmit",
    location: "Dudelange",
    rating: 5,
    date: "2024-12-02",
    text: "PPF sur l'avant de ma Porsche. Travail soigné, prise en charge sérieuse. Le film est quasi invisible. Excellent rapport qualité/prix.",
    service: "PPF",
  },
  {
    name: "Laura Weber",
    location: "Kayl",
    rating: 5,
    date: "2024-09-18",
    text: "Ciel étoilé dans mon Mercedes Classe V — mes enfants adorent ! La pose est parfaite, très à l'écoute du client.",
    service: "Ciel Étoilé",
  },
  {
    name: "Nicolas Braun",
    location: "Differdange",
    rating: 5,
    date: "2024-11-30",
    text: "Installation CarPlay sur mon Audi A4 de 2017. Ça marche parfaitement, on dirait que c'est d'origine. Super travail !",
    service: "CarPlay",
  },
  {
    name: "Emma Lux",
    location: "Bettembourg",
    rating: 5,
    date: "2024-10-05",
    text: "Lumière d'ambiance RGB sur mon Range Rover. Rendu somptueux, l'application fonctionne très bien. Ravis !",
    service: "Lumière d'Ambiance",
  },
];

export function TestimonialsSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: reviews.map((r, i) => ({
      "@type": "Review",
      position: i + 1,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
      datePublished: r.date,
      itemReviewed: { "@type": "LocalBusiness", name: "Shadotech Automotive" },
    })),
  };

  return (
    <section className="py-24 bg-[#111111]" id="avis">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C62D36] text-sm font-semibold uppercase tracking-widest">
            Témoignages
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3 mb-4">
            Ce que disent{" "}
            <span className="text-gradient">nos clients</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-[#C62D36]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#C62D36" />
            ))}
            <span className="text-white font-bold ml-2">4.9</span>
            <span className="text-[#6B7280]">/ 5 — 150+ avis vérifiés</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-6 hover:border-[#C62D36]/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#C62D36" className="text-[#C62D36]" />
                  ))}
                </div>
                <span className="text-xs px-2 py-0.5 bg-[#C62D36]/10 text-[#C62D36] rounded-full border border-[#C62D36]/20">
                  {r.service}
                </span>
              </div>
              <blockquote className="text-[#9CA3AF] text-sm leading-relaxed mb-4">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C62D36] to-[#C62D36] flex items-center justify-center text-white text-xs font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{r.name}</div>
                  <div className="text-[#6B7280] text-xs">{r.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
