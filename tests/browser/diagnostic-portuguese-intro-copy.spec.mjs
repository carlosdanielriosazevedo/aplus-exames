import {test,expect} from "@playwright/test";

test("Bloco 2.2c · introdução de Português explica as oito perguntas sem jargão",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
  await page.getByRole("button",{name:/^Português 12\.º ano · Prova 639\b/u}).click();
  await page.getByRole("button",{name:"Continuar",exact:true}).click();
  await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
  await page.getByRole("textbox",{name:/Nota recente de/u}).fill("14");
  await page.getByRole("button",{name:/Continuar para a matéria de Português/u}).click();
  await page.getByRole("button",{name:"Continuar",exact:true}).click();
  const skip=page.getByRole("button",{name:"Saltar explicação",exact:true});
  if(await skip.isVisible().catch(()=>false))await skip.click();
  await page.locator(".adaptivePath").getByRole("button",{name:/Começar diagnóstico/iu}).click();
  await expect(page.getByRole("heading",{name:"Diagnóstico de Português"})).toBeVisible({timeout:30_000});
  await expect(page.locator(".diagIntroGrid")).toContainText("Oito perguntas para perceber o que já sabes e onde precisas de ajuda.");
  await expect(page.locator(".diagIntroGrid")).not.toContainText("Duas por domínio escrito nesta versão inicial.");
});
