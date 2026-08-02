#!/bin/bash
# Lance un run de recherche approfondie sur un domaine du dossier, en headless.
#
# Usage : run-domaine.sh <slug-domaine>
#         le fichier runs/<slug>.sujet doit exister (voir les deux exemples
#         versionnés à côté : institutions.sujet, securite-civile.sujet).
#
# Ce script est publié à titre documentaire : il montre comment les runs de
# recherche ont réellement été lancés. Il a été paramétré pour être portable
# (les chemins machine d'origine ont été remplacés par des variables), mais il
# suppose installés le CLI `claude` et le CLI `agy` (Antigravity), ainsi que le
# plugin erom-research. Voir CLAUDE.md à la racine du dépôt.
#
# Ce que le run NE fait PAS : l'ingestion. Elle reste manuelle, en session,
# parce que c'est là que se corrigent les identifiants inventés, les grades
# trop généreux et les doublons. Le run livre le rapport brut, rien d'autre.
set -uo pipefail

# Lancé par un ordonnanceur (launchd, cron), le script n'hérite que d'un PATH
# minimal : les CLI installés dans ~/.local/bin y sont invisibles. D'où le PATH
# explicite ci-dessous, surchargeable par l'environnement.
export PATH="${RUN_PATH:-$HOME/.local/bin:$HOME/.bun/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin}"
[ -f "$HOME/.zshenv" ] && . "$HOME/.zshenv" 2>/dev/null || true

CLAUDE_BIN="${CLAUDE_BIN:-$(command -v claude || echo "$HOME/.local/bin/claude")}"
AGY_BIN="${AGY_BIN:-$(command -v agy || echo "$HOME/.local/bin/agy")}"

SLUG="${1:?usage: run-domaine.sh <slug-domaine>}"
REPO="${REPO:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

# Préflight : un binaire manquant doit produire un échec explicite, jamais un
# silence qui ressemble à un run sans travail.
for BIN in "$CLAUDE_BIN" "$AGY_BIN"; do
  [ -x "$BIN" ] || { echo "RUN_STATUS: fail (binaire introuvable ou non exécutable: $BIN)"; exit 1; }
done
"$AGY_BIN" --version >/dev/null 2>&1 || { echo "RUN_STATUS: fail (agy ne répond pas, authentification expirée ?)"; exit 1; }

SUJET_FILE="$REPO/atelier/runs/$SLUG.sujet"
[ -f "$SUJET_FILE" ] || { echo "RUN_STATUS: fail (sujet introuvable: $SUJET_FILE)"; exit 1; }
SUJET="$(cat "$SUJET_FILE")"

PROMPT="Dossier documentaire sur les deux quinquennats Macron. Le lancement de ce run est validé en amont : ne pose AUCUNE question, n'attends aucune validation, applique l'option sûre en cas d'ambiguïté et note-la dans ton rapport final.

Tâche unique : invoque la skill erom-research:agy via le tool Skill, avec exactement ces arguments (le --yes est obligatoire, il saute le gate de plan qui bloquerait un run sans humain) :

--depth H --yes ${SUJET}

Ensuite, et seulement ensuite :
1. Copie le rapport rendu vers atelier/research/${SLUG}.md
2. Ajoute une ligne de suivi dans atelier/chronologie.md, colonne recherche du domaine ${SLUG} : remplace la case par un résumé au format des autres lignes (date, depth H, nombre de rounds, convergé ou non, angles aboutis sur total, nombre de sources, nombre de pièces, état de la passe adversariale).
3. Commit limité à atelier/, message commençant par 'run ${SLUG} (recherche seule, ingestion à suivre)'.

INTERDIT dans ce run : créer ou modifier la moindre fiche dans base/. L'ingestion est faite à la main, parce qu'elle exige des sondages de vérification que ce run ne peut pas rendre. Tu livres le rapport brut, rien d'autre.

Termine ta réponse par une ligne unique et exacte :
RUN_STATUS: ok|nothing|fail (une phrase de contexte)"

cd "$REPO" || exit 1
# bypassPermissions est ce qui rend le run possible sans humain devant. À ne
# jamais employer sur un run qui écrirait dans base/ : d'où l'interdit ci-dessus.
exec "$CLAUDE_BIN" -p "$PROMPT" \
  --model claude-opus-5 \
  --effort high \
  --permission-mode bypassPermissions \
  --output-format json
