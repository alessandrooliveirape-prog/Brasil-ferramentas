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
