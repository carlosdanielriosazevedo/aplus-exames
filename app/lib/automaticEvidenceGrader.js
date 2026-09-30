const STOPWORDS=new Set([
  "a","o","as","os","um","uma","uns","umas","de","do","da","dos","das","e","ou","em","no","na","nos","nas",
  "por","para","com","sem","que","se","ao","aos","à","às","como","quando","onde","porque","porquê","mais","menos",
  "muito","muita","muitos","muitas","ser","estar","ter","há","foi","são","é","sendo","cada","entre","este","esta",
  "isto","isso","num","numa","numas","nuns","seu","sua","seus","suas","também","apenas","deve","pode","podem",
  "indica","refere","explica","relaciona","reconhece","conclui","identifica","apresenta","descreve","corretamente"
]);

const SYNONYM_GROUPS=[
  ["fotao","foton","quantum"],
  ["risca","linha","espectral","espectro"],
  ["transicao","salto"],
  ["nivel","camada"],
  ["frequencia","comprimento","onda"],
  ["caracteristico","especifico","proprio","unico"],
  ["aumentar","aumento","maior","crescer","incrementar"],
  ["reduzir","reducao","diminuir","menor"],
  ["media","promedio"],
  ["dispersao","variabilidade"],
  ["rapidez","velocidade"],
  ["incerteza","erro","precisao"],
  ["equivalencia","estequiometrico","estequiometria"],
  ["indicador","colorimetrico"],
  ["homogeneizar","misturar","agitar"],
  ["menisco","traço","traco"],
  ["declive","inclinacao"],
  ["area","integral"],
  ["catalisador","catalise"],
  ["endotermico","endotermica"],
  ["exotermico","exotermica"],
  ["fotografia","foto","imagem"],
  ["memoria","recordacao","lembranca"],
  ["identidade","quem","sou"],
  ["personificacao","humanizacao"],
  ["inevitavel","inevitabilidade","continua","continuamente"],
  ["biblioteca","bibliotecas"],
  ["acesso","acessivel","disponibiliza"],
  ["comunidade","publico","pessoas"],
  ["desigualdade","inclusao","incluir"],
  ["argumento","razao","motivo"],
  ["conclusao","concluir","final"],
  ["estrutura","organizacao","progressao"],
  ["coerencia","ligacao","articulacao"]
];

const SYNONYM_MAP=new Map();
SYNONYM_GROUPS.forEach((group,index)=>group.forEach(term=>SYNONYM_MAP.set(term,"g"+index)));

export function normalizeEvidenceText(value){
  return String(value??"")
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLocaleLowerCase("pt-PT")
    .replace(/[^a-z0-9%+\- ]/g," ")
    .replace(/\s+/g," ").trim();
}

function stem(token){
  const normalized=normalizeEvidenceText(token);
  if(SYNONYM_MAP.has(normalized))return SYNONYM_MAP.get(normalized);
  if(normalized.length<=4)return normalized;
  return normalized
    .replace(/(mente|coes|cao|sao|ico|ica|icos|icas|oso|osa|osos|osas)$/u,"")
    .replace(/(es|s)$/u,"")
    .slice(0,8);
}

function tokens(value){
  return normalizeEvidenceText(value).split(" ").filter(Boolean)
    .filter(token=>token.length>=3&&!STOPWORDS.has(token))
    .map(stem).filter(Boolean);
}

function distinctiveCues(texts){
  const all=texts.flatMap(tokens);
  const counts=new Map();
  all.forEach(token=>counts.set(token,(counts.get(token)||0)+1));
  return [...counts.entries()]
    .sort((a,b)=>b[1]-a[1]||b[0].length-a[0].length)
    .map(([token])=>token)
    .slice(0,14);
}

function bestSentence(response,cues){
  const rows=String(response||"").split(/(?<=[.!?;])\s+|\n+/u).map(row=>row.trim()).filter(Boolean);
  let best={text:"",hits:0};
  for(const row of rows){
    const set=new Set(tokens(row));
    const hits=cues.filter(cue=>set.has(cue)).length;
    if(hits>best.hits)best={text:row,hits};
  }
  return best.text;
}

export function assessEvidence(response,...evidenceTexts){
  const responseTokens=tokens(response);
  const responseSet=new Set(responseTokens);
  const cues=distinctiveCues(evidenceTexts.filter(Boolean));
  const matched=cues.filter(cue=>responseSet.has(cue));
  const ratio=cues.length?matched.length/cues.length:0;
  const wordCount=normalizeEvidenceText(response).split(" ").filter(Boolean).length;

  let status="not-observed";
  if((matched.length>=3&&ratio>=.34)||(matched.length>=2&&ratio>=.5))status="observed";
  else if(matched.length>=1)status="partial";

  const confidence=status==="observed"
    ?Math.min(.96,.58+ratio*.5)
    :status==="partial"
      ?Math.min(.78,.42+ratio*.55)
      :wordCount>=8?.56:.68;

  return {
    status,confidence:Math.round(confidence*100)/100,
    matchedCount:matched.length,cueCount:cues.length,
    evidence:matched.length?bestSentence(response,matched):"",
    matched
  };
}

export function aggregateCriterionAssessment(observations=[]){
  if(!observations.length)return {status:"not-observed",scoreRatio:0,confidence:.5};
  const weights={observed:1,partial:.5,"not-observed":0};
  const scoreRatio=observations.reduce((sum,row)=>sum+(weights[row.status]??0),0)/observations.length;
  const status=scoreRatio>=.8?"observed":scoreRatio>=.25?"partial":"not-observed";
  const confidence=observations.reduce((sum,row)=>sum+(row.confidence||0),0)/observations.length;
  return {status,scoreRatio:Math.round(scoreRatio*100)/100,confidence:Math.round(confidence*100)/100};
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
    requiresReview:criteria.some(row=>(row.confidence||0)<.6)
  };
}
