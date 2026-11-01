/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CommandPalette.tsx — Busca Rápida Flutuante Global (Ctrl+K / Cmd+K)
 * Modal flutuante com busca instantânea tolerante a acentos, histórico recente,
 * navegação por teclado (↑, ↓, Enter, Esc) e design glassmorphic acessível.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Flame,
  CornerDownLeft,
  Calculator,
  RefreshCw,
  Package,
  Globe,
  Wrench,
  FileSearch,
  Clock
} from 'lucide-react';
import { TOOLS, CATEGORIES, PROGRAMMATIC_PAGES } from '../toolsData';
import { EXTRA_PROGRAMMATIC_PAGES } from '../programmaticExtra';

const ALL_PROGRAMMATIC_PAGES = { ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES };

function normalizeSearchText(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function matchesSearchTokens(haystack: string, rawQuery: string): boolean {
  const normHaystack = normalizeSearchText(haystack);
  const tokens = normalizeSearchText(rawQuery)
    .split(/\s+/)
    .filter(Boolean);
  if (tokens.length === 0) return true;
  return tokens.every(token => normHaystack.includes(token));
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Carregar histórico recente e focar no input ao abrir
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      try {
        const savedRecent = localStorage.getItem('toolbrasil_recent_tools_v1');
        if (savedRecent) {
          const parsed = JSON.parse(savedRecent);
          if (Array.isArray(parsed)) setRecentIds(parsed);
        }
      } catch {
        // Ignora erro de localStorage
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Tratar teclas de navegação (setas, enter, esc)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, query, recentIds]);

  // Rolar para o item selecionado ao navegar por teclado
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Filtragem de ferramentas e páginas programáticas
  const getFilteredItems = () => {
    const q = query.trim();

    if (!q) {
      // 1. Últimas ferramentas acessadas pelo usuário
      const recentTools = recentIds
        .map(id => TOOLS.find(t => t.id === id))
        .filter(Boolean)
        .slice(0, 4) as any[];

      const recentMapped = recentTools.map(t => ({
        id: `recent-${t.id}`,
        title: t.title,
        description: t.shortDescription,
        path: `/${t.categoryId}/${t.slug}`,
        categoryId: t.categoryId,
        badge: 'Recente 🕒',
        isRecent: true
      }));

      // 2. Sugestões populares complementares
      const curatedIds = [
        'salario-liquido',
        'rescisao',
        'ferias',
        'inss',
        'juros-compostos',
        'cpf',
        'real-para-dolar',
        'senha'
      ].filter(id => !recentIds.includes(id));

      const curated = curatedIds
        .map(id => TOOLS.find(t => t.id === id))
        .filter(Boolean)
        .slice(0, 8 - recentMapped.length) as any[];

      const curatedMapped = curated.map(t => ({
        id: t.id,
        title: t.title,
        description: t.shortDescription,
        path: `/${t.categoryId}/${t.slug}`,
        categoryId: t.categoryId,
        badge: 'Popular 🔥',
        isRecent: false
      }));

      return [...recentMapped, ...curatedMapped];
    }

    // Busca nas 138 ferramentas (tolerante a acentos e múltiplos termos)
    const toolMatches = TOOLS.filter(t =>
      matchesSearchTokens(`${t.title} ${t.shortDescription} ${t.slug} ${t.id}`, q)
    ).map(t => ({
      id: t.id,
      title: t.title,
      description: t.shortDescription,
      path: `/${t.categoryId}/${t.slug}`,
      categoryId: t.categoryId,
      badge: CATEGORIES.find(c => c.id === t.categoryId)?.name || t.categoryId,
      isRecent: recentIds.includes(t.id)
    }));

    // Busca nas 88 páginas programáticas
    const progMatches = Object.entries(ALL_PROGRAMMATIC_PAGES)
      .filter(([id, page]) => matchesSearchTokens(`${page.title} ${page.description} ${id}`, q))
      .map(([id, page]) => ({
        id,
        title: page.title,
        description: page.description,
        path: `/programatico/${id}`,
        categoryId: 'programatico',
        badge: 'Tabela Oficial 📊',
        isRecent: false
      }));

    // Busca na Central de Desenvolvedores / API
    const devMatches = [];
    const normQ = normalizeSearchText(q);
    if (
      'api publica desenvolvedores endpoints widgets docs json'.includes(normQ) ||
      normQ.includes('api') ||
      normQ.includes('dev') ||
      normQ.includes('wid')
    ) {
      devMatches.push({
        id: 'api-docs',
        title: 'API Pública & Central de Desenvolvedores',
        description: 'Documentação dos endpoints REST estáticos (CPF, CNPJ, INSS, IRRF) e gerador de widgets.',
        path: '/desenvolvedores',
        categoryId: 'desenvolvedores',
        badge: 'API ⚡',
        isRecent: false
      });
    }

    return [...devMatches, ...toolMatches, ...progMatches].slice(0, 18);
  };

  const filteredItems = getFilteredItems();

  const handleSelect = (item: any) => {
    onClose();
    onNavigate(item.path);
  };

  const renderCategoryIcon = (catId: string, isRecent?: boolean) => {
    if (isRecent) return <Clock className="w-4 h-4 text-emerald-600" />;
    switch (catId) {
      case 'calculadoras': return <Calculator className="w-4 h-4 text-emerald-600" />;
      case 'conversores': return <RefreshCw className="w-4 h-4 text-blue-600" />;
      case 'geradores': return <Package className="w-4 h-4 text-purple-600" />;
      case 'ferramentas-web': return <Globe className="w-4 h-4 text-indigo-600" />;
      case 'utilitarios': return <Wrench className="w-4 h-4 text-amber-600" />;
      case 'programatico': return <FileSearch className="w-4 h-4 text-rose-600" />;
      default: return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Barra de Busca Superior */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Busque entre 138+ ferramentas e tabelas (ex: ferias, rescisao, inss, cpf, dolar)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
              title="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Lista de Resultados */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-1 flex-grow divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <span className="text-2xl">🔍</span>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Nenhuma ferramenta encontrada para "{query}"
              </p>
              <p className="text-[11px] text-slate-500">
                Tente buscar por "Férias", "Rescisão", "Salário", "Juros", "CPF", "IP" ou "Dólar".
              </p>
            </div>
          ) : (
            <>
              {!query && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{recentIds.length > 0 ? 'Acessadas Recentemente & Mais Usadas' : 'Ferramentas Mais Acessadas'}</span>
                </div>
              )}

              {filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id + index}
                    data-index={index}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 shadow-xs'
                        : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                        {renderCategoryIcon(item.categoryId, item.isRecent)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate block">
                            {item.title}
                          </span>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            item.isRecent
                              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                              : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 text-slate-400">
                      {isSelected && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          Abrir <CornerDownLeft className="w-3 h-3" />
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Rodapé Informativo */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9.5px] font-mono bg-white dark:bg-slate-800 border rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 text-[9.5px] font-mono bg-white dark:bg-slate-800 border rounded">↓</kbd> Navegar
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[9.5px] font-mono bg-white dark:bg-slate-800 border rounded">↵</kbd> Acessar
            </span>
          </div>
          <span className="text-[10px] font-mono">Tool Brasil • 138+ Ferramentas & 88 Tabelas Oficiais</span>
        </div>
      </div>
    </div>
  );
}
