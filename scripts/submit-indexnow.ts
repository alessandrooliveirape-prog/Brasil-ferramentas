/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Script de Envio Automático para a API do IndexNow
 * Envia instantaneamente todas as URLs do sitemap.xml para Bing, Yandex e motores parceiros.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'www.toolbrasil.com.br';
const INDEXNOW_KEY = '3a9f7e8b1c2d4e5f60718293a4b5c6d7';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

async function submitIndexNow() {
  console.log('📡 Iniciando submissão em lote para o protocolo IndexNow...');

  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ Erro: Arquivo sitemap não encontrado em '${sitemapPath}'.`);
    process.exit(1);
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  const urls: string[] = [];
  let match;

  while ((match = locRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1].trim());
  }

  console.log(`🔍 Total de URLs extraídas do sitemap: ${urls.length}`);

  if (urls.length === 0) {
    console.error('❌ Nenhuma URL encontrada no sitemap.');
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`🚀 Enviando ${urls.length} URLs para ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`Status retornado por ${endpoint}: ${response.status} ${response.statusText}`);
      if (response.status === 200 || response.status === 202) {
        console.log(`✅ Sucesso! As ${urls.length} URLs foram aceitas pelo IndexNow (${endpoint}).`);
      } else {
        const text = await response.text();
        console.warn(`⚠️ Resposta do endpoint (${response.status}): ${text}`);
      }
    } catch (err) {
      console.error(`❌ Erro ao submeter para ${endpoint}:`, err);
    }
  }

  console.log('🎉 Processo de submissão do IndexNow concluído!');
}

submitIndexNow();
