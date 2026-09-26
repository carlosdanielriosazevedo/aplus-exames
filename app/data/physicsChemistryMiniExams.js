import {physicsChemistryItemById} from "./physicsChemistryFoundation.js";

function buildModel({id,label,itemIds,durationMinutes=45}){
  const items=itemIds.map(physicsChemistryItemById);
  const missing=itemIds.filter((itemId,index)=>!items[index]);
  if(missing.length)throw new Error("FQ A mini-exam references missing items: "+missing.join(", "));
  return {id,label,kind:"mini-exam",durationMinutes,itemCount:items.length,items};
}

export const PHYSICS_CHEMISTRY_A_MINI_EXAMS=[
  buildModel({
    id:"fqa-mini-1",label:"Mini-exame · Modelo 1",itemIds:[
      "FQA-AUTH-ELEM-G1","FQA-C-ELEM-01","FQA-AUTH-MAT-D1","FQA-R-MAT-01",
      "FQA-AUTH-ENE-G1","FQA-W2Q10-THERMO-02",
      "FQA-AUTH-MEC-G1","FQA-C-MEC-01","FQA-AUTH-WAV-G1",
      "FQA-EQ-04","FQA-AUTH-EQ-G1","FQA-R-AQ-01"
    ]
  }),
  buildModel({
    id:"fqa-mini-2",label:"Mini-exame · Modelo 2",itemIds:[
      "FQA-AUTH-ELEM-D1","FQA-W2Q10-PER-01","FQA-AUTH-MAT-G1","FQA-C-MAT-01",
      "FQA-AUTH-ENE-D1","FQA-R-ENE-01",
      "FQA-AUTH-MEC-D1","FQA-AUTH-WAV-D1","FQA-C-WAV-01",
      "FQA-C-EQ-01","FQA-AUTH-AQ-G1","FQA-AQ-04"
    ]
  })
];

export function physicsChemistryMiniExamById(id){
  return PHYSICS_CHEMISTRY_A_MINI_EXAMS.find(row=>row.id===id)||PHYSICS_CHEMISTRY_A_MINI_EXAMS[0];
}
