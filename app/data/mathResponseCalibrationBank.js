export const MATH_RESPONSE_CALIBRATION_CASES=[
  {
    itemId:"CRV2-10FUN-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{equation:"3x-12=0",value:"4",conclusion:"O zero de f é 4."}}
  },
  {
    itemId:"CRV2-10FUN-STEPS-1",profile:"partial",minScore:.25,maxScore:.8,
    answer:{steps:{equation:"3x-12=0",value:"5",conclusion:"O zero de f é 5."}}
  },
  {
    itemId:"CRV2-10FUN-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{equation:"3x-12=12",value:"8",conclusion:"O zero de f é 8."}}
  },
  {
    itemId:"CRV2-10FUN-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"x=4"
  },

  {
    itemId:"CRV2-10GA-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{deltaY:"2",deltaX:"4",slope:"1/2",conclusion:"O declive é o quociente entre a variação das ordenadas e a variação das abcissas."}}
  },
  {
    itemId:"CRV2-10GA-STEPS-1",profile:"partial",minScore:.25,maxScore:.8,
    answer:{steps:{deltaY:"2",deltaX:"4",slope:"2/4",conclusion:"O declive compara as variações de y e x."}}
  },
  {
    itemId:"CRV2-10GA-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{deltaY:"4",deltaX:"2",slope:"2",conclusion:"O declive é a soma das variações."}}
  },
  {
    itemId:"CRV2-10GA-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"m=1/2"
  },

  {
    itemId:"CRV2-11CD-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{derivative:"f'(x)=3x^2-2",substitution:"3*2^2-2",value:"10"}}
  },
  {
    itemId:"CRV2-11CD-STEPS-1",profile:"propagated-conceptual",minScore:.15,maxScore:.95,
    answer:{steps:{derivative:"f'(x)=3x^2",substitution:"3*2^2",value:"12"}}
  },
  {
    itemId:"CRV2-11CD-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{derivative:"f'(x)=x^2-2",substitution:"2^2-2",value:"2"}}
  },
  {
    itemId:"CRV2-11CD-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"f'(2)=10"
  },

  {
    itemId:"CRV2-11CONT-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{model:"Usa-se uma combinação porque a ordem dos alunos não interessa.",expression:"c(5,2)",value:"10"}}
  },
  {
    itemId:"CRV2-11CONT-STEPS-1",profile:"partial",minScore:.25,maxScore:.8,
    answer:{steps:{model:"A ordem não interessa.",expression:"c(5,2)",value:"12"}}
  },
  {
    itemId:"CRV2-11CONT-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{model:"A ordem interessa.",expression:"5*4",value:"20"}}
  },
  {
    itemId:"CRV2-11CONT-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"10"
  },

  {
    itemId:"CRV2-12FCONT-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{factorization:"(x-3)(x+3)",simplification:"x+3",conclusion:"Como x+3 é contínua, substitui-se x=3 e o limite é 6."}}
  },
  {
    itemId:"CRV2-12FCONT-STEPS-1",profile:"partial",minScore:.25,maxScore:.8,
    answer:{steps:{factorization:"(x-3)(x+3)",simplification:"x+3",conclusion:"O limite existe."}}
  },
  {
    itemId:"CRV2-12FCONT-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{factorization:"(x-3)^2",simplification:"x-3",conclusion:"O limite é 0."}}
  },
  {
    itemId:"CRV2-12FCONT-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"6"
  },

  {
    itemId:"CRV2-12INT-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{primitive:"x^2/2",barrow:"1^2/2-0^2/2",value:"1/2"}}
  },
  {
    itemId:"CRV2-12INT-STEPS-1",profile:"propagated-conceptual",minScore:.1,maxScore:.95,
    answer:{steps:{primitive:"x^2",barrow:"1^2-0^2",value:"1"}}
  },
  {
    itemId:"CRV2-12INT-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{primitive:"2x",barrow:"2-0",value:"2"}}
  },
  {
    itemId:"CRV2-12INT-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"1/2"
  },

  {
    itemId:"CRV2-10EST-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{sum:"16",count:"4",mean:"4"}}
  },
  {
    itemId:"CRV2-10EST-STEPS-1",profile:"partial",minScore:.25,maxScore:.8,
    answer:{steps:{sum:"16",count:"4",mean:"5"}}
  },
  {
    itemId:"CRV2-10EST-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{sum:"14",count:"3",mean:"4.67"}}
  },
  {
    itemId:"CRV2-10EST-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"4"
  },

  {
    itemId:"CRV2-11PE-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{expression:"2*3+(-1)*4",value:"2",conclusion:"Os vetores não são perpendiculares porque o produto escalar não é zero."}}
  },
  {
    itemId:"CRV2-11PE-STEPS-1",profile:"partial",minScore:.25,maxScore:.8,
    answer:{steps:{expression:"2*3+(-1)*4",value:"2",conclusion:"Os vetores são perpendiculares."}}
  },
  {
    itemId:"CRV2-11PE-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{expression:"2*3+1*4",value:"10",conclusion:"Os vetores são perpendiculares porque o produto escalar é 10."}}
  },
  {
    itemId:"CRV2-11PE-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"u·v=2"
  },

  {
    itemId:"CRV2-11SUC-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{formula:"u_n=3+2(n-1)",substitution:"3+2*(10-1)",value:"21"}}
  },
  {
    itemId:"CRV2-11SUC-STEPS-1",profile:"propagated-conceptual",minScore:.1,maxScore:.95,
    answer:{steps:{formula:"u_n=3+2n",substitution:"3+2*10",value:"23"}}
  },
  {
    itemId:"CRV2-11SUC-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{formula:"u_n=3+n",substitution:"3+10",value:"13"}}
  },
  {
    itemId:"CRV2-11SUC-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"u_10=21"
  },

  {
    itemId:"CRV2-12FCD-CHAIN-STEPS-1",profile:"full-correct",minScore:.95,
    answer:{steps:{inner:"u=x^2+1",outer:"3u^2",innerDerivative:"u'=2x",result:"f'(x)=6x(x^2+1)^2"}}
  },
  {
    itemId:"CRV2-12FCD-CHAIN-STEPS-1",profile:"partial",minScore:.25,maxScore:.8,
    answer:{steps:{inner:"u=x^2+1",outer:"3u^2",innerDerivative:"u'=2x",result:"f'(x)=3(x^2+1)^2"}}
  },
  {
    itemId:"CRV2-12FCD-CHAIN-STEPS-1",profile:"wrong",maxScore:.35,
    answer:{steps:{inner:"u=x^2+1",outer:"u^3",innerDerivative:"u'=x",result:"f'(x)=3x^2"}}
  },
  {
    itemId:"CRV2-12FCD-CHAIN-STEPS-1",profile:"final-only",maxScore:.52,
    answer:"f'(x)=6x(x^2+1)^2"
  }
];

export const MATH_RESPONSE_CALIBRATION_PROFILES=["full-correct","partial","propagated-conceptual","wrong","final-only"];
