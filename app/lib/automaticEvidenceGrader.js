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
  ["coerencia","ligacao","articulacao"],
  ["temperatura","calor","aquecimento"],
  ["kc","constante"],
  ["composicao","proporcao","proporcoes"],
  ["manter","mantem","inalterado"],
  ["humano","humana","humanizacao","personificacao"],
  ["rapidez","velocidade","depressa"]
];

const PHRASE_EQUIVALENTS=[
  ["nao altera","concept-nonchange"],
  ["nao modifica","concept-nonchange"],
  ["fica inalterado","concept-nonchange"],
  ["mantem se","concept-nonchange"],
  ["permanece igual","concept-nonchange"],
  ["sentido direto e inverso","concept-two-directions"],
  ["dois sentidos","concept-two-directions"],
  ["quantidades relativas","concept-composition"],
  ["proporcao dos componentes","concept-composition"],
  ["passagem do tempo","concept-time-passing"],
  ["nao para","concept-time-passing"],
  ["nao espera","concept-time-passing"],
  ["comportamento humano","concept-personification"],
  ["tratado como humano","concept-personification"],
  ["varias medicoes","concept-repetition"],
  ["medir varias vezes","concept-repetition"]
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

function semanticNormalize(value){
  let normalized=normalizeEvidenceText(value);
  for(const [phrase,canonical] of PHRASE_EQUIVALENTS){
    normalized=normalized.split(phrase).join(canonical);
  }
  return normalized;
}

function tokens(value){
  return semanticNormalize(value).split(" ").filter(Boolean)
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

function relationScore(response,cues){
  const rows=String(response||"").split(/(?<=[.!?;])\s+|\n+/u).map(row=>row.trim()).filter(Boolean);
  let best=0;
  for(const row of rows){
    const set=new Set(tokens(row));
    const hits=cues.filter(cue=>set.has(cue)).length;
    best=Math.max(best,cues.length?hits/Math.min(cues.length,6):0);
  }
  return best;
}

function contradictionDetected(response){
  const normalized=normalizeEvidenceText(response);
  const catalyst=normalized.includes("catalisador")||normalized.includes("catalise");
  if(catalyst){
    const wrongKc=["aumenta kc","diminui kc","altera kc","muda kc","modifica kc"].some(row=>normalized.includes(row));
    const wrongComposition=["altera a composicao","muda a composicao","modifica a composicao"].some(row=>normalized.includes(row));
    const protectsKc=["nao altera kc","nao modifica kc","kc inalterado","constante mantem se"].some(row=>normalized.includes(row));
    if((wrongKc||wrongComposition)&&!protectsKc)return true;
  }
  return false;
}

export function assessEvidence(response,...evidenceTexts){
  const responseTokens=tokens(response);
  const responseSet=new Set(responseTokens);
  const cues=distinctiveCues(evidenceTexts.filter(Boolean));
  const matched=cues.filter(cue=>responseSet.has(cue));
  const ratio=cues.length?matched.length/cues.length:0;
  const relation=relationScore(response,cues);
  const contradiction=contradictionDetected(response);
  const semanticScore=Math.max(0,Math.min(1,ratio*.72+relation*.28-(contradiction?.36:0)));
  const wordCount=normalizeEvidenceText(response).split(" ").filter(Boolean).length;

  let status="not-observed";
  if((matched.length>=3&&semanticScore>=.32)||(matched.length>=2&&semanticScore>=.44))status="observed";
  else if(matched.length>=1&&semanticScore>=.12)status="partial";
  if(contradiction&&status==="observed")status="partial";

  const confidence=status==="observed"
    ?Math.min(.96,.58+semanticScore*.5)
    :status==="partial"
      ?Math.min(.78,.42+semanticScore*.55)
      :wordCount>=8?.56:.68;

  return {
    status,confidence:Math.round(confidence*100)/100,
    semanticScore:Math.round(semanticScore*100)/100,
    relationScore:Math.round(relation*100)/100,
    contradictionDetected:contradiction,
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
    requiresReview:criteria.some(row=>(row.confidence||0)<.6||row.contradictionDetected)
  };
}
