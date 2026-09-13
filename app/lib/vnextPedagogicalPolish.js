const COGNITIVE_LABELS={
  compreensao:"Compreensão",
  aplicacao:"Aplicação",
  interpretacao:"Interpretação",
  raciocinio:"Raciocínio",
  modelacao:"Modelação",
  sintese:"Síntese",
  comparacao:"Comparação",
  exemplo:"Exemplo"
};

function normalized(value){
  return String(value||"").normalize("NFD").replace(/\p{Diacritic}/gu,"").toLowerCase().trim();
}

export function canonicalCognitiveLabel(value){
  const key=normalized(value);
  return COGNITIVE_LABELS[key]||String(value||"").trim();
}

function cleanPrompt(value){
  return String(value||"").replace(/\s+/g," ").trim();
}

function enrichFactorialPrompt(prompt){
  const q=cleanPrompt(prompt);
  if(normalized(q).length>=28)return q;
  let m=q.match(/^Qual é o valor de (.+)\?$/i);
  if(m)return `Calcula ${m[1]} a partir da definição de fatorial. Qual é o valor obtido?`;
  if(/^A relação correta é/i.test(q))return "Qual das seguintes igualdades representa corretamente a relação recursiva do fatorial?";
  if(/^Resolve /i.test(q))return `Resolve, em números naturais, a equação com fatoriais ${q.slice(8).replace(/\.$/,"")} e seleciona a solução correta.`;
  if(/^Simplifica /i.test(q))return `Sem desenvolver fatoriais desnecessariamente, ${q.charAt(0).toLowerCase()+q.slice(1)}`;
  if(/^Se /i.test(q))return `Usa as propriedades do fatorial para determinar o valor pedido. ${q}`;
  const expr=q.replace(/\s*(é|vale|simplifica para)\.\.\.$/i,"").replace(/\s*=\s*$/,"").trim();
  if(expr!==q)return `Simplifica a expressão ${expr}, usando as propriedades do fatorial. Qual é o resultado?`;
  return `Analisa a expressão fatorial e seleciona a opção correta. ${q}`;
}

function enrichComplexPrompt(prompt){
  const q=cleanPrompt(prompt);
  if(normalized(q).length>=28)return q;
  if(/^Resolve /i.test(q))return `Resolve a equação em ℂ e escreve z na forma algébrica a+bi. ${q}`;
  if(/^Se /i.test(q))return `Determina o número complexo indicado e escreve o resultado na forma algébrica a+bi. ${q}`;
  if(/=$/.test(q))return `Efetua a operação com números complexos e escreve o resultado na forma algébrica a+bi: ${q.slice(0,-1).trim()}.`;
  const expr=q.replace(/\s*é\.\.\.$/i,"").trim();
  if(expr!==q)return `Efetua a operação ${expr} e seleciona o resultado correto na forma algébrica.`;
  return `Efetua a operação com números complexos e seleciona o resultado correto. ${q}`;
}

function typographicPolish(value){
  return String(value||"")
    .replace(/\s+/g," ")
    .replace(/\s+([,.;:?])/g,"$1")
    .replace(/=>/g,"⇒")
    .trim();
}

export function polishVnextItem(item){
  if(!item)return item;
  const sourceId=item.sourceQuestionId||item.id||"";
  const next={
    ...item,
    cognitive:canonicalCognitiveLabel(item.cognitive),
    q:typographicPolish(item.q),
    sol:typographicPolish(item.sol),
    hyp:typographicPolish(item.hyp),
    signature:item.signature
  };

  if(item.subtopicId==="11-cont-fatorial")next.q=enrichFactorialPrompt(next.q);
  if(item.subtopicId==="12-cplx-operacoes-algebricas")next.q=enrichComplexPrompt(next.q);

  if(sourceId==="VN12CPLX-OA-048"){
    next.hyp="Pode multiplicar apenas a parte real ou apenas a parte imaginária pelo escalar.";
    next.signature="12-cplx-operacoes-algebricas:modelacao-escalar";
  }
  if(sourceId==="VN12CPLX-OA-049"){
    next.hyp="Pode somar componentes cruzadas em vez de somar as partes reais e imaginárias correspondentes.";
    next.signature="12-cplx-operacoes-algebricas:modelacao-soma";
  }

  return next;
}

export const CANONICAL_COGNITIVE_LABELS=Object.freeze([...new Set(Object.values(COGNITIVE_LABELS))]);
