import {test,expect} from "@playwright/test";

const SUBJECTS=[
  {id:"math-a",name:"Matemática A",subjectButton:/^Matemática A\b/u,done:/Podemos criar o teu primeiro plano\./u},
  {id:"portuguese",name:"Português",subjectButton:/^Português 12\.º ano · Prova 639\b/u,done:/DIAGNÓSTICO CONCLUÍDO · PORTUGUÊS/u},
  {id:"physics-chemistry-a",name:"Física e Química A",subjectButton:/^Física e Química A\b/u,done:/Diagnóstico concluído/u}
];

function captureRuntimeErrors(page){
  const errors=[];
  page.on("pageerror",error=>errors.push(`pageerror: ${String(error)}`));
  page.on("console",msg=>{if(msg.type()==="error")errors.push(`console.error: ${msg.text()}`)});
  return errors;
}

async function reachDiagnostic(page,subject){
  await page.goto("/");
  await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
  await expect(page.getByRole("heading",{name:"Que disciplinas queres preparar?"})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:subject.subjectButton}).click();
  await page.getByRole("button",{name:"Continuar",exact:true}).click();

  await expect(page.getByRole("button",{name:"Já terminei o secundário",exact:true})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
  await page.getByRole("button",{name:new RegExp(`Continuar para a matéria de ${subject.name}`,"u")}).click();

  await expect(page.getByText(new RegExp(`Todo o programa de ${subject.name} fica disponível\\.`,"u"))).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Continuar",exact:true}).click();

  const skip=page.getByRole("button",{name:"Saltar explicação",exact:true});
  if(await skip.isVisible().catch(()=>false))await skip.click();
  await expect(page.getByRole("button",{name:"Começar diagnóstico",exact:true})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Começar diagnóstico",exact:true}).click();
}

async function currentSubmit(page){
  return page.getByRole("button",{name:"Responder",exact:true});
}

function choiceButtons(page){
  return page.locator(".opts button:visible, .portugueseOptions button:visible");
}

async function fillCurrentAnswer(page,step){
  const options=choiceButtons(page);
  if(await options.count()){
    const count=await options.count();
    await options.nth(step%count).click();
    return "choice";
  }
  const textarea=page.locator("textarea:visible").first();
  if(await textarea.count()){
    await textarea.fill("Resposta de teste fundamentada com relação explícita entre os dados e a conclusão pedida.");
    return "text";
  }
  const inputs=page.locator('input:visible:not([type="range"]):not([type="checkbox"]):not([type="radio"])');
  if(await inputs.count()){
    await inputs.first().fill(step%2?"1":"0");
    return "input";
  }
  throw new Error("Não foi encontrado um controlo de resposta visível.");
}

async function feedbackReady(page){
  return expect.poll(async()=>{
    if(await page.locator(".opts button.correct:visible, .portugueseOptions button.correct:visible").count())return true;
    if(await page.getByRole("button",{name:/Próxima pergunta|Seguinte|Ver resultado/u}).count())return true;
    const text=await page.locator("body").innerText();
    return /Muito bem|Não é essa|Resposta correta|Resposta incorreta|Correto|Incorreto|avaliação|critérios|grelha|revê/i.test(text);
  },{timeout:30_000}).toBe(true);
}

async function completeRubricIfNeeded(page){
  const evidence=page.getByRole("button",{name:"Encontro claramente",exact:true});
  const count=await evidence.count();
  for(let index=0;index<count;index++){
    const button=evidence.nth(index);
    if(await button.isVisible().catch(()=>false)&&await button.isEnabled().catch(()=>false))await button.click();
  }
}

async function runDiagnostic(page,context,subject){
  let sawCorrect=false,sawWrong=false,sawBlankGuard=false,sawOffline=false,sawDoubleClick=false;
  for(let step=0;step<30;step++){
    const body=await page.locator("body").innerText();
    if(subject.done.test(body))return {sawCorrect,sawWrong,sawBlankGuard,sawOffline,sawDoubleClick};

    const submit=await currentSubmit(page);
    await expect(submit).toBeVisible({timeout:30_000});
    if(step===0){
      await expect(submit).toBeDisabled();
      sawBlankGuard=true;
    }

    const answerType=await fillCurrentAnswer(page,step);
    await expect(submit).toBeEnabled();

    if(step===1){
      await submit.evaluate(node=>{node.click();node.click()});
      sawDoubleClick=true;
    }else if(step===2){
      await context.setOffline(true);
      await submit.click();
      await context.setOffline(false);
      sawOffline=true;
    }else{
      await submit.click();
    }

    await feedbackReady(page);
    if(answerType==="choice"){
      const wrong=await page.locator(".opts button.wrong:visible, .portugueseOptions button.wrong:visible").count();
      const correct=await page.locator(".opts button.correct:visible, .portugueseOptions button.correct:visible").count();
      if(wrong)sawWrong=true;
      else if(correct)sawCorrect=true;
    }

    await completeRubricIfNeeded(page);
    const next=page.getByRole("button",{name:/Próxima pergunta|Seguinte|Ver resultado/u}).last();
    await expect(next).toBeVisible({timeout:30_000});
    await next.click();
  }
  throw new Error(`${subject.name}: diagnóstico não terminou dentro do limite.`);
}

for(const subject of SUBJECTS){
  test(`${subject.name} · diagnóstico e2e resiste a branco, duplo clique e corte de rede`,async({page,context})=>{
    const runtimeErrors=captureRuntimeErrors(page);
    await reachDiagnostic(page,subject);
    const proof=await runDiagnostic(page,context,subject);

    await expect(page.locator("body")).toContainText(subject.done,{timeout:30_000});
    expect(proof.sawBlankGuard,"uma resposta em branco deve ficar sem submissão e sem corromper a sessão").toBe(true);
    expect(proof.sawDoubleClick,"o percurso deve incluir submissão por duplo clique").toBe(true);
    expect(proof.sawOffline,"o percurso deve incluir corte de rede durante uma submissão").toBe(true);
    expect(proof.sawCorrect,"o diagnóstico deve exercer pelo menos uma escolha correta").toBe(true);
    expect(proof.sawWrong,"o diagnóstico deve exercer pelo menos uma escolha errada").toBe(true);
    expect(runtimeErrors,`${subject.name}: não deve produzir pageerror nem console.error`).toEqual([]);
  });
}
