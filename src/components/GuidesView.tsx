/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowLeft, ArrowRight, Wrench, Search, Sparkles } from 'lucide-react';
import { EDITORIAL_GUIDES, EditorialGuide } from '../guidesData';

interface GuidesViewProps {
  slug?: string | null;
}

function formatDatePtBr(isoDate: string): string {
  const [y, m, d] = isoDate.split('-');
  if (!y || !m || !d) return isoDate;
  return `${d}/${m}/${y}`;
}

function normalizeSearch(value: string): string {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export default function GuidesView({ slug }: GuidesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(EDITORIAL_GUIDES.map((g) => g.category)));
    return ['Todas', ...unique];
  }, []);

  const activeGuide: EditorialGuide | undefined = useMemo(() => {
    if (!slug) return undefined;
    return EDITORIAL_GUIDES.find((g) => g.slug === slug);
  }, [slug]);

  const filteredGuides = useMemo(() => {
    const query = normalizeSearch(searchTerm);
    return EDITORIAL_GUIDES.filter((g) => {
      const catOk = selectedCategory === 'Todas' || g.category === selectedCategory;
      if (!catOk) return false;
      if (!query) return true;
      const haystack = normalizeSearch(`${g.title} ${g.summary} ${g.category} ${g.keywords.join(' ')}`);
      return query.split(/\s+/).every((token) => haystack.includes(token));
    });
  }, [selectedCategory, searchTerm]);

  if (slug && activeGuide) {
    const siblingGuides = EDITORIAL_GUIDES.filter((g) => g.slug !== activeGuide.slug).slice(0, 3);
    const isScheduled = activeGuide.publishedAt > new Date().toISOString().split('T')[0];

    return (
      <article className="space-y-6" id="view-guide-article">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <a
              href="/guias"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Voltar para Guias & Tutoriais
            </a>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold">
              {activeGuide.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {activeGuide.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {activeGuide.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              {isScheduled ? 'Programado para:' : 'Publicado em:'} {formatDatePtBr(activeGuide.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              Leitura estimada: {activeGuide.readTimeMinutes} min
            </span>
            <span>Por <strong className="text-slate-700 dark:text-slate-200">{activeGuide.author}</strong> ({activeGuide.authorRole})</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p className="text-slate-800 dark:text-slate-200 font-medium text-base leading-relaxed">
            {activeGuide.intro}
          </p>

          {activeGuide.sections.map((section, idx) => (
            <section key={idx} className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-1.5 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {activeGuide.faqs.length > 0 && (
            <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Perguntas Frequentes sobre este Tema
              </h2>
              <div className="space-y-3">
                {activeGuide.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <section className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-4 h-4" aria-hidden="true" />
            Ferramentas Gratuitas Recomendadas para Aplicar este Guia
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeGuide.relatedToolLinks.map((toolLink) => (
              <a
                key={toolLink.href}
                href={toolLink.href}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-slate-900 dark:text-slate-100 hover:border-emerald-600 transition"
              >
                <span>{toolLink.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Continue Lendo Outros Guias Práticos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {siblingGuides.map((g) => (
              <a
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-600 transition block space-y-1.5"
              >
                <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">{g.category}</span>
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2">{g.title}</h3>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">{formatDatePtBr(g.publishedAt)}</span>
              </a>
            ))}
          </div>
        </section>
      </article>
    );
  }

  return (
    <div className="space-y-6" id="view-guides-hub">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          Biblioteca Editorial & Guias Técnicos Tool Brasil
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Guias Práticos, Manuais CLT, Finanças e Segurança Digital
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-medium">
          Aprofunde-se na legislação trabalhista brasileira (CLT 2026, INSS, IRRF, 13º salário, rescisão e seguro-desemprego), matemática financeira aplicada, proteção de dados sob a LGPD e diagnósticos de infraestrutura web com exemplos numéricos passo a passo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar guia por assunto (ex: INSS, rescisão, juros, SSL)..."
              aria-label="Buscar nos guias práticos"
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGuides.map((guide) => {
          const isScheduled = guide.publishedAt > new Date().toISOString().split('T')[0];
          return (
            <a
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-emerald-600 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {guide.category}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono">
                    {isScheduled ? `Programado ${formatDatePtBr(guide.publishedAt)}` : formatDatePtBr(guide.publishedAt)}
                  </span>
                </div>
                <h2 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {guide.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {guide.summary}
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>Ler guia completo ({guide.readTimeMinutes} min)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          );
        })}
      </div>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          Critérios Editoriais e Revisão Metodológica da Tool Brasil
        </h2>
        <p>
          Todos os guias práticos publicados na Tool Brasil seguem critérios rigorosos de utilidade pública, conferência numérica e conformidade com normas oficiais brasileiras — incluindo a Consolidação das Leis do Trabalho (CLT), tabelas anuais do INSS e Receita Federal (IRRF), regras do Sistema de Pagamentos Brasileiro (Banco Central/FEBRABAN) e recomendações da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
        </p>
        <p>
          Ao final de cada artigo, você encontra atalhos diretos para executar seus próprios números em nossas mais de 138 ferramentas interativas gratuitas, sem necessidade de cadastro e com processamento integralmente local no navegador.
        </p>
      </section>
    </div>
  );
}
