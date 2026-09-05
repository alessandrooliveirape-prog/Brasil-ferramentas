/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CommandPalette.tsx — Busca Rápida Flutuante Global (Ctrl+K / Cmd+K)
 * Modal flutuante com busca instantânea, navegação por teclado (↑, ↓, Enter, Esc),
 * sugestões de ferramentas populares e design glassmorphic acessível.
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
  Shield
} from 'lucide-react';
import { TOOLS, CATEGORIES, PROGRAMMATIC_PAGES } from '../toolsData';
import { EXTRA_PROGRAMMATIC_PAGES } from '../programmaticExtra';

const ALL_PROGRAMMATIC_PAGES = { ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES };

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focar no input automaticamente ao abrir
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
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
  }, [isOpen, selectedIndex, query]);

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
    const q = query.trim().toLowerCase();

    if (!q) {
      // Sugestões populares quando a busca está vazia
      const curated = [
        TOOLS.find(t => t.id === 'descomplica-contrato'),
        TOOLS.find(t => t.id === 'juros-compostos'),
        TOOLS.find(t => t.id === 'cpf'),
        TOOLS.find(t => t.id === 'real-para-dolar'),
        TOOLS.find(t => t.id === 'senha'),
        TOOLS.find(t => t.id === 'inss')
      ].filter(Boolean) as any[];

      return curated.map(t => ({
        id: t.id,
        title: t.title,
        description: t.shortDescription,
        path: `/${t.categoryId}/${t.slug}`,
        categoryId: t.categoryId,
        badge: t.id === 'descomplica-contrato' ? 'Novo ⚡' : 'Popular 🔥'
      }));
    }

    // Busca nas ferramentas
    const toolMatches = TOOLS.filter(
      t => t.title.toLowerCase().includes(q) || t.shortDescription.toLowerCase().includes(q)
    ).map(t => ({
      id: t.id,
      title: t.title,
      description: t.shortDescription,
      path: `/${t.categoryId}/${t.slug}`,
      categoryId: t.categoryId,
      badge: CATEGORIES.find(c => c.id === t.categoryId)?.name || t.categoryId
    }));

    // Busca nas páginas programáticas
    const progMatches = Object.entries(ALL_PROGRAMMATIC_PAGES)
      .filter(([id, page]) => page.title.toLowerCase().includes(q) || page.description.toLowerCase().includes(q))
      .map(([id, page]) => ({
        id,
        title: page.title,
        description: page.description,
        path: `/programatico/${id}`,
        categoryId: 'programatico',
        badge: 'Guia Rápido'
      }));

    return [...toolMatches, ...progMatches].slice(0, 15);
  };

  const filteredItems = getFilteredItems();

  const handleSelect = (item: any) => {
    onClose();
    onNavigate(item.path);
  };

  const renderCategoryIcon = (catId: string) => {
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
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="O que você precisa calcular, gerar ou converter hoje?..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
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
                Tente buscar por "Juros", "CPF", "Contrato", "IP", "Dólar" ou navegue pelas categorias.
              </p>
            </div>
          ) : (
            <>
              {!query && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-emerald-500" /> Ferramentas Recomendadas
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
                        {renderCategoryIcon(item.categoryId)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate block">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
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
          <span className="text-[10px] font-mono">Tool Brasil • 45+ Utilitários Gratuitos</span>
        </div>
      </div>
    </div>
  );
}
