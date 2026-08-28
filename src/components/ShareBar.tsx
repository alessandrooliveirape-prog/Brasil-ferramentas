/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Copy, Check, Printer, Sparkles, Send } from 'lucide-react';
import { getCurrentShareableUrl } from '../utils/urlParams';

interface ShareBarProps {
  title: string;
  summaryText?: string;
  onPrint?: () => void;
  showPrint?: boolean;
  className?: string;
}

export default function ShareBar({
  title,
  summaryText,
  onPrint,
  showPrint = true,
  className = ''
}: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const getFullShareText = () => {
    const url = getCurrentShareableUrl();
    const intro = summaryText 
      ? `📊 *${title}*\n\n${summaryText}\n\n👉 Veja o resultado completo e recalcule no Tool Brasil:\n${url}`
      : `🛠️ *${title}* no Tool Brasil:\n${url}`;
    return { text: intro, url };
  };

  const handleCopyLink = async () => {
    try {
      const url = getCurrentShareableUrl();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback legado
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setShowToast(true);
      setTimeout(() => setCopied(false), 3000);
      setTimeout(() => setShowToast(false), 3500);
    } catch (e) {
      console.error('Erro ao copiar link:', e);
    }
  };

  const handleWhatsAppShare = () => {
    const { text } = getFullShareText();
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramShare = () => {
    const { url, text } = getFullShareText();
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text.replace(url, ''))}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    const { text, url } = getFullShareText();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: summaryText || title,
          url
        });
      } catch (err) {
        // Usuário cancelou o compartilhamento nativo
      }
    } else {
      handleCopyLink();
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className={`mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 no-print ${className}`}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 animate-bounce text-xs font-bold">
          <span className="p-1 bg-emerald-500 text-slate-900 rounded-full">
            <Check className="w-3.5 h-3.5" />
          </span>
          Link com seus dados preenchidos copiado com sucesso!
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-slate-100/70 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border border-emerald-200/60 dark:border-slate-700 shadow-sm">
        
        {/* Chamada */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-md">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              Compartilhe ou Salve este Resultado
              <Sparkles className="w-3 h-3 text-amber-500 inline" />
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              O link contém todos os seus valores preenchidos automaticamente.
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
          {/* Botão WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-extrabold shadow-sm transition hover:shadow cursor-pointer"
            title="Compartilhar no WhatsApp"
          >
            <Send className="w-3.5 h-3.5 rotate-45" />
            WhatsApp
          </button>

          {/* Botão Copiar Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 text-xs font-bold shadow-sm transition cursor-pointer"
            title="Copiar link com parâmetros"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                Copiar Link
              </>
            )}
          </button>

          {/* Botão Compartilhar Nativo (Mobile) */}
          {hasNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
              title="Mais opções de compartilhamento"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Botão Imprimir / Salvar em PDF */}
          {showPrint && (
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-extrabold shadow-sm transition cursor-pointer"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir / PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
