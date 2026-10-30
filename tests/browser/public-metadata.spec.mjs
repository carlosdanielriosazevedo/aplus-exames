import {test,expect} from "@playwright/test";

test("Bloco 4: canonical e título próprios nas páginas institucionais",async({page})=>{
  for(const [path,title] of [
    ["/privacidade","Privacidade · APProva+"],
    ["/termos","Termos de utilização · APProva+"],
    ["/piloto","Piloto · APProva+"],
    ["/piloto/encarregado","Informação para encarregado de educação · APProva+"]
  ]){
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",`https://approvamais.pt${path}`);
  }
});

test("Bloco 4: manifest e PNGs instaláveis com dimensões reais",async({page,request})=>{
  const response=await request.get("/manifest.webmanifest");
  expect(response.ok()).toBe(true);
  const manifest=await response.json();
  expect(new URL(manifest.id,"https://approvamais.pt").href).toBe("https://approvamais.pt/");
  expect(manifest.start_url).toBe("/");
  expect(manifest.scope).toBe("/");
  expect(manifest.display).toBe("standalone");
  await page.goto("/");
  for(const purpose of ["any","maskable"]){
    for(const size of [192,512]){
      const icon=manifest.icons.find(item=>item.purpose===purpose&&item.sizes===`${size}x${size}`);
      expect(icon).toBeTruthy();
      expect(icon.type).toBe("image/png");
      expect(icon.src).toContain("?v=20261030-android-restore-orange2");
      const asset=await request.get(icon.src);
      expect(asset.ok()).toBe(true);
      expect(asset.headers()["content-type"]).toContain("image/png");
      const bytes=await asset.body();
      expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(bytes.readUInt32BE(16)).toBe(size);
      expect(bytes.readUInt32BE(20)).toBe(size);

    }
  }
  await page.goto("/");
  const apple=page.locator('link[rel="apple-touch-icon"]');
  await expect(apple).toHaveAttribute("sizes","180x180");
  await expect(apple).toHaveAttribute("href",/apple-touch-icon\.png\?v=20261030-fullbleed1$/);
  const asset=await request.get(await apple.getAttribute("href"));
  expect(asset.ok()).toBe(true);
  const bytes=await asset.body();
  expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(bytes.readUInt32BE(16)).toBe(180);
  expect(bytes.readUInt32BE(20)).toBe(180);

  const versionedFavicon=page.locator('link[rel="icon"][href*="favicon.ico?v=20261030-fullbleed1"]');
  await expect(versionedFavicon).toHaveCount(1);
  const favicon=await request.get("/favicon.ico");
  expect(favicon.status()).toBe(200);
  expect(new URL(favicon.url()).pathname).toBe("/favicon.ico");
  const ico=await favicon.body();
  expect(ico.subarray(0,4).toString("hex")).toBe("00000100");
});


test("Splash aprovado: imagem real e compacta, sem alterar o manifesto instalado",async({request})=>{
  const asset=await request.get("/brand/apronso-splash-approved.webp");
  expect(asset.status()).toBe(200);
  expect(asset.headers()["content-type"]).toContain("image/webp");
  const bytes=await asset.body();
  expect(bytes.subarray(0,4).toString("ascii")).toBe("RIFF");
  expect(bytes.subarray(8,12).toString("ascii")).toBe("WEBP");
  expect(bytes.byteLength).toBeLessThan(140000);
});
