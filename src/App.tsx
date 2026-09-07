/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  RefreshCw, 
  Package, 
  Globe, 
  Wrench, 
  FileSearch, 
  Shield, 
  Search, 
  Home, 
  ChevronRight,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Info,
  Award,
  Flame,
  Star,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Sun,
  Moon
} from 'lucide-react';

// Core data and sub-components
import { CATEGORIES, TOOLS, PROGRAMMATIC_PAGES } from './toolsData';
import { EXTRA_PROGRAMMATIC_PAGES } from './programmaticExtra';

// Merge base programmatic pages with extra long-tail SEO pages
const ALL_PROGRAMMATIC_PAGES = { ...PROGRAMMATIC_PAGES, ...EXTRA_PROGRAMMATIC_PAGES };
import Calculadoras from './components/Calculadoras';
import Conversores from './components/Conversores';
import Geradores from './components/Geradores';
import FerramentasWeb from './components/FerramentasWeb';
import Utilitarios from './components/Utilitarios';
import ProgrammaticPage from './components/ProgrammaticPage';
import Institucional from './components/Institucional';
import AdSensePlaceholder from './components/AdSensePlaceholder';
import SEOAnalyzer from './components/SEOAnalyzer';
import CommandPalette from './components/CommandPalette';
import MobileCategoryRail from './components/MobileCategoryRail';


export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => parseRoute());
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<{ [key: string]: boolean }>({});

  // Theme state: defaults to 'light', stores selection in localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('brasil_ferramentas_theme');
      if (saved === 'dark') return 'dark';
    } catch (e) {}
    return 'light';
  });

  // State to control visibility of SEOAnalyzer panel
  const [showSEOPanel, setShowSEOPanel] = useState(false);

  // Real-time rates state for the homepage ticker
  const [homeRates, setHomeRates] = useState<{ [key: string]: any }>({
    USD: { bid: 5.62, pctChange: '0.00' },
    EUR: { bid: 6.08, pctChange: '0.00' },
    GBP: { bid: 7.15, pctChange: '0.00' },
    BTC: { bid: 345000.0, pctChange: '0.00' }
  });
  const [homeRatesLoading, setHomeRatesLoading] = useState<boolean>(true);

  // Dynamic tool popularity scoring tracked in LocalStorage
  const [useCounts, setUseCounts] = useState<{ [key: string]: number }>(() => {
    try {
      const stored = localStorage.getItem('brasil_ferramentas_popularity_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading usage statistics:', e);
    }
    // High-quality defaults to bootstrap a stunning initial state
    return {
      'juros-compostos': 53,
      'cpf': 41,
      'real-para-dolar': 34,
      'senha': 25,
      'inss': 19,
      'meu-ip': 15,
      'calculadoras': 1
    };
  });

  // Manage theme dark class on document element and persist in localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('brasil_ferramentas_theme', theme);
    } catch (e) {}
  }, [theme]);

  // Fetch API rates from AwesomeAPI specifically for the homepage ticker
  useEffect(() => {
    if (currentRoute.view !== 'home') return;
    let active = true;
    const fetchHomeRates = async () => {
      setHomeRatesLoading(true);
      try {
        const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL,GBP-BRL');
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        if (active) {
          setHomeRates({
            USD: { bid: parseFloat(data.USDBRL.bid), pctChange: data.USDBRL.pctChange },
            EUR: { bid: parseFloat(data.EURBRL.bid), pctChange: data.EURBRL.pctChange },
            GBP: { bid: parseFloat(data.GBPBRL.bid), pctChange: data.GBPBRL.pctChange },
            BTC: { bid: parseFloat(data.BTCBRL.bid), pctChange: data.BTCBRL.pctChange }
          });
        }
      } catch (e) {
        console.warn('Failed to load homepage rates:', e);
      } finally {
        if (active) setHomeRatesLoading(false);
      }
    };
    fetchHomeRates();
    return () => { active = false; };
  }, [currentRoute.view]);

  // Parse state routing based on URL Pathname (with legacy hash redirection)
  function parseRoute() {
    // Legacy Redirection Support: if hash is present (e.g. #calculadoras/calculadora-de-juros-compostos)
    let hash = window.location.hash.replace('#', '');
    if (hash) {
      let redirectPath = '/' + hash;
      window.history.replaceState({}, '', redirectPath);
      window.location.hash = ''; // clear hash
    }

    let path = window.location.pathname;
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    if (!path) {
      return { view: 'home', categoryId: null, slug: null, id: null };
    }

    const parts = path.split('/');
    // Sitemap visual route is disabled for users; redirecting to home
    if (parts[0] === 'sitemap') {
      return { view: 'home', categoryId: null, slug: null, id: null };
    }
    if (parts[0] === 'programatico') {
      return { view: 'programatico', categoryId: 'programatico', slug: null, id: parts[1] };
    }
    if (parts[0] === 'institucional') {
      return { view: 'institucional', categoryId: 'institucional', slug: null, id: parts[1] };
    }
    if (parts.length === 2) {
      return { view: 'tool', categoryId: parts[0], slug: parts[1], id: null };
    }
    if (parts.length === 1) {
      const catExists = CATEGORIES.some(c => c.id === parts[0]);
      if (catExists) {
        return { view: 'category', categoryId: parts[0], slug: null, id: null };
      }
    }

    return { view: 'home', categoryId: null, slug: null, id: null };
  }

  // Set up listeners for pathname routing and internal click interception (SPA performance)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Intercept internal link clicks to keep navigation fast without full page reloads
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        const isSelfTarget = !anchor.target || anchor.target === '_self';
        const isInternal = url.origin === window.location.origin;
        const isDownload = anchor.hasAttribute('download') || url.pathname.endsWith('.xml') || url.pathname.endsWith('.txt');
        
        if (isInternal && isSelfTarget && !isDownload) {
          e.preventDefault();
          window.history.pushState({}, '', url.pathname + url.search);
          handleLocationChange();
        }
      }
    };
    window.addEventListener('click', handleLinkClick);

    // Execute once initially if hash legacy route existed
    if (window.location.hash) {
      handleLocationChange();
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Global keyboard shortcut (Ctrl+K or Cmd+K) to toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Programmatic client-side navigation for Command Palette selections
  const handleCommandNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(parseRoute());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine current active tool if any
  let activeTool = null;
  if (currentRoute.view === 'tool' && currentRoute.slug) {
    activeTool = TOOLS.find(t => t.slug === currentRoute.slug) || null;
  }

  // Dynamically set browser title and optimize meta tags in the DOM for crawlers
  useEffect(() => {
    let title = "Tool Brasil | Ferramentas Online Gratuitas";
    let desc = "Tool Brasil é o melhor portal de utilitários online gratuitos. Acesse calculadoras financeiras, geradores de CPF/CNPJ, conversores de moedas e unidades, e testadores web rápidos.";
    let pathSuffix = "";

    if (currentRoute.view === 'tool' && activeTool) {
      title = `${activeTool.title} | Tool Brasil`;
      desc = activeTool.shortDescription;
      pathSuffix = `${activeTool.categoryId}/${activeTool.slug}`;
    } else if (currentRoute.view === 'category' && currentRoute.categoryId) {
      const cat = CATEGORIES.find(c => c.id === currentRoute.categoryId);
      if (cat) {
        title = `${cat.name} | Tool Brasil`;
        desc = cat.description;
        pathSuffix = cat.id;
      }
    } else if (currentRoute.view === 'programatico' && currentRoute.id) {
      const prog = ALL_PROGRAMMATIC_PAGES[currentRoute.id];
      if (prog) {
        title = `${prog.title} | Tool Brasil`;
        desc = prog.description;
        pathSuffix = `programatico/${currentRoute.id}`;
      }
    } else if (currentRoute.view === 'institucional' && currentRoute.id) {
      title = `${currentRoute.id.toUpperCase()} | Tool Brasil`;
      desc = `Informações institucionais de ${currentRoute.id} da Tool Brasil.`;
      pathSuffix = `institucional/${currentRoute.id}`;
    }

    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', desc);
      document.head.appendChild(metaDesc);
    }

    // Update Open Graph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    // Update Open Graph Description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    const newCanonicalUrl = `https://www.toolbrasil.com.br/${pathSuffix}`;
    if (canonical) {
      canonical.setAttribute('href', newCanonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', newCanonicalUrl);
      document.head.appendChild(canonical);
    }
  }, [currentRoute, activeTool]);

  // Log and persist tool visits
  useEffect(() => {
    if (activeTool && activeTool.id) {
      setUseCounts(prev => {
        const next = { ...prev, [activeTool.id]: (prev[activeTool.id] || 0) + 1 };
        try {
          localStorage.setItem('brasil_ferramentas_popularity_v1', JSON.stringify(next));
        } catch (e) {
          console.error('Error persisting score:', e);
        }
        return next;
      });
    }
  }, [activeTool?.id]);

  // Standardized list of Featured Tools (combining metadata and clean, non-flashy visual tags)
  const featuredTools = [
    {
      id: 'juros-compostos',
      tag: '🔥 Recomendado',
      tagColor: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      tagBg: 'from-emerald-500/5 via-transparent to-transparent',
      accentColor: 'text-emerald-700',
    },
    {
      id: 'cpf',
      tag: '💻 Essencial Dev',
      tagColor: 'bg-slate-100 text-slate-800 border border-slate-300',
      tagBg: 'from-slate-500/5 via-transparent to-transparent',
      accentColor: 'text-slate-800',
    },
    {
      id: 'real-para-dolar',
      tag: '📈 Finanças',
      tagColor: 'bg-slate-100 text-slate-800 border border-slate-300',
      tagBg: 'from-slate-500/5 via-transparent to-transparent',
      accentColor: 'text-slate-800',
    },
    {
      id: 'senha',
      tag: '🔒 Segurança',
      tagColor: 'bg-slate-100 text-slate-800 border border-slate-300',
      tagBg: 'from-slate-500/5 via-transparent to-transparent',
      accentColor: 'text-slate-800',
    }
  ].map(f => {
    const rawTool = TOOLS.find(t => t.id === f.id);
    return rawTool ? { ...rawTool, ...f } : null;
  }).filter(Boolean) as any[];

  // Sort tools dynamically by popularity score (useCounts) to render 'Popular Tools'
  const popularTools = [...TOOLS]
    .filter(t => (useCounts[t.id] || 0) > 0)
    .sort((a, b) => (useCounts[b.id] || 0) - (useCounts[a.id] || 0))
    .slice(0, 4);

  // Fallback if no popular scoring is counted
  const displayPopularTools = popularTools.length >= 2 ? popularTools : TOOLS.slice(0, 4);

  // Reset local popularity counts back to pristine defaults
  const handleResetPopularity = () => {
    const resetValues = {
      'juros-compostos': 0,
      'cpf': 0,
      'real-para-dolar': 0,
      'senha': 0,
    };
    setUseCounts(resetValues);
    try {
      localStorage.setItem('brasil_ferramentas_popularity_v1', JSON.stringify(resetValues));
    } catch (e) {
      console.error(e);
    }
  };

  // Render icons dynamically
  const renderIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case 'Calculator': return <Calculator className={className} />;
      case 'RefreshCw': return <RefreshCw className={className} />;
      case 'Package': return <Package className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'FileSearch': return <FileSearch className={className} />;
      case 'Shield': return <Shield className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  const crumbs = buildBreadcrumbs();

  // Build reactive breadcrumbs
  function buildBreadcrumbs() {
    const crumbs = [{ name: 'Início', path: '/' }];

    if (currentRoute.categoryId && currentRoute.categoryId !== 'programatico' && currentRoute.categoryId !== 'institucional') {
      const cat = CATEGORIES.find(c => c.id === currentRoute.categoryId);
      if (cat) {
        crumbs.push({ name: cat.name, path: `/${cat.id}` });
      }
    }

    if (activeTool) {
      crumbs.push({ name: activeTool.title, path: `/${activeTool.categoryId}/${activeTool.slug}` });
    } else if (currentRoute.view === 'programatico' && currentRoute.id) {
      const prog = ALL_PROGRAMMATIC_PAGES[currentRoute.id];
      if (prog) {
        crumbs.push({ name: 'SEO Programático', path: '/programatico/ddd-brasil' });
        crumbs.push({ name: prog.title, path: `/programatico/${currentRoute.id}` });
      }
    } else if (currentRoute.view === 'institucional' && currentRoute.id) {
      crumbs.push({ name: 'Institucional', path: '/institucional/sobre' });
      crumbs.push({ name: currentRoute.id.toUpperCase(), path: `/institucional/${currentRoute.id}` });
    }

    return crumbs;
  }

  // Schema.org JSON-LD Structured Data
  const getBreadcrumbSchema = () => {
    const items = crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `https://www.toolbrasil.com.br${c.path}`
    }));
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items
    };
  };

  const getWebAppSchema = () => {
    if (activeTool) {
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: activeTool.title,
            url: `https://www.toolbrasil.com.br/${activeTool.categoryId}/${activeTool.slug}`,
            description: activeTool.shortDescription,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'BRL' }
          },
          {
            '@type': 'FAQPage',
            mainEntity: activeTool.faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer }
            }))
          }
        ]
      };
    }
    return null;
  };

  const breadcrumbSchema = getBreadcrumbSchema();
  const webAppSchema = getWebAppSchema();

  // Filter tools based on search input
  const getFilteredTools = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    // Tools
    const toolsMatching = TOOLS.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.shortDescription.toLowerCase().includes(query)
    ).map(t => ({ ...t, type: 'tool' }));

    // Programmatic Pages
    const progMatching = Object.entries(ALL_PROGRAMMATIC_PAGES).filter(([key, value]) => 
      value.title.toLowerCase().includes(query) ||
      value.description.toLowerCase().includes(query)
    ).map(([key, value]) => ({
      id: key,
      categoryId: 'programatico' as const,
      title: value.title,
      shortDescription: value.description,
      slug: key,
      type: 'programatico'
    }));

    return [...toolsMatching, ...progMatching];
  };

  const searchResults = getFilteredTools();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300" id="main-root">
      
      {/* Dynamic JSON-LD Structured Data for SEO / Google Search Console */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {webAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      )}

      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300" id="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-6 shrink-0">
            <a href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-emerald-600 rounded-lg text-white group-hover:scale-105 transition-transform shadow-md shadow-emerald-500/10">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-emerald-600 font-bold">
                  Tool Brasil
                </span>
                <span className="hidden sm:block text-[9px] text-slate-500 dark:text-slate-400 font-bold font-mono uppercase tracking-wider">
                  ToolBrasil.com
                </span>
              </div>
            </a>
          </div>

          {/* Category Quick Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-extrabold text-slate-800 dark:text-slate-200">
            {CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').map((cat) => {
              const isCatActive = currentRoute.categoryId === cat.id && currentRoute.view === 'category';
              return (
                <a
                  key={cat.id}
                  href={`/${cat.id}`}
                  className={`hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors py-1 ${isCatActive ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500 font-bold' : ''}`}
                >
                  {cat.name}
                </a>
              );
            })}
          </nav>

          {/* Search bar */}
          <div className="flex items-center gap-3 flex-grow max-w-xs justify-end md:max-w-md">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(p => p === 'light' ? 'dark' : 'light')}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-750 hover:cursor-pointer transition-colors shadow-xs"
              id="theme-toggle-btn"
              title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Header Universal Search Trigger / Command Palette */}
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400 rounded-full text-[11px] font-semibold transition-all border border-slate-300 dark:border-slate-700 shadow-2xs cursor-pointer group"
              id="header-search-wrapper"
              title="Buscar ferramenta (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
              <span className="hidden sm:inline">Buscar ferramenta...</span>
              <span className="sm:hidden">Buscar...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400 shadow-2xs ml-1">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE HORIZONTAL CATEGORY RAIL */}
      <MobileCategoryRail currentCategory={currentRoute.categoryId} currentView={currentRoute.view} />

      {/* HERO HERO (IF HOME) */}
      {currentRoute.view === 'home' && (
        <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 py-12 md:py-16 text-center px-4 transition-colors duration-300" id="hero-banner">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono">
              <Award className="w-4 h-4 text-emerald-605" /> 100% Gratuito, Sem Cadastro
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Ferramentas Online Gratuitas para o Dia a Dia
            </h1>
            <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base max-w-xl mx-auto font-medium">
              Sua central brasileira de utilitários rápidos para cálculos trabalhistas, segurança de senhas, decodificadores e automação.
            </p>

            {/* REAL TIME BUSCADOR (Hero) */}
            <div className="relative max-w-xl mx-auto" id="main-search-wrapper">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-full py-3.5 pl-12 pr-24 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs transition-all font-medium text-slate-900 dark:text-slate-100"
                placeholder="Pesquise entre 40+ ferramentas ex: Juros Compostos, CPF, CEP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsCommandPaletteOpen(true)}
                className="absolute inset-y-1.5 right-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-slate-250 dark:border-slate-700"
                title="Abrir Command Palette (Ctrl+K)"
              >
                <kbd className="text-[10px] font-mono">⌘K</kbd>
              </button>
            </div>

            {/* DYNAMIC REAL-TIME CURRENCY TICKER (HOMEPAGE WIDGET) */}
            <div className="pt-8 max-w-4xl mx-auto animate-fade-in" id="home-rates-ticker">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Dólar Card */}
                <a 
                  href="/conversores/real-para-dolar"
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 transition-all hover:shadow-xs text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">USD ⇄ BRL</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${parseFloat(homeRates.USD.pctChange) >= 0 ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-400'}`}>
                      {parseFloat(homeRates.USD.pctChange) >= 0 ? '▲' : '▼'} {homeRates.USD.pctChange}%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                      R$ {homeRates.USD.bid.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="block text-[9.5px] text-slate-500 dark:text-slate-400 font-bold uppercase mt-0.5">Dólar Comercial</span>
                  </div>
                </a>

                {/* Euro Card */}
                <a 
                  href="/conversores/euro-para-real"
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 transition-all hover:shadow-xs text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">EUR ⇄ BRL</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${parseFloat(homeRates.EUR.pctChange) >= 0 ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-400'}`}>
                      {parseFloat(homeRates.EUR.pctChange) >= 0 ? '▲' : '▼'} {homeRates.EUR.pctChange}%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                      R$ {homeRates.EUR.bid.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="block text-[9.5px] text-slate-500 dark:text-slate-400 font-bold uppercase mt-0.5">Euro Comercial</span>
                  </div>
                </a>

                {/* Libra Card */}
                <a 
                  href="/conversores/libra-para-real"
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 transition-all hover:shadow-xs text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">GBP ⇄ BRL</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${parseFloat(homeRates.GBP.pctChange) >= 0 ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-400'}`}>
                      {parseFloat(homeRates.GBP.pctChange) >= 0 ? '▲' : '▼'} {homeRates.GBP.pctChange}%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                      R$ {homeRates.GBP.bid.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="block text-[9.5px] text-slate-500 dark:text-slate-400 font-bold uppercase mt-0.5">Libra Esterlina</span>
                  </div>
                </a>

                {/* Bitcoin Card */}
                <a 
                  href="/conversores/bitcoin-para-real"
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-600 transition-all hover:shadow-xs text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">BTC ⇄ BRL</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full ${parseFloat(homeRates.BTC.pctChange) >= 0 ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-400'}`}>
                      {parseFloat(homeRates.BTC.pctChange) >= 0 ? '▲' : '▼'} {homeRates.BTC.pctChange}%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                      R$ {homeRates.BTC.bid.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                    <span className="block text-[9.5px] text-slate-500 dark:text-slate-400 font-bold uppercase mt-0.5">Bitcoin (BTC)</span>
                  </div>
                </a>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* ADSENSE SLOT 1 - TOPO DO PORTAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <AdSensePlaceholder slotId="slot-1" position="topo" />
      </div>

      {/* BREADCRUMBS RAIL */}
      {currentRoute.view !== 'home' && (
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4" id="breadcrumbs-rail">
          <div className="bg-white dark:bg-slate-900 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 flex-wrap text-xs text-slate-800 dark:text-slate-200 font-semibold shadow-2xs">
            {crumbs.map((c, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />}
                <a href={c.path} className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">
                  {c.name}
                </a>
              </React.Fragment>
            ))}
          </div>
        </nav>
      )}

      {/* SEARCH RESULTS BOARD */}
      {searchQuery.trim().length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6" id="search-results-board">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs animate-fade-in">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              🔍 Resultados para "{searchQuery}" ({searchResults.length})
            </h3>

            {searchResults.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold font-mono">Nenhuma ferramenta foi localizada com estes termos.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((r: any, idx) => (
                  <a
                    key={idx}
                    href={r.type === 'programatico' ? `/programatico/${r.slug}` : `/${r.categoryId}/${r.slug}`}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg hover:border-emerald-600 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all block group"
                  >
                    <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {r.title} <ArrowRight className="w-3.5 h-3.5 text-slate-500 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 font-medium">{r.shortDescription}</p>
                  </a>
                ))}
              </div>
            )}
            
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition"
            >
              Fechar Resultados
            </button>
          </div>
        </section>
      )}

      {/* MAIN CONTAINER LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6" id="main-holder">
        
        {/* LEFT NAV SIDEBAR - order-2 renders sidebar below content on mobile, left on desktop */}
        <aside className="order-2 lg:order-1 lg:col-span-1 space-y-4" id="left-sidebar">
          
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Categorias
            </h3>
            
            <nav className="space-y-1">
              <a
                href="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${currentRoute.view === 'home' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'}`}
              >
                <Home className="w-4 h-4 text-slate-500" /> Início / Home
              </a>

              {CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').map((cat) => {
                const isActive = currentRoute.categoryId === cat.id && currentRoute.view === 'category';
                return (
                  <a
                    key={cat.id}
                    href={`/${cat.id}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all ${isActive ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold' : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white'}`}
                  >
                    <div className="flex items-center gap-2">
                      {renderIcon(cat.icon, "w-4 h-4 text-slate-500")}
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[9.5px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold rounded px-1.5 py-0.5">
                      {TOOLS.filter(t => t.categoryId === cat.id).length}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* DYNAMIC METRIC DISPATCHER */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <span className="text-[10px] font-extrabold text-slate-900 dark:text-slate-100 uppercase flex items-center gap-1.5">
              <FileSearch className="w-3.5 h-3.5 text-slate-500" /> Conteúdo Programático
            </span>
            <div className="grid grid-cols-1 gap-1">
              <a href="/programatico/ddd-brasil" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono font-semibold">▸ DDD Brasil</a>
              <a href="/programatico/cep-brasil" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono font-semibold">▸ CEP Correios</a>
              <a href="/programatico/bancos-brasil" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono font-semibold">▸ Bancos & ISPB</a>
              <a href="/programatico/salario-minimo-historico" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono font-semibold">▸ Salário Mínimo Histórico</a>
              <a href="/programatico/feriados-nacionais" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono font-semibold">▸ Feriados Nacionais</a>
              <a href="/programatico/selic-historica" className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono font-semibold">▸ Taxa SELIC Histórica</a>
            </div>
            <a href="/" className="text-[10px] text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold block pt-1">
              Ir para o Início →
            </a>
          </div>

          <AdSensePlaceholder slotId="slot-3" position="sidebar" />
        </aside>

        {/* PRIMARY CONTENT VIEWER - order-1 renders content above sidebar on mobile, right on desktop */}
        <section className="order-1 lg:order-2 lg:col-span-3 space-y-6" id="primary-content-view">
          
          {/* 1. HOME VIEW */}
          {currentRoute.view === 'home' && (
            <div className="space-y-6" id="view-home">
              
              {/* FEATURED & POPULAR */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-2" id="dashboard-destaques-populares">
                
                {/* CURATED FEATURED SECTION */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs" id="featured-tools-section">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      </div>
                      <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                        Ferramentas em Destaque
                      </h2>
                    </div>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-400 font-mono px-2 py-0.5 rounded font-extrabold border border-slate-200 dark:border-slate-700">
                      Recomendado
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal font-medium">
                    Utilitários de alta performance e grande relevância selecionados para otimizar suas atividades diárias.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {featuredTools.map((tool) => (
                      <a
                        key={tool.id}
                        href={`/${tool.categoryId}/${tool.slug}`}
                        className="group relative p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-emerald-600 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs transition-all duration-300 flex flex-col justify-between space-y-2"
                      >
                        <div className="space-y-1">
                          <span className={`inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${tool.tagColor}`}>
                            {tool.tag}
                          </span>
                          <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-xs sm:text-xs group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between gap-1">
                            <span>{tool.title.replace('Calculadora de ', '').replace('Gerador de ', '').replace('Conversor de ', '')}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </h3>
                        </div>
                        <p className="text-[11.5px] text-slate-700 dark:text-slate-300 leading-normal line-clamp-2 font-medium">
                          {tool.shortDescription}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* DYNAMICAL POPULAR TOOLS SECTION */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs" id="popular-tools-section">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <Flame className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      </div>
                      <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                        Ferramentas Mais Acessadas
                      </h2>
                    </div>
                    {popularTools.length > 0 && (
                      <button
                        onClick={handleResetPopularity}
                        className="p-1 px-2 flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded hover:cursor-pointer transition font-bold"
                        title="Limpar estatísticas de uso"
                      >
                        <RotateCcw className="w-2.5 h-2.5" /> Zerar Histórico
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal font-medium">
                    Seu ranqueamento de uso local. Atualizado em tempo real à medida que você navega pelas ferramentas.
                  </p>

                  <div className="space-y-2 pt-1">
                    {displayPopularTools.map((tool, index) => {
                      const visits = useCounts[tool.id] || 0;
                      const rankStyle = index === 0 
                        ? 'bg-slate-700 dark:bg-slate-600 border-slate-600 text-white font-bold'
                        : index === 1
                        ? 'bg-slate-600 dark:bg-slate-700 border-slate-500 text-white font-bold'
                        : index === 2
                        ? 'bg-slate-500 dark:bg-slate-800 border-slate-400 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-250 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold';

                      return (
                        <a
                          key={tool.id}
                          href={`/${tool.categoryId}/${tool.slug}`}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-emerald-500 transition-all duration-200 group"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full border text-xs font-mono font-black flex items-center justify-center shrink-0 ${rankStyle}`}>
                              {index + 1}
                            </span>
                            <div className="min-w-0">
                              <span className="text-[8.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">
                                {CATEGORIES.find(c => c.id === tool.categoryId)?.name || tool.categoryId}
                              </span>
                              <span className="font-extrabold text-slate-900 dark:text-slate-100 text-xs group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors block truncate">
                                {tool.title}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 pr-0.5 shrink-0">
                            {visits > 0 ? (
                              <div className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 font-mono font-bold">
                                <TrendingUp className="w-3 h-3 text-emerald-605" />
                                <span>{visits} {visits === 1 ? 'visita' : 'visitas'}</span>
                              </div>
                            ) : (
                              <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono uppercase bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                                Sugerido
                              </div>
                            )}
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* CATEGORIES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CATEGORIES.filter(c => c.id !== 'institucional' && c.id !== 'programatico').map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 p-5 rounded-xl space-y-3 shadow-xs hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-emerald-600 dark:text-emerald-400">
                        {renderIcon(cat.icon, "w-5 h-5")}
                      </div>
                      <h3 className="font-black text-base text-slate-900 dark:text-slate-100">
                        {cat.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal font-medium">
                      {cat.description}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {TOOLS.filter(t => t.categoryId === cat.id).slice(0, 4).map((tool) => (
                        <a
                          key={tool.id}
                          href={`/${cat.id}/${tool.slug}`}
                          className="text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition font-semibold"
                        >
                          {tool.title.replace('Calculadora de ', '').replace('Conversor de ', '')}
                        </a>
                      ))}
                    </div>
                    <a
                      href={`/${cat.id}`}
                      className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold block pt-1 hover:underline flex items-center gap-1"
                    >
                      Acessar todas →
                    </a>
                  </div>
                ))}
              </div>

              {/* SEARCH SUGGESTIONS - LONG TAIL KEYWORDS */}
              <div className="bg-emerald-900/5 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 p-5 rounded-xl space-y-3">
                <h3 className="text-sm font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> 🔍 Principais Consultas do Google
                </h3>
                <p className="text-[11.5px] text-slate-700 dark:text-slate-300 font-medium">As ferramentas mais buscadas pelos brasileiros — todas gratuitas e sem necessidade de cadastro.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <a href="/calculadoras/calculadora-de-juros-compostos" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Calcular Juros Compostos</a>
                  <a href="/calculadoras/calculadora-de-emprestimo-consignado" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Simular Consignado INSS</a>
                  <a href="/calculadoras/simulador-de-financiamento-de-veiculos" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Financiamento de Veículos</a>
                  <a href="/geradores/gerador-de-assinatura-de-email" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Assinatura E-mail HTML</a>
                  <a href="/utilitarios/conversor-de-texto-em-voz" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Ouvir Texto em Voz</a>
                  <a href="/utilitarios/teste-de-velocidade-de-digitacao" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Teste Digitação WPM</a>
                  <a href="/geradores/gerador-de-cpf" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Gerar CPF Válido</a>
                  <a href="/conversores/converter-real-para-dolar" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Real para Dólar Hoje</a>
                  <a href="/programatico/ddd-brasil" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Lista de DDDs Brasil</a>
                  <a href="/calculadoras/calculadora-desconto-inss" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Calcular INSS 2026</a>
                  <a href="/geradores/gerador-de-senha-segura" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Gerar Senha Segura</a>
                  <a href="/conversores/converter-euro-para-real" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Real para Euro Hoje</a>
                  <a href="/utilitarios/meu-ip" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Qual é o Meu IP?</a>
                  <a href="/programatico/cep-brasil" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Buscar CEP Online</a>
                  <a href="/calculadoras/calcular-imc" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Calcular IMC Grátis</a>
                  <a href="/geradores/gerador-de-qr-code" className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:border-emerald-600 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-900 dark:text-slate-100 transition">Gerar QR Code</a>
                </div>
              </div>
            </div>
          )}

          {/* 2. CATEGORY ARCHIVE VIEW */}
          {currentRoute.view === 'category' && currentRoute.categoryId && (
            <div className="space-y-6" id="view-category">
              {(() => {
                const cat = CATEGORIES.find(c => c.id === currentRoute.categoryId);
                if (!cat) return null;
                return (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-3 shadow-xs">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{cat.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {TOOLS.filter(t => t.categoryId === cat.id).map((tool) => (
                        <a
                          key={tool.id}
                          href={`/${cat.id}/${tool.slug}`}
                          className="bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl hover:border-emerald-600 transition-all block group"
                        >
                          <span className="font-extrabold text-base text-slate-900 dark:text-slate-100 block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {tool.title}
                          </span>
                          <span className="text-[12px] text-slate-600 dark:text-slate-400 mt-1 block line-clamp-2 font-semibold">
                            {tool.shortDescription}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 3. ACTIVE TOOL DISPLAY */}
          {currentRoute.view === 'tool' && activeTool && (
            <div className="space-y-6" id="view-tool">
              
              {/* Tool Execution Container */}
              <div id="active-tool-workspace">
                {activeTool.categoryId === 'calculadoras' && <Calculadoras toolId={activeTool.id} />}
                {activeTool.categoryId === 'conversores' && <Conversores toolId={activeTool.id} />}
                {activeTool.categoryId === 'geradores' && <Geradores toolId={activeTool.id} />}
                {activeTool.categoryId === 'ferramentas-web' && <FerramentasWeb toolId={activeTool.id} />}
                {activeTool.categoryId === 'utilitarios' && <Utilitarios toolId={activeTool.id} />}
              </div>

              {/* ADSENSE MID TOPO & RICH SEO TEXTUAL CONTENT (apenas para ferramentas que usam layout padrão) */}
              {activeTool.id !== 'descomplica-contrato' && (
                <>
                  <AdSensePlaceholder slotId="slot-2" position="meio" />

                  <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6 text-sm shadow-xs" id="tool-editorial-content">
                    
                    {/* Intro */}
                    <div className="space-y-2">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-1.5">
                        <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Introdução
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                        {activeTool.longIntro}
                      </p>
                    </div>

                    {/* How it works */}
                    <div className="space-y-2">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-1.5">
                        <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Como Funciona?
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                        {activeTool.howItWorks}
                      </p>
                    </div>

                    {/* Tips */}
                    {activeTool.tips && activeTool.tips.length > 0 && (
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-4 rounded-lg space-y-2">
                        <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-300 uppercase tracking-wide">
                          💡 Dicas de Uso e Boas Práticas:
                        </h4>
                        <ul className="list-disc pl-5 text-slate-800 dark:text-slate-200 text-sm space-y-1.5">
                          {activeTool.tips.map((tip, idx) => (
                            <li key={idx} className="font-semibold">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* FAQ Accordions */}
                    {activeTool.faqs && activeTool.faqs.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h3 className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                          Perguntas Frequentes (FAQ)
                        </h3>
                        
                        <div className="divide-y divide-slate-200 dark:divide-slate-800">
                          {activeTool.faqs.map((faq, idx) => {
                            const faqKey = `${activeTool?.id}-${idx}`;
                            const isOpen = faqOpen[faqKey];
                            return (
                              <div key={idx} className="py-2.5">
                                <button
                                  onClick={() => setFaqOpen(p => ({ ...p, [faqKey]: !isOpen }))}
                                  className="w-full text-left font-bold text-slate-900 dark:text-slate-100 text-xs flex justify-between items-center transition hover:text-emerald-700 dark:hover:text-emerald-400 hover:cursor-pointer"
                                >
                                  <span>{faq.question}</span>
                                  <span className="text-slate-500 dark:text-slate-400">{isOpen ? '−' : '+'}</span>
                                </button>
                                {isOpen && (
                                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 font-medium leading-relaxed animate-fade-in pl-1">
                                    {faq.answer}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* RELATIVE INTERLINKING SYSTEM */}
                    {activeTool.relatedToolIds && activeTool.relatedToolIds.length > 0 && (
                      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                          🔗 Ferramentas Relacionadas Recomendadas:
                        </span>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {activeTool.relatedToolIds.map((relId) => {
                            const matched = TOOLS.find(t => t.id === relId);
                            if (!matched) return null;
                            return (
                              <a
                                key={relId}
                                href={`/${matched.categoryId}/${matched.slug}`}
                                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold transition"
                              >
                                {matched.title}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </article>
                </>
              )}

              {/* COMPARTILHAMENTO SOCIAL VIRAL */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs" id="share-tool-section">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xs font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Compartilhe esta Ferramenta</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(`https://www.toolbrasil.com.br/${activeTool.categoryId}/${activeTool.slug}`);
                      const text = encodeURIComponent(`${activeTool.title} - Tool Brasil`);
                      window.open(`https://wa.me/?text=${text}%20${url}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition hover:cursor-pointer shadow-xs"
                    title="Compartilhar no WhatsApp"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(`https://www.toolbrasil.com.br/${activeTool.categoryId}/${activeTool.slug}`);
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition hover:cursor-pointer shadow-xs"
                    title="Compartilhar no Facebook"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z"/></svg>
                    Facebook
                  </button>
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(`https://www.toolbrasil.com.br/${activeTool.categoryId}/${activeTool.slug}`);
                      const text = encodeURIComponent(`${activeTool.title} - Tool Brasil`);
                      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition hover:cursor-pointer shadow-xs"
                    title="Compartilhar no X (Twitter)"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X (Twitter)
                  </button>
                  <button
                    onClick={() => {
                      const url = encodeURIComponent(`https://www.toolbrasil.com.br/${activeTool.categoryId}/${activeTool.slug}`);
                      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition hover:cursor-pointer shadow-xs"
                    title="Compartilhar no LinkedIn"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </button>
                  <button
                    onClick={() => {
                      const url = `https://www.toolbrasil.com.br/${activeTool.categoryId}/${activeTool.slug}`;
                      navigator.clipboard.writeText(url);
                      const btn = document.getElementById('copy-link-btn');
                      if (btn) { btn.textContent = '✅ Copiado!'; setTimeout(() => { if (btn) btn.textContent = '📋 Copiar Link'; }, 2000); }
                    }}
                    id="copy-link-btn"
                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition hover:cursor-pointer shadow-xs border border-slate-200 dark:border-slate-700"
                    title="Copiar link"
                  >
                    📋 Copiar Link
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-3 text-center font-bold">
                  Ajude outras pessoas a descobrirem esta ferramenta! Compartilhe nas suas redes sociais. 💚
                </p>
              </div>

              {/* DYNAMIC SEO AUDIT PANEL INTEGRATION */}
              <div className="border border-slate-300 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900 shadow-xs space-y-4" id="tool-seo-audit-wrapper">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                      📊 Modo Auditor (Otimização SEO)
                    </h4>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">Analise as tags indexáveis, estrutura Schema JSON-LD e pré-visualização de SERP do Google.</p>
                  </div>
                  <button
                    onClick={() => setShowSEOPanel(p => !p)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-750 transition hover:cursor-pointer shadow-xs"
                    id="btn-toggle-seo-panel"
                  >
                    {showSEOPanel ? 'Ocultar Painel ✕' : 'Exibir Painel Auditoria'}
                  </button>
                </div>

                {showSEOPanel && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <SEOAnalyzer tool={activeTool} />
                  </div>
                )}
              </div>

            </div>
          )}

          {/* 4. PROGRAMMATIC PAGE VIEW */}
          {currentRoute.view === 'programatico' && currentRoute.id && (
            <div className="space-y-6" id="view-programmatic">
              <ProgrammaticPage id={currentRoute.id} />
              
              {/* INTERLINKING BACK TO HOME FOR INDEXATION */}
              <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs space-y-2 flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300 font-semibold">Deseja calcular outros índices corporativos do Brasil?</span>
                <a href="/" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded text-[11px] font-mono transition-colors">
                  Lista de Ferramentas
                </a>
              </div>
            </div>
          )}

          {/* 5. INSTITUTIONAL VIEWS */}
          {currentRoute.view === 'institucional' && currentRoute.id && (
            <div id="view-institutional-module">
              <Institucional pageId={currentRoute.id} />
            </div>
          )}

          {/* ADSENSE BOTTOM ANCHOR */}
          <AdSensePlaceholder slotId="slot-4" position="final" />

        </section>
      </main>

      {/* FOOTER DISCLOSURES & DISPATCHERS */}
      <footer className="bg-slate-900 border-t border-slate-850 py-12 text-slate-400 mt-12 text-sm font-semibold" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Calculadoras Populares</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="/calculadoras/calculadora-de-juros-compostos" className="hover:text-emerald-400">Juros Compostos</a></li>
                <li><a href="/calculadoras/simulador-de-financiamento" className="hover:text-emerald-400">Financiamento SAC/Price</a></li>
                <li><a href="/calculadoras/calculadora-de-ferias-trabalhista" className="hover:text-emerald-400">Férias CLT</a></li>
                <li><a href="/calculadoras/calculadora-de-rescisao-trabalhista" className="hover:text-emerald-400">Rescisão Trabalhista</a></li>
                <li><a href="/calculadoras/calculadora-desconto-inss" className="hover:text-emerald-400">Calcular INSS 2026</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Conversores & Dados</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="/conversores/converter-real-para-dolar" className="hover:text-emerald-400">Real para Dólar</a></li>
                <li><a href="/conversores/converter-euro-para-real" className="hover:text-emerald-400">Real para Euro</a></li>
                <li><a href="/conversores/converter-mb-para-gb" className="hover:text-emerald-400">MB para GB</a></li>
                <li><a href="/conversores/converter-metros-para-pes" className="hover:text-emerald-400">Metros para Pés</a></li>
                <li><a href="/conversores/converter-libra-para-real" className="hover:text-emerald-400">Libra para Real</a></li>
                <li><a href="/conversores/converter-peso-argentino-para-real" className="hover:text-emerald-400">Peso Argentino</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Geradores & Utilitários</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="/geradores/gerador-de-cpf" className="hover:text-emerald-400">Gerador CPF</a></li>
                <li><a href="/geradores/gerador-de-cnpj" className="hover:text-emerald-400">Gerador CNPJ</a></li>
                <li><a href="/geradores/gerador-de-senha-segura" className="hover:text-emerald-400">Gerar Senha Forte</a></li>
                <li><a href="/geradores/gerador-de-qr-code" className="hover:text-emerald-400">QR Code Grátis</a></li>
                <li><a href="/utilitarios/validador-de-cartao-de-credito" className="hover:text-emerald-400">Validar Cartão</a></li>
                <li><a href="/geradores/gerador-de-rg" className="hover:text-emerald-400">Gerador RG</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">📊 Conteúdo Programático</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="/programatico/ddd-brasil" className="hover:text-emerald-400">Códigos DDD Brasil</a></li>
                <li><a href="/programatico/cep-brasil" className="hover:text-emerald-400">Buscar CEP Correios</a></li>
                <li><a href="/programatico/bancos-brasil" className="hover:text-emerald-400">Bancos & ISPB</a></li>
                <li><a href="/programatico/salario-minimo-historico" className="hover:text-emerald-400">Salário Mínimo Histórico</a></li>
                <li><a href="/programatico/selic-historica" className="hover:text-emerald-400">Taxa SELIC Histórica</a></li>
                <li><a href="/programatico/feriados-nacionais" className="hover:text-emerald-400">Feriados Nacionais</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Institucional</h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="/institucional/sobre" className="hover:text-emerald-400">Sobre Nós</a></li>
                <li><a href="/institucional/contato" className="hover:text-emerald-400">Contato / Fale Conosco</a></li>
                <li><a href="/institucional/privacidade" className="hover:text-emerald-400">Política de Privacidade</a></li>
                <li><a href="/institucional/termos" className="hover:text-emerald-400">Termos de Uso</a></li>
                <li><a href="/institucional/cookies" className="hover:text-emerald-400">Política de Cookies</a></li>
                <li><a href="/institucional/anunciantes" className="hover:text-emerald-400">Anunciar / AdSense</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center md:flex md:items-center md:justify-between text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} <strong className="text-slate-300">Tool Brasil</strong>. Todos os direitos reservados. Ferramentas 100% gratuitas — sem cadastro, sem limites.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4 md:mt-0 flex-wrap text-slate-400">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded text-[10px] font-mono border border-emerald-800/50">
                ✅ 100% Grátis
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-900/30 text-emerald-400 rounded text-[10px] font-mono border border-slate-800/50">
                🔒 Sem Cadastro
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-900/30 text-emerald-400 rounded text-[10px] font-mono border border-slate-800/50">
                🇧🇷 Feito no Brasil
              </span>
              <span className="text-slate-600 select-none font-mono">v2.1.0</span>
              <a href="/sitemap.xml" className="hover:text-emerald-400 underline underline-offset-2">sitemap.xml</a>
              <a href="/robots.txt" className="hover:text-emerald-400 underline underline-offset-2">robots.txt</a>
            </div>
          </div>


        </div>
      </footer>

      {/* GLOBAL COMMAND PALETTE (CTRL+K / CMD+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleCommandNavigate}
      />

      {/* SCHEMA.ORG STRUCTURED DATA - using dangerouslySetInnerHTML to prevent React escaping */}
      <script type="application/ld+json" id="schema-breadcrumb" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {webAppSchema && (
        <script type="application/ld+json" id="schema-webapp" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      )}
    </div>
  );
}
