const REPLACEMENTS=[
  [/\bexpressoes\b/giu,"expressões"],
  [/\bexpressao\b/giu,"expressão"],
  [/\bobtem-se\b/giu,"obtém-se"],
  [/\bfuncoes\b/giu,"funções"],
  [/\bfuncao\b/giu,"função"],
  [/\btaxa media de variacao\b/giu,"taxa média de variação"],
  [/\bvariacoes\b/giu,"variações"],
  [/\bvariacao\b/giu,"variação"],
  [/\binstantaneas\b/giu,"instantâneas"],
  [/\binstantanea\b/giu,"instantânea"],
  [/\binstantaneo\b/giu,"instantâneo"],
  [/\bnao\b/giu,"não"],
  [/\bsituacoes\b/giu,"situações"],
  [/\bsituacao\b/giu,"situação"],
  [/\bposicoes\b/giu,"posições"],
  [/\bposicao\b/giu,"posição"],
  [/\bgraficos\b/giu,"gráficos"],
  [/\bgrafico\b/giu,"gráfico"],
  [/\bequacoes\b/giu,"equações"],
  [/\bequacao\b/giu,"equação"],
  [/\bareas\b/giu,"áreas"],
  [/\barea\b/giu,"área"],
  [/\bentao\b/giu,"então"],
  [/\bdominio\b/giu,"domínio"],
  [/\bpotencias\b/giu,"potências"],
  [/\bpotencia\b/giu,"potência"],
  [/\btangencia\b/giu,"tangência"],
  [/\bavaliacao\b/giu,"avaliação"],
  [/\bderivacao\b/giu,"derivação"],
  [/\bpolinomios\b/giu,"polinómios"],
  [/\binterpretacao\b/giu,"interpretação"],
  [/\botimizacao\b/giu,"otimização"],
  [/\baproximacao\b/giu,"aproximação"],
  [/\baproximacoes\b/giu,"aproximações"],
  [/\bvalidacao\b/giu,"validação"],
  [/\bsolucoes\b/giu,"soluções"],
  [/\bcomposicao\b/giu,"composição"],
  [/\brepresentacao\b/giu,"representação"],
  [/\brepresentacoes\b/giu,"representações"],
  [/\baplicacoes\b/giu,"aplicações"],
  [/\binterpretacao\b/giu,"interpretação"],
  [/\bQual e\b/gu,"Qual é"],
  [/\bqual e\b/gu,"qual é"],
  [/\bcorreta e\b/giu,"correta é"],
  [/\bcorreto e\b/giu,"correto é"],
  [/\bf e\b/gu,"f é"],
  [/\barea e\b/giu,"área é"]
];

export function mathVisibleText(value){
  if(typeof value!=="string")return value;
  let next=value;
  for(const [pattern,replacement] of REPLACEMENTS)next=next.replace(pattern,replacement);
  return next;
}

export function normalizeMathVisibleItem(item){
  if(!item||typeof item!=="object")return item;
  return {
    ...item,
    ...(typeof item.q==="string"?{q:mathVisibleText(item.q)}:{}),
    ...(Array.isArray(item.o)?{o:item.o.map(mathVisibleText)}:{}),
    ...(typeof item.sol==="string"?{sol:mathVisibleText(item.sol)}:{}),
    ...(typeof item.prompt==="string"?{prompt:mathVisibleText(item.prompt)}:{}),
    ...(Array.isArray(item.options)?{options:item.options.map(mathVisibleText)}:{}),
    ...(typeof item.explanation==="string"?{explanation:mathVisibleText(item.explanation)}:{}),
    ...(typeof item.title==="string"?{title:mathVisibleText(item.title)}:{}),
    ...(typeof item.subtitle==="string"?{subtitle:mathVisibleText(item.subtitle)}:{}),
    ...(typeof item.label==="string"?{label:mathVisibleText(item.label)}:{})
  };
}
