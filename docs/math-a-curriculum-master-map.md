# Matemática A — Curriculum Master Map (vNext)

> Estado: **plano editorial/técnico, ainda não ligado ao motor em produção**
> Base curricular: novas Aprendizagens Essenciais de Matemática A, em vigor progressivamente em 2024/25 (10.º), 2025/26 (11.º) e 2026/27 (12.º).
> Princípio A+: **o currículo oficial define o que pode ser aprendido; a A+ organiza-o em unidades suficientemente largas para permitir cerca de 50 perguntas genuinamente diferentes por submatéria.**

## 1. Regras estruturais

- O perfil escolar limita o conteúdo adaptativo:
  - 10.º ano -> conteúdo curricular do 10.º ano já lecionado/assumido disponível.
  - 11.º ano -> 10.º + 11.º.
  - 12.º ano -> 10.º + 11.º + 12.º obrigatório + tema(s) opcional(is) selecionado(s).
  - Secundário concluído -> todo o currículo.
- **Diagnóstico, Missões e Mini-exames** respeitam este âmbito curricular.
- **Treino Livre** não fica bloqueado pelo ano: o aluno pode escolher qualquer matéria/submatéria.
- Conteúdo futuro não conta como lacuna, não reduz Domínio e não entra no Índice de Preparação.
- No 12.º ano, Inferência Estatística, Primitivas/Integrais e Matrizes são temas opcionais; a app deve saber qual/quais a turma está a trabalhar.
- Os IDs abaixo são propostos como estáveis para a próxima taxonomia. Alterações futuras de texto não devem alterar os IDs.
- O alvo de 50 é editorial: variantes quase iguais não contam como 50 perguntas independentes.

## 2. Perfil editorial de cada conjunto de ~50 perguntas

Por submatéria:
- 10 compreensão/base;
- 12 aplicação direta;
- 10 interpretação/representações;
- 10 resolução de problemas e modelação;
- 6 multi-etapa / estilo prova;
- 2 desafio/alta discriminação.

Cada item deve ter, no mínimo:
`id`, `themeId`, `subtopicId`, `year`, `difficulty`, `cognitive`, `question`, `options/answer`, `solution`, `misconception/hypothesis`, `contexts`, `signature`, `origin`, `reviewStatus`.

## 3. 10.º ano — 31 submatérias (~1 550 perguntas)

### 10A — Modelos matemáticos nas eleições e na partilha
- `10-ele-majorias` — Maioria simples e maioria absoluta
- `10-ele-borda` — Método de Borda e boletins de preferência
- `10-ele-dhondt` — Método de D'Hondt e distribuição proporcional
- `10-ele-stlague-comparacao` — Método de St. Laguë, comparação, vantagens e limitações

### 10B — Modelos matemáticos em finanças
- `10-fin-salarios` — Salário mensal, anual e valor-hora
- `10-fin-bruto-liquido` — Salário bruto/líquido, Segurança Social e retenção
- `10-fin-irs` — IRS, taxas, escalões e progressividade em problemas adequados ao nível
- `10-fin-juro-simples` — Juro simples
- `10-fin-juro-composto-credito` — Capitalização, poupança, crédito e modelação financeira

### 10C — Estatística
- `10-est-problema-pop-amostra` — Problema estatístico, variabilidade, população, amostra e variável
- `10-est-amostragem` — Amostragem, representatividade e enviesamento
- `10-est-univariados-representacoes` — Dados univariados e representações
- `10-est-localizacao` — Medidas de localização
- `10-est-dispersao` — Medidas de dispersão e interpretação conjunta
- `10-est-bivariados-regressao` — Dados bivariados, dispersão, correlação, regressão, outliers e correlação != causalidade

### 10D — Geometria sintética
- `10-gs-propriedades-construcoes` — Propriedades geométricas e construções de base
- `10-gs-circuncentro-incentro` — Circuncentro e incentro
- `10-gs-baricentro-medianas` — Baricentro e propriedades das medianas
- `10-gs-ortocentro` — Ortocentro e alturas
- `10-gs-euler-nove-pontos` — Localização dos centros, reta de Euler e circunferência dos nove pontos

### 10E — Funções
- `10-fun-conceito-representacoes` — Conceito de função e representações
- `10-fun-dominio-imagem-zeros` — Domínio, contradomínio/imagem, zeros e sinal
- `10-fun-afim` — Função afim e modelação
- `10-fun-quadratica` — Função quadrática, zeros, extremos e problemas
- `10-fun-transformacoes-ramos-modulo` — Transformações de gráficos, funções por ramos e módulo

### 10F — Geometria analítica no plano e no espaço
- `10-ga-coordenadas-transformacoes` — Coordenadas e transformações no plano
- `10-ga-distancias-ponto-medio` — Distâncias e ponto médio
- `10-ga-lugares-geometricos` — Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica
- `10-ga-vetores` — Vetores, coordenadas, norma e operações
- `10-ga-colinearidade-retas` — Colinearidade e equações de retas
- `10-ga-espaco` — Coordenadas, vetores e relações geométricas no espaço

## 4. 11.º ano — 35 submatérias (~1 750 perguntas)

### 11A — Trigonometria
- `11-trig-angulos-radianos` — Ângulos orientados, arcos e radianos
- `11-trig-circulo` — Círculo trigonométrico e redução
- `11-trig-relacoes` — Relações/identidades trigonométricas fundamentais
- `11-trig-equacoes` — Equações trigonométricas
- `11-trig-funcoes` — Funções seno e cosseno
- `11-trig-modelacao` — Resolução de triângulos e modelação periódica

### 11B — Produto escalar
- `11-pe-declive-inclinacao` — Declive e inclinação
- `11-pe-produto-coordenadas` — Produto escalar por coordenadas
- `11-pe-angulo-norma` — Produto escalar, norma e ângulo
- `11-pe-perpendicularidade` — Perpendicularidade
- `11-pe-retas-planos` — Ângulos/posições relativas de retas e planos
- `11-pe-distancias` — Distâncias em problemas geométricos

### 11C — Contagem
- `11-cont-adicao-multiplicacao` — Princípios da adição e multiplicação
- `11-cont-diagramas` — Diagramas, tabelas e organização de casos
- `11-cont-fatorial` — Fatorial e contagens elementares
- `11-cont-permutacoes` — Permutações
- `11-cont-arranjos` — Arranjos
- `11-cont-combinacoes` — Combinações e escolha sem ordem

### 11D — Sucessões
- `11-suc-termo-recorrencia` — Regularidades, termo geral e recorrência
- `11-suc-pa` — Progressões aritméticas
- `11-suc-pg` — Progressões geométricas
- `11-suc-somas` — Somas de termos de PA e PG
- `11-suc-modelacao-comportamento` — Comportamento e modelação com sucessões

### 11E — Funções
- `11-fun-cubicas-quarticas` — Famílias cúbicas/quárticas e comportamento gráfico
- `11-fun-divisao-polinomios` — Divisão de polinómios, Ruffini/Horner
- `11-fun-resto-raizes` — Teorema do resto, raízes, multiplicidade e fatorização
- `11-fun-operacoes` — Operações entre funções
- `11-fun-racionais` — Funções racionais
- `11-fun-assintotas-modelacao` — Assíntotas, interpretação e modelação

### 11F — Cálculo diferencial
- `11-cd-taxa-media` — Taxa média de variação
- `11-cd-derivada-ponto` — Taxa instantânea e derivada num ponto
- `11-cd-tangente` — Reta tangente e interpretação geométrica
- `11-cd-funcao-derivada` — Função derivada
- `11-cd-regras` — Regras de derivação
- `11-cd-monotonia-otimizacao` — Monotonia, extremos e otimização

## 5. 12.º ano — obrigatório — 32 submatérias (~1 600 perguntas)

### 12A — Números complexos
- `12-cplx-unidade-equacoes` — Unidade imaginária, conjunto C e equações de 2.º grau
- `12-cplx-forma-algebrica` — Forma algébrica, parte real/imaginária e igualdade
- `12-cplx-conjugado-modulo` — Conjugado e módulo
- `12-cplx-operacoes-algebricas` — Operações na forma algébrica
- `12-cplx-argand` — Plano de Argand-Gauss e interpretação geométrica
- `12-cplx-forma-trig` — Forma trigonométrica, módulo e argumento
- `12-cplx-operacoes-trig` — Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas

### 12B — Probabilidade
- `12-prob-fenomeno-acontecimentos` — Fenómeno aleatório, espaço de resultados e acontecimentos
- `12-prob-propriedades` — Probabilidade e propriedades elementares
- `12-prob-condicionada` — Probabilidade condicionada
- `12-prob-produto-arvores` — Regra do produto e árvores de probabilidade
- `12-prob-contingencia-independencia` — Tabelas de contingência e independência
- `12-prob-total` — Probabilidade total e problemas em cadeia
- `12-prob-variaveis-discretas` — Variáveis aleatórias discretas e função massa
- `12-prob-normal` — Valor médio/dispersão de modelos e Modelo Normal

### 12C — Funções exponenciais e logarítmicas
- `12-expl-exponencial` — Função exponencial
- `12-expl-modelacao` — Crescimento/decrescimento exponencial e modelação
- `12-expl-inversa-raizes` — Função inversa e raízes
- `12-expl-logaritmica` — Função logarítmica e propriedades
- `12-expl-equacoes` — Equações exponenciais/logarítmicas e problemas

### 12D — Função composta e derivadas
- `12-fcd-composicao` — Função composta e domínio
- `12-fcd-e-exponencial` — Número e e derivada da exponencial
- `12-fcd-log-trig-potencias` — Derivadas de logaritmos, trigonométricas e potências
- `12-fcd-regras-cadeia` — Operações entre derivadas e regra da cadeia
- `12-fcd-aplicacoes` — Estudo de funções, modelação e otimização

### 12E — Funções contínuas e deriváveis
- `12-fcont-limites-continuidade` — Limite intuitivo e continuidade
- `12-fcont-operacoes` — Operações com funções contínuas
- `12-fcont-derivabilidade` — Derivabilidade e relação com continuidade
- `12-fcont-estudo-global` — Monotonia, extremos e estudo global de funções

### 12F — Resolução aproximada de equações
- `12-rae-bolzano-localizacao` — Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes
- `12-rae-bissecao` — Método da bisseção, aproximação e erro
- `12-rae-newton` — Método de Newton-Raphson, aproximação e análise de adequação

## 6. 12.º ano — temas opcionais — 15 submatérias (~750 perguntas se forem todos produzidos)

### 12O1 — Introdução à inferência estatística
- `12-ie-inferencia-amostragem` — Raciocínio inferencial e amostragem
- `12-ie-distribuicoes-amostragem` — Distribuições de amostragem / comportamento amostral
- `12-ie-tlc` — Teorema Limite Central em contexto introdutório
- `12-ie-estimacao` — Estimação de parâmetros
- `12-ie-intervalos-confianca` — Intervalos de confiança, margem de erro e interpretação

### 12O2 — Primitivas imediatas e integrais definidos
- `12-int-primitiva` — Conceito de primitiva/antiderivada
- `12-int-tabela-propriedades` — Primitivas imediatas e propriedades
- `12-int-integral-definido` — Integral definido
- `12-int-tfc-barrow` — Teorema Fundamental do Cálculo / Fórmula de Barrow
- `12-int-areas` — Áreas e aplicações

### 12O3 — Matrizes
- `12-mat-representacao-tipos` — Representação, dimensão, elementos e tipos de matrizes
- `12-mat-adicao-escalar` — Adição, subtração e multiplicação por escalar
- `12-mat-produto` — Produto de matrizes, compatibilidade e não comutatividade
- `12-mat-transformacoes` — Transformações geométricas com matrizes
- `12-mat-modelacao` — Modelação e aplicações

## 7. Dimensão estimada do banco

- 10.º: 31 submatérias x 50 ~= **1 550**
- 11.º: 35 submatérias x 50 ~= **1 750**
- 12.º obrigatório: 32 submatérias x 50 ~= **1 600**
- 12.º opcionais: 15 submatérias x 50 ~= **750**

**Total-alvo vNext: 113 submatérias -> ~5 650 perguntas editoriais originais.**

Isto substitui a estimativa preliminar baseada nas 69 microcompetências antigas. A redução de fragmentação em alguns pontos é deliberada: não faz sentido obrigar uma microideia demasiado estreita a ter 50 perguntas artificiais.

## 8. Regras para Diagnóstico, Missões e Mini-exames

### Diagnóstico
- Deve amostrar apenas conteúdo dentro do âmbito curricular do aluno.
- Não deve tentar medir todas as 113 submatérias numa sessão.
- Usa âncoras informativas em submatérias estruturantes e continua calibração nas primeiras Missões.
- Um aluno nunca recebe uma classificação negativa por ainda não ter estudado matéria futura.

### Missões
- O motor só considera candidatos curricularmente elegíveis.
- Pré-requisitos de anos anteriores podem aparecer quando necessários.
- Matéria futura não pode aparecer como pré-requisito.
- O scope é congelado quando a Missão diária é atribuída, tal como a própria Missão.

### Mini-exames
- 10.º: cobertura apenas do 10.º elegível.
- 11.º: cobertura acumulada 10.º + 11.º.
- 12.º: cobertura acumulada + tema(s) opcional(is) configurado(s).
- “Exame Nacional completo” deve ser um modo distinto de um mini-exame curricular por ano, se vier a ser disponibilizado.

### Treino Livre
- Mantém liberdade total de escolha.
- A UI pode sugerir primeiro o ano do aluno, mas permite abrir outros anos.
- A futura decisão “uma ou várias matérias por treino” é de UX e fica fora deste documento.

## 9. Migração do banco atual

O banco atual de 145 perguntas não deve ser descartado automaticamente.
Cada pergunta deve passar por:
1. mapeamento para `subtopicId` vNext;
2. verificação de alinhamento curricular;
3. verificação de independência de assinatura;
4. QA matemático;
5. revisão editorial/pedagógica;
6. rejeição ou reclassificação quando a pergunta estiver na categoria errada.

Exemplo já identificado: uma partilha puramente proporcional 1:2:3 não representa, por si só, a submatéria curricular de D'Hondt/St. Laguë e deve ser reclassificada ou retirada desse foco.

## 10. Fontes curriculares de referência

- DGE / Aprendizagens Essenciais de Matemática — Matemática A, 10.º, 11.º e 12.º.
- Coletâneas de tarefas das turmas piloto da DGE, usadas como referência de cobertura e de natureza das aprendizagens.
- Não copiar enunciados, figuras, tabelas ou soluções das fontes; produzir conteúdo A+ original.
