# Demo: site + assistente de marcações (WhatsApp + Google Calendar)

Modelo para adaptar a cada clínica. Mostra o que fechamos na videochamada.

## O que há aqui
- `index.html`: site de demonstração. Abre-se direto no navegador (duplo clique) ou partilha-se o ecrã. Tem a conversa tipo WhatsApp e a agenda da clínica, que se atualiza ao confirmar uma marcação. Os dados da agenda são de exemplo e não ficam guardados.
- `bot/flow.js`: a conversa (serviço, dia, hora, nome, confirmação). É o mesmo código na demonstração e no WhatsApp real.
- `bot/calendar.js`: lê as horas ocupadas e cria marcações no Google Calendar da clínica.
- `bot/server.js`: recebe as mensagens do WhatsApp (API oficial da Meta) e responde.
- `bot/test.js`: teste da conversa. Correr com `node bot/test.js`.

## Adaptar a uma clínica (5 minutos)
Em `bot/flow.js`, no objeto `DEFAULTS`: nome da clínica, serviços e duração, horário por dia (inclui o sábado) e a frase da receção. Depois trocar textos e cores em `index.html`.

## Pôr a funcionar no WhatsApp a sério
1. **Google Calendar:** criar uma conta de serviço no Google Cloud, ativar a API do Calendar, partilhar o calendário da clínica com o email da conta de serviço (permissão "Fazer alterações a eventos") e guardar o JSON da conta de serviço.
2. **WhatsApp:** criar uma app no Meta for Developers com o produto WhatsApp, ligar um número da clínica e obter o token e o ID do número.
3. **Alojar o servidor** (Node 18 ou superior) num serviço como Render, Railway ou Fly, com HTTPS. Instalar com `npm install` e arrancar com `npm start`.
4. **Variáveis de ambiente:**
   - `VERIFY_TOKEN`: texto à tua escolha, o mesmo que pões na Meta.
   - `APP_SECRET`: segredo da app Meta (valida que os pedidos vêm da Meta).
   - `WHATSAPP_TOKEN` e `PHONE_NUMBER_ID`.
   - `GOOGLE_CALENDAR_ID` e `GOOGLE_SERVICE_ACCOUNT_JSON` (o JSON inteiro).
   - `CLINIC_NAME` (opcional).
5. **Webhook:** na Meta, apontar o webhook para `https://O-TEU-SERVIDOR/webhook` e subscrever "messages".

Sem as variáveis do Google, o servidor usa uma agenda em memória, só para testes.

## Limites desta versão
- Só marca. Não cancela nem reagenda (passa para a receção) e não envia lembretes.
- Só lê texto. A primeira mensagem de uma conversa iniciada pela clínica tem de ser um modelo aprovado pela Meta. Aqui o paciente é que escreve primeiro, por isso não é preciso.
- Mostra no máximo 8 horários por dia, espaçados. Para mostrar todos, mudar em `flow.js`.
- As sessões ficam em memória: se o servidor reiniciar, a conversa recomeça.
- Não foi testado com WhatsApp e Google Calendar reais (a sessão em que foi feito não tinha acesso à rede). Testar com um número e um calendário de teste antes de usar com uma clínica.

## RGPD e saúde
O assistente guarda só nome, telemóvel e serviço. Não pedir dados clínicos. Ter aviso de privacidade e uma cláusula de tratamento de dados no contrato com a clínica. Confirmar a publicidade em saúde (ERS, Ordem dos Médicos).
