import {test,expect} from "@playwright/test";
import {TAXONOMY,DIAGNOSTIC_BLUEPRINT} from "../../app/data/content.js";
import {diagnosticAnchor} from "../../app/lib/engine.js";
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

function emptyScores(){
  return Object.fromEntries(TAXONOMY.map(theme=>[theme.id,{domain:null,conf:0,evidence:[]}]))
}

function diagnosticFixture(){
  const startedAt=Date.now()-2_000;
  const state={
    goal:17,
    betaMode:"internal",
    selectedSubjectIds:["math-a"],
    activeSubjectId:"math-a",
    diagnosticDone:false,
    diagnosticAnswers:0,
    pedagogicalIdVersion:1,
    subjectProgress:{},
    scores:emptyScores(),
    profile:{
      schoolYear:"Já terminei o secundário",
      recentGrade:"",
      syllabus:"most",
      examTiming:"thisYear",
      optionalTopics:[],
      taughtSubtopicIds:[]
    }
  };
  const session={id:"pw-math-diagnostic-accents",kind:"diagnostic",startedAt,finishedAt:null,meta:{goal:17}};
  const first=diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[0],2,state);
  if(!first)throw new Error("Não foi possível criar a primeira pergunta do diagnóstico de Matemática A.");
  const draft=createDiagnosticDraft({session,item:first,betaMode:"internal",difficulty:2,blueprint:DIAGNOSTIC_BLUEPRINT,now:startedAt});
  return {state,draft};
}

async function expectVisibleCopyAccented(page,stage){
  const text=await page.locator("body").innerText();
  for(const [label,pattern] of BAD_VISIBLE_PATTERNS){
    expect(text,`${stage}: texto visível contém forma sem acento (${label})`).not.toMatch(pattern);
  }
}

test("Matemática A · diagnóstico completo não mostra texto sem acentos",async({page})=>{
  const {state,draft}=diagnosticFixture();
  const pageErrors=[];
  page.on("pageerror",error=>pageErrors.push(String(error)));
  await page.addInitScript(({state,draft})=>{
    const now=Date.now();
    localStorage.setItem("a25",JSON.stringify({...state,_stateVersion:31,_savedAt:now}));
    localStorage.setItem("a25-active-session-v1",JSON.stringify({...draft,savedAt:now}));
  },{state,draft});

  await page.goto("/");
  const options=page.locator(".opts button");
  await expect(options.first(),`a sessão deve recuperar no diagnóstico; ecrã atual: ${await page.locator("body").innerText().catch(()=>"")}`).toBeVisible({timeout:30_000});

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
  expect(pageErrors,"não deve haver erros não tratados na consola").toEqual([]);
});
