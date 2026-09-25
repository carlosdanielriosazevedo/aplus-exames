import {describe,expect,it} from "vitest";
import {PORTUGUESE_LITERARY_WORKS} from "../../app/data/portugueseLiteraryWorks";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy";
import {WORK_UNIT_IDS,portugueseReviewEntriesForYear} from "../../app/data/portugueseReviewContent";

describe("conteúdo de Rever matéria de Português",()=>{
  it("apresenta todas as obras como entradas próprias, sem agrupar opções diferentes",()=>{
    const entries=["10.º","11.º","12.º"].flatMap(portugueseReviewEntriesForYear);
    const workEntries=entries.filter(entry=>entry.kind==="obra");
    expect(workEntries).toHaveLength(PORTUGUESE_LITERARY_WORKS.length);
    expect(new Set(workEntries.map(entry=>entry.id)).size).toBe(PORTUGUESE_LITERARY_WORKS.length);
    for(const work of PORTUGUESE_LITERARY_WORKS){
      const entry=workEntries.find(item=>item.id===`work:${work.id}`);
      expect(entry?.title).toBe(work.title);
      expect(entry?.summary.length).toBeGreaterThan(80);
      expect(entry?.keyPoints.length).toBeGreaterThanOrEqual(4);
      expect(entry?.connections.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("mantém Leitura, Escrita e Gramática em cada ano",()=>{
    for(const row of PORTUGUESE_TAXONOMY){
      const domains=portugueseReviewEntriesForYear(row.year).map(entry=>entry.domain);
      expect(domains).toContain("leitura");
      expect(domains).toContain("escrita");
      expect(domains).toContain("gramatica");
    }
  });

  it("liga todas as obras a uma unidade curricular válida do mesmo ano",()=>{
    for(const work of PORTUGUESE_LITERARY_WORKS){
      const unitId=WORK_UNIT_IDS[work.id];
      const row=PORTUGUESE_TAXONOMY.find(item=>item.year===work.year);
      expect(unitId).toBeTruthy();
      expect(row?.units.some(unit=>unit.id===unitId)).toBe(true);
    }
  });
});
