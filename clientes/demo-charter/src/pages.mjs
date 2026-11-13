import { SITE, img } from './site.mjs';
import { page, pageHead, closing, serviceName, quoteLabel, SERVICE_IDS, businessLd } from './layout.mjs';
import { routeLines, popularRoutes, serviceShort } from './services.mjs';
import { POSTS, postCard, fmtDate } from './blog.mjs';

const serviceOptions = (c, selected) =>
  SERVICE_IDS.map((s) => `<option value="${s}"${s === selected ? ' selected' : ''}>${serviceName(c, s)}</option>`).join('');

// Placeholder reviews. They are labelled as samples on the page and are never
// published as schema.org Review markup while SITE.reviewsAreReal is false.
const REVIEWS = [
  { service: 'helicopters', date: '2026-10-05', stars: 5, en: 'Sample review. Replace with a verified Google review from a client who booked a helicopter transfer.', pt: 'Avaliação de exemplo. Substituir por uma avaliação verificada do Google de um cliente que reservou um transfer de helicóptero.' },
  { service: 'aviation', date: '2026-09-22', stars: 5, en: 'Sample review. Replace with a verified Google review from a client who chartered a jet.', pt: 'Avaliação de exemplo. Substituir por uma avaliação verificada do Google de um cliente que alugou um jato.' },
  { service: 'transfers', date: '2026-09-10', stars: 5, en: 'Sample review. Replace with a verified Google review from a hotel or concierge that books transfers.', pt: 'Avaliação de exemplo. Substituir por uma avaliação verificada do Google de um hotel ou concierge que reserva transfers.' },
  { service: 'yachts', date: '2026-08-30', stars: 5, en: 'Sample review. Replace with a verified Google review from a client who chartered a yacht for the day.', pt: 'Avaliação de exemplo. Substituir por uma avaliação verificada do Google de um cliente que alugou um iate por um dia.' },
  { service: 'transfers', date: '2026-08-12', stars: 4, en: 'Sample review. Replace with a verified Google review from a wedding planner.', pt: 'Avaliação de exemplo. Substituir por uma avaliação verificada do Google de um organizador de casamentos.' },
  { service: 'helicopters', date: '2026-07-19', stars: 5, en: 'Sample review. Replace with a verified Google review from a client who took a scenic flight.', pt: 'Avaliação de exemplo. Substituir por uma avaliação verificada do Google de um cliente que fez um voo panorâmico.' },
];

const stars = (c, n) => `<span class="stars" role="img" aria-label="${n} ${c._('out of 5', 'em 5')}">${'★'.repeat(n)}<span class="off">${'★'.repeat(5 - n)}</span></span>`;

const reviewCard = (c, r, i) => `<article class="review" data-cat="${r.service}">
  <p class="tag">${c._('Sample', 'Exemplo')}</p>
  ${stars(c, r.stars)}
  <blockquote><p>${r[c.L]}</p></blockquote>
  <footer>
    <p class="review-name">${c._('Client name', 'Nome do cliente')} ${i + 1}</p>
    <p class="muted">${serviceName(c, r.service)}, <time datetime="${r.date}">${fmtDate(c.L, r.date)}</time></p>
  </footer>
</article>`;

// --------------------------------------------------------------------------- Home
export function home(L) {
  return page('home', L, {
    title: L === 'en' ? 'Cabo Raso | Private jets, helicopters, yachts and VIP transfers in Portugal' : 'Cabo Raso | Jatos privados, helicópteros, iates e transfers VIP em Portugal',
    description: L === 'en' ? 'Private jet charter, helicopter flights, yacht charter and chauffeured transfers from Lisbon, across Portugal and Europe. Quote within two hours.' : 'Charter de jatos privados, voos de helicóptero, aluguer de iates e transfers com motorista a partir de Lisboa, em Portugal e na Europa. Orçamento em duas horas.',
    bodyClass: 'is-home',
    ld: [businessLd({ _: (en, pt) => (L === 'en' ? en : pt), abs: () => SITE.url + (L === 'en' ? '/' : '/pt/') })],
    body: (c) => `<section class="hero">
  ${img(c, 'hero-home', { eager: true, cls: 'cover' })}
  <div class="shade" aria-hidden="true"></div>
  <div class="wrap hero-inner">
    <h1>${c._('Portugal, in a straight line.', 'Portugal, em linha reta.')}</h1>
    <p class="lead">${c._('Private jets, helicopters, yachts and chauffeured cars, planned by one team in Lisbon.', 'Jatos privados, helicópteros, iates e carros com motorista, planeados por uma só equipa em Lisboa.')}</p>
    <form class="quick-quote" action="${c.href('quote')}" method="get" aria-label="${c._('Quick quote', 'Orçamento rápido')}">
      <label><span>${c._('Service', 'Serviço')}</span><select name="service">${serviceOptions(c, 'helicopters')}</select></label>
      <label><span>${c._('From', 'Origem')}</span><input type="text" name="from" placeholder="${c._('Lisbon', 'Lisboa')}" autocomplete="off"></label>
      <label><span>${c._('To', 'Destino')}</span><input type="text" name="to" placeholder="${c._('Vilamoura', 'Vilamoura')}" autocomplete="off"></label>
      <label><span>${c._('Date', 'Data')}</span><input type="date" name="date"></label>
      <label><span>${c._('Passengers', 'Passageiros')}</span><input type="number" name="pax" min="1" max="60" value="2" inputmode="numeric"></label>
      <button class="btn btn-gold" type="submit">${quoteLabel(c)}</button>
    </form>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2>${c._('Four services, one plan', 'Quatro serviços, um só plano')}</h2>
      <p class="lead">${c._('Book one leg or the whole journey. The same person follows it from the first call to the last door.', 'Reserve um trajeto ou a viagem completa. A mesma pessoa acompanha tudo, da primeira chamada à última porta.')}</p>
    </div>
    <ul class="tiles">
      ${SERVICE_IDS.map(
        (s) => `<li class="tile">
        <a href="${c.href(s)}">
          ${img(c, 'service-' + s, { cls: 'fade', sizes: '(min-width: 760px) 50vw, 100vw' })}
          <span class="tile-text"><span class="tile-name">${serviceName(c, s)}</span><span class="tile-line">${serviceShort(c, s)}</span></span>
        </a>
      </li>`
      ).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section section-rule">
  <div class="wrap">
    <div class="section-head">
      <h2>${c._('Popular routes, drawn to scale', 'Rotas mais pedidas, à escala')}</h2>
      <p class="lead">${c._('Each line is as long as the journey takes. The short one is yours.', 'Cada linha tem o comprimento do tempo de viagem. A curta é a sua.')}</p>
    </div>
    ${routeLines(c, popularRoutes(c))}
  </div>
</section>

<section class="section section-rule">
  <div class="wrap">
    <div class="section-head"><h2>${c._('How it works', 'Como funciona')}</h2></div>
    <ol class="steps">
      <li><h3>${c._('You send the request', 'Envia o pedido')}</h3><p>${c._('Route, date and number of passengers, by form, phone or WhatsApp. It takes two minutes.', 'Rota, data e número de passageiros, por formulário, telefone ou WhatsApp. Demora dois minutos.')}</p></li>
      <li><h3>${c._('We reply with options', 'Respondemos com opções')}</h3><p>${c._('Usually within two hours: aircraft, boat or car, the operator’s name, and a fixed price.', 'Normalmente em duas horas: aeronave, barco ou carro, o nome do operador e um preço fechado.')}</p></li>
      <li><h3>${c._('You confirm and travel', 'Confirma e viaja')}</h3><p>${c._('We handle permits, crew and ground transport. You receive one itinerary and one phone number.', 'Tratamos de autorizações, tripulação e transporte terrestre. Recebe um itinerário e um número de telefone.')}</p></li>
    </ol>
  </div>
</section>

<section class="section section-rule">
  <div class="wrap">
    <div class="section-head split">
      <h2>${c._('What clients say', 'O que dizem os clientes')}</h2>
      <a class="text-link" href="${c.href('reviews')}">${c._('Read all reviews', 'Ler todas as avaliações')}</a>
    </div>
    <div class="review-grid">
      ${REVIEWS.slice(0, 3).map((r, i) => reviewCard(c, r, i)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section-rule">
  <div class="wrap">
    <div class="section-head split">
      <h2>${c._('From the blog', 'Do blog')}</h2>
      <a class="text-link" href="${c.href('blog')}">${c._('All articles', 'Todos os artigos')}</a>
    </div>
    <div class="post-grid">
      ${POSTS.map((p) => postCard(c, p)).join('\n      ')}
    </div>
  </div>
</section>

${closing(c, { title: c._('Where are you going next', 'Para onde vai a seguir'), text: c._('Tell us the route and the date. We reply with options and a fixed price, usually within two hours.', 'Diga-nos a rota e a data. Respondemos com opções e preço fechado, normalmente em duas horas.') })}`,
  });
}

// --------------------------------------------------------------------------- Company
export function company(L) {
  return page('company', L, {
    title: L === 'en' ? 'Company: who we are and how we work' : 'Empresa: quem somos e como trabalhamos',
    description: L === 'en' ? 'A Lisbon team that plans private flights, helicopter transfers, yacht days and chauffeured cars across Portugal, with licensed operators only.' : 'Uma equipa de Lisboa que planeia voos privados, transfers de helicóptero, dias de iate e carros com motorista em todo o país, apenas com operadores licenciados.',
    ogImage: 'head-company',
    ld: [businessLd({ _: (en, pt) => (L === 'en' ? en : pt), abs: () => SITE.url + (L === 'en' ? '/' : '/pt/') })],
    body: (c) => {
      const todo = c._('to be supplied', 'por preencher');
      const trust = [
        [c._('Safety and certification', 'Segurança e certificação'), c._(`Every flight is flown by an air carrier holding an Air Operator Certificate. Certificate no. [${todo}].`, `Cada voo é realizado por uma transportadora aérea titular de Certificado de Operador Aéreo. Certificado n.º [${todo}].`)],
        [c._('Licensed operators', 'Operadores licenciados'), c._(`We work only with licensed air, maritime and road operators, and name them in every quote. Our own registration no. [${todo}].`, `Trabalhamos apenas com operadores aéreos, marítimos e rodoviários licenciados, e indicamo-los em cada orçamento. O nosso registo n.º [${todo}].`)],
        [c._('Insurance', 'Seguro'), c._(`Passengers, luggage and third parties are covered on every service. Insurer and policy no. [${todo}].`, `Passageiros, bagagem e terceiros estão cobertos em todos os serviços. Seguradora e apólice n.º [${todo}].`)],
        [c._('Available 24 hours', 'Disponíveis 24 horas'), c._('The operations desk answers day and night, every day of the year.', 'A equipa de operações atende de dia e de noite, todos os dias do ano.')],
        [c._('Confidentiality', 'Confidencialidade'), c._('Passenger names and itineraries are shared only with the crew that needs them. We sign non-disclosure agreements on request.', 'Os nomes dos passageiros e os itinerários são partilhados apenas com a tripulação que deles precisa. Assinamos acordos de confidencialidade a pedido.')],
      ];
      const team = [
        ['team-1', c._('Founder and managing director', 'Fundador e diretor-geral')],
        ['team-2', c._('Head of flight operations', 'Responsável de operações de voo')],
        ['team-3', c._('Client manager', 'Gestor de clientes')],
        ['team-4', c._('Head chauffeur', 'Motorista-chefe')],
      ];
      const places = [
        ['Porto', c._('Jets, helicopters, transfers', 'Jatos, helicópteros, transfers')],
        ['Douro', c._('Helicopters, river boats', 'Helicópteros, barcos no rio')],
        [c._('Lisbon and Cascais', 'Lisboa e Cascais'), c._('Base. All four services', 'Base. Os quatro serviços')],
        ['Comporta', c._('Helicopters, transfers, tenders from Tróia', 'Helicópteros, transfers, lanchas a partir de Tróia')],
        ['Alentejo', c._('Helicopters, transfers', 'Helicópteros, transfers')],
        ['Algarve', c._('Jets via Faro, helicopters, yachts, transfers', 'Jatos via Faro, helicópteros, iates, transfers')],
        [c._('Madeira and Europe', 'Madeira e Europa'), c._('Jet charter on request', 'Charter de jatos, a pedido')],
      ];
      return `${pageHead(c, { title: c._('A small team that plans the whole journey', 'Uma equipa pequena que planeia a viagem inteira'), lead: c._('Based in Lisbon, working across Portugal and into Europe.', 'Com base em Lisboa, a trabalhar em todo o país e na Europa.'), image: img(c, 'head-company', { eager: true, cls: 'cover' }) })}
<section class="section">
  <div class="wrap two-col media-right">
    <div class="prose">
      <h2>${c._('Who we are', 'Quem somos')}</h2>
      <p>${c._('Cabo Raso arranges private travel in Portugal: jets, helicopters, yachts and chauffeured cars. We do not sell seats or packages. Each trip is planned for one client, by people who know the airfields, marinas and roads involved.', 'A Cabo Raso organiza viagens privadas em Portugal: jatos, helicópteros, iates e carros com motorista. Não vendemos lugares nem pacotes. Cada viagem é planeada para um cliente, por pessoas que conhecem os aeródromos, as marinas e as estradas envolvidas.')}</p>
      <h2>${c._('How we work', 'Como trabalhamos')}</h2>
      <p>${c._('You deal with one person. That person chooses the operator, checks the aircraft or vessel, and stays reachable until you arrive. Prices are fixed in writing before you confirm, and the operator is always named.', 'Fala com uma só pessoa. Essa pessoa escolhe o operador, verifica a aeronave ou embarcação e mantém-se contactável até à sua chegada. Os preços ficam fechados por escrito antes de confirmar e o operador é sempre identificado.')}</p>
      <p>${c._('When the weather or a schedule changes, we call you with an alternative already arranged.', 'Quando o tempo ou um horário muda, ligamos-lhe já com uma alternativa preparada.')}</p>
    </div>
    <figure class="side-figure">${img(c, 'company-work', { cls: 'fade', sizes: '(min-width: 900px) 40vw, 100vw' })}</figure>
  </div>
</section>
<section class="section section-rule">
  <div class="wrap">
    <div class="section-head"><h2>${c._('What you can rely on', 'Com o que pode contar')}</h2></div>
    <dl class="trust">
      ${trust.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('\n      ')}
    </dl>
  </div>
</section>
<section class="section section-rule">
  <div class="wrap">
    <div class="section-head"><h2>${c._('The team', 'A equipa')}</h2></div>
    <ul class="team">
      ${team.map(([k, role]) => `<li>${img(c, k, { cls: 'fade', sizes: '(min-width: 900px) 25vw, 50vw' })}<h3>${c._('Name Surname', 'Nome Apelido')}</h3><p class="muted">${role}</p></li>`).join('\n      ')}
    </ul>
  </div>
</section>
<section class="section section-rule">
  <div class="wrap two-col">
    <div class="section-head">
      <h2>${c._('The area we cover', 'A área que cobrimos')}</h2>
      <p class="lead">${c._('North to south along the coast, with Lisbon as the base.', 'De norte a sul ao longo da costa, com Lisboa como base.')}</p>
    </div>
    <ol class="coverage">
      ${places.map(([p, d], i) => `<li${i === 2 ? ' class="is-base"' : ''}><span class="place">${p}</span><span class="muted">${d}</span></li>`).join('\n      ')}
    </ol>
  </div>
</section>
${closing(c, { title: c._('Talk to the person who will plan your trip', 'Fale com quem vai planear a sua viagem'), text: c._('Send a request or call. Someone from the team answers, not a call centre.', 'Envie um pedido ou ligue. Atende alguém da equipa, não um call center.') })}`;
    },
  });
}

// --------------------------------------------------------------------------- Reviews
export function reviews(L) {
  const _ = (en, pt) => (L === 'en' ? en : pt);
  const avg = (REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length).toFixed(1);
  const ld = SITE.reviewsAreReal
    ? [{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': SITE.url + '/#business',
        name: SITE.legalName,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: avg, reviewCount: REVIEWS.length },
        review: REVIEWS.map((r) => ({ '@type': 'Review', datePublished: r.date, reviewBody: r[L], reviewRating: { '@type': 'Rating', ratingValue: r.stars }, author: { '@type': 'Person', name: r.name } })),
      }]
    : [];
  return page('reviews', L, {
    title: _('Reviews from our clients', 'Avaliações dos nossos clientes'),
    description: _('What clients say about our private flights, helicopter transfers, yacht charters and chauffeured cars.', 'O que dizem os clientes sobre os nossos voos privados, transfers de helicóptero, alugueres de iates e carros com motorista.'),
    ld,
    body: (c) => `${pageHead(c, { title: c._('Reviews', 'Avaliações'), lead: c._('Feedback from the people who travel with us.', 'A opinião de quem viaja connosco.') })}
<section class="section">
  <div class="wrap">
    <p class="notice">${c._('Prototype: the rating and the reviews on this page are samples. They will be replaced with verified Google reviews.', 'Protótipo: a classificação e as avaliações desta página são exemplos. Serão substituídas por avaliações verificadas do Google.')}</p>
    <div class="rating">
      <p class="rating-figure"><span class="rating-number">${L === 'pt' ? avg.replace('.', ',') : avg}</span> ${stars(c, Math.round(avg))}</p>
      <p class="muted">${c._(`Sample average of ${REVIEWS.length} sample reviews`, `Média de exemplo de ${REVIEWS.length} avaliações de exemplo`)}</p>
      <a class="btn btn-line" href="${SITE.googleReviewUrl}" rel="noopener">${c._('Leave a review on Google', 'Deixar uma avaliação no Google')}</a>
    </div>
  </div>
</section>
<section class="section section-rule">
  <div class="wrap">
    <div class="filter-row">
      <h2>${c._('All reviews', 'Todas as avaliações')}</h2>
      <div class="filter" role="group" aria-label="${c._('Filter by service', 'Filtrar por serviço')}" data-filter="reviews">
        <button type="button" aria-pressed="true" data-value="all">${c._('All', 'Todas')}</button>
        ${SERVICE_IDS.map((s) => `<button type="button" aria-pressed="false" data-value="${s}">${serviceName(c, s)}</button>`).join('\n        ')}
      </div>
    </div>
    <div class="review-grid" id="reviews" aria-live="polite">
      ${REVIEWS.map((r, i) => reviewCard(c, r, i)).join('\n      ')}
    </div>
  </div>
</section>
${closing(c, { title: c._('Travel with us and tell us how it went', 'Viaje connosco e diga-nos como correu'), text: c._('Request a quote for your next trip.', 'Peça orçamento para a sua próxima viagem.') })}`,
  });
}

// --------------------------------------------------------------------------- Contact
const field = (c, { name, label, type = 'text', required = false, auto = '', extra = '' }) =>
  `<div class="field"><label for="f-${name}">${label}${required ? '' : ` <span class="opt">${c._('optional', 'opcional')}</span>`}</label><input id="f-${name}" name="${name}" type="${type}"${required ? ' required' : ''}${auto ? ` autocomplete="${auto}"` : ''}${extra}><p class="error" id="e-${name}" hidden></p></div>`;

const consent = (c) => `<div class="field check"><input id="f-consent" name="consent" type="checkbox" required><label for="f-consent">${c._('I agree that my data is used to answer this request, as described in the', 'Aceito que os meus dados sejam usados para responder a este pedido, conforme descrito na')} <a href="${c.href('privacy')}">${c._('Privacy Policy', 'Política de Privacidade')}</a>.</label><p class="error" id="e-consent" hidden></p></div>`;

export function contact(L) {
  return page('contact', L, {
    title: L === 'en' ? 'Contact: phone, WhatsApp and email' : 'Contacto: telefone, WhatsApp e email',
    description: L === 'en' ? 'Reach the operations desk in Lisbon by phone, WhatsApp, email or form. Open 24 hours, every day.' : 'Fale com a equipa de operações em Lisboa por telefone, WhatsApp, email ou formulário. Disponível 24 horas, todos os dias.',
    ld: [businessLd({ _: (en, pt) => (L === 'en' ? en : pt), abs: () => SITE.url + (L === 'en' ? '/' : '/pt/') })],
    body: (c) => `${pageHead(c, { title: c._('Contact', 'Contacto'), lead: c._('For an urgent departure, call or use WhatsApp. For everything else, write to us.', 'Para uma partida urgente, ligue ou use o WhatsApp. Para tudo o resto, escreva-nos.') })}
<section class="section">
  <div class="wrap two-col">
    <form class="form" novalidate data-form="contact">
      <h2>${c._('Send a message', 'Enviar mensagem')}</h2>
      ${field(c, { name: 'name', label: c._('Name', 'Nome'), required: true, auto: 'name' })}
      ${field(c, { name: 'email', label: 'Email', type: 'email', required: true, auto: 'email' })}
      ${field(c, { name: 'phone', label: c._('Phone', 'Telefone'), type: 'tel', auto: 'tel' })}
      <div class="field"><label for="f-message">${c._('Message', 'Mensagem')}</label><textarea id="f-message" name="message" rows="5" required></textarea><p class="error" id="e-message" hidden></p></div>
      ${consent(c)}
      <button class="btn btn-line" type="submit">${c._('Send message', 'Enviar mensagem')}</button>
      <div class="form-done" role="status" hidden>
        <h3>${c._('Message sent', 'Mensagem enviada')}</h3>
        <p>${c._('We reply by email within one working day. For anything urgent, call us.', 'Respondemos por email no prazo de um dia útil. Para algo urgente, ligue-nos.')}</p>
        <p class="fine">${c._('Prototype: no data was sent.', 'Protótipo: nenhum dado foi enviado.')}</p>
      </div>
    </form>
    <div>
      <h2>${c._('Reach us directly', 'Contacto direto')}</h2>
      <dl class="contact-list">
        <div><dt>${c._('Phone', 'Telefone')}</dt><dd><a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a></dd></div>
        <div><dt>WhatsApp</dt><dd><a class="btn btn-line" href="https://wa.me/${SITE.whatsapp}" rel="noopener">${c._('Open WhatsApp chat', 'Abrir conversa no WhatsApp')}</a></dd></div>
        <div><dt>Email</dt><dd><a href="mailto:${SITE.email}">${SITE.email}</a></dd></div>
        <div><dt>${c._('Address', 'Morada')}</dt><dd>${SITE.address.street}<br>${SITE.address.postal} ${SITE.address.city}, Portugal</dd></div>
        <div><dt>${c._('Hours', 'Horário')}</dt><dd>${c._('Operations desk: 24 hours, every day', 'Operações: 24 horas, todos os dias')}<br>${c._('Office: Monday to Friday, 09:00 to 19:00', 'Escritório: segunda a sexta, 09:00 às 19:00')}</dd></div>
      </dl>
    </div>
  </div>
</section>
<section class="map">
  <iframe title="${c._('Map of Lisbon showing our base', 'Mapa de Lisboa com a nossa base')}" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=-9.2300%2C38.6900%2C-9.0900%2C38.7900&amp;layer=mapnik&amp;marker=38.7369%2C-9.1427"></iframe>
  <p class="wrap fine"><a href="https://www.openstreetmap.org/?mlat=38.7369&amp;mlon=-9.1427#map=13/38.7369/-9.1427" rel="noopener">${c._('Open the map in a new page', 'Abrir o mapa noutra página')}</a></p>
</section>`,
  });
}

// --------------------------------------------------------------------------- Quote
export function quote(L) {
  return page('quote', L, {
    title: L === 'en' ? 'Get a free quote' : 'Pedir orçamento gratuito',
    description: L === 'en' ? 'Request a quote for a private jet, helicopter, yacht or chauffeured transfer in four short steps. Reply within two hours.' : 'Peça orçamento para jato privado, helicóptero, iate ou transfer com motorista em quatro passos curtos. Resposta em duas horas.',
    body: (c) => {
      const stepNames = [c._('Service', 'Serviço'), c._('Route and date', 'Rota e data'), c._('Passengers and luggage', 'Passageiros e bagagem'), c._('Your details', 'Os seus dados')];
      return `${pageHead(c, { title: quoteLabel(c), lead: c._('Four short steps. No commitment and no payment details.', 'Quatro passos curtos. Sem compromisso e sem dados de pagamento.') })}
<section class="section">
  <div class="wrap narrow">
    <form class="form quote-form" novalidate data-form="quote">
      <ol class="progress" aria-label="${c._('Progress', 'Progresso')}">
        ${stepNames.map((n, i) => `<li${i === 0 ? ' aria-current="step"' : ''}><span class="progress-n">${i + 1}</span><span class="progress-name">${n}</span></li>`).join('\n        ')}
      </ol>

      <fieldset class="step" data-step="1">
        <legend tabindex="-1">${c._('Which service do you need?', 'De que serviço precisa?')}</legend>
        <div class="choices">
          ${SERVICE_IDS.map((s) => `<label class="choice"><input type="radio" name="service" value="${s}" required><span><b>${serviceName(c, s)}</b><small>${serviceShort(c, s)}</small></span></label>`).join('\n          ')}
          <label class="choice"><input type="radio" name="service" value="unsure"><span><b>${c._('Not sure yet', 'Ainda não sei')}</b><small>${c._('Describe the trip and we suggest the best combination.', 'Descreva a viagem e sugerimos a melhor combinação.')}</small></span></label>
        </div>
        <p class="error" id="e-service" hidden></p>
      </fieldset>

      <fieldset class="step" data-step="2" hidden>
        <legend tabindex="-1">${c._('Where and when?', 'Para onde e quando?')}</legend>
        <div class="field-row">
          ${field(c, { name: 'from', label: c._('From', 'Origem'), required: true })}
          ${field(c, { name: 'to', label: c._('To', 'Destino'), required: true })}
        </div>
        <div class="field-row">
          ${field(c, { name: 'date', label: c._('Date', 'Data'), type: 'date', required: true })}
          ${field(c, { name: 'time', label: c._('Preferred time', 'Hora preferida'), type: 'time' })}
        </div>
        ${field(c, { name: 'return', label: c._('Return date', 'Data de regresso'), type: 'date' })}
      </fieldset>

      <fieldset class="step" data-step="3" hidden>
        <legend tabindex="-1">${c._('Who is travelling?', 'Quem viaja?')}</legend>
        <div class="field-row">
          ${field(c, { name: 'pax', label: c._('Passengers', 'Passageiros'), type: 'number', required: true, extra: ' min="1" max="60" inputmode="numeric"' })}
          <div class="field"><label for="f-luggage">${c._('Luggage', 'Bagagem')}</label><select id="f-luggage" name="luggage">
            <option value="light">${c._('Hand luggage only', 'Só bagagem de mão')}</option>
            <option value="standard" selected>${c._('One case per person', 'Uma mala por pessoa')}</option>
            <option value="large">${c._('Several cases, golf bags or equipment', 'Várias malas, sacos de golfe ou equipamento')}</option>
          </select></div>
        </div>
        <div class="field"><label for="f-notes">${c._('Anything we should know', 'Algo que devamos saber')} <span class="opt">${c._('optional', 'opcional')}</span></label><textarea id="f-notes" name="notes" rows="4" placeholder="${c._('Children, pets, reduced mobility, a tight connection', 'Crianças, animais, mobilidade reduzida, uma ligação apertada')}"></textarea></div>
      </fieldset>

      <fieldset class="step" data-step="4" hidden>
        <legend tabindex="-1">${c._('Where do we send the quote?', 'Para onde enviamos o orçamento?')}</legend>
        ${field(c, { name: 'name', label: c._('Name', 'Nome'), required: true, auto: 'name' })}
        <div class="field-row">
          ${field(c, { name: 'email', label: 'Email', type: 'email', required: true, auto: 'email' })}
          ${field(c, { name: 'phone', label: c._('Phone', 'Telefone'), type: 'tel', required: true, auto: 'tel' })}
        </div>
        ${consent(c)}
      </fieldset>

      <div class="step-actions">
        <button class="btn btn-line" type="button" data-back hidden>${c._('Back', 'Voltar')}</button>
        <button class="btn btn-gold" type="button" data-next>${c._('Continue', 'Continuar')}</button>
        <button class="btn btn-gold" type="submit" hidden>${c._('Send request', 'Enviar pedido')}</button>
      </div>

      <div class="form-done" role="status" tabindex="-1" hidden>
        <h2>${c._('Request sent', 'Pedido enviado')}</h2>
        <p>${c._('You will receive options and a fixed price by email within two hours, between 08:00 and 22:00 Lisbon time. Requests sent overnight are answered by 09:00.', 'Vai receber opções e preço fechado por email no prazo de duas horas, entre as 08:00 e as 22:00, hora de Lisboa. Os pedidos enviados durante a noite são respondidos até às 09:00.')}</p>
        <p>${c._('Leaving in less than 24 hours? Call', 'Parte em menos de 24 horas? Ligue')} <a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a>.</p>
        <p class="fine">${c._('Prototype: no data was sent.', 'Protótipo: nenhum dado foi enviado.')}</p>
      </div>
    </form>
  </div>
</section>`;
    },
  });
}

// --------------------------------------------------------------------------- Legal stubs
export function legal(id, L) {
  const isPrivacy = id === 'privacy';
  const _ = (en, pt) => (L === 'en' ? en : pt);
  const title = isPrivacy ? _('Privacy Policy', 'Política de Privacidade') : _('Terms', 'Termos e Condições');
  return page(id, L, {
    title,
    description: isPrivacy ? _('How we collect, use and protect personal data.', 'Como recolhemos, usamos e protegemos os dados pessoais.') : _('The terms that apply to quotes and bookings.', 'Os termos aplicáveis a orçamentos e reservas.'),
    body: (c) => `${pageHead(c, { title })}
<section class="section">
  <div class="wrap prose">
    <p class="notice">${c._('Placeholder page. The final text must be written or reviewed by a lawyer before the site goes live.', 'Página provisória. O texto final deve ser redigido ou revisto por um advogado antes de o site ficar online.')}</p>
    ${isPrivacy
      ? `<h2>${c._('What this page will cover', 'O que esta página vai incluir')}</h2>
    <ul>
      <li>${c._('Who is responsible for the data and how to contact them', 'Quem é o responsável pelo tratamento e como contactá-lo')}</li>
      <li>${c._('Which data the quote and contact forms collect, and why', 'Que dados recolhem os formulários de orçamento e de contacto, e porquê')}</li>
      <li>${c._('How long data is kept and who receives it (operators, crew)', 'Durante quanto tempo os dados são guardados e quem os recebe (operadores, tripulação)')}</li>
      <li>${c._('Your rights under the GDPR and how to exercise them', 'Os seus direitos ao abrigo do RGPD e como exercê-los')}</li>
      <li>${c._('Cookies and third-party services such as the map', 'Cookies e serviços de terceiros, como o mapa')}</li>
    </ul>`
      : `<h2>${c._('What this page will cover', 'O que esta página vai incluir')}</h2>
    <ul>
      <li>${c._('How quotes, confirmations and payments work', 'Como funcionam orçamentos, confirmações e pagamentos')}</li>
      <li>${c._('Cancellation and change conditions for each service', 'Condições de cancelamento e alteração de cada serviço')}</li>
      <li>${c._('Weather, safety decisions and alternatives', 'Meteorologia, decisões de segurança e alternativas')}</li>
      <li>${c._('Liability, insurance and the role of the operators', 'Responsabilidade, seguros e o papel dos operadores')}</li>
      <li>${c._('Complaints, including the Livro de Reclamações', 'Reclamações, incluindo o Livro de Reclamações')}</li>
    </ul>`}
  </div>
</section>`,
  });
}
