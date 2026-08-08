<div align="center">

# 🛠️ Tool Brasil — Ferramentas Online Gratuitas

**Portal web moderno, ultrarrápido e completo de utilitários online gratuitos, calculadoras, conversores, geradores e diagnósticos web.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🌐 Acesse o portal online](https://www.toolbrasil.com.br/)

</div>

---

## 📌 Sobre o Projeto

O **Tool Brasil** ([toolbrasil.com.br](https://www.toolbrasil.com.br/)) é uma plataforma web responsiva de alta performance projetada para fornecer dezenas de utilitários online essenciais para o dia a dia de profissionais, estudantes, empreendedores e desenvolvedores.

Todas as ferramentas funcionam **100% no navegador (Client-Side First)** com privacidade garantida, sem exigir cadastros, downloads de softwares ou pagamentos. O projeto conta também com integração à API **Google Gemini AI** para recursos inteligentes e um sistema avançado de **Pré-renderização Estática (SSG)** para otimização máxima de SEO e performance de carregamento.

---

## 🚀 Principais Módulos e Ferramentas

O portal organiza suas ferramentas em categorias bem estruturadas e intuitivas:

### 🧮 Calculadoras
- **Calculadora de Churrasco**: Estimativa inteligente de carnes, bebidas, acompanhamentos e insumos por perfil de convidado.
- **Calculadoras Financeiras & Trabalhistas**: Rescisão, Férias, Décimo Terceiro, Juros Compostos, Financiamentos e Investimentos.
- **Calculadoras de Saúde**: IMC (Índice de Massa Corporal), Calorias Diárias (TMB), Água Diária e Macronutrientes.

### 🔄 Conversores
- **Conversor de Unidades**: Comprimento, Massa, Temperatura, Volume, Área e Pressão.
- **Conversor de Tempo & Dados**: Horas/Minutos/Segundos, Bytes/KB/MB/GB/TB.
- **Conversor de Moedas**: Cotações de moedas internacionais em tempo real.

### ⚡ Geradores
- **Gerador de Link de WhatsApp**: Criação de links curtos (`wa.me`) com mensagem inicial pré-formatada.
- **Gerador de Documentos**: CPF, CNPJ e dados fictícios para testes em desenvolvimento e QA.
- **Gerador de Senhas Fortes**: Algoritmo seguro com personalização de símbolos, números e comprimento.
- **Gerador de QR Code & Barcode**: Geração instantânea de códigos visuais para compartilhamento.
- **Gerador de Lorem Ipsum & UUID**: Ferramentas práticas para prototipagem e design.

### 🌐 Ferramentas Web & SEO
- **Analisador de SEO On-Page**: Verificação de meta tags, estrutura de títulos, headings e otimização.
- **Meu IP & Diagnóstico de Rede**: Exibição de IP público, geolocalização e teste de latência/ping.
- **HTTP Header Checker & DNS Lookup**: Inspeção de cabeçalhos de resposta HTTP e registros DNS.

### 🛠️ Utilitários de Texto e Código
- **Contador de Caracteres & Palavras**: Métricas detalhadas de texto, tempo estimado de leitura e densidade de palavras.
- **Formatador & Validador JSON**: Indentação, minificação e validação de estruturas JSON.
- **Minificador Web**: Minificação de código HTML, CSS e JavaScript.
- **Comparador de Textos (Diff)**: Destaque visual de diferenças entre textos e códigos.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend Core**: [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/)
- **Build Tool & Bundler**: [Vite 6](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes & Ícones**: [Lucide React](https://lucide.dev/)
- **Animações**: [Motion (Framer Motion)](https://motion.dev/)
- **Inteligência Artificial**: [Google Gemini API (`@google/genai`)](https://ai.google.dev/)
- **Pré-renderização & SEO (SSG)**: Script em TypeScript (`prerender.ts`) executado via Node/tsx
- **Monetização & Métricas**: Google AdSense & Google Analytics 4

---

## 📁 Estrutura do Projeto

```text
Brasil-ferramentas/
├── public/                 # Arquivos estáticos (favicons, sitemap, robots.txt)
├── src/
│   ├── components/         # Componentes da interface organizados por tipo de ferramenta
│   │   ├── Calculadoras.tsx
│   │   ├── Conversores.tsx
│   │   ├── FerramentasWeb.tsx
│   │   ├── Geradores.tsx
│   │   ├── Institucional.tsx
│   │   ├── ProgrammaticPage.tsx
│   │   ├── SEOAnalyzer.tsx
│   │   ├── Sitemap.tsx
│   │   └── Utilitarios.tsx
│   ├── config/             # Configurações de serviços e APIs
│   ├── App.tsx             # Componente principal e roteamento da aplicação
│   ├── main.tsx            # Ponto de entrada do React
│   ├── toolsData.ts        # Catálogo centralizado com metadados e lógica das ferramentas
│   ├── programmaticExtra.ts# Páginas estáticas para SEO Programático
│   ├── types.ts            # Interfaces e tipos globais em TypeScript
│   └── index.css           # Estilos globais e configuração do Tailwind CSS
├── prerender.ts            # Script SSG para pré-renderizar HTMLs estáticos (SEO / AdSense)
├── vite.config.ts          # Configuração do Vite
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts do projeto
```

---

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** v18 ou superior instalado
- **npm** (incluso com o Node.js)

### 1. Clonar o repositório e instalar dependências
```bash
git clone https://github.com/makinariotrader-cyber/Brasil-ferramentas.git
cd Brasil-ferramentas
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto definindo a chave da API do Google Gemini:
```env
GEMINI_API_KEY=sua_chave_aqui
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Acesse a aplicação em `http://localhost:3000`.

---

## 📦 Build e Pré-renderização (SSG)

Para compilar a aplicação e pré-renderizar todas as páginas em HTML estático para máxima otimização de SEO:

```bash
npm run build
```

O comando executará `vite build` seguido de `npx tsx prerender.ts`, armazenando os arquivos em `dist/`.

Para visualizar o build gerado localmente:
```bash
npm run preview
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite na porta 3000 |
| `npm run build` | Compila a aplicação Vite e executa a pré-renderização estática (`prerender.ts`) |
| `npm run preview` | Serve a pasta `dist/` para pré-visualização do ambiente de produção |
| `npm run lint` | Executa a verificação estática de tipos TypeScript (`tsc --noEmit`) |
| `npm run clean` | Limpa diretórios temporários de build e saída de servidor |
