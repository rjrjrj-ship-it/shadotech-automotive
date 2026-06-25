"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${COMPANY.whatsapp}?text=Bonjour%20Shadotech%20Automotive%2C%20j'aimerais%20obtenir%20un%20devis.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bc5c] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110"
      >
        <MessageCircle size={26} fill="white" />
      </a>
    </div>
  );
}
