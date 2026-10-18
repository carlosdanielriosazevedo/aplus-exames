const REPLACEMENTS=[
  [/potênciação/giu,"potenciação"],
  [/A derivação e linear relativamente a soma\./giu,"A derivação é linear relativamente à soma."],
  [/E a variação da função por unidade de variação da variavel\./giu,"É a variação da função por unidade de variação da variável."],
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
  [/\bpotencia(?![\p{L}\p{M}])/giu,"potência"],
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
  [/\b(a|o) (valor|resultado) e (igual|equivalente)\b/giu,(_,article,noun,tail)=>`${article} ${noun} é ${tail}`],
  [/\bf e (?=(?:crescente|decrescente|constante|positiva|positivo|negativa|negativo|nula|nulo)\b)/giu,"f é "],
];

const PLURAL_TEM=/\b(os valores|as funções|os pontos|as retas|os gráficos|as equações|os números|as soluções|os vetores|as matrizes|os acontecimentos|as probabilidades) tem\b/giu;
const FEMININE_A=/\b(relativa|relacionada|associada|correspondente|tangente|perpendicular|paralela|aplicada) a (função|reta|curva|equação|área|situação|posição)\b/giu;


// Palavras portuguesas coladas a números ("de10", "é1,2", "fator1,05", "logo−2^x").
// Variáveis (x1, z2, Q1, A0), siglas (IC95%) e funções (sin45°, log2) não são tocadas.
const NOT_WORDS=new Set(["sin","cos","tan","sen","ln","log","lim","exp","ab","ae","dp","sinx","cosx","tanx"]);
const WORD_BEFORE_NUMBER=/(?<=^|[\s(«"[])(é|a|e|[a-zà-ÿ]{2,}|[A-ZÀ-Ý][a-zà-ÿ]{2,})(?=\d)/gu;
const WORD_BEFORE_MINUS_LETTER=/(?<=^|[\s(«"[])([a-zà-ÿ]{2,})−(?=\p{L})/gu;
const WORD_BEFORE_MINUS_NUMBER=/(?<=^|[\s(«"[])([a-zà-ÿ]{2,})(?=−[\d(])/gu;
const WORD_COLON_NUMBER=/(?<=^|[\s(«"[])([A-ZÀ-Ý]?[a-zà-ÿ]{3,}):(?=\d)/gu;
export function separateWordsFromNumbers(value){
  if(typeof value!=="string")return value;
  return value
    .replace(WORD_BEFORE_NUMBER,(match,word,offset,text)=>{
      if(NOT_WORDS.has(word))return match;
      if(word==="e"&&/\b(vetor|vetores|unitário|versor)\b/iu.test(text))return match;
      return word+" ";
    })
    .replace(WORD_BEFORE_MINUS_LETTER,(match,word)=>NOT_WORDS.has(word)?match:word+" − ")
    .replace(WORD_BEFORE_MINUS_NUMBER,(match,word)=>NOT_WORDS.has(word)?match:word+" ")
    .replace(WORD_COLON_NUMBER,(_,word)=>word+": ");
}

export function mathVisibleText(value){
  if(typeof value!=="string")return value;
  let next=value;
  for(const [pattern,replacement] of REPLACEMENTS)next=next.replace(pattern,replacement);
  for(const [pattern,replacement] of COPULA_REPLACEMENTS)next=next.replace(pattern,replacement);
  next=next.replace(PLURAL_TEM,(_,subject)=>`${subject} têm`);
  next=next.replace(FEMININE_A,(_,lead,noun)=>`${lead} à ${noun}`);
  return separateWordsFromNumbers(next);
}

export function normalizeMathCognitive(value){
  const text=mathVisibleText(value);
  return typeof text==="string"&&text.length?text.charAt(0).toLocaleUpperCase("pt-PT")+text.slice(1):text;
}

const VISIBLE_SCALAR_KEYS=[
  "q","sol","hyp","note","focus","subtopic","prompt","explanation","title","subtitle","label","feedback","hint","text","statement","instruction"
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
