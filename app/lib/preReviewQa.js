
import {QUESTION_BANK,TAXONOMY,MICROCOMPETENCIES} from "../data/content.js";
import {
  effectiveEditorialItem,contentRevisionFingerprint
} from "./quality.js";

const STOPWORDS=new Set([
  "a","o","as","os","um","uma","uns","umas","de","do","da","dos","das",
  "e","ou","em","no","na","nos","nas","por","para","com","sem","que","qual",
  "quais","se","é","são","ao","aos","à","às","como","considere","considere-se"
]);

function normText(value){
  return String(value??"")
    .normalize("NFKC")
    .toLocaleLowerCase("pt-PT")
    .replace(/[“”"]/g,"")
    .replace(/[−–—]/g,"-")
    .replace(/\s+/g," ")
    .trim();
}

function compact(value){
  return normText(value).replace(/[^\p{L}\p{N}+\-*/^=<>≤≥π√.,()%]/gu,"");
}

function tokens(value){
  return new Set(
    normText(value)
      .replace(/[^\p{L}\p{N}]+/gu," ")
      .split(/\s+/)
      .filter(x=>x.length>1&&!STOPWORDS.has(x))
  );
}

function jaccard(a,b){
  if(!a.size&&!b.size)return 1;
  let inter=0;
  for(const x of a)if(b.has(x))inter++;
  const union=new Set([...a,...b]).size;
  return union?inter/union:0;
}

function optionLengthLeak(item){
  if(!Array.isArray(item.o)||item.o.length!==4||!Number.isInteger(item.a))return false;
  const lengths=item.o.map(x=>normText(x).length);
  const correct=lengths[item.a];
  const others=lengths.filter((_,i)=>i!==item.a);
  const avg=others.reduce((a,b)=>a+b,0)/Math.max(1,others.length);
  return correct>=avg*1.8 && correct-avg>=10;
}

function correctOptionEcho(item){
  if(!Array.isArray(item.o)||!Number.isInteger(item.a))return false;
  const answer=compact(item.o[item.a]);
  const sol=compact(item.sol);
  if(!answer||answer.length<3||!sol)return false;
  return sol===answer;
}

function validContexts(item){
  const allowed=new Set(["diagnostic","mission","training","exam"]);
  return Array.isArray(item.contexts)
    &&item.contexts.length>0
    &&item.contexts.every(x=>allowed.has(x));
}

function qaIssue(severity,code,message,extra={}){
  return {severity,code,message,...extra};
}

export function itemPreReviewQa(item,{
  corpus=QUESTION_BANK,
  overrides={}
}={}){
  const effective=effectiveEditorialItem(item,overrides);
  const issues=[];

  if(!effective?.q?.trim())issues.push(qaIssue("blocker","missing_question","Enunciado em falta."));
  if(!Array.isArray(effective?.o)||effective.o.length!==4){
    issues.push(qaIssue("blocker","option_count","A questão não tem exatamente quatro opções."));
  }else{
    const normalized=effective.o.map(normText);
    if(new Set(normalized).size!==4){
      issues.push(qaIssue("blocker","duplicate_options","Existem opções iguais após normalização."));
    }
    if(effective.o.some(x=>!normText(x))){
      issues.push(qaIssue("blocker","empty_option","Existe uma opção vazia."));
    }
  }

  if(!Number.isInteger(effective?.a)||effective.a<0||effective.a>3){
    issues.push(qaIssue("blocker","invalid_answer_index","Índice da resposta correta inválido."));
  }
  if(!effective?.sol?.trim())issues.push(qaIssue("blocker","missing_solution","Resolução em falta."));
  if(!effective?.hyp?.trim())issues.push(qaIssue("blocker","missing_error_hypothesis","Hipótese de erro em falta."));
  if(!effective?.microcompetencyId||!MICROCOMPETENCIES.some(x=>x.id===effective.microcompetencyId)){
    issues.push(qaIssue("blocker","invalid_microcompetency","Microcompetência estável inexistente."));
  }
  if(!TAXONOMY.some(x=>x.id===effective?.themeId)){
    issues.push(qaIssue("blocker","invalid_theme","Tema inexistente."));
  }
  if(!validContexts(effective)){
    issues.push(qaIssue("blocker","invalid_contexts","Contextos vazios ou desconhecidos."));
  }
  if(!effective?.signature?.trim()){
    issues.push(qaIssue("blocker","missing_signature","Assinatura semântica em falta."));
  }
  if(!effective?.cognitive?.trim()){
    issues.push(qaIssue("blocker","missing_cognitive","Tipo cognitivo em falta."));
  }
  if(!Number.isInteger(Number(effective?.difficulty))||Number(effective.difficulty)<1||Number(effective.difficulty)>5){
    issues.push(qaIssue("blocker","invalid_difficulty","Dificuldade deve estar entre D1 e D5."));
  }

  const sameQuestion=(corpus||[])
    .filter(other=>other.id!==effective.id)
    .map(other=>effectiveEditorialItem(other,overrides))
    .filter(other=>normText(other.q)===normText(effective.q));
  if(sameQuestion.length){
    issues.push(qaIssue(
      "blocker","duplicate_question",
      `Enunciado exatamente repetido em ${sameQuestion.map(x=>x.id).join(", ")}.`,
      {relatedIds:sameQuestion.map(x=>x.id)}
    ));
  }

  const sameSignature=(corpus||[])
    .filter(other=>other.id!==effective.id)
    .map(other=>effectiveEditorialItem(other,overrides))
    .filter(other=>other.signature&&other.signature===effective.signature);
  if(sameSignature.length){
    issues.push(qaIssue(
      "warning","reused_signature",
      `A assinatura semântica também é usada por ${sameSignature.map(x=>x.id).join(", ")}. Confirmar que não conta como evidência independente.`,
      {relatedIds:sameSignature.map(x=>x.id)}
    ));
  }

  const currentTokens=tokens(effective.q);
  const near=(corpus||[])
    .filter(other=>other.id!==effective.id)
    .map(other=>effectiveEditorialItem(other,overrides))
    .filter(other=>other.microcompetencyId===effective.microcompetencyId)
    .map(other=>({other,score:jaccard(currentTokens,tokens(other.q))}))
    .filter(x=>x.score>=0.82)
    .sort((a,b)=>b.score-a.score)
    .slice(0,3);
  if(near.length){
    issues.push(qaIssue(
      "warning","near_duplicate",
      `Enunciado muito semelhante a ${near.map(x=>`${x.other.id} (${Math.round(x.score*100)}%)`).join(", ")}.`,
      {relatedIds:near.map(x=>x.other.id),similarity:near[0].score}
    ));
  }

  if(normText(effective.q).length<18){
    issues.push(qaIssue("warning","short_question","Enunciado muito curto; confirmar que não depende de contexto implícito."));
  }
  if(normText(effective.sol).length<15){
    issues.push(qaIssue("warning","short_solution","Resolução muito curta; confirmar que explica o raciocínio necessário."));
  }
  if(optionLengthLeak(effective)){
    issues.push(qaIssue("warning","answer_length_leak","A opção correta é muito mais longa do que os distratores e pode denunciar a resposta."));
  }
  if(correctOptionEcho(effective)){
    issues.push(qaIssue("warning","solution_echo","A resolução parece repetir apenas a resposta correta, sem explicação adicional."));
  }

  const blockerCount=issues.filter(x=>x.severity==="blocker").length;
  const warningCount=issues.filter(x=>x.severity==="warning").length;
  return {
    itemId:effective.id,
    fingerprint:contentRevisionFingerprint(effective),
    status:blockerCount?"blocked":warningCount?"warning":"clean",
    blockerCount,
    warningCount,
    issues
  };
}

export function answerPositionDistribution(items=QUESTION_BANK,overrides={}){
  const counts=[0,0,0,0];
  for(const source of items||[]){
    const item=effectiveEditorialItem(source,overrides);
    if(Number.isInteger(item?.a)&&item.a>=0&&item.a<4)counts[item.a]++;
  }
  const total=counts.reduce((a,b)=>a+b,0);
  const shares=counts.map(x=>total?x/total:0);
  const max=Math.max(...counts),min=Math.min(...counts);
  return {
    counts,
    shares,
    total,
    maxMinRatio:min?max/min:null,
    balanced:!!total && (max-min)<=Math.max(6,Math.ceil(total*0.10))
  };
}

export function preReviewQaReport({
  items=QUESTION_BANK,
  overrides={}
}={}){
  const rows=(items||[]).map(item=>itemPreReviewQa(item,{corpus:items,overrides}));
  const blockers=rows.filter(x=>x.blockerCount>0);
  const warnings=rows.filter(x=>x.warningCount>0);
  const clean=rows.filter(x=>x.status==="clean");
  const byCode={};

  for(const row of rows){
    for(const issue of row.issues){
      byCode[issue.code]=(byCode[issue.code]||0)+1;
    }
  }

  const answers=answerPositionDistribution(items,overrides);
  const corpusWarnings=[];
  if(!answers.balanced){
    corpusWarnings.push({
      code:"answer_position_bias",
      severity:"warning",
      message:`Distribuição das respostas corretas desequilibrada: ${answers.counts.join("/")}.`
    });
  }

  return {
    schema:"aplus-pre-review-qa-v1",
    total:rows.length,
    clean:clean.length,
    withWarnings:warnings.length,
    blocked:blockers.length,
    rows,
    byCode,
    answerPositions:answers,
    corpusWarnings,
    canExportToProfessor:blockers.length===0
  };
}

export function qaForItemId(itemId,overrides={}){
  const item=QUESTION_BANK.find(x=>x.id===itemId);
  return item?itemPreReviewQa(item,{corpus:QUESTION_BANK,overrides}):null;
}

export function reviewableAfterQa(itemIds,overrides={}){
  const results=(itemIds||[]).map(id=>qaForItemId(id,overrides)).filter(Boolean);
  return {
    allowed:results.filter(x=>x.blockerCount===0).map(x=>x.itemId),
    blocked:results.filter(x=>x.blockerCount>0),
    warnings:results.filter(x=>x.warningCount>0&&x.blockerCount===0)
  };
}
