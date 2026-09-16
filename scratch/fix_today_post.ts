import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = 'https://rehntkqwlftxkewtesbe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaG50a3F3bGZ0eGtld3Rlc2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NzM5OTgsImV4cCI6MjA5NDU0OTk5OH0._2wUu0n-YZiReOi4tc4MEESqEz-HUomOAcKTmE0w85M';

async function fixPost() {
  const title = 'Cursos Técnicos Gratuitos em Pernambuco: Como se inscrever no SENAI e SENAC em 2026';
  const slug = 'cursos-tecnicos-gratuitos-em-pernambuco-como-se-inscrever-no-senai-e-senac-em-20';
  const category = 'Cursos';

  console.log('1. Importando e chamando generatePostImage do Novo-emprega-pe...');
  // @ts-ignore
  const { generatePostImage } = await import('file:///D:/sites/Novo-emprega-pe/src/lib/gemini.ts');
  const coverUrl = await generatePostImage(title, '', slug, category);
  console.log('Capa gerada:', coverUrl);

  if (!coverUrl || !coverUrl.startsWith('http')) {
    console.error('Capa inválida gerada:', coverUrl);
    return;
  }

  console.log('2. Atualizando Supabase...');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/blog?slug=eq.${encodeURIComponent(slug)}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      image_url: coverUrl
    })
  });

  if (!res.ok) {
    console.error('Erro ao atualizar Supabase:', res.status, await res.text());
  } else {
    const updated = await res.json();
    console.log('✅ Post atualizado com sucesso no Supabase:', updated);
  }
}

fixPost().catch(console.error);
