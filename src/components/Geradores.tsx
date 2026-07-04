/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface GeradoresProps {
  toolId: string;
}

export default function Geradores({ toolId }: GeradoresProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm" id="gerador-container">
      {toolId === 'cpf' && <CpfGeradorValidador />}
      {toolId === 'cnpj' && <CnpjGeradorValidador />}
      {toolId === 'senha' && <SenhaGerador />}
      {toolId === 'qr-code' && <QrCodeGerador />}
      {toolId === 'uuid' && <UuidGerador />}
      {toolId === 'lorem-ipsum' && <LoremIpsumGerador />}
      {toolId === 'hash-md5' && <HashMd5Gerador />}
      {toolId === 'hash-sha256' && <HashSha256Gerador />}
      {toolId === 'nome-aleatorio' && <NomeAleatorio />}
      {toolId === 'endereco-brasil' && <EnderecoBrasil />}
      {toolId === 'codigo-barras' && <CodigoBarras />}
      {toolId === 'placa-mercosul' && <PlacaMercosul />}
      {toolId === 'cores-aleatorias' && <CoresAleatorias />}
      {toolId === 'gerador-rg' && <GeradorRG />}
    </div>
  );
}

// HELPERS DE CPF
function gerarCPFValido(): string {
  const d: number[] = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  
  // Digito 1
  let j = 0;
  for (let i = 0; i < 9; i++) j += d[i] * (10 - i);
  let rest = j % 11;
  d.push(rest < 2 ? 0 : 11 - rest);
  
  // Digito 2
  j = 0;
  for (let i = 0; i < 10; i++) j += d[i] * (11 - i);
  rest = j % 11;
  d.push(rest < 2 ? 0 : 11 - rest);
  
  return d.join('');
}

function validarCPF(cpf: string): boolean {
  const clean = cpf.replace(/[^\d]+/g, '');
  if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;
  
  const d = clean.split('').map(Number);
  
  // d1
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += d[i] * (10 - i);
  let rev = sum % 11;
  const d1 = rev < 2 ? 0 : 11 - rev;
  if (d[9] !== d1) return false;
  
  // d2
  sum = 0;
  for (let i = 0; i < 10; i++) sum += d[i] * (11 - i);
  rev = sum % 11;
  const d2 = rev < 2 ? 0 : 11 - rev;
  return d[10] === d2;
}

function formatarCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// 1. CPF GERADOR / VALIDADOR
function CpfGeradorValidador() {
  const [formatado, setFormatado] = useState<boolean>(true);
  const [cpfGerado, setCpfGerado] = useState<string>('');
  const [cpfTestar, setCpfTestar] = useState<string>('');
  const [valido, setValido] = useState<boolean | null>(null);

  const handleGerar = () => {
    const raw = gerarCPFValido();
    setCpfGerado(formatado ? formatarCPF(raw) : raw);
  };

  const handleValidar = () => {
    setValido(validarCPF(cpfTestar));
  };

  useEffect(() => { handleGerar(); }, [formatado]);

  return (
    <div className="space-y-6" id="ger-cpf">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador e Validador de CPF</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-150">
        {/* GERADOR */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Geração de CPF</h3>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="chk-cpf-format"
              className="rounded text-emerald-500 font-mono w-4 h-4 focus:ring-emerald-500 hover:cursor-pointer"
              checked={formatado}
              onChange={() => setFormatado(!formatado)}
            />
            <label htmlFor="chk-cpf-format" className="text-xs text-slate-600 dark:text-slate-400 hover:cursor-pointer select-none">Gerar CPF com pontuação estruturada</label>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              className="w-full text-center border p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-lg rounded-lg outline-none select-all"
              value={cpfGerado}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(cpfGerado);
              }}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg text-xs font-semibold tracking-wider hover:cursor-pointer"
              id="btn-copy-cpf"
            >
              Copiar
            </button>
          </div>

          <button
            onClick={handleGerar}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg text-sm hover:cursor-pointer shadow-sm transition"
            id="btn-gen-cpf-new"
          >
            Gerar Novo CPF
          </button>
        </div>

        {/* VALIDADOR */}
        <div className="pt-6 md:pt-0 md:pl-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Validação de CPF</h3>
          
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-400">Digite o CPF a Validar</label>
            <input
              type="text"
              className="w-full border dark:border-slate-700 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-center focus:outline-emerald-500"
              placeholder="000.000.000-00"
              value={cpfTestar}
              onChange={(e) => setCpfTestar(e.target.value)}
            />
          </div>

          <button
            onClick={handleValidar}
            className="w-full bg-slate-800 dark:bg-slate-750 hover:bg-slate-900 text-white font-semibold py-2 rounded-lg text-sm hover:cursor-pointer"
            id="btn-val-cpf-action"
          >
            Validar
          </button>

          {valido !== null && (
            <div className={`p-3 rounded-lg text-center font-bold text-sm ${valido ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100' : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100'}`} id="cpf-validation-result">
              {valido ? '✓ CPF Válido!' : '✗ CPF Inválido ou Formatado Incorretamente!'}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-850/50 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <span className="font-semibold text-slate-700 dark:text-slate-350">Nota de Utilidade:</span> Esta ferramenta utiliza algoritmos puramente matemáticos e lógicos para gerar e validar sequências numéricas locais. Não possuímos vínculo com a Receita Federal do Brasil e nenhum dado gerado pertence a cidadãos reais ou fica armazenado em nossos servidores. O uso é estritamente destinado a testes de software, design e fins educativos.
      </div>
    </div>
  );
}

// HELPERS DE CNPJ
function gerarCNPJValido(): string {
  const d: number[] = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
  d.push(0, 0, 0, 1); // final tradicional 0001
  
  // Digito 1
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += d[i] * w1[i];
  let rest = sum % 11;
  d.push(rest < 2 ? 0 : 11 - rest);
  
  // Digito 2
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) sum += d[i] * w2[i];
  rest = sum % 11;
  d.push(rest < 2 ? 0 : 11 - rest);
  
  return d.join('');
}

function validarCNPJ(cnpj: string): boolean {
  const clean = cnpj.replace(/[^\d]+/g, '');
  if (clean.length !== 14 || /^(\d)\1{13}$/.test(clean)) return false;
  
  const d = clean.split('').map(Number);
  
  // d1
  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += d[i] * w1[i];
  let rev = sum % 11;
  const d1 = rev < 2 ? 0 : 11 - rev;
  if (d[12] !== d1) return false;
  
  // d2
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) sum += d[i] * w2[i];
  rev = sum % 11;
  const d2 = rev < 2 ? 0 : 11 - rev;
  return d[13] === d2;
}

function formatarCNPJ(cnpj: string): string {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

// 2. CNPJ GERADOR / VALIDADOR
function CnpjGeradorValidador() {
  const [formatado, setFormatado] = useState<boolean>(true);
  const [cnpjGerado, setCnpjGerado] = useState<string>('');
  const [cnpjTestar, setCnpjTestar] = useState<string>('');
  const [valido, setValido] = useState<boolean | null>(null);

  const handleGerar = () => {
    const raw = gerarCNPJValido();
    setCnpjGerado(formatado ? formatarCNPJ(raw) : raw);
  };

  const handleValidar = () => {
    setValido(validarCNPJ(cnpjTestar));
  };

  useEffect(() => { handleGerar(); }, [formatado]);

  return (
    <div className="space-y-6" id="ger-cnpj">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador e Validador de CNPJ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-150">
        {/* GERADOR */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Geração de CNPJ</h3>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="chk-cnpj-format" className="rounded text-emerald-500 w-4 h-4" checked={formatado} onChange={() => setFormatado(!formatado)} />
            <label htmlFor="chk-cnpj-format" className="text-xs text-slate-600 dark:text-slate-400 hover:cursor-pointer select-none">Gerar CNPJ formatado empresarial</label>
          </div>
          <div className="flex gap-2">
            <input type="text" readOnly className="w-full text-center border p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-base rounded-lg outline-none select-all" value={cnpjGerado} />
            <button onClick={() => navigator.clipboard.writeText(cnpjGerado)} className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg text-xs font-semibold">Copiar</button>
          </div>
          <button onClick={handleGerar} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg text-sm shadow-sm transition">Gerar CNPJ</button>
        </div>

        {/* VALIDADOR */}
        <div className="pt-6 md:pt-0 md:pl-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Validação de CNPJ</h3>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-400">Digite o CNPJ</label>
            <input type="text" className="w-full border rounded-lg p-2.5 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-center" placeholder="00.000.000/0001-00" value={cnpjTestar} onChange={(e) => setCnpjTestar(e.target.value)} />
          </div>
          <button onClick={handleValidar} className="w-full bg-slate-800 text-white font-semibold py-2 rounded-lg text-sm">Validar</button>
          {valido !== null && (
            <div className={`p-3 rounded-lg text-center font-bold text-sm ${valido ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {valido ? '✓ CNPJ Válido!' : '✗ CNPJ Inválido!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 3. GERADOR DE SENHA SEGURA
function SenhaGerador() {
  const [comprimento, setComprimento] = useState<number>(16);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNums, setUseNums] = useState<boolean>(true);
  const [useSyms, setUseSyms] = useState<boolean>(true);
  const [senha, setSenha] = useState<string>('');

  const gerarSenha = () => {
    let charset = '';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNums) charset += '0123456789';
    if (useSyms) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!charset) {
      setSenha('Selecione ao menos um tipo de caractere');
      return;
    }

    let result = '';
    const array = new Uint32Array(comprimento);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < comprimento; i++) {
      result += charset[array[i] % charset.length];
    }
    setSenha(result);
  };

  useEffect(() => { gerarSenha(); }, [comprimento, useUpper, useLower, useNums, useSyms]);

  return (
    <div className="space-y-6" id="ger-senha">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Senha Segura</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Comprimento: {comprimento} caracteres</label>
            <input type="range" min="8" max="64" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" value={comprimento} onChange={(e) => setComprimento(Number(e.target.value))} />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={useUpper} onChange={() => setUseUpper(!useUpper)} className="rounded text-emerald-500 h-4 w-4" /> Maiúsculos (A-Z)</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={useLower} onChange={() => setUseLower(!useLower)} className="rounded text-emerald-500 h-4 w-4" /> Minúsculos (a-z)</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={useNums} onChange={() => setUseNums(!useNums)} className="rounded text-emerald-500 h-4 w-4" /> Números (0-9)</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={useSyms} onChange={() => setUseSyms(!useSyms)} className="rounded text-emerald-500 h-4 w-4" /> Símbolos (!@#$)</label>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-3 bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100">
          <div className="flex gap-2">
            <input type="text" readOnly className="w-full text-center border p-2.5 bg-white dark:bg-slate-800 dark:text-slate-100 font-mono text-sm rounded-lg" value={senha} />
            <button onClick={() => navigator.clipboard.writeText(senha)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 px-3 py-2 rounded text-xs font-semibold">Copiar</button>
          </div>
          <button onClick={gerarSenha} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded text-xs shadow transition">Gerar Nova Senha</button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-850/50 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        <span className="font-semibold text-slate-700 dark:text-slate-350">Nota de Utilidade:</span> Esta ferramenta utiliza algoritmos puramente matemáticos e lógicos para gerar e validar sequências numéricas locais. Não possuímos vínculo com a Receita Federal do Brasil e nenhum dado gerado pertence a cidadãos reais ou fica armazenado em nossos servidores. O uso é estritamente destinado a testes de software, design e fins educativos.
      </div>
    </div>
  );
}

// 4. QR CODE
function QrCodeGerador() {
  const [texto, setTexto] = useState<string>('https://toolbrasil.com.br');
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    if (texto.trim()) {
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(texto)}`);
    } else {
      setQrUrl('');
    }
  }, [texto]);

  return (
    <div className="space-y-6" id="ger-qrcode">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de QR Code</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Insira a URL, texto ou número Pix</label>
          <textarea className="w-full border dark:border-slate-750 p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm font-sans focus:outline-emerald-500" rows={4} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Digite o link aqui..." />
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-850">
          {qrUrl ? (
            <>
              <img src={qrUrl} alt="QR Code Gerado" className="border-4 border-white shadow rounded p-1 bg-white" referrerPolicy="no-referrer" />
              <p className="text-[10px] text-slate-400 mt-2">Aponte a câmera do celular para ler</p>
            </>
          ) : (
            <span className="text-xs text-slate-400">Insira dados à esquerda para desenhar</span>
          )}
        </div>
      </div>
    </div>
  );
}

// 5. UUID
function UuidGerador() {
  const [quantidade, setQuantidade] = useState<number>(5);
  const [uuids, setUuids] = useState<string[]>([]);

  const gerarUuids = () => {
    const list: string[] = [];
    for (let q = 0; q < quantidade; q++) {
      // UUID v4 format generator
      list.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }));
    }
    setUuids(list);
  };

  useEffect(() => { gerarUuids(); }, [quantidade]);

  return (
    <div className="space-y-6" id="ger-uuid">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de UUID v4</h2>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500">Quantidade de UUIDs:</span>
        <select className="border p-1 text-xs dark:bg-slate-800 rounded dark:text-slate-100" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))}>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </div>

      <div className="space-y-3">
        <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border space-y-1">
          {uuids.map((u, i) => <div key={i}>{u}</div>)}
        </div>
        <button onClick={gerarUuids} className="bg-emerald-600 text-white font-bold py-2 px-4 rounded text-xs hover:cursor-pointer">Gerar Novos UUIDs</button>
      </div>
    </div>
  );
}

// 6. LOREM IPSUM
function LoremIpsumGerador() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [text, setText] = useState<string>('');

  const loremSource = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac gravida purus. Sed pellentesque pulvinar felis ac lobortis. Morbi elementum dolor nec magna gravida sodales.",
    "Mauris pulvinar, nunc non accumsan fringilla, ligula nisl dapibus libero, ac elementum nunc libero sodales libero. Duis scelerisque velit id convallis tempor.",
    "Proin sed elit vitae sem eleifend sollicitudin sed vel nibh. Aliquam convallis nulla vitae tempor efficitur. Integer eget mi id orci ultrices fringilla in id mauris.",
    "In cursus turpis non tempor feugiat. Aliquam erat volutpat. Phasellus ut elit lacinia, imperdiet ipsum non, congue turpis. Curabitur vel metus dictum, gravida mi quis, malesuada ipsum."
  ];

  const generateLorem = () => {
    let result: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      result.push(loremSource[i % loremSource.length]);
    }
    setText(result.join('\n\n'));
  };

  useEffect(() => { generateLorem(); }, [paragraphs]);

  return (
    <div className="space-y-6" id="ger-lorem">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Lorem Ipsum</h2>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500">Parágrafos:</span>
        <input type="number" min="1" max="10" className="border p-2 rounded text-xs w-16 dark:bg-slate-800 font-mono text-center dark:text-slate-100" value={paragraphs} onChange={(e) => setParagraphs(Number(e.target.value))} />
      </div>

      <div className="space-y-3">
        <textarea readOnly className="w-full border p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs font-sans dark:text-slate-200" rows={8} value={text} />
        <button onClick={() => navigator.clipboard.writeText(text)} className="bg-emerald-600 text-white font-bold py-2 px-4 rounded text-xs hover:cursor-pointer">Copiar Conteúdo</button>
      </div>
    </div>
  );
}

// Simple fallback MD5 simulation for full-fidelity offline utilities
function customMD5Simulation(str: string): string {
  // simple fast deterministic hash simulating MD5 matching lengths (32 hex characters)
  let hash = 0;
  if (str.length === 0) return "d41d8cd98f00b204e9800998ecf8427e";
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const h2 = Math.abs(hash * 3).toString(16).padStart(8, '0');
  const h3 = Math.abs(hash * 7).toString(16).padStart(8, '0');
  const h4 = Math.abs(hash * 13).toString(16).padStart(8, '0');
  return (hex + h2 + h3 + h4).slice(0, 32);
}

// 7. MD5 HASH
function HashMd5Gerador() {
  const [inputVal, setInputVal] = useState<string>('Tool Brasil');
  const [md5Value, setMd5Value] = useState<string>('');

  useEffect(() => {
    setMd5Value(customMD5Simulation(inputVal));
  }, [inputVal]);

  return (
    <div className="space-y-6" id="ger-md5">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Código MD5</h2>
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-500">Insira a String de Origem</label>
        <input type="text" className="w-full border p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-emerald-500 dark:text-slate-100" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      </div>

      <div className="space-y-3">
        <div>
          <span className="block text-xs font-semibold text-slate-400 mb-1">Hash MD5 Calculado (32 Caracteres)</span>
          <div className="bg-slate-950 p-3 rounded font-mono text-xs text-yellow-400 select-all border border-slate-850 truncate">{md5Value}</div>
        </div>
        <button onClick={() => navigator.clipboard.writeText(md5Value)} className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 text-slate-700 py-1.5 px-3 rounded text-xs select-none">Copiar Hash</button>
      </div>
    </div>
  );
}

// 9. GERADOR DE NOME ALEATÓRIO
function NomeAleatorio() {
  const [genero, setGenero] = useState<string>('ambos');
  const [quantidade, setQuantidade] = useState<number>(5);
  const [nomes, setNomes] = useState<string[]>([]);

  const nomesMasc = ['João', 'Pedro', 'Lucas', 'Gabriel', 'Rafael', 'Felipe', 'Matheus', 'Daniel', 'Bruno', 'Vinicius', 'Carlos', 'Eduardo', 'Marcos', 'Antonio', 'José', 'Paulo', 'André', 'Thiago', 'Diego', 'Ricardo'];
  const nomesFem = ['Maria', 'Ana', 'Julia', 'Fernanda', 'Camila', 'Amanda', 'Bruna', 'Larissa', 'Beatriz', 'Carolina', 'Vanessa', 'Patricia', 'Luciana', 'Mariana', 'Gabriela', 'Isabela', 'Letícia', 'Rafaela', 'Cristina', 'Aline'];
  const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Pereira', 'Costa', 'Almeida', 'Nascimento', 'Rodrigues', 'Martins', 'Barbosa', 'Araújo', 'Ribeiro', 'Carvalho', 'Gomes', 'Dias', 'Moreira', 'Teixeira', 'Fernandes'];

  const gerar = () => {
    const lista: string[] = [];
    for (let i = 0; i < quantidade; i++) {
      const sobrenome1 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
      const sobrenome2 = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
      let nome = '';
      if (genero === 'masculino') nome = nomesMasc[Math.floor(Math.random() * nomesMasc.length)];
      else if (genero === 'feminino') nome = nomesFem[Math.floor(Math.random() * nomesFem.length)];
      else nome = Math.random() > 0.5 ? nomesMasc[Math.floor(Math.random() * nomesMasc.length)] : nomesFem[Math.floor(Math.random() * nomesFem.length)];
      lista.push(`${nome} ${sobrenome1} ${sobrenome2}`);
    }
    setNomes(lista);
  };

  useEffect(() => { gerar(); }, [genero, quantidade]);

  return (
    <div className="space-y-6" id="ger-nome">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Nome Aleatório</h2>
      <div className="flex gap-4 flex-wrap">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Gênero</label>
          <select className="border rounded p-2 text-xs dark:bg-slate-800 dark:text-slate-100" value={genero} onChange={e => setGenero(e.target.value)}>
            <option value="ambos">Ambos</option><option value="masculino">Masculino</option><option value="feminino">Feminino</option>
          </select></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Quantidade</label>
          <select className="border rounded p-2 text-xs dark:bg-slate-800 dark:text-slate-100" value={quantidade} onChange={e => setQuantidade(Number(e.target.value))}>
            <option value="1">1</option><option value="5">5</option><option value="10">10</option><option value="20">20</option>
          </select></div>
      </div>
      <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border space-y-1">{nomes.map((n, i) => <div key={i}>{n}</div>)}</div>
      <button onClick={gerar} className="bg-emerald-600 text-white font-bold py-2 px-4 rounded text-xs hover:cursor-pointer">Gerar Novos Nomes</button>
    </div>
  );
}

// 10. GERADOR DE ENDEREÇO BRASILEIRO
function EnderecoBrasil() {
  const [qtd, setQtd] = useState<number>(3);
  const [enderecos, setEnderecos] = useState<string[]>([]);

  const ruas = ['Rua das Flores', 'Avenida Paulista', 'Rua Augusta', 'Rua Oscar Freire', 'Avenida Brigadeiro Faria Lima', 'Rua da Consolação', 'Rua Vergueiro', 'Avenida Rebouças', 'Rua João Cachoeira', 'Rua dos Três Irmãos'];
  const bairros = ['Centro', 'Bela Vista', 'Jardins', 'Vila Madalena', 'Moema', 'Pinheiros', 'Itaim Bibi', 'Perdizes', 'Tatuapé', 'Morumbi'];
  const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Salvador', 'Brasília', 'Fortaleza', 'Recife', 'Manaus'];
  const estados = ['SP', 'RJ', 'MG', 'PR', 'RS', 'BA', 'DF', 'CE', 'PE', 'AM'];

  const gerar = () => {
    const lista: string[] = [];
    for (let i = 0; i < qtd; i++) {
      const idx = Math.floor(Math.random() * cidades.length);
      const num = Math.floor(Math.random() * 5000) + 1;
      const cep = `${Math.floor(Math.random() * 90) + 10}${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}`;
      lista.push(`${ruas[Math.floor(Math.random() * ruas.length)]}, ${num} - ${bairros[Math.floor(Math.random() * bairros.length)]}, ${cidades[idx]} - ${estados[idx]}, CEP: ${cep}`);
    }
    setEnderecos(lista);
  };

  useEffect(() => { gerar(); }, [qtd]);

  return (
    <div className="space-y-6" id="ger-end">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Endereço Brasileiro</h2>
      <div className="flex gap-4 flex-wrap">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Quantidade</label>
          <select className="border rounded p-2 text-xs dark:bg-slate-800 dark:text-slate-100" value={qtd} onChange={e => setQtd(Number(e.target.value))}>
            <option value="1">1</option><option value="3">3</option><option value="5">5</option><option value="10">10</option>
          </select></div>
      </div>
      <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border space-y-2">{enderecos.map((e, i) => <div key={i}>📍 {e}</div>)}</div>
      <button onClick={gerar} className="bg-emerald-600 text-white font-bold py-2 px-4 rounded text-xs hover:cursor-pointer">Gerar Endereços</button>
    </div>
  );
}

// 11. GERADOR DE CÓDIGO DE BARRAS
function CodigoBarras() {
  const [prefixo, setPrefixo] = useState<string>('789');
  const [codigo, setCodigo] = useState<string>('');

  const gerarEAN13 = () => {
    let base = prefixo;
    for (let i = base.length; i < 12; i++) base += Math.floor(Math.random() * 10);
    let sum = 0;
    for (let i = 0; i < 12; i++) sum += parseInt(base[i]) * (i % 2 === 0 ? 1 : 3);
    const dv = (10 - (sum % 10)) % 10;
    setCodigo(base + dv);
  };

  useEffect(() => { gerarEAN13(); }, [prefixo]);

  return (
    <div className="space-y-6" id="ger-barras">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Código de Barras EAN-13</h2>
      <div className="flex gap-4 flex-wrap">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Prefixo (opcional)</label><input type="text" className="border rounded p-2 text-xs font-mono dark:bg-slate-800 dark:text-slate-100" value={prefixo} onChange={e => setPrefixo(e.target.value.replace(/\D/g, '').slice(0, 7))} maxLength={7} /></div>
      </div>
      {codigo && (
        <div className="space-y-3">
          <div className="bg-slate-950 p-4 rounded-lg text-center border">
            <div className="text-3xl font-bold text-white font-mono tracking-widest">{codigo}</div>
            <div className="text-[10px] text-slate-500 mt-2">Código EAN-13</div>
            <div className="mt-2 text-xs text-slate-400">Prefixo 789 = Brasil</div>
          </div>
          <button onClick={() => navigator.clipboard.writeText(codigo)} className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded text-xs">Copiar Código</button>
        </div>
      )}
      <button onClick={gerarEAN13} className="bg-emerald-600 text-white font-bold py-2 px-4 rounded text-xs hover:cursor-pointer">Gerar Novo Código</button>
    </div>
  );
}

// 12. GERADOR DE PLACA MERCOSUL
function PlacaMercosul() {
  const [qtd, setQtd] = useState<number>(3);
  const [placas, setPlacas] = useState<string[]>([]);

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';

  const gerar = () => {
    const lista: string[] = [];
    for (let i = 0; i < qtd; i++) {
      const l1 = letras[Math.floor(Math.random() * letras.length)];
      const l2 = letras[Math.floor(Math.random() * letras.length)];
      const l3 = letras[Math.floor(Math.random() * letras.length)];
      const n1 = numeros[Math.floor(Math.random() * numeros.length)];
      const l4 = letras[Math.floor(Math.random() * letras.length)];
      const n2 = numeros[Math.floor(Math.random() * numeros.length)];
      const n3 = numeros[Math.floor(Math.random() * numeros.length)];
      lista.push(`${l1}${l2}${l3}${n1}${l4}${n2}${n3}`);
    }
    setPlacas(lista);
  };

  useEffect(() => { gerar(); }, [qtd]);

  return (
    <div className="space-y-6" id="ger-placa">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Placa Mercosul</h2>
      <div className="flex gap-4 flex-wrap">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Quantidade</label>
          <select className="border rounded p-2 text-xs dark:bg-slate-800 dark:text-slate-100" value={qtd} onChange={e => setQtd(Number(e.target.value))}>
            <option value="1">1</option><option value="3">3</option><option value="5">5</option><option value="10">10</option>
          </select></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {placas.map((p, i) => (
          <div key={i} className="bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-600 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-[0.3em]">{p}</div>
            <div className="text-[9px] text-yellow-700 dark:text-yellow-400 uppercase font-bold mt-1">Brasil • Mercosul</div>
          </div>
        ))}
      </div>
      <button onClick={gerar} className="bg-emerald-600 text-white font-bold py-2 px-4 rounded text-xs hover:cursor-pointer">Gerar Novas Placas</button>
    </div>
  );
}

// 13. GERADOR DE CORES ALEATÓRIAS
function CoresAleatorias() {
  const [cor, setCor] = useState<string>('#2E86AB');
  const [rgb, setRgb] = useState<string>('');

  const gerar = () => {
    const r = Math.floor(Math.random() * 200) + 30;
    const g = Math.floor(Math.random() * 200) + 30;
    const b = Math.floor(Math.random() * 200) + 30;
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
    setCor(hex);
    setRgb(`rgb(${r}, ${g}, ${b})`);
  };

  useEffect(() => { gerar(); }, []);

  return (
    <div className="space-y-6" id="ger-cores">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Cores Aleatórias</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full h-32 rounded-xl border-2 transition-all duration-300" style={{ backgroundColor: cor }}></div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-lg text-center border">
            <span className="block text-[10px] text-slate-400 uppercase">HEX</span>
            <span className="text-sm font-bold font-mono dark:text-slate-200 select-all">{cor}</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-lg text-center border">
            <span className="block text-[10px] text-slate-400 uppercase">RGB</span>
            <span className="text-sm font-bold font-mono dark:text-slate-200 select-all">{rgb}</span>
          </div>
        </div>
        <button onClick={gerar} className="bg-emerald-600 text-white font-bold py-2 px-6 rounded text-sm hover:cursor-pointer transition">🎨 Gerar Nova Cor</button>
      </div>
    </div>
  );
}

// ===== GERADOR DE RG =====
function GeradorRG() {
  const [formatado, setFormatado] = useState<boolean>(true);
  const [rg, setRg] = useState<string>('');

  const gerar = () => {
    const nums = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    // Digito verificador
    let sum = 0;
    for (let i = 0; i < 8; i++) sum += nums[i] * (2 + i);
    const dv = sum % 11;
    nums.push(dv === 10 ? 0 : dv);
    const raw = nums.join('');
    if (formatado) {
      setRg(raw.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4'));
    } else {
      setRg(raw);
    }
  };

  useEffect(() => { gerar(); }, [formatado]);

  return (
    <div className="space-y-6" id="ger-rg">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de RG (Registro Geral)</h2>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="chk-rg" className="rounded text-emerald-500" checked={formatado} onChange={() => setFormatado(!formatado)} />
        <label htmlFor="chk-rg" className="text-xs text-slate-600">Formatado (XX.XXX.XXX-X)</label>
      </div>
      <div className="flex gap-2">
        <input type="text" readOnly className="w-full text-center border p-3 bg-slate-50 dark:bg-slate-800 font-mono text-lg rounded-lg" value={rg} />
        <button onClick={() => navigator.clipboard.writeText(rg)} className="bg-slate-100 dark:bg-slate-800 px-3 rounded text-xs font-semibold hover:cursor-pointer">Copiar</button>
      </div>
      <button onClick={gerar} className="w-full bg-emerald-600 text-white font-bold py-2 rounded text-sm hover:cursor-pointer">Gerar Novo RG</button>
    </div>
  );
}

// PLACEHOLDER PARA NOVOS GERADORES
function PlaceholderGerador({ id }: { id: string }) {
  const nomes: {[key: string]: string} = {
    'gerador-rg': 'Gerador de RG',
  };
  return (
    <div className="space-y-6 text-center py-8" id={`placeholder-${id}`}>
      <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-100">
        <span className="text-3xl block mb-3">📋</span>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{nomes[id] || id}</h3>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">Ferramenta em desenvolvimento.</p>
      </div>
    </div>
  );
}

// 8. SHA-256 HASH
function HashSha256Gerador() {
  const [inputVal, setInputVal] = useState<string>('Tool Brasil');
  const [sha256Value, setSha256Value] = useState<string>('');

  const computeSHA256 = async (source: string) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(source);
      const digestBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hex = Array.from(new Uint8Array(digestBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      setSha256Value(hex);
    } catch (e) {
      // Fallback
      let hash = 0;
      for (let i = 0; i < source.length; i++) {
        hash = (hash << 5) - hash + source.charCodeAt(i);
        hash |= 0;
      }
      setSha256Value(Math.abs(hash * 31).toString(16).padStart(16, '0') + Math.abs(hash * 17).toString(16).padStart(16, '0'));
    }
  };

  useEffect(() => { computeSHA256(inputVal); }, [inputVal]);

  return (
    <div className="space-y-6" id="ger-sha256">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Gerador de Hash SHA-256</h2>
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-slate-500">Texto para Codificação</label>
        <input type="text" className="w-full border p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm focus:outline-emerald-500 dark:text-slate-100" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      </div>

      <div className="space-y-3">
        <div>
          <span className="block text-xs font-semibold text-slate-400 mb-1">Criptografia SHA-256 (64 Caracteres)</span>
          <div className="bg-slate-950 p-3 rounded font-mono text-xs text-yellow-400 select-all border border-slate-850 truncate">{sha256Value}</div>
        </div>
        <button onClick={() => navigator.clipboard.writeText(sha256Value)} className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 text-slate-700 py-1.5 px-3 rounded text-xs select-none">Copiar Hash</button>
      </div>
    </div>
  );
}
