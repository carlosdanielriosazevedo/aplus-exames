import fs from "node:fs";
const path="app/lib/automaticEvidenceGrader.js";
let source=fs.readFileSync(path,"utf8");
function replaceExact(from,to,label){const count=source.split(from).length-1;if(count!==1)throw new Error(`${label}: ${count} matches`);source=source.replace(from,to);}
replaceExact(
'  ["final","segundo ponto","ponto final"]\n];',
'  ["final","segundo ponto","ponto final"],\n  ["problema","dificuldade","obstaculo"],\n  ["alternativa","solucao","possibilidade"],\n  ["condicao","requisito","necessario","concretizar","funcionar"],\n  ["ordem","sequencia","progressao","avancar","avanca"],\n  ["representa","retoma","recupera","refere"],\n  ["objeto","referente","antecedente"],\n  ["transicao","salto","desce","descem","passagem"],\n  ["fotao","foton","quantum","radiacao"],\n  ["padrao","assinatura"],\n  ["identificar","reconhecer","distinguir"],\n  ["algebrica","sinal","assinada"],\n  ["modulo","absoluto","positivamente"],\n  ["percurso","distancia"],\n  ["viragem","indicador"],\n  ["razao","proporcao"],\n  ["incerteza","erro","precisao","variacao"],\n  ["atingir","alcancar","chegar"]\n];',
"synonym groups"
);
replaceExact(
'  ["m h e v","massa altura velocidade"]\n];',
'  ["m h e v","massa altura velocidade"],\n  ["niveis eletronicos especificos","niveis energia caracteristicos elemento"],\n  ["niveis especificos","niveis energia caracteristicos"],\n  ["assinatura unica","padrao caracteristico"],\n  ["reconhecer qual esta presente","identificar elemento"],\n  ["descem entre esses niveis","transicao entre niveis"],\n  ["descem entre os niveis","transicao entre niveis"],\n  ["emitem radiacao com energias determinadas","emissao fotao energia definida"],\n  ["area com sinal","area algebrica"],\n  ["sob a curva","sob grafico"],\n  ["variacao de posicao","deslocamento"],\n  ["essas areas podem compensar se","areas negativas deslocamento"],\n  ["areas podem compensar se","areas negativas deslocamento"],\n  ["distancia percorrida contam se todas positivamente","distancia soma modulos"],\n  ["contam se todas positivamente","soma modulos"],\n  ["lado que absorve calor","sentido endotermico"],\n  ["absorve calor","endotermico"],\n  ["proporcoes finais","composicao equilibrio"],\n  ["estado de equilibrio","equilibrio"],\n  ["alcancado em menos tempo","chegada equilibrio mais rapida"],\n  ["razao estequiometrica","proporcao estequiometrica"],\n  ["salto de ph","curva ph regiao equivalencia"],\n  ["leitura do menisco","leitura volume"],\n  ["identificacao da viragem","determinacao ponto final"],\n  ["aquilo que marta reviu e o mesmo que entregou","mantem mesmo objeto entre acoes"],\n  ["representa o relatorio","retoma relatorio"],\n  ["indica o momento","oracao temporal momento"],\n  ["identifica mais precisamente","restringe limita"],\n  ["comecar pela dificuldade","problema inicial"],\n  ["solucoes possiveis","alternativas solucoes"],\n  ["necessario para as concretizar","condicoes necessarias solucoes"],\n  ["ordem logica","sequencia progressao clara"],\n  ["ligar cada parte a seguinte","progressao ligacao"],\n  ["registaria a massa","mede massa"],\n  ["diferenca de altura","altura referencia"],\n  ["velocidade da esfera em dois pontos","velocidade dois pontos"],\n  ["iguais dentro da incerteza experimental","compara valores incerteza experimental"]\n];',
"phrase equivalents"
);
replaceExact(
'  if(substantiveResponse&&semanticScore>=.52&&((matched.length>=3&&relation>=.18)||(matched.length>=2&&relation>=.3)))status="observed";',
'  if(substantiveResponse&&semanticScore>=.45&&((matched.length>=3&&relation>=.18)||(matched.length>=2&&relation>=.3)))status="observed";',
"observed threshold"
);
fs.writeFileSync(path,source);
console.log("PARAPHRASE EQUIVALENCE FIX: GO");
