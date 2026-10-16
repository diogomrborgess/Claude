# Projeto: Sites e serviços para clínicas de estética

## Objetivo
Vender sites, chatbot, marcações online, automações e recuperação de leads a clínicas de estética e cirurgia plástica em Portugal.

## Critério de alvo
Clínicas de média dimensão (nem consultório muito pequeno, nem grupo grande) que **não têm site** ou têm um site **fraco ou incompleto**: sem marcação online, sem WhatsApp, desatualizado, mau no telemóvel.
Ficam de fora grupos grandes (CUF, Lusíadas, Clínica do Tempo, Milénio, Saúde Viável).

## Ferramentas
- **Claude Code**: construir os sites e os previews. Cada cliente numa pasta `clientes/<nome-da-clinica>/` deste repo. Funciona na sessão cloud (iPhone) e no MacBook.
- **Notion** (espaço de diogo@dbweb.pt): base de dados "Empresas a contactar" (https://app.notion.com/p/8a234b4d68824ffaa99e8ddbce0ffaf0) e página "Painel: Clínicas de estética e cirurgia plástica".
- Idioma de trabalho: português (Portugal).

## Estado (16 de outubro de 2026)
- 15 clínicas no Notion (Lisboa, Porto, Gaia, Coimbra, Algarve), com horários onde foram encontrados; LMR e António Conde removidas, todas em "Por contactar". Nenhum site foi verificado.
- Meta: 100 clínicas.
- Contactos conhecidos: HD Clinic, tel. 968422315, adm.hdclinic@gmail.com (via Portal da Queixa).

## Demo pronta
`clientes/demo-clinica/`: site + assistente de marcações (conversa tipo WhatsApp) + agenda. Abrir `index.html`. Ver o README da pasta para ligar ao WhatsApp e ao Google Calendar reais (ainda não testado com contas reais).

`clientes/mymoment/`: a mesma demo adaptada à MyMoment (proposta de demonstração, não é o site oficial). Telefone, email, ERS e equipa por preencher; ver o README da pasta.

## Próximos passos
1. Abrir o site de cada clínica e preencher "Tem site?" no Notion (sem site, site fraco, site bom). Apagar as com site bom.
2. Juntar telefone, email e Instagram das que ficam.
3. Procurar mais clínicas até 100 (Braga, Setúbal, Cascais, Funchal, Aveiro, Leiria).
4. Criar 3 previews de clínicas no Claude Code (`clientes/<clinica>/`), só para quem aceitar a videochamada.
5. Escrever a mensagem de primeiro contacto.

## Limitações conhecidas
- A sessão cloud só abre sites externos se o ambiente tiver Network access aberto (menu do ambiente > Edit). A alteração só vale para sessões novas.
- Cuidados: regras de publicidade em saúde (ERS, Ordem dos Médicos) e RGPD em chatbots que recolhem dados clínicos.
