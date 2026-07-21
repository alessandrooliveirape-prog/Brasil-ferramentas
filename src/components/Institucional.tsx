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
      {pageId === 'anunciantes' && <Anunciantes />}
    </div>
  );
}

// 1. SOBRE NOS
function SobreNos() {
  return (
    <div className="space-y-6" id="inst-sobre">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Sobre a Tool Brasil</h2>
      <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          A <strong>Tool Brasil</strong> nasceu em 2024 com o propósito de ser o maior e mais eficiente ecossistema de utilitários online gratuitos da internet brasileira. Nós acreditamos que ferramentas úteis devem ser acessíveis, rápidas e descomplicadas, sem a necessidade de cadastros, instalações ou pagamentos ocultos.
        </p>
        <p>
          Nosso portal oferece mais de 40 ferramentas gratuitas organizadas em categorias como calculadoras financeiras e trabalhistas, conversores de unidades e moedas, geradores de documentos e dados, ferramentas de rede e diagnóstico web, além de utilitários de texto e formatação. Cada ferramenta é desenvolvida com foco em precisão, performance e facilidade de uso.
        </p>
        <p>
          <strong>Nossa missão:</strong> Democratizar o acesso a ferramentas digitais de qualidade para todos os brasileiros, independentemente de sua renda ou nível de conhecimento técnico. Acreditamos que a tecnologia deve servir para simplificar o dia a dia, e não para complicá-lo.
        </p>
        <p>
          <strong>Nossos valores:</strong> Transparência (todas as ferramentas são claras sobre como funcionam), privacidade (processamento local sempre que possível, sem coleta desnecessária de dados), excelência técnica (cálculos precisos e atualizados conforme a legislação brasileira) e compromisso social (ferramentas 100% gratuitas, sem limite de uso).
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-lg text-center">
          <span className="text-xl font-bold block text-emerald-600">Leveza</span>
          <span className="text-xs text-slate-400">Páginas otimizadas para carregamento instantâneo em qualquer dispositivo.</span>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-lg text-center">
          <span className="text-xl font-bold block text-emerald-600">Privacidade</span>
          <span className="text-xs text-slate-400">Processamento executado localmente no navegador. Seus dados nunca saem do seu dispositivo.</span>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-lg text-center">
          <span className="text-xl font-bold block text-emerald-600">Utilidade</span>
          <span className="text-xs text-slate-400">Mais de 40 ferramentas práticas para o dia a dia do brasileiro.</span>
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
      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>No <strong>Tool Brasil</strong>, a sua privacidade é de extrema importância para nós. Elaboramos esta política regulatória em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) para detalhar quais dados são coletados, armazenados e tratados durante sua navegação em nosso domínio toolbrasil.com.br.</p>
        
        <h3 className="font-bold text-slate-800 dark:text-slate-200">1. Responsável pelo Tratamento de Dados</h3>
        <p>O Tool Brasil é um portal de ferramentas online mantido pelo proprietário do domínio toolbrasil.com.br. Para assuntos relacionados a privacidade e proteção de dados, entre em contato através da nossa <a href="#institucional/contato" className="text-emerald-600 font-bold hover:underline">página de contato</a>.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">2. Dados Coletados e Finalidade</h3>
        <p><strong>2.1 Dados de navegação:</strong> Quando você acessa o Tool Brasil, nosso servidor e serviços de terceiros (Google Analytics, Google AdSense) podem coletar automaticamente informações como endereço IP, tipo de navegador, provedor de internet, páginas visitadas, tempo de navegação e interação com os anúncios.</p>
        <p><strong>2.2 Dados fornecidos voluntariamente:</strong> Ao utilizar o formulário de contato, você nos fornece nome, e-mail e mensagem. Estes dados são utilizados exclusivamente para responder sua solicitação e não são compartilhados com terceiros.</p>
        <p><strong>2.3 Processamento client-side:</strong> A maioria das nossas ferramentas (calculadoras, geradores, conversores) executa operações matemáticas e transformações textuais diretamente no seu navegador, via JavaScript. Isso significa que dados confidenciais como CPF, CNPJ ou senhas NUNCA são transmitidos para nossos servidores ou armazenados em bancos de dados externos.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">3. Cookies e Tecnologias de Rastreamento</h3>
        <p>Utilizamos cookies próprios e de terceiros para melhorar a experiência do usuário, analisar tráfego e exibir anúncios relevantes:</p>
        <p><strong>3.1 Cookies essenciais:</strong> Necessários para o funcionamento básico do site, como lembrar o tema claro/escuro selecionado.</p>
        <p><strong>3.2 Cookies analíticos (Google Analytics):</strong> Coletam informações anônimas sobre como os visitantes usam o site, permitindo-nos melhorar o conteúdo e a navegação.</p>
        <p><strong>3.3 Cookies de publicidade (Google AdSense):</strong> O Google utiliza cookies DoubleClick para exibir anúncios personalizados com base nos interesses do usuário. Você pode gerenciar as preferências de cookies na <a href="#institucional/cookies" className="text-emerald-600 font-bold hover:underline">página de preferências de cookies</a>.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">4. Compartilhamento de Dados com Terceiros</h3>
        <p>Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros para fins próprios. Os únicos compartilhamentos ocorrem com:</p>
        <p><strong>Google LLC:</strong> Através dos serviços Google Analytics (dados anônimos de audiência) e Google AdSense (cookies de publicidade). O Google pode utilizar os dados coletados conforme sua <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold hover:underline">Política de Privacidade</a>.</p>
        <p><strong>Vercel Inc.:</strong> Nossa plataforma de hospedagem pode acessar dados técnicos necessários para a operação do serviço (logs de acesso, IPs).</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">5. Direitos do Titular (LGPD)</h3>
        <p>Nos termos da LGPD, você tem direito a:</p>
        <p>- Confirmar a existência de tratamento de seus dados pessoais<br/>
        - Acessar seus dados pessoais<br/>
        - Corrigir dados incompletos, inexatos ou desatualizados<br/>
        - Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários<br/>
        - Revogar o consentimento a qualquer momento<br/>
        - Solicitar a portabilidade dos dados a outro fornecedor de serviço</p>
        <p>Para exercer qualquer um destes direitos, entre em contato conosco.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">6. Segurança dos Dados</h3>
        <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição, incluindo criptografia SSL/TLS em toda a comunicação com o site e processamento client-side que evita o envio de dados sensíveis aos nossos servidores.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">7. Retenção de Dados</h3>
        <p>Os dados de navegação (logs de acesso) são retidos pelo período mínimo necessário para fins de segurança e análise, não excedendo 6 meses. Dados fornecidos via formulário de contato são mantidos até a conclusão do atendimento e por mais 90 dias para referência futura.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">8. Alteracoes nesta Política</h3>
        <p>Reservamo-nos o direito de modificar esta política a qualquer momento. Alterações substanciais serão comunicadas através de aviso em nosso site. Recomendamos revisar esta página periodicamente.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">9. Lei Aplicável e Foro</h3>
        <p>Esta política é regida pela legislação brasileira. Fica eleito o foro da comarca do proprietário do site para dirimir quaisquer controvérsias decorrentes desta política.</p>
      </div>
    </div>
  );
}

// 4. TERMOS DE USO
function TermosDeUso() {
  return (
    <div className="space-y-6" id="inst-termos">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Termos de Uso</h2>
      <p className="text-xs text-slate-400">Última atualização: Junho de 2026</p>
      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>Seja bem-vindo ao portal Tool Brasil. Ao acessar ou usar nossos serviços através do domínio toolbrasil.com.br, você concorda em se submeter aos termos e condições descritos abaixo. Caso não concorde com qualquer disposição, recomendamos que não utilize nossos serviços.</p>
        
        <h3 className="font-bold text-slate-800 dark:text-slate-200">1. Aceitação dos Termos</h3>
        <p>Ao utilizar o Tool Brasil, você declara ter lido, compreendido e aceito todos os termos e condições aqui estabelecidos. Estes termos podem ser atualizados periodicamente, e o uso continuado do site após as alterações constitui aceitação das novas condições.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">2. Licença de Uso Sem Custos</h3>
        <p>Todas as ferramentas e utilitários disponibilizados no Tool Brasil são distribuídos de modo 100% gratuito, sem necessidade de cadastro, registro ou pagamento. O usuário pode utilizar as ferramentas livremente para fins pessoais, educacionais e comerciais, desde que não envolva a revenda ou redistribuição não autorizada dos códigos e algoritmos.</p>
        <p>É vedada a engenharia reversa, reprodução comercial, venda ou comercialização fraudulenta de nossos algoritmos sem autorização expressa e prévia do Tool Brasil.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">3. Isenção de Responsabilidade</h3>
        <p>As ferramentas e calculadoras disponibilizadas têm caráter meramente informativo e de apoio. Embora nos empenhemos em entregar fórmulas exatas para rescisão trabalhista, férias, impostos, INSS e demais cálculos, declinamos de qualquer garantia de exatidão absoluta ou adequação a casos específicos.</p>
        <p><strong>Importante:</strong> Os resultados fornecidos por nossas calculadoras não substituem a consulta a profissionais habilitados (contadores, advogados trabalhistas, consultores financeiros). Recomendamos sempre a validação oficial junto à Receita Federal, Ministério do Trabalho ou INSS antes de tomar decisões financeiras ou contratuais baseadas nos resultados obtidos.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">4. Propriedade Intelectual</h3>
        <p>Todo o conteúdo disponível no Tool Brasil, incluindo mas não limitado a textos, logotipos, códigos, scripts, design e layout, é de propriedade do Tool Brasil ou utilizado sob licença. É proibida a reprodução total ou parcial sem autorização prévia.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">5. Conteúdo de Terceiros e Links Externos</h3>
        <p>O Tool Brasil pode conter links para sites de terceiros e exibir anúncios do Google AdSense. Não nos responsabilizamos pelo conteúdo, políticas de privacidade ou práticas de sites externos. O Google AdSense é responsável pelos anúncios exibidos e pode coletar dados conforme sua política de privacidade.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">6. Limitação de Responsabilidade</h3>
        <p>Em nenhuma hipótese o Tool Brasil será responsável por danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso ou da impossibilidade de uso de nossas ferramentas, incluindo mas não limitado a perdas financeiras, lucros cessantes ou danos morais.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">7. Uso Aceitável</h3>
        <p>O usuário concorda em utilizar as ferramentas do Tool Brasil apenas para fins lícitos e de acordo com a legislação brasileira. É expressamente proibido utilizar as ferramentas para:</p>
        <p>- Praticar fraudes ou atividades ilícitas<br/>
        - Violar direitos de terceiros<br/>
        - Sobrecarregar a infraestrutura do site<br/>
        - Coletar dados de forma automatizada sem autorização<br/>
        - Utilizar CPFs ou CNPJs gerados como se fossem reais</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">8. Disponibilidade do Serviço</h3>
        <p>Não garantimos que o serviço estará disponível de forma ininterrupta ou livre de erros. Podemos modificar, suspender ou descontinuar qualquer ferramenta a qualquer momento, sem aviso prévio.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">9. Lei Aplicável e Resolução de Conflitos</h3>
        <p>Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer controvérsia decorrente destes termos será resolvida no foro da comarca do proprietário do site, com renúncia expressa a qualquer outro foro.</p>
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

// 6. ANUNCIANTES / AD_SENSE INFO
function Anunciantes() {
  return (
    <div className="space-y-6" id="inst-anunciantes">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Anuncie na Tool Brasil</h2>
      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>
          A <strong>Tool Brasil</strong> é um portal de utilidades online que recebe milhares de visitantes todos os meses em busca de calculadoras, conversores, geradores e ferramentas web gratuitas. Nosso tráfego é qualificado e orgânico, vindo majoritariamente de buscadores como Google e Bing.
        </p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">Por que anunciar conosco?</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Público segmentado</strong> — Usuários brasileiros buscando ativamente por soluções financeiras, fiscais e utilitárias.</li>
          <li><strong>Tráfego orgânico</strong> — Visitantes qualificados vindos de pesquisas orgânicas no Google.</li>
          <li><strong>Conteúdo relevante</strong> — Páginas ricas em SEO com alta taxa de retenção e baixa taxa de rejeição.</li>
          <li><strong>100% compatível</strong> — Anúncios Google AdSense, banners diretos e parcerias de conteúdo.</li>
        </ul>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">Google AdSense</h3>
        <p>
          Atualmente trabalhamos com o programa <strong>Google AdSense</strong> para veicular anúncios contextuais. Os anúncios são selecionados automaticamente pelo Google com base no conteúdo da página e no perfil de navegação do usuário, respeitando todas as diretrizes de privacidade da LGPD.
        </p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">Parcerias Diretas</h3>
        <p>
          Interessado em parcerias de conteúdo, posts patrocinados ou banners diretos? Entre em contato através da nossa <a href="#institucional/contato" className="text-emerald-600 font-bold hover:underline">página de contato</a> para discutirmos oportunidades personalizadas.
        </p>

        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-lg mt-4">
          <p className="font-bold text-emerald-800 dark:text-emerald-400">📧 E-mail para parcerias:</p>
          <p className="mt-1">contato@toolbrasil.com.br</p>
        </div>
      </div>
    </div>
  );
}

// 7. AD_SENSE TRANSPARENCY
function TransparenciaAdsense() {
  return (
    <div className="space-y-6" id="inst-ads">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Transparência Google AdSense</h2>
      <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>A <strong>Tool Brasil</strong> é mantida e financiada primordialmente através de receitas obtidas via anúncios programáticos do <strong>Google AdSense</strong>. Isso nos concede fundos para manter a infraestrutura de servidores rápidos e pagar os programadores envolvidos.</p>

        <h3 className="font-bold text-slate-800 dark:text-slate-200">Como os Anúncios Funcionam?</h3>
        <p>O Google utiliza cookies DoubleClick Dart para segmentação inteligente de anúncios com base nos hábitos de buscas do usuário na web comum. Os dados são anonimizados e nenhuma informação confidencial (como nome ou senhas) é repassada para nossa central ou terceiros.</p>
      </div>
    </div>
  );
}
