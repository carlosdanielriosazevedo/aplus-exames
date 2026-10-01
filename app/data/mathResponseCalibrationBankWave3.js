export const MATH_RESPONSE_WAVE3_CASES=[
  {itemId:"CRV2-10FUN-STEPS-1",profile:"equivalent-correct",minScore:.95,answer:{steps:{equation:"0=3x-12",value:"4",conclusion:"A raiz é 4."}}},
  {itemId:"CRV2-10FUN-STEPS-1",profile:"almost-correct",minScore:.2,maxScore:.8,answer:{steps:{equation:"3x-12=0",value:"5",conclusion:"O zero de f é 5."}}},
  {itemId:"CRV2-10FUN-STEPS-1",profile:"unsupported-answer",maxScore:.52,answer:"4"},

  {itemId:"CRV2-10GA-STEPS-1",profile:"equivalent-correct",minScore:.95,answer:{steps:{deltaY:"2",deltaX:"4",slope:"2/4",conclusion:"O declive é a variação de y dividida pela variação de x."}}},
  {itemId:"CRV2-10GA-STEPS-1",profile:"almost-correct",minScore:.25,maxScore:.8,answer:{steps:{deltaY:"2",deltaX:"4",slope:"1/2",conclusion:"O declive é a soma das variações."}}},
  {itemId:"CRV2-10GA-STEPS-1",profile:"unsupported-answer",maxScore:.52,answer:"1/2"},

  {itemId:"CRV2-11CD-STEPS-1",profile:"equivalent-correct",minScore:.95,answer:{steps:{derivative:"3x^2-2",substitution:"3(2)^2-2",value:"10"}}},
  {itemId:"CRV2-11CD-STEPS-1",profile:"almost-correct",minScore:.2,maxScore:.85,answer:{steps:{derivative:"3x^2-2",substitution:"3(2)^2-2",value:"11"}}},
  {itemId:"CRV2-11CD-STEPS-1",profile:"unsupported-answer",maxScore:.52,answer:"10"},

  {itemId:"CRV2-11CONT-STEPS-1",profile:"equivalent-correct",minScore:.95,answer:{steps:{model:"Usa-se combinação porque a ordem não é importante.",expression:"5!/(2!*3!)",value:"10"}}},
  {itemId:"CRV2-11CONT-STEPS-1",profile:"almost-correct",minScore:.2,maxScore:.85,answer:{steps:{model:"Usa-se combinação porque a ordem não interessa.",expression:"5!/(2!*3!)",value:"8"}}},
  {itemId:"CRV2-11CONT-STEPS-1",profile:"unsupported-answer",maxScore:.52,answer:"10"},

  {itemId:"CRV2-12FCONT-STEPS-1",profile:"equivalent-correct",minScore:.95,answer:{steps:{factorization:"(x+3)(x-3)",simplification:"x+3",conclusion:"Por continuidade de x+3, substitui-se x=3 e obtém-se 6."}}},
  {itemId:"CRV2-12FCONT-STEPS-1",profile:"almost-correct",minScore:.2,maxScore:.85,answer:{steps:{factorization:"(x+3)(x-3)",simplification:"x+3",conclusion:"O limite é 3."}}},
  {itemId:"CRV2-12FCONT-STEPS-1",profile:"unsupported-answer",maxScore:.52,answer:"6"},

  {itemId:"CRV2-12INT-STEPS-1",profile:"equivalent-correct",minScore:.95,answer:{steps:{primitive:"(x^2)/2",barrow:"1/2-0",value:"2/4"}}},
  {itemId:"CRV2-12INT-STEPS-1",profile:"almost-correct",minScore:.2,maxScore:.85,answer:{steps:{primitive:"x^2/2",barrow:"1/2-0",value:"1/3"}}},
  {itemId:"CRV2-12INT-STEPS-1",profile:"unsupported-answer",maxScore:.52,answer:"1/2"},

  {itemId:"CRV2-11PE-STEPS-1",profile:"equivalent-correct",minScore:.95,answer:{steps:{expression:"2*3-1*4",value:"2",conclusion:"Como u·v não é zero, os vetores não são perpendiculares."}}},
  {itemId:"CRV2-11PE-STEPS-1",profile:"almost-correct",minScore:.2,maxScore:.85,answer:{steps:{expression:"2*3-1*4",value:"2",conclusion:"Como u·v não é zero, os vetores são perpendiculares."}}},
  {itemId:"CRV2-11PE-STEPS-1",profile:"unsupported-answer",maxScore:.52,answer:"2"},

  {itemId:"CRV2-11SUC-STEPS-1",profile:"equivalent-correct",minScore:.95,answer:{steps:{formula:"3+(n-1)*2",substitution:"3+(10-1)*2",value:"21"}}},
  {itemId:"CRV2-11SUC-STEPS-1",profile:"almost-correct",minScore:.2,maxScore:.85,answer:{steps:{formula:"3+(n-1)*2",substitution:"3+(10-1)*2",value:"22"}}},
  {itemId:"CRV2-11SUC-STEPS-1",profile:"unsupported-answer",maxScore:.52,answer:"21"}
];

export const MATH_RESPONSE_WAVE3_PROFILES=["equivalent-correct","almost-correct","unsupported-answer"];
