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
    handoff: 'Claro. Fale com a receção pelo 210 000 000, em horário de expediente.'
  };

  var WD = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function toMin(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }
  function fromMin(m) { return pad(Math.floor(m / 60)) + ':' + pad(m % 60); }
  function addMin(t, m) { return fromMin(toMin(t) + m); }
  function dow(dateISO) { var p = dateISO.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).getDay(); }
  function dayLabel(dateISO) { var p = dateISO.split('-'); return WD[dow(dateISO)] + ' ' + p[2] + '/' + p[1]; }
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
    var t = norm(text).replace('h', ':').replace(/:$/, ':00');
    var n = parseInt(t, 10);
    if (String(n) === t && n >= 1 && n <= slots.length) return slots[n - 1];
    if (/^\d{1,2}$/.test(t)) t = pad(+t) + ':00';
    return slots.indexOf(t) >= 0 ? t : (slots.indexOf('0' + t) >= 0 ? '0' + t : null);
  }

  // Devolve { session, replies: [texto...], options: [atalhos...] }
  async function handle(session, text, ctx) {
    var cfg = ctx.cfg || DEFAULTS, provider = ctx.provider, now = ctx.now || new Date();
    var t = norm(text);
    function out(msgs, opts) { return { session: session, replies: [].concat(msgs), options: opts || [] }; }

    if (/(humano|pessoa|rececao|rececionista|falar com)/.test(t)) return out(cfg.handoff);
    if (/^(cancelar|recomecar|reiniciar|menu)$/.test(t)) session.state = 'start';

    async function askService() {
      session.state = 'service';
      return out('Que serviço procura?\n' + list(cfg.services, function (s) { return s.label; }),
        cfg.services.map(function (s) { return s.label; }));
    }
    async function askDay() {
      var days = [];
      for (var d of upcomingDays(cfg, now)) {
        if ((await freeSlots(cfg, provider, d, session.minutes, now)).length) days.push(d);
      }
      if (!days.length) return out('De momento não tenho horários livres. ' + cfg.handoff);
      session.days = days; session.state = 'day';
      return out('Que dia prefere?\n' + list(days, dayLabel), days.map(dayLabel));
    }
    async function askTime() {
      var slots = await freeSlots(cfg, provider, session.date, session.minutes, now);
      if (!slots.length) return askDay();
      if (slots.length > 8) slots = slots.filter(function (_, i) { return i % Math.ceil(slots.length / 8) === 0; });
      session.slots = slots; session.state = 'time';
      return out('Horários livres em ' + dayLabel(session.date) + ':\n' + list(slots, function (s) { return s; }), slots);
    }

    switch (session.state) {
      case 'start': {
        var first = await askService();
        first.replies.unshift('Olá! Sou o assistente da ' + cfg.clinic + '. Posso marcar a sua consulta agora. Guardo só o nome e o telemóvel, para a marcação. Para falar com uma pessoa, escreva "receção".');
        return first;
      }
      case 'service': {
        var s = pick(text, cfg.services, function (x) { return x.label; });
        if (!s) return out('Não percebi. Escolha um número da lista, por favor.\n' + list(cfg.services, function (x) { return x.label; }), cfg.services.map(function (x) { return x.label; }));
        session.service = s.label; session.minutes = s.minutes;
        return askDay();
      }
      case 'day': {
        var d = pick(text, session.days, dayLabel);
        if (!d) return out('Escolha um dos dias da lista, por favor.\n' + list(session.days, dayLabel), session.days.map(dayLabel));
        session.date = d;
        return askTime();
      }
      case 'time': {
        var tm = pickSlot(text, session.slots);
        if (!tm) return out('Escolha um dos horários da lista, por favor.\n' + list(session.slots, function (x) { return x; }), session.slots);
        session.time = tm; session.state = 'name';
        return out('Qual é o seu nome?');
      }
      case 'name': {
        var name = (text || '').trim();
        if (name.length < 2) return out('Pode dizer-me o seu nome, por favor?');
        session.name = name; session.state = 'confirm';
        return out('Confirma a marcação?\n' + session.service + '\n' + dayLabel(session.date) + ' às ' + session.time + '\nNome: ' + session.name + '\nTelemóvel: ' + ctx.phone + '\nResponda SIM para confirmar ou NÃO para alterar.', ['Sim', 'Não']);
      }
      case 'confirm': {
        if (/^(sim|s|confirmo|confirmar|ok)$/.test(t)) {
          var still = await freeSlots(cfg, provider, session.date, session.minutes, now);
          if (still.indexOf(session.time) < 0) {
            var again = await askTime();
            again.replies.unshift('Esse horário acabou de ficar ocupado. Escolha outro, por favor.');
            return again;
          }
          await provider.book({ date: session.date, time: session.time, minutes: session.minutes, service: session.service, name: session.name, phone: ctx.phone });
          session.state = 'done';
          return out('Marcação confirmada: ' + session.service + ', ' + dayLabel(session.date) + ' às ' + session.time + '. Para alterar ou cancelar, fale com a receção. Até breve!');
        }
        if (/^(nao|n)$/.test(t)) return askService();
        return out('Responda SIM para confirmar ou NÃO para alterar.', ['Sim', 'Não']);
      }
      default: { // done
        if (/marc/.test(t)) { session.state = 'start'; return handle(session, '', ctx); }
        return out('A sua marcação está confirmada. Para marcar outra, escreva "marcar".', ['Marcar']);
      }
    }
  }

  return { DEFAULTS: DEFAULTS, createSession: createSession, handle: handle, upcomingDays: upcomingDays,
    freeSlots: freeSlots, dayLabel: dayLabel, toMin: toMin, fromMin: fromMin, addMin: addMin };
});
