import {test,expect} from "@playwright/test";

test("Bloco 2.5 · consentimento do piloto sem marcador provisório na descrição da conta",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/piloto");
  const copy=page.locator("main p").filter({hasText:"O que guardamos:"});
  await expect(copy).toBeVisible({timeout:30_000});
  await expect(copy).not.toContainText("([email e nome que usares])");
  await expect(copy).toContainText("o nome e o endereço de email que utilizares na conta");
  await expect(page.getByRole("button",{name:"Participar no piloto"})).toBeDisabled();
});
