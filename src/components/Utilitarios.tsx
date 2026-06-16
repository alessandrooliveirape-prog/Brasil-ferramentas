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
    </div>
  );
}

// 1. CONTADOR DE CARACTERES E PALAVRAS (WITH WORD DENSITY!)
function ContadorTexto() {
  const [texto, setTexto] = useState<string>('O Brasil Ferramentas oferece as melhores soluções de SEO programático gratuitas.');
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
  const [jsonStr, setJsonStr] = useState<string>('{"nome":"Brasil Ferramentas","segmento":"SEO","funcionando":true,"ferramentas":["Calculadoras","Geradores"]}');
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
