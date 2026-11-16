// Contrato de browser: conta obrigatória + separação por conta no mesmo dispositivo.
// Rotas de autenticação e cloud simuladas; dados sintéticos. Build com a obrigatoriedade de conta ativa e
// a variável de auth pública definida para um host fictício (ex.: auth.example.invalid); depois next start -p 3100.
const {chromium}=require('playwright');const assert=require('node:assert/strict');
const BASE=process.env.APPROVA_BASE_URL||'http://localhost:3100/';
(async()=>{
  const b=await chromium.launch();const ctx=await b.newContext();const p=await ctx.newPage();
  let user=null;const log=[];
  const sessionBody=()=>user?{session:{id:'sess-'+user.id,userId:user.id,token:'t',expiresAt:new Date(Date.now()+864e5).toISOString()},user:{id:user.id,email:user.email,name:user.name,emailVerified:true,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}}:null;
  await p.route('**/api/auth/**',async r=>{
    const u=new URL(r.request().url());const path=u.pathname;log.push(r.request().method()+' '+path);
    if(path==='/api/auth/session')return user?r.fulfill({json:{ok:true,user:{id:user.id,email:user.email}}}):r.fulfill({status:401,json:{ok:false,error:'UNAUTHORIZED'}});
    if(path.endsWith('/sign-in/email')||path.endsWith('/sign-up/email')){const body=JSON.parse(r.request().postData()||'{}');user={id:body.email.startsWith('a')?'A':'B',email:body.email,name:body.name||'Aluno'};return r.fulfill({json:{token:'t',user:sessionBody().user,redirect:false}})}
    if(path.endsWith('/sign-out')){user=null;return r.fulfill({json:{success:true}})}
    if(path.endsWith('/get-session'))return r.fulfill({json:sessionBody()});
    if(path.endsWith('/token'))return r.fulfill({status:401,json:{}});
    return r.fulfill({json:{}});
  });
  const remote={};
  await p.route('**/api/cloud/state',async r=>{
    const id=user?.id;if(!id)return r.fulfill({status:401,json:{ok:false}});
    if(r.request().method()==='GET')return r.fulfill({json:{ok:true,data:remote[id]||null}});
    const body=JSON.parse(r.request().postData());const rev=(remote[id]?.revision||0)+1;remote[id]={revision:rev,state_json:body.state,last_device_id:body.deviceId};
    return r.fulfill({json:{ok:true,conflict:false,data:{revision:rev}}});
  });
  const local=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('a25')||'null'));
  // 1) Gate: sem sessão, ao sair da página inicial pede conta
  await p.goto(BASE);await p.waitForTimeout(2500);
  await p.evaluate(()=>{history.pushState({approvaScreen:'home'},'');});
  // forçar navegação para fora de "welcome": usar o CTA principal
  const cta=p.locator('button').filter({hasText:/Descobrir o meu nível/}).first();
  await cta.click();await p.waitForTimeout(1500);
  assert.equal(await p.getByText('Cria a tua conta para guardar o teu plano.').count(),0,'antes do primeiro estudo não há pedido de conta');
  // Depois do diagnóstico (primeiro estudo), a conta passa a ser pedida.
  await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('a25')||'{}');s.diagnosticDone=true;s.firstUseTourCompleted=true;s._savedAt=Date.now();localStorage.setItem('a25',JSON.stringify(s))});
  await p.reload();await p.waitForTimeout(2500);
  await p.getByText('Cria a tua conta para guardar o teu plano.').waitFor({timeout:5000});
  console.log('✓ G1 sem sessão: onboarding livre; depois do diagnóstico pede conta');
  // 2) Registo exige 13+ e termos
  await p.getByRole('button',{name:'Criar conta'}).first().click();
  await p.getByPlaceholder('nome@email.pt').fill('a.aluno@exemplo.invalid');
  await p.getByPlaceholder('••••••••').fill('palavra-passe-teste-1');
  const submit=p.locator('.realAuthForm > button:not(.linkButton)');
  assert.equal(await submit.isDisabled(),true,'sem confirmações o registo está bloqueado');
  await p.getByText('Tenho 13 anos ou mais.').click();
  assert.equal(await submit.isDisabled(),true,'só idade não chega');
  await p.locator('.realAuthForm label.rankConsent').nth(1).locator('input').check();
  assert.equal(await submit.isDisabled(),false);
  console.log('✓ G2 registo exige 13+ anos e aceitação de termos/privacidade');
  await submit.click();await p.waitForTimeout(3000);
  assert.equal(await p.getByText('Cria a tua conta para guardar o teu plano.').count(),0,'gate abre depois de entrar');
  console.log('✓ G3 depois de entrar, o estudo fica disponível');
  // 3) Simular progresso de A ligado à conta e gravado
  await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('a25')||'{}');delete s.diagnosticDone;s.xp=321;s.selectedSubjectIds=['portuguese'];s.activeSubjectId='portuguese';s.firstUseTourCompleted=true;s.subjectSettings={portuguese:{profileConfigured:true,curriculumConfigured:true,goalConfigured:true,goal:14}};s.subjectProgress={portuguese:{version:4,diagnosticDone:true,diagnosticCompletedAt:1}};s.cloudSync={...(s.cloudSync||{}),accountId:'A',baseRevision:1};s._savedAt=Date.now();localStorage.setItem('a25',JSON.stringify(s));localStorage.setItem('a25-active-session-v1','{"kind":"mission","answers":[2]}')});
  remote.A={revision:1,state_json:{schema:'aplus-student-state-v8',xp:321}};
  await p.reload();await p.waitForTimeout(3000);
  // 4) Terminar sessão via ecrã de conta
  await p.evaluate(()=>{window.history.pushState({approvaScreen:'account'},'');});
  await p.goto(BASE);await p.waitForTimeout(2500);
  // abrir conta pelo menu
  await p.locator('summary[aria-label="Abrir menu"]').first().click().catch(()=>{});
  await p.getByRole('button',{name:'Conta e progresso'}).first().click({timeout:5000});
  await p.getByRole('button',{name:'Terminar sessão'}).click();
  await p.waitForTimeout(4000);
  const afterOut=await local();
  assert.ok(!afterOut||!afterOut.xp,'após sair, o progresso de A não fica na área ativa');
  assert.equal(await p.evaluate(()=>localStorage.getItem('a25-active-session-v1')),null,'tentativa de A também sai da área ativa');
  assert.ok(await p.evaluate(()=>!!localStorage.getItem('approva-account-archive-v1:A')),'A fica arquivado no dispositivo');
  console.log('✓ T1 terminar sessão: progresso e tentativa de A saem da área ativa (arquivados)');
  // 5) B entra no mesmo browser: não vê A
  await p.goto(BASE);await p.waitForTimeout(2000);
  // Quem já tem conta entra pelo "Já tens conta? Entrar" do primeiro ecrã.
  await p.getByRole('button',{name:/Já tens conta\? Entrar/}).first().click();await p.waitForTimeout(1500);
  await p.getByPlaceholder('nome@email.pt').fill('b.aluno@exemplo.invalid');
  await p.getByPlaceholder('••••••••').fill('palavra-passe-teste-2');
  await p.locator('.realAuthForm > button:not(.linkButton)').click();await p.waitForTimeout(3500);
  const bState=await local();
  assert.ok(!bState||(bState.xp||0)!==321,'B não herda o XP de A');
  console.log('✓ T2 aluno B no mesmo browser não vê o progresso de A');
  // 6) B sai, A volta: progresso e tentativa repostos
  await p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('a25')||'{}');s.cloudSync={...(s.cloudSync||{}),accountId:'B'};localStorage.setItem('a25',JSON.stringify(s))});
  user=null;await p.goto(BASE);await p.waitForTimeout(2000);
  await p.getByRole('button',{name:/Já tens conta\? Entrar/}).first().click();await p.waitForTimeout(1500);
  await p.getByPlaceholder('nome@email.pt').fill('a.aluno@exemplo.invalid');
  await p.getByPlaceholder('••••••••').fill('palavra-passe-teste-1');
  await p.locator('.realAuthForm > button:not(.linkButton)').click();await p.waitForTimeout(4500);
  const aBack=await local();
  assert.equal(aBack?.xp,321,'A recupera o seu progresso');
  assert.equal(await p.evaluate(()=>localStorage.getItem('a25-active-session-v1')),'{"kind":"mission","answers":[2]}','tentativa em curso de A reposta byte a byte');
  assert.ok(await p.evaluate(()=>!!localStorage.getItem('approva-account-archive-v1:B')),'B fica arquivado');
  console.log('✓ T3 A volta a entrar: progresso e tentativa em curso repostos; B arquivado');
  await b.close();
})().catch(e=>{console.error('FALHOU',e.message.split('\n')[0]);process.exit(1)});
