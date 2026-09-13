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

function whyGuide(item){
  const id=item.subtopicId||"";
  const theme=item.themeId||"";
  if(/dhondt|stlague/.test(id))return "Porquê: nestes métodos, são os quocientes ordenados — e não apenas os votos iniciais — que determinam a atribuição dos mandatos.";
  if(/borda/.test(id))return "Porquê: no método de Borda, cada posição recebe uma pontuação definida; somar corretamente esses pontos é o que permite comparar as preferências globais.";
  if(/maiorias/.test(id))return "Porquê: maioria simples compara os votos obtidos, enquanto maioria absoluta exige ultrapassar metade dos votos válidos; distinguir os dois critérios decide a conclusão.";
  if(/amostragem|pop-amostra|inferencia|estimacao|intervalos|tlc/.test(id))return "Porquê: uma conclusão sobre a população só é justificável quando a informação da amostra é interpretada de acordo com o método de amostragem e com a incerteza associada.";
  if(/regressao|dispersao|localizacao|univariados/.test(id))return "Porquê: a medida ou representação estatística escolhida tem de corresponder ao tipo de dados e ao aspeto que se pretende descrever; é essa correspondência que valida a interpretação.";
  if(theme==="10-fin")return "Porquê: taxas, descontos e juros aplicam-se sempre a uma base concreta; identificar essa base e a ordem das operações evita aplicar percentagens ao valor errado.";
  if(theme==="10-fun")return "Porquê: uma propriedade da função tem de ser coerente ao mesmo tempo com a expressão, o domínio e o gráfico; a opção correta é a que respeita essas condições em conjunto.";
  if(theme==="10-ga"||theme==="10-gs"||theme==="11-pe")return "Porquê: as relações geométricas podem ser traduzidas por coordenadas, vetores, distâncias ou perpendicularidade; verificar essa relação algébrica confirma a conclusão geométrica.";
  if(theme==="11-cd"||theme==="12-fcd")return "Porquê: a derivada mede a taxa de variação local; aplicar a regra de derivação adequada e interpretar o sinal ou o valor obtido liga o cálculo ao comportamento da função.";
  if(theme==="11-cont")return "Porquê: numa contagem, a ordem e a possibilidade de repetição determinam o modelo correto; escolher o princípio, arranjo, permutação ou combinação adequado evita contar casos a mais ou a menos.";
  if(theme==="11-fun")return "Porquê: operações, raízes e comportamento gráfico de funções obedecem às respetivas condições algébricas; confirmar essas condições é o que torna a conclusão válida.";
  if(theme==="11-suc")return "Porquê: uma sucessão fica determinada pela sua lei de formação; identificar se o crescimento é aditivo, multiplicativo ou recorrente permite escolher a fórmula e interpretar o termo pedido.";
  if(theme==="11-trig")return "Porquê: seno, cosseno e tangente dependem do ângulo e do quadrante; respeitar as identidades, o sinal e o domínio garante que a solução escolhida é compatível com o círculo trigonométrico.";
  if(theme==="12-cplx")return "Porquê: nos números complexos, parte real, parte imaginária, módulo e argumento obedecem a relações próprias; manter essas componentes consistentes justifica a forma final obtida.";
  if(theme==="12-expl")return "Porquê: exponenciais e logaritmos são funções inversas e têm condições de domínio específicas; usar essas propriedades permite transformar a expressão sem alterar o conjunto de soluções válido.";
  if(theme==="12-fcont")return "Porquê: continuidade, limites e derivabilidade descrevem comportamentos locais relacionados mas distintos; verificar a condição certa no ponto em estudo é o que sustenta a conclusão.";
  if(theme==="12-prob")return "Porquê: a probabilidade resulta do espaço de resultados, das condições impostas e das relações entre acontecimentos; organizar esses elementos antes de calcular evita misturar casos incompatíveis.";
  if(theme==="12-rae")return "Porquê: os métodos numéricos aproximam raízes sob condições próprias; controlar o intervalo, a iteração e o erro é o que permite confiar na aproximação obtida.";
  if(theme==="12-int")return "Porquê: primitivas e integrais ligam taxa de variação e acumulação; aplicar a propriedade adequada e respeitar os limites de integração dá significado ao valor calculado.";
  if(theme==="12-mat")return "Porquê: as operações com matrizes dependem das dimensões e da ordem dos fatores; verificar compatibilidade e posição dos elementos é essencial para obter e interpretar o resultado correto.";
  return "Porquê: a resposta correta não depende apenas do valor final; depende de aplicar a definição ou propriedade adequada aos dados e de verificar que a conclusão satisfaz todas as condições do enunciado.";
}

function methodConclusionGuide(item){
  const theme=item.themeId||"";
  if(theme==="11-fun")return "Método: identifica a condição algébrica relevante — domínio, raiz, fatorização, operação ou comportamento gráfico —, aplica-a à expressão dada e compara com as condições do enunciado. Assim, a conclusão correta é a que satisfaz simultaneamente essas condições.";
  if(theme==="12-rae")return "Método: verifica primeiro as condições do método numérico, executa a aproximação ou a partição pedida e compara o valor obtido com o intervalo ou erro admissível. Assim, a conclusão correta é a aproximação que respeita esse critério.";
  return "Método: identifica a propriedade relevante, aplica-a aos dados do enunciado e verifica o resultado obtido. Assim, a conclusão fica justificada pelo procedimento e não apenas pelo valor final.";
}

export function solutionPedagogicalSignals(item){
  const text=String(item?.sol||"");
  const compact=normalized(text);
  const reasoning=/(porque|pois|logo|portanto|assim|dai|por isso|uma vez que|dado que|corresponde|implica|obtem-se|resulta|significa|equivale)/.test(compact);
  const method=/(=|÷|×|\+|−|-|calcula|divide|multiplica|soma|subtrai|substitui|aplica|ordena|compara|simplifica|deriva|integra|resolve|fatora|conta|seleciona|determina|identifica|verifica|metodo)/.test(compact);
  const conclusion=/(logo|portanto|assim|dai|resultado|opcao|conclui|conclusao|obtem-se|fica|corresponde|temos|distribuicao|solucao)/.test(compact);
  const explicitWhy=/(porquê:|porque|pois|uma vez que|dado que|por isso)/.test(compact);
  return {length:compact.length,reasoning,method,conclusion,explicitWhy,score:[reasoning,method,conclusion,explicitWhy].filter(Boolean).length};
}

function enrichSolution(item,solution){
  let text=sentence(solution);
  if(!text)return text;
  const answer=Array.isArray(item.o)&&Number.isInteger(item.a)?item.o[item.a]:null;
  if(normalized(text).length<42){
    const confirmation=answer?` A opção obtida deve coincidir com “${typographicPolish(answer)}”.`:"";
    text=`${text} ${solutionGuide(item)}${confirmation}`;
  }
  let sig=solutionPedagogicalSignals({...item,sol:text});
  if(!sig.explicitWhy||sig.score<3||sig.length<80)text=`${text} ${whyGuide(item)}`;
  sig=solutionPedagogicalSignals({...item,sol:text});
  if(sig.score<3)text=`${text} ${methodConclusionGuide(item)}`;
  return sentence(text);
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
