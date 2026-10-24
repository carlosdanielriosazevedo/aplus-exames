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
  await page.getByRole("textbox",{name:/Nota recente de/u}).fill("14");
  await page.getByRole("button",{name:new RegExp(`Continuar para a matéria de ${subject.name}`,"u")}).click();

  await expect(page.getByText(new RegExp(`Todo o programa de ${subject.name} fica disponível\\.`,"u"))).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Continuar",exact:true}).click();

  const skip=page.getByRole("button",{name:"Saltar explicação",exact:true});
  if(await skip.isVisible().catch(()=>false))await skip.click();
  await page.locator(".adaptivePath").getByRole("button",{name:/Começar diagnóstico/iu}).click();
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


async function answerAny(page,step=0){
 await expect(page.locator('.opts button:visible, .portugueseOptions button:visible, .ptx-options button:visible, textarea:visible, input:visible:not([type="range"]):not([type="checkbox"]):not([type="radio"]),select:visible').first()).toBeVisible();
 const options=page.locator('.opts button:visible, .portugueseOptions button:visible, .ptx-options button:visible');
 if(await options.count()){await options.nth(step%await options.count()).click();return}
 for(const select of await page.locator('select:visible').all()){
  const value=await select.locator('option').evaluateAll(rows=>rows.find(r=>r.value&&!r.disabled)?.value);
  if(value)await select.selectOption(value);
 }
 for(const input of await page.locator('textarea:visible,input:visible:not([type="range"]):not([type="checkbox"]):not([type="radio"])').all())await input.fill('0');
}
async function finishStudy(page){
 for(let i=0;i<35;i++){
  if(await page.getByRole('button',{name:/^Voltar (à Home|ao menu inicial)$/}).isVisible().catch(()=>false))return;
  await expect(page.getByRole('button',{name:'Responder',exact:true})).toBeVisible();
  await answerAny(page,i);await page.getByRole('button',{name:'Responder',exact:true}).click();
  await completeRubricIfNeeded(page);
  await page.getByRole('button',{name:/Próxima pergunta|Ver resultado|Seguinte/}).last().click();
 }
 throw Error('Study session did not finish');
}
for(const subject of SUBJECTS){
 test(`${subject.name} · percurso completo até missão, treino e mini-exame`,async({page,context})=>{
  console.log('STAGE onboarding '+subject.id);await reachDiagnostic(page,subject);await runDiagnostic(page,context,subject);console.log('STAGE diagnostic complete '+subject.id);
  await page.getByRole('button',{name:'Ir para o menu inicial',exact:true}).click();
  const skipTour=page.getByRole('button',{name:'Saltar explicação',exact:true});if(await skipTour.isVisible().catch(()=>false))await skipTour.click();
  const mission=page.locator('.adaptivePath').getByRole('button',{name:'Começar Missão',exact:true});
  await expect(mission).toBeEnabled();await mission.click();await finishStudy(page);console.log('STAGE mission complete '+subject.id);
  await page.getByRole('button',{name:/^Voltar (à Home|ao menu inicial)$/}).click();
  await page.getByRole('button',{name:'Treinar',exact:true}).last().click();
  await page.locator('.trainChoices>button').filter({hasText:'Praticar'}).click();
  if(subject.id!=='math-a')await page.locator('h3').filter({hasText:'3. Em que queres focar-te?'}).locator('xpath=following-sibling::div[1]').locator('button:not([disabled])').filter({hasText:/\((?:[7-9]|\d{2,})\)/}).first().click();
  await page.getByRole('button',{name:/^Começar treino$/i}).click();await finishStudy(page);console.log('STAGE training complete '+subject.id);
  await page.getByRole('button',{name:/^Voltar (à Home|ao menu inicial)$/}).click();
  await page.getByRole('button',{name:'Treinar',exact:true}).last().click();
  await page.locator('.trainChoices>button').filter({hasText:'Exames'}).click();
  if(subject.id==='physics-chemistry-a')await page.getByRole('button',{name:/Mini-exame · Modelo 1/}).click();
  else await page.locator('button.exam:not([disabled])').first().click();
  const start=page.getByRole('button',{name:'Começar Mini-exame',exact:true});if(await start.isVisible().catch(()=>false))await start.click();
  for(let i=0;i<25;i++){
   const handIn=page.getByRole('button',{name:'Entregar Mini-exame',exact:true});
   if(await handIn.isVisible().catch(()=>false)){await handIn.click();break}
   const confirm=page.getByRole('button',{name:/^(Confirmar entrega e rever|Entregar com .* por responder)$/});
   if(await confirm.isVisible().catch(()=>false)){await confirm.click();break}
   await answerAny(page,i);
   const finish=page.getByRole('button',{name:/^Terminar e rever( o exame)?$/});
   if(await finish.isVisible().catch(()=>false)){await finish.click();await expect(confirm).toBeVisible();await confirm.click();break}
   await page.getByRole('button',{name:/^(Responder|Seguinte|Seguinte →)$/}).last().click();
  }
  if(subject.id==='math-a'){
   await expect(page.getByText('MINI-EXAME CONCLUÍDO',{exact:true})).toBeVisible();
   await page.getByRole('button',{name:'Rever o Mini-exame',exact:true}).click();
   await expect(page.getByRole('heading',{name:'Revê as tuas respostas.',exact:true})).toBeVisible();
   await page.getByRole('button',{name:/^Voltar (à Home|ao menu inicial)$/}).click();
  }else{
   await expect(page.getByRole('heading',{name:'Rever o mini-exame',exact:true})).toBeVisible();
   page.once('dialog',dialog=>dialog.accept());await page.getByRole('button',{name:/^Guardar (revisão e (voltar|terminar)|com \d+ por rever)/}).last().click();
  }
  for(const tab of ['Progresso','Ranking']){const button=page.getByRole('button',{name:tab,exact:true}).last();await button.click();await expect(button).toHaveAttribute('aria-current','page')}
  console.log('STAGE correction progress ranking '+subject.id);
  console.log('JOURNEY_COMPLETE '+subject.id);
 });
}
