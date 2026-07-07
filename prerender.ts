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
import { CATEGORIES, TOOLS, PROGRAMMATIC_PAGES } from './src/toolsData';
import { EXTRA_PROGRAMMATIC_PAGES } from './src/programmaticExtra';

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

  const templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // 1. Gerar Home Page (substitui o index.html principal para incluir conteúdo inicial)
  console.log(' - Pré-renderizando: Home (/)');
  const homeHtml = generateHomeHtml(templateHtml);
  fs.writeFileSync(TEMPLATE_PATH, homeHtml, 'utf-8');

  // 2. Gerar páginas de Categorias
  CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').forEach(cat => {
    console.log(` - Pré-renderizando categoria: /${cat.id}`);
    const catHtml = generateCategoryHtml(templateHtml, cat);
    const catDir = path.join(DIST_DIR, cat.id);
    fs.mkdirSync(catDir, { recursive: true });
    fs.writeFileSync(path.join(catDir, 'index.html'), catHtml, 'utf-8');
  });

  // 3. Gerar páginas de Ferramentas
  TOOLS.forEach(tool => {
    console.log(` - Pré-renderizando ferramenta: /${tool.categoryId}/${tool.slug}`);
    const toolHtml = generateToolHtml(templateHtml, tool);
    const toolDir = path.join(DIST_DIR, tool.categoryId, tool.slug);
    fs.mkdirSync(toolDir, { recursive: true });
    fs.writeFileSync(path.join(toolDir, 'index.html'), toolHtml, 'utf-8');
  });

  // 4. Gerar páginas Programáticas
  Object.entries(ALL_PROGRAMMATIC_PAGES).forEach(([id, page]) => {
    console.log(` - Pré-renderizando pág. programática: /programatico/${id}`);
    const progHtml = generateProgrammaticHtml(templateHtml, id, page);
    const progDir = path.join(DIST_DIR, 'programatico', id);
    fs.mkdirSync(progDir, { recursive: true });
    fs.writeFileSync(path.join(progDir, 'index.html'), progHtml, 'utf-8');
  });

  // 5. Gerar páginas Institucionais
  const institutionalPageIds = ['sobre', 'contato', 'privacidade', 'termos', 'cookies', 'transparencia-adsense', 'anunciantes'];
  institutionalPageIds.forEach(id => {
    console.log(` - Pré-renderizando pág. institucional: /institucional/${id}`);
    const instHtml = generateInstitutionalHtml(templateHtml, id);
    const instDir = path.join(DIST_DIR, 'institucional', id);
    fs.mkdirSync(instDir, { recursive: true });
    fs.writeFileSync(path.join(instDir, 'index.html'), instHtml, 'utf-8');
  });

  console.log(`\n✅ Pré-renderização concluída com sucesso!`);
}

/**
 * Schema.org JSON-LD Structured Data Helpers
 */
function getBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
  const items = crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `https://toolbrasil.com.br${c.path}`
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
    url: `https://toolbrasil.com.br/${tool.categoryId}/${tool.slug}`,
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

function buildSchemaTags(crumbs: { name: string; path: string }[], toolObj?: any) {
  const breadcrumb = getBreadcrumbSchema(crumbs);
  let tags = `<script type="application/ld+json">\n${JSON.stringify(breadcrumb, null, 2)}\n</script>`;
  if (toolObj) {
    const webApp = getWebApplicationSchema(toolObj);
    tags += `\n<script type="application/ld+json">\n${JSON.stringify(webApp, null, 2)}\n</script>`;
    
    const faq = getFAQPageSchema(toolObj);
    if (faq) {
      tags += `\n<script type="application/ld+json">\n${JSON.stringify(faq, null, 2)}\n</script>`;
    }
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
  const canonical = "https://toolbrasil.com.br/";

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
  const schemaTags = buildSchemaTags(crumbs);
  return buildHtmlPage(template, title, desc, canonical, content, schemaTags);
}

function generateCategoryHtml(template: string, cat: any): string {
  const title = `${cat.name} | Tool Brasil`;
  const desc = `${cat.description} Acesse ferramentas gratuitas na categoria ${cat.name} na central de utilitários Tool Brasil.`;
  const canonical = `https://toolbrasil.com.br/${cat.id}`;

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

function generateToolHtml(template: string, tool: any): string {
  const title = `${tool.title} | Tool Brasil`;
  const desc = tool.shortDescription;
  const canonical = `https://toolbrasil.com.br/${tool.categoryId}/${tool.slug}`;

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

  const relatedHtml = tool.relatedToolIds && tool.relatedToolIds.length > 0
    ? `
      <div class="space-y-3 pt-2">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Ferramentas Relacionadas</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${tool.relatedToolIds.map((rId: string) => {
            const rTool = TOOLS.find(t => t.id === rId);
            if (!rTool) return '';
            return `
              <a href="/${rTool.categoryId}/${rTool.slug}" class="p-3 bg-slate-50 border rounded-lg text-xs hover:border-emerald-600 transition block">
                <span class="font-bold text-slate-800 block">${rTool.title}</span>
                <span class="text-[10px] text-slate-500 block">${rTool.shortDescription.substring(0, 60)}...</span>
              </a>
            `;
          }).join('')}
        </div>
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

      <!-- INTERACTIVE AREA PLACEHOLDER -->
      <div class="bg-white border border-dashed border-slate-350 p-12 rounded-2xl text-center shadow-xs">
        <div class="inline-flex p-3 bg-emerald-50 rounded-full text-emerald-600 mb-3">
          <svg class="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        </div>
        <p class="text-xs font-bold text-slate-700">Carregando Calculadora Interativa Local...</p>
        <p class="text-[10px] text-slate-400 mt-1 max-w-sm mx-auto">Para utilizar as funções interativas, ative o JavaScript no seu navegador. O processamento dos dados é executado localmente em seu dispositivo.</p>
      </div>

      <!-- RICH TEXT CONTENT FOR CRAWLERS -->
      <div class="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm space-y-6">
        
        <div class="space-y-3 leading-relaxed">
          <h2 class="text-lg font-black text-slate-900">Sobre a ferramenta</h2>
          <p class="text-xs text-slate-600">${tool.longIntro}</p>
        </div>

        <hr class="border-slate-150" />

        <div class="space-y-3 leading-relaxed">
          <h2 class="text-lg font-black text-slate-900">Como Funciona?</h2>
          <p class="text-xs text-slate-600">${tool.howItWorks}</p>
        </div>

        ${tipsHtml ? `<hr class="border-slate-150" />${tipsHtml}` : ''}
        ${faqsHtml ? `<hr class="border-slate-150" />${faqsHtml}` : ''}
        ${relatedHtml ? `<hr class="border-slate-150" />${relatedHtml}` : ''}

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
  const canonical = `https://toolbrasil.com.br/programatico/${id}`;

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

  const canonical = `https://toolbrasil.com.br/institucional/${id}`;

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
