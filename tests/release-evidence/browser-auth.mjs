import {chromium,expect} from "@playwright/test";
import {randomBytes} from "node:crypto";
function configuredState(subjectId){
 const now=Date.now();
 return {
  goal:17,xp:123456,diagnosticDone:subjectId==="math-a",diagnosticAnswers:0,
  selectedSubjectIds:[subjectId],activeSubjectId:subjectId,
  firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],
  onboardingReturnSubjectId:null,subjectOnboardingMode:"initial",
  subjectSettings:{[subjectId]:{profileConfigured:true,recentGrade:"",examTiming:"thisYear",goal:17}},
  subjectProgress:subjectId==="math-a"?{}:{[subjectId]:{subjectId,version:4,diagnosticDone:true,diagnosticCompletedAt:now,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:null,lastActivityAt:now}},
  subjectProgressModelVersion:4,pedagogicalIdVersion:1,betaMode:"internal",
  profile:{schoolYear:"11.º",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},
  _stateVersion:31,_savedAt:now
 };
}


const base='https://applus-beta-synthetic-git-1472c7-carlos-rios-azevedo-s-projects.vercel.app';
const browser=await chromium.launch({headless:true,proxy:{server:process.env.HTTPS_PROXY||process.env.HTTP_PROXY}});
const context=await browser.newContext({ignoreHTTPSErrors:true,viewport:{width:390,height:844}});
const email=`release-ui-${Date.now()}-${randomBytes(4).toString('hex')}@example.com`,password='S!'+randomBytes(20).toString('base64url');
try{
 const page=await context.newPage();page.on('request',r=>{if(r.url().includes('.apirest.')) console.log('DATA_REQUEST '+r.method()+' '+Object.keys(r.headers()).join(','))});page.on('response',async r=>{if(r.url().includes('.apirest.')){const h=await r.allHeaders();console.log('DATA_RESPONSE '+r.status()+' '+JSON.stringify(Object.fromEntries(Object.entries(h).filter(([k])=>k.startsWith('access-control')))))}});page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE '+m.text().replaceAll(process.env.RELEASE_SHARE_TOKEN,'<redacted>'))});page.on('requestfailed',r=>console.log('NETWORK '+new URL(r.url()).hostname+' '+r.method()+' '+r.failure()?.errorText));
 await page.goto(base+'/?_vercel_share='+process.env.RELEASE_SHARE_TOKEN);
 await page.evaluate(s=>localStorage.setItem('a25',JSON.stringify(s)),configuredState('math-a'));await page.goto(base+'/');
 async function account(){await expect(page.locator('.studentTop,.realAuthForm,.cloudLoading,.signedAccount,.cloudUnavailable').first()).toBeVisible({timeout:30000});if(await page.getByRole('heading',{name:'O teu progresso, seguro em todos os teus dispositivos.',exact:true}).isVisible().catch(()=>false))return;await page.getByLabel('Abrir menu',{exact:true}).click();await page.getByRole('button',{name:'Conta e progresso',exact:true}).click()}
 await account();await page.locator('.authTabs').getByRole('button',{name:'Criar conta',exact:true}).click();
 await page.getByLabel('Nome',{exact:true}).fill('Release Synthetic UI');await page.getByLabel('Email',{exact:true}).fill(email);await page.getByLabel('Palavra-passe',{exact:true}).fill(password);await page.locator('.realAuthForm').getByRole('button',{name:'Criar conta',exact:true}).click();
 await expect(page.getByText('Conta autenticada',{exact:true})).toBeVisible({timeout:60000});
 const marked=await context.request.post(base+'/api/pilot/smoke',{headers:{origin:base,'sec-fetch-site':'same-origin'}});expect(marked.status()).toBe(200);
 await page.getByRole('button',{name:'↑ Guardar online',exact:true}).click();await expect(page.getByText('Progresso guardado online com segurança.',{exact:true})).toBeVisible({timeout:45000});
 await page.reload();await account();await expect(page.getByText('Conta autenticada',{exact:true})).toBeVisible({timeout:30000});
 await page.getByRole('button',{name:'↓ Carregar progresso online',exact:true}).click();await expect(page.getByText('Progresso online carregado. Criámos primeiro uma cópia de segurança neste dispositivo.',{exact:true})).toBeVisible({timeout:30000});
 const xp=await page.evaluate(()=>JSON.parse(localStorage.getItem('a25')).xp);expect(xp).toBe(123456);
 await page.goto(base+'/piloto');await page.getByRole('checkbox').nth(0).check();await page.getByRole('checkbox').nth(1).check();await page.getByRole('button',{name:'Participar no piloto',exact:true}).click();await expect(page.getByText('Participação ativa',{exact:true})).toBeVisible({timeout:30000});
 await page.getByRole('button',{name:'Retirar consentimento',exact:true}).click();await expect(page.getByText('Consentimento retirado. A recolha fica bloqueada imediatamente.',{exact:true})).toBeVisible();
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('a25')).xp)).toBe(xp);
 await page.goto(base+'/');await account();await page.getByRole('button',{name:'Terminar sessão',exact:true}).click();await expect(page.getByText('Conta autenticada',{exact:true})).toHaveCount(0);
 await page.getByLabel('Email',{exact:true}).fill(email);await page.getByLabel('Palavra-passe',{exact:true}).fill(password);await page.locator('.realAuthForm').getByRole('button',{name:'Entrar',exact:true}).click();await expect(page.getByText('Conta autenticada',{exact:true})).toBeVisible({timeout:30000});
 console.log(JSON.stringify({signupUi:true,signinUi:true,reloadSession:true,cloudSaveLoad:true,consentUi:true,academicProgressPreserved:true,logoutUi:true}));
}catch(error){console.error(String(error).replaceAll(process.env.RELEASE_SHARE_TOKEN,'<redacted>'));process.exitCode=1}finally{await context.close();await browser.close()}
