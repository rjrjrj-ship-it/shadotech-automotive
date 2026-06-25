"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronRight, ChevronLeft, Car, Layers, Calendar, User } from "lucide-react";
import {
  VEHICLE_TYPES,
  FILM_OPTIONS,
  calculatePrice,
  type VehicleType,
  type WindowCount,
  type FilmType,
  type BookingFormData,
} from "@/types/booking";

const bookingSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .min(8, "Numéro de téléphone invalide")
    .regex(/^[+\d\s()-]+$/, "Format invalide"),
  vehicleBrand: z.string().min(2, "Marque requise"),
  vehicleModel: z.string().min(1, "Modèle requis"),
  licensePlate: z.string().min(3, "Immatriculation requise"),
  message: z.string().optional(),
  preferredDate: z.string().min(1, "Date requise"),
  preferredTime: z.string().min(1, "Heure requise"),
  vehicleType: z.string(),
  windowCount: z.number(),
  filmType: z.string(),
  estimatedPrice: z.number(),
});

type FormValues = z.infer<typeof bookingSchema>;

const STEPS = [
  { label: "Véhicule", icon: Car },
  { label: "Film", icon: Layers },
  { label: "Date", icon: Calendar },
  { label: "Coordonnées", icon: User },
];

const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export function BookingWizard() {
  const [step, setStep] = useState(0);
  const [vehicleType, setVehicleType] = useState<VehicleType>("berline");
  const [windowCount, setWindowCount] = useState<WindowCount>(4);
  const [filmType, setFilmType] = useState<FilmType>("vlt70");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(bookingSchema) });

  useEffect(() => {
    const price = calculatePrice(vehicleType, windowCount, filmType);
    setEstimatedPrice(price);
    setValue("vehicleType", vehicleType);
    setValue("windowCount", windowCount);
    setValue("filmType", filmType);
    setValue("estimatedPrice", price);
  }, [vehicleType, windowCount, filmType, setValue]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data as BookingFormData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Réservation confirmée !</h3>
        <p className="text-[#9CA3AF] mb-2">
          Un email de confirmation a été envoyé à votre adresse.
        </p>
        <p className="text-[#9CA3AF] text-sm">
          Nous vous contacterons pour confirmer le créneau dans les 24h.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] border border-[#2E2E2E] rounded-2xl overflow-hidden">
      {/* Stepper */}
      <div className="flex border-b border-[#2E2E2E]">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`flex-1 flex flex-col items-center gap-1 py-4 text-xs transition-colors ${
                i === step
                  ? "bg-[#C62D36]/10 text-[#C62D36] border-b-2 border-[#C62D36]"
                  : i < step
                  ? "text-green-400"
                  : "text-[#6B7280]"
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:block">{s.label}</span>
              {i < step && <Check size={10} className="text-green-400" />}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
        {/* Step 0: Vehicle */}
        {step === 0 && (
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Votre véhicule</h3>

            <div className="mb-6">
              <label className="text-[#9CA3AF] text-sm mb-3 block">Type de véhicule</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicleType(v.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      vehicleType === v.id
                        ? "border-[#C62D36] bg-[#C62D36]/10 text-white"
                        : "border-[#2E2E2E] text-[#6B7280] hover:border-[#4E4E4E]"
                    }`}
                  >
                    <div className="text-2xl mb-1">{v.icon}</div>
                    <div className="text-sm font-medium">{v.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[#9CA3AF] text-sm mb-3 block">
                Nombre de vitres à teinter
              </label>
              <div className="flex gap-2 flex-wrap">
                {([2, 3, 4, 5, 6, 7] as WindowCount[]).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setWindowCount(n)}
                    className={`w-12 h-12 rounded-xl border font-bold transition-all ${
                      windowCount === n
                        ? "border-[#C62D36] bg-[#C62D36]/10 text-[#C62D36]"
                        : "border-[#2E2E2E] text-[#6B7280] hover:border-[#4E4E4E]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Price preview */}
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 mb-6 flex items-center justify-between">
              <span className="text-[#6B7280] text-sm">Estimation indicative</span>
              <span className="text-2xl font-bold text-gradient">{estimatedPrice}€</span>
            </div>
          </div>
        )}

        {/* Step 1: Film */}
        {step === 1 && (
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Type de film</h3>
            <div className="space-y-2 mb-6">
              {FILM_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilmType(f.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    filmType === f.id
                      ? "border-[#C62D36] bg-[#C62D36]/10"
                      : "border-[#2E2E2E] hover:border-[#4E4E4E]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {/* VLT visual bar */}
                      <div className="w-7 h-7 rounded-md border border-white/10 shrink-0" style={{ background: `rgba(0,0,0,${1 - f.pct / 100})` }} />
                      <span className="text-white font-semibold">{f.label}</span>
                      <span className="text-[#6B7280] text-xs">SUNTEK HP</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {f.legal === "all" && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                          ✓ Légal toutes vitres LU
                        </span>
                      )}
                      {f.legal === "rear" && (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
                          Vitres arrières recommandé
                        </span>
                      )}
                      {f.legal === "rear-only" && (
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                          Vitres arrières uniquement
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[#6B7280] text-xs leading-relaxed pl-9">{f.description}</p>
                </button>
              ))}
            </div>
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 flex items-center justify-between">
              <span className="text-[#6B7280] text-sm">
                {windowCount} vitre(s) · {VEHICLE_TYPES.find(v => v.id === vehicleType)?.label}
              </span>
              <span className="text-2xl font-bold text-gradient">{estimatedPrice}€</span>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Date et heure souhaitées</h3>
            <div className="mb-4">
              <label className="text-[#9CA3AF] text-sm mb-2 block">Date</label>
              <input
                type="date"
                {...register("preferredDate")}
                min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white focus:border-[#C62D36] outline-none transition-colors"
              />
              {errors.preferredDate && (
                <p className="text-[#C62D36] text-xs mt-1">{errors.preferredDate.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="text-[#9CA3AF] text-sm mb-3 block">Créneau horaire</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((t) => (
                  <label key={t} className="cursor-pointer">
                    <input type="radio" value={t} {...register("preferredTime")} className="sr-only peer" />
                    <div className="peer-checked:border-[#C62D36] peer-checked:bg-[#C62D36]/10 peer-checked:text-[#C62D36] border border-[#2E2E2E] rounded-xl py-2.5 text-center text-sm text-[#6B7280] hover:border-[#4E4E4E] transition-all">
                      {t}
                    </div>
                  </label>
                ))}
              </div>
              {errors.preferredTime && (
                <p className="text-[#C62D36] text-xs mt-1">{errors.preferredTime.message}</p>
              )}
            </div>
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-3 text-amber-400 text-xs">
              ⚠️ Les créneaux sont sous réserve de confirmation. Nous vous contacterons dans les 24h.
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Vos coordonnées</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {(
                [
                  { name: "firstName", label: "Prénom", placeholder: "Jean" },
                  { name: "lastName", label: "Nom", placeholder: "Dupont" },
                ] as const
              ).map((f) => (
                <div key={f.name}>
                  <label className="text-[#9CA3AF] text-sm mb-1.5 block">{f.label}</label>
                  <input
                    {...register(f.name)}
                    placeholder={f.placeholder}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white placeholder-[#4E4E4E] focus:border-[#C62D36] outline-none transition-colors"
                  />
                  {errors[f.name] && (
                    <p className="text-[#C62D36] text-xs mt-1">{errors[f.name]?.message}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {(
                [
                  { name: "email", label: "Email", placeholder: "jean@exemple.lu", type: "email" },
                  { name: "phone", label: "Téléphone", placeholder: "+352 123 456 789", type: "tel" },
                ] as const
              ).map((f) => (
                <div key={f.name}>
                  <label className="text-[#9CA3AF] text-sm mb-1.5 block">{f.label}</label>
                  <input
                    {...register(f.name)}
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white placeholder-[#4E4E4E] focus:border-[#C62D36] outline-none transition-colors"
                  />
                  {errors[f.name] && (
                    <p className="text-[#C62D36] text-xs mt-1">{errors[f.name]?.message}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {(
                [
                  { name: "vehicleBrand", label: "Marque", placeholder: "BMW" },
                  { name: "vehicleModel", label: "Modèle", placeholder: "X5" },
                  { name: "licensePlate", label: "Immatriculation", placeholder: "LU 1234" },
                ] as const
              ).map((f) => (
                <div key={f.name}>
                  <label className="text-[#9CA3AF] text-sm mb-1.5 block">{f.label}</label>
                  <input
                    {...register(f.name)}
                    placeholder={f.placeholder}
                    className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white placeholder-[#4E4E4E] focus:border-[#C62D36] outline-none transition-colors"
                  />
                  {errors[f.name] && (
                    <p className="text-[#C62D36] text-xs mt-1">{errors[f.name]?.message}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-6">
              <label className="text-[#9CA3AF] text-sm mb-1.5 block">Message (optionnel)</label>
              <textarea
                {...register("message")}
                rows={3}
                placeholder="Questions, précisions sur votre véhicule..."
                className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white placeholder-[#4E4E4E] focus:border-[#C62D36] outline-none transition-colors resize-none"
              />
            </div>

            {/* Recap */}
            <div className="bg-[#1A1A1A] border border-[#C62D36]/20 rounded-xl p-4 mb-6">
              <div className="text-[#C62D36] text-sm font-semibold mb-3">Récapitulatif</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-[#6B7280]">Véhicule</span>
                <span className="text-white">{VEHICLE_TYPES.find(v => v.id === vehicleType)?.label}</span>
                <span className="text-[#6B7280]">Nb vitres</span>
                <span className="text-white">{windowCount}</span>
                <span className="text-[#6B7280]">Film</span>
                <span className="text-white">{FILM_OPTIONS.find(f => f.id === filmType)?.label}</span>
                <span className="text-[#6B7280] font-semibold">Estimation</span>
                <span className="text-gradient font-bold text-lg">{estimatedPrice}€</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#2E2E2E] text-[#6B7280] rounded-xl hover:border-[#4E4E4E] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
            Précédent
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all"
            >
              Suivant
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all disabled:opacity-60"
            >
              {loading ? "Envoi en cours..." : "Confirmer la réservation"}
              {!loading && <Check size={16} />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
