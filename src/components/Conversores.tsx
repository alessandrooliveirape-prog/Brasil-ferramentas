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
