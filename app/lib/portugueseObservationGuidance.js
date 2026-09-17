const GENERIC_GUIDANCE={
  conteudo:{counts:"Uma ideia que responda diretamente ao que esta observação pede e que seja compatível com o texto ou enunciado.",notEnough:"Repetir palavras do enunciado, escrever uma ideia vaga ou acrescentar informação que o texto não sustenta."},
  fundamentacao:{counts:"Um elemento concreto do texto, exemplo ou razão pertinente, seguido da ligação explícita à interpretação defendida.",notEnough:"Citar ou mencionar um detalhe sem explicar como ele prova a ideia apresentada."},
  argumentacao:{counts:"Uma razão distinta, pertinente e desenvolvida que sustente claramente a posição assumida.",notEnough:"Afirmar apenas que concordas ou discordas, repetir a mesma razão com outras palavras ou usar um exemplo sem explicar o seu valor."},
  posicao:{counts:"Uma tomada de posição inequívoca e coerente com o desenvolvimento que se segue.",notEnough:"Falar sobre o tema sem dizer claramente qual é a posição defendida."},
  estrutura:{counts:"Ideias ordenadas, ligadas entre si e com progressão reconhecível ao longo da resposta.",notEnough:"Frases corretas mas justapostas, repetições ou uma conclusão que não decorre do desenvolvimento."},
  coerencia:{counts:"Cada ideia decorre da anterior e contribui para responder ao tema, sem contradições internas.",notEnough:"Uma sequência de frases sobre o mesmo assunto que não constrói uma linha de raciocínio."},
  discurso:{counts:"Uma explicação clara que interpreta o elemento pedido e o relaciona diretamente com o excerto.",notEnough:"Nomear o recurso ou resumir o excerto sem explicar o efeito ou sentido pedido."},
  forma:{counts:"Identificar corretamente o recurso formal e explicar a função que desempenha na construção do sentido.",notEnough:"Nomear apenas o recurso formal ou atribuir-lhe um efeito genérico não demonstrado pelo texto."},
  funcao:{counts:"Indicar exatamente a função sintática pedida, usando a designação correta.",notEnough:"Apresentar uma função parecida, uma classe de palavras ou uma justificação sem identificar corretamente a função."},
  justificacao:{counts:"Explicar a relação sintática ou semântica pedida com base no verbo, constituinte ou estrutura concreta da frase.",notEnough:"Dar apenas a resposta final ou usar uma regra genérica sem a aplicar à frase do enunciado."},
  lingua:{counts:"Frases compreensíveis, vocabulário adequado e ausência de erros que alterem ou dificultem o sentido.",notEnough:"Uma resposta fluente mas semanticamente errada; correção linguística não substitui conteúdo."},
  "correcao-linguistica":{counts:"Frases sintaticamente claras, vocabulário adequado, ortografia e pontuação suficientemente corretas.",notEnough:"Escrever sem erros formais mas não responder ao tema ou aos critérios de conteúdo."},
  "genero-tema":{counts:"Cumprir o género pedido e desenvolver efetivamente o tema definido no enunciado.",notEnough:"Usar uma forma textual aceitável mas desviar-se do tema ou falar dele apenas de modo superficial."}
};

const SPECIFIC={
  "PT639-FND-005:conteudo-1":{counts:"Ex.: explicar que o relógio é apresentado como se tivesse comportamento humano, identificando a personificação.",notEnough:"Ex.: dizer apenas que o relógio aparece no texto, sem identificar nem explicar a personificação."},
  "PT639-FND-005:conteudo-2":{counts:"Ex.: relacionar a repetição dos segundos com a passagem contínua e inevitável do tempo.",notEnough:"Ex.: afirmar apenas que os segundos se repetem, sem explicar o que essa repetição significa."},
  "PT639-FND-006:conteudo-1":{counts:"Ex.: explicar que a fotografia conserva uma memória de um momento passado.",notEnough:"Ex.: limitar-se a dizer que existe uma fotografia, sem explicar a sua função de preservação da memória."},
  "PT639-FND-006:conteudo-2":{counts:"Ex.: contrastar a pessoa retratada no passado com a identidade atual do sujeito.",notEnough:"Ex.: dizer apenas que a fotografia é antiga, sem relacionar passado e identidade presente."},
  "PT639-FND-010:conteudo-1":{counts:"Ex.: apresentar uma função social concreta das bibliotecas, como facilitar o acesso da comunidade à informação ou à cultura.",notEnough:"Ex.: dizer apenas que as bibliotecas são importantes, sem identificar uma função social concreta."},
  "PT639-FND-010:conteudo-2":{counts:"Ex.: acrescentar uma segunda função social diferente da primeira, como promover encontro, estudo ou inclusão.",notEnough:"Ex.: repetir a primeira função com outras palavras em vez de apresentar uma função distinta."},
  "PT639-FND-016:conteudo-1":{counts:"Ex.: explicar que a personalização pode facilitar a escolha ao destacar opções mais próximas dos interesses do utilizador.",notEnough:"Ex.: dizer apenas que a personalização é útil, sem explicar de que modo facilita a escolha."},
  "PT639-FND-016:conteudo-2":{counts:"Ex.: explicar que a personalização também pode limitar a diversidade das opções e reduzir a descoberta de conteúdos diferentes.",notEnough:"Ex.: afirmar genericamente que a personalização tem desvantagens, sem identificar a redução da diversidade ou descoberta."},
  "PT639-FND-019:conteudo-1":{counts:"Ex.: relacionar as ações atribuídas à cidade com uma sensação de desgaste ou consumo contínuo do tempo.",notEnough:"Ex.: enumerar as ações da cidade sem explicar como contribuem para a ideia de desgaste temporal."},
  "PT639-FND-019:conteudo-2":{counts:"Ex.: explicar que esse desgaste se traduz num cansaço que ultrapassa o indivíduo e assume dimensão coletiva.",notEnough:"Ex.: mencionar apenas que existe cansaço, sem ligar as ações da cidade ao efeito coletivo."},
  "PT639-FND-026:conteudo-1":{counts:"Ex.: desenvolver uma vantagem pertinente ao contexto e explicar concretamente por que razão é uma vantagem.",notEnough:"Ex.: listar uma vantagem em duas ou três palavras sem qualquer explicação."},
  "PT639-FND-026:conteudo-2":{counts:"Ex.: apresentar e desenvolver uma segunda vantagem que acrescente uma ideia diferente da primeira.",notEnough:"Ex.: reformular a primeira vantagem como se fosse uma segunda ideia."},
  "PT639-FND-031:conteudo-1":{counts:"Ex.: explicar que a informação breve ajuda o visitante a orientar-se e a fazer uma primeira leitura da visita.",notEnough:"Ex.: dizer apenas que a informação é curta ou fácil de ler, sem explicar a sua função na visita inicial."},
  "PT639-FND-031:conteudo-2":{counts:"Ex.: explicar que o aprofundamento posterior leva o visitante a voltar a observar com mais atenção o que já viu.",notEnough:"Ex.: dizer apenas que depois há mais informação, sem relacioná-la com uma nova observação."},
  "PT639-FND-035:conteudo-1":{counts:"Ex.: identificar que o exterior mantém uma aparência preservada apesar do estado real do edifício.",notEnough:"Ex.: dizer apenas que o exterior é bonito ou antigo, sem identificar a preservação da aparência."},
  "PT639-FND-035:conteudo-2":{counts:"Ex.: contrastar essa aparência exterior preservada com a degradação escondida no interior.",notEnough:"Ex.: mencionar separadamente exterior e interior sem construir o contraste entre aparência e degradação."},
  "PT639-FND-037:conteudo-1":{counts:"Ex.: identificar a repetição de «Se digo» como elemento formal relevante do excerto.",notEnough:"Ex.: falar genericamente de repetição sem identificar a expressão que efetivamente se repete."},
  "PT639-FND-037:conteudo-2":{counts:"Ex.: explicar que a repetição vai associando linguagem, distância e perda de forma progressiva.",notEnough:"Ex.: afirmar apenas que a repetição dá ritmo, sem explicar a relação entre linguagem, distância e perda."},
  "PT639-FND-038:conteudo-1":{counts:"Ex.: desenvolver uma vantagem adequada ao contexto e mostrar o efeito positivo que produz.",notEnough:"Ex.: nomear uma vantagem sem explicar o efeito que a torna relevante."},
  "PT639-FND-038:conteudo-2":{counts:"Ex.: acrescentar uma segunda vantagem realmente distinta e desenvolvê-la autonomamente.",notEnough:"Ex.: apresentar a mesma vantagem com vocabulário diferente."},
  "PT639-FND-047:conteudo-1":{counts:"Ex.: explicar que a disponibilização de recipientes tornou a reciclagem mais acessível e aumentou a quantidade de resíduos reciclados.",notEnough:"Ex.: dizer apenas que foram colocados recipientes, sem relacionar essa medida com o aumento da reciclagem."},
  "PT639-FND-047:conteudo-2":{counts:"Ex.: distinguir o aumento da quantidade reciclada da correção com que os resíduos são separados.",notEnough:"Ex.: tratar mais reciclagem e melhor separação como se fossem exatamente o mesmo resultado."},
  "PT639-FND-051:conteudo-1":{counts:"Ex.: relacionar o crescimento da árvore com o tempo que passou desde a partida referida no texto.",notEnough:"Ex.: dizer apenas que a árvore cresceu, sem ligar esse crescimento ao tempo decorrido."},
  "PT639-FND-051:conteudo-2":{counts:"Ex.: explicar que a sombra já alcançar a janela funciona como sinal concreto da passagem desse tempo.",notEnough:"Ex.: mencionar a sombra ou a janela sem explicar o valor desse detalhe na interpretação."},
  "PT639-FND-053:conteudo-1":{counts:"Ex.: relacionar a repetição de «Volto» com a insistência do sujeito em regressar aos lugares do passado.",notEnough:"Ex.: identificar apenas a repetição de «Volto» sem explicar a ideia de regresso que constrói."},
  "PT639-FND-053:conteudo-2":{counts:"Ex.: explicar que a quebra final mostra que regressar ao lugar não permite recuperar a identidade passada.",notEnough:"Ex.: dizer apenas que o final é triste ou diferente, sem explicar a impossibilidade de recuperar o passado."},
  "PT639-FND-058:conteudo-1":{counts:"Ex.: desenvolver uma vantagem concreta da informação em tempo real, explicando como ajuda a tomar decisões mais rapidamente.",notEnough:"Ex.: dizer apenas que a informação em tempo real é mais rápida, sem mostrar a vantagem prática dessa rapidez."},
  "PT639-FND-058:conteudo-2":{counts:"Ex.: apresentar uma segunda vantagem diferente, como reduzir incerteza ou permitir reagir a alterações inesperadas.",notEnough:"Ex.: repetir a ideia de rapidez com outras palavras em vez de acrescentar uma vantagem distinta."},
  "PT639-FND-042:funcao-1":{counts:"Escrever explicitamente que «na sala» é predicativo do sujeito.",notEnough:"Dizer apenas que é uma expressão de lugar ou classificá-la como complemento oblíquo."},
  "PT639-FND-042:justificacao-1":{counts:"Referir que «permanecer» funciona aqui como verbo copulativo.",notEnough:"Dizer apenas que o verbo indica permanência ou localização."},
  "PT639-FND-042:justificacao-2":{counts:"Explicar que «na sala» atribui ao sujeito uma localização/estado através do verbo copulativo.",notEnough:"Afirmar apenas que «na sala» indica lugar, sem explicar a relação predicativa com o sujeito."},
  "PT639-FND-054:funcao-1":{counts:"Escrever explicitamente que «representante da turma» é predicativo do complemento direto.",notEnough:"Trocar a função com a de «a Beatriz» ou chamar-lhe complemento direto."},
  "PT639-FND-054:justificacao-1":{counts:"Identificar «a Beatriz» como complemento direto de «nomeou».",notEnough:"Dizer apenas que Beatriz é a pessoa de quem se fala."},
  "PT639-FND-054:justificacao-2":{counts:"Explicar que «representante da turma» atribui uma função/propriedade ao complemento direto «a Beatriz».",notEnough:"Dizer apenas que Beatriz foi nomeada, sem explicar a relação entre os dois constituintes."},
  "PT639-FND-012:genero-tema-1":{counts:"Ex.: produzir o género textual pedido, com marcas reconhecíveis desse género ao longo da resposta.",notEnough:"Ex.: escrever um texto correto mas noutro género, mesmo que fale do mesmo tema."},
  "PT639-FND-012:genero-tema-2":{counts:"Ex.: manter o desenvolvimento centrado no tema pedido, fazendo cada parágrafo contribuir para esse foco.",notEnough:"Ex.: começar no tema e depois ocupar grande parte do texto com ideias laterais ou apenas vagamente relacionadas."},
  "PT639-FND-012:coerencia-1":{counts:"Ex.: ordenar as ideias de modo a que cada passo prepare o seguinte e o leitor consiga acompanhar a progressão.",notEnough:"Ex.: juntar boas frases numa ordem aleatória, sem progressão entre elas."},
  "PT639-FND-012:coerencia-2":{counts:"Ex.: usar conectores, retomadas ou outras ligações claras entre frases e parágrafos.",notEnough:"Ex.: iniciar cada frase como uma ideia nova, sem qualquer ligação linguística à anterior."},
  "PT639-FND-012:coerencia-3":{counts:"Ex.: dar a cada parágrafo uma função reconhecível — apresentar, desenvolver, exemplificar ou concluir uma ideia.",notEnough:"Ex.: partir o texto em parágrafos apenas por tamanho, sem organização funcional."},
  "PT639-FND-012:argumentacao-1":{counts:"Ex.: declarar de forma inequívoca a posição defendida sobre o tema proposto.",notEnough:"Ex.: apresentar vantagens e desvantagens sem nunca dizer que posição é assumida."},
  "PT639-FND-012:argumentacao-2":{counts:"Ex.: desenvolver razões que expliquem por que motivo a posição defendida é sustentável.",notEnough:"Ex.: empilhar afirmações favoráveis à posição sem explicar nenhuma delas."},
  "PT639-FND-012:argumentacao-3":{counts:"Dar um exemplo concreto e explicar como ele reforça a posição sobre privacidade.",notEnough:"Introduzir um exemplo decorativo que não esteja ligado ao argumento."},
  "PT639-FND-012:correcao-linguistica-1":{counts:"Ex.: escolher palavras precisas e adequadas ao registo, evitando termos vagos quando existe formulação mais exata.",notEnough:"Ex.: usar vocabulário formal mas impreciso, que parece sofisticado sem tornar a ideia mais clara."},
  "PT639-FND-012:correcao-linguistica-2":{counts:"Ex.: construir frases completas em que as relações entre sujeito, verbo e restantes constituintes sejam claras.",notEnough:"Ex.: produzir frases longas e aparentemente elaboradas cuja estrutura dificulta perceber a ideia principal."},
  "PT639-FND-012:correcao-linguistica-3":{counts:"Ex.: manter a ortografia suficientemente correta para que os erros não distraiam nem alterem o sentido.",notEnough:"Ex.: ter conteúdo pertinente mas acumular erros ortográficos recorrentes sem os rever."},
  "PT639-FND-012:correcao-linguistica-4":{counts:"Ex.: usar a pontuação para separar e relacionar ideias de forma funcional.",notEnough:"Ex.: inserir vírgulas e outros sinais apenas por pausa intuitiva, criando relações sintáticas erradas."}
};

export function portugueseObservationGuidance(item,criterion,observation){
  const key=`${item?.id}:${observation?.id}`;
  const specific=SPECIFIC[key];
  if(specific)return {...specific,specific:true,key};
  const generic=GENERIC_GUIDANCE[criterion?.id]||{
    counts:"Evidência explícita, pertinente e suficientemente desenvolvida para satisfazer esta observação.",
    notEnough:"Uma referência vaga, implícita ou apenas formal que não demonstre o elemento pedido."
  };
  return {...generic,specific:false,key};
}
