import { SITE, esc, ctx, IMAGES, ogImage as ogFile } from './site.mjs';

export const SERVICE_IDS = ['aviation', 'helicopters', 'yachts', 'transfers'];

export const serviceName = (c, id) =>
  ({
    aviation: c._('Private Aviation', 'Aviação Privada'),
    helicopters: c._('Helicopters', 'Helicópteros'),
    yachts: c._('Yachts & Boats', 'Iates e Barcos'),
    transfers: c._('VIP Transfers', 'Transfers VIP'),
  })[id];

export const quoteLabel = (c) => c._('Get a free Quote', 'Pedir orçamento gratuito');

const navItems = (c) => [
  ['home', c._('Home', 'Início')],
  ['company', c._('Company', 'Empresa')],
  ['services', c._('Services', 'Serviços')],
  ['blog', 'Blog'],
  ['reviews', c._('Reviews', 'Avaliações')],
  ['contact', c._('Contact', 'Contacto')],
];

// Which top-level menu item a page belongs to.
const sectionOf = (id) =>
  SERVICE_IDS.includes(id) ? 'services' : id.startsWith('post-') ? 'blog' : id;

function header(c) {
  const section = sectionOf(c.id);
  const current = (pid) => (pid === c.id ? ' aria-current="page"' : pid === section ? ' class="is-section"' : '');
  const other = c.L === 'en' ? 'pt' : 'en';
  const links = navItems(c)
    .map(([pid, label]) => {
      if (pid !== 'services') return `<li><a href="${c.href(pid)}"${current(pid)}>${label}</a></li>`;
      return `<li class="has-sub">
          <a href="${c.href(pid)}"${current(pid)}>${label}</a>
          <button class="sub-toggle" type="button" aria-expanded="false" aria-controls="sub-services" aria-label="${c._('Show services', 'Mostrar serviços')}"><svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button>
          <ul class="sub" id="sub-services">
            ${SERVICE_IDS.map((s) => `<li><a href="${c.href(s)}"${s === c.id ? ' aria-current="page"' : ''}>${serviceName(c, s)}</a></li>`).join('\n            ')}
          </ul>
        </li>`;
    })
    .join('\n        ');
  return `<a class="skip" href="#main">${c._('Skip to content', 'Saltar para o conteúdo')}</a>
<header class="site-header" id="top">
  <div class="bar">
    <a class="brand" href="${c.href('home')}" aria-label="${SITE.name}, ${c._('home', 'início')}">
      <span class="brand-name">${SITE.name}</span>
      <span class="brand-tag" lang="pt">${SITE.tagline}</span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="menu-toggle-label">Menu</span>
      <span class="menu-toggle-icon" aria-hidden="true"></span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="${c._('Main', 'Principal')}">
      <ul class="menu">
        ${links}
      </ul>
      <div class="nav-side">
        <div class="lang" role="group" aria-label="${c._('Language', 'Idioma')}">
          <a href="${c.href(c.id, 'en')}" lang="en" hreflang="en"${c.L === 'en' ? ' aria-current="true"' : ''}>EN</a>
          <a href="${c.href(c.id, 'pt')}" lang="pt" hreflang="pt"${c.L === 'pt' ? ' aria-current="true"' : ''}>PT</a>
        </div>
        <a class="btn btn-gold" href="${c.href('quote')}">${quoteLabel(c)}</a>
      </div>
    </nav>
  </div>
</header>`;
}

function footer(c) {
  const a = SITE.address;
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <p class="brand-name">${SITE.name}</p>
      <p class="brand-tag" lang="pt">${SITE.tagline}</p>
      <p class="muted footer-note">${c._('Prototype for demonstration. Company details, licences and reviews are placeholders.', 'Protótipo de demonstração. Dados da empresa, licenças e avaliações são fictícios.')}</p>
    </div>
    <nav aria-label="${c._('Footer', 'Rodapé')}">
      <h2 class="foot-h">${c._('Menu', 'Menu')}</h2>
      <ul>
        ${navItems(c).map(([pid, label]) => `<li><a href="${c.href(pid)}">${label}</a></li>`).join('\n        ')}
        <li><a href="${c.href('quote')}">${quoteLabel(c)}</a></li>
      </ul>
    </nav>
    <div>
      <h2 class="foot-h">${c._('Contact', 'Contacto')}</h2>
      <ul>
        <li><a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a></li>
        <li><a href="https://wa.me/${SITE.whatsapp}" rel="noopener">WhatsApp</a></li>
        <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
        <li class="muted">${a.street}<br>${a.postal} ${a.city}, Portugal</li>
        <li class="muted">${c._('Operations desk open 24 hours, every day', 'Operações disponíveis 24 horas, todos os dias')}</li>
      </ul>
    </div>
    <div>
      <h2 class="foot-h">${c._('Follow and legal', 'Redes e legal')}</h2>
      <ul>
        <li><a href="${SITE.social.instagram}" rel="noopener">Instagram</a></li>
        <li><a href="${SITE.social.linkedin}" rel="noopener">LinkedIn</a></li>
        <li><a href="${c.href('privacy')}">${c._('Privacy Policy', 'Política de Privacidade')}</a></li>
        <li><a href="${c.href('terms')}">${c._('Terms', 'Termos e Condições')}</a></li>
        <li><a href="https://www.livroreclamacoes.pt/" rel="noopener" lang="pt">Livro de Reclamações</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-base">
    <p class="muted">© 2026 ${SITE.legalName}. ${c._('Flights are operated by licensed air carriers.', 'Os voos são operados por transportadoras aéreas licenciadas.')}</p>
  </div>
</footer>
<a class="quote-dock btn btn-gold" href="${c.href('quote')}">${quoteLabel(c)}</a>`;
}

export const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

export const businessLd = (c) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE.url + '/#business',
  name: SITE.legalName,
  description: c._(
    'Private jet charter, helicopter flights, yacht charter and chauffeured transfers from Lisbon, across Portugal and Europe.',
    'Charter de jatos privados, voos de helicóptero, aluguer de iates e transfers com motorista a partir de Lisboa, em Portugal e na Europa.'
  ),
  url: c.abs('home'),
  telephone: SITE.phoneHref,
  email: SITE.email,
  image: SITE.url + '/assets/img/og-default.jpg',
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, postalCode: SITE.address.postal, addressLocality: SITE.address.city, addressCountry: 'PT' },
  areaServed: ['Portugal', 'Europe'],
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
});

// Full HTML document.
export function page(id, L, { title, description, ogImage = 'hero-home', ogType = 'website', ld = [], body, bodyClass = '' }) {
  const c = ctx(id, L);
  const im = IMAGES[ogImage];
  const fullTitle = id === 'home' ? title : `${title} | ${SITE.name}`;
  return `<!doctype html>
<html lang="${L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${c.abs()}">
<link rel="alternate" hreflang="en" href="${c.abs(id, 'en')}">
<link rel="alternate" hreflang="pt" href="${c.abs(id, 'pt')}">
<link rel="alternate" hreflang="x-default" href="${c.abs(id, 'en')}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${c.abs()}">
<meta property="og:locale" content="${L === 'en' ? 'en_GB' : 'pt_PT'}">
<meta property="og:image" content="${SITE.url}/assets/img/${ogFile(ogImage)}">
<meta property="og:image:alt" content="${esc(im[L])}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A1220">
<script>document.documentElement.classList.add('js')</script>
<link rel="icon" href="${c.asset('img/favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${c.asset('fonts/libre-caslon-display-latin-400-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${c.asset('fonts/schibsted-grotesk-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${c.asset('css/style.css')}">
${ld.map(jsonLd).join('\n')}
</head>
<body class="${bodyClass}">
${header(c)}
<main id="main">
${body(c)}
</main>
${footer(c)}
<script src="${c.asset('js/site.js')}" defer></script>
</body>
</html>
`;
}

// Shared blocks -------------------------------------------------------------

export const pageHead = (c, { title, lead, image, crumbs = [] }) => `<section class="page-head${image ? ' has-image' : ''}">
  ${image ? image + '<div class="shade" aria-hidden="true"></div>' : ''}
  <div class="wrap page-head-inner">
    ${crumbs.length ? `<nav class="crumbs" aria-label="${c._('Breadcrumb', 'Caminho')}"><ol>${crumbs.map(([pid, label]) => `<li><a href="${c.href(pid)}">${label}</a></li>`).join('')}<li aria-current="page">${title}</li></ol></nav>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

export const closing = (c, { title, text }) => `<section class="closing">
  <div class="wrap closing-inner">
    <h2>${title}</h2>
    <p class="lead">${text}</p>
    <p class="closing-actions">
      <a class="btn btn-gold" href="${c.href('quote')}">${quoteLabel(c)}</a>
      <a class="text-link" href="tel:${SITE.phoneHref}">${c._('or call', 'ou ligue')} ${SITE.phoneDisplay}</a>
    </p>
  </div>
</section>`;
