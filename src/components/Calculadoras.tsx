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

