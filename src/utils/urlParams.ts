/**
 * Utilitários para sincronização bidirecional de parâmetros na URL
 * Permite que qualquer calculadora ou gerador salve seu estado na URL
 * tornando os resultados 100% compartilháveis via WhatsApp, Telegram e redes.
 */

export function getParamNumber(key: string, defaultValue: number): number {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const params = new URLSearchParams(window.location.search);
    const val = params.get(key);
    if (val !== null && !isNaN(Number(val))) {
      return Number(val);
    }
  } catch (e) {
    console.error('Erro ao ler parâmetro numérico da URL:', e);
  }
  return defaultValue;
}

export function getParamString(key: string, defaultValue: string): string {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const params = new URLSearchParams(window.location.search);
    const val = params.get(key);
    if (val !== null && val.trim() !== '') {
      return val;
    }
  } catch (e) {
    console.error('Erro ao ler parâmetro de texto da URL:', e);
  }
  return defaultValue;
}

export function getParamBoolean(key: string, defaultValue: boolean): boolean {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const params = new URLSearchParams(window.location.search);
    const val = params.get(key);
    if (val !== null) {
      return val === '1' || val === 'true' || val === 'sim';
    }
  } catch (e) {
    console.error('Erro ao ler parâmetro booleano da URL:', e);
  }
  return defaultValue;
}

/**
 * Atualiza os parâmetros de URL no navegador de forma suave (replaceState),
 * sem provocar recarga da página e preservando a navegação SPA.
 */
export function syncUrlParams(paramsRecord: Record<string, string | number | boolean | undefined | null>) {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    
    Object.entries(paramsRecord).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const queryString = params.toString();
    const newRelativePathQuery = window.location.pathname + (queryString ? '?' + queryString : '');
    
    // Atualiza a barra de endereços apenas se houve mudança real
    if (window.location.pathname + window.location.search !== newRelativePathQuery) {
      window.history.replaceState(window.history.state, '', newRelativePathQuery);
    }
  } catch (e) {
    console.error('Erro ao sincronizar parâmetros na URL:', e);
  }
}

/**
 * Gera a URL canônica completa atual com os parâmetros ativos
 */
export function getCurrentShareableUrl(): string {
  if (typeof window === 'undefined') return 'https://www.toolbrasil.com.br';
  return window.location.href;
}
