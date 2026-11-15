# F5 — isolamento entre contas no mesmo dispositivo

Âmbito: desenvolvimento isolado, sem autorização de publicação da aplicação.
Base: `main` em `118021d48ae354ec28b029c132d943d5a20b1c4f`.
Compatibilidade testada: PR #453 em `cfdc051a1f4300cecaac46e146a9646c4c781aeb`.

## Defeito confirmado e correção

O teste `tests/f5/transport-contract.mjs` executa os módulos originais de `main`
com autenticação e armazenamento sintéticos. A fila antiga contém XP=42 de A;
depois da troca de sessão, o código original grava esse progresso na linha de B.

As operações novas capturam uma origem de `/api/auth/session`, validada no
servidor. A identidade persistida e o conteúdo descodificado de um JWT não
autenticam uma conta. O progresso recebe `cloudAccount` apenas na criação de um
espaço novo após essa verificação; dados antigos não são adotados implicitamente.

Cada aba fixa um espaço de armazenamento por conta antes da hidratação. Estado,
tentativas em curso, respostas, memória de escrita, consentimento e registo de
conclusões usam esse espaço. Mudar de espaço exige recarregar a página depois de
preservar o estado atual. Logout não elimina o progresso da conta.

As filas e cópias novas usam entradas imutáveis individuais, com conta de origem.
Não há truncagem das filas antigas nem eliminação de entradas de outras contas.
Entradas v1, dados sem origem e entradas estrangeiras ficam em quarentena; a
interface recebe apenas metadados, nunca o respetivo estado académico.

Uma época de autenticação partilhada invalida contextos e pedidos entre abas.
Uma aba que deteta outra conta suspende o estudo local, impedindo que a nova
pessoa acrescente respostas ao espaço anterior. Revalidar a mesma conta permite
retomar; um erro de rede conserva uma prova anterior ainda válida, sem adotar
outra identidade.
Guardar, carregar, repetir e resolver conflitos verificam a origem antes dos
pedidos e antes de aplicar resultados. As cópias de segurança têm de ser
persistidas antes de substituir progresso local.

Em `main`, cada operação Data API usa um JWT fixo para a origem verificada e um
filtro de proprietário fixo. Um pedido já autenticado como A pode terminar na
linha de A; uma mudança de sessão descarta o seu resultado e nunca o redireciona
para B. Quando existe a API de #453, é usado o CAS desse servidor, com a
pré-condição `x-approva-account`, comparada com a sessão autenticada antes do SQL.
Só um HTTP 404 permite selecionar o transporte antigo de `main`; falhas de rede,
autenticação, autorização ou configuração não fazem essa seleção.

O autosync do piloto e a gestão de consentimento/apagamento também levam a conta
esperada. As mutações do piloto exigem essa pré-condição no servidor, além das
proteções existentes de sessão, origem, consentimento e limites.

## Provas reproduzíveis

- `npm run test:unit`: inclui 24 testes F5 de origem, filas antigas, retries,
  concorrência, erros de rede, troca de sessão, isolamento de armazenamento,
  falta de espaço e autosync de A sob sessão B.
- `node tests/f5/transport-contract.mjs`: reprodução negativa do código original;
  cliente corrigido contra os módulos reais de rota, validação e store de #453.
  A identidade de #453 é combinada por `git merge-file` com a pré-condição F5,
  sem editar qualquer branch. A→B é recusado antes de SQL e B mantém XP=900.
- `node tests/f5/browser-contract.mjs`: Chromium real com duas abas, cookies e
  eventos de armazenamento partilhados; A mantém XP=123, avaliação, respostas e
  relógio do rascunho FQA, enquanto B começa separado com XP=5. Uma resposta HTTP
  tardia é descartada. A pode regressar legitimamente e retomar a sua fila.
- O mesmo teste renderiza o componente real `AccountCloud`: as três escolhas
  de conflito são recusadas após uma mudança silenciosa de cookie A→B, mesmo
  sem evento de armazenamento. A mantém XP=22 e B mantém XP=900.
- O guard do estudo também é exercitado no navegador: B suspende as ações
  locais e a revalidação de A permite retomar sem mudar o espaço guardado.
- `npm run technical:gate`, `npm run syntax:audit`, os contratos de retoma,
  autosync e telemetria e `npm run build` verificam as restantes invariantes.

Para o teste de navegador, usar Playwright 1.55.0 instalado fora do repositório,
como no Beta CI. `F5_PLAYWRIGHT_MODULE` pode apontar para `playwright/index.mjs`;
`F5_CHROMIUM_PATH` permite escolher um Chromium local. O workflow dedicado instala
o navegador e guarda os resultados como artefacto. Nenhum teste usa serviços Neon,
contas reais ou dados de produção.

## Limites e integração

Esta alteração funciona sobre `main`, sem depender de migrações não integradas.
Não modifica 009/010, F6/F7, conteúdos, regras de avaliação ou recompensas. Os
dados antigos sem prova continuam preservados; não existe importação automática
para uma conta nem uma alegação de que pertencem à pessoa que inicia sessão.
O armazenamento local não é uma fronteira contra alguém com acesso às ferramentas
do navegador; este protocolo impede atribuição e sincronização entre contas.

O merge futuro com #453 precisa de revisão de conflitos em `cloud.js` e nos
contratos de auditoria, mantendo os vínculos F5 e o CAS server-side de #453. O
teste de compatibilidade cobre o comportamento combinado, não declara um merge
efetuado nem certifica a integração final.

`scripts/release-recovery-compatibility.mjs`, o Beta CI e a proteção
`no database/API migration in release` permanecem intactos. O gate de release
recusa estas alterações de armazenamento já na verificação anterior
`candidate must preserve #385 storage guards`; o predicado seguinte continua a
proibir diferenças de API/base de dados. Não se contorna nenhuma dessas guardas.

Decisão desta fase: avaliar apenas F5 em desenvolvimento isolado após os testes
e o CI do commit final. Não constitui GO para merge, deployment ou publicação.
