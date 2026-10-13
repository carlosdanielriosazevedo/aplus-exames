import assert from "node:assert/strict";
import fs from "node:fs";

const read=path=>fs.readFileSync(path,"utf8");
const layout=read("app/layout.js");
const chrome=read("app/components/chrome.js");
const storage=read("app/lib/browserStorage.js");
const storageNotice=read("app/components/StorageDurabilityNotice.js");
const reporter=read("app/components/ClientRuntimeReporter.js");
const clientReport=read("app/lib/clientRuntimeReport.js");
const clientRoute=read("app/api/client-errors/route.js");
const internalLayout=read("app/internal/layout.js");
const security=read("next.config.mjs");
const publicCss=read("app/public-release.css");
const sitemap=read("app/sitemap.js");
const terms=read("app/termos/page.js");
const privacy=read("app/privacidade/page.js");
const account=read("app/components/AccountCloud.js");
const fqa=read("app/components/PhysicsChemistrySubject.js");
const appPackage=JSON.parse(read("app/package.json"));
const manifest=read("app/manifest.js");
const socialImage=read("app/opengraph-image.js");

assert.match(layout,/ClientRuntimeReporter/u,"O reporter global de erros client-side deve estar montado no layout.");
assert.match(layout,/StorageDurabilityNotice/u,"O aviso de armazenamento temporário deve estar montado globalmente.");
assert.match(reporter,/unhandledrejection/u,"Promessas rejeitadas sem handler devem ser capturadas.");
assert.match(reporter,/window\.addEventListener\("error"/u,"Erros globais do browser devem ser capturados.");
assert.doesNotMatch(clientReport,/answer|response|email|password/u,"O payload client-side de observabilidade não deve recolher respostas, email ou password.");
assert.match(clientRoute,/sameOriginRequest/u,"O endpoint de erro client-side deve exigir same-origin.");
assert.match(clientRoute,/MAX_BYTES/u,"O endpoint de erro client-side deve limitar o payload.");
assert.match(clientRoute,/RATE_LIMITED/u,"O endpoint de erro client-side deve limitar abuso.");
assert.match(clientRoute,/VERCEL_GIT_COMMIT_SHA/u,"Os logs devem identificar o commit em produção.");

assert.match(internalLayout,/notFound\(\)/u,"Ferramentas internas devem falhar fechadas.");
assert.match(internalLayout,/APLUS_INTERNAL_TOOLS/u,"Ferramentas internas só podem abrir com opt-in explícito fora do dev local.");

for(const header of ["Content-Security-Policy","Referrer-Policy","Permissions-Policy","X-Content-Type-Options","X-Frame-Options"]){
  assert.match(security,new RegExp(header.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"u"),`Falta o header de segurança ${header}.`);
}
assert.match(security,/frame-ancestors 'none'/u,"A política CSP deve impedir embedding da app.");
assert.match(security,/object-src 'none'/u,"A política CSP deve bloquear objetos ativos.");

assert.match(storage,/volatileStorageActive/u,"O fallback em memória deve expor o seu estado de durabilidade.");
assert.match(storage,/approva:volatile-storage/u,"O fallback temporário deve avisar a interface.");
assert.match(storageNotice,/Sessão temporária neste separador/u,"O aluno deve perceber quando o progresso não é durável.");

assert.match(chrome,/augmentStudentMenu/u,"A paridade do menu deve ser centralizada no shell comum.");
for(const required of ["Apronso e como funciona a app","Conta e progresso","Área dos pais"]){
  assert.match(chrome,new RegExp(required,"u"),`O menu comum deve garantir ${required}.`);
}
assert.match(chrome,/role="alert"/u,"Estados de recovery devem ser anunciados a tecnologias de apoio.");

assert.match(publicCss,/:focus-visible/u,"Controlos interativos devem ter foco visível.");
assert.match(publicCss,/min-height:44px/u,"Controlos táteis críticos devem respeitar um alvo mínimo confortável.");
assert.match(publicCss,/font-size:12px/u,"Microtexto crítico deve ter um piso legível.");
assert.match(publicCss,/cloudTechnicalDetails/u,"Detalhes técnicos de sincronização devem ficar numa superfície secundária e legível.");

assert.match(sitemap,/\/termos/u,"Os Termos devem constar do sitemap público.");
assert.doesNotMatch(sitemap,/\/piloto/u,"Páginas de piloto não devem ser promovidas no sitemap público.");
assert.doesNotMatch(terms,/ainda não constituem a versão jurídica final/u,"Os Termos públicos não podem declarar-se inadequados ao próprio lançamento.");
assert.match(terms,/Alunos menores de idade/u,"Os Termos devem reconhecer explicitamente utilizadores menores do ensino secundário.");
assert.match(privacy,/Utilizadores menores e encarregados de educação/u,"A Privacidade deve explicar a experiência de menores e encarregados de educação.");
assert.match(privacy,/Diagnóstico técnico de erros/u,"A observabilidade client-side deve estar refletida na informação de Privacidade.");
assert.match(privacy,/pilotPublicFields/u,"A informação pública deve obter responsável e contacto da configuração formal.");

assert.doesNotMatch(account,/>Password</u,"A interface pública deve usar português para palavra-passe.");
assert.doesNotMatch(account,/A password é tratada/u,"A explicação pública da autenticação deve usar português.");
assert.doesNotMatch(account,/Neon Auth\/Data API ainda não ativados/u,"A interface pública não deve expor nomes de infraestrutura.");
assert.doesNotMatch(account,/migration v4\.9/u,"A interface pública não deve expor versões de migrations.");
assert.doesNotMatch(account,/Carregar cloud com snapshot/u,"A ação principal de recuperação deve usar linguagem orientada ao aluno.");
for(const copy of ["Guardar online","Carregar progresso online","Detalhes e cópias de segurança","Encontrámos progresso mais recente noutro dispositivo"]){
  assert.match(account,new RegExp(copy,"u"),`Falta copy pública de progresso online: ${copy}.`);
}
assert.doesNotMatch(fqa,/Voltar à Home/u,"A interface deve usar a nomenclatura comum de menu inicial.");

assert.equal(appPackage.type,"module","Os módulos do App Router usados pelos audits devem declarar ESM e não gerar reparsing warnings.");
assert.equal(fs.existsSync("package-lock.json"),true,"O release deve ter package-lock para instalações reprodutíveis.");
assert.match(manifest,/display:'standalone'/u,"A app pública deve expor um manifest instalável coerente.");
assert.match(manifest,/theme_color:'#08132e'/u,"O manifest deve usar a identidade visual da APProva+.");
assert.match(socialImage,/ImageResponse/u,"A partilha pública deve ter uma imagem Open Graph própria.");
assert.match(layout,/summary_large_image/u,"A metadata social deve anunciar o cartão visual grande.");
assert.match(layout,/lang="pt-PT"/u,"O documento público deve declarar português de Portugal.");

console.log("✓ Public launch hardening audit passed");
