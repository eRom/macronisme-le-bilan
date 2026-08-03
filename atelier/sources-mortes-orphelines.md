# Sources mortes : les fiches orphelines

> Document de travail, régénéré le 03/08/2026. Ne fait pas foi : il recense un
> défaut à réparer, il ne corrige rien. Contrat et méthode dans
> [`notes/campagne-sources-mortes.md`](notes/campagne-sources-mortes.md).

Une fiche est dite **orpheline** quand **aucune** de ses sources ne répond
plus. Elle n'établit alors plus rien qu'un lecteur puisse vérifier, ce qui est
le contraire du contrat du dossier. C'est cette liste-là qui commande l'ordre
de travail, pas le décompte des URL mortes : une fiche à trois sources dont
une meurt tient encore.

Régénérer après chaque lot, les trois commandes :

```bash
bun run atelier/audit-sources.ts > /tmp/sondage.txt      # environ 5 minutes
bun run atelier/liste-orphelines.ts /tmp/sondage.txt     # ce tableau
bun run atelier/audit-orphelines.ts /tmp/sondage.txt     # les compteurs
```

## Où en est la campagne

| | Ouverture (03/08) | Après la première séance |
|---|---|---|
| URL mortes ou déplacées | 278 | 252 |
| Fiches orphelines | 104 | **90** |
| dont grade A | 73 | 59 |

## Ce que la colonne « Voie » annonce

Elle est déduite de la **forme de l'URL morte**, c'est une indication de
départ, jamais une conclusion. Le détail de chaque voie est dans la note.

| Voie | Nature | Ce qui marche | Fiches |
|---|---|---|---|
| **1** | décision de justice, avis numéroté | ArianeWeb, Légifrance, catalogue du Défenseur des droits | **0** |
| **1-CELEX** | arrêt de la CJUE | EUR-Lex, jamais curia | 2 |
| **1?** | rapport parlementaire, Cour des comptes | à tenter en 1 | 22 |
| **2** | page de portail déplacée | variante d'arborescence, contenu vérifié | 18 |
| **3** | communiqué de presse, brève | le plus dur, parfois insoluble | 66 |

**La voie 1 est vidée** : toutes les décisions de justice et tous les avis
numérotés du lot ont été retrouvés le 03/08. C'était la catégorie la plus
rentable, elle est close. Ce qui reste est plus dur qu'au départ, et la
proportion de voie 3 a monté de moitié à près des trois quarts.

## Le tableau

Trié par priorité : citées par une pièce de jugement d'abord, puis par grade.

| # | Fiche | G | Cit. | Voie | URL mortes |
|---|---|---|---|---|---|
| 1 | [`2017-09-05-cession-engie`](../base/2017-09-05-cession-engie.md) | A | oui | 3 | `https://www.economie.gouv.fr/presse/cession-par-letat-dactions-dengie` |
| 2 | [`2017-09-14-whirlpool-reprise-wn`](../base/2017-09-14-whirlpool-reprise-wn.md) | A | oui | 3 1? | `https://www.hautsdefrance.fr/reprise-whirlpool-amiens-accord-signe/`<br>`https://www.assemblee-nationale.fr/dyn/15/rapports/cion-eco/l15b1386_rapport-information` |
| 3 | [`2017-09-21-ceta-application-provisoire-rapport-schubert`](../base/2017-09-21-ceta-application-provisoire-rapport-schubert.md) | A | oui | 3 2 | `https://www.info.gouv.fr/actualite/remise-du-rapport-de-levaluation-de-limpact-du-ceta`<br>`https://www.economie.gouv.fr/entreprises/entree-vigueur-ceta-21-septembre-2017`<br>`https://www.info.gouv.fr/actualite/plan-daction-ceta` |
| 4 | [`2018-04-01-guides-dgesco-evaluations-nationales`](../base/2018-04-01-guides-dgesco-evaluations-nationales.md) | A | oui | 2 3 | `https://www.education.gouv.fr/des-guides-fondamentaux-pour-les-apprentissages-1123`<br>`https://www.fsu-snuipp.fr/actualites/evaluations-nationales-cp-ce1-une-inutilite-confirmee` |
| 5 | [`2018-06-25-initiative-europeenne-intervention`](../base/2018-06-25-initiative-europeenne-intervention.md) | A | oui | 2 3 | `https://www.defense.gouv.fr/dgris/relations-internationales/europe/initiative-europeenne-dintervention-iei`<br>`https://ue.delegfrance.org/huit-etats-membres-rejoignent-la` |
| 6 | [`2019-02-04-blocage-indymedia-annule`](../base/2019-02-04-blocage-indymedia-annule.md) | A | oui | 3 | `http://cergy-pontoise.tribunal-administratif.fr/Actualites-du-Tribunal/Communiques/Le-tribunal-administratif-de-Cergy-Pontoise-annule-les-decisions-du-ministere-de-l-interieur-tendant-au-retrait-de-publications-sur-le-site-Indymedia-Nantes`<br>`https://www.legalis.net/jurisprudences/tribunal-administratif-de-cergy-pontoise-jugement-du-04-fevrier-2019/` |
| 7 | [`2019-10-01-ge-belfort-penalite-accord`](../base/2019-10-01-ge-belfort-penalite-accord.md) | A | oui | 1? | `https://www.assemblee-nationale.fr/dyn/15/rapports/cepolind/l15b0842_rapport-enquete`<br>`https://www.assemblee-nationale.fr/dyn/15/rapports/cion_def/l15b4528_rapport-information` |
| 8 | [`2019-11-07-otan-mort-cerebrale`](../base/2019-11-07-otan-mort-cerebrale.md) | A | oui | 3 | `https://www.economist.com/europe/2019/11/07/emmanuel-macron-warns-europe-that-nato-is-becoming-brain-dead` |
| 9 | [`2019-12-09-anses-glyphosate-retraits-restrictions`](../base/2019-12-09-anses-glyphosate-retraits-restrictions.md) | A | oui | 3 | `https://www.anses.fr/fr/content/glyphosate-lanses-annonce-le-retrait-de-lautorisation-de-mise-sur-le-marche-de-36-produits`<br>`https://www.anses.fr/fr/content/lanses-rend-les-conclusions-de-son-evaluation-comparative-du-glyphosate` |
| 10 | [`2020-06-29-jokers-convention-citoyenne`](../base/2020-06-29-jokers-convention-citoyenne.md) | A | oui | 3 | `https://www.elysee.fr/emmanuel-macron/2020/06/29/presentation-des-propositions-de-la-convention-citoyenne-pour-le-climat` |
| 11 | [`2020-12-04-glyphosate-echec-reconnu`](../base/2020-12-04-glyphosate-echec-reconnu.md) | A | oui | 3 | `https://www.brut.media/fr/news/l-interview-brut-d-emmanuel-macron-en-integralite-8959f632-6a7c-47bc-8b43-b924b42b10a4`<br>`https://www.elysee.fr/emmanuel-macron/2020/12/04/interview-d-emmanuel-macron-par-brut`<br>`https://www.leparisien.fr/politique/emmanuel-macron-les-non-vaccines-j-ai-tres-envie-de-les-emmerder-04-01-2022-7X46CUB2UBHQPK7SMOUN7WAGDY.php` |
| 12 | [`2021-01-25-repas-crous-1-euro`](../base/2021-01-25-repas-crous-1-euro.md) | A | oui | 3 | `https://www.service-public.fr/particuliers/actualites/A14619` |
| 13 | [`2021-01-27-avis-cese-hcc-loi-climat`](../base/2021-01-27-avis-cese-hcc-loi-climat.md) | A | oui | 3 | `https://www.lecese.fr/travaux-publies/climat-neutralite-carbone-et-justice-sociale`<br>`https://www.hautconseilclimat.fr/publications/avis-sur-le-projet-de-loi-climat-et-resilience/` |
| 14 | [`2021-02-28-convention-citoyenne-note-gouvernement`](../base/2021-02-28-convention-citoyenne-note-gouvernement.md) | A | oui | 3 | `https://www.conventioncitoyennepourleclimat.fr/wp-content/uploads/2021/03/CCC-Session-8-Synthese-des-votes-VF.pdf` |
| 15 | [`2021-03-31-whirlpool-ageco-liquidation`](../base/2021-03-31-whirlpool-ageco-liquidation.md) | A | oui | 3 | `http://amiens.tribunal-administratif.fr/Actualites-du-Tribunal/Communiques-de-presse/Licenciements-de-salaries-de-la-societe-Whirlpool-France-a-Amiens`<br>`https://www.francebleu.fr/infos/economie-social/somme-liquidation-judiciaire-prononcee-pour-ageco-agencement-le-dernier-repreneur-de-whirlpool-amiens-1617208940` |
| 16 | [`2021-07-06-referendum-climat-enterre`](../base/2021-07-06-referendum-climat-enterre.md) | A | oui | 1? | `https://www.assemblee-nationale.fr/15/cri/2020-2021-extra/20210291.asp` |
| 17 | [`2022-04-29-demission-leggeri-frontex`](../base/2022-04-29-demission-leggeri-frontex.md) | A | oui | 2 | `https://frontex.europa.eu/media-centre/news/news-releases/management-board-takes-note-of-resignation-of-executive-director-of-frontex-3M3tS5` |
| 18 | [`2022-05-24-crise-recrutement-postes-non-pourvus`](../base/2022-05-24-crise-recrutement-postes-non-pourvus.md) | A | oui | 1? 2 | `https://www.senat.fr/notice-rapport/2023/r23-128-314-notice.html`<br>`https://www.senat.fr/rap/r21-902/r21-9021.html`<br>`https://www.education.gouv.fr/panorama-statistique-des-personnels-de-l-enseignement-scolaire-edition-2023` |
| 19 | [`2022-06-01-pnrr-enveloppe-revisee-37-5`](../base/2022-06-01-pnrr-enveloppe-revisee-37-5.md) | A | oui | 1? | `https://www.senat.fr/rap/l22-115-321/l22-115-32115.html` |
| 20 | [`2022-06-10-pfue-pacte-migration-step-by-step`](../base/2022-06-10-pfue-pacte-migration-step-by-step.md) | A | oui | 1? | `https://www.senat.fr/rap/r21-713/r21-7133.html` |
| 21 | [`2022-10-20-pnf-campagnes-2017-2022`](../base/2022-10-20-pnf-campagnes-2017-2022.md) | A | oui | 3 | `https://www.tribunal-de-paris.justice.fr/`<br>`https://www.asso-sherpa.org/affaire-mckinsey-sherpa-se-constitue-partie-civile`<br>`https://www.mediapart.fr/journal/france/240523/affaire-mckinsey-les-juges-enquetent-sur-le-recyclage-d-un-rapport-dans-le-programme-macron-2022` |
| 22 | [`2022-11-28-demission-cayeux-condamnation`](../base/2022-11-28-demission-cayeux-condamnation.md) | A | oui | 1? 3 | `https://www.hatvp.fr/communique/situation-de-mme-caroline-cayeux-la-haute-autorite-avise-le-procureur-de-la-republique/`<br>`https://actu.orange.fr/france/patrimoine-sous-evalue-l-ex-ministre-caroline-cayeux-condamnee-a-10-mois-de-prison-avec-sursis-magic-CNT000002dnK1z.html` |
| 23 | [`2023-02-07-deficit-commercial-record-2022`](../base/2023-02-07-deficit-commercial-record-2022.md) | A | oui | 3 | `https://www.douane.gouv.fr/actualites/le-commerce-exterieur-de-la-france-en-2022`<br>`https://www.insee.fr/fr/statistiques/7650395` |
| 24 | [`2023-02-16-bilan-rte-2022-importateur-net`](../base/2023-02-16-bilan-rte-2022-importateur-net.md) | A | oui | 3 | `https://www.rte-france.com/analyses-tendances-et-prospectives/bilan-electrique-francais/le-bilan-electrique-2022`<br>`https://www.cre.fr/publications/rapport-de-surveillance-des-marches-de-gros-de-lelectricite-et-du-gaz-naturel-pour-2022.html` |
| 25 | [`2023-03-25-sainte-soline-grenades`](../base/2023-03-25-sainte-soline-grenades.md) | A | oui | 1? 3 | `https://www.assemblee-nationale.fr/dyn/16/rapports/cegroupes/l16b1836_rapport-enquete`<br>`https://www.coe.int/fr/web/commissioner/-/france-the-authorities-must-respect-human-rights-during-protests`<br>`https://www.ldh-france.org/rapport-des-observateurs-et-observatrices-des-libertes-publiques-sur-les-evenements-de-sainte-soline/` |
| 26 | [`2023-06-27-qwant-cession-synfonium`](../base/2023-06-27-qwant-cession-synfonium.md) | A | oui | 3 | `https://www.caissedesdepots.fr/actualites/synfonium-la-caisse-des-depots-et-octave-et-miroslaw-klaba-sallient-pour-creer-un-acteur` |
| 27 | [`2023-07-10-zfe-videes-38-agglomerations`](../base/2023-07-10-zfe-videes-38-agglomerations.md) | A | oui | 2 | `https://www.ecologie.gouv.fr/comite-ministeriel-qualite-lair-ville-zfe` |
| 28 | [`2023-11-22-contrats-transition-ecologique-50-sites`](../base/2023-11-22-contrats-transition-ecologique-50-sites.md) | A | oui | 3 1? | `https://www.ecologie.gouv.fr/presse/signature-des-contrats-de-transition-ecologique-des-50-sites-industriels-les-plus-emetteurs`<br>`https://www.ccomptes.fr/fr/publications/les-aides-publiques-la-decarbonation-de-lindustrie` |
| 29 | [`2024-01-01-pouvoir-achat-rdb-dents-de-scie`](../base/2024-01-01-pouvoir-achat-rdb-dents-de-scie.md) | A | oui | 3 | `https://www.insee.fr/fr/statistiques/8181630`<br>`https://www.insee.fr/fr/statistiques/4472719` |
| 30 | [`2024-01-15-experimentation-tenue-unique`](../base/2024-01-15-experimentation-tenue-unique.md) | A | oui | 2 3 | `https://www.education.gouv.fr/tenue-unique-l-ecole-experimentation-de-deux-ans-dans-les-etablissements-volontaires-380185`<br>`https://www.info.gouv.fr/actualite/l-experimentation-de-la-tenue-unique-a-l-ecole-bientot-lancee` |
| 31 | [`2024-02-05-relaxe-bayrou-modem`](../base/2024-02-05-relaxe-bayrou-modem.md) | A | oui | 1? | `https://www.publicsenat.fr/actualites/politique/proces-des-assistants-d-eurodeputes-du-modem-francois-bayrou-relaxe-au-benefice-du-doute`<br>`https://www.publicsenat.fr/actualites/politique/proces-en-appel-du-modem-francois-bayrou-sera-re-juge-a-lautomne-2026` |
| 32 | [`2024-02-15-eolien-terrestre-objectif-manque`](../base/2024-02-15-eolien-terrestre-objectif-manque.md) | A | oui | 2 | `https://www.statistiques.developpement-durable.gouv.fr/tableau-de-bord-eolien-quatrieme-trimestre-2023` |
| 33 | [`2024-04-25-discours-sorbonne-ii`](../base/2024-04-25-discours-sorbonne-ii.md) | A | oui | 3 | `https://www.elysee.fr/emmanuel-macron/2024/04/25/declaration-du-president-emmanuel-macron-a-la-sorbonne-sur-leurope`<br>`https://www.euractiv.fr/section/defense/news/macron-pret-a-ouvrir-le-debat-sur-une-defense-europeenne-incluant-larme-nucleaire/` |
| 34 | [`2024-04-26-mgcs-protocole-franco-allemand`](../base/2024-04-26-mgcs-protocole-franco-allemand.md) | A | oui | 3 | `https://www.defense.gouv.fr/actualites/mgcs-signature-dun-accord-historique-char-du-futur` |
| 35 | [`2024-05-06-ecophyto-2030-changement-indicateur`](../base/2024-05-06-ecophyto-2030-changement-indicateur.md) | A | oui | 2 | `https://agriculture.gouv.fr/lancement-de-la-strategie-ecophyto-2030`<br>`https://agriculture.gouv.fr/indicateurs-de-suivi-des-produits-phytopharmaceutiques-pour-lannee-2023` |
| 36 | [`2024-06-20-hcc-baisse-2023-conjoncturelle`](../base/2024-06-20-hcc-baisse-2023-conjoncturelle.md) | A | oui | 3 | `https://www.hautconseilclimat.fr/publications/rapport-annuel-2024-grand-public-accelerer-la-transition-juste-face-aux-impacts-du-changement-climatique/`<br>`https://www.citepa.org/fr/barometre-emissions/` |
| 37 | [`2024-07-26-procedure-deficit-excessif-france`](../base/2024-07-26-procedure-deficit-excessif-france.md) | A | oui | 2 | `https://www.consilium.europa.eu/fr/press/press-releases/2024/07/26/excessive-deficit-procedure-council-establishes-the-existence-of-excessive-deficits-for-seven-member-states/` |
| 38 | [`2024-10-01-deficit-3-pourcent-reporte-2029`](../base/2024-10-01-deficit-3-pourcent-reporte-2029.md) | A | oui | 1? 2 | `https://www.assemblee-nationale.fr/dyn/17/comptes-rendus/seance/session-ordinaire-de-2024-2025/premiere-seance-du-mardi-01-octobre-2024`<br>`https://www.economie.gouv.fr/files/files/2024/PSMT_2024.pdf` |
| 39 | [`2024-10-15-etat-actionnaire-2024`](../base/2024-10-15-etat-actionnaire-2024.md) | A | oui | 2 | `https://www.economie.gouv.fr/rapport-relatif-a-letat-actionnaire-2024` |
| 40 | [`2024-10-24-parcoursup-bilan-chiffres`](../base/2024-10-24-parcoursup-bilan-chiffres.md) | A | oui | 2 | `https://www.enseignementsup-recherche.gouv.fr/fr/parcoursup-2024-bilan-de-la-procedure-d-admission-97621`<br>`https://www.enseignementsup-recherche.gouv.fr/fr/parcoursup-2024-les-propositions-d-admission-dans-l-enseignement-superieur-97554`<br>`https://www.enseignementsup-recherche.gouv.fr/fr/remise-du-sixieme-rapport-annuel-du-comite-ethique-et-scientifique-de-parcoursup-cesp-95024` |
| 41 | [`2024-10-31-assistants-medicaux-partiel`](../base/2024-10-31-assistants-medicaux-partiel.md) | A | oui | 3 | `https://www.ameli.fr/medecin/actualites/assistants-medicaux-bilan-dun-dispositif-qui-fait-ses-preuves` |
| 42 | [`2024-11-01-minima-sociaux-effet-pauvrete-drees`](../base/2024-11-01-minima-sociaux-effet-pauvrete-drees.md) | A | oui | 3 | `https://drees.solidarites-sante.gouv.fr/publications-communique-de-presse/panoramas-de-la-drees/minima-sociaux-et-prestations-de-solidarite-0` |
| 43 | [`2024-12-18-caa-bordeaux-annule-sainte-soline`](../base/2024-12-18-caa-bordeaux-annule-sainte-soline.md) | A | oui | 3 | `https://bordeaux.cour-administrative-appel.fr/decisions-marquantes/reserves-de-substitution-de-la-sevre-niortaise-et-du-mignon` |
| 44 | [`2024-12-19-convention-assurance-chomage-2024-seniors`](../base/2024-12-19-convention-assurance-chomage-2024-seniors.md) | A | oui | 3 | `https://www.unedic.org/publications/trajectoire-financiere-de-lassurance-chomage-2023-2026` |
| 45 | [`2024-12-21-epr-flamanville-couplage-reseau`](../base/2024-12-21-epr-flamanville-couplage-reseau.md) | A | oui | 3 | `https://www.edf.fr/groupe-edf/espaces-medias/communiques-de-presse/lepr-de-flamanville-3-connecte-avec-succes-au-reseau-electrique-national`<br>`https://www.edf.fr/groupe-edf/espaces-medias/communiques-de-presse/lepr-de-flamanville-atteint-sa-pleine-puissance` |
| 46 | [`2025-01-21-conseil-trajectoire-contraignante-2029`](../base/2025-01-21-conseil-trajectoire-contraignante-2029.md) | A | oui | 2 1? | `https://www.consilium.europa.eu/en/press/press-releases/2025/01/21/economic-governance-council-adopts-recommendations-for-seven-member-states-to-correct-their-excessive-deficits/`<br>`https://economy-finance.ec.europa.eu/system/files/2025-01/com_2025_recommendation_france_en.pdf`<br>`https://www.senat.fr/rap/r24-789/r24-789.html` |
| 47 | [`2025-04-23-arcelormittal-pse-react`](../base/2025-04-23-arcelormittal-pse-react.md) | A | oui | 3 | `http://montreuil.tribunal-administratif.fr/Actualites-du-Tribunal/Communiques-de-presse/Plan-de-sauvegarde-de-l-emploi-de-la-societe-ArcelorMittal-France` |
| 48 | [`2025-06-23-maprimerenov-suspension-guichet`](../base/2025-06-23-maprimerenov-suspension-guichet.md) | A | oui | 1? 3 | `https://www.publicsenat.fr/actualites/politique/ma-prime-renov-suspension-temporaire-de-laide-dampleur`<br>`https://www.ecologie.gouv.fr/presse/anah-presente-son-bilan-dactivite-2025-et-perspectives-2026` |
| 49 | [`2025-06-25-retailleau-faeser-reglement-retour`](../base/2025-06-25-retailleau-faeser-reglement-retour.md) | A | oui | 3 | `https://www.interieur.gouv.fr/actualites/communiques-de-presse/communique-conjoint-de-bruno-retailleau-ministre-de-linterieur-et-de-nancy-faeser-ministre-federale-de-linterieur-et-du-territoire` |
| 50 | [`2025-10-22-etat-ponctionne-unedic`](../base/2025-10-22-etat-ponctionne-unedic.md) | A | oui | 3 | `https://www.unedic.org/publications/trajectoire-financiere-de-lassurance-chomage-2023-2026` |
| 51 | [`2025-11-25-commission-budget-2026-conforme`](../base/2025-11-25-commission-budget-2026-conforme.md) | A | oui | 2 | `https://economy-finance.ec.europa.eu/system/files/2025-11/c_2025_9057_en.pdf`<br>`https://economy-finance.ec.europa.eu/euro-area-surveillance/draft-budgetary-plans/draft-budgetary-plans-2026_en` |
| 52 | [`2025-12-01-prisons-15000-places-36-pourcent`](../base/2025-12-01-prisons-15000-places-36-pourcent.md) | A | oui | 1? | `https://www.ccomptes.fr/fr/publications/le-programme-immobilier-penitentiaire`<br>`https://www.ccomptes.fr/fr/publications/audit-flash-plan-15000-places-de-prison` |
| 53 | [`2025-12-17-cloud-confiance-s3ns-bleu`](../base/2025-12-17-cloud-confiance-s3ns-bleu.md) | A | oui | 3 1? | `https://www.s3ns.io/fr/presse-actualites/s3ns-obtient-la-qualification-secnumcloud-pour-son-offre-premi3ns`<br>`https://www.assemblee-nationale.fr/dyn/17/rapports/ce-depnum/l17b0123_rapport-enquete` |
| 54 | [`2026-02-05-balance-commerciale-2025`](../base/2026-02-05-balance-commerciale-2025.md) | A | oui | 3 | `https://www.douane.gouv.fr/actualites/le-commerce-exterieur-de-la-france-en-2025`<br>`https://www.destatis.de/EN/Press/2026/02/PE26_046_51.html` |
| 55 | [`2026-02-12-bilan-anah-maprimerenov`](../base/2026-02-12-bilan-anah-maprimerenov.md) | A | oui | 3 | `https://www.ecologie.gouv.fr/presse/anah-presente-son-bilan-dactivite-2025-et-perspectives-2026`<br>`https://www.anah.gouv.fr/actualites/bilan-dactivite-2025-de-lanah` |
| 56 | [`2026-04-01-cour-comptes-amendes-forfaitaires`](../base/2026-04-01-cour-comptes-amendes-forfaitaires.md) | A | oui | 1? | `https://www.ccomptes.fr/fr/publications/lamende-forfaitaire-delictuelle` |
| 57 | [`2026-06-16-ralentissement-decarbonation`](../base/2026-06-16-ralentissement-decarbonation.md) | A | oui | 3 | `https://www.citepa.org/fr/secten-2026/`<br>`https://www.citepa.org/fr/barometre-emissions/` |
| 58 | [`2026-06-30-bilan-flux-migratoires`](../base/2026-06-30-bilan-flux-migratoires.md) | A | oui | 3 | `https://www.interieur.gouv.fr/actualites/communiques-de-presse/statistiques-de-limmigration-pour-lannee-2025`<br>`https://www.interieur.gouv.fr/actualites/communiques-de-presse/statistiques-definitives-de-limmigration-pour-lannee-2024`<br>`https://www.ofpra.gouv.fr/presse/les-statistiques-de-lasile-en-2025-a-lofpra` |
| 59 | [`2026-07-09-ssmsi-bilan-delinquance`](../base/2026-07-09-ssmsi-bilan-delinquance.md) | A | oui | 2 | `https://www.interieur.gouv.fr/Interstats/Publications-du-SSMSI/Insurecite-et-delinquance-en-2025-bilan-statistique` |
| 60 | [`2018-02-08-police-securite-quotidien`](../base/2018-02-08-police-securite-quotidien.md) | B | oui | 1? | `https://www.senat.fr/rap/a22-119-3/a22-119-3.html` |
| 61 | [`2018-12-01-mort-zineb-redouane`](../base/2018-12-01-mort-zineb-redouane.md) | B | oui | 3 | `https://www.amnesty.fr/focus/justice/affaire-zineb-redouane-mise-en-examen-policier` |
| 62 | [`2019-05-14-convocations-dgsi-disclose`](../base/2019-05-14-convocations-dgsi-disclose.md) | B | oui | 3 | `https://www.amnesty.org/fr/latest/news/2019/05/france-journalists-summoned-by-intelligence-services-must-not-be-prosecuted-for-doing-their-jobs/`<br>`https://cpj.org/2019/05/french-counterintelligence-services-summon-three/`<br>`https://www.ldh-france.org/auditions-de-journalistes-par-la-dgsi-la-ldh-denonce-les-atteintes-au-secret-des-sources/` |
| 63 | [`2020-06-17-alliance-vaccins-mandat-commission`](../base/2020-06-17-alliance-vaccins-mandat-commission.md) | B | oui | 3 | `https://www.telos-eu.com/fr/societe/les-vaccins-et-le-role-de-lalliance-inclusive-pou.html` |
| 64 | [`2020-09-03-annulation-partielle-correction-pac-corse`](../base/2020-09-03-annulation-partielle-correction-pac-corse.md) | B | oui | 1-CELEX | `https://curia.europa.eu/juris/document/document.jsf?text=&docid=230588&pageIndex=0&doclang=FR` |
| 65 | [`2020-10-15-igpn-gilets-jaunes-classements`](../base/2020-10-15-igpn-gilets-jaunes-classements.md) | B | oui | 3 | `https://lcp.fr/actualites/gilets-jaunes-l-igpn-a-traite-406-dossiers-205-ont-ete-classes-sans-suite-38258` |
| 66 | [`2021-07-02-black-star-bethune`](../base/2021-07-02-black-star-bethune.md) | B | oui | 3 | `https://www.journaldupneu.com/actualites/black-star-reprise-validee-par-le-tribunal-en-black-star-next`<br>`https://lagazettefrance.fr/nord-pas-de-calais/bethune-black-star-reprise-par-cedric-meston-91-emplois-sauves/` |
| 67 | [`2021-07-27-mise-en-examen-dati-renault`](../base/2021-07-27-mise-en-examen-dati-renault.md) | B | oui | 1? 3 | `https://www.publicsenat.fr/actualites/politique/rachida-dati-mise-en-examen-dans-l-affaire-renault-carlos-ghosn`<br>`https://www.rts.ch/info/monde/12376915-rachida-dati-mise-en-examen-pour-corruption-dans-laffaire-renaultghosn.html` |
| 68 | [`2021-12-16-bilan-cse-france-strategie`](../base/2021-12-16-bilan-cse-france-strategie.md) | B | oui | 2 3 | `https://www.strategie.gouv.fr`<br>`https://www.insee.fr/fr/statistiques/8205545` |
| 69 | [`2022-01-28-cjr-classement-plaintes-covid`](../base/2022-01-28-cjr-classement-plaintes-covid.md) | B | oui | 1? 3 | `https://www.senat.fr/questions/base/2021/qSEQ210924765.html`<br>`https://www.euractiv.fr/` |
| 70 | [`2022-07-24-darmanin-macron-delinquance-etrangers`](../base/2022-07-24-darmanin-macron-delinquance-etrangers.md) | B | oui | 2 | `https://www.interieur.gouv.fr/Interstats/Actualites/Interstats-Analyse-No-53-Les-etrangers-mis-en-cause-dans-les-crimes-et-delits-enregistres-en-2022` |
| 71 | [`2022-12-01-f-35-partenaires-europeens`](../base/2022-12-01-f-35-partenaires-europeens.md) | B | oui | 3 | `https://www.defensenews.com/air/2024/01/29/czech-republic-signs-deal-to-buy-24-f-35-fighter-jets/` |
| 72 | [`2023-05-01-10000-policiers-attrition`](../base/2023-05-01-10000-policiers-attrition.md) | B | oui | 1? | `https://www.senat.fr/rap/a22-119-3/a22-119-3.html`<br>`https://www.ccomptes.fr/fr/publications/le-programme-immobilier-penitentiaire` |
| 73 | [`2023-05-01-smic-sans-coup-de-pouce`](../base/2023-05-01-smic-sans-coup-de-pouce.md) | B | oui | 3 | `https://www.service-public.fr/particuliers/vosdroits/F2300` |
| 74 | [`2023-06-15-cjue-eaux-residuaires-urbaines`](../base/2023-06-15-cjue-eaux-residuaires-urbaines.md) | B | oui | 1-CELEX | `https://curia.europa.eu/juris/document/document.jsf?text=&docid=274681&pageIndex=0&doclang=FR` |
| 75 | [`2023-07-04-macron-couper-reseaux-sociaux`](../base/2023-07-04-macron-couper-reseaux-sociaux.md) | B | oui | 3 1? | `https://www.euractiv.fr/section/droits-de-lhomme/news/emeutes-emmanuel-macron-evoque-une-possible-coupure-des-reseaux-sociaux/`<br>`https://www.publicsenat.fr/actualites/politique/emeutes-macron-envisage-de-couper-les-reseaux-sociaux-quand-les-choses-semblent-s-emballer-les-senateurs-partages` |
| 76 | [`2023-09-19-garde-a-vue-ariane-lavrilleux`](../base/2023-09-19-garde-a-vue-ariane-lavrilleux.md) | B | oui | 3 | `https://www.fidh.org/fr/regions/europe-asie-centrale/france/la-journaliste-ariane-lavrilleux-remise-en-liberte-apres-39-heures-de`<br>`https://disclose.ngo/fr/article/affaire-sirli-la-cour-d-appel-de-paris-ordonne-la-reouverture-de-l-instruction-contre-ariane-lavrilleux`<br>`https://www.reporters-sans-frontieres.org/fr/liberte-de-la-presse-rsf-denonce-la-reouverture-de-l-instruction-contre-ariane-lavrilleux` |
| 77 | [`2024-04-30-retention-cra-duree`](../base/2024-04-30-retention-cra-duree.md) | B | oui | 3 | `https://www.lacimade.org/rapport-sur-les-centres-et-locaux-de-retention-administrative-en-2023/` |
| 78 | [`2024-09-10-vencorex-liquidation-borsodchem`](../base/2024-09-10-vencorex-liquidation-borsodchem.md) | B | oui | 3 | `https://www.presences-grenoble.fr/actualites-economie-isere/vencorex-abandon-du-projet-exalia-pont-de-claix` |
| 79 | [`2024-09-20-relaxe-chassaing-steve`](../base/2024-09-20-relaxe-chassaing-steve.md) | B | oui | 3 | `https://www.francetvinfo.fr/faits-divers/mort-de-steve-a-nantes/mort-de-steve-maia-canico-le-commissaire-de-police-gregoire-chassaing-relaxe_6792618.html` |
| 80 | [`2024-12-31-vacance-postes-infirmiers-fhf`](../base/2024-12-31-vacance-postes-infirmiers-fhf.md) | B | oui | 3 | `https://www.fhf.fr/actualites-presse/communiques-de-presse/conference-de-presse-de-rentree-de-la-fhf-situation-financiere-et-rh-des-hopitaux` |
| 81 | [`2025-01-23-circulaire-retailleau`](../base/2025-01-23-circulaire-retailleau.md) | B | oui | 3 | `https://www.gisti.org/IMG/pdf/circ_2025-01-23.pdf` |
| 82 | [`2025-07-10-brav-m-condamnations`](../base/2025-07-10-brav-m-condamnations.md) | B | oui | 3 | `https://www.ldh-france.org/brav-m-condamnation-bobigny-juillet-2025/` |
| 83 | [`2025-10-22-pfizergate-volet-penal-belge-clos`](../base/2025-10-22-pfizergate-volet-penal-belge-clos.md) | B | oui | 3 | `https://www.euractiv.com/section/health-consumers/news/belgian-supreme-court-dismisses-pfizergate-criminal-complaint-against-von-der-leyen/` |
| 84 | [`2026-06-01-choose-france-2026-93-mds`](../base/2026-06-01-choose-france-2026-93-mds.md) | B | oui | 3 1? | `https://www.entreprises.gouv.fr/fr/actualites/politique-industrielle/attractivite/9e-sommet-choose-france-des-investissements-records-pour-la-reindustrialisation-de-la-france`<br>`https://www.publicsenat.fr/actualites/economie/93-milliards-deuros-dinvestissements-et-15-600-emplois-promis-les-chiffres-records-du-sommet-choose-france`<br>`https://gomet.net/carbon-giga-usine-photovoltaique-fos-liquidation/` |
| 85 | [`2019-12-19-condamnations-policiers-tardives`](../base/2019-12-19-condamnations-policiers-tardives.md) | C | oui | 3 | `https://www.amnesty.fr/liberte-d-expression/actualites/violences-policieres-premieres-condamnations` |
| 86 | [`2022-05-29-ge-belfort-transferts-fiscaux`](../base/2022-05-29-ge-belfort-transferts-fiscaux.md) | C | oui | 3 | `https://disclose.ngo/fr/article/general-electric-800-millions-d-euros-transferes-de-france-vers-des-paradis-fiscaux/`<br>`https://www.cfecgc.org/actualites/ge-belfort-le-redressement-fiscal-de-212-millions-deuros-notifie-par-bercy-donne-raison-a-la-cfe-cgc` |
| 87 | [`2024-02-01-plus-personne-a-la-rue-echec`](../base/2024-02-01-plus-personne-a-la-rue-echec.md) | C | oui | 3 | `https://www.fondation-abbe-pierre.fr/documents/pdf/29e_rapport_sur_letat_du_mal-logement_en_france_2024.pdf` |
| 88 | [`2024-10-24-eramet-relieve-suspension`](../base/2024-10-24-eramet-relieve-suspension.md) | C | oui | 3 | `https://www.vipress.net/eramet-et-suez-suspendent-leur-projet-de-recyclage-de-batteries-a-dunkerque/` |
| 89 | [`2026-05-15-barometre-ey-ide`](../base/2026-05-15-barometre-ey-ide.md) | C | oui | 3 | `https://www.ey.com/fr_fr/attractiveness/barometre-ey-de-l-attractivite-de-la-france-2026` |
| 90 | [`2022-09-23-mise-en-examen-kohler`](../base/2022-09-23-mise-en-examen-kohler.md) | B | — | 3 | `https://www.anticor.org/2026/07/02/communique-de-presse-affaire-kohler-une-interpretation-scandaleuse-de-la-prescription-par-la-cour-dappel-de-paris/` |
