/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Script de geração dos Endpoints JSON Estáticos da API Pública do Tool Brasil.
 * Gera arquivos físicos em /public/api/v1/ e /dist/api/v1/ servidos diretamente via CDN (Custo Zero).
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { TOOLS, CATEGORIES } from '../src/toolsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper para gerar CPF válido com Módulo 11
function generateCPF(formatted = true): string {
  const rnd = (n: number) => Math.floor(Math.random() * n);
  const n = Array.from({ length: 9 }, () => rnd(10));
  
  // Primeiro DV
  let d1 = n.reduce((acc, val, i) => acc + val * (10 - i), 0);
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  
  // Segundo DV
  let d2 = n.reduce((acc, val, i) => acc + val * (11 - i), 0) + d1 * 2;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  
  const raw = `${n.join('')}${d1}${d2}`;
  if (!formatted) return raw;
  return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9, 11)}`;
}

// Helper para gerar CNPJ válido com Módulo 11
function generateCNPJ(formatted = true): string {
  const rnd = (n: number) => Math.floor(Math.random() * n);
  const n = Array.from({ length: 8 }, () => rnd(10));
  const base = [...n, 0, 0, 0, 1]; // filial 0001 padrão
  
  // Primeiro DV
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let d1 = base.reduce((acc, val, i) => acc + val * weights1[i], 0);
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  
  // Segundo DV
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let d2 = [...base, d1].reduce((acc, val, i) => acc + val * weights2[i], 0);
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  
  const raw = `${base.join('')}${d1}${d2}`;
  if (!formatted) return raw;
  return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8, 12)}-${raw.slice(12, 14)}`;
}

export function generateAllApiData() {
  console.log('⚡ Gerando endpoints estáticos da API Pública (Tool Brasil API v1)...');
  const todayIso = new Date().toISOString();

  // 1. /api/v1/cpf/gerar.json
  const cpfsList = Array.from({ length: 10 }, () => {
    const raw = generateCPF(false);
    const formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9, 11)}`;
    const ufDigit = raw[8];
    const ufs: Record<string, string> = {
      '0': 'RS',
      '1': 'DF, GO, MS, MT, TO',
      '2': 'AC, AM, AP, PA, RO, RR',
      '3': 'CE, MA, PI',
      '4': 'AL, PB, PE, RN',
      '5': 'BA, SE',
      '6': 'MG',
      '7': 'ES, RJ',
      '8': 'SP',
      '9': 'PR, SC'
    };
    return {
      cpf: formatted,
      cpf_raw: raw,
      regiao_origem: ufs[ufDigit] || 'Nacional',
      valido: true
    };
  });

  const cpfData = {
    status: 200,
    fonte: 'Tool Brasil - API Pública',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    atualizado_em: todayIso,
    tipo: 'CPF',
    algoritmo: 'Módulo 11 Oficial da Receita Federal',
    aviso: 'Dados sintéticos gerados estritamente para testes de software, QA e homologação. Em conformidade com a LGPD.',
    total: cpfsList.length,
    dados: cpfsList
  };

  // 2. /api/v1/cnpj/gerar.json
  const cnpjsList = Array.from({ length: 10 }, () => {
    const raw = generateCNPJ(false);
    const formatted = `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8, 12)}-${raw.slice(12, 14)}`;
    return {
      cnpj: formatted,
      cnpj_raw: raw,
      tipo_estabelecimento: 'Matriz (0001)',
      valido: true
    };
  });

  const cnpjData = {
    status: 200,
    fonte: 'Tool Brasil - API Pública',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    atualizado_em: todayIso,
    tipo: 'CNPJ',
    algoritmo: 'Módulo 11 Oficial da Receita Federal',
    aviso: 'Dados sintéticos gerados para testes e desenvolvimento de software conforme a LGPD.',
    total: cnpjsList.length,
    dados: cnpjsList
  };

  // 3. /api/v1/tabelas/inss.json
  const inssData = {
    status: 200,
    fonte: 'Tool Brasil - API Pública',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    ano_vigencia: 2026,
    atualizado_em: todayIso,
    tipo: 'Tabela Progressiva INSS CLT',
    teto_contribuicao: 8157.41,
    teto_recolhimento_maximo: 951.62,
    faixas: [
      {
        faixa: 1,
        de: 0.00,
        ate: 1518.00,
        aliquota_percentual: 7.5,
        parcela_deduzir: 0.00
      },
      {
        faixa: 2,
        de: 1518.01,
        ate: 2793.88,
        aliquota_percentual: 9.0,
        parcela_deduzir: 22.77
      },
      {
        faixa: 3,
        de: 2793.89,
        ate: 4190.83,
        aliquota_percentual: 12.0,
        parcela_deduzir: 106.59
      },
      {
        faixa: 4,
        de: 4190.84,
        ate: 8157.41,
        aliquota_percentual: 14.0,
        parcela_deduzir: 190.40
      }
    ]
  };

  // 4. /api/v1/tabelas/irrf.json
  const irrfData = {
    status: 200,
    fonte: 'Tool Brasil - API Pública',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    ano_vigencia: 2026,
    atualizado_em: todayIso,
    tipo: 'Tabela Progressiva IRRF (Imposto de Renda Retido na Fonte)',
    deducao_por_dependente_mensal: 189.59,
    desconto_simplificado_mensal: 564.80,
    faixas: [
      {
        faixa: 1,
        base_de: 0.00,
        base_ate: 2259.20,
        aliquota_percentual: 0.0,
        parcela_a_deduzir: 0.00,
        descricao: 'Isento de retenção'
      },
      {
        faixa: 2,
        base_de: 2259.21,
        base_ate: 2826.65,
        aliquota_percentual: 7.5,
        parcela_a_deduzir: 169.44,
        descricao: 'Alíquota 7,5%'
      },
      {
        faixa: 3,
        base_de: 2826.66,
        base_ate: 3751.05,
        aliquota_percentual: 15.0,
        parcela_a_deduzir: 381.44,
        descricao: 'Alíquota 15%'
      },
      {
        faixa: 4,
        base_de: 3751.06,
        base_ate: 4664.68,
        aliquota_percentual: 22.5,
        parcela_a_deduzir: 662.77,
        descricao: 'Alíquota 22,5%'
      },
      {
        faixa: 5,
        base_de: 4664.69,
        base_ate: null,
        aliquota_percentual: 27.5,
        parcela_a_deduzir: 896.00,
        descricao: 'Alíquota máxima 27,5%'
      }
    ]
  };

  // 5. /api/v1/tabelas/salario-minimo.json
  const salarioMinimoData = {
    status: 200,
    fonte: 'Tool Brasil - API Pública',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    atualizado_em: todayIso,
    vigente: {
      ano: 2026,
      valor_mensal: 1518.00,
      valor_diario: 50.60,
      valor_hora: 6.90
    },
    historico: [
      { ano: 2026, valor: 1518.00, norma: 'Lei Orçamentária 2026' },
      { ano: 2025, valor: 1412.00, norma: 'Decreto nº 11.864/2023' },
      { ano: 2024, valor: 1412.00, norma: 'Decreto nº 11.864/2023' },
      { ano: 2023, valor: 1320.00, norma: 'Medida Provisória nº 1.172/2023' },
      { ano: 2022, valor: 1212.00, norma: 'Medida Provisória nº 1.091/2021' },
      { ano: 2021, valor: 1100.00, norma: 'Medida Provisória nº 1.021/2020' },
      { ano: 2020, valor: 1045.00, norma: 'Medida Provisória nº 919/2020' },
      { ano: 2015, valor: 788.00, norma: 'Decreto nº 8.381/2014' },
      { ano: 2010, valor: 510.00, norma: 'Medida Provisória nº 474/2009' },
      { ano: 2005, valor: 300.00, norma: 'Medida Provisória nº 248/2005' },
      { ano: 2000, valor: 151.00, norma: 'Medida Provisória nº 2.019/2000' },
      { ano: 1994, valor: 64.79, norma: 'Início do Plano Real (URV)' }
    ]
  };

  // 6. /api/v1/dados/bancos.json
  const bancosData = {
    status: 200,
    fonte: 'Tool Brasil - API Pública',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    atualizado_em: todayIso,
    total: 20,
    bancos: [
      { codigo_compe: "001", ispb: "00000000", nome: "Banco do Brasil S.A.", nome_extenso: "Banco do Brasil" },
      { codigo_compe: "237", ispb: "60746948", nome: "Banco Bradesco S.A.", nome_extenso: "Bradesco" },
      { codigo_compe: "341", ispb: "60701190", nome: "Itaú Unibanco S.A.", nome_extenso: "Itaú" },
      { codigo_compe: "104", ispb: "00360305", nome: "Caixa Econômica Federal", nome_extenso: "Caixa" },
      { codigo_compe: "033", ispb: "90400888", nome: "Banco Santander (Brasil) S.A.", nome_extenso: "Santander" },
      { codigo_compe: "260", ispb: "18236120", nome: "Nu Pagamentos S.A. (Nubank)", nome_extenso: "Nubank" },
      { codigo_compe: "077", ispb: "00416968", nome: "Banco Inter S.A.", nome_extenso: "Banco Inter" },
      { codigo_compe: "290", ispb: "10573521", nome: "PagBank PagSeguro S.A.", nome_extenso: "PagBank" },
      { codigo_compe: "380", ispb: "16501555", nome: "PicPay Instituição de Pagamento S.A.", nome_extenso: "PicPay" },
      { codigo_compe: "212", ispb: "04902979", nome: "Banco Original S.A.", nome_extenso: "Banco Original" },
      { codigo_compe: "336", ispb: "07450604", nome: "Banco C6 S.A.", nome_extenso: "C6 Bank" },
      { codigo_compe: "422", ispb: "58160789", nome: "Banco Safra S.A.", nome_extenso: "Banco Safra" },
      { codigo_compe: "756", ispb: "02038232", nome: "Banco Cooperativo Sicoob S.A.", nome_extenso: "Sicoob" },
      { codigo_compe: "748", ispb: "01181521", nome: "Banco Cooperativo Sicredi S.A.", nome_extenso: "Sicredi" },
      { codigo_compe: "655", ispb: "07207996", nome: "Banco Votorantim S.A. (BV)", nome_extenso: "BV Financeira" },
      { codigo_compe: "208", ispb: "33479023", nome: "Banco BTG Pactual S.A.", nome_extenso: "BTG Pactual" },
      { codigo_compe: "041", ispb: "92702067", nome: "Banco do Estado do Rio Grande do Sul S.A.", nome_extenso: "Banrisul" },
      { codigo_compe: "070", ispb: "00000208", nome: "Banco de Brasília S.A.", nome_extenso: "BRB" },
      { codigo_compe: "004", ispb: "07237373", nome: "Banco do Nordeste do Brasil S.A.", nome_extenso: "BNB" },
      { codigo_compe: "021", ispb: "04913711", nome: "Banco Banestes S.A.", nome_extenso: "Banestes" }
    ]
  };

  // 7. /api/v1/dados/ddds.json
  const dddsData = {
    status: 200,
    fonte: 'Tool Brasil - API Pública',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    atualizado_em: todayIso,
    total_estados: 27,
    ddds: [
      { uf: "SP", estado: "São Paulo", codigos: [11, 12, 13, 14, 15, 16, 17, 18, 19], capital_ddd: 11 },
      { uf: "RJ", estado: "Rio de Janeiro", codigos: [21, 22, 24], capital_ddd: 21 },
      { uf: "ES", estado: "Espírito Santo", codigos: [27, 28], capital_ddd: 27 },
      { uf: "MG", estado: "Minas Gerais", codigos: [31, 32, 33, 34, 35, 37, 38], capital_ddd: 31 },
      { uf: "PR", estado: "Paraná", codigos: [41, 42, 43, 44, 45, 46], capital_ddd: 41 },
      { uf: "SC", estado: "Santa Catarina", codigos: [47, 48, 49], capital_ddd: 48 },
      { uf: "RS", estado: "Rio Grande do Sul", codigos: [51, 53, 54, 55], capital_ddd: 51 },
      { uf: "DF", estado: "Distrito Federal", codigos: [61], capital_ddd: 61 },
      { uf: "GO", estado: "Goiás", codigos: [62, 64], capital_ddd: 62 },
      { uf: "TO", estado: "Tocantins", codigos: [63], capital_ddd: 63 },
      { uf: "MT", estado: "Mato Grosso", codigos: [65, 66], capital_ddd: 65 },
      { uf: "MS", estado: "Mato Grosso do Sul", codigos: [67], capital_ddd: 67 },
      { uf: "AC", estado: "Acre", codigos: [68], capital_ddd: 68 },
      { uf: "RO", estado: "Rondônia", codigos: [69], capital_ddd: 69 },
      { uf: "BA", estado: "Bahia", codigos: [71, 73, 74, 75, 77], capital_ddd: 71 },
      { uf: "SE", estado: "Sergipe", codigos: [79], capital_ddd: 79 },
      { uf: "PE", estado: "Pernambuco", codigos: [81, 87], capital_ddd: 81 },
      { uf: "AL", estado: "Alagoas", codigos: [82], capital_ddd: 82 },
      { uf: "PB", estado: "Paraíba", codigos: [83], capital_ddd: 83 },
      { uf: "RN", estado: "Rio Grande do Norte", codigos: [84], capital_ddd: 84 },
      { uf: "CE", estado: "Ceará", codigos: [85, 88], capital_ddd: 85 },
      { uf: "PI", estado: "Piauí", codigos: [86, 89], capital_ddd: 86 },
      { uf: "MA", estado: "Maranhão", codigos: [98, 99], capital_ddd: 98 },
      { uf: "PA", estado: "Pará", codigos: [91, 93, 94], capital_ddd: 91 },
      { uf: "AP", estado: "Amapá", codigos: [96], capital_ddd: 96 },
      { uf: "AM", estado: "Amazonas", codigos: [92, 97], capital_ddd: 92 },
      { uf: "RR", estado: "Roraima", codigos: [95], capital_ddd: 95 }
    ]
  };

  // 8. /api/v1/dados/feriados-nacionais.json
  const feriadosData = {
    status: 200,
    fonte: 'Tool Brasil - API Pública',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    ano_referencia: 2026,
    atualizado_em: todayIso,
    feriados: [
      { data: "2026-01-01", nome: "Confraternização Universal (Ano Novo)", tipo: "Nacional" },
      { data: "2026-02-17", nome: "Carnaval", tipo: "Ponto Facultativo" },
      { data: "2026-04-03", nome: "Sexta-feira Santa (Paixão de Cristo)", tipo: "Nacional" },
      { data: "2026-04-21", nome: "Tiradentes", tipo: "Nacional" },
      { data: "2026-05-01", nome: "Dia Mundial do Trabalho", tipo: "Nacional" },
      { data: "2026-06-04", nome: "Corpus Christi", tipo: "Ponto Facultativo" },
      { data: "2026-09-07", nome: "Independência do Brasil", tipo: "Nacional" },
      { data: "2026-10-12", nome: "Nossa Senhora Aparecida (Padroeira do Brasil)", tipo: "Nacional" },
      { data: "2026-11-02", nome: "Finados", tipo: "Nacional" },
      { data: "2026-11-15", nome: "Proclamação da República", tipo: "Nacional" },
      { data: "2026-11-20", nome: "Dia Nacional de Zumbi e da Consciência Negra", tipo: "Nacional" },
      { data: "2026-12-25", nome: "Natal", tipo: "Nacional" }
    ]
  };

  // 9. /api/v1/ferramentas.json
  const ferramentasData = {
    status: 200,
    fonte: 'Tool Brasil - Catálogo Completo',
    url: 'https://www.toolbrasil.com.br',
    documentacao: 'https://www.toolbrasil.com.br/desenvolvedores',
    atualizado_em: todayIso,
    total_ferramentas: TOOLS.length,
    categorias: CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').map(c => ({
      id: c.id,
      nome: c.name,
      descricao: c.description,
      total_ferramentas: TOOLS.filter(t => t.categoryId === c.id).length
    })),
    ferramentas: TOOLS.map(t => ({
      id: t.id,
      categoria: t.categoryId,
      titulo: t.title,
      descricao: t.shortDescription,
      url: `https://www.toolbrasil.com.br/${t.categoryId}/${t.slug}`
    }))
  };

  // Escrever os arquivos tanto em public/api/v1/ quanto em dist/api/v1/
  const targets = [
    path.resolve(ROOT_DIR, 'public', 'api', 'v1'),
    path.resolve(ROOT_DIR, 'dist', 'api', 'v1')
  ];

  const filesMap: Record<string, any> = {
    'cpf/gerar.json': cpfData,
    'cnpj/gerar.json': cnpjData,
    'tabelas/inss.json': inssData,
    'tabelas/irrf.json': irrfData,
    'tabelas/salario-minimo.json': salarioMinimoData,
    'dados/bancos.json': bancosData,
    'dados/ddds.json': dddsData,
    'dados/feriados-nacionais.json': feriadosData,
    'ferramentas.json': ferramentasData
  };

  targets.forEach(baseDir => {
    Object.entries(filesMap).forEach(([relPath, data]) => {
      const fullPath = path.join(baseDir, relPath);
      const parentDir = path.dirname(fullPath);
      fs.mkdirSync(parentDir, { recursive: true });
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
    });
  });

  console.log(`✅ ${Object.keys(filesMap).length} endpoints JSON estáticos gerados com sucesso em /public/api/v1 e /dist/api/v1!`);
}

// Se executado diretamente via terminal
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateAllApiData();
}
