export const MATH_RESPONSE_WAVE5_CASES=[
  {itemId:"CRV2-10FUN-STEPS-1",profile:"self-corrected-step",minScore:.75,answer:{steps:{equation:"Primeiro 3x-12=12; corrigindo: 3x-12=0",value:"4",conclusion:"O zero é 4."}}},
  {itemId:"CRV2-10GA-STEPS-1",profile:"equivalent-notation",minScore:.95,answer:{steps:{deltaY:"2",deltaX:"4",slope:"0.5",conclusion:"m=0,5"}}},
  {itemId:"CRV2-11CD-STEPS-1",profile:"self-corrected-step",minScore:.75,answer:{steps:{derivative:"Primeiro 3x^2; corrigindo: 3x^2-2",substitution:"3(2)^2-2",value:"10"}}},
  {itemId:"CRV2-11CONT-STEPS-1",profile:"equivalent-notation",minScore:.9,answer:{steps:{model:"ordem irrelevante",expression:"10",value:"10"}}},
  {itemId:"CRV2-12FCONT-STEPS-1",profile:"self-corrected-step",minScore:.75,answer:{steps:{factorization:"Primeiro (x-3)^2; corrigindo: (x-3)(x+3)",simplification:"x+3",conclusion:"limite=6"}}},
  {itemId:"CRV2-12INT-STEPS-1",profile:"equivalent-notation",minScore:.95,answer:{steps:{primitive:"0.5x^2",barrow:"0.5-0",value:"0.5"}}},
  {itemId:"CRV2-10EST-STEPS-1",profile:"equivalent-notation",minScore:.95,answer:{steps:{sum:"4+3+5+4=16",count:"4",mean:"16/4=4"}}},
  {itemId:"CRV2-11PE-STEPS-1",profile:"self-corrected-step",minScore:.7,answer:{steps:{expression:"2*3+(-1)*4",value:"2",conclusion:"Primeiro escrevi perpendiculares; corrigindo: não são perpendiculares porque u·v=2≠0."}}},
  {itemId:"CRV2-11SUC-STEPS-1",profile:"equivalent-notation",minScore:.95,answer:{steps:{formula:"3+2(n-1)",substitution:"3+18",value:"21"}}},
  {itemId:"CRV2-12FCD-CHAIN-STEPS-1",profile:"self-corrected-step",minScore:.7,answer:{steps:{inner:"u=x^2+1",outer:"3u^2",innerDerivative:"2x",result:"Primeiro 3x(x^2+1)^2; corrigindo: 6x(x^2+1)^2"}}}
];

export const MATH_RESPONSE_WAVE5_PROFILES=["self-corrected-step","equivalent-notation"];
