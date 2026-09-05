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
  // CALCULADORAS NOVAS
  {
    id: 'churrasco',
    categoryId: 'calculadoras',
    title: 'Calculadora de Churrasco',
    shortDescription: 'Calcule a quantidade exata de carne, bebidas e acompanhamentos para o seu churrasco perfeito.',
    longIntro: 'Organizar um churrasco perfeito exige um bom planejamento para evitar o desperdício ou a falta de comida e bebida. A Calculadora de Churrasco automatiza esse processo estimando a quantidade ideal de carnes (bovina, suína, frango, linguiça), bebidas (cerveja, refrigerante, água) e acompanhamentos (pão de alho, farofa, carvão) com base no número de convidados. Basta informar a quantidade de homens, mulheres e crianças que o algoritmo fará a distribuição inteligente considerando o consumo médio de cada perfil. Chega de sobrar carne ou faltar gelo no meio da festa!',
    howItWorks: 'Informe a quantidade de homens, mulheres e crianças que participarão do evento. Em seguida, selecione os itens que você deseja servir (tipos de carne, bebidas com ou sem álcool). A calculadora utilizará parâmetros gastronômicos padrão para definir o peso exato de proteína e a litragem de bebidas que você precisará comprar.',
    faqs: [
      {
        question: 'Qual é a quantidade de carne por pessoa em um churrasco?',
        answer: 'Em média, calcula-se 500g a 600g de carne sem osso para homens adultos, 400g para mulheres e cerca de 250g para crianças.'
      },
      {
        question: 'Como calcular a quantidade de cerveja?',
        answer: 'Para eventos com duração de cerca de 4 a 5 horas, a média é de 4 a 5 latas (ou 1,5 a 2 litros) de cerveja por adulto que consome álcool.'
      },
      {
        question: 'E quanto ao carvão e gelo?',
        answer: 'Para o carvão, a regra básica é 1kg de carvão para cada 1kg de carne. Para o gelo, considere 1 saco de gelo (5kg) para cada 2 caixas de cerveja, além do gelo para as carnes se não houver refrigeração adequada.'
      }
    ],
    tips: [
      'Sempre arredonde os cálculos para cima quando o evento durar mais de 5 horas.',
      'Varie as carnes: linguiças e frangos costumam ser assados primeiro e abrem o apetite para as carnes principais.',
      'Não se esqueça do pão de alho e da farofa: eles ajudam a equilibrar o consumo de proteínas.'
    ],
    relatedToolIds: ['imc', 'calorias-diarias'],
    slug: 'calculadora-de-churrasco'
  },
  {
    id: 'gerador-whatsapp',
    categoryId: 'geradores',
    title: 'Gerador de Link de WhatsApp',
    shortDescription: 'Crie links curtos (wa.me) personalizados para o seu WhatsApp com uma mensagem inicial pré-definida.',
    longIntro: 'O Gerador de Link para WhatsApp é uma ferramenta fundamental para empreendedores, afiliados e profissionais autônomos que desejam facilitar o contato de seus clientes. Em vez de forçar o cliente a adicionar seu número na agenda para só então mandar uma mensagem, o link permite iniciar uma conversa imediatamente com um clique. Além disso, você pode pré-configurar uma mensagem padrão (como "Olá, gostaria de um orçamento") para saber exatamente de onde aquele contato veio e acelerar o atendimento.',
    howItWorks: 'Basta digitar o seu número de telefone com DDD (e o código do país, no caso do Brasil +55) e escrever a mensagem que o cliente enviará ao clicar. A ferramenta formatará a URL oficial da API do WhatsApp (wa.me) e fornecerá um link pronto para ser copiado e compartilhado no Instagram, Facebook ou no seu site.',
    faqs: [
      {
        question: 'O link de WhatsApp funciona no Instagram?',
        answer: 'Sim! Você pode colocar o link gerado diretamente na biografia do seu Instagram (no campo "Site") para que seus seguidores entrem em contato com apenas um clique.'
      },
      {
        question: 'A criação do link tem algum custo?',
        answer: 'Não, gerar o link através da API oficial do WhatsApp é totalmente gratuito e ilimitado.'
      },
      {
        question: 'A mensagem pré-definida pode ser alterada pelo cliente?',
        answer: 'Sim, a mensagem pré-definida apenas preenche a caixa de texto do cliente. Ele pode editá-la antes de apertar o botão de enviar.'
      }
    ],
    tips: [
      'Use encurtadores (como o Bit.ly) se quiser monitorar a quantidade de cliques que o seu link do WhatsApp recebe.',
      'Crie mensagens personalizadas para cada rede social (ex: "Vim pelo Instagram") para medir de onde vêm mais clientes.',
      'Coloque sempre o DDD para evitar que o link seja inválido.'
    ],
    relatedToolIds: ['gerador-qrcode'],
    slug: 'gerador-link-whatsapp'
  },
  {
    id: 'custo-energia',
    categoryId: 'calculadoras',
    title: 'Calculadora de Custo de Energia Elétrica',
    shortDescription: 'Descubra quanto um eletrodoméstico gasta de energia (KWh) e qual o impacto dele na sua conta de luz.',
    longIntro: 'Saber exatamente quanto cada aparelho consome de energia é o primeiro passo para reduzir a conta de luz. A Calculadora de Custo de Energia Elétrica ajuda a estimar o consumo em KWh (Quilowatt-hora) de ar-condicionado, chuveiro elétrico, geladeira, computador ou qualquer outro equipamento. Transforme a potência declarada pelo fabricante no custo real em Reais (R$) no final do mês, baseando-se no tempo de uso diário e na tarifa de energia cobrada pela sua concessionária local.',
    howItWorks: 'Preencha a potência do aparelho (geralmente medida em Watts, descrita na etiqueta do produto), a quantidade de horas que ele fica ligado por dia, e quantos dias por mês ele é utilizado. Por fim, informe o valor da tarifa de energia (R$/kWh) cobrada na sua região (você encontra este valor na sua conta de luz).',
    faqs: [
      {
        question: 'Onde encontro a potência do meu aparelho?',
        answer: 'A potência, medida em Watts (W), geralmente está indicada em uma etiqueta colada na parte traseira do aparelho, no manual de instruções ou na caixa original.'
      },
      {
        question: 'O que é kWh (Quilowatt-hora)?',
        answer: 'O Quilowatt-hora é a unidade de medida padrão das concessionárias de energia. Ele representa a quantidade de energia (1.000 Watts) consumida durante o período de 1 hora.'
      },
      {
        question: 'Como descubro o valor da tarifa na minha cidade?',
        answer: 'Pegue sua última conta de luz e divida o valor total a pagar (sem multas) pelo total de kWh consumidos no mês. O resultado será o preço médio do kWh já com os impostos inclusos.'
      }
    ],
    tips: [
      'Chuveiros elétricos e aparelhos de ar-condicionado costumam ser os grandes vilões da conta de luz.',
      'Para calcular o consumo de uma geladeira, lembre-se que, apesar de ficar ligada 24h na tomada, o motor não trabalha o tempo todo. O manual costuma informar o consumo mensal médio.',
      'Aparelhos em Standby (aquela luzinha vermelha) também consomem energia ao longo do mês.'
    ],
    relatedToolIds: ['regra-de-tres', 'porcentagem'],
    slug: 'calculadora-de-custo-energia-eletrica'
  },
  {
    id: 'sorteador',
    categoryId: 'utilitarios',
    title: 'Sorteador Online (Números e Nomes)',
    shortDescription: 'Sorteie números aleatórios ou nomes de uma lista de forma justa e instantânea.',
    longIntro: 'Realizar um sorteio imparcial e transparente nunca foi tão simples. O Sorteador Online é uma ferramenta multifuncional desenhada para promotores de eventos, criadores de conteúdo, professores ou qualquer pessoa que precise de resultados aleatórios. Você pode sortear números dentro de um intervalo específico (perfeito para rifas e bingos) ou colar uma lista de nomes, e-mails ou participantes para escolher os vencedores de uma promoção de Instagram ou brinde corporativo, tudo com algoritmos matemáticos que garantem 100% de aleatoriedade.',
    howItWorks: 'Escolha entre as abas de "Números" ou "Nomes". Para números, defina o intervalo (ex: sortear entre 1 e 100) e quantos números devem ser sorteados. Para nomes, cole a sua lista (um nome por linha) e clique em sortear. O sistema escolherá aleatoriamente o ganhador.',
    faqs: [
      {
        question: 'O sorteador é realmente aleatório?',
        answer: 'Sim, nosso sistema utiliza funções criptográficas e de geração de números pseudo-aleatórios do próprio navegador, garantindo que não haja qualquer padrão previsível ou vício nos sorteios.'
      },
      {
        question: 'Posso sortear nomes repetidos?',
        answer: 'Na aba de nomes, cada linha é tratada como um participante único. Se você colar o mesmo nome duas vezes, ele terá o dobro de chances de ser sorteado.'
      },
      {
        question: 'Existe um limite para a lista de nomes?',
        answer: 'Para garantir um bom desempenho no seu navegador, recomendamos listas com até 10.000 nomes por sorteio.'
      }
    ],
    tips: [
      'Para sorteios de rifas, certifique-se de preencher exatamente o intervalo de cotas vendidas (ex: de 1 a 500).',
      'Use o sorteador para dinâmicas de grupo no trabalho, como escolher quem fará a próxima apresentação ou qual time começará a gincana.',
      'Na lista de nomes, evite linhas em branco, pois o sistema pode sortear o "vazio".'
    ],
    relatedToolIds: ['gerador-nome-aleatorio', 'gerador-senha'],
    slug: 'sorteador-online-numeros-e-nomes'
  },
  {
    id: 'horas-trabalhadas',
    categoryId: 'calculadoras',
    title: 'Calculadora de Horas Trabalhadas',
    shortDescription: 'Some as suas horas no ponto e calcule o total de horas diárias trabalhadas e intervalos.',
    longIntro: 'Controlar exatamente a sua jornada de trabalho diária é um direito trabalhista e a chave para não sair no prejuízo com horas extras. A Calculadora de Horas Trabalhadas foi desenvolvida para ajudar funcionários CLT, freelancers, estagiários e profissionais liberais a contabilizarem o tempo exato de serviço. Esqueça os cálculos mentais confusos de conversão de minutos em decimais: basta preencher o seu horário de entrada, saída para o almoço, retorno e fim de expediente.',
    howItWorks: 'Preencha o relógio no formato HH:MM (horas e minutos). O sistema calculará a diferença entre a Entrada e a Saída 1 (primeiro turno), e a diferença entre a Entrada 2 e Saída 2 (segundo turno). Em seguida, ele subtrairá o tempo de almoço/descanso e mostrará o total exato de horas e minutos de trabalho líquido naquele dia.',
    faqs: [
      {
        question: 'Como funciona o cálculo de minutos para horas decimais?',
        answer: 'Enquanto o relógio marca 60 minutos, as folhas de pagamento usam sistema decimal (100). Por exemplo, 30 minutos equivale a 0,5 horas trabalhadas. Nossa ferramenta já faz a conta correta.'
      },
      {
        question: 'O horário de almoço conta como hora trabalhada?',
        answer: 'Não, pela legislação CLT padrão, os intervalos intrajornada (almoço/descanso) não são computados como tempo de serviço efetivo, a menos que haja acordo prévio.'
      },
      {
        question: 'E se eu tiver feito hora extra?',
        answer: 'A calculadora informará o seu tempo total líquido. Se a sua jornada padrão é de 8h e o resultado foi 9h30, você acumulou 1h30 de horas extras naquele dia.'
      }
    ],
    tips: [
      'Use esta ferramenta para criar um banco de horas pessoal e confrontar com o espelho de ponto fornecido pelo RH no fim do mês.',
      'Profissionais autônomos ou freelancers podem usar o cálculo para gerar o valor da fatura a ser cobrada do cliente com base na hora técnica (timesheet).',
      'Lembre-se da tolerância de atraso/adiantamento CLT, que geralmente é de 5 a 10 minutos por dia.'
    ],
    relatedToolIds: ['hora-extra', 'salario-liquido', 'ferias-clt', 'rescisao'],
    slug: 'calculadora-de-horas-trabalhadas'
  },
  // CALCULADORAS
  {
    id: 'juros-compostos',
    categoryId: 'calculadoras',
    title: 'Calculadora de Juros Compostos',
    shortDescription: 'Calcule o crescimento de investimentos ao longo do tempo com aportes mensais e juros acumulados.',
    longIntro: 'Esta ferramenta permite calcular detalhadamente a evolução do seu capital exposto a taxas de juros compostos, também conhecidos como juros sobre juros. Diferente dos juros simples, onde o rendimento incide apenas sobre o capital inicial, nos juros compostos os rendimentos acumulam sobre rendimentos anteriores, gerando um crescimento exponencial ao longo do tempo. Ideal para simular o acúmulo de riqueza para planos de aposentadoria, investimentos em renda fixa (CDB, LCI, LCA, Tesouro Direto), fundos de investimento, previdência privada ou poupança.',
    howItWorks: 'Informe o capital inicial que você pretende investir, a taxa de juros (mensal ou anual), o tempo total de investimento em meses e o valor do aporte mensal opcional que deseja acrescentar. A ferramenta projeta a evolução ano a ano com tabelas detalhadas de rendimentos, mostrando período a período o saldo acumulado, os juros recebidos no período, e o total investido até o momento, permitindo visualizar claramente o efeito exponencial dos juros compostos ao longo do tempo.',
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
      'Aportar valores constantes, por menores que pareçam, faz uma diferença colossal após 10 ou 15 anos.',
      'O fator mais importante nos juros compostos é o TEMPO: quanto mais cedo você começar a investir, maior será o resultado final.'
    ],
    relatedToolIds: ['juros-simples', 'financiamento', 'porcentagem', 'fgts'],
    slug: 'calculadora-de-juros-compostos'
  },
  {
    id: 'juros-simples',
    categoryId: 'calculadoras',
    title: 'Calculadora de Juros Simples',
    shortDescription: 'Cálculo fácil de juros lineares sobre capitais tomados ou investidos de forma direta.',
    longIntro: 'Os juros simples são um regime de capitalização linear onde a taxa de juros incide apenas sobre o capital inicial, sem acumular sobre os juros de períodos anteriores. Diferente dos juros compostos (exponenciais), os juros simples crescem de forma linear e previsível, sendo amplamente utilizados em transações de curto prazo, descontos de títulos, compras parceladas sem juros embutidos e contratos civis entre pessoas físicas. A fórmula básica é J = C × i × t, onde J são os juros, C é o capital, i é a taxa e t é o tempo. É fundamental para entender conceitos financeiros básicos e serve como base para cálculos mais complexos no mercado financeiro.',
    howItWorks: 'Insira o capital inicial, a taxa cobrada e o período. A ferramenta determina o valor dos juros acumulados e o montante final obtido.',
    faqs: [
      {
        question: 'Quando os Juros Simples são usados no mercado?',
        answer: 'São comumente aplicados em compras parceladas sem juros embutidos complexos, descontos de duplicatas, títulos de curto prazo (como CDBs com vencimento em 30 dias), contratos civis e empréstimos informais entre pessoas físicas.'
      },
      {
        question: 'Qual a diferença prática entre juros simples e compostos?',
        answer: 'Nos juros simples, o rendimento é constante a cada período (cresce em linha reta). Nos compostos, os rendimentos se acumulam e crescem exponencialmente. Em prazos curtos (até 1 mês), a diferença é pequena. Em prazos longos (acima de 1 ano), a diferença se torna gigantesca.'
      },
      {
        question: 'Como calcular juros simples no dia a dia?',
        answer: 'Para calcular juros simples de um empréstimo, multiplique o valor principal pela taxa de juros (em decimal) e pelo tempo. Exemplo: R$ 1.000,00 a 2% ao mês por 3 meses = 1000 × 0,02 × 3 = R$ 60,00 de juros. Montante final: R$ 1.060,00.'
      },
    ],
    tips: [
      'Geralmente, empréstimos informais ou contratos civis de curto prazo utilizam juros simples para simplificar o cálculo.',
      'Fique atento se a taxa descrita é mensal ou anual e certifique-se de preencher o período correspondente.',
      'Para investimentos de longo prazo, prefira produtos que usam juros compostos (CDB, LCI, LCA, Tesouro Direto) para maximizar seus rendimentos.',
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
    longIntro: 'O FGTS (Fundo de Garantia do Tempo de Serviço) é um direito dos trabalhadores brasileiros com carteira assinada (CLT), criado pela Lei 5.107/1966 e atualmente regido pela Lei 8.036/1990. O empregador deposita mensalmente 8% do salário bruto do funcionário em uma conta vinculada à Caixa Econômica Federal, que rende TR (Taxa Referencial) + 3% ao ano. Além dos depósitos mensais, o FGTS pode ser sacado em situações específicas como demissão sem justa causa, aposentadoria, compra da casa própria, doenças graves (como câncer ou HIV), e no sistema de saque-aniversário. O FGTS também serve como garantia para financiamentos habitacionais do SFH (Sistema Financeiro de Habitação), permitindo que trabalhadores usem o saldo para amortizar ou quitar imóveis financiados.',
    howItWorks: 'Disponibilize seu salário mensal bruto, o saldo de partida e os meses trabalhados sob o regime CLT para desenhar a linha histórica de depósitos.',
    faqs: [
      {
        question: 'Quanto é depositado mensalmente no FGTS?',
        answer: 'Para trabalhadores com contrato CLT, o empregador deve depositar mensalmente 8% do salário bruto em conta vinculada ao FGTS. Jovens aprendizes têm direito à alíquota reduzida de 2%. O depósito deve ser feito até o dia 7 de cada mês.'
      },
      {
        question: 'Como funciona o Saque-Aniversário?',
        answer: 'O Saque-Aniversário permite retirar anualmente, no mês de aniversário, um percentual do saldo do FGTS que varia de 5% a 50% mais uma parcela adicional fixa (ex: saldo até R$ 500: 50%; acima de R$ 20.000: 5% + R$ 2.900). Quem adere PERDE o direito ao saque total em caso de demissão sem justa causa, mantendo apenas a multa rescisória de 40%.'
      },
      {
        question: 'Como usar o FGTS para financiar a casa própria?',
        answer: 'O FGTS pode ser usado para: amortizar parcelas de financiamento imobiliário pelo SFH (Sistema Financeiro da Habitação), reduzir o saldo devedor a cada 2 anos, dar entrada na compra de imóvel, ou quitar totalmente o financiamento. É necessário cumprir carência de 3 anos de trabalho sob o regime do FGTS.'
      },
    ],
    tips: [
      'Utilize o FGTS para amortizar parcelas de financiamento imobiliário e reduzir significativamente os juros pagos ao banco.',
      'Fique atento ao calendário do Saque-Aniversário para verificar se a liberação compensa a perda do direito ao saque total na demissão.',
      'Consulte periodicamente seu saldo do FGTS no aplicativo FGTS (Caixa) para identificar depósitos em atraso pela empresa.',
    ],
    relatedToolIds: ['rescisao', 'inss', 'decimo-terceiro'],
    slug: 'calculadora-de-fgts'
  },
  {
    id: 'inss',
    categoryId: 'calculadoras',
    title: 'Calculadora de Desconto INSS',
    shortDescription: 'Calcule a alíquota efetiva e o desconto previdenciário sobre o seu salário bruto de acordo com as regras vigentes.',
    longIntro: 'Descubra a retenção previdenciária oficial do INSS calculada progressivamente sobre sua remuneração bruta atual. Entenda exatamente quanto vai para sua futura previdência oficial. Desde 2020, o desconto do INSS segue alíquotas progressivas: cada faixa salarial contribui com um percentual diferente (7,5%, 9%, 12% e 14%) aplicado apenas sobre o valor que excede o limite da faixa anterior, tornando o sistema mais justo para salários mais baixos.',
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
    longIntro: 'As férias trabalhistas são um direito constitucional garantido a todos os trabalhadores brasileiros com carteira assinada (CLT), conforme previsto no artigo 7º da Constituição Federal e regulamentado pelos artigos 129 a 153 da CLT. Após cada período de 12 meses de trabalho (período aquisitivo), o empregado tem direito a 30 dias corridos de férias remuneradas, que devem ser concedidas nos 12 meses seguintes (período concessivo). O valor das férias corresponde ao salário normal acrescido de 1/3 constitucional, podendo incluir abono pecuniário (venda de até 10 dias de férias), horas extras habituais e adicionais noturnos incorporados à remuneração. As férias podem ser parceladas em até 3 períodos, sendo que ao menos um deles deve ter 14 dias corridos, conforme a Reforma Trabalhista de 2017.',
    howItWorks: 'Forneça o salário base, número de dias de férias desejados, dependentes, média de proventos variáveis (horas extras) e opte por vender 10 dias (abono pecuniário presencial).',
    faqs: [
      {
        question: 'Como funciona o cálculo do terço constitucional?',
        answer: 'Todo trabalhador tem direito a um acréscimo de 1/3 (um terço) sobre o valor total do salário no período em que estiver gozando de férias remuneradas. Exemplo: salário de R$ 3.000,00 → férias = R$ 3.000,00 + R$ 1.000,00 (1/3) = R$ 4.000,00 brutos, antes dos descontos de INSS e IRRF.'
      },
      {
        question: 'Como funciona a venda de férias (abono pecuniário)?',
        answer: 'O abono pecuniário permite que o trabalhador venda até 10 dias de suas férias (1/3 dos 30 dias). Ele recebe o valor desses dias trabalhados mais o terço constitucional sobre o abono. Importante: o abono é isento de Imposto de Renda na fonte e não sofre desconto de INSS.'
      },
      {
        question: 'As férias podem ser parceladas?',
        answer: 'Sim, desde a Reforma Trabalhista (Lei 13.467/2017), as férias podem ser divididas em até 3 períodos, sendo que um deles deve ter no mínimo 14 dias corridos e os demais não podem ser inferiores a 5 dias cada. O parcelamento deve ser acordado entre empregado e empregador.'
      },
    ],
    tips: [
      'Lembre-se que o pagamento de férias é efetuado até dois dias antes do início do descanso, porém no mês seguinte o seu contracheque regular virá proporcionalmente menor ou zerado.',
      'O abono pecuniário (vender 10 dias) é isento de Imposto de Renda na fonte e não há incidência de INSS sobre ele.',
      'Programe suas férias com antecedência e comunique o RH com pelo menos 30 dias de antecedência para garantir o planejamento.',
    ],
    relatedToolIds: ['rescisao', 'decimo-terceiro', 'inss'],
    slug: 'calculadora-de-ferias-trabalhista'
  },
  {
    id: 'rescisao',
    categoryId: 'calculadoras',
    title: 'Calculadora de Rescisão de Contrato',
    shortDescription: 'Antecipe e estude os valores líquidos de rescisões trabalhistas sob regimes CLT em variados formatos.',
    longIntro: 'Esta calculadora foi desenhada para trabalhadores e gestores avaliarem as verbas rescisórias devidas no término do vínculo CLT, simulando detalhadamente o saldo de salário, férias vencidas e proporcionais acrescidas de 1/3 constitucional, 13º salário proporcional, aviso prévio (trabalhado ou indenizado) e as multas aplicáveis sobre o FGTS. A calculadora considera os diferentes tipos de demissão previstos na legislação brasileira: sem justa causa, com justa causa, pedido de demissão e o acordo mútuo criado pela Reforma Trabalhista (Lei 13.467/2017).',
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
    longIntro: 'O décimo terceiro salário, também conhecido como gratificação natalina, é um direito garantido a todos os trabalhadores brasileiros pela Lei 4.090/1962. Equivale a 1/12 avos da remuneração devida em dezembro por mês trabalhado no ano, sendo pago em duas parcelas. A primeira parcela, paga entre fevereiro e novembro (muitas empresas pagam junto com as férias, se solicitado), corresponde a 50% do salário bruto sem descontos. A segunda parcela, paga até 20 de dezembro, inclui todos os descontos legais como INSS (tabela progressiva), Imposto de Renda Retido na Fonte (IRRF) e pensão alimentícia, se houver. Cada mês trabalhado por pelo menos 15 dias dá direito a 1/12 do valor. O 13º salário também é devido sobre horas extras habituais, comissões, adicionais noturnos e outros proventos variáveis integrados à remuneração mensal.',
    howItWorks: 'Insira o salário bruto de base, a quantidade de meses trabalhados e deduções adicionais para obter o calendário simulado das parcelas brutas e líquidas.',
    faqs: [
      {
        question: 'Como as parcelas do 13º salário são divididas?',
        answer: 'A primeira parcela (paga entre fevereiro e novembro) corresponde a 50% do salário bruto atual sem descontos. A segunda parcela (paga até 20 de dezembro) retém a totalidade do INSS e do Imposto de Renda relativo ao 13º completo. Muitos trabalhadores podem solicitar a primeira parcela junto com as férias.'
      },
      {
        question: 'Como calcular o 13º proporcional?',
        answer: 'Divida o salário bruto por 12 e multiplique pelos meses trabalhados no ano (considera-se mês trabalhado quando há 15 ou mais dias de atividade). Exemplo: salário de R$ 3.600,00 com 8 meses trabalhados = (3.600 ÷ 12) × 8 = R$ 2.400,00 de 13º proporcional.'
      },
      {
        question: 'Quem tem direito ao 13º salário?',
        answer: 'Todos os trabalhadores com carteira assinada (CLT), servidores públicos, aposentados e pensionistas do INSS, trabalhadores rurais, domésticos e avulsos. O trabalhador demitido por justa causa perde o direito ao 13º proporcional.'
      },
    ],
    tips: [
      'Trabalhadores podem solicitar o recebimento adiantado da primeira parcela nas férias conjuntas ao requerer por escrito no início do ano.',
      'Planeje o uso do 13º salário para quitar dívidas ou fazer investimentos no início do ano seguinte.',
      'O 13º salário também incide sobre horas extras, comissões e adicionais habituais integrados ao salário mensal.',
    ],
    relatedToolIds: ['inss', 'ferias', 'rescisao'],
    slug: 'calculadora-de-decimo-terceiro'
  },
  {
    id: 'imc',
    categoryId: 'calculadoras',
    title: 'Calculadora de IMC',
    shortDescription: 'Verifique seu Índice de Massa Corporal e descubra sua classificação nutricional ideal.',
    longIntro: 'O IMC (Índice de Massa Corporal) é o padrão internacional da Organização Mundial da Saúde (OMS) para classificação do estado nutricional de adultos. Uma ferramenta rápida de saúde pública para examinar se a proporção de peso corporal para sua altura está em consonância com as diretrizes de referência da OMS. O IMC é amplamente utilizado em triagens clínicas e estudos populacionais por sua simplicidade e correlação com riscos de saúde, embora não meça diretamente a gordura corporal nem distinga massa muscular de gordura.',
    howItWorks: 'Forneça sua altura em centímetros e o peso líquido em quilogramas. A calculadora calcula automaticamente o IMC usando a fórmula padrão (peso ÷ altura²), exibe o valor numérico, a faixa de classificação OMS (abaixo do peso, normal, sobrepeso ou obesidade), o peso ideal mínimo e máximo para sua altura, e dicas personalizadas baseadas na sua classificação atual.',
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
    longIntro: 'Calcular o consumo de combustível é essencial para motoristas que querem planejar gastos com viagens, deslocamentos diários e entender a eficiência do veículo. O consumo médio é medido em km/l (quilômetros por litro) e varia conforme o tipo de combustível (gasolina, etanol, diesel, GNV), condições de direção (cidade vs estrada), manutenção do veículo, peso da carga e estilo de condução. Para motoristas de aplicativo e entregadores, o controle do consumo é ainda mais crítico pois impacta diretamente na lucratividade. A regra dos 70% para o etanol é uma dica clássica: se o litro do etanol custar menos de 70% do litro da gasolina, compensa abastecer com etanol. Esta calculadora ajuda a estimar o custo total de combustível para qualquer trajeto e descobrir a autonomia do seu veículo.',
    howItWorks: 'Preencha a distância do seu trecho planejado, o rendimento médio do automóvel (km por litro) e o preço atual por litro encontrado no posto.',
    faqs: [
      {
        question: 'O álcool (etanol) rende menos que a gasolina?',
        answer: 'Sim, o etanol contém densidade energética menor que a gasolina. Em média, o etanol rende cerca de 70% a 75% da autonomia da gasolina. Se o litro do etanol estiver abaixo de 70% do preço da gasolina, ele torna-se economicamente mais vantajoso.'
      },
      {
        question: 'Como calcular o consumo do meu carro?',
        answer: 'Encha o tanque, anote a quilometragem, rode normalmente até precisar abastecer novamente. Na segunda visita ao posto, encha o tanque novamente e anote a quilometragem e os litros abastecidos. Divida a distância percorrida pelos litros abastecidos: km ÷ litros = km/l.'
      },
      {
        question: 'O que mais afeta o consumo de combustível?',
        answer: 'Ar condicionado ligado (aumenta em até 20% na cidade), pneus descalibrados, excesso de peso, janelas abertas em alta velocidade, motor desregulado, trânsito intenso (para e anda), e uso de combustível adulterado são os principais fatores que reduzem a eficiência.'
      },
    ],
    tips: [
      'Calibrar regularmente os pneus e desonerar sacolas de bagagens pesadas diminui expressivamente o gasto de combustível na estrada.',
      'Acelerações suaves e frenagens programadas reduzem o desgaste e desperdício térmico, aumentando a média em até 15%.',
      'Em viagens longas, manter velocidade constante entre 80-100 km/h na estrada otimiza o consumo da maioria dos veículos.',
    ],
    relatedToolIds: ['regra-de-tre', 'porcentagem', 'juros-simples'],
    slug: 'calculadora-de-consumo-combustivel'
  },
  {
    id: 'regra-de-tre',
    categoryId: 'calculadoras',
    title: 'Calculadora de Regra de Três',
    shortDescription: 'Resolva proporções matemáticas diretas e inversas de maneira amigável em instantes.',
    longIntro: 'A regra de três é um dos conceitos matemáticos mais úteis e versáteis do dia a dia. Ela permite resolver problemas de proporcionalidade entre duas grandezas relacionadas, sejam elas diretas (quando uma grandeza aumenta, a outra também aumenta na mesma proporção) ou inversas (quando uma aumenta e a outra diminui na mesma proporção). A regra de três é amplamente utilizada em receitas culinárias (ajustar porções), cálculos de medicamentos (dosagem por peso), engenharia (escalas de plantas), economia (câmbio de moedas), estatística, e até mesmo em vestibulares e concursos públicos. Dominar este cálculo simples pode facilitar inúmeras situações profissionais e pessoais.',
    howItWorks: 'Preencha os valores conhecidos A, B e C. O sistema resolverá e exibirá o valor correspondente de X fundamentado na equivalência clássica.',
    faqs: [
      {
        question: 'O que é proporção direta vs inversa?',
        answer: 'Direta ocorre quando duas grandezas se comportam na mesma direção: se uma dobra, a outra também dobra (ex: mais horas trabalhadas geram mais salário). Inversa ocorre quando as grandezas se comportam em direções opostas: se uma dobra, a outra reduz pela metade (ex: maior velocidade reduz o tempo de viagem pela metade).'
      },
      {
        question: 'Como resolver regra de três simples?',
        answer: '1) Organize os valores em duas colunas, cada grandeza em uma coluna. 2) Verifique se a proporção é direta ou inversa. 3) Multiplique cruzado (proporção direta) ou multiplique em linha (proporção inversa). 4) Isole a incógnita X.'
      },
      {
        question: 'Onde usamos regra de três no cotidiano?',
        answer: 'Receitas culinárias (ajustar ingredientes para mais pessoas), cálculo de combustível (quanto gastar em uma viagem), escalas de mapas, câmbio de moedas, dosagem de medicamentos veterinários, porcentagens e descontos em compras.'
      },
    ],
    tips: [
      'Muito útil para receitas culinárias, escalas fotográficas, proporção de tintas ou despesas grupais proporcionais.',
      'Sempre verifique se a relação entre as grandezas é direta ou inversa antes de aplicar o cálculo — errar isso é o erro mais comum.',
      'Em provas de concurso, a regra de três composta (3 ou mais grandezas) pode ser resolvida isolando cada par de grandezas uma de cada vez.',
    ],
    relatedToolIds: ['porcentagem', 'metros-para-pes', 'quilos-para-libras'],
    slug: 'calculadora-regra-de-tres'
  },
  {
    id: 'porcentagem',
    categoryId: 'calculadoras',
    title: 'Calculadora de Porcentagem',
    shortDescription: 'Efetue aumentos, descontos, percentuais de proporção e variações em segundos.',
    longIntro: 'A porcentagem é uma das operações matemáticas mais presentes no cotidiano dos brasileiros. Representada pelo símbolo %, significa "por cento" ou "a cada cem". O cálculo de porcentagem é essencial para entender descontos em compras, promoções de liquidação, taxas de juros, comissões de vendas, impostos (INSS, IRRF, ICMS), variações de preços, rendimentos de investimentos, e indicadores econômicos como inflação (IPCA) e taxa SELIC. Dominar o cálculo de porcentagem é fundamental para a saúde financeira pessoal e profissional. Nossa calculadora oferece três modalidades principais: calcular X% de um valor, descobrir qual porcentagem um valor representa de outro, e calcular a variação percentual entre dois valores.',
    howItWorks: 'Selecione uma das três modalidades comuns: descobrir parcelas de um valor, percentual correspondente de uma quantia sobre outra, ou inflação/queda de valor.',
    faqs: [
      {
        question: 'O que significa calcular variação percentual?',
        answer: 'É a mensuração da alteração proporcional de uma quantia para outra. Mostra se um ativo ou preço valorizou ou caiu expressivamente diante de sua base histórica. Fórmula: ((valor final - valor inicial) / valor inicial) × 100. Exemplo: de R$ 100 para R$ 125 = aumento de 25%.'
      },
      {
        question: 'Como calcular desconto de X%?',
        answer: 'Multiplique o valor original pelo percentual de desconto (em decimal) e subtraia do valor original. Exemplo: produto de R$ 200 com 15% de desconto = 200 × 0,15 = R$ 30 de desconto. Preço final: R$ 200 - R$ 30 = R$ 170.'
      },
      {
        question: 'Qual a diferença entre aumento e acréscimo percentual?',
        answer: 'Aumento percentual é o mesmo que acréscimo: valor original × (1 + percentual/100). Exemplo: R$ 1.000 com acréscimo de 10% = 1000 × 1,10 = R$ 1.100. Desconto: valor original × (1 - percentual/100).'
      },
    ],
    tips: [
      'Em liquidações, compare descontos reais com promoções superficiais avaliando a variação direta do preço à vista comercializado anteriormente.',
      'Para calcular 10% de qualquer valor rapidamente, basta deslocar a vírgula uma casa decimal para a esquerda (ex: 10% de 350 = 35,0).',
      'Em compras parceladas, calcule sempre o valor total a prazo versus o valor à vista para saber o real custo do parcelamento.',
    ],
    relatedToolIds: ['regra-de-tre', 'juros-simples', 'juros-compostos'],
    slug: 'calculadora-de-porcentagem'
  },
  {
    id: 'idade',
    categoryId: 'calculadoras',
    title: 'Calculadora de Idade Exata',
    shortDescription: 'Saiba sua idade exata em anos, meses, dias, horas e até os minutos totais de vida.',
    longIntro: 'Calcular a idade exata é mais complexo do que simplesmente subtrair anos. Uma calculadora de idade precisa levar em conta anos bissextos, meses com diferentes quantidades de dias, e calcular não apenas anos completos mas também meses e dias. Esta ferramenta é útil para conferir a idade para matrículas escolares, processos seletivos, aposentadoria, planos de saúde, concursos públicos, cálculo de tempo de contribuição (INSS), idade de animais de estimação, e curiosidades pessoais como total de dias vividos, horas de vida e até minutos. Além da idade exata entre duas datas (nascimento e hoje), a ferramenta também pode ser usada para calcular o tempo decorrido entre eventos históricos, tempo de empresa ou tempo de relacionamento.',
    howItWorks: 'Insira o dia e horário aproximado de nascimento. A ferramenta calcula o saldo do tempo de vida diante do relógio corrido hoje.',
    faqs: [
      {
        question: 'Como os anos bissextos afetam os cálculos?',
        answer: 'Nossa calculadora integra a inclusão de anos com 366 dias (bissextos) no somatório de dias corridos para garantir precisão matemática. Anos bissextos ocorrem a cada 4 anos (divisíveis por 4), exceto séculos não divisíveis por 400.'
      },
      {
        question: 'O que considerar no cálculo de idade para aposentadoria?',
        answer: 'Para aposentadoria, o INSS considera a idade em anos completos na data do requerimento. Dias e meses não são arredondados: você precisa ter a idade mínima completa (ex: 65 anos para homens) no dia do pedido.'
      },
      {
        question: 'Como calcular idade em meses para bebês?',
        answer: 'Para bebês e crianças pequenas, a idade é frequentemente medida em meses. Subtraia o mês de nascimento do mês atual e ajuste com os dias. Exemplo: nascido em 15/03/2026, hoje 27/06/2026 = 3 meses e 12 dias.'
      },
    ],
    tips: [
      'Ideal para descobrir marcos exatos de meses de crianças, pets ou acompanhamento de aniversários de casamentos e sociedades.',
      'Para cálculo de tempo de contribuição do INSS, lembre-se de que dias, meses e anos são contados integralmente.',
    ],
    relatedToolIds: ['dias-entre-datas', 'imc', 'regra-de-tre'],
    slug: 'calculadora-de-idade-exata'
  },
  {
    id: 'dias-entre-datas',
    categoryId: 'calculadoras',
    title: 'Calculadora de Dias Entre Datas',
    shortDescription: 'Calcule a distância exata de dias, semanas e meses entre dois dias determinados do calendário.',
    longIntro: 'Calcular a quantidade exata de dias entre duas datas é essencial para diversas situações profissionais e pessoais: prazos contratuais e judiciais, contagem de férias, períodos de carência de planos de saúde, vencimento de boletos e contas, prazos de garantia, estimativas de entrega de projetos, cálculo de juros de mora, contagem regressiva para eventos (casamento, viagem, vestibular), e acompanhamento de gestação. Além dos dias corridos, nossa calculadora permite desconte finais de semana e feriados para obter dias úteis, essencial para prazos processuais e comerciais. Você pode personalizar a contagem incluindo ou excluindo o dia final, conforme sua necessidade.',
    howItWorks: 'Defina a data inicial e a data alvo para colher as métricas de tempo líquido transcorrido e estimativa semanal de proximidade.',
    faqs: [
      {
        question: 'A contagem inclui os dias inicial e final?',
        answer: 'Por padrão, nossa calculadora conta o intervalo completo entre as datas. Você pode calibrar se prefere computar o dia final ou avaliar apenas o intervalo estrito absoluto de repouso entre os marcos, ajustando as configurações.'
      },
      {
        question: 'Como contar dias úteis excluindo finais de semana?',
        answer: 'Selecione a opção "dias úteis" na calculadora. O sistema automaticamente desconsidera sábados e domingos da contagem. Para prazos judiciais, é possível também excluir feriados nacionais, estaduais e municipais.'
      },
      {
        question: 'Quantos dias úteis tem um mês típico?',
        answer: 'Um mês típico tem entre 20 e 23 dias úteis, dependendo da quantidade de feriados e finais de semana. Janeiro: ~22 dias. Fevereiro: ~18-20 dias. Média anual: ~252 dias úteis por ano (considerando 52 semanas × 5 dias úteis - feriados).'
      },
    ],
    tips: [
      'Facilita consideravelmente estimativas de aluguel por diárias, contagem de períodos de carência ou prazos contratuais corporativos.',
      'Para prazos processuais, sempre use o sistema de dias úteis desconsiderando feriados forenses.',
      'Lembre-se: prazos em dias corridos incluem sábados, domingos e feriados — muito comum em contratos comerciais.',
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
    longIntro: 'Configure seu salário bruto mensal, dependentes familiares e deduções extras para descobrir exatamente quanto cairá na sua conta bancária todo mês como Salário Líquido CLT, visualizando o detalhamento completo de todos os descontos aplicados. O salário líquido é o valor final recebido pelo trabalhador após as deduções obrigatórias de INSS (alíquotas progressivas de 7,5% a 14%), Imposto de Renda Retido na Fonte (IRRF com tabela progressiva), vale-transporte (até 6%), plano de saúde e pensão alimentícia, quando aplicável.',
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


  // NOVA: CALCULADORA CLT vs PJ
  {
    id: 'clt-vs-pj',
    categoryId: 'calculadoras',
    title: 'Calculadora CLT vs PJ',
    shortDescription: 'Compare quanto você ganha como CLT versus Pessoa Jurídica (PJ) e descubra qual regime compensa mais.',
    longIntro: 'A comparação entre CLT (Carteira Assinada) e PJ (Pessoa Jurídica) é uma das dúvidas mais comuns entre profissionais brasileiros, especialmente programadores, designers, consultores e outros trabalhadores que podem atuar como MEI, EI ou Microempresa. Enquanto o CLT oferece benefícios como 13º salário, férias remuneradas, FGTS, INSS e estabilidade, o regime PJ geralmente paga um valor bruto maior mas exige que o profissional arque com todos os encargos trabalhistas, impostos (Simples Nacional, ISS, IRPJ) e contribuições previdenciárias (INSS) por conta própria. Esta calculadora compara os dois regimes de forma detalhada, considerando todos os benefícios do CLT (férias, 13º, FGTS, vale-transporte, vale-refeição, plano de saúde, seguro-desemprego) e os custos do PJ (impostos, contador, INSS como contribuinte individual, ausência de benefícios).',
    howItWorks: 'Informe seu salário bruto CLT (ou valor pretendido PJ), os benefícios que você recebe como CLT (vale-transporte, vale-refeição, plano de saúde, etc.) e a alíquota de impostos como PJ (Simples Nacional). A calculadora compara o valor líquido anual de cada regime, considerando 13º salário, férias com 1/3, FGTS + multa, e todos os descontos obrigatórios para CLT, versus o faturamento anual PJ menos impostos, contador, INSS e ausência de benefícios. O resultado mostra qual regime é mais vantajoso financeiramente e qual a diferença anual entre os dois.',
    faqs: [
      {
        question: 'Qual regime é mais vantajoso: CLT ou PJ?',
        answer: 'Depende do valor oferecido. Como regra geral, o PJ precisa pagar pelo menos 30-50% a mais que o CLT para compensar a perda de benefícios (13º, férias, FGTS, INSS patronal, plano de saúde, vale-refeição). Para salários de até R$ 5.000, o CLT geralmente compensa mais. Acima de R$ 8.000-10.000, o PJ pode ser mais vantajoso financeiramente.'
      },
      {
        question: 'Quais os custos ocultos do PJ?',
        answer: 'Além dos impostos (Simples Nacional: 6-15% dependendo do anexo), o PJ precisa pagar: contador (R$ 150-600/mês), INSS como contribuinte individual (11% ou 20%), ISS municipal (2-5%), não tem 13º salário, férias remuneradas (precisa reservar dinheiro), FGTS, vale-transporte, vale-refeição, plano de saúde, e não tem direito a seguro-desemprego nem multa rescisória.'
      },
      {
        question: 'Qual o valor mínimo que um PJ deve cobrar para equiparar ao CLT?',
        answer: 'Multiplique seu salário CLT por 1,3 a 1,5 (dependendo dos benefícios). Exemplo: CLT de R$ 6.000 → PJ deve cobrar no mínimo R$ 7.800 a R$ 9.000. Regra prática: salário CLT × 12 (13º e férias) + FGTS (8%) + benefícios. Em seguida, divida por 11 meses de trabalho (reservando 1 mês de férias não remuneradas) e adicione 20-30% de custo operacional.'
      }
    ],
    tips: [
      'Considere também benefícios não financeiros: o CLT dá estabilidade e direitos trabalhistas; o PJ dá mais flexibilidade e potencial de ganho maior.',
      'Para quem está migrando de CLT para PJ, negocie uma remuneração pelo menos 50% maior que seu salário CLT atual para compensar todos os benefícios perdidos.',
      'MEI (Microempreendedor Individual) tem limite de faturamento de R$ 81.000/ano e é a opção mais barata de PJ para quem está começando como autônomo.',
      'Consulte um contador para calcular exatamente sua alíquota efetiva no Simples Nacional, que varia conforme o anexo (comércio, indústria, serviços).'
    ],
    relatedToolIds: ['salario-liquido', 'inss', 'decimo-terceiro', 'rescisao', 'margem-lucro'],
    slug: 'calculadora-clt-vs-pj'
  },

  // CONVERSORES
  {
    id: 'metros-para-pes',
    categoryId: 'conversores',
    title: 'Conversor de Metros para Pés',
    shortDescription: 'Converta facilmente comprimento e altura entre o sistema métrico e imperial.',
    longIntro: 'Converter metros para pés (feet) e vice-versa é essencial em diversas situações, especialmente ao lidar com especificações internacionais. O sistema imperial (pés, polegadas, milhas) ainda é amplamente utilizado nos Estados Unidos, Inglaterra e em alguns setores específicos como aviação civil (altitudes em pés), engenharia aeronáutica, especificações técnicas de produtos importados, decoração (móveis importados), e até mesmo dados biométricos de altura em países como EUA e Reino Unido. Saber converter rapidamente entre os sistemas métrico e imperial evita erros em projetos de construção, importação de equipamentos e interpretação de manuais técnicos. O fator exato de conversão é 1 metro = 3,28084 pés, e 1 pé = 0,3048 metros.',
    howItWorks: 'Preencha metros para receber pés ou vice-versa na mesma tela. O fator exato de conversão é 1 metro = 3.28084 pés.',
    faqs: [
      {
        question: 'Quantos pés há em 1 metro?',
        answer: 'Exatamente 3,28084 pés (feet) padrão no padrão internacional. Uma forma fácil de memorizar: 1 metro ≈ 3,3 pés. Inversamente, 1 pé ≈ 30,5 centímetros.'
      },
      {
        question: 'Como converter minha altura de metros para pés?',
        answer: 'Multiplique sua altura em metros por 3,28. Exemplo: 1,75m × 3,28 = 5,74 pés. Isso equivale a 5 pés e 9 polegadas (5\'9"). Nos EUA, alturas são comumente expressas em pés e polegadas.'
      },
      {
        question: 'Por que a aviação usa pés?',
        answer: 'A aviação civil internacional adota o sistema imperial por tradição histórica, já que os primeiros instrumentos de voo foram desenvolvidos nos EUA e Inglaterra. Todas as altitudes de voo são medidas em pés (feet) independentemente do país de origem.'
      },
    ],
    tips: [
      'Geralmente frotas de aviação civis baseiam suas altitudes prioritariamente na escala imperial de pés (feet).',
      'Para conversão rápida: multiplique metros por 3,3 para obter pés aproximados. Divida pés por 3,3 para obter metros.',
      'Tabelas de especificações de produtos nos EUA quase sempre usam pés (ft) para comprimento e polegadas (in) para detalhes menores.',
    ],
    relatedToolIds: ['quilos-para-libras', 'celsius-para-fahrenheit', 'regra-de-tre'],
    slug: 'converter-metros-para-pes'
  },
  {
    id: 'quilos-para-libras',
    categoryId: 'conversores',
    title: 'Conversor de Quilos para Libras',
    shortDescription: 'Transfira pesos entre kgs e pounds para bagagens, receitas e tabelas internacionais.',
    longIntro: 'Converter quilogramas (kg) para libras (lbs) é uma necessidade frequente para quem viaja para países que usam o sistema imperial (EUA, Reino Unido, Canadá), pratica esportes com equipamentos importados, segue receitas culinárias internacionais ou precisa entender especificações de produtos. A libra (pound) é a unidade de massa do sistema imperial, amplamente utilizada nos Estados Unidos para peso corporal, alimentos, bagagens aéreas e halteres de academia. O fator de conversão é 1 kg ≈ 2,20462 lbs. Para uma conversão mental rápida, basta multiplicar os kg por 2,2 para obter libras, ou dividir as libras por 2,2 para obter kg.',
    howItWorks: 'Digite o valor em kg ou lb para fazer a conversão imediata. 1 quilo é aproximadamente 2.20462 libras.',
    faqs: [
      {
        question: 'Como converter libras em kg de cabeça?',
        answer: 'Para cálculo mental rápido: divida a quantidade de libras por 2,2 para obter a massa aproximada em quilogramas. Exemplo: 150 lbs ÷ 2,2 ≈ 68 kg. Para maior precisão: 150 ÷ 2,20462 = 68,04 kg.'
      },
      {
        question: 'Qual a diferença entre libra (lb) e libra troy?',
        answer: 'A libra comum (avoirdupois) tem 453,59 gramas e é usada para peso corporal, alimentos e produtos em geral. A libra troy (usada para metais preciosos como ouro e prata) tem 373,24 gramas. A menos que você esteja negociando metais preciosos, use a libra comum.'
      },
      {
        question: 'Por que academias americanas usam libras?',
        answer: 'Equipamentos de academia fabricados nos Estados Unidos rotulam suas cargas em libras (lbs). Um haltere de 45 lbs equivale a aproximadamente 20,4 kg, e uma barra olímpica padrão pesa 45 lbs (20,4 kg).'
      },
    ],
    tips: [
      'Equipamentos de academia importados rotulam comumente suas cargas na unidade libras (lbs).',
      'A maioria das balanças digitais modernas permite alternar entre kg e lbs — verifique o botão de unidade.',
      'Limites de bagagem aérea internacional: malas de 50 lbs ≈ 23 kg (padrão) e 70 lbs ≈ 32 kg.',
    ],
    relatedToolIds: ['metros-para-pes', 'celsius-para-fahrenheit', 'mb-para-gb'],
    slug: 'converter-quilos-para-libras'
  },
  {
    id: 'celsius-para-fahrenheit',
    categoryId: 'conversores',
    title: 'Conversor de Celsius para Fahrenheit',
    shortDescription: 'Converta temperaturas instantaneamente para receitas, previsão de tempo internacional ou pesquisas.',
    longIntro: 'Converter temperaturas entre Celsius (°C) e Fahrenheit (°F) é essencial para viagens internacionais, receitas culinárias de origem americana ou inglesa, interpretação de previsões do tempo em países que usam o sistema imperial (EUA, Libéria, Ilhas Cayman), e compreensão de especificações técnicas de equipamentos importados. Enquanto o Brasil e a maioria dos países usam Celsius (0°C = congelamento, 100°C = ebulição), os Estados Unidos ainda utilizam Fahrenheit (32°F = congelamento, 212°F = ebulição). A conversão exata é: °F = (°C × 9/5) + 32, e °C = (°F - 32) × 5/9. Nossa calculadora também oferece conversão para Kelvin (K), a unidade de temperatura do Sistema Internacional (SI), usada em contextos científicos.',
    howItWorks: 'Qualquer modificação em um termômetro atualiza os equivalentes simultaneamente sem demandar recarregamento de página.',
    faqs: [
      {
        question: 'Onde o sistema Fahrenheit é regular?',
        answer: 'Atualmente é usado principalmente nos Estados Unidos e em seus territórios. Alguns países do Caribe e a Libéria também usam Fahrenheit no dia a dia. O Reino Unido usa Celsius para temperatura ambiente, mas Fahrenheit para temperaturas altas como água quente.'
      },
      {
        question: 'Como converter Celsius para Fahrenheit rapidamente?',
        answer: 'Multiplique °C por 2 e adicione 30 (versão simplificada). Exemplo: 25°C × 2 + 30 = 80°F (valor exato: 77°F). Para precisão: (°C × 9/5) + 32 = °F. 25°C × 1,8 + 32 = 77°F.'
      },
      {
        question: 'Qual temperatura é igual em Celsius e Fahrenheit?',
        answer: '-40° é o ponto onde as escalas Celsius e Fahrenheit se encontram: -40°C = -40°F. É um fato curioso útil para verificar se sua conversão está correta em temperaturas negativas extremas.'
      },
    ],
    tips: [
      'Zero graus Celsius (congelamento d\'água) equivale a 32 graus Fahrenheit na escala térmica imperial.',
      'Temperatura corporal normal (36,5°C) equivale a aproximadamente 97,7°F.',
      'Forno caseiro típico: 180°C ≈ 350°F (receitas americanas comuns usam 350°F para assar bolos).',
    ],
    relatedToolIds: ['metros-para-pes', 'quilos-para-libras', 'horas-para-minutos'],
    slug: 'converter-celsius-para-fahrenheit'
  },
  {
    id: 'real-para-dolar',
    categoryId: 'conversores',
    title: 'Conversor de Real para Dólar',
    shortDescription: 'Verifique valores de Real (BRL) convertidos de/para Dólar Americano (USD) com cotação personalizável.',
    longIntro: 'Converter Real (BRL) para Dólar Americano (USD) e vice-versa é uma das consultas financeiras mais frequentes entre brasileiros, seja para planejar viagens internacionais, fazer compras em sites estrangeiros (Amazon, eBay, AliExpress), receber pagamentos em dólar (freelancers), ou acompanhar investimentos no exterior. O câmbio entre Real e Dólar é influenciado por diversos fatores: taxa SELIC, inflação (IPCA), balança comercial, fluxo de capital estrangeiro, cenário político nacional e internacional, e decisões do Federal Reserve (FED) nos EUA. É importante diferenciar o câmbio comercial (usado em transações financeiras) do câmbio turismo (usado em viagens, geralmente mais caro). Nossa calculadora permite ajustar manualmente a cotação para refletir a taxa praticada pelo seu banco ou corretora.',
    howItWorks: 'Basta informar a quantia fiduciária comercial sob a taxa cambial escolhida para que o reflexo financeiro seja atualizado.',
    faqs: [
      {
        question: 'O que é spread cambial?',
        answer: 'Spread é a diferença cobrada por bancos e corretoras entre o valor real do dólar comercial anunciado na mídia e o custo final imposto ao cliente. Quanto maior o spread, maior a desvantagem para o consumidor. Algumas corretoras digitais oferecem spread reduzido (cerca de 1-2%).'
      },
      {
        question: 'Qual a cotação ideal para comprar dólar?',
        answer: 'Acompanhe o dólar comercial no Google Finance ou Bloomberg. Compare as taxas de pelo menos 3 instituições financeiras (bancos tradicionais, corretoras, contas digitais internacionais como Wise ou Nomad) antes de fechar o câmbio.'
      },
      {
        question: 'Como calcular o IOF sobre compra em dólar?',
        answer: 'IOF para compra de moeda em espécie: 1,1%. IOF para transações no cartão de crédito internacional: 4,38%. IOF para transferências internacionais (remessas): 0,38%. Exemplo: compra de US$ 1.000 no cartão: 1000 × 4,38% = US$ 43,80 de IOF.'
      },
    ],
    tips: [
      'Adicione os impostos obrigatórios IOF (atualmente 4,38% para cartões internacionais) ao orçar gastos turísticos em dólar.',
      'Use contas digitais internacionais (Wise, Nomad, Avenue) para câmbio com spread reduzido e cotação mais próxima do comercial.',
      'Evite comprar dólar em aeroportos — as taxas costumam ser as piores do mercado.',
    ],
    relatedToolIds: ['porcentagem', 'juros-compostos', 'regra-de-tre'],
    slug: 'converter-real-para-dolar'
  },
  {
    id: 'mb-para-gb',
    categoryId: 'conversores',
    title: 'Conversor de Megabytes para Gigabytes',
    shortDescription: 'Calcule a equivalência de arquivos de informática de MB para GB.',
    longIntro: 'Converter Megabytes (MB) para Gigabytes (GB) é essencial para entender planos de internet, capacidade de armazenamento de dispositivos (HDs, SSDs, celulares, pendrives), tamanho de arquivos digitais (vídeos, fotos, jogos, documentos) e franquias de dados móveis. É importante entender a diferença entre a base binária (1024) usada por sistemas operacionais (Windows, macOS, Linux) e a base decimal (1000) usada por fabricantes de hardware para rotular seus produtos. Um HD de 1 TB comercial (decimal) aparece como aproximadamente 931 GB no Windows (binário). Nossa calculadora oferece ambas as opções de conversão.',
    howItWorks: 'Insira o montante e decida se a conversão utiliza a base padrão de TI (1024) ou a base comercial simplificada direta de decimais do mercado (1000).',
    faqs: [
      {
        question: 'Por que fabricantes vendem HDs menores que o reportado pelo Windows?',
        answer: 'Fabricantes rotulam usando 1 GB = 1 bilhão de bytes (base decimal, 1000). Sistemas operacionais calculam usando 1 GB = 1.073.741.824 bytes (base binária, 1024). Isso faz um HD de 1 TB comercial aparecer como ~931 GB no sistema operacional.'
      },
      {
        question: 'Quantos MB tem um GB?',
        answer: 'Na base decimal (fabricantes): 1 GB = 1.000 MB. Na base binária (sistemas): 1 GB = 1.024 MB. A diferença se acumula com o tamanho do dispositivo — em 1 TB, a diferença é de aproximadamente 70 GB.'
      },
      {
        question: 'Como saber meu consumo de internet?',
        answer: 'Verifique seu plano de dados (geralmente em GB). Monitore no roteador ou aplicativo da operadora. Atividades comuns: streaming Netflix 1h = ~1-3 GB (HD) ou ~7 GB (4K), YouTube 1h = ~500 MB (HD), Zoom 1h = ~500 MB a 1 GB.'
      },
    ],
    tips: [
      'Geralmente, resolva as conversões de redes celulares sob 1 GB = 1024 MB para checagem precisa de franquias.',
      'Para economizar dados móveis, baixe vídeos e músicas em Wi-Fi e use compressão de dados em aplicativos como YouTube e Chrome.',
      'Um filme em HD (1080p) de 2 horas ocupa aproximadamente 4-8 GB. Em 4K, pode chegar a 15-30 GB.',
    ],
    relatedToolIds: ['kb-para-mb', 'quilos-para-libras', 'horas-para-minutos'],
    slug: 'converter-mb-para-gb'
  },
  {
    id: 'kb-para-mb',
    categoryId: 'conversores',
    title: 'Conversor de Kilobytes para Megabytes',
    shortDescription: 'Converta pequenas unidades de armazenamento de computadores digitais.',
    longIntro: 'Converter Kilobytes (KB) para Megabytes (MB) é essencial para entender o tamanho de arquivos digitais menores como documentos de texto, imagens compactadas, e-mails com anexos, logos e ícones para web, e arquivos de configuração. Um kilobyte equivale a 1.024 bytes (base binária) ou 1.000 bytes (base decimal). Documentos de texto simples (.txt) ocupam tipicamente 1-10 KB, fotos compactadas para web ocupam 50-200 KB, e e-mails sem anexo têm cerca de 5-20 KB. Compreender essa escala ajuda a otimizar o carregamento de sites, gerenciar espaço em servidores de e-mail e dimensionar corretamente imagens para aplicações web.',
    howItWorks: 'Digite KB ou MB para computar os fatores clássicos binários (1024) que coordenam o tráfego de dados na rede.',
    faqs: [
      {
        question: 'O que o termo Bit representa?',
        answer: 'Um Bit é a menor unidade de informação digital, representando 0 ou 1 (sistema binário). 8 bits formam exatamente 1 Byte, a base para todas as demais unidades (KB, MB, GB, TB). Velocidades de internet são medidas em bits por segundo (Mbps), enquanto tamanhos de arquivos são em Bytes (MB, GB).'
      },
      {
        question: 'Quantos KB tem 1 MB?',
        answer: 'Em base binária (sistemas): 1 MB = 1.024 KB. Em base decimal (fabricantes): 1 MB = 1.000 KB. A diferença é de apenas 24 KB por MB, insignificante para arquivos pequenos mas acumulativa em grandes volumes.'
      },
      {
        question: 'Qual o tamanho típico de um e-mail com anexo?',
        answer: 'Um e-mail sem anexo: ~5-20 KB. Com foto de celular (2-5 MB): ~2-5 MB. Com documento PDF (500 KB): ~500 KB. A maioria dos servidores de e-mail (Gmail, Outlook) limita anexos a 25 MB por mensagem.'
      },
    ],
    tips: [
      'Um arquivo de texto corrido leve pode ocupar mero 4 KB de espaço de disco sem estourar limite algum.',
      'Para otimizar imagens para web, comprima para 100-200 KB por imagem — qualidade visual boa com carregamento rápido.',
      'E-mails com muitos anexos grandes podem encher rapidamente sua cota de armazenamento gratuita (15 GB no Gmail).',
    ],
    relatedToolIds: ['mb-para-gb', 'horas-para-minutos', 'metros-para-pes'],
    slug: 'converter-kb-para-mb'
  },
  {
    id: 'horas-para-minutos',
    categoryId: 'conversores',
    title: 'Conversor de Horas para Minutos',
    shortDescription: 'Calcule e converta marcações horárias contínuas em frações de minutos totais acumulados.',
    longIntro: 'Converter horas para minutos e vice-versa é uma operação matemática simples mas essencial em diversas situações: calcular tempo de viagem, planejar cronogramas de trabalho e estudo, estimar duração de filmes e séries, calcular carga horária de trabalho, contabilizar horas extras, planejar treinos e atividades físicas, e estimar tempo de carregamento de baterias de dispositivos. Cada hora tem 60 minutos, e cada minuto tem 60 segundos. A conversão é direta: multiplique horas por 60 para obter minutos, ou divida minutos por 60 para obter horas. Nossa calculadora também lida com frações de hora (ex: 1,5 horas = 90 minutos) e permite converter entre horas, minutos e segundos simultaneamente.',
    howItWorks: 'O sistema multiplica horas por 60 para expor os minutos, ou divide o saldo acumulado de minutos de volta para horas.',
    faqs: [
      {
        question: 'Quantos minutos há em um dia completo de escala solar?',
        answer: 'A escala possui 24 horas, totalizando exatamente 1.440 minutos corridos. Multiplicando por 60 segundos: 86.400 segundos por dia.'
      },
      {
        question: 'Como converter horas decimais para horas:minutos?',
        answer: 'Exemplo: 2,75 horas. As 2 horas inteiras permanecem. 0,75 × 60 = 45 minutos. Resultado: 2 horas e 45 minutos. Cuidado: 1,5 horas NÃO é 1h50, é 1h30 (90 minutos).'
      },
      {
        question: 'Quantos minutos tem uma semana?',
        answer: 'Uma semana tem 7 dias × 24 horas × 60 minutos = 10.080 minutos. Um mês de 30 dias tem 43.200 minutos. Um ano tem 525.600 minutos.'
      },
    ],
    tips: [
      'Multiplicações simples feitas de cabeça podem pregar peças em frações de centésimos (ex: 1,5 horas são 90 minutos, e não 150 minutos).',
      'Para converter minutos em horas decimais: divida os minutos por 60. Ex: 90 min ÷ 60 = 1,5 horas.',
      'A jornada de trabalho CLT de 44 horas semanais equivale a 2.640 minutos por semana ou aproximadamente 10.560 minutos por mês.',
    ],
    relatedToolIds: ['dias-para-horas', 'dias-entre-datas', 'idade'],
    slug: 'converter-horas-para-minutos'
  },
  {
    id: 'dias-para-horas',
    categoryId: 'conversores',
    title: 'Conversor de Dias para Horas',
    shortDescription: 'Converta períodos de duração de dias corridos em horas totais correspondentes.',
    longIntro: 'Converter dias para horas é essencial para planejamento de viagens, cálculo de prazos de entrega, estimativas de projetos, contagem de período de férias, cálculo de diárias de hospedagem, tempo de garantia de produtos, e prazos de carência de planos e seguros. Cada dia possui 24 horas exatas (período de rotação da Terra). Nossa ferramenta permite converter dias em horas, minutos e segundos, além de calcular períodos compostos (ex: 3 dias e 12 horas = 84 horas). A conversão é direta: multiplique o número de dias por 24 para obter horas, ou divida horas por 24 para obter dias.',
    howItWorks: 'Indique a quantia numérica e tenha as respostas calculadas pelo multiplicador natural de padrão rotacional terrestre de 24 horas.',
    faqs: [
      {
        question: 'Quantas horas completam uma semana tradicional?',
        answer: 'Composta por sete dias corridos, uma semana possui exatamente 168 horas acumuladas. Um mês de 30 dias: 720 horas. Um ano: 8.760 horas (8.784 em ano bissexto).'
      },
      {
        question: 'Como calcular dias uteis em horas?',
        answer: 'Dias úteis são de segunda a sexta-feira. Multiplique o número de dias úteis por 24 para obter horas corridas, ou por 8 a 12 para horas de trabalho/expediente padrão comercial.'
      },
      {
        question: 'O que são horas de voo em dias?',
        answer: 'Para viagens internacionais longas, a duração é frequentemente expressa em horas: Brasil-Europa ~10-12 horas de voo (menos de 1 dia). Brasil-Ásia ~24-30 horas (mais de 1 dia considerando conexões).'
      },
    ],
    tips: [
      'Muito favorável para estimar horas de voos, hospedagens ou garantias pós-compra faturadas por prazos corridos.',
      'Prazos contratuais em "dias corridos" incluem fins de semana e feriados — sempre os converta para horas para planejamento preciso.',
      'Carnaval: 4 dias (96 horas) de feriado prolongado. Reveillon: 1-2 dias (24-48 horas).',
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
    longIntro: 'O Gerador de CPF é uma ferramenta essencial para desenvolvedores de software, profissionais de QA (Quality Assurance), analistas de sistemas, estudantes de TI e profissionais de marketing digital que precisam de números de CPF válidos para testar formulários, sistemas de cadastro, integrações com APIs, validações de dados e ambientes de homologação. O CPF (Cadastro de Pessoas Físicas) é composto por 11 dígitos: os 9 primeiros formam a raiz (identificando a pessoa na Receita Federal), e os 2 últimos são dígitos verificadores calculados pelo algoritmo módulo 11. Importante: os CPFs gerados são SINTÉTICOS, ou seja, matematicamente válidos mas não correspondem a nenhum cidadão real brasileiro. Nunca utilize dados reais de pessoas em ambientes de teste.',
    howItWorks: 'Selecione as opções de formatação com ou sem pontuação e clique no gerador de dados para as hashes válidas regidas pelo cálculo interno de dígitos verificadores.',
    faqs: [
      {
        question: 'O CPF gerado é de uma pessoa física real?',
        answer: 'Não. Os números são criados sinteticamente através de algoritmos de módulo 11, não guardando qualquer filiação cadastral de cidadãos reais. São matematicamente válidos mas não pertencem a ninguém.'
      },
      {
        question: 'Como funciona o algoritmo verificador do CPF?',
        answer: 'O algoritmo usa os 9 primeiros dígitos, atribui pesos de 10 a 2, soma os resultados e aplica módulo 11. Se o resto for menor que 2, o primeiro dígito é 0; se maior, subtrai de 11. Repete o processo com 10 dígitos (pesos 11 a 2) para o segundo dígito.'
      },
      {
        question: 'Posso usar CPFs gerados em produção?',
        answer: 'Nunca utilize CPFs gerados em sistemas de produção ou para cadastrar pessoas reais. Eles servem exclusivamente para testes em ambientes de desenvolvimento (localhost), homologação e simulação de fluxos cadastrais.'
      },
    ],
    tips: [
      'Nunca armazene dados pessoais reais de clientes em banco de dados locais de homologação ou laboratórios de desenvolvimento.',
      'O portal oferece as duas saídas limpas (formatado e sem formatação) com atalhos de cópia para área de transferência.',
      'Use CPFs sintéticos para popular bancos de dados de teste, evitando violações à LGPD com dados reais de terceiros.',
    ],
    relatedToolIds: ['cnpj', 'senha', 'uuid'],
    slug: 'gerador-de-cpf'
  },
  {
    id: 'cnpj',
    categoryId: 'geradores',
    title: 'Gerador e Validador de CNPJ',
    shortDescription: 'Gere CNPJ válidos sintéticos formate e valide CNPJ existentes para uso de homologação corporativa de TI.',
    longIntro: 'O Gerador de CNPJ é uma ferramenta indispensável para desenvolvedores e analistas que precisam de números de CNPJ sintéticos e matematicamente válidos para testar sistemas de cadastro empresarial, emissão de notas fiscais eletrônicas (NF-e) em ambiente de homologação, integrações com sistemas contábeis, fluxos de e-commerce B2B, cadastros de clientes PJ, e sistemas de gestão empresarial (ERP). O CNPJ (Cadastro Nacional da Pessoa Jurídica) possui 14 dígitos no formato XX.XXX.XXX/XXXX-XX: os 8 primeiros identificam a empresa, 4 dígitos identificam a filial (0001 para matriz), e os 2 últimos são dígitos verificadores. Assim como o CPF, os CNPJs gerados são sintéticos e não correspondem a empresas reais registradas na Receita Federal.',
    howItWorks: 'O botão de lote elabora estruturas de CNPJ compostas por 14 dígitos respeitando as posições de controle do cadastro empresarial.',
    faqs: [
      {
        question: 'Os cadastros gerados dão acesso ao CNPJ governamental?',
        answer: 'Não. São combinações computacionais que cumprem os algoritmos matemáticos de validação, ideais para mockups de sistemas de faturamento e testes de integração. Não representam empresas reais ativas na Receita Federal.'
      },
      {
        question: 'Como funciona o algoritmo verificador do CNPJ?',
        answer: 'O CNPJ usa módulo 11 com pesos alternados. O primeiro dígito usa pesos de 5 a 9 (primeiros 12 dígitos). O segundo dígito usa pesos de 6 a 9 (13 dígitos). Se o resto for menor que 2, dígito = 0; senão, dígito = 11 - resto.'
      },
      {
        question: 'Para que servem CNPJs de teste?',
        answer: 'Popular bancos de dados de homologação, testar fluxos de cadastro de clientes PJ, simular emissão de NF-e em ambiente de sandbox, validar formulários de e-commerce B2B e testar integrações com sistemas contábeis e ERPs.'
      },
    ],
    tips: [
      'Excelente para testes de integrações de Nota Fiscal Eletrônica (NF-e) nos ambientes de sandbox da SEFAZ.',
      'Para testes completos de fluxo, combine com o gerador de CPF e endereço para simular cadastros empresariais completos.',
    ],
    relatedToolIds: ['cpf', 'senha', 'uuid'],
    slug: 'gerador-de-cnpj'
  },
  {
    id: 'senha',
    categoryId: 'geradores',
    title: 'Gerador de Senha Segura',
    shortDescription: 'Construa credenciais de máxima segurança impedindo hacking ou adivinhações maliciosas.',
    longIntro: 'O Gerador de Senha Segura é uma ferramenta essencial para criar credenciais robustas e proteger suas contas online contra ataques cibernéticos. Com o aumento alarmante de vazamentos de dados e ataques de força bruta no Brasil e no mundo, usar senhas fortes e únicas para cada serviço nunca foi tão importante. Uma senha verdadeiramente segura deve ter no mínimo 12 caracteres (idealmente 16 ou mais), combinar letras maiúsculas e minúsculas, números e símbolos especiais, e não conter palavras do dicionário, datas de nascimento, nomes de familiares ou sequências previsíveis. Nossa ferramenta permite gerar senhas de até 64 caracteres com total personalização, incluindo opção de senhas legíveis (passphrases) para facilitar a memorização.',
    howItWorks: 'Regule o comprimento ideal (até 64 caracteres) com opções de alternância de caixa de letras, números e símbolos especiais de digitação.',
    faqs: [
      {
        question: 'O que constitui uma senha forte?',
        answer: 'A força repousa na variedade (combinação aleatória de maiúsculas, minúsculas, números e símbolos) e no comprimento (ideal superior a 12 caracteres). Cada caractere adicional multiplica exponencialmente o tempo necessário para quebrar a senha por força bruta.'
      },
      {
        question: 'Quanto tempo leva para quebrar senhas?',
        answer: 'Uma senha de 8 caracteres (só minúsculas): minutos. 8 caracteres (complexa): horas. 12 caracteres (complexa): séculos. 16 caracteres: milhões de anos. O comprimento é o fator mais importante.'
      },
      {
        question: 'Senhas fortes precisam ser trocadas com frequência?',
        answer: 'Não mais. As diretrizes atuais (NIST, 2024) recomendam trocar senhas apenas quando houver suspeita de comprometimento. O mais importante é usar senhas únicas para cada serviço e ativar a autenticação de dois fatores (2FA).'
      },
    ],
    tips: [
      'Nunca aproveite senhas idênticas em variadas redes sociais ou contas de bancos.',
      'Use um Gerenciador de Senhas criptografado confiável (Bitwarden, 1Password, Proton Pass) para organizá-las.',
      'Ative a autenticação de dois fatores (2FA) em todos os serviços que oferecerem — é a camada extra mais importante de segurança.',
    ],
    relatedToolIds: ['uuid', 'hash-sha256', 'hash-md5'],
    slug: 'gerador-de-senha-segura'
  },
  {
    id: 'qr-code',
    categoryId: 'geradores',
    title: 'Gerador de QR Code',
    shortDescription: 'Gere instantaneamente códigos de QR Code para URLs, textos, conexões Wi-Fi ou contatos.',
    longIntro: 'O Gerador de QR Code permite criar códigos QR personalizados para qualquer finalidade: compartilhar URLs, textos, conexões Wi-Fi, contatos (vCard), números de telefone, e-mails, localizações geográficas, pagamentos PIX, cardápios digitais, links para redes sociais e muito mais. QR Codes são códigos de barras bidimensionais que podem ser escaneados pela câmera de qualquer smartphone moderno sem necessidade de aplicativos adicionais. No Brasil, o QR Code se tornou onipresente com a popularização do PIX (sistema de pagamentos instantâneos do Banco Central), sendo utilizado em maquininhas de cartão, boletos bancários, telas de celular e cobranças presenciais.',
    howItWorks: 'Diga qual é a informação de origem correspondente. O renderizador gerará dinamicamente o código bidimensional bidirecional.',
    faqs: [
      {
        question: 'O QR Code gerado possui validade de tempo?',
        answer: 'Não, os QR Codes gerados são perpétuos e não expiram. Como o código armazena diretamente a URL ou informação que você inseriu (e não um link proprietário nosso), ele funcionará enquanto o destino estiver ativo.'
      },
      {
        question: 'Como gerar um QR Code PIX?',
        answer: 'Para gerar um QR Code PIX, você precisa da chave PIX (CPF, CNPJ, e-mail, telefone ou chave aleatória) e do valor da cobrança (para QR Code dinâmico). O QR Code estático (mesmo valor) pode ser gerado com sua chave PIX diretamente no seu banco.'
      },
      {
        question: 'Quais dados um QR Code pode armazenar?',
        answer: 'URLs (até 2.048 caracteres), textos simples (até 4.296 caracteres), informações de contato (vCard), conexão Wi-Fi (SSID + senha), números de telefone, SMS, e-mails, localizações geográficas, eventos de calendário e pagamentos PIX.'
      },
    ],
    tips: [
      'Verifique previamente com a câmera do celular se as margens de contraste visual e o tamanho do código não atrapalham a focalização.',
      'QR Codes com muitos dados precisam de resolução maior para serem escaneáveis — evite textos muito longos.',
      'Sempre teste seu QR Code em pelo menos 2 dispositivos diferentes antes de imprimir em materiais promocionais.',
    ],
    relatedToolIds: ['senha', 'uuid', 'encode-url'],
    slug: 'gerador-de-qr-code'
  },
  {
    id: 'uuid',
    categoryId: 'geradores',
    title: 'Gerador de UUID (v4)',
    shortDescription: 'Crie Identificadores Únicos Universais aleatórios de alta entropia para registros de bancos de dados.',
    longIntro: 'O Gerador de UUID v4 é uma ferramenta essencial para desenvolvedores de software que precisam de Identificadores Únicos Universais para usar como chaves primárias em bancos de dados, identificadores de sessão, tokens de API, rastreamento de requisições (correlation IDs), identificação de entidades em sistemas distribuídos e chaves para cache. UUIDs v4 são gerados aleatoriamente com 122 bits de entropia, resultando em aproximadamente 5,3 × 10³⁶ combinações possíveis — a probabilidade de colisão (dois UUIDs idênticos) é tão baixa que é considerada estatisticamente impossível na prática. O formato padrão é 8-4-4-4-12 (36 caracteres com hífens), representando 128 bits em hexadecimal.',
    howItWorks: 'Selecione a quantidade desejada de geração paralela de identificadores e obtenha instantaneamente os blocos hexadecimais estruturados clássicos.',
    faqs: [
      {
        question: 'O que garante a exclusividade de um UUID v4?',
        answer: 'Sua lógica depende de geração aleatória de 122 bits (os outros 6 bits são fixos para identificar a versão 4). A probabilidade de gerar dois UUIDs idênticos é de 1 em 5,3 × 10³⁶ — essencialmente zero para qualquer aplicação prática.'
      },
      {
        question: 'Qual a diferença entre UUID v4 e v7?',
        answer: 'UUID v4 é completamente aleatório. UUID v7 é ordenado por timestamp (tempo), o que melhora o desempenho em índices de banco de dados (principalmente PostgreSQL e MySQL). UUID v4 ainda é o mais usado por simplicidade.'
      },
      {
        question: 'Devo usar UUID ou ID sequencial como chave primária?',
        answer: 'UUIDs são melhores para sistemas distribuídos, microserviços e APIs públicas (não expõem o volume de dados). IDs sequenciais são mais eficientes para índices de banco de dados e ocupam menos espaço (4 bytes vs 16 bytes). Escolha conforme sua arquitetura.'
      },
    ],
    tips: [
      'Substituir IDs inteiros autoincrementais por UUIDs preserva a privacidade do volume interno do seu banco de dados contra vazamentos em endpoints de API.',
      'Para alto desempenho em consultas SQL, UUID v7 (baseado em timestamp) é superior ao UUID v4 (aleatório) em índices B-tree.',
      'Considere usar UUIDs em sistemas que precisam gerar IDs offline (sem conexão com o banco central) para evitar conflitos.',
    ],
    relatedToolIds: ['senha', 'hash-sha256', 'lorem-ipsum'],
    slug: 'gerador-de-uuid'
  },
  {
    id: 'lorem-ipsum',
    categoryId: 'geradores',
    title: 'Gerador de Lorem Ipsum',
    shortDescription: 'Crie textos de marcação simulados para esquemas de diagramação de layouts e designs de interfaces.',
    longIntro: 'O Gerador de Lorem Ipsum é uma ferramenta clássica para designers, desenvolvedores web, diagramadores e profissionais de marketing que precisam de texto de preenchimento para protótipos, wireframes, layouts de sites, mockups de aplicativos, apresentações e testes de tipografia. O texto Lorem Ipsum tradicional é derivado de uma obra de Cícero de 45 a.C. ("De Finibus Bonorum et Malorum"), mas foi adaptado ao longo dos séculos para se tornar o padrão da indústria gráfica. Sua principal vantagem é que a distribuição de letras se aproxima do texto natural em português ou inglês, permitindo avaliar a densidade visual e a legibilidade sem que o leitor se distraia com o significado do conteúdo.',
    howItWorks: 'Indique a quantia de parágrafos desejados e copie o bloco de diagramação clássico que remonta às oficinas gráficas do século XVI.',
    faqs: [
      {
        question: 'Qual o propósito do Lorem Ipsum?',
        answer: 'Ele apresenta uma distribuição de letras uniforme nas frases, simulando perfeitamente a leitura do português ou inglês moderno sem prender a atenção do usuário ao conteúdo. Isso permite que designers e clientes foquem no layout e na tipografia.'
      },
      {
        question: 'O texto Lorem Ipsum tem significado?',
        answer: 'O texto original em latim é uma passagem modificada de Cícero sobre ética e filosofia. Porém, as versões modernas comumente usadas em design são fragmentos embaralhados que não formam frases com sentido coerente.'
      },
      {
        question: 'Existe um gerador de texto brasileiro?',
        answer: 'Sim! Existem variações em português brasileiro que usam textos e nomes brasileiros. O mais famoso é o "Pudim" e o gerador de textos com nomes de políticos e celebridades brasileiras.'
      },
    ],
    tips: [
      'Configure seu gerador no Tool Brasil para iniciar com o clássico termo inicial "Lorem ipsum dolor sit amet..." de transição.',
      'Para testes de layout responsivo, gere diferentes quantidades de parágrafos para simular variações de conteúdo.',
      'Use o Lorem Ipsum em apresentações de layout para clientes — evita que foquem no conteúdo antes de aprovarem o design.',
    ],
    relatedToolIds: ['senha', 'contador-caracteres', 'removedor-espacos'],
    slug: 'gerador-de-lorem-ipsum'
  },
  {
    id: 'hash-md5',
    categoryId: 'geradores',
    title: 'Gerador de Hash MD5',
    shortDescription: 'Gere resumos de criptografia MD5 de 128-bits para checar integridade lógica de arquivos compartilhados.',
    longIntro: 'O Gerador de Hash MD5 produz resumos criptográficos de 128 bits (32 caracteres hexadecimais) a partir de qualquer texto ou arquivo. MD5 (Message Digest Algorithm 5) foi criado por Ronald Rivest em 1991 e foi amplamente utilizado para verificar integridade de arquivos, armazenar senhas e gerar assinaturas digitais. No entanto, o MD5 é considerado criptograficamente quebrado desde 2004, quando pesquisadores demonstraram ataques de colisão prática (dois arquivos diferentes gerando o mesmo hash). Hoje, o MD5 é útil apenas para verificações de integridade de baixa segurança, comparação de arquivos não críticos, checksums de downloads não sensíveis e sistemas legados. Para segurança real, use SHA-256, SHA-3 ou bcrypt.',
    howItWorks: 'Escreva qualquer texto livre na caixa para que o processador gere em tempo real a hash correspondente composta por 32 caracteres hexadecimais.',
    faqs: [
      {
        question: 'O MD5 é seguro para armazenar senhas de produção?',
        answer: 'Não. O MD5 é completamente inseguro para senhas devido a vulnerabilidades conhecidas de colisão e ataques de força bruta com GPUs. Use bcrypt, scrypt, argon2 ou SHA-256 com salt para armazenar senhas de forma segura.'
      },
      {
        question: 'Para que o MD5 ainda é usado?',
        answer: 'Verificação de integridade de downloads (embora SHA-256 seja preferível), sistemas legados que não podem ser atualizados, checksums de arquivos públicos não sensíveis, e como hash rápido em sistemas de cache onde segurança não é requisito.'
      },
      {
        question: 'O que é uma colisão de hash?',
        answer: 'Uma colisão ocorre quando dois conteúdos diferentes produzem exatamente o mesmo hash. Em 2004, pesquisadores demonstraram que era possível criar colisões MD5 intencionalmente, tornando o algoritmo inseguro para aplicações que exigem resistência a colisões.'
      },
    ],
    tips: [
      'Útil para comparar se duas fontes de dados extensas são exatamente iguais sem necessitar confrontar palavra por palavra.',
      'Para verificar integridade de downloads importantes, prefira SHA-256 ou SHA-512 — oferecem muito mais segurança.',
      'Nunca use MD5 como única camada de proteção para senhas em sistemas de produção.',
    ],
    relatedToolIds: ['hash-sha256', 'senha', 'uuid'],
    slug: 'gerador-de-hash-md5'
  },
  {
    id: 'hash-sha256',
    categoryId: 'geradores',
    title: 'Gerador de Hash SHA-256',
    shortDescription: 'Consiga impressões digitais criptográficas fortes e seguras de arquivos de textos livres.',
    longIntro: 'O Gerador de Hash SHA-256 produz resumos criptográficos de 256 bits (64 caracteres hexadecimais) a partir de qualquer texto ou arquivo. SHA-256 faz parte da família SHA-2 (Secure Hash Algorithm 2), projetada pela Agência de Segurança Nacional dos EUA (NSA) e publicada pelo NIST em 2001. É o padrão atual de hash seguro, amplamente utilizado em: blockchain e criptomoedas (Bitcoin usa SHA-256), certificados SSL/TLS, assinaturas digitais, integridade de arquivos, armazenamento seguro de senhas (com salt), verificação de downloads de software, e autenticação de mensagens (HMAC-SHA256). SHA-256 é considerado seguro contra ataques de colisão computacionalmente viáveis e é o padrão recomendado pelo governo brasileiro (ICP-Brasil) para assinaturas digitais.',
    howItWorks: 'Cole trechos e identifique o fingerprint criptográfico seguro respondido sem necessidade de comunicação externa de servidores.',
    faqs: [
      {
        question: 'O que o SHA representa?',
        answer: 'SHA significa "Secure Hash Algorithm" (Algoritmo de Hash Seguro), uma família de funções hash criptográficas publicadas pelo NIST (Instituto Nacional de Padrões e Tecnologia dos EUA). SHA-256 produz hashes de 256 bits (32 bytes).'
      },
      {
        question: 'Qual a diferença entre SHA-256 e SHA-512?',
        answer: 'SHA-256 produz hash de 256 bits (64 caracteres hexadecimais) e é mais rápido em processadores 32 bits. SHA-512 produz hash de 512 bits (128 caracteres hex) e é mais rápido em processadores 64 bits. Ambos são igualmente seguros para aplicações práticas.'
      },
      {
        question: 'SHA-256 pode ser quebrado?',
        answer: 'Até hoje (2026), não há ataques públicos conhecidos que tornem o SHA-256 computacionalmente inviável. É considerado seguro para todas as aplicações práticas, incluindo blockchain, certificados digitais e assinaturas de documentos.'
      },
    ],
    tips: [
      'Importante para conferir se deploys de softwares ou releases de scripts em servidores não foram fraudulentamente alterados.',
      'Compare hashes SHA-256 fornecidos pelo desenvolvedor original com o hash do arquivo baixado para verificar integridade.',
      'Para aplicações que exigem segurança máxima, considere SHA-3 (padrão mais recente) ou SHA-512.',
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
    longIntro: 'Descobrir seu endereço IP público é essencial para configurar servidores domésticos, acessar sistemas corporativos remotamente (VPN), verificar se sua VPN está funcionando corretamente, solucionar problemas de rede, configurar roteadores e firewalls, acessar conteúdos geograficamente restritos, e diagnosticar bloqueios de acesso a sites. Seu IP público pode ser IPv4 (formato 192.168.0.1) ou IPv6 (formato 2001:db8::1), dependendo do seu provedor de internet. Além do IP, nossa ferramenta também exibe informações de geolocalização aproximada, provedor (ISP), cidade e país — todas baseadas em dados públicos, sem violar sua privacidade. Importante: a geolocalização por IP não mostra sua localização exata, apenas a região do seu provedor.',
    howItWorks: 'Ao acessar, consultamos servidores IP públicos para recuperar o cabeçalho de navegação. Sem expor dados sigilosos ou infringir privacidade regulada.',
    faqs: [
      {
        question: 'Qual a diferença entre IP dinâmico e estático?',
        answer: 'IP dinâmico muda cada vez que o roteador ou modem é reiniciado — é o padrão para residências. IP estático permanece fixo e é contratado especificamente para hospedar servidores, acessar sistemas corporativos ou configurar câmeras de segurança com acesso remoto.'
      },
      {
        question: 'Meu IP mostra minha localização exata?',
        answer: 'Não. A geolocalização por IP fornece a localização aproximada da central do seu provedor de internet (ISP), que pode ficar a quilômetros da sua casa. Não é possível determinar seu endereço exato apenas pelo IP público.'
      },
      {
        question: 'Como esconder meu IP real?',
        answer: 'Use uma VPN (Virtual Private Network) confiável que roteie seu tráfego por um servidor intermediário, ou use a rede Tor (The Onion Router) para anonimizar completamente sua navegação. Nem VPNs nem Tor garantem anonimato absoluto.'
      },
    ],
    tips: [
      'Servidores de DNS locais mudam a geolocalização aproximada do seu IP. Use navegadores limpos caso queira testar sua VPN.',
      'Verifique seu IP antes e depois de ativar a VPN para confirmar que o serviço está funcionando corretamente.',
      'Compartilhar seu IP público com estranhos pode permitir ataques direcionados — mantenha-o privado quando possível.',
    ],
    relatedToolIds: ['localizar-ip', 'dns-lookup', 'port-checker'],
    slug: 'qual-o-meu-ip'
  },
  {
    id: 'localizar-ip',
    categoryId: 'ferramentas-web',
    title: 'Rastreador e Localizador de IP',
    shortDescription: 'Consulte detalhes geográficos, conexões autônomas (ASN) e provedores de qualquer IP mundial.',
    longIntro: 'O Rastreador e Localizador de IP é uma ferramenta versátil para administradores de rede, equipes de segurança cibernética, analistas de suporte técnico e usuários curiosos que desejam saber a origem geográfica e informações de provedor associadas a um endereço IP. Ao inserir um IP (IPv4 ou IPv6), nossa ferramenta consulta bases de geolocalização pública para retornar: país, estado, cidade, coordenadas aproximadas, provedor de internet (ISP), sistema autônomo (ASN), e se o IP é residencial, corporativo, de datacenter ou de proxy/VPN. Esta ferramenta é útil para identificar origem de acessos suspeitos, verificar se um IP é de um datacenter (sinal de tráfego automatizado), diagnosticar problemas de roteamento de rede e investigar fraudes online.',
    howItWorks: 'Insira um IP IPv4 ou IPv6 no campo de consulta e buscaremos as correspondências cadastrais em bases gratuitas de geocodificação.',
    faqs: [
      {
        question: 'A localização mostra a casa exata do usuário?',
        answer: 'Não. A geolocalização por IP fornece a localização aproximada da central do provedor de internet (ISP) na cidade ou região, não o endereço físico da pessoa. A precisão varia de algumas centenas de metros (grandes centros) a dezenas de quilômetros (áreas rurais).'
      },
      {
        question: 'O que significa ASN?',
        answer: 'ASN (Autonomous System Number) é um número único que identifica cada rede autônoma na internet, como provedores de internet, empresas de hospedagem e grandes corporações. Exemplos: ASN 27699 (Vivo), ASN 7738 (Claro/NET), ASN 28573 (Oi).'
      },
      {
        question: 'Como identificar um IP suspeito?',
        answer: 'Verifique se o IP pertence a um datacenter (indicando tráfego automatizado ou VPN), se o país é diferente do esperado (possível fraude), se há histórico de spam ou ataques, e se o IP está listado em blacklists conhecidas como Spamhaus ou AbuseIPDB.'
      },
    ],
    tips: [
      'Provedores de redes sociais cruzam informações de geolocalização para disparar alertas de login de novos dispositivos.',
      'IPs de datacenters (AWS, Google Cloud, Azure) não devem ser usados para acessar serviços bancários — são sinais de fraude.',
      'Ferramentas como AbuseIPDB e Talos Intelligence (Cisco) fornecem reputação histórica de endereços IP suspeitos.',
    ],
    relatedToolIds: ['meu-ip', 'whois', 'dns-lookup'],
    slug: 'localizar-endereco-de-ip'
  },
  {
    id: 'whois',
    categoryId: 'ferramentas-web',
    title: 'Consulta WHOIS de Domínios',
    shortDescription: 'Veja as informações oficiais de registros dos proprietários de domínios nacionais (.br) e estrangeiros.',
    longIntro: 'A consulta WHOIS é a principal ferramenta para obter informações sobre a titularidade e o registro de domínios na internet. Criado na década de 1970, o WHOIS é um protocolo que consulta bancos de dados públicos mantidos pelos registradores de domínio (como Registro.br para domínios .br, e ICANN para domínios genéricos como .com, .net, .org). Através da consulta, é possível descobrir: data de criação e expiração do domínio, servidores DNS responsáveis, situação cadastral (ativo, suspenso, em processo de transferência), e, quando não ocultos, dados do proprietário (nome, e-mail, telefone, endereço).',
    howItWorks: 'Preencha o domínio desejado (ex: google.com.br) para simular ou recuperar a resposta de consulta oficial cadastral pública de registro.',
    faqs: [
      {
        question: 'O que é a proteção WHOIS privada?',
        answer: 'Muitos registradores oferecem um serviço pago para ocultar os dados pessoais do proprietário do domínio, exibindo informações genéricas do registrador no lugar. Isso protege contra spam, golpes e assédio, mas não é permitido para domínios .br (Registro.br exige dados reais e transparentes).'
      },
      {
        question: 'Por que verificar a data de criação de um domínio?',
        answer: 'Domínios recém-criados (menos de 6 meses) são um sinal de alerta para e-commerces suspeitos. Sites legítimos geralmente mantêm o mesmo domínio por anos. Sempre desconfie de promoções em sites com domínio criado há poucos meses.'
      },
      {
        question: 'Como interpretar a resposta WHOIS de um domínio .br?',
        answer: 'Domínios .br são gerenciados pelo Registro.br (Sistema de Registro de Domínios da Internet do Brasil). Os dados do proprietário são públicos no Brasil (sem proteção WHOIS privada). Você pode ver CPF/CNPJ, nome, e-mail e contato telefônico do titular.'
      },
    ],
    tips: [
      'Verifique domínios suspeitos de e-commerce conferindo se foram registrados há pouquíssimos dias antes de disparar vendas promocionais.',
      'Domínios prestes a expirar podem indicar sites abandonados ou vulneráveis a sequestro.',
      'Para domínios .br, utilize o site oficial whois.registro.br para consultas mais completas e confiáveis.',
    ],
    relatedToolIds: ['dns-lookup', 'ssl-checker', 'ping'],
    slug: 'consulta-whois'
  },
  {
    id: 'dns-lookup',
    categoryId: 'ferramentas-web',
    title: 'DNS Lookup - Consulta de Registros',
    shortDescription: 'Consulte os apontamentos A, AAAA, MX, TXT e CNAME de qualquer zona de domínio.',
    longIntro: 'O DNS Lookup (consulta de DNS) é uma ferramenta essencial para administradores de redes, desenvolvedores web e profissionais de TI diagnosticarem problemas de resolução de nomes, verificarem a propagação de registros DNS após alterações de hospedagem, e inspecionarem as configurações de e-mail e segurança de domínios. Ao consultar os registros DNS de um domínio, você pode ver: Registro A (endereço IPv4), AAAA (IPv6), CNAME (alias/apelido), MX (servidores de e-mail), TXT (autenticação SPF, DKIM, DMARC), NS (servidores de nomes autoritativos), e SOA (Start of Authority — informações sobre a zona DNS). Cada registro tem um TTL (Time to Live) que determina por quanto tempo a informação fica em cache nos servidores recursivos.',
    howItWorks: 'Insira o host de destino e o sistema simula as respostas do servidor identificando os diferentes tipos de registros lógicos.',
    faqs: [
      {
        question: 'O que significa cada registro DNS?',
        answer: 'Registro A: mapeia domínio para IPv4. AAAA: mapeia para IPv6. MX: servidores de e-mail receptivo. TXT: informações textuais (SPF, DKIM, DMARC). CNAME: alias — um domínio aponta para outro. NS: servidores de nomes autoritativos da zona.'
      },
      {
        question: 'O que é propagação de DNS?',
        answer: 'Quando você altera registros DNS em seu registrador, a informação leva de alguns minutos a 48 horas para se propagar por todos os servidores DNS do mundo. O TTL configurado determina a velocidade: TTL baixo (300s) = propagação rápida. TTL alto (86400s) = propagação lenta.'
      },
      {
        question: 'Como verificar se meu e-mail está configurado corretamente?',
        answer: 'Verifique se os registros MX apontam para o servidor de e-mail correto (ex: Google, Microsoft 365, hospedagem). Verifique os registros SPF, DKIM e DMARC para autenticação e prevenção de spoofing (golpes com seu domínio).'
      },
    ],
    tips: [
      'Prazos TTL programados ditam o quão rápido uma alteração de DNS se propagará com sucesso pela Internet.',
      'Ao migrar de servidor, reduza o TTL para 300 segundos (5 minutos) alguns dias antes da migração para acelerar a propagação.',
      'Ferramentas como dig (Linux/macOS), nslookup (Windows) e whatsmydns.net ajudam a verificar a propagação global do DNS.',
    ],
    relatedToolIds: ['whois', 'ssl-checker', 'http-headers'],
    slug: 'consulta-dns-lookup'
  },
  {
    id: 'ssl-checker',
    categoryId: 'ferramentas-web',
    title: 'Verificador de Certificado SSL',
    shortDescription: 'Valide a integridade do certificado SSL HTTPS de domínios e evite alertas de insegurança nos navegadores.',
    longIntro: 'O Verificador de Certificado SSL inspeciona a validade, integridade e segurança do certificado HTTPS instalado em qualquer domínio. Certificados SSL/TLS são essenciais para criptografar a comunicação entre navegadores e servidores, garantindo que dados sensíveis como senhas, números de cartão de crédito e informações pessoais trafeguem de forma segura. A ferramenta verifica: data de emissão e expiração, autoridade certificadora (CA) emissora, algoritmos de criptografia utilizados, validade do nome do domínio (CN/SAN), suporte a protocolos TLS 1.2 e 1.3, e vulnerabilidades conhecidas. Sites sem HTTPS ou com certificados expirados são marcados como "Não Seguros" pelos navegadores modernos (Chrome, Firefox, Edge).',
    howItWorks: 'Forneça o domínio corporativo HTTPS para realizar a inspeção estrutural simulada detalhada de validade técnica.',
    faqs: [
      {
        question: 'O que é a autoridade CA no SSL?',
        answer: 'CA (Certificate Authority) é a autoridade certificadora que assina e valida seu certificado SSL. Exemplos: Let\'s Encrypt (gratuito, 90 dias), Cloudflare, DigiCert, GoDaddy. A CA atesta que seu domínio realmente pertence a você.'
      },
      {
        question: 'Com que frequência renovar o SSL?',
        answer: 'Certificados gratuitos do Let\'s Encrypt expiram a cada 90 dias e devem ser renovados automaticamente via scripts ACME. Certificados pagos podem ter validade de 1 a 2 anos. A renovação automática evita o erro "Sua Conexão Não é Segura" nos navegadores.'
      },
      {
        question: 'O que acontece quando o certificado expira?',
        answer: 'Navegadores mostram um aviso de segurança vermelho bloqueando o acesso ao site. Visitantes podem desconsiderar o aviso e prosseguir, mas a confiança no site fica comprometida. Dados sensíveis (senhas, cartões) NÃO devem ser enviados em sites com certificado expirado.'
      },
    ],
    tips: [
      'Automatize a renovação dos seus certificados SSL gratuitos de 90 dias com scripts de ACME em servidores Linux.',
      'Sempre use certificados de CAs reconhecidas (Let\'s Encrypt, DigiCert, Cloudflare) — certificados autoassinados geram alertas.',
      'Após instalar um novo certificado, verifique com nossa ferramenta se todos os domínios e subdomínios estão cobertos.',
    ],
    relatedToolIds: ['http-headers', 'dns-lookup', 'whois'],
    slug: 'verificador-de-certificado-ssl'
  },
  {
    id: 'port-checker',
    categoryId: 'ferramentas-web',
    title: 'Verificador de Portas de Rede',
    shortDescription: 'Verifique se portas de conexões tradicionais (80, 443, 21, 22, 3306) estão abertas e expostas na Internet pública.',
    longIntro: 'O Verificador de Portas é uma ferramenta essencial para administradores de redes, gamers, entusiastas de segurança e profissionais de TI diagnosticarem a acessibilidade de portas de rede na Internet. Portas são pontos de conexão virtual que permitem que diferentes serviços (web, e-mail, FTP, banco de dados) coexistam no mesmo servidor. Verificar portas abertas é crucial para: configurar servidores de jogos (portas 27015, 25565), testar se firewalls estão bloqueando serviços, diagnosticar problemas de conectividade VPN, identificar vulnerabilidades de segurança (portas expostas indevidamente), e validar regras de roteador (NAT/Port Forwarding).',
    howItWorks: 'Insira um domínio ou IP e escolha a porta recomendada para obter a resposta interativa de conexões bloqueadas ou ativas.',
    faqs: [
      {
        question: 'O que significa "Porta Fechada"?',
        answer: 'Indica que não há serviço ouvindo naquela porta, ou que um firewall/roteador bloqueou a conexão. Portas fechadas são seguras. Portas abertas podem indicar serviços em execução que podem ser alvo de ataques.'
      },
      {
        question: 'Quais portas são mais comuns?',
        answer: '80 (HTTP), 443 (HTTPS — web segura), 22 (SSH), 21 (FTP), 25 (SMTP), 53 (DNS), 110 (POP3), 143 (IMAP), 3306 (MySQL), 5432 (PostgreSQL), 3389 (RDP — Área de Trabalho Remota), 27015 (jogos Steam), 25565 (Minecraft).'
      },
      {
        question: 'É perigoso ter portas abertas?',
        answer: 'Depende do serviço. Portas 80 e 443 para web são normais. Portas de acesso remoto como 22 (SSH) e 3389 (RDP) expostas publicamente são alvos comuns de ataques de força bruta. Portas de banco de dados (3306, 5432) NUNCA devem ficar expostas sem restrição de IP.'
      },
    ],
    tips: [
      'Portas de banco de dados (ex: MySQL 3306) nunca devem permanecer expostas sem limitação restrita de IP confiável.',
      'Use um firewall configurado para permitir apenas as portas essenciais para seu serviço — princípio do menor privilégio.',
      'Ferramentas como nmap (Linux/Windows) permitem escanear todas as portas abertas de um IP para auditoria completa de segurança.',
    ],
    relatedToolIds: ['ping', 'traceroute', 'meu-ip'],
    slug: 'verificador-de-portas-abertas'
  },
  {
    id: 'ping',
    categoryId: 'ferramentas-web',
    title: 'Teste de Ping Online',
    shortDescription: 'Meça a latência em milissegundos e a saúde da conexão para servidores de hospedagens mundiais.',
    longIntro: 'O Teste de Ping Online mede a latência (tempo de resposta) entre seu dispositivo e servidores na internet, expressa em milissegundos (ms). Ping é uma ferramenta de diagnóstico de rede fundamental para: gamers que precisam de baixa latência em jogos online, profissionais que usam VoIP (chamadas pela internet), streamers de vídeo ao vivo, administradores de redes monitorando a saúde de servidores, e qualquer pessoa verificando a qualidade da conexão de internet. Uma latência baixa (até 20ms) indica conexão excelente para jogos e chamadas de vídeo. Latência acima de 150ms começa a causar atrasos perceptíveis. Acima de 300ms, a experiência se torna ruim para a maioria das aplicações em tempo real.',
    howItWorks: 'Dispare simulações completas de requisições ICMP para monitorá-las interativamente com gráficos dinâmicos de resposta.',
    faqs: [
      {
        question: 'Latência menor é melhor?',
        answer: 'Sim. Em jogos competitivos online e chamadas de vídeo, latências baixas (menos de 20ms) garantem resposta em tempo real. Latências acima de 100ms começam a causar delays perceptíveis. Acima de 300ms, a experiência se torna ruim.'
      },
      {
        question: 'O que causa ping alto?',
        answer: 'Distância física até o servidor (jogar em servidores do exterior), conexão Wi-Fi instável (prefira cabo de rede), roteador sobrecarregado,下载 pesados durante o jogo (streaming, torrent), provedor de internet com roteamento ineficiente, e picos de tráfego na rede local.'
      },
      {
        question: 'Como reduzir o ping em jogos?',
        answer: 'Use conexão cabeada (cabo Ethernet) em vez de Wi-Fi. Feche programas que consomem banda (streaming, torrents). Escolha servidores de jogo mais próximos geograficamente. Considere um provedor de internet com fibra óptica (menor latência). Ative o QoS no roteador para priorizar jogos.'
      },
    ],
    tips: [
      'Geralmente conexões cabeadas em fibra óptica reduzem o atraso (jitter) quando comparadas a conexões Wi-Fi domésticas.',
      'Teste o ping em diferentes horários do dia — horários de pico (18h-22h) geralmente têm latência maior devido à congestão.',
      'Para diagnóstico completo, use também o traceroute para identificar em qual salto da rede está ocorrendo o atraso.',
    ],
    relatedToolIds: ['traceroute', 'port-checker', 'whois'],
    slug: 'teste-de-ping-online'
  },
  {
    id: 'traceroute',
    categoryId: 'ferramentas-web',
    title: 'Traceroute - Rota de Rede',
    shortDescription: 'Rastreie todos os saltos e roteadores intermediários atravessados pelos pacotes até o servidor final.',
    longIntro: 'O Traceroute é uma ferramenta de diagnóstico de rede que mapeia todos os saltos (hops) que os pacotes de dados percorrem desde seu computador até um servidor de destino na internet. Cada salto representa um roteador ou equipamento de rede intermediário. O Traceroute é essencial para: identificar onde está ocorrendo lentidão ou perda de pacotes em uma conexão, diagnosticar problemas de roteamento (pacotes indo por caminhos ineficientes), verificar se um bloqueio de rede está sendo aplicado por algum provedor (ISP), e comparar a performance de diferentes provedores de internet. A ferramenta mostra o tempo de resposta (latência) de cada salto e quantos saltos existem entre você e o destino.',
    howItWorks: 'Preencha o destino desejado e simule a cascata de hops exibida com milissegundos individuais acumulados.',
    faqs: [
      {
        question: 'Para que serve o Traceroute?',
        answer: 'Ajuda a diagnosticar se falhas de tráfego de conexões residem na rede interna (seu roteador), na operadora nacional (ISP), em backbones interestaduais ou em links internacionais de cabos submarinos. Cada asterisco (* * *) indica um roteador que não respondeu ao diagnóstico.'
      },
      {
        question: 'O que significam os asteriscos (* * *)?',
        answer: 'Alguns roteadores de backbone configurados por segurança ignoram pacotes de diagnóstico ICMP, resultando em timeouts e asteriscos na saída. Isso não significa necessariamente que há problema — alguns roteadores priorizam tráfego real sobre diagnóstico.'
      },
      {
        question: 'Quantos saltos são normais para destinos nacionais?',
        answer: 'Destinos no mesmo estado: 5-10 saltos. Destinos em outros estados: 10-20 saltos. Destinos internacionais (EUA/Europa): 15-30 saltos. Mais de 30 saltos pode indicar roteamento ineficiente.'
      },
    ],
    tips: [
      'Alguns roteadores de backbone ignoram pacotes de diagnóstico, reportando asteriscos por motivos de segurança anti-DDoS.',
      'Execute o traceroute para diferentes destinos (Google, sua hospedagem, um servidor de jogo) para comparar rotas.',
      'Para diagnóstico mais preciso, use MTR (My TraceRoute) que combina traceroute com ping contínuo em cada salto.',
    ],
    relatedToolIds: ['ping', 'port-checker', 'dns-lookup'],
    slug: 'traceroute-de-rede'
  },
  {
    id: 'http-headers',
    categoryId: 'ferramentas-web',
    title: 'Verificador de Headers HTTP',
    shortDescription: 'Inspecione as respostas de cabeçalhos de servidores Web (Cookies, segurança, cache e redirecionamentos).',
    longIntro: 'O Verificador de Headers HTTP inspeciona os cabeçalhos enviados por servidores web em resposta a uma requisição. Headers HTTP são metadados cruciais que controlam: segurança (HSTS, CSP, X-Frame-Options, X-Content-Type-Options), cache (Cache-Control, ETag, Expires), cookies (Set-Cookie), redirecionamentos (301, 302), tipo de conteúdo (Content-Type), compressão (Content-Encoding), e informações do servidor. Para desenvolvedores e administradores, verificar headers é essencial para garantir que as configurações de segurança estejam corretas, diagnosticar problemas de cache, confirmar redirecionamentos, e auditar a exposição de informações do servidor que podem ser exploradas por atacantes.',
    howItWorks: 'Simule o carregamento de uma URL para extrair os cabeçalhos de status HTTP de correspondência imediata.',
    faqs: [
      {
        question: 'O que o cabeçalho HSTS faz?',
        answer: 'HSTS (HTTP Strict Transport Security) força navegadores a sempre usarem HTTPS para acessar seu site, nunca HTTP. Isso previne ataques de downgrade (homem-no-meio). Exemplo: Strict-Transport-Security: max-age=31536000; includeSubDomains.'
      },
      {
        question: 'Como verificar se meu site está com cache otimizado?',
        answer: 'Verifique os headers Cache-Control (max-age em segundos), ETag (validação de cache), e Expires (data de expiração). Headers corretos garantem que recursos estáticos (imagens, CSS, JS) sejam cacheados pelo navegador por dias ou semanas.'
      },
      {
        question: 'O que o header X-Frame-Options protege?',
        answer: 'X-Frame-Options: DENY ou SAMEORIGIN impede que seu site seja aberto dentro de um iframe em outro domínio. Isso previne ataques de clickjacking (sequestro de cliques) onde criminosos colocam seu site transparente sobre página falsa para capturar dados ou cliques do usuário.'
      },
    ],
    tips: [
      'Use headers de cache corretos para acelerar o carregamento repetido de imagens e arquivos estáticos pelo navegador.',
      'Evite expor versões de servidor (Server: Apache/2.4.41) nos headers — isso dá informações valiosas para atacantes.',
      'Ferramentas como securityheaders.com avaliam a segurança dos headers HTTP do seu site com nota de A+ a F.',
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
    relatedToolIds: ['cpf', 'cnpj', 'meu-ip'],
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
    title: 'Filtro e Localizador de E-mails',
    shortDescription: 'Filtre, limpe e organize endereços de e-mail a partir de blocos de textos ou relatórios.',
    longIntro: 'Organize, limpe e filtre endereços de e-mail a partir de blocos de textos, listas ou relatórios próprios fornecidos voluntariamente pelo usuário para fins de organização interna.',
    howItWorks: 'Cole o seu bloco de texto ou relatório no campo de entrada. A ferramenta identifica e organiza todos os endereços de e-mail válidos locais.',
    faqs: [
      { question: 'Quais formatos de e-mail são reconhecidos?', answer: 'Qualquer formato válido de e-mail como nome@dominio.com, nome.sobrenome@empresa.com.br, nome+tag@dominio.org, entre outros.' },
      { question: 'Como a ferramenta auxilia na privacidade?', answer: 'Toda a filtragem e localização de contatos é realizada localmente no próprio navegador do usuário, sem qualquer upload ou armazenamento dos dados fornecidos voluntariamente.' }
    ],
    tips: ['Sempre respeite a LGPD ao organizar e processar endereços de e-mail.', 'Use a ferramenta para estruturar e validar listas de contatos de relatórios próprios internos.'],
    relatedToolIds: ['removedor-espacos', 'contador-caracteres', 'encode-url'],
    slug: 'filtro-de-emails'
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
    longIntro: 'O Contador de Caracteres e Palavras é uma ferramenta indispensável para redatores, jornalistas, estudantes, social media managers, copywriters, programadores e profissionais de marketing digital que precisam monitorar o tamanho de seus textos em tempo real. A ferramenta conta automaticamente: caracteres com espaço, caracteres sem espaço, palavras, parágrafos, frases, tempo médio de leitura, e densidade de palavras-chave. Essas métricas são cruciais para: escrever meta descrições do Google (limite ideal de 155-160 caracteres), posts no Twitter/X (limite de 280 caracteres), legendas do Instagram e LinkedIn, resumos acadêmicos com limites de palavras, e otimização de conteúdo para SEO. A contagem é atualizada instantaneamente enquanto você digita ou cola o texto.',
    howItWorks: 'À medida que você digita ou cola, as estatísticas de totais de caracteres (com e sem espaços), palavras e tempo de leitura dinâmica são atualizados sem cliques adicionais de ativação.',
    faqs: [
      {
        question: 'Por que o limite de caracteres importa para SEO do Google?',
        answer: 'O Google exibe cerca de 60 caracteres no título das buscas e de 155 a 160 caracteres nas meta descrições. Títulos e descrições muito longos são cortados com reticências (...) nos resultados de busca, reduzindo a taxa de clique (CTR) do seu site.'
      },
      {
        question: 'Qual o limite de caracteres ideal para cada rede social?',
        answer: 'Twitter/X: 280 caracteres. LinkedIn: 3.000 caracteres. Facebook: 63.206 caracteres. Instagram legenda: 2.200 caracteres. YouTube descrição: 5.000 caracteres. E-mail marketing: ~200 caracteres no assunto para máxima taxa de abertura.'
      },
      {
        question: 'O que é tempo médio de leitura?',
        answer: 'É uma estimativa de quanto tempo uma pessoa leva para ler seu texto, baseada na média de 200-250 palavras por minuto para leitura silenciosa. Textos até 3 minutos de leitura (~600-750 palavras) são ideais para blogs e redes sociais.'
      },
    ],
    tips: [
      'Cole relatórios inteiros para calibrar de forma limpa o tempo de atenção de consumo estimado para o seu material.',
      'Meta descrições do Google com 155-160 caracteres têm melhor taxa de clique. Evite cortes indesejados com reticências.',
      'A densidade ideal de palavra-chave para SEO é de 1-2% — acima disso pode ser considerado keyword stuffing (prática penalizada).',
    ],
    relatedToolIds: ['removedor-espacos', 'lorem-ipsum', 'senha'],
    slug: 'contador-de-caracteres'
  },
  {
    id: 'contador-palavras',
    categoryId: 'utilitarios',
    title: 'Contador de Palavras Completo',
    shortDescription: 'Métricas exatas de volume léxico, frequência de repetições e densidade vocabular.',
    longIntro: 'O Contador de Palavras Completo vai além da contagem bruta, oferecendo métricas avançadas de análise textual como: frequência de palavras (ranking de palavras mais usadas), densidade de palavras-chave, número de palavras únicas (riqueza vocabular), razão tipo-token (diversidade lexical), e distribuição de parágrafos por tamanho. Essas métricas são essenciais para: escritores que querem evitar repetição excessiva de vocabulário, profissionais de SEO analisando densidade de palavras-chave, revisores verificando consistência terminológica, pesquisadores analisando padrões textuais, e estudantes melhorando a qualidade da redação.',
    howItWorks: 'O processador varre o texto, isola pontuações e tabula as repetições estruturadas hierarquicamente.',
    faqs: [
      {
        question: 'O excesso de repetição de palavras prejudica o ranking do Google?',
        answer: 'Sim, a prática conhecida como Keyword Stuffing (lotar páginas com palavras-chave repetitivas) prejudica a legibilidade e ativa filtros de spam dos mecanismos de busca. A densidade ideal de palavra-chave é de 1-2% do texto total.'
      },
      {
        question: 'O que é riqueza vocabular (type-token ratio)?',
        answer: 'É a divisão do número de palavras únicas (types) pelo total de palavras (tokens). Quanto maior o resultado, mais diverso é seu vocabulário. Textos com TTR acima de 0,6 indicam boa variedade lexical. Abaixo de 0,4 pode indicar repetição excessiva.'
      },
      {
        question: 'Quantas palavras são recomendadas por tipo de conteúdo?',
        answer: 'Post de blog: 1.500-2.500 palavras. Artigo de fundo: 2.500-5.000 palavras. Página de produto: 300-500 palavras. Descrição de vídeo YouTube: 200-500 palavras. E-mail marketing: 100-200 palavras. Post em rede social: 50-150 palavras.'
      },
    ],
    tips: [
      'Use sinônimos elegantes para diversificar a densidade textual e preservar a fluidez de leitura de seu portal.',
      'Textos com vocabulário muito repetitivo (TTR baixo) podem ser considerados de baixa qualidade pelo algoritmo do Google.',
      'A média de palavras por frase ideal para web é de 15-20 palavras — frases muito longas prejudicam a legibilidade.',
    ],
    relatedToolIds: ['contador-caracteres', 'removedor-espacos', 'lorem-ipsum'],
    slug: 'contador-de-palavras'
  },
  {
    id: 'removedor-espacos',
    categoryId: 'utilitarios',
    title: 'Removedor de Espaços e Linhas',
    shortDescription: 'Limpe textos eliminando tabulações extras, quebras de linhas desnecessárias ou espaços redundantes.',
    longIntro: 'O Removedor de Espaços e Linhas é uma ferramenta de limpeza e formatação de texto essencial para programadores, editores, analistas de dados e profissionais que trabalham com grandes blocos de texto copiados de PDFs, páginas web, documentos do Word ou e-mails. A ferramenta oferece: remoção de espaços duplicados, remoção de linhas vazias, remoção de tabulações, remoção de quebras de página (form feed), normalização de quebras de linha para o padrão Unix (LF) ou Windows (CRLF), e condensação de todo o texto em uma única linha contínua. Ideal para preparar dados para importação em bancos de dados, limpar texto copiado de PDFs para redação, formatar código-fonte, e higienizar dados antes de análise.',
    howItWorks: 'Regule se quer remover linhas vazias, espaços duplicados ou reduzir tudo de forma condensada a uma única linha contínua.',
    faqs: [
      {
        question: 'Este processo apaga pontuação útil?',
        answer: 'Não. Ele foca apenas em caracteres de formatação invisíveis: espaços em branco duplicados, quebras de linha e parágrafo, tabulações, e caracteres de controle como form feed e carriage return. Pontuação, letras e números não são alterados.'
      },
      {
        question: 'Por que PDFs copiados geram texto bagunçado?',
        answer: 'PDFs armazenam informações de posicionamento absoluto dos caracteres na página, diferente de documentos de texto. Ao copiar, o interpretador tenta reconstruir a ordem de leitura, mas frequentemente insere quebras de linha e espaços extras onde não deveria.'
      },
      {
        question: 'O que é normalização de quebras de linha?',
        answer: 'A normalizacao de quebras de linha converte entre formatos: Windows usa CRLF (carriage return + line feed), Unix/Linux usa LF (line feed), e Mac antigo usava CR (carriage return). A ferramenta pode converter entre esses formatos para garantir compatibilidade entre sistemas operacionais diferentes.'
      },
    ],
    tips: [
      'Útil para higienizar dados de planilhas antes de transformá-los e carregá-los em formatos de bancos de dados SQL.',
      'PDFs jurídicos e acadêmicos costumam gerar as maiores bagunças na cópia — use a ferramenta para limpar rapidamente.',
      'Para importar CSV, remova espaços extras das células que podem causar erros de processamento no banco de dados.',
    ],
    relatedToolIds: ['contador-caracteres', 'formatador-json', 'minificador-css'],
    slug: 'removedor-de-espacos-duplicados'
  },
  {
    id: 'formatador-json',
    categoryId: 'utilitarios',
    title: 'Formatador e Identador JSON',
    shortDescription: 'Valide, idente e embeleze estruturas de dados JSON para facilitar a visualização por desenvolvedores.',
    longIntro: 'O Formatador e Validador JSON é uma ferramenta indispensável para desenvolvedores full-stack, analistas de dados, engenheiros de software e profissionais de TI que trabalham com APIs REST, arquivos de configuração, bancos de dados NoSQL, e integrações entre sistemas. O JSON (JavaScript Object Notation) é o formato de intercâmbio de dados mais utilizado na web moderna. A ferramenta oferece: formatação com indentação personalizada (2 ou 4 espaços), validação de sintaxe destacando erros precisamente (chaves faltando, vírgulas extras, aspas incorretas), minificação (compressão para produção), visualização em árvore hierárquica, e exportação para diferentes formatações. Útil para depurar respostas de APIs, preparar payloads para requisições POST, e organizar arquivos de configuração.',
    howItWorks: 'Cole a massa colapsada para colher a resposta formatada com recuo indentado colorível selecionável com validadores de erros estruturais embutidos.',
    faqs: [
      {
        question: 'Por que dados JSON costumam vir sem identação?',
        answer: 'Sistemas transferem APIs de forma condensada (minificada) para reduzir tráfego de rede e acelerar a velocidade de carregamento. A identação adiciona caracteres desnecessários (espaços e quebras) que aumentam o tamanho do payload em 30-50%.'
      },
      {
        question: 'O JSON aceita comentários?',
        answer: 'Não, a especificação oficial do JSON não permite comentários. Se você precisa de comentários, considere JSON5 (JSON for Humans) ou YAML. Comentários em JSON inválido quebram a análise em parsers padrão.'
      },
      {
        question: 'Como validar se um JSON é válido?',
        answer: 'Cole o JSON na ferramenta e clique em formatar. Se houver erro de sintaxe, a ferramenta destacará a linha e posição aproximada do erro. Erros comuns: vírgula após o último item de array/objeto, aspas simples (\') em vez de duplas ("") e chaves/colchetes desbalanceados.'
      },
    ],
    tips: [
      'Gaste menos tempo debugando bugs de chamadas de API formatando os payloads com o beautifier.',
      'Sempre valide JSON de arquivos de configuração (tsconfig.json, package.json) após editar manualmente.',
      'Para payloads de produção, use sempre JSON minificado (sem espaços) para reduzir tráfego e acelerar a resposta de APIs.',
    ],
    relatedToolIds: ['beautify-json', 'removedor-espacos', 'minificador-js'],
    slug: 'formatador-json'
  },
  {
    id: 'minificador-css',
    categoryId: 'utilitarios',
    title: 'Minificador de Código CSS',
    shortDescription: 'Reduza o tamanho físico dos arquivos de folhas de estilo integradas das suas páginas Web.',
    longIntro: 'O Minificador de CSS reduz o tamanho de arquivos de estilo removendo espaços em branco, comentários, quebras de linha, e otimizando seletores para produção. CSS minificado pode ser de 30% a 60% menor que o original, resultando em carregamento mais rápido de páginas web, melhor pontuação no Google PageSpeed Insights, redução no consumo de banda do servidor, e melhor experiência do usuário em conexões móveis. A ferramenta mantém a funcionalidade completa do CSS — apenas remove caracteres desnecessários para o navegador interpretar as regras de estilo. Importante: sempre mantenha o arquivo original (comentado e organizado) para manutenção futura.',
    howItWorks: 'Apaga comentários do arquivo, remove quebras de linhas internas e aglutina os seletores de estilizações de classes equivalentes.',
    faqs: [
      {
        question: 'A minificação altera a renderização visual?',
        answer: 'Não, o comportamento visual permanece idêntico. Navegadores ignoram quebras de linha e espaços extras para interpretar seletores. A minificação remove apenas caracteres não funcionais, mantendo todas as regras, valores e propriedades intactas.'
      },
      {
        question: 'Qual a redução típica de tamanho?',
        answer: 'Arquivos CSS bem comentados: redução de 40-60%. Arquivos CSS já enxutos: redução de 15-25%. A maior economia vem da remoção de comentários extensos e espaços em branco. Um arquivo de 100 KB pode ser reduzido para 40-50 KB.'
      },
      {
        question: 'Devo minificar CSS manualmente ou usar ferramentas de build?',
        answer: 'Ferramentas de build automatizadas (Vite, Webpack, Gulp) devem fazer a minificação automaticamente no processo de build/deploy. A minificação manual é útil para testes rápidos ou projetos sem sistema de build configurado.'
      },
    ],
    tips: [
      'Mantenha sempre uma cópia original comentada legível do seu código CSS para manutenção posterior.',
      'Configure seu bundler (Vite, Webpack) para minificar CSS automaticamente no build de produção.',
      'CSS moderno com variáveis e aninhamento (nesting) também pode ser minificado — a ferramenta lida com todas as sintaxes.',
    ],
    relatedToolIds: ['minificador-js', 'formatador-json', 'removedor-espacos'],
    slug: 'minificador-de-css'
  },
  {
    id: 'minificador-js',
    categoryId: 'utilitarios',
    title: 'Minificador de JavaScript',
    shortDescription: 'Otimize seus scripts reduzindo espaços em branco e unificando escopos básicos.',
    longIntro: 'O Minificador de JavaScript comprime o código-fonte removendo espaços, comentários, quebras de linha e renomeando variáveis locais para nomes mais curtos. A minificação JS pode reduzir o tamanho dos arquivos em 50-70%, resultando em: carregamento mais rápido de páginas web, melhor performance em redes móveis 3G/4G/5G, economia de banda do servidor de hospedagem, e melhor pontuação em métricas de performance (Core Web Vitals, PageSpeed). A ferramenta é ideal para preparar scripts para produção, testar o impacto da compressão no tempo de carregamento, e validar scripts de terceiros. Importante: a minificação é diferente de ofuscação (que altera nomes de funções e variáveis para dificultar engenharia reversa).',
    howItWorks: 'Compacta de modo limpo suas declarações e entrega blocos inline práticos de descarregar na mesma tela.',
    faqs: [
      {
        question: 'O que é ofuscação de código?',
        answer: 'Ofuscar vai além de comprimir: altera nomes de variáveis, funções e propriedades para nomes curtos e sem significado (ex: a, b, c, x1, x2), dificultando a engenharia reversa. Minificação apenas remove espaços e comentários sem alterar nomes de identificadores.'
      },
      {
        question: 'Minificação pode introduzir bugs?',
        answer: 'Se o código original tem ponto e vírgula faltando ou depende de ASI (Automatic Semicolon Insertion) do JavaScript, a minificação pode quebrar o código. Sempre teste o código minificado em um ambiente de staging antes de enviar para produção.'
      },
      {
        question: 'Qual a diferença entre minificação e compressão?',
        answer: 'Minificação é a remoção de caracteres desnecessários do código-fonte (redução irreversível). Compressão (Gzip, Brotli) é aplicada pelo servidor web e reduz o tamanho durante a transferência (reversível, descompactada pelo navegador). Ideal: código minificado + compressão Gzip/Brotli.'
      },
    ],
    tips: [
      'Utilize minificadores automatizados nas pipelines CI/CD de deploy para garantir ganho de performance contínuo.',
      'Sempre mantenha o código fonte original (comentado e organizado) para manutenção — o minificado é apenas para produção.',
      'A combinação de minificação + compressão Brotli pode reduzir o tamanho de arquivos JS em até 80%.',
    ],
    relatedToolIds: ['minificador-css', 'formatador-json', 'removedor-espacos'],
    slug: 'minificador-de-js'
  },
  {
    id: 'beautify-json',
    categoryId: 'utilitarios',
    title: 'Beautify JSON Beautifier',
    shortDescription: 'Deixe seus arquivos JSON perfeitamente organizados estruturados e fáceis de ler.',
    longIntro: 'O Beautify JSON (Embelezador de JSON) é a ferramenta ideal para desenvolvedores que precisam visualizar, organizar e depurar estruturas de dados JSON de forma clara e legível. Diferente de um formatador simples, o beautifier adiciona cores para diferentes tipos de dados (strings em verde, números em azul, booleanos em laranja, null em cinza), identação inteligente com linhas-guia (indent guides), e colapso/expansão de nós (tree view). Essencial para: inspecionar respostas de APIs REST, depurar payloads de webhooks, analisar arquivos de configuração, estudar estruturas de dados complexas, e preparar exemplos de código para documentação.',
    howItWorks: 'O interpretador ajusta os recuos tabulados adicionando cores vibrantes para identificar objetos chaves e listas lógicas.',
    faqs: [
      {
        question: 'O JSON aceita comentários internos?',
        answer: 'Não, a especificação oficial do JSON (RFC 7159) não tolera comentários. Se você precisa de comentários em arquivos de configuração, use JSON5 (que permite comentários) ou mude para YAML. Comentários quebram parsers JSON padrão.'
      },
      {
        question: 'Qual a diferença entre beautify e format?',
        answer: 'Formatar organiza a estrutura com indentação. Beautify vai além: adiciona syntax highlighting (cores), indent guides (linhas-guia para cada nível), e tree view expansível. Ambos tornam o JSON mais legível, mas beautify é mais visual.'
      },
      {
        question: 'Como usar JSON beautify no dia a dia?',
        answer: 'Cole respostas de API no beautifier para inspecionar dados rapidamente. Use para preparar exemplos de JSON para documentação técnica de API. Utilize para encontrar erros em arquivos de configuração JSON visualmente.'
      },
    ],
    tips: [
      'Gere esquemas e utilize esta visualização limpa nas documentações internas das APIs de sua empresa.',
      'Respostas de APIs com dezenas de campos aninhados ficam muito mais fáceis de analisar com syntax highlighting.',
      'Combine com a formatação JSON para depurar rapidamente erros de sintaxe em requisições POST complexas.',
    ],
    relatedToolIds: ['formatador-json', 'encode-url', 'decode-url'],
    slug: 'beautify-json'
  },
  {
    id: 'encode-url',
    categoryId: 'utilitarios',
    title: 'Encode URL - Codificação de URLs',
    shortDescription: 'Codifique trechos de textos de parâmetros query strings no formato padrão amigável para envio web centrado.',
    longIntro: 'A Codificação de URLs (URL Encoding) converte caracteres especiais e acentuados em formato seguro para transmissão na web, substituindo caracteres não ASCII por notação percentual (ex: espaço vira %20, ç vira %E7, á vira %E1). O URL Encoding é obrigatório para: parâmetros de consulta em URLs de APIs REST, links com caracteres especiais, envio de dados via formulários HTML (GET/POST), parâmetros UTM para campanhas de marketing, e integrações com sistemas que exigem URLs limpas. Sem a codificação correta, caracteres acentuados, espaços e símbolos podem quebrar a URL, resultando em erros 400 (Bad Request) ou links quebrados.',
    howItWorks: 'Transforma espaços em notações especiais (%20) correspondentes para permitir postagens e envios em tags estruturadas de links sem perdas.',
    faqs: [
      {
        question: 'Por que codificar URLs é obrigatório para APIs?',
        answer: 'Navegadores e servidores web utilizam conjuntos de caracteres limitados em URLs (apenas letras, números e alguns símbolos). Enviar espaços, acentos ou caracteres especiais sem codificação quebra a requisição HTTP, resultando em erro 400 ou interpretação incorreta dos parâmetros.'
      },
      {
        question: 'Qual a diferença entre encodeURI e encodeURIComponent?',
        answer: 'encodeURI() codifica a URL inteira preservando caracteres estruturais (://?#). encodeURIComponent() codifica TUDO, incluindo caracteres estruturais — use para codificar apenas o VALOR de cada parâmetro de query string, não a URL inteira.'
      },
      {
        question: 'Como criar URLs seguras para campanhas de marketing?',
        answer: 'Use a ferramenta para codificar parâmetros UTM (utm_source, utm_medium, utm_campaign) que contenham espaços, acentos ou caracteres especiais. Exemplo: utm_campaign=Promoção+Verão → utm_campaign=Promo%C3%A7%C3%A3o%20Ver%C3%A3o.'
      },
    ],
    tips: [
      'Essencial ao montar manualmente campanhas de marketing com parâmetros UTM para rastreamento de cliques.',
      'Sempre codifique APENAS o valor dos parâmetros, não a URL inteira — a estrutura da URL deve permanecer legível.',
      'Caracteres como @, #, $, %, &, +, /, :, ;, =, ?, espaço precisam ser codificados em valores de parâmetros.',
    ],
    relatedToolIds: ['decode-url', 'qr-code', 'formatador-json'],
    slug: 'codificador-encode-url'
  },
  {
    id: 'decode-url',
    categoryId: 'utilitarios',
    title: 'Decode URL - Decodificação de URLs',
    shortDescription: 'Decodifique links e query strings e traduza-os em palavras de linguagem humana legíveis comuns.',
    longIntro: 'A Decodificação de URLs (URL Decoding) converte URLs codificadas de volta ao formato legível, traduzindo notações percentuais (%20, %E7, %E1) para os caracteres originais (espaço, ç, á). Essencial para: analisar parâmetros de URLs recebidas em campanhas de marketing, depurar links quebrados ou mal formatados, inspecionar URLs de rastreamento, extrair parâmetros de query strings complexas, e converter URLs de e-mail marketing para formato legível. Muitas ferramentas de e-mail marketing e plataformas de anúncios codificam automaticamente as URLs — usar o decoder ajuda a verificar se os links estão corretos antes de enviar campanhas.',
    howItWorks: 'Vaze a string mascarada de entrada e a rotina resgata as palavras acentuadas e espaços em milissegundos.',
    faqs: [
      {
        question: 'O que significa %20 em uma URL?',
        answer: '%20 é a representação codificada do caractere de espaço (espaço ASCII 0x20). Em URLs, espaços não são permitidos e devem ser codificados como %20 ou + (em query strings, o sinal de + também representa espaço).'
      },
      {
        question: 'Como saber se uma URL está codificada?',
        answer: 'URLs codificadas contêm sequências como %20, %E1, %E7, %F3 no lugar de caracteres especiais. Se você ver espaços representados como %20 ou acentos como %E1, a URL está codificada e precisa de decodificação para ser legível.'
      },
      {
        question: 'Qual a diferença entre %20 e + em URLs?',
        answer: 'Em URLs, %20 é o espaço codificado padrão. Em query strings (após ?), o sinal + também representa espaço por razões históricas (formulários HTML). %20 funciona em qualquer lugar da URL; + funciona apenas em query strings.'
      },
    ],
    tips: [
      'Use o decoder para verificar links de campanhas de e-mail marketing antes do disparo — garanta que estejam corretos.',
      'Links de afiliados e URLs de rastreamento frequentemente usam codificação dupla — pode ser necessário decodificar duas vezes.',
      'Sempre verifique URLs de campanhas UTM após o decoder para confirmar que os parâmetros de rastreamento estão corretos.',
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

  // GERADOR DE RECIBO
  {
    id: 'recibo',
    categoryId: 'geradores',
    title: 'Gerador de Recibo Online',
    shortDescription: 'Gere recibos de pagamento personalizados e prontos para impressão ou download em PDF.',
    longIntro: 'O Gerador de Recibo Online é um utilitário prático para autônomos, prestadores de serviços, freelancers e pequenos empresários (MEI) emitirem recibos de pagamento de forma simples e rápida. Emita recibos de prestação de serviços, aluguel, venda de mercadorias ou qualquer outro tipo de transação comercial. Preencha os dados do emissor, pagador, valor e descrição do serviço. O sistema formata automaticamente o valor por extenso em reais e gera uma página otimizada para impressão física ou salvamento como PDF, livre de propagandas obstrutivas ou marcas d\'água.',
    howItWorks: 'Insira o valor numérico (o sistema converte automaticamente para o formato por extenso), os nomes e documentos (CPF/CNPJ) do pagador e emissor, a descrição do recebimento, a cidade e a data. Clique no botão de gerar para visualizar o recibo formatado e pronto para impressão ou download em PDF.',
    faqs: [
      { question: 'Como imprimir ou salvar o recibo em PDF?', answer: 'Após preencher os dados do recibo, clique no botão "Imprimir / Salvar como PDF". Na janela de impressão do seu sistema operacional, escolha a impressora física ou a opção "Salvar como PDF" para gerar o arquivo digital.' },
      { question: 'Os dados do recibo são salvos no servidor?', answer: 'Não. Toda a geração do recibo é realizada localmente no seu navegador. A Tool Brasil respeita sua privacidade e não armazena, transmite ou visualiza nenhuma das informações inseridas.' },
      { question: 'Qual a diferença entre recibo e nota fiscal?', answer: 'O recibo é apenas um comprovante de que um pagamento foi realizado, não tendo valor para recolhimento fiscal. A nota fiscal é o documento oficial exigido pela Receita Federal para comprovação de faturamento e incidência de tributação.' }
    ],
    tips: [
      'Assine o recibo impresso e forneça uma cópia para o pagador, mantendo outra via para o seu controle financeiro pessoal.',
      'Sempre confira os documentos (CPF/CNPJ) do emissor e do pagador antes de emitir o recibo.',
      'O sistema converte automaticamente valores decimais para extenso em reais brasileiros, facilitando o preenchimento correto.'
    ],
    relatedToolIds: ['cpf', 'cnpj', 'margem-lucro'],
    slug: 'gerador-de-recibo-online'
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

  // ===== CALCULADORA MOVE BRASIL =====
  {
    id: 'move-brasil',
    categoryId: 'calculadoras',
    title: 'Calculadora Move Brasil 2026 - Carros, Motos e Caminhões (BB, Caixa e BNDES)',
    shortDescription: 'Simule o financiamento MOVE Brasil para carros, motos e caminhões (motoristas de app, taxistas e entregadores) pelo Banco do Brasil, Caixa e BNDES.',
    longIntro: 'O programa MOVE Brasil (Mobilidade Verde e Inovação) é uma iniciativa do Governo Federal que oferece linhas de crédito subsidiadas pelo BNDES para motoristas de aplicativo (Uber, 99), taxistas, motoboys e caminhoneiros adquirirem veículos novos (flex, híbridos, elétricos, motos e caminhões leves/VUC) com juros reduzidos a partir de 1,5% ao ano. Esta calculadora simula o valor das parcelas, economia total e condições praticadas por bancos repassadores credenciados como o Banco do Brasil (BB) e a Caixa Econômica Federal.',
    howItWorks: 'Informe o tipo de veículo (carro, moto ou caminhão), o valor desejado, seu perfil profissional, valor de entrada e prazo de financiamento. A calculadora aplica as taxas subsidiadas vigentes do BNDES/BB/Caixa e exibe o valor das parcelas, economia total comparada ao mercado tradicional e requisitos de aprovação.',
    faqs: [
      { question: 'Quem pode participar do MOVE Brasil?', answer: 'Motoristas de aplicativo com cadastro ativo há pelo menos 12 meses e 100 corridas realizadas, taxistas com registro ativo, entregadores (motoboys) cadastrados há pelo menos 6 meses com 100 entregas ou vínculo CLT, e autônomos do setor de transporte de cargas (VUC/Caminhões leves).' },
      { question: 'Como simular o Move Brasil pelo Banco do Brasil e Caixa Econômica?', answer: 'Tanto o Banco do Brasil (BB) quanto a Caixa atuam como agentes financeiros repassadores oficiais do BNDES no programa MOVE. Você pode simular as parcelas na nossa calculadora selecionando a instituição correspondente e depois apresentar a elegibilidade aprovada via gov.br diretamente na sua agência ou aplicativo bancário.' },
      { question: 'Posso financiar moto pelo Move Brasil?', answer: 'Sim! Entregadores e motoboys cadastrados em plataformas de delivery têm linha especial para aquisição de motocicletas novas de baixa emissão com teto de até R$ 35 mil e prazos de até 48 a 60 meses.' },
      { question: 'Caminhões e VUCs entram no programa?', answer: 'Sim. Caminhoneiros autônomos e empresas de pequeno porte de logística podem financiar veículos utilitários de carga (VUCs) e caminhões leves elegíveis pelo BNDES Finame dentro dos objetivos de descarbonização do programa.' },
      { question: 'Qual o valor máximo financiado e prazos?', answer: 'Carros têm limite de até R$ 150 mil; motos até R$ 35 mil; e caminhões leves até R$ 400 mil. O prazo máximo é de até 72 meses com carência opcional de até 6 meses.' },
      { question: 'Quais as taxas de juros do programa?', answer: 'Para mulheres: taxa fixa a partir de 1,5% a.a. (custo final em torno de 11,5% a.a.). Para os demais perfis: taxa fixa a partir de 2,5% a.a. (custo final aproximado de 12,6% a.a., contra 18% a 25% a.a. do mercado tradicional).' }
    ],
    tips: [
      'Compare as taxas oferecidas por diferentes bancos credenciados (Banco do Brasil, Caixa e cooperativas de crédito) antes de fechar o contrato.',
      'Considere o custo total do veículo incluindo IPVA, seguro obrigatório e custos de manutenção no seu planejamento mensal.',
      'Mulheres motoristas contam com incentivo governamental adicional e taxas de juros reduzidas no programa.'
    ],
    relatedToolIds: ['preco-por-km', 'consumo-combustivel', 'ipva', 'financiamento-veiculos'],
    slug: 'calculadora-move-brasil'
  },
  {
    id: 'emprestimo-consignado',
    categoryId: 'calculadoras',
    title: 'Calculadora de Empréstimo Consignado',
    shortDescription: 'Simule o valor da parcela, taxa de juros e custo total do empréstimo consignado do INSS, servidores e trabalhadores CLT.',
    longIntro: 'O Empréstimo Consignado é uma das modalidades de crédito com as menores taxas de juros do mercado brasileiro, pois o valor das parcelas é descontado diretamente da folha de pagamento ou do benefício do INSS. Esta calculadora permite simular o valor exato das parcelas mensais, o valor total a ser pago e o impacto da margem consignável (35% a 45% do salário líquido). É ideal para aposentados, pensionistas do INSS, servidores públicos e trabalhadores com carteira assinada (CLT) que desejam planejar a tomada de crédito com segurança e transparência.',
    howItWorks: 'Informe o valor do empréstimo desejado, a taxa de juros mensal cobrada pela instituição financeira e o prazo em meses (de 12 a 84 meses). A ferramenta utiliza a Tabela Price (sistema de amortização com parcelas fixas) para calcular o valor da prestação mensal, a taxa efetiva anual, o montante total de juros pagos e o Custo Efetivo Total (CET) estimado.',
    faqs: [
      { question: 'Qual é a margem consignável atual?', answer: 'Para aposentados e pensionistas do INSS, a margem consignável é de até 35% da renda líquida para o empréstimo convencional, mais 5% para cartão de crédito consignado e 5% para cartão benefício, totalizando 45%.' },
      { question: 'Qual é o prazo máximo de pagamento no INSS?', answer: 'O prazo máximo estabelecido pelo Governo Federal para empréstimos consignados a beneficiários do INSS é de 84 parcelas (7 anos).' },
      { question: 'Qual a diferença entre taxa de juros e CET?', answer: 'A taxa de juros é apenas o custo do dinheiro prestado. O Custo Efetivo Total (CET) inclui a taxa de juros mais tarifas administrativas, seguro e impostos (IOF). Sempre compare as propostas pelo CET.' }
    ],
    tips: [
      'Nunca comprometa mais de 30% do seu salário líquido com parcelas para manter sua estabilidade financeira.',
      'Pesquise as taxas de juros teto fixadas pelo Conselho Nacional de Previdência Social (CNPS) antes de contratar.',
      'Você pode solicitar a portabilidade do seu consignado para outro banco caso encontre taxas mais baixas.'
    ],
    relatedToolIds: ['inss', 'salario-liquido', 'financiamento', 'fgts'],
    slug: 'calculadora-de-emprestimo-consignado'
  },
  {
    id: 'financiamento-veiculos',
    categoryId: 'calculadoras',
    title: 'Simulador de Financiamento de Veículos e CDC 2026: Carros e Motos',
    shortDescription: 'Simule o financiamento CDC de carros e motos em 2026. Calcule o valor das parcelas fixas, entrada recomendada, taxa de juros e IOF.',
    longIntro: 'Comprar um carro ou moto financiado pela modalidade CDC (Crédito Direto ao Consumidor) exige planejamento detalhado para que o custo das prestações fixas não comprometa o orçamento familiar. O Simulador de Financiamento de Veículos e CDC 2026 da Tool Brasil calcula o valor exato das prestações mensais (Tabela Price com IOF), o total financiado, o montante de juros acumulado e o Custo Efetivo Total (CET). Com esta ferramenta, você pode testar cenários aumentando o valor da entrada ou alterando o prazo de parcelamento (12x a 60x), além de entender seu direito à redução de juros por amortização antecipada.',
    howItWorks: 'Insira o valor total do veículo (carro, moto ou caminhonete novo ou usado), o valor da entrada em dinheiro, a taxa de juros mensal praticada pelo banco e o prazo de parcelamento em meses. A calculadora subtrai a entrada, calcula o IOF estimado e aplica a Tabela Price para fornecer o valor exato da parcela mensal, custo total e amortização CDC.',
    faqs: [
      { question: 'O que é o financiamento CDC (Crédito Direto ao Consumidor)?', answer: 'O CDC é a modalidade de financiamento veicular mais comum no Brasil. O banco empresta o dinheiro diretamente ao comprador para a aquisição do bem, que fica alienado fiduciariamente à instituição financeira até a quitação da última parcela.' },
      { question: 'Qual a diferença entre CDC e Leasing?', answer: 'No CDC o veículo sai imediatamente registrado no nome do comprador (com gravame de alienação fiduciária). No Leasing (arrendamento mercantil), o veículo fica no nome do banco arrendador até o final do contrato, quando o cliente pode exercer a opção de compra.' },
      { question: 'Qual o valor de entrada ideal para financiar um veículo em 2026?', answer: 'Recomenda-se dar uma entrada de pelo menos 20% a 30% do valor do veículo. Quanto maior a entrada, menores serão as taxas de juros oferecidas pelas financeiras e menor o saldo devedor.' },
      { question: 'O que é o IOF no financiamento de carros?', answer: 'O Imposto sobre Operações Financeiras (IOF) é um tributo federal obrigatório cobrado sobre o valor financiado (0,38% alíquota fixa + 0,0082% ao dia para pessoas físicas).' },
      { question: 'Posso amortizar antecipadamente as parcelas no CDC com desconto?', answer: 'Sim! De acordo com o Código de Defesa do Consumidor e normas do Banco Central, você tem direito garantido por lei à redução proporcional dos juros futuros ao quitar parcelas antecipadamente (amortização de trás para frente).' }
    ],
    tips: [
      'Além das parcelas do financiamento, inclua no orçamento anual os custos de IPVA, licenciamento, seguro auto e combustível.',
      'Considere financiar em prazos menores (ex: 36x ou 48x em vez de 60x) para pagar significativamente menos juros ao final do contrato.',
      'Exija da concessionária ou banco a planilha com o Custo Efetivo Total (CET) detalhado antes de assinar o contrato CDC.'
    ],
    relatedToolIds: ['move-brasil', 'financiamento', 'preco-por-km', 'ipva', 'multa-transito'],
    slug: 'simulador-de-financiamento-de-veiculos'
  },
  {
    id: 'gerador-assinatura-email',
    categoryId: 'geradores',
    title: 'Gerador de Assinatura de E-mail HTML',
    shortDescription: 'Crie assinaturas de e-mail profissionais e personalizadas com foto, cargo, redes sociais e HTML pronto para copiar.',
    longIntro: 'Uma assinatura de e-mail profissional transmite credibilidade, fortalece a identidade visual da sua marca e facilita o contato de clientes e parceiros. O Gerador de Assinatura de E-mail HTML da Tool Brasil permite criar assinaturas corporativas elegantes em segundos, sem necessidade de conhecimentos em programação. Você preenche seus dados (nome, cargo, empresa, telefone, e-mail, foto e redes sociais) e a ferramenta gera uma pré-visualização em tempo real e o código HTML otimizado para Gmail, Outlook, Apple Mail e Thunderbird.',
    howItWorks: 'Preencha os campos com suas informações profissionais e links para redes sociais (LinkedIn, Instagram, WhatsApp, Website). Escolha a cor principal da sua marca e adicione a URL da sua foto ou logotipo. A ferramenta compila um HTML inline responsivo compatível com todos os leitores de e-mail. Basta clicar em "Copiar HTML" ou "Copiar Assinatura Visual" e colar nas configurações do seu leitor de e-mail.',
    faqs: [
      { question: 'A assinatura funciona no Gmail e no Outlook?', answer: 'Sim! Nosso código gera tabelas em HTML com estilos inline, garantindo compatibilidade perfeita com Gmail, Outlook Desktop, Outlook Web, Apple Mail, Yahoo e Thunderbird.' },
      { question: 'Como colocar minha foto na assinatura?', answer: 'Você pode colar o link público da sua foto de perfil do LinkedIn, do seu site ou hospedar a imagem em um serviço gratuito como o Imgur.' },
      { question: 'Minhas informações ficam salvas no servidor?', answer: 'Não. Todo o processo de geração da assinatura é feito 100% no seu navegador (client-side), respeitando rigorosamente a LGPD.' }
    ],
    tips: [
      'Mantenha a assinatura enxuta e objetiva: nome, cargo, empresa, telefone e uma ou duas redes sociais relevantes.',
      'Utilize uma foto profissional com fundo neutro e boa iluminação.',
      'Sempre envie um e-mail de teste para você mesmo após configurar a assinatura para conferir o alinhamento visual.'
    ],
    relatedToolIds: ['gerador-whatsapp', 'qr-code', 'lorem-ipsum'],
    slug: 'gerador-de-assinatura-de-email'
  },
  {
    id: 'texto-para-voz',
    categoryId: 'utilitarios',
    title: 'Conversor de Texto em Voz (Text to Speech)',
    shortDescription: 'Converta qualquer texto em áudio e voz falada em português usando sintetizador nativo direto no seu navegador.',
    longIntro: 'O Conversor de Texto em Voz (Text-to-Speech) é uma ferramenta versátil de acessibilidade e produtividade que lê qualquer texto escrito em voz alta. É perfeito para estudantes que desejam ouvir resumos e artigos enquanto realizam outras tarefas, profissionais que precisam revisar textos compridos em busca de erros de pontuação, criadores de conteúdo que gravam locuções, e pessoas com deficiência visual ou dislexia. Funciona diretamente no navegador sem necessidade de baixar programas ou extensões.',
    howItWorks: 'Cole ou digite o texto desejado na caixa de entrada. Escolha a voz falada em Português do Brasil disponível no seu sistema operacional, ajuste a velocidade de leitura (de 0.5x a 2x) e o tom da voz (pitch). Clique em "Ouvir Texto" para iniciar a narração. Você pode pausar, retomar ou parar a leitura a qualquer momento.',
    faqs: [
      { question: 'O serviço de narração de voz é gratuito?', answer: 'Sim! A ferramenta utiliza a API nativa de síntese de voz (Web Speech API) integrada no seu próprio navegador e sistema operacional, sem custo ou limite de caracteres.' },
      { question: 'Posso mudar o idioma ou sotaque da voz?', answer: 'Sim! Se o seu sistema operacional tiver vozes instaladas em outros idiomas (como Inglês ou Espanhol), elas aparecerão no menu de seleção de vozes.' },
      { question: 'Funciona no celular?', answer: 'Sim! Funciona perfeitamente em smartphones Android (usando o Google Text-to-Speech) e iPhones (usando a Siri Voice nativa do iOS).' }
    ],
    tips: [
      'Use a velocidade de 1.2x a 1.5x para fazer leituras dinâmicas de artigos longos ou materiais de estudo.',
      'Ouvir seu próprio texto em voz alta é uma excelente técnica de revisão gramatical e de fluência textual.',
      'Para pausas mais longas na leitura, adicione vírgulas e pontos finais ao longo do texto.'
    ],
    relatedToolIds: ['contador-caracteres', 'separador-silabas', 'maiusculas-minusculas'],
    slug: 'conversor-de-texto-em-voz'
  },
  {
    id: 'teste-digitacao',
    categoryId: 'utilitarios',
    title: 'Teste de Velocidade de Digitação (WPM)',
    shortDescription: 'Meça a sua velocidade de digitação em palavras por minuto (PPM/WPM), precisão e contagem de erros em tempo real.',
    longIntro: 'Digitar com rapidez e precisão é uma habilidade indispensável no mercado de trabalho moderno, aumentando a produtividade de programadores, redatores, assistentes administrativos e estudantes. O Teste de Velocidade de Digitação da Tool Brasil avalia a sua velocidade em Palavras Por Minuto (WPM / PPM), a quantidade de Caracteres Por Minuto (CPM) e o seu percentual de precisão técnica. Desafie-se diariamente para aprimorar sua digitação sem olhar para o teclado!',
    howItWorks: 'Selecione a duração do teste (30 segundos ou 60 segundos) e clique em "Iniciar Teste". Digite as palavras que aparecem na tela exatamente como apresentadas em português. O cronômetro começará a contar na primeira tecla pressionada. Ao final do tempo, a ferramenta apresenta um relatório completo com seu WPM líquido, precisão percentual e total de erros cometidos.',
    faqs: [
      { question: 'O que significa WPM e qual é uma boa velocidade?', answer: 'WPM significa "Words Per Minute" (Palavras Por Minuto). A média de uma pessoa comum é entre 35 e 45 WPM. Digitadores profissionais e programadores experientes costumam atingir entre 65 e 90+ WPM.' },
      { question: 'Como o cálculo de WPM é realizado?', answer: 'No padrão internacional de testes de digitação, 1 palavra é contada a cada 5 caracteres digitados corretamente. O WPM líquido subtrai os erros cometidos do tempo total decorrido.' },
      { question: 'Como posso aumentar minha velocidade de digitação?', answer: 'Pratique o método de digitação ao toque (touch typing), posicionando os dedos indicadores nas teclas guias F e J, mantendo a postura correta das costas e sem olhar para as teclas.' }
    ],
    tips: [
      'Priorize a PRECISÃO antes da velocidade: cometer menos erros faz você digitar muito mais rápido do que tentar correr e ter que apagar.',
      'Mantenha os pulsos retos e apoiados levemente na mesa para evitar lesões por esforço repetitivo (LER/DORT).',
      'Faça testes diários de 5 minutos para desenvolver a memória muscular dos seus dedos no teclado.'
    ],
    relatedToolIds: ['contador-caracteres', 'cronometro', 'removedor-espacos'],
    slug: 'teste-de-velocidade-de-digitacao'
  },
  {
    id: 'alcool-ou-gasolina',
    categoryId: 'calculadoras',
    title: 'Calculadora de Álcool ou Gasolina (Simulador Flex)',
    shortDescription: 'Descubra se vale mais a pena abastecer com etanol ou gasolina pela regra dos 70% ou pelo consumo real (km/l) do seu carro.',
    longIntro: 'Com a oscilação constante nos preços dos combustíveis nos postos brasileiros, proprietários de veículos Flex precisam tomar decisões rápidas na hora de abastecer. A Calculadora de Álcool ou Gasolina da Tool Brasil analisa o custo por litro, compara a relação percentual entre os combustíveis e permite simular com o consumo real em km/l do seu automóvel para calcular a economia exata no tanque e o custo por quilômetro rodado.',
    howItWorks: 'Informe o preço do litro do Etanol (álcool) e da Gasolina. Por padrão, a calculadora aplica a regra clássica de paridade energética (70%), onde o etanol é vantajoso se seu preço for inferior a 70% do valor da gasolina. Você também pode ativar o modo de Consumo Real para informar os km/l do seu carro no etanol e na gasolina, obtendo o custo exato em R$/km e a economia real por tanque cheio.',
    faqs: [
      { question: 'Por que a regra tradicional usa o percentual de 70%?', answer: 'O etanol hidratado possui cerca de 30% a menos de poder calorífico (energia por litro) que a gasolina comum tipo C. Portanto, quando o preço do álcool for até 70% do preço da gasolina, o custo energético por quilômetro rodado tende a se equiparar.' },
      { question: 'A regra dos 70% ainda vale para motores modernos e turbo flex?', answer: 'Motores flex modernos com injeção direta e turbocompressor possuem taxa de compressão e gerenciamento eletrônico otimizados que podem elevar a eficiência do etanol para 73% a 75%. Por isso, a simulação por consumo real em km/l é a mais precisa.' },
      { question: 'Posso misturar álcool e gasolina no tanque?', answer: 'Sim. Em carros com motor bicombustível (Flex), o módulo de injeção eletrônica reconhece qualquer proporção de mistura de combustíveis através da sonda lambda no escapamento.' },
      { question: 'O etanol limpa os bicos injetores do motor?', answer: 'O etanol possui propriedades solventes que auxiliam a evitar a formação de carbonização na câmara de combustão, mas deve-se sempre utilizar combustível de postos de confiança e certificados pela ANP.' }
    ],
    tips: [
      'Anote a média de consumo real do seu painel (km/l) com tanque cheio de etanol e depois com gasolina na mesma rota para ter a precisão exata.',
      'Em dias frios abaixo de 15°C, manter um percentual de gasolina no tanque facilita a partida a frio em carros que não possuem pré-aquecimento de bicos.',
      'Considere também o tempo gasto e paradas extras no posto: como o etanol tem menor autonomia, você visitará o posto com maior frequência.'
    ],
    relatedToolIds: ['consumo-combustivel', 'preco-por-km', 'regra-de-tre'],
    slug: 'calculadora-de-alcool-ou-gasolina'
  },
  {
    id: 'dsr',
    categoryId: 'calculadoras',
    title: 'Calculadora de DSR (Descanso Semanal Remunerado)',
    shortDescription: 'Calcule o reflexo do DSR sobre horas extras, adicional noturno e comissões com base na Lei nº 605/49 e Súmula 172 do TST.',
    longIntro: 'O Descanso Semanal Remunerado (DSR) é um direito fundamental garantido pela Constituição Federal e pela Lei Federal nº 605/1949 a todos os trabalhadores sob regime CLT. Sempre que o funcionário realiza horas extras, trabalha em horário noturno ou recebe comissões variáveis, esses adicionais geram um reflexo financeiro obrigatório sobre o repouso remunerado semanal (domingos e feriados). A Calculadora de DSR da Tool Brasil automatiza esse cálculo trabalhista de forma rápida e transparente.',
    howItWorks: 'Informe o total de horas extras em reais (ou informe o salário base e horas trabalhadas), o número de dias úteis do mês (segunda a sábado) e a quantidade de domingos e feriados no período apurado. A fórmula oficial aplicada é: DSR = (Valor Total das Horas Extras / Dias Úteis) x Domingos e Feriados.',
    faqs: [
      { question: 'O que é o DSR sobre horas extras?', answer: 'O DSR (Descanso Semanal Remunerado) sobre horas extras é o pagamento proporcional aos dias de repouso remunerado referente às horas suplementares trabalhadas no decorrer do mês, conforme a Súmula nº 172 do Tribunal Superior do Trabalho (TST).' },
      { question: 'O sábado conta como dia útil no cálculo do DSR?', answer: 'Sim. Pela legislação trabalhista padrão e jurisprudência do TST, o sábado é considerado dia útil não trabalhado para fins de cálculo de DSR, a menos que convenção coletiva determine expressamente o sábado como dia de repouso.' },
      { question: 'O DSR reflete em outras verbas rescisórias e férias?', answer: 'Sim. O DSR integrará a base de cálculo para a média de 13º salário, férias remuneradas acrescidas de 1/3 constitucional e depósitos do FGTS.' },
      { question: 'Qual a recente decisão do TST sobre o DSR (Tema Repetitivo nº 9)?', answer: 'O TST decidiu que a majoração do DSR decorrente de horas extras habituais passa a refletir no cálculo de férias, 13º salário, aviso prévio e FGTS para horas extras prestadas a partir de 20 de março de 2023, sem configurar bis in idem.' }
    ],
    tips: [
      'Lembre-se de somar feriados nacionais, estaduais e municipais que caiam entre segunda e sábado na contagem de dias de descanso.',
      'Se o trabalhador recebe comissões variáveis, o cálculo do DSR sobre as comissões segue a mesma proporção de dias úteis e repousos.',
      'Sempre confira a convenção coletiva da sua categoria para verificar se há regras específicas de dias úteis e sábados.'
    ],
    relatedToolIds: ['hora-extra', 'horas-trabalhadas', 'salario-liquido', 'rescisao'],
    slug: 'calculadora-de-dsr'
  },
  {
    id: 'adicional-noturno',
    categoryId: 'calculadoras',
    title: 'Calculadora de Adicional Noturno CLT',
    shortDescription: 'Simule o adicional noturno urbano (20%) e rural (25%), a redução da hora ficta de 52min30s (Art. 73 CLT) e o reflexo salarial.',
    longIntro: 'Trabalhar em período noturno exige maior desgaste biológico e adaptação do organismo. Por essa razão, a Consolidação das Leis do Trabalho (CLT) estipula compensações financeiras e temporais específicas através do Adicional Noturno. A Calculadora de Adicional Noturno da Tool Brasil aplica a redução da hora noturna ficta (52 minutos e 30 segundos para trabalhadores urbanos) e calcula com exatidão o acréscimo de 20% (urbano) ou 25% (rural) sobre a hora normal de trabalho.',
    howItWorks: 'Preencha o salário base mensal, a jornada mensal de trabalho (normalmente 220 horas para regime de 44h semanais) e o número de horas de relógio trabalhadas no período noturno (das 22h às 05h). A calculadora converte as horas de relógio pelo fator multiplicador da hora ficta (60 / 52,5 = 1,142857) e aplica o adicional de 20% ou 25%, exibindo o valor unitário da hora noturna e o total do benefício.',
    faqs: [
      { question: 'Qual o horário considerado noturno pela CLT?', answer: 'Para trabalhadores urbanos, o trabalho noturno é aquele realizado entre as 22h de um dia e as 5h do dia seguinte. Na atividade rural de lavoura/agricultura, é das 21h às 5h; na pecuária, é das 20h às 4h.' },
      { question: 'O que é a hora noturna reduzida (ficta)?', answer: 'No trabalho urbano, a hora noturna é computada como tendo 52 minutos e 30 segundos. Isso significa que 7 horas de relógio (das 22h às 5h) equivalem juridicamente a 8 horas normais de trabalho (fator de 1,142857).' },
      { question: 'O que acontece se a jornada iniciada à noite se prolongar após as 5h da manhã?', answer: 'Pela Súmula 60, inciso II, do TST, cumprida integralmente a jornada no período noturno e prorrogada esta, devido é também o adicional quanto às horas prorrogadas.' },
      { question: 'O adicional noturno integra a base de cálculo do FGTS e INSS?', answer: 'Sim. O adicional noturno possui natureza estritamente salarial, incidindo FGTS, INSS, IRRF e refletindo no 13º salário, férias com 1/3 e aviso prévio indenizado.' }
    ],
    tips: [
      'Para saber o valor da sua hora normal, divida o salário bruto pela carga horária mensal (ex: R$ 3.000 / 220 = R$ 13,63/hora).',
      'Não se esqueça que sobre o adicional noturno também incide o DSR (Descanso Semanal Remunerado).',
      'Verifique se a convenção coletiva do seu sindicato estipula percentual superior aos 20% mínimos da lei (algumas categorias pagam 25%, 30% ou mais).'
    ],
    relatedToolIds: ['dsr', 'hora-extra', 'salario-liquido', 'horas-trabalhadas'],
    slug: 'calculadora-de-adicional-noturno'
  },
  {
    id: 'salario-proporcional',
    categoryId: 'calculadoras',
    title: 'Calculadora de Salário Proporcional',
    shortDescription: 'Calcule o valor exato do salário por dias trabalhados na admissão, demissão ou afastamentos pelo mês comercial ou dias corridos.',
    longIntro: 'Quando um profissional é admitido na empresa no meio do mês, pede demissão antes do fechamento do período ou tira uma licença/afastamento, a remuneração devida deve ser apurada proporcionalmente aos dias efetivamente trabalhados. A Calculadora de Salário Proporcional da Tool Brasil permite efetuar o cálculo tanto pelo critério do mês comercial de 30 dias (padrão CLT) quanto pelo critério de dias corridos do mês civil (28, 29, 30 ou 31 dias).',
    howItWorks: 'Informe o salário bruto contratual, o mês e ano de referência e o número de dias trabalhados no período. A ferramenta divide o salário pelo número de dias (30 dias no padrão comercial ou dias reais do mês selecionado) e multiplica pelos dias trabalhados, apresentando também a estimativa de descontos previdenciários (INSS) e o valor líquido a receber.',
    faqs: [
      { question: 'Como é calculada a fração de salário proporcional no mês de 31 dias?', answer: 'Conforme o Artigo 64 da CLT, o salário dos mensalistas é baseado em 30 dias para efeitos legais. No entanto, para fins de admissão e demissão em meses com 31 dias ou em fevereiro (28/29 dias), o Ministério do Trabalho e a jurisprudência recomendam utilizar o número real de dias do mês civil para que o empregado não seja prejudicado.' },
      { question: 'Quem é admitido no dia 1º de um mês com 31 dias recebe por 30 ou 31 dias?', answer: 'Se o empregado trabalhou o mês integral, o mensalista recebe o salário integral fechado pactuado no contrato de trabalho, independentemente de o mês ter 28, 30 ou 31 dias.' },
      { question: 'O DSR está incluído no salário proporcional do mensalista?', answer: 'Sim. No salário do empregado mensalista, os descansos semanais remunerados (domingos e feriados) já estão embutidos na remuneração mensal e são pagos proporcionalmente aos dias de vínculo.' }
    ],
    tips: [
      'Na rescisão de contrato de trabalho, o aviso prévio proporcional indenizado adiciona 3 dias por ano completo de serviço prestado.',
      'Sempre confira os comprovantes de ponto e data exata de início anotada na Carteira de Trabalho Digital.',
      'Para apurar o holerite completo com horas extras e outros adicionais, use nossa Calculadora de Salário Líquido completa.'
    ],
    relatedToolIds: ['salario-liquido', 'rescisao', 'inss', 'decimo-terceiro'],
    slug: 'calculadora-de-salario-proporcional'
  },
  {
    id: 'ovulacao-periodo-fertil',
    categoryId: 'calculadoras',
    title: 'Calculadora de Ovulação e Período Fértil',
    shortDescription: 'Descubra a data provável da ovulação, os dias de maior fertilidade para engravidar e a data ideal para realizar o teste de gravidez.',
    longIntro: 'O planejamento reprodutivo — seja para quem sonha em engravidar ou para quem busca conhecer melhor o funcionamento do próprio corpo — depende do entendimento das fases do ciclo menstrual feminino. A Calculadora de Ovulação e Período Fértil da Tool Brasil utiliza a metodologia do cálculo ginecológico clássico (Ogino-Knaus / FEBRASGO) para prever o dia em que o óvulo é liberado, a janela fértil de alta fecundidade e a data provável do próximo ciclo.',
    howItWorks: 'Insira a data do primeiro dia da sua última menstruação (DUM) e a duração média do seu ciclo menstrual (geralmente entre 26 e 32 dias, com média de 28 dias). Em um ciclo regular, a ovulação ocorre aproximadamente 14 dias antes da próxima menstruação. A janela fértil abrange os 5 dias que antecedem a ovulação, o próprio dia fértil e o dia seguinte.',
    faqs: [
      { question: 'Quanto tempo os espermatozoides e o óvulo sobrevivem no corpo feminino?', answer: 'Os espermatozoides podem sobreviver no muco cervical fértil e trato reprodutivo feminino por até 5 dias (120 horas). O óvulo humano, após ser liberado pelo ovário, sobrevive por apenas 12 a 24 horas. Por isso a janela fértil começa dias antes da ovulação.' },
      { question: 'Quais são os principais sintomas do período fértil?', answer: 'Os sinais corporais mais comuns incluem presença de muco cervical com textura elástica e transparente (semelhante a clara de ovo), aumento sutil da temperatura corporal basal (cerca de 0,3°C a 0,5°C), aumento da libido e leve pontada abdominal no lado do ovário que ovulou.' },
      { question: 'A calculadora de ovulação serve como método anticoncepcional (tabelinha)?', answer: 'Não. Variações hormonais, estresse, viagens e alterações de sono podem antecipar ou atrasar a ovulação. A tabelinha isolada possui alta taxa de falha (cerca de 24% ao ano) e não substitui métodos contraceptivos médicos como preservativos, DIU ou pílula.' },
      { question: 'Quando devo fazer o teste de gravidez (Beta hCG de farmácia)?', answer: 'O momento ideal para realizar o teste de gravidez de urina com alta precisão é a partir do primeiro dia de atraso menstrual da data esperada para a próxima menstruação.' }
    ],
    tips: [
      'Mantenha um registro de pelo menos 3 a 6 meses do seu ciclo menstrual para identificar se ele é regular ou possui variações.',
      'Acompanhar o muco cervical em conjunto com testes rápidos de ovulação de farmácia (tiras de LH) aumenta a precisão para casais tentantes.',
      'Consulte sempre seu médico ginecologista e obstetra para exames pré-concepcionais e suplementação de ácido fólico antes de engravidar.'
    ],
    relatedToolIds: ['gestacao', 'idade', 'dias-entre-datas'],
    slug: 'calculadora-de-ovulacao-e-periodo-fertil'
  },
  {
    id: 'calculadora-tinta',
    categoryId: 'calculadoras',
    title: 'Calculadora de Tinta para Paredes e Teto',
    shortDescription: 'Calcule a quantidade exata de litros, galões e latas de tinta para sua pintura residencial, descontando portas e janelas.',
    longIntro: 'Pintar uma sala, quarto ou fachada exige planejamento para evitar comprar tinta em excesso (desperdiçando dinheiro) ou em falta (interrompendo a pintura e correndo o risco de diferença de lote de cor). A Calculadora de Tinta e Pintura da Tool Brasil calcula a metragem quadrada total das superfícies, desconta vãos de portas e janelas e converte os litros necessários para os tamanhos padrão de embalagens vendidos no Brasil.',
    howItWorks: 'Informe a largura, o comprimento e o pé-direito (altura) do cômodo, selecione se irá pintar o teto e indique a quantidade de portas e janelas existentes. Escolha o número de demãos (geralmente 2 ou 3 para cobertura uniforme) e o rendimento da tinta (padrão de 10 m²/litro por demão para tintas acrílicas/látex standard). A calculadora entrega a metragem líquida e a quantidade sugerida de latas de 18L, galões de 3,6L e quartos de 900ml.',
    faqs: [
      { question: 'Quantas demãos de tinta são necessárias para uma boa cobertura?', answer: 'Geralmente são recomendadas 2 demãos para repintura de superfícies com cores semelhantes e 3 demãos para paredes novas ou quando há mudança de cor escura para clara.' },
      { question: 'Qual a diferença entre lata (18L), galão (3,6L) e quarto (900ml)?', answer: 'No padrão brasileiro da ABNT para embalagens de tintas imobiliárias: Lata = 18 Litros (grandes áreas); Galão = 3,6 Litros (cômodos médios/pequenos); Quarto = 0,9 Litros ou 900ml (retoques e acabamentos).' },
      { question: 'É necessário aplicar selador ou fundo preparador antes da tinta?', answer: 'Sim. Em paredes novas de reboco ou gesso/drywall, o selador ou fundo preparador uniformiza a absorção da parede, evitando manchas e reduzindo o consumo de tinta em até 30% a 40%.' }
    ],
    tips: [
      'Compre sempre tintas do mesmo lote de fabricação para evitar sutis variações de tonalidade entre as paredes.',
      'Adicione uma margem de segurança de 10% sobre o volume total calculado para cobrir perdas no rolo, trincha e eventuais retoques futuros.',
      'Prepare bem a superfície: limpe a poeira, lixe imperfeições e corrija buracos com massa corrida (áreas internas) ou massa acrílica (áreas externas/úmidas).'
    ],
    relatedToolIds: ['calculadora-piso', 'regra-de-tre', 'metros-para-pes'],
    slug: 'calculadora-de-tinta-e-pintura'
  },
  {
    id: 'calculadora-piso',
    categoryId: 'calculadoras',
    title: 'Calculadora de Piso, Revestimento e Porcelanato',
    shortDescription: 'Calcule a metragem em m² de pisos e azulejos, a margem técnica de perdas e recortes e a quantidade exata de caixas a comprar.',
    longIntro: 'Durante reformas e obras de construção civil, o assentamento de pisos cerâmicos, porcelanatos, azulejos e laminados exige o cálculo minucioso da área útil e uma margem técnica de segurança para recortes, rodapés e quebras. A Calculadora de Piso e Revestimento da Tool Brasil informa a área real do ambiente, a área com tolerância de perda e converte o resultado em caixas fechadas segundo a especificação do fabricante.',
    howItWorks: 'Insira a largura e o comprimento do ambiente (em metros) ou a área total direta em m². Selecione o tipo de assentamento (10% de perda para assentamento reto tradicional, 15% para assentamento diagonal ou peças grandes/retificadas, e 20% para paginações especiais/espinha de peixe). Insira a metragem por caixa informada na embalagem (ex: 1,44 m² ou 2,16 m²) para saber o total exato de caixas.',
    faqs: [
      { question: 'Por que é obrigatório comprar uma porcentagem a mais de piso?', answer: 'Durante a instalação ocorrem cortes nas extremidades das paredes, em torno de ralos, portas e quinas, além do risco de quebra no transporte e assentamento. Sem essa sobra, você corre o risco de faltar piso e não encontrar o mesmo lote/tonalidade na loja.' },
      { question: 'Qual a margem recomendada para porcelanato de grande formato?', answer: 'Para porcelanatos grandes (ex: 80x80cm, 90x90cm ou 120x120cm) ou assentamentos na diagonal, recomenda-se uma margem de perda entre 12% e 15%, devido ao maior desperdício em cada corte.' },
      { question: 'Como calcular o rodapé com o mesmo piso?', answer: 'Meça o perímetro do ambiente (soma de todas as paredes) menos a largura das portas. Se o rodapé for de 10cm, cada metro linear de piso cortado rende até 5 a 6 tiras de rodapé.' }
    ],
    tips: [
      'Guarde sempre 1 caixa fechada de sobra do mesmo piso em casa após a obra para futuras reformas ou substituição em caso de manutenção hidráulica.',
      'Verifique se a argamassa e o rejunte escolhidos são adequados ao tipo de piso (AC-I para cerâmicas internas, AC-II para áreas externas/piscinas e AC-III para grandes porcelanatos).',
      'Confira o nível do contrapiso antes de iniciar o assentamento para economizar no consumo de argamassa colante.'
    ],
    relatedToolIds: ['calculadora-tinta', 'regra-de-tre', 'metros-para-pes'],
    slug: 'calculadora-de-piso-e-revestimento'
  },
  {
    id: 'agua-diaria',
    categoryId: 'calculadoras',
    title: 'Calculadora de Consumo de Água Diária por Peso',
    shortDescription: 'Descubra a quantidade ideal de água em litros e copos que você deve beber por dia segundo seu peso, atividade e clima.',
    longIntro: 'Manter o corpo devidamente hidratado é crucial para o bom funcionamento dos rins, regulação da temperatura corporal, digestão, circulação sanguínea e disposição diária. A regra popular genérica de "tomar 2 litros por dia" não leva em conta o peso corporal, taxa metabólica e o nível de esforço físico de cada indivíduo. A Calculadora de Água Diária da Tool Brasil aplica a recomendação médica da Organização Mundial da Saúde (OMS) adaptada ao seu perfil.',
    howItWorks: 'Informe seu peso atual em quilogramas (kg), selecione a intensidade das suas atividades físicas diárias e o clima predominante da sua região. A fórmula base da OMS multiplica o peso corporal por 35 ml/kg para adultos saudáveis, ajustando para 40 a 45 ml/kg em praticantes de exercícios ou climas quentes. O resultado detalha a meta diária em litros, mililitros e o equivalente em copos de 200ml, 250ml e garrafas de 500ml.',
    faqs: [
      { question: 'Por que o cálculo de água é proporcional ao peso?', answer: 'Cerca de 60% da massa corporal de um adulto é composta por água. Uma pessoa de 50 kg possui demanda metabólica e volume de circulação muito diferente de uma pessoa de 90 kg; portanto, a ingestão hídrica deve ser individualizada.' },
      { question: 'Café, sucos e chás contam na meta diária de água?', answer: 'Líquidos saudáveis como água de coco e chás claros contribuem para a hidratação, mas a água pura filtrada deve corresponder à maior parte do consumo diário. Bebidas açucaradas ou com cafeína em excesso possuem efeito diurético.' },
      { question: 'Como saber se estou bem hidratado pela cor da urina?', answer: 'A urina de uma pessoa bem hidratada deve ser clara, límpida e em tom amarelo-palha suave. Se estiver amarelo-escuro ou alaranjada, seu corpo está sinalizando necessidade urgente de água.' }
    ],
    tips: [
      'Tenha uma garrafa reutilizável de 500ml ou 750ml sempre na sua mesa de trabalho para acompanhar o progresso das metas durante o dia.',
      'Beba um copo de água (250ml) logo ao acordar para reidratar o organismo após as horas de sono e ativar o sistema digestivo.',
      'Não espere sentir sede para beber água: a sede já é um sinal precoce de que seu corpo iniciou o processo de desidratação celular.'
    ],
    relatedToolIds: ['imc', 'tmb', 'calorias-diarias'],
    slug: 'calculadora-de-consumo-de-agua-diaria'
  },
  {
    id: 'ponto-banco-horas',
    categoryId: 'calculadoras',
    title: 'Calculadora de Ponto e Banco de Horas Diário',
    shortDescription: 'Controle os horários de entrada, almoço e saída, calcule o total de horas trabalhadas e apure o saldo diário de horas extras ou negativas.',
    longIntro: 'O controle rigoroso do registro de ponto é indispensável tanto para trabalhadores acompanharem seus holerites quanto para empresas cumprirem a legislação trabalhista da CLT. A Calculadora de Ponto e Banco de Horas da Tool Brasil permite lançar os 4 horários diários de batida (entrada da manhã, saída para almoço, retorno do almoço e saída da tarde), calculando o total trabalhado, o tempo de intervalo e o saldo (positivo ou negativo) frente à jornada contratada.',
    howItWorks: 'Preencha as 4 marcações de horário no formato HH:MM (ex: Entrada 08:00, Almoço 12:00, Retorno 13:00, Saída 17:48) e selecione a sua jornada de trabalho diária contratada (ex: 8 horas para regimes de 40h semanais ou 8h48min para regimes de 44h de segunda a sexta). A ferramenta desconta o intervalo, calcula o total de horas líquidas e exibe o saldo de minutos excedentes (horas extras) ou faltantes.',
    faqs: [
      { question: 'Qual a tolerância legal de minutos na batida de ponto?', answer: 'De acordo com o Artigo 58, § 1º da CLT, não serão descontadas nem computadas como jornada extraordinária as variações de horário no registro de ponto não excedentes de 5 minutos, observado o limite máximo diário de 10 minutos.' },
      { question: 'Qual o tempo mínimo obrigatório para o intervalo intrajornada (almoço)?', answer: 'Para qualquer trabalho contínuo cuja duração exceda de 6 horas, é obrigatória a concessão de um intervalo para repouso ou alimentação de, no mínimo, 1 hora e, no máximo, 2 horas (Art. 71 CLT), salvo acordo coletivo.' },
      { question: 'Como funciona o regime de Banco de Horas?', answer: 'No regime de banco de horas (Art. 59 CLT), as horas extras trabalhadas em um dia são acumuladas em crédito para serem compensadas com folgas ou saídas antecipadas em outro dia, no prazo máximo de 6 meses (acordo individual) ou 1 ano (acordo coletivo).' }
    ],
    tips: [
      'Em jornadas de 44 horas semanais distribuídas de segunda a sexta-feira, a carga diária é de 8 horas e 48 minutos (8h48min).',
      'Guarde sempre os comprovantes impressos do relógio de ponto ou realize capturas de tela dos aplicativos de ponto digital no final de cada expediente.',
      'Utilize nossa Calculadora de Hora Extra para converter seu saldo de horas excedentes em valor financeiro a receber.'
    ],
    relatedToolIds: ['horas-trabalhadas', 'hora-extra', 'dsr', 'salario-liquido'],
    slug: 'calculadora-de-ponto-e-banco-de-horas'
  },
  {
    id: 'desconto-vista-parcelado',
    categoryId: 'calculadoras',
    title: 'Calculadora: Comprar à Vista com Desconto ou Parcelar?',
    shortDescription: 'Descubra se compensa pagar à vista com desconto ou parcelar sem juros investindo o dinheiro no CDI (Tesouro Selic/CDB).',
    longIntro: 'Ao realizar uma compra de valor relevante (eletrodomésticos, viagens, eletrônicos ou veículos), o consumidor frequentemente se depara com o dilema: pagar à vista para obter um desconto ou parcelar em várias vezes "sem juros" e deixar o dinheiro rendendo em uma aplicação financeira segura (como Tesouro Selic, CDB 100% do CDI ou Contas Remuneradas). A Calculadora À Vista vs Parcelado da Tool Brasil calcula a taxa implícita de juros embutida e indica matematicamente a opção mais vantajosa.',
    howItWorks: 'Informe o valor total do produto parcelado, o percentual ou valor de desconto oferecido para pagamento à vista, o número de parcelas mensais e a rentabilidade líquida da sua aplicação financeira (% ao ano do CDI). A ferramenta calcula a Taxa Interna de Retorno (TIR) embutida na operação e simula o saldo final caso você parcele e saque mês a mês o valor da parcela do seu investimento.',
    faqs: [
      { question: 'Por que o parcelamento "sem juros" nem sempre é vantajoso?', answer: 'Quando a loja oferece desconto para pagamento à vista (PIX ou dinheiro), o preço parcelado já inclui uma taxa de juros embutida pelo lojista para cobrir custos de antecipação de cartão. O desconto representa o custo financeiro real dessa transação.' },
      { question: 'A partir de qual desconto geralmente vale mais a pena pagar à vista?', answer: 'Com a taxa SELIC entre 10% e 13% ao ano, qualquer desconto à vista superior a 3% a 5% em compras parceladas em até 10 ou 12 vezes costuma superar com ampla margem o rendimento financeiro de uma aplicação conservadora de renda fixa.' },
      { question: 'O imposto de renda da aplicação financeira foi considerado?', answer: 'Sim. Em investimentos de renda fixa incide a tabela regressiva de IR (de 22,5% até 15%). Nossa calculadora permite configurar a taxa líquida real esperada após os descontos tributários.' }
    ],
    tips: [
      'Negocie sempre um desconto adicional para pagamento via PIX ou em 1x antes de fechar qualquer compra relevante.',
      'Se optar por parcelar, certifique-se de que o dinheiro do valor integral à vista realmente permanecerá investido rendendo juros compostos a seu favor.',
      'Evite acumular dezenas de parcelas pequenas no cartão de crédito para não comprometer sua margem de renda nos meses subsequentes.'
    ],
    relatedToolIds: ['juros-compostos', 'financiamento', 'porcentagem'],
    slug: 'calculadora-desconto-a-vista-vs-parcelado'
  },
  {
    id: 'declaracao-conteudo-correios',
    categoryId: 'geradores',
    title: 'Gerador de Declaração de Conteúdo Correios (A4 Pronto para Imprimir)',
    shortDescription: 'Gere a Declaração de Conteúdo oficial exigida pelos Correios e transportadoras com formulário formatado no padrão A4 oficial.',
    longIntro: 'Desde a regulamentação dos órgãos fazendários estaduais (CONFAZ) e dos Correios (Empresa Brasileira de Correios e Telégrafos), todas as encomendas e mercadorias postadas em território nacional sem nota fiscal exigem obrigatoriamente a Declaração de Conteúdo afixada na parte externa da embalagem. O Gerador de Declaração de Conteúdo da Tool Brasil permite preencher os dados do remetente, destinatário e itens com valores, gerando o formulário padrão oficial A4 pronto para imprimir ou salvar em PDF.',
    howItWorks: 'Preencha os campos obrigatórios do Remetente e do Destinatário (Nome Completo, CPF/CNPJ, Endereço, Cidade, UF e CEP). Na seção de conteúdo, adicione os itens discriminando a descrição, a quantidade e o valor unitário. O valor total declarado é calculado automaticamente. Clique em "Imprimir / Gerar PDF" para visualizar o formulário oficial formatado no padrão de folha A4 exigido pelos Correios.',
    faqs: [
      { question: 'Quando é obrigatório utilizar a Declaração de Conteúdo nos Correios?', answer: 'A Declaração de Conteúdo é obrigatória para o envio de encomendas entre pessoas físicas ou remessas de bens não sujeitos a tributação que não possuam Nota Fiscal eletrônica (NF-e).' },
      { question: 'Onde a declaração deve ser afixada no pacote?', answer: 'O formulário impresso deve ser dobrado e inserido dentro de uma bolsa plástica autoadesiva transparente (porta-documentos / "canguru") e colado na parte externa da caixa ou envelope, com o cabeçalho visível.' },
      { question: 'Existe limite de valor para mercadorias enviadas com declaração de conteúdo?', answer: 'Os Correios aceitam declaração de conteúdo para envios convencionais, mas para mercadorias de alto valor ou revenda comercial continuada, a legislação exige a emissão de nota fiscal emitida por MEI, ME ou empresa.' },
      { question: 'Minhas informações ficam salvas no servidor?', answer: 'Não. O processamento do formulário ocorre 100% no seu próprio navegador de forma privada e segura. Nenhum dado pessoal ou endereço é armazenado em nossos servidores.' }
    ],
    tips: [
      'Descreva os itens de forma clara e objetiva (ex: "2 Camisetas de Algodão Usadas", "1 Livro Didático"), evitando termos genéricos como "Objeto" ou "Presente".',
      'Assine e date o campo do declarante com caneta azul ou preta antes de colar o documento na caixa.',
      'Utilize papel sulfite tamanho A4 comum para a impressão legível do documento.'
    ],
    relatedToolIds: ['recibo', 'cpf', 'cnpj', 'endereco-brasil'],
    slug: 'gerador-de-declaracao-de-conteudo-para-correios'
  },
  {
    id: 'gerador-pix',
    categoryId: 'geradores',
    title: 'Gerador de PIX Copia e Cola & QR Code Estático',
    shortDescription: 'Crie QR Codes PIX e códigos Copia e Cola oficiais no padrão EMVCo do Banco Central com valor, chave e identificador.',
    longIntro: 'O PIX revolucionou os pagamentos instantâneos no Brasil pela praticidade e ausência de taxas para pessoas físicas. Para receber cobranças de clientes, vendas pontuais ou doações de forma profissional, você pode gerar um QR Code PIX estático com chave, nome, cidade e valor pré-definido. O Gerador de PIX da Tool Brasil cria o código oficial BR Code (padrão internacional EMVCo com checksum CRC16 CCITT) de forma 100% segura e client-side no seu navegador.',
    howItWorks: 'Selecione o tipo de chave PIX (CPF, CNPJ, E-mail, Telefone celular ou Chave Aleatória EVP) e digite a sua chave. Informe o nome do titular da conta e a cidade (sem caracteres especiais). Se desejar, insira o valor fixo da cobrança em reais e um código identificador (TxID). A ferramenta gera na hora o QR Code legível por qualquer app bancário e o código alfanumérico Copia e Cola para envio no WhatsApp ou e-mail.',
    faqs: [
      { question: 'O que é o padrão BR Code / EMVCo do Banco Central?', answer: 'É a padronização técnica estabelecida pelo Banco Central do Brasil para QR Codes do PIX, utilizando o formato internacional EMVCo com blocos TLV (Tag-Length-Value) e validação de integridade por algoritmo CRC16.' },
      { question: 'Qual a diferença entre PIX Estático e PIX Dinâmico?', answer: 'O PIX Estático (gerado por esta ferramenta) pode ser utilizado para múltiplas cobranças com valor fixo ou aberto, ideal para autônomos, pequenos comércios e transferências pessoais. O PIX Dinâmico é exclusivo para integrações bancárias via API com controle de liquidação única e expiração.' },
      { question: 'É seguro gerar meu QR Code PIX neste site?', answer: 'Sim, 100% seguro! Toda a codificação do payload EMVCo e do QR Code é executada localmente no JavaScript do seu navegador. Nenhuma chave, dado bancário ou valor trafega para servidores externos.' },
      { question: 'O pagador precisa de internet para escanear?', answer: 'Sim. O aplicativo bancário do pagador precisará de conexão com a internet para consultar o Banco Central e autenticar a transferência instantânea.' }
    ],
    tips: [
      'Digite o nome do beneficiário e cidade sem acentos ou caracteres especiais para garantir 100% de compatibilidade com todos os aplicativos bancários.',
      'Deixe o campo de valor em branco (ou R$ 0,00) caso queira que o cliente/pagador digite o valor livremente no momento do pagamento.',
      'Envie o código Copia e Cola via WhatsApp para facilitar o pagamento de usuários que estão acessando diretamente pelo celular.'
    ],
    relatedToolIds: ['qr-code', 'gerador-whatsapp', 'recibo', 'cpf', 'cnpj'],
    slug: 'gerador-de-pix-copia-e-cola-e-qr-code'
  },
  {
    id: 'contrato-locacao',
    categoryId: 'geradores',
    title: 'Gerador de Contrato de Locação Residencial Simples',
    shortDescription: 'Gere um contrato de aluguel residencial completo e formal baseado na Lei do Inquilinato (Lei nº 8.245/91) pronto para impressão A4.',
    longIntro: 'Alugar um imóvel residencial com segurança jurídica exige a formalização dos direitos e deveres do Locador (proprietário) e do Locatário (inquilino) por meio de um contrato de locação claro e alinhado à Lei Federal nº 8.245/1991 (Lei do Inquilinato) e ao Código Civil Brasileiro. O Gerador de Contrato de Locação da Tool Brasil permite preencher os dados essenciais do imóvel, valores, prazos e garantias, gerando um documento formal e personalizável pronto para assinatura e impressão.',
    howItWorks: 'Preencha as informações das partes (Locador e Locatário), o endereço completo do imóvel, o valor mensal do aluguel, o dia de vencimento, o índice de reajuste anual (IPCA ou IGP-M), o prazo do contrato (ex: 12 ou 30 meses) e a modalidade de garantia (caução, fiador ou sem garantia). O sistema gera em tempo real a minuta contratual completa estruturada em cláusulas jurídicas com botões para cópia de texto ou impressão formatada em A4.',
    faqs: [
      { question: 'Qual é o prazo padrão de um contrato de locação residencial?', answer: 'Pela Lei nº 8.245/91, contratos residenciais ajustados por escrito com prazo igual ou superior a 30 meses garantem o direito de retomada do imóvel pelo locador ao término do prazo sem necessidade de justa causa (denúncia vazia). Contratos com prazo inferior a 30 meses são permitidos, mas a retomada exige motivos específicos previstos no Art. 47 da lei.' },
      { question: 'Qual o valor máximo que o proprietário pode exigir de caução?', answer: 'Pelo Artigo 38, § 2º da Lei do Inquilinato, a garantia por caução em dinheiro não pode exceder o valor equivalente a 3 (três) meses de aluguel e deve ser depositada em conta poupança conjunta.' },
      { question: 'É obrigatório reconhecer firma do contrato em cartório?', answer: 'O reconhecimento de firma das assinaturas do locador, locatário e testemunhas não é requisito de validade do contrato, mas é altamente recomendado para comprovar a autenticidade das assinaturas perante terceiros e órgãos judiciais.' }
    ],
    tips: [
      'Realize sempre um Laudo de Vistoria Inicial detalhado com fotos do imóvel anexado ao contrato de locação antes de entregar as chaves.',
      'Exija a assinatura de 2 (duas) testemunhas maiores de idade com CPF para que o contrato tenha força de Título Executivo Extrajudicial (Art. 784, III, do CPC).',
      'Defina com clareza a responsabilidade pelo pagamento de taxas condominiais ordinárias, IPTU e contas de consumo de energia e água.'
    ],
    relatedToolIds: ['recibo', 'cpf', 'cnpj', 'declaracao-conteudo-correios'],
    slug: 'gerador-de-contrato-de-locacao-residencial'
  },
  {
    id: 'formatador-abnt',
    categoryId: 'utilitarios',
    title: 'Formatador de Referências ABNT NBR 6023 (Livros, Artigos e Sites)',
    shortDescription: 'Gere referências bibliográficas automáticas e citações acadêmicas conforme as normas oficiais da ABNT NBR 6023 e NBR 10520.',
    longIntro: 'Elaborar a lista de referências bibliográficas de Trabalhos de Conclusão de Curso (TCC), monografias, dissertações de mestrado, teses e artigos acadêmicos costuma ser uma das tarefas mais trabalhosas e minuciosas da vida estudantil e científica. O Formatador de Referências ABNT da Tool Brasil automatiza a estruturação segundo a norma oficial ABNT NBR 6023:2018 (com destaques tipográficos em negrito ou itálico) e gera a citação correspondente no sistema Autor-Data (ABNT NBR 10520:2023).',
    howItWorks: 'Escolha o tipo de fonte que deseja referenciar (Livro com 1 a 3 autores, Artigo de Periódico/Revista Científica, Página de Website da Internet, TCC/Monografia Acadêmica ou Legislação/Lei). Preencha os campos com os dados da publicação. A ferramenta aplica automaticamente a formatação oficial com sobrenome em caixa alta, pontuação padronizada e links de acesso com data atual formatada.',
    faqs: [
      { question: 'Qual elemento deve ficar em destaque (negrito ou itálico) na ABNT NBR 6023?', answer: 'Na norma ABNT NBR 6023, o título da obra deve ser destacado (em negrito ou itálico), enquanto o subtítulo permanece sempre em texto normal. Em artigos de revista/periódico, o destaque vai para o nome da revista, e não para o título do artigo.' },
      { question: 'Como citar autores com mais de 3 nomes segundo a ABNT?', answer: 'Quando houver mais de 3 autores, a norma permite indicar todos os autores ou indicar apenas o primeiro seguido da expressão latina "et al." (ex: SILVA, João et al.).' },
      { question: 'Como referenciar artigos ou conteúdos da internet sem data?', answer: 'Quando não houver data explícita de publicação no site, utiliza-se a data provável entre colchetes [2024?] ou a data de acesso ao documento online: "Acesso em: 28 fev. 2026."' }
    ],
    tips: [
      'Mantenha a padronização tipográfica em todo o seu trabalho: se escolheu destacar os títulos das referências em negrito, use negrito em todas elas.',
      'Ordene a lista final de referências no final do seu TCC em ordem estritamente alfabética por sobrenome do primeiro autor.',
      'Copie a citação autor-data gerada para incluir diretamente no corpo do seu texto acadêmico (ex: "(SILVA, 2024, p. 45)").'
    ],
    relatedToolIds: ['contador-palavras', 'contador-caracteres', 'comparador-textos'],
    slug: 'formatador-de-referencias-abnt'
  },
  {
    id: 'fuso-horario',
    categoryId: 'conversores',
    title: 'Conversor de Fusos Horários Mundial (Horário de Brasília)',
    shortDescription: 'Converta horários em tempo real entre o Horário Oficial de Brasília (UTC-3) e os principais fusos horários do mundo.',
    longIntro: 'Em um mundo globalizado com trabalho remoto internacional, reuniões virtuais em diferentes continentes e viagens internacionais, calcular a diferença de horas entre países é uma necessidade frequente. O Conversor de Fusos Horários da Tool Brasil compara instantaneamente qualquer horário com base no Horário Oficial de Brasília (BRT / UTC-3), exibindo a hora correspondente nos principais centros do mundo como Nova York, Londres, Tóquio, Lisboa, Paris e nos demais fusos brasileiros.',
    howItWorks: 'Selecione uma data e horário de referência (ou clique em "Usar Hora Atual"). A ferramenta calcula simultaneamente a hora exata nos fusos horários globais e nos 4 fusos horários oficiais do território brasileiro (Fernando de Noronha UTC-2, Brasília UTC-3, Amazônia/Cuiabá UTC-4 e Acre UTC-5), indicando a diferença de horas e se o destino já está no dia seguinte ou anterior.',
    faqs: [
      { question: 'Quantos fusos horários existem no território brasileiro?', answer: 'O Brasil possui 4 fusos horários oficiais: UTC-2 (Ilhas oceânicas como Fernando de Noronha), UTC-3 (Horário Oficial de Brasília, cobrindo Sul, Sudeste, Nordeste, Centro-Oeste e estados do Pará e Amapá), UTC-4 (Amazonas oriental, Rondônia, Roraima, Mato Grosso e MS) e UTC-5 (Acre e extremo oeste do Amazonas).' },
      { question: 'O que significa UTC e GMT?', answer: 'UTC (Coordinated Universal Time) é o padrão de tempo universal de referência mundial regulado por relógios atômicos. GMT (Greenwich Mean Time) é o horário solar médio no meridiano de Greenwich em Londres. Na prática cotidiana de horários civis, ambos representam o fuso base zero (UTC+0).' },
      { question: 'Como o horário de verão internacional afeta a diferença de horas?', answer: 'Países dos Estados Unidos e Europa adotam horário de verão (Daylight Saving Time - DST) entre março e novembro, adiantando seus relógios em 1 hora e alterando a diferença de fuso em relação ao Brasil.' }
    ],
    tips: [
      'Ao agendar reuniões com equipes no exterior, sempre especifique a sigla do fuso horário (ex: 14:00 BRT / 17:00 UTC) para evitar confusões de calendário.',
      'Lembre-se de que voos internacionais mostram sempre o horário LOCAL de partida e o horário LOCAL de chegada nos bilhetes de passagem.',
      'O Brasil não adota mais horário de verão desde o Decreto nº 9.772/2019, mantendo o Horário de Brasília fixo em UTC-3 o ano inteiro.'
    ],
    relatedToolIds: ['horas-para-minutos', 'dias-para-horas', 'cronometro'],
    slug: 'conversor-de-fusos-horarios'
  },
  {
    id: 'declaracao-residencia',
    categoryId: 'geradores',
    title: 'Gerador de Declaração de Residência (Lei 7.115/83)',
    shortDescription: 'Gere a Declaração Oficial de Residência para comprovação de endereço quando não houver contas no seu próprio nome.',
    longIntro: 'Muitos cidadãos brasileiros residem em imóveis alugados informalmente, moram com familiares ou dividem moradia sem ter contas de água, luz ou telefone em seu próprio nome. Para resolver essa situação perante bancos, faculdades, DETRAN, órgãos públicos e empresas, a Lei Federal nº 7.115/1983 autoriza a apresentação da Declaração de Residência firmada pelo próprio titular ou pelo proprietário do imóvel. O Gerador da Tool Brasil cria o documento oficial formatado em padrão A4 com todas as salvaguardas legais.',
    howItWorks: 'Escolha se a declaração será feita em Nome Próprio (você declara onde mora sob as penas da lei) ou por Terceiro (o proprietário/titular declara que você reside no imóvel dele). Preencha os dados pessoais (nome, CPF, RG, profissão, estado civil) e o endereço completo com CEP. Clique em "Imprimir A4" para gerar o documento formal pronto para assinatura e apresentação.',
    faqs: [
      { question: 'A Declaração de Residência tem validade jurídica oficial?', answer: 'Sim. A Lei Federal nº 7.115/1983 estabelece que a declaração firmada pelo interessado ou seu procurador presume-se verdadeira, sujeitando o declarante às sanções civis, administrativas e criminais da falsidade ideológica (Art. 299 do Código Penal) caso preste informações falsas.' },
      { question: 'É obrigatório reconhecer firma da declaração de residência em cartório?', answer: 'A Lei Federal nº 13.726/2018 (Lei da Desburocratização) dispensou o reconhecimento de firma e autenticação de documentos para órgãos públicos federais, estaduais e municipais, bastando a apresentação de documento de identidade com foto para conferência da assinatura pelo próprio servidor público.' },
      { question: 'Quais documentos devem acompanhar a declaração?', answer: 'Recomenda-se anexar uma cópia do comprovante de endereço em nome do declarante (se for declaração por terceiro) e uma cópia do RG/CPF do morador.' }
    ],
    tips: [
      'Preencha o CEP com precisão para que o código postal corresponda exatamente ao logradouro informado.',
      'Se o banco ou órgão exigir, solicite ao titular do comprovante de endereço que assine juntamente com você.',
      'Imprima em folha de papel sulfite A4 branca e assine com caneta de tinta azul ou preta.'
    ],
    relatedToolIds: ['declaracao-conteudo-correios', 'contrato-locacao', 'cpf', 'endereco-brasil'],
    slug: 'gerador-de-declaracao-de-residencia'
  },
  {
    id: 'procuracao-simples',
    categoryId: 'geradores',
    title: 'Gerador de Procuração Simples (Pessoa Física e Jurídica)',
    shortDescription: 'Crie uma procuração particular com poderes específicos ou plenos para bancos, Detran, INSS, cartórios e representações legais.',
    longIntro: 'A procuração por instrumento particular é o documento jurídico pelo qual uma pessoa (outorgante) nomeia outra de sua confiança (outorgado/procurador) para agir em seu nome e defender seus interesses em situações onde não pode comparecer pessoalmente. O Gerador de Procuração da Tool Brasil estrutura a minuta nos termos do Artigo 653 e seguintes do Código Civil Brasileiro, com cláusulas de poderes personalizáveis e formato pronto para impressão A4.',
    howItWorks: 'Preencha a qualificação do Outorgante (quem concede os poderes) e do Outorgado (quem recebe os poderes). Selecione a finalidade da procuração (Plenos Poderes Gerais, Representação perante Bancos/Contas, DETRAN/Veículos, INSS/Previdência Social, Receita Federal ou poderes específicos personalizados). O sistema monta a procuração formal em tempo real com local, data e campos de assinatura.',
    faqs: [
      { question: 'Qual a diferença entre procuração particular e procuração pública?', answer: 'A procuração particular pode ser redigida e impressa livremente pelas partes. A procuração pública é lavrada em Livro de Notas por um tabelião em Cartório de Registro Civil e é exigida por lei para atos solenes, como venda de imóveis de valor superior a 30 salários mínimos, casamento ou divórcio por procuração.' },
      { question: 'A procuração simples perde a validade após quanto tempo?', answer: 'Salvo se constar expressamente um prazo de validade na procuração (ex: válida por 1 ano ou até 31/12/2026), a procuração particular vigora por prazo indeterminado até que seja formalmente revogada pelo outorgante ou ocorra o falecimento de uma das partes (Art. 682 do Código Civil).' },
      { question: 'Preciso reconhecer firma no cartório?', answer: 'Para órgãos privados como bancos, concessionárias e imobiliárias, é praxe exigir o reconhecimento de firma por autenticidade ou semelhança. Para repartições públicas federais, a Lei nº 13.726/2018 dispensa o reconhecimento de firma mediante apresentação do RG original.' }
    ],
    tips: [
      'Especifique claramente a finalidade dos poderes (ex: "exclusivamente para retirar o Certificado de Registro do Veículo placa ABC-1234 perante o DETRAN/SP") para evitar abusos.',
      'Defina uma data limite de vigência caso a procuração seja outorgada para um ato específico e temporário.',
      'Guarde uma via assinada para o outorgante e forneça a via original para o outorgado.'
    ],
    relatedToolIds: ['contrato-locacao', 'declaracao-residencia', 'cpf', 'cnpj'],
    slug: 'gerador-de-procuracao-simples'
  },
  {
    id: 'carta-demissao',
    categoryId: 'geradores',
    title: 'Gerador de Carta de Pedido de Demissão',
    shortDescription: 'Gere a carta formal de pedido de demissão com opção de cumprimento de aviso prévio ou solicitação de dispensa imediata.',
    longIntro: 'Quando um colaborador decide se desligar voluntariamente da empresa, a legislação trabalhista brasileira (CLT) exige a formalização do pedido de demissão por escrito. O Gerador de Carta de Demissão da Tool Brasil cria o texto padrão formal tanto para quem irá cumprir os 30 dias de aviso prévio trabalhado quanto para quem solicita a dispensa do cumprimento do aviso prévio por motivos pessoais ou início em um novo emprego.',
    howItWorks: 'Informe o nome da empresa empregadora, seu nome completo, cargo, número da Carteira de Trabalho (CTPS) e a data do pedido. Selecione a opção referente ao aviso prévio: cumprimento regular da jornada ou pedido de dispensa imediata do cumprimento. A ferramenta gera a carta completa nos padrões exigidos pelos departamentos de Recursos Humanos (RH) e homologações sindicais.',
    faqs: [
      { question: 'A carta de demissão precisa ser escrita à mão (de próprio punho)?', answer: 'Embora a lei não proíba cartas digitadas, a jurisprudência da Justiça do Trabalho e a maioria dos departamentos de RH recomendam que o funcionário copie o texto gerado de próprio punho (manuscrito) em folha de papel sulfite ou assine a via impressa com firma reconhecida para comprovar que não houve coação da empresa.' },
      { question: 'Quais verbas rescisórias o trabalhador tem direito ao pedir demissão?', answer: 'Ao pedir demissão, o trabalhador tem direito ao Saldo de Salário dos dias trabalhados, 13º Salário proporcional e Férias vencidas/proporcionais acrescidas de 1/3. Ele não tem direito ao saque do FGTS, à multa rescisória de 40% nem ao Seguro-Desemprego.' },
      { question: 'A empresa é obrigada a dispensar o aviso prévio se eu tiver um novo emprego?', answer: 'Pela Súmula 276 do TST, o direito ao aviso prévio é irrenunciável pelo empregado, mas a empresa pode dispensar o cumprimento se comprovar a obtenção de novo emprego, dependendo também da convenção coletiva do sindicato da categoria.' }
    ],
    tips: [
      'Imprima ou copie o texto em 2 (duas) vias idênticas: uma para entregar ao RH e outra para colher o protocolo de recebimento assinado e datado pela empresa.',
      'Utilize nossa Calculadora de Rescisão de Contrato para conferir os valores exatos a receber na data do acerto de contas.',
      'Mantenha uma postura profissional e cordial na redação da carta para preservar boas referências profissionais futuras.'
    ],
    relatedToolIds: ['salario-proporcional', 'rescisao', 'ferias', 'decimo-terceiro'],
    slug: 'gerador-de-carta-de-demissao'
  },
  {
    id: 'nota-promissoria',
    categoryId: 'geradores',
    title: 'Gerador de Nota Promissória Online (Pronta para Imprimir)',
    shortDescription: 'Gere notas promissórias com valor por extenso automático, dados de emitente, avalista e impressão oficial padrão A4.',
    longIntro: 'A Nota Promissória é um título de crédito cambial e título executivo extrajudicial regulamentado pelo Decreto nº 2.044/1908 e pela Lei Uniforme de Genebra (Decreto nº 57.663/1966). Ela representa uma promessa direta e incondicional de pagamento em dinheiro de uma quantia líquida e certa. O Gerador de Nota Promissória da Tool Brasil preenche os dados formais obrigatórios, converte os valores em reais por extenso automaticamente e entrega o modelo pronto para impressão.',
    howItWorks: 'Informe o número da nota promissória, a data de vencimento, o valor em reais, o nome do credor/beneficiário, o local de pagamento e os dados completos do emitente (devedor) e avalista (se houver). O sistema gera o layout clássico da promissória com moldura e campos de assinatura prontos para folha A4.',
    faqs: [
      { question: 'Quais são os requisitos essenciais de validade de uma nota promissória?', answer: 'A nota promissória deve conter obrigatoriamente: a denominação "Nota Promissória" expressa no texto, a promessa pura e simples de pagar quantia determinada, o nome da pessoa a quem deve ser paga, a data de emissão, o local de pagamento e a assinatura do emitente.' },
      { question: 'O que acontece em caso de divergência entre o valor em números e o valor por extenso?', answer: 'Pela Lei Uniforme de Genebra (Art. 6º), havendo divergência entre a quantia escrita em números e a escrita por extenso, prevalece sempre a quantia indicada por extenso.' },
      { question: 'Qual o prazo de prescrição para cobrar uma nota promissória na Justiça?', answer: 'O prazo prescricional para execução judicial da nota promissória é de 3 (três) anos a contar da data do vencimento. Após esse prazo, o credor ainda dispõe de até 5 anos para propor Ação Monitória (Súmula 504 do STJ).' }
    ],
    tips: [
      'Nunca assine notas promissórias em branco ou com campos essenciais sem preenchimento.',
      'Sempre guarde o comprovante de quitação ou solicite a devolução da nota promissória original devidamente rasgada ou carimbada como "PAGO" ao quitar o débito.',
      'A inclusão do CPF e endereço completo do emitente e avalista agiliza eventuais procedimentos de cobrança e protesto em cartório.'
    ],
    relatedToolIds: ['recibo', 'recibo-compra-venda-veiculo', 'juros-simples', 'juros-compostos'],
    slug: 'gerador-de-nota-promissoria'
  },
  {
    id: 'recibo-compra-venda-veiculo',
    categoryId: 'geradores',
    title: 'Gerador de Recibo de Compra e Venda de Veículo',
    shortDescription: 'Gere o termo e recibo de compra e venda de carro ou moto com dados do Renavam, Chassi, placa, valor e quitação formal.',
    longIntro: 'Comprar ou vender um automóvel, motocicleta ou caminhão entre pessoas físicas exige cautela para resguardar comprador e vendedor contra multas de trânsito futuras, débitos de IPVA anteriores e transferências pendentes. O Gerador de Recibo de Compra e Venda de Veículo da Tool Brasil cria um contrato de compra e venda com recibo de quitação formal, detalhando dados cadastrais do veículo (Placa, Renavam, Chassi, Ano/Modelo, Cor e KM) e estipulando prazos para a transferência perante o DETRAN.',
    howItWorks: 'Preencha os dados do Vendedor, do Comprador e a identificação completa do Veículo (Marca/Modelo, Placa, Renavam, Chassi, Ano de Fabricação/Modelo e Hodômetro). Informe o valor negociado e a forma de pagamento (à vista via PIX, dinheiro ou financiado). O sistema gera o recibo e termo de responsabilidade com cláusulas de vistoria, quitação e compromisso de transferência dentro do prazo de 30 dias do Art. 123 do CTB.',
    faqs: [
      { question: 'Este recibo substitui o DUT / ATPV-e do Detran?', answer: 'Não. Este documento formaliza o contrato de compra, venda e quitação financeira entre as partes. A transferência legal de propriedade do veículo deve ser realizada obrigatoriamente através da Autorização para Transferência de Propriedade do Veículo Digital (ATPV-e) pelo aplicativo Carteira Digital de Trânsito ou em cartório.' },
      { question: 'Qual o prazo legal para transferir o veículo no DETRAN?', answer: 'Conforme o Artigo 123, § 1º do Código de Trânsito Brasileiro (CTB), o novo proprietário tem o prazo improrrogável de 30 (trinta) dias para adotar as providências de transferência junto ao órgão de trânsito, sob pena de multa e pontuação na CNH.' },
      { question: 'Como o vendedor se protege de multas cometidas pelo comprador antes da transferência?', answer: 'O vendedor deve realizar a Comunicação de Venda no DETRAN ou em Cartório de Notas imediatamente após assinar a ATPV-e, apresentando cópia autenticada do documento de transferência.' }
    ],
    tips: [
      'Faça uma vistoria cautelar prévia e consulte débitos no portal do DETRAN e Secretaria da Fazenda antes de realizar o pagamento.',
      'Anote no recibo o horário exato da entrega das chaves e da posse do veículo para delimitar com precisão a responsabilidade por infrações de trânsito.',
      'Assine em 2 (duas) vias na presença de testemunhas e reconheça firma por autenticidade.'
    ],
    relatedToolIds: ['recibo', 'placa-mercosul', 'contrato-locacao', 'ipva'],
    slug: 'gerador-de-recibo-compra-e-venda-veiculo'
  },
  {
    id: 'compressor-imagens',
    categoryId: 'utilitarios',
    title: 'Compressor de Imagens Online (JPG, PNG, WebP)',
    shortDescription: 'Reduza o tamanho em KB/MB de fotos e imagens JPG, PNG e WebP sem perder qualidade visual de forma 100% rápida e segura no seu navegador.',
    longIntro: 'Imagens pesadas deixam sites lentos, esgotam o limite de anexos de e-mails, dificultam o envio em plataformas corporativas e ocupam espaço desnecessário no celular e computador. O Compressor de Imagens Online da Tool Brasil utiliza a tecnologia da API Canvas do HTML5 para processar e otimizar imagens diretamente no seu navegador, sem fazer upload dos seus arquivos para servidores externos — garantindo privacidade absoluta e velocidade instantânea.',
    howItWorks: 'Selecione ou arraste uma ou mais imagens (JPG, PNG ou WebP). Escolha o nível de compressão desejado através do controle deslizante de qualidade (de 10% a 100%) ou selecione uma resolução máxima. A ferramenta exibe em tempo real o tamanho original, o novo tamanho reduzido, o percentual exato de economia de dados e disponibiliza o download imediato da imagem otimizada.',
    faqs: [
      { question: 'A compressão de imagens reduz a nitidez da foto?', answer: 'Nossa ferramenta utiliza algoritmos inteligentes de amostragem que removem metadados desnecessários (EXIF) e otimizam a paleta de cores, reduzindo o tamanho do arquivo em até 70% a 90% sem perdas visíveis perceptíveis a olho nu.' },
      { question: 'Minhas imagens são enviadas para algum servidor?', answer: 'Não! Todo o processamento de compressão e renderização acontece 100% localmente na memória RAM do seu navegador via JavaScript. Seus arquivos nunca saem do seu dispositivo, garantindo total privacidade e segurança.' },
      { question: 'Qual formato gera o arquivo mais leve: JPG, PNG ou WebP?', answer: 'O formato WebP (desenvolvido pelo Google) costuma gerar arquivos cerca de 25% a 35% mais leves que o JPEG e até 80% menores que o PNG, mantendo excelente fidelidade de imagem e suporte a transparência.' }
    ],
    tips: [
      'Para publicação em sites e blogs, um nível de qualidade entre 75% e 85% oferece o equilíbrio perfeito entre leveza e nitidez visual.',
      'Se você precisa de fundo transparente, mantenha o formato PNG ou converta para WebP.',
      'Comprimir imagens antes de anexar em e-mails e processos judiciais (PJe) evita erros de limite de tamanho de anexo.'
    ],
    relatedToolIds: ['conversor-imagens', 'editor-imagens', 'imagem-para-pdf', 'imagem-para-base64'],
    slug: 'compressor-de-imagens-online'
  },
  {
    id: 'conversor-imagens',
    categoryId: 'utilitarios',
    title: 'Conversor de Formatos de Imagem (PNG, JPG, WebP)',
    shortDescription: 'Converta imagens entre PNG, JPG, WebP e GIF instantaneamente no navegador com controle de qualidade e resolução.',
    longIntro: 'Converter imagens entre extensões é uma rotina comum para designers, desenvolvedores web, estudantes e profissionais de marketing. O Conversor de Imagens da Tool Brasil transforma arquivos de imagem nos principais formatos da web (PNG para JPG, JPG para PNG, WebP para JPG, PNG para WebP) sem necessidade de instalar programas pesados e de forma 100% client-side.',
    howItWorks: 'Carregue a imagem que deseja converter a partir do seu computador ou celular. Escolha o formato de saída desejado (JPG, PNG ou WebP) e defina a qualidade de renderização. O sistema converte o arquivo via HTML5 Canvas em milissegundos e gera o link de download direto com a nova extensão.',
    faqs: [
      { question: 'Quando devo converter PNG para JPG?', answer: 'O formato JPG é ideal para fotografias e imagens complexas com muitas cores e sombras, pois gera arquivos muito mais leves. Já o PNG é ideal para logotipos, ícones e ilustrações que exigem fundo transparente ou bordas nítidas sem artefatos.' },
      { question: 'O que acontece com a transparência do PNG ao converter para JPG?', answer: 'Como o formato JPEG não possui canal alfa (transparência), os pixels transparentes da imagem PNG serão automaticamente preenchidos com fundo branco na conversão para JPG.' },
      { question: 'Por que usar o formato WebP?', answer: 'O formato WebP oferece compressão superior com e sem perdas, suporte a transparência e tempos de carregamento muito mais rápidos em todos os navegadores modernos, sendo o formato preferido pelo Google para SEO de páginas.' }
    ],
    tips: [
      'Converta fotos pesadas da câmera do celular (JPG/HEIC) para WebP para economizar armazenamento na nuvem.',
      'Utilize PNG quando precisar criar logotipos com fundo transparente para sobrepor em apresentações e websites.',
      'Combine a conversão de formato com nossa ferramenta de Compressão de Imagens para obter a máxima redução de tamanho.'
    ],
    relatedToolIds: ['compressor-imagens', 'editor-imagens', 'imagem-para-base64'],
    slug: 'conversor-de-formato-de-imagens'
  },
  {
    id: 'editor-imagens',
    categoryId: 'utilitarios',
    title: 'Editor de Imagens Rápido Online (Corte, Filtros e Brilho)',
    shortDescription: 'Corte, gire, redimensione e aplique ajustes de brilho, contraste e filtros em fotos diretamente no navegador.',
    longIntro: 'Fazer edições rápidas em imagens — como cortar bordas desnecessárias, girar fotos tiradas na vertical, ajustar a iluminação ou aplicar filtros monocromáticos — não precisa exigir softwares caros e complexos. O Editor de Imagens Rápido da Tool Brasil disponibiliza uma bancada completa de manipulação visual 100% gratuita, rápida e segura no seu próprio browser.',
    howItWorks: 'Selecione uma imagem para carregar no canvas interativo. Utilize as ferramentas para girar (90° horário/anti-horário), inverter horizontalmente/verticalmente, ajustar os controles deslizantes de Brilho, Contraste, Saturação e Desfoque (Blur), ou aplicar filtros de escala de cinza e sépia. Visualize as modificações em tempo real e clique em "Baixar Imagem Editada".',
    faqs: [
      { question: 'Posso desfazer as alterações na imagem?', answer: 'Sim. A qualquer momento você pode clicar no botão "Restaurar Original" para reverter todos os filtros, rotações e ajustes para o estado inicial do arquivo carregado.' },
      { question: 'As edições reduzem a resolução original da minha foto?', answer: 'Não. O canvas do editor processa a imagem mantendo a proporção e resolução original de pixels da fotografia carregada.' },
      { question: 'Existe limite de tamanho para carregar fotos no editor?', answer: 'A ferramenta suporta fotos de alta resolução de smartphones e câmeras profissionais até o limite de memória do seu próprio navegador.' }
    ],
    tips: [
      'Aumentar levemente o contraste (+15%) e a saturação (+10%) costuma realçar as cores de fotos tiradas em dias nublados.',
      'Utilize o filtro Preto e Branco (Grayscale) com alto contraste para dar um toque artístico elegante aos seus retratos.',
      'Gire e recorte imagens de documentos escaneados para enquadrar apenas a área legível antes de imprimir ou enviar.'
    ],
    relatedToolIds: ['compressor-imagens', 'conversor-imagens', 'imagem-para-pdf'],
    slug: 'editor-de-imagens-rapido-online'
  },
  {
    id: 'imagem-para-pdf',
    categoryId: 'utilitarios',
    title: 'Conversor de Imagens para PDF (Junte Fotos em PDF)',
    shortDescription: 'Converta fotos JPG, PNG e comprovantes em um documento PDF organizado no padrão A4 pronto para imprimir ou enviar.',
    longIntro: 'Transformar fotos de documentos, comprovantes, contratos físicos e recibos em arquivos PDF é uma exigência constante de bancos, processos seletivos, órgãos públicos e faculdades. O Conversor de Imagem para PDF da Tool Brasil permite selecionar fotos da sua galeria ou computador, organizá-las e convertê-las em um arquivo PDF leve e perfeitamente dimensionado no padrão de folha A4.',
    howItWorks: 'Carregue uma ou mais imagens nos formatos JPG ou PNG. Escolha a orientação da página (Retrato ou Paisagem) e as margens desejadas. O sistema compila as fotos em páginas PDF estruturadas e gera o arquivo para download imediato ou visualização prévia de impressão.',
    faqs: [
      { question: 'Posso juntar várias fotos em um único arquivo PDF?', answer: 'Sim. Você pode carregar múltiplas fotos de comprovantes ou páginas de um contrato e a ferramenta gerará um PDF consolidado com cada imagem em uma página sequencial.' },
      { question: 'O documento PDF gerado é aceito em sites do governo e vestibulares?', answer: 'Sim. O PDF gerado segue o padrão internacional ISO de documentos portáteis (PDF standard), sendo 100% legível por leitores Adobe Acrobat, navegadores e sistemas governamentais (como Gov.br, SISU, PROUNI e PJe).' },
      { question: 'É seguro converter documentos confidenciais nesta ferramenta?', answer: 'Absolutamente seguro. Toda a renderização do PDF é processada localmente pelo motor de scripts do seu navegador sem transmissão para servidores na internet.' }
    ],
    tips: [
      'Tire fotos dos seus documentos em ambiente bem iluminado, sem sombras e com a câmera alinhada paralelamente ao papel.',
      'Escolha a orientação "Retrato" (vertical) para documentos textuais comuns como RG, CPF e certidões.',
      'Utilize a compressão prévia de imagens caso o portal de destino possua limite rígido de tamanho de arquivo (ex: até 2 MB).'
    ],
    relatedToolIds: ['compressor-imagens', 'editor-imagens', 'declaracao-conteudo-correios'],
    slug: 'conversor-de-imagem-para-pdf'
  },
  {
    id: 'imagem-para-base64',
    categoryId: 'utilitarios',
    title: 'Conversor de Imagem para Base64 e Data URI',
    shortDescription: 'Converta fotos e arquivos de imagem em strings Base64 com código pronto para inclusão direta em HTML, CSS e JSON.',
    longIntro: 'Para desenvolvedores web, programadores e designers que precisam embutir imagens diretamente no código-fonte de páginas web, e-mails marketing ou APIs REST sem depender de requisições HTTP adicionais para arquivos externos, o formato Base64 Data URI é uma solução prática e eficiente. O Conversor de Imagem para Base64 da Tool Brasil converte instantaneamente qualquer arquivo gráfico em texto codificado.',
    howItWorks: 'Selecione uma imagem (PNG, JPG, SVG, GIF ou WebP). A ferramenta lê os bytes do arquivo via FileReader API, calcula o tamanho codificado e disponibiliza o código em três formatos prontos com botões de cópia de um clique: String Base64 pura, Tag HTML (`<img src="data:image/...">`) e Regra CSS (`background-image: url(...)`).',
    faqs: [
      { question: 'O que é a codificação Base64?', answer: 'Base64 é um algoritmo de codificação que converte dados binários (como imagens e arquivos) em uma sequência de caracteres alfanuméricos ASCII seguros para transmissão de texto em protocolos como HTTP, JSON e MIME de e-mails.' },
      { question: 'O arquivo em Base64 fica maior que o arquivo de imagem original?', answer: 'Sim. A codificação Base64 aumenta o tamanho dos dados em aproximadamente 33% em relação ao binário original devido à representação em 6 bits por caractere.' },
      { question: 'Quando é recomendável usar imagens em Base64?', answer: 'O uso de Base64 é altamente recomendado para pequenos ícones, logotipos leves, assinaturas de e-mail e fontes que evitam requisições HTTP extras e previnem falhas de renderização quando a imagem externa falha.' }
    ],
    tips: [
      'Evite utilizar Base64 para fotos grandes ou arquivos com mais de 100 KB, pois isso pode aumentar o tempo de análise do HTML/CSS pelo navegador.',
      'Utilize imagens com dimensões reduzidas e passe por um compressor antes de converter para Base64.',
      'Copie a tag HTML pronta para colar diretamente em templates de newsletters e e-mails transacionais.'
    ],
    relatedToolIds: ['conversor-imagens', 'compressor-imagens', 'formatador-json', 'encode-url'],
    slug: 'conversor-de-imagem-para-base64'
  },
  {
    id: 'calculadora-ferias-proporcionais',
    categoryId: 'calculadoras',
    title: 'Calculadora de Férias Proporcionais e Vencidas CLT',
    shortDescription: 'Calcule o valor exato das férias proporcionais, vencidas, 1/3 constitucional, abono pecuniário (venda) e descontos legais.',
    longIntro: 'O direito constitucional às férias anuais remuneradas com o acréscimo de um terço constitucional (Artigo 7º, XVII da CF/88 e Art. 129 da CLT) é uma das verbas trabalhistas mais importantes do contrato de trabalho. Seja na concessão regular durante o contrato ou no cálculo de rescisão, saber a quantia exata de avos de férias proporcionais acumulados evita erros no holerite. A Calculadora da Tool Brasil simula o período aquisitivo, o valor do 1/3 e a opção de venda de 10 dias (abono pecuniário).',
    howItWorks: 'Preencha seu salário bruto contratual, a média de horas extras/adicionais dos últimos 12 meses (se houver), a quantidade de meses trabalhados no período aquisitivo (avos de 1 a 12), a quantidade de dias de férias a gozar (ex: 30, 20 ou 15 dias) e se deseja vender 1/3 das férias (10 dias de abono). A ferramenta apura o valor bruto das férias, o 1/3 constitucional, o abono pecuniário isento e os descontos previdenciários e de IRRF.',
    faqs: [
      { question: 'Como funciona a contagem dos avos de férias proporcionais?', answer: 'Conforme o Artigo 146 da CLT, a cada mês de trabalho completo (ou fração superior a 14 dias trabalhados no mês civil), o empregado adquire o direito a 1/12 (um doze avos) do período anual de férias.' },
      { question: 'O que é o Abono Pecuniário de Férias?', answer: 'Pelo Artigo 143 da CLT, é facultado ao empregado converter 1/3 do período de férias a que tiver direito em abono pecuniário (a chamada "venda de 10 dias de férias"), no valor da remuneração que lhe seria devida nos dias correspondentes.' },
      { question: 'Sobre o abono pecuniário incide desconto de INSS e Imposto de Renda?', answer: 'Não. O valor pago a título de abono pecuniário (venda de 10 dias de férias) e seu respectivo 1/3 constitucional possuem natureza indenizatória e são isentos de retenção de INSS e IRRF (Súmula 125 do STJ).' }
    ],
    tips: [
      'O pagamento da remuneração das férias e do terço constitucional deve ser efetuado pela empresa até 2 dias antes do início do respectivo período de descanso (Art. 145 CLT).',
      'Se o empregador não conceder as férias dentro do período concessivo (12 meses após o período aquisitivo), deverá pagar a remuneração em dobro (Art. 137 CLT).',
      'Inclua a média de horas extras e comissões recebidas nos últimos 12 meses para apurar a remuneração real das férias.'
    ],
    relatedToolIds: ['ferias', 'salario-liquido', 'decimo-terceiro', 'rescisao'],
    slug: 'calculadora-de-ferias-proporcionais'
  },
  {
    id: 'calculadora-aviso-previo',
    categoryId: 'calculadoras',
    title: 'Calculadora de Aviso Prévio Proporcional (Lei 12.506/11)',
    shortDescription: 'Descubra a quantidade exata de dias de aviso prévio (de 30 a 90 dias) e o valor financeiro a receber com base no tempo de empresa.',
    longIntro: 'Com a promulgação da Lei Federal nº 12.506/2011, o aviso prévio passou a ser proporcional ao tempo de serviço prestado pelo trabalhador na mesma empresa. Ao período mínimo de 30 dias garantido pela Constituição Federal, são acrescidos 3 (três) dias para cada ano completo de serviço prestado ao mesmo empregador, até o limite máximo de 90 dias (equivalente a 60 dias de acréscimo para 20 anos de trabalho). A Calculadora de Aviso Prévio da Tool Brasil calcula os dias exatos e o valor rescisório correspondente.',
    howItWorks: 'Insira o seu salário base mensal e a data de admissão e demissão (ou informe a quantidade de anos completos trabalhados na empresa). A calculadora calcula os dias adicionais pela tabela da Lei 12.506/11 e calcula o valor do aviso prévio indenizado ou o período de cumprimento do aviso prévio trabalhado com redução de 2 horas diárias ou 7 dias corridos.',
    faqs: [
      { question: 'A regra do aviso prévio proporcional de até 90 dias vale quando o empregado pede demissão?', answer: 'Não. Conforme a Nota Técnica nº 184/2012 do Ministério do Trabalho e jurisprudência pacificada do TST, a proporcionalidade da Lei 12.506/11 é um direito exclusivo do trabalhador demitido sem justa causa. Se o empregado pede demissão, o aviso prévio que ele deve à empresa é de apenas 30 dias fixos.' },
      { question: 'Como funciona a redução de jornada no aviso prévio trabalhado?', answer: 'Pelo Artigo 488 da CLT, no caso de demissão sem justa causa pelo empregador com cumprimento de aviso trabalhado, o empregado pode optar por sair 2 horas mais cedo todos os dias ou faltar ao serviço durante 7 dias corridos sem prejuízo salarial, para buscar novo emprego.' },
      { question: 'O aviso prévio indenizado projeta a data de encerramento do contrato de trabalho?', answer: 'Sim. Conforme o Artigo 487, § 1º da CLT e a Orientação Jurisprudencial nº 82 da SDI-1 do TST, o período de aviso prévio (mesmo indenizado) projeta a data de término do contrato para efeito de cálculo de 13º salário proporcional, férias e tempo de serviço.' }
    ],
    tips: [
      'Lembre-se de que anos incompletos (ex: 2 anos e 11 meses) contam apenas como 2 anos para efeito do acréscimo dos 3 dias (gerando 36 dias no total).',
      'Confira a data de saída projetada na Carteira de Trabalho Digital para garantir que seus direitos de tempo de serviço foram computados integralmente.',
      'Utilize nossa Calculadora de Rescisão Completa para calcular todos os reflexos do aviso prévio no FGTS e décimo terceiro.'
    ],
    relatedToolIds: ['rescisao', 'salario-proporcional', 'carta-demissao', 'fgts'],
    slug: 'calculadora-de-aviso-previo-proporcional'
  },
  {
    id: 'calculadora-tijolos-argamassa',
    categoryId: 'calculadoras',
    title: 'Calculadora de Tijolos, Blocos e Argamassa para Paredes',
    shortDescription: 'Calcule a quantidade exata de tijolos (6, 8 ou 9 furos) ou blocos de concreto e sacos de argamassa por metro quadrado de parede.',
    longIntro: 'No planejamento e orçamento de reformas e obras residenciais ou comerciais, calcular com exatidão o quantitativo de materiais de alvenaria evita o desperdício de dinheiro com sobras de material ou atrasos na construção por falta de insumos. A Calculadora de Tijolos e Argamassa da Tool Brasil apura a metragem quadrada líquida da alvenaria (descontando portas e janelas), calcula a quantidade de tijolos ou blocos com margem de quebra e estima o volume de cimento e areia para a argamassa de assentamento.',
    howItWorks: 'Insira o comprimento total e a altura das paredes a serem erguidas. Informe as dimensões ou quantidades de portas e janelas a descontar da área. Selecione o tipo de elemento de alvenaria (Tijolo cerâmico baiano 6 furos, 8 furos, 9 furos ou Bloco de concreto estrutural) e a espessura da junta de assentamento (padrão 1,5 cm). A calculadora apresenta a metragem líquida em m², a quantidade de tijolos recomendada e o número estimado de sacos de cimento/argamassa.',
    faqs: [
      { question: 'Quantos tijolos de 8 furos (9x19x19 cm) são necessários por metro quadrado?', answer: 'Com junta de argamassa padrão de 1,5 cm, são necessários aproximadamente 23 a 25 tijolos de 8 furos por m² de parede em assentamento comum (espessura de 9 cm ou 14 cm).' },
      { question: 'Qual a margem técnica de perda recomendada na compra de tijolos?', answer: 'Recomenda-se adicionar entre 8% e 10% de sobra na compra de tijolos cerâmicos e blocos, devido a quebras no descarregamento, manuseio e cortes nos cantos e quinas de paredes.' },
      { question: 'Qual o traço de argamassa recomendado para assentamento de alvenaria de vedação?', answer: 'O traço mais utilizado para assentamento é de 1:2:8 (1 parte de cimento, 2 partes de cal e 8 partes de areia média) ou argamassa industrializada pronta para alvenaria.' }
    ],
    tips: [
      'Desconte sempre a área total de portas, janelas e vãos estruturais para não superdimensionar o pedido de tijolos na loja de material de construção.',
      'Armazene os tijolos sobre paletes ou lonas plásticas para protegê-los da umidade do solo e chuva antes do assentamento.',
      'Consulte também nossa Calculadora de Tinta e nossa Calculadora de Piso para planejar o acabamento completo da sua obra.'
    ],
    relatedToolIds: ['calculadora-tinta', 'calculadora-piso', 'regra-de-tre'],
    slug: 'calculadora-de-tijolos-e-argamassa'
  },
  {
    id: 'calculadora-preco-combustivel-viagem',
    categoryId: 'calculadoras',
    title: 'Calculadora de Combustível e Pedágio para Viagem',
    shortDescription: 'Calcule o custo total de ida e volta de viagens de carro (distância, consumo km/l, combustível e pedágios) e divida por passageiro.',
    longIntro: 'Planejar os custos de uma viagem de férias, trabalho ou passeio de final de semana exige calcular antecipadamente os gastos com combustível (gasolina, etanol ou diesel), tarifas de pedágio nas rodovias e a divisão proporcional dos custos entre os amigos ou familiares que compartilham o veículo. A Calculadora de Custo de Viagem da Tool Brasil estima o volume de litros necessários, o custo financeiro total e o valor exato por pessoa.',
    howItWorks: 'Informe a distância total da rota em quilômetros (com opção de calcular automaticamente Ida e Volta), a média de consumo do veículo em km/litro, o preço atual do combustível por litro e o valor estimado de pedágios no percurso. Indique a quantidade de pessoas que irão dividir as despesas. A ferramenta calcula a autonomia necessária, a quantidade de litros, o custo total e o valor individual a ratear.',
    faqs: [
      { question: 'O consumo de combustível na estrada é diferente do trânsito urbano?', answer: 'Sim. Em rodovias com velocidade constante e menos paradas, os veículos costumam ter um rendimento entre 15% e 30% superior ao consumo urbano na cidade (ex: um carro que faz 10 km/l na cidade pode fazer 13 a 14 km/l na estrada).' },
      { question: 'O uso do ar-condicionado aumenta o consumo na viagem?', answer: 'Sim, o ar-condicionado consome em média de 8% a 15% a mais de combustível. No entanto, em velocidades de rodovia acima de 80 km/h, rodar com os vidros abertos gera arrasto aerodinâmico que pode consumir tanto ou mais que o ar-condicionado ligado com os vidros fechados.' },
      { question: 'Como saber o valor dos pedágios da minha rota?', answer: 'Você pode consultar os sites das concessionárias de rodovias do seu estado (como CCR, Arteris ou EcoRodovias) ou aplicativos de mapas com rotas de pedágio antes de preencher o simulador.' }
    ],
    tips: [
      'Calibre os pneus com a pressão recomendada para carro carregado antes de pegar a estrada: pneus murchos podem aumentar o consumo em até 4%.',
      'Mantenha uma velocidade estável e utilize o piloto automático (cruise control) em pistas retas para maximizar a economia de combustível.',
      'Utilize nossa Calculadora de Álcool ou Gasolina para saber qual combustível será mais vantajoso para abastecer antes de sair de viagem.'
    ],
    relatedToolIds: ['alcool-ou-gasolina', 'consumo-combustivel', 'preco-por-km'],
    slug: 'calculadora-de-combustivel-para-viagem'
  },
  {
    id: 'calculadora-potencia-ar-condicionado',
    categoryId: 'calculadoras',
    title: 'Calculadora de BTUs para Ar-Condicionado',
    shortDescription: 'Descubra a potência exata em BTUs necessária para refrigerar seu quarto, sala ou escritório com base na área m², sol e pessoas.',
    longIntro: 'Comprar um aparelho de ar-condicionado com potência inferior à necessária faz o compressor trabalhar no limite sem refrigerar o ambiente adequadamente e dispara a conta de energia elétrica. Por outro lado, um aparelho superdimensionado desperdiça dinheiro na compra. A Calculadora de BTUs da Tool Brasil aplica as normas técnicas de engenharia térmica para determinar a capacidade exata (em BTUs/h) para quartos, salas, consultórios e escritórios.',
    howItWorks: 'Informe a área do cômodo em metros quadrados (largura x comprimento), o nível de incidência solar (sol apenas pela manhã ou sol intenso durante a tarde), a quantidade de pessoas que frequentam o ambiente e a quantidade de aparelhos eletrônicos emissores de calor (computadores, TVs, lâmpadas). A fórmula base atribui 600 BTUs/m² (sol moderado) ou 800 BTUs/m² (sol intenso), adicionando 600 a 800 BTUs para cada pessoa e equipamento adicional.',
    faqs: [
      { question: 'O que significa a sigla BTU?', answer: 'BTU significa "British Thermal Unit" (Unidade Térmica Britânica). É a unidade padrão utilizada mundialmente para medir a capacidade de refrigeração de sistemas de climatização e ar-condicionado.' },
      { question: 'Quais são as potências comerciais de ar-condicionado mais comuns no Brasil?', answer: 'As capacidades padronizadas vendidas no mercado brasileiro são: 9.000 BTUs (quartos até 12m²), 12.000 BTUs (quartos e salas até 20m²), 18.000 BTUs (ambientes até 30m²), 24.000 BTUs (até 40m²) e 30.000+ BTUs (grandes espaços comerciais).' },
      { question: 'Qual a diferença entre o ar-condicionado convencional e o modelo Inverter?', answer: 'O ar-condicionado com tecnologia Inverter modula a velocidade do compressor de forma contínua em vez de ligar e desligar bruscamente, economizando até 40% a 60% de energia elétrica e mantendo a temperatura estável sem oscilações.' }
    ],
    tips: [
      'Se o cálculo resultar em um valor intermediário (ex: 10.500 BTUs), escolha sempre o modelo comercial de capacidade superior mais próximo (neste caso, 12.000 BTUs).',
      'Instale cortinas blackout ou persianas nas janelas com sol da tarde para reduzir a carga térmica do ambiente em até 20%.',
      'Mantenha os filtros de ar limpos mensalmente para preservar a eficiência energética e evitar ácaros e bactérias.'
    ],
    relatedToolIds: ['custo-energia', 'calculadora-tinta', 'regra-de-tre'],
    slug: 'calculadora-de-btus-ar-condicionado'
  },
  {
    id: 'faltas-injustificadas',
    categoryId: 'calculadoras',
    title: 'Calculadora de Faltas Injustificadas: Desconto no Salário e DSR (CLT 2026)',
    shortDescription: 'Calcule o desconto de faltas injustificadas no salário, reflexo na perda do DSR e impacto nos dias de férias e 13º salário pela CLT.',
    longIntro: 'Faltar ao trabalho sem justificativa legal (atestados médicos ou motivos do Artigo 473 da CLT) acarreta descontos financeiros imediatos no holerite do trabalhador. A Calculadora de Faltas Injustificadas e DSR da Tool Brasil apura com rigor jurídico o valor exato do dia descontado (regra do divisor 30 para mensalistas), a perda do Descanso Semanal Remunerado (Lei Federal nº 605/1949), o reflexo progressivo na redução dos dias de férias (Artigo 130 da CLT) e a perda de avos do 13º salário caso o número de faltas supere 15 dias no mês.',
    howItWorks: 'Informe o salário bruto mensal, a quantidade de faltas injustificadas ocorridas no mês e quantas semanas tiveram faltas registradas. A calculadora calcula o valor do salário-dia, o valor descontado por ausência, a perda de DSRs correspondentes e cruza os dados com a tabela de impacto em férias e gratificação natalina.',
    faqs: [
      { question: 'Como é calculado o valor do dia descontado por falta injustificada?', answer: 'Pelo Artigo 64 da CLT, o salário-dia do trabalhador mensalista é calculado dividindo o salário bruto mensal por 30 (mesmo em meses de 28, 29 ou 31 dias). Se o salário for R$ 3.000, cada dia de falta custa R$ 100,00 de desconto.' },
      { question: 'Por que o trabalhador perde o DSR quando falta sem justificativa?', answer: 'Pelo Artigo 6º da Lei Federal nº 605/1949, para ter direito à remuneração do repouso semanal (DSR), o empregado deve ter trabalhado durante toda a semana anterior com pontualidade e assiduidade integral. Havendo falta injustificada na semana, o empregador tem o direito de descontar o dia da falta mais 1 dia de DSR (domingo ou feriado correspondente).' },
      { question: 'Quantas faltas injustificadas diminuem as férias do trabalhador?', answer: 'Conforme o Artigo 130 da CLT: até 5 faltas no período aquisitivo (30 dias de férias); de 6 a 14 faltas (24 dias); de 15 a 23 faltas (18 dias); de 24 a 32 faltas (12 dias); mais de 32 faltas (perda total do direito a férias no período).' },
      { question: 'A falta injustificada pode descontar o 13º salário?', answer: 'Sim. Se o trabalhador acumular mais de 15 dias de faltas injustificadas dentro do mesmo mês civil, ele perde a fração correspondente àquele mês (1/12 avos) no cálculo do seu 13º salário anual.' }
    ],
    tips: [
      'Apresente atestados médicos ou comprovações de comparecimento a consultas em até 48h para evitar descontos no salário e DSR.',
      'Atestados de doação de sangue garantem 1 dia de folga a cada 12 meses sem qualquer prejuízo salarial (Art. 473, IV da CLT).',
      'Fique atento ao acúmulo de faltas ao longo do ano para não sofrer redução no período de gozo das suas férias.'
    ],
    relatedToolIds: ['dsr', 'salario-liquido', 'hora-extra', 'salario-proporcional'],
    slug: 'calculadora-de-faltas-injustificadas'
  },
  {
    id: 'descomplica-contrato',
    categoryId: 'utilitarios',
    title: 'DescomplicaContrato: Analisador de Contratos Gratuito com Áudio em 2 Minutos',
    shortDescription: 'Analise contratos civis, de aluguel e prestação de serviços em PDF ou texto. Receba um diagnóstico falado em 2 minutos sem juridiquês com inteligência artificial gratuita.',
    longIntro: 'O DescomplicaContrato é uma tecnologia assistiva educacional do Tool Brasil criada para desmistificar o juridiquês e proteger o cidadão contra abusos contratuais. Utilizando inteligência artificial gratuita e extração de PDF no próprio navegador via pdf.js, a ferramenta examina cláusulas de multas, renovação automática, perdas de sinal e obrigações desproporcionais sob a ótica do Código de Defesa do Consumidor e da Lei do Inquilinato, entregando um resumo falado e direto pelo sintetizador de voz nativo do seu dispositivo.',
    howItWorks: 'Basta arrastar ou selecionar um arquivo PDF ou colar trechos das cláusulas na caixa de texto. O navegador extrai o texto com privacidade (sem armazenar documentos em servidor) e aplica regex para proteger CPFs e e-mails. A inteligência artificial examina os pontos de desequilíbrio e produz uma resposta em formato de áudio de até dois minutos, classificando o risco em Alto, Médio ou Baixo e apontando qual cláusula exigir alteração antes de assinar.',
    faqs: [
      {
        question: 'É seguro enviar meu contrato para análise no DescomplicaContrato?',
        answer: 'Sim, é 100% seguro. O processamento de leitura de PDF e mascaramento de dados ocorre localmente no seu próprio navegador através da biblioteca pdf.js. Antes de qualquer requisição à inteligência artificial, CPFs, números de RG, telefones e e-mails são anonimizados. A análise é puramente volátil em memória e nenhum documento é gravado em servidores.'
      },
      {
        question: 'A ferramenta armazena dados pessoais ou documentos?',
        answer: 'Não. O portal Tool Brasil não possui banco de dados para contratos, cadastros de usuários ou histórico de consultas. Uma vez encerrada a sessão ou atualizada a página, todos os dados são instantaneamente descartados da memória.'
      },
      {
        question: 'Esta análise substitui a consulta com um advogado?',
        answer: 'Não. O DescomplicaContrato é uma tecnologia assistiva educacional e informativa. Ele serve para apontar riscos evidentes e empoderar o cidadão em negociações prévias, mas não substitui a consulta jurídica formal com um advogado ou defensor público.'
      },
      {
        question: 'Quais formatos de arquivo são aceitos e quais são os limites?',
        answer: 'Aceitamos arquivos PDF nativos (com camada de texto selecionável) de até 10 páginas, arquivos de texto simples (.txt) e você também pode colar diretamente qualquer trecho de cláusula na área de texto (limite de até 15.000 caracteres).'
      },
      {
        question: 'O que devo fazer caso o contrato receba a classificação de [RISCO ALTO]?',
        answer: 'Não assine o documento com pressa. Siga a recomendação falada indicada no veredito, solicitando formalmente por e-mail ou mensagem a alteração ou supressão da cláusula abusiva (especialmente multas desproporcionais ou renovação automática silenciosa).'
      }
    ],
    tips: [
      'Nunca assine contratos sob pressão temporal ou emocional: exija sempre 24 horas para ler o documento com calma.',
      'Dê atenção especial às cláusulas de Foro de Eleição, Multa Rescisória e Renovação Automática.',
      'Qualquer promessa feita verbalmente pelo vendedor ou locador deve constar expressamente por escrito no texto do contrato.'
    ],
    relatedToolIds: ['contador-caracteres', 'comparador-textos', 'texto-para-voz', 'gerador-contrato-aluguel'],
    slug: 'descomplica-contrato'
  }
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
