export const RECURRING_ERROR_STALE_DAYS=45;
const DAY=864e5,GENERIC=new Set(["correct_or_near_correct","correct","incorrect","partial_credit","not_verified","needs_review","unknown"]);
const RULES=[
["units",1,["unit","unidade"],"Unidades e grandezas","Tens perdido pontos por não indicar, trocar ou usar incorretamente unidades/grandezas."],
["sign",1,["sign","sinal","algebr"],"Sinais e sentido algébrico","O sinal ou o sentido algébrico tem aparecido como fonte de perda de pontos."],
["rounding",1,["round","arredond","approximate","aproxim"],"Arredondamentos e aproximações","O arredondamento ou o uso de aproximações tem retirado precisão às respostas."],
["final_form",1,["final_form","wrong_final_form","forma final"],"Forma final da resposta","O raciocínio pode estar encaminhado, mas a forma final pedida nem sempre fica respeitada."],
["missing_work",1,["missing_required_work","final_result_only","missing_work"],"Desenvolvimento obrigatório em falta","Tens chegado ao resultado sem mostrar todo o desenvolvimento obrigatório para obter a pontuação completa."],
["justification",0,["justifica","justification","fundament","evidence","evidencia"],"Justificação insuficiente","Nesta matéria, a justificação necessária para sustentar a resposta tem ficado incompleta."],
["instruction",1,["instruction_violation","instruction","instru"],"Cumprimento do pedido","Parte da pontuação tem sido perdida por não cumprir exatamente uma instrução do enunciado."],
["contradiction",1,["contrad","incompat"],"Contradições na resposta","Foram detetadas ideias incompatíveis dentro da mesma resposta."],
["wrong_quantity",0,["wrong_quantity","grandeza errada"],"Grandeza ou relação escolhida","Tens aplicado uma expressão ou relação a uma grandeza diferente da que o problema pede."],
["calculation",0,["calculation_error","calculo"],"Execução do cálculo","Há um padrão de erros na execução de cálculos depois de o método já estar escolhido."],
["conceptual",0,["conceptual_error","concept","conceit"],"Conceito científico/matemático","A mesma dificuldade conceptual voltou a aparecer nesta área."]];
const norm=v=>String(v??"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9_ -]/g," "),uniq=a=>[...new Set(a.filter(Boolean))];
const scope=(item,global)=>global?"subject":item?.competencyId||item?.subtopicId||item?.domain||item?.themeId||"general";
function ruleFor(...parts){const h=norm(parts.join(" "));return RULES.find(([, ,terms])=>terms.some(t=>h.includes(norm(t))))}
export function extractErrorSignals(item,result={}){
 if(!result||result.status==="unanswered")return [];
 const c=[result.errorDiagnosis,result.feedbackSummary?.errorDiagnosis,result.diagnosticCard?.errorDiagnosis].filter(Boolean).map(x=>({code:x.code||x.id||x.reason,label:x.label||x.title,message:x.message||x.detail}));
 for(const x of result.steps||result.stepResults||[])if(!["correct","observed"].includes(x?.status)&&x?.correct!==true&&(x?.errorType||x?.reason))c.push({code:x.errorType||x.reason,label:x.label,message:x.lossReason||x.message||x.note});
 for(const x of result.criteria||[])if(!["observed","correct"].includes(x?.status)&&["partial","not-observed","unsure","needs_review","incorrect"].includes(x?.status))c.push({code:`criterion:${x.id||norm(x.label)||"unknown"}`,label:x.label||x.title||"Critério da resposta",message:x.lossReason||x.feedback||x.message||x.note});
 const out=new Map();for(const x of c){const raw=norm(x.code);if(!raw||GENERIC.has(raw))continue;const r=ruleFor(raw,x.label,x.message),id=r?.[0]||raw.replace(/\s+/g,"_"),sc=scope(item,r?.[1]),key=`${sc}|${id}`;if(!out.has(key))out.set(key,{key,code:id,scope:sc,label:r?.[3]||x.label||"Aspeto a melhorar",message:x.message||r?.[4]||"Este aspeto voltou a retirar pontuação à resposta.",itemId:item?.id||null,domain:item?.domain||item?.themeId||null,competencyId:item?.competencyId||null,subtopicId:item?.subtopicId||null})}return [...out.values()];
}
export function normalizeErrorPatterns(p={}){if(!p||typeof p!=="object"||Array.isArray(p))return {};return Object.fromEntries(Object.entries(p).map(([key,x])=>[key,{...x,key,code:x?.code||key.split("|").at(-1),scope:x?.scope||key.split("|")[0]||"general",label:x?.label||"Aspeto a melhorar",message:x?.message||"Este aspeto tem aparecido mais do que uma vez.",count:+x?.count||0,firstAt:x?.firstAt||null,lastAt:x?.lastAt||null,itemIds:uniq(Array.isArray(x?.itemIds)?x.itemIds:[]).slice(-12),recoveryEvidence:+x?.recoveryEvidence||0,status:x?.status||"observed"}]))}
const matches=(p,item)=>p.scope==="subject"||p.scope===scope(item,0);
const success=r=>r?.correct===true||(!r?.requiresReview&&!r?.reviewRequired&&Number(r?.maxPoints)>0&&(Number.isFinite(r?.provisionalPoints)?r.provisionalPoints:r?.points)/r.maxPoints>=.8);
export function recordErrorPatternEvidence(patterns,item,result,at=Date.now()){
 const next=normalizeErrorPatterns(patterns),signals=extractErrorSignals(item,result),keys=new Set(signals.map(x=>x.key));
 for(const s of signals){const prev=next[s.key]||{...s,count:0,itemIds:[],recoveryEvidence:0,status:"observed",firstAt:at},itemIds=uniq([...prev.itemIds,s.itemId]).slice(-12),count=prev.count+1;next[s.key]={...prev,...s,count,itemIds,firstAt:prev.firstAt||at,lastAt:at,recoveryEvidence:0,status:itemIds.length>=2||count>=3?"recurring":"observed"}}
 if(success(result))for(const [key,p] of Object.entries(next))if(!keys.has(key)&&matches(p,item)&&["recurring","improving"].includes(p.status)){const n=p.recoveryEvidence+1;next[key]={...p,recoveryEvidence:n,status:n>=3?"resolved":n>=2?"improving":p.status}}
 return next;
}
export function recurringErrorPatterns(patterns={},now=Date.now()){return Object.values(normalizeErrorPatterns(patterns)).filter(x=>["recurring","improving"].includes(x.status)&&x.lastAt&&now-x.lastAt<=RECURRING_ERROR_STALE_DAYS*DAY).sort((a,b)=>b.lastAt-a.lastAt||b.count-a.count)}
export function recurringErrorNudge(patterns,item,result,now=Date.now()){const active=recurringErrorPatterns(patterns,now),m=extractErrorSignals(item,result).map(s=>active.find(p=>p.key===s.key)).find(Boolean);return m?{key:m.key,label:m.label,message:m.status==="improving"?"Este padrão já apareceu antes, mas também já mostraste sinais de recuperação. Confirma este ponto nas próximas respostas.":m.message,occurrences:m.count,distinctItems:m.itemIds.length,status:m.status}:null}
