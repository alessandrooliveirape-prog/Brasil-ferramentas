/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Contêineres de anúncio Google AdSense - visíveis e responsivos.
 * Prontos para receber tanto anúncios automáticos quanto manuais.
 */

import React, { useEffect } from 'react';

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

// Map slots to actual AdSense Ad Unit IDs (you should replace these with actual IDs)
const slotAdIds: Record<string, string> = {
  'slot-1': '1111111111', 
  'slot-2': '2222222222',
  'slot-3': '3333333333',
  'slot-4': '4444444444',
};

export default function AdSensePlaceholder({ slotId, position, className = '' }: AdSensePlaceholderProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense erro:', e);
    }
  }, []);

  return (
    <div 
      className={`w-full bg-slate-100/40 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/60 rounded-xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 relative ${positionStyles[position] || 'min-h-[90px]'} ${className}`}
      id={`adsense-wrapper-${slotId}`}
    >
      <span className="text-[9px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase select-none pointer-events-none absolute top-1 left-2 z-0">
        Publicidade
      </span>
      
      <ins className="adsbygoogle w-full h-full relative z-10"
           style={{ display: 'block', minHeight: '90px' }}
           data-ad-client="ca-pub-8160658026927094"
           data-ad-slot={slotAdIds[slotId] || "1111111111"}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
}
