// Contrato de browser da sincronização automática (rotas de sessão e cloud simuladas; dados sintéticos).
// Uso: build com a variável de auth pública definida para um host fictício (ex.: auth.example.invalid), depois "npx next start -p 3100"
//      APPROVA_BASE_URL=http://localhost:3100/ node tests/scripts/cloud-autosync-browser-contract.cjs
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const BASE=process.env.APPROVA_BASE_URL||'http://localhost:3100/';
const studied={xp:40,diagnosticDone:true,missionHistory:[{id:"m1"}],activeSubjectId:"portuguese",selectedSubjectIds:["portuguese"]};
async function scenario(name,{seed,remote,postMode='ok',session='A'},check){
  const b=await chromium.launch();const ctx=await b.newContext();const p=await ctx.newPage();
  const posts=[];let mode=postMode;
  await p.route('**/api/auth/session',r=>r.fulfill(session?{json:{ok:true,user:{id:session,email:'aluno@exemplo.invalid'}}}:{status:401,json:{ok:false}}));
  await p.route('**/api/cloud/state',async r=>{
    if(r.request().method()==='GET')return r.fulfill({json:{ok:true,authority:'client-reported',data:remote}});
    const body=JSON.parse(r.request().postData());posts.push(body);
    if(mode==='abort')return r.abort('internetdisconnected');
    return r.fulfill({json:{ok:true,conflict:false,data:{revision:body.expectedRevision+1,updated_at:'x'}}});
  });
  await p.addInitScript(([s])=>{if(!sessionStorage.getItem('seeded')){localStorage.setItem('a25',JSON.stringify({...s,_savedAt:Date.now()}));localStorage.setItem('approva-cloud-session-hint-v1','1');sessionStorage.setItem('seeded','1')}},[seed]);
  await p.goto(BASE);await p.waitForTimeout(3500);
  const local=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('a25')));
  await check({p,posts,local,setMode:m=>{mode=m}});
  await b.close();console.log('✓',name);
}
(async()=>{
  await scenario('S1 progresso anónimo: pede confirmação e só depois envia (insert rev 0)',{seed:studied,remote:null},async({p,posts,local})=>{
    await p.getByText('Guardar o progresso deste dispositivo na tua conta?').waitFor({timeout:5000});
    assert.equal(posts.length,0,'nada enviado antes da confirmação');
    await p.getByRole('button',{name:/Sim, é meu/}).click();await p.waitForTimeout(1500);
    assert.equal(posts.length,1);assert.equal(posts[0].operation,'insert');assert.equal(posts[0].expectedRevision,0);
    assert.equal(posts[0].state.xp,40);assert.ok(!('auth_user_id' in posts[0]));
    const s=await local();assert.equal(s.cloudSync.accountId,'A');assert.equal(s.cloudSync.baseRevision,1);
  });
  await scenario('S2 "Não é meu" (ex.: irmão): o estudo anónimo nunca entra na conta e fica à parte no dispositivo',{seed:studied,remote:null},async({p,posts,local})=>{
    await p.getByRole('button',{name:'Não é meu'}).click();await p.waitForTimeout(9500);
    assert.ok(posts.every(body=>!(body.state?.xp>0)&&!body.state?.diagnosticDone),'o estudo anónimo não é enviado');
    const aside=await p.evaluate(()=>localStorage.getItem('approva-account-archive-v1:anonimo-neste-dispositivo'));
    assert.ok(aside&&aside.includes('\\"xp\\":40'),'o estudo anónimo fica guardado à parte');
    assert.notEqual((await local())?.xp,40);
  });
  await scenario('S3 progresso de outra conta: bloqueia, não envia nem substitui',{seed:{...studied,cloudSync:{accountId:'B',baseRevision:2}},remote:{revision:9,state_json:{schema:'aplus-student-state-v8',xp:999}}},async({p,posts,local})=>{
    await p.getByText(/progresso de outra conta/).waitFor({timeout:5000});
    assert.equal(posts.length,0);assert.equal((await local()).xp,40);
  });
  await scenario('S4 dispositivo novo: recebe o progresso da conta sem enviar nada',{seed:{xp:0},remote:{revision:5,last_device_id:'d',state_json:{schema:'aplus-student-state-v8',xp:77,subjectProgress:{}}}},async({p,posts,local})=>{
    await p.waitForTimeout(1000);
    const s=await local();assert.equal(s.xp,77);assert.equal(s.cloudSync.accountId,'A');assert.equal(s.cloudSync.baseRevision,5);
    assert.equal(posts.length,0);
  });
  await scenario('S5 alterações locais + online mais recente, mesmo perfil: junta automaticamente, nada se perde',{seed:{...studied,profile:{schoolYear:'11.º'},cloudSync:{accountId:'A',baseRevision:1,payloadFingerprint:'stale'}},remote:{revision:4,state_json:{schema:'aplus-student-state-v8',xp:5,profile:{schoolYear:'11.º'},missionHistory:[{id:'r1',completionId:'r1',at:1}]}}},async({p,posts,local})=>{
    await p.waitForTimeout(1500);
    assert.equal(posts.length,1);assert.equal(posts[0].operation,'update');assert.equal(posts[0].expectedRevision,4);
    assert.deepEqual(posts[0].state.missionHistory.map(m=>m.completionId||m.id).sort(),['m1','r1']);
    assert.equal(posts[0].state.xp,40);
    assert.equal(await p.getByText(/diferente noutro dispositivo/).count(),0);
    assert.equal((await local()).cloudSync.baseRevision,5);
  });
  await scenario('S9 perfis escolares diferentes: pede ao aluno o perfil, nada é enviado',{seed:{...studied,profile:{schoolYear:'11.º'},cloudSync:{accountId:'A',baseRevision:1,payloadFingerprint:'stale'}},remote:{revision:4,state_json:{schema:'aplus-student-state-v8',xp:5,profile:{schoolYear:'10.º'}}}},async({p,posts,local})=>{
    await p.getByText(/perfil escolar é diferente/).waitFor({timeout:5000});
    assert.equal(posts.length,0);const s=await local();assert.equal(s.xp,40);assert.equal(s.profile.schoolYear,'11.º');
  });
  await scenario('S6 sem rede: avisa, mantém local e volta a tentar com sucesso',{seed:{...studied,cloudSync:{accountId:'A',baseRevision:1,payloadFingerprint:'stale'}},remote:{revision:1,state_json:{schema:'aplus-student-state-v8',xp:5}},postMode:'abort'},async({p,posts,local,setMode})=>{
    await p.getByText(/Sem ligação/).waitFor({timeout:5000});
    assert.equal((await local()).xp,40);assert.equal(posts.length,1);assert.equal(posts[0].expectedRevision,1);
    setMode('ok');await p.waitForTimeout(6500);
    assert.ok(posts.length>=2);assert.equal((await local()).cloudSync.baseRevision,2);
    assert.equal(await p.getByText(/Sem ligação/).count(),0);
  });
  await scenario('S8 "Sim, é meu" com progresso já na conta: junta os dois num só passo, sem conflito',{seed:studied,remote:{revision:4,last_device_id:'d',state_json:{schema:'aplus-student-state-v8',xp:90,missionHistory:[{id:'r1',completionId:'r1',at:1}],subjectProgress:{}}}},async({p,posts,local})=>{
    await p.getByText('Guardar o progresso deste dispositivo na tua conta?').waitFor({timeout:5000});
    assert.equal(posts.length,0,'nada enviado antes da confirmação');
    await p.getByRole('button',{name:/Sim, é meu/}).click();await p.waitForTimeout(2000);
    assert.equal(posts.length,1,'uma única gravação');
    assert.equal(posts[0].operation,'update');assert.equal(posts[0].expectedRevision,4);
    assert.equal(posts[0].state.xp,90,'XP nunca é somado: máximo dos dois');
    const ids=posts[0].state.missionHistory.map(m=>m.completionId||m.id).sort();
    assert.deepEqual(ids,['m1','r1'],'estudo dos dois lados preservado');
    const s=await local();assert.equal(s.cloudSync.accountId,'A');assert.equal(s.cloudSync.baseRevision,5);
    assert.equal(s.cloudSync.adoptionPending,false);assert.equal(s.cloudSync.lastConflict,null);
    assert.equal(await p.getByText(/progresso diferente/).count(),0,'sem aviso de conflito');
    const snaps=await p.evaluate(()=>JSON.parse(localStorage.getItem('a25-cloud-snapshots-v1')||'[]'));
    assert.ok(snaps.some(x=>/Antes de juntar/.test(x.label)),'cópia de segurança antes de juntar');
  });
  await scenario('S7 sem sessão iniciada: não envia nada',{seed:studied,remote:null,session:null},async({posts})=>{
    assert.equal(posts.length,0);
  });
})().catch(e=>{console.error('FALHOU',e.message);process.exit(1)});
