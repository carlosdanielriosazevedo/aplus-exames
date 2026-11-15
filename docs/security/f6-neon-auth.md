# F6 — segurança Neon Auth em desenvolvimento isolado

Base: PR #453, branch `codex/neon-rls-history-hardening`,
`cfdc051a1f4300cecaac46e146a9646c4c781aeb`. Âmbito exclusivo F6;
F1–F4 preservados, sem integração das alterações F5 da PR #454 e sem corrigir F7.

## Interfaces verificadas na instalação

O lockfile instala `@neondatabase/neon-js` **0.7.0-beta**, que reexporta
`@neondatabase/auth` **0.5.0-beta** da sua dependência aninhada. Foram lidos o
código e os `.d.mts`, sem atualizar ou modificar dependências:

- `auth/dist/next/server/index.mjs`: `createNeonAuth`, `.getSession()` e
  `.handler()`; opções `logger`, `logLevel` e `cookies.sessionDataTtl`.
- `auth/dist/types-CnMXQlnQ.d.mts`: o logger tem quatro métodos; métodos omitidos
  usam `console`. `sessionDataTtl` é positivo, não um interruptor de cache.
- `auth/dist/server-b0OzGjXl.mjs`: o bypass de `.getSession()` compara
  `query.disableCookieCache` com a **string** `"true"`. O proxy HTTP verifica o
  mesmo parâmetro de URL. A aplicação usa esse comportamento real, coberto por
  testes; não presume que um booleano desativa o cache nesta versão.

O logger predefinido pode receber `err`, `detail`, mensagens e stacks com dados
sensíveis. Há ainda um caminho interno de `validateSessionData` que chama
`parseSessionData` sem transmitir o logger. Um cookie assinado com datas inválidas
pode, por isso, alcançar um fallback direto de consola. Não se alterou o SDK:
os percursos da aplicação evitam esse parser de cache.

## Política implementada

O logger tem todos os métodos explicitamente definidos. Apenas eventos fixos de
erro/aviso são registados; mensagens, erros, URLs, cookies e metadados do SDK não
são encaminhados. Não há monkeypatch da consola em produção.

`getServerAuth()` expõe uma fachada imutável com as duas interfaces usadas pela
aplicação. A sua leitura de sessão força sempre revalidação upstream, mesmo que
um chamador tente pedir cache. O GET de autenticação `get-session` também força
o bypass no proxy do SDK. O cookie de compatibilidade continua a ser emitido com
TTL de **60 segundos**, limitado pela expiração da sessão; não é autoridade para
autorizar operações da aplicação.

Todas as chamadas de `requireSession()` e `requireCapability()` passam assim
pelo provider. Exige-se resposta sem erro, utilizador e sessão consistentes,
identificadores válidos e expiração futura. Dados privados, alterações de estado,
operações administrativas e recompensas não usam um resultado antigo em cache.
Uma negativa ou falha do provider bloqueia a operação; não há fallback para a
sessão anteriormente aceite. Falhas HTTP 5xx do provider dão um código público
controlado e estado 503. Os roles da aplicação continuam a ser verificados.

Os handlers aguardam as operações assíncronas e consomem o corpo da resposta
dentro do `try/catch`. Rejeições de handler, leitura do pedido ou stream upstream
resultam numa resposta genérica. Erros HTTP do provider têm status/códigos de uma
lista controlada e não transportam corpo, reason phrase nem cabeçalhos de
credenciais recebidos upstream. Respostas usam `private, no-store`, `Pragma:
no-cache` e `Vary: Cookie`. Respostas legítimas de sucesso preservam o protocolo
de autenticação, incluindo os cookies/tokens necessários ao próprio cliente.

Logout limpa token e cache locais, inclusive quando o pedido falha. Essa falha
continua a ser comunicada como falha, sem afirmar revogação remota. Pedidos de
revogação bem-sucedidos invalidam também o cache local. Uma cópia antiga de um
cookie assinado não permite contornar a revalidação para a operação seguinte.

## Provas automatizadas

`tests/helpers/neonAuthSdkFixture.mjs` compila os módulos reais da aplicação e do
SDK instalado. Só substitui o contexto Next, o transporte fetch e SQL por
fixtures sintéticas. Não substitui `createNeonAuth`, o logger, o parser, a
assinatura/verificação do cache ou os handlers do SDK.

`tests/unit/neonAuthRealSdkSecurity.test.mjs` cobre:

- Reprodução do logger predefinido vulnerável, capturada por spies sem publicar
  o material fictício na consola; ausência dos marcadores e JWTs sintéticos nos
  logs da aplicação e nas respostas de erro.
- Rejeições assíncronas GET/POST do SDK e streams de resposta que falham depois
  de o handler ter devolvido uma Response.
- Erros HTTP com códigos, mensagens, reason phrases e cabeçalhos sensíveis
  fictícios; status e códigos públicos controlados.
- Cache assinado ainda válido após revogação, assinatura expirada, ausência do
  token de sessão, datas malformadas e sessão/utilizador inconsistentes.
- Renovação real de cookies pelo SDK, rotação do token e TTL limitado tanto
  pela configuração como pela expiração upstream.
- Logout, falha de logout e revogação, incluindo replay dos cookies antigos.
- Autorização legítima de admin, recusa de estudante sem role suficiente e
  bloqueio após revogação antes de qualquer novo SQL.
- Fronteiras HTTP reais de cloud state e recompensas: sessão revogada não chega
  ao armazenamento privilegiado.

O workflow Neon RLS synthetic conserva os jobs de F1–F4 e acrescenta um job F6
com Node 20, dependências do lockfile, todos os unitários, Technical Gate e build
sem serviços externos. Os logs ficam em artefactos. Os sete cenários PostgreSQL
descartáveis verificam novamente o schema nominal e os seis schemas adulterados.

## Limites e bloqueios restantes

Os testes demonstram o comportamento do **SDK real contra transportes
sintéticos**. Não verificam login, renovação ou revogação num serviço Neon real.
Essa validação permanece **bloqueada pelo âmbito autorizado**, que proíbe contas
reais, produção e SQL Neon. Antes de um eventual rollout, terá de ser autorizada
e comprovada separadamente num ambiente com proveniência sintética demonstrada.

Uma revalidação fresca observa a resposta do provider; não prova a latência de
propagação de revogações do serviço. Um pedido já autorizado pode terminar antes
de uma revogação posterior. Limpar cookies locais não revoga cópias remotas quando
o provider está indisponível, nem garante invalidar JWTs já emitidos antes da sua
expiração. Não foi criada uma denylist local que fingisse resolver esses casos.

O adapter do navegador mantém o seu próprio cache de apresentação, independente
do cookie de servidor. Esse estado não autoriza os endpoints privados. Não se
alteraram o vínculo de progresso/filas entre contas (F5) nem o merge/validação de
snapshots (F7).

A revalidação em cada autorização aumenta chamadas e dependência da
disponibilidade do provider. A política prefere recusar temporariamente uma
operação a autorizar com uma sessão cuja revogação não foi consultada.

Os gates de release e de higiene permanecem intactos. Não houve merge,
deployment, migração Neon, acesso à produção ou alteração de conteúdos.
A decisão desta fase é exclusivamente GO/NO-GO para F6 em desenvolvimento
isolado; não constitui autorização de publicação da aplicação.
