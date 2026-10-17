import {test,expect} from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../../app/data/vnextDiagnostic.js";
import {createDiagnosticDraft} from "../../app/lib/diagnosticRecovery.js";

const BAD_VISIBLE_PATTERNS=[
  ["expressao/expressoes",/\bexpressao(?:es)?\b/iu],
  ["obtem-se",/\bobtem-se\b/iu],
  ["funcao/funcoes",/\bfuncao(?:es)?\b/iu],
  ["taxa media de variacao",/\btaxa media de variacao\b/iu],
  ["nao",/\bnao\b/iu],
  ["situacao/situacoes",/\bsituacao(?:es)?\b/iu],
  ["posicao/posicoes",/\bposicao(?:es)?\b/iu],
  ["grafico/graficos",/\bgrafico(?:s)?\b/iu],
  ["equacao/equacoes",/\bequacao(?:es)?\b/iu],
  ["Qual e",/\bQual e\b/u],
  ["area e",/\barea e\b/iu]
];

const PROOF_ITEM_ID="DG-VN11CD-DP-011";
const PROOF_ITEM=VNEXT_DIAGNOSTIC_QUESTIONS.find(item=>item.id===PROOF_ITEM_ID);
if(!PROOF_ITEM)throw new Error(`Pergunta de prova estável ${PROOF_ITEM_ID} não encontrada.`);

async function expectVisibleCopyAccented(page,stage){
  const text=await page.locator("body").innerText();
  for(const [label,pattern] of BAD_VISIBLE_PATTERNS){
    expect(text,`${stage}: texto visível contém forma sem acento (${label})`).not.toMatch(pattern);
  }
}

async function expectScreenCopy(page,needle,stage,runtimeErrors=[]){
  await expect.poll(async()=>await page.locator("body").innerText(),{
    timeout:30_000,
    message:`${stage}: ecrã esperado ausente. Runtime errors: ${runtimeErrors.join(" | ")||"nenhum capturado"}. Texto visível: ${await page.locator("body").innerText()}`
  }).toContain(needle);
}

async function waitForReactHandlers(page,selector){
  await page.waitForFunction(sel=>{
    const node=document.querySelector(sel);
    if(!node)return false;
    return Object.keys(node).some(key=>key.startsWith("__reactProps$")||key.startsWith("__reactFiber$"));
  },selector,{timeout:30_000});
}

function captureRuntimeErrors(page){
  const errors=[];
  page.on("pageerror",error=>errors.push(`pageerror: ${String(error)}`));
  page.on("console",msg=>{if(msg.type()==="error")errors.push(`console.error: ${msg.text()}`)});
  return errors;
}

async function seedKnownBadDiagnostic(page){
  const now=Date.now();
  const session={id:"browser-accent-proof",kind:"diagnostic",startedAt:now-1000,finishedAt:null,meta:{}};
  const draft=createDiagnosticDraft({
    session,
    item:PROOF_ITEM,
    difficulty:PROOF_ITEM.difficulty,
    blueprint:[PROOF_ITEM.subtopicId||PROOF_ITEM.themeId],
    now:now-1000
  });
  const state={
    goal:17,
    diagnosticDone:false,
    diagnosticAnswers:0,
    selectedSubjectIds:["math-a"],
    activeSubjectId:"math-a",
    subjectProgress:{},
    subjectProgressModelVersion:1,
    pedagogicalIdVersion:1,
    betaMode:"internal",
    firstUseTourCompleted:true,
    profile:{schoolYear:"Já terminei o secundário",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},
    _stateVersion:31,
    _savedAt:now
  };
  await page.addInitScript(({state,draft,now})=>{
    localStorage.setItem("a25",JSON.stringify(state));
    localStorage.setItem("a25-active-session-v1",JSON.stringify({...draft,savedAt:now}));
  },{state,draft,now});
}

async function reachMathDiagnostic(page,runtimeErrors){
  await page.goto("/");
  const cta=page.getByRole("button",{name:/Descobrir o meu nível/});
  await expect(cta).toBeVisible({timeout:30_000});
  await waitForReactHandlers(page,"button");
  await cta.click();
  await expectScreenCopy(page,"Que disciplinas queres preparar?","depois do CTA inicial",runtimeErrors);

  await page.getByRole("button",{name:/Matemática A/}).click();
  await page.getByRole("button",{name:"Continuar",exact:true}).click();

  await expect(page.getByRole("heading",{name:/Ajuda a .* começar no sítio certo/})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
  await page.getByRole("button",{name:/Continuar para a matéria de Matemática A/}).click();

  await expect(page.getByRole("heading",{name:"Todo o programa de Matemática A fica disponível."})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Continuar",exact:true}).click();

  const optionalTour=page.getByRole("button",{name:"Saltar explicação",exact:true});
  if(await optionalTour.isVisible().catch(()=>false))await optionalTour.click();
  await expect(page.getByRole("button",{name:"Começar diagnóstico",exact:true})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Começar diagnóstico",exact:true}).click();

  const options=page.locator(".opts button");
  await expect(options.first()).toBeVisible({timeout:30_000});
  return options;
}

test("Matemática A · pergunta conhecida não mostra texto sem acentos",async({page})=>{
  const runtimeErrors=captureRuntimeErrors(page);
  await seedKnownBadDiagnostic(page);
  await page.goto("/");
  const options=page.locator(".opts button");
  await expect(options.first()).toBeVisible({timeout:30_000});

  await expectVisibleCopyAccented(page,"pergunta conhecida · antes de responder");
  const wrong=(PROOF_ITEM.a+1)%PROOF_ITEM.o.length;
  await options.nth(wrong).click();
  await page.getByRole("button",{name:"Responder",exact:true}).click();
  await expect(page.locator(".answerFeedback")).toBeVisible();
  await expectVisibleCopyAccented(page,"pergunta conhecida · feedback");
  expect(runtimeErrors,"não deve haver erros de cliente nem console.error").toEqual([]);
});

test("Matemática A · diagnóstico completo não mostra texto sem acentos",async({page})=>{
  const runtimeErrors=captureRuntimeErrors(page);
  const options=await reachMathDiagnostic(page,runtimeErrors);

  let completed=false;
  for(let step=0;step<30;step++){
    if(await page.getByRole("heading",{name:"Podemos criar o teu primeiro plano."}).isVisible().catch(()=>false)){
      completed=true;
      break;
    }
    await expect(options.first()).toBeVisible();
    await expectVisibleCopyAccented(page,`pergunta ${step+1} · antes de responder`);
    await options.first().click();
    await page.getByRole("button",{name:"Responder",exact:true}).click();
    await expect(page.locator(".answerFeedback")).toBeVisible();
    await expectVisibleCopyAccented(page,`pergunta ${step+1} · feedback`);
    await page.getByRole("button",{name:/Próxima pergunta/}).click();
  }

  if(!completed)completed=await page.getByRole("heading",{name:"Podemos criar o teu primeiro plano."}).isVisible().catch(()=>false);
  expect(completed,"o diagnóstico deve chegar ao ecrã de resultado").toBe(true);
  await expectVisibleCopyAccented(page,"resultado final");
  expect(runtimeErrors,"não deve haver erros de cliente nem console.error").toEqual([]);
});

test("Matemática A · fontes versionadas não contêm cópia visível sem acentos",()=>{
  const targets=[
    "app/data/vnextDiagnostic.js",
    "app/data/vnextMission.js",
    "app/data/vnextExam.js"
  ];
  const root="content/vnext/math-a/11";
  function collect(dir){
    return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
      const filename=path.join(dir,entry.name);
      return entry.isDirectory()?collect(filename):entry.name.endsWith(".json")?[filename]:[];
    });
  }
  targets.push(...collect(root));
  for(const filename of targets){
    const content=fs.readFileSync(filename,"utf8");
    for(const [label,pattern] of BAD_VISIBLE_PATTERNS){
      expect(content,`${filename} contém padrão sem acento: ${label}`).not.toMatch(pattern);
    }
  }
});
