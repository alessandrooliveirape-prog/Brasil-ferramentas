/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Páginas programáticas SEO adicionais para termos de cauda longa.
 * Este arquivo é mergeado com PROGRAMMATIC_PAGES do toolsData.ts.
 */

export interface PageEntry {
  title: string;
  description: string;
  content?: any;
}

export const EXTRA_PROGRAMMATIC_PAGES: { [key: string]: PageEntry } = {
  // === DDDs POR ESTADO ===
  'ddd-sp': {
    title: 'DDD São Paulo - Lista de Códigos DDD do Estado de SP',
    description: 'Consulte todos os códigos DDD do estado de São Paulo. Lista completa de DDDs 11, 12, 13, 14, 15, 16, 17, 18, 19 com cidades e regiões metropolitanas.',
  },
  'ddd-rj': {
    title: 'DDD Rio de Janeiro - Lista de Códigos DDD do Estado do RJ',
    description: 'Consulte todos os códigos DDD do estado do Rio de Janeiro. DDDs 21, 22, 24 com cidades, regiões e informações de cobertura.',
  },
  'ddd-mg': {
    title: 'DDD Minas Gerais - Lista de Códigos DDD do Estado de MG',
    description: 'Consulte todos os códigos DDD de Minas Gerais. DDDs 31, 32, 33, 34, 35, 37, 38 com cidades e regiões completas.',
  },
  'ddd-pr': {
    title: 'DDD Paraná - Lista de Códigos DDD do Estado do PR',
    description: 'Consulte todos os códigos DDD do Paraná. DDDs 41, 42, 43, 44, 45, 46 com cidades e informações de região.',
  },
  'ddd-sc': {
    title: 'DDD Santa Catarina - Lista de Códigos DDD do Estado de SC',
    description: 'Consulte todos os códigos DDD de Santa Catarina. DDDs 47, 48, 49 com cidades catarinenses e cobertura.',
  },
  'ddd-rs': {
    title: 'DDD Rio Grande do Sul - Lista de Códigos DDD do Estado do RS',
    description: 'Consulte todos os códigos DDD do Rio Grande do Sul. DDDs 51, 53, 54, 55 com cidades gaúchas e regiões.',
  },
  'ddd-ba': {
    title: 'DDD Bahia - Lista de Códigos DDD do Estado da BA',
    description: 'Consulte todos os códigos DDD da Bahia. DDDs 71, 73, 74, 75, 77 com cidades baianas e regiões.',
  },
  'ddd-ce': {
    title: 'DDD Ceará - Lista de Códigos DDD do Estado do CE',
    description: 'Consulte todos os códigos DDD do Ceará. DDDs 85, 88 com cidades cearenses e regiões metropolitanas.',
  },
  'ddd-pe': {
    title: 'DDD Pernambuco - Lista de Códigos DDD do Estado de PE',
    description: 'Consulte todos os códigos DDD de Pernambuco. DDDs 81, 87 com cidades pernambucanas e regiões.',
  },
  'ddd-go': {
    title: 'DDD Goiás - Lista de Códigos DDD do Estado de GO',
    description: 'Consulte todos os códigos DDD de Goiás. DDDs 62, 64 com cidades goianas e Entorno do DF.',
  },
  'ddd-es': {
    title: 'DDD Espírito Santo - Lista de Códigos DDD do Estado do ES',
    description: 'Consulte todos os códigos DDD do Espírito Santo. DDDs 27, 28 com cidades capixabas e regiões.',
  },

  // === SALÁRIO MÍNIMO POR ANO ===
  'salario-minimo-1994': {
    title: 'Salário Mínimo em 1994 - Valor e História',
    description: 'Saiba quanto era o salário mínimo em 1994 no Brasil. Valor histórico do piso nacional no ano do Plano Real: R$ 64,79.',
  },
  'salario-minimo-1995': {
    title: 'Salário Mínimo em 1995',
    description: 'Salário mínimo de 1995 no Brasil. Valor do piso nacional e poder de compra no ano seguinte ao Plano Real.',
  },
  'salario-minimo-2000': {
    title: 'Salário Mínimo em 2000',
    description: 'Salário mínimo do ano 2000 no Brasil. R$ 151,00 era o valor do piso salarial nacional.',
  },
  'salario-minimo-2005': {
    title: 'Salário Mínimo em 2005 - Valor e Contexto',
    description: 'Salário mínimo de 2005 no Brasil. Valor de R$ 300,00 e comparação com anos anteriores.',
  },
  'salario-minimo-2010': {
    title: 'Salário Mínimo em 2010',
    description: 'Salário mínimo do ano de 2010 no Brasil. Valor Vigente: R$ 510,00. Compare com o salário mínimo atual.',
  },
  'salario-minimo-2015': {
    title: 'Salário Mínimo em 2015',
    description: 'Salário mínimo de 2015 no Brasil. R$ 788,00 era o valor do piso nacional.',
  },
  'salario-minimo-2020': {
    title: 'Salário Mínimo em 2020',
    description: 'Salário mínimo de 2020 no Brasil. Valor de R$ 1.045,00 vigente durante a pandemia.',
  },
  'salario-minimo-2025': {
    title: 'Salário Mínimo em 2025 - Valor Atual',
    description: 'Salário mínimo de 2025 no Brasil. R$ 1.518,00 é o valor atual do piso salarial nacional.',
  },

  // === TAXA SELIC POR ANO ===
  'selic-2024': {
    title: 'Taxa SELIC 2024 - Histórico e Variação',
    description: 'Acompanhe a taxa SELIC de 2024. Histórico completo das reuniões do COPOM e a variação da taxa básica de juros ao longo do ano.',
  },
  'selic-2025': {
    title: 'Taxa SELIC 2025 - Acompanhamento Mensal',
    description: 'Taxa SELIC de 2025 atualizada. Acompanhe as decisões do COPOM e o impacto nos investimentos em renda fixa.',
  },
  'selic-2026': {
    title: 'Taxa SELIC 2026 - Última Reunião COPOM',
    description: 'Taxa SELIC de 2026 em tempo real. Última atualização da taxa básica de juros e projeções para investimentos.',
  },

  // === IBGE POR ESTADO ===
  'ibge-sp': {
    title: 'Códigos IBGE do Estado de São Paulo - Todos os Municípios',
    description: 'Consulte todos os códigos IBGE dos municípios do estado de São Paulo. Lista completa com 645 cidades paulistas e seus códigos de 7 dígitos.',
  },
  'ibge-rj': {
    title: 'Códigos IBGE do Estado do Rio de Janeiro',
    description: 'Todos os códigos IBGE dos municípios fluminenses. Consulte o código IBGE de qualquer cidade do RJ para documentos e sistemas.',
  },
  'ibge-mg': {
    title: 'Códigos IBGE do Estado de Minas Gerais',
    description: 'Lista completa de códigos IBGE dos 853 municípios de Minas Gerais. Encontre o código da sua cidade mineira.',
  },
  'ibge-ba': {
    title: 'Códigos IBGE do Estado da Bahia',
    description: 'Consulte os códigos IBGE de todos os municípios da Bahia. Lista completa com 417 cidades baianas e seus códigos.',
  },
  'ibge-pr': {
    title: 'Códigos IBGE do Estado do Paraná',
    description: 'Códigos IBGE dos municípios paranaenses. Consulte o código de 7 dígitos de qualquer cidade do PR.',
  },
  'ibge-rs': {
    title: 'Códigos IBGE do Estado do Rio Grande do Sul',
    description: 'Lista de códigos IBGE dos 497 municípios gaúchos. Encontre o código IBGE da sua cidade no RS.',
  },
  'ibge-sc': {
    title: 'Códigos IBGE do Estado de Santa Catarina',
    description: 'Códigos IBGE de todos os municípios catarinenses. Consulte o código de 7 dígitos para pesquisas e sistemas.',
  },
  'ibge-pe': {
    title: 'Códigos IBGE do Estado de Pernambuco',
    description: 'Lista completa de códigos IBGE dos municípios de Pernambuco. Consulte cidades pernambucanas e seus códigos.',
  },
  'ibge-ce': {
    title: 'Códigos IBGE do Estado do Ceará',
    description: 'Códigos IBGE dos 184 municípios cearenses. Encontre o código IBGE da sua cidade no Ceará.',
  },
  'ibge-df': {
    title: 'Códigos IBGE do Distrito Federal',
    description: 'Código IBGE de Brasília e regiões administrativas do Distrito Federal para documentos, pesquisas e sistemas.',
  },

  // === PREVISÃO DO TEMPO POR CAPITAL ===
  'tempo-sao-paulo': {
    title: 'Previsão do Tempo em São Paulo SP - Clima Hoje',
    description: 'Previsão do tempo em São Paulo - SP. Clima atual, temperatura, sensação térmica e previsão para os próximos dias na capital paulista.',
  },
  'tempo-rio-de-janeiro': {
    title: 'Previsão do Tempo no Rio de Janeiro RJ',
    description: 'Clima e previsão do tempo no Rio de Janeiro. Temperatura atual, sensação térmica e previsão para a cidade maravilhosa.',
  },
  'tempo-belo-horizonte': {
    title: 'Previsão do Tempo em Belo Horizonte MG',
    description: 'Previsão do tempo em Belo Horizonte. Clima na capital mineira com temperatura, umidade e previsão para os próximos dias.',
  },
  'tempo-salvador': {
    title: 'Previsão do Tempo em Salvador BA',
    description: 'Clima e previsão do tempo em Salvador. Temperatura na capital baiana e condições meteorológicas atuais.',
  },
  'tempo-brasilia': {
    title: 'Previsão do Tempo em Brasília DF',
    description: 'Previsão do tempo em Brasília. Clima na capital federal com temperatura, umidade do ar e previsão estendida.',
  },
  'tempo-fortaleza': {
    title: 'Previsão do Tempo em Fortaleza CE',
    description: 'Clima e previsão do tempo em Fortaleza. Temperatura na capital cearense e condições para praia.',
  },
  'tempo-recife': {
    title: 'Previsão do Tempo em Recife PE',
    description: 'Previsão do tempo no Recife. Clima na capital pernambucana com temperatura, umidade e previsão para a praia.',
  },
  'tempo-curitiba': {
    title: 'Previsão do Tempo em Curitiba PR',
    description: 'Clima e previsão do tempo em Curitiba. Temperatura na capital paranaense e previsão para os próximos dias.',
  },
  'tempo-porto-alegre': {
    title: 'Previsão do Tempo em Porto Alegre RS',
    description: 'Previsão do tempo em Porto Alegre. Clima na capital gaúcha com temperatura e condições meteorológicas.',
  },
  'tempo-manaus': {
    title: 'Previsão do Tempo em Manaus AM',
    description: 'Clima e previsão do tempo em Manaus. Temperatura na capital amazonense e condições na Amazônia.',
  },

  // === CALCULADORAS ESPECÍFICAS ===
  'simular-aposentadoria-por-idade': {
    title: 'Simular Aposentadoria por Idade 2026',
    description: 'Simule sua aposentadoria por idade pelo INSS. Calcule a idade mínima, tempo de contribuição e valor do benefício com as regras atuais.',
  },
  'calcular-13o-salario': {
    title: 'Calcular 13º Salário Proporcional',
    description: 'Calcule o valor do 13º salário proporcional aos meses trabalhados. Simule a primeira e segunda parcela do décimo terceiro.',
  },
  'calcular-rescisao-trabalhista': {
    title: 'Calcular Rescisão Trabalhista - Simulação',
    description: 'Simule o cálculo da rescisão trabalhista CLT. Inclui saldo de salário, férias, 13º proporcional e multa do FGTS.',
  },
  'simular-financiamento-casa-propria': {
    title: 'Simular Financiamento da Casa Própria',
    description: 'Simule o financiamento imobiliário para compra da casa própria. Compare SAC vs Price e calcule as parcelas mensais.',
  },

  // === FERRAMENTAS POPULARES (LONG TAIL) ===
  'consultar-cep-correios': {
    title: 'Consultar CEP Correios - Busca de Endereço',
    description: 'Consulte o CEP dos Correios e encontre endereços completos. Busca por CEP ou logradouro com dados oficiais.',
  },
  'consultar-ddd-telefone': {
    title: 'Consultar DDD de Telefone - Códigos do Brasil',
    description: 'Consulte o código DDD de qualquer estado ou cidade brasileira. Encontre a região de cobertura do DDD desejado.',
  },
  'gerar-senha-forte': {
    title: 'Gerar Senha Forte e Segura Online',
    description: 'Gere senhas fortes e seguras online. Crie credenciais com letras, números e símbolos para proteger suas contas.',
  },
  'gerar-cpf-valido': {
    title: 'Gerar CPF Válido para Testes - Online',
    description: 'Gere números de CPF válidos para testes de sistemas, homologação e desenvolvimento. Com ou sem pontuação.',
  },
  'gerar-cnpj-valido': {
    title: 'Gerar CNPJ Válido - Simulador',
    description: 'Gere CNPJ válidos para testes corporativos e desenvolvimento de sistemas. Inclui dígitos verificadores.',
  },
  'gerar-qr-code-pix': {
    title: 'Gerar QR Code PIX - Código de Pagamento',
    description: 'Gere QR Code para pagamentos PIX. Crie códigos de pagamento instantâneo para cobranças e transferências.',
  },
  'calcular-imc-gratis': {
    title: 'Calcular IMC Grátis - Índice de Massa Corporal',
    description: 'Calcule seu IMC grátis e descubra se você está no peso ideal. Índice de Massa Corporal com classificação OMS.',
  },
  'calcular-juros-compostos-mensais': {
    title: 'Calcular Juros Compostos Mensais - Investimentos',
    description: 'Calcule juros compostos mensais para investimentos. Simule aportes mensais e veja a evolução do seu patrimônio.',
  },
  'calcular-porcentagem-online': {
    title: 'Calcular Porcentagem Online - Calculadora de %',
    description: 'Calcule porcentagem online grátis. Descubra quanto é X% de um valor, aumentos, descontos e variações percentuais.',
  },
  'calcular-inss-salario': {
    title: 'Calcular INSS sobre o Salário - Desconto 2026',
    description: 'Calcule o desconto do INSS sobre o salário. Simule a alíquota progressiva e veja o valor líquido com os descontos previdenciários.',
  },
};
