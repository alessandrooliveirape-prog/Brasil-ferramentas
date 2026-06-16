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
      'Configure seu gerador no Brasil Ferramentas para iniciar com o clássico termo inicial "Lorem ipsum dolor sit amet..." de transição.'
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
    id: 'Portas e Redes',
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
    longIntro: 'O reverso da conversão de URLs do portal Brasil Ferramentas. Ele limpa caracteres especiais, pontuações, recuperando os termos originais de campanhas que foram empacotados anteriormente.',
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
  }
};
