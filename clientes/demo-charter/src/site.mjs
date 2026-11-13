// Shared configuration. Everything marked TODO is a placeholder to be replaced
// with real information before the site goes live.

export const SITE = {
  name: 'Cabo Raso',
  legalName: 'Cabo Raso Private Charter', // TODO real company name
  tagline: 'Aviação, helicópteros, iates e transfers VIP',
  url: 'https://www.example.com', // TODO final domain (used in canonical, Open Graph and schema.org)
  city: 'Lisboa',
  phoneDisplay: '+351 000 000 000', // TODO
  phoneHref: '+351000000000', // TODO
  whatsapp: '351000000000', // TODO
  email: 'charter@example.com', // TODO
  address: { street: '[Morada por preencher]', postal: '0000-000', city: 'Lisboa' }, // TODO
  googleReviewUrl: 'https://www.google.com/maps', // TODO link "write a review" of the Google Business Profile
  social: { instagram: '#', linkedin: '#' }, // TODO
  // Only switch to true when the reviews on the Reviews page are real and verifiable.
  // While false, no Review / AggregateRating markup is published.
  reviewsAreReal: false,
};

// When LOCAL=1 links end in index.html so the site can be opened from disk.
export const LOCAL = process.env.LOCAL === '1';

// Page registry: id -> path per language (clean URLs, folders with index.html).
export const PATHS = {
  home: { en: '', pt: 'pt/' },
  company: { en: 'company/', pt: 'pt/empresa/' },
  services: { en: 'services/', pt: 'pt/servicos/' },
  aviation: { en: 'services/private-aviation/', pt: 'pt/servicos/aviacao-privada/' },
  helicopters: { en: 'services/helicopters/', pt: 'pt/servicos/helicopteros/' },
  yachts: { en: 'services/yachts-and-boats/', pt: 'pt/servicos/iates-e-barcos/' },
  transfers: { en: 'services/vip-transfers/', pt: 'pt/servicos/transfers-vip/' },
  blog: { en: 'blog/', pt: 'pt/blog/' },
  'post-algarve': { en: 'blog/helicopter-or-car-to-the-algarve/', pt: 'pt/blog/helicoptero-ou-carro-para-o-algarve/' },
  'post-pricing': { en: 'blog/how-private-jet-charter-pricing-works/', pt: 'pt/blog/como-se-calcula-o-preco-de-um-jato-privado/' },
  'post-wedding': { en: 'blog/planning-transfers-for-a-wedding/', pt: 'pt/blog/planear-os-transfers-de-um-casamento/' },
  reviews: { en: 'reviews/', pt: 'pt/avaliacoes/' },
  contact: { en: 'contact/', pt: 'pt/contacto/' },
  quote: { en: 'quote/', pt: 'pt/orcamento/' },
  privacy: { en: 'privacy/', pt: 'pt/privacidade/' },
  terms: { en: 'terms/', pt: 'pt/termos/' },
};

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Context for one page in one language: translation picker and link builders.
export function ctx(id, L) {
  const path = PATHS[id][L];
  const depth = path.split('/').filter(Boolean).length;
  const root = '../'.repeat(depth);
  const tail = LOCAL ? 'index.html' : '';
  return {
    id,
    L,
    root,
    _: (en, pt) => (L === 'en' ? en : pt),
    href: (pid, lang = L) => (root + PATHS[pid][lang] + tail) || './',
    asset: (p) => root + 'assets/' + p,
    abs: (pid = id, lang = L) => SITE.url + '/' + PATHS[pid][lang],
  };
}

// ---------------------------------------------------------------------------
// Image manifest. Every image on the site is listed here; the build writes an
// SVG placeholder for each one and the README lists what has to be supplied.
// ---------------------------------------------------------------------------
export const IMAGES = {
  'hero-home': { w: 2400, h: 1350, en: 'Helicopter over the coast near Lisbon at dusk, seen from the side', pt: 'Helicóptero sobre a costa perto de Lisboa ao entardecer, visto de lado', ly: 0.13 },
  'service-aviation': { w: 1600, h: 1100, en: 'Light jet on the apron with the cabin door open, early morning', pt: 'Jato ligeiro na placa com a porta da cabine aberta, de manhã cedo' },
  'service-helicopters': { w: 1600, h: 1100, en: 'Helicopter landing on a private lawn in the Douro valley', pt: 'Helicóptero a aterrar num relvado privado no vale do Douro' },
  'service-yachts': { w: 1600, h: 1100, en: 'Motor yacht at anchor off the Arrábida coast', pt: 'Iate a motor ancorado ao largo da Arrábida' },
  'service-transfers': { w: 1600, h: 1100, en: 'Chauffeur opening the door of a black saloon outside a hotel', pt: 'Motorista a abrir a porta de uma berlina preta à entrada de um hotel' },
  'head-company': { w: 2400, h: 1000, en: 'Hangar interior with a jet and a helicopter, crew walking past', pt: 'Interior de hangar com um jato e um helicóptero, tripulação a passar' },
  'company-work': { w: 1400, h: 1700, en: 'Operations desk with flight planning charts and a phone', pt: 'Mesa de operações com cartas de planeamento de voo e um telefone' },
  'team-1': { w: 800, h: 1000, en: 'Portrait of the founder', pt: 'Retrato do fundador' },
  'team-2': { w: 800, h: 1000, en: 'Portrait of the head of flight operations', pt: 'Retrato do responsável de operações de voo' },
  'team-3': { w: 800, h: 1000, en: 'Portrait of the client manager', pt: 'Retrato do gestor de clientes' },
  'team-4': { w: 800, h: 1000, en: 'Portrait of the head chauffeur', pt: 'Retrato do motorista-chefe' },
  'head-aviation': { w: 2400, h: 1000, en: 'Private jet taking off over the Tagus estuary', pt: 'Jato privado a descolar sobre o estuário do Tejo' },
  'head-helicopters': { w: 2400, h: 1000, en: 'Helicopter cockpit view approaching the Algarve coast', pt: 'Vista da cabine de um helicóptero a aproximar-se da costa algarvia' },
  'head-yachts': { w: 2400, h: 1000, en: 'Yacht deck at sunset with Cascais bay behind', pt: 'Convés de iate ao pôr do sol com a baía de Cascais ao fundo' },
  'head-transfers': { w: 2400, h: 1000, en: 'Black saloon waiting beside a private jet on the apron', pt: 'Berlina preta à espera junto a um jato privado na placa' },
  'fleet-jet-light': { w: 1200, h: 800, en: 'Light jet, exterior three-quarter view', pt: 'Jato ligeiro, vista exterior a três quartos' },
  'fleet-jet-mid': { w: 1200, h: 800, en: 'Midsize jet, cabin interior', pt: 'Jato médio, interior da cabine' },
  'fleet-jet-long': { w: 1200, h: 800, en: 'Long-range jet on the runway', pt: 'Jato de longo curso na pista' },
  'fleet-heli-single': { w: 1200, h: 800, en: 'Single-engine helicopter on a helipad', pt: 'Helicóptero monomotor num heliporto' },
  'fleet-heli-panoramic': { w: 1200, h: 800, en: 'Helicopter with panoramic cabin windows', pt: 'Helicóptero com janelas panorâmicas' },
  'fleet-heli-twin': { w: 1200, h: 800, en: 'Twin-engine helicopter in flight', pt: 'Helicóptero bimotor em voo' },
  'fleet-yacht-motor': { w: 1200, h: 800, en: 'Motor yacht under way, aerial view', pt: 'Iate a motor em andamento, vista aérea' },
  'fleet-yacht-cat': { w: 1200, h: 800, en: 'Sailing catamaran with guests on the foredeck', pt: 'Catamarã à vela com convidados na proa' },
  'fleet-yacht-tender': { w: 1200, h: 800, en: 'Fast tender boat leaving a marina', pt: 'Lancha rápida a sair de uma marina' },
  'fleet-car-saloon': { w: 1200, h: 800, en: 'Executive saloon, side view', pt: 'Berlina executiva, vista lateral' },
  'fleet-car-van': { w: 1200, h: 800, en: 'Luxury van interior with facing seats', pt: 'Interior de carrinha de luxo com bancos frente a frente' },
  'fleet-car-minibus': { w: 1200, h: 800, en: 'Executive minibus outside a venue', pt: 'Minibus executivo à porta de um evento' },
  'blog-algarve': { w: 1600, h: 1000, en: 'Algarve cliffs from the air with a helicopter shadow on the water', pt: 'Falésias do Algarve vistas do ar com a sombra de um helicóptero na água' },
  'blog-pricing': { w: 1600, h: 1000, en: 'Jet cabin table with a tablet showing a route map', pt: 'Mesa de cabine de jato com um tablet a mostrar um mapa de rota' },
  'blog-wedding': { w: 1600, h: 1000, en: 'Line of black cars on a gravel drive at a wedding estate', pt: 'Fila de carros pretos num caminho de gravilha de uma quinta de casamentos' },
};

const wrap = (text, max) => {
  const out = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max) { out.push(line); line = word; }
    else line = (line + ' ' + word).trim();
  }
  if (line) out.push(line);
  return out;
};

// A sober placeholder: sky, sea, a horizon line and the brief for the photographer.
export function placeholderSvg(key) {
  const im = IMAGES[key];
  const { w, h } = im;
  const hue = 212 + ((key.length * 7) % 16);
  const cx = (im.lx ?? 0.5) * w;
  const cy = (im.ly ?? (key.startsWith('head-') ? 0.26 : 0.42)) * h;
  const fs = Math.round(w / (w > 2000 ? 64 : 46));
  const lines = wrap(im.en, 34);
  const horizon = Math.round(h * 0.64);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<rect width="${w}" height="${h}" fill="hsl(${hue} 34% 17%)"/>
<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="hsl(${hue} 38% 12%)"/>
<line x1="0" y1="${horizon}" x2="${w}" y2="${horizon}" stroke="hsl(${hue} 30% 34%)" stroke-width="${Math.max(2, w / 800)}"/>
<g font-family="Helvetica, Arial, sans-serif" text-anchor="middle" fill="hsl(${hue} 24% 66%)">
<text x="${cx}" y="${cy}" font-size="${Math.round(fs * 0.72)}">Photo to supply, ${w} x ${h}</text>
${lines.map((l, i) => `<text x="${cx}" y="${cy + fs * 1.5 * (i + 1.1)}" font-size="${fs}" fill="hsl(${hue} 28% 80%)">${esc(l)}</text>`).join('\n')}
</g>
</svg>
`;
}

export function img(c, key, { cls = '', eager = false, sizes = '100vw' } = {}) {
  const im = IMAGES[key];
  if (!im) throw new Error('Unknown image ' + key);
  return `<img src="${c.asset('img/' + key + '.svg')}" alt="${esc(im[c.L])}" width="${im.w}" height="${im.h}"${cls ? ` class="${cls}"` : ''}${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'} sizes="${sizes}">`;
}
