/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface AdSensePlaceholderProps {
  slotId: 'slot-1' | 'slot-2' | 'slot-3' | 'slot-4';
  position: 'topo' | 'meio' | 'final' | 'sidebar';
  className?: string;
}

export default function AdSensePlaceholder({ slotId, position, className = '' }: AdSensePlaceholderProps) {
  const [showSimulateEarn, setShowSimulateEarn] = useState(false);
  
  // Real simulated AdSense slots for desktop and mobile
  const slotDetails = {
    'slot-1': { label: 'AdSense Slot 1 (Premium Banner Topo)', size: '728x90 (Desktop) / 320x50 (Mobile)' },
    'slot-2': { label: 'AdSense Slot 2 (Inner Content Native)', size: 'Responsive / Text & Image Link' },
    'slot-3': { label: 'AdSense Slot 3 (Sidebar Skyscraper)', size: '300x600 (Desktop) / 300x250 (Mobile)' },
    'slot-4': { label: 'AdSense Slot 4 (Bottom Board Banner)', size: '970x90 (Desktop) / 320x100 (Mobile)' },
  };

  const current = slotDetails[slotId];

  return (
    <div className={`my-6 bg-slate-50 border border-dashed border-slate-300 dark:bg-slate-900/40 dark:border-slate-800 rounded-lg p-4 text-center transition-all hover:bg-slate-100/80 ${className}`} id={`adsense-wrapper-${slotId}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded">
          Publicidade Patrocinada
        </span>
        <span className="text-[10px] font-mono text-slate-400" id={`adsense-label-${slotId}`}>
          {current.size}
        </span>
      </div>
      
      <div className="py-6 flex flex-col items-center justify-center">
        <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5" id={`adsense-title-${slotId}`}>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></div>
          {current.label}
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-md">
          Este espaço está em conformidade com as políticas do Google AdSense para otimização de RPM e preenchimento automático.
        </p>
        
        <button
          onClick={() => setShowSimulateEarn(!showSimulateEarn)}
          className="mt-3 text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline hover:cursor-pointer"
          id={`btn-ads-sim-${slotId}`}
        >
          {showSimulateEarn ? 'Ocultar projeção de receita' : 'Simular CPM de nicho de ferramentas'}
        </button>

        {showSimulateEarn && (
          <div className="mt-2 text-left p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-100 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300 max-w-xs animate-fade-in" id={`adsense-proj-${slotId}`}>
            <span className="font-semibold block mb-0.5">Métricas de Otimização (Programático):</span>
            • Nicho de Ferramentas: CPM Médio R$ 12,50 - R$ 24,00<br />
            • CTR Estimado: 1.8% - 2.5%<br />
            • Visibilidade de Layout: Active View &gt; 85%
          </div>
        )}
      </div>
    </div>
  );
}
