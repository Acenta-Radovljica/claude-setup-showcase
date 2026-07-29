// Extracts a compact digest from a Claude Code session JSONL:
// real user messages (not tool results), slash commands, error counts, model/version.
// Usage: node extract-session.js <path-to-session.jsonl>
const fs = require('fs');
const readline = require('readline');

const file = process.argv[2];
if (!file) { console.error('usage: node extract-session.js FILE'); process.exit(1); }

const rl = readline.createInterface({ input: fs.createReadStream(file) });
let userMsgs = [], errors = 0, toolCalls = {}, slash = [], meta = null, lines = 0;

rl.on('line', (l) => {
  lines++;
  let j; try { j = JSON.parse(l); } catch { return; }
  if (!meta && j.cwd) meta = { cwd: j.cwd, version: j.version };
  if (j.type === 'user' && j.message) {
    const c = j.message.content;
    let t = '';
    if (typeof c === 'string') t = c;
    else if (Array.isArray(c)) t = c.filter(x => x.type === 'text').map(x => x.text).join(' ');
    if (!t) return;
    const cmd = t.match(/<command-name>([^<]+)<\/command-name>/);
    if (cmd) { slash.push(cmd[1].trim()); return; }
    if (t.startsWith('<')) return; // system-reminder / caveat wrappers
    userMsgs.push(t.replace(/\s+/g, ' ').slice(0, 400));
  }
  if (j.type === 'assistant' && j.message && Array.isArray(j.message.content)) {
    for (const x of j.message.content) if (x.type === 'tool_use') toolCalls[x.name] = (toolCalls[x.name] || 0) + 1;
  }
  if (l.includes('"is_error":true')) errors++;
});

rl.on('close', () => {
  console.log('FILE:', file);
  console.log('META:', JSON.stringify(meta));
  console.log('LINES:', lines, 'USER_MSGS:', userMsgs.length, 'ERRORS:', errors);
  console.log('SLASH:', slash.join(', ') || '(none)');
  const tools = Object.entries(toolCalls).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k, v]) => `${k}:${v}`).join(' ');
  console.log('TOOLS:', tools);
  console.log('--- USER MESSAGES ---');
  userMsgs.forEach((m, i) => console.log(`[${i + 1}] ${m}`));
});
