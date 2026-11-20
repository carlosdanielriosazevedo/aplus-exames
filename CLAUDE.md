# CLAUDE.md — APProva+

Regras para o Claude Code neste repositório. Lê também `AGENTS.md` (missão do produto, regras pedagógicas, ícone Android bloqueado, IAVE, privacidade). Em caso de conflito sobre branches, merge ou deploy, prevalece este ficheiro.

## Projeto
- APProva+: preparação para Exames Nacionais — Matemática A (635), Português (639), Física e Química A (715).
- Stack: Next.js 15, alojado na Vercel, autenticação com Neon Auth.

## Ao iniciar a sessão
- Se `node_modules` não existir, corre `npm ci`.
- Testes de browser: usa o Playwright instalado em `/tmp/approva-playwright`, tal como em `.github/workflows/beta-ci.yml` (instalação com `--prefix /tmp/approva-playwright`, symlinks para `node_modules/` e execução via `/tmp/approva-playwright/node_modules/.bin/playwright`).

## Git
- Nunca fazer push para `main`.
- Trabalhar em `claude/<tema>` e abrir PR.
- Ao apagar branches remotos, confirmar o resultado com `git ls-remote` — o proxy pode devolver um erro falso.

## Antes de pedir revisão
Correr, por esta ordem:
1. `npm run test:unit`
2. `npm run technical:gate`
3. `npm run build`

Não aumentar limites nem alterar testes para os fazer passar.

Depois do build, reverter `performance-baseline.json` e `calibration-report.json` se não fizerem parte da tarefa:

```bash
git checkout -- performance-baseline.json calibration-report.json
```

## Alterações de UI
- Testar em Chromium a 390×844 (telemóvel) e 1366×768 (desktop).

## Dados
- Nunca usar dados reais de alunos; só dados sintéticos.

## Regras de produto
- Respostas sem classificação nunca aparecem como zero.
- A app não promete revisão humana.

## Vercel
- Team: `team_8tJYQLhNITkMzSpmKjThB9H5`
- Projeto: `prj_H0nD83gkRwu7Id05OhzL4CC60s4M`
- Leitura da API do Vercel é permitida.
- Não fazer deploy de produção, rollback, nem alterar variáveis de ambiente sem pedido explícito.
