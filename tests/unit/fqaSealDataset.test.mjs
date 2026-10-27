import {test,expect} from "vitest";
import {sealBlindDataset,verifySeal} from "../../scripts/fqa-seal-dataset.mjs";
const base='blind_id,item_id,question,synthetic_student_response,human_awarded_points\n"B1","FQA-R-ELEM-01","Explica","Os eletrões mudam de nível e emitem fotões",""\n';
test("seal is deterministic and verifiable",()=>{
 const manifest=sealBlindDataset(base);
 expect(manifest.count).toBe(1);expect(manifest.sha256).toMatch(/^[a-f0-9]{64}$/);
 expect(verifySeal(base,manifest)).toBe(true);
});
test("mutation breaks seal",()=>{
 const manifest=sealBlindDataset(base);
 expect(()=>verifySeal(base.replace("fotões","fótons"),manifest)).toThrow(/changed/);
});
test("reject duplicate IDs",()=>{
 const doubled=base+base.split("\n")[1]+"\n";
 expect(()=>sealBlindDataset(doubled)).toThrow(/Duplicate/);
});
test("reject prefilled teacher notes or developer profile labels",()=>{
 expect(()=>sealBlindDataset(base.replace(',""\n',',"10"\n'))).toThrow(/scores already visible/);
 expect(()=>sealBlindDataset(base.replace('human_awarded_points','profile'))).toThrow(/Leaked/);
});
test("reject misidentified item and missing response",()=>{
 expect(()=>sealBlindDataset(base.replace("FQA-R-ELEM-01","FQA-R-OTHER-01"))).toThrow(/Invalid item/);
 expect(()=>sealBlindDataset(base.replace("Os eletrões mudam de nível e emitem fotões",""))).toThrow(/Missing question/);
});
