/* Interactivité commune aux briefs de domaine : cartouche au survol, filtres.
   Extrait des pages le 09/08/2026, au deuxième brief : le code ne portait rien
   de propre à un domaine, il lit window.BRIEF que le build injecte juste
   au-dessus. Quinze copies auraient dérivé à la première correction oubliée.

   Ce que ce fichier n'a PAS le droit de faire : produire du contenu. Le
   registre, les chiffres et les intitulés du jugement sont écrits en HTML
   statique par l'émetteur, parce qu'ils doivent exister sans JavaScript — c'est
   la raison d'être du brief côté référencement. Ce script n'ajoute que des
   états, et tout ce qu'il pilote est marqué hidden tant qu'il n'a pas tourné.

   Script classique et non module ES : la page doit s'ouvrir en file://, où un
   module serait refusé par la politique d'origine. */

(function () {
  var B = window.BRIEF;
  if (!B) return;
  var slugs = Object.keys(B.fiches);

  /* --- cartouche : le détail d'une pièce, au survol comme au clic --- */
  var cartouche = document.getElementById("cartouche");
  var frise = document.querySelector(".b-frise");
  cartouche.hidden = false;

  function bloc(tag, classe, texte) {
    var el = document.createElement(tag);
    el.className = classe;
    el.textContent = texte;
    return el;
  }

  function montrer(slug) {
    var f = B.fiches[slug];
    if (!f) return;
    cartouche.classList.toggle("est-citee", f.c);
    var meta = document.createElement("p");
    meta.className = "b-c-meta";
    meta.append(bloc("span", "", f.ty), bloc("span", "", "grade " + f.g));
    if (f.c) meta.append(bloc("span", "b-c-porte", "invoquée par le jugement"));
    cartouche.replaceChildren(bloc("p", "b-c-date", f.d), bloc("p", "b-c-titre", f.t), meta);
  }

  frise.addEventListener("mouseover", function (e) {
    var b = e.target.closest("[data-slug]");
    if (b) montrer(b.dataset.slug);
  });
  frise.addEventListener("click", function (e) {
    var b = e.target.closest("[data-slug]");
    if (!b) return;
    frise.querySelectorAll('[aria-current="true"]').forEach(function (x) { x.removeAttribute("aria-current"); });
    b.setAttribute("aria-current", "true");
    montrer(b.dataset.slug);
  });
  frise.addEventListener("focusin", function (e) {
    var b = e.target.closest("[data-slug]");
    if (b) montrer(b.dataset.slug);
  });

  /* --- filtres : construits depuis les données, jamais écrits en dur --- */
  var parType = {};
  slugs.forEach(function (s) {
    var k = B.fiches[s].tyk;
    parType[k] = (parType[k] || []).concat(s);
  });
  var choix = [{ cle: "tous", libelle: "Tout", n: slugs.length }];
  Object.keys(parType).sort(function (a, b) { return parType[b].length - parType[a].length; })
    .forEach(function (k) {
      choix.push({ cle: "type:" + k, libelle: B.fiches[parType[k][0]].ty + "s", n: parType[k].length });
    });
  choix.push({ cle: "citees", libelle: "Invoquées par le jugement", n: B.compteurs.citees });

  var barre = document.getElementById("filtres");
  var actif = "tous";

  function appliquer(cle) {
    actif = cle;
    barre.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.cle === cle));
    });
    document.querySelectorAll("[data-slug], .b-reg-ligne").forEach(function (el) {
      var slug = el.dataset.slug;
      var ty = slug ? B.fiches[slug].tyk : el.dataset.type;
      var citee = slug ? B.fiches[slug].c : el.classList.contains("est-citee");
      var garde = cle === "tous" || (cle === "citees" ? citee : cle === "type:" + ty);
      el.classList.toggle("est-masquee", !garde);
    });
  }

  choix.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "b-filtre";
    b.dataset.cle = c.cle;
    b.setAttribute("aria-pressed", String(c.cle === actif));
    b.textContent = c.libelle + " (" + c.n + ")";
    b.addEventListener("click", function () { appliquer(c.cle); });
    barre.appendChild(b);
  });
  barre.hidden = false;
})();
