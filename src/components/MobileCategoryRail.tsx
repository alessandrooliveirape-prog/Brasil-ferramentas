/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MobileCategoryRail.tsx — Trilha Horizontal de Categorias Mobile-First
 * Barra deslizante por toque (touch scrollable) exibida no topo do mobile (< lg)
 * para descoberta instantânea de ferramentas sem precisar rolar até o rodapé.
 */

import React from 'react';
import {
  Home,
  Calculator,
  RefreshCw,
  Package,
  Globe,
  Wrench
} from 'lucide-react';
import { CATEGORIES, TOOLS } from '../toolsData';

interface MobileCategoryRailProps {
  currentCategory: string | null;
  currentView: string;
}

export default function MobileCategoryRail({ currentCategory, currentView }: MobileCategoryRailProps) {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'calculadoras': return <Calculator className="w-3.5 h-3.5" />;
      case 'conversores': return <RefreshCw className="w-3.5 h-3.5" />;
      case 'geradores': return <Package className="w-3.5 h-3.5" />;
      case 'ferramentas-web': return <Globe className="w-3.5 h-3.5" />;
      case 'utilitarios': return <Wrench className="w-3.5 h-3.5" />;
      default: return <Wrench className="w-3.5 h-3.5" />;
    }
  };

  const isHomeActive = currentView === 'home';

  return (
    <nav
      className="lg:hidden w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-2 px-3 overflow-x-auto no-scrollbar"
      aria-label="Navegação rápida de categorias"
    >
      <div className="flex items-center gap-1.5 min-w-max">
        {/* Botão Home */}
        <a
          href="/"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            isHomeActive
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Início</span>
        </a>

        {/* Categorias */}
        {CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').map(cat => {
          const isActive = currentCategory === cat.id;
          const count = TOOLS.filter(t => t.categoryId === cat.id).length;

          return (
            <a
              key={cat.id}
              href={`/${cat.id}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.name}</span>
              <span
                className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
