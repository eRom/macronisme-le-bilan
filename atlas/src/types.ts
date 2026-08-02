export type Role = { piece: string; kind: string; n: number | null; label: string };
export type Ministre = { n: string; pf: string | null };
export type Fiche = {
  t: string; ty: string; d: string[]; dt: string; df: string | null;
  g: string; st: string | null; src: string[];
  act: { p: string | null; m: Ministre[]; gb: string | null; gv: string[] };
  html: string; txt: string; out: string[]; in: string[]; roles: Role[];
};
export type Bloc = { n: number; label: string; slugs: string[] };
export type Domaine = {
  nom: string; verdict: string; dateVerdict: string | null;
  sections: Record<string, string>;
  charges: Bloc[]; decharges: Bloc[]; ecartes: { label: string; slugs: string[] }[];
  fiches: string[];
};
export type Fil = { kind: "charge" | "decharge"; n: number; label: string; html: string; fiches: string[]; pieces: string[] };
export type ActeurAgg = { nom: string; fiches: string[]; portefeuilles: string[]; gouvs: string[] };
export type Atlas = {
  fiches: Record<string, Fiche>;
  domaines: Record<string, Domaine>;
  ordreDomaines: string[];
  domaineNoms: Record<string, string>;
  gouvernements: Record<string, string[]>;
  ordreGouvernements: string[];
  ministres: Record<string, ActeurAgg>;
  synthese: { verdict: string; dateVerdict: string | null; perimetreHtml: string; ecartesHtml: string; verdictHtml: string; fils: Fil[] };
  graphe: { nodes: { id: string; x: number; y: number; s: number; dom: string }[]; edges: [string, string][] };
  buildDate: string;
};

export const A: Atlas = (window as unknown as { ATLAS: Atlas }).ATLAS;
