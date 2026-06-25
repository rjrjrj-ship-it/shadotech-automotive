import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2E2E2E] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/icon-color.svg" alt="Shadotech" width={30} height={30} />
              <Image src="/logo-white.svg" alt="Shadotech Automotive" width={130} height={130} className="h-8 w-auto" />
            </Link>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
              Spécialiste en customisation et protection automobile au Luxembourg.
              Vitres teintées, covering, PPF et plus.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-[#6B7280] hover:text-white hover:border-[#C62D36] transition-all"
                aria-label="Instagram Shadotech Automotive"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-[#6B7280] hover:text-white hover:border-[#25D366] transition-all"
                aria-label="WhatsApp Shadotech"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.102 1.523 5.824L0 24l6.361-1.498A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.847 0-3.594-.484-5.112-1.334L2.5 21.5l.855-4.257A9.95 9.95 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Nos Services
            </h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="text-[#6B7280] hover:text-[#C62D36] text-sm transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Informations
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/realisations", label: "Réalisations" },
                { href: "/a-propos", label: "À propos" },
                { href: "/contact", label: "Contact" },
                { href: "/mentions-legales", label: "Mentions légales" },
                { href: "/politique-confidentialite", label: "Politique de confidentialité" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#6B7280] hover:text-[#C62D36] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / NAP */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-3 text-sm text-[#6B7280]">
                <MapPin size={14} className="mt-0.5 text-[#C62D36] shrink-0" />
                <span>{COMPANY.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <Phone size={14} className="text-[#C62D36] shrink-0" />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white transition-colors">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <Mail size={14} className="text-[#C62D36] shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#6B7280]">
                <Clock size={14} className="mt-0.5 text-[#C62D36] shrink-0" />
                <span>{COMPANY.openHours}</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-[#2E2E2E] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B7280] text-xs">
            © {new Date().getFullYear()} Shadotech Automotive. Tous droits réservés.
          </p>
          <p className="text-[#6B7280] text-xs">
            Kayl, Luxembourg — Customisation & Protection Automobile
          </p>
        </div>
      </div>
    </footer>
  );
}
