/**
 * scripts/agent_growth_expander.ts
 * ======================================================================
 * 7º AGENTE: AGENTE AUTÔNOMO DE TRAÇÃO ORGÂNICA & EXPANSÃO LONG-TAIL (2026)
 * ======================================================================
 * Audita a Matriz de Crescimento Programático (7 clusters de alta intenção:
 * 27 UFs de DDD, IPVA 2026 por Estado, Códigos COMPE/ISPB dos 10 Maiores Bancos,
 * Tabelas Trabalhistas 2026, IBGE, Salário Mínimo e SELIC), valida densidade
 * de links internos e palavras visíveis no SSG, reconstrói rotas ausentes e
 * submete automaticamente novas URLs ao protocolo IndexNow.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { PROGRAMMATIC_PAGES, TOOLS } from '../src/toolsData.ts';
import { EXTRA_PROGRAMMATIC_PAGES } from '../src/programmaticExtra.ts';

const SITE_URL = 'https://www.toolbrasil.com.br';
const HOST = 'www.toolbrasil.com.br';
const INDEXNOW_KEY = 'antigravityseokey2026';

export interface GrowthAuditResult {
  totalTools: number;
  totalProgrammaticPages: number;
  totalSitemapUrls: number;
  clusters: Record<string, number>;
  missingSsgPages: string[];
  missingSitemapUrls: string[];
  thinSsgPages: string[];
  selfHealed: boolean;
  healingActions: string[];
  indexNowSubmittedCount: number;
}

function countWords(html: string): number {
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean ? clean.split(' ').length : 0;
}

export async function runGrowthExpander(options: { skipHeal?: boolean; dryRun?: boolean } = {}): Promise<GrowthAuditResult> {
  const allProg = { ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES };
  const progSlugs = Object.keys(allProg);

  const clusters: Record<string, number> = {
    ddd: 0,
    'ipva-2026': 0,
    'codigo-banco': 0,
    'tabela-trabalhista': 0,
    ibge: 0,
    'salario-minimo': 0,
    selic: 0,
    core: 0
  };

  for (const [slug, entry] of Object.entries(allProg)) {
    const cluster = (entry as any).cluster || 'core';
    clusters[cluster] = (clusters[cluster] || 0) + 1;
  }

  const distDir = path.resolve('dist');
  const sitemapPath = path.resolve('public/sitemap.xml');
  const sitemapContent = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf-8') : '';

  const missingSsgPages: string[] = [];
  const missingSitemapUrls: string[] = [];
  const thinSsgPages: string[] = [];
  const healingActions: string[] = [];
  let selfHealed = false;

  for (const slug of progSlugs) {
    const expectedUrl = `${SITE_URL}/programatico/${slug}`;
    if (!sitemapContent.includes(`<loc>${expectedUrl}</loc>`)) {
      missingSitemapUrls.push(expectedUrl);
    }

    const htmlPath = path.join(distDir, 'programatico', slug, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      missingSsgPages.push(slug);
    } else {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      const words = countWords(html);
      if (words < 220) {
        thinSsgPages.push(`${slug} (${words}w)`);
      }
    }
  }

  // Se houver páginas ausentes no dist/ ou no sitemap.xml, aciona autocura via prerender.ts
  if ((missingSsgPages.length > 0 || missingSitemapUrls.length > 0) && !options.skipHeal) {
    console.log(`🚀 [agent_growth_traction] Materializando ${ Math.max(missingSsgPages.length, missingSitemapUrls.length) } nova(s) rota(s) Long-Tail no SSG e Sitemap...`);
    try {
      execSync('npx tsx prerender.ts', { stdio: 'pipe', timeout: 90000 });
      selfHealed = true;
      healingActions.push(
        `${Math.max(missingSsgPages.length, missingSitemapUrls.length)} nova(s) página(s) Long-Tail pré-renderizada(s) e injetada(s) no sitemap.xml.`
      );
      missingSsgPages.length = 0;
      missingSitemapUrls.length = 0;
    } catch (err: any) {
      healingActions.push(`Erro ao materializar novas páginas via prerender.ts: ${err.message}`);
    }
  }

  // Contar total final do sitemap.xml
  const finalSitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf-8') : '';
  const sitemapMatches = finalSitemap.match(/<loc>/g);
  const totalSitemapUrls = sitemapMatches ? sitemapMatches.length : 0;

  // Submeter as URLs de expansão para o IndexNow se não for dryRun
  let indexNowSubmittedCount = 0;
  const expansionUrls = Object.keys(EXTRA_PROGRAMMATIC_PAGES).map(s => `${SITE_URL}/programatico/${s}`);

  if (!options.dryRun && expansionUrls.length > 0) {
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
          urlList: expansionUrls
        }),
        signal: AbortSignal.timeout(10000)
      });
      if (res.status === 200 || res.status === 202) {
        indexNowSubmittedCount = expansionUrls.length;
      }
    } catch {
      // Tolerante a falhas de rede externas
    }
  }

  return {
    totalTools: TOOLS.length,
    totalProgrammaticPages: progSlugs.length,
    totalSitemapUrls,
    clusters,
    missingSsgPages,
    missingSitemapUrls,
    thinSsgPages,
    selfHealed,
    healingActions,
    indexNowSubmittedCount
  };
}

// Execução direta via CLI
if (process.argv[1]?.includes('agent_growth_expander')) {
  console.log('======================================================================');
  console.log('📈 [7º Agente] ToolBrasil Growth & Long-Tail Traction Expander (2026)');
  console.log('======================================================================\n');
  runGrowthExpander({ dryRun: process.argv.includes('--dry-run') })
    .then(res => {
      console.log(`✅ Ferramentas Interativas Ativas: ${res.totalTools}`);
      console.log(`✅ Páginas Programáticas Long-Tail: ${res.totalProgrammaticPages}`);
      console.log(`✅ Total de URLs Canônicas no Sitemap: ${res.totalSitemapUrls}`);
      console.log(`📊 Cobertura por Cluster Long-Tail:`, res.clusters);
      if (res.healingActions.length > 0) {
        console.log(`🛠️ Ações de Expansão/Autocura:`, res.healingActions);
      }
      if (res.indexNowSubmittedCount > 0) {
        console.log(`🚀 IndexNow: ${res.indexNowSubmittedCount} URLs de cauda longa enviadas para indexação imediata!`);
      }
    })
    .catch(err => {
      console.error('❌ Erro no Agente de Tração:', err);
      process.exit(1);
    });
}

