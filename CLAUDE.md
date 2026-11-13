# Projeto: Sites e serviços para clínicas de estética

## Objetivo
Vender sites, chatbot, marcações online, automações e recuperação de leads a clínicas de estética e cirurgia plástica em Portugal.

## Critério de alvo
Clínicas de média dimensão (nem consultório muito pequeno, nem grupo grande) que **não têm site** ou têm um site **fraco ou incompleto**: sem marcação online, sem WhatsApp, desatualizado, mau no telemóvel.
Ficam de fora grupos grandes (CUF, Lusíadas, Clínica do Tempo, Milénio, Saúde Viável).

## Ferramentas
- **Claude Code**: construir os sites e os previews. Cada cliente numa pasta `clientes/<nome-da-clinica>/` deste repo. Funciona na sessão cloud (iPhone) e no MacBook.
- **Notion** (espaço de diogo@dbweb.pt): base de dados "Empresas a contactar" (https://app.notion.com/p/8a234b4d68824ffaa99e8ddbce0ffaf0) e página "Painel: Clínicas de estética e cirurgia plástica".
- **Skills instaladas** em `.claude/skills/`: `frontend-design` (desenho com personalidade) e `shadcn`. Outras skills oficiais (docx, pdf, pptx, xlsx, webapp-testing) já existem na conta; o repo completo, para consulta, é `git clone --depth 1 https://github.com/anthropics/skills`.
- **shadcn/ui** (skill em `.claude/skills/shadcn`, licença MIT): componentes React + Tailwind. Só se aplica a projetos React com `components.json`; os previews atuais são HTML simples. Repo completo de referência: `git clone --depth 1 https://github.com/shadcn-ui/ui`.
- Idioma de trabalho: português (Portugal).

## Estado (16 de outubro de 2026)
- 15 clínicas no Notion (Lisboa, Porto, Gaia, Coimbra, Algarve), com horários onde foram encontrados; LMR e António Conde removidas, todas em "Por contactar". Nenhum site foi verificado.
- Meta: 100 clínicas.
- Contactos conhecidos: HD Clinic, tel. 968422315, adm.hdclinic@gmail.com (via Portal da Queixa).

## Demo pronta
`clientes/demo-clinica/`: site + assistente de marcações (conversa tipo WhatsApp) + agenda. Abrir `index.html`. Ver o README da pasta para ligar ao WhatsApp e ao Google Calendar reais (ainda não testado com contas reais).

`clientes/mymoment/`: a mesma demo adaptada à MyMoment (proposta de demonstração, não é o site oficial). Telefone, email, ERS e equipa por preencher; ver o README da pasta.

`clientes/demo-charter/`: protótipo de outro nicho (charter de jatos, helicópteros, iates e transfers VIP), empresa fictícia "Cabo Raso" em Lisboa. Site estático EN/PT gerado por `node build.mjs` a partir de `src/`. Ver o README da pasta.

## Próximos passos
1. Abrir o site de cada clínica e preencher "Tem site?" no Notion (sem site, site fraco, site bom). Apagar as com site bom.
2. Juntar telefone, email e Instagram das que ficam.
3. Procurar mais clínicas até 100 (Braga, Setúbal, Cascais, Funchal, Aveiro, Leiria).
4. Criar 3 previews de clínicas no Claude Code (`clientes/<clinica>/`), só para quem aceitar a videochamada.
5. Escrever a mensagem de primeiro contacto.

## Ferramentas ligadas (MCP)
- **chrome-devtools** (`.mcp.json` + `scripts/chrome-devtools-mcp.sh`, versão 1.11.0 fixa, telemetria e CrUX desligados): deixa o Claude abrir páginas num Chrome real, ver a consola e a rede, medir desempenho e tirar capturas. Testado na sessão cloud com Chromium e no Mac usa o Chrome normal. Só aparece em sessões novas e o Claude Code pede aprovação à primeira vez.

## Regras de trabalho (valem em todas as conversas deste projeto)
- Sempre que a tarefa envolver interface em React (painéis, formulários, calendário de marcações, janelas, menus, tabelas), usar a skill `shadcn` e os componentes do repo de referência, sem o Diogo precisar de o pedir. Seguir as regras da skill (componentes existentes, variantes, cores semânticas).
- Sempre que a tarefa for desenhar ou refazer um site, página ou interface, usar a skill `frontend-design` (Apache 2.0, do repo anthropics/skills), sem o Diogo precisar de o pedir: primeiro um plano de desenho específico do assunto, revisto contra o pedido, e só depois o código.
- Páginas de clínica (landing pages) mantêm desenho próprio, sóbrio e específico do nicho, para não ficarem com o ar genérico de sites feitos em série. Só usar shadcn nelas se o Diogo pedir.
- Se o projeto ainda não tiver React e Tailwind, avisar antes de os introduzir.
- Depois de construir ou alterar uma página, verificá-la com o `chrome-devtools` (consola sem erros, telemóvel e desktop, sem scroll lateral) antes de dizer que está pronta.

## Limitações conhecidas
- A sessão cloud só abre sites externos se o ambiente tiver Network access aberto (menu do ambiente > Edit). A alteração só vale para sessões novas.
- Cuidados: regras de publicidade em saúde (ERS, Ordem dos Médicos) e RGPD em chatbots que recolhem dados clínicos.
