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
  expect(manifest.background_color).toBe("#08132e");
  await page.goto("/");
  for(const purpose of ["any","maskable"]){
    for(const size of [192,512]){
      const icon=manifest.icons.find(item=>item.purpose===purpose&&item.sizes===`${size}x${size}`);
      expect(icon).toBeTruthy();
      expect(icon.type).toBe("image/png");
      expect(icon.src).toContain("?v=20261030-exact-approved-final");
      const asset=await request.get(icon.src);
      expect(asset.ok()).toBe(true);
      expect(asset.headers()["content-type"]).toContain("image/png");
      const bytes=await asset.body();
      expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(bytes.readUInt32BE(16)).toBe(size);
      expect(bytes.readUInt32BE(20)).toBe(size);
      // Confere o tratamento dos cantos para evitar a moldura laranja
      // no splash nativo gerado pelo Chrome/WebAPK Android.
      const pixels=await page.evaluate(async(src)=>{
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
        return {corner:at(0,0),blue:at(Math.round(img.naturalWidth*.82),Math.round(img.naturalHeight*.68)),plusPixels};
      },icon.src);
      if(purpose==="any")expect(pixels.corner[3]).toBe(0);
      else expect(pixels.corner.slice(0,3)).toEqual([8,19,46]);
      expect(pixels.blue[2]).toBeGreaterThan(pixels.blue[0]+40);
      expect(pixels.plusPixels).toBeGreaterThan(size===192?200:1200);


    }
  }
  await page.goto("/");
  const apple=page.locator('link[rel="apple-touch-icon"]');
  await expect(apple).toHaveAttribute("sizes","180x180");
  await expect(apple).toHaveAttribute("href",/apple-touch-icon\.png\?v=20261030-exact-approved-final$/);
  const asset=await request.get(await apple.getAttribute("href"));
  expect(asset.ok()).toBe(true);
  const bytes=await asset.body();
  expect(bytes.subarray(0,8).toString("hex")).toBe("89504e470d0a1a0a");
  expect(bytes.readUInt32BE(16)).toBe(180);
  expect(bytes.readUInt32BE(20)).toBe(180);

  const versionedFavicon=page.locator('link[rel="icon"][href*="favicon.ico?v=20261030-exact-approved-final"]');
  await expect(versionedFavicon).toHaveCount(1);
  const favicon=await request.get("/favicon.ico");
  expect(favicon.status()).toBe(200);
  expect(new URL(favicon.url()).pathname).toBe("/favicon.ico");
  const ico=await favicon.body();
  expect(ico.subarray(0,4).toString("hex")).toBe("00000100");
});


test("Splash FINAL: ficheiro da imagem 1, WebP sem perda de píxeis",async({request,page})=>{
  const asset=await request.get("/brand/apronso-splash-final.webp?v=20261030-exact-approved-final");
  expect(asset.status()).toBe(200);
  expect(asset.headers()["content-type"]).toContain("image/webp");
  const bytes=await asset.body();
  expect(bytes.subarray(0,4).toString("ascii")).toBe("RIFF");
  expect(bytes.subarray(8,12).toString("ascii")).toBe("WEBP");
  expect(bytes.length).toBeLessThan(1100000);
  expect(createHash("sha256").update(bytes).digest("hex")).toBe("b6a2b1b69f0f355964128d30c0745fd0cb7fcfeb048904a8b8d9969ff3654579");
  await page.goto("/");
  const dimensions=await page.evaluate(async()=>{
    const img=new Image();
    img.src="/brand/apronso-splash-final.webp?v=20261030-exact-approved-final";
    await img.decode();
    return [img.naturalWidth,img.naturalHeight];
  });
  expect(dimensions).toEqual([941,1672]);
});
test("Ícones oficiais para iOS e favicon têm os novos ficheiros",async({request})=>{
  const apple=await request.get("/icons/apple-touch-icon.png?v=20261030-exact-approved-final");
  expect(apple.status()).toBe(200);
  expect(createHash("sha256").update(await apple.body()).digest("hex")).toBe("7fb21454e92b724f48ab433ddbe750ffcd4b5b98f63ba0e34c71a4ee09cff4ce");
  const favicon=await request.get("/favicon.ico");
  expect(favicon.status()).toBe(200);
  expect(createHash("sha256").update(await favicon.body()).digest("hex")).toBe("501a6892a252e2b8ccc0182a7e49f43f0281fc6d3a4de3facb755f0383e7f791");
});
