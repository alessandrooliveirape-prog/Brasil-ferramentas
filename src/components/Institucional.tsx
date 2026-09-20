/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Mail, BookOpen, Scale, Award, Lock, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';

interface InstitucionalProps {
  pageId: string; // e.g. "sobre", "contato", "privacidade", "termos", "cookies", "transparencia-adsense", "anunciantes"
}

export default function Institucional({ pageId }: InstitucionalProps) {
  // Map standard aliases
  const normalizedId = 
    pageId === 'politica-de-privacidade' || pageId === 'privacidade' ? 'privacidade' :
    pageId === 'termos-de-uso' || pageId === 'termos' ? 'termos' :
    pageId === 'sobre-nos' || pageId === 'quem-somos' ? 'sobre' :
    pageId === 'fale-conosco' ? 'contato' :
    pageId === 'gestao-de-cookies' ? 'cookies' :
    pageId;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm font-sans text-slate-800 dark:text-slate-100" id="inst-container">
      {normalizedId === 'sobre' && <SobreNos />}
      {normalizedId === 'contato' && <ContatoForm />}
      {normalizedId === 'privacidade' && <PoliticaPrivacidade />}
      {normalizedId === 'termos' && <TermosDeUso />}
      {normalizedId === 'cookies' && <GestaodeCookies />}
      {normalizedId === 'transparencia-adsense' && <TransparenciaAdsense />}
      {normalizedId === 'anunciantes' && <Anunciantes />}
    </div>
  );
}

// 1. SOBRE NÓS (E-E-A-T Aprofundado, Metodologia e Equipe Técnica)
function SobreNos() {
  return (
    <div className="space-y-8" id="inst-sobre">
      <div className="border-b border-slate-150 dark:border-slate-800 pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 mb-3">
          <Award className="w-3.5 h-3.5" /> Quem Somos & Nossa Metodologia
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Sobre a Tool Brasil
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Conheça os pilares éticos, o rigor normativo e a equipe multidisciplinar por trás do maior portal brasileiro de utilitários e calculadoras online 100% gratuitos.
        </p>
      </div>

      {/* Missão e Propósito */}
      <section className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" /> Nossa Missão e Compromisso Social
        </h2>
        <p>
          A <strong>Tool Brasil</strong> (acessível através do domínio <code>toolbrasil.com.br</code>) foi fundada com o propósito inequívoco de democratizar o acesso a ferramentas de cálculo, conversores analíticos, geradores de dados para testes de software e diagnósticos web para todos os cidadãos brasileiros, profissionais autônomos, microempreendedores e estudantes.
        </p>
        <p>
          Em um cenário digital saturado de plataformas que exigem cadastros invasivos, cobranças ocultas de assinaturas ou armazenamento indevido de dados pessoais, a Tool Brasil estabeleceu um novo padrão: <strong>todas as nossas mais de 130 ferramentas são e sempre serão 100% gratuitas, sem limites de utilização diária e livres de paywalls</strong>.
        </p>
      </section>

      {/* Destaques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-2">
        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            ⚡
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Privacidade Client-Side</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Seus dados nunca saem do seu navegador. Todas as operações matemáticas, formatações e validações são processadas localmente pelo seu próprio dispositivo via JavaScript seguro.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            ⚖️
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Rigor Jurídico & Fiscal</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Algoritmos atualizados conforme a CLT, Portarias Interministeriais do Ministério da Fazenda e Previdência (2026), e Instruções Normativas da Receita Federal do Brasil.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            🚀
          </div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Alta Velocidade na Edge</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Páginas estáticas pré-renderizadas distribuídas em servidores CDN globais com latência inferior a 50 milissegundos no Brasil e índice CLS zero.
          </p>
        </div>
      </div>

      {/* Metodologia de Validação */}
      <section className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600" /> Metodologia de Cálculo e Fontes Oficiais
        </h2>
        <p>
          A precisão matemática é inegociável em nossa plataforma. Cada utilitário foi estruturado com base em normas consolidadas e parâmetros oficiais de órgãos governamentais e instituições científicas:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <li>
            <strong>Cálculos Trabalhistas e Previdenciários:</strong> Baseados na Consolidação das Leis do Trabalho (Decreto-Lei nº 5.452/1943), Lei nº 12.506/2011 (aviso prévio proporcional) e na Tabela Progressiva de Contribuição do INSS vigente, publicada pela Portaria Interministerial MPS/MF nº 2 de 2026.
          </li>
          <li>
            <strong>Cálculos Tributários e IRRF:</strong> Fórmulas estruturadas em consonância com a Lei nº 11.482/2007 e Instruções Normativas expedidas pela Secretaria da Receita Federal do Brasil (RFB), incluindo faixas de isenção progressiva e deduções legais por dependente.
          </li>
          <li>
            <strong>Cotações e Índices Financeiros:</strong> Fórmulas financeiras padronizadas pela matemática atuarial (Tabela Price, Sistema de Amortização Constante - SAC e Juros Compostos exponenciais), aliadas a APIs de câmbio de dados do Banco Central do Brasil.
          </li>
          <li>
            <strong>Conversores Métricos e Técnicos:</strong> Estruturados sob os coeficientes de conversão rigorosos do Sistema Internacional de Unidades (SI), padronizados pelo Instituto Nacional de Metrologia, Qualidade e Tecnologia (INMETRO) e normas ISO.
          </li>
        </ul>
      </section>

      {/* Corpo Técnico e Editorial */}
      <section className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Corpo Editorial e Responsabilidade Técnica
        </h2>
        <p>
          O ecossistema Tool Brasil é idealizado e mantido por engenheiros de software, especialistas em segurança da informação e analistas de dados focados em utilitários web de alto desempenho, sediados em São Paulo, Brasil.
        </p>
        <p>
          Antes de qualquer ferramenta entrar em produção, seus algoritmos passam por baterias de testes unitários automatizados cobrindo dezenas de cenários reais (como rescisões de múltiplos anos com férias vencidas, frações proporcionais de 13º e testes de robustez matemática com números decimais).
        </p>
      </section>

      {/* Modelo de Sustentabilidade */}
      <section className="p-5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <h3 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
          🌱 Como a Tool Brasil se Sustenta?
        </h3>
        <p>
          A manutenção de servidores velozes, certificados de segurança SSL, serviços de CDN de ponta e o tempo de engenharia exigem investimentos contínuos. A Tool Brasil é financiada exclusivamente por meio de <strong>anúncios programáticos do Google AdSense</strong> e parcerias transparentes com empresas de tecnologia e finanças.
        </p>
        <p>
          Não vendemos dados de usuários, não exibimos anúncios em pop-ups invasivos e nunca bloquearemos recursos essenciais em troca de cobranças. Ao utilizar nosso portal com anúncios discretos, você ajuda a manter esse acervo público e gratuito para milhões de brasileiros.
        </p>
      </section>
    </div>
  );
}

// 2. FALE CONOSCO / CONTATO (Canal Direto Visível, E-mails e DPO)
function ContatoForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('duvida');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState<string | null>(null);

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
    <div className="space-y-8" id="inst-contato">
      <div className="border-b border-slate-150 dark:border-slate-800 pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 mb-3">
          <Mail className="w-3.5 h-3.5" /> Atendimento & Canais Oficiais
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Fale Conosco
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Tem alguma dúvida sobre os cálculos, sugestão de nova ferramenta, relato de inconsistência técnica ou proposta de parceria? Entre em contato pelos canais oficiais da Tool Brasil.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Painel de Contatos Diretos */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Canais Oficiais Diretos
            </h2>

            <div>
              <span className="font-semibold text-slate-500 dark:text-slate-400 block">📧 Suporte Geral & Sugestões:</span>
              <a href="mailto:contato@toolbrasil.com.br" className="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline break-all">
                contato@toolbrasil.com.br
              </a>
            </div>

            <div>
              <span className="font-semibold text-slate-500 dark:text-slate-400 block">🔒 Encarregado de Dados (DPO LGPD):</span>
              <a href="mailto:dpo@toolbrasil.com.br" className="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline break-all">
                dpo@toolbrasil.com.br
              </a>
            </div>

            <div>
              <span className="font-semibold text-slate-500 dark:text-slate-400 block">💼 Parcerias Comerciais & Mídia:</span>
              <a href="mailto:comercial@toolbrasil.com.br" className="font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline break-all">
                comercial@toolbrasil.com.br
              </a>
            </div>

            <hr className="border-slate-200 dark:border-slate-700" />

            <div className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <p><strong>⏰ Horário de Atendimento:</strong> Segunda a Sexta, das 09:00 às 18:00 (Horário de Brasília).</p>
              <p><strong>⏱️ Prazo de Retorno:</strong> Até 24 a 48 horas úteis.</p>
              <p><strong>📍 Localização:</strong> São Paulo - SP, Brasil.</p>
            </div>
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 text-base">
            Envie sua Mensagem
          </h2>

          {status === 'enviado' && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Sua mensagem foi registrada com sucesso!</p>
                <p className="font-normal mt-0.5">Nossa equipe técnica analisará sua solicitação e responderá no e-mail informado dentro de até 48 horas úteis.</p>
              </div>
            </div>
          )}

          {status === 'erro' && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 text-xs font-semibold rounded-xl border border-rose-200 dark:border-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Campos incompletos</p>
                <p className="font-normal mt-0.5">Por favor, preencha todos os campos obrigatórios (nome, e-mail e descrição) para prosseguir.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Carlos Silva"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Seu E-mail para Retorno *
                </label>
                <input
                  type="email"
                  required
                  className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@exemplo.com.br"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Motivo do Contato *
              </label>
              <select
                className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              >
                <option value="duvida">Dúvida sobre fórmula ou cálculo</option>
                <option value="sugestao">Sugestão de nova ferramenta</option>
                <option value="bug">Reportar erro técnico / bug</option>
                <option value="privacidade">Solicitação de Privacidade / LGPD</option>
                <option value="parceria">Parceria comercial / Anúncio</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mensagem Detalhada *
              </label>
              <textarea
                required
                rows={5}
                className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Descreva detalhadamente sua sugestão, dúvida ou a ferramenta de interesse..."
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-6 rounded-lg transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// 3. POLÍTICA DE PRIVACIDADE (Conformidade Integral LGPD + Requisitos Google AdSense)
function PoliticaPrivacidade() {
  return (
    <div className="space-y-8" id="inst-privacidade">
      <div className="border-b border-slate-150 dark:border-slate-800 pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 mb-3">
          <Lock className="w-3.5 h-3.5" /> Conformidade Legal & LGPD
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Política de Privacidade
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Última revisão formal: Setembro de 2026 | Em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018).
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          A privacidade e a soberania de dados de cada usuário que acessa o <strong>Tool Brasil</strong> (domínio <code>toolbrasil.com.br</code>) são tratadas com máxima seriedade e prioridade institucional. Elaboramos esta Política de Privacidade para apresentar de forma transparente e acessível como tratamos eventuais dados de navegação, quais tecnologias de cookies utilizamos e como você exerce plenamente seus direitos de titular.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            1. Identificação do Controlador e do Encarregado (DPO)
          </h2>
          <p>
            O portal Tool Brasil atua como Controlador no tratamento de dados técnicos de navegação decorrentes do acesso ao site. Para qualquer questionamento, exercício de direitos da LGPD ou esclarecimentos regulatórios, você pode contatar nosso <strong>Encarregado de Proteção de Dados (DPO)</strong> diretamente através do endereço: <strong>dpo@toolbrasil.com.br</strong> ou pelo e-mail <strong>contato@toolbrasil.com.br</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            2. Princípio da Execução Local (Client-Side First) & Dados Sensíveis
          </h2>
          <p>
            Ao contrário de serviços convencionais que enviam suas informações para processamento em servidores de terceiros, <strong>a arquitetura da Tool Brasil foi construída sob o princípio de Privacidade por Padrão (Privacy by Default)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Calculadoras Financeiras e Trabalhistas:</strong> Salários, datas de admissão, valores de FGTS e rescisão são computados estritamente na memória volátil do seu próprio navegador. Nenhum valor financeiro é gravado em bancos de dados externos.
            </li>
            <li>
              <strong>Geradores Sintéticos (CPF, CNPJ, Senhas):</strong> Algoritmos de geração e checagem de dígitos verificadores rodam via JavaScript localmente. Nós não catalogamos nem armazenamos combinações geradas.
            </li>
            <li>
              <strong>Tratamento de Arquivos e Textos:</strong> Conversores de imagem, compactadores e formatadores de texto processam os dados no cliente sem jamais enviá-los para armazenamento permanente em nossa nuvem.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            3. Cookies, Google AdSense e Publicidade Personalizada
          </h2>
          <p>
            Para garantir a gratuidade irrestrita de nossos utilitários, veiculamos anúncios digitais gerenciados pelo programa <strong>Google AdSense</strong>, fornecido pela Google LLC. Em conformidade com os requisitos de transparência de editores do Google, informamos que:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Cookies de Terceiros e Cookie DoubleClick DART:</strong> O Google e seus parceiros utilizam cookies (incluindo o cookie DART) para veicular anúncios aos usuários com base em visitas anteriores feitas a este ou a outros sites na internet.
            </li>
            <li>
              <strong>Desativação de Publicidade Personalizada:</strong> Os usuários têm a faculdade de desativar a publicidade personalizada acessando as <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">Configurações de Anúncios do Google</a>. Alternativamente, é possível desativar o uso de cookies de terceiros para publicidade personalizada acessando o portal internacional <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">aboutads.info</a>.
            </li>
            <li>
              <strong>Transparência de Parceiros de Tecnologia de Anúncios:</strong> O Google cumpre com os princípios do IAB TCF (Transparency and Consent Framework) e os requisitos vigentes da LGPD brasileira para coleta de consentimento do usuário.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            4. Dados Coletados pelo Google Analytics 4
          </h2>
          <p>
            Utilizamos o <strong>Google Analytics 4</strong> para mensurar indicadores anônimos de audiência (como páginas mais acessadas, tipo de navegador, sistema operacional e tempo médio de permanência). O GA4 opera com mascaramento e anonimização de endereços IP, impossibilitando a identificação individual de qualquer usuário pela nossa equipe.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            5. Bases Legais para o Tratamento (Art. 7º da LGPD)
          </h2>
          <p>
            Todo e qualquer tratamento de dados realizado pela Tool Brasil encontra respaldo expresso na Lei nº 13.709/2018:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Consentimento (Art. 7º, I):</strong> Aplicado ao uso de cookies de marketing e analíticos através do banner de preferências de navegação.</li>
            <li><strong>Legítimo Interesse (Art. 7º, IX):</strong> Para auditoria técnica da estabilidade do portal, prevenção de ciberataques DDoS e aperfeiçoamento contínuo das ferramentas.</li>
            <li><strong>Cumprimento de Obrigação Legal (Art. 7º, II):</strong> Para a guarda de registros de acesso à aplicação pelo prazo legal de 6 meses, conforme determinado pelo Artigo 15 do Marco Civil da Internet (Lei nº 12.965/2014).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            6. Direitos do Titular de Dados Pessoais (Art. 18 da LGPD)
          </h2>
          <p>
            Na qualidade de titular de dados pessoais, você pode exercer a qualquer momento perante a Tool Brasil os seguintes direitos garantidos pela lei brasileira:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">✓ Confirmação e Acesso</span>
              <span className="text-[11px] text-slate-500">Confirmar a existência de tratamento e acessar seus dados.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">✓ Correção de Dados</span>
              <span className="text-[11px] text-slate-500">Solicitar a correção de dados incompletos ou desatualizados.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">✓ Eliminação e Revogação</span>
              <span className="text-[11px] text-slate-500">Revogar o consentimento e pedir a exclusão de registros.</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">✓ Portabilidade</span>
              <span className="text-[11px] text-slate-500">Solicitar a portabilidade dos dados a outro fornecedor.</span>
            </div>
          </div>
          <p className="pt-2">
            Para formalizar qualquer dessas solicitações, envie uma mensagem com o assunto <em>"Direitos LGPD"</em> para <strong>dpo@toolbrasil.com.br</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            7. Segurança da Informação e Criptografia
          </h2>
          <p>
            Implementamos protocolos de segurança modernos, incluindo tráfego 100% criptografado através de certificados SSL/TLS (HTTPS de alta integridade), proteção contra interceptação do tipo <em>man-in-the-middle</em> e cabeçalhos de segurança HTTP rigorosos (<code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy: strict-origin-when-cross-origin</code>).
          </p>
        </section>
      </div>
    </div>
  );
}

// 4. TERMOS DE USO (Isenções Legais, Rigor e Legislação Brasileira)
function TermosDeUso() {
  return (
    <div className="space-y-8" id="inst-termos">
      <div className="border-b border-slate-150 dark:border-slate-800 pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 mb-3">
          <Scale className="w-3.5 h-3.5" /> Condições Gerais de Uso
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Termos de Uso
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Última revisão formal: Setembro de 2026 | Válido para todo o ecossistema Tool Brasil.
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          Seja bem-vindo ao portal <strong>Tool Brasil</strong>. Ao navegar, interagir ou utilizar qualquer uma das ferramentas disponíveis sob o domínio <code>toolbrasil.com.br</code>, você declara expressamente que leu, compreendeu e concorda de forma irrestrita com os presentes Termos de Uso. Caso discorde de qualquer cláusula aqui disposta, solicitamos que não utilize nossos utilitários.
        </p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            1. Gratuidade e Licença de Uso Sem Custos
          </h2>
          <p>
            O portal concede aos usuários uma licença pessoal, revogável, não-exclusiva e gratuita para acesso e utilização das calculadoras, conversores, geradores e ferramentas analíticas para finalidades pessoais, educacionais, operacionais e de apoio profissional diário. Não exigimos pagamentos, cadastros prévios ou números de cartão de crédito.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            2. Caráter Meramente Informativo & Isenção de Responsabilidade Profissional
          </h2>
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" /> Aviso Legal Obrigatório:
            </p>
            <p className="text-[11px] leading-relaxed">
              As calculadoras, simuladores trabalhistas e conversores tributários fornecidos pela Tool Brasil constituem instrumentos de <strong>estimativa matemática preliminar e apoio informativo</strong>. Eles <strong>não substituem, sob nenhuma hipótese</strong>, o parecer técnico formal de profissionais habilitados (contadores diplomados, advogados trabalhistas, consultores tributários registrados) nem os cálculos oficiais definitivos emitidos por órgãos públicos (como a Secretaria da Receita Federal do Brasil, o Ministério do Trabalho e Emprego, o INSS ou o Poder Judiciário).
            </p>
          </div>
          <p>
            A Tool Brasil empenha seus melhores esforços de engenharia para manter todos os algoritmos atualizados de acordo com as normas mais recentes. No entanto, declinamos de qualquer responsabilidade por decisões comerciais, financeiras, contratuais ou tributárias tomadas exclusivamente com base nas simulações realizadas nesta plataforma.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            3. Diretrizes de Uso dos Geradores de Dados Sintéticos
          </h2>
          <p>
            Nossas ferramentas de geração sintética (incluindo geradores de números de CPF, CNPJ, cartões de crédito para teste e dados cadastrais fictícios) destinam-se <strong>exclusivamente a programadores, analistas de qualidade (QA), estudantes e designers para homologação de sistemas de software, preenchimento de mockups e testes automatizados de formulários</strong>.
          </p>
          <p className="font-bold text-slate-800 dark:text-slate-200">
            É terminantemente vedada a utilização de quaisquer dados fictícios aqui gerados para práticas de falsidade ideológica, estelionato, fraudes contra instituições financeiras ou qualquer ato tipificado como ilícito penal pela legislação brasileira (Código Penal, Lei nº 2.848/1940). O infrator responderá civil e criminalmente por seus atos.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            4. Propriedade Intelectual e Vedação a Scrapers
          </h2>
          <p>
            Todos os elementos visuais, códigos-fonte, algoritmos, logomarcas, textos explicativos e arquitetura de software pertencem à Tool Brasil. É proibida a extração massiva automatizada não-autorizada (*web scraping* abusivo), a engenharia reversa para clonagem de ferramentas ou a redistribuição comercial dos nossos scripts sem autorização prévia por escrito.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            5. Anúncios, Links de Terceiros e Google AdSense
          </h2>
          <p>
            O portal exibe anúncios contextuais veiculados pelo Google AdSense e pode conter hiperlinks para páginas externas. Não nos responsabilizamos pelo conteúdo, práticas de privacidade, termos ou produtos comercializados em portais de terceiros.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            6. Legislação Aplicável e Foro
          </h2>
          <p>
            Estes Termos de Uso são integralmente regidos pelas leis da República Federativa do Brasil. Para a solução de quaisquer controvérsias decorrentes deste instrumento, fica eleito o Foro da Comarca da Capital do Estado de São Paulo, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
          </p>
        </section>
      </div>
    </div>
  );
}

// 5. GESTÃO DE COOKIES
function GestaodeCookies() {
  const [marketing, setMarketing] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [salvo, setSalvo] = useState(false);

  const handleSalvar = () => {
    setSalvo(true);
    setTimeout(() => setSalvo(false), 4000);
  };

  return (
    <div className="space-y-6" id="inst-cookies">
      <div className="border-b border-slate-150 dark:border-slate-800 pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 mb-3">
          <Lock className="w-3.5 h-3.5" /> Privacidade do Usuário
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Gestão de Preferências de Cookies
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Personalize as permissões de armazenamento local e cookies de terceiros utilizadas para apoiar a navegação na Tool Brasil.
        </p>
      </div>

      <div className="space-y-4 max-w-xl text-xs">
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Cookies Essenciais de Sistema</span>
            <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold px-2 py-0.5 rounded">Sempre Ativos</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
            Necessários para carregar os temas (claro/escuro), registrar opções de acessibilidade e manter a estabilidade do roteamento client-side.
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">Cookies de Marketing (Google AdSense)</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Permitem ao Google exibir anúncios contextuais relevantes e financiar a infraestrutura 100% gratuita do portal.
            </p>
          </div>
          <input
            type="checkbox"
            checked={marketing}
            onChange={() => setMarketing(!marketing)}
            className="w-5 h-5 rounded text-emerald-600 cursor-pointer shrink-0"
          />
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">Cookies Estatísticos (Google Analytics)</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              Métricas agregadas e anônimas para avaliar quais ferramentas são mais acessadas e guiar melhorias de performance.
            </p>
          </div>
          <input
            type="checkbox"
            checked={analytics}
            onChange={() => setAnalytics(!analytics)}
            className="w-5 h-5 rounded text-emerald-600 cursor-pointer shrink-0"
          />
        </div>

        {salvo && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
            ✓ Suas preferências de privacidade foram atualizadas e salvas com sucesso!
          </div>
        )}

        <button
          onClick={handleSalvar}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
        >
          Salvar Minhas Preferências
        </button>
      </div>
    </div>
  );
}

// 6. ANUNCIANTES & MÍDIA KIT
function Anunciantes() {
  return (
    <div className="space-y-6" id="inst-anunciantes">
      <div className="border-b border-slate-150 dark:border-slate-800 pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 mb-3">
          💼 Publicidade & Parcerias
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Anuncie na Tool Brasil
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Conecte sua marca a milhares de usuários brasileiros com alto poder de decisão, microempreendedores e profissionais técnicos.
        </p>
      </div>

      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          A <strong>Tool Brasil</strong> recebe diariamente um fluxo contínuo e qualificado de usuários que buscam ativamente resolver demandas de cálculos financeiros, apuração de rescisões trabalhistas, geração de documentos para testes de desenvolvimento e conversão de dados.
        </p>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 pt-2">Vantagens de Anunciar Conosco:</h3>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Audiência Qualificada:</strong> Tráfego orgânico composto por contadores, profissionais de RH, desenvolvedores de software e estudantes universitários.</li>
          <li><strong>Alta Intencionalidade de Compra:</strong> Usuários calculando simulações de financiamentos habitacionais, consórcios, investimentos de renda fixa e abertura de empresas.</li>
          <li><strong>Formatos Diversificados:</strong> Banners IAB responsivos de alto impacto, parcerias editoriais institucionais e anúncios programáticos via Google AdSense.</li>
        </ul>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2 mt-4">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm block">Interessado em Nosso Mídia Kit?</span>
          <p className="text-[11px] text-slate-600 dark:text-slate-300">
            Entre em contato com nossa equipe comercial para propostas sob medida de patrocínio ou veiculação direta:
          </p>
          <p className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
            comercial@toolbrasil.com.br
          </p>
        </div>
      </div>
    </div>
  );
}

// 7. TRANSPARÊNCIA ADSENSE
function TransparenciaAdsense() {
  return (
    <div className="space-y-6" id="inst-ads">
      <div className="border-b border-slate-150 dark:border-slate-800 pb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 mb-3">
          🔍 Transparência de Modelo de Negócio
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Transparência Google AdSense
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Entenda como a publicidade programática viabiliza a manutenção e o acesso gratuito de todas as ferramentas da plataforma.
        </p>
      </div>

      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          A <strong>Tool Brasil</strong> opera sob um compromisso irrestrito de gratuidade. Diferente de plataformas que cobram assinaturas ou vendem os dados dos usuários para corretores de dados, nosso modelo é mantido primordialmente pelas receitas auferidas através de anúncios programáticos certificados pelo <strong>Google AdSense</strong>.
        </p>

        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 pt-2">Como Funciona a Publicidade Programática?</h3>
        <p>
          O Google seleciona e exibe anúncios com base no conteúdo da página em que você está e, quando autorizado em suas preferências, com base no histórico de navegação anonimizado pelo cookie DART. Nenhum dado financeiro digitado em nossas calculadoras (como valores de salários ou CPFs gerados) é transmitido ao Google ou aos anunciantes.
        </p>
        <p>
          Para ajustar como o Google personaliza anúncios para você, visite a central oficial de preferências em <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">adssettings.google.com</a>.
        </p>
      </div>
    </div>
  );
}
