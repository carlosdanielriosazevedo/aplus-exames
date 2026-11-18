import {execFileSync} from "node:child_process";
import {cpSync,mkdirSync,mkdtempSync,readFileSync,rmSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {dirname,join,resolve} from "node:path";
import {afterAll,beforeAll,describe,expect,it} from "vitest";

const planPath="content/reviews/math-a/12/12-complete.review-plan.json";
const individualPath="content/reviews/math-a/10/10-fun-dominio-imagem-zeros.review.json";
const editorialAudit="math-editorial-review-audit.mjs";
const completenessAudit="math-12-completeness-audit.mjs";
const scripts=resolve("scripts");
let fixture;

function read(file){
  return JSON.parse(readFileSync(join(fixture,file),"utf8"));
}

function audit(script){
  try{
    execFileSync(process.execPath,[join(scripts,script)],{cwd:fixture,stdio:"pipe"});
    return "";
  }catch(error){
    return String(error.stderr);
  }
}

function withChanges(files,check){
  const original=new Map(Object.keys(files).map(file=>[file,readFileSync(join(fixture,file))]));
  try{
    for(const [file,data] of Object.entries(files))writeFileSync(join(fixture,file),JSON.stringify(data));
    check();
  }finally{
    for(const [file,data] of original)writeFileSync(join(fixture,file),data);
  }
}

describe("integridade do histórico editorial de Matemática A",()=>{
  beforeAll(()=>{
    fixture=mkdtempSync(join(tmpdir(),"math-editorial-review-"));
    for(const folder of ["content/reviews/math-a","content/vnext/math-a"]){
      mkdirSync(join(fixture,dirname(folder)),{recursive:true});
      cpSync(folder,join(fixture,folder),{recursive:true});
    }
  });

  afterAll(()=>{
    if(fixture)rmSync(fixture,{recursive:true,force:true});
  });

  it("rejeita uma edição da fonte mesmo que se atualizem os hashes do plano",()=>{
    const plan=read(planPath);
    const entry=plan.sources.find(source=>source.aiRereview);
    const source=read(entry.sourcePath);
    const item=source.questions.find(question=>question.id===entry.aiRereview.items[0]);
    item.sol+=" Alteração sem nova decisão editorial.";

    withChanges({[entry.sourcePath]:source},()=>{
      expect(audit(editorialAudit)).toContain("a fonte mudou depois da revisão");
      expect(audit(completenessAudit)).toContain("fonte mudou depois da revisão");

      entry.sourceBlobSha=execFileSync("git",["hash-object",entry.sourcePath],{cwd:fixture,encoding:"utf8"}).trim();
      withChanges({[planPath]:plan},()=>{
        expect(audit(editorialAudit)).toContain("hash da fonte mudou sem nova revisão por pergunta");
      });

      entry.aiRereview.sourceBlobSha=entry.sourceBlobSha;
      withChanges({[planPath]:plan},()=>{
        expect(audit(editorialAudit)).toContain(`${item.id}: pergunta mudou depois da nova revisão`);
      });
    });
  });

  it("rejeita a perda da decisão atual ou da justificação histórica",()=>{
    const review=read(individualPath);
    const revision=review.aiRereview;
    const id="VN10FUN-DIZ-029";
    const historic=review.decisions.find(decision=>decision.id===id);
    const current=review.aiRereview.decisions[id];
    expect(current.previousReview).toEqual({reviewedAt:"2026-09-12",decision:historic});
    expect(current.status).toBe("approved");
    expect(historic.status).toBe("approved_with_override");
    expect(historic.override).toBeDefined();

    delete review.aiRereview;
    withChanges({[individualPath]:review},()=>{
      expect(audit(editorialAudit)).toContain("fonte atualizada sem nova revisão");
    });
    review.aiRereview=revision;

    delete review.aiRereview.decisions[id];
    withChanges({[individualPath]:review},()=>{
      expect(audit(editorialAudit)).toContain("nova revisão sem decisão para cada ID");
    });
    review.aiRereview.items=review.aiRereview.items.filter(itemId=>itemId!==id);
    withChanges({[individualPath]:review},()=>{
      expect(audit(editorialAudit)).toContain("perguntas com aprovação anterior mudaram sem nova revisão");
    });

    review.aiRereview.items.push(id);
    review.aiRereview.decisions[id]=current;
    current.previousReview.decision.rationale="Texto alterado no histórico.";
    withChanges({[individualPath]:review},()=>{
      expect(audit(editorialAudit)).toContain(`${id}: histórico editorial divergente`);
    });
  });
});
