/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

interface ProgrammaticPageProps {
  id: string; // e.g. "ddd-brasil", "cep-brasil", "quantos-dias-faltam-para-o-natal"
}

export default function ProgrammaticPage({ id }: ProgrammaticPageProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-6 shadow-sm" id="prog-container">
      {id.includes('quantos-dias-faltam') && <CountdownTracker eventId={id} />}
      {id === 'ddd-brasil' && <DddBrasil />}
      {id === 'bancos-brasil' && <BancosBrasil />}
      {id === 'cep-brasil' && <CepBrasil />}
      {id === 'cnae-consulta' && <CnaeConsulta />}
      {id === 'cbo-consulta' && <CboConsulta />}
      {id === 'salario-minimo-historico' && <SalarioMinimoHistorico />}
      {id === 'feriados-nacionais' && <FeriadosNacionais />}
      {id === 'selic-historica' && <SelicHistorica />}
      {id === 'calendario-inss' && <CalendarioINSS />}
      {id === 'codigos-ncm' && <CodigosNCM />}
      {id === 'codigos-ibge' && <CodigosIBGE />}
      {/* NOVAS PÁGINAS PROGRAMÁTICAS - DDDs por estado */}
      {id === 'ddd-sp' && <DddPorEstado uf="SP" nome="São Paulo" ddds="11, 12, 13, 14, 15, 16, 17, 18, 19" />}
      {id === 'ddd-rj' && <DddPorEstado uf="RJ" nome="Rio de Janeiro" ddds="21, 22, 24" />}
      {id === 'ddd-mg' && <DddPorEstado uf="MG" nome="Minas Gerais" ddds="31, 32, 33, 34, 35, 37, 38" />}
      {id === 'ddd-pr' && <DddPorEstado uf="PR" nome="Paraná" ddds="41, 42, 43, 44, 45, 46" />}
      {id === 'ddd-sc' && <DddPorEstado uf="SC" nome="Santa Catarina" ddds="47, 48, 49" />}
      {id === 'ddd-rs' && <DddPorEstado uf="RS" nome="Rio Grande do Sul" ddds="51, 53, 54, 55" />}
      {id === 'ddd-ba' && <DddPorEstado uf="BA" nome="Bahia" ddds="71, 73, 74, 75, 77" />}
      {id === 'ddd-ce' && <DddPorEstado uf="CE" nome="Ceará" ddds="85, 88" />}
      {id === 'ddd-pe' && <DddPorEstado uf="PE" nome="Pernambuco" ddds="81, 87" />}
      {id === 'ddd-go' && <DddPorEstado uf="GO" nome="Goiás" ddds="62, 64" />}
      {id === 'ddd-es' && <DddPorEstado uf="ES" nome="Espírito Santo" ddds="27, 28" />}
      {/* Salário mínimo por ano */}
      {id.startsWith('salario-minimo-') && <SalarioMinimoPorAno year={id.replace('salario-minimo-', '')} />}
      {/* SELIC por ano */}
      {id.startsWith('selic-') && <SelicPorAno />}
      {/* IBGE por estado */}
      {id.startsWith('ibge-') && <IbgePorEstado />}
      {/* Previsão do tempo */}
      {id.startsWith('tempo-') && <PrevisaoTempo />}
      {/* Ferramentas populares */}
      {['simular-aposentadoria-por-idade','calcular-13o-salario','calcular-rescisao-trabalhista','simular-financiamento-casa-propria','consultar-cep-correios','consultar-ddd-telefone','gerar-senha-forte','gerar-cpf-valido','gerar-cnpj-valido','gerar-qr-code-pix','calcular-imc-gratis','calcular-juros-compostos-mensais','calcular-porcentagem-online','calcular-inss-salario'].includes(id) && <PaginaFerramentaLongTail id={id} />}
    </div>
  );
}

// 1. COUNTDOWN TRACKER
function CountdownTracker({ eventId }: { eventId: string }) {
  const [timeLeft, setTimeLeft] = useState<any>(null);
  
  const getEventDetails = () => {
    const curYear = new Date().getFullYear();
    if (eventId === 'quantos-dias-faltam-para-o-natal') {
      return { name: "Natal", date: new Date(curYear, 11, 25) };
    } else if (eventId === 'quantos-dias-faltam-para-2027') {
      return { name: "Ano Novo de 2027", date: new Date(2027, 0, 1) };
    } else {
      // Carnaval 2027 (simulado fevereiro de 2027)
      return { name: "Terça-feira de Carnaval", date: new Date(2027, 1, 9) };
    }
  };

  const details = getEventDetails();

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = details.date.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, concluido: true });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft({ dias: d, horas: h, minutos: m, concluido: false });
    };

    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, [eventId]);

  if (!timeLeft) return null;

  return (
    <div className="space-y-6 text-center py-6" id="prog-countdown">
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Contagem Regressiva para o {details.name}</h2>
      
      <div className="flex justify-center gap-4 text-xs md:text-sm">
        <div className="bg-emerald-50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900 shadow">
          <span className="block text-3xl md:text-5xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{timeLeft.dias}</span>
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Dias</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-150 shadow">
          <span className="block text-3xl md:text-5xl font-mono font-bold text-slate-800 dark:text-slate-200">{timeLeft.horas}</span>
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Horas</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-150 shadow">
          <span className="block text-3xl md:text-5xl font-mono font-bold text-slate-800 dark:text-slate-200">{timeLeft.minutos}</span>
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Minutos</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 max-w-md mx-auto pt-4 border-t border-slate-100">
        Data Alvo: <strong>{details.date.toLocaleDateString('pt-BR')}</strong> às 00:00. Otimizado para consultas recorrentes e monitoramento de feriados nacionais.
      </p>
    </div>
  );
}

// 2. DDD DO BRASIL
function DddBrasil() {
  const [selectedDdd, setSelectedDdd] = useState<number | null>(11);
  const [typedDdd, setTypedDdd] = useState<string>('11');
  const [inputError, setInputError] = useState<string>('');

  const dddDetails: { [key: number]: { estado: string; cidades: string } } = {
    11: { estado: "São Paulo (SP)", cidades: "Grande São Paulo, Guarulhos, Osasco, ABC Paulista, Mogi das Cruzes, Osasco, Jundiaí" },
    12: { estado: "São Paulo (SP)", cidades: "São José dos Campos, Taubaté, Jacareí, Caraguatatuba, Campos do Jordão" },
    13: { estado: "São Paulo (SP)", cidades: "Santos, São Vicente, Guarujá, Praia Grande, Itanhaém, Registro" },
    14: { estado: "São Paulo (SP)", cidades: "Bauru, Marília, Jaú, Botucatu, Ourinhos, Avaré, Lins" },
    15: { estado: "São Paulo (SP)", cidades: "Sorocaba, Itapetininga, Itapeva, Tatuí, Porto Feliz, Piedade" },
    16: { estado: "São Paulo (SP)", cidades: "Ribeirão Preto, Franca, Araraquara, São Carlos, Sertãozinho" },
    17: { estado: "São Paulo (SP)", cidades: "São José do Rio Preto, Catanduva, Barretos, Votuporanga, Fernandópolis" },
    18: { estado: "São Paulo (SP)", cidades: "Presidente Prudente, Araçatuba, Birigui, Assis, Dracena, Penápolis" },
    19: { estado: "São Paulo (SP)", cidades: "Campinas, Piracicaba, Limeira, Americana, Sumaré, Indaiatuba" },
    21: { estado: "Rio de Janeiro (RJ)", cidades: "Rio de Janeiro, Niterói, Duque de Caxias, Nova Iguaçu, São Gonçalo" },
    22: { estado: "Rio de Janeiro (RJ)", cidades: "Campos dos Goytacazes, Cabo Frio, Macaé, Nova Friburgo, Itaperuna" },
    24: { estado: "Rio de Janeiro (RJ)", cidades: "Petrópolis, Volta Redonda, Barra Mansa, Angra dos Reis, Resende" },
    27: { estado: "Espírito Santo (ES)", cidades: "Vitória, Vila Velha, Serra, Cariacica, Linhares, Colatina" },
    28: { estado: "Espírito Santo (ES)", cidades: "Cachoeiro de Itapemirim, Colatina, Castelo, Itapemirim, Guaçuí" },
    31: { estado: "Minas Gerais (MG)", cidades: "Belo Horizonte, Contagem, Betim, Ipatinga, Sete Lagoas, Coronel Fabriciano" },
    32: { estado: "Minas Gerais (MG)", cidades: "Juiz de Fora, Barbacena, São João del Rei, Ubá, Muriaé, Viçosa" },
    33: { estado: "Minas Gerais (MG)", cidades: "Governador Valadares, Teófilo Otoni, Caratinga, Almenara, Manhuaçu" },
    34: { estado: "Minas Gerais (MG)", cidades: "Uberlândia, Uberaba, Patos de Minas, Araguari, Ituiutaba, Patrocínio" },
    35: { estado: "Minas Gerais (MG)", cidades: "Pouso Alegre, Poços de Caldas, Varginha, Alfenas, Passos, Lavras" },
    37: { estado: "Minas Gerais (MG)", cidades: "Divinópolis, Itaúna, Nova Serrana, Pará de Minas, Bom Despacho" },
    38: { estado: "Minas Gerais (MG)", cidades: "Montes Claros, Pirapora, Unaí, Januária, Curvelo, Diamantina" },
    41: { estado: "Paraná (PR)", cidades: "Curitiba, São José dos Pinhais, Paranaguá, Colombo, Araucária, Pinhais" },
    42: { estado: "Paraná (PR)", cidades: "Ponta Grossa, Guarapuava, União da Vitória, Telêmaco Borba, Irati" },
    43: { estado: "Paraná (PR)", cidades: "Londrina, Apucarana, Arapongas, Jacarezinho, Ivaiporã, Santo Antônio da Platina" },
    44: { estado: "Paraná (PR)", cidades: "Maringá, Campo Mourão, Umuarama, Paranavaí, Cianorte, Goioerê" },
    45: { estado: "Paraná (PR)", cidades: "Cascavel, Foz do Iguaçu, Toledo, Marechal Cândido Rondon, Medianeira" },
    46: { estado: "Paraná (PR)", cidades: "Francisco Beltrão, Pato Branco, Dois Vizinhos, Palmas, Capanema" },
    47: { estado: "Santa Catarina (SC)", cidades: "Joinville, Blumenau, Itajaí, Balneário Camboriú, Brusque, Jaraguá do Sul" },
    48: { estado: "Santa Catarina (SC)", cidades: "Florianópolis, Criciúma, Palhoça, São José, Tubarão, Imbituba" },
    49: { estado: "Santa Catarina (SC)", cidades: "Chapecó, Lages, Concórdia, Caçador, Joaçaba, Xanxerê, Mafra" },
    51: { estado: "Rio Grande do Sul (RS)", cidades: "Porto Alegre, Canoas, Novo Hamburgo, São Leopoldo, Gravataí, Viamão" },
    53: { estado: "Rio Grande do Sul (RS)", cidades: "Pelotas, Rio Grande, Bagé, Santana do Livramento, Camaquã" },
    54: { estado: "Rio Grande do Sul (RS)", cidades: "Caxias do Sul, Passo Fundo, Bento Gonçalves, Erechim, Vacaria, Carazinho" },
    55: { estado: "Rio Grande do Sul (RS)", cidades: "Santa Maria, Uruguaiana, Santo Ângelo, Cruz Alta, Ijuí, Alegrete" },
    61: { estado: "Distrito Federal / Goiás (DF/GO)", cidades: "Brasília, Taguatinga, Ceilândia, Formosa, Luziânia, Entorno de Brasília" },
    62: { estado: "Goiás (GO)", cidades: "Goiânia, Aparecida de Goiânia, Anápolis, Rio Verde, Catalão, Caldas Novas, Jataí" },
    63: { estado: "Tocantins (TO)", cidades: "Palmas, Araguaína, Gurupi, Porto Nacional, Paraíso do Tocantins" },
    64: { estado: "Goiás (GO)", cidades: "Rio Verde, Itumbiara, Catalão, Caldas Novas, Jataí, Morrinhos" },
    65: { estado: "Mato Grosso (MT)", cidades: "Cuiabá, Várzea Grande, Cáceres, Tangará da Serra, Poconé" },
    66: { estado: "Mato Grosso (MT)", cidades: "Rondonópolis, Sinop, Sorriso, Primavera do Leste, Barra do Garças" },
    67: { estado: "Mato Grosso do Sul (MS)", cidades: "Campo Grande, Dourados, Três Lagoas, Corumbá, Ponta Porã, Naviraí" },
    68: { estado: "Acre (AC)", cidades: "Rio Branco, Cruzeiro do Sul, Sena Madureira, Tarauacá, Feijó" },
    69: { estado: "Rondônia (RO)", cidades: "Porto Velho, Ji-Paraná, Ariquemes, Cacoal, Vilhena, Guajará-Mirim" },
    71: { estado: "Bahia (BA)", cidades: "Salvador, Camaçari, Lauro de Freitas, Simões Filho, Candeias" },
    73: { estado: "Bahia (BA)", cidades: "Itabuna, Ilhéus, Porto Seguro, Jequié, Teixeira de Freitas, Eunápolis" },
    74: { estado: "Bahia (BA)", cidades: "Juazeiro, Jacobina, Senhor do Bonfim, Irecê, Xique-Xique" },
    75: { estado: "Bahia (BA)", cidades: "Feira de Santana, Alagoinhas, Santo Antônio de Jesus, Paulo Afonso, Valença" },
    77: { estado: "Bahia (BA)", cidades: "Vitória da Conquista, Barreiras, Luís Eduardo Magalhães, Guanambi, Brumado" },
    79: { estado: "Sergipe (SE)", cidades: "Aracaju, Nossa Senhora do Socorro, Lagarto, Itabaiana, Estância" },
    81: { estado: "Pernambuco (PE)", cidades: "Recife, Jaboatão dos Guararapes, Olinda, Caruaru, Paulista, Cabo de Santo Agostinho" },
    82: { estado: "Alagoas (AL)", cidades: "Maceió, Arapiraca, Rio Largo, Palmeira dos Índios, União dos Palmares" },
    83: { estado: "Paraíba (PB)", cidades: "João Pessoa, Campina Grande, Patos, Santa Rita, Bayeux, Sousa, Cajazeiras" },
    84: { estado: "Rio Grande do Norte (RN)", cidades: "Natal, Mossoró, Parnamirim, Caicó, Macaíba, Ceará-Mirim" },
    85: { estado: "Ceará (CE)", cidades: "Fortaleza, Caucaia, Maracanaú, Eusébio, Aquiraz, Maranguape" },
    86: { estado: "Piauí (PI)", cidades: "Teresina, Parnaíba, Piripiri, Campo Maior, Floriano, Barras" },
    87: { estado: "Pernambuco (PE)", cidades: "Petrolina, Garanhuns, Arcoverde, Serra Talhada, Salgueiro, Ouricuri" },
    88: { estado: "Ceará (CE)", cidades: "Juazeiro do Norte, Sobral, Crato, Iguatu, Itapipoca, Quixadá" },
    89: { estado: "Piauí (PI)", cidades: "Picos, Floriano, Oeiras, São Raimundo Nonato, Corrente, Paulistana" },
    91: { estado: "Pará (PA)", cidades: "Belém, Ananindeua, Castanhal, Barcarena, Abaetetuba, Bragança" },
    92: { estado: "Amazonas (AM)", cidades: "Manaus, Itacoatiara, Manacapuru, Parintins, Coari, Tefé" },
    93: { estado: "Pará (PA)", cidades: "Santarém, Altamira, Itaituba, Oriximiná, Alenquer, Monte Alegre" },
    94: { estado: "Pará (PA)", cidades: "Marabá, Parauapebas, Redenção, Tucuruí, Santana do Araguaia" },
    95: { estado: "Roraima (RR)", cidades: "Boa Vista, Rorainópolis, Caracaraí, Mucajaí, Cantá" },
    96: { estado: "Amapá (AP)", cidades: "Macapá, Santana, Laranjal do Jari, Oiapoque, Porto Grande" },
    97: { estado: "Amazonas (AM)", cidades: "Tefé, Coari, Tabatinga, Maués, Humaitá, Lábrea" },
    98: { estado: "Maranhão (MA)", cidades: "São Luís, São José de Ribamar, Timon, Caxias, Pinheiro" },
    99: { estado: "Maranhão (MA)", cidades: "Imperatriz, Codó, Açailândia, Bacabal, Balsas, Santa Inês" }
  };

  const handleInputChange = (val: string) => {
    const cleaned = val.replace(/[^\d]/g, '').slice(0, 2);
    setTypedDdd(cleaned);
    
    if (cleaned.length === 2) {
      const dddNum = parseInt(cleaned, 10);
      if (dddDetails[dddNum]) {
        setSelectedDdd(dddNum);
        setInputError('');
      } else {
        setSelectedDdd(null);
        setInputError(`O DDD ${dddNum} não é válido ou não está cadastrado no território nacional.`);
      }
    } else {
      setSelectedDdd(null);
      setInputError('');
    }
  };

  const selectQuickDdd = (dddNum: number) => {
    setSelectedDdd(dddNum);
    setTypedDdd(dddNum.toString());
    setInputError('');
  };

  return (
    <div className="space-y-6" id="prog-ddd">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
        <Phone className="w-5 h-5 text-emerald-600 animate-pulse" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Códigos DDD do Brasil</h2>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Consulte a região de cobertura, estados e principais cidades brasileiras atendidas por cada código DDD. Digite abaixo o DDD de seu interesse ou escolha um dos atalhos rápidos programados.
      </p>

      {/* NOVO CAMPO DE CONSULTA PERSONALIZADA PEDIDO PELO USUÁRIO */}
      <div className="bg-slate-50 dark:bg-slate-850/50 p-4 rounded-xl border border-slate-150 dark:border-slate-800 space-y-3 shadow-xs">
        <label htmlFor="user-ddd-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          📍 Digite seu DDD (apenas números, ex: 11, 21, 85):
        </label>
        
        <div className="flex gap-2 max-w-sm">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold font-mono text-xs">
              0
            </span>
            <input
              id="user-ddd-input"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={2}
              value={typedDdd}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full pl-6 pr-3 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-slate-100 rounded-lg font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              placeholder="Ex: 85"
            />
          </div>
          {typedDdd && (
            <button
              onClick={() => {
                setTypedDdd('');
                setSelectedDdd(null);
                setInputError('');
              }}
              className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 hover:cursor-pointer rounded-lg text-xs text-slate-600 dark:text-slate-300 font-mono transition"
            >
              Limpar
            </button>
          )}
        </div>

        {inputError && (
          <p className="text-[11px] text-red-650 dark:text-red-400 font-medium animate-fade-in flex items-center gap-1">
            <span>⚠️ {inputError}</span>
          </p>
        )}
      </div>

      {/* ATALHOS RÁPIDOS */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          ⚡ Atalhos Rápidos Programados:
        </span>
        <div className="flex flex-wrap gap-2">
          {[11, 21, 31, 41, 51, 61, 71, 81, 91].map((ddd) => (
            <button
              key={ddd}
              onClick={() => selectQuickDdd(ddd)}
              className={`w-12 h-12 rounded-lg font-mono font-bold text-sm border flex items-center justify-center transition hover:cursor-pointer ${selectedDdd === ddd ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm font-extrabold' : 'bg-slate-50 dark:bg-slate-800 text-slate-705 border-slate-200 dark:border-slate-700 hover:bg-slate-100'}`}
            >
              {ddd}
            </button>
          ))}
        </div>
      </div>

      {/* EXIBIÇÃO DE DETALHES ADAPTATIVA */}
      {selectedDdd && dddDetails[selectedDdd] ? (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-emerald-500/25 dark:border-emerald-500/35 shadow-xs animate-fade-in space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="bg-emerald-600 text-white py-0.5 px-2.5 rounded text-sm font-mono font-bold">
              DDD {selectedDdd}
            </span>
            <span className="text-xs text-slate-405">Dados cadastrados oficialmente na ANATEL</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Estado / Unidade Federativa:</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm font-sans">{dddDetails[selectedDdd].estado}</strong>
            </div>

            <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Formato Telefônico Recomendado:</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm">(0{selectedDdd}) 9XXXX-XXXX</strong>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-xs font-sans space-y-1">
            <span className="text-slate-400 block text-[10px] font-mono uppercase font-bold">Principais Cidades e Regiões Assistidas:</span>
            <p className="text-slate-705 dark:text-slate-300 leading-relaxed font-semibold">
              {dddDetails[selectedDdd].cidades}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// 3. BANCOS DO BRASIL
function BancosBrasil() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const bancosList = [
    { code: "001", name: "Banco do Brasil S.A.", ispb: "00000000" },
    { code: "104", name: "Caixa Econômica Federal", ispb: "00360305" },
    { code: "237", name: "Banco Bradesco S.A.", ispb: "60746948" },
    { code: "341", name: "Itaú Unibanco S.A.", ispb: "60701190" },
    { code: "033", name: "Banco Santander (Brasil) S.A.", ispb: "90400888" },
    { code: "260", name: "Nu Pagamentos S.A. (Nubank)", ispb: "18236120" },
    { code: "077", name: "Banco Inter S.A.", ispb: "17228801" },
    { code: "212", name: "Banco Original S.A.", ispb: "92894922" },
    { code: "336", name: "Banco C6 S.A.", ispb: "33261622" }
  ];

  const filtered = bancosList.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.code.includes(searchTerm)
  );

  return (
    <div className="space-y-6" id="prog-bancos">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Banco Oficial e Código ISPB</h2>
      
      <input
        type="text"
        className="w-full md:w-1/2 border dark:border-slate-700 p-2 text-xs bg-slate-50 dark:bg-slate-800 dark:text-slate-100 rounded-lg"
        placeholder="Pesquise por nome ou número do banco (ex: Caixa, 260)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left text-slate-500 dark:text-slate-400">
          <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px] text-slate-700 dark:text-slate-300">
            <tr>
              <th className="p-2">Compensação COMPE</th>
              <th className="p-2">Nome Comercial do Banco</th>
              <th className="p-2">Número ISPB</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((b, idx) => (
              <tr key={idx}>
                <td className="p-2.5 font-bold font-mono text-emerald-600">{b.code}</td>
                <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">{b.name}</td>
                <td className="p-2.5 font-mono text-slate-400">{b.ispb}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 4. CEP DO BRASIL (REAL VIA VIA_CEP API!)
function CepBrasil() {
  const [cep, setCep] = useState<string>('01001000');
  const [address, setAddress] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const lookupCep = async () => {
    setErrorText('');
    setAddress(null);
    const cleanCep = cep.replace(/[^\d]+/g, '');
    
    if (cleanCep.length !== 8) {
      setErrorText('CEP deve conter exatamente 8 dígitos decimais.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (response.ok) {
        const data = await response.json();
        if (data.erro) {
          setErrorText('CEP não localizado nas bases nacionais dos Correios.');
        } else {
          setAddress(data);
        }
      } else {
        throw new Error();
      }
    } catch {
      setErrorText('Erro ao conectar aos servidores do ViaCEP.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { lookupCep(); }, []);

  return (
    <div className="space-y-6" id="prog-cep">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Consulta Nacional de CEP Correios</h2>
      
      <div className="flex gap-2">
        <input
          type="text"
          className="w-full md:w-1/3 border dark:border-slate-700 rounded-lg p-2 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-mono text-center text-sm"
          placeholder="Digite o CEP (Ex: 01001-000)"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <button onClick={lookupCep} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold px-4 rounded hover:cursor-pointer">Procurar</button>
      </div>

      {loading && <div className="text-xs text-slate-400 font-mono animate-pulse">Sincronizando bancos de dados Postais...</div>}
      
      {errorText && <div className="p-3 bg-red-50 text-red-750 text-xs rounded border">{errorText}</div>}

      {address && (
        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-150 animate-fade-in font-mono text-xs text-slate-700 dark:text-slate-300 space-y-2">
          <div><span className="text-slate-400">Logradouro / Rua:</span> {address.logradouro || 'Sem número'}</div>
          <div><span className="text-slate-400">Bairro:</span> {address.bairro || 'Sem cadastro'}</div>
          <div><span className="text-slate-400">Cidade:</span> {address.localidade}</div>
          <div><span className="text-slate-400">Estado UF:</span> {address.uf}</div>
          <div><span className="text-slate-400">Código IBGE de Município:</span> {address.ibge}</div>
        </div>
      )}
    </div>
  );
}

// 5. CNAE CONSULTAR
function CnaeConsulta() {
  const [term, setTerm] = useState<string>('');
  
  const cnaeList = [
    { code: "6201-5/01", name: "Desenvolvimento de programas de computador sob encomenda", tax: "Anexo III ou V" },
    { code: "6202-3/00", name: "Desenvolvimento e licenciamento de programas de computador customizáveis", tax: "Anexo III ou V" },
    { code: "6203-1/00", name: "Desenvolvimento e licenciamento de programas de computador não-customizáveis", tax: "Anexo III" },
    { code: "6209-1/00", name: "Suporte técnico, manutenção e outros serviços em tecnologia da informação", tax: "Anexo III ou V" },
    { code: "6311-9/00", name: "Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet", tax: "Anexo III" },
    { code: "7311-4/00", name: "Agências de publicidade (inclui AdSense & Ads corporativos)", tax: "Anexo III" }
  ];

  const filtered = cnaeList.filter(c => c.name.toLowerCase().includes(term.toLowerCase()) || c.code.includes(term));

  return (
    <div className="space-y-6" id="prog-cnae">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Código CNAE Atividades Econômicas</h2>
      <input type="text" className="w-full md:w-1/2 border dark:border-slate-755 p-2 text-xs bg-slate-50 dark:bg-slate-800 dark:text-slate-100 rounded-lg" placeholder="Pesquise CNAE de TI ou Mídia (ex: publicidade, 6201)..." value={term} onChange={(e) => setTerm(e.target.value)} />
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px]">
            <tr>
              <th className="p-2">CNAE Subclasse</th>
              <th className="p-2">Descrição da Atividade</th>
              <th className="p-2">Tributação Simples</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((c, idx) => (
              <tr key={idx}>
                <td className="p-2 font-mono text-indigo-600">{c.code}</td>
                <td className="p-2 font-medium text-slate-750 dark:text-slate-350">{c.name}</td>
                <td className="p-2 font-mono text-emerald-600">{c.tax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 7. SALÁRIO MÍNIMO HISTÓRICO
function SalarioMinimoHistorico() {
  const salarios = [
    { ano: 1994, valor: 64.79 }, { ano: 1995, valor: 100.00 }, { ano: 1996, valor: 112.00 },
    { ano: 1997, valor: 120.00 }, { ano: 1998, valor: 130.00 }, { ano: 1999, valor: 136.00 },
    { ano: 2000, valor: 151.00 }, { ano: 2001, valor: 180.00 }, { ano: 2002, valor: 200.00 },
    { ano: 2003, valor: 240.00 }, { ano: 2004, valor: 260.00 }, { ano: 2005, valor: 300.00 },
    { ano: 2006, valor: 350.00 }, { ano: 2007, valor: 380.00 }, { ano: 2008, valor: 415.00 },
    { ano: 2009, valor: 465.00 }, { ano: 2010, valor: 510.00 }, { ano: 2011, valor: 545.00 },
    { ano: 2012, valor: 622.00 }, { ano: 2013, valor: 678.00 }, { ano: 2014, valor: 724.00 },
    { ano: 2015, valor: 788.00 }, { ano: 2016, valor: 880.00 }, { ano: 2017, valor: 937.00 },
    { ano: 2018, valor: 954.00 }, { ano: 2019, valor: 998.00 }, { ano: 2020, valor: 1045.00 },
    { ano: 2021, valor: 1100.00 }, { ano: 2022, valor: 1212.00 }, { ano: 2023, valor: 1320.00 },
    { ano: 2024, valor: 1412.00 }, { ano: 2025, valor: 1518.00 }, { ano: 2026, valor: 1620.00 },
  ];
  const variacao = (atual: number, anterior: number) => ((atual - anterior) / anterior * 100).toFixed(1);

  return (
    <div className="space-y-6" id="prog-salario">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Salário Mínimo Histórico (1994-2026)</h2>
      <p className="text-xs text-slate-500">Tabela completa com todos os valores do salário mínimo brasileiro desde o Plano Real até os dias atuais.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px]">
            <tr><th className="p-2">Ano</th><th className="p-2">Valor (R$)</th><th className="p-2">Variação</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {salarios.map((s, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="p-2 font-bold font-mono">{s.ano}</td>
                <td className="p-2 font-mono text-emerald-600">R$ {s.valor.toFixed(2)}</td>
                <td className={`p-2 font-mono ${i > 0 ? 'text-amber-600' : 'text-slate-400'}`}>{i > 0 ? `+${variacao(s.valor, salarios[i-1].valor)}%` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 8. FERIADOS NACIONAIS
function FeriadosNacionais() {
  const feriados = [
    { data: '01/01', nome: 'Confraternização Universal (Ano Novo)' },
    { data: 'Fev/Mar', nome: 'Carnaval (2 dias - data móvel)' },
    { data: 'Mar/Abr', nome: 'Sexta-Feira Santa (Paixão de Cristo)' },
    { data: '21/04', nome: 'Tiradentes' },
    { data: '01/05', nome: 'Dia do Trabalho' },
    { data: 'Maio/Jun', nome: 'Corpus Christi' },
    { data: '07/09', nome: 'Independência do Brasil' },
    { data: '12/10', nome: 'Nossa Senhora Aparecida (Padroeira do Brasil)' },
    { data: '02/11', nome: 'Finados' },
    { data: '15/11', nome: 'Proclamação da República' },
    { data: '20/11', nome: 'Dia da Consciência Negra (Lei 14.759/2023)' },
    { data: '25/12', nome: 'Natal' },
  ];

  return (
    <div className="space-y-6" id="prog-feriados">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Feriados Nacionais do Brasil 2026</h2>
      <p className="text-xs text-slate-500">Calendário completo de feriados nacionais, pontos facultativos e datas comemorativas oficiais.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px]">
            <tr><th className="p-2">Data</th><th className="p-2">Feriado</th><th className="p-2">Tipo</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {feriados.map((f, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="p-2 font-mono font-bold">{f.data}</td>
                <td className="p-2 font-medium">{f.nome}</td>
                <td className="p-2"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[10px]">Nacional</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 9. TAXA SELIC HISTÓRICA
function SelicHistorica() {
  const selicData = [
    { ano: '1996', taxa: '27.41%' }, { ano: '1997', taxa: '24.79%' }, { ano: '1998', taxa: '28.86%' },
    { ano: '1999', taxa: '25.59%' }, { ano: '2000', taxa: '17.44%' }, { ano: '2001', taxa: '17.32%' },
    { ano: '2002', taxa: '19.15%' }, { ano: '2003', taxa: '23.33%' }, { ano: '2004', taxa: '15.76%' },
    { ano: '2005', taxa: '19.05%' }, { ano: '2006', taxa: '15.08%' }, { ano: '2007', taxa: '11.18%' },
    { ano: '2008', taxa: '12.43%' }, { ano: '2009', taxa: '9.88%' }, { ano: '2010', taxa: '9.76%' },
    { ano: '2011', taxa: '11.58%' }, { ano: '2012', taxa: '8.49%' }, { ano: '2013', taxa: '8.19%' },
    { ano: '2014', taxa: '10.88%' }, { ano: '2015', taxa: '13.29%' }, { ano: '2016', taxa: '14.02%' },
    { ano: '2017', taxa: '9.93%' }, { ano: '2018', taxa: '6.53%' }, { ano: '2019', taxa: '5.90%' },
    { ano: '2020', taxa: '3.36%' }, { ano: '2021', taxa: '5.53%' }, { ano: '2022', taxa: '12.23%' },
    { ano: '2023', taxa: '13.65%' }, { ano: '2024', taxa: '11.60%' }, { ano: '2025', taxa: '14.15%' },
    { ano: '2026', taxa: '14.25%' },
  ];

  return (
    <div className="space-y-6" id="prog-selic">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Taxa SELIC Histórica</h2>
      <p className="text-xs text-slate-500">Histórico completo da taxa básica de juros da economia brasileira desde 1996. Referência para investimentos em renda fixa.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px]">
            <tr><th className="p-2">Ano</th><th className="p-2">Taxa SELIC (% a.a.)</th><th className="p-2">Tendência</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {selicData.map((s, i) => {
              const isAlta = i > 0 && parseFloat(s.taxa) > parseFloat(selicData[i-1].taxa);
              return (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-2 font-bold font-mono">{s.ano}</td>
                  <td className="p-2 font-mono text-indigo-600">{s.taxa}</td>
                  <td className="p-2"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isAlta ? 'bg-amber-50 text-amber-700' : i > 0 ? 'bg-emerald-50 text-emerald-700' : 'text-slate-400'}`}>{i > 0 ? (isAlta ? '▲ Alta' : '▼ Queda') : '-'}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 10. CALENDÁRIO INSS
function CalendarioINSS() {
  const [finalBeneficio, setFinalBeneficio] = useState<number>(1);

  return (
    <div className="space-y-6" id="prog-inss">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Calendário de Pagamentos INSS 2026</h2>
      <p className="text-xs text-slate-500">Datas de depósito de aposentadorias, pensões e benefícios assistenciais organizadas pelo dígito final do benefício.</p>
      <div className="flex gap-4 flex-wrap">
        <div><label className="block text-xs font-semibold text-slate-500 mb-1">Final do Benefício (sem dígito)</label>
          <select className="border rounded p-2 text-sm dark:bg-slate-800" value={finalBeneficio} onChange={e => setFinalBeneficio(Number(e.target.value))}>
            {[1,2,3,4,5,6,7,8,9,0].map(n => <option key={n} value={n}>{n}</option>)}
          </select></div>
      </div>
      <div className={`p-4 rounded-xl border text-center ${finalBeneficio <= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100'}`}>
        <span className="block text-xs text-slate-500 mb-1">📅 Data prevista para depósito</span>
        <span className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
          {finalBeneficio === 0 ? '10/06/2026' : `${String(5 + Math.floor((finalBeneficio - 1) / 5)).padStart(2, '0')}/06/2026`}
        </span>
        <p className="text-[10px] text-slate-400 mt-1">Benefícios de {finalBeneficio <= 0 ? 'R$ 1.620,00 (mínimo)' : 'até R$ 8.092,00'}</p>
      </div>
    </div>
  );
}

// 11. CÓDIGOS NCM
function CodigosNCM() {
  const [term, setTerm] = useState<string>('');
  const ncmList = [
    { code: '8471.30.12', name: 'Computadores portáteis (laptops)', secao: 'Máquinas e Equipamentos' },
    { code: '8471.30.19', name: 'Tablets e dispositivos similares', secao: 'Máquinas e Equipamentos' },
    { code: '8517.12.00', name: 'Telefones celulares e smartphones', secao: 'Aparelhos de Telecomunicação' },
    { code: '8523.51.00', name: 'Memórias USB e cartões de memória', secao: 'Mídias de Armazenamento' },
    { code: '6204.62.00', name: 'Calças e bermudas de algodão', secao: 'Vestuário Têxtil' },
    { code: '6403.99.00', name: 'Calçados de couro', secao: 'Calçados e Acessórios' },
    { code: '2204.10.00', name: 'Vinhos espumantes', secao: 'Bebidas' },
    { code: '0901.11.10', name: 'Café não torrado em grãos', secao: 'Alimentos e Bebidas' },
    { code: '8703.22.10', name: 'Automóveis de passageiros', secao: 'Veículos' },
  ];
  const filtered = ncmList.filter(c => c.name.toLowerCase().includes(term.toLowerCase()) || c.code.includes(term));

  return (
    <div className="space-y-6" id="prog-ncm">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Códigos NCM - Nomenclatura Comum do Mercosul</h2>
      <input type="text" className="w-full md:w-1/2 border rounded-lg p-2 text-xs bg-slate-50 dark:bg-slate-800" placeholder="Pesquise por NCM ou produto..." value={term} onChange={e => setTerm(e.target.value)} />
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px]">
            <tr><th className="p-2">Código NCM</th><th className="p-2">Descrição</th><th className="p-2">Seção</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((c, i) => (
              <tr key={i}><td className="p-2 font-mono text-indigo-600">{c.code}</td><td className="p-2">{c.name}</td><td className="p-2 text-slate-400">{c.secao}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 12. CÓDIGOS IBGE
function CodigosIBGE() {
  const [term, setTerm] = useState<string>('');
  const ibgeList = [
    { code: '3550308', nome: 'São Paulo', uf: 'SP' }, { code: '3304557', nome: 'Rio de Janeiro', uf: 'RJ' },
    { code: '3106200', nome: 'Belo Horizonte', uf: 'MG' }, { code: '2927408', nome: 'Salvador', uf: 'BA' },
    { code: '5300108', nome: 'Brasília', uf: 'DF' }, { code: '2304400', nome: 'Fortaleza', uf: 'CE' },
    { code: '4106902', nome: 'Curitiba', uf: 'PR' }, { code: '4314902', nome: 'Porto Alegre', uf: 'RS' },
    { code: '1302603', nome: 'Manaus', uf: 'AM' }, { code: '2611606', nome: 'Recife', uf: 'PE' },
    { code: '5208707', nome: 'Goiânia', uf: 'GO' }, { code: '1501402', nome: 'Belém', uf: 'PA' },
    { code: '3518800', nome: 'Guarulhos', uf: 'SP' }, { code: '3509502', nome: 'Campinas', uf: 'SP' },
    { code: '2111300', nome: 'São Luís', uf: 'MA' }, { code: '2704302', nome: 'Maceió', uf: 'AL' },
  ];
  const filtered = ibgeList.filter(c => c.nome.toLowerCase().includes(term.toLowerCase()) || c.code.includes(term) || c.uf.toLowerCase().includes(term.toLowerCase()));

  return (
    <div className="space-y-6" id="prog-ibge">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Códigos IBGE de Municípios</h2>
      <input type="text" className="w-full md:w-1/2 border rounded-lg p-2 text-xs bg-slate-50 dark:bg-slate-800" placeholder="Pesquise por cidade, código IBGE ou UF..." value={term} onChange={e => setTerm(e.target.value)} />
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px]">
            <tr><th className="p-2">Código IBGE</th><th className="p-2">Município</th><th className="p-2">UF</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((c, i) => (
              <tr key={i}><td className="p-2 font-mono text-indigo-600">{c.code}</td><td className="p-2 font-medium">{c.nome}</td><td className="p-2 font-mono text-emerald-600">{c.uf}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 13. DDD POR ESTADO
function DddPorEstado({ uf, nome, ddds }: { uf: string; nome: string; ddds: string }) {
  return (
    <div className="space-y-6" id={`prog-ddd-${uf.toLowerCase()}`}>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">DDD {nome} - Códigos de {uf}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border">
          <span className="block text-xs text-slate-400 uppercase font-bold mb-2">Estado</span>
          <span className="text-lg font-bold">{nome} ({uf})</span>
        </div>
        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border">
          <span className="block text-xs text-slate-400 uppercase font-bold mb-2">DDDs Disponíveis</span>
          <div className="flex flex-wrap gap-2">
            {ddds.split(', ').map(d => (
              <span key={d} className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 px-3 py-1.5 rounded-lg font-mono font-bold text-sm">{d}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">Os códigos DDD de {nome} abrangem todas as regiões do estado, incluindo a capital e cidades do interior. Consulte a lista completa de DDDs de {uf} para ligações interestaduais.</p>
    </div>
  );
}

// 14. SALÁRIO MÍNIMO POR ANO
function SalarioMinimoPorAno({ year }: { year: string }) {
  const valores: {[key: string]: number} = {
    '1994': 64.79, '1995': 100, '1996': 112, '1997': 120, '1998': 130, '1999': 136,
    '2000': 151, '2001': 180, '2002': 200, '2003': 240, '2004': 260, '2005': 300,
    '2006': 350, '2007': 380, '2008': 415, '2009': 465, '2010': 510, '2011': 545,
    '2012': 622, '2013': 678, '2014': 724, '2015': 788, '2016': 880, '2017': 937,
    '2018': 954, '2019': 998, '2020': 1045, '2021': 1100, '2022': 1212, '2023': 1320,
    '2024': 1412, '2025': 1518, '2026': 1620
  };
  const valor = valores[year] || null;
  return (
    <div className="space-y-6" id={`prog-salario-${year}`}>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Salário Mínimo {year}</h2>
      {valor ? (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-6 rounded-xl border border-emerald-100 text-center">
          <span className="block text-xs text-slate-500 mb-1">Valor do Salário Mínimo em {year}</span>
          <span className="text-4xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">R$ {valor.toFixed(2)}</span>
        </div>
      ) : (
        <p className="text-xs text-slate-500">Ano não encontrado na base histórica. Consulte a página completa de histórico do salário mínimo.</p>
      )}
      <p className="text-xs text-slate-400">O salário mínimo é o menor valor que um empregador pode pagar legalmente a um trabalhador no Brasil. Seu reajuste anual considera a inflação e o crescimento do PIB.</p>
    </div>
  );
}

// 15. SELIC POR ANO
function SelicPorAno() {
  return (
    <div className="space-y-6" id="prog-selic-ano">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Taxa SELIC - Acompanhamento</h2>
      <p className="text-xs text-slate-500">A taxa SELIC é a taxa básica de juros da economia brasileira. Consulte a página completa de <a href="#programatico/selic-historica" className="text-emerald-600 font-bold hover:underline">histórico da SELIC</a> para dados completos desde 1996.</p>
      <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100">
        <p className="text-xs">A taxa SELIC atual é definida pelo COPOM (Comitê de Política Monetária) e influencia diretamente os rendimentos da poupança, CDBs, fundos de investimento e o custo do crédito.</p>
      </div>
    </div>
  );
}

// 16. IBGE POR ESTADO
function IbgePorEstado() {
  return (
    <div className="space-y-6" id="prog-ibge-estado">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Códigos IBGE por Estado</h2>
      <p className="text-xs text-slate-500">Os códigos IBGE identificam cada município brasileiro com 7 dígitos. Consulte a página completa de <a href="#programatico/codigos-ibge" className="text-emerald-600 font-bold hover:underline">todos os códigos IBGE</a> para a lista completa por estado e município.</p>
      <div className="bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 text-xs space-y-2">
        <p><strong>O que é o código IBGE?</strong> O Instituto Brasileiro de Geografia e Estatística (IBGE) atribui um código numérico de 7 dígitos para cada município brasileiro. Este código é usado em pesquisas, documentos oficiais e sistemas governamentais.</p>
        <p>Os 2 primeiros dígitos identificam a Unidade Federativa (UF), e os 5 restantes identificam o município dentro do estado.</p>
      </div>
    </div>
  );
}

// 17. PREVISÃO DO TEMPO
function PrevisaoTempo() {
  return (
    <div className="space-y-6" id="prog-tempo">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Previsão do Tempo</h2>
      <div className="bg-amber-50/50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-100 text-xs">
        <p>A previsão do tempo é atualizada diariamente com base nos dados meteorológicos oficiais. Consulte sites especializados como INMET e Climatempo para a previsão completa e atualizada.</p>
      </div>
    </div>
  );
}

// 18. PÁGINA DE FERRAMENTA LONG TAIL
function PaginaFerramentaLongTail({ id }: { id: string }) {
  const nomes: {[key: string]: {titulo: string, desc: string}} = {
    'simular-aposentadoria-por-idade': { titulo: 'Simular Aposentadoria por Idade INSS', desc: 'Simule sua aposentadoria por idade no INSS. Calcule quando você poderá se aposentar e o valor do benefício.' },
    'calcular-13o-salario': { titulo: 'Calcular 13º Salário', desc: 'Calcule seu décimo terceiro salário proporcional aos meses trabalhados no ano.' },
    'calcular-rescisao-trabalhista': { titulo: 'Calcular Rescisão Trabalhista', desc: 'Simule os valores da sua rescisão de contrato CLT: saldo de salário, férias, 13º e FGTS.' },
    'simular-financiamento-casa-propria': { titulo: 'Simular Financiamento Imobiliário', desc: 'Simule o financiamento da casa própria comparando os sistemas SAC e Price.' },
    'consultar-cep-correios': { titulo: 'Consultar CEP Correios', desc: 'Consulte CEP de qualquer endereço do Brasil utilizando a base dos Correios.' },
    'consultar-ddd-telefone': { titulo: 'Consultar DDD Telefônico', desc: 'Consulte o DDD de qualquer estado ou cidade brasileira para chamadas interestaduais.' },
    'gerar-senha-forte': { titulo: 'Gerar Senha Forte', desc: 'Gere senhas fortes e seguras para proteger suas contas online.' },
    'gerar-cpf-valido': { titulo: 'Gerar CPF Válido', desc: 'Gere CPF válido para testes de sistemas. Inclui dígitos verificadores.' },
    'gerar-cnpj-valido': { titulo: 'Gerar CNPJ Válido', desc: 'Gere CNPJ válidos para testes corporativos e desenvolvimento de sistemas.' },
    'gerar-qr-code-pix': { titulo: 'Gerar QR Code PIX', desc: 'Crie QR Codes para pagamentos instantâneos PIX.' },
    'calcular-imc-gratis': { titulo: 'Calcular IMC Grátis', desc: 'Calcule seu Índice de Massa Corporal e veja a classificação OMS.' },
    'calcular-juros-compostos-mensais': { titulo: 'Calcular Juros Compostos', desc: 'Simule investimentos com juros compostos e aportes mensais.' },
    'calcular-porcentagem-online': { titulo: 'Calcular Porcentagem', desc: 'Calcule porcentagem de valores, descontos e aumentos online.' },
    'calcular-inss-salario': { titulo: 'Calcular INSS', desc: 'Calcule o desconto do INSS sobre seu salário com as alíquotas progressivas.' },
  };
  const info = nomes[id] || { titulo: 'Ferramenta', desc: 'Use nossas ferramentas gratuitas online.' };
  return (
    <div className="space-y-6" id={`prog-longtail-${id}`}>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">{info.titulo}</h2>
      <p className="text-xs text-slate-500">{info.desc}</p>
      <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 text-xs space-y-3">
        <p>Esta ferramenta está disponível na nossa <a href="/" className="text-emerald-600 font-bold hover:underline">central de ferramentas</a>. Acesse a página principal e encontre a ferramenta desejada na categoria correspondente.</p>
        <div className="flex gap-2 pt-2">
          <a href="#calculadoras" className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold hover:opacity-90">Ver Calculadoras</a>
          <a href="#conversores" className="px-3 py-1.5 bg-indigo-600 text-white rounded text-xs font-bold hover:opacity-90">Ver Conversores</a>
          <a href="#" className="px-3 py-1.5 bg-slate-600 text-white rounded text-xs font-bold hover:opacity-90">Página Inicial</a>
        </div>
      </div>
    </div>
  );
}

// 6. CBO CONSULTAR
function CboConsulta() {
  const [term, setTerm] = useState<string>('');
  
  const cboList = [
    { code: "2124-05", title: "Analista de sistemas de computador", category: "Profissionais de Tecnologia" },
    { code: "2124-20", title: "Engenheiro de softwares e redes lógicas", category: "Profissionais de Tecnologia" },
    { code: "3171-10", title: "Programador de sistemas de informação", category: "Profissionais Técnicos" },
    { code: "2525-45", title: "Analista de SEO e marketing digital de portais", category: "Profissionais de Negócios" },
    { code: "2124-10", title: "Administrador de bancos de dados relacionamento (DBA)", category: "Profissionais de Tecnologia" }
  ];

  const filtered = cboList.filter(c => c.title.toLowerCase().includes(term.toLowerCase()) || c.code.includes(term));

  return (
    <div className="space-y-6" id="prog-cbo">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Classificação CBO Ocupações de Trabalho</h2>
      <input type="text" className="w-full md:w-1/2 border p-2 text-xs bg-slate-50 dark:bg-slate-800 dark:text-slate-100 rounded-lg" placeholder="Pesquise cargos CLT (ex: Programador, SEO, 2124)..." value={term} onChange={(e) => setTerm(e.target.value)} />
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 dark:bg-slate-850 uppercase text-[10px]">
            <tr>
              <th className="p-2">CBO Registro</th>
              <th className="p-2">Cargo / Ocupação CLT</th>
              <th className="p-2">Domínio Operacional</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((c, idx) => (
              <tr key={idx}>
                <td className="p-2 font-mono text-indigo-600">{c.code}</td>
                <td className="p-2 font-medium text-slate-850 dark:text-slate-350">{c.title}</td>
                <td className="p-2 text-slate-400">{c.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
