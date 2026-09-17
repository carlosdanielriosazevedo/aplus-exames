const CONTENT_OBSERVATIONS={
  "PT639-FND-005":["Identifica a personificação do relógio.","Relaciona a repetição dos segundos com a passagem inevitável do tempo."],
  "PT639-FND-006":["Explica que a fotografia preserva uma memória.","Relaciona a imagem passada com a identidade atual do sujeito."],
  "PT639-FND-010":["Apresenta uma função social relevante das bibliotecas.","Apresenta uma segunda função social distinta da primeira."],
  "PT639-FND-016":["Explica que a personalização facilita a escolha.","Explica que a personalização pode reduzir a diversidade e a descoberta."],
  "PT639-FND-019":["Relaciona as ações atribuídas à cidade com o desgaste ou o consumo do tempo.","Explica o efeito dessas ações no cansaço coletivo."],
  "PT639-FND-026":["Explica uma vantagem pertinente.","Explica uma segunda vantagem distinta da primeira."],
  "PT639-FND-031":["Explica como a informação breve facilita a visita inicial.","Explica como o aprofundamento posterior estimula uma nova observação."],
  "PT639-FND-035":["Identifica a preservação da aparência exterior.","Contrasta essa aparência com a degradação escondida no interior."],
  "PT639-FND-037":["Identifica a repetição de «Se digo».","Relaciona essa repetição com a associação progressiva entre linguagem, distância e perda."],
  "PT639-FND-038":["Explica uma vantagem adequada ao contexto.","Explica uma segunda vantagem distinta da primeira."],
  "PT639-FND-047":["Explica que a disponibilização de recipientes aumentou a reciclagem.","Distingue esse aumento da separação correta dos resíduos."],
  "PT639-FND-051":["Relaciona o crescimento da árvore com o tempo decorrido desde a partida.","Explica o valor da sombra que já alcança a janela."],
  "PT639-FND-053":["Relaciona a repetição de «Volto» com o regresso aos lugares.","Explica como a quebra final mostra a impossibilidade de recuperar a identidade passada."],
  "PT639-FND-058":["Explica uma vantagem da informação em tempo real.","Explica uma segunda vantagem distinta da primeira."]
};

const SPECIAL_OBSERVATIONS={
  "PT639-FND-042:funcao":["Identifica «na sala» como predicativo do sujeito."],
  "PT639-FND-042:justificacao":["Reconhece «permanecer» como verbo copulativo.","Explica que «na sala» atribui ao sujeito uma localização ou estado locativo."],
  "PT639-FND-054:funcao":["Identifica «representante da turma» como predicativo do complemento direto."],
  "PT639-FND-054:justificacao":["Identifica «a Beatriz» como complemento direto.","Explica que a expressão lhe atribui uma propriedade ou função."],
  "PT639-FND-012:genero-tema":["Respeita o género de texto solicitado.","Desenvolve o tema sem desvios relevantes."],
  "PT639-FND-012:coerencia":["Organiza as ideias com progressão.","Usa mecanismos de coesão entre frases e parágrafos.","Constrói parágrafos com funções reconhecíveis."],
  "PT639-FND-012:argumentacao":["Apresenta uma posição clara.","Desenvolve argumentos pertinentes.","Inclui pelo menos um exemplo que apoia a posição."],
  "PT639-FND-012:correcao-linguistica":["Usa vocabulário adequado e preciso.","Constrói frases sintaticamente claras.","Respeita a ortografia.","Usa a pontuação de forma funcional."]
};

function genericObservations(item,criterion){
  if(criterion.id==="conteudo")return CONTENT_OBSERVATIONS[item.id]||[criterion.label];
  if(criterion.id==="lingua")return ["Usa vocabulário adequado.","Constrói frases claras.","Evita erros que comprometam o sentido."];
  if(criterion.id==="estrutura")return ["Ordena as ideias com progressão.","Liga as frases com conectores ou outros mecanismos de coesão.","Fecha a resposta de forma coerente com o desenvolvimento."];
  if(criterion.id==="fundamentacao")return ["Apresenta uma razão, exemplo ou elemento concreto pertinente.","Liga esse elemento à interpretação ou posição defendida."];
  if(criterion.id==="argumentacao"){
    const observations=["Formula uma posição clara.","Desenvolve razões pertinentes que sustentam a posição."];
    if(/dois argumentos/i.test(criterion.label))observations.push("Apresenta dois argumentos distintos.");
    if(/objeção/i.test(criterion.label))observations.push("Considera uma objeção relevante.");
    return observations;
  }
  if(criterion.id==="posicao")return ["Formula uma posição clara.","Mantém o desenvolvimento centrado no tema e nos valores em discussão."];
  if(criterion.id==="discurso")return ["Apresenta uma explicação coerente.","Apoia diretamente a explicação em elementos do excerto."];
  if(criterion.id==="forma")return ["Identifica o recurso formal pedido.","Explica o efeito desse recurso na construção do sentido."];
  return [criterion.label];
}

export function applyPortugueseRubricObservations(items){
  return items.map(item=>item.rubric?{...item,rubric:{...item.rubric,criteria:item.rubric.criteria.map(criterion=>{
    const labels=SPECIAL_OBSERVATIONS[`${item.id}:${criterion.id}`]||genericObservations(item,criterion);
    return {...criterion,observations:labels.map((label,index)=>({id:`${criterion.id}-${index+1}`,label}))};
  })}}:item);
}
