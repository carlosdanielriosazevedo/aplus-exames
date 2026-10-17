import {test,expect} from "@playwright/test";

test("Bloco 2.3 · aluno novo chega à primeira pergunta com até sete toques",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  let taps=0;
  const tap=async(button)=>{await button.click();taps++};
  await page.goto("/");
  await tap(page.getByRole("button",{name:/Descobrir o meu nível/u}));
  await tap(page.getByRole("button",{name:/^Matemática A\b/u}));
  await tap(page.getByRole("button",{name:"Continuar",exact:true}));
  await tap(page.getByRole("button",{name:"Já terminei o secundário",exact:true}));
  await tap(page.getByRole("button",{name:/Continuar para a matéria de Matemática A/u}));
  await tap(page.getByRole("button",{name:"Continuar",exact:true}));
  const tour=page.getByRole("button",{name:"Saltar explicação",exact:true});
  if(await tour.isVisible().catch(()=>false))await tap(tour);
  await tap(page.getByRole("button",{name:"Começar diagnóstico",exact:true}));
  await expect(page.locator(".sessionTop")).toBeVisible({timeout:30_000});
  expect(taps,"contagem desde Welcome até à primeira pergunta").toBeLessThanOrEqual(7);
});
