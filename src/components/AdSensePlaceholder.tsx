/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Contêineres de anúncio Google AdSense - visíveis e responsivos.
 * Prontos para receber tanto anúncios automáticos quanto manuais.
 */

import React from 'react';

interface AdSensePlaceholderProps {
  slotId: 'slot-1' | 'slot-2' | 'slot-3' | 'slot-4';
  position: 'topo' | 'meio' | 'final' | 'sidebar';
  className?: string;
}

const positionStyles: Record<string, string> = {
  topo: 'min-h-[90px] md:min-h-[120px]',
  meio: 'min-h-[120px] md:min-h-[160px]',
  final: 'min-h-[90px] md:min-h-[120px]',
  sidebar: 'min-h-[250px] md:min-h-[400px]',
};

export default function AdSensePlaceholder({ slotId, position, className = '' }: AdSensePlaceholderProps) {
  return (
    <div 
      className={`w-full bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden ${positionStyles[position] || 'min-h-[90px]'} ${className}`}
      id={`adsense-wrapper-${slotId}`}
      data-ad-slot={slotId}
      data-ad-position={position}
    >
      {/* 
        O Google AdSense (auto-ads ou manual) irá inserir os anúncios aqui.
        O espaço é mantido visível para o rastreador do Google e para prevenir
        layout shift (CLS) quando os anúncios carregarem.
      */}
    </div>
  );
}
