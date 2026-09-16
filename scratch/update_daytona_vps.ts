import fetch from 'node-fetch';

const DAYTONA_API_KEY = 'dtn_bb3e0b6b0e22fe51105e84ca7e9570ee3302aeab3caa796e795fe76eea63081c';
const SANDBOX_ID = '8f82b782-ca1b-47a1-a55b-4758ff64aff8';

async function runCmd(cmd: string) {
  const r = await fetch(`https://proxy.app.daytona.io/toolbox/${SANDBOX_ID}/process/execute`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${DAYTONA_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ command: cmd, cwd: '/root/Novo-emprega-pe', timeout: 60 })
  });
  const d: any = await r.json();
  return d;
}

async function main() {
  console.log('1. Atualizando repositório na VPS Daytona...');
  let res = await runCmd('git fetch origin main && git reset --hard origin/main');
  console.log('Git update:\n', res.result);

  console.log('2. Reiniciando PM2 scheduler...');
  res = await runCmd('pm2 restart emprega-pe-scheduler');
  console.log('PM2 restart:\n', res.result);

  res = await runCmd('pm2 status');
  console.log('PM2 status:\n', res.result);
}

main().catch(console.error);
