/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Plugin Vite que gera sitemap.xml automaticamente durante o build.
 * Garante que o Googlebot sempre encontre todas as páginas atualizadas.
 *
 * ⚠️ IMPORTANTE: Ao adicionar/remover ferramentas em toolsData.ts ou
 * programmaticExtra.ts, atualize também as listas toolSlugs e
 * programmaticPages abaixo para manter o sitemap sincronizado.
 */

import { Plugin, ResolvedConfig } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

interface SitemapEntry {
  loc: string;
  changefreq?: string;
  priority?: number;
  lastmod?: string;
}

export function generateSitemapPlugin(): Plugin {
  let config: ResolvedConfig;
  let outDir: string;

  return {
    name: 'generate-sitemap',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      outDir = path.resolve(config.root || process.cwd(), resolvedConfig.build?.outDir || 'dist');
    },
    closeBundle() {
      const host = 'https://toolbrasil.com.br';
      const today = new Date().toISOString().split('T')[0];
      const entries: SitemapEntry[] = [];

      // Home
      entries.push({ loc: `${host}/`, changefreq: 'daily', priority: 1.0, lastmod: today });

      // Categorias
      const categories = [
        { id: 'calculadoras', priority: 0.8 },
        { id: 'conversores', priority: 0.8 },
        { id: 'geradores', priority: 0.8 },
        { id: 'ferramentas-web', priority: 0.8 },
        { id: 'utilitarios', priority: 0.8 },
      ];
      categories.forEach(c => {
        entries.push({ loc: `${host}/${c.id}`, changefreq: 'weekly', priority: c.priority, lastmod: today });
      });

      // Ferramentas (from toolsData.ts - we load it dynamically to match)
      const toolSlugs: { categoryId: string; slug: string; priority: number }[] = [
        // Calculadoras - alta prioridade
        { categoryId: 'calculadoras', slug: 'calculadora-de-juros-compostos', priority: 0.9 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-juros-simples', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'simulador-de-financiamento', priority: 0.9 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-fgts', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-desconto-inss', priority: 0.9 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-ferias-trabalhista', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-rescisao-trabalhista', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-decimo-terceiro', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-imc', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-consumo-combustivel', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-regra-de-tres', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-porcentagem', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-idade-exata', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-dias-entre-datas', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-hora-extra', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-seguro-desemprego', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-salario-liquido', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-ipva', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-imposto-de-renda', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-multa-de-transito', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-preco-por-km', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-gestacao', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-taxa-metabolica-basal', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-margem-de-lucro', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-gorjeta', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-aposentadoria-inss', priority: 0.9 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-pis-pasep', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-icms', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-itbi', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-itcmd', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-preco-de-venda', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-adicional-de-periculosidade', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-adicional-de-insalubridade', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-idade-canina', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-calorias-diarias', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-de-nota-do-enem', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-clt-vs-pj', priority: 0.8 },
        { categoryId: 'calculadoras', slug: 'calculadora-move-brasil', priority: 0.8 },
        // Conversores
        { categoryId: 'conversores', slug: 'converter-metros-para-pes', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-quilos-para-libras', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-celsius-para-fahrenheit', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-real-para-dolar', priority: 0.9 },
        { categoryId: 'conversores', slug: 'converter-mb-para-gb', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-kb-para-mb', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-horas-para-minutos', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-dias-para-horas', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-polegadas-para-centimetros', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-milhas-para-quilometros', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-kmh-para-mph', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-euro-para-real', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-bitcoin-para-real', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-libra-para-real', priority: 0.8 },
        { categoryId: 'conversores', slug: 'converter-peso-argentino-para-real', priority: 0.8 },
        { categoryId: 'conversores', slug: 'conversor-de-numeros-romanos', priority: 0.8 },
        // Geradores
        { categoryId: 'geradores', slug: 'gerador-de-cpf', priority: 0.9 },
        { categoryId: 'geradores', slug: 'gerador-de-cnpj', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-senha-segura', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-qr-code', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-uuid', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-lorem-ipsum', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-hash-md5', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-hash-sha256', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-nome-aleatorio', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-endereco-brasileiro', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-codigo-de-barras', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-placa-mercosul', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-cores-aleatorias', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-rg', priority: 0.8 },
        { categoryId: 'geradores', slug: 'gerador-de-recibo-online', priority: 0.8 },
        // Ferramentas Web
        { categoryId: 'ferramentas-web', slug: 'qual-o-meu-ip', priority: 0.9 },
        { categoryId: 'ferramentas-web', slug: 'localizar-endereco-de-ip', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'consulta-whois', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'consulta-dns-lookup', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'verificador-de-certificado-ssl', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'verificador-de-portas-abertas', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'teste-de-ping-online', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'traceroute-de-rede', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'verificador-de-headers-http', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'verificador-de-status-de-site', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'validador-de-url', priority: 0.8 },
        { categoryId: 'ferramentas-web', slug: 'verificador-de-titulo-de-eleitor', priority: 0.8 },
        // Utilitários
        { categoryId: 'utilitarios', slug: 'contador-de-caracteres', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'contador-de-palavras', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'removedor-de-espacos-duplicados', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'formatador-json', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'minificador-de-css', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'minificador-de-js', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'beautify-json', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'codificador-encode-url', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'decodificador-decode-url', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'cronometro-online', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'separador-de-silabas', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'conversor-maiusculas-minusculas', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'filtro-de-emails', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'comparador-de-textos', priority: 0.8 },
        { categoryId: 'utilitarios', slug: 'validador-de-cartao-de-credito', priority: 0.8 },
      ];

      toolSlugs.forEach(t => {
        entries.push({ loc: `${host}/${t.categoryId}/${t.slug}`, changefreq: 'weekly', priority: t.priority, lastmod: today });
      });

      // Páginas Programáticas
      const programmaticPages: { id: string; priority: number }[] = [
        { id: 'ddd-brasil', priority: 0.7 },
        { id: 'cep-brasil', priority: 0.7 },
        { id: 'bancos-brasil', priority: 0.7 },
        { id: 'cnae-consulta', priority: 0.7 },
        { id: 'cbo-consulta', priority: 0.7 },
        { id: 'salario-minimo-historico', priority: 0.7 },
        { id: 'feriados-nacionais', priority: 0.7 },
        { id: 'selic-historica', priority: 0.7 },
        { id: 'calendario-inss', priority: 0.7 },
        { id: 'codigos-ncm', priority: 0.7 },
        { id: 'codigos-ibge', priority: 0.7 },
        { id: 'ddd-sp', priority: 0.6 },
        { id: 'ddd-rj', priority: 0.6 },
        { id: 'ddd-mg', priority: 0.6 },
        { id: 'ddd-pr', priority: 0.6 },
        { id: 'ddd-sc', priority: 0.6 },
        { id: 'ddd-rs', priority: 0.6 },
        { id: 'ddd-ba', priority: 0.6 },
        { id: 'ddd-ce', priority: 0.6 },
        { id: 'ddd-pe', priority: 0.6 },
        { id: 'ddd-go', priority: 0.6 },
        { id: 'ddd-es', priority: 0.6 },
        { id: 'salario-minimo-1994', priority: 0.5 },
        { id: 'salario-minimo-2000', priority: 0.5 },
        { id: 'salario-minimo-2010', priority: 0.5 },
        { id: 'salario-minimo-2020', priority: 0.5 },
        { id: 'salario-minimo-2025', priority: 0.5 },
        { id: 'tempo-sao-paulo', priority: 0.6 },
        { id: 'tempo-rio-de-janeiro', priority: 0.6 },
        { id: 'tempo-belo-horizonte', priority: 0.6 },
        { id: 'tempo-salvador', priority: 0.6 },
        { id: 'tempo-brasilia', priority: 0.6 },
        { id: 'tempo-fortaleza', priority: 0.6 },
        { id: 'tempo-recife', priority: 0.6 },
        { id: 'tempo-curitiba', priority: 0.6 },
        { id: 'tempo-porto-alegre', priority: 0.6 },
        { id: 'tempo-manaus', priority: 0.6 },
        { id: 'ibge-sp', priority: 0.5 },
        { id: 'ibge-rj', priority: 0.5 },
        { id: 'ibge-mg', priority: 0.5 },
        { id: 'ibge-ba', priority: 0.5 },
        { id: 'ibge-pr', priority: 0.5 },
        { id: 'ibge-rs', priority: 0.5 },
        { id: 'ibge-sc', priority: 0.5 },
        { id: 'ibge-pe', priority: 0.5 },
        { id: 'ibge-ce', priority: 0.5 },
        { id: 'ibge-df', priority: 0.5 },
        { id: 'gerar-senha-forte', priority: 0.6 },
        { id: 'gerar-cpf-valido', priority: 0.6 },
        { id: 'calcular-porcentagem-online', priority: 0.6 },
        { id: 'calcular-inss-salario', priority: 0.6 },
        { id: 'calcular-imc-gratis', priority: 0.6 },
        { id: 'simular-aposentadoria-por-idade', priority: 0.6 },
        { id: 'calcular-13o-salario', priority: 0.6 },
        { id: 'calcular-rescisao-trabalhista', priority: 0.6 },
        { id: 'simular-financiamento-casa-propria', priority: 0.6 },
        { id: 'consultar-cep-correios', priority: 0.6 },
        { id: 'consultar-ddd-telefone', priority: 0.6 },
        { id: 'gerar-cnpj-valido', priority: 0.6 },
        { id: 'gerar-qr-code-pix', priority: 0.6 },
        { id: 'calcular-juros-compostos-mensais', priority: 0.6 },
      ];

      programmaticPages.forEach(p => {
        entries.push({ loc: `${host}/programatico/${p.id}`, changefreq: 'weekly', priority: p.priority, lastmod: today });
      });

      // Páginas Institucionais
      const institutionalPages = ['sobre', 'contato', 'privacidade', 'termos', 'cookies', 'transparencia-adsense'];
      institutionalPages.forEach(p => {
        entries.push({ loc: `${host}/institucional/${p}`, changefreq: 'monthly', priority: 0.4, lastmod: today });
      });

      // Sitemap HTML
      entries.push({ loc: `${host}/sitemap`, changefreq: 'weekly', priority: 0.5, lastmod: today });

      // Gerar XML
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n';
      entries.forEach(e => {
        xml += '  <url>\n';
        xml += `    <loc>${e.loc}</loc>\n`;
        if (e.lastmod) xml += `    <lastmod>${e.lastmod}</lastmod>\n`;
        if (e.changefreq) xml += `    <changefreq>${e.changefreq}</changefreq>\n`;
        if (e.priority) xml += `    <priority>${e.priority}</priority>\n`;
        xml += '  </url>\n';
      });
      xml += '</urlset>';

      // Salvar no diretório de saída do build
      const sitemapPath = path.join(outDir, 'sitemap.xml');
      try {
        fs.writeFileSync(sitemapPath, xml, 'utf-8');
        console.log(`\n✅ Sitemap gerado automaticamente: ${sitemapPath} (${entries.length} URLs)`);
      } catch (err) {
        console.error('❌ Erro ao gerar sitemap:', err);
      }
    },
  };
}
