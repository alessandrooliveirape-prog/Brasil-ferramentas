/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface UtilitariosProps {
  toolId: string;
}

export default function Utilitarios({ toolId }: UtilitariosProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm" id="utilitarios-container">
      {(toolId === 'contador-caracteres' || toolId === 'contador-palavras') && <ContadorTexto />}
      {toolId === 'removedor-espacos' && <RemovedorEspacos />}
      {(toolId === 'formatador-json' || toolId === 'beautify-json') && <JsonFormatter />}
      {toolId === 'minificador-css' && <MinificadorCss />}
      {toolId === 'minificador-js' && <MinificadorJs />}
      {toolId === 'encode-url' && <EncodeUrlSelector />}
      {toolId === 'decode-url' && <DecodeUrlSelector />}
      {toolId === 'cronometro' && <Cronometro />}
      {toolId === 'separador-silabas' && <SeparadorSilabas />}
      {toolId === 'maiusculas-minusculas' && <MaiusculasMinusculas />}
      {toolId === 'extrator-email' && <ExtratorEmail />}
      {toolId === 'comparador-textos' && <ComparadorTextos />}
      {toolId === 'validador-cartao' && <ValidadorCartao />}
    </div>
  );
}

// 1. CONTADOR DE CARACTERES E PALAVRAS (WITH WORD DENSITY!)
function ContadorTexto() {
  const [texto, setTexto] = useState<string>('A Tool Brasil oferece as melhores soluções de SEO programático gratuitas.');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const raw = texto || '';
    const charComEspacos = raw.length;
    const charSemEspacos = raw.replace(/\s+/g, '').length;
    
    // Contagem de palavras
    const palavrasArray = raw.trim().split(/\s+/).filter(w => w.length > 0);
    const totalPalavras = palavrasArray.length;
    
    // Contagem de parágrafos
    const totalParagrafos = raw.split(/\n+/).filter(p => p.trim().length > 0).length;
    
    // Tempo estimado de leitura (base de ~200 palavras por minuto)
    const tempoLeitura = Math.ceil(totalPalavras / 200) || 1;

    // Frequência de palavras (densidade lúdica)
    const frequencia: { [key: string]: number } = {};
    palavrasArray.forEach(p => {
      const clean = p.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
      if (clean.length > 3) { // apenas termos relevantes maiores
        frequencia[clean] = (frequencia[clean] || 0) + 1;
      }
    });

    const top6Densidade = Object.entries(frequencia)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    setStats({
      cc: charComEspacos,
      cs: charSemEspacos,
      pal: totalPalavras,
      par: totalParagrafos,
      tempo: tempoLeitura,
      topWords: top6Densidade
    });
  }, [texto]);

  return (
    <div className="space-y-6" id="util-texto">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Contador e Analisador de Texto</h2>
      
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-500">Cole ou digite seu conteúdo:</label>
        <textarea
          className="w-full border dark:border-slate-750 p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm font-sans focus:outline-emerald-500 focus:bg-white"
          rows={6}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Comece a digitar..."
        />
      </div>

      {stats && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-150">
              <span className="block text-[10px] text-slate-400 uppercase">Com Espaços</span>
              <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">{stats.cc}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-150">
              <span className="block text-[10px] text-slate-400 uppercase">Sem Espaços</span>
              <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">{stats.cs}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-150">
              <span className="block text-[10px] text-slate-400 uppercase">Palavras</span>
              <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">{stats.pal}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-150">
              <span className="block text-[10px] text-slate-400 uppercase">Parágrafos</span>
              <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">{stats.par}</span>
            </div>
            <div className="col-span-2 md:col-span-1 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-950">
              <span className="block text-[10px] text-emerald-600 dark:text-emerald-500 uppercase">Est. Leitura</span>
              <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-300">~{stats.tempo} min</span>
            </div>
          </div>

          {stats.topWords.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-slate-500 uppercase">Densidade Vocabular (Repetições de Termos Chaves):</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {stats.topWords.map(([w, count]: any, i: number) => (
                  <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    <strong>{w}</strong>: {count}x
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 2. REMOVEDOR DE ESPAÇOS
function RemovedorEspacos() {
  const [inputStr, setInputStr] = useState<string>('Este   texto    possui   espaços    excessivos.');
  const [outputStr, setOutputStr] = useState<string>('');
  const [removerLinhasVazias, setRemoverLinhasVazias] = useState<boolean>(true);

  const limpar = () => {
    let result = inputStr;
    // Remove espaços duplicados
    result = result.replace(/[ \t]+/g, ' ');
    // Se selecionado, remove linhas completamente em branco
    if (removerLinhasVazias) {
      result = result.split('\n').filter(line => line.trim().length > 0).join('\n');
    }
    setOutputStr(result);
  };

  useEffect(() => { limpar(); }, [inputStr, removerLinhasVazias]);

  return (
    <div className="space-y-6" id="util-spaces">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Removedor de Espaços Extras</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">Texto Sujo</label>
          <textarea className="w-full border dark:border-slate-750 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs" rows={6} value={inputStr} onChange={(e) => setInputStr(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500">Texto Higienizado</label>
          <textarea readOnly className="w-full border dark:border-slate-750 p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs" rows={6} value={outputStr} />
        </div>
      </div>
      
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-150">
        <label className="flex items-center gap-2 text-xs hover:cursor-pointer"><input type="checkbox" checked={removerLinhasVazias} onChange={() => setRemoverLinhasVazias(!removerLinhasVazias)} className="rounded" /> Remover Linhas em Branco Vazias</label>
        <button onClick={() => navigator.clipboard.writeText(outputStr)} className="bg-emerald-600 text-white font-bold text-xs py-1.5 px-4 rounded hover:cursor-pointer">Copiar Tratado</button>
      </div>
    </div>
  );
}

// 3. JSON FORMATTER / BEAUTIFIER
function JsonFormatter() {
  const [jsonStr, setJsonStr] = useState<string>('{"nome":"Tool Brasil","segmento":"SEO","funcionando":true,"ferramentas":["Calculadoras","Geradores"]}');
  const [formatted, setFormatted] = useState<string>('');
  const [errorLog, setErrorLog] = useState<string>('');

  const formatJson = () => {
    setErrorLog('');
    if (!jsonStr.trim()) {
      setFormatted('');
      return;
    }
    try {
      const parsed = JSON.parse(jsonStr);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (e: any) {
      setFormatted('');
      setErrorLog(e.message || 'JSON Inválido');
    }
  };

  useEffect(() => { formatJson(); }, [jsonStr]);

  return (
    <div className="space-y-6" id="util-json">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Formatador e Embelezador JSON</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500 font-mono">Raw string corporativo</label>
          <textarea className="w-full border p-2.5 font-mono text-xs dark:bg-slate-800 bg-slate-50 dark:text-slate-100 rounded-lg" rows={10} value={jsonStr} onChange={(e) => setJsonStr(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500 font-mono">JSON Perfeitamente Formatado</label>
          <textarea readOnly className="w-full border p-2.5 font-mono text-xs bg-slate-950 text-emerald-400 rounded-lg" rows={10} value={formatted || errorLog} />
        </div>
      </div>
      
      {errorLog && (
        <div className="p-3 bg-red-50 text-red-700 text-xs font-mono rounded border border-red-200">
          ⚠️ Falha de Sintaxe JSON: {errorLog}
        </div>
      )}

      {!errorLog && formatted && (
        <button onClick={() => navigator.clipboard.writeText(formatted)} className="w-full bg-emerald-600 text-white font-bold text-xs py-2 rounded">Copiar JSON Formatado</button>
      )}
    </div>
  );
}

// 4. MINIFICADOR CSS
function MinificadorCss() {
  const [cssStr, setCssStr] = useState<string>(`/* Folha de estilo de exemplo */\n.header-principal {\n  color: #333;\n  margin-top: 20px;\n  padding: 10px 15px;\n}`);
  const [minified, setMinified] = useState<string>('');

  const minificar = () => {
    let clean = cssStr;
    // Remove comentários do tipo /* ... */
    clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove múltiplos espaços e novas linhas
    clean = clean.replace(/\s+/g, ' ');
    // Remove espaços decorativos nos seletores
    clean = clean.replace(/\s*([{};:])\s*/g, '$1');
    setMinified(clean.trim());
  };

  useEffect(() => { minificar(); }, [cssStr]);

  return (
    <div className="space-y-6" id="util-css">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Minificador de Folhas de Estilo CSS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400">CSS Completo</label>
          <textarea className="w-full border p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-xs rounded-lg" rows={8} value={cssStr} onChange={(e) => setCssStr(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400">CSS Minificado</label>
          <textarea readOnly className="w-full border p-2 bg-slate-950 text-slate-350 font-mono text-xs rounded-lg" rows={8} value={minified} />
        </div>
      </div>
      <button onClick={() => navigator.clipboard.writeText(minified)} className="w-full bg-slate-800 text-white text-xs py-2 rounded">Copiar Estilo Minificado</button>
    </div>
  );
}

// 5. MINIFICADOR JAVASCRIPT
function MinificadorJs() {
  const [jsStr, setJsStr] = useState<string>(`// Script de exemplo\nfunction calcularAliquota(salarioBase) {\n  let imposto = salarioBase * 0.11;\n  return imposto;\n}`);
  const [minified, setMinified] = useState<string>('');

  const minificar = () => {
    let clean = jsStr;
    // Remove comentários de linha simples //
    clean = clean.replace(/\/\/.*$/gm, '');
    // Remove comentários multilinha /* */
    clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove quebras de linha e tabulações excessivas
    clean = clean.replace(/\s+/g, ' ');
    setMinified(clean.trim());
  };

  useEffect(() => { minificar(); }, [jsStr]);

  return (
    <div className="space-y-6" id="util-js">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Minificador de JavaScript</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400">JS Legível</label>
          <textarea className="w-full border p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-xs rounded-lg" rows={8} value={jsStr} onChange={(e) => setJsStr(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400">JS Compactado</label>
          <textarea readOnly className="w-full border p-2 bg-slate-950 text-slate-300 font-mono text-xs rounded-lg" rows={8} value={minified} />
        </div>
      </div>
      <button onClick={() => navigator.clipboard.writeText(minified)} className="w-full bg-slate-800 text-white text-xs py-2 rounded font-mono">Copiar Script Minificado</button>
    </div>
  );
}

// 6. ENCODE URL
function EncodeUrlSelector() {
  const [inputVal, setInputVal] = useState<string>('chave=brasil ferramentas&origem=pesquisa google');
  const [encoded, setEncoded] = useState<string>('');

  useEffect(() => {
    setEncoded(encodeURIComponent(inputVal));
  }, [inputVal]);

  return (
    <div className="space-y-6" id="util-encode">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Codificador de Parâmetros URL (Encode)</h2>
      <div className="space-y-3">
        <label className="block text-xs text-slate-500">Texto bruto para codificar</label>
        <input type="text" className="w-full border p-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 dark:text-slate-100" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      </div>
      <div className="space-y-2">
        <span className="block text-xs font-mono text-slate-400">String Codificada (Pronta para query param)</span>
        <div className="bg-slate-950 p-3 rounded font-mono text-xs text-amber-400 select-all border border-slate-850 truncate">{encoded}</div>
      </div>
    </div>
  );
}

// 8. CRONÔMETRO ONLINE
function Cronometro() {
  const [tempo, setTempo] = useState<number>(0);
  const [ativo, setAtivo] = useState<boolean>(false);
  const [voltas, setVoltas] = useState<string[]>([]);

  useEffect(() => {
    if (!ativo) return;
    const interval = setInterval(() => setTempo(t => t + 10), 10);
    return () => clearInterval(interval);
  }, [ativo]);

  const formatar = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const registrarVolta = () => setVoltas(v => [formatar(tempo), ...v]);
  const resetar = () => { setTempo(0); setAtivo(false); setVoltas([]); };

  return (
    <div className="space-y-6" id="util-crono">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cronômetro Online</h2>
      <div className="text-center space-y-4">
        <div className="text-5xl md:text-7xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 tracking-widest bg-slate-50 dark:bg-slate-850 p-6 rounded-xl border">
          {formatar(tempo)}
        </div>
        <div className="flex gap-2 justify-center">
          <button onClick={() => setAtivo(!ativo)} className={`px-6 py-2 rounded-lg font-bold text-sm ${ativo ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white transition hover:cursor-pointer`}>
            {ativo ? '⏹ Pausar' : '▶ Iniciar'}
          </button>
          <button onClick={registrarVolta} disabled={!ativo} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg font-bold text-sm disabled:opacity-50 hover:cursor-pointer">⏱ Volta</button>
          <button onClick={resetar} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg font-bold text-sm hover:cursor-pointer">🔄 Resetar</button>
        </div>
        {voltas.length > 0 && (
          <div className="max-h-40 overflow-y-auto space-y-1">
            {voltas.map((v, i) => (
              <div key={i} className="font-mono text-xs text-slate-400 bg-slate-50 dark:bg-slate-850 px-3 py-1 rounded border">
                Volta {voltas.length - i}: {v}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 9. SEPARADOR DE SÍLABAS
function SeparadorSilabas() {
  const [palavra, setPalavra] = useState<string>('ferramenta');
  const [separado, setSeparado] = useState<string>('');

  useEffect(() => {
    const vogais = 'aeiouáéíóúâêîôûãõà';
    const consoantes = 'bcdfghjklmnpqrstvwxyzç';
    let resultado = '';
    for (let i = 0; i < palavra.length; i++) {
      resultado += palavra[i];
      const atual = palavra[i].toLowerCase();
      const prox = (palavra[i + 1] || '').toLowerCase();
      const prox2 = (palavra[i + 2] || '').toLowerCase();
      
      if (vogais.includes(atual) && consoantes.includes(prox) && !consoantes.includes(prox2)) {
        resultado += '-';
      } else if (consoantes.includes(atual) && vogais.includes(prox) && i > 0) {
        if (i < palavra.length - 2 && !vogais.includes(prox2)) {
        } else if (i < palavra.length - 1) {
          resultado = resultado.slice(0, -1) + '-' + palavra[i];
        }
      }
    }
    if (resultado.endsWith('-')) resultado = resultado.slice(0, -1);
    if (!resultado.includes('-') && palavra.length > 2) {
      resultado = '';
      for (let i = 0; i < palavra.length; i++) {
        resultado += palavra[i];
        if (vogais.includes(palavra[i].toLowerCase()) && i < palavra.length - 1) {
          resultado += '-';
        }
      }
      if (resultado.endsWith('-')) resultado = resultado.slice(0, -1);
    }
    setSeparado(resultado);
  }, [palavra]);

  return (
    <div className="space-y-6" id="util-silabas">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Separador de Sílabas</h2>
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1">Digite uma palavra</label>
        <input type="text" className="w-full md:w-1/2 border rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={palavra} onChange={e => setPalavra(e.target.value.toLowerCase().normalize('NFD'))} />
      </div>
      {separado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 text-center">
          <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 tracking-wider">{separado}</span>
        </div>
      )}
      <p className="text-[10px] text-slate-400 italic">* Separação simplificada para palavras comuns. Palavras com hiatos, tritongos ou encontros consonantais complexos podem ter variações.</p>
    </div>
  );
}

// 10. CONVERSOR MAIÚSCULAS/MINÚSCULAS
function MaiusculasMinusculas() {
  const [texto, setTexto] = useState<string>('tool brasil ferramentas online gratuitas');
  const [modo, setModo] = useState<string>('maiusculas');
  const [resultado, setResultado] = useState<string>('');

  useEffect(() => {
    switch (modo) {
      case 'maiusculas': setResultado(texto.toUpperCase()); break;
      case 'minusculas': setResultado(texto.toLowerCase()); break;
      case 'capitalizado': setResultado(texto.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())); break;
      case 'alternado': setResultado(texto.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('')); break;
      default: setResultado(texto);
    }
  }, [texto, modo]);

  return (
    <div className="space-y-6" id="util-case">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Conversor de Maiúsculas/Minúsculas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Texto Original</label>
          <textarea className="w-full border rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-xs" rows={4} value={texto} onChange={e => setTexto(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Resultado</label>
          <textarea readOnly className="w-full border rounded-lg p-2.5 bg-emerald-950/10 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium" rows={4} value={resultado} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {['maiusculas', 'minusculas', 'capitalizado', 'alternado'].map(m => (
          <button key={m} onClick={() => setModo(m)} className={`px-4 py-1.5 rounded text-xs font-bold hover:cursor-pointer ${modo === m ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
            {m === 'maiusculas' ? 'MAIÚSCULAS' : m === 'minusculas' ? 'minúsculas' : m === 'capitalizado' ? 'Capitalizado' : 'aLtErNaDo'}
          </button>
        ))}
        <button onClick={() => navigator.clipboard.writeText(resultado)} className="px-4 py-1.5 rounded text-xs font-bold bg-slate-800 text-white hover:cursor-pointer">Copiar</button>
      </div>
    </div>
  );
}

// 11. EXTRATOR DE E-MAILS
function ExtratorEmail() {
  const [texto, setTexto] = useState<string>('Entre em contato: contato@toolbrasil.com.br ou suporte@empresa.com.br');
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const encontrados = texto.match(regex) || [];
    setEmails([...new Set(encontrados)]);
  }, [texto]);

  return (
    <div className="space-y-6" id="util-email">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Extrator de E-mails</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Texto ou HTML</label>
          <textarea className="w-full border rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-xs font-mono" rows={6} value={texto} onChange={e => setTexto(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">E-mails Encontrados ({emails.length})</label>
          <div className="border rounded-lg p-2.5 bg-slate-950 text-emerald-400 text-xs font-mono min-h-[140px] space-y-1">
            {emails.length > 0 ? emails.map((e, i) => <div key={i}>📧 {e}</div>) : <div className="text-slate-500">Nenhum e-mail encontrado</div>}
          </div>
          {emails.length > 0 && (
            <button onClick={() => navigator.clipboard.writeText(emails.join('\n'))} className="mt-2 px-3 py-1.5 bg-emerald-600 text-white text-xs rounded hover:cursor-pointer">
              Copiar Todos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 12. COMPARADOR DE TEXTOS
function ComparadorTextos() {
  const [textoA, setTextoA] = useState<string>('Este é o texto original da versão A.');
  const [textoB, setTextoB] = useState<string>('Este é o texto modificado da versão B.');
  const [diffLinhas, setDiffLinhas] = useState<any[]>([]);

  useEffect(() => {
    const linhasA = textoA.split('\n');
    const linhasB = textoB.split('\n');
    const maxLen = Math.max(linhasA.length, linhasB.length);
    const resultado: any[] = [];
    for (let i = 0; i < maxLen; i++) {
      if (linhasA[i] === linhasB[i]) {
        resultado.push({ tipo: 'igual', texto: linhasA[i] || '' });
      } else {
        if (linhasA[i] !== undefined) resultado.push({ tipo: 'removido', texto: linhasA[i] });
        if (linhasB[i] !== undefined) resultado.push({ tipo: 'adicionado', texto: linhasB[i] });
      }
    }
    setDiffLinhas(resultado);
  }, [textoA, textoB]);

  return (
    <div className="space-y-6" id="util-diff">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Comparador de Textos (Diff)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Versão A (Original)</label>
          <textarea className="w-full border rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-xs font-mono" rows={6} value={textoA} onChange={e => setTextoA(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Versão B (Modificada)</label>
          <textarea className="w-full border rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-xs font-mono" rows={6} value={textoB} onChange={e => setTextoB(e.target.value)} />
        </div>
      </div>
      <div className="border rounded-lg p-3 bg-slate-950 min-h-[100px]">
        {diffLinhas.length === 0 ? (
          <div className="text-xs text-slate-500 text-center">Textos idênticos. Faça alterações para ver as diferenças.</div>
        ) : (
          <div className="space-y-0.5">
            {diffLinhas.map((l, i) => (
              <div key={i} className={`text-xs font-mono px-2 py-1 rounded ${l.tipo === 'igual' ? 'text-slate-400' : l.tipo === 'adicionado' ? 'bg-emerald-950/40 text-emerald-400' : 'bg-red-950/40 text-red-400'}`}>
                {l.tipo === 'adicionado' ? '+ ' : l.tipo === 'removido' ? '- ' : '  '}{l.texto || '(linha vazia)'}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== VALIDADOR DE CARTÃO DE CRÉDITO =====
function ValidadorCartao() {
  const [numero, setNumero] = useState<string>('4532 1234 5678 9012');
  const [resultado, setResultado] = useState<any>(null);

  const validarLuhn = (num: string): boolean => {
    const digits = num.replace(/\D/g, '').split('').map(Number);
    let sum = 0;
    let alternar = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let d = digits[i];
      if (alternar) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
      alternar = !alternar;
    }
    return sum % 10 === 0;
  };

  const identificarBandeira = (num: string): string => {
    const clean = num.replace(/\D/g, '');
    if (/^4/.test(clean)) return 'Visa';
    if (/^5[1-5]/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    if (/^6(?:011|5)/.test(clean)) return 'Discover';
    if (/^3(?:0[0-5]|[68])/.test(clean)) return 'Diners Club';
    if (/^(?:2131|1800|35)/.test(clean)) return 'JCB';
    if (/^606282|^3841/.test(clean)) return 'Hipercard';
    if (/^50|^60|^65/.test(clean)) return 'Elo';
    return 'Desconhecida';
  };

  useEffect(() => {
    const clean = numero.replace(/\D/g, '');
    if (clean.length < 13) { setResultado(null); return; }
    const valido = validarLuhn(clean);
    const bandeira = identificarBandeira(clean);
    setResultado({ valido, bandeira, digito: clean.slice(-4) });
  }, [numero]);

  const formatarNumero = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 19);
    const groups = cleaned.match(/.{1,4}/g);
    setNumero(groups ? groups.join(' ') : cleaned);
  };

  return (
    <div className="space-y-6" id="util-cartao">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Validador de Cartão de Crédito</h2>
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1">Número do Cartão</label>
        <input type="text" className="w-full md:w-1/2 border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-lg tracking-widest" value={numero} onChange={e => formatarNumero(e.target.value)} placeholder="0000 0000 0000 0000" />
      </div>
      {resultado && (
        <div className={`p-5 rounded-xl border text-center ${resultado.valido ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <span className={`text-2xl font-extrabold block ${resultado.valido ? 'text-emerald-600' : 'text-red-600'}`}>
            {resultado.valido ? '✅ Cartão Válido' : '❌ Cartão Inválido'}
          </span>
          <div className="grid grid-cols-2 gap-3 mt-3 text-xs max-w-xs mx-auto">
            <div className="p-2 bg-white dark:bg-slate-800 rounded">Bandeira: <strong>{resultado.bandeira}</strong></div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded">Final: <strong className="font-mono">{resultado.digito}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}

// PLACEHOLDER PARA NOVOS UTILITÁRIOS
function PlaceholderUtilitario({ id }: { id: string }) {
  const nomes: {[key: string]: string} = {
    'validador-cartao': 'Validador de Cartão de Crédito',
  };
  return (
    <div className="space-y-6 text-center py-8" id={`placeholder-${id}`}>
      <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-100">
        <span className="text-3xl block mb-3">🛠️</span>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{nomes[id] || id}</h3>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">Ferramenta em desenvolvimento.</p>
      </div>
    </div>
  );
}

// 7. DECODE URL
function DecodeUrlSelector() {
  const [inputVal, setInputVal] = useState<string>('chave%3Dbrasil%20ferramentas%26origem%3Dpesquisa%20google');
  const [decoded, setDecoded] = useState<string>('');

  useEffect(() => {
    try {
      setDecoded(decodeURIComponent(inputVal));
    } catch {
      setDecoded('Erro de decodificação: Sintaxe mal formada.');
    }
  }, [inputVal]);

  return (
    <div className="space-y-6" id="util-decode">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Decodificador de Parâmetros URL (Decode)</h2>
      <div className="space-y-3">
        <label className="block text-xs text-slate-500">String codificada</label>
        <input type="text" className="w-full border p-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 dark:text-slate-100" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      </div>
      <div className="space-y-2">
        <span className="block text-xs font-mono text-slate-400">String Decodificada (Linguagem Humana)</span>
        <div className="bg-slate-950 p-3 rounded font-mono text-xs text-emerald-400 select-all border border-slate-850 truncate">{decoded}</div>
      </div>
    </div>
  );
}
