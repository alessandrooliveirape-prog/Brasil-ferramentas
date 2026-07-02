/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Coins, ArrowRightLeft, Plus, Minus, RefreshCw, Info, TrendingUp } from 'lucide-react';

interface ConversoresProps {
  toolId: string;
}

export default function Conversores({ toolId }: ConversoresProps) {
  const isCurrencyTool = [
    'real-para-dolar',
    'euro-para-real',
    'bitcoin-para-real',
    'libra-para-real',
    'peso-argentino-para-real'
  ].includes(toolId);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm animate-fade-in" id="conversor-container">
      {toolId === 'metros-para-pes' && <MetrosPes />}
      {toolId === 'quilos-para-libras' && <QuilosLibras />}
      {toolId === 'celsius-para-fahrenheit' && <CelsiusFahrenheit />}
      {isCurrencyTool && <ConversorMoedasRealTime toolId={toolId} />}
      {toolId === 'mb-para-gb' && <MbGb />}
      {toolId === 'kb-para-mb' && <KbMb />}
      {toolId === 'horas-para-minutos' && <HorasMinutos />}
      {toolId === 'dias-para-horas' && <DiasHoras />}
      {toolId === 'polegadas-para-centimetros' && <PolegadasCm />}
      {toolId === 'milhas-para-quilometros' && <MilhasKm />}
      {toolId === 'kmh-para-mph' && <KmhMph />}
      {toolId === 'numeros-romanos' && <NumerosRomanos />}
    </div>
  );
}

// ==========================================
// UNIFIED REAL-TIME INTERACTIVE CURRENCY CONVERTER
// ==========================================
interface CurrencyRate {
  code: string;
  name: string;
  bid: number;
  pctChange: string;
}

function ConversorMoedasRealTime({ toolId }: { toolId: string }) {
  // Pre-configured currencies list
  const CURRENCIES = [
    { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro' },
    { code: 'USD', symbol: 'US$', name: 'Dólar Americano' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'Libra Esterlina' },
    { code: 'ARS', symbol: '$', name: 'Peso Argentino' },
    { code: 'BTC', symbol: '₿', name: 'Bitcoin' }
  ];

  // Map toolId to initial currency selections
  const getInitialCurrencies = () => {
    switch (toolId) {
      case 'real-para-dolar':
        return { from: 'BRL', to: 'USD', amount: 100 };
      case 'euro-para-real':
        return { from: 'EUR', to: 'BRL', amount: 50 };
      case 'bitcoin-para-real':
        return { from: 'BTC', to: 'BRL', amount: 0.01 };
      case 'libra-para-real':
        return { from: 'GBP', to: 'BRL', amount: 10 };
      case 'peso-argentino-para-real':
        return { from: 'ARS', to: 'BRL', amount: 1000 };
      default:
        return { from: 'USD', to: 'BRL', amount: 100 };
    }
  };

  const initialSetup = getInitialCurrencies();
  const [fromCurrency, setFromCurrency] = useState<string>(initialSetup.from);
  const [toCurrency, setToCurrency] = useState<string>(initialSetup.to);
  const [quantidade, setQuantidade] = useState<number>(initialSetup.amount);
  
  // Real-time rates stored in relation to BRL (AwesomeAPI standard)
  const [rates, setRates] = useState<{ [key: string]: CurrencyRate }>({
    BRL: { code: 'BRL', name: 'Real', bid: 1.0, pctChange: '0.0' },
    USD: { code: 'USD', name: 'Dólar', bid: 5.62, pctChange: '0.0' },
    EUR: { code: 'EUR', name: 'Euro', bid: 6.08, pctChange: '0.0' },
    GBP: { code: 'GBP', name: 'Libra', bid: 7.15, pctChange: '0.0' },
    ARS: { code: 'ARS', name: 'Peso Argentino', bid: 0.0061, pctChange: '0.0' },
    BTC: { code: 'BTC', name: 'Bitcoin', bid: 345000.0, pctChange: '0.0' }
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch API rates from AwesomeAPI
  const fetchRates = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL,ARS-BRL');
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      
      setRates({
        BRL: { code: 'BRL', name: 'Real', bid: 1.0, pctChange: '0.0' },
        USD: { code: 'USD', name: 'Dólar', bid: parseFloat(data.USDBRL.bid), pctChange: data.USDBRL.pctChange },
        EUR: { code: 'EUR', name: 'Euro', bid: parseFloat(data.EURBRL.bid), pctChange: data.EURBRL.pctChange },
        GBP: { code: 'GBP', name: 'Libra', bid: parseFloat(data.GBPBRL.bid), pctChange: data.GBPBRL.pctChange },
        ARS: { code: 'ARS', name: 'Peso Argentino', bid: parseFloat(data.ARSBRL.bid), pctChange: data.ARSBRL.pctChange },
        BTC: { code: 'BTC', name: 'Bitcoin', bid: parseFloat(data.BTCBRL.bid), pctChange: data.BTCBRL.pctChange }
      });
      setLastUpdated(new Date().toLocaleTimeString('pt-BR'));
    } catch (e) {
      console.warn('Real-time rates failed. Using standard mock rates.', e);
      setError(true);
      setLastUpdated('Cotações de Contingência');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Update quantity on toolId change to prevent awkward values
  useEffect(() => {
    const setup = getInitialCurrencies();
    setFromCurrency(setup.from);
    setToCurrency(setup.to);
    setQuantidade(setup.amount);
  }, [toolId]);

  // Swaps selected currencies
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Convert amounts:
  // Convert quantity of fromCurrency to BRL first, then BRL to toCurrency
  const rateFrom = rates[fromCurrency]?.bid || 1.0;
  const rateTo = rates[toCurrency]?.bid || 1.0;
  const valueInBrl = quantidade * rateFrom;
  const convertedValue = valueInBrl / rateTo;

  // Determine standard increment steps based on currency type
  const isBtc = fromCurrency === 'BTC';
  const getStep = () => {
    if (isBtc) return 0.005;
    if (fromCurrency === 'ARS') return 500;
    return 10;
  };
  const step = getStep();

  // Plus and Minus button triggers
  const handleIncrement = () => {
    setQuantidade(q => {
      const next = q + step;
      return parseFloat((isBtc ? next : Math.round(next)).toFixed(isBtc ? 4 : 0));
    });
  };

  const handleDecrement = () => {
    setQuantidade(q => {
      const next = q - step;
      if (next < 0) return 0;
      return parseFloat((isBtc ? next : Math.round(next)).toFixed(isBtc ? 4 : 0));
    });
  };

  // Predefined quick select values
  const fiatPresets = [10, 50, 100, 500, 1000, 5000, 10000];
  const btcPresets = [0.001, 0.01, 0.05, 0.1, 0.5, 1.0, 2.0];
  const presets = isBtc ? btcPresets : (fromCurrency === 'ARS' ? [1000, 5000, 10000, 50000, 100000] : fiatPresets);

  // Slider bounds based on currency
  const getSliderMax = () => {
    if (isBtc) return 2.0;
    if (fromCurrency === 'ARS') return 100000;
    return 5000;
  };
  const sliderMax = getSliderMax();
  const sliderStep = isBtc ? 0.001 : (fromCurrency === 'ARS' ? 500 : 10);

  const fromSymbol = CURRENCIES.find(c => c.code === fromCurrency)?.symbol || '';
  const toSymbol = CURRENCIES.find(c => c.code === toCurrency)?.symbol || '';

  return (
    <div className="space-y-6" id="realtime-exchange">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3 gap-2">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Coins className="w-5 h-5 text-emerald-600" />
          Conversor Cambial Interativo
        </h2>

        {/* Real-time Status Badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${error ? 'bg-red-400' : 'bg-emerald-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${error ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="text-[10px] text-slate-700 font-bold uppercase tracking-wider">
            {loading ? 'Buscando Cotações...' : `Câmbio ao vivo: ${lastUpdated}`}
          </span>
          <button 
            onClick={fetchRates} 
            disabled={loading} 
            className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-emerald-600 transition"
            title="Atualizar cotações"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* CURRENCY SELECTOR RAIL */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-9 gap-4 items-center">
        
        {/* Source Currency */}
        <div className="md:col-span-4 space-y-1">
          <label className="block text-xs font-bold text-slate-700">Converter De:</label>
          <select 
            className="w-full font-bold text-slate-900 border-slate-300 rounded-lg p-2.5 bg-white"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex items-center justify-center pt-4">
          <button 
            onClick={handleSwap}
            className="p-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-full hover:scale-105 hover:cursor-pointer transition-all shadow-xs text-slate-700 hover:text-emerald-600"
            title="Inverter Moedas"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Target Currency */}
        <div className="md:col-span-4 space-y-1">
          <label className="block text-xs font-bold text-slate-700">Para:</label>
          <select 
            className="w-full font-bold text-slate-900 border-slate-300 rounded-lg p-2.5 bg-white"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code} disabled={c.code === fromCurrency}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* INTERACTIVE QUANTITY CONTROLS (NO TYPING REQUIRED) */}
      <div className="space-y-4">
        
        {/* Quantity Field with plus/minus toggles */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Ajustar Quantidade ({fromCurrency}):</label>
          
          <div className="flex items-center gap-2 max-w-md">
            <button 
              onClick={handleDecrement}
              className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-700 hover:text-emerald-700 hover:cursor-pointer transition font-bold"
              title="Diminuir"
            >
              <Minus className="w-4 h-4" />
            </button>

            <input 
              type="number"
              step={isBtc ? '0.0001' : '1'}
              value={quantidade}
              onChange={(e) => setQuantidade(Math.max(0, parseFloat(e.target.value) || 0))}
              className="flex-1 text-center font-mono font-black text-lg p-2.5 bg-white border border-slate-400 rounded-lg text-slate-900"
            />

            <button 
              onClick={handleIncrement}
              className="p-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-700 hover:text-emerald-700 hover:cursor-pointer transition font-bold"
              title="Aumentar"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preset quick select chips */}
        <div className="space-y-1.5">
          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Ajuste rápido de montante:</span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setQuantidade(p)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition hover:cursor-pointer ${quantidade === p ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' : 'bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-800'}`}
              >
                {isBtc ? `${p} BTC` : p.toLocaleString('pt-BR')}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Slider */}
        <div className="space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase font-mono">
            <span>Mínimo ({isBtc ? '0.001' : '1'})</span>
            <span>Deslize para ajustar</span>
            <span>Máximo ({isBtc ? `${getSliderMax()} BTC` : getSliderMax().toLocaleString('pt-BR')})</span>
          </div>
          <input 
            type="range"
            min={isBtc ? 0.001 : 1}
            max={sliderMax}
            step={sliderStep}
            value={quantidade > sliderMax ? sliderMax : quantidade}
            onChange={(e) => setQuantidade(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-250 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2"
          />
        </div>
      </div>

      {/* HIGHEST CONTRAST RESULT DISPLAY */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-6 text-center shadow-xs">
        <span className="block text-[11px] font-bold text-emerald-800 uppercase tracking-widest mb-1.5">
          Resultado da Conversão
        </span>
        <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center flex-wrap gap-2">
          <span className="font-mono text-slate-800">
            {quantidade.toLocaleString('pt-BR', { maximumFractionDigits: isBtc ? 6 : 2 })} {fromCurrency}
          </span>
          <span className="text-slate-400 text-lg">⇄</span>
          <span className="font-mono text-emerald-700 bg-emerald-100/50 px-3.5 py-1.5 rounded-lg border border-emerald-250">
            {toSymbol} {convertedValue.toLocaleString('pt-BR', { minimumFractionDigits: toCurrency === 'BTC' ? 6 : 2, maximumFractionDigits: toCurrency === 'BTC' ? 6 : 2 })} {toCurrency}
          </span>
        </div>

        {/* Exchange description */}
        <div className="mt-4 pt-3 border-t border-emerald-200/50 flex flex-col md:flex-row items-center justify-center gap-4 text-xs font-semibold text-emerald-900">
          <div>
            Taxa de Câmbio: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">1 {fromCurrency} = {(rateFrom / rateTo).toLocaleString('pt-BR', { maximumFractionDigits: toCurrency === 'BTC' ? 8 : 4 })} {toCurrency}</strong>
          </div>
          {rates[fromCurrency]?.pctChange && (
            <div className="flex items-center gap-1">
              Variação Hoje: 
              <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${parseFloat(rates[fromCurrency].pctChange) >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                <TrendingUp className="w-2.5 h-2.5" />
                {rates[fromCurrency].pctChange}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-300 text-xs leading-relaxed text-slate-700 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          Este conversor cambial é atualizado em tempo real. Você pode clicar nos botões de <strong>Preset Rápido</strong>, deslizar a barra ou usar os botões <strong>+</strong> / <strong>-</strong> para ajustar os valores. Não é necessário digitar para usar!
        </p>
      </div>
    </div>
  );
}

// ==========================================
// LEGACY COMPONENT PLACEHOLDERS (RETAINED FOR TS TYPING INTEGRITY)
// ==========================================
function RealDolar() { return null; }
function EuroReal() { return null; }
function BitcoinReal() { return null; }
function LibraReal() { return null; }
function PesoArgentinoReal() { return null; }

// ==========================================
// PHYSICAL UNIT CONVERTERS
// ==========================================

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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Metros para Pés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Métricas em Metros (m)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={metros} onChange={(e) => updateMetros(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">metros</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Imperial em Pés (ft)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={pes} onChange={(e) => updatePes(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">pés</span>
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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Quilos para Libras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Massa em Quilos (kg)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={kg} onChange={(e) => updateKg(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">quilos</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Massa em Libras (lb)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={lb} onChange={(e) => updateLb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">libras</span>
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
      setF((n * 9 / 5 + 32).toFixed(2));
    } else {
      setF('');
    }
  };

  const updateF = (val: string) => {
    setF(val);
    const n = parseFloat(val);
    if (!isNaN(n)) {
      setC(((n - 32) * 5 / 9).toFixed(2));
    } else {
      setC('');
    }
  };

  return (
    <div className="space-y-6" id="conv-cf">
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Temperatura</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Escala Métrica Celsius (°C)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={c} onChange={(e) => updateC(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">°C</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Escala Imperial Fahrenheit (°F)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={f} onChange={(e) => updateF(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">°F</span>
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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Megabytes para Gigabytes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Tamanho em Megabytes (MB)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={mb} onChange={(e) => updateMb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">MB</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Tamanho em Gigabytes (GB)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={gb} onChange={(e) => updateGb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">GB</span>
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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Kilobytes para Megabytes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Tamanho em Kilobytes (KB)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={kb} onChange={(e) => updateKb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">KB</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Tamanho em Megabytes (MB)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={mb} onChange={(e) => updateMb(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">MB</span>
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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Horas para Minutos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Tempo em Horas (h)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={horas} onChange={(e) => updateHoras(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">h</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Tempo em Minutos (min)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={minutos} onChange={(e) => updateMinutos(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">min</span>
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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Dias para Horas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Intervalo em Dias (d)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={dias} onChange={(e) => updateDias(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">dias</span>
        </div>
        <div className="relative">
          <label className="block text-xs font-bold text-slate-700 mb-1">Intervalo em Horas (h)</label>
          <input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={horas} onChange={(e) => updateHoras(e.target.value)} />
          <span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">horas</span>
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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Polegadas para Centímetros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-bold text-slate-700 mb-1">Polegadas (in)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={pol} onChange={(e) => updatePol(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">in</span></div>
        <div className="relative"><label className="block text-xs font-bold text-slate-700 mb-1">Centímetros (cm)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={cm} onChange={(e) => updateCm(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">cm</span></div>
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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Milhas para Quilômetros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-bold text-slate-700 mb-1">Milhas (mi)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={milhas} onChange={(e) => updateMilhas(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">mi</span></div>
        <div className="relative"><label className="block text-xs font-bold text-slate-700 mb-1">Quilômetros (km)</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={km} onChange={(e) => updateKm(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-500 font-bold">km</span></div>
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
      <h2 className="text-xl font-black text-slate-900 border-b pb-3">Conversor de Km/h para mph</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="relative"><label className="block text-xs font-bold text-slate-700 mb-1">Km/h</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={kmh} onChange={(e) => updateKmh(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-505 font-bold">km/h</span></div>
        <div className="relative"><label className="block text-xs font-bold text-slate-700 mb-1">mph</label><input type="number" step="any" className="w-full border rounded-lg p-3 bg-white font-mono text-base text-slate-900" value={mph} onChange={(e) => updateMph(e.target.value)} /><span className="absolute right-4 bottom-3 text-xs text-slate-505 font-bold">mph</span></div>
      </div>
    </div>
  );
}

// 12. CONVERSOR DE NÚMEROS ROMANOS
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
      if (atual < prox) { total -= atual; } else { total += activeTool ? 0 : atual; } // safe math
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
      <h2 className="text-xl font-bold text-slate-800 border-b pb-3">Conversor de Números Romanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">Número → Romano</label>
          <input type="number" min="1" max="3999" className="w-full border rounded-lg p-3 bg-white font-mono text-sm text-slate-900" value={numero} onChange={e => setNumero(Number(e.target.value))} />
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <span className="text-2xl font-bold text-emerald-850 font-mono tracking-wider">{romano}</span>
          </div>
        </div>
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">Romano → Número</label>
          <div className="flex gap-2">
            <input type="text" className="flex-1 border rounded-lg p-3 bg-white font-mono text-sm uppercase text-slate-900" value={inputRomano} onChange={e => setInputRomano(e.target.value)} placeholder="Ex: MMXXIV" />
            <button onClick={converterRomanoParaNumero} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-lg text-sm font-bold hover:cursor-pointer transition-colors">↻</button>
          </div>
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 text-center">
            <span className="text-2xl font-bold text-slate-900 font-mono">{resultadoRomano === 'Inválido' ? '❌ Inválido' : resultadoRomano}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
