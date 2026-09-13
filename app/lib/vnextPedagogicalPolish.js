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

function sentence(value){
  const text=typographicPolish(value);
  if(!text)return text;
  return /[.!?]$/.test(text)?text:`${text}.`;
}

function solutionGuide(item){
  const subtopic=item.subtopicId||"";
  if(subtopic==="11-cont-fatorial")return "Passo-chave: usa a definição e as propriedades do fatorial, simplificando fatores comuns antes de efetuar cálculos desnecessários.";
  if(subtopic==="12-cplx-operacoes-algebricas")return "Passo-chave: trabalha separadamente as partes real e imaginária e, no fim, reúne o resultado na forma algébrica a+bi.";
  if(subtopic.includes("prob")||subtopic.includes("combin"))return "Passo-chave: identifica primeiro o espaço de resultados e os casos favoráveis; só depois efetua a contagem ou calcula a probabilidade.";
  if(subtopic.includes("deriv"))return "Passo-chave: identifica a regra de derivação adequada, calcula com cuidado e interpreta o valor obtido no contexto pedido.";
  if(subtopic.includes("func")||subtopic.includes("graf"))return "Passo-chave: traduz os dados para propriedades da função ou do gráfico e verifica qual opção satisfaz simultaneamente essas condições.";
  if(subtopic.includes("geo")||subtopic.includes("vet"))return "Passo-chave: organiza os dados geométricos ou vetoriais numa relação matemática antes de substituir valores e simplificar.";
  if(subtopic.includes("trig"))return "Passo-chave: escolhe a relação trigonométrica adequada, mantém o controlo dos sinais e confirma o resultado no domínio indicado.";
  if(subtopic.includes("log")||subtopic.includes("exp"))return "Passo-chave: aplica as propriedades algébricas adequadas antes de isolar a incógnita e confirma as condições de existência.";
  if(subtopic.includes("lim"))return "Passo-chave: analisa primeiro a forma do limite e só depois escolhe a transformação algébrica ou propriedade que permite calculá-lo.";
  if(subtopic.includes("seq")||subtopic.includes("sucess"))return "Passo-chave: identifica a lei da sucessão e usa-a diretamente no termo ou propriedade pedido, verificando no fim a coerência do resultado.";
  return "Passo-chave: identifica a propriedade ou definição central do enunciado, aplica-a aos dados e confirma que o resultado obtido satisfaz o que foi pedido.";
}

function enrichSolution(item,solution){
  const base=sentence(solution);
  if(!base)return base;
  const compact=normalized(base);
  if(compact.length>=42)return base;
  const answer=Array.isArray(item.o)&&Number.isInteger(item.a)?item.o[item.a]:null;
  const confirmation=answer?` A opção obtida deve coincidir com “${typographicPolish(answer)}”.`:"";
  return `${base} ${solutionGuide(item)}${confirmation}`;
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

  next.sol=enrichSolution(next,next.sol);
  return next;
}

export const CANONICAL_COGNITIVE_LABELS=Object.freeze([...new Set(Object.values(COGNITIVE_LABELS))]);
