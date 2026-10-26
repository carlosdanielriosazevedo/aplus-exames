import {test,expect} from '@playwright/test';
for(const schoolYear of ['11.º','12.º'])test(`Português · ${schoolYear} sem matéria atual permite continuar com anos anteriores`,async({page})=>{
 await page.goto('/');
 await page.getByRole('button',{name:/Descobrir o meu nível/}).click();
 await page.getByRole('button',{name:/^Português 12.º ano · Prova 639/}).click();
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await page.getByRole('button',{name:schoolYear,exact:true}).click();
 await page.getByRole('textbox',{name:'Nota recente de Português',exact:true}).fill('14');
 await page.getByRole('button',{name:'Continuar para a matéria de Português',exact:true}).click();
 await expect(page.getByText('Ainda não assinalaste matéria deste ano',{exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Continuar',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await expect(page.getByRole('heading',{name:'O teu próximo passo.',exact:true})).toBeVisible();
 await page.reload();
 await page.locator('.adaptivePath').getByRole('button',{name:'Começar diagnóstico',exact:true}).click();
 await page.getByRole('button',{name:'Começar diagnóstico',exact:true}).click();
 await expect(page.getByRole('button',{name:'Responder',exact:true})).toBeVisible();
 const scope=await page.evaluate(()=>{
  const s=JSON.parse(localStorage.getItem('a25'));
  return {year:s.profile.schoolYear,taught:s.subjectSettings.portuguese.taughtUnitIds,items:s.subjectProgress.portuguese.lastPosition.itemIds};
 });
 expect(scope.year).toBe(schoolYear);expect(scope.taught).toEqual([]);expect(scope.items.length).toBeGreaterThan(0);
 // Check the year actually shown for every question, independently of the scope predicate.
 for(let i=0;i<scope.items.length;i++){
  const label=await page.locator('.sessionContext>b').innerText();
  const year=label.match(/(10|11|12)\.º/);
  expect(year,`visible question year: ${label}`).toBeTruthy();
  expect(Number(year[1]),`no untaught current-year question: ${label}`).toBeLessThan(parseInt(schoolYear));
  const options=page.locator('.portugueseOptions button');
  if(await options.count())await options.first().click();
  else await page.locator('.portugueseShortAnswer,.portugueseOpenAnswer').fill('Resposta sintética para verificar apenas o âmbito curricular.');
  await page.getByRole('button',{name:'Responder',exact:true}).click();
  await page.getByRole('button',{name:/^(Próxima pergunta|Ver resultado)$/}).click();
 }
 await expect(page.getByRole('button',{name:'Ir para o menu inicial',exact:true})).toBeVisible();
});
