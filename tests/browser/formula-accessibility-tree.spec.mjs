import {test,expect} from "@playwright/test";

// Exercita o componente DeepReviewStudy real, numa rota de teste fechada
// em produção, e inspeciona a árvore de acessibilidade do Chromium via CDP.
test("DeepReviewStudy real: uma imagem nomeada, sem texto filho parcial",async({page})=>{
  const formulas=["P(A)=3/5","√52","√(a+b)","σ/√n","f(x)=a^x","x^1/2","√((a+b)²)"];
  await page.goto("/internal/formula-a11y");
  await expect(page.getByRole("heading",{name:"Fórmulas de controlo"})).toBeVisible();
  const root=page.locator('[aria-label="Relações essenciais de Fórmulas de controlo"]');
  await expect(root.locator("code")).toHaveCount(formulas.length);
  const session=await page.context().newCDPSession(page);
  await session.send("Accessibility.enable");
  const {nodes}=await session.send("Accessibility.getFullAXTree");
  const byId=new Map(nodes.map(node=>[node.nodeId,node]));
  const images=nodes.filter(node=>!node.ignored&&node.role?.value==="image"&&formulas.includes(node.name?.value));
  expect(images.map(node=>node.name?.value)).toEqual(formulas);
  for(const image of images){
    const visited=new Set();
    const queue=[...(image.childIds||[])];
    while(queue.length){
      const id=queue.pop();
      if(visited.has(id))continue;
      visited.add(id);
      const child=byId.get(id);
      if(!child)continue;
      expect(child.ignored===false&&child.role?.value==="StaticText",
        `StaticText descendente de ${image.name.value}`).toBe(false);
      queue.push(...(child.childIds||[]));
    }
  }
  // Não pode existir texto parcial fora do nó img dentro da caixa.
  for(const formula of formulas){
    await expect(root.getByRole("img",{name:formula,exact:true})).toHaveCount(1);
  }
});
