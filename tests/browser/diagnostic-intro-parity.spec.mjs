import {test,expect} from "@playwright/test";

const SUBJECTS=[
  {name:"Matemática A",choice:/^Matemática A\b/u},
  {name:"Português",choice:/^Português 12\.º ano · Prova 639\b/u},
  {name:"Física e Química A",choice:/^Física e Química A\b/u}
];

for(const subject of SUBJECTS){
  test(`Bloco 2.2b · introdução do diagnóstico de ${subject.name} mantém três informações essenciais`,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    await page.goto("/");
    await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
    await page.getByRole("button",{name:subject.choice}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
    await page.getByRole("button",{name:new RegExp(`Continuar para a matéria de ${subject.name}`,"u")}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    const skip=page.getByRole("button",{name:"Saltar explicação",exact:true});
    if(await skip.isVisible().catch(()=>false))await skip.click();
    await expect(page.getByRole("heading",{name:`Diagnóstico de ${subject.name}`})).toBeVisible({timeout:30_000});
    const tiles=page.locator(".diagIntroGrid > div");
    await expect(tiles).toHaveCount(3);
    await expect(tiles.nth(0)).toContainText(/perguntas|min/u);
    await expect(tiles.nth(1)).toContainText(/matéria|necessário/u);
    await expect(tiles.nth(2)).toContainText(/Sem nota final/u);
    await expect(page.getByRole("button",{name:"Começar diagnóstico",exact:true})).toBeVisible();
  });
}
