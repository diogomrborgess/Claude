/* Lógica da conversa de marcações. Corre no navegador (demonstração) e em Node (WhatsApp). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ClinicBot = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DEFAULTS = {
    clinic: 'Clínica Exemplo',
    tz: 'Europe/Lisbon',
    services: [
      { id: 'avaliacao', label: 'Consulta de avaliação', minutes: 30 },
      { id: 'harmonizacao', label: 'Harmonização facial', minutes: 60 },
      { id: 'laser', label: 'Tratamento laser', minutes: 60 }
    ],
    // 0 = domingo ... 6 = sábado. Sem entrada = fechado.
    hours: {
      1: ['09:00', '19:00'], 2: ['09:00', '19:00'], 3: ['09:00', '19:00'],
      4: ['09:00', '19:00'], 5: ['09:00', '19:00'], 6: ['09:00', '13:00']
    },
    step: 30,
    daysAhead: 6,
    minNoticeMin: 60,
    phone: '210 000 000',
    handoff: 'Claro. A receção atende pelo 210 000 000, de segunda a sexta das 9h às 19h e ao sábado das 9h às 13h.'
  };

  var WD = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
  var MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function toMin(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }
  function fromMin(m) { return pad(Math.floor(m / 60)) + ':' + pad(m % 60); }
  function addMin(t, m) { return fromMin(toMin(t) + m); }
  function dow(dateISO) { var p = dateISO.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).getDay(); }
  function dayLabel(dateISO) { var p = dateISO.split('-'); return WD[dow(dateISO)] + ', ' + (+p[2]) + ' de ' + MONTHS[+p[1] - 1]; }
  function timeLabel(t) { return t.replace(/^0/, '').replace(':', 'h'); }
  function firstName(n) { var f = (n || '').trim().split(/\s+/)[0] || ''; return f.charAt(0).toUpperCase() + f.slice(1); }
  function greeting(now) { var h = now.getHours(); return h < 13 ? 'Bom dia' : (h < 20 ? 'Boa tarde' : 'Boa noite'); }
  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim(); }

  function upcomingDays(cfg, now) {
    var out = [], d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for (var i = 0; out.length < cfg.daysAhead && i < 30; i++) {
      var s = iso(d);
      if (cfg.hours[dow(s)]) out.push(s);
      d.setDate(d.getDate() + 1);
    }
    return out;
  }

  async function freeSlots(cfg, provider, dateISO, minutes, now) {
    var h = cfg.hours[dow(dateISO)];
    if (!h) return [];
    var busy = await provider.busy(dateISO);
    var open = toMin(h[0]), close = toMin(h[1]);
    var notBefore = iso(now) === dateISO ? now.getHours() * 60 + now.getMinutes() + cfg.minNoticeMin : -1;
    var out = [];
    for (var s = open; s + minutes <= close; s += cfg.step) {
      if (s < notBefore) continue;
      var e = s + minutes;
      var clash = busy.some(function (b) { return s < toMin(b.end) && e > toMin(b.start); });
      if (!clash) out.push(fromMin(s));
    }
    return out;
  }

  function createSession() { return { state: 'start' }; }

  function pick(text, items, labelFn) {
    var t = norm(text), n = parseInt(t, 10);
    if (String(n) === t && n >= 1 && n <= items.length) return items[n - 1];
    if (t.length >= 3) for (var i = 0; i < items.length; i++) {
      if (norm(labelFn(items[i])).indexOf(t) >= 0) return items[i];
    }
    return null;
  }
  function list(items, labelFn) { return items.map(function (x, i) { return (i + 1) + '. ' + labelFn(x); }).join('\n'); }
  function pickSlot(text, slots) {
    var t = norm(text), n = parseInt(t, 10);
    if (String(n) === t && n >= 1 && n <= slots.length) return slots[n - 1];
    var m = t.match(/(\d{1,2})\s*(?:h|:)?\s*(\d{2})?/);
    if (!m) return null;
    var c = pad(+m[1]) + ':' + (m[2] || '00');
    return slots.indexOf(c) >= 0 ? c : null;
  }

  // Devolve { session, replies: [texto...], options: [atalhos...] }
  async function handle(session, text, ctx) {
    var cfg = ctx.cfg || DEFAULTS, provider = ctx.provider, now = ctx.now || new Date();
    var t = norm(text);
    function out(msgs, opts) { return { session: session, replies: [].concat(msgs), options: opts || [] }; }

    if (/(humano|pessoa|rececao|rececionista|falar com|ligar)/.test(t)) return out(cfg.handoff);
    if (/^(cancelar|recomecar|reiniciar|menu)$/.test(t)) session.state = 'start';
    if (session.state !== 'start' && session.state !== 'name' && /(preco|quanto custa|valor|orcamento|custo)/.test(t)) {
      return out('Os valores dependem de cada caso e são explicados na consulta de avaliação. Se quiser, marco já uma.', ['Marcar consulta']);
    }

    function serviceList() { return list(cfg.services, function (x) { return x.label; }); }
    async function askService() {
      session.state = 'service';
      return out('Que consulta quer marcar?\n' + serviceList(), cfg.services.map(function (x) { return x.label; }));
    }
    async function askDay() {
      var days = [];
      for (var d of upcomingDays(cfg, now)) {
        if ((await freeSlots(cfg, provider, d, session.minutes, now)).length) days.push(d);
      }
      if (!days.length) return out('Neste momento não tenho horários livres. ' + cfg.handoff);
      session.days = days; session.state = 'day';
      return out('Para que dia prefere?\n' + list(days, dayLabel), days.map(dayLabel));
    }
    async function askTime() {
      var slots = await freeSlots(cfg, provider, session.date, session.minutes, now);
      if (!slots.length) return askDay();
      if (slots.length > 8) slots = slots.filter(function (_, i) { return i % Math.ceil(slots.length / 8) === 0; });
      session.slots = slots; session.state = 'time';
      return out('Tenho estes horários para ' + dayLabel(session.date) + ':\n' + list(slots, timeLabel), slots.map(timeLabel));
    }

    switch (session.state) {
      case 'start': {
        var first = await askService();
        first.replies.unshift(greeting(now) + '! Fala a ' + cfg.clinic + '.');
        return first;
      }
      case 'service': {
        var sv = pick(text, cfg.services, function (x) { return x.label; });
        if (!sv) return out('Desculpe, não percebi. Pode escolher o número da consulta?\n' + serviceList(), cfg.services.map(function (x) { return x.label; }));
        session.service = sv.label; session.minutes = sv.minutes;
        return askDay();
      }
      case 'day': {
        var d = pick(text, session.days, dayLabel);
        if (!d) return out('Pode indicar o número do dia, por favor?\n' + list(session.days, dayLabel), session.days.map(dayLabel));
        session.date = d;
        return askTime();
      }
      case 'time': {
        var tm = pickSlot(text, session.slots);
        if (!tm) return out('Pode indicar o número ou a hora, por favor?\n' + list(session.slots, timeLabel), session.slots.map(timeLabel));
        session.time = tm; session.state = 'name';
        return out('Perfeito. Para a marcação, qual é o seu nome?');
      }
      case 'name': {
        var name = (text || '').trim();
        if (name.length < 2) return out('Qual é o seu nome, por favor?');
        session.name = name; session.state = 'confirm';
        return out(['Então fica assim:\n' + session.service + '\n' + dayLabel(session.date) + ', às ' + timeLabel(session.time) + '\nEm nome de ' + name + ', com o contacto ' + ctx.phone + '.',
          'Está bem? Uso o nome e o número só para esta marcação.'], ['Sim, está bem', 'Quero alterar']);
      }
      case 'confirm': {
        if (/^(sim|s|ok|certo|confirmo|confirmar|perfeito|esta bem|pode ser|claro)\b/.test(t)) {
          var still = await freeSlots(cfg, provider, session.date, session.minutes, now);
          if (still.indexOf(session.time) < 0) {
            var again = await askTime();
            again.replies.unshift('Peço desculpa, esse horário acabou de ser ocupado.');
            return again;
          }
          await provider.book({ date: session.date, time: session.time, minutes: session.minutes, service: session.service, name: session.name, phone: ctx.phone });
          session.state = 'done';
          return out(['Está marcado, ' + firstName(session.name) + '. Esperamos por si ' + dayLabel(session.date) + ', às ' + timeLabel(session.time) + '.',
            'Se precisar de alterar ou cancelar, ligue para o ' + cfg.phone + '.']);
        }
        if (/^(nao|n|quero alterar|alterar|mudar)/.test(t)) return askService();
        return out('Posso confirmar a marcação?', ['Sim, está bem', 'Quero alterar']);
      }
      default: { // done
        if (/marc|outra|nova/.test(t)) { session.state = 'start'; return handle(session, '', ctx); }
        return out('A sua marcação está confirmada. Se quiser marcar outra consulta, é só dizer.', ['Marcar consulta']);
      }
    }
  }

  return { DEFAULTS: DEFAULTS, createSession: createSession, handle: handle, upcomingDays: upcomingDays,
    freeSlots: freeSlots, dayLabel: dayLabel, timeLabel: timeLabel, toMin: toMin, fromMin: fromMin, addMin: addMin };
});
