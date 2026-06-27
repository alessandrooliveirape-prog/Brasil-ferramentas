/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, ToolMetadata } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'calculadoras',
    name: 'Calculadoras',
    description: 'Cálculos financeiros, trabalhistas, matemáticos e de saúde.',
    icon: 'Calculator',
    color: 'emerald',
  },
  {
    id: 'conversores',
    name: 'Conversores',
    description: 'Conversão instantânea de medidas, moedas, dados e tempo.',
    icon: 'RefreshCw',
    color: 'blue',
  },
  {
    id: 'geradores',
    name: 'Geradores',
    description: 'Ferramentas de geração de dados, documentos, senhas e textos.',
    icon: 'Package',
    color: 'purple',
  },
  {
    id: 'ferramentas-web',
    name: 'Ferramentas Web',
    description: 'Análise de redes, domínios, conexões e diagnósticos de rede.',
    icon: 'Globe',
    color: 'indigo',
  },
  {
    id: 'utilitarios',
    name: 'Utilitários',
    description: 'Formatura, contagem de dados, tratamento de texto e codificação.',
    icon: 'Wrench',
    color: 'amber',
  },
  {
    id: 'programatico',
    name: 'SEO Programático',
    description: 'Páginas dinâmicas criadas para termos de busca de alta relevância.',
    icon: 'FileSearch',
    color: 'rose',
  },
  {
    id: 'institucional',
    name: 'Institucional',
    description: 'Páginas de governança, conformidade regulatória e transparência.',
    icon: 'Shield',
    color: 'slate',
  }
];

export const TOOLS: ToolMetadata[] = [
  // CALCULADORAS
  {
    id: 'juros-compostos',
    categoryId: 'calculadoras',
    title: 'Calculadora de Juros Compostos',
    shortDescription: 'Calcule o crescimento de investimentos ao longo do tempo com aportes mensais e juros acumulados.',
    longIntro: 'Esta ferramenta permite calcular detalhadamente a evolução do seu capital exposto a taxas de juros compostos. Ideal para simular o acúmulo de riqueza para planos de aposentadoria, investimentos em renda fixa, fundos ou poupança.',
    howItWorks: 'Informe o capital inicial, a taxa de juros (mensal ou anual), o tempo de investimento e o aporte mensal opcional. A ferramenta projeta a evolução ano a ano com tabelas de rendimentos correspondentes.',
    faqs: [
      {
        question: 'O que são juros compostos?',
        answer: 'Os juros compostos representam os juros sobre juros. O cálculo incide não apenas sobre o capital inicial aplicado, mas também sobre os juros acumulados nos períodos anteriores.'
      },
      {
        question: 'Qual a diferença entre juro composto e simples?',
        answer: 'No juro simples, o rendimento é calculado apenas sobre o montante inicial. No juro composto, os rendimentos geram novos rendimentos a cada período, gerando uma curva de crescimento exponencial.'
      },
      {
        question: 'Como a taxa de juros deve coincidir com o período?',
        answer: 'Normalmente converte-se a taxa para o mesmo padrão do período (ex: taxa mensal para períodos em meses). Nossa calculadora realiza essa correspondência de forma automatizada.'
      }
    ],
    tips: [
      'Iniciar aportes o quanto antes otimiza significativamente o efeito bola de neve dos juros compostos.',
      'Aportar valores constantes, por menores que pareçam, faz uma diferença colossal após 10 ou 15 anos.'
    ],
    relatedToolIds: ['juros-simples', 'financiamento', 'porcentagem', 'fgts'],
    slug: 'calculadora-de-juros-compostos'
  },
  {
    id: 'juros-simples',
    categoryId: 'calculadoras',
    title: 'Calculadora de Juros Simples',
    shortDescription: 'Cálculo fácil de juros lineares sobre capitais tomados ou investidos de forma direta.',
    longIntro: 'Uma calculadora limpa para compreender estimativas de parcelas antigas, títulos simples ou transações comerciais de curto prazo baseadas em regime de juros lineares.',
    howItWorks: 'Insira o capital inicial, a taxa cobrada e o período. A ferramenta determina o valor dos juros acumulados e o montante final obtido.',
    faqs: [
      {
        question: 'Quando os Juros Simples são usados no mercado?',
        answer: 'São comumente aplicados em compras parceladas sem juros embutidos complexos, descontos de duplicatas e transações comerciais de curto prazo.'
      }
    ],
    tips: [
      'Geralmente, empréstimos informais ou contratos civis de curto prazo utilizam juros simples para simplificar o cálculo.',
      'Fique atento se a taxa descrita é mensal ou anual e certifique-se de preencher o período correspondente.'
    ],
    relatedToolIds: ['juros-compostos', 'porcentagem', 'regra-de-tre'],
    slug: 'calculadora-de-juros-simples'
  },
  {
    id: 'financiamento',
    categoryId: 'calculadoras',
    title: 'Simulador de Financiamento (SAC e Price)',
    shortDescription: 'Compare amortizações através das tabelas SAC e Price para planejar a compra da sua casa ou carro.',
    longIntro: 'Simule seus financiamentos residenciais ou de veículos detalhando a diferença real entre as prestações decrescentes do Sistema de Amortização Constante (SAC) e as parcelas fixas da Tabela Price.',
    howItWorks: 'Digite o valor financiado, taxa de juros nominal anual, quantidade de meses e, se aplicável, o valor de taxas de administração mensais. O relatório emitirá a evolução das amortizações.',
    faqs: [
      {
        question: 'O que é a tabela SAC?',
        answer: 'No sistema SAC, o valor amortizado da dívida é igual todo mês. Como o saldo devedor diminui regularmente, os juros diminuem e as parcelas ficam progressivamente menores.'
      },
      {
        question: 'O que é a tabela Price?',
        answer: 'O Sistema Price adota parcelas fixas do início ao fim do contrato. A amortização começa menor e aumenta ao longo do tempo, enquanto a fatia de juros cai na mesma proporção.'
      }
    ],
    tips: [
      'O sistema SAC costuma amortizar a dívida mais rápido, gerando custos totais de juros menores no final do financiamento.',
      'Opte pela Price se o orçamento do início for apertado e exigir parcelas iniciais menores e previsíveis.'
    ],
    relatedToolIds: ['juros-compostos', 'fgts', 'rescisao'],
    slug: 'simulador-de-financiamento'
  },
  {
    id: 'fgts',
    categoryId: 'calculadoras',
    title: 'Calculadora de FGTS',
    shortDescription: 'Estime o saldo acumulado do FGTS ao longo do tempo e projete cenários de saques obrigatórios ou aniversário.',
    longIntro: 'Projete o montante retido na sua conta vinculada ao Fundo de Garantia do Tempo de Serviço, simulando os depósitos de 8% feitos pela empresa e rendimentos de TR + 3% ao ano.',
    howItWorks: 'Disponibilize seu salário mensal bruto, o saldo de partida e os meses trabalhados sob o regime CLT para desenhar a linha histórica de depósitos.',
    faqs: [
      {
        question: 'Quanto é depositado mensalmente no FGTS?',
        answer: 'Para trabalhadores com contrato CLT, o empregador deve depositar mensalmente 8% do salário bruto. Jovens aprendizes têm direito à alíquota reduzida de 2%.'
      }
    ],
    tips: [
      'Utilize o FGTS para amortizar parcelas de financiamento imobiliário e reduzir os juros pagos nos bancos.',
      'Fique atento ao calendário do Saque-Aniversário para verificar se a liberação compensa a perda do direito ao saque-rescisão.'
    ],
    relatedToolIds: ['rescisao', 'inss', 'decimo-terceiro'],
    slug: 'calculadora-de-fgts'
  },
  {
    id: 'inss',
    categoryId: 'calculadoras',
    title: 'Calculadora de Desconto INSS',
    shortDescription: 'Calcule a alíquota efetiva e o desconto previdenciário sobre o seu salário bruto de acordo com as regras vigentes.',
    longIntro: 'Descubra a retenção previdenciária oficial do INSS calculada progressivamente sobre sua remuneração bruta atual. Entenda exatamente quanto vai para sua futura previdência oficial.',
    howItWorks: 'Digite o valor do salário bruto. O sistema utilizará os intervalos de faixas progressivas vigentes de contribuição e calculará o desconto real e a alíquota média efetiva.',
    faqs: [
      {
        question: 'O que significa desconto progressivo do INSS?',
        answer: 'O desconto progressivo calcula o percentual de contribuição aplicando diferentes alíquotas somente sobre a fatia correspondente a cada faixa salarial, de forma semelhante ao Imposto de Renda.'
      }
    ],
    tips: [
      'Existe um teto máximo de contribuição estabelecido anualmente pelo governo, limitando o desconto previdenciário obrigatório de salários elevados.',
      'O valor liquido do desconto ajuda a antecipar estimativas precisas do seu contracheque real.'
    ],
    relatedToolIds: ['ferias', 'decimo-terceiro', 'rescisao'],
    slug: 'calculadora-desconto-inss'
  },
  {
    id: 'ferias',
    categoryId: 'calculadoras',
    title: 'Calculadora de Férias CLT',
    shortDescription: 'Estime o salário bruto e líquido de férias trabalhistas acrescido do terço constitucional e abonos.',
    longIntro: 'Simulador ideal para profissionais em regime CLT descobrirem com exatidão o saldo a receber ao tirar períodos de repouso, considerando as deduções oficiais de previdência e IRRF.',
    howItWorks: 'Forneça o salário base, número de dias de férias desejados, dependentes, média de proventos variáveis (horas extras) e opte por vender 10 dias (abono pecuniário presencial).',
    faqs: [
      {
        question: 'Como funciona o cálculo do terço constitucional?',
        answer: 'Todo trabalhador tem direito a um acréscimo de 1/3 (um terço) sobre o valor total do salário no período em que estiver gozando de férias remuneradas.'
      }
    ],
    tips: [
      'Lembre-se que o pagamento de férias é efetuado até dois dias antes do início do descanso, porém no mês seguinte o seu contracheque regular virá proporcionalmente menor ou zerado.',
      'O abono pecuniário (vender 10 dias) é isento de Imposto de Renda na fonte.'
    ],
    relatedToolIds: ['rescisao', 'decimo-terceiro', 'inss'],
    slug: 'calculadora-de-ferias-trabalhista'
  },
  {
    id: 'rescisao',
    categoryId: 'calculadoras',
    title: 'Calculadora de Rescisão de Contrato',
    shortDescription: 'Antecipe e estude os valores líquidos de rescisões trabalhistas sob regimes CLT em variados formatos.',
    longIntro: 'Esta calculadora foi desenhada para trabalhadores e gestores avaliarem as verbas rescisórias devidas no término do vínculo CLT, simulando o saldo salarial, férias pendentes e proporcionais, 13º e as multas aplicáveis.',
    howItWorks: 'Selecione as datas de início e término contratual, o último salário nominal bruto, o tipo de demissão (com ou sem justa causa, pedido ou comum acordo) e se houve aviso prévio cumprido ou indenizado.',
    faqs: [
      {
        question: 'Quem recebe a multa de 40% do FGTS?',
        answer: 'A multa indenizatória de 40% incide sobre os depósitos totais realizados ao longo do contrato e é devida de forma integral nas dispensas sem justa causa promovidas pelo empregador.'
      }
    ],
    tips: [
      'Em caso de rescisão sob comum acordo regulamentada após a Reforma Trabalhista, a multa do FGTS é de 20% e o aviso prévio indenizado cai pela metade (50%).',
      'Valide as contas informais para auxiliar em conversas de alinhamento com seu setor de RH.'
    ],
    relatedToolIds: ['fgts', 'decimo-terceiro', 'ferias'],
    slug: 'calculadora-de-rescisao-trabalhista'
  },
  {
    id: 'decimo-terceiro',
    categoryId: 'calculadoras',
    title: 'Calculadora de 13º Salário',
    shortDescription: 'Calcule as parcelas brutas e líquidas da gratificação de fim de ano de acordo com os meses trabalhados.',
    longIntro: 'Seja CLT, funcionário público ou aposentado, preveja com detalhamento a distribuição da sua gratificação natalina obrigatória nas duas parcelas usuais de pagamento oficial.',
    howItWorks: 'Insira o salário bruto de base, a quantidade de meses trabalhados e deduções adicionais para obter o calendário simulado das parcelas brutas e líquidas.',
    faqs: [
      {
        question: 'Como as parcelas do 13º salário são divididas?',
        answer: 'A primeira parcela (paga entre fevereiro e novembro) corresponde a 50% do salário bruto atual sem descontos. A segunda parcela (paga até 20 de dezembro) retém a totalidade do INSS e do Imposto de Renda relativo ao 13º completo.'
      }
    ],
    tips: [
      'Trabalhadores podem solicitar o recebimento adiantado da primeira parcela nas férias conjuntas ao requerer por escrito no início do ano.'
    ],
    relatedToolIds: ['inss', 'ferias', 'rescisao'],
    slug: 'calculadora-de-decimo-terceiro'
  },
  {
    id: 'imc',
    categoryId: 'calculadoras',
    title: 'Calculadora de IMC',
    shortDescription: 'Verifique seu Índice de Massa Corporal e descubra sua classificação nutricional ideal.',
    longIntro: 'Uma ferramenta rápida de saúde pública para examinar se a proporção de peso corporal para sua altura está em consonância com as diretrizes de referência da Organização Mundial da Saúde (OMS).',
    howItWorks: 'Forneça sua altura em centímetros e o peso líquido em quilogramas para obter o IMC, a margem de peso ideal para suas proporções e o grau de classificação correspondente.',
    faqs: [
      {
        question: 'Como o cálculo do IMC é estruturado?',
        answer: 'A fórmula padrão mundial é o Peso dividido pelo quadrado da Altura (IMC = peso / (altura * altura)).'
      }
    ],
    tips: [
      'Embora útil para uma triagem preliminar de peso corporal comum, o IMC não distingue massa magra (músculos) de tecido adiposo (gordura), necessitando de refinamento clínico.',
      'Manter-se na faixa ideal contribui na prevenção de distúrbios circulatórios, cardíacos e metabólicos.'
    ],
    relatedToolIds: ['idade', 'dias-entre-datas', 'consumo-combustivel'],
    slug: 'calculadora-de-imc'
  },
  {
    id: 'consumo-combustivel',
    categoryId: 'calculadoras',
    title: 'Calculadora de Consumo de Combustível',
    shortDescription: 'Descubra a autonomia, consumo médio por quilômetro e despesas financeiras estimadas para sua rota programada.',
    longIntro: 'Minimize surpresas de transporte calculando o impacto de combustível do seu veículo particular. Faça contas de trajetos rápidos, viagens de férias ou deslocamento diário.',
    howItWorks: 'Preencha a distância do seu trecho planejado, o rendimento médio do automóvel (km por litro) e o preço atual por litro encontrado no posto.',
    faqs: [
      {
        question: 'O álcool (etanol) rende menos que a gasolina?',
        answer: 'Sim, o etanol contém densidade energética menor e rende cerca de 70% da autonomia da gasolina. Se o litro do etanol estiver abaixo de 70% do preço da gasolina, ele torna-se economicamente competitivo.'
      }
    ],
    tips: [
      'Calibrar regularmente os pneus e desonerar sacolas de bagagens pesadas diminui expressivamente o gasto de combustível na estrada.',
      'Acelerações suaves e frenagens programadas reduzem o desgaste e desperdício térmico.'
    ],
    relatedToolIds: ['regra-de-tre', 'porcentagem', 'juros-simples'],
    slug: 'calculadora-de-consumo-combustivel'
  },
  {
    id: 'regra-de-tre',
    categoryId: 'calculadoras',
    title: 'Calculadora de Regra de Três',
    shortDescription: 'Resolva proporções matemáticas diretas e inversas de maneira amigável em instantes.',
    longIntro: 'Esqueça os rascunhos em papel para descobrir incógnitas. Encontre o quarto valor numa relação de proporcionalidade direta (onde um cresce e o outro segue) ou inversa (onde um cresce e o outro cai).',
    howItWorks: 'Preencha os valores conhecidos A, B e C. O sistema resolverá e exibirá o valor correspondente de X fundamentado na equivalência clássica.',
    faqs: [
      {
        question: 'O que é proporção direita vs inversa?',
        answer: 'Direta ocorre se duplicando um lado o outro também duplica (ex: mais horas extras geram mais salário). Inversa ocorre se dobrando um lado o outro se reduz pela metade (ex: o dobro da velocidade reduz o tempo de viagem pela metade).'
      }
    ],
    tips: [
      'Muito útil para receitas culinárias, escalas fotográficas, proporção de tintas ou despesas grupais proporcionais.'
    ],
    relatedToolIds: ['porcentagem', 'metros-para-pes', 'quilos-para-libras'],
    slug: 'calculadora-regra-de-tres'
  },
  {
    id: 'porcentagem',
    categoryId: 'calculadoras',
    title: 'Calculadora de Porcentagem',
    shortDescription: 'Efetue aumentos, descontos, percentuais de proporção e variações em segundos.',
    longIntro: 'Encontre respostas rápidas para operações essenciais de frações centesimais. Ideal para comércio, tributos, cálculos de markup e análise de variações financeiras diárias.',
    howItWorks: 'Selecione uma das três modalidades comuns: descobrir parcelas de um valor, percentual correspondente de uma quantia sobre outra, ou inflação/queda de valor.',
    faqs: [
      {
        question: 'O que significa calcular variação percentual?',
        answer: 'É a mensuração da alteração proporcional de uma quantia para outra. Mostra se um ativo ou preço valorizou ou caiu expressivamente diante de sua base histórica.'
      }
    ],
    tips: [
      'Em liquidações, compare descontos reais com promoções superficiais avaliando a variação direta do preço à vista comercializado anteriormente.'
    ],
    relatedToolIds: ['regra-de-tre', 'juros-simples', 'juros-compostos'],
    slug: 'calculadora-de-porcentagem'
  },
  {
    id: 'idade',
    categoryId: 'calculadoras',
    title: 'Calculadora de Idade Exata',
    shortDescription: 'Saiba sua idade exata em anos, meses, dias, horas e até os minutos totais de vida.',
    longIntro: 'Descubra curiosidades incríveis das suas datas marcantes de aniversário. Calcule o tempo total transcorrido no globo detalhadamente.',
    howItWorks: 'Insira o dia e horário aproximado de nascimento. A ferramenta calcula o saldo do tempo de vida diante do relógio corrido hoje.',
    faqs: [
      {
        question: 'Como os anos bissextos afetam os cálculos?',
        answer: 'Nossa calculadora integra a inclusão de anos com 366 dias (bissextos) no somatório de dias corridos para garantir precisão matemática.'
      }
    ],
    tips: [
      'Ideal para descobrir marcos exatos de meses de crianças, pets ou acompanhamento de aniversários de casamentos e sociedades.'
    ],
    relatedToolIds: ['dias-entre-datas', 'imc', 'regra-de-tre'],
    slug: 'calculadora-de-idade-exata'
  },
  {
    id: 'dias-entre-datas',
    categoryId: 'calculadoras',
    title: 'Calculadora de Dias Entre Datas',
    shortDescription: 'Calcule a distância exata de dias, semanas e meses entre dois dias determinados do calendário.',
    longIntro: 'Planeje prazos de projetos judiciais, corporativos, data de entrega de obras ou simplesmente conte as férias contando apenas dias corridos ou descontando finais de semana e feriados nacionais.',
    howItWorks: 'Defina a data inicial e a data alvo para colher as métricas de tempo líquido transcorrido e estimativa semanal de proximidade.',
    faqs: [
      {
        question: 'A contagem inclui os dias iniciais e finais?',
        answer: 'Você pode calibrar se prefere computar o dia final ou avaliar apenas o intervalo estrito absoluto de repouso entre os marcos.'
      }
    ],
    tips: [
      'Facilita consideravelmente estimativas de aluguel por diárias, contagem de períodos de carência ou prazos contratuais corporativos.'
    ],
    relatedToolIds: ['idade', 'regra-de-tre', 'horas-para-minutos'],
    slug: 'calculadora-dias-entre-datas'
  },
  {
    id: 'hora-extra',
    categoryId: 'calculadoras',
    title: 'Calculadora de Hora Extra',
    shortDescription: 'Calcule o valor das suas horas extras de trabalho CLT, incluindo adicionais de 50%, 100% e Adicional Noturno.',
    longIntro: 'Esta calculadora ajuda a estimar a remuneração devida pelas horas extras trabalhadas sob o regime CLT. Ela calcula o valor do seu salário-hora base, o acréscimo proporcional para horas extras comuns (50%) ou em domingos e feriados (100%), além de possibilitar o cálculo do Adicional Noturno e do DSR (Descanso Semanal Remunerado).',
    howItWorks: 'Informe o seu salário bruto, a jornada de trabalho mensal contratual (habitualmente 220 horas para 44 horas semanais), e o número de horas extras trabalhadas com acréscimo de 50% ou 100%. A calculadora retornará o valor detalhado de cada hora, o total ganho e o reflexo de DSR no mês corrente.',
    faqs: [
      {
        question: 'Qual o valor do acréscimo da hora extra comum?',
        answer: 'De acordo com a CLT, a hora extra comum em dias de semana ou sábados deve ser paga com acréscimo mínimo de 50% sobre o valor da hora de trabalho comum.'
      },
      {
        question: 'Como funciona o acréscimo de 100% sobre horas extras?',
        answer: 'As horas extras executadas em domingos oficiais ou em feriados declarados devem ser remuneradas com o acréscimo integral de 100% (o dobro do valor da hora de trabalho base).'
      },
      {
        question: 'O que é o DSR sobre hora extra?',
        answer: 'O Descanso Semanal Remunerado (DSR) é uma verba adicional devida sobre as horas extras. Significa que as horas extras feitas também incidem sobre o seu repouso semanal pago, e o cálculo é feito dividindo as horas extras do mês pelos dias úteis e multiplicando pelos domingos e feriados.'
      }
    ],
    tips: [
      'A jornada de trabalho padrão no Brasil é de 44 horas semanais, totalizando 220 horas de cálculo mensal de divisores.',
      'O Adicional Noturno incide sobre horas trabalhadas das 22h às 5h do dia seguinte com um acréscimo mínimo de 20% no meio urbano.'
    ],
    relatedToolIds: ['inss', 'decimo-terceiro', 'ferias', 'salario-liquido'],
    slug: 'calculadora-de-hora-extra'
  },
  {
    id: 'seguro-desemprego',
    categoryId: 'calculadoras',
    title: 'Calculadora de Seguro-Desemprego',
    shortDescription: 'Verifique se você tem direito ao benefício, simule o número de parcelas e o valor que irá receber.',
    longIntro: 'A calculadora de Seguro-Desemprego simula se o trabalhador demitido sem justa causa tem direito a receber o benefício assistencial temporário, estimando o valor de cada parcela mensal e a quantidade total de parcelas com base no histórico de trabalho CLT e solicitações anteriores.',
    howItWorks: 'Insira a média salarial dos últimos 3 meses trabalhados, informe quantas vezes você já solicitou o seguro-desemprego anteriormente, e selecione a quantidade total de meses trabalhados de carteira assinada no último emprego.',
    faqs: [
      {
        question: 'Quem tem direito ao seguro-desemprego?',
        answer: 'Trabalhadores em regime CLT dispensados sem justa causa, que não possuam renda própria para sustento familiar e que tenham cumprido os critérios de carência de meses trabalhados.'
      },
      {
        question: 'Qual o número mínimo de meses para solicitar a primeira vez?',
        answer: 'Na primeira solicitação do benefício, o trabalhador precisa ter atuado sob regime CLT por pelo menos 12 meses nos últimos 18 meses anteriores à demissão.'
      },
      {
        question: 'O empregado em acordo do artigo 484-A da CLT pode receber o seguro?',
        answer: 'Não. Em casos de rescisão por acordo mútuo (acordo bilateral comum), o trabalhador tem direito à metade do aviso prévio e multa de 20% do FGTS, mas NÃO dá direito ao recebimento de parcelas do seguro-desemprego.'
      }
    ],
    tips: [
      'O prazo para requerer o Seguro-Desemprego vai de 7 a 120 dias após a data da demissão do empregado.',
      'O pagamento é suspenso caso o trabalhador consiga um novo emprego de carteira assinada.'
    ],
    relatedToolIds: ['rescisao', 'fgts', 'inss', 'salario-liquido'],
    slug: 'calculadora-de-seguro-desemprego'
  },
  {
    id: 'salario-liquido',
    categoryId: 'calculadoras',
    title: 'Calculadora de Salário Líquido',
    shortDescription: 'Preveja seu salário líquido CLT deduzindo INSS, Imposto de Renda (IRRF), vale-transporte e outros descontos.',
    longIntro: 'Configure seu salário bruto mensal, dependentes familiares e deduções extras para descobrir exatamente quanto cairá na sua conta bancária todo mês como Salário Líquido CLT, visualizando o detalhamento completo de todos os descontos aplicados.',
    howItWorks: 'Forneça o valor do seu salário bruto mensal, a quantidade de dependentes legais e configure todos os descontos adicionais que ocorrem em sua folha de pagamento (como Vale Transporte, plano de saúde ou coparticipações).',
    faqs: [
      {
        question: 'O que é deduzido primeiro: o INSS ou o IRRF?',
        answer: 'O INSS é calculado e deduzido primeiro. A base de cálculo do Imposto de Renda (IRRF) é o salário bruto menos o desconto do INSS e as deduções por dependentes legais.'
      },
      {
        question: 'Como funciona o desconto de dependentes?',
        answer: 'Cada dependente declarado na folha de pagamento abate legalmente o valor de R$ 189,59 da base de cálculo em que se aplica o Imposto de Renda Mensal.'
      },
      {
        question: 'Qual o percentual limite de dedução de Vale Transporte?',
        answer: 'O empregador pode descontar no máximo 6% do salário básico do empregado para o Vale Transporte. Se o custo total do transporte for menor que 6%, o desconto será apenas do valor real do custo.'
      }
    ],
    tips: [
      'Sempre preencha dependentes legais de forma fidedigna para obter um salário líquido exato do Imposto de Renda na fonte.',
      'Deduções como pensão alimentícia oficial por decisão judicial também abatem da base de cálculo do IRRF.'
    ],
    relatedToolIds: ['inss', 'decimo-terceiro', 'ferias', 'hora-extra'],
    slug: 'calculadora-de-salario-liquido'
  },

  // CONVERSORES
  {
    id: 'metros-para-pes',
    categoryId: 'conversores',
    title: 'Conversor de Metros para Pés',
    shortDescription: 'Converta facilmente comprimento e altura entre o sistema métrico e imperial.',
    longIntro: 'Uma ferramenta simplificada de conversão de metragens e pés (feet). Use largamente em aeronáutica, especificações de produtos, decoração de imóveis internacionais ou engenharia civil.',
    howItWorks: 'Preencha metros para receber pés ou vice-versa na mesma tela. O fator exato de conversão é 1 metro = 3.28084 pés.',
    faqs: [
      {
        question: 'Quantos pés há em 1 metro?',
        answer: 'Exatamente 3.28084 pés padrão aproximados no padrão internacional de polegadas industriais.'
      }
    ],
    tips: [
      'Geralmente frotas de aviação civis baseiam suas altitudes prioritariamente na escala imperial de pés (feet).'
    ],
    relatedToolIds: ['quilos-para-libras', 'celsius-para-fahrenheit', 'regra-de-tre'],
    slug: 'converter-metros-para-pes'
  },
  {
    id: 'quilos-para-libras',
    categoryId: 'conversores',
    title: 'Conversor de Quilos para Libras',
    shortDescription: 'Transfira pesos entre kgs e pounds para bagagens, receitas e tabelas internacionais.',
    longIntro: 'Evite acidentes ou taxas de excesso de bagagem aérea internacional convertendo quilogramas em libras no padrão imperial de massa britânico e norte-americano.',
    howItWorks: 'Digite o valor em kg ou lb para fazer a conversão imediata. 1 quilo é aproximadamente 2.20462 libras.',
    faqs: [
      {
        question: 'Como converter libras em kg na cabeça?',
        answer: 'Para uma conta mental ágil de padaria, basta dividir a quantidade de libras por 2.2 para obter a massa próxima em quilogramas.'
      }
    ],
    tips: [
      'Equipamentos de academia importados rotulam comumente suas cargas na unidade libras (lbs).'
    ],
    relatedToolIds: ['metros-para-pes', 'celsius-para-fahrenheit', 'mb-para-gb'],
    slug: 'converter-quilos-para-libras'
  },
  {
    id: 'celsius-para-fahrenheit',
    categoryId: 'conversores',
    title: 'Conversor de Celsius para Fahrenheit',
    shortDescription: 'Converta temperaturas instantaneamente para receitas, previsão de tempo internacional ou pesquisas.',
    longIntro: 'Determine valores de termômetros escalados em Celsius, Fahrenheit e até Kelvin. Muito conveniente para viagens para os EUA ou receitas de fornos domésticos com termostatos imperiais.',
    howItWorks: 'Qualquer modificação em um termômetro atualiza os equivalentes simultaneamente sem demandar recarregamento de página.',
    faqs: [
      {
        question: 'Onde o sistema Fahrenheit é regular?',
        answer: 'Atualmente é usado principalmente nos Estados Unidos, Libéria e em diversas nações insulares banhadas pelo Caribe.'
      }
    ],
    tips: [
      'Zero graus Celsius (congelamento d\'água) equivale a 32 graus Fahrenheit na escala térmica imperial.'
    ],
    relatedToolIds: ['metros-para-pes', 'quilos-para-libras', 'horas-para-minutos'],
    slug: 'converter-celsius-para-fahrenheit'
  },
  {
    id: 'real-para-dolar',
    categoryId: 'conversores',
    title: 'Conversor de Real para Dólar',
    shortDescription: 'Verifique valores de Real (BRL) convertidos de/para Dólar Americano (USD) com cotação personalizável.',
    longIntro: 'Simule orçamentos de compras de eletrônicos de importação rápida ou passagens internacionais. Você pode digitar e ajustar a cotação comercial livremente para acompanhar o câmbio obtido pela sua corretora.',
    howItWorks: 'Basta informar a quantia fiduciária comercial sob a taxa cambial escolhida para que o reflexo financeiro seja atualizado.',
    faqs: [
      {
        question: 'O que é spread cambial?',
        answer: 'Spread é a diferença cobrada por bancos e operadoras entre o valor real do dólar comercial anunciado na mídia e o custo final imposto ao cliente final na remessa física ou cartão.'
      }
    ],
    tips: [
      'Adicione os impostos obrigatórios IOF (atualmente 4.38% para cartões internacionais) ao orçar gastos turísticos em dólar.'
    ],
    relatedToolIds: ['porcentagem', 'juros-compostos', 'regra-de-tre'],
    slug: 'converter-real-para-dolar'
  },
  {
    id: 'mb-para-gb',
    categoryId: 'conversores',
    title: 'Conversor de Megabytes para Gigabytes',
    shortDescription: 'Calcule a equivalência de arquivos de informática de MB para GB.',
    longIntro: 'Entenda os limites de armazenagem das suas unidades SSD, planos de internet de banda larga ou anexos de e-mail de arquivos de mídia em conversões baseadas em binário informático.',
    howItWorks: 'Insira o montante e decida se a conversão utiliza a base padrão de TI (1024) ou a base comercial simplificada direta de decimais do mercado (1000).',
    faqs: [
      {
        question: 'Por que fabricantes vendem HDs menores que o reportado pelo Windows?',
        answer: 'Fabricantes rotulam usando 1 GB = 1 bilhão de bytes base decimal (1000). Sistemas operacionais mapeiam binariamente (1024), fazendo um HD de 1 TB comercial transparecer cerca de 931 GB real nas pastas.'
      }
    ],
    tips: [
      'Geralmente, resolva as conversões de redes celulares sob 1 GB = 1024 MB para checagem precisa de franquias.'
    ],
    relatedToolIds: ['kb-para-mb', 'quilos-para-libras', 'horas-para-minutos'],
    slug: 'converter-mb-para-gb'
  },
  {
    id: 'kb-para-mb',
    categoryId: 'conversores',
    title: 'Conversor de Kilobytes para Megabytes',
    shortDescription: 'Converta pequenas unidades de armazenamento de computadores digitais.',
    longIntro: 'Conversão ideal para calibrar tamanho de fotos compactadas, logos, e-mails ou mídias leves em kilobytes convertidos em megabytes corretos.',
    howItWorks: 'Digite KB ou MB para computar os fatores clássicos binários (1024) que coordenam o tráfego de dados na rede.',
    faqs: [
      {
        question: 'O que o termo Bit representa?',
        answer: 'Um Bit é a menor unidade mínima lógica elementar processada. 8 bits formam exatamente 1 Byte, a base das demais siglas superiores.'
      }
    ],
    tips: [
      'Um arquivo de texto corrido leve pode ocupar mero 4 KB de espaço de disco sem estourar limite algum.'
    ],
    relatedToolIds: ['mb-para-gb', 'horas-para-minutos', 'metros-para-pes'],
    slug: 'converter-kb-para-mb'
  },
  {
    id: 'horas-para-minutos',
    categoryId: 'conversores',
    title: 'Conversor de Horas para Minutos',
    shortDescription: 'Calcule e converta marcações horárias contínuas em frações de minutos totais acumulados.',
    longIntro: 'Perfeito para calcular cronogramas de vídeos, carga de bateria de veículos elétricos, planilhas de ponto corporativas ou durações de treinos esportivos.',
    howItWorks: 'O sistema multiplica horas por 60 para expor os minutos, ou divide o saldo acumulado de minutos de volta para horas.',
    faqs: [
      {
        question: 'Quantos minutos há em um dia completo de escala solar?',
        answer: 'A escala possui 24 horas, totalizando exatamente 1.440 minutos corridos.'
      }
    ],
    tips: [
      'Multiplicações simples feitas de cabeça podem pregar peças em frações de centésimos (ex: 1,5 horas são 90 minutos, e não 150 minutos).'
    ],
    relatedToolIds: ['dias-para-horas', 'dias-entre-datas', 'idade'],
    slug: 'converter-horas-para-minutos'
  },
  {
    id: 'dias-para-horas',
    categoryId: 'conversores',
    title: 'Conversor de Dias para Horas',
    shortDescription: 'Converta períodos de duração de dias corridos em horas totais correspondentes.',
    longIntro: 'Encontre o volume global de horas compreendidas em prazos de produção de produtos, viagens longas, folgas do trabalho ou contagem de repouso programado.',
    howItWorks: 'Indique a quantia numérica e tenha as respostas calculadas pelo multiplicador natural de padrão rotacional terrestre de 24 horas.',
    faqs: [
      {
        question: 'Quantas horas completam uma semana tradicional?',
        answer: 'Composta por sete dias corridos, uma semana possui exatamente 168 horas acumuladas.'
      }
    ],
    tips: [
      'Muito favorável para estimar horas de voos, hospedagens ou garantias pós-compras faturadas por prazos corridos.'
    ],
    relatedToolIds: ['horas-para-minutos', 'dias-entre-datas', 'idade'],
    slug: 'converter-dias-para-horas'
  },

  // GERADORES
  {
    id: 'cpf',
    categoryId: 'geradores',
    title: 'Gerador e Validador de CPF',
    shortDescription: 'Gere códigos de CPF válidos com ou sem pontuação para fins de desenvolvimento de software e testes de sistemas.',
    longIntro: 'Ferramenta utilitária de ponta voltada exclusivamente para engenheiros de software, testadores (QA) e estudantes de bancos de dados validarem formulários de login e fluxos cadastrais locais com conformidade.',
    howItWorks: 'Selecione as opções de formatação com ou sem pontuação e clique no gerador de dados para as hashes válidas regidas pelo cálculo interno de dígitos verificadores.',
    faqs: [
      {
        question: 'O CPF gerado é de uma pessoa física real?',
        answer: 'Não. Os números são criados sinteticamente através de algoritmos clássicos de módulo 11 de criptografia de controle, não guardando qualquer filiação cadastral de cidadãos reais brasileiros.'
      },
      {
        question: 'Como funciona o algoritmo verificador do CPF?',
        answer: 'O algoritmo analisa os 9 primeiros dígitos distribuindo pesos lineares de 10 a 2 e soma os resultados. Segue-se o módulo 11 dita o primeiro dígito. A mesma lógica estendida com peso 11 gera o segundo algarismo.'
      }
    ],
    tips: [
      'Nunca armazene dados pessoais reais de clientes em banco de dados locais de homologação ou laboratórios de desenvolvimento.',
      'O portal oferece as duas saídas limpas de forma rápida com atalhos de cópias (Clipboard).'
    ],
    relatedToolIds: ['cnpj', 'senha', 'uuid'],
    slug: 'gerador-de-cpf'
  },
  {
    id: 'cnpj',
    categoryId: 'geradores',
    title: 'Gerador e Validador de CNPJ',
    shortDescription: 'Gere CNPJ válidos sintéticos formate e valide CNPJ existentes para uso de homologação corporativa de TI.',
    longIntro: 'Assim como na ferramenta de pessoa física, este motor apoia a comunidade de programação fornecendo estruturas jurídicas fictícias válidas em conformidade estrita aos validadores do MEC/Receita Federal do Brasil.',
    howItWorks: 'O botão de lote elabora estruturas de CNPJ compostas por 14 dígitos respeitando as posições de controle do cadastro empresarial.',
    faqs: [
      {
        question: 'Os cadastros gerados dão acesso ao CNPJ governamental?',
        answer: 'Não. São dezenas de combinações computadas que cumprem testes matemáticos, ideais para mockups de faturamento.'
      }
    ],
    tips: [
      'Excelente para testes de integrações de Nota Fiscal Eletrônica (NF-e) nos ambientes de sandbox.'
    ],
    relatedToolIds: ['cpf', 'senha', 'uuid'],
    slug: 'gerador-de-cnpj'
  },
  {
    id: 'senha',
    categoryId: 'geradores',
    title: 'Gerador de Senha Segura',
    shortDescription: 'Construa credenciais de máxima segurança impedindo hacking ou adivinhações maliciosas.',
    longIntro: 'Fortaleça a proteção das suas credenciais digitais. Gere senhas customizadas impossíveis de sofrer ataques de força bruta ou engenharia social.',
    howItWorks: 'Regule o comprimento ideal (até 64 caracteres) com opções de alternância de caixa de letras, números e símbolos especiais de digitação.',
    faqs: [
      {
        question: 'O que constitui uma credencial forte?',
        answer: 'A força repousa na variedade (combinação aleatória de caracteres variados) e no comprimento (ideal superior a 12 caracteres).'
      }
    ],
    tips: [
      'Nunca aproveite senhas idênticas em variadas redes sociais ou contas de bancos.',
      'Use um Chaveiro ou Gerenciador de Senhas criptografado confiável para organizá-las.'
    ],
    relatedToolIds: ['uuid', 'hash-sha256', 'hash-md5'],
    slug: 'gerador-de-senha-segura'
  },
  {
    id: 'qr-code',
    categoryId: 'geradores',
    title: 'Gerador de QR Code',
    shortDescription: 'Gere instantaneamente códigos de QR Code para URLs, textos, conexões Wi-Fi ou contatos.',
    longIntro: 'Uma ferramenta versátil para divulgar contatos digitais, cardápios, links de pagamentos Pix, senhas ou materiais impressos gerando marcas escaneáveis prontas.',
    howItWorks: 'Diga qual é a informação de origem correspondente. O renderizador gerará dinamicamente o código bidimensional bidirecional.',
    faqs: [
      {
        question: 'O QR Code gerado possui validade de tempo?',
        answer: 'Não, são livres e perpétuos. Como não dependem de URLs redirecionadoras proprietárias nossas, o link aponta diretamente para o seu destino inserido.'
      }
    ],
    tips: [
      'Verifique previamente com a câmera do celular se as margens de contraste visual e o tamanho do conteúdo não atrapalham a focalização.'
    ],
    relatedToolIds: ['senha', 'uuid', 'encode-url'],
    slug: 'gerador-de-qr-code'
  },
  {
    id: 'uuid',
    categoryId: 'geradores',
    title: 'Gerador de UUID (v4)',
    shortDescription: 'Crie Identificadores Únicos Universais aleatórios de alta entropia para registros de bancos de dados.',
    longIntro: 'Gere chaves lógicas UUID versadas na especificação v4 livres de conflitos de colisões de dados para servir como chaves de tabelas primárias (PK) de engenharia.',
    howItWorks: 'Selecione a quantidade desejada de geração paralela de identificadores e obtenha instantaneamente os blocos hexadecimais estruturados clássicos.',
    faqs: [
      {
        question: 'O que garante a exclusividade de um UUID v4?',
        answer: 'Sua lógica depende de geração pseudoaleatória de bits. A probabilidade de gerar duplicidades idênticas ao redor do globo é tão ínfima que é tratada cientificamente como impossível.'
      }
    ],
    tips: [
      'Substituir IDs inteiros autoincrementais por UUIDs preserva a privacidade do volume interno do seu banco de dados contra vazamentos de endpoints de APIs.'
    ],
    relatedToolIds: ['senha', 'hash-sha256', 'lorem-ipsum'],
    slug: 'gerador-de-uuid'
  },
  {
    id: 'lorem-ipsum',
    categoryId: 'geradores',
    title: 'Gerador de Lorem Ipsum',
    shortDescription: 'Crie textos de marcação simulados para esquemas de diagramação de layouts e designs de interfaces.',
    longIntro: 'Crie parágrafos, sentenças ou listas do provador tradicional em latim para povoar wireframes, panfletos, revistas ou design visual sem focar no significado textual de leitura.',
    howItWorks: 'Indique a quantia de parágrafos desejados e copie o bloco de diagramação clássico que remonta às oficinas gráficas do século XVI.',
    faqs: [
      {
        question: 'Qual o propósito do Lorem Ipsum?',
        answer: 'Ele apresenta uma distribuição de letras uniforme nas frases, simulando perfeitamente a leitura do português ou inglês moderno sem prender a atenção da leitura do usuário ao design de marcas.'
      }
    ],
    tips: [
      'Configure seu gerador no Tool Brasil para iniciar com o clássico termo inicial "Lorem ipsum dolor sit amet..." de transição.'
    ],
    relatedToolIds: ['senha', 'contador-caracteres', 'removedor-espacos'],
    slug: 'gerador-de-lorem-ipsum'
  },
  {
    id: 'hash-md5',
    categoryId: 'geradores',
    title: 'Gerador de Hash MD5',
    shortDescription: 'Gere resumos de criptografia MD5 de 128-bits para checar integridade lógica de arquivos compartilhados.',
    longIntro: 'Compute as impressões lógicas MD5 rápidas para textos de dados para finalidade simples de assinaturas de checagens lógicas e comparações correlatas.',
    howItWorks: 'Escreva qualquer texto livre na caixa para que o processador gere em tempo real a hash correspondente composta por 32 caracteres hexadecimais.',
    faqs: [
      {
        question: 'O MD5 é seguro para reter segredos de senhas de produção?',
        answer: 'Não. O algoritmo MD5 é vulnerável a riscos conhecidos de colisões de dados e ataques computacionais massivos. Use SHA-256 ou algoritmos de derivação modernos (Bcrypt) para credenciais importantes.'
      }
    ],
    tips: [
      'Útil para comparar se duas fontes de dados extensas são exatamente iguais sem necessitar confrontar palavra por palavra.'
    ],
    relatedToolIds: ['hash-sha256', 'senha', 'uuid'],
    slug: 'gerador-de-hash-md5'
  },
  {
    id: 'hash-sha256',
    categoryId: 'geradores',
    title: 'Gerador de Hash SHA-256',
    shortDescription: 'Consiga impressões digitais criptográficas fortes e seguras de arquivos de textos livres.',
    longIntro: 'Crie representações hexadecimais de 256 bits exclusivas, recomendadas largamente para validações digitais avançadas, blockchain e assinaturas integradas de integridade criptográfica de dados.',
    howItWorks: 'Cole trechos e identifique o fingerprint criptográfico seguro respondido sem necessidade de comunicação externa de servidores.',
    faqs: [
      {
        question: 'O que o SHA representa?',
        answer: 'Designa "Secure Hash Algorithm", uma classe projetada pela agência federal norte-americana (NSA) para garantir blindagem em autenticações criptográficas oficiais.'
      }
    ],
    tips: [
      'Importante para conferir se deploys de softwares ou releases de scripts em servidores não foram fraudulentamente burlados por terceiros no canal de rede.'
    ],
    relatedToolIds: ['hash-md5', 'senha', 'uuid'],
    slug: 'gerador-de-hash-sha256'
  },

  // FERRAMENTAS WEB
  {
    id: 'meu-ip',
    categoryId: 'ferramentas-web',
    title: 'Meu IP - Qual o meu IP Atual?',
    shortDescription: 'Descubra rapidamente seu endereço de IP de Internet público IPv4 ou IPv6 e dados de geolocalização.',
    longIntro: 'Um atalho clínico para saber sob qual endereço IP suas conexões residenciais ou móveis trafegam na Web, identificando provedor, país, estado e coordenadas gerais simuladas de conexão física.',
    howItWorks: 'Ao acessar, consultamos servidores IP públicos para recuperar o cabeçalho de navegação. Sem expor dados sigilosos ou infringir privacidade regulada.',
    faqs: [
      {
        question: 'Qual a diferença entre IP dinâmico e estático?',
        answer: 'Ip dinâmico muda cada vez que reiniciamos o aparelho modem de rede contratado. Estático mantém sempre um valor imutável acordado para hospedar servidores fiduciários.'
      }
    ],
    tips: [
      'Servidores DNS locais mudam a geolocalização aproximada do seu IP. Use navegadores limpos caso queira testar a VPN instalada.'
    ],
    relatedToolIds: ['localizar-ip', 'dns-lookup', 'port-checker'],
    slug: 'qual-o-meu-ip'
  },
  {
    id: 'localizar-ip',
    categoryId: 'ferramentas-web',
    title: 'Rastreador e Localizador de IP',
    shortDescription: 'Consulte detalhes geográficos, conexões autônomas (ASN) e provedores de qualquer IP mundial.',
    longIntro: 'Uma ferramenta versátil para equipes de suporte, investigadores cibernéticos ou administradores verificarem a origem geográfica e infraestrutura por trás de um IP suspeito obtido em firewalls.',
    howItWorks: 'Insira um IP IPv4 ou IPv6 no campo de consulta e buscaremos as correspondências cadastrais em bases gratuitas de geocodificação.',
    faqs: [
      {
        question: 'O local indicado pela ferramenta mostra a casa exata de alguém?',
        answer: 'Absolutamente não. A geolocalização por IP fornece margens aproximadas, apontando a central técnica do Provedor de Internet (ISP) na cidade ou região correspondente por questões de segurança de dados privados.'
      }
    ],
    tips: [
      'Provedores de redes sociais cruzam estas informações de geolocalização para disparar alertas de acessos de novos aparelhos nas contas.'
    ],
    relatedToolIds: ['meu-ip', 'whois', 'dns-lookup'],
    slug: 'localizar-endereco-de-ip'
  },
  {
    id: 'whois',
    categoryId: 'ferramentas-web',
    title: 'Consulta WHOIS de Domínios',
    shortDescription: 'Veja as informações oficiais de registros dos proprietários de domínios nacionais (.br) e estrangeiros.',
    longIntro: 'Descubra se o domínio que você deseja registrar já possui dono, veja a data exata de vencimento e quais os servidores de DNS responsáveis pela hospedagem técnica.',
    howItWorks: 'Preencha o domínio desejado (ex: google.com.br) para simular ou recuperar a resposta de consulta oficial cadastral pública de registro.',
    faqs: [
      {
        question: 'O que é a proteção WHOIS privada?',
        answer: 'Vários provedores globais oferecem anonimato para ocultar dados de e-mail e nomes dos proprietários dos domínios (.com, .net) visando mitigar spans publicitários incisivos.'
      }
    ],
    tips: [
      'Verifique domínios suspeitos de e-commerce conferindo se foram registrados há pouquíssimos dias de disparar vendas promocionais.'
    ],
    relatedToolIds: ['dns-lookup', 'ssl-checker', 'ping'],
    slug: 'consulta-whois'
  },
  {
    id: 'dns-lookup',
    categoryId: 'ferramentas-web',
    title: 'DNS Lookup - Consulta de Registros',
    shortDescription: 'Consulte os apontamentos A, AAAA, MX, TXT e CNAME de qualquer zona de domínio.',
    longIntro: 'Ferramenta estrutural indispensável de TI para debugar problemas locais de propagação de domínios ou configurações de e-mails corporativos em servidores de apontamento.',
    howItWorks: 'Insira o host de destino e o sistema simula as respostas do servidor identificando os diferentes tipos de registros lógicos.',
    faqs: [
      {
        question: 'O que significa cada registro DNS?',
        answer: 'Registro A mapeia endereços IPv4. AAAA mapeia IPv6. MX lida com servidores responsáveis pelo e-mail receptivo. TXT armazena chaves de autenticação de servidores (SPF/DKIM) para segurança.'
      }
    ],
    tips: [
      'Prazos TTL programados ditam o quão rápido uma alteração de DNS se propagará com sucesso pela Internet mundial.'
    ],
    relatedToolIds: ['whois', 'ssl-checker', 'http-headers'],
    slug: 'consulta-dns-lookup'
  },
  {
    id: 'ssl-checker',
    categoryId: 'ferramentas-web',
    title: 'Verificador de Certificado SSL',
    shortDescription: 'Valide a integridade do certificado SSL HTTPS de domínios e evite alertas de insegurança nos navegadores.',
    longIntro: 'Inspecione a qualidade criptográfica do certificado SSL instalado do seu domínio de e-commerce, datas de vencimento, autoridade emissora e vulnerabilidades de conexões.',
    howItWorks: 'Forneça o domínio corporativo HTTPS para realizar a inspeção estrutural simulada detalhada de validade técnica.',
    faqs: [
      {
        question: 'O que é a autoridade CA no SSL?',
        answer: 'CA representa autoridade certificadora oficial independente (como Let\'s Encrypt ou Cloudflare) responsável por assinar e atestar que a chave de criptografia de ponta a ponta é de fato do domínio solicitado.'
      }
    ],
    tips: [
      'Automatize a renovação dos seus certificados SSL gratuitos de 90 dias com scripts de ACME em servidores Linux.'
    ],
    relatedToolIds: ['http-headers', 'dns-lookup', 'whois'],
    slug: 'verificador-de-certificado-ssl'
  },
  {
    id: 'port-checker',
    categoryId: 'ferramentas-web',
    title: 'Verificador de Portas de Rede',
    shortDescription: 'Verifique se portas de conexões tradicionais (80, 443, 21, 22, 3306) estão abertas e expostas na Internet pública.',
    longIntro: 'Auxilia na detecção de vulnerabilidades e configurações de roteadores ou firewalls testando a acessibilidade de conexões comuns externas.',
    howItWorks: 'Insira um domínio ou IP e escolha a porta recomendada para obter a resposta interativa de conexões bloqueadas ou ativas.',
    faqs: [
      {
        question: 'O que o status "Porta Fechada" representa?',
        answer: 'Indica que o roteador de internet rejeitou conexões na porta testada, ou não possui serviços de softwares aguardando tráfego nessa rota, protegendo o sistema.'
      }
    ],
    tips: [
      'Portas de banco de dados (ex: MySQL 3306) nunca devem permanecer expostas sem limitação restrita de IP confiável no firewall corporativo.'
    ],
    relatedToolIds: ['ping', 'traceroute', 'meu-ip'],
    slug: 'verificador-de-portas-abertas'
  },
  {
    id: 'ping',
    categoryId: 'ferramentas-web',
    title: 'Teste de Ping Online',
    shortDescription: 'Meça a latência em milissegundos e a saúde da conexão para servidores de hospedagens mundiais.',
    longIntro: 'Monitore o tempo de resposta e estabilidade de servidores de mídias ou plataformas de games avaliando o atraso em milissegundos.',
    howItWorks: 'Dispare simulações completas de requisições ICMP para monitorá-las interativamente com gráficos dinâmicos de resposta.',
    faqs: [
      {
        question: 'Latência menor é melhor?',
        answer: 'Sim. Em jogos e transmissões de vídeo, latências inferiores (ex: < 20ms) garantem interações em tempo real isentas de engasgos ou delay térmico.'
      }
    ],
    tips: [
      'Geralmente conexões cabeadas em fibra reduzem o atraso (jitter) quando comparadas a conexões domésticas sem-fio de rádio.'
    ],
    relatedToolIds: ['traceroute', 'port-checker', 'whois'],
    slug: 'teste-de-ping-online'
  },
  {
    id: 'traceroute',
    categoryId: 'ferramentas-web',
    title: 'Traceroute - Rota de Rede',
    shortDescription: 'Rastreie todos os saltos e roteadores intermediários atravessados pelos pacotes até o servidor final.',
    longIntro: 'Inspecione a rota tomada por pacotes de dados de internet. Descubra os nós de telecomunicações que estão causando lentidão na sua infraestrutura.',
    howItWorks: 'Preencha o destino desejado e simule a cascata de hops exibida com milissegundos individuais acumulados.',
    faqs: [
      {
        question: 'Para que serve o Traceroute avançado?',
        answer: 'Ajuda a diagnosticar se falhas de tráfego de conexões residem na rede interna, na operadora nacional ou em fibras marinhas continentais de links internacionais.'
      }
    ],
    tips: [
      'Alguns roteadores de backbone ignoram pacotes de diagnóstico, reportando pontuações asteriscos (* * *) por motivos de segurança anti-DDoS.'
    ],
    relatedToolIds: ['ping', 'port-checker', 'dns-lookup'],
    slug: 'traceroute-de-rede'
  },
  {
    id: 'http-headers',
    categoryId: 'ferramentas-web',
    title: 'Verificador de Headers HTTP',
    shortDescription: 'Inspecione as respostas de cabeçalhos de servidores Web (Cookies, segurança, cache e redirecionamentos).',
    longIntro: 'Verifique se as diretivas de proteção cibernética (com HSTS, CSP ou X-Frame-Options) estão sendo enviadas devidamente pelo seu servidor web.',
    howItWorks: 'Simule o carregamento de uma URL para extrair os cabeçalhos de status HTTP de correspondência imediata.',
    faqs: [
      {
        question: 'O que o cabeçalho HTTP de segurança dita?',
        answer: 'Ele impõe aos navegadores regras estruturais impedindo que o site seja aninhado maliciosamente ou sofra ataques de scripts externos.'
      }
    ],
    tips: [
      'Use caches de headers de navegador corretos para acelerar o carregamento repetido de imagens e arquivos estáticos estáticos pela sua rede.'
    ],
    relatedToolIds: ['ssl-checker', 'dns-lookup', 'whois'],
    slug: 'verificador-de-headers-http'
  },

  // NOVAS CALCULADORAS
  {
    id: 'ipva',
    categoryId: 'calculadoras',
    title: 'Calculadora de IPVA',
    shortDescription: 'Calcule o valor do IPVA do seu veículo com base no valor venal e alíquota do seu estado.',
    longIntro: 'Calcule o valor exato do Imposto sobre Propriedade de Veículos Automotores (IPVA) que você precisa pagar. Considere o valor venal do veículo (tabela FIPE) e a alíquota praticada pelo seu estado para planejar o orçamento anual.',
    howItWorks: 'Informe o valor venal do veículo (consulte a Tabela FIPE), selecione o estado de registro e o tipo de veículo. A calculadora aplica a alíquota correspondente e exibe o valor total do imposto e opções de parcelamento.',
    faqs: [
      { question: 'O que é IPVA?', answer: 'IPVA é o Imposto sobre Propriedade de Veículos Automotores, um tributo estadual cobrado anualmente de todos os proprietários de veículos.' },
      { question: 'Como é calculado o IPVA?', answer: 'O valor do IPVA é calculado multiplicando-se o valor venal do veículo (baseado na Tabela FIPE) pela alíquota definida pelo estado, que varia de 1% a 6% dependendo do tipo de veículo e estado.' },
      { question: 'O que acontece se não pagar o IPVA?', answer: 'O não pagamento do IPVA gera multa, juros e inscrição em dívida ativa, além de impedir o licenciamento do veículo, resultando em multa de trânsito e apreensão do veículo.' }
    ],
    tips: ['Pague o IPVA em cota única para aproveitar descontos que variam de 3% a 5% dependendo do estado.', 'Planeje-se para o início do ano, quando vence a primeira parcela do IPVA na maioria dos estados.'],
    relatedToolIds: ['consumo-combustivel', 'financiamento', 'porcentagem'],
    slug: 'calculadora-de-ipva'
  },
  {
    id: 'imposto-renda',
    categoryId: 'calculadoras',
    title: 'Calculadora de Imposto de Renda (IRPF)',
    shortDescription: 'Simule o cálculo do Imposto de Renda Pessoa Física com base na tabela progressiva atual.',
    longIntro: 'Calcule quanto você precisa pagar ou receber de restituição do Imposto de Renda da Pessoa Física (IRPF). Considere rendimentos tributáveis, deduções legais e dependentes para uma estimativa precisa.',
    howItWorks: 'Informe seus rendimentos tributáveis anuais, o total de despesas dedutíveis (saúde, educação, previdência) e a quantidade de dependentes. A calculadora aplica a tabela progressiva do IRPF e exibe o imposto devido.',
    faqs: [
      { question: 'Quem precisa declarar Imposto de Renda?', answer: 'Deve declarar IRPF quem recebeu rendimentos tributáveis acima de R$ 28.559,70 no ano anterior, ou possui bens acima de R$ 300.000, entre outros critérios estabelecidos pela Receita Federal.' },
      { question: 'O que pode ser deduzido do IRPF?', answer: 'Despesas com saúde (sem limite), educação (limite anual), previdência oficial e privada (PGBL), dependentes legais e pensão alimentícia podem ser deduzidos da base de cálculo.' }
    ],
    tips: ['Guarde todos os comprovantes de despesas médicas e educacionais ao longo do ano para garantir as deduções na declaração.', 'A declaração completa compensa quando você tem muitas despesas dedutíveis; caso contrário, o modelo simplificado pode ser mais vantajoso.'],
    relatedToolIds: ['salario-liquido', 'inss', 'decimo-terceiro'],
    slug: 'calculadora-de-imposto-de-renda'
  },
  {
    id: 'multa-transito',
    categoryId: 'calculadoras',
    title: 'Calculadora de Multa de Trânsito',
    shortDescription: 'Calcule o valor de multas de trânsito com descontos e simule infrações gravíssimas, graves, médias e leves.',
    longIntro: 'Simule os valores de multas de trânsito brasileiras de acordo com a gravidade da infração. Veja os valores com desconto de 20% para pagamento antecipado e sem desconto para pagamento após o vencimento.',
    howItWorks: 'Selecione a gravidade da infração (leve, média, grave ou gravíssima) e escolha se deseja pagar com ou sem desconto. A calculadora exibe o valor original e o valor com desconto.',
    faqs: [
      { question: 'Quais os valores das multas de trânsito em 2026?', answer: 'Infração leve: R$ 88,38; Média: R$ 130,16; Grave: R$ 195,23; Gravíssima: R$ 293,47. Multas gravíssimas podem ter fator multiplicador de até 10x.' },
      { question: 'Como funciona o desconto de 20%?', answer: 'O pagamento da multa até a data de vencimento garante desconto de 20% sobre o valor original. Após o vencimento, o valor é integral e pode sofrer acréscimos.' }
    ],
    tips: ['Sempre pague as multas com desconto de 20% até a data de vencimento para economizar.', 'Infrações gravíssimas com fator multiplicador (como dirigir embriagado) podem chegar a R$ 2.934,70 ou mais.'],
    relatedToolIds: ['ipva', 'consumo-combustivel', 'porcentagem'],
    slug: 'calculadora-de-multa-de-transito'
  },
  {
    id: 'preco-por-km',
    categoryId: 'calculadoras',
    title: 'Calculadora de Preço por Km (Motoristas de App)',
    shortDescription: 'Calcule quanto você ganha por km rodado em aplicativos como Uber, 99 e outros.',
    longIntro: 'Ferramenta essencial para motoristas de aplicativo calcularem o rendimento real por quilômetro rodado, considerando gastos com combustível, manutenção e comissão da plataforma.',
    howItWorks: 'Informe o valor recebido por corrida, a distância percorrida, o consumo do veículo, o preço do combustível e a comissão do aplicativo. A calculadora exibe o lucro líquido por km.',
    faqs: [
      { question: 'Qual o lucro médio por km para motoristas de app?', answer: 'O lucro médio varia entre R$ 0,30 e R$ 1,00 por km, dependendo do veículo, combustível e eficiência operacional.' },
      { question: 'Como reduzir custos por km?', answer: 'Manter a manutenção em dia, dirigir de forma eficiente, aproveitar horários de tarifa dinâmica e usar combustível mais econômico ajudam a aumentar o lucro por km.' }
    ],
    tips: ['Acompanhe o rendimento por km semanalmente para identificar padrões de lucratividade.', 'Considere todos os custos: combustível, manutenção, seguro, IPVA e depreciação do veículo.'],
    relatedToolIds: ['consumo-combustivel', 'ipva', 'porcentagem'],
    slug: 'calculadora-de-preco-por-km'
  },
  {
    id: 'gestacao',
    categoryId: 'calculadoras',
    title: 'Calculadora de Gestação - Idade Gestacional',
    shortDescription: 'Calcule a idade gestacional, data provável do parto e acompanhe o trimestre da gravidez.',
    longIntro: 'Uma calculadora completa para gestantes descobrirem a idade gestacional atual, data provável do parto (DPP), trimestre da gestação e curvas de peso recomendadas.',
    howItWorks: 'Informe a data da última menstruação (DUM) ou a data prevista para o parto. A ferramenta calcula automaticamente a semana gestacional atual, o trimestre e a data provável do parto.',
    faqs: [
      { question: 'Como calcular a idade gestacional?', answer: 'A idade gestacional é calculada a partir da Data da Última Menstruação (DUM) ou por ultrassom precoce. A gestação completa dura em média 40 semanas ou 280 dias.' },
      { question: 'O que é a Data Provável do Parto (DPP)?', answer: 'A DPP é calculada somando-se 280 dias (40 semanas) ao primeiro dia da última menstruação. Apenas 5% dos bebês nascem exatamente na data prevista.' }
    ],
    tips: ['Consulte seu obstetra regularmente para acompanhamento preciso da gestação, especialmente no primeiro trimestre.', 'Use a calculadora como referência, mas lembre-se que cada gestação é única e as datas podem variar.'],
    relatedToolIds: ['imc', 'idade', 'dias-entre-datas'],
    slug: 'calculadora-de-gestacao'
  },
  {
    id: 'tmb',
    categoryId: 'calculadoras',
    title: 'Calculadora de TMB (Taxa Metabólica Basal)',
    shortDescription: 'Descubra quantas calorias seu corpo gasta em repouso para manter funções vitais.',
    longIntro: 'Calcule sua Taxa Metabólica Basal (TMB) usando as fórmulas de Mifflin-St Jeor ou Harris-Benedict. Ideal para quem quer emagrecer, ganhar massa muscular ou simplesmente entender seu gasto calórico diário.',
    howItWorks: 'Informe seu peso, altura, idade e sexo. A calculadora utiliza fórmulas validadas cientificamente para estimar as calorias que seu corpo queima em repouso absoluto.',
    faqs: [
      { question: 'O que é TMB?', answer: 'A Taxa Metabólica Basal (TMB) é a quantidade mínima de calorias que seu corpo necessita para manter funções vitais como respiração, circulação e temperatura corporal em repouso.' },
      { question: 'Qual a diferença entre TMB e GET?', answer: 'O Gasto Energético Total (GET) inclui a TMB mais as calorias gastas em atividades físicas diárias. Para emagrecer, recomenda-se consumir entre a TMB e o GET.' }
    ],
    tips: ['Nunca consuma menos calorias que sua TMB por longos períodos, pois isso pode desacelerar seu metabolismo.', 'A TMB diminui com a idade e com a perda de peso, por isso reajuste sua dieta periodicamente.'],
    relatedToolIds: ['imc', 'idade', 'consumo-combustivel'],
    slug: 'calculadora-de-taxa-metabolica-basal'
  },
  {
    id: 'margem-lucro',
    categoryId: 'calculadoras',
    title: 'Calculadora de Margem de Lucro',
    shortDescription: 'Calcule a margem de lucro, markup e preço de venda ideal para seus produtos.',
    longIntro: 'Ferramenta essencial para empreendedores e lojistas calcularem a margem de lucro bruta e líquida, o markup ideal e o preço de venda sugerido considerando custos fixos e variáveis.',
    howItWorks: 'Informe o custo do produto, as despesas variáveis (comissões, impostos), despesas fixas rateadas e a margem de lucro desejada. A calculadora retorna o preço de venda sugerido e a margem real.',
    faqs: [
      { question: 'Qual a diferença entre markup e margem?', answer: 'Markup é um multiplicador aplicado sobre o custo para definir o preço. Margem é o percentual de lucro sobre o preço de venda final. Uma margem de 30% equivale a um markup de 1,43.' },
      { question: 'Como definir a margem de lucro ideal?', answer: 'A margem ideal varia por segmento: supermercados trabalham com 15-25%, lojas de roupas 40-60%, e serviços 30-50%. Considere concorrência, posicionamento e custos operacionais.' }
    ],
    tips: ['Revise suas margens periodicamente para acompanhar mudanças nos custos de insumos e matéria-prima.', 'Inclua todos os custos ocultos como embalagem, frete e taxas de cartão de crédito no cálculo.'],
    relatedToolIds: ['porcentagem', 'regra-de-tre', 'salario-liquido'],
    slug: 'calculadora-de-margem-de-lucro'
  },
  {
    id: 'gorjeta',
    categoryId: 'calculadoras',
    title: 'Calculadora de Gorjeta',
    shortDescription: 'Calcule gorjeta de 10%, 15% ou qualquer percentual em restaurantes e serviços.',
    longIntro: 'Calcule facilmente o valor da gorjeta em restaurantes, bares e serviços. Divida a conta entre amigos e saiba exatamente quanto cada um deve pagar incluindo a gorjeta.',
    howItWorks: 'Informe o valor total da conta, o percentual de gorjeta desejado (padrão 10%) e o número de pessoas para dividir. A calculadora exibe o valor da gorjeta, total com gorjeta e valor por pessoa.',
    faqs: [
      { question: 'A gorjeta é obrigatória no Brasil?', answer: 'Não, a gorjeta é opcional no Brasil. No entanto, muitos restaurantes incluem 10% opcionais na conta como sugestão para o serviço.' },
      { question: 'Os 10% vão para o garçom ou para o restaurante?', answer: 'Por lei, os 10% devem ser rateados entre todos os funcionários do salão (garçons, cumins, bartenders) e não podem ser retidos pelo estabelecimento.' }
    ],
    tips: ['Se o serviço for excepcional, considere dar 15% ou 20% de gorjeta.', 'Em grupos grandes, combine antes se a gorjeta será incluída para evitar constrangimentos na hora de pagar.'],
    relatedToolIds: ['porcentagem', 'regra-de-tre', 'margem-lucro'],
    slug: 'calculadora-de-gorjeta'
  },

  // NOVOS CONVERSORES
  {
    id: 'polegadas-para-centimetros',
    categoryId: 'conversores',
    title: 'Conversor de Polegadas para Centímetros',
    shortDescription: 'Converta polegadas (in) para centímetros (cm) e vice-versa instantaneamente.',
    longIntro: 'Converta facilmente medidas entre polegadas e centímetros. Ideal para dimensionamento de telas de TV, monitores, celulares, parafusos, ferramentas e móveis importados.',
    howItWorks: 'Digite o valor em polegadas ou centímetros. A conversão é automática usando o fator 1 polegada = 2,54 centímetros.',
    faqs: [
      { question: 'Quantos centímetros tem uma polegada?', answer: 'Exatamente 2,54 centímetros equivalem a 1 polegada (1 in = 2,54 cm).' },
      { question: 'Como converter polegadas para cm de cabeça?', answer: 'Multiplique o número de polegadas por 2,5 para uma aproximação rápida. Para precisão, multiplique por 2,54.' }
    ],
    tips: ['Telas de TV e monitores são medidas em polegadas na diagonal. Uma TV de 55 polegadas tem aproximadamente 140 cm de diagonal.'],
    relatedToolIds: ['metros-para-pes', 'celsius-para-fahrenheit', 'quilos-para-libras'],
    slug: 'converter-polegadas-para-centimetros'
  },
  {
    id: 'milhas-para-quilometros',
    categoryId: 'conversores',
    title: 'Conversor de Milhas para Quilômetros',
    shortDescription: 'Converta distâncias entre milhas e quilômetros para viagens e corridas.',
    longIntro: 'Converta distâncias entre o sistema imperial (milhas) e o sistema métrico (quilômetros). Essencial para planejamento de viagens internacionais, corridas de rua e análises de mapas.',
    howItWorks: 'Digite o valor em milhas ou quilômetros para obter a conversão instantânea. 1 milha = 1,60934 quilômetros.',
    faqs: [
      { question: 'Quantos km tem uma milha?', answer: '1 milha terrestre equivale a aproximadamente 1,609 km. Uma maratona tem 42,195 km ou 26,2 milhas.' },
      { question: 'Qual a diferença entre milha terrestre e náutica?', answer: 'A milha terrestre (statute mile) tem 1.609 metros. A milha náutica tem 1.852 metros e é usada em navegação marítima e aérea.' }
    ],
    tips: ['Para conversão rápida de milhas para km, multiplique por 1,6. Para km para milhas, divida por 1,6.'],
    relatedToolIds: ['metros-para-pes', 'polegadas-para-centimetros', 'real-para-dolar'],
    slug: 'converter-milhas-para-quilometros'
  },
  {
    id: 'kmh-para-mph',
    categoryId: 'conversores',
    title: 'Conversor de Km/h para mph',
    shortDescription: 'Converta velocidades entre quilômetros por hora e milhas por hora.',
    longIntro: 'Converta velocidades entre o sistema métrico (km/h) e o sistema imperial (mph). Útil para motoristas que viajam para os EUA, Inglaterra ou outros países que usam milhas.',
    howItWorks: 'Digite a velocidade em km/h ou mph para conversão automática. 1 km/h = 0,62137 mph.',
    faqs: [
      { question: 'Quantos mph são 100 km/h?', answer: '100 km/h equivalem a aproximadamente 62 mph. A conta é: 100 × 0,62137 = 62,1 mph.' },
      { question: 'Qual o limite de velocidade nos EUA?', answer: 'Nos EUA, os limites variam de 25 mph (40 km/h) em áreas residenciais a 75 mph (120 km/h) em algumas rodovias interestaduais.' }
    ],
    tips: ['Ao alugar um carro nos EUA, lembre-se que 60 mph ≈ 96 km/h, então mantenha-se atento aos limites locais.'],
    relatedToolIds: ['milhas-para-quilometros', 'metros-para-pes', 'celsius-para-fahrenheit'],
    slug: 'converter-kmh-para-mph'
  },
  {
    id: 'euro-para-real',
    categoryId: 'conversores',
    title: 'Conversor de Euro para Real',
    shortDescription: 'Converta valores entre Euro (EUR) e Real (BRL) com cotação personalizável.',
    longIntro: 'Converta valores entre Euro e Real Brasileiro para viagens à Europa, compras internacionais ou negócios. A cotação é ajustável manualmente para refletir o câmbio do dia.',
    howItWorks: 'Informe o valor em Euros ou Reais e ajuste a cotação do câmbio conforme a taxa comercial ou turismo do dia.',
    faqs: [
      { question: 'Qual a cotação do Euro hoje?', answer: 'A cotação do Euro varia diariamente. Consulte seu banco ou corretora para a taxa comercial atualizada antes de fazer câmbio.' },
      { question: 'Qual a diferença entre câmbio comercial e turismo?', answer: 'O câmbio turismo é geralmente mais caro que o comercial, pois inclui spreads, IOF e taxas operacionais cobradas pelas casas de câmbio.' }
    ],
    tips: ['Compare a cotação em diferentes casas de câmbio e bancos antes de comprar euros para sua viagem.', 'Lembre-se do IOF de 1,1% para compra de moeda em espécie e 4,38% para transações no cartão.'],
    relatedToolIds: ['real-para-dolar', 'porcentagem', 'juros-compostos'],
    slug: 'converter-euro-para-real'
  },
  {
    id: 'bitcoin-para-real',
    categoryId: 'conversores',
    title: 'Conversor de Bitcoin para Real',
    shortDescription: 'Converta Bitcoin (BTC) e outras criptomoedas para Real Brasileiro (BRL).',
    longIntro: 'Converta Bitcoin e outras criptomoedas populares para Real Brasileiro. Acompanhe o valor aproximado com cotação personalizável para simular seus investimentos em criptoativos.',
    howItWorks: 'Informe a quantidade de Bitcoin ou o valor em Reais e ajuste a cotação da criptomoeda conforme o mercado.',
    faqs: [
      { question: 'O valor do Bitcoin é atualizado em tempo real?', answer: 'Esta ferramenta usa cotação manual ajustável. Para valores em tempo real, consulte exchanges como Binance, Mercado Bitcoin ou CoinMarketCap.' },
      { question: 'É seguro investir em Bitcoin?', answer: 'O Bitcoin é um ativo de alto risco e volatilidade. Invista apenas o que você pode perder e diversifique seus investimentos.' }
    ],
    tips: ['Nunca invista todo seu patrimônio em criptomoedas devido à alta volatilidade.', 'Use apenas exchanges confiáveis e regulamentadas no Brasil para comprar e vender criptomoedas.'],
    relatedToolIds: ['real-para-dolar', 'euro-para-real', 'porcentagem'],
    slug: 'converter-bitcoin-para-real'
  },

  // NOVOS GERADORES
  {
    id: 'nome-aleatorio',
    categoryId: 'geradores',
    title: 'Gerador de Nome Aleatório',
    shortDescription: 'Gere nomes aleatórios brasileiros com sobrenomes para testes e criações.',
    longIntro: 'Gere nomes completos aleatórios com estilo brasileiro para usar em testes de sistemas, criação de personagens, histórias ou exemplos em apresentações.',
    howItWorks: 'Selecione o gênero e a quantidade de nomes desejados. Clique em gerar para obter nomes completos aleatórios com sobrenomes brasileiros comuns.',
    faqs: [
      { question: 'Os nomes gerados são de pessoas reais?', answer: 'Não. Todos os nomes são gerados aleatoriamente a partir de listas de nomes e sobrenomes comuns, sem qualquer relação com pessoas reais.' },
      { question: 'Posso usar os nomes em sistemas em produção?', answer: 'Sim, os nomes são ideais para popular bancos de dados de teste, criar exemplos em documentações e simular cadastros em ambientes de homologação.' }
    ],
    tips: ['Perfeito para popular bancos de dados de teste com dados não-sensíveis.', 'Use a função de cópia rápida para exportar vários nomes de uma vez para sua planilha.'],
    relatedToolIds: ['cpf', 'cnpj', 'senha'],
    slug: 'gerador-de-nome-aleatorio'
  },
  {
    id: 'endereco-brasil',
    categoryId: 'geradores',
    title: 'Gerador de Endereço Brasileiro',
    shortDescription: 'Gere endereços brasileiros completos com CEP, rua, bairro e cidade para testes.',
    longIntro: 'Gere endereços fictícios brasileiros completos para desenvolvimento de sistemas, testes de formulários de cadastro e simulações de entrega. Inclui logradouro, número, bairro, cidade, estado e CEP.',
    howItWorks: 'Selecione a quantidade de endereços desejada. A ferramenta gera endereços aleatórios em várias regiões do Brasil com dados consistentes.',
    faqs: [
      { question: 'Os endereços gerados são reais?', answer: 'Não. Os endereços são gerados sinteticamente usando combinações aleatórias de ruas, bairros e CEPs de diversas cidades brasileiras.' },
      { question: 'Os CEPs gerados são válidos?', answer: 'Os CEPs seguem a formatação válida XXXXX-XXX mas não correspondem a endereços reais. São apenas para testes.' }
    ],
    tips: ['Use endereços gerados para testar fluxos completos de checkout em lojas virtuais.', 'Combine com o gerador de CPF e Nome para criar cadastros completos de teste.'],
    relatedToolIds: ['cpf', 'cnpj', 'nome-aleatorio'],
    slug: 'gerador-de-endereco-brasileiro'
  },
  {
    id: 'codigo-barras',
    categoryId: 'geradores',
    title: 'Gerador de Código de Barras',
    shortDescription: 'Gere códigos de barras EAN-13 para produtos e testes de sistemas.',
    longIntro: 'Gere códigos de barras no formato EAN-13 válidos para simular produtos em sistemas PDV, testes de leitura óptica e desenvolvimento de aplicações comerciais.',
    howItWorks: 'Informe os primeiros 12 dígitos do código (opcional) e clique em gerar. A ferramenta calcula o dígito verificador e exibe o código de barras completo.',
    faqs: [
      { question: 'O que é EAN-13?', answer: 'EAN-13 (European Article Number) é um padrão internacional de código de barras de 13 dígitos usado para identificação de produtos no varejo.' },
      { question: 'Posso usar estes códigos em produtos reais?', answer: 'Não. Os códigos gerados são para testes e desenvolvimento. Produtos reais precisam de códigos GS1 registrados oficialmente.' }
    ],
    tips: ['Códigos iniciados com 789 são reservados para produtos registrados no Brasil (GS1 Brasil).', 'Use esta ferramenta para testar leitores de código de barras em desenvolvimento.'],
    relatedToolIds: ['cpf', 'cnpj', 'uuid'],
    slug: 'gerador-de-codigo-de-barras'
  },
  {
    id: 'placa-mercosul',
    categoryId: 'geradores',
    title: 'Gerador de Placa de Carro Mercosul',
    shortDescription: 'Gere placas de veículo no padrão Mercosul para testes e simulações.',
    longIntro: 'Gere placas de veículo no novo padrão Mercosul (AAA1A11) adotado no Brasil. Ideal para testes de sistemas de estacionamento, pedágio e cadastro de veículos.',
    howItWorks: 'Selecione a quantidade e o estado desejado. A ferramenta gera placas no formato Mercosul com 4 letras e 3 números.',
    faqs: [
      { question: 'Qual o formato da placa Mercosul?', answer: 'O padrão Mercosul segue o formato ABC1D23 (4 letras e 3 números), diferente do antigo formato ABC-1234.' },
      { question: 'Todos os estados já adotaram a placa Mercosul?', answer: 'Sim, desde 2020 todos os estados brasileiros emitem o novo padrão Mercosul obrigatoriamente para novos veículos.' }
    ],
    tips: ['Placas geradas são aleatórias e não correspondem a veículos reais registrados.', 'Ideal para testar sistemas de reconhecimento automático de placas (LPR).'],
    relatedToolIds: ['ipva', 'consumo-combustivel', 'cpf'],
    slug: 'gerador-de-placa-mercosul'
  },
  {
    id: 'cores-aleatorias',
    categoryId: 'geradores',
    title: 'Gerador de Cores Aleatórias',
    shortDescription: 'Gere paletas de cores aleatórias com código HEX, RGB e nome da cor.',
    longIntro: 'Gere cores aleatórias para design gráfico, desenvolvimento web e inspiração criativa. Obtenha o código hexadecimal (HEX), valores RGB e o nome aproximado da cor.',
    howItWorks: 'Clique em gerar para criar uma nova cor aleatória. Visualize a cor em tempo real e copie os códigos HEX ou RGB para usar em seus projetos.',
    faqs: [
      { question: 'Qual a diferença entre HEX e RGB?', answer: 'HEX é uma representação hexadecimal das cores (#FF0000 para vermelho). RGB usa valores decimais de 0 a 255 para vermelho, verde e azul (rgb(255,0,0)).' },
      { question: 'Para que servem paletas de cores?', answer: 'Paletas de cores são usadas em design gráfico, desenvolvimento web, decoração e arte para garantir harmonia visual entre os elementos.' }
    ],
    tips: ['Use cores complementares (opostas no círculo cromático) para criar contraste em seus designs.', 'Cores análogas (vizinhas no círculo cromático) criam harmonia e suavidade visual.'],
    relatedToolIds: ['senha', 'uuid', 'lorem-ipsum'],
    slug: 'gerador-de-cores-aleatorias'
  },

  // NOVAS FERRAMENTAS WEB
  {
    id: 'status-site',
    categoryId: 'ferramentas-web',
    title: 'Verificador de Status de Site (Up/Down)',
    shortDescription: 'Verifique se um site está online ou offline com teste de disponibilidade.',
    longIntro: 'Verifique se um site está no ar (up) ou fora do ar (down) com simulação de requisição HTTP. Monitore a disponibilidade dos seus sites favoritos ou concorrentes.',
    howItWorks: 'Informe a URL do site desejado e clique em verificar. A ferramenta simula uma requisição HTTP e retorna o status code e o tempo de resposta aproximado.',
    faqs: [
      { question: 'O que significa status 200?', answer: 'Status 200 significa que o site está online e respondendo normalmente às requisições HTTP.' },
      { question: 'O que significa status 404?', answer: 'Status 404 indica que a página não foi encontrada no servidor, embora o site possa estar online.' }
    ],
    tips: ['Use esta ferramenta para monitorar periodicamente seus próprios sites.', 'Verifique sites suspeitos antes de clicar em links recebidos por e-mail.'],
    relatedToolIds: ['ping', 'ssl-checker', 'http-headers'],
    slug: 'verificador-de-status-de-site'
  },
  {
    id: 'validador-url',
    categoryId: 'ferramentas-web',
    title: 'Validador de URL',
    shortDescription: 'Valide se uma URL está corretamente formatada e identifique seus componentes.',
    longIntro: 'Valide URLs e analise seus componentes: protocolo, domínio, caminho, parâmetros de consulta e fragmentos. Essencial para desenvolvedores que trabalham com integrações de APIs e links.',
    howItWorks: 'Cole uma URL no campo de entrada e veja a análise detalhada de cada componente da URL, validação de formato e verificação de segurança.',
    faqs: [
      { question: 'O que torna uma URL inválida?', answer: 'Uma URL inválida geralmente contém caracteres especiais não codificados, espaços, protocolo incorreto ou formatação inadequada.' },
      { question: 'URLs com HTTPS são sempre seguras?', answer: 'HTTPS indica que a comunicação é criptografada, mas não garante que o site seja legítimo ou seguro. Sempre verifique o conteúdo e a reputação do site.' }
    ],
    tips: ['Sempre codifique URLs com parâmetros especiais usando encodeURIComponent() em JavaScript.', 'URLs encurtadas podem esconder destinos maliciosos - verifique antes de clicar.'],
    relatedToolIds: ['encode-url', 'decode-url', 'ssl-checker'],
    slug: 'validador-de-url'
  },
  {
    id: 'titulo-eleitor',
    categoryId: 'ferramentas-web',
    title: 'Verificador de Título de Eleitor',
    shortDescription: 'Valide o número do título de eleitor e consulte informações da zona eleitoral.',
    longIntro: 'Valide a autenticidade do número do Título de Eleitor através dos dígitos verificadores. Ideal para sistemas de cadastro que precisam verificar documentos eleitorais.',
    howItWorks: 'Digite o número do título de eleitor (com ou sem pontos). A ferramenta valida os dígitos verificadores e identifica o estado e zona eleitoral aproximados.',
    faqs: [
      { question: 'Quantos dígitos tem o Título de Eleitor?', answer: 'O Título de Eleitor possui 12 dígitos no formato XXXX XXXX XX XX, divididos em sequência, zona, seção e dígitos verificadores.' },
      { question: 'Onde consultar a situação do Título de Eleitor?', answer: 'A situação regular do título pode ser consultada no site oficial do Tribunal Superior Eleitoral (TSE) ou no aplicativo e-Título.' }
    ],
    tips: ['Mantenha seu título de eleitor regularizado para evitar multas e impedimentos como: não poder tirar passaporte ou assumir cargos públicos.', 'Vote sempre para manter seu título em situação regular!'],
    relatedToolIds: ['cpf', 'cep-brasil', 'cnae-consulta'],
    slug: 'verificador-de-titulo-de-eleitor'
  },

  // NOVOS UTILITÁRIOS
  {
    id: 'cronometro',
    categoryId: 'utilitarios',
    title: 'Cronômetro Online',
    shortDescription: 'Cronômetro preciso com voltas e controle de tempo para treinos e atividades.',
    longIntro: 'Um cronômetro completo e preciso diretamente no navegador. Perfeito para treinos físicos, cooking timing, medição de produtividade (Pomodoro) e qualquer atividade que precise de controle de tempo.',
    howItWorks: 'Clique em iniciar para começar a contagem. Use o botão de volta para marcar intervalos. O cronômetro exibe horas, minutos, segundos e centésimos.',
    faqs: [
      { question: 'O cronômetro funciona offline?', answer: 'Sim, o cronômetro funciona 100% offline pois roda diretamente no seu navegador sem necessidade de conexão com a internet.' },
      { question: 'Quantas voltas posso marcar?', answer: 'Você pode marcar quantas voltas quiser. Cada volta registra o tempo parcial e o tempo total decorrido.' }
    ],
    tips: ['Use para treinos intervalados (HIIT) alternando 30 segundos de esforço e 15 de descanso.', 'A técnica Pomodoro usa ciclos de 25 minutos de foco e 5 minutos de pausa.'],
    relatedToolIds: ['horas-para-minutos', 'dias-entre-datas', 'contador-caracteres'],
    slug: 'cronometro-online'
  },
  {
    id: 'separador-silabas',
    categoryId: 'utilitarios',
    title: 'Separador de Sílabas',
    shortDescription: 'Separe palavras em sílabas corretamente de acordo com as regras gramaticais.',
    longIntro: 'Ferramenta educacional que separa palavras em sílabas seguindo as regras oficiais de divisão silábica da língua portuguesa. Essencial para estudantes, professores e profissionais de revisão textual.',
    howItWorks: 'Digite ou cole uma palavra ou texto. A ferramenta analisa e separa cada palavra em sílabas destacadas visualmente com cores.',
    faqs: [
      { question: 'Como funciona a separação silábica?', answer: 'A separação silábica segue regras como: não separar ditongos (oi, ei, ou), separar hiatos (sa-ú-de), consoantes dobradas (car-ro), e encontros consonantais (prato: pra-to).' },
      { question: 'Todas as palavras seguem as mesmas regras?', answer: 'A maioria segue, mas existem exceções e palavras com dupla grafia. A ferramenta cobre as regras mais comuns da gramática brasileira.' }
    ],
    tips: ['A separação correta de sílabas é essencial para a translineação (divisão de palavras no final da linha) em textos formatados.', 'Use esta ferramenta como apoio pedagógico para ensino de gramática e ortografia.'],
    relatedToolIds: ['contador-caracteres', 'contador-palavras', 'removedor-espacos'],
    slug: 'separador-de-silabas'
  },
  {
    id: 'maiusculas-minusculas',
    categoryId: 'utilitarios',
    title: 'Conversor de Maiúsculas/Minúsculas',
    shortDescription: 'Converta textos entre maiúsculas, minúsculas, capitalizado e alternado rapidamente.',
    longIntro: 'Converta seus textos entre diferentes formatos de capitalização: maiúsculas, minúsculas, primeira letra maiúscula (capitalizado), alternado e título. Ideal para formatação de títulos e correções de digitação.',
    howItWorks: 'Cole ou digite o texto e selecione o formato desejado. A conversão é instantânea e você pode copiar o resultado com um clique.',
    faqs: [
      { question: 'Qual a diferença entre capitalizado e título?', answer: 'Capitalizado coloca a primeira letra de cada frase em maiúscula. Título coloca a primeira letra de cada palavra em maiúscula (exceto artigos e preposições).' },
      { question: 'Texto em maiúsculas é considerado grito na internet?', answer: 'Sim, escrever totalmente em maiúsculas é considerado como gritar na comunicação digital. Use maiúsculas apenas para ênfase moderada.' }
    ],
    tips: ['Evite escrever textos longos em maiúsculas na internet - além de cansativo, é considerado má educação.', 'Use o formato Título para headlines e o formato Capitalizado para parágrafos normais.'],
    relatedToolIds: ['contador-caracteres', 'removedor-espacos', 'contador-palavras'],
    slug: 'conversor-maiusculas-minusculas'
  },
  {
    id: 'extrator-email',
    categoryId: 'utilitarios',
    title: 'Extrator de E-mails',
    shortDescription: 'Extraia todos os endereços de e-mail de um texto ou página HTML.',
    longIntro: 'Extraia automaticamente todos os endereços de e-mail presentes em um texto, código HTML ou documento. Útil para profissionais de marketing, recrutadores e desenvolvedores.',
    howItWorks: 'Cole o texto ou HTML no campo de entrada. A ferramenta identifica e extrai todos os endereços de e-mail válidos usando expressões regulares.',
    faqs: [
      { question: 'Quais formatos de e-mail são reconhecidos?', answer: 'Qualquer formato válido de e-mail como nome@dominio.com, nome.sobrenome@empresa.com.br, nome+tag@dominio.org, entre outros.' },
      { question: 'A ferramenta extrai e-mails de páginas web?', answer: 'Sim, cole o código HTML completo da página e a ferramenta extrairá todos os e-mails encontrados no conteúdo.' }
    ],
    tips: ['Sempre respeite a LGPD ao coletar e processar endereços de e-mail de terceiros.', 'Use esta ferramenta apenas para fins legítimos como contato profissional ou migração de dados autorizada.'],
    relatedToolIds: ['removedor-espacos', 'contador-caracteres', 'encode-url'],
    slug: 'extrator-de-emails'
  },
  {
    id: 'comparador-textos',
    categoryId: 'utilitarios',
    title: 'Comparador de Textos (Diff)',
    shortDescription: 'Compare dois textos e veja as diferenças destacadas linha a linha.',
    longIntro: 'Compare dois textos lado a lado e identifique diferenças entre eles. Ideal para revisão de documentos, comparação de versões de código, verificação de alterações em contratos e trabalhos acadêmicos.',
    howItWorks: 'Cole o texto original (versão A) e o texto modificado (versão B). A ferramenta destaca em verde as adições e em vermelho as remoções.',
    faqs: [
      { question: 'O que significa diff?', answer: 'Diff é a abreviação de difference (diferença). É uma ferramenta que mostra linha a linha o que foi adicionado, removido ou modificado entre duas versões de um texto.' },
      { question: 'Quantos caracteres posso comparar?', answer: 'Não há limite definido para a comparação. Para melhores resultados, recomenda-se textos de até 50 mil caracteres.' }
    ],
    tips: ['Use o comparador para verificar plágio ou similaridade entre textos acadêmicos.', 'Antes de atualizar um site, compare o novo texto com o atual para garantir que nenhuma informação importante foi perdida.'],
    relatedToolIds: ['contador-caracteres', 'contador-palavras', 'removedor-espacos'],
    slug: 'comparador-de-textos'
  },

  // UTITLITARIOS
  {
    id: 'contador-caracteres',
    categoryId: 'utilitarios',
    title: 'Contador de Caracteres e Palavras',
    shortDescription: 'Analise o total de letras, espaços, palavras e parágrafos do seu texto dinamicamente em tempo real.',
    longIntro: 'Excelente utilitário para redatores, estudantes acadêmicos e analistas de redes sociais adaptarem textos aos limites de postagens regulamentados do Twitter, LinkedIn, Instagram e metatags do Google.',
    howItWorks: 'À medida que você digita ou cola, as estatísticas de totais de caracteres (com e sem espaços), palavras e tempo de leitura dinâmica são atualizados sem cliques adicionais de ativação.',
    faqs: [
      {
        question: 'Por que o limite de caracteres importa para SEO do Google?',
        answer: 'O Google exibe cerca de 60 caracteres no título e de 155 a 160 caracteres nas descrições de trecho de resultados de buscas da SERP para prevenir cortes indesejados nas telas dos celulares.'
      }
    ],
    tips: [
      'Cole relatórios inteiros para calibrar de forma limpa o tempo de atenção de consumo estimado para o seu material.'
    ],
    relatedToolIds: ['removedor-espacos', 'lorem-ipsum', 'senha'],
    slug: 'contador-de-caracteres'
  },
  {
    id: 'contador-palavras',
    categoryId: 'utilitarios',
    title: 'Contador de Palavras Completo',
    shortDescription: 'Métricas exatas de volume léxico, frequência de repetições e densidade vocabular.',
    longIntro: 'Vá além da mera contagem bruta. Entenda a densidade de palavras-chave mais repetidas no seu material escrito para orientar inteligência editorial e SEO avançado.',
    howItWorks: 'O processador varre o texto, isola pontuações e tabula as repetições estruturadas hierarquicamente.',
    faqs: [
      {
        question: 'O excesso de repetição de palavras prejudica o ranking do meu site no Google?',
        answer: 'Sim, a prática conhecida como "Keyword Stuffing" (lotar páginas com palavras-chave repetitivas desnecessárias) prejudica a legibilidade e é detectada por filtros restritivos de spam dos mecanismos modernos.'
      }
    ],
    tips: [
      'Use sinônimos elegantes para diversificar a densidade textual e preservar a fluidez de leitura de seu portal.'
    ],
    relatedToolIds: ['contador-caracteres', 'removedor-espacos', 'lorem-ipsum'],
    slug: 'contador-de-palavras'
  },
  {
    id: 'removedor-espacos',
    categoryId: 'utilitarios',
    title: 'Removedor de Espaços e Linhas',
    shortDescription: 'Limpe textos eliminando tabulações extras, quebras de linhas desnecessárias ou espaços redundantes.',
    longIntro: 'Limpe blocos de códigos fontes ou relatórios copiados de arquivos PDFs que comumente importam quebras de parágrafos quebrados e espaços em branco que poluem a paginação.',
    howItWorks: 'Regule se quer remover linhas vazias, espaços duplicados ou reduzir tudo de forma condensada a uma única linha contínua.',
    faqs: [
      {
        question: 'Este processo apaga pontuação útil?',
        answer: 'Não. Ele foca apenas em higienizar caracteres invisíveis de espaços em branco vazios e caracteres de controle invisíveis de quebras de página.'
      }
    ],
    tips: [
      'Útil para higienizar dados em planilhas antes de transformá-los e carregá-los em formatos de bancos de dados relacionais SQL.'
    ],
    relatedToolIds: ['contador-caracteres', 'formatador-json', 'minificador-css'],
    slug: 'removedor-de-espacos-duplicados'
  },
  {
    id: 'formatador-json',
    categoryId: 'utilitarios',
    title: 'Formatador e Identador JSON',
    shortDescription: 'Valide, idente e embeleze estruturas de dados JSON para facilitar a visualização por desenvolvedores.',
    longIntro: 'Encontre erros lógicos de chaves perdidas, aspas incorretas, vírgulas residuais e converta strings e payloads em estruturas tabuladas perfeitamente alinhadas.',
    howItWorks: 'Cole a massa colapsada para colher a resposta formatada com recuo indentado colorível selecionável com validadores de erros estruturais embutidos.',
    faqs: [
      {
        question: 'Por que dados JSON costumam vir sem identação?',
        answer: 'Sistemas transferem APIs de forma condensada (minificada) para desonerar bytes redundantes do tráfego de redes e acelerar a velocidade de requisições de servidores.'
      }
    ],
    tips: [
      'Gaste menos tempo debruçado descifrando bugs de chamadas internas de sistemas formatando os payloads.'
    ],
    relatedToolIds: ['beautify-json', 'removedor-espacos', 'minificador-js'],
    slug: 'formatador-json'
  },
  {
    id: 'minificador-css',
    categoryId: 'utilitarios',
    title: 'Minificador de Código CSS',
    shortDescription: 'Reduza o tamanho físico dos arquivos de folhas de estilo integradas das suas páginas Web.',
    longIntro: 'Ajude suas páginas a carregarem de forma consideravelmente mais veloz no PageSpeed diminuindo o peso do código CSS estático consolidado do seu portal.',
    howItWorks: 'Apaga comentários do arquivo, remove quebras de linhas internas e aglutina os seletores de estilizações de classes equivalentes.',
    faqs: [
      {
        question: 'A minificação altera a renderização visual final da página?',
        answer: 'Não, o comportamento permanece intacto já que navegadores desconsideram quebras de linhas para interpretar seletores.'
      }
    ],
    tips: [
      'Mantenha sempre uma cópia original comentada legível do seu código CSS para manutenção posterior.'
    ],
    relatedToolIds: ['minificador-js', 'formatador-json', 'removedor-espacos'],
    slug: 'minificador-de-css'
  },
  {
    id: 'minificador-js',
    categoryId: 'utilitarios',
    title: 'Minificador de JavaScript',
    shortDescription: 'Otimize seus scripts reduzindo espaços em branco e unificando escopos básicos.',
    longIntro: 'Gire aplicações client-side hiper velozes no ar aplicando compressão estática limpa em códigos JS de forma instantânea e descomplicada para o usuário.',
    howItWorks: 'Compacta de modo limpo suas declarações e entrega blocos inline práticos de descarregar na mesma tela.',
    faqs: [
      {
        question: 'O que o termo ofuscação dita?',
        answer: 'Ofuscar vai além de comprimir. Ela altera nomes de variáveis internas para nomes curtos incompreensíveis, dificultando a engenharia reversa do software comercial de front-end.'
      }
    ],
    tips: [
      'Utilize minificadores automatizados nas suas pipelinesCI/CD de deploy para garantir ganho de desempenho contínuo automaticamente.'
    ],
    relatedToolIds: ['minificador-css', 'formatador-json', 'removedor-espacos'],
    slug: 'minificador-de-js'
  },
  {
    id: 'beautify-json',
    categoryId: 'utilitarios',
    title: 'Beautify JSON Beautifier',
    shortDescription: 'Deixe seus arquivos JSON perfeitamente organizados estruturados e fáceis de ler.',
    longIntro: 'O embelezador ideal para payloads de APIs. Um atalho rápido para analistas de dados inspecionarem o conteúdo de respostas de servidores de bases de Big Query.',
    howItWorks: 'O interpretador ajusta os recuos tabulados adicionando cores vibrantes para identificar objetos chaves e listas lógicas.',
    faqs: [
      {
        question: 'O JSON aceita comentários internos?',
        answer: 'Não, a especificação oficial padrão não tolera comentários de desenvolvimento.'
      }
    ],
    tips: [
      'Gere esquemas e utilize esta visualização limpa nas documentações internas das APIs de sua empresa.'
    ],
    relatedToolIds: ['formatador-json', 'encode-url', 'decode-url'],
    slug: 'beautify-json'
  },
  {
    id: 'encode-url',
    categoryId: 'utilitarios',
    title: 'Encode URL - Codificação de URLs',
    shortDescription: 'Codifique trechos de textos de parâmetros query strings no formato padrão amigável para envio web centrado.',
    longIntro: 'Converta caracteres acentuados, cecilhas, símbolos ou espaços de URLs livres em sequências seguras em conformidade aos interpretadores de navegadores mundiais.',
    howItWorks: 'Transforma espaços em notações especiais (%20) correspondentes para permitir postagens e envios em tags estruturadas de links sem perdas.',
    faqs: [
      {
        question: 'Por que codificar URLs é obrigatório para APIs?',
        answer: 'Navegadores utilizam conjuntos de caracteres sob limites restritos. Enviar espaços em branco brutos no corpo quebra a integridade da requisição HTTP comercial.'
      }
    ],
    tips: [
      'Essencial ao montar manualmente campanhas de marketing estruturadoras de UTM para rastreabilidade de cliques de campanhas.'
    ],
    relatedToolIds: ['decode-url', 'qr-code', 'formatador-json'],
    slug: 'codificador-encode-url'
  },
  {
    id: 'decode-url',
    categoryId: 'utilitarios',
    title: 'Decode URL - Decodificação de URLs',
    shortDescription: 'Decodifique links e query strings e traduza-os em palavras de linguagem humana legíveis comuns.',
    longIntro: 'O reverso da conversão de URLs do portal Tool Brasil. Ele limpa caracteres especiais, pontuações, recuperando os termos originais de campanhas que foram empacotados anteriormente.',
    howItWorks: 'Vaze a string mascarada de entrada e a rotina resgata as palavras acentuadas e espaços em milissegundos.',
    faqs: [
      {
        question: 'O que o percentual (%) nas URLs traduz?',
        answer: 'Identifica uma codificação hexadecimal percent-encoding de um byte correspondente do mapeamento básico de caracteres.'
      }
    ],
    tips: [
      'Use para ler com clareza parâmetros compridos de cliques provenientes dos disparos de e-mails newsletters.'
    ],
    relatedToolIds: ['encode-url', 'qr-code', 'beautify-json'],
    slug: 'decodificador-decode-url'
  },

  // ===== NOVAS FERRAMENTAS DE ALTO VOLUME DE BUSCA =====

  // CALCULADORA DE APOSENTADORIA INSS
  {
    id: 'aposentadoria-inss',
    categoryId: 'calculadoras',
    title: 'Calculadora de Aposentadoria INSS',
    shortDescription: 'Simule sua aposentadoria pelo INSS: descubra o tempo restante, valor do benefício e regras de transição.',
    longIntro: 'Calcule quando você poderá se aposentar pelo INSS (RGPS). Considere as regras de transição da Reforma da Previdência: pedágio 50%, pedágio 100%, pontos, idade mínima progressiva e aposentadoria por idade. Descubra o valor estimado do seu benefício com base no histórico de contribuições.',
    howItWorks: 'Informe sua idade, tempo de contribuição, sexo, salário médio e regra de aposentadoria desejada. A calculadora exibe o tempo restante, idade mínima aplicável e o valor estimado do benefício pelo fator previdenciário.',
    faqs: [
      { question: 'Quem tem direito à aposentadoria por tempo de contribuição?', answer: 'Homens com 35 anos de contribuição e mulheres com 30 anos. Para quem começou a contribuir antes da Reforma (13/11/2019), existem regras de transição que podem reduzir o tempo ou exigir idade mínima.' },
      { question: 'O que é o fator previdenciário?', answer: 'O fator previdenciário é um índice que reduz ou aumenta o valor da aposentadoria por tempo de contribuição, calculado com base na idade, tempo de contribuição e expectativa de sobrevida.' }
    ],
    tips: ['Contribua sempre com o valor correto para não perder tempo de contribuição no CNIS.', 'Planeje-se: uma contribuição de 35 anos para homens e 30 para mulheres garante o direito à aposentadoria integral por pontos.'],
    relatedToolIds: ['inss', 'salario-liquido', 'decimo-terceiro'],
    slug: 'calculadora-de-aposentadoria-inss'
  },

  // CALCULADORA DE PIS/PASEP
  {
    id: 'pis-pasep',
    categoryId: 'calculadoras',
    title: 'Calculadora de PIS/PASEP - Abono Salarial',
    shortDescription: 'Calcule o valor do PIS/PASEP 2026 e descubra se você tem direito ao abono salarial.',
    longIntro: 'Simule o valor do PIS/PASEP (Programa de Integração Social) que você tem direito a receber. O abono salarial equivale a até 1 salário mínimo para trabalhadores que cumprem os requisitos legais de tempo de serviço e renda.',
    howItWorks: 'Informe os meses trabalhados no ano-base, seu salário médio mensal e o valor do salário mínimo vigente. A calculadora simula o valor do abono salarial a que você tem direito.',
    faqs: [
      { question: 'Quem tem direito ao PIS/PASEP?', answer: 'Trabalhadores cadastrados no PIS/PASEP há pelo menos 5 anos, que tenham trabalhado com carteira assinada por pelo menos 30 dias no ano-base e recebido até 2 salários mínimos de remuneração.' },
      { question: 'Qual o valor do PIS/PASEP 2026?', answer: 'O valor é proporcional aos meses trabalhados no ano-base, podendo chegar até R$ 1.518,00 (salário mínimo de 2025) ou o valor vigente no ano do pagamento.' }
    ],
    tips: ['Consulte o calendário de pagamentos do PIS/PASEP para saber quando sacar.', 'O abono salarial pode ser sacado na Caixa Econômica (PIS) ou no Banco do Brasil (PASEP).'],
    relatedToolIds: ['inss', 'salario-liquido', 'decimo-terceiro'],
    slug: 'calculadora-de-pis-pasep'
  },

  // CALCULADORA DE ICMS
  {
    id: 'icms',
    categoryId: 'calculadoras',
    title: 'Calculadora de ICMS',
    shortDescription: 'Calcule o ICMS incidente sobre produtos, mercadorias e serviços com alíquotas por estado.',
    longIntro: 'Calcule o valor do ICMS (Imposto sobre Circulação de Mercadorias e Serviços) para suas operações comerciais. Considere a alíquota interna do estado de destino, o ICMS interestadual e a diferença de alíquota (DIFAL).',
    howItWorks: 'Informe o valor da mercadoria, a alíquota do ICMS do seu estado e se a operação é interestadual. A calculadora exibe o valor do imposto, base de cálculo e valor líquido.',
    faqs: [
      { question: 'O que é ICMS?', answer: 'O ICMS é um imposto estadual que incide sobre circulação de mercadorias, serviços de transporte interestadual e intermunicipal, energia elétrica e telecomunicações.' },
      { question: 'Como funciona o DIFAL?', answer: 'O DIFAL (Diferença de Alíquota) é aplicado em operações interestaduais destinadas a consumidor final, onde o estado de destino recebe a diferença entre a alíquota interna e a interestadual.' }
    ],
    tips: ['Empresas do Simples Nacional têm tratamento diferenciado para o ICMS, com alíquotas reduzidas dependendo do anexo.', 'O ICMS é não-cumulativo: o imposto pago na entrada pode ser creditado na saída.'],
    relatedToolIds: ['porcentagem', 'margem-lucro', 'regra-de-tre'],
    slug: 'calculadora-de-icms'
  },

  // CALCULADORA DE ITBI
  {
    id: 'itbi',
    categoryId: 'calculadoras',
    title: 'Calculadora de ITBI - Imposto de Transmissão de Imóveis',
    shortDescription: 'Calcule o valor do ITBI para compra e venda de imóveis com alíquota do seu município.',
    longIntro: 'Calcule o valor do ITBI (Imposto sobre Transmissão de Bens Imóveis) devido na compra de um imóvel. O ITBI é um imposto municipal cobrado sobre o valor venal ou de transação do imóvel.',
    howItWorks: 'Informe o valor do imóvel (valor de transação ou avaliação municipal) e a alíquota praticada pela prefeitura do seu município (geralmente 2% a 4%).',
    faqs: [
      { question: 'Quem paga o ITBI?', answer: 'O comprador do imóvel é o responsável pelo pagamento do ITBI, que deve ser quitado antes do registro da escritura no Cartório de Registro de Imóveis.' },
      { question: 'Qual a alíquota do ITBI?', answer: 'A alíquota do ITBI varia de 2% a 4% do valor do imóvel, dependendo da legislação de cada município brasileiro.' }
    ],
    tips: ['O ITBI incide sobre o maior valor entre o valor de transação e o valor venal de referência da prefeitura.', 'Imóveis financiados pelo SFH podem ter redução na base de cálculo do ITBI em alguns municípios.'],
    relatedToolIds: ['financiamento', 'porcentagem', 'fgts'],
    slug: 'calculadora-de-itbi'
  },

  // CALCULADORA DE ITCMD
  {
    id: 'itcmd',
    categoryId: 'calculadoras',
    title: 'Calculadora de ITCMD - Imposto sobre Herança e Doação',
    shortDescription: 'Calcule o ITCMD, imposto estadual sobre heranças, inventários e doações no Brasil.',
    longIntro: 'Calcule o valor do ITCMD (Imposto sobre Transmissão Causa Mortis e Doação) devido em processos de inventário, herança ou doação de bens. As alíquotas variam por estado entre 2% e 8%.',
    howItWorks: 'Informe o valor total dos bens transmitidos (herança ou doação) e selecione o estado onde o processo ocorre. A calculadora aplica a alíquota estadual e exibe o imposto devido.',
    faqs: [
      { question: 'O que é ITCMD?', answer: 'ITCMD é o imposto estadual cobrado sobre a transmissão de bens e direitos por herança (causa mortis) ou por doação entre pessoas vivas.' },
      { question: 'Qual a alíquota do ITCMD em cada estado?', answer: 'As alíquotas variam de 2% a 8%: SP 4%, RJ 5%, MG 5%, PR 4%, RS 5%, BA 5%, DF 4%. Consulte a legislação do seu estado.' }
    ],
    tips: ['Planejamento sucessório com doação em vida pode reduzir custos com ITCMD e inventário.', 'Bens no exterior podem ter regras especiais de tributação pelo ITCMD.'],
    relatedToolIds: ['financiamento', 'porcentagem', 'ipva'],
    slug: 'calculadora-de-itcmd'
  },

  // VALIDADOR DE CARTÃO DE CRÉDITO
  {
    id: 'validador-cartao',
    categoryId: 'utilitarios',
    title: 'Validador de Cartão de Crédito (Algoritmo de Luhn)',
    shortDescription: 'Valide números de cartão de crédito e identifique a bandeira (Visa, Mastercard, Elo, Amex).',
    longIntro: 'Valide números de cartão de crédito usando o algoritmo de Luhn e identifique automaticamente a bandeira. Ideal para desenvolvedores testarem sistemas de pagamento e e-commerce.',
    howItWorks: 'Digite o número do cartão (apenas para testes). A ferramenta valida o dígito verificador pelo algoritmo de Luhn e identifica a bandeira pelos primeiros dígitos.',
    faqs: [
      { question: 'O que é o algoritmo de Luhn?', answer: 'O algoritmo de Luhn é um método de soma de verificação usado para validar números de cartão de crédito, IMEI e outros identificadores. Ele detecta erros comuns de digitação.' },
      { question: 'Quais bandeiras são identificadas?', answer: 'Visa (4), Mastercard (51-55), Elo (636368), American Express (34, 37), Discover (6011), Hipercard (6062), Diners (300-305).' }
    ],
    tips: ['Use apenas números de teste para validar sistemas - nunca utilize números reais sem autorização.', 'O algoritmo de Luhn detecta 100% dos erros de um dígito e 98% dos erros de transposição.'],
    relatedToolIds: ['cpf', 'cnpj', 'titulo-eleitor'],
    slug: 'validador-de-cartao-de-credito'
  },

  // CALCULADORA DE CALORIAS DIÁRIAS
  {
    id: 'calorias-diarias',
    categoryId: 'calculadoras',
    title: 'Calculadora de Calorias Diárias (TMB + Atividade)',
    shortDescription: 'Descubra quantas calorias você precisa por dia para manter, perder ou ganhar peso.',
    longIntro: 'Calcule suas necessidades calóricas diárias com base na Taxa Metabólica Basal (TMB) e seu nível de atividade física. Ideal para quem quer emagrecer, ganhar massa muscular ou manter o peso.',
    howItWorks: 'Informe peso, altura, idade, sexo e nível de atividade física. A calculadora usa as fórmulas de Mifflin-St Jeor para estimar calorias de manutenção, perda e ganho.',
    faqs: [
      { question: 'Quantas calorias devo consumir para emagrecer?', answer: 'Para emagrecer de forma saudável, consuma 300 a 500 calorias a menos que seu gasto energético total (GET). Isso resulta em perda de 0,3 a 0,5 kg por semana.' },
      { question: 'O que é déficit calórico?', answer: 'Déficit calórico é quando você consome menos calorias do que seu corpo gasta. Cada 7.700 calorias de déficit resultam em aproximadamente 1 kg de perda de gordura.' }
    ],
    tips: ['Não consuma menos de 1.200 calorias por dia (mulheres) ou 1.500 (homens) sem acompanhamento médico.', 'Distribua as calorias em 5-6 refeições ao dia para manter o metabolismo ativo.'],
    relatedToolIds: ['tmb', 'imc', 'idade'],
    slug: 'calculadora-de-calorias-diarias'
  },

  // CONVERSOR DE LIBRA PARA REAL
  {
    id: 'libra-para-real',
    categoryId: 'conversores',
    title: 'Conversor de Libra Esterlina para Real',
    shortDescription: 'Converta valores entre Libra Esterlina (GBP) e Real Brasileiro (BRL).',
    longIntro: 'Converta valores entre Libra Esterlina (GBP) e Real Brasileiro com cotação personalizável. Ideal para viagens ao Reino Unido, compras internacionais e remessas.',
    howItWorks: 'Informe o valor em Libras ou Reais e ajuste a cotação do câmbio conforme a taxa do dia.',
    faqs: [
      { question: 'Qual a cotação da Libra hoje?', answer: 'A cotação varia diariamente. Consulte seu banco para a taxa comercial atualizada antes de fazer câmbio.' },
      { question: 'Onde trocar Libras no Brasil?', answer: 'Casas de câmbio autorizadas, bancos e corretoras de valores oferecem compra e venda de libras. Compare as taxas antes de comprar.' }
    ],
    tips: ['Leve libras em espécie ou cartão internacional pré-pago para viagens ao Reino Unido.', 'O IOF sobre compra de moeda estrangeira é de 1,1% (espécie) e 4,38% (cartão).'],
    relatedToolIds: ['real-para-dolar', 'euro-para-real', 'porcentagem'],
    slug: 'converter-libra-para-real'
  },

  // CALCULADORA DE NOTA DO ENEM
  {
    id: 'nota-enem',
    categoryId: 'calculadoras',
    title: 'Calculadora de Nota do ENEM - Média Simples e Ponderada',
    shortDescription: 'Calcule sua média do ENEM com pesos por universidade e descubra suas chances no SISU.',
    longIntro: 'Calcule sua média do ENEM considerando diferentes pesos para cada área do conhecimento. Simule suas chances de aprovação no SISU, PROUNI e FIES com base nas notas de corte das universidades.',
    howItWorks: 'Informe suas notas nas 5 áreas do ENEM (Redação, Linguagens, Matemática, Natureza, Humanas) e os pesos definidos pelo curso desejado. A calculadora retorna a média simples e ponderada.',
    faqs: [
      { question: 'Como é calculada a média do ENEM?', answer: 'A média simples é a soma das 5 notas dividida por 5. A média ponderada multiplica cada nota pelo peso do respectivo área definido pela universidade.' },
      { question: 'O que são as notas de corte do SISU?', answer: 'Nota de corte é a menor pontuação necessária para ficar entre os classificados em um curso. Varia a cada edição conforme a concorrência.' }
    ],
    tips: ['Pesquise as notas de corte das edições anteriores do SISU para ter uma base de comparação.', 'Foque na redação: nota 1000 pode aumentar significativamente sua média final.'],
    relatedToolIds: ['porcentagem', 'idade', 'imc'],
    slug: 'calculadora-de-nota-do-enem'
  },

  // GERADOR DE RG
  {
    id: 'gerador-rg',
    categoryId: 'geradores',
    title: 'Gerador de RG (Registro Geral)',
    shortDescription: 'Gere números de RG válidos para testes de sistemas e cadastros.',
    longIntro: 'Gere números de RG (Registro Geral) para desenvolvimento de sistemas, testes de formulários de cadastro e simulações. Os números seguem padrões estaduais de formatação.',
    howItWorks: 'Selecione o estado desejado e a quantidade. A ferramenta gera números de RG com formatação específica de cada estado brasileiro.',
    faqs: [
      { question: 'Os RG gerados são de pessoas reais?', answer: 'Não. Os números são gerados sinteticamente para fins de teste e desenvolvimento, sem qualquer relação com documentos reais.' },
      { question: 'Qual o formato do RG em cada estado?', answer: 'O formato varia por estado: SP usa XX.XXX.XXX-X, RJ usa XX.XXX.XXX-X, MG usa XXX.XXX.XXX. Outros estados têm padrões próprios.' }
    ],
    tips: ['Use RGs gerados apenas em ambientes de teste e desenvolvimento.', 'Combine com gerador de CPF e nome para criar conjuntos completos de dados de teste.'],
    relatedToolIds: ['cpf', 'cnpj', 'nome-aleatorio'],
    slug: 'gerador-de-rg'
  },

  // CONVERSOR DE NÚMEROS ROMANOS
  {
    id: 'numeros-romanos',
    categoryId: 'conversores',
    title: 'Conversor de Números Romanos',
    shortDescription: 'Converta números arábicos para romanos e vice-versa facilmente.',
    longIntro: 'Converta números entre o sistema arábico (decimal) e o sistema romano. Ideal para estudantes, historiadores e profissionais que trabalham com datas, capítulos, reis e papas.',
    howItWorks: 'Digite um número arábico (ex: 2026) ou romano (ex: MMXXVI) e veja a conversão instantânea nos dois formatos.',
    faqs: [
      { question: 'Quais as regras dos números romanos?', answer: 'I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Quando uma letra menor vem antes de uma maior, subtrai-se: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.' },
      { question: 'Como escrever 2026 em romanos?', answer: '2026 em números romanos é MMXXVI: M(1000)+M(1000)+X(10)+X(10)+V(5)+I(1) = 2026.' }
    ],
    tips: ['Números romanos são usados em capítulos de livros, nomes de reis, relógios e datas em monumentos.', 'O maior número que pode ser escrito com as letras tradicionais é 3.999 (MMMCMXCIX).'],
    relatedToolIds: ['idade', 'dias-entre-datas', 'regra-de-tre'],
    slug: 'conversor-de-numeros-romanos'
  },

  // ADICIONAL DE PERICULOSIDADE
  {
    id: 'periculosidade',
    categoryId: 'calculadoras',
    title: 'Calculadora de Adicional de Periculosidade',
    shortDescription: 'Calcule o adicional de periculosidade de 30% sobre o salário para trabalhadores CLT.',
    longIntro: 'Calcule o valor do adicional de periculosidade devido a trabalhadores que exercem atividades perigosas (inflamáveis, explosivos, energia elétrica, segurança). O adicional é de 30% sobre o salário base, sem acréscimo de reflexos.',
    howItWorks: 'Informe seu salário base e o percentual de periculosidade (padrão 30%). A calculadora exibe o valor do adicional e o salário total com periculosidade.',
    faqs: [
      { question: 'Qual a diferença entre periculosidade e insalubridade?', answer: 'Periculosidade (30% sobre o salário base) é para atividades perigosas que oferecem risco iminente. Insalubridade (10%, 20% ou 40% sobre o salário mínimo) é para atividades insalubres à saúde.' },
      { question: 'Quem tem direito ao adicional de periculosidade?', answer: 'Trabalhadores que operam com inflamáveis, explosivos, energia elétrica, radiação, segurança patrimonial pessoal ou armas, conforme NR-16 do Ministério do Trabalho.' }
    ],
    tips: ['O adicional de periculosidade incide sobre o salário base, sem incluir horas extras ou outros adicionais.', 'Trabalhador que recebe periculosidade não pode acumular com insalubridade, salvo exceções.'],
    relatedToolIds: ['hora-extra', 'inss', 'salario-liquido'],
    slug: 'calculadora-de-adicional-de-periculosidade'
  },

  // ADICIONAL DE INSALUBRIDADE
  {
    id: 'insalubridade',
    categoryId: 'calculadoras',
    title: 'Calculadora de Adicional de Insalubridade',
    shortDescription: 'Calcule o adicional de insalubridade de 10%, 20% ou 40% sobre o salário mínimo.',
    longIntro: 'Calcule o valor do adicional de insalubridade para trabalhadores expostos a agentes nocivos à saúde. Os graus mínimo (10%), médio (20%) e máximo (40%) incidem sobre o salário mínimo vigente.',
    howItWorks: 'Selecione o grau de insalubridade (mínimo, médio ou máximo) e informe o valor do salário mínimo. A calculadora exibe o valor do adicional e o total a receber.',
    faqs: [
      { question: 'Quais atividades dão direito ao adicional de insalubridade?', answer: 'Atividades com ruído excessivo, calor intenso, agentes químicos, biológicos, poeiras minerais, frio, umidade, radiação e vibração, conforme NR-15.' },
      { question: 'A base de cálculo é o salário mínimo ou o salário base?', answer: 'Para a maioria das categorias, a base é o salário mínimo. Porém, convenções coletivas podem estabelecer base mais vantajosa, como o salário base da categoria.' }
    ],
    tips: ['A insalubridade de grau máximo (40%) exige perícia técnica de engenheiro ou médico do trabalho.', 'Equipamentos de proteção individual (EPIs) podem neutralizar ou reduzir o adicional de insalubridade.'],
    relatedToolIds: ['hora-extra', 'periculosidade', 'salario-liquido'],
    slug: 'calculadora-de-adicional-de-insalubridade'
  },

  // CALCULADORA DE PREÇO DE VENDA
  {
    id: 'preco-venda',
    categoryId: 'calculadoras',
    title: 'Calculadora de Preço de Venda (Markup + Margem)',
    shortDescription: 'Calcule o preço de venda ideal dos seus produtos com markup e margem de contribuição.',
    longIntro: 'Ferramenta completa para empreendedores definirem o preço de venda de produtos. Considere custos fixos, variáveis, impostos e margem de lucro desejada para calcular o preço final.',
    howItWorks: 'Informe o custo unitário, despesas fixas e variáveis (percentual), impostos sobre vendas, e a margem de lucro desejada. A calculadora retorna o preço de venda sugerido.',
    faqs: [
      { question: 'Qual a diferença entre markup e margem?', answer: 'Markup é o índice multiplicador sobre o custo para chegar ao preço de venda. Margem é o percentual de lucro sobre o preço de venda. Markup de 1,5 = margem de 33,3%.' },
      { question: 'Como calcular o preço de venda no Simples Nacional?', answer: 'No Simples Nacional, inclua o percentual do anexo (I a V) no cálculo dos impostos sobre vendas. O anexo III (serviços) tem alíquotas de 6% a 33% sobre o faturamento.' }
    ],
    tips: ['Pesquise os preços da concorrência para posicionar seu produto de forma competitiva.', 'Revise seus preços periodicamente para acompanhar inflação e aumento de custos.'],
    relatedToolIds: ['margem-lucro', 'porcentagem', 'regra-de-tre'],
    slug: 'calculadora-de-preco-de-venda'
  },

  // CALCULADORA DE IDADE CANINA
  {
    id: 'idade-canina',
    categoryId: 'calculadoras',
    title: 'Calculadora de Idade Canina (Humana)',
    shortDescription: 'Descubra a idade do seu cachorro em anos humanos com base no porte e raça.',
    longIntro: 'Calcule a idade do seu cão em anos humanos considerando o porte (pequeno, médio, grande) e o peso. A equivalência aproximada é 1 ano canino = 7 anos humanos, mas cães de portes diferentes envelhecem em ritmos distintos.',
    howItWorks: 'Informe a idade real do seu cão em anos e selecione o porte (pequeno, médio, grande). A calculadora exibe a idade equivalente em anos humanos e a fase de vida do animal.',
    faqs: [
      { question: '1 ano canino equivale a 7 anos humanos?', answer: 'Essa regra é uma simplificação. Na verdade, o primeiro ano de vida de um cão equivale a cerca de 15 anos humanos, e o segundo ano a aproximadamente 9 anos. Após os 2 anos, cada ano canino equivale a 4-5 anos humanos.' },
      { question: 'Cães pequenos vivem mais que cães grandes?', answer: 'Sim, cães de pequeno porte (até 10 kg) vivem em média 12-16 anos, enquanto cães de grande porte (acima de 25 kg) vivem 8-12 anos.' }
    ],
    tips: ['Cães de pequeno porte envelhecem mais lentamente - celebre cada ano!', 'Consulte o veterinário regularmente: a partir dos 7 anos (caninos), seu cão é considerado idoso.'],
    relatedToolIds: ['imc', 'idade', 'tmb'],
    slug: 'calculadora-de-idade-canina'
  },

  // CONVERSOR DE PESO ARGENTINO PARA REAL
  {
    id: 'peso-argentino-para-real',
    categoryId: 'conversores',
    title: 'Conversor de Peso Argentino para Real',
    shortDescription: 'Converta valores entre Peso Argentino (ARS) e Real Brasileiro (BRL) com cotação personalizável.',
    longIntro: 'Converta valores entre Peso Argentino e Real Brasileiro. Ferramenta essencial para quem viaja para Argentina, faz compras em Buenos Aires ou recebe remessas de lá.',
    howItWorks: 'Informe o valor em Pesos Argentinos ou Reais e ajuste a cotação do câmbio conforme a taxa comercial ou blue (paralelo).',
    faqs: [
      { question: 'Existe diferença entre câmbio oficial e blue?', answer: 'Sim, a Argentina tem câmbio oficial (menor) e câmbio blue/paralelo (maior). A diferença pode ultrapassar 100%. O câmbio blue é mais próximo da taxa real de mercado.' },
      { question: 'Levo Reais ou Pesos para Argentina?', answer: 'Leve dólares em espécie para trocar por pesos ao câmbio blue no mercado informal argentino. Evite usar cartão internacional pelo câmbio oficial desfavorável.' }
    ],
    tips: ['Leve dólares para Argentina, não reais. O dólar americano tem melhor aceitação no câmbio blue.', 'Use Western Union para receber em pesos ao câmbio blue - é um dos métodos mais vantajosos.'],
    relatedToolIds: ['real-para-dolar', 'euro-para-real', 'libra-para-real'],
    slug: 'converter-peso-argentino-para-real'
  },
];

export const PROGRAMMATIC_PAGES: { [key: string]: { title: string; description: string; content?: any } } = {
  // COUNTDOWNS
  'quantos-dias-faltam-para-o-natal': {
    title: 'Quantos Dias Faltam para o Natal?',
    description: 'Acompanhe a contagem regressiva exata de dias, horas e minutos para a chegada do Natal em 25 de Dezembro.',
  },
  'quantos-dias-faltam-para-2027': {
    title: 'Quantos Dias Faltam para 2027?',
    description: 'Contagem regressiva em tempo real até o dia 1º de Janeiro de 2027 para você planejar metas do ano novo brasileira.',
  },
  'quantos-dias-faltam-para-o-carnaval': {
    title: 'Quantos Dias Faltam para o Carnaval?',
    description: 'Veja quanto tempo falta para o melhor feriado nacional brasileiro de festas, folias e desfiles.',
  },

  // CODES AND DATA
  'ddd-brasil': {
    title: 'Códigos DDD do Brasil - Lista Completa Interativa',
    description: 'Encontre todos os códigos DDD telefônicos do Brasil, descubra as cidades e os estados de cada DDD e evite golpes.',
  },
  'bancos-brasil': {
    title: 'Códigos de Bancos Comerciais e ISPB do Brasil',
    description: 'Pesquise a lista atualizada de códigos de compensação de bancos nacionais, bandeiras Pix e números ISPB de fintechs.',
  },
  'cep-brasil': {
    title: 'Consulta Integrada de CEP e Localidades Online',
    description: 'Consulte CEPs de todas as ruas, bairros e cidades do Brasil de forma rápida com conexão à API ViaCEP integrada em tempo real.',
  },
  'cnae-consulta': {
    title: 'Consulta de CNAE - Classificação de Atividades Econômicas',
    description: 'Pesquise códigos de subclassificação CNAE para abertura de empresas brasileiras, notas fiscais (NF-e) e enquadramentos de impostos.',
  },
  'cbo-consulta': {
    title: 'Consulta de CBO - Classificação Brasileira de Ocupações',
    description: 'Busque a listagem oficial de códigos CBO do Ministério do Trabalho brasileiro de profissões para assinaturas de carteiras CLT.',
  },

  // NOVAS PÁGINAS PROGRAMÁTICAS SEO
  'salario-minimo-historico': {
    title: 'Salário Mínimo Histórico - Tabela Completa desde 1994',
    description: 'Consulte a tabela completa do salário mínimo brasileiro desde 1994 até hoje, com valores nominais e corrigidos pela inflação. Descubra a evolução do poder de compra do trabalhador brasileiro ao longo dos anos.',
  },
  'feriados-nacionais': {
    title: 'Feriados Nacionais 2026 - Calendário Completo do Brasil',
    description: 'Calendário completo de feriados nacionais de 2026 no Brasil. Dias comemorativos, pontos facultativos, datas religiosas e civis. Planeje suas viagens e folgas com antecedência.',
  },
  'selic-historica': {
    title: 'Taxa SELIC Histórica - Tabela Completa desde 1996',
    description: 'Histórico completo da taxa SELIC desde sua criação em 1996. Consulte a taxa básica de juros da economia brasileira mês a mês, com valores anuais acumulados para referência em investimentos.',
  },
  'calendario-inss': {
    title: 'Calendário de Pagamentos INSS 2026 - Datas de Benefícios',
    description: 'Calendário completo de pagamentos do INSS em 2026. Consulte as datas de depósito de aposentadorias, pensões e benefícios assistenciais (BPC/LOAS) de acordo com o número do benefício e valor do salário mínimo.',
  },
  'codigos-ncm': {
    title: 'Códigos NCM - Classificação Fiscal de Mercadorias',
    description: 'Consulte a Nomenclatura Comum do Mercosul (NCM) para classificação fiscal de produtos. Códigos completos para importação, exportação, notas fiscais e enquadramento tributário.',
  },
  'codigos-ibge': {
    title: 'Códigos IBGE de Municípios - Lista Completa',
    description: 'Consulte todos os códigos IBGE de municípios brasileiros por estado. Encontre o código de 7 dígitos para pesquisas, sistemas e documentos oficiais.',
  }
};
