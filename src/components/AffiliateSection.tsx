/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AffiliateSection - Seção de produtos recomendados (Amazon/Shopee)
 * Exibe links de afiliado contextuais nas páginas das ferramentas.
 * 
 * Políticas seguidas:
 * - Disclosure obrigatório visível
 * - Links com rel="sponsored noopener noreferrer"
 * - Abertura em nova aba (target="_blank")
 * - Links de afiliado SEM cloaking ou redirecionamento oculto
 */

import React from 'react';
import { ShoppingBag, ExternalLink, Store } from 'lucide-react';
import { getAffiliatesForTool, AffiliateProduct } from '../config/affiliate-links';

interface AffiliateSectionProps {
  toolId: string;
}

export default function AffiliateSection({ toolId }: AffiliateSectionProps) {
  const products = getAffiliatesForTool(toolId);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm" id="affiliate-section">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="w-4 h-4 text-emerald-500" />
        <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
          Produtos Recomendados
        </h3>
      </div>

      <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">
        💰 Como associado da Amazon e Shopee, ganhamos comissões sobre compras qualificadas 
        realizadas através dos links abaixo. Os preços e a disponibilidade são de responsabilidade 
        das respectivas plataformas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-lg p-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5 mb-3">
              <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 leading-snug">
                {product.title}
              </h4>
              {product.description && (
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              {product.amazonUrl && (
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold rounded-lg transition-colors"
                >
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M13.483 0a.165.165 0 00-.077.027L.493 6.898a.165.165 0 00-.006.285l5.924 3.832c.046.03.104.032.15.006l7.55-4.62a.165.165 0 01.154 0l6.616 3.74a.165.165 0 01.083.14v4.908a.165.165 0 01-.083.14l-6.616 3.74a.165.165 0 01-.154 0l-7.524-4.606a.165.165 0 00-.15-.006L.487 14.85a.165.165 0 00.006.285l12.983 6.84a.165.165 0 00.154 0l12.985-6.84a.165.165 0 00.006-.285l-5.929-3.833a.165.165 0 00-.15-.006l-7.546 4.623a.165.165 0 01-.154 0L5.86 11.1a.165.165 0 01-.083-.14V6.052a.165.165 0 01.083-.14l6.623-3.744a.165.165 0 01.154 0l7.525 4.607a.165.165 0 00.15-.005l5.926-3.833a.165.165 0 00-.006-.285L13.56.027a.165.165 0 00-.077-.027z'/%3E%3C/svg%3E" alt="" className="w-3 h-3" aria-hidden="true" />
                  <span>Ver na Amazon</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              {product.shopeeUrl && (
                <a
                  href={product.shopeeUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold rounded-lg transition-colors"
                >
                  <Store className="w-2.5 h-2.5" />
                  <span>Ver na Shopee</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
