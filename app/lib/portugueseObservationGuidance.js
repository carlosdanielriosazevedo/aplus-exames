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
  "PT639-FND-042:funcao-1":{counts:"Escrever explicitamente que «na sala» é predicativo do sujeito.",notEnough:"Dizer apenas que é uma expressão de lugar ou classificá-la como complemento oblíquo."},
  "PT639-FND-042:justificacao-1":{counts:"Referir que «permanecer» funciona aqui como verbo copulativo.",notEnough:"Dizer apenas que o verbo indica permanência ou localização."},
  "PT639-FND-054:funcao-1":{counts:"Escrever explicitamente que «representante da turma» é predicativo do complemento direto.",notEnough:"Trocar a função com a de «a Beatriz» ou chamar-lhe complemento direto."},
  "PT639-FND-054:justificacao-1":{counts:"Identificar «a Beatriz» como complemento direto de «nomeou».",notEnough:"Dizer apenas que Beatriz é a pessoa de quem se fala."},
  "PT639-FND-012:argumentacao-3":{counts:"Dar um exemplo concreto e explicar como ele reforça a posição sobre privacidade.",notEnough:"Introduzir um exemplo decorativo que não esteja ligado ao argumento."}
};

export function portugueseObservationGuidance(item,criterion,observation){
  const specific=SPECIFIC[`${item?.id}:${observation?.id}`];
  if(specific)return specific;
  const generic=GENERIC_GUIDANCE[criterion?.id]||{
    counts:"Evidência explícita, pertinente e suficientemente desenvolvida para satisfazer esta observação.",
    notEnough:"Uma referência vaga, implícita ou apenas formal que não demonstre o elemento pedido."
  };
  return {...generic};
}
