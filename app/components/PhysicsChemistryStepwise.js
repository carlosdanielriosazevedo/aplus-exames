"use client";

function rowFor(value,stepId){
  const raw=value?.steps?.[stepId];
  if(raw&&typeof raw==="object")return {work:raw.work||"",result:raw.result??raw.value??"",unit:raw.unit||""};
  return {work:"",result:raw??"",unit:""};
}

export function PhysicsChemistryStepwiseEditor({item,value,onChange,disabled=false}){
  function update(stepId,patch){
    const current=rowFor(value,stepId);
    onChange({
      ...(value&&typeof value==="object"?value:{}),
      steps:{...(value?.steps||{}),[stepId]:{...current,...patch}}
    });
  }
  return <div className="fqaStepwise">
    <div className="notice fqaConstructedIntro"><div><b>Resposta construída por etapas</b><span>Mostra o processo. No exame, apresentar apenas o resultado final pode não ser suficiente para obter pontuação.</span></div><strong>{item.steps.length+" etapas"}</strong></div>
    {item.steps.map((step,index)=>{
      const row=rowFor(value,step.id);
      return <section className="fqaStep" key={step.id}>
        <header className="fqaStepHead"><span>{String(index+1).padStart(2,"0")}</span><div><b>{step.label}</b><small>{step.type==="numeric"?"Escreve a relação/processo e depois o resultado.":"Explicita a relação ou expressão usada."}</small></div></header>
        <label>Relação / processo
          <input disabled={disabled} value={row.work} onChange={event=>update(step.id,{work:event.target.value})} placeholder={step.type==="numeric"?"Ex.: v = fλ":"Ex.: Kc = [B]²/[A]"} autoComplete="off"/>
        </label>
        {step.type==="numeric"&&<div className="fqaStepResultRow">
          <label>Resultado
            <input disabled={disabled} value={row.result} onChange={event=>update(step.id,{result:event.target.value})} placeholder="Valor numérico" inputMode="decimal" autoComplete="off"/>
          </label>
          {step.unit&&<label>Unidade
            <input disabled={disabled} value={row.unit} onChange={event=>update(step.id,{unit:event.target.value})} placeholder={step.unit} autoComplete="off"/>
          </label>}
        </div>}
      </section>;
    })}
  </div>;
}

function statusLabel(step){
  if(step.status==="correct")return "Etapa correta";
  if(step.status==="follow-through")return "Método correto com valor anterior";
  if(step.status==="numeric-error")return "Provável erro de cálculo";
  if(step.status==="unit-error")return "Unidade a rever";
  if(step.status==="analytical-error")return "Resultado simbólico a rever";
  if(step.status==="process-missing")return "Processo não evidenciado";
  if(step.status==="result-missing")return "Resultado em falta";
  if(step.status==="alternative-method-review")return "Processo alternativo · rever";
  return "Sem resposta";
}

export function PhysicsChemistryStepwiseReview({item,result}){
  const points=Number.isFinite(result?.provisionalPoints)?result.provisionalPoints:null;
  return <div className="fqaConstructedReview">
    <div className="notice">
      <b>{points===null?"Revisão necessária":"Indicação provisória · "+points+"/"+result.maxPoints+" pontos"}</b>
      <span>{result.note}</span>
    </div>
    {(result.steps||[]).map((step,index)=><article className={"fqaStepReview "+(step.status==="correct"||step.status==="follow-through"?"ok":"review")} key={step.id}>
      <div><b>{"Etapa "+(index+1)+" · "+statusLabel(step)}</b>{step.errorType&&<small>{"Erro tipo "+step.errorType+" detetado"}</small>}</div>
      <span>{"Referência: "+step.expected}</span>
      {step.note&&<p>{step.note}</p>}
    </article>)}
    {(result.type1Count>0||result.type2Count>0)&&<div className="fqaErrorSummary">
      <span>{"Erros tipo 1: "+(result.type1Count||0)}</span>
      <span>{"Erros tipo 2: "+(result.type2Count||0)}</span>
      <b>{"Desvalorização provisória: "+(result.penalty||0)+" ponto(s)"}</b>
    </div>}
    <p className="muted">A app só automatiza situações que consegue reconhecer com segurança. Processos alternativos cientificamente válidos, contradições, instruções específicas e outros casos continuam sujeitos a revisão.</p>
  </div>;
}
