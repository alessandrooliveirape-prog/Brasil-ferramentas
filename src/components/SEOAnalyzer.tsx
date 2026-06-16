/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ToolMetadata } from '../types';

interface SEOAnalyzerProps {
  tool: ToolMetadata;
  currentHost?: string;
}

export default function SEOAnalyzer({ tool, currentHost = 'https://toolbrasil.com.br' }: SEOAnalyzerProps) {
  const [activeTab, setActiveTab] = useState<'serp' | 'schema' | 'metadata'>('serp');
  
  const canonicalUrl = `${currentHost}/${tool.categoryId}/${tool.slug}`;
  const d = new Date();
  const dateStr = `${d.getDate()} de ${d.toLocaleString('pt-BR', { month: 'short' })}. de ${d.getFullYear()}`;

  // Schema.org JSON-LD structured data simulation
  const jsonLdMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.title,
    "url": canonicalUrl,
    "description": tool.shortDescription,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "BRL"
    },
    "faqPage": {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": tool.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 shadow-lg border border-slate-800 transition-all" id="seo-analyzer-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
        <div>
          <h3 className="font-semibold text-base text-emerald-400 flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            Painel SEO Programático & Audit
          </h3>
          <p className="text-xs text-slate-400">Verifique as tags indexáveis do Google e as configurações de meta-crawlers.</p>
        </div>
        <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('serp')}
            className={`px-3 py-1 text-xs rounded-md transition-colors hover:cursor-pointer ${activeTab === 'serp' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-300'}`}
            id="btn-seo-tab-serp"
          >
            Google SERP
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1 text-xs rounded-md transition-colors hover:cursor-pointer ${activeTab === 'schema' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-300'}`}
            id="btn-seo-tab-schema"
          >
            Schema.org LD
          </button>
          <button
            onClick={() => setActiveTab('metadata')}
            className={`px-3 py-1 text-xs rounded-md transition-colors hover:cursor-pointer ${activeTab === 'metadata' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-300'}`}
            id="btn-seo-tab-meta"
          >
            Open Graph / Meta
          </button>
        </div>
      </div>

      {activeTab === 'serp' && (
        <div className="space-y-4 animate-fade-in" id="seo-preview-serp">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300">Anúncio</span>
              <span>www.google.com/search?q={tool.slug}</span>
            </div>
            
            {/* Live Google Search snippet simulator */}
            <div className="text-blue-400 text-lg md:text-xl font-medium leading-snug hover:underline cursor-pointer truncate">
              {tool.title} | {CATEGORIES_MAP[tool.categoryId] || 'Tool Brasil'}
            </div>
            
            <div className="text-emerald-500 text-xs truncate mt-0.5" id="serp-canonical-url">
              {canonicalUrl}
            </div>
            
            <p className="text-slate-300 text-xs md:text-sm mt-1.5 leading-relaxed">
              <span className="text-slate-400 font-medium">{dateStr} — </span>
              {tool.shortDescription} ✓ 100% Grátis, Seguro e Online para uso imediato sem cadastro. Acesse agora e confira!
            </p>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between bg-slate-950/40 p-2 rounded">
            <span>✓ Otimizado para indexadores Mobile-First.</span>
            <span className="text-emerald-400 font-mono">Duração: {tool.shortDescription.length + 50} caracteres (Ideal)</span>
          </div>
        </div>
      )}

      {activeTab === 'schema' && (
        <div className="space-y-4 animate-fade-in" id="seo-preview-schema">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 font-mono text-[10px] overflow-x-auto text-slate-300 max-h-[220px] scrollbar-thin">
            <pre>{JSON.stringify(jsonLdMarkup, null, 2)}</pre>
          </div>
          <p className="text-[11px] text-slate-400">
            Este JSON-LD indica que a página é uma <strong>WebApplication</strong> gratuita com suporte para FAQ microdata integrado, o que garante a inclusão de rich snippets (perguntas frequentes estruturadas) diretamente no resultado de pesquisa do Google.
          </p>
        </div>
      )}

      {activeTab === 'metadata' && (
        <div className="space-y-3 animate-fade-in text-xs font-mono" id="seo-preview-meta">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-850 text-[11px] text-slate-300">
            <div>
              <span className="text-rose-400">title:</span> {tool.title}
            </div>
            <div>
              <span className="text-rose-400">canonical:</span> {canonicalUrl}
            </div>
            <div>
              <span className="text-emerald-400">og:type:</span> website
            </div>
            <div>
              <span className="text-emerald-400">og:site_name:</span> Tool Brasil
            </div>
            <div className="col-span-1 md:col-span-2">
              <span className="text-emerald-400">og:image:</span> {currentHost}/assets/images/og-{tool.id}.png
            </div>
            <div className="col-span-1 md:col-span-2">
              <span className="text-rose-400">description:</span> {tool.shortDescription}
            </div>
            <div>
              <span className="text-blue-400">robots:</span> index, follow
            </div>
            <div>
              <span className="text-blue-400">viewport:</span> width=device-width, initial-scale=1.0
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Tags Open Graph configuradas para garantir alta taxa de cliques (CTR) ao compartilhar o portal em redes sociais como WhatsApp, Facebook e LinkedIn.
          </p>
        </div>
      )}
    </div>
  );
}

const CATEGORIES_MAP: { [key: string]: string } = {
  calculadoras: 'Calculadoras',
  conversores: 'Conversores',
  geradores: 'Geradores',
  'ferramentas-web': 'Ferramentas Web',
  utilitarios: 'Utilitários'
};
