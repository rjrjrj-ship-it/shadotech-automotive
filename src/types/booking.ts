export type VehicleType = "citadine" | "berline" | "suv" | "break" | "utilitaire" | "cabriolet";
export type WindowCount = 2 | 3 | 4 | 5 | 6 | 7;
export type FilmType = "vlt70" | "vlt50" | "vlt35" | "vlt30" | "vlt20" | "vlt15" | "vlt03";

export interface FilmOption {
  id: FilmType;
  label: string;
  vlt: string;
  pct: number;
  description: string;
  legal: "all" | "rear" | "rear-only";
  series: "HP";
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  licensePlate: string;
  vehicleType: VehicleType;
  windowCount: WindowCount;
  filmType: FilmType;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  estimatedPrice: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const VEHICLE_TYPES: { id: VehicleType; label: string; icon: string }[] = [
  { id: "citadine", label: "Citadine", icon: "🚗" },
  { id: "berline", label: "Berline", icon: "🚘" },
  { id: "suv", label: "SUV / 4x4", icon: "🚙" },
  { id: "break", label: "Break", icon: "🚐" },
  { id: "utilitaire", label: "Utilitaire", icon: "🚌" },
  { id: "cabriolet", label: "Cabriolet", icon: "🏎️" },
];

export const FILM_OPTIONS: FilmOption[] = [
  {
    id: "vlt70",
    label: "SUNTEK 70%",
    vlt: "70% VLT",
    pct: 70,
    description: "Film clair homologué. Conforme au code de la route luxembourgeois pour toutes les vitres. Réduit UV et chaleur sans modifier l'aspect.",
    legal: "all",
    series: "HP",
  },
  {
    id: "vlt50",
    label: "SUNTEK 50%",
    vlt: "50% VLT",
    pct: 50,
    description: "Teinte légère et discrète. Confort thermique amélioré. Recommandé pour les vitres arrières.",
    legal: "rear",
    series: "HP",
  },
  {
    id: "vlt35",
    label: "SUNTEK 35%",
    vlt: "35% VLT",
    pct: 35,
    description: "Teinte équilibrée. Bonne réduction de chaleur et bonne confidentialité. Vitres latérales arrières et lunette.",
    legal: "rear",
    series: "HP",
  },
  {
    id: "vlt30",
    label: "SUNTEK 30%",
    vlt: "30% VLT",
    pct: 30,
    description: "Teinte prononcée. Excellente protection thermique et UV. Look sportif discret. Vitres arrières uniquement.",
    legal: "rear-only",
    series: "HP",
  },
  {
    id: "vlt20",
    label: "SUNTEK 20%",
    vlt: "20% VLT",
    pct: 20,
    description: "Teinte sombre. Confidentialité maximale et look premium. Réservé aux vitres arrières.",
    legal: "rear-only",
    series: "HP",
  },
  {
    id: "vlt15",
    label: "SUNTEK 15%",
    vlt: "15% VLT",
    pct: 15,
    description: "Teinte très sombre. Réduction thermique et UV maximale. Vitres arrières uniquement.",
    legal: "rear-only",
    series: "HP",
  },
  {
    id: "vlt03",
    label: "SUNTEK 3%",
    vlt: "3% VLT",
    pct: 3,
    description: "Teinte limo — la plus sombre. Look vitres très noires. Lunette arrière et vitres latérales arrières exclusivement.",
    legal: "rear-only",
    series: "HP",
  },
];

// Prix par vitre (€) selon type de véhicule et teinte SUNTEK
export const PRICE_MATRIX: Record<VehicleType, Record<FilmType, number>> = {
  citadine:   { vlt70: 38, vlt50: 44, vlt35: 50, vlt30: 54, vlt20: 60, vlt15: 66, vlt03: 74 },
  berline:    { vlt70: 42, vlt50: 50, vlt35: 58, vlt30: 62, vlt20: 70, vlt15: 76, vlt03: 85 },
  suv:        { vlt70: 48, vlt50: 58, vlt35: 68, vlt30: 74, vlt20: 83, vlt15: 91, vlt03: 100 },
  break:      { vlt70: 44, vlt50: 53, vlt35: 62, vlt30: 67, vlt20: 74, vlt15: 82, vlt03: 90 },
  utilitaire: { vlt70: 52, vlt50: 64, vlt35: 75, vlt30: 82, vlt20: 91, vlt15: 100, vlt03: 110 },
  cabriolet:  { vlt70: 44, vlt50: 52, vlt35: 60, vlt30: 65, vlt20: 73, vlt15: 80, vlt03: 88 },
};

export function calculatePrice(
  vehicleType: VehicleType,
  windowCount: WindowCount,
  filmType: FilmType
): number {
  return PRICE_MATRIX[vehicleType][filmType] * windowCount;
}
