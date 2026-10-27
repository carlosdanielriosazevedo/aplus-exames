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
  test("existing onboarding entry resumes without landing",async({page})=>{
    await page.addInitScript(()=>sessionStorage.setItem("a25-onboarding-entry","1"));
    await page.goto("/");
    await expect(page.getByRole("button",{name:/descobrir o meu nível/i})).toBeHidden({timeout:30000});
  });
});
