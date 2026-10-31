# Validação local de main — 31/10/2026

Base obtida com `git fetch origin main`: `118021d48ae354ec28b029c132d943d5a20b1c4f`. A branch `codex/reliability-validation` foi criada diretamente de `origin/main`, sem usar branches de outras tarefas como base. Checkout inicialmente limpo.

## Objetivo e resultado

Investigar falhas reproduzíveis nas suites existentes, preservando recuperação de sessões, progresso, XP, avaliação pedagógica e marca bloqueada. Foram consultados AGENTS.md, política de não regressão, estratégia de testes, backlog e configuração Playwright.

Nenhuma falha funcional foi reproduzida nas verificações abaixo. Não foram feitas correções especulativas nem alterações na aplicação, testes, AGENTS.md, dependências ou lockfile. Esta alteração apenas regista evidência; não implementa uma nova funcionalidade.

| Verificação | Resultado efetivamente observado |
| --- | --- |
| `npm run test:unit` | 115 ficheiros, 865 testes passaram; 10,45 s |
| `npm run technical:gate` | TECHNICAL GATE: GO |
| Playwright, suite integral `tests/browser` | 164 passaram, 6,4 minutos, um worker, sem skips ou falhas |
| Build iniciado pelo webServer Playwright | Concluiu e iniciou servidor de produção local; orçamento de performance aprovado |

A suite de browser exercitou as três disciplinas, diagnósticos com branco/duplo clique/rede cortada, recarga e encerramento completo do Chromium, proteção de sessões em curso, preservação de respostas/relógio de exames, layouts desktop/mobile, contraste, acessibilidade de fórmulas, landing e metadados públicos.

## Ambiente e reprodução

Node 20.20.2, dependências instaladas pelo lockfile. Runtime Playwright 1.55.0 instalado fora do checkout, com links locais em node_modules, seguindo o padrão do CI. O download de Chromium 140 do Playwright foi recusado pela política de rede (403 Domain forbidden). Foi usado Chromium 154.0.8037.57 instalado em `/usr/bin/chromium`.

A configuração versionada não foi alterada. Um adaptador temporário externo importou `playwright.config.mjs`, manteve todas as assertions e os 164 testes, e aplicou apenas:

```js
import config from '/workspace/aplus-exames/playwright.config.mjs';
export default {
  ...config,
  testDir: '/workspace/aplus-exames/tests/browser',
  reporter: [['list'], ['/workspace/aplus-exames/tests/browser/test-begin-reporter.cjs']],
  webServer: {...config.webServer, cwd: '/workspace/aplus-exames'},
  use: {...config.use, video: 'off', launchOptions: {executablePath: '/usr/bin/chromium'}}
};
```

Executado com `playwright test --config=/workspace/shared/playwright-local.mjs`, no checkout, com Node 20 no PATH. Vídeo desativado, traces e screenshots de falha mantidos. A escolha de browser também foi propagada pelos testes de contextos persistentes. O servidor usou as variáveis vazias de Neon da configuração existente, nunca credenciais de produção.

Os logs desta execução e capturas sintéticas geradas foram preservados em `/workspace/shared/reliability-evidence-20261031`, fora do repositório; essa localização é evidência da instância atual, não armazenamento permanente no GitHub. Relatórios versionados gerados pelos audits/build foram repostos para evitar ruído no diff.

## Revisão crítica e limites

- Apenas este relatório muda; não há alteração de comportamento, esquema, assets bloqueados ou política pedagógica.
- Os resultados são da base indicada, não de commits posteriores nem do CI remoto.
- Chromium 154 não equivale ao Chromium 140 do CI: repetir no CI com a distribuição fixada antes de integrar alterações funcionais.
- Sem base de dados configurada: autenticação Neon, RLS e dados cloud reais não foram validados.
- Não foram validados Safari, Firefox, telemóvel físico ou produção Vercel. Suites verdes não provam ausência de defeitos fora da cobertura.
- A API GitHub tinha devolvido Forbidden na preparação anterior; a abertura da PR deve ser confirmada separadamente. Git HTTPS permite fetch/push.
- Nenhum merge, deployment, alteração de alias, migração ou operação sobre dados reais foi executado. O vercel.json da base desativa deployments Git automáticos, incluindo codex/*.

Se existir um problema específico fora desta cobertura, registar passos, resultado esperado/obtido e ambiente para criar uma regressão reproduzível antes da correção.
