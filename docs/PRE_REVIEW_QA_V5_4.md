# Pré‑Revisão Automática — v5.4

## Objetivo

O tempo do professor deve ser usado para decisões que exigem julgamento humano:

- matemática;
- clareza;
- pertinência pedagógica;
- dificuldade;
- qualidade dos distratores;
- adequação curricular.

Não deve ser desperdiçado com erros mecânicos que a aplicação consegue apanhar antes.

A v5.4 cria uma camada de **pré‑QA** antes de qualquer questão entrar num pack de revisão.

## Bloqueios automáticos

Uma questão deixa de ser exportável para o professor se existir um problema mecânico
grave, por exemplo:

- enunciado em falta;
- número de opções diferente de 4;
- opção vazia;
- opções duplicadas;
- índice de resposta correta inválido;
- solução em falta;
- hipótese de erro em falta;
- tema/microcompetência inexistente;
- contextos inválidos;
- assinatura semântica em falta;
- tipo cognitivo em falta;
- dificuldade fora de D1–D5;
- enunciado exatamente duplicado noutra questão.

Estes problemas não podem ser ultrapassados com um simples “APROVAR”.

A importação CSV também rejeita uma aprovação se o item tiver um blocker de pré‑QA.

## Avisos automáticos

Outros sinais não bloqueiam a revisão, mas são mostrados ao professor:

- assinatura semântica reutilizada;
- enunciado muito semelhante a outro da mesma microcompetência;
- enunciado excessivamente curto;
- solução muito curta;
- opção correta muito mais longa do que os distratores;
- solução que aparenta apenas repetir a resposta.

Estes são **heurísticos**, não verdades pedagógicas.

Exemplo: duas questões podem ser semelhantes por uma razão perfeitamente válida.
O professor continua a decidir.

## Problemas reais encontrados pela v5.4

Ao executar a camada pela primeira vez sobre as 145 questões, foram encontrados
bloqueios reais.

### Duplicação em Derivadas

`D11D-P` e outra questão avaliavam exatamente:

> “Qual é a derivada de f(x)=x²?”

Isto era particularmente mau porque uma delas era um probe de Diagnóstico:
duas respostas semelhantes poderiam aparentar evidência independente quando não eram.

O probe foi substituído por uma pergunta original independente sobre a derivada de
`5x`.

### Posição da resposta correta

O corpus tinha uma distribuição muito desequilibrada:

- A: 30
- B: 71
- C: 41
- D: 3

Um aluno atento podia aprender que “D quase nunca é correta” e que “B aparece
demasiadas vezes”.

A v5.4 aplica uma posição estável e determinística por ID, movendo **a própria opção
correta** e atualizando o índice. O conteúdo matemático da resposta não muda.

Distribuição atual:

- A: 33
- B: 41
- C: 41
- D: 30

A posição é estável entre sessões/reloads; não é aleatória a cada abertura.

## Estado atual do corpus

Pré‑QA sobre 145 questões:

- 0 bloqueios;
- 26 questões com pelo menos um aviso;
- 119 limpas;
- distribuição A/B/C/D considerada equilibrada.

Os avisos atuais incluem sobretudo:

- soluções curtas;
- assinaturas reutilizadas intencionalmente em algumas âncoras/probes;
- proximidade textual em exercícios do mesmo conceito.

Não foram corrigidos automaticamente porque exigem julgamento pedagógico.

## Packs do professor

A v5.4 gera os packs atuais em:

`docs/professor-review-v5.4/`

Cada linha recebe:

- `qa_status`
- `qa_flags`

Valores possíveis de `qa_status`:

- `clean`
- `warning`

Um `blocked` não deve aparecer num pack exportável.

No caminho mínimo atual:

- 64/64 questões são exportáveis;
- 0 têm blockers;
- 11 das 64 têm avisos automáticos que o professor poderá ver.

## Conteúdo editorial alterado

O pré‑QA trabalha sobre a **versão editorial efetiva** da questão.

Ou seja:

`QUESTION_BANK + contentPatch`

Se uma questão for alterada na v5.3 e passar a ter opções duplicadas, a v5.4:

1. deteta o problema;
2. impede a exportação para professor;
3. impede aprovação importada por CSV;
4. só volta a permitir revisão após correção.

O pack também exporta o texto efetivamente revisto, não a versão antiga do banco base.

## Pré‑QA ≠ revisão pedagógica

Passar o pré‑QA não significa:

> “questão correta”.

Significa apenas:

> “não encontrámos um erro mecânico conhecido que torne inútil enviá-la para revisão humana”.

O readiness pedagógico só aumenta com decisões reais de professor.
