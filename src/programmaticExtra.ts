/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Páginas programáticas SEO adicionais para termos de cauda longa.
 * Este arquivo é mergeado com PROGRAMMATIC_PAGES do toolsData.ts
 * e auditado/expandido pelo 7º Agente (agent_growth_traction).
 */

export interface PageEntry {
  title: string;
  description: string;
  cluster?: 'ddd' | 'salario-minimo' | 'selic' | 'ibge' | 'ipva-2026' | 'codigo-banco' | 'tabela-trabalhista';
  meta?: Record<string, any>;
  content?: any;
}

export const EXTRA_PROGRAMMATIC_PAGES: { [key: string]: PageEntry } = {
  // === 1. DDDs POR ESTADO (TODAS AS 27 UFs DO BRASIL) ===
  'ddd-sp': {
    title: 'DDD São Paulo - Lista de Códigos DDD do Estado de SP',
    description: 'Consulte todos os códigos DDD do estado de São Paulo. Lista completa de DDDs 11, 12, 13, 14, 15, 16, 17, 18, 19 com cidades e regiões metropolitanas.',
    cluster: 'ddd'
  },
  'ddd-rj': {
    title: 'DDD Rio de Janeiro - Lista de Códigos DDD do Estado do RJ',
    description: 'Consulte todos os códigos DDD do estado do Rio de Janeiro. DDDs 21, 22, 24 com cidades, regiões e informações de cobertura.',
    cluster: 'ddd'
  },
  'ddd-mg': {
    title: 'DDD Minas Gerais - Lista de Códigos DDD do Estado de MG',
    description: 'Consulte todos os códigos DDD de Minas Gerais. DDDs 31, 32, 33, 34, 35, 37, 38 com cidades e regiões completas.',
    cluster: 'ddd'
  },
  'ddd-pr': {
    title: 'DDD Paraná - Lista de Códigos DDD do Estado do PR',
    description: 'Consulte todos os códigos DDD do Paraná. DDDs 41, 42, 43, 44, 45, 46 com cidades e informações de região.',
    cluster: 'ddd'
  },
  'ddd-sc': {
    title: 'DDD Santa Catarina - Lista de Códigos DDD do Estado de SC',
    description: 'Consulte todos os códigos DDD de Santa Catarina. DDDs 47, 48, 49 com cidades catarinenses e cobertura.',
    cluster: 'ddd'
  },
  'ddd-rs': {
    title: 'DDD Rio Grande do Sul - Lista de Códigos DDD do Estado do RS',
    description: 'Consulte todos os códigos DDD do Rio Grande do Sul. DDDs 51, 53, 54, 55 com cidades gaúchas e regiões.',
    cluster: 'ddd'
  },
  'ddd-ba': {
    title: 'DDD Bahia - Lista de Códigos DDD do Estado da BA',
    description: 'Consulte todos os códigos DDD da Bahia. DDDs 71, 73, 74, 75, 77 com cidades baianas e regiões.',
    cluster: 'ddd'
  },
  'ddd-ce': {
    title: 'DDD Ceará - Lista de Códigos DDD do Estado do CE',
    description: 'Consulte todos os códigos DDD do Ceará. DDDs 85, 88 com cidades cearenses e regiões metropolitanas.',
    cluster: 'ddd'
  },
  'ddd-pe': {
    title: 'DDD Pernambuco - Lista de Códigos DDD do Estado de PE',
    description: 'Consulte todos os códigos DDD de Pernambuco. DDDs 81, 87 com cidades pernambucanas, Recife, Caruaru e Petrolina.',
    cluster: 'ddd'
  },
  'ddd-go': {
    title: 'DDD Goiás - Lista de Códigos DDD do Estado de GO',
    description: 'Consulte todos os códigos DDD de Goiás. DDDs 62, 64 com cidades goianas e Entorno do DF.',
    cluster: 'ddd'
  },
  'ddd-es': {
    title: 'DDD Espírito Santo - Lista de Códigos DDD do Estado do ES',
    description: 'Consulte todos os códigos DDD do Espírito Santo. DDDs 27, 28 com cidades capixabas e regiões.',
    cluster: 'ddd'
  },
  'ddd-df': {
    title: 'DDD Distrito Federal (61) - Brasília e Regiões Administrativas',
    description: 'Consulte o código DDD 61 do Distrito Federal (Brasília, Taguatinga, Ceilândia, Águas Claras) e municípios do Entorno.',
    cluster: 'ddd'
  },
  'ddd-pa': {
    title: 'DDD Pará - Lista de Códigos DDD 91, 93 e 94 do Estado do PA',
    description: 'Consulte todos os códigos DDD do Pará: 91 (Belém e Ananindeua), 93 (Santarém) e 94 (Marabá e Carajás) com lista de cidades.',
    cluster: 'ddd'
  },
  'ddd-am': {
    title: 'DDD Amazonas - Lista de Códigos DDD 92 e 97 do Estado do AM',
    description: 'Consulte os códigos DDD do Amazonas: 92 (Manaus, Parintins e Itacoatiara) e 97 (Tefé, Coari e Tabatinga).',
    cluster: 'ddd'
  },
  'ddd-mt': {
    title: 'DDD Mato Grosso - Lista de Códigos DDD 65 e 66 do Estado de MT',
    description: 'Consulte os códigos DDD de Mato Grosso: 65 (Cuiabá e Várzea Grande) e 66 (Rondonópolis, Sinop e Sorriso).',
    cluster: 'ddd'
  },
  'ddd-ms': {
    title: 'DDD Mato Grosso do Sul (67) - Campo Grande, Dourados e Cidades',
    description: 'Consulte o código DDD 67 de Mato Grosso do Sul, cobrindo Campo Grande, Dourados, Três Lagoas, Corumbá e Ponta Porã.',
    cluster: 'ddd'
  },
  'ddd-pb': {
    title: 'DDD Paraíba (83) - João Pessoa, Campina Grande e Todos os Municípios',
    description: 'Consulte o código DDD 83 da Paraíba, abrangendo João Pessoa, Campina Grande, Patos, Cabedelo e todo o estado.',
    cluster: 'ddd'
  },
  'ddd-rn': {
    title: 'DDD Rio Grande do Norte (84) - Natal, Mossoró e Cidades Potiguares',
    description: 'Consulte o código DDD 84 do Rio Grande do Norte, válido para Natal, Mossoró, Parnamirim, Caicó e todas as cidades do RN.',
    cluster: 'ddd'
  },
  'ddd-al': {
    title: 'DDD Alagoas (82) - Maceió, Arapiraca e Cidades Alagoanas',
    description: 'Consulte o código DDD 82 de Alagoas, cobrindo Maceió, Arapiraca, Rio Largo, Maragogi e todos os municípios do estado.',
    cluster: 'ddd'
  },
  'ddd-ma': {
    title: 'DDD Maranhão - Lista de Códigos DDD 98 e 99 do Estado do MA',
    description: 'Consulte os códigos DDD do Maranhão: 98 (São Luís e Região Metropolitana) e 99 (Imperatriz, Caxias e Timon).',
    cluster: 'ddd'
  },
  'ddd-pi': {
    title: 'DDD Piauí - Lista de Códigos DDD 86 e 89 do Estado do PI',
    description: 'Consulte os códigos DDD do Piauí: 86 (Teresina e Parnaíba) e 89 (Picos, Floriano e Bom Jesus).',
    cluster: 'ddd'
  },
  'ddd-se': {
    title: 'DDD Sergipe (79) - Aracaju, Nossa Senhora do Socorro e Cidades',
    description: 'Consulte o código DDD 79 de Sergipe, válido para chamadas para Aracaju, Lagarto, Itabaiana e todo o território sergipano.',
    cluster: 'ddd'
  },
  'ddd-ro': {
    title: 'DDD Rondônia (69) - Porto Velho, Ji-Paraná, Ariquemes e Cidades',
    description: 'Consulte o código DDD 69 de Rondônia, abrangendo Porto Velho, Ji-Paraná, Vilhena, Cacoal e Ariquemes.',
    cluster: 'ddd'
  },
  'ddd-to': {
    title: 'DDD Tocantins (63) - Palmas, Araguaína, Gurupi e Cidades',
    description: 'Consulte o código DDD 63 do Tocantins, válido para Palmas, Araguaína, Gurupi, Porto Nacional e todo o estado.',
    cluster: 'ddd'
  },
  'ddd-ac': {
    title: 'DDD Acre (68) - Rio Branco, Cruzeiro do Sul e Municípios',
    description: 'Consulte o código DDD 68 do Acre, cobrindo Rio Branco, Cruzeiro do Sul, Sena Madureira e Tarauacá.',
    cluster: 'ddd'
  },
  'ddd-ap': {
    title: 'DDD Amapá (96) - Macapá, Santana e Municípios Amapaenses',
    description: 'Consulte o código DDD 96 do Amapá, válido para Macapá, Santana, Laranjal do Jari e Oiapoque.',
    cluster: 'ddd'
  },
  'ddd-rr': {
    title: 'DDD Roraima (95) - Boa Vista e Municípios de Roraima',
    description: 'Consulte o código DDD 95 de Roraima, abrangendo a capital Boa Vista, Rorainópolis, Caracaraí e Pacaraima.',
    cluster: 'ddd'
  },

  // === 2. SALÁRIO MÍNIMO POR ANO ===
  'salario-minimo-1994': {
    title: 'Salário Mínimo em 1994 - Valor e História',
    description: 'Saiba quanto era o salário mínimo em 1994 no Brasil. Valor histórico do piso nacional no ano do Plano Real: R$ 64,79.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-1995': {
    title: 'Salário Mínimo em 1995',
    description: 'Salário mínimo de 1995 no Brasil. Valor do piso nacional e poder de compra no ano seguinte ao Plano Real.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-2000': {
    title: 'Salário Mínimo em 2000',
    description: 'Salário mínimo do ano 2000 no Brasil. R$ 151,00 era o valor do piso salarial nacional.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-2005': {
    title: 'Salário Mínimo em 2005 - Valor e Contexto',
    description: 'Salário mínimo de 2005 no Brasil. Valor de R$ 300,00 e comparação com anos anteriores.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-2010': {
    title: 'Salário Mínimo em 2010',
    description: 'Salário mínimo do ano de 2010 no Brasil. Valor Vigente: R$ 510,00. Compare com o salário mínimo atual.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-2015': {
    title: 'Salário Mínimo em 2015',
    description: 'Salário mínimo de 2015 no Brasil. R$ 788,00 era o valor do piso nacional.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-2020': {
    title: 'Salário Mínimo em 2020',
    description: 'Salário mínimo de 2020 no Brasil. Valor de R$ 1.045,00 vigente durante a pandemia.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-2024': {
    title: 'Salário Mínimo em 2024 - Valor Oficial e Reajuste',
    description: 'Confira o valor oficial do salário mínimo em 2024 no Brasil (R$ 1.412,00), valor diário, valor hora e comparativo histórico.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-2025': {
    title: 'Salário Mínimo em 2025 - Valor Oficial',
    description: 'Salário mínimo de 2025 no Brasil. Confira os valores mensais, diários e por hora do piso salarial nacional.',
    cluster: 'salario-minimo'
  },
  'salario-minimo-2026': {
    title: 'Salário Mínimo 2026 no Brasil - Valor Oficial, Hora, Dia e Desconto INSS',
    description: 'Consulte o valor do Salário Mínimo 2026 no Brasil (R$ 1.518,00), salário-hora (R$ 6,90), salário-dia (R$ 50,60) e tabela de descontos.',
    cluster: 'salario-minimo'
  },

  // === 3. TAXA SELIC POR ANO ===
  'selic-2024': {
    title: 'Taxa SELIC 2024 - Histórico e Variação',
    description: 'Acompanhe a taxa SELIC de 2024. Histórico completo das reuniões do COPOM e a variação da taxa básica de juros ao longo do ano.',
    cluster: 'selic'
  },
  'selic-2025': {
    title: 'Taxa SELIC 2025 - Acompanhamento Mensal',
    description: 'Taxa SELIC de 2025 atualizada. Acompanhe as decisões do COPOM e o impacto nos investimentos em renda fixa.',
    cluster: 'selic'
  },
  'selic-2026': {
    title: 'Taxa SELIC 2026 - Última Reunião COPOM',
    description: 'Taxa SELIC de 2026 em tempo real. Última atualização da taxa básica de juros e projeções para investimentos.',
    cluster: 'selic'
  },

  // === 4. IBGE POR ESTADO ===
  'ibge-sp': {
    title: 'Códigos IBGE do Estado de São Paulo - Todos os Municípios',
    description: 'Consulte todos os códigos IBGE dos municípios do estado de São Paulo. Lista completa com 645 cidades paulistas e seus códigos de 7 dígitos.',
    cluster: 'ibge'
  },
  'ibge-rj': {
    title: 'Códigos IBGE do Estado do Rio de Janeiro',
    description: 'Todos os códigos IBGE dos municípios fluminenses. Consulte o código IBGE de qualquer cidade do RJ para documentos e sistemas.',
    cluster: 'ibge'
  },
  'ibge-mg': {
    title: 'Códigos IBGE do Estado de Minas Gerais',
    description: 'Lista completa de códigos IBGE dos 853 municípios de Minas Gerais. Encontre o código da sua cidade mineira.',
    cluster: 'ibge'
  },
  'ibge-ba': {
    title: 'Códigos IBGE do Estado da Bahia',
    description: 'Consulte os códigos IBGE de todos os municípios da Bahia. Lista completa com 417 cidades baianas e seus códigos.',
    cluster: 'ibge'
  },
  'ibge-pr': {
    title: 'Códigos IBGE do Estado do Paraná',
    description: 'Códigos IBGE dos municípios paranaenses. Consulte o código de 7 dígitos de qualquer cidade do PR.',
    cluster: 'ibge'
  },
  'ibge-rs': {
    title: 'Códigos IBGE do Estado do Rio Grande do Sul',
    description: 'Lista de códigos IBGE dos 497 municípios gaúchos. Encontre o código IBGE da sua cidade no RS.',
    cluster: 'ibge'
  },
  'ibge-sc': {
    title: 'Códigos IBGE do Estado de Santa Catarina',
    description: 'Códigos IBGE de todos os municípios catarinenses. Consulte o código de 7 dígitos para pesquisas e sistemas.',
    cluster: 'ibge'
  },
  'ibge-pe': {
    title: 'Códigos IBGE do Estado de Pernambuco',
    description: 'Lista completa de códigos IBGE dos municípios de Pernambuco. Consulte cidades pernambucanas e seus códigos.',
    cluster: 'ibge'
  },
  'ibge-ce': {
    title: 'Códigos IBGE do Estado do Ceará',
    description: 'Códigos IBGE dos 184 municípios cearenses. Encontre o código IBGE da sua cidade no Ceará.',
    cluster: 'ibge'
  },
  'ibge-df': {
    title: 'Códigos IBGE do Distrito Federal',
    description: 'Código IBGE de Brasília e regiões administrativas do Distrito Federal para documentos, pesquisas e sistemas.',
    cluster: 'ibge'
  },
  'ibge-go': {
    title: 'Códigos IBGE do Estado de Goiás - 246 Municípios',
    description: 'Consulte os códigos IBGE de 7 dígitos de Goiânia, Aparecida de Goiânia, Anápolis e todos os 246 municípios de Goiás para NF-e e SPED.',
    cluster: 'ibge'
  },
  'ibge-pa': {
    title: 'Códigos IBGE do Estado do Pará - 144 Municípios',
    description: 'Lista de códigos IBGE de Belém, Ananindeua, Santarém, Marabá e todos os municípios do Pará para emissão de notas fiscais.',
    cluster: 'ibge'
  },
  'ibge-es': {
    title: 'Códigos IBGE do Estado do Espírito Santo - 78 Municípios',
    description: 'Consulte os códigos IBGE oficiais de Vitória, Vila Velha, Serra, Cariacica e todos os 78 municípios capixabas.',
    cluster: 'ibge'
  },

  // === 5. IPVA 2026 POR ESTADO (ALÍQUOTAS, DESCONTOS E ISENÇÕES) ===
  'ipva-2026-sp': {
    title: 'Alíquota IPVA 2026 SP (São Paulo): Tabela, Cálculo, Desconto e Isenção',
    description: 'Consulte as alíquotas do IPVA 2026 em São Paulo (4% carros passeio, 2% motos e caminhonetes), desconto à vista e regras de isenção por ano.',
    cluster: 'ipva-2026',
    meta: { uf: 'SP', estado: 'São Paulo', carro: '4,0%', moto: '2,0%', utilitario: '2,0%', isencaoAnos: '20 anos de fabricação', descontoVista: '3%' }
  },
  'ipva-2026-rj': {
    title: 'Alíquota IPVA 2026 RJ (Rio de Janeiro): Tabela, Cálculo e Isenção',
    description: 'Veja as alíquotas do IPVA 2026 no Rio de Janeiro (4% carros flex/gasolina, 2% motos, 1,5% GNV), calendário e regras de isenção (15 anos).',
    cluster: 'ipva-2026',
    meta: { uf: 'RJ', estado: 'Rio de Janeiro', carro: '4,0%', moto: '2,0%', utilitario: '3,0%', isencaoAnos: '15 anos de fabricação', descontoVista: '3%' }
  },
  'ipva-2026-mg': {
    title: 'Alíquota IPVA 2026 MG (Minas Gerais): Tabela, Cálculo e Desconto Bom Pagador',
    description: 'Confira as alíquotas do IPVA 2026 em Minas Gerais (4% carros, 2% motos, 3% caminhonetes), desconto à vista e benefício Bom Pagador.',
    cluster: 'ipva-2026',
    meta: { uf: 'MG', estado: 'Minas Gerais', carro: '4,0%', moto: '2,0%', utilitario: '3,0%', isencaoAnos: 'Veículos de placa preta / valor histórico', descontoVista: '3% (+3% Bom Pagador)' }
  },
  'ipva-2026-pr': {
    title: 'Alíquota IPVA 2026 PR (Paraná): Tabela, Cálculo, Desconto e Isenção',
    description: 'Consulte a alíquota do IPVA 2026 no Paraná (3,5% carros e motos, isenção para motos até 170cc e veículos com mais de 20 anos).',
    cluster: 'ipva-2026',
    meta: { uf: 'PR', estado: 'Paraná', carro: '3,5%', moto: '3,5% (Isento até 170cc)', utilitario: '1,0%', isencaoAnos: '20 anos de fabricação', descontoVista: '6%' }
  },
  'ipva-2026-rs': {
    title: 'Alíquota IPVA 2026 RS (Rio Grande do Sul): Tabela, Bom Motorista e Bom Cidadão',
    description: 'Saiba como calcular o IPVA 2026 no Rio Grande do Sul (3% carros, 2% motos), descontos acumulativos de antecipação, Bom Motorista e Nota Fiscal Gaúcha.',
    cluster: 'ipva-2026',
    meta: { uf: 'RS', estado: 'Rio Grande do Sul', carro: '3,0%', moto: '2,0%', utilitario: '2,0%', isencaoAnos: '20 anos de fabricação', descontoVista: 'Até 22,4% acumulando benefícios' }
  },
  'ipva-2026-sc': {
    title: 'Alíquota IPVA 2026 SC (Santa Catarina): Tabela de 2% para Carros e 1% Motos',
    description: 'Consulte a tabela do IPVA 2026 em Santa Catarina, uma das menores alíquotas do Brasil (2% para carros de passeio e 1% para motocicletas).',
    cluster: 'ipva-2026',
    meta: { uf: 'SC', estado: 'Santa Catarina', carro: '2,0%', moto: '1,0%', utilitario: '1,0%', isencaoAnos: '30 anos de fabricação', descontoVista: 'Parcelamento em 3x sem juros' }
  },
  'ipva-2026-ba': {
    title: 'Alíquota IPVA 2026 BA (Bahia): Tabela, Desconto à Vista e Isenção',
    description: 'Confira as alíquotas do IPVA 2026 na Bahia (2,5% carros flex/gasolina, 3% diesel, 1% motos), desconto de antecipação e isenção aos 15 anos.',
    cluster: 'ipva-2026',
    meta: { uf: 'BA', estado: 'Bahia', carro: '2,5% (Flex) / 3,0% (Diesel)', moto: '1,0%', utilitario: '1,5%', isencaoAnos: '15 anos de fabricação', descontoVista: '8%' }
  },
  'ipva-2026-pe': {
    title: 'Alíquota IPVA 2026 PE (Pernambuco): Tabela Unificada 2,4%, Desconto e Isenção',
    description: 'Consulte a alíquota do IPVA 2026 em Pernambuco (2,4% para carros de passeio e 1% a 2% para motos), desconto em cota única e parcelamento em até 10x.',
    cluster: 'ipva-2026',
    meta: { uf: 'PE', estado: 'Pernambuco', carro: '2,4%', moto: '1,0% a 2,0%', utilitario: '2,4%', isencaoAnos: '20 anos de fabricação', descontoVista: '7%' }
  },

  // === 6. CÓDIGOS BANCÁRIOS COMPE & ISPB (ALTA INTENÇÃO DE BUSCA) ===
  'codigo-banco-nubank-260': {
    title: 'Qual o Código do Nubank para TED e DOC? Número 260 e ISPB Oficial',
    description: 'O código do Nubank (Nu Pagamentos S.A.) para transferências TED é 260 e o ISPB é 18236120. Confira agência padrão (0001), CNPJ e regras de transferência.',
    cluster: 'codigo-banco',
    meta: { compe: '260', ispb: '18236120', nome: 'Nu Pagamentos S.A. (Nubank)', agenciaPadrao: '0001', cnpj: '18.236.120/0001-58' }
  },
  'codigo-banco-inter-077': {
    title: 'Qual o Código do Banco Inter para TED? Número 077 e ISPB Oficial',
    description: 'O código de compensação COMPE do Banco Inter S.A. é 077 e o código ISPB é 00416968. Veja agência padrão (0001) e dados para transferência bancária.',
    cluster: 'codigo-banco',
    meta: { compe: '077', ispb: '00416968', nome: 'Banco Inter S.A.', agenciaPadrao: '0001', cnpj: '00.416.968/0001-01' }
  },
  'codigo-banco-caixa-104': {
    title: 'Qual o Código da Caixa Econômica Federal? Número 104, ISPB e Operações',
    description: 'O código da Caixa Econômica Federal (CEF) para TED é 104 e o ISPB é 00360305. Consulte os códigos de operação da Caixa (001, 013, 1288) e CNPJ.',
    cluster: 'codigo-banco',
    meta: { compe: '104', ispb: '00360305', nome: 'Caixa Econômica Federal', agenciaPadrao: 'Conforme agência local', cnpj: '00.360.305/0001-04' }
  },
  'codigo-banco-do-brasil-001': {
    title: 'Qual o Código do Banco do Brasil para TED? Número 001 e ISPB 00000000',
    description: 'O código de compensação do Banco do Brasil S.A. (BB) é 001 e o código ISPB é 00000000. Confira regras de dígito X (substituir por 0) em transferências.',
    cluster: 'codigo-banco',
    meta: { compe: '001', ispb: '00000000', nome: 'Banco do Brasil S.A.', agenciaPadrao: 'Conforme agência (X = 0)', cnpj: '00.000.000/0001-91' }
  },
  'codigo-banco-itau-341': {
    title: 'Qual o Código do Banco Itaú para TED? Número 341 e ISPB 60701190',
    description: 'O código COMPE do Itaú Unibanco S.A. é 341 e o código ISPB é 60701190. Consulte dados completos para TED, PIX e recebimento de salário.',
    cluster: 'codigo-banco',
    meta: { compe: '341', ispb: '60701190', nome: 'Itaú Unibanco S.A.', agenciaPadrao: '4 dígitos sem dígito verificador', cnpj: '60.701.190/0001-04' }
  },
  'codigo-banco-bradesco-237': {
    title: 'Qual o Código do Banco Bradesco para TED? Número 237 e ISPB 60746948',
    description: 'O código de compensação do Banco Bradesco S.A. é 237 e o ISPB é 60746948. Veja como preencher agência e conta em transferências bancárias.',
    cluster: 'codigo-banco',
    meta: { compe: '237', ispb: '60746948', nome: 'Banco Bradesco S.A.', agenciaPadrao: '4 dígitos sem DV', cnpj: '60.746.948/0001-12' }
  },
  'codigo-banco-santander-033': {
    title: 'Qual o Código do Banco Santander para TED? Número 033 e ISPB 90400888',
    description: 'O código COMPE do Banco Santander (Brasil) S.A. é 033 e o código ISPB é 90400888. Confira todos os dados para TED, PIX e folha de pagamento.',
    cluster: 'codigo-banco',
    meta: { compe: '033', ispb: '90400888', nome: 'Banco Santander (Brasil) S.A.', agenciaPadrao: '4 dígitos', cnpj: '90.400.888/0001-42' }
  },
  'codigo-banco-c6-336': {
    title: 'Qual o Código do C6 Bank para TED? Número 336 e ISPB 07450604',
    description: 'O código de compensação COMPE do Banco C6 S.A. (C6 Bank) é 336 e o ISPB é 07450604. Agência padrão 0001 para contas digitais PF e PJ.',
    cluster: 'codigo-banco',
    meta: { compe: '336', ispb: '07450604', nome: 'Banco C6 S.A. (C6 Bank)', agenciaPadrao: '0001', cnpj: '31.872.495/0001-72' }
  },
  'codigo-banco-pagbank-290': {
    title: 'Qual o Código do PagBank PagSeguro para TED? Número 290 e ISPB 10573521',
    description: 'O código COMPE do PagBank (PagSeguro Internet Instituição de Pagamento S.A.) é 290 e o ISPB é 10573521. Agência padrão 0001.',
    cluster: 'codigo-banco',
    meta: { compe: '290', ispb: '10573521', nome: 'PagBank PagSeguro S.A.', agenciaPadrao: '0001', cnpj: '08.561.701/0001-01' }
  },
  'codigo-banco-picpay-380': {
    title: 'Qual o Código do PicPay para TED? Número 380 e ISPB 16501555',
    description: 'O código COMPE do PicPay Instituição de Pagamento S.A. é 380 e o código ISPB é 16501555. Agência padrão 0001 para transferências.',
    cluster: 'codigo-banco',
    meta: { compe: '380', ispb: '16501555', nome: 'PicPay Instituição de Pagamento S.A.', agenciaPadrao: '0001', cnpj: '22.896.431/0001-10' }
  },

  // === 7. TABELAS TRABALHISTAS E PREVIDENCIÁRIAS 2026 ===
  'tabela-inss-2026': {
    title: 'Tabela INSS 2026 Completa: Alíquotas Progressivas, Parcela a Deduzir e Teto',
    description: 'Consulte a Tabela do INSS 2026 atualizada para trabalhadores CLT, avulsos e contribuintes individuais. Faixas de 7,5% a 14% e teto de R$ 8.157,41.',
    cluster: 'tabela-trabalhista'
  },
  'tabela-irrf-2026': {
    title: 'Tabela IRRF 2026 Mensal: Faixas de Isenção, Alíquotas e Dedução por Dependente',
    description: 'Confira a Tabela Progressiva do Imposto de Renda Retido na Fonte (IRRF 2026), desconto simplificado mensal de R$ 564,80 e dedução por dependente.',
    cluster: 'tabela-trabalhista'
  },
  'tabela-seguro-desemprego-2026': {
    title: 'Tabela Seguro-Desemprego 2026: Faixas Salariais, Teto Máximo e Quantidade de Parcelas',
    description: 'Veja como calcular o valor da parcela do Seguro-Desemprego em 2026, piso de R$ 1.518,00, teto máximo e regras para 1ª, 2ª e 3ª solicitação.',
    cluster: 'tabela-trabalhista'
  },
  'aviso-previo-proporcional-tabela': {
    title: 'Tabela de Aviso Prévio Proporcional (Lei 12.506): de 30 a 90 Dias por Ano Trabalhado',
    description: 'Consulte a tabela completa do aviso prévio proporcional ao tempo de serviço (acréscimo de 3 dias por ano trabalhado na empresa até o limite de 90 dias).',
    cluster: 'tabela-trabalhista'
  }
};
