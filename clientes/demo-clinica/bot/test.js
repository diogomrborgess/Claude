const assert = require('assert');
const B = require('./flow');
const events = [], leads = [];
const provider = {
  async busy(d) { return events.filter(e => e.date === d).map(e => ({ start: e.time, end: B.addMin(e.time, e.minutes) })); },
  async book(e) { events.push(e); return { id: '1' }; },
  async lead(l) { leads.push(l); }
};
const now = new Date(2026, 9, 19, 8, 0); // segunda 19/10/2026, 08:00
const ctx = { provider, phone: '+351910000000', now };
const run = async (steps) => { const s = B.createSession(); const all = []; for (const t of steps) all.push((await B.handle(s, t, ctx)).replies.join(' | ')); return all; };
(async () => {
  // Marcação: cirurgia plástica, mama
  const r = await run(['olá', '1', '3', '1', '2', 'Ana Silva', 'sim']);
  console.log(r.join('\n---\n'));
  assert.strictEqual(events.length, 1);
  assert.strictEqual(events[0].service, 'Avaliação de cirurgia plástica · Mama');
  assert.strictEqual(events[0].minutes, 45);
  const free = await B.freeSlots(B.DEFAULTS, provider, events[0].date, 45, now);
  assert(!free.includes(events[0].time));
  // Videochamada
  await run(['olá', '3', '2', '1', '1', 'Rui Costa', 'sim']);
  assert(/videochamada/.test(events[1].service));
  // Só informação
  const info = await run(['olá', '4', 'Marta Lopes', 'Queria saber como é uma rinoplastia']);
  assert.strictEqual(leads.length, 1);
  assert.strictEqual(leads[0].name, 'Marta Lopes');
  // Urgência e receção
  assert(/112/.test((await B.handle(B.createSession(), 'tive uma complicação e tenho febre', ctx)).replies[0]));
  assert(/receção/.test((await B.handle(B.createSession(), 'quero falar com uma pessoa', ctx)).replies[0]));
  // Preço e dúvidas a meio do fluxo
  const s = B.createSession(); await B.handle(s, 'olá', ctx); await B.handle(s, '1', ctx);
  assert(/depois da avaliação/.test((await B.handle(s, 'quanto custa?', ctx)).replies[0]));
  assert(/decisão é sempre sua/.test((await B.handle(s, 'tenho medo', ctx)).replies[0]));
  // Horários: domingo fechado, sábado só de manhã
  assert.deepStrictEqual(await B.freeSlots(B.DEFAULTS, provider, '2026-10-25', 30, now), []);
  const sat = await B.freeSlots(B.DEFAULTS, provider, '2026-10-24', 30, now);
  assert.strictEqual(sat[sat.length - 1], '12:30');
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });
