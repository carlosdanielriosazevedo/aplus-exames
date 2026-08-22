
function maxRun(items,keyFn){
  let max=0,current=0,last="__none__";
  for(const item of items){
    const key=String(keyFn(item));
    if(key===last)current+=1;
    else{last=key;current=1}
    if(current>max)max=current;
  }
  return max;
}

function pct(n,d){return d?Math.round(n/d*100):0}

function counts(items,key){
  return items.reduce((acc,x)=>{
    const k=x?.[key]||"unknown";
    acc[k]=(acc[k]||0)+1;
    return acc;
  },{});
}

export function engineAuditSummary(state){
  const history=[...(state?.missionHistory||[])].sort((a,b)=>(a.at||0)-(b.at||0));
  const n=history.length;
  const recent=history.slice(-12);

  const typeCounts=counts(history,"type");
  const sourceCounts=counts(history,"decisionSource");
  const stopCounts=counts(history,"stopCode");

  const maxSameThemeRun=maxRun(history,x=>x.themeId||"none");
  const maxSameTypeRun=maxRun(history,x=>x.type||"unknown");
  const calibrationRate=pct(typeCounts.calibration||0,n);
  const confirmationRate=pct(typeCounts.confirmation||0,n);
  const investigationRate=pct(typeCounts.investigation||0,n);

  const repeatLowInfo=(stopCounts.low_information||0)+(stopCounts.content_exhausted||0);
  const lowInfoRate=pct(repeatLowInfo,n);

  const audited=history.filter(x=>Number.isFinite(x.decisionUtility));
  const margins=audited
    .filter(x=>Array.isArray(x.alternatives) && x.alternatives.length && Number.isFinite(x.alternatives[0]?.utility))
    .map(x=>x.decisionUtility-x.alternatives[0].utility);
  const avgDecisionMargin=margins.length
    ?Math.round(margins.reduce((a,x)=>a+x,0)/margins.length*10)/10
    :null;

  const warnings=[];
  if(n>=4 && maxSameThemeRun>=3){
    warnings.push({
      code:"theme_tunnel",
      severity:maxSameThemeRun>=4?"high":"medium",
      title:"Possível túnel de matéria",
      detail:`Foram registadas ${maxSameThemeRun} Missões consecutivas no mesmo tema.`
    });
  }
  if(n>=8 && calibrationRate>35){
    warnings.push({
      code:"too_much_calibration",
      severity:"medium",
      title:"Calibração a ocupar demasiado espaço",
      detail:`${calibrationRate}% das Missões são de calibração.`
    });
  }
  if(n>=6 && confirmationRate>45){
    warnings.push({
      code:"too_much_confirmation",
      severity:"medium",
      title:"Confirmações demasiado frequentes",
      detail:`${confirmationRate}% das Missões são de confirmação.`
    });
  }
  if(n>=5 && lowInfoRate>25){
    warnings.push({
      code:"content_information_gap",
      severity:"high",
      title:"Banco com pouca diversidade informativa",
      detail:`${lowInfoRate}% das Missões terminaram por falta de evidência suficientemente diferente.`
    });
  }
  if(audited.length>=5 && audited.length/n<.7){
    warnings.push({
      code:"decision_trace_gap",
      severity:"low",
      title:"Decisões sem rasto completo",
      detail:"Parte do histórico não inclui metadados do orquestrador; pode ser histórico anterior à v3.2."
    });
  }

  const recentThemeRun=maxRun(recent,x=>x.themeId||"none");
  if(recent.length>=6 && recentThemeRun>=3 && !warnings.some(w=>w.code==="theme_tunnel")){
    warnings.push({
      code:"recent_theme_tunnel",
      severity:"medium",
      title:"Repetição recente de tema",
      detail:"O padrão recente merece observação, mesmo que o histórico global ainda seja pequeno."
    });
  }

  const status=n<5
    ?"insufficient"
    :warnings.some(w=>w.severity==="high")
      ?"attention"
      :warnings.length
        ?"watch"
        :"healthy";

  return {
    status,missions:n,maxSameThemeRun,maxSameTypeRun,
    calibrationRate,confirmationRate,investigationRate,lowInfoRate,
    avgDecisionMargin,auditedDecisions:audited.length,
    typeCounts,sourceCounts,stopCounts,warnings
  };
}

export function engineAuditLabel(status){
  return {
    insufficient:"Ainda sem dados",
    attention:"Requer atenção",
    watch:"A observar",
    healthy:"Saudável"
  }[status]||"—";
}
