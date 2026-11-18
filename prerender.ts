/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Script de Pré-renderização Estática (SSG) para a Tool Brasil.
 * Executado após a build do Vite para gerar páginas HTML completas,
 * resolvendo o problema de "Low value content" do Google AdSense.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES, TOOLS, PROGRAMMATIC_PAGES } from './src/toolsData.ts';
import { EXTRA_PROGRAMMATIC_PAGES, isNoIndexProgrammaticId } from './src/programmaticExtra.ts';
import { EDITORIAL_GUIDES } from './src/guidesData.ts';
import { generateAllApiData } from './scripts/generate-api-data.ts';

const ALL_PROGRAMMATIC_PAGES = { ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos dos diretórios
const DIST_DIR = path.resolve(__dirname, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

function run() {
  console.log('🚀 Iniciando a pré-renderização estática (SSG) das páginas...');

  // 0. Gerar Endpoints da API Estática JSON
  generateAllApiData();

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Erro: O template de build '${TEMPLATE_PATH}' não existe. Rode 'npm run build' primeiro.`);
    process.exit(1);
  }

    const rawTemplate = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  // Extrai um template limpo com <div id="root"></div> sem conteúdo prévio e sem schemas duplicados
  let cleanTemplate = rawTemplate
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<div id="root">[\s\S]*?<\/body>/i, '<div id="root"></div>\n</body>');

  // 1. Gerar Home Page
  console.log(' - Pré-renderizando: Home (/)');
  const homeHtml = generateHomeHtml(cleanTemplate);
  fs.writeFileSync(TEMPLATE_PATH, homeHtml, 'utf-8');

  // 2. Gerar páginas de Categorias
  CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').forEach(cat => {
    console.log(` - Pré-renderizando categoria: /${cat.id}`);
    const catHtml = generateCategoryHtml(cleanTemplate, cat);
    const catDir = path.join(DIST_DIR, cat.id);
    fs.mkdirSync(catDir, { recursive: true });
    fs.writeFileSync(path.join(catDir, 'index.html'), catHtml, 'utf-8');
  });

  // 3. Gerar páginas de Ferramentas
  TOOLS.forEach(tool => {
    console.log(` - Pré-renderizando ferramenta: /${tool.categoryId}/${tool.slug}`);
    const toolHtml = generateToolHtml(cleanTemplate, tool);
    const toolDir = path.join(DIST_DIR, tool.categoryId, tool.slug);
    fs.mkdirSync(toolDir, { recursive: true });
    fs.writeFileSync(path.join(toolDir, 'index.html'), toolHtml, 'utf-8');
  });

  // 4. Gerar páginas Programáticas
  Object.entries(ALL_PROGRAMMATIC_PAGES).forEach(([id, page]) => {
    console.log(` - Pré-renderizando pág. programática: /programatico/${id}`);
    const progHtml = generateProgrammaticHtml(cleanTemplate, id, page);
    const progDir = path.join(DIST_DIR, 'programatico', id);
    fs.mkdirSync(progDir, { recursive: true });
    fs.writeFileSync(path.join(progDir, 'index.html'), progHtml, 'utf-8');
  });

  // 4.1 Gerar Hub e Artigos de Guias Práticos (/guias e /guias/:slug)
  console.log(' - Pré-renderizando Central de Guias (/guias)');
  const guidesHubHtml = generateGuidesHubHtml(cleanTemplate);
  const guidesDir = path.join(DIST_DIR, 'guias');
  fs.mkdirSync(guidesDir, { recursive: true });
  fs.writeFileSync(path.join(guidesDir, 'index.html'), guidesHubHtml, 'utf-8');

  EDITORIAL_GUIDES.forEach(guide => {
    console.log(` - Pré-renderizando guia: /guias/${guide.slug}`);
    const guideHtml = generateGuideArticleHtml(cleanTemplate, guide);
    const guideDir = path.join(guidesDir, guide.slug);
    fs.mkdirSync(guideDir, { recursive: true });
    fs.writeFileSync(path.join(guideDir, 'index.html'), guideHtml, 'utf-8');
  });

  // 5. Gerar páginas Institucionais exclusivamente nas rotas canônicas (aliases redirecionam via 301 no vercel.json)
  const institutionalPageIds = ['sobre', 'contato', 'privacidade', 'termos', 'cookies', 'transparencia-adsense', 'anunciantes'];
  const canonicalDirMap: { [key: string]: string } = {
    'sobre': 'sobre',
    'contato': 'contato',
    'privacidade': 'politica-de-privacidade',
    'termos': 'termos-de-uso',
    'cookies': 'cookies',
    'transparencia-adsense': 'transparencia-adsense',
    'anunciantes': 'anunciantes'
  };
  institutionalPageIds.forEach(id => {
    const instHtml = generateInstitutionalHtml(cleanTemplate, id);
    const canonicalSubPath = canonicalDirMap[id] || id;
    console.log(` - Pré-renderizando pág. institucional canônica: /${canonicalSubPath}`);
    const targetDir = path.join(DIST_DIR, canonicalSubPath);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), instHtml, 'utf-8');
  });

  // 5.1 Gerar página de Desenvolvedores e API
  console.log(' - Pré-renderizando: Desenvolvedores & API (/desenvolvedores e /api [noindex])');
  const devHtml = generateDeveloperHtml(cleanTemplate, 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  const devDir = path.join(DIST_DIR, 'desenvolvedores');
  fs.mkdirSync(devDir, { recursive: true });
  fs.writeFileSync(path.join(devDir, 'index.html'), devHtml, 'utf-8');

  // Rota alias /api isolada com noindex, follow para evitar duplicação com /desenvolvedores
  const apiHtmlNoIndex = generateDeveloperHtml(cleanTemplate, 'noindex, follow');
  const apiDir = path.join(DIST_DIR, 'api');
  fs.mkdirSync(apiDir, { recursive: true });
  fs.writeFileSync(path.join(apiDir, 'index.html'), apiHtmlNoIndex, 'utf-8');

  // 6. Gerar Sitemap.xml unificado e sincronizado
  console.log(' - Gerando sitemap.xml completo com rotas canônicas...');
  const sitemapXml = generateFullSitemapXml(institutionalPageIds);
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  const publicSitemap = path.resolve(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemap, sitemapXml, 'utf-8');

  // 7. Garantir cópia das chaves de validação do IndexNow
  const indexNowKeyFiles = ['antigravityseokey2026.txt', '3a9f7e8b1c2d4e5f60718293a4b5c6d7.txt'];
  indexNowKeyFiles.forEach(keyFile => {
    const publicIndexNow = path.resolve(__dirname, 'public', keyFile);
    const distIndexNow = path.resolve(DIST_DIR, keyFile);
    if (fs.existsSync(publicIndexNow)) {
      fs.copyFileSync(publicIndexNow, distIndexNow);
      console.log(` - Chave IndexNow '${keyFile}' copiada para '${distIndexNow}'`);
    }
  });

  console.log(`\n✅ Pré-renderização concluída com sucesso!`);
}

function generateFullSitemapXml(instPages: string[]): string {
  const host = 'https://www.toolbrasil.com.br';
  const today = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Home
  xml += `  <url>\n    <loc>${host}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  // Categorias
  CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').forEach(cat => {
    xml += `  <url>\n    <loc>${host}/${cat.id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Ferramentas
  TOOLS.forEach(tool => {
    xml += `  <url>\n    <loc>${host}/${tool.categoryId}/${tool.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  // Páginas Programáticas Canônicas (exclui páginas replicadas/efêmeras marcadas com noindex)
  Object.keys(ALL_PROGRAMMATIC_PAGES)
    .filter(id => !isNoIndexProgrammaticId(id))
    .forEach(id => {
      xml += `  <url>\n    <loc>${host}/programatico/${id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
    });

  // Hub e Guias Práticos Editoriais (/guias + 12 artigos)
  xml += `  <url>\n    <loc>${host}/guias</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
  EDITORIAL_GUIDES.forEach(guide => {
    xml += `  <url>\n    <loc>${host}/guias/${guide.slug}</loc>\n    <lastmod>${guide.updatedAt || today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  // Institucionais - URLs Canônicas de Primeiro Nível
  const canonicalInstUrls = [
    { path: '/sobre', priority: '0.6' },
    { path: '/contato', priority: '0.6' },
    { path: '/politica-de-privacidade', priority: '0.5' },
    { path: '/termos-de-uso', priority: '0.5' },
    { path: '/cookies', priority: '0.3' },
    { path: '/anunciantes', priority: '0.4' },
    { path: '/transparencia-adsense', priority: '0.4' }
  ];

  canonicalInstUrls.forEach(item => {
    xml += `  <url>\n    <loc>${host}${item.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${item.priority}</priority>\n  </url>\n`;
  });

  // Desenvolvedores & API Pública
  xml += `  <url>\n    <loc>${host}/desenvolvedores</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;

  xml += `</urlset>`;
  return xml;
}

/**
 * Schema.org JSON-LD Structured Data Helpers
 */
function getBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
  const items = crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `https://www.toolbrasil.com.br${c.path}`
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

function getWebApplicationSchema(tool: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    url: `https://www.toolbrasil.com.br/${tool.categoryId}/${tool.slug}`,
    description: tool.shortDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'BRL' }
  };
}

function getFAQPageSchema(tool: any) {
  if (!tool.faqs || tool.faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  };
}

function buildSchemaTags(crumbs: { name: string; path: string }[], toolObj?: any, isHome = false) {
  const breadcrumb = getBreadcrumbSchema(crumbs);
  let tags = `<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n</script>`;
  
  if (isHome) {
    const org = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Tool Brasil",
      "alternateName": "ToolBrasil",
      "url": "https://www.toolbrasil.com.br/",
      "logo": "https://www.toolbrasil.com.br/assets/og-image.jpg"
    };
    const website = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Tool Brasil",
      "alternateName": "ToolBrasil",
      "url": "https://www.toolbrasil.com.br/",
      "description": "Ferramentas Online Gratuitas para o Dia a Dia. Calculadoras, Conversores, Geradores e Utilitários Web.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.toolbrasil.com.br/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };
    tags += `\n<script type="application/ld+json">\n${JSON.stringify(org, null, 2)}\n</script>`;
    tags += `\n<script type="application/ld+json">\n${JSON.stringify(website, null, 2)}\n</script>`;
  }

  if (toolObj) {
    const webApp = getWebApplicationSchema(toolObj);
    tags += `\n<script type="application/ld+json">\n${JSON.stringify(webApp, null, 2)}\n</script>`;
    
    const faq = getFAQPageSchema(toolObj);
    if (faq) {
      tags += `\n<script type="application/ld+json">\n${JSON.stringify(faq, null, 2)}\n</script>`;
    }
  } else if (isHome) {
     const webApp = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Tool Brasil Engine",
      "url": "https://www.toolbrasil.com.br/",
      "operatingSystem": "All",
      "applicationCategory": "UtilityApplication",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "BRL"
      }
    };
    tags += `\n<script type="application/ld+json">\n${JSON.stringify(webApp, null, 2)}\n</script>`;
  }
  return tags;
}

/**
 * Utilitário para substituir metadados e injetar corpo no HTML
 */
function buildHtmlPage(
  template: string,
  title: string,
  desc: string,
  canonicalUrl: string,
  bodyContent: string,
  schemaJsonLd?: string,
  robotsMeta: string = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
): string {
  let html = template;

  // Substitui Robots Meta Directive (e injeta caso não exista no template)
  if (/<meta name="robots" content=".*?" \/>/i.test(html)) {
    html = html.replace(/<meta name="robots" content=".*?" \/>/gi, `<meta name="robots" content="${robotsMeta}" />`);
  } else {
    html = html.replace('</head>', `<meta name="robots" content="${robotsMeta}" />\n</head>`);
  }

  // Substitui Title
  html = html.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/g, `<meta name="title" content="${title}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="twitter:title" content=".*?" \/>/g, `<meta property="twitter:title" content="${title}" />`);

  // Substitui Description
  html = html.replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${desc}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${desc}" />`);
  html = html.replace(/<meta property="twitter:description" content=".*?" \/>/g, `<meta property="twitter:description" content="${desc}" />`);

  // Substitui Canonical URL
  html = html.replace(/<link rel="canonical" href=".*?" \/>/g, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="twitter:url" content=".*?" \/>/g, `<meta property="twitter:url" content="${canonicalUrl}" />`);

  // Injeta o schema no <head> se fornecido
  if (schemaJsonLd) {
    html = html.replace('</head>', `${schemaJsonLd}\n</head>`);
  }

  // Monta o layout comum (Header + Sidebar + Main Content + Footer)
  const fullBody = `
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300" id="main-root">
      
      <!-- HEADER -->
      <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200" id="app-header">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div class="flex items-center gap-6 shrink-0">
            <a href="/" class="flex items-center gap-2 group">
              <div class="p-2 bg-emerald-600 rounded-lg text-white group-hover:scale-105 transition-transform shadow-md shadow-emerald-500/10">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <span class="text-lg font-extrabold tracking-tight text-emerald-600">Tool Brasil</span>
                <span class="hidden sm:block text-[9px] text-slate-500 font-bold font-mono uppercase tracking-wider">ToolBrasil.com</span>
              </div>
            </a>
          </div>
          <nav class="hidden lg:flex items-center gap-5 text-xs font-extrabold text-slate-800">
            <a href="/calculadoras" class="hover:text-emerald-700 transition-colors py-1">Calculadoras</a>
            <a href="/conversores" class="hover:text-emerald-700 transition-colors py-1">Conversores</a>
            <a href="/geradores" class="hover:text-emerald-700 transition-colors py-1">Geradores</a>
            <a href="/ferramentas-web" class="hover:text-emerald-700 transition-colors py-1">Ferramentas Web</a>
            <a href="/utilitarios" class="hover:text-emerald-700 transition-colors py-1">Utilitários</a>
            <a href="/guias" class="hover:text-emerald-700 transition-colors py-1">Guias</a>
            <a href="/sobre" class="hover:text-emerald-700 transition-colors py-1">Sobre</a>
            <a href="/contato" class="hover:text-emerald-700 transition-colors py-1">Contato</a>
          </nav>
        </div>
      </header>

      <!-- MAIN LAYOUT -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6" id="main-holder">
        <!-- SIDEBAR -->
        <aside class="order-2 lg:order-1 lg:col-span-1 space-y-4" id="left-sidebar">
          <div class="bg-white p-4 rounded-xl border border-slate-300 shadow-xs space-y-3">
            <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Categorias</h3>
            <nav class="space-y-1">
              <a href="/" class="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-950">Início / Home</a>
              ${CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').map(cat => `
                <a href="/${cat.id}" class="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 hover:text-slate-950">
                  <span>${cat.name}</span>
                  <span class="text-[9.5px] bg-slate-100 text-slate-600 font-extrabold rounded px-1.5 py-0.5">
                    ${TOOLS.filter(t => t.categoryId === cat.id).length}
                  </span>
                </a>
              `).join('')}
              <a href="/guias" class="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100">
                <span>Guias Práticos</span>
                <span class="text-[9.5px] bg-white text-emerald-700 font-extrabold rounded px-1.5 py-0.5">${EDITORIAL_GUIDES.length}</span>
              </a>
            </nav>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-300 shadow-xs space-y-2 text-xs">
            <span class="text-[10px] font-extrabold text-slate-900 uppercase flex items-center gap-1.5">Tabelas Oficiais</span>
            <div class="grid grid-cols-1 gap-1">
              <a href="/programatico/ddd-brasil" class="text-slate-700 hover:text-emerald-600 transition-colors font-mono font-semibold">▸ DDD Brasil</a>
              <a href="/programatico/cep-brasil" class="text-slate-700 hover:text-emerald-600 transition-colors font-mono font-semibold">▸ CEP Correios</a>
              <a href="/programatico/bancos-brasil" class="text-slate-700 hover:text-emerald-600 transition-colors font-mono font-semibold">▸ Bancos & ISPB</a>
              <a href="/programatico/salario-minimo-historico" class="text-slate-700 hover:text-emerald-600 transition-colors font-mono font-semibold">▸ Salário Mínimo Histórico</a>
              <a href="/programatico/feriados-nacionais" class="text-slate-700 hover:text-emerald-600 transition-colors font-mono font-semibold">▸ Feriados Nacionais</a>
              <a href="/programatico/selic-historica" class="text-slate-700 hover:text-emerald-600 transition-colors font-mono font-semibold">▸ Taxa SELIC Histórica</a>
            </div>
          </div>
        </aside>

        <!-- PRIMARY CONTENT -->
        <section class="order-1 lg:order-2 lg:col-span-3 space-y-6" id="primary-content-view">
          ${bodyContent}
        </section>
      </div>

      <!-- FOOTER -->
      <footer class="bg-white border-t border-slate-200 mt-auto py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-4">
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/guias" class="hover:underline font-bold text-emerald-700">Guias Práticos (2026)</a>
            <a href="/sobre" class="hover:underline font-bold text-slate-700">Sobre a Tool Brasil</a>
            <a href="/contato" class="hover:underline font-bold text-slate-700">Fale Conosco / Suporte</a>
            <a href="/politica-de-privacidade" class="hover:underline font-bold text-slate-700">Política de Privacidade (LGPD)</a>
            <a href="/termos-de-uso" class="hover:underline font-bold text-slate-700">Termos de Uso</a>
            <a href="/cookies" class="hover:underline font-bold text-slate-700">Preferências de Cookies</a>
            <a href="/transparencia-adsense" class="hover:underline font-bold text-slate-700">Transparência AdSense</a>
            <a href="/anunciantes" class="hover:underline font-bold text-slate-700">Anunciantes / Mídia Kit</a>
            <a href="/desenvolvedores" class="hover:underline font-bold text-emerald-700">API Pública</a>
          </div>
          <p>&copy; 2026 Tool Brasil. Ferramentas online 100% gratuitas desenvolvidas em estrita conformidade regulatória (CLT, Receita Federal, BACEN e LGPD).</p>
        </div>
      </footer>
    </div>
  `;

  // Injeta no <div id="root"></div> do template
  return html.replace('<div id="root"></div>', `<div id="root">${fullBody}</div>`);
}

/**
 * GERADORES DE HTML ESPECÍFICOS POR ROTA
 */

function generateHomeHtml(template: string): string {
  const title = "Tool Brasil | 138+ Ferramentas e Calculadoras Online Gratuitas";
  const desc = "Acesse 138+ calculadoras financeiras e trabalhistas, geradores de documentos (CPF/CNPJ), conversores de moedas e unidades. Ferramentas úteis 100% gratuitas e sem cadastro.";
  const canonical = "https://www.toolbrasil.com.br/";

  const content = `
    <div class="space-y-8">
      <div class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-white space-y-4 shadow-lg">
        <h1 class="text-3xl font-extrabold tracking-tight">Ferramentas Online Gratuitas para o seu Dia a Dia</h1>
        <p class="text-emerald-100 max-w-2xl leading-relaxed">
          Sua central brasileira de utilitários rápidos e precisos para cálculos trabalhistas e previdenciários (CLT, INSS e IRRF 2026), simulações de financiamento e juros compostos, segurança de dados com processamento local, conversores de medidas em tempo real e diagnósticos técnicos web. Tudo 100% grátis, imediato e sem exigência de cadastro.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            ⭐ Ferramentas em Destaque
          </h2>
          <p class="text-xs text-slate-600">Utilitários selecionados de alta utilidade para trabalhadores, desenvolvedores e finanças pessoais:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="/calculadoras/calculadora-de-juros-compostos" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Juros Compostos</span>
              <span class="text-[10px] text-slate-500 block">Investimentos e projeção de riqueza com aportes.</span>
            </a>
            <a href="/calculadoras/calculadora-de-rescisao-trabalhista" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Rescisão CLT 2026</span>
              <span class="text-[10px] text-slate-500 block">Verbas rescisórias, aviso proporcional e FGTS.</span>
            </a>
            <a href="/geradores/gerador-de-cpf" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Gerador de CPF</span>
              <span class="text-[10px] text-slate-500 block">Documentos sintéticos Módulo 11 para QA.</span>
            </a>
            <a href="/conversores/converter-real-para-dolar" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Real para Dólar</span>
              <span class="text-[10px] text-slate-500 block">Conversão cambial com cotação comercial atualizada.</span>
            </a>
            <a href="/geradores/gerador-de-senha-segura" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Senha Segura</span>
              <span class="text-[10px] text-slate-500 block">Geração criptográfica local via Web Crypto API.</span>
            </a>
            <a href="/utilitarios/compressor-de-imagens-online" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Compressor de Imagens</span>
              <span class="text-[10px] text-slate-500 block">Otimize JPG, PNG e WebP no navegador sem upload.</span>
            </a>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            💡 Por que utilizar a Tool Brasil?
          </h2>
          <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p><strong>1. Processamento Local (Client-Side & LGPD):</strong> Documentos, dados financeiros, textos e fotografias são processados estritamente na memória do seu navegador. Nunca armazenamos dados sigilosos em servidores externos.</p>
            <p><strong>2. Metodologia Oficial Vigente em 2026:</strong> Nossos módulos trabalhistas acompanham a tabela progressiva do INSS (piso de R$ 1.518,00 e teto de R$ 8.157,41), alíquotas e desconto simplificado do IRRF, Lei nº 12.506/2011 e padrões técnicos do Banco Central e Receita Federal.</p>
            <p><strong>3. Performance Instantânea e Zero Barreiras:</strong> Desenvolvido sob boas práticas modernas de web para carregar em milissegundos em celulares e desktops, 100% gratuito e mantido de maneira transparente via Google AdSense.</p>
          </div>
        </div>
      </div>

      <article class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-slate-800">
        <div class="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 class="text-xl font-black text-slate-900">Ecossistema Completo: 5 Suítes Especializadas e Central de Guias</h2>
            <p class="text-xs text-slate-600 mt-1">Conheça como cada área da Tool Brasil apoia rotinas trabalhistas, financeiras, educacionais e de engenharia de software.</p>
          </div>
          <a href="/guias" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition">Explorar ${EDITORIAL_GUIDES.length} Guias Práticos →</a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 class="font-bold text-slate-900 text-sm">Calculadoras CLT & Finanças</h3>
            <p>Simule férias proporcionais, 13º salário, horas extras a 50% e 100%, adicional noturno urbano e rural, seguro-desemprego, PIS/PASEP, comparativo CLT vs. PJ no Simples Nacional, financiamentos SAC e Price e juros compostos com precisão centavo a centavo.</p>
            <a href="/calculadoras" class="text-emerald-700 font-bold hover:underline inline-block">Abrir Calculadoras →</a>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 class="font-bold text-slate-900 text-sm">Geradores Sintéticos & PIX</h3>
            <p>Gere e valide CPFs, CNPJs e títulos de eleitor para homologação em ambientes de QA, além de contratos de locação pela Lei do Inquilinato, cartas formais de demissão, declarações dos Correios e QR Codes PIX estáticos no padrão EMVCo do Banco Central.</p>
            <a href="/geradores" class="text-emerald-700 font-bold hover:underline inline-block">Abrir Geradores →</a>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Redes, Conversores & Mídia</h3>
            <p>Inspecione registros DNS (A, AAAA, MX, TXT), certificados SSL/TLS, headers HTTP, WHOIS e meu IP público; converta moedas, temperaturas, unidades imperiais e megabytes; ou comprima imagens WebP/PNG/JPG e gere PDFs em A4 localmente no navegador.</p>
            <a href="/ferramentas-web" class="text-emerald-700 font-bold hover:underline inline-block">Abrir Ferramentas Web →</a>
          </div>
        </div>

        <div class="space-y-3 pt-2 border-t border-slate-200">
          <h3 class="text-base font-black text-slate-900">Guias Editoriais Mais Procurados de 2026</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            ${EDITORIAL_GUIDES.slice(0, 6).map(g => `
              <a href="/guias/${g.slug}" class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-600 transition block space-y-1">
                <span class="text-[10px] font-bold uppercase text-emerald-700">${g.category}</span>
                <span class="font-bold text-slate-900 block">${g.title}</span>
                <span class="text-[11px] text-slate-600 block">${g.summary}</span>
              </a>
            `).join('')}
          </div>
        </div>

        <div class="space-y-3 pt-2 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
          <h3 class="text-sm font-bold text-slate-900">Perguntas Frequentes sobre a Tool Brasil</h3>
          <dl class="space-y-2.5">
            <div>
              <dt class="font-bold text-slate-800">Os dados inseridos nas calculadoras e geradores ficam salvos em servidores?</dt>
              <dd>Não. Praticamente toda a computação ocorre no dispositivo do próprio visitante via JavaScript local, sem armazenamento de salários, textos, senhas ou imagens em nuvem.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">As tabelas do INSS, IRRF e salário mínimo estão atualizadas para 2026?</dt>
              <dd>Sim. Todas as faixas progressivas, parcelas a deduzir, desconto simplificado mensal e endpoints da API Pública JSON refletem as referências vigentes de 2026.</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  `;

  const crumbs = [{ name: 'Início', path: '/' }];
  const schemaTags = buildSchemaTags(crumbs, undefined, true);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function getCategoryEditorialHtml(cat: any): string {
  if (cat.id === 'calculadoras') {
    return `
      <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-slate-800">
        <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>📊</span> Central de Calculadoras Financeiras, Trabalhistas e do Cotidiano
        </h2>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            A categoria de <strong>Calculadoras da Tool Brasil</strong> reúne dezenas de utilitários projetados para entregar agilidade, exatidão matemática e suporte a decisões financeiras e trabalhistas. Nosso catálogo abrange desde estimativas simples de proporcionalidade e consumo até complexos cálculos de rescisão contratual com alíquotas progressivas.
          </p>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Rigor Normativo e Alíquotas Vigentes (2026)</h3>
          <p>
            Diferente de simuladores desatualizados, as calculadoras trabalhistas e fiscais da Tool Brasil incorporam as diretrizes normativas vigentes no território nacional:
          </p>
          <ul class="list-disc pl-5 space-y-1.5">
            <li><strong>Tabela Progressiva do INSS:</strong> Aplicação das alíquotas progressivas (7,5% a 14%) faixa por faixa, em estrita conformidade com a Portaria Interministerial MPS/MF nº 2/2026.</li>
            <li><strong>Deduções do Imposto de Renda (IRRF):</strong> Fórmulas alinhadas às faixas de isenção e parcelas a deduzir estabelecidas pela Receita Federal do Brasil.</li>
            <li><strong>Rescisões e Férias CLT:</strong> Apuração exata de aviso prévio proporcional (Lei nº 12.506/2011), terço constitucional de férias, saldo de salário e multa de 40% do FGTS.</li>
          </ul>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Privacidade Total e Processamento Local</h3>
          <p>
            Todas as simulações executam exclusivamente na memória do seu navegador web (client-side). Seus dados financeiros, datas de admissão e valores salariais jamais são enviados aos nossos servidores ou compartilhados com terceiros.
          </p>
        </div>

        <hr class="border-slate-200" />

        <div class="space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Perguntas Frequentes sobre as Calculadoras</h3>
          <dl class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div>
              <dt class="font-bold text-slate-800">Os cálculos substituem um contador ou parecer jurídico formal?</dt>
              <dd class="mt-0.5">Não. Nossas calculadoras possuem finalidade meramente informativa e de estimativa matemática. Decisões formais devem sempre ser referendadas por profissionais habilitados (contadores, advogados trabalhistas) ou órgãos oficiais.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">As alíquotas de INSS e IRPF estão atualizadas?</dt>
              <dd class="mt-0.5">Sim. Nossa equipe técnica atualiza continuamente as faixas salariais, tetos previdenciários e tabelas progressivas assim que novas portarias oficiais são publicadas no Diário Oficial da União.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">É necessário pagar ou criar conta para usar?</dt>
              <dd class="mt-0.5">Não. Todas as ferramentas da Tool Brasil são 100% gratuitas, sem limites diários de uso e sem exigência de cadastro.</dd>
            </div>
          </dl>
        </div>
      </div>
    `;
  }

  if (cat.id === 'conversores') {
    return `
      <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-slate-800">
        <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>📐</span> Central de Conversores de Unidades, Medidas e Moedas
        </h2>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            O módulo de <strong>Conversores da Tool Brasil</strong> foi desenvolvido para eliminar erros manuais em transformações métricas, financeiras, de temperatura e de armazenamento digital. Nossos utilitários utilizam os padrões estritos do Sistema Internacional de Unidades (SI) e especificações da ISO, atendendo desde cálculos escolares e receitas culinárias até especificações de engenharia civil, logística internacional e administração de infraestrutura de TI.
          </p>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Cotações Comerciais em Tempo Real e Simulações Cambiais</h3>
          <p>
            Os conversores cambiais (Dólar Americano USD, Euro EUR, Libra Esterlina GBP, Peso Argentino ARS e Bitcoin BTC) atualizam suas taxas automaticamente com base em feeds de cotação comercial de mercado, permitindo simular compras internacionais, remessas financeiras, orçamentos de importação e viagens ao exterior com clareza imediata. Além da cotação pura PTAX/comercial, você pode ajustar manualmente a taxa de câmbio informada pela sua corretora ou banco para incluir spread cambial e IOF em simulações personalizadas.
          </p>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Padrões Métricos Internacionais, Tempo e Armazenamento Digital</h3>
          <p>
            Conversões de comprimento (metros para pés, polegadas para centímetros, milhas para quilômetros), massa (quilos para libras), velocidade (km/h para mph), temperatura (°C para °F) e dados digitais (KB para MB e MB para GB) aplicam fatores de precisão estendida em ponto flutuante. Também oferecemos conversores de algarismos romanos, conversor de fusos horários ancorado no Horário Oficial de Brasília (UTC-3) e acessibilidade com leitura de texto em voz direta via Web Speech API do navegador.
          </p>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Tabela Rápida de Fatores de Conversão mais Consultados</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse border border-slate-200 text-[11px]">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2 px-3">Conversão</th>
                  <th class="py-2 px-3">Fator Exato / Fórmula</th>
                  <th class="py-2 px-3">Exemplo Prático</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr><td class="py-1.5 px-3 font-bold text-slate-900">Polegadas para Centímetros</td><td class="py-1.5 px-3 font-mono">1 in = 2,54 cm</td><td class="py-1.5 px-3">Tela 55" = 139,7 cm diagonais</td></tr>
                <tr><td class="py-1.5 px-3 font-bold text-slate-900">Metros para Pés</td><td class="py-1.5 px-3 font-mono">1 m = 3,28084 ft</td><td class="py-1.5 px-3">10 m = 32,81 pés</td></tr>
                <tr><td class="py-1.5 px-3 font-bold text-slate-900">Quilos para Libras</td><td class="py-1.5 px-3 font-mono">1 kg = 2,20462 lb</td><td class="py-1.5 px-3">23 kg bagagem = 50,71 lb</td></tr>
                <tr><td class="py-1.5 px-3 font-bold text-slate-900">Celsius para Fahrenheit</td><td class="py-1.5 px-3 font-mono">(°C × 1,8) + 32</td><td class="py-1.5 px-3">180 °C forno = 356 °F</td></tr>
                <tr><td class="py-1.5 px-3 font-bold text-slate-900">Megabytes para Gigabytes</td><td class="py-1.5 px-3 font-mono">÷ 1.000 (SI) ou ÷ 1.024 (Binário)</td><td class="py-1.5 px-3">10.240 MiB = 10 GiB</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr class="border-slate-200" />

        <div class="space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Perguntas Frequentes sobre os Conversores</h3>
          <dl class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div>
              <dt class="font-bold text-slate-800">As cotações de moedas utilizam valores comerciais ou turismo?</dt>
              <dd class="mt-0.5">Utilizamos cotações comerciais de mercado (bid/ask). Para compras com cartão de crédito internacional ou casas de câmbio físicas, considere o spread cambial e a alíquota vigente de IOF diretamente no campo de taxa editável.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Qual a diferença entre a conversão decimal e binária de gigabytes (GB)?</dt>
              <dd class="mt-0.5">No padrão decimal adotado por fabricantes de SSDs e operadoras (SI), 1 GB equivale a 1.000 MB. No padrão binário usado por sistemas operacionais (Gibibyte/GiB), 1 GiB corresponde a 1.024 MiB. Nossos conversores detalham ambos os valores.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Os conversores funcionam em celulares offline ou redes móveis lentas?</dt>
              <dd class="mt-0.5">Sim. Todas as conversões matemáticas de medidas, temperaturas, velocidades e unidades de tempo executam integralmente no navegador sem depender de chamadas a servidores externos.</dd>
            </div>
          </dl>
        </div>
      </div>
    `;
  }

  if (cat.id === 'geradores') {
    return `
      <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-slate-800">
        <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>🔒</span> Central de Geradores de Dados, Documentos Sintéticos e Códigos
        </h2>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            A suíte de <strong>Geradores da Tool Brasil</strong> atende desenvolvedores, testadores de software (QA), designers de interface e administradores de sistemas que necessitam de massas de dados sintéticos válidos para homologação e preenchimento de cadastros de teste.
          </p>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Algoritmo Módulo 11 Oficial e Segurança LGPD</h3>
          <p>
            Nossos geradores de CPF e CNPJ aplicam estritamente o algoritmo matemático oficial de Módulo 11 para cálculo dos dois dígitos verificadores (DV). Todos os números gerados são combinações sintéticas aleatórias destinadas exclusivamente a testes em ambientes de desenvolvimento, em total conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Senhas Fortes com Criptografia Web Crypto API</h3>
          <p>
            O gerador de senhas utiliza a API nativa criptográfica do navegador (crypto.getRandomValues), gerando entropia de alta segurança resistente a ataques de força bruta e dicionário.
          </p>
        </div>

        <hr class="border-slate-200" />

        <div class="space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Perguntas Frequentes sobre os Geradores</h3>
          <dl class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div>
              <dt class="font-bold text-slate-800">Os CPFs e CNPJs gerados pertencem a pessoas reais?</dt>
              <dd class="mt-0.5">Não. São números sintéticos gerados aleatoriamente com dígitos verificadores matematicamente válidos para homologação de software. É estritamente proibido o uso de dados fictícios para fins fraudulentos ou contratuais reais.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">As senhas geradas ficam salvas em algum banco de dados?</dt>
              <dd class="mt-0.5">Não. Todo o processo de geração ocorre localmente no seu dispositivo. Nenhuma credencial gerada é transmitida pela rede.</dd>
            </div>
          </dl>
        </div>
      </div>
    `;
  }

  if (cat.id === 'ferramentas-web') {
    return `
      <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-slate-800">
        <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span>🌐</span> Central de Ferramentas Web, Redes, SEO e Diagnósticos Online
        </h2>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            A categoria de <strong>Ferramentas Web da Tool Brasil</strong> disponibiliza um conjunto completo de utilitários para engenheiros de software, administradores de sistemas (SRE), analistas de SEO técnico e equipes de infraestrutura diagnosticarem conectividade, resolução DNS, segurança TLS/SSL, cabeçalhos HTTP e integridade de cargas de dados JSON e URLs diretamente no navegador.
          </p>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Inspeção DNS, Certificados SSL/TLS, WHOIS e Rede TCP/IP</h3>
          <p>
            Durante migrações de servidores, criação de novas aplicações web ou investigação de incidentes de disponibilidade, verificar a propagação de registros A, AAAA, CNAME, MX e TXT (incluindo SPF e DMARC) evita indisponibilidades prolongadas e falhas de entrega de e-mail transacional. Complementamos essa análise com consultor de certificado SSL/TLS (verificação de validade e autoridade certificadora), verificação de status Up/Down em tempo real, leitura de cabeçalhos HTTP (HSTS, Cache-Control, CORS e redirects), localizador ASN/GeoIP e consulta WHOIS de titularidade de domínios nacionais e internacionais.
          </p>
          <h3 class="text-sm font-bold text-slate-800 pt-2">Formatação e Otimização de Código para Desenvolvedores</h3>
          <p>
            Além de inspeção de infraestrutura, a suíte reúne utilitários instantâneos client-side para formatar e validar payloads JSON complexos (JSON Formatter / Beautifier), codificar e decodificar strings em URLs com suporte Unicode (percent-encoding), e minificar arquivos CSS e JavaScript reduzindo bytes transferidos e acelerando métricas Core Web Vitals como LCP e INP. Para recomendações avançadas de segurança web, confira nosso <a href="/guias/auditoria-tecnica-dns-ssl-headers-http-seguranca-sites" class="font-bold text-emerald-700 hover:underline">Guia de Auditoria Técnica DNS, SSL e Headers HTTP</a>.
          </p>
        </div>

        <hr class="border-slate-200" />

        <div class="space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Perguntas Frequentes sobre Ferramentas Web</h3>
          <dl class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div>
              <dt class="font-bold text-slate-800">Como funciona a detecção do Meu IP público (IPv4 / IPv6)?</dt>
              <dd class="mt-0.5">A ferramenta consulta o endereço IPv4 ou IPv6 visível na internet pública pela sua conexão atual, identificando cidade aproximada, estado, fuso horário, código ASN e provedor de internet (ISP) sem salvar registros históricos.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">O verificador de portas realiza varreduras invasivas na rede?</dt>
              <dd class="mt-0.5">Não. São executadas verificações pontuais e autorizadas de disponibilidade nas portas padrão declaradas (como 80, 443, 21, 22, 587 ou 3306) estritamente para fins legítimos de depuração de firewall e diagnóstico administrativo.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Os códigos JSON, CSS ou JavaScript colados nos formatadores são armazenados?</dt>
              <dd class="mt-0.5">Absolutamente não. Tanto a formatação quanto a minificação e o encode/decode de URLs rodam integralmente na memória do seu navegador sem envio para servidores remotos.</dd>
            </div>
          </dl>
        </div>
      </div>
    `;
  }

  // Utilitários
  return `
    <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-slate-800">
      <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
        <span>⚙️</span> Central de Utilitários de Produtividade, Texto e Mídia
      </h2>
      <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
        <p>
          Os <strong>Utilitários da Tool Brasil</strong> foram concebidos para economizar tempo em rotinas de formatação textual, manipulação rápida de imagens e conferência documental do dia a dia.
        </p>
        <h3 class="text-sm font-bold text-slate-800 pt-2">Processamento de Imagens Seguro via Canvas API</h3>
        <p>
          Diferente de portais que realizam o upload de suas fotos para servidores desconhecidos, nossos compressores e conversores de imagem executam a compressão e transformação de formato utilizando a API nativa de Canvas e WebP do seu navegador. Suas imagens nunca saem do seu computador ou celular.
        </p>
        <h3 class="text-sm font-bold text-slate-800 pt-2">Produtividade Instantânea</h3>
        <p>
          Formatadores de texto (maiúsculas/minúsculas, remoção de quebras de linha, contadores de palavras e caracteres) aceleram a produção de conteúdo, redação de e-mails corporativos e revisão editorial.
        </p>
      </div>

      <hr class="border-slate-200" />

      <div class="space-y-3">
        <h3 class="text-sm font-bold text-slate-900">Perguntas Frequentes sobre os Utilitários</h3>
        <dl class="space-y-3 text-xs text-slate-600 leading-relaxed">
          <div>
            <dt class="font-bold text-slate-800">Minhas fotos ou documentos enviados para compressão ficam salvos na internet?</dt>
            <dd class="mt-0.5">Absolutamente não. O processamento é 100% executado localmente na memória do seu navegador. Nada é transmitido a servidores externos.</dd>
          </div>
          <div>
            <dt class="font-bold text-slate-800">Existe limite de tamanho de arquivo para compressão?</dt>
            <dd class="mt-0.5">O limite depende exclusivamente da memória RAM do seu dispositivo, suportando com facilidade imagens de alta resolução de até 20MB.</dd>
          </div>
        </dl>
      </div>
    </div>
  `;
}

function generateCategoryHtml(template: string, cat: any): string {
  const title = `${cat.name} | Tool Brasil`;
  const desc = `${cat.description} Acesse ferramentas gratuitas na categoria ${cat.name} na central de utilitários Tool Brasil.`;
  const canonical = `https://www.toolbrasil.com.br/${cat.id}`;

  const catTools = TOOLS.filter(t => t.categoryId === cat.id);

  const content = `
    <div class="space-y-8">
      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
        <h1 class="text-2xl font-bold text-slate-900">${cat.name}</h1>
        <p class="text-sm text-slate-600 leading-relaxed">${cat.description}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${catTools.map(t => `
          <a href="/${cat.id}/${t.slug}" class="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-600 transition block group shadow-xs">
            <h2 class="font-extrabold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">${t.title}</h2>
            <p class="text-xs text-slate-600 mt-2 leading-relaxed">${t.shortDescription}</p>
          </a>
        `).join('')}
      </div>

      <!-- CONTEÚDO EDITORIAL PROFUNDO ANTI-THIN-CONTENT -->
      ${getCategoryEditorialHtml(cat)}
    </div>
  `;

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: cat.name, path: `/${cat.id}` }
  ];
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: desc,
    url: canonical
  };
  const schemaTags = buildSchemaTags(crumbs) + `\n<script type="application/ld+json">\n${JSON.stringify(collectionSchema, null, 2)}\n</script>`;
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function getInteractivePreviewCardHtml(tool: any): string {
  return `
    <div class="bg-white border border-slate-300 rounded-2xl p-6 shadow-sm space-y-4">
      <div class="flex items-center justify-between border-b border-slate-150 pb-3">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Cálculo Instantâneo Local
          </span>
          <span class="text-[11px] font-medium text-slate-500">100% Gratuito & Sem Cadastro</span>
        </div>
        <span class="text-xs font-mono text-slate-400">ToolBrasil v2.6</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
          <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Parâmetros da Ferramenta</span>
          <p class="text-xs text-slate-600 leading-relaxed">
            Insira os dados requeridos no formulário interativo para processamento local imediato pelo seu navegador.
          </p>
          <div class="flex flex-wrap gap-1.5 pt-1">
            <span class="text-[10px] bg-white border border-slate-300 px-2 py-0.5 rounded text-slate-700 font-medium">Dados Seguros</span>
            <span class="text-[10px] bg-white border border-slate-300 px-2 py-0.5 rounded text-slate-700 font-medium">Privacidade Client-Side</span>
            <span class="text-[10px] bg-white border border-slate-300 px-2 py-0.5 rounded text-slate-700 font-medium">Precisão Algorítmica</span>
          </div>
        </div>

        <div class="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-2">
          <span class="text-xs font-extrabold text-emerald-900 uppercase tracking-wider block">Resultado Esperado</span>
          <p class="text-xs text-slate-700 leading-relaxed">
            O diagnóstico detalhado, demonstrativo de valores ou dados gerados são exibidos instantaneamente na tela com opção de cópia e impressão em formato A4.
          </p>
          <div class="pt-1 flex items-center gap-2 text-[11px] font-bold text-emerald-800">
            <span>✓ Pronto para exportação</span>
            <span>•</span>
            <span>✓ Compartilhamento via WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getCategoryGuideAndTableHtml(categoryId: string, tool: any): string {
  if (categoryId === 'calculadoras') {
    const toolId = (tool.id || '').toLowerCase();

    // 1. CHURRASCO E GASTRONOMIA
    if (toolId.includes('churrasco')) {
      return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>🥩</span> Tabela de Consumo Recomendado para Churrasco (por Convidado)
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Para garantir fartura sem desperdício, os parâmetros gastronômicos recomendados por especialistas consideram a duração média de 4 a 6 horas de evento:
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th class="px-3 py-2 border-b border-slate-200">Perfil do Convidado</th>
                <th class="px-3 py-2 border-b border-slate-200">Carnes (Bovino, Frango, Linguiça)</th>
                <th class="px-3 py-2 border-b border-slate-200">Cerveja (Estimativa)</th>
                <th class="px-3 py-2 border-b border-slate-200">Refrigerante / Água</th>
                <th class="px-3 py-2 border-b border-slate-200">Acompanhamentos</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700">
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Homem Adulto</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">450g a 500g</td>
                <td class="px-3 py-2">4 a 6 latas (350ml)</td>
                <td class="px-3 py-2">1,0 Litro</td>
                <td class="px-3 py-2">150g (Pão de alho/Farofa)</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Mulher Adulta</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">300g a 350g</td>
                <td class="px-3 py-2">3 a 4 latas (350ml)</td>
                <td class="px-3 py-2">1,0 Litro</td>
                <td class="px-3 py-2">150g (Pão de alho/Farofa)</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Criança (até 10 anos)</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">150g a 200g</td>
                <td class="px-3 py-2 text-slate-400">Não consome</td>
                <td class="px-3 py-2">800ml (Sucos/Refrigerante)</td>
                <td class="px-3 py-2">100g (Pão de alho)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <span class="font-extrabold text-slate-900 block">🔥 Insumos Básicos Essenciais:</span>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Carvão:</strong> Calcule 1 saco de 5kg para cada 6kg a 8kg de carnes a serem assadas.</li>
            <li><strong>Gelo:</strong> Reserve 1 saco de 10kg para cada 25 a 30 litros de bebidas no cooler ou caixa térmica.</li>
            <li><strong>Sal Grosso:</strong> Adicione sal grosso de granulação média 5 minutos antes de levar os cortes à grelha para preservar a suculência.</li>
          </ul>
        </div>
      </div>`;
    }

    // 2. VEÍCULOS E COMBUSTÍVEL
    if (toolId.includes('combustivel') || toolId.includes('veiculo') || toolId.includes('gasolina') || toolId.includes('etanol')) {
      return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>🚗</span> Parâmetros de Autonomia e Regra dos 70% (Etanol vs. Gasolina)
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          O cálculo de paridade energética orienta a decisão econômica no posto de combustível considerando o poder calorífico de cada derivado:
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th class="px-3 py-2 border-b border-slate-200">Tipo de Combustível</th>
                <th class="px-3 py-2 border-b border-slate-200">Rendimento Energético Médio</th>
                <th class="px-3 py-2 border-b border-slate-200">Relação de Preço Máxima</th>
                <th class="px-3 py-2 border-b border-slate-200">Quando Compensa</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700">
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Etanol Hidratado (Álcool)</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">70% a 73% da Gasolina</td>
                <td class="px-3 py-2">Preço Etanol / Gasolina ≤ 0,70</td>
                <td class="px-3 py-2">Mais vantajoso quando a razão ficar abaixo de 70%</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Gasolina Comum / Aditivada</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">100% (Base de Referência)</td>
                <td class="px-3 py-2">Preço Etanol / Gasolina &gt; 0,70</td>
                <td class="px-3 py-2">Mais vantajosa para autonomia em estradas e viagens</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">GNV (Gás Veicular)</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">Maior km por m³</td>
                <td class="px-3 py-2">Aproximadamente 60% do custo da gasolina</td>
                <td class="px-3 py-2">Recomendado para condutores que rodam mais de 80km/dia</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <span class="font-extrabold text-slate-900 block">💡 Dicas para Economia de Combustível:</span>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Calibragem:</strong> Pneus com apenas 3 libras abaixo do recomendado elevam o consumo em até 4%.</li>
            <li><strong>Trocas de Marcha:</strong> Mantenha a rotação do motor na faixa de torque ideal (geralmente entre 2.000 e 2.500 RPM em motores 1.0 e 1.6).</li>
            <li><strong>Ar-Condicionado:</strong> Em velocidades abaixo de 60 km/h na cidade, abrir os vidros consome menos do que o ar ligado.</li>
          </ul>
        </div>
      </div>`;
    }

    // 3. SAÚDE E IMC
    if (toolId.includes('imc') || toolId.includes('peso') || toolId.includes('caloria') || toolId.includes('saude')) {
      return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>❤️</span> Classificação Oficial do IMC (Diretrizes da OMS)
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          O Índice de Massa Corporal (IMC) é a medida padrão internacional adotada pela Organização Mundial da Saúde (OMS) para rastreio do estado nutricional:
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th class="px-3 py-2 border-b border-slate-200">Classificação</th>
                <th class="px-3 py-2 border-b border-slate-200">Faixa de IMC (kg/m²)</th>
                <th class="px-3 py-2 border-b border-slate-200">Risco de Comorbidades</th>
                <th class="px-3 py-2 border-b border-slate-200">Recomendação Geral</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700">
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium text-blue-700">Abaixo do Peso</td>
                <td class="px-3 py-2 font-mono">&lt; 18,5</td>
                <td class="px-3 py-2">Baixo (risco de desnutrição)</td>
                <td class="px-3 py-2">Acompanhamento nutricional para ganho saudável de massa</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-semibold text-emerald-700">Peso Normal / Saudável</td>
                <td class="px-3 py-2 font-mono font-bold">18,5 a 24,9</td>
                <td class="px-3 py-2">Eutrófico (risco basal)</td>
                <td class="px-3 py-2">Manutenção de dieta equilibrada e atividade física</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium text-amber-700">Sobrepeso (Pré-obesidade)</td>
                <td class="px-3 py-2 font-mono">25,0 a 29,9</td>
                <td class="px-3 py-2">Levemente Aumentado</td>
                <td class="px-3 py-2">Reeducação alimentar e aumento de gasto calórico diário</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium text-rose-600">Obesidade Grau I</td>
                <td class="px-3 py-2 font-mono">30,0 a 34,9</td>
                <td class="px-3 py-2">Moderado (pressão e glicose)</td>
                <td class="px-3 py-2">Avaliação médica preventiva e plano de redução de peso</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium text-rose-800">Obesidade Grau II e III</td>
                <td class="px-3 py-2 font-mono">&ge; 35,0</td>
                <td class="px-3 py-2 font-bold text-rose-700">Alto / Muito Alto</td>
                <td class="px-3 py-2">Acompanhamento clínico multidisciplinar contínuo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`;
    }

    // 4. JUROS E FINANÇAS PESSOAIS / INVESTIMENTOS
    if (toolId.includes('juros') || toolId.includes('investimento') || toolId.includes('financiamento') || toolId.includes('poupanca')) {
      return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>💰</span> Comparativo de Sistemas Financeiros e Métodos de Amortização
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Entenda as fórmulas fundamentais que governam empréstimos, financiamentos e investimentos no mercado brasileiro:
        </p>
        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th class="px-3 py-2 border-b border-slate-200">Modalidade / Sistema</th>
                <th class="px-3 py-2 border-b border-slate-200">Fórmula de Cálculo</th>
                <th class="px-3 py-2 border-b border-slate-200">Comportamento da Prestação</th>
                <th class="px-3 py-2 border-b border-slate-200">Aplicação no Mercado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700">
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Juros Compostos</td>
                <td class="px-3 py-2 font-mono text-emerald-700">M = C × (1 + i)^t</td>
                <td class="px-3 py-2">Efeito exponencial de juros sobre juros</td>
                <td class="px-3 py-2">Tesouro Selic, CDB, LCI/LCA, Ações e FIIs</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Juros Simples</td>
                <td class="px-3 py-2 font-mono">M = C × (1 + i × t)</td>
                <td class="px-3 py-2">Crescimento linear sobre o principal inicial</td>
                <td class="px-3 py-2">Desconto de duplicatas comerciais e cheque pré-datado</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Tabela SAC</td>
                <td class="px-3 py-2 font-mono">Amortização = Saldo / N</td>
                <td class="px-3 py-2 text-emerald-700 font-semibold">Decrescente mês a mês</td>
                <td class="px-3 py-2">Financiamento imobiliário habitacional (Caixa)</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Tabela Price (Francês)</td>
                <td class="px-3 py-2 font-mono">PMT = VP × [i / (1 - (1+i)^-n)]</td>
                <td class="px-3 py-2">Parcelas fixas e constantes</td>
                <td class="px-3 py-2">Financiamento de veículos e crédito consignado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`;
    }

    // 5. MATEMÁTICA GERAL (Regra de 3, Porcentagem, Médias)
    if (toolId.includes('regra-de-tres') || toolId.includes('porcentagem') || toolId.includes('media') || toolId.includes('fracao')) {
      return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>📐</span> Propriedades Matemáticas e Relações de Proporcionalidade
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Guia rápido das propriedades operatórias fundamentais aplicadas na resolução de proporcionalidades e porcentagens:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <span class="font-extrabold text-slate-900 block">Proporção Direta:</span>
            <p class="leading-relaxed">
              Duas grandezas são diretamente proporcionais quando o aumento de uma implica o aumento proporcional da outra na mesma razão (multiplicação cruzada: <em>A × D = B × C</em>).
            </p>
          </div>
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <span class="font-extrabold text-slate-900 block">Proporção Inversa:</span>
            <p class="leading-relaxed">
              Ocorre quando o aumento de uma grandeza reduz a outra (ex: mais trabalhadores reduzem o tempo de obra). O produto das variáveis permanece constante: <em>A × B = C × D</em>.
            </p>
          </div>
        </div>
      </div>`;
    }

    // 6. TRABALHISTAS E PREVIDENCIÁRIAS (CLT / INSS / IRRF) - Padrão para ferramentas trabalhistas
    return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>⚖️</span> Tabela de Referência Oficial e Parâmetros Vigentes (2026)
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Para garantir máxima precisão e conformidade jurídica em seus cálculos trabalhistas e financeiros, consulte os parâmetros e alíquotas oficiais vigentes no Brasil:
        </p>
        
        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th class="px-3 py-2 border-b border-slate-200">Faixa Salarial / Base de Cálculo</th>
                <th class="px-3 py-2 border-b border-slate-200">Alíquota Progressiva INSS</th>
                <th class="px-3 py-2 border-b border-slate-200">Alíquota IRRF</th>
                <th class="px-3 py-2 border-b border-slate-200">Parcela a Deduzir do IR</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700">
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Até R$ 1.518,00 (Salário Mínimo)</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">7,50%</td>
                <td class="px-3 py-2 text-slate-500">Isento</td>
                <td class="px-3 py-2 text-slate-500">R$ 0,00</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">De R$ 1.518,01 até R$ 2.793,88</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">9,00%</td>
                <td class="px-3 py-2">7,50%</td>
                <td class="px-3 py-2">R$ 169,44</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">De R$ 2.793,89 até R$ 4.190,83</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">12,00%</td>
                <td class="px-3 py-2">15,00%</td>
                <td class="px-3 py-2">R$ 381,44</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">De R$ 4.190,84 até R$ 8.157,41 (Teto)</td>
                <td class="px-3 py-2 font-semibold text-emerald-700">14,00%</td>
                <td class="px-3 py-2">22,50%</td>
                <td class="px-3 py-2">R$ 662,77</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Acima de R$ 8.157,41</td>
                <td class="px-3 py-2 font-semibold text-slate-800">Teto Fixo (R$ 951,63)</td>
                <td class="px-3 py-2 font-bold text-rose-700">27,50%</td>
                <td class="px-3 py-2 font-semibold">R$ 896,00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
          <span class="font-extrabold text-slate-900 block">📌 Fundamentos Legais e Prazos CLT:</span>
          <ul class="list-disc pl-5 space-y-1">
            <li><strong>Décimo Terceiro Salário:</strong> 1ª parcela paga impreterivelmente entre 1º de fevereiro e 30 de novembro (50% sem descontos); 2ª parcela paga até 20 de dezembro com deduções de INSS e IRRF.</li>
            <li><strong>Aviso Prévio Proporcional:</strong> Conforme a Lei nº 12.506/2011, ao período base de 30 dias são acrescidos 3 dias para cada ano completo de trabalho na mesma empresa, até o limite máximo de 90 dias.</li>
            <li><strong>Multa Rescisória do FGTS:</strong> Em caso de demissão sem justa causa pelo empregador, é devido o adicional de 40% sobre o saldo total dos depósitos acumulados durante o contrato.</li>
          </ul>
        </div>
      </div>`;
  }

  if (categoryId === 'conversores') {
    return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>📐</span> Tabela de Equivalências e Fatores de Conversão Padrão
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          O sistema de conversão da Tool Brasil utiliza os padrões do Sistema Internacional de Unidades (SI) e normas ISO para assegurar precisão absoluta em conversões métricas, financeiras e digitais:
        </p>

        <div class="overflow-x-auto">
          <table class="min-w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-100 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th class="px-3 py-2 border-b border-slate-200">Unidade de Origem</th>
                <th class="px-3 py-2 border-b border-slate-200">Unidade de Destino</th>
                <th class="px-3 py-2 border-b border-slate-200">Fator de Multiplicação / Fórmula</th>
                <th class="px-3 py-2 border-b border-slate-200">Aplicação Comum</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 text-slate-700">
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Metros (m)</td>
                <td class="px-3 py-2">Pés (ft)</td>
                <td class="px-3 py-2 font-mono text-emerald-700">Multiplicar por 3,28084</td>
                <td class="px-3 py-2 text-slate-500">Engenharia, aviação civil e calçados</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Quilogramas (kg)</td>
                <td class="px-3 py-2">Libras (lbs)</td>
                <td class="px-3 py-2 font-mono text-emerald-700">Multiplicar por 2,20462</td>
                <td class="px-3 py-2 text-slate-500">Cargas, balanças e esportes</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Polegadas (in)</td>
                <td class="px-3 py-2">Centímetros (cm)</td>
                <td class="px-3 py-2 font-mono text-emerald-700">Multiplicar por 2,54</td>
                <td class="px-3 py-2 text-slate-500">Telas, monitores e marcenaria</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Celsius (°C)</td>
                <td class="px-3 py-2">Fahrenheit (°F)</td>
                <td class="px-3 py-2 font-mono text-emerald-700">(°C × 9/5) + 32</td>
                <td class="px-3 py-2 text-slate-500">Climatização e culinária internacional</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-3 py-2 font-medium">Megabytes (MB)</td>
                <td class="px-3 py-2">Gigabytes (GB)</td>
                <td class="px-3 py-2 font-mono text-emerald-700">Dividir por 1.024 (Binário) / 1.000 (SI)</td>
                <td class="px-3 py-2 text-slate-500">Armazenamento em TI e planos de dados</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if (categoryId === 'geradores') {
    return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>🔒</span> Metodologia Algorítmica e Conformidade com a LGPD
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Todos os documentos, sequências e hashes sintéticos gerados nesta plataforma utilizam algoritmos matemáticos oficiais e estrita conformidade com as diretrizes regulatórias:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <span class="font-extrabold text-slate-900 block">Algoritmo Módulo 11 (CPF e CNPJ):</span>
            <p class="leading-relaxed">
              O Cadastro de Pessoas Físicas (CPF) e o Cadastro Nacional da Pessoa Jurídica (CNPJ) adotam a verificação ponderada via Módulo 11. Os 9 primeiros dígitos do CPF (ou 12 do CNPJ) são multiplicados por pesos decrescentes de 10 a 2. O somatório é dividido por 11 para definir os dígitos verificadores (DV).
            </p>
          </div>

          <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <span class="font-extrabold text-slate-900 block">Segurança de Dados & LGPD:</span>
            <p class="leading-relaxed">
              Nossos geradores foram concebidos exclusivamente para <strong>testes de software, homologação de sistemas e preenchimento de mockups</strong>. As combinações numéricas são criadas aleatoriamente em tempo de execução e não possuem vínculo com pessoas reais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
          </div>
        </div>
      </div>
    `;
  }

  if (categoryId === 'ferramentas-web') {
    return `
      <div class="space-y-4 pt-3">
        <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>🌐</span> Guia Técnico de Redes, DNS e Diagnóstico Web
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Diagnósticos de rede e utilitários web operam com base na arquitetura TCP/IP e nas especificações das RFCs da Internet Engineering Task Force (IETF):
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span class="font-bold text-slate-800 block">Portas Padrão</span>
            <p class="text-slate-600 text-[11px]">Porta 80 (HTTP sem SSL), Porta 443 (HTTPS seguro com TLS), Porta 22 (SSH), Porta 53 (Serviço de DNS).</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span class="font-bold text-slate-800 block">IPs Privados (RFC 1918)</span>
            <p class="text-slate-600 text-[11px]">Faixas reservadas para redes locais: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16, invisíveis diretamente na web pública.</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span class="font-bold text-slate-800 block">DNS & TTL</span>
            <p class="text-slate-600 text-[11px]">O Time-To-Live (TTL) dita o tempo em segundos que provedores de internet retêm caches dos registros A, CNAME e MX.</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="space-y-4 pt-3">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <span>⚙️</span> Boas Práticas e Diretrizes de Produtividade Digital
      </h3>
      <p class="text-xs text-slate-600 leading-relaxed">
        Os utilitários da Tool Brasil foram projetados para acelerar rotinas de produtividade, tratamento de texto e cálculos diários. O processamento estritamente local garante confidencialidade completa de seus dados sem envio para servidores externos.
      </p>
    </div>
  `;
}

function getStepByStepExampleHtml(tool: any): string {
  const keywordsList: string[] = Array.isArray(tool.keywords) ? tool.keywords : [];
  const kwsText = keywordsList.slice(0, 5).join(', ') || tool.title;
  const textSignal = `${tool.id} ${tool.slug} ${tool.title} ${keywordsList.join(' ')}`.toLowerCase();

  let domainBadge = 'Fluxo Metodológico Exclusivo';
  let scenarioIntro = '';
  let steps: string[] = [];
  let verificationTip = '';

  if (tool.categoryId === 'calculadoras') {
    if (/inss|irrf|rescisao|ferias|decimo|clt|fgts|hora-extra|dsr|noturno|seguro-desemprego|pis|pasep|aviso-previo|faltas|salario|periculosidade|insalubridade/.test(textSignal)) {
      domainBadge = 'Conferência Trabalhista & Folha CLT 2026';
      scenarioIntro = `Ao auditar valores de folha ou desligamento na ${tool.title}, considere sempre a base salarial bruta composta pelo salário contratual somado a eventuais médias variáveis habituais, conferindo as faixas vigentes de 2026 (piso nacional de R$ 1.518,00 e teto do INSS de R$ 8.157,41).`;
      steps = [
        `Informe com exatidão o salário-base e parâmetros temporais exigidos em ${tool.title} (como meses trabalhados, dependentes ou adicionais habituais).`,
        'Verifique no detalhamento se as deduções progressivas do INSS (7,5% a 14% com parcela a deduzir) e do IRRF (método legal versus desconto simplificado mensal) foram aplicadas na ordem regulamentar.',
        'Compare o resultado líquido estimado com os eventos discriminados no seu holerite ou TRCT oficial e guarde os cálculos antes de homologar prazos de pagamento.'
      ];
      verificationTip = 'Verbas indenizatórias como férias proporcionais na rescisão e multa de 40% do FGTS não sofrem retenção de INSS ou IRRF na mesma base do saldo de salário.';
    } else if (/juros|financiamento|emprestimo|consignado|ipva|icms|itbi|itcmd|margem|preco-de-venda|desconto|move-brasil/.test(textSignal)) {
      domainBadge = 'Simulação Financeira & Custo Efetivo';
      scenarioIntro = `Para avaliar propostas bancárias, formação de preço comercial ou tributos patrimoniais com a ${tool.title}, diferencie sempre taxas nominais mensais das taxas efetivas anuais capitalizadas (CET).`;
      steps = [
        `Insira o capital principal, alíquota aplicável ou taxa de juros e o horizonte exato de meses ou etapas exigido por ${tool.title}.`,
        'Compare pelo menos dois cenários variando prazo ou percentual de entrada para enxergar o peso dos juros compostos acumulados ao longo do tempo.',
        'Valide o resultado final frente ao Custo Efetivo Total (CET), seguros obrigatórios ou alíquotas estaduais/municipais específicas da operação.'
      ];
      verificationTip = 'Em financiamentos longos, antecipar amortizações diretamente no prazo costuma economizar mais juros do que reduzir apenas a parcela corrente.';
    } else {
      domainBadge = 'Apuração Matemática & Planejamento Prático';
      scenarioIntro = `A ${tool.title} converte variáveis do dia a dia (${kwsText}) em métricas objetivas prontas para embasar decisões domésticas, educacionais ou de obra/viagem.`;
      steps = [
        `Preencha as medidas reais do seu caso na ${tool.title}, mantendo todas as grandezas na mesma unidade ou escala informada nos rótulos.`,
        'Revise margens técnicas de segurança ou folgas percentuais aplicáveis (como margem de corte em reformas, consumo urbano versus rodoviário em viagens ou pesos de prova).',
        'Use o comparativo exibido imediatamente em tela para evitar compras em excesso ou estimativas subdimensionadas.'
      ];
      verificationTip = 'Salve uma captura ou anote os parâmetros usados na primeira simulação para confrontar com o resultado real após a execução do projeto.';
    }
  } else if (tool.categoryId === 'conversores') {
    domainBadge = 'Conversão Bidirecional de Precisão (SI / Mercado)';
    scenarioIntro = `Ao utilizar o ${tool.title}, certifique-se da escala de origem e de destino (${kwsText}) para evitar erros clássicos de grandeza entre padrões métricos, binários, decimais ou cotações cambiais.`;
    steps = [
      `Digite o valor numérico conhecido no campo de origem do ${tool.title} utilizando ponto ou vírgula decimal corretamente.`,
      'Observe o fator exato de equivalência exibido instantaneamente (como PTAX comercial em moedas, 2,54 cm por polegada ou fatores binários 1024 versus decimais 1000 em dados digitais).',
      'Copie o valor convertido ou ajuste manualmente a taxa/parâmetro caso esteja simulando casa de câmbio com IOF e spread específicos.'
    ];
    verificationTip = 'Em planilhas fiscais e relatórios técnicos, padronize duas ou quatro casas decimais conforme a exigência do documento receptor.';
  } else if (tool.categoryId === 'geradores') {
    domainBadge = 'Geração Sintética Local & Conformidade LGPD';
    scenarioIntro = `O ${tool.title} produz saídas estruturadas diretamente na memória do navegador para testes de software (QA), homologação ou emissão de minutas sem exposição em servidores externos.`;
    steps = [
      `Selecione as opções de formatação, máscara ou entropia desejadas no painel do ${tool.title}.`,
      'Acione a geração local instantânea via Web Crypto API / algoritmo oficial (Módulo 11, UUID v4, padrão EMVCo PIX ou minuta contratual conforme o instrumento).',
      'Copie ou imprima a saída já validada para uso exclusivo em homologação técnica ou documentação legítima do seu projeto.'
    ];
    verificationTip = 'Nunca utilize documentos sintéticos (CPF/CNPJ/RG de teste) em transações comerciais reais, cadastros governamentais ou sistemas de produção.';
  } else if (tool.categoryId === 'ferramentas-web') {
    domainBadge = 'Diagnóstico Técnico de Rede, Web & APIs';
    scenarioIntro = `Em fluxos de deploy e auditoria SRE, a ferramenta ${tool.title} (${kwsText}) fornece resposta imediata para validar disponibilidade, configuração de protocolo e estrutura sintática de dados.`;
    steps = [
      `Informe o domínio, endereço IP, porta TCP ou trecho estruturado (JSON/URL/CSS/JS) para análise na ${tool.title}.`,
      'Interprete os cabeçalhos retornados, registros DNS, validade SSL ou alertas de formatação sem alterar o servidor de produção.',
      'Reexecute a verificação após ajustes de DNS/TTL ou correções de sintaxe para confirmar propagação limpa.'
    ];
    verificationTip = 'Ao alterar registros DNS, aguarde o vencimento do TTL configurado antes de concluir testes definitivos de propagação global.';
  } else {
    domainBadge = 'Produtividade Textual & Processamento Local de Mídia';
    scenarioIntro = `Desenvolvido para fluxos editoriais, acadêmicos e administrativos, o utilitário ${tool.title} (${kwsText}) executa todas as transformações localmente no navegador com sigilo completo.`;
    steps = [
      `Carregue seu arquivo local ou cole o bloco de texto de trabalho na área dedicada da ${tool.title}.`,
      'Escolha os parâmetros de saída (qualidade WebP/JPG, resolução em pixels, formato de capitalização, separação silábica ou marcação de voltas no cronômetro).',
      'Confira o resultado final em tela e faça o download ou cópia imediata sem upload para nuvens de terceiros.'
    ];
    verificationTip = 'Antes de publicar documentos ou imagens geradas localmente, faça uma conferência visual rápida de contraste, ortografia e peso em KB.';
  }

  return `
    <article class="space-y-4 pt-2" id="tool-worked-methodology">
      <div class="flex items-center justify-between flex-wrap gap-2">
        <h2 class="text-lg font-black text-slate-900">Como Utilizar ${tool.title} na Prática</h2>
        <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">${domainBadge}</span>
      </div>
      <div class="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 sm:p-5 text-xs space-y-3 text-slate-700 leading-relaxed">
        <p>${scenarioIntro}</p>
        <ol class="list-decimal pl-5 space-y-1.5 font-medium">
          ${steps.map((s, idx) => `<li><strong>Passo ${idx + 1}:</strong> ${s}</li>`).join('')}
        </ol>
        <p class="text-[11px] text-slate-700 bg-white/90 p-3 rounded-lg border border-emerald-200/70">
          <strong>Observação Técnica sobre ${tool.title}:</strong> ${verificationTip}
        </p>
      </div>
    </article>
  `;
}

function getInternalLinkingGridHtml(tool: any): string {
  const categorySiblings = TOOLS.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).slice(0, 6);
  const topGlobalIds = ['juros-compostos', 'cpf', 'rescisao', 'real-para-dolar', 'gerador-whatsapp', 'sorteador'];
  const topGlobals = TOOLS.filter(t => topGlobalIds.includes(t.id) && t.id !== tool.id).slice(0, 4);
  const matchingGuides = EDITORIAL_GUIDES.filter(g => g.categoryId === tool.categoryId);
  const contextualGuides = (matchingGuides.length > 0 ? matchingGuides : EDITORIAL_GUIDES).slice(0, 3);

  return `
    <div class="space-y-6 pt-4">
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center justify-between">
          <span>📚 Guias Práticos Recomendados para Aprofundamento</span>
          <a href="/guias" class="text-emerald-700 hover:underline font-bold text-[11px]">Ver Todos os Guias →</a>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${contextualGuides.map(g => `
            <a href="/guias/${g.slug}" class="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl hover:border-emerald-600 transition block space-y-1">
              <span class="text-[10px] font-bold uppercase text-emerald-700 block">${g.category}</span>
              <span class="font-bold text-xs text-slate-900 block">${g.title}</span>
              <span class="text-[10px] text-slate-600 block line-clamp-2">${g.summary}</span>
            </a>
          `).join('')}
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center justify-between">
          <span>Mais Ferramentas na Categoria</span>
          <a href="/${tool.categoryId}" class="text-emerald-700 hover:underline font-bold text-[11px]">Ver Todas →</a>
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${categorySiblings.map(t => `
            <a href="/${t.categoryId}/${t.slug}" class="p-3 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-emerald-600 hover:bg-emerald-50/20 transition block group shadow-2xs">
              <span class="font-bold text-xs text-slate-900 group-hover:text-emerald-700 block">${t.title}</span>
              <span class="text-[10px] text-slate-500 block line-clamp-2 mt-0.5">${t.shortDescription}</span>
            </a>
          `).join('')}
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          🔥 Utilitários Mais Acessados na Tool Brasil
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          ${topGlobals.map(t => `
            <a href="/${t.categoryId}/${t.slug}" class="p-3 bg-white border border-slate-200 rounded-xl hover:border-emerald-600 transition block group shadow-2xs">
              <span class="font-bold text-xs text-slate-900 group-hover:text-emerald-700 block">${t.title}</span>
              <span class="text-[10px] text-slate-500 block truncate mt-0.5">${t.shortDescription}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function generateToolHtml(template: string, tool: any): string {
  const title = `${tool.title} | Tool Brasil`;
  const desc = tool.shortDescription;
  const canonical = `https://www.toolbrasil.com.br/${tool.categoryId}/${tool.slug}`;

  // Encontra nome da categoria
  const cat = CATEGORIES.find(c => c.id === tool.categoryId);
  const catName = cat ? cat.name : tool.categoryId;

  const faqsHtml = tool.faqs && tool.faqs.length > 0 
    ? `
      <div class="space-y-4 pt-2">
        <h3 class="text-base font-bold text-slate-900">Perguntas Frequentes (FAQ)</h3>
        <dl class="space-y-4 text-xs text-slate-600 leading-relaxed">
          ${tool.faqs.map((faq: any) => `
            <div>
              <dt class="font-bold text-slate-800">${faq.question}</dt>
              <dd class="mt-1">${faq.answer}</dd>
            </div>
          `).join('')}
        </dl>
      </div>
    `
    : '';

  const tipsHtml = tool.tips && tool.tips.length > 0
    ? `
      <div class="space-y-3 pt-2 text-xs text-slate-600 leading-relaxed">
        <h3 class="text-base font-bold text-slate-900">Dicas e Melhores Práticas</h3>
        <ul class="list-disc pl-5 space-y-1.5">
          ${tool.tips.map((tip: string) => `<li>${tip}</li>`).join('')}
        </ul>
      </div>
    `
    : '';

  const content = `
    <div class="space-y-6">
      <!-- Breadcrumbs -->
      <nav class="text-xs text-slate-500 font-semibold space-x-1.5 flex items-center">
        <a href="/" class="hover:underline">Início</a>
        <span>&gt;</span>
        <a href="/${tool.categoryId}" class="hover:underline">${catName}</a>
        <span>&gt;</span>
        <span class="text-slate-800 font-bold">${tool.title}</span>
      </nav>

      <!-- Tool Header -->
      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
        <h1 class="text-2xl font-black tracking-tight text-slate-900">${tool.title}</h1>
        <p class="text-sm text-slate-700 leading-relaxed font-medium">${tool.shortDescription}</p>
      </div>

      <!-- INTERACTIVE AREA PREVIEW (ANTI-THIN CONTENT) -->
      ${getInteractivePreviewCardHtml(tool)}

      <!-- RICH TEXT CONTENT FOR CRAWLERS -->
      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-6">
        
        <div class="space-y-3 leading-relaxed">
          <h2 class="text-lg font-black text-slate-900">Sobre a ferramenta</h2>
          <p class="text-xs text-slate-600 leading-relaxed">${tool.longIntro}</p>
        </div>

        <hr class="border-slate-150" />

        <div class="space-y-3 leading-relaxed">
          <h2 class="text-lg font-black text-slate-900">Como Funciona?</h2>
          <p class="text-xs text-slate-600 leading-relaxed">${tool.howItWorks}</p>
        </div>

        <hr class="border-slate-150" />
        ${getStepByStepExampleHtml(tool)}

        <hr class="border-slate-150" />
        ${getCategoryGuideAndTableHtml(tool.categoryId, tool)}

        ${tipsHtml ? `<hr class="border-slate-150" />${tipsHtml}` : ''}
        ${faqsHtml ? `<hr class="border-slate-150" />${faqsHtml}` : ''}
        
        <hr class="border-slate-150" />
        ${getInternalLinkingGridHtml(tool)}

      </div>
    </div>
  `;

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: catName, path: `/${tool.categoryId}` },
    { name: tool.title, path: `/${tool.categoryId}/${tool.slug}` }
  ];
  const schemaTags = buildSchemaTags(crumbs, tool);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function getProgrammaticEditorialHtml(id: string, page: any): string {
  // 1. SALÁRIO MÍNIMO HISTÓRICO & ANOS
  if (id.startsWith('salario-minimo')) {
    const isYearSpecific = id.match(/salario-minimo-(\d{4})/);
    const targetYear = isYearSpecific ? isYearSpecific[1] : null;

    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Histórico Oficial BACEN & MTE</span>
            <span class="text-xs text-slate-500 font-medium">Atualizado para Vigência 2026</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            Evolução Histórica do Salário Mínimo no Brasil (1994 a 2026)
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            O salário mínimo nacional é a menor remuneração que a legislação brasileira permite aos empregadores pagar aos seus trabalhadores pelo período de um mês de serviço (Art. 7º, IV da Constituição Federal de 1988). Desde a implementação do Plano Real em julho de 1994, o valor do piso nacional tem sido reajustado anualmente para repor as perdas inflacionárias medidas pelo Índice Nacional de Preços ao Consumidor (INPC) e, em diversos períodos, incorporar ganhos reais atrelados ao crescimento do Produto Interno Bruto (PIB).
          </p>

          ${targetYear ? `
            <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1.5">
              <p class="font-bold text-emerald-900 text-sm">📌 Destaque para o Ano de ${targetYear}:</p>
              <p class="text-slate-700 leading-relaxed">
                Neste exercício, o piso salarial nacional foi fixado com base nas diretrizes econômicas vigentes na época. Acompanhe abaixo o comparativo histórico detalhado com o valor atual vigente de <strong>R$ 1.518,00</strong>.
              </p>
            </div>
          ` : ''}

          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2.5 px-3">Ano</th>
                  <th class="py-2.5 px-3">Valor Mensal (R$)</th>
                  <th class="py-2.5 px-3">Valor Diário (R$)</th>
                  <th class="py-2.5 px-3">Valor Hora (R$)</th>
                  <th class="py-2.5 px-3">Norma Legal Regulamentadora</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr class="${targetYear === '2026' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2026</td>
                  <td class="py-2 px-3 font-bold text-emerald-700">R$ 1.518,00</td>
                  <td class="py-2 px-3">R$ 50,60</td>
                  <td class="py-2 px-3">R$ 6,90</td>
                  <td class="py-2 px-3 text-slate-600">Lei Orçamentária Anual / Política de Valorização</td>
                </tr>
                <tr class="${targetYear === '2025' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2025</td>
                  <td class="py-2 px-3 font-bold text-slate-800">R$ 1.412,00</td>
                  <td class="py-2 px-3">R$ 47,07</td>
                  <td class="py-2 px-3">R$ 6,42</td>
                  <td class="py-2 px-3 text-slate-600">Decreto nº 11.864/2023</td>
                </tr>
                <tr class="${targetYear === '2024' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2024</td>
                  <td class="py-2 px-3 font-bold text-slate-800">R$ 1.412,00</td>
                  <td class="py-2 px-3">R$ 47,07</td>
                  <td class="py-2 px-3">R$ 6,42</td>
                  <td class="py-2 px-3 text-slate-600">Decreto nº 11.864/2023</td>
                </tr>
                <tr class="${targetYear === '2023' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2023</td>
                  <td class="py-2 px-3">R$ 1.320,00</td>
                  <td class="py-2 px-3">R$ 44,00</td>
                  <td class="py-2 px-3">R$ 6,00</td>
                  <td class="py-2 px-3 text-slate-600">Medida Provisória nº 1.172/2023 (a partir de maio)</td>
                </tr>
                <tr class="${targetYear === '2022' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2022</td>
                  <td class="py-2 px-3">R$ 1.212,00</td>
                  <td class="py-2 px-3">R$ 40,40</td>
                  <td class="py-2 px-3">R$ 5,51</td>
                  <td class="py-2 px-3 text-slate-600">Medida Provisória nº 1.091/2021</td>
                </tr>
                <tr class="${targetYear === '2021' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2021</td>
                  <td class="py-2 px-3">R$ 1.100,00</td>
                  <td class="py-2 px-3">R$ 36,67</td>
                  <td class="py-2 px-3">R$ 5,00</td>
                  <td class="py-2 px-3 text-slate-600">Medida Provisória nº 1.021/2020</td>
                </tr>
                <tr class="${targetYear === '2020' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2020</td>
                  <td class="py-2 px-3">R$ 1.045,00</td>
                  <td class="py-2 px-3">R$ 34,83</td>
                  <td class="py-2 px-3">R$ 4,75</td>
                  <td class="py-2 px-3 text-slate-600">Medida Provisória nº 919/2020</td>
                </tr>
                <tr class="${targetYear === '2015' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2015</td>
                  <td class="py-2 px-3">R$ 788,00</td>
                  <td class="py-2 px-3">R$ 26,27</td>
                  <td class="py-2 px-3">R$ 3,58</td>
                  <td class="py-2 px-3 text-slate-600">Decreto nº 8.381/2014</td>
                </tr>
                <tr class="${targetYear === '2010' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2010</td>
                  <td class="py-2 px-3">R$ 510,00</td>
                  <td class="py-2 px-3">R$ 17,00</td>
                  <td class="py-2 px-3">R$ 2,32</td>
                  <td class="py-2 px-3 text-slate-600">Medida Provisória nº 474/2009</td>
                </tr>
                <tr class="${targetYear === '2005' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2005</td>
                  <td class="py-2 px-3">R$ 300,00</td>
                  <td class="py-2 px-3">R$ 10,00</td>
                  <td class="py-2 px-3">R$ 1,36</td>
                  <td class="py-2 px-3 text-slate-600">Medida Provisória nº 248/2005</td>
                </tr>
                <tr class="${targetYear === '2000' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">2000</td>
                  <td class="py-2 px-3">R$ 151,00</td>
                  <td class="py-2 px-3">R$ 5,03</td>
                  <td class="py-2 px-3">R$ 0,69</td>
                  <td class="py-2 px-3 text-slate-600">Medida Provisória nº 2.019/2000</td>
                </tr>
                <tr class="${targetYear === '1995' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">1995</td>
                  <td class="py-2 px-3">R$ 100,00</td>
                  <td class="py-2 px-3">R$ 3,33</td>
                  <td class="py-2 px-3">R$ 0,45</td>
                  <td class="py-2 px-3 text-slate-600">Medida Provisória nº 1.053/1995</td>
                </tr>
                <tr class="${targetYear === '1994' ? 'bg-emerald-50 font-bold' : ''}">
                  <td class="py-2 px-3 font-bold text-slate-900">1994</td>
                  <td class="py-2 px-3">R$ 64,79</td>
                  <td class="py-2 px-3">R$ 2,16</td>
                  <td class="py-2 px-3">R$ 0,29</td>
                  <td class="py-2 px-3 text-slate-600">Início do Plano Real (Conversão da URV)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-900">Impactos do Salário Mínimo na Economia e Direitos Trabalhistas</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 class="font-bold text-slate-800">Benefícios Previdenciários (INSS)</h4>
              <p>Nenhum benefício do INSS que substitua o rendimento do trabalho (como aposentadoria por idade, tempo de contribuição ou auxílio-doença) pode ter valor inferior ao salário mínimo nacional vigente.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 class="font-bold text-slate-800">Abono Salarial PIS/PASEP</h4>
              <p>O valor máximo do abono salarial anual é equivalente a exatamente um salário mínimo nacional, proporcional ao número de meses trabalhados com carteira assinada no ano-base.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 class="font-bold text-slate-800">Seguro-Desemprego</h4>
              <p>O piso do seguro-desemprego pago pelo Ministério do Trabalho e Emprego é vinculado diretamente ao salário mínimo, garantindo suporte financeiro digno na rescisão contratual involuntária.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h4 class="font-bold text-slate-800">Juizados Especiais (Pequenas Causas)</h4>
              <p>O teto de causas nos Juizados Especiais Cíveis (JEC) sem exigência de advogado é de até 20 salários mínimos, e com advogado atinge o limite máximo legal de até 40 salários mínimos.</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900">Como Funciona a Fórmula de Reajuste e o Impacto Fiscal</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            A política de valorização real do salário mínimo brasileiro combina a correção inflacionária acumulada pelo Índice Nacional de Preços ao Consumidor (INPC) apurado pelo IBGE nos 12 meses até novembro do exercício anterior com um componente de ganho real vinculado ao crescimento do Produto Interno Bruto (PIB). Além de balizar o piso remuneratório nacional previsto no artigo 7º, inciso IV, da Constituição Federal, o valor atualizado impacta diretamente o reajuste da primeira faixa contributiva do INSS, benefícios previdenciários urbanos e rurais de 1 salário mínimo, pensões alimentícias fixadas em frações de piso nacional e bases de contribuição do MEI (5% do salário mínimo).
          </p>
          <h3 class="text-sm font-bold text-slate-900 pt-1">Ferramentas de Cálculo Relacionadas</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/calculadoras/calculadora-de-salario-liquido" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Salário Líquido →</a>
            <a href="/calculadoras/calculadora-de-rescisao-trabalhista" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Rescisão CLT →</a>
            <a href="/calculadoras/calculadora-desconto-inss" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora INSS 2026 →</a>
            <a href="/desenvolvedores" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">API de Salário Mínimo JSON →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 2. DDDs DO BRASIL & POR ESTADO
  if (id.startsWith('ddd-')) {
    const isUf = id.match(/ddd-([a-z]{2})/);
    const ufParam = isUf ? isUf[1].toUpperCase() : null;

    const ufList = [
      { uf: "SP", estado: "São Paulo", codigos: [11, 12, 13, 14, 15, 16, 17, 18, 19], capital: "São Paulo (11)", regiao: "Sudeste" },
      { uf: "RJ", estado: "Rio de Janeiro", codigos: [21, 22, 24], capital: "Rio de Janeiro (21)", regiao: "Sudeste" },
      { uf: "ES", estado: "Espírito Santo", codigos: [27, 28], capital: "Vitória (27)", regiao: "Sudeste" },
      { uf: "MG", estado: "Minas Gerais", codigos: [31, 32, 33, 34, 35, 37, 38], capital: "Belo Horizonte (31)", regiao: "Sudeste" },
      { uf: "PR", estado: "Paraná", codigos: [41, 42, 43, 44, 45, 46], capital: "Curitiba (41)", regiao: "Sul" },
      { uf: "SC", estado: "Santa Catarina", codigos: [47, 48, 49], capital: "Florianópolis (48)", regiao: "Sul" },
      { uf: "RS", estado: "Rio Grande do Sul", codigos: [51, 53, 54, 55], capital: "Porto Alegre (51)", regiao: "Sul" },
      { uf: "DF", estado: "Distrito Federal", codigos: [61], capital: "Brasília (61)", regiao: "Centro-Oeste" },
      { uf: "GO", estado: "Goiás", codigos: [62, 64], capital: "Goiânia (62)", regiao: "Centro-Oeste" },
      { uf: "MT", estado: "Mato Grosso", codigos: [65, 66], capital: "Cuiabá (65)", regiao: "Centro-Oeste" },
      { uf: "MS", estado: "Mato Grosso do Sul", codigos: [67], capital: "Campo Grande (67)", regiao: "Centro-Oeste" },
      { uf: "TO", estado: "Tocantins", codigos: [63], capital: "Palmas (63)", regiao: "Norte" },
      { uf: "PA", estado: "Pará", codigos: [91, 93, 94], capital: "Belém (91)", regiao: "Norte" },
      { uf: "AM", estado: "Amazonas", codigos: [92, 97], capital: "Manaus (92)", regiao: "Norte" },
      { uf: "RO", estado: "Rondônia", codigos: [69], capital: "Porto Velho (69)", regiao: "Norte" },
      { uf: "AC", estado: "Acre", codigos: [68], capital: "Rio Branco (68)", regiao: "Norte" },
      { uf: "AP", estado: "Amapá", codigos: [96], capital: "Macapá (96)", regiao: "Norte" },
      { uf: "RR", estado: "Roraima", codigos: [95], capital: "Boa Vista (95)", regiao: "Norte" },
      { uf: "BA", estado: "Bahia", codigos: [71, 73, 74, 75, 77], capital: "Salvador (71)", regiao: "Nordeste" },
      { uf: "PE", estado: "Pernambuco", codigos: [81, 87], capital: "Recife (81)", regiao: "Nordeste" },
      { uf: "CE", estado: "Ceará", codigos: [85, 88], capital: "Fortaleza (85)", regiao: "Nordeste" },
      { uf: "MA", estado: "Maranhão", codigos: [98, 99], capital: "São Luís (98)", regiao: "Nordeste" },
      { uf: "PB", estado: "Paraíba", codigos: [83], capital: "João Pessoa (83)", regiao: "Nordeste" },
      { uf: "RN", estado: "Rio Grande do Norte", codigos: [84], capital: "Natal (84)", regiao: "Nordeste" },
      { uf: "AL", estado: "Alagoas", codigos: [82], capital: "Maceió (82)", regiao: "Nordeste" },
      { uf: "PI", estado: "Piauí", codigos: [86, 89], capital: "Teresina (86)", regiao: "Nordeste" },
      { uf: "SE", estado: "Sergipe", codigos: [79], capital: "Aracaju (79)", regiao: "Nordeste" }
    ];

    const currentUf = ufParam ? ufList.find(u => u.uf === ufParam) : null;

    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">Telecomunicações & Anatel</span>
            <span class="text-xs text-slate-500 font-medium">Plano de Numeração Telefônica Oficial</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            ${currentUf ? `Códigos DDD do Estado de ${currentUf.estado} (${currentUf.uf})` : 'Tabela Completa de Códigos DDD do Brasil'}
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            O código de Discagem Direta a Distância (DDD) é um sistema numérico estabelecido pela Agência Nacional de Telecomunicações (Anatel) para identificar áreas geográficas de telecomunicação no território brasileiro. Composto por 2 dígitos, o DDD é essencial para realizar chamadas interurbanas, configurar aparelhos celulares e identificar a procedência geográfica de chamadas e mensagens SMS.
          </p>

          ${currentUf ? `
            <div class="p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs space-y-2">
              <p class="font-bold text-blue-900 text-sm">📍 Cobertura Regional de ${currentUf.estado}:</p>
              <p class="text-slate-700">
                O estado de <strong>${currentUf.estado}</strong> possui os seguintes prefixos ativos: <strong>${currentUf.codigos.map(c => `(${c})`).join(', ')}</strong>. A capital ${currentUf.capital} concentra a maior densidade de linhas telefônicas da região.
              </p>
            </div>
          ` : ''}

          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2.5 px-3">Estado / UF</th>
                  <th class="py-2.5 px-3">Região</th>
                  <th class="py-2.5 px-3">Códigos DDD Ativos</th>
                  <th class="py-2.5 px-3">Capital & DDD Principal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${ufList.map(u => `
                  <tr class="${ufParam === u.uf ? 'bg-blue-50 font-bold' : ''}">
                    <td class="py-2 px-3 font-bold text-slate-900">${u.estado} (${u.uf})</td>
                    <td class="py-2 px-3 text-slate-600">${u.regiao}</td>
                    <td class="py-2 px-3 font-mono font-bold text-emerald-700">${u.codigos.join(', ')}</td>
                    <td class="py-2 px-3">${u.capital}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-900">Como Discar para Outro DDD e Portabilidade Numérica (Anatel)</h3>
          <div class="p-4 bg-slate-900 text-emerald-300 rounded-xl font-mono text-xs space-y-1">
            <p class="text-slate-400">// Formato de ligação nacional com Código de Seleção de Prestadora (CSP):</p>
            <p class="text-sm font-bold text-white">0 + [Código da Operadora] + [DDD de Destino] + [Número do Telefone]</p>
            <p class="text-slate-400 pt-1">// Exemplo para ligar para São Paulo (11) via operadora 15:</p>
            <p class="text-emerald-400 font-bold">0 15 11 99999-9999</p>
          </div>
          <div class="text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>
              Na ligação internacional para números brasileiros (DDI), utiliza-se <code>+55</code> seguido imediatamente pelos dois dígitos do DDD e pelo número local, omitindo o zero inicial e o CSP da operadora. Desde a implementação da portabilidade numérica pela Anatel, um prefixo como 99xxx ou 98xxx não identifica mais a operadora original — somente o código DDD de dois dígitos permanece estritamente ligado à área geográfica de registro da linha fixa ou móvel.
            </p>
            <p>
              <strong>Prevenção contra fraudes telefônicas e golpes:</strong> Desconfie de solicitações urgentes de transferências PIX enviadas por números desconhecidos com DDD divergente da região do suposto contato, e nunca repasse códigos de verificação SMS ou senhas bancárias por telefone.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Ferramentas e APIs Relacionadas</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/programatico/cep-brasil" class="px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-lg font-bold border border-blue-200">Consulta de CEP Correios →</a>
            <a href="/ferramentas-web/qual-o-meu-ip" class="px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded-lg font-bold border border-blue-200">Descobrir Meu IP Público →</a>
            <a href="/geradores/gerador-link-whatsapp" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Gerador de Link WhatsApp com DDD →</a>
            <a href="/desenvolvedores" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">API de DDDs JSON →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 3. BANCOS COMERCIAIS & CÓDIGOS ISPB
  if (id === 'bancos-brasil') {
    const bancos = [
      { compe: "001", ispb: "00000000", nome: "Banco do Brasil S.A.", tipo: "Banco Múltiplo Público" },
      { compe: "237", ispb: "60746948", nome: "Banco Bradesco S.A.", tipo: "Banco Múltiplo Privado" },
      { compe: "341", ispb: "60701190", nome: "Itaú Unibanco S.A.", tipo: "Banco Múltiplo Privado" },
      { compe: "104", ispb: "00360305", nome: "Caixa Econômica Federal", tipo: "Empresa Pública" },
      { compe: "033", ispb: "90400888", nome: "Banco Santander (Brasil) S.A.", tipo: "Banco Múltiplo Privado" },
      { compe: "260", ispb: "18236120", nome: "Nu Pagamentos S.A. (Nubank)", tipo: "Instituição de Pagamento" },
      { compe: "077", ispb: "00416968", nome: "Banco Inter S.A.", tipo: "Banco Digital Múltiplo" },
      { compe: "290", ispb: "10573521", nome: "PagBank PagSeguro S.A.", tipo: "Instituição de Pagamento" },
      { compe: "380", ispb: "16501555", nome: "PicPay Instituição de Pagamento", tipo: "Instituição de Pagamento" },
      { compe: "336", ispb: "07450604", nome: "Banco C6 S.A.", tipo: "Banco Múltiplo" },
      { compe: "422", ispb: "58160789", nome: "Banco Safra S.A.", tipo: "Banco Múltiplo" },
      { compe: "756", ispb: "02038232", nome: "Banco Cooperativo Sicoob S.A.", tipo: "Banco Cooperativo" },
      { compe: "748", ispb: "01181521", nome: "Banco Cooperativo Sicredi S.A.", tipo: "Banco Cooperativo" },
      { compe: "208", ispb: "33479023", nome: "Banco BTG Pactual S.A.", tipo: "Banco de Investimento / Múltiplo" }
    ];

    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Sistema Financeiro Nacional (SFN)</span>
            <span class="text-xs text-slate-500 font-medium">Banco Central do Brasil & FEBRABAN</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            Códigos de Compensação (COMPE) e Números ISPB dos Bancos Brasileiros
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            Para realizar transferências via TED, preencher guias de débito automático ou cadastrar dados bancários em órgãos públicos, é mandatório informar o <strong>Código de Compensação (COMPE de 3 dígitos)</strong> ou o <strong>Identificador do Sistema de Pagamentos Brasileiro (ISPB de 8 dígitos)</strong> regulamentado pelo Banco Central do Brasil.
          </p>

          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2.5 px-3">Código COMPE</th>
                  <th class="py-2.5 px-3">Código ISPB</th>
                  <th class="py-2.5 px-3">Razão Social / Nome do Banco</th>
                  <th class="py-2.5 px-3">Classificação Regulatória</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${bancos.map(b => `
                  <tr>
                    <td class="py-2 px-3 font-mono font-bold text-emerald-700">${b.compe}</td>
                    <td class="py-2 px-3 font-mono font-bold text-slate-800">${b.ispb}</td>
                    <td class="py-2 px-3 font-bold text-slate-900">${b.nome}</td>
                    <td class="py-2 px-3 text-slate-600">${b.tipo}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h3 class="text-sm font-bold text-slate-900">Diferença entre COMPE, ISPB e PIX no Sistema de Pagamentos Brasileiro</h3>
          <dl class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div>
              <dt class="font-bold text-slate-800">COMPE (3 dígitos):</dt>
              <dd class="mt-0.5">Utilizado tradicionalmente para compensação de cheques, cadastro de folhas salariais, restituições tributárias e transferências interbancárias via TED (Transferência Eletrônica Disponível). Administrado historicamente pela FEBRABAN e pelo Banco do Brasil como executante da compensação.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">ISPB (8 dígitos):</dt>
              <dd class="mt-0.5">Identificador do Sistema de Pagamentos Brasileiro atribuído pelo Banco Central a instituições participantes diretas ou indiretas do Sistema de Transferência de Reservas (STR) e do Sistema de Pagamentos Instantâneos (SPI/PIX).</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Extinção do DOC e Consolidação de PIX + TED:</dt>
              <dd class="mt-0.5">A Federação Brasileira de Bancos (FEBRABAN) encerrou definitivamente as operações via DOC (Documento de Ordem de Crédito) em fevereiro de 2024. Hoje, pessoas físicas utilizam PIX gratuitamente 24 horas por dia (inclusive feriados e finais de semana) ou TED com código COMPE em dias úteis até as 17h para grandes montantes e liquidações corporativas.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Dígito Verificador "X" no Banco do Brasil e Operações Caixa:</dt>
              <dd class="mt-0.5">Em sistemas eletrônicos que aceitam somente caracteres numéricos no campo agência ou conta (por exemplo, agências e contas antigas do Banco do Brasil 001 com dígito X), substitua o X por 0. Na Caixa Econômica Federal (104), contas antigas trazem códigos de operação (001 conta corrente PF, 013 poupança, 003 conta jurídica e 1288 para contas digitais Caixa Tem).</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Contas Digitais e Instituições de Pagamento (Nubank 260, Inter 077, C6 336, PagBank 290):</dt>
              <dd class="mt-0.5">Bancos e contas de pagamento digitais utilizam agência padrão <code>0001</code> e permitem liquidações tanto via código COMPE tradicional (TED) quanto pelo código ISPB de 8 dígitos em transferências PIX e Open Finance. Em formulários do eSocial, declarações de Imposto de Renda e pagamentos judiciais, confira sempre se o campo exige os 3 dígitos COMPE com zero à esquerda.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Horário Limite de TED vs. PIX Instantâneo:</dt>
              <dd class="mt-0.5">Enquanto transferências PIX funcionam 24 horas por dia com liquidação em segundos sem tarifas para pessoas físicas, ordens TED enviadas após as 17h em dias úteis ou em feriados bancários nacionais são agendadas automaticamente para compensação na manhã do próximo dia útil bancário.</dd>
            </div>
          </dl>
          <div class="flex flex-wrap gap-2 text-xs pt-2">
            <a href="/geradores/gerador-de-pix-copia-e-cola-e-qr-code" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Gerador de QR Code PIX →</a>
            <a href="/calculadoras/calculadora-de-juros-compostos" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Juros Compostos →</a>
            <a href="/desenvolvedores" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">API de Bancos JSON →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 4. FERIADOS NACIONAIS 2026
  if (id === 'feriados-nacionais') {
    const feriados = [
      { data: "01/01/2026", dia: "Quinta-feira", nome: "Confraternização Universal (Ano Novo)", tipo: "Feriado Nacional (Lei nº 10.607/2002)" },
      { data: "17/02/2026", dia: "Terça-feira", nome: "Carnaval", tipo: "Ponto Facultativo Federal" },
      { data: "03/04/2026", dia: "Sexta-feira", nome: "Sexta-feira Santa (Paixão de Cristo)", tipo: "Feriado Nacional (Lei nº 9.093/1995)" },
      { data: "21/04/2026", dia: "Terça-feira", nome: "Tiradentes", tipo: "Feriado Nacional (Lei nº 10.607/2002)" },
      { data: "01/05/2026", dia: "Sexta-feira", nome: "Dia Mundial do Trabalho", tipo: "Feriado Nacional (Lei nº 10.607/2002)" },
      { data: "04/06/2026", dia: "Quinta-feira", nome: "Corpus Christi", tipo: "Ponto Facultativo Federal" },
      { data: "07/09/2026", dia: "Segunda-feira", nome: "Independência do Brasil", tipo: "Feriado Nacional (Lei nº 10.607/2002)" },
      { data: "12/10/2026", dia: "Segunda-feira", nome: "Nossa Senhora Aparecida", tipo: "Feriado Nacional (Lei nº 6.802/1980)" },
      { data: "02/11/2026", dia: "Segunda-feira", nome: "Finados", tipo: "Feriado Nacional (Lei nº 10.607/2002)" },
      { data: "15/11/2026", dia: "Domingo", nome: "Proclamação da República", tipo: "Feriado Nacional (Lei nº 10.607/2002)" },
      { data: "20/11/2026", dia: "Sexta-feira", nome: "Dia Nacional de Zumbi e da Consciência Negra", tipo: "Feriado Nacional (Lei nº 14.759/2023)" },
      { data: "25/12/2026", dia: "Sexta-feira", nome: "Natal", tipo: "Feriado Nacional (Lei nº 10.607/2002)" }
    ];

    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Calendário Oficial Federal 2026</span>
            <span class="text-xs text-slate-500 font-medium">Portaria MGI / Diário Oficial da União</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            Calendário Oficial de Feriados Nacionais e Pontos Facultativos do Brasil (2026)
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            Consulte a programação completa das datas de folga oficiais e pontos facultativos para organizar viagens, escalas de trabalho e compromissos fiscais. Conforme a legislação trabalhista brasileira (CLT), o trabalho em feriados nacionais garante pagamento com adicional de 100% ou folga compensatória equivalente.
          </p>

          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2.5 px-3">Data</th>
                  <th class="py-2.5 px-3">Dia da Semana</th>
                  <th class="py-2.5 px-3">Celebração Oficial</th>
                  <th class="py-2.5 px-3">Natureza Jurídica</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${feriados.map(f => `
                  <tr>
                    <td class="py-2 px-3 font-mono font-bold text-emerald-700">${f.data}</td>
                    <td class="py-2 px-3 font-bold text-slate-800">${f.dia}</td>
                    <td class="py-2 px-3 font-bold text-slate-900">${f.nome}</td>
                    <td class="py-2 px-3 text-slate-600">${f.tipo}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h3 class="text-base font-bold text-slate-900">Regras Trabalhistas para Trabalho em Feriados (CLT) e Diferença para Pontos Facultativos</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            O artigo 70 da Consolidação das Leis do Trabalho (CLT) veda o trabalho em feriados nacionais e religiosos civis, ressalvadas as atividades essenciais de saúde, transporte, segurança, telecomunicações e setores do comércio devidamente autorizados por convenção coletiva ou legislação municipal vigente. Quando o colaborador labora regularmente em um feriado nacional ou municipal sem receber folga compensatória equivalente na mesma semana ou dentro do acordo de banco de horas válido, a empresa é obrigada a remunerar integralmente as horas trabalhadas em dobro — equivalente ao adicional de 100% sobre a hora normal, gerando ainda reflexo proporcional no Descanso Semanal Remunerado (DSR), férias e 13º salário.
          </p>
          <p class="text-xs text-slate-600 leading-relaxed">
            Já os <strong>pontos facultativos federais</strong> (como os dias de Carnaval em fevereiro e o feriado religioso de Corpus Christi em junho em localidades sem lei municipal específica declarando feriado local) suspendem o expediente apenas nos órgãos públicos e repartições da administração direta ou autárquica, não obrigando empresas privadas à dispensa nem ao pagamento em dobro — salvo previsão expressa em Convenção Coletiva de Trabalho (CCT) ou costume consolidado na cidade. Além dos feriados federais acima, cada estado e município brasileiro celebra suas próprias datas cívicas (como a data magna estadual e o aniversário do município, limitado pela Lei nº 9.093/1995 a no máximo quatro feriados religiosos municipais).
          </p>
          <p class="text-xs text-slate-600 leading-relaxed">
            Em relação a compensações e emendas de feriados que caem na terça ou quinta-feira (como Tiradentes em 21/04/2026 e Corpus Christi em 04/06/2026), empregadores podem pactuar acordo individual escrito de compensação de jornada ou banco de horas dentro do semestre conforme artigo 59 da CLT, trocando o dia-ponte por minutos diários adicionais ou sábados alternados sem acréscimo salarial. Já nos feriados em segundas-feiras e sextas-feiras de 2026 (Paixão de Cristo, Dia do Trabalho, Independência, Nossa Senhora Aparecida, Finados, Consciência Negra e Natal), empresas de atendimento contínuo precisam revisar previamente escalas de revezamento e reflexos de Descanso Semanal Remunerado (DSR).
          </p>
          <div class="flex flex-wrap gap-2 text-xs pt-1">
            <a href="/calculadoras/calculadora-de-hora-extra" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calcular Hora Extra a 100% →</a>
            <a href="/calculadoras/calculadora-de-dsr" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calcular Reflexo do DSR →</a>
            <a href="/calculadoras/calculadora-dias-entre-datas" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Dias entre Datas →</a>
            <a href="/desenvolvedores" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">API de Feriados JSON →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 5. TAXA SELIC HISTÓRICA
  if (id.startsWith('selic-')) {
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Política Monetária BACEN</span>
            <span class="text-xs text-slate-500 font-medium">Comitê de Política Monetária (COPOM)</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            Taxa SELIC: Histórico (1996–2026), Decisões do COPOM e Impacto nos Investimentos
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            A Taxa SELIC (Sistema Especial de Liquidação e Custódia) é a taxa básica de juros da economia brasileira e referência central para todas as operações financeiras do país. Definida a cada 45 dias pelo Comitê de Política Monetária (COPOM) do Banco Central do Brasil em reuniões ordinárias de dois dias, a meta da Selic é o instrumento primário de política monetária para ancorar expectativas e manter a inflação medida pelo IPCA dentro das bandas definidas pelo Conselho Monetário Nacional (CMN).
          </p>
          <p class="text-xs text-slate-600 leading-relaxed">
            Diferencia-se tecnicamente a <strong>Selic Meta</strong> (anunciada ao final de cada reunião do COPOM) da <strong>Selic Over</strong> (taxa efetivamente praticada nas operações diárias de financiamento de títulos públicos federais entre instituições financeiras, tradicionalmente 0,10 ponto percentual abaixo da Meta). Desde sua criação em meados da década de 1990 após o Plano Real, a Selic já percorreu picos superiores a 40% ao ano em períodos de choques externos, atingiu a mínima histórica de 2,00% ao ano durante a pandemia em 2020–2021 e voltou ao patamar de dois dígitos para conter pressões inflacionárias posteriores.
          </p>

          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2 px-3">Ciclo / Ano de Referência</th>
                  <th class="py-2 px-3">Faixa Histórica da Selic Meta (% a.a.)</th>
                  <th class="py-2 px-3">Contexto Econômico Brasileiro</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr><td class="py-2 px-3 font-bold">1999 – 2005 (Metas de Inflação)</td><td class="py-2 px-3 font-mono font-bold text-emerald-700">15,25% a 45,00% a.a.</td><td class="py-2 px-3">Consolidação do regime de metas de inflação e controle cambial flutuante.</td></tr>
                <tr><td class="py-2 px-3 font-bold">2013 – 2016 (Aperto Monetário)</td><td class="py-2 px-3 font-mono font-bold text-emerald-700">7,25% a 14,25% a.a.</td><td class="py-2 px-3">Ciclo de alta prolongada para reancorar expectativas do IPCA pós-2014.</td></tr>
                <tr><td class="py-2 px-3 font-bold">2020 – 2021 (Mínima Histórica)</td><td class="py-2 px-3 font-mono font-bold text-emerald-700">2,00% a 9,25% a.a.</td><td class="py-2 px-3">Estímulo monetário pandêmico seguido de rápida reversão contracionista em 2021.</td></tr>
                <tr><td class="py-2 px-3 font-bold">2022 – 2026 (Juros Reais Elevados)</td><td class="py-2 px-3 font-mono font-bold text-emerald-700">10,50% a 15,00% a.a.</td><td class="py-2 px-3">Manutenção de juros restritivos frente ao cenário fiscal e inflação de serviços.</td></tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span class="text-[10px] font-bold uppercase text-slate-500">Rendimento da Poupança</span>
              <p class="font-bold text-slate-900 text-sm">Regra dos 8,5% (Lei 12.703)</p>
              <p class="text-xs text-slate-600 leading-relaxed">Quando a Selic está acima de 8,5% a.a., a poupança rende fixos 0,5% ao mês mais TR (cerca de 6,17% a.a. + TR). Abaixo ou igual a 8,5%, o rendimento cai para 70% da Selic mais TR.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span class="text-[10px] font-bold uppercase text-slate-500">Renda Fixa & CDI</span>
              <p class="font-bold text-slate-900 text-sm">CDBs, LCI/LCA e Tesouro Selic</p>
              <p class="text-xs text-slate-600 leading-relaxed">O Certificado de Depósito Interbancário (CDI) acompanha a Selic efetiva (Over) dia a dia, tornando CDBs 100% do CDI e Tesouro Selic referências diretas de reserva de liquidez.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span class="text-[10px] font-bold uppercase text-slate-500">Crédito e Financiamento</span>
              <p class="font-bold text-slate-900 text-sm">Custo de Capital e Parcelas</p>
              <p class="text-xs text-slate-600 leading-relaxed">Alta na Selic encarece financiamentos de imóveis, empréstimos consignados, CDC de automóveis e linhas de capital de giro empresarial em todo o sistema bancário.</p>
            </div>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed pt-2">
            <strong>Como calcular o ganho real acima da inflação (Equação de Fisher):</strong> Para descobrir quanto uma aplicação atrelada à taxa Selic ou ao CDI realmente aumentou o poder de compra do investidor, não basta subtrair o IPCA da taxa bruta: primeiro apure o retorno líquido após o Imposto de Renda regressivo (22,5% a 15%), e então aplique a razão <code>(1 + rendimento_líquido) / (1 + IPCA) − 1</code>. Em ciclos de Selic elevada com inflação controlada, títulos pós-fixados entregam juro real expressivo com volatilidade praticamente nula para reservas de curto e médio prazo.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Simuladores e Guias Financeiros Relacionados</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/calculadoras/calculadora-de-juros-compostos" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Juros Compostos →</a>
            <a href="/calculadoras/calculadora-desconto-a-vista-vs-parcelado" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">À Vista ou Parcelado com CDI →</a>
            <a href="/calculadoras/calculadora-de-imposto-de-renda" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Imposto de Renda →</a>
            <a href="/guias/juros-compostos-tesouro-selic-cdb-renda-fixa-2026" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">Guia de Renda Fixa & Selic →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 6. CALENDÁRIO INSS 2026
  if (id === 'calendario-inss') {
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Previdência Social Oficial</span>
            <span class="text-xs text-slate-500 font-medium">Ministério da Previdência Social & INSS</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            Tabela de Pagamentos do INSS 2026: Datas de Depósito para Aposentados e Pensionistas
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            O Instituto Nacional do Seguro Social (INSS) realiza os depósitos mensais de aposentadorias, pensões por morte e benefícios assistenciais (como BPC/LOAS) seguindo uma escala escalonada com base no <strong>último número do cartão do benefício</strong> (o dígito que precede o traço verificador).
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h3 class="font-bold text-slate-900 text-sm">Grupo 1: Benefícios de até 1 Salário Mínimo</h3>
              <p class="text-slate-600">
                Os depósitos são liberados diariamente ao longo dos últimos 5 dias úteis do mês de competência e dos primeiros 5 dias úteis do mês subsequente:
              </p>
              <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li>Final 1: 1º dia útil da escala</li>
                <li>Final 2: 2º dia útil</li>
                <li>Final 3: 3º dia útil</li>
                <li>Final 4: 4º dia útil</li>
                <li>Final 5: 5º dia útil</li>
                <li>Finais 6 a 0: Primeiros 5 dias úteis do mês seguinte</li>
              </ul>
            </div>

            <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h3 class="font-bold text-slate-900 text-sm">Grupo 2: Benefícios Acima de 1 Salário Mínimo</h3>
              <p class="text-slate-600">
                Para quem recebe valores superiores ao piso nacional, os depósitos são creditados agrupados de dois em dois números finais nos primeiros 5 dias úteis do mês seguinte:
              </p>
              <ul class="list-disc pl-5 space-y-1 text-slate-700">
                <li>Finais 1 e 6: 1º dia útil do mês seguinte</li>
                <li>Finais 2 e 7: 2º dia útil do mês seguinte</li>
                <li>Finais 3 e 8: 3º dia útil do mês seguinte</li>
                <li>Finais 4 e 9: 4º dia útil do mês seguinte</li>
                <li>Finais 5 e 0: 5º dia útil do mês seguinte</li>
              </ul>
            </div>
          </div>

          <div class="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2 text-xs text-slate-700 leading-relaxed">
            <h3 class="font-bold text-slate-900 text-sm">Regra Oficial de Ordem por Dígito Final e Antecipação do 13º do INSS</h3>
            <p>
              Para descobrir em qual dia o depósito cai na conta corrente ou poupança social, observe exclusivamente o <strong>último algarismo antes do traço</strong> no Número do Benefício (NB). Por exemplo, se o número do cartão for <code>123.456.789-0</code>, o dígito verificador após o traço é ignorado e o número considerado na tabela é o <strong>9</strong>. Aposentados, pensionistas e segurados que recebem auxílio por incapacidade temporária ou BPC/LOAS seguem o mesmo calendário, sendo que eventual feriado municipal ou estadual não altera a programação nacional — exceto feriados bancários nacionais que transferem o pagamento para o dia útil imediatamente posterior.
            </p>
            <p>
              Além dos 12 depósitos mensais regulares, segurados elegíveis (aposentadorias, pensão por morte, auxílio-doença e auxílio-reclusão; não aplicável ao BPC/LOAS por ser benefício assistencial) recebem anualmente o abono anual (13º salário do INSS) dividido em duas parcelas seguindo a mesma ordem do dígito final do benefício.
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Canais de Consulta do Segurado e Simuladores Previdenciários</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Para consultar extratos de pagamento, carta de concessão, histórico contributivo CNIS e informe de rendimentos para o Imposto de Renda, utilize o aplicativo oficial <strong>Meu INSS</strong> (disponível para Android e iOS), o portal web <code>meu.inss.gov.br</code> com conta Gov.br ou ligue gratuitamente para a Central Telefônica <strong>135</strong> (atendimento humano de segunda a sábado, das 7h às 22h, horário de Brasília).
          </p>
          <div class="flex flex-wrap gap-2 text-xs pt-1">
            <a href="/calculadoras/calculadora-desconto-inss" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Desconto INSS 2026 →</a>
            <a href="/calculadoras/calculadora-de-aposentadoria-inss" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Simulador de Aposentadoria INSS →</a>
            <a href="/calculadoras/calculadora-de-salario-liquido" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Salário Líquido →</a>
            <a href="/guias/tabela-inss-e-irrf-2026-guia-completo" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">Guia Tabela INSS & IRRF 2026 →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 7. CÓDIGOS IBGE DE MUNICÍPIOS
  if (id.startsWith('ibge-') || id === 'codigos-ibge') {
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Geografia & Estatística Oficial</span>
            <span class="text-xs text-slate-500 font-medium">Instituto Brasileiro de Geografia e Estatística (IBGE)</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            Estrutura dos Códigos IBGE de Municípios e Estados Brasileiros
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            O Código de Município do IBGE é um identificador numérico oficial de 7 dígitos atribuído a cada um dos 5.570 municípios brasileiros e ao Distrito Federal. É o padrão nacional obrigatório exigido pela Secretaria Especial da Receita Federal do Brasil (RFB) e pelas Secretarias Estaduais da Fazenda (SEFAZ) para emissão de Notas Fiscais Eletrônicas (NF-e e NFC-e, tag XML <code>&lt;cMun&gt;</code>), Conhecimentos de Transporte Eletrônicos (CT-e), Notas Fiscais de Serviço (NFS-e nacional) e escrituração fiscal digital no SPED e eSocial.
          </p>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h3 class="font-bold text-slate-900 text-sm">Composição dos 7 Dígitos Oficiais:</h3>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>2 primeiros dígitos (Código UF):</strong> Identificam a Unidade da Federação segundo a divisão geocientífica nacional (1x Norte, 2x Nordeste, 3x Sudeste, 4x Sul e 5x Centro-Oeste).</li>
              <li><strong>4 dígitos seguintes:</strong> Identificador numérico sequencial exclusivo do município dentro daquela Unidade da Federação.</li>
              <li><strong>Último dígito (7º):</strong> Dígito verificador (DV) calculado pelo algoritmo oficial de Módulo 10 para prevenir erros de digitação em ERPs e guias fiscais.</li>
            </ul>
          </div>

          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2 px-3">Código UF</th>
                  <th class="py-2 px-3">Estado</th>
                  <th class="py-2 px-3">Capital</th>
                  <th class="py-2 px-3">Código IBGE da Capital</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr><td class="py-1.5 px-3 font-mono font-bold">35</td><td class="py-1.5 px-3 font-bold">São Paulo (SP)</td><td class="py-1.5 px-3">São Paulo</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">3550308</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">33</td><td class="py-1.5 px-3 font-bold">Rio de Janeiro (RJ)</td><td class="py-1.5 px-3">Rio de Janeiro</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">3304557</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">31</td><td class="py-1.5 px-3 font-bold">Minas Gerais (MG)</td><td class="py-1.5 px-3">Belo Horizonte</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">3106200</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">41</td><td class="py-1.5 px-3 font-bold">Paraná (PR)</td><td class="py-1.5 px-3">Curitiba</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">4106902</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">43</td><td class="py-1.5 px-3 font-bold">Rio Grande do Sul (RS)</td><td class="py-1.5 px-3">Porto Alegre</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">4314902</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">29</td><td class="py-1.5 px-3 font-bold">Bahia (BA)</td><td class="py-1.5 px-3">Salvador</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">2927408</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">26</td><td class="py-1.5 px-3 font-bold">Pernambuco (PE)</td><td class="py-1.5 px-3">Recife</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">2611606</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">23</td><td class="py-1.5 px-3 font-bold">Ceará (CE)</td><td class="py-1.5 px-3">Fortaleza</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">2304400</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">53</td><td class="py-1.5 px-3 font-bold">Distrito Federal (DF)</td><td class="py-1.5 px-3">Brasília</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">5300108</td></tr>
                <tr><td class="py-1.5 px-3 font-mono font-bold">13</td><td class="py-1.5 px-3 font-bold">Amazonas (AM)</td><td class="py-1.5 px-3">Manaus</td><td class="py-1.5 px-3 font-mono text-emerald-700 font-bold">1302603</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">
            <strong>Rejeição 254 / Código Municipal Inválido na NF-e:</strong> Quando o sistema emissor envia um código IBGE de 6 dígitos sem o dígito verificador ou informa código incompatível com a UF do destinatário, a SEFAZ rejeita automaticamente o lote XML. Em casos de municípios emancipados mais recentes ou consultas integradas por CEP via ViaCEP, valide sempre os 7 algarismos completos antes de gravar no banco de clientes do ERP.
          </p>
          <p class="text-xs text-slate-600 leading-relaxed">
            <strong>Diferença entre Código IBGE (7 dígitos), Código TOM/SIAFI (4 dígitos) e CEP (8 dígitos):</strong> Enquanto o CEP pertence à logística postal dos Correios (podendo haver milhares de CEPs dentro de uma única metrópole) e a tabela TOM/SIAFI histórica da Receita Federal identifica municípios em guias antigas de arrecadação DARF, o código IBGE de 7 dígitos representa de maneira única cada município brasileiro em sistemas fiscais modernos, NFS-e nacional, eSocial trabalhista e tabelas demográficas do Censo.
          </p>
          <div class="space-y-2 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
            <h3 class="font-bold text-slate-900">Perguntas Frequentes sobre Códigos IBGE</h3>
            <dl class="space-y-1.5">
              <div>
                <dt class="font-bold text-slate-800">Como descobrir o código IBGE de uma cidade pelo endereço?</dt>
                <dd>Basta consultar o CEP oficial do logradouro na ferramenta de Consulta de CEP: o retorno padrão da base nacional já traz o campo <code>ibge</code> com os 7 dígitos exatos vinculados ao município.</dd>
              </div>
              <div>
                <dt class="font-bold text-slate-800">Exportações para o exterior utilizam qual código IBGE na NF-e?</dt>
                <dd>Para destinatários residentes fora do Brasil, a nota técnica da NF-e orienta preencher o código especial <code>9999999</code> associado à sigla de UF <code>EX</code> e ao código do país na tabela BACEN.</dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Integração Fiscal e Utilitários Relacionados</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/geradores/gerador-de-cnpj" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Gerador de CNPJ para Testes →</a>
            <a href="/programatico/cep-brasil" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Consulta de CEP e Logradouros →</a>
            <a href="/programatico/codigos-ncm" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Tabela de Códigos NCM →</a>
            <a href="/desenvolvedores" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">Endpoints da API Tool Brasil →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 7.1 IPVA 2026 POR ESTADO
  if (id.startsWith('ipva-2026-')) {
    const m = page?.meta || { uf: 'SP', estado: 'São Paulo', carro: '4,0%', moto: '2,0%', utilitario: '2,0%', isencaoAnos: '20 anos de fabricação', descontoVista: '3%' };
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Tributação Estadual SEFAZ/${m.uf} 2026</span>
            <span class="text-xs text-slate-500 font-medium">Tabela FIPE & DETRAN-${m.uf}</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            Tabela de Alíquotas, Descontos e Isenção do IPVA 2026 em ${m.estado} (${m.uf})
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            O Imposto sobre a Propriedade de Veículos Automotores (IPVA) no estado de <strong>${m.estado} (${m.uf})</strong> incide anualmente sobre o valor venal divulgado pela Tabela FIPE. Para o exercício fiscal de 2026, a Secretaria da Fazenda Estadual aplica alíquotas diferenciadas conforme a categoria e motorização do veículo.
          </p>
          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2.5 px-3">Categoria / Regra em ${m.estado} (${m.uf})</th>
                  <th class="py-2.5 px-3">Alíquota / Condição Oficial 2026</th>
                  <th class="py-2.5 px-3">Exemplo sobre Veículo R$ 60.000</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Carros de Passeio (Flex / Gasolina)</td>
                  <td class="py-2 px-3 font-mono font-bold text-emerald-700">${m.carro}</td>
                  <td class="py-2 px-3">Cálculo direto sobre valor venal FIPE</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Motocicletas e Similares</td>
                  <td class="py-2 px-3 font-mono font-bold text-emerald-700">${m.moto}</td>
                  <td class="py-2 px-3">Alíquota reduzida para duas rodas</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Utilitários de Carga / Caminhonetes</td>
                  <td class="py-2 px-3 font-mono font-bold text-emerald-700">${m.utilitario}</td>
                  <td class="py-2 px-3">Cabine simples e veículos comerciais</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Isenção por Tempo de Fabricação</td>
                  <td class="py-2 px-3 font-bold text-blue-700">${m.isencaoAnos}</td>
                  <td class="py-2 px-3">Isento de IPVA (mantém licenciamento)</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Desconto em Cota Única (À Vista)</td>
                  <td class="py-2 px-3 font-bold text-emerald-700">${m.descontoVista}</td>
                  <td class="py-2 px-3">Pagamento antecipado no vencimento</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed pt-2">
            <strong>Como calcular o valor exato:</strong> Multiplique o valor venal do veículo na Tabela FIPE pela alíquota correspondente do estado de ${m.estado}. Lembre-se de que o atraso no pagamento do IPVA impede a emissão do Certificado de Registro e Licenciamento de Veículo (CRLV-e digital) e gera multa diária mais juros baseados na taxa SELIC.
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Simule Agora seu IPVA 2026 Online</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/calculadoras/calculadora-de-ipva" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de IPVA 2026 Interativa →</a>
            <a href="/calculadoras/calculadora-de-consumo-combustivel" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Consumo de Combustível →</a>
            <a href="/calculadoras/calculadora-de-alcool-ou-gasolina" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora Álcool ou Gasolina →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 7.2 CÓDIGOS BANCÁRIOS ESPECÍFICOS (COMPE & ISPB)
  if (id.startsWith('codigo-banco-')) {
    const m = page?.meta || { compe: '001', ispb: '00000000', nome: 'Instituição Bancária', agenciaPadrao: '0001', cnpj: '00.000.000/0001-91' };
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Sistema de Pagamentos Brasileiro (SPB)</span>
            <span class="text-xs text-slate-500 font-medium">Banco Central do Brasil & FEBRABAN</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">
            Ficha Técnica de Compensação: ${m.nome} (Código ${m.compe})
          </h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            Para realizar transferências interbancárias via <strong>TED (Transferência Eletrônica Disponível)</strong>, cadastrar recebimento de folha salarial, restituição do Imposto de Renda ou configurar débito automático no <strong>${m.nome}</strong>, utilize os códigos normativos homologados pelo Banco Central do Brasil listados na tabela abaixo:
          </p>
          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2.5 px-3">Parâmetro Bancário</th>
                  <th class="py-2.5 px-3">Código / Valor Oficial</th>
                  <th class="py-2.5 px-3">Finalidade de Uso</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Código COMPE (Número do Banco)</td>
                  <td class="py-2 px-3 font-mono font-bold text-emerald-700 text-sm">${m.compe}</td>
                  <td class="py-2 px-3">Transferências TED, compensação e cadastro de conta</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Código ISPB (8 dígitos BACEN)</td>
                  <td class="py-2 px-3 font-mono font-bold text-slate-800">${m.ispb}</td>
                  <td class="py-2 px-3">Liquidação STR, PIX e integrações Open Finance</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Razão Social Homologada</td>
                  <td class="py-2 px-3 font-bold text-slate-900">${m.nome}</td>
                  <td class="py-2 px-3">Contratos, informes de rendimentos e DIRPF</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Padrão de Agência</td>
                  <td class="py-2 px-3 font-mono text-slate-800">${m.agenciaPadrao}</td>
                  <td class="py-2 px-3">Preenchimento de formulários bancários</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">CNPJ Matriz da Instituição</td>
                  <td class="py-2 px-3 font-mono text-slate-700">${m.cnpj}</td>
                  <td class="py-2 px-3">Declaração de Bens e Direitos no Imposto de Renda</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed pt-2">
            <strong>Importante sobre o fim do DOC:</strong> Desde fevereiro de 2024, as operações de DOC foram descontinuadas pela FEBRABAN. Utilize sempre o <strong>PIX</strong> (gratuito para pessoas físicas 24h por dia) ou a <strong>TED</strong> (com o código COMPE <strong>${m.compe}</strong> em dias úteis até as 17h).
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Consultas e Ferramentas Financeiras</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/programatico/bancos-brasil" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Lista Completa de Todos os Bancos →</a>
            <a href="/calculadoras/calculadora-de-juros-compostos" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Juros Compostos →</a>
            <a href="/geradores/gerador-de-cnpj" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Gerador e Validador de CNPJ →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 7.3 TABELAS TRABALHISTAS E PREVIDENCIÁRIAS 2026
  if (['tabela-inss-2026', 'tabela-irrf-2026', 'tabela-seguro-desemprego-2026', 'aviso-previo-proporcional-tabela'].includes(id)) {
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Legislação Trabalhista & Previdenciária 2026</span>
            <span class="text-xs text-slate-500 font-medium">Ministério do Trabalho, Previdência Social & Receita Federal</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">${page.title}</h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            Consulte os parâmetros oficiais vigentes em 2026 para apuração de folha de pagamento, retenções na fonte, cálculo de rescisões contratuais CLT e planejamento financeiro. Todos os valores refletem o piso salarial nacional de <strong>R$ 1.518,00</strong> e o teto previdenciário de <strong>R$ 8.157,41</strong>.
          </p>
          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2.5 px-3">Faixa / Parâmetro 2026</th>
                  <th class="py-2.5 px-3">Base de Cálculo Salarial</th>
                  <th class="py-2.5 px-3">Alíquota / Regra Aplicável</th>
                  <th class="py-2.5 px-3">Parcela a Deduzir / Observação</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">1ª Faixa INSS (Salário Mínimo)</td>
                  <td class="py-2 px-3 font-mono">Até R$ 1.518,00</td>
                  <td class="py-2 px-3 font-bold text-emerald-700">7,5%</td>
                  <td class="py-2 px-3">Dedução: R$ 0,00 (Desconto máx: R$ 113,85)</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">2ª Faixa INSS Progressiva</td>
                  <td class="py-2 px-3 font-mono">De R$ 1.518,01 até R$ 2.793,88</td>
                  <td class="py-2 px-3 font-bold text-emerald-700">9,0%</td>
                  <td class="py-2 px-3">Parcela a deduzir: R$ 22,77</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">3ª Faixa INSS Progressiva</td>
                  <td class="py-2 px-3 font-mono">De R$ 2.793,89 até R$ 4.190,83</td>
                  <td class="py-2 px-3 font-bold text-emerald-700">12,0%</td>
                  <td class="py-2 px-3">Parcela a deduzir: R$ 106,59</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">4ª Faixa INSS (Teto Máximo)</td>
                  <td class="py-2 px-3 font-mono">De R$ 4.190,84 até R$ 8.157,41</td>
                  <td class="py-2 px-3 font-bold text-emerald-700">14,0%</td>
                  <td class="py-2 px-3">Parcela a deduzir: R$ 190,40 (Teto: R$ 951,62)</td>
                </tr>
                <tr>
                  <td class="py-2 px-3 font-bold text-slate-900">Aviso Prévio Proporcional (Lei 12.506)</td>
                  <td class="py-2 px-3 font-mono">Até 1 ano completo: 30 dias</td>
                  <td class="py-2 px-3 font-bold text-blue-700">+3 dias por ano completo</td>
                  <td class="py-2 px-3">Limite máximo legal de 90 dias (20 anos)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed pt-2">
            <strong>Fórmula Rápida com Parcela a Deduzir:</strong> Para encontrar o desconto exato do INSS sem precisar calcular faixa por faixa manualmente, multiplique o salário bruto pela alíquota da faixa correspondente e subtraia a <em>Parcela a Deduzir</em> indicada na tabela acima.
          </p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Calculadoras Trabalhistas Automatizadas 2026</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/calculadoras/calculadora-desconto-inss" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Desconto INSS →</a>
            <a href="/calculadoras/calculadora-de-salario-liquido" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Salário Líquido →</a>
            <a href="/calculadoras/calculadora-de-rescisao-trabalhista" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Rescisão CLT →</a>
            <a href="/calculadoras/calculadora-de-seguro-desemprego" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Seguro-Desemprego →</a>
          </div>
        </div>
      </div>
    `;
  }

  // 8. SUBCATEGORIAS PROGRAMÁTICAS DEDICADAS: CEP, CNAE, CBO & NCM
  if (id === 'cep-brasil') {
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Endereçamento Postal Oficial</span>
            <span class="text-xs text-slate-500 font-medium">Diretório Nacional de Endereços (DNE / Correios)</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">Como Funciona a Estrutura dos 8 Dígitos do CEP no Brasil</h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            O Código de Endereçamento Postal (CEP) brasileiro é composto por oito algarismos no formato <code>XXXXX-XXX</code> gerenciados pela Empresa Brasileira de Correios e Telégrafos. Cada dígito da esquerda para a direita reduz progressivamente a área geográfica abrangida, começando pela Grande Região postal (primeiro dígito de 0 a 9), passando pela sub-região, setor, sub-setor, divisor de sub-setor e finalmente os três dígitos de sufixo que identificam o logradouro exato, códigos de grandes usuários ou unidades operacionais dos Correios.
          </p>
          <p class="text-xs text-slate-600 leading-relaxed">
            Utilizar o CEP validado corretamente evita extravios logísticos em envios de encomendas PAC e SEDEX, reduz erros de cálculo de frete em lojas virtuais (e-commerce), garante emissão correta de Notas Fiscais Eletrônicas (NF-e e NFC-e junto às Secretarias da Fazenda estaduais) e acelera o preenchimento automático de cadastros bancários e declarações de residência.
          </p>
          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2 px-3">Faixa Inicial do CEP</th>
                  <th class="py-2 px-3">Região Postal Oficial</th>
                  <th class="py-2 px-3">Estados Cobertos</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">01000 a 09999</td><td class="py-2 px-3 font-bold">Região 0</td><td class="py-2 px-3">Grande São Paulo (Capital e Região Metropolitana)</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">11000 a 19999</td><td class="py-2 px-3 font-bold">Região 1</td><td class="py-2 px-3">Litoral e Interior do Estado de São Paulo</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">20000 a 29999</td><td class="py-2 px-3 font-bold">Região 2</td><td class="py-2 px-3">Rio de Janeiro (20000-28999) e Espírito Santo (29000-29999)</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">30000 a 39999</td><td class="py-2 px-3 font-bold">Região 3</td><td class="py-2 px-3">Minas Gerais (todas as macrorregiões e capital BH)</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">40000 a 49999</td><td class="py-2 px-3 font-bold">Região 4</td><td class="py-2 px-3">Bahia (40000-48999) e Sergipe (49000-49999)</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">50000 a 59999</td><td class="py-2 px-3 font-bold">Região 5</td><td class="py-2 px-3">Pernambuco, Alagoas, Paraíba e Rio Grande do Norte</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">60000 a 69999</td><td class="py-2 px-3 font-bold">Região 6</td><td class="py-2 px-3">Ceará, Piauí, Maranhão, Pará, Amapá, Amazonas, Acre e Roraima</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">70000 a 79999</td><td class="py-2 px-3 font-bold">Região 7</td><td class="py-2 px-3">Distrito Federal, Goiás, Tocantins, Mato Grosso, MS e Rondônia</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">80000 a 89999</td><td class="py-2 px-3 font-bold">Região 8</td><td class="py-2 px-3">Paraná (80000-87999) e Santa Catarina (88000-89999)</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">90000 a 99999</td><td class="py-2 px-3 font-bold">Região 9</td><td class="py-2 px-3">Rio Grande do Sul (Porto Alegre, Região Metropolitana e Interior)</td></tr>
              </tbody>
            </table>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-slate-600 leading-relaxed">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h3 class="font-bold text-slate-900">CEP Único vs. Município Codificado por Logradouro</h3>
              <p>Cidades com menor densidade populacional utilizam historicamente um CEP único terminando em <code>-000</code> para todo o perímetro urbano, enquanto cidades maiores e capitais adotam codificação individualizada por rua ou trecho de avenida. Nos últimos anos, os Correios têm promovido a atualização progressiva de dezenas de municípios do interior para CEPs específicos por logradouro, exigindo atenção redobrada em sistemas de frete e integração fiscal.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h3 class="font-bold text-slate-900">Declaração de Conteúdo e Código IBGE</h3>
              <p>Além do CEP de origem e destino, o transporte de mercadorias sem Nota Fiscal por pessoas físicas nos Correios requer a Declaração de Conteúdo assinada, enquanto faturamentos empresariais associam o CEP ao código municipal oficial do IBGE de 7 dígitos.</p>
            </div>
          </div>
          <div class="space-y-2 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
            <h3 class="font-bold text-slate-900">Perguntas Frequentes sobre CEPs e Endereçamento</h3>
            <dl class="space-y-1.5">
              <div>
                <dt class="font-bold text-slate-800">Qual a diferença entre CEP de logradouro e CEP promocional ou comunitário?</dt>
                <dd>Além dos CEPs de rua convencionais, grandes edifícios comerciais, órgãos públicos e empresas recebem CEPs exclusivos (Grande Usuário), enquanto localidades sem entrega domiciliar ou distritos rurais utilizam CEPs comunitários vinculados a Agências dos Correios ou Caixas Postais Comunitárias.</dd>
              </div>
              <div>
                <dt class="font-bold text-slate-800">Por que meu e-commerce ou NF-e recusa um CEP recém-criado?</dt>
                <dd>Municípios que passaram por recodificação recente podem demorar alguns dias para sincronizar nos cadastros secundários de transportadoras ou ERPs. Sempre valide se os 8 dígitos constam no Diretório Nacional de Endereços (DNE) atualizado e confirme se o município não deixou de usar CEP geral terminando em 000.</dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Utilitários Logísticos e Endereçamento Relacionados</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/geradores/gerador-de-declaracao-de-conteudo-para-correios" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Gerador de Declaração de Conteúdo Correios →</a>
            <a href="/geradores/gerador-de-declaracao-de-residencia" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Gerador de Declaração de Residência →</a>
            <a href="/programatico/codigos-ibge" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">Tabela de Códigos IBGE →</a>
            <a href="/programatico/ddd-brasil" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">DDDs do Brasil →</a>
          </div>
        </div>
      </div>
    `;
  }

  if (id === 'cnae-consulta') {
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">CONCLA / IBGE & Receita Federal</span>
            <span class="text-xs text-slate-500 font-medium">Classificação Nacional de Atividades Econômicas 2.3</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">Guia Completo da Estrutura CNAE, Simples Nacional e Fator R</h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            A <strong>CNAE (Classificação Nacional de Atividades Econômicas)</strong> é o código padronizado de 7 dígitos definido pela Comissão Nacional de Classificação (CONCLA/IBGE) e adotado por Receita Federal, Juntas Comerciais, Prefeituras e Secretarias da Fazenda estaduais para identificar formalmente o ramo de atuação principal e os ramos secundários de qualquer CNPJ brasileiro.
          </p>
          <p class="text-xs text-slate-600 leading-relaxed">
            Escolher o código CNAE exato na abertura de empresa ou alteração contratual define diretamente: se a atividade pode ser exercida como Microempreendedor Individual (MEI), qual Anexo tributário do Simples Nacional incide sobre o faturamento (Anexo I para comércio, Anexo II para indústria e Anexos III, IV ou V para prestação de serviços), a exigência ou dispensa de Inscrição Estadual (ICMS) e alvarás sanitários ou de conselhos profissionais.
          </p>
          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2 px-3">Nível Hierárquico CNAE</th>
                  <th class="py-2 px-3">Estrutura do Código</th>
                  <th class="py-2 px-3">Finalidade Tributária e Cadastral</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr><td class="py-2 px-3 font-bold">Seção (A a U)</td><td class="py-2 px-3 font-mono">1 letra</td><td class="py-2 px-3">Grande setor econômico (ex: G Comércio, J Tecnologia/Informação, M Serviços Técnicos).</td></tr>
                <tr><td class="py-2 px-3 font-bold">Divisão / Grupo / Classe</td><td class="py-2 px-3 font-mono">5 dígitos + DV</td><td class="py-2 px-3">Refinamento intermediário usado em estatísticas econômicas e enquadramento sindical patronal.</td></tr>
                <tr><td class="py-2 px-3 font-bold">Subclasse CNAE Fiscal</td><td class="py-2 px-3 font-mono text-emerald-700 font-bold">XXXX-X/XX (7 dígitos)</td><td class="py-2 px-3">Código exato obrigatório no Cartão CNPJ, emissão de NF-e/NFS-e, eSocial e cálculo do DAS.</td></tr>
              </tbody>
            </table>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-slate-600 leading-relaxed">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h3 class="font-bold text-slate-900">Impacto do Fator R no Anexo III vs. Anexo V</h3>
              <p>Atividades intelectuais de tecnologia (como desenvolvimento de software sob encomenda 6201-5/01), consultoria e engenharia começam originalmente no Anexo V (alíquota inicial de 15,5%), mas podem migrar legalmente para o Anexo III (a partir de 6%) quando a folha salarial somada ao pró-labore dos sócios atinge 28% ou mais da receita bruta dos últimos 12 meses.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h3 class="font-bold text-slate-900">CNAE Principal vs. CNAEs Secundários</h3>
              <p>Uma empresa pode manter até 1 CNAE principal (aquele responsável pela maior parcela da receita operacional) e diversos CNAEs secundários ligados ao objeto social do contrato, emitindo notas fiscais distintas para cada frente regularizada.</p>
            </div>
          </div>
          <div class="space-y-2 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
            <h3 class="font-bold text-slate-900">Perguntas Frequentes sobre Enquadramento CNAE, MEI e Nota Fiscal</h3>
            <dl class="space-y-1.5">
              <div>
                <dt class="font-bold text-slate-800">Todo código CNAE é permitido para registro como Microempreendedor Individual (MEI)?</dt>
                <dd>Não. Atividades regulamentadas por conselhos profissionais e serviços intelectuais de alta especialização (como medicina, engenharia, advocacia, desenvolvimento de sistemas e contabilidade) são vedadas ao MEI, exigindo enquadramento como Microempresa (ME) ou Empresa de Pequeno Porte (EPP) no Simples Nacional ou Lucro Presumido.</dd>
              </div>
              <div>
                <dt class="font-bold text-slate-800">Posso alterar ou adicionar um novo CNAE depois que o CNPJ já foi aberto?</dt>
                <dd>Sim. Basta registrar alteração contratual ou atualização cadastral via RedeSim / Junta Comercial e DBE da Receita Federal, observando a viabilidade municipal do alvará no endereço da sede e a correlação correta com os códigos de serviço municipal (LC 116) para emissão de NFS-e sem bitributação ou retenção indevida.</dd>
              </div>
              <div>
                <dt class="font-bold text-slate-800">O código CNAE influencia na alíquota de RAT/FAP e contribuição sindical na CLT?</dt>
                <dd>Sim. A Secretaria Especial da Previdência associa a Subclasse CNAE principal ao grau de risco de acidente de trabalho (RAT de 1%, 2% ou 3%), definindo encargos sobre a folha de pagamento dos empregados contratados.</dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Ferramentas Empresariais e Fiscais Tool Brasil</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/calculadoras/calculadora-clt-vs-pj" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora CLT vs PJ →</a>
            <a href="/calculadoras/calculadora-de-margem-de-lucro" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Margem de Lucro →</a>
            <a href="/geradores/gerador-de-cnpj" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Gerador de CNPJ para Testes →</a>
            <a href="/guias/clt-ou-pj-simples-nacional-pro-labore-comparativo" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">Guia CLT vs PJ & Simples Nacional →</a>
          </div>
        </div>
      </div>
    `;
  }

  if (id === 'cbo-consulta') {
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Ministério do Trabalho e Emprego (MTE)</span>
            <span class="text-xs text-slate-500 font-medium">Classificação Brasileira de Ocupações — eSocial & CTPS Digital</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">Estrutura dos Códigos CBO para Admissão CLT, eSocial e Seguro-Desemprego</h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            A <strong>Classificação Brasileira de Ocupações (CBO)</strong> é o documento oficial mantido pelo Ministério do Trabalho e Emprego que identifica, padroniza e descreve as funções e profissões reconhecidas no mercado de trabalho brasileiro por meio de códigos numéricos no formato <code>XXXX-XX</code> (4 dígitos de família ocupacional seguidos de 2 dígitos identificadores da ocupação específica).
          </p>
          <p class="text-xs text-slate-600 leading-relaxed">
            Na gestão diária de Recursos Humanos e Departamento Pessoal, o preenchimento correto do código CBO é obrigatório na emissão da Carteira de Trabalho Digital (evento S-2200 do eSocial), no envio do CAGED/Novo CAGED, no requerimento do Seguro-Desemprego, na elaboração de perfis profissiográficos previdenciários (PPP) junto ao INSS e na verificação de regras específicas de aposentadoria ou cotas legais de aprendizagem e PCD.
          </p>
          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2 px-3">Grande Grupo CBO</th>
                  <th class="py-2 px-3">Dígito Inicial</th>
                  <th class="py-2 px-3">Exemplos de Ocupações e Setores</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr><td class="py-2 px-3 font-bold">Grande Grupo 1</td><td class="py-2 px-3 font-mono text-emerald-700 font-bold">1xxx-xx</td><td class="py-2 px-3">Dirigentes, Diretores Executivos e Gerentes de Área</td></tr>
                <tr><td class="py-2 px-3 font-bold">Grande Grupo 2</td><td class="py-2 px-3 font-mono text-emerald-700 font-bold">2xxx-xx</td><td class="py-2 px-3">Profissionais das Ciências, Engenharia, Direito, Saúde e Tecnologia</td></tr>
                <tr><td class="py-2 px-3 font-bold">Grande Grupo 3</td><td class="py-2 px-3 font-mono text-emerald-700 font-bold">3xxx-xx</td><td class="py-2 px-3">Técnicos de Nível Médio (Enfermagem, Eletrotécnica, Suporte TI)</td></tr>
                <tr><td class="py-2 px-3 font-bold">Grande Grupo 4</td><td class="py-2 px-3 font-mono text-emerald-700 font-bold">4xxx-xx</td><td class="py-2 px-3">Trabalhadores de Serviços Administrativos, Auxiliares e Caixa</td></tr>
                <tr><td class="py-2 px-3 font-bold">Grande Grupo 5</td><td class="py-2 px-3 font-mono text-emerald-700 font-bold">5xxx-xx</td><td class="py-2 px-3">Trabalhadores dos Serviços, Vendedores do Comércio e Atendimento</td></tr>
                <tr><td class="py-2 px-3 font-bold">Grande Grupo 7</td><td class="py-2 px-3 font-mono text-emerald-700 font-bold">7xxx-xx</td><td class="py-2 px-3">Construção Civil, Manutenção Industrial, Eletricistas e Mecânicos</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed pt-2">
            <strong>Diferença entre CBO e Regulamentação Profissional:</strong> Constar na tabela CBO oficial não transforma automaticamente uma profissão livre em profissão regulamentada por conselho de classe, mas registra estatisticamente a função efetivamente desempenhada para fins de contratos trabalhistas e proteção previdenciária.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-slate-600 leading-relaxed">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h3 class="font-bold text-slate-900">Importância do CBO no eSocial (S-2200) e PPP Previdenciário</h3>
              <p>O evento S-2200 do eSocial vincula obrigatoriamente o código CBO de 6 dígitos ao contrato do colaborador. Além de alimentar estatísticas nacionais do Novo CAGED, o código informado precisa refletir a atividade real do trabalhador para validação de aposentadoria especial no PPP (Perfil Profissiográfico Previdenciário), análise de insalubridade/periculosidade e habilitação correta ao Seguro-Desemprego.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h3 class="font-bold text-slate-900">CBO vs. Piso Salarial e Enquadramento Sindical</h3>
              <p>Embora o código CBO descreva as atribuições ocupacionais padrão e escolaridade média esperada para o cargo, a definição do piso salarial aplicável decorre da Convenção Coletiva de Trabalho (CCT) firmada entre o sindicato patronal correspondente ao CNAE principal da empresa e o sindicato laboral da categoria preponderante ou diferenciada.</p>
            </div>
          </div>
          <div class="space-y-2 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
            <h3 class="font-bold text-slate-900">Perguntas Frequentes sobre Códigos CBO</h3>
            <dl class="space-y-1.5">
              <div>
                <dt class="font-bold text-slate-800">O código CBO registrado na Carteira Digital pode ser corrigido se houver promoção?</dt>
                <dd>Sim. Sempre que o empregado muda efetivamente de função ou recebe promoção formal, o setor de RH deve transmitir evento de alteração contratual no eSocial (S-2206) atualizando cargo, remuneração e o novo código CBO correspondente.</dd>
              </div>
              <div>
                <dt class="font-bold text-slate-800">Existe código CBO específico para jovem aprendiz e estagiário?</dt>
                <dd>No contrato de aprendizagem (CLT especial), utiliza-se o CBO equivalente ao curso de formação técnico-profissional metódica; já estágios regidos pela Lei nº 11.788/2008 informam a função correlata de formação no evento S-2300 sem vínculo empregatício celetista.</dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Calculadoras CLT e Previdenciárias Relacionadas</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/calculadoras/calculadora-de-salario-liquido" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Salário Líquido →</a>
            <a href="/calculadoras/calculadora-de-rescisao-trabalhista" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Rescisão CLT →</a>
            <a href="/calculadoras/calculadora-de-seguro-desemprego" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Seguro-Desemprego →</a>
            <a href="/calculadoras/calculadora-de-adicional-de-periculosidade" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">Calculadora de Periculosidade (30%) →</a>
          </div>
        </div>
      </div>
    `;
  }

  if (id === 'codigos-ncm') {
    return `
      <div class="space-y-6 text-slate-800">
        <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Receita Federal / MDIC / Mercosul</span>
            <span class="text-xs text-slate-500 font-medium">Nomenclatura Comum do Mercosul (8 Dígitos)</span>
          </div>
          <h2 class="text-xl font-bold text-slate-900">Como Ler os 8 Dígitos do Código NCM em Notas Fiscais (NF-e / NFC-e)</h2>
          <p class="text-xs text-slate-600 leading-relaxed">
            A <strong>NCM (Nomenclatura Comum do Mercosul)</strong> é o código numérico oficial de 8 dígitos obrigatório para classificar toda e qualquer mercadoria física comercializada internamente ou movimentada em operações de importação e exportação entre Brasil, Argentina, Paraguai e Uruguai. Adotada integralmente na emissão de Notas Fiscais Eletrônicas (NF-e e NFC-e), a NCM determina as alíquotas incidentes de II (Imposto de Importação), IPI (Imposto sobre Produtos Industrializados), PIS/COFINS monofásico, ICMS e regimes de Substituição Tributária (ICMS-ST + CEST).
          </p>
          <div class="overflow-x-auto pt-2">
            <table class="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th class="py-2 px-3">Posição na NCM</th>
                  <th class="py-2 px-3">Nível de Classificação</th>
                  <th class="py-2 px-3">Origem e Significado Técnico</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">Dígitos 1 e 2</td><td class="py-2 px-3 font-bold">Capítulo (SH)</td><td class="py-2 px-3">Grande categoria internacional do Sistema Harmonizado (ex: Cap. 84 Máquinas, Cap. 85 Eletrônicos).</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">Dígitos 3 e 4</td><td class="py-2 px-3 font-bold">Posição (SH)</td><td class="py-2 px-3">Subdivisão direta dentro do capítulo identificando o tipo de bem.</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">Dígitos 5 e 6</td><td class="py-2 px-3 font-bold">Subposição (SH-6)</td><td class="py-2 px-3">Padrão global unificado em mais de 200 países pela Organização Mundial das Aduanas (OMA).</td></tr>
                <tr><td class="py-2 px-3 font-mono font-bold text-emerald-700">Dígitos 7 e 8</td><td class="py-2 px-3 font-bold">Item e Subitem (Mercosul)</td><td class="py-2 px-3">Desdobramento regional exclusivo do Mercosul para definição tributária fina no Brasil.</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed pt-2">
            <strong>Atenção à Tabela TIPI e NF-e Rejeitada:</strong> Informar uma NCM extinta ou incorreta causa rejeição imediata na validação do XML da NF-e pela SEFAZ (Erro 778 — NCM inexistente) ou gera recolhimento indevido de tributos em vendas de varejo e e-commerce. Sempre atualize periodicamente o cadastro de produtos do seu ERP segundo a tabela vigente publicada pela Secretaria Especial da Receita Federal do Brasil.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-slate-600 leading-relaxed">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h3 class="font-bold text-slate-900">Relação Entre NCM, CEST e Substituição Tributária (ICMS-ST)</h3>
              <p>Em vendas interestaduais e operações sujeitas ao regime de Substituição Tributária do ICMS, a NCM atua combinada ao Código Especificador da Substituição Tributária (CEST, de 7 dígitos). Enquanto a NCM classifica fisicamente o produto no Sistema Harmonizado, o CEST vincula aquele item aos convênios CONFAZ aplicáveis para determinar o MVA e o cálculo correto de retenção antecipada do imposto estadual.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <h3 class="font-bold text-slate-900">Regras para Serviços vs. Mercadorias e Ex-Tarifário</h3>
              <p>Prestação de serviços puros (como consultoria ou desenvolvimento de software) utilizam códigos NBS/LC 116 em NFS-e e não exigem NCM; somente mercadorias físicas na NF-e e NFC-e requerem os 8 algarismos da Nomenclatura Comum do Mercosul. Em importações de bens de capital e informática sem produção nacional equivalente, regimes de Ex-Tarifário reduzem temporariamente o Imposto de Importação com destaque sobre a NCM base.</p>
            </div>
          </div>
          <div class="space-y-2 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
            <h3 class="font-bold text-slate-900">Perguntas Frequentes sobre Códigos NCM</h3>
            <dl class="space-y-1.5">
              <div>
                <dt class="font-bold text-slate-800">Pequenas empresas no Simples Nacional também precisam preencher a NCM na nota fiscal?</dt>
                <dd>Sim. Mesmo empresas optantes pelo Simples Nacional e MEIs emitentes de NF-e/NFC-e devem informar os 8 dígitos da NCM por item, inclusive para segregar corretamente receitas sujeitas à tributação monofásica de PIS/COFINS ou ICMS-ST e evitar pagar imposto em duplicidade no PGDAS-D.</dd>
              </div>
              <div>
                <dt class="font-bold text-slate-800">Qual NCM usar para kits promocionais com múltiplos produtos?</dt>
                <dd>Regra geral de interpretação fiscal recomenda discriminar cada item do kit separadamente na nota fiscal com sua respectiva NCM individual para preservar a exatidão tributária dos anexos de IPI, PIS/COFINS e ICMS de cada mercadoria.</dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
          <h3 class="text-sm font-bold text-slate-900">Utilitários Comerciais e Tributários Tool Brasil</h3>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/calculadoras/calculadora-de-icms" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de ICMS por Estado →</a>
            <a href="/calculadoras/calculadora-de-preco-de-venda" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Calculadora de Preço de Venda (Markup) →</a>
            <a href="/geradores/gerador-de-codigo-de-barras" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Gerador de Código de Barras EAN-13 →</a>
            <a href="/programatico/cnae-consulta" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">Consulta de CNAE →</a>
          </div>
        </div>
      </div>
    `;
  }

  // Fallback genérico (para eventual futura rota)
  return `
    <div class="space-y-6 text-slate-800">
      <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-4">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Base de Dados Pública Brasileira</span>
          <span class="text-xs text-slate-500 font-medium">Consulta Local & Custo Zero</span>
        </div>
        <h2 class="text-xl font-bold text-slate-900">Informações Oficiais e Estrutura Técnica de Consulta</h2>
        <p class="text-xs text-slate-600 leading-relaxed">
          Esta central programática reúne tabelas estruturadas, nomenclaturas fiscais e parâmetros de conformidade regulatória para empresas, estudantes e desenvolvedores de sistemas em todo o Brasil. Todas as consultas e simulações processam com alta velocidade e respeito absoluto à privacidade dos usuários.
        </p>
      </div>
    </div>
  `;
}

function generateProgrammaticHtml(template: string, id: string, page: any): string {
  const title = `${page.title} | Tool Brasil`;
  const desc = page.description;
  const canonical = `https://www.toolbrasil.com.br/programatico/${id}`;
  const isNoIndex = isNoIndexProgrammaticId(id);
  const robotsMeta = isNoIndex
    ? 'noindex, follow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const content = `
    <div class="space-y-6">
      <nav class="text-xs text-slate-500 font-semibold space-x-1.5 flex items-center">
        <a href="/" class="hover:underline">Início</a>
        <span>&gt;</span>
        <span class="text-slate-800 font-bold">${page.title}</span>
      </nav>

      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3">
        <h1 class="text-2xl font-black tracking-tight text-slate-900">${page.title}</h1>
        <p class="text-sm text-slate-700 leading-relaxed font-medium">${page.description}</p>
      </div>

      <!-- CONTEÚDO EDITORIAL ESTRUTURADO E TABELAS REAIS ANTI-THIN-CONTENT -->
      ${getProgrammaticEditorialHtml(id, page)}
    </div>
  `;

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: page.title, path: `/programatico/${id}` }
  ];
  const schemaTags = buildSchemaTags(crumbs);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags, robotsMeta);
}

function generateGuidesHubHtml(template: string): string {
  const title = 'Guias Práticos, Manuais CLT, Finanças e Web | Tool Brasil';
  const desc = 'Biblioteca editorial completa com guias passo a passo sobre CLT 2026, tabela INSS e IRRF, rescisão, juros compostos, segurança LGPD e infraestrutura web.';
  const canonical = 'https://www.toolbrasil.com.br/guias';

  const content = `
    <div class="space-y-6">
      <nav class="text-xs text-slate-500 font-semibold space-x-1.5 flex items-center">
        <a href="/" class="hover:underline">Início</a>
        <span>&gt;</span>
        <span class="text-slate-800 font-bold">Guias Práticos</span>
      </nav>

      <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-3">
        <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold inline-block">Biblioteca Editorial Tool Brasil</span>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">Guias Práticos, Manuais CLT 2026, Finanças e Segurança Web</h1>
        <p class="text-sm text-slate-600 leading-relaxed">
          Estude em profundidade a metodologia por trás das nossas calculadoras e utilitários: cálculos passo a passo do INSS e IRRF 2026, cálculo de rescisão trabalhista CLT, planejamento do 13º salário, comparação SAC vs. Price, uso de dados sintéticos em QA sob a LGPD e auditoria técnica DNS/SSL.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${EDITORIAL_GUIDES.map(g => `
          <article class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm flex flex-col justify-between gap-3">
            <div class="space-y-2">
              <div class="flex items-center justify-between text-[11px] font-bold">
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">${g.category}</span>
                <span class="text-slate-500 font-mono">${g.publishedAt}</span>
              </div>
              <h2 class="text-base font-black text-slate-900">
                <a href="/guias/${g.slug}" class="hover:text-emerald-700 hover:underline">${g.title}</a>
              </h2>
              <p class="text-xs text-slate-600 leading-relaxed">${g.summary}</p>
            </div>
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Leitura: ${g.readTimeMinutes} min • ${g.author}</span>
              <a href="/guias/${g.slug}" class="hover:underline">Ler guia →</a>
            </div>
          </article>
        `).join('')}
      </div>

      <section class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-3 text-xs text-slate-600 leading-relaxed">
        <h2 class="text-base font-black text-slate-900">Critérios Editoriais e Fontes Oficiais</h2>
        <p>
          Cada artigo publicado na central editorial da Tool Brasil passa por conferência numérica frente às normas brasileiras vigentes — Consolidação das Leis do Trabalho (CLT), tabelas anuais da Receita Federal (IRRF), Previdência Social (INSS), FEBRABAN/BACEN (Sistema de Pagamentos Brasileiro) e Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Todos os guias se conectam diretamente às nossas ferramentas interativas gratuitas para permitir validação imediata no navegador do usuário.
        </p>
      </section>
    </div>
  `;

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Guias Práticos', path: '/guias' }
  ];
  const schemaTags = buildSchemaTags(crumbs);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function generateGuideArticleHtml(template: string, guide: any): string {
  const title = `${guide.title} | Guias Tool Brasil`;
  const desc = guide.summary;
  const canonical = `https://www.toolbrasil.com.br/guias/${guide.slug}`;

  const content = `
    <article class="space-y-6">
      <nav class="text-xs text-slate-500 font-semibold space-x-1.5 flex items-center flex-wrap">
        <a href="/" class="hover:underline">Início</a>
        <span>&gt;</span>
        <a href="/guias" class="hover:underline">Guias Práticos</a>
        <span>&gt;</span>
        <span class="text-slate-800 font-bold">${guide.title}</span>
      </nav>

      <header class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-3">
        <div class="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">${guide.category}</span>
          <span class="text-slate-500 font-mono">Data editorial: ${guide.publishedAt}</span>
          <span class="text-slate-500">• ${guide.readTimeMinutes} min de leitura</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">${guide.title}</h1>
        <p class="text-sm text-slate-700 font-medium leading-relaxed">${guide.summary}</p>
        <p class="text-xs text-slate-500 font-semibold">Por <strong>${guide.author}</strong> — ${guide.authorRole}</p>
      </header>

      <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p class="font-medium text-slate-800 leading-relaxed">${guide.intro}</p>

        ${guide.sections.map((s: any) => `
          <section class="space-y-3 pt-4 border-t border-slate-100">
            <h2 class="text-lg font-black text-slate-900">${s.heading}</h2>
            ${s.paragraphs.map((p: string) => `<p class="leading-relaxed">${p}</p>`).join('')}
            ${s.bullets && s.bullets.length > 0 ? `
              <ul class="list-disc pl-5 space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-medium">
                ${s.bullets.map((b: string) => `<li>${b}</li>`).join('')}
              </ul>
            ` : ''}
          </section>
        `).join('')}

        ${guide.faqs && guide.faqs.length > 0 ? `
          <section class="space-y-3 pt-4 border-t border-slate-200">
            <h2 class="text-lg font-black text-slate-900">Perguntas Frequentes</h2>
            <dl class="space-y-3 text-xs">
              ${guide.faqs.map((faq: any) => `
                <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <dt class="font-bold text-slate-900">${faq.question}</dt>
                  <dd class="mt-1 text-slate-600 leading-relaxed">${faq.answer}</dd>
                </div>
              `).join('')}
            </dl>
          </section>
        ` : ''}
      </div>

      <section class="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 space-y-3">
        <h2 class="text-sm font-black text-emerald-900 uppercase tracking-wider">Ferramentas Gratuitas Relacionadas</h2>
        <div class="flex flex-wrap gap-2 text-xs">
          ${guide.relatedToolLinks.map((lnk: any) => `
            <a href="${lnk.href}" class="px-3 py-1.5 bg-white text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">${lnk.label} →</a>
          `).join('')}
        </div>
      </section>
    </article>
  `;

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Guias Práticos', path: '/guias' },
    { name: guide.title, path: `/guias/${guide.slug}` }
  ];
  const breadcrumb = getBreadcrumbSchema(crumbs);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.summary,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    author: {
      '@type': 'Person',
      name: guide.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tool Brasil',
      url: 'https://www.toolbrasil.com.br/'
    },
    mainEntityOfPage: canonical
  };
  const schemaTags = `<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n</script>\n<script type="application/ld+json">\n${JSON.stringify(articleSchema, null, 2)}\n</script>`;
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function generateInstitutionalHtml(template: string, id: string): string {
  const canonicalMap: { [key: string]: { path: string; title: string; desc: string } } = {
    'sobre': {
      path: '/sobre',
      title: 'Sobre a Tool Brasil - Metodologia, Rigor Jurídico e Equipe Técnica',
      desc: 'Conheça os pilares éticos, o rigor normativo e a equipe técnica multidisciplinar da Tool Brasil, ecossistema de calculadoras e utilitários 100% gratuitos.'
    },
    'contato': {
      path: '/contato',
      title: 'Fale Conosco - Atendimento, Suporte e Encarregado DPO | Tool Brasil',
      desc: 'Canais oficiais de atendimento da Tool Brasil. Suporte a cálculos, sugestão de novas ferramentas, ouvidoria e encarregado de dados LGPD.'
    },
    'privacidade': {
      path: '/politica-de-privacidade',
      title: 'Política de Privacidade e Cookies (LGPD) | Tool Brasil',
      desc: 'Política de Privacidade e Cookies da Tool Brasil em estrita conformidade com a LGPD (Lei 13.709/2018) e diretrizes de editores do Google AdSense.'
    },
    'termos': {
      path: '/termos-de-uso',
      title: 'Termos de Uso e Condições Gerais | Tool Brasil',
      desc: 'Termos de Uso e Condições Gerais do portal Tool Brasil. Conheça as diretrizes de licença gratuita, isenção legal e regras de utilização.'
    },
    'cookies': {
      path: '/cookies',
      title: 'Gestão e Preferências de Cookies | Tool Brasil',
      desc: 'Saiba como utilizamos cookies técnicos, analíticos e de publicidade Google AdSense, e como gerenciar suas preferências no navegador.'
    },
    'transparencia-adsense': {
      path: '/transparencia-adsense',
      title: 'Transparência Google AdSense e Monetização Ética | Tool Brasil',
      desc: 'Entenda como a Tool Brasil se mantém 100% gratuita através de publicidade programática contextual e transparente do Google AdSense.'
    },
    'anunciantes': {
      path: '/anunciantes',
      title: 'Anuncie na Tool Brasil - Mídia Kit e Oportunidades Publicitárias',
      desc: 'Conecte sua marca a milhares de trabalhadores, desenvolvedores, contadores e profissionais em um ambiente editorial seguro e relevante.'
    }
  };

  const meta = canonicalMap[id] || {
    path: `/institucional/${id}`,
    title: 'Informações Institucionais | Tool Brasil',
    desc: 'Informações institucionais da Tool Brasil.'
  };

  const title = meta.title;
  const desc = meta.desc;
  const canonical = `https://www.toolbrasil.com.br${meta.path}`;
  let content = '';

  if (id === 'sobre') {
    content = `
      <div class="space-y-8 text-slate-800">
        <div class="border-b border-slate-200 pb-6">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-3">
            🏆 Quem Somos & Nossa Metodologia
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Sobre a Tool Brasil</h1>
          <p class="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Conheça os pilares éticos, o rigor normativo e a equipe multidisciplinar por trás do maior portal brasileiro de utilitários e calculadoras online 100% gratuitos.
          </p>
        </div>

        <section class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            📖 Nossa Missão e Compromisso Social
          </h2>
          <p>
            A <strong>Tool Brasil</strong> (acessível através do domínio <code>toolbrasil.com.br</code>) foi fundada com o propósito inequívoco de democratizar o acesso a ferramentas de cálculo, conversores analíticos, geradores de dados para testes de software e diagnósticos web para todos os cidadãos brasileiros, profissionais autônomos, microempreendedores e estudantes.
          </p>
          <p>
            Em um cenário digital saturado de plataformas que exigem cadastros invasivos, cobranças ocultas de assinaturas ou armazenamento indevido de dados pessoais, a Tool Brasil estabeleceu um novo padrão: <strong>todas as nossas mais de 130 ferramentas são e sempre serão 100% gratuitas, sem limites de utilização diária e livres de paywalls</strong>.
          </p>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">⚡</div>
            <h3 class="font-bold text-slate-900 text-sm">Privacidade Client-Side</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Seus dados nunca saem do seu navegador. Todas as operações matemáticas e validações rodam localmente no dispositivo via JavaScript seguro.</p>
          </div>
          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">⚖️</div>
            <h3 class="font-bold text-slate-900 text-sm">Rigor Jurídico & Fiscal</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Algoritmos atualizados conforme a CLT, Portarias Interministeriais MPS/MF nº 2/2026 e Instruções Normativas da Receita Federal.</p>
          </div>
          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">🚀</div>
            <h3 class="font-bold text-slate-900 text-sm">Alta Velocidade na Edge</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Páginas estáticas pré-renderizadas distribuídas em servidores CDN globais com tempo de resposta ultrarrápido e estabilidade visual total.</p>
          </div>
        </div>

        <section class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            ⚖️ Metodologia de Cálculo e Fontes Oficiais
          </h2>
          <p>A precisão matemática é um pilar inegociável em nossa plataforma. Cada utilitário foi estruturado com base em normas consolidadas:</p>
          <ul class="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong>Cálculos Trabalhistas e Previdenciários:</strong> Baseados na Consolidação das Leis do Trabalho (Decreto-Lei nº 5.452/1943), Lei nº 12.506/2011 (aviso prévio proporcional) e na Tabela Progressiva do INSS 2026 (Portaria Interministerial MPS/MF nº 2/2026).</li>
            <li><strong>Cálculos Tributários e IRRF:</strong> Fórmulas estruturadas em consonância com as Instruções Normativas da Secretaria da Receita Federal do Brasil (RFB), incluindo faixas de isenção e deduções por dependente.</li>
            <li><strong>Cotações e Índices Financeiros:</strong> Fórmulas padronizadas pela matemática financeira (Tabela Price, SAC e Juros Compostos exponenciais), aliadas a APIs de câmbio do Banco Central do Brasil.</li>
            <li><strong>Conversores Métricos:</strong> Estruturados sob os fatores rigorosos do Sistema Internacional de Unidades (SI), padronizados pelo INMETRO e normas ISO.</li>
          </ul>
        </section>

        <section class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            🛡️ Corpo Técnico e Responsabilidade Editorial
          </h2>
          <p>
            O ecossistema Tool Brasil é desenvolvido e mantido por engenheiros de software, especialistas em segurança da informação e analistas de dados focados em utilitários web de alto desempenho, sediados em São Paulo, Brasil.
          </p>
          <p>
            Antes de qualquer ferramenta entrar em produção, seus algoritmos passam por baterias de testes unitários automatizados cobrindo dezenas de cenários reais (rescisões com múltiplos anos, férias proporcionais, frações de 13º e testes de robustez decimal).
          </p>
        </section>

        <section class="p-5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs text-slate-700 leading-relaxed">
          <h3 class="font-bold text-emerald-900 text-sm flex items-center gap-2">🌱 Sustentabilidade do Projeto</h3>
          <p>
            A Tool Brasil é financiada exclusivamente por meio de <strong>anúncios programáticos do Google AdSense</strong> e parcerias transparentes. Não cobramos assinaturas e não vendemos dados de usuários. Ao utilizar nossas ferramentas com anúncios discretos, você viabiliza a manutenção contínua e gratuita desta infraestrutura para milhões de brasileiros.
          </p>
        </section>
      </div>
    `;
  } else if (id === 'contato') {
    content = `
      <div class="space-y-8 text-slate-800">
        <div class="border-b border-slate-200 pb-6">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-3">
            📬 Atendimento & Canais Oficiais
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Fale Conosco</h1>
          <p class="text-sm text-slate-600 mt-2 leading-relaxed">
            Tem alguma dúvida sobre os cálculos, sugestão de nova ferramenta, relato de inconsistência técnica ou proposta de parceria? Entre em contato pelos canais oficiais da Tool Brasil.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1 space-y-4">
            <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
              <h2 class="font-bold text-slate-900 text-sm">Canais Oficiais Diretos</h2>
              <div>
                <span class="font-semibold text-slate-500 block">📧 Suporte Geral & Sugestões:</span>
                <a href="mailto:contato@toolbrasil.com.br" class="font-mono font-bold text-emerald-700 hover:underline break-all">contato@toolbrasil.com.br</a>
              </div>
              <div>
                <span class="font-semibold text-slate-500 block">🔒 Encarregado de Dados (DPO LGPD):</span>
                <a href="mailto:dpo@toolbrasil.com.br" class="font-mono font-bold text-emerald-700 hover:underline break-all">dpo@toolbrasil.com.br</a>
              </div>
              <div>
                <span class="font-semibold text-slate-500 block">💼 Parcerias Comerciais & Mídia:</span>
                <a href="mailto:comercial@toolbrasil.com.br" class="font-mono font-bold text-emerald-700 hover:underline break-all">comercial@toolbrasil.com.br</a>
              </div>
              <hr class="border-slate-200" />
              <div class="space-y-1.5 text-[11px] text-slate-500">
                <p><strong>⏰ Horário de Atendimento:</strong> Segunda a Sexta, das 09:00 às 18:00 (Horário de Brasília).</p>
                <p><strong>⏱️ Prazo de Resposta:</strong> Até 24 a 48 horas úteis.</p>
                <p><strong>📍 Localização:</strong> São Paulo - SP, Brasil.</p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 space-y-4">
            <div class="bg-white p-6 rounded-xl border border-slate-200 space-y-4 text-xs text-slate-600 leading-relaxed">
              <h3 class="text-base font-bold text-slate-900">Perguntas Frequentes de Atendimento</h3>
              <div class="space-y-3">
                <div>
                  <h4 class="font-bold text-slate-800">Como reportar um erro em um cálculo ou simulador?</h4>
                  <p class="mt-0.5">Envie um e-mail para <strong>contato@toolbrasil.com.br</strong> descrevendo o valor informado, o resultado obtido e o resultado esperado com a respectiva fundamentação legal. Nossa equipe técnica de engenharia audita os cálculos em até 24 horas.</p>
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Posso solicitar o desenvolvimento de uma nova ferramenta?</h4>
                  <p class="mt-0.5">Sim! Adoramos receber sugestões da comunidade. Avaliamos a utilidade pública para adicioná-la gratuitamente ao acervo de ferramentas.</p>
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">Como exercer meus direitos previstos na LGPD?</h4>
                  <p class="mt-0.5">Envie uma mensagem com o assunto "Direitos LGPD" diretamente para nosso Encarregado pelo tratamento de dados no e-mail <strong>dpo@toolbrasil.com.br</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (id === 'privacidade') {
    content = `
      <div class="space-y-8 text-slate-800">
        <div class="border-b border-slate-200 pb-6">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-3">
            🔒 Conformidade Regulatória & LGPD
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Política de Privacidade</h1>
          <p class="text-xs text-slate-500 mt-2">
            Última revisão formal: Setembro de 2026 | Em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018) e Requisitos de Editores do Google AdSense.
          </p>
        </div>

        <div class="space-y-6 text-xs text-slate-600 leading-relaxed">
          <p>
            A privacidade e a soberania de dados de cada usuário que acessa o <strong>Tool Brasil</strong> (domínio <code>toolbrasil.com.br</code>) são tratadas com máxima seriedade e prioridade institucional. Elaboramos esta Política de Privacidade para apresentar de forma transparente e acessível como tratamos eventuais dados de navegação, quais tecnologias de cookies utilizamos e como você exerce plenamente seus direitos de titular.
          </p>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">1. Identificação do Controlador e do Encarregado (DPO)</h2>
            <p>
              O portal Tool Brasil atua como Controlador no tratamento de dados técnicos de navegação decorrentes do acesso ao site. Para qualquer questionamento, exercício de direitos da LGPD ou esclarecimentos regulatórios, você pode contatar nosso <strong>Encarregado de Proteção de Dados (DPO)</strong> diretamente através do endereço: <strong>dpo@toolbrasil.com.br</strong> ou pelo e-mail de suporte <strong>contato@toolbrasil.com.br</strong>.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">2. Princípio da Execução Local (Client-Side First) & Dados Sensíveis</h2>
            <p>
              Ao contrário de serviços convencionais que enviam suas informações para processamento em servidores de terceiros, <strong>a arquitetura da Tool Brasil foi construída sob o princípio de Privacidade por Padrão (Privacy by Default)</strong>:
            </p>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Calculadoras Financeiras e Trabalhistas:</strong> Salários, datas de admissão, valores de FGTS e rescisão são computados estritamente na memória volátil do seu próprio navegador. Nenhum valor financeiro é gravado em bancos de dados externos.</li>
              <li><strong>Geradores Sintéticos (CPF, CNPJ, Senhas):</strong> Algoritmos de geração e checagem de dígitos verificadores rodam via JavaScript localmente. Nós não catalogamos nem armazenamos dados gerados.</li>
              <li><strong>Tratamento de Arquivos e Textos:</strong> Conversores de imagem e formatadores de texto processam os dados no cliente sem jamais enviá-los para armazenamento em nossa nuvem.</li>
            </ul>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">3. Cookies, Google AdSense e Publicidade Personalizada</h2>
            <p>
              Para garantir a gratuidade irrestrita de nossos utilitários, veiculamos anúncios digitais gerenciados pelo programa <strong>Google AdSense</strong>, fornecido pela Google LLC. Em conformidade com os requisitos de transparência de editores do Google, informamos que:
            </p>
            <ul class="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>Cookies de Terceiros e Cookie DoubleClick DART:</strong> O Google e seus parceiros utilizam cookies (incluindo o cookie DART) para veicular anúncios aos usuários com base em visitas anteriores feitas a este ou a outros sites na internet.</li>
              <li><strong>Desativação de Publicidade Personalizada:</strong> Os usuários têm a faculdade de desativar a publicidade personalizada acessando as <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="text-emerald-700 font-bold underline">Configurações de Anúncios do Google</a>. Alternativamente, é possível desativar o uso de cookies de terceiros para publicidade personalizada acessando o portal internacional <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" class="text-emerald-700 font-bold underline">aboutads.info</a>.</li>
              <li><strong>Transparência de Parceiros de Tecnologia de Anúncios:</strong> O Google cumpre com os princípios do IAB TCF (Transparency and Consent Framework) e os requisitos vigentes da LGPD brasileira para coleta de consentimento do usuário.</li>
            </ul>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">4. Dados Coletados pelo Google Analytics 4</h2>
            <p>
              Utilizamos o <strong>Google Analytics 4</strong> para mensurar indicadores anônimos de audiência (como páginas mais acessadas, tipo de navegador, sistema operacional e tempo médio de permanência). O GA4 opera com mascaramento e anonimização de endereços IP, impossibilitando a identificação individual de qualquer usuário pela nossa equipe.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">5. Bases Legais para o Tratamento (Art. 7º da LGPD)</h2>
            <p>Todo e qualquer tratamento de dados realizado pela Tool Brasil encontra respaldo expresso na Lei nº 13.709/2018:</p>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Consentimento (Art. 7º, I):</strong> Aplicado ao uso de cookies de marketing e analíticos através do banner de preferências de navegação.</li>
              <li><strong>Legítimo Interesse (Art. 7º, IX):</strong> Para auditoria técnica da estabilidade do portal, prevenção de ciberataques DDoS e aperfeiçoamento contínuo das ferramentas.</li>
              <li><strong>Cumprimento de Obrigação Legal (Art. 7º, II):</strong> Para a guarda de registros de acesso à aplicação pelo prazo legal de 6 meses, conforme determinado pelo Artigo 15 do Marco Civil da Internet (Lei nº 12.965/2014).</li>
            </ul>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">6. Direitos do Titular de Dados Pessoais (Art. 18 da LGPD)</h2>
            <p>Na qualidade de titular de dados pessoais, você pode exercer a qualquer momento perante a Tool Brasil os seguintes direitos:</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span class="font-bold text-slate-800 block">✓ Confirmação e Acesso</span>
                <span class="text-[11px] text-slate-500">Confirmar a existência de tratamento e acessar dados técnicos.</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span class="font-bold text-slate-800 block">✓ Correção de Dados</span>
                <span class="text-[11px] text-slate-500">Solicitar a retificação de eventuais registros incompletos.</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span class="font-bold text-slate-800 block">✓ Eliminação e Revogação</span>
                <span class="text-[11px] text-slate-500">Revogar o consentimento e pedir a exclusão de cookies.</span>
              </div>
              <div class="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span class="font-bold text-slate-800 block">✓ Portabilidade</span>
                <span class="text-[11px] text-slate-500">Solicitar a portabilidade das informações técnicas.</span>
              </div>
            </div>
            <p class="pt-2">
              Para formalizar qualquer dessas solicitações, envie uma mensagem com o assunto <em>"Direitos LGPD"</em> para <strong>dpo@toolbrasil.com.br</strong>.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">7. Segurança da Informação e Criptografia</h2>
            <p>
              Implementamos protocolos de segurança modernos, incluindo tráfego 100% criptografado através de certificados SSL/TLS (HTTPS), proteção contra interceptação e cabeçalhos de segurança HTTP rigorosos (<code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy: strict-origin-when-cross-origin</code>).
            </p>
          </section>
        </div>
      </div>
    `;
  } else if (id === 'termos') {
    content = `
      <div class="space-y-8 text-slate-800">
        <div class="border-b border-slate-200 pb-6">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-3">
            ⚖️ Condições Gerais de Uso
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Termos de Uso</h1>
          <p class="text-xs text-slate-500 mt-2">
            Última revisão formal: Setembro de 2026 | Válido para todo o ecossistema Tool Brasil.
          </p>
        </div>

        <div class="space-y-6 text-xs text-slate-600 leading-relaxed">
          <p>
            Seja bem-vindo ao portal <strong>Tool Brasil</strong>. Ao navegar, interagir ou utilizar qualquer uma das ferramentas disponíveis sob o domínio <code>toolbrasil.com.br</code>, você declara expressamente que leu, compreendeu e concorda de forma irrestrita com os presentes Termos de Uso.
          </p>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">1. Gratuidade e Licença de Uso Sem Custos</h2>
            <p>
              O portal concede aos usuários uma licença pessoal, revogável, não-exclusiva e gratuita para acesso e utilização das calculadoras, conversores, geradores e ferramentas analíticas para finalidades pessoais, educacionais, operacionais e de apoio profissional diário. Não exigimos pagamentos ou cadastros prévios.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">2. Caráter Meramente Informativo & Isenção de Responsabilidade Profissional</h2>
            <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-2">
              <p class="font-bold flex items-center gap-1.5 text-xs">⚠️ Aviso Legal Obrigatório:</p>
              <p class="text-[11px] leading-relaxed">
                As calculadoras, simuladores trabalhistas e conversores tributários fornecidos pela Tool Brasil constituem instrumentos de <strong>estimativa matemática preliminar e apoio informativo</strong>. Eles <strong>não substituem, sob nenhuma hipótese</strong>, o parecer técnico formal de profissionais habilitados (contadores diplomados, advogados trabalhistas, consultores tributários registrados) nem os cálculos oficiais definitivos emitidos por órgãos públicos (Receita Federal, Ministério do Trabalho, INSS ou Poder Judiciário).
              </p>
            </div>
            <p>
              A Tool Brasil empenha seus melhores esforços de engenharia para manter todos os algoritmos atualizados. No entanto, declinamos de qualquer responsabilidade por decisões comerciais, financeiras, contratuais ou tributárias tomadas exclusivamente com base nas simulações realizadas nesta plataforma.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">3. Diretrizes de Uso dos Geradores de Dados Sintéticos</h2>
            <p>
              Nossas ferramentas de geração sintética (incluindo geradores de números de CPF, CNPJ e dados cadastrais fictícios) destinam-se <strong>exclusivamente a programadores, analistas de qualidade (QA), estudantes e designers para homologação de sistemas de software, preenchimento de mockups e testes automatizados de formulários</strong>.
            </p>
            <p class="font-bold text-slate-800">
              É terminantemente vedada a utilização de quaisquer dados fictícios aqui gerados para práticas de falsidade ideológica, estelionato, fraudes contra instituições financeiras ou qualquer ato tipificado como ilícito penal pela legislação brasileira (Código Penal, Decreto-Lei nº 2.848/1940).
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">4. Propriedade Intelectual</h2>
            <p>
              Todos os elementos da interface visual, logotipos, códigos-fonte de pré-renderização e compilações editoriais pertencem à Tool Brasil. É permitida a citação de trechos e o compartilhamento de links diretos, desde que referenciada a autoria.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-base font-bold text-slate-900">5. Legislação Aplicável e Foro</h2>
            <p>
              Estes Termos de Uso são regidos e interpretados em estrita conformidade com a legislação da República Federativa do Brasil. Fica eleito o Foro da Comarca de São Paulo, Estado de São Paulo, com exclusão de qualquer outro, por mais privilegiado que seja, para dirimir eventuais litígios oriundos deste instrumento.
            </p>
          </section>
        </div>
      </div>
    `;
  } else if (id === 'cookies') {
    content = `
      <div class="space-y-8 text-slate-800">
        <div class="border-b border-slate-200 pb-6">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-3">
            🍪 Gestão de Privacidade
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Preferências e Gestão de Cookies</h1>
          <p class="text-xs text-slate-500 mt-2">
            Saiba com transparência quais tecnologias de cookies utilizamos e como calibrar suas opções de navegação.
          </p>
        </div>

        <div class="space-y-6 text-xs text-slate-600 leading-relaxed">
          <p>
            Cookies são pequenos arquivos de texto armazenados no navegador do usuário ao visitar páginas na web. Eles desempenham papel crucial para lembrar suas preferências (como tema escuro/claro e histórico recente da calculadora) e permitir que o portal permaneça viável financeiramente através da monetização do Google AdSense.
          </p>

          <div class="space-y-3">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h3 class="font-bold text-slate-900 text-sm">1. Cookies Estritamente Necessários</h3>
              <p>Essenciais para o funcionamento seguro da aplicação, controle de sessão e persistência de preferências de tema. Não podem ser desativados sem comprometer a navegação.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h3 class="font-bold text-slate-900 text-sm">2. Cookies Analíticos (Google Analytics 4)</h3>
              <p>Coletam métricas anônimas e agregadas de tráfego, permitindo avaliar quais ferramentas são mais acessadas para priorizarmos novas implementações. Não identificam o usuário pessoalmente.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <h3 class="font-bold text-slate-900 text-sm">3. Cookies de Publicidade (Google AdSense & DoubleClick)</h3>
              <p>Utilizados pelo Google para exibir anúncios contextuais relevantes e prevenir a repetição excessiva do mesmo anúncio. O usuário pode desativá-los a qualquer momento nas <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" class="text-emerald-700 font-bold underline">Configurações de Anúncios do Google</a>.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (id === 'transparencia-adsense') {
    content = `
      <div class="space-y-8 text-slate-800">
        <div class="border-b border-slate-200 pb-6">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-3">
            💡 Monetização Responsável
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Transparência Google AdSense</h1>
          <p class="text-xs text-slate-500 mt-2">
            Entenda como a Tool Brasil se financia e mantém todas as suas utilidades 100% gratuitas para o público brasileiro.
          </p>
        </div>

        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            Manter uma infraestrutura web de alta disponibilidade, com mais de 130 ferramentas online, servidores em CDN global, certificados SSL de alta segurança e equipe contínua de atualização normativa exige recursos financeiros significativos.
          </p>
          <p>
            Optamos por financiar 100% dos custos através do programa <strong>Google AdSense</strong>. Isso nos permite não cobrar mensalidades, não colocar barreiras de pagamento (paywalls) e não exigir cartões de crédito dos usuários.
          </p>
          <div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <h3 class="font-bold text-emerald-900 text-sm">Compromissos Éticos de Publicidade:</h3>
            <ul class="list-disc pl-5 space-y-1 text-slate-700">
              <li>Zero anúncios enganosos ou disfarçados de botões do sistema.</li>
              <li>Zero anúncios pop-up invasivos que impeçam o uso das calculadoras.</li>
              <li>Cumprimento estrito das Políticas para Editores do Google (Google Publisher Policies).</li>
              <li>Proteção integral de dados pessoais em conformidade com a LGPD.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  } else if (id === 'anunciantes') {
    content = `
      <div class="space-y-8 text-slate-800">
        <div class="border-b border-slate-200 pb-6">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-3">
            📊 Mídia Kit & Oportunidades
          </span>
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">Anuncie na Tool Brasil</h1>
          <p class="text-xs text-slate-600 mt-2">
            Conecte sua empresa a um público qualificado de tomadores de decisão, contadores, profissionais de RH, programadores e consumidores financeiros em todo o Brasil.
          </p>
        </div>

        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <span class="text-2xl font-extrabold text-slate-900">138+</span>
              <p class="text-slate-500 font-bold">Ferramentas Ativas</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <span class="text-2xl font-extrabold text-slate-900">100%</span>
              <p class="text-slate-500 font-bold">Gratuito e Acessível</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
              <span class="text-2xl font-extrabold text-slate-900">Edge</span>
              <p class="text-slate-500 font-bold">CDN Global Ultrarrápida</p>
            </div>
          </div>

          <div class="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h3 class="font-bold text-slate-900 text-sm">Formatos Publicitários Disponíveis</h3>
            <p>
              Trabalhamos com inventário programático via Google AdSense/Google Ad Manager e formatos de mídia display direta (IAB Standard Banners: 728x90 Leaderboard, 300x250 Medium Rectangle, 300x600 Half Page), além de patrocínios de categorias temáticas.
            </p>
            <p>
              Para solicitar nosso mídia kit completo com métricas de audiência e tabela de valores, envie um e-mail para: <strong>comercial@toolbrasil.com.br</strong>.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: title, path: meta.path }
  ];
  const schemaTags = buildSchemaTags(crumbs);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function generateDeveloperHtml(
  template: string,
  robotsMeta: string = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
): string {
  const title = 'API Pública & Central de Desenvolvedores | Tool Brasil';
  const desc = 'Acesse dados oficiais do Brasil, geradores sintéticos com Módulo 11 (CPF, CNPJ) e tabelas trabalhistas via API REST estática de custo zero e widgets incorporáveis.';
  const canonical = 'https://www.toolbrasil.com.br/desenvolvedores';

  const content = `
    <div class="space-y-8 max-w-5xl mx-auto">
      <nav class="text-xs text-slate-500 font-semibold space-x-1.5 flex items-center">
        <a href="/" class="hover:underline">Início</a>
        <span>&gt;</span>
        <span class="text-slate-800 font-bold">Desenvolvedores & API</span>
      </nav>

      <div class="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-8 rounded-2xl border border-slate-800 space-y-4">
        <span class="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold border border-emerald-500/30">
          Tool Brasil Open API v1 & Widgets
        </span>
        <h1 class="text-3xl font-black tracking-tight">Central de Desenvolvedores & API Pública</h1>
        <p class="text-sm text-slate-300 leading-relaxed max-w-2xl">
          Endpoints REST estáticos de alta performance servidos diretamente na CDN (Edge Cache) com custo zero de infraestrutura, latência ultrabaixa e suporte completo a CORS (Cross-Origin Resource Sharing). Integre tabelas trabalhistas de 2026, calendários oficiais, catálogo de bancos COMPE/ISPB e lotes de massa de teste com validação oficial Módulo 11 ao seu backend, frontend ou pipeline de testes automatizados (QA).
        </p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-6">
        <h2 class="text-xl font-black text-slate-900">Endpoints Disponíveis (Custo Zero & Servidos via CDN)</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-200 text-slate-500 font-bold">
                <th class="py-2.5 px-3">Método</th>
                <th class="py-2.5 px-3">Endpoint</th>
                <th class="py-2.5 px-3">Descrição</th>
                <th class="py-2.5 px-3">Ação</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/cpf/gerar.json</td>
                <td class="py-2.5 px-3 text-slate-600">Lote de CPFs válidos sintéticos com Módulo 11 oficial e UF de origem.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/cpf/gerar.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/cnpj/gerar.json</td>
                <td class="py-2.5 px-3 text-slate-600">Lote de CNPJs sintéticos para homologação e desenvolvimento de sistemas.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/cnpj/gerar.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/tabelas/inss.json</td>
                <td class="py-2.5 px-3 text-slate-600">Tabela progressiva de alíquotas do INSS 2026, parcelas a deduzir e teto máximo.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/tabelas/inss.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/tabelas/irrf.json</td>
                <td class="py-2.5 px-3 text-slate-600">Tabela progressiva do IRRF, faixas de dedução e valor por dependente.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/tabelas/irrf.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/tabelas/salario-minimo.json</td>
                <td class="py-2.5 px-3 text-slate-600">Histórico completo do salário mínimo desde o Plano Real (1994) até o vigente.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/tabelas/salario-minimo.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/dados/bancos.json</td>
                <td class="py-2.5 px-3 text-slate-600">Catálogo das instituições financeiras do Brasil com código COMPE e ISPB.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/dados/bancos.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/dados/ddds.json</td>
                <td class="py-2.5 px-3 text-slate-600">Lista completa de códigos DDD de todos os estados e capitais.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/dados/ddds.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/dados/feriados-nacionais.json</td>
                <td class="py-2.5 px-3 text-slate-600">Calendário dos feriados nacionais brasileiros com datas oficiais.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/dados/feriados-nacionais.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
              <tr>
                <td class="py-2.5 px-3"><span class="bg-emerald-600 text-white font-mono font-bold px-2 py-0.5 rounded">GET</span></td>
                <td class="py-2.5 px-3 font-mono font-bold text-slate-800">/api/v1/ferramentas.json</td>
                <td class="py-2.5 px-3 text-slate-600">Catálogo integral com todas as ferramentas ativas no portal.</td>
                <td class="py-2.5 px-3"><a href="/api/v1/ferramentas.json" target="_blank" class="text-emerald-600 font-bold hover:underline">Ver JSON →</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
        <h2 class="text-xl font-black text-slate-900">Exemplos Práticos de Integração (cURL, JavaScript & TypeScript)</h2>
        <p class="text-xs text-slate-600 leading-relaxed">
          Como os endpoints JSON da versão 1 são gerados estaticamente durante o build de produção e distribuídos via Vercel Edge Network com cabeçalho <code>Access-Control-Allow-Origin: *</code>, você não precisa de chaves de API nem tokens OAuth. Basta realizar uma requisição HTTP <code>GET</code> padrão direto do navegador ou do servidor:
        </p>
        <pre class="bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">curl -s https://www.toolbrasil.com.br/api/v1/tabelas/inss.json | jq .</pre>
        <pre class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto">const res = await fetch('https://www.toolbrasil.com.br/api/v1/dados/bancos.json');
const data = await res.json();
console.log('Total bancos:', data.length);</pre>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
        <h2 class="text-xl font-black text-slate-900">Widgets Embebíveis para Blogs e Portais</h2>
        <p class="text-xs text-slate-600 leading-relaxed">
          Incorpore utilitários da Tool Brasil diretamente em suas postagens ou páginas sem programar back-end. Cole o código HTML abaixo:
        </p>
        <div class="bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
          &lt;div id="tool-brasil-widget" data-tool="validador-documentos" data-theme="light"&gt;&lt;/div&gt;<br />
          &lt;script src="https://www.toolbrasil.com.br/widget.js" async&gt;&lt;/script&gt;
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
        <h2 class="text-lg font-black text-slate-900">Política de Cache, Limites, Boas Práticas REST e Conformidade LGPD</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <h3 class="font-bold text-slate-900">Disponibilidade CDN & Cache-Control</h3>
            <p>As respostas carregam políticas de cache em borda (<code>public, max-age=86400, stale-while-revalidate=604800</code>), permitindo que ERPs, planilhas corporativas, scripts de CI/CD e testes de integração consumam as tabelas oficiais brasileiras sem throttling artificial nem chaves pagas.</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <h3 class="font-bold text-slate-900">Dados Sintéticos Exclusivos para QA</h3>
            <p>Os lotes em <code>/api/v1/cpf/gerar.json</code> e <code>/api/v1/cnpj/gerar.json</code> são gerados matematicamente apenas com dígitos verificadores válidos em Módulo 11 oficial, sem acessar bases governamentais e sem expor dados pessoais reais sob a LGPD (Lei nº 13.709/2018).</p>
          </div>
        </div>
        <div class="space-y-2.5 text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          <h3 class="text-sm font-bold text-slate-900">Perguntas Frequentes de Integração</h3>
          <dl class="space-y-2">
            <div>
              <dt class="font-bold text-slate-800">A API exige autenticação via Bearer Token ou chave de API?</dt>
              <dd>Não. Todos os endpoints públicos <code>/api/v1/*.json</code> operam sem autenticação e respondem diretamente em JSON UTF-8 com suporte CORS liberado para aplicações web e backends.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Com que frequência as tabelas de INSS, IRRF e Salário Mínimo são revisadas?</dt>
              <dd>Sempre que ocorrem atualizações anuais publicadas no Diário Oficial da União (DOU) pela Receita Federal, Ministério da Previdência Social ou Banco Central, os endpoints estáticos são regenerados no build de produção.</dd>
            </div>
            <div>
              <dt class="font-bold text-slate-800">Posso incorporar os widgets da Tool Brasil em portais corporativos ou blogs em WordPress?</dt>
              <dd>Sim. Basta colar as duas linhas do snippet JavaScript assíncrono em seu HTML para carregar componentes leves e responsivos sem impacto negativo na renderização principal.</dd>
            </div>
          </dl>
        </div>
        <div class="flex flex-wrap gap-2 text-xs pt-2">
          <a href="/guias/seguranca-digital-senhas-fortes-hash-cpf-sintetico-lgpd" class="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200">Guia de Dados Sintéticos e LGPD →</a>
          <a href="/guias/auditoria-tecnica-dns-ssl-headers-http-seguranca-sites" class="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-bold border border-slate-200">Auditoria Técnica Web →</a>
        </div>
      </div>
    </div>
  `;

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Desenvolvedores & API', path: '/desenvolvedores' }
  ];

  const webApiSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebAPI',
    name: 'Tool Brasil Public API v1',
    description: 'API Pública e Gratuita para consulta de tabelas trabalhistas, econômicas e geradores sintéticos de documentos no Brasil.',
    url: 'https://www.toolbrasil.com.br/desenvolvedores',
    documentation: 'https://www.toolbrasil.com.br/desenvolvedores',
    provider: {
      '@type': 'Organization',
      name: 'Tool Brasil',
      url: 'https://www.toolbrasil.com.br'
    },
    termsOfService: 'https://www.toolbrasil.com.br/termos-de-uso'
  };

  const breadcrumb = getBreadcrumbSchema(crumbs);
  let schemaTags = `<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n</script>`;
  schemaTags += `\n<script type="application/ld+json">\n${JSON.stringify(webApiSchema, null, 2)}\n</script>`;

  return buildHtmlPage(template, title, desc, canonical, content, schemaTags, robotsMeta);
}

run();
