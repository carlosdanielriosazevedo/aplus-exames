const STOPWORDS=new Set([
  "a","o","as","os","um","uma","uns","umas","de","do","da","dos","das","e","ou","em","no","na","nos","nas",
  "por","para","com","sem","que","se","ao","aos","à","às","como","quando","onde","porque","porquê","mais","menos",
  "muito","muita","muitos","muitas","ser","estar","ter","há","foi","são","é","sendo","cada","entre","este","esta",
  "isto","isso","num","numa","numas","nuns","seu","sua","seus","suas","também","apenas","deve","pode","podem",
  "indica","refere","explica","relaciona","reconhece","conclui","identifica","apresenta","descreve","corretamente"
]);

const SYNONYM_GROUPS=[
  ["fotao","foton","quantum"],
  ["risca","linha","banda","espectral","espectro"],
  ["transicao","salto","mudanca"],
  ["nivel","camada","estado"],
  ["frequencia","comprimento","onda"],
  ["caracteristico","especifico","proprio","unico","assinatura"],
  ["aumentar","aumento","maior","crescer","incrementar","elevar","subir"],
  ["reduzir","reducao","diminuir","menor","baixar","atenuar"],
  ["media","promedio","valor medio"],
  ["dispersao","variabilidade","espalhamento"],
  ["rapidez","velocidade"],
  ["incerteza","erro","precisao","exatidao"],
  ["equivalencia","estequiometrico","estequiometria"],
  ["indicador","colorimetrico","mudanca de cor"],
  ["homogeneizar","misturar","agitar"],
  ["menisco","traco","marca de referencia"],
  ["declive","inclinacao","taxa de variacao"],
  ["area","integral","superficie"],
  ["catalisador","catalise"],
  ["endotermico","endotermica","absorve calor","absorver calor"],
  ["exotermico","exotermica","liberta calor","liberar calor"],
  ["fotografia","foto","imagem","retrato"],
  ["memoria","recordacao","lembranca","passado"],
  ["identidade","quem sou","versao de si","eu passado"],
  ["personificacao","humanizacao","atribuicao humana","caracteristica humana"],
  ["inevitavel","inevitabilidade","continua","continuamente","nao para","nao espera"],
  ["biblioteca","bibliotecas"],
  ["acesso","acessivel","disponibiliza","disponibilidade"],
  ["comunidade","publico","pessoas","populacao"],
  ["desigualdade","inclusao","incluir","igualdade de oportunidades"],
  ["argumento","razao","motivo","justificacao"],
  ["conclusao","concluir","final","fecho"],
  ["estrutura","organizacao","progressao","ordem"],
  ["coerencia","ligacao","articulacao","encadeamento"],
  ["composicao","quantidade relativa","proporcao dos componentes"],
  ["equilibrio","estado de equilibrio"],
  ["dois sentidos","sentido direto e inverso","reacao direta e inversa"],
  ["nao altera","mantem","nao modifica","fica inalterado"],
  ["deslocamento","variacao da posicao"],
  ["distancia","espaco percorrido","comprimento do percurso"],
  ["modulo","valor absoluto"],
  ["repeticao","varias medicoes","medir varias vezes"],
  ["referencial","nivel de referencia","origem de energia"],
  ["aliquota","volume medido"],
  ["pipeta","pipeta volumetrica"],
  ["balao","balao volumetrico"]
];

const SYNONYM_MAP=new Map();
SYNONYM_GROUPS.forEach((group,index)=>group.forEach(term=>SYNONYM_MAP.set(normalizeEvidenceText(term),"g"+index)));

const CONTRADICTION_PAIRS=[
  {anchor:["catalisador","catalise"],forbidden:["altera kc","muda kc","modifica kc","aumenta kc","diminui kc"],expected:["nao altera kc","mantem kc","kc inalterado"]},
  {anchor:["catalisador","catalise"],forbidden:["altera a composicao","muda a composicao","modifica a composicao"],expected:["nao altera a composicao","mantem a composicao","composicao inalterada"]},
  {anchor:["distancia","espaco percorrido"],forbidden:["pode ser negativa","pode ser negativo"],expected:["nao pode ser negativa","sempre positiva","sempre nao negativa"]},
  {anchor:["deslocamento","variacao da posicao"],forbidden:["soma dos modulos","sempre positivo"],expected:["area algebrica","pode ser negativo","variacao da posicao"]}
];

export function normalizeEvidenceText(value){
  return String(value??"")
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLocaleLowerCase("pt-PT")
    .replace(/[^a-z0-9%+\- ]/g," ")
    .replace(/\s+/g," ").trim();
}

function phraseVariants(value){
  const normalized=normalizeEvidenceText(value);
  const variants=new Set([normalized]);
  for(const group of SYNONYM_GROUPS){
    for(const term of group){
      const needle=normalizeEvidenceText(term);
      if(!needle||!normalized.includes(needle))continue;
      for(const replacement of group){
        variants.add(normalized.replaceAll(needle,normalizeEvidenceText(replacement)));
      }
    }
  }
  return [...variants];
}

function stem(token){
  const normalized=normalizeEvidenceText(token);
  if(SYNONYM_MAP.has(normalized))return SYNONYM_MAP.get(normalized);
  if(normalized.length<=4)return normalized;
  return normalized
    .replace(/(mente|coes|cao|sao|dade|ismo|ista|ico|ica|icos|icas|oso|osa|osos|osas|avel|iveis|ivel)$/u,"")
    .replace(/(ando|endo|indo|ado|ada|idos|idas|ido|ida)$/u,"")
    .replace(/(es|s)$/u,"")
    .slice(0,9);
}

function tokens(value){
  return normalizeEvidenceText(value).split(" ").filter(Boolean)
    .filter(token=>token.length>=3&&!STOPWORDS.has(token))
    .map(stem).filter(Boolean);
}

function sentenceRows(value){
  return String(value||"").split(/(?<=[.!?;:])\s+|\n+/u).map(row=>row.trim()).filter(Boolean);
}

function distinctiveCues(texts){
  const all=texts.flatMap(tokens);
  const counts=new Map();
  all.forEach(token=>counts.set(token,(counts.get(token)||0)+1));
  return [...counts.entries()]
    .sort((a,b)=>b[1]-a[1]||b[0].length-a[0].length)
    .map(([token])=>token)
    .slice(0,18);
}

function conceptPhrases(texts){
  const phrases=[];
  for(const text of texts){
    const words=normalizeEvidenceText(text).split(" ").filter(Boolean);
    for(const size of [4,3,2]){
      for(let i=0;i<=words.length-size;i++){
        const phrase=words.slice(i,i+size).join(" ");
        const content=tokens(phrase);
        if(content.length>=2)phrases.push({phrase,content});
      }
    }
  }
  const unique=new Map();
  for(const row of phrases){
    const key=row.content.join("::");
    if(!unique.has(key))unique.set(key,row);
  }
  return [...unique.values()].slice(0,24);
}

function phraseHit(response,row){
  const responseTokens=new Set(tokens(response));
  const overlap=row.content.filter(token=>responseTokens.has(token)).length;
  if(overlap===row.content.length)return 1;
  if(row.content.length>=3&&overlap>=row.content.length-1)return .72;
  return 0;
}

function semanticPhraseScore(response,texts){
  const phrases=conceptPhrases(texts);
  if(!phrases.length)return {score:0,hits:0,total:0};
  const scores=phrases.map(row=>phraseHit(response,row));
  const positive=scores.filter(score=>score>0);
  return {
    score:positive.length?positive.reduce((sum,value)=>sum+value,0)/Math.min(8,phrases.length):0,
    hits:positive.length,
    total:phrases.length
  };
}

function relationScore(response,texts){
  const evidenceTokens=[...new Set(texts.flatMap(tokens))];
  if(evidenceTokens.length<2)return 0;
  let best=0;
  for(const sentence of sentenceRows(response)){
    const set=new Set(tokens(sentence));
    const hits=evidenceTokens.filter(token=>set.has(token)).length;
    const ratio=hits/Math.min(8,evidenceTokens.length);
    if(ratio>best)best=ratio;
  }
  return best;
}

function bestSentence(response,cues){
  const rows=sentenceRows(response);
  let best={text:"",hits:0};
  for(const row of rows){
    const set=new Set(tokens(row));
    const hits=cues.filter(cue=>set.has(cue)).length;
    if(hits>best.hits)best={text:row,hits};
  }
  return best.text;
}

function hasAnyPhrase(text,phrases){
  const normalized=normalizeEvidenceText(text);
  return phrases.some(phrase=>phraseVariants(phrase).some(variant=>normalized.includes(variant)));
}

function contradictionPenalty(response){
  let penalty=0;
  for(const rule of CONTRADICTION_PAIRS){
    if(!hasAnyPhrase(response,rule.anchor))continue;
    if(hasAnyPhrase(response,rule.expected))continue;
    if(hasAnyPhrase(response,rule.forbidden))penalty=Math.max(penalty,.38);
  }
  return penalty;
}

function negationMismatchPenalty(response,texts){
  const expectedNegated=texts.some(text=>/\bnao\b|\bsem\b|\binalterad/u.test(normalizeEvidenceText(text)));
  if(!expectedNegated)return 0;
  const evidenceContent=new Set(texts.flatMap(tokens));
  for(const sentence of sentenceRows(response)){
    const sentenceTokens=tokens(sentence);
    const overlap=sentenceTokens.filter(token=>evidenceContent.has(token)).length;
    if(overlap<2)continue;
    const hasNegation=/\bnao\b|\bsem\b|\binalterad/u.test(normalizeEvidenceText(sentence));
    if(!hasNegation)return .18;
  }
  return 0;
}

export function assessEvidence(response,...evidenceTexts){
  const evidence=evidenceTexts.filter(Boolean);
  const responseTokens=tokens(response);
  const responseSet=new Set(responseTokens);
  const cues=distinctiveCues(evidence);
  const matched=cues.filter(cue=>responseSet.has(cue));
  const lexicalRatio=cues.length?matched.length/cues.length:0;
  const phrase=semanticPhraseScore(response,evidence);
  const relation=relationScore(response,evidence);
  const wordCount=normalizeEvidenceText(response).split(" ").filter(Boolean).length;
  const contradiction=contradictionPenalty(response);
  const negationPenalty=negationMismatchPenalty(response,evidence);
  const semanticScore=Math.max(0,Math.min(1,
    lexicalRatio*.42+
    Math.min(1,phrase.score)*.30+
    Math.min(1,relation)*.28-
    contradiction-
    negationPenalty
  ));

  let status="not-observed";
  if(semanticScore>=.43&&(matched.length>=2||phrase.hits>=1)&&relation>=.22)status="observed";
  else if(semanticScore>=.18||matched.length>=1||phrase.hits>=1)status="partial";

  if(contradiction>=.3&&status==="observed")status="partial";

  const confidence=status==="observed"
    ?Math.min(.96,.62+semanticScore*.34)
    :status==="partial"
      ?Math.min(.82,.46+semanticScore*.42)
      :wordCount>=8?.60:.7;

  return {
    status,
    confidence:Math.round(confidence*100)/100,
    semanticScore:Math.round(semanticScore*100)/100,
    matchedCount:matched.length,
    cueCount:cues.length,
    phraseHits:phrase.hits,
    relationScore:Math.round(relation*100)/100,
    contradictionDetected:contradiction>0,
    evidence:(matched.length||phrase.hits)?bestSentence(response,[...matched,...cues.slice(0,4)]):"",
    matched
  };
}

export function aggregateCriterionAssessment(observations=[]){
  if(!observations.length)return {status:"not-observed",scoreRatio:0,confidence:.5};
  const weights={observed:1,partial:.5,"not-observed":0};
  const scoreRatio=observations.reduce((sum,row)=>sum+(weights[row.status]??0),0)/observations.length;
  const status=scoreRatio>=.8?"observed":scoreRatio>=.25?"partial":"not-observed";
  const confidence=observations.reduce((sum,row)=>sum+(row.confidence||0),0)/observations.length;
  const contradictionDetected=observations.some(row=>row.contradictionDetected);
  return {status,scoreRatio:Math.round(scoreRatio*100)/100,confidence:Math.round(confidence*100)/100,contradictionDetected};
}

export function automaticRubricSummary(criteria=[],maxPoints=0){
  const totalWeight=criteria.reduce((sum,row)=>sum+(Number(row.points)||1),0)||1;
  let points=0,confidenceWeight=0;
  for(const criterion of criteria){
    const weight=Number(criterion.points)||1;
    const ratio=Number.isFinite(criterion.scoreRatio)?criterion.scoreRatio:(criterion.status==="observed"?1:criterion.status==="partial"?.5:0);
    points+=ratio*weight;
    confidenceWeight+=(criterion.confidence||.5)*weight;
  }
  return {
    provisionalPoints:Math.round(points/totalWeight*maxPoints*10)/10,
    maxPoints,
    confidence:Math.round(confidenceWeight/totalWeight*100),
    requiresReview:criteria.some(row=>(row.confidence||0)<.62||row.contradictionDetected)
  };
}
