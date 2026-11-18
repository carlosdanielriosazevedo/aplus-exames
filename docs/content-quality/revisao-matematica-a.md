# Revisão pedagógica de Matemática A

Revisão por Codex em 17 de novembro de 2026.

Foram revistas as **1 643 perguntas ativas** de `RUNTIME_QUESTION_BANK`, incluindo 1 601 de escolha múltipla, 41 de resposta por etapas e uma de completamento. A distribuição é de 516 no 10.º ano, 474 no 11.º e 653 no 12.º, incluindo os temas opcionais. **613 IDs ativos** tinham pelo menos um problema de conteúdo ou partilhavam uma fonte que o motor tratava como independente.

A leitura cruzou o conteúdo que o aluno vê com as fontes em `app/data`, `app/lib` e `content/vnext/math-a`. Foram verificados os enunciados, as opções e as chaves, as resoluções, os passos e critérios de correção, a adequação ao ano e as repetições. O registo final contém uma impressão digital por ID, calculada sobre a versão já corrigida do banco.

## Incidência por tipo

Uma pergunta pode constar de várias linhas. A contagem é feita por ID ativo, incluindo as cópias da mesma fonte.

| Tipo | IDs ativos |
| --- | ---: |
| Opções defensáveis | 25 |
| Distratores e pistas | 115 |
| Enunciado, hipóteses ou dados | 263 |
| Explicação ou passos | 278 |
| Notação matemática | 150 |
| Adequação ao ano | 28 |
| Repetição | 81 |

## Correções por ID

IDs na mesma linha partilham a fonte ou a correção. As soluções são apresentadas sem referência a letras ou posições de opções. As respostas matemáticas foram preservadas. Em alguns casos, o texto da opção correta foi precisado ou o problema foi reformulado com a mesma resposta.

### 10.º ano · Eleições e partilha

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-10ELE-DHONDT-STEPS-1` | O primeiro passo pedia os quocientes «relevantes» de A, mas a grelha exigia quatro, incluindo 1200, que não decide mandato algum. Uma lista de quocientes sem repetir a letra A era recusada. | Solicita explicitamente os quatro primeiros quocientes de A e aceita a lista equivalente sem o prefixo. Apresenta os quatro cálculos e depois a atribuição. |
| `MS-VN10ELE-BOR-010` | Três alternativas muito curtas contradiziam diretamente as regras dadas. A explicação não mostrava que B superava A na contagem. | Apresenta conclusões sobre posições e compara os pontos de A e B. |
| `DG-VN10ELE-DHO-001` | Dividir só por potências de dez era um erro sem relação com os métodos ensinados. | A alternativa passa a testar a confusão entre sequências de divisores iniciadas em 1 e em 2. |
| `MS-VN10ELE-DHO-012` | Com o número de mandatos fixo, «todas as listas recebem mais» era impossível. Os distratores tinham pouca relação com os erros de comparação de quocientes. | Contrapõe alterações plausíveis da ordem dos quocientes e explicita que a regra de desempate permanece. |
| `MS-VN10ELE-DHO-013` | Um distrator afirmava que D'Hondt nem sequer usa votos e a explicação não dava um caso em que o efeito ocorre. | Testa a variação desigual entre divisores e demonstra a mudança com um exemplo sem empate. |
| `DG-VN10ELE-MAJ-001` | Votos nulos não são votos de um candidato, pelo que a alternativa não constituía um critério comparável. | Testa a confusão entre obter pluralidade e obter mais votos do que os adversários somados. |
| `EX-VN10ELE-MAJ-046` | «Com a mesma regra» referia-se a outro item e omitia a regra que leva A e B à segunda volta. | Formula o regulamento completo no próprio item. |
| `MS-VN10ELE-STL-007` | «316,67...» sugere um desenvolvimento decimal que não é o de 950÷3. | Usa a fração exata e os valores com sinal de aproximação. |
| `EX-VN10ELE-STL-018` | Afirmar que arredondar altera votos ou muda os divisores ímpares permitia descartar sem perceber como os quocientes são ordenados. | Apresenta erros de interpretação sobre empates e a seleção dos quocientes. |
| `EX-VN10ELE-STL-035` | As opções com quocientes usavam aproximações sem indicar essa precisão. | Pede o valor arredondado às centésimas e apresenta o quociente exato na resolução. |
| `MS-VN10ELE-STL-042` | A pergunta e as opções identificavam os grupos apenas pela ordem implícita dos votos. A resolução escrevia 166,67 como se fosse um quociente exato. | Indica explicitamente os grupos A, B e C e a ordem pedida. Assinala a aproximação do quociente 500÷3. |

### 10.º ano · Estatística

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `C10EST-1` | «Tende a afetar diretamente» não distinguia aumento garantido e alteração possível, e «nunca a mediana» nem completava o enunciado. | Pede a quantidade que aumenta necessariamente e usa alternativas que completam o enunciado. |
| `CRV2-10EST-STEPS-1` | Parte da pontuação exigia etapas, ordem de coordenadas ou forma de resultado que o enunciado não explicitava. | Explicita no enunciado as etapas avaliadas, conservando as referências e a pontuação. |
| `CV51-10EST-REP-1` | A circunferência trigonométrica e o gráfico de uma função contínua são estranhos à comparação de frequências de categorias. | Compara quatro representações estatísticas reconhecíveis, só uma adequada ao objetivo. |
| `DG-VN10EST-AMO-001` | Só a chave incluía um critério preciso de representatividade. Os distratores eram absolutos ou arbitrários, incluindo a dimensão exata 100. | Compara o perfil da população com a dimensão, distribuição pelos grupos e participação voluntária. |
| `MS-VN10EST-AMO-002` | O item podia ser acertado pela extensão da única opção que descrevia um erro real de amostragem. | Compara o erro de seleção com erros de resposta, registo e variabilidade casual. |
| `MS-VN10EST-AMO-007` | A equiprobabilidade marginal dos elementos não basta para definir amostragem aleatória simples. | Precisa a equiprobabilidade de todas as amostras da dimensão fixada e dá um contraexemplo para o critério marginal. |
| `DG-VN10EST-AMO-008` | A estratificação só garante presença se forem efetivamente selecionados alunos de todos os estratos, e duas opções excluíam subgrupos à partida. | Explica a regra de seleção por estrato e usa outros métodos realistas como distratores. |
| `EX-VN10EST-AMO-022` | «A população desaparece» era uma opção absurda num item sobre não resposta. | Usa enviesamento de medição como confusão legítima com outras categorias de erro. |
| `MS-VN10EST-BIV-021` | A definição de resíduo não figura como objetivo autónomo nas AE de Estatística do 10.º. | Torna o termo autocontido e pede a expressão que representa a comparação vertical com a reta. |
| `EX-VN10EST-BIV-026` | O item pressupunha o conceito de resíduo sem o definir e «todos os dados estão errados» estava fora de um diagnóstico estatístico realista. | Define a diferença observada, liga o padrão à qualidade do modelo e usa uma interpretação plausível como distrator. |
| `DG-VN10EST-DIS-009` | Vírgulas sem espaços tornavam as listas numéricas visualmente ambíguas com a vírgula decimal. | Separa os valores de cada lista e indica que os desvios seguem a ordem dada. |
| `EX-VN10EST-DIS-022` | «Nos mesmos dados» não referia uma lista anterior no fluxo de exame e omitia a convenção de cálculo do quartil. | Dá a lista completa e a regra da mediana das metades, coerente com o item de Q₁ da mesma família. |
| `MS-VN10EST-DIS-024` | A explicação dizia que a caixa representa exatamente 50% dos dados, leitura problemática com empates e diferentes convenções de quartis. | Explica os extremos da caixa por meio de Q₁ e Q₃. |
| `MS-VN10EST-LOC-002` | A única opção detalhada dava as duas regras da mediana, enquanto as restantes eram respostas curtas de natureza distinta. | Formula as alternativas como critérios calculáveis e explicita na solução a regra para cada paridade. |
| `MS-VN10EST-LOC-049` | O distrator «Média=1 100 €» trazia um cálculo errado da média, que podia ser eliminado sem decidir a adequação da medida. Os salários eram difíceis de separar visualmente. | Apresenta a média real (2 460 €), separa os salários e fundamenta a escolha da mediana. |
| `DG-VN10EST-PPA-001` | Uma representação gráfica e a média dos dados nem eram conjuntos de unidades. A opção correta tinha muito mais texto. | Compara conjuntos diferentes de unidades para testar a distinção entre população e amostra. |
| `MS-VN10EST-PPA-021` | As permutações «população: litros de água» e «variável: famílias» forneciam pistas gramaticais sem avaliar a distinção entre família, amostra e medida. | Reescreve os distratores como confusões entre amostra e população, medida diferente e unidade estatística diferente. |
| `MS-VN10EST-UNI-012` | A opção correta tinha mais de quatro vezes o comprimento das restantes e incluía toda a informação sobre classes adjacentes. | Compara afirmações de comprimento semelhante sobre a disposição dos retângulos e o significado dos intervalos. |

### 10.º ano · Matemática financeira

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-10FIN-STEPS-1` | A grelha exigia juro e montante, mas o enunciado pedia apenas o montante. O enunciado não distinguia a escrita numérica dos valores da conclusão com unidade. | Pede o juro e o montante e especifica a unidade na conclusão. Aceita também a formulação correta «capital acumulado ... euros». |
| `DG-VN10FIN-BRL-001` | «O bruto é apenas o valor por hora» e «não existe diferença» eram alternativas muito curtas e desligadas dos descontos. | Apresenta definições de dimensão comparável que confundem descontos, subsídios ou bases de remuneração. |
| `MS-VN10FIN-BRL-007` | A soma direta de 11% e 6% pressupõe que ambos os descontos incidem no salário bruto. | Especifica a base comum no enunciado. |
| `EX-VN10FIN-IRS-007` | «Na mesma tabela» remetia para um item anterior que pode não aparecer junto. | Apresenta como regra autónoma as taxas progressivas de cada parcela. |
| `MS-VN10FIN-IRS-012` | Duas alternativas eram incompatíveis com um rendimento no escalão de 30% com taxa efetiva de 18%. A explicação não identificava os pesos da média. | Testa a confusão entre parcelas, taxas marginais e efetiva. Explica a razão imposto/rendimento. |
| `EX-VN10FIN-IRS-024` | A abreviatura «tabela 10%-20%-30%» omitia que cada taxa só se aplica à parcela do escalão. | Explicita as três taxas marginais e respetivos limites. |
| `MS-VN10FIN-IRS-041` | A resolução dava apenas a soma de três valores, sem ligar nenhum à respetiva parcela tributável. | Mostra as três bases e os impostos parciais. |
| `DG-VN10FIN-JC-001` | «Uma média dos montantes» não especificava que montantes seriam usados. | Distingue a base de cálculo correta da média entre dois valores conhecidos. |
| `MS-VN10FIN-JC-015` | «Tende a dar» tratava como tendência uma desigualdade estrita garantida por capital e taxa positivos após o primeiro período. Um distrator afirmava que a capitalização elimina juros. | Explicita que a taxa tem de ser a mesma nos dois regimes e que o composto dá um montante estritamente maior, completando a comparação. |
| `EX-VN10FIN-JC-027` | «Uma aplicação mensal de 1 000 €» também podia significar depósitos mensais de 1 000 €. | Estabelece que 1 000 € é o capital inicial único. |
| `MS-VN10FIN-JC-040` | O enunciado não explicita o regime de capitalização nem o arredondamento esperado. | Indica capitalização anual e pede o resultado em cêntimos. |
| `EX-VN10FIN-JC-042` | A taxa constante aparecia apenas na explicação e dois distratores contradiziam condições básicas do crédito. | Acrescenta taxa positiva e constante e distingue crescimento do saldo e do juro do período. |
| `DG-VN10FIN-JS-001` | «Uma média aleatória» não é uma base de cálculo de juros plausível. | Testa a ideia errada de calcular sobre um capital médio. |
| `MS-VN10FIN-JS-016` | «Linearmente» podia confundir o montante com uma função linear na aceção escolar portuguesa, pois o montante inicial é o termo independente. Um distrator aleatório testava pouca compreensão. | Distingue acréscimo constante de multiplicação por fator fixo, sem chamar linear à função afim. |
| `EX-VN10FIN-JS-023` | O capital calculado é 1 145,4545… €, mas a pergunta pedia um capital sem indicar aproximação. | Pede o capital inicial arredondado aos cêntimos. |
| `EX-VN10FIN-JS-042` | O valor 80 só é um juro por ano se t medir anos e M(t) representar o montante monetário. | Dá unidades e interpreta o coeficiente no modelo. |

### 10.º ano · Funções

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CP10F-MON-1` | «Sem domínio» era incompatível com a própria premissa, que identificava um intervalo. | Usa a possibilidade de crescimento apenas em parte do intervalo como erro a distinguir. |
| `CRV2-10FUN-AFIM-STEPS-1` | A substituição C(10)=4+10×1,5 era recusada, embora corresponda à mesma distância e à mesma multiplicação. | Aceita a substituição com os fatores na ordem inversa. |
| `CRV2-10FUN-EXT-STEPS-1` | O primeiro passo aceitava repetir o polinómio desenvolvido, sem completar o quadrado, apesar de se chamar «Escrita na forma de vértice». | O enunciado identifica a forma f(x)=(x−p)²+q e pede que se comece a igualdade por f(x)=. A classificação verifica a forma pedida e rejeita a expressão desenvolvida. |
| `CRV2-10FUN-MOD-STEPS-1` | O corretor rejeitava pares com ponto e vírgula, casos em ordem inversa e conjuntos de zeros escritos com a ordem inversa. A referência com vírgula confundia o separador de elementos com a vírgula decimal. | Apresenta a notação com ponto e vírgula e aceita as ordens equivalentes dos dois casos e dos zeros. |
| `D10F-P` | A pergunta pedia uma interpretação geométrica, mas a alternativa marcada apenas traduzia a igualdade para uma definição algébrica. As alternativas misturavam entidades diferentes (ponto, zero, domínio e constância), deixando a leitura de coordenadas sem ser avaliada. | Pede a localização do ponto correspondente no gráfico. Usa quatro pares ordenados comparáveis. A igualdade identifica o ponto (3; 0). |
| `M10F-3` | A premissa sobre outra função e o advérbio «necessariamente» sugeriam que era preciso determinar essa função só pelos zeros. | Pergunta diretamente qual das expressões se anula nos dois valores. |
| `M10F-5` | A resolução dizia que cada fator devia ser zero, mas basta anular um dos fatores. | Invoca a lei do anulamento do produto e resolve as duas equações alternativas. |
| `EX-VN10FUN-AF-007` | O enunciado não define o coeficiente a que compara com 0. | Identifica a expressão da função afim. |
| `EX-VN10FUN-AF-039` | «Paralela» e «perpendicular» não descrevem monotonia, permitindo eliminação sem interpretar os declives. | Substitui por interpretações plausíveis do sinal do declive. |
| `MS-VN10FUN-AF-042` | O enunciado não dizia o que media t, nem quando existiam 120 L. | Define o volume inicial e t em minutos. |
| `MS-VN10FUN-CR-006` | As três alternativas erradas usavam «apenas» e apresentavam uma única forma, deixando a única alternativa longa facilmente identificável. | Contrapõe conjuntos de representações de extensão semelhante. |
| `MS-VN10FUN-CR-007` | «Numa tabela de uma função» pressupunha a conclusão que se pretendia testar. Dois distratores eram impossíveis pelos dados. | Apresenta uma tabela de correspondência e contrasta os motivos de validade. |
| `MS-VN10FUN-CR-022` | A pergunta «pode concluir-se que f não é função» tinha distratores sem relação com a aparente troca de entradas e saídas. | Testa hipóteses concretas sobre pares ordenados e unicidade. |
| `EX-VN10FUN-CR-037` | A frase «No domínio ℝ» atribuía a f um domínio que inclui x=1, onde a expressão não está definida. A segunda resposta afirmativa ocorria com uma condição irrelevante. | Pede a comparação dos domínios naturais e opõe duas comparações erradas de domínios ou gráficos. |
| `VN10FUN-DIZ-002`, `MS-VN10FUN-DIZ-002` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. Na terminologia usada na própria submatéria, «contradomínio» pode designar precisamente a imagem, tornando a quarta alternativa defensável. | Explicita a relação matemática e desenvolve o passo específico deste item. Distingue a imagem do conjunto de zeros, uma confusão plausível entre saídas e as entradas que produzem zero. |
| `VN10FUN-DIZ-003` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. | Explicita a relação matemática e desenvolve o passo específico deste item. |
| `VN10FUN-DIZ-006`, `MS-VN10FUN-DIZ-006` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. A definição confundia os zeros (valores de x) com pontos do gráfico. «Atinge a média» nem sequer identifica uma média no contexto. | Explicita a relação matemática e desenvolve o passo específico deste item. Distingue as abcissas dos pontos das suas coordenadas completas. Substitui por uma confusão entre zero e extremo local. |
| `VN10FUN-DIZ-007`, `MS-VN10FUN-DIZ-007` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. Cruzar o eixo em dois pontos não excluía outros zeros nem zeros de tangência. | Explicita a relação matemática e desenvolve o passo específico deste item. Indica que estas são as únicas interseções entre o gráfico e Ox. |
| `VN10FUN-DIZ-008`, `EX-VN10FUN-DIZ-008` | A opção sobre o eixo Oy era defensável para x=0 e a resolução do piloto não explicava como usar a ordenada. | A pergunta e as opções referem-se à posição em relação a Ox. A resolução usa o sinal da ordenada. |
| `VN10FUN-DIZ-009` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. Dada uma condição sobre x, o enunciado parecia afirmar uma posição para o gráfico inteiro. | Explicita a relação matemática e desenvolve o passo específico deste item. Pergunta pela posição do ponto correspondente à entrada x. |
| `VN10FUN-DIZ-022`, `EX-VN10FUN-DIZ-022` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. | Explicita a relação matemática e desenvolve o passo específico deste item. |
| `VN10FUN-DIZ-023` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. | Explicita a relação matemática e desenvolve o passo específico deste item. |
| `VN10FUN-DIZ-025`, `MS-VN10FUN-DIZ-025` | Repetia exatamente D10F-A, com a mesma expressão x²−4 e as mesmas opções. A cópia MS-VN10FUN-DIZ-025 repetia também essa pergunta. | Pede a interseção entre uma parábola e uma reta. É preciso igualar as ordenadas e simplificar antes de resolver. Conserva as abcissas −2 e 2 como resposta. |
| `VN10FUN-DIZ-026` | Repetia exatamente M10F-5, com os mesmos dois fatores e as mesmas opções. | Acrescenta a transformação x↦−x. É preciso determinar os zeros de f e refletir as abcissas, conservando a resposta 1 e −3. |
| `VN10FUN-DIZ-027` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. | Explicita a relação matemática e desenvolve o passo específico deste item. |
| `VN10FUN-DIZ-029` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. O vocabulário «cruza ou toca» deixava implícita uma continuidade que o sinal sozinho não garante. | Explicita a relação matemática e desenvolve o passo específico deste item. Descreve a ordenada nula no ponto e a mudança de sinal, que são dadas. |
| `VN10FUN-DIZ-030` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. Uma função definida por ramos poderia ter f(1)=0 e ainda uma assíntota vertical em x=1, pelo que a alternativa da assíntota também era possível. | Explicita a relação matemática e desenvolve o passo específico deste item. Especifica que f é quadrática. A parábola toca o eixo no zero indicado e não tem assíntota. |
| `VN10FUN-DIZ-034` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. O enunciado nomeava os dois valores como zeros e a resposta limitava-se a contá-los. Havia um distrator incompatível com os dados. | Explicita a relação matemática e desenvolve o passo específico deste item. Pede para reconhecer e contar os zeros a partir das interseções com Ox. |
| `VN10FUN-DIZ-035` | As alternativas «Só em funções quadráticas» e «Só se for negativo» não correspondiam a erros plausíveis sobre domínio. | Testa o cancelamento de fatores em pontos excluídos e a distinção entre domínio e conjunto de chegada. |
| `VN10FUN-DIZ-036` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. «Zera» não é o verbo corrente na linguagem escolar portuguesa. | Explicita a relação matemática e desenvolve o passo específico deste item. Usa «anula-se» na nova explicação. |
| `VN10FUN-DIZ-037`, `EX-VN10FUN-DIZ-037` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. | Explicita a relação matemática e desenvolve o passo específico deste item. |
| `VN10FUN-DIZ-041` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. A escrita do radical em texto simples podia tornar incerto se o 2 estava dentro da raiz. | Explicita a relação matemática e desenvolve o passo específico deste item. Delimita o radicando com parênteses. |
| `VN10FUN-DIZ-042` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. | Explicita a relação matemática e desenvolve o passo específico deste item. |
| `VN10FUN-DIZ-046` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. | Explicita a relação matemática e desenvolve o passo específico deste item. |
| `VN10FUN-DIZ-047` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. | Explicita a relação matemática e desenvolve o passo específico deste item. |
| `VN10FUN-DIZ-048` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. «Só se f for crescente» era uma ressalva que podia parecer uma segunda resposta à pergunta, e é falsa como condição necessária. | Explicita a relação matemática e desenvolve o passo específico deste item. Explicita que se pergunta o que os dados garantem, troca a ressalva por argumentos falsos e dá um contraexemplo. |
| `VN10FUN-DIZ-050`, `MS-VN10FUN-DIZ-050` | A resolução do piloto inclui um remate automático genérico sobre a escolha da opção, alheio ao raciocínio concreto. O intervalo físico começa em 0 na solução, mas o instante inicial e a unidade temporal estavam implícitos. | Explicita a relação matemática e desenvolve o passo específico deste item. Situa t em segundos e explicita que a observação começa em t=0. |
| `MS-VN10FUN-QUA-012` | O coeficiente a não foi definido na pergunta autónoma. | Declara a forma geral da função e o significado de a. |
| `MS-VN10FUN-QUA-041` | A unidade de t aparecia apenas nas opções. | Define o tempo em segundos no enunciado. |
| `EX-VN10FUN-TRM-038` | A resolução identificava o ponto de mudança, mas não explicava qual o sinal de cada ramo. | Aplica a definição de módulo de acordo com o sinal do argumento. |

### 10.º ano · Geometria analítica

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-10GA-DIST-STEPS-1` | Parte da pontuação exigia etapas, ordem de coordenadas ou forma de resultado que o enunciado não explicitava. | Explicita no enunciado as etapas avaliadas, conservando as referências e a pontuação. |
| `CRV2-10GA-LG-STEPS-1` | Parte da pontuação exigia etapas, ordem de coordenadas ou forma de resultado que o enunciado não explicitava. O modelo do passo do raio incluía uma cadeia de igualdades que o campo numérico recusava. | Explicita no enunciado as etapas avaliadas, conservando as referências e a pontuação. O modelo do campo mostra r=5 e a resolução apresenta o cálculo. |
| `CRV2-10GA-STEPS-1` | Parte da pontuação exigia etapas, ordem de coordenadas ou forma de resultado que o enunciado não explicitava. | Explicita no enunciado as etapas avaliadas, conservando as referências e a pontuação. |
| `CRV2-10GA-VET-STEPS-1` | Parte da pontuação exigia etapas, ordem de coordenadas ou forma de resultado que o enunciado não explicitava. | Explicita no enunciado as etapas avaliadas, conservando as referências e a pontuação. |
| `M10G-2` | Repetia a distância entre a origem e (3,4) de MS-VN10GA-DPM-002 e incluía 12, o produto das coordenadas. | Pede a abcissa de um ponto a distância fixa no primeiro quadrante, com dois distratores a partir de confusões previsíveis. |
| `M10G-3` | O distrator (1,0,5) podia ser lido como um terno de coordenadas, apesar de o item ser no plano. | Distingue a vírgula decimal do separador de coordenadas nos quatro pares. |
| `MS-VN10GA-CT-021` | A resolução repetia a regra de rotação sem justificar a troca de coordenadas e os sinais. | Justifica a rotação anti-horária pela imagem dos dois vetores unitários. |
| `EX-VN10GA-DPM-027` | Repetia a definição da mediatriz de DG-VN10GA-LG-001 e não exigia A≠B. | Dá um critério algébrico com extremos distintos e pede a sua interpretação geométrica. |
| `DG-VN10GA-LG-001` | A mediatriz só está definida se os pontos forem distintos. | Explicita A≠B no enunciado. |
| `MS-VN10GA-LG-023` | O cálculo exigia completar quadrados numa equação de circunferência fora da forma reduzida, embora as AE só considerem equações reduzidas. | Apresenta uma equação reduzida equivalente e pede a interpretação dos parâmetros. |
| `EX-VN10GA-RET-018` | A condição do declive sem distinguir retas iguais resultava suficiente também para retas coincidentes. A explicação não ligava a direção ao declive. | Restringe a retas distintas e explica o vetor diretor comum. |
| `MS-VN10GA-RET-021` | O critério de perpendicularidade entre declives é matéria de Produto Escalar do 11.º ano. | Dá o critério no enunciado para avaliar só a tradução de uma relação para linguagem algébrica. |
| `VN10GA-VET-003` | Repetia o cálculo de AB com as mesmas coordenadas de D10G-P e CRV2-10GA-VET-STEPS-1. | Pede a mesma subtração de coordenadas depois de identificar A e B noutra representação, a partir da origem. |
| `VN10GA-VET-005` | A resolução definia norma como comprimento, mas não explicava por que surge a raiz da soma dos quadrados. | Deriva a expressão a partir das projeções e do teorema de Pitágoras. |
| `VN10GA-VET-009`, `EX-VN10GA-VET-009` | A explicação atribuía direção e sentido ao vetor nulo ao descrever o vetor oposto em geral. | Explica a mudança das componentes por multiplicação por −1 e trata explicitamente o caso nulo. |
| `VN10GA-VET-017`, `MS-VN10GA-VET-017` | A hipótese deixava v=u=0 dentro do enunciado e a condição de não nulidade aparecia só na opção mais longa. «Não relacionados» era um distrator vazio. | Põe a hipótese no enunciado e faz as opções compararem direção, sentido e norma. |
| `VN10GA-VET-027`, `EX-VN10GA-VET-027` | «A soma é zero sempre» mistura uma condição verdadeira suficiente com a palavra «sempre», o que permite outra leitura do enunciado. | Pede uma condição necessária e suficiente e usa a soma nula como distrator válido de suficiência sem necessidade. |
| `VN10GA-VET-030` | «Só se forem pontos» e «Só se tiverem mesma norma» não respondem ao caso fixo e facilitavam eliminar duas opções. | Pede a conclusão com justificação e dá erros concretos sobre proporcionalidade e norma. |
| `VN10GA-VET-047`, `MS-VN10GA-VET-047` | Pedia «o deslocamento direto» apesar de as opções designarem apenas o seu comprimento. | Pede explicitamente a distância entre o ponto inicial e o final e mostra o cálculo. |

### 10.º ano · Geometria sintética

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `C10GS-1` | Repetia os mesmos dados e o mesmo cálculo de MS-VN10GS-PC-002. | Pede o ângulo a partir de dois ângulos externos suplementares, mantendo a chave de 70°. |
| `CRV2-10GS-BAR-STEPS-1` | Parte da pontuação exigia etapas, ordem de coordenadas ou forma de resultado que o enunciado não explicitava. | Explicita no enunciado as etapas avaliadas, conservando as referências e a pontuação. |
| `CV51-10GS-RP-1` | Uma parede inclinada ou chão desnivelado não determinam a altura a partir dos comprimentos indicados. | Dá a perpendicularidade da parede e do chão e mantém o cálculo. |
| `MS-VN10GS-BAR-024` | O enunciado não dizia que AM era uma mediana. | Identifica ABC e a mediana AM, o que justifica que G pertence a AM e a razão 2:1 se aplica. |
| `MS-VN10GS-CI-021` | A resolução citava a circunferência de diâmetro igual à hipotenusa sem ligar explicitamente o seu centro à propriedade do circuncentro. | Identifica o teorema do ângulo inscrito e as três distâncias iguais. |
| `MS-VN10GS-CI-043` | «Maior circunferência interior tangente aos três lados» sugere que há várias circunferências inscritas a comparar. | Pede o centro da circunferência inscrita a partir da condição de tangência. |
| `MS-VN10GS-E9-002` | O e H não eram definidos, e a razão era indeterminada no caso equilátero. | Identifica os centros e explicita a condição não equilátera. |
| `MS-VN10GS-E9-003` | A opção correta era a única que definia os centros e tinha muito mais texto do que as restantes. | Define os pontos no enunciado e compara posições próximas na reta de Euler. |
| `MS-VN10GS-E9-006` | «Três dos nove pontos» não dizia de que circunferência se tratava fora da lista temática. «Os três centros de massa» de um triângulo é um distrator impossível. | Identifica a circunferência e usa um distrator ligado a um centro notável. |
| `EX-VN10GS-E9-007` | «Outros três» não tinha antecedente, pelo que também eram defensáveis as interseções das medianas com os lados, pois são os pontos médios. | Indica os pontos médios já contados e pede a terceira família de pontos. |
| `DG-VN10GS-E9-015` | Usava O, G e H sem os identificar. | Define os três centros num triângulo não equilátero e explica a relação de Euler. |
| `MS-VN10GS-E9-022` | Sem saber que pontos eram O, G e H ou se G estava entre O e H, tanto 18 como 6 seriam possíveis em linha reta. | Define os centros e usa a posição dada pela reta de Euler na resolução. |
| `MS-VN10GS-E9-023` | Limitava-se à resposta ON=12 sem aplicar explicitamente a propriedade de ponto médio. | Explica que ON é metade de OH. |
| `EX-VN10GS-E9-026` | O, H, G e N não eram apresentados em nenhum lugar do enunciado. | Define a origem, os centros e a coordenada de H num enunciado autónomo. |
| `MS-VN10GS-ORT-006` | A chave revelava a propriedade pedida na única opção com explicação e, num triângulo equilátero, duas medianas também seriam suficientes. | Pede a construção válida para qualquer triângulo e equilibra as alternativas. |
| `EX-VN10GS-ORT-013` | O enunciado estava truncado e o ângulo ADB nem sequer está definido se D=B. | Pede o ângulo entre as duas retas, o que inclui o caso em que a altura passa por um vértice. |
| `EX-VN10GS-ORT-025` | A resolução enunciava apenas a implicação de triângulo retângulo para ortocentro no vértice, quando a pergunta exige o sentido inverso. | Deduz o ângulo reto a partir de uma altura que passa pelo vértice em causa. |
| `MS-VN10GS-ORT-047` | As alturas não intersectam necessariamente o segmento do lado oposto, por exemplo num triângulo obtusângulo. | Usa as retas que contêm os lados e inclui o caso de prolongamento. |
| `MS-VN10GS-PC-014` | Uma mediatriz é relativa a um lado, não ao vértice. | Faz corresponder explicitamente a mediatriz ao lado oposto e explica a propriedade. |
| `MS-VN10GS-PC-026` | 8:10 e 4:5 eram a mesma razão e, por isso, duas respostas corretas. | Substitui 8:10 pela razão inversa e explicita a ordem e a raiz quadrada. |
| `EX-VN10GS-PC-042` | «Moda das medidas» era alheia à construção e a mediatriz no singular tornava a instrução imprecisa. | Explicita as duas mediatrizes e troca o distrator por outro centro notável do triângulo. |

### 11.º ano · Cálculo diferencial

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CP11D-MON-1` | Repetia a condição, o intervalo e a conclusão de D11D-A. | Transferida a leitura do sinal da derivada para uma variável com significado no contexto. |
| `CRV2-11CD-MON-STEPS-1` | A classificação rejeitava intervalos de monotonia corretos que incluíssem x=2. | Aceites duas formas equivalentes com o ponto crítico incluído. O sinal da derivada é estrito no interior de cada intervalo e f é contínua em x=2. |
| `CRV2-11CD-TAN-STEPS-1` | O campo do declive rejeitava a cadeia de igualdades do modelo numérico. | O exemplo do campo passa a m=2. A igualdade f′(1)=2 também é aceite e o cálculo continua na resolução. |
| `CRV2-11CD-TV-STEPS-1` | A velocidade era apresentada como um número sem escala para a posição e o tempo. O passo pedia uma velocidade sem indicar que o campo espera um valor numérico e a unidade é fixada no enunciado. | Explicitados metros e segundos e calculada a derivada com a unidade pedida. Indicadas a grandeza e a unidade no rótulo do passo e pedido o valor numérico. |
| `CV51-11CD-OPT-1` | A resolução indicava o vértice sem o relacionar com o domínio geométrico. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `CV51-11CD-OPT-2` | A solução usava «é máximo» sem indicar se o máximo era o ponto, a abcissa ou o valor. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `CV51-11CD-TV-1` | A resolução e as opções usavam m/s, embora só se definisse a unidade da posição. | Explicitada a unidade de t. |
| `D11D-H` | O sinal de f′ de cada lado de 3 não garante extremo nesse ponto sem continuidade. | Indicada a continuidade em 3 e explicitada a sua função no teste de monotonia. |
| `DG-VN11CD-DP-001` | «A área acumulada» elimina-se sem distinguir taxas de variação. | Usadas grandezas associadas ao ponto a e distinguida taxa instantânea de taxa média. |
| `MS-VN11CD-DP-002` | A solução omitia o acento de «é» e repetia a opção marcada sem explicar a ligação à secante. | Explicitada a passagem do declive da secante ao da tangente e corrigidos os acentos. |
| `MS-VN11CD-DP-003` | As opções usavam código cru para os limites, e o texto tinha acentos em falta. | Passados os limites à notação de leitura e explicado o quociente incremental. |
| `DG-VN11CD-DP-011` | A solução mandava derivar, sem mostrar a expressão da derivada. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11CD-DP-012` | A solução mandava derivar, sem mostrar a expressão da derivada. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11CD-DP-013` | A solução mandava derivar, sem mostrar a expressão da derivada. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `EX-VN11CD-DP-014` | A solução mandava derivar, sem mostrar a expressão da derivada. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11CD-DP-026` | O limite aparecia em sintaxe técnica e a solução introduzia a sem a definir. | Apresentado o limite em notação legível e desenvolvido o quociente antes da passagem ao limite. |
| `EX-VN11CD-DP-027` | O limite aparecia em sintaxe técnica e a solução introduzia a sem a definir. | Apresentado o limite em notação legível e desenvolvido o quociente antes da passagem ao limite. |
| `MS-VN11CD-DP-036` | A explicação mantinha acentos em falta e pouco ligava a grandeza ao ponto de tangência. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11CD-DP-041` | A velocidade era apresentada como um número sem escala para a posição e o tempo. | Explicitados metros e segundos e calculada a derivada com a unidade pedida. |
| `EX-VN11CD-DP-042` | A velocidade era apresentada como um número sem escala para a posição e o tempo. | Explicitados metros e segundos e calculada a derivada com a unidade pedida. |
| `MS-VN11CD-FD-002` | «Num intervalo» permitia ler o sinal como uma condição num só ponto, e o verbo não tinha acento. | Explicitada a condição para todos os pontos do intervalo. |
| `MS-VN11CD-FD-003` | «Num intervalo» permitia ler o sinal como uma condição num só ponto, e o verbo não tinha acento. | Explicitada a condição para todos os pontos do intervalo. |
| `DG-VN11CD-FD-011` | Os distratores 0 e «derivada correta mais 1» não correspondiam a erros naturais com o monómio. | Incluídos erros típicos na multiplicação pelo expoente e na redução do expoente, com a aplicação da regra explicitada. |
| `MS-VN11CD-FD-012` | Os distratores 0 e «derivada correta mais 1» não correspondiam a erros naturais com o monómio. | Incluídos erros típicos na multiplicação pelo expoente e na redução do expoente, com a aplicação da regra explicitada. |
| `MS-VN11CD-FD-013` | Os distratores 0 e «derivada correta mais 1» não correspondiam a erros naturais com o monómio. | Incluídos erros típicos na multiplicação pelo expoente e na redução do expoente, com a aplicação da regra explicitada. |
| `EX-VN11CD-FD-016` | Um distrator somava 1 sem razão e outro ignorava os dois termos da expressão. | Usados erros realistas de derivar x³ ou omitir a contribuição de x. |
| `MS-VN11CD-FD-036` | A frase podia ser lida como uma afirmação sobre o comportamento global de f, e a solução não fazia a inferência de monotonia. | Perguntada explicitamente a monotonia no intervalo e concluída a partir do sinal. |
| `MS-VN11CD-FD-037` | A frase podia ser lida como uma afirmação sobre o comportamento global de f, e a solução não fazia a inferência de monotonia. | Perguntada explicitamente a monotonia no intervalo e concluída a partir do sinal. |
| `EX-VN11CD-FD-044` | A resolução indicava o sinal sem concluir a monotonia, e faltavam acentos. | Mostrado o sinal dos dois fatores e concluída a monotonia no intervalo. |
| `MS-VN11CD-FD-046` | Formulava-se a tarefa como determinar f a partir de f′, sugerindo a noção de primitiva antes do seu estudo. | Reformulada como verificação de uma derivada pelas regras do 11.º ano, com C identificado como constante. |
| `EX-VN11CD-FD-049` | Formulava-se a tarefa como determinar f a partir de f′, sugerindo a noção de primitiva antes do seu estudo. | Reformulada como verificação de uma derivada pelas regras do 11.º ano, com C identificado como constante. |
| `MS-VN11CD-MO-003` | Acentuação incompleta e designação sem distinguir abcissa e ponto do gráfico. | Reformulada a definição e explicitada a tangente horizontal. |
| `DG-VN11CD-MO-011` | Duas opções ofereciam conclusões verdadeiras mas parciais, e a solução não enunciava os sinais nem o extremo. | Pedida a combinação de monotonia e extremo, com quatro combinações paralelas e conclusão pelo quadro de sinais. |
| `MS-VN11CD-MO-012` | Duas opções ofereciam conclusões verdadeiras mas parciais, e a solução não enunciava os sinais nem o extremo. | Pedida a combinação de monotonia e extremo, com quatro combinações paralelas e conclusão pelo quadro de sinais. |
| `EX-VN11CD-MO-013` | Duas opções ofereciam conclusões verdadeiras mas parciais, e a solução não enunciava os sinais nem o extremo. | Pedida a combinação de monotonia e extremo, com quatro combinações paralelas e conclusão pelo quadro de sinais. |
| `MS-VN11CD-MO-021` | «Extremo relevante» era vago, e a única opção que indicava um valor numérico completo era a resposta certa. | Pedida a identificação conjunta de tipo, localização e valor do extremo, usando opções paralelas e a forma de quadrado. |
| `MS-VN11CD-MO-031` | Duas opções eram corretas isoladamente, e a solução não efetuava a comparação dos valores. | Pedidos máximo e mínimo absolutos em conjunto, com opções completas e cálculo nos três candidatos. |
| `EX-VN11CD-MO-032` | Duas opções eram corretas isoladamente, e a solução não efetuava a comparação dos valores. | Pedidos máximo e mínimo absolutos em conjunto, com opções completas e cálculo nos três candidatos. |
| `MS-VN11CD-MO-036` | Repetia o cenário e os dados de CV51-11CD-OPT-1. Duas opções eram dimensões em que já não existia um retângulo, e a solução não verificava o máximo. | Aplicado o mesmo raciocínio ao contexto de vedação de três lados e escolhidos distratores admissíveis. |
| `MS-VN11CD-MO-046` | Os símbolos de infinito apareciam como «inf» e a solução não concluía o tipo de extremo. | Usados os símbolos de intervalo e inferido o máximo a partir da monotonia. |
| `EX-VN11CD-MO-050` | Acentuação incompleta e explicação que não justificava a exclusão do candidato. | Corrigidos os acentos e ligada a exclusão às restrições do problema. |
| `DG-VN11CD-REG-001` | O enunciado omitia o acento e não explicitava a hipótese de derivabilidade. | Indicada a derivabilidade e enunciada a regra de soma. |
| `MS-VN11CD-REG-002` | O distrator f′/c podia nem estar definido para c=0, e faltava o acento de «é». | Usado um distrator sempre definido e explicada a passagem da constante para fora do limite. |
| `MS-VN11CD-REG-003` | A regra estava apresentada como frase incompleta com acentos em falta, e a resolução só nomeava a regra. | Apresentada a fórmula e exemplificada a sua aplicação. |
| `DG-VN11CD-REG-011` | Os distratores 0 e «derivada mais 1» tinham pouco valor diagnóstico. | Trocados por erros na redução dos expoentes ou na multiplicação dos coeficientes, com desenvolvimento da derivada. |
| `MS-VN11CD-REG-012` | Os distratores 0 e «derivada mais 1» tinham pouco valor diagnóstico. | Trocados por erros na redução dos expoentes ou na multiplicação dos coeficientes, com desenvolvimento da derivada. |
| `MS-VN11CD-REG-013` | Os distratores 0 e «derivada mais 1» tinham pouco valor diagnóstico. | Trocados por erros na redução dos expoentes ou na multiplicação dos coeficientes, com desenvolvimento da derivada. |
| `EX-VN11CD-REG-017` | Os distratores 0 e «derivada mais 1» tinham pouco valor diagnóstico. | Trocados por erros na redução dos expoentes ou na multiplicação dos coeficientes, com desenvolvimento da derivada. |
| `MS-VN11CD-REG-021` | Dois distratores eram a expressão original e zero. A resolução invocava o produto sem mostrar os dois termos. | Testados erros de derivar apenas um fator ou multiplicar as duas derivadas, com desenvolvimento da regra do produto. |
| `MS-VN11CD-REG-022` | Dois distratores eram a expressão original e zero. A resolução invocava o produto sem mostrar os dois termos. | Testados erros de derivar apenas um fator ou multiplicar as duas derivadas, com desenvolvimento da regra do produto. |
| `EX-VN11CD-REG-023` | Dois distratores eram a expressão original e zero. A resolução invocava o produto sem mostrar os dois termos. | Testados erros de derivar apenas um fator ou multiplicar as duas derivadas, com desenvolvimento da regra do produto. |
| `EX-VN11CD-REG-046` | A resposta dependia de reconhecer uma frase abstrata, sem demonstrar a equivalência de dois métodos. | Corrigida a acentuação e calculada a mesma derivada por expansão e pela regra do produto. |
| `MS-VN11CD-TAN-002` | «Tangente em x=a» não identificava o gráfico e faltavam acentos. | Identificado o gráfico e explicitado o significado de f′(a). |
| `MS-VN11CD-TAN-003` | O texto tinha acentos em falta e a resolução apenas nomeava uma fórmula. | Explicitados o ponto e o declive que determinam a equação. |
| `DG-VN11CD-TAN-011` | A reta era calculada sem mostrar de onde vinham o ponto e o declive. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11CD-TAN-012` | A reta era calculada sem mostrar de onde vinham o ponto e o declive. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11CD-TAN-013` | A reta era calculada sem mostrar de onde vinham o ponto e o declive. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `EX-VN11CD-TAN-016` | A reta era calculada sem mostrar de onde vinham o ponto e o declive. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11CD-TAN-026` | A resolução apresentava só uma equação equivalente, sem explicar o uso dos dados. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11CD-TAN-036` | Faltava acento em «é» no enunciado e na solução. | Corrigida a frase e explicitada a interpretação da derivada. |
| `EX-VN11CD-TAN-037` | Faltava acento em «é» no enunciado e na solução. | Corrigida a frase e explicitada a interpretação da derivada. |
| `EX-VN11CD-TAN-043` | Pedia «reta normal» sem definir o termo no contexto de cálculo diferencial do 11.º ano. | Pedida diretamente a perpendicular à tangente pelo ponto e desenvolvido o produto dos declives. |
| `MS-VN11CD-TAN-046` | A aproximação linear aparecia sem definição, e apenas a alternativa correta dizia «aproximadamente», repetindo a formulação do enunciado. | Fornecido o método através da reta tangente, com alternativas no mesmo formato e cálculo na abcissa indicada. |
| `DG-VN11CD-TM-001` | A fórmula envolve divisão por b−a, mas não se exigia que a e b fossem distintos. | Explicitada a condição b≠a e explicada a relação com a secante. |
| `MS-VN11CD-TM-002` | O enunciado omitia o acento de «é», e dizer que a secante passa pelos pontos não explicava a relação. | Perguntado o significado geométrico e ligada a definição à fórmula do declive. |
| `MS-VN11CD-TM-003` | O enunciado e a resolução omitiam acentos, e «saída» e «entrada» surgiam sem referência ao cenário. | Identificadas a distância e a duração e explicitada a divisão das unidades. |
| `EX-VN11CD-TM-021` | Parênteses supérfluos em 2x+(3) e omissão de acentos na solução. | Simplificada a escrita e confirmado o declive com o cálculo da taxa média. |
| `MS-VN11CD-TM-031` | A resolução atribuía unidades que não tinham sido dadas no enunciado. | Explicitadas as unidades das duas grandezas e usada a vírgula decimal quando aplicável. |
| `MS-VN11CD-TM-032` | A resolução atribuía unidades que não tinham sido dadas no enunciado. | Explicitadas as unidades das duas grandezas e usada a vírgula decimal quando aplicável. |
| `EX-VN11CD-TM-033` | A resolução atribuía unidades que não tinham sido dadas no enunciado. | Explicitadas as unidades das duas grandezas e usada a vírgula decimal quando aplicável. |

### 11.º ano · Contagem

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `M11C-2` | O primeiro algarismo podia ser confundido com o primeiro dígito de um número de dois algarismos, para o qual a contagem seria 90. | Especifica-se que o código também pode começar por zero. A conta do oráculo mantém-se em 10×10. |
| `M11C-3` | A impossibilidade de atribuir os dois cargos à mesma pessoa ficava implícita. | Identifica-se a condição de titulares distintos e justifica-se a redução da segunda escolha. |
| `MS-VN11CONT-AM-002` | O texto da solução sugeria multiplicar contagens globais em quaisquer etapas sucessivas. Alguns distratores eram imediatamente excluídos por não constituírem situações de contagem. | A resolução explicita que a segunda etapa tem o mesmo número de escolhas após cada primeira escolha, e as alternativas descrevem estruturas de contagem. |
| `EX-VN11CONT-AM-023` | «Números de 3 algarismos pares» podia querer dizer que todos os algarismos eram pares. | Identifica-se o número como par, independentemente da paridade das centenas e das dezenas. |
| `EX-VN11CONT-AM-046` | «Multiplica-se sempre o total de opções médias» era impreciso. Multiplicar a média dos tamanhos dos ramos pelo número de ramos também daria o total se essa fosse a interpretação. | Para duas etapas, a chave indica a soma exata por ramo e o distrator passa a usar explicitamente o maior ramo, que pode sobrecontar. |
| `DG-VN11CONT-ARR-016` | A expressão A(n,2) era dada sem condição sobre n. | Explicita-se que n é natural e que n≥2. |
| `MS-VN11CONT-ARR-018` | A redação não explicitava n≥k nem que se pretendia uma identidade universal, importante porque em k=1 várias opções coincidem. | Pede-se a identidade válida para todos os n e k com 1≤k≤n, e mostra-se por que a igualdade direta é só um caso particular. |
| `MS-VN11CONT-COMB-016` | As alternativas «só se houver 8 cargos» e «só se as pessoas forem iguais» não representavam erros plausíveis de contagem. | As alternativas passam a testar a diferença entre escolher uma dupla e atribuir dois cargos distintos. |
| `MS-VN11CONT-COMB-049` | Era matematicamente igual a MS-VN11CONT-COMB-021, com escolha não ordenada de três elementos entre doze e opções iguais. | Pergunta-se quantos subconjuntos de nove tópicos podem ficar de entre doze. A chave 220 mantém-se pela bijeção entre as escolhas de tópicos incluídos e excluídos. |
| `DG-VN11CONT-DG-001` | Derivadas, equações e funções contínuas eram opções alheias às decisões de contagem e permitiam responder por eliminação. | Introduzem-se distratores plausíveis sobre ordem, independência e contagem duplicada. |
| `EX-VN11CONT-DG-007` | «Todos os ramos» podia incluir sub-ramos e levar a contar uma mesma folha mais de uma vez. | A soma inclui apenas os sub-ramos disjuntos que saem diretamente da raiz. |
| `MS-VN11CONT-DG-009` | Cálculos com decimais, uso de símbolos e ausência de raciocínio são distratores sem relação prática com a organização de uma contagem. | As opções testam completude da lista e ausência de dupla contagem, duas condições que têm de ocorrer em simultâneo. |
| `DG-VN11CONT-DG-017` | Perguntava o número de folhas sem explicitar as escolhas representadas pela árvore, e a resolução continha apenas a soma. | Descrevem-se os dois níveis de escolha e somam-se as folhas dos ramos disjuntos. |
| `MS-VN11CONT-DG-021` | «Palavras» podia ser interpretado como palavras do português, e a repetição não estava declarada. | Contam-se sequências de letras, com repetição permitida. |
| `MS-VN11CONT-DG-022` | «Palavras» tanto podia significar sequências de letras como palavras com significado. | Usa-se sequência de duas letras distintas e explicita-se a eliminação das três repetições. |
| `EX-VN11CONT-DG-023` | A diagonal só identifica i=j quando as linhas e as colunas têm os mesmos índices pela mesma ordem. | Fixa-se o modo de indexar ambos os eixos da tabela. |
| `EX-VN11CONT-FAT-007` | A relação recursiva n!=n(n−1)! requer n≥1, pois (−1)! não está definido neste contexto. | Explicita-se n natural positivo e justifica-se a igualdade pelo produto dos fatores. |
| `DG-VN11CONT-FAT-011` | O quociente com (n−1)! não explicita o conjunto permitido de valores de n. | Define-se n como natural positivo. |
| `MS-VN11CONT-FAT-017` | «Muito rápida» não especificava uma propriedade matemática mensurável. | Substitui-se o juízo qualitativo pela propriedade de crescimento do quociente entre termos consecutivos, demonstrada com a recorrência do fatorial. |
| `EX-VN11CONT-FAT-027` | O enunciado não indicava o domínio de n num quociente de fatoriais. | Restringe-se n aos inteiros não negativos e explicita-se o fator comum. |
| `MS-VN11CONT-FAT-047` | A resolução indicava que o número de escolhas diminuía, sem justificar o produto de seis fatores. | Conta-se a disponibilidade em cada lugar e aplica-se o princípio multiplicativo. |
| `EX-VN11CONT-FAT-050` | Voltava a contar todas as ordens de sete elementos, como MS-VN11CONT-PERM-047, e vários distratores eram meras funções sem relação com a ordenação. | Introduz-se uma posição final fixa entre oito itens. A contagem continua a ser 7! através dos sete itens livres e os distratores representam erros de ordenação. |
| `MS-VN11CONT-PERM-018` | «Em geral» sugeria exceções numa troca entre duas posições de uma permutação de elementos distintos. | Fixa-se que são duas posições diferentes e explicita-se que a permutação muda sempre. |

### 11.º ano · Funções e polinómios

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-11FUN-RUFFINI-STEPS-1` | O corretor aceitava o polinómio desenvolvido ou uma fatorização incompleta sem o prefixo P(x)= como se fossem a fatorização completa. | O último campo passou a pedir os três fatores de primeiro grau separados por «;». O corretor verifica a lista em qualquer ordem, reconhece também o produto completo com P(x)= e mantém a pontuação parcial prevista para as duas formas incompletas declaradas. |
| `DG-VN11FUN-AM-001` | «Tipicamente» e «pode divergir» não expressavam o critério de assíntota vertical para funções racionais. | Formulado o critério pela ordem dos fatores e justificado o crescimento em módulo. |
| `MS-VN11FUN-AM-002` | A resolução podia sugerir que basta o denominador anular-se para existir assíntota. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `EX-VN11FUN-AM-009` | «Coeficientes líderes» é uma formulação pouco natural e não se explicava a razão dos termos de maior grau. O item pedia um resultado geral para funções racionais com numerador e denominador do mesmo grau, além dos quocientes de funções afins das AE do 11.º ano. | Perguntada a ordenada da assíntota e identificados os coeficientes dos termos de maior grau. Restringida a pergunta aos quocientes de funções afins não constantes e calculada a aproximação horizontal nessa família. |
| `DG-VN11FUN-AM-016` | «Divide» podia pedir o quociente euclidiano x ou a expressão racional x+1/x. | Identificado o pedido de reescrita da expressão racional e indicado o domínio. |
| `MS-VN11FUN-AM-018` | «A divisão dá» podia referir-se ao quociente euclidiano, que aparecia como opção distinta da chave. | Pedido o valor da função reescrito como quociente mais uma fração, com indicação do domínio. |
| `MS-VN11FUN-AM-021` | A resolução falava de «um fator cancelado» sem distinguir cancelamento total de parcial. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `EX-VN11FUN-AM-023` | A solução indicava apenas os graus, sem explicar o comportamento. O estudo assintótico direto de um quociente com denominador quadrático ia além da família explícita de funções racionais no referencial do 11.º ano. | Acrescentado o cálculo ou fundamento que justifica a resposta. Dada a decomposição em duas funções estudadas no 11.º ano. A assíntota resulta da soma das alturas de dois termos que se aproximam de zero. |
| `EX-VN11FUN-AM-039` | O diagnóstico de assíntotas oblíquas pertence ao estudo geral de assíntotas do 12.º ano. No 11.º ano, o referencial explicita as assíntotas horizontais e verticais. | A divisão polinomial identifica a expressão afim que descreve o comportamento do gráfico para valores elevados de \|x\|, sem pressupor o estudo das assíntotas oblíquas. |
| `EX-VN11FUN-CQ-010` | «Nos extremos» e «coeficiente líder» eram imprecisos, e a solução só repetia o padrão. | Definida a observação à esquerda e à direita e justificada pelo sinal da potência ímpar. |
| `DG-VN11FUN-CQ-015` | A equivalência esquecia a condição y≥0 da mudança de variável real. | Explicitada a substituição e a condição que permite regressar a x. |
| `MS-VN11FUN-CQ-016` | A resolução parava nas duas equações para x², antes de identificar todas as raízes. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11FUN-CQ-021` | A explicação justificava a interseção mas não a afirmação mais forte «cruza». | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `EX-VN11FUN-CQ-022` | A explicação listava casos sem justificar que 0 é impossível e faltava distinguir multiplicidades. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `EX-VN11FUN-CQ-038` | Faltava acento em «mónica» e a função g aparecia só nas opções. | Nomeado o polinómio g e explicado por que o produto de dois fatores quadráticos já é completo. |
| `MS-VN11FUN-DP-002` | O resto pode ser o polinómio nulo, cujo grau não está definido na convenção escolar. | Pedida a condição para resto não nulo e mencionada separadamente a divisão exata. |
| `MS-VN11FUN-DP-003` | O raciocínio pelo grau era apresentado como aplicável ao polinómio nulo. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11FUN-DP-022` | Repetia o dividendo de MS-VN11FUN-DP-021, novamente com resto nulo e no mesmo contexto de missão. | Introduzida uma divisão não exata, mantendo o quociente e distinguindo-o do resto. |
| `DG-VN11FUN-OP-001` | A resolução não indicava que a soma exige que as duas funções estejam definidas no mesmo ponto. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11FUN-OP-002` | A resolução não indicava a condição de domínio para o produto. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11FUN-OP-009` | «Deixa de importar» podia ser eliminado sem mobilizar o domínio ou a simplificação de frações. | Passou a testar a presunção de que basta verificar os zeros do denominador simplificado. |
| `MS-VN11FUN-OP-021` | O item usava a notação formal de composição de funções do 12.º ano. | Pedida a substituição algébrica diretamente, com a mesma expressão resultante. |
| `MS-VN11FUN-OP-023` | A condição aparecia sem a sua solução em intervalo e a restrição de domínio de g ficava implícita. A função composta e o respetivo domínio estão explicitados nas AE do 12.º ano. | Acrescentado o cálculo ou fundamento que justifica a resposta. Pedida a mesma condição de existência diretamente a partir do radicando, sem usar formalismo do 12.º ano. |
| `EX-VN11FUN-OP-027` | O item exigia reconhecer a definição de domínio da função composta, competência formal das AE do 12.º ano. | Descritas duas avaliações sucessivas e verificadas as respetivas condições de existência, sem pressupor a notação de composição. |
| `MS-VN11FUN-OP-037` | A existência da inversa dependia também de tomar o contradomínio igual à imagem da função. A pergunta referia a inversa de uma função quadrática, formalismo do 12.º ano. | Indicados domínio e contradomínio e obtida a inversa pela solução não negativa. Pedida a solução da equação quadrática no ramo não negativo. Fica preservada a distinção entre as duas raízes. |
| `EX-VN11FUN-OP-039` | A solução não ligava a não negatividade da raiz à definição de módulo. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `DG-VN11FUN-RAT-001` | «Com Q não nulo» podia ser confundido com Q(x) nunca se anular. | Distinguido denominador não identicamente nulo de zeros pontuais excluídos do domínio. |
| `MS-VN11FUN-RAT-011` | «Exceto no ponto x=1» tratava como ponto um valor excluído e alguns distratores eram formulações difíceis de interpretar. | Pedidas conjuntamente a expressão simplificada e a restrição do domínio, com alternativas paralelas. |
| `EX-VN11FUN-RAT-031` | O sentido da translação dependia do sinal de a, sem hipótese ou convenção explícita. | Admitido a>0 e explicado por que a translação horizontal se dá para a direita. |
| `MS-VN11FUN-RR-013` | Para a=0, o distrator (x+a)² coincide com a resposta (x−a)². | Pedida a relação que vale para qualquer a e substituída a opção que podia coincidir com a chave. |
| `EX-VN11FUN-RR-028` | Os zeros 1, 2 e 3 e o coeficiente do termo de maior grau não determinam P sem a indicação do grau. | Fixado grau 3, o que permite determinar os fatores e a expressão de P. |
| `MS-VN11FUN-RR-048` | «Frequentemente» deixava sem definir a variável t e a relação entre o zero e a grandeza. | Definidos o tempo e o significado de P(t), perguntando pelo resultado de avaliar P. |

### 11.º ano · Produto escalar

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `C11PE-1` | Repetia a pergunta de MS-VN11PE-PC-015, com as mesmas quatro opções. | Aplicado o critério aos vetores diretores de duas retas do plano, com relações geométricas plausíveis. |
| `CRV2-11PE-STEPS-1` | A classificação não reconhecia duas justificações naturais que expressam a conclusão correta e o produto escalar não nulo. | Acrescentadas as duas justificações equivalentes, verificadas com o corretor determinístico. |
| `CV51-11PE-AG-1` | A norma vetorial era representada por barras de módulo de números reais. | Usadas barras duplas para a norma e identificado o intervalo do ângulo. |
| `DG-VN11PE-AN-001` | As opções continham θ sem o enunciado identificar esse ângulo. | Definido θ como o ângulo entre u e v e explicitada a fórmula. |
| `MS-VN11PE-AN-006` | O ângulo θ não era definido. | Identificado o ângulo entre os vetores. |
| `DG-VN11PE-AN-010` | θ aparecia sem definição e não se justificava a unicidade da solução. | Identificado o ângulo e usado o seu intervalo para determinar θ. |
| `MS-VN11PE-AN-015` | Vetores não nulos com o mesmo sentido têm produto escalar positivo e ângulo zero, uma exceção omitida. | Restrita a pergunta a vetores não colineares, mantendo a chave «agudo». |
| `EX-VN11PE-AN-023` | A normalização, tal como descrita, incluía o vetor nulo, cuja norma não pode servir de divisor. | Especificado que o vetor é não nulo e mostrado o resultado da divisão. |
| `MS-VN11PE-AN-046` | O enunciado não indicava a unidade da resposta, apesar de dar as unidades das duas grandezas. | Identificado o ângulo entre os vetores e pedida a resposta em joules. |
| `MS-VN11PE-DI-021` | arctan2 podia ser lido como uma notação sem argumento, e não se explicitava como escolher a inclinação. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11PE-DI-037` | A inclinação arctan(0,1) é exata, mas o enunciado pedia uma aproximação. Outra opção explorava a aproximação próxima em radianos e a certa era a única escrita sem qualificador. | Pedida a expressão exata e apresentadas funções inversas resultantes de confusões entre razões trigonométricas. |
| `DG-VN11PE-DIST-001` | As opções misturavam comprimentos, segmentos e declives, permitindo escolher pela dimensão. | Apresentadas quatro definições na unidade de comprimento e identificado o pé da perpendicular. |
| `MS-VN11PE-DIST-002` | As opções misturavam comprimentos e segmentos e continham duas descrições equivalentes da distância à origem. | Usadas construções de comprimentos distintas e explicado o papel da projeção ortogonal. |
| `MS-VN11PE-DIST-021` | A resolução remetia apenas para uma analogia bidimensional e faltava justificar a divisão pela norma. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11PE-DIST-023` | A resolução usava a fórmula sem explicar por que se colocam os coeficientes das duas equações na mesma escala. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `EX-VN11PE-DIST-027` | A opção 7/√49 equivale exatamente à chave 1. | Substituída a opção equivalente pelo erro de dividir pelo quadrado da norma, mantendo a chave. |
| `MS-VN11PE-DIST-043` | O resultado correto falava de «valor absoluto da projeção» sem distinguir projeção escalar e vetorial, e os distratores incluíam produto vetorial e soma de coordenadas sem relação com o problema. | Definidos o vetor de ligação e a normal unitária e usadas grandezas geométricas plausíveis. |
| `EX-VN11PE-PC-044` | A solução dava a interpretação, sem efetuar o produto pedido. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11PE-PC-046` | As grandezas físicas foram apresentadas sem unidades. | Indicados newtons e metros, com resposta pedida em joules. |
| `MS-VN11PE-PERP-004` | O enunciado não exigia vetor não nulo, e (b,a) pode ser perpendicular para pares particulares. | Pedida uma expressão válida para todos os vetores não nulos e removido o distrator parcialmente verdadeiro. |
| `EX-VN11PE-PERP-047` | A direção compatível com o plano não garante que uma viga com implantação indeterminada esteja contida nele. | Indicada a exigência direcional para que a viga possa ficar no plano. |
| `DG-VN11PE-RP-001` | «Menor ângulo entre vetores diretores» podia ser aplicado a um só par escolhido arbitrariamente. | Acrescentado o cálculo ou fundamento que justifica a resposta. |
| `MS-VN11PE-RP-006` | Vetores diretores proporcionais permitem retas coincidentes e no enunciado faltava indicar que eram distintas. | Indicadas retas distintas, condição necessária para concluir que são paralelas. |
| `MS-VN11PE-RP-022` | Pedia o ângulo entre dois planos sem fornecer a redução a ângulos entre vetores, que é a aprendizagem explicitada nas AE do 11.º ano. | Dada a relação com as normais e calculado o ângulo recorrendo ao produto escalar. |
| `EX-VN11PE-RP-029` | Os três distratores continham ressalvas ou fórmulas sem normalização e a resolução só aludia a um complemento. Pedia uma fórmula para o ângulo entre reta e plano sem dar a relação geométrica com o ângulo entre vetores. | Apresentadas relações paralelas entre ângulos, componentes e normas, com justificação do complemento. Fornecida a relação de complementaridade para que o item avalie a aplicação da fórmula do produto escalar. |
| `EX-VN11PE-RP-038` | O produto nulo garante direção paralela ao plano. É preciso conhecer também um ponto para distinguir a reta contida da reta exterior. Dois distratores eram sinónimos. | Admitidas as duas incidências possíveis para a direção dada e distinguidas as relações em todas as opções. |
| `MS-VN11PE-RP-046` | A resolução dependia de uma fórmula para o ângulo entre uma reta e um plano que as AE do 11.º ano não apresentam como aprendizagem autónoma. | Reduzido o cálculo ao seno de um ângulo num triângulo retângulo da rampa, com projeção explicitada. |

### 11.º ano · Sucessões

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `EX-VN11SUC-MC-019` | Não se identificava explicitamente o índice da carga inicial e a resposta assumia n=1. | Fixa-se u_1=100 e a relação da passagem de um ciclo ao seguinte. |
| `MS-VN11SUC-MC-021` | A vírgula de «133,1» era indistinguível das vírgulas que separavam termos. | Separam-se os termos com ponto e vírgula e mostra-se a razão 1,1. |
| `EX-VN11SUC-PA-050` | A chave 100−2,5(n−1) era equivalente ao distrator 102,5−2,5n. A observação anexada ao distrator alegava erradamente que este não tinha o mesmo termo inicial. O modelo também podia ser extrapolado para volumes negativos. | O modelo passa a restringir-se até ao esvaziamento e as quatro opções são fórmulas distintas que permitem verificar o primeiro termo e a razão. |
| `DG-VN11SUC-PG-001` | A definição pela razão entendida como quociente não pode ser aplicada quando o denominador é zero. | O enunciado restringe-se a termos não nulos e a explicação dá também a definição multiplicativa. |
| `MS-VN11SUC-PG-044` | A quantidade era uma população não qualificada e a resposta previa 665,5 indivíduos. | Modela-se um volume, uma grandeza que pode tomar valores fracionários, e distingue-se o 4.º valor do número de aumentos. |
| `EX-VN11SUC-PG-050` | A fórmula pressupunha que o tamanho inicial correspondia ao índice n=1 e não à primeira compressão. | Fixa-se u_1=80 MB antes das compressões e explicita-se o número de reduções em função de n. |
| `MS-VN11SUC-SOM-011` | A resolução remetia apenas para o nome da fórmula geométrica. | Obtém-se a fórmula por subtração de qS_n a S_n e explicita-se q≠1. |
| `EX-VN11SUC-SOM-023` | A resolução abreviava a propriedade da média dos termos simétricos sem explicar a sua origem. | Explicita-se que as diferenças simétricas se compensam, o que dá a média 20. |
| `MS-VN11SUC-SOM-043` | As opções usavam n sem o definir e a solução não mostrava por que a média era o termo central. | Define-se n como a quantidade ímpar de termos e justifica-se a média pelos pares simétricos. |
| `DG-VN11SUC-TR-001` | O banco usava uma definição demasiado ampla de sucessão infinita e alternativas de natureza alheia à definição. | Especifica-se uma sucessão real infinita indexada a partir de 1 e distinguem-se domínio, contradomínio e ordem nas opções. |
| `MS-VN11SUC-TR-002` | u_5 só representa o quinto termo se a indexação começar em 1. | Especifica-se que a indexação começa em n=1. |

### 11.º ano · Trigonometria

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-11TRIG-MOD-STEPS-1` | Não se fixava expressamente o ponto de observação ao nível do solo. A grelha rejeitava a identificação direta da tangente e a notação portuguesa tg na equação equivalente. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Explicita-se o ponto de observação no solo e aceitam-se tg e tan, com a igualdade do modelo escrita de formas matematicamente equivalentes. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `CRV2-11TRIG-STEPS-1` | A grelha rejeitava conjuntos corretos com os elementos na ordem inversa e não aceitava ponto e vírgula como separador. A explicação não mostrava a associação entre as duas soluções. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aceitam-se as duas ordens com ambos os separadores e usa-se ponto e vírgula na resolução de referência. A segunda solução decorre da simetria em relação ao eixo Oy. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `CV51-11TRIG-EQ-2` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `D11T-A` | O valor 5/3 viola o intervalo de valores do cosseno e a condição cos x>0 fornece diretamente o critério de sinal que seria útil verificar. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | O quadrante é dado por x ser agudo, o distrator usa a raiz negativa e a resolução justifica a escolha do sinal. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `D11T-P` | A identificação da fórmula fundamental por reconhecimento repetia a tarefa de DG-VN11TRIG-REL-001. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | A pergunta passa a pedir que se deduza a igualdade a partir da distância à origem no círculo trigonométrico. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `M11T-1` | O distrator 3/2 é impossível para o seno de um ângulo real e a solução omite por que razão se escolhe a raiz positiva. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Usa-se a raiz de sinal errado como distrator e justifica-se o sinal pelo facto de o ângulo ser agudo. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `M11T-2` | A resolução repetia a resposta sem justificar o sinal. | Identifica-se a ordenada do ponto associado no círculo trigonométrico. |
| `M11T-3` | Pedia os mesmos zeros de seno no mesmo intervalo que CV51-11TRIG-EQ-2 e a explicação não mostrava a seleção dos extremos. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | A pergunta passa a exigir a interpretação geométrica da coincidência dos pontos associados a x e −x. A igualdade força sen x=0 e mantém os três ângulos da chave. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `M11T-4` | A resolução repetia o valor a calcular. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Justifica-se o valor notável pela altura de um triângulo equilátero. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `DG-VN11TRIG-AR-008` | O enunciado não indicava a unidade de destino da conversão. | Pede-se explicitamente o valor em radianos e escreve-se o fator de conversão. |
| `EX-VN11TRIG-AR-016` | Vertical e indiferente são distratores que não descrevem convenções plausíveis de rotação. O espaçamento na notação trigonométrica dificultava a leitura. | Todas as opções passam a descrever uma regra sobre o sentido de rotação, mantendo a convenção correta. Separa-se o nome da função do argumento. |
| `MS-VN11TRIG-AR-021` | Os extremos de um intervalo em graus não indicavam as unidades e o termo «coterminal» não era explicado. | O intervalo identifica os graus e a pergunta descreve o mesmo lado final para o mesmo lado inicial. |
| `MS-VN11TRIG-AR-022` | O termo «coterminal» não era explicitado e a unidade ficava implícita. | Descreve-se o mesmo lado final e explicita-se que se usam radianos. |
| `MS-VN11TRIG-CIR-002` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-CIR-003` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `DG-VN11TRIG-CIR-012` | A solução usava a abcissa (1,0) sem mostrar por que esse era o ponto associado. | Identifica-se a interseção com o semieixo positivo Ox e a sua abcissa. |
| `MS-VN11TRIG-CIR-021` | A pergunta era idêntica à M11T-4 e a justificação limitava-se a dizer que era um valor notável. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Pede-se o seno de um ângulo do 2.º quadrante, que se obtém por reflexão do ponto de referência do 1.º quadrante. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-CIR-029` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-CIR-048` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `DG-VN11TRIG-EQ-001` | O domínio real e o conjunto dos inteiros eram representados por letras latinas, e as opções erradas usavam k sem o definir. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Usam-se ℝ e ℤ e o domínio do parâmetro é indicado no enunciado para todas as opções. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-EQ-002` | As opções usavam k como parâmetro mas apenas a chave indicava o seu domínio, em notação latina. O espaçamento na notação trigonométrica dificultava a leitura. | Explicita-se no enunciado que k∈ℤ e que se resolvem a equação em ℝ. Separa-se o nome da função do argumento. |
| `MS-VN11TRIG-EQ-003` | As opções usavam k como parâmetro mas apenas a chave indicava o seu domínio, em notação latina. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Explicita-se no enunciado que k∈ℤ e que se resolve a equação em ℝ. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-EQ-006` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `DG-VN11TRIG-EQ-017` | A equação reduzia-se diretamente à mesma de MS-VN11TRIG-EQ-006, e a resolução terminava antes de encontrar os ângulos. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Usa-se um argumento 2x no cosseno e pede-se a mudança de variável explícita. As soluções π/6 e 5π/6 continuam a ser as únicas no intervalo. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-EQ-021` | A resolução indicava a imagem do cosseno sem relacionar o valor dado com esse intervalo. | Exclui-se explicitamente o valor −3/2, inferior a −1. |
| `MS-VN11TRIG-EQ-022` | A resolução identificava sen x=±1 mas não encontrava as soluções concretas. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Identificam-se as duas ordenadas no círculo trigonométrico e os ângulos correspondentes. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-EQ-029` | A resolução justificava a divisão pelo cosseno, mas não concluía a resolução da equação obtida. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Indicam-se as duas soluções de tg x=1 no intervalo, após excluir os pontos de cosseno nulo. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-EQ-046` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-EQ-048` | A resolução parava na equação auxiliar sen t=0. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Selecionam-se no intervalo dado os múltiplos de π que resolvem a equação auxiliar. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `DG-VN11TRIG-FUN-001` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-FUN-003` | O conjunto dos números reais aparecia como a letra latina R. O espaçamento na notação trigonométrica dificultava a leitura. | Escreve-se ℝ. Separa-se o nome da função do argumento. |
| `MS-VN11TRIG-FUN-006` | A solução só afirmava o mínimo e −π é um valor impossível para a imagem do cosseno. O espaçamento na notação trigonométrica dificultava a leitura. | Relaciona-se o mínimo com a abcissa do círculo trigonométrico e troca-se −π por um valor dentro da imagem. Separa-se o nome da função do argumento. |
| `DG-VN11TRIG-FUN-007` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-FUN-014` | O conjunto dos números reais aparecia como a letra latina R. O espaçamento na notação trigonométrica dificultava a leitura. | Escreve-se ℝ. Separa-se o nome da função do argumento. |
| `MS-VN11TRIG-FUN-019` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-FUN-021` | O enunciado não excluía um modelo constante e o texto da chave equiparava um valor a uma reta. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Assume-se um modelo não constante, identifica-se D como a ordenada da linha média e calcula-se a média dos extremos. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-FUN-022` | Sem B≠0, a função é constante e a amplitude pode ser zero mesmo com A≠0. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Explicita-se que o modelo é não constante e explica-se a amplitude usando os valores extremos. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-FUN-042` | Sem gráfico de referência nem critério de escolha, transladar π/3 para a direita, π para a direita ou π/3 para a esquerda produz o mesmo gráfico, que tem período 2π/3. O espaçamento na notação trigonométrica dificultava a leitura. | Define-se o gráfico de referência e pede-se a menor translação horizontal positiva. Os distratores passam a representar deslocamentos para a direita. Separa-se o nome da função do argumento. |
| `DG-VN11TRIG-MOD-001` | O enunciado não dizia que α era agudo, hipótese necessária para identificar o cateto oposto como tal. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Especifica-se que α é um dos ângulos agudos do triângulo retângulo. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-MOD-002` | O enunciado não dizia que α era agudo, hipótese necessária para identificar um cateto adjacente como tal. | Especifica-se que α é um dos ângulos agudos do triângulo retângulo. |
| `MS-VN11TRIG-MOD-004` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-MOD-006` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `DG-VN11TRIG-MOD-009` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-MOD-011` | Pedia memorizar a lei dos senos, de aprofundamento, e não fixava a correspondência entre letras dos lados e dos ângulos. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Pede-se deduzir a proporção com alturas de um triângulo acutângulo e razões trigonométricas no triângulo retângulo. A relação selecionada preserva-se. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-MOD-013` | Pedia recordar uma lei que as Aprendizagens Essenciais apresentam como aprofundamento e a resolução omitira a substituição que conduz a Pitágoras. | Fornece-se a lei com a identificação dos ângulos e explicita-se a simplificação para A=90°. |
| `MS-VN11TRIG-MOD-022` | Pedia usar a lei dos senos sem a enunciar e não fixava a precisão da aproximação. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Dá-se a relação entre lados e ângulos opostos e pede-se arredondamento às centésimas. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-MOD-026` | O problema pressupunha a lei dos cossenos e a solução passava diretamente à substituição numérica. | Fornece-se a relação de aprofundamento com os dados e explicita-se a substituição. |
| `MS-VN11TRIG-MOD-048` | O enunciado perguntava «quanto mede C?» depois de introduzir C como ponto, sem explicitar que se referia ao ângulo interno em C. | Identifica-se o ângulo no vértice C. |
| `EX-VN11TRIG-MOD-049` | O cálculo dependia da lei dos senos, que não é exigida no núcleo de trigonometria. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Fornece-se a constância do quociente entre lado e seno do ângulo oposto e aplica-se a relação aos lados pedidos. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `DG-VN11TRIG-REL-001` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-REL-002` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-REL-003` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-REL-006` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-REL-007` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-REL-014` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `DG-VN11TRIG-REL-017` | A resolução só confirmava o quociente 3/4 e não mostrava a normalização das duas coordenadas. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | A hipotenusa de comprimento 5 e as razões dos catetos são explicitadas. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-REL-027` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-REL-029` | A solução identificava o sinal e a igualdade dos módulos, mas não mostrava o cálculo do módulo. A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Calcula-se sen² x a partir da fórmula fundamental e escolhe-se o sinal do 3.º quadrante. Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-REL-030` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `EX-VN11TRIG-REL-045` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |
| `MS-VN11TRIG-REL-048` | A notação visível de seno ou tangente divergia da convenção portuguesa adotada na revisão curricular da disciplina. | Aplica-se sen e tg ao texto visível, preservando a expressão matemática. |

### 12.º ano · Números complexos

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-12CPLX-MOD-STEPS-1` | A etapa do cálculo da raiz rejeitava √(25)=5, apesar de o teclado disponibilizar o símbolo √(. | Aceita a escrita natural da raiz com parênteses. O corretor aceita \|z\|=5 no campo numérico do módulo. |
| `CRV2-12CPLX-POW-STEPS-1` | A etapa de argumento deixava o intervalo indefinido e recusava π/2 escrito com o símbolo π. A grelha também recusava a forma trigonométrica com π sem «z³=». | Define o intervalo e aceita as escritas equivalentes do argumento e da forma trigonométrica. O corretor aceita \|z³\|=8 no campo numérico do módulo. |
| `CRV2-12CPLX-STEPS-1` | A etapa final recusava a forma algébrica 3−2*i digitada com multiplicação explícita. | Reconhece a escrita algébrica com produto explícito, com e sem a etiqueta z. |
| `CRV2-12CPLX-TRIG-STEPS-1` | A grelha recusava o módulo 2 sem etiqueta, «2º quadrante», o argumento 2π/3 escrito com π e a forma trigonométrica escrita com π e sem «z=». | Acrescenta as representações equivalentes à grelha de respostas. |
| `CV51-12CPLX-MA-2` | O número e o argumento pedidos reaparecem em CRV2-12CPLX-TRIG-STEPS-1. | Acrescenta interpretação geométrica do oposto do conjugado, cujo argumento em [0, 2π[ continua a ser 2π/3. |
| `M12C-1` | Repete os dados, a soma e o resultado de CRV2-12CPLX-STEPS-1. | Introduz a conjugação de uma das parcelas e conserva a soma final de 3−2i. |
| `MS-VN12CPLX-AG-021` | Quando z1=z2, a igualdade é satisfeita em todo o plano e o segmento não tem mediatriz única. | Acrescenta a hipótese de afixos distintos. |
| `EX-VN12CPLX-AG-037` | Repete a equidistância entre dois reais simétricos de MS-VN12CPLX-AG-022. | Acrescenta a identificação de um módulo que contém o conjugado e reduz a equidistância a dois afixos fora dos eixos. |
| `MS-VN12CPLX-AG-046` | «Distância total» pode sugerir o comprimento do trajeto. O cálculo do módulo repete D12C-A com componentes trocadas. | Define dois pontos e pede a distância entre eles, que exige calcular o deslocamento primeiro. |
| `MS-VN12CPLX-CM-048` | Repete o cálculo e os quatro valores das opções de DG-VN12CPLX-AG-007, com troca de sinal da parte imaginária. | Pede o módulo depois de elevar ao quadrado e dividir por 10. |
| `DG-VN12CPLX-FA-001` | As opções a/b e a+bx podem eliminar-se pela ausência da unidade imaginária e pelo uso de x indefinido. | Usa erros sobre os possíveis coeficientes da forma algébrica. |
| `MS-VN12CPLX-FA-008` | 0+ri e ri dizem exatamente o mesmo. A letra C isolada fica pouco clara como símbolo do conjunto. | Substitui uma das duas opções equivalentes por uma troca do sinal da parte real e usa ℂ no enunciado. |
| `EX-VN12CPLX-FA-038` | A convenção «imaginário puro (admitindo zero)» cria tensão entre o termo e a condição pretendida, pois só z=0 resulta. | Pede explicitamente parte real igual a zero, com m real. |
| `MS-VN12CPLX-FT-002` | Com r<0, r não é o módulo do complexo escrito na expressão. | Explicita r>0 na forma trigonométrica. |
| `MS-VN12CPLX-FT-003` | Se r≤0, θ pode não ser um argumento de z ou z pode não ter argumento. | Explicita r>0 na forma trigonométrica. |
| `MS-VN12CPLX-FT-025` | A igualdade «arg(z)=0 mod 2π» mistura a escrita de um argumento com uma congruência. | Formula diretamente a existência do argumento 0. |
| `EX-VN12CPLX-FT-042` | «Todo o eixo» e «uma circunferência» podem ser eliminados sem distinguir as direções dos argumentos. A origem é excluída por z≠0. | Pergunta em que semieixo fica o afixo e oferece os quatro semieixos. |
| `EX-VN12CPLX-OA-016` | O enunciado não identifica que se multiplica tanto o numerador como o denominador. | Descreve a ampliação da fração e explicita c²+d²>0. |
| `DG-VN12CPLX-OT-001` | As expressões dadas permitem r₁ ou r₂ negativos sem a convenção dos módulos, caso em que r₁r₂ pode ser negativo. | Explicita que r₁ e r₂ são positivos. |
| `MS-VN12CPLX-OT-002` | Quando um dos fatores é zero, o produto não tem argumento. Expressões com r negativo também não identificam α ou β como argumentos. | Acrescenta módulos estritamente positivos. |
| `MS-VN12CPLX-OT-003` | r1 e r2 aparecem nas opções sem ligação explícita aos números do enunciado. | Identifica r1 e r2 como os módulos de z1 e z2. |
| `EX-VN12CPLX-OT-019` | n aparece num denominador e como potência sem indicação de que é um inteiro positivo. | Indica que n é inteiro positivo e explicita a relação entre os módulos. |
| `MS-VN12CPLX-OT-045` | A descrição da dilatação e da rotação não explicita o centro das transformações. | Indica o centro O e explica os efeitos no módulo e no argumento. |
| `EX-VN12CPLX-OT-046` | As transformações podem depender do centro escolhido. A resolução «divide-se o módulo» omite por quanto. | Explicita o centro e identifica o fator da dilatação e o ângulo da rotação. |
| `MS-VN12CPLX-UE-002` | O pedido i³, as quatro opções e a resolução repetem M12C-5. | Pede o conjugado de i⁵. O resultado mantém-se −i. |
| `MS-VN12CPLX-UE-013` | √(−9) requer uma convenção de raiz principal em ℂ. A decomposição √(−9)=√9·i pode induzir o uso indiscriminado da propriedade do produto das raízes. | Pede a solução de z²=−9 com parte imaginária positiva e confirma-a por substituição. |
| `MS-VN12CPLX-UE-019` | A opção «um número sem módulo» elimina-se pela própria definição de complexo. As opções sobre imaginário puro e parte real nula sobrepõem-se. | Usa distratores sobre módulo ou argumento e apresenta ℝ e ℂ na resolução. |
| `EX-VN12CPLX-UE-039` | «Equação real» pode ser lido como uma equação resolvida em ℝ, apesar de ter uma raiz não real. | Explicita que os coeficientes são reais e que a resolução é em ℂ. |

### 12.º ano · Exponenciais e logaritmos

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `BG12E-MOD-1` | Duplicações a cada três horas só impõem valores nesses instantes. O tempo dividido por três não conta duplicações completas quando não é inteiro. | Especifiquei a hipótese de crescimento exponencial e expliquei o expoente pela escala de tempo. |
| `CRV2-12EXPL-LOG-STEPS-1` | O corretor rejeitava a condição de existência em intervalo, a passagem direta x−1=8 e uma verificação correta escrita com «porque». | Acrescentei as formas equivalentes aos passos correspondentes, mantendo a solução x=9. |
| `CRV2-12EXPL-MOD-STEPS-1` | O corretor rejeitava o valor antes do arredondamento quando identificado pela notação P(5)=…, apesar de ser a quantidade pedida. | Acrescentei P(5) como identificação do valor antes do arredondamento e expliquei por que o inteiro mais próximo é 1403. O campo numérico reconhece também P(5) como nome da quantidade antes do valor. |
| `CRV2-12EXPL-STEPS-1` | O passo de igualdade de potências rejeitava a igualdade com os membros invertidos. A resolução deixava implícita a justificação para igualar expoentes. | Acrescentei a igualdade inversa entre as formas aceites e referi a injetividade da base 2. |
| `M12E-4` | A resolução omitia os parênteses e deixava incerto se o expoente incidia sobre e ou sobre todo o logaritmo. | Escrevi o argumento entre parênteses e explicitei a relação entre as funções inversas. |
| `M12E-5` | A escrita log₁₀7 não separava claramente a base e o argumento. A resolução citava a relação de inversão sem a aplicar. | Identifiquei o argumento e mostrei o cálculo pedido. |
| `DG-VN12EXPL-EQ-001` | A equação era a mesma de D12E-A e de CRV2-12EXPL-STEPS-1. | Introduzi um expoente afim para exigir um passo algébrico adicional. A solução continua a ser x=3. |
| `MS-VN12EXPL-EQ-002` | A resolução escrevia a fração como potência e omitia a conclusão. | Completei o raciocínio com a igualdade dos expoentes. |
| `MS-VN12EXPL-EQ-003` | A equação repetia D12E-H, com a mesma passagem direta de logaritmo para potência. | Usei um argumento com fator 2 e escolhi distratores que refletem erros de passagem ou isolamento. A resposta continua a ser 16. |
| `EX-VN12EXPL-EQ-012` | A base do logaritmo era apresentada como código com sublinhado. | Apresentei a base em índice e a equivalência entre o logaritmo e a potência. |
| `MS-VN12EXPL-EQ-014` | A resolução não verificava o domínio e usava a base do logaritmo sem índice visível. | Especifiquei a condição de existência e apliquei a injetividade do logaritmo. |
| `MS-VN12EXPL-EQ-015` | A resolução não indicava a condição de existência e usava sublinhado para a base. | Indiquei x>0 e separei os argumentos das bases. |
| `MS-VN12EXPL-EQ-021` | Em todas as opções com logaritmo natural, o argumento aparecia colado ao símbolo ln. | Delimitei os argumentos e apresentei a passagem até ao isolamento de x. |
| `MS-VN12EXPL-EQ-022` | As opções e a resolução colavam argumentos ao símbolo ln. A resolução parava antes de isolar x. | Delimitei os argumentos e concluí dividindo pelo fator que multiplica x. |
| `EX-VN12EXPL-EQ-026` | A resolução juntava ln e o argumento 8 e concentrava as equivalências numa sequência pouco legível. | Delimitei argumentos e distingui as raízes da equação algébrica da solução no domínio. |
| `MS-VN12EXPL-EQ-043` | Os argumentos surgiam colados a ln e a resolução não isolava o tempo. | Delimitei os argumentos das opções e calculei explicitamente o quociente que dá t. |
| `EX-VN12EXPL-EQ-045` | A resolução recorria à escrita log_1,04 e terminava com uma expressão diferente da opção apresentada. | Usei ln em ambos os membros e mostrei por que se preserva a desigualdade. |
| `DG-VN12EXPL-EXP-001` | A opção a=1 é admissível na definição curricular de função exponencial. A resolução excluía-a sem a hipótese de a função ser não constante. | Pedi explicitamente a condição para uma exponencial real não constante. |
| `MS-VN12EXPL-EXP-006` | «Alternada» não descreve uma monotonia de uma função real com domínio ℝ e pode ser eliminada pela redação. | Substituí por um erro plausível que confunde monotonia e variação absoluta constante. |
| `EX-VN12EXPL-EXP-012` | A identidade com expoentes reais era apresentada sem restringir a base ou quantificar x e y. | Indiquei a base positiva e a validade para todos os expoentes reais. |
| `MS-VN12EXPL-EXP-022` | O argumento justificava o limite superior da imagem, sem demonstrar que não havia limite inferior nem valores intermédios em falta. | Usei a imagem da exponencial para obter a imagem completa de 1−2^x. |
| `EX-VN12EXPL-EXP-037` | Repetia BG12E-EXP-1 com a mesma função, a mesma diferença entre argumentos e a mesma razão. | Pedi o incremento de argumento correspondente a um fator de crescimento, com um distrator baseado em confundir o incremento e o fator. O valor correto continua a ser 2. |
| `DG-VN12EXPL-IR-001` | «Inversa como função no seu domínio» não especificava em que conjunto a inversa seria definida. A injetividade só basta para inverter sobre a imagem. | Identifiquei a imagem como domínio da inversa e expliquei a unicidade do antecedente. |
| `MS-VN12EXPL-IR-003` | Há funções invertíveis para as quais outras igualdades também ocorrem, como f(b)=a para f(x)=−x. | O enunciado pede a igualdade que decorre necessariamente dos dados. |
| `EX-VN12EXPL-IR-010` | A base a=1 torna a exponencial constante, pelo que não existe a função inversa indicada. | Explicitei as restrições a>0 e a≠1. |
| `MS-VN12EXPL-IR-049` | O enunciado admitia que f⁻¹ fosse distinguida de todas as outras expressões. «f²(x) como domínio» não era uma opção matemática comparável. | Perguntei pela notação específica da função recíproca e usei expressões comparáveis. |
| `DG-VN12EXPL-LOG-001` | A escrita log_a b apresentava o índice da base sob a forma de código. | Apresentei a base em índice e o argumento entre parênteses. |
| `MS-VN12EXPL-LOG-002` | A escrita log_a x não separava a base e o argumento como notação matemática corrente. | Apresentei a base em índice e explicitei o que se pretende definir. |
| `MS-VN12EXPL-LOG-003` | Repetia M12E-2 com o mesmo logaritmo e as mesmas opções. | Explorei a propriedade da diferença de logaritmos e mantive o valor correto 3. |
| `DG-VN12EXPL-LOG-006` | A escrita log_a a e a expressão «a válido» não indicavam claramente a base e a condição de existência. | Explicitei a base em índice e as condições que permitem usar o logaritmo. |
| `MS-VN12EXPL-LOG-009` | A base do logaritmo era apresentada com sublinhado. | Escrevi a base em índice e distingui o domínio do conjunto de valores. |
| `MS-VN12EXPL-LOG-011` | A base e o argumento apareciam juntos como log_a1 na resolução. | Distingui a base em índice e o argumento entre parênteses. |
| `EX-VN12EXPL-LOG-017` | A escrita com sublinhado tornava a base do logaritmo parte da expressão em linha. | Passei a indicar a base em índice e delimitei os argumentos das opções. |
| `MS-VN12EXPL-LOG-021` | As opções apresentavam as bases dos logaritmos como sequências com sublinhado. | Usei bases legíveis em índice e argumentos delimitados. |
| `MS-VN12EXPL-LOG-026` | «log_2 x·y» podia ser lido como o logaritmo do produto, igual à opção certa. | Distingui o produto dos argumentos da multiplicação de um logaritmo por y, usando parênteses. |
| `EX-VN12EXPL-LOG-027` | A escrita 2log_3 x não separava claramente os termos. O qualificativo «apenas» figurava numa só opção e não acrescentava uma hipótese. | Usei bases em índice, parênteses e opções com a mesma estrutura. |
| `MS-VN12EXPL-LOG-037` | A base surgia escrita com sublinhado. A reflexão só representa uma função inversa quando a base não é 1. | Usei a base em índice e especifiquei as condições a>0 e a≠1. |
| `EX-VN12EXPL-LOG-049` | Três distratores extremos permitiam responder por eliminação e a resolução deixava indefinida a base do logaritmo. | Troquei os distratores por interpretações incorretas concretas e mostrei a propriedade usando ln. |
| `DG-VN12EXPL-MOD-001` | A quantidade inicial podia ser zero ou negativa, o que impede concluir crescimento apenas a partir de a>1. | Indiquei que o modelo tem uma quantidade inicial positiva. |
| `MS-VN12EXPL-MOD-002` | O fator entre 0 e 1 não garante decrescimento se a quantidade inicial for não positiva. | Indiquei Q₀>0 e liguei o fator à perda em cada unidade de tempo. |
| `DG-VN12EXPL-MOD-014` | O enunciado não dizia que a redução para metade era periódica e modelada exponencialmente, nem identificava a variável de tempo ou o valor inicial. | Especifiquei o modelo e justifiquei o expoente pela duração de um período. |

### 12.º ano · Composição e derivadas

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-12FCD-CHAIN-STEPS-1` | O corretor rejeitava a derivada da função exterior quando a expressão era identificada como g′(u). | Identifiquei a função exterior como g no rótulo e aceitei a expressão com a notação de derivada. |
| `CV51-12FCD-RC-2` | A resolução não indicava onde se pode aplicar a fórmula da derivada da raiz. No extremo de domínio x=−5/2 não existe uma derivada real finita. | Acrescentei à explicação a restrição sobre o radicando. A expressão da opção certa permanece igual. |
| `MS-VN12FCD-AP-006` | Sem indicar o domínio, x=2 podia não pertencer à função. | Declare a derivabilidade em ℝ e justifiquei a abcissa crítica. |
| `MS-VN12FCD-AP-007` | A fórmula da derivada não fixava o domínio e «decrescente em» podia sugerir intervalos arbitrariamente pequenos. | Pedi um intervalo máximo com derivada estritamente negativa para uma função derivável em ℝ. |
| `DG-VN12FCD-AP-009` | Sem domínio, os zeros da expressão da derivada podiam ficar fora do domínio de f. | Declare a derivabilidade em ℝ e justifiquei que os pontos críticos são os zeros da derivada. |
| `EX-VN12FCD-AP-013` | «Sob condições usuais» não identificava as hipóteses e a positividade da segunda derivada em um ponto, sem hipótese adicional, não garante convexidade num intervalo. | Explicitei que f″ é contínua perto de a e justifiquei o mínimo pelo sinal de f′ de cada lado. |
| `MS-VN12FCD-AP-021` | A condição R′(q)=0 não vale para um ponto fronteiro. Resolver a equação dá candidatos, sem por si só certificar o máximo. | Pedi a condição necessária para um máximo interior e verifiquei o resultado. |
| `MS-VN12FCD-AP-024` | A resolução igualava a derivada a zero sem concluir que o ponto estacionário é de custo mínimo. | Calculei a solução e justifiquei o mínimo global pela forma quadrática. |
| `MS-VN12FCD-AP-037` | O crescimento em cada componente de um conjunto não implica crescimento na união. Para uma primitiva da derivada dada, f(−3)>f(2). | Pedi explicitamente os dois intervalos em separado e repeti a distinção na resolução. |
| `MS-VN12FCD-COMP-004` | Havia três proposições verdadeiras. As composições são diferentes, diferem por uma constante e têm o mesmo domínio ℝ. | Mantive a não comutatividade como chave e substituí as proposições também verdadeiras por erros plausíveis. |
| `EX-VN12FCD-COMP-007` | O mesmo domínio era pedido com as mesmas funções em DG-VN12FCD-COMP-008 e com mera alteração da translação em CV51-12FCD-COMP-2. | Escolhi uma composição que exige verificar o domínio da função interior e o argumento do logaritmo. O domínio permanece [2,+∞[. |
| `EX-VN12FCD-EE-011` | A fórmula supunha que g era derivável e não enunciava essa hipótese. | Indiquei a derivabilidade de g para fixar onde se aplica a regra da cadeia. |
| `MS-VN12FCD-EE-037` | A positividade de P não estava no enunciado, embora fosse usada para concluir crescimento estrito. | Explicitei a hipótese P(t)>0 e a conclusão sobre P′(t). |
| `MS-VN12FCD-LTP-002` | A pergunta usava a abreviatura internacional sin ou tan, ou não delimitava os argumentos trigonométricos. | Usei sen(x), cos(x) ou tg(x), segundo a notação das Aprendizagens Essenciais. |
| `MS-VN12FCD-LTP-003` | A pergunta usava a abreviatura internacional sin ou tan, ou não delimitava os argumentos trigonométricos. | Usei sen(x), cos(x) ou tg(x), segundo a notação das Aprendizagens Essenciais. |
| `EX-VN12FCD-LTP-009` | A resolução apresentava os argumentos 2 e x colados a ln. | Delimitei os argumentos e mostrei a aplicação direta da regra da cadeia. |
| `MS-VN12FCD-LTP-021` | A pergunta usava a abreviatura internacional sin ou tan, ou não delimitava os argumentos trigonométricos. | Usei sen(x), cos(x) ou tg(x), segundo a notação das Aprendizagens Essenciais. |
| `MS-VN12FCD-LTP-022` | A pergunta usava a abreviatura internacional sin ou tan, ou não delimitava os argumentos trigonométricos. | Usei sen(x), cos(x) ou tg(x), segundo a notação das Aprendizagens Essenciais. |
| `EX-VN12FCD-LTP-024` | A resolução decompunha ln((x+1)/(x−1)) em logaritmos separados que não existem para x<−1. Uma opção apresentava precisamente essa decomposição. | Calculei diretamente a derivada do logaritmo do quociente em todo o domínio. |
| `EX-VN12FCD-LTP-049` | A pergunta usava a abreviatura internacional sin ou tan, ou não delimitava os argumentos trigonométricos. | Usei sen(x), cos(x) ou tg(x), segundo a notação das Aprendizagens Essenciais. |
| `MS-VN12FCD-RC-004` | As condições de derivabilidade de f e g e a restrição g(x)≠0 estavam omissas. | Explicitei as condições e escrevi o numerador e o denominador da regra. |
| `MS-VN12FCD-RC-007` | A resolução deixava ln e o seu argumento colados e não nomeava as origens dos dois termos. | Separei as funções na regra do produto. |
| `MS-VN12FCD-RC-008` | A pergunta usava a abreviatura internacional sin ou tan, ou não delimitava os argumentos trigonométricos. | Usei sen(x), cos(x) ou tg(x), segundo a notação das Aprendizagens Essenciais. |
| `EX-VN12FCD-RC-009` | A pergunta usava a abreviatura internacional sin ou tan, ou não delimitava os argumentos trigonométricos. | Usei sen(x), cos(x) ou tg(x), segundo a notação das Aprendizagens Essenciais. |
| `MS-VN12FCD-RC-021` | A resolução omitira a restrição de domínio da derivada e terminava antes de simplificar a expressão. | Indiquei onde existe derivada real finita e concluí na forma da opção certa. |
| `MS-VN12FCD-RC-027` | A resolução colava o argumento ao símbolo ln e apresentava o resultado intermédio sem conclusão. | Delimitei o argumento e concluí a derivação. |
| `EX-VN12FCD-RC-030` | A pergunta usava a abreviatura internacional sin ou tan, ou não delimitava os argumentos trigonométricos. | Usei sen(x), cos(x) ou tg(x), segundo a notação das Aprendizagens Essenciais. |

### 12.º ano · Continuidade e estudo de funções

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CP12L-LIM-1` | «Tipicamente» substituía uma garantia matemática por uma afirmação sobre frequência. Faltava excluir a avaliação no próprio ponto. | Descrevi o comportamento para x suficientemente próximo de 2 e distinto de 2. |
| `CRV2-12FCONT-ASS-STEPS-1` | O valor de referência para o passo numérico do quociente era «2/1=2», mas o próprio corretor rejeitava esse formato. O rótulo e o feedback não pediam explicitamente o valor numérico calculado. | Especifiquei o valor calculado no rótulo e fiz o feedback coincidir com a resposta numérica 2 já validada. |
| `CRV2-12FCONT-STEPS-1` | O corretor rejeitava a fatorização escrita como igualdade com o polinómio no primeiro membro. | Acrescentei as igualdades com os dois ordenamentos dos fatores à lista de expressões corretas. |
| `DG-VN12FCONT-DER-001` | Repetia a implicação direta avaliada em M12L-1 e BG12FC-DER-1. | Pedi ao aluno que reconheça a derivabilidade a partir do limite do quociente incremental e daí conclua continuidade. |
| `MS-VN12FCONT-DER-008` | Uma opção contradizia literalmente a continuidade fornecida no enunciado. A resolução não ligava a divergência do quociente à inexistência da derivada. | Perguntei diretamente pela derivabilidade e introduzi um erro plausível no cálculo do quociente. |
| `MS-VN12FCONT-DER-021` | A resolução dava o valor da função no ponto e não calculava o limite à direita que impõe a condição. | Calculei os dois valores a igualar e expliquei a condição. |
| `MS-VN12FCONT-DER-022` | A resolução omitia como a continuidade permite usar o declive do ramo direito no ponto de junção e escrevia «éa». | Usei a continuidade para identificar as derivadas laterais e comparei-as. |
| `EX-VN12FCONT-DER-040` | A aproximação usava a notação assintótica o(h), que exige uma convenção alheia às aprendizagens explicitadas para o tema. | Reexprimi a propriedade com o quociente incremental e uma aproximação pela reta tangente. |
| `MS-VN12FCONT-DER-042` | A escrita √4,1 não delimitava o radicando e a referência à «linearização» introduzia terminologia sem necessidade. | Usei a reta tangente dada no enunciado e delimitei o radicando. |
| `MS-VN12FCONT-EG-003` | O enunciado chamava ponto ao máximo absoluto e a opção certa podia ser lida como o maior elemento do domínio, em vez do maior valor da função. | Pedi a propriedade de um ponto de máximo e distingui as imagens dos valores do domínio. |
| `DG-VN12FCONT-EG-006` | O sinal da derivada nos dois intervalos não garante um máximo em 1 sem a continuidade nesse ponto. | Acrescentei a continuidade e distingui a abcissa do extremo do seu valor. |
| `MS-VN12FCONT-EG-007` | Os sinais laterais da derivada não são suficientes para concluir que f tem um mínimo em 2. | Acrescentei a continuidade em 2 e liguei-a à mudança de monotonia. |
| `MS-VN12FCONT-EG-008` | A explicação apenas citava x³, sem mostrar o sinal da derivada e a ausência de extremo. O distractor com descontinuidade era incompatível com um ponto em que f′ é nula. | Mostrei o exemplo e distingui extremo, mudança de sinal e inflexão. |
| `MS-VN12FCONT-EG-023` | O sinal da segunda derivada, isolado, não conclui a existência de máximo local. A resolução omitia a verificação de que f′(−1)=0. | Calculei ambas as derivadas e verifiquei as hipóteses do teste. |
| `EX-VN12FCONT-EG-032` | As enumerações sem espaços em x=0,2,5 e x=0,4,5 podiam ser confundidas com a vírgula decimal. | Escrevi os valores por extenso enquanto enumeração e explicitei a inclusão das extremidades. |
| `MS-VN12FCONT-EG-048` | Um máximo local pode ocorrer sem mudança de monotonia de crescente para decrescente, por exemplo se a função é constante na vizinhança. | Acrescentei a hipótese de monotonia estrita nos dois intervalos adjacentes e expliquei a interpretação. |
| `MS-VN12FCONT-LC-004` | A função é contínua em ℝ e também na sua restrição a ℝ sem o zero, pelo que duas opções completavam literalmente o enunciado. | Pedi o maior conjunto de continuidade. |
| `MS-VN12FCONT-LC-006` | Repetia a regra de D12L-P sem aplicação adicional, com um distrator de média já usado em M12L-2. | Introduzi limites laterais de natureza diferente e distratores baseados na comparação da informação dos dois lados. |
| `MS-VN12FCONT-OP-006` | A função também é contínua se for restrita a ℝ sem 0 ou ao conjunto onde cos x não se anula. | Pedi o maior conjunto de continuidade. |
| `EX-VN12FCONT-OP-008` | Tanto ℝ sem 3 como o subintervalo ]3,+∞[ satisfaziam «é contínua em». | Pedi o maior conjunto de continuidade. |
| `MS-VN12FCONT-OP-021` | O limite não especificava que f e e^f estavam a ser consideradas na mesma aproximação e que L era finito. | Indiquei o ponto e a natureza do limite para aplicar a continuidade da exponencial. |
| `MS-VN12FCONT-OP-025` | A continuidade também valia nas restrições a subconjuntos. A resolução verificava o domínio sem justificar a continuidade da composta. | Pedi o maior conjunto e apliquei a continuidade do polinómio e de ln. |
| `EX-VN12FCONT-OP-028` | A pergunta usava tan e sin e juntava símbolos trigonométricos aos argumentos sem espaço. | Adotei tg(x), sen(x) e cos(x), segundo a notação das Aprendizagens Essenciais. |

### 12.º ano · Inferência estatística

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-12IE-IC-STEPS-1` | O intervalo correto escrito com ponto e vírgula era rejeitado e o feedback só apresentava a interpretação abreviada. | Aceita-se a notação portuguesa com ponto e vírgula e explicita-se a cobertura do procedimento. |
| `CV51-12IE-EST-1` | Uma proporção igual a 1,2 elimina-se sem usar os dados. | O distrator passa a ser um valor possível para uma proporção, correspondente a dividir o número restante pelo número favorável. |
| `DG-VN12IE-DA-008` | A conclusão só vale sob um modelo de amostragem com erro padrão σ/√n. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12IE-DA-012` | Sem o modelo de n observações independentes, a fórmula do erro padrão não é geral. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12IE-DA-022` | A fórmula 10/√25 pressupunha observações independentes. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12IE-DA-038` | O fator apresentado só existe para N>1 e o argumento requer 1≤n≤N. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12IE-DA-046` | Faltava a condição de independência e a resolução só apresentava as duas raízes quadradas. | Fixa-se uma população com σ>0 e divide-se o mesmo desvio padrão por cada raiz. |
| `DG-VN12IE-EST-016` | «σ comparável» era insuficiente e a resolução apresentava uma igualdade exata como aproximação. | Fixa-se a população e usa-se a expressão exata do erro padrão. |
| `MS-VN12IE-EST-021` | A pergunta exigia decorar a decomposição do erro quadrático médio, que ultrapassa a introdução curricular à estimação. | Define-se o viés e dá-se a decomposição inicial. A resolução usa a esperança para eliminar a parcela cruzada. |
| `MS-VN12IE-EST-022` | O compromisso viés–variância era pressuposto e as alternativas eliminavam-se sem o considerar. | Define-se no enunciado a medida do erro usada e apresentam-se alternativas sobre o mesmo compromisso. |
| `EX-VN12IE-EST-027` | Um estimador pode depender unicamente de n ou ser constante, ao contrário do que o enunciado aberto sugeria. | Pede-se de que pode depender a estimativa calculada a partir dos valores observados, com opções que distinguem dado observável de parâmetro. |
| `DG-VN12IE-IA-006` | Os 80 alunos podiam corresponder à população inteira e não se dizia de que se calculava a média. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12IE-IA-008` | «Uma chance apropriada» não caracterizava a amostragem aleatória simples. | A chave explicita a equiprobabilidade das amostras do mesmo tamanho. |
| `EX-VN12IE-IA-041` | São os estimadores gerados pelas estratégias que podem ser não enviesados e ter variância, não as estratégias em si. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12IE-IC-045` | Só a opção correta mencionava 0,50 e a compatibilidade com o intervalo, e era muito mais longa. | Pede-se a interpretação sobre a mesma hipótese e as quatro opções usam a mesma escala. |
| `MS-VN12IE-TLC-003` | Apresentava E(X̄)=μ como aproximada e repetia MS-VN12IE-DA-002. | Compara as médias de dois grupos de igual tamanho com esperanças diferentes e demonstra o valor exato. |
| `DG-VN12IE-TLC-011` | «Assim» remetia para dados anteriores ausentes. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12IE-TLC-014` | A conclusão pressupunha comparar amostras independentes da mesma população. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12IE-TLC-021` | O significado do segundo parâmetro da normal não estava definido. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12IE-TLC-027` | A frase não dizia que se tratava de uma distribuição normal nem o que representava 95%. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12IE-TLC-028` | A média de lote podia envolver dependência entre peças e a unidade estava colada aos números. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12IE-TLC-040` | O uso de correção de continuidade era pressuposto e o enunciado não definia o procedimento. | O enunciado explica como associar um intervalo a um inteiro e a resolução aplica a fronteira. |

### 12.º ano · Primitivas e integrais

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-12INT-AREA-STEPS-1` | «Primitiva usada» aceitava apenas a primitiva com constante nula. | A instrução passa a pedir a primitiva que se anula em 0. |
| `CRV2-12INT-BARROW-STEPS-1` | O corretor rejeitava outras primitivas igualmente válidas para o que o enunciado pedia. | O enunciado e o passo fixam a condição F(0)=0, coerente com a solução e os cálculos seguintes. O corretor aceita o integral escrito antes de =10 no último campo. |
| `CRV2-12INT-STEPS-1` | O passo pedia uma primitiva qualquer, mas só aceitava a com constante nula. | Pede-se explicitamente a primitiva que se anula em 0 e indica-se essa condição na resolução. |
| `MS-VN12INT-AR-002` | A resolução chamava ao integral «negativo» mesmo se f fosse identicamente nula, caso em que vários distratores coincidiam. | Exclui-se a função identicamente nula e esclarece-se como se obtém a área. |
| `MS-VN12INT-AR-021` | O cálculo terminava em x(x−2)=0 sem explicitar os extremos. | A resolução passa a justificar o resultado de forma completa. |
| `MS-VN12INT-AR-022` | A pergunta incluía os extremos onde os dois gráficos coincidem. | Restringe-se a comparação ao interior e demonstra-se a desigualdade estrita. |
| `EX-VN12INT-AR-032` | A notação «emπ/2» ocultava o ponto de separação e os contributos não estavam explicitados. | A resolução passa a justificar o resultado de forma completa. |
| `DG-VN12INT-ID-001` | A interpretação como área algébrica pressupunha limites na ordem a<b e uma função integrável. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12INT-ID-016` | O texto não fixava a existência do integral e a resolução confundia «positiva» com «não negativa». | Explicita-se a continuidade e inclui-se o caso de integral nulo. |
| `MS-VN12INT-ID-037` | O integral sem limites descrevia uma primitiva, mas a resposta era relativa ao deslocamento entre dois instantes. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12INT-ID-038` | Todos os integrais eram indefinidos apesar de se pedir a distância total num período. | Fixa-se o intervalo temporal e usam-se integrais definidos em todas as opções. |
| `MS-VN12INT-PR-006` | Faltava o espaço em «éx²» e o cálculo intermédio. | A resolução passa a justificar o resultado de forma completa. |
| `MS-VN12INT-PR-049` | A resolução esquecia a condição inicial que determina a constante. | A resolução passa a justificar o resultado de forma completa. |
| `DG-VN12INT-TFC-001` | Não se indicavam as hipóteses usuais da fórmula de Barrow nem a ordem da subtração. | Explicita-se a continuidade de f, identifica-se F como primitiva e justifica-se a ordem. |
| `MS-VN12INT-TFC-012` | A conta omitia a substituição de cada extremo na primitiva. | A resolução passa a justificar o resultado de forma completa. |
| `EX-VN12INT-TFC-023` | Incluía a nota de rascunho «Primitiva ...? Melhor:» apesar de a primeira primitiva ser válida. | A resolução passa a justificar o resultado de forma completa. |
| `MS-VN12INT-TP-002` | Para k=0, a expressão família de primitivas não permite absorver à direita uma constante arbitrária. | O enunciado explicita as condições ou os dados usados na resolução. |
| `DG-VN12INT-TP-014` | «Integra-se cada termo» não explicava de onde vem o seno nem o sinal. | A resolução passa a justificar o resultado de forma completa. |
| `MS-VN12INT-TP-033` | Uma família A·e^{g(x)}+C não é em geral proporcional a e^{g(x)}. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12INT-TP-034` | A resolução «Falta metade da derivada interna» era ambígua e não justificava a expressão. | A resolução passa a justificar o resultado de forma completa. |

### 12.º ano · Matrizes

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-12MAT-PROD-STEPS-1` | A pergunta pedia justificar por que não trocar A e B, mas a resolução não demonstrava a diferença no exemplo e o corretor recusava respostas curtas corretas. | Mostra-se BA no exemplo e aceitam-se justificações diretas de não comutatividade. |
| `CV51-12MAT-APL-1` | A pergunta referia um produto linha-coluna sem definir a orientação dos vetores. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12MAT-MOD-003` | A leitura da 1.ª loja depende de saber se são as linhas ou as colunas que representam lojas. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12MAT-MOD-009` | Sem convenção para linhas e colunas de A, cᵀA podia não estar definido. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12MAT-MOD-012` | O enunciado interpretava a primeira componente assumindo uma organização da matriz que não tinha sido declarada. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12MAT-MOD-021` | «Rede simples apropriada» não definia a configuração, e «percursos» podia excluir o regresso ao ponto inicial. | Define-se a matriz de adjacência e esclarece-se que se contam sequências de dois passos, incluindo o regresso. |
| `MS-VN12MAT-MOD-022` | Invocava uma rede e vértices que não apareciam no enunciado. | A resolução passa a justificar o resultado de forma completa. |
| `EX-VN12MAT-MOD-026` | x₁ não tinha relação definida com a matriz P nem com x₀. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12MAT-PRD-037` | «O produto das diagonais correspondentes fica 1» não explicava como verificar a inversa pela identidade. | A resolução passa a justificar o resultado de forma completa. |
| `MS-VN12MAT-TR-003` | Fator negativo ou nulo não descreve simplesmente uma dilatação ou redução de fator k. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12MAT-TR-024` | Perguntava o que a reflexão preserva, mas a chave incluía também uma propriedade que a reflexão não preserva. | O enunciado pede a descrição do efeito e as opções passam a comparar as mesmas grandezas. |

### 12.º ano · Probabilidades

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-12PROB-COND-STEPS-1` | A grelha recusava a troca da ordem em D∩M e não previa a formulação com «acontecimento condicionante». A etiqueta da conclusão exigia simplificação apesar de o corretor aceitar frações equivalentes. | Aceita as escritas equivalentes e descreve a última etapa como resultado em forma de fração. |
| `CRV2-12PROB-STEPS-1` | A grelha deixava por verificar uma justificação que enumera as cinco bolas equiprováveis, as três favoráveis e o quociente. | Acrescenta duas formulações que explicitam os casos equiprováveis e a regra de Laplace. |
| `D12P-P` | A probabilidade condicionada pela ocorrência de B só está definida neste contexto se P(B)>0. | Explicita P(B)>0. |
| `M12P-1` | A construção «Sabendo que compra café» deixa implícita a pessoa sorteada e de que universo vêm as percentagens. | Define uma seleção ao acaso entre os clientes e distingue a interseção da condição. |
| `M12P-2` | Independência permite P(B)=0 e nesse caso P(A\|B) não está definida. | Acrescenta P(B)>0 e demonstra a igualdade condicional. |
| `M12P-4` | 1,1 é descartável por exceder 1. | Usa 0,5 como confusão entre a probabilidade da união e o maior dos valores marginais. |
| `M12P-5` | 1,2 é descartável por exceder 1. | Usa 0,012 para representar um erro de posição da vírgula na multiplicação. |
| `DG-VN12PROB-CI-001` | Existem tabelas de contingência para mais de duas variáveis. Dois distratores eram valores isolados sem uma classificação cruzada. | Especifica dupla entrada e usa alternativas que confundem tipos de variáveis ou o tipo de contagem. |
| `DG-VN12PROB-CI-010` | 1,1 é descartável por exceder 1. | Usa 0,2, o valor da probabilidade do complementar da união. |
| `EX-VN12PROB-CI-011` | A resolução afirma que a independência se preserva, mas não mostra o cálculo que o aluno pode reutilizar. | Demonstra o critério de independência para A e Bᶜ. |
| `MS-VN12PROB-CI-045` | «Os dois fatores são» deixa implícitos os acontecimentos e a seleção aleatória. As percentagens repetem M12P-3. | Usa frequências absolutas e identifica a escolha e os acontecimentos, preservando a independência. |
| `DG-VN12PROB-FA-001` | A impossibilidade de observar e a obrigatoriedade de um resultado numérico são descartáveis sem distinguir aleatoriedade de desconhecimento. | Usa erros sobre equiprobabilidade e sobre a possibilidade de conhecer os resultados antes de realizar a experiência. |
| `MS-VN12PROB-FA-003` | {cara} e {cara,cara} representam o mesmo conjunto, e o enunciado deixa por especificar o que se regista. | Pede o espaço de resultados da face observada e distingue o erro de omitir cada uma das duas faces. |
| `EX-VN12PROB-FA-027` | O enunciado não define os símbolos C e K nem como se ordenam as faces observadas. | Define o código para as faces e a ordem de registo. |
| `DG-VN12PROB-NO-001` | O máximo, a mediana e a probabilidade total são grandezas que não medem dispersão. A resolução não esclarece o que caracteriza a variância. | Usa alternativas ligadas à dispersão e explica a média dos quadrados dos desvios. |
| `MS-VN12PROB-NO-027` | N(70,10) admite a leitura de que 10 é a variância, caso em que os limites são diferentes. | Declara 10 como desvio-padrão e pede o intervalo centrado na média. |
| `MS-VN12PROB-NO-045` | A convenção N(170,6) não esclarece se 6 é desvio-padrão ou variância e altera o resultado consoante a leitura. | Indica diretamente os valores e as unidades da média e do desvio-padrão. |
| `DG-VN12PROB-PA-001` | A forma com P(B\|A) exige P(A)>0 e a interseção de acontecimentos não implica uma ordem temporal. | Explicita a hipótese e descreve a probabilidade da interseção. |
| `MS-VN12PROB-PA-006` | Ser equilibrada especifica cada lançamento, mas a conta do produto usa independência entre ensaios. | Explicita que os dois lançamentos são independentes. |
| `EX-VN12PROB-PA-011` | «3 vermelhas e 2 azuis» omite o objeto e a sigla VV só aparece no pedido. | Identifica duas extrações ao acaso, com reposição, e a cor pedida por extenso. |
| `DG-VN12PROB-PA-015` | «Na urna 3 V e 2 A sem reposição» omite a experiência e exige descodificar a abreviatura das cores. | Indica duas extrações ao acaso sem reposição e mostra as duas ordens na resolução. |
| `MS-VN12PROB-PA-021` | A construção «Se … e P(B^c\|A)=...» não chega a formular o pedido e contém um distrator superior a 1. | Pede a probabilidade condicionada do complementar e inclui 0,42, valor da probabilidade da interseção A∩Bᶜ. |
| `MS-VN12PROB-PC-003` | Dá exatamente os mesmos dados e o mesmo pedido que CP12P-COND-1. | Apresenta dados de contagem para o aluno identificar o universo condicionado antes de calcular 10/25. |
| `MS-VN12PROB-PC-006` | Repete D12P-P quase palavra por palavra e deixa P(B)>0 implícito. | Usa dois grupos de alunos para identificar o acontecimento condicionante e inclui uma alternativa que inverte o condicionamento. |
| `MS-VN12PROB-PC-010` | Repete a conta de D12P-A com A e B trocados e o mesmo quociente 0,18/0,6. | Dá a interseção com o complementar e pede que se calcule a interseção necessária antes do quociente. |
| `DG-VN12PROB-PR-001` | P(A) pertence tanto a ℝ como ao intervalo [0,1]. | Pergunta pelo conjunto exato de valores possíveis e explica que os dois extremos podem ocorrer. |
| `MS-VN12PROB-PR-022` | «Interseção nula significa incompatibilidade probabilística» sugere que probabilidade zero determina interseção vazia. | Usa a igualdade do critério de independência e inclui um contraexemplo. |
| `EX-VN12PROB-PR-023` | Uma probabilidade que é pelo menos 0,3 também é pelo menos 0 e 0,1. A solução só demonstra a desigualdade e não que o limite seja atingido. | Pede o mínimo possível e demonstra que pode ocorrer com P(A∪B)=1. |
| `DG-VN12PROB-PT-001` | As probabilidades condicionadas usadas na fórmula exigem que A e o seu complementar tenham probabilidade positiva. | Indica 0<P(A)<1. |
| `MS-VN12PROB-PT-003` | As parcelas usam P(B\|Ai) sem exigir P(Ai)>0 e a notação da soma omite o domínio do índice. | Explicita a hipótese e descreve a soma de todas as parcelas na solução. |
| `EX-VN12PROB-PT-025` | «5% de falsos positivos» pode referir-se à população inteira ou apenas às pessoas sem doença. A resolução omite como os dados produzem 16,7%. | Identifica as duas taxas condicionadas e mostra o quociente de Bayes. |
| `DG-VN12PROB-VD-001` | As alternativas «um intervalo contínuo obrigatório» e «um acontecimento impossível» são descartáveis sem distinguir variável aleatória e distribuição. | Usa confusões entre o valor da variável, a probabilidade e o acontecimento. |
| `MS-VN12PROB-VD-003` | Os valores numéricos da variável não são, em geral, acontecimentos do espaço amostral. | Identifica os acontecimentos {X=x} como as partes do espaço de resultados. |
| `DG-VN12PROB-VD-008` | A lista «1,2,3» sem espaços pode ser lida como números decimais. As probabilidades também estão escritas sem espaços. | Escreve a lista com espaços e identifica a ordem das probabilidades. |
| `EX-VN12PROB-VD-011` | Uma variável aleatória discreta com suporte infinito pode não ter esperança finita. | Restringe a pergunta a um conjunto finito de valores possíveis. |
| `MS-VN12PROB-VD-021` | A sequência «−1,0,2» pode ser lida como valores decimais. | Separa os valores e explicita a ordem das probabilidades. |
| `MS-VN12PROB-VD-022` | Para uma variável discreta com infinitos valores, o valor esperado pode não existir. | Explicita um conjunto finito de valores, garantindo a existência de E(X). |
| `EX-VN12PROB-VD-030` | O produto exige independência entre lançamentos e «CK ou KC» usa abreviaturas não definidas no item. | Declara a independência dos lançamentos e escreve as duas ordens por extenso. |

### 12.º ano · Resolução aproximada de equações

| ID | Problema confirmado | Correção |
| --- | --- | --- |
| `CRV2-12RAE-STEPS-1` | O passo final rejeitava a conclusão simbólica pedida no próprio enunciado. | O corretor aceita também a desigualdade e a indicação de pertença ao intervalo, com a mesma solução. O corretor reconhece também os quadrados 1,41² e 1,42² antes do sinal de igualdade. |
| `CV51-12RAE-APR-1` | A formulação «Qual intervalo é garantido conter» é um decalque e não explicita o que se pede. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12RAE-BIS-003` | A metade com mudança de sinal só é selecionada quando o ponto médio ainda não é uma raiz. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12RAE-BIS-006` | O «novo intervalo» dependia de um passo de bisseção e de um intervalo inicial implícitos. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12RAE-BIS-008` | O significado de m e o método eram implícitos. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12RAE-BIS-011` | L0 não tinha definição. | O enunciado explicita as condições ou os dados usados na resolução. |
| `DG-VN12RAE-BIS-012` | L0 não tinha definição. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12RAE-BIS-021` | Os extremos de intervalos decimais eram indistinguíveis dos separadores. | Os extremos passam a ser separados por ponto e vírgula. |
| `EX-VN12RAE-BIS-027` | O significado de m estava implícito e a resolução confundia os sinais das abcissas com os sinais de f. | Define-se m e compara-se f(m) com os valores nos extremos. |
| `MS-VN12RAE-BL-006` | ]−1,2[ também contém a raiz positiva √2, logo duas opções eram corretas. | O distrator passa a corresponder a um erro distinto da resposta correta. |
| `MS-VN12RAE-BL-022` | «A raiz» pressupunha unicidade, que a continuidade e a mudança de sinal não garantem. | Pede-se a amplitude do intervalo em que o teorema garante pelo menos uma raiz e justifica-se a garantia. |
| `MS-VN12RAE-NEW-002` | A equação iterativa pressupõe f′(xₙ)≠0 e o enunciado não o indicava. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12RAE-NEW-006` | A fórmula exige xₙ≠0. | O enunciado explicita as condições ou os dados usados na resolução. |
| `EX-VN12RAE-NEW-011` | O enunciado não nomeava o método e identificava um número com um ponto de interseção. | Dá-se o contexto de Newton e distingue-se a abcissa do ponto. |
| `DG-VN12RAE-NEW-012` | Referia-se à tangente «a f em x_n» sem indicar o gráfico nem que existe derivada. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12RAE-NEW-013` | Com tangente horizontal, impor y=0 pode não permitir obter uma abcissa única. | O enunciado explicita as condições ou os dados usados na resolução. |
| `MS-VN12RAE-NEW-021` | «Outro critério» remetia para um contexto ausente e a resolução não distinguia resíduo de erro em x. | Identifica-se a equação e o critério de paragem. A resolução distingue as duas grandezas. |
| `MS-VN12RAE-NEW-026` | «Um x0 positivo razoável» não indicava que valores eram admitidos e a justificação apelava genericamente à bacia de atração. | A condição passa a ser x₀>0 e a convergência para 1 fica justificada pela iteração. |

## Reutilização de fontes

Identificaram-se 24 pares em que uma pergunta do piloto e a sua cópia de Diagnóstico, Missão ou Mini-exame provinham da mesma fonte. Os IDs continuam disponíveis nas modalidades respetivas. O motor exclui duas versões da mesma fonte numa sessão e aplica o desconto de evidência já previsto quando a fonte se repete, incluindo respostas anteriores reconhecíveis.

| Piloto | Cópia no banco ativo |
| --- | --- |
| `VN10FUN-DIZ-001` | `DG-VN10FUN-DIZ-001` |
| `VN10FUN-DIZ-002` | `MS-VN10FUN-DIZ-002` |
| `VN10FUN-DIZ-004` | `MS-VN10FUN-DIZ-004` |
| `VN10FUN-DIZ-006` | `MS-VN10FUN-DIZ-006` |
| `VN10FUN-DIZ-007` | `MS-VN10FUN-DIZ-007` |
| `VN10FUN-DIZ-008` | `EX-VN10FUN-DIZ-008` |
| `VN10FUN-DIZ-010` | `DG-VN10FUN-DIZ-010` |
| `VN10FUN-DIZ-021` | `MS-VN10FUN-DIZ-021` |
| `VN10FUN-DIZ-022` | `EX-VN10FUN-DIZ-022` |
| `VN10FUN-DIZ-025` | `MS-VN10FUN-DIZ-025` |
| `VN10FUN-DIZ-037` | `EX-VN10FUN-DIZ-037` |
| `VN10FUN-DIZ-050` | `MS-VN10FUN-DIZ-050` |
| `VN10GA-VET-001` | `DG-VN10GA-VET-001` |
| `VN10GA-VET-002` | `MS-VN10GA-VET-002` |
| `VN10GA-VET-006` | `DG-VN10GA-VET-006` |
| `VN10GA-VET-007` | `MS-VN10GA-VET-007` |
| `VN10GA-VET-008` | `MS-VN10GA-VET-008` |
| `VN10GA-VET-009` | `EX-VN10GA-VET-009` |
| `VN10GA-VET-017` | `MS-VN10GA-VET-017` |
| `VN10GA-VET-021` | `MS-VN10GA-VET-021` |
| `VN10GA-VET-023` | `MS-VN10GA-VET-023` |
| `VN10GA-VET-027` | `EX-VN10GA-VET-027` |
| `VN10GA-VET-045` | `EX-VN10GA-VET-045` |
| `VN10GA-VET-047` | `MS-VN10GA-VET-047` |

A regeneração substituiu dois IDs do Mini-exame na submatéria de domínio, imagem e zeros. Os dois itens que entraram foram relidos no formato efetivamente apresentado. As quatro perguntas-fonte continuam no piloto.

| Saiu da seleção do Mini-exame | Entrou na seleção do Mini-exame |
| --- | --- |
| `EX-VN10FUN-DIZ-038` | `EX-VN10FUN-DIZ-037` |
| `EX-VN10FUN-DIZ-019` | `EX-VN10FUN-DIZ-008` |

## Integridade editorial e validação

- Atualizados 109 valores de `sourceBlobSha` com `git hash-object`. As 500 perguntas-fonte alteradas com aprovação anterior têm uma nova decisão em `aiRereview.decisions`, assinada por **Codex (IA)** em 2026-11-17, com o motivo específico e a impressão digital da pergunta. `previousReview` guarda a decisão anterior, incluindo os dois `rationale` e `override` explícitos. A data original é `null` nos 384 registos cujo plano não a indica.
- Os manifestos conservam as entradas e os resumos originais. A auditoria usa a nova decisão para cada pergunta re-revista e compara a sua impressão digital. Nas 109 fontes alteradas, verifica também o conjunto que conserva a aprovação anterior. Uma edição posterior exige voltar a rever a pergunta alterada.
- Renovadas 5 atestações locais depois de confirmar o oráculo correspondente e a pré-revisão automática nos itens `M11C-2`, `CV51-11CD-TV-1`, `CV51-11CD-OPT-2`, `CV51-12FCD-RC-2`, `CV51-11TRIG-EQ-2`.
- Todos os itens mantêm o estado `prototype` e produção bloqueada. O registo identifica Codex como autor da revisão.
- Conferidas com o corretor as 41 respostas-modelo por etapas e a chave de completamento. Os casos de resposta equivalente, forma pedida e quantidade errada foram verificados com os testes do corretor.
- Impressões digitais verificadas com `stale = []` e `missing = []`. 587 IDs presentes antes e depois da revisão têm conteúdo efetivo alterado.
- A auditoria do catálogo integral vNext manteve o aviso de semelhança entre `VN11CD-DP-047` e `VN12FCONT-DER-018`. Nenhum dos dois pertence ao banco ativo revisto.

Para a adequação curricular, foram consultadas as Aprendizagens Essenciais de Matemática A da DGE, revistas em 31 de agosto de 2026. [10.º ano](https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/mat_a_10_-_vf.pdf) · [11.º ano](https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/mat_a_11_-_vf.pdf) · [12.º ano](https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/mat_a_12_-_vf.pdf)
