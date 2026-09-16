import fetch from 'node-fetch';

const DAYTONA_API_KEY = 'dtn_bb3e0b6b0e22fe51105e84ca7e9570ee3302aeab3caa796e795fe76eea63081c';
const SANDBOX_ID = '8f82b782-ca1b-47a1-a55b-4758ff64aff8';

async function runCmd(cmd: string) {
  const r = await fetch(`https://proxy.app.daytona.io/toolbox/${SANDBOX_ID}/process/execute`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${DAYTONA_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ command: cmd, cwd: '/root/Novo-emprega-pe', timeout: 30 })
  });
  const d: any = await r.json();
  return d;
}

async function main() {
  let res = await runCmd(`curl -Iv --max-time 10 https://api.cloudflare.com 2>&1 | grep -E "HTTP|Connected"`);
  console.log('CF API:', res.result);
  
  res = await runCmd(`curl -Iv --max-time 10 https://image.pollinations.ai 2>&1 | grep -E "HTTP|Connected"`);
  console.log('Pollinations:', res.result);

  res = await runCmd(`curl -Iv --max-time 10 https://api.cloudinary.com 2>&1 | grep -E "HTTP|Connected"`);
  console.log('Cloudinary:', res.result);
}

main().catch(console.error);
