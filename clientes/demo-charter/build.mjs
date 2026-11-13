// Static site generator, no dependencies.  node build.mjs   (LOCAL=1 for file:// links)
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, PATHS, IMAGES, PHOTOS, placeholderSvg } from './src/site.mjs';
import { home, company, reviews, contact, quote, legal } from './src/pages.mjs';
import { servicePage, servicesIndex } from './src/services.mjs';
import { blogIndex, postPage, POSTS } from './src/blog.mjs';
import { SERVICE_IDS } from './src/layout.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = (rel, text) => {
  const file = join(here, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
};

// Remove previously generated pages so renamed slugs do not linger.
for (const dir of ['pt', 'company', 'services', 'blog', 'reviews', 'contact', 'quote', 'privacy', 'terms']) {
  rmSync(join(here, dir), { recursive: true, force: true });
}

const builders = {
  home, company, reviews, contact, quote,
  services: servicesIndex,
  blog: blogIndex,
  privacy: (L) => legal('privacy', L),
  terms: (L) => legal('terms', L),
};
for (const s of SERVICE_IDS) builders[s] = (L) => servicePage(s, L);
for (const p of POSTS) builders[p.id] = (L) => postPage(p, L);

let count = 0;
for (const id of Object.keys(PATHS)) {
  for (const L of ['en', 'pt']) {
    out(PATHS[id][L] + 'index.html', builders[id](L));
    count++;
  }
}

for (const key of Object.keys(IMAGES)) if (!PHOTOS[key]) out(`assets/img/${key}.svg`, placeholderSvg(key));
out('assets/img/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0A1220"/><path d="M5 22h22" stroke="#9BA5B5" stroke-width="1.5"/><path d="M5 12h9" stroke="#C8AD7F" stroke-width="2.5"/></svg>`);

const today = new Date().toISOString().slice(0, 10);
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.values(PATHS).flatMap((p) => [p.en, p.pt]).map((p) => `  <url><loc>${SITE.url}/${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
out('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);

// List of images to supply, kept next to the README.
out('IMAGENS.md', `# Imagens a fornecer

Estado atual de cada imagem em \`assets/img/\`:

- **IA**: imagem gerada por inteligência artificial (Higgsfield, modelo Z Image), só para o protótipo. Substituir por fotografia real da frota e dos locais antes de publicar.
- **Placeholder**: bloco SVG com a descrição, à espera de fotografia.

Para substituir uma imagem IA: gravar \`<ficheiro>.webp\` (largura total) e \`<ficheiro>-800.webp\` e atualizar as dimensões em \`src/photos.json\`.

| Ficheiro | Estado | O que deve mostrar |
|---|---|---|
${Object.entries(IMAGES).map(([k, v]) => `| \`${k}\` | ${PHOTOS[k] ? 'IA' : 'Placeholder'} | ${v.pt} |`).join('\n')}
`);

console.log(`Built ${count} pages, ${Object.keys(PHOTOS).length} photos, ${Object.keys(IMAGES).length - Object.keys(PHOTOS).length} placeholders.`);
