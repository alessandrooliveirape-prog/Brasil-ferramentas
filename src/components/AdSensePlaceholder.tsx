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
      className={`w-full bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/60 rounded-xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${positionStyles[position] || 'min-h-[90px]'} ${className}`}
      id={`adsense-wrapper-${slotId}`}
      data-ad-slot={slotId}
      data-ad-position={position}
    >
      {/* Google AdSense policy compliant labeling to identify ad spaces */}
      <span className="text-[9px] font-mono tracking-widest text-slate-400 dark:text-slate-650 uppercase select-none pointer-events-none">
        Publicidade
      </span>
    </div>
  );
}
