const REPLACEMENTS=[
  [/\bexpressoes\b/giu,"expressões"],
  [/\bexpressao\b/giu,"expressão"],
  [/\bobtem-se\b/giu,"obtém-se"],
  [/\bfuncoes\b/giu,"funções"],
  [/\bfuncao\b/giu,"função"],
  [/\btaxa media de variacao\b/giu,"taxa média de variação"],
  [/\bmedia\b/giu,"média"],
  [/\bvariacoes\b/giu,"variações"],
  [/\bvariacao\b/giu,"variação"],
  [/\binstantaneas\b/giu,"instantâneas"],
  [/\binstantanea\b/giu,"instantânea"],
  [/\binstantaneo\b/giu,"instantâneo"],
  [/\bnao\b/giu,"não"],
  [/\bareas\b/giu,"áreas"],
  [/\barea\b/giu,"área"],
  [/\bsituacoes\b/giu,"situações"],
  [/\bsituacao\b/giu,"situação"],
  [/\bposicoes\b/giu,"posições"],
  [/\bposicao\b/giu,"posição"],
  [/\bgraficos\b/giu,"gráficos"],
  [/\bgrafico\b/giu,"gráfico"],
  [/\bequacoes\b/giu,"equações"],
  [/\bequacao\b/giu,"equação"],
  [/\bentao\b/giu,"então"],
  [/\bdominio\b/giu,"domínio"],
  [/\bpotencias\b/giu,"potências"],
  [/\bpotencia\b/giu,"potência"],
  [/\btangencia\b/giu,"tangência"],
  [/\bavaliacao\b/giu,"avaliação"],
  [/\bderivacoes\b/giu,"derivações"],
  [/\bderivacao\b/giu,"derivação"],
  [/\bpolinomios\b/giu,"polinómios"],
  [/\binterpretacoes\b/giu,"interpretações"],
  [/\binterpretacao\b/giu,"interpretação"],
  [/\botimizacao\b/giu,"otimização"],
  [/\baproximacao\b/giu,"aproximação"],
  [/\baproximacoes\b/giu,"aproximações"],
  [/\bvalidacao\b/giu,"validação"],
  [/\bsolucoes\b/giu,"soluções"],
  [/\bsolucao\b/giu,"solução"],
  [/\bcomposicao\b/giu,"composição"],
  [/\brepresentacao\b/giu,"representação"],
  [/\brepresentacoes\b/giu,"representações"],
  [/\baplicacoes\b/giu,"aplicações"],
  [/\baplicacao\b/giu,"aplicação"],
  [/\bcompreensao\b/giu,"compreensão"],
  [/\braciocinio\b/giu,"raciocínio"],
  [/\bconclusoes\b/giu,"conclusões"],
  [/\bconclusao\b/giu,"conclusão"],
  [/\bopcoes\b/giu,"opções"],
  [/\bopcao\b/giu,"opção"],
  [/\bdistribuicao\b/giu,"distribuição"],
  [/\bmetodos\b/giu,"métodos"],
  [/\bmetodo\b/giu,"método"],
  [/\bnumeros\b/giu,"números"],
  [/\bnumero\b/giu,"número"],
  [/\bmaximo\b/giu,"máximo"],
  [/\bminimo\b/giu,"mínimo"],
  [/\bangulos\b/giu,"ângulos"],
  [/\bangulo\b/giu,"ângulo"],
  [/\bmodulos\b/giu,"módulos"],
  [/\bmodulo\b/giu,"módulo"],
  [/\bperiodo\b/giu,"período"],
  [/\brazoes\b/giu,"razões"],
  [/\brazao\b/giu,"razão"],
  [/\bproporcao\b/giu,"proporção"],
  [/\bcombinacoes\b/giu,"combinações"],
  [/\bcombinacao\b/giu,"combinação"],
  [/\bpermutacoes\b/giu,"permutações"],
  [/\bpermutacao\b/giu,"permutação"],
  [/\bprogressao\b/giu,"progressão"],
  [/\bregressao\b/giu,"regressão"],
  [/\bcorrelacao\b/giu,"correlação"],
  [/\bestimacao\b/giu,"estimação"],
  [/\bpopulacao\b/giu,"população"],
  [/\bfrequencia\b/giu,"frequência"],
  [/\bvariancia\b/giu,"variância"],
  [/\bpadrao\b/giu,"padrão"],
  [/\bgeometrica\b/giu,"geométrica"],
  [/\banalitica\b/giu,"analítica"],
  [/\bsintetica\b/giu,"sintética"],
  [/\bcirculo\b/giu,"círculo"],
  [/\bdiametro\b/giu,"diâmetro"],
  [/\bvertices\b/giu,"vértices"],
  [/\bvertice\b/giu,"vértice"],
  [/\bparabola\b/giu,"parábola"],
  [/\bassintotas\b/giu,"assíntotas"],
  [/\bassintota\b/giu,"assíntota"],
  [/\bintegracao\b/giu,"integração"],
  [/\bindependencia\b/giu,"independência"]
];

const COPULA_REPLACEMENTS=[
  [/\bQual e\b/gu,"Qual é"],
  [/\bqual e\b/gu,"qual é"],
  [/\bQuanto e\b/gu,"Quanto é"],
  [/\bquanto e\b/gu,"quanto é"],
  [/\bcorreta e\b/giu,"correta é"],
  [/\bcorreto e\b/giu,"correto é"],
  [/\bf e (?=(?:crescente|decrescente|constante|positiva|positivo|negativa|negativo|nula|nulo)\b)/giu,"f é "],
  [/\b(a|o) (velocidade|aceleração|área|função|expressão|reta|curva|sequência|sucessão|probabilidade|solução|posição|taxa|valor|resultado|gráfico|número|módulo) e\b/giu,(_,article,noun)=>`${article} ${noun} é`],
  [/\be (igual|equivalente|dada|dado|definida|definido|representada|representado|crescente|decrescente|constante|positiva|positivo|negativa|negativo|nula|nulo)\b/giu,(_,tail)=>`é ${tail}`]
];

const PLURAL_TEM=/\b(os valores|as funções|os pontos|as retas|os gráficos|as equações|os números|as soluções|os vetores|as matrizes|os acontecimentos|as probabilidades) tem\b/giu;
const FEMININE_A=/\b(relativa|relacionada|associada|correspondente|tangente|perpendicular|paralela|aplicada) a (função|reta|curva|equação|área|situação|posição)\b/giu;

export function mathVisibleText(value){
  if(typeof value!=="string")return value;
  let next=value;
  for(const [pattern,replacement] of REPLACEMENTS)next=next.replace(pattern,replacement);
  for(const [pattern,replacement] of COPULA_REPLACEMENTS)next=next.replace(pattern,replacement);
  next=next.replace(PLURAL_TEM,(_,subject)=>`${subject} têm`);
  next=next.replace(FEMININE_A,(_,lead,noun)=>`${lead} à ${noun}`);
  return next;
}

const VISIBLE_SCALAR_KEYS=[
  "q","sol","focus","subtopic","prompt","explanation","title","subtitle","label","feedback","hint","text","statement","instruction"
];
const VISIBLE_ARRAY_KEYS=["o","options"];

export function normalizeMathVisibleItem(item){
  if(!item||typeof item!=="object")return item;
  const next={...item};
  for(const key of VISIBLE_SCALAR_KEYS){
    if(typeof next[key]==="string")next[key]=mathVisibleText(next[key]);
  }
  for(const key of VISIBLE_ARRAY_KEYS){
    if(Array.isArray(next[key]))next[key]=next[key].map(value=>typeof value==="string"?mathVisibleText(value):value);
  }
  return next;
}

export const MATH_VISIBLE_COPY_KEYS=Object.freeze([...VISIBLE_SCALAR_KEYS,...VISIBLE_ARRAY_KEYS]);
