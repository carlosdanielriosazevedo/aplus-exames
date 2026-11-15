# P1 — Autorização da recuperação antes da hidratação

Experiência local descartável, exclusivamente sintética. Não autoriza merge,
deploy, migrações Neon, publicação da aplicação ou acesso a dados reais.

## Referências e isolamento operacional

- PR #453: `2c42b6699ffb12c7d599e1603d4ead4680cd1767`.
- PR #454: `3e6e8e9b4477f1e3bd50ab3c996e264bfed5370a`.
- main: `118021d48ae354ec28b029c132d943d5a20b1c4f`.
- Os três HEADs remotos foram confirmados; as PRs continuam Draft, abertas e
  sem merge. Os originais não foram modificados.
- A experiência compõe #453 com os módulos F5 de #454 numa cópia com `.git`
  independente. Os conflitos de transporte mantêm a API/CAS de #453, sem
  fallback de escrita pela Data API; identidade conserva a validação F6 e
  acrescenta a precondição de conta F5. Não é um merge aprovado das PRs.
- Manifesto de preparação, logs, hashes e recibo do commit local encontram-se
  em `/workspace/aplus-p1-evidence`. A reprodução anterior está em
  `/workspace/aplus-integration-evidence`.

## Causa reproduzida

Na composição vulnerável, `clientApp.js` seleciona corretamente o workspace de A
antes de carregar o progresso. Um snapshot com `missionHistory: {}` faz a
hidratação terminar com `hydrated=false`. O guard F5 dependia desse indicador,
pelo que nunca se ativava no ecrã de recuperação F7.

Quando B iniciava sessão noutra aba, a aba anterior mantinha o namespace de A e
o ecrã `LocalSnapshotRecovery`. A **primeira leitura sem autorização** era
`LocalSnapshotRecovery.originals()`: percorria `browserStores()` e lia os
originais de A sem sessão fresca. `downloadRecoveryJson(raw)` aceitava depois
qualquer objeto e criava o Blob sem comprovar titularidade.

Chromium reproduziu o download por B do original sintético de A com XP=123,
avaliação=14 e uma resposta em curso. O controlo com hidratação normal bloqueou
corretamente a troca de conta. Não foi necessária escrita SQL para explorar P1.

## Correção experimental

1. `clientApp.js`: ativa a proteção da conta após selecionar o workspace
   verificado, independentemente do sucesso da hidratação. Mantém
   `hydrated=false` em caso de erro, impedindo autosave de progresso vazio.
   Se a verificação inicial falhar, não lê o progresso. O login usa o
   `AccountCloud` existente com o modelo inicial vazio; após autenticação
   legítima recarrega a página antes de selecionar e ler o workspace.
2. `recoveryAccess.js`: capacidades opacas, impossíveis de reconstruir a partir
   de JSON ou de um identificador. Ligam uma sessão verificada no servidor ao
   workspace imutável da aba e à geração F5. Logout e mudança de conta
   invalidam as capacidades anteriores, inclusive se A voltar a entrar.
3. `cloudRecovery.js`: autorização fresca antes das leituras; nova verificação
   após operações assíncronas e antes do download. Recusa JSON sem capacidade.
   Backups v2 têm titular e consistência com a origem interna; a listagem
   devolve descritores sem payload. A leitura e exportação de cada cópia
   exigem prova nova e que a origem não tenha sido substituída.
4. `LocalSnapshotRecovery.js`: ficheiro revisto ligado ao envelope exportado,
   titular, digest e storageKey. Antes de gravar, verifica novamente identidade,
   preservação dos campos e igualdade dos originais atuais. Não existe `await`
   entre a última comparação e a gravação local. Avaliações em curso impedem a
   substituição. Falhas preservam os originais.
5. `CloudSnapshotRecovery.js` e `cloud.js`: exportação original autenticada,
   invalidação de estados de recuperação por geração, importação com
   revalidação e preservação do digest/CAS F7. Um accountId enviado pelo
   browser nunca substitui o titular obtido da sessão.
6. Percursos alternativos: FriendsBetaPanel, InternalDashboards,
   ReviewerDashboard e as três ferramentas Grader usam o mesmo limite de
   download. Apenas `cloudRecovery.js` cria URLs Blob/downloads na aplicação.
   Os ecrãs Grader independentes verificam identidade antes de mostrar dados.
7. A investigação encontrou respostas de validação numa chave global. Os
   módulos `graderValidationDataset.js` / `graderValidationCapture.js` passam
   a usar um envelope com titular no workspace verificado. Chaves globais,
   arrays antigos sem titular ou envelopes inválidos não são adotados nem
   substituídos. Uma falha da captura opcional devolve um código controlado,
   sem interromper a avaliação nem apagar respostas existentes.

Nenhum conteúdo, rubrica, algoritmo de avaliação, migração 009/010 ou regra de
recompensa foi alterado. Alterações restantes de persistência/pilot são a
composição necessária com F5, identificada no manifesto, não novas funções.

## Dados antigos e recuperação

- O original local é exportado com os bytes exatos, incluindo espaços, XP,
  avaliações e respostas. As cópias duráveis são acrescentadas com chaves
  únicas; não se trunca o histórico nem se substituem cópias anteriores.
- Backups v1 e dados globais sem titular comprovado ficam preservados e em
  quarentena. Não há fallback que os disponibilize a quem iniciar sessão.
- Uma cópia revista só pode substituir o progresso depois de exportar e
  preservar os originais, comprovar a mesma conta e verificar que não surgiram
  alterações concorrentes. Uma tentativa pendente bloqueia a substituição.
- No servidor, recuperação exige o digest/revisão exportados. O histórico
  preserva exatamente o OLD; respostas privadas históricas não são reinjetadas
  no snapshot de sincronização.
- Não há adoção automática de dados antigos sem proveniência, mesmo para A.
  A sua recuperação exige um percurso futuro de comprovação de titularidade;
  este experimento não inventa essa prova nem oferece download anónimo.

## Validação reproduzível

Dependências do projeto pelo lockfile; Playwright 1.55 separado e Chromium local.
Não é necessário definir credenciais ou ligações Neon. Todos os transportes,
cookies, identidades e respostas de teste são sintéticos.

```sh
npm run test:unit
npm run technical:gate
npm run syntax:audit
npm run source:hygiene
npm run build
node tests/scripts/cloud-server-cas-contract.mjs
node tests/scripts/neon-jwt-smoke-contract.mjs
node tests/scripts/neon-preview-build-attest-contract.mjs
node tests/f5/transport-contract.mjs
node scripts/real-grader-capture-audit.mjs
```

Com `F7_PLAYWRIGHT_MODULE` / `F7_CHROMIUM_PATH` e os equivalentes F5 apontados
para o runner isolado:

```sh
node tests/scripts/recovery-authorization-browser-contract.mjs
node tests/scripts/cloud-snapshot-browser-contract.mjs
node tests/f5/browser-contract.mjs
```

O novo contrato P1 fica acrescentado ao CI especializado, incluindo os paths
dos módulos de autorização e exportação. Os contratos F7 foram adaptados à API
assíncrona, aos descritores opacos e ao envelope de recuperação com titular;
mantêm as verificações de preservação, quota, CAS e tentativas em curso.
O fixture histórico de transporte F5 passou a fornecer o envelope de sessão
exigido por F6 e acrescenta recusas por expiração/revogação, sem alterar a
autenticação do produto ou remover as suas asserções anteriores.

Resultados e limites:

| Verificação | Resultado |
| --- | --- |
| Reprodução Chromium vulnerável | P1 reproduzido; download de A enquanto B está autenticado |
| Chromium P1 corrigido | Leituras/listagens/downloads diretos recusados, zero leituras académicas e zero Blob no caso B |
| Chromium Auth/rede | Indisponibilidade, expiração, revogação, aborto de rede e respostas tardias bloqueados |
| Chromium recuperação legítima | A exporta bytes exatos; recuperação local revista e cloud/CAS preservam os originais |
| Chromium exportação alternativa | B não exporta respostas de A nem herda dataset global; A retoma as próprias respostas |
| Unitários | 130 ficheiros; 1 087 testes aprovados, incluindo 19 P1 e 29 com SDK Neon Auth real |
| F5 Chromium | A/B, duas abas, filas antigas, três escolhas CAS e retoma legítima aprovados |
| F7 Chromium | Cinco grupos de recuperação, quota, respostas tardias, avaliação em curso e compatibilidade F5 aprovados |
| PostgreSQL 16 descartável | Nominal e seis schemas adulterados aprovados; RLS, trigger, OLD/CAS, recompensas e idempotência |
| Persistência histórica | Diagnóstico separado: 2 192 asserções, 128 casos, escritores antigos e leitor experimental |
| Technical Gate, Syntax, Source Hygiene, build/budgets | Aprovados |
| CAS, JWT offline, atestação offline, captura Grader, actionlint | Aprovados |
| Gate histórico de release | Continua a falhar em `candidate must preserve #385 storage guards` |

PostgreSQL foi executado em containers locais, `--network none`, dados
sintéticos e repositório montado só para leitura. Os sete containers foram
removidos. O cenário nominal inclui recusa da reaplicação 009, recusa da 010
sem opt-in CI, sete respostas sintéticas e dois finalizadores concorrentes:
ambos devolvem 35 XP com um único recibo. Nunca foi executado SQL na Neon.

## Gates e CI remoto

O script `release-recovery-compatibility.mjs` e o Beta CI estão intactos.
A igualdade textual com os seis ficheiros fixados de #385 continua incompatível
com a composição F5/F7. A verificação seguinte
`no database/API migration in release` permanece intacta e não é alcançada
após a primeira recusa. O diagnóstico comportamental separado não contorna,
substitui ou aprova esse gate.

GitHub Actions consultado nos SHAs originais: Neon RLS de #453 e F5 Isolation
de #454 concluíram com sucesso; os dois Beta CI concluíram com falha. Isto
valida apenas as referências. Não existe CI remoto do commit experimental
local: não foi feito push nem criada PR. Os novos passos de CI estão preparados
e validados localmente, não executados no GitHub para esta cópia.

## Limite arquitetural e decisão

**Proteção da aplicação:** o percurso vulnerável de recuperação deixa de
permitir a B visualizar, ler pelos helpers de recuperação, exportar ou aplicar
dados de A. Autoriza pela sessão verificada e pela geração, não apenas por
prefixos de chaves ou por um identificador escolhido pelo browser.

**Armazenamento físico do perfil:** localStorage é plaintext partilhado pela
origem. O teste demonstra expressamente que uma avaliação direta de
`localStorage.getItem` na aba de B consegue ler os bytes de A fora dos
percursos autorizados da aplicação. Namespaces, envelopes e capacidades JS não
protegem contra DevTools, extensões, XSS, manipulação integral do storage ou
acesso ao mesmo perfil do navegador. Não são atestação criptográfica da origem.
Dados já legitimamente descarregados também não podem ser revogados.

Confidencialidade forte entre pessoas com esse acesso exige outra arquitetura:
cifragem por utilizador com chaves que não estejam disponíveis ao outro
utilizador no mesmo perfil, recuperação segura de chaves, ou armazenamento
privado no servidor e sessões/perfis do browser separados. Guardar a chave ao
lado do ciphertext não resolve o problema. A mudança exige desenho, aprovação
e testes próprios; não foi implementada nem ativada nesta tarefa.

**GO apenas para a correção P1 através da aplicação, em desenvolvimento
isolado**, com os resultados finais registados no recibo externo.
**NO-GO para confidencialidade física do perfil partilhado e para
publicação/integração geral.** As aprovações de persistência/API/schema e a
validação futura numa Neon sintética autorizada continuam pendentes. Não há
autorização de merge ou publicação da aplicação.
