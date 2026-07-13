import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, Database, Clock, UserCheck, Cookie, Mail, ChevronLeft } from "lucide-react";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Shadotech Automotive",
  description: "Politique de confidentialité et traitement des données personnelles de Shadotech Automotive, conformément au RGPD.",
  robots: { index: false },
};

const sections = [
  {
    icon: UserCheck,
    title: "1. Responsable du traitement",
    content: (
      <>
        <p>Le responsable du traitement de vos données personnelles est :</p>
        <div className="mt-4 bg-[#111111] border border-[#2E2E2E] rounded-xl p-4 space-y-1">
          <div className="text-white font-semibold">{COMPANY.name}</div>
          <div>{COMPANY.address}</div>
          <div>
            Email :{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-[#C62D36] hover:underline">
              {COMPANY.email}
            </a>
          </div>
          <div>
            Téléphone :{" "}
            <a href={`tel:${COMPANY.phone}`} className="text-[#C62D36] hover:underline">
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </>
    ),
  },
  {
    icon: Database,
    title: "2. Données collectées",
    content: (
      <>
        <p className="mb-4">Nous collectons uniquement les données nécessaires à la bonne exécution de nos services :</p>
        <div className="space-y-3">
          {[
            {
              label: "Formulaire de contact & réservation",
              items: ["Nom et prénom", "Adresse email", "Numéro de téléphone", "Marque, modèle et année du véhicule", "Service souhaité"],
            },
            {
              label: "Navigation sur le site",
              items: ["Adresse IP (anonymisée)", "Pages visitées", "Durée de visite", "Type de navigateur et appareil"],
            },
          ].map((group) => (
            <div key={group.label} className="bg-[#111111] border border-[#2E2E2E] rounded-xl p-4">
              <div className="text-white font-medium text-sm mb-2">{group.label}</div>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C62D36] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    icon: Eye,
    title: "3. Finalité du traitement",
    content: (
      <>
        <p className="mb-4">Vos données sont traitées pour les finalités suivantes, sur les bases légales indiquées :</p>
        <div className="space-y-3">
          {[
            { finalite: "Gestion des réservations et rendez-vous", base: "Exécution du contrat" },
            { finalite: "Réponse aux demandes de contact et devis", base: "Intérêt légitime" },
            { finalite: "Envoi de confirmations par email ou SMS", base: "Exécution du contrat" },
            { finalite: "Amélioration de nos services", base: "Intérêt légitime" },
            { finalite: "Respect des obligations légales et comptables", base: "Obligation légale" },
          ].map((row) => (
            <div key={row.finalite} className="flex items-start justify-between gap-4 bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3">
              <span className="text-sm">{row.finalite}</span>
              <span className="text-xs bg-[#C62D36]/15 text-[#C62D36] px-2 py-0.5 rounded-full shrink-0 font-medium">{row.base}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    icon: Clock,
    title: "4. Durée de conservation",
    content: (
      <>
        <p className="mb-4">Nous ne conservons vos données que le temps strictement nécessaire :</p>
        <div className="space-y-3">
          {[
            { type: "Données de réservation et clients", duree: "5 ans après la prestation (obligation comptable)" },
            { type: "Demandes de contact sans suite", duree: "1 an après le dernier échange" },
            { type: "Données de navigation", duree: "13 mois maximum" },
          ].map((row) => (
            <div key={row.type} className="bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3">
              <div className="text-white font-medium text-sm">{row.type}</div>
              <div className="text-xs mt-0.5">{row.duree}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    icon: Shield,
    title: "5. Vos droits (RGPD)",
    content: (
      <>
        <p className="mb-4">
          Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi luxembourgeoise du 1er août 2018, vous disposez des droits suivants sur vos données personnelles :
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { droit: "Droit d'accès", desc: "Obtenir une copie de vos données" },
            { droit: "Droit de rectification", desc: "Corriger des données inexactes" },
            { droit: "Droit à l'effacement", desc: "Demander la suppression de vos données" },
            { droit: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré" },
            { droit: "Droit d'opposition", desc: "Vous opposer à un traitement basé sur l'intérêt légitime" },
            { droit: "Droit à la limitation", desc: "Restreindre l'utilisation de vos données" },
          ].map((r) => (
            <div key={r.droit} className="bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3">
              <div className="text-white font-medium text-sm">{r.droit}</div>
              <div className="text-xs mt-0.5">{r.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-[#C62D36]/10 border border-[#C62D36]/20 rounded-xl p-4 text-sm">
          Pour exercer vos droits, contactez-nous à{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-[#C62D36] hover:underline font-medium">
            {COMPANY.email}
          </a>
          . Nous répondons dans un délai maximum de <strong className="text-white">30 jours</strong>.
        </div>
      </>
    ),
  },
  {
    icon: Cookie,
    title: "6. Cookies",
    content: (
      <>
        <p className="mb-4">Ce site utilise des cookies pour assurer son bon fonctionnement et analyser son audience :</p>
        <div className="space-y-3">
          {[
            { type: "Cookies essentiels", desc: "Nécessaires au fonctionnement du site (session, sécurité). Toujours actifs.", obligatoire: true },
            { type: "Cookies analytiques", desc: "Mesurent l'audience de manière anonyme pour améliorer le site.", obligatoire: false },
          ].map((c) => (
            <div key={c.type} className="flex items-start justify-between gap-4 bg-[#111111] border border-[#2E2E2E] rounded-xl px-4 py-3">
              <div>
                <div className="text-white font-medium text-sm">{c.type}</div>
                <div className="text-xs mt-0.5">{c.desc}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 font-medium ${c.obligatoire ? "bg-[#2E2E2E] text-[#9CA3AF]" : "bg-[#C62D36]/15 text-[#C62D36]"}`}>
                {c.obligatoire ? "Obligatoire" : "Optionnel"}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs">
          Vous pouvez gérer ou désactiver les cookies optionnels depuis les paramètres de votre navigateur.
        </p>
      </>
    ),
  },
  {
    icon: Mail,
    title: "7. Réclamation — CNPD",
    content: (
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la{" "}
        <strong className="text-white">Commission Nationale pour la Protection des Données (CNPD)</strong> au Luxembourg :{" "}
        <a href="https://cnpd.public.lu" target="_blank" rel="noopener noreferrer" className="text-[#C62D36] hover:underline">
          cnpd.public.lu
        </a>
      </p>
    ),
  },
];

export default function PolitiqueConfidentialite() {
  return (
    <section className="pt-32 pb-20 bg-[#111111]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-[#6B7280] hover:text-white text-sm mb-8 transition-colors"
        >
          <ChevronLeft size={15} /> Retour au contact
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#C62D36]/10 border border-[#C62D36]/20 rounded-full px-3 py-1 mb-4">
            <Shield size={13} className="text-[#C62D36]" />
            <span className="text-[#C62D36] text-xs font-medium">RGPD · Règlement (UE) 2016/679</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Politique de confidentialité</h1>
          <p className="text-[#6B7280] text-sm">
            Dernière mise à jour : juillet 2026 · {COMPANY.name}
          </p>
        </div>

        {/* Intro */}
        <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-5 mb-10 text-[#9CA3AF] text-sm leading-relaxed">
          La protection de vos données personnelles est une priorité pour <strong className="text-white">{COMPANY.name}</strong>. Cette politique explique quelles données nous collectons, pourquoi, comment nous les protégeons et quels sont vos droits.
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map(({ icon: Icon, title, content }) => (
            <div key={title} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-[#C62D36]/10 border border-[#C62D36]/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#C62D36]" />
                </div>
                <h2 className="text-white font-bold text-base">{title}</h2>
              </div>
              <div className="text-[#9CA3AF] text-sm leading-relaxed">{content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
