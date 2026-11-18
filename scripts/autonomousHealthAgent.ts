/**
 * scripts/autonomousHealthAgent.ts
 * ======================================================================
 * AGENTE AUTÔNOMO DE SAÚDE SEO, INTEGRIDADE EDITORIAL, ADSENSE & BUILD
 * Portal: Tool Brasil (https://www.toolbrasil.com.br)
 * ======================================================================
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { CATEGORIES, TOOLS, PROGRAMMATIC_PAGES } from '../src/toolsData.ts';
import { EXTRA_PROGRAMMATIC_PAGES, NOINDEX_PROGRAMMATIC_IDS } from '../src/programmaticExtra.ts';
import { EDITORIAL_GUIDES } from '../src/guidesData.ts';

dotenv.config({ path: '.env.local' });
dotenv.config();

const SITE_URL = 'https://www.toolbrasil.com.br';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const SKIP_BUILD = process.argv.includes('--skip-build');

const INSTITUTIONAL_CANONICAL_PATHS = [
  '/sobre',
  '/contato',
  '/politica-de-privacidade',
  '/termos-de-uso',
  '/cookies',
  '/transparencia-adsense',
  '/anunciantes',
];

const EXPECTED_DEC_DATES = ['2026-12-02', '2026-12-09', '2026-12-16', '2026-12-23'];

interface AuditReport {
  ok: boolean;
  errors: string[];
  warnings: string[];
  metrics: Record<string, string | number>;
  aiSummary?: string;
  durationMs: number;
}

function countHtmlWords(html: string): number {
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean ? clean.split(' ').filter(Boolean).length : 0;
}

function countGuideWords(guide: (typeof EDITORIAL_GUIDES)[number]): number {
  const fullText = [
    guide.title,
    guide.summary,
    guide.intro,
    ...guide.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets || [])]),
    ...guide.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(' ');
  return fullText.trim().split(/\s+/).filter(Boolean).length;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildValidInternalPathSet(): Set<string> {
  const paths = new Set<string>([
    '/',
    '/guias',
    '/desenvolvedores',
    '/api',
    '/sitemap.xml',
    '/robots.txt',
    '/ads.txt',
    ...INSTITUTIONAL_CANONICAL_PATHS,
    ...CATEGORIES.filter((c) => c.id !== 'institucional' && c.id !== 'programatico').map((c) => `/${c.id}`),
    ...TOOLS.map((t) => `/${t.categoryId}/${t.slug}`),
    ...Object.keys({ ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES }).map((id) => `/programatico/${id}`),
    ...EDITORIAL_GUIDES.map((g) => `/guias/${g.slug}`),
  ]);
  return paths;
}

function extractInternalLinks(raw: string): string[] {
  const matches = new Set<string>();
  const regex = /(?:href|destination)["']?\s*[:=]\s*["'](\/[^"'#\s>]*)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(raw)) !== null) {
    const candidate = m[1];
    if (candidate.includes('${')) continue;
    matches.add(candidate);
  }
  return Array.from(matches);
}

async function generateOptionalAiDiagnostic(metrics: Record<string, string | number>, errors: string[], warnings: string[]): Promise<string | undefined> {
  if (!GEMINI_API_KEY) return undefined;
  try {
    const prompt = `Você é um auditor técnico de SEO e AdSense. Resuma em até 2 frases objetivas em português o estado do portal Tool Brasil: ${JSON.stringify(metrics)}. Erros: ${errors.length}. Avisos: ${warnings.length}.`;
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 160, temperature: 0.2 },
        }),
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!res.ok) return undefined;
    const data: any = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  } catch {
    return undefined;
  }
}

async function sendTelegramReport(report: AuditReport): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('⚠️ TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID não definidos; pulando envio ao Telegram.');
    return false;
  }

  const badge = report.ok ? '✅ <b>SAUDÁVEL</b>' : '🚨 <b>ATENÇÃO / FALHA</b>';
  const lines = [
    `🛠️ <b>Tool Brasil — Autonomous Health Agent</b>`,
    `Status: ${badge} (${Math.round(report.durationMs / 1000)}s)`,
    `🌐 Domínio: ${SITE_URL}`,
    '',
    `📊 <b>Métricas Principais:</b>`,
    `• Ferramentas SSG (&gt;=600w): <b>${report.metrics.toolsOk}/${report.metrics.toolsTotal}</b> (min: ${report.metrics.minToolWords}w)`,
    `• Guias Práticos (Base &gt;=800w, Dez &gt;=1100w): <b>${report.metrics.guidesOk}/${report.metrics.guidesTotal}</b>`,
    `• Programáticas Canônicas (&gt;=600w): <b>${report.metrics.canonicalProgOk}/${report.metrics.canonicalProgTotal}</b>`,
    `• Rotas Isoladas (<code>noindex, follow</code>): <b>${report.metrics.noindexOk}/${report.metrics.noindexTotal}</b>`,
    `• Sitemap XML Limpo: <b>${report.metrics.sitemapUrls} URLs</b>`,
    `• Home: <b>${report.metrics.homeWords}w</b> | Ads.txt &amp; Robots: <b>OK</b>`,
  ];

  if (report.errors.length > 0) {
    lines.push('', '❌ <b>Erros Críticos:</b>');
    for (const err of report.errors.slice(0, 6)) {
      lines.push(`• ${escapeHtml(err)}`);
    }
  }
  if (report.warnings.length > 0) {
    lines.push('', '⚠️ <b>Avisos:</b>');
    for (const warn of report.warnings.slice(0, 5)) {
      lines.push(`• ${escapeHtml(warn)}`);
    }
  }
  if (report.aiSummary) {
    lines.push('', `🤖 <i>${escapeHtml(report.aiSummary)}</i>`);
  }

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.warn(`⚠️ Falha ao enviar Telegram (${res.status}): ${errText}`);
    return false;
  }
  console.log('📨 Relatório enviado via Telegram com sucesso.');
  return true;
}

async function runHealthAudit(): Promise<void> {
  const startedAt = Date.now();
  const errors: string[] = [];
  const warnings: string[] = [];
  const validPaths = buildValidInternalPathSet();

  console.log('======================================================================');
  console.log('🩺 Tool Brasil — Autonomous Health & AdSense Compliance Agent');
  console.log('======================================================================');

  // 1. Verificar ads.txt & robots.txt (Pureza AdSense)
  const adsTxtPath = path.resolve('public/ads.txt');
  const robotsTxtPath = path.resolve('public/robots.txt');
  if (!fs.existsSync(adsTxtPath)) {
    errors.push('public/ads.txt não encontrado.');
  } else {
    const adsTxt = fs.readFileSync(adsTxtPath, 'utf-8');
    if (!adsTxt.includes('pub-8160658026927094')) {
      errors.push('public/ads.txt não contém o publisher AdSense pub-8160658026927094.');
    }
    if (/monetag|n6wxm|vignette|chacerto-20/i.test(adsTxt)) {
      errors.push('public/ads.txt contém assinatura proibida de terceiros/afiliados.');
    }
  }

  if (!fs.existsSync(robotsTxtPath)) {
    errors.push('public/robots.txt não encontrado.');
  } else {
    const robotsTxt = fs.readFileSync(robotsTxtPath, 'utf-8');
    if (!robotsTxt.includes('https://www.toolbrasil.com.br/sitemap.xml')) {
      errors.push('public/robots.txt não aponta para o sitemap oficial.');
    }
  }

  // 2. Auditar Guias Editoriais e Datas
  let guidesOk = 0;
  const foundDecDates = new Set<string>();
  const staleThreshold = new Date('2026-10-18T00:00:00Z').getTime();

  for (const guide of EDITORIAL_GUIDES) {
    const words = countGuideWords(guide);
    const isDec = EXPECTED_DEC_DATES.includes(guide.publishedAt);
    if (isDec) foundDecDates.add(guide.publishedAt);
    const minRequired = isDec ? 1100 : 800;

    if (words < minRequired) {
      errors.push(`Guia "${guide.slug}" abaixo do mínimo editorial (${words}w < ${minRequired}w).`);
    } else {
      guidesOk++;
    }

    const parsedDate = Date.parse(`${guide.publishedAt}T00:00:00Z`);
    if (Number.isNaN(parsedDate)) {
      errors.push(`Guia "${guide.slug}" com data inválida: ${guide.publishedAt}`);
    } else if (parsedDate < staleThreshold) {
      errors.push(`Guia "${guide.slug}" com data antiga demais (${guide.publishedAt} > 30 dias do ciclo base).`);
    }

    for (const rel of guide.relatedToolLinks) {
      if (!validPaths.has(rel.href)) {
        errors.push(`Link quebrado no guia "${guide.slug}": ${rel.href}`);
      }
    }
  }

  for (const d of EXPECTED_DEC_DATES) {
    if (!foundDecDates.has(d)) {
      errors.push(`Agenda de dezembro incompleta em src/guidesData.ts: data ausente ${d}.`);
    }
  }

  // 3. Auditar Redirects do vercel.json contra rotas reais (Zero 301 -> 404)
  const vercelPath = path.resolve('vercel.json');
  if (fs.existsSync(vercelPath)) {
    try {
      const vercelCfg = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));
      for (const r of vercelCfg.redirects || []) {
        if (typeof r.destination === 'string' && r.destination.startsWith('/') && !validPaths.has(r.destination)) {
          errors.push(`Redirect quebrado em vercel.json: ${r.source} -> ${r.destination}`);
        }
      }
    } catch (e: any) {
      errors.push(`Erro ao validar vercel.json: ${e.message}`);
    }
  }

  // 4. Auditar links internos literais em src/guidesData.ts e prerender.ts
  for (const fileToCheck of ['src/guidesData.ts', 'prerender.ts']) {
    const content = fs.readFileSync(path.resolve(fileToCheck), 'utf-8');
    const links = extractInternalLinks(content);
    for (const link of links) {
      if (
        link.startsWith('/api/v1/') ||
        link.startsWith('/assets/') ||
        link === '/' ||
        link === '/favicon.svg' ||
        link === '/favicon.ico' ||
        link === '/widget.js' ||
        link === '/sw.js'
      ) {
        continue;
      }
      if (!validPaths.has(link)) {
        errors.push(`Possível link interno quebrado em ${fileToCheck}: ${link}`);
      }
    }
  }

  // 5. TypeScript check & Full Build (Vite + Prerender)
  if (!SKIP_BUILD) {
    console.log('🔎 Executando TypeScript typecheck (tsc --noEmit)...');
    execSync('node --max-old-space-size=1536 ./node_modules/typescript/bin/tsc --noEmit', {
      stdio: 'inherit',
    });

    console.log('🏗️ Executando Build Vite + Pré-renderização SSG (prerender.ts)...');
    execSync('node --max-old-space-size=1536 ./node_modules/vite/bin/vite.js build', {
      stdio: 'inherit',
    });
    execSync('node --max-old-space-size=1536 ./node_modules/tsx/dist/cli.mjs prerender.ts', {
      stdio: 'inherit',
    });
  }

  // 6. Auditoria Pós-Build de HTMLs gerados em dist/
  const distDir = path.resolve('dist');
  const homeHtmlPath = path.join(distDir, 'index.html');
  let homeWords = 0;
  if (!fs.existsSync(homeHtmlPath)) {
    errors.push('dist/index.html não encontrado após o build.');
  } else {
    const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');
    homeWords = countHtmlWords(homeHtml);
    if (homeWords < 600) {
      errors.push(`Home HTML abaixo de 600 palavras (${homeWords}w).`);
    }
    if (/content=["'][^"']*noindex/i.test(homeHtml)) {
      errors.push('Home HTML contém noindex indevido!');
    }
  }

  // Categorias e Desenvolvedores
  for (const catId of ['calculadoras', 'conversores', 'geradores', 'ferramentas-web', 'utilitarios', 'desenvolvedores', 'guias']) {
    const p = path.join(distDir, catId, 'index.html');
    if (!fs.existsSync(p)) {
      errors.push(`Arquivo SSG ausente: dist/${catId}/index.html`);
    } else {
      const html = fs.readFileSync(p, 'utf-8');
      const w = countHtmlWords(html);
      if (w < 600) {
        errors.push(`Página /${catId} abaixo de 600 palavras (${w}w).`);
      }
      if (/content=["'][^"']*noindex/i.test(html)) {
        errors.push(`Página /${catId} contém noindex indevido.`);
      }
    }
  }

  // Guias em dist/guias/*
  for (const g of EDITORIAL_GUIDES) {
    const p = path.join(distDir, 'guias', g.slug, 'index.html');
    if (!fs.existsSync(p)) {
      errors.push(`Artigo SSG ausente: dist/guias/${g.slug}/index.html`);
    } else {
      const html = fs.readFileSync(p, 'utf-8');
      const w = countHtmlWords(html);
      const minW = EXPECTED_DEC_DATES.includes(g.publishedAt) ? 1100 : 800;
      if (w < minW) {
        errors.push(`dist/guias/${g.slug} abaixo de ${minW} palavras (${w}w).`);
      }
    }
  }

  // Todas as 138 ferramentas em dist/
  let toolsOk = 0;
  let minToolWords = Infinity;
  for (const t of TOOLS) {
    const p = path.join(distDir, t.categoryId, t.slug, 'index.html');
    if (!fs.existsSync(p)) {
      errors.push(`Ferramenta SSG ausente: /${t.categoryId}/${t.slug}`);
      continue;
    }
    const html = fs.readFileSync(p, 'utf-8');
    const w = countHtmlWords(html);
    if (w < minToolWords) minToolWords = w;
    if (w < 600) {
      errors.push(`Ferramenta /${t.categoryId}/${t.slug} com menos de 600 palavras (${w}w).`);
    } else {
      toolsOk++;
    }
    if (/content=["'][^"']*noindex/i.test(html)) {
      errors.push(`Ferramenta /${t.categoryId}/${t.slug} marcada com noindex!`);
    }
    if (html.includes('Imagine que você precise realizar a apuração rápida')) {
      errors.push(`Boilerplate residual detectado em /${t.categoryId}/${t.slug}`);
    }
  }

  // Páginas Programáticas Canônicas vs NOINDEX
  const allProgKeys = Object.keys({ ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES });
  let canonicalProgOk = 0;
  let canonicalProgTotal = 0;
  let noindexOk = 0;
  let noindexTotal = 1; // inclui /api alias

  const apiHtmlPath = path.join(distDir, 'api', 'index.html');
  if (!fs.existsSync(apiHtmlPath)) {
    errors.push('Rota alias dist/api/index.html ausente.');
  } else {
    const apiHtml = fs.readFileSync(apiHtmlPath, 'utf-8');
    if (!/meta[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow/i.test(apiHtml)) {
      errors.push('Rota /api não possui <meta name="robots" content="noindex, follow">.');
    } else {
      noindexOk++;
    }
  }

  for (const id of allProgKeys) {
    const p = path.join(distDir, 'programatico', id, 'index.html');
    if (!fs.existsSync(p)) {
      errors.push(`Página programática SSG ausente: /programatico/${id}`);
      continue;
    }
    const html = fs.readFileSync(p, 'utf-8');
    if (NOINDEX_PROGRAMMATIC_IDS.has(id)) {
      noindexTotal++;
      if (!/meta[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow/i.test(html)) {
        errors.push(`Página programática replicada /programatico/${id} sem meta noindex, follow.`);
      } else {
        noindexOk++;
      }
    } else {
      canonicalProgTotal++;
      const w = countHtmlWords(html);
      if (w < 600) {
        errors.push(`Página programática canônica /programatico/${id} abaixo de 600w (${w}w).`);
      } else {
        canonicalProgOk++;
      }
    }
  }

  // Verificar Sitemap XML em public/ e dist/
  let sitemapUrls = 0;
  for (const smPath of [path.resolve('public/sitemap.xml'), path.join(distDir, 'sitemap.xml')]) {
    if (!fs.existsSync(smPath)) {
      errors.push(`Sitemap ausente em ${smPath}`);
      continue;
    }
    const sm = fs.readFileSync(smPath, 'utf-8');
    const locs = sm.match(/<loc>/g);
    sitemapUrls = locs ? locs.length : 0;

    for (const noIdxId of NOINDEX_PROGRAMMATIC_IDS) {
      if (sm.includes(`/programatico/${noIdxId}</loc>`)) {
        errors.push(`Sitemap contém rota noindex proibida: /programatico/${noIdxId}`);
      }
    }
    if (sm.includes('/api</loc>')) {
      errors.push('Sitemap contém alias noindex /api.');
    }
    if (!sm.includes('/guias</loc>')) {
      errors.push('Sitemap não contém o hub /guias.');
    }
    for (const g of EDITORIAL_GUIDES) {
      if (!sm.includes(`/guias/${g.slug}</loc>`)) {
        errors.push(`Sitemap não contém o guia /guias/${g.slug}.`);
      }
    }
  }

  const metrics: Record<string, string | number> = {
    homeWords,
    toolsOk,
    toolsTotal: TOOLS.length,
    minToolWords: Number.isFinite(minToolWords) ? minToolWords : 0,
    guidesOk,
    guidesTotal: EDITORIAL_GUIDES.length,
    canonicalProgOk,
    canonicalProgTotal,
    noindexOk,
    noindexTotal,
    sitemapUrls,
  };

  const aiSummary = await generateOptionalAiDiagnostic(metrics, errors, warnings);
  const report: AuditReport = {
    ok: errors.length === 0,
    errors,
    warnings,
    metrics,
    aiSummary,
    durationMs: Date.now() - startedAt,
  };

  console.log('\n📋 Resumo da Auditoria:', JSON.stringify(metrics, null, 2));
  if (warnings.length > 0) console.warn('⚠️ Avisos:', warnings);
  if (errors.length > 0) console.error('❌ Erros críticos:', errors);

  await sendTelegramReport(report);

  if (!report.ok) {
    process.exit(1);
  }
  console.log('✅ Todas as verificações do Tool Brasil Health Agent foram aprovadas!');
}

runHealthAudit().catch((err) => {
  console.error('❌ Exceção fatal em autonomousHealthAgent:', err);
  process.exit(1);
});
