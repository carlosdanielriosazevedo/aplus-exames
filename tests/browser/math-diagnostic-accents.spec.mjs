import {test,expect} from "@playwright/test";

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

async function expectVisibleCopyAccented(page,stage){
  const text=await page.locator("body").innerText();
  for(const [label,pattern] of BAD_VISIBLE_PATTERNS){
    expect(text,`${stage}: texto visível contém forma sem acento (${label})`).not.toMatch(pattern);
  }
}

async function reachMathDiagnostic(page){
  await page.goto("/");
  await expect(page.getByRole("button",{name:/Descobrir o meu nível/})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:/Descobrir o meu nível/}).click();

  await expect(page.getByRole("heading",{name:"Que disciplinas queres preparar?"})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:/Matemática A/}).click();
  await page.getByRole("button",{name:"Continuar",exact:true}).click();

  await expect(page.getByRole("heading",{name:/Ajuda a .* começar no sítio certo/})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
  await page.getByRole("button",{name:/Continuar para a matéria de Matemática A/}).click();

  await expect(page.getByRole("heading",{name:"Todo o programa de Matemática A fica disponível."})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Continuar",exact:true}).click();

  await expect(page.getByRole("button",{name:"Saltar explicação",exact:true})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Saltar explicação",exact:true}).click();
  await expect(page.getByRole("button",{name:"Começar diagnóstico",exact:true})).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Começar diagnóstico",exact:true}).click();

  const options=page.locator(".opts button");
  await expect(options.first()).toBeVisible({timeout:30_000});
  return options;
}

test("Matemática A · diagnóstico completo não mostra texto sem acentos",async({page})=>{
  const pageErrors=[];
  page.on("pageerror",error=>pageErrors.push(String(error)));
  const options=await reachMathDiagnostic(page);

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
