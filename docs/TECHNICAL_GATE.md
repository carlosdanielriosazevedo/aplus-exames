# Gate técnico — v4.0

A partir desta versão, o projeto tem um gate técnico reproduzível antes de uma release.

## `npm run technical:gate`

Executa:
1. parser JS/JSX em todo o source;
2. integridade dos IDs estáveis de competência/microcompetência;
3. isolamento e segurança operacional da beta de amigos;
4. auditoria do motor adaptativo;
5. auditoria de fiabilidade/idempotência;
6. validação do roadmap mínimo de revisão;
7. ida-e-volta da ponte de revisão com professor;
8. higiene do source e procura de credenciais hardcoded.

O gate técnico não substitui:
- build Next.js;
- revisão pedagógica;
- testes humanos;
- validação de backend.

## CI GitHub

`.github/workflows/beta-ci.yml` executa, em cada push/PR:
- instalação limpa;
- gate técnico;
- relatório de prontidão do conteúdo;
- `npm run build` de produção.

Assim, o GitHub passa a validar o build integral com dependências reais.

## Separação de gates

`TECHNICAL GATE: GO` significa apenas que o software passou as verificações técnicas.
O conteúdo continua com um GO/NO-GO próprio e independente.
