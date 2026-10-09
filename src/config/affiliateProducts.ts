/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Catálogo e Sistema de Rotação Automática de Produtos Afiliados da Amazon
 * Tool Brasil (toolbrasil.com.br)
 * 
 * Regra: Rotação a cada 3 dias sem necessidade de backend, baseada em dias desde o Epoch.
 * Tag oficial de associado: configurável via VITE_AMAZON_ASSOCIATE_TAG (padrão: chacerto-20)
 */

export const AMAZON_ASSOCIATE_TAG = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_AMAZON_ASSOCIATE_TAG)
    ? import.meta.env.VITE_AMAZON_ASSOCIATE_TAG
    : (typeof process !== 'undefined' && process.env && process.env.VITE_AMAZON_ASSOCIATE_TAG)
      ? process.env.VITE_AMAZON_ASSOCIATE_TAG
      : 'chacerto-20';

export const ROTATION_DAYS = 3;

export type AffiliateCategory = 
  | 'financas' 
  | 'trabalhista' 
  | 'tecnologia' 
  | 'escritorio' 
  | 'construcao' 
  | 'saude' 
  | 'veiculos' 
  | 'utilitarios';

export interface AffiliateProduct {
  id: string;
  title: string;
  benefit: string;
  query: string;
  category: AffiliateCategory;
  badge?: string;
}

export const AFFILIATE_PRODUCTS: Record<AffiliateCategory, AffiliateProduct[]> = {
  financas: [
    {
      id: 'calculadora-financeira-hp12c',
      title: 'Calculadora Financeira HP 12C Gold Original',
      benefit: 'Padrão ouro do mercado financeiro para cálculo de juros compostos, amortização SAC/Price, VPL, TIR e fluxo de caixa.',
      query: 'Calculadora Financeira HP 12C Gold Original',
      category: 'financas',
      badge: 'Padrão de Mercado'
    },
    {
      id: 'livro-investidor-inteligente',
      title: 'Livro: O Investidor Inteligente (Benjamin Graham)',
      benefit: 'O maior clássico de investimentos e gestão patrimonial de todos os tempos, prefaciado por Warren Buffett.',
      query: 'Livro O Investidor Inteligente Benjamin Graham',
      category: 'financas',
      badge: 'Leitura Essencial'
    },
    {
      id: 'livro-psicologia-financeira',
      title: 'Livro: A Psicologia Financeira (Morgan Housel)',
      benefit: 'Lições atemporais e comportamentais sobre fortuna, ganância, tomada de decisões racionais e tranquilidade com dinheiro.',
      query: 'Livro A Psicologia Financeira Morgan Housel',
      category: 'financas',
      badge: 'Best-Seller'
    }
  ],

  trabalhista: [
    {
      id: 'clt-comentada-atualizada',
      title: 'CLT Comentada & Legislação Trabalhista Atualizada',
      benefit: 'Guia essencial para profissionais de RH, advogados, contadores e empregados consultarem direitos, férias e rescisões.',
      query: 'CLT Comentada Legislacao Trabalhista Atualizada',
      category: 'trabalhista',
      badge: 'Rigor Normativo'
    },
    {
      id: 'relogio-ponto-biometrico',
      title: 'Relógio de Ponto Biométrico e Cartão de Proximidade',
      benefit: 'Controle rigoroso e seguro da jornada de trabalho e horas extras da sua equipe em conformidade com as normas do MTE.',
      query: 'Relogio Ponto Biometrico Homologado MTE',
      category: 'trabalhista',
      badge: 'Gestão de RH'
    },
    {
      id: 'livro-manual-pratico-dp',
      title: 'Manual Prático de Departamento Pessoal e eSocial',
      benefit: 'Passo a passo descomplicado para apuração de folha de pagamento, encargos sociais (INSS, FGTS, IRRF) e benefícios.',
      query: 'Manual Pratico Departamento Pessoal eSocial',
      category: 'trabalhista',
      badge: 'Prática de DP'
    }
  ],

  tecnologia: [
    {
      id: 'suporte-ergonomico-notebook-ajustavel',
      title: 'Suporte Ergonômico Ajustável em Alumínio para Notebook',
      benefit: 'Eleva a tela à altura dos olhos, previne dores no pescoço e coluna, e melhora a refrigeração do seu computador portátil.',
      query: 'Suporte Ergonomico Ajustavel Alumínio Notebook',
      category: 'tecnologia',
      badge: 'Ergonomia & Conforto'
    },
    {
      id: 'combo-teclado-mouse-sem-fio',
      title: 'Combo Teclado e Mouse Sem Fio Silencioso',
      benefit: 'Livre-se de cabos na sua mesa de trabalho com digitação ágil, macia e autonomia estendida de bateria.',
      query: 'Combo Teclado Mouse Sem Fio Silencioso',
      category: 'tecnologia',
      badge: 'Produtividade Diária'
    },
    {
      id: 'hub-usb-c-multiportas-4k',
      title: 'Adaptador Hub USB-C Multiportas com Saída HDMI 4K',
      benefit: 'Conecte monitores externos, pendrives, cabos de rede e carregamento rápido de notebooks com um único cabo USB-C.',
      query: 'Hub USB-C Multiportas HDMI 4K Adaptador',
      category: 'tecnologia',
      badge: 'Conectividade Total'
    }
  ],

  escritorio: [
    {
      id: 'calculadora-cientifica-casio',
      title: 'Calculadora Científica Casio FX-991LA CW',
      benefit: 'Equipada com centenas de funções matemáticas, matrizes, estatística, equações e visor LCD de alta definição.',
      query: 'Calculadora Cientifica Casio FX-991LA',
      category: 'escritorio',
      badge: 'Precisão & Exatidão'
    },
    {
      id: 'organizador-mesa-home-office',
      title: 'Organizador de Mesa e Gaveteiro para Escritório',
      benefit: 'Mantenha canetas, blocos, carimbos e notas fiscais organizados para um fluxo de trabalho limpo e focado.',
      query: 'Organizador de Mesa Escritorio Home Office',
      category: 'escritorio',
      badge: 'Organização'
    },
    {
      id: 'fragmentadora-papel-documentos',
      title: 'Fragmentadora de Papel e Cartões de Crédito',
      benefit: 'Destruição segura de documentos confidenciais, contracheques e papéis sensíveis em conformidade com a LGPD.',
      query: 'Fragmentadora de Papel Cartao Escritorio',
      category: 'escritorio',
      badge: 'Segurança & LGPD'
    }
  ],

  construcao: [
    {
      id: 'trena-laser-digital-precisao',
      title: 'Trena Laser Digital de Precisão 40m com Nível',
      benefit: 'Meça paredes, cômodos, áreas e volumes de pisos e revestimentos em segundos com apenas um clique e alta exatidão.',
      query: 'Trena Laser Digital 40 Metros Nivel',
      category: 'construcao',
      badge: 'Obras & Reformas'
    },
    {
      id: 'paquimetro-digital-inox',
      title: 'Paquímetro Digital de Precisão em Aço Inox',
      benefit: 'Instrumento cirúrgico para medição de espessuras, diâmetros internos, externos e profundidade com leitura decimal instantânea.',
      query: 'Paquimetro Digital Aco Inox Precisao',
      category: 'construcao',
      badge: 'Medição Técnica'
    },
    {
      id: 'nivel-laser-autonivelante',
      title: 'Nível a Laser Autonivelante com Linhas Cruzadas',
      benefit: 'Alinhamento milimétrico para instalação de cerâmicas, armários planejados, quadros e divisórias de drywall.',
      query: 'Nivel a Laser Autonivelante Linhas Cruzadas',
      category: 'construcao',
      badge: 'Alinhamento Perfeito'
    }
  ],

  saude: [
    {
      id: 'balanca-bioimpedancia-digital-bluetooth',
      title: 'Balança Digital de Bioimpedância com App Bluetooth',
      benefit: 'Monitore peso, percentual de gordura corporal, massa muscular, água, IMC e taxa metabólica basal no smartphone.',
      query: 'Balança Bioimpedância Digital Bluetooth App',
      category: 'saude',
      badge: 'Monitoramento Corporal'
    },
    {
      id: 'fita-metrica-corporal-precisao',
      title: 'Fita Métrica Corporal com Trava Retrátil',
      benefit: 'Acompanhe a evolução de medidas de cintura, quadril e membros sem folgas ou erros manuais na medição.',
      query: 'Fita Metrica Corporal Trava Retratil',
      category: 'saude',
      badge: 'Avaliação Física'
    },
    {
      id: 'garrafa-termica-agua-inox-1l',
      title: 'Garrafa Térmica em Aço Inox com Isolamento a Vácuo 1L',
      benefit: 'Conserve água gelada por até 24 horas para atingir com facilidade sua meta diária de consumo de líquidos.',
      query: 'Garrafa Termica Inox Vacuo 1 Litro',
      category: 'saude',
      badge: 'Hidratação Diária'
    }
  ],

  veiculos: [
    {
      id: 'scanner-automotivo-obd2-bluetooth',
      title: 'Scanner Automotivo Diagnóstico OBD2 Bluetooth',
      benefit: 'Identifique falhas na injeção eletrônica, consumo anômalo de combustível e apague luzes de alerta do painel direto no celular.',
      query: 'Scanner Automotivo OBD2 Bluetooth Diagnostico',
      category: 'veiculos',
      badge: 'Diagnóstico Veicular'
    },
    {
      id: 'calibrador-digital-pneus-portatil',
      title: 'Compressor de Ar e Calibrador Digital Portátil para Pneus',
      benefit: 'Mantenha a calibragem ideal dos pneus do carro ou moto, economizando até 10% de combustível e evitando desgastes.',
      query: 'Compressor Ar Portatil Digital Calibrador Pneus',
      category: 'veiculos',
      badge: 'Economia & Segurança'
    },
    {
      id: 'suporte-celular-veicular-inducao',
      title: 'Suporte Veicular para Celular com Trava Automática',
      benefit: 'Apoio firme e estável no painel para navegação GPS pelo Waze ou Google Maps com segurança enquanto dirige.',
      query: 'Suporte Celular Veicular Trava Automatica',
      category: 'veiculos',
      badge: 'Praticidade no Trânsito'
    }
  ],

  utilitarios: [
    {
      id: 'wattimetro-medidor-consumo-energia',
      title: 'Wattímetro Digital Medidor de Consumo de Energia Elétrica',
      benefit: 'Descubra exatamente quanto cada eletrodoméstico gasta em kWh e na fatura de energia elétrica da sua casa.',
      query: 'Wattimetro Digital Medidor Consumo Energia Eletrica Tomada',
      category: 'utilitarios',
      badge: 'Economia na Conta de Luz'
    },
    {
      id: 'balanca-digital-cozinha-alta-precisao',
      title: 'Balança Digital de Cozinha com Alta Precisão (1g a 10kg)',
      benefit: 'Pese ingredientes com precisão exata para receitas culinárias perfeitas, controle de macros e preparo de porções.',
      query: 'Balanca Digital Cozinha Alta Precisao 10kg',
      category: 'utilitarios',
      badge: 'Precisão na Cozinha'
    },
    {
      id: 'leitor-codigo-barras-qrcode-usb',
      title: 'Leitor de Código de Barras e QR Code USB',
      benefit: 'Agilize o pagamento de boletos, conferência de notas fiscais e controle de estoques em segundos sem digitação manual.',
      query: 'Leitor Codigo de Barras QR Code USB',
      category: 'utilitarios',
      badge: 'Automação & Boletos'
    }
  ]
};

/**
 * Normaliza qualquer categoria ou ID de ferramenta da Tool Brasil
 * para o grupo correspondente de produtos afiliados da Amazon.
 */
export function normalizeAffiliateCategory(category?: string, toolId?: string): AffiliateCategory {
  const tId = (toolId || '').toLowerCase().trim();
  const cId = (category || '').toLowerCase().trim();

  // 1. Checagens específicas por ID de ferramenta
  if (
    tId.includes('rescisao') ||
    tId.includes('ferias') ||
    tId.includes('inss') ||
    tId.includes('irrf') ||
    tId.includes('salario') ||
    tId.includes('decimo-terceiro') ||
    tId.includes('dsr') ||
    tId.includes('adicional') ||
    tId.includes('banco-de-horas') ||
    tId.includes('faltas') ||
    tId.includes('aviso-previo')
  ) {
    return 'trabalhista';
  }

  if (
    tId.includes('juros') ||
    tId.includes('financiamento') ||
    tId.includes('preco-de-venda') ||
    tId.includes('desconto') ||
    tId.includes('emprestimo') ||
    tId.includes('move-brasil') ||
    tId.includes('dolar') ||
    tId.includes('euro') ||
    tId.includes('libra') ||
    tId.includes('moeda') ||
    tId.includes('selic') ||
    tId.includes('bancos')
  ) {
    return 'financas';
  }

  if (
    tId.includes('imc') ||
    tId.includes('caloria') ||
    tId.includes('agua') ||
    tId.includes('ovulacao') ||
    tId.includes('peso')
  ) {
    return 'saude';
  }

  if (
    tId.includes('combustivel') ||
    tId.includes('veiculo') ||
    tId.includes('alcool') ||
    tId.includes('gasolina') ||
    tId.includes('viagem')
  ) {
    return 'veiculos';
  }

  if (
    tId.includes('tijolo') ||
    tId.includes('argamassa') ||
    tId.includes('piso') ||
    tId.includes('revestimento') ||
    tId.includes('tinta') ||
    tId.includes('pintura') ||
    tId.includes('btu') ||
    tId.includes('medida') ||
    tId.includes('metros')
  ) {
    return 'construcao';
  }

  if (
    tId.includes('ip') ||
    tId.includes('velocidade') ||
    tId.includes('dns') ||
    tId.includes('port') ||
    tId.includes('senha') ||
    tId.includes('cpf') ||
    tId.includes('cnpj') ||
    tId.includes('qr-code') ||
    tId.includes('base64') ||
    tId.includes('descomplica-contrato')
  ) {
    return 'tecnologia';
  }

  // 2. Checagens por Categoria do Portal
  switch (cId) {
    case 'calculadoras':
      return 'financas';
    case 'conversores':
      return 'construcao';
    case 'geradores':
      return 'tecnologia';
    case 'ferramentas-web':
      return 'tecnologia';
    case 'utilitarios':
      return 'utilitarios';
    default:
      return 'financas';
  }
}

/**
 * Gera o link oficial de busca de afiliado na Amazon com a tag especificada.
 */
export function getAmazonAffiliateUrl(query: string, tag: string = AMAZON_ASSOCIATE_TAG): string {
  return `https://www.amazon.com.br/s?k=${encodeURIComponent(query)}&tag=${tag}`;
}

/**
 * Seleciona o produto do catálogo com base na rotação matemática a cada 3 dias.
 * Fórmula:
 *   daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
 *   productIndex = Math.floor(daysSinceEpoch / ROTATION_DAYS) % products.length;
 */
export function getRotatedProduct(
  category?: string, 
  toolId?: string, 
  nowMs: number = Date.now()
): {
  product: AffiliateProduct;
  affiliateUrl: string;
  productIndex: number;
} {
  const normalizedCategory = normalizeAffiliateCategory(category, toolId);
  const products = AFFILIATE_PRODUCTS[normalizedCategory] || AFFILIATE_PRODUCTS.financas;
  
  const daysSinceEpoch = Math.floor(nowMs / (1000 * 60 * 60 * 24));
  const productIndex = Math.floor(daysSinceEpoch / ROTATION_DAYS) % products.length;
  const product = products[productIndex];
  const affiliateUrl = getAmazonAffiliateUrl(product.query, AMAZON_ASSOCIATE_TAG);

  return {
    product,
    affiliateUrl,
    productIndex
  };
}
