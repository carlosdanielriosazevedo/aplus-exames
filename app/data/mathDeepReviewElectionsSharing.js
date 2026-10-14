export const MATH_ELECTIONS_SHARING_REVIEW_VERSION="2026.10-wave13";

export const ELECTIONS_SHARING_REVIEW={
  id:"10-ele",
  title:"Eleições e partilha",
  lead:"A matemática ajuda a transformar votos e preferências em decisões coletivas e a repartir um número inteiro de lugares de forma proporcional. Neste capítulo vais distinguir maioria simples de maioria absoluta, trabalhar boletins de preferência com o método de Borda e aplicar os métodos de D’Hondt e St. Laguë, comparando resultados sem tratar nenhum método como automaticamente perfeito.",
  goals:[
    "Distinguir maioria simples de maioria absoluta e determinar corretamente o limiar de uma maioria absoluta.",
    "Aplicar o método de Borda a boletins de preferência, explicitando a convenção de pontuação usada.",
    "Distribuir mandatos pelo método de D’Hondt e compreender por que a proporcionalidade final é necessariamente discreta.",
    "Aplicar o método de St. Laguë e comparar resultados, vantagens e limitações dos dois métodos de partilha."
  ],
  sourceBasis:[
    "DGE/EduQA · Aprendizagens Essenciais de Matemática A · 10.º ano · março de 2026 · Modelos Matemáticos nas eleições e na partilha",
    "DGE · Coletânea de tarefas das turmas piloto · Modelos Matemáticos nas Eleições e na Partilha · Matemática A 10.º ano · 2023/2024"
  ],
  sections:[
    {
      id:"10-ele-majorias",
      kicker:"1 · MAIORIA SIMPLES E MAIORIA ABSOLUTA",
      title:"Ter mais votos do que os outros não é o mesmo que ter mais de metade",
      paragraphs:[
        "Num processo decidido por maioria simples, vence a opção que obtém mais votos do que cada uma das restantes. Não é necessário ultrapassar metade dos votos. Se duas opções empatam no maior número de votos, a contagem por si só não produz um vencedor único e é necessária a regra de desempate prevista no contexto.",
        "Uma maioria absoluta exige mais de metade dos votos considerados no problema. Se existirem N votos, o menor número inteiro que garante maioria absoluta é floor(N/2)+1. Assim, com 100 votos são necessários pelo menos 51; com 101 votos também são necessários 51.",
        "A diferença torna-se importante quando há três ou mais candidaturas: alguém pode vencer por maioria simples com, por exemplo, 40% dos votos e ainda assim ficar longe da maioria absoluta. Em alguns sistemas, a ausência de maioria absoluta desencadeia uma segunda volta; essa consequência depende das regras do sistema, não da definição matemática de maioria absoluta."
      ],
      formulas:[
        "maioria simples: maior número de votos entre as opções",
        "maioria absoluta: votos > N/2",
        "limiar mínimo de maioria absoluta=floor(N/2)+1"
      ],
      example:{
        title:"Exemplo resolvido · 240 votos distribuídos por três candidatos",
        steps:[
          "A recebe 100 votos, B recebe 82 e C recebe 58; total=240.",
          "A tem mais votos do que B e C, logo vence por maioria simples.",
          "A maioria absoluta exige floor(240/2)+1=121 votos.",
          "Como 100<121, nenhum candidato tem maioria absoluta."
        ],
        result:"A vence por maioria simples, mas não existe maioria absoluta.",
        note:"‘Vencedor’ e ‘maioria absoluta’ são conceitos diferentes; não os tornes sinónimos."
      },
      remember:"Maioria simples compara candidatos entre si; maioria absoluta compara o resultado de um candidato com metade do total.",
      pitfalls:[
        "Dizer que 50% exatos constituem maioria absoluta; é necessário mais de metade.",
        "Concluir que quem vence por maioria simples tem necessariamente maioria absoluta."
      ]
    },
    {
      id:"10-ele-borda",
      kicker:"2 · MÉTODO DE BORDA",
      title:"Uma preferência completa transforma posições em pontos",
      paragraphs:[
        "No método de Borda, cada eleitor ordena as opções por preferência. A cada posição é atribuída uma pontuação segundo uma convenção previamente definida; somam-se depois os pontos recebidos por cada opção em todos os boletins. Vence a opção com maior pontuação total.",
        "Com quatro opções, uma convenção simples é atribuir 3 pontos ao 1.º lugar, 2 ao 2.º, 1 ao 3.º e 0 ao 4.º. Outra convenção completa que some a mesma constante a todas as posições de cada boletim pode produzir a mesma ordenação final; por isso, numa resolução, o essencial é declarar e aplicar consistentemente a regra indicada.",
        "Borda usa mais informação do que contar apenas primeiras preferências. Isso significa que o vencedor por Borda pode ser diferente do vencedor por maioria simples. A diferença não é um erro: mostra que métodos distintos traduzem preferências coletivas segundo critérios diferentes e, por isso, podem ter vantagens e limitações distintas."
      ],
      formulas:[
        "pontuação total de uma opção=Σ(pontos recebidos em cada boletim)",
        "com m opções, uma convenção comum: m−1,m−2,…,1,0 pontos",
        "vencedor de Borda=opção com maior pontuação total"
      ],
      example:{
        title:"Exemplo resolvido · três grupos de preferências",
        steps:[
          "Há três opções A, B e C e usa-se 2-1-0 pontos. Dez eleitores ordenam A>B>C; sete ordenam B>C>A; cinco ordenam C>B>A.",
          "A recebe 10·2+7·0+5·0=20 pontos.",
          "B recebe 10·1+7·2+5·1=29 pontos.",
          "C recebe 10·0+7·1+5·2=17 pontos."
        ],
        result:"B vence pelo método de Borda com 29 pontos.",
        note:"Contar apenas os primeiros lugares daria A=10, B=7 e C=5; Borda pode portanto escolher uma opção diferente da pluralidade simples."
      },
      remember:"Em Borda, não contes apenas primeiras escolhas: cada posição contribui para a pontuação final.",
      pitfalls:[
        "Misturar duas convenções de pontuação na mesma contagem ou esquecer de indicar qual está a ser usada.",
        "Escolher o vencedor pelo número de primeiros lugares depois de o problema pedir explicitamente o método de Borda."
      ]
    },
    {
      id:"10-ele-dhondt",
      kicker:"3 · MÉTODO DE D’HONDT",
      title:"Os mandatos são atribuídos aos maiores quocientes sucessivos",
      paragraphs:[
        "O método de D’Hondt reparte um número inteiro de mandatos a partir dos votos de cada lista. Para cada lista constroem-se quocientes dividindo o número de votos por 1,2,3,…; ordenam-se os quocientes e atribuem-se os mandatos aos maiores valores até esgotar o número de lugares disponível.",
        "Cada vez que um quociente de uma lista entra entre os selecionados, essa lista recebe um mandato. A mesma lista pode receber vários lugares porque tem vários quocientes na tabela. O processo termina exatamente quando tiverem sido atribuídos todos os mandatos pedidos.",
        "A distribuição é proporcional, mas não pode reproduzir percentagens de forma perfeitamente contínua porque mandatos são indivisíveis. Em casos de igualdade exata de quocientes, a regra de desempate depende do enquadramento eleitoral ou do enunciado; não se deve inventar uma regra universal que o método, por si só, não especifica."
      ],
      formulas:[
        "quocientes de uma lista com V votos: V/1, V/2, V/3, …",
        "selecionar os M maiores quocientes ⇒ atribuir M mandatos",
        "mandatos de uma lista=número dos seus quocientes entre os M selecionados"
      ],
      example:{
        title:"Exemplo resolvido · distribuir 5 mandatos",
        steps:[
          "Listas A=10 000 votos, B=6 500 e C=3 500. Calcula quocientes suficientes para cinco lugares.",
          "A: 10 000; 5 000; 3 333,3; …  B: 6 500; 3 250; …  C: 3 500; 1 750; …",
          "Os cinco maiores são 10 000(A), 6 500(B), 5 000(A), 3 500(C) e 3 333,3(A).",
          "Conta as ocorrências: A aparece três vezes, B uma vez e C uma vez."
        ],
        result:"D’Hondt atribui A=3, B=1 e C=1 mandatos.",
        note:"Não arredondes quocientes prematuramente quando valores próximos possam alterar a ordenação."
      },
      remember:"D’Hondt é uma seleção ordenada de quocientes; não atribuas percentagens e só depois arredondes lugares.",
      pitfalls:[
        "Dividir apenas pelo número final de mandatos ou usar sempre o mesmo divisor para todas as posições.",
        "Arredondar percentagens de votos para obter mandatos, em vez de aplicar a sequência de quocientes."
      ]
    },
    {
      id:"10-ele-stlague-comparacao",
      kicker:"4 · ST. LAGUË E COMPARAÇÃO DE MÉTODOS",
      title:"Mudar os divisores pode mudar a distribuição final",
      paragraphs:[
        "O método padrão de St. Laguë tem a mesma lógica geral de seleção de quocientes, mas usa divisores ímpares 1,3,5,7,… em vez de 1,2,3,4,… . Os mandatos continuam a ser atribuídos aos maiores quocientes até preencher todos os lugares.",
        "Como os segundos e seguintes quocientes de cada lista diminuem mais depressa em St. Laguë, este método tende, em muitas distribuições, a ser menos favorável às listas maiores do que D’Hondt. É uma tendência comparativa, não uma garantia de que cada eleição produzirá resultados diferentes ou de que uma lista específica ganhará sempre um lugar.",
        "As AE exigem não apenas executar os dois algoritmos, mas identificar vantagens e limitações. Ambos transformam votos numa distribuição inteira e ambos podem afastar-se da proporcionalidade exata; métodos diferentes podem produzir distribuições distintas para a mesma votação. Uma boa comparação apresenta o cálculo e explica a consequência, sem declarar um método universalmente ‘justo’ só porque um exemplo o favoreceu.",
        "Os métodos também podem ser usados em partilhas não eleitorais, como distribuir equipamentos por departamentos de dimensões diferentes. O significado dos números muda, mas permanece a necessidade de uma regra transparente para converter proporções em unidades indivisíveis."
      ],
      formulas:[
        "St. Laguë: V/1, V/3, V/5, V/7, …",
        "D’Hondt: V/1, V/2, V/3, V/4, …",
        "mesmos votos + divisores diferentes ⇒ distribuição pode ser diferente"
      ],
      example:{
        title:"Exemplo resolvido · comparar com a mesma votação do exemplo anterior",
        steps:[
          "Mantém A=10 000, B=6 500 e C=3 500 para 5 mandatos.",
          "Em St. Laguë: A=10 000; 3 333,3; 2 000; … B=6 500; 2 166,7; … C=3 500; 1 166,7; …",
          "Os cinco maiores são 10 000(A), 6 500(B), 3 500(C), 3 333,3(A) e 2 166,7(B).",
          "Logo St. Laguë dá A=2, B=2, C=1, enquanto D’Hondt tinha dado A=3, B=1, C=1."
        ],
        result:"A mesma votação produz distribuições diferentes: D’Hondt 3-1-1 e St. Laguë 2-2-1.",
        note:"Este exemplo mostra que a regra de partilha importa; não prova que os métodos diferem em todas as votações."
      },
      remember:"Compara métodos usando os mesmos votos e o mesmo número de lugares; só assim a diferença observada vem da regra de partilha.",
      pitfalls:[
        "Usar em St. Laguë os divisores 1,2,3,… de D’Hondt.",
        "Transformar uma tendência — D’Hondt favorecer relativamente mais listas maiores em muitos cenários — numa afirmação absoluta para todas as votações."
      ]
    }
  ]
};

export function mathElectionsSharingReviewContentFor(themeId){
  return themeId==="10-ele"?ELECTIONS_SHARING_REVIEW:null;
}
