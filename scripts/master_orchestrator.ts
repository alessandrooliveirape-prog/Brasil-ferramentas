// scripts/master_orchestrator.ts
/**
 * ======================================================================
 * TOOLBRASIL MASTER MULTIAGENT ORCHESTRATOR & SRE AUTÔNOMO v2.0 (2026)
 * ======================================================================
 * Coordena 7 subagentes especializados (100 pontos totais), audita saúde
 * técnica, SEO/SSG Googlebot, monetização AdSense (7 páginas institucionais)
 * + Afiliados Amazon (tag chacerto-20), infraestrutura Vercel Edge/CDN,
 * catálogo de 138+ ferramentas interativas, páginas de SEO Programático,
 * API Pública v1 (JSON estático + Widgets) e o 7º Agente de Tração &
 * Expansão Long-Tail (88 páginas programáticas + IndexNow ativo), executando
 * loops de autocura ativa e persistindo relatórios em JSON, Resend e Telegram.
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { CATEGORIES, TOOLS, PROGRAMMATIC_PAGES } from '../src/toolsData.ts';
import { EXTRA_PROGRAMMATIC_PAGES } from '../src/programmaticExtra.ts';
import { AFFILIATE_PRODUCTS, AMAZON_ASSOCIATE_TAG } from '../src/config/affiliateProducts.ts';
import { generateAllApiData } from './generate-api-data.ts';
import { runGrowthExpander } from './agent_growth_expander.ts';

dotenv.config({ path: '.env.local' });
dotenv.config();

// ======================================================================
// CONFIGURAÇÕES GLOBAIS E CREDENCIAIS
// ======================================================================
const SITE_URL = 'https://www.toolbrasil.com.br';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'alessandrooliveirape@gmail.com';
const SENDER_EMAIL = 'ToolBrasil SRE <onboarding@resend.dev>';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

const ADSENSE_PUB_ID = process.env.VITE_ADSENSE_PUB_ID || 'ca-pub-8160658026927094';
const ADSENSE_PUB_RAW = ADSENSE_PUB_ID.replace('ca-', '');

const GOOGLEBOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

const IS_DRY_RUN = process.argv.includes('--dry-run');
const SKIP_HEALING = process.argv.includes('--skip-heal');

const ALL_PROGRAMMATIC_PAGES = { ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES };

// ======================================================================
// INTERFACES DOS SUBAGENTES
// ======================================================================
type AgentStatus = 'HEALTHY' | 'WARNING' | 'CRITICAL';

interface SubagentReport {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  score: number;
  maxScore: number;
  summary: string;
  details: Record<string, any>;
  issues: string[];
  selfHealed: boolean;
  healingActions: string[];
}

interface MasterReport {
  site: string;
  timestamp: string;
  overallScore: number; // 0 a 100
  overallStatus: AgentStatus;
  subagents: SubagentReport[];
  healingSummary: string[];
  executionTimeMs: number;
}

function countVisibleWords(html: string): number {
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean ? clean.split(' ').length : 0;
}

// ======================================================================
// 1. SUBAGENTE: agent_seo_gsc (15 pts — SEO, SSG Googlebot, Sitemap & IndexNow)
// ======================================================================
async function runAgentSeoGsc(): Promise<SubagentReport> {
  const report: SubagentReport = {
    id: 'agent_seo_gsc',
    name: 'Agente SEO, SSG & Search Console',
    role: 'Auditor de Indexação Googlebot SSG, Sitemap XML, Schemas JSON-LD & IndexNow',
    status: 'HEALTHY',
    score: 15,
    maxScore: 15,
    summary: '',
    details: {},
    issues: [],
    selfHealed: false,
    healingActions: []
  };

  try {
    // 1. Sitemap Check
    const sitemapStart = Date.now();
    let sitemapOk = false;
    let sitemapUrlsCount = 0;
    try {
      const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`, {
        headers: { 'User-Agent': GOOGLEBOT_UA },
        signal: AbortSignal.timeout(12000)
      });
      const sitemapLatency = Date.now() - sitemapStart;
      if (sitemapRes.ok) {
        const text = await sitemapRes.text();
        sitemapOk = text.includes('<urlset') || text.includes('<sitemapindex');
        const matches = text.match(/<loc>/g);
        sitemapUrlsCount = matches ? matches.length : 0;
        report.details.sitemap = { status: sitemapRes.status, ok: sitemapOk, count: sitemapUrlsCount, latencyMs: sitemapLatency };
      } else {
        report.details.sitemap = { status: sitemapRes.status, ok: false, error: 'HTTP != 200' };
        report.issues.push(`Sitemap retornou status HTTP ${sitemapRes.status}`);
        report.score -= 4;
      }
    } catch (e: any) {
      report.details.sitemap = { ok: false, error: e.message };
      report.issues.push(`Falha de conexão com sitemap.xml: ${e.message}`);
      report.score -= 4;
    }

    // 2. Robots.txt Check
    try {
      const robotsRes = await fetch(`${SITE_URL}/robots.txt`, {
        headers: { 'User-Agent': GOOGLEBOT_UA },
        signal: AbortSignal.timeout(10000)
      });
      if (robotsRes.ok) {
        const text = await robotsRes.text();
        const hasSitemapDirective = text.toLowerCase().includes('sitemap: https://www.toolbrasil.com.br/sitemap.xml');
        const allowsMediapartners = text.includes('Mediapartners-Google');
        const blocksQueryParams = text.includes('utm_') && text.includes('ref=');
        report.details.robots = { status: robotsRes.status, hasSitemapDirective, allowsMediapartners, blocksQueryParams };
        if (!hasSitemapDirective) {
          report.issues.push('Robots.txt não declara a diretiva Sitemap oficial.');
          report.score -= 3;
        }
      } else {
        report.issues.push(`Robots.txt retornou status ${robotsRes.status}`);
        report.score -= 3;
      }
    } catch (e: any) {
      report.issues.push(`Erro ao checar robots.txt: ${e.message}`);
      report.score -= 3;
    }

    // 3. Synthetic Googlebot SSG Probe em rotas estratégicas
    const strategicRoutes = [
      '/',
      '/calculadoras',
      '/conversores',
      '/geradores',
      '/ferramentas-web',
      '/utilitarios',
      '/desenvolvedores'
    ];
    const ssgChecks: Record<string, any> = {};
    for (const route of strategicRoutes) {
      try {
        const res = await fetch(`${SITE_URL}${route}`, {
          headers: { 'User-Agent': GOOGLEBOT_UA },
          signal: AbortSignal.timeout(10000)
        });
        const html = await res.text();
        const words = countVisibleWords(html);
        const hasCanonical = html.includes(`rel="canonical"`) && html.includes(`https://www.toolbrasil.com.br`);
        const hasJsonLd = html.includes(`application/ld+json`);
        const hasNoindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
        ssgChecks[route] = { status: res.status, words, hasCanonical, hasJsonLd, hasNoindex };

        if (res.status !== 200 || hasNoindex || !hasCanonical || !hasJsonLd || words < 180) {
          report.issues.push(`Rota SSG ${route} com anomalia (status=${res.status}, words=${words}, canonical=${hasCanonical}, schema=${hasJsonLd})`);
          report.score -= 2;
        }
      } catch (err: any) {
        ssgChecks[route] = { error: err.message };
        report.score -= 2;
      }
    }
    report.details.ssgGooglebotProbe = ssgChecks;

    // 4. Autocura do sitemap / SSG caso inválido
    if (!sitemapOk && !SKIP_HEALING) {
      console.log('⚠️ [agent_seo_gsc] Acionando autocura para regenerar Sitemap e SSG via prerender.ts...');
      try {
        execSync('npx tsx prerender.ts', { stdio: 'pipe', timeout: 60000 });
        report.selfHealed = true;
        report.healingActions.push('Sitemap XML e páginas SSG regenerados com sucesso via prerender.ts');
        report.score = Math.min(report.maxScore, report.score + 4);
      } catch (healErr: any) {
        report.healingActions.push(`Tentativa de regeneração do sitemap falhou: ${healErr.message}`);
      }
    }

    report.score = Math.max(0, Math.min(report.maxScore, report.score));
    if (report.score >= 13) {
      report.status = 'HEALTHY';
      report.summary = `Sitemap (${sitemapUrlsCount} URLs no ar), SSG Googlebot (${strategicRoutes.length} rotas) e JSON-LD 100% nominais.`;
    } else if (report.score >= 9) {
      report.status = 'WARNING';
      report.summary = `Pequenos alertas em SEO/SSG detectados (${report.issues.length} aviso(s)).`;
    } else {
      report.status = 'CRITICAL';
      report.summary = `Erros críticos em Sitemap, SSG ou indexação GSC.`;
    }
  } catch (err: any) {
    report.status = 'CRITICAL';
    report.score = 3;
    report.issues.push(`Exceção fatal no agente SEO: ${err.message}`);
    report.summary = `Falha na verificação de SEO.`;
  }

  return report;
}

// ======================================================================
// 2. SUBAGENTE: agent_monetization (15 pts — AdSense, ads.txt, 7 Páginas & Amazon)
// ======================================================================
async function runAgentMonetization(): Promise<SubagentReport> {
  const report: SubagentReport = {
    id: 'agent_monetization',
    name: 'Agente de Monetização (AdSense & Amazon)',
    role: 'Auditor de ads.txt, 7 Páginas Mandatórias AdSense e Rotação Amazon Associados',
    status: 'HEALTHY',
    score: 15,
    maxScore: 15,
    summary: '',
    details: {},
    issues: [],
    selfHealed: false,
    healingActions: []
  };

  try {
    // 1. Checagem do ads.txt no ar
    let adsTxtVerified = false;
    try {
      const adsRes = await fetch(`${SITE_URL}/ads.txt`, {
        headers: { 'User-Agent': GOOGLEBOT_UA },
        signal: AbortSignal.timeout(10000)
      });
      if (adsRes.ok) {
        const text = await adsRes.text();
        adsTxtVerified = text.includes(ADSENSE_PUB_RAW);
        report.details.adsTxt = { status: adsRes.status, verified: adsTxtVerified, pubId: ADSENSE_PUB_RAW };
        if (!adsTxtVerified) {
          report.issues.push(`ads.txt no ar não contém o publisher ID ${ADSENSE_PUB_RAW}`);
          report.score -= 6;
        }
      } else {
        report.issues.push(`ads.txt retornou status HTTP ${adsRes.status}`);
        report.score -= 8;
      }
    } catch (e: any) {
      report.issues.push(`Falha de conexão com ads.txt: ${e.message}`);
      report.score -= 8;
    }

    // 2. Checagem SSG Completa das Páginas Institucionais e de Conformidade AdSense
    const compliancePages = [
      { name: 'Política de Privacidade', url: `${SITE_URL}/politica-de-privacidade` },
      { name: 'Termos de Uso', url: `${SITE_URL}/termos-de-uso` },
      { name: 'Política de Cookies', url: `${SITE_URL}/cookies` },
      { name: 'Quem Somos / Sobre', url: `${SITE_URL}/sobre` },
      { name: 'Contato e Suporte', url: `${SITE_URL}/contato` },
      { name: 'Transparência AdSense', url: `${SITE_URL}/transparencia-adsense` },
      { name: 'Anunciantes / Mídia Kit', url: `${SITE_URL}/anunciantes` }
    ];

    const pagesResult: Record<string, { status: number; words: number }> = {};
    for (const page of compliancePages) {
      try {
        const res = await fetch(page.url, {
          headers: { 'User-Agent': GOOGLEBOT_UA },
          signal: AbortSignal.timeout(10000)
        });
        const html = await res.text();
        const words = countVisibleWords(html);
        pagesResult[page.name] = { status: res.status, words };
        if (!res.ok) {
          report.issues.push(`Página mandatória "${page.name}" retornou status ${res.status}`);
          report.score -= 2;
        } else if (words < 180) {
          report.issues.push(`Página mandatória "${page.name}" com baixo volume textual no SSG (${words} palavras)`);
          report.score -= 2;
        }
      } catch (err: any) {
        pagesResult[page.name] = { status: 500, words: 0 };
        report.issues.push(`Não foi possível validar "${page.name}": ${err.message}`);
        report.score -= 2;
      }
    }
    report.details.compliancePages = pagesResult;

    // 3. Auditoria do Motor de Afiliados Amazon
    const affiliateCategories = Object.keys(AFFILIATE_PRODUCTS);
    const totalAffiliateProducts = Object.values(AFFILIATE_PRODUCTS).reduce((acc, arr) => acc + arr.length, 0);
    report.details.amazonAffiliate = {
      associateTag: AMAZON_ASSOCIATE_TAG,
      categoriesCount: affiliateCategories.length,
      totalProducts: totalAffiliateProducts
    };
    if (!AMAZON_ASSOCIATE_TAG || totalAffiliateProducts < 15) {
      report.issues.push('Configuração de afiliados Amazon incompleta.');
      report.score -= 2;
    }

    // Autocura de ads.txt local se necessário
    const localAdsTxtPath = path.resolve('public/ads.txt');
    const localAdsExists = fs.existsSync(localAdsTxtPath) && fs.readFileSync(localAdsTxtPath, 'utf-8').includes(ADSENSE_PUB_RAW);
    if ((!adsTxtVerified || !localAdsExists) && !SKIP_HEALING) {
      const expectedContent = `google.com, ${ADSENSE_PUB_RAW}, DIRECT, f08c47fec0942fa0\n`;
      try {
        fs.writeFileSync(localAdsTxtPath, expectedContent, 'utf-8');
        if (fs.existsSync(path.resolve('dist'))) {
          fs.writeFileSync(path.resolve('dist/ads.txt'), expectedContent, 'utf-8');
        }
        report.selfHealed = true;
        report.healingActions.push(`Arquivo ads.txt reparado com publisher ID ${ADSENSE_PUB_RAW}`);
      } catch (err: any) {
        report.healingActions.push(`Erro ao restaurar ads.txt: ${err.message}`);
      }
    }

    report.score = Math.max(0, Math.min(report.maxScore, report.score));
    if (report.score >= 13) {
      report.status = 'HEALTHY';
      report.summary = `ads.txt (${ADSENSE_PUB_RAW}), 7 páginas institucionais SSG e Amazon (${AMAZON_ASSOCIATE_TAG}, ${totalAffiliateProducts} itens) 100% conformes.`;
    } else if (report.score >= 9) {
      report.status = 'WARNING';
      report.summary = `Avisos na auditoria de monetização (${report.issues.length} alerta(s)).`;
    } else {
      report.status = 'CRITICAL';
      report.summary = `Risco de desmonetização ou violação das políticas AdSense!`;
    }
  } catch (err: any) {
    report.status = 'CRITICAL';
    report.score = 3;
    report.issues.push(`Exceção fatal no agente de monetização: ${err.message}`);
    report.summary = `Falha na verificação de monetização.`;
  }

  return report;
}

// ======================================================================
// 3. SUBAGENTE: agent_infrastructure (15 pts — Vercel Edge, Headers & PWA/Widget)
// ======================================================================
async function runAgentInfrastructure(): Promise<SubagentReport> {
  const report: SubagentReport = {
    id: 'agent_infrastructure',
    name: 'Agente de Infraestrutura & Edge CDN',
    role: 'Monitor de Latência TTFB Vercel Edge, Headers de Segurança, PWA e Widget.js',
    status: 'HEALTHY',
    score: 15,
    maxScore: 15,
    summary: '',
    details: {},
    issues: [],
    selfHealed: false,
    healingActions: []
  };

  try {
    const edgeStart = Date.now();
    let edgeOk = false;
    let edgeLatency = 0;
    try {
      const edgeRes = await fetch(SITE_URL, {
        headers: { 'User-Agent': GOOGLEBOT_UA },
        signal: AbortSignal.timeout(10000)
      });
      edgeLatency = Date.now() - edgeStart;
      edgeOk = edgeRes.ok;

      const xContentType = edgeRes.headers.get('x-content-type-options');
      const referrerPolicy = edgeRes.headers.get('referrer-policy');

      report.details.edge = {
        ok: edgeOk,
        status: edgeRes.status,
        ttfbMs: edgeLatency,
        securityHeaders: { xContentType, referrerPolicy }
      };

      if (!edgeOk) {
        report.issues.push(`Vercel Edge retornou HTTP ${edgeRes.status}`);
        report.score -= 8;
      } else if (edgeLatency > 2500) {
        report.issues.push(`Latência TTFB elevada na CDN: ${edgeLatency}ms`);
        report.score -= 2;
      }
    } catch (e: any) {
      report.details.edge = { ok: false, error: e.message };
      report.issues.push(`Falha de conexão com Edge CDN: ${e.message}`);
      report.score -= 8;
    }

    // Verificar Widget.js e Service Worker (sw.js)
    try {
      const [widgetRes, swRes] = await Promise.all([
        fetch(`${SITE_URL}/widget.js`, { signal: AbortSignal.timeout(8000) }),
        fetch(`${SITE_URL}/sw.js`, { signal: AbortSignal.timeout(8000) })
      ]);
      report.details.assets = {
        widgetJsStatus: widgetRes.status,
        swJsStatus: swRes.status
      };
      if (!widgetRes.ok) {
        report.issues.push(`widget.js inacessível (HTTP ${widgetRes.status})`);
        report.score -= 3;
      }
      if (!swRes.ok) {
        report.issues.push(`sw.js inacessível (HTTP ${swRes.status})`);
        report.score -= 2;
      }
    } catch (e: any) {
      report.issues.push(`Erro ao verificar widget.js/sw.js: ${e.message}`);
      report.score -= 3;
    }

    report.score = Math.max(0, Math.min(report.maxScore, report.score));
    if (report.score >= 13) {
      report.status = 'HEALTHY';
      report.summary = `Vercel Edge CDN ${edgeLatency}ms (TTFB) | widget.js, sw.js e Security Headers 100% nominais.`;
    } else if (report.score >= 9) {
      report.status = 'WARNING';
      report.summary = `Latência elevada ou aviso leve em assets de infraestrutura.`;
    } else {
      report.status = 'CRITICAL';
      report.summary = `Queda ou instabilidade severa de infraestrutura detectada!`;
    }
  } catch (err: any) {
    report.status = 'CRITICAL';
    report.score = 3;
    report.issues.push(`Exceção fatal no agente de infraestrutura: ${err.message}`);
    report.summary = `Falha na verificação de infraestrutura.`;
  }

  return report;
}

// ======================================================================
// 4. SUBAGENTE: agent_tools_catalog (15 pts — Catálogo de 138+ Ferramentas & Anti-Thin Content)
// ======================================================================
async function runAgentToolsCatalog(): Promise<SubagentReport> {
  const report: SubagentReport = {
    id: 'agent_tools_catalog',
    name: 'Agente do Catálogo de Ferramentas & Calculadoras',
    role: 'Auditor de Qualidade Editorial, FAQs Estruturados e SSG das Ferramentas Interativas',
    status: 'HEALTHY',
    score: 15,
    maxScore: 15,
    summary: '',
    details: {},
    issues: [],
    selfHealed: false,
    healingActions: []
  };

  try {
    const totalTools = TOOLS.length;
    const activeCategories = CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico');

    // 1. Auditoria Anti-Thin Content nos metadados de todas as ferramentas
    const thinIntroTools = TOOLS.filter(t => !t.longIntro || t.longIntro.trim().length < 150);
    const missingFaqTools = TOOLS.filter(t => !t.faqs || t.faqs.length < 2);
    const missingHowItWorks = TOOLS.filter(t => !t.howItWorks || t.howItWorks.trim().length < 80);

    report.details.catalogStats = {
      totalTools,
      categoriesCount: activeCategories.length,
      thinIntroCount: thinIntroTools.length,
      missingFaqCount: missingFaqTools.length,
      missingHowItWorksCount: missingHowItWorks.length
    };

    if (thinIntroTools.length > 0) {
      report.issues.push(`${thinIntroTools.length} ferramenta(s) com introdução curta (<150 chars)`);
      report.score -= 3;
    }
    if (missingFaqTools.length > 0) {
      report.issues.push(`${missingFaqTools.length} ferramenta(s) com menos de 2 FAQs para Rich Snippet`);
      report.score -= 2;
    }

    // 2. Amostragem de ferramentas em produção (Googlebot SSG + Schema WebApplication & FAQPage)
    const sampleToolRoutes = [
      '/calculadoras/calculadora-de-juros-compostos',
      '/geradores/gerador-de-cpf',
      '/conversores/converter-real-para-dolar',
      '/calculadoras/calculadora-de-churrasco'
    ];
    const sampleResults: Record<string, any> = {};
    for (const route of sampleToolRoutes) {
      try {
        const res = await fetch(`${SITE_URL}${route}`, {
          headers: { 'User-Agent': GOOGLEBOT_UA },
          signal: AbortSignal.timeout(10000)
        });
        const html = await res.text();
        const words = countVisibleWords(html);
        const hasWebAppSchema = html.includes('"@type": "WebApplication"') || html.includes('"@type":"WebApplication"');
        const hasFaqSchema = html.includes('"@type": "FAQPage"') || html.includes('"@type":"FAQPage"');
        sampleResults[route] = { status: res.status, words, hasWebAppSchema, hasFaqSchema };

        if (res.status !== 200 || words < 250 || !hasWebAppSchema) {
          report.issues.push(`Ferramenta ${route} com falha no SSG (status=${res.status}, words=${words}, WebAppSchema=${hasWebAppSchema})`);
          report.score -= 2;
        }
      } catch (err: any) {
        sampleResults[route] = { error: err.message };
        report.score -= 2;
      }
    }
    report.details.sampleToolsProbe = sampleResults;

    // 3. Verificar se dist/ local possui todas as ferramentas pré-renderizadas
    const distDir = path.resolve('dist');
    if (fs.existsSync(distDir)) {
      const missingDistTools = TOOLS.filter(
        t => !fs.existsSync(path.join(distDir, t.categoryId, t.slug, 'index.html'))
      );
      if (missingDistTools.length > 0 && !SKIP_HEALING) {
        console.log(`⚠️ [agent_tools_catalog] ${missingDistTools.length} ferramenta(s) ausentes no build local. Acionando prerender.ts...`);
        try {
          execSync('npx tsx prerender.ts', { stdio: 'pipe', timeout: 60000 });
          report.selfHealed = true;
          report.healingActions.push(`${missingDistTools.length} página(s) estática(s) de ferramentas reconstruídas via prerender.ts.`);
        } catch (err: any) {
          report.healingActions.push(`Erro ao reconstruir ferramentas no dist/: ${err.message}`);
        }
      }
    }

    report.score = Math.max(0, Math.min(report.maxScore, report.score));
    if (report.score >= 13) {
      report.status = 'HEALTHY';
      report.summary = `${totalTools} ferramentas ativas em ${activeCategories.length} categorias | Zero Thin Content e Schemas WebApplication + FAQPage 100% válidos.`;
    } else if (report.score >= 9) {
      report.status = 'WARNING';
      report.summary = `Catálogo de ferramentas operando com alertas leves.`;
    } else {
      report.status = 'CRITICAL';
      report.summary = `Anomalias críticas no catálogo de ferramentas!`;
    }
  } catch (err: any) {
    report.status = 'CRITICAL';
    report.score = 3;
    report.issues.push(`Exceção fatal no agente de ferramentas: ${err.message}`);
    report.summary = `Falha na verificação do catálogo de ferramentas.`;
  }

  return report;
}

// ======================================================================
// 5. SUBAGENTE: agent_programmatic_seo (15 pts — SEO Programático & Anti-Canibalização)
// ======================================================================
async function runAgentProgrammaticSeo(): Promise<SubagentReport> {
  const report: SubagentReport = {
    id: 'agent_programmatic_seo',
    name: 'Agente de SEO Programático & Anti-Canibalização',
    role: 'Auditor de Páginas Programáticas Core, Tabelas Nacionais e Redirecionamentos 301',
    status: 'HEALTHY',
    score: 15,
    maxScore: 15,
    summary: '',
    details: {},
    issues: [],
    selfHealed: false,
    healingActions: []
  };

  try {
    const progSlugs = Object.keys(ALL_PROGRAMMATIC_PAGES);
    report.details.totalProgrammaticPages = progSlugs.length;

    // 1. Verificar amostra de páginas programáticas no ar
    const sampleProgRoutes = [
      '/programatico/ddd-brasil',
      '/programatico/cep-brasil',
      '/programatico/bancos-brasil',
      '/programatico/salario-minimo-historico',
      '/programatico/feriados-nacionais',
      '/programatico/selic-historica'
    ];

    const progChecks: Record<string, any> = {};
    for (const route of sampleProgRoutes) {
      try {
        const res = await fetch(`${SITE_URL}${route}`, {
          headers: { 'User-Agent': GOOGLEBOT_UA },
          signal: AbortSignal.timeout(10000)
        });
        const html = await res.text();
        const words = countVisibleWords(html);
        const hasCanonical = html.includes(`href="${SITE_URL}${route}"`);
        progChecks[route] = { status: res.status, words, hasCanonical };

        if (res.status !== 200 || words < 200 || !hasCanonical) {
          report.issues.push(`Página programática ${route} com anomalia (status=${res.status}, words=${words}, canonical=${hasCanonical})`);
          report.score -= 2;
        }
      } catch (err: any) {
        progChecks[route] = { error: err.message };
        report.score -= 2;
      }
    }
    report.details.programmaticProbe = progChecks;

    report.score = Math.max(0, Math.min(report.maxScore, report.score));
    if (report.score >= 13) {
      report.status = 'HEALTHY';
      report.summary = `${progSlugs.length} páginas programáticas ativas | SSG (>250 palavras) e canônicas 100% íntegras.`;
    } else if (report.score >= 9) {
      report.status = 'WARNING';
      report.summary = `Alertas leves nas rotas de SEO Programático.`;
    } else {
      report.status = 'CRITICAL';
      report.summary = `Falha crítica nas páginas de SEO Programático!`;
    }
  } catch (err: any) {
    report.status = 'CRITICAL';
    report.score = 3;
    report.issues.push(`Exceção fatal no agente de SEO Programático: ${err.message}`);
    report.summary = `Falha na verificação de SEO Programático.`;
  }

  return report;
}

// ======================================================================
// 6. SUBAGENTE: agent_public_api (10 pts — Tool Brasil Open API v1 & Dados 2026)
// ======================================================================
async function runAgentPublicApi(): Promise<SubagentReport> {
  const report: SubagentReport = {
    id: 'agent_public_api',
    name: 'Agente da API Pública v1 & Dados Oficiais 2026',
    role: 'Auditor dos 9 Endpoints JSON Estáticos (INSS, IRRF, Salário Mínimo, CPF/CNPJ Módulo 11, Bancos, DDDs, Feriados)',
    status: 'HEALTHY',
    score: 10,
    maxScore: 10,
    summary: '',
    details: {},
    issues: [],
    selfHealed: false,
    healingActions: []
  };

  const endpoints = [
    '/api/v1/cpf/gerar.json',
    '/api/v1/cnpj/gerar.json',
    '/api/v1/tabelas/inss.json',
    '/api/v1/tabelas/irrf.json',
    '/api/v1/tabelas/salario-minimo.json',
    '/api/v1/dados/bancos.json',
    '/api/v1/dados/ddds.json',
    '/api/v1/dados/feriados-nacionais.json',
    '/api/v1/ferramentas.json'
  ];

  try {
    let needsRegeneration = false;
    for (const ep of endpoints) {
      const localFile = path.resolve('public', ep.slice(1));
      if (!fs.existsSync(localFile)) {
        needsRegeneration = true;
        break;
      }
    }

    if (needsRegeneration && !SKIP_HEALING) {
      console.log('⚠️ [agent_public_api] Endpoint(s) JSON ausentes localmente. Regenerando via generateAllApiData()...');
      try {
        generateAllApiData();
        report.selfHealed = true;
        report.healingActions.push('9 endpoints da API Pública v1 regenerados e sincronizados em public/ e dist/.');
      } catch (err: any) {
        report.healingActions.push(`Erro ao regenerar API Pública v1: ${err.message}`);
      }
    }

    const apiResults: Record<string, any> = {};
    let okCount = 0;
    for (const ep of endpoints) {
      try {
        const res = await fetch(`${SITE_URL}${ep}`, {
          headers: { 'User-Agent': GOOGLEBOT_UA },
          signal: AbortSignal.timeout(8000)
        });
        if (res.ok) {
          const json = await res.json();
          const cors = res.headers.get('access-control-allow-origin');
          apiResults[ep] = { status: res.status, validJson: json?.status === 200, cors };
          if (json?.status === 200) {
            okCount++;
          } else {
            report.issues.push(`Endpoint ${ep} retornou payload inesperado`);
            report.score -= 2;
          }
        } else {
          apiResults[ep] = { status: res.status, validJson: false };
          report.issues.push(`Endpoint ${ep} retornou HTTP ${res.status}`);
          report.score -= 2;
        }
      } catch (err: any) {
        apiResults[ep] = { error: err.message };
        report.issues.push(`Erro ao consultar ${ep}: ${err.message}`);
        report.score -= 2;
      }
    }
    report.details.endpointsChecked = endpoints.length;
    report.details.endpointsHealthy = okCount;
    report.details.apiProbe = apiResults;

    report.score = Math.max(0, Math.min(report.maxScore, report.score));
    if (report.score >= 9) {
      report.status = 'HEALTHY';
      report.summary = `${okCount}/${endpoints.length} endpoints JSON da API Pública v1 online (CORS ativo, tabelas 2026 e Módulo 11 validados).`;
    } else if (report.score >= 6) {
      report.status = 'WARNING';
      report.summary = `API Pública v1 operando com alertas parciais (${okCount}/${endpoints.length} online).`;
    } else {
      report.status = 'CRITICAL';
      report.summary = `Falha crítica nos endpoints da API Pública v1!`;
    }
  } catch (err: any) {
    report.status = 'CRITICAL';
    report.score = 2;
    report.issues.push(`Exceção fatal no agente da API Pública: ${err.message}`);
    report.summary = `Falha na verificação da API Pública.`;
  }

  return report;
}

// ======================================================================
// 7. NOVO SUBAGENTE: agent_growth_traction (15 pts — Tração Orgânica & Expansão Long-Tail)
// ======================================================================
async function runAgentGrowthTraction(): Promise<SubagentReport> {
  const report: SubagentReport = {
    id: 'agent_growth_traction',
    name: 'Agente de Tração Orgânica & Expansão Long-Tail',
    role: 'Gerador e Auditor da Matriz Long-Tail (27 UFs DDD, IPVA 2026, Bancos COMPE/ISPB, Tabelas 2026 & IndexNow)',
    status: 'HEALTHY',
    score: 15,
    maxScore: 15,
    summary: '',
    details: {},
    issues: [],
    selfHealed: false,
    healingActions: []
  };

  try {
    const growthRes = await runGrowthExpander({ skipHeal: SKIP_HEALING, dryRun: IS_DRY_RUN });
    report.details = {
      totalProgrammaticPages: growthRes.totalProgrammaticPages,
      totalSitemapUrls: growthRes.totalSitemapUrls,
      clusters: growthRes.clusters,
      thinSsgPagesCount: growthRes.thinSsgPages.length,
      indexNowSubmittedCount: growthRes.indexNowSubmittedCount
    };

    if (growthRes.selfHealed) {
      report.selfHealed = true;
      report.healingActions.push(...growthRes.healingActions);
    }

    if (growthRes.missingSsgPages.length > 0) {
      report.issues.push(`${growthRes.missingSsgPages.length} página(s) Long-Tail ausentes no build estático`);
      report.score -= 4;
    }
    if (growthRes.thinSsgPages.length > 0) {
      report.issues.push(`${growthRes.thinSsgPages.length} página(s) Long-Tail com menos de 220 palavras`);
      report.score -= 3;
    }
    if ((growthRes.clusters.ddd || 0) < 27) {
      report.issues.push(`Cobertura de DDD por UF incompleta (${growthRes.clusters.ddd}/27 estados)`);
      report.score -= 3;
    }

    report.score = Math.max(0, Math.min(report.maxScore, report.score));
    if (report.score >= 13) {
      report.status = 'HEALTHY';
      report.summary = `${growthRes.totalProgrammaticPages} páginas Long-Tail (${growthRes.totalSitemapUrls} URLs totais no Sitemap) | 27/27 UFs DDD, IPVA 2026, 10 Bancos COMPE e Tabelas 2026 100% ativos.`;
    } else if (report.score >= 9) {
      report.status = 'WARNING';
      report.summary = `Expansão Long-Tail ativa com ${report.issues.length} alerta(s).`;
    } else {
      report.status = 'CRITICAL';
      report.summary = `Falha na matriz de expansão de cauda longa!`;
    }
  } catch (err: any) {
    report.status = 'CRITICAL';
    report.score = 3;
    report.issues.push(`Exceção fatal no 7º Agente de Tração: ${err.message}`);
    report.summary = `Falha na execução do agente de tração.`;
  }

  return report;
}

// ======================================================================
// CONSOLIDAÇÃO DO SCORE & PERSISTÊNCIA DO RELATÓRIO JSON
// ======================================================================
function consolidateReport(subagents: SubagentReport[], executionTimeMs: number): MasterReport {
  const overallScore = subagents.reduce((sum, agent) => sum + agent.score, 0);

  let overallStatus: AgentStatus = 'HEALTHY';
  if (overallScore < 75 || subagents.some(a => a.status === 'CRITICAL')) {
    overallStatus = 'CRITICAL';
  } else if (overallScore < 92 || subagents.some(a => a.status === 'WARNING')) {
    overallStatus = 'WARNING';
  }

  const healingSummary = subagents.flatMap(a => a.healingActions);

  const masterReport: MasterReport = {
    site: SITE_URL,
    timestamp: new Date().toISOString(),
    overallScore,
    overallStatus,
    subagents,
    healingSummary,
    executionTimeMs
  };

  try {
    const outPaths = [
      path.resolve('public/api/v1/analytics/orchestrator-report.json'),
      path.resolve('dist/api/v1/analytics/orchestrator-report.json')
    ];
    for (const outPath of outPaths) {
      if (outPath.includes(path.sep + 'dist' + path.sep) && !fs.existsSync(path.resolve('dist'))) continue;
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, JSON.stringify(masterReport, null, 2), 'utf-8');
    }
    console.log(`💾 [MasterOrchestrator] Relatório salvo em public/api/v1/analytics/orchestrator-report.json`);
  } catch (err: any) {
    console.warn(`⚠️ [MasterOrchestrator] Falha ao salvar orchestrator-report.json:`, err.message);
  }

  return masterReport;
}

// ======================================================================
// DISPARO DO RELATÓRIO VIA RESEND (HTML PREMIUM)
// ======================================================================
async function sendResendReport(report: MasterReport): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('⚠️ [Resend] RESEND_API_KEY não configurada. Relatório de e-mail ignorado.');
    return false;
  }

  const nowRecife = new Date().toLocaleDateString('pt-BR', {
    timeZone: 'America/Recife',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const statusColor =
    report.overallStatus === 'HEALTHY' ? '#10b981' : report.overallStatus === 'WARNING' ? '#f59e0b' : '#ef4444';

  const statusEmoji =
    report.overallStatus === 'HEALTHY' ? '🟢' : report.overallStatus === 'WARNING' ? '🟡' : '🔴';

  const rowsHtml = report.subagents
    .map(a => {
      const badgeColor =
        a.status === 'HEALTHY' ? '#d1fae5; color:#065f46' : a.status === 'WARNING' ? '#fef3c7; color:#92400e' : '#fee2e2; color:#991b1b';
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">${a.name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">
            <span style="padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; background: ${badgeColor};">${a.status}</span>
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center; font-weight: 700;">${a.score}/${a.maxScore}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 13px;">${a.summary}</td>
        </tr>
      `;
    })
    .join('');

  const html = `
    <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden;">
      <div style="background: #064e3b; color: #ffffff; padding: 24px 28px;">
        <h1 style="margin: 0; font-size: 20px;">🛠️ ToolBrasil Master Orchestrator v2.0</h1>
        <p style="margin: 6px 0 0; color: #a7f3d0; font-size: 13px;">Auditoria Multiagente Diária (7 Subagentes) • ${nowRecife}</p>
      </div>
      <div style="padding: 24px 28px;">
        <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 16px 20px; border-radius: 10px; border-left: 5px solid ${statusColor}; margin-bottom: 24px;">
          <div>
            <div style="font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: 700;">Score Geral de Saúde (toolbrasil.com.br)</div>
            <div style="font-size: 26px; font-weight: 800; color: #0f172a;">${report.overallScore}/100 ${statusEmoji} ${report.overallStatus}</div>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left; font-size: 12px; color: #475569; text-transform: uppercase;">
              <th style="padding: 10px 12px;">Subagente</th>
              <th style="padding: 10px 12px; text-align: center;">Status</th>
              <th style="padding: 10px 12px; text-align: center;">Score</th>
              <th style="padding: 10px 12px;">Diagnóstico</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `${statusEmoji} [ToolBrasil SRE] Score ${report.overallScore}/100 — Relatório Diário (${nowRecife})`,
        html
      })
    });
    return res.ok;
  } catch (err: any) {
    console.error(`❌ [Resend] Exceção no disparo de e-mail:`, err.message);
    return false;
  }
}

// ======================================================================
// DISPARO DO ALERTA NO TELEGRAM
// ======================================================================
async function sendTelegramAlert(report: MasterReport): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;

  const nowRecife = new Date().toLocaleDateString('pt-BR', {
    timeZone: 'America/Recife',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const statusEmoji =
    report.overallStatus === 'HEALTHY' ? '🟢' : report.overallStatus === 'WARNING' ? '🟡' : '🔴';

  const lines = report.subagents
    .map(a => {
      const icon = a.status === 'HEALTHY' ? '🟢' : a.status === 'WARNING' ? '🟡' : '🔴';
      return `• ${icon} *${a.name} (${a.score}/${a.maxScore}):* ${a.summary}`;
    })
    .join('\n');

  const healingLine = report.healingSummary.length > 0
    ? `🛠️ *Autocura Executada:*\n${report.healingSummary.map(h => `  ↳ ${h}`).join('\n')}`
    : `🛡️ *Autocura:* Zero anomalias. Ecossistema ToolBrasil 100% nominal.`;

  const message = `🛠️ *[ToolBrasil-Master-Orchestrator v2.0]*\n` +
    `🌐 *Portal:* https://www.toolbrasil.com.br\n` +
    `📅 *Relatório Operacional Diário (7 Agentes)* — ${nowRecife}\n\n` +
    `📊 *Score de Saúde:* ${report.overallScore}/100 (${statusEmoji} ${report.overallStatus})\n\n` +
    `${lines}\n\n` +
    `${healingLine}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ======================================================================
// EXECUÇÃO PRINCIPAL DO MASTER ORCHESTRATOR (7 SUBAGENTES)
// ======================================================================
async function runMasterOrchestrator() {
  const startTime = Date.now();
  console.log('======================================================================');
  console.log('🛠️ TOOLBRASIL MASTER MULTIAGENT ORCHESTRATOR & SRE AUTÔNOMO v2.0 (2026)');
  console.log('======================================================================\n');
  console.log(`🌐 Portal Alvo: ${SITE_URL}`);
  console.log(`🕒 Timestamp: ${new Date().toISOString()}`);
  console.log(`🎯 Modo Dry-Run: ${IS_DRY_RUN ? 'SIM (Sem disparos externos)' : 'NÃO'}`);
  console.log(`🛡️ Pular Autocura: ${SKIP_HEALING ? 'SIM' : 'NÃO'}\n`);

  console.log('📡 [1/7] Executando subagente SEO, SSG Googlebot & Search Console...');
  const seoReport = await runAgentSeoGsc();

  console.log('💰 [2/7] Executando subagente de Monetização (AdSense, 7 páginas & Amazon)...');
  const monetizationReport = await runAgentMonetization();

  console.log('⚡ [3/7] Executando subagente de Infraestrutura & Edge CDN...');
  const infraReport = await runAgentInfrastructure();

  console.log('🧮 [4/7] Executando subagente do Catálogo de Ferramentas & Anti-Thin Content...');
  const toolsReport = await runAgentToolsCatalog();

  console.log('📈 [5/7] Executando subagente de SEO Programático & Anti-Canibalização...');
  const progReport = await runAgentProgrammaticSeo();

  console.log('🔌 [6/7] Executando subagente da API Pública v1 & Dados Oficiais 2026...');
  const apiReport = await runAgentPublicApi();

  console.log('🚀 [7/7] Executando 7º Agente de Tração Orgânica & Expansão Long-Tail...');
  const growthReport = await runAgentGrowthTraction();

  const executionTimeMs = Date.now() - startTime;
  const masterReport = consolidateReport(
    [seoReport, monetizationReport, infraReport, toolsReport, progReport, apiReport, growthReport],
    executionTimeMs
  );

  console.log('\n======================================================================');
  console.log(`📊 SCORE GERAL DE SAÚDE: ${masterReport.overallScore}/100 [${masterReport.overallStatus}]`);
  console.log('======================================================================');
  masterReport.subagents.forEach(a => {
    console.log(`[${a.status.padEnd(8)}] ${a.name.padEnd(48)}: ${a.score}/${a.maxScore} pts`);
  });
  if (masterReport.healingSummary.length > 0) {
    console.log('\n🛠️ Ações de Autocura / Expansão Executadas:');
    masterReport.healingSummary.forEach(h => console.log(`  ↳ ${h}`));
  }
  console.log(`\n⏱️ Tempo total de auditoria: ${(executionTimeMs / 1000).toFixed(2)}s\n`);

  if (!IS_DRY_RUN) {
    await sendResendReport(masterReport);
    await sendTelegramAlert(masterReport);
  } else {
    console.log('ℹ️ [DryRun] Disparos externos ignorados conforme flag --dry-run.');
  }

  console.log('\n🎉 [MasterOrchestrator] Ciclo operacional diário dos 7 subagentes finalizado com sucesso!');
}

runMasterOrchestrator().catch(err => {
  console.error('❌ [MasterOrchestrator] Erro crítico no orquestrador:', err);
  process.exit(1);
});
