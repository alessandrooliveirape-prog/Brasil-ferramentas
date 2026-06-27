/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface ConversoresProps {
  toolId: string;
}

export default function Conversores({ toolId }: ConversoresProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm" id="conversor-container">
      {toolId === 'metros-para-pes' && <MetrosPes />}
      {toolId === 'quilos-para-libras' && <QuilosLibras />}
      {toolId === 'celsius-para-fahrenheit' && <CelsiusFahrenheit />}
      {toolId === 'real-para-dolar' && <RealDolar />}
      {toolId === 'mb-para-gb' && <MbGb />}
      {toolId === 'kb-para-mb' && <KbMb />}
      {toolId === 'horas-para-minutos' && <HorasMinutos />}
      {toolId === 'dias-para-horas' && <DiasHoras />}
      {toolId === 'polegadas-para-centimetros' && <PolegadasCm />}
      {toolId === 'milhas-para-quilometros' && <MilhasKm />}
      {toolId === 'kmh-para-mph' && <KmhMph />}
      {toolId === 'euro-para-real' && <EuroReal />}
      {toolId === 'bitcoin-para-real' && <BitcoinReal />}
      {toolId === 'libra-para-real' && <LibraReal />}
      {toolId === 'numeros-romanos' && <NumerosRomanos />}
      {toolId === 'peso-argentino-para-real' && <PesoArgentinoReal />}
    </div>
  );
}

// 1. METROS PARA PÉS
function MetrosPes() {
  const [metros, setMetros] = useState<string>('1');
  const [pes, setPes] = useState<string>('3.2808');

  const updateMetros = (val: string) => {
    setMetros(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setPes((n * 3.28084).toFixed(4));
    } else {
      setPes('');
    }
  };

  const updatePes = (val: string) => {
    setPes(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setMetros((n / 3.28084).toFixed(4));
    } else {
      setMetros('');
    }
  };

  return (
    <div className="space-y-6" id="conv-mp">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Metros para Pés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Métricas em Metros (m)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base focus:outline-emerald-500" value={metros} onChange={(e) => updateMetros(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">metros</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Imperial em Pés (ft)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base focus:outline-emerald-500" value={pes} onChange={(e) => updatePes(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">pés</span>
        </div>
      </div>
    </div>
  );
}

// 2. QUILOS PARA LIBRAS
function QuilosLibras() {
  const [kg, setKg] = useState<string>('1');
  const [lb, setLb] = useState<string>('2.2046');

  const updateKg = (val: string) => {
    setKg(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setLb((n * 2.20462).toFixed(4));
    } else {
      setLb('');
    }
  };

  const updateLb = (val: string) => {
    setLb(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setKg((n / 2.20462).toFixed(4));
    } else {
      setKg('');
    }
  };

  return (
    <div className="space-y-6" id="conv-kl">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Quilos para Libras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Massa em Quilogramas (kg)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={kg} onChange={(e) => updateKg(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">kg</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Massa em Libras (lbs)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={lb} onChange={(e) => updateLb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">lb</span>
        </div>
      </div>
    </div>
  );
}

// 3. CELSIUS PARA FAHRENHEIT
function CelsiusFahrenheit() {
  const [c, setC] = useState<string>('0');
  const [f, setF] = useState<string>('32');

  const updateC = (val: string) => {
    setC(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setF(((n * 9) / 5 + 32).toFixed(1));
    } else {
      setF('');
    }
  };

  const updateF = (val: string) => {
    setF(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setC((((n - 32) * 5) / 9).toFixed(1));
    } else {
      setC('');
    }
  };

  return (
    <div className="space-y-6" id="conv-cf">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Temperatura</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Escala Métrica Celsius (°C)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={c} onChange={(e) => updateC(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">°C</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Escala Imperial Fahrenheit (°F)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={f} onChange={(e) => updateF(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">°F</span>
        </div>
      </div>
    </div>
  );
}

// 4. REAL PARA DÓLAR
function RealDolar() {
  const [brl, setBrl] = useState<string>('50');
  const [usd, setUsd] = useState<string>('10');
  const [cotacao, setCotacao] = useState<number>(5.0); // Cotação ajustável

  const updateBrl = (val: string, cot: number = cotacao) => {
    setBrl(val);
    const n = parseFloat(val);
    if (!isNaN(n) && cot > 0) {
      setUsd((n / cot).toFixed(2));
    } else {
      setUsd('');
    }
  };

  const updateUsd = (val: string, cot: number = cotacao) => {
    setUsd(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setBrl((n * cot).toFixed(2));
    } else {
      setBrl('');
    }
  };

  const changeCotacao = (newCot: number) => {
    setCotacao(newCot);
    updateBrl(brl, newCot);
  };

  return (
    <div className="space-y-6" id="conv-rd">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor Real ⇄ Dólar (Câmbio Ajustável)</h2>
      
      <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-500">Cotação 1 USD =</span>
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-400">R$</span>
          <input type="number" step="0.01" className="w-20 text-center border p-1 rounded font-mono text-xs bg-white dark:bg-slate-800 dark:text-slate-100" value={cotacao} onChange={(e) => changeCotacao(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Moeda Local - Real (R$)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={brl} onChange={(e) => updateBrl(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">BRL</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Moeda Base - Dólar (US$)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={usd} onChange={(e) => updateUsd(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">USD</span>
        </div>
      </div>
    </div>
  );
}

// 5. MB PARA GB
function MbGb() {
  const [mb, setMb] = useState<string>('1024');
  const [gb, setGb] = useState<string>('1');

  const updateMb = (val: string) => {
    setMb(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setGb((n / 1024).toFixed(4));
    } else {
      setGb('');
    }
  };

  const updateGb = (val: string) => {
    setGb(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setMb((n * 1024).toFixed(0));
    } else {
      setMb('');
    }
  };

  return (
    <div className="space-y-6" id="conv-mg">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Megabytes para Gigabytes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tamanho em Megabytes (MB)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={mb} onChange={(e) => updateMb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">MB</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tamanho em Gigabytes (GB)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={gb} onChange={(e) => updateGb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">GB</span>
        </div>
      </div>
    </div>
  );
}

// 6. KB PARA MB
function KbMb() {
  const [kb, setKb] = useState<string>('1024');
  const [mb, setMb] = useState<string>('1');

  const updateKb = (val: string) => {
    setKb(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setMb((n / 1024).toFixed(4));
    } else {
      setMb('');
    }
  };

  const updateMb = (val: string) => {
    setMb(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setKb((n * 1024).toFixed(0));
    } else {
      setKb('');
    }
  };

  return (
    <div className="space-y-6" id="conv-km">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Kilobytes para Megabytes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tamanho em Kilobytes (KB)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={kb} onChange={(e) => updateKb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">KB</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tamanho em Megabytes (MB)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={mb} onChange={(e) => updateMb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">MB</span>
        </div>
      </div>
    </div>
  );
}

// 7. HORAS PARA MINUTOS
function HorasMinutos() {
  const [horas, setHoras] = useState<string>('2');
  const [minutos, setMinutos] = useState<string>('120');

  const updateHoras = (val: string) => {
    setHoras(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setMinutos((n * 60).toFixed(0));
    } else {
      setMinutos('');
    }
  };

  const updateMinutos = (val: string) => {
    setMinutos(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setHoras((n / 60).toFixed(2));
    } else {
      setHoras('');
    }
  };

  return (
    <div className="space-y-6" id="conv-hm">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Horas para Minutos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tempo em Horas (h)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={horas} onChange={(e) => updateHoras(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">h</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tempo em Minutos (min)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={minutos} onChange={(e) => updateMinutos(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">min</span>
        </div>
      </div>
    </div>
  );
}

// 9. POLEGADAS PARA CENTÍMETROS
function PolegadasCm() {
  const [pol, setPol] = useState<string>('1');
  const [cm, setCm] = useState<string>('2.54');
  const updatePol = (val: string) => { setPol(val); const n = parseFloat(val); if (!isNaN(n)) setCm((n * 2.54).toFixed(2)); else setCm(''); };
  const updateCm = (val: string) => { setCm(val); const n = parseFloat(val); if (!isNaN(n)) setPol((n / 2.54).toFixed(4)); else setPol(''); };
  return (
    <div className="space-y-6" id="conv-pc">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Polegadas para Centímetros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Polegadas (in)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={pol} onChange={(e) => updatePol(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">in</span></div>
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Centímetros (cm)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={cm} onChange={(e) => updateCm(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">cm</span></div>
      </div>
    </div>
  );
}

// 10. MILHAS PARA QUILÔMETROS
function MilhasKm() {
  const [milhas, setMilhas] = useState<string>('1');
  const [km, setKm] = useState<string>('1.6093');
  const updateMilhas = (val: string) => { setMilhas(val); const n = parseFloat(val); if (!isNaN(n)) setKm((n * 1.60934).toFixed(4)); else setKm(''); };
  const updateKm = (val: string) => { setKm(val); const n = parseFloat(val); if (!isNaN(n)) setMilhas((n / 1.60934).toFixed(4)); else setMilhas(''); };
  return (
    <div className="space-y-6" id="conv-mk">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Milhas para Quilômetros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Milhas (mi)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={milhas} onChange={(e) => updateMilhas(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">mi</span></div>
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Quilômetros (km)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={km} onChange={(e) => updateKm(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">km</span></div>
      </div>
    </div>
  );
}

// 11. KM/H PARA MPH
function KmhMph() {
  const [kmh, setKmh] = useState<string>('100');
  const [mph, setMph] = useState<string>('62.14');
  const updateKmh = (val: string) => { setKmh(val); const n = parseFloat(val); if (!isNaN(n)) setMph((n * 0.62137).toFixed(2)); else setMph(''); };
  const updateMph = (val: string) => { setMph(val); const n = parseFloat(val); if (!isNaN(n)) setKmh((n / 0.62137).toFixed(2)); else setKmh(''); };
  return (
    <div className="space-y-6" id="conv-kmph">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Km/h para mph</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Km/h</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={kmh} onChange={(e) => updateKmh(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">km/h</span></div>
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">mph</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={mph} onChange={(e) => updateMph(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">mph</span></div>
      </div>
    </div>
  );
}

// 12. EURO PARA REAL
function EuroReal() {
  const [eur, setEur] = useState<string>('50');
  const [brl, setBrl] = useState<string>('280');
  const [cotacao, setCotacao] = useState<number>(5.6);
  const updateEur = (val: string, cot: number = cotacao) => { setEur(val); const n = parseFloat(val); if (!isNaN(n) && cot > 0) setBrl((n * cot).toFixed(2)); else setBrl(''); };
  const updateBrl = (val: string, cot: number = cotacao) => { setBrl(val); const n = parseFloat(val); if (!isNaN(n)) setEur((n / cot).toFixed(2)); else setEur(''); };
  const changeCotacao = (newCot: number) => { setCotacao(newCot); updateEur(eur, newCot); };
  return (
    <div className="space-y-6" id="conv-er">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor Euro ⇄ Real</h2>
      <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-500">Cotação 1 EUR =</span>
        <div className="flex items-center gap-1"><span className="text-xs text-slate-400">R$</span><input type="number" step="0.01" className="w-20 text-center border p-1 rounded font-mono text-xs bg-white dark:bg-slate-800 dark:text-slate-100" value={cotacao} onChange={(e) => changeCotacao(Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Euro (€)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={eur} onChange={(e) => updateEur(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">EUR</span></div>
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Real (R$)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={brl} onChange={(e) => updateBrl(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">BRL</span></div>
      </div>
    </div>
  );
}

// 13. BITCOIN PARA REAL
function BitcoinReal() {
  const [btc, setBtc] = useState<string>('0.01');
  const [brl, setBrl] = useState<string>('2500');
  const [cotacao, setCotacao] = useState<number>(250000);
  const updateBtc = (val: string, cot: number = cotacao) => { setBtc(val); const n = parseFloat(val); if (!isNaN(n) && cot > 0) setBrl((n * cot).toFixed(2)); else setBrl(''); };
  const updateBrl = (val: string, cot: number = cotacao) => { setBrl(val); const n = parseFloat(val); if (!isNaN(n)) setBtc((n / cot).toFixed(8)); else setBtc(''); };
  const changeCotacao = (newCot: number) => { setCotacao(newCot); updateBtc(btc, newCot); };
  return (
    <div className="space-y-6" id="conv-br">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor Bitcoin ⇄ Real</h2>
      <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-850 p-2.5 rounded-lg border flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-500">Cotação 1 BTC =</span>
        <div className="flex items-center gap-1"><span className="text-xs text-slate-400">R$</span><input type="number" step="1" className="w-28 text-center border p-1 rounded font-mono text-xs bg-white dark:bg-slate-800 dark:text-slate-100" value={cotacao} onChange={(e) => changeCotacao(Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Bitcoin (BTC)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={btc} onChange={(e) => updateBtc(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">BTC</span></div>
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Real (R$)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={brl} onChange={(e) => updateBrl(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">BRL</span></div>
      </div>
    </div>
  );
}

// ===== CONVERSOR DE LIBRA PARA REAL =====
function LibraReal() {
  const [gbp, setGbp] = useState<string>('10');
  const [brl, setBrl] = useState<string>('68');
  const [cotacao, setCotacao] = useState<number>(6.8);
  const updateGbp = (val: string, cot: number = cotacao) => { setGbp(val); const n = parseFloat(val); if (!isNaN(n) && cot > 0) setBrl((n * cot).toFixed(2)); else setBrl(''); };
  const updateBrl = (val: string, cot: number = cotacao) => { setBrl(val); const n = parseFloat(val); if (!isNaN(n)) setGbp((n / cot).toFixed(2)); else setGbp(''); };
  const changeCotacao = (newCot: number) => { setCotacao(newCot); updateGbp(gbp, newCot); };
  return (
    <div className="space-y-6" id="conv-gbp">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor Libra Esterlina ⇄ Real</h2>
      <div className="w-full md:w-1/3 bg-slate-50 p-2.5 rounded-lg border flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-500">Cotação 1 GBP =</span>
        <div className="flex items-center gap-1"><span className="text-xs text-slate-400">R$</span><input type="number" step="0.01" className="w-20 text-center border p-1 rounded font-mono text-xs bg-white dark:bg-slate-800" value={cotacao} onChange={(e) => changeCotacao(Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Libra (£)</label><input type="number" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono" value={gbp} onChange={(e) => updateGbp(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">GBP</span></div>
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Real (R$)</label><input type="number" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono" value={brl} onChange={(e) => updateBrl(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">BRL</span></div>
      </div>
    </div>
  );
}

// ===== CONVERSOR DE NÚMEROS ROMANOS =====
function NumerosRomanos() {
  const [numero, setNumero] = useState<number>(2024);
  const [romano, setRomano] = useState<string>('MMXXIV');
  const [inputRomano, setInputRomano] = useState<string>('MMXXIV');
  const [resultadoRomano, setResultadoRomano] = useState<string>('2024');

  const paraRomano = (n: number): string => {
    const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const roms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let result = '';
    let num = n;
    for (let i = 0; i < vals.length; i++) {
      while (num >= vals[i]) { result += roms[i]; num -= vals[i]; }
    }
    return result;
  };

  const deRomano = (r: string): number => {
    const map: {[key: string]: number} = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
    let total = 0;
    for (let i = 0; i < r.length; i++) {
      const atual = map[r[i]] || 0;
      const prox = map[r[i+1]] || 0;
      if (atual < prox) { total -= atual; } else { total += atual; }
    }
    return total;
  };

  useEffect(() => {
    if (numero > 0 && numero < 4000) {
      setRomano(paraRomano(numero));
    }
  }, [numero]);

  const converterRomanoParaNumero = () => {
    const val = deRomano(inputRomano.toUpperCase());
    setResultadoRomano(val > 0 ? String(val) : 'Inválido');
  };

  return (
    <div className="space-y-6" id="conv-romano">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Números Romanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-500">Número → Romano</label>
          <input type="number" min="1" max="3999" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-sm" value={numero} onChange={e => setNumero(Number(e.target.value))} />
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-center">
            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 font-mono tracking-wider">{romano}</span>
          </div>
        </div>
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-500">Romano → Número</label>
          <div className="flex gap-2">
            <input type="text" className="flex-1 border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-sm uppercase" value={inputRomano} onChange={e => setInputRomano(e.target.value)} placeholder="Ex: MMXXIV" />
            <button onClick={converterRomanoParaNumero} className="bg-emerald-600 text-white px-4 rounded-lg text-sm font-bold hover:cursor-pointer">↻</button>
          </div>
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-center">
            <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 font-mono">{resultadoRomano === 'Inválido' ? '❌ Inválido' : resultadoRomano}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== CONVERSOR DE PESO ARGENTINO PARA REAL =====
function PesoArgentinoReal() {
  const [ars, setArs] = useState<string>('1000');
  const [brl, setBrl] = useState<string>('5.95');
  const [cotacao, setCotacao] = useState<number>(0.00595);
  const updateArs = (val: string, cot: number = cotacao) => { setArs(val); const n = parseFloat(val); if (!isNaN(n) && cot > 0) setBrl((n * cot).toFixed(2)); else setBrl(''); };
  const updateBrl = (val: string, cot: number = cotacao) => { setBrl(val); const n = parseFloat(val); if (!isNaN(n)) setArs((n / cot).toFixed(2)); else setArs(''); };
  const changeCotacao = (newCot: number) => { setCotacao(newCot); updateArs(ars, newCot); };
  return (
    <div className="space-y-6" id="conv-ars">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor Peso Argentino ⇄ Real</h2>
      <div className="w-full md:w-1/3 bg-slate-50 p-2.5 rounded-lg border flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-slate-500">Cotação 1 ARS =</span>
        <div className="flex items-center gap-1"><span className="text-xs text-slate-400">R$</span><input type="number" step="0.00001" className="w-28 text-center border p-1 rounded font-mono text-xs bg-white dark:bg-slate-800" value={cotacao} onChange={(e) => changeCotacao(Number(e.target.value))} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Peso Argentino ($)</label><input type="number" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono" value={ars} onChange={(e) => updateArs(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">ARS</span></div>
        <div className="relative"><label className="block text-xs font-semibold text-slate-500 mb-1">Real (R$)</label><input type="number" className="w-full border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono" value={brl} onChange={(e) => updateBrl(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">BRL</span></div>
      </div>
    </div>
  );
}

// PLACEHOLDER PARA NOVOS CONVERSORES
function PlaceholderConversor({ id }: { id: string }) {
  const nomes: {[key: string]: string} = {
    'libra-para-real': 'Conversor de Libra Esterlina para Real',
    'numeros-romanos': 'Conversor de Números Romanos',
    'peso-argentino-para-real': 'Conversor de Peso Argentino para Real',
  };
  return (
    <div className="space-y-6 text-center py-8" id={`placeholder-${id}`}>
      <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100">
        <span className="text-3xl block mb-3">🔄</span>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{nomes[id] || id}</h3>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">Ferramenta em desenvolvimento. Confira abaixo as informações de conversão e cotação.</p>
      </div>
    </div>
  );
}

// 8. DIAS PARA HORAS
function DiasHoras() {
  const [dias, setDias] = useState<string>('3');
  const [horas, setHoras] = useState<string>('72');

  const updateDias = (val: string) => {
    setDias(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setHoras((n * 24).toFixed(0));
    } else {
      setHoras('');
    }
  };

  const updateHoras = (val: string) => {
    setHoras(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setDias((n / 24).toFixed(2));
    } else {
      setDias('');
    }
  };

  return (
    <div className="space-y-6" id="conv-dh">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Dias para Horas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Intervalo em Dias (d)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={dias} onChange={(e) => updateDias(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">dias</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Intervalo em Horas (h)</label>
          <input type="number" step="any" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base" value={horas} onChange={(e) => updateHoras(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-400 font-bold">horas</span>
        </div>
      </div>
    </div>
  );
}
