import {test,expect} from "@playwright/test";

for(const year of ["10.º","12.º"]){
  test(`Bloco 2.2d · aviso da matéria dada de Português respeita o ${year}`,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    await page.goto("/");
    await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
    await page.getByRole("button",{name:/^Português 12\.º ano · Prova 639\b/u}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    await page.getByRole("button",{name:year,exact:true}).click();
    await page.getByRole("button",{name:/Continuar para a matéria de Português/u}).click();
    await expect(page.getByRole("heading",{name:`O que já deste no ${year}?`})).toBeVisible({timeout:30_000});
    const notice=page.locator(".notice.warning").filter({hasText:"Ainda não assinalaste matéria deste ano"});
    await expect(notice).toBeVisible();
    if(year==="10.º")await expect(notice).toContainText("No 10.º ano, o diagnóstico e as missões ficam indisponíveis");
    else{
      await expect(notice).not.toContainText("No 10.º ano");
      await expect(notice).toContainText("Podes continuar a preparar-te com a matéria dos anos anteriores.");
    }
  });
}
