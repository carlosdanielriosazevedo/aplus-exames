# PR #473 — correção da regressão de cor mobile

Base de reprodução: `344045ba72cb0d4ae789b6e037f99abc64a0827b`.
Branch existente: `bot/approva-ui-issue-468`; PR mantida em Draft.

## Falha concreta e causa

Beta CI [43537301038](https://github.com/carlosdanielriosazevedo/aplus-exames/actions/runs/43537301038),
job `132269289837`, passo `Mobile browser regression · 390x844`:
12 FAIL e 169 PASS. Todos os FAIL eram a asserção `copyColor` de
`tests/browser/train-learn-header-parity.spec.mjs:47`, nas três disciplinas e
larguras 320/360/390/430. O CI testou o merge `ef0b9ea962e43bbe81c3f1236e75e8104854b939`
do HEAD `344045b` sobre `3632e698d056eebd3a7c9a0ee3aebefd93a01827`.

Esperado/Aprender: `rgb(101,117,131)` (`#657583`);
recebido/Treinar: `rgb(102,119,137)` (`--app-muted`, `#667789`).
Os passos posteriores do CI ficaram SKIPPED, não aprovados.

O HEAD removeu o bloco mobile de `globals.css` que aplicava `--app-muted` à copy
de Aprender. A nova geometria partilhada em `public-release.css` não repôs a cor.
Prevaleceu `.learnHome .learnIntro span{color:#657583!important}`, enquanto
`apronso-parity.css` ainda aplicava `--app-muted!important` ao Treinar abaixo de 760 px.
É uma diferença determinística de cascade, não uma espera de fontes insuficiente.

## Alteração mínima e critérios

Uma regra mobile no bloco partilhado de `app/public-release.css`:
`.learnIntro.learnIntro>span{color:var(--app-muted)!important}`.
Mesma especificidade das regras antigas, carregada depois delas; restaura a cor
mobile anterior à PR. Não altera desktop, dimensões, offsets, textos ou animações.
Nenhuma asserção, tolerância, timeout, exclusão, snapshot ou workflow foi alterado.

Critérios: reproduzir a falha; obter paridade mobile preservando desktop e todas
as outras medições; executar a matriz visual existente; completar os gates Beta CI;
preservar Draft e todas as fronteiras de produção/Neon/segredos/finanças.

## Ambiente e execução local

Node 20.20.2 e Playwright 1.55.0, como o CI. Dependências do lockfile por `npm ci`.
O download local do Chromium 140 foi recusado com 403 pela política de rede. Usou-se
Chromium 154.0.8037.57 e ffmpeg instalados, com configuração externa ao repositório.
Esta diferença é explícita; não se afirma equivalência de versões do browser.
Auth/Data API/DATABASE_URL vazios; servidor exclusivamente em 127.0.0.1.

Antes da correção: 6 testes selecionados, 3 FAIL mobile 390 e 3 PASS desktop 1366,
reproduzindo exatamente os valores do CI. Depois, primeira execução integral:
178 PASS, 3 não executados, exit 1 por limite global de 600 s. Sem falha de asserção;
os 17 casos de estabilidade dessa tentativa passaram. Resultado integral: INCOMPLETO.
Essa execução coincidiu com os gates locais; não foi marcada como PASS.

Confirmação final: **181/181 PASS**, 0 skips, 0 retries/flaky, exit 0, 532,92 s (8,9 min).
Para não repetir a build dentro do orçamento global de 600 s, usou-se a mesma build
local já compilada, servidor 127.0.0.1 e `reuseExistingServer:true` apenas na configuração
externa. Os limites de teste/expect/global e todas as asserções ficaram iguais.
Sem unitários, Technical Gate ou build concorrentes nessa confirmação.
O primeiro timeout continua registado.
A build final de produção foi executada separadamente, sem fixtures, depois dos testes.

### Medições funcionais e visuais

- Os 18 casos Aprender/Treinar passaram nas larguras 320/360/390/430/1366/1920.
- 12 layouts comparáveis antes/depois (3 disciplinas × 390/1366 × 2 abas): todos os
  campos medidos ficaram idênticos, exceto a cor da copy de Aprender mobile.
- 390 px: copyY 258 px e títuloY 177 px, fonte da copy 14 px; ambas as abas usam agora
  `rgb(102,119,137)`. Em 1366 px: copyY 298 px e títuloY 175 px; mantém-se `rgb(101,117,131)`.
- 12 pares PNG antes/depois: 9 idênticos por pixel; os 3 Aprender/mobile mudaram apenas 1808
  píxeis cada, dentro de [x17,y263,x353,y299], exclusivamente no texto explicativo.
- As duas execuções completaram os 17 cenários visuais de `stable-workspace-slots`.
  A matriz principal de 8 casos × 2 execuções deu 192 medições de estados, nas 3 disciplinas,
  larguras 320/360/390/1440, XP 1/123456, 2 abas e ambas as preferências de movimento.
  Inclui os controlos existentes de títulos longos, troca de disciplina e overflow.
  Maior variação observada de coordenada/dimensão: 0,0053101 px (tolerância original 2 px).
- Sem substituição de snapshots/baselines nem enfraquecimento dos testes existentes.

### Comandos reproduzíveis

Após o setup de dependências/browser do workflow, usar os comandos originais:

```sh
npx playwright test --config=playwright.config.mjs tests/browser/train-learn-header-parity.spec.mjs --grep '390px|1366px'
npx playwright test --config=playwright.config.mjs
npm run test:unit
npm run technical:gate
```

A configuração local externa só seleciona o Chromium instalado, o diretório de
resultados/JSON e, na confirmação final, o servidor já compilado. O CI continua a
usar o seu browser/configuração originais. Não se declara execução local do Chromium 140.

## Gates e limites

Os comandos de validação são os de `.github/workflows/beta-ci.yml`. Os objetos
Git históricos já presentes foram verificados para o contrato de recuperação;
não foi necessário voltar a descarregá-los. Os restantes comandos são iguais.
Setup/artefactos do runner GitHub não são substituídos por falsos checks locais.
A etapa condicional de pilot-readiness não se aplica à branch desta PR.

**23/23 etapas locais PASS**, mais actionlint 1.7.12 PASS (SHA256 da distribuição
verificado como no workflow). Unitários: 115 ficheiros/865 testes PASS.

| Etapa local do Beta CI | Resultado | Tempo |
|---|---|---:|
|Verify versioned Mathematics banks|PASS|2,75s|
|Synthetic recovery compatibility|PASS|0,15s|
|Unit tests|PASS|32,60s|
|Technical gate|PASS|115,19s|
|Public launch hardening|PASS|0,05s|
|Portuguese automatic grading contract|PASS|0,05s|
|Selective grader validation|PASS|0,07s|
|Real grader capture|PASS|0,07s|
|Grader validation report|PASS|0,07s|
|Score explainability|PASS|0,06s|
|Learning feedback intelligence|PASS|0,09s|
|Strict observed classification|PASS|0,11s|
|Grader adversarial bank|PASS|0,47s|
|Blind human validation campaign|PASS|1,38s|
|Three-subject beta candidate|PASS|14,58s|
|Release candidate journey|PASS|0,08s|
|Public beta readiness|PASS|3,84s|
|Desktop beta readiness|PASS|0,36s|
|Cloud resume product contract|PASS|0,06s|
|Closed beta autosync|PASS|0,05s|
|Grader quality report|PASS|2,51s|
|Content readiness report|PASS|0,61s|
|Full production build|PASS|24,31s|

O primeiro run remoto 43537301038 permanece FAIL; um novo run do novo HEAD é uma
prova separada, a verificar após atualização da branch. Não houve rerun do worker UI.

Sem alterações em APIs, lib, data, db, contratos, workflows, `vercel.json`, ícones ou branding.
A configuração versionada já desativa deployments Git por `**:false`; nenhum
workflow de deployment em push se aplica a esta branch. Não houve dispatch do
worker UI, alteração da issue #469, merge, deployment, operação Neon, leitura de
segredos ou alteração de limites financeiros.
