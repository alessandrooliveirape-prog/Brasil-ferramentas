/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface CalculadorasProps {
  toolId: string;
}

export default function Calculadoras({ toolId }: CalculadorasProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm" id="calculadora-container">
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
      {toolId === 'regra-de-tres' && <RegraDeTres />}
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
    </div>
  );
}

// 1. JUROS COMPOSTOS
function JurosCompostos() {
  const [inicial, setInicial] = useState<number>(1000);
  const [mensal, setMensal] = useState<number>(100);
  const [taxa, setTaxa] = useState<number>(12);
  const [periodo, setPeriodo] = useState<number>(5);
  const [tipoPeriodo, setTipoPeriodo] = useState<'anos' | 'meses'>('anos');
  const [tipoTaxa, setTipoTaxa] = useState<'anual' | 'mensal'>('anual');
  const [resultado, setResultado] = useState<any>(null);

  const calcular = () => {
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
              <span className="text-lg font-bold text-red-500 dark:text-red-400 font-mono">R$ {resultado.jurosTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                    <td className="p-2.5 text-red-500 font-mono">R$ {p.juros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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
              <span className="text-base font-bold text-red-500 dark:text-red-400 font-mono">R$ {resultado.desconto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                    <td className="p-2 text-red-500">R$ {d.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
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
              <span className="font-bold text-amber-600 dark:text-amber-400">R$ {resultado.multaFgts.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
      cor = 'text-amber-500';
    } else if (imcValue >= 18.5 && imcValue < 25) {
      classif = 'Peso normal (Saudável)';
      cor = 'text-emerald-500';
    } else if (imcValue >= 25 && imcValue < 30) {
      classif = 'Sobrepeso';
      cor = 'text-amber-600';
    } else {
      classif = 'Obesidade';
      cor = 'text-red-500';
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
            <div><span className="block text-xs text-slate-500">Valor do IPVA</span><span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">R$ {resultado.valorIPVA.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
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
            <div><span className="block text-xs text-slate-500">Imposto Devido</span><span className={`text-lg font-bold font-mono ${resultado.imposto > 0 ? 'text-red-500' : 'text-emerald-600'}`}>R$ {resultado.imposto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
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
        <div className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-xl border border-amber-100 dark:border-amber-950 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Valor Base</span><span className="text-base font-bold font-mono">R$ {resultado.valorBase.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Com Fator {fatorMultiplicador}x</span><span className="text-base font-bold font-mono text-red-500">R$ {resultado.valorComFator.toFixed(2)}</span></div>
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
            <div><span className="block text-xs text-slate-500">Comissão</span><span className="text-base font-bold text-red-500 font-mono">-R$ {resultado.comissaoValor.toFixed(2)}</span></div>
            <div><span className="block text-xs text-slate-500">Combustível</span><span className="text-base font-bold text-amber-600 font-mono">-R$ {resultado.custoCombustivel.toFixed(2)}</span></div>
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
    else if (semanas <= 27) { trimestre = '2º Trimestre'; trimestreCor = 'text-blue-600'; }
    else { trimestre = '3º Trimestre'; trimestreCor = 'text-amber-600'; }

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
          <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-xl border border-pink-100"><span className="block text-xs text-slate-500">Semanas</span><span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.semanas}</span></div>
          <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-xl border border-pink-100"><span className="block text-xs text-slate-500">Dias</span><span className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{resultado.diasResto}</span></div>
          <div className={`${resultado.trimestreCor === 'text-emerald-600' ? 'bg-emerald-50' : resultado.trimestreCor === 'text-blue-600' ? 'bg-blue-50' : 'bg-amber-50'} dark:bg-opacity-10 p-4 rounded-xl border`}>
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
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border"><span className="block text-xs text-slate-500">GET (Gasto Total)</span><span className="text-2xl font-extrabold text-blue-700 dark:text-blue-300 font-mono">{Math.round(resultado.get)} kcal/dia</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-100"><span className="block text-xs text-amber-600">Para Emagrecer (-500kcal)</span><span className="text-lg font-bold text-amber-700 dark:text-amber-300 font-mono">{Math.round(resultado.emagrecer)} kcal/dia</span></div>
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100"><span className="block text-xs text-green-600">Para Ganhar Massa (+300kcal)</span><span className="text-lg font-bold text-green-700 dark:text-green-300 font-mono">{Math.round(resultado.ganhar)} kcal/dia</span></div>
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
        <div className={`p-5 rounded-xl border ${resultado.podeAposentar ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="text-center mb-3">
            <span className={`text-2xl font-extrabold ${resultado.podeAposentar ? 'text-emerald-600' : 'text-amber-600'}`}>
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
        <div className={`p-5 rounded-xl border ${resultado.temDireito ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <p className={`text-center font-bold ${resultado.temDireito ? 'text-emerald-600' : 'text-amber-600'}`}>
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
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-xl border border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Alíquota ICMS</span><span className="text-lg font-bold font-mono">{resultado.aliquota.toFixed(1)}%</span></div>
            <div><span className="block text-xs text-slate-500">Valor do ICMS</span><span className="text-lg font-bold text-red-500 font-mono">R$ {resultado.valorICMS.toFixed(2)}</span></div>
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
        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-xl border border-blue-100">
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
        <div className="bg-purple-50/50 dark:bg-purple-950/20 p-5 rounded-xl border border-purple-100 text-center">
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
        <div className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-xl border border-amber-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div><span className="block text-xs text-slate-500">Adicional (30%)</span><span className="text-lg font-bold text-amber-600 font-mono">R$ {resultado.adicional.toFixed(2)}</span></div>
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
        <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 text-center">
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
        <div className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-xl border border-amber-100 text-center">
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
  const [idade, setIdadeC] = useState<number>(30);
  const [sexo, setSexoC] = useState<string>('masculino');
  const [atividade, setAtividade] = useState<string>('moderado');
  const [objetivo, setObjetivo] = useState<string>('manter');
  const [resultado, setResultado] = useState<any>(null);

  const fatoresAtv: {[key: string]: number} = { 'sedentario': 1.2, 'leve': 1.375, 'moderado': 1.55, 'intenso': 1.725 };

  useEffect(() => {
    let tmb = sexoC === 'masculino' 
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
        <div><label className="block text-xs">Idade</label><input type="number" className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={idadeC} onChange={e => setIdadeC(Number(e.target.value))} /></div>
        <div><label className="block text-xs">Sexo</label><select className="w-full border rounded p-2 text-sm bg-slate-50 dark:bg-slate-800" value={sexoC} onChange={e => setSexoC(e.target.value)}><option value="masculino">Masc</option><option value="feminino">Fem</option></select></div>
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
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-xl border border-indigo-100 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg"><span className="block text-xs text-slate-500">Média Simples</span><span className="text-2xl font-bold font-mono">{resultado.mediaSimples.toFixed(1)}</span></div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg"><span className="block text-xs text-slate-500">Média Ponderada (Mat + Redação)</span><span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">{resultado.mediaPonderada.toFixed(1)}</span></div>
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
  const [valA, setValA] = useState<string>('10');
  const [valB, setValB] = useState<string>('20');
  const [valC, setValC] = useState<string>('50');
  const [resultado, setResultado] = useState<string>('?');

  const calcular = () => {
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
              <div className="text-red-500 font-bold">Descontado: {res3.d.toLocaleString('pt-BR')}</div>
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
            <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-xl border border-rose-100 dark:border-rose-950/50 text-rose-800 dark:text-rose-450 text-xs">
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
  const [salarioBruto, setSalarioBruto] = useState<number>(3500);
  const [dependentes, setDependentes] = useState<number>(0);
  const [outrasDeducoes, setOutrasDeducoes] = useState<number>(0);
  const [valeTransporte, setValeTransporte] = useState<boolean>(false);
  const [vrCopart, setVrCopart] = useState<number>(0);
  const [planoSaude, setPlanoSaude] = useState<number>(0);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
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

    // Limitador ao teto do INSS (Máximo de R$ 908.85 para fins ilustrativos)
    const tetoINSS = 908.85;
    if (valorINSS > tetoINSS) {
      valorINSS = tetoINSS;
    }

    // 2. IRRF PROGRESSIVO 2026
    // Base de cálculo do IRRF = Salário Bruto - INSS - (Dependentes * 189,59) - Outras deduções
    const descontoDependentes = dependentes * 189.59;
    const baseIRRF = Math.max(0, salarioBruto - valorINSS - descontoDependentes - outrasDeducoes);

    // Alíquotas e Deduções IRRF
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
          <label htmlFor="check-vt" className="text-xs font-semibold text-slate-600 dark:text-slate-350 hover:cursor-pointer select-none">Descontar Vale Transporte (6%)</label>
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
                <span className="text-base font-bold text-red-500 dark:text-red-400 font-mono">
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
            <div className="w-full bg-red-100 dark:bg-red-950/40 rounded-full h-2.5 mt-4 overflow-hidden flex">
              <div className="bg-emerald-600 h-full" style={{ width: `${resultado.pctLiquido}%` }}></div>
              <div className="bg-rose-500 h-full" style={{ width: `${resultado.pctDescontos}%` }}></div>
            </div>
          </div>

          <div className="overflow-x-auto text-xs bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider text-[10px]">Quadro de Descontos e Impostos do Contra-Cheque:</h4>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Previdência Obrigatória (INSS Progressivo)</span>
                <span className="font-mono font-bold text-red-500">- R$ {resultado.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                <span className="text-slate-500">Imposto de Renda Retido na Fonte (IRRF)</span>
                <span className="font-mono font-bold text-red-500">- R$ {resultado.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              {valeTransporte && (
                <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Vale Transporte (Dedução de 6% do Empregado)</span>
                  <span className="font-mono font-bold text-red-500">- R$ {resultado.vt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {vrCopart > 0 && (
                <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Vale Refeição / Alimentação (Preço Coparticipado)</span>
                  <span className="font-mono font-bold text-red-500">- R$ {vrCopart.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              {planoSaude > 0 && (
                <div className="flex justify-between border-b border-dashed border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Dedução Plano de Saúde Coletivo Empresarial</span>
                  <span className="font-mono font-bold text-red-500">- R$ {planoSaude.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

