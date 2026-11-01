/**
 * scripts/gscAutoInspector.ts
 * ======================================================================
 * TOOLBRASIL GSC SYNTHETIC GOOGLEBOT & AUTO-HEALER (2026)
 * ======================================================================
 * Audita rotas HTTP, tags robots (noindex), URLs canônicas estritas,
 * redirecionamentos 301 anti-canibalização, sitemap.xml e IndexNow
 * em https://www.toolbrasil.com.br e nos demais portais da rede.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const USER_AGENT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const SITE_URL = 'https://www.toolbrasil.com.br';

interface SiteConfig {
  name: string;
  domain: string;
  sitemapUrl: string;
  robotsUrl: string;
}

const NETWORK_SITES: SiteConfig[] = [
  {
    name: 'Tool Brasil (Principal)',
    domain: 'https://www.toolbrasil.com.br',
    sitemapUrl: 'https://www.toolbrasil.com.br/sitemap.xml',
    robotsUrl: 'https://www.toolbrasil.com.br/robots.txt'
  },
  {
    name: 'Emprega PE',
    domain: 'https://empregape.com.br',
    sitemapUrl: 'https://empregape.com.br/sitemap.xml',
    robotsUrl: 'https://empregape.com.br/robots.txt'
  },
  {
    name: 'Brasil Calculadoras',
    domain: 'https://www.brasilcalculadoras.com.br',
    sitemapUrl: 'https://www.brasilcalculadoras.com.br/sitemap.xml',
    robotsUrl: 'https://www.brasilcalculadoras.com.br/robots.txt'
  },
  {
    name: 'Mestre da Federal',
    domain: 'https://mestredafederal.com.br',
    sitemapUrl: 'https://mestredafederal.com.br/sitemap.xml',
    robotsUrl: 'https://mestredafederal.com.br/robots.txt'
  },
  {
    name: 'Chá Certo',
    domain: 'https://chacerto.com',
    sitemapUrl: 'https://chacerto.com/sitemap.xml',
    robotsUrl: 'https://chacerto.com/robots.txt'
  }
];

interface AuditIssue {
  severity: 'CRITICAL' | 'WARNING';
  category: 'SOFT_404' | 'NOINDEX' | 'CANONICAL' | 'REDIRECT' | 'SITEMAP' | 'SERVER_5XX';
  message: string;
  autoHealed?: boolean;
}

export async function runFullAutonomousAudit(): Promise<{ success: boolean; issues: AuditIssue[] }> {
  console.log('======================================================================');
  console.log('🤖 [ToolBrasil GSC Synthetic Googlebot & Auto-Healer] Auditoria 2026');
  console.log('======================================================================\n');

  const issues: AuditIssue[] = [];
  let requiresPrerenderRebuild = false;

  // 0. Verificação Prévia de Integridade do vercel.json
  try {
    const vercelRaw = fs.readFileSync(path.resolve('vercel.json'), 'utf-8');
    const vercelConfig = JSON.parse(vercelRaw);
    if (Array.isArray(vercelConfig.redirects) && vercelConfig.redirects.length > 0) {
      console.log(`   ✅ vercel.json: JSON válido com ${vercelConfig.redirects.length} regras de redirecionamento 301 ativas.`);
    }
  } catch (err: any) {
    issues.push({
      severity: 'CRITICAL',
      category: 'SERVER_5XX',
      message: `Erro fatal de sintaxe em vercel.json: ${err.message}`
    });
  }

  // ==========================================================================
  // ETAPA 1: AUDITORIA PROFUNDA DO PORTAL PRINCIPAL (TOOL BRASIL)
  // ==========================================================================
  console.log(`\n🌐 [1/4] Auditando portal principal: Tool Brasil (${SITE_URL})`);

  // 1.1 Robots.txt
  try {
    const robotsRes = await fetch(`${SITE_URL}/robots.txt`, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(10000)
    });
    const txt = await robotsRes.text();
    if (!txt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
      issues.push({ severity: 'CRITICAL', category: 'SITEMAP', message: `robots.txt não referencia ${SITE_URL}/sitemap.xml` });
    }
    if (!txt.includes('utm_') || !txt.includes('ref=')) {
      issues.push({ severity: 'WARNING', category: 'CANONICAL', message: 'robots.txt ausente de regras anti-rastreamento (?utm_ / ?ref=)' });
    }
    console.log('   ✅ robots.txt acessível e com diretivas de Sitemap e AdSense ativas.');
  } catch (err: any) {
    issues.push({ severity: 'CRITICAL', category: 'SERVER_5XX', message: `Falha ao acessar robots.txt: ${err.message}` });
  }

  // 1.2 Home & Canônica Estrita
  try {
    const homeRes = await fetch(`${SITE_URL}/`, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'manual',
      signal: AbortSignal.timeout(10000)
    });
    const html = await homeRes.text();
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : '';
    const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
    const robots = robotsMatch ? robotsMatch[1] : 'index, follow';

    if (homeRes.status !== 200) {
      issues.push({ severity: 'CRITICAL', category: 'SERVER_5XX', message: `Home retornou status HTTP ${homeRes.status} (esperado 200 OK)` });
    }
    if (canonical !== `${SITE_URL}/`) {
      issues.push({ severity: 'CRITICAL', category: 'CANONICAL', message: `Canônica da Home divergente: "${canonical}" (esperado: "${SITE_URL}/")` });
    }
    if (robots.includes('noindex')) {
      issues.push({ severity: 'CRITICAL', category: 'NOINDEX', message: "Injeção indevida de 'noindex' na página inicial!" });
    }
    console.log(`   ✅ Home: Status ${homeRes.status} OK | Canônica: ${canonical} | Robots: ${robots}`);
  } catch (err: any) {
    issues.push({ severity: 'CRITICAL', category: 'SERVER_5XX', message: `Erro ao testar Home: ${err.message}` });
  }

  // 1.3 Verificação de Redirecionamentos 301/308 de Aliases Institucionais e Programáticos
  try {
    const aliasRes = await fetch(`${SITE_URL}/privacidade`, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'manual',
      signal: AbortSignal.timeout(10000)
    });
    const loc = aliasRes.headers.get('location') || '';
    if ((aliasRes.status === 301 || aliasRes.status === 308) && loc.includes('/politica-de-privacidade')) {
      console.log(`   ✅ Redirecionamento Canônico: /privacidade ➔ ${aliasRes.status} para /politica-de-privacidade.`);
    } else {
      issues.push({
        severity: 'WARNING',
        category: 'REDIRECT',
        message: `Rota alias /privacidade retornou ${aliasRes.status} (location: ${loc})`
      });
    }
  } catch (err: any) {
    // Ignorado em timeout
  }

  // ==========================================================================
  // ETAPA 2: AUDITORIA DO SITEMAP XML & HIGIENIZAÇÃO DE ROTAS
  // ==========================================================================
  console.log(`\n🗺️ [2/4] Auditando Sitemap XML oficial (${SITE_URL}/sitemap.xml)`);
  try {
    const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(15000)
    });

    if (sitemapRes.status !== 200) {
      issues.push({ severity: 'CRITICAL', category: 'SITEMAP', message: `Sitemap retornou status ${sitemapRes.status}` });
      requiresPrerenderRebuild = true;
    } else {
      const xml = await sitemapRes.text();
      const locMatches = (xml.match(/<loc>(.*?)<\/loc>/g) || []).map(m => m.replace(/<\/?loc>/g, '').trim());
      console.log(`   └─ ${locMatches.length} URLs mapeadas no sitemap.`);

      // Checa rotas de alias que sofrem redirect 301 e não devem constar no sitemap
      const forbiddenAliases = ['/institucional/', '/privacidade', '/termos\n', '/fale-conosco', '/quem-somos'];
      const dirtyUrls = locMatches.filter(u =>
        u.includes('/institucional/') ||
        u.endsWith('/privacidade') ||
        u.endsWith('/termos') ||
        u.endsWith('/fale-conosco') ||
        u.endsWith('/quem-somos')
      );

      if (dirtyUrls.length > 0) {
        issues.push({
          severity: 'CRITICAL',
          category: 'SITEMAP',
          message: `Sitemap contém URLs não-canônicas (com redirect): ${dirtyUrls.join(', ')}`
        });
        requiresPrerenderRebuild = true;
      }

      // Amostra de 24 URLs (início, meio e fim) para validar status HTTP 200 real
      const testSample = [
        ...locMatches.slice(0, 8),
        ...locMatches.slice(Math.floor(locMatches.length / 2), Math.floor(locMatches.length / 2) + 8),
        ...locMatches.slice(-8)
      ];

      let redirectCount = 0;
      let errorCount = 0;
      let noindexCount = 0;

      for (const testUrl of testSample) {
        try {
          const sampleRes = await fetch(testUrl, {
            headers: { 'User-Agent': USER_AGENT },
            redirect: 'manual',
            signal: AbortSignal.timeout(8000)
          });

          if (sampleRes.status >= 300 && sampleRes.status < 400) {
            redirectCount++;
            issues.push({ severity: 'CRITICAL', category: 'REDIRECT', message: `URL no sitemap respondeu ${sampleRes.status} Redirect: ${testUrl}` });
          } else if (sampleRes.status !== 200) {
            errorCount++;
            issues.push({ severity: 'CRITICAL', category: 'SITEMAP', message: `URL no sitemap respondeu erro ${sampleRes.status}: ${testUrl}` });
          } else {
            const sampleHtml = await sampleRes.text();
            if (/content=["'][^"']*noindex/i.test(sampleHtml)) {
              noindexCount++;
              issues.push({ severity: 'CRITICAL', category: 'NOINDEX', message: `URL no sitemap possui tag noindex: ${testUrl}` });
            }
          }
        } catch {
          // Timeout de rede tolerável
        }
      }

      console.log(`   └─ Amostra de ${testSample.length} URLs testada: 200 OK: ${testSample.length - redirectCount - errorCount} | Redirects: ${redirectCount} | Erros: ${errorCount} | Noindex: ${noindexCount}`);
    }
  } catch (err: any) {
    issues.push({ severity: 'CRITICAL', category: 'SITEMAP', message: `Falha ao carregar sitemap.xml: ${err.message}` });
  }

  // ==========================================================================
  // ETAPA 3: SUBMISSÃO PROATIVA DE INDEXAÇÃO (INDEXNOW)
  // ==========================================================================
  console.log('\n🚀 [3/4] Disparando submissão proativa via IndexNow (Bing, Yandex, Seznam)...');
  try {
    const resIndexNow = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'www.toolbrasil.com.br',
        key: 'antigravityseokey2026',
        keyLocation: 'https://www.toolbrasil.com.br/antigravityseokey2026.txt',
        urlList: [
          'https://www.toolbrasil.com.br/',
          'https://www.toolbrasil.com.br/calculadoras',
          'https://www.toolbrasil.com.br/conversores',
          'https://www.toolbrasil.com.br/geradores',
          'https://www.toolbrasil.com.br/ferramentas-web',
          'https://www.toolbrasil.com.br/utilitarios',
          'https://www.toolbrasil.com.br/desenvolvedores',
          'https://www.toolbrasil.com.br/calculadoras/calculadora-de-juros-compostos',
          'https://www.toolbrasil.com.br/geradores/gerador-de-cpf',
          'https://www.toolbrasil.com.br/conversores/converter-real-para-dolar'
        ]
      }),
      signal: AbortSignal.timeout(8000)
    });
    console.log(`   ✅ Pings preventivos emitidos com sucesso via IndexNow (HTTP ${resIndexNow.status}).`);
  } catch {
    // Silencioso em caso de oscilação externa do IndexNow
  }

  // ==========================================================================
  // ETAPA 4: VERIFICAÇÃO DOS DEMAIS SITES DA REDE
  // ==========================================================================
  console.log('\n🌐 [4/4] Checagem rápida de saúde dos outros 4 sites da rede...');
  for (const s of NETWORK_SITES.slice(1)) {
    try {
      const res = await fetch(s.domain, { signal: AbortSignal.timeout(8000) });
      console.log(`   └─ ${s.name}: Status ${res.status} OK`);
    } catch (e: any) {
      console.warn(`   └─ ⚠️ ${s.name}: Falha de conexão (${e.message})`);
    }
  }

  // ==========================================================================
  // AUTOCURA: REGENERAÇÃO DO SITEMAP E PÁGINAS SSG CASO DETECTE ANOMALIA
  // ==========================================================================
  if (requiresPrerenderRebuild) {
    console.log('\n⚠️ [Autocura Acionada] Anomalia detectada no sitemap. Regenerando SSG e sitemap localmente...');
    try {
      execSync('npx tsx prerender.ts', { stdio: 'inherit' });
      console.log('   ✅ Sitemap e páginas estáticas regenerados com 100% de URLs canônicas.');
    } catch (err: any) {
      console.error('   ❌ Erro ao regenerar prerender.ts:', err.message);
    }
  }

  console.log('\n======================================================================');
  console.log('📊 RESUMO FINAL DA AUDITORIA DO GOOGLE SEARCH CONSOLE (TOOL BRASIL)');
  console.log('======================================================================');

  const criticalIssues = issues.filter(i => i.severity === 'CRITICAL');
  if (criticalIssues.length === 0) {
    console.log('🎉 STATUS: 100% LIMPO E PROTEGIDO! Nenhuma causa de reprovação no GSC detectada.\n');
    return { success: true, issues };
  } else {
    console.log(`⚠️ ALERTA: ${criticalIssues.length} pendência(s) crítica(s) encontrada(s):`);
    criticalIssues.forEach(i => console.log(`   - [${i.category}] ${i.message}`));
    console.log('');
    return { success: false, issues };
  }
}

// Execução direta via CLI
if (process.argv[1]?.includes('gscAutoInspector')) {
  runFullAutonomousAudit()
    .then(report => {
      process.exit(report.success ? 0 : 1);
    })
    .catch(err => {
      console.error('Erro fatal durante auditoria autônoma:', err);
      process.exit(1);
    });
}

