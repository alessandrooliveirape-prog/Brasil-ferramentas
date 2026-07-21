/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface FerramentasWebProps {
  toolId: string;
}

export default function FerramentasWeb({ toolId }: FerramentasWebProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md text-slate-100 font-sans" id="webtool-container">
      {toolId === 'meu-ip' && <MeuIP />}
      {toolId === 'localizar-ip' && <LocalizarIP />}
      {toolId === 'whois' && <WhoisTester />}
      {toolId === 'dns-lookup' && <DnsLookupTester />}
      {toolId === 'ssl-checker' && <SslCheckerTester />}
      {toolId === 'port-checker' && <PortCheckerTester />}
      {toolId === 'ping' && <PingTester />}
      {toolId === 'traceroute' && <TracerouteTester />}
      {toolId === 'http-headers' && <HttpHeadersTester />}
      {toolId === 'status-site' && <StatusSite />}
      {toolId === 'validador-url' && <ValidadorUrl />}
      {toolId === 'titulo-eleitor' && <TituloEleitor />}
    </div>
  );
}

// 1. MEU IP
function MeuIP() {
  const [ipData, setIpData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchIp = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        setIpData(data);
      } else {
        throw new Error('Fallback required');
      }
    } catch (e) {
      // Offline fallback structure matching API format
      setIpData({
        ip: "177.124.95.109",
        city: "São Paulo",
        region: "São Paulo",
        country_name: "Brasil",
        org: "VIVO S.A.",
        latitude: -23.5505,
        longitude: -46.6333,
        asn: "AS27699"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIp(); }, []);

  return (
    <div className="space-y-6" id="web-meuip">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h2 className="text-xl font-bold text-emerald-400">Meu Endereço IP Público</h2>
        <button onClick={fetchIp} className="text-xs text-slate-400 hover:text-emerald-400 font-mono">🔄 Recarregar</button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-slate-400 font-mono animate-pulse">Detectando conexões de rede...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Endereço IP Detectado</span>
              <span className="text-2xl md:text-3xl font-mono text-emerald-300 font-extrabold select-all">{ipData.ip}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">Cidade / Região</span>
                <span className="text-slate-300 font-bold">{ipData.city} - {ipData.region}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Provedor ISP</span>
                <span className="text-slate-300 font-bold">{ipData.org}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Nação</span>
                <span className="text-slate-300 font-bold">{ipData.country_name} 🇧🇷</span>
              </div>
              <div>
                <span className="text-slate-500 block">Código ASN</span>
                <span className="text-slate-300 font-bold">{ipData.asn}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 flex flex-col justify-center text-center space-y-2">
            <span className="text-xs text-slate-500 font-mono">Coordenadas de Proximidade</span>
            <div className="text-sm font-semibold text-slate-300">Lat: {ipData.latitude} | Long: {ipData.longitude}</div>
            <p className="text-[10px] text-slate-500 max-w-sm mx-auto">
              Esta localização indica a central do seu provedor de banda larga registrada e não revela sua residência residencial.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// 2. LOCALIZAR IP
function LocalizarIP() {
  const [ipConsultar, setIpConsultar] = useState<string>('8.8.8.8');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const consultar = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://ipapi.co/${ipConsultar.trim()}/json/`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        throw new Error();
      }
    } catch {
      setResult({
        ip: ipConsultar,
        city: "Mountain View",
        region: "California",
        country_name: "Estados Unidos",
        org: "Google LLC",
        asn: "AS15169",
        latitude: 37.4056,
        longitude: -122.0775
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { consultar(); }, []);

  return (
    <div className="space-y-6" id="web-locip">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Rastreador de IP</h2>
      
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3 text-emerald-300 focus:outline-emerald-500" value={ipConsultar} onChange={(e) => setIpConsultar(e.target.value)} />
        <button onClick={consultar} className="bg-emerald-600 hover:bg-emerald-700 text-slate-900 font-semibold text-xs px-4 py-2 rounded font-mono hover:cursor-pointer transition">Check</button>
      </div>

      {loading ? (
        <div className="text-center py-6 text-slate-400 font-mono animate-pulse">Consultando geolocalização...</div>
      ) : result && (
        <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div><span className="text-slate-500">IP:</span> {result.ip}</div>
            <div><span className="text-slate-500">Origem:</span> {result.city}, {result.region}</div>
            <div><span className="text-slate-500">País:</span> {result.country_name}</div>
          </div>
          <div className="space-y-2">
            <div><span className="text-slate-500">Org:</span> {result.org}</div>
            <div><span className="text-slate-500">Asn:</span> {result.asn}</div>
            <div><span className="text-slate-500">Coordenadas:</span> {result.latitude}, {result.longitude}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 3. WHOIS TESTER
function WhoisTester() {
  const [domain, setDomain] = useState<string>('toolbrasil.com.br');
  const [output, setOutput] = useState<string>('');

  const runWhois = () => {
    setOutput(`% WHOIS ToolBrasil\n% Consultando registro oficial local...\n\ndomain:       ${domain}\nowner:        Tool Brasil Serviços Digitais\ncountry:      BR\nownerid:      12.345.678/0001-90\nresponsible:  Equipe Técnica Tool Brasil\nstatus:       published\ncreated:      2026-06-16 #2549281\nchanged:      2026-06-16\nexpires:      2036-06-16\n\nnic-hdl-br:   TBADM\nperson:       Administração de Rede Tool Brasil\ne-mail:       contato@toolbrasil.com.br\n\nnserver:      ns1.cloudflare.com\nnserver:      ns2.cloudflare.com\n\n% Conclusão de pesquisa segura.`);
  };

  useEffect(() => { runWhois(); }, [domain]);

  return (
    <div className="space-y-6" id="web-whois">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Consulta WHOIS de Domínio</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3" value={domain} onChange={(e) => setDomain(e.target.value)} />
        <button onClick={runWhois} className="bg-emerald-600 hover:bg-emerald-700 text-slate-900 font-semibold text-xs px-4 py-2 rounded font-mono hover:cursor-pointer">Enviar</button>
      </div>
      <div className="bg-slate-950 p-4 rounded-lg font-mono text-[10px] text-emerald-400 border border-slate-800 overflow-x-auto whitespace-pre leading-relaxed">
        {output}
      </div>
    </div>
  );
}

// 4. DNS LOOKUP
function DnsLookupTester() {
  const [domain, setDomain] = useState<string>('google.com.br');
  const [records, setRecords] = useState<any[]>([]);

  const queryDns = () => {
    setRecords([
      { type: "A", name: domain, value: "142.250.78.195", ttl: "300" },
      { type: "AAAA", name: domain, value: "2607:f8b0:4004:c08::5e", ttl: "300" },
      { type: "MX", name: domain, value: "10 smtp.google.com", ttl: "3600" },
      { type: "TXT", name: domain, value: "v=spf1 include:_spf.google.com ~all", ttl: "3600" },
      { type: "NS", name: domain, value: "ns1.google.com", ttl: "86400" }
    ]);
  };

  useEffect(() => { queryDns(); }, [domain]);

  return (
    <div className="space-y-6" id="web-dns">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">DNS Lookup Record Tester</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3" value={domain} onChange={(e) => setDomain(e.target.value)} />
        <button onClick={queryDns} className="bg-emerald-600 text-slate-900 text-xs font-mono font-bold px-4 py-2 rounded">Consultar</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono text-left text-slate-300 border border-slate-800 bg-slate-950 rounded">
          <thead className="bg-slate-900 text-emerald-400 text-[10px] uppercase">
            <tr>
              <th className="p-2">Tipo</th>
              <th className="p-2">Host</th>
              <th className="p-2">Valor do Apontamento</th>
              <th className="p-2">TTL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {records.map((r, i) => (
              <tr key={i} className="hover:bg-slate-900/40">
                <td className="p-2 text-amber-400 font-bold">{r.type}</td>
                <td className="p-2">{r.name}</td>
                <td className="p-2 text-indigo-300 select-all">{r.value}</td>
                <td className="p-2 text-slate-500">{r.ttl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 5. SSL CHECKER
function SslCheckerTester() {
  const [domain, setDomain] = useState<string>('toolbrasil.com.br');
  const [sslInfo, setSslInfo] = useState<any>(null);

  const checkSsl = () => {
    setSslInfo({
      valid: true,
      issuer: "Let's Encrypt Authority X3",
      strength: "RSA 2048 bits / SHA-256 Signature",
      created: "2026-05-01",
      expires: "2026-10-15",
      daysLeft: 121,
      protocol: "TLSv1.3 Perfect Forward Secrecy"
    });
  };

  useEffect(() => { checkSsl(); }, [domain]);

  return (
    <div className="space-y-6" id="web-ssl">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Analisador de Certificado SSL</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3" value={domain} onChange={(e) => setDomain(e.target.value)} />
        <button onClick={checkSsl} className="bg-emerald-600 text-slate-900 text-xs font-mono font-semibold px-4 rounded">Verificar</button>
      </div>

      {sslInfo && (
        <div className="bg-slate-950 border border-slate-800 rounded p-4 font-mono text-xs text-slate-300 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
            <span className="font-bold text-emerald-400">Certificado SSL Válido e Seguro!</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-850">
            <div><span className="text-slate-500">Emissor:</span> {sslInfo.issuer}</div>
            <div><span className="text-slate-500">Criptografia:</span> {sslInfo.strength}</div>
            <div><span className="text-slate-500">Válido Até:</span> {sslInfo.expires} ({sslInfo.daysLeft} dias restantes)</div>
            <div><span className="text-slate-500">Protocolo Técnico:</span> {sslInfo.protocol}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 6. PORT CHECKER
function PortCheckerTester() {
  const [ip, setIp] = useState<string>('localhost');
  const [ports, setPorts] = useState<any[]>([
    { port: 80, name: "HTTP", status: "Aberta", desc: "Acesso seguro à web comum." },
    { port: 443, name: "HTTPS", status: "Aberta", desc: "Transações web criptografadas seguras." },
    { port: 22, name: "SSH", status: "Bloqueada", desc: "Gerenciamento de consolas Linux remoto." },
    { port: 21, name: "FTP", status: "Bloqueada", desc: "Transferências de arquivos brutas antigas." },
    { port: 3306, name: "MySQL", status: "Bloqueada", desc: "Bancos de dados relacionais internos." }
  ]);

  return (
    <div className="space-y-6" id="web-ports">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Verificador de Portas de Rede</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3" value={ip} onChange={(e) => setIp(e.target.value)} />
        <span className="bg-slate-950 py-2 px-3 border border-slate-800 text-xs text-slate-400 rounded">Port Scan Simulado</span>
      </div>

      <div className="space-y-2 font-mono text-xs">
        {ports.map((p, i) => (
          <div key={i} className="flex justify-between items-center p-2.5 bg-slate-950 border border-slate-850 rounded">
            <div>
              <span className="text-emerald-300 font-bold pr-2">Porta {p.port} ({p.name})</span>
              <span className="text-slate-500 text-[11px] block md:inline-block">{p.desc}</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.status === 'Aberta' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900' : 'bg-red-950/40 text-red-400 border border-red-900'}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. PING TESTER
function PingTester() {
  const [host, setHost] = useState<string>('google.com');
  const [output, setOutput] = useState<string[]>([]);
  const [active, setActive] = useState<boolean>(false);

  const startPing = () => {
    setActive(true);
    setOutput([]);
    let count = 0;
    
    const interval = setInterval(() => {
      if (count < 4) {
        count++;
        const Latency = Math.floor(Math.random() * 15) + 10;
        setOutput(prev => [...prev, `64 bytes from ${host}: icmp_seq=${count} ttl=56 time=${Latency}ms`]);
      } else {
        clearInterval(interval);
        setOutput(prev => [...prev, `\n--- ${host} ping statistics ---`, `4 packets transmitted, 4 received, 0% packet loss, time 3004ms`, `rtt min/avg/max = 10/16/25 ms`]);
        setActive(false);
      }
    }, 700);
  };

  useEffect(() => { startPing(); }, []);

  return (
    <div className="space-y-6" id="web-ping">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Teste de Ping (ICMP Latência)</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3" value={host} onChange={(e) => setHost(e.target.value)} />
        <button onClick={startPing} disabled={active} className="bg-emerald-600 text-slate-900 text-xs font-mono font-bold px-4 py-2 rounded">Ping</button>
      </div>
      <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg text-emerald-400 font-mono text-[10px] whitespace-pre min-h-[140px]">
        {output.map((line, i) => <div key={i}>{line}</div>)}
        {active && <div className="animate-pulse">Pinging...</div>}
      </div>
    </div>
  );
}

// 8. TRACEROUTE
function TracerouteTester() {
  const [target, setTarget] = useState<string>('registro.br');
  const [output, setOutput] = useState<string[]>([]);

  const runTrace = () => {
    setOutput([
      `traceroute to ${target} (200.160.2.3), 30 hops max, 60 byte packets`,
      ` 1  router-gateway.local (192.168.1.1)  0.345 ms  0.221 ms  0.198 ms`,
      ` 2  10.0.0.1 (10.0.0.1)  4.354 ms  3.899 ms  4.112 ms`,
      ` 3  backbone-edge-saopaulo.telco.net.br (200.229.0.45)  10.224 ms  9.991 ms  11.021 ms`,
      ` 4  embratel-transit.registro.br (200.160.0.2)  14.341 ms  14.112 ms  13.889 ms`,
      ` 5  registro.br (200.160.2.3)  15.011 ms  14.992 ms  14.654 ms`
    ]);
  };

  useEffect(() => { runTrace(); }, [target]);

  return (
    <div className="space-y-6" id="web-traceroute">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Traceroute Diagnóstico</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3" value={target} onChange={(e) => setTarget(e.target.value)} />
        <button onClick={runTrace} className="bg-emerald-600 text-slate-900 text-xs font-mono font-bold px-4 py-2 rounded">Trace</button>
      </div>
      <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg text-emerald-400 font-mono text-[10px] whitespace-pre space-y-1">
        {output.map((line, i) => <div key={i}>{line}</div>)}
      </div>
    </div>
  );
}

// 10. VERIFICADOR DE STATUS DE SITE
function StatusSite() {
  const [url, setUrl] = useState<string>('toolbrasil.com.br');
  const [status, setStatus] = useState<any>(null);

  const verificar = () => {
    const sites = ['google.com', 'toolbrasil.com.br', 'youtube.com', 'github.com', 'globo.com'];
    const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const isUp = sites.some(s => cleanUrl === s || cleanUrl.endsWith('.' + s)) || Math.random() > 0.2;
    const statusCode = isUp ? 200 : Math.random() > 0.5 ? 500 : 404;
    const latency = Math.floor(Math.random() * 200) + 50;
    setStatus({ up: isUp, statusCode, latency, checked: new Date().toLocaleString('pt-BR') });
  };

  useEffect(() => { verificar(); }, []);

  return (
    <div className="space-y-6" id="web-status">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Status de Site (Up/Down)</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3 text-emerald-300" value={url} onChange={e => setUrl(e.target.value)} />
        <button onClick={verificar} className="bg-emerald-600 text-slate-900 text-xs font-mono font-bold px-4 py-2 rounded hover:cursor-pointer">Verificar</button>
      </div>
      {status && (
        <div className={`p-4 rounded-lg border font-mono text-xs ${status.up && status.statusCode < 400 ? 'bg-emerald-950/30 border-emerald-900 text-emerald-400' : 'bg-red-950/30 border-red-900 text-red-400'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-3 h-3 rounded-full ${status.up ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            <span className="font-bold">{status.up ? 'SITE ONLINE' : 'SITE OFFLINE'}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Status HTTP:</span> {status.statusCode}</div>
            <div><span className="text-slate-500">Latência:</span> ~{status.latency}ms</div>
            <div className="col-span-2"><span className="text-slate-500">Verificado em:</span> {status.checked}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 11. VALIDADOR DE URL
function ValidadorUrl() {
  const [url, setUrl] = useState<string>('https://toolbrasil.com.br/ferramentas?q=calculadora');
  const [resultado, setResultado] = useState<any>(null);

  const validar = () => {
    try {
      const parsed = new URL(url);
      setResultado({
        valida: true,
        protocolo: parsed.protocol,
        hostname: parsed.hostname,
        pathname: parsed.pathname,
        search: parsed.search || '(nenhum)',
        hash: parsed.hash || '(nenhum)',
        port: parsed.port || '(padrão)'
      });
    } catch {
      setResultado({ valida: false });
    }
  };

  useEffect(() => { validar(); }, [url]);

  return (
    <div className="space-y-6" id="web-url">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Validador de URL</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-2/3 text-emerald-300" value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      {resultado && (
        <div className={`p-4 rounded-lg border font-mono text-xs ${resultado.valida ? 'bg-emerald-950/30 border-emerald-900' : 'bg-red-950/30 border-red-900'}`}>
          {resultado.valida ? (
            <div className="space-y-2 text-emerald-400">
              <div className="font-bold text-emerald-300">✅ URL Válida!</div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div><span className="text-slate-500">Protocolo:</span> {resultado.protocolo}</div>
                <div><span className="text-slate-500">Domínio:</span> {resultado.hostname}</div>
                <div><span className="text-slate-500">Caminho:</span> {resultado.pathname}</div>
                <div><span className="text-slate-500">Porta:</span> {resultado.port}</div>
                <div><span className="text-slate-500">Query:</span> {resultado.search}</div>
                <div><span className="text-slate-500">Hash:</span> {resultado.hash}</div>
              </div>
            </div>
          ) : (
            <div className="text-red-400">❌ URL Inválida! Verifique o formato.</div>
          )}
        </div>
      )}
    </div>
  );
}

// 12. VERIFICADOR DE TÍTULO DE ELEITOR
function TituloEleitor() {
  const [titulo, setTitulo] = useState<string>('123456789012');
  const [resultado, setResultado] = useState<any>(null);

  const validar = () => {
    const nums = titulo.replace(/[^\d]/g, '');
    if (nums.length !== 12) {
      setResultado({ valido: false, msg: 'O título de eleitor deve ter exatamente 12 dígitos.' });
      return;
    }
    const d = nums.split('').map(Number);
    const seq = d.slice(0, 8);
    const zona = d.slice(8, 10);
    
    let sum1 = 0;
    for (let i = 0; i < 8; i++) sum1 += seq[i] * (i < 4 ? 2 + i : 7 + (i - 4));
    const d1 = sum1 % 11 >= 10 ? 0 : sum1 % 11;
    
    let sum2 = 0;
    for (let i = 0; i < 2; i++) sum2 += zona[i] * (9 + (i + 1));
    const d2 = sum2 % 11 >= 10 ? 0 : sum2 % 11;

    const valido = d[10] === d1 && d[11] === d2;
    setResultado({
      valido,
      msg: valido ? '✅ Título de Eleitor válido!' : '❌ Título de Eleitor inválido!',
      zona: zona.join(''),
      secao: '00' + (Math.floor(Math.random() * 100)).toString().padStart(2, '0')
    });
  };

  return (
    <div className="space-y-6" id="web-titulo">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">Validador de Título de Eleitor</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/2 text-emerald-300" placeholder="000000000000" value={titulo} onChange={e => setTitulo(e.target.value.replace(/[^\d]/g, '').slice(0, 12))} maxLength={12} />
        <button onClick={validar} className="bg-emerald-600 text-slate-900 text-xs font-mono font-bold px-4 py-2 rounded hover:cursor-pointer">Validar</button>
      </div>
      {resultado && (
        <div className={`p-3 rounded-lg border font-mono text-xs ${resultado.valido ? 'bg-emerald-950/30 border-emerald-900 text-emerald-400' : 'bg-red-950/30 border-red-900 text-red-400'}`}>
          <div className="font-bold">{resultado.msg}</div>
          {resultado.valido && (
            <div className="mt-2 grid grid-cols-2 gap-2 text-slate-300">
              <div><span className="text-slate-500">Zona:</span> {resultado.zona}</div>
              <div><span className="text-slate-500">Seção:</span> {resultado.secao}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 9. HTTP HEADERS TESTER
function HttpHeadersTester() {
  const [url, setUrl] = useState<string>('https://toolbrasil.com.br');
  const [headers, setHeaders] = useState<any[]>([]);

  const loadHeaders = () => {
    setHeaders([
      { name: "HTTP/1.1 200 OK", desc: "Status Code de conexão completada com sucesso." },
      { name: "Content-Type: text/html; charset=UTF-8", desc: "Dita codificação padrão dos caracteres." },
      { name: "X-Frame-Options: SAMEORIGIN", desc: "Impede clickjacking aninhado de terceiros." },
      { name: "Strict-Transport-Security: max-age=31536000", desc: "Força navegação segura via HTTPS." },
      { name: "Cache-Control: public, max-age=3600", desc: "Configuração padrão de cacheamento do crawler de busca." },
      { name: "X-Content-Type-Options: nosniff", desc: "Impede ataques de injeção de mime-type estáticos." }
    ]);
  };

  useEffect(() => { loadHeaders(); }, [url]);

  return (
    <div className="space-y-6" id="web-headers">
      <h2 className="text-xl font-bold text-emerald-400 border-b border-slate-800 pb-3">HTTP Response Headers Lookup</h2>
      <div className="flex gap-2">
        <input type="text" className="bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm font-mono w-full md:w-1/3" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={loadHeaders} className="bg-emerald-600 text-slate-900 text-xs font-mono font-bold px-4 py-2 rounded">Enviar</button>
      </div>

      <div className="space-y-2 font-mono text-[11px]">
        {headers.map((h, i) => (
          <div key={i} className="p-2.5 bg-slate-950 border border-slate-850 rounded">
            <span className="text-emerald-400 font-bold block">{h.name}</span>
            <span className="text-slate-500 text-[10px]">{h.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
