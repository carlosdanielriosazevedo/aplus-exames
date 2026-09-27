export const PHYSICS_CHEMISTRY_A_STEPWISE_SOURCE={
  authority:"IAVE",
  exam:"Prova 715 · 1.ª Fase · 2026",
  criteriaUrl:"https://iave.pt/wp-content/uploads/2026/06/EX-FQA715-F1-2026-CC-VT_net.pdf"
};

export const PHYSICS_CHEMISTRY_A_STEPWISE_RULES={
  type1Penalty:1,
  oneType2Penalty:2,
  multipleType2Penalty:4,
  finalAnswerOnlyZero:true,
  alternativeValidMethods:true,
  downstreamDependency:true,
  intermediateUnitOmissionNoAutomaticPenalty:true,
  finalUnitRequiredWhenApplicable:true,
  intermediateRoundingUsuallyNoAutomaticPenalty:true
};

export const PHYSICS_CHEMISTRY_A_STEPWISE_POLICIES={
  "FQA-C-ELEM-01":{
    steps:{
      n:{acceptedRelations:["n=m/M","m/M","5.40/27.0","5,40/27,0"]},
      N:{acceptedRelations:["N=n*NA","n*NA","n×NA","n.NA"],followThrough:{from:"n",kind:"multiply",factor:6.02e23},final:true,acceptedUnits:["átomos","atomos"]}
    }
  },
  "FQA-C-MAT-01":{
    steps:{
      n:{acceptedRelations:["n=cV","c*V","c×V","0.0800*0.2500","0,0800×0,2500"]},
      V:{acceptedRelations:["V=n/c","n/c","c1V1=c2V2","c₁V₁=c₂V₂"],followThrough:{from:"n",kind:"divide",factor:0.500},final:true,acceptedUnits:["dm3","dm³","L","l","mL","ml"]}
    }
  },
  "FQA-C-ENE-01":{
    steps:{
      Ec:{acceptedRelations:["W=ΔEc","Ec=W","Ec=36","ΔEc=W"]},
      v:{acceptedRelations:["Ec=1/2mv^2","Ec=1/2mv²","v=sqrt(2Ec/m)","v=√(2Ec/m)"],followThrough:{from:"Ec",kind:"sqrtScaled",factor:1},final:true,acceptedUnits:["m/s","m s-1","m s⁻¹"]}
    }
  },
  "FQA-C-MEC-01":{
    steps:{
      a:{acceptedRelations:["a=Δv/Δt","a=(vf-vi)/Δt","a=(v-v0)/t","a=(5-1)/2"]},
      F:{acceptedRelations:["F=ma","FR=ma","F_R=ma","m*a","m×a"],followThrough:{from:"a",kind:"multiply",factor:0.80},final:true,acceptedUnits:["N","n"]}
    }
  },
  "FQA-C-WAV-01":{
    steps:{
      v:{acceptedRelations:["v=fλ","v=f*lambda","v=f×λ","v=250*1.36","v=250×1,36"]},
      t:{acceptedRelations:["t=d/v","d=vt","t=680/v"],followThrough:{from:"v",kind:"constantDivide",factor:680},final:true,acceptedUnits:["s"]}
    }
  },
  "FQA-C-EQ-01":{
    steps:{
      expr:{acceptedRelations:["Kc=[B]^2/[A]","[B]^2/[A]","[B]²/[A]","B^2/A"]},
      Kc:{acceptedRelations:["Kc=0.40^2/0.50","0.40^2/0.50","0,40²/0,50","[B]^2/[A]"],requires:["expr"],final:true,acceptedUnits:[]}
    }
  },
  "FQA-C-AQ-01":{
    steps:{
      h:{acceptedRelations:["[H3O+]=10^-pH","[H₃O⁺]=10^-pH","10^-3.40","10^-3,40"]},
      oh:{acceptedRelations:["[OH-]=Kw/[H3O+]","[OH⁻]=Kw/[H₃O⁺]","Kw/[H3O+]","Kw/[H₃O⁺]"],followThrough:{from:"h",kind:"constantDivide",factor:1e-14},final:true,acceptedUnits:["mol/dm3","mol dm-3","mol dm⁻³"]}
    }
  }
};

export function physicsChemistryStepwisePolicyFor(item){
  return PHYSICS_CHEMISTRY_A_STEPWISE_POLICIES[item?.id]||{steps:{}};
}
