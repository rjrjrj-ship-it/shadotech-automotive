import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Shadotech Automotive",
  description: "Politique de confidentialité et traitement des données personnelles de Shadotech Automotive.",
  robots: { index: false },
};

export default function PolitiqueConfidentialite() {
  return (
    <section className="pt-32 pb-20 bg-[#111111]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Politique de Confidentialité</h1>
        <div className="space-y-8 text-[#9CA3AF] text-sm leading-relaxed">
          <div>
            <h2 className="text-white font-semibold text-lg mb-3">1. Responsable du traitement</h2>
            <p>{COMPANY.name}, {COMPANY.address} — {COMPANY.email}</p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-3">2. Données collectées</h2>
            <p>Lors de l&apos;utilisation de notre formulaire de réservation ou de contact, nous collectons : nom, prénom, adresse email, numéro de téléphone, informations sur le véhicule.</p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-3">3. Finalité du traitement</h2>
            <p>Les données collectées sont utilisées exclusivement pour : traiter vos demandes de réservation, vous contacter pour confirmer un rendez-vous, améliorer nos services.</p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-3">4. Durée de conservation</h2>
            <p>Les données sont conservées pendant 3 ans à compter du dernier contact, sauf obligation légale contraire.</p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-3">5. Vos droits (RGPD)</h2>
            <p>Conformément au Règlement (UE) 2016/679, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et de portabilité de vos données. Pour exercer ces droits : {COMPANY.email}</p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-3">6. Cookies</h2>
            <p>Ce site utilise des cookies analytiques (Google Analytics) et fonctionnels. Vous pouvez refuser les cookies non essentiels via votre navigateur.</p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg mb-3">7. Contact DPO</h2>
            <p>Pour toute question relative à vos données personnelles : {COMPANY.email}</p>
          </div>
        </div>
        <Link href="/" className="mt-8 inline-block text-[#C62D36] hover:underline text-sm">← Retour à l&apos;accueil</Link>
      </div>
    </section>
  );
}
