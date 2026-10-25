import {test,expect} from "@playwright/test";

// WCAG 1.4.3: todo o texto visível e ativo tem de ter contraste mínimo 4,5:1 (3:1 se grande).
// Mede cada texto sobre o fundo real, sem semear estado: percurso feito pela interface.
async function lowContrastTexts(page){
  return page.evaluate(()=>{
    const parse=value=>{const m=value.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)(?:[, /]+([\d.]+))?/);return m?[+m[1],+m[2],+m[3],m[4]===undefined?1:+m[4]]:null};
    const lum=c=>{const v=c.map(x=>{x/=255;return x<=.03928?x/12.92:((x+.055)/1.055)**2.4});return .2126*v[0]+.7152*v[1]+.0722*v[2]};
    const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
    const over=(f,b)=>[0,1,2].map(i=>Math.round(f[i]*f[3]+b[i]*(1-f[3])));
    const backgroundOf=el=>{const layers=[];let c=el;while(c){const p=parse(getComputedStyle(c).backgroundColor);if(p&&p[3]>0){layers.push(p);if(p[3]>=1)break}c=c.parentElement}let base=[255,255,255];for(const l of layers.reverse())base=over(l,base);return base};
    const opacityOf=el=>{let o=1,c=el;while(c){o*=+getComputedStyle(c).opacity;c=c.parentElement}return o};
    const failures=[];
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const text=node.textContent.trim();
      if(!text)continue;
      const el=node.parentElement,style=getComputedStyle(el),box=el.getBoundingClientRect();
      if(!box.width||style.display==="none"||style.visibility==="hidden")continue;
      if(el.closest("button:disabled,[aria-disabled=true],.brandName,.logo"))continue;
      const bg=backgroundOf(el),fg0=parse(style.color);
      const fg=over([fg0[0],fg0[1],fg0[2],fg0[3]*opacityOf(el)],bg);
      const size=parseFloat(style.fontSize),bold=parseInt(style.fontWeight)>=700;
      const need=size>=24||(size>=18.66&&bold)?3:4.5;
      const got=ratio(fg,bg);
      if(got<need)failures.push(`${got.toFixed(2)}:1 < ${need} · "${text.slice(0,40)}" · ${el.tagName.toLowerCase()}.${String(el.className).trim().split(/\s+/).join(".")}`);
    }
    return [...new Set(failures)];
  });
}

const SUBJECTS=[
  {id:"math-a",name:"Matemática A",button:/^Matemática A\b/u},
  {id:"portuguese",name:"Português",button:/^Português 12\.º ano · Prova 639\b/u},
  {id:"physics-chemistry-a",name:"Física e Química A",button:/^Física e Química A\b/u}
];

test("Contraste AA · landing e escolha de disciplinas",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/");
  await expect(page.getByRole("button",{name:/Descobrir o meu nível/u})).toBeVisible({timeout:30_000});
  expect(await lowContrastTexts(page),"landing").toEqual([]);
  await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
  await expect(page.getByText("Atualmente disponíveis",{exact:false})).toBeVisible();
  expect(await lowContrastTexts(page),"escolha de disciplinas").toEqual([]);
});

for(const subject of SUBJECTS){
  test(`Contraste AA · ${subject.id} · pergunta do diagnóstico (percurso real)`,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    await page.goto("/");
    await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
    await page.getByRole("button",{name:subject.button}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
    await page.getByRole("textbox",{name:/Nota recente de/u}).fill("14");
    await page.getByRole("button",{name:new RegExp(`Continuar para a matéria de ${subject.name}`,"u")}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    const skip=page.getByRole("button",{name:"Saltar explicação",exact:true});
    if(await skip.isVisible().catch(()=>false))await skip.click();
    await page.locator(".adaptivePath").getByRole("button",{name:/Começar diagnóstico/iu}).click();
    await page.getByRole("button",{name:"Começar diagnóstico",exact:true}).click();
    await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible({timeout:30_000});
    expect(await lowContrastTexts(page),"pergunta").toEqual([]);
    await page.locator(".opts button:visible, .portugueseOptions button:visible").first().click();
    expect(await lowContrastTexts(page),"alternativa selecionada").toEqual([]);
    await page.getByRole("button",{name:"Responder",exact:true}).click();
    await expect(page.getByRole("button",{name:/Próxima pergunta|Seguinte/u}).first()).toBeVisible();
    expect(await lowContrastTexts(page),"feedback").toEqual([]);
  });
}
