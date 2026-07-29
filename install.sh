#!/usr/bin/env bash
#
# Installer za javne skille, agente, slash ukaze, pravila in hooke iz
# https://github.com/Acenta-Radovljica/claude-setup-showcase
#
# Idempotenten in nedestruktiven:
#   - prepiše SAMO tisto, kar izrecno zahtevaš po imenu
#   - nikoli ne pobriše tvojih ostalih skillov, agentov ali nastavitev
#   - se ne dotakne settings.json, CLAUDE.md ali tvojega spomina
#   - pred prepisom naredi varnostno kopijo v ~/.claude/.showcase-backup/<datum>/
#
# Uporaba:
#   bash install.sh --list                 # kaj je na voljo
#   bash install.sh transcreate verifier   # namesti po imenu (skill ali agent)
#   bash install.sh --all                  # vsi skilli + agenti + ukazi
#   bash install.sh --skills               # samo skille
#   bash install.sh --rules --hooks        # pravila in hooke (izrecno, glej opombo spodaj)
#   bash install.sh --dry-run transcreate  # pokaži, kaj bi naredil
#
# Zahteve: git, bash. (Node ni potreben.)
#
set -euo pipefail

REPO_URL="https://github.com/Acenta-Radovljica/claude-setup-showcase.git"
CLAUDE_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$CLAUDE_DIR/.showcase-backup/$STAMP"
DRY=0

say()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m  ✓\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m  !\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m  ✖\033[0m %s\n' "$*" >&2; exit 1; }

command -v git >/dev/null 2>&1 || die "Potreben je git. Namesti ga in ponovi."

# --- vir: lokalni checkout ali svež shallow clone ---------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd || echo '')"
if [ -n "$SCRIPT_DIR" ] && [ -d "$SCRIPT_DIR/skills" ] && [ -f "$SCRIPT_DIR/manifest.json" ]; then
  SRC="$SCRIPT_DIR"
  say "Uporabljam lokalni checkout: $SRC"
else
  TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
  say "Prenašam iz $REPO_URL ..."
  git clone --depth 1 --quiet "$REPO_URL" "$TMP/repo" || die "Klon ni uspel."
  SRC="$TMP/repo"
fi

list_dir()  { [ -d "$SRC/$1" ] && ls -1 "$SRC/$1" 2>/dev/null || true; }
list_files(){ [ -d "$SRC/$1" ] && (cd "$SRC/$1" && ls -1 *.md 2>/dev/null | sed 's/\.md$//') || true; }

SKILLS_AVAIL="$(list_dir skills)"
AGENTS_AVAIL="$(list_files agents)"
CMDS_AVAIL="$(list_files commands)"
RULES_AVAIL="$(list_dir rules)"
HOOKS_AVAIL="$(list_dir hooks)"

show_list() {
  echo
  printf '\033[1mSkilli\033[0m (%s)\n' "$(echo "$SKILLS_AVAIL" | grep -c . || true)"
  echo "$SKILLS_AVAIL" | sed 's/^/  /'
  echo
  printf '\033[1mAgenti\033[0m (%s)\n' "$(echo "$AGENTS_AVAIL" | grep -c . || true)"
  echo "$AGENTS_AVAIL" | sed 's/^/  /'
  echo
  printf '\033[1mSlash ukazi\033[0m (%s)\n' "$(echo "$CMDS_AVAIL" | grep -c . || true)"
  echo "$CMDS_AVAIL" | sed 's/^/  /'
  echo
  printf '\033[1mPravila\033[0m\n'; echo "$RULES_AVAIL" | sed 's/^/  /'
  printf '\033[1mHooki\033[0m\n';   echo "$HOOKS_AVAIL" | sed 's/^/  /'
  echo
  echo "Namesti z:  bash install.sh <ime> [<ime> ...]   ali   bash install.sh --all"
}

# --- razčleni argumente -----------------------------------------------------
WANT_SKILLS=(); WANT_AGENTS=(); WANT_CMDS=(); WANT_RULES=(); WANT_HOOKS=()
ALL=0; ONLY=""

ARGS=()
for a in "$@"; do
  case "$a" in
    --dry-run) DRY=1 ;;
    --list|-l) show_list; exit 0 ;;
    --all|-a)  ALL=1 ;;
    --skills)   ONLY="skills" ;;
    --agents)   ONLY="agents" ;;
    --commands) ONLY="commands" ;;
    --rules)    ONLY="rules" ;;
    --hooks)    ONLY="hooks" ;;
    -h|--help) sed -n '2,25p' "${BASH_SOURCE[0]:-$0}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    -*) die "Neznana zastavica: $a" ;;
    *) ARGS+=("$a") ;;
  esac
done

in_list() { echo "$2" | grep -qxF "$1"; }

# Sprejmi celoten seznam v ciljno tabelo. $1 = ime tabele, $2 = seznam (po vrsticah).
take_all() {
  local target="$1" listing="$2" x
  while IFS= read -r x; do
    [ -n "$x" ] || continue
    eval "$target+=(\"\$x\")"
  done <<< "$listing"
}

# --all zajame skille, agente in ukaze. Pravila in hooki so izrecni (--rules / --hooks),
# ker sami po sebi ne začnejo delovati: pravilo mora vključiti tvoj CLAUDE.md,
# hook pa moraš povezati v settings.json.
if [ "$ALL" = "1" ]; then
  take_all WANT_SKILLS "$SKILLS_AVAIL"
  take_all WANT_AGENTS "$AGENTS_AVAIL"
  take_all WANT_CMDS   "$CMDS_AVAIL"
fi
case "$ONLY" in
  skills)   take_all WANT_SKILLS "$SKILLS_AVAIL" ;;
  agents)   take_all WANT_AGENTS "$AGENTS_AVAIL" ;;
  commands) take_all WANT_CMDS   "$CMDS_AVAIL" ;;
  rules)    take_all WANT_RULES  "$RULES_AVAIL" ;;
  hooks)    take_all WANT_HOOKS  "$HOOKS_AVAIL" ;;
esac

for a in "${ARGS[@]:-}"; do
  [ -z "$a" ] && continue
  base="${a#/}"                       # dovoli "/transcreate"
  if   in_list "$base" "$SKILLS_AVAIL"; then WANT_SKILLS+=("$base")
  elif in_list "$base" "$AGENTS_AVAIL"; then WANT_AGENTS+=("$base")
  elif in_list "$base" "$CMDS_AVAIL";   then WANT_CMDS+=("$base")
  elif in_list "$base" "$RULES_AVAIL" || in_list "$base.md" "$RULES_AVAIL"; then
       in_list "$base" "$RULES_AVAIL" && WANT_RULES+=("$base") || WANT_RULES+=("$base.md")
  elif in_list "$base" "$HOOKS_AVAIL"; then WANT_HOOKS+=("$base")
  else
    warn "'$a' ni na voljo v javnem repozitoriju (verjetno je interno). Poglej: bash install.sh --list"
  fi
done

TOTAL=$(( ${#WANT_SKILLS[@]} + ${#WANT_AGENTS[@]} + ${#WANT_CMDS[@]} + ${#WANT_RULES[@]} + ${#WANT_HOOKS[@]} ))
if [ "$TOTAL" = "0" ]; then
  warn "Nič izbranega."
  show_list
  exit 0
fi

say "Namestitev: ${#WANT_SKILLS[@]} skillov, ${#WANT_AGENTS[@]} agentov, ${#WANT_CMDS[@]} ukazov, ${#WANT_RULES[@]} pravil, ${#WANT_HOOKS[@]} hookov"
[ "$DRY" = "1" ] && say "DRY RUN — nič ne bo zapisano."

backup_path() {
  local target="$1"
  [ -e "$target" ] || return 0
  local rel="${target#$CLAUDE_DIR/}"
  [ "$DRY" = "1" ] && { warn "bi shranil kopijo: $rel"; return 0; }
  mkdir -p "$BACKUP/$(dirname "$rel")"
  cp -R "$target" "$BACKUP/$rel"
}

install_dir() {  # $1=podmapa, $2=ime
  local sub="$1" name="$2"
  local from="$SRC/$sub/$name" to="$CLAUDE_DIR/$sub/$name"
  [ -d "$from" ] || { warn "$sub/$name ni v viru"; return 0; }
  backup_path "$to"
  if [ "$DRY" = "1" ]; then ok "(dry) $sub/$name"; return 0; fi
  mkdir -p "$CLAUDE_DIR/$sub"
  rm -rf "$to"
  cp -R "$from" "$to"
  ok "$sub/$name"
}

install_file() { # $1=podmapa, $2=datoteka
  local sub="$1" file="$2"
  local from="$SRC/$sub/$file" to="$CLAUDE_DIR/$sub/$file"
  [ -f "$from" ] || { warn "$sub/$file ni v viru"; return 0; }
  backup_path "$to"
  if [ "$DRY" = "1" ]; then ok "(dry) $sub/$file"; return 0; fi
  mkdir -p "$CLAUDE_DIR/$sub"
  cp "$from" "$to"
  case "$file" in *.sh) chmod +x "$to" 2>/dev/null || true ;; esac
  ok "$sub/$file"
}

for s in "${WANT_SKILLS[@]:-}";  do [ -n "$s" ] && install_dir  skills "$s"; done
for a in "${WANT_AGENTS[@]:-}";  do [ -n "$a" ] && install_file agents "$a.md"; done
for c in "${WANT_CMDS[@]:-}";    do [ -n "$c" ] && install_file commands "$c.md"; done
for r in "${WANT_RULES[@]:-}";   do [ -n "$r" ] && install_file rules "$r"; done
for h in "${WANT_HOOKS[@]:-}";   do [ -n "$h" ] && install_file hooks "$h"; done

echo
if [ "$DRY" = "1" ]; then
  say "DRY RUN končan. Nič ni bilo spremenjeno."
  exit 0
fi
[ -d "$BACKUP" ] && say "Varnostna kopija prepisanega: $BACKUP"
say "Končano. Restartaj Claude Code, da se skilli in agenti naložijo."
echo "   Preveri:  ls $CLAUDE_DIR/skills | head"
echo
warn "Hooki se ne vklopijo sami — v settings.json jih moraš ročno povezati."
warn "Pravila v ~/.claude/rules/ delujejo samo, če jih tvoj CLAUDE.md vključi (npr. @~/.claude/rules/<ime>.md)."
