# Diretrizes e Padrões de Engenharia - Tool Brasil

Este documento define os padrões arquiteturais, diretivas de monetização e fluxos operacionais consolidados para o projeto **Tool Brasil** (`https://www.toolbrasil.com.br`).

---

## 🎯 1. Pureza Google AdSense & Monetização

- **ads.txt Exclusivo:** O arquivo `public/ads.txt` deve conter estritamente o identificador do Google AdSense (`google.com, pub-8160658026927094, DIRECT, f08c47fec0942fa0`).
- **Zero Scripts de Terceiros / Popups:** É terminantemente proibido reintroduzir scripts intrusivos de monetização como Monetag (`vignette.min.js`, `n6wxm.com`), pop-unders ou redirecionamentos automáticos.
- **Isenção de Programas de Afiliados:** Manter o portal 100% focado no modelo Google AdSense e tráfego orgânico, sem cards ou tags de afiliados (ex: Amazon Associates).
- **Páginas Institucionais Obrigatórias:** As 7 páginas institucionais canônicas (`/sobre`, `/contato`, `/politica-de-privacidade`, `/termos-de-uso`, `/cookies`, `/transparencia-adsense`, `/anunciantes`) devem ser sempre pré-renderizadas via SSG em HTML puro com status 200 OK.

---

## 📬 2. Formulário de Contato & Notificações em Tempo Real

- **Backend Serverless:** O formulário de contato consome o endpoint `POST /api/contato`.
- **Canais de Despacho Ativos:**
  - **Telegram Bot:** Envia alerta instantâneo com os dados do remetente para o chat privado do administrador (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`).
  - **Resend (E-mail):** Dispara e-mail com design estruturado para `ADMIN_EMAIL` com `reply_to` configurado para o e-mail do remetente.
- **Resiliência e Fallback:** Se houver falha de rede ou falta de credenciais, o formulário orienta claramente o usuário a contatar diretamente `contato@toolbrasil.com.br`.

---

## 🔍 3. UX, Navegabilidade & Busca Inteligente

- **Busca Sem Acento & Tokenizada:** Todas as buscas (Home e `CommandPalette` / `Ctrl+K`) devem aplicar normalização Unicode NFD (`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()`) permitindo que termos digitados sem acento encontrem ferramentas acentuadas.
- **Quick-Switch Bar:** Ferramentas ativas devem exibir barra de troca rápida (`#tool-quick-switch-bar`) para permitir navegação imediata entre ferramentas da mesma categoria.
- **Histórico Local de Ferramentas:** Persistir em `localStorage` (`toolbrasil_recent_tools_v1`) as últimas ferramentas utilizadas para rápido retorno.
- **Filtros por Subcategoria:** Categorias densas (como `/calculadoras`) devem manter pílulas de filtragem contextual (*Trabalhistas*, *Finanças*, *Saúde*, *Casa*, *Matemática*).

---

## 🛠️ 4. SEO Técnico, SSG & Auditoria de Links

- **Zero Broken Links:** Antes de qualquer deploy de produção, validar que todos os `href` internos correspondem a rotas canônicas existentes no catálogo (`src/toolsData.ts`).
- **Build & Prerender:** Todo build de produção deve executar `vite build` seguido de `prerender.ts`, gerando HTML estático com schemas JSON-LD e títulos atualizados.
- **Orquestrador Multiagente (7 Subagentes):** O script `scripts/master_orchestrator.ts` deve ser executado diariamente via GitHub Actions para auditoria e autocura contínua de SEO, AdSense, Infraestrutura, Anti-Thin Content, SEO Programático, API Pública e Tração Long-Tail.
