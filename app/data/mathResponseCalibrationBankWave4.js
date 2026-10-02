export const MATH_RESPONSE_WAVE4_CASES=[
  {itemId:"CRV2-10FUN-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{equation:"3x-12=0",value:"5",conclusion:"O zero de f é 5."}}},
  {itemId:"CRV2-10FUN-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{equation:"3x-12=0",value:"4",conclusion:"Logo, o zero de f é 5."}}},

  {itemId:"CRV2-10GA-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{deltaY:"2",deltaX:"4",slope:"2/4",conclusion:"O declive compara a variação de y com a de x."}}},
  {itemId:"CRV2-10GA-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{deltaY:"2",deltaX:"4",slope:"1/2",conclusion:"Logo, o declive é 2."}}},

  {itemId:"CRV2-11CD-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{derivative:"3x^2-2",substitution:"3(2)^2-2",value:"11"}}},
  {itemId:"CRV2-10FIN-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{interest:"50",capital:"1050",conclusion:"O capital ao fim de um ano é 950 €."}}},

  {itemId:"CRV2-11CONT-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{model:"A ordem não interessa, logo usa-se combinação.",expression:"5!/(2!*3!)",value:"9"}}},
  {itemId:"CRV2-12PROB-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{favourable:"3",possible:"5",probability:"3/5",conclusion:"A probabilidade é o quociente entre os casos possíveis e os casos favoráveis."}}},

  {itemId:"CRV2-12FCONT-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{factorization:"(x-3)(x+3)",simplification:"x+3",conclusion:"Substituindo x=3, o limite é 5."}}},
  {itemId:"CRV2-12FCONT-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{factorization:"(x-3)(x+3)",simplification:"x+3",conclusion:"Substitui-se x=3, obtém-se 6; portanto o limite é 3."}}},

  {itemId:"CRV2-12INT-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{primitive:"x^2/2",barrow:"1/2-0",value:"1/3"}}},
  {itemId:"CRV2-10FUN-EXT-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{form:"(x-2)^2-3",abscissa:"2",minimum:"-3",conclusion:"O mínimo de f é 3 e é atingido em x=2."}}},

  {itemId:"CRV2-10EST-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{sum:"16",count:"4",mean:"5"}}},
  {itemId:"CRV2-12RAE-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{lower:"1.9881",upper:"2.0164",comparison:"1.9881<2<2.0164",conclusion:"Logo, √2 não pertence a ]1,41;1,42[."}}},

  {itemId:"CRV2-11PE-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{expression:"2*3+(-1)*4",value:"2",conclusion:"Os vetores são perpendiculares."}}},
  {itemId:"CRV2-11PE-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{expression:"2*3+(-1)*4",value:"2",conclusion:"Como o produto escalar é 2, os vetores são perpendiculares."}}},

  {itemId:"CRV2-11SUC-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{formula:"3+2(n-1)",substitution:"3+2(10-1)",value:"22"}}},
  {itemId:"CRV2-10FIN-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{interest:"50",capital:"1050",conclusion:"Ao fim de um ano, o capital é 950 €."}}},

  {itemId:"CRV2-12FCD-CHAIN-STEPS-1",profile:"right-method-local-slip",minScore:.2,maxScore:.85,answer:{steps:{inner:"u=x^2+1",outer:"3u^2",innerDerivative:"u'=2x",result:"f'(x)=3x(x^2+1)^2"}}},
  {itemId:"CRV2-10FUN-EXT-STEPS-1",profile:"correct-work-false-conclusion",minScore:.2,maxScore:.85,answer:{steps:{form:"(x-2)^2-3",abscissa:"2",minimum:"-3",conclusion:"A função atinge o mínimo 3 quando x=2."}}}
];

export const MATH_RESPONSE_WAVE4_PROFILES=["right-method-local-slip","correct-work-false-conclusion"];
