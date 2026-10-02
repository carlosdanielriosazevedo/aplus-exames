export const MATH_RESPONSE_WAVE4_CASES=[
  {itemId:"CRV2-10FUN-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{equation:"3x-12=0",value:"5",conclusion:"O zero de f é 5."}}},
  {itemId:"CRV2-10FUN-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{equation:"3x-12=0",value:"4",conclusion:"Logo, o zero de f é 5."}}},

  {itemId:"CRV2-10GA-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{deltaY:"2",deltaX:"4",slope:"2/4",conclusion:"O declive compara a variação de y com a de x."}}},
  {itemId:"CRV2-10GA-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{deltaY:"2",deltaX:"4",slope:"1/2",conclusion:"Logo, o declive é 2."}}},

  {itemId:"CRV2-11CD-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{derivative:"3x^2-2",substitution:"3(2)^2-2",value:"11"}}},
  {itemId:"CRV2-11CD-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{derivative:"3x^2-2",substitution:"3(2)^2-2",value:"10",conclusion:"Assim, f'(2)=11."}}},

  {itemId:"CRV2-11CONT-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{model:"A ordem não interessa, logo usa-se combinação.",expression:"5!/(2!*3!)",value:"9"}}},
  {itemId:"CRV2-11CONT-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{model:"A ordem não interessa.",expression:"5!/(2!*3!)",value:"10",conclusion:"Existem 12 grupos."}}},

  {itemId:"CRV2-12FCONT-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{factorization:"(x-3)(x+3)",simplification:"x+3",conclusion:"Substituindo x=3, o limite é 5."}}},
  {itemId:"CRV2-12FCONT-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{factorization:"(x-3)(x+3)",simplification:"x+3",conclusion:"Substitui-se x=3, obtém-se 6; portanto o limite é 3."}}},

  {itemId:"CRV2-12INT-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{primitive:"x^2/2",barrow:"1/2-0",value:"1/3"}}},
  {itemId:"CRV2-12INT-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{primitive:"x^2/2",barrow:"1/2-0",value:"1/2",conclusion:"Logo, o integral vale 1."}}},

  {itemId:"CRV2-10EST-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{sum:"16",count:"4",mean:"5"}}},
  {itemId:"CRV2-10EST-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{sum:"16",count:"4",mean:"4",conclusion:"A média é 5."}}},

  {itemId:"CRV2-11PE-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{expression:"2*3+(-1)*4",value:"2",conclusion:"Os vetores são perpendiculares."}}},
  {itemId:"CRV2-11PE-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{expression:"2*3+(-1)*4",value:"2",conclusion:"Como o produto escalar é 2, os vetores são perpendiculares."}}},

  {itemId:"CRV2-11SUC-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{formula:"3+2(n-1)",substitution:"3+2(10-1)",value:"22"}}},
  {itemId:"CRV2-11SUC-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{formula:"3+2(n-1)",substitution:"3+18",value:"21",conclusion:"Logo, u_10=22."}}},

  {itemId:"CRV2-12FCD-CHAIN-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{inner:"u=x^2+1",outer:"3u^2",innerDerivative:"u'=2x",result:"f'(x)=3x(x^2+1)^2"}}},
  {itemId:"CRV2-12FCD-CHAIN-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{inner:"u=x^2+1",outer:"3u^2",innerDerivative:"u'=2x",result:"f'(x)=6x(x^2+1)^2",conclusion:"Logo, f'(x)=3x(x^2+1)^2."}}}
];

export const MATH_RESPONSE_WAVE4_PROFILES=["right-method-local-slip","correct-work-false-conclusion"];
