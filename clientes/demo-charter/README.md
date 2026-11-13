# Demo charter: Cabo Raso (protótipo)

Site de demonstração para o nicho de charter de luxo: jatos privados, helicópteros, iates e barcos, e transfers VIP. **Empresa fictícia**, com base em Lisboa. Não é um cliente real.

## Ver o site

Os links usam URLs limpos (pastas), por isso precisa de um servidor:

```bash
python3 -m http.server 8765
```

Depois abrir `http://localhost:8765/`. Para abrir direto do disco (duplo clique em `index.html`), gerar com links para `index.html`:

```bash
LOCAL=1 node build.mjs
```

## Alterar

As páginas HTML são geradas. Editar em `src/` e correr `node build.mjs` (sem dependências, Node 18+).

| Ficheiro | Conteúdo |
|---|---|
| `src/site.mjs` | Nome, contactos, domínio, URLs das páginas, lista de imagens |
| `src/layout.mjs` | Cabeçalho, rodapé, `<head>`, SEO |
| `src/pages.mjs` | Home, Empresa, Avaliações, Contacto, Orçamento, páginas legais |
| `src/services.mjs` | Serviços (texto, frota, perguntas) e as linhas de rota |
| `src/blog.mjs` | Os três artigos e o índice do blog |
| `assets/css/style.css`, `assets/js/site.js` | Desenho e comportamento |

Inglês em `/`, português em `/pt/`. Cada texto está escrito nas duas línguas lado a lado: `c._('English', 'Português')`.

## O que falta fornecer antes de publicar

**Imagens:** 30, listadas em `IMAGENS.md`. Hoje 26 são geradas por IA (só para o protótipo: trocar por fotografia real da frota e dos locais) e as 4 da equipa são placeholders SVG.

**Dados da empresa** (em `src/site.mjs`, marcados com `TODO`):
- Nome legal, domínio final, morada, telefone, WhatsApp, email
- Links de Instagram, LinkedIn e do perfil Google para deixar avaliação
- Coordenadas da morada para o mapa (em `src/pages.mjs`, página de contacto)

**Licenças e seguros** (página Empresa, hoje "[por preencher]"):
- N.º do Certificado de Operador Aéreo dos operadores parceiros
- N.º de registo da própria empresa (agência, operador marítimo-turístico, transporte)
- Seguradora e n.º de apólice

**Conteúdo a confirmar:**
- Frota real de cada serviço (hoje são categorias de exemplo)
- Tempos das rotas e tempos de voo (hoje indicativos)
- Prazo de resposta prometido no orçamento (hoje "duas horas, das 08:00 às 22:00")
- Nomes, cargos e fotos da equipa
- Avaliações reais. Só depois pôr `reviewsAreReal: true` em `src/site.mjs`, que ativa o schema.org `Review` e `AggregateRating`
- Política de Privacidade e Termos, revistos por advogado

**Técnico:**
- Os formulários não enviam dados (mostram só a confirmação). Falta ligar a um email ou CRM
- O mapa é do OpenStreetMap, carregado de fora. Avaliar o aviso de cookies/terceiros
- As fotos finais devem entrar em WebP, em duas larguras (ver `IMAGENS.md`)
