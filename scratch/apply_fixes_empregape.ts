import * as fs from 'fs';

function patchUtils() {
  const file = 'D:/sites/Novo-emprega-pe/src/lib/utils.ts';
  let content = fs.readFileSync(file, 'utf-8');

  const oldCode = `  // 2. Se houver slug, tentar servir a capa oficial local do blog se n\u017Do for chamada de fallback de erro
  if (idOrSlug && (!url || url.startsWith('/images/blog/'))) {
    const cleanSlug = idOrSlug.replace(/[^a-z0-9-]/gi, '').toLowerCase();
    if (cleanSlug) {
      return \`/images/blog/\${cleanSlug}.jpg\`;
    }
  }`;

  const targetStr = `if (idOrSlug && (!url || url.startsWith('/images/blog/'))) {`;
  const replaceStr = `if (url !== null && idOrSlug && (url && url.startsWith('/images/blog/'))) {`;

  if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf-8');
    console.log('✅ src/lib/utils.ts corrigido com sucesso!');
  } else {
    console.log('ℹ️ src/lib/utils.ts targetStr não encontrado.');
  }
}

function patchImageService() {
  const file = 'D:/sites/Novo-emprega-pe/src/services/imageService.ts';
  let content = fs.readFileSync(file, 'utf-8');

  const target = `  if (!base64Data) {\n    throw new Error(\`N`;

  const replacement = `  // 4. Fallback Ultra-Resiliente (VPS Daytona / Servidores): Pollinations AI Flux (1200x675 HD 16:9)
  if (!base64Data) {
    try {
      console.log('[ImageService] [Fallback Pollinations] Tentando geracao via Flux 16:9...');
      const encodedPrompt = encodeURIComponent(cleanPrompt);
      const pollUrl = \`https://image.pollinations.ai/prompt/\${encodedPrompt}?width=1200&height=675&nologo=true&model=flux\`;
      const pollRes = await fetch(pollUrl);
      if (pollRes.ok) {
        const arrayBuf = await pollRes.arrayBuffer();
        imageBuffer = Buffer.from(arrayBuf);
        base64Data = imageBuffer.toString('base64');
        console.log(\`✅ [ImageService] Capa gerada com sucesso via Pollinations (Flux) (\${imageBuffer.length} bytes)!\`);
      }
    } catch (pollErr: any) {
      console.warn('[ImageService] Falha no fallback Pollinations:', pollErr.message);
    }
  }\n\n  if (!base64Data) {\n    throw new Error(\`N`;

  if (!content.includes('Fallback Pollinations') && content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content, 'utf-8');
    console.log('✅ src/services/imageService.ts corrigido com sucesso com Fallback Pollinations Flux!');
  } else {
    console.log('ℹ️ src/services/imageService.ts já possui o fallback ou target não encontrado.');
  }
}

patchUtils();
patchImageService();
