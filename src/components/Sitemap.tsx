/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TOOLS, PROGRAMMATIC_PAGES } from '../toolsData';
import { EXTRA_PROGRAMMATIC_PAGES } from '../programmaticExtra';

const ALL_PROGRAMMATIC_PAGES = { ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES };

export default function Sitemap() {
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const host = 'https://toolbrasil.com.br';

  const generateSitemapXml = (): string => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    // Home
    xml += `  <url>\n    <loc>${host}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

    // Institutional
    const inst = ['sobre', 'contato', 'privacidade', 'termos', 'cookies', 'transparencia-adsense'];
    inst.forEach(p => {
      xml += `  <url>\n    <loc>${host}/institucional/${p}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.3</priority>\n  </url>\n`;
    });

    // Tools
    TOOLS.forEach(tool => {
      xml += `  <url>\n    <loc>${host}/${tool.categoryId}/${tool.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Programmatic
    Object.keys(ALL_PROGRAMMATIC_PAGES).forEach(key => {
      xml += `  <url>\n    <loc>${host}/programatico/${key}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const handleDownloadXml = () => {
    const xmlContent = generateSitemapXml();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const generateRobotsTxt = (): string => {
    return `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${host}/sitemap.xml`;
  };

  const handleDownloadRobots = () => {
    const robots = generateRobotsTxt();
    const blob = new Blob([robots], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6" id="sitemap-container">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          🗺️ Gerador e Mapa do Site (Sitemap)
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          A estrutura de canais é gerada de forma síncrona para que os rastreadores do Google Boot indexem todas as páginas sem barreiras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-100 dark:border-slate-805">
        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-lg border border-slate-205 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Mapeamento sitemap.xml</h3>
            <p className="text-[11px] text-slate-400">Total de URLs mapeadas para o rastreador: <strong>{1 + 6 + TOOLS.length + Object.keys(PROGRAMMATIC_PAGES).length} indexáveis</strong>.</p>
          </div>
          <button
            onClick={handleDownloadXml}
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded text-xs transition shadow-sm hover:cursor-pointer"
            id="btn-download-sitemap-xml"
          >
            {downloaded ? '✓ Baixado com Sucesso!' : 'Arquivar sitemap.xml Oficial'}
          </button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-lg border border-slate-205 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Diretivas robots.txt</h3>
            <p className="text-[11px] text-slate-400">Controla o comportamento de varredura das ferramentas de busca e bots de IA.</p>
          </div>
          <button
            onClick={handleDownloadRobots}
            className="mt-4 w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 rounded text-xs transition hover:cursor-pointer"
            id="btn-download-robots-txt"
          >
            Arquivar robots.txt Oficial
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Mapeamento Visual (Áreas de Relevância SEO):</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-lg">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 pb-1.5 mb-2">Calculadoras</h4>
            <div className="font-mono text-[10px] text-slate-400 line-clamp-4">
              {TOOLS.filter(t => t.categoryId === 'calculadoras').map(t => `${host}/calculadoras/${t.slug}`).join('\n')}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-lg">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 pb-1.5 mb-2">Conversores</h4>
            <div className="font-mono text-[10px] text-slate-400 line-clamp-4">
              {TOOLS.filter(t => t.categoryId === 'conversores').map(t => `${host}/conversores/${t.slug}`).join('\n')}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-lg">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 pb-1.5 mb-2">Páginas Programáticas</h4>
            <div className="font-mono text-[10px] text-slate-400 line-clamp-4">
              {Object.keys(PROGRAMMATIC_PAGES).map(k => `${host}/programatico/${k}`).join('\n')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
