
import {QUESTION_BANK} from "../data/content.js";
import {
  effectiveEditorialItem,contentRevisionFingerprint
} from "./quality.js";

export const EDITABLE_REVISION_FIELDS=[
  "q","o","a","sol","hyp","cognitive","difficulty"
];

const FIELD_LABELS={
  q:"Enunciado",
  o:"Opções",
  a:"Resposta correta",
  sol:"Resolução",
  hyp:"Hipótese de erro",
  cognitive:"Tipo cognitivo",
  difficulty:"Dificuldade"
};

function cleanText(value){
  return String(value??"").trim();
}

function normalizedOptions(options){
  return (Array.isArray(options)?options:[]).map(x=>cleanText(x));
}

export function revisionCandidateFromItem(item){
  return {
    q:item?.q||"",
    o:[...(item?.o||["","","",""])],
    a:Number.isInteger(item?.a)?item.a:0,
    sol:item?.sol||"",
    hyp:item?.hyp||"",
    cognitive:item?.cognitive||"",
    difficulty:Number(item?.difficulty)||2
  };
}

export function sanitizeRevisionCandidate(candidate={}){
  return {
    q:cleanText(candidate.q),
    o:normalizedOptions(candidate.o),
    a:Number(candidate.a),
    sol:cleanText(candidate.sol),
    hyp:cleanText(candidate.hyp),
    cognitive:cleanText(candidate.cognitive),
    difficulty:Number(candidate.difficulty)
  };
}

export function revisionDiff(item,candidate){
  const next=sanitizeRevisionCandidate(candidate);
  const current=revisionCandidateFromItem(item);
  const diffs=[];

  for(const field of EDITABLE_REVISION_FIELDS){
    const before=field==="o"?JSON.stringify(current[field]):current[field];
    const after=field==="o"?JSON.stringify(next[field]):next[field];
    if(before!==after){
      diffs.push({
        field,
        label:FIELD_LABELS[field],
        before:current[field],
        after:next[field]
      });
    }
  }
  return diffs;
}

export function validateRevisionCandidate(item,candidate){
  const next=sanitizeRevisionCandidate(candidate);
  const errors=[];
  const warnings=[];

  if(!item?.id)errors.push("Questão inexistente.");
  if(!next.q)errors.push("O enunciado não pode ficar vazio.");
  if(next.q.length<10)warnings.push("O novo enunciado é muito curto; confirmar clareza.");

  if(next.o.length!==4)errors.push("A questão deve manter exatamente 4 opções.");
  if(next.o.some(x=>!x))errors.push("Nenhuma das 4 opções pode ficar vazia.");
  if(new Set(next.o).size!==4)errors.push("As 4 opções devem ser distintas.");

  if(!Number.isInteger(next.a)||next.a<0||next.a>3){
    errors.push("A resposta correta tem de apontar para uma das quatro opções.");
  }

  if(!next.sol)errors.push("A resolução não pode ficar vazia.");
  if(!next.hyp)errors.push("A hipótese de erro não pode ficar vazia.");
  if(!next.cognitive)errors.push("O tipo cognitivo não pode ficar vazio.");
  if(!Number.isInteger(next.difficulty)||next.difficulty<1||next.difficulty>5){
    errors.push("A dificuldade interna deve ficar entre D1 e D5.");
  }

  const diff=revisionDiff(item,next);
  if(!diff.length)errors.push("A proposta não altera nenhum campo editorial.");

  return {
    valid:errors.length===0,
    errors,
    warnings,
    diff,
    candidate:next,
    beforeFingerprint:contentRevisionFingerprint(item),
    afterFingerprint:contentRevisionFingerprint({...item,...next})
  };
}

function sourceItem(itemId){
  return QUESTION_BANK.find(q=>q.id===itemId)||null;
}

export function applyContentRevision(overrides,itemId,candidate,{
  editor="Equipa editorial",
  note="Alteração editorial aplicada",
  requestedBy=null,
  at=Date.now()
}={}){
  const source=sourceItem(itemId);
  if(!source)return {ok:false,overrides,errors:["Questão inexistente."]};

  const current=effectiveEditorialItem(source,overrides);
  const validation=validateRevisionCandidate(current,candidate);
  if(!validation.valid){
    return {ok:false,overrides,errors:validation.errors,warnings:validation.warnings,validation};
  }

  const prev=overrides?.[itemId]||{version:1};
  const nextVersion=(prev.version||1)+1;
  const previousPatch=prev.contentPatch||null;
  const previousStatus=prev.status||source.reviewStatus||"prototype";
  const previousFingerprint=contentRevisionFingerprint(current);
  const contentPatch=validation.candidate;
  const revisedItem={...source,...contentPatch};
  const nextFingerprint=contentRevisionFingerprint(revisedItem);

  const revisionRecord={
    id:`rev-${itemId}-${at}`,
    at,
    editor,
    requestedBy:requestedBy||prev.reviewer||null,
    note,
    fromVersion:prev.version||1,
    toVersion:nextVersion,
    fromStatus:previousStatus,
    previousFingerprint,
    nextFingerprint,
    previousPatch,
    contentPatch,
    diff:validation.diff
  };

  const nextOverrides={
    ...(overrides||{}),
    [itemId]:{
      ...prev,
      version:nextVersion,
      status:"pending",
      contentPatch,
      reviewedAt:null,
      // A fingerprint antigo fica no histórico; nunca vale para a nova revisão.
      previousReviewedFingerprint:prev.reviewedFingerprint||prev.previousReviewedFingerprint||null,
      reviewedFingerprint:null,
      reviewer:null,
      reviewChecklist:null,
      reviewSource:"editorial_revision",
      note,
      pendingChangeRequestedBy:requestedBy||prev.reviewer||null,
      revisionHistory:[...(prev.revisionHistory||[]),revisionRecord],
      history:[
        ...(prev.history||[]),
        {
          at,
          decision:"content_revision_applied",
          status:"pending",
          reviewer:editor,
          note,
          version:nextVersion,
          previousFingerprint,
          contentFingerprint:nextFingerprint,
          diffFields:validation.diff.map(x=>x.field)
        }
      ]
    }
  };

  return {
    ok:true,
    overrides:nextOverrides,
    item:revisedItem,
    revision:revisionRecord,
    validation
  };
}

export function revertLastContentRevision(overrides,itemId,{
  editor="Equipa editorial",
  note="Reversão editorial",
  at=Date.now()
}={}){
  const source=sourceItem(itemId);
  const prev=overrides?.[itemId];
  const revisions=prev?.revisionHistory||[];
  const last=revisions.at(-1);
  if(!source||!prev||!last){
    return {ok:false,overrides,reason:"Não existe revisão editorial para reverter."};
  }

  const current=effectiveEditorialItem(source,overrides);
  const nextVersion=(prev.version||1)+1;
  const restoredPatch=last.previousPatch||null;
  const restoredItem=restoredPatch?{...source,...restoredPatch}:source;
  const nextFingerprint=contentRevisionFingerprint(restoredItem);

  const rollback={
    id:`rev-${itemId}-${at}`,
    at,
    editor,
    note,
    kind:"rollback",
    fromVersion:prev.version||1,
    toVersion:nextVersion,
    previousFingerprint:contentRevisionFingerprint(current),
    nextFingerprint,
    previousPatch:prev.contentPatch||null,
    contentPatch:restoredPatch,
    revertedRevisionId:last.id,
    diff:revisionDiff(current,revisionCandidateFromItem(restoredItem))
  };

  const nextItem={
    ...prev,
    version:nextVersion,
    status:"pending",
    contentPatch:restoredPatch,
    reviewedAt:null,
    previousReviewedFingerprint:prev.reviewedFingerprint||prev.previousReviewedFingerprint||null,
    reviewedFingerprint:null,
    reviewer:null,
    reviewChecklist:null,
    reviewSource:"editorial_rollback",
    note,
    revisionHistory:[...revisions,rollback],
    history:[
      ...(prev.history||[]),
      {
        at,
        decision:"content_revision_reverted",
        status:"pending",
        reviewer:editor,
        note,
        version:nextVersion,
        contentFingerprint:nextFingerprint,
        revertedRevisionId:last.id
      }
    ]
  };

  return {
    ok:true,
    overrides:{...overrides,[itemId]:nextItem},
    item:restoredItem,
    revision:rollback
  };
}

export function editorialRevisionSummary(overrides={}){
  const rows=Object.entries(overrides||{})
    .filter(([,ov])=>(ov?.revisionHistory||[]).length>0)
    .map(([itemId,ov])=>({
      itemId,
      versions:ov.version||1,
      revisions:(ov.revisionHistory||[]).length,
      lastRevision:ov.revisionHistory?.at(-1)||null,
      status:ov.status||"prototype",
      hasActivePatch:!!ov.contentPatch
    }));

  return {
    itemsChanged:rows.length,
    revisions:rows.reduce((n,x)=>n+x.revisions,0),
    pending:rows.filter(x=>x.status==="pending").length,
    rows
  };
}
