/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Configuração de Links de Afiliado - Amazon e Shopee
 * 
 * COMO USAR:
 * 1. Crie sua conta nos programas de afiliado:
 *    - Amazon: https://affiliate-program.amazon.com.br/
 *    - Shopee: https://shopee.com.br/m/afiliados
 * 2. Gere os links no painel de cada programa
 * 3. Substitua os placeholder links abaixo pelos seus links reais
 * 
 * O sistema exibirá automaticamente os links relevantes em cada ferramenta/página.
 */

export interface AffiliateProduct {
  title: string;
  description?: string;
  amazonUrl?: string;
  shopeeUrl?: string;
  imageUrl?: string;
  price?: string;
}

export interface ToolAffiliateConfig {
  toolId: string;
  amazonCategory?: string;
  shopeeCategory?: string;
  products: AffiliateProduct[];
}

// Mapeamento de ferramentas para produtos de afiliado recomendados
export const TOOL_AFFILIATES: ToolAffiliateConfig[] = [
  {
    toolId: 'consumo-combustivel',
    amazonCategory: 'automotive',
    shopeeCategory: 'automotivo',
    products: [
      {
        title: 'Medidor de Consumo de Combustível Automotivo',
        description: 'Dispositivo para monitorar o consumo em tempo real',
        amazonUrl: 'https://amzn.to/4exemplo-combustivel',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
      {
        title: 'Kit de Manutenção Automotiva',
        description: 'Ferramentas essenciais para o carro',
        amazonUrl: 'https://amzn.to/4exemplo-kit-auto',
      },
    ],
  },
  {
    toolId: 'imc',
    amazonCategory: 'health',
    shopeeCategory: 'saude',
    products: [
      {
        title: 'Balança Digital de Precisão',
        description: 'Balança inteligente com medidor de IMC e gordura corporal',
        amazonUrl: 'https://amzn.to/4exemplo-balanca',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
      {
        title: 'Fita Métrica Corporal',
        description: 'Fita para medição de circunferências corporais',
        amazonUrl: 'https://amzn.to/4exemplo-fita',
      },
    ],
  },
  {
    toolId: 'senha',
    amazonCategory: 'electronics',
    shopeeCategory: 'informatica',
    products: [
      {
        title: 'Gerenciador de Senhas Bitwarden Premium',
        description: 'Proteja todas as suas senhas com criptografia de ponta',
        amazonUrl: 'https://amzn.to/4exemplo-bitwarden',
      },
      {
        title: 'YubiKey 5 NFC - Chave de Segurança Física',
        description: 'Autenticação de dois fatores física para máxima segurança',
        amazonUrl: 'https://amzn.to/4exemplo-yubikey',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
    ],
  },
  {
    toolId: 'juros-compostos',
    amazonCategory: 'books',
    shopeeCategory: 'livros',
    products: [
      {
        title: 'Livro: O Investidor Inteligente - Benjamin Graham',
        description: 'Clássico dos investimentos e juros compostos',
        amazonUrl: 'https://amzn.to/4exemplo-investidor',
      },
      {
        title: 'Calculadora Financeira HP 12C',
        description: 'Calculadora profissional para cálculos financeiros',
        amazonUrl: 'https://amzn.to/4exemplo-hp12c',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
    ],
  },
  {
    toolId: 'real-para-dolar',
    amazonCategory: 'travel',
    shopeeCategory: 'viagem',
    products: [
      {
        title: 'Cartão Internacional Wise',
        description: 'Cartão de débito internacional sem IOF alto',
        amazonUrl: 'https://amzn.to/4exemplo-wise',
      },
      {
        title: 'Cofre Portátil para Viagem',
        description: 'Proteja seu dinheiro durante viagens internacionais',
        amazonUrl: 'https://amzn.to/4exemplo-cofre',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
    ],
  },
  {
    toolId: 'ferias',
    amazonCategory: 'travel',
    shopeeCategory: 'viagem',
    products: [
      {
        title: 'Guia de Viagem: Destinos Brasileiros',
        description: 'Planeje suas férias com dicas imperdíveis',
        amazonUrl: 'https://amzn.to/4exemplo-guia-viagem',
      },
      {
        title: 'Mala de Viagem Bordo 55cm',
        description: 'Mala de bordo ideal para suas férias',
        amazonUrl: 'https://amzn.to/4exemplo-mala',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
    ],
  },
  {
    toolId: 'tmb',
    amazonCategory: 'health',
    shopeeCategory: 'esporte',
    products: [
      {
        title: 'Smartwatch Esportivo com Medição de Calorias',
        description: 'Monitore seus gastos calóricos em tempo real',
        amazonUrl: 'https://amzn.to/4exemplo-smartwatch',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
      {
        title: 'Kit Suplementos: Whey Protein + Creatina',
        description: 'Suplementação para ganho de massa muscular',
        amazonUrl: 'https://amzn.to/4exemplo-whey',
      },
    ],
  },
  {
    toolId: 'qr-code',
    amazonCategory: 'electronics',
    shopeeCategory: 'informatica',
    products: [
      {
        title: 'Leitor de QR Code Profissional',
        description: 'Leitor de alta velocidade para códigos QR',
        amazonUrl: 'https://amzn.to/4exemplo-leitor-qr',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
    ],
  },
  {
    toolId: 'financiamento',
    amazonCategory: 'books',
    shopeeCategory: 'livros',
    products: [
      {
        title: 'Planilha de Controle Financeiro',
        description: 'Planilha completa para organizar suas finanças',
        amazonUrl: 'https://amzn.to/4exemplo-planilha',
      },
      {
        title: 'Livro: Finanças Pessoais para Brasileiros',
        description: 'Aprenda a planejar seus financiamentos',
        amazonUrl: 'https://amzn.to/4exemplo-financas',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
    ],
  },
  {
    toolId: 'porcentagem',
    amazonCategory: 'office',
    shopeeCategory: 'escritorio',
    products: [
      {
        title: 'Calculadora Científica Casio FX-991LA',
        description: 'Calculadora científica com funções de porcentagem',
        amazonUrl: 'https://amzn.to/4exemplo-casio',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
    ],
  },
  {
    toolId: 'regra-de-tres',
    amazonCategory: 'books',
    shopeeCategory: 'livros',
    products: [
      {
        title: 'Matemática Fundamental para Concursos',
        description: 'Livro com regra de três e outros tópicos essenciais',
        amazonUrl: 'https://amzn.to/4exemplo-matematica',
      },
    ],
  },
  {
    toolId: 'cpf',
    amazonCategory: 'software',
    shopeeCategory: 'informatica',
    products: [
      {
        title: 'Curso Completo de Desenvolvimento Web',
        description: 'Aprenda a programar do zero com certificado',
        amazonUrl: 'https://amzn.to/4exemplo-curso-dev',
      },
      {
        title: 'Teclado Mecânico para Programadores',
        description: 'Teclado de alta durabilidade para o dia a dia de código',
        shopeeUrl: 'https://shopee.com.br/product/0000000000000000000',
      },
    ],
  },
];

/**
 * Retorna os produtos de afiliado para uma ferramenta específica
 */
export function getAffiliatesForTool(toolId: string): AffiliateProduct[] | undefined {
  return TOOL_AFFILIATES.find(t => t.toolId === toolId)?.products;
}
