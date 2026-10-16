# Proposta de demonstração: MyMoment

Site e assistente de marcações adaptados à MyMoment (clínica médica e estética, Lisboa). **Não é o site oficial.** Serve para mostrar na videochamada. Para a lógica e a ligação ao WhatsApp e ao Google Calendar, ver `../demo-clinica/README.md` (é o mesmo código).

Abrir `index.html` (ou `index.html#demo` para ver a conversa e a agenda juntas). Testes da conversa: `node bot/test.js`.

## O que vem de fontes públicas (a confirmar com a clínica)
- Nome: MyMoment, clínica médica e estética, em Lisboa.
- Morada: Rua Dr. António Cândido, 8, Loja 1, 1050-076 Lisboa (Bookimed, WhatClinic). Uma outra listagem indica Parque das Nações, Alameda dos Oceanos: **confirmar qual está em vigor**.
- Horário: segunda a sexta 9h–20h, sábado 9h–13h, domingo fechado (WhatClinic, dados de 2026).
- Áreas: cirurgia plástica (rosto, mama, corpo), medicina estética, dermatologia e laser. Consulta por videochamada para pacientes à distância (Bookimed).

## O que está por preencher
- Telefone, email, registo ERS, nomes e cédulas da equipa. Aparecem como `[a preencher]` no site e como `21 000 00 00` no bot (`bot/flow.js`, procurar `SUBSTITUIR`).
- Não usei nomes de médicos, números de cirurgias nem acreditações que apareceram em listagens de terceiros, porque não os confirmei.
- Cores e logótipo: usei um estilo neutro. Trocar pelos da marca quando os tivermos.
- As frases sobre como a clínica trabalha (consulta presencial antes de qualquer procedimento, orçamento por escrito, lista de medicação, link da videochamada) são exemplos. A clínica confirma ou corrige.
