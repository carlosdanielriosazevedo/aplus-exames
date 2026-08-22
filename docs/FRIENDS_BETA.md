# Beta privada com amigos — v4.2

## Objetivo

Esta beta não tenta provar ainda que o motor avalia o nível académico com precisão.

Serve para descobrir:
- se o onboarding é claro;
- se o diagnóstico é demasiado longo ou confuso;
- se o aluno percebe porque recebeu uma Missão;
- se a gamificação motiva;
- se Treino, Progresso e Mini-exame fazem sentido;
- onde há fricção, erros, textos estranhos ou perguntas problemáticas.

## Como entrar

No domínio publicado da app, acrescentar:

`?beta=friends`

Exemplo conceptual:

`https://DOMINIO-DA-APP/?beta=friends`

A query ativa `friends_beta`.

## Segurança pedagógica

Neste modo:
- perguntas bloqueadas continuam proibidas;
- variantes geradas automaticamente não são usadas;
- conteúdo curado ainda não revisto pode ser mostrado apenas para testar a experiência;
- a interface avisa repetidamente que Índice, Domínio, Certeza e notas são provisórios;
- o GO/NO-GO da beta pedagógica continua independente e permanece NO-GO até revisão humana.

## Privacidade do piloto

Cada dispositivo recebe um código pseudoanónimo como:

`AMG-XXXXXX`

O relatório exportado não inclui nome nem email.

Até o backend estar ligado, o tester descarrega o relatório JSON e envia-o manualmente
à pessoa que lhe forneceu o link.

## Isolamento

A beta de amigos usa storage separado:
- estado normal: `a25`
- beta de amigos: `a25-friends-beta`

Rascunhos de sessões também usam namespaces diferentes.

Isto evita que testar `?beta=friends` no mesmo browser destrua ou misture o estado
normal de desenvolvimento.

## Proteção de hidratação

A app só começa a gravar em localStorage depois de concluir a leitura inicial.
Isto impede o primeiro render vazio de substituir estado previamente guardado.

## Percurso recomendado para um amigo

1. Entrar pelo link de beta.
2. Fazer onboarding.
3. Completar o diagnóstico.
4. Fazer pelo menos uma Missão.
5. Experimentar Treino Livre.
6. Fazer o Mini-exame se tiver disponibilidade.
7. Preencher feedback após as sessões.
8. Na Home, escolher “Exportar relatório do teste” e enviar o JSON.

Uma primeira sessão de 20–30 minutos já produz feedback útil.


## Checkpoint de branding antes de partilhar

Tecnicamente o piloto já aceita testers através de `?beta=friends`.

No entanto, o protótipo ainda mostra a marca provisória **A+** em vários ecrãs.
Antes de enviar o link a pessoas externas, deve ser aplicado o nome temporário/final
escolhido para o piloto. Esta é deliberadamente uma decisão de produto e não é
resolvida automaticamente pelo motor.
