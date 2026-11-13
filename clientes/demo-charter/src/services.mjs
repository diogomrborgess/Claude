import { SITE, img } from './site.mjs';
import { page, pageHead, closing, serviceName, quoteLabel, SERVICE_IDS, businessLd } from './layout.mjs';

export const fmtTime = (c, min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
};

// The signature element: two lines drawn to the same scale, so the time saved is visible.
export function routeLines(c, routes) {
  const max = Math.max(...routes.map((r) => r.slow));
  return `<ol class="routes">
${routes
  .map(
    (r) => `  <li class="route">
    <h3 class="route-name">${r.name}</h3>
    <div class="route-bars">
      <p class="route-bar is-slow" style="--w:${((r.slow / max) * 100).toFixed(1)}%"><span class="line" aria-hidden="true"></span><span class="route-label">${c._('By car', 'De carro')} <b>${fmtTime(c, r.slow)}</b></span></p>
      <p class="route-bar is-fast" style="--w:${((r.fast / max) * 100).toFixed(1)}%"><span class="line" aria-hidden="true"></span><span class="route-label">${r.mode} <b>${fmtTime(c, r.fast)}</b></span></p>
    </div>
    <p class="route-saved">${c._('About', 'Cerca de')} <b>${fmtTime(c, r.slow - r.fast)}</b> ${c._('saved each way', 'poupados em cada sentido')}</p>
  </li>`
  )
  .join('\n')}
</ol>
<p class="fine">${c._('Indicative times, door to door excluded. Driving times assume normal traffic; flight times depend on aircraft, weather and landing site.', 'Tempos indicativos, sem contar o percurso porta a porta. Os tempos de carro assumem trânsito normal; os de voo dependem da aeronave, da meteorologia e do local de aterragem.')}</p>`;
}

export const popularRoutes = (c) => {
  const heli = c._('By helicopter', 'De helicóptero');
  return [
    { name: c._('Lisbon to the Algarve', 'Lisboa – Algarve'), slow: 150, fast: 60, mode: heli },
    { name: c._('Porto to the Douro valley', 'Porto – Douro'), slow: 105, fast: 30, mode: heli },
    { name: c._('Lisbon to Comporta', 'Lisboa – Comporta'), slow: 75, fast: 20, mode: heli },
    { name: c._('Lisbon to Porto', 'Lisboa – Porto'), slow: 180, fast: 85, mode: heli },
  ];
};

export const serviceShort = (c, id) =>
  ({
    aviation: c._('Jet charter from Lisbon, Cascais, Porto and Faro to anywhere in Europe, on your schedule.', 'Charter de jatos a partir de Lisboa, Cascais, Porto e Faro para qualquer ponto da Europa, ao seu horário.'),
    helicopters: c._('Point-to-point transfers, scenic flights and arrivals at estates, hotels and events.', 'Transfers ponto a ponto, voos panorâmicos e chegadas a quintas, hotéis e eventos.'),
    yachts: c._('Crewed day charters and longer passages along the Lisbon coast, Arrábida and the Algarve.', 'Passeios de dia com tripulação e travessias mais longas na costa de Lisboa, Arrábida e Algarve.'),
    transfers: c._('Chauffeured cars and vans for airports, days at disposal and events, coordinated with your flight.', 'Carros e carrinhas com motorista para aeroportos, dias à disposição e eventos, coordenados com o seu voo.'),
  })[id];

const DATA = {
  aviation: (c) => ({
    head: 'head-aviation',
    title: c._('Private jet charter', 'Charter de jatos privados'),
    metaTitle: c._('Private jet charter from Lisbon', 'Charter de jatos privados a partir de Lisboa'),
    metaDesc: c._('Charter a private jet from Lisbon, Cascais, Porto or Faro. Typical routes, what is included, aircraft categories and how to request a quote.', 'Alugue um jato privado a partir de Lisboa, Cascais, Porto ou Faro. Rotas habituais, o que está incluído, categorias de aeronave e como pedir orçamento.'),
    lead: c._('You choose the departure time and the airport. We find the right aircraft, handle the paperwork and meet you at the terminal.', 'Escolhe a hora de partida e o aeroporto. Nós encontramos a aeronave certa, tratamos da documentação e recebemo-lo no terminal.'),
    who: [
      c._('Executives with meetings in two cities on the same day', 'Executivos com reuniões em duas cidades no mesmo dia'),
      c._('Families and groups travelling with children, pets or sports equipment', 'Famílias e grupos que viajam com crianças, animais ou equipamento desportivo'),
      c._('Hotels and concierges arranging arrivals for their guests', 'Hotéis e concierges que organizam a chegada dos seus hóspedes'),
      c._('Golf and tourism operators moving small groups between regions', 'Operadores de golfe e turismo que deslocam pequenos grupos entre regiões'),
    ],
    included: [
      c._('Aircraft, crew, fuel and standard catering', 'Aeronave, tripulação, combustível e catering standard'),
      c._('Airport, handling and passenger fees, itemised in the quote', 'Taxas de aeroporto, handling e passageiro, discriminadas no orçamento'),
      c._('Private terminal access where the airport has one', 'Acesso a terminal privado nos aeroportos que o têm'),
      c._('One contact person from request to landing', 'Uma única pessoa de contacto, do pedido à aterragem'),
      c._('Ground transfer at both ends on request', 'Transfer terrestre nas duas pontas, a pedido'),
    ],
    extraTitle: c._('Typical routes from Lisbon', 'Rotas habituais a partir de Lisboa'),
    extra: `<table class="spec-table">
      <caption class="fine">${c._('Indicative flight times in a light or midsize jet.', 'Tempos de voo indicativos em jato ligeiro ou médio.')}</caption>
      <thead><tr><th scope="col">${c._('Destination', 'Destino')}</th><th scope="col">${c._('Flight time', 'Tempo de voo')}</th></tr></thead>
      <tbody>
        ${[['Faro', 40], ['Madrid', 70], [c._('Funchal, Madeira', 'Funchal, Madeira'), 105], [c._('Paris', 'Paris'), 145], [c._('Geneva', 'Genebra'), 150], [c._('London', 'Londres'), 160]].map(([d, m]) => `<tr><th scope="row">${d}</th><td>${fmtTime(c, m)}</td></tr>`).join('\n        ')}
      </tbody>
    </table>`,
    fleetNote: c._('Aircraft categories shown as examples. The exact aircraft and its operator are named in every quote.', 'Categorias de aeronave apresentadas como exemplo. A aeronave exata e o respetivo operador são indicados em cada orçamento.'),
    capLabel: c._('Range', 'Alcance'),
    fleet: [
      { img: 'fleet-jet-light', name: c._('Light jet', 'Jato ligeiro'), seats: c._('Up to 6', 'Até 6'), cap: c._('About 2,500 km', 'Cerca de 2500 km'), best: c._('Iberia, Morocco and short European legs', 'Península Ibérica, Marrocos e trajetos europeus curtos') },
      { img: 'fleet-jet-mid', name: c._('Midsize jet', 'Jato médio'), seats: c._('Up to 8', 'Até 8'), cap: c._('About 4,500 km', 'Cerca de 4500 km'), best: c._('London, Paris, Geneva, with a stand-up cabin', 'Londres, Paris, Genebra, com cabine em que se anda de pé') },
      { img: 'fleet-jet-long', name: c._('Long-range jet', 'Jato de longo curso'), seats: c._('Up to 14', 'Até 14'), cap: c._('Over 9,000 km', 'Mais de 9000 km'), best: c._('Transatlantic and overnight flights', 'Voos transatlânticos e noturnos') },
    ],
    faq: [
      [c._('How far ahead do I need to book?', 'Com que antecedência devo reservar?'), c._('A few days is comfortable. For urgent trips we can often arrange a departure within hours, subject to aircraft and crew availability and airport slots.', 'Alguns dias é o ideal. Em viagens urgentes conseguimos muitas vezes organizar a partida em poucas horas, consoante a disponibilidade de aeronave, tripulação e slots de aeroporto.')],
      [c._('How early should I arrive at the airport?', 'Com que antecedência devo chegar ao aeroporto?'), c._('Usually 20 to 30 minutes before departure at a private terminal. We confirm the exact time with your booking.', 'Normalmente 20 a 30 minutos antes da partida num terminal privado. Confirmamos a hora exata com a reserva.')],
      [c._('Can I bring pets or oversized luggage?', 'Posso levar animais ou bagagem volumosa?'), c._('In most cases, yes. Tell us in the request so we choose an aircraft with the right hold and check the entry rules of the destination.', 'Na maioria dos casos, sim. Indique-o no pedido para escolhermos uma aeronave com o porão adequado e verificarmos as regras de entrada no destino.')],
      [c._('Who operates the flight?', 'Quem opera o voo?'), c._('Every flight is operated by a licensed air carrier holding an Air Operator Certificate. The operator name and certificate number are stated in your quote and contract.', 'Cada voo é operado por uma transportadora aérea licenciada, titular de Certificado de Operador Aéreo. O nome do operador e o número do certificado constam do orçamento e do contrato.')],
    ],
  }),

  helicopters: (c) => ({
    head: 'head-helicopters',
    title: c._('Helicopter flights', 'Voos de helicóptero'),
    metaTitle: c._('Helicopter transfers and scenic flights in Portugal', 'Transfers e voos panorâmicos de helicóptero em Portugal'),
    metaDesc: c._('Helicopter transfers between Lisbon, the Algarve, Comporta and the Douro, scenic flights, and arrivals for events and weddings.', 'Transfers de helicóptero entre Lisboa, Algarve, Comporta e Douro, voos panorâmicos e chegadas a eventos e casamentos.'),
    lead: c._('The shortest line between two places in Portugal, landing close to where you are going.', 'A linha mais curta entre dois pontos em Portugal, com aterragem perto do seu destino.'),
    who: [
      c._('Travellers connecting from a jet or an airline flight to a resort or estate', 'Viajantes que seguem de um jato ou voo comercial para um resort ou quinta'),
      c._('Couples and planners who want an arrival or departure by air', 'Casais e organizadores que querem uma chegada ou partida pelo ar'),
      c._('Golf groups playing courses in two regions in one stay', 'Grupos de golfe que jogam campos em duas regiões na mesma estadia'),
      c._('Guests who want to see the coast, the Douro or Lisbon from above', 'Hóspedes que querem ver a costa, o Douro ou Lisboa de cima'),
    ],
    included: [
      c._('Helicopter, pilot and fuel', 'Helicóptero, piloto e combustível'),
      c._('Landing site check and permissions', 'Verificação do local de aterragem e autorizações'),
      c._('Safety briefing before boarding', 'Briefing de segurança antes do embarque'),
      c._('Weather watch, with an alternative by road if the flight cannot go', 'Acompanhamento da meteorologia, com alternativa por estrada se o voo não puder realizar-se'),
      c._('Luggage sent ahead by car when it exceeds the cabin limit', 'Bagagem enviada por estrada quando excede o limite da cabine'),
    ],
    extraTitle: c._('Three ways to use it', 'Três formas de o usar'),
    extra: `<dl class="ways">
      <div><dt>${c._('Transfers', 'Transfers')}</dt><dd>${c._('Airport to resort, city to estate, one region to the next. We plan around your flight or meeting.', 'Do aeroporto ao resort, da cidade à quinta, de uma região à seguinte. Planeamos em função do seu voo ou reunião.')}</dd></div>
      <div><dt>${c._('Scenic flights', 'Voos panorâmicos')}</dt><dd>${c._('Lisbon and the Tagus, the Arrábida coast, the Douro terraces. Routes from 20 minutes.', 'Lisboa e o Tejo, a costa da Arrábida, os socalcos do Douro. Percursos a partir de 20 minutos.')}</dd></div>
      <div><dt>${c._('Events and weddings', 'Eventos e casamentos')}</dt><dd>${c._('Arrivals, departures and guest shuttles, agreed with the venue and timed with the programme.', 'Chegadas, partidas e vaivém de convidados, combinados com o espaço e sincronizados com o programa.')}</dd></div>
    </dl>`,
    fleetNote: c._('Helicopter types shown as examples. The aircraft and operator are confirmed in the quote.', 'Tipos de helicóptero apresentados como exemplo. A aeronave e o operador são confirmados no orçamento.'),
    capLabel: c._('Range', 'Alcance'),
    fleet: [
      { img: 'fleet-heli-single', name: c._('Single-engine helicopter', 'Helicóptero monomotor'), seats: c._('Up to 5', 'Até 5'), cap: c._('About 600 km', 'Cerca de 600 km'), best: c._('Short transfers and landings in tight sites', 'Transfers curtos e aterragens em locais apertados') },
      { img: 'fleet-heli-panoramic', name: c._('Panoramic-cabin helicopter', 'Helicóptero de cabine panorâmica'), seats: c._('Up to 6', 'Até 6'), cap: c._('About 600 km', 'Cerca de 600 km'), best: c._('Scenic flights and family groups', 'Voos panorâmicos e grupos familiares') },
      { img: 'fleet-heli-twin', name: c._('Twin-engine helicopter', 'Helicóptero bimotor'), seats: c._('Up to 6', 'Até 6'), cap: c._('About 600 km', 'Cerca de 600 km'), best: c._('Flights over water, cities and at night', 'Voos sobre água, cidades e à noite') },
    ],
    faq: [
      [c._('Where can a helicopter land?', 'Onde pode aterrar um helicóptero?'), c._('At airports, heliports and many private sites, with the owner’s consent and the required authorisation. Send us the address and we check it for you.', 'Em aeroportos, heliportos e em muitos locais privados, com o consentimento do proprietário e a autorização necessária. Envie-nos a morada e nós verificamos.')],
      [c._('What happens in bad weather?', 'O que acontece com mau tempo?'), c._('The pilot decides whether the flight is safe. If it is not, we move the time or switch you to a car, and you pay only for what was used.', 'O piloto decide se o voo é seguro. Se não for, alteramos a hora ou passamos para um carro, e paga apenas o que foi utilizado.')],
      [c._('How much luggage can I take?', 'Quanta bagagem posso levar?'), c._('Usually one soft bag per passenger. Larger cases and golf bags travel ahead by car so they are waiting when you land.', 'Normalmente um saco maleável por passageiro. Malas maiores e sacos de golfe seguem por estrada e ficam à sua espera na chegada.')],
      [c._('Can you land at a wedding venue?', 'Podem aterrar no local de um casamento?'), c._('Often, yes. We visit or survey the site, speak to the venue and handle the authorisation. Allow at least three weeks.', 'Muitas vezes, sim. Visitamos ou avaliamos o local, falamos com o espaço e tratamos da autorização. Conte com pelo menos três semanas.')],
    ],
  }),

  yachts: (c) => ({
    head: 'head-yachts',
    title: c._('Yacht and boat charter', 'Aluguer de iates e barcos'),
    metaTitle: c._('Yacht and boat charter in Lisbon, Cascais and the Algarve', 'Aluguer de iates e barcos em Lisboa, Cascais e Algarve'),
    metaDesc: c._('Crewed yacht and boat charter from Lisbon, Cascais, Tróia and the Algarve. Day charters, events on board and tender transfers.', 'Aluguer de iates e barcos com tripulação em Lisboa, Cascais, Tróia e Algarve. Passeios de dia, eventos a bordo e transfers em lancha.'),
    lead: c._('A day on the water with a skipper and crew, from a quiet anchorage in Arrábida to dinner off Cascais.', 'Um dia no mar com skipper e tripulação, de uma enseada tranquila na Arrábida a um jantar ao largo de Cascais.'),
    who: [
      c._('Families and friends who want a private day at sea', 'Famílias e amigos que querem um dia privado no mar'),
      c._('Companies hosting clients or a small team on board', 'Empresas que recebem clientes ou uma pequena equipa a bordo'),
      c._('Hotels and concierges adding a day on the water to a stay', 'Hotéis e concierges que acrescentam um dia no mar a uma estadia'),
      c._('Planners arranging arrivals by sea for a wedding or event', 'Organizadores que preparam chegadas por mar para um casamento ou evento'),
    ],
    included: [
      c._('Yacht or boat, skipper and crew', 'Iate ou barco, skipper e tripulação'),
      c._('Fuel for the agreed itinerary', 'Combustível para o itinerário combinado'),
      c._('Safety equipment and passenger insurance', 'Equipamento de segurança e seguro de passageiros'),
      c._('Water, soft drinks and towels', 'Água, refrigerantes e toalhas'),
      c._('Catering, chef or water toys on request', 'Catering, chef ou brinquedos náuticos, a pedido'),
    ],
    extraTitle: c._('Where we sail', 'Onde navegamos'),
    extra: `<dl class="ways">
      <div><dt>${c._('Lisbon and Cascais', 'Lisboa e Cascais')}</dt><dd>${c._('The Tagus at sunset, the Cascais coast, lunch at anchor.', 'O Tejo ao pôr do sol, a costa de Cascais, almoço ancorado.')}</dd></div>
      <div><dt>${c._('Arrábida and Tróia', 'Arrábida e Tróia')}</dt><dd>${c._('Clear water, sheltered coves and dolphins in the Sado estuary.', 'Água transparente, enseadas abrigadas e golfinhos no estuário do Sado.')}</dd></div>
      <div><dt>Algarve</dt><dd>${c._('Caves and cliffs between Lagos and Albufeira, from Vilamoura or Portimão.', 'Grutas e falésias entre Lagos e Albufeira, a partir de Vilamoura ou Portimão.')}</dd></div>
    </dl>`,
    fleetNote: c._('Vessel types shown as examples. The vessel, its licence and its crew are confirmed in the quote.', 'Tipos de embarcação apresentados como exemplo. A embarcação, a licença e a tripulação são confirmadas no orçamento.'),
    capLabel: c._('Typical use', 'Uso habitual'),
    fleet: [
      { img: 'fleet-yacht-motor', name: c._('Motor yacht', 'Iate a motor'), seats: c._('Up to 12 guests', 'Até 12 convidados'), cap: c._('Full day or several days', 'Dia inteiro ou vários dias'), best: c._('Coastal cruising with lunch on board', 'Cruzeiro costeiro com almoço a bordo') },
      { img: 'fleet-yacht-cat', name: c._('Sailing catamaran', 'Catamarã à vela'), seats: c._('Up to 12 guests', 'Até 12 convidados'), cap: c._('Half or full day', 'Meio dia ou dia inteiro'), best: c._('Stable, spacious days for families and groups', 'Dias estáveis e espaçosos para famílias e grupos') },
      { img: 'fleet-yacht-tender', name: c._('Fast tender', 'Lancha rápida'), seats: c._('Up to 8 guests', 'Até 8 convidados'), cap: c._('One to three hours', 'Uma a três horas'), best: c._('Transfers to Tróia or a beach restaurant', 'Transfers para Tróia ou para um restaurante de praia') },
    ],
    faq: [
      [c._('Do I need a licence or sailing experience?', 'Preciso de carta ou de experiência de navegação?'), c._('No. Every charter comes with a professional skipper, and crew where the vessel requires it.', 'Não. Todos os alugueres incluem skipper profissional e tripulação quando a embarcação o exige.')],
      [c._('What if the sea is too rough?', 'E se o mar estiver demasiado agitado?'), c._('The skipper decides on the day. We offer a sheltered itinerary or a new date at no extra charge.', 'O skipper decide no próprio dia. Propomos um itinerário abrigado ou uma nova data, sem custo adicional.')],
      [c._('Can we eat on board?', 'Podemos comer a bordo?'), c._('Yes. We arrange catering or a chef, or book a table at a restaurant you reach by tender.', 'Sim. Tratamos do catering ou de um chef, ou reservamos mesa num restaurante a que chega de lancha.')],
      [c._('Can the day be combined with a flight or transfer?', 'Posso combinar o dia com um voo ou transfer?'), c._('Yes. A car or helicopter can take you to the marina and back, on a single booking.', 'Sim. Um carro ou helicóptero pode levá-lo à marina e trazê-lo de volta, numa única reserva.')],
    ],
  }),

  transfers: (c) => ({
    head: 'head-transfers',
    title: c._('VIP transfers', 'Transfers VIP'),
    metaTitle: c._('VIP transfers and chauffeur service in Portugal', 'Transfers VIP e serviço de motorista em Portugal'),
    metaDesc: c._('Chauffeured airport pickups, cars by the hour and event transport in Lisbon, Porto and the Algarve, coordinated with your flight.', 'Recolhas no aeroporto com motorista, carros à hora e transporte para eventos em Lisboa, Porto e Algarve, coordenados com o seu voo.'),
    lead: c._('A driver who already knows your flight number, your name and where you are going.', 'Um motorista que já sabe o número do seu voo, o seu nome e para onde vai.'),
    who: [
      c._('Passengers arriving on private or commercial flights', 'Passageiros que chegam em voos privados ou comerciais'),
      c._('Executives with a day of meetings across the city', 'Executivos com um dia de reuniões pela cidade'),
      c._('Hotels and concierges booking on behalf of guests', 'Hotéis e concierges que reservam em nome dos hóspedes'),
      c._('Event and wedding planners moving guests on a schedule', 'Organizadores de eventos e casamentos que deslocam convidados com horário'),
    ],
    included: [
      c._('Professional chauffeur who speaks English and Portuguese', 'Motorista profissional que fala português e inglês'),
      c._('Flight tracking and waiting time after landing', 'Acompanhamento do voo e tempo de espera após a aterragem'),
      c._('Meet and greet in arrivals or at the aircraft steps where permitted', 'Receção nas chegadas ou junto à aeronave, onde for permitido'),
      c._('Water, Wi-Fi and phone chargers on board', 'Água, Wi-Fi e carregadores a bordo'),
      c._('Tolls, fuel and parking in the price', 'Portagens, combustível e estacionamento incluídos no preço'),
    ],
    extraTitle: c._('Three ways to book', 'Três formas de reservar'),
    extra: `<dl class="ways">
      <div><dt>${c._('Airport pickups', 'Recolhas no aeroporto')}</dt><dd>${c._('Lisbon, Cascais, Porto, Faro and Beja, to your hotel, home or next flight.', 'Lisboa, Cascais, Porto, Faro e Beja, para o hotel, casa ou voo seguinte.')}</dd></div>
      <div><dt>${c._('Chauffeur by the hour', 'Motorista à hora')}</dt><dd>${c._('A car and driver at your disposal for meetings, shopping or a day in the wine country.', 'Carro e motorista à sua disposição para reuniões, compras ou um dia na região dos vinhos.')}</dd></div>
      <div><dt>${c._('Events', 'Eventos')}</dt><dd>${c._('Several vehicles on one plan, with a coordinator on site for weddings and corporate events.', 'Vários veículos num só plano, com um coordenador no local em casamentos e eventos de empresa.')}</dd></div>
    </dl>`,
    fleetNote: c._('Vehicle classes shown as examples. Make and model are confirmed in the quote.', 'Classes de veículo apresentadas como exemplo. A marca e o modelo são confirmados no orçamento.'),
    capLabel: c._('Luggage', 'Bagagem'),
    fleet: [
      { img: 'fleet-car-saloon', name: c._('Executive saloon', 'Berlina executiva'), seats: c._('Up to 3', 'Até 3'), cap: c._('2 large cases', '2 malas grandes'), best: c._('Airport pickups and city days', 'Recolhas no aeroporto e dias na cidade') },
      { img: 'fleet-car-van', name: c._('Luxury van', 'Carrinha de luxo'), seats: c._('Up to 7', 'Até 7'), cap: c._('6 large cases', '6 malas grandes'), best: c._('Families, golf bags and small groups', 'Famílias, sacos de golfe e pequenos grupos') },
      { img: 'fleet-car-minibus', name: c._('Executive minibus', 'Minibus executivo'), seats: c._('Up to 16', 'Até 16'), cap: c._('16 cases', '16 malas'), best: c._('Wedding guests and corporate groups', 'Convidados de casamento e grupos de empresa') },
    ],
    faq: [
      [c._('What if my flight is delayed?', 'E se o meu voo atrasar?'), c._('We track the flight and adjust the pickup. Waiting time after the actual landing is included.', 'Acompanhamos o voo e ajustamos a recolha. O tempo de espera após a aterragem efetiva está incluído.')],
      [c._('Do you provide child seats?', 'Disponibilizam cadeiras de criança?'), c._('Yes, at no charge. Tell us the ages when you book.', 'Sim, sem custo. Indique as idades na reserva.')],
      [c._('Can I book for someone else?', 'Posso reservar para outra pessoa?'), c._('Yes. Hotels, assistants and planners book for guests every day. The passenger receives the driver’s name and number.', 'Sim. Hotéis, assistentes e organizadores reservam para hóspedes todos os dias. O passageiro recebe o nome e o número do motorista.')],
      [c._('Do you cover long distances?', 'Fazem longas distâncias?'), c._('Yes, anywhere in mainland Portugal and into Spain, with a second driver when the day requires it.', 'Sim, em todo o território continental e para Espanha, com segundo motorista quando o dia o exige.')],
    ],
  }),
};

export function servicePage(id, L) {
  return page(id, L, (() => {
    // data needs the page context, which page() creates; build a light one for meta
    const meta = DATA[id]({ _: (en, pt) => (L === 'en' ? en : pt) });
    return {
      title: meta.metaTitle,
      description: meta.metaDesc,
      ogImage: meta.head,
      ld: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: meta.title,
          serviceType: meta.title,
          description: meta.metaDesc,
          areaServed: ['Portugal', 'Europe'],
          provider: { '@type': 'LocalBusiness', '@id': SITE.url + '/#business', name: SITE.legalName },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: meta.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        },
      ],
      body: (c) => {
        const d = DATA[id](c);
        return `${pageHead(c, { title: d.title, lead: d.lead, image: img(c, d.head, { eager: true, cls: 'cover' }), crumbs: [['services', c._('Services', 'Serviços')]] })}
<section class="section">
  <div class="wrap two-col">
    <div>
      <h2>${c._('Who it is for', 'Para quem é')}</h2>
      <ul class="ruled">${d.who.map((w) => `<li>${w}</li>`).join('')}</ul>
    </div>
    <div>
      <h2>${c._('What is included', 'O que está incluído')}</h2>
      <ul class="ruled">${d.included.map((w) => `<li>${w}</li>`).join('')}</ul>
    </div>
  </div>
</section>
<section class="section section-rule">
  <div class="wrap">
    <h2>${d.extraTitle}</h2>
    ${d.extra}
  </div>
</section>
<section class="section section-rule">
  <div class="wrap">
    <h2>${c._('The fleet', 'A frota')}</h2>
    <p class="fine">${d.fleetNote}</p>
    <ul class="fleet">
      ${d.fleet
        .map(
          (f) => `<li class="fleet-item">
        ${img(c, f.img, { cls: 'fade', sizes: '(min-width: 900px) 33vw, 100vw' })}
        <h3>${f.name}</h3>
        <dl class="specs">
          <div><dt>${c._('Seats', 'Lugares')}</dt><dd>${f.seats}</dd></div>
          <div><dt>${d.capLabel}</dt><dd>${f.cap}</dd></div>
          <div><dt>${c._('Best for', 'Ideal para')}</dt><dd>${f.best}</dd></div>
        </dl>
      </li>`
        )
        .join('\n      ')}
    </ul>
  </div>
</section>
<section class="section section-rule">
  <div class="wrap narrow">
    <h2>${c._('Common questions', 'Perguntas frequentes')}</h2>
    <div class="faq">
      ${d.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>
${closing(c, { title: c._('Tell us where and when', 'Diga-nos para onde e quando'), text: c._('We reply with options and a fixed price, usually within two hours.', 'Respondemos com opções e preço fechado, normalmente em duas horas.') })}`;
      },
    };
  })());
}

export function servicesIndex(L) {
  return page('services', L, {
    title: L === 'en' ? 'Services: jets, helicopters, yachts and VIP transfers' : 'Serviços: jatos, helicópteros, iates e transfers VIP',
    description: L === 'en' ? 'Private jet charter, helicopter flights, yacht charter and chauffeured transfers in Portugal, booked together or separately.' : 'Charter de jatos privados, voos de helicóptero, aluguer de iates e transfers com motorista em Portugal, reservados em conjunto ou em separado.',
    ld: [],
    body: (c) => `${pageHead(c, { title: c._('Services', 'Serviços'), lead: c._('Four ways to travel, one team planning them. Book a single leg or the whole journey from runway to front door.', 'Quatro formas de viajar, uma equipa a planeá-las. Reserve um único trajeto ou a viagem completa, da pista à porta de casa.') })}
<section class="section">
  <div class="wrap bands">
    ${SERVICE_IDS.map(
      (s) => `<article class="band">
      <a class="band-media" href="${c.href(s)}" tabindex="-1" aria-hidden="true">${img(c, 'service-' + s, { cls: 'fade', sizes: '(min-width: 900px) 58vw, 100vw' })}</a>
      <div class="band-text">
        <h2><a href="${c.href(s)}">${serviceName(c, s)}</a></h2>
        <p>${serviceShort(c, s)}</p>
        <ul class="ruled">${DATA[s](c).who.slice(0, 2).map((w) => `<li>${w}</li>`).join('')}</ul>
        <p><a class="text-link" href="${c.href(s)}">${c._('See', 'Ver')} ${serviceName(c, s).toLowerCase()}</a></p>
      </div>
    </article>`
    ).join('\n    ')}
  </div>
</section>
${closing(c, { title: c._('One request covers the whole journey', 'Um pedido cobre a viagem inteira'), text: c._('Tell us the route and we combine jet, helicopter, boat and car as needed.', 'Diga-nos a rota e combinamos jato, helicóptero, barco e carro conforme necessário.') })}`,
  });
}

export { quoteLabel, businessLd };
