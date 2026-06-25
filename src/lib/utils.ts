import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COMPANY = {
  name: "Shadotech Automotive",
  shortName: "Shadotech",
  address: "53 Rue de Noertzange, 3670 Kayl, Luxembourg",
  phone: "+352 123 456 789",
  email: "contact@shadotech.lu",
  instagram: "https://www.instagram.com/shadotechautomotive/",
  whatsapp: "352123456789",
  googleMapsUrl: "https://maps.google.com/?q=53+Rue+de+Noertzange,+3670+Kayl,+Luxembourg",
  googleBusinessUrl: "https://g.page/shadotech-automotive",
  openHours: "Lun–Ven: 8h–18h | Sam: 9h–14h",
};

export const SERVICES = [
  { slug: "vitres-teintees", label: "Vitres Teintées", icon: "🪟" },
  { slug: "covering", label: "Covering", icon: "🎨" },
  { slug: "ppf", label: "PPF", icon: "🛡️" },
  { slug: "ciel-etoile", label: "Ciel Étoilé", icon: "✨" },
  { slug: "lumiere-ambiance", label: "Lumière d'Ambiance", icon: "💡" },
  { slug: "carplay", label: "CarPlay", icon: "📱" },
];
