export function responseType(question){return question?.response?.type||"choice"}
export function isConstructedResponse(question){return !["choice","completion"].includes(responseType(question))}
export function completionFilledCount(question,answer){
  return (question.response?.blanks||[]).filter(blank=>Number.isInteger(answer?.[blank.id])&&answer[blank.id]>=0&&answer[blank.id]<blank.options.length).length;
}
const hasText=value=>typeof value==="string"&&value.trim().length>0;

export function isResponseAnswered(question,answer){
  if(responseType(question)==="completion")return completionFilledCount(question,answer)>0;
  if(responseType(question)==="choice")return Number.isInteger(answer);
  if(responseType(question)==="stepwise")return hasText(answer)||hasText(answer?.working)||Object.values(answer?.steps||{}).some(hasText);
  return hasText(answer);
}

export function stepFeedback(row){
  if(row.reason==="final_result_only")return "Nos itens de construção por etapas, o resultado final isolado não é pontuado: apresenta os cálculos e justificações necessários.";
  if(row.reason==="instruction_violation")return "Foi usado um processo que o enunciado excluía explicitamente. Esta etapa e apenas as etapas declaradas como dependentes recebem zero, de acordo com os critérios IAVE.";
  if(row.reason==="missing_required_work")return "Faltam os cálculos ou a justificação que o critério exige nesta etapa; por isso, esta etapa recebe zero pontos.";
  if(row.reason==="implicit_non_calculation_step")return row.implicitTraversal?"A etapa não foi escrita isoladamente, mas a resolução posterior prova inequivocamente que foi percorrida; foi atribuída a cotação prevista.":"A etapa não foi apresentada e a resolução não prova inequivocamente que foi percorrida; esta etapa e as dependentes declaradas recebem zero.";
  if(row.reason==="dependent_zero_due_to_iave")return "Esta etapa depende de uma etapa anterior que, pelos critérios IAVE, obriga a cotação zero nas etapas dependentes.";
  if(row.reason==="copied_data_error")return row.difficultyReduced?"Foi identificado um erro de cópia de dados que altera a dificuldade. O corretor mantém essa origem explícita para aplicar corretamente os limites nas etapas dependentes.":"Foi identificado um erro de cópia de dados sem redução de dificuldade. Aplicámos a desvalorização global prevista nos critérios IAVE.";
  if(row.reason==="copied_number_or_sign_error")return "A cadeia mostra o valor correto e uma troca isolada de algarismo ou sinal na sua transcrição. Aplicámos apenas a desvalorização prevista para esta situação.";
  if(row.reason==="occasional_calculation_error")return "O processo identificado está correto, mas há uma falha ocasional no cálculo final desta etapa. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="conceptual_error")return "O item identifica esta resposta como um erro conceptual específico. A etapa ficou limitada à parte inteira de metade da cotação, de acordo com os critérios IAVE.";
  if(row.reason==="incomplete_step")return row.missingOnlyFinalPassage?"A etapa está correta até à última passagem necessária. Foi aplicada apenas a desvalorização prevista para essa omissão final.":"A etapa está incompleta segundo o critério específico do item. Foi aplicado o limite de cotação previsto nos critérios IAVE.";
  if(row.reason==="intermediate_rounding")return "Foi identificado um cálculo intermédio com número de casas decimais diferente do solicitado ou um arredondamento intermédio incorreto. A regra geral IAVE retira um ponto à soma das pontuações da resposta.";
  if(row.reason==="upstream_error_effect")return row.difficultyReduced?"Esta etapa segue corretamente o erro anterior, mas esse erro tornou a etapa mais fácil. Aplicámos o limite de metade da cotação previsto na Nota 2 dos critérios IAVE.":"Esta etapa segue corretamente o erro anterior sem redução de dificuldade e foi classificada pelo critério específico adaptado.";
  if(row.reason==="wrong_final_form")return "O valor é matematicamente equivalente, mas não está apresentado na forma final pedida. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="approximate_instead_of_exact")return "Foi apresentado um valor aproximado quando era exigido um valor exato. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="approximate_used_instead_of_exact")return "Uma aproximação anterior foi usada num cálculo seguinte em vez do valor exato. Aplicámos o limite de cotação previsto nos critérios IAVE.";
  if(row.reason==="wrong_final_rounding")return "A cadeia mostra o valor não arredondado correto, mas o arredondamento final indicado está incorreto. Aplicámos a desvalorização prevista nos critérios IAVE.";
  if(row.reason==="excess_elements")return row.affectsPerformance?"Foram identificados elementos em excesso que afetam o desempenho pedido. Aplicámos a desvalorização global prevista nos critérios IAVE.":"Foram identificados elementos em excesso, mas sem efeito no desempenho pedido; não houve desvalorização automática.";
  if(row.reason==="formal_notation_error")return row.onlyZeroPointSteps?"Foi identificada uma incorreção de simbologia apenas em etapas sem pontuação; não houve desvalorização global.":"Foi identificada uma incorreção de simbologia formal numa etapa pontuada. Aplicámos a desvalorização global prevista nos critérios IAVE.";
  if(row.reason==="calculation_error")return "O cálculo identificado não dá o valor esperado. Como não é seguro concluir automaticamente que se trata apenas de uma falha ocasional, esta classificação não é inferida sem evidência suficiente.";
  if(row.reason==="conflicting_results")return "Encontrámos resultados incompatíveis para a mesma grandeza. Não atribuímos estes pontos automaticamente.";
  if(row.reason==="no_recognizable_work")return "Não identificámos cálculos ou uma explicação que permitam avaliar esta etapa.";
  if(row.status==="needs_review")return "Não conseguimos confirmar esta etapa. Pode estar incompleta ou escrita de uma forma que o corretor ainda não reconhece.";
  return `Identificado na tua resolução: ${row.answer||"Não identificado"}`;
}

export function expectedResponseLabel(question){
  const response=question?.response;
  if(response?.type==="completion")return response.blanks.map(b=>`${b.label} ${b.options[b.correct]}`).join(" · ");
  if(!response)return question?.o?.[question?.a]??"—";
  if(response.type==="numeric")return String(response.value).replace(".",",");
  if(response.type==="fraction")return `${response.numerator}/${response.denominator}`;
  if(response.type==="stepwise")return response.steps.map(row=>`${row.label}: ${row.expected}`).join(" · ");
  return "—";
}

export function studentResponseLabel(question,answer){
  if(!isResponseAnswered(question,answer))return "Sem resposta";
  if(responseType(question)==="completion")return question.response.blanks.map(b=>`${b.label} ${b.options[answer?.[b.id]]??"Sem resposta"}`).join(" · ");
  if(responseType(question)==="choice")return `${String.fromCharCode(65+answer)} — ${question.o[answer]}`;
  if(responseType(question)==="stepwise"){
    if(typeof answer==="string")return answer.trim();
    const filled=question.response.steps.filter(row=>hasText(answer?.steps?.[row.id])).length;
    return hasText(answer?.working)?answer.working.trim():`${filled}/${question.response.steps.length} etapas preenchidas`;
  }
  return String(answer).trim();
}

export function examScoreLabel(result){
  const lower=String(result.score20).replace(".",",");
  return result.reviewRequired?"Avaliação incompleta":`${lower}/20`;
}
