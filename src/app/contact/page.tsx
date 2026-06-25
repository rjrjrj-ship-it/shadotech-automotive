import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact — Shadotech Automotive Kayl Luxembourg",
  description:
    "Contactez Shadotech Automotive à Kayl, Luxembourg. Téléphone, email, formulaire de contact et itinéraire. Devis gratuit.",
  alternates: { canonical: "https://shadotech.lu/contact" },
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nous <span className="text-gradient">contacter</span>
          </h1>
          <p className="text-[#6B7280] text-lg">Devis gratuit, réponse en moins de 24h.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#C62D36]" />
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Adresse</div>
                  <div className="text-[#6B7280] text-sm">{COMPANY.address}</div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#C62D36]" />
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Téléphone</div>
                  <a href={`tel:${COMPANY.phone}`} className="text-[#6B7280] text-sm hover:text-white transition-colors">{COMPANY.phone}</a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#C62D36]" />
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Email</div>
                  <a href={`mailto:${COMPANY.email}`} className="text-[#6B7280] text-sm hover:text-white transition-colors">{COMPANY.email}</a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#C62D36]" />
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Horaires</div>
                  <div className="text-[#6B7280] text-sm">{COMPANY.openHours}</div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-[#2E2E2E] aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2589.4!2d6.036!3d49.492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s53+Rue+de+Noertzange%2C+3670+Kayl%2C+Luxembourg!5e0!3m2!1sfr!2slu"
                className="w-full h-full"
                style={{ filter: "invert(90%) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shadotech Automotive Kayl"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-6 sm:p-8">
            <h2 className="text-white font-bold text-xl mb-6">Envoyer un message</h2>
            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "firstName", label: "Prénom", placeholder: "Jean" },
                  { name: "lastName", label: "Nom", placeholder: "Dupont" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="text-[#9CA3AF] text-sm mb-1.5 block">{f.label}</label>
                    <input name={f.name} placeholder={f.placeholder} required className="w-full bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white placeholder-[#4E4E4E] focus:border-[#C62D36] outline-none transition-colors" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-[#9CA3AF] text-sm mb-1.5 block">Email</label>
                <input type="email" name="email" required placeholder="jean@exemple.lu" className="w-full bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white placeholder-[#4E4E4E] focus:border-[#C62D36] outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[#9CA3AF] text-sm mb-1.5 block">Téléphone</label>
                <input type="tel" name="phone" placeholder="+352 123 456 789" className="w-full bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white placeholder-[#4E4E4E] focus:border-[#C62D36] outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[#9CA3AF] text-sm mb-1.5 block">Service souhaité</label>
                <select name="service" className="w-full bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white focus:border-[#C62D36] outline-none transition-colors">
                  <option value="">Choisir un service</option>
                  <option>Vitres Teintées</option>
                  <option>Covering</option>
                  <option>PPF</option>
                  <option>Ciel Étoilé</option>
                  <option>Lumière d&apos;Ambiance</option>
                  <option>CarPlay</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label className="text-[#9CA3AF] text-sm mb-1.5 block">Message</label>
                <textarea name="message" rows={4} required placeholder="Décrivez votre projet..." className="w-full bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white placeholder-[#4E4E4E] focus:border-[#C62D36] outline-none transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#C62D36] hover:bg-[#a82530] text-white font-semibold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(230,57,70,0.4)]">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
