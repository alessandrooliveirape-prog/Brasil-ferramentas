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
import { EXTRA_PROGRAMMATIC_PAGES } from './src/programmaticExtra.ts';

const ALL_PROGRAMMATIC_PAGES = { ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminhos dos diretórios
const DIST_DIR = path.resolve(__dirname, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

function run() {
  console.log('🚀 Iniciando a pré-renderização estática (SSG) das páginas...');

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

  // 5. Gerar páginas Institucionais
  const institutionalPageIds = ['sobre', 'contato', 'privacidade', 'termos', 'cookies', 'transparencia-adsense', 'anunciantes'];
  institutionalPageIds.forEach(id => {
    console.log(` - Pré-renderizando pág. institucional: /institucional/${id}`);
    const instHtml = generateInstitutionalHtml(cleanTemplate, id);
    const instDir = path.join(DIST_DIR, 'institucional', id);
    fs.mkdirSync(instDir, { recursive: true });
    fs.writeFileSync(path.join(instDir, 'index.html'), instHtml, 'utf-8');
  });

  // 6. Gerar Sitemap.xml unificado e sincronizado
  console.log(' - Gerando sitemap.xml completo...');
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

  // Páginas Programáticas
  Object.keys(ALL_PROGRAMMATIC_PAGES).forEach(id => {
    xml += `  <url>\n    <loc>${host}/programatico/${id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  // Institucionais
  instPages.forEach(id => {
    xml += `  <url>\n    <loc>${host}/institucional/${id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.4</priority>\n  </url>\n`;
  });

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
function buildHtmlPage(template: string, title: string, desc: string, canonicalUrl: string, bodyContent: string, schemaJsonLd?: string): string {
  let html = template;

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
          <nav class="hidden lg:flex items-center gap-6 text-xs font-extrabold text-slate-800">
            <a href="/calculadoras" class="hover:text-emerald-700 transition-colors py-1">Calculadoras</a>
            <a href="/conversores" class="hover:text-emerald-700 transition-colors py-1">Conversores</a>
            <a href="/geradores" class="hover:text-emerald-700 transition-colors py-1">Geradores</a>
            <a href="/ferramentas-web" class="hover:text-emerald-700 transition-colors py-1">Ferramentas Web</a>
            <a href="/utilitarios" class="hover:text-emerald-700 transition-colors py-1">Utilitários</a>
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
            </nav>
          </div>

          <div class="bg-white p-4 rounded-xl border border-slate-300 shadow-xs space-y-2 text-xs">
            <span class="text-[10px] font-extrabold text-slate-900 uppercase flex items-center gap-1.5">Conteúdo Programático</span>
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
            <a href="/institucional/sobre" class="hover:underline font-bold text-slate-700">Sobre Nós</a>
            <a href="/institucional/contato" class="hover:underline font-bold text-slate-700">Fale Conosco</a>
            <a href="/institucional/privacidade" class="hover:underline font-bold text-slate-700">Política de Privacidade</a>
            <a href="/institucional/termos" class="hover:underline font-bold text-slate-700">Termos de Uso</a>
            <a href="/institucional/cookies" class="hover:underline font-bold text-slate-700">Gestão de Cookies</a>
            <a href="/institucional/transparencia-adsense" class="hover:underline font-bold text-slate-700">Transparência AdSense</a>
            <a href="/institucional/anunciantes" class="hover:underline font-bold text-slate-700">Anunciantes</a>
          </div>
          <p>&copy; 2026 Tool Brasil. Ferramentas online 100% gratuitas desenvolvidas em conformidade regulatória.</p>
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
  const title = "Tool Brasil | Ferramentas Online Gratuitas";
  const desc = "Acesse calculadoras financeiras, geradores de documentos (CPF/CNPJ), conversores de moedas e unidades. Mais de 40 ferramentas úteis livres de cadastro.";
  const canonical = "https://www.toolbrasil.com.br/";

  const content = `
    <div class="space-y-8">
      <div class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-white space-y-4 shadow-lg">
        <h1 class="text-3xl font-extrabold tracking-tight">Ferramentas Online Gratuitas para o seu Dia a Dia</h1>
        <p class="text-emerald-100 max-w-xl">
          Sua central de utilitários rápidos e precisos para cálculos trabalhistas, segurança de dados, conversores de medidas e diagnósticos web. 100% grátis e sem cadastro.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            ⭐ Ferramentas em Destaque
          </h2>
          <p class="text-xs text-slate-600">Utilitários selecionados de alta utilidade:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="/calculadoras/calculadora-de-juros-compostos" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Juros Compostos</span>
              <span class="text-[10px] text-slate-500 block">Investimentos e projeção de riqueza.</span>
            </a>
            <a href="/geradores/gerador-de-cpf" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Gerador de CPF</span>
              <span class="text-[10px] text-slate-500 block">Geração de documentos para testes de software.</span>
            </a>
            <a href="/conversores/converter-real-para-dolar" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Real para Dólar</span>
              <span class="text-[10px] text-slate-500 block">Conversão com cotação comercial atualizada.</span>
            </a>
            <a href="/geradores/gerador-de-senha-segura" class="p-3 bg-slate-50 border rounded-xl hover:border-emerald-600 transition block">
              <span class="font-bold text-xs text-slate-900 block">Senha Segura</span>
              <span class="text-[10px] text-slate-500 block">Geração de senhas fortes com criptografia.</span>
            </a>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
          <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            💡 Por que utilizar a Tool Brasil?
          </h2>
          <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p><strong>1. Processamento Local (Client-Side):</strong> Suas informações privadas como documentos, dados financeiros e senhas são processados estritamente em seu navegador. Nós nunca enviamos ou salvamos seus dados confidenciais em servidores servidores.</p>
            <p><strong>2. Interface Otimizada:</strong> Desenvolvido sob rigorosos princípios de web design para carregar de forma instantânea tanto em dispositivos móveis quanto em computadores de mesa.</p>
            <p><strong>3. 100% Gratuito:</strong> Sem assinaturas ocultas, taxas ou limites de utilização. O portal é financiado através de anúncios discretos do AdSense e parcerias reguladas.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const crumbs = [{ name: 'Início', path: '/' }];
  const schemaTags = buildSchemaTags(crumbs, undefined, true);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function generateCategoryHtml(template: string, cat: any): string {
  const title = `${cat.name} | Tool Brasil`;
  const desc = `${cat.description} Acesse ferramentas gratuitas na categoria ${cat.name} na central de utilitários Tool Brasil.`;
  const canonical = `https://www.toolbrasil.com.br/${cat.id}`;

  const catTools = TOOLS.filter(t => t.categoryId === cat.id);

  const content = `
    <div class="space-y-6">
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
    </div>
  `;

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: cat.name, path: `/${cat.id}` }
  ];
  const schemaTags = buildSchemaTags(crumbs);
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
  return `
    <div class="space-y-3 pt-2">
      <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
        <span>📖</span> Exemplo Prático de Utilização Passo a Passo
      </h3>
      <div class="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-xs space-y-3 text-slate-700 leading-relaxed">
        <p>
          <strong>Cenário Simulado:</strong> Imagine que você precise realizar a apuração rápida utilizando a ferramenta <strong>${tool.title}</strong> para tomada de decisão imediata ou conferência de valores.
        </p>
        <ol class="list-decimal pl-5 space-y-1.5 font-medium">
          <li><strong>Etapa 1 (Entrada de Dados):</strong> Preencha os campos principais do formulário com as informações base (valores numéricos, opções de formatação ou parâmetros desejados).</li>
          <li><strong>Etapa 2 (Processamento Automático):</strong> Nosso motor matemático em JavaScript executa as fórmulas aplicáveis instantaneamente na memória do seu dispositivo.</li>
          <li><strong>Etapa 3 (Conferência do Resultado):</strong> O resultado discriminado é consolidado em tela, permitindo copiar o valor com 1 clique ou gerar um relatório detalhado.</li>
        </ol>
        <p class="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-lg border border-emerald-200/60">
          💡 <em>Dica de Ouro:</em> Para resultados recorrentes, salve a página em seus favoritos (<kbd class="px-1.5 py-0.5 bg-slate-200 rounded font-mono text-[10px]">Ctrl+D</kbd>) ou utilize o recurso de compartilhamento rápido para enviar a simulação para clientes ou colegas de trabalho.
        </p>
      </div>
    </div>
  `;
}

function getInternalLinkingGridHtml(tool: any): string {
  const categorySiblings = TOOLS.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).slice(0, 6);
  const topGlobalIds = ['juros-compostos', 'cpf', 'rescisao-trabalhista', 'real-para-dolar', 'gerador-whatsapp', 'sorteador'];
  const topGlobals = TOOLS.filter(t => topGlobalIds.includes(t.id) && t.id !== tool.id).slice(0, 4);

  return `
    <div class="space-y-6 pt-4">
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

function generateProgrammaticHtml(template: string, id: string, page: any): string {
  const title = `${page.title} | Tool Brasil`;
  const desc = page.description;
  const canonical = `https://www.toolbrasil.com.br/programatico/${id}`;

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

      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-4">
        <h2 class="text-lg font-black text-slate-900">Consulta de Informações Relacionadas</h2>
        <p class="text-xs text-slate-600 leading-relaxed">
          Esta página reúne dados históricos e informativos consolidados para consulta pública no Brasil. A pesquisa e filtragem dos dados são efetuadas localmente no navegador, entregando alta velocidade de consulta sem anúncios intrusivos ou necessidade de pagamentos.
        </p>

        <div class="bg-slate-50 border border-slate-200 p-8 rounded-xl text-center text-xs text-slate-500">
          <p class="font-bold text-slate-700 mb-1">Painel Dinâmico de Banco de Dados</p>
          <p>Utilize os filtros no topo da página ao carregar para fazer buscas em tempo real.</p>
        </div>
      </div>
    </div>
  `;

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: page.title, path: `/programatico/${id}` }
  ];
  const schemaTags = buildSchemaTags(crumbs);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function generateInstitutionalHtml(template: string, id: string): string {
  let title = '';
  let desc = '';
  let content = '';

  const canonical = `https://www.toolbrasil.com.br/institucional/${id}`;

  if (id === 'sobre') {
    title = 'Sobre a Tool Brasil';
    desc = 'Conheça nossa missão, valores e o ecossistema de utilitários online gratuitos.';
    content = `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-slate-900">Sobre a Tool Brasil</h1>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            A <strong>Tool Brasil</strong> nasceu em 2024 com o propósito de ser o maior e mais eficiente ecossistema de utilitários online gratuitos da internet brasileira. Nós acreditamos que ferramentas úteis devem ser acessíveis, rápidas e descomplicadas, sem a necessidade de cadastros, instalações ou pagamentos ocultos.
          </p>
          <p>
            Nosso portal oferece mais de 40 ferramentas gratuitas organizadas em categorias como calculadoras financeiras e trabalhistas, conversores de unidades e moedas, geradores de documentos e dados, ferramentas de rede e diagnóstico web, além de utilitários de texto e formatação. Cada ferramenta é desenvolvida com foco em precisão, performance e facilidade de uso.
          </p>
          <p>
            <strong>Nossa missão:</strong> Democratizar o acesso a ferramentas digitais de qualidade para todos os brasileiros, independentemente de sua renda ou nível de conhecimento técnico. Acreditamos que a tecnologia deve servir para simplificar o dia a dia, e não para complicá-lo.
          </p>
          <p>
            <strong>Nossos valores:</strong> Transparência (todas as ferramentas são claras sobre como funcionam), privacidade (processamento local sempre que possível, sem coleta desnecessária de dados), excelência técnica (cálculos precisos e atualizados conforme a legislação brasileira) e compromisso social (ferramentas 100% gratuitas, sem limite de uso).
          </p>
          <h2 class="font-bold text-sm text-slate-800 pt-4">Nossa Equipe</h2>
          <p>
            Somos formados por desenvolvedores independentes, analistas de dados e consultores jurídicos que trabalham em conjunto para garantir que todas as nossas calculadoras (especialmente as trabalhistas e financeiras) estejam sempre alinhadas com as leis e alíquotas mais recentes publicadas pelo Diário Oficial da União (DOU).
          </p>
          <h2 class="font-bold text-sm text-slate-800 pt-4">Nosso Compromisso</h2>
          <p>
            Não cobramos assinaturas e nunca esconderemos nossas funcionalidades atrás de paywalls. O financiamento da Tool Brasil provém integralmente da publicidade exibida nas páginas. Isso nos permite manter nossos servidores rodando 24 horas por dia, 7 dias por semana, com 99.9% de uptime para que você nunca fique na mão.
          </p>
        </div>
      </div>
    `;
  } else if (id === 'contato') {
    title = 'Fale Conosco - Suporte e Parcerias';
    desc = 'Entre em contato com a equipe da Tool Brasil para sugestões, reclamações ou parcerias comerciais.';
    content = `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-slate-900">Fale Conosco</h1>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>Tem alguma sugestão de nova ferramenta? Reportou algum erro de cálculo? Entre em contato conosco diretamente pelo e-mail:</p>
          <div class="p-4 bg-emerald-50 border rounded-lg max-w-sm">
            <p class="font-bold text-emerald-800">📧 E-mail:</p>
            <p class="mt-1 text-slate-800 font-mono font-bold">contato@toolbrasil.com.br</p>
          </div>
          <p>Nosso prazo de retorno para mensagens de suporte é de até 48 horas úteis.</p>
        </div>
      </div>
    `;
  } else if (id === 'privacidade') {
    title = 'Política de Privacidade (LGPD)';
    desc = 'Nossa política regulatória detalhando a coleta de cookies, segurança e conformidade à LGPD.';
    content = `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-slate-900">Política de Privacidade</h1>
        <p class="text-[10px] text-slate-400">Última atualização: Junho de 2026</p>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>No <strong>Tool Brasil</strong>, a sua privacidade é de extrema importância para nós. Elaboramos esta política regulatória em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) para detalhar quais dados são coletados, armazenados e tratados durante sua navegação em nosso domínio toolbrasil.com.br.</p>
          
          <h2 class="font-bold text-sm text-slate-800">1. Responsável pelo Tratamento de Dados</h2>
          <p>O Tool Brasil é um portal de ferramentas online mantido pelo proprietário do domínio toolbrasil.com.br.</p>

          <h2 class="font-bold text-sm text-slate-800">2. Dados Coletados e Finalidade</h2>
          <p><strong>2.1 Dados de navegação:</strong> Coleta automática de IP, tipo de navegador e tempo de navegação pelo servidor e parceiros de anúncios (Google Analytics/AdSense).</p>
          <p><strong>2.2 Processamento local (Client-side):</strong> A maioria das calculadoras roda localmente no navegador. Dados confidenciais como CPFs gerados ou informações financeiras inseridas nunca são enviados aos nossos servidores.</p>

          <h2 class="font-bold text-sm text-slate-800">3. Cookies e Rastreamento</h2>
          <p>Utilizamos cookies essenciais de sistema, cookies estatísticos do Google Analytics e cookies de anúncio do Google AdSense para exibir publicidade segmentada.</p>

          <h2 class="font-bold text-sm text-slate-800 pt-2">4. Base Legal para o Tratamento (Art. 7º da LGPD)</h2>
          <p>Tratamos seus dados com base no seu <strong>consentimento expresso</strong> (fornecido ao aceitar nossos cookies) e pelo nosso <strong>legítimo interesse</strong> em garantir a segurança do portal, combater fraudes e exibir publicidade contextual que financia o projeto.</p>
          
          <h2 class="font-bold text-sm text-slate-800 pt-2">5. Compartilhamento de Dados com Terceiros</h2>
          <p>Seus dados de navegação anonimizados podem ser processados por:</p>
          <ul class="list-disc pl-5">
             <li><strong>Google Analytics:</strong> Para fins estatísticos e de performance.</li>
             <li><strong>Google AdSense:</strong> Para personalização de anúncios e medição de resultados.</li>
             <li><strong>Vercel / Cloudflare:</strong> Nossos provedores de infraestrutura e CDN para garantir segurança e velocidade.</li>
          </ul>

          <h2 class="font-bold text-sm text-slate-800 pt-2">6. Seus Direitos como Titular (Art. 18 da LGPD)</h2>
          <p>Você tem o direito de solicitar a confirmação, acesso, correção, anonimização e exclusão dos seus dados coletados pelos nossos servidores. Para exercer qualquer um destes direitos, bem como revogar o consentimento para uso de cookies, entre em contato através de nosso e-mail de suporte em <strong>contato@toolbrasil.com.br</strong>.</p>
          
          <h2 class="font-bold text-sm text-slate-800 pt-2">7. Segurança da Informação</h2>
          <p>Implementamos rigorosas medidas técnicas (criptografia SSL/TLS) e administrativas para proteger os dados pessoais de acessos não autorizados ou situações acidentais de destruição, perda, alteração ou comunicação indevida.</p>
        </div>
      </div>
    `;
  } else if (id === 'termos') {
    title = 'Termos de Uso e Isenções Legais';
    desc = 'Termos de serviço e isenção de responsabilidade dos resultados matemáticos do portal.';
    content = `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-slate-900">Termos de Uso</h1>
        <p class="text-[10px] text-slate-400">Última atualização: Junho de 2026</p>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>Ao acessar ou usar nossos serviços através do domínio toolbrasil.com.br, você concorda em se submeter aos termos e condições descritos abaixo.</p>
          
          <h2 class="font-bold text-sm text-slate-800">1. Licença de Uso Sem Custos</h2>
          <p>Todas as ferramentas do Tool Brasil são distribuídas de modo 100% gratuito, sem necessidade de cadastro, registro ou pagamento.</p>

          <h2 class="font-bold text-sm text-slate-800">2. Isenção de Responsabilidade</h2>
          <p>As ferramentas e calculadoras têm caráter informativo. Os resultados fornecidos não substituem a consulta a contadores, advogados trabalhistas ou assessores financeiros autorizados.</p>
        </div>
      </div>
    `;
  } else if (id === 'cookies') {
    title = 'Preferências e Gestão de Cookies';
    desc = 'Gerencie sua privacidade e configure o uso de cookies de marketing e analíticos.';
    content = `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-slate-900">Preferências de Cookies</h1>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>Utilizamos cookies para personalizar conteúdo, anúncios e analisar o nosso tráfego. Você pode ajustar suas preferências de privacidade a qualquer momento através do seu navegador ou desativando cookies de terceiros em suas configurações de segurança.</p>
        </div>
      </div>
    `;
  } else if (id === 'transparencia-adsense') {
    title = 'Transparência de Monetização Google AdSense';
    desc = 'Como o portal financia sua infraestrutura com anúncios contextuais programáticos do Google.';
    content = `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-slate-900">Transparência Google AdSense</h1>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>A Tool Brasil é um serviço gratuito financiado primordialmente por anúncios exibidos pelo Google AdSense. Esses anúncios pagam os servidores e a manutenção do portal.</p>
          <p>Os anúncios respeitam todas as diretrizes de privacidade da LGPD e os cookies são geridos pelo Google de acordo com as preferências selecionadas pelo usuário.</p>
        </div>
      </div>
    `;
  } else if (id === 'anunciantes') {
    title = 'Anuncie Conosco - Mídia Kit da Tool Brasil';
    desc = 'Anuncie seus produtos ou serviços financeiros para milhares de brasileiros qualificados.';
    content = `
      <div class="space-y-6">
        <h1 class="text-2xl font-bold text-slate-900">Anuncie na Tool Brasil</h1>
        <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>Disponibilizamos espaço para banners publicitários diretos e parcerias editoriais focadas em finanças, utilidades, tecnologia e mercado dev brasileiro.</p>
          <p>Entre em contato através do e-mail comercial <strong>contato@toolbrasil.com.br</strong> para solicitar nosso mídia kit completo.</p>
        </div>
      </div>
    `;
  }

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: title, path: `/institucional/${id}` }
  ];
  const schemaTags = buildSchemaTags(crumbs);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

run();
