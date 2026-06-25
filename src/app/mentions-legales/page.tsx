import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentions Légales — Shadotech Automotive",
  description:
    "Mentions légales de Shadotech Automotive, Kayl, Luxembourg. Informations légales conformes au droit luxembourgeois.",
  robots: { index: false, follow: false },
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="border-b border-[#2E2E2E] pb-8 last:border-0">
    <h2 className="text-white font-semibold text-lg mb-4">{title}</h2>
    <div className="space-y-3 text-[#9CA3AF] text-sm leading-relaxed">{children}</div>
  </div>
);

export default function MentionsLegales() {
  const lastUpdate = "23 juin 2026";

  return (
    <section className="pt-32 pb-20 bg-[#111111]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[#C62D36] text-xs font-semibold uppercase tracking-widest">
            Informations légales
          </span>
          <h1 className="text-3xl font-bold text-white mt-2 mb-2">Mentions Légales</h1>
          <p className="text-[#6B7280] text-xs">
            Dernière mise à jour : {lastUpdate} — Conformes au droit luxembourgeois
          </p>
        </div>

        <div className="space-y-8">

          {/* 1. Éditeur */}
          <Section title="1. Éditeur du site">
            <p>
              Le présent site internet est édité par :
            </p>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-[#2E2E2E]">
                <tr className="py-2">
                  <td className="py-2 pr-4 text-[#6B7280] w-44 align-top">Raison sociale</td>
                  <td className="py-2 text-[#9CA3AF]">{COMPANY.name}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-[#6B7280] align-top">Forme juridique</td>
                  <td className="py-2 text-[#9CA3AF]">Entreprise individuelle / SARL <span className="text-[#C62D36]">[À compléter]</span></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-[#6B7280] align-top">Siège social</td>
                  <td className="py-2 text-[#9CA3AF]">{COMPANY.address}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-[#6B7280] align-top">Numéro RCS</td>
                  <td className="py-2 text-[#9CA3AF]">Registre de Commerce et des Sociétés — <span className="text-[#C62D36]">[Numéro à compléter]</span></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-[#6B7280] align-top">Numéro TVA</td>
                  <td className="py-2 text-[#9CA3AF]">LU <span className="text-[#C62D36]">[Numéro TVA intracommunautaire à compléter]</span></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-[#6B7280] align-top">Téléphone</td>
                  <td className="py-2 text-[#9CA3AF]">{COMPANY.phone}</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-[#6B7280] align-top">Email</td>
                  <td className="py-2">
                    <a href={`mailto:${COMPANY.email}`} className="text-[#C62D36] hover:underline">
                      {COMPANY.email}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* 2. Directeur de la publication */}
          <Section title="2. Directeur de la publication">
            <p>
              Le directeur de la publication est le responsable légal de l&apos;entreprise{" "}
              {COMPANY.name},{" "}
              <span className="text-[#C62D36]">[Nom du responsable à compléter]</span>.
            </p>
            <p>
              Conformément à la{" "}
              <span className="text-white">loi du 14 août 2000</span> relative au commerce
              électronique (transposant la Directive 2000/31/CE), tout éditeur d&apos;un service en
              ligne est tenu d&apos;identifier clairement le responsable de la publication.
            </p>
          </Section>

          {/* 3. Hébergement */}
          <Section title="3. Hébergement">
            <p>Le présent site est hébergé par :</p>
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 space-y-1">
              <p className="text-white font-medium">Vercel Inc.</p>
              <p>340 Pine Street Suite 701, San Francisco, CA 94104, États-Unis</p>
              <p>
                Site :{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C62D36] hover:underline"
                >
                  vercel.com
                </a>
              </p>
            </div>
            <p>
              Les données sont traitées dans des centres de données certifiés. Dans le cadre du
              transfert de données vers les États-Unis, Vercel Inc. se conforme au cadre du{" "}
              <span className="text-white">Data Privacy Framework UE–États-Unis</span>, approuvé
              par la Commission européenne.
            </p>
          </Section>

          {/* 4. Propriété intellectuelle */}
          <Section title="4. Propriété intellectuelle">
            <p>
              L&apos;ensemble des éléments constituant ce site internet — textes, photographies,
              illustrations, logos, graphismes, vidéos, structure et architecture — est la propriété
              exclusive de <span className="text-white">{COMPANY.name}</span> ou de ses ayants
              droit, et est protégé par les dispositions du{" "}
              <span className="text-white">
                Code de la propriété intellectuelle luxembourgeois
              </span>{" "}
              ainsi que par les conventions internationales applicables.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation ou
              exploitation de tout ou partie de ces éléments, quel que soit le moyen ou le procédé
              utilisé, est strictement interdite, sauf autorisation écrite préalable de{" "}
              {COMPANY.name}.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de son contenu constituerait une
              contrefaçon sanctionnée par les articles 80 et suivants de la{" "}
              <span className="text-white">loi du 18 avril 2001</span> sur les droits d&apos;auteur
              au Luxembourg.
            </p>
          </Section>

          {/* 5. Protection des données personnelles */}
          <Section title="5. Protection des données personnelles (RGPD)">
            <p>
              {COMPANY.name} accorde une importance particulière à la protection des données
              personnelles de ses utilisateurs et se conforme au{" "}
              <span className="text-white">
                Règlement (UE) 2016/679 du 27 avril 2016 (RGPD)
              </span>{" "}
              ainsi qu&apos;à la{" "}
              <span className="text-white">
                loi luxembourgeoise du 1er août 2018
              </span>{" "}
              portant organisation de la Commission nationale pour la protection des données (CNPD).
            </p>

            <div>
              <p className="text-white font-medium mb-1">Responsable du traitement</p>
              <p>
                {COMPANY.name} — {COMPANY.address} — {COMPANY.email}
              </p>
            </div>

            <div>
              <p className="text-white font-medium mb-2">Données collectées et finalités</p>
              <div className="space-y-2">
                {[
                  {
                    data: "Formulaire de contact / de réservation",
                    fields: "Nom, prénom, téléphone, email, marque/modèle du véhicule",
                    purpose: "Traitement de votre demande de réservation ou de devis",
                    basis: "Exécution d'un contrat (art. 6.1.b RGPD)",
                    retention: "3 ans à compter du dernier contact",
                  },
                  {
                    data: "Données de navigation",
                    fields: "Adresse IP, pages visitées, durée de session",
                    purpose: "Analyse d'audience et amélioration du site",
                    basis: "Intérêt légitime (art. 6.1.f RGPD) / Consentement",
                    retention: "13 mois maximum",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 space-y-1">
                    <p className="text-white font-medium text-xs">{item.data}</p>
                    <p><span className="text-[#6B7280]">Données :</span> {item.fields}</p>
                    <p><span className="text-[#6B7280]">Finalité :</span> {item.purpose}</p>
                    <p><span className="text-[#6B7280]">Base légale :</span> {item.basis}</p>
                    <p><span className="text-[#6B7280]">Conservation :</span> {item.retention}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white font-medium mb-1">Destinataires des données</p>
              <p>
                Les données collectées ne sont pas vendues, louées ni transmises à des tiers à des
                fins commerciales. Elles peuvent être partagées uniquement avec nos sous-traitants
                techniques (hébergeur Vercel, service d&apos;emailing), dans le respect du RGPD.
              </p>
            </div>

            <div>
              <p className="text-white font-medium mb-1">Vos droits</p>
              <p>
                Conformément au RGPD, vous disposez des droits suivants sur vos données :
              </p>
              <ul className="mt-2 space-y-1 list-none">
                {[
                  "Droit d'accès (art. 15) — obtenir une copie de vos données",
                  "Droit de rectification (art. 16) — corriger des données inexactes",
                  "Droit à l'effacement (art. 17) — demander la suppression",
                  "Droit à la limitation (art. 18) — restreindre le traitement",
                  "Droit à la portabilité (art. 20) — récupérer vos données",
                  "Droit d'opposition (art. 21) — vous opposer au traitement",
                ].map((right) => (
                  <li key={right} className="flex items-start gap-2">
                    <span className="text-[#C62D36] mt-0.5 shrink-0">›</span>
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2">
                Pour exercer ces droits, adressez votre demande par email à{" "}
                <a href={`mailto:${COMPANY.email}`} className="text-[#C62D36] hover:underline">
                  {COMPANY.email}
                </a>
                , en joignant une copie de votre pièce d&apos;identité. Nous répondons dans un
                délai maximum de{" "}
                <span className="text-white">30 jours</span> conformément à l&apos;art. 12 RGPD.
              </p>
            </div>

            <div>
              <p className="text-white font-medium mb-1">
                Autorité de contrôle — CNPD
              </p>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
                réclamation auprès de la{" "}
                <span className="text-white">
                  Commission Nationale pour la Protection des Données (CNPD)
                </span>{" "}
                du Grand-Duché de Luxembourg :
              </p>
              <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4 mt-2 space-y-1">
                <p className="text-white font-medium">CNPD</p>
                <p>15, boulevard du Jazz — L-4370 Belvaux, Luxembourg</p>
                <p>Tél. : +352 26 10 60 - 1</p>
                <p>
                  Site :{" "}
                  <a
                    href="https://cnpd.public.lu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C62D36] hover:underline"
                  >
                    cnpd.public.lu
                  </a>
                </p>
              </div>
            </div>
          </Section>

          {/* 6. Cookies */}
          <Section title="6. Politique relative aux cookies">
            <p>
              Conformément à la{" "}
              <span className="text-white">
                loi du 30 mai 2005 modifiée relative aux communications électroniques
              </span>{" "}
              (transposant la Directive 2002/58/CE dite « ePrivacy ») et au RGPD, nous vous
              informons de l&apos;utilisation de cookies sur ce site.
            </p>
            <div className="space-y-2">
              {[
                {
                  type: "Cookies strictement nécessaires",
                  desc: "Indispensables au fonctionnement du site (session, sécurité). Aucun consentement requis.",
                  color: "text-emerald-400",
                },
                {
                  type: "Cookies analytiques",
                  desc: "Mesure d'audience anonymisée (durée, pages visitées). Déposés uniquement après votre consentement.",
                  color: "text-blue-400",
                },
              ].map((c) => (
                <div key={c.type} className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-4">
                  <p className={`font-medium text-xs mb-1 ${c.color}`}>{c.type}</p>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
            <p>
              Vous pouvez à tout moment modifier vos préférences via les paramètres de votre
              navigateur ou en nous contactant à{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-[#C62D36] hover:underline">
                {COMPANY.email}
              </a>
              . La durée maximale de conservation des cookies est de{" "}
              <span className="text-white">13 mois</span>.
            </p>
          </Section>

          {/* 7. Droit de rétractation */}
          <Section title="7. Réservation en ligne — Droit de rétractation">
            <p>
              Conformément à la{" "}
              <span className="text-white">
                loi du 8 mars 2017 relative aux contrats à distance
              </span>{" "}
              (transposant la Directive 2011/83/UE), vous disposez d&apos;un droit de rétractation
              de <span className="text-white">14 jours calendaires</span> à compter de la
              confirmation de votre réservation, sans avoir à justifier de motifs ni à payer de
              pénalités.
            </p>
            <p>
              <span className="text-white">Exception :</span> conformément à l&apos;article 16 de
              la Directive 2011/83/UE et à l&apos;art. L.222-28 du Code de la consommation, le
              droit de rétractation ne s&apos;applique pas aux prestations de services
              pleinement exécutées avant l&apos;expiration du délai de rétractation, avec votre
              accord exprès préalable.{" "}
              <span className="text-white">
                Si l&apos;intervention est réalisée dans ce délai de 14 jours avec votre accord
                explicite, vous renoncez à votre droit de rétractation.
              </span>
            </p>
            <p>
              Pour exercer votre droit de rétractation, contactez-nous à{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-[#C62D36] hover:underline">
                {COMPANY.email}
              </a>{" "}
              ou par téléphone au{" "}
              <a href={`tel:${COMPANY.phone}`} className="text-[#C62D36] hover:underline">
                {COMPANY.phone}
              </a>{" "}
              avant la date d&apos;intervention.
            </p>
          </Section>

          {/* 8. Prix et devis */}
          <Section title="8. Prix, devis et tarifs">
            <p>
              Les prix affichés sur le site sont exprimés en{" "}
              <span className="text-white">euros (€) TTC</span> et fournis à titre indicatif. Le
              devis final est établi après diagnostic du véhicule.
            </p>
            <p>
              {COMPANY.name} se réserve le droit de modifier ses tarifs à tout moment. Les
              prestations sont facturées sur la base du devis accepté par le client avant toute
              intervention.
            </p>
            <p>
              Conformément à la réglementation luxembourgeoise, le taux de TVA applicable est de{" "}
              <span className="text-white">17 %</span> (taux normal luxembourgeois).
            </p>
          </Section>

          {/* 9. Limitation de responsabilité */}
          <Section title="9. Limitation de responsabilité">
            <p>
              Les informations publiées sur ce site sont fournies à titre indicatif et sans garantie
              d&apos;exactitude, d&apos;exhaustivité ou d&apos;adéquation à un usage particulier.{" "}
              {COMPANY.name} se réserve le droit de modifier, corriger ou supprimer tout contenu
              sans préavis.
            </p>
            <p>
              {COMPANY.name} ne saurait être tenu responsable des dommages directs ou indirects
              résultant de l&apos;accès au site, de l&apos;utilisation des informations qui y sont
              publiées, ou de l&apos;indisponibilité du service.
            </p>
            <p>
              Les résultats affichés pour les vitres teintées (légalité, VLT) sont fournis à titre
              indicatif. Il appartient à l&apos;utilisateur de vérifier la conformité avec le Code
              de la Route luxembourgeois (
              <span className="text-white">Règlement grand-ducal du 23 novembre 1955</span> portant
              règlement de la circulation sur toutes les voies publiques, modifié).
            </p>
          </Section>

          {/* 10. Liens hypertextes */}
          <Section title="10. Liens hypertextes">
            <p>
              Ce site peut contenir des liens vers des sites tiers. {COMPANY.name} n&apos;exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu,
              leurs pratiques en matière de protection des données ou leur disponibilité.
            </p>
            <p>
              La création de liens hypertextes pointant vers ce site est soumise à autorisation
              préalable écrite de {COMPANY.name}.
            </p>
          </Section>

          {/* 11. Droit applicable */}
          <Section title="11. Droit applicable et juridiction compétente">
            <p>
              Le présent site et ses mentions légales sont soumis au{" "}
              <span className="text-white">droit du Grand-Duché de Luxembourg</span>.
            </p>
            <p>
              En cas de litige relatif à l&apos;utilisation du site ou à une prestation de service,
              les parties s&apos;engagent à rechercher une solution amiable. À défaut, tout litige
              sera porté devant les{" "}
              <span className="text-white">
                tribunaux compétents du Grand-Duché de Luxembourg
              </span>
              , notamment le Tribunal d&apos;arrondissement de Luxembourg ou de Diekirch, selon la
              nature du litige.
            </p>
            <p>
              Pour les litiges de consommation, le consommateur résidant au Luxembourg peut
              saisir le{" "}
              <span className="text-white">
                Service National du Médiateur de la Consommation
              </span>{" "}
              (
              <a
                href="https://mediateurconsommation.lu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C62D36] hover:underline"
              >
                mediateurconsommation.lu
              </a>
              ) ou accéder à la plateforme européenne de règlement en ligne des litiges (
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C62D36] hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              ).
            </p>
          </Section>

          {/* 12. Mise à jour */}
          <Section title="12. Mise à jour des mentions légales">
            <p>
              {COMPANY.name} se réserve le droit de modifier les présentes mentions légales à tout
              moment afin de les adapter aux évolutions légales, réglementaires ou techniques. La
              version en vigueur est celle affichée sur cette page avec la date de dernière mise à
              jour indiquée en haut.
            </p>
            <p>
              Date de dernière mise à jour :{" "}
              <span className="text-white">{lastUpdate}</span>
            </p>
          </Section>

        </div>

        {/* Navigation */}
        <div className="mt-10 pt-8 border-t border-[#2E2E2E] flex flex-wrap gap-4">
          <Link href="/" className="text-[#C62D36] hover:underline text-sm">
            ← Retour à l&apos;accueil
          </Link>
          <Link href="/politique-confidentialite" className="text-[#C62D36] hover:underline text-sm">
            Politique de confidentialité →
          </Link>
        </div>
      </div>
    </section>
  );
}
