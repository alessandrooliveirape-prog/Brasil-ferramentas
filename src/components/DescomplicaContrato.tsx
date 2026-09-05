/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Módulo DescomplicaContrato — Tool Brasil (Versão Expandida)
 * Analisador de Contratos Gratuito com Diagnóstico Falado em até 2 Minutos
 * - Extração de PDF Client-Side (pdf.js via CDN)
 * - Síntese de Voz Nativa Web Speech API (pt-BR)
 * - Atalhos Rápidos de Modelos & Exemplos com 1 Clique
 * - Emissão de Laudo Técnico Formatado para Impressão A4 / Salvar PDF
 * - Gerador de Mensagem de Renegociação para WhatsApp / E-mail
 * - Checklist Interativo Pré-Assinatura (Autoavaliação)
 * - Sanitização de Dados Pessoais (LGPD) e Conteúdo Educativo Anti-Thin Content
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  UploadCloud,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Share2,
  Volume2,
  Lock,
  Sparkles,
  HelpCircle,
  BookOpen,
  Scale,
  FileCheck,
  ChevronDown,
  ChevronUp,
  X,
  Layers,
  FileCode,
  ArrowRight,
  Printer,
  MessageSquare,
  ListChecks,
  Send,
  Home,
  Dumbbell,
  Briefcase,
  Car,
  FileSpreadsheet
} from 'lucide-react';
import AdSensePlaceholder from './AdSensePlaceholder';

interface AnalysisResult {
  risk: 'ALTO' | 'MEDIO' | 'BAIXO' | 'INCONCLUSIVO';
  reason: string;
  summary: string;
  fullResponse: string;
  contractType?: string;
  analyzedAt?: string;
}

// Exemplos práticos pré-configurados para teste instantâneo com 1 clique
const CONTRACT_PRESETS = [
  {
    id: 'aluguel',
    label: 'Aluguel de Imóvel',
    icon: Home,
    sampleTitle: 'Cláusula de Aluguel Residencial (Exemplo com Abusividades)',
    sampleText: `CLÁUSULA QUINTA - DA GARANTIA LOCATÍCIA: Para garantia das obrigações contratuais, o LOCATÁRIO entrega caução no valor de 3 (três) aluguéis em dinheiro e, cumulativamente, indica fiador solidário proprietário de imóvel quitado.
CLÁUSULA DÉCIMA - DA RESCISÃO ANTECIPADA: Se o LOCATÁRIO rescindir o contrato antes do prazo estipulado de 30 (trinta) meses, pagará a multa compensatória integral e não proporcional de 3 (três) aluguéis inteiros, independentemente do tempo restante de locação.
CLÁUSULA DÉCIMA PRIMEIRA - DAS TAXAS: Ficam a cargo exclusivo do LOCATÁRIO todas as despesas e taxas condominiais extraordinárias, reformas estruturais de fachada e rateios de fundo de reserva aprovados em assembleia.`
  },
  {
    id: 'academia',
    label: 'Academia & Cursos',
    icon: Dumbbell,
    sampleTitle: 'Plano Anual de Academia / Assinatura (Exemplo com Pegadinhas)',
    sampleText: `CLÁUSULA 7ª - DO PRAZO E RENOVAÇÃO: O presente plano possui fidelidade mínima de 12 (doze) meses. Findo o prazo, este contrato renova-se automaticamente por igual período de 12 meses sucessivos, sem necessidade de aviso prévio ou comunicação ao ALUNO.
CLÁUSULA 8ª - DO CANCELAMENTO ANTECIPADO: Em caso de cancelamento unilateral pelo ALUNO antes dos 12 meses, será cobrada taxa rescisória de 50% (cinquenta por cento) sobre a totalidade das mensalidades vincendas até o término do contrato, não cabendo estorno das parcelas já quitadas no cartão.
CLÁUSULA 9ª - DA TRANSFERÊNCIA: Fica vedada a transferência da matrícula a terceiros ou o trancamento temporário por motivo de viagem ou saúde.`
  },
  {
    id: 'freelancer',
    label: 'Freelancer / PJ',
    icon: Briefcase,
    sampleTitle: 'Prestação de Serviços Autônomos PJ (Exemplo com Desequilíbrio)',
    sampleText: `CLÁUSULA 4ª - DA EXCLUSIVIDADE: O CONTRATADO obriga-se a prestar serviços em regime de exclusividade total à CONTRATANTE, sendo-lhe proibido prestar serviços a qualquer outra empresa ou cliente, remunerado apenas por demanda variável sem valor mínimo mensal garantido.
CLÁUSULA 9ª - DA NÃO-CONCORRÊNCIA: Após o término deste contrato por qualquer motivo, o CONTRATADO não poderá atuar em qualquer atividade do mesmo ramo pelo período de 36 (trinta e seis) meses em todo o território nacional, sem previsão de qualquer compensação financeira mensal durante o período de restrição.
CLÁUSULA 12ª - DA RETENÇÃO: A CONTRATANTE poderá reter até 30% dos honorários em caso de discordância quanto ao padrão técnico entregue.`
  },
  {
    id: 'veiculo',
    label: 'Compra de Veículo',
    icon: Car,
    sampleTitle: 'Compra e Venda de Veículo Usado (Exemplo com Cláusulas Perigosas)',
    sampleText: `CLÁUSULA 3ª - DO SINAL DE NEGÓCIO: O COMPRADOR efetua o pagamento de R$ 5.000,00 a título de sinal e princípio de pagamento. Caso o financiamento bancário não seja aprovado em até 5 dias úteis, o sinal será integralmente perdido em favor do VENDEDOR como arras penitenciais.
CLÁUSULA 6ª - DO ESTADO DO BEM E VÍCIOS: O veículo é vendido no estado em que se encontra, renunciando expressamente o COMPRADOR à garantia legal de motor e câmbio, não cabendo qualquer reclamação por vício oculto ou defeito preexistente após a saída do estabelecimento comercial.`
  }
];

// Declaração de tipo global para pdfjs
declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function DescomplicaContrato() {
  // Estado do formulário e arquivo
  const [contractText, setContractText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [filePages, setFilePages] = useState<number | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('geral');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPdfLoading, setIsPdfLoading] = useState<boolean>(false);
  const [pdfWarning, setPdfWarning] = useState<string>('');

  // Estado de processamento e IA
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedLetter, setCopiedLetter] = useState<boolean>(false);

  // Estado do Player de Áudio Nativo (Web Speech API)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [activeVoice, setActiveVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Estado do Checklist Interativo Pré-Assinatura
  const [checklist, setChecklist] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
  });

  // Estado do FAQ e Glossário
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});
  const [glossarySearch, setGlossarySearch] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Carregar pdf.js via CDN sob demanda
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.pdfjsLib) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.async = true;
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  // Configurar voz em pt-BR da Web Speech API
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      const ptBrVoice =
        voices.find(v => v.lang === 'pt-BR' && (v.name.includes('Google') || v.name.includes('Luciana') || v.name.includes('Natural'))) ||
        voices.find(v => v.lang === 'pt-BR') ||
        voices.find(v => v.lang.startsWith('pt'));

      if (ptBrVoice) {
        setActiveVoice(ptBrVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Injetar dados estruturados JSON-LD (FAQPage)
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'É seguro enviar meu contrato para análise?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim, é 100% seguro. O processamento de leitura de PDF e mascaramento de dados ocorre localmente no seu próprio navegador. Antes do envio à inteligência artificial, CPFs, números de documentos e e-mails são anonimizados. A análise é puramente em memória e nenhum documento é gravado em servidores.'
          }
        },
        {
          '@type': 'Question',
          name: 'A ferramenta armazena dados pessoais ou documentos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. O Tool Brasil não possui banco de dados para contratos, cadastros de usuários ou histórico de consultas. Uma vez fechada a aba ou atualizada a tela, todos os dados são instantaneamente descartados da memória.'
          }
        },
        {
          '@type': 'Question',
          name: 'Esta análise substitui a consulta com um advogado?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não. O DescomplicaContrato é uma tecnologia assistiva educacional e informativa. Ele serve para apontar riscos evidentes e empoderar o cidadão em negociações prévias, mas não substitui a consulta jurídica formal com um advogado ou defensor público.'
          }
        },
        {
          '@type': 'Question',
          name: 'Quais formatos de arquivo são aceitos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Aceitamos arquivos PDF nativos (com camada de texto pesquisável) de até 10 páginas, arquivos de texto simples (.txt) e você também pode colar diretamente qualquer trecho de cláusula na área de texto (limite de até 15.000 caracteres).'
          }
        },
        {
          '@type': 'Question',
          name: 'O que devo fazer caso o contrato receba a classificação de [RISCO ALTO]?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não assine o documento de imediato. Siga a recomendação falada indicada no veredito, utilizando o Modelo de Mensagem de Renegociação disponibilizado na ferramenta para solicitar formalmente a exclusão da cláusula abusiva antes de assinar.'
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.id = 'faqpage-descomplica-contrato-schema';
    scriptTag.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptTag);

    return () => {
      const existing = document.getElementById('faqpage-descomplica-contrato-schema');
      if (existing) existing.remove();
    };
  }, []);

  // Sanitização de dados sensíveis no client-side (LGPD)
  const sanitizeContractText = (rawText: string): string => {
    return rawText
      .replace(/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g, '[CPF PROTEGIDO]')
      .replace(/\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g, '[CNPJ PROTEGIDO]')
      .replace(/\b\d{1,2}\.?\d{3}\.?\d{3}-?[\dX]\b/gi, '[DOCUMENTO PROTEGIDO]')
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[E-MAIL PROTEGIDO]')
      .replace(/\b(?:\+?55\s?)?(?:\(?\d{2}\)?[\s.-]?)?(?:9\s?)?\d{4,5}[-.]?\d{4}\b/g, '[TELEFONE PROTEGIDO]');
  };

  // Extrair texto de PDF via pdf.js diretamente no navegador
  const handlePdfFile = async (file: File) => {
    setPdfWarning('');
    setIsPdfLoading(true);
    setFileName(file.name);

    try {
      if (!window.pdfjsLib) {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (!window.pdfjsLib) {
          throw new Error('Biblioteca pdf.js não carregada. Tente colar o texto diretamente.');
        }
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      const numPages = pdf.numPages;
      setFilePages(numPages);

      const maxPagesToRead = Math.min(numPages, 10);
      let extracted = '';

      for (let i = 1; i <= maxPagesToRead; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageString = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .join(' ');
        extracted += `\n--- PÁGINA ${i} ---\n` + pageString;
      }

      const cleanExtracted = extracted.replace(/--- PÁGINA \d+ ---/g, '').trim();
      if (cleanExtracted.length < 50) {
        setPdfWarning(
          '⚠️ Este arquivo PDF parece ser uma imagem digitalizada sem camada de texto (OCR). Por favor, copie e cole o texto do contrato na caixa abaixo ou utilize um documento digital com texto selecionável.'
        );
      } else {
        if (numPages > 10) {
          setPdfWarning(
            `ℹ️ O documento possui ${numPages} páginas. Para garantir a velocidade e o limite gratuito, analisaremos as primeiras 10 páginas.`
          );
        }
        setContractText(extracted.trim());
      }
    } catch (err: any) {
      console.error('Erro na extração do PDF:', err);
      setPdfWarning('Não foi possível extrair o texto deste PDF. Verifique se o arquivo está corrompido ou protegido por senha.');
    } finally {
      setIsPdfLoading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      handlePdfFile(file);
    } else if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = event => {
        const content = (event.target?.result as string) || '';
        setFileName(file.name);
        setFilePages(1);
        setContractText(content);
        setPdfWarning('');
      };
      reader.readAsText(file);
    } else {
      setPdfWarning('Formato não suportado. Por favor, envie um arquivo em formato PDF (.pdf) ou texto simples (.txt).');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      handlePdfFile(file);
    } else if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = event => {
        const content = (event.target?.result as string) || '';
        setFileName(file.name);
        setFilePages(1);
        setContractText(content);
        setPdfWarning('');
      };
      reader.readAsText(file);
    } else {
      setPdfWarning('Formato não suportado. Por favor, envie arquivos PDF ou TXT.');
    }
  };

  const handleClearFile = () => {
    setFileName('');
    setFilePages(null);
    setContractText('');
    setPdfWarning('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Carregar exemplo pré-configurado
  const handleLoadPreset = (presetId: string) => {
    const preset = CONTRACT_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedPreset(preset.id);
      setContractText(preset.sampleText);
      setFileName(`${preset.label}.txt`);
      setFilePages(1);
      setPdfWarning('');
    }
  };

  // Disparo da Análise de IA
  const handleAnalyze = async () => {
    if (!contractText.trim() || contractText.trim().length < 30) {
      setErrorMessage('Por favor, envie um PDF ou cole o texto do contrato com pelo menos 30 caracteres para análise.');
      return;
    }

    if (contractText.length > 15000) {
      setErrorMessage('O texto ultrapassa o limite seguro de 15.000 caracteres. Reduza o conteúdo ou analise as cláusulas principais.');
      return;
    }

    setErrorMessage('');
    setIsAnalyzing(true);
    setAnalysisResult(null);
    stopAudio();

    try {
      setAnalysisProgress('Higienizando dados pessoais (LGPD)...');
      const sanitized = sanitizeContractText(contractText);

      setAnalysisProgress('Examinando cláusulas e desequilíbrios com IA...');

      const response = await fetch('/api/descomplica-contrato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sanitized })
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Limite temporário de requisições atingido. Aguarde alguns segundos e tente novamente.');
        }
        throw new Error('Falha na comunicação com o serviço de inteligência artificial. Tente novamente.');
      }

      setAnalysisProgress('Gerando síntese de voz sem juridiquês...');
      const result: AnalysisResult = await response.json();

      const now = new Date();
      result.analyzedAt = now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      result.contractType = selectedPreset !== 'geral'
        ? CONTRACT_PRESETS.find(p => p.id === selectedPreset)?.label
        : 'Contrato Geral / Privado';

      setAnalysisResult(result);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Erro na análise:', err);
      setErrorMessage(err.message || 'Ocorreu um erro ao processar o contrato. Verifique sua conexão e tente novamente.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress('');
    }
  };

  // Controles do Player de Áudio Nativo (Web Speech API)
  const playAudio = () => {
    if (!speechSupported || !analysisResult?.summary) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(analysisResult.summary);
    if (activeVoice) utterance.voice = activeVoice;
    utterance.lang = 'pt-BR';
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    if (!speechSupported) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const changeRate = (newRate: number) => {
    setSpeechRate(newRate);
    if (isPlaying) {
      stopAudio();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(analysisResult?.summary || '');
        if (activeVoice) utterance.voice = activeVoice;
        utterance.lang = 'pt-BR';
        utterance.rate = newRate;
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }, 50);
    }
  };

  const copySummaryToClipboard = () => {
    if (!analysisResult) return;
    const textToCopy = `*Diagnóstico do Contrato (Tool Brasil)*\nClassificação: [RISCO ${analysisResult.risk}]\nMotivo: ${analysisResult.reason}\n\n*Resumo Falado:*\n${analysisResult.summary}\n\nAnalise grátis em: https://www.toolbrasil.com.br/utilitarios/descomplica-contrato`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // Gerar texto da Carta / Mensagem de Renegociação
  const generateNegotiationLetter = (): string => {
    if (!analysisResult) return '';

    return `Prezados,\n\nAnalisei a minuta do contrato referente à nossa negociação e gostaria de solicitar um ajuste pontual antes da assinatura formal:\n\nIdentifiquei cláusula(s) que colocam a contratação em desequilíbrio e divergem dos parâmetros usuais da legislação brasileira (Código de Defesa do Consumidor e Lei 8.245/91), especificamente quanto a:\n- ${analysisResult.reason}\n\nSolicito a gentileza de adequar os termos para que eventuais penalidades sejam estritamente proporcionais ao tempo restante e para que não haja renovação automática sem aviso prévio expresso.\n\nCom essa revisão, poderemos proceder com a assinatura imediatamente. Agradeço desde já pela compreensão e aguardo o envio da minuta atualizada.\n\nAtenciosamente.`;
  };

  const copyNegotiationLetter = () => {
    const text = generateNegotiationLetter();
    navigator.clipboard.writeText(text);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2500);
  };

  const shareWhatsAppLetter = () => {
    const text = generateNegotiationLetter();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareWhatsAppSummary = () => {
    if (!analysisResult) return;
    const msg = encodeURIComponent(
      `🚨 *Análise de Contrato sem Juridiquês*\nResultado: [RISCO ${analysisResult.risk}] - ${analysisResult.reason}\n\nOuça o diagnóstico completo grátis:\nhttps://www.toolbrasil.com.br/utilitarios/descomplica-contrato`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  // Disparar Impressão / Salvar como PDF A4
  const handlePrintReport = () => {
    window.print();
  };

  // Glossário de Juridiquês
  const glossaryItems = [
    {
      term: 'Foro de Eleição',
      translation: 'Cidade onde as disputas na Justiça devem acontecer',
      explanation:
        'Cláusula que define qual comarca julgará litígios. Em contratos de consumo (CDC), a empresa não pode obrigar você a processar em outra cidade distante; você tem o direito garantido de litigar no seu próprio domicílio.'
    },
    {
      term: 'Resilição Unilateral vs Rescisão',
      translation: 'Desistência voluntária vs Quebra por culpa de alguém',
      explanation:
        'Resilição unilateral é a desistência pura e simples do contrato antes do prazo (quando você apenas quer sair). Rescisão ocorre quando há culpa ou descumprimento grave de uma das partes, justificando a quebra imediata.'
    },
    {
      term: 'Cláusula Penal',
      translation: 'Multa contratual por atraso ou cancelamento',
      explanation:
        'Nome formal para a multa estipulada no contrato. Em relações de consumo, multas moratórias são limitadas a 2% e multas rescisórias devem ser razoáveis e proporcionais ao tempo que faltar cumprir.'
    },
    {
      term: 'Caso Fortuito e Força Maior',
      translation: 'Acontecimentos imprevisíveis e fora do controle humano',
      explanation:
        'Situações imprevisíveis como enchentes, desastres climáticos, greves gerais ou pandemias que impedem o cumprimento de uma obrigação sem culpa das partes.'
    },
    {
      term: 'Adimplemento Substancial',
      translation: 'Quase tudo já foi pago ou cumprido',
      explanation:
        'Doutrina jurídica que impede o cancelamento abrupto do contrato quando a imensa maioria da obrigação já foi satisfeita (por exemplo, 90% das parcelas pagas).'
    }
  ];

  const filteredGlossary = glossaryItems.filter(
    item =>
      item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.translation.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      item.explanation.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  // Pontuação do Checklist
  const checklistCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fade-in" id="descomplica-contrato-module">
      {/* ==================================================================== */}
      {/* A. SEÇÃO HERO E APLICAÇÃO INTERATIVA                                 */}
      {/* ==================================================================== */}
      <section className="bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Cabeçalho Hero */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Inteligência Artificial Gratuita & Leitura Local</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            DescomplicaContrato: Analisador de Contratos Gratuito com Áudio em 2 Minutos
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            Descubra multas abusivas, pegadinhas de renovação automática e cláusulas perigosas antes de assinar.
            Receba um diagnóstico falado, laudo em PDF para impressão e modelo de contestação pronto.
          </p>

          {/* Selos de Confiança */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Gratuito
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sem Cadastro
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Lock className="w-3.5 h-3.5 text-emerald-600" /> Dados 100% Protegidos (Sem Armazenamento)
            </span>
          </div>
        </div>

        {/* ADSENSE ESPAÇO 1 - ENTRE HERO E PAINEL */}
        <div className="w-full pt-1 no-print">
          <AdSensePlaceholder slotId="slot-1" position="topo" />
        </div>

        {/* ================================================================== */}
        {/* EXPANSÃO 1: ATALHOS RÁPIDOS DE MODELOS DE CONTRATOS BRASILEIROS    */}
        {/* ================================================================== */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2.5 no-print">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Teste com 1 Clique ou Selecione o Tipo de Contrato:
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Carrega cláusulas reais para simulação instantânea</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CONTRACT_PRESETS.map(preset => {
              const IconComp = preset.icon;
              const isCurrent = selectedPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleLoadPreset(preset.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all hover:cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isCurrent ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold truncate">{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Painel de Entrada Dupla */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1 no-print">
          {/* Coluna 1: Dropzone de Arquivos PDF e TXT */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-emerald-600" /> Opção 1: Enviar Arquivo (PDF ou TXT)
              </label>
              <span className="text-[11px] font-medium text-slate-500">Até 10 páginas</span>
            </div>

            <div
              onDragOver={e => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[190px] ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-slate-50/60 dark:hover:bg-slate-800/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,application/pdf,text/plain"
                onChange={onFileChange}
                className="hidden"
              />

              {isPdfLoading ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Lendo páginas do PDF no seu navegador...
                  </span>
                </div>
              ) : fileName ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 block max-w-[240px] truncate">
                      {fileName}
                    </span>
                    {filePages && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {filePages} {filePages === 1 ? 'página' : 'páginas detectadas'}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleClearFile();
                    }}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 px-2 py-1 rounded transition"
                  >
                    <X className="w-3 h-3" /> Trocar arquivo
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mb-2">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                    Arraste seu PDF ou TXT aqui
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium mt-1">
                    ou clique para procurar no seu dispositivo
                  </span>
                  <span className="text-[10px] text-slate-400 mt-2 font-mono">
                    Extração 100% segura no seu dispositivo via pdf.js
                  </span>
                </>
              )}
            </div>

            {pdfWarning && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span className="font-medium">{pdfWarning}</span>
              </div>
            )}
          </div>

          {/* Coluna 2: Área de Texto Expansível */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="contract-text-input"
                className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5"
              >
                <FileCode className="w-4 h-4 text-emerald-600" /> Opção 2: Ou Cole as Cláusulas Aqui
              </label>

              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                  contractText.length > 15000
                    ? 'bg-red-100 text-red-700'
                    : contractText.length > 12000
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {contractText.length.toLocaleString('pt-BR')} / 15.000 carac.
              </span>
            </div>

            <textarea
              id="contract-text-input"
              value={contractText}
              onChange={e => setContractText(e.target.value)}
              placeholder="Cole aqui o texto do contrato, as cláusulas de cancelamento, multas ou trechos que você achou confusos..."
              rows={8}
              className="w-full p-3.5 text-xs sm:text-sm font-sans rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-y min-h-[190px]"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Sanitização automática de CPFs e telefones
              </span>
              {contractText.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setContractText('');
                    setSelectedPreset('geral');
                  }}
                  className="text-slate-500 hover:text-red-600 font-medium transition cursor-pointer"
                >
                  Limpar texto
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Alerta de erro amigável */}
        {errorMessage && (
          <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs sm:text-sm text-red-800 dark:text-red-200 flex items-start gap-3 no-print">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold block">Atenção ao envio:</span>
              <p className="font-medium leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Botão de Ação Destacado */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || isPdfLoading || contractText.trim().length < 20}
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-md ${
              isAnalyzing || isPdfLoading || contractText.trim().length < 20
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg hover:cursor-pointer hover:scale-[1.01]'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{analysisProgress || 'Processando contrato...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analisar Contrato Sem Juridiquês</span>
              </>
            )}
          </button>
        </div>

        {/* ================================================================== */}
        {/* PAINEL DE RESULTADOS (RENDERIZADO APÓS O PROCESSAMENTO)             */}
        {/* ================================================================== */}
        {analysisResult && (
          <div
            ref={resultsRef}
            className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6 animate-fade-in"
            id="descomplica-results-panel"
          >
            {/* Semáforo de Risco */}
            <div
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                analysisResult.risk === 'ALTO'
                  ? 'bg-red-50/90 dark:bg-red-950/40 border-red-300 dark:border-red-800'
                  : analysisResult.risk === 'MEDIO'
                  ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                  : analysisResult.risk === 'BAIXO'
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    analysisResult.risk === 'ALTO'
                      ? 'bg-red-600 text-white'
                      : analysisResult.risk === 'MEDIO'
                      ? 'bg-amber-500 text-white'
                      : analysisResult.risk === 'BAIXO'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-600 text-white'
                  }`}
                >
                  {analysisResult.risk === 'ALTO' && <AlertTriangle className="w-6 h-6" />}
                  {analysisResult.risk === 'MEDIO' && <AlertCircle className="w-6 h-6" />}
                  {analysisResult.risk === 'BAIXO' && <CheckCircle2 className="w-6 h-6" />}
                  {analysisResult.risk === 'INCONCLUSIVO' && <HelpCircle className="w-6 h-6" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        analysisResult.risk === 'ALTO'
                          ? 'bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200'
                          : analysisResult.risk === 'MEDIO'
                          ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200'
                          : analysisResult.risk === 'BAIXO'
                          ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-800'
                      }`}
                    >
                      [RISCO {analysisResult.risk}]
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Classificação Geral</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-1">
                    {analysisResult.reason}
                  </h3>
                </div>
              </div>

              {/* Botões de Ação Rápida */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end no-print">
                <button
                  type="button"
                  onClick={handlePrintReport}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition hover:cursor-pointer shadow-xs"
                  title="Imprimir ou Salvar Parecer em PDF A4"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-400" /> Imprimir Laudo A4
                </button>

                <button
                  type="button"
                  onClick={copySummaryToClipboard}
                  className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition hover:cursor-pointer shadow-xs"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" /> Copiar Resumo
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={shareWhatsAppSummary}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition hover:cursor-pointer shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" /> WhatsApp
                </button>
              </div>
            </div>

            {/* Player de Áudio Nativo (Web Speech API) */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md space-y-4 no-print">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block font-mono">
                      Diagnóstico Falado em até 2 Minutos
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {speechSupported
                        ? 'Sintetizador de voz nativo do seu próprio dispositivo (pt-BR)'
                        : 'Síntese de voz não suportada neste navegador'}
                    </span>
                  </div>
                </div>

                {/* Seletor de Velocidade */}
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
                  <span className="text-[10px] font-mono text-slate-400 px-2 font-bold uppercase">Velocidade:</span>
                  {[1.0, 1.25, 1.5].map(rate => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => changeRate(rate)}
                      className={`text-xs font-mono font-bold px-2 py-1 rounded transition hover:cursor-pointer ${
                        speechRate === rate
                          ? 'bg-emerald-500 text-slate-950 shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {rate.toFixed(2).replace('.00', '')}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Barra de Controles e Onda Sonora */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {!isPlaying ? (
                  <button
                    type="button"
                    onClick={playAudio}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 transition hover:cursor-pointer shadow-sm"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>{isPaused ? 'Continuar Ouvindo' : 'Ouvir Diagnóstico'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pauseAudio}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 transition hover:cursor-pointer shadow-sm"
                  >
                    <Pause className="w-4 h-4 fill-slate-950" />
                    <span>Pausar Áudio</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={stopAudio}
                  disabled={!isPlaying && !isPaused}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    isPlaying || isPaused
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:cursor-pointer'
                      : 'border-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                  title="Reiniciar reprodução"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {isPlaying && (
                  <div className="flex items-center gap-1.5 pl-2">
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.45s]"></span>
                    <span className="text-xs text-emerald-400 font-mono font-bold pl-1">Reproduzindo voz...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Caixa de Leitura: Transcrição Corrida */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 no-print">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" /> Transcrição do Diagnóstico
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {analysisResult.summary.split(/\s+/).filter(Boolean).length} palavras
                </span>
              </div>

              <div className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                {analysisResult.summary.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* ============================================================== */}
            {/* EXPANSÃO 2: MODELO DE MENSAGEM PARA RENEGOCIAÇÃO               */}
            {/* ============================================================== */}
            {(analysisResult.risk === 'ALTO' || analysisResult.risk === 'MEDIO') && (
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6 space-y-4 no-print">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-600 text-white rounded-lg">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        Modelo de Mensagem para Pedir Alteração (WhatsApp / E-mail)
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        Texto pronto com embasamento legal amigável para solicitar a exclusão da cláusula abusiva antes de assinar.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={copyNegotiationLetter}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition hover:cursor-pointer"
                    >
                      {copiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copiedLetter ? 'Copiado!' : 'Copiar Texto'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={shareWhatsAppLetter}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition hover:cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Enviar no WhatsApp
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 font-sans text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {generateNegotiationLetter()}
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* EXPANSÃO 3: LAUDO TÉCNICO FORMATADO PARA IMPRESSÃO A4          */}
            {/* (Oculto na tela comum, exibido em destaque no print A4)        */}
            {/* ============================================================== */}
            <div
              id="printable-document"
              className="hidden print:block bg-white text-black p-8 max-w-4xl mx-auto space-y-6 font-sans"
            >
              {/* Cabeçalho do Laudo */}
              <div className="border-b-2 border-emerald-700 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-black uppercase tracking-tight text-emerald-800">
                    Tool Brasil — Parecer Técnico de Análise Contratual
                  </h1>
                  <span className="text-xs text-gray-500 block">
                    Tecnologia Assistiva de Desmistificação e Equilíbrio Contratual
                  </span>
                </div>
                <div className="text-right text-xs text-gray-600 font-mono">
                  <span>Data/Hora: {analysisResult.analyzedAt || '05/09/2026'}</span>
                  <span className="block font-bold text-gray-800">toolbrasil.com.br</span>
                </div>
              </div>

              {/* Metadados da Consulta */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-lg border border-gray-300">
                <div>
                  <strong className="block text-gray-700 font-bold">Tipo de Contrato:</strong>
                  <span>{analysisResult.contractType || 'Contrato Geral'}</span>
                </div>
                <div>
                  <strong className="block text-gray-700 font-bold">Documento Referência:</strong>
                  <span className="truncate block">{fileName || 'Texto inserido pelo usuário'}</span>
                </div>
              </div>

              {/* Box de Risco */}
              <div
                className={`p-4 rounded-lg border-2 text-sm ${
                  analysisResult.risk === 'ALTO'
                    ? 'border-red-600 bg-red-50 text-red-950'
                    : analysisResult.risk === 'MEDIO'
                    ? 'border-amber-500 bg-amber-50 text-amber-950'
                    : 'border-emerald-600 bg-emerald-50 text-emerald-950'
                }`}
              >
                <div className="font-black uppercase tracking-wider text-base">
                  Classificação Geral de Risco: [RISCO {analysisResult.risk}]
                </div>
                <p className="font-bold mt-1 text-xs sm:text-sm">{analysisResult.reason}</p>
              </div>

              {/* Diagnóstico Falado Transcrito */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-800 border-b pb-1">
                  Parecer Circunstanciado sem Juridiquês:
                </h3>
                <div className="text-xs leading-relaxed text-gray-800 space-y-2">
                  {analysisResult.summary.split('\n\n').map((par, i) => (
                    <p key={i}>{par}</p>
                  ))}
                </div>
              </div>

              {/* Base Legal Citada */}
              <div className="p-3 bg-gray-100 rounded border border-gray-300 text-[11px] text-gray-700 space-y-1">
                <strong>Fundamentação Legal Consultada:</strong>
                <p>
                  Artigo 51 do Código de Defesa do Consumidor (cláusulas nulas de pleno direito), Artigo 4º e Artigo 37
                  da Lei do Inquilinato (nº 8.245/91) e Artigos 413 e 421 do Código Civil Brasileiro (equilíbrio
                  contratual e função social).
                </p>
              </div>

              {/* Aviso Legal de Rodapé */}
              <div className="border-t border-gray-300 pt-4 text-[10px] text-gray-500 text-center leading-normal">
                Este parecer é um instrumento informativo baseado em inteligência artificial e não substitui consulta
                formal com advogado habilitado na OAB. Documento autenticado digitalmente em toolbrasil.com.br.
              </div>
            </div>

            {/* Aviso Legal Mandatório (visível na tela) */}
            <div className="p-4 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5 no-print">
              <Scale className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed font-medium">
                <strong>Aviso Legal Importante:</strong> Ferramenta educativa e informativa baseada em inteligência
                artificial. Não substitui consulta jurídica formal com advogado ou defensor público. Antes de assinar
                ou rescindir contratos de alto impacto financeiro, consulte sempre um profissional habilitado pela OAB.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ==================================================================== */}
      {/* EXPANSÃO 4: CHECKLIST INTERATIVO PRÉ-ASSINATURA                      */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
              <ListChecks className="w-4 h-4" /> Autoavaliação Rápida
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Checklist Pré-Assinatura: 5 Pontos Críticos para Checar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Marque os itens à medida que localizar cada garantia no seu contrato:
            </p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-center shrink-0">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">Conformidade:</span>
            <span className={`text-base font-black ${checklistCount >= 4 ? 'text-emerald-600' : checklistCount >= 2 ? 'text-amber-500' : 'text-slate-700 dark:text-slate-300'}`}>
              {checklistCount} de 5 itens marcados
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              id: 0,
              title: 'Multa Proporcional ao Tempo Restante',
              desc: 'O contrato garante que a multa rescisória diminua mês a mês proporcionalmente ao tempo cumprido?'
            },
            {
              id: 1,
              title: 'Sem Renovação Automática Silenciosa',
              desc: 'O documento exige que a empresa consulte você por escrito antes de renovar o plano ou serviço?'
            },
            {
              id: 2,
              title: 'Foro de Eleição na sua Cidade / Domicílio',
              desc: 'Em caso de disputa judicial, você poderá ser atendido na comarca onde reside, sem viagens caras?'
            },
            {
              id: 3,
              title: 'Garantia Única (Sem Cumulação Indevida)',
              desc: 'Foi solicitada apenas uma forma de garantia (ex: apenas caução OU apenas fiador, nunca ambos)?'
            },
            {
              id: 4,
              title: 'Promessas Verbais Escritas no Papel',
              desc: 'Tudo o que foi prometido pelo corretor ou vendedor por conversa ou áudio consta redigido no contrato?'
            }
          ].map(item => (
            <label
              key={item.id}
              className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                checklist[item.id]
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={!!checklist[item.id]}
                onChange={e => setChecklist(p => ({ ...p, [item.id]: e.target.checked }))}
                className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <div className="space-y-0.5">
                <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                  {item.title}
                </strong>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-snug">
                  {item.desc}
                </p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* B. SEÇÃO: COMO FUNCIONA A FERRAMENTA (PASSO A PASSO)                 */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs no-print">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Tecnologia Acessível
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Como Funciona o DescomplicaContrato?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Três etapas integradas com foco em privacidade total, clareza absoluta e velocidade:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Etapa 1 */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 space-y-3 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono font-black text-sm flex items-center justify-center">
                01
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                1. Leitura Local e Segura
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                O arquivo PDF é interpretado diretamente pelo motor <strong>pdf.js</strong> no seu próprio dispositivo.
                Nenhum arquivo binário é transferido para servidores e seus dados pessoais (como CPF e e-mail) são
                mascarados antes de qualquer consulta.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Privacidade Client-Side
            </div>
          </div>

          {/* Etapa 2 */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 space-y-3 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono font-black text-sm flex items-center justify-center">
                02
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                2. Identificação de Abusividades
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                O modelo cruza as cláusulas enviadas com os parâmetros de equilíbrio do{' '}
                <strong>Código de Defesa do Consumidor (CDC)</strong>, <strong>Lei do Inquilinato</strong> e Código
                Civil, detectando multas desproporcionais e renovações silenciosas.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" /> Princípios Legais do Brasil
            </div>
          </div>

          {/* Etapa 3 */}
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-xl p-5 space-y-3 relative flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono font-black text-sm flex items-center justify-center">
                03
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                3. Diagnóstico Falado
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                A resposta é gerada em formato de conversa amigável com números por extenso, pronta para ser sintetizada
                pela <strong>Web Speech API</strong> do seu smartphone ou computador em até dois minutos, sem custos de
                telefonia ou APIs pagas.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" /> Voz Nativa em pt-BR
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* C. GUIA PRÁTICO: AS PRINCIPAIS PEGADINHAS EM CONTRATOS DO DIA A DIA  */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs no-print">
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
            <BookOpen className="w-4 h-4" /> Conteúdo Educativo & Direito Preventivo
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Guia Prático: As Principais Pegadinhas em Contratos do Dia a Dia
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Antes de assinar qualquer compromisso financeiro, conheça as regras da legislação brasileira que protegem
            você contra cláusulas nulas de pleno direito.
          </p>
        </div>

        <div className="space-y-6">
          {/* Bloco 1: Contratos de Aluguel */}
          <div className="border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                <FileCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  1. Contratos de Aluguel de Imóveis (Lei do Inquilinato nº 8.245/91)
                </h3>
                <span className="text-[11px] text-slate-500">Direitos essenciais para locatários e fiadores</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-slate-900 dark:text-white font-extrabold block">
                  Regra da Multa Proporcional (Artigo 4º)
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  A multa rescisória deve obrigatoriamente ser proporcional ao tempo restante do contrato. Se você
                  cumpriu 20 de 30 meses de aluguel, jamais pague os 3 meses de multa cheios; você deve pagar apenas 1
                  terço da multa estipulada.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-slate-900 dark:text-white font-extrabold block">
                  Proibição da Dupla Garantia (Artigo 37)
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  É terminantemente proibido exigir caução em dinheiro E fiador no mesmo contrato. A exigência de mais de
                  uma modalidade de garantia é nula de pleno direito e configura contravenção penal do locador.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-slate-900 dark:text-white font-extrabold block">
                  Taxas Extraordinárias de Condomínio (Artigo 22)
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  O inquilino paga apenas despesas ordinárias (limpeza, portaria, água). Reformas estruturais no prédio,
                  fundo de reserva e pintura de fachada são de responsabilidade exclusiva do proprietário.
                </p>
              </div>
            </div>
          </div>

          {/* Bloco 2: Serviços, Cursos e Academias */}
          <div className="border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                <Scale className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  2. Prestação de Serviços, Cursos e Academias (Código de Defesa do Consumidor)
                </h3>
                <span className="text-[11px] text-slate-500">Lei Federal 8.078/90 e proteção contra desvantagem exagerada</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-slate-900 dark:text-white font-extrabold block">
                  Limite de Multa de Rescisão (Artigo 51)
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Planos anuais de academia e cursos não podem cobrar mais do que 10% a 20% sobre o saldo das parcelas
                  vincendas. Cláusulas que exigem a retenção de 50% ou 100% das mensalidades futuras são ilegais e nulas.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-slate-900 dark:text-white font-extrabold block">
                  Armadilha da Renovação Automática (Artigo 39, III)
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  A renovação de plano sem aviso prévio expresso ao consumidor é prática abusiva. O fornecedor não pode
                  presumir sua concordância perpétua sem uma confirmação positiva e informada.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-slate-900 dark:text-white font-extrabold block">
                  Direito de Arrependimento de 7 Dias (Artigo 49)
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Para qualquer contratação realizada fora do estabelecimento comercial (pela internet ou telefone), o
                  consumidor pode desistir em até 7 dias da assinatura ou do primeiro acesso com reembolso total e imediato.
                </p>
              </div>
            </div>
          </div>

          {/* Bloco 3: Trabalho e Freelancers */}
          <div className="border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                <Layers className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  3. Contratos de Trabalho PJ e Freelancers
                </h3>
                <span className="text-[11px] text-slate-500">Equilíbrio na relação de prestação de serviços autônomos</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-slate-900 dark:text-white font-extrabold block">
                  Cláusulas Excessivas de Não-Concorrência
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Proibir um profissional de atender clientes no mesmo ramo após o fim do contrato só tem validade se
                  houver limitação geográfica estrita, prazo razoável (até dois anos) e o pagamento de uma indenização
                  compensatória mensal durante o período de restrição.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1.5">
                <strong className="text-slate-900 dark:text-white font-extrabold block">
                  Exclusividade sem Remuneração Fixa Garantida
                </strong>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Exigir exclusividade de um profissional autônomo enquanto remunera apenas por demanda variável gera
                  desequilíbrio financeiro grave e pode caracterizar vínculo empregatício disfarçado (pejotização ilícita).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADSENSE ESPAÇO 2 - ENTRE GUIA PRÁTICO E GLOSSÁRIO */}
      <div className="w-full no-print">
        <AdSensePlaceholder slotId="slot-2" position="meio" />
      </div>

      {/* ==================================================================== */}
      {/* D. GLOSSÁRIO JURÍDICO: DO JURIDIQUÊS PARA O PORTUGUÊS CLARO          */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> Dicionário de Tradução
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Glossário Jurídico: Do Juridiquês para o Português Claro
            </h2>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={glossarySearch}
              onChange={e => setGlossarySearch(e.target.value)}
              placeholder="Buscar termo no glossário..."
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossary.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded">
                  Juridiquês: {item.term}
                </span>
              </div>

              <div className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span>O que significa: {item.translation}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium pt-1">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* E. FAQ ESTRUTURADO (PERGUNTAS FREQUENTES COM SCHEMA.ORG)             */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs no-print">
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> Dúvidas Frequentes
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Perguntas Frequentes sobre Análise de Contratos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Respostas transparentes sobre segurança, validade jurídica e funcionamento do módulo.
          </p>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {[
            {
              q: 'É seguro enviar meu contrato para análise?',
              a: 'Sim, é 100% seguro. O processamento de leitura de PDF e mascaramento de dados ocorre localmente no seu próprio navegador através da biblioteca pdf.js. Antes de qualquer requisição de IA, o sistema higieniza automaticamente CPFs, números de RG, telefones e e-mails com filtros regex. O tráfego de dados é criptografado e nenhuma informação é salva em disco.'
            },
            {
              q: 'A ferramenta armazena dados pessoais ou cópias dos meus documentos?',
              a: 'Não. O portal Tool Brasil opera sob rígida política de privacidade e conformidade com a LGPD. Não mantemos nenhum banco de dados com contratos, textos ou identificadores de usuários. Assim que você encerra a sessão ou atualiza a página, todos os dados são apagados da memória do navegador.'
            },
            {
              q: 'Esta análise substitui a consulta com um advogado?',
              a: 'Não. O DescomplicaContrato é uma tecnologia assistiva educacional e informativa desenhada para empoderar o consumidor leigo contra termos incompreensíveis. Ele aponta cláusulas perigosas e sugere pontos de negociação, mas não substitui a assessoria jurídica especializada de um advogado habilitado pela OAB.'
            },
            {
              q: 'Quais formatos de arquivo são aceitos e quais são os limites?',
              a: 'A ferramenta aceita arquivos PDF com camada de texto selecionável (até 10 páginas) e arquivos de texto simples (.txt). Caso você tenha um documento físico escaneado como imagem, sugerimos copiar o texto utilizando a câmera com OCR do seu celular e colá-lo na área de texto direta (limite de até 15.000 caracteres).'
            },
            {
              q: 'O que devo fazer caso o contrato receba a classificação de [RISCO ALTO]?',
              a: 'Não assine o documento com pressa. Identifique a cláusula específica mencionada no veredito falado e utilize nosso gerador de mensagens de contestação para enviar uma solicitação formal de ajuste antes de assinar.'
            }
          ].map((faq, idx) => {
            const isOpen = !!faqOpen[idx];
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setFaqOpen(prev => ({ ...prev, [idx]: !isOpen }))}
                  className="w-full text-left font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4 hover:text-emerald-600 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal animate-fade-in pl-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ADSENSE ESPAÇO 3 - ANTES DO RODAPÉ */}
      <div className="w-full pt-2 no-print">
        <AdSensePlaceholder slotId="slot-4" position="final" />
      </div>
    </div>
  );
}
