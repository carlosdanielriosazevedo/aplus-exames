import {test,expect} from "@playwright/test";

test("Bloco 2.4 · nota de disponibilidade legível e cartões Brevemente intactos",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
  const note=page.getByText("Atualmente disponíveis: Matemática A, Português e Física e Química A.",{exact:true});
  await expect(note).toBeVisible();
  const style=await note.evaluate(el=>{const s=getComputedStyle(el);return {fontSize:parseFloat(s.fontSize),color:s.color}});
  expect(style.fontSize,"a nota deve ter pelo menos 12px").toBeGreaterThanOrEqual(12);
  const coming=page.locator(".subjectCard.coming");
  expect(await coming.count(),"os cartões Brevemente continuam presentes").toBeGreaterThan(0);
  for(const card of await coming.all()){
    await expect(card).toBeDisabled();
  }
});
