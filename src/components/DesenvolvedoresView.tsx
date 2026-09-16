/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * DesenvolvedoresView.tsx — Central de Desenvolvedores, Documentação da API Pública e Gerador de Widgets
 * Tool Brasil (https://www.toolbrasil.com.br/desenvolvedores)
 */

import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Terminal, 
  Globe, 
  Copy, 
  Check, 
  ExternalLink, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Play, 
  Layers, 
  Share2, 
  BookOpen, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface EndpointInfo {
  id: string;
  name: string;
  category: string;
  method: string;
  path: string;
  description: string;
  jsExample: string;
  pyExample: string;
  curlExample: string;
}

const ENDPOINTS: EndpointInfo[] = [
  {
    id: 'cpf',
    name: 'Gerador de CPF Válido',
    category: 'Documentos',
    method: 'GET',
    path: '/api/v1/cpf/gerar.json',
    description: 'Retorna lote de CPFs válidos sintéticos gerados pelo algoritmo oficial Módulo 11 da Receita Federal, com formato pontuado e desformatado, estado de origem e metadados.',
    jsExample: `// Consumo simples via JavaScript / Node.js
fetch('https://www.toolbrasil.com.br/api/v1/cpf/gerar.json')
  .then(res => res.json())
  .then(data => {
    console.log('CPF Gerado:', data.dados[0].cpf);
    console.log('Região:', data.dados[0].regiao_origem);
  });`,
    pyExample: `# Consumo via Python (requests)
import requests

response = requests.get('https://www.toolbrasil.com.br/api/v1/cpf/gerar.json')
data = response.json()
primeiro_cpf = data['dados'][0]

print(f"CPF: {primeiro_cpf['cpf']} ({primeiro_cpf['regiao_origem']})")`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/cpf/gerar.json \\
  -H "Accept: application/json"`
  },
  {
    id: 'cnpj',
    name: 'Gerador de CNPJ Válido',
    category: 'Documentos',
    method: 'GET',
    path: '/api/v1/cnpj/gerar.json',
    description: 'Retorna lote de CNPJs sintéticos matematicamente válidos (com identificador de matriz 0001 e dígitos verificadores calculados) para testes e homologação.',
    jsExample: `fetch('https://www.toolbrasil.com.br/api/v1/cnpj/gerar.json')
  .then(res => res.json())
  .then(data => console.log('CNPJ:', data.dados[0].cnpj));`,
    pyExample: `import requests
r = requests.get('https://www.toolbrasil.com.br/api/v1/cnpj/gerar.json')
print(r.json()['dados'][0]['cnpj'])`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/cnpj/gerar.json`
  },
  {
    id: 'inss',
    name: 'Tabela Progressiva INSS 2026',
    category: 'Trabalhista & Tributário',
    method: 'GET',
    path: '/api/v1/tabelas/inss.json',
    description: 'Tabela oficial de retenção progressiva do INSS CLT, com faixas de salário de contribuição, alíquotas (7,5% a 14%), parcelas a deduzir e teto máximo de contribuição.',
    jsExample: `fetch('https://www.toolbrasil.com.br/api/v1/tabelas/inss.json')
  .then(res => res.json())
  .then(tabela => {
    console.log('Teto INSS:', tabela.teto_contribuicao);
    console.table(tabela.faixas);
  });`,
    pyExample: `import requests
r = requests.get('https://www.toolbrasil.com.br/api/v1/tabelas/inss.json')
inss = r.json()
for faixa in inss['faixas']:
    print(f"Até R$ {faixa['ate']}: {faixa['aliquota_percentual']}%")`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/tabelas/inss.json`
  },
  {
    id: 'irrf',
    name: 'Tabela Progressiva IRRF 2026',
    category: 'Trabalhista & Tributário',
    method: 'GET',
    path: '/api/v1/tabelas/irrf.json',
    description: 'Faixas do Imposto de Renda Retido na Fonte (IRRF), limites de isenção, alíquotas de 7,5% a 27,5%, parcela a deduzir e valor oficial por dependente.',
    jsExample: `fetch('https://www.toolbrasil.com.br/api/v1/tabelas/irrf.json')
  .then(res => res.json())
  .then(data => console.log('Faixas IRRF:', data.faixas));`,
    pyExample: `import requests
data = requests.get('https://www.toolbrasil.com.br/api/v1/tabelas/irrf.json').json()
print("Dedução dependente:", data['deducao_por_dependente_mensal'])`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/tabelas/irrf.json`
  },
  {
    id: 'salario-minimo',
    name: 'Salário Mínimo Histórico & Vigente',
    category: 'Economia',
    method: 'GET',
    path: '/api/v1/tabelas/salario-minimo.json',
    description: 'Valores históricos do piso salarial nacional desde a implantação do Plano Real (1994) até o piso vigente, com detalhamento de valor por hora e dia.',
    jsExample: `fetch('https://www.toolbrasil.com.br/api/v1/tabelas/salario-minimo.json')
  .then(res => res.json())
  .then(data => console.log('Salário Vigente:', data.vigente.valor_mensal));`,
    pyExample: `import requests
res = requests.get('https://www.toolbrasil.com.br/api/v1/tabelas/salario-minimo.json').json()
print("Valor atual: R$", res['vigente']['valor_mensal'])`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/tabelas/salario-minimo.json`
  },
  {
    id: 'bancos',
    name: 'Bancos do Brasil (COMPE & ISPB)',
    category: 'Financeiro',
    method: 'GET',
    path: '/api/v1/dados/bancos.json',
    description: 'Lista consolidada das principais instituições financeiras em operação no Brasil, contendo código COMPE de 3 dígitos, código ISPB e nome oficial.',
    jsExample: `fetch('https://www.toolbrasil.com.br/api/v1/dados/bancos.json')
  .then(res => res.json())
  .then(data => console.log('Total de bancos:', data.total));`,
    pyExample: `import requests
bancos = requests.get('https://www.toolbrasil.com.br/api/v1/dados/bancos.json').json()['bancos']
for b in bancos[:5]:
    print(b['codigo_compe'], '-', b['nome'])`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/dados/bancos.json`
  },
  {
    id: 'ddds',
    name: 'Códigos DDD por Estado',
    category: 'Telecomunicações',
    method: 'GET',
    path: '/api/v1/dados/ddds.json',
    description: 'Mapeamento completo dos códigos DDD de todos os 26 estados brasileiros e Distrito Federal, identificando capitais e regiões metropolitanas.',
    jsExample: `fetch('https://www.toolbrasil.com.br/api/v1/dados/ddds.json')
  .then(res => res.json())
  .then(data => console.log('DDDs:', data.ddds));`,
    pyExample: `import requests
ddds = requests.get('https://www.toolbrasil.com.br/api/v1/dados/ddds.json').json()['ddds']
print([f"{item['uf']}: {item['codigos']}" for item in ddds[:3]])`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/dados/ddds.json`
  },
  {
    id: 'feriados',
    name: 'Feriados Nacionais 2026',
    category: 'Calendário',
    method: 'GET',
    path: '/api/v1/dados/feriados-nacionais.json',
    description: 'Relação oficial de feriados nacionais brasileiros e pontos facultativos com datas em formato ISO 8601.',
    jsExample: `fetch('https://www.toolbrasil.com.br/api/v1/dados/feriados-nacionais.json')
  .then(res => res.json())
  .then(data => console.log('Feriados:', data.feriados));`,
    pyExample: `import requests
feriados = requests.get('https://www.toolbrasil.com.br/api/v1/dados/feriados-nacionais.json').json()['feriados']
print(f"Total de feriados: {len(feriados)}")`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/dados/feriados-nacionais.json`
  },
  {
    id: 'ferramentas',
    name: 'Catálogo de Ferramentas Tool Brasil',
    category: 'Geral',
    method: 'GET',
    path: '/api/v1/ferramentas.json',
    description: 'Diretório completo de todas as ferramentas ativas na plataforma, com títulos, descrições, categorias e URLs canônicas.',
    jsExample: `fetch('https://www.toolbrasil.com.br/api/v1/ferramentas.json')
  .then(res => res.json())
  .then(data => console.log('Ferramentas ativas:', data.total_ferramentas));`,
    pyExample: `import requests
res = requests.get('https://www.toolbrasil.com.br/api/v1/ferramentas.json').json()
print("Ferramentas disponíveis:", res['total_ferramentas'])`,
    curlExample: `curl -X GET https://www.toolbrasil.com.br/api/v1/ferramentas.json`
  }
];

export default function DesenvolvedoresView() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointInfo>(ENDPOINTS[0]);
  const [codeLang, setCodeLang] = useState<'js' | 'python' | 'curl'>('js');
  const [copiedCode, setCopiedCode] = useState(false);

  // Playground state
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // Widget customizer state
  const [widgetTool, setWidgetTool] = useState<'validador-documentos' | 'juros-compostos' | 'tabela-inss'>('validador-documentos');
  const [widgetTheme, setWidgetTheme] = useState<'light' | 'dark'>('light');
  const [copiedWidgetCode, setCopiedWidgetCode] = useState(false);

  // Execute test request
  const handleTestRequest = async () => {
    setIsLoadingApi(true);
    setApiResponse(null);
    setResponseStatus(null);
    setResponseTime(null);

    const start = performance.now();
    try {
      const res = await fetch(selectedEndpoint.path);
      const elapsed = Math.round(performance.now() - start);
      setResponseStatus(res.status);
      setResponseTime(elapsed);
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseStatus(500);
      setApiResponse(JSON.stringify({ erro: 'Falha na requisição', detalhe: err.message }, null, 2));
    } finally {
      setIsLoadingApi(false);
    }
  };

  const handleCopyCode = (text: string, type: 'code' | 'widget') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedWidgetCode(true);
      setTimeout(() => setCopiedWidgetCode(false), 2000);
    }
  };

  const widgetEmbedSnippet = `<div id="tool-brasil-widget" data-tool="${widgetTool}" data-theme="${widgetTheme}"></div>
<script src="https://www.toolbrasil.com.br/widget.js" async></script>`;

  return (
    <div className="space-y-10" id="desenvolvedores-view">
      
      {/* 1. HERO SECTION */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tool Brasil Open API v1 & Widgets</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Central de Desenvolvedores & API Pública
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Endpoints estáticos de <strong>alta performance e custo zero</strong> para desenvolvedores, equipes de QA, estudantes e contadores. Consuma tabelas trabalhistas atualizadas, geradores com algoritmo oficial e integre utilitários em seu site através de widgets embeddables.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1 bg-white/10 rounded-lg text-emerald-300 border border-white/10 font-bold">
              ⚡ Edge CDN Global
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-lg text-emerald-300 border border-white/10 font-bold">
              🔓 CORS Habilitado (*)
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-lg text-emerald-300 border border-white/10 font-bold">
              🚫 Zero Autenticação / 100% Grátis
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-lg text-emerald-300 border border-white/10 font-bold">
              🛡️ LGPD Compliant
            </span>
          </div>
        </div>
      </div>

      {/* 2. ARQUITETURA & PILARES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-2 shadow-xs">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Static Edge Architecture</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Os dados são pré-compilados e servidos diretamente do cache da CDN. Isso garante tempo de resposta inferior a 25ms e disponibilidade de 99.99%.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-2 shadow-xs">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Conformidade e Segurança</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Todos os documentos (CPF, CNPJ) utilizam o algoritmo oficial Módulo 11 para criação de dados sintéticos válidos, sem qualquer vínculo com pessoas reais.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-xl space-y-2 shadow-xs">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-lg w-fit">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Widgets Incorporáveis</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Incorpore calculadoras e validadores no seu blog, portal ou e-commerce colando apenas duas linhas de HTML sem necessidade de back-end.
          </p>
        </div>
      </div>

      {/* 3. API EXPLORER & PLAYGROUND INTERATIVO */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6" id="api-explorer">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Explorador de Endpoints & Playground
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Escolha um endpoint abaixo para inspecionar parâmetros, copiar código e testar a resposta JSON em tempo real.
            </p>
          </div>

          {/* Endpoint Selector */}
          <div className="shrink-0">
            <select
              value={selectedEndpoint.id}
              onChange={(e) => {
                const found = ENDPOINTS.find(ep => ep.id === e.target.value);
                if (found) {
                  setSelectedEndpoint(found);
                  setApiResponse(null);
                  setResponseStatus(null);
                  setResponseTime(null);
                }
              }}
              className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {ENDPOINTS.map(ep => (
                <option key={ep.id} value={ep.id}>
                  {ep.category}: {ep.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Endpoint Details */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-xs font-mono font-black">
              {selectedEndpoint.method}
            </span>
            <code className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
              https://www.toolbrasil.com.br{selectedEndpoint.path}
            </code>
            <button
              onClick={handleTestRequest}
              disabled={isLoadingApi}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-md shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isLoadingApi ? 'Testando...' : 'Testar Requisição'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {selectedEndpoint.description}
          </p>
        </div>

        {/* Live Test Response Box */}
        {apiResponse && (
          <div className="bg-slate-950 text-slate-100 rounded-xl p-4 border border-slate-800 space-y-2 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Status: <strong className={responseStatus === 200 ? 'text-emerald-400' : 'text-rose-400'}>{responseStatus} OK</strong>
              </span>
              {responseTime !== null && (
                <span className="text-slate-400">Latência: <strong className="text-emerald-400">{responseTime}ms</strong></span>
              )}
            </div>
            <pre className="text-[11px] font-mono overflow-x-auto p-2 max-h-72 leading-relaxed text-emerald-300">
              {apiResponse}
            </pre>
          </div>
        )}

        {/* Code Snippets Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex gap-2 text-xs font-bold">
              <button
                onClick={() => setCodeLang('js')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${codeLang === 'js' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                JavaScript (Fetch)
              </button>
              <button
                onClick={() => setCodeLang('python')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${codeLang === 'python' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                Python (requests)
              </button>
              <button
                onClick={() => setCodeLang('curl')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${codeLang === 'curl' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                cURL
              </button>
            </div>

            <button
              onClick={() => {
                const code = codeLang === 'js' ? selectedEndpoint.jsExample : codeLang === 'python' ? selectedEndpoint.pyExample : selectedEndpoint.curlExample;
                handleCopyCode(code, 'code');
              }}
              className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-slate-800">
            <pre>
              {codeLang === 'js' && selectedEndpoint.jsExample}
              {codeLang === 'python' && selectedEndpoint.pyExample}
              {codeLang === 'curl' && selectedEndpoint.curlExample}
            </pre>
          </div>
        </div>

      </div>

      {/* 4. WIDGETS EMBEBBÍVEIS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6" id="widgets">
        <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Fábrica de Backlinks & Utilidades</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Widgets Incorporáveis para Blogs e Sites
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Adicione utilitários e calculadoras dinâmicas às suas postagens de blog, páginas de finanças ou portais corporativos. O widget é leve (&lt; 4 KB), responsivo, seguro e executado 100% no navegador do visitante.
          </p>
        </div>

        {/* Configuração do Widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                1. Escolha a Ferramenta do Widget:
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => setWidgetTool('validador-documentos')}
                  className={`text-left p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${widgetTool === 'validador-documentos' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'}`}
                >
                  🛡️ Validador de Documentos (CPF e CNPJ)
                  <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">Validação instantânea com feedback visual de dígitos.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWidgetTool('juros-compostos')}
                  className={`text-left p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${widgetTool === 'juros-compostos' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'}`}
                >
                  📈 Simulador de Juros Compostos
                  <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">Calculadora compacta de rendimento financeiro com aportes.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWidgetTool('tabela-inss')}
                  className={`text-left p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${widgetTool === 'tabela-inss' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'}`}
                >
                  📊 Tabela Progressiva INSS 2026
                  <span className="block text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">Tabela oficial com faixas de desconto e teto salarial.</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                2. Escolha o Tema Visual:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWidgetTheme('light')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${widgetTheme === 'light' ? 'bg-white text-slate-900 border-slate-900 shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent'}`}
                >
                  ☀️ Tema Claro (Light)
                </button>
                <button
                  type="button"
                  onClick={() => setWidgetTheme('dark')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border transition cursor-pointer ${widgetTheme === 'dark' ? 'bg-slate-900 text-white border-slate-700 shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent'}`}
                >
                  🌙 Tema Escuro (Dark)
                </button>
              </div>
            </div>

            {/* Código para Copiar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  3. Código HTML Pronto para Incorporar:
                </label>
                <button
                  type="button"
                  onClick={() => handleCopyCode(widgetEmbedSnippet, 'widget')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  {copiedWidgetCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWidgetCode ? 'Código Copiado!' : 'Copiar Código'}</span>
                </button>
              </div>
              <div className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-800 overflow-x-auto">
                <pre>{widgetEmbedSnippet}</pre>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                💡 Cole este código em qualquer lugar do seu artigo WordPress, Wix, Webflow ou HTML estático.
              </p>
            </div>
          </div>

          {/* Pré-visualização ao vivo do Widget */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Pré-visualização em Tempo Real:
            </span>
            <div className="p-4 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center min-h-[320px]">
              <div className="w-full max-w-sm">
                {/* Mockup do widget no preview */}
                {widgetTool === 'validador-documentos' && (
                  <div className={`p-4 rounded-xl border shadow-sm ${widgetTheme === 'dark' ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <strong className="text-sm flex items-center gap-1.5">🛡️ Validador de CPF / CNPJ</strong>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">Gratuito</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Digite o documento para testar:</p>
                    <input
                      type="text"
                      placeholder="000.000.000-00 ou CNPJ"
                      defaultValue="529.982.247-25"
                      className={`w-full p-2 text-xs font-mono rounded-lg border mb-3 outline-none ${widgetTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                    />
                    <div className="p-2 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 mb-3">
                      ✅ CPF Válido! Os dígitos verificadores conferem.
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-500">
                      <span>Validação local segura</span>
                      <span>Powered by <span className="text-emerald-600 font-bold">Tool Brasil</span></span>
                    </div>
                  </div>
                )}

                {widgetTool === 'juros-compostos' && (
                  <div className={`p-4 rounded-xl border shadow-sm ${widgetTheme === 'dark' ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <strong className="text-sm flex items-center gap-1.5">📈 Juros Compostos</strong>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">Tool Brasil</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Inicial</span>
                        <span className="font-mono font-bold">R$ 1.000,00</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Aporte / Mês</span>
                        <span className="font-mono font-bold">R$ 200,00</span>
                      </div>
                    </div>
                    <div className="p-2 text-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 mb-3">
                      <span className="text-[10px] text-slate-500 block">Total Acumulado (24 meses)</span>
                      <strong className="text-base text-emerald-600 dark:text-emerald-400 font-black">R$ 6.945,30</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-500">
                      <span>Cálculo com juros compostos</span>
                      <span>Calculado via <span className="text-emerald-600 font-bold">Tool Brasil</span></span>
                    </div>
                  </div>
                )}

                {widgetTool === 'tabela-inss' && (
                  <div className={`p-4 rounded-xl border shadow-sm ${widgetTheme === 'dark' ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <strong className="text-sm flex items-center gap-1.5">📊 Tabela INSS 2026</strong>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">Oficial</span>
                    </div>
                    <table className="w-full text-xs mb-2">
                      <tbody>
                        <tr className="border-b border-slate-100 dark:border-slate-800 py-1">
                          <td className="py-1 text-slate-600 dark:text-slate-300">Até R$ 1.518,00</td>
                          <td className="py-1 text-right font-bold text-emerald-600">7,5%</td>
                        </tr>
                        <tr className="border-b border-slate-100 dark:border-slate-800 py-1">
                          <td className="py-1 text-slate-600 dark:text-slate-300">De R$ 1.518 a R$ 2.793</td>
                          <td className="py-1 text-right font-bold text-emerald-600">9,0%</td>
                        </tr>
                        <tr className="border-b border-slate-100 dark:border-slate-800 py-1">
                          <td className="py-1 text-slate-600 dark:text-slate-300">De R$ 2.793 a R$ 4.190</td>
                          <td className="py-1 text-right font-bold text-emerald-600">12,0%</td>
                        </tr>
                        <tr className="py-1">
                          <td className="py-1 text-slate-600 dark:text-slate-300">De R$ 4.190 a R$ 8.157</td>
                          <td className="py-1 text-right font-bold text-emerald-600">14,0%</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-[10px] text-slate-500">
                      <span>Teto: R$ 8.157,41</span>
                      <span>Fonte: <span className="text-emerald-600 font-bold">Tool Brasil</span></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. POLÍTICA DE USO JUSTO & CONTATO B2B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-black text-slate-900 dark:text-white text-base">Termos de Uso & Fair Use</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Nossa API pública é <strong>100% gratuita para sempre</strong> para uso educacional, testes de software e pequenas aplicações. Pedimos apenas que respeite o limite razoável de requisições e mantenha o cabeçalho User-Agent com a identificação do seu projeto.
          </p>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc pl-5 font-semibold">
            <li>Sem limite de chave ou cobranças surpresa;</li>
            <li>Cache de borda com atualização contínua;</li>
            <li>Atribuição recomendada via link no seu rodapé ou documentação.</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/10 to-slate-900/50 border border-emerald-500/30 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Layers className="w-5 h-5" />
            <h3 className="font-black text-slate-900 dark:text-white text-base">Soluções Corporativas & B2B</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Sua empresa necessita de histórico completo em lote, webhooks em tempo real, SLA corporativo ou endpoints personalizados de cálculo trabalhista e fiscal?
          </p>
          <div className="pt-2">
            <a
              href="/institucional/contato"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <span>Falar com a Equipe de Engenharia</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
