import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shadotech.lu";
  const now = new Date();

  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/vitres-teintees", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/covering", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/ppf", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/ciel-etoile", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/lumiere-ambiance", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/carplay", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/realisations", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/a-propos", priority: 0.6, changeFrequency: "yearly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
  ];

  return pages.map((p) => ({
    url: `${base}${p.url}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
