const assert = require('assert');
const B = require('./flow');
const events = [];
const provider = {
  async busy(d) { return events.filter(e => e.date === d).map(e => ({ start: e.time, end: B.addMin(e.time, e.minutes) })); },
  async book(e) { events.push(e); return { id: '1' }; }
};
(async () => {
  const now = new Date(2026, 9, 19, 8, 0); // segunda 19/10/2026, 08:00
  const s = B.createSession(), ctx = { provider, phone: '+351910000000', now };
  const say = async (t) => (await B.handle(s, t, ctx)).replies.join(' | ');
  console.log(await say('olá'));
  console.log(await say('2'));
  console.log(await say('1'));
  console.log(await say('1'));
  console.log(await say('Ana Silva'));
  const done = await say('sim');
  console.log(done);
  assert.strictEqual(events.length, 1);
  assert.strictEqual(events[0].service, 'Harmonização facial');
  // o mesmo horário já não pode ser reservado
  const s2 = B.createSession();
  const free = await B.freeSlots(B.DEFAULTS, provider, events[0].date, 60, now);
  assert(!free.includes(events[0].time));
  // domingo sem horário; sábado só de manhã
  assert.deepStrictEqual(await B.freeSlots(B.DEFAULTS, provider, '2026-10-25', 30, now), []);
  const sat = await B.freeSlots(B.DEFAULTS, provider, '2026-10-24', 30, now);
  assert.strictEqual(sat[sat.length - 1], '12:30');
  // pedir humano
  assert(/receção/.test((await B.handle(B.createSession(), 'quero falar com uma pessoa', ctx)).replies[0]));
  console.log('OK');
})().catch(e => { console.error(e); process.exit(1); });
