// Experimental proposition-evidence extraction for seven FQA restricted responses.
// Does NOT grade, suggest points, or authorize any automatic student outcome.
// This is an alternative research representation, independent of keyword scoring.
import {inspectScientificRelations} from "./physicsChemistryShadowRelations.mjs";
const norm=s=>String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const terms=(...r)=>r.map(s=>new RegExp(s,"u"));
const S={
 "FQA-R-ELEM-01":[
  ["electronic-transition",terms("eletr[oõ]es?|niveis?", "transic|salt|passa|mudam")],
  ["emission",terms("foto|luz|radiac|espetro|riscas", "emit|libert|frequenc|energia")],
  ["element-specific",terms("element", "propri|especific|caracteristic|diferent|vari")]
 ],
 "FQA-R-MAT-01":[
  ["aliquot",terms("pipeta|aliquota|material aferido", "solucao.mae|transfer|retir|medir")],
  ["flask",terms("balao|recipiente aferido", "marca|traco|menisco|complet|volume final")],
  ["mixing",terms("homogene|invert|mistur|agit", "solucao|recipiente|balao")]
 ],
 "FQA-R-ENE-01":[
  ["measures",terms("massa|\\bm\\b", "altura|\\bh\\b", "velocidade|\\bv\\b")],
  ["energy-comparison",terms("energi|\\bem\\b", "inici|final|dois pontos|\\ba\\b e \\bb\\b")],
  ["uncertainty",terms("incerteza|erro", "compar|compat|conserv|diferenc")]
 ],
 "FQA-R-MEC-01":[
  ["acceleration-slope",terms("aceler|\\ba\\b", "declive|taxa de variac|\\bdv\\b")],
  ["signed-displacement",terms("desloc|\\bdx\\b", "area|integral|\\bint\\b")],
  ["distance",terms("distancia|percurso", "modulo|absolut|sinal")]
 ],
 "FQA-R-WAV-01":[
  ["distance",terms("distancia|percurso|\\bd\\b", "aument|maior|mais long|\\bup\\b")],
  ["repetition",terms("repet|varias|\\bn\\b", "medi|media|dispers")],
  ["control",terms("sensor|atras|temperatura|meio", "control|consider|mant")]
 ],
 "FQA-R-EQ-01":[
  ["temperature",terms("aquec|temperatura", "endoterm|absorve calor|endo")],
  ["catalyst-kinetics",terms("catalis|\\bcat\\b", "veloc|rapidez|aceler|direta|inversa")],
  ["constant-unchanged",terms("catalis|\\bcat\\b", "kc|composic|equilibr", "nao|inalter|mantem|igual")]
 ],
 "FQA-R-AQ-01":[
  ["stoichiometry",terms("equival|\\beq\\b", "estequiometr|proporc|razao")],
  ["detection",terms("indicador|curva|ph", "detet|identific|localiz|viragem|inflexao")],
  ["uncertainty",terms("incerteza|erro|\\bdv\\b", "bureta|volume|leitura|menisco|ponto final")]
 ]
};
const expl=/\b(porque|pois|portanto|logo|assim|permite|resulta|corresponde|representa|origina|devido|para|por isso|quando|compar|calcul|obtem|aument|diminu|gera|emit|complet|transfer|control|favorece|diferen|compat|igual|mantem|identific)\w*\b|[=→⇒]/u;
const neg=/\b(nao|nunca|jamais|sem|impossivel)\b/u;
export function extractScientificEvidence(itemId,response){
 const text=norm(response), clauses=text.split(/[.;!?\n]+/u).map(x=>x.trim()).filter(Boolean);
 const legacy=inspectScientificRelations(itemId,response), facets=S[itemId];
 if(!facets)return {itemId,status:"UNSUPPORTED",claims:[],legacyStatus:legacy.status,points:null,score:null,scoringAuthorized:false,reviewRequired:true};
 const claims=facets.map(([id,patterns])=>{
  const witnesses=clauses.map((clause,index)=>({clause,index})).filter(({clause})=>patterns.every(p=>p.test(clause)));
  return {facet:id,mentions:witnesses.map(x=>x.index),linked:witnesses.some(x=>expl.test(x.clause)),
    negated:witnesses.some(x=>neg.test(x.clause)),evidence:witnesses.map(x=>x.clause)};
 });
 // Links are *candidates*, not proof. Negations and legacy contradictions override any optimistic candidate.
 const risk=legacy.instructionAttempt?"INSTRUCTION_ATTEMPT":legacy.contradictions.length?"CONTRADICTION_SIGNAL":
   claims.some(x=>x.negated)?"NEGATION_NEEDS_REVIEW":"NO_OBVIOUS_CONTRADICTION";
 return {itemId,version:"proposition-shadow-v1",status:"RESEARCH_ONLY",risk,legacyStatus:legacy.status,
   claims,linkedFacets:claims.filter(x=>x.linked&&!x.negated).map(x=>x.facet),
   legacyContradictions:legacy.contradictions,
   // Never pass any of this into grading/progress/ranking.
   points:null,score:null,scoringAuthorized:false,reviewRequired:true};
}
