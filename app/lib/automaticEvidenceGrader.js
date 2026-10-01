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
  ["caracteristico","especifico","proprio","unico","assinatura"],
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
  ["rapidez","velocidade","depressa"],
  ["tese","posicao","opiniao","proposta"],
  ["sustentacao","defesa","defender","defende","fundamentacao","justificacao","justifica"],
  ["beneficio","vantagem","efeito","consequencia"],
  ["anaforica","anafora","retoma","retomar","referencia","referente","antecedente"],
  ["clareza","claro","compreensao","perceber"],
  ["coesao","continuidade","ligacao","articulacao"],
  ["temporal","tempo","momento"],
  ["restritiva","restringe","delimita","limita"]
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
  ["medir varias vezes","concept-repetition"],
  ["emitem radiacao","concept-photon-emission"],
  ["emissao de fotao","concept-photon-emission"],
  ["emissao de um fotao","concept-photon-emission"]
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

function contradictionDetected(response,evidenceTexts=[]){
  const normalized=normalizeEvidenceText(response);
  const expected=normalizeEvidenceText(evidenceTexts.join(" "));
  const catalyst=normalized.includes("catalisador")||normalized.includes("catalise");
  if(catalyst){
    const wrongKc=["aumenta kc","diminui kc","altera kc","muda kc","modifica kc"].some(row=>normalized.includes(row));
    const wrongComposition=["altera a composicao","muda a composicao","modifica a composicao"].some(row=>normalized.includes(row));
    const protectsKc=["nao altera kc","nao modifica kc","kc inalterado","constante mantem se"].some(row=>normalized.includes(row));
    if((wrongKc||wrongComposition)&&!protectsKc)return true;
  }

  if(expected.includes("aceleracao")&&expected.includes("declive")){
    const accelerationAsArea=[
      "aceleracao e igual a area",
      "aceleracao corresponde a area",
      "aceleracao obtem se pela area",
      "aceleracao e dada pela area",
      "aceleracao calcula se pela area"
    ].some(row=>normalized.includes(row));
    if(accelerationAsArea)return true;
  }
  if(expected.includes("deslocamento")&&expected.includes("area")){
    const displacementAsSlope=[
      "deslocamento e igual ao declive",
      "deslocamento corresponde ao declive",
      "deslocamento obtem se pelo declive",
      "deslocamento e dado pelo declive",
      "deslocamento calcula se pelo declive"
    ].some(row=>normalized.includes(row));
    if(displacementAsSlope)return true;
  }
  if(expected.includes("distancia")&&expected.includes("deslocamento")){
    if(normalized.includes("distancia")&&normalized.includes("deslocamento")&&normalized.includes("sempre iguais"))return true;
  }

  if(expected.includes("predicativo do complemento direto")&&normalized.includes("complemento obliquo"))return true;
  if(expected.includes("referencia anaforica")&&normalized.includes("oposicao"))return true;
  if(expected.includes("oracao temporal")&&expected.includes("relativa restritiva")){
    if(normalized.includes("oracao causal")||normalized.includes("oracao completiva"))return true;
  }
  if(expected.includes("relatorio")&&normalized.includes("refere se a leonor"))return true;
  if(expected.includes("sustentacao da tese")&&(normalized.includes("enfraquecem a posicao")||normalized.includes("enfraquecem a tese")))return true;

  if(expected.includes("clareza")&&expected.includes("organiz")){
    if(normalized.includes("ordem")&&normalized.includes("nao influencia")&&normalized.includes("clareza"))return true;
  }
  if((expected.includes("tese")||expected.includes("posicao"))&&(expected.includes("sustent")||expected.includes("defesa"))){
    if(normalized.includes("razoes")&&(normalized.includes("nao sustentam")||normalized.includes("enfraquecem")))return true;
  }
  if(expected.includes("consequencia")&&normalized.includes("por isso")&&normalized.includes("oposicao"))return true;
  if(expected.includes("padrao")&&expected.includes("elemento")){
    if((normalized.includes("frequencias")||normalized.includes("riscas"))&&normalized.includes("iguais")&&(normalized.includes("nao permite")||normalized.includes("nao permitem")))return true;
  }
  if(expected.includes("traco")||expected.includes("menisco")){
    if(normalized.includes("ultrapassar")&&normalized.includes("traco"))return true;
  }
  if(expected.includes("homogene")){
    if(normalized.includes("nao e necessario homogeneizar")||normalized.includes("nao e preciso homogeneizar"))return true;
  }
  if(expected.includes("incerteza experimental")){
    if(normalized.includes("incerteza")&&(normalized.includes("deve ser ignorada")||normalized.includes("deve ignorar")))return true;
  }
  if(expected.includes("aumentar a distancia")||expected.includes("distancia de propagacao")){
    if((normalized.includes("menor distancia")||normalized.includes("diminuir a distancia"))&&normalized.includes("incerteza"))return true;
  }
  if(expected.includes("proporcao estequiometrica")||expected.includes("equivalencia")){
    if(normalized.includes("sempre")&&normalized.includes("ph 7"))return true;
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
  const contradiction=contradictionDetected(response,evidenceTexts.filter(Boolean));
  const semanticScore=Math.max(0,Math.min(1,ratio*.72+relation*.28-(contradiction?.36:0)));
  const wordCount=normalizeEvidenceText(response).split(" ").filter(Boolean).length;

  const uniqueContentTokens=new Set(responseTokens).size;
  const normalizedResponse=normalizeEvidenceText(response);
  const relationMarkers=["porque","por isso","logo","assim","quando","como","que","mas","porem","contudo","embora","permite","evita","resulta","corresponde","indica","mostra","favorece","altera","mantem","aumenta","diminui","retoma","atribui","liga","mede","calcula","compara","transfere","completa","homogeneiza"];
  const coherentProse=relationMarkers.some(marker=>normalizedResponse.split(" ").includes(marker))||/[.!?;:]/u.test(String(response||""));
  const substantiveResponse=wordCount>=8&&uniqueContentTokens>=5&&coherentProse;
  let status="not-observed";
  if(substantiveResponse&&((matched.length>=3&&semanticScore>=.32)||(matched.length>=2&&semanticScore>=.44)))status="observed";
  else if(matched.length>=1&&semanticScore>=.12)status="partial";
  if(contradiction&&status==="observed")status="partial";

  const confidence=status==="observed"
    ?Math.min(.96,.58+semanticScore*.5)
    :status==="partial"
      ?Math.min(.78,.42+semanticScore*.55)
      :wordCount>=8?.56:.68;
  let scoreRatio=status==="observed"
    ?Math.min(1,.62+semanticScore*.38)
    :status==="partial"
      ?Math.min(.58,.2+semanticScore*.5)
      :0;
  if(!coherentProse)scoreRatio=Math.min(scoreRatio,.35);
  if(contradiction)scoreRatio=Math.min(scoreRatio,.35);

  return {
    status,confidence:Math.round(confidence*100)/100,
    scoreRatio:Math.round(scoreRatio*100)/100,
    semanticScore:Math.round(semanticScore*100)/100,
    relationScore:Math.round(relation*100)/100,
    contradictionDetected:contradiction,
    substantiveResponse,coherentProse,
    matchedCount:matched.length,cueCount:cues.length,
    evidence:matched.length?bestSentence(response,matched):"",
    matched
  };
}

export function aggregateCriterionAssessment(observations=[]){
  if(!observations.length)return {status:"not-observed",scoreRatio:0,confidence:.5};
  const weights={observed:1,partial:.5,"not-observed":0};
  const rawScoreRatio=observations.reduce((sum,row)=>sum+(Number.isFinite(row.scoreRatio)?row.scoreRatio:(weights[row.status]??0)),0)/observations.length;
  const contradictionDetected=observations.some(row=>row.contradictionDetected);
  const scoreRatio=contradictionDetected?Math.min(rawScoreRatio,.35):rawScoreRatio;
  const status=contradictionDetected?"partial"
    :observations.every(row=>row.status==="observed")?"observed"
      :observations.some(row=>row.status==="observed"||row.status==="partial")?"partial"
      :"not-observed";
  const confidence=observations.reduce((sum,row)=>sum+(row.confidence||0),0)/observations.length;
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
  const contradictionDetected=criteria.some(row=>row.contradictionDetected);
  const rawProvisional=points/totalWeight*maxPoints;
  const provisionalPoints=contradictionDetected?Math.min(rawProvisional,maxPoints*.6):rawProvisional;
  return {
    provisionalPoints:Math.round(provisionalPoints*10)/10,
    maxPoints,
    confidence:Math.round(confidenceWeight/totalWeight*100),
    requiresReview:criteria.some(row=>(row.confidence||0)<.6||row.contradictionDetected),
    contradictionDetected
  };
}

export function automaticFeedbackForCriteria(criteria=[],responseText=""){
  const strengths=[];
  const gaps=[];
  const contradictions=[];
  for(const criterion of criteria){
    const evidence=(criterion.observations||[])
      .flatMap(row=>Array.isArray(row.studentEvidence)?row.studentEvidence:[])
      .map(row=>String(row||"").trim())
      .filter(Boolean);
    const base={id:criterion.id,label:criterion.label,evidence:evidence[0]||"",confidence:criterion.confidence??null};
    if(criterion.contradictionDetected){
      contradictions.push({...base,message:"A resposta contém uma ideia que entra em conflito com este critério."});
      gaps.push({...base,message:"Revê este ponto: a formulação atual pode estar cientificamente ou conceptualmente incorreta."});
      continue;
    }
    if(criterion.status==="observed"){
      strengths.push({...base,message:evidence[0]?"A app encontrou evidência deste critério na tua resposta.":"Este critério está suficientemente demonstrado."});
    }else if(criterion.status==="partial"){
      gaps.push({...base,message:"A ideia aparece, mas falta torná-la mais explícita, completa ou bem ligada ao pedido."});
    }else{
      gaps.push({...base,message:"Este elemento ainda não foi encontrado com evidência suficiente na tua resposta."});
    }
  }
  const foundCount=strengths.length;
  const gapCount=gaps.length;
  const nextAction=contradictions.length
    ?"Revê primeiro esta ideia na matéria: há uma contradição que deves conseguir evitar numa próxima questão."
    :gapCount
      ?(gapCount===1?"Revê o ponto em falta e procura demonstrá-lo melhor numa próxima questão.":"Revê os pontos em falta e procura demonstrá-los melhor nas próximas questões.")
      :"A resposta cobre os critérios principais. Revê apenas clareza, precisão e linguagem.";
  return {
    strengths,gaps,contradictions,
    foundCount,gapCount,
    nextAction,
    hasEvidence:strengths.some(row=>row.evidence)||gaps.some(row=>row.evidence),
    responseText:String(responseText||"")
  };
}
