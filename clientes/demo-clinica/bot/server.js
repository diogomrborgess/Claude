/* Servidor do WhatsApp (API oficial da Meta) + agenda. Node 18 ou superior. */
const http = require('http');
const crypto = require('crypto');
const B = require('./flow');

const env = process.env;
const PORT = env.PORT || 3000;
const cfg = { ...B.DEFAULTS, clinic: env.CLINIC_NAME || B.DEFAULTS.clinic };

// Sem credenciais do Google, usa uma agenda em memória (só para testar).
let provider;
if (env.GOOGLE_SERVICE_ACCOUNT_JSON && env.GOOGLE_CALENDAR_ID) {
  provider = require('./calendar').createCalendarProvider({
    calendarId: env.GOOGLE_CALENDAR_ID, tz: cfg.tz, credentials: JSON.parse(env.GOOGLE_SERVICE_ACCOUNT_JSON) });
} else {
  console.warn('Sem Google Calendar configurado: agenda em memória (teste).');
  const mem = [];
  provider = {
    async busy(d) { return mem.filter(e => e.date === d).map(e => ({ start: e.time, end: B.addMin(e.time, e.minutes) })); },
    async book(e) { mem.push(e); return { id: String(mem.length) }; }
  };
}

const sessions = new Map(); // telefone -> { session, last }
const seen = new Set();     // ids de mensagens já tratadas

async function sendText(to, body) {
  const r = await fetch(`https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } })
  });
  if (!r.ok) console.error('Erro a enviar:', r.status, await r.text());
}

async function onMessage(m) {
  if (seen.has(m.id)) return;
  seen.add(m.id); if (seen.size > 5000) seen.clear();
  const text = m.type === 'text' ? m.text.body
    : m.type === 'interactive' ? (m.interactive.button_reply || m.interactive.list_reply || {}).title || '' : '';
  if (!text) return sendText(m.from, 'Só consigo ler mensagens de texto. Escreva "marcar" para começar.');
  let s = sessions.get(m.from);
  if (!s || Date.now() - s.last > 30 * 60e3) s = { session: B.createSession() };
  s.last = Date.now(); sessions.set(m.from, s);
  const res = await B.handle(s.session, text, { cfg, provider, phone: '+' + m.from });
  for (const r of res.replies) await sendText(m.from, r);
}

function validSignature(raw, header) {
  if (!env.APP_SECRET) return true; // só em testes
  const mine = 'sha256=' + crypto.createHmac('sha256', env.APP_SECRET).update(raw).digest('hex');
  return header && header.length === mine.length && crypto.timingSafeEqual(Buffer.from(header), Buffer.from(mine));
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname !== '/webhook') { res.writeHead(404).end(); return; }
  if (req.method === 'GET') { // verificação do webhook pela Meta
    const ok = url.searchParams.get('hub.verify_token') === env.VERIFY_TOKEN;
    res.writeHead(ok ? 200 : 403).end(ok ? url.searchParams.get('hub.challenge') : '');
    return;
  }
  if (req.method !== 'POST') { res.writeHead(405).end(); return; }
  const chunks = [];
  req.on('data', c => chunks.push(c));
  req.on('end', () => {
    const raw = Buffer.concat(chunks);
    if (!validSignature(raw, req.headers['x-hub-signature-256'])) { res.writeHead(401).end(); return; }
    res.writeHead(200).end(); // responder já; a Meta repete se demorar
    try {
      const msgs = (JSON.parse(raw).entry || []).flatMap(e => e.changes || []).flatMap(c => c.value.messages || []);
      msgs.forEach(m => onMessage(m).catch(err => console.error(err)));
    } catch (err) { console.error(err); }
  });
}).listen(PORT, () => console.log('Bot a ouvir na porta ' + PORT));
