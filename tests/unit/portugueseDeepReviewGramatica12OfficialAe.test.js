import {describe,expect,it} from "vitest";
import {PORTUGUESE_GRAMATICA_12_DEEP_REVIEW} from "../../app/data/portugueseDeepReviewGramatica12.js";

describe("Português 12.º · Gramática · alinhamento AE março 2026",()=>{
  const study=PORTUGUESE_GRAMATICA_12_DEEP_REVIEW;
  const formation=study.sections.find(section=>section.id==="pt12-gramatica-formacao-palavras");
  const discourse=study.sections.find(section=>section.id==="pt12-gramatica-discurso");
  const wholeText=JSON.stringify(study);

  it("cobre os sete processos irregulares do Dicionário Terminológico",()=>{
    for(const term of ["extensão semântica","empréstimo","amálgama","sigla","acrónimo","onomatopeia","truncação"]){
      expect(JSON.stringify(formation).toLowerCase()).toContain(term);
    }
  });

  it("mantém os cinco valores aspetuais explicitados nas AE",()=>{
    for(const term of ["perfetivo","imperfetivo","genérico","habitual","iterativo"]){
      expect(wholeText.toLowerCase()).toContain(term);
    }
  });

  it("mantém cadeias referenciais, coerência e coesão",()=>{
    expect(wholeText.toLowerCase()).toContain("cadeias referenciais");
    expect(wholeText.toLowerCase()).toContain("coerência");
    expect(wholeText.toLowerCase()).toContain("coesão");
  });

  it("cobre as três modalidades de reprodução do discurso das AE",()=>{
    const text=JSON.stringify(discourse).toLowerCase();
    expect(text).toContain("discurso direto");
    expect(text).toContain("discurso indireto");
    expect(text).toContain("discurso indireto livre");
  });
});
