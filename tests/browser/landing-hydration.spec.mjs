import {test,expect} from "@playwright/test";

test.describe("Landing hydration and existing session",()=>{
  for(const size of [{width:390,height:844},{width:1280,height:800}]){
    test(`landing click works at ${size.width}px`,async({page})=>{
      await page.setViewportSize(size);
      await page.goto("/",{waitUntil:"domcontentloaded"});
      const start=page.getByRole("button",{name:/descobrir o meu nível/i});
      await expect(start).toBeVisible();
      await expect(start).toBeEnabled();
      await start.click();
      await expect(start).toBeHidden({timeout:30000});
      await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem("a25-onboarding-entry"))).toBe("1");
    });
  }
  test("public content and links are available without JavaScript",async({browser})=>{
    const context=await browser.newContext({javaScriptEnabled:false});
    const page=await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading",{name:/a tua melhor nota/i})).toBeVisible();
    await expect(page.getByRole("link",{name:"Privacidade"})).toBeVisible();
    await expect(page.getByRole("link",{name:"Termos de utilização"})).toBeVisible();
    await expect(page.getByRole("button",{name:/descobrir o meu nível/i})).toHaveAttribute("name","entrada");
    await expect(page.getByRole("button",{name:/descobrir o meu nível/i})).toHaveAttribute("value","1");
    await context.close();
  });
  test("entry works before delayed React hydration",async({page})=>{
    await page.route("**/_next/static/**/*.js",async route=>{
      await new Promise(resolve=>setTimeout(resolve,3000));
      await route.continue();
    });
    await page.goto("/",{waitUntil:"domcontentloaded"});
    const entry=page.getByRole("button",{name:/descobrir o meu nível/i});
    await expect(entry).toBeVisible();
    await entry.click({noWaitAfter:true});
    await expect(page.getByRole("heading",{name:"Que disciplinas queres preparar?"})).toBeVisible({timeout:30000});
    await expect.poll(()=>page.evaluate(()=>sessionStorage.getItem("a25-onboarding-entry"))).toBe("1");
    await expect(page).not.toHaveURL(/(?:[?&])entrada=1(?:&|$)/);
    await expect(entry).toBeHidden();
  });
  test("landing CTA preserves orange styling and hover",async({page})=>{
    await page.goto("/");
    const button=page.getByRole("button",{name:/descobrir o meu nível/i});
    await expect(button).toBeVisible();
    await expect(button).toHaveCSS("background-color","rgb(255, 178, 36)");
    await expect(button).toHaveCSS("color","rgb(16, 43, 66)");
    await button.hover();
    await expect(button).toHaveCSS("background-color","rgb(255, 173, 25)");
  });
  test("existing onboarding entry resumes without landing",async({page})=>{
    await page.addInitScript(()=>sessionStorage.setItem("a25-onboarding-entry","1"));
    await page.goto("/");
    await expect(page.getByRole("button",{name:/descobrir o meu nível/i})).toBeHidden({timeout:30000});
  });
});
