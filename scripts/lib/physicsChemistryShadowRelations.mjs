// Research-only, offline scientific evidence triage. NEVER use to award points.
// Explicitly conservative: an apparent relation is not a correct answer and
// absence of these patterns is not proof that the answer is wrong.
// Shadow data must not feed student Progress, grading, ranking or Error Memory.
const normalize=value=>String(value??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
  .toLocaleLowerCase("pt-PT").replace(/\s+/gu," ").trim();

const RULES={
  "FQA-R-ELEM-01":{
    relations:[
      ["emission-mechanism",/\b(?:transic(?:ao|oes)|saltos?)\b[^.;]{0,90}\b(?:foto(?:es|ns?)|emit(?:e|em|ir)|radiacao|energia)\b/u],
      ["element-specificity",/\b(?:cada elemento|diferentes elementos|elementos diferentes)\b[^.;]{0,85}\b(?:niveis|energias|espectro|padrao|riscas)\b|\b(?:espectro|padrao|riscas)\b[^.;]{0,80}\b(?:caracteristic|especific|propri|identific)\w*/u],
      ["photon-frequency",/\b(?:fot(?:ao|oes|on|ons)|radiacao)\b[^.;]{0,70}\b(?:energia|frequencia|comprimento de onda)\b|\b(?:energia|frequencia)\b[^.;]{0,70}\b(?:fot(?:ao|oes|on|ons)|radiacao)\b/u]
    ],
    contradictions:[
      ["same-emission-all-elements",/\b(?:todos|quaisquer)\s+(?:os\s+)?elementos\b[^.;]{0,85}\b(?:mesm[oa]s?|iguais?)\b|\bmesm[oa]s?\b[^.;]{0,60}\b(?:todos|elementos)\b/u],
      ["spectral-lines-mass-only",/\briscas?\b[^.;]{0,50}\b(?:apenas|so)\b[^.;]{0,30}\bmass[ae]\b/u]
    ]
  },
  "FQA-R-MAT-01":{
    relations:[
      ["aliquot",/\b(?:al[ií]quota|solucao.mae)\b[^.;]{0,85}\b(?:pipeta|medir|medida|medem|retira|retirar)\b|\bpipeta\b[^.;]{0,75}\b(?:aliquota|solucao.mae)\b/u],
      ["volumetric-flask",/\bbalao (?:volumetrico|aferido)\b[^.;]{0,85}\b(?:traco|marca|solvente|agua|completa|encher|adicion)\w*/u],
      ["homogenize",/\b(?:homogeneiz|mistur|agit)\w*\b[^.;]{0,60}\b(?:solucao|final|balao)\b|\b(?:solucao|balao)\b[^.;]{0,60}\b(?:homogeneiz|mistur|agit)\w*/u]
    ],
    contradictions:[
      ["overshoot-flask-mark",/\b(?:ultrapassar|exceder|passar)\b[^.;]{0,38}\b(?:traco|marca)\b[^.;]{0,65}\b(?:sem afetar|nao altera|nao muda|irrelevante)\b/u],
      ["no-homogenization",/\b(?:nao|nunca)\b[^.;]{0,18}\b(?:homogeneiz|mistur|agit)\w*/u]
    ]
  },
  "FQA-R-ENE-01":{
    relations:[
      ["measure-variables",/\b(?:medir|mediria|medem|regist|determin)\w*\b[^.;]{0,95}\b(?:massa|altura|velocidade)\b/u],
      ["compare-initial-final",/\b(?:energia(?:s)?(?: mecanica)?|em)\b[^.;]{0,80}\b(?:inicial|final|dois pontos)\b[^.;]{0,110}\b(?:compar|calcul|determ)\w*|\b(?:compar|calcul|determ)\w*\b[^.;]{0,90}\benergia\b[^.;]{0,75}\b(?:inicial|final|dois pontos)\b/u],
      ["experimental-uncertainty",/\b(?:incerteza|erro experimental)\b[^.;]{0,80}\b(?:compar|compat|conserv|diferenc|valores)\w*|\b(?:compar|compat|conserv|diferenc)\w*\b[^.;]{0,80}\b(?:incerteza|erro experimental)\b/u]
    ],
    contradictions:[
      ["always-conserved",/\b(?:conserva|conservacao)\w*\b[^.;]{0,45}\b(?:sempre|necessariamente|obrigatoriamente)\b/u],
      ["difference-refutes-within-uncertainty",/\b(?:mesmo dentro|dentro)\b[^.;]{0,42}\bincerteza\b[^.;]{0,75}\b(?:refutada?|impossivel|nao se conserva)\b/u],
      ["mass-height-only",/\b(?:basta|apenas|so)\b[^.;]{0,47}\b(?:massa|altura)\b[^.;]{0,33}\b(?:e|altura)\b/u]
    ]
  },
  "FQA-R-MEC-01":{
    relations:[
      ["slope-acceleration",/\bdeclive\b[^.;]{0,44}\b(?:da|a|representa|corresponde|permite|obtem|aceleracao)\b[^.;]{0,45}\baceleracao\b|\baceleracao\b[^.;]{0,45}\b(?:declive|inclinacao)\b/u],
      ["signed-area-displacement",/\barea\b[^.;]{0,35}\b(?:algebrica|com sinal|assinada)\b[^.;]{0,75}\bdeslocamento\b|\barea algebrica\b[^.;]{0,66}\bdeslocamento\b/u],
      ["distance-absolute",/\b(?:distancia|percurso)\b[^.;]{0,60}\b(?:modulos?|absolut|positiv)\w*|\b(?:modulos?|absolut)\w*\b[^.;]{0,70}\bdistancia\b/u]
    ],
    contradictions:[
      ["acceleration-not-slope",/\baceleracao\b[^.;]{0,35}\bnao\b[^.;]{0,25}\bdeclive\b|\bdeclive\b[^.;]{0,35}\bnao\b[^.;]{0,35}\baceleracao\b/u],
      ["area-always-distance",/\barea(?: algebrica)?\b[^.;]{0,45}\b(?:representa|da|fornece|corresponde)\b[^.;]{0,35}\bdistancia(?: total)?\b|\barea\b[^.;]{0,40}\bdistancia total\b/u]
    ]
  },
  "FQA-R-WAV-01":{
    relations:[
      ["longer-distance-relative-error",/\b(?:maior|aumentar|aumentaria|mais longa)\b[^.;]{0,42}\bdistancia\b[^.;]{0,90}\b(?:incerteza|erro|precisao|tempo)\b/u],
      ["repeat-average",/\b(?:repetir|repete|repetiria|varias medicoes)\b[^.;]{0,90}\b(?:media|dispersao|resultados?|medicoes)\b/u],
      ["sensor-delay",/\b(?:atrasos?|sensores?|equipamento|temperatura|condicoes do meio)\b[^.;]{0,90}\b(?:control|estim|consider|mant)\w*|\b(?:control|estim|consider)\w*\b[^.;]{0,80}\b(?:atraso|sensor|temperatura)\b/u]
    ],
    contradictions:[
      ["shorter-distance-less-error",/\b(?:menor|diminuir|encurtar)\b[^.;]{0,40}\bdistancia\b[^.;]{0,65}\b(?:reduz|menor|diminui)\b[^.;]{0,35}\b(?:incerteza|erro)\b|\bdistancia menor\b[^.;]{0,70}\b(?:reduz|menor|diminui)\b[^.;]{0,35}\b(?:incerteza|erro)\b/u],
      ["repeat-unnecessary",/\b(?:nao|nunca|dispensa)\b[^.;]{0,28}\b(?:repetir|repeticoes|varias medicoes)\b/u]
    ]
  },
  "FQA-R-EQ-01":{
    relations:[
      ["heat-endothermic",/\b(?:aquec|temperatura)\w*\b[^.;]{0,85}\b(?:endotermic|sentido que absorve calor)\w*|\b(?:endotermic)\w*\b[^.;]{0,70}\b(?:temperatura|aquec)\w*/u],
      ["catalyst-rate-both",/\bcatalisador\b[^.;]{0,80}\b(?:aceler|rapidez|velocidade|dois sentidos|direta e inversa)\w*|\b(?:aceler)\w*\b[^.;]{0,70}\b(?:sentidos|catalisador)\b/u],
      ["catalyst-not-equilibrium-constant",/\bcatalisador\b[^.;]{0,85}\b(?:nao muda|nao altera|nao modifica|inalterad|mantem)\w*[^.;]{0,45}\b(?:kc|composicao|equilibrio)\b|\b(?:kc|composicao)\b[^.;]{0,70}\b(?:nao muda|nao altera|inalterad)\w*/u]
    ],
    contradictions:[
      ["catalyst-changes-kc",/\bcatalisador\b[^.;]{0,78}\b(?:aumenta|diminui|altera|modifica|muda)\b[^.;]{0,39}\bkc\b|\bkc\b[^.;]{0,70}\b(?:aumenta|diminui|altera)\b/u],
      ["heat-favors-exothermic",/\b(?:aquec|aumento da temperatura)\w*\b[^.;]{0,82}\b(?:favorece|privilegia|desloca)\b[^.;]{0,45}\bexotermic\w*/u]
    ]
  },
  "FQA-R-AQ-01":{
    relations:[
      ["equivalence-stoichiometry",/\b(?:equivalencia|estequiometr)\w*\b[^.;]{0,80}\b(?:proporcao|razao|estequiometr|quantidades)\w*|\bproporcao estequiometrica\b[^.;]{0,60}\bequivalencia\b|\bproporcao estequiometrica\b/u],
      ["indicator-or-ph-curve",/\b(?:indicador|curva(?: de)? ph)\b[^.;]{0,72}\b(?:equivalencia|detet|identific|localiz|viragem)\w*|\b(?:equivalencia|detet\w*|identific\w*|localiz\w*|ver.se)\b[^.;]{0,72}\b(?:indicador|curva(?: de)? ph)\b/u],
      ["volume-uncertainty",/\b(?:leitura|volume|menisco|ponto final)\b[^.;]{0,70}\b(?:incerteza|erro|imprecis|afet)\w*|\b(?:incerteza|erro)\b[^.;]{0,70}\b(?:volume|menisco|ponto final)\b/u]
    ],
    contradictions:[
      ["ph-seven-universal",/\bph\b[^.;]{0,50}\b(?:sempre|necessariamente|obrigatoriamente)\b[^.;]{0,16}\b7\b|\bph\b[^.;]{0,14}\b7\b[^.;]{0,45}\b(?:sempre|necessariamente|obrigatoriamente)\b|\b(?:sempre|necessariamente|obrigatoriamente)\b[^.;]{0,65}\bph\b[^.;]{0,16}\b7\b/u],
      ["indicator-no-use",/\b(?:indicador|curva de ph)\b[^.;]{0,35}\b(?:nao serve|inutil|nunca se usa)\b/u]
    ]
  }
};

const correction=/(?:^|[.!?;]|\s)\b(?:corrigindo|retifico|retificando|pensando melhor|na verdade|ou melhor)\s*:?\s*/gu;

export function inspectScientificRelations(itemId,response){
  const raw=normalize(response);
  // A final explicit self-correction may supersede a demonstrably false
  // initial proposal. This is a heuristic flag, NOT a correctness certificate.
  let focus=raw,corrected=false;
  for(const match of raw.matchAll(correction)){
    const proposed=raw.slice((match.index??0)+match[0].length).trim();
    if(proposed.length>=18){focus=proposed;corrected=true}
  }
  const rules=RULES[itemId];
  if(!rules)return {
    itemId,version:"shadow-v1",reviewRequired:true,score:null,
    status:"unsupported-item",relations:[],contradictions:[],corrected:false
  };
  const contradictions=rules.contradictions.filter(([id,pattern])=>{
    if(!pattern.test(focus))return false;
    // A sentence saying "não altera Kc" must not be treated as "altera Kc".
    if(id==="catalyst-changes-kc"&&/\b(?:nao|nem|sem)\s+(?:se\s+)?(?:altera|muda|modifica|aumenta|diminui)\b[^.;]{0,25}\bkc\b/u.test(focus)
      &&!/\b(?:aumenta|diminui)\b[^.;]{0,20}\bkc\b/u.test(focus))return false;
    if(id==="ph-seven-universal"&&/\b(?:nao|nem)\b[^.;]{0,26}\b(?:sempre|necessariamente)\b[^.;]{0,25}\b(?:ph|7)\b/u.test(focus))return false;
    return true;
  }).map(([id])=>id);
  const relations=rules.relations.filter(([,pattern])=>pattern.test(focus)).map(([id])=>id);
  const hasExplanation=/(?:->|=>|→|=|\b(?:porque|pois|logo|portanto|permite|resulta|corresponde|representa|explica|devido|faz|emite|indica|favorece|altera|sem alterar|mede|calcula|compar|necessari|reduz|acelera|associa|mostra|pela|atraves)\w*\b)/u.test(focus);
  return {
    itemId,version:"shadow-v1",status:contradictions.length?"contradiction-signals":
      relations.length>=2&&hasExplanation?"candidate-relations":"insufficient-evidence",
    relations:hasExplanation?relations:[],contradictions,corrected,
    reviewRequired:true,score:null,points:null,
    // A "candidate" must NEVER automatically become an awarded point.
    scoringAuthorized:false
  };
}

export const SHADOW_FQA_ITEM_IDS=Object.freeze(Object.keys(RULES));
