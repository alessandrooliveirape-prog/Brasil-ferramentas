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

      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          Os códigos DDD (Discagem Direta à Distância) são uma criação da ANATEL que organiza as chamadas telefônicas intermunicipais e interestaduais em todo o Brasil. Cada DDD de 2 dígitos cobre uma ou mais cidades, facilitando a identificação geográfica do número chamador ou de destino.
        </p>
        <p>
          <strong>Como surgiram os DDDs:</strong> O sistema foi implantado no Brasil na década de 1960 pela Embratel e expandido com a privatização do setor de telecomunicações em 1998. Atualmente, existem cerca de 70 códigos DDD ativos em todo o território nacional, desde o 11 (São Paulo) até o 99 (Imperatriz/MA).
        </p>
        <p>
          <strong>Formato telefônico atual:</strong> Desde 2012, os telefones celulares em todas as regiões metropolitanas com DDDs que começam com dígitos 11-19, 21-28, 31-38, 41-49, 51-55, 61-69, 71-77, 79, 81-89 e 91-99 passaram a ter 9 dígitos (formato (XX) 9XXXX-XXXX). Os fixos permanecem com 8 dígitos, exceto em algumas localidades com 7.
        </p>
        <p>
          Consulte abaixo o DDD desejado para ver o estado correspondente, principais cidades atendidas e o formato telefônico recomendado.
        </p>
      </div>

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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Bancos do Brasil - Códigos COMPE e ISPB</h2>
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          A tabela abaixo apresenta os principais bancos brasileiros com seus respectivos códigos de compensação bancária (COMPE) números ISPB (Identificador de Sistema de Pagamentos Brasileiro). Esses códigos são essenciais para transferências eletrônicas, boletos bancários, TEDs, DOCs e cadastramento de contas bancárias em sistemas corporativos.
        </p>
        <p>
          <strong>Código COMPE:</strong> Criado pelo Banco Central do Brasil, o código COMPE identifica exclusivamente cada instituição financeira no Sistema de Pagamentos Brasileiro. É um número de 3 dígitos usado em boletos, DOC/TED e identificação de contas bancárias. Exemplos: 001 (Banco do Brasil), 341 (Itaú), 237 (Bradesco).
        </p>
        <p>
          <strong>ISPB:</strong> O Identificador de Sistema de Pagamentos Brasileiro é um número de 8 dígitos que identifica de forma única cada participante do SPB (Sistema de Pagamentos Brasileiro). Este número é utilizado principalmente em transações PIX, TED e transferências interbancárias eletrônicas.
        </p>
      </div>
      
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Consulta Nacional de CEP Correios Online</h2>
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          O CEP (Código de Endereçamento Postal) é um sistema de código numérico criado pela Empresa Brasileira de Correios e Telégrafos para organizar e facilitar a entrega de correspondências e encomendas em todo o país. Cada CEP de 8 dígitos identifica áreas geográficas progressivamente menores: região, estado, município, bairro, logradouro e lado da rua.
        </p>
        <p>
          <strong>Estrutura do CEP:</strong> O formato atual é XXXXX-XXX. Os primeiros 5 dígitos identificam a região, e os 3 últimos o bairro ou logradouro específico. CEPs terminados em 000 geralmente indicam a agência central de uma cidade, enquanto CEPs específicos (por logradouro) são usados para ruas e avenidas de grande volume postal.
        </p>
        <p>
          <strong>Faixas de CEP por estado:</strong> Os CEPs são distribuídos por região: Sudeste (01000-19999), Sul (80000-99999), Nordeste (40000-65999), Norte (66000-69999) e Centro-Oeste (70000-79999). Cada estado tem faixas específicas dentro desses intervalos.
        </p>
        <p>
          Digite o CEP abaixo para consultar o endereço completo via API oficial do ViaCEP, o mesmo sistema utilizado pelos Correios.
        </p>
      </div>
      
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Código CNAE - Classificação Nacional de Atividades Econômicas</h2>
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          O CNAE (Classificação Nacional de Atividades Econômicas) é o sistema oficial de classificação de atividades econômicas utilizado no Brasil. Criado pelo IBGE, é obrigatório para todos os cadastros fiscais e empresariais do país, incluindo CNPJ na Receita Federal, inscrição estadual e municipal.
        </p>
        <p>
          <strong>Estrutura do CNAE:</strong> São 7 dígitos no formato XXXX-X/XX, organizados em: Seção (letra de A a U), Divisão (2 primeiros dígitos), Grupo (3º dígito), Classe (4º a 6º dígitos) e Subclasse (7º dígito). A subclasse de 7 dígitos é o nível mais detalhado e o utilizado para registro de empresas.
        </p>
        <p>
          <strong>Importância para empresas:</strong> O CNAE determina a tributação aplicável (Simples Nacional: Anexos I a V, Lucro Presumido ou Real), alíquotas de ISS e ICMS, obrigações acessórias, classificação de risco para vigilância sanitária, e enquadramento sindical patronal.
        </p>
        <p>
          Confira abaixo exemplos de códigos CNAE na área de tecnologia e serviços, com sua descrição e tributação no Simples Nacional.
        </p>
      </div>
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
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          Acompanhe a evolução do salário mínimo brasileiro desde o Plano Real (1994) até os dias atuais. O salário mínimo é o menor valor que um empregador pode pagar legalmente a um trabalhador no Brasil, conforme definido pela Lei Complementar nº 103/2000 e atualizado anualmente por decreto presidencial.
        </p>
        <p>
          <strong>Política de valorização:</strong> Até 2019, o reajuste do salário mínimo seguia a fórmula do INPC (inflação) + variação do PIB de dois anos anteriores. A partir de 2020, o governo passou a definir os reajustes por decreto anual, considerando a inflação e o limite fiscal do orçamento federal.
        </p>
        <p>
          <strong>Impacto econômico:</strong> O salário mínimo serve como referência para benefícios previdenciários (aposentadorias, pensões, auxílio-doença), seguro-desemprego, abono salarial (PIS/PASEP) e benefício de prestação continuada (BPC/LOAS). Cerca de 50 milhões de brasileiros têm sua renda atrelada ao piso nacional.
        </p>
        <p>
          <strong>Poder de compra:</strong> Em 1994, com o Plano Real, o salário mínimo era de R$ 64,79. Em 2025, alcançou R$ 1.518,00 um aumento nominal de mais de 2.200%, embora o poder de compra real tenha crescido aproximadamente 150% no mesmo período, considerando a inflação acumulada.
        </p>
        <p>
          Veja na tabela abaixo todos os valores do salário mínimo desde 1994, com a variação percentual anual.
        </p>
      </div>
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
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          O Brasil possui 12 feriados nacionais oficiais, além de feriados estaduais e municipais que variam conforme a localidade. Os feriados nacionais foram definidos pela Lei nº 10.607/2002 e alterações posteriores. Em 2023, o Dia da Consciência Negra (20 de novembro) foi incluído como feriado nacional pela Lei 14.759/2023.
        </p>
        <p>
          <strong>Feriados religiosos móveis:</strong> O Carnaval, a Sexta-Feira Santa (Paixão de Cristo) e Corpus Christi são feriados móveis, cujas datas variam anualmente de acordo com o calendário litúrgico da Igreja Católica. O Carnaval é ponto facultativo na segunda e terça-feira, enquanto a Quarta-Feira de Cinzas é ponto facultativo até as 14h.
        </p>
        <p>
          <strong>Pontos facultativos:</strong> Além dos feriados nacionais, existem pontos facultativos como o Carnaval (segunda e terça), a Quarta-Feira de Cinzas (até 14h), a Véspera de Natal (24 de dezembro após 14h) e a Véspera de Ano Novo (31 de dezembro após 14h). Nestas datas, o funcionamento de órgãos públicos é opcional.
        </p>
        <p>
          Confira abaixo todos os feriados nacionais obrigatórios para 2026, com suas respectivas datas e tipos.
        </p>
      </div>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Taxa SELIC Histórica (1996-2026)</h2>
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          A taxa SELIC (Sistema Especial de Liquidação e Custódia) é a taxa básica de juros da economia brasileira, definida pelo Copom (Comitê de Política Monetária) do Banco Central. Ela é o principal instrumento de política monetária para controlar a inflação e influencia todas as demais taxas de juros do país.
        </p>
        <p>
          <strong>Como a SELIC influencia seus investimentos:</strong> A SELIC impacta diretamente os rendimentos da poupança (que rende 70% da SELIC + TR quando a SELIC está acima de 8,5% ao ano), CDBs, fundos de renda fixa, títulos do Tesouro Direto (Tesouro SELIC) e o custo do crédito para pessoas físicas e jurídicas.
        </p>
        <p>
          <strong>Momentos históricos marcantes:</strong> A SELIC atingiu seu pico máximo em 1998 (28,86% a.a.) durante a crise cambial. A menor taxa registrada foi em 2020 (3,36% a.a.) durante a pandemia, quando o Copom reduziu os juros para estimular a economia. Em 2025/2026, a SELIC voltou a subir para conter a inflação, atingindo cerca de 14,25% a.a.
        </p>
        <p>
          Veja abaixo o histórico completo da taxa SELIC desde 1996, com indicação de alta ou queda em relação ao ano anterior.
        </p>
      </div>
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
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          O INSS (Instituto Nacional do Seguro Social) organiza o pagamento de aposentadorias, pensões por morte, auxílios (doença, acidente, reclusão), salário-maternidade e Benefício de Prestação Continuada (BPC/LOAS) de acordo com o número final do benefício, sem considerar o dígito verificador.
        </p>
        <p>
          <strong>Calendário de pagamento:</strong> Os pagamentos são realizados nos últimos 10 dias úteis do mês (para benefícios de até 1 salário mínimo) ou nos 10 primeiros dias úteis do mês seguinte (para benefícios acima de 1 salário mínimo). O dígito final do benefício determina o dia exato do depósito.
        </p>
        <p>
          <strong>Consulta de pagamento:</strong> Para consultar seu calendário individual de pagamentos, utilize o aplicativo MEU INSS (disponível para Android e iOS), o site gov.br/meuinss ou ligue para a Central 135. Tenha em mãos seu CPF e o número do benefício.
        </p>
        <p>
          Selecione abaixo o dígito final do seu benefício para ver a data prevista de depósito no mês corrente.
        </p>
      </div>
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
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          A NCM (Nomenclatura Comum do Mercosul) é um sistema de classificação de mercadorias adotado por todos os países do Mercosul (Brasil, Argentina, Paraguai e Uruguai). Baseada no SH (Sistema Harmonizado de Designação e Codificação de Mercadorias) da Organização Mundial de Aduanas (OMA), a NCM é composta por 8 dígitos: os 6 primeiros são do SH e os 2 últimos especificam o desdobramento regional.
        </p>
        <p>
          <strong>Importância do código NCM:</strong> O código NCM é obrigatório em operações de comércio exterior (importação e exportação), emissão de Nota Fiscal Eletrônica (NF-e), Declaração Única de Importação (DUIMP) e demais documentos fiscais. Ele determina o tratamento tributário aplicável, alíquotas de impostos (II, IPI, PIS, COFINS) e eventuais restrições ou benefícios fiscais.
        </p>
        <p>
          <strong>Estrutura do NCM:</strong> Seção (I a XXI) - Capítulo (2 dígitos) - Posição (4 dígitos) - Subposição (6 dígitos SH) - Item NCM (8 dígitos). Por exemplo: 8471.30.12 (computadores portáteis) - Seção XVI, Capítulo 84, Posição 8471.
        </p>
        <p>
          Consulte abaixo alguns dos principais códigos NCM utilizados no Brasil para importação e faturamento eletrônico.
        </p>
      </div>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Códigos IBGE de Municípios Brasileiros</h2>
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          Os códigos IBGE (Instituto Brasileiro de Geografia e Estatística) são identificadores numéricos únicos de 7 dígitos atribuídos a cada município brasileiro. Estes códigos são amplamente utilizados em sistemas governamentais, pesquisas censitárias, cadastros fiscais e bases de dados corporativas.
        </p>
        <p>
          <strong>Estrutura do código IBGE de município:</strong> Código de 7 dígitos no formato X XXXXXX. Os 2 primeiros dígitos identificam a Unidade Federativa (UF), seguindo a mesma ordem alfabética dos estados (11 = Rondônia, 12 = Acre, ..., 53 = Distrito Federal). Os 5 dígitos restantes identificam o município dentro do estado.
        </p>
        <p>
          <strong>Para que servem:</strong> Os códigos IBGE são usados no Censo Demográfico (realizado a cada 10 anos), Pesquisa Nacional por Amostra de Domicílios (PNAD Contínua), cadastros do SUS, sistemas de ensino (Censo Escolar/INEP), nota fiscal eletrônica (código do município do destinatário) e registros civis (Cartórios).
        </p>
        <p>
          Consulte abaixo os códigos IBGE dos principais municípios brasileiros por capital e grandes cidades.
        </p>
      </div>
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
      <div className="text-xs text-slate-500 space-y-2">
        <p>Os códigos DDD de {nome} abrangem todas as regiões do estado, incluindo a capital e cidades do interior. Consulte a lista completa de DDDs de {uf} para ligações interestaduais e intermunicipais.</p>
        <p>Para ligar de outro estado para {nome}, disque: 0 + operadora + DDD desejado + número do telefone. Para chamadas dentro do mesmo estado, basta discar diretamente o número (com o DDD para celulares ou sem o DDD para fixos locais).</p>
        <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-lg border mt-2">
          <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">Áreas de cobertura dos DDDs de {uf}:</p>
          <p>Os DDDs {ddds} cobrem todas as macrorregiões do estado de {nome}, desde a capital até as cidades do interior, garantindo conectividade telefônica em todo o território estadual.</p>
        </div>
      </div>
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
      <div className="text-xs text-slate-400 space-y-2">
        <p>O salário mínimo é o menor valor que um empregador pode pagar legalmente a um trabalhador no Brasil, conforme definido pela Constituição Federal. Seu reajuste anual considera a inflação acumulada (INPC) e, quando possível, o crescimento do PIB de dois anos anteriores.</p>
        <p>
          <strong>O que o salário mínimo influencia:</strong> Aposentadorias e pensões do INSS, seguro-desemprego, abono salarial PIS/PASEP, BPC (Benefício de Prestação Continuada), contribuição do Microempreendedor Individual (MEI), e reajustes de aluguéis e mensalidades escolares indexadas ao piso nacional.
        </p>
        <p>
          Consulte o histórico completo na página de <a href="#programatico/salario-minimo-historico" className="text-emerald-600 font-bold hover:underline">Salário Mínimo Histórico</a> com todos os valores desde 1994.
        </p>
      </div>
    </div>
  );
}

// 15. SELIC POR ANO
function SelicPorAno() {
  return (
    <div className="space-y-6" id="prog-selic-ano">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Taxa SELIC - Acompanhamento</h2>
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>A taxa SELIC é a taxa básica de juros da economia brasileira, definida pelo COPOM (Comitê de Política Monetária) do Banco Central. Consulte a página completa de <a href="#programatico/selic-historica" className="text-emerald-600 font-bold hover:underline">histórico da SELIC</a> para dados completos desde 1996.</p>
        <p>
          <strong>Reuniões do COPOM:</strong> O comitê se reúne a cada 45 dias (8 reuniões ordinárias por ano) para definir a meta da taxa SELIC. A decisão é tomada por votação e busca equilibrar o controle da inflação com o estímulo ao crescimento econômico. O resultado de cada reunião é divulgado em comunicado oficial e impacta imediatamente os mercados financeiros.
        </p>
        <p>
          <strong>Impactos da SELIC no seu bolso:</strong> Quando a SELIC sobe, o crédito fica mais caro (juros de cartão, financiamentos, cheque especial), os investimentos em renda fixa rendem mais (CDB, Tesouro Direto, fundos DI), e a inflação tende a ceder. Quando a SELIC cai, o crédito fica mais barato, mas os rendimentos da renda fixa diminuem, estimulando investimentos em risco (renda variável) e consumo.
        </p>
      </div>
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
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>Os códigos IBGE identificam cada município brasileiro com 7 dígitos. Consulte a página completa de <a href="#programatico/codigos-ibge" className="text-emerald-600 font-bold hover:underline">todos os códigos IBGE</a> para a lista completa por estado e município.</p>
        <p>O código IBGE de município é composto por 7 dígitos, onde os 2 primeiros identificam a Unidade Federativa e os 5 restantes o município dentro do estado. Este código é amplamente utilizado em pesquisas do IBGE (Censo, PNAD, Contas Regionais), sistemas do SUS (Cadastro Nacional de Estabelecimentos de Saúde), INEP (Censo Escolar), TSE (título de eleitor) e cadastros fiscais (NF-e e SPED).</p>
        <p><strong>Códigos das UFs brasileiras:</strong> 11 Rondônia, 12 Acre, 13 Amazonas, 14 Roraima, 15 Pará, 16 Amapá, 17 Tocantins, 21 Maranhão, 22 Piauí, 23 Ceará, 24 Rio Grande do Norte, 25 Paraíba, 26 Pernambuco, 27 Alagoas, 28 Sergipe, 29 Bahia, 31 Minas Gerais, 32 Espírito Santo, 33 Rio de Janeiro, 35 São Paulo, 41 Paraná, 42 Santa Catarina, 43 Rio Grande do Sul, 50 Mato Grosso do Sul, 51 Mato Grosso, 52 Goiás, 53 Distrito Federal.</p>
      </div>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">Previsão do Tempo nas Capitais Brasileiras</h2>
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          O Brasil possui uma grande diversidade climática devido à sua extensão territorial e localização geográfica. O país abrange seis tipos climáticos principais: equatorial úmido (Amazônia), tropical (Centro-Oeste e parte do Sudeste), tropical semiárido (Nordeste), tropical altitude (regiões serranas do Sudeste), tropical atlântico (litoral) e subtropical (Sul).
        </p>
        <p>
          <strong>Clima nas capitais:</strong> São Paulo e Curitiba têm clima subtropical com inverno frio e úmido. Rio de Janeiro, Salvador e Recife têm clima tropical atlântico com verão quente e chuvoso. Brasília e Belo Horizonte têm clima tropical de altitude com estação seca bem definida. Manaus e Belém têm clima equatorial úmido com chuvas o ano todo. Fortaleza e Natal têm clima tropical com sol praticamente o ano inteiro.
        </p>
        <p>
          <strong>Temperaturas médias:</strong> No inverno (junho a agosto), as médias variam de 12°C em Curitiba a 26°C em Fortaleza. No verão (dezembro a fevereiro), as médias variam de 24°C em São Paulo a 32°C em Manaus e Rio de Janeiro.
        </p>
      </div>
      <div className="bg-amber-50/50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-100 text-xs space-y-2">
        <p className="font-bold">Índice de páginas de previsão por capital:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li><a href="#programatico/tempo-sao-paulo" className="text-emerald-600 hover:underline">São Paulo (SP)</a></li>
          <li><a href="#programatico/tempo-rio-de-janeiro" className="text-emerald-600 hover:underline">Rio de Janeiro (RJ)</a></li>
          <li><a href="#programatico/tempo-belo-horizonte" className="text-emerald-600 hover:underline">Belo Horizonte (MG)</a></li>
          <li><a href="#programatico/tempo-salvador" className="text-emerald-600 hover:underline">Salvador (BA)</a></li>
          <li><a href="#programatico/tempo-brasilia" className="text-emerald-600 hover:underline">Brasília (DF)</a></li>
          <li><a href="#programatico/tempo-fortaleza" className="text-emerald-600 hover:underline">Fortaleza (CE)</a></li>
        </ul>
        <p className="mt-2">Para previsão detalhada e atualizada em tempo real, consulte o INMET (Instituto Nacional de Meteorologia) ou aplicativos especializados como Climatempo e AccuWeather.</p>
      </div>
    </div>
  );
}

// 18. PÁGINA DE FERRAMENTA LONG TAIL
function PaginaFerramentaLongTail({ id }: { id: string }) {
  const paginas: {[key: string]: {titulo: string, conteudo: React.ReactNode}} = {
    'simular-aposentadoria-por-idade': {
      titulo: 'Simular Aposentadoria por Idade INSS 2026',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            Simular a aposentadoria por idade pelo INSS é o primeiro passo para planejar seu futuro financeiro. A aposentadoria por idade é um dos benefícios mais solicitados do RGPS (Regime Geral de Previdência Social) e passou por mudanças significativas com a Reforma da Previdência de 2019.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Regras atuais (pós-reforma):</strong> Para se aposentar por idade, a mulher precisa ter no mínimo 62 anos e o homem 65 anos, com pelo menos 15 anos de contribuição para ambos os sexos. Para quem já contribuía antes da reforma, existem regras de transição que podem ser mais benéficas.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Regras de transição:</strong> São várias opções: sistema de pontos (soma da idade + tempo de contribuição), idade mínima progressiva, pedágio 50% e pedágio 100%. Cada uma se aplica a perfis diferentes de segurados, dependendo de quando começaram a contribuir e do tempo restante para se aposentar.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Valor do benefício:</strong> O valor da aposentadoria por idade é calculado com base na média de todos os salários de contribuição desde julho de 1994, multiplicada pelo fator previdenciário (quando aplicável). A reforma mudou o cálculo para 60% da média + 2% para cada ano que exceder 20 anos de contribuição para homens e 15 para mulheres.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Para simular sua aposentadoria com precisão, utilize nossa <a href="#calculadoras/calculadora-de-aposentadoria-inss" className="text-emerald-600 font-bold hover:underline">Calculadora de Aposentadoria INSS</a> completa, que considera todas as regras de transição e calcula o valor estimado do benefício.
          </p>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 text-xs space-y-2 mt-4">
            <p className="font-bold text-emerald-800 dark:text-emerald-400">Índice</p>
            <ul className="list-disc pl-4 text-slate-500 space-y-1">
              <li>Quem tem direito à aposentadoria por idade?</li>
              <li>Qual a idade mínima para se aposentar?</li>
              <li>Como funciona o pedágio 50% e 100%?</li>
              <li>Qual o valor do benefício em 2026?</li>
              <li>Documentos necessários para solicitar</li>
            </ul>
          </div>
        </>
      )
    },
    'calcular-13o-salario': {
      titulo: 'Calcular 13º Salário Proporcional 2026',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            O décimo terceiro salário, também conhecido como gratificação natalina, é um direito garantido a todos os trabalhadores brasileiros com carteira assinada (CLT), servidores públicos, aposentados e pensionistas do INSS. Instituído pela Lei 4.090/1962, o benefício corresponde a 1/12 avos da remuneração devida em dezembro, por mês trabalhado no ano.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Como é calculado:</strong> O valor do 13º salário é proporcional aos meses trabalhados durante o ano. Cada mês trabalhado por pelo menos 15 dias dá direito a 1/12 do salário. O cálculo é: (salário bruto ÷ 12) x meses trabalhados.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Parcelas:</strong> O 13º é pago em duas parcelas. A primeira parcela, paga entre fevereiro e novembro, corresponde à metade do salário bruto sem descontos. A segunda parcela, paga até 20 de dezembro, inclui todos os descontos legais como INSS, Imposto de Renda (IRRF) e pensão alimentícia, se houver.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Descontos:</strong> O desconto do INSS no 13º segue a tabela progressiva vigente, calculado sobre o valor total do benefício. O IRRF também é calculado sobre o valor total, considerando dependentes e outras deduções legais.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Utilize nossa <a href="#calculadoras/calculadora-de-decimo-terceiro" className="text-emerald-600 font-bold hover:underline">Calculadora de 13º Salário</a> para simular as duas parcelas com todos os descontos aplicados corretamente.
          </p>
        </>
      )
    },
    'calcular-rescisao-trabalhista': {
      titulo: 'Calcular Rescisão Trabalhista CLT - Simulação Completa',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            A rescisão trabalhista é o conjunto de verbas devidas ao empregado quando o contrato de trabalho é encerrado. O cálculo varia conforme o tipo de demissão: sem justa causa, com justa causa, pedido de demissão ou acordo mútuo (Lei 13.467/2017 - Reforma Trabalhista).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Verbas rescisórias comuns:</strong> Saldo de salário (dias trabalhados no mês da demissão), aviso prévio (indenizado ou trabalhado), férias vencidas e proporcionais com 1/3 constitucional, 13º salário proporcional, multa de 40% sobre o FGTS (demissão sem justa causa) e saque do FGTS.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Demissão por acordo (484-A CLT):</strong> Criada pela Reforma Trabalhista, permite que empregado e empregador rescindam o contrato de comum acordo. Nesse caso, o empregado recebe metade do aviso prévio indenizado, multa de 20% sobre o FGTS, e pode sacar até 80% do FGTS. NÃO tem direito ao seguro-desemprego.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Documentos necessários:</strong> Para o cálculo preciso, tenha em mãos: data de admissão e demissão, último salário bruto, média de horas extras, valor do FGTS e motivo da rescisão. Utilize nossa <a href="#calculadoras/calculadora-de-rescisao-trabalhista" className="text-emerald-600 font-bold hover:underline">Calculadora de Rescisão</a> completa.
          </p>
        </>
      )
    },
    'simular-financiamento-casa-propria': {
      titulo: 'Simular Financiamento da Casa Própria - SAC vs Price',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            Simular o financiamento imobiliário é essencial antes de comprar a casa própria. No Brasil, os dois sistemas mais comuns são o SAC (Sistema de Amortização Constante) e a Tabela Price (Sistema Francês de Amortização). Cada um tem características próprias que impactam diretamente o valor das parcelas e o custo total do financiamento.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>SAC (Sistema de Amortização Constante):</strong> As parcelas são decrescentes ao longo do tempo. No início, as prestações são mais altas, mas diminuem progressivamente. A amortização do saldo devedor é constante, fazendo com que os juros totais pagos sejam menores. Ideal para quem pode pagar parcelas maiores no início.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Tabela Price:</strong> As parcelas são fixas do início ao fim do contrato. A amortização começa pequena e vai aumentando com o tempo, enquanto os juros diminuem na mesma proporção. Ideal para quem precisa de previsibilidade no orçamento mensal.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Para simular seu financiamento com detalhamento completo (tabela de evolução mensal, comparação entre sistemas, custo efetivo total), use nosso <a href="#calculadoras/simulador-de-financiamento" className="text-emerald-600 font-bold hover:underline">Simulador de Financiamento</a> completo.
          </p>
        </>
      )
    },
    'consultar-cep-correios': {
      titulo: 'Consultar CEP Correios - Busca de Endereço Online',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            O CEP (Código de Endereçamento Postal) é um sistema de códigos numérico criado pelos Correios para organizar a entrega de correspondências e encomendas em todo o território nacional. Composto por 8 dígitos no formato XXXXX-XXX, ele identifica ruas, avenidas, bairros e até grandes edifícios.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Como funciona a consulta:</strong> Utilizamos a API oficial do ViaCEP, um serviço gratuito e público que consulta a base de CEPs dos Correios. Basta digitar o CEP desejado, e a ferramenta retorna o logradouro, bairro, cidade, estado e até o código IBGE do município.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Dicas para consulta:</strong> Certifique-se de digitar os 8 dígitos sem pontos ou traços. CEPs de ruas muito novas podem não estar cadastrados na base. Para CEPs de grandes empresas ou edifícios (CEP específico), a consulta geralmente retorna o logradouro completo.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Use nossa <a href="#programatico/cep-brasil" className="text-emerald-600 font-bold hover:underline">ferramenta de consulta de CEP</a> interativa para buscar qualquer endereço do Brasil.
          </p>
        </>
      )
    },
    'consultar-ddd-telefone': {
      titulo: 'Consultar DDD Telefônico - Códigos do Brasil',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            Os códigos DDD (Discagem Direta à Distância) são essenciais para realizar chamadas telefônicas interestaduais e intermunicipais no Brasil. Gerenciados pela ANATEL, cada código de 2 dígitos corresponde a uma região específica do país, abrangendo uma ou várias cidades.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Como usar o DDD:</strong> Para ligar de um DDD para outro, disc: 0 + código da operadora + DDD de destino + número do telefone. Exemplo: 0 15 11 91234-5678 (de qualquer DDD para São Paulo capital via operadora 15 - Vivo).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>DDDs mais comuns:</strong> 11 (São Paulo capital e RM), 21 (Rio de Janeiro capital), 31 (Belo Horizonte), 41 (Curitiba), 51 (Porto Alegre), 61 (Brasília), 71 (Salvador), 81 (Recife), 85 (Fortaleza), 91 (Belém).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Desde 2012, os telefones fixos e celulares no Brasil passaram a ter 9 dígitos nas regiões metropolitanas que possuem DDDs 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99.
          </p>
        </>
      )
    },
    'gerar-senha-forte': {
      titulo: 'Gerar Senha Forte e Segura Online',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            Uma senha forte é a primeira linha de defesa contra invasões de contas online, roubo de identidade e vazamento de dados pessoais. Com o aumento de ataques cibernéticos no Brasil e no mundo, criar senhas robustas nunca foi tão importante.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Características de uma senha forte:</strong> Mínimo de 12 a 16 caracteres, combinação de letras maiúsculas e minúsculas, números e símbolos especiais (!@#$%&∗), sem palavras do dicionário, datas de nascimento ou sequências óbvias como "123456" ou "senha".
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Boas práticas de segurança:</strong> Use senhas diferentes para cada serviço (nunca repita a mesma senha), ative a autenticação de dois fatores (2FA) sempre que possível, utilize um gerenciador de senhas confiável (como Bitwarden, 1Password ou o próprio gerenciador do navegador), troque senhas periodicamente.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Utilize nosso <a href="#geradores/gerador-de-senha-segura" className="text-emerald-600 font-bold hover:underline">Gerador de Senha Segura</a> para criar senhas de até 64 caracteres com total personalização.
          </p>
        </>
      )
    },
    'gerar-cpf-valido': {
      titulo: 'Gerar CPF Válido para Testes - Online',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            Gerar CPF válido é uma necessidade comum para desenvolvedores de software, analistas de QA e estudantes de TI que precisam testar sistemas, formulários e validações cadastrais sem utilizar dados pessoais reais de cidadãos brasileiros.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Como o CPF é gerado:</strong> O CPF (Cadastro de Pessoas Físicas) é composto por 11 dígitos: os 9 primeiros são a raiz, e os 2 últimos são dígitos verificadores calculados pelo algoritmo módulo 11. Nosso gerador utiliza exatamente este algoritmo matemático oficial da Receita Federal para produzir CPFs sintéticos válidos.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Para ambientes de teste:</strong> Os CPFs gerados são sintéticos (não correspondem a pessoas reais) e ideais para popular bancos de dados de homologação, testar fluxos de cadastro em lojas virtuais, simular integrações com sistemas externos e validar máscaras de formulários.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Use nosso <a href="#geradores/gerador-de-cpf" className="text-emerald-600 font-bold hover:underline">Gerador de CPF</a> completo, que também valida CPFs existentes e oferece formatação com ou sem pontuação.
          </p>
        </>
      )
    },
    'gerar-cnpj-valido': {
      titulo: 'Gerar CNPJ Válido - Simulador para Testes',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            O CNPJ (Cadastro Nacional da Pessoa Jurídica) é o registro de empresas junto à Receita Federal. Assim como o CPF para pessoas físicas, o CNPJ possui dígitos verificadores calculados por algoritmo específico que garante a validade matemática do número.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Estrutura do CNPJ:</strong> O CNPJ possui 14 dígitos no formato XX.XXX.XXX/XXXX-XX. Os primeiros 8 dígitos identificam a empresa matriz, o três dígitos seguintes identificam a filial (0001 para matriz), e os dois últimos são dígitos verificadores.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Para testes de sistemas:</strong> CNPJs gerados são sintéticos e não correspondem a empresas reais. Use para testar cadastros de clientes PJ, integrações com NF-e (Nota Fiscal Eletrônica) em ambiente de sandbox, simular emissão de boletos e validar formulários de e-commerce B2B.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Utilize nosso <a href="#geradores/gerador-de-cnpj" className="text-emerald-600 font-bold hover:underline">Gerador de CNPJ</a> completo que também funciona como validador de CNPJs existentes.
          </p>
        </>
      )
    },
    'gerar-qr-code-pix': {
      titulo: 'Gerar QR Code PIX - Código de Pagamento Instantâneo',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            O PIX revolucionou o sistema de pagamentos brasileiro desde seu lançamento em novembro de 2020 pelo Banco Central. Os QR Codes PIX permitem pagamentos instantâneos 24 horas por dia, 7 dias por semana, incluindo feriados, com transferência de recursos em segundos.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Tipos de QR Code PIX:</strong> QR Code estático (mesmo valor, pode ser impresso e reutilizado) e QR Code dinâmico (valor gerado para cada transação, comum em e-commerces). Ambos são regulamentados pelo Banco Central e seguem o padrão EMV.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Chaves PIX mais comuns:</strong> CPF/CNPJ (mais utilizado), e-mail, número de telefone celular, chave aleatória (EVP - Endereço Virtual de Pagamento). Todas as chaves são cadastradas na instituição financeira de preferência do usuário.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Use nosso <a href="#geradores/gerador-de-qr-code" className="text-emerald-600 font-bold hover:underline">Gerador de QR Code</a> para criar códigos para qualquer finalidade: PIX, URLs, textos, Wi-Fi e contatos.
          </p>
        </>
      )
    },
    'calcular-imc-gratis': {
      titulo: 'Calcular IMC Grátis - Índice de Massa Corporal',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            O IMC (Índice de Massa Corporal) é o padrão internacional da Organização Mundial da Saúde (OMS) para classificar o estado nutricional de adultos. O cálculo é simples: divide-se o peso (em kg) pela altura ao quadrado (em metros).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Tabela de classificação OMS:</strong> Abaixo de 18,5: Abaixo do peso. 18,5 a 24,9: Peso normal (faixa ideal). 25,0 a 29,9: Sobrepeso. 30,0 a 34,9: Obesidade grau I. 35,0 a 39,9: Obesidade grau II. Acima de 40: Obesidade grau III (mórbida).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Limitações do IMC:</strong> O IMC não distingue massa muscular de gordura corporal. Atletas com alta massa muscular podem apresentar IMC elevado mesmo com baixo percentual de gordura. Para uma avaliação completa, considere também o percentual de gordura, circunferência abdominal e exames clínicos.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Use nossa <a href="#calculadoras/calculadora-de-imc" className="text-emerald-600 font-bold hover:underline">Calculadora de IMC</a> interativa, que além do índice mostra o peso ideal para sua altura e dicas personalizadas.
          </p>
        </>
      )
    },
    'calcular-juros-compostos-mensais': {
      titulo: 'Calcular Juros Compostos Mensais para Investimentos',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            Os juros compostos, também conhecidos como "juros sobre juros", são a força mais poderosa do universo financeiro. Ao contrário dos juros simples, onde o rendimento é calculado apenas sobre o valor inicial, os juros compostos acumulam rendimentos sobre rendimentos anteriores, gerando um crescimento exponencial ao longo do tempo.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Fórmula dos juros compostos:</strong> M = C x (1 + i)^t, onde M é o montante final, C é o capital inicial, i é a taxa de juros periódica e t é o tempo. Com aportes mensais, a fórmula incorpora cada contribuição individualmente ao cálculo.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Exemplo prático:</strong> Investindo R$ 500,00 por mês com taxa de 0,8% ao mês (aproximadamente 10% ao ano), em 10 anos você terá aproximadamente R$ 101.500,00. Em 20 anos, esse valor salta para mais de R$ 300.000,00. Quanto mais cedo começar, maior o efeito dos juros compostos.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Simule seus investimentos com nossa <a href="#calculadoras/calculadora-de-juros-compostos" className="text-emerald-600 font-bold hover:underline">Calculadora de Juros Compostos</a> completa, que mostra a evolução ano a ano com aportes mensais.
          </p>
        </>
      )
    },
    'calcular-porcentagem-online': {
      titulo: 'Calcular Porcentagem Online - Calculadora Grátis',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            Calcular porcentagem é uma das operações matemáticas mais comuns no dia a dia. Seja para calcular descontos em compras, aumentaróes de preços, comissões de vendas, juros de parcelamentos ou variações percentuais de indicadores, dominar o cálculo de porcentagem é essencial.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Tipos de cálculo:</strong> Nossa calculadora oferece três modalidades: 1) Descobrir quanto é X% de um valor (ex: 15% de R$ 200 = R$ 30). 2) Descobrir qual a porcentagem de um valor em relação a outro (ex: R$ 30 de R$ 200 = 15%). 3) Calcular a variação percentual entre dois valores (ex: de R$ 100 para R$ 120 = aumento de 20%).
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Aplicações práticas:</strong> Calcular comissões de vendas, determinar multas por atraso (geralmente 2% ao mês), calcular juros de mora, estimar gorjetas em restaurantes (10% padrão), analisar variação de preços entre períodos, calcular impostos percentuais.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Use nossa <a href="#calculadoras/calculadora-de-porcentagem" className="text-emerald-600 font-bold hover:underline">Calculadora de Porcentagem</a> completa para todos os tipos de cálculo percentual.
          </p>
        </>
      )
    },
    'calcular-inss-salario': {
      titulo: 'Calcular INSS sobre o Salário - Desconto 2026',
      conteudo: (
        <>
          <p className="text-xs text-slate-500 leading-relaxed">
            O desconto do INSS (Instituto Nacional do Seguro Social) é uma contribuição obrigatória para todos os trabalhadores com carteira assinada (CLT) no Brasil. Este desconto financia a Previdência Social, garantindo benefícios como aposentadoria, pensão por morte, auxílio-doença e salário-maternidade.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Tabela progressiva 2026:</strong> O desconto do INSS segue alíquotas progressivas, ou seja, cada faixa salarial tem sua própria alíquota aplicada apenas sobre o valor que excede o limite da faixa anterior. As alíquotas variam de 7,5% a 14% dependendo da faixa salarial, com teto máximo de contribuição.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            <strong>Como calcular:</strong> Diferente do sistema antigo (que aplicava uma alíquota única sobre o salário total), o cálculo progressivo de 2020 em diante aplica cada percentual apenas sobre a parcela do salário dentro de cada faixa. Isso torna o desconto mais justo para salários mais baixos.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            Calcule o desconto exato do INSS na sua folha de pagamento com nossa <a href="#calculadoras/calculadora-desconto-inss" className="text-emerald-600 font-bold hover:underline">Calculadora de Desconto INSS</a>, que aplica a tabela progressiva correta.
          </p>
        </>
      )
    }
  };
  const info = paginas[id];
  if (!info) {
    return <p className="text-xs text-slate-500">Página não encontrada.</p>;
  }
  return (
    <div className="space-y-4" id={`prog-longtail-${id}`}>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">{info.titulo}</h2>
      <article className="space-y-2">
        {info.conteudo}
      </article>
      <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border text-xs mt-6 flex gap-3 flex-wrap">
        <span className="font-bold text-slate-500">Ferramentas relacionadas:</span>
        <a href="#calculadoras" className="text-emerald-600 font-bold hover:underline">Calculadoras</a>
        <a href="#conversores" className="text-emerald-600 font-bold hover:underline">Conversores</a>
        <a href="#geradores" className="text-emerald-600 font-bold hover:underline">Geradores</a>
        <a href="#" className="text-emerald-600 font-bold hover:underline">Página Inicial</a>
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
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b border-slate-100 pb-3">CBO - Classificação Brasileira de Ocupações</h2>
      <div className="text-xs text-slate-500 leading-relaxed space-y-3">
        <p>
          A CBO (Classificação Brasileira de Ocupações) é o documento oficial do Ministério do Trabalho e Emprego que reconhece, nomeia e codifica os cargos e ocupações existentes no mercado de trabalho brasileiro. Instituída pela Portaria nº 397/2002, a CBO é a referência obrigatória para registro de empregados (RAIS/CAGED), contratos de trabalho e estatísticas oficiais do emprego.
        </p>
        <p>
          <strong>Estrutura do código CBO:</strong> São 7 dígitos no formato XXXX-XX, organizados em: Grande Grupo (1º dígito), Subgrupo Principal (2 primeiros dígitos), Subgrupo (3 primeiros dígitos), Família Ocupacional (4 primeiros dígitos) e Ocupação (código completo de 6 dígitos).
        </p>
        <p>
          <strong>Para que serve:</strong> O código CBO é obrigatório na admissão de empregados (eSocial e CAGED), definição de piso salarial por categoria profissional, concessão de registros profissionais (conselhos de classe), estatísticas do mercado de trabalho (PNAD, RAIS) e políticas públicas de emprego e renda.
        </p>
        <p>
          Consulte abaixo exemplos de ocupações na área de tecnologia da informação e comunicação com seus respectivos códigos CBO.
        </p>
      </div>
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
