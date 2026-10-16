/* Agenda da clínica no Google Calendar. */
const { google } = require('googleapis');
const B = require('./flow');

function localParts(ms, tz) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  const p = Object.fromEntries(f.formatToParts(new Date(ms)).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, min: +p.hour * 60 + +p.minute };
}

function createCalendarProvider({ calendarId, tz, credentials }) {
  const auth = new google.auth.GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/calendar'] });
  const cal = google.calendar({ version: 'v3', auth });

  return {
    // Intervalos ocupados nesse dia, em hora local ('HH:MM').
    async busy(dateISO) {
      const base = Date.parse(dateISO + 'T00:00:00Z');
      const { data } = await cal.freebusy.query({ requestBody: {
        timeMin: new Date(base - 36 * 3600e3).toISOString(),
        timeMax: new Date(base + 60 * 3600e3).toISOString(),
        timeZone: tz, items: [{ id: calendarId }] } });
      const out = [];
      for (const b of data.calendars[calendarId].busy || []) {
        const s = localParts(Date.parse(b.start), tz), e = localParts(Date.parse(b.end), tz);
        if (s.date > dateISO || e.date < dateISO) continue;
        out.push({ start: B.fromMin(s.date < dateISO ? 0 : s.min), end: B.fromMin(e.date > dateISO ? 1440 : e.min) });
      }
      return out;
    },
    async book({ date, time, minutes, service, name, phone }) {
      const { data } = await cal.events.insert({ calendarId, requestBody: {
        summary: `Marcação: ${service} – ${name}`,
        description: `Telemóvel: ${phone}\nOrigem: WhatsApp`,
        start: { dateTime: `${date}T${time}:00`, timeZone: tz },
        end: { dateTime: `${date}T${B.addMin(time, minutes)}:00`, timeZone: tz } } });
      return { id: data.id };
    }
  };
}

module.exports = { createCalendarProvider };
