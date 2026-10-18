#!/usr/bin/env bash
# Arranca o servidor MCP do Chrome DevTools (versão fixa) com a telemetria desligada.
# Na sessão cloud usa o Chromium pré-instalado; no Mac usa o Chrome normal.
args=(--headless --isolated --no-usage-statistics --no-performance-crux)
if [ -x /opt/pw-browsers/chromium ]; then
  args+=(--executablePath /opt/pw-browsers/chromium --chromeArg=--no-sandbox)
fi
export CHROME_DEVTOOLS_MCP_NO_UPDATE_CHECKS=1
exec npx -y chrome-devtools-mcp@1.11.0 "${args[@]}"
