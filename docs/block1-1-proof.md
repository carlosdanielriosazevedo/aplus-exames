# Bloco 1.1 · Acentuação visível de Matemática A

Este PR segue um ciclo vermelho → verde verificável no Beta CI.

## Antes da correção

O teste Playwright `tests/browser/math-diagnostic-accents.spec.mjs` executa o diagnóstico real de Matemática A num Chromium com viewport 390×844 e falha se encontrar formas-alvo sem acento em texto visível.

## Depois da correção

O mesmo teste, sem alteração de critérios, deve completar o diagnóstico até ao resultado sem encontrar formas-alvo sem acento e sem `pageerror`.

O teste unitário `tests/unit/visiblePortugueseAccents.test.js` limita a inspeção a campos visíveis e cobre os bancos de runtime das três disciplinas. IDs, signatures e chaves internas ficam fora desta verificação.
