import {test,expect} from "@playwright/test";

// Verifica a semântica ARIA com Chromium real. O componente em si é auditado
// separadamente no percurso real; esta fixture protege o contrato da árvore CDP.
test("fórmulas: imagem acessível única, sem StaticText descendente",async({page})=>{
  const formulas=["P(A)=3/5","√52","√(a+b)","σ/√n","f(x)=a^x","x^1/2","√((a+b)²)"];
  const escape=value=>value.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;");
  await page.setContent(formulas.map((formula,index)=>
    `<code data-formula="${index}"><span role="img" aria-label="${escape(formula)}"><span aria-hidden="true">${escape(formula)}</span></span></code>`
  ).join(""));
  const session=await page.context().newCDPSession(page);
  await session.send("Accessibility.enable");
  const {nodes}=await session.send("Accessibility.getFullAXTree");
  for(let index=0;index<formulas.length;index++){
    const objectId=await page.locator(`[data-formula="${index}"] [role="img"]`).evaluate(el=>{
      el.dataset.axProbe="yes";
      return el.getAttribute("aria-label");
    });
    expect(objectId).toBe(formulas[index]);
  }
  const images=nodes.filter(node=>!node.ignored&&node.role?.value==="image");
  expect(images.map(node=>node.name?.value)).toEqual(formulas);
  for(const image of images){
    const reachable=new Set();
    const queue=[...(image.childIds||[])];
    while(queue.length){
      const id=queue.pop();
      if(reachable.has(id))continue;
      reachable.add(id);
      const child=nodes.find(node=>node.nodeId===id);
      if(child)queue.push(...(child.childIds||[]));
      expect(child?.ignored===false&&child?.role?.value==="StaticText").toBe(false);
    }
  }
});
