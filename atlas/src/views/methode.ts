import { A } from "../types";
import { h, badgeVerdict, footer, setTitle, VERDICT_LABELS } from "../ui";

const P = (html: string) => h("p", { html });

export function viewMethode(): HTMLElement {
  setTitle("Méthode");
  const fiches = Object.values(A.fiches);
  const nb = (g: string) => fiches.filter((f) => f.g === g).length;

  return h("div", { class: "view narrow" },
    h("div", { class: "page-title" }, "La méthode"),
    h("p", { class: "page-sub" }, "Comment ce dossier est construit, ce qu'il s'interdit, et ce qui le ferait changer d'avis."),

    h("div", { class: "prose", style: "margin-top:20px" },
      P("Ce site n'est pas un média et ne prétend pas à la neutralité d'un travail académique : c'est un <strong>dossier d'instruction personnel</strong>, construit pour éclairer un vote, et publié avec ses règles. Les règles ont été écrites avant les conclusions, et elles sont vérifiables sur chaque page : chaque affirmation renvoie à des pièces datées, sourcées et gradées ; les éléments à décharge sont instruits au même titre que les charges ; ce qui ne tient pas est écarté publiquement."),

      h("h2", {}, "Une pièce, une fiche"),
      P(`La base compte <strong>${fiches.length} fiches</strong>, de novembre 2015 (contexte antérieur au premier mandat) au 30 juillet 2026. Une fiche est une pièce du dossier : un fait daté, avec ses acteurs (président, ministres et leur portefeuille, gouvernement), ses sources et son grade de preuve. Quatre types : mesure, affaire, promesse, déclaration. Une règle absolue : <strong>jamais de jugement dans une fiche</strong>. Le factuel et l'appréciation vivent dans des documents séparés.`),

      h("h2", {}, "L'échelle des grades"),
      h("table", {},
        h("thead", {}, h("tr", {}, h("th", {}, "Grade"), h("th", {}, "Définition"), h("th", {}, "Dans la base"))),
        h("tbody", {},
          h("tr", {}, h("td", {}, h("strong", {}, "A")), h("td", {}, "Établi par jugement définitif ou document officiel (loi, décision de justice, rapport de la Cour des comptes, Journal officiel)"), h("td", { class: "mono" }, String(nb("A")))),
          h("tr", {}, h("td", {}, h("strong", {}, "B")), h("td", {}, "Documenté par plusieurs sources de presse indépendantes"), h("td", { class: "mono" }, String(nb("B")))),
          h("tr", {}, h("td", {}, h("strong", {}, "C")), h("td", {}, "Allégation à source unique"), h("td", { class: "mono" }, String(nb("C")))),
          h("tr", {}, h("td", {}, h("strong", {}, "D")), h("td", {}, "Rumeur"), h("td", { class: "mono" }, "0")),
        ),
      ),
      P("Le grade commande la force de l'affirmation : une pièce de grade <strong>C n'est jamais déterminante</strong> dans un verdict, et elle le dit sur sa propre page ; aucune pièce de grade D n'a été retenue dans la base. Les fiches C sont publiées quand même : un dossier qui cache ses pièces faibles est un dossier suspect."),

      h("h2", {}, "Le jugement contradictoire"),
      P("Chaque domaine reçoit une pièce de jugement en quatre temps : <strong>les charges qui tiennent</strong>, <strong>les décharges qui tiennent</strong>, <strong>ce qui est écarté</strong>, puis un <strong>verdict motivé</strong>. Le standard : chaque affirmation doit survivre à un contradicteur hostile ; chaque charge candidate subit quatre attaques (comparaison historique, biais de mesure, nature juridique exacte, solidité des pièces) avant d'être admise. Chaque paragraphe de charge se termine par ce qui la limite."),
      h("div", { style: "display:flex;gap:6px;flex-wrap:wrap;margin:14px 0" },
        ...Object.keys(VERDICT_LABELS).map((v) => badgeVerdict(v))),
      P("Le verdict se rend sur cette échelle commune à cinq niveaux. Elle n'est pas une machine à condamner : deux domaines sur quinze finissent <strong>mitigés</strong> (promesses, international), parce que leurs décharges compensent réellement, et un domaine instruit à charge peut finir favorable si les pièces l'imposent."),

      h("h2", {}, "La synthèse et ses fils"),
      P("La synthèse ne ré-instruit rien : elle lit les quinze jugements et n'a le droit d'affirmer que ce que portent des <strong>fils transverses</strong>, tenus à un standard propre : au moins deux domaines, des fiches d'appui distinctes (pour neutraliser le double comptage des fiches multi-domaines), une force commandée par le grade. Cinq fils à charge, quatre à décharge, et un verdict d'ensemble : <strong>défavorable</strong>."),
      P("Surtout, la synthèse nomme ses <strong>bascules</strong> : les événements précis qui, s'ils survenaient, feraient réviser le verdict vers le haut ou vers le bas. Un dossier qui dit ce qui le ferait changer d'avis est l'exact opposé d'un pamphlet."),

      h("h2", {}, "Ce que le dossier refuse de dire"),
      P("Sept récits à charge, pourtant à la mode, sont écartés nommément dans la synthèse : la « dérive autoritaire » (l'État de droit a tenu, une seule illégalité juridictionnellement établie en neuf ans), le « président des riches » comme explication totale, la « faute de l'Assemblée », la « faute des crises », le « bilan injugeable », le « rien n'a été fait », et toute lecture arithmétique du type « 13 verdicts sur 15 ». Le détail est dans la synthèse, section « Ce qui est écarté »."),
      P("Cinq <strong>retournements de charge</strong> sont assumés et publiés, parce qu'ils désamorcent les attaques les plus faciles : le 49.3 n'est pas une innovation macroniste et le record individuel reste Michel Rocard ; le volume d'ordonnances augmente depuis 2007 et son accélération maximale précède 2017 ; le rythme hebdomadaire des conseils de défense date de 2016 ; l'année 2022 des feux de forêt est un pic isolé et 2024 la campagne la plus calme ; une censure pour cavalier législatif n'est pas une censure de fond. Le dossier fournit lui-même les armes de sa contradiction : elles sont dans les pièces."),

      h("h2", {}, "Limites connues"),
      P("Le corpus du domaine international est plus mince que les autres (27 fiches, moteur de recherche différent). Certaines séries comparatives entre présidences n'existent pas publiquement (article 47-1, vote bloqué) : sur ces instruments, seuls des faits datés sont affirmés, jamais des records. Les verbatims les plus anciens sont parfois de grade B. Le dossier est arrêté au <strong>30 juillet 2026</strong> ; les procédures judiciaires pendantes (qui pourraient faire basculer des verdicts) sont listées dans les pièces concernées, et toute révision d'une pièce déclenche un re-examen de la synthèse."),

      h("h2", {}, "L'outillage, sans détour"),
      P("La recherche documentaire a été menée avec des agents d'intelligence artificielle : <strong>Antigravity</strong> (Google) pour quatorze domaines, <strong>Grok</strong> (SpaceXAI) pour l'international et <strong>Sonar-pro</strong> (Perplexity). Puis l'essentiel : chaque référence porteuse a été <strong>re-sondée à la source primaire</strong> (Légifrance, Journal officiel, Cour des comptes, INSEE, décisions de justice) en session pilotée avec <strong>Claude</strong> (Anthropic) ; les identifiants inventés par les moteurs de recherche ont été corrigés à la main, les pièces invérifiables dégradées ou écartées, et des passes contradictoires (« red team ») ont attaqué les conclusions avant qu'elles ne soient retenues. L'IA cherche et met en forme ; l'humain vérifie, arbitre et signe."),

      h("hr", { class: "sep" }),
      P(`<strong>Romain Ecarnot</strong>, avec l'aide de Claude (Anthropic), Antigravity (Google), Grok (SpaceXAI) et Sonar-pro (Perplexity). Dossier arrêté au ${A.buildDate}.`),
    ),
    footer(),
  );
}
