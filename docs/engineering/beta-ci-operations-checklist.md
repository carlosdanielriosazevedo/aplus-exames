# Checklist operacional da Beta CI

Documento de consulta técnica relativo à issue #466. Descreve a configuração
observada no repositório; não certifica uma execução de CI nem aprova lançamento.

## Fontes e âmbito confirmado

- `.github/workflows/beta-ci.yml`: passos, condições, comandos e limites do job.
- `scripts/technical-gate.mjs`: composição e resultado do gate técnico.
- `package.json`: comandos npm, incluindo `prebuild`, `build` e orçamento de desempenho.
- `playwright.config.mjs`: configuração dos testes de navegador.
- `AGENTS.md`: regras de integração, produto, pedagogia e validação humana.

A Beta CI é acionada por `push` em `main` e por `pull_request` com destino a
`main`. Existe um job, `validate`, em `ubuntu-latest`, com limite de 25 minutos.
Os passos normais dependem do sucesso dos anteriores; não existe
`continue-on-error`. Uma falha pode deixar os passos seguintes sem execução:
um passo omitido não constitui evidência de sucesso.

## Gates presentes, pela ordem do workflow

| Passo ou grupo | Verificação configurada |
| --- | --- |
| Checkout, Node e dependências | Checkout com `actions/checkout@v4`, Node 20 com `actions/setup-node@v4` e instalação por `npm ci --legacy-peer-deps --no-audit --no-fund`. Falhas de preparação também impedem a validação. |
| Validate APProva+ agent workflow syntax | Descarrega `actionlint` 1.7.12, verifica SHA-256 e analisa **apenas** `.github/workflows/approva-agent-pilot.yml`. Ignora especificamente o diagnóstico do input `permission-profile` de `openai/codex-action@v1`; o comentário remete a verificação desse input para o `action.yml` oficial, sem a automatizar neste passo. |
| Verify versioned Mathematics banks | Executa os geradores `generate-vnext-diagnostic.mjs`, `generate-vnext-mission.mjs` e `generate-vnext-exam.mjs` com `--check`. |
| Install mobile browser test runtime | Instala `@playwright/test@1.55.0` em `/tmp/approva-playwright`, liga os módulos e instala Chromium com dependências. |
| Mobile browser regression · 390x844 | Lista os testes e executa Playwright com `playwright.config.mjs`. A configuração usa Chromium, viewport 390×844, um worker e servidor local. O comando tem limite de 12 minutos, com TERM e KILL após mais 20 segundos; a configuração também impõe limite global de 10 minutos. |
| Synthetic recovery compatibility | Obtém três commits fixos por `git fetch` e executa `scripts/release-recovery-compatibility.mjs`. É compatibilidade sintética, não recuperação comprovada de dados reais. |
| Unit tests | Executa `npm run test:unit` (`vitest run`). |
| Technical gate | Executa `npm run technical:gate`. O script agrega auditorias de sintaxe/JSX, isolamento de bundle, disciplinas, conteúdos, pedagogia, experiência, recuperação, validação híbrida e higiene do código, entre outras. Continua a recolher resultados internos e termina com código 1 e `TECHNICAL GATE: NO-GO` se alguma falhar; só imprime `TECHNICAL GATE: GO` quando todas passam. A lista exata é a do script. |
| Public launch hardening | Executa `scripts/public-launch-hardening-audit.mjs`. |
| Portuguese automatic grading contract | Executa `scripts/portuguese-automatic-grading-contract-audit.mjs`. |
| Selective grader validation | Executa `scripts/selective-grader-validation-audit.mjs`. |
| Real grader capture | Executa `scripts/real-grader-capture-audit.mjs`. O nome não demonstra uma captura real nesta execução. |
| Grader validation report | Executa `scripts/grader-validation-report-audit.mjs`. |
| Score explainability | Executa `scripts/score-explainability-audit.mjs`. |
| Learning feedback intelligence | Executa `scripts/learning-feedback-intelligence-audit.mjs`. |
| Strict observed classification | Executa `scripts/fqa-observed-threshold-audit.mjs`. |
| Grader adversarial bank | Executa `scripts/grader-adversarial-bank.mjs`. |
| Blind human validation campaign | Executa `scripts/grader-human-validation-campaign-audit.mjs`; não substitui a realização das revisões humanas exigidas. |
| Three-subject beta candidate | Executa `scripts/three-subject-beta-candidate-audit.mjs`. |
| Release candidate journey | Executa `scripts/release-candidate-journey-audit.mjs`. |
| Public beta readiness | Executa `scripts/public-beta-readiness-audit.mjs`. |
| Desktop beta readiness | Executa `scripts/desktop-beta-readiness-audit.mjs`. Não equivale a cobertura de todos os navegadores e dispositivos desktop. |
| Cloud resume product contract | Executa `scripts/cloud-resume-product-contract-audit.mjs`. |
| Closed beta autosync | Executa `scripts/closed-beta-autosync-audit.mjs`. |
| Grader quality report | Executa `scripts/grader-quality-report.mjs`. |
| Content readiness report | Executa `npm run content:readiness`. |
| Full production build | Executa `npm run build`, incluindo o ciclo `prebuild`, `next build` e `performance:budget`. Define `DATABASE_URL`, `NEXT_PUBLIC_NEON_AUTH_URL` e `NEXT_PUBLIC_NEON_DATA_API_URL` como vazios. Compilar não é publicar nem validar Neon em produção. |

Os comandos acima confirmam o que é invocado. A extensão das garantias de cada
auditoria depende das suas asserções e dos dados utilizados; o nome de um passo
não prova, por si só, correção pedagógica, qualidade do corretor ou prontidão pública.

## Evidência e passo informativo

`Browser evidence` usa `if: always()` para tentar guardar `test-results`,
`/tmp/audit-visual`, `/tmp/audit-desktop` e `/tmp/audit-ranking`, mesmo após falhas.
O artefacto chama-se `release-browser-${{ github.sha }}` e é retido por três dias.
A ausência de ficheiros é ignorada (`if-no-files-found: ignore`): não prova que os
testes passaram. Falhas do próprio upload devem ser investigadas.

`Pilot release gate location` só corre quando
`github.head_ref == 'feature/pilot-readiness-ab'`. Limita-se a imprimir que a prova
SQL do piloto é um gate explícito de release no workflow Post-deploy smoke
(`workflow_dispatch`). Não executa SQL nem comprova esse gate na Beta CI.

## Checklist operacional e bloqueios

Esta secção aplica as regras de `AGENTS.md`; não descreve proteções de branch
confirmadas no GitHub.

- [ ] Confirmar que a execução corresponde ao SHA que se pretende integrar e que
  o job terminou, sem cancelamento ou timeout.
- [ ] Exigir sucesso em todos os gates aplicáveis e no build. Uma falha em
  **qualquer** gate, incluindo preparação, deve bloquear a integração e o avanço
  para lançamento até ser investigada, corrigida e novamente validada.
- [ ] Consultar o primeiro erro nos logs e os artefactos disponíveis. Distinguir
  falha funcional de falha de infraestrutura; ambas deixam a validação incompleta.
- [ ] Corrigir a causa sem apagar testes válidos, enfraquecer asserções ou tratar
  passos omitidos como aprovados. Reexecutar as verificações relevantes sobre a
  revisão corrigida.
- [ ] Antes de integrar, confirmar também ausência de conflitos e de findings
  bloqueantes. CI verde não dispensa as autorizações de produto, pedagogia,
  privacidade, custos e serviços externos previstas em `AGENTS.md`.
- [ ] Antes de qualquer lançamento, obter separadamente a evidência operacional
  e humana exigida. Este piloto documental não autoriza push, merge ou deploy.

## Limites e sugestões futuras

**Factos confirmados e limites de evidência:**

- A Beta CI **não valida automaticamente a sintaxe de novos workflows**. O
  `actionlint` recebe um único caminho explícito; nem o próprio `beta-ci.yml` é
  incluído nessa invocação. A auditoria Syntax/JSX não é uma garantia de YAML de
  GitHub Actions.
- O YAML não comprova que o check é obrigatório nas regras de proteção de
  `main`, nem que outro workflow de deploy aguarda o seu resultado.
- Não há passo de deploy neste workflow. O build com variáveis de base de dados
  vazias não prova autenticação, RLS, migrações ou disponibilidade de produção.
- A configuração de Playwright usa servidor local e Chromium. Não prova execução
  em telemóvel físico, Safari, Firefox ou todas as dimensões de ecrã.
- Instalações, download de `actionlint` e `git fetch` dependem de rede; a falha
  destes serviços pode impedir o job antes das verificações funcionais.
- Um resultado verde limita-se aos testes e auditorias executados. Não substitui
  revisão humana, licenciamento ou a política híbrida; não altera
  `productionEligible=false`.
- Esta leitura não confirma o estado da PR #465, a configuração de credenciais
  restritas, execuções anteriores do agente ou a criação de uma PR Draft. Essas
  condições pertencem à evidência do workflow externo, sem consultar segredos.

**Sugestões para avaliação futura, sem implementação neste documento:**

- Alargar a análise de sintaxe a todos os workflows, revendo a exceção de
  `permission-profile` quando a ferramenta suportar o esquema atual.
- Verificar no GitHub se o job é obrigatório e se o processo de publicação exige
  o sucesso dos checks do mesmo SHA.
- Avaliar cobertura adicional de navegadores e retenção de evidência conforme as
  necessidades operacionais, sem confundir essas propostas com gates existentes.
