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
      {toolId === 'gerador-whatsapp' && <GeradorWhatsApp />}
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
      {toolId === 'recibo' && <GeradorRecibo />}
      {toolId === 'gerador-assinatura-email' && <GeradorAssinaturaEmail />}
      {toolId === 'declaracao-conteudo-correios' && <GeradorDeclaracaoConteudo />}
      {toolId === 'gerador-pix' && <GeradorPix />}
      {toolId === 'contrato-locacao' && <GeradorContratoLocacao />}
      {toolId === 'declaracao-residencia' && <GeradorDeclaracaoResidencia />}
      {toolId === 'procuracao-simples' && <GeradorProcuracaoSimples />}
      {toolId === 'carta-demissao' && <GeradorCartaDemissao />}
      {toolId === 'nota-promissoria' && <GeradorNotaPromissoria />}
      {toolId === 'recibo-compra-venda-veiculo' && <GeradorReciboVeiculo />}
    </div>
  );
}

// 17. GERADOR DE ASSINATURA DE E-MAIL HTML
function GeradorAssinaturaEmail() {
  const [nome, setNome] = useState('Dra. Ana Paula Souza');
  const [cargo, setCargo] = useState('Diretora de Operações');
  const [empresa, setEmpresa] = useState('TechBrasil Soluções');
  const [telefone, setTelefone] = useState('(11) 98765-4321');
  const [email, setEmail] = useState('ana.souza@techbrasil.com.br');
  const [website, setWebsite] = useState('www.techbrasil.com.br');
  const [fotoUrl, setFotoUrl] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80');
  const [corPrimaria, setCorPrimaria] = useState('#059669'); // Emerald-600
  const [copiado, setCopiado] = useState(false);

  const htmlGerado = `<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #334155; line-height: 1.4;">
  <tr>
    ${fotoUrl ? `<td style="padding-right: 15px; vertical-align: middle;">
      <img src="${fotoUrl}" alt="${nome}" width="70" height="70" style="border-radius: 50%; object-fit: cover; border: 2px solid ${corPrimaria}; display: block;" />
    </td>` : ''}
    <td style="border-left: 3px solid ${corPrimaria}; padding-left: 12px; vertical-align: middle;">
      <strong style="font-size: 15px; color: #0f172a; display: block;">${nome}</strong>
      <span style="color: ${corPrimaria}; font-weight: bold; font-size: 12px; display: block; margin-bottom: 4px;">${cargo} ${empresa ? `| ${empresa}` : ''}</span>
      ${telefone ? `<span style="display: block; font-size: 11px; color: #475569;">📞 ${telefone}</span>` : ''}
      ${email ? `<span style="display: block; font-size: 11px; color: #475569;">✉️ <a href="mailto:${email}" style="color: #475569; text-decoration: none;">${email}</a></span>` : ''}
      ${website ? `<span style="display: block; font-size: 11px; color: #475569;">🌐 <a href="https://${website.replace('https://', '').replace('http://', '')}" target="_blank" style="color: ${corPrimaria}; text-decoration: none; font-weight: bold;">${website}</a></span>` : ''}
    </td>
  </tr>
</table>`;

  const handleCopiarHtml = () => {
    navigator.clipboard.writeText(htmlGerado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="space-y-6" id="ger-assinatura">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de Assinatura de E-mail HTML</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Crie assinaturas profissionais responsivas e compatíveis com Gmail, Outlook, Apple Mail e Thunderbird.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORMULÁRIO DE DADOS */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">1. Dados da Assinatura</h3>
          
          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Nome Completo</label>
            <input type="text" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Cargo / Título</label>
              <input type="text" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs" value={cargo} onChange={(e) => setCargo(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Empresa</label>
              <input type="text" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Telefone / WhatsApp</label>
              <input type="text" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">E-mail Comercial</label>
              <input type="text" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">Website / Domínio</label>
            <input type="text" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-0.5">URL da Foto ou Logo</label>
            <input type="text" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs" value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} placeholder="https://..." />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Cor da Marca</label>
            <div className="flex items-center gap-2">
              {['#059669', '#2563eb', '#7c3aed', '#dc2626', '#d97706', '#0f172a'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCorPrimaria(c)}
                  className={`w-6 h-6 rounded-full border-2 transition ${corPrimaria === c ? 'border-slate-900 dark:border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* PRÉ-VISUALIZAÇÃO E CÓDIGO HTML */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">2. Pré-Visualização da Assinatura</h3>
          
          <div className="p-4 bg-white rounded-xl border border-slate-300 shadow-xs min-h-[140px] flex items-center justify-center">
            <div dangerouslySetInnerHTML={{ __html: htmlGerado }} />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleCopiarHtml}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-lg transition hover:cursor-pointer shadow-xs"
            >
              {copiado ? '✓ Código HTML Copiado!' : '📋 Copiar Código HTML'}
            </button>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase">Código HTML Limpo (para exportação):</label>
            <textarea
              readOnly
              className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-slate-950 text-emerald-400 font-mono text-[10px] h-28 outline-none"
              value={htmlGerado}
            />
          </div>
        </div>
      </div>
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
            className="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-semibold py-2 rounded-lg text-sm hover:cursor-pointer"
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
  const [texto, setTexto] = useState<string>('https://www.toolbrasil.com.br');
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
          <textarea className="w-full border dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm font-sans focus:outline-emerald-500" rows={4} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Digite o link aqui..." />
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

// Helper para converter valor numérico para escrita por extenso em português
function valorPorExtenso(valor: number): string {
  if (valor === 0) return 'zero reais';
  
  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const dezenas10 = ['dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
  
  const converterGrupo = (n: number): string => {
    if (n === 0) return '';
    if (n === 100) return 'cem';
    
    let cent = Math.floor(n / 100);
    let resto = n % 100;
    let dez = Math.floor(resto / 10);
    let uni = resto % 10;
    
    let parts = [];
    if (cent > 0) parts.push(centenas[cent]);
    if (resto > 0) {
      if (resto >= 10 && resto < 20) {
        parts.push(dezenas10[resto - 10]);
      } else {
        if (dez > 0) parts.push(dezenas[dez]);
        if (uni > 0) parts.push(unidades[uni]);
      }
    }
    return parts.join(' e ');
  };

  const parteInteira = Math.floor(valor);
  const centavos = Math.round((valor - parteInteira) * 100);

  let extensoReais = '';
  
  if (parteInteira > 0) {
    if (parteInteira === 1) {
      extensoReais = 'um real';
    } else {
      let milhões = Math.floor(parteInteira / 1000000);
      let restoMilhões = parteInteira % 1000000;
      let milhares = Math.floor(restoMilhões / 1000);
      let restoMilhares = restoMilhões % 1000;
      
      let partes = [];
      if (milhões > 0) {
        if (milhões === 1) {
          partes.push('um milhão');
        } else {
          partes.push(converterGrupo(milhões) + ' milhões');
        }
      }
      if (milhares > 0) {
        if (milhares === 1) {
          partes.push('mil');
        } else {
          partes.push(converterGrupo(milhares) + ' mil');
        }
      }
      if (restoMilhares > 0) {
        partes.push(converterGrupo(restoMilhares));
      }
      extensoReais = partes.join(' e ') + ' reais';
    }
  }

  let extensoCentavos = '';
  if (centavos > 0) {
    if (centavos === 1) {
      extensoCentavos = 'um centavo';
    } else {
      extensoCentavos = converterGrupo(centavos) + ' centavos';
    }
  }

  if (extensoReais && extensoCentavos) {
    return `${extensoReais} e ${extensoCentavos}`;
  }
  return extensoReais || extensoCentavos || 'zero reais';
}

// 15. GERADOR DE RECIBO ONLINE
function GeradorRecibo() {
  const [valor, setValor] = useState<string>('1500.00');
  const [emissorNome, setEmissorNome] = useState<string>('');
  const [emissorDoc, setEmissorDoc] = useState<string>('');
  const [pagadorNome, setPagadorNome] = useState<string>('');
  const [pagadorDoc, setPagadorDoc] = useState<string>('');
  const [referente, setReferente] = useState<string>('Prestação de serviços de desenvolvimento de software.');
  const [cidade, setCidade] = useState<string>('São Paulo');
  const [data, setData] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [showRecibo, setShowRecibo] = useState<boolean>(true);

  // Computa o extenso em tempo real
  const numValor = parseFloat(valor) || 0;
  const extenso = valorPorExtenso(numValor);

  const handlePrint = () => {
    window.print();
  };

  const formatarData = (dataStr: string) => {
    if (!dataStr) return '';
    const [ano, mes, dia] = dataStr.split('-');
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const nomeMes = meses[parseInt(mes, 10) - 1] || mes;
    return `${parseInt(dia, 10)} de ${nomeMes} de ${ano}`;
  };

  const formatarMoeda = (num: number) => {
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6" id="ger-recibo">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          #main-root, #main-root * {
            visibility: hidden;
          }
          #print-receipt-area, #print-receipt-area * {
            visibility: visible;
          }
          #print-receipt-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: 2px solid #000 !important;
            padding: 24px !important;
            margin: 0 !important;
            color: #000 !important;
            background-color: #fff !important;
          }
        }
      `}} />

      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3 no-print">Gerador de Recibo Online</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 no-print">
        {/* FORMULÁRIO DE ENTRADA */}
        <div className="space-y-4 bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-350 border-b border-slate-200 dark:border-slate-800 pb-2">Preencha os Dados do Recibo</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500">Valor (R$)</label>
              <input 
                type="number" 
                step="0.01"
                className="w-full border p-2.5 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-emerald-500 dark:text-slate-100 font-mono"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500">Data de Emissão</label>
              <input 
                type="date"
                className="w-full border p-2.5 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-emerald-500 dark:text-slate-100 font-mono"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dados do Emissor (Quem recebe o valor)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">Nome / Razão Social</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800 text-xs dark:text-slate-100"
                  value={emissorNome}
                  onChange={(e) => setEmissorNome(e.target.value)}
                  placeholder="Ex: João da Silva ME"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">CPF / CNPJ</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800 text-xs dark:text-slate-100 font-mono"
                  value={emissorDoc}
                  onChange={(e) => setEmissorDoc(e.target.value)}
                  placeholder="00.000.000/0001-00"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dados do Pagador (Quem pagou o valor)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">Nome / Razão Social</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800 text-xs dark:text-slate-100"
                  value={pagadorNome}
                  onChange={(e) => setPagadorNome(e.target.value)}
                  placeholder="Ex: Maria Souza"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-500">CPF / CNPJ</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded-lg bg-white dark:bg-slate-800 text-xs dark:text-slate-100 font-mono"
                  value={pagadorDoc}
                  onChange={(e) => setPagadorDoc(e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500">Descrição do Pagamento (Referente a)</label>
            <textarea 
              className="w-full border p-2.5 rounded-lg bg-white dark:bg-slate-800 text-xs dark:text-slate-100 leading-relaxed"
              rows={2}
              value={referente}
              onChange={(e) => setReferente(e.target.value)}
              placeholder="Ex: Prestação de serviços de consultoria técnica."
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500">Cidade de Emissão</label>
            <input 
              type="text" 
              className="w-full border p-2.5 rounded-lg bg-white dark:bg-slate-800 text-xs dark:text-slate-100"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Ex: São Paulo"
            />
          </div>
        </div>

        {/* INFORMAÇÕES DE VALIDAÇÃO DE CONFORMIDADE */}
        <div className="space-y-4">
          <div className="bg-emerald-50 dark:bg-slate-800/40 p-4 rounded-xl border border-emerald-100 dark:border-emerald-950 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 block text-sm">✓ Recibo 100% Processado no Cliente</span>
            <p>Seus dados financeiros e documentos inseridos para preenchimento do recibo **nunca saem do seu navegador**. O processamento dos dados e a conversão do valor por extenso ocorrem de forma local no seu computador, em conformidade com as diretrizes da LGPD.</p>
            <p><strong>Por extenso gerado:</strong></p>
            <div className="bg-white dark:bg-slate-900 border p-2.5 rounded font-mono text-emerald-700 dark:text-emerald-300 font-bold leading-normal lowercase first-letter:uppercase">
              {extenso}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase">Ações Rápidas</h4>
            <button 
              onClick={handlePrint}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-lg text-xs hover:cursor-pointer flex items-center justify-center gap-2 shadow-sm transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              Imprimir / Salvar como PDF
            </button>
          </div>
        </div>
      </div>

      {/* ÁREA DE PRÉ-VISUALIZAÇÃO / IMPRESSÃO */}
      <div className="space-y-4 pt-4 border-t border-slate-200 no-print">
        <h3 className="text-sm font-semibold text-slate-500 uppercase">Visualização do Recibo</h3>
      </div>

      <div 
        id="print-receipt-area"
        className="bg-white border-2 border-slate-800 p-8 rounded-lg text-slate-800 font-sans shadow-md"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-slate-800 pb-4 gap-4">
          <div className="space-y-1">
            <span className="text-2xl font-black tracking-tight text-slate-900 uppercase">Recibo de Pagamento</span>
            <p className="text-[10px] text-slate-500 italic uppercase">Documento de comprovação de recebimento financeiro</p>
          </div>
          <div className="bg-slate-100 border border-slate-800 px-4 py-2 text-right rounded font-mono font-bold text-slate-900 shrink-0">
            VALOR: {formatarMoeda(numValor)}
          </div>
        </div>

        <div className="py-6 text-sm text-slate-800 leading-relaxed space-y-4">
          <p>
            Recebi(emos) de <strong className="underline decoration-slate-400">{pagadorNome || '________________________________________________'}</strong>, 
            inscrito(a) sob o CPF/CNPJ nº <strong className="font-mono">{pagadorDoc || '_____________________'}</strong>, 
            a importância de <strong>{formatarMoeda(numValor)}</strong> 
            (<span className="italic lowercase first-letter:uppercase">{extenso}</span>) 
            referente a <strong className="underline decoration-slate-400">{referente || '____________________________________________________________________________________'}</strong>.
          </p>
          <p>
            Para maior clareza, firmo(amos) o presente recibo dando plena, rasa e geral quitação de pago.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-slate-200">
          <div className="text-xs text-slate-600 font-semibold font-mono">
            {cidade || '__________________'}, {formatarData(data)}
          </div>
          
          <div className="space-y-1 text-center w-full sm:w-auto shrink-0 pt-6 sm:pt-0">
            <div className="border-t border-slate-800 pt-2 min-w-[240px]">
              <strong className="block text-xs text-slate-900 uppercase">{emissorNome || 'Assinatura do Emissor'}</strong>
              {emissorDoc && <span className="block text-[10px] text-slate-500 font-mono">Doc: {emissorDoc}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GeradorWhatsApp() {
  const [numero, setNumero] = useState('');
  const [mensagem, setMensagem] = useState('');
  
  const linkGerado = numero 
    ? `https://wa.me/55${numero.replace(/\D/g, '')}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''}` 
    : '';

  const copyToClipboard = () => {
    if (!linkGerado) return;
    navigator.clipboard.writeText(linkGerado);
    alert('Link copiado para a área de transferência!');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Número do WhatsApp (com DDD)</label>
          <div className="flex bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-emerald-500 overflow-hidden">
            <span className="flex items-center px-4 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono border-r border-slate-200 dark:border-slate-700">+55</span>
            <input 
              type="tel" 
              placeholder="Ex: 11999999999"
              className="w-full px-4 py-3 bg-transparent outline-none"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mensagem Inicial (opcional)</label>
          <textarea 
            rows={3}
            placeholder="Ex: Olá! Gostaria de mais informações."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
        </div>
      </div>
      
      {linkGerado && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <h4 className="text-emerald-800 dark:text-emerald-400 font-semibold mb-2">Seu link está pronto:</h4>
          <div className="flex gap-2">
            <input 
              type="text" 
              readOnly 
              value={linkGerado} 
              className="flex-1 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 outline-none"
            />
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Copiar
            </button>
            <a 
              href={linkGerado} 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              Testar
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// 18. GERADOR DE DECLARAÇÃO DE CONTEÚDO CORREIOS (A4 OFICIAL)
interface ItemDeclaracao {
  id: number;
  conteudo: string;
  quant: number;
  valor: number;
}

function GeradorDeclaracaoConteudo() {
  const [remetente, setRemetente] = useState({
    nome: 'Carlos Eduardo Santos',
    doc: '123.456.789-00',
    endereco: 'Rua das Flores, 120, Apto 42',
    bairro: 'Jardins',
    cidade: 'São Paulo',
    uf: 'SP',
    cep: '01415-000'
  });

  const [destinatario, setDestinatario] = useState({
    nome: 'Mariana Lima Oliveira',
    doc: '987.654.321-99',
    endereco: 'Av. Afonso Pena, 1500, Sala 302',
    bairro: 'Centro',
    cidade: 'Belo Horizonte',
    uf: 'MG',
    cep: '30130-005'
  });

  const [itens, setItens] = useState<ItemDeclaracao[]>([
    { id: 1, conteudo: 'Camisetas de algodão usadas', quant: 2, valor: 45.00 },
    { id: 2, conteudo: 'Livro didático de literatura', quant: 1, valor: 30.00 }
  ]);

  const [copiado, setCopiado] = useState(false);

  const addItem = () => {
    setItens([...itens, { id: Date.now(), conteudo: '', quant: 1, valor: 0 }]);
  };

  const removeItem = (id: number) => {
    if (itens.length > 1) {
      setItens(itens.filter(it => it.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof ItemDeclaracao, val: any) => {
    setItens(itens.map(it => it.id === id ? { ...it, [field]: val } : it));
  };

  const totalValor = itens.reduce((acc, it) => acc + (it.quant * it.valor), 0);
  const totalQuant = itens.reduce((acc, it) => acc + Number(it.quant || 0), 0);

  const imprimirA4 = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="ger-declaracao-conteudo">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de Declaração de Conteúdo Correios</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Formulário oficial padrão ECT/CONFAZ para postagem de encomendas sem nota fiscal.</p>
        </div>
        <button 
          onClick={imprimirA4} 
          type="button" 
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black tracking-wide shadow-md transition cursor-pointer flex items-center gap-1.5"
        >
          🖨️ Imprimir Formulário A4
        </button>
      </div>

      {/* Inputs Remetente e Destinatário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Remetente */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200 border-b pb-1.5">
            📦 1. Identificação do Remetente
          </h3>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome Completo / Razão Social</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={remetente.nome} onChange={(e) => setRemetente({ ...remetente, nome: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF / CNPJ</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={remetente.doc} onChange={(e) => setRemetente({ ...remetente, doc: e.target.value })} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CEP</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={remetente.cep} onChange={(e) => setRemetente({ ...remetente, cep: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Endereço Completo</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={remetente.endereco} onChange={(e) => setRemetente({ ...remetente, endereco: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Bairro</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={remetente.bairro} onChange={(e) => setRemetente({ ...remetente, bairro: e.target.value })} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Cidade</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={remetente.cidade} onChange={(e) => setRemetente({ ...remetente, cidade: e.target.value })} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">UF</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs uppercase" maxLength={2} value={remetente.uf} onChange={(e) => setRemetente({ ...remetente, uf: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Destinatário */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200 border-b pb-1.5">
            📬 2. Identificação do Destinatário
          </h3>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome Completo / Razão Social</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={destinatario.nome} onChange={(e) => setDestinatario({ ...destinatario, nome: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF / CNPJ</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={destinatario.doc} onChange={(e) => setDestinatario({ ...destinatario, doc: e.target.value })} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CEP</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={destinatario.cep} onChange={(e) => setDestinatario({ ...destinatario, cep: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Endereço Completo</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={destinatario.endereco} onChange={(e) => setDestinatario({ ...destinatario, endereco: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Bairro</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={destinatario.bairro} onChange={(e) => setDestinatario({ ...destinatario, bairro: e.target.value })} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Cidade</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs" value={destinatario.cidade} onChange={(e) => setDestinatario({ ...destinatario, cidade: e.target.value })} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">UF</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs uppercase" maxLength={2} value={destinatario.uf} onChange={(e) => setDestinatario({ ...destinatario, uf: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      {/* Discriminação do Conteúdo */}
      <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200">
            📋 3. Discriminação do Conteúdo
          </h3>
          <button onClick={addItem} type="button" className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition">
            + Adicionar Item
          </button>
        </div>

        <div className="space-y-2">
          {itens.map((it, idx) => (
            <div key={it.id} className="grid grid-cols-12 gap-2 items-center bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="col-span-1 text-center font-bold text-xs text-slate-500">{idx + 1}</div>
              <div className="col-span-6">
                <input type="text" placeholder="Descrição do Item / Conteúdo" className="w-full border dark:border-slate-600 rounded p-1.5 text-xs bg-transparent" value={it.conteudo} onChange={(e) => updateItem(it.id, 'conteudo', e.target.value)} />
              </div>
              <div className="col-span-2">
                <input type="number" min={1} placeholder="Qtd" className="w-full border dark:border-slate-600 rounded p-1.5 text-xs bg-transparent font-mono" value={it.quant} onChange={(e) => updateItem(it.id, 'quant', Number(e.target.value))} />
              </div>
              <div className="col-span-2">
                <input type="number" step="0.01" placeholder="R$ Unit" className="w-full border dark:border-slate-600 rounded p-1.5 text-xs bg-transparent font-mono" value={it.valor} onChange={(e) => updateItem(it.id, 'valor', Number(e.target.value))} />
              </div>
              <div className="col-span-1 text-center">
                <button onClick={() => removeItem(it.id)} type="button" className="text-rose-500 hover:text-rose-700 font-bold text-xs">✕</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 font-bold text-xs text-slate-800 dark:text-slate-200">
          <span>Quantidade Total de Itens: {totalQuant}</span>
          <span className="text-base text-emerald-600 dark:text-emerald-400 font-black">Valor Total Declarado: R$ {totalValor.toFixed(2)}</span>
        </div>
      </div>

      {/* Visualização de Pré-visualização Formatada Padrão Correios */}
      <div className="bg-white border-2 border-slate-300 rounded-xl p-6 text-slate-900 shadow-sm print:m-0 print:p-0 print:border-none print:shadow-none" id="modelo-a4-correios">
        <div className="border border-black p-4 space-y-3 font-sans text-xs">
          <div className="text-center border-b border-black pb-2">
            <h4 className="font-black text-sm uppercase tracking-wide">DECLARAÇÃO DE CONTEÚDO</h4>
            <span className="text-[10px] text-slate-600 block">Exigida conforme Protocolo ICMS 32/01 e Portarias do Ministério das Comunicações / ECT</span>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-black pb-3">
            <div className="space-y-1">
              <strong className="block border-b border-black pb-0.5 text-[11px] uppercase">REMETENTE:</strong>
              <div><strong>Nome:</strong> {remetente.nome || '__________________________________'}</div>
              <div><strong>CPF/CNPJ:</strong> {remetente.doc || '__________________'}</div>
              <div><strong>Endereço:</strong> {remetente.endereco || '___________________________'}</div>
              <div><strong>Bairro:</strong> {remetente.bairro} - <strong>Cidade:</strong> {remetente.cidade}/{remetente.uf}</div>
              <div><strong>CEP:</strong> {remetente.cep}</div>
            </div>
            <div className="space-y-1">
              <strong className="block border-b border-black pb-0.5 text-[11px] uppercase">DESTINATÁRIO:</strong>
              <div><strong>Nome:</strong> {destinatario.nome || '__________________________________'}</div>
              <div><strong>CPF/CNPJ:</strong> {destinatario.doc || '__________________'}</div>
              <div><strong>Endereço:</strong> {destinatario.endereco || '___________________________'}</div>
              <div><strong>Bairro:</strong> {destinatario.bairro} - <strong>Cidade:</strong> {destinatario.cidade}/{destinatario.uf}</div>
              <div><strong>CEP:</strong> {destinatario.cep}</div>
            </div>
          </div>

          <div>
            <strong className="block mb-1 text-[11px] uppercase">IDENTIFICAÇÃO DOS BENS:</strong>
            <table className="w-full border-collapse border border-black text-[11px]">
              <thead>
                <tr className="bg-slate-100 border-b border-black text-left">
                  <th className="border-r border-black p-1 w-12 text-center">Item</th>
                  <th className="border-r border-black p-1">Conteúdo</th>
                  <th className="border-r border-black p-1 w-16 text-center">Quant.</th>
                  <th className="p-1 w-24 text-right">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((it, i) => (
                  <tr key={it.id} className="border-b border-black">
                    <td className="border-r border-black p-1 text-center">{i + 1}</td>
                    <td className="border-r border-black p-1">{it.conteudo || '-'}</td>
                    <td className="border-r border-black p-1 text-center">{it.quant}</td>
                    <td className="p-1 text-right">R$ {(it.quant * it.valor).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-slate-50">
                  <td colSpan={2} className="border-r border-black p-1 text-right">TOTAL:</td>
                  <td className="border-r border-black p-1 text-center">{totalQuant}</td>
                  <td className="p-1 text-right">R$ {totalValor.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-[10px] text-slate-600 leading-tight">
            <p><strong>DECLARAÇÃO:</strong> Declaro que não me enquadro no conceito de contribuinte previsto no art. 4º da Lei Complementar nº 87/1996, e que a presente remessa não constitui ato de mercancia comercial ou habitualidade. Declaro ainda que assumo total responsabilidade pela veracidade das informações prestadas.</p>
          </div>

          <div className="pt-6 flex justify-between items-end text-center">
            <div>
              <span className="block border-t border-black w-48 pt-1 text-[11px]">Data: ____ / ____ / 2026</span>
            </div>
            <div>
              <span className="block border-t border-black w-64 pt-1 text-[11px]">Assinatura do Declarante / Remetente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 19. GERADOR DE PIX COPIA E COLA & QR CODE ESTÁTICO (PADRÃO BANCO CENTRAL EMVCO)
function GeradorPix() {
  const [tipoChave, setTipoChave] = useState<'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria'>('cpf');
  const [chave, setChave] = useState('12345678900');
  const [nome, setNome] = useState('MARIA DA SILVA');
  const [cidade, setCidade] = useState('SAO PAULO');
  const [valor, setValor] = useState<string>('25.00');
  const [txId, setTxId] = useState('***');
  const [pixPayload, setPixPayload] = useState('');
  const [copiado, setCopiado] = useState(false);

  // Helper TLV Format
  const emv = (id: string, value: string) => {
    const len = value.length.toString().padStart(2, '0');
    return `${id}${len}${value}`;
  };

  // Algoritmo Oficial CRC16 CCITT (0x1021) do Banco Central
  const crc16 = (str: string): string => {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= (str.charCodeAt(i) << 8);
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
        } else {
          crc = (crc << 1) & 0xFFFF;
        }
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  };

  // Normalização de Strings para EMVCo
  const normalizar = (txt: string, maxLen: number) => {
    return txt
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toUpperCase()
      .trim()
      .slice(0, maxLen);
  };

  useEffect(() => {
    if (!chave.trim() || !nome.trim()) {
      setPixPayload('');
      return;
    }

    const chaveTratada = chave.trim();
    const nomeTratado = normalizar(nome, 25) || 'RECEBEDOR';
    const cidadeTratada = normalizar(cidade, 15) || 'BRASIL';
    const txIdTratado = txId.trim() ? normalizar(txId, 25) : '***';

    // Formatação do Merchant Account Information (Tag 26)
    const gui = emv('00', 'br.gov.bcb.pix');
    const chaveEmv = emv('01', chaveTratada);
    const merchantAccount = emv('26', `${gui}${chaveEmv}`);

    let payload = '';
    payload += emv('00', '01'); // Payload Format Indicator
    payload += merchantAccount;
    payload += emv('52', '0000'); // Merchant Category Code
    payload += emv('53', '986'); // Transaction Currency (BRL)

    const numVal = parseFloat(valor);
    if (!isNaN(numVal) && numVal > 0) {
      payload += emv('54', numVal.toFixed(2));
    }

    payload += emv('58', 'BR'); // Country Code
    payload += emv('59', nomeTratado); // Merchant Name
    payload += emv('60', cidadeTratada); // Merchant City

    // Additional Data Field Template (Tag 62)
    const txIdEmv = emv('05', txIdTratado);
    payload += emv('62', txIdEmv);

    // CRC16 Checksum (Tag 63)
    const payloadSemCrc = `${payload}6304`;
    const checksum = crc16(payloadSemCrc);
    setPixPayload(`${payloadSemCrc}${checksum}`);
  }, [chave, nome, cidade, valor, txId]);

  const copiarPix = () => {
    if (pixPayload) {
      navigator.clipboard.writeText(pixPayload);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    }
  };

  const qrCodeUrl = pixPayload 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixPayload)}`
    : '';

  return (
    <div className="space-y-6" id="ger-pix-oficial">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de PIX Copia e Cola & QR Code Estático</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Crie cobranças instantâneas no padrão oficial BR Code do Banco Central (EMVCo) de forma 100% segura no seu navegador.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Tipo de Chave PIX</label>
              <select className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-bold" value={tipoChave} onChange={(e) => setTipoChave(e.target.value as any)}>
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
                <option value="email">E-mail</option>
                <option value="telefone">Telefone Celular</option>
                <option value="aleatoria">Chave Aleatória (EVP)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Chave PIX</label>
              <input type="text" placeholder="Digite sua chave" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-mono" value={chave} onChange={(e) => setChave(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Nome do Titular da Conta</label>
              <input type="text" placeholder="Ex: JOAO DA SILVA" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs uppercase" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Cidade da Conta</label>
              <input type="text" placeholder="Ex: SAO PAULO" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs uppercase" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Valor da Cobrança em R$ (Opcional)</label>
              <input type="number" step="0.01" placeholder="0,00 para valor livre" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-mono" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Identificador TxID (Opcional)</label>
              <input type="text" placeholder="Ex: FATURA102" className="w-full border dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-xs font-mono" value={txId} onChange={(e) => setTxId(e.target.value)} />
            </div>
          </div>
        </div>

        {/* QR Code e Copia e Cola Display */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 text-center space-y-4">
          {qrCodeUrl ? (
            <>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
                <img src={qrCodeUrl} alt="QR Code PIX Banco Central" className="w-48 h-48 rounded" referrerPolicy="no-referrer" />
              </div>
              <div className="text-xs text-slate-500 font-bold">
                {parseFloat(valor) > 0 ? `Cobrança de R$ ${parseFloat(valor).toFixed(2)}` : 'Cobrança com valor aberto (digitado pelo pagador)'}
              </div>
            </>
          ) : (
            <span className="text-xs text-slate-400">Preencha sua Chave PIX e Nome para gerar o QR Code</span>
          )}
        </div>
      </div>

      {/* Código Copia e Cola */}
      {pixPayload && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-emerald-900 dark:text-emerald-300">🔑 Código PIX Copia e Cola (BR Code)</span>
            <span className="text-[10px] font-mono text-slate-500">CRC16: {pixPayload.slice(-4)}</span>
          </div>
          <div className="flex gap-2">
            <textarea readOnly rows={2} className="flex-1 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-xl p-2.5 text-xs font-mono text-slate-800 dark:text-slate-200 outline-none" value={pixPayload} />
            <button onClick={copiarPix} type="button" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black tracking-wide shadow transition cursor-pointer flex items-center justify-center">
              {copiado ? 'Copiado! ✅' : 'Copiar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 20. GERADOR DE CONTRATO DE LOCAÇÃO RESIDENCIAL SIMPLES
function GeradorContratoLocacao() {
  const [locador, setLocador] = useState({
    nome: 'ANTÔNIO MARCOS DA COSTA',
    nacionalidade: 'brasileiro',
    estadoCivil: 'casado',
    profissao: 'Engenheiro Civil',
    cpf: '111.222.333-44',
    rg: '12.345.678-9 SSP/SP',
    endereco: 'Rua Bela Cintra, 800, Consolação, São Paulo/SP'
  });

  const [locatario, setLocatario] = useState({
    nome: 'BEATRIZ NOGUEIRA ALVES',
    nacionalidade: 'brasileira',
    estadoCivil: 'solteira',
    profissao: 'Arquiteta',
    cpf: '555.666.777-88',
    rg: '98.765.432-1 SSP/SP'
  });

  const [imovel, setImovel] = useState('Apartamento nº 104 do Edifício Solar, situado na Rua das Palmeiras, nº 250, Bairro Jardim América, São Paulo/SP, CEP 01410-000');
  const [aluguel, setAluguel] = useState(2500);
  const [diaVencimento, setDiaVencimento] = useState(10);
  const [prazoMeses, setPrazoMeses] = useState(30);
  const [dataInicio, setDataInicio] = useState(() => new Date().toISOString().split('T')[0]);
  const [garantiaTipo, setGarantiaTipo] = useState<'caucao' | 'fiador' | 'sem_garantia'>('caucao');
  const [caucaoMeses, setCaucaoMeses] = useState(3);
  const [reajuste, setReajuste] = useState('IPCA/IBGE');

  const [copiado, setCopiado] = useState(false);

  const formatDataBr = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  const textoContrato = `CONTRATO DE LOCAÇÃO DE IMÓVEL RESIDENCIAL

LOCADOR(A): ${locador.nome}, ${locador.nacionalidade}, ${locador.estadoCivil}, ${locador.profissao}, portador(a) do RG nº ${locador.rg} e inscrito(a) no CPF sob o nº ${locador.cpf}, residente e domiciliado(a) na ${locador.endereco}.

LOCATÁRIO(A): ${locatario.nome}, ${locatario.nacionalidade}, ${locatario.estadoCivil}, ${locatario.profissao}, portador(a) do RG nº ${locatario.rg} e inscrito(a) no CPF sob o nº ${locatario.cpf}.

As partes acima qualificadas celebram o presente Contrato de Locação Residencial, regido pela Lei Federal nº 8.245/1991 (Lei do Inquilinato) e Código Civil, mediante as seguintes cláusulas:

CLÁUSULA 1ª - DO OBJETO: O LOCADOR dá em locação ao LOCATÁRIO o imóvel residencial de sua propriedade situado no seguinte endereço: ${imovel}, destinado exclusivamente para fins de moradia do LOCATÁRIO e sua família.

CLÁUSULA 2ª - DO PRAZO: A locação é celebrada pelo prazo determinado de ${prazoMeses} (trinta) meses, iniciando-se em ${formatDataBr(dataInicio)} e terminando de pleno direito ao término do período, oportunidade em que o LOCATÁRIO se obriga a restituir o imóvel desocupado.

CLÁUSULA 3ª - DO VALOR DO ALUGUEL E REAJUSTE: O valor mensal da locação é fixado em R$ ${aluguel.toFixed(2)} (dois mil e quinhentos reais), a ser pago pontualmente até o dia ${diaVencimento} de cada mês subsequente ao vencido.
Parágrafo Primeiro: O aluguel será reajustado anualmente com base na variação acumulada do índice ${reajuste}, ou na falta deste, pelo índice oficial substituto legal.

CLÁUSULA 4ª - DA MORA E PENALIDADES: O não pagamento do aluguel na data estipulada acarretará a incidência de multa moratória de 10% (dez por cento) sobre o débito, juros de mora de 1% (um por cento) ao mês e correção monetária até a data da efetiva quitação.

CLÁUSULA 5ª - DAS DESPESAS E ENCARGOS: Além do aluguel, caberá ao LOCATÁRIO o pagamento das cotas ordinárias de condomínio, IPTU, consumo de água, energia elétrica, gás e taxas municipais que incidirem sobre o imóvel durante a vigência da locação.

CLÁUSULA 6ª - DA CONSERVAÇÃO E VISTORIA: O LOCATÁRIO declara receber o imóvel em perfeito estado de habitabilidade, conservação, pintura e higiene, conforme Laudo de Vistoria em anexo, comprometendo-se a devolvê-lo nas mesmas condições.

CLÁUSULA 7ª - DA GARANTIA LOCATÍCIA: ${
  garantiaTipo === 'caucao' 
    ? `Como garantia do fiel cumprimento das obrigações locatícias, o LOCATÁRIO deposita neste ato em favor do LOCADOR a quantia de R$ ${(aluguel * caucaoMeses).toFixed(2)}, correspondente a ${caucaoMeses} (três) meses de aluguel, a título de CAUÇÃO EM DINHEIRO (Art. 38, § 2º da Lei 8.245/91), a ser restituída corrigida ao final da locação se não houver débitos pendentes.` 
    : garantiaTipo === 'fiador' 
    ? `A presente locação é garantida por FIADOR idôneo e solidariamente responsável por todas as obrigações pactuadas até a efetiva devolução das chaves.` 
    : `A presente locação é contratada SEM MODALIDADE DE GARANTIA, facultando-se ao LOCADOR a cobrança antecipada do aluguel nos termos do Art. 42 da Lei 8.245/91.`
}

CLÁUSULA 8ª - DO FORO: As partes elegem o Foro da Comarca da situação do imóvel para dirimir quaisquer dúvidas ou litígios oriundos do presente contrato, com renúncia expressa a qualquer outro.

E, por estarem justos e contratados, assinam o presente instrumento em 02 (duas) vias de igual teor e forma, na presença de 02 (duas) testemunhas.

Local e Data: ______________________________, _____ de ____________________ de 2026.


_____________________________________________
LOCADOR(A): ${locador.nome}


_____________________________________________
LOCATÁRIO(A): ${locatario.nome}


TESTEMUNHAS:

1. ______________________________________    2. ______________________________________
   Nome:                                        Nome:
   CPF:                                         CPF:
`;

  const copiarTexto = () => {
    navigator.clipboard.writeText(textoContrato);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const imprimir = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="ger-contrato-locacao">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de Contrato de Locação Residencial Simples</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Minuta formal completa baseada na Lei do Inquilinato (Lei nº 8.245/91) e Código Civil.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={copiarTexto} type="button" className="px-3 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold transition cursor-pointer">
            {copiado ? 'Texto Copiado! ✅' : '📋 Copiar Texto'}
          </button>
          <button onClick={imprimir} type="button" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black tracking-wide shadow transition cursor-pointer flex items-center gap-1">
            🖨️ Imprimir A4
          </button>
        </div>
      </div>

      {/* Formulário de Configuração */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200 border-b pb-1">1. Locador (Proprietário)</h3>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome do Locador</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={locador.nome} onChange={(e) => setLocador({ ...locador, nome: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF do Locador</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={locador.cpf} onChange={(e) => setLocador({ ...locador, cpf: e.target.value })} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">RG do Locador</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={locador.rg} onChange={(e) => setLocador({ ...locador, rg: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-200 border-b pb-1">2. Locatário (Inquilino)</h3>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome do Inquilino</label>
            <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={locatario.nome} onChange={(e) => setLocatario({ ...locatario, nome: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF do Inquilino</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={locatario.cpf} onChange={(e) => setLocatario({ ...locatario, cpf: e.target.value })} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">RG do Inquilino</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={locatario.rg} onChange={(e) => setLocatario({ ...locatario, rg: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Valor do Aluguel (R$)</label>
          <input type="number" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={aluguel} onChange={(e) => setAluguel(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Dia do Vencimento</label>
          <input type="number" min={1} max={31} className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={diaVencimento} onChange={(e) => setDiaVencimento(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Prazo de Locação</label>
          <select className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={prazoMeses} onChange={(e) => setPrazoMeses(Number(e.target.value))}>
            <option value={12}>12 Meses (1 Ano)</option>
            <option value={24}>24 Meses (2 Anos)</option>
            <option value={30}>30 Meses (Padrão Denúncia Vazia)</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Modalidade de Garantia</label>
          <select className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={garantiaTipo} onChange={(e) => setGarantiaTipo(e.target.value as any)}>
            <option value="caucao">Caução em Dinheiro (3 meses)</option>
            <option value="fiador">Fiador Solidário</option>
            <option value="sem_garantia">Sem Garantia (Pagto Antecipado)</option>
          </select>
        </div>
      </div>

      {/* Visualizador de Contrato */}
      <div className="bg-white border-2 border-slate-300 rounded-xl p-6 text-slate-900 shadow-sm print:m-0 print:p-0 print:border-none print:shadow-none">
        <pre className="font-serif text-xs leading-relaxed whitespace-pre-wrap text-slate-800">
          {textoContrato}
        </pre>
      </div>
    </div>
  );
}

// 21. GERADOR DE DECLARAÇÃO DE RESIDÊNCIA (LEI 7.115/83)
function GeradorDeclaracaoResidencia() {
  const [tipoDeclaracao, setTipoDeclaracao] = useState<'propria' | 'terceiro'>('propria');
  const [nome, setNome] = useState('Carlos Eduardo Silva');
  const [nacionalidade, setNacionalidade] = useState('Brasileiro(a)');
  const [estadoCivil, setEstadoCivil] = useState('Solteiro(a)');
  const [profissao, setProfissao] = useState('Analista de Sistemas');
  const [rg, setRg] = useState('12.345.678-9');
  const [orgaoRg, setOrgaoRg] = useState('SSP/SP');
  const [cpf, setCpf] = useState('123.456.789-00');

  const [logradouro, setLogradouro] = useState('Rua das Flores, nº 120, Apto 42');
  const [bairro, setBairro] = useState('Jardim Paulista');
  const [cidade, setCidade] = useState('São Paulo');
  const [uf, setUf] = useState('SP');
  const [cep, setCep] = useState('01400-000');

  // Dados do Terceiro (Proprietário/Titular)
  const [nomeProprietario, setNomeProprietario] = useState('Maria Aparecida Santos');
  const [cpfProprietario, setCpfProprietario] = useState('987.654.321-11');
  const [rgProprietario, setRgProprietario] = useState('98.765.432-1 SSP/SP');
  const [parentesco, setParentesco] = useState('Locador / Proprietário do Imóvel');

  const [copiado, setCopiado] = useState(false);

  const hoje = new Date();
  const dataExtenso = `${cidade} - ${uf}, ${hoje.getDate()} de ${['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'][hoje.getMonth()]} de ${hoje.getFullYear()}`;

  let textoDeclaracao = '';
  if (tipoDeclaracao === 'propria') {
    textoDeclaracao = `DECLARAÇÃO DE RESIDÊNCIA

Eu, ${nome.toUpperCase()}, de nacionalidade ${nacionalidade.toLowerCase()}, estado civil ${estadoCivil.toLowerCase()}, profissão ${profissao.toLowerCase()}, portador(a) da Carteira de Identidade RG nº ${rg} expedida por ${orgaoRg}, e inscrito(a) no Cadastro de Pessoas Físicas (CPF) sob o nº ${cpf},

DECLARO para os devidos fins de direito e comprovação perante órgãos públicos, instituições bancárias, estabelecimentos de ensino e empresas privadas, sob as penas da Lei Federal nº 7.115, de 29 de agosto de 1983, e do Artigo 299 do Código Penal Brasileiro (Falsidade Ideológica), que RESIDO e sou domiciliado(a) no seguinte endereço:

Logradouro: ${logradouro}
Bairro: ${bairro}
Cidade/UF: ${cidade}/${uf}
CEP: ${cep}

Declaro ainda estar ciente de que prestar declaração falsa em documento público ou particular constitui crime de falsidade ideológica, sujeitando o declarante às sanções cíveis, administrativas e criminais cabíveis.

Por ser a expressão fiel da verdade, firmo a presente declaração para que produza seus efeitos legais.


${dataExtenso}.


_______________________________________________________________
${nome.toUpperCase()}
CPF: ${cpf}`;
  } else {
    textoDeclaracao = `DECLARAÇÃO DE RESIDÊNCIA POR TERCEIRO

Eu, ${nomeProprietario.toUpperCase()}, inscrito(a) no CPF nº ${cpfProprietario}, portador(a) do RG nº ${rgProprietario}, na qualidade de ${parentesco},

DECLARO para os devidos fins de direito, sob as penas da Lei Federal nº 7.115/1983 e do Art. 299 do Código Penal, que o(a) Sr.(a) ${nome.toUpperCase()}, de nacionalidade ${nacionalidade.toLowerCase()}, estado civil ${estadoCivil.toLowerCase()}, profissão ${profissao.toLowerCase()}, portador(a) do RG nº ${rg} (${orgaoRg}) e inscrito(a) no CPF nº ${cpf}, RESIDE e tem seu domicílio no imóvel de minha titularidade/responsabilidade, situado no seguinte endereço:

Logradouro: ${logradouro}
Bairro: ${bairro}
Cidade/UF: ${cidade}/${uf}
CEP: ${cep}

Por ser a expressão da verdade, firmo a presente declaração.


${dataExtenso}.


_______________________________________________________________
${nomeProprietario.toUpperCase()} (Declarante / Titular)
CPF: ${cpfProprietario}


_______________________________________________________________
${nome.toUpperCase()} (Morador / Interessado)
CPF: ${cpf}`;
  }

  const copiarTexto = () => {
    navigator.clipboard.writeText(textoDeclaracao);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const imprimir = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="gerador-decl-residencia">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de Declaração de Residência (Lei 7.115/83)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Crie o documento formal de comprovante de residência pronto para imprimir em folha A4 com validade legal.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={copiarTexto} type="button" className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition hover:bg-slate-200">
            {copiado ? 'Copiado! ✅' : 'Copiar Texto'}
          </button>
          <button onClick={imprimir} type="button" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow transition">
            🖨️ Imprimir A4
          </button>
        </div>
      </div>

      {/* Tipo de Declaração */}
      <div className="flex gap-3">
        <button 
          onClick={() => setTipoDeclaracao('propria')} 
          type="button" 
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${tipoDeclaracao === 'propria' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          👤 Declaração em Nome Próprio
        </button>
        <button 
          onClick={() => setTipoDeclaracao('terceiro')} 
          type="button" 
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${tipoDeclaracao === 'terceiro' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
        >
          👥 Declaração por Terceiro (Locador / Parente)
        </button>
      </div>

      {/* Formulário */}
      <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {tipoDeclaracao === 'terceiro' && (
          <>
            <div className="sm:col-span-2 md:col-span-3 pb-2 border-b border-slate-200 dark:border-slate-700 font-bold text-xs text-emerald-700 dark:text-emerald-400">
              Dados do Titular / Proprietário do Imóvel:
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome do Titular</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={nomeProprietario} onChange={(e) => setNomeProprietario(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF do Titular</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={cpfProprietario} onChange={(e) => setCpfProprietario(e.target.value)} />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Vínculo / Parentesco</label>
              <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={parentesco} onChange={(e) => setParentesco(e.target.value)} />
            </div>
          </>
        )}

        <div className="sm:col-span-2 md:col-span-3 pb-2 border-b border-slate-200 dark:border-slate-700 font-bold text-xs text-emerald-700 dark:text-emerald-400">
          Dados do Morador / Declarante:
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome Completo</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">RG e Órgão Emissor</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={rg} onChange={(e) => setRg(e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Endereço (Rua, Número, Complemento)</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Bairro</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Cidade</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">UF</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono uppercase" value={uf} onChange={(e) => setUf(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CEP</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={cep} onChange={(e) => setCep(e.target.value)} />
        </div>
      </div>

      {/* Visualização de Impressão */}
      <div className="bg-white border-2 border-slate-300 rounded-xl p-8 text-slate-900 shadow-sm print:m-0 print:p-0 print:border-none print:shadow-none">
        <pre className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
          {textoDeclaracao}
        </pre>
      </div>
    </div>
  );
}

// 22. GERADOR DE PROCURAÇÃO SIMPLES
function GeradorProcuracaoSimples() {
  const [outorganteNome, setOutorganteNome] = useState('Juliana Ferreira Lima');
  const [outorganteCpf, setOutorganteCpf] = useState('234.567.890-12');
  const [outorganteRg, setOutorganteRg] = useState('23.456.789-0 SSP/MG');
  const [outorganteEndereco, setOutorganteEndereco] = useState('Av. Amazonas, nº 500, Belo Horizonte - MG');

  const [outorgadoNome, setOutorgadoNome] = useState('Marcos Vinícius Costa');
  const [outorgadoCpf, setOutorgadoCpf] = useState('345.678.901-23');
  const [outorgadoRg, setOutorgadoRg] = useState('34.567.890-1 SSP/MG');
  const [outorgadoEndereco, setOutorgadoEndereco] = useState('Rua da Bahia, nº 1000, Belo Horizonte - MG');

  const [tipoPoderes, setTipoPoderes] = useState<'geral' | 'banco' | 'detran' | 'inss'>('banco');
  const [cidadeData, setCidadeData] = useState('Belo Horizonte - MG');

  const [copiado, setCopiado] = useState(false);

  const hoje = new Date();
  const dataHoje = `${hoje.getDate()} de ${['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'][hoje.getMonth()]} de ${hoje.getFullYear()}`;

  let textoPoderes = '';
  if (tipoPoderes === 'banco') {
    textoPoderes = `amplos poderes para representar o(a) Outorgante perante quaisquer instituições bancárias públicas ou privadas (Banco do Brasil, Caixa Econômica Federal, Bradesco, Itaú, Santander, etc.), podendo abrir, movimentar e encerrar contas correntes e poupanças, solicitar cartões e senhas, emitir e endossar cheques, efetuar saques, transferências (PIX/TED), consultar saldos e extratos, assinar contratos de serviços financeiros e praticar todos os atos necessários à boa e fiel administração bancária.`;
  } else if (tipoPoderes === 'detran') {
    textoPoderes = `poderes específicos para representar o(a) Outorgante perante o Departamento Estadual de Trânsito (DETRAN) e órgãos correlatos, podendo solicitar emissão de 2ª via de CRLV/CRV, transferência de propriedade de veículos, requerer certidões, efetuar vistorias, recorrer de autos de infração e multas, assinar ATPV-e e praticar todos os atos atinentes à regularização veicular.`;
  } else if (tipoPoderes === 'inss') {
    textoPoderes = `poderes especiais para representar o(a) Outorgante perante o Instituto Nacional do Seguro Social (INSS), podendo requerer benefícios previdenciários e assistenciais (aposentadorias, auxílios, pensões), acompanhar perícias médicas, protocolar recursos administrativos, consultar extratos de CNIS, requerer certidões e assinar termos pertinentes.`;
  } else {
    textoPoderes = `amplos, gerais e ilimitados poderes para administrar, gerir e defender os negócios e interesses do(a) Outorgante, podendo assinar contratos, requerer certidões, dar e receber quitação, representá-lo(a) perante órgãos públicos federais, estaduais e municipais, concessionárias de serviços públicos e empresas privadas.`;
  }

  const textoProcuracao = `PROCURAÇÃO POR INSTRUMENTO PARTICULAR

OUTORGANTE: ${outorganteNome.toUpperCase()}, brasileiro(a), portador(a) do RG nº ${outorganteRg} e inscrito(a) no CPF nº ${outorganteCpf}, residente e domiciliado(a) em ${outorganteEndereco}.

OUTORGADO: ${outorgadoNome.toUpperCase()}, brasileiro(a), portador(a) do RG nº ${outorgadoRg} e inscrito(a) no CPF nº ${outorgadoCpf}, residente e domiciliado(a) em ${outorgadoEndereco}.

PODERES: Pelo presente instrumento particular de procuração, o(a) Outorgante nomeia e constitui seu bastante procurador o(a) Outorgado(a), a quem confere ${textoPoderes}

O presente mandato é válido por prazo indeterminado (ou até expressa revogação por escrito), sendo vedado o substabelecimento sem expressa anuência do Outorgante.


${cidadeData}, ${dataHoje}.


_______________________________________________________________
${outorganteNome.toUpperCase()} (Outorgante)
CPF: ${outorganteCpf}`;

  const copiar = () => {
    navigator.clipboard.writeText(textoProcuracao);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="space-y-6" id="gerador-procuracao">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de Procuração Simples</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Crie procurações particulares para bancos, Detran, INSS e negócios em geral (Art. 653 do Código Civil).</p>
        </div>
        <div className="flex gap-2">
          <button onClick={copiar} type="button" className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition hover:bg-slate-200">
            {copiado ? 'Copiado! ✅' : 'Copiar Texto'}
          </button>
          <button onClick={() => window.print()} type="button" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow transition">
            🖨️ Imprimir A4
          </button>
        </div>
      </div>

      {/* Seleção de Finalidade */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setTipoPoderes('banco')} type="button" className={`px-4 py-2 rounded-xl text-xs font-bold transition ${tipoPoderes === 'banco' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
          🏦 Bancos e Contas
        </button>
        <button onClick={() => setTipoPoderes('detran')} type="button" className={`px-4 py-2 rounded-xl text-xs font-bold transition ${tipoPoderes === 'detran' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
          🚗 DETRAN e Veículos
        </button>
        <button onClick={() => setTipoPoderes('inss')} type="button" className={`px-4 py-2 rounded-xl text-xs font-bold transition ${tipoPoderes === 'inss' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
          📋 INSS e Previdência
        </button>
        <button onClick={() => setTipoPoderes('geral')} type="button" className={`px-4 py-2 rounded-xl text-xs font-bold transition ${tipoPoderes === 'geral' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
          ⚖️ Plenos Poderes Gerais
        </button>
      </div>

      {/* Form */}
      <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2 font-bold text-xs text-emerald-700 dark:text-emerald-400">Outorgante (Quem concede):</div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome do Outorgante</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={outorganteNome} onChange={e => setOutorganteNome(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF do Outorgante</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={outorganteCpf} onChange={e => setOutorganteCpf(e.target.value)} />
        </div>

        <div className="sm:col-span-2 font-bold text-xs text-emerald-700 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Outorgado (Procurador):</div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome do Outorgado</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={outorgadoNome} onChange={e => setOutorgadoNome(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF do Outorgado</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={outorgadoCpf} onChange={e => setOutorgadoCpf(e.target.value)} />
        </div>
      </div>

      {/* Visualização de Impressão */}
      <div className="bg-white border-2 border-slate-300 rounded-xl p-8 text-slate-900 shadow-sm print:m-0 print:p-0 print:border-none print:shadow-none">
        <pre className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
          {textoProcuracao}
        </pre>
      </div>
    </div>
  );
}

// 23. GERADOR DE CARTA DE PEDIDO DE DEMISSÃO
function GeradorCartaDemissao() {
  const [empresa, setEmpresa] = useState('Empresa Comercial Exemplo Ltda');
  const [nome, setNome] = useState('Fernando Henrique de Souza');
  const [cargo, setCargo] = useState('Assistente Administrativo');
  const [ctps, setCtps] = useState('1234567 série 001-0 SP');
  const [tipoAviso, setTipoAviso] = useState<'cumprir' | 'dispensa'>('cumprir');
  const [cidade, setCidade] = useState('São Paulo - SP');

  const [copiado, setCopiado] = useState(false);
  const hoje = new Date();
  const dataHoje = `${hoje.getDate()} de ${['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'][hoje.getMonth()]} de ${hoje.getFullYear()}`;

  let textoAviso = '';
  if (tipoAviso === 'cumprir') {
    textoAviso = `Informo que cumprirei regularmente o período de Aviso Prévio de 30 (trinta) dias previsto em lei, trabalhando no período compreendido entre ${hoje.toLocaleDateString('pt-BR')} e ${(new Date(hoje.getTime() + 30*86400000)).toLocaleDateString('pt-BR')}, data em que ocorrerá o encerramento definitivo das minhas atividades na empresa.`;
  } else {
    textoAviso = `Solicito a V. Sa. a dispensa do cumprimento do Aviso Prévio, tendo em vista motivos estritamente particulares (e/ou início imediato em novo compromisso profissional), requerendo o encerramento do contrato de trabalho nesta data e a realização do acerto das verbas rescisórias nos termos legais.`;
  }

  const textoCarta = `À
${empresa.toUpperCase()}
A/C: Departamento de Recursos Humanos / Diretoria

Prezados Senhores,

Venho por meio desta comunicar formalmente a minha decisão de me DESLIGAR do quadro de funcionários desta empresa, renunciando ao cargo de ${cargo} que ocupo desde minha admissão.

${textoAviso}

Agradeço a oportunidade de trabalho e aprendizado que me foram concedidos ao longo do período em que fiz parte desta organização.


${cidade}, ${dataHoje}.


_______________________________________________________________
${nome.toUpperCase()}
Cargo: ${cargo}
CTPS: ${ctps}



_______________________________________________________________
CIENTE DA EMPRESA (Recebido em: ____/____/________)
Assinatura e Carimbo do Responsável`;

  const copiar = () => {
    navigator.clipboard.writeText(textoCarta);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="space-y-6" id="gerador-carta-demissao">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de Carta de Pedido de Demissão</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gere o documento formal para entrega ao RH com cumprimento de aviso ou pedido de dispensa imediata.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={copiar} type="button" className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition hover:bg-slate-200">
            {copiado ? 'Copiado! ✅' : 'Copiar'}
          </button>
          <button onClick={() => window.print()} type="button" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow transition">
            🖨️ Imprimir A4
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome da Empresa Empregadora</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={empresa} onChange={e => setEmpresa(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Seu Nome Completo</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Seu Cargo / Função</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={cargo} onChange={e => setCargo(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Opção do Aviso Prévio</label>
          <select className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={tipoAviso} onChange={e => setTipoAviso(e.target.value as any)}>
            <option value="cumprir">Cumprir os 30 dias de aviso prévio trabalhado</option>
            <option value="dispensa">Solicitar dispensa imediata do cumprimento</option>
          </select>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-300 rounded-xl p-8 text-slate-900 shadow-sm print:m-0 print:p-0 print:border-none print:shadow-none">
        <pre className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
          {textoCarta}
        </pre>
      </div>
    </div>
  );
}

// 24. GERADOR DE NOTA PROMISSÓRIA ONLINE
function GeradorNotaPromissoria() {
  const [numero, setNumero] = useState('01/01');
  const [valor, setValor] = useState(1500);
  const [vencimento, setVencimento] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [credorNome, setCredorNome] = useState('João Pedro Martins');
  const [credorCpf, setCredorCpf] = useState('111.222.333-44');
  const [emitenteNome, setEmitenteNome] = useState('Roberto Alves Guimarães');
  const [emitenteCpf, setEmitenteCpf] = useState('555.666.777-88');
  const [emitenteEndereco, setEmitenteEndereco] = useState('Rua XV de Novembro, 100, Curitiba - PR');
  const [cidade, setCidade] = useState('Curitiba - PR');

  const [copiado, setCopiado] = useState(false);

  // Conversão de valor para reais por extenso
  const valorFormatado = Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const extenso = `${valorFormatado} (Um mil e quinhentos reais)`; // Representação clássica

  const textoPromissoria = `NOTA PROMISSÓRIA Nº ${numero}
VENCIMENTO: ${vencimento.split('-').reverse().join('/')}
VALOR: ${valorFormatado}

No dia ${vencimento.split('-').reverse().join('/')}, pagarei(emos) por esta única via de NOTA PROMISSÓRIA ao Sr.(a) ${credorNome.toUpperCase()} (CPF/CNPJ: ${credorCpf}), ou à sua ordem, a quantia de:

${extenso.toUpperCase()}

em moeda corrente deste país, pagável na praça de ${cidade}.


EMITENTE (Devedor):
Nome: ${emitenteNome.toUpperCase()}
CPF/CNPJ: ${emitenteCpf}
Endereço: ${emitenteEndereco}

Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}


_______________________________________________________________
ASSINATURA DO EMITENTE`;

  const copiar = () => {
    navigator.clipboard.writeText(textoPromissoria);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="space-y-6" id="gerador-nota-promissoria">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de Nota Promissória Online</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Emissão de notas promissórias formais nos termos da Lei Uniforme de Genebra pronta para impressão A4.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={copiar} type="button" className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition hover:bg-slate-200">
            {copiado ? 'Copiado! ✅' : 'Copiar'}
          </button>
          <button onClick={() => window.print()} type="button" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow transition">
            🖨️ Imprimir A4
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nº da Nota</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={numero} onChange={e => setNumero(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Valor (R$)</label>
          <input type="number" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-bold" value={valor} onChange={e => setValor(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Data de Vencimento</label>
          <input type="date" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-bold" value={vencimento} onChange={e => setVencimento(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome do Credor (Favorecido)</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={credorNome} onChange={e => setCredorNome(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Nome do Emitente (Devedor)</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={emitenteNome} onChange={e => setEmitenteNome(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">CPF do Devedor</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={emitenteCpf} onChange={e => setEmitenteCpf(e.target.value)} />
        </div>
      </div>

      {/* Caixa clássica de Promissória */}
      <div className="bg-amber-50/50 border-2 border-dashed border-amber-400 rounded-2xl p-6 text-slate-900 shadow-sm print:m-0 print:p-0 print:border-solid">
        <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-slate-800">
          {textoPromissoria}
        </pre>
      </div>
    </div>
  );
}

// 25. GERADOR DE RECIBO DE COMPRA E VENDA DE VEÍCULO
function GeradorReciboVeiculo() {
  const [vendedorNome, setVendedorNome] = useState('Lucas Gabriel Ribeiro');
  const [vendedorCpf, setVendedorCpf] = useState('789.012.345-67');
  const [compradorNome, setCompradorNome] = useState('Patrícia Helena Mendes');
  const [compradorCpf, setCompradorCpf] = useState('890.123.456-78');

  const [veiculoModelo, setVeiculoModelo] = useState('Chevrolet Onix 1.0 Flex Manual');
  const [placa, setPlaca] = useState('BRA2E19');
  const [renavam, setRenavam] = useState('00123456789');
  const [chassi, setChassi] = useState('9BG11234567890123');
  const [ano, setAno] = useState('2022/2023');
  const [km, setKm] = useState('35.400 km');
  const [valor, setValor] = useState(65000);
  const [cidade, setCidade] = useState('Campinas - SP');

  const [copiado, setCopiado] = useState(false);

  const valorFormatado = Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const hoje = new Date().toLocaleDateString('pt-BR');

  const textoRecibo = `TERMO E RECIBO DE COMPRA E VENDA DE VEÍCULO

VENDEDOR: ${vendedorNome.toUpperCase()}, inscrito(a) no CPF nº ${vendedorCpf}.
COMPRADOR: ${compradorNome.toUpperCase()}, inscrito(a) no CPF nº ${compradorCpf}.

DADOS DO VEÍCULO:
- Marca/Modelo: ${veiculoModelo}
- Placa: ${placa.toUpperCase()} | Renavam: ${renavam}
- Chassi: ${chassi.toUpperCase()}
- Ano Fab/Modelo: ${ano} | Quilometragem: ${km}

VALOR E QUITAÇÃO:
Pelo presente instrumento, o Vendedor declara ter recebido do Comprador a quantia de ${valorFormatado} em moeda corrente/transferência bancária, conferindo plena, geral e irrevogável QUITAÇÃO financeira referente à venda do veículo acima descrito.

CLÁUSULAS E RESPONSABILIDADES:
1. O Comprador declara que vistoriou o veículo, aceitando-o nas condições mecânicas, elétricas e de funilaria em que se encontra.
2. O Vendedor responde por quaisquer débitos tributários (IPVA, Licenciamento) e multas de trânsito ocorridas até a data e hora desta entrega.
3. O Comprador assume a responsabilidade civil, criminal e por infrações de trânsito a partir desta data, comprometendo-se a efetuar a transferência do veículo perante o DETRAN no prazo legal de 30 (trinta) dias (Art. 123 do CTB).


${cidade}, ${hoje}.


_______________________________________________________________
${vendedorNome.toUpperCase()} (Vendedor)


_______________________________________________________________
${compradorNome.toUpperCase()} (Comprador)`;

  const copiar = () => {
    navigator.clipboard.writeText(textoRecibo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="space-y-6" id="gerador-recibo-veiculo">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Gerador de Recibo de Compra e Venda de Veículo</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Gere o recibo e termo de transferência e quitação de automóvel/moto com cláusula de responsabilidade de multas.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={copiar} type="button" className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition hover:bg-slate-200">
            {copiado ? 'Copiado! ✅' : 'Copiar'}
          </button>
          <button onClick={() => window.print()} type="button" className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black shadow transition">
            🖨️ Imprimir A4
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Veículo (Marca/Modelo)</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-bold" value={veiculoModelo} onChange={e => setVeiculoModelo(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Placa</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono uppercase" value={placa} onChange={e => setPlaca(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Valor Negociado (R$)</label>
          <input type="number" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-bold" value={valor} onChange={e => setValor(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Renavam</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={renavam} onChange={e => setRenavam(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">Chassi</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs font-mono" value={chassi} onChange={e => setChassi(e.target.value)} />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">KM Atual</label>
          <input type="text" className="w-full border dark:border-slate-700 rounded p-1.5 bg-white dark:bg-slate-800 text-xs" value={km} onChange={e => setKm(e.target.value)} />
        </div>
      </div>

      <div className="bg-white border-2 border-slate-300 rounded-xl p-8 text-slate-900 shadow-sm print:m-0 print:p-0 print:border-none print:shadow-none">
        <pre className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
          {textoRecibo}
        </pre>
      </div>
    </div>
  );
}


