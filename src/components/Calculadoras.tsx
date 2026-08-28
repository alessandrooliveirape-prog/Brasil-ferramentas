/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ShareBar from './ShareBar';
import { getParamNumber, getParamString, getParamBoolean, syncUrlParams } from '../utils/urlParams';

interface CalculadorasProps {
  toolId: string;
}

export default function Calculadoras({ toolId }: CalculadorasProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm" id="calculadora-container">
      {toolId === 'churrasco' && <CalculadoraChurrasco />}
      {toolId === 'custo-energia' && <CalculadoraEnergia />}
      {toolId === 'horas-trabalhadas' && <CalculadoraHorasTrabalhadas />}
      {toolId === 'juros-compostos' && <JurosCompostos />}
      {toolId === 'juros-simples' && <JurosSimples />}
      {toolId === 'financiamento' && <Financiamento />}
      {toolId === 'fgts' && <Fgts />}
      {toolId === 'inss' && <Inss />}
      {toolId === 'ferias' && <Ferias />}
      {toolId === 'rescisao' && <Rescisao />}
      {toolId === 'decimo-terceiro' && <DecimoTerceiro />}
      {toolId === 'imc' && <Imc />}
      {toolId === 'consumo-combustivel' && <ConsumoCombustivel />}
      {(toolId === 'regra-de-tres' || toolId === 'regra-de-tre') && <RegraDeTres />}
      {toolId === 'porcentagem' && <Porcentagem />}
      {toolId === 'idade' && <IdadeExata />}
      {toolId === 'dias-entre-datas' && <DiasEntreDatas />}
      {toolId === 'hora-extra' && <HoraExtra />}
      {toolId === 'seguro-desemprego' && <SeguroDesemprego />}
      {toolId === 'salario-liquido' && <SalarioLiquido />}
      {toolId === 'ipva' && <CalculadoraIPVA />}
      {toolId === 'imposto-renda' && <CalculadoraIRPF />}
      {toolId === 'multa-transito' && <CalculadoraMultaTransito />}
      {toolId === 'preco-por-km' && <CalculadoraPrecoPorKm />}
      {toolId === 'gestacao' && <CalculadoraGestacao />}
      {toolId === 'tmb' && <CalculadoraTMB />}
      {toolId === 'margem-lucro' && <CalculadoraMargemLucro />}
      {toolId === 'gorjeta' && <CalculadoraGorjeta />}
      {toolId === 'aposentadoria-inss' && <CalculadoraAposentadoria />}
      {toolId === 'pis-pasep' && <CalculadoraPisPasep />}
      {toolId === 'icms' && <CalculadoraICMS />}
      {toolId === 'itbi' && <CalculadoraITBI />}
      {toolId === 'itcmd' && <CalculadoraITCMD />}
      {toolId === 'preco-venda' && <CalculadoraPrecoVenda />}
      {toolId === 'periculosidade' && <CalculadoraPericulosidade />}
      {toolId === 'insalubridade' && <CalculadoraInsalubridade />}
      {toolId === 'idade-canina' && <CalculadoraIdadeCanina />}
      {toolId === 'calorias-diarias' && <CalculadoraCaloriasDiarias />}
      {toolId === 'nota-enem' && <CalculadoraNotaEnem />}
      {toolId === 'move-brasil' && <CalculadoraMoveBrasil />}
      {toolId === 'clt-vs-pj' && <CalculadoraCLTvsPJ />}
      {toolId === 'emprestimo-consignado' && <CalculadoraConsignado />}
      {toolId === 'financiamento-veiculos' && <SimuladorVeiculos />}
      {toolId === 'alcool-ou-gasolina' && <CalculadoraFlex />}
      {toolId === 'dsr' && <CalculadoraDsr />}
      {toolId === 'adicional-noturno' && <CalculadoraAdicionalNoturno />}
      {toolId === 'salario-proporcional' && <CalculadoraSalarioProporcional />}
      {toolId === 'ovulacao-periodo-fertil' && <CalculadoraOvulacao />}
      {toolId === 'calculadora-tinta' && <CalculadoraTinta />}
      {toolId === 'calculadora-piso' && <CalculadoraPiso />}
      {toolId === 'agua-diaria' && <CalculadoraAguaDiaria />}
      {toolId === 'ponto-banco-horas' && <CalculadoraPontoBancoHoras />}
      {toolId === 'desconto-vista-parcelado' && <CalculadoraDescontoVistaParcelado />}
      {toolId === 'calculadora-ferias-proporcionais' && <CalculadoraFeriasProporcionais />}
      {toolId === 'calculadora-aviso-previo' && <CalculadoraAvisoPrevio />}
      {toolId === 'calculadora-tijolos-argamassa' && <CalculadoraTijolosArgamassa />}
      {toolId === 'calculadora-preco-combustivel-viagem' && <CalculadoraCombustivelViagem />}
      {toolId === 'calculadora-potencia-ar-condicionado' && <CalculadoraBtusArCondicionado />}
    </div>
  );
}

// 42. CALCULADORA DE EMPRÉSTIMO CONSIGNADO
function CalculadoraConsignado() {
  const [salarioLiquido, setSalarioLiquido] = useState<number>(3000);
  const [valorEmprestimo, setValorEmprestimo] = useState<number>(10000);
  const [taxaJurosMensal, setTaxaJurosMensal] = useState<number>(1.66);
  const [meses, setMeses] = useState<number>(84);

  const i = (taxaJurosMensal || 0) / 100;
  const n = meses || 84;
  const P = valorEmprestimo || 0;

  // Formula PMT: P * [i*(1+i)^n] / [(1+i)^n - 1]
  let pmt = 0;
  if (i > 0 && n > 0 && P > 0) {
    pmt = P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  }

  const totalPago = pmt * n;
  const totalJuros = totalPago - P;
  const margemConsignavel35 = salarioLiquido * 0.35;
  const margemUltrapassada = pmt > margemConsignavel35;
  const taxaEfetivaAnual = (Math.pow(1 + i, 12) - 1) * 100;

  return (
    <div className="space-y-6" id="calc-consignado">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Empréstimo Consignado</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Simule o valor da parcela mensal, margem consignável (35%) e total de juros pagos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Renda Líquida / Benefício INSS (R$)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={salarioLiquido} 
            onChange={(e) => setSalarioLiquido(Number(e.target.value))} 
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Valor do Empréstimo Desejado (R$)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={valorEmprestimo} 
            onChange={(e) => setValorEmprestimo(Number(e.target.value))} 
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Taxa de Juros Mensal (% a.m.)</label>
          <input 
            type="number" 
            step="0.01" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={taxaJurosMensal} 
            onChange={(e) => setTaxaJurosMensal(Number(e.target.value))} 
          />
          <span className="text-[10px] text-slate-500 block mt-0.5">Teto INSS atual: ~1.66% a.m.</span>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Prazo de Pagamento</label>
          <select 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-semibold"
            value={meses}
            onChange={(e) => setMeses(Number(e.target.value))}
          >
            <option value={12}>12 parcelas (1 ano)</option>
            <option value={24}>24 parcelas (2 anos)</option>
            <option value={36}>36 parcelas (3 anos)</option>
            <option value={48}>48 parcelas (4 anos)</option>
            <option value={60}>60 parcelas (5 anos)</option>
            <option value={72}>72 parcelas (6 anos)</option>
            <option value={84}>84 parcelas (7 anos - Teto INSS)</option>
          </select>
        </div>
      </div>

      {/* PAINEL DE RESULTADOS */}
      <div className={`p-5 rounded-xl border transition-all ${margemUltrapassada ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50' : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'}`}>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">Valor Estimado da Parcela Mensal</span>
            <span className="text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
              R$ {pmt.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / mês
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">Margem Permitida (35%)</span>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
              R$ {margemConsignavel35.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {margemUltrapassada && (
          <div className="p-3 bg-red-100/70 dark:bg-red-900/40 border border-red-300 text-red-800 dark:text-red-200 text-xs font-semibold rounded-lg mb-4">
            ⚠️ <strong>Atenção:</strong> A parcela mensal (R$ {pmt.toFixed(2)}) ultrapassa a sua margem consignável máxima de 35% (R$ {margemConsignavel35.toFixed(2)}). Reduza o valor solicitado ou aumente o número de parcelas.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">Total de Juros:</span>
            <strong className="text-slate-900 dark:text-slate-100 text-sm">R$ {totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">Montante Total Pago:</span>
            <strong className="text-slate-900 dark:text-slate-100 text-sm">R$ {totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">Taxa Efetiva Anual:</span>
            <strong className="text-emerald-700 dark:text-emerald-400 text-sm">{taxaEfetivaAnual.toFixed(2)}% a.a.</strong>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">Nº de Prestações:</span>
            <strong className="text-slate-900 dark:text-slate-100 text-sm">{n}x fixas</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 43. SIMULADOR DE FINANCIAMENTO DE VEÍCULOS
function SimuladorVeiculos() {
  const [valorVeiculo, setValorVeiculo] = useState<number>(60000);
  const [valorEntrada, setValorEntrada] = useState<number>(15000);
  const [taxaJurosMensal, setTaxaJurosMensal] = useState<number>(1.49);
  const [meses, setMeses] = useState<number>(48);

  const valorFinanciado = Math.max(0, valorVeiculo - valorEntrada);
  const i = (taxaJurosMensal || 0) / 100;
  const n = meses || 48;

  // IOF Estimado (~ 1.5% do saldo financiado)
  const iofEstimado = valorFinanciado * 0.0175;
  const saldoComIof = valorFinanciado + iofEstimado;

  let pmt = 0;
  if (i > 0 && n > 0 && saldoComIof > 0) {
    pmt = saldoComIof * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  }

  const totalFinanciamento = pmt * n;
  const totalPagoComEntrada = totalFinanciamento + valorEntrada;
  const totalJurosEImpostos = totalPagoComEntrada - valorVeiculo;
  const pctEntrada = valorVeiculo > 0 ? (valorEntrada / valorVeiculo) * 100 : 0;

  return (
    <div className="space-y-6" id="sim-veiculos">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Simulador de Financiamento de Veículos</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule o valor das parcelas do seu carro ou moto, entrada recomendada, IOF e juros acumulados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Valor do Veículo (R$)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={valorVeiculo} 
            onChange={(e) => setValorVeiculo(Number(e.target.value))} 
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Valor da Entrada (R$)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={valorEntrada} 
            onChange={(e) => setValorEntrada(Number(e.target.value))} 
          />
          <span className="text-[10px] text-slate-500 block mt-0.5">Equivale a {pctEntrada.toFixed(1)}% do veículo</span>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Taxa de Juros Mensal (% a.m.)</label>
          <input 
            type="number" 
            step="0.01" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={taxaJurosMensal} 
            onChange={(e) => setTaxaJurosMensal(Number(e.target.value))} 
          />
          <span className="text-[10px] text-slate-500 block mt-0.5">Média de mercado: 1.30% a 1.80% a.m.</span>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Prazo de Parcelamento</label>
          <select 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-semibold"
            value={meses}
            onChange={(e) => setMeses(Number(e.target.value))}
          >
            <option value={12}>12 parcelas (1 ano)</option>
            <option value={24}>24 parcelas (2 anos)</option>
            <option value={36}>36 parcelas (3 anos)</option>
            <option value={48}>48 parcelas (4 anos)</option>
            <option value={60}>60 parcelas (5 anos)</option>
          </select>
        </div>
      </div>

      {/* PAINEL DE RESULTADOS */}
      <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">Valor Estimado por Parcela ({n}x)</span>
            <span className="text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
              R$ {pmt.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">Saldo Financiado</span>
            <span className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
              R$ {valorFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">Total de Juros e IOF:</span>
            <strong className="text-slate-900 dark:text-slate-100 text-sm">R$ {totalJurosEImpostos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">Custo Total Final:</span>
            <strong className="text-slate-900 dark:text-slate-100 text-sm">R$ {totalPagoComEntrada.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">IOF Estimado:</span>
            <strong className="text-emerald-700 dark:text-emerald-400 text-sm">R$ {iofEstimado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase font-bold font-sans">% da Entrada:</span>
            <strong className="text-slate-900 dark:text-slate-100 text-sm">{pctEntrada.toFixed(1)}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}


// 1. JUROS COMPOSTOS
function JurosCompostos() {
  const [inicial, setInicial] = useState<number>(() => getParamNumber('ci', 1000));
  const [mensal, setMensal] = useState<number>(() => getParamNumber('am', 100));
  const [taxa, setTaxa] = useState<number>(() => getParamNumber('taxa', 12));
  const [periodo, setPeriodo] = useState<number>(() => getParamNumber('p', 5));
  const [tipoPeriodo, setTipoPeriodo] = useState<'anos' | 'meses'>(() => (getParamString('tp', 'anos') as any));
  const [tipoTaxa, setTipoTaxa] = useState<'anual' | 'mensal'>(() => (getParamString('tt', 'anual') as any));
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    syncUrlParams({
      ci: inicial,
      am: mensal,
      taxa,
      p: periodo,
      tp: tipoPeriodo,
      tt: tipoTaxa
    });

    const totalMeses = tipoPeriodo === 'anos' ? periodo * 12 : periodo;
    const taxaMensal = tipoTaxa === 'anual' ? Math.pow(1 + taxa / 100, 1 / 12) - 1 : taxa / 100;

    let total = inicial;
    let totalInvestido = inicial;
    let totalJuros = 0;
    const historico: any[] = [];

    for (let m = 1; m <= totalMeses; m++) {
      const red = total * taxaMensal;
      total += red + mensal;
      totalInvestido += mensal;
      totalJuros += red;

      if (m % 12 === 0 || m === totalMeses) {
        historico.push({
          periodoStr: tipoPeriodo === 'anos' ? `Ano ${m / 12}` : `Mês ${m}`,
          investido: totalInvestido,
          juros: totalJuros,
          total: total
        });
      }
    }

    setResultado({
      totalInvestido: totalInvestido,
      totalJuros: totalJuros,
      totalFinal: total,
      historico: historico
    });
  };

  useEffect(() => { calcular(); }, [inicial, mensal, taxa, periodo, tipoPeriodo, tipoTaxa]);

  const summary = resultado ? `📈 *Simulação de Juros Compostos*:\n💰 *Capital Inicial*: R$ ${inicial.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n💵 *Aporte Mensal*: R$ ${mensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n📅 *Prazo*: ${periodo} ${tipoPeriodo} a ${taxa}% ${tipoTaxa === 'anual' ? 'a.a.' : 'a.m.'}\n\n🏆 *Montante Final Bruto*: *R$ ${resultado.totalFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*\n✨ *Rendimento Puro dos Juros*: R$ ${resultado.totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : undefined;

  return (
    <div className="space-y-6" id="calc-jc">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Simulação de Juros Compostos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Capital Inicial (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={inicial} onChange={(e) => setInicial(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Aporte Mensal (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={mensal} onChange={(e) => setMensal(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Taxa de Juros (%)</label>
          <div className="flex gap-1">
            <input type="number" step="0.01" className="w-2/3 border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={taxa} onChange={(e) => setTaxa(Number(e.target.value))} />
            <select className="w-1/3 border border-slate-200 dark:border-slate-700 rounded-lg p-1 text-xs dark:bg-slate-800 dark:text-slate-100" value={tipoTaxa} onChange={(e: any) => setTipoTaxa(e.target.value)}>
              <option value="anual">a.a.</option>
              <option value="mensal">a.m.</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Período</label>
          <div className="flex gap-1">
            <input type="number" className="w-2/3 border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={periodo} onChange={(e) => setPeriodo(Number(e.target.value))} />
            <select className="w-1/3 border border-slate-200 dark:border-slate-700 rounded-lg p-1 text-xs dark:bg-slate-800 dark:text-slate-100" value={tipoPeriodo} onChange={(e: any) => setTipoPeriodo(e.target.value)}>
              <option value="anos">Anos</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>
      </div>

      {resultado && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-950">
            <div className="text-center p-2">
              <span className="block text-xs text-slate-500">Valor Total Investido</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {resultado.totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="text-center p-2 border-y md:border-y-0 md:border-x border-emerald-100 dark:border-emerald-900/50">
              <span className="block text-xs text-slate-500">Total em Juros Ganhos</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">R$ {resultado.totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="text-center p-2">
              <span className="block text-xs text-slate-500">Montante Final Bruto</span>
              <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.totalFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-500 dark:text-slate-400">
              <thead className="text-[10px] text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-850">
                <tr>
                  <th className="py-2 px-3">Período</th>
                  <th className="py-2 px-3">Total Investido</th>
                  <th className="py-2 px-3">Total Juros</th>
                  <th className="py-3 px-3">Saldo Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {resultado.historico.map((item: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                    <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">{item.periodoStr}</td>
                    <td className="py-2.5 px-3 font-mono">R$ {item.investido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-mono">R$ {item.juros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ShareBar 
            title="Simulação de Juros Compostos" 
            summaryText={summary}
          />
        </div>
      )}
    </div>
  );
}

// 2. JUROS SIMPLES
function JurosSimples() {
  const [inicial, setInicial] = useState<number>(1000);
  const [taxa, setTaxa] = useState<number>(10);
  const [periodo, setPeriodo] = useState<number>(12);
  const [tipoPeriodo, setTipoPeriodo] = useState<'anos' | 'meses'>('meses');
  const [tipoTaxa, setTipoTaxa] = useState<'anual' | 'mensal'>('mensal');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    let t = taxa / 100;
    // Se a taxa e período estão em bases diferentes, vamos ajustar de forma simples:
    let taxaEfetiva = t;
    if (tipoTaxa === 'anual' && tipoPeriodo === 'meses') {
      taxaEfetiva = t / 12;
    } else if (tipoTaxa === 'mensal' && tipoPeriodo === 'anos') {
      taxaEfetiva = t * 12;
    }

    const jurosCalculados = inicial * taxaEfetiva * periodo;
    const montanteFinal = inicial + jurosCalculados;

    setResultado({
      totalJuros: jurosCalculados,
      totalFinal: montanteFinal
    });
  };

  useEffect(() => { calcular(); }, [inicial, taxa, periodo, tipoPeriodo, tipoTaxa]);

  return (
    <div className="space-y-6" id="calc-js">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Simulação de Juros Simples</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Capital Inicial (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={inicial} onChange={(e) => setInicial(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Taxa de Juros (%)</label>
          <div className="flex gap-1">
            <input type="number" step="0.01" className="w-2/3 border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={taxa} onChange={(e) => setTaxa(Number(e.target.value))} />
            <select className="w-1/3 border border-slate-200 dark:border-slate-700 rounded-lg p-1 text-xs dark:bg-slate-800" value={tipoTaxa} onChange={(e: any) => setTipoTaxa(e.target.value)}>
              <option value="anual">a.a.</option>
              <option value="mensal">a.m.</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Período</label>
          <div className="flex gap-1">
            <input type="number" className="w-2/3 border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={periodo} onChange={(e) => setPeriodo(Number(e.target.value))} />
            <select className="w-1/3 border border-slate-200 dark:border-slate-700 rounded-lg p-1 text-xs dark:bg-slate-800" value={tipoPeriodo} onChange={(e: any) => setTipoPeriodo(e.target.value)}>
              <option value="anos">Anos</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>
      </div>

      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-2 border-r border-emerald-100/50">
              <span className="block text-xs text-slate-500">Juros Simples Ganhos</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">R$ {resultado.totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-2">
              <span className="block text-xs text-slate-500">Maturidade Total Recebida</span>
              <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.totalFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. FINANCIAMENTO (SAC / PRICE)
function Financiamento() {
  const [imovel, setImovel] = useState<number>(200000);
  const [prazoMeses, setPrazoMeses] = useState<number>(120);
  const [taxaAnual, setTaxaAnual] = useState<number>(9.5);
  const [sistemaAmortizacao, setSistemaAmortizacao] = useState<'SAC' | 'PRICE'>('SAC');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
    let sDevedor = imovel;
    const parcelasArray: any[] = [];
    let jurosPagoTotal = 0;

    if (sistemaAmortizacao === 'SAC') {
      const amortizacaoConstante = imovel / prazoMeses;
      for (let m = 1; m <= prazoMeses; m++) {
        const jurosMesen = sDevedor * taxaMensal;
        const totalParcela = amortizacaoConstante + jurosMesen;
        jurosPagoTotal += jurosMesen;
        sDevedor -= amortizacaoConstante;

        if (m === 1 || m === Math.round(prazoMeses / 2) || m === prazoMeses) {
          parcelasArray.push({
            mes: m,
            label: m === 1 ? 'Primeira' : m === prazoMeses ? 'Última' : 'Meio do Prazo',
            parcela: totalParcela,
            amortizacao: amortizacaoConstante,
            juros: jurosMesen,
            saldo: Math.max(0, sDevedor)
          });
        }
      }
    } else {
      // PRICE
      const parcelaFixa = (imovel * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -prazoMeses));
      for (let m = 1; m <= prazoMeses; m++) {
        const jurosMesen = sDevedor * taxaMensal;
        const amortizacaoMesen = parcelaFixa - jurosMesen;
        jurosPagoTotal += jurosMesen;
        sDevedor -= amortizacaoMesen;

        if (m === 1 || m === Math.round(prazoMeses / 2) || m === prazoMeses) {
          parcelasArray.push({
            mes: m,
            label: m === 1 ? 'Primeira' : m === prazoMeses ? 'Última' : 'Meio do Prazo',
            parcela: parcelaFixa,
            amortizacao: amortizacaoMesen,
            juros: jurosMesen,
            saldo: Math.max(0, sDevedor)
          });
        }
      }
    }

    setResultado({
      parcelas: parcelasArray,
      jurosTotal: jurosPagoTotal,
      custoTotal: imovel + jurosPagoTotal
    });
  };

  useEffect(() => { calcular(); }, [imovel, prazoMeses, taxaAnual, sistemaAmortizacao]);

  return (
    <div className="space-y-6" id="calc-financ">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Simulador de Financiamento</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Valor do Financiamento (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={imovel} onChange={(e) => setImovel(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Prazo total (Meses)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={prazoMeses} onChange={(e) => setPrazoMeses(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Taxa de Juros Nominal (% ao Ano)</label>
          <input type="number" step="0.1" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={taxaAnual} onChange={(e) => setTaxaAnual(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Sistema de Amortização</label>
          <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={sistemaAmortizacao} onChange={(e: any) => setSistemaAmortizacao(e.target.value)}>
            <option value="SAC">SAC (Prestações Decrescentes)</option>
            <option value="PRICE">Tabela Price (Prestações Fixas)</option>
          </select>
        </div>
      </div>

      {resultado && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50/40 dark:bg-emerald-950/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
            <div className="text-center md:border-r border-emerald-100 dark:border-emerald-900/30 p-2">
              <span className="block text-xs text-slate-500">Total de Juros Pagos</span>
              <span className="text-lg font-bold text-slate-500 dark:text-slate-400 font-mono">R$ {resultado.jurosTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="text-center p-2">
              <span className="block text-xs text-slate-500">Custo Total de Aquisição final</span>
              <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.custoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Projeção Amadora de Parcelas Notáveis:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 rounded">
              <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px] text-slate-700 dark:text-slate-300">
                <tr>
                  <th className="p-2">Parcela</th>
                  <th className="p-2">Valor Total</th>
                  <th className="p-2">Parte Amortizada</th>
                  <th className="p-2">Juros Embutidos</th>
                  <th className="p-2">Saldo Devedor Residuo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {resultado.parcelas.map((p: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-2.5 font-medium">{p.label} (Mês {p.mes})</td>
                    <td className="p-2.5 font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {p.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-2.5 font-mono">R$ {p.amortizacao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-2.5 text-emerald-500 font-mono">R$ {p.juros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-2.5 font-mono">R$ {p.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// 4. FGTS
function Fgts() {
  const [salario, setSalario] = useState<number>(3000);
  const [meses, setMeses] = useState<number>(24);
  const [saldoAnterior, setSaldoAnterior] = useState<number>(0);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const depositoMensal = salario * 0.08;
    const totalDepositos = depositoMensal * meses;
    const saldoFinalEstimado = saldoAnterior + totalDepositos + (saldoAnterior * 0.03 * (meses / 12)); // TR + juros 3%a.a. aproximado

    setResultado({
      mensal: depositoMensal,
      totalDepositos: totalDepositos,
      saldoFinal: saldoFinalEstimado
    });
  }, [salario, meses, saldoAnterior]);

  return (
    <div className="space-y-6" id="calc-fgts">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cálculo de FGTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Salário Bruto CLT (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={salario} onChange={(e) => setSalario(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Meses Trabalhados</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={meses} onChange={(e) => setMeses(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Saldo Atual Existente (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={saldoAnterior} onChange={(e) => setSaldoAnterior(Number(e.target.value))} />
        </div>
      </div>

      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-2 border-r border-emerald-100/30">
              <span className="block text-xs text-slate-500">Garantia Mensal Obrigatória</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {resultado.mensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-2 border-r border-emerald-100/30">
              <span className="block text-xs text-slate-500">Total de Depósitos no Período</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {resultado.totalDepositos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-2">
              <span className="block text-xs text-slate-500">Saldo Global Estimado com Juros</span>
              <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 5. INSS
function Inss() {
  const [salario, setSalario] = useState<number>(3500);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    // Alíquotas INSS 2026 Progressiva
    const faixas = [
      { limite: 1412, aliquota: 0.075 },
      { limite: 2666.68, aliquota: 0.09 },
      { limite: 4000.03, aliquota: 0.12 },
      { limite: 7786.02, aliquota: 0.14 } // Limite teto provisório de contribuição
    ];

    let tDesconto = 0;
    let sDevedor = salario;
    let anteriorLimite = 0;
    const calculoDetalhado: any[] = [];

    for (let f of faixas) {
      if (salario > anteriorLimite) {
        const baseDeCalculo = Math.min(salario, f.limite) - anteriorLimite;
        const impostoFaixa = baseDeCalculo * f.aliquota;
        tDesconto += impostoFaixa;
        
        calculoDetalhado.push({
          faixaStr: `Até R$ ${f.limite.toLocaleString('pt-BR')}`,
          base: baseDeCalculo,
          aliquota: f.aliquota * 100,
          valor: impostoFaixa
        });

        anteriorLimite = f.limite;
        if (salario <= f.limite) break;
      }
    }

    // Se o salário ultrapassa o teto, o desconto cravado é o teto máximo de contribuição:
    const tetoMax = 908.85; // Aproximado para fins ilustrativos
    const descontoFinal = tDesconto > tetoMax ? tetoMax : tDesconto;
    const aliquotaEfetiva = (descontoFinal / salario) * 100;

    setResultado({
      desconto: descontoFinal,
      liquido: salario - descontoFinal,
      aliquotaEfetiva: aliquotaEfetiva,
      detalhes: calculoDetalhado
    });
  }, [salario]);

  return (
    <div className="space-y-6" id="calc-inss">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cálculo de Previdência INSS Progressivo</h2>
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1">Salário Bruto (R$)</label>
        <input type="number" className="w-full md:w-1/3 border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={salario} onChange={(e) => setSalario(Number(e.target.value))} />
      </div>

      {resultado && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-emerald-50/30 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/35 text-center">
            <div className="p-2 border-r border-emerald-100/30">
              <span className="block text-xs text-slate-500">Desconto Retido INSS</span>
              <span className="text-base font-bold text-slate-500 dark:text-slate-400 font-mono">R$ {resultado.desconto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="p-2 border-r border-emerald-100/30">
              <span className="block text-xs text-slate-500">Alíquota Média Efetiva</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.aliquotaEfetiva.toFixed(2)}%</span>
            </div>
            <div className="p-2">
              <span className="block text-xs text-slate-500">Salário Descontado Previdência</span>
              <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Detalhamento das Contribuições Progressivas:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-500">
              <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px]">
                <tr>
                  <th className="p-2">Faixa</th>
                  <th className="p-2">Base Calculada</th>
                  <th className="p-2">Alíquota</th>
                  <th className="p-2">Valor Retido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {resultado.detalhes.map((d: any, idx: number) => (
                  <tr key={idx}>
                    <td className="p-2 font-medium">{d.faixaStr}</td>
                    <td className="p-2">R$ {d.base.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="p-2">{d.aliquota.toFixed(1)}%</td>
                    <td className="p-2 text-emerald-500">R$ {d.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// 6. FÉRIAS
function Ferias() {
  const [salario, setSalario] = useState<number>(4500);
  const [diasFerias, setDiasFerias] = useState<number>(30);
  const [venderDias, setVenderDias] = useState<'sim' | 'nao'>('nao');
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const valorFeriasBruto = (salario / 30) * diasFerias;
    const tercoConstitucional = valorFeriasBruto / 3;
    let abonoPecuniarioBruto = 0;
    let abonoTercoBruto = 0;

    if (venderDias === 'sim') {
      const diasVendidos = 10;
      abonoPecuniarioBruto = (salario / 30) * diasVendidos;
      abonoTercoBruto = abonoPecuniarioBruto / 3;
    }

    const totalBruto = valorFeriasBruto + tercoConstitucional + abonoPecuniarioBruto + abonoTercoBruto;
    
    // Descontos básicos IRRF e INSS ilustrados de forma agregada resumida (Aprox. 12% global das férias normais)
    const taxaINSS = 0.11;
    const descontoINSS = (valorFeriasBruto + tercoConstitucional) * taxaINSS;
    // Abono pecuniário é isento de impostos
    const totalLiquido = totalBruto - descontoINSS;

    setResultado({
      brutoFerias: valorFeriasBruto,
      terco: tercoConstitucional,
      abono: abonoPecuniarioBruto,
      abonoTerco: abonoTercoBruto,
      brutoTotal: totalBruto,
      desconto: descontoINSS,
      liquidoTotal: totalLiquido
    });
  }, [salario, diasFerias, venderDias]);

  return (
    <div className="space-y-6" id="calc-ferias">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cálculo de Férias CLT</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Salário-Base Nominal (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={salario} onChange={(e) => setSalario(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Dias de Férias (Gozados)</label>
          <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={diasFerias} onChange={(e: any) => setDiasFerias(Number(e.target.value))}>
            <option value="30">30 dias</option>
            <option value="20">20 dias</option>
            <option value="15">15 dias</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Deseja vender 10 dias (Abono)?</label>
          <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={venderDias} onChange={(e: any) => setVenderDias(e.target.value)}>
            <option value="nao">Não vender dias</option>
            <option value="sim">Sim, vender 10 dias de abono</option>
          </select>
        </div>
      </div>

      {resultado && (
        <div className="space-y-4">
          <div className="bg-emerald-50/30 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/35">
            <span className="block text-xs text-center text-slate-500 mb-2">Valor Líquido Total Estimado a Receber</span>
            <div className="text-center text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
              R$ {resultado.liquidoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              *Descontos aplicados simulando impostos obrigatórios baseizados na alíquota progressiva simplificada (INSS/IRRF).
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded">
              <span className="block text-[10px] text-slate-400">Férias Básicas</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">R$ {resultado.brutoFerias.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded">
              <span className="block text-[10px] text-slate-400">+1/3 Constitucional</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">R$ {resultado.terco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded">
              <span className="block text-[10px] text-slate-400">Abono Pecuniário (Isento)</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">R$ {(resultado.abono + resultado.abonoTerco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded">
              <span className="block text-[10px] text-slate-400">Total Bruto Sem Impostos</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">R$ {resultado.brutoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 7. RESCISÃO
function Rescisao() {
  const [salario, setSalario] = useState<number>(3200);
  const [motivo, setMotivo] = useState<string>('dispensa-sem-justa-causa');
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(18);
  const [saldoFgts, setSaldoFgts] = useState<number>(5000);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const proporcional13 = (salario / 12) * (mesesTrabalhados % 12);
    const feriasVencidas = salario; // Assume um ano de férias vencidas
    const saldoSalario = salario / 2; // Simula meio mês de trabalho residual

    let multaFgts = 0;
    let indenizacaoTotal = proporcional13 + feriasVencidas + saldoSalario;

    if (motivo === 'dispensa-sem-justa-causa') {
      multaFgts = saldoFgts * 0.4;
      indenizacaoTotal += multaFgts;
    } else if (motivo === 'acordo-comum') {
      multaFgts = saldoFgts * 0.2;
      indenizacaoTotal += multaFgts;
    }

    setResultado({
      saldoSalario: saldoSalario,
      feriasVencidas: feriasVencidas,
      proporcional13: proporcional13,
      multaFgts: multaFgts,
      total: indenizacaoTotal
    });
  }, [salario, motivo, mesesTrabalhados, saldoFgts]);

  return (
    <div className="space-y-6" id="calc-rescisao">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cálculo de Demissão e Rescisão</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Último Salário Bruto</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={salario} onChange={(e) => setSalario(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tipo de Demissão</label>
          <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={motivo} onChange={(e: any) => setMotivo(e.target.value)}>
            <option value="dispensa-sem-justa-causa">Sem Justa Causa (Empregador)</option>
            <option value="pedido-de-demissao">Pedido de Demissão (Empregado)</option>
            <option value="acordo-comum">Acordo bilateral comum</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tempo de Serviço (Meses)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={mesesTrabalhados} onChange={(e) => setMesesTrabalhados(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Saldo Base p/ Multa FGTS</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={saldoFgts} onChange={(e) => setSaldoFgts(Number(e.target.value))} />
        </div>
      </div>

      {resultado && (
        <div className="space-y-4">
          <div className="bg-emerald-50/30 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-900/35 text-center">
            <span className="block text-xs text-slate-500">Estimativa Líquida a Receber pelo Trabalhador</span>
            <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono mt-1">R$ {resultado.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded">
              <span className="block text-[10px] text-slate-400">Saldo Salário (Meio Mês)</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">R$ {resultado.saldoSalario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded">
              <span className="block text-[10px] text-slate-400">Férias Vencidas</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">R$ {resultado.feriasVencidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded">
              <span className="block text-[10px] text-slate-400">Proporcional de 13º</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">R$ {resultado.proporcional13.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded">
              <span className="block text-[10px] text-slate-400">Multa Indemnizadora FGTS</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">R$ {resultado.multaFgts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 8. DÉCIMO TERCEIRO
function DecimoTerceiro() {
  const [salario, setSalario] = useState<number>(3000);
  const [meses, setMeses] = useState<number>(12);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const valorBrutoTotal = (salario / 12) * meses;
    const primeiraParcela = valorBrutoTotal * 0.5; // sem desconto
    const descontoInssIr = valorBrutoTotal * 0.11; // estimativa global simplificada de retenções previdenciárias e fiscais
    const segundaParcela = primeiraParcela - descontoInssIr;

    setResultado({
      bruto: valorBrutoTotal,
      pacela1: primeiraParcela,
      descontos: descontoInssIr,
      pacela2: segundaParcela,
      liquidoTotal: valorBrutoTotal - descontoInssIr
    });
  }, [salario, meses]);

  return (
    <div className="space-y-6" id="calc-decimo">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cálculo de Décimo Terceiro Salário</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Último Salário Nominal Bruto (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={salario} onChange={(e) => setSalario(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Meses Trabalhados no Ano</label>
          <input type="number" max="12" min="1" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={meses} onChange={(e) => setMeses(Number(e.target.value))} />
        </div>
      </div>

      {resultado && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-xs">
            <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded border border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">1ª Parcela (Adiantada)</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {resultado.pacela1.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded border border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider">2ª Parcela (Com Descontos)</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {resultado.pacela2.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded border border-emerald-100 dark:border-emerald-950">
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Total Líquido Recebido</span>
              <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.liquidoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 9. IMC
function Imc() {
  const [peso, setPeso] = useState<number>(75);
  const [altura, setAltura] = useState<number>(175);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const alturaMetros = altura / 100;
    const imcValue = peso / (alturaMetros * alturaMetros);
    let classif = '';
    let cor = '';

    if (imcValue < 18.5) {
      classif = 'Abaixo do peso';
      cor = 'text-emerald-500';
    } else if (imcValue >= 18.5 && imcValue < 25) {
      classif = 'Peso normal (Saudável)';
      cor = 'text-emerald-500';
    } else if (imcValue >= 25 && imcValue < 30) {
      classif = 'Sobrepeso';
      cor = 'text-emerald-600';
    } else {
      classif = 'Obesidade';
      cor = 'text-emerald-500';
    }

    setResultado({
      imc: imcValue,
      class: classif,
      style: cor
    });
  }, [peso, altura]);

  return (
    <div className="space-y-6" id="calc-imc">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cálculo de IMC (Massa Corporal)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Peso (kg)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={peso} onChange={(e) => setPeso(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Altura (cm)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={altura} onChange={(e) => setAltura(Number(e.target.value))} />
        </div>
      </div>

      {resultado && (
        <div className="bg-slate-50 dark:bg-slate-850 p-5 rounded-xl border border-slate-100 dark:border-slate-800 text-center space-y-2">
          <span className="block text-xs text-slate-500">Seu Índice de Massa Corporal</span>
          <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-200 font-mono">{resultado.imc.toFixed(2)}</div>
          <div className={`text-base font-bold uppercase tracking-wider ${resultado.style}`}>{resultado.class}</div>
        </div>
      )}
    </div>
  );
}

// 18. CALCULADORA IPVA
function CalculadoraIPVA() {
  const [valorVenal, setValorVenal] = useState<number>(50000);
  const [estado, setEstado] = useState<string>('SP');
  const [tipoVeiculo, setTipoVeiculo] = useState<string>('passeio');
  const [resultado, setResultado] = useState<any>(null);

  const aliquotaPorEstado: {[key: string]: {passeio: number, moto: number, caminhao: number}} = {
    'SP': {passeio: 4, moto: 2, caminhao: 1.5},
    'RJ': {passeio: 4, moto: 2, caminhao: 1},
    'MG': {passeio: 3, moto: 2, caminhao: 1},
    'PR': {passeio: 3.5, moto: 2, caminhao: 1},
    'SC': {passeio: 2, moto: 2, caminhao: 1},
    'RS': {passeio: 3, moto: 2, caminhao: 1},
    'BA': {passeio: 2.5, moto: 2, caminhao: 1},
    'DF': {passeio: 3, moto: 2, caminhao: 1},
    'GO': {passeio: 3, moto: 2, caminhao: 1},
    'PE': {passeio: 2.4, moto: 1, caminhao: 1},
    'CE': {passeio: 3, moto: 2, caminhao: 1},
    'ES': {passeio: 2, moto: 1, caminhao: 1},
  };

  useEffect(() => {
    const ali = aliquotaPorEstado[estado] || aliquotaPorEstado['SP'];
    const aliquota = ali[tipoVeiculo as keyof typeof ali] || 3;
    const valorIPVA = valorVenal * (aliquota / 100);
    const parcela = valorIPVA / 3;
    setResultado({ valorIPVA, aliquota, parcela });
  }, [valorVenal, estado, tipoVeiculo]);

  return (
    <div className="space-y-6" id="calc-ipva">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de IPVA</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Valor Venal (Tabela FIPE) R$</label>
          <input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={valorVenal} onChange={e => setValorVenal(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Estado de Registro</label>
          <select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={estado} onChange={e => setEstado(e.target.value)}>
            {Object.keys(aliquotaPorEstado).map(uf => <option key={uf} value={uf}>{uf}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Tipo de Veículo</label>
          <select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={tipoVeiculo} onChange={e => setTipoVeiculo(e.target.value)}>
            <option value="passeio">Automóvel de Passeio</option>
            <option value="moto">Motocicleta</option>
            <option value="caminhao">Caminhão / Utilitário</option>
          </select>
        </div>
      </div>
      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Alíquota Aplicada</span><span className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.aliquota}%</span></div>
            <div><span className="block text-xs text-slate-500">Valor do IPVA</span><span className="text-lg font-bold text-slate-600 dark:text-slate-400 font-mono">R$ {resultado.valorIPVA.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
            <div><span className="block text-xs text-slate-500">Parcelas (3x)</span><span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// 19. CALCULADORA IRPF
function CalculadoraIRPF() {
  const [rendimento, setRendimento] = useState<number>(60000);
  const [dependentes, setDependentes] = useState<number>(0);
  const [despesasDedutiveis, setDespesasDedutiveis] = useState<number>(10000);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const descontoDep = dependentes * 2275.08;
    const baseCalculo = Math.max(0, rendimento - descontoDep - despesasDedutiveis);
    
    let imposto = 0;
    if (baseCalculo <= 22847.76) imposto = 0;
    else if (baseCalculo <= 33919.80) imposto = baseCalculo * 0.075 - 1713.58;
    else if (baseCalculo <= 45012.60) imposto = baseCalculo * 0.15 - 4257.57;
    else if (baseCalculo <= 55976.16) imposto = baseCalculo * 0.225 - 7633.51;
    else imposto = baseCalculo * 0.275 - 10432.32;

    const aliquotaEfetiva = (imposto / rendimento) * 100;
    setResultado({ baseCalculo, imposto, aliquotaEfetiva, rendimento });
  }, [rendimento, dependentes, despesasDedutiveis]);

  return (
    <div className="space-y-6" id="calc-irpf">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Imposto de Renda (IRPF)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Rendimento Anual (R$)</label>
          <input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={rendimento} onChange={e => setRendimento(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Dependentes</label>
          <input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={dependentes} onChange={e => setDependentes(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Despesas Dedutíveis (R$)</label>
          <input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={despesasDedutiveis} onChange={e => setDespesasDedutiveis(Number(e.target.value))} />
        </div>
      </div>
      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Base de Cálculo</span><span className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {resultado.baseCalculo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
            <div><span className="block text-xs text-slate-500">Imposto Devido</span><span className={`text-lg font-bold font-mono ${resultado.imposto > 0 ? 'text-emerald-500' : 'text-emerald-600'}`}>R$ {resultado.imposto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
            <div><span className="block text-xs text-slate-500">Alíquota Efetiva</span><span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-mono">{resultado.aliquotaEfetiva.toFixed(2)}%</span></div>
          </div>
          {resultado.imposto === 0 && <p className="text-xs text-emerald-600 text-center font-semibold">Você está isento de declarar IRPF! 🎉</p>}
        </div>
      )}
    </div>
  );
}

// 20. CALCULADORA DE MULTA DE TRÂNSITO
function CalculadoraMultaTransito() {
  const [gravidade, setGravidade] = useState<string>('grave');
  const [fatorMultiplicador, setFatorMultiplicador] = useState<number>(1);
  const [comDesconto, setComDesconto] = useState<boolean>(true);
  const [resultado, setResultado] = useState<any>(null);

  const valoresBase: {[key: string]: number} = {
    'leve': 88.38,
    'media': 130.16,
    'grave': 195.23,
    'gravissima': 293.47,
  };

  useEffect(() => {
    const valorBase = valoresBase[gravidade] || 0;
    const valorComFator = valorBase * fatorMultiplicador;
    const valorComDesconto = valorComFator * 0.8;
    const valorFinal = comDesconto ? valorComDesconto : valorComFator;
    const economia = valorComFator - valorComDesconto;
    setResultado({ valorBase, valorComFator, valorFinal, economia, comDesconto });
  }, [gravidade, fatorMultiplicador, comDesconto]);

  return (
    <div className="space-y-6" id="calc-multa">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Multa de Trânsito</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Gravidade da Infração</label>
          <select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={gravidade} onChange={e => setGravidade(e.target.value)}>
            <option value="leve">Leve - R$ 88,38</option>
            <option value="media">Média - R$ 130,16</option>
            <option value="grave">Grave - R$ 195,23</option>
            <option value="gravissima">Gravíssima - R$ 293,47</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Fator Multiplicador</label>
          <select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={fatorMultiplicador} onChange={e => setFatorMultiplicador(Number(e.target.value))}>
            <option value="1">1x (padrão)</option>
            <option value="3">3x (gravíssima)</option>
            <option value="5">5x (gravíssima)</option>
            <option value="10">10x (gravíssima)</option>
            <option value="20">20x (gravíssima)</option>
          </select>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="desc-multa" className="rounded text-emerald-500" checked={comDesconto} onChange={e => setComDesconto(e.target.checked)} />
          <label htmlFor="desc-multa" className="text-xs text-slate-600 dark:text-slate-400 select-none">Pagamento com 20% de desconto</label>
        </div>
      </div>
      {resultado && (
        <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-xl border border-slate-100 dark:border-slate-950 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Valor Base</span><span className="text-base font-bold font-mono">R$ {resultado.valorBase.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Com Fator {fatorMultiplicador}x</span><span className="text-base font-bold font-mono text-emerald-500">R$ {resultado.valorComFator.toFixed(2)}</span></div>
            <div><span className="block text-xs text-emerald-600">Valor com Desconto</span><span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.valorFinal.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Economia</span><span className="text-base font-bold text-emerald-600 font-mono">R$ {resultado.economia.toFixed(2)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// 21. CALCULADORA DE PREÇO POR KM
function CalculadoraPrecoPorKm() {
  const [valorRecebido, setValorRecebido] = useState<number>(25);
  const [distancia, setDistancia] = useState<number>(10);
  const [consumo, setConsumo] = useState<number>(12);
  const [precoCombustivel, setPrecoCombustivel] = useState<number>(5.8);
  const [comissao, setComissao] = useState<number>(25);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const comissaoValor = valorRecebido * (comissao / 100);
    const valorLiquidoApp = valorRecebido - comissaoValor;
    const litrosGastos = distancia / consumo;
    const custoCombustivel = litrosGastos * precoCombustivel;
    const lucroLiquido = valorLiquidoApp - custoCombustivel;
    const lucroPorKm = lucroLiquido / distancia;
    const margem = (lucroLiquido / valorRecebido) * 100;
    
    setResultado({ comissaoValor, valorLiquidoApp, litrosGastos, custoCombustivel, lucroLiquido, lucroPorKm, margem });
  }, [valorRecebido, distancia, consumo, precoCombustivel, comissao]);

  return (
    <div className="space-y-6" id="calc-preco-km">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Preço por Km - Motoristas de App</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Valor Recebido (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={valorRecebido} onChange={e => setValorRecebido(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Distância (km)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={distancia} onChange={e => setDistancia(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Consumo (km/L)</label><input type="number" step="0.1" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={consumo} onChange={e => setConsumo(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Preço Combustível (R$/L)</label><input type="number" step="0.01" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={precoCombustivel} onChange={e => setPrecoCombustivel(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Comissão do App (%)</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={comissao} onChange={e => setComissao(Number(e.target.value))}><option value="15">15%</option><option value="20">20%</option><option value="25">25%</option><option value="30">30%</option></select></div>
      </div>
      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Comissão</span><span className="text-base font-bold text-emerald-500 font-mono">-R$ {resultado.comissaoValor.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Combustível</span><span className="text-base font-bold text-emerald-600 font-mono">-R$ {resultado.custoCombustivel.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Lucro Líquido</span><span className="text-lg font-bold text-emerald-600 font-mono">R$ {resultado.lucroLiquido.toFixed(2)}</span></div>
            <div><span className="block text-xs text-emerald-600">💰 Lucro por km</span><span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.lucroPorKm.toFixed(2)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// 22. CALCULADORA DE GESTAÇÃO
function CalculadoraGestacao() {
  const [dum, setDum] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 120);
    return d.toISOString().split('T')[0];
  });
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    if (!dum) return;
    const dataDUM = new Date(dum);
    const hoje = new Date();
    const diffMs = hoje.getTime() - dataDUM.getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    const semanas = Math.floor(diffDias / 7);
    const diasResto = diffDias % 7;
    
    const dpp = new Date(dataDUM);
    dpp.setDate(dpp.getDate() + 280);
    
    let trimestre = '';
    let trimestreCor = '';
    if (semanas <= 13) { trimestre = '1º Trimestre'; trimestreCor = 'text-emerald-600'; }
    else if (semanas <= 27) { trimestre = '2º Trimestre'; trimestreCor = 'text-emerald-600'; }
    else { trimestre = '3º Trimestre'; trimestreCor = 'text-emerald-600'; }

    setResultado({ semanas, diasResto, dpp: dpp.toLocaleDateString('pt-BR'), trimestre, trimestreCor });
  }, [dum]);

  return (
    <div className="space-y-6" id="calc-gestacao">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Gestação</h2>
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1">Data da Última Menstruação (DUM)</label>
        <input type="date" className="w-full md:w-1/3 border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={dum} onChange={e => setDum(e.target.value)} />
      </div>
      {resultado && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-100"><span className="block text-xs text-slate-500">Semanas</span><span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.semanas}</span></div>
          <div className="bg-slate-50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-100"><span className="block text-xs text-slate-500">Dias</span><span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.diasResto}</span></div>
          <div className={`${resultado.trimestreCor === 'text-emerald-600' ? 'bg-emerald-50' : resultado.trimestreCor === 'text-emerald-600' ? 'bg-slate-50' : 'bg-slate-50'} dark:bg-opacity-10 p-4 rounded-xl border`}>
            <span className="block text-xs text-slate-500">Trimestre</span>
            <span className={`text-xl font-extrabold font-mono ${resultado.trimestreCor}`}>{resultado.trimestre}</span>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100">
            <span className="block text-xs text-slate-500">Data Provável do Parto</span>
            <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{resultado.dpp}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 23. CALCULADORA TMB
function CalculadoraTMB() {
  const [peso, setPeso] = useState<number>(70);
  const [altura, setAltura] = useState<number>(170);
  const [idade, setIdade] = useState<number>(30);
  const [sexo, setSexo] = useState<string>('masculino');
  const [nivelAtividade, setNivelAtividade] = useState<string>('sedentario');
  const [resultado, setResultado] = useState<any>(null);

  const fatoresAtividade: {[key: string]: number} = {
    'sedentario': 1.2,
    'leve': 1.375,
    'moderado': 1.55,
    'intenso': 1.725,
    'atleta': 1.9,
  };

  useEffect(() => {
    let tmb = 0;
    if (sexo === 'masculino') {
      tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
    } else {
      tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
    }
    const fator = fatoresAtividade[nivelAtividade] || 1.2;
    const get = tmb * fator;
    const emagrecer = get - 500;
    const ganhar = get + 300;
    
    setResultado({ tmb, get, emagrecer, ganhar });
  }, [peso, altura, idade, sexo, nivelAtividade]);

  return (
    <div className="space-y-6" id="calc-tmb">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de TMB - Taxa Metabólica Basal</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Peso (kg)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={peso} onChange={e => setPeso(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Altura (cm)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={altura} onChange={e => setAltura(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Idade</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={idade} onChange={e => setIdade(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Sexo</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={sexo} onChange={e => setSexo(e.target.value)}><option value="masculino">Masculino</option><option value="feminino">Feminino</option></select></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Nível de Atividade</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={nivelAtividade} onChange={e => setNivelAtividade(e.target.value)}>
          <option value="sedentario">Sedentário (pouco ou nenhum exercício)</option>
          <option value="leve">Leve (1-3 dias/semana)</option>
          <option value="moderado">Moderado (3-5 dias/semana)</option>
          <option value="intenso">Intenso (6-7 dias/semana)</option>
          <option value="atleta">Atleta (2x ao dia)</option>
        </select></div>
      </div>
      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border"><span className="block text-xs text-slate-500">TMB (Calorias em Repouso)</span><span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{Math.round(resultado.tmb)} kcal/dia</span></div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border"><span className="block text-xs text-slate-500">GET (Gasto Total)</span><span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{Math.round(resultado.get)} kcal/dia</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-950/20 rounded-lg border border-slate-100"><span className="block text-xs text-emerald-600">Para Emagrecer (-500kcal)</span><span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-mono">{Math.round(resultado.emagrecer)} kcal/dia</span></div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100"><span className="block text-xs text-emerald-600">Para Ganhar Massa (+300kcal)</span><span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-mono">{Math.round(resultado.ganhar)} kcal/dia</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// 24. CALCULADORA DE MARGEM DE LUCRO
function CalculadoraMargemLucro() {
  const [custo, setCusto] = useState<number>(50);
  const [despesasVariaveis, setDespesasVariaveis] = useState<number>(10);
  const [margemDesejada, setMargemDesejada] = useState<number>(30);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const custoTotal = custo + despesasVariaveis;
    const markup = 100 / (100 - margemDesejada);
    const precoVenda = custoTotal * markup;
    const lucroBruto = precoVenda - custoTotal;
    const margemReal = (lucroBruto / precoVenda) * 100;
    
    setResultado({ custoTotal, precoVenda, lucroBruto, margemReal, markup });
  }, [custo, despesasVariaveis, margemDesejada]);

  return (
    <div className="space-y-6" id="calc-margem">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Margem de Lucro</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Custo do Produto (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={custo} onChange={e => setCusto(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Despesas Variáveis (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={despesasVariaveis} onChange={e => setDespesasVariaveis(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Margem Desejada (%)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={margemDesejada} onChange={e => setMargemDesejada(Number(e.target.value))} /></div>
      </div>
      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Custo Total</span><span className="text-base font-bold font-mono">R$ {resultado.custoTotal.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Preço de Venda</span><span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.precoVenda.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Lucro Bruto</span><span className="text-base font-bold text-emerald-600 font-mono">R$ {resultado.lucroBruto.toFixed(2)}</span></div>
            <div><span className="block text-xs text-emerald-600">Margem Real</span><span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{resultado.margemReal.toFixed(1)}%</span></div>
          </div>
          <div className="mt-3 text-xs text-center text-slate-400">Markup: {resultado.markup.toFixed(2)}x</div>
        </div>
      )}
    </div>
  );
}

// 25. CALCULADORA DE GORJETA
function CalculadoraGorjeta() {
  const [valorConta, setValorConta] = useState<number>(150);
  const [percentual, setPercentual] = useState<number>(10);
  const [pessoas, setPessoas] = useState<number>(1);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const valorGorjeta = valorConta * (percentual / 100);
    const totalComGorjeta = valorConta + valorGorjeta;
    const porPessoa = totalComGorjeta / pessoas;
    setResultado({ valorGorjeta, totalComGorjeta, porPessoa });
  }, [valorConta, percentual, pessoas]);

  return (
    <div className="space-y-6" id="calc-gorjeta">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Gorjeta</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Valor da Conta (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={valorConta} onChange={e => setValorConta(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Percentual (%)</label>
          <div className="flex gap-1">
            {[10, 15, 20].map(p => (
              <button key={p} onClick={() => setPercentual(p)} className={`px-3 py-2 rounded text-xs font-bold ${percentual === p ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'} hover:cursor-pointer`}>{p}%</button>
            ))}
          </div>
        </div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Dividir para</label>
          <div className="flex gap-1 items-center">
            <button onClick={() => setPessoas(Math.max(1, pessoas - 1))} className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded text-sm font-bold hover:cursor-pointer">-</button>
            <span className="mx-2 font-bold font-mono text-lg">{pessoas}</span>
            <button onClick={() => setPessoas(pessoas + 1)} className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded text-sm font-bold hover:cursor-pointer">+</button>
            <span className="ml-1 text-xs text-slate-500">pessoas</span>
          </div>
        </div>
      </div>
      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Valor da Gorjeta</span><span className="text-lg font-bold text-emerald-600 font-mono">R$ {resultado.valorGorjeta.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Total com Gorjeta</span><span className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono">R$ {resultado.totalComGorjeta.toFixed(2)}</span></div>
            <div><span className="block text-xs text-emerald-600">💰 Por Pessoa</span><span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.porPessoa.toFixed(2)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE APOSENTADORIA INSS =====
function CalculadoraAposentadoria() {
  const [idade, setIdade] = useState<number>(35);
  const [tempoContrib, setTempoContrib] = useState<number>(15);
  const [sexo, setSexo] = useState<string>('masculino');
  const [salarioMedio, setSalarioMedio] = useState<number>(3000);
  const [regra, setRegra] = useState<string>('pontos');
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const pontos = idade + tempoContrib;
    const idadeMinimaHomem = 65;
    const idadeMinimaMulher = 62;
    const idadeMinima = sexo === 'masculino' ? idadeMinimaHomem : idadeMinimaMulher;
    const tempoMinimo = sexo === 'masculino' ? 35 : 30;
    const pontosMinimoHomem = 96; // 2026
    const pontosMinimoMulher = 91; // 2026
    const pontosMinimo = sexo === 'masculino' ? pontosMinimoHomem : pontosMinimoMulher;
    
    let podeAposentar = false;
    let motivo = '';
    let idadeApos = 0;
    let tempoFaltante = 0;

    if (regra === 'pontos') {
      podeAposentar = pontos >= pontosMinimo && tempoContrib >= tempoMinimo;
      motivo = `Regra de Pontos: precisa de ${pontosMinimo} pontos e ${tempoMinimo} anos. Você tem ${pontos} pontos e ${tempoContrib} anos.`;
      if (!podeAposentar) {
        const pontosFaltantes = Math.max(0, pontosMinimo - pontos);
        tempoFaltante = Math.ceil(pontosFaltantes / 2);
      }
    } else if (regra === 'idade-minima') {
      podeAposentar = idade >= idadeMinima && tempoContrib >= tempoMinimo;
      motivo = `Regra de Idade Mínima: precisa de ${idadeMinima} anos de idade e ${tempoMinimo} de contribuição.`;
      if (!podeAposentar) {
        tempoFaltante = Math.max(0, idadeMinima - idade, tempoMinimo - tempoContrib);
      }
    } else {
      // Aposentadoria por idade (sem tempo mínimo, apenas idade)
      podeAposentar = idade >= idadeMinima;
      motivo = `Aposentadoria por Idade: precisa de ${idadeMinima} anos.`;
      if (!podeAposentar) tempoFaltante = idadeMinima - idade;
    }

    // Fator Previdenciário simplificado
    const expectativaVida = 78; // IBGE
    const fatorPrev = sexo === 'masculino' 
      ? ((tempoContrib * 0.31) / expectativaVida) * (1 + (idade + tempoContrib * 0.31) / 100)
      : ((tempoContrib * 0.31) / (expectativaVida + 3)) * (1 + (idade + tempoContrib * 0.31) / 100);
    
    const valorBeneficio = salarioMedio * Math.min(Math.max(fatorPrev, 0.6), 1.0);

    setResultado({ podeAposentar, motivo, pontos, idadeMinima, tempoMinimo, tempoFaltante, valorBeneficio, fatorPrev });
  }, [idade, tempoContrib, sexo, salarioMedio, regra]);

  return (
    <div className="space-y-6" id="calc-aposent">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Aposentadoria INSS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Idade</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={idade} onChange={e => setIdade(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Tempo de Contribuição (anos)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={tempoContrib} onChange={e => setTempoContrib(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Sexo</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={sexo} onChange={e => setSexo(e.target.value)}><option value="masculino">Masculino</option><option value="feminino">Feminino</option></select></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Salário Médio (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={salarioMedio} onChange={e => setSalarioMedio(Number(e.target.value))} /></div>
        <div className="md:col-span-2"><label className="block text-xs font-semibold text-slate-500 mb-1">Regra</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={regra} onChange={e => setRegra(e.target.value)}><option value="pontos">Regra de Pontos</option><option value="idade-minima">Idade Mínima Progressiva</option><option value="por-idade">Aposentadoria por Idade</option></select></div>
      </div>
      {resultado && (
        <div className={`p-5 rounded-xl border ${resultado.podeAposentar ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-center mb-3">
            <span className={`text-2xl font-extrabold ${resultado.podeAposentar ? 'text-emerald-600' : 'text-emerald-600'}`}>
              {resultado.podeAposentar ? '✅ Você já pode se aposentar!' : '⏳ Ainda faltam alguns anos'}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-2 bg-white dark:bg-slate-800 rounded">Pontos: <strong>{resultado.pontos}</strong></div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded">Valor Estimado: <strong className="text-emerald-600">R$ {resultado.valorBeneficio.toFixed(2)}</strong></div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded">Faltam: <strong>{resultado.tempoFaltante} anos</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE PIS/PASEP =====
function CalculadoraPisPasep() {
  const [salarioMedio, setSalarioMedio] = useState<number>(1800);
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(6);
  const [salarioMinimo, setSalarioMinimo] = useState<number>(1518);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const salarioMedioAnual = salarioMedio * 12;
    const temDireito = mesesTrabalhados >= 1 && salarioMedioAnual / 12 <= 2 * salarioMinimo;
    const valorAbono = temDireito ? (salarioMinimo / 12) * mesesTrabalhados : 0;
    setResultado({ temDireito, valorAbono, salarioMedioAnual });
  }, [salarioMedio, mesesTrabalhados, salarioMinimo]);

  return (
    <div className="space-y-6" id="calc-pis">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de PIS/PASEP</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Salário Médio (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={salarioMedio} onChange={e => setSalarioMedio(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Meses Trabalhados</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={mesesTrabalhados} onChange={e => setMesesTrabalhados(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Salário Mínimo (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={salarioMinimo} onChange={e => setSalarioMinimo(Number(e.target.value))} /></div>
      </div>
      {resultado && (
        <div className={`p-5 rounded-xl border ${resultado.temDireito ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
          <p className={`text-center font-bold ${resultado.temDireito ? 'text-emerald-600' : 'text-emerald-600'}`}>
            {resultado.temDireito ? '✅ Você tem direito ao PIS/PASEP!' : '❌ Você não atende os requisitos'}
          </p>
          {resultado.temDireito && (
            <p className="text-center text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono mt-2">
              R$ {resultado.valorAbono.toFixed(2)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE ICMS =====
function CalculadoraICMS() {
  const [valorProduto, setValorProduto] = useState<number>(1000);
  const [estado, setEstado] = useState<string>('SP');
  const [resultado, setResultado] = useState<any>(null);

  const aliquotaICMS: {[key: string]: number} = {
    'SP': 18, 'RJ': 20, 'MG': 18, 'PR': 18, 'RS': 17, 'SC': 17,
    'BA': 18, 'CE': 18, 'PE': 18, 'GO': 17, 'DF': 18, 'ES': 17,
    'MS': 17, 'MT': 17, 'AM': 18, 'PA': 17, 'MA': 18, 'PB': 18,
    'RN': 18, 'PI': 18, 'AL': 17, 'SE': 18, 'RO': 17.5, 'AC': 17,
    'AP': 18, 'RR': 17, 'TO': 18
  };

  useEffect(() => {
    const ali = (aliquotaICMS[estado] || 18) / 100;
    const valorICMS = valorProduto * ali;
    const precoFinal = valorProduto + valorICMS;
    setResultado({ aliquota: ali * 100, valorICMS, precoFinal });
  }, [valorProduto, estado]);

  return (
    <div className="space-y-6" id="calc-icms">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de ICMS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Valor do Produto (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={valorProduto} onChange={e => setValorProduto(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Estado de Destino</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={estado} onChange={e => setEstado(e.target.value)}>
          {Object.keys(aliquotaICMS).sort().map(uf => <option key={uf} value={uf}>{uf} - {aliquotaICMS[uf]}%</option>)}
        </select></div>
      </div>
      {resultado && (
        <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Alíquota ICMS</span><span className="text-lg font-bold font-mono">{resultado.aliquota.toFixed(1)}%</span></div>
            <div><span className="block text-xs text-slate-500">Valor do ICMS</span><span className="text-lg font-bold text-emerald-500 font-mono">R$ {resultado.valorICMS.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Preço Final</span><span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.precoFinal.toFixed(2)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE ITBI =====
function CalculadoraITBI() {
  const [valorImovel, setValorImovel] = useState<number>(300000);
  const [municipio, setMunicipio] = useState<string>('SP');
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const aliquotas: {[key: string]: number} = { 'SP': 3, 'RJ': 3, 'MG': 3, 'PR': 2.5, 'RS': 3, 'SC': 2, 'BA': 3, 'DF': 3, 'PE': 2 };
    const ali = (aliquotas[municipio] || 3) / 100;
    const valorITBI = valorImovel * ali;
    setResultado({ aliquota: ali * 100, valorITBI });
  }, [valorImovel, municipio]);

  return (
    <div className="space-y-6" id="calc-itbi">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de ITBI</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Valor do Imóvel (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={valorImovel} onChange={e => setValorImovel(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Município</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={municipio} onChange={e => setMunicipio(e.target.value)}><option value="SP">São Paulo (3%)</option><option value="RJ">Rio de Janeiro (3%)</option><option value="MG">Belo Horizonte (3%)</option><option value="PR">Curitiba (2,5%)</option><option value="RS">Porto Alegre (3%)</option><option value="DF">Brasília (3%)</option></select></div>
      </div>
      {resultado && (
        <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Alíquota ITBI</span><span className="text-lg font-bold font-mono">{resultado.aliquota.toFixed(1)}%</span></div>
            <div><span className="block text-xs text-slate-500">Valor do ITBI</span><span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.valorITBI.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE ITCMD =====
function CalculadoraITCMD() {
  const [valorHeranca, setValorHeranca] = useState<number>(500000);
  const [estado, setEstado] = useState<string>('SP');
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const aliquotas: {[key: string]: number} = { 'SP': 4, 'RJ': 5, 'MG': 5, 'PR': 4, 'RS': 4, 'SC': 4, 'BA': 5, 'DF': 4 };
    const ali = (aliquotas[estado] || 4) / 100;
    const valorITCMD = valorHeranca * ali;
    setResultado({ aliquota: ali * 100, valorITCMD });
  }, [valorHeranca, estado]);

  return (
    <div className="space-y-6" id="calc-itcmd">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de ITCMD</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Valor da Herança (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={valorHeranca} onChange={e => setValorHeranca(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Estado</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={estado} onChange={e => setEstado(e.target.value)}><option value="SP">SP (4%)</option><option value="RJ">RJ (5%)</option><option value="MG">MG (5%)</option><option value="PR">PR (4%)</option></select></div>
      </div>
      {resultado && (
        <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-xl border border-slate-100 text-center">
          <span className="block text-xs text-slate-500">Alíquota: {resultado.aliquota.toFixed(0)}%</span>
          <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.valorITCMD.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE PREÇO DE VENDA =====
function CalculadoraPrecoVenda() {
  const [custo, setCusto] = useState<number>(100);
  const [margem, setMargem] = useState<number>(30);
  const [impostos, setImpostos] = useState<number>(15);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const markup = 100 / (100 - margem - impostos);
    const precoVenda = custo * markup;
    const lucroBruto = precoVenda - custo;
    const margemReal = (lucroBruto / precoVenda) * 100;
    setResultado({ precoVenda, lucroBruto, margemReal, markup });
  }, [custo, margem, impostos]);

  return (
    <div className="space-y-6" id="calc-preco-venda">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Preço de Venda</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Custo (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={custo} onChange={e => setCusto(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Margem Desejada (%)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={margem} onChange={e => setMargem(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Impostos (%)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={impostos} onChange={e => setImpostos(Number(e.target.value))} /></div>
      </div>
      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Preço de Venda</span><span className="text-2xl font-extrabold text-emerald-700 font-mono">R$ {resultado.precoVenda.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Lucro Bruto</span><span className="text-lg font-bold text-emerald-600 font-mono">R$ {resultado.lucroBruto.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Margem Real</span><span className="text-lg font-bold font-mono">{resultado.margemReal.toFixed(1)}%</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE PERICULOSIDADE =====
function CalculadoraPericulosidade() {
  const [salario, setSalario] = useState<number>(2500);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const adicional = salario * 0.30;
    const total = salario + adicional;
    setResultado({ adicional, total });
  }, [salario]);

  return (
    <div className="space-y-6" id="calc-peric">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Adicional de Periculosidade</h2>
      <div><label className="block text-xs font-semibold text-slate-500 mb-1">Salário Base (R$)</label><input type="number" className="w-full md:w-1/2 border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={salario} onChange={e => setSalario(Number(e.target.value))} /></div>
      {resultado && (
        <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-xl border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Adicional (30%)</span><span className="text-lg font-bold text-emerald-600 font-mono">R$ {resultado.adicional.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Salário Total</span><span className="text-2xl font-extrabold text-emerald-700 font-mono">R$ {resultado.total.toFixed(2)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE INSALUBRIDADE =====
function CalculadoraInsalubridade() {
  const [salarioMinimo, setSalarioMinimo] = useState<number>(1518);
  const [grau, setGrau] = useState<string>('medio');
  const [resultado, setResultado] = useState<any>(null);

  const percentuais: {[key: string]: number} = { 'minimo': 10, 'medio': 20, 'maximo': 40 };

  useEffect(() => {
    const perc = (percentuais[grau] || 20) / 100;
    const adicional = salarioMinimo * perc;
    setResultado({ perc: perc * 100, adicional });
  }, [salarioMinimo, grau]);

  return (
    <div className="space-y-6" id="calc-insal">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Adicional de Insalubridade</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Salário Mínimo (R$)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={salarioMinimo} onChange={e => setSalarioMinimo(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Grau de Insalubridade</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={grau} onChange={e => setGrau(e.target.value)}><option value="minimo">Mínimo (10%)</option><option value="medio">Médio (20%)</option><option value="maximo">Máximo (40%)</option></select></div>
      </div>
      {resultado && (
        <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100 text-center">
          <span className="block text-xs text-slate-500">Adicional ({resultado.perc.toFixed(0)}%)</span>
          <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.adicional.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE IDADE CANINA =====
function CalculadoraIdadeCanina() {
  const [idadeHumana, setIdadeHumana] = useState<number>(5);
  const [porte, setPorte] = useState<string>('medio');
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    let idadeCanina = 0;
    if (idadeHumana <= 2) {
      idadeCanina = idadeHumana * 12.5; // 1 ano = ~12.5 anos caninos
    } else {
      idadeCanina = 25 + (idadeHumana - 2) * (porte === 'pequeno' ? 4.5 : porte === 'medio' ? 5 : 6.5);
    }
    setResultado({ idadeCanina: Math.round(idadeCanina) });
  }, [idadeHumana, porte]);

  return (
    <div className="space-y-6" id="calc-idade-canina">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Idade Canina</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Idade do Cachorro (anos humanos)</label><input type="number" className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={idadeHumana} onChange={e => setIdadeHumana(Number(e.target.value))} /></div>
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Porte</label><select className="w-full border rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={porte} onChange={e => setPorte(e.target.value)}><option value="pequeno">Pequeno</option><option value="medio">Médio</option><option value="grande">Grande</option></select></div>
      </div>
      {resultado && (
        <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-xl border border-slate-100 text-center">
          <span className="block text-xs text-slate-500">Idade em Anos Caninos 🐕</span>
          <span className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{resultado.idadeCanina} anos</span>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE CALORIAS DIÁRIAS =====
function CalculadoraCaloriasDiarias() {
  const [peso, setPeso] = useState<number>(70);
  const [altura, setAltura] = useState<number>(170);
  const [idade, setIdade] = useState<number>(30);
  const [sexo, setSexo] = useState<string>('masculino');
  const [atividade, setAtividade] = useState<string>('moderado');
  const [objetivo, setObjetivo] = useState<string>('manter');
  const [resultado, setResultado] = useState<any>(null);

  const fatoresAtv: {[key: string]: number} = { 'sedentario': 1.2, 'leve': 1.375, 'moderado': 1.55, 'intenso': 1.725 };

  useEffect(() => {
    let tmb = sexo === 'masculino' 
      ? 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade)
      : 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
    const get = tmb * (fatoresAtv[atividade] || 1.55);
    const calorias = objetivo === 'perder' ? get - 500 : objetivo === 'ganhar' ? get + 300 : get;
    setResultado({ tmb: Math.round(tmb), get: Math.round(get), calorias: Math.round(calorias) });
  }, [peso, altura, idade, sexo, atividade, objetivo]);

  return (
    <div className="space-y-6" id="calc-calorias">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Calorias Diárias</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div><label className="block text-xs">Peso (kg)</label><input type="number" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={peso} onChange={e => setPeso(Number(e.target.value))} /></div>
        <div><label className="block text-xs">Altura (cm)</label><input type="number" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={altura} onChange={e => setAltura(Number(e.target.value))} /></div>
        <div><label className="block text-xs">Idade</label><input type="number" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={idade} onChange={e => setIdade(Number(e.target.value))} /></div>
        <div><label className="block text-xs">Sexo</label><select className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={sexo} onChange={e => setSexo(e.target.value)}><option value="masculino">Masc</option><option value="feminino">Fem</option></select></div>
        <div><label className="block text-xs">Atividade</label><select className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={atividade} onChange={e => setAtividade(e.target.value)}><option value="sedentario">Sedentário</option><option value="leve">Leve</option><option value="moderado">Moderado</option><option value="intenso">Intenso</option></select></div>
        <div><label className="block text-xs">Objetivo</label><select className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={objetivo} onChange={e => setObjetivo(e.target.value)}><option value="perder">Perder Peso</option><option value="manter">Manter</option><option value="ganhar">Ganhar Massa</option></select></div>
      </div>
      {resultado && (
        <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100 text-center">
          <span className="block text-xs text-slate-500">Calorias Recomendadas por Dia</span>
          <span className="text-3xl font-extrabold text-emerald-700 font-mono">{resultado.calorias} kcal</span>
          <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
            <div className="p-2 bg-white dark:bg-slate-800 rounded">TMB: {resultado.tmb} kcal</div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded">GET: {resultado.get} kcal</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA DE NOTA DO ENEM =====
function CalculadoraNotaEnem() {
  const [linguagens, setLinguagens] = useState<number>(600);
  const [humanas, setHumanas] = useState<number>(650);
  const [natureza, setNatureza] = useState<number>(550);
  const [matematica, setMatematica] = useState<number>(700);
  const [redacao, setRedacao] = useState<number>(800);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const notas = [linguagens, humanas, natureza, matematica, redacao];
    const mediaSimples = notas.reduce((a, b) => a + b, 0) / 5;
    const mediaPonderada = (linguagens * 1 + humanas * 1 + natureza * 2 + matematica * 3 + redacao * 3) / 10;
    setResultado({ mediaSimples, mediaPonderada, notas });
  }, [linguagens, humanas, natureza, matematica, redacao]);

  const cursosPorPeso: {[key: string]: string} = {
    'Medicina': 'Redação + Natureza + Matemática (peso maior)',
    'Engenharia': 'Matemática + Natureza (peso maior)',
    'Direito': 'Redação + Humanas (peso maior)',
    'Psicologia': 'Linguagens + Redação (peso maior)',
  };

  return (
    <div className="space-y-6" id="calc-enem">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Nota do ENEM</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div><label className="block text-xs">Linguagens</label><input type="number" step="10" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={linguagens} onChange={e => setLinguagens(Number(e.target.value))} /></div>
        <div><label className="block text-xs">Humanas</label><input type="number" step="10" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={humanas} onChange={e => setHumanas(Number(e.target.value))} /></div>
        <div><label className="block text-xs">Natureza</label><input type="number" step="10" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={natureza} onChange={e => setNatureza(Number(e.target.value))} /></div>
        <div><label className="block text-xs">Matemática</label><input type="number" step="10" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={matematica} onChange={e => setMatematica(Number(e.target.value))} /></div>
        <div><label className="block text-xs">Redação</label><input type="number" step="10" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={redacao} onChange={e => setRedacao(Number(e.target.value))} /></div>
      </div>
      {resultado && (
        <div className="bg-slate-50/50 dark:bg-slate-950/20 p-5 rounded-xl border border-slate-100 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg"><span className="block text-xs text-slate-500">Média Simples</span><span className="text-2xl font-bold font-mono">{resultado.mediaSimples.toFixed(1)}</span></div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg"><span className="block text-xs text-slate-500">Média Ponderada (Mat + Redação)</span><span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{resultado.mediaPonderada.toFixed(1)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== CALCULADORA MOVE BRASIL =====
function CalculadoraMoveBrasil() {
  const [valorVeiculo, setValorVeiculo] = useState<number>(80000);
  const [entrada, setEntrada] = useState<number>(10000);
  const [prazoMeses, setPrazoMeses] = useState<number>(60);
  const [perfil, setPerfil] = useState<string>('masculino');
  const [resultado, setResultado] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const valorFinanciado = Math.max(0, valorVeiculo - entrada);
    // Taxas BNDES Move Brasil - Taxas mensais diretas
    const taxaMensal = perfil === 'feminino' ? 0.0091 : 0.0099;
    
    // Parcela Price
    const parcela = valorFinanciado > 0 
      ? (valorFinanciado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -prazoMeses))
      : 0;
    
    const totalPago = parcela * prazoMeses;
    const totalJuros = totalPago - valorFinanciado;
    const custoEfetivoAnual = (Math.pow(1 + taxaMensal, 12) - 1) * 100;
    
    // Simulacao financiamento tradicional (mercado ~18% a.a.)
    const taxaTradicional = 0.18 / 12;
    const parcelaTradicional = valorFinanciado > 0
      ? (valorFinanciado * taxaTradicional) / (1 - Math.pow(1 + taxaTradicional, -prazoMeses))
      : 0;
    const totalTradicional = parcelaTradicional * prazoMeses;
    const economiaTotal = totalTradicional - totalPago;

    setResultado({
      valorFinanciado,
      parcela,
      totalPago,
      totalJuros,
      custoEfetivoAnual,
      taxaAnual: taxaMensal * 12 * 100,      taxaMensalExibir: (taxaMensal * 100).toFixed(2),

      parcelaTradicional,
      totalTradicional,
      economiaTotal
    });
  }, [valorVeiculo, entrada, prazoMeses, perfil]);

  return (
    <div className="space-y-6" id="calc-move-brasil">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
          <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Calculadora Move Brasil</h2>
          <p className="text-xs text-slate-500">Programa Mover - Financiamento Subsidiado BNDES</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-emerald-50 dark:from-emerald-950/20 dark:to-emerald-950/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 mb-4">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>MOVE Brasil</strong> é o programa do Governo Federal que oferece crédito subsidiado pelo BNDES para 
          motoristas de aplicativo, taxistas e motoboys comprarem veículos novos com juros a partir de <strong>1,5% ao ano</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="move-valor" className="block text-xs font-semibold text-slate-500 mb-1">Valor do Veículo (R$)</label>
          <input id="move-valor" type="number" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
            value={valorVeiculo} onChange={e => setValorVeiculo(Number(e.target.value))} />
          <span className="text-[10px] text-slate-400">Máx: R$ 150.000</span>
        </div>
        <div>
          <label htmlFor="move-entrada" className="block text-xs font-semibold text-slate-500 mb-1">Valor de Entrada (R$)</label>
          <input id="move-entrada" type="number" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
            value={entrada} onChange={e => setEntrada(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Prazo (meses)</label>
          <select className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            value={prazoMeses} onChange={e => setPrazoMeses(Number(e.target.value))}>
            {[24, 36, 48, 60, 72].map(m => <option key={m} value={m}>{m} meses ({m/12} anos)</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Perfil</label>
          <select className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" 
            value={perfil} onChange={e => setPerfil(e.target.value)}>
            <option value="masculino">Masculino (0,99% a.m.)</option>
            <option value="feminino">Feminino (0,91% a.m.)</option>
          </select>
        </div>
      </div>

      {resultado && (
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 text-center shadow-sm">
              <span className="block text-xs text-slate-500 mb-1">💰 Valor Financiado</span>
              <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100 font-mono">
                R$ {resultado.valorFinanciado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900 text-center shadow-sm">
              <span className="block text-xs text-emerald-600 dark:text-emerald-400 mb-1">📅 Parcela Mensal MOVE</span>
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
                R$ {resultado.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className="block text-[10px] text-emerald-500 mt-1">Taxa: {resultado.taxaMensalExibir}% a.m.</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/20 p-5 rounded-xl border border-slate-200 dark:border-slate-900 text-center shadow-sm">
              <span className="block text-xs text-emerald-600 dark:text-emerald-400 mb-1">🏦 Parcela Mercado (18% a.a.)</span>
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
                R$ {resultado.parcelaTradicional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-900 text-center">
            <span className="block text-xs text-emerald-600 dark:text-emerald-400 mb-1">✅ Economia Total com o MOVE Brasil</span>
            <span className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
              R$ {resultado.economiaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            {showDetails ? '▼' : '▶'} {showDetails ? 'Ocultar' : 'Ver'} detalhes do financiamento
          </button>

          {showDetails && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-2 bg-white dark:bg-slate-800 rounded"><span className="text-slate-400">Total Pago MOVE</span><br/><strong className="text-emerald-600 font-mono">R$ {resultado.totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded"><span className="text-slate-400">Total Juros MOVE</span><br/><strong className="text-emerald-600 font-mono">R$ {resultado.totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded"><span className="text-slate-400">Custo Efetivo Total</span><br/><strong className="text-slate-700 font-mono">{resultado.custoEfetivoAnual.toFixed(2)}% a.a.</strong></div>
                <div className="p-2 bg-white dark:bg-slate-800 rounded"><span className="text-slate-400">Total Mercado</span><br/><strong className="text-emerald-600 font-mono">R$ {resultado.totalTradicional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></div>
              </div>
            </div>
          )}

          <div className="bg-slate-50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-100 dark:border-slate-900/50">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mb-2">📋 Como Participar do MOVE Brasil</h4>
            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal pl-4">
              <li><strong>Cadastre-se</strong> no portal oficial <a href="https://www.gov.br/movebrasil" target="_blank" className="text-emerald-600 underline">gov.br/movebrasil</a></li>
              <li><strong>Aguarde a aprovação</strong> de elegibilidade (até 5 dias via gov.br)</li>
              <li><strong>Procure uma concessionária</strong> ou banco credenciado pelo BNDES</li>
              <li><strong>Solicite o crédito</strong> e passe pela análise bancária padrão</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}


// ===== PLACEHOLDER PARA NOVAS CALCULADORAS =====
function PlaceholderCalculadora({ id }: { id: string }) {
  const nomes: {[key: string]: string} = {
    'aposentadoria-inss': 'Calculadora de Aposentadoria INSS',
    'pis-pasep': 'Calculadora de PIS/PASEP',
    'icms': 'Calculadora de ICMS',
    'itbi': 'Calculadora de ITBI',
    'itcmd': 'Calculadora de ITCMD',
    'preco-venda': 'Calculadora de Preço de Venda',
    'periculosidade': 'Calculadora de Adicional de Periculosidade',
    'insalubridade': 'Calculadora de Adicional de Insalubridade',
    'idade-canina': 'Calculadora de Idade Canina',
    'calorias-diarias': 'Calculadora de Calorias Diárias',
    'nota-enem': 'Calculadora de Nota do ENEM',
  };
  return (
    <div className="space-y-6 text-center py-8" id={`placeholder-${id}`}>
      <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-950">
        <span className="text-3xl block mb-3">🔧</span>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{nomes[id] || id}</h3>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
          Ferramenta em desenvolvimento. Enquanto isso, confira o conteúdo editorial abaixo com informações completas sobre {nomes[id]?.toLowerCase() || 'esta ferramenta'}.
        </p>
        <div className="mt-4 flex gap-2 justify-center text-xs">
          <a href="#" className="px-3 py-1.5 bg-emerald-600 text-white rounded font-bold">Ver Ferramentas Relacionadas</a>
        </div>
      </div>
    </div>
  );
}

// 10. CONSUMO DE COMBUSTÍVEL
function ConsumoCombustivel() {
  const [distancia, setDistancia] = useState<number>(300);
  const [consumo, setConsumo] = useState<number>(12);
  const [preco, setPreco] = useState<number>(5.8);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const litrosNecessarios = distancia / consumo;
    const custoEstimado = litrosNecessarios * preco;

    setResultado({
      litros: litrosNecessarios,
      custoField: custoEstimado
    });
  }, [distancia, consumo, preco]);

  return (
    <div className="space-y-6" id="calc-comb">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Custo de Viagem & Consumo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Distância da Rota (km)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={distancia} onChange={(e) => setDistancia(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Consumo Médio do Carro (km/L)</label>
          <input type="number" step="0.1" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={consumo} onChange={(e) => setConsumo(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Preço Litro Combustível (R$)</label>
          <input type="number" step="0.01" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
        </div>
      </div>

      {resultado && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-950">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-2 border-r border-emerald-100/30">
              <span className="block text-xs text-slate-500">Combustível Requerido</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.litros.toFixed(1)} Litros</span>
            </div>
            <div className="p-2">
              <span className="block text-xs text-slate-500">Gasto Estimado de Litros</span>
              <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {resultado.custoField.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 11. REGRA DE TRÊS
function RegraDeTres() {
  const [valA, setValA] = useState<string>(() => getParamString('a', '10'));
  const [valB, setValB] = useState<string>(() => getParamString('b', '20'));
  const [valC, setValC] = useState<string>(() => getParamString('c', '50'));
  const [resultado, setResultado] = useState<string>('?');

  const calcular = () => {
    syncUrlParams({ a: valA, b: valB, c: valC });
    const a = parseFloat(valA);
    const b = parseFloat(valB);
    const c = parseFloat(valC);

    if (!isNaN(a) && !isNaN(b) && !isNaN(c) && a !== 0) {
      const x = (b * c) / a;
      setResultado(x.toLocaleString('pt-BR', { maximumFractionDigits: 4 }));
    } else {
      setResultado('Erro');
    }
  };

  useEffect(() => { calcular(); }, [valA, valB, valC]);

  const summary = `🔢 *Regra de Três Proporcional*:\n• *${valA}* está para *${valB}*\n• Assim como *${valC}* está para *X*\n\n👉 *Resultado X = ${resultado}*`;

  return (
    <div className="space-y-6" id="calc-regra3">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Regra de Três Proporcional</h2>
      <p className="text-xs text-slate-500">Equivale a dizer: "A está para B, assim como C está para X (Resultado)"</p>
      
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center bg-slate-50 dark:bg-slate-850 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="space-y-2 text-center">
          <input type="number" className="w-24 text-center border p-2 rounded-lg bg-white dark:bg-slate-800 font-mono text-sm" value={valA} onChange={(e) => setValA(e.target.value)} />
          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Valor A</span>
        </div>

        <div className="text-slate-300 font-bold">➟ está para</div>

        <div className="space-y-2 text-center">
          <input type="number" className="w-24 text-center border p-2 rounded-lg bg-white dark:bg-slate-800 font-mono text-sm" value={valB} onChange={(e) => setValB(e.target.value)} />
          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Valor B</span>
        </div>

        <div className="text-slate-400 font-bold mx-2">Assim como</div>

        <div className="space-y-2 text-center">
          <input type="number" className="w-24 text-center border p-2 rounded-lg bg-white dark:bg-slate-800 font-mono text-sm" value={valC} onChange={(e) => setValC(e.target.value)} />
          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Valor C</span>
        </div>

        <div className="text-slate-300 font-bold">➟ está para</div>

        <div className="space-y-2 text-center">
          <div className="w-32 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 rounded-lg p-2 font-mono font-bold text-center text-emerald-800 dark:text-emerald-300 text-sm">
            {resultado}
          </div>
          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Resultado X</span>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Regra de Três" 
        summaryText={summary}
      />
    </div>
  );
}

// 12. PORCENTAGEM
function Porcentagem() {
  const [p1, setP1] = useState<number>(15);
  const [v1, setV1] = useState<number>(200);
  const [res1, setRes1] = useState<any>(null);

  const [p2a, setP2a] = useState<number>(50);
  const [p2b, setP2b] = useState<number>(250);
  const [res2, setRes2] = useState<any>(null);

  const [p3, setP3] = useState<number>(10);
  const [v3, setV3] = useState<number>(150);
  const [res3, setRes3] = useState<any>(null);

  useEffect(() => {
    setRes1((p1 / 100) * v1);
  }, [p1, v1]);

  useEffect(() => {
    if (p2b !== 0) setRes2((p2a / p2b) * 100);
  }, [p2a, p2b]);

  useEffect(() => {
    const acresc = v3 + (p3 / 100) * v3;
    const decresc = v3 - (p3 / 100) * v3;
    setRes3({ a: acresc, d: decresc });
  }, [p3, v3]);

  return (
    <div className="space-y-6" id="calc-porcent">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Porcentagem</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-lg border border-slate-100 dark:border-slate-800 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quanto é X% de um valor?</h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <input type="number" className="w-16 border rounded p-1 text-center bg-white dark:bg-slate-800 font-mono" value={p1} onChange={(e) => setP1(Number(e.target.value))} />
            <span>% de</span>
            <input type="number" className="w-20 border rounded p-1 text-center bg-white dark:bg-slate-800 font-mono" value={v1} onChange={(e) => setV1(Number(e.target.value))} />
          </div>
          {res1 !== null && <div className="text-sm font-bold text-emerald-600 font-mono">= {res1.toLocaleString('pt-BR')}</div>}
        </div>

        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-lg border border-slate-100 dark:border-slate-800 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Qual porcetagem representa?</h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <input type="number" className="w-16 border rounded p-1 text-center bg-white dark:bg-slate-800 font-mono" value={p2a} onChange={(e) => setP2a(Number(e.target.value))} />
            <span>sobre</span>
            <input type="number" className="w-20 border rounded p-1 text-center bg-white dark:bg-slate-800 font-mono" value={p2b} onChange={(e) => setP2b(Number(e.target.value))} />
          </div>
          {res2 !== null && <div className="text-sm font-bold text-emerald-600 font-mono">= {res2.toFixed(2)}%</div>}
        </div>

        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-lg border border-slate-100 dark:border-slate-800 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Aumento / Desconto de X%</h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <span>Fluctuar</span>
            <input type="number" className="w-16 border rounded p-1 text-center bg-white dark:bg-slate-800 font-mono" value={p3} onChange={(e) => setP3(Number(e.target.value))} />
            <span>% em</span>
            <input type="number" className="w-20 border rounded p-1 text-center bg-white dark:bg-slate-800 font-mono" value={v3} onChange={(e) => setV3(Number(e.target.value))} />
          </div>
          {res3 && (
            <div className="text-[11px] font-mono space-y-0.5">
              <div className="text-emerald-600 font-bold">Acrescido: {res3.a.toLocaleString('pt-BR')}</div>
              <div className="text-emerald-500 font-bold">Descontado: {res3.d.toLocaleString('pt-BR')}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 13. IDADE EXATA
function IdadeExata() {
  const [dataNascimento, setDataNascimento] = useState<string>('1995-10-15');
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    if (!dataNascimento) return;
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    
    let diffAnos = hoje.getFullYear() - nascimento.getFullYear();
    let diffMeses = hoje.getMonth() - nascimento.getMonth();
    let diffDias = hoje.getDate() - nascimento.getDate();

    if (diffDias < 0) {
      diffMeses--;
      const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
      diffDias += ultimoDiaMesAnterior;
    }

    if (diffMeses < 0) {
      diffAnos--;
      diffMeses += 12;
    }

    const tDiasCorridos = Math.floor((hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24));
    
    setResultado({
      anos: diffAnos,
      meses: diffMeses,
      dias: diffDias,
      diasTotais: tDiasCorridos
    });
  }, [dataNascimento]);

  return (
    <div className="space-y-6" id="calc-idade">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Idade Precisa</h2>
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1">Selecione sua Data de Nascimento</label>
        <input type="date" className="w-full md:w-1/3 border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
      </div>

      {resultado && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="block text-xs text-slate-400">Anos Vividos</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.anos}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="block text-xs text-slate-400">Meses Complementares</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.meses}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="block text-xs text-slate-400">Dias Corridos</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.dias}</span>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-950">
            <span className="block text-xs text-slate-500">Dias Totais de Vida</span>
            <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{resultado.diasTotais.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 14. DIAS ENTRE DATAS
function DiasEntreDatas() {
  const [dataStart, setDataStart] = useState<string>('2026-01-01');
  const [dataEnd, setDataEnd] = useState<string>('2026-12-31');
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    if (!dataStart || !dataEnd) return;
    const start = new Date(dataStart);
    const end = new Date(dataEnd);

    const diff = end.getTime() - start.getTime();
    const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Contagem aproximada de finais de semana
    let uteis = 0;
    const pDaughter = new Date(start);
    while (pDaughter <= end) {
      const d = pDaughter.getDay();
      if (d !== 0 && d !== 6) uteis++;
      pDaughter.setDate(pDaughter.getDate() + 1);
    }

    setResultado({
      corridos: totalDias,
      uteis: uteis,
      semanas: Math.floor(totalDias / 7)
    });
  }, [dataStart, dataEnd]);

  return (
    <div className="space-y-6" id="calc-diasdatas">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cálculo de Dias entre Datas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Data de Início</label>
          <input type="date" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={dataStart} onChange={(e) => setDataStart(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Data Final</label>
          <input type="date" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={dataEnd} onChange={(e) => setDataEnd(e.target.value)} />
        </div>
      </div>

      {resultado && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="block text-xs text-slate-400">Dias Corridos Totais</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.corridos}</span>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-950">
            <span className="block text-xs text-slate-500">Dias Úteis Estimados (Sem FDS)</span>
            <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{resultado.uteis}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="block text-xs text-slate-400">Total de Semanas Corridas</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.semanas}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 15. HORA EXTRA
function HoraExtra() {
  const [salario, setSalario] = useState<number>(3000);
  const [jornada, setJornada] = useState<number>(220);
  const [horas50, setHoras50] = useState<number>(10);
  const [horas100, setHoras100] = useState<number>(5);
  const [horasNoturnas, setHorasNoturnas] = useState<number>(0);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const valorHoraComum = salario / (jornada || 220);
    const valorExtra50 = valorHoraComum * 1.5;
    const valorExtra100 = valorHoraComum * 2.0;
    const valorNoturno = valorHoraComum * 0.2; // Adicional de 20%

    const total50 = horas50 * valorExtra50;
    const total100 = horas100 * valorExtra100;
    const totalNoturno = horasNoturnas * valorNoturno;
    const totalExtras = total50 + total100 + totalNoturno;

    // Descanso Semanal Remunerado (DSR) aproximado: (total extras / 26 dias úteis) * 4 domingos/feriados
    const dsr = (totalExtras / 26) * 4;
    const brutoFinal = totalExtras + dsr;

    setResultado({
      valorHora: valorHoraComum,
      valor50: valorExtra50,
      valor100: valorExtra100,
      valorNoturno: valorNoturno,
      sub50: total50,
      sub100: total100,
      subNoturno: totalNoturno,
      totalExtras: totalExtras,
      dsr: dsr,
      totalGeral: brutoFinal
    });
  }, [salario, jornada, horas50, horas100, horasNoturnas]);

  return (
    <div className="space-y-6" id="calc-hora-extra">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Cálculo de Horas Extras (CLT)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Salário Bruto Mensal (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={salario} onChange={(e) => setSalario(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Jornada Mensal (Horas)</label>
          <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={jornada} onChange={(e) => setJornada(Number(e.target.value))}>
            <option value="220">220h (44h semanais)</option>
            <option value="200">200h (40h semanais)</option>
            <option value="180">180h (36h semanais)</option>
            <option value="150">150h (30h semanais)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Qtd Horas Extras 50%</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={horas50} onChange={(e) => setHoras50(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Qtd Horas Extras 100%</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={horas100} onChange={(e) => setHoras100(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Horas sob Adicional Noturno</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={horasNoturnas} onChange={(e) => setHorasNoturnas(Number(e.target.value))} placeholder="Ex: Horas entre 22h e 5h" />
          <p className="text-[10px] text-slate-400 mt-1">Usa alíquota oficial urbana de 20% sobre o valor da hora base.</p>
        </div>
      </div>

      {resultado && (
        <div className="space-y-4 pt-2">
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-950/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-2 border-r border-emerald-100/30">
                <span className="block text-xs text-slate-500">Salário-Hora Base</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">
                  R$ {resultado.valorHour !== undefined ? resultado.valorHour.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : resultado.valorHora.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-2 border-r border-emerald-100/30">
                <span className="block text-xs text-slate-500">Total Líquido de Horas Extras</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">
                  R$ {resultado.totalExtras.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-2">
                <span className="block text-xs text-slate-500">Valor Bruto Total a Receber</span>
                <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
                  R$ {resultado.totalGeral.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto text-xs bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider text-[10px]">Detalhamento das Operações:</h4>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Hora Extra 50% ({horas50}h @ R$ {resultado.valor50.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/h)</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">R$ {resultado.sub50.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Hora Extra 100% ({horas100}h @ R$ {resultado.valor100.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/h)</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">R$ {resultado.sub100.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Adicional Noturno ({horasNoturnas}h @ R$ {resultado.valorNoturno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/h)</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">R$ {resultado.subNoturno.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500 font-semibold text-emerald-600">Reflexo sobre Descanso Semanal Remunerado (DSR)</span>
                <span className="font-mono font-bold text-emerald-600">R$ {resultado.dsr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 16. SEGURO DESEMPREGO
function SeguroDesemprego() {
  const [salarioMedio, setSalarioMedio] = useState<number>(3000);
  const [solicitacoes, setSolicitacoes] = useState<string>('1');
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(12);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const solicInt = parseInt(solicitacoes, 10);
    let elegivel = false;
    let motivoMsg = '';

    // Regras de Elegibilidade Brasileiras
    if (solicInt === 1) {
      if (mesesTrabalhados >= 12) {
        elegivel = true;
      } else {
        motivoMsg = 'Para a primeira solicitação, é exigido um mínimo de 12 meses de vínculo nos últimos 18 anteriores à dispensa.';
      }
    } else if (solicInt === 2) {
      if (mesesTrabalhados >= 9) {
        elegivel = true;
      } else {
        motivoMsg = 'Para a segunda solicitação, é exigido um mínimo de 9 meses de vínculo nos últimos 12 anteriores à dispensa.';
      }
    } else {
      if (mesesTrabalhados >= 6) {
        elegivel = true;
      } else {
        motivoMsg = 'Para a terceira solicitação em diante, é exigido um mínimo de 6 meses de vínculo direto antes da dispensa.';
      }
    }

    // Cálculo das Parcelas
    let numParcelas = 0;
    if (elegivel) {
      if (mesesTrabalhados >= 6 && mesesTrabalhados <= 11) {
        numParcelas = 3;
      } else if (mesesTrabalhados >= 12 && mesesTrabalhados <= 23) {
        numParcelas = 4;
      } else if (mesesTrabalhados >= 24) {
        numParcelas = 5;
      }
    }

    // Cálculo do valor da parcela
    let valorParcela = 0;
    if (elegivel) {
      if (salarioMedio <= 2230.97) {
        valorParcela = salarioMedio * 0.8;
      } else if (salarioMedio <= 3719.00) {
        const excedente = salarioMedio - 2230.97;
        valorParcela = 1784.78 + (excedente * 0.5);
      } else {
        valorParcela = 2528.79; // Teto Máximo oficial aproximado de 2026
      }

      // Piso é o salário mínimo nacional (R$ 1.412,00)
      if (valorParcela < 1412.00) {
        valorParcela = 1412.00;
      }
    }

    setResultado({
      elegivel,
      motivoMsg,
      numParcelas,
      valorParcela,
      totalBeneficio: numParcelas * valorParcela
    });
  }, [salarioMedio, solicitacoes, mesesTrabalhados]);

  return (
    <div className="space-y-6" id="calc-seguro-desemprego">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Simulação do Seguro-Desemprego</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Média dos Últimos 3 Salários (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={salarioMedio} onChange={(e) => setSalarioMedio(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Qual solicitação do benefício?</label>
          <select className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500" value={solicitacoes} onChange={(e) => setSolicitacoes(e.target.value)}>
            <option value="1">1ª Solicitação</option>
            <option value="2">2ª Solicitação</option>
            <option value="3">3ª Solicitação ou Superior</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Meses Trabalhados (Último Emprego)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={mesesTrabalhados} onChange={(e) => setMesesTrabalhados(Number(e.target.value))} />
        </div>
      </div>

      {resultado && (
        <div className="space-y-4 pt-2">
          {!resultado.elegivel ? (
            <div className="bg-slate-50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-100 dark:border-slate-950/50 text-emerald-800 dark:text-emerald-400 text-xs">
              <strong>⚠ Não Elegível ao Benefício:</strong> {resultado.motivoMsg}
            </div>
          ) : (
            <>
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-950/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-2 border-r border-emerald-100/30">
                    <span className="block text-xs text-slate-500">Parcelas Devidas</span>
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-200 font-mono">
                      {resultado.numParcelas} Parcelas
                    </span>
                  </div>
                  <div className="p-2 border-r border-emerald-100/30">
                    <span className="block text-xs text-slate-500">Valor Unitário por Parcela</span>
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-200 font-mono">
                      R$ {resultado.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="p-2">
                    <span className="block text-xs text-slate-500">Apoio Financeiro Total Recebido</span>
                    <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
                      R$ {resultado.totalBeneficio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1 text-slate-500 dark:text-slate-400">
                <p>💡 <strong>Informações do Ministério do Trabalho:</strong></p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>O valor oficial da parcela não pode ser menor que o salário mínimo federal (atualmente regulamentado em R$ 1.412,00).</li>
                  <li>A liberação ocorre exatamente 30 dias após dar entrada no benefício no portal Gov.br ou agência conveniada.</li>
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// 17. SALÁRIO LÍQUIDO
function SalarioLiquido() {
  const [salarioBruto, setSalarioBruto] = useState<number>(() => getParamNumber('bruto', 3500));
  const [dependentes, setDependentes] = useState<number>(() => getParamNumber('dep', 0));
  const [outrasDeducoes, setOutrasDeducoes] = useState<number>(() => getParamNumber('extra', 0));
  const [valeTransporte, setValeTransporte] = useState<boolean>(() => getParamBoolean('vt', false));
  const [vrCopart, setVrCopart] = useState<number>(() => getParamNumber('vr', 0));
  const [planoSaude, setPlanoSaude] = useState<number>(() => getParamNumber('saude', 0));
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    syncUrlParams({
      bruto: salarioBruto,
      dep: dependentes,
      extra: outrasDeducoes,
      vt: valeTransporte,
      vr: vrCopart,
      saude: planoSaude
    });

    // 1. INSS PROGRESSIVO 2026/VIGENTE
    const faixasINSS = [
      { limite: 1412, aliquota: 0.075 },
      { limite: 2666.68, aliquota: 0.09 },
      { limite: 4000.03, aliquota: 0.12 },
      { limite: 7786.02, aliquota: 0.14 }
    ];

    let valorINSS = 0;
    let baseRestante = salarioBruto;
    let anteriorLimite = 0;

    for (let f of faixasINSS) {
      if (salarioBruto > anteriorLimite) {
        const baseDeCalculo = Math.min(salarioBruto, f.limite) - anteriorLimite;
        valorINSS += baseDeCalculo * f.aliquota;
        anteriorLimite = f.limite;
        if (salarioBruto <= f.limite) break;
      }
    }

    // Limitador ao teto do INSS
    const tetoINSS = 908.85;
    if (valorINSS > tetoINSS) {
      valorINSS = tetoINSS;
    }

    // 2. IRRF PROGRESSIVO 2026
    const descontoDependentes = dependentes * 189.59;
    const baseIRRF = Math.max(0, salarioBruto - valorINSS - descontoDependentes - outrasDeducoes);

    let valorIRRF = 0;
    if (baseIRRF <= 2259.20) {
      valorIRRF = 0;
    } else if (baseIRRF <= 2826.65) {
      valorIRRF = (baseIRRF * 0.075) - 169.44;
    } else if (baseIRRF <= 3751.05) {
      valorIRRF = (baseIRRF * 0.15) - 381.44;
    } else if (baseIRRF <= 4664.68) {
      valorIRRF = (baseIRRF * 0.225) - 662.77;
    } else {
      valorIRRF = (baseIRRF * 0.275) - 896.00;
    }

    if (valorIRRF < 0) {
      valorIRRF = 0;
    }

    // 3. OUTROS DESCONTOS
    const descontoVT = valeTransporte ? salarioBruto * 0.06 : 0;
    const totalDescontos = valorINSS + valorIRRF + descontoVT + vrCopart + planoSaude;
    const liquido = salarioBruto - totalDescontos;
    const porcenDescontos = (totalDescontos / (salarioBruto || 1)) * 100;
    const porcenLiquido = (liquido / (salarioBruto || 1)) * 100;

    setResultado({
      inss: valorINSS,
      irrf: valorIRRF,
      vt: descontoVT,
      totalDescontos: totalDescontos,
      liquido: liquido,
      pctDescontos: porcenDescontos,
      pctLiquido: porcenLiquido
    });
  }, [salarioBruto, dependentes, outrasDeducoes, valeTransporte, vrCopart, planoSaude]);

  const summary = resultado ? `💼 *Cálculo de Salário Líquido (CLT)*:\n💵 *Salário Bruto*: R$ ${salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n📉 *Desconto INSS*: -R$ ${resultado.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n📉 *Desconto IRRF*: -R$ ${resultado.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n📉 *Total de Descontos*: -R$ ${resultado.totalDescontos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${resultado.pctDescontos.toFixed(1)}%)\n\n🟢 *Salário Líquido no Bolso*: *R$ ${resultado.liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*` : undefined;

  return (
    <div className="space-y-6" id="calc-salario-liquido">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calculadora de Salário Líquido (CLT)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Salário Bruto Inicial (R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={salarioBruto} onChange={(e) => setSalarioBruto(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Dependentes Legais (Quantidade)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={dependentes} onChange={(e) => setDependentes(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Deduções Previdenciárias Extra (ex: Pensão)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={outrasDeducoes} onChange={(e) => setOutrasDeducoes(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-50 pt-3">
        <div className="flex items-center gap-2 py-2">
          <input type="checkbox" id="check-vt" className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4" checked={valeTransporte} onChange={(e) => setValeTransporte(e.target.checked)} />
          <label htmlFor="check-vt" className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:cursor-pointer select-none">Descontar Vale Transporte (6%)</label>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Refeição Coparticipação (VR - R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={vrCopart} onChange={(e) => setVrCopart(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1">Plano de Saúde Familiar (Desconto - R$)</label>
          <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 text-sm focus:outline-emerald-500 font-mono" value={planoSaude} onChange={(e) => setPlanoSaude(Number(e.target.value))} />
        </div>
      </div>

      {resultado && (
        <div className="space-y-4 pt-2">
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-950/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-2 border-r border-emerald-100/30">
                <span className="block text-xs text-slate-500">Salário Bruto Inicial</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">
                  R$ {salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-2 border-r border-emerald-100/30">
                <span className="block text-xs text-slate-500">Total de Impostos e Descontos</span>
                <span className="text-base font-bold text-emerald-500 dark:text-emerald-400 font-mono">
                  R$ {resultado.totalDescontos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({resultado.pctDescontos.toFixed(1)}%)
                </span>
              </div>
              <div className="p-2">
                <span className="block text-xs text-slate-500">Salário Líquido Final na Conta</span>
                <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono font-mono">
                  R$ {resultado.liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({resultado.pctLiquido.toFixed(1)}%)
                </span>
              </div>
            </div>
            
            {/* Visual Progress Ratio */}
            <div className="w-full bg-slate-100 dark:bg-slate-950/40 rounded-full h-2.5 mt-4 overflow-hidden flex">
              <div className="bg-emerald-600 h-full" style={{ width: `${resultado.pctLiquido}%` }}></div>
              <div className="bg-slate-500 h-full" style={{ width: `${resultado.pctDescontos}%` }}></div>
            </div>
          </div>

          <div className="overflow-x-auto text-xs bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider text-[10px]">Quadro de Descontos e Impostos do Contra-Cheque:</h4>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Previdência Obrigatória (INSS Progressivo)</span>
                <span className="font-mono font-bold text-emerald-500">- R$ {resultado.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Imposto de Renda Retido na Fonte (IRRF)</span>
                <span className="font-mono font-bold text-emerald-500">- R$ {resultado.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              {valeTransporte && (
                <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Vale Transporte (Dedução de 6% do Empregado)</span>
                  <span className="font-mono font-bold text-emerald-500">- R$ {resultado.vt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {vrCopart > 0 && (
                <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Vale Refeição / Alimentação (Preço Coparticipado)</span>
                  <span className="font-mono font-bold text-emerald-500">- R$ {vrCopart.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {planoSaude > 0 && (
                <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Dedução Plano de Saúde Coletivo Empresarial</span>
                  <span className="font-mono font-bold text-emerald-500">- R$ {planoSaude.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>
          </div>

          <ShareBar 
            title="Calculadora de Salário Líquido (CLT)" 
            summaryText={summary}
          />
        </div>
      )}
    </div>
  );
}

function CalculadoraCLTvsPJ() {
  const [salarioCLT, setSalarioCLT] = useState(5000);
  const [valeTransporte, setValeTransporte] = useState(200);
  const [valeRefeicao, setValeRefeicao] = useState(800);
  const [planoSaude, setPlanoSaude] = useState(300);
  const [valorPJ, setValorPJ] = useState(7500);
  const [aliquotaSimples, setAliquotaSimples] = useState(11);
  const [custoContador, setCustoContador] = useState(300);

  const cltAnual = salarioCLT * 13 + (salarioCLT / 3); // 13o + ferias 1/3
  const fgtsAnual = salarioCLT * 12 * 0.08 + salarioCLT * 12 * 0.005; // FGTS 8% + multa 0.5%
  const beneficiosAnual = (valeTransporte + valeRefeicao + planoSaude) * 12;
  const custoTotalCLT = cltAnual + fgtsAnual + beneficiosAnual;

  const faturamentoAnualPJ = valorPJ * 12;
  const impostosPJ = faturamentoAnualPJ * (aliquotaSimples / 100);
  const contadorAnual = custoContador * 12;
  const inssPJ = faturamentoAnualPJ * 0.11;
  const custoTotalPJ = impostosPJ + contadorAnual + inssPJ;
  const liquidoPJ = faturamentoAnualPJ - custoTotalPJ;

  const diferenca = liquidoPJ - custoTotalCLT;
  const vantagem = diferenca > 0 ? 'PJ' : 'CLT';
  const percentual = Math.abs(diferenca) / custoTotalCLT * 100;

  return (
    <div className="space-y-6" id="calc-clt-vs-pj">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white">Comparativo CLT vs PJ</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Compare os regimes CLT e PJ lado a lado. Preencha os valores abaixo para descobrir qual compensa mais financeiramente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CLT Column */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Regime CLT
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Salário Bruto Mensal (R$)</label>
              <input type="number" value={salarioCLT} onChange={e => setSalarioCLT(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Vale Transporte (R$/mês)</label>
              <input type="number" value={valeTransporte} onChange={e => setValeTransporte(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Vale Refeição (R$/mês)</label>
              <input type="number" value={valeRefeicao} onChange={e => setValeRefeicao(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Plano de Saúde (R$/mês)</label>
              <input type="number" value={planoSaude} onChange={e => setPlanoSaude(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm" />
            </div>
          </div>
        </div>

        {/* PJ Column */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Regime PJ (Pessoa Jurídica)
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Valor Mensal PJ (R$)</label>
              <input type="number" value={valorPJ} onChange={e => setValorPJ(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Alíquota Simples Nacional (%)</label>
              <input type="number" value={aliquotaSimples} onChange={e => setAliquotaSimples(Number(e.target.value))} step="0.1"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm" />
              <span className="text-[10px] text-slate-400">Anexo III (serviços): ~11-16%. Anexo IV (consultoria): ~16-21%.</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Custo Mensal do Contador (R$)</label>
              <input type="number" value={custoContador} onChange={e => setCustoContador(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Resultado Anual</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Custo Total CLT (ano)</div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              R$ {custoTotalCLT.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Líquido PJ (ano)</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              R$ {liquidoPJ.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg text-center ${
          diferenca > 0
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
        }`}>
          <span className="text-lg font-bold">
            {vantagem === 'PJ'
              ? `PJ compensa R$ ${Math.abs(diferenca).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} a mais por ano`
              : `CLT compensa R$ ${Math.abs(diferenca).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} a mais por ano`
            }
          </span>
          <div className="text-sm mt-1 opacity-80">
            ({percentual.toFixed(1)}% de diferença)
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
          <p>* Este cálculo é uma estimativa. Consulte um contador para uma análise personalizada.</p>
          <p className="mt-1">O regime PJ exige reserva para férias, 13° e contingências.</p>
        </div>
      </div>
    </div>
  );
}

function CalculadoraChurrasco() {
  const [homens, setHomens] = useState<number>(() => getParamNumber('homens', 5));
  const [mulheres, setMulheres] = useState<number>(() => getParamNumber('mulheres', 5));
  const [criancas, setCriancas] = useState<number>(() => getParamNumber('criancas', 2));
  
  useEffect(() => {
    syncUrlParams({ homens, mulheres, criancas });
  }, [homens, mulheres, criancas]);

  const totalPessoas = homens + mulheres + criancas;
  
  const carneH = homens * 0.5; // 500g
  const carneM = mulheres * 0.4; // 400g
  const carneC = criancas * 0.25; // 250g
  const totalCarne = carneH + carneM + carneC;
  
  const linguiça = totalPessoas * 0.15;
  const frango = totalPessoas * 0.10;
  const bovina = totalCarne - linguiça - frango;
  
  const paoAlho = totalPessoas * 2; // unidades
  const farofa = totalPessoas * 0.05; // 50g por pessoa
  const carvao = totalCarne * 1.5; // 1.5kg carvão por kg de carne
  
  const cerveja = (homens + mulheres) * 4; // 4 latas por adulto
  const refrigerante = totalPessoas * 0.5; // 500ml por pessoa

  const summary = `🍖 *Lista de Churrasco para ${totalPessoas} pessoas* (${homens} homens, ${mulheres} mulheres, ${criancas} crianças):\n🥩 *Carnes*: ${totalCarne.toFixed(1)}kg (Bovina: ${bovina.toFixed(1)}kg, Linguiça: ${linguiça.toFixed(1)}kg, Frango: ${frango.toFixed(1)}kg)\n🍻 *Bebidas*: ${cerveja} latas de cerveja (~${(cerveja * 0.35).toFixed(1)}L) + ${refrigerante.toFixed(1)}L refri/água\n🥖 *Acompanhamentos*: ${paoAlho} pães de alho + ${farofa.toFixed(1)}kg farofa\n🔥 *Carvão*: ${carvao.toFixed(1)}kg`;
  
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl" id="calc-churrasco">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
        <span>🔥</span> Quantos convidados?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Homens</label>
          <input type="number" min="0" value={homens} onChange={(e) => setHomens(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mulheres</label>
          <input type="number" min="0" value={mulheres} onChange={(e) => setMulheres(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Crianças</label>
          <input type="number" min="0" value={criancas} onChange={(e) => setCriancas(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
        </div>
      </div>
      
      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800 printable-area">
        <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-4 text-center">O que você precisa comprar:</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 border-b pb-1">🥩 Carnes ({totalCarne.toFixed(1)}kg)</h5>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>• Bovina: {bovina.toFixed(1)} kg</li>
              <li>• Linguiça: {linguiça.toFixed(1)} kg</li>
              <li>• Frango: {frango.toFixed(1)} kg</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 border-b pb-1">🍻 Bebidas</h5>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>• Cerveja: {cerveja} latas (aprox. {(cerveja*0.35).toFixed(1)} L)</li>
              <li>• Refri/Água: {refrigerante.toFixed(1)} Litros</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 border-b pb-1">🥖 Acompanhamentos</h5>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>• Pão de Alho: {paoAlho} unidades</li>
              <li>• Farofa: {farofa.toFixed(1)} kg</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 border-b pb-1">🔥 Essenciais</h5>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>• Carvão: {carvao.toFixed(1)} kg</li>
              <li>• Gelo: 1 a 2 sacos (5kg)</li>
            </ul>
          </div>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Churrasco" 
        summaryText={summary}
      />
    </div>
  );
}

function CalculadoraEnergia() {
  const [potencia, setPotencia] = useState<number>(1000); // W
  const [horas, setHoras] = useState<number>(8);
  const [dias, setDias] = useState<number>(20);
  const [tarifa, setTarifa] = useState<number>(0.85); // R$/kWh
  
  const consumoKwh = (potencia * horas * dias) / 1000;
  const custo = consumoKwh * tarifa;
  
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Potência (Watts)</label>
          <input type="number" min="0" value={potencia} onChange={(e) => setPotencia(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" placeholder="Ex: 1000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tarifa (R$/kWh)</label>
          <input type="number" step="0.01" min="0" value={tarifa} onChange={(e) => setTarifa(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" placeholder="Ex: 0.85" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Horas por dia</label>
          <input type="number" min="0" max="24" value={horas} onChange={(e) => setHoras(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Dias por mês</label>
          <input type="number" min="0" max="31" value={dias} onChange={(e) => setDias(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500" />
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800 text-center">
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Custo Estimado Mensal</div>
        <div className="text-4xl font-black text-yellow-600 dark:text-yellow-400 mb-2">
          R$ {custo.toFixed(2).replace('.', ',')}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Consumo de <span className="font-bold">{consumoKwh.toFixed(1)} kWh/mês</span>
        </div>
      </div>
    </div>
  );
}

function CalculadoraHorasTrabalhadas() {
  const [entrada1, setEntrada1] = useState<string>('08:00');
  const [saida1, setSaida1] = useState<string>('12:00');
  const [entrada2, setEntrada2] = useState<string>('13:00');
  const [saida2, setSaida2] = useState<string>('17:00');
  
  const parseTime = (time: string) => {
    if (!time) return 0;
    const [h, m] = time.split(':').map(Number);
    return (h * 60) + m;
  };
  
  const e1 = parseTime(entrada1);
  const s1 = parseTime(saida1);
  const e2 = parseTime(entrada2);
  const s2 = parseTime(saida2);
  
  let totalMinutos = 0;
  if (s1 > e1) totalMinutos += (s1 - e1);
  if (s2 > e2) totalMinutos += (s2 - e2);
  
  const totalHoras = Math.floor(totalMinutos / 60);
  const restos = totalMinutos % 60;
  
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">1º Turno (Manhã)</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Entrada</label>
              <input type="time" value={entrada1} onChange={(e) => setEntrada1(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Saída (Almoço)</label>
              <input type="time" value={saida1} onChange={(e) => setSaida1(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3">2º Turno (Tarde)</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Retorno (Almoço)</label>
              <input type="time" value={entrada2} onChange={(e) => setEntrada2(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Fim Expediente</label>
              <input type="time" value={saida2} onChange={(e) => setSaida2(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Total de Horas Trabalhadas</div>
          <div className="text-3xl font-black text-indigo-700 dark:text-indigo-400">
            {totalHoras}h {restos}m
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400">Tempo Decimal</div>
          <div className="font-mono text-lg text-slate-700 dark:text-slate-300">
            {(totalMinutos / 60).toFixed(2)} hrs
          </div>
        </div>
      </div>
    </div>
  );
}

function CalculadoraFlex() {
  const [precoEtanol, setPrecoEtanol] = useState<number>(() => getParamNumber('etanol', 3.89));
  const [precoGasolina, setPrecoGasolina] = useState<number>(() => getParamNumber('gasolina', 5.79));
  const [tanqueLitros, setTanqueLitros] = useState<number>(() => getParamNumber('tanque', 50));
  const [modoConsumoReal, setModoConsumoReal] = useState<boolean>(false);
  const [kmLEtanol, setKmLEtanol] = useState<number>(8.5);
  const [kmLGasolina, setKmLGasolina] = useState<number>(12.0);

  useEffect(() => {
    syncUrlParams({ etanol: precoEtanol, gasolina: precoGasolina, tanque: tanqueLitros });
  }, [precoEtanol, precoGasolina, tanqueLitros]);

  const relacao = precoGasolina > 0 ? (precoEtanol / precoGasolina) * 100 : 0;
  const paridadeLimite = modoConsumoReal && kmLGasolina > 0 ? (kmLEtanol / kmLGasolina) * 100 : 70;
  const etanolVantajoso = relacao <= paridadeLimite;

  const custoTanqueEtanol = precoEtanol * tanqueLitros;
  const custoTanqueGasolina = precoGasolina * tanqueLitros;

  const custoKmEtanol = kmLEtanol > 0 ? precoEtanol / kmLEtanol : 0;
  const custoKmGasolina = kmLGasolina > 0 ? precoGasolina / kmLGasolina : 0;

  const economiaPorTanque = Math.abs(custoTanqueGasolina - custoTanqueEtanol);
  const economia1000Km = Math.abs(custoKmGasolina - custoKmEtanol) * 1000;

  const summary = `⛽ *Álcool ou Gasolina?*\n• Gasolina: R$ ${precoGasolina.toFixed(2)}/L\n• Etanol: R$ ${precoEtanol.toFixed(2)}/L\n• Relação: ${relacao.toFixed(1)}%\n\n👉 *Veredito*: ${etanolVantajoso ? '🟢 COMPENSA ABASTECER COM ETANOL (ÁLCOOL)' : '🔵 COMPENSA ABASTECER COM GASOLINA'}\n💰 Economia por tanque (${tanqueLitros}L): R$ ${economiaPorTanque.toFixed(2)}`;

  return (
    <div className="space-y-6" id="calc-flex">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Álcool ou Gasolina (Simulador Flex)</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Compare os preços nos postos de combustíveis e descubra qual opção gera maior economia no seu bolso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Preço do Etanol / Álcool (R$ / Litro)</label>
          <input 
            type="number" 
            step="0.01" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={precoEtanol} 
            onChange={(e) => setPrecoEtanol(Number(e.target.value))} 
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Preço da Gasolina Comum (R$ / Litro)</label>
          <input 
            type="number" 
            step="0.01" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={precoGasolina} 
            onChange={(e) => setPrecoGasolina(Number(e.target.value))} 
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Capacidade do Tanque (Litros)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={tanqueLitros} 
            onChange={(e) => setTanqueLitros(Number(e.target.value))} 
          />
        </div>
      </div>

      {/* Opção Avançada de Consumo Real */}
      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={modoConsumoReal} 
            onChange={(e) => setModoConsumoReal(e.target.checked)} 
            className="rounded text-emerald-600 focus:ring-emerald-500" 
          />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Personalizar com as médias de consumo reais do meu carro (km/l)
          </span>
        </label>

        {modoConsumoReal && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">Consumo com Etanol (km/l)</label>
              <input 
                type="number" 
                step="0.1" 
                className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
                value={kmLEtanol} 
                onChange={(e) => setKmLEtanol(Number(e.target.value))} 
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">Consumo com Gasolina (km/l)</label>
              <input 
                type="number" 
                step="0.1" 
                className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
                value={kmLGasolina} 
                onChange={(e) => setKmLGasolina(Number(e.target.value))} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Veredito Principal */}
      <div className={`p-6 rounded-2xl border ${etanolVantajoso ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700' : 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Recomendação Inteligente</span>
            <h3 className={`text-2xl md:text-3xl font-black mt-1 ${etanolVantajoso ? 'text-emerald-700 dark:text-emerald-300' : 'text-blue-700 dark:text-blue-300'}`}>
              {etanolVantajoso ? '🟢 ABASTEÇA COM ETANOL (ÁLCOOL)' : '🔵 ABASTEÇA COM GASOLINA'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              O etanol está custando <strong>{relacao.toFixed(1)}%</strong> do valor da gasolina (ponto de equilíbrio calculado: <strong>{paridadeLimite.toFixed(1)}%</strong>).
            </p>
          </div>
          <div className="text-center md:text-right bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-[180px]">
            <span className="text-[11px] text-slate-500 font-bold block">Relação Preço Etanol / Gasolina</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{relacao.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Tabela de Comparação Financeira */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 font-semibold block">Tanque Cheio Etanol</span>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">R$ {custoTanqueEtanol.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 font-semibold block">Tanque Cheio Gasolina</span>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">R$ {custoTanqueGasolina.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 font-semibold block">Economia por Tanque</span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">R$ {economiaPorTanque.toFixed(2)}</span>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 font-semibold block">Economia a cada 1.000 km</span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">R$ {economia1000Km.toFixed(2)}</span>
        </div>
      </div>

      <ShareBar 
        title="Calculadora Álcool ou Gasolina" 
        summaryText={summary}
      />
    </div>
  );
}

// 44. CALCULADORA DE DSR (DESCANSO SEMANAL REMUNERADO)
function CalculadoraDsr() {
  const [salarioBase, setSalarioBase] = useState<number>(3000);
  const [qtdHorasExtras, setQtdHorasExtras] = useState<number>(20);
  const [percentualExtra, setPercentualExtra] = useState<number>(50);
  const [diasUteis, setDiasUteis] = useState<number>(25);
  const [domingosFeriados, setDomingosFeriados] = useState<number>(5);

  const valorHoraNormal = salarioBase > 0 ? salarioBase / 220 : 0;
  const valorHoraExtraUnit = valorHoraNormal * (1 + percentualExtra / 100);
  const totalHorasExtras = valorHoraExtraUnit * qtdHorasExtras;

  const dsr = diasUteis > 0 ? (totalHorasExtras / diasUteis) * domingosFeriados : 0;
  const totalGeralAReceber = totalHorasExtras + dsr;

  return (
    <div className="space-y-6" id="calc-dsr">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de DSR sobre Horas Extras</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule o reflexo obrigatório do Descanso Semanal Remunerado (Lei 605/49 e Súmula 172 do TST).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Salário Base Mensal (R$)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={salarioBase} 
            onChange={(e) => setSalarioBase(Number(e.target.value))} 
          />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Quantidade de Horas Extras no Mês</label>
          <input 
            type="number" 
            step="0.5" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={qtdHorasExtras} 
            onChange={(e) => setQtdHorasExtras(Number(e.target.value))} 
          />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Adicional da Hora Extra (%)</label>
          <select 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            value={percentualExtra}
            onChange={(e) => setPercentualExtra(Number(e.target.value))}
          >
            <option value={50}>50% (Dia útil comum / Sábado)</option>
            <option value={100}>100% (Domingos e Feriados)</option>
            <option value={60}>60% (Acordo Coletivo)</option>
            <option value={70}>70% (Acordo Coletivo)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Dias Úteis no Mês (Segunda a Sábado)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={diasUteis} 
            onChange={(e) => setDiasUteis(Number(e.target.value))} 
          />
          <span className="text-[11px] text-slate-500">Pela regra geral do TST, sábados contam como dias úteis.</span>
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Domingos e Feriados no Mês</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={domingosFeriados} 
            onChange={(e) => setDomingosFeriados(Number(e.target.value))} 
          />
          <span className="text-[11px] text-slate-500">Soma de todos os domingos e feriados do período.</span>
        </div>
      </div>

      {/* Resultados DSR */}
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase block">Valor das Horas Extras</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">R$ {totalHorasExtras.toFixed(2)}</span>
            <span className="text-[11px] text-slate-500 block">({qtdHorasExtras}h x R$ {valorHoraExtraUnit.toFixed(2)}/h)</span>
          </div>
          <div>
            <span className="text-xs text-emerald-800 dark:text-emerald-400 font-black uppercase block">Reflexo do DSR (Repouso)</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-300">+ R$ {dsr.toFixed(2)}</span>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block">(+{((dsr / (totalHorasExtras || 1)) * 100).toFixed(1)}% sobre as horas extras)</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <span className="text-xs text-slate-500 font-bold uppercase block">Total a Receber</span>
            <span className="text-2xl font-black text-emerald-600">R$ {totalGeralAReceber.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <p><strong>Memória de Cálculo Oficial:</strong> DSR = (R$ {totalHorasExtras.toFixed(2)} ÷ {diasUteis} dias úteis) × {domingosFeriados} domingos/feriados = <strong>R$ {dsr.toFixed(2)}</strong>.</p>
        </div>
      </div>
    </div>
  );
}

// 45. CALCULADORA DE ADICIONAL NOTURNO CLT
function CalculadoraAdicionalNoturno() {
  const [salarioBase, setSalarioBase] = useState<number>(3000);
  const [jornadaMensal, setJornadaMensal] = useState<number>(220);
  const [horasNoturnasRelogio, setHorasNoturnasRelogio] = useState<number>(40);
  const [tipoAtividade, setTipoAtividade] = useState<'urbano' | 'rural'>('urbano');

  const fatorHoraFicta = tipoAtividade === 'urbano' ? 60 / 52.5 : 1.0;
  const percentualAdicional = tipoAtividade === 'urbano' ? 0.20 : 0.25;

  const valorHoraNormal = jornadaMensal > 0 ? salarioBase / jornadaMensal : 0;
  const horasNoturnasComputadas = horasNoturnasRelogio * fatorHoraFicta;
  const valorAdicionalNoturno = valorHoraNormal * percentualAdicional * horasNoturnasComputadas;
  const valorHoraNoturnaComposta = valorHoraNormal * (1 + percentualAdicional) * fatorHoraFicta;
  const totalSalarioComAdicional = salarioBase + valorAdicionalNoturno;

  return (
    <div className="space-y-6" id="calc-adicional-noturno">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Adicional Noturno CLT</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule o adicional noturno urbano (20% + hora ficta 52min30s) e rural (25%) segundo o Artigo 73 da CLT.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Salário Base Mensal (R$)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={salarioBase} 
            onChange={(e) => setSalarioBase(Number(e.target.value))} 
          />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Carga Horária Mensal</label>
          <select 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            value={jornadaMensal}
            onChange={(e) => setJornadaMensal(Number(e.target.value))}
          >
            <option value={220}>220 horas (44h semanais)</option>
            <option value={200}>200 horas (40h semanais)</option>
            <option value={180}>180 horas (36h semanais / 12x36)</option>
            <option value={150}>150 horas (30h semanais)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Tipo de Trabalho</label>
          <select 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            value={tipoAtividade}
            onChange={(e) => setTipoAtividade(e.target.value as any)}
          >
            <option value="urbano">Urbano (22h às 05h - 20% + Hora Ficta)</option>
            <option value="rural">Rural (Lavoura 21h-05h / Pecuária 20h-04h - 25%)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Horas Noturnas Trabalhadas no Mês (Horas de Relógio)</label>
        <input 
          type="number" 
          step="0.5" 
          className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
          value={horasNoturnasRelogio} 
          onChange={(e) => setHorasNoturnasRelogio(Number(e.target.value))} 
        />
        <span className="text-[11px] text-slate-500">
          {tipoAtividade === 'urbano' ? 'Cada 7 horas de relógio trabalhadas à noite equivalem a 8 horas computadas (fator de 1,142857).' : 'No trabalho rural a hora tem 60 minutos normais com percentual de 25%.'}
        </span>
      </div>

      {/* Resultados */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-b md:border-b-0 md:border-r border-slate-700 pb-3 md:pb-0 pr-2">
            <span className="text-xs text-slate-400 font-bold block">Valor da Hora Normal</span>
            <span className="text-xl font-bold text-slate-100">R$ {valorHoraNormal.toFixed(2)}</span>
          </div>
          <div className="border-b md:border-b-0 md:border-r border-slate-700 pb-3 md:pb-0 pr-2">
            <span className="text-xs text-slate-400 font-bold block">Horas Computadas</span>
            <span className="text-xl font-bold text-amber-400">{horasNoturnasComputadas.toFixed(2)} h</span>
          </div>
          <div className="border-b md:border-b-0 md:border-r border-slate-700 pb-3 md:pb-0 pr-2">
            <span className="text-xs text-emerald-400 font-bold block">Adicional Noturno Total</span>
            <span className="text-2xl font-black text-emerald-400">+ R$ {valorAdicionalNoturno.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Salário Bruto Total</span>
            <span className="text-2xl font-black text-white">R$ {totalSalarioComAdicional.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 46. CALCULADORA DE SALÁRIO PROPORCIONAL
function CalculadoraSalarioProporcional() {
  const [salarioBruto, setSalarioBruto] = useState<number>(3500);
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [ano, setAno] = useState<number>(2026);
  const [diasTrabalhados, setDiasTrabalhados] = useState<number>(18);
  const [modoDivisor, setModoDivisor] = useState<'comercial_30' | 'dias_mes'>('comercial_30');

  const diasNoMes = new Date(ano, mes, 0).getDate();
  const divisor = modoDivisor === 'comercial_30' ? 30 : diasNoMes;

  const salarioProporcionalBruto = divisor > 0 ? (salarioBruto / divisor) * diasTrabalhados : 0;

  // Desconto INSS Proporcional Simplificado
  let inssProporcional = 0;
  if (salarioProporcionalBruto <= 1518.00) {
    inssProporcional = salarioProporcionalBruto * 0.075;
  } else if (salarioProporcionalBruto <= 2793.88) {
    inssProporcional = (1518.00 * 0.075) + ((salarioProporcionalBruto - 1518.00) * 0.09);
  } else if (salarioProporcionalBruto <= 4190.83) {
    inssProporcional = (1518.00 * 0.075) + ((2793.88 - 1518.00) * 0.09) + ((salarioProporcionalBruto - 2793.88) * 0.12);
  } else {
    inssProporcional = (1518.00 * 0.075) + ((2793.88 - 1518.00) * 0.09) + ((4190.83 - 2793.88) * 0.12) + ((Math.min(salarioProporcionalBruto, 8157.41) - 4190.83) * 0.14);
  }

  const salarioProporcionalLiquido = Math.max(0, salarioProporcionalBruto - inssProporcional);

  return (
    <div className="space-y-6" id="calc-salario-proporcional">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Salário Proporcional</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule o valor exato a receber por dias trabalhados na admissão, demissão ou afastamento.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Salário Bruto Contratual (R$)</label>
          <input 
            type="number" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={salarioBruto} 
            onChange={(e) => setSalarioBruto(Number(e.target.value))} 
          />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Mês de Referência</label>
          <select 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
          >
            <option value={1}>Janeiro (31 dias)</option>
            <option value={2}>Fevereiro (28/29 dias)</option>
            <option value={3}>Março (31 dias)</option>
            <option value={4}>Abril (30 dias)</option>
            <option value={5}>Maio (31 dias)</option>
            <option value={6}>Junho (30 dias)</option>
            <option value={7}>Julho (31 dias)</option>
            <option value={8}>Agosto (31 dias)</option>
            <option value={9}>Setembro (30 dias)</option>
            <option value={10}>Outubro (31 dias)</option>
            <option value={11}>Novembro (30 dias)</option>
            <option value={12}>Dezembro (31 dias)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Dias Efetivamente Trabalhados</label>
          <input 
            type="number" 
            max={diasNoMes}
            min={1}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={diasTrabalhados} 
            onChange={(e) => setDiasTrabalhados(Number(e.target.value))} 
          />
        </div>
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
          <input 
            type="radio" 
            name="divisor" 
            checked={modoDivisor === 'comercial_30'} 
            onChange={() => setModoDivisor('comercial_30')} 
          />
          Mês Comercial Padrão (Divisor 30 dias)
        </label>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
          <input 
            type="radio" 
            name="divisor" 
            checked={modoDivisor === 'dias_mes'} 
            onChange={() => setModoDivisor('dias_mes')} 
          />
          Dias Reais do Mês ({diasNoMes} dias)
        </label>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase block">Salário Proporcional Bruto</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">R$ {salarioProporcionalBruto.toFixed(2)}</span>
            <span className="text-[11px] text-slate-500 block">R$ {(salarioBruto / divisor).toFixed(2)} / dia</span>
          </div>
          <div>
            <span className="text-xs text-rose-700 font-bold uppercase block">Desconto INSS Estimado</span>
            <span className="text-2xl font-black text-rose-600">- R$ {inssProporcional.toFixed(2)}</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <span className="text-xs text-slate-500 font-bold uppercase block">Salário Proporcional Líquido</span>
            <span className="text-2xl font-black text-emerald-600">R$ {salarioProporcionalLiquido.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 47. CALCULADORA DE OVULAÇÃO E PERÍODO FÉRTIL
function CalculadoraOvulacao() {
  const [dum, setDum] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d.toISOString().split('T')[0];
  });
  const [duracaoCiclo, setDuracaoCiclo] = useState<number>(28);

  const baseDate = new Date(dum + 'T00:00:00');
  
  // Data da ovulação = DUM + (Ciclo - 14 dias)
  const diasAteOvulacao = duracaoCiclo - 14;
  const dataOvulacao = new Date(baseDate);
  dataOvulacao.setDate(dataOvulacao.getDate() + diasAteOvulacao);

  // Janela fértil: 5 dias antes até 1 dia depois
  const inicioJanelaFertil = new Date(dataOvulacao);
  inicioJanelaFertil.setDate(inicioJanelaFertil.getDate() - 5);

  const fimJanelaFertil = new Date(dataOvulacao);
  fimJanelaFertil.setDate(fimJanelaFertil.getDate() + 1);

  // Próxima menstruação
  const proximaMenstruacao = new Date(baseDate);
  proximaMenstruacao.setDate(proximaMenstruacao.getDate() + duracaoCiclo);

  // Data provável do parto (Regra de Naegele: DUM + 280 dias)
  const dpp = new Date(baseDate);
  dpp.setDate(dpp.getDate() + 280);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6" id="calc-ovulacao">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Ovulação e Período Fértil</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Descubra os dias mais férteis para engravidar e o dia provável da ovulação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">1º Dia da Última Menstruação (DUM)</label>
          <input 
            type="date" 
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm" 
            value={dum} 
            onChange={(e) => setDum(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Duração Média do Ciclo (dias)</label>
          <input 
            type="number" 
            min={21}
            max={40}
            className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" 
            value={duracaoCiclo} 
            onChange={(e) => setDuracaoCiclo(Number(e.target.value))} 
          />
          <span className="text-[11px] text-slate-500">Normalmente entre 26 e 32 dias (média de 28 dias).</span>
        </div>
      </div>

      {/* Resultados em Cards Destacados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-2xl p-5 space-y-2">
          <span className="text-xs font-black uppercase text-rose-700 dark:text-rose-400">✨ Dia Provável da Ovulação</span>
          <h3 className="text-2xl font-black text-rose-800 dark:text-rose-200">{formatDate(dataOvulacao)}</h3>
          <p className="text-xs text-rose-700 dark:text-rose-300">Momento de pico de fertilidade (liberação do óvulo maduro).</p>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 space-y-2">
          <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-400">🌿 Janela Fértil de Alta Fecundidade</span>
          <h3 className="text-xl font-black text-emerald-800 dark:text-emerald-200">
            {formatDate(inicioJanelaFertil).split(' de ')[0]} a {formatDate(fimJanelaFertil)}
          </h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300">Período com máxima chance de concepção.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-slate-500 font-bold block">Próxima Menstruação Prevista</span>
          <strong className="text-slate-900 dark:text-slate-100 text-sm">{formatDate(proximaMenstruacao)}</strong>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <span className="text-slate-500 font-bold block">Data Provável do Parto (se engravidar agora)</span>
          <strong className="text-slate-900 dark:text-slate-100 text-sm">{formatDate(dpp)}</strong>
        </div>
      </div>
    </div>
  );
}

// 48. CALCULADORA DE TINTA E PINTURA
function CalculadoraTinta() {
  const [largura, setLargura] = useState<number>(() => getParamNumber('l', 4.0));
  const [comprimento, setComprimento] = useState<number>(() => getParamNumber('c', 5.0));
  const [altura, setAltura] = useState<number>(() => getParamNumber('h', 2.7));
  const [incluirTeto, setIncluirTeto] = useState<boolean>(() => getParamBoolean('teto', true));
  const [qtdPortas, setQtdPortas] = useState<number>(() => getParamNumber('portas', 1));
  const [qtdJanelas, setQtdJanelas] = useState<number>(() => getParamNumber('janelas', 1));
  const [demaos, setDemaos] = useState<number>(() => getParamNumber('d', 2));
  const [rendimentoLata, setRendimentoLata] = useState<number>(10);

  useEffect(() => {
    syncUrlParams({
      l: largura,
      c: comprimento,
      h: altura,
      teto: incluirTeto,
      portas: qtdPortas,
      janelas: qtdJanelas,
      d: demaos
    });
  }, [largura, comprimento, altura, incluirTeto, qtdPortas, qtdJanelas, demaos]);

  const areaParedes = 2 * (largura + comprimento) * altura;
  const areaTeto = incluirTeto ? largura * comprimento : 0;
  const areaTotalBruta = areaParedes + areaTeto;
  const areaDescontos = (qtdPortas * 1.68) + (qtdJanelas * 2.0);
  const areaLiquida = Math.max(0, areaTotalBruta - areaDescontos);

  const areaPinturaTotal = areaLiquida * demaos;
  const litrosNecessarios = rendimentoLata > 0 ? areaPinturaTotal / rendimentoLata : 0;

  // Sugestão de latas
  const latas18L = Math.floor(litrosNecessarios / 18);
  const restoApos18 = litrosNecessarios % 18;
  const galoes3_6L = Math.floor(restoApos18 / 3.6);
  const restoAposGal = restoApos18 % 3.6;
  const quartos900ml = Math.ceil(restoAposGal / 0.9);

  const summary = `🎨 *Cálculo de Tinta para Pintura*:\n📐 *Área Líquida*: ${areaLiquida.toFixed(1)} m² (${demaos} demãos = ${areaPinturaTotal.toFixed(1)} m²)\n🛢️ *Tinta Necessária*: *${litrosNecessarios.toFixed(1)} Litros*\n🛒 *Sugestão de compra*: ${latas18L > 0 ? `${latas18L}x Lata 18L ` : ''}${galoes3_6L > 0 ? `${galoes3_6L}x Galão 3.6L ` : ''}${quartos900ml > 0 ? `${quartos900ml}x Quarto 900ml` : ''}`;

  return (
    <div className="space-y-6" id="calc-tinta">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Tinta para Paredes e Teto</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule a metragem em m² e a quantidade exata de litros, galões e latas de tinta para sua obra.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Largura do Cômodo (m)</label>
          <input type="number" step="0.1" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={largura} onChange={(e) => setLargura(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Comprimento (m)</label>
          <input type="number" step="0.1" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={comprimento} onChange={(e) => setComprimento(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Pé-Direito / Altura (m)</label>
          <input type="number" step="0.1" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={altura} onChange={(e) => setAltura(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Portas (desconto ~1.7m²)</label>
          <input type="number" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-sm font-mono" value={qtdPortas} onChange={(e) => setQtdPortas(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Janelas (desconto ~2.0m²)</label>
          <input type="number" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-sm font-mono" value={qtdJanelas} onChange={(e) => setQtdJanelas(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Número de Demãos</label>
          <select className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-slate-800 text-sm" value={demaos} onChange={(e) => setDemaos(Number(e.target.value))}>
            <option value={1}>1 Demão</option>
            <option value={2}>2 Demãos (Padrão)</option>
            <option value={3}>3 Demãos (Mudança de Cor)</option>
          </select>
        </div>
        <div className="flex items-center pt-5">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" checked={incluirTeto} onChange={(e) => setIncluirTeto(e.target.checked)} className="rounded" />
            Pintar Teto Também
          </label>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-2xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase block">Área Líquida a Pintar</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{areaLiquida.toFixed(1)} m²</span>
            <span className="text-[11px] text-slate-500 block">({areaPinturaTotal.toFixed(1)} m² com {demaos} demãos)</span>
          </div>
          <div>
            <span className="text-xs text-emerald-800 dark:text-emerald-400 font-black uppercase block">Tinta Necessária</span>
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{litrosNecessarios.toFixed(1)} L</span>
            <span className="text-[11px] text-slate-500 block">Rendimento: 10 m²/Litro</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 text-left">
            <span className="text-xs text-slate-500 font-bold uppercase block mb-1">Sugestão de Compra:</span>
            <ul className="text-xs font-semibold space-y-1 text-slate-800 dark:text-slate-200">
              {latas18L > 0 && <li>🛢️ {latas18L}x Lata de 18 Litros</li>}
              {galoes3_6L > 0 && <li>🪣 {galoes3_6L}x Galão de 3,6 Litros</li>}
              {quartos900ml > 0 && <li>🧪 {quartos900ml}x Quarto de 900ml</li>}
              {latas18L === 0 && galoes3_6L === 0 && quartos900ml === 0 && <li>1x Quarto de 900ml</li>}
            </ul>
          </div>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Tinta para Pintura" 
        summaryText={summary}
      />
    </div>
  );
}

// 49. CALCULADORA DE PISO E REVESTIMENTO
function CalculadoraPiso() {
  const [largura, setLargura] = useState<number>(() => getParamNumber('l', 5.0));
  const [comprimento, setComprimento] = useState<number>(() => getParamNumber('c', 6.0));
  const [margemPerda, setMargemPerda] = useState<number>(() => getParamNumber('perda', 10));
  const [m2PorCaixa, setM2PorCaixa] = useState<number>(() => getParamNumber('caixa', 2.16));
  const [precoM2, setPrecoM2] = useState<number>(() => getParamNumber('preco', 65.0));

  useEffect(() => {
    syncUrlParams({
      l: largura,
      c: comprimento,
      perda: margemPerda,
      caixa: m2PorCaixa,
      preco: precoM2
    });
  }, [largura, comprimento, margemPerda, m2PorCaixa, precoM2]);

  const areaUtil = largura * comprimento;
  const areaComPerda = areaUtil * (1 + margemPerda / 100);
  const caixasNecessarias = m2PorCaixa > 0 ? Math.ceil(areaComPerda / m2PorCaixa) : 0;
  const areaTotalFaturada = caixasNecessarias * m2PorCaixa;
  const custoTotalEstimado = areaTotalFaturada * precoM2;

  const summary = `🧱 *Cálculo de Piso e Revestimento*:\n📐 *Área Real*: ${areaUtil.toFixed(2)} m² (+${margemPerda}% perda = ${areaComPerda.toFixed(2)} m²)\n📦 *Caixas a Comprar*: *${caixasNecessarias} caixas* (${areaTotalFaturada.toFixed(2)} m² total)\n💰 *Custo Estimado*: R$ ${custoTotalEstimado.toFixed(2)}`;

  return (
    <div className="space-y-6" id="calc-piso">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Piso, Revestimento e Porcelanato</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule a metragem quadrada, margem de quebra/recortes e a quantidade exata de caixas a comprar.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Largura do Ambiente (m)</label>
          <input type="number" step="0.1" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={largura} onChange={(e) => setLargura(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Comprimento (m)</label>
          <input type="number" step="0.1" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={comprimento} onChange={(e) => setComprimento(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Margem de Perda / Recortes</label>
          <select className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm" value={margemPerda} onChange={(e) => setMargemPerda(Number(e.target.value))}>
            <option value={10}>10% (Assentamento Reto Padrão)</option>
            <option value={15}>15% (Diagonal ou Grandes Porcelanatos)</option>
            <option value={20}>20% (Paginação Especial / Espinha de Peixe)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Metragem por Caixa informada na embalagem (m²)</label>
          <input type="number" step="0.01" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={m2PorCaixa} onChange={(e) => setM2PorCaixa(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Preço do m² (R$ - opcional)</label>
          <input type="number" step="0.1" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={precoM2} onChange={(e) => setPrecoM2(Number(e.target.value))} />
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-slate-400 font-bold block">Área Real</span>
            <span className="text-xl font-bold text-white">{areaUtil.toFixed(2)} m²</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Área com Tolerância</span>
            <span className="text-xl font-bold text-amber-400">{areaComPerda.toFixed(2)} m²</span>
          </div>
          <div>
            <span className="text-xs text-emerald-400 font-bold block">Caixas a Comprar</span>
            <span className="text-3xl font-black text-emerald-400">{caixasNecessarias} caixas</span>
            <span className="text-[11px] text-slate-400 block">({areaTotalFaturada.toFixed(2)} m² total)</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold block">Custo Estimado</span>
            <span className="text-2xl font-black text-white">R$ {custoTotalEstimado.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Piso e Revestimento" 
        summaryText={summary}
      />
    </div>
  );
}

// 50. CALCULADORA DE ÁGUA DIÁRIA
type NivelAtividadeAgua = 'sedentario' | 'moderado' | 'intenso';
type ClimaAgua = 'ameno' | 'quente';

function CalculadoraAguaDiaria() {
  const [peso, setPeso] = useState<number>(() => getParamNumber('peso', 70));
  const [nivelAtividade, setNivelAtividade] = useState<NivelAtividadeAgua>(() => (getParamString('ativ', 'moderado') as NivelAtividadeAgua));
  const [clima, setClima] = useState<ClimaAgua>(() => (getParamString('clima', 'quente') as ClimaAgua));

  useEffect(() => {
    syncUrlParams({
      peso,
      ativ: nivelAtividade,
      clima
    });
  }, [peso, nivelAtividade, clima]);

  let fatorMlPorKg = 35;
  if (nivelAtividade === 'moderado') fatorMlPorKg = 40;
  if (nivelAtividade === 'intenso') fatorMlPorKg = 45;

  const extraClima = clima === 'quente' ? 500 : 0;
  const metaMl = (peso * fatorMlPorKg) + extraClima;
  const metaLitros = metaMl / 1000;
  const copos200ml = Math.round(metaMl / 200);
  const copos250ml = Math.round(metaMl / 250);
  const garrafas500ml = (metaMl / 500).toFixed(1);

  const summary = `💧 *Meta Diária de Hidratação*: *${metaLitros.toFixed(2)} Litros/dia* (${metaMl} ml)\n• Peso: ${peso} kg (${nivelAtividade}, clima ${clima})\n• Equivalente: ~${copos200ml} copos de 200ml ou ${garrafas500ml} garrafas de 500ml`;

  return (
    <div className="space-y-6" id="calc-agua">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Consumo de Água Diária por Peso</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Descubra a meta ideal de hidratação diária de acordo com as diretrizes da Organização Mundial da Saúde (OMS).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Seu Peso Corporal (kg)</label>
          <input type="number" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={peso} onChange={(e) => setPeso(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Nível de Exercício Físico</label>
          <select className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm" value={nivelAtividade} onChange={(e) => setNivelAtividade(e.target.value as NivelAtividadeAgua)}>
            <option value="sedentario">Sedentário (35 ml/kg)</option>
            <option value="moderado">Moderado - caminhada/musculação (40 ml/kg)</option>
            <option value="intenso">Intenso / Atleta / Crossfit (45 ml/kg)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Clima da sua Região</label>
          <select className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm" value={clima} onChange={(e) => setClima(e.target.value as ClimaAgua)}>
            <option value="ameno">Clima Ameno / Frio</option>
            <option value="quente">Clima Quente / Seco (+500ml)</option>
          </select>
        </div>
      </div>

      <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-300 dark:border-sky-800 rounded-2xl p-6 text-center space-y-4">
        <div>
          <span className="text-xs font-black uppercase text-sky-800 dark:text-sky-400">💧 Sua Meta Diária de Hidratação</span>
          <h3 className="text-4xl font-black text-sky-600 dark:text-sky-300 mt-1">{metaLitros.toFixed(2)} Litros / dia</h3>
          <span className="text-xs text-sky-700 dark:text-sky-400">({metaMl} mililitros)</span>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-sky-200 dark:border-sky-800">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-sky-200 dark:border-sky-800">
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">🥛 {copos200ml}</span>
            <span className="text-[11px] text-slate-500 block">copos de 200ml</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-sky-200 dark:border-sky-800">
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">🥤 {copos250ml}</span>
            <span className="text-[11px] text-slate-500 block">copos de 250ml</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-sky-200 dark:border-sky-800">
            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">🍶 {garrafas500ml}</span>
            <span className="text-[11px] text-slate-500 block">garrafas de 500ml</span>
          </div>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Consumo de Água Diária" 
        summaryText={summary}
      />
    </div>
  );
}

// 51. CALCULADORA DE PONTO E BANCO DE HORAS
function CalculadoraPontoBancoHoras() {
  const [entrada1, setEntrada1] = useState(() => getParamString('e1', '08:00'));
  const [saida1, setSaida1] = useState(() => getParamString('s1', '12:00'));
  const [entrada2, setEntrada2] = useState(() => getParamString('e2', '13:00'));
  const [saida2, setSaida2] = useState(() => getParamString('s2', '17:48'));
  const [jornadaMinutos, setJornadaMinutos] = useState(() => getParamNumber('jornada', 528));

  useEffect(() => {
    syncUrlParams({
      e1: entrada1,
      s1: saida1,
      e2: entrada2,
      s2: saida2,
      jornada: jornadaMinutos
    });
  }, [entrada1, saida1, entrada2, saida2, jornadaMinutos]);

  const toMinutes = (timeStr: string) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const manhaMin = Math.max(0, toMinutes(saida1) - toMinutes(entrada1));
  const tardeMin = Math.max(0, toMinutes(saida2) - toMinutes(entrada2));
  const totalTrabalhado = manhaMin + tardeMin;
  const intervaloMin = Math.max(0, toMinutes(entrada2) - toMinutes(saida1));
  const saldoMinutos = totalTrabalhado - jornadaMinutos;

  const formatHorasMin = (min: number) => {
    const absMin = Math.abs(min);
    const h = Math.floor(absMin / 60);
    const m = absMin % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  };

  const summary = `⏰ *Apuração de Ponto e Banco de Horas*:\n• Batidas: ${entrada1} ➔ ${saida1} | ${entrada2} ➔ ${saida2}\n• Total Trabalhado: ${formatHorasMin(totalTrabalhado)} (${(totalTrabalhado / 60).toFixed(2)}h)\n• Almoço: ${formatHorasMin(intervaloMin)}\n\n👉 *Saldo*: *${saldoMinutos >= 0 ? `+${formatHorasMin(saldoMinutos)} (Horas Extras)` : `-${formatHorasMin(saldoMinutos)} (A Compensar)`}*`;

  return (
    <div className="space-y-6" id="calc-ponto-banco">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Ponto e Banco de Horas Diário</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Lançamento de 4 batidas com apuração de saldo de horas extras ou horas devedoras.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">1ª Entrada (Manhã)</label>
          <input type="time" value={entrada1} onChange={(e) => setEntrada1(e.target.value)} className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">1ª Saída (Almoço)</label>
          <input type="time" value={saida1} onChange={(e) => setSaida1(e.target.value)} className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">2ª Entrada (Retorno)</label>
          <input type="time" value={entrada2} onChange={(e) => setEntrada2(e.target.value)} className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">2ª Saída (Fim)</label>
          <input type="time" value={saida2} onChange={(e) => setSaida2(e.target.value)} className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Jornada Diária Contratada</label>
        <select className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm" value={jornadaMinutos} onChange={(e) => setJornadaMinutos(Number(e.target.value))}>
          <option value={528}>8 horas e 48 minutos (Regime 44h - Seg a Sex)</option>
          <option value={480}>8 horas (Regime 40h semanais / 44h com sábado)</option>
          <option value={360}>6 horas diárias (Estágio / Operadores)</option>
          <option value={240}>4 horas diárias (Meio período)</option>
        </select>
      </div>

      <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase block">Total Trabalhado Efetivo</span>
            <span className="text-3xl font-black text-slate-900 dark:text-slate-100">{formatHorasMin(totalTrabalhado)}</span>
            <span className="text-[11px] text-slate-500 block">({(totalTrabalhado / 60).toFixed(2)} horas decimais)</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase block">Intervalo de Almoço</span>
            <span className="text-xl font-bold text-slate-700 dark:text-slate-300">{formatHorasMin(intervaloMin)}</span>
            <span className="text-[11px] text-slate-500 block">Exigência CLT: mín. 1h</span>
          </div>
          <div className={`p-4 rounded-xl border ${saldoMinutos >= 0 ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900' : 'bg-rose-100/70 border-rose-300 text-rose-900'}`}>
            <span className="text-xs font-black uppercase block">Saldo do Banco de Horas</span>
            <span className="text-2xl font-black">
              {saldoMinutos >= 0 ? `+ ${formatHorasMin(saldoMinutos)}` : `- ${formatHorasMin(saldoMinutos)}`}
            </span>
            <span className="text-[11px] font-bold block">
              {saldoMinutos >= 0 ? '🟢 Crédito de Horas Extras' : '🔴 Horas a Compensar'}
            </span>
          </div>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Ponto e Banco de Horas" 
        summaryText={summary}
      />
    </div>
  );
}

// 52. CALCULADORA À VISTA VS PARCELADO COM JUROS
function CalculadoraDescontoVistaParcelado() {
  const [precoParcelado, setPrecoParcelado] = useState(() => getParamNumber('total', 2000));
  const [descontoPercentual, setDescontoPercentual] = useState(() => getParamNumber('desc', 10));
  const [numParcelas, setNumParcelas] = useState(() => getParamNumber('n', 10));
  const [cdiAnual, setCdiAnual] = useState(() => getParamNumber('cdi', 12.0));

  useEffect(() => {
    syncUrlParams({
      total: precoParcelado,
      desc: descontoPercentual,
      n: numParcelas,
      cdi: cdiAnual
    });
  }, [precoParcelado, descontoPercentual, numParcelas, cdiAnual]);

  const valorAVista = precoParcelado * (1 - descontoPercentual / 100);
  const valorParcela = precoParcelado / (numParcelas || 1);

  // Taxa Implícita de Juros aproximada do desconto
  const taxaImplicitaMensal = numParcelas > 1 ? ((descontoPercentual / 100) / (numParcelas / 2)) * 100 : descontoPercentual;
  
  // Taxa CDI Mensal Líquida (considerando 15% de IR sobre o rendimento)
  const cdiMensalLiquido = (Math.pow(1 + (cdiAnual * 0.85 / 100), 1 / 12) - 1) * 100;

  // Simulação de deixar o dinheiro aplicado no CDI e pagar parcelas
  let saldoAplicado = valorAVista;
  for (let m = 1; m <= numParcelas; m++) {
    saldoAplicado = (saldoAplicado * (1 + cdiMensalLiquido / 100)) - valorParcela;
  }

  const valePenaAVista = saldoAplicado < 0;

  const summary = `💳 *À Vista com Desconto vs Parcelado*:\n• Preço: R$ ${precoParcelado.toFixed(2)} (${numParcelas}x de R$ ${valorParcela.toFixed(2)})\n• À vista (${descontoPercentual}% desc.): R$ ${valorAVista.toFixed(2)}\n• Rendimento CDI líquido: ${cdiMensalLiquido.toFixed(2)}% a.m.\n\n👉 *Veredito*: *${valePenaAVista ? '🟢 COMPENSA PAGAR À VISTA COM DESCONTO' : '🔵 COMPENSA PARCELAR E APLICAR O DINHEIRO'}*`;

  return (
    <div className="space-y-6" id="calc-desconto-parcelado">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora: Comprar à Vista com Desconto ou Parcelar?</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Descubra se o desconto no PIX/dinheiro supera o rendimento do dinheiro aplicado no CDI (CDB/Tesouro Selic).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Preço Total Parcelado (R$)</label>
          <input type="number" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={precoParcelado} onChange={(e) => setPrecoParcelado(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Desconto à Vista (%)</label>
          <input type="number" step="0.5" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={descontoPercentual} onChange={(e) => setDescontoPercentual(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Número de Parcelas "sem juros"</label>
          <input type="number" min={2} max={48} className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={numParcelas} onChange={(e) => setNumParcelas(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Rendimento do CDI (% a.a.)</label>
          <input type="number" step="0.25" className="w-full border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono" value={cdiAnual} onChange={(e) => setCdiAnual(Number(e.target.value))} />
        </div>
      </div>

      {/* Veredito Financeiro */}
      <div className={`p-6 rounded-2xl border ${valePenaAVista ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700' : 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">Veredito da Matemática Financeira</span>
            <h3 className={`text-2xl font-black mt-1 ${valePenaAVista ? 'text-emerald-700 dark:text-emerald-300' : 'text-indigo-700 dark:text-indigo-300'}`}>
              {valePenaAVista ? '🟢 COMPENSA PAGAR À VISTA COM DESCONTO' : '🔵 COMPENSA PARCELAR E APLICAR O DINHEIRO'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              O desconto à vista oferece uma taxa implícita de <strong>{taxaImplicitaMensal.toFixed(2)}% ao mês</strong>, enquanto sua aplicação rende cerca de <strong>{cdiMensalLiquido.toFixed(2)}% líquido a.m.</strong>
            </p>
          </div>
          <div className="text-center md:text-right bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-[180px]">
            <span className="text-[11px] text-slate-500 font-bold block">Valor à Vista com Desconto</span>
            <span className="text-2xl font-black text-emerald-600">R$ {valorAVista.toFixed(2)}</span>
            <span className="text-[11px] text-slate-400 block">({numParcelas}x de R$ {valorParcela.toFixed(2)})</span>
          </div>
        </div>
      </div>

      <ShareBar 
        title="Calculadora: À Vista vs Parcelado" 
        summaryText={summary}
      />
    </div>
  );
}

// 51. CALCULADORA DE FÉRIAS PROPORCIONAIS E VENCIDAS CLT
function CalculadoraFeriasProporcionais() {
  const [salarioBruto, setSalarioBruto] = useState(() => getParamNumber('bruto', 3500));
  const [mediaExtras, setMediaExtras] = useState(() => getParamNumber('extras', 0));
  const [mesesTrabalhados, setMesesTrabalhados] = useState(() => getParamNumber('meses', 8));
  const [diasFerias, setDiasFerias] = useState(() => getParamNumber('dias', 30));
  const [venderAbono, setVenderAbono] = useState(() => getParamBoolean('abono', false));

  useEffect(() => {
    syncUrlParams({
      bruto: salarioBruto,
      extras: mediaExtras,
      meses: mesesTrabalhados,
      dias: diasFerias,
      abono: venderAbono
    });
  }, [salarioBruto, mediaExtras, mesesTrabalhados, diasFerias, venderAbono]);

  const baseCalculo = (salarioBruto || 0) + (mediaExtras || 0);
  const avos = Math.min(12, Math.max(1, mesesTrabalhados || 1));
  const valorProporcionalBase = (baseCalculo / 12) * avos;
  
  // Dias a gozar vs abono
  const diasGozados = venderAbono ? 20 : diasFerias;
  const diasAbono = venderAbono ? 10 : 0;

  const valorDiasFerias = (valorProporcionalBase / 30) * diasGozados;
  const valorTercoConstitucional = valorDiasFerias / 3;
  const valorAbonoPecuniario = (valorProporcionalBase / 30) * diasAbono;
  const valorTercoAbono = valorAbonoPecuniario / 3;

  const totalBrutoTributavel = valorDiasFerias + valorTercoConstitucional;
  const totalBrutoIsento = valorAbonoPecuniario + valorTercoAbono;
  const totalBrutoGeral = totalBrutoTributavel + totalBrutoIsento;

  // INSS Simplificado progressivo estimado sobre a parte tributável
  let inss = 0;
  if (totalBrutoTributavel <= 1412) inss = totalBrutoTributavel * 0.075;
  else if (totalBrutoTributavel <= 2666.68) inss = (1412 * 0.075) + ((totalBrutoTributavel - 1412) * 0.09);
  else if (totalBrutoTributavel <= 4000.03) inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((totalBrutoTributavel - 2666.68) * 0.12);
  else inss = (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((Math.min(totalBrutoTributavel, 7786.02) - 4000.03) * 0.14);

  const totalLiquido = totalBrutoGeral - inss;

  const summary = `🏖️ *Cálculo de Férias CLT (${mesesTrabalhados}/12 avos)*:\n💵 *Salário Base*: R$ ${salarioBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n🌴 *Férias + 1/3*: R$ ${totalBrutoTributavel.toFixed(2)}\n💰 *Abono 10 dias*: R$ ${totalBrutoIsento.toFixed(2)}\n\n🟢 *Total Líquido a Receber*: *R$ ${totalLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*`;

  return (
    <div className="space-y-6" id="calc-ferias-proporcionais">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Férias Proporcionais e Vencidas CLT</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Simule o valor exato das férias, 1/3 constitucional, venda de 10 dias (abono pecuniário) e deduções legais.</p>
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Salário Bruto Contratual (R$)</label>
          <input type="number" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={salarioBruto} onChange={e => setSalarioBruto(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Média de Horas Extras/Comissões (R$)</label>
          <input type="number" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={mediaExtras} onChange={e => setMediaExtras(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Meses Trabalhados (Avos)</label>
          <select className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-semibold" value={mesesTrabalhados} onChange={e => setMesesTrabalhados(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} / 12 avos {i === 11 ? '(Férias Integrais)' : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Venda de 1/3 (Abono 10 dias)?</label>
          <div className="flex gap-2">
            <button onClick={() => setVenderAbono(false)} type="button" className={`flex-1 py-2 rounded-xl text-xs font-bold ${!venderAbono ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 border'}`}>
              Não (Gozar 30d)
            </button>
            <button onClick={() => setVenderAbono(true)} type="button" className={`flex-1 py-2 rounded-xl text-xs font-bold ${venderAbono ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 border'}`}>
              Sim (Vender 10d)
            </button>
          </div>
        </div>
      </div>

      {/* Resultados Detalhados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">1. Remuneração de Férias ({diasGozados} dias)</span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">R$ {valorDiasFerias.toFixed(2)}</span>
          <span className="text-xs text-slate-500 block">+ 1/3 Constitucional: <strong>R$ {valorTercoConstitucional.toFixed(2)}</strong></span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">2. Abono Pecuniário (Isento)</span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">R$ {totalBrutoIsento.toFixed(2)}</span>
          <span className="text-xs text-emerald-600 font-semibold block">{venderAbono ? '10 dias vendidos + 1/3 isento de INSS/IR' : 'Nenhum dia vendido'}</span>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-2">
          <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase block">3. Total Líquido Estimado</span>
          <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">R$ {totalLiquido.toFixed(2)}</span>
          <span className="text-xs text-slate-500 block">Total Bruto: R$ {totalBrutoGeral.toFixed(2)} | INSS: -R$ {inss.toFixed(2)}</span>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Férias Proporcionais" 
        summaryText={summary}
      />
    </div>
  );
}

// 52. CALCULADORA DE AVISO PRÉVIO PROPORCIONAL (LEI 12.506/11)
function CalculadoraAvisoPrevio() {
  const [salarioBase, setSalarioBase] = useState(() => getParamNumber('salario', 3000));
  const [anosCompletos, setAnosCompletos] = useState(() => getParamNumber('anos', 3));
  const [tipoDemissao, setTipoDemissao] = useState(() => getParamString('tipo', 'sem_justa_causa'));

  useEffect(() => {
    syncUrlParams({
      salario: salarioBase,
      anos: anosCompletos,
      tipo: tipoDemissao
    });
  }, [salarioBase, anosCompletos, tipoDemissao]);

  // Cálculo da Lei 12.506/11: 30 dias + 3 dias por ano completo (máximo de 90 dias)
  const diasAdicionais = tipoDemissao === 'sem_justa_causa' ? Math.min(60, (anosCompletos || 0) * 3) : 0;
  const totalDiasAviso = 30 + diasAdicionais;

  const valorDiaSalario = (salarioBase || 0) / 30;
  const valorAvisoPrevio = valorDiaSalario * totalDiasAviso;

  const summary = `📄 *Aviso Prévio Proporcional (Lei 12.506/11)*:\n• Salário: R$ ${salarioBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n• Tempo de empresa: ${anosCompletos} ano(s)\n• Duração do aviso: *${totalDiasAviso} dias*\n\n👉 *Valor do Aviso Prévio*: *R$ ${valorAvisoPrevio.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*`;

  return (
    <div className="space-y-6" id="calc-aviso-previo">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Aviso Prévio Proporcional (Lei 12.506/11)</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule a quantidade exata de dias de aviso prévio (de 30 a 90 dias) e o valor rescisório por tempo de empresa.</p>
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Último Salário Base (R$)</label>
          <input type="number" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={salarioBase} onChange={e => setSalarioBase(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Anos Completos de Empresa</label>
          <input type="number" min={0} max={30} className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={anosCompletos} onChange={e => setAnosCompletos(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Tipo de Rescisão</label>
          <select className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-semibold" value={tipoDemissao} onChange={e => setTipoDemissao(e.target.value)}>
            <option value="sem_justa_causa">Demissão sem Justa Causa (Pelo Empregador)</option>
            <option value="pedido_demissao">Pedido de Demissão (Pelo Empregado)</option>
          </select>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">Duração do Aviso Prévio</span>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">{totalDiasAviso} dias</span>
          <span className="text-xs text-slate-500 block">
            {tipoDemissao === 'sem_justa_causa' ? `30 dias base + ${diasAdicionais} dias adicionais (${anosCompletos} anos x 3 dias)` : '30 dias fixos (pedido de demissão não confere proporcionalidade)'}
          </span>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-2">
          <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase block">Valor Financeiro Bruto</span>
          <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">R$ {valorAvisoPrevio.toFixed(2)}</span>
          <span className="text-xs text-slate-500 block">Equivalente a R$ {valorDiaSalario.toFixed(2)} por dia trabalhado/indenizado</span>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Aviso Prévio Proporcional" 
        summaryText={summary}
      />
    </div>
  );
}

// 53. CALCULADORA DE TIJOLOS, BLOCOS E ARGAMASSA
function CalculadoraTijolosArgamassa() {
  const [comprimento, setComprimento] = useState(() => getParamNumber('c', 10));
  const [altura, setAltura] = useState(() => getParamNumber('h', 2.8));
  const [descontoVaos, setDescontoVaos] = useState(() => getParamNumber('vaos', 4));
  const [tipoBloco, setTipoBloco] = useState(() => getParamString('bloco', '8furos'));

  useEffect(() => {
    syncUrlParams({
      c: comprimento,
      h: altura,
      vaos: descontoVaos,
      bloco: tipoBloco
    });
  }, [comprimento, altura, descontoVaos, tipoBloco]);

  const areaTotal = Math.max(0, (comprimento || 0) * (altura || 0));
  const areaLiquida = Math.max(0, areaTotal - (descontoVaos || 0));

  // Rendimento por m²
  let tijolosPorM2 = 25; // Padrão 8 furos 9x19x19 cm
  let argamassaKgM2 = 18; // kg por m²

  if (tipoBloco === '6furos') {
    tijolosPorM2 = 33;
    argamassaKgM2 = 20;
  } else if (tipoBloco === '9furos') {
    tijolosPorM2 = 25;
    argamassaKgM2 = 22;
  } else if (tipoBloco === 'concreto') {
    tijolosPorM2 = 12.5;
    argamassaKgM2 = 15;
  }

  const tijolosExatos = Math.ceil(areaLiquida * tijolosPorM2);
  const tijolosComPerda = Math.ceil(tijolosExatos * 1.10); // +10% de perda
  const totalArgamassaKg = Math.ceil(areaLiquida * argamassaKgM2);
  const sacosArgamassa20kg = Math.ceil(totalArgamassaKg / 20);

  const summary = `🧱 *Quantitativo de Tijolos e Argamassa*:\n📐 *Área Líquida*: ${areaLiquida.toFixed(1)} m²\n🧱 *Tijolos/Blocos (+10% perda)*: *${tijolosComPerda} unidades* (${tipoBloco})\n🧪 *Argamassa de Assentamento*: *${sacosArgamassa20kg} sacos de 20kg* (~${totalArgamassaKg} kg)`;

  return (
    <div className="space-y-6" id="calc-tijolos-argamassa">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Tijolos, Blocos e Argamassa</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule a quantidade exata de blocos cerâmicos ou de concreto e sacos de argamassa para paredes.</p>
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Comprimento da Parede (m)</label>
          <input type="number" step="0.1" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={comprimento} onChange={e => setComprimento(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Altura / Pé-direito (m)</label>
          <input type="number" step="0.1" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={altura} onChange={e => setAltura(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Desconto de Portas/Janelas (m²)</label>
          <input type="number" step="0.1" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={descontoVaos} onChange={e => setDescontoVaos(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Tipo de Tijolo / Bloco</label>
          <select className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-semibold" value={tipoBloco} onChange={e => setTipoBloco(e.target.value)}>
            <option value="8furos">Tijolo Baiano 8 Furos (9x19x19 cm)</option>
            <option value="6furos">Tijolo Baiano 6 Furos (9x14x19 cm)</option>
            <option value="9furos">Tijolo Baiano 9 Furos (14x19x19 cm)</option>
            <option value="concreto">Bloco de Concreto (14x19x39 cm)</option>
          </select>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">Área Líquida da Alvenaria</span>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">{areaLiquida.toFixed(1)} m²</span>
          <span className="text-xs text-slate-500 block">Total bruto: {areaTotal.toFixed(1)} m² (-{descontoVaos} m² de vãos)</span>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-2">
          <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase block">Tijolos Recomendados (+10% perda)</span>
          <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">{tijolosComPerda} unid.</span>
          <span className="text-xs text-slate-500 block">Quantidade exata: {tijolosExatos} tijolos</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">Argamassa de Assentamento</span>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">{sacosArgamassa20kg} sacos</span>
          <span className="text-xs text-slate-500 block">Aprox. {totalArgamassaKg} kg (sacos de 20 kg)</span>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Tijolos e Argamassa" 
        summaryText={summary}
      />
    </div>
  );
}

// 54. CALCULADORA DE COMBUSTÍVEL E PEDÁGIO PARA VIAGEM
function CalculadoraCombustivelViagem() {
  const [distanciaKm, setDistanciaKm] = useState(() => getParamNumber('km', 350));
  const [idaEVolta, setIdaEVolta] = useState(() => getParamBoolean('idavolta', true));
  const [consumoKmL, setConsumoKmL] = useState(() => getParamNumber('consumo', 12));
  const [precoCombustivel, setPrecoCombustivel] = useState(() => getParamNumber('preco', 5.89));
  const [pedagioTotal, setPedagioTotal] = useState(() => getParamNumber('pedagio', 45));
  const [numPassageiros, setNumPassageiros] = useState(() => getParamNumber('pessoas', 4));

  useEffect(() => {
    syncUrlParams({
      km: distanciaKm,
      idavolta: idaEVolta,
      consumo: consumoKmL,
      preco: precoCombustivel,
      pedagio: pedagioTotal,
      pessoas: numPassageiros
    });
  }, [distanciaKm, idaEVolta, consumoKmL, precoCombustivel, pedagioTotal, numPassageiros]);

  const kmFinal = idaEVolta ? (distanciaKm || 0) * 2 : (distanciaKm || 0);
  const litrosGastos = (consumoKmL || 1) > 0 ? kmFinal / (consumoKmL || 1) : 0;
  const custoCombustivel = litrosGastos * (precoCombustivel || 0);
  const pedagioFinal = idaEVolta ? (pedagioTotal || 0) * 2 : (pedagioTotal || 0);
  const custoTotalViagem = custoCombustivel + pedagioFinal;
  const custoPorPassageiro = (numPassageiros || 1) > 0 ? custoTotalViagem / (numPassageiros || 1) : custoTotalViagem;

  const summary = `🚗 *Rateio de Viagem (${kmFinal} km ${idaEVolta ? 'Ida e Volta' : 'Só Ida'})*:\n⛽ *Combustível*: ${litrosGastos.toFixed(1)} Litros (R$ ${custoCombustivel.toFixed(2)})\n🛣️ *Pedágios*: R$ ${pedagioFinal.toFixed(2)}\n💰 *Custo Total*: R$ ${custoTotalViagem.toFixed(2)}\n👥 *Divisão por pessoa (${numPassageiros} passageiros)*: *R$ ${custoPorPassageiro.toFixed(2)}*`;

  return (
    <div className="space-y-6" id="calc-combustivel-viagem">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de Combustivel e Pedágio para Viagem</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calcule os gastos totais de estrada (combustível e tarifas de pedágio) e divida por passageiro.</p>
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Distância do Trecho (km)</label>
          <div className="flex gap-2">
            <input type="number" className="flex-1 border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={distanciaKm} onChange={e => setDistanciaKm(Number(e.target.value))} />
            <button onClick={() => setIdaEVolta(!idaEVolta)} type="button" className={`px-3 py-2 rounded-xl text-xs font-bold ${idaEVolta ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 border'}`}>
              {idaEVolta ? 'Ida e Volta 🔄' : 'Só Ida ➡️'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Consumo Médio (km/l)</label>
          <input type="number" step="0.5" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={consumoKmL} onChange={e => setConsumoKmL(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Preço do Litro (R$)</label>
          <input type="number" step="0.01" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={precoCombustivel} onChange={e => setPrecoCombustivel(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Pedágios do Trecho (R$)</label>
          <input type="number" step="1" className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={pedagioTotal} onChange={e => setPedagioTotal(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Número de Passageiros para Rateio</label>
          <input type="number" min={1} max={10} className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={numPassageiros} onChange={e => setNumPassageiros(Number(e.target.value))} />
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">Consumo da Rota ({kmFinal} km)</span>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">{litrosGastos.toFixed(1)} L</span>
          <span className="text-xs text-slate-500 block">Custo combustível: R$ {custoCombustivel.toFixed(2)}</span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">Custo Total da Viagem</span>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">{custoTotalViagem.toFixed(2)}</span>
          <span className="text-xs text-slate-500 block">Combustível + R$ {pedagioFinal.toFixed(2)} de pedágio</span>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-2">
          <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase block">Valor por Pessoa ({numPassageiros} pess.)</span>
          <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">R$ {custoPorPassageiro.toFixed(2)}</span>
          <span className="text-xs text-emerald-600 font-semibold block">Divisão justa de despesas</span>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de Combustível para Viagem" 
        summaryText={summary}
      />
    </div>
  );
}

// 55. CALCULADORA DE BTUS PARA AR-CONDICIONADO
function CalculadoraBtusArCondicionado() {
  const [areaM2, setAreaM2] = useState(() => getParamNumber('area', 18));
  const [solIntenso, setSolIntenso] = useState(() => getParamBoolean('sol', false));
  const [numPessoas, setNumPessoas] = useState(() => getParamNumber('pessoas', 2));
  const [numAparelhos, setNumAparelhos] = useState(() => getParamNumber('aparelhos', 2));

  useEffect(() => {
    syncUrlParams({
      area: areaM2,
      sol: solIntenso,
      pessoas: numPessoas,
      aparelhos: numAparelhos
    });
  }, [areaM2, solIntenso, numPessoas, numAparelhos]);

  const baseBtuM2 = solIntenso ? 800 : 600;
  const adicionalItem = solIntenso ? 800 : 600;

  const pessoasExtras = Math.max(0, (numPessoas || 1) - 1);
  const btusCalculados = ((areaM2 || 1) * baseBtuM2) + (pessoasExtras * adicionalItem) + ((numAparelhos || 0) * adicionalItem);

  // Capacidade comercial recomendada
  let capacidadeComercial = 9000;
  if (btusCalculados <= 9000) capacidadeComercial = 9000;
  else if (btusCalculados <= 12000) capacidadeComercial = 12000;
  else if (btusCalculados <= 18000) capacidadeComercial = 18000;
  else if (btusCalculados <= 24000) capacidadeComercial = 24000;
  else if (btusCalculados <= 30000) capacidadeComercial = 30000;
  else capacidadeComercial = 36000;

  const summary = `❄️ *Cálculo de BTUs para Ar-Condicionado*:\n📐 *Ambiente*: ${areaM2} m² (${solIntenso ? 'Sol da tarde' : 'Sol da manhã'})\n👥 *Pessoas*: ${numPessoas} | 💻 *Aparelhos*: ${numAparelhos}\n🔥 *Carga Térmica*: ${btusCalculados.toLocaleString('pt-BR')} BTUs/h\n👉 *Modelo Recomendado*: *${capacidadeComercial.toLocaleString('pt-BR')} BTUs* (Preferência Inverter)`;

  return (
    <div className="space-y-6" id="calc-btus-ar">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Calculadora de BTUs para Ar-Condicionado</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Descubra a capacidade térmica exata em BTUs/h para climatizar seu quarto, sala ou escritório com economia.</p>
      </div>

      <div className="p-5 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-750 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Área do Cômodo (m²)</label>
          <input type="number" min={1} className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={areaM2} onChange={e => setAreaM2(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Incidência de Sol</label>
          <select className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-semibold" value={solIntenso ? 'tarde' : 'manha'} onChange={e => setSolIntenso(e.target.value === 'tarde')}>
            <option value="manha">Sol apenas pela manhã (Moderado)</option>
            <option value="tarde">Sol intenso durante a tarde</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Pessoas no Ambiente</label>
          <input type="number" min={1} max={30} className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={numPessoas} onChange={e => setNumPessoas(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 mb-1">Aparelhos Eletrônicos (TVs, PCs)</label>
          <input type="number" min={0} max={20} className="w-full border dark:border-slate-700 rounded-xl p-2.5 bg-white dark:bg-slate-800 text-sm font-mono" value={numAparelhos} onChange={e => setNumAparelhos(Number(e.target.value))} />
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase block">Carga Térmica Exata</span>
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 font-mono">{btusCalculados.toLocaleString('pt-BR')} BTUs/h</span>
          <span className="text-xs text-slate-500 block">Cálculo por área + dissipação de calor de pessoas e eletrônicos</span>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-2">
          <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase block">Modelo Comercial Recomendado</span>
          <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-mono">{capacidadeComercial.toLocaleString('pt-BR')} BTUs</span>
          <span className="text-xs text-emerald-600 font-semibold block">Dica: Prefira modelos com tecnologia Inverter (até 60% de economia)</span>
        </div>
      </div>

      <ShareBar 
        title="Calculadora de BTUs para Ar-Condicionado" 
        summaryText={summary}
      />
    </div>
  );
}
