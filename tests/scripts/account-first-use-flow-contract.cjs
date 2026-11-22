// Contrato de browser do percurso de conta (decisão do product owner, 2026-11-22):
// 1) primeira vez: início → «Descobrir o meu nível» → disciplinas → … → só depois do
//    diagnóstico se pede conta;
// 2) com sessão, o aluno usa a app;
// 3) depois de terminar sessão, o dispositivo fica limpo e «Descobrir o meu nível»
//    volta ao percurso do ponto 1 (nada de progresso escondido no dispositivo);
// 4) criar conta com email que já tem conta: a app diz isso e passa para «Entrar»;
// 5) conta nova: fica com o que o aluno fez desde «Descobrir o meu nível».
// Mais: estudo sem conta deixado no dispositivo → «Cria a tua conta» com «Começar de novo».
// Rotas de autenticação e cloud simuladas; dados sintéticos. Build com conta obrigatória e
// a variável de auth pública definida para um host fictício (ex.: auth.example.invalid);
// depois: APPROVA_BASE_URL=http://localhost:3100/ node tests/scripts/account-first-use-flow-contract.cjs
const {chromium}=require('playwright');const assert=require('node:assert/strict');
const BASE=process.env.APPROVA_BASE_URL||'http://localhost:3100/';
const EXISTING='ja.registado@exemplo.invalid';
(async()=>{
  const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();
  let user=null;const remote={};
  const sessionUser=()=>({id:user.id,email:user.email,name:user.name,emailVerified:true,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
  await p.route('**/api/auth/**',async r=>{
    const path=new URL(r.request().url()).pathname;
    if(path==='/api/auth/session')return user?r.fulfill({json:{ok:true,user:{id:user.id,email:user.email}}}):r.fulfill({status:401,json:{ok:false}});
    if(path.endsWith('/sign-up/email')){
      const body=JSON.parse(r.request().postData()||'{}');
      if(body.email===EXISTING)return r.fulfill({status:422,json:{code:'USER_ALREADY_EXISTS',message:'User already exists. Use another email.'}});
      user={id:'NOVA',email:body.email,name:body.name||'Aluno'};return r.fulfill({json:{token:'t',user:sessionUser(),redirect:false}});
    }
    if(path.endsWith('/sign-in/email')){const body=JSON.parse(r.request().postData()||'{}');user={id:body.email===EXISTING?'EXISTENTE':'X',email:body.email,name:'Aluno'};return r.fulfill({json:{token:'t',user:sessionUser(),redirect:false}})}
    if(path.endsWith('/sign-out')){user=null;return r.fulfill({json:{success:true}})}
    if(path.endsWith('/get-session'))return r.fulfill({json:user?{session:{id:'s',userId:user.id,token:'t',expiresAt:new Date(Date.now()+864e5).toISOString()},user:sessionUser()}:null});
    if(path.endsWith('/token'))return r.fulfill({status:401,json:{}});
    return r.fulfill({json:{}});
  });
  await p.route('**/api/cloud/state',async r=>{
    const id=user?.id;if(!id)return r.fulfill({status:401,json:{ok:false}});
    if(r.request().method()==='GET')return r.fulfill({json:{ok:true,data:remote[id]||null}});
    const body=JSON.parse(r.request().postData());const rev=(remote[id]?.revision||0)+1;remote[id]={revision:rev,state_json:body.state};
    return r.fulfill({json:{ok:true,conflict:false,data:{revision:rev}}});
  });
  remote.EXISTENTE={revision:4,state_json:{schema:'aplus-student-state-v8',xp:777,diagnosticDone:true,missionHistory:[{id:'conta'}],subjectProgress:{},selectedSubjectIds:['math-a'],activeSubjectId:'math-a'}};
  const local=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('a25')||'null'));
  const archives=()=>p.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('approva-account-archive-v1:')));

  // 1) Primeira vez: o percurso começa nas disciplinas, sem pedir conta.
  await p.goto(BASE);await p.waitForTimeout(2000);
  await p.getByRole('button',{name:/Descobrir o meu nível/}).click();
  await p.getByText('Que disciplinas queres preparar?').waitFor({timeout:8000});
  assert.equal(await p.getByText('Cria a tua conta para guardar o teu plano.').count(),0);
  console.log('✓ P1 primeira vez: «Descobrir o meu nível» → disciplinas, sem pedir conta');

  // Simular o diagnóstico feito (estudo sem conta) → a app pede conta.
  await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('a25')||'{}');Object.assign(s,{diagnosticDone:true,diagnosticAnswers:8,xp:30,firstUseTourCompleted:true,selectedSubjectIds:['math-a'],activeSubjectId:'math-a',onboardingSharedProfileDone:true,subjectSettings:{'math-a':{profileConfigured:true}},_savedAt:Date.now()});localStorage.setItem('a25',JSON.stringify(s))});
  await p.reload();await p.getByText('Cria a tua conta para guardar o teu plano.').waitFor({timeout:8000});

  // 4) Criar conta com email que já tem conta: aviso claro e passa para «Entrar».
  await p.locator('.realAuthForm').getByPlaceholder('Nome',{exact:true}).fill('Aluno');
  await p.locator('.realAuthForm').getByPlaceholder('nome@email.pt').fill(EXISTING);
  await p.locator('.realAuthForm').getByPlaceholder('••••••••').fill('palavra-passe-teste');
  await p.getByText('Tenho 13 anos ou mais.').click();
  await p.locator('.realAuthForm label.rankConsent').nth(1).locator('input').check();
  await p.locator('.realAuthForm > button:not(.linkButton)').click();
  await p.locator('.emailInUseNotice').getByText('Este email já tem conta.').waitFor({timeout:8000});
  assert.equal(await p.evaluate(()=>document.activeElement?.type),'password','o cursor vai para a palavra-passe');
  assert.equal(await p.locator('.authTabs button.sel').innerText(),'Entrar','passa para «Entrar»');
  assert.equal(await p.locator('.realAuthForm').getByPlaceholder('nome@email.pt').inputValue(),EXISTING,'o email fica preenchido');
  console.log('✓ P4 email que já tem conta: a app diz que já tem conta e passa para «Entrar»');

  // Entrar nessa conta (com progresso): a conta manda; nada se mistura.
  await p.locator('.realAuthForm').getByPlaceholder('••••••••').fill('palavra-passe-teste');
  await p.locator('.realAuthForm > button:not(.linkButton)').click();
  await p.waitForTimeout(6000);
  const fromAccount=await local();
  assert.equal(fromAccount?.xp,777,'progresso da conta');
  assert.deepEqual((fromAccount?.missionHistory||[]).map(m=>m.id),['conta'],'sem o estudo feito sem conta');
  assert.ok(await p.locator('.studentTop, .learnHome').first().isVisible(),'abre no menu');
  console.log('✓ P2 entrar numa conta com progresso: a conta manda e abre no menu');

  // 3) Terminar sessão: o dispositivo fica limpo e o percurso recomeça como no ponto 1.
  // Dispositivo acabado de limpar: visita guiada e janela da Missão, como num dispositivo novo.
  const skipTour=p.getByRole('button',{name:'Saltar explicação'});
  if(await skipTour.isVisible().catch(()=>false))await skipTour.click();
  const later=p.getByRole('button',{name:'Agora não · ver a Home'});
  if(await later.isVisible().catch(()=>false))await later.click();
  await p.locator('summary[aria-label="Abrir menu"]').first().click().catch(()=>{});
  await p.getByRole('button',{name:'Conta e progresso'}).first().click({timeout:8000});
  await p.getByRole('button',{name:'Terminar sessão'}).click();
  await p.waitForTimeout(4000);
  assert.ok(!(await local())?.xp,'sem progresso no dispositivo');
  assert.deepEqual(await archives(),[],'nada escondido no dispositivo');
  await p.goto(BASE);await p.waitForTimeout(2000);
  await p.getByRole('button',{name:/Descobrir o meu nível/}).click();
  await p.getByText('Que disciplinas queres preparar?').waitFor({timeout:8000});
  console.log('✓ P3 depois de sair, «Descobrir o meu nível» volta ao percurso inicial');

  // 5) Conta nova: fica com o que o aluno fez desde «Descobrir o meu nível».
  await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('a25')||'{}');Object.assign(s,{diagnosticDone:true,diagnosticAnswers:8,xp:55,firstUseTourCompleted:true,selectedSubjectIds:['portuguese'],activeSubjectId:'portuguese',onboardingSharedProfileDone:true,subjectSettings:{portuguese:{profileConfigured:true}},_savedAt:Date.now()});localStorage.setItem('a25',JSON.stringify(s))});
  await p.reload();await p.getByText('Cria a tua conta para guardar o teu plano.').waitFor({timeout:8000});
  await p.locator('.realAuthForm').getByPlaceholder('Nome',{exact:true}).fill('Aluno Novo');
  await p.locator('.realAuthForm').getByPlaceholder('nome@email.pt').fill('novo@exemplo.invalid');
  await p.locator('.realAuthForm').getByPlaceholder('••••••••').fill('palavra-passe-nova');
  await p.getByText('Tenho 13 anos ou mais.').click();
  await p.locator('.realAuthForm label.rankConsent').nth(1).locator('input').check();
  await p.locator('.realAuthForm > button:not(.linkButton)').click();
  await p.waitForTimeout(5000);
  assert.equal(remote.NOVA?.state_json?.xp,55,'a conta nova fica com o estudo feito');
  assert.deepEqual(remote.NOVA?.state_json?.selectedSubjectIds,['portuguese']);
  console.log('✓ P5 conta nova: guarda o que o aluno fez desde «Descobrir o meu nível»');

  // Estudo sem conta deixado no dispositivo: «Começar de novo», com confirmação.
  await p.route('**/api/auth/session',r=>r.fulfill({status:401,json:{ok:false}}));user=null;
  await p.evaluate(()=>{localStorage.clear();sessionStorage.clear();localStorage.setItem('a25',JSON.stringify({diagnosticDone:true,diagnosticAnswers:8,xp:12,firstUseTourCompleted:true,selectedSubjectIds:['math-a'],activeSubjectId:'math-a',onboardingSharedProfileDone:true,subjectSettings:{'math-a':{profileConfigured:true}},_savedAt:Date.now()}))});
  await p.goto(BASE);await p.getByText('Cria a tua conta para guardar o teu plano.').waitFor({timeout:8000});
  await p.getByRole('button',{name:'Começar de novo',exact:true}).click();
  await p.getByText(/ainda não está guardado numa conta/).waitFor({timeout:5000});
  await p.getByRole('button',{name:'Sim, começar de novo'}).click();
  await p.getByText('Que disciplinas queres preparar?').waitFor({timeout:8000});
  assert.ok(!(await local())?.diagnosticDone,'o estudo sem conta foi apagado');
  assert.deepEqual(await archives(),[],'nada escondido no dispositivo');
  console.log('✓ P6 estudo sem conta no dispositivo: «Começar de novo» (com confirmação) volta às disciplinas');
  await b.close();
})().catch(e=>{console.error('FALHOU',e.message.split('\n')[0]);process.exit(1)});
