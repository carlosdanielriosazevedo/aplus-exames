import {test,expect} from "@playwright/test";

const SUBJECTS=[
  {id:"math-a",name:"Matemática A",done:/Podemos criar o teu primeiro plano\./u},
  {id:"portuguese",name:"Português",done:/DIAGNÓSTICO CONCLUÍDO · PORTUGUÊS/u},
  {id:"physics-chemistry-a",name:"Física e Química A",done:/Diagnóstico concluído/u}
];

function captureRuntimeErrors(page){
  const errors=[];
  page.on("pageerror",error=>errors.push(`pageerror: ${String(error)}`));
  page.on("console",msg=>{if(msg.type()==="error")errors.push(`console.error: ${msg.text()}`)});
  return errors;
}

async function reachDiagnostic(page,subject){
  await page.goto("/");
  await page.getByRole("button",{name:/Descobrir o meu nível/}).click();
  await expect(page.getByRole("heading",{name:"Que disciplinas queres preparar?"})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:new RegExp(subject.name,"u")}).click();
  await page.getByRole("button",{name:"Continuar",exact:true}).click();

  await expect(page.getByRole("button",{name:"Já terminei o secundário",exact:true})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
  await page.getByRole("button",{name:new RegExp(`Continuar para a matéria de ${subject.name.replace("Física e Química A","Física e Química A")}`,"u")}).click();

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

async function fillCurrentAnswer(page,step){
  const options=page.locator(".opts button:visible");
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

async function completeRubricIfNeeded(page){
  const evidence=page.getByRole("button",{name:"Encontro claramente",exact:true});
  const count=await evidence.count();
  for(let index=0;index<count;index++){
    const button=evidence.nth(index);
    if(await button.isVisible().catch(()=>false)&&await button.isEnabled().catch(()=>false))await button.click();
  }
}

async function runDiagnostic(page,context,subject,runtimeErrors){
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

    await fillCurrentAnswer(page,step);
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

    await expect.poll(async()=>await page.locator("body").innerText(),{timeout:30_000}).toMatch(/Próxima pergunta|Resposta correta|Resposta incorreta|Correto|Incorreto|avaliação|critérios|resposta/i);
    const feedbackText=(await page.locator("body").innerText()).toLocaleLowerCase("pt-PT");
    if(/resposta correta|correto|certa/u.test(feedbackText))sawCorrect=true;
    if(/resposta incorreta|incorreto|errada/u.test(feedbackText))sawWrong=true;

    await completeRubricIfNeeded(page);
    const next=page.getByRole("button",{name:/Próxima pergunta/u});
    if(await next.isVisible().catch(()=>false))await next.click();
    else{
      const continueButton=page.getByRole("button",{name:/Continuar|Seguinte/u}).last();
      await expect(continueButton).toBeVisible({timeout:30_000});
      await continueButton.click();
    }
  }
  throw new Error(`${subject.name}: diagnóstico não terminou dentro do limite.`);
}

for(const subject of SUBJECTS){
  test(`${subject.name} · diagnóstico e2e resiste a branco, duplo clique e corte de rede`,async({page,context})=>{
    const runtimeErrors=captureRuntimeErrors(page);
    await reachDiagnostic(page,subject);
    const proof=await runDiagnostic(page,context,subject,runtimeErrors);

    await expect(page.locator("body")).toContainText(subject.done,{timeout:30_000});
    expect(proof.sawBlankGuard,"uma resposta em branco deve ser bloqueada sem corromper a sessão").toBe(true);
    expect(proof.sawDoubleClick,"o percurso deve incluir submissão por duplo clique").toBe(true);
    expect(proof.sawOffline,"o percurso deve incluir corte de rede durante uma submissão").toBe(true);
    expect(proof.sawCorrect,"o diagnóstico deve exercer pelo menos uma resposta correta").toBe(true);
    expect(proof.sawWrong,"o diagnóstico deve exercer pelo menos uma resposta errada").toBe(true);
    expect(runtimeErrors,`${subject.name}: não deve produzir pageerror nem console.error`).toEqual([]);
  });
}
