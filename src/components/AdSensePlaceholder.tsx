/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Contêiner de anúncio Google AdSense responsivo e em total conformidade
 * com as políticas contra modelos vazios e placeholders irregulares.
 */

import React, { useEffect } from 'react';

interface AdSensePlaceholderProps {
  slotId?: 'slot-1' | 'slot-2' | 'slot-3' | 'slot-4';
  position?: 'topo' | 'meio' | 'final' | 'sidebar';
  className?: string;
}

export default function AdSensePlaceholder({ slotId = 'slot-1', position = 'meio', className = '' }: AdSensePlaceholderProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Falha silenciosa para evitar ruído no console
    }
  }, []);

  return (
    <div 
      className={`w-full flex justify-center items-center overflow-hidden transition-all duration-300 relative my-2 ${className}`}
      id={`adsense-wrapper-${slotId}`}
    >
      <ins 
        className="adsbygoogle w-full relative z-10"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-8160658026927094"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
