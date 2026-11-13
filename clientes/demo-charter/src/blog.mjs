import { SITE, PATHS, img } from './site.mjs';
import { page, pageHead, closing } from './layout.mjs';
import { routeLines } from './services.mjs';

const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
};
export const fmtDate = (L, iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return L === 'en' ? `${d} ${MONTHS.en[m - 1]} ${y}` : `${d} de ${MONTHS.pt[m - 1]} de ${y}`;
};

const CATS = {
  helicopters: { en: 'Helicopters', pt: 'Helicópteros' },
  aviation: { en: 'Private aviation', pt: 'Aviação privada' },
  events: { en: 'Events', pt: 'Eventos' },
};

export const POSTS = [
  {
    id: 'post-algarve',
    image: 'blog-algarve',
    cat: 'helicopters',
    date: '2026-10-28',
    minutes: 4,
    title: { en: 'Helicopter or car to the Algarve: when each one makes sense', pt: 'Helicóptero ou carro para o Algarve: quando compensa cada um' },
    desc: { en: 'Lisbon to the Algarve takes about an hour by helicopter and two and a half by car. A plain comparison of time, luggage, weather and cost.', pt: 'De Lisboa ao Algarve é cerca de uma hora de helicóptero e duas e meia de carro. Uma comparação simples de tempo, bagagem, meteorologia e custo.' },
    body: (c) => `
<p>${c._('The A2 motorway is a good road, and for many trips a chauffeured car is the right answer. The helicopter earns its place when the hours matter more than the price, or when the journey itself is part of the stay.', 'A A2 é uma boa autoestrada e, em muitas viagens, um carro com motorista é a resposta certa. O helicóptero justifica-se quando as horas valem mais do que o preço, ou quando a própria viagem faz parte da estadia.')}</p>
<h2>${c._('The time, side by side', 'O tempo, lado a lado')}</h2>
${routeLines(c, [{ name: c._('Lisbon to the Algarve', 'Lisboa – Algarve'), slow: 150, fast: 60, mode: c._('By helicopter', 'De helicóptero') }])}
<p>${c._('Add the drive to the heliport in Lisbon and the short transfer at the other end, and the real saving is usually a little over an hour each way. On a summer Friday, when the motorway slows near the coast, it is more.', 'Somando o percurso até ao heliporto em Lisboa e o pequeno transfer na chegada, a poupança real é normalmente de pouco mais de uma hora em cada sentido. Numa sexta-feira de verão, quando a autoestrada abranda perto da costa, é mais.')}</p>
<h2>${c._('When the helicopter is the better choice', 'Quando o helicóptero é a melhor escolha')}</h2>
<ul>
<li>${c._('A day trip: lunch or a round of golf in the Algarve and back in Lisbon for dinner.', 'Uma ida e volta no dia: almoço ou uma volta de golfe no Algarve e regresso a Lisboa para jantar.')}</li>
<li>${c._('A connection: you land in Lisbon on a long flight and do not want two more hours on the road.', 'Uma ligação: aterra em Lisboa depois de um voo longo e não quer mais duas horas de estrada.')}</li>
<li>${c._('An occasion: the flight along the Alentejo coast is one of the best views in the country.', 'Uma ocasião: o voo ao longo da costa alentejana é uma das melhores vistas do país.')}</li>
</ul>
<h2>${c._('When the car is the better choice', 'Quando o carro é a melhor escolha')}</h2>
<ul>
<li>${c._('Luggage: a helicopter cabin takes one soft bag per person. Golf bags and large cases go by road either way.', 'Bagagem: a cabine de um helicóptero leva um saco maleável por pessoa. Sacos de golfe e malas grandes seguem sempre por estrada.')}</li>
<li>${c._('Groups of more than six: two helicopters cost more than one comfortable van.', 'Grupos com mais de seis pessoas: dois helicópteros custam mais do que uma carrinha confortável.')}</li>
<li>${c._('Uncertain weather: low cloud or strong wind can delay a flight. A car leaves on time.', 'Tempo incerto: nuvens baixas ou vento forte podem atrasar um voo. Um carro sai à hora marcada.')}</li>
</ul>
<h2>${c._('What most clients do', 'O que a maioria dos clientes faz')}</h2>
<p>${c._('Many combine the two. Passengers fly, the luggage leaves earlier by car and is in the room when they arrive. If the weather closes in, the same car is the backup. Ask for both prices in one quote and decide with the numbers in front of you.', 'Muitos combinam os dois. Os passageiros voam, a bagagem sai mais cedo de carro e já está no quarto à chegada. Se o tempo fechar, o mesmo carro serve de alternativa. Peça os dois preços no mesmo orçamento e decida com os números à frente.')}</p>`,
  },
  {
    id: 'post-pricing',
    image: 'blog-pricing',
    cat: 'aviation',
    date: '2026-10-14',
    minutes: 5,
    title: { en: 'How private jet charter pricing works', pt: 'Como se calcula o preço de um jato privado' },
    desc: { en: 'What you pay for when you charter a private jet: flight time, positioning, airport fees, crew costs and tax, and how to read a quote.', pt: 'O que se paga ao alugar um jato privado: tempo de voo, posicionamento, taxas de aeroporto, custos de tripulação e impostos, e como ler um orçamento.' },
    body: (c) => `
<p>${c._('A charter quote is a single figure, but it is built from a handful of parts. Knowing them helps you compare two quotes fairly and spot the one that will grow later.', 'Um orçamento de charter é um único valor, mas é composto por meia dúzia de parcelas. Conhecê-las ajuda a comparar dois orçamentos com justiça e a identificar o que vai crescer mais tarde.')}</p>
<h2>${c._('Flight time', 'Tempo de voo')}</h2>
<p>${c._('The largest part. Every aircraft has an hourly rate that covers the aircraft, crew, fuel and maintenance. Larger and faster aircraft cost more per hour, so the right size for the trip matters more than anything else.', 'A maior parcela. Cada aeronave tem um valor por hora que cobre a aeronave, a tripulação, o combustível e a manutenção. Aeronaves maiores e mais rápidas custam mais por hora, pelo que o tamanho certo para a viagem pesa mais do que qualquer outro fator.')}</p>
<h2>${c._('Positioning', 'Posicionamento')}</h2>
<p>${c._('If the aircraft is not based where you depart, it has to fly there first and home afterwards. Those empty hours are part of the price. An aircraft based near you is often cheaper than a better deal parked two hours away.', 'Se a aeronave não estiver baseada no local de partida, tem de voar até lá primeiro e regressar depois. Essas horas em vazio fazem parte do preço. Uma aeronave baseada perto de si sai muitas vezes mais barata do que uma melhor oferta estacionada a duas horas de distância.')}</p>
<h2>${c._('Airport and handling fees', 'Taxas de aeroporto e handling')}</h2>
<p>${c._('Landing, parking, passenger fees and the ground handler at each airport. They vary widely: a small regional airfield costs a fraction of a major hub at peak time.', 'Aterragem, estacionamento, taxas de passageiro e o agente de handling em cada aeroporto. Variam muito: um pequeno aeródromo regional custa uma fração de um grande aeroporto em hora de ponta.')}</p>
<h2>${c._('Crew and waiting', 'Tripulação e espera')}</h2>
<p>${c._('On a same-day return the aircraft waits for you. Over several days, you either pay for the crew to stay or for the aircraft to go home and come back. We price both and show you the cheaper one.', 'Numa ida e volta no mesmo dia, a aeronave espera por si. Em vários dias, paga-se a estadia da tripulação ou o regresso da aeronave à base e nova vinda. Calculamos as duas hipóteses e mostramos a mais económica.')}</p>
<h2>${c._('Tax and extras', 'Impostos e extras')}</h2>
<p>${c._('VAT depends on the route. Extras are anything beyond the standard: special catering, de-icing in winter, satellite internet. A clear quote lists what is included and names what could be added.', 'O IVA depende da rota. Os extras são tudo o que sai do standard: catering especial, descongelamento no inverno, internet por satélite. Um orçamento claro lista o que está incluído e indica o que pode ser acrescentado.')}</p>
<h2>${c._('Empty legs', 'Voos em vazio')}</h2>
<p>${c._('When an aircraft must fly empty to its next client, that leg is sold at a reduced price. It suits flexible travellers: the date and route are fixed by someone else’s trip, and it can change if theirs does.', 'Quando uma aeronave tem de voar vazia até ao próximo cliente, esse trajeto é vendido a preço reduzido. Serve quem tem flexibilidade: a data e a rota são definidas pela viagem de outra pessoa e podem mudar se a dela mudar.')}</p>
<h2>${c._('How to read a quote', 'Como ler um orçamento')}</h2>
<ul>
<li>${c._('Check the aircraft type, year and operator, not only the price.', 'Verifique o tipo de aeronave, o ano e o operador, não apenas o preço.')}</li>
<li>${c._('Ask whether the figure is fixed or an estimate.', 'Pergunte se o valor é fechado ou uma estimativa.')}</li>
<li>${c._('Read the cancellation terms before you confirm.', 'Leia as condições de cancelamento antes de confirmar.')}</li>
</ul>`,
  },
  {
    id: 'post-wedding',
    image: 'blog-wedding',
    cat: 'events',
    date: '2026-09-30',
    minutes: 5,
    title: { en: 'Planning transfers for a wedding in Portugal', pt: 'Planear os transfers de um casamento em Portugal' },
    desc: { en: 'A practical timeline for wedding transport: guest arrivals, shuttles between hotel and venue, the couple’s car or helicopter, and the late return.', pt: 'Um calendário prático para o transporte de um casamento: chegada dos convidados, vaivém entre hotel e quinta, o carro ou helicóptero dos noivos e o regresso tardio.' },
    body: (c) => `
<p>${c._('Transport is the part of a wedding guests notice only when it goes wrong. Most venues in Sintra, the Alentejo and the Douro are at the end of a narrow road, far from the hotels. A plan made early keeps the day on time.', 'O transporte é a parte de um casamento em que os convidados só reparam quando corre mal. A maioria das quintas em Sintra, no Alentejo e no Douro fica no fim de uma estrada estreita, longe dos hotéis. Um plano feito cedo mantém o dia a horas.')}</p>
<h2>${c._('Three months before', 'Três meses antes')}</h2>
<ol>
<li>${c._('Count guests by hotel, not in total. The number of pickup points decides the number of vehicles.', 'Conte os convidados por hotel, não no total. O número de pontos de recolha define o número de veículos.')}</li>
<li>${c._('Ask the venue about access: gate width, turning space, and whether a minibus can reach the door.', 'Pergunte à quinta pelo acesso: largura do portão, espaço de manobra e se um minibus chega à porta.')}</li>
<li>${c._('If you want a helicopter arrival, start now. The landing site needs a survey and an authorisation.', 'Se quer uma chegada de helicóptero, comece já. O local de aterragem precisa de avaliação e de autorização.')}</li>
</ol>
<h2>${c._('One month before', 'Um mês antes')}</h2>
<ol>
<li>${c._('Collect flight numbers for guests arriving from abroad and group the airport pickups.', 'Reúna os números de voo dos convidados que chegam do estrangeiro e agrupe as recolhas no aeroporto.')}</li>
<li>${c._('Fix the shuttle times and print them on the invitation insert or the wedding website.', 'Feche os horários do vaivém e coloque-os no convite ou no site do casamento.')}</li>
<li>${c._('Plan two returns at night: one after dinner for families, one at the end.', 'Preveja dois regressos à noite: um depois do jantar para as famílias, outro no fim.')}</li>
</ol>
<h2>${c._('On the day', 'No dia')}</h2>
<ol>
<li>${c._('One coordinator, with a phone and the full list, stands at the main pickup point.', 'Um coordenador, com telefone e a lista completa, fica no ponto de recolha principal.')}</li>
<li>${c._('The first shuttle leaves early. A guest who waits ten minutes at the venue is happier than one who misses the ceremony.', 'O primeiro vaivém sai cedo. Um convidado que espera dez minutos na quinta fica mais satisfeito do que um que perde a cerimónia.')}</li>
<li>${c._('Keep one car free all evening for whatever was not planned.', 'Mantenha um carro livre toda a noite para o que não estava previsto.')}</li>
</ol>
<h2>${c._('The couple', 'Os noivos')}</h2>
<p>${c._('A car, a classic, a boat across the river or a helicopter: choose it for the photographs and the mood, and let us check that it works with the venue and the timetable. For a helicopter, always keep a car ready in case the weather changes.', 'Um carro, um clássico, um barco a atravessar o rio ou um helicóptero: escolha pelas fotografias e pelo ambiente, e deixe-nos confirmar que funciona com o espaço e com o horário. No caso do helicóptero, tenha sempre um carro pronto para o caso de o tempo mudar.')}</p>`,
  },
];

const postMeta = (c, p) => `<p class="post-meta"><time datetime="${p.date}">${fmtDate(c.L, p.date)}</time><span>${p.minutes} ${c._('min read', 'min de leitura')}</span></p>`;

export const postCard = (c, p, { h = 'h3' } = {}) => `<article class="post-card" data-cat="${p.cat}">
  <a class="post-card-media" href="${c.href(p.id)}" tabindex="-1" aria-hidden="true">${img(c, p.image, { cls: 'fade', sizes: '(min-width: 900px) 33vw, 100vw' })}</a>
  <p class="post-cat">${CATS[p.cat][c.L]}</p>
  <${h}><a href="${c.href(p.id)}">${p.title[c.L]}</a></${h}>
  ${postMeta(c, p)}
</article>`;

export function blogIndex(L) {
  return page('blog', L, {
    title: L === 'en' ? 'Blog: notes on private travel in Portugal' : 'Blog: notas sobre viagens privadas em Portugal',
    description: L === 'en' ? 'Practical articles on helicopter transfers, private jet pricing and event transport in Portugal.' : 'Artigos práticos sobre transfers de helicóptero, preços de jatos privados e transporte para eventos em Portugal.',
    body: (c) => {
      const [first] = POSTS;
      return `${pageHead(c, { title: 'Blog', lead: c._('Practical notes on travelling privately in Portugal, written by the people who plan the trips.', 'Notas práticas sobre viajar em privado em Portugal, escritas por quem planeia as viagens.') })}
<section class="section">
  <div class="wrap">
    <article class="featured">
      <a class="featured-media" href="${c.href(first.id)}" tabindex="-1" aria-hidden="true">${img(c, first.image, { eager: true, sizes: '(min-width: 900px) 60vw, 100vw' })}</a>
      <div class="featured-text">
        <p class="post-cat">${c._('Featured', 'Em destaque')}, ${CATS[first.cat][c.L].toLowerCase()}</p>
        <h2><a href="${c.href(first.id)}">${first.title[c.L]}</a></h2>
        <p>${first.desc[c.L]}</p>
        ${postMeta(c, first)}
      </div>
    </article>
  </div>
</section>
<section class="section section-rule">
  <div class="wrap">
    <div class="filter-row">
      <h2>${c._('All articles', 'Todos os artigos')}</h2>
      <div class="filter" role="group" aria-label="${c._('Filter by category', 'Filtrar por categoria')}" data-filter="posts">
        <button type="button" aria-pressed="true" data-value="all">${c._('All', 'Todos')}</button>
        ${Object.entries(CATS).map(([k, v]) => `<button type="button" aria-pressed="false" data-value="${k}">${v[c.L]}</button>`).join('\n        ')}
      </div>
    </div>
    <div class="post-grid" id="posts" aria-live="polite">
      ${POSTS.map((p) => postCard(c, p)).join('\n      ')}
    </div>
  </div>
</section>
${closing(c, { title: c._('Planning a trip', 'A planear uma viagem'), text: c._('Send us the route and dates. We reply with options and a fixed price.', 'Envie-nos a rota e as datas. Respondemos com opções e preço fechado.') })}`;
    },
  });
}

export function postPage(p, L) {
  return page(p.id, L, {
    title: p.title[L],
    description: p.desc[L],
    ogImage: p.image,
    ogType: 'article',
    ld: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title[L],
        description: p.desc[L],
        datePublished: p.date,
        dateModified: p.date,
        inLanguage: L,
        image: `${SITE.url}/assets/img/${p.image}.svg`,
        author: { '@type': 'Organization', name: SITE.legalName },
        publisher: { '@type': 'Organization', name: SITE.legalName },
        mainEntityOfPage: `${SITE.url}/${PATHS[p.id][L]}`,
      },
    ],
    body: (c) => `<article class="article">
  <header class="wrap article-head">
    <nav class="crumbs" aria-label="${c._('Breadcrumb', 'Caminho')}"><ol><li><a href="${c.href('blog')}">Blog</a></li><li aria-current="page">${CATS[p.cat][L]}</li></ol></nav>
    <h1>${p.title[L]}</h1>
    ${postMeta(c, p)}
  </header>
  <div class="wrap article-media">${img(c, p.image, { eager: true })}</div>
  <div class="wrap prose">
    ${p.body(c)}
  </div>
</article>
<section class="section section-rule">
  <div class="wrap">
    <h2>${c._('Related articles', 'Artigos relacionados')}</h2>
    <div class="post-grid two">
      ${POSTS.filter((o) => o.id !== p.id).map((o) => postCard(c, o)).join('\n      ')}
    </div>
  </div>
</section>
${closing(c, { title: c._('Ready when you are', 'Quando quiser'), text: c._('Tell us the route and the date. You get options and a fixed price, usually within two hours.', 'Diga-nos a rota e a data. Recebe opções e preço fechado, normalmente em duas horas.') })}`,
  });
}
