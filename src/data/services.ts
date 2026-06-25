export const SERVICE_KEYS = [
  "complet",
  "vitre_avant",
  "arriere_34",
  "decoll_2",
  "decoll_34",
  "pb_noir",
  "pb_cameleon",
] as const;

export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  complet:      "Pose complète (toutes vitres)",
  vitre_avant:  "Vitres avant",
  arriere_34:   "3/4 arrière",
  decoll_2:     "Décollement 2 vitres avant",
  decoll_34:    "Décollement 3/4 arrière",
  pb_noir:      "Pare-brise couleur noir",
  pb_cameleon:  "Pare-brise caméléon",
};

export const SERVICE_DESC: Record<ServiceKey, string> = {
  complet:      "Toutes les vitres teintées en une seule intervention",
  vitre_avant:  "Les 2 vitres latérales avant uniquement",
  arriere_34:   "Vitres latérales arrières + lunette arrière",
  decoll_2:     "Retrait du film des 2 vitres avant",
  decoll_34:    "Retrait du film des vitres 3/4 arrière",
  pb_noir:      "Pose d'un pare-brise bandeauteinte noir",
  pb_cameleon:  "Pose d'un pare-brise à effet caméléon",
};
