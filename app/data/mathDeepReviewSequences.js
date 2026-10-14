export const MATH_SEQUENCES_REVIEW_VERSION="2026.10-wave10";

export const SEQUENCES_REVIEW={
  id:"11-suc",
  title:"Sucessões",
  lead:"Uma sucessão descreve uma lista ordenada de números através de uma regra. Essa regra pode dar diretamente o termo de ordem n ou dizer como construir cada termo a partir dos anteriores. Neste capítulo vais passar das regularidades para o termo geral e a recorrência, reconhecer progressões aritméticas e geométricas, calcular somas finitas e compreender por que algumas progressões geométricas podem ter uma soma infinita finita.",
  goals:[
    "Reconhecer regularidades numéricas e pictóricas e distinguir ordem, termo, termo geral e definição por recorrência.",
    "Caracterizar progressões aritméticas pelo incremento constante e progressões geométricas pelo fator multiplicativo constante.",
    "Determinar termos e somas de termos consecutivos de progressões aritméticas e geométricas.",
    "Interpretar o comportamento de progressões geométricas e compreender a soma infinita quando o módulo da razão é inferior a 1."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 11.º ano · março de 2026 · Sucessões e progressões",
    "DGE · Coletânea de tarefas das turmas piloto · Sucessões · Matemática A 11.º ano · junho de 2025"
  ],
  sections:[
    {
      id:"11-suc-termo-recorrencia",
      kicker:"1 · TERMO GERAL E DEFINIÇÃO POR RECORRÊNCIA",
      title:"Duas formas de dizer como a sucessão é gerada",
      paragraphs:[
        "No contexto destas AE, uma sucessão é uma função definida nos números naturais positivos: a cada ordem n=1,2,3,… corresponde um termo u_n. A ordem indica a posição; o termo é o valor nessa posição. Confundir os dois leva a erros, sobretudo quando a sucessão começa com valores que não coincidem com as ordens.",
        "Uma definição por termo geral permite calcular diretamente u_n a partir de n. Por exemplo, u_n=3n−1 produz 2,5,8,11,… sem ser necessário conhecer os termos anteriores. O termo geral é particularmente útil para perguntar qual é o termo de uma ordem muito elevada ou se um certo valor pertence à sucessão.",
        "Numa definição por recorrência, são dados um ou mais termos iniciais e uma regra que produz os seguintes. Por exemplo, u_1=2 e u_(n+1)=u_n+3 gera a mesma sucessão 2,5,8,11,… A condição inicial é indispensável: a relação de recorrência, sozinha, pode descrever infinitas sucessões diferentes.",
        "Tecnologia como folhas de cálculo ou pequenos programas pode gerar muitos termos e ajudar a formular conjeturas. Ver um padrão em muitos termos, porém, não substitui a justificação da regra que o produz."
      ],
      formulas:[
        "sucessão: n∈ℕ*, n≥1 → u_n",
        "termo geral: u_n=f(n)",
        "recorrência de 1.ª ordem: u_1 dado e u_(n+1)=F(u_n,n)",
        "exemplo equivalente: u_n=3n−1 ⇔ u_1=2, u_(n+1)=u_n+3"
      ],
      example:{
        title:"Exemplo resolvido · passar de uma recorrência simples para um termo geral",
        steps:[
          "Considera u_1=7 e u_(n+1)=u_n+4. Os primeiros termos são 7,11,15,19,…",
          "Em cada passagem aumenta-se 4; para chegar de u_1 a u_n são feitos n−1 incrementos.",
          "Logo u_n=7+4(n−1).",
          "Simplifica: u_n=4n+3. Confirma em n=1: u_1=4+3=7."
        ],
        result:"Um termo geral é u_n=4n+3.",
        note:"A expressão n−1 aparece porque o primeiro termo já está dado; até ao termo de ordem n existem n−1 transições."
      },
      remember:"Termo geral dá acesso direto a u_n; recorrência descreve como avançar. Numa recorrência, nunca esqueças os termos iniciais.",
      pitfalls:[
        "Confundir a ordem n com o valor u_n.",
        "Escrever apenas u_(n+1)=u_n+4 e considerar que a sucessão ficou definida sem indicar um termo inicial."
      ]
    },
    {
      id:"11-suc-pa",
      kicker:"2 · PROGRESSÕES ARITMÉTICAS",
      title:"Somar sempre a mesma razão cria crescimento ou decrescimento linear",
      paragraphs:[
        "Uma progressão aritmética (PA) é uma sucessão em que a diferença entre dois termos consecutivos é constante. Essa constante chama-se razão r: u_(n+1)−u_n=r. Assim, cada novo termo obtém-se somando r ao anterior.",
        "Conhecendo u_1 e r, o termo de ordem n é u_n=u_1+(n−1)r. Mais geralmente, entre duas ordens p e n vale u_n=u_p+(n−p)r, porque o número de incrementos é exatamente a diferença entre as ordens.",
        "O sinal de r descreve o comportamento: r>0 produz uma PA estritamente crescente, r<0 uma PA estritamente decrescente e r=0 uma sucessão constante. Em problemas reais, a razão representa uma variação absoluta constante por etapa."
      ],
      formulas:[
        "PA: u_(n+1)=u_n+r",
        "u_n=u_1+(n−1)r",
        "u_n=u_p+(n−p)r",
        "r>0 crescente; r<0 decrescente; r=0 constante"
      ],
      example:{
        title:"Exemplo resolvido · filas de um anfiteatro",
        steps:[
          "A primeira fila tem 18 lugares e cada fila seguinte tem mais 3 lugares do que a anterior.",
          "O número de lugares por fila forma uma PA com u_1=18 e r=3.",
          "Na 12.ª fila: u_12=18+(12−1)·3.",
          "Calcula 18+33=51."
        ],
        result:"A 12.ª fila tem 51 lugares.",
        note:"A razão mede o acréscimo por fila; não deve ser multiplicada por 12, porque do 1.º ao 12.º termo existem apenas 11 incrementos."
      },
      remember:"Numa PA, procura uma diferença constante. O termo geral é primeiro termo + número de passos × razão.",
      pitfalls:[
        "Usar u_n=u_1+nr e esquecer que até ao termo n existem n−1 incrementos.",
        "Chamar PA a uma sucessão apenas porque os primeiros termos parecem crescer de forma aproximadamente regular, sem verificar a diferença constante."
      ]
    },
    {
      id:"11-suc-pg",
      kicker:"3 · PROGRESSÕES GEOMÉTRICAS",
      title:"Multiplicar sempre pela mesma razão cria variação multiplicativa",
      paragraphs:[
        "Uma progressão geométrica (PG) é uma sucessão em que cada termo se obtém multiplicando o anterior por uma constante q, chamada razão. Quando o termo anterior é não nulo, isto equivale a ter quociente u_(n+1)/u_n=q.",
        "Conhecendo o primeiro termo e a razão, u_n=u_1·q^(n−1). A potência n−1 conta quantas multiplicações por q são necessárias desde o primeiro termo. Este modelo aparece naturalmente em crescimento percentual, juros compostos e processos em que cada etapa conserva uma fração da anterior.",
        "Para q>1 e u_1>0, os termos crescem rapidamente; para 0<q<1, os módulos dos termos aproximam-se de zero. Razões negativas alternam sinais e exigem uma leitura mais cuidada do comportamento, mesmo que a fórmula do termo geral continue válida."
      ],
      formulas:[
        "PG: u_(n+1)=q·u_n",
        "u_n=u_1·q^(n−1)",
        "u_n=u_p·q^(n−p)",
        "q=u_(n+1)/u_n, quando u_n≠0"
      ],
      example:{
        title:"Exemplo resolvido · crescimento composto",
        steps:[
          "Uma quantidade começa em 500 e aumenta 6% em cada período.",
          "A cada etapa multiplica-se por 1+0,06=1,06, portanto há uma PG com u_1=500 e q=1,06.",
          "O 8.º termo é u_8=500·1,06^7.",
          "Numericamente, u_8≈751,82."
        ],
        result:"No 8.º período, o valor é aproximadamente 751,82.",
        note:"Uma taxa percentual constante gera multiplicação constante; não é uma PA, porque o aumento absoluto muda de período para período."
      },
      remember:"PA = diferença constante. PG = fator multiplicativo constante. Esta distinção resolve muitos erros de modelação.",
      pitfalls:[
        "Tratar um crescimento percentual constante como se acrescentasse sempre a mesma quantidade absoluta.",
        "Usar q^n em vez de q^(n−1) quando u_1 corresponde ao primeiro termo do modelo."
      ]
    },
    {
      id:"11-suc-somas",
      kicker:"4 · SOMAS FINITAS DE TERMOS CONSECUTIVOS",
      title:"Somar uma progressão sem calcular termo a termo",
      paragraphs:[
        "Numa PA, emparelhar o primeiro termo com o último, o segundo com o penúltimo e assim sucessivamente revela que cada par tem a mesma soma. Daí resulta S_n=n(u_1+u_n)/2, equivalente a n[2u_1+(n−1)r]/2.",
        "Numa PG de razão q≠1, multiplicar a soma por q e subtrair as duas expressões faz cancelar os termos intermédios. O resultado é S_n=u_1(1−q^n)/(1−q), que pode também ser escrito u_1(q^n−1)/(q−1).",
        "As fórmulas pressupõem que estamos a somar n termos consecutivos a partir do primeiro. Se a soma começar noutra ordem, podes calcular o número de termos e usar essa parcela como primeiro termo, ou subtrair somas parciais de forma coerente."
      ],
      formulas:[
        "PA: S_n=n(u_1+u_n)/2",
        "PA: S_n=n[2u_1+(n−1)r]/2",
        "PG, q≠1: S_n=u_1(1−q^n)/(1−q)",
        "PG, q=1: S_n=n·u_1"
      ],
      example:{
        title:"Exemplo resolvido · total de lugares em 20 filas",
        steps:[
          "Um anfiteatro tem 20 filas; a primeira tem 18 lugares e cada fila tem mais 3 do que a anterior.",
          "Primeiro encontra o último termo: u_20=18+19·3=75.",
          "Aplica a soma da PA: S_20=20(18+75)/2.",
          "Calcula 10·93=930."
        ],
        result:"As 20 filas têm, no total, 930 lugares.",
        note:"A fórmula usa simultaneamente o número de termos e os extremos; não confundas o último termo, 75, com a soma, 930."
      },
      remember:"Antes da fórmula, identifica: tipo de progressão, primeiro termo da parcela, último termo ou razão e número de termos que estão realmente a ser somados.",
      pitfalls:[
        "Usar a fórmula de soma de uma PA numa PG apenas porque ambas são sucessões.",
        "Usar n igual à ordem final quando a soma não começa no primeiro termo, sem recalcular quantos termos estão incluídos."
      ]
    },
    {
      id:"11-suc-modelacao-comportamento",
      kicker:"5 · COMPORTAMENTO E SOMA INFINITA DE UMA PG",
      title:"Infinitos termos podem ter soma finita quando encolhem suficientemente depressa",
      paragraphs:[
        "O comportamento de q^n ajuda a compreender as PG. Se q>1, os valores q^n ultrapassam qualquer valor finito quando n é suficientemente grande. Se 0<q<1, q^n pode ficar tão próximo de zero quanto se queira para ordens suficientemente elevadas.",
        "Numa PG com |q|<1, o termo u_1·q^n que aparece na fórmula da soma parcial aproxima-se de zero. Por isso as somas parciais aproximam-se de um valor finito: S_∞=u_1/(1−q). O símbolo de infinito não significa que se calcule um 'último termo'; descreve o valor para o qual as somas parciais se aproximam.",
        "Se |q|≥1 e u_1≠0, a série geométrica não tem esta soma finita: os termos não desaparecem de forma adequada ou as somas não estabilizam. É essencial distinguir a sucessão dos termos da sucessão das somas parciais: uma coisa é u_n tender para zero; outra é a soma de infinitos termos convergir.",
        "Em modelação, a soma infinita só faz sentido quando o contexto admite uma continuação indefinida e a condição |q|<1 é satisfeita. Exemplos geométricos de áreas ou comprimentos podem tornar visível a diferença entre uma soma que estabiliza e uma que cresce sem limite."
      ],
      formulas:[
        "0<q<1 ⇒ q^n aproxima-se de 0 quando n cresce",
        "q>1 ⇒ q^n cresce sem limite quando n cresce",
        "PG com |q|<1: S_∞=u_1/(1−q)",
        "S_n=u_1(1−q^n)/(1−q) → u_1/(1−q), se |q|<1"
      ],
      example:{
        title:"Exemplo resolvido · área total de uma construção geométrica infinita",
        steps:[
          "Considera áreas 8,4,2,1,… em que cada nova área é metade da anterior.",
          "É uma PG com u_1=8 e q=1/2; como |q|<1, a soma infinita é finita.",
          "Aplica S_∞=8/(1−1/2).",
          "Calcula 8/(1/2)=16."
        ],
        result:"A soma de todas as áreas é 16 unidades quadradas.",
        note:"Os termos nunca precisam de se tornar exatamente zero; basta que diminuam de modo a que as somas parciais se aproximem de 16."
      },
      remember:"Para uma PG não nula, soma infinita finita exige |q|<1. Termos tenderem a zero é necessário para uma série convergir, mas não é uma regra suficiente para séries arbitrárias.",
      pitfalls:[
        "Aplicar S_∞=u_1/(1−q) quando |q|≥1.",
        "Concluir que toda a série cuja sucessão de termos se aproxima de zero tem necessariamente soma finita."
      ]
    }
  ]
};

export function mathSequencesReviewContentFor(themeId){
  return themeId==="11-suc"?SEQUENCES_REVIEW:null;
}
