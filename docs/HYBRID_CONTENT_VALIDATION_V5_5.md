# Validação Híbrida de Conteúdo — v5.5

## Decisão

Deixamos de usar a regra:

> “Uma pergunta só é utilizável depois de um professor a aprovar individualmente.”

e passamos para:

> **Professor onde acrescenta julgamento. Máquina onde consegue provar.**

A política é deliberadamente conservadora para a primeira beta pedagógica.

Não estamos a substituir professores por IA. Estamos a separar dois problemas:

1. **correção/consistência verificável por máquina**;
2. **qualidade pedagógica que exige julgamento humano**.

## Resultado sobre o caminho mínimo atual

Modelo conservador v5.4:

- 64 revisões humanas;
- ~5,3 h a 5 min/questão.

Política híbrida v5.5:

- 40 revisões humanas obrigatórias;
- 5 revisões de amostragem;
- **45 revisões humanas no total**;
- 24 itens no lane de máquina;
- 19 desses 24 ficam machine-only para a beta;
- redução de **19 revisões / 30%**;
- ~3,8 h a 5 min/questão.

A amostra humana corresponde a 20% do lane de máquina e é escolhida de forma
determinística, com representação dos anos letivos.

## O que continua obrigatoriamente humano

Uma questão vai para revisão humana quando entra numa destas categorias:

### Diagnóstico
O Diagnóstico influencia o primeiro mapa do aluno. Âncoras e probes continuam
100% humanos.

### Compreensão, interpretação, raciocínio e modelação
Nestes itens não basta verificar a conta. É necessário avaliar:
- clareza;
- nível;
- adequação curricular;
- ambiguidade;
- plausibilidade dos distratores;
- interpretação pedagógica.

### Avisos do Pré-QA
Qualquer warning relevante impede que uma questão seja promovida para o lane
machine-only.

### Itens que não têm oracle atestado
Uma questão simples sem evidência matemática reproduzível não é promovida só
porque “parece fácil”.

## Lane de máquina

Na v5.5 existem **24 questões** no lane de máquina.

Para entrar nesse lane, a versão atual precisa de:

- estar fora do Diagnóstico;
- ter tipo cognitivo objetivo de baixo risco;
- ter Pré-QA limpo;
- possuir oracle determinístico explícito;
- possuir uma atestação ligada ao fingerprint exato do conteúdo.

Se uma única palavra, opção, resposta, solução, dificuldade ou metadado pedagógico
mudar, o fingerprint muda e a atestação deixa de valer.

O item regressa ao fluxo humano/máquina até ser novamente validado.

## Oracle determinístico

`app/lib/machineMathOracle.js`

Os 24 itens têm uma resposta esperada recalculada por código.

Exemplos:

- vetor entre dois pontos;
- número de códigos pelo princípio multiplicativo;
- derivadas elementares;
- equações exponenciais;
- zeros de seno/cosseno;
- limites de polinómios contínuos;
- declive e expressão de função afim;
- assíntota vertical;
- regra de Laplace;
- composição de funções;
- regra da cadeia;
- área por integral;
- soma de vetores.

O oracle não pergunta a uma IA “achas que está certo?”. Ele recalcula uma resposta
esperada e compara-a com a opção marcada como correta.

## Fingerprint

Cada uma das 24 atestações está ligada ao fingerprint atual.

Exemplo conceptual:

`M10G-1 + cr1-...`

Se M10G-1 mudar, a atestação antiga já não é aceite.

Isto evita um erro grave:

> validar uma versão e depois usar a mesma validação numa pergunta entretanto editada.

## Amostragem humana

Mesmo no lane de máquina, **20%** são enviados ao professor.

Objetivo:

- encontrar falhas de linguagem;
- detetar dificuldade mal estimada;
- perceber se os distratores são demasiado fracos;
- testar se a nossa própria política de automação está a cometer erros.

Se a amostra começar a apresentar muitos pedidos de ALTERAR/BLOQUEAR, aumentamos a
taxa ou fechamos o lane.

Se, com dados reais, a taxa de erro for consistentemente baixa, poderemos reduzir
a amostra no futuro.

## Beta fechada vs produção

Esta distinção é fundamental.

### Beta pedagógica fechada

A política v5.5 permite machine-only para Missões/Exames quando:

- a atestação é válida;
- o oracle passa;
- o item está no lane aprovado pela política.

O Diagnóstico não recebe esta exceção.

### Produção comercial

**Machine-only ainda não é suficiente.**

Na v5.5 `productionEligible` permanece falso para todos os itens machine-only.

Antes de mudar isso, queremos acrescentar:

1. segundo validador independente;
2. resultados empíricos dos alunos;
3. taxa de reports;
4. desempenho por item;
5. amostragem pedagógica contínua;
6. política de rollback.

## Segundo validador externo

Foi preparado um contrato neutro em:

`app/lib/server/contentValidationProvider.js`

Pode futuramente receber:

- Wolfram/API;
- outro motor simbólico;
- um segundo serviço matemático;
- um modelo de IA independente;
- combinação destes.

**Nenhuma conta, chave, serviço ou custo foi ativado na v5.5.**

A resposta de um segundo validador nunca será considerada autoridade pedagógica.

Se houver desacordo:

> conflito → bloquear → investigar.

## Dificuldade

A dificuldade inicial continua a ser uma estimativa editorial.

Não existe maneira séria de “certificar” dificuldade apenas com IA.

A dificuldade mais importante será a **dificuldade empírica**, calculada depois de
existirem respostas reais suficientes, idealmente condicionada ao nível do aluno.

Exemplo:

Uma pergunta marcada D2 pode revelar-se:
- 90% acerto entre alunos fortes;
- 35% entre alunos médios;
- 10% entre alunos com lacunas de pré-requisitos.

Esse dado é muito mais útil do que pedir a cinco IAs para escolher D2 ou D3.

## Gate híbrido

Estado inicial da v5.5:

- readiness conservador, apenas professor: 10%;
- readiness estrutural híbrido: 50%;
- revisão humana obrigatória por fazer: 40;
- amostra humana por fazer: 5;
- gate híbrido: NO-GO.

Simulação de controlo:

Depois de **exatamente 45 aprovações humanas previstas**:

- gate híbrido: GO;
- score estrutural híbrido: 87%;
- Diagnóstico: completo;
- requisitos mínimos de Missões/Exame: atingidos.

O gate conservador continua NO-GO nesse cenário, porque não fingimos que os 19
machine-only foram revistos por professor.

São dois modelos diferentes e ambos continuam visíveis.

## Pack do professor

Pack recomendado:

`docs/professor-review-v5.5-hybrid/`

Contém:

- 45 questões;
- 6 lotes;
- 40 obrigatórias;
- 5 de amostragem.

O antigo roteiro de 64 continua disponível como alternativa conservadora.

## Próxima evolução natural

Depois de um professor rever os primeiros lotes e de alunos reais começarem a usar
a app, a política deve começar a aprender com:

- taxa de aprovação humana por lane;
- frequência de correções;
- reports dos alunos;
- dificuldade empírica;
- discriminação dos itens;
- qualidade dos distratores;
- estabilidade das competências estimadas.

A validação híbrida deve tornar-se mais exigente ou mais eficiente com dados,
nunca apenas “mais automática”.
