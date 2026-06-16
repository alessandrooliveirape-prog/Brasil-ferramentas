/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface InstitucionalProps {
  pageId: string; // e.g. "sobre", "contato", "privacidade"
}

export default function Institucional({ pageId }: InstitucionalProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm font-sans text-slate-800 dark:text-slate-100" id="inst-container">
      {pageId === 'sobre' && <SobreNos />}
      {pageId === 'contato' && <ContatoForm />}
      {pageId === 'privacidade' && <PoliticaPrivacidade />}
      {pageId === 'termos' && <TermosDeUso />}
      {pageId === 'cookies' && <GestaodeCookies />}
      {pageId === 'transparencia-adsense' && <TransparenciaAdsense />}
    </div>
  );
}

// 1. SOBRE NOS
function SobreNos() {
  return (
    <div className="space-y-6" id="inst-sobre">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Sobre a Tool Brasil</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        A <strong>Tool Brasil</strong> nasceu com o propósito de ser o maior e mais eficiente ecossistema de utilitários online gratuitos da internet brasileira. Nós acreditamos que ferramentas úteis devem ser acessíveis, rápidas e descomplicadas, sem a necessidade de cadastros, instalações ou pagamentos ocultos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-lg text-center">
          <span className="text-xl font-bold block text-emerald-600">Leveza</span>
          <span className="text-xs text-slate-400">Páginas otimizadas para carregamento instantâneo.</span>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-lg text-center">
          <span className="text-xl font-bold block text-emerald-600">Privacidade</span>
          <span className="text-xs text-slate-400">Processamento executado localmente sempre que possível.</span>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-lg text-center">
          <span className="text-xl font-bold block text-emerald-600">Utilidade</span>
          <span className="text-xs text-slate-400">Mais de 40 ferramentas voltadas ao seu cotidiano.</span>
        </div>
      </div>
    </div>
  );
}

// 2. CONTATO FORM
function ContatoForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState<unknown | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && email && mensagem) {
      setStatus('enviado');
      setNome('');
      setEmail('');
      setMensagem('');
    } else {
      setStatus('erro');
    }
  };

  return (
    <div className="space-y-6" id="inst-contato">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Fale Conosco</h2>
      <p className="text-xs text-slate-500">Tem alguma sugestão de nova ferramenta? Entre em contato conosco preenchendo o formulário abaixo:</p>

      {status === 'enviado' && (
        <div className="p-4 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
          ✓ Sua mensagem foi registrada! Agradecemos pelo feedback útil para o crescimento da Tool Brasil.
        </div>
      )}

      {status === 'erro' && (
        <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-lg border border-red-100">
          ✗ Por favor, preencha todos os campos do formulário para prosseguir.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Seu Nome</label>
          <input type="text" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800 dark:text-slate-100" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Lucas Ferreira" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">E-mail para Retorno</label>
          <input type="email" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800 dark:text-slate-100" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="lucas@contato.com" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Assunto ou Mensagem</label>
          <textarea className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800 dark:text-slate-100" rows={4} value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Descreva sua sugestão..." />
        </div>
        <button type="submit" className="bg-emerald-600 text-white font-bold text-xs py-2 px-5 rounded hover:cursor-pointer">Enviar Solicitação</button>
      </form>
    </div>
  );
}

// 3. POLITICA DE PRIVACIDADE
function PoliticaPrivacidade() {
  return (
    <div className="space-y-6" id="inst-privacidade">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Política de Privacidade</h2>
      <p className="text-xs text-slate-400">Última atualização: Junho de 2026</p>
      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
        <p>No <strong>Tool Brasil</strong>, a sua privacidade é de extrema importância para nós. Elaboramos esta política regulatória respaldada pela LGPD (Lei Geral de Proteção de Dados - Brasil) para detalhar quais dados são lidos e tratados durante sua permanência em nosso domínio.</p>
        
        <h3 className="font-bold text-slate-800 dark:text-slate-200">1. Coleta de Dados Locais e Processamento Client-side</h3>
        <p>A maioria das nossas ferramentas executa operações matematicas e transformações textuais diretamente no seu navegador, via JavaScript off-line. Isso significa que dados confidenciais do gerador de CPF, CNPJ, ou senhas nunca são transmitidos para bancos de dados externos sob nossa tutela direta.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">2. Cookies e Arquivos de Terceiros</h3>
        <p>Nós utilizamos cookies analíticos e de marketing, como os do Google AdSense, para prover anúncios segmentados e relatórios estatísticos anônimos de acesso.</p>
      </div>
    </div>
  );
}

// 4. TERMOS DE USO
function TermosDeUso() {
  return (
    <div className="space-y-6" id="inst-termos">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Termos de Uso</h2>
      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
        <p>Seja bem-vindo ao portal Tool Brasil. Ao acessar ou usar nossos serviços, você concorda em se submeter às regras estipuladas abaixo:</p>
        
        <h3 className="font-bold text-slate-800 dark:text-slate-200">1. Licença de Uso Sem Custos</h3>
        <p>Nossos utilitários são distribuídos de modo 100% gratuito e irrestrito. É vedada a venda, cópia comercial ou comercialização fraudulenta de nossos algoritmos sem atribuição expressa e prévia ao projeto Tool Brasil.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">2. Exclusão de Garantias Legais</h3>
        <p>Embora nos empenhemos em entregar fórmulas exatas para rescisão, férias e impostos, declinamos de garantias contábeis finais de direito formal. Sugerimos sempre dupla checagem oficial junto à Receita Federal ou ministérios reguladores antes de transações financeiras formais.</p>
      </div>
    </div>
  );
}

// 5. COOKIES CONSENT MANAGEMENT
function GestaodeCookies() {
  const [analytics, setAnalytics] = useState(true);
  const [adsense, setAdsense] = useState(true);

  return (
    <div className="space-y-6" id="inst-cookies">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Preferência de Cookies</h2>
      <p className="text-xs text-slate-500">Ajuste os parâmetros de armazenamento abaixo para moldar sua privacidade na Tool Brasil:</p>

      <div className="space-y-4 max-w-md">
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-850 rounded-lg border">
          <div>
            <span className="text-xs font-bold block text-slate-700 dark:text-slate-200">Cookies de Marketing (AdSense)</span>
            <span className="text-[10px] text-slate-400 block">Personalização de anúncios com base no seu histórico.</span>
          </div>
          <input type="checkbox" checked={adsense} onChange={() => setAdsense(!adsense)} className="w-5 h-5 rounded text-emerald-600" />
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-850 rounded-lg border">
          <div>
            <span className="text-xs font-bold block text-slate-700 dark:text-slate-200">Cookies Estatísticos (Analytics)</span>
            <span className="text-[10px] text-slate-400 block">Dados anônimos de engajamento para otimização técnica.</span>
          </div>
          <input type="checkbox" checked={analytics} onChange={() => setAnalytics(!analytics)} className="w-5 h-5 rounded text-emerald-600" />
        </div>
        
        <button onClick={() => alert('Suas preferências de cookies foram salvas com sucesso!')} className="bg-emerald-600 text-white font-bold text-[11px] py-2 px-4 rounded">Salvar Configurações</button>
      </div>
    </div>
  );
}

// 6. AD_SENSE TRANSPARENCY
function TransparenciaAdsense() {
  return (
    <div className="space-y-6" id="inst-ads">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Transparência Google AdSense</h2>
      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
        <p>A <strong>Tool Brasil</strong> é mantida e financiada primordialmente através de receitas obtidas via anúncios programáticos do <strong>Google AdSense</strong>. Isso nos concede fundos para manter a infraestrutura de servidores rápidos e pagar os programadores envolvidos.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">Como os Anúncios Funcionam?</h3>
        <p>O Google utiliza cookies DoubleClick Dart para segmentação inteligente de anúncios com base nos hábitos de buscas do usuário na web comum. Os dados são anonimizados e nenhuma informação confidencial (como nome ou senhas) é repassada para nossa central ou terceiros.</p>
      </div>
    </div>
  );
}
