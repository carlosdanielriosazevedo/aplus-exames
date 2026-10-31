import {test,expect} from "@playwright/test";
import {createHash} from "node:crypto";

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
  expect(manifest.name).toBe("APProva+");
  expect(manifest.short_name).toBe("APProva+");
  expect(manifest.background_color).toBe("#01133d");
  // Ícone só para o splash nativo: 1024 maskable, cor de fundo uniforme.
  // O launcher (ideal ~83dp) continua a escolher o maskable 512.
  const splashOnly=manifest.icons.find(item=>item.sizes==="1024x1024");
  expect(splashOnly.purpose).toBe("maskable");
  expect(splashOnly.src).toContain("/icons/splash-blank-1024.png?v=20261031-android-v3");
  expect(manifest.icons.filter(item=>item.purpose.split(" ").includes("any")).every(item=>item.sizes!=="1024x1024")).toBe(true);
  await page.goto("/");
  const iconHashes={};
  for(const purpose of ["any","maskable"]){
    for(const size of [192,512]){
      const icon=manifest.icons.find(item=>item.purpose===purpose&&item.sizes===`${size}x${size}`);
      expect(icon).toBeTruthy();
      expect(icon.type).toBe("image/png");
      expect(icon.src).toContain("?v=20261031-android-v3");
      const asset=await request.get(icon.src);
      expect(asset.ok()).toBe(true);
      expect(asset.headers()["content-type"]).toContain("image/png");
      const bytes=await asset.body();
      expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(bytes.readUInt32BE(16)).toBe(size);
      expect(bytes.readUInt32BE(20)).toBe(size);
      const actualSha=createHash("sha256").update(bytes).digest("hex");
      // "any": logótipo com cantos arredondados transparentes (igual ao aprovado).
      // "maskable": mesma arte em quadrado completo — o Android aplica a forma
      // do launcher por cima, sem cantos brancos/pretos.
      const expectedSha={
        any:{192:"0def2b1481f8f79d134b6d95c7812ee12c5c14d7ad17be607435335dff81b8a8",512:"3c873a2363f9ec09b09ac2eb798cde54aa5965dc51b8bc8efc7bce5572be5c51"},
        maskable:{192:"843d6d7114798e837f9578e43252ef95931be3d31afaa118e89c9ed1e61f9134",512:"4a0f485b1c4c2552111ae8dd813a096769baa4a64bac2f8f29ce6ea909a1cb01"}
      }[purpose][size];
      expect(actualSha).toBe(expectedSha);
      if(purpose==="any")iconHashes[size]=actualSha;
      else expect(actualSha).not.toBe(iconHashes[size]);
      // Confere o tratamento dos cantos para evitar a moldura laranja
      // no splash nativo gerado pelo Chrome/WebAPK Android.
      const pixels=await page.evaluate(async([src,purpose])=>{
        const img=new Image();
        img.src=src;
        await img.decode();
        const canvas=document.createElement("canvas");
        canvas.width=img.naturalWidth;
        canvas.height=img.naturalHeight;
        const context=canvas.getContext("2d");
        context.drawImage(img,0,0);
        const at=(x,y)=>Array.from(context.getImageData(x,y,1,1).data);
        const pixels=context.getImageData(0,0,img.naturalWidth,img.naturalHeight).data;
        let plusPixels=0;
        for(let y=Math.round(img.naturalHeight*.65);y<img.naturalHeight;y++)
          for(let x=Math.round(img.naturalWidth*.65);x<img.naturalWidth;x++){
            const i=(y*img.naturalWidth+x)*4;
            if(pixels[i]>185&&pixels[i+1]>115&&pixels[i+2]<140&&pixels[i+3]>200)plusPixels++;
          }
        // No maskable a arte está reduzida a 81,5% e centrada (zona visível do launcher).
        const k=purpose==="maskable"?.815:1, o=(1-k)/2, bx=purpose==="maskable"?.93:.82, by=purpose==="maskable"?.65:.78;
        return {corner:at(0,0),blue:at(Math.round(img.naturalWidth*(o+k*bx)),Math.round(img.naturalHeight*(o+k*by))),plusPixels};
      },[icon.src,purpose]);
      if(purpose==="any")expect(pixels.corner[3]).toBe(0);
      else expect(pixels.corner[3]).toBe(255);
      expect(pixels.blue[2]).toBeGreaterThan(pixels.blue[0]+40);
      expect(pixels.plusPixels).toBeGreaterThan(size===192?200:1200);


    }
  }
  await page.goto("/");
  const apple=page.locator('link[rel="apple-touch-icon"]');
  await expect(apple).toHaveAttribute("sizes","180x180");
  await expect(apple).toHaveAttribute("href",/apple-touch-icon\.png\?v=20261030-user-originals-v1$/);
  const asset=await request.get(await apple.getAttribute("href"));
  expect(asset.ok()).toBe(true);
  const bytes=await asset.body();
  expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(bytes.readUInt32BE(16)).toBe(180);
  expect(bytes.readUInt32BE(20)).toBe(180);

  const versionedFavicon=page.locator('link[rel="icon"][href*="favicon.ico?v=20261030-user-originals-v1"]');
  await expect(versionedFavicon).toHaveCount(1);
  const favicon=await request.get("/favicon.ico");
  expect(favicon.status()).toBe(200);
  expect(new URL(favicon.url()).pathname).toBe("/favicon.ico");
  const ico=await favicon.body();
  expect(ico.subarray(0,4).toString("hex")).toBe("00000100");
});


test("Splash final: PNG original enviado pelo utilizador, sem transformação",async({request,page})=>{
  const asset=await request.get("/brand/approva-splash-20261031.png?v=20261031-android-v2");
  expect(asset.status()).toBe(200);
  expect(asset.headers()["content-type"]).toContain("image/png");
  const bytes=await asset.body();
  expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(bytes.readUInt32BE(16)).toBe(941);
  expect(bytes.readUInt32BE(20)).toBe(1672);
  expect(createHash("sha256").update(bytes).digest("hex")).toBe("a5edd39c367659eaa47604a3d376ef4fd28033ee112d8c7e0bf294eb6fee07de");
  await page.goto("/");
  const dimensions=await page.evaluate(async()=>{
    const img=new Image();
    img.src="/brand/approva-splash-20261031.webp?v=20261031-android-v2";
    await img.decode();
    return [img.naturalWidth,img.naturalHeight];
  });
  expect(dimensions).toEqual([941,1672]);
});
test("Ícone aprovado igual em Android, iOS e favicon",async({request})=>{
  const apple=await request.get("/icons/apple-touch-icon.png?v=20261030-user-originals-v1");
  expect(apple.status()).toBe(200);
  expect(createHash("sha256").update(await apple.body()).digest("hex")).toBe("c8892dd366321244b41d289917d976b3e9be06b0c473174d84a1cb3cec30480b");
  const favicon=await request.get("/favicon.ico");
  expect(favicon.status()).toBe(200);
  expect(createHash("sha256").update(await favicon.body()).digest("hex")).toBe("e9d21a7b6a8c3a795125a392dbae3e6d9dcdd12a13e954a0e9100bdf36b68bd5");
});

test("Arranque não inclui camada bloqueante e mantém a imagem original",async({page})=>{
  await page.goto("/");
  await expect(page.locator(".apronsoLaunchOverlay")).toHaveCount(0);
  // Num separador normal do browser o ecrã de abertura não aparece.
  await expect(page.locator(".approvaLaunch")).toBeHidden();
  const asset=await page.request.get("/brand/approva-splash-20261031.png?v=20261031-android-v2");
  expect(asset.ok()).toBe(true);
  expect(asset.headers()["content-type"]).toContain("image/png");
});

// Regression: if hydration/JS is unavailable, the installed entry must not
// leave a full-screen logo indefinitely with no way to proceed.
test("Sem JavaScript, entrada tem HTML utilizável em vez de splash infinito",async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  try{
    const page=await context.newPage();
    await page.goto("/");
    await expect(page.locator(".apronsoLaunchOverlay")).toHaveCount(0);
    await expect(page.getByRole("button",{name:/Descobrir o meu nível/})).toBeVisible();
    await expect(page.locator(".apronsoStartup")).toHaveCount(0);
  }finally{await context.close()}
});

test("URL de recuperação não apaga o progresso armazenado",async({page})=>{
  await page.addInitScript(()=>window.localStorage.setItem("a25","{}"));
  await page.goto("/?recuperar=inicio");
  await expect(page.getByRole("button",{name:/Descobrir o meu nível/})).toBeVisible();
  expect(await page.evaluate(()=>window.localStorage.getItem("a25"))).toBe("{}");
  await expect(page.locator(".apronsoLaunchOverlay")).toHaveCount(0);
});
