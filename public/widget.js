/**
 * Tool Brasil - Widget Embeddable JavaScript v1.0
 * (c) Tool Brasil - https://www.toolbrasil.com.br
 * 
 * Permite a incorporação gratuita de utilitários e calculadoras em blogs e sites parceiros.
 * Processamento 100% local no cliente, leve (< 4 KB), responsivo e seguro.
 */
(function() {
  'use strict';

  function initWidgets() {
    var targets = document.querySelectorAll('#tool-brasil-widget, .tool-brasil-widget, [data-tool-brasil]');
    if (!targets.length) return;

    for (var i = 0; i < targets.length; i++) {
      var el = targets[i];
      if (el.getAttribute('data-tb-initialized')) continue;
      el.setAttribute('data-tb-initialized', 'true');

      var toolType = el.getAttribute('data-tool') || 'validador-documentos';
      var theme = el.getAttribute('data-theme') || 'light';
      var isDark = theme === 'dark';

      renderWidget(el, toolType, isDark);
    }
  }

  function getBaseStyles(isDark) {
    var bg = isDark ? '#0f172a' : '#ffffff';
    var text = isDark ? '#f8fafc' : '#0f172a';
    var border = isDark ? '#334155' : '#e2e8f0';
    var inputBg = isDark ? '#1e293b' : '#f8fafc';
    var inputBorder = isDark ? '#475569' : '#cbd5e1';
    var textMuted = isDark ? '#94a3b8' : '#64748b';
    var brand = '#059669';
    var brandHover = '#047857';

    return {
      bg: bg,
      text: text,
      border: border,
      inputBg: inputBg,
      inputBorder: inputBorder,
      textMuted: textMuted,
      brand: brand,
      brandHover: brandHover
    };
  }

  function renderWidget(container, toolType, isDark) {
    var s = getBaseStyles(isDark);
    container.style.boxSizing = 'border-box';
    container.style.maxWidth = '100%';
    container.style.width = '100%';
    container.style.margin = '0 auto';
    container.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    if (toolType === 'juros-compostos') {
      renderJurosCompostos(container, s);
    } else if (toolType === 'tabela-inss') {
      renderTabelaINSS(container, s);
    } else {
      renderValidadorDocs(container, s);
    }
  }

  // --- 1. VALIDADOR DE DOCUMENTOS (CPF / CNPJ) ---
  function renderValidadorDocs(c, s) {
    c.innerHTML = [
      '<div style="background:' + s.bg + '; color:' + s.text + '; border:1px solid ' + s.border + '; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">',
        '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">',
          '<strong style="font-size:15px; display:flex; align-items:center; gap:6px;">',
            '<span>🛡️</span> Validador de CPF / CNPJ',
          '</strong>',
          '<span style="font-size:11px; font-weight:bold; color:' + s.brand + '; background:rgba(5,150,105,0.1); padding:2px 8px; border-radius:20px;">Gratuito</span>',
        '</div>',
        '<p style="font-size:12px; color:' + s.textMuted + '; margin:0 0 12px 0;">Digite o número do documento para validação matemática instantânea:</p>',
        '<div style="margin-bottom:12px;">',
          '<input type="text" id="tb-doc-input" placeholder="Ex: 000.000.000-00 ou 00.000.000/0001-00" style="width:100%; box-sizing:border-box; padding:10px 12px; border:1px solid ' + s.inputBorder + '; background:' + s.inputBg + '; color:' + s.text + '; border-radius:8px; font-size:14px; outline:none; font-family:monospace;" />',
        '</div>',
        '<div id="tb-doc-result" style="display:none; padding:10px 12px; border-radius:8px; font-size:13px; font-weight:bold; margin-bottom:12px;"></div>',
        '<div style="border-top:1px solid ' + s.border + '; padding-top:10px; display:flex; align-items:center; justify-content:space-between; font-size:11px; color:' + s.textMuted + ';">',
          '<span>Processamento seguro no navegador</span>',
          '<span>Powered by <a href="https://www.toolbrasil.com.br/" target="_blank" rel="noopener" style="color:' + s.brand + '; text-decoration:none; font-weight:bold;">Tool Brasil</a></span>',
        '</div>',
      '</div>'
    ].join('');

    var input = c.querySelector('#tb-doc-input');
    var result = c.querySelector('#tb-doc-result');

    input.addEventListener('input', function(e) {
      var val = e.target.value.replace(/\D/g, '');
      if (!val) {
        result.style.display = 'none';
        return;
      }

      var isValid = false;
      var docName = '';

      if (val.length === 11) {
        docName = 'CPF';
        isValid = validateCPF(val);
      } else if (val.length === 14) {
        docName = 'CNPJ';
        isValid = validateCNPJ(val);
      } else {
        result.style.display = 'block';
        result.style.background = 'rgba(234, 179, 8, 0.1)';
        result.style.color = '#ca8a04';
        result.style.border = '1px solid rgba(234, 179, 8, 0.3)';
        result.textContent = '⏳ Digite os 11 dígitos do CPF ou 14 do CNPJ (' + val.length + ' informados)';
        return;
      }

      result.style.display = 'block';
      if (isValid) {
        result.style.background = 'rgba(16, 185, 129, 0.1)';
        result.style.color = '#059669';
        result.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        result.textContent = '✅ ' + docName + ' Válido! Os dígitos verificadores conferem.';
      } else {
        result.style.background = 'rgba(239, 68, 68, 0.1)';
        result.style.color = '#dc2626';
        result.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        result.textContent = '❌ ' + docName + ' Inválido! Dígitos verificadores incorretos.';
      }
    });
  }

  // --- 2. CALCULADORA DE JUROS COMPOSTOS ---
  function renderJurosCompostos(c, s) {
    c.innerHTML = [
      '<div style="background:' + s.bg + '; color:' + s.text + '; border:1px solid ' + s.border + '; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">',
        '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">',
          '<strong style="font-size:15px; display:flex; align-items:center; gap:6px;">',
            '<span>📈</span> Simulador de Juros Compostos',
          '</strong>',
          '<span style="font-size:11px; font-weight:bold; color:' + s.brand + '; background:rgba(5,150,105,0.1); padding:2px 8px; border-radius:20px;">Tool Brasil</span>',
        '</div>',
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">',
          '<div>',
            '<label style="display:block; font-size:11px; color:' + s.textMuted + '; margin-bottom:4px;">Valor Inicial (R$)</label>',
            '<input type="number" id="tb-jc-inicial" value="1000" style="width:100%; box-sizing:border-box; padding:8px; border:1px solid ' + s.inputBorder + '; background:' + s.inputBg + '; color:' + s.text + '; border-radius:6px; font-size:13px;" />',
          '</div>',
          '<div>',
            '<label style="display:block; font-size:11px; color:' + s.textMuted + '; margin-bottom:4px;">Aporte Mensal (R$)</label>',
            '<input type="number" id="tb-jc-aporte" value="200" style="width:100%; box-sizing:border-box; padding:8px; border:1px solid ' + s.inputBorder + '; background:' + s.inputBg + '; color:' + s.text + '; border-radius:6px; font-size:13px;" />',
          '</div>',
        '</div>',
        '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">',
          '<div>',
            '<label style="display:block; font-size:11px; color:' + s.textMuted + '; margin-bottom:4px;">Taxa Mensal (%)</label>',
            '<input type="number" id="tb-jc-taxa" step="0.1" value="0.8" style="width:100%; box-sizing:border-box; padding:8px; border:1px solid ' + s.inputBorder + '; background:' + s.inputBg + '; color:' + s.text + '; border-radius:6px; font-size:13px;" />',
          '</div>',
          '<div>',
            '<label style="display:block; font-size:11px; color:' + s.textMuted + '; margin-bottom:4px;">Período (Meses)</label>',
            '<input type="number" id="tb-jc-meses" value="24" style="width:100%; box-sizing:border-box; padding:8px; border:1px solid ' + s.inputBorder + '; background:' + s.inputBg + '; color:' + s.text + '; border-radius:6px; font-size:13px;" />',
          '</div>',
        '</div>',
        '<div id="tb-jc-result" style="background:rgba(5,150,105,0.08); border:1px solid rgba(5,150,105,0.25); border-radius:8px; padding:12px; margin-bottom:12px; text-align:center;">',
          '<div style="font-size:11px; color:' + s.textMuted + ';">Valor Total Acumulado Estimado</div>',
          '<div id="tb-jc-total" style="font-size:20px; font-weight:900; color:' + s.brand + '; margin:4px 0;">R$ 6.945,30</div>',
          '<div id="tb-jc-sub" style="font-size:11px; color:' + s.textMuted + ';">Total Investido: R$ 5.800,00 | Juros: R$ 1.145,30</div>',
        '</div>',
        '<div style="border-top:1px solid ' + s.border + '; padding-top:10px; display:flex; align-items:center; justify-content:space-between; font-size:11px; color:' + s.textMuted + ';">',
          '<span>Cálculo com juros compostos</span>',
          '<span>Calculado via <a href="https://www.toolbrasil.com.br/calculadoras/calculadora-de-juros-compostos" target="_blank" rel="noopener" style="color:' + s.brand + '; text-decoration:none; font-weight:bold;">Tool Brasil</a></span>',
        '</div>',
      '</div>'
    ].join('');

    function calc() {
      var inicial = parseFloat(c.querySelector('#tb-jc-inicial').value) || 0;
      var aporte = parseFloat(c.querySelector('#tb-jc-aporte').value) || 0;
      var taxa = (parseFloat(c.querySelector('#tb-jc-taxa').value) || 0) / 100;
      var meses = parseInt(c.querySelector('#tb-jc-meses').value, 10) || 0;

      var total = inicial;
      var totalInvestido = inicial;

      for (var m = 0; m < meses; m++) {
        total = total * (1 + taxa) + aporte;
        totalInvestido += aporte;
      }

      var juros = total - totalInvestido;

      var fmt = function(v) {
        return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      };

      c.querySelector('#tb-jc-total').textContent = fmt(total);
      c.querySelector('#tb-jc-sub').textContent = 'Total Investido: ' + fmt(totalInvestido) + ' | Juros: ' + fmt(juros);
    }

    var inputs = c.querySelectorAll('input');
    for (var j = 0; j < inputs.length; j++) {
      inputs[j].addEventListener('input', calc);
    }
    calc();
  }

  // --- 3. TABELA INSS ---
  function renderTabelaINSS(c, s) {
    c.innerHTML = [
      '<div style="background:' + s.bg + '; color:' + s.text + '; border:1px solid ' + s.border + '; border-radius:12px; padding:18px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">',
        '<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">',
          '<strong style="font-size:15px; display:flex; align-items:center; gap:6px;">',
            '<span>📊</span> Tabela INSS 2026 (CLT)',
          '</strong>',
          '<span style="font-size:11px; font-weight:bold; color:' + s.brand + '; background:rgba(5,150,105,0.1); padding:2px 8px; border-radius:20px;">Oficial</span>',
        '</div>',
        '<table style="width:100%; border-collapse:collapse; font-size:12px; margin-bottom:12px;">',
          '<thead>',
            '<tr style="border-bottom:1px solid ' + s.border + '; text-align:left; color:' + s.textMuted + ';">',
              '<th style="padding:6px 0;">Salário de Contribuição</th>',
              '<th style="padding:6px 0; text-align:right;">Alíquota</th>',
            '</tr>',
          '</thead>',
          '<tbody>',
            '<tr style="border-bottom:1px solid ' + s.border + ';">',
              '<td style="padding:7px 0;">Até R$ 1.518,00</td>',
              '<td style="padding:7px 0; text-align:right; font-weight:bold; color:' + s.brand + ';">7,5%</td>',
            '</tr>',
            '<tr style="border-bottom:1px solid ' + s.border + ';">',
              '<td style="padding:7px 0;">De R$ 1.518,01 até R$ 2.793,88</td>',
              '<td style="padding:7px 0; text-align:right; font-weight:bold; color:' + s.brand + ';">9,0%</td>',
            '</tr>',
            '<tr style="border-bottom:1px solid ' + s.border + ';">',
              '<td style="padding:7px 0;">De R$ 2.793,89 até R$ 4.190,83</td>',
              '<td style="padding:7px 0; text-align:right; font-weight:bold; color:' + s.brand + ';">12,0%</td>',
            '</tr>',
            '<tr style="border-bottom:1px solid ' + s.border + ';">',
              '<td style="padding:7px 0;">De R$ 4.190,84 até R$ 8.157,41</td>',
              '<td style="padding:7px 0; text-align:right; font-weight:bold; color:' + s.brand + ';">14,0%</td>',
            '</tr>',
          '</tbody>',
        '</table>',
        '<div style="border-top:1px solid ' + s.border + '; padding-top:10px; display:flex; align-items:center; justify-content:space-between; font-size:11px; color:' + s.textMuted + ';">',
          '<span>Teto: R$ 8.157,41</span>',
          '<span>Fonte: <a href="https://www.toolbrasil.com.br/calculadoras/calculadora-desconto-inss" target="_blank" rel="noopener" style="color:' + s.brand + '; text-decoration:none; font-weight:bold;">Tool Brasil</a></span>',
        '</div>',
      '</div>'
    ].join('');
  }

  // --- ALGORITMOS DE VALIDAÇÃO ---
  function validateCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var sum = 0, rest;
    for (var i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10), 10)) return false;
    sum = 0;
    for (var j = 1; j <= 10; j++) sum += parseInt(cpf.substring(j - 1, j), 10) * (12 - j);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11), 10)) return false;
    return true;
  }

  function validateCNPJ(cnpj) {
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
    var size = cnpj.length - 2;
    var numbers = cnpj.substring(0, size);
    var digits = cnpj.substring(size);
    var sum = 0, pos = size - 7;
    for (var i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }
    var result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0), 10)) return false;
    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (var j = size; j >= 1; j--) {
      sum += parseInt(numbers.charAt(size - j), 10) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1), 10)) return false;
    return true;
  }

  // Inicialização no DOMContentLoaded ou imediata se o documento já estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }
})();
