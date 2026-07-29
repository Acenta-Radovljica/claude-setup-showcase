#!/usr/bin/env node
/**
 * Builds index.html for the Claude Code setup showcase, straight from ~/.claude.
 *
 * Why generated and not hand-written: a hand-maintained showcase drifts from the
 * real setup the moment a skill changes. This reads the live files, so the site
 * cannot lie about what is installed.
 *
 * Two tiers, driven by manifest.json:
 *   public   -> files are copied into this repo and are installable
 *   internal -> card + curated blurb only; NO file ever leaves ~/.claude
 *
 * A sanitizer gate runs last. If anything sensitive reaches the output, the
 * build fails instead of publishing it.
 *
 * Usage: node build.mjs [--no-sync]
 */
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { join, relative, dirname, extname, posix } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const CLAUDE = process.env.CLAUDE_CONFIG_DIR || join(homedir(), '.claude');
const SYNC = !process.argv.includes('--no-sync');
const M = JSON.parse(readFileSync(join(ROOT, 'manifest.json'), 'utf8'));
const RAW = `https://raw.githubusercontent.com/${M.site.repo}/${M.site.branch}`;

const warn = [];
const log = (...a) => console.log(...a);

/* ------------------------------------------------------------------ *
 * Sensitivity patterns                                                *
 *                                                                     *
 * The pattern list itself is sensitive: it names clients, servers and  *
 * account ids. So it lives OUTSIDE this repo and is never committed.   *
 * No denylist -> no build. Failing closed beats publishing blind.      *
 *                                                                     *
 * HARD = build-breaking. SOFT = printed for a human to eyeball.        *
 * ------------------------------------------------------------------ */
const DENYLIST = process.env.SHOWCASE_DENYLIST || join(CLAUDE, 'showcase-denylist.json');

if (!existsSync(DENYLIST)) {
  console.error(`\n✖ Manjka seznam vzorcev: ${DENYLIST}`);
  console.error('  Brez njega se build ne zažene, ker ne bi mogel preveriti, kaj gre v javni repo.');
  console.error('  Naredi ga po vzoru denylist.example.json (in ga NE daj v repo).');
  console.error('  Drugo pot lahko podaš prek SHOWCASE_DENYLIST=<pot>.\n');
  process.exit(1);
}

function loadPatterns(key) {
  const raw = JSON.parse(readFileSync(DENYLIST, 'utf8'));
  const list = raw[key];
  if (!Array.isArray(list) || (key === 'hard' && list.length === 0)) {
    console.error(`\n✖ ${DENYLIST}: "${key}" mora biti neprazna tabela vzorcev.\n`);
    process.exit(1);
  }
  return list.map(p => {
    try { return [p.label || key, new RegExp(p.pattern, p.flags || 'g')]; }
    catch (e) { console.error(`\n✖ Neveljaven vzorec "${p.label}": ${e.message}\n`); process.exit(1); }
  });
}
const HARD = loadPatterns('hard');
const SOFT = loadPatterns('soft');

function scanText(txt, where) {
  const hard = [];
  for (const [label, re] of HARD) {
    const m = txt.match(new RegExp(re.source, re.flags));
    if (m) hard.push(`${label}: ${[...new Set(m.slice(0, 3))].join(', ')}`);
  }
  for (const [label, re] of SOFT) {
    const m = txt.match(new RegExp(re.source, re.flags));
    if (m) warn.push(`${where} — ${label}: ${[...new Set(m.slice(0, 3))].join(', ')}`);
  }
  return hard;
}

/* ------------------------------------------------------------------ *
 * Tiny markdown renderer (build-time, so the page ships zero deps)    *
 * ------------------------------------------------------------------ */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s) {
  return esc(s)
    .replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function md2html(src) {
  const lines = String(src).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0, list = null;

  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };

  while (i < lines.length) {
    const line = lines[i];

    // fenced code
    const fence = line.match(/^\s*```(\w*)/);
    if (fence) {
      closeList();
      const buf = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(`<pre class="code"><code>${esc(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // table
    if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|?\s*$/.test(lines[i + 1] || '')) {
      closeList();
      const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const head = cells(line);
      i += 2;
      const body = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) body.push(cells(lines[i++]));
      out.push(
        `<div class="tw"><table><thead><tr>${head.map(h => `<th>${inline(h)}</th>`).join('')}</tr></thead><tbody>` +
        body.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('') +
        `</tbody></table></div>`
      );
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { closeList(); const lv = Math.min(h[1].length + 1, 6); out.push(`<h${lv}>${inline(h[2])}</h${lv}>`); i++; continue; }

    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) { closeList(); out.push('<hr>'); i++; continue; }

    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    if (ul) {
      if (list !== 'ul') { closeList(); out.push('<ul>'); list = 'ul'; }
      out.push(`<li>${inline(ul[1])}</li>`); i++; continue;
    }
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ol) {
      if (list !== 'ol') { closeList(); out.push('<ol>'); list = 'ol'; }
      out.push(`<li>${inline(ol[1])}</li>`); i++; continue;
    }

    const bq = line.match(/^\s*>\s?(.*)$/);
    if (bq) { closeList(); out.push(`<blockquote>${inline(bq[1])}</blockquote>`); i++; continue; }

    if (!line.trim()) { closeList(); i++; continue; }

    closeList();
    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^\s*(#{1,6}\s|[-*+]\s|\d+[.)]\s|>|\||```)/.test(lines[i])) para.push(lines[i++]);
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  closeList();
  return out.join('\n');
}

/* ------------------------------------------------------------------ *
 * Reading ~/.claude                                                   *
 * ------------------------------------------------------------------ */
function frontmatter(txt) {
  const m = txt.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return [{}, txt];
  const fm = {};
  let key = null;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (kv) { key = kv[1]; fm[key] = kv[2]; }
    else if (key && /^\s+\S/.test(line)) fm[key] += ' ' + line.trim();
  }
  return [fm, txt.slice(m[0].length)];
}

function unquote(s = '') {
  s = s.trim();
  // YAML block scalars ("description: >-") leave the marker glued to the text.
  s = s.replace(/^[|>][-+]?\s*/, '');
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  return s.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Keep the page light: show the opening of a long doc, link the rest. */
function clip(body, max = 9000) {
  if (body.length <= max) return body;
  const cut = body.slice(0, max);
  const at = cut.lastIndexOf('\n#');
  return (at > max * 0.5 ? cut.slice(0, at) : cut) + '\n\n---\n\n*Prikazan je začetek. Cela datoteka je v repozitoriju.*';
}

/** First sentence-ish chunk of a description, before any <example> noise. */
function shortDesc(d = '') {
  const clean = unquote(d).split(/<example>/i)[0].trim();
  if (clean.length <= 190) return clean;
  const cut = clean.slice(0, 190);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' — '), cut.lastIndexOf('; '));
  return (stop > 90 ? cut.slice(0, stop + 1) : cut).trim() + ' …';
}

const SKIP_DIR = new Set(['__pycache__', 'node_modules', '.git', '.venv', 'venv']);
const SKIP_EXT = new Set(['.pyc', '.pyo', '.ttf', '.otf', '.woff', '.woff2', '.eot', '.zip', '.7z', '.gz', '.mp4', '.mov', '.psd', '.ai', '.sqlite', '.db']);
const MAX_FILE = 400 * 1024;

function walk(dir, base = dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, base, out);
    else out.push({ abs: p, rel: relative(base, p).split('\\').join('/') });
  }
  return out;
}

function shippable(f) {
  if (SKIP_EXT.has(extname(f.rel).toLowerCase())) return false;
  try { if (statSync(f.abs).size > MAX_FILE) return false; } catch { return false; }
  return true;
}

const TEXT_EXT = /\.(md|txt|json|csv|py|sh|mjs|cjs|js|ts|tsx|html|css|yml|yaml|ps1|bat)$/i;

/* ------------------------------------------------------------------ *
 * Collect items                                                       *
 * ------------------------------------------------------------------ */
const items = { skills: [], agents: [], commands: [] };
const hardFindings = [];
const syncPlan = []; // { from, to }

// --- skills ---
for (const [name, cfg] of Object.entries(M.skills)) {
  const dir = join(CLAUDE, 'skills', name);
  const skillMd = join(dir, 'SKILL.md');
  if (!existsSync(skillMd)) { log(`  [manjka] skill ${name} ni v ~/.claude/skills`); continue; }
  const raw = readFileSync(skillMd, 'utf8');
  const [fm, body] = frontmatter(raw);
  const files = walk(dir);
  const keep = files.filter(shippable);
  const dropped = files.length - keep.length;

  const item = {
    kind: 'skill', key: name, id: `skill-${name}`,
    title: '/' + name,
    icon: cfg.icon || '🧰',
    cat: cfg.cat || 'think',
    catLabel: (M.categories[cfg.cat] || {}).label || '',
    tier: cfg.tier,
    tags: cfg.tags || [],
    desc: cfg.tier === 'public' ? shortDesc(fm.description) : shortDesc(cfg.blurb || fm.description),
    files: files.length,
    kb: Math.round(files.reduce((a, f) => { try { return a + statSync(f.abs).size; } catch { return a; } }, 0) / 1024),
  };

  if (cfg.tier === 'public') {
    item.body = md2html(clip(body));
    item.src = `skills/${name}/SKILL.md`;
    item.fullDesc = unquote(fm.description);
    item.tree = keep.map(f => f.rel).sort().slice(0, 60);
    item.dropped = dropped;
    for (const f of keep) {
      if (!TEXT_EXT.test(f.rel)) { syncPlan.push({ from: f.abs, to: join(ROOT, 'skills', name, f.rel), binary: true }); continue; }
      const txt = readFileSync(f.abs, 'utf8');
      const bad = scanText(txt, `skills/${name}/${f.rel}`);
      if (bad.length) hardFindings.push(`skills/${name}/${f.rel} → ${bad.join(' | ')}`);
      syncPlan.push({ from: f.abs, to: join(ROOT, 'skills', name, f.rel) });
    }
  } else {
    // Internal: the curated blurb already shows as the description, so no body.
    item.body = '';
    item.why = cfg.why || '';
    item.fullDesc = cfg.blurb || '';
  }
  items.skills.push(item);
}

// --- agents ---
for (const [name, cfg] of Object.entries(M.agents)) {
  const p = join(CLAUDE, 'agents', `${name}.md`);
  if (!existsSync(p)) { log(`  [manjka] agent ${name}.md`); continue; }
  const raw = readFileSync(p, 'utf8');
  const [fm, body] = frontmatter(raw);
  const item = {
    kind: 'agent', key: name, id: `agent-${name}`,
    title: name, icon: cfg.icon || '🤖', tier: cfg.tier, tags: cfg.tags || [],
    model: fm.model || '', tools: unquote(fm.tools || ''),
    desc: cfg.tier === 'public' ? shortDesc(fm.description) : shortDesc(cfg.blurb),
    kb: Math.round(raw.length / 1024),
  };
  if (cfg.tier === 'public') {
    item.fullDesc = unquote(fm.description);
    item.body = md2html(clip(body));
    item.src = `agents/${name}.md`;
    const bad = scanText(raw, `agents/${name}.md`);
    if (bad.length) hardFindings.push(`agents/${name}.md → ${bad.join(' | ')}`);
    syncPlan.push({ from: p, to: join(ROOT, 'agents', `${name}.md`) });
  } else {
    item.body = '';
    item.why = cfg.why || '';
    item.fullDesc = cfg.blurb || '';
  }
  items.agents.push(item);
}

// --- commands ---
for (const [name, cfg] of Object.entries(M.commands)) {
  const p = join(CLAUDE, 'commands', `${name}.md`);
  if (!existsSync(p)) { log(`  [manjka] command ${name}.md`); continue; }
  const raw = readFileSync(p, 'utf8');
  const [fm, body] = frontmatter(raw);
  const item = {
    kind: 'command', key: name, id: `cmd-${name}`,
    title: '/' + name, icon: cfg.icon || '⌨️', tier: cfg.tier, tags: [],
    desc: shortDesc(fm.description || body.split('\n').find(l => l.trim()) || ''),
    fullDesc: unquote(fm.description || ''),
    body: md2html(clip(body)),
    src: `commands/${name}.md`,
    kb: Math.round(raw.length / 1024),
  };
  const bad = scanText(raw, `commands/${name}.md`);
  if (bad.length) hardFindings.push(`commands/${name}.md → ${bad.join(' | ')}`);
  syncPlan.push({ from: p, to: join(ROOT, 'commands', `${name}.md`) });
  items.commands.push(item);
}

// --- rules + hooks (shown as read-only cards, public ones also shipped) ---
const rules = [];
for (const [file, cfg] of Object.entries(M.rules)) {
  const p = join(CLAUDE, 'rules', file);
  if (!existsSync(p)) { log(`  [manjka] rule ${file}`); continue; }
  const raw = readFileSync(p, 'utf8');
  rules.push({ kind: 'rule', key: file, id: `rule-${file}`, title: cfg.title, icon: cfg.icon, tier: cfg.tier, file, desc: cfg.summary, body: md2html(clip(raw)), src: cfg.tier === 'public' ? `rules/${file}` : '', kb: Math.round(raw.length / 1024) });
  if (cfg.tier === 'public') {
    const bad = scanText(raw, `rules/${file}`);
    if (bad.length) hardFindings.push(`rules/${file} → ${bad.join(' | ')}`);
    syncPlan.push({ from: p, to: join(ROOT, 'rules', file) });
  }
}

const hooks = [];
for (const [file, cfg] of Object.entries(M.hooks)) {
  const p = existsSync(join(CLAUDE, 'hooks', file)) ? join(CLAUDE, 'hooks', file) : join(CLAUDE, 'scripts', file);
  const exists = existsSync(p);
  const raw = exists ? readFileSync(p, 'utf8') : '';
  hooks.push({ kind: 'hook', key: file, id: `hook-${file}`, title: cfg.title, icon: cfg.icon, tier: cfg.tier, file, desc: cfg.summary, why: cfg.why || '', body: cfg.tier === 'public' && exists ? `<pre class="code"><code>${esc(raw)}</code></pre>` : '', src: cfg.tier === 'public' && exists ? `hooks/${file}` : '' });
  if (cfg.tier === 'public' && exists) {
    const bad = scanText(raw, `hooks/${file}`);
    if (bad.length) hardFindings.push(`hooks/${file} → ${bad.join(' | ')}`);
    syncPlan.push({ from: p, to: join(ROOT, 'hooks', file) });
  }
}

/* ------------------------------------------------------------------ *
 * Gate, prvi prehod: nič se ne kopira, dokler izvorne datoteke niso čiste.
 * Vrstni red je bistven — sinhronizacija PRED preverbo bi občutljive
 * datoteke spravila v delovno drevo repozitorija, tudi če build potem pade.
 * ------------------------------------------------------------------ */
function abort() {
  console.error('\n✖ BUILD USTAVLJEN — občutljiva vsebina bi šla v javni repo:\n');
  for (const f of hardFindings) console.error('   ' + f);
  console.error('\nPopravi izvorno datoteko ali prestavi element v manifest.json kot "tier": "internal".');
  console.error('V repo ni bilo zapisano nič.\n');
  process.exit(1);
}
if (hardFindings.length) abort();

/* ------------------------------------------------------------------ *
 * Page                                                                *
 * ------------------------------------------------------------------ */
const publicSkills = items.skills.filter(s => s.tier === 'public');
const stats = [
  { n: items.skills.length, l: 'skillov', s: `${publicSkills.length} javnih` },
  { n: items.agents.length, l: 'agentov', s: `${items.agents.filter(a => a.tier === 'public').length} javnih` },
  { n: items.commands.length, l: 'slash ukazov', s: 'vsi javni' },
  { n: M.mcp.length, l: 'MCP serverjev', s: `+ ${M.connectors.length} konektorjev` },
  { n: rules.length + hooks.length, l: 'pravil in hookov', s: 'avtomatika' },
];

const badge = t => t === 'public'
  ? '<span class="badge badge-pub">javno</span>'
  : '<span class="badge badge-int">interno</span>';

function card(it) {
  const tags = [
    ...(it.catLabel ? [it.catLabel] : []),
    ...(it.tags || []),
  ].map(t => `<span class="tag">${esc(t)}</span>`).join('');
  const hay = esc([it.title, it.desc, it.catLabel, ...(it.tags || [])].join(' ').toLowerCase());
  return `<button class="card" data-open="${it.id}" data-tier="${it.tier}" data-cat="${it.cat || ''}" data-hay="${hay}">
  <div class="card-top"><span class="card-icon">${it.icon}</span>${badge(it.tier)}</div>
  <h3>${esc(it.title)}</h3>
  <p>${esc(it.desc || '')}</p>
  <div class="tags">${tags}</div>
</button>`;
}

function simpleCard(it, extra = '') {
  const hay = esc([it.title, it.desc, it.file || '', it.name || ''].join(' ').toLowerCase());
  return `<button class="card" data-open="${it.id}" data-tier="${it.tier}" data-hay="${hay}">
  <div class="card-top"><span class="card-icon">${it.icon}</span>${badge(it.tier)}</div>
  <h3>${esc(it.title)}</h3>
  <p>${esc(it.desc || '')}</p>
  <div class="tags">${extra}</div>
</button>`;
}

const mcpItems = M.mcp.map((m, i) => ({
  kind: 'mcp', key: m.name, id: `mcp-${i}`, title: m.name, icon: m.icon,
  tier: m.tier, desc: m.desc, why: m.why || '', body: '',
}));

const catChips = Object.entries(M.categories)
  .map(([id, c]) => `<button class="chip" data-cat="${id}">${c.icon} ${esc(c.label)}</button>`).join('');

// modal payload
const MODAL = {};
for (const it of [...items.skills, ...items.agents, ...items.commands, ...rules, ...hooks, ...mcpItems]) {
  MODAL[it.id] = {
    kind: it.kind, key: it.key, title: it.title, icon: it.icon, tier: it.tier,
    desc: it.fullDesc || it.desc || '', why: it.why || '', body: it.body || '',
    model: it.model || '', tools: it.tools || '', file: it.file || '', src: it.src || '',
    files: it.files || 0, kb: it.kb || 0, tree: it.tree || [], dropped: it.dropped || 0,
    catLabel: it.catLabel || '',
  };
}

const claudeMdCards = M.claudeMd.map(c => `<div class="pcard">
  <div class="pcard-icon">${c.icon}</div>
  <div><h4>${esc(c.title)}</h4><p>${esc(c.summary)}</p></div>
</div>`).join('');

const html = `<!DOCTYPE html>
<html lang="sl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(M.site.title)}</title>
<meta name="description" content="${esc(M.site.tagline)}">
<meta property="og:title" content="${esc(M.site.title)}">
<meta property="og:description" content="${esc(M.site.tagline)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{
  --teal:#00AFAA; --teal-bright:#2EE6DF; --teal-dark:#0180AE;
  --accent:#FF0A60; --accent-dim:rgba(255,10,96,.12);
  --bg:#0A0E10; --bg-2:#11171A; --bg-3:#161E22; --bg-4:#1C262B;
  --border:rgba(255,255,255,.08); --border-2:rgba(0,175,170,.28);
  --text:#E8EEF0; --muted:#93A0A6; --dim:#66757B;
  --r:14px; --r-lg:22px; --maxw:1200px;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:'Exo 2',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  background:var(--bg);color:var(--text);line-height:1.65;overflow-x:hidden;-webkit-font-smoothing:antialiased}
body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;
  background:radial-gradient(circle at 12% 6%,rgba(0,175,170,.13),transparent 42%),
             radial-gradient(circle at 88% 78%,rgba(255,10,96,.07),transparent 52%)}
.page{position:relative;z-index:1}
a{color:var(--teal-bright);text-decoration:none}
a:hover{text-decoration:underline}
code,.mono{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.88em}

/* nav */
.nav{position:sticky;top:0;z-index:60;background:rgba(10,14,16,.88);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
.nav-inner{max-width:var(--maxw);margin:0 auto;padding:0 22px;height:56px;display:flex;align-items:center;gap:4px;
  overflow-x:auto;scrollbar-width:none;white-space:nowrap}
.nav-inner::-webkit-scrollbar{display:none}
.brand{font-weight:800;letter-spacing:-.02em;margin-right:20px;display:flex;align-items:center;gap:8px;flex:none}
.brand .dot{width:9px;height:9px;border-radius:50%;background:var(--teal-bright);box-shadow:0 0 12px var(--teal)}
.nav a.nl{color:var(--muted);font-size:.9rem;font-weight:500;padding:7px 12px;border-radius:9px;flex:none}
.nav a.nl:hover{color:var(--text);background:var(--bg-3);text-decoration:none}
.nav .spacer{flex:1}
.nav .gh{border:1px solid var(--border);color:var(--text);flex:none}

/* hero */
.hero{max-width:var(--maxw);margin:0 auto;padding:76px 22px 44px}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.74rem;
  letter-spacing:.14em;text-transform:uppercase;color:var(--teal-bright);border:1px solid var(--border-2);
  background:rgba(0,175,170,.07);padding:6px 12px;border-radius:999px}
h1{font-size:clamp(2.1rem,5.2vw,3.5rem);line-height:1.08;letter-spacing:-.035em;margin:20px 0 14px;font-weight:800}
h1 .grad{background:linear-gradient(100deg,var(--teal-bright),var(--teal) 45%,var(--teal-dark));
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.lead{font-size:1.1rem;color:var(--muted);max-width:70ch}
.lead strong{color:var(--text)}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.btn{display:inline-flex;align-items:center;gap:9px;padding:12px 20px;border-radius:11px;font-weight:600;
  font-size:.94rem;border:1px solid var(--border);background:var(--bg-3);color:var(--text);cursor:pointer;
  font-family:inherit;transition:.18s}
.btn:hover{background:var(--bg-4);border-color:var(--border-2);text-decoration:none}
.btn-primary{background:linear-gradient(100deg,var(--teal),var(--teal-dark));border-color:transparent;color:#04191a}
.btn-primary:hover{filter:brightness(1.12)}

/* stats */
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-top:44px}
.stat{background:var(--bg-2);border:1px solid var(--border);border-radius:var(--r);padding:18px 20px}
.stat b{display:block;font-size:1.9rem;line-height:1;font-weight:800;color:var(--teal-bright);letter-spacing:-.03em}
.stat span{display:block;font-size:.9rem;color:var(--text);margin-top:7px;font-weight:600}
.stat small{display:block;font-size:.78rem;color:var(--dim);margin-top:2px}

/* sections */
.section{max-width:var(--maxw);margin:0 auto;padding:56px 22px;scroll-margin-top:184px}
.sec-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:22px}
.sec-head h2{font-size:1.6rem;letter-spacing:-.03em;margin:0;font-weight:800}
.sec-head p{margin:6px 0 0;color:var(--muted);font-size:.94rem;max-width:66ch}
.count{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--dim);border:1px solid var(--border);
  padding:4px 10px;border-radius:999px;flex:none}

/* toolbar */
.toolbar{position:sticky;top:56px;z-index:50;background:rgba(10,14,16,.92);backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--border);padding:12px 0}
.toolbar-inner{max-width:var(--maxw);margin:0 auto;padding:0 22px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.search{flex:1;min-width:230px;display:flex;align-items:center;gap:9px;background:var(--bg-2);
  border:1px solid var(--border);border-radius:11px;padding:9px 13px}
.search:focus-within{border-color:var(--border-2)}
.search input{flex:1;background:none;border:0;outline:0;color:var(--text);font-family:inherit;font-size:.94rem}
.search input::placeholder{color:var(--dim)}
.search kbd{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--dim);border:1px solid var(--border);
  border-radius:5px;padding:2px 6px}
.seg{display:flex;background:var(--bg-2);border:1px solid var(--border);border-radius:11px;padding:3px;flex:none}
.seg button{background:none;border:0;color:var(--muted);font-family:inherit;font-size:.85rem;font-weight:600;
  padding:6px 13px;border-radius:8px;cursor:pointer;transition:.15s}
.seg button[aria-pressed="true"]{background:var(--teal);color:#04191a}
.chips{max-width:var(--maxw);margin:0 auto;padding:12px 22px 0;display:flex;gap:8px;flex-wrap:wrap}
.chip{background:var(--bg-2);border:1px solid var(--border);color:var(--muted);font-family:inherit;font-size:.83rem;
  font-weight:600;padding:6px 12px;border-radius:999px;cursor:pointer;transition:.15s}
.chip:hover{color:var(--text);border-color:var(--border-2)}
.chip[aria-pressed="true"]{background:rgba(0,175,170,.16);border-color:var(--teal);color:var(--teal-bright)}

/* grid + cards */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(272px,1fr));gap:14px}
.card{text-align:left;background:var(--bg-2);border:1px solid var(--border);border-radius:var(--r);padding:18px;
  cursor:pointer;font-family:inherit;color:var(--text);transition:.18s;display:flex;flex-direction:column;gap:9px}
.card:hover{background:var(--bg-3);border-color:var(--border-2);transform:translateY(-2px)}
.card-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.card-icon{font-size:1.5rem;line-height:1}
.card h3{margin:0;font-size:1.02rem;font-weight:700;letter-spacing:-.02em;font-family:'JetBrains Mono',monospace;
  overflow-wrap:anywhere}
.card p{margin:0;font-size:.87rem;color:var(--muted);line-height:1.55;
  display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto}
.tag{font-size:.72rem;color:var(--dim);background:var(--bg-3);border:1px solid var(--border);
  padding:3px 8px;border-radius:999px}
.badge{font-family:'JetBrains Mono',monospace;font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;
  padding:3px 8px;border-radius:999px;font-weight:600;flex:none}
.badge-pub{color:var(--teal-bright);background:rgba(0,175,170,.13);border:1px solid var(--border-2)}
.badge-int{color:#FF7AA8;background:var(--accent-dim);border:1px solid rgba(255,10,96,.3)}
.empty{color:var(--dim);padding:26px 0;font-size:.94rem}

/* principle cards */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.pcard{background:var(--bg-2);border:1px solid var(--border);border-radius:var(--r);padding:18px;display:flex;gap:14px}
.pcard-icon{font-size:1.5rem;line-height:1.1;flex:none}
.pcard h4{margin:0 0 5px;font-size:.98rem;font-weight:700;letter-spacing:-.01em}
.pcard p{margin:0;font-size:.87rem;color:var(--muted);line-height:1.55}

/* install */
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:14px}
.step{background:var(--bg-2);border:1px solid var(--border);border-radius:var(--r);padding:20px}
.step-n{font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--teal-bright);letter-spacing:.12em;
  text-transform:uppercase}
.step h3{margin:8px 0 8px;font-size:1.06rem;font-weight:700;letter-spacing:-.02em}
.step p{margin:0 0 12px;font-size:.89rem;color:var(--muted)}
.codeblock{background:#070A0B;border:1px solid var(--border);border-radius:11px;overflow:hidden}
.cb-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:7px 9px 7px 13px;
  border-bottom:1px solid var(--border);background:rgba(255,255,255,.02)}
.cb-head span{font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.codeblock code{font-family:'JetBrains Mono',monospace;font-size:.79rem;color:#B8E6E3;white-space:pre;display:block;
  padding:13px;overflow-x:auto}
.copy{flex:none;background:var(--bg-3);border:1px solid var(--border);color:var(--muted);
  border-radius:8px;padding:5px 9px;font-size:.7rem;font-family:'JetBrains Mono',monospace;cursor:pointer;transition:.15s}
.copy:hover{color:var(--text);border-color:var(--border-2)}
.copy.ok{color:var(--teal-bright);border-color:var(--teal)}
.note{background:rgba(255,10,96,.06);border:1px solid rgba(255,10,96,.22);border-radius:var(--r);padding:16px 18px;
  font-size:.9rem;color:var(--muted);margin-top:18px}
.note strong{color:var(--text)}

/* modal */
.overlay{position:fixed;inset:0;background:rgba(4,7,8,.78);backdrop-filter:blur(7px);z-index:200;
  display:none;align-items:flex-start;justify-content:center;padding:5vh 18px;overflow-y:auto}
.overlay.open{display:flex}
.modal{background:var(--bg-2);border:1px solid var(--border-2);border-radius:var(--r-lg);max-width:880px;width:100%;
  box-shadow:0 30px 90px rgba(0,0,0,.6)}
.modal-head{position:sticky;top:0;background:linear-gradient(180deg,var(--bg-3),var(--bg-2));
  border-bottom:1px solid var(--border);border-radius:var(--r-lg) var(--r-lg) 0 0;padding:20px 22px;
  display:flex;align-items:flex-start;gap:14px;z-index:2}
.modal-head .mi{font-size:2rem;line-height:1;flex:none}
.modal-head h2{margin:0;font-size:1.3rem;letter-spacing:-.03em;font-family:'JetBrains Mono',monospace;
  overflow-wrap:anywhere}
.modal-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center}
.x{margin-left:auto;background:var(--bg-4);border:1px solid var(--border);color:var(--muted);width:34px;height:34px;
  border-radius:9px;cursor:pointer;font-size:1.1rem;line-height:1;flex:none}
.x:hover{color:var(--text)}
.modal-body{padding:22px}
.mdesc{color:var(--text);font-size:.96rem;background:var(--bg-3);border:1px solid var(--border);
  border-radius:var(--r);padding:15px 17px}
.mwhy{margin-top:12px;background:var(--accent-dim);border:1px solid rgba(255,10,96,.26);border-radius:var(--r);
  padding:14px 17px;font-size:.9rem;color:var(--muted)}
.mwhy strong{color:#FF9DBE}
.msec-title{font-family:'JetBrains Mono',monospace;font-size:.72rem;letter-spacing:.13em;text-transform:uppercase;
  color:var(--dim);margin:26px 0 10px}
.srclink{text-transform:none;letter-spacing:0;font-size:.75rem;margin-left:9px}
.content{font-size:.92rem;color:var(--muted);overflow-wrap:anywhere}
.content h2,.content h3,.content h4,.content h5,.content h6{color:var(--text);letter-spacing:-.02em;
  margin:22px 0 8px;line-height:1.3}
.content h2{font-size:1.12rem} .content h3{font-size:1rem} .content h4{font-size:.94rem}
.content p{margin:0 0 11px}
.content ul,.content ol{margin:0 0 12px;padding-left:22px}
.content li{margin:4px 0}
.content strong{color:var(--text)}
.content code{background:var(--bg-4);border:1px solid var(--border);border-radius:5px;padding:1px 5px;color:#B8E6E3}
.content pre.code{background:#070A0B;border:1px solid var(--border);border-radius:10px;padding:13px;overflow-x:auto;margin:0 0 13px}
.content pre.code code{background:none;border:0;padding:0;color:#B8E6E3;white-space:pre}
.content blockquote{margin:0 0 12px;padding:9px 15px;border-left:2px solid var(--teal);background:var(--bg-3);color:var(--muted)}
.content hr{border:0;border-top:1px solid var(--border);margin:20px 0}
.content a{overflow-wrap:anywhere}
.tw{overflow-x:auto;margin:0 0 14px}
.content table{border-collapse:collapse;width:100%;font-size:.86rem;min-width:420px}
.content th,.content td{border:1px solid var(--border);padding:8px 11px;text-align:left;vertical-align:top}
.content th{background:var(--bg-3);color:var(--text);font-weight:600;white-space:nowrap}
.tree{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--muted);background:#070A0B;
  border:1px solid var(--border);border-radius:10px;padding:13px;max-height:230px;overflow:auto}
.tree div{white-space:nowrap}
footer{border-top:1px solid var(--border);margin-top:40px}
.foot{max-width:var(--maxw);margin:0 auto;padding:30px 22px;color:var(--dim);font-size:.86rem;
  display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap}

@media (max-width:640px){
  .hero{padding:52px 18px 34px}
  .section{padding:44px 18px}
  .grid{grid-template-columns:1fr}
  .toolbar{position:static}
  .section{scroll-margin-top:70px}
  .modal-head{padding:16px}
  .modal-body{padding:16px}
}
</style>
</head>
<body>
<div class="page">

<nav class="nav"><div class="nav-inner">
  <span class="brand"><span class="dot"></span>${esc(M.site.owner)}</span>
  <a class="nl" href="#skilli">Skilli</a>
  <a class="nl" href="#agenti">Agenti</a>
  <a class="nl" href="#ukazi">Ukazi</a>
  <a class="nl" href="#mcp">MCP</a>
  <a class="nl" href="#pravila">Pravila</a>
  <a class="nl" href="#namestitev">Namestitev</a>
  <span class="spacer"></span>
  <a class="nl gh" href="https://github.com/${M.site.repo}" target="_blank" rel="noopener">GitHub ↗</a>
</div></nav>

<header class="hero">
  <span class="eyebrow"><span>◆</span> Claude Code ekosistem</span>
  <h1>Moj <span class="grad">Claude Code</span> setup</h1>
  <p class="lead">${M.site.intro}</p>
  <div class="hero-cta">
    <a class="btn btn-primary" href="#namestitev">Kako si to namestiš →</a>
    <a class="btn" href="#skilli">Poglej skille</a>
  </div>
  <div class="stats">
    ${stats.map(s => `<div class="stat"><b>${s.n}</b><span>${esc(s.l)}</span><small>${esc(s.s)}</small></div>`).join('')}
  </div>
</header>

<div class="toolbar">
  <div class="toolbar-inner">
    <label class="search">
      <span style="color:var(--dim)">⌕</span>
      <input id="q" type="search" placeholder="Išči po skillih, agentih, ukazih, MCP …" autocomplete="off">
      <kbd>/</kbd>
    </label>
    <div class="seg" role="group" aria-label="Filter po sloju">
      <button data-tier="all" aria-pressed="true">Vse</button>
      <button data-tier="public" aria-pressed="false">Javno</button>
      <button data-tier="internal" aria-pressed="false">Interno</button>
    </div>
  </div>
  <div class="chips" id="chips"><button class="chip" data-cat="all" aria-pressed="true">Vse kategorije</button>${catChips}</div>
</div>

<section class="section" id="skilli">
  <div class="sec-head">
    <div><h2>Skilli</h2><p>Slash ukazi z lastnim navodilom, referencami in skriptami. Javne si namestiš z enim ukazom.</p></div>
    <span class="count" data-count="skilli"></span>
  </div>
  <div class="grid" data-group="skilli">${items.skills.map(card).join('')}</div>
  <p class="empty" hidden>Nič ne ustreza iskanju.</p>
</section>

<section class="section" id="agenti">
  <div class="sec-head">
    <div><h2>Agenti</h2><p>Podagenti s svojim kontekstom in naborom orodij. Kličem jih, kadar naloga zahteva svež kontekst ali vzporedno delo.</p></div>
    <span class="count" data-count="agenti"></span>
  </div>
  <div class="grid" data-group="agenti">${items.agents.map(card).join('')}</div>
  <p class="empty" hidden>Nič ne ustreza iskanju.</p>
</section>

<section class="section" id="ukazi">
  <div class="sec-head">
    <div><h2>Slash ukazi</h2><p>Kratki, enonamenski ukazi za vsakodnevno agencijsko delo.</p></div>
    <span class="count" data-count="ukazi"></span>
  </div>
  <div class="grid" data-group="ukazi">${items.commands.map(card).join('')}</div>
  <p class="empty" hidden>Nič ne ustreza iskanju.</p>
</section>

<section class="section" id="mcp">
  <div class="sec-head">
    <div><h2>MCP serverji</h2><p>Zunanji sistemi, ki jih Claude bere in vanje piše neposredno, brez kopiranja med okni.</p></div>
    <span class="count" data-count="mcp"></span>
  </div>
  <div class="grid" data-group="mcp">${mcpItems.map(m => simpleCard(m)).join('')}</div>
  <p class="empty" hidden>Nič ne ustreza iskanju.</p>
  <p style="color:var(--dim);font-size:.87rem;margin-top:18px">
    Poleg teh še konektorji prek claude.ai: ${M.connectors.map(c => `<span class="tag">${esc(c)}</span>`).join(' ')}
  </p>
</section>

<section class="section" id="pravila">
  <div class="sec-head">
    <div><h2>Pravila, hooki in CLAUDE.md</h2><p>Del setupa, ki ga ne kličem — teče sam. Vsako pravilo obstaja, ker je njegova odsotnost enkrat povzročila konkretno napako.</p></div>
    <span class="count" data-count="pravila"></span>
  </div>
  <div class="grid" data-group="pravila">${[...rules, ...hooks].map(r => simpleCard(r, `<span class="tag">${esc(r.file)}</span>`)).join('')}</div>
  <p class="empty" hidden>Nič ne ustreza iskanju.</p>

  <div class="msec-title" style="margin-top:34px">Načela iz globalnega CLAUDE.md</div>
  <div class="pgrid">${claudeMdCards}</div>
</section>

<section class="section" id="namestitev">
  <div class="sec-head">
    <div><h2>Namestitev</h2><p>Tri poti, od najlažje do ročne. Vse so idempotentne: ponovni zagon ne podvoji ničesar in ne pobriše tvojih obstoječih skillov.</p></div>
  </div>
  <div class="steps">
    <div class="step">
      <div class="step-n">Pot 1 · najlažja</div>
      <h3>Prilepi Claudu</h3>
      <p>Odpri svež Claude Code in prilepi to. Sam prenese installer, pokaže, kaj dela, in ga po tvoji potrditvi zažene.</p>
      <div class="codeblock"><div class="cb-head"><span>prilepi v Claude Code</span><button class="copy" data-copy="p1">kopiraj</button></div><code id="p1">Namesti mi skille iz ${M.site.repo}.

1. Prenesi installer in mi v enem odstavku povej, kaj dela:
   curl -fsSL ${RAW}/install.sh -o /tmp/acenta-skills.sh
2. Ko potrdim, ga zaženi z imeni, ki jih hočem (ali --all za vse skille, agente in ukaze):
   bash /tmp/acenta-skills.sh --all
3. Nato mi povej, naj restartam Claude Code, in preveri, kaj je pristalo v ~/.claude/skills.</code></div>
    </div>
    <div class="step">
      <div class="step-n">Pot 2 · terminal</div>
      <h3>Ena vrstica</h3>
      <p>Izbrani skilli ali vse javno naenkrat. Deluje v Git Bash na Windowsu, macOS in Linux.</p>
      <div class="codeblock"><div class="cb-head"><span>bash</span><button class="copy" data-copy="p2">kopiraj</button></div><code id="p2">curl -fsSL ${RAW}/install.sh -o /tmp/i.sh
bash /tmp/i.sh --list
bash /tmp/i.sh transcreate visualize verifier</code></div>
    </div>
    <div class="step">
      <div class="step-n">Pot 3 · ročno</div>
      <h3>Kloniraj in kopiraj</h3>
      <p>Če hočeš najprej vse prebrati. Vsak skill je samostojna mapa, agent je ena datoteka.</p>
      <div class="codeblock"><div class="cb-head"><span>bash</span><button class="copy" data-copy="p3">kopiraj</button></div><code id="p3">git clone --depth 1 https://github.com/${M.site.repo}.git
cp -r claude-setup-showcase/skills/transcreate ~/.claude/skills/
cp claude-setup-showcase/agents/verifier.md ~/.claude/agents/</code></div>
    </div>
  </div>
  <div class="note">
    <strong>Zakaj nekatere kartice nimajo gumba za namestitev.</strong>
    Skilli, označeni z <span class="badge badge-int">interno</span>, so vezani na podatke strank, naslove strežnikov ali interne finančne procese. Njihove datoteke nikoli ne zapustijo mojega računalnika — na strani vidiš samo, čemu služijo. Če jih rabiš pri delu, mi piši in ti jih predam neposredno.
  </div>
</section>

<footer><div class="foot">
  <span>${esc(M.site.owner)} · generirano iz <code>~/.claude</code> z <code>build.mjs</code></span>
  <span><a href="https://github.com/${M.site.repo}" target="_blank" rel="noopener">Repozitorij ↗</a></span>
</div></footer>

</div>

<div class="overlay" id="ov" role="dialog" aria-modal="true" aria-labelledby="mt">
  <div class="modal" id="modal"></div>
</div>

<script>
const DATA = ${JSON.stringify(MODAL).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')};
const REPO = ${JSON.stringify(M.site.repo)};
const RAW = ${JSON.stringify(RAW)};
const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

/* ---------- install snippets ---------- */
function installFor(d){
  if (d.tier !== 'public') return null;
  if (d.kind === 'skill')   return { sh: 'curl -fsSL ' + RAW + '/install.sh -o /tmp/i.sh\\nbash /tmp/i.sh ' + d.key,
                                     ai: 'Namesti mi skill ' + d.title + ' iz ' + REPO + ': prenesi ' + RAW + '/install.sh, povej mi kaj dela, in ga po moji potrditvi zaženi z argumentom ' + d.key + '. Nato mi povej, naj restartam Claude Code.' };
  if (d.kind === 'agent')   return { sh: 'curl -fsSL ' + RAW + '/install.sh -o /tmp/i.sh\\nbash /tmp/i.sh ' + d.key,
                                     ai: 'Namesti mi agenta ' + d.key + ' iz ' + REPO + ' prek ' + RAW + '/install.sh (argument ' + d.key + '), nato mi povej, naj restartam Claude Code.' };
  if (d.kind === 'command') return { sh: 'curl -fsSL ' + RAW + '/install.sh -o /tmp/i.sh\\nbash /tmp/i.sh ' + d.key,
                                     ai: 'Namesti mi slash ukaz ' + d.title + ' iz ' + REPO + ' prek ' + RAW + '/install.sh (argument ' + d.key + ').' };
  if (d.kind === 'rule')    return { sh: 'curl -fsSL ' + RAW + '/rules/' + d.file + ' -o ~/.claude/rules/' + d.file, ai: null };
  if (d.kind === 'hook')    return { sh: 'curl -fsSL ' + RAW + '/hooks/' + d.file + ' -o ~/.claude/hooks/' + d.file + '\\nchmod +x ~/.claude/hooks/' + d.file, ai: null };
  return null;
}

const KIND_LABEL = { skill:'Skill', agent:'Agent', command:'Slash ukaz', rule:'Pravilo', hook:'Hook / skripta', mcp:'MCP server' };

function codeblock(id, text, label, head){
  return '<div class="codeblock"><div class="cb-head"><span>' + esc(head) + '</span>'
       + '<button class="copy" data-copy="' + id + '">' + label + '</button></div>'
       + '<code id="' + id + '">' + esc(text) + '</code></div>';
}

function render(id){
  const d = DATA[id];
  if (!d) return;
  const inst = installFor(d);
  const meta = [
    '<span class="badge ' + (d.tier === 'public' ? 'badge-pub">javno' : 'badge-int">interno') + '</span>',
    '<span class="tag">' + esc(KIND_LABEL[d.kind] || d.kind) + '</span>',
    d.catLabel ? '<span class="tag">' + esc(d.catLabel) + '</span>' : '',
    d.model ? '<span class="tag">model: ' + esc(d.model) + '</span>' : '',
    d.files ? '<span class="tag">' + d.files + ' datotek · ' + d.kb + ' kB</span>' : '',
    d.file ? '<span class="tag">' + esc(d.file) + '</span>' : ''
  ].join('');

  let h = '<div class="modal-head"><span class="mi">' + d.icon + '</span>'
        + '<div><h2 id="mt">' + esc(d.title) + '</h2><div class="modal-meta">' + meta + '</div></div>'
        + '<button class="x" id="xbtn" aria-label="Zapri">✕</button></div><div class="modal-body">';

  if (d.desc) h += '<div class="mdesc">' + esc(d.desc) + '</div>';
  if (d.tier !== 'public') {
    h += '<div class="mwhy"><strong>Ni v javnem repozitoriju.</strong> ' + esc(d.why || 'Vezano na interne podatke.')
       + ' Datoteke ostanejo lokalno — tu vidiš samo, čemu orodje služi.</div>';
  }
  if (inst) {
    h += '<div class="msec-title">Namestitev</div>' + codeblock('m-sh', inst.sh, 'kopiraj', 'v terminal');
    if (inst.ai) h += '<div style="height:10px"></div>' + codeblock('m-ai', inst.ai, 'kopiraj', 'ali prilepi Claudu');
  }
  if (d.tree && d.tree.length) {
    h += '<div class="msec-title">Kaj je v mapi</div><div class="tree">'
       + d.tree.map(t => '<div>' + esc(t) + '</div>').join('')
       + (d.dropped ? '<div style="color:var(--dim)">… ' + d.dropped + ' binarnih ali zelo velikih datotek (fonti, cache) ni v repo kopiji</div>' : '')
       + '</div>';
  }
  if (d.body) {
    const srcLink = d.src
      ? ' <a class="srclink" href="https://github.com/' + REPO + '/blob/main/' + d.src + '" target="_blank" rel="noopener">cela datoteka ↗</a>'
      : '';
    h += '<div class="msec-title">' + (d.tier === 'public' ? 'Vsebina' : 'Kaj počne') + srcLink + '</div><div class="content">' + d.body + '</div>';
  }
  h += '</div>';

  document.getElementById('modal').innerHTML = h;
}

/* ---------- modal open/close ---------- */
const ov = document.getElementById('ov');
let lastFocus = null;

function open(id, push){
  if (!DATA[id]) return;
  lastFocus = document.activeElement;
  render(id);
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
  const x = document.getElementById('xbtn');
  if (x) { x.onclick = close; x.focus(); }
  if (push !== false) history.replaceState(null, '', '#' + id);
}
function close(){
  ov.classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('modal').innerHTML = '';
  history.replaceState(null, '', location.pathname + location.search);
  if (lastFocus) lastFocus.focus();
}
ov.addEventListener('click', e => { if (e.target === ov) close(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && ov.classList.contains('open')) close();
  if (e.key === '/' && !ov.classList.contains('open') && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
    e.preventDefault(); document.getElementById('q').focus();
  }
});
document.addEventListener('click', e => {
  const card = e.target.closest('[data-open]');
  if (card) { open(card.dataset.open); return; }
  const btn = e.target.closest('.copy');
  if (btn) {
    const el = document.getElementById(btn.dataset.copy);
    if (!el) return;
    navigator.clipboard.writeText(el.textContent).then(() => {
      const t = btn.textContent; btn.textContent = 'kopirano ✓'; btn.classList.add('ok');
      setTimeout(() => { btn.textContent = t; btn.classList.remove('ok'); }, 1600);
    });
  }
});

/* ---------- filtering ---------- */
let query = '', tier = 'all', cat = 'all';
function applyFilters(){
  document.querySelectorAll('.grid[data-group]').forEach(grid => {
    let shown = 0;
    grid.querySelectorAll('.card').forEach(c => {
      const okQ = !query || c.dataset.hay.includes(query);
      const okT = tier === 'all' || c.dataset.tier === tier;
      const okC = cat === 'all' || grid.dataset.group !== 'skilli' || c.dataset.cat === cat;
      const on = okQ && okT && okC;
      c.hidden = !on;
      if (on) shown++;
    });
    const sec = grid.closest('.section');
    const label = sec.querySelector('[data-count]');
    if (label) label.textContent = shown + ' / ' + grid.querySelectorAll('.card').length;
    const empty = sec.querySelector('.empty');
    if (empty) empty.hidden = shown !== 0;
  });
}
document.getElementById('q').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); applyFilters(); });
document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
  tier = b.dataset.tier;
  document.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  applyFilters();
}));
document.querySelectorAll('#chips .chip').forEach(b => b.addEventListener('click', () => {
  cat = b.dataset.cat;
  document.querySelectorAll('#chips .chip').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  if (cat !== 'all') document.getElementById('skilli').scrollIntoView({ behavior:'smooth', block:'start' });
  applyFilters();
}));
applyFilters();

/* deep links: #skill-transcreate opens that modal, on load and on hash change */
function openFromHash(){
  const id = location.hash.slice(1);
  if (DATA[id]) open(id, false);
}
window.addEventListener('hashchange', openFromHash);
openFromHash();
</script>
</body>
</html>
`;

/* ------------------------------------------------------------------ *
 * Gate                                                                *
 * ------------------------------------------------------------------ */
const pageBad = scanText(html, 'index.html');
if (pageBad.length) hardFindings.push(`index.html → ${pageBad.join(' | ')}`);
if (hardFindings.length) abort();

// Šele zdaj, ko sta izvor in generirana stran čista, se sme kaj zapisati.
if (SYNC) {
  for (const d of ['skills', 'agents', 'commands', 'rules', 'hooks']) {
    rmSync(join(ROOT, d), { recursive: true, force: true });
  }
  for (const { from, to } of syncPlan) {
    mkdirSync(dirname(to), { recursive: true });
    copyFileSync(from, to);
  }
  log(`→ sinhroniziranih datotek: ${syncPlan.length}`);
}

writeFileSync(join(ROOT, 'index.html'), html);
writeFileSync(join(ROOT, '.nojekyll'), '');

log(`\n✔ index.html zgrajen (${Math.round(html.length / 1024)} kB)`);
log(`  skilli: ${items.skills.length} (${publicSkills.length} javnih, ${items.skills.length - publicSkills.length} internih)`);
log(`  agenti: ${items.agents.length} | ukazi: ${items.commands.length} | pravila+hooki: ${rules.length + hooks.length} | MCP: ${M.mcp.length}`);
if (warn.length) {
  log(`\n⚠ ${warn.length} mehkih zadetkov za ročni pregled (build ni ustavljen):`);
  for (const w of [...new Set(warn)].slice(0, 40)) log('   ' + w);
}
