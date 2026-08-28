/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 🔒 PRIVACIDADE & VELOCIDADE (CLIENT-SIDE):
 * Todo o processamento de utilitários de texto (contadores, removedores, formatadores JSON, etc.)
 * é executado 100% localmente no navegador do usuário (client-side).
 * Nenhuma requisição ou dado é submetido ao servidor backend.
 */

import React, { useState, useEffect } from 'react';

interface UtilitariosProps {
  toolId: string;
}

export default function Utilitarios({ toolId }: UtilitariosProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm animate-fade-in" id="utilitarios-container">
      {toolId === 'sorteador' && <SorteadorOnline />}
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
      {toolId === 'texto-para-voz' && <TextoParaVoz />}
      {toolId === 'teste-digitacao' && <TesteDigitacao />}
      {toolId === 'formatador-abnt' && <FormatadorABNT />}
    </div>
  );
}

// 15. CONVERSOR DE TEXTO EM VOZ (TEXT TO SPEECH)
function TextoParaVoz() {
  const [texto, setTexto] = useState<string>(
    'Bem-vindo ao Tool Brasil. Esta é uma demonstração de conversão de texto em áudio e voz em tempo real. Você pode personalizar a velocidade e o tom da narração.'
  );
  const [velocidade, setVelocidade] = useState<number>(1);
  const [tom, setTom] = useState<number>(1);
  const [vozes, setVozes] = useState<SpeechSynthesisVoice[]>([]);
  const [vozIndex, setVozIndex] = useState<number>(0);
  const [falando, setFalando] = useState<boolean>(false);
  const [pausado, setPausado] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const carregarVozes = () => {
        const disponiveis = window.speechSynthesis.getVoices();
        setVozes(disponiveis);
        // Preferir voz em Português
        const ptIndex = disponiveis.findIndex(v => v.lang.includes('pt') || v.lang.includes('PT'));
        if (ptIndex !== -1) setVozIndex(ptIndex);
      };
      carregarVozes();
      window.speechSynthesis.onvoiceschanged = carregarVozes;
    }
  }, []);

  const falar = () => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta a API de síntese de voz nativa.');
      return;
    }

    if (pausado) {
      window.speechSynthesis.resume();
      setPausado(false);
      setFalando(true);
      return;
    }

    window.speechSynthesis.cancel(); // Limpar áudios anteriores

    if (!texto.trim()) return;

    const utterance = new SpeechSynthesisUtterance(texto);
    if (vozes[vozIndex]) utterance.voice = vozes[vozIndex];
    utterance.rate = velocidade;
    utterance.pitch = tom;

    utterance.onstart = () => {
      setFalando(true);
      setPausado(false);
    };

    utterance.onend = () => {
      setFalando(false);
      setPausado(false);
    };

    utterance.onerror = () => {
      setFalando(false);
      setPausado(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pausar = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setPausado(true);
      setFalando(false);
    }
  };

  const parar = () => {
    window.speechSynthesis.cancel();
    setFalando(false);
    setPausado(false);
  };

  return (
    <div className="space-y-6" id="util-tts">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Conversor de Texto em Voz (Text to Speech)</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Converta qualquer texto em narração de áudio com síntese de voz nativa em português.</p>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Digite ou cole o texto para narração:</label>
        <textarea
          rows={6}
          className="w-full border border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-sans outline-none focus:ring-2 focus:ring-emerald-500"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite o texto aqui..."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Voz do Narrador</label>
            <select
              className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold"
              value={vozIndex}
              onChange={(e) => setVozIndex(Number(e.target.value))}
            >
              {vozes.length > 0 ? (
                vozes.map((v, idx) => (
                  <option key={idx} value={idx}>
                    {v.name} ({v.lang})
                  </option>
                ))
              ) : (
                <option value={0}>Voz Padrão do Sistema</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Velocidade: {velocidade}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              className="w-full accent-emerald-600 cursor-pointer"
              value={velocidade}
              onChange={(e) => setVelocidade(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Tom de Voz (Pitch): {tom}</label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              className="w-full accent-emerald-600 cursor-pointer"
              value={tom}
              onChange={(e) => setTom(Number(e.target.value))}
            />
          </div>
        </div>

        {/* CONTROLES DE REPRODUÇÃO */}
        <div className="flex items-center gap-3 pt-3">
          <button
            onClick={falar}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 hover:cursor-pointer shadow-xs"
          >
            {falando ? '🔊 Lendo Texto...' : pausado ? '▶ Retomar Leitura' : '▶ Ouvir Texto'}
          </button>

          {falando && (
            <button
              onClick={pausar}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm py-3 px-5 rounded-xl transition hover:cursor-pointer"
            >
              ⏸ Pausar
            </button>
          )}

          {(falando || pausado) && (
            <button
              onClick={parar}
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-sm py-3 px-5 rounded-xl transition hover:cursor-pointer"
            >
              ⏹ Parar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 16. TESTE DE VELOCIDADE DE DIGITAÇÃO (WPM)
function TesteDigitacao() {
  const textosDisponiveis = [
    "A tecnologia transforma a maneira como trabalhamos e aprendemos todos os dias. Desenvolver boas habilidades de digitação no teclado é fundamental para aumentar a produtividade e a precisão no trabalho.",
    "O planejamento financeiro pessoal permite conquistar a estabilidade e alcançar metas de longo prazo. Controlar gastos e investir com disciplina faz toda a diferença para o futuro.",
    "A internet conecta pessoas e empresas em velocidade impressionante. Ferramentas online gratuitas facilitam tarefas diárias e otimizam a gestão de tempo em qualquer profissão."
  ];

  const [textoAlvoIndex, setTextoAlvoIndex] = useState(0);
  const [duracaoSegundos, setDuracaoSegundos] = useState(30);
  const [tempoRestante, setTempoRestante] = useState(30);
  const [testando, setTestando] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [textoDigitado, setTextoDigitado] = useState('');
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [precisao, setPrecisao] = useState(100);
  const [errosCount, setErrosCount] = useState(0);

  const textoAlvo = textosDisponiveis[textoAlvoIndex];

  // Efeito do Cronômetro do Teste
  useEffect(() => {
    let timer: any = null;
    if (testando && tempoRestante > 0) {
      timer = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tempoRestante === 0 && testando) {
      finalizarTeste();
    }
    return () => clearInterval(timer);
  }, [testando, tempoRestante]);

  const iniciarTeste = () => {
    setTextoDigitado('');
    setTempoRestante(duracaoSegundos);
    setTestando(true);
    setConcluido(false);
    setWpm(0);
    setCpm(0);
    setPrecisao(100);
    setErrosCount(0);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!testando && !concluido) {
      iniciarTeste();
    }
    setTextoDigitado(val);

    // Calcular estatísticas em tempo real
    let erros = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== textoAlvo[i]) {
        erros++;
      }
    }
    setErrosCount(erros);

    const caracteresCorretos = Math.max(0, val.length - erros);
    const perc = val.length > 0 ? Math.round((caracteresCorretos / val.length) * 100) : 100;
    setPrecisao(perc);

    if (val.length >= textoAlvo.length) {
      finalizarTeste();
    }
  };

  const finalizarTeste = () => {
    setTestando(false);
    setConcluido(true);

    const tempoDecorridoMin = (duracaoSegundos - tempoRestante) / 60 || 1 / 60;
    const totalCaracteres = textoDigitado.length;
    const erros = errosCount;
    const caracteresValidos = Math.max(0, totalCaracteres - erros);

    // WPM padronizado (1 palavra = 5 caracteres)
    const palavrasLiquidas = caracteresValidos / 5;
    const calcWpm = Math.round(palavrasLiquidas / tempoDecorridoMin);
    const calcCpm = Math.round(totalCaracteres / tempoDecorridoMin);

    setWpm(Math.max(0, calcWpm));
    setCpm(Math.max(0, calcCpm));
  };

  const trocarTexto = () => {
    setTextoAlvoIndex((prev) => (prev + 1) % textosDisponiveis.length);
    iniciarTeste();
  };

  return (
    <div className="space-y-6" id="util-digitacao">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Teste de Velocidade de Digitação (WPM)</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Descubra quantas Palavras Por Minuto (WPM) você digita e meça sua precisão no teclado.</p>
      </div>

      {/* PAINEL DE CONTROLE DE TEMPO */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
          <span>Tempo do Teste:</span>
          {[30, 60].map((t) => (
            <button
              key={t}
              onClick={() => { setDuracaoSegundos(t); setTempoRestante(t); setConcluido(false); setTestando(false); }}
              className={`px-3 py-1 rounded-lg border transition ${duracaoSegundos === t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'}`}
            >
              {t} Segundos
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
            ⏱ Tempo: {tempoRestante}s
          </span>
          <button
            onClick={trocarTexto}
            className="text-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-bold underline cursor-pointer"
          >
            Trocar Frase 🔄
          </button>
        </div>
      </div>

      {/* TEXTO GUIA */}
      <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-mono leading-relaxed select-none">
        {textoAlvo.split('').map((char, idx) => {
          let colorClass = 'text-slate-500 dark:text-slate-400';
          if (idx < textoDigitado.length) {
            colorClass = textoDigitado[idx] === char ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100/50 dark:bg-emerald-950/50' : 'text-red-600 bg-red-100 dark:bg-red-950/50 font-bold';
          }
          return (
            <span key={idx} className={colorClass}>
              {char}
            </span>
          );
        })}
      </div>

      {/* CAMPO DE DIGITAÇÃO */}
      <div>
        <textarea
          rows={3}
          disabled={concluido}
          className="w-full border-2 border-slate-300 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono outline-none focus:border-emerald-500 disabled:opacity-60"
          value={textoDigitado}
          onChange={handleInput}
          placeholder="Comece a digitar aqui para iniciar o cronômetro..."
        />
      </div>

      {/* RESULTADO FINAL */}
      {concluido && (
        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-900 rounded-xl text-center space-y-4 animate-fade-in">
          <h3 className="text-sm font-black uppercase text-emerald-800 dark:text-emerald-400 tracking-wider">🎉 Teste Concluído com Sucesso!</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-mono">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Velocidade WPM</span>
              <strong className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{wpm} PPM</strong>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Precisão</span>
              <strong className="text-2xl font-black text-slate-800 dark:text-slate-200">{precisao}%</strong>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Caracteres CPM</span>
              <strong className="text-xl font-bold text-slate-800 dark:text-slate-200">{cpm} CPM</strong>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Total de Erros</span>
              <strong className="text-xl font-bold text-red-600">{errosCount}</strong>
            </div>
          </div>

          <button
            onClick={iniciarTeste}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-6 rounded-lg transition hover:cursor-pointer"
          >
            🔄 Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
}


// 1. CONTADOR DE CARACTERES E PALAVRAS (WITH DENSITY)
function ContadorTexto() {
  const [texto, setTexto] = useState<string>('A Tool Brasil oferece as melhores soluções de SEO programático gratuitas.');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const raw = texto || '';
    const charComEspacos = raw.length;
    const charSemEspacos = raw.replace(/\s+/g, '').length;
    
    const palavrasArray = raw.trim().split(/\s+/).filter(w => w.length > 0);
    const totalPalavras = palavrasArray.length;
    
    const totalParagrafos = raw.split(/\n+/).filter(p => p.trim().length > 0).length;
    const tempoLeitura = Math.ceil(totalPalavras / 200) || 1;

    const frequencia: { [key: string]: number } = {};
    palavrasArray.forEach(p => {
      const clean = p.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
      if (clean.length > 3) {
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Contador e Analisador de Texto</h2>
      
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">Cole ou digite seu conteúdo:</label>
        <textarea
          className="w-full border border-slate-300 dark:border-slate-700 p-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-lg text-sm font-sans focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          rows={6}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Comece a digitar..."
        />
      </div>

      {stats && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Com Espaços</span>
              <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100">{stats.cc}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Sem Espaços</span>
              <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100">{stats.cs}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Palavras</span>
              <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">{stats.pal}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Parágrafos</span>
              <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-100">{stats.par}</span>
            </div>
            <div className="col-span-2 md:col-span-1 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-100 dark:border-emerald-950/40">
              <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">Est. Leitura</span>
              <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-300">~{stats.tempo} min</span>
            </div>
          </div>

          {stats.topWords.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Densidade Vocabular (Repetições de Termos Chaves):</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {stats.topWords.map(([w, count]: any, i: number) => (
                  <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
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
    result = result.replace(/[ \t]+/g, ' ');
    if (removerLinhasVazias) {
      result = result.split('\n').filter(line => line.trim().length > 0).join('\n');
    }
    setOutputStr(result);
  };

  useEffect(() => { limpar(); }, [inputStr, removerLinhasVazias]);

  return (
    <div className="space-y-6" id="util-spaces">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Removedor de Espaços Extras</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">Texto Original</label>
          <textarea 
            className="w-full border border-slate-350 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
            rows={6} 
            value={inputStr} 
            onChange={(e) => setInputStr(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">Texto Higienizado</label>
          <textarea 
            readOnly 
            className="w-full border border-slate-300 dark:border-slate-800 p-2.5 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-medium" 
            rows={6} 
            value={outputStr} 
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
        <label className="flex items-center gap-2 text-xs hover:cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
          <input type="checkbox" checked={removerLinhasVazias} onChange={() => setRemoverLinhasVazias(!removerLinhasVazias)} className="rounded text-emerald-600 focus:ring-emerald-500" />
          Remover Linhas em Branco Vazias
        </label>
        <button onClick={() => navigator.clipboard.writeText(outputStr)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 px-4 rounded hover:cursor-pointer transition-colors">Copiar Tratado</button>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Formatador e Embelezador JSON</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">Raw string / JSON Desordenado</label>
          <textarea 
            className="w-full border border-slate-300 dark:border-slate-700 p-2.5 font-mono text-xs bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
            rows={10} 
            value={jsonStr} 
            onChange={(e) => setJsonStr(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">JSON Perfeitamente Formatado</label>
          <textarea 
            readOnly 
            className="w-full border border-slate-300 dark:border-slate-800 p-2.5 font-mono text-xs bg-slate-950 text-emerald-400 rounded-lg border-none" 
            rows={10} 
            value={formatted || errorLog} 
          />
        </div>
      </div>
      
      {errorLog && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 text-xs font-mono rounded border border-red-200 dark:border-red-900/50">
          ⚠️ Falha de Sintaxe JSON: {errorLog}
        </div>
      )}

      {!errorLog && formatted && (
        <button onClick={() => navigator.clipboard.writeText(formatted)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-lg transition-colors">Copiar JSON Formatado</button>
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
    clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
    clean = clean.replace(/\s+/g, ' ');
    clean = clean.replace(/\s*([{};:])\s*/g, '$1');
    setMinified(clean.trim());
  };

  useEffect(() => { minificar(); }, [cssStr]);

  return (
    <div className="space-y-6" id="util-css">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Minificador de Folhas de Estilo CSS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">CSS Completo</label>
          <textarea 
            className="w-full border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-xs rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
            rows={8} 
            value={cssStr} 
            onChange={(e) => setCssStr(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">CSS Minificado</label>
          <textarea 
            readOnly 
            className="w-full border border-slate-350 dark:border-slate-800 p-2.5 bg-slate-950 text-slate-200 font-mono text-xs rounded-lg border-none" 
            rows={8} 
            value={minified} 
          />
        </div>
      </div>
      <button onClick={() => navigator.clipboard.writeText(minified)} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs py-2 rounded-lg font-bold transition-colors">Copiar Estilo Minificado</button>
    </div>
  );
}

// 5. MINIFICADOR JAVASCRIPT
function MinificadorJs() {
  const [jsStr, setJsStr] = useState<string>(`// Script de exemplo\nfunction calcularAliquota(salarioBase) {\n  let imposto = salarioBase * 0.11;\n  return imposto;\n}`);
  const [minified, setMinified] = useState<string>('');

  const minificar = () => {
    let clean = jsStr;
    clean = clean.replace(/\/\/.*$/gm, '');
    clean = clean.replace(/\/\*[\s\S]*?\*\//g, '');
    clean = clean.replace(/\s+/g, ' ');
    setMinified(clean.trim());
  };

  useEffect(() => { minificar(); }, [jsStr]);

  return (
    <div className="space-y-6" id="util-js">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Minificador de JavaScript</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">JS Legível</label>
          <textarea 
            className="w-full border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-xs rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
            rows={8} 
            value={jsStr} 
            onChange={(e) => setJsStr(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">JS Compactado</label>
          <textarea 
            readOnly 
            className="w-full border border-slate-350 dark:border-slate-800 p-2.5 bg-slate-955 text-slate-200 font-mono text-xs rounded-lg border-none" 
            rows={8} 
            value={minified} 
          />
        </div>
      </div>
      <button onClick={() => navigator.clipboard.writeText(minified)} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs py-2 rounded-lg font-bold transition-colors">Copiar Script Minificado</button>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Codificador de Parâmetros URL (Encode)</h2>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">Texto bruto para codificar</label>
        <input 
          type="text" 
          className="w-full border border-slate-300 dark:border-slate-700 p-2.5 rounded-lg text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-medium" 
          value={inputVal} 
          onChange={(e) => setInputVal(e.target.value)} 
        />
      </div>
      <div className="space-y-2">
        <span className="block text-xs font-bold font-mono text-slate-500 dark:text-slate-400">String Codificada (Pronta para query param)</span>
        <div className="bg-slate-950 p-3 rounded font-mono text-xs text-amber-400 select-all border border-slate-800 truncate">{encoded}</div>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Decodificador de Parâmetros URL (Decode)</h2>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">String codificada</label>
        <input 
          type="text" 
          className="w-full border border-slate-300 dark:border-slate-700 p-2.5 rounded-lg text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-medium" 
          value={inputVal} 
          onChange={(e) => setInputVal(e.target.value)} 
        />
      </div>
      <div className="space-y-2">
        <span className="block text-xs font-bold font-mono text-slate-500 dark:text-slate-400">String Decodificada (Linguagem Humana)</span>
        <div className="bg-slate-950 p-3 rounded font-mono text-xs text-emerald-400 select-all border border-slate-800 truncate">{decoded}</div>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Cronômetro Online</h2>
      <div className="text-center space-y-4">
        <div className="text-5xl md:text-7xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400 tracking-widest bg-slate-100/50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          {formatar(tempo)}
        </div>
        <div className="flex gap-2 justify-center">
          <button onClick={() => setAtivo(!ativo)} className={`px-6 py-2 rounded-lg font-bold text-sm ${ativo ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-600 hover:bg-emerald-700'} text-white transition hover:cursor-pointer`}>
            {ativo ? '⏹ Pausar' : '▶ Iniciar'}
          </button>
          <button onClick={registrarVolta} disabled={!ativo} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm disabled:opacity-50 hover:cursor-pointer transition-colors">⏱ Volta</button>
          <button onClick={resetar} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm hover:cursor-pointer transition-colors">🔄 Resetar</button>
        </div>
        {voltas.length > 0 && (
          <div className="max-h-40 overflow-y-auto space-y-1">
            {voltas.map((v, i) => (
              <div key={i} className="font-mono text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800">
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Separador de Sílabas</h2>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">Digite uma palavra</label>
        <input 
          type="text" 
          className="w-full md:w-1/2 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 text-sm outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-medium" 
          value={palavra} 
          onChange={e => setPalavra(e.target.value.toLowerCase().normalize('NFD'))} 
        />
      </div>
      {separado && (
        <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 text-center">
          <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 tracking-wider font-mono">{separado}</span>
        </div>
      )}
      <p className="text-[10px] text-slate-450 dark:text-slate-500 italic">* Separação simplificada para palavras comuns. Palavras com hiatos, tritongos ou encontros consonantais complexos podem ter variações.</p>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Conversor de Maiúsculas/Minúsculas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">Texto Original</label>
          <textarea 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 text-xs outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
            rows={4} 
            value={texto} 
            onChange={e => setTexto(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">Resultado</label>
          <textarea 
            readOnly 
            className="w-full border border-slate-300 dark:border-slate-800 rounded-lg p-2.5 bg-emerald-50/50 dark:bg-emerald-950/10 text-emerald-800 dark:text-emerald-400 text-xs font-semibold" 
            rows={4} 
            value={resultado} 
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {['maiusculas', 'minusculas', 'capitalizado', 'alternado'].map(m => (
          <button 
            key={m} 
            onClick={() => setModo(m)} 
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors hover:cursor-pointer border ${modo === m ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'}`}
          >
            {m === 'maiusculas' ? 'MAIÚSCULAS' : m === 'minusculas' ? 'minúsculas' : m === 'capitalizado' ? 'Capitalizado' : 'aLtErNaDo'}
          </button>
        ))}
        <button onClick={() => navigator.clipboard.writeText(resultado)} className="px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white hover:cursor-pointer transition-colors border border-slate-900 dark:border-slate-700">Copiar</button>
      </div>
    </div>
  );
}

// 11. FILTRO E LOCALIZADOR DE E-MAILS
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Filtro e Localizador de E-mails</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">Texto ou Relatório</label>
          <textarea 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-mono outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
            rows={6} 
            value={texto} 
            onChange={e => setTexto(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">E-mails Localizados ({emails.length})</label>
          <div className="border border-slate-300 dark:border-slate-800 rounded-lg p-2.5 bg-slate-950 text-emerald-400 text-xs font-mono min-h-[140px] space-y-1">
            {emails.length > 0 ? emails.map((e, i) => <div key={i}>📧 {e}</div>) : <div className="text-slate-500">Nenhum e-mail localizado</div>}
          </div>
          {emails.length > 0 && (
            <button onClick={() => navigator.clipboard.writeText(emails.join('\n'))} className="mt-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg hover:cursor-pointer transition-colors font-bold">
              Copiar Todos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 12. COMPARADOR DE TEXTOS (DIFF)
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Comparador de Textos (Diff)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">Versão A (Original)</label>
          <textarea 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-mono outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
            rows={6} 
            value={textoA} 
            onChange={e => setTextoA(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-550 dark:text-slate-400">Versão B (Modificada)</label>
          <textarea 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs font-mono outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
            rows={6} 
            value={textoB} 
            onChange={e => setTextoB(e.target.value)} 
          />
        </div>
      </div>
      <div className="border border-slate-300 dark:border-slate-800 rounded-lg p-3 bg-slate-950 min-h-[100px]">
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

// 13. VALIDADOR DE CARTÃO DE CRÉDITO
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">Validador de Cartão de Crédito</h2>
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 mb-1">Número do Cartão</label>
        <input 
          type="text" 
          className="w-full md:w-1/2 border border-slate-350 dark:border-slate-700 rounded-lg p-3 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-mono text-lg tracking-widest outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500" 
          value={numero} 
          onChange={e => formatarNumero(e.target.value)} 
          placeholder="0000 0000 0000 0000" 
        />
      </div>
      {resultado && (
        <div className={`p-5 rounded-xl border text-center transition-all duration-250 ${resultado.valido ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/50' : 'bg-red-50/50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50'}`}>
          <span className={`text-2xl font-extrabold block ${resultado.valido ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
            {resultado.valido ? '✅ Cartão Válido' : '❌ Cartão Inválido'}
          </span>
          <div className="grid grid-cols-2 gap-3 mt-3 text-xs max-w-xs mx-auto">
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">Bandeira: <strong>{resultado.bandeira}</strong></div>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">Final: <strong className="font-mono">{resultado.digito}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}

function SorteadorOnline() {
  const [aba, setAba] = useState<'numeros' | 'nomes'>('numeros');
  
  // State Numeros
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [quantidade, setQuantidade] = useState(1);
  const [numerosSorteados, setNumerosSorteados] = useState<number[]>([]);
  
  // State Nomes
  const [listaNomes, setListaNomes] = useState('');
  const [quantidadeNomes, setQuantidadeNomes] = useState(1);
  const [nomesSorteados, setNomesSorteados] = useState<string[]>([]);
  
  const sortearNumeros = () => {
    if (min >= max) {
      alert('O número mínimo deve ser menor que o máximo.');
      return;
    }
    const sorteados = [];
    for (let i = 0; i < quantidade; i++) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      sorteados.push(num);
    }
    setNumerosSorteados(sorteados);
  };
  
  const sortearNomes = () => {
    const nomes = listaNomes.split('\n').map(n => n.trim()).filter(n => n !== '');
    if (nomes.length === 0) {
      alert('Insira pelo menos um nome na lista.');
      return;
    }
    if (quantidadeNomes > nomes.length) {
      alert('A quantidade de sorteados não pode ser maior que a lista.');
      return;
    }
    
    // Fisher-Yates shuffle para aleatoriedade
    const shuffled = [...nomes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setNomesSorteados(shuffled.slice(0, quantidadeNomes));
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-6">
      
      {/* Abas */}
      <div className="flex border-b border-slate-200 dark:border-slate-700">
        <button 
          onClick={() => setAba('numeros')}
          className={`flex-1 py-3 text-center font-semibold text-sm transition-colors ${aba === 'numeros' ? 'border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Sortear Números
        </button>
        <button 
          onClick={() => setAba('nomes')}
          className={`flex-1 py-3 text-center font-semibold text-sm transition-colors ${aba === 'nomes' ? 'border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Sortear Nomes
        </button>
      </div>
      
      {/* Aba de Números */}
      {aba === 'numeros' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Mínimo</label>
              <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Máximo</label>
              <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Quantidade</label>
              <input type="number" min="1" max="1000" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
          
          <button onClick={sortearNumeros} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-emerald-600/20">
            SORTEAR AGORA
          </button>
          
          {numerosSorteados.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/50 text-center animate-fade-in">
              <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-widest">Resultados</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {numerosSorteados.map((n, i) => (
                  <span key={i} className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-black text-2xl rounded-full border-2 border-emerald-200 dark:border-emerald-800">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Aba de Nomes */}
      {aba === 'nomes' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cole a lista de nomes (um por linha)</label>
            <textarea 
              rows={8}
              value={listaNomes}
              onChange={(e) => setListaNomes(e.target.value)}
              placeholder="Maria&#10;João&#10;Pedro&#10;Ana"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 resize-none"
            />
            <div className="text-xs text-slate-500 mt-2 text-right">
              Total de nomes identificados: {listaNomes.split('\n').filter(n => n.trim() !== '').length}
            </div>
          </div>
          
          <div className="flex gap-4 items-end">
            <div className="w-1/3">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Qtd de ganhadores</label>
              <input type="number" min="1" value={quantidadeNomes} onChange={(e) => setQuantidadeNomes(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
            </div>
            <button onClick={sortearNomes} className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors shadow-lg shadow-emerald-600/20">
              SORTEAR NOMES
            </button>
          </div>
          
          {nomesSorteados.length > 0 && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/50 animate-fade-in">
              <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-widest text-center">Ganhadores</h3>
              <ul className="space-y-2">
                {nomesSorteados.map((nome, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-lg font-semibold border border-emerald-100 dark:border-emerald-800/50">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-200 dark:bg-emerald-800 rounded-full text-emerald-900 dark:text-emerald-100 text-xs">
                      #{i + 1}
                    </span>
                    {nome}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 17. FORMATADOR DE REFERÊNCIAS ABNT NBR 6023 (LIVROS, ARTIGOS E SITES)
function FormatadorABNT() {
  const [tipoFonte, setTipoFonte] = useState<'livro' | 'artigo' | 'site' | 'tcc' | 'lei'>('livro');

  // Livro
  const [autorLivro, setAutorLivro] = useState('SILVA, João da; SANTOS, Maria Clara');
  const [tituloLivro, setTituloLivro] = useState('Metodologia da Pesquisa Científica');
  const [subtituloLivro, setSubtituloLivro] = useState('diretrizes práticas para o ensino superior');
  const [edicaoLivro, setEdicaoLivro] = useState('3. ed.');
  const [localLivro, setLocalLivro] = useState('São Paulo');
  const [editoraLivro, setEditoraLivro] = useState('Atlas');
  const [anoLivro, setAnoLivro] = useState('2024');

  // Artigo de Periódico
  const [autorArtigo, setAutorArtigo] = useState('OLIVEIRA, Renato Mendes');
  const [tituloArtigo, setTituloArtigo] = useState('Impactos da inteligência artificial na produtividade');
  const [revistaArtigo, setRevistaArtigo] = useState('Revista Brasileira de Tecnologia e Gestão');
  const [localArtigo, setLocalArtigo] = useState('Curitiba');
  const [volumeArtigo, setVolumeArtigo] = useState('v. 18');
  const [numeroArtigo, setNumeroArtigo] = useState('n. 2');
  const [paginasArtigo, setPaginasArtigo] = useState('p. 45-62');
  const [mesAnoArtigo, setMesAnoArtigo] = useState('maio 2025');

  // Website
  const [autorSite, setAutorSite] = useState('INSTITUTO BRASILEIRO DE GEOGRAFIA E ESTATÍSTICA (IBGE)');
  const [tituloPagina, setTituloPagina] = useState('Censo Demográfico 2022: resultados definitivos');
  const [nomePortal, setNomePortal] = useState('Agência IBGE Notícias');
  const [anoSite, setAnoSite] = useState('2023');
  const [urlSite, setUrlSite] = useState('https://agenciadenoticias.ibge.gov.br/censo-2022');
  const [dataAcesso, setDataAcesso] = useState('28 fev. 2026');

  const [copiadoRef, setCopiadoRef] = useState(false);
  const [copiadoCit, setCopiadoCit] = useState(false);

  // Geração da Referência Formatada em HTML e Texto
  let refHtml = '';
  let refTexto = '';
  let citacaoIndireta = '';
  let citacaoDireta = '';

  if (tipoFonte === 'livro') {
    const autorFmt = autorLivro.trim();
    const titFmt = tituloLivro.trim();
    const subFmt = subtituloLivro.trim() ? `: ${subtituloLivro.trim()}` : '';
    const edFmt = edicaoLivro.trim() ? ` ${edicaoLivro.trim()}` : '';
    const locFmt = localLivro.trim() ? ` ${localLivro.trim()}:` : '';
    const editaFmt = editoraLivro.trim() ? ` ${editoraLivro.trim()},` : '';
    const anoFmt = anoLivro.trim() ? ` ${anoLivro.trim()}.` : '.';

    refHtml = `${autorFmt}. <strong>${titFmt}</strong>${subFmt}.${edFmt}.${locFmt}${editaFmt}${anoFmt}`;
    refTexto = `${autorFmt}. ${titFmt}${subFmt}.${edFmt}.${locFmt}${editaFmt}${anoFmt}`;

    const primeiroAutor = autorLivro.split(';')[0].split(',')[0].trim().toUpperCase();
    citacaoIndireta = `(${primeiroAutor}, ${anoLivro})`;
    citacaoDireta = `Segundo ${primeiroAutor.charAt(0) + primeiroAutor.slice(1).toLowerCase()} (${anoLivro}, p. 15)`;
  } else if (tipoFonte === 'artigo') {
    const autorFmt = autorArtigo.trim();
    const titFmt = tituloArtigo.trim();
    const revFmt = revistaArtigo.trim();
    const locFmt = localArtigo.trim() ? `, ${localArtigo.trim()}` : '';
    const volFmt = volumeArtigo.trim() ? `, ${volumeArtigo.trim()}` : '';
    const numFmt = numeroArtigo.trim() ? `, ${numeroArtigo.trim()}` : '';
    const pagFmt = paginasArtigo.trim() ? `, ${paginasArtigo.trim()}` : '';
    const dataFmt = mesAnoArtigo.trim() ? `, ${mesAnoArtigo.trim()}.` : '.';

    refHtml = `${autorFmt}. ${titFmt}. <strong>${revFmt}</strong>${locFmt}${volFmt}${numFmt}${pagFmt}${dataFmt}`;
    refTexto = `${autorFmt}. ${titFmt}. ${revFmt}${locFmt}${volFmt}${numFmt}${pagFmt}${dataFmt}`;

    const primeiroAutor = autorArtigo.split(';')[0].split(',')[0].trim().toUpperCase();
    const anoOnly = mesAnoArtigo.match(/\d{4}/)?.[0] || '2025';
    citacaoIndireta = `(${primeiroAutor}, ${anoOnly})`;
    citacaoDireta = `De acordo com ${primeiroAutor.charAt(0) + primeiroAutor.slice(1).toLowerCase()} (${anoOnly}, p. 48)`;
  } else if (tipoFonte === 'site') {
    const autFmt = autorSite.trim() ? `${autorSite.trim()}. ` : '';
    const titFmt = tituloPagina.trim();
    const portFmt = nomePortal.trim() ? ` <strong>${nomePortal.trim()}</strong>,` : '';
    const anoFmt = anoSite.trim() ? ` ${anoSite.trim()}.` : '';
    const urlFmt = urlSite.trim() ? ` Disponível em: <${urlSite.trim()}>.` : '';
    const acsFmt = dataAcesso.trim() ? ` Acesso em: ${dataAcesso.trim()}.` : '';

    refHtml = `${autFmt}<strong>${titFmt}</strong>.${portFmt}${anoFmt}${urlFmt}${acsFmt}`;
    refTexto = `${autFmt}${titFmt}.${nomePortal ? ` ${nomePortal},` : ''}${anoFmt}${urlFmt}${acsFmt}`;

    const autorToken = autorSite.split(' ')[0].replace(/[^A-Za-z]/g, '').toUpperCase() || 'DOCUMENTO';
    citacaoIndireta = `(${autorToken}, ${anoSite})`;
    citacaoDireta = `Conforme dados do ${autorToken} (${anoSite})`;
  }

  const copiarRef = () => {
    navigator.clipboard.writeText(refTexto);
    setCopiadoRef(true);
    setTimeout(() => setCopiadoRef(false), 2500);
  };

  const copiarCit = () => {
    navigator.clipboard.writeText(citacaoIndireta);
    setCopiadoCit(true);
    setTimeout(() => setCopiadoCit(false), 2500);
  };

  return (
    <div className="space-y-6" id="util-formatador-abnt">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Formatador de Referências ABNT NBR 6023</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gere referências bibliográficas automáticas e padronizadas para TCC, artigos e monografias (NBR 6023:2018 e NBR 10520:2023).</p>
      </div>

      {/* Seletor de Tipo de Documento */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setTipoFonte('livro')} 
          type="button" 
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${tipoFonte === 'livro' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          📖 Livro (Monografia)
        </button>
        <button 
          onClick={() => setTipoFonte('artigo')} 
          type="button" 
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${tipoFonte === 'artigo' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          📰 Artigo de Revista / Periódico
        </button>
        <button 
          onClick={() => setTipoFonte('site')} 
          type="button" 
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${tipoFonte === 'site' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          🌐 Página da Web / Artigo Online
        </button>
      </div>

      {/* Formulários dinâmicos */}
      {tipoFonte === 'livro' && (
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Autores (SOBRENOME, Nome - separados por ponto e vírgula)</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-mono" value={autorLivro} onChange={(e) => setAutorLivro(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Título da Obra (em negrito)</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-bold" value={tituloLivro} onChange={(e) => setTituloLivro(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Subtítulo (se houver, texto normal)</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={subtituloLivro} onChange={(e) => setSubtituloLivro(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Edição</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={edicaoLivro} onChange={(e) => setEdicaoLivro(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Local / Cidade</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={localLivro} onChange={(e) => setLocalLivro(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Editora</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={editoraLivro} onChange={(e) => setEditoraLivro(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Ano</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-mono" value={anoLivro} onChange={(e) => setAnoLivro(e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {tipoFonte === 'artigo' && (
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Autores do Artigo</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-mono" value={autorArtigo} onChange={(e) => setAutorArtigo(e.target.value)} />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Título do Artigo</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={tituloArtigo} onChange={(e) => setTituloArtigo(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Nome da Revista / Periódico (em negrito)</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-bold" value={revistaArtigo} onChange={(e) => setRevistaArtigo(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Local / Cidade da Publicação</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={localArtigo} onChange={(e) => setLocalArtigo(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Volume</label>
              <input type="text" placeholder="v. 18" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={volumeArtigo} onChange={(e) => setVolumeArtigo(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Número / Fascículo</label>
              <input type="text" placeholder="n. 2" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={numeroArtigo} onChange={(e) => setNumeroArtigo(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Páginas</label>
              <input type="text" placeholder="p. 45-62" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={paginasArtigo} onChange={(e) => setPaginasArtigo(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Mês e Ano</label>
              <input type="text" placeholder="maio 2025" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={mesAnoArtigo} onChange={(e) => setMesAnoArtigo(e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {tipoFonte === 'site' && (
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Autor ou Organização Responsável</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-mono uppercase" value={autorSite} onChange={(e) => setAutorSite(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Título da Página ou Matéria (em negrito)</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-bold" value={tituloPagina} onChange={(e) => setTituloPagina(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Nome do Portal / Website</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={nomePortal} onChange={(e) => setNomePortal(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">URL Completa</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-mono" value={urlSite} onChange={(e) => setUrlSite(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Data de Acesso</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={dataAcesso} onChange={(e) => setDataAcesso(e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Resultados de Referência e Citação */}
      <div className="space-y-4">
        {/* Caixa da Referência */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-emerald-900 dark:text-emerald-300">
              📚 Referência Bibliográfica Formatada (NBR 6023)
            </span>
            <button onClick={copiarRef} type="button" className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition cursor-pointer">
              {copiadoRef ? 'Copiado! ✅' : 'Copiar Referência'}
            </button>
          </div>
          <div 
            className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-sans leading-relaxed shadow-sm"
            dangerouslySetInnerHTML={{ __html: refHtml }}
          />
        </div>

        {/* Caixa das Citações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-750 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Citação Indireta (Autor-Data)</span>
              <button onClick={copiarCit} type="button" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                {copiadoCit ? 'Copiado! ✅' : 'Copiar'}
              </button>
            </div>
            <code className="block p-2.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200">
              {citacaoIndireta}
            </code>
          </div>

          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-750 space-y-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Citação Direta (no texto)</span>
            <code className="block p-2.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200">
              {citacaoDireta}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

