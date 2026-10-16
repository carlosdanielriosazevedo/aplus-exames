export const PORTUGUESE_GRAMATICA_12_DEEP_REVIEW_VERSION="2026.10-wave26";

export const PORTUGUESE_GRAMATICA_12_DEEP_REVIEW={
  id:"pt12-gramatica",
  title:"Gramática · consolidação para exame",
  lead:"No 12.º ano, a gramática deve ser aplicada em contexto e justificada por propriedades observáveis. As Aprendizagens Essenciais de março de 2026 consolidam processos irregulares de formação de palavras, sintaxe e articulação frásica, valores aspetuais, cadeias referenciais e anáfora, coerência e coesão e reprodução do discurso. O objetivo não é decorar etiquetas: é identificar a estrutura, testar hipóteses e explicar por que razão uma classificação é adequada.",
  goals:[
    "Reconhecer processos irregulares de formação de palavras a partir da forma e história estrutural da palavra.",
    "Analisar funções sintáticas e relações entre orações sem decidir apenas pela posição das palavras.",
    "Distinguir valores aspetuais perfetivo, imperfetivo, habitual, iterativo e genérico em contexto.",
    "Reconstruir cadeias referenciais e distinguir anáfora de mera repetição lexical.",
    "Avaliar coerência e coesão como propriedades relacionadas mas não equivalentes.",
    "Distinguir discurso direto, indireto e indireto livre pelas marcas linguísticas e pelo efeito enunciativo.",
    "Responder em exame por propriedade observável → teste/contraste → classificação → justificação."
  ],
  sourceBasis:[
    "DGE · Aprendizagens Essenciais · Português · 12.º ano · março de 2026 · Gramática",
    "DGE · processos irregulares de formação de palavras; sintaxe; valores aspetuais; cadeias referenciais; coerência e coesão; reprodução do discurso",
    "IAVE/EduQA · Informação-Prova 639 · Português · 2026"
  ],
  sections:[
    {
      id:"pt12-gramatica-formacao-palavras",
      kicker:"1 · FORMAÇÃO IRREGULAR DE PALAVRAS",
      title:"Nem todas as palavras novas resultam de prefixo + base + sufixo",
      paragraphs:[
        "Os processos irregulares exigem observar a relação entre a palavra resultante e as formas que lhe deram origem. Truncação, siglação, acronímia, amálgama e empréstimo não devem ser confundidos com derivação ou composição só porque a palavra pode ser segmentada visualmente.",
        "A classificação depende do mecanismo de formação. Numa sigla, usam-se normalmente iniciais; num acrónimo, a sequência resultante funciona como palavra pronunciável; numa amálgama, partes de palavras diferentes fundem-se numa unidade nova; na truncação, reduz-se uma forma preexistente.",
        "Em exame, descreve primeiro o que aconteceu à forma original. Só depois atribui o nome ao processo. Este percurso reduz respostas por memória visual e ajuda a distinguir fenómenos próximos."
      ],
      signals:["Mecanismo primeiro, etiqueta depois.","Sigla e acrónimo não são sinónimos automáticos.","Segmentação visual não prova derivação."],
      example:{title:"Exemplo · classificar sem adivinhar",prompt:"Como decides entre sigla, acrónimo e amálgama?",steps:["Identifica as formas de origem.","Observa que partes foram conservadas.","Verifica se a nova unidade resulta de iniciais ou fusão de segmentos.","Classifica e justifica pelo mecanismo."],modelAnswer:"A classificação deve resultar da transformação observada. Se a forma é construída a partir de iniciais, estamos perante siglação ou acronímia conforme o funcionamento da sequência; se funde segmentos de palavras diferentes numa unidade nova, trata-se de amálgama.",note:"Não classifiques apenas pela aparência final da palavra."},
      remember:"Processo de formação = operação realizada sobre formas de origem.",
      pitfalls:["Chamar derivação a qualquer palavra segmentável.","Tratar sigla e acrónimo como equivalentes.","Ignorar as formas de origem."]
    },
    {
      id:"pt12-gramatica-sintaxe",
      kicker:"2 · SINTAXE E ARTICULAÇÃO FRÁSICA",
      title:"Função sintática depende da relação estrutural, não da posição",
      paragraphs:[
        "Uma função sintática deve ser identificada pela relação com o núcleo e pelo comportamento do constituinte. Estar antes ou depois do verbo não basta para decidir entre sujeito, complemento direto, complemento oblíquo, predicativo ou modificador.",
        "Na articulação de orações, distingue coordenação de subordinação e identifica a relação semântica e sintática efetiva. Uma conjunção frequente pode introduzir relações diferentes consoante a construção, por isso a palavra de ligação não substitui a análise da oração inteira.",
        "Usa testes com prudência: substituição pronominal, pergunta ao verbo, mobilidade ou omissão podem fornecer evidência, mas nenhum teste isolado resolve todos os casos. Cruza propriedades antes de concluir."
      ],
      signals:["Constituinte, núcleo e relação vêm antes da etiqueta.","Conector ≠ classificação automática.","Cruza mais de uma propriedade quando houver ambiguidade."],
      example:{title:"Exemplo · complemento ou modificador?",prompt:"Como evitas classificar apenas porque um grupo aparece depois do verbo?",steps:["Identifica o verbo e a estrutura exigida.","Testa se o constituinte é selecionado pelo verbo.","Observa mobilidade e possibilidade de omissão.","Cruza os resultados e justifica a função."],modelAnswer:"A posição pós-verbal não basta. É necessário verificar se o verbo seleciona esse constituinte e como ele se comporta perante omissão, substituição ou deslocação. A função sintática resulta da relação estrutural demonstrada por essas propriedades.",note:"Um teste útil é evidência; não é uma regra infalível isolada."},
      remember:"Sintaxe é relação entre constituintes, não uma leitura linear da frase.",
      pitfalls:["Classificar pelo lugar na frase.","Decidir apenas pelo conector.","Usar um único teste como prova absoluta."]
    },
    {
      id:"pt12-gramatica-aspeto",
      kicker:"3 · VALORES ASPETUAIS",
      title:"O aspeto descreve como a situação é apresentada internamente",
      paragraphs:[
        "O valor aspetual não é o mesmo que tempo verbal. Uma situação pode ser apresentada como concluída, em curso, habitual, repetida ou genericamente válida, e essa leitura resulta da combinação entre forma verbal, natureza do predicado e contexto.",
        "Perfetivo apresenta a situação como globalmente delimitada; imperfetivo mostra-a sem esse fecho global. Habitual caracteriza repetição estabilizada como hábito; iterativo destaca repetição de ocorrências; genérico formula uma propriedade ou regularidade não presa a um episódio concreto.",
        "Para justificar, aponta marcas do enunciado: advérbios de frequência, quantificação, duração, tipo de verbo e enquadramento discursivo. Não deduzas automaticamente o aspeto a partir de um único tempo verbal."
      ],
      signals:["Tempo verbal ≠ valor aspetual.","Habitual e iterativo são repetições de natureza diferente.","Contexto pode alterar a leitura do mesmo tempo verbal."],
      example:{title:"Exemplo · habitual ou iterativo?",prompt:"Como distingues uma ação habitual de uma ação simplesmente repetida?",steps:["Localiza marcas de frequência.","Verifica se a repetição define um padrão estável.","Distingue hábito de contagem/reiteração de eventos.","Justifica com o contexto."],modelAnswer:"Uma leitura habitual apresenta a repetição como padrão caracterizador, enquanto a leitura iterativa destaca a multiplicação de ocorrências. A distinção deve apoiar-se nas marcas de frequência e no modo como o enunciado enquadra a situação.",note:"Não associes automaticamente imperfeito a habitual ou perfeito a perfetivo."},
      remember:"Aspeto = modo como a situação é perspectivada quanto ao seu desenvolvimento e repetição.",
      pitfalls:["Confundir tempo e aspeto.","Confundir habitual com iterativo.","Ignorar advérbios e contexto."]
    },
    {
      id:"pt12-gramatica-referencia",
      kicker:"4 · CADEIAS REFERENCIAIS E ANÁFORA",
      title:"Compreender quem ou o que é retomado é reconstruir uma cadeia de referência",
      paragraphs:[
        "Uma cadeia referencial liga expressões que remetem para a mesma entidade ou para entidades discursivamente relacionadas. Pronomes, grupos nominais, elipses e outras formas podem manter o referente ativo sem repetir exatamente as mesmas palavras.",
        "A anáfora ocorre quando uma expressão depende de informação anterior para ser interpretada. Para identificar o antecedente, procura compatibilidade semântica, gramatical e discursiva; a expressão nominal imediatamente anterior nem sempre é a resposta correta.",
        "Ambiguidades referenciais surgem quando mais de um antecedente é plausível. Em exame, mostra por que razão uma leitura é favorecida pelo contexto em vez de apenas apontar um nome."
      ],
      signals:["Referência ≠ repetição lexical.","Antecedente deve ser compatível com forma e sentido.","Proximidade não garante antecedência."],
      example:{title:"Exemplo · encontrar o antecedente",prompt:"Um pronome pode retomar dois grupos nominais próximos. O que fazes?",steps:["Verifica género, número e pessoa.","Testa compatibilidade semântica.","Observa a continuidade temática e discursiva.","Escolhe a leitura melhor sustentada e explica porquê."],modelAnswer:"O antecedente não deve ser escolhido apenas por proximidade. A interpretação mais forte é a que satisfaz simultaneamente compatibilidade gramatical, plausibilidade semântica e continuidade discursiva.",note:"Se houver ambiguidade real, reconhecê-la pode fazer parte da análise."},
      remember:"Uma cadeia referencial mantém entidades acessíveis ao longo do texto por diferentes expressões.",
      pitfalls:["Escolher sempre o nome mais próximo.","Confundir anáfora com repetição exata.","Ignorar incompatibilidades semânticas."]
    },
    {
      id:"pt12-gramatica-coerencia-coesao",
      kicker:"5 · COERÊNCIA E COESÃO",
      title:"Um texto pode estar ligado por conectores e continuar sem fazer sentido",
      paragraphs:[
        "Coesão diz respeito aos mecanismos linguísticos que ligam partes do texto: conectores, referenciação, substituição, elipse, repetição controlada e relações lexicais. Coerência diz respeito à compatibilidade e progressão global dos sentidos.",
        "Um texto pode ter muitas marcas de coesão e ainda ser incoerente se apresentar contradições, saltos lógicos ou informação incompatível. Também pode existir coerência com poucos conectores explícitos quando as relações são inferíveis e bem organizadas.",
        "Ao justificar um problema textual, identifica o mecanismo concreto: referente ambíguo, conector inadequado, contradição, quebra temática ou relação lógica mal construída. Evita respostas vagas como «não tem coesão»."
      ],
      signals:["Coesão = mecanismos linguísticos de ligação.","Coerência = compatibilidade e progressão de sentido.","Mais conectores não garantem melhor texto."],
      example:{title:"Exemplo · texto coeso mas incoerente",prompt:"Como pode um parágrafo ter conectores corretos e continuar incoerente?",steps:["Identifica as proposições principais.","Verifica se são semanticamente compatíveis.","Analisa a relação indicada pelos conectores.","Mostra onde o sentido global entra em contradição ou quebra."],modelAnswer:"Os conectores podem ligar formalmente as frases, mas a coerência falha se as ideias ligadas se contradizem ou não formam uma progressão plausível. É necessário avaliar simultaneamente a ligação linguística e a relação de sentido.",note:"Não uses coerência e coesão como sinónimos."},
      remember:"Coesão ajuda a construir relações; coerência determina se essas relações produzem um sentido global sustentável.",
      pitfalls:["Contar conectores como medida de coesão.","Tratar coerência e coesão como a mesma coisa.","Apontar erro sem localizar o mecanismo."]
    },
    {
      id:"pt12-gramatica-discurso",
      kicker:"6 · REPRODUÇÃO DO DISCURSO",
      title:"Mudar a forma de citar uma voz altera marcas linguísticas e pode alterar o efeito narrativo",
      paragraphs:[
        "No discurso direto, a fala surge apresentada como intervenção autónoma da voz citada, com marcas próprias de pessoa, tempo, espaço e frequentemente pontuação específica. No indireto, essa fala é integrada sintaticamente no discurso do relator e sofre adaptações de pessoa, tempo e dêixis.",
        "O discurso indireto livre mistura traços da narração com marcas da perspetiva ou voz da personagem sem a introdução explícita típica do discurso indireto. Não deve ser identificado apenas pela ausência de aspas: procura interferência de léxico, modalidade, interrogações, exclamações ou orientação deíctica da personagem.",
        "Transformar discurso não é substituir pontuação. É reconstruir relações enunciativas: quem fala, a partir de que momento e lugar, e como pronomes, tempos e advérbios precisam de se ajustar."
      ],
      signals:["Direto: autonomia enunciativa da fala citada.","Indireto: integração sintática e ajustamentos deícticos.","Indireto livre: mistura de voz narrativa e perspetiva da personagem."],
      example:{title:"Exemplo · reconhecer indireto livre",prompt:"Porque é insuficiente dizer «não tem aspas, logo é indireto livre»?",steps:["Identifica a voz narrativa de base.","Procura marcas avaliativas ou deícticas da personagem.","Verifica ausência de verbo introdutor que integre a fala como subordinada.","Explica o efeito de aproximação à consciência da personagem."],modelAnswer:"A ausência de aspas não basta. O discurso indireto livre reconhece-se pela coexistência de estrutura narrativa com marcas linguísticas que pertencem à perspetiva da personagem, produzindo uma sobreposição de vozes sem introdução explícita de fala.",note:"Pontuação é uma pista possível, não a definição do tipo de discurso."},
      remember:"Tipos de discurso distinguem-se pela relação entre vozes e pelas transformações enunciativas que essa relação exige.",
      pitfalls:["Classificar só pela pontuação.","Esquecer mudanças de pessoa, tempo e dêixis.","Confundir indireto livre com simples narração de pensamentos."]
    },
    {
      id:"pt12-gramatica-exame",
      kicker:"7 · MÉTODO DE EXAME",
      title:"Classifica apenas depois de teres encontrado a propriedade que prova a resposta",
      paragraphs:[
        "Em perguntas de gramática, começa pelo segmento relevante e pelo contexto. Define exatamente o que está a ser pedido: função, classe, relação entre orações, valor aspetual, antecedente, mecanismo de coesão ou tipo de discurso.",
        "Depois recolhe evidência. Usa propriedades sintáticas, morfológicas, semânticas ou discursivas e, quando possível, um contraste ou teste. Só no fim escreve a classificação. Este método reduz respostas baseadas em palavras-gatilho.",
        "Se a pergunta pede justificação, nomear a categoria não chega. A resposta forte liga uma propriedade observável à conclusão: propriedade → teste/contraste → classificação → explicação curta."
      ],
      signals:["Lê o contexto antes do segmento isolado.","Propriedade → teste → classificação.","Palavra-gatilho nunca substitui análise."],
      example:{title:"Exemplo · resposta justificada",prompt:"Como estruturas uma justificação gramatical curta?",steps:["Nomeia o elemento relevante.","Aponta uma propriedade observável.","Aplica um teste ou contraste útil.","Conclui com a classificação pedida."],modelAnswer:"A resposta deve começar pela evidência e não pela etiqueta: identifica a propriedade do constituinte ou relação, mostra como ela se verifica no contexto e só depois apresenta a classificação. Assim, a justificação demonstra a resposta em vez de a repetir.",note:"Uma definição decorada não substitui prova aplicada ao exemplo concreto."},
      remember:"Em gramática, justificar é demonstrar a classificação com propriedades do enunciado.",
      pitfalls:["Responder por palavra-gatilho.","Dar apenas a etiqueta quando é pedida justificação.","Ignorar o contexto que altera a interpretação."]
    }
  ]
};

export function portugueseGramatica12DeepReviewFor(unitId){
  return unitId===PORTUGUESE_GRAMATICA_12_DEEP_REVIEW.id?PORTUGUESE_GRAMATICA_12_DEEP_REVIEW:null;
}
