// Gerado por scripts/generate-vnext-mission.mjs. Não editar manualmente.
// Sete perguntas originais e independentes por submatéria para Missões de 3–5 minutos.
// Permanecem protótipos até revisão pedagógica; productionEligible continua false.
export const VNEXT_MISSION_QUESTIONS=[
  {
    "id": "MS-VN10ELE-BOR-006",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de Borda",
    "q": "Usa Borda 3-2-1. Há 4 eleitores com A > B > C, 3 com B > A > C e 2 com C > A > B. Qual candidato vence?",
    "o": [
      "B",
      "A",
      "C",
      "A e B empatam"
    ],
    "a": 1,
    "sol": "As pontuações são A=22, B=19 e C=13. A tem a maior soma.",
    "hyp": "Pode contar apenas primeiros lugares ou esquecer a multiplicidade de cada perfil.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-borda:10-ele-borda:perfil-3-grupos-vencedor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-006",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-BOR-002",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de Borda",
    "q": "Num boletim com preferência A > B > C e pontuação 3-2-1, quantos pontos recebe B?",
    "o": [
      "1",
      "2",
      "3",
      "0"
    ],
    "a": 1,
    "sol": "B está em 2.º lugar e recebe 2 pontos.",
    "hyp": "Pode não relacionar corretamente posição e pontuação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-borda:10-ele-borda:pontuacao-posicao-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-002",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-BOR-010",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Método de Borda",
    "q": "No perfil 6 eleitores A > B > C e 5 eleitores B > C > A, A tem 6 dos 11 primeiros lugares. Mesmo assim, B vence por Borda 3-2-1. O que mostra este exemplo?",
    "o": [
      "A maioria de primeiros lugares garante vitória quando há apenas 11 eleitores.",
      "Ter maioria de primeiros lugares não garante necessariamente vitória por Borda.",
      "A maioria de primeiros lugares só deixa de contar quando há empate.",
      "O maior número de segundos lugares é condição suficiente para vencer."
    ],
    "a": 1,
    "sol": "A obtém 6×3+5×1=23 pontos. B obtém 6×2+5×3=27 pontos. Assim, apesar de A liderar nos primeiros lugares, B vence porque a pontuação tem em conta todas as posições.",
    "hyp": "Pode supor que a maioria de primeiras preferências domina qualquer método.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-borda:10-ele-borda:criterio-maioria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-010",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-BOR-017",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Método de Borda",
    "q": "Com quatro candidatos, Borda 4-3-2-1 e 15 eleitores, qual é a soma total das quatro pontuações finais?",
    "o": [
      "150",
      "120",
      "135",
      "160"
    ],
    "a": 0,
    "sol": "Cada eleitor distribui 10 pontos. Logo 15×10=150.",
    "hyp": "Pode multiplicar pelo número de candidatos em vez da soma da escala.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-borda:10-ele-borda:soma-global-4",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-017",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-BOR-045",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Método de Borda",
    "q": "Numa associação usa-se Borda 3-2-1. Antes dos últimos boletins, A=64, B=66 e C=50. Restam exatamente 2 eleitores, ambos com preferência A > C > B. Qual será o vencedor final?",
    "o": [
      "A",
      "B",
      "C",
      "A e B empatam"
    ],
    "a": 0,
    "sol": "Os dois boletins acrescentam A=6, B=2 e C=4. Ficam A=70, B=68 e C=54; vence A.",
    "hyp": "Pode olhar apenas para a classificação antes dos boletins restantes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-borda:10-ele-borda:atualizacao-final",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-045",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-BOR-003",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de Borda",
    "q": "Num boletim A > B > C > D, usando 4-3-2-1 pontos, quantos pontos recebe C?",
    "o": [
      "4",
      "3",
      "2",
      "1"
    ],
    "a": 2,
    "sol": "C aparece em 3.º lugar, por isso recebe 2 pontos.",
    "hyp": "Pode inverter a ordem da pontuação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-borda:10-ele-borda:pontuacao-posicao-4",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-003",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-BOR-018",
    "themeId": "10-ele",
    "subtopicId": "10-ele-borda",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método de Borda",
    "q": "Num concurso com três candidatos, 20 eleitores e Borda 3-2-1, foram publicadas as pontuações A=42, B=39 e C=37. O que se conclui?",
    "o": [
      "Os resultados são coerentes.",
      "Há um erro, porque a soma deveria ser 120 e é 118.",
      "Há necessariamente um empate.",
      "C deveria vencer."
    ],
    "a": 1,
    "sol": "A soma publicada é 42+39+37=118, mas 20 boletins válidos distribuem 120 pontos. Há pelo menos um erro.",
    "hyp": "Pode validar apenas a ordem final sem verificar a soma global.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-borda:10-ele-borda:auditar-soma-global",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-BOR-018",
    "sourceFile": "content/vnext/math-a/10/10-ele-borda.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-DHO-006",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de D'Hondt",
    "q": "Há 4 mandatos e três listas: A=1000 votos, B=800 e C=600. Qual é a distribuição por D'Hondt?",
    "o": [
      "A:1, B:2, C:1",
      "A:2, B:1, C:1",
      "A:2, B:2, C:0",
      "A:3, B:1, C:0"
    ],
    "a": 1,
    "sol": "Os quatro maiores quocientes são 1000(A), 800(B), 600(C) e 500(A). Logo A=2, B=1, C=1.",
    "hyp": "Pode atribuir mandatos diretamente pelas percentagens sem ordenar quocientes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-dhondt:10-ele-dhondt:alocacao-3-listas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-006",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-DHO-005",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de D'Hondt",
    "q": "Para distribuir 5 mandatos por D'Hondt, o procedimento central é...",
    "o": [
      "escolher os 5 maiores quocientes produzidos pelas listas.",
      "dar um mandato a cada lista e sortear o restante.",
      "ordenar apenas o número original de votos.",
      "calcular a média aritmética dos votos."
    ],
    "a": 0,
    "sol": "Cada mandato corresponde a um dos maiores quocientes globais, até preencher os lugares disponíveis.",
    "hyp": "Pode confundir D'Hondt com uma simples ordenação das listas por votos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-dhondt:10-ele-dhondt:selecionar-maiores-quocientes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-005",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-DHO-012",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Método de D'Hondt",
    "q": "Se todos os votos forem multiplicados por 10, mantendo o número de mandatos e usando o mesmo critério de desempate baseado nos votos relativos das listas, o que acontece à distribuição de D'Hondt?",
    "o": [
      "Pode mudar, porque os maiores quocientes aumentam mais em valor absoluto.",
      "Mantém-se apenas se as listas tiverem o mesmo número de votos.",
      "Mantém-se apenas se cada lista já tiver obtido um mandato.",
      "Mantém-se, porque todos os quocientes são multiplicados por 10."
    ],
    "a": 3,
    "sol": "Multiplicar todos os votos pelo mesmo fator positivo multiplica todos os quocientes pelo mesmo fator e preserva a sua ordem.",
    "hyp": "Pode pensar que a escala absoluta dos votos, por si só, altera a distribuição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-dhondt:10-ele-dhondt:invariancia-escala",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-012",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-DHO-008",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de D'Hondt",
    "q": "Com 6 mandatos e votos A=2100, B=1600, C=900, quantos mandatos recebe A pelo método de D'Hondt?",
    "o": [
      "2",
      "4",
      "5",
      "3"
    ],
    "a": 3,
    "sol": "Os seis maiores quocientes dão A três lugares, B dois e C um.",
    "hyp": "Pode contar apenas a posição de A nos votos originais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-dhondt:10-ele-dhondt:mandatos-lista",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-008",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-DHO-043",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Método de D'Hondt",
    "q": "Com A=900, B=650, C=400 e 4 mandatos, o quociente de C que lhe dá um lugar é 400. Qual é o próximo quociente de A que fica abaixo desse valor?",
    "o": [
      "450",
      "225",
      "300",
      "180"
    ],
    "a": 2,
    "sol": "A já usa 900 e 450 nos dois lugares que recebe; o quociente seguinte é 900÷3=300, inferior a 400.",
    "hyp": "Pode reutilizar um quociente que já foi selecionado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-dhondt:10-ele-dhondt:proximo-nao-selecionado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-043",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-DHO-002",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Método de D'Hondt",
    "q": "Uma lista recebeu 1200 votos. Qual é o seu segundo quociente no método de D'Hondt?",
    "o": [
      "1200",
      "600",
      "400",
      "300"
    ],
    "a": 1,
    "sol": "O segundo quociente é 1200÷2=600.",
    "hyp": "Pode usar o número de ordem do mandato como multiplicador em vez de divisor.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-dhondt:10-ele-dhondt:quociente-direto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-002",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-DHO-013",
    "themeId": "10-ele",
    "subtopicId": "10-ele-dhondt",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Método de D'Hondt",
    "q": "Adicionar exatamente 100 votos a todas as listas garante que a distribuição de D'Hondt fica igual?",
    "o": [
      "Não; somar a mesma constante não multiplica todos os quocientes pelo mesmo fator e pode alterar a ordem.",
      "Sim, porque a ordem das listas pelos votos se mantém.",
      "Sim, porque é somado o mesmo valor a cada quociente.",
      "Não, porque a soma altera a sequência de divisores das listas."
    ],
    "a": 0,
    "sol": "Com 210 votos para A, 100 para B e dois mandatos, ambos vão para A: 210>105>100. Somando 100 votos a cada lista, o segundo mandato passa para B, porque 200>310÷2=155. Somar o mesmo número de votos pode alterar a ordem dos quocientes.",
    "hyp": "Pode generalizar incorretamente a invariância por escala para uma translação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-dhondt:10-ele-dhondt:nao-invariancia-translacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-DHO-013",
    "sourceFile": "content/vnext/math-a/10/10-ele-dhondt.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-MAJ-007",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Foram contabilizados 160 votos válidos: 87 em A, 49 em B e 24 em C. Que tipo de maioria tem A?",
    "o": [
      "Apenas maioria simples.",
      "Nenhuma maioria.",
      "Maioria absoluta e, consequentemente, também simples.",
      "Exatamente metade dos votos."
    ],
    "a": 2,
    "sol": "87 > 80, logo A tem mais de metade dos votos válidos e possui maioria absoluta; também é o mais votado.",
    "hyp": "Pode não reconhecer que a maioria absoluta implica também ficar em primeiro lugar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-majorias:10-ele-majorias:absoluta-implica-simples",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-007",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-MAJ-002",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Numa votação em que se exige maioria absoluta dos votos válidos, o que tem de acontecer?",
    "o": [
      "O vencedor tem de obter exatamente metade dos votos.",
      "O vencedor tem de obter mais de metade dos votos válidos.",
      "O vencedor tem apenas de ficar em primeiro lugar.",
      "O vencedor tem de obter pelo menos um terço dos votos."
    ],
    "a": 1,
    "sol": "Maioria absoluta significa obter mais de metade dos votos válidos.",
    "hyp": "Pode interpretar maioria absoluta como simples primeiro lugar ou como exatamente 50%.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-majorias:10-ele-majorias:definicao-absoluta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-002",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-MAJ-021",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Uma votação tem 120 votos válidos. A recebeu 59, B recebeu 41 e C recebeu 20. Se dois eleitores que votaram em C mudarem o voto para A, qual passa a ser a situação de A?",
    "o": [
      "Passa a ter maioria absoluta com 61 votos.",
      "Continua sem maioria absoluta.",
      "Passa a ter exatamente metade.",
      "Fica empatado com B."
    ],
    "a": 0,
    "sol": "O total mantém-se 120 e A passa de 59 para 61. Como 61>60, atinge maioria absoluta.",
    "hyp": "Pode esquecer que a transferência não altera o total de votos válidos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-majorias:10-ele-majorias:transferencia-votos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-021",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-MAJ-011",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Os resultados são A=45%, B=35% e C=20%. Qual conclusão é necessariamente verdadeira?",
    "o": [
      "A tem maioria absoluta.",
      "B e C juntos não ultrapassam A.",
      "A tem maioria simples.",
      "É obrigatório existir uma segunda volta."
    ],
    "a": 2,
    "sol": "A tem a percentagem mais elevada, portanto tem maioria simples. 45% não constitui maioria absoluta.",
    "hyp": "Pode confundir maior percentagem com mais de 50%.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-majorias:10-ele-majorias:percentagens-simples",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-011",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-MAJ-045",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Um regulamento diz: 'É eleito à primeira volta quem obtiver mais de 50% dos votos válidos; caso contrário, passam à segunda volta os dois mais votados.' Os resultados são A=48%, B=33%, C=19%. O que acontece?",
    "o": [
      "A e B passam à segunda volta.",
      "A é eleita à primeira volta por maioria simples.",
      "B e C passam à segunda volta.",
      "Não é possível aplicar a regra."
    ],
    "a": 0,
    "sol": "A é a mais votada, mas 48% não ultrapassa 50%; portanto não há maioria absoluta e passam A e B.",
    "hyp": "Pode confundir primeiro lugar com a condição específica de eleição na primeira volta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-majorias:10-ele-majorias:regra-duas-voltas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-045",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-MAJ-003",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Três propostas recebem 38, 35 e 27 votos válidos. Pelo critério de maioria simples, qual vence?",
    "o": [
      "A proposta com 35 votos.",
      "A proposta com 27 votos.",
      "A proposta com 38 votos.",
      "Nenhuma, porque ninguém tem mais de 50 votos."
    ],
    "a": 2,
    "sol": "38 é o maior número de votos, logo essa proposta vence por maioria simples.",
    "hyp": "Pode exigir indevidamente maioria absoluta numa votação por maioria simples.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-majorias:10-ele-majorias:simples-identificar-maximo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-003",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-MAJ-024",
    "themeId": "10-ele",
    "subtopicId": "10-ele-majorias",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Maioria simples e maioria absoluta",
    "q": "Uma lista tem 74 dos 150 votos válidos. Quantos votos de outros candidatos teriam de ser transferidos para essa lista, sem alterar o total, para ela atingir maioria absoluta?",
    "o": [
      "1",
      "3",
      "4",
      "2"
    ],
    "a": 3,
    "sol": "Para 150 votos são necessários 76. De 74 para 76 faltam 2 votos.",
    "hyp": "Pode pensar que 75, metade exata, é suficiente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-majorias:10-ele-majorias:transferencia-minima",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-MAJ-024",
    "sourceFile": "content/vnext/math-a/10/10-ele-majorias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-STL-007",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Com St. Laguë e 5 mandatos, A=1300, B=950, C=520. Qual é a distribuição?",
    "o": [
      "A:3, B:1, C:1",
      "A:2, B:3, C:0",
      "A:2, B:2, C:1",
      "A:3, B:2, C:0"
    ],
    "a": 2,
    "sol": "Os cinco maiores quocientes são 1300, 950, 520, 1300÷3≈433,33 e 950÷3≈316,67, das listas A, B, C, A e B, respetivamente. Assim, A e B recebem dois mandatos cada e C recebe um.",
    "hyp": "Pode aplicar divisores 1,2,3 ou excluir C antes de comparar o seu primeiro quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-stlague-comparacao:10-ele-stlague-comparacao:alocacao-3-listas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-007",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-STL-005",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Depois de calcular os quocientes de todas as listas em St. Laguë, os mandatos são atribuídos...",
    "o": [
      "aos maiores quocientes globais, até preencher todos os lugares.",
      "um por lista, antes de repetir qualquer lista.",
      "apenas segundo o número inicial de votos.",
      "pela média dos quocientes de cada lista."
    ],
    "a": 0,
    "sol": "Tal como num método de maiores quocientes, ordenam-se globalmente os valores e escolhem-se os maiores até preencher os mandatos.",
    "hyp": "Pode achar que a sequência de divisores elimina a necessidade de ordenar os quocientes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-stlague-comparacao:10-ele-stlague-comparacao:selecionar-maiores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-005",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-STL-011",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Com A=900, B=650, C=400 e 4 mandatos, St. Laguë dá A=2, B=1, C=1. Se houver um 5.º mandato, quem o recebe?",
    "o": [
      "A",
      "C",
      "B",
      "Há empate"
    ],
    "a": 2,
    "sol": "O próximo maior quociente é B÷3≈216,67; A÷5=180 e C÷3≈133,33. O 5.º vai a B.",
    "hyp": "Pode usar o próximo divisor de D'Hondt em vez do próximo ímpar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-stlague-comparacao:10-ele-stlague-comparacao:mandato-adicional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-011",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-STL-020",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Para uma lista com V votos, o primeiro quociente é diferente entre D'Hondt e St. Laguë?",
    "o": [
      "Sim: é V em D'Hondt e V/3 em St. Laguë.",
      "Sim: é V/2 em D'Hondt e V em St. Laguë.",
      "Só coincide quando V é par.",
      "Não: em ambos é V/1=V."
    ],
    "a": 3,
    "sol": "Ambos começam pelo divisor 1, logo o primeiro quociente é o total de votos.",
    "hyp": "Pode assumir que todas as posições da sequência diferem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-stlague-comparacao:10-ele-stlague-comparacao:comparar-primeiro-quociente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-020",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-STL-042",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Uma cooperativa vai distribuir quatro lugares entre os grupos A, B e C, que tiveram 500, 400 e 200 votos, respetivamente. Quantos lugares recebe cada grupo, pela mesma ordem, pelo método de St. Laguë?",
    "o": [
      "2-2-0",
      "2-1-1",
      "1-2-1",
      "3-1-0"
    ],
    "a": 1,
    "sol": "Os quatro maiores quocientes são 500 de A, 400 de B, 200 de C e 500÷3≈166,67 de A. Logo, A recebe dois lugares, B recebe um e C recebe um.",
    "hyp": "Pode usar D'Hondt por hábito apesar de o método estar explicitado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-stlague-comparacao:10-ele-stlague-comparacao:modelacao-completa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-042",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-STL-002",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Uma lista tem 1200 votos. Qual é o seu segundo quociente em St. Laguë, usando 1,3,5,...?",
    "o": [
      "600",
      "400",
      "300",
      "240"
    ],
    "a": 1,
    "sol": "O segundo divisor é 3: 1200÷3=400.",
    "hyp": "Pode aplicar o divisor 2 de D'Hondt.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-stlague-comparacao:10-ele-stlague-comparacao:quociente-direto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-002",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10ELE-STL-009",
    "themeId": "10-ele",
    "subtopicId": "10-ele-stlague-comparacao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Método de St. Laguë, comparação e limitações",
    "q": "Com 8 mandatos e votos A=2500, B=1800, C=1200, D=700, qual é a distribuição em St. Laguë?",
    "o": [
      "A:3, B:2, C:2, D:1",
      "A:4, B:2, C:1, D:1",
      "A:3, B:3, C:1, D:1",
      "A:4, B:1, C:2, D:1"
    ],
    "a": 0,
    "sol": "Os oito maiores quocientes dão A=3, B=2, C=2 e D=1.",
    "hyp": "Pode assumir a mesma distribuição obtida por D'Hondt sem recalcular os quocientes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ele-stlague-comparacao:10-ele-stlague-comparacao:alocacao-4-listas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10ELE-STL-009",
    "sourceFile": "content/vnext/math-a/10/10-ele-stlague-comparacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-AMO-006",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma amostra muito grande, mas escolhida apenas num único bairro, garante representatividade de toda a cidade?",
    "o": [
      "Sim, sempre.",
      "Não.",
      "Sim, se tiver mais de 1000 pessoas.",
      "Só se o bairro for o maior."
    ],
    "a": 1,
    "sol": "Tamanho não corrige necessariamente uma seleção sistematicamente limitada.",
    "hyp": "Pode confundir dimensão com representatividade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-amostragem:10-est-amostragem:tamanho-nao-basta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-006",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-AMO-002",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "O que é enviesamento de seleção?",
    "o": [
      "Um erro de resposta induzido pela redação das perguntas.",
      "Um erro sistemático no modo de escolher a amostra.",
      "Uma diferença casual entre resultados de duas amostras.",
      "Um erro na transcrição das respostas recolhidas."
    ],
    "a": 1,
    "sol": "O enviesamento de seleção surge quando o processo de escolha favorece certos elementos e prejudica outros.",
    "hyp": "Pode tratar enviesamento como simples erro aleatório.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-amostragem:10-est-amostragem:enviesamento-selecao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-002",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-AMO-025",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma população tem 800 alunos: 320 do 10.º, 240 do 11.º e 240 do 12.º. Numa amostra proporcional de 100, quantos do 11.º?",
    "o": [
      "30",
      "24",
      "32",
      "40"
    ],
    "a": 0,
    "sol": "240/800=30%; 30% de 100=30.",
    "hyp": "Pode errar a proporção do estrato.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-amostragem:10-est-amostragem:estratificada-proporcional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-025",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-AMO-007",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Qual propriedade define a amostragem aleatória simples sem reposição, para uma dimensão de amostra fixada?",
    "o": [
      "Escolhem-se os mais fáceis de contactar.",
      "Escolhem-se apenas voluntários.",
      "Cada amostra possível da dimensão fixada tem a mesma probabilidade de ser selecionada.",
      "Cada indivíduo tem a mesma probabilidade de inclusão, mesmo que alguns pares nunca possam ser selecionados."
    ],
    "a": 2,
    "sol": "Numa amostra aleatória simples de dimensão fixa, todas as amostras possíveis têm a mesma probabilidade. Por exemplo, escolher com igual probabilidade o par {A, B} ou o par {C, D} dá igual probabilidade a cada pessoa, mas exclui os outros quatro pares.",
    "hyp": "Pode confundir aleatoriedade com escolha informal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-amostragem:10-est-amostragem:aleatoria-simples",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-007",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-AMO-039",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Uma população tem 70% de grupo A e 30% de grupo B. Uma amostra estratificada deliberadamente escolhe 50 A e 50 B para comparar os grupos. Esta amostra é proporcional à população?",
    "o": [
      "Sim.",
      "Só se a população tiver 100 pessoas.",
      "Não.",
      "Não é possível saber."
    ],
    "a": 2,
    "sol": "A amostra tem 50%-50%, diferente de 70%-30%. Pode ser útil para comparação, mas não é proporcional.",
    "hyp": "Pode confundir estratificação com proporcionalidade obrigatória.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-amostragem:10-est-amostragem:estratificada-desproporcional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-039",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-AMO-003",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Qual método tende a reduzir enviesamento de seleção numa população bem definida?",
    "o": [
      "Escolher apenas amigos.",
      "Escolher apenas os primeiros da lista.",
      "Seleção aleatória adequada.",
      "Aceitar apenas voluntários muito motivados."
    ],
    "a": 2,
    "sol": "A seleção aleatória dá oportunidades de seleção mais equilibradas aos elementos.",
    "hyp": "Pode confundir conveniência com aleatoriedade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-amostragem:10-est-amostragem:aleatoria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-003",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-AMO-021",
    "themeId": "10-est",
    "subtopicId": "10-est-amostragem",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Amostragem, representatividade e enviesamento",
    "q": "Um questionário sobre atividade física é divulgado apenas num ginásio. Qual conclusão é mais rigorosa?",
    "o": [
      "A amostra pode sobrestimar níveis de atividade física da população geral.",
      "A amostra é necessariamente aleatória.",
      "O tamanho do ginásio torna o estudo um censo.",
      "Não existe qualquer risco de enviesamento."
    ],
    "a": 0,
    "sol": "O local de recolha favorece pessoas mais ativas do que a média populacional.",
    "hyp": "Pode ignorar o contexto de seleção.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-amostragem:10-est-amostragem:conveniencia-enviesada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-AMO-021",
    "sourceFile": "content/vnext/math-a/10/10-est-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-BIV-006",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "O coeficiente de correlação linear r varia entre...",
    "o": [
      "0 e 100.",
      "−1 e 1.",
      "−100 e 100.",
      "0 e 1 apenas."
    ],
    "a": 1,
    "sol": "O coeficiente de correlação linear está entre −1 e 1.",
    "hyp": "Pode esquecer valores negativos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-bivariados-regressao:10-est-bivariados-regressao:intervalo-r",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-006",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-BIV-003",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Interpretação",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Num diagrama de dispersão, pontos que tendem a subir da esquerda para a direita sugerem...",
    "o": [
      "associação negativa.",
      "ausência total de relação.",
      "associação positiva.",
      "variável qualitativa."
    ],
    "a": 2,
    "sol": "Valores maiores de x tendem a associar-se a valores maiores de y.",
    "hyp": "Pode inverter o sinal da associação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-bivariados-regressao:10-est-bivariados-regressao:correlacao-positiva",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-003",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-BIV-022",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "A reta prevê y=12 para certo x, mas o valor observado é 15. Qual é o resíduo observado − previsto?",
    "o": [
      "−3",
      "3",
      "0",
      "27"
    ],
    "a": 1,
    "sol": "15−12=3.",
    "hyp": "Pode inverter o sinal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-bivariados-regressao:10-est-bivariados-regressao:residuo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-022",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-BIV-007",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Um valor r próximo de 1 indica...",
    "o": [
      "forte associação linear negativa.",
      "ausência de relação.",
      "forte associação linear positiva.",
      "causalidade garantida."
    ],
    "a": 2,
    "sol": "r próximo de 1 significa pontos próximos de uma reta crescente.",
    "hyp": "Pode confundir correlação forte com causalidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-bivariados-regressao:10-est-bivariados-regressao:interpretar-r-positivo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-007",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-BIV-037",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "A reta y=8+2x prevê y=18 para x=5. Se o observado é 21, qual é o resíduo e interpretação?",
    "o": [
      "3; observado acima da reta.",
      "−3; observado acima da reta.",
      "3; observado abaixo da reta.",
      "−3; observado abaixo da reta."
    ],
    "a": 0,
    "sol": "Previsto=18; observado − previsto=3, logo o ponto está acima.",
    "hyp": "Pode inverter o sinal ou a posição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-bivariados-regressao:10-est-bivariados-regressao:residuo-interpretacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-037",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-BIV-002",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Um diagrama de dispersão representa...",
    "o": [
      "apenas frequências de categorias.",
      "pares de valores de duas variáveis quantitativas.",
      "uma única média.",
      "classes de um histograma."
    ],
    "a": 1,
    "sol": "Cada ponto representa um par observado.",
    "hyp": "Pode confundir scatterplot com gráfico de barras.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-bivariados-regressao:10-est-bivariados-regressao:scatterplot",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-002",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-BIV-021",
    "themeId": "10-est",
    "subtopicId": "10-est-bivariados-regressao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Dados bivariados, diagrama de dispersão, correlação, regressão, outliers e correlação vs causalidade",
    "q": "Num diagrama de dispersão, o resíduo de uma observação é o desvio vertical em relação à reta de regressão. É positivo quando o ponto fica acima da reta. Como se calcula?",
    "o": [
      "valor observado de y menos valor previsto de y.",
      "a média de x.",
      "o coeficiente de correlação.",
      "o número de observações."
    ],
    "a": 0,
    "sol": "Para o mesmo valor de x, compara-se a ordenada y observada com a ordenada y prevista pela reta. Subtrair o valor previsto ao observado dá um resíduo positivo quando o ponto está acima da reta.",
    "hyp": "Pode confundir resíduo com valor previsto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-bivariados-regressao:10-est-bivariados-regressao:residuo-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-BIV-021",
    "sourceFile": "content/vnext/math-a/10/10-est-bivariados-regressao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-DIS-006",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "A variância baseia-se, em termos simples, em...",
    "o": [
      "diferenças apenas entre máximo e mínimo.",
      "desvios quadráticos relativamente à média.",
      "frequências relativas acumuladas.",
      "ordenação alfabética."
    ],
    "a": 1,
    "sol": "A variância resume o quadrado dos desvios à média.",
    "hyp": "Pode confundir variância com amplitude.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-dispersao:10-est-dispersao:variancia-conceito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-006",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-DIS-002",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Qual é a amplitude de 3,5,8,10?",
    "o": [
      "5",
      "7",
      "8",
      "10"
    ],
    "a": 1,
    "sol": "10−3=7.",
    "hyp": "Pode subtrair valores centrais em vez dos extremos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-dispersao:10-est-dispersao:amplitude",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-002",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-DIS-024",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Num diagrama de extremos e quartis, a caixa normalmente representa...",
    "o": [
      "do mínimo ao máximo inteiro.",
      "apenas a média.",
      "a moda.",
      "de Q1 a Q3."
    ],
    "a": 3,
    "sol": "O primeiro quartil Q₁ e o terceiro quartil Q₃ são os extremos da caixa. O seu comprimento é a amplitude interquartil Q₃−Q₁.",
    "hyp": "Pode confundir caixa com amplitude total.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-dispersao:10-est-dispersao:boxplot-caixa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-024",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-DIS-008",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Uma vantagem do desvio padrão face à variância é que...",
    "o": [
      "é sempre inteiro.",
      "ignora todos os extremos.",
      "é sempre menor que 1.",
      "fica nas mesmas unidades da variável."
    ],
    "a": 3,
    "sol": "Como é raiz da variância, recupera as unidades originais.",
    "hyp": "Pode ignorar unidades.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-dispersao:10-est-dispersao:unidades-desvio-padrao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-008",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-DIS-037",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Conjunto A: 4,5,6. Conjunto B: 3,5,7. Ambos têm média 5. Qual tem maior variância populacional?",
    "o": [
      "B",
      "A",
      "Igual",
      "Nenhum"
    ],
    "a": 0,
    "sol": "A desvios −1,0,1; variância 2/3. B desvios −2,0,2; variância 8/3.",
    "hyp": "Pode olhar apenas para a média comum.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-dispersao:10-est-dispersao:comparar-variancias",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-037",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-DIS-003",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Uma medida de dispersão serve para descrever...",
    "o": [
      "apenas o valor central.",
      "o número de categorias.",
      "quanto os valores se espalham.",
      "o nome da variável."
    ],
    "a": 2,
    "sol": "Dispersão mede variabilidade em torno de um centro ou entre extremos.",
    "hyp": "Pode confundir localização com dispersão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-dispersao:10-est-dispersao:dispersao-conceito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-003",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-DIS-021",
    "themeId": "10-est",
    "subtopicId": "10-est-dispersao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Medidas de dispersão e interpretação conjunta",
    "q": "Dados ordenados: 1,2,3,4,5,6,7,8. Usando mediana das metades, Q1 é...",
    "o": [
      "2,5",
      "2",
      "3",
      "3,5"
    ],
    "a": 0,
    "sol": "Metade inferior 1,2,3,4; mediana=(2+3)/2=2,5.",
    "hyp": "Pode escolher o segundo valor sem fazer mediana da metade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-dispersao:10-est-dispersao:quartil",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-DIS-021",
    "sourceFile": "content/vnext/math-a/10/10-est-dispersao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-LOC-008",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Medidas de localização",
    "q": "Qual é a média de 5,7,8,10?",
    "o": [
      "7",
      "8",
      "8,5",
      "7,5"
    ],
    "a": 3,
    "sol": "(5+7+8+10)/4=30/4=7,5.",
    "hyp": "Pode calcular mediana em vez de média.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-localizacao:10-est-localizacao:media-simples",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-008",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-LOC-002",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Medidas de localização",
    "q": "A mediana é...",
    "o": [
      "a média dos valores mínimo e máximo da lista ordenada.",
      "o centro da lista ordenada, usando a média dos dois valores centrais se forem dois.",
      "a soma dos valores dividida pelo número de observações.",
      "o valor que mais se repete, ou os valores empatados na maior frequência."
    ],
    "a": 1,
    "sol": "Ordenam-se as observações. Com um número ímpar, há um único valor central, que é a mediana. Com um número par, calcula-se a média dos dois valores centrais.",
    "hyp": "Pode confundir mediana com média ou moda.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-localizacao:10-est-localizacao:mediana-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-002",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-LOC-021",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Medidas de localização",
    "q": "Qual medida é geralmente mais sensível a um valor extremo muito elevado?",
    "o": [
      "Média.",
      "Mediana.",
      "Moda sempre.",
      "Todas exatamente igual."
    ],
    "a": 0,
    "sol": "A média usa todos os valores e pode ser puxada por extremos.",
    "hyp": "Pode não distinguir robustez das medidas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-localizacao:10-est-localizacao:outlier-media",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-021",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-LOC-016",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Medidas de localização",
    "q": "A média de 5 valores é 12. Quatro deles são 10,11,12,13. Qual é o quinto?",
    "o": [
      "12",
      "13",
      "15",
      "14"
    ],
    "a": 3,
    "sol": "Soma total=60; conhecidos somam 46; falta 14.",
    "hyp": "Pode calcular média apenas dos conhecidos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-localizacao:10-est-localizacao:valor-em-falta-media",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-016",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-LOC-049",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Medidas de localização",
    "q": "Cinco salários mensais são 1 000 €, 1 050 €, 1 100 €, 1 150 € e 8 000 €. Dado o valor extremo de 8 000 €, qual destas medidas descreve melhor um salário típico do grupo?",
    "o": [
      "Mediana=1 100 €.",
      "Média=2 460 €.",
      "Máximo=8 000 €.",
      "Amplitude=7 000 €."
    ],
    "a": 0,
    "sol": "A mediana é o salário central, 1 100 €. A média é 12 300 €/5=2 460 € e fica acima dos primeiros quatro salários, pois é bastante influenciada pelo valor extremo de 8 000 €.",
    "hyp": "Pode usar a média sem considerar o extremo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-localizacao:10-est-localizacao:escolher-medida",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-049",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-LOC-005",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Medidas de localização",
    "q": "Qual é a mediana de 2, 5, 9?",
    "o": [
      "5",
      "2",
      "7",
      "9"
    ],
    "a": 0,
    "sol": "Os dados já estão ordenados; o valor central é 5.",
    "hyp": "Pode calcular a média em vez da mediana.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-localizacao:10-est-localizacao:mediana-impar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-005",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-LOC-022",
    "themeId": "10-est",
    "subtopicId": "10-est-localizacao",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Medidas de localização",
    "q": "Dados 10,10,11,12,57. Qual é a mediana?",
    "o": [
      "10",
      "11",
      "12",
      "20"
    ],
    "a": 1,
    "sol": "Ordenados, o valor central é 11.",
    "hyp": "Pode deixar o valor extremo influenciar a mediana.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-localizacao:10-est-localizacao:mediana-outlier",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-LOC-022",
    "sourceFile": "content/vnext/math-a/10/10-est-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-PPA-007",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "A variável 'cor dos olhos' é, neste contexto, uma variável...",
    "o": [
      "quantitativa discreta.",
      "quantitativa contínua.",
      "qualitativa.",
      "constante numérica."
    ],
    "a": 2,
    "sol": "Cor dos olhos descreve categorias, não quantidades numéricas.",
    "hyp": "Pode classificar qualquer variável registada como quantitativa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-problema-pop-amostra:10-est-problema-pop-amostra:tipo-qualitativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-007",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-PPA-004",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "Pretende-se estudar o tempo diário de estudo dos 600 alunos de uma escola. São inquiridos 80 alunos. Qual é a população?",
    "o": [
      "Os 80 alunos inquiridos.",
      "Apenas os alunos que estudam mais de 1 hora.",
      "Os tempos de estudo registados.",
      "Os 600 alunos da escola."
    ],
    "a": 3,
    "sol": "A população é o conjunto dos 600 alunos sobre os quais se pretende tirar conclusões.",
    "hyp": "Pode identificar a amostra como população.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-problema-pop-amostra:10-est-problema-pop-amostra:identificar-populacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-004",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-PPA-021",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "Pretende-se estudar o consumo semanal de água das famílias de uma cidade. Qual formulação identifica corretamente população e variável?",
    "o": [
      "População: famílias da cidade; variável: consumo semanal de água por família.",
      "População: famílias da cidade; variável: número de pessoas por família.",
      "População: famílias inquiridas; variável: consumo semanal de água por família.",
      "População: moradores da cidade; variável: consumo semanal de água por morador."
    ],
    "a": 0,
    "sol": "A população é o conjunto de famílias; a variável é a quantidade observada em cada família.",
    "hyp": "Pode trocar elementos e característica.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-problema-pop-amostra:10-est-problema-pop-amostra:populacao-variavel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-021",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-PPA-008",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "A variável 'número de irmãos' é...",
    "o": [
      "qualitativa.",
      "quantitativa contínua.",
      "nominal sem contagem.",
      "quantitativa discreta."
    ],
    "a": 3,
    "sol": "É uma contagem que assume valores inteiros: variável quantitativa discreta.",
    "hyp": "Pode confundir contagem com medida contínua.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-problema-pop-amostra:10-est-problema-pop-amostra:tipo-discreta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-008",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-PPA-041",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "Uma investigação quer estudar a duração de bateria de um modelo de telemóvel. São testados 40 aparelhos retirados de uma produção de 10 000. Qual é a unidade estatística?",
    "o": [
      "Cada aparelho.",
      "Os 10 000 aparelhos em conjunto.",
      "A duração média.",
      "O laboratório."
    ],
    "a": 0,
    "sol": "Cada aparelho é uma unidade sobre a qual se mede a duração.",
    "hyp": "Pode confundir unidade estatística com população ou variável.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-problema-pop-amostra:10-est-problema-pop-amostra:unidade-estatistica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-041",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-PPA-003",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "Num estudo sobre a altura dos alunos de uma escola, qual é a variável?",
    "o": [
      "A escola inteira.",
      "O número total de alunos.",
      "A altura de cada aluno.",
      "A tabela usada para registar os dados."
    ],
    "a": 2,
    "sol": "A variável é a característica observada em cada elemento: a altura.",
    "hyp": "Pode confundir variável com população.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-problema-pop-amostra:10-est-problema-pop-amostra:definicao-variavel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-003",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-PPA-022",
    "themeId": "10-est",
    "subtopicId": "10-est-problema-pop-amostra",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Problema estatístico, variabilidade, população, amostra e variável",
    "q": "Num estudo sobre satisfação dos clientes de uma loja, 'muito insatisfeito, insatisfeito, neutro, satisfeito, muito satisfeito' é uma variável...",
    "o": [
      "qualitativa nominal sem ordem.",
      "qualitativa ordinal.",
      "quantitativa contínua.",
      "quantitativa discreta."
    ],
    "a": 1,
    "sol": "As categorias têm uma ordem natural de satisfação, embora não sejam medidas numéricas com distâncias fixas.",
    "hyp": "Pode tratar códigos numéricos das categorias como quantidades.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-problema-pop-amostra:10-est-problema-pop-amostra:qualitativa-ordinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-PPA-022",
    "sourceFile": "content/vnext/math-a/10/10-est-problema-pop-amostra.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-UNI-007",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Dados univariados e representações",
    "q": "Numa amostra de 40, uma categoria tem frequência absoluta 10. Qual é a frequência relativa?",
    "o": [
      "10%",
      "20%",
      "25%",
      "40%"
    ],
    "a": 2,
    "sol": "10/40=25%.",
    "hyp": "Pode usar a própria frequência absoluta como percentagem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-univariados-representacoes:10-est-univariados-representacoes:freq-relativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-007",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-UNI-005",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Dados univariados e representações",
    "q": "A soma das frequências relativas de todas as categorias deve ser...",
    "o": [
      "1 ou 100%.",
      "0.",
      "o tamanho da amostra em percentagem.",
      "a média."
    ],
    "a": 0,
    "sol": "As categorias cobrem todas as observações, logo as proporções somam 1.",
    "hyp": "Pode confundir frequências relativas com absolutas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-univariados-representacoes:10-est-univariados-representacoes:soma-relativas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-005",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-UNI-025",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Dados univariados e representações",
    "q": "As frequências acumuladas para quatro valores são 4, 9, 15, 20. Qual é a frequência absoluta do terceiro valor?",
    "o": [
      "6",
      "5",
      "9",
      "15"
    ],
    "a": 0,
    "sol": "15−9=6.",
    "hyp": "Pode usar a acumulada como frequência simples.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-univariados-representacoes:10-est-univariados-representacoes:recuperar-frequencia-de-acumulada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-025",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-UNI-012",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Dados univariados e representações",
    "q": "Qual diferença visual típica existe entre gráfico de barras e histograma?",
    "o": [
      "Num diagrama de barras, as categorias têm sempre de ser intervalos numéricos.",
      "No histograma, a ordem dos retângulos pode ser escolhida livremente.",
      "Num diagrama de barras, a largura da barra indica a frequência.",
      "No histograma, os retângulos representam intervalos contíguos."
    ],
    "a": 3,
    "sol": "O histograma agrupa dados quantitativos em intervalos contíguos no eixo horizontal. Num diagrama de barras para dados categóricos, cada barra corresponde a uma categoria e pode ser separada das restantes.",
    "hyp": "Pode tratar qualquer conjunto de retângulos como o mesmo gráfico.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-univariados-representacoes:10-est-univariados-representacoes:barras-vs-histograma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-012",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-UNI-049",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Dados univariados e representações",
    "q": "Uma pesquisa a 200 alunos dá A=80, B=50, C=40, D=30. Qual conjunto de frequências relativas está correto?",
    "o": [
      "40%,25%,20%,15%",
      "80%,50%,40%,30%",
      "20%,25%,40%,15%",
      "40%,20%,25%,15%"
    ],
    "a": 0,
    "sol": "Dividindo cada contagem por 200: 40%,25%,20%,15%.",
    "hyp": "Pode usar contagens como percentagens ou trocar categorias.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-univariados-representacoes:10-est-univariados-representacoes:tabela-completa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-049",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-UNI-004",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Dados univariados e representações",
    "q": "Uma categoria tem frequência relativa de 30% numa amostra de 50. Qual é a frequência absoluta?",
    "o": [
      "10",
      "20",
      "30",
      "15"
    ],
    "a": 3,
    "sol": "0,30×50=15.",
    "hyp": "Pode usar 30 como contagem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-univariados-representacoes:10-est-univariados-representacoes:freq-absoluta-de-relativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-004",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10EST-UNI-021",
    "themeId": "10-est",
    "subtopicId": "10-est-univariados-representacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Dados univariados e representações",
    "q": "Numa amostra de 100, as categorias A,B,C têm frequências 45,35,20. Qual é a frequência relativa acumulada até B, nessa ordem?",
    "o": [
      "80%",
      "35%",
      "45%",
      "100%"
    ],
    "a": 0,
    "sol": "45%+35%=80%.",
    "hyp": "Pode usar apenas B ou somar todas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-est-univariados-representacoes:10-est-univariados-representacoes:acumulada-categorias-ordenadas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10EST-UNI-021",
    "sourceFile": "content/vnext/math-a/10/10-est-univariados-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-BRL-007",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Um trabalhador tem salário bruto de 1 400 €. Neste exercício, desconta 11% do bruto para a Segurança Social e 6% do bruto para retenção. Qual é a percentagem total de descontos sobre o bruto?",
    "o": [
      "15%",
      "16%",
      "17%",
      "18%"
    ],
    "a": 2,
    "sol": "11%+6%=17%.",
    "hyp": "Pode somar percentagens de forma incorreta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-bruto-liquido:10-fin-bruto-liquido:somar-taxas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-007",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-BRL-002",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Um salário bruto é 1 200 € e existem descontos totais de 180 €. Qual é o salário líquido?",
    "o": [
      "1 080 €",
      "1 020 €",
      "1 180 €",
      "1 380 €"
    ],
    "a": 1,
    "sol": "1 200−180=1 020 €.",
    "hyp": "Pode somar os descontos ao salário bruto em vez de os subtrair.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-bruto-liquido:10-fin-bruto-liquido:liquido-desconto-fixo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-002",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-BRL-024",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Um líquido de 1 800 € corresponde a 75% do salário bruto. Qual é o bruto?",
    "o": [
      "2 200 €",
      "2 300 €",
      "2 500 €",
      "2 400 €"
    ],
    "a": 3,
    "sol": "Bruto=1 800/0,75=2 400 €.",
    "hyp": "Pode adicionar 25% ao líquido em vez de dividir pela fração restante.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-bruto-liquido:10-fin-bruto-liquido:reconstruir-bruto-percentagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-024",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-BRL-013",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Se o salário bruto se mantiver e a percentagem total de descontos aumentar, o que acontece ao salário líquido?",
    "o": [
      "Diminui.",
      "Aumenta.",
      "Mantém-se sempre.",
      "Passa a ser igual ao bruto."
    ],
    "a": 0,
    "sol": "Com o bruto fixo, mais descontos deixam um valor líquido menor.",
    "hyp": "Pode pensar que percentagens maiores aumentam todos os valores envolvidos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-bruto-liquido:10-fin-bruto-liquido:relacao-descontos-liquido",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-013",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-BRL-047",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Num exercício, o bruto é 2 100 €, a Segurança Social é 11% do bruto e a retenção é 8% do bruto. Existe ainda um desconto fixo de 35 €. Qual é o líquido?",
    "o": [
      "1 626 €",
      "1 686 €",
      "1 666 €",
      "1 706 €"
    ],
    "a": 2,
    "sol": "11%+8%=19% de 2 100=399 €. Total descontos=399+35=434 €. Líquido=1 666 €.",
    "hyp": "Pode esquecer o desconto fixo ou aplicar uma das taxas sobre o líquido intermédio.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-bruto-liquido:10-fin-bruto-liquido:duas-taxas-mais-fixo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-047",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-BRL-003",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Um salário bruto é 1 500 € e os descontos representam 10% do bruto. Qual é o valor dos descontos?",
    "o": [
      "100 €",
      "200 €",
      "150 €",
      "250 €"
    ],
    "a": 2,
    "sol": "10% de 1 500 € é 150 €.",
    "hyp": "Pode confundir percentagem com valor absoluto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-bruto-liquido:10-fin-bruto-liquido:desconto-percentual",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-003",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-BRL-021",
    "themeId": "10-fin",
    "subtopicId": "10-fin-bruto-liquido",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Salário bruto/líquido, Segurança Social e retenção",
    "q": "Num exercício, um bruto de 1 850 € tem 11% de Segurança Social e 9% de retenção, ambas sobre o bruto. Qual é o líquido?",
    "o": [
      "1 480 €",
      "1 430 €",
      "1 460 €",
      "1 500 €"
    ],
    "a": 0,
    "sol": "Taxa total=20%. Descontos=370 €. Líquido=1 480 €.",
    "hyp": "Pode calcular apenas uma das taxas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-bruto-liquido:10-fin-bruto-liquido:liquido-duas-taxas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-BRL-021",
    "sourceFile": "content/vnext/math-a/10/10-fin-bruto-liquido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-IRS-006",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Tabela didática: 10% até 1 000 € e 20% entre 1 000 € e 2 000 €. Qual é o imposto sobre 1 500 €?",
    "o": [
      "150 €",
      "200 €",
      "180 €",
      "250 €"
    ],
    "a": 1,
    "sol": "Primeiros 1 000 €: 100 €. Restantes 500 €: 100 €. Total 200 €.",
    "hyp": "Pode aplicar 20% ao rendimento total.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-irs:10-fin-irs:dois-escaloes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-006",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-IRS-002",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Como se calcula a taxa efetiva de imposto num exercício simplificado?",
    "o": [
      "Maior taxa marginal ÷ número de escalões.",
      "Imposto total ÷ rendimento considerado.",
      "Soma das taxas marginais.",
      "Rendimento ÷ imposto total."
    ],
    "a": 1,
    "sol": "Taxa efetiva = imposto total / rendimento.",
    "hyp": "Pode inverter a razão ou usar a maior taxa marginal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-irs:10-fin-irs:efetiva-conceito",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-002",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-IRS-023",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Numa tabela didática com 0% até 600 €, 10% entre 600 € e 1 600 € e 25% acima de 1 600 €, se o rendimento aumenta de 2 000 € para 2 400 €, quanto aumenta o imposto?",
    "o": [
      "40 €",
      "60 €",
      "100 €",
      "160 €"
    ],
    "a": 2,
    "sol": "Os 400 € adicionais são tributados a 25%: 100 €.",
    "hyp": "Pode voltar a tributar os escalões inferiores.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-irs:10-fin-irs:incremento-marginal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-023",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-IRS-012",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Um rendimento atinge um escalão marginal de 30%, mas a taxa efetiva é 18%. Isto é coerente?",
    "o": [
      "Não, as duas taxas têm de ser iguais.",
      "Sim, porque a maior taxa marginal é a taxa efetiva de cada parcela.",
      "Não, porque a taxa efetiva seria a média simples das taxas marginais.",
      "Sim, porque as parcelas inferiores são tributadas a taxas menores."
    ],
    "a": 3,
    "sol": "A taxa efetiva é o imposto total dividido pelo rendimento. Como cada parcela é tributada à sua taxa marginal, o resultado é uma média das taxas ponderada pelo peso de cada parcela. As parcelas tributadas abaixo de 30% podem fazer a taxa efetiva descer para 18%.",
    "hyp": "Pode esperar igualdade entre taxa marginal e média.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-irs:10-fin-irs:marginal-vs-efetiva",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-012",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-IRS-041",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Tabela didática: 5% até 1 000 €, 15% nos 1 500 € seguintes, 25% no excedente. Qual é o imposto sobre 3 000 €?",
    "o": [
      "400 €",
      "350 €",
      "375 €",
      "425 €"
    ],
    "a": 0,
    "sol": "Nos primeiros 1 000 €, 5% dá 50 €. Nos 1 500 € seguintes, 15% dá 225 €. Sobram 500 €, dos quais 25% são 125 €. Assim, o imposto é 50+225+125=400 €.",
    "hyp": "Pode aplicar as taxas aos limites acumulados em vez das larguras.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-irs:10-fin-irs:escaloes-larguras",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-041",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-IRS-003",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Uma tabela didática tributa um rendimento de 800 € a uma taxa única de 10%. Qual é o imposto?",
    "o": [
      "60 €",
      "70 €",
      "80 €",
      "90 €"
    ],
    "a": 2,
    "sol": "10% de 800 € = 80 €.",
    "hyp": "Pode deslocar incorretamente a vírgula ao calcular percentagens.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-irs:10-fin-irs:taxa-unica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-003",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-IRS-021",
    "themeId": "10-fin",
    "subtopicId": "10-fin-irs",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "IRS, taxas, escalões e progressividade",
    "q": "Tabela: 0% até 600 €, 10% entre 600 € e 1 600 €, 25% acima de 1 600 €. Qual é o imposto sobre 2 000 €?",
    "o": [
      "200 €",
      "160 €",
      "180 €",
      "250 €"
    ],
    "a": 0,
    "sol": "0 + 10% de 1 000 (100 €) + 25% de 400 (100 €) = 200 €.",
    "hyp": "Pode aplicar 25% ao total.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-irs:10-fin-irs:tres-escaloes-isento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-IRS-021",
    "sourceFile": "content/vnext/math-a/10/10-fin-irs.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JC-006",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "2 000 € a 5% ao ano durante 2 anos em regime composto. Qual é o montante?",
    "o": [
      "2 200,00 €",
      "2 205,00 €",
      "2 210,00 €",
      "2 215,00 €"
    ],
    "a": 1,
    "sol": "2000×1,05²=2205 €.",
    "hyp": "Pode usar crescimento simples e obter 2200 €.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-composto-credito:10-fin-juro-composto-credito:dois-periodos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-006",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JC-002",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Qual fórmula representa o montante M de um capital C aplicado à taxa i por período durante n períodos em regime composto?",
    "o": [
      "M=C(1+in)",
      "M=C(1+i)^n",
      "M=C+i+n",
      "M=C/i^n"
    ],
    "a": 1,
    "sol": "A fórmula de capitalização composta é M=C(1+i)^n.",
    "hyp": "Pode usar a fórmula do juro simples.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-composto-credito:10-fin-juro-composto-credito:formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-002",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JC-023",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Um capital passa de 1 000 € para 1 331 € em 3 anos com taxa anual composta constante. Qual é a taxa?",
    "o": [
      "8%",
      "11%",
      "10%",
      "33,1%"
    ],
    "a": 2,
    "sol": "1331=1000×1,1³, logo 10%.",
    "hyp": "Pode usar o crescimento acumulado de 33,1% como taxa anual.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-composto-credito:10-fin-juro-composto-credito:inverter-taxa-tres-periodos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-023",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JC-015",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Para o mesmo capital inicial positivo e a mesma taxa positiva por período, como se comparam os montantes de juro simples e composto após mais de um período?",
    "o": [
      "O simples dá um montante maior, porque mantém fixa a base de cálculo.",
      "Os montantes são iguais, porque o capital inicial e a taxa coincidem.",
      "O composto dá um montante maior, porque os juros acumulados também rendem.",
      "Os montantes só diferem se as duas taxas forem diferentes."
    ],
    "a": 2,
    "sol": "Ao fim do primeiro período, os montantes coincidem. Em cada período seguinte o juro simples incide sobre o capital inicial, enquanto o juro composto incide também sobre os juros acumulados. Como a taxa é positiva, o montante composto é maior a partir do segundo período.",
    "hyp": "Pode ignorar o efeito dos juros sobre juros.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-composto-credito:10-fin-juro-composto-credito:simples-vs-composto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-015",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JC-040",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Uma poupança inicial de 5 000 € rende 3% ao ano em regime de juro composto, com capitalização anual. Sem depósitos ou levantamentos, qual é o montante ao fim de cinco anos, arredondado aos cêntimos?",
    "o": [
      "5 750,00 €",
      "5 850,00 €",
      "6 000,00 €",
      "5 796,37 €"
    ],
    "a": 3,
    "sol": "5000×1,03⁵≈5796,37 €.",
    "hyp": "Pode aplicar 15% simples.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-composto-credito:10-fin-juro-composto-credito:poupanca-longo-prazo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-040",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JC-003",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "1 000 € são aplicados a 10% ao ano durante 1 ano em juro composto. Qual é o montante?",
    "o": [
      "1 010 €",
      "1 050 €",
      "1 100 €",
      "1 210 €"
    ],
    "a": 2,
    "sol": "1000×1,10=1100 €.",
    "hyp": "Pode interpretar 10% como 10 €.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-composto-credito:10-fin-juro-composto-credito:um-periodo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-003",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JC-030",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-composto-credito",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Comparação",
    "focus": "Juro composto, poupança, crédito e modelação financeira",
    "q": "Opção A: 2 000 € a 5% composto por 2 anos. Opção B: 2 000 € a 5% simples por 2 anos. Qual termina maior e por quanto?",
    "o": [
      "B, por 5 €.",
      "A, por 5 €.",
      "A, por 50 €.",
      "São iguais."
    ],
    "a": 1,
    "sol": "A=2205 €, B=2200 €. A é maior por 5 €.",
    "hyp": "Pode esperar uma diferença muito maior ou nenhuma diferença.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-composto-credito:10-fin-juro-composto-credito:comparar-simples-composto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JC-030",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-composto-credito.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JS-006",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Juro simples",
    "q": "Um capital de 1 500 € é aplicado a 6% ao ano durante 2 anos, em juro simples. Qual é o juro total?",
    "o": [
      "90 €",
      "180 €",
      "120 €",
      "210 €"
    ],
    "a": 1,
    "sol": "1500×0,06×2=180 €.",
    "hyp": "Pode calcular apenas um ano ou capitalizar os juros.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-simples:10-fin-juro-simples:juro-multiano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-006",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JS-005",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Juro simples",
    "q": "Qual fórmula representa o juro simples J para capital C, taxa por período i e n períodos?",
    "o": [
      "J=C×i×n",
      "J=C+i+n",
      "J=C(1+i)^n",
      "J=C/i×n"
    ],
    "a": 0,
    "sol": "No regime simples, J=Cin.",
    "hyp": "Pode confundir com a fórmula do montante composto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-simples:10-fin-juro-simples:formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-005",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JS-022",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Juro simples",
    "q": "Uma aplicação de 2 000 € terminou com 2 300 € após 3 anos em juro simples. Qual foi a taxa anual?",
    "o": [
      "4%",
      "5%",
      "6%",
      "7%"
    ],
    "a": 1,
    "sol": "J=300 €. i=300/(2000×3)=0,05=5%.",
    "hyp": "Pode calcular 300/2000=15% e esquecer os 3 anos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-simples:10-fin-juro-simples:taxa-a-partir-montante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-022",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JS-016",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Juro simples",
    "q": "No juro simples com capital inicial e taxa positivos e fixos, como evolui o montante de um período para o seguinte?",
    "o": [
      "É multiplicado sempre pelo mesmo fator superior a 1.",
      "Aumenta um valor monetário que diminui a cada período.",
      "Mantém o valor, porque a taxa de juro é constante.",
      "Aumenta sempre o mesmo valor monetário por período."
    ],
    "a": 3,
    "sol": "Em cada período, o juro é a taxa fixa multiplicada pelo capital inicial. Assim, acrescenta-se sempre o mesmo montante. O total é uma função afim do número de períodos.",
    "hyp": "Pode confundir crescimento linear com composto exponencial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-simples:10-fin-juro-simples:crescimento-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-016",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JS-037",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Juro simples",
    "q": "Um fundo aplica 3 000 € a 4,8% ao ano em juro simples durante 10 meses. Qual é o montante final?",
    "o": [
      "3 120 €",
      "3 100 €",
      "3 110 €",
      "3 140 €"
    ],
    "a": 0,
    "sol": "10/12 ano; J=3000×0,048×10/12=120 €. M=3120 €.",
    "hyp": "Pode usar 10/100 como fração anual.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-simples:10-fin-juro-simples:modelacao-meses",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-037",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JS-002",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Juro simples",
    "q": "Um capital de 1 000 € é aplicado durante 1 ano a 5% de juro simples. Qual é o juro?",
    "o": [
      "25 €",
      "50 €",
      "75 €",
      "100 €"
    ],
    "a": 1,
    "sol": "J=1000×0,05×1=50 €.",
    "hyp": "Pode usar 5 como fator em vez de 0,05.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-simples:10-fin-juro-simples:juro-1-ano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-002",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-JS-030",
    "themeId": "10-fin",
    "subtopicId": "10-fin-juro-simples",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Comparação",
    "focus": "Juro simples",
    "q": "Opção A: 2 000 € a 4% simples por 3 anos. Opção B: 2 000 € a 5% simples por 2 anos. Qual gera mais juro?",
    "o": [
      "B, por 40 €.",
      "A, por 40 €.",
      "A, por 20 €.",
      "São iguais."
    ],
    "a": 1,
    "sol": "A: 240 €. B: 200 €. A gera mais 40 €.",
    "hyp": "Pode comparar apenas as taxas e ignorar o tempo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-juro-simples:10-fin-juro-simples:comparar-opcoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-JS-030",
    "sourceFile": "content/vnext/math-a/10/10-fin-juro-simples.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-SAL-007",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Uma pessoa trabalha 35 horas por semana durante 4 semanas, à taxa de 10 € por hora. Neste modelo simplificado, quanto recebe no período?",
    "o": [
      "1 200 €",
      "1 300 €",
      "1 400 €",
      "1 500 €"
    ],
    "a": 2,
    "sol": "35×4=140 horas; 140×10=1 400 €.",
    "hyp": "Pode esquecer uma das etapas: converter semanas em horas e depois aplicar a taxa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-salarios:10-fin-salarios:semanas-horas-remuneracao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-007",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-SAL-002",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Um salário anual de 18 000 € é pago em 12 prestações mensais iguais. Qual é cada prestação?",
    "o": [
      "1 200 €",
      "1 500 €",
      "1 400 €",
      "1 800 €"
    ],
    "a": 1,
    "sol": "18 000÷12=1 500 €.",
    "hyp": "Pode dividir por 10 ou 14 sem ler o número de pagamentos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-salarios:10-fin-salarios:anual-para-mensal-12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-002",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-SAL-024",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Uma pessoa recebe 15 600 € por ano. Após uma alteração, passa a receber 1 350 € por mês em 12 pagamentos. Qual é a variação anual?",
    "o": [
      "Aumenta 300 €.",
      "Diminui 300 €.",
      "Diminui 600 €.",
      "Aumenta 600 €."
    ],
    "a": 3,
    "sol": "O novo anual é 1 350×12=16 200 €. A diferença é 600 €.",
    "hyp": "Pode comparar 1 350 com 15 600 sem converter para o mesmo período.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-salarios:10-fin-salarios:comparar-periodos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-024",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-SAL-008",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Duas ofertas são: X — 1 250 € por mês em 12 pagamentos; Y — 1 100 € por pagamento em 14 pagamentos. Qual tem maior total anual?",
    "o": [
      "X, por 400 €.",
      "São iguais.",
      "Y, por 1 400 €.",
      "Y, por 400 €."
    ],
    "a": 3,
    "sol": "X=1 250×12=15 000 €. Y=1 100×14=15 400 €. Y é superior em 400 €.",
    "hyp": "Pode comparar apenas os valores de cada prestação e ignorar o número de pagamentos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-salarios:10-fin-salarios:comparar-ofertas-num-pagamentos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-008",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-SAL-047",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Uma pessoa trabalha 9 meses num projeto, recebendo 1 600 € por mês, e recebe ainda um bónus fixo de 900 € no fim. Qual é o total do projeto?",
    "o": [
      "14 400 €",
      "14 900 €",
      "15 300 €",
      "15 900 €"
    ],
    "a": 2,
    "sol": "9×1 600=14 400; mais 900 dá 15 300 €.",
    "hyp": "Pode esquecer o bónus ou contar 12 meses.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-salarios:10-fin-salarios:salario-mais-bonus",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-047",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-SAL-003",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Um contrato prevê 14 pagamentos anuais de 1 100 € cada. Qual é o total anual?",
    "o": [
      "14 400 €",
      "16 400 €",
      "15 400 €",
      "13 200 €"
    ],
    "a": 2,
    "sol": "14×1 100=15 400 €.",
    "hyp": "Pode assumir automaticamente 12 pagamentos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-salarios:10-fin-salarios:pagamentos-14-total",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-003",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FIN-SAL-022",
    "themeId": "10-fin",
    "subtopicId": "10-fin-salarios",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Salário mensal, anual e valor-hora",
    "q": "Uma pessoa recebe 14 400 € por ano e trabalha 1 600 horas nesse ano. Qual é o valor médio por hora?",
    "o": [
      "8 €",
      "9 €",
      "10 €",
      "12 €"
    ],
    "a": 1,
    "sol": "14 400÷1 600=9 € por hora.",
    "hyp": "Pode dividir por meses em vez de usar as horas anuais fornecidas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fin-salarios:10-fin-salarios:anual-para-hora",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FIN-SAL-022",
    "sourceFile": "content/vnext/math-a/10/10-fin-salarios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-AF-006",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função afim e modelação",
    "q": "Se a>0 numa função afim f(x)=ax+b, a função é...",
    "o": [
      "decrescente.",
      "crescente.",
      "constante.",
      "quadrática."
    ],
    "a": 1,
    "sol": "Declive positivo implica crescimento.",
    "hyp": "Pode confundir sinal do declive.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-afim:10-fun-afim:monotonia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-006",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-AF-004",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Função afim e modelação",
    "q": "Para f(x)=3x+2, qual é f(4)?",
    "o": [
      "10",
      "12",
      "16",
      "14"
    ],
    "a": 3,
    "sol": "3×4+2=14.",
    "hyp": "Pode esquecer o termo independente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-afim:10-fun-afim:avaliar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-004",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-AF-021",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função afim e modelação",
    "q": "Qual é a equação da reta que passa por (1,3) e (3,7)?",
    "o": [
      "y=2x+1",
      "y=x+2",
      "y=2x−1",
      "y=3x"
    ],
    "a": 0,
    "sol": "Declive=2. Usando (1,3): 3=2+b => b=1.",
    "hyp": "Pode calcular declive certo e termo independente errado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-afim:10-fun-afim:equacao-dois-pontos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-021",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-AF-011",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Função afim e modelação",
    "q": "A reta y=5x−3 interseta o eixo Oy em...",
    "o": [
      "(−3,0).",
      "(0,5).",
      "(0,−3).",
      "(5,0)."
    ],
    "a": 2,
    "sol": "Em x=0, y=−3.",
    "hyp": "Pode trocar eixos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-afim:10-fun-afim:intersecao-Oy",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-011",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-AF-042",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Função afim e modelação",
    "q": "No instante inicial, um depósito contém 120 L. A água entra a 8 L por minuto. Qual expressão dá o volume V(t), em litros, t minutos depois de se iniciar o enchimento?",
    "o": [
      "V(t)=120−8t",
      "V(t)=120+8t",
      "V(t)=8+120t",
      "V(t)=128t"
    ],
    "a": 1,
    "sol": "Valor inicial 120 e crescimento 8 por minuto.",
    "hyp": "Pode trocar taxa e valor inicial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-afim:10-fun-afim:modelo-crescente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-042",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-AF-002",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função afim e modelação",
    "q": "Na função f(x)=ax+b, o coeficiente a representa...",
    "o": [
      "a ordenada na origem.",
      "o declive da reta.",
      "o zero sempre.",
      "o domínio."
    ],
    "a": 1,
    "sol": "a mede a variação de y por unidade de x.",
    "hyp": "Pode confundir declive com termo independente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-afim:10-fun-afim:declive",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-002",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-AF-023",
    "themeId": "10-fun",
    "subtopicId": "10-fun-afim",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função afim e modelação",
    "q": "A reta y=3x+b passa por (2,10). Quanto vale b?",
    "o": [
      "2",
      "6",
      "4",
      "8"
    ],
    "a": 2,
    "sol": "10=6+b => b=4.",
    "hyp": "Pode multiplicar b por x.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-afim:10-fun-afim:determinar-b",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-AF-023",
    "sourceFile": "content/vnext/math-a/10/10-fun-afim.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-CR-006",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Conceito de função e representações",
    "q": "Uma função pode ser representada por...",
    "o": [
      "uma fórmula ou uma tabela, mas nunca um gráfico.",
      "uma fórmula, tabela, gráfico ou descrição verbal adequada.",
      "um gráfico ou uma tabela, mas nunca uma descrição verbal.",
      "uma tabela ou uma descrição verbal, mas nunca uma fórmula."
    ],
    "a": 1,
    "sol": "Uma função pode ter diferentes representações equivalentes.",
    "hyp": "Pode reduzir conceito de função a uma fórmula algébrica.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-conceito-representacoes:10-fun-conceito-representacoes:multiplas-representacoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-006",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-CR-004",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Conceito de função e representações",
    "q": "Se f(x)=2x+1, quanto vale f(4)?",
    "o": [
      "7",
      "8",
      "10",
      "9"
    ],
    "a": 3,
    "sol": "f(4)=2×4+1=9.",
    "hyp": "Pode esquecer o termo constante.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-conceito-representacoes:10-fun-conceito-representacoes:avaliar-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-004",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-CR-022",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Conceito de função e representações",
    "q": "Uma tabela contém apenas os pares (2; 3) e (3; 2). Estes pares impedem que a tabela represente uma função?",
    "o": [
      "Sim, pois a saída 3 também aparece como entrada.",
      "Não, pois as entradas 2 e 3 têm uma saída cada.",
      "Sim, pois as duas entradas têm saídas diferentes.",
      "Não, pois a saída de um par deve ser a entrada no outro."
    ],
    "a": 1,
    "sol": "As duas entradas são distintas. A entrada 2 tem apenas a saída 3, e a entrada 3 tem apenas a saída 2. Assim, a tabela pode representar uma função.",
    "hyp": "Pode confundir função com monotonia ou injetividade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-conceito-representacoes:10-fun-conceito-representacoes:funcao-nao-monotona",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-022",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-CR-007",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Conceito de função e representações",
    "q": "Numa tabela de correspondência, a mesma entrada aparece associada ao valor 4 e ao valor 6. Pode a tabela representar uma função?",
    "o": [
      "Sim, porque os valores de saída são diferentes.",
      "Não, porque as entradas devem ser 4 e 6.",
      "Não, porque uma entrada tem duas saídas diferentes.",
      "Sim, porque cada linha da tabela tem uma única saída."
    ],
    "a": 2,
    "sol": "Uma mesma entrada não pode ter duas imagens diferentes numa função.",
    "hyp": "Pode aceitar múltiplas saídas para a mesma entrada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-conceito-representacoes:10-fun-conceito-representacoes:teste-tabela",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-007",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-CR-040",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Conceito de função e representações",
    "q": "Uma tarifa custa 3 € fixos mais 0,50 € por quilómetro. Qual função do número x de quilómetros modela o custo?",
    "o": [
      "C(x)=3x+0,5",
      "C(x)=0,5(x+3)",
      "C(x)=3−0,5x",
      "C(x)=3+0,5x"
    ],
    "a": 3,
    "sol": "Há uma componente fixa 3 e uma variável 0,5x.",
    "hyp": "Pode trocar taxa variável e termo fixo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-conceito-representacoes:10-fun-conceito-representacoes:modelo-tarifa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-040",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-CR-002",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Conceito de função e representações",
    "q": "Na notação f(x), x representa normalmente...",
    "o": [
      "a imagem obrigatória.",
      "uma variável de entrada.",
      "o contradomínio.",
      "o gráfico inteiro."
    ],
    "a": 1,
    "sol": "x representa um elemento do domínio usado como entrada da função.",
    "hyp": "Pode confundir argumento com valor da função.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-conceito-representacoes:10-fun-conceito-representacoes:notacao-fx",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-002",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-CR-021",
    "themeId": "10-fun",
    "subtopicId": "10-fun-conceito-representacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Conceito de função e representações",
    "q": "Se o ponto (−1,5) pertence ao gráfico de f, então...",
    "o": [
      "f(−1)=5.",
      "f(5)=−1.",
      "f(1)=−5.",
      "f(−5)=1."
    ],
    "a": 0,
    "sol": "Num gráfico y=f(x), o par é (x,f(x)).",
    "hyp": "Pode inverter as coordenadas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-conceito-representacoes:10-fun-conceito-representacoes:grafico-para-valor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-CR-021",
    "sourceFile": "content/vnext/math-a/10/10-fun-conceito-representacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-DIZ-006",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
    "q": "No gráfico de y=f(x), os zeros são as abcissas dos pontos em que o gráfico...",
    "o": [
      "interseta o eixo Oy.",
      "interseta ou toca o eixo Ox.",
      "muda de monotonia.",
      "tem sempre máximo."
    ],
    "a": 1,
    "sol": "Um zero é a abcissa de um ponto do gráfico cuja ordenada é nula, porque f(x)=0. Assim, localiza os pontos onde o gráfico encontra o eixo Ox e lê as suas abcissas.",
    "hyp": "Pode confundir eixo Ox com Oy.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:zero-grafico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-006",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-DIZ-004",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
    "q": "Se f(x)=x−3, qual é o zero de f?",
    "o": [
      "−3",
      "0",
      "6",
      "3"
    ],
    "a": 3,
    "sol": "x−3=0 => x=3.",
    "hyp": "Pode trocar sinal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:zero-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-004",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-DIZ-025",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
    "q": "Considera a parábola y=x²−2x e a reta y=4−2x. Quais são as abcissas dos pontos de interseção dos dois gráficos?",
    "o": [
      "−2 e 2.",
      "−4 e 4.",
      "0 e 4.",
      "apenas 2."
    ],
    "a": 0,
    "sol": "Iguala x²−2x e 4−2x, porque as ordenadas coincidem nos pontos de interseção. Soma 2x aos dois membros para obter x²=4. Assim, os gráficos encontram-se nas abcissas −2 e 2.",
    "hyp": "Pode procurar os zeros de cada expressão em vez de igualar as duas ordenadas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:zeros-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-025",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-DIZ-007",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
    "q": "Se o gráfico de f interseta o eixo Ox apenas em x=−1 e x=4, quais são os zeros de f?",
    "o": [
      "0 e 3.",
      "−4 e 1.",
      "−1 e 4.",
      "apenas 4."
    ],
    "a": 2,
    "sol": "Nos pontos de interseção com o eixo Ox, a ordenada é zero porque todos os pontos desse eixo têm a forma (x; 0). Assim, os zeros de f são −1 e 4.",
    "hyp": "Pode usar ordenadas em vez de abcissas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:zeros-grafico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-007",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-DIZ-050",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
    "q": "A altura de um objeto é dada por h(t)=20−5t, com t, em segundos, contado desde o início da observação até o objeto atingir o solo. Qual é o domínio temporal do modelo e qual é o seu zero?",
    "o": [
      "Domínio R e zero t=5.",
      "Domínio [0,4] e zero t=4.",
      "Domínio [0,5] e zero t=4.",
      "Domínio [−4,0] e zero t=−4."
    ],
    "a": 1,
    "sol": "Iguala a altura a zero: 20−5t=0, logo t=4. O modelo começa em t=0 e termina em t=4, porque este é o instante em que o objeto atinge o solo. Assim, o domínio é [0,4].",
    "hyp": "Pode ignorar o contexto ao definir o domínio.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:modelo-dominio-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-050",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-DIZ-002",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
    "q": "A imagem de uma função é...",
    "o": [
      "o conjunto de todas as entradas.",
      "o conjunto dos valores efetivamente obtidos pela função.",
      "um único valor obrigatório.",
      "o conjunto das entradas para as quais a função toma o valor zero."
    ],
    "a": 1,
    "sol": "Para formar a imagem, calcula f(x) para os valores x do domínio e reúne as saídas obtidas. Um valor pertence à imagem porque é atingido pela função para pelo menos uma entrada.",
    "hyp": "Pode confundir imagem com domínio ou contradomínio.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:imagem-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-002",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-DIZ-021",
    "themeId": "10-fun",
    "subtopicId": "10-fun-dominio-imagem-zeros",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Domínio, contradomínio/imagem, zeros e sinal",
    "q": "Qual é a imagem de f(x)=x² com domínio R?",
    "o": [
      "[0,+∞[.",
      "R.",
      "]−∞,0].",
      "R\\{0}."
    ],
    "a": 0,
    "sol": "Quadrados reais são não negativos e qualquer valor não negativo é atingido.",
    "hyp": "Pode achar que a imagem é R.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-dominio-imagem-zeros:10-fun-dominio-imagem-zeros:imagem-quadrado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-DIZ-021",
    "sourceFile": "content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-QUA-006",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Quais são os zeros de f(x)=x²−9?",
    "o": [
      "−9 e 9.",
      "−3 e 3.",
      "0 e 9.",
      "apenas 3."
    ],
    "a": 1,
    "sol": "x²=9 => x=±3.",
    "hyp": "Pode esquecer a raiz negativa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-quadratica:10-fun-quadratica:zeros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-006",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-QUA-002",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "O gráfico de uma função quadrática é...",
    "o": [
      "uma reta.",
      "uma parábola.",
      "uma circunferência.",
      "uma hipérbole sempre."
    ],
    "a": 1,
    "sol": "Funções quadráticas têm gráficos parabólicos.",
    "hyp": "Pode confundir famílias de gráficos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-quadratica:10-fun-quadratica:grafico-parabola",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-002",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-QUA-021",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Uma parábola tem zeros 1 e 5. Qual é a abcissa do eixo de simetria?",
    "o": [
      "3",
      "2",
      "4",
      "5"
    ],
    "a": 0,
    "sol": "O eixo fica a meio das raízes: (1+5)/2=3.",
    "hyp": "Pode usar soma sem dividir por 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-quadratica:10-fun-quadratica:eixo-entre-raizes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-021",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-QUA-012",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Considera a função quadrática f(x)=ax²+bx+c, com a>0. O vértice da parábola corresponde a...",
    "o": [
      "um máximo.",
      "um zero obrigatório.",
      "a ordenada na origem.",
      "um mínimo."
    ],
    "a": 3,
    "sol": "Parábola voltada para cima tem ponto mais baixo no vértice.",
    "hyp": "Pode confundir concavidade com extremo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-quadratica:10-fun-quadratica:extremo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-012",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-QUA-041",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "A altura de um objeto é dada por h(t)=−5t²+20t+1, onde t é o tempo, em segundos, desde o lançamento. Em que instante o objeto atinge a altura máxima?",
    "o": [
      "2 s",
      "1 s",
      "3 s",
      "4 s"
    ],
    "a": 0,
    "sol": "tV=−20/(2×−5)=2.",
    "hyp": "Pode usar o zero da função em vez do vértice.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-quadratica:10-fun-quadratica:modelo-altura-maximo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-041",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-QUA-003",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Se a>0 em f(x)=ax²+bx+c, a parábola abre...",
    "o": [
      "para baixo.",
      "para a direita.",
      "para cima.",
      "para a esquerda."
    ],
    "a": 2,
    "sol": "Coeficiente quadrático positivo implica concavidade voltada para cima.",
    "hyp": "Pode confundir sinal de a com declive.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-quadratica:10-fun-quadratica:concavidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-003",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-QUA-023",
    "themeId": "10-fun",
    "subtopicId": "10-fun-quadratica",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Função quadrática, zeros, extremos e problemas",
    "q": "Se uma quadrática com a>0 não tem zeros reais, então o seu gráfico...",
    "o": [
      "fica totalmente abaixo de Ox.",
      "é uma reta.",
      "fica totalmente acima do eixo Ox.",
      "tem de tocar Ox."
    ],
    "a": 2,
    "sol": "Com concavidade para cima e sem interseções com Ox, o mínimo é positivo.",
    "hyp": "Pode esquecer a concavidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-quadratica:10-fun-quadratica:sem-zeros-sinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-QUA-023",
    "sourceFile": "content/vnext/math-a/10/10-fun-quadratica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-TRM-006",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "O gráfico de g(x)=f(−x) é uma reflexão do gráfico de f relativamente...",
    "o": [
      "ao eixo Ox.",
      "ao eixo Oy.",
      "à reta y=x.",
      "à reta x=1."
    ],
    "a": 1,
    "sol": "As abcissas mudam de sinal, produzindo reflexão no eixo Oy.",
    "hyp": "Pode confundir mudança no argumento com mudança na saída.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:reflexao-Oy",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-006",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-TRM-002",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "O gráfico de g(x)=f(x)−2 é o de f deslocado...",
    "o": [
      "2 unidades para cima.",
      "2 unidades para baixo.",
      "2 unidades para a direita.",
      "2 unidades para a esquerda."
    ],
    "a": 1,
    "sol": "Subtrair 2 aos valores de f reduz todas as ordenadas em 2.",
    "hyp": "Pode inverter o sentido da translação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:translacao-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-002",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-TRM-021",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "O gráfico de y=|x−3| tem vértice...",
    "o": [
      "(3,0).",
      "(−3,0).",
      "(0,3).",
      "(0,−3)."
    ],
    "a": 0,
    "sol": "É o gráfico de |x| deslocado 3 unidades para a direita.",
    "hyp": "Pode inverter o sinal horizontal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:modulo-translacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-021",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-TRM-008",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "Se f(x)=x², qual é g(x)=f(x−3)?",
    "o": [
      "x²−3",
      "(x+3)²",
      "3x²",
      "(x−3)²"
    ],
    "a": 3,
    "sol": "Substitui-se x por x−3 na expressão de f.",
    "hyp": "Pode aplicar a translação como soma exterior.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:aplicar-translacao-horizontal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-008",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-TRM-037",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "Qual expressão representa |x−2| por ramos?",
    "o": [
      "x−2 se x≥2; 2−x se x<2.",
      "x−2 para todo x.",
      "2−x se x≥2; x−2 se x<2.",
      "x+2 se x≥0; −x−2 se x<0."
    ],
    "a": 0,
    "sol": "Quando x−2≥0 mantém-se; quando x−2<0 troca-se o sinal.",
    "hyp": "Pode usar a fronteira x=0 em vez de x=2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:modulo-ramos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-037",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-TRM-003",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "O gráfico de g(x)=f(x−4) é o de f deslocado...",
    "o": [
      "4 unidades para a esquerda.",
      "4 unidades para cima.",
      "4 unidades para a direita.",
      "4 unidades para baixo."
    ],
    "a": 2,
    "sol": "A substituição x→x−4 produz uma translação horizontal de 4 para a direita.",
    "hyp": "Pode interpretar o sinal horizontal como vertical.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:translacao-horizontal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-003",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10FUN-TRM-025",
    "themeId": "10-fun",
    "subtopicId": "10-fun-transformacoes-ramos-modulo",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Transformações de gráficos, funções por ramos e módulo",
    "q": "A desigualdade |x|<3 equivale a...",
    "o": [
      "−3<x<3.",
      "x<−3 ou x>3.",
      "x≤3.",
      "x≥−3."
    ],
    "a": 0,
    "sol": "Distância de x a 0 menor que 3 significa estar entre −3 e 3.",
    "hyp": "Pode confundir interior com exterior.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-fun-transformacoes-ramos-modulo:10-fun-transformacoes-ramos-modulo:inequacao-modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10FUN-TRM-025",
    "sourceFile": "content/vnext/math-a/10/10-fun-transformacoes-ramos-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-RET-006",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Colinearidade e equações de retas",
    "q": "Qual é o declive da reta que passa por (0,0) e (2,6)?",
    "o": [
      "2",
      "3",
      "4",
      "6"
    ],
    "a": 1,
    "sol": "m=(6−0)/(2−0)=3.",
    "hyp": "Pode inverter a razão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-colinearidade-retas:10-ga-colinearidade-retas:declive-dois-pontos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-006",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-RET-002",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Colinearidade e equações de retas",
    "q": "Uma reta não vertical pode ser escrita na forma reduzida...",
    "o": [
      "x=a.",
      "y=mx+b.",
      "x²+y²=r².",
      "y=ax²+bx+c."
    ],
    "a": 1,
    "sol": "m é o declive e b a ordenada na origem.",
    "hyp": "Pode confundir reta com outras curvas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-colinearidade-retas:10-ga-colinearidade-retas:reta-reduzida",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-002",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-RET-024",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Colinearidade e equações de retas",
    "q": "Uma reta horizontal é perpendicular a...",
    "o": [
      "outra horizontal.",
      "qualquer reta de declive 1.",
      "nenhuma reta.",
      "uma reta vertical."
    ],
    "a": 3,
    "sol": "Eixos horizontal e vertical formam 90°.",
    "hyp": "Pode tentar aplicar fórmula de declives à reta vertical, cujo declive não está definido.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-colinearidade-retas:10-ga-colinearidade-retas:horizontal-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-024",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-RET-015",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Colinearidade e equações de retas",
    "q": "Qual é a equação da reta de declive −1 que passa por (0,4)?",
    "o": [
      "y=x−4.",
      "y=4x−1.",
      "y=−x+4.",
      "x=4."
    ],
    "a": 2,
    "sol": "m=−1 e b=4.",
    "hyp": "Pode trocar declive e termo independente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-colinearidade-retas:10-ga-colinearidade-retas:equacao-reta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-015",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-RET-048",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Colinearidade e equações de retas",
    "q": "Uma estrada retilínea passa por (0,2) e (5,12). Qual é uma equação da estrada?",
    "o": [
      "y=5x+2.",
      "y=2x+5.",
      "y=x+2.",
      "y=2x+2."
    ],
    "a": 3,
    "sol": "Declive=(12−2)/5=2 e ordenada na origem 2.",
    "hyp": "Pode usar 5 como declive.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-colinearidade-retas:10-ga-colinearidade-retas:modelacao-reta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-048",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-RET-003",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Colinearidade e equações de retas",
    "q": "Na equação y=mx+b, m representa...",
    "o": [
      "a ordenada na origem.",
      "a abcissa do ponto médio.",
      "o declive.",
      "a norma."
    ],
    "a": 2,
    "sol": "m mede a taxa de variação da reta.",
    "hyp": "Pode trocar m e b.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-colinearidade-retas:10-ga-colinearidade-retas:declive",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-003",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-RET-021",
    "themeId": "10-ga",
    "subtopicId": "10-ga-colinearidade-retas",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Colinearidade e equações de retas",
    "q": "Para duas retas não verticais, o critério de perpendicularidade diz que os declives m₁ e m₂ são recíprocos e de sinais opostos. Qual igualdade traduz esse critério?",
    "o": [
      "m₁m₂=−1.",
      "m₁=m₂.",
      "m₁+m₂=0.",
      "m₁m₂=1."
    ],
    "a": 0,
    "sol": "Se m₁ e m₂ são recíprocos e têm sinais opostos, então m₂=−1/m₁. Ao multiplicar por m₁ obtém-se m₁m₂=−1.",
    "hyp": "Pode confundir declives opostos com perpendiculares.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-colinearidade-retas:10-ga-colinearidade-retas:perpendicularidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-RET-021",
    "sourceFile": "content/vnext/math-a/10/10-ga-colinearidade-retas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-CT-006",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Coordenadas e transformações no plano",
    "q": "A origem do referencial tem coordenadas...",
    "o": [
      "(1,0).",
      "(0,0).",
      "(0,1).",
      "(1,1)."
    ],
    "a": 1,
    "sol": "A origem é a interseção dos eixos.",
    "hyp": "Pode usar uma unidade em vez de zero.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:origem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-006",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-CT-004",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Coordenadas e transformações no plano",
    "q": "Qual ponto pertence ao eixo Ox?",
    "o": [
      "(0,4).",
      "(4,4).",
      "(−4,2).",
      "(4,0)."
    ],
    "a": 3,
    "sol": "No eixo Ox a ordenada é zero.",
    "hyp": "Pode confundir os dois eixos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:eixo-Ox",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-004",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-CT-027",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Coordenadas e transformações no plano",
    "q": "Uma rotação em torno da origem preserva...",
    "o": [
      "apenas abcissas.",
      "apenas ordenadas.",
      "distâncias e amplitudes de ângulos.",
      "a orientação horizontal de todos os segmentos."
    ],
    "a": 2,
    "sol": "Rotações são isometrias e preservam ângulos.",
    "hyp": "Pode achar que rotação altera comprimentos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:rotacao-isometria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-027",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-CT-007",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Coordenadas e transformações no plano",
    "q": "Um ponto com x>0 e y>0 pertence ao...",
    "o": [
      "2.º quadrante.",
      "3.º quadrante.",
      "1.º quadrante.",
      "4.º quadrante."
    ],
    "a": 2,
    "sol": "No 1.º quadrante ambas as coordenadas são positivas.",
    "hyp": "Pode trocar a convenção dos quadrantes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:quadrantes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-007",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-CT-037",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Coordenadas e transformações no plano",
    "q": "Uma translação leva A=(−2,3) a A'=(4,−1). Onde leva B=(1,5)?",
    "o": [
      "(7,1).",
      "(5,2).",
      "(−5,9).",
      "(3,4)."
    ],
    "a": 0,
    "sol": "O vetor é (6,−4). Aplicando a B: (7,1).",
    "hyp": "Pode recalcular um vetor diferente para B.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:mesma-translacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-037",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-CT-002",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Coordenadas e transformações no plano",
    "q": "A primeira coordenada de P=(3,−2) chama-se...",
    "o": [
      "ordenada.",
      "abcissa.",
      "cota.",
      "norma."
    ],
    "a": 1,
    "sol": "A primeira coordenada é a abcissa.",
    "hyp": "Pode trocar abcissa e ordenada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:abcissa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-002",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-CT-021",
    "themeId": "10-ga",
    "subtopicId": "10-ga-coordenadas-transformacoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Coordenadas e transformações no plano",
    "q": "Uma rotação de 90° no sentido anti-horário em torno da origem transforma (x,y) em...",
    "o": [
      "(−y,x).",
      "(y,−x).",
      "(−x,−y).",
      "(x,−y)."
    ],
    "a": 0,
    "sol": "A rotação de 90° no sentido positivo leva os vetores dos eixos (1,0) e (0,1) a (0,1) e (−1,0). Assim, a componente x contribui com x para a nova ordenada e a componente y contribui com −y para a nova abcissa. O resultado é (−y,x).",
    "hyp": "Pode usar a rotação horária.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-coordenadas-transformacoes:10-ga-coordenadas-transformacoes:rotacao-90",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-CT-021",
    "sourceFile": "content/vnext/math-a/10/10-ga-coordenadas-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-DPM-006",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Distâncias e ponto médio",
    "q": "Qual é o ponto médio de (0,0) e (6,4)?",
    "o": [
      "(6,2).",
      "(3,2).",
      "(3,4).",
      "(2,3)."
    ],
    "a": 1,
    "sol": "((0+6)/2,(0+4)/2)=(3,2).",
    "hyp": "Pode trocar coordenadas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:ponto-medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-006",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-DPM-005",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Distâncias e ponto médio",
    "q": "O ponto médio de A=(x1,y1) e B=(x2,y2) é...",
    "o": [
      "((x1+x2)/2,(y1+y2)/2).",
      "(x2−x1,y2−y1).",
      "(x1x2,y1y2).",
      "((x2−x1)/2,(y2−y1)/2)."
    ],
    "a": 0,
    "sol": "Cada coordenada do ponto médio é a média das coordenadas correspondentes.",
    "hyp": "Pode confundir com vetor AB.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:formula-ponto-medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-005",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-DPM-021",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Distâncias e ponto médio",
    "q": "Para que valor positivo de x a distância entre (0,0) e (x,0) é 7?",
    "o": [
      "7",
      "5",
      "6",
      "14"
    ],
    "a": 0,
    "sol": "|x|=7 e, sendo x positivo, x=7.",
    "hyp": "Pode esquecer a condição de positividade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:distancia-inversa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-021",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-DPM-017",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Distâncias e ponto médio",
    "q": "Se M é ponto médio de AB, então...",
    "o": [
      "MA=MB.",
      "MA=AB.",
      "MA=2MB.",
      "M coincide com A."
    ],
    "a": 0,
    "sol": "O ponto médio divide o segmento em duas partes iguais.",
    "hyp": "Pode confundir metade com total.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:propriedade-ponto-medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-017",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-DPM-048",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Distâncias e ponto médio",
    "q": "Duas estações estão em A=(2,1) e B=(8,5). Um ponto M equidistante das duas e situado exatamente a meio do segmento AB é...",
    "o": [
      "(3,5).",
      "(6,4).",
      "(10,6).",
      "(5,3)."
    ],
    "a": 3,
    "sol": "M é o ponto médio: ((2+8)/2,(1+5)/2)=(5,3).",
    "hyp": "Pode trocar coordenadas ou somar sem dividir.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:modelacao-ponto-medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-048",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-DPM-002",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Distâncias e ponto médio",
    "q": "Qual é a distância entre (0,0) e (3,4)?",
    "o": [
      "3",
      "5",
      "4",
      "7"
    ],
    "a": 1,
    "sol": "√(3²+4²)=5.",
    "hyp": "Pode somar 3+4.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:distancia-pitagoras",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-002",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-DPM-024",
    "themeId": "10-ga",
    "subtopicId": "10-ga-distancias-ponto-medio",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Distâncias e ponto médio",
    "q": "Qual é a distância entre A=(2,3) e B=(−4,−5)?",
    "o": [
      "8",
      "12",
      "14",
      "10"
    ],
    "a": 3,
    "sol": "Diferenças −6 e −8; distância √(36+64)=10.",
    "hyp": "Pode somar módulos 6+8.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-distancias-ponto-medio:10-ga-distancias-ponto-medio:distancia-geral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-DPM-024",
    "sourceFile": "content/vnext/math-a/10/10-ga-distancias-ponto-medio.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-ESP-007",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "A distância entre dois pontos no espaço usa...",
    "o": [
      "|Δx|+|Δy|+|Δz| sempre.",
      "apenas Δz.",
      "√[(Δx)²+(Δy)²+(Δz)²].",
      "a média das coordenadas."
    ],
    "a": 2,
    "sol": "É a extensão tridimensional do Teorema de Pitágoras.",
    "hyp": "Pode esquecer uma dimensão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-espaco:10-ga-espaco:distancia-espaco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-007",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-ESP-003",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Qual ponto pertence ao eixo Oz?",
    "o": [
      "(5,0,0).",
      "(0,5,0).",
      "(0,0,5).",
      "(1,1,5)."
    ],
    "a": 2,
    "sol": "No eixo Oz, x=y=0.",
    "hyp": "Pode confundir os eixos coordenados.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-espaco:10-ga-espaco:eixo-Oz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-003",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-ESP-021",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Na reta (x,y,z)=(1,2,3)+t(2,−1,4), o vetor diretor é...",
    "o": [
      "(2,−1,4).",
      "(1,2,3).",
      "(3,1,7).",
      "t."
    ],
    "a": 0,
    "sol": "O vetor multiplicado pelo parâmetro define a direção da reta.",
    "hyp": "Pode usar o ponto base como direção.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-espaco:10-ga-espaco:vetor-diretor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-021",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-ESP-008",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Qual é a distância entre O=(0,0,0) e P=(1,2,2)?",
    "o": [
      "2",
      "4",
      "√5",
      "3"
    ],
    "a": 3,
    "sol": "√(1+4+4)=3.",
    "hyp": "Pode somar 1+2+2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-espaco:10-ga-espaco:distancia-origem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-008",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-ESP-037",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Uma reta tem ponto P0=(1,0,2) e vetor diretor v=(2,1,−1). Qual ponto pertence à reta?",
    "o": [
      "(5,2,0).",
      "(3,2,1).",
      "(2,1,2).",
      "(5,1,0)."
    ],
    "a": 0,
    "sol": "Para t=2 obtém-se (5,2,0).",
    "hyp": "Pode escolher um ponto que altera componentes por fatores diferentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-espaco:10-ga-espaco:pertença-reta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-037",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-ESP-002",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Na notação P=(x,y,z), a terceira coordenada chama-se geralmente...",
    "o": [
      "abcissa.",
      "cota.",
      "ordenada.",
      "declive."
    ],
    "a": 1,
    "sol": "A terceira coordenada é a cota.",
    "hyp": "Pode confundir as designações das coordenadas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-espaco:10-ga-espaco:cota",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-002",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-ESP-022",
    "themeId": "10-ga",
    "subtopicId": "10-ga-espaco",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Coordenadas, vetores e relações geométricas no espaço",
    "q": "Na reta (x,y,z)=(1,2,3)+t(2,−1,4), que ponto corresponde a t=2?",
    "o": [
      "(3,1,7).",
      "(5,0,11).",
      "(4,0,8).",
      "(5,4,11)."
    ],
    "a": 1,
    "sol": "(1+4,2−2,3+8)=(5,0,11).",
    "hyp": "Pode não multiplicar todas as componentes por t.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-espaco:10-ga-espaco:avaliar-reta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-ESP-022",
    "sourceFile": "content/vnext/math-a/10/10-ga-espaco.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-LG-006",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "A equação de uma circunferência de centro (a,b) e raio r é...",
    "o": [
      "x+y=r.",
      "(x−a)²+(y−b)²=r².",
      "(x+a)²+(y+b)²=r.",
      "x²+y²=r."
    ],
    "a": 1,
    "sol": "A distância de (x,y) ao centro deve ser r.",
    "hyp": "Pode errar sinais ou esquecer o quadrado do raio.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-lugares-geometricos:10-ga-lugares-geometricos:equacao-circunferencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-006",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-LG-002",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "O lugar geométrico dos pontos do plano a distância r de um ponto C é...",
    "o": [
      "um círculo completo.",
      "uma circunferência de centro C e raio r.",
      "uma reta.",
      "uma parábola."
    ],
    "a": 1,
    "sol": "A circunferência contém os pontos cuja distância ao centro é exatamente r.",
    "hyp": "Pode confundir circunferência com círculo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-lugares-geometricos:10-ga-lugares-geometricos:circunferencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-002",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-LG-021",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "A mediatriz de A=(1,1) e B=(5,1) tem equação...",
    "o": [
      "x=3.",
      "y=1.",
      "x=1.",
      "y=3."
    ],
    "a": 0,
    "sol": "Ponto médio (3,1), AB horizontal; mediatriz vertical x=3.",
    "hyp": "Pode usar a ordenada do segmento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-lugares-geometricos:10-ga-lugares-geometricos:mediatriz-coordenadas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-021",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-LG-007",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "Qual é a equação da circunferência de centro (0,0) e raio 5?",
    "o": [
      "x²+y²=5.",
      "x+y=5.",
      "x²+y²=25.",
      "(x−5)²+y²=25."
    ],
    "a": 2,
    "sol": "r²=25.",
    "hyp": "Pode usar r em vez de r².",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-lugares-geometricos:10-ga-lugares-geometricos:circunferencia-origem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-007",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-LG-041",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "Se duas circunferências são concêntricas e têm raios diferentes, então...",
    "o": [
      "não se intersectam.",
      "são tangentes.",
      "intersectam-se em dois pontos.",
      "coincidem."
    ],
    "a": 0,
    "sol": "Com o mesmo centro e raios distintos, uma fica dentro da outra sem contacto.",
    "hyp": "Pode achar que mesmo centro implica coincidência.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-lugares-geometricos:10-ga-lugares-geometricos:concentricas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-041",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-LG-003",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "O círculo de centro C e raio r contém os pontos cuja distância a C é...",
    "o": [
      "exatamente r.",
      "maior que r.",
      "menor ou igual a r.",
      "sempre zero."
    ],
    "a": 2,
    "sol": "O círculo inclui interior e fronteira.",
    "hyp": "Pode confundir círculo com circunferência.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-lugares-geometricos:10-ga-lugares-geometricos:circulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-003",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-LG-023",
    "themeId": "10-ga",
    "subtopicId": "10-ga-lugares-geometricos",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Mediatriz, plano mediador, circunferência, círculo, esfera e superfície esférica",
    "q": "Qual é o centro e o raio da circunferência de equação (x−3)²+(y+2)²=25?",
    "o": [
      "Centro (−3,2), raio 5.",
      "Centro (3,−2), raio 12.",
      "Centro (3,−2), raio 5.",
      "Centro (6,−4), raio 5."
    ],
    "a": 2,
    "sol": "Compara com (x−a)²+(y−b)²=r². Tem-se a=3 e b=−2, porque y+2=y−(−2). Como o raio é positivo e r²=25, o raio é 5.",
    "hyp": "Pode completar quadrados incorretamente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-lugares-geometricos:10-ga-lugares-geometricos:completar-quadrados",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-LG-023",
    "sourceFile": "content/vnext/math-a/10/10-ga-lugares-geometricos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-VET-007",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Vetores, coordenadas, norma e operações",
    "q": "Qual é a norma de v=(−5,12)?",
    "o": [
      "17",
      "7",
      "13",
      "169"
    ],
    "a": 2,
    "sol": "√(25+144)=13.",
    "hyp": "Pode deixar o sinal negativo influenciar o quadrado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-vetores:10-ga-vetores:norma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-007",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-VET-002",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Vetores, coordenadas, norma e operações",
    "q": "O vetor AB é calculado por...",
    "o": [
      "A+B.",
      "B−A coordenada a coordenada.",
      "A−B.",
      "ponto médio de A e B."
    ],
    "a": 1,
    "sol": "AB=(xB−xA,yB−yA).",
    "hyp": "Pode inverter a ordem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-vetores:10-ga-vetores:vetor-AB",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-002",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-VET-021",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Vetores, coordenadas, norma e operações",
    "q": "Para que k o vetor (k,4) tenha norma 5?",
    "o": [
      "k=−3 ou 3.",
      "k=3 apenas.",
      "k=−5 ou 5.",
      "k=1."
    ],
    "a": 0,
    "sol": "k²+16=25 => k²=9 => k=±3.",
    "hyp": "Pode esquecer uma solução.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-vetores:10-ga-vetores:norma-parametro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-021",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-VET-017",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Vetores, coordenadas, norma e operações",
    "q": "Se u é um vetor não nulo e v=2u, qual é a relação entre v e u?",
    "o": [
      "São colineares e têm o mesmo sentido.",
      "São perpendiculares.",
      "Têm a mesma norma.",
      "São colineares e de sentidos opostos."
    ],
    "a": 0,
    "sol": "Como v é um múltiplo de u, os vetores têm a mesma direção. O fator 2 é positivo, por isso os dois vetores têm o mesmo sentido. A norma de v é o dobro da norma de u.",
    "hyp": "Pode confundir colinearidade com igualdade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-vetores:10-ga-vetores:vetores-proporcionais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-017",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-VET-047",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Vetores, coordenadas, norma e operações",
    "q": "Uma pessoa desloca-se 5 m para leste e depois 12 m para norte. Qual é a distância em linha reta entre o ponto de partida e o ponto de chegada?",
    "o": [
      "17 m.",
      "7 m.",
      "13 m.",
      "60 m."
    ],
    "a": 2,
    "sol": "Os dois percursos são perpendiculares e formam os catetos de um triângulo retângulo. A distância em linha reta é a hipotenusa, que mede √(5²+12²)=√169=13 m.",
    "hyp": "Pode somar as componentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-vetores:10-ga-vetores:modelacao-deslocamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-047",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-VET-008",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Vetores, coordenadas, norma e operações",
    "q": "O vetor nulo no plano é...",
    "o": [
      "(1,0).",
      "(0,1).",
      "(1,1).",
      "(0,0)."
    ],
    "a": 3,
    "sol": "Tem ambas as componentes nulas.",
    "hyp": "Pode confundir com vetor unitário.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-vetores:10-ga-vetores:vetor-nulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-008",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GA-VET-023",
    "themeId": "10-ga",
    "subtopicId": "10-ga-vetores",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Vetores, coordenadas, norma e operações",
    "q": "Se u=(2,−1) e v=(x,3) e u+v=(5,2), então x=",
    "o": [
      "2",
      "4",
      "3",
      "5"
    ],
    "a": 2,
    "sol": "2+x=5 => x=3.",
    "hyp": "Pode usar a segunda componente para x.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-ga-vetores:10-ga-vetores:equacao-vetorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GA-VET-023",
    "sourceFile": "content/vnext/math-a/10/10-ga-vetores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-BAR-006",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Uma mediana mede 12 cm. Quanto mede do baricentro ao ponto médio do lado?",
    "o": [
      "2 cm",
      "4 cm",
      "6 cm",
      "8 cm"
    ],
    "a": 1,
    "sol": "Essa parte é 1/3 da mediana: 4 cm.",
    "hyp": "Pode usar 2/3 em vez de 1/3.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-baricentro-medianas:10-gs-baricentro-medianas:mediana-1terco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-006",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-BAR-002",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Uma mediana liga um vértice...",
    "o": [
      "ao pé da altura.",
      "ao ponto médio do lado oposto.",
      "ao incentro.",
      "ao circuncentro."
    ],
    "a": 1,
    "sol": "Essa é a definição de mediana.",
    "hyp": "Pode confundir mediana com altura.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-baricentro-medianas:10-gs-baricentro-medianas:mediana-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-002",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-BAR-024",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Baricentro e propriedades das medianas",
    "q": "No triângulo ABC, a mediana AM mede 18 e G é o baricentro. Quanto medem AG e GM, respetivamente?",
    "o": [
      "9 e 9",
      "6 e 12",
      "15 e 3",
      "12 e 6"
    ],
    "a": 3,
    "sol": "AG=2/3×18=12 e GM=1/3×18=6.",
    "hyp": "Pode dividir a mediana em duas partes iguais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-baricentro-medianas:10-gs-baricentro-medianas:razao-completa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-024",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-BAR-012",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Se duas medianas se intersectam em G, a terceira mediana...",
    "o": [
      "é paralela às outras.",
      "não existe.",
      "passa necessariamente pelo circuncentro, mas não por G.",
      "também passa por G."
    ],
    "a": 3,
    "sol": "A concorrência das medianas garante que a terceira passa pelo mesmo ponto.",
    "hyp": "Pode achar que duas medianas não determinam o baricentro.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-baricentro-medianas:10-gs-baricentro-medianas:medianas-concorrentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-012",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-BAR-043",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Uma placa triangular homogénea tem vértices em três pontos. Para colocar um apoio único que a equilibre idealmente, deve-se localizar...",
    "o": [
      "a interseção das mediatrizes.",
      "a interseção das bissetrizes.",
      "a interseção das medianas.",
      "o ponto médio do maior lado."
    ],
    "a": 2,
    "sol": "O centro de massa da placa triangular uniforme é o baricentro.",
    "hyp": "Pode escolher circuncentro por associar a equilíbrio geométrico.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-baricentro-medianas:10-gs-baricentro-medianas:modelacao-centro-massa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-043",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-BAR-004",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Baricentro e propriedades das medianas",
    "q": "O baricentro divide cada mediana na razão...",
    "o": [
      "1:1.",
      "3:1.",
      "1:2, contando do vértice para o lado.",
      "2:1, contando do vértice para o lado."
    ],
    "a": 3,
    "sol": "O segmento do vértice ao baricentro é o dobro do segmento do baricentro ao ponto médio.",
    "hyp": "Pode inverter a razão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-baricentro-medianas:10-gs-baricentro-medianas:razao-2-1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-004",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-BAR-023",
    "themeId": "10-gs",
    "subtopicId": "10-gs-baricentro-medianas",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Baricentro e propriedades das medianas",
    "q": "Na mediana AM, AG=14 e GM=7. Quanto mede AM?",
    "o": [
      "14",
      "18",
      "21",
      "28"
    ],
    "a": 2,
    "sol": "AM=AG+GM=21.",
    "hyp": "Pode usar apenas a maior parte.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-baricentro-medianas:10-gs-baricentro-medianas:mediana-total",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-BAR-023",
    "sourceFile": "content/vnext/math-a/10/10-gs-baricentro-medianas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-CI-007",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Circuncentro e incentro",
    "q": "Se O é o circuncentro de ABC e OA=7 cm, então OB mede...",
    "o": [
      "3,5 cm",
      "14 cm",
      "7 cm",
      "não é possível saber"
    ],
    "a": 2,
    "sol": "OA=OB=OC porque O é equidistante dos vértices.",
    "hyp": "Pode achar que só dois raios são iguais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:raios-circunscrita",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-007",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-CI-002",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Circuncentro e incentro",
    "q": "O circuncentro está à mesma distância...",
    "o": [
      "dos três lados.",
      "dos três vértices.",
      "dos pontos médios apenas.",
      "das três alturas."
    ],
    "a": 1,
    "sol": "Por pertencer às mediatrizes, é equidistante dos vértices.",
    "hyp": "Pode confundir equidistância a vértices com equidistância a lados.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:circuncentro-equidistancia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-002",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-CI-021",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Circuncentro e incentro",
    "q": "Num triângulo retângulo, por que o ponto médio da hipotenusa é circuncentro?",
    "o": [
      "Porque é equidistante dos três vértices.",
      "Porque é equidistante dos três lados.",
      "Porque é interseção das medianas apenas.",
      "Porque a hipotenusa é uma bissetriz."
    ],
    "a": 0,
    "sol": "Pelo recíproco do teorema do ângulo inscrito numa semicircunferência, a hipotenusa AB é o diâmetro da circunferência circunscrita ao triângulo retângulo ABC. O circuncentro é o ponto médio de AB.",
    "hyp": "Pode justificar com propriedade errada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:circuncentro-retangulo-justificacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-021",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-CI-009",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Circuncentro e incentro",
    "q": "Num triângulo acutângulo, o circuncentro fica...",
    "o": [
      "no interior.",
      "sempre num vértice.",
      "fora do triângulo.",
      "no ponto médio de um lado sempre."
    ],
    "a": 0,
    "sol": "Num triângulo acutângulo, as mediatrizes intersectam-se no interior.",
    "hyp": "Pode não relacionar tipo de triângulo com localização do circuncentro.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:localizacao-circuncentro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-009",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-CI-043",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Circuncentro e incentro",
    "q": "Quer-se desenhar uma circunferência no interior de um triângulo, tangente aos três lados. Qual é o centro dessa circunferência?",
    "o": [
      "o circuncentro.",
      "o baricentro.",
      "o incentro.",
      "o ponto médio do maior lado."
    ],
    "a": 2,
    "sol": "A circunferência inscrita é tangente aos três lados e tem centro no incentro.",
    "hyp": "Pode confundir inscrita e circunscrita.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:modelacao-incircle",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-043",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-CI-003",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Circuncentro e incentro",
    "q": "O incentro de um triângulo é a interseção das...",
    "o": [
      "mediatrizes.",
      "alturas.",
      "bissetrizes internas.",
      "medianas."
    ],
    "a": 2,
    "sol": "As bissetrizes internas são concorrentes no incentro.",
    "hyp": "Pode trocar incentro por circuncentro.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:incentro-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-003",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-CI-022",
    "themeId": "10-gs",
    "subtopicId": "10-gs-circuncentro-incentro",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Circuncentro e incentro",
    "q": "Um triângulo retângulo tem hipotenusa 26. Qual é o diâmetro da circunferência circunscrita?",
    "o": [
      "13",
      "26",
      "52",
      "não é possível saber"
    ],
    "a": 1,
    "sol": "A hipotenusa é o diâmetro da circunferência circunscrita.",
    "hyp": "Pode confundir raio e diâmetro.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-circuncentro-incentro:10-gs-circuncentro-incentro:diametro-circunscrita-retangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-CI-022",
    "sourceFile": "content/vnext/math-a/10/10-gs-circuncentro-incentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-E9-006",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Que pontos pertencem, em qualquer triângulo, à circunferência dos nove pontos?",
    "o": [
      "os três vértices.",
      "os pontos médios dos três lados.",
      "os três excentros.",
      "os três pontos de tangência da circunferência inscrita."
    ],
    "a": 1,
    "sol": "A circunferência dos nove pontos passa pelos três pontos médios dos lados.",
    "hyp": "Pode pensar que passa pelos vértices como a circunscrita.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:nove-pontos-midpoints",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-006",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-E9-002",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Num triângulo não equilátero, O é o circuncentro, G o baricentro e H o ortocentro. Em que razão o baricentro divide o segmento OH?",
    "o": [
      "OG:GH=2:1.",
      "OG:GH=1:2.",
      "OG:GH=1:1.",
      "OG:GH=3:1."
    ],
    "a": 1,
    "sol": "G está entre O e H e GH=2·OG.",
    "hyp": "Pode inverter a razão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:euler-razao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-002",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-E9-022",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Num triângulo, O, G e H são o circuncentro, o baricentro e o ortocentro, respetivamente. Se OG=6 e GH=12, qual é o comprimento de OH?",
    "o": [
      "12",
      "18",
      "15",
      "24"
    ],
    "a": 1,
    "sol": "Na reta de Euler, o baricentro G está entre O e H. Por isso, OH=OG+GH=6+12=18.",
    "hyp": "Pode usar apenas o maior segmento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:euler-segmentos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-022",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-E9-009",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Se o raio circunscrito é R=12 cm, o raio da circunferência dos nove pontos é...",
    "o": [
      "6 cm",
      "3 cm",
      "12 cm",
      "24 cm"
    ],
    "a": 0,
    "sol": "R/2=6 cm.",
    "hyp": "Pode usar o raio inteiro.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:nove-pontos-raio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-009",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-E9-042",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "O incentro pertence sempre à reta de Euler?",
    "o": [
      "Sim.",
      "Não.",
      "Só se o triângulo for obtusângulo.",
      "Só se o triângulo for retângulo."
    ],
    "a": 1,
    "sol": "Em geral, o incentro não está na reta de Euler; em casos simétricos, como isósceles, pode estar no eixo comum.",
    "hyp": "Pode incluir todos os centros notáveis na reta de Euler.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:incentro-euler",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-042",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-E9-003",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Num triângulo não equilátero, sejam O o circuncentro, G o baricentro e H o ortocentro. Onde fica o centro da circunferência dos nove pontos?",
    "o": [
      "No ponto médio de OG.",
      "No baricentro G.",
      "No ponto médio de OH.",
      "No ponto médio de GH."
    ],
    "a": 2,
    "sol": "O centro N da circunferência dos nove pontos é o ponto médio do segmento OH.",
    "hyp": "Pode confundir o centro dos nove pontos com outro centro notável.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:nove-pontos-centro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-003",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-E9-023",
    "themeId": "10-gs",
    "subtopicId": "10-gs-euler-nove-pontos",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Localização dos centros, reta de Euler e circunferência dos nove pontos",
    "q": "Se N é ponto médio de OH e OH=24, qual é ON?",
    "o": [
      "6",
      "8",
      "12",
      "16"
    ],
    "a": 2,
    "sol": "Como N é o ponto médio de OH, os comprimentos ON e NH são iguais. Logo, ON=OH/2=24/2=12.",
    "hyp": "Pode confundir com OG=OH/3=8.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-euler-nove-pontos:10-gs-euler-nove-pontos:N-vs-G",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-E9-023",
    "sourceFile": "content/vnext/math-a/10/10-gs-euler-nove-pontos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-ORT-006",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Ortocentro e alturas",
    "q": "Que duas construções bastam para localizar o ortocentro de qualquer triângulo?",
    "o": [
      "Duas medianas.",
      "Duas alturas.",
      "Duas mediatrizes.",
      "Duas bissetrizes."
    ],
    "a": 1,
    "sol": "Duas alturas não paralelas determinam o ponto comum das três.",
    "hyp": "Pode escolher retas notáveis erradas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-ortocentro:10-gs-ortocentro:construcao-ortocentro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-006",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-ORT-003",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Interpretação",
    "focus": "Ortocentro e alturas",
    "q": "Num triângulo acutângulo, o ortocentro fica...",
    "o": [
      "fora.",
      "num vértice.",
      "no interior.",
      "no ponto médio de um lado."
    ],
    "a": 2,
    "sol": "As três alturas intersectam-se no interior num triângulo acutângulo.",
    "hyp": "Pode generalizar a localização de outros centros.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-ortocentro:10-gs-ortocentro:localizacao-acutangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-003",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-ORT-021",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Ortocentro e alturas",
    "q": "Num triângulo retângulo com catetos 6 e 8, qual é a área?",
    "o": [
      "24",
      "12",
      "36",
      "48"
    ],
    "a": 0,
    "sol": "Os catetos são base e altura perpendiculares: 1/2×6×8=24.",
    "hyp": "Pode multiplicar sem dividir por 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-ortocentro:10-gs-ortocentro:area-retangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-021",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-ORT-009",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Ortocentro e alturas",
    "q": "Se num triângulo retângulo o ângulo reto está em C, onde fica o ortocentro?",
    "o": [
      "Em C.",
      "No ponto médio de AB.",
      "No incentro.",
      "Fora do triângulo."
    ],
    "a": 0,
    "sol": "O vértice reto é interseção das duas alturas que coincidem com os catetos.",
    "hyp": "Pode confundir com circuncentro no ponto médio da hipotenusa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-ortocentro:10-gs-ortocentro:ortocentro-retangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-009",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-ORT-047",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Ortocentro e alturas",
    "q": "A partir de cada vértice de um triângulo, traça-se uma reta perpendicular à reta que contém o lado oposto. Como se chama o ponto comum às três retas?",
    "o": [
      "Baricentro.",
      "Incentro.",
      "Ortocentro.",
      "Circuncentro."
    ],
    "a": 2,
    "sol": "Cada reta assim traçada é a reta suporte de uma altura. As três retas passam pelo mesmo ponto, que é o ortocentro, mesmo quando uma altura encontra o prolongamento de um lado.",
    "hyp": "Pode confundir famílias de retas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-ortocentro:10-gs-ortocentro:modelacao-ortocentro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-047",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-ORT-002",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Ortocentro e alturas",
    "q": "Uma altura de um triângulo parte de um vértice e é perpendicular...",
    "o": [
      "à mediana oposta.",
      "à reta que contém o lado oposto.",
      "à bissetriz oposta.",
      "a qualquer lado adjacente."
    ],
    "a": 1,
    "sol": "A altura é perpendicular à reta suporte do lado oposto.",
    "hyp": "Pode esquecer que o pé pode estar num prolongamento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-ortocentro:10-gs-ortocentro:altura-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-002",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-ORT-022",
    "themeId": "10-gs",
    "subtopicId": "10-gs-ortocentro",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Ortocentro e alturas",
    "q": "Num triângulo retângulo com catetos 9 e 12, a hipotenusa mede 15. Qual é a altura à hipotenusa h, usando a igualdade das áreas?",
    "o": [
      "6",
      "7,2",
      "9",
      "12"
    ],
    "a": 1,
    "sol": "1/2×9×12=54 e 1/2×15×h=54, logo h=108/15=7,2.",
    "hyp": "Pode usar um cateto como altura à hipotenusa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-ortocentro:10-gs-ortocentro:altura-hipotenusa-area",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-ORT-022",
    "sourceFile": "content/vnext/math-a/10/10-gs-ortocentro.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-PC-006",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Propriedades geométricas e construções de base",
    "q": "A mediatriz de um segmento é o conjunto dos pontos que...",
    "o": [
      "estão sempre sobre o segmento.",
      "estão à mesma distância dos extremos do segmento.",
      "estão à mesma distância de três pontos.",
      "formam ângulo de 45° com o segmento."
    ],
    "a": 1,
    "sol": "A mediatriz é perpendicular ao segmento no ponto médio e caracteriza os pontos equidistantes dos seus extremos.",
    "hyp": "Pode memorizar apenas a construção e não a propriedade de distância.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:mediatriz-lugar-geometrico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-006",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-PC-002",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Num triângulo, dois ângulos medem 50° e 60°. Quanto mede o terceiro?",
    "o": [
      "60°",
      "70°",
      "80°",
      "90°"
    ],
    "a": 1,
    "sol": "180−50−60=70°.",
    "hyp": "Pode subtrair apenas um dos ângulos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:soma-angulos-triangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-002",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-PC-026",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Propriedades geométricas e construções de base",
    "q": "As áreas de dois triângulos semelhantes estão na razão 16:25. Qual é a razão simplificada dos comprimentos de lados correspondentes, pela mesma ordem?",
    "o": [
      "5:4",
      "4:5",
      "16:25",
      "2:5"
    ],
    "a": 1,
    "sol": "A razão das áreas é o quadrado da razão dos comprimentos. Na mesma ordem, a razão dos comprimentos é √(16/25)=4/5, ou 4:5.",
    "hyp": "Pode usar diretamente a razão das áreas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:semelhanca-inverter-area",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-026",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-PC-014",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Num triângulo equilátero, como se relacionam as retas da mediana, da altura e da bissetriz por um mesmo vértice com a mediatriz do lado oposto?",
    "o": [
      "são sempre distintas.",
      "coincidem.",
      "só duas coincidem.",
      "não existem."
    ],
    "a": 1,
    "sol": "O eixo de simetria por esse vértice passa pelo ponto médio do lado oposto, é perpendicular ao lado e divide o ângulo do vértice ao meio. Por isso, as quatro retas coincidem.",
    "hyp": "Pode transportar propriedades de triângulo escaleno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:equilatero-retas-notaveis",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-014",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-PC-048",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Pretende-se localizar um ponto de um terreno que fique à mesma distância de dois marcos A e B. Que construção geométrica é adequada?",
    "o": [
      "Bissetriz de um ângulo qualquer.",
      "Altura de um triângulo.",
      "Reta paralela a AB por A.",
      "Mediatriz de AB."
    ],
    "a": 3,
    "sol": "Todos os pontos da mediatriz têm distâncias iguais a A e B.",
    "hyp": "Pode escolher uma reta notável sem relação com a condição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:modelacao-mediatriz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-048",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-PC-003",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Num triângulo isósceles, os ângulos opostos aos lados iguais são...",
    "o": [
      "suplementares.",
      "sempre retos.",
      "iguais.",
      "sempre de 60°."
    ],
    "a": 2,
    "sol": "Lados iguais implicam ângulos da base iguais.",
    "hyp": "Pode confundir propriedade de isósceles com equilátero.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:isosceles-angulos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-003",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN10GS-PC-021",
    "themeId": "10-gs",
    "subtopicId": "10-gs-propriedades-construcoes",
    "year": "10.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Propriedades geométricas e construções de base",
    "q": "Dois triângulos são congruentes quando...",
    "o": [
      "têm a mesma forma e o mesmo tamanho.",
      "têm apenas a mesma área.",
      "têm apenas um ângulo igual.",
      "têm perímetros diferentes."
    ],
    "a": 0,
    "sol": "Congruência preserva comprimentos e ângulos correspondentes.",
    "hyp": "Pode confundir congruência com semelhança.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:10-gs-propriedades-construcoes:10-gs-propriedades-construcoes:congruencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN10GS-PC-021",
    "sourceFile": "content/vnext/math-a/10/10-gs-propriedades-construcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-DP-012",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "Para f(x)=x^2, quanto vale f'(1)?",
    "o": [
      "3",
      "1",
      "4",
      "2"
    ],
    "a": 3,
    "sol": "Pela regra da potência, f′(x)=2x. Logo f′(1)=2×1=2.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-derivada-ponto:11-cd-derivada-ponto:calculo:12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-012",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-DP-002",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "O que representa geometricamente f′(a)?",
    "o": [
      "o declive de qualquer secante",
      "o declive da reta tangente ao gráfico em x=a",
      "a ordenada do ponto",
      "a distância à origem"
    ],
    "a": 1,
    "sol": "No limite em que o segundo ponto da secante se aproxima do ponto de abcissa a, o declive da secante tende para o declive da reta tangente. Esse limite é f′(a).",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-derivada-ponto:11-cd-derivada-ponto:conceito:2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-002",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-DP-026",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "Para f(x)=x², quanto vale o limite do quociente [f(0+h)−f(0)]/h quando h→0?",
    "o": [
      "2",
      "0",
      "-2",
      "1"
    ],
    "a": 1,
    "sol": "Para h≠0, o quociente é h²/h=h. Logo, quando h tende para 0, o limite vale 0.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-derivada-ponto:11-cd-derivada-ponto:definicao-limite:26",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-026",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-DP-013",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "Para f(x)=x^2, quanto vale f'(3)?",
    "o": [
      "6",
      "7",
      "5",
      "12"
    ],
    "a": 0,
    "sol": "Pela regra da potência, f′(x)=2x. Logo f′(3)=2×3=6.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-derivada-ponto:11-cd-derivada-ponto:calculo:13",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-013",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-DP-041",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelacao",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "A posição de uma partícula é dada por s(t)=t², com s em metros e t em segundos. Qual é, em m/s, a velocidade instantânea no instante t=3?",
    "o": [
      "6",
      "8",
      "4",
      "3"
    ],
    "a": 0,
    "sol": "A velocidade instantânea é a derivada da posição. Como s′(t)=2t, no instante t=3 resulta s′(3)=6 m/s.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-derivada-ponto:11-cd-derivada-ponto:movimento:41",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-041",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-DP-003",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "Qual é a definição de f′(a) por meio de um limite?",
    "o": [
      "lim [f(a+h)+f(a)]/h, com h→0",
      "f(a+h)−f(a)",
      "lim [f(a+h)−f(a)]/h, com h→0",
      "lim h/[f(a+h)−f(a)], com h→0"
    ],
    "a": 2,
    "sol": "O numerador f(a+h)−f(a) é a variação dos valores de f quando a abcissa aumenta h. Divide-se essa variação pelo incremento h e toma-se o limite quando h tende para zero.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-derivada-ponto:11-cd-derivada-ponto:conceito:3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-003",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-DP-036",
    "themeId": "11-cd",
    "subtopicId": "11-cd-derivada-ponto",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Taxa instantânea e derivada num ponto",
    "q": "Num ponto x=2, sabe-se que f(2)=5 e f'(2)=3. Qual é o declive da tangente?",
    "o": [
      "5",
      "2",
      "4",
      "3"
    ],
    "a": 3,
    "sol": "O declive da tangente no ponto de abcissa 2 é o valor da derivada em 2, isto é, f′(2)=3. O valor f(2)=5 dá a ordenada desse ponto.",
    "hyp": "Pode confundir taxa média com derivada, ou substituir incorretamente no quociente incremental.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-derivada-ponto:11-cd-derivada-ponto:dados-derivada:36",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-DP-036",
    "sourceFile": "content/vnext/math-a/11/11-cd-derivada-ponto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-FD-012",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "função derivada",
    "q": "Se f(x)=5x^3, então f'(x)=",
    "o": [
      "5x²",
      "5x³",
      "15x³",
      "15x^2"
    ],
    "a": 3,
    "sol": "A regra da potência multiplica o coeficiente pelo expoente 3 e reduz o expoente em uma unidade. Logo, a derivada de 5x³ é 15x².",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-funcao-derivada:11-cd-funcao-derivada:derivar-polinomio:12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-012",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-FD-002",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "função derivada",
    "q": "Como varia f num intervalo onde f′(x)>0 para todo o x?",
    "o": [
      "decrescente",
      "crescente nesse intervalo",
      "constante",
      "necessariamente positiva"
    ],
    "a": 1,
    "sol": "Sinal positivo da derivada indica crescimento.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-funcao-derivada:11-cd-funcao-derivada:conceito:2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-002",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-FD-036",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "função derivada",
    "q": "Se f′(x)=2x, o que se pode concluir sobre f no intervalo ]0,+∞[?",
    "o": [
      "f é decrescente",
      "f é constante",
      "f é negativa",
      "f é crescente"
    ],
    "a": 3,
    "sol": "Para todo o x>0, f′(x)=2x>0. Portanto, f é crescente em ]0,+∞[.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-funcao-derivada:11-cd-funcao-derivada:sinal:36",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-036",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-FD-013",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "função derivada",
    "q": "Se f(x)=2x^5, então f'(x)=",
    "o": [
      "10x^4",
      "2x⁴",
      "2x⁵",
      "10x⁵"
    ],
    "a": 0,
    "sol": "A regra da potência multiplica o coeficiente pelo expoente 5 e reduz o expoente em uma unidade. Logo, a derivada de 2x⁵ é 10x⁴.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-funcao-derivada:11-cd-funcao-derivada:derivar-polinomio:13",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-013",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-FD-046",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "função derivada",
    "q": "Em cada expressão, C representa uma constante real. Qual das expressões tem derivada 4x³?",
    "o": [
      "4x^4+C",
      "x^4+C",
      "x^3+C",
      "x^4/4+C"
    ],
    "a": 1,
    "sol": "A derivada de x⁴ é 4x³ e a derivada de C é zero. Portanto, a derivada de x⁴+C é 4x³.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-funcao-derivada:11-cd-funcao-derivada:reconstruir:46",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-046",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-FD-003",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "função derivada",
    "q": "Como varia f num intervalo onde f′(x)<0 para todo o x?",
    "o": [
      "crescente",
      "constante",
      "decrescente nesse intervalo",
      "necessariamente negativa"
    ],
    "a": 2,
    "sol": "Sinal negativo indica decrescimento.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-funcao-derivada:11-cd-funcao-derivada:conceito:3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-003",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-FD-037",
    "themeId": "11-cd",
    "subtopicId": "11-cd-funcao-derivada",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "função derivada",
    "q": "Se f′(x)=2x, o que se pode concluir sobre f no intervalo ]−∞,0[?",
    "o": [
      "f é decrescente",
      "f é crescente",
      "f é constante",
      "f é positiva"
    ],
    "a": 0,
    "sol": "Para todo o x<0, f′(x)=2x<0. Portanto, f é decrescente em ]−∞,0[.",
    "hyp": "Pode confundir a função derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-funcao-derivada:11-cd-funcao-derivada:sinal:37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-FD-037",
    "sourceFile": "content/vnext/math-a/11/11-cd-funcao-derivada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-MO-012",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Monotonia, extremos e otimização",
    "q": "Uma função f derivável em ℝ satisfaz f′(x)=−2x. Que opção indica a monotonia de f de cada lado de x=0 e o tipo de extremo em x=0?",
    "o": [
      "decrescente antes de 0, crescente depois de 0 e mínimo em x=0.",
      "crescente antes de 0, decrescente depois de 0 e mínimo em x=0.",
      "crescente antes de 0, crescente depois de 0 e sem extremo em x=0.",
      "crescente antes de 0, decrescente depois de 0 e máximo em x=0."
    ],
    "a": 3,
    "sol": "Temos f′(0)=0. Antes de 0, f′ é positiva e depois é negativa. Portanto, f é crescente antes de 0 e decrescente depois de 0, pelo que tem um máximo em x=0.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:sinal:12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-012",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-MO-002",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Monotonia, extremos e otimização",
    "q": "Sabe-se que f'(x)<0 para todo o x de ]1,5[. Como varia f nesse intervalo?",
    "o": [
      "crescente",
      "decrescente nesse intervalo",
      "constante",
      "necessariamente negativa"
    ],
    "a": 1,
    "sol": "O sinal negativo determina decrescimento.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:conceito:2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-002",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-MO-031",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e otimização",
    "q": "No intervalo [−2,3], quais são o máximo e o mínimo absolutos de f(x)=x² e onde se atingem?",
    "o": [
      "Máximo 9 em x=3 e mínimo 4 em x=−2.",
      "Máximo 4 em x=−2 e mínimo 0 em x=0.",
      "Máximo 9 em x=3 e mínimo 0 em x=0.",
      "Máximo 9 em x=3 e mínimo 0 em x=−2."
    ],
    "a": 2,
    "sol": "A derivada f′(x)=2x anula-se em x=0. Comparam-se o valor nesse ponto e os nas extremidades: f(−2)=4, f(0)=0 e f(3)=9. Máximo 9 em x=3 e mínimo 0 em x=0.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:extremos-absolutos:31",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-031",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-MO-021",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Monotonia, extremos e otimização",
    "q": "Para f(x)=x²−4x+5, qual é o tipo de extremo, em que abcissa ocorre e que valor tem?",
    "o": [
      "x=2, sendo mínimo e f(2)=1.",
      "x=2, sendo mínimo e f(2)=5.",
      "x=0, sendo mínimo e f(0)=5.",
      "x=2, sendo máximo e f(2)=1."
    ],
    "a": 0,
    "sol": "Como f(x)=(x−2)²+1, temos f(x)≥1 para todo o x, com igualdade apenas em x=2. Logo, 1 é o mínimo, atingido em x=2.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:quadratica:21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-021",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-MO-046",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e otimização",
    "q": "Se f′(x)>0 em ]−∞,1[, f′(1)=0 e f′(x)<0 em ]1,+∞[, o que se pode concluir?",
    "o": [
      "f tem mínimo local em x=1",
      "f tem máximo local em x=1",
      "f é crescente em todo o domínio",
      "f(1)=0"
    ],
    "a": 1,
    "sol": "A função é crescente antes de 1 e decrescente depois de 1. Como f é derivável em 1, também é contínua nesse ponto. Assim, f tem um máximo local em x=1.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:avancado:46",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-046",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-MO-003",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Monotonia, extremos e otimização",
    "q": "Como se chama o ponto do gráfico de f de abcissa a quando f′(a)=0?",
    "o": [
      "assíntota",
      "zero obrigatório de f",
      "ponto estacionário",
      "ponto de descontinuidade"
    ],
    "a": 2,
    "sol": "Como f′(a)=0, o declive da tangente em a é zero. O ponto (a,f(a)) chama-se ponto estacionário.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:conceito:3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-003",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-MO-036",
    "themeId": "11-cd",
    "subtopicId": "11-cd-monotonia-otimizacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Modelacao",
    "focus": "Monotonia, extremos e otimização",
    "q": "Pretende-se vedar três lados de um terreno retangular junto a um muro. Há 20 m de vedação. Se cada lado perpendicular ao muro mede x metros, a área é A(x)=x(20−2x). Para que valor de x é máxima?",
    "o": [
      "x=4",
      "x=2",
      "x=8",
      "x=5"
    ],
    "a": 3,
    "sol": "Os lados medem x e 20−2x, pelo que 0<x<10. A(x)=50−2(x−5)² atinge o máximo quando x=5.",
    "hyp": "Pode confundir zeros da derivada com extremos garantidos, ou interpretar incorretamente a mudanca de sinal de f'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-monotonia-otimizacao:11-cd-monotonia-otimizacao:otimizacao:36",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-MO-036",
    "sourceFile": "content/vnext/math-a/11/11-cd-monotonia-otimizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-REG-012",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Regras de derivação",
    "q": "Deriva f(x)=x^7.",
    "o": [
      "x⁶",
      "x⁷",
      "7x⁷",
      "7x^6"
    ],
    "a": 3,
    "sol": "Ao derivar x⁷, multiplica-se o coeficiente pelo expoente 7 e baixa-se o expoente uma unidade. Logo, f′(x)=7x⁶.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-regras:11-cd-regras:potencia:12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-012",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-REG-002",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Regras de derivação",
    "q": "Para uma função derivável f e uma constante real c, qual é a derivada de c·f?",
    "o": [
      "c'f",
      "cf'",
      "c+f'",
      "cf"
    ],
    "a": 1,
    "sol": "A constante c multiplica todo o quociente incremental de f e pode sair do limite. Assim, (c·f)′=c·f′.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-regras:11-cd-regras:conceito:2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-002",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-REG-021",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Regras de derivação",
    "q": "Usando a regra do produto, deriva f(x)=x(x+1).",
    "o": [
      "2x+1",
      "2x-1",
      "x+1",
      "1"
    ],
    "a": 0,
    "sol": "Pela regra do produto, a derivada de x(x+1) é (x+1)+x=2x+1.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-regras:11-cd-regras:produto:21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-021",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-REG-013",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Regras de derivação",
    "q": "Deriva f(x)=3x^4.",
    "o": [
      "12x^3",
      "3x³",
      "3x⁴",
      "12x⁴"
    ],
    "a": 0,
    "sol": "Ao derivar 3x⁴, multiplica-se o coeficiente pelo expoente 4 e baixa-se o expoente uma unidade. Logo, f′(x)=12x³.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-regras:11-cd-regras:potencia:13",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-013",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-REG-041",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Regras de derivação",
    "q": "Se f'(x)=2x e g'(x)=3, então (f+g)'(x)=",
    "o": [
      "2x+3",
      "6x",
      "2x",
      "3"
    ],
    "a": 0,
    "sol": "Somam-se as derivadas.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-regras:11-cd-regras:misto:41",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-041",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-REG-003",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Regras de derivação",
    "q": "Qual é a derivada de xⁿ, sendo n um inteiro positivo?",
    "o": [
      "x^(n-1)",
      "n x^n",
      "n x^(n-1)",
      "(n-1)x^n"
    ],
    "a": 2,
    "sol": "Deriva-se multiplicando pelo expoente n e reduzindo o expoente uma unidade. Por exemplo, quando n=3, (x³)′=3x². Em geral, (xⁿ)′=n xⁿ⁻¹.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-regras:11-cd-regras:conceito:3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-003",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-REG-022",
    "themeId": "11-cd",
    "subtopicId": "11-cd-regras",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Regras de derivação",
    "q": "Usando a regra do produto, deriva f(x)=x^2(x+1).",
    "o": [
      "3x^2-2x",
      "3x^2+2x",
      "2x(x+1)",
      "2x"
    ],
    "a": 1,
    "sol": "Pela regra do produto, a derivada de x²(x+1) é 2x(x+1)+x²=3x²+2x.",
    "hyp": "Pode aplicar uma regra de derivação ao objeto errado, esquecer fatores ou confundir produto/quociente com derivação termo a termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-regras:11-cd-regras:produto:22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-REG-022",
    "sourceFile": "content/vnext/math-a/11/11-cd-regras.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TAN-012",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "Para f(x)=x^2, a tangente em x=2 tem equação",
    "o": [
      "y=4x+4",
      "y=2x",
      "x=2",
      "y=4x-4"
    ],
    "a": 3,
    "sol": "Para f(x)=x², f(2)=4 e f′(x)=2x. Logo f′(2)=4, e a reta passa por (2,4) com esse declive. Assim, y−4=4(x−2), ou seja, y=4x−4.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-tangente:11-cd-tangente:equacao-tangente:12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-012",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TAN-002",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "Qual é o declive da reta tangente ao gráfico de f no ponto de abcissa a?",
    "o": [
      "f(a)",
      "f'(a)",
      "a",
      "f(a)/a"
    ],
    "a": 1,
    "sol": "A derivada f′(a) é o limite dos declives das secantes quando o outro ponto de interseção se aproxima de (a,f(a)). Esse limite é o declive da tangente.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-tangente:11-cd-tangente:conceito:2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-002",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TAN-026",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "Sabendo que f(2)=5 e f'(2)=3, qual é a reta tangente?",
    "o": [
      "y=3x+5",
      "y=3x-1",
      "y=5x+3",
      "x=2"
    ],
    "a": 1,
    "sol": "A tangente passa por (2,5), pois f(2)=5, e tem declive 3, pois f′(2)=3. Assim, y−5=3(x−2), que se reduz a y=3x−1.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-tangente:11-cd-tangente:dados:26",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-026",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TAN-013",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "Para f(x)=x^2, a tangente em x=-1 tem equação",
    "o": [
      "y=-2x-1",
      "y=-2x+1",
      "y=x-2",
      "x=-1"
    ],
    "a": 0,
    "sol": "Para f(x)=x², f(−1)=1 e f′(x)=2x. Logo f′(−1)=−2, e a reta passa por (−1,1) com esse declive. Assim, y−1=−2(x+1), ou seja, y=−2x−1.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-tangente:11-cd-tangente:equacao-tangente:13",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-013",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TAN-046",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelacao",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "Sabe-se que f(2)=5 e f′(2)=3. Para estimar f(2,1), usa a ordenada da reta tangente em x=2 na abcissa 2,1. Que valor resulta?",
    "o": [
      "5,03",
      "5,3",
      "8,0",
      "2,1"
    ],
    "a": 1,
    "sol": "A tangente tem equação y=5+3(x−2). Para x=2,1, obtém-se 5+3×0,1=5,3.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-tangente:11-cd-tangente:aproximacao-linear:46",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-046",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TAN-003",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "Qual é uma equação da reta tangente ao gráfico de f no ponto de abcissa a, supondo que f é derivável em a?",
    "o": [
      "y-a=f(a)(x-f'(a))",
      "y=f(a)x+a",
      "y-f(a)=f'(a)(x-a)",
      "y=f'(a) apenas"
    ],
    "a": 2,
    "sol": "A tangente passa por (a,f(a)) e tem declive f′(a). Substituindo estes dados na forma ponto-declive y−y₀=m(x−x₀), obtém-se y−f(a)=f′(a)(x−a).",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-tangente:11-cd-tangente:conceito:3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-003",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TAN-036",
    "themeId": "11-cd",
    "subtopicId": "11-cd-tangente",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Reta tangente e interpretação geométrica",
    "q": "A reta tangente ao gráfico de f no ponto de abcissa 2 é y=4x−3. Qual é o valor de f′(2)?",
    "o": [
      "5",
      "2",
      "-3",
      "4"
    ],
    "a": 3,
    "sol": "A derivada no ponto de tangência é o declive dessa reta, dado pelo coeficiente de x. Logo, f′(2)=4.",
    "hyp": "Pode confundir ponto da curva, declive da tangente e termo independente da reta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-tangente:11-cd-tangente:ler-declive:36",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TAN-036",
    "sourceFile": "content/vnext/math-a/11/11-cd-tangente.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TM-012",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "taxa média de variação",
    "q": "Para f(x)=x^2, qual é a taxa média de variação entre x=2 e x=5?",
    "o": [
      "8",
      "6",
      "21",
      "7"
    ],
    "a": 3,
    "sol": "(25-4)/(5-2)=7.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-taxa-media:11-cd-taxa-media:quadratica:12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-012",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TM-002",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "taxa média de variação",
    "q": "Qual é o significado geométrico da taxa média de variação de f entre dois pontos distintos do seu gráfico?",
    "o": [
      "o declive da tangente no primeiro ponto",
      "o declive da reta secante",
      "a área sob o gráfico",
      "a ordenada média"
    ],
    "a": 1,
    "sol": "Na reta secante que passa pelos dois pontos, o declive é a diferença das ordenadas dividida pela diferença das abcissas. É exatamente essa razão que define a taxa média de variação.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-taxa-media:11-cd-taxa-media:conceito:2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-002",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TM-031",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Modelacao",
    "focus": "taxa média de variação",
    "q": "A temperatura passa de 12 °C para 20 °C em 4 horas. Qual é a taxa média de variação, em °C/h?",
    "o": [
      "8",
      "4",
      "2",
      "0,5"
    ],
    "a": 2,
    "sol": "Divide-se a variação total pelo tempo decorrido. Assim, (20−12)/4=2 °C/h.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-taxa-media:11-cd-taxa-media:modelacao:31",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-031",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TM-013",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "taxa média de variação",
    "q": "Para f(x)=x^2, qual é a taxa média de variação entre x=0 e x=4?",
    "o": [
      "4",
      "5",
      "3",
      "16"
    ],
    "a": 0,
    "sol": "(16-0)/(4-0)=4.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-taxa-media:11-cd-taxa-media:quadratica:13",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-013",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TM-041",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "taxa média de variação",
    "q": "Se f(1)=5 e a taxa média em [1,4] é 3, quanto vale f(4)?",
    "o": [
      "14",
      "15",
      "13",
      "8"
    ],
    "a": 0,
    "sol": "[f(4)-5]/(4-1)=3, logo f(4)=14.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-taxa-media:11-cd-taxa-media:inversa:41",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-041",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TM-003",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "taxa média de variação",
    "q": "Uma função f(t) dá a distância percorrida, em quilómetros, ao fim de t horas. Qual é a unidade da taxa média de variação de f?",
    "o": [
      "km.h",
      "h/km",
      "km/h",
      "km"
    ],
    "a": 2,
    "sol": "A taxa média é a variação da distância dividida pelo tempo decorrido. A sua unidade é o quilómetro por hora, km/h.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-taxa-media:11-cd-taxa-media:conceito:3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-003",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CD-TM-032",
    "themeId": "11-cd",
    "subtopicId": "11-cd-taxa-media",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Modelacao",
    "focus": "taxa média de variação",
    "q": "O volume passa de 100 L para 160 L em 3 minutos. Qual é a taxa média de variação, em L/min?",
    "o": [
      "60",
      "3",
      "15",
      "20"
    ],
    "a": 3,
    "sol": "Divide-se a variação total pelo tempo decorrido. Assim, (160−100)/3=20 L/min.",
    "hyp": "Pode confundir variação total com taxa média ou inverter o quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cd-taxa-media:11-cd-taxa-media:modelacao:32",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CD-TM-032",
    "sourceFile": "content/vnext/math-a/11/11-cd-taxa-media.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-AM-006",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Princípios da adição e multiplicação",
    "q": "Um menu tem 4 pratos principais e 3 bebidas. Escolhendo um de cada, há...",
    "o": [
      "7 menus.",
      "12 menus.",
      "4 menus.",
      "3 menus."
    ],
    "a": 1,
    "sol": "4×3=12.",
    "hyp": "Pode usar o princípio da adição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:menu",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-006",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-AM-002",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Princípios da adição e multiplicação",
    "q": "Que condição garante que o total se pode obter multiplicando diretamente os números de escolhas das etapas?",
    "o": [
      "Cada percurso fica completo quando se escolhe uma de várias alternativas mutuamente exclusivas.",
      "Cada etapa tem o mesmo número de escolhas para todas as opções das etapas anteriores.",
      "O número de opções é sempre maior na etapa seguinte do que na etapa anterior.",
      "O número de opções da segunda etapa varia consoante a escolha da primeira."
    ],
    "a": 1,
    "sol": "Se a primeira etapa tem a escolhas e, para cada uma, a segunda tem b escolhas, há a×b resultados com as duas etapas completas.",
    "hyp": "Pode somar escolhas sucessivas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:principio-multiplicacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-002",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-AM-021",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Princípios da adição e multiplicação",
    "q": "Quantos números de 2 algarismos podem ser formados com dezenas 1,2,3 e unidades 0,1,2,3, permitindo repetição?",
    "o": [
      "12.",
      "16.",
      "9.",
      "7."
    ],
    "a": 0,
    "sol": "3 opções para dezenas e 4 para unidades: 12.",
    "hyp": "Pode permitir 0 nas dezenas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:numeros-dois-algarismos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-021",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-AM-011",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Princípios da adição e multiplicação",
    "q": "Se uma tarefa pode ser feita por 4 métodos do tipo A ou 6 do tipo B, sem sobreposição, o total é...",
    "o": [
      "24.",
      "6.",
      "10.",
      "4."
    ],
    "a": 2,
    "sol": "Pelo princípio da adição: 4+6.",
    "hyp": "Pode multiplicar por serem dois grupos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:adicao-metodos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-011",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-AM-050",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Princípios da adição e multiplicação",
    "q": "Uma app permite escolher 1 de 4 temas, depois 1 de 3 níveis e finalmente 1 de 2 modos. Quantos percursos de configuração?",
    "o": [
      "9.",
      "24.",
      "12.",
      "6."
    ],
    "a": 1,
    "sol": "4×3×2=24.",
    "hyp": "Pode somar as escolhas independentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:modelacao-configuracao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-050",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-AM-003",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Princípios da adição e multiplicação",
    "q": "Há 3 entradas e 4 saídas possíveis num percurso. Quantos pares entrada-saída existem?",
    "o": [
      "7.",
      "1.",
      "12.",
      "24."
    ],
    "a": 2,
    "sol": "3×4=12.",
    "hyp": "Pode somar as opções em vez de multiplicar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:produto-duas-etapas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-003",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-AM-022",
    "themeId": "11-cont",
    "subtopicId": "11-cont-adicao-multiplicacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Princípios da adição e multiplicação",
    "q": "Quantos números de 3 algarismos existem no total?",
    "o": [
      "1000.",
      "900.",
      "999.",
      "810."
    ],
    "a": 1,
    "sol": "Centenas: 9 opções; dezenas e unidades: 10 cada. 9×10×10=900.",
    "hyp": "Pode incluir números com zero inicial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-adicao-multiplicacao:11-cont-adicao-multiplicacao:numeros-tres-algarismos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-AM-022",
    "sourceFile": "content/vnext/math-a/11/11-cont-adicao-multiplicacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-ARR-006",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Arranjos",
    "q": "De 8 finalistas, quantos pódios distintos de 3 lugares podem ser formados?",
    "o": [
      "56.",
      "336.",
      "512.",
      "24."
    ],
    "a": 1,
    "sol": "8×7×6=336.",
    "hyp": "Pode usar C(8,3) e esquecer a ordem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-arranjos:11-cont-arranjos:podio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-006",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-ARR-002",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Arranjos",
    "q": "O número de arranjos simples de n elementos tomados k a k é...",
    "o": [
      "n!/k!.",
      "n!/(n−k)!.",
      "n!/[k!(n−k)!].",
      "n^k."
    ],
    "a": 1,
    "sol": "Há n escolhas para a primeira posição, depois n−1, até k fatores.",
    "hyp": "Pode confundir com combinação ou arranjo com repetição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-arranjos:11-cont-arranjos:formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-002",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-ARR-021",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Arranjos",
    "q": "De 10 alunos escolhem-se presidente e vice-presidente. Quantas escolhas ordenadas?",
    "o": [
      "90.",
      "45.",
      "100.",
      "20."
    ],
    "a": 0,
    "sol": "10 escolhas para presidente e 9 para vice: 90.",
    "hyp": "Pode usar combinação porque são duas pessoas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-arranjos:11-cont-arranjos:cargos-distintos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-021",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-ARR-018",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Arranjos",
    "q": "Qual é a relação entre A(n,k) e C(n,k) válida para todos os naturais n e k com 1≤k≤n?",
    "o": [
      "A(n,k)=C(n,k)/k!.",
      "A(n,k)=k!·C(n,k).",
      "A(n,k)=C(n,k).",
      "A(n,k)=n^k."
    ],
    "a": 1,
    "sol": "Cada subconjunto de k elementos admite k! ordenações, logo A(n,k)=k!·C(n,k) para todos os índices permitidos. Quando k=1, k!=1 e os dois números coincidem.",
    "hyp": "Pode inverter a relação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-arranjos:11-cont-arranjos:relacao-combinacoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-018",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-ARR-047",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Arranjos",
    "q": "De 15 candidatos escolhem-se líder, vice e porta-voz. Quantas distribuições?",
    "o": [
      "455.",
      "3375.",
      "2730.",
      "45."
    ],
    "a": 2,
    "sol": "15×14×13=2730.",
    "hyp": "Pode escolher apenas o grupo de 3.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-arranjos:11-cont-arranjos:modelacao-cargos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-047",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-ARR-003",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Arranjos",
    "q": "Quantos arranjos de 5 elementos tomados 2 a 2 existem?",
    "o": [
      "10.",
      "25.",
      "20.",
      "5."
    ],
    "a": 2,
    "sol": "5×4=20.",
    "hyp": "Pode dividir por 2! e obter combinações.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-arranjos:11-cont-arranjos:A5-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-003",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-ARR-022",
    "themeId": "11-cont",
    "subtopicId": "11-cont-arranjos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Arranjos",
    "q": "De 12 pessoas escolhem-se presidente, secretário e tesoureiro. Quantas distribuições?",
    "o": [
      "220.",
      "1320.",
      "1728.",
      "36."
    ],
    "a": 1,
    "sol": "12×11×10=1320.",
    "hyp": "Pode escolher o grupo sem distribuir cargos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-arranjos:11-cont-arranjos:tres-cargos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-ARR-022",
    "sourceFile": "content/vnext/math-a/11/11-cont-arranjos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-COMB-007",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Combinações e escolha sem ordem",
    "q": "Quantas comissões de 4 pessoas podem ser escolhidas entre 10?",
    "o": [
      "5040.",
      "10000.",
      "210.",
      "40."
    ],
    "a": 2,
    "sol": "C(10,4)=210.",
    "hyp": "Pode usar arranjos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-combinacoes:11-cont-combinacoes:comissao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-007",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-COMB-002",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Combinações e escolha sem ordem",
    "q": "O número de combinações de n elementos tomados k a k é...",
    "o": [
      "n!/(n−k)!.",
      "n!/[k!(n−k)!].",
      "n^k.",
      "n!/k!."
    ],
    "a": 1,
    "sol": "É a fórmula do coeficiente binomial.",
    "hyp": "Pode usar a fórmula de arranjos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-combinacoes:11-cont-combinacoes:formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-002",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-COMB-021",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Combinações e escolha sem ordem",
    "q": "De 12 alunos escolhem-se 3 para uma equipa. Quantas equipas?",
    "o": [
      "220.",
      "1320.",
      "1728.",
      "36."
    ],
    "a": 0,
    "sol": "C(12,3)=220.",
    "hyp": "Pode usar arranjos por considerar posições inexistentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-combinacoes:11-cont-combinacoes:equipa-12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-021",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-COMB-016",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Combinações e escolha sem ordem",
    "q": "Entre oito pessoas, vão ser escolhidos um presidente e um vice-presidente distintos. Pode usar-se C(8,2) diretamente para contar as atribuições de cargos?",
    "o": [
      "Sim, porque são escolhidas duas pessoas distintas.",
      "Sim, porque cada dupla admite uma só atribuição.",
      "Não, porque ficam oito pessoas disponíveis para ambos os cargos.",
      "Não, porque uma dupla admite duas atribuições."
    ],
    "a": 3,
    "sol": "C(8,2) conta os pares sem distinguir cargos. Cada par admite duas atribuições, conforme qual das duas pessoas fica como presidente. O total é 2×C(8,2)=56.",
    "hyp": "Pode ignorar a distinção entre cargos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-combinacoes:11-cont-combinacoes:ordem-importa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-016",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-COMB-049",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Combinações e escolha sem ordem",
    "q": "Uma aplicação tem 12 tópicos de revisão e vai manter 9 deles. Quantos conjuntos diferentes de tópicos pode manter, sem atender à ordem?",
    "o": [
      "220.",
      "1320.",
      "1728.",
      "36."
    ],
    "a": 0,
    "sol": "Cada conjunto de 9 tópicos fica determinado pelos 3 que são excluídos. Assim, há C(12,9)=C(12,3)=12×11×10/(3×2×1)=220 escolhas.",
    "hyp": "Pode usar arranjos por imaginar uma ordem de apresentação não pedida.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-combinacoes:11-cont-combinacoes:modelacao-topicos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-049",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-COMB-005",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Interpretação",
    "focus": "Combinações e escolha sem ordem",
    "q": "Escolher uma equipa de 3 pessoas entre 8 é um problema de...",
    "o": [
      "combinações.",
      "arranjos.",
      "permutação de 8.",
      "potências."
    ],
    "a": 0,
    "sol": "A ordem dos membros da equipa não interessa.",
    "hyp": "Pode tratar cargos inexistentes como posições distintas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-combinacoes:11-cont-combinacoes:equipa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-005",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-COMB-022",
    "themeId": "11-cont",
    "subtopicId": "11-cont-combinacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Combinações e escolha sem ordem",
    "q": "De 15 livros escolhem-se 4 para levar. Quantas escolhas?",
    "o": [
      "32760.",
      "1365.",
      "60.",
      "455."
    ],
    "a": 1,
    "sol": "C(15,4)=1365.",
    "hyp": "Pode usar C(15,3)=455 ou arranjos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-combinacoes:11-cont-combinacoes:livros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-COMB-022",
    "sourceFile": "content/vnext/math-a/11/11-cont-combinacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-DG-006",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Com camisolas {A,B} e calças {1,2,3}, uma tabela de dupla entrada teria quantas combinações?",
    "o": [
      "5.",
      "6.",
      "3.",
      "2."
    ],
    "a": 1,
    "sol": "2×3=6.",
    "hyp": "Pode contar cabeçalhos da tabela.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-diagramas:11-cont-diagramas:tabela-roupa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-006",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-DG-002",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Numa árvore de contagem, cada caminho completo da raiz a uma folha representa...",
    "o": [
      "uma etapa isolada.",
      "um resultado possível.",
      "uma regra de soma apenas.",
      "um resultado impossível."
    ],
    "a": 1,
    "sol": "Um caminho completo fixa uma opção em cada etapa.",
    "hyp": "Pode contar nós em vez de caminhos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-diagramas:11-cont-diagramas:caminho-folha",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-002",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-DG-021",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Numa tabela de dupla entrada, contam-se sequências de duas letras escolhidas de {A, B, C}, com repetição permitida. Quantas sequências há?",
    "o": [
      "9.",
      "6.",
      "3.",
      "12."
    ],
    "a": 0,
    "sol": "Cada primeira letra combina com 3 segundas letras.",
    "hyp": "Pode excluir repetições sem indicação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-diagramas:11-cont-diagramas:tabela-palavras",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-021",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-DG-009",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Ao listar os casos de um problema de contagem, que condição deve cumprir a lista completa?",
    "o": [
      "inclui todos os casos admissíveis exatamente uma vez.",
      "inclui todos os casos admissíveis, podendo repetir alguns.",
      "evita repetições, mesmo que deixe casos admissíveis de fora.",
      "mostra um caso admissível de cada tipo sem contar os restantes."
    ],
    "a": 0,
    "sol": "Uma lista que omite casos conta de menos. Uma lista que repete casos conta de mais. Por isso, cada caso admissível deve aparecer uma vez.",
    "hyp": "Pode achar que listar casos é sempre menos rigoroso.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-diagramas:11-cont-diagramas:lista-sistematica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-009",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-DG-046",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Uma app mostra 3 categorias. Na primeira há 5 ações, na segunda 2 e na terceira 6. Um diagrama de árvore teria quantas folhas de ação final?",
    "o": [
      "60.",
      "13.",
      "11.",
      "30."
    ],
    "a": 1,
    "sol": "As categorias são ramos alternativos: 5+2+6=13.",
    "hyp": "Pode multiplicar categorias alternativas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-diagramas:11-cont-diagramas:modelacao-menu",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-046",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-DG-003",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Uma árvore tem 2 ramos na primeira etapa e, de cada ramo, 3 na segunda. Quantas folhas?",
    "o": [
      "5.",
      "3.",
      "6.",
      "2."
    ],
    "a": 2,
    "sol": "2×3=6.",
    "hyp": "Pode somar níveis.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-diagramas:11-cont-diagramas:folhas-uniformes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-003",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-DG-022",
    "themeId": "11-cont",
    "subtopicId": "11-cont-diagramas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Diagramas, tabelas e organização de casos",
    "q": "Quantas sequências de duas letras distintas podem ser formadas com o conjunto {A, B, C}?",
    "o": [
      "9.",
      "6.",
      "3.",
      "2."
    ],
    "a": 1,
    "sol": "Com repetição, haveria 3×3=9 sequências. Ao retirar AA, BB e CC, restam 6.",
    "hyp": "Pode esquecer a diagonal inválida.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-diagramas:11-cont-diagramas:tabela-restricao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-DG-022",
    "sourceFile": "content/vnext/math-a/11/11-cont-diagramas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-FAT-017",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Fatorial e contagens elementares",
    "q": "Para n natural positivo, como evolui o fator que transforma n! em (n+1)! à medida que n aumenta?",
    "o": [
      "aumenta com n.",
      "alterna entre dois valores.",
      "mantém-se constante.",
      "diminui com n."
    ],
    "a": 0,
    "sol": "O fator é (n+1)!/n!=n+1. Quando n aumenta, esse fator também aumenta.",
    "hyp": "Pode confundir crescimento fatorial com crescimento linear.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-fatorial:11-cont-fatorial:crescimento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-017",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-FAT-002",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Fatorial e contagens elementares",
    "q": "Por convenção, 0! é igual a...",
    "o": [
      "0.",
      "1.",
      "−1.",
      "não definido."
    ],
    "a": 1,
    "sol": "A convenção 0!=1 torna válidas várias fórmulas combinatórias.",
    "hyp": "Pode assumir que um produto sem fatores vale 0.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-fatorial:11-cont-fatorial:zero-fatorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-002",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-FAT-021",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Fatorial e contagens elementares",
    "q": "Resolve n!=24 em naturais.",
    "o": [
      "n=4.",
      "n=3.",
      "n=5.",
      "n=24."
    ],
    "a": 0,
    "sol": "4!=24.",
    "hyp": "Pode confundir n! com n.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-fatorial:11-cont-fatorial:equacao-fatorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-021",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-FAT-006",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Fatorial e contagens elementares",
    "q": "Qual é o valor de 6!?",
    "o": [
      "360.",
      "720.",
      "120.",
      "36."
    ],
    "a": 1,
    "sol": "6×5!=6×120=720.",
    "hyp": "Pode esquecer o fator 6.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-fatorial:11-cont-fatorial:calcular-fatorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-006",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-FAT-047",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Fatorial e contagens elementares",
    "q": "Há 6 lugares em fila e 6 pessoas distintas, uma por lugar. O produto de opções sucessivas é...",
    "o": [
      "6⁶.",
      "6+5+4+3+2+1.",
      "6·5·4·3·2·1=6!.",
      "2⁶."
    ],
    "a": 2,
    "sol": "Para o primeiro lugar há 6 escolhas, para o segundo há 5 e assim sucessivamente até ao último, com 1 escolha. Pelo princípio multiplicativo, o total é 6·5·4·3·2·1=6!.",
    "hyp": "Pode usar repetição em cada lugar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-fatorial:11-cont-fatorial:modelacao-fila",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-047",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-FAT-005",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Fatorial e contagens elementares",
    "q": "Qual é o valor de 1!?",
    "o": [
      "1.",
      "0.",
      "2.",
      "não definido."
    ],
    "a": 0,
    "sol": "1!=1.",
    "hyp": "Pode confundir com 0!.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-fatorial:11-cont-fatorial:um-fatorial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-005",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-FAT-023",
    "themeId": "11-cont",
    "subtopicId": "11-cont-fatorial",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Fatorial e contagens elementares",
    "q": "Se (n+1)!/n!=8, então n=",
    "o": [
      "8.",
      "6.",
      "7.",
      "9."
    ],
    "a": 2,
    "sol": "O quociente é n+1, logo n+1=8.",
    "hyp": "Pode identificar o quociente com n.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-fatorial:11-cont-fatorial:equacao-quociente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-FAT-023",
    "sourceFile": "content/vnext/math-a/11/11-cont-fatorial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-PERM-006",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Permutações",
    "q": "Quantas ordens existem para 6 objetos distintos?",
    "o": [
      "360.",
      "720.",
      "120.",
      "36."
    ],
    "a": 1,
    "sol": "6!=720.",
    "hyp": "Pode parar em 5!.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-permutacoes:11-cont-permutacoes:perm-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-006",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-PERM-002",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Permutações",
    "q": "O número de permutações de n objetos distintos é...",
    "o": [
      "n².",
      "n!.",
      "2ⁿ.",
      "n."
    ],
    "a": 1,
    "sol": "Há n escolhas para a primeira posição, n−1 para a segunda, etc.",
    "hyp": "Pode usar potência como se houvesse repetição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-permutacoes:11-cont-permutacoes:formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-002",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-PERM-021",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Permutações",
    "q": "Numa fila de 6, A e B devem ficar juntos e A à esquerda de B. Quantas ordens?",
    "o": [
      "120.",
      "240.",
      "48.",
      "720."
    ],
    "a": 0,
    "sol": "Bloco AB com ordem fixa + 4 pessoas =5 blocos: 5!=120.",
    "hyp": "Pode multiplicar por 2 mesmo com ordem interna fixa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-permutacoes:11-cont-permutacoes:bloco-ordem-fixa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-021",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-PERM-018",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Permutações",
    "q": "Se trocarmos os objetos de duas posições diferentes numa permutação de objetos distintos, o que acontece?",
    "o": [
      "a permutação mantém-se sempre igual.",
      "obtém-se sempre uma permutação diferente.",
      "a ordem deixa de importar.",
      "o número de objetos muda."
    ],
    "a": 1,
    "sol": "Os objetos nas duas posições são distintos. Após a troca, cada uma dessas posições contém um objeto diferente do inicial, logo a permutação muda.",
    "hyp": "Pode confundir ordenação com conjunto sem ordem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-permutacoes:11-cont-permutacoes:troca-posicoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-018",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-PERM-047",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Permutações",
    "q": "Sete tarefas distintas vão ser executadas em sequência. Quantas ordens de execução existem?",
    "o": [
      "720.",
      "49.",
      "5040.",
      "128."
    ],
    "a": 2,
    "sol": "São as permutações das 7 tarefas: 7!.",
    "hyp": "Pode usar 2⁷.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-permutacoes:11-cont-permutacoes:modelacao-tarefas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-047",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-PERM-003",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Permutações",
    "q": "Quantas permutações existem de 3 objetos distintos?",
    "o": [
      "3.",
      "9.",
      "6.",
      "8."
    ],
    "a": 2,
    "sol": "3!=6.",
    "hyp": "Pode usar 3².",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-permutacoes:11-cont-permutacoes:perm-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-003",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11CONT-PERM-022",
    "themeId": "11-cont",
    "subtopicId": "11-cont-permutacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Permutações",
    "q": "Numa fila de 6, A,B,C devem ficar juntos, em qualquer ordem. Quantas filas?",
    "o": [
      "720.",
      "144.",
      "120.",
      "36."
    ],
    "a": 1,
    "sol": "Bloco ABC +3 pessoas =4 blocos: 4!×3!=24×6=144.",
    "hyp": "Pode esquecer permutar dentro do bloco.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-cont-permutacoes:11-cont-permutacoes:tres-juntos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11CONT-PERM-022",
    "sourceFile": "content/vnext/math-a/11/11-cont-permutacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-AM-006",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Para f(x)=2/(x+1)−3, as assíntotas são...",
    "o": [
      "x=1 e y=3.",
      "x=−1 e y=−3.",
      "x=−3 e y=−1.",
      "x=0 e y=0."
    ],
    "a": 1,
    "sol": "Na forma a/(x−h)+k, as assíntotas são x=h e y=k.",
    "hyp": "Pode trocar h e k.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:forma-canonica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-006",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-AM-002",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "A função f(x)=1/x tem assíntota vertical...",
    "o": [
      "y=0.",
      "x=0.",
      "x=1.",
      "y=1."
    ],
    "a": 1,
    "sol": "Quando x se aproxima de 0 pela direita, 1/x cresce sem limite. Pela esquerda, 1/x diminui sem limite. Por isso, a reta x=0 é uma assíntota vertical.",
    "hyp": "Pode trocar vertical e horizontal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:base-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-002",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-AM-021",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Para confirmar uma assíntota vertical em x=a, é importante verificar se...",
    "o": [
      "o fator responsável não foi totalmente cancelado.",
      "o numerador também é zero sempre.",
      "a função tem grau par.",
      "a função é crescente."
    ],
    "a": 0,
    "sol": "Depois de cancelar os fatores comuns, verifica-se se x−a permanece no denominador. Se permanecer, há uma assíntota vertical. Se o fator desaparecer por completo, a exclusão de a do domínio original dá apenas um ponto removível.",
    "hyp": "Pode usar apenas o denominador antes de simplificar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:confirmar-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-021",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-AM-018",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Para x≠−1, qual das expressões é igual a (x²+2x+3)/(x+1)?",
    "o": [
      "x+2+1/(x+1).",
      "x+1+2/(x+1).",
      "x+1.",
      "x+3."
    ],
    "a": 1,
    "sol": "A divisão euclidiana dá quociente x+1 e resto 2, pois x²+2x+3=(x+1)²+2. Para x≠−1, a expressão racional é, portanto, x+1+2/(x+1).",
    "hyp": "Pode errar o resto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:divisao-obliqua",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-018",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-AM-044",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "Um custo médio é modelado por C(x)=500/x+8, x>0. Para produção muito elevada, C(x) aproxima-se de...",
    "o": [
      "500.",
      "0.",
      "+∞.",
      "8."
    ],
    "a": 3,
    "sol": "O custo fixo médio 500/x diminui e sobra o nível 8.",
    "hyp": "Pode interpretar 500 como valor assintótico.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:custo-medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-044",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-AM-003",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "A função f(x)=1/x tem assíntota horizontal...",
    "o": [
      "x=0.",
      "y=1.",
      "y=0.",
      "x=1."
    ],
    "a": 2,
    "sol": "Para |x| grande, 1/x aproxima-se de 0.",
    "hyp": "Pode trocar a orientação da assíntota.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:base-horizontal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-003",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-AM-022",
    "themeId": "11-fun",
    "subtopicId": "11-fun-assintotas-modelacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Assíntotas, interpretação e modelação",
    "q": "f(x)=(x+2)/[(x−1)(x+3)] tem possíveis assíntotas verticais em...",
    "o": [
      "x=−2.",
      "x=1 e x=−3.",
      "x=1 apenas.",
      "x=−3 apenas."
    ],
    "a": 1,
    "sol": "O denominador anula-se em 1 e −3 e não há fatores comuns com x+2.",
    "hyp": "Pode incluir o zero do numerador.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-assintotas-modelacao:11-fun-assintotas-modelacao:duas-verticais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-AM-022",
    "sourceFile": "content/vnext/math-a/11/11-fun-assintotas-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-CQ-006",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Para f(x)=x³, quando x→+∞, f(x)...",
    "o": [
      "→−∞.",
      "→+∞.",
      "→0.",
      "fica limitada."
    ],
    "a": 1,
    "sol": "Potência ímpar positiva cresce para +∞ à direita.",
    "hyp": "Pode confundir com coeficiente negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:extremos-cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-006",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-CQ-002",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Uma função polinomial quártica tem grau...",
    "o": [
      "3.",
      "4.",
      "2.",
      "5."
    ],
    "a": 1,
    "sol": "Quártica significa grau 4.",
    "hyp": "Pode confundir quártica com cúbica.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:grau-quartica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-002",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-CQ-024",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "f(x)=x³−x²−4x+4 pode fatorizar-se por agrupamento como...",
    "o": [
      "(x+1)(x−2)(x+2).",
      "x(x−1)(x−4).",
      "(x−4)(x²−1).",
      "(x−1)(x−2)(x+2)."
    ],
    "a": 3,
    "sol": "x²(x−1)−4(x−1)=(x−1)(x²−4).",
    "hyp": "Pode agrupar sem fator comum correto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:agrupamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-024",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-CQ-016",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "As soluções reais de x⁴−13x²+36=0 são...",
    "o": [
      "±6.",
      "2 e 3.",
      "±1 e ±6.",
      "±2 e ±3."
    ],
    "a": 3,
    "sol": "Com y=x², resulta (y−4)(y−9)=0. Logo, x²=4 ou x²=9. Como ambas as soluções de y são positivas, as quatro soluções reais são x=−2, x=2, x=−3 e x=3.",
    "hyp": "Pode esquecer sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:resolver-biquadrada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-016",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-CQ-045",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Um volume simplificado é dado por V(x)=x³ para x>0. Se x duplica, V...",
    "o": [
      "fica 8 vezes maior.",
      "duplica.",
      "fica 4 vezes maior.",
      "fica 6 vezes maior."
    ],
    "a": 0,
    "sol": "(2x)³=8x³.",
    "hyp": "Pode aplicar proporcionalidade linear.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:modelacao-cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-045",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-CQ-003",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Qual destas é uma função cúbica?",
    "o": [
      "f(x)=x²+1.",
      "f(x)=x⁴−3.",
      "f(x)=2x³−x+1.",
      "f(x)=5x−2."
    ],
    "a": 2,
    "sol": "O maior expoente é 3.",
    "hyp": "Pode olhar para o número de termos em vez do grau.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:identificar-cubica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-003",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-CQ-021",
    "themeId": "11-fun",
    "subtopicId": "11-fun-cubicas-quarticas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Famílias cúbicas/quárticas e comportamento gráfico",
    "q": "Se uma cúbica tem três zeros reais distintos, o gráfico cruza Ox...",
    "o": [
      "em três pontos distintos.",
      "em dois pontos apenas.",
      "em quatro pontos.",
      "em nenhum ponto."
    ],
    "a": 0,
    "sol": "Um polinómio de grau 3 com três zeros reais distintos tem três fatores lineares diferentes. Perto de cada zero só muda o sinal do fator correspondente, pelo que o gráfico cruza Ox em cada um desses três pontos.",
    "hyp": "Pode confundir grau com número exato de zeros reais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-cubicas-quarticas:11-fun-cubicas-quarticas:tres-zeros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-CQ-021",
    "sourceFile": "content/vnext/math-a/11/11-fun-cubicas-quarticas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-DP-006",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Divide x²+3x+2 por x+1. O quociente é...",
    "o": [
      "x+1.",
      "x+2.",
      "x−2.",
      "x²+2."
    ],
    "a": 1,
    "sol": "x²+3x+2=(x+1)(x+2).",
    "hyp": "Pode errar os sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-divisao-polinomios:11-fun-divisao-polinomios:divisao-fatorizada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-006",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-DP-002",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Na divisão euclidiana por um polinómio de grau 2, o que se pode afirmar sobre o grau do resto quando este é não nulo?",
    "o": [
      "igual a 2.",
      "inferior a 2.",
      "superior a 2.",
      "sempre 0."
    ],
    "a": 1,
    "sol": "A divisão euclidiana termina quando o resto é nulo ou tem grau menor do que o divisor. Logo, um resto não nulo tem grau inferior a 2.",
    "hyp": "Pode usar grau igual ao divisor.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-divisao-polinomios:11-fun-divisao-polinomios:grau-resto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-002",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-DP-021",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Divide x³−6x²+11x−6 por x−1. O quociente é...",
    "o": [
      "x²−5x+6.",
      "x²−6x+5.",
      "x²−5x−6.",
      "x²+5x+6."
    ],
    "a": 0,
    "sol": "Ruffini com 1 dá coeficientes 1,−5,6 e resto 0.",
    "hyp": "Pode errar a soma de coeficientes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-divisao-polinomios:11-fun-divisao-polinomios:ruffini",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-021",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-DP-014",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Se falta um termo intermédio num polinómio usado em Ruffini, deve-se...",
    "o": [
      "ignorar a posição.",
      "incluir coeficiente 0.",
      "parar o algoritmo.",
      "substituir por 1."
    ],
    "a": 1,
    "sol": "Todos os graus devem estar representados na sequência de coeficientes.",
    "hyp": "Pode deslocar os coeficientes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-divisao-polinomios:11-fun-divisao-polinomios:coeficiente-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-014",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-DP-047",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Um polinómio P representa um modelo e sabe-se que P(2)=0. Isto garante que...",
    "o": [
      "x+2 é fator de P.",
      "P é de grau 2.",
      "x−2 é fator de P.",
      "P(0)=2."
    ],
    "a": 2,
    "sol": "É a ligação entre zero e divisibilidade por x−2.",
    "hyp": "Pode trocar o sinal do fator.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-divisao-polinomios:11-fun-divisao-polinomios:modelacao-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-047",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-DP-003",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Ao dividir por x−a, o resto é...",
    "o": [
      "um polinómio de grau 1.",
      "sempre zero.",
      "uma constante.",
      "de grau 2."
    ],
    "a": 2,
    "sol": "O divisor tem grau 1, por isso o resto é nulo ou tem grau 0. Em ambos os casos, representa-se por uma constante.",
    "hyp": "Pode pensar que o resto deve ter o mesmo grau do divisor.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-divisao-polinomios:11-fun-divisao-polinomios:resto-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-003",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-DP-022",
    "themeId": "11-fun",
    "subtopicId": "11-fun-divisao-polinomios",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Divisão de polinómios, Ruffini/Horner",
    "q": "Divide x³−6x²+11x−2 por x−2. Qual é o quociente da divisão euclidiana?",
    "o": [
      "x²−5x+3.",
      "x²−4x+3.",
      "x²−4x−3.",
      "x²+4x+3."
    ],
    "a": 1,
    "sol": "Ruffini com 2 dá os coeficientes 1,−4,3 e o resto 4. De facto, x³−6x²+11x−2=(x−2)(x²−4x+3)+4. Logo o quociente é x²−4x+3.",
    "hyp": "Pode usar o resultado da divisão por x−1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-divisao-polinomios:11-fun-divisao-polinomios:ruffini-raiz2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-DP-022",
    "sourceFile": "content/vnext/math-a/11/11-fun-divisao-polinomios.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-OP-007",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações entre funções",
    "q": "Se f(x)=x²+1 e g(x)=x+1, então (f+g)(x)=",
    "o": [
      "x³+x²+x+1.",
      "x²+x.",
      "x²+x+2.",
      "2x²+2."
    ],
    "a": 2,
    "sol": "Somam-se termos semelhantes.",
    "hyp": "Pode multiplicar as funções.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-operacoes:11-fun-operacoes:soma-polinomial",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-007",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-OP-002",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações entre funções",
    "q": "O produto de funções é...",
    "o": [
      "(fg)(x)=f(x)+g(x).",
      "(fg)(x)=f(x)g(x).",
      "(fg)(x)=f(g(x)).",
      "(fg)(x)=f(x)/g(x)."
    ],
    "a": 1,
    "sol": "Para cada x no domínio comum, calculam-se f(x) e g(x) e multiplicam-se os dois valores. Assim, (fg)(x)=f(x)g(x).",
    "hyp": "Pode confundir com composição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-operacoes:11-fun-operacoes:definicao-produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-002",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-OP-023",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Operações entre funções",
    "q": "Qual é o domínio real da função h(x)=√(x−4)?",
    "o": [
      "[0,+∞[.",
      "R.",
      "[4,+∞[.",
      "]−∞,4]."
    ],
    "a": 2,
    "sol": "A raiz quadrada em ℝ exige x−4≥0, ou seja, x≥4. O domínio de h é [4,+∞[.",
    "hyp": "Pode usar apenas o domínio de f sem o traduzir para x.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-operacoes:11-fun-operacoes:dominio-composicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-023",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-OP-009",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Operações entre funções",
    "q": "Mesmo que uma expressão de quociente simplifique, o domínio...",
    "o": [
      "mantém as exclusões da expressão original.",
      "passa a ser sempre R.",
      "depende apenas do numerador.",
      "passa a excluir só os zeros do denominador simplificado."
    ],
    "a": 0,
    "sol": "O quociente f/g é definido nos pontos do domínio comum para os quais g(x)≠0. Cancelar um fator só dá uma igualdade nos pontos onde a expressão original está definida.",
    "hyp": "Pode recuperar indevidamente pontos cancelados.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-operacoes:11-fun-operacoes:dominio-original",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-009",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-OP-037",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Operações entre funções",
    "q": "Para cada número real x≥0, considera a equação t²=x. Que expressão dá a sua solução não negativa em função de x?",
    "o": [
      "√x.",
      "−√x.",
      "x/2.",
      "1/x²."
    ],
    "a": 0,
    "sol": "A raiz quadrada √x é, por definição, não negativa e o seu quadrado é x. A solução no intervalo pedido é t=√x.",
    "hyp": "Pode incluir o ramo negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-operacoes:11-fun-operacoes:inversa-x2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-037",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-OP-003",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações entre funções",
    "q": "O quociente f/g está definido nos pontos do domínio comum em que...",
    "o": [
      "f(x)=0.",
      "g(x)=0.",
      "g(x)≠0.",
      "f(x)=g(x)."
    ],
    "a": 2,
    "sol": "Não se pode dividir por zero.",
    "hyp": "Pode excluir zeros do numerador em vez do denominador.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-operacoes:11-fun-operacoes:dominio-quociente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-003",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-OP-021",
    "themeId": "11-fun",
    "subtopicId": "11-fun-operacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Operações entre funções",
    "q": "Considera f(x)=2x−1. Que expressão se obtém ao substituir x por x² em f(x)?",
    "o": [
      "2x²−1.",
      "(2x−1)².",
      "x²−1.",
      "2x−x²."
    ],
    "a": 0,
    "sol": "O termo 2x torna-se 2x² e o termo independente mantém-se. Obtém-se f(x²)=2x²−1.",
    "hyp": "Pode substituir f dentro de g.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-operacoes:11-fun-operacoes:composicao-linear-quadratica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-OP-021",
    "sourceFile": "content/vnext/math-a/11/11-fun-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RAT-008",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Funções racionais",
    "q": "Qual é o zero de f(x)=(x−5)/(x+1)?",
    "o": [
      "−1.",
      "0.",
      "não tem zeros.",
      "5."
    ],
    "a": 3,
    "sol": "Um zero ocorre quando o numerador é zero e o denominador não é.",
    "hyp": "Pode usar a raiz do denominador.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-racionais:11-fun-racionais:zero-racional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-008",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RAT-002",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Funções racionais",
    "q": "O domínio de f(x)=1/(x+3) é...",
    "o": [
      "R.",
      "R\\{−3}.",
      "R\\{3}.",
      "]−3,+∞[."
    ],
    "a": 1,
    "sol": "O denominador não pode ser zero: x+3≠0, logo x≠−3 e D_f=R\\{−3}.",
    "hyp": "Pode excluir 3 em vez de −3 ao resolver x+3=0.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-racionais:11-fun-racionais:dominio-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-002",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RAT-027",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Funções racionais",
    "q": "Qual é o domínio de f(x)=(x+2)/(x²−1)?",
    "o": [
      "R\\{1}.",
      "R\\{−1}.",
      "R\\{−1,1}.",
      "R."
    ],
    "a": 2,
    "sol": "x²−1=0 em ±1.",
    "hyp": "Pode esquecer uma raiz.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-racionais:11-fun-racionais:dominio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-027",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RAT-011",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Funções racionais",
    "q": "Ao simplificar f(x)=(x²−1)/(x−1), para que valores de x se pode escrever f(x)=x+1?",
    "o": [
      "Para todos os reais exceto x=−1.",
      "Para todos os reais exceto x=0.",
      "Para todos os reais exceto x=1.",
      "Para todos os reais, incluindo x=1."
    ],
    "a": 2,
    "sol": "Fatora-se x²−1=(x−1)(x+1). O fator x−1 só se pode cancelar quando x≠1. Assim, a igualdade vale para todos os reais exceto 1, que continua fora do domínio.",
    "hyp": "Pode esquecer o buraco removível.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-racionais:11-fun-racionais:buraco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-011",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RAT-048",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Funções racionais",
    "q": "Um custo médio C(x)=1000/x+5, com x>0, representa um termo 1000/x que...",
    "o": [
      "aumenta linearmente.",
      "é constante.",
      "fica negativo.",
      "diminui à medida que x aumenta."
    ],
    "a": 3,
    "sol": "Para x>0, 1000/x diminui com x.",
    "hyp": "Pode tratar inversa como proporcionalidade direta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-racionais:11-fun-racionais:modelacao-inversa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-048",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RAT-003",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Funções racionais",
    "q": "O domínio de f(x)=1/(x²−4) exclui...",
    "o": [
      "apenas 2.",
      "apenas −2.",
      "−2 e 2.",
      "0."
    ],
    "a": 2,
    "sol": "x²−4=(x−2)(x+2).",
    "hyp": "Pode esquecer uma das raízes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-racionais:11-fun-racionais:dominio-quadratico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-003",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RAT-021",
    "themeId": "11-fun",
    "subtopicId": "11-fun-racionais",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Funções racionais",
    "q": "f(x)=(2x+3)/(x−1). Qual é f(2)?",
    "o": [
      "7.",
      "5.",
      "1.",
      "−7."
    ],
    "a": 0,
    "sol": "(4+3)/(1)=7.",
    "hyp": "Pode esquecer o termo constante.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-racionais:11-fun-racionais:avaliar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RAT-021",
    "sourceFile": "content/vnext/math-a/11/11-fun-racionais.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RR-006",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "O resto da divisão de x³−2x+5 por x+1 é...",
    "o": [
      "4.",
      "6.",
      "2.",
      "0."
    ],
    "a": 1,
    "sol": "P(−1)=−1+2+5=6.",
    "hyp": "Pode substituir x=1 em vez de −1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-resto-raizes:11-fun-resto-raizes:resto-xmais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-006",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RR-002",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "O Teorema do Fator diz que x−a é fator de P se e só se...",
    "o": [
      "P(a)=1.",
      "P(a)=0.",
      "P(0)=a.",
      "P(a)=a."
    ],
    "a": 1,
    "sol": "Resto zero equivale a divisibilidade por x−a.",
    "hyp": "Pode confundir fator com resto 1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-resto-raizes:11-fun-resto-raizes:teorema-fator",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-002",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RR-021",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Se P(x)=x³+kx²−4x−4 é divisível por x+1, então k=",
    "o": [
      "1.",
      "−1.",
      "3.",
      "−3."
    ],
    "a": 0,
    "sol": "P(−1)=−1+k+4−4=k−1=0, logo k=1.",
    "hyp": "Pode substituir x=1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-resto-raizes:11-fun-resto-raizes:parametro-fator",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-021",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RR-013",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Qual é o fator quadrático que P tem sempre, para qualquer raiz a de multiplicidade 2?",
    "o": [
      "(x−a)².",
      "x−2a.",
      "(x−a)²+1.",
      "x²−a."
    ],
    "a": 0,
    "sol": "A multiplicidade 2 significa que o fator x−a ocorre duas vezes na fatorização. Portanto, (x−a)² divide P.",
    "hyp": "Pode confundir multiplicidade com coeficiente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-resto-raizes:11-fun-resto-raizes:multiplicidade2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-013",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RR-048",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Num modelo polinomial, P(t) é o valor de uma grandeza no instante t. Se P(t₀)=0, o que representa t₀ no modelo?",
    "o": [
      "o valor máximo obrigatório.",
      "uma assíntota.",
      "um ponto onde o modelo não existe.",
      "um instante em que a grandeza modelada se anula."
    ],
    "a": 3,
    "sol": "Zeros do modelo correspondem a valores da variável em que a saída é 0.",
    "hyp": "Pode confundir zero com máximo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-resto-raizes:11-fun-resto-raizes:modelacao-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-048",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RR-003",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Qual é o resto de P(x)=x²+3x+2 por x−1?",
    "o": [
      "0.",
      "2.",
      "6.",
      "1."
    ],
    "a": 2,
    "sol": "P(1)=1+3+2=6.",
    "hyp": "Pode fatorizar desnecessariamente ou usar P(0).",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-resto-raizes:11-fun-resto-raizes:resto-avaliacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-003",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11FUN-RR-023",
    "themeId": "11-fun",
    "subtopicId": "11-fun-resto-raizes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Teorema do resto, raízes, multiplicidade e fatorização",
    "q": "Se o resto da divisão de P por x−2 é 5, então...",
    "o": [
      "P(5)=2.",
      "P(2)=0.",
      "P(2)=5.",
      "x−2 é fator."
    ],
    "a": 2,
    "sol": "Pelo Teorema do Resto, o resto é P(2).",
    "hyp": "Pode concluir divisibilidade mesmo com resto não nulo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-fun-resto-raizes:11-fun-resto-raizes:resto-dado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11FUN-RR-023",
    "sourceFile": "content/vnext/math-a/11/11-fun-resto-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-AN-006",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Para dois vetores u e v de normas 3 e 4, o ângulo entre eles é 60°. Quanto vale u·v?",
    "o": [
      "12.",
      "6.",
      "3.",
      "24."
    ],
    "a": 1,
    "sol": "3×4×cos60°=12×1/2=6.",
    "hyp": "Pode esquecer o cosseno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-angulo-norma:11-pe-angulo-norma:produto-por-angulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-006",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-AN-002",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Produto escalar, norma e ângulo",
    "q": "O ângulo θ entre dois vetores não nulos é tomado em...",
    "o": [
      "[0,2π[.",
      "[0,π].",
      "R.",
      "[−π,π]."
    ],
    "a": 1,
    "sol": "O menor ângulo não orientado entre vetores varia entre 0 e π.",
    "hyp": "Pode usar um ângulo orientado completo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-angulo-norma:11-pe-angulo-norma:intervalo-angulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-002",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-AN-022",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Se u=(3,4), qual é um vetor unitário na mesma direção e sentido?",
    "o": [
      "(5/3,5/4).",
      "(3/5,4/5).",
      "(3/25,4/25).",
      "(−3/5,−4/5)."
    ],
    "a": 1,
    "sol": "Divide-se por ||u||=5.",
    "hyp": "Pode dividir pela norma ao quadrado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-angulo-norma:11-pe-angulo-norma:normalizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-022",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-AN-015",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Se u e v são vetores não nulos e não colineares com u·v>0, como se classifica o ângulo θ entre eles?",
    "o": [
      "reto.",
      "obtuso.",
      "agudo.",
      "sempre 0."
    ],
    "a": 2,
    "sol": "De u·v=‖u‖‖v‖cos θ segue-se que cos θ>0. Os vetores não são colineares, pelo que θ≠0. Portanto, 0<θ<π/2 e o ângulo é agudo.",
    "hyp": "Pode achar que positivo implica vetores iguais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-angulo-norma:11-pe-angulo-norma:sinal-e-angulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-015",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-AN-046",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Uma força F de intensidade 10 N atua durante um deslocamento d de comprimento 5 m. O ângulo entre F e d é 60°. Quanto vale F·d, em joules?",
    "o": [
      "50.",
      "25.",
      "15.",
      "100."
    ],
    "a": 1,
    "sol": "F·d=‖F‖‖d‖cos 60°=10×5×(1/2)=25 J.",
    "hyp": "Pode multiplicar só as magnitudes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-angulo-norma:11-pe-angulo-norma:trabalho-angulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-046",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-AN-003",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Se θ=0, então cosθ=",
    "o": [
      "0.",
      "−1.",
      "1.",
      "1/2."
    ],
    "a": 2,
    "sol": "cos0=1.",
    "hyp": "Pode confundir com seno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-angulo-norma:11-pe-angulo-norma:cos-extremos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-003",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-AN-021",
    "themeId": "11-pe",
    "subtopicId": "11-pe-angulo-norma",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Produto escalar, norma e ângulo",
    "q": "Se ||u||=4, então ||−3u||=",
    "o": [
      "12.",
      "−12.",
      "7.",
      "36."
    ],
    "a": 0,
    "sol": "|−3|×4=12.",
    "hyp": "Pode conservar sinal negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-angulo-norma:11-pe-angulo-norma:norma-escalar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-AN-021",
    "sourceFile": "content/vnext/math-a/11/11-pe-angulo-norma.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DI-006",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Declive e inclinação",
    "q": "Se uma reta tem declive positivo, a sua inclinação α relativamente ao semieixo Ox positivo satisfaz...",
    "o": [
      "π/2<α<π.",
      "0<α<π/2.",
      "α=π/2.",
      "α=0."
    ],
    "a": 1,
    "sol": "Declive positivo corresponde a ângulo agudo com o eixo Ox positivo.",
    "hyp": "Pode confundir sinal do declive com quadrante do vetor.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-declive-inclinacao:11-pe-declive-inclinacao:sinal-inclinacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-006",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DI-002",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Declive e inclinação",
    "q": "Qual é o declive da reta que passa por (1,2) e (3,8)?",
    "o": [
      "2.",
      "3.",
      "6.",
      "1/3."
    ],
    "a": 1,
    "sol": "m=(8−2)/(3−1)=6/2=3.",
    "hyp": "Pode usar Δx/Δy.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-declive-inclinacao:11-pe-declive-inclinacao:declive-dois-pontos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-002",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DI-021",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Declive e inclinação",
    "q": "A reta que passa por (1,2) e (4,8) tem inclinação...",
    "o": [
      "arctan 2.",
      "arctan 1/2.",
      "arctan 6.",
      "60° obrigatoriamente."
    ],
    "a": 0,
    "sol": "O declive é m=(8−2)/(4−1)=2. A inclinação α está em [0,π[ e satisfaz tan α=2. Como o declive é positivo, α é o ângulo agudo arctan(2).",
    "hyp": "Pode inverter a razão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-declive-inclinacao:11-pe-declive-inclinacao:inclinacao-arctan",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-021",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DI-014",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Declive e inclinação",
    "q": "Duas retas não verticais com o mesmo declive são...",
    "o": [
      "perpendiculares.",
      "paralelas ou coincidentes.",
      "sempre coincidentes.",
      "sempre secantes."
    ],
    "a": 1,
    "sol": "Mesmo declive significa mesma direção.",
    "hyp": "Pode concluir coincidência sem comparar posição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-declive-inclinacao:11-pe-declive-inclinacao:mesmo-declive",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-014",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DI-037",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Declive e inclinação",
    "q": "Uma estrada sobe 1 m por cada 10 m na horizontal. Qual é a expressão exata da sua inclinação relativamente à horizontal?",
    "o": [
      "arctan(0,1).",
      "arctan(10).",
      "arcsin(0,1).",
      "arccos(0,1)."
    ],
    "a": 0,
    "sol": "O declive é a razão entre a subida e o percurso horizontal, 1/10=0,1. Sendo α o ângulo agudo com a horizontal, tan α=0,1, pelo que α=arctan(0,1).",
    "hyp": "Pode confundir tangente com seno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-declive-inclinacao:11-pe-declive-inclinacao:modelacao-inclinacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-037",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DI-004",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Declive e inclinação",
    "q": "Uma reta horizontal tem declive...",
    "o": [
      "1.",
      "indefinido.",
      "infinito.",
      "0."
    ],
    "a": 3,
    "sol": "A variação vertical é zero.",
    "hyp": "Pode confundir com reta vertical.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-declive-inclinacao:11-pe-declive-inclinacao:declive-horizontal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-004",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DI-022",
    "themeId": "11-pe",
    "subtopicId": "11-pe-declive-inclinacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Declive e inclinação",
    "q": "Se uma reta tem inclinação 150°, o seu declive é...",
    "o": [
      "1/√3.",
      "−1/√3.",
      "−√3.",
      "√3."
    ],
    "a": 1,
    "sol": "tan150°=−tan30°=−1/√3.",
    "hyp": "Pode errar o valor notável.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-declive-inclinacao:11-pe-declive-inclinacao:m-notavel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DI-022",
    "sourceFile": "content/vnext/math-a/11/11-pe-declive-inclinacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DIST-007",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Distâncias em problemas geométricos",
    "q": "Qual é a distância de P=(−5,2) ao eixo Oy?",
    "o": [
      "2.",
      "7.",
      "5.",
      "√29."
    ],
    "a": 2,
    "sol": "O eixo Oy tem x=0, logo a distância horizontal é |−5|=5.",
    "hyp": "Pode usar a ordenada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-distancias:11-pe-distancias:distancia-eixo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-007",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DIST-002",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Distâncias em problemas geométricos",
    "q": "Se P é um ponto exterior ao plano α, qual é a distância de P a α?",
    "o": [
      "o comprimento do segmento que liga P a qualquer ponto do plano.",
      "o comprimento do segmento perpendicular de P ao plano.",
      "o comprimento da projeção de [OP] sobre um plano paralelo a α.",
      "o comprimento do segmento que liga P à origem."
    ],
    "a": 1,
    "sol": "A projeção ortogonal H de P no plano α é o ponto do plano mais próximo de P. Logo, a distância é o comprimento de [PH].",
    "hyp": "Pode confundir distância a plano com distância a um ponto arbitrário.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-distancias:11-pe-distancias:distancia-ponto-plano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-002",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DIST-023",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Distâncias em problemas geométricos",
    "q": "A distância entre x+y+z=0 e 2x+2y+2z−6=0 é...",
    "o": [
      "6.",
      "3.",
      "√3.",
      "2√3."
    ],
    "a": 2,
    "sol": "Dividindo a segunda equação por 2, obtém-se x+y+z=3. A origem pertence ao primeiro plano. A sua distância ao segundo é |0−3|/√(1²+1²+1²)=√3, que é também a distância entre os planos paralelos.",
    "hyp": "Pode comparar termos sem primeiro tornar as normais iguais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-distancias:11-pe-distancias:normalizar-equacoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-023",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DIST-008",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Distâncias em problemas geométricos",
    "q": "A distância do ponto (2,−3,5) ao plano xOy é...",
    "o": [
      "3.",
      "2.",
      "√38.",
      "5."
    ],
    "a": 3,
    "sol": "O plano xOy é z=0, logo a distância é |z|=5.",
    "hyp": "Pode usar a norma do ponto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-distancias:11-pe-distancias:distancia-plano-coordenado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-008",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DIST-043",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Distâncias em problemas geométricos",
    "q": "Seja Q um ponto do plano α, P um ponto exterior e n um vetor normal unitário a α. Como se obtém a distância de P a α a partir de w=QP?",
    "o": [
      "Pela norma de w, qualquer que seja Q.",
      "Pelo módulo da componente de w paralela ao plano.",
      "Pelo módulo da componente de w na direção de n.",
      "Pela norma de w mais a norma de n."
    ],
    "a": 2,
    "sol": "A projeção escalar de w sobre n é w·n, que pode ser positiva ou negativa conforme o sentido de n. A distância ao plano é, portanto, |w·n|.",
    "hyp": "Pode confundir projeção normal com comprimento total.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-distancias:11-pe-distancias:interpretacao-projecao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-043",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DIST-003",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Distâncias em problemas geométricos",
    "q": "A distância entre dois planos paralelos é...",
    "o": [
      "a soma das distâncias às origens.",
      "sempre zero.",
      "a distância de qualquer ponto de um deles ao outro.",
      "o ângulo entre os planos."
    ],
    "a": 2,
    "sol": "Planos paralelos têm distância constante entre si.",
    "hyp": "Pode achar que é preciso escolher pontos correspondentes especiais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-distancias:11-pe-distancias:distancia-planos-paralelos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-003",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-DIST-021",
    "themeId": "11-pe",
    "subtopicId": "11-pe-distancias",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Distâncias em problemas geométricos",
    "q": "Para planos paralelos ax+by+cz+d1=0 e ax+by+cz+d2=0, a distância é...",
    "o": [
      "|d2−d1|/√(a²+b²+c²).",
      "|d2+d1|.",
      "|d2−d1|.",
      "√(d1²+d2²)."
    ],
    "a": 0,
    "sol": "Se Q pertence ao primeiro plano, a expressão ax+by+cz vale −d₁ em Q e −d₂ no segundo plano. A distância é o módulo dessa diferença dividido pela norma √(a²+b²+c²) do vetor normal.",
    "hyp": "Pode esquecer normalizar pela norma da normal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-distancias:11-pe-distancias:formula-planos-paralelos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-DIST-021",
    "sourceFile": "content/vnext/math-a/11/11-pe-distancias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PERP-007",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Perpendicularidade",
    "q": "Para que k os vetores (2,k,1) e (1,3,−5) sejam perpendiculares?",
    "o": [
      "−1.",
      "2.",
      "1.",
      "−2."
    ],
    "a": 2,
    "sol": "2+3k−5=0 => 3k=3 => k=1.",
    "hyp": "Pode esquecer a terceira componente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-perpendicularidade:11-pe-perpendicularidade:parametro-espaco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-007",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PERP-002",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Perpendicularidade",
    "q": "Os vetores (1,2) e (2,−1) são...",
    "o": [
      "paralelos.",
      "perpendiculares.",
      "iguais.",
      "opostos."
    ],
    "a": 1,
    "sol": "1×2+2×(−1)=0.",
    "hyp": "Pode olhar só para as componentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-perpendicularidade:11-pe-perpendicularidade:teste-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-002",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PERP-023",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Perpendicularidade",
    "q": "Uma reta com vetor diretor (2,−1,3) é perpendicular ao plano 2x−y+3z=5?",
    "o": [
      "Não.",
      "Só se passar pela origem.",
      "Sim.",
      "Só se o plano passar pela origem."
    ],
    "a": 2,
    "sol": "O vetor diretor coincide com uma normal do plano.",
    "hyp": "Pode achar que a posição impede perpendicularidade direcional.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-perpendicularidade:11-pe-perpendicularidade:reta-plano-teste",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-023",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PERP-008",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Perpendicularidade",
    "q": "Duas retas no plano são perpendiculares se os seus vetores diretores forem...",
    "o": [
      "proporcionais.",
      "iguais.",
      "de mesma norma.",
      "perpendiculares."
    ],
    "a": 3,
    "sol": "A direção das retas é dada pelos seus vetores diretores.",
    "hyp": "Pode confundir direção com posição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-perpendicularidade:11-pe-perpendicularidade:retas-vetores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-008",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PERP-046",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Perpendicularidade",
    "q": "Uma coluna deve ficar perpendicular a um piso horizontal z=0. Qual direção é adequada?",
    "o": [
      "(1,0,0).",
      "(0,0,1).",
      "(0,1,0).",
      "(1,1,0)."
    ],
    "a": 1,
    "sol": "A direção deve ser paralela à normal do piso.",
    "hyp": "Pode escolher uma direção contida no piso.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-perpendicularidade:11-pe-perpendicularidade:modelacao-coluna",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-046",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PERP-004",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Perpendicularidade",
    "q": "Qual das expressões dá um vetor perpendicular a (a,b) para qualquer par real (a,b)≠(0,0)?",
    "o": [
      "(a,b).",
      "(−a,−b).",
      "(a−b,a+b).",
      "(−b,a)."
    ],
    "a": 3,
    "sol": "O produto escalar de (a,b) com (−b,a) é a(−b)+ba=0. Como (a,b) é não nulo, (−b,a) também é não nulo.",
    "hyp": "Pode escolher o vetor oposto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-perpendicularidade:11-pe-perpendicularidade:construir-perpendicular",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-004",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PERP-021",
    "themeId": "11-pe",
    "subtopicId": "11-pe-perpendicularidade",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Perpendicularidade",
    "q": "A reta de vetor diretor (2,−1,3) é perpendicular a um plano de normal...",
    "o": [
      "(2,−1,3).",
      "(1,2,0).",
      "(−1,−2,1).",
      "(3,2,−1) sempre."
    ],
    "a": 0,
    "sol": "Para perpendicularidade reta-plano, o diretor é paralelo à normal.",
    "hyp": "Pode procurar uma normal perpendicular ao diretor.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-perpendicularidade:11-pe-perpendicularidade:reta-plano-normal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PERP-021",
    "sourceFile": "content/vnext/math-a/11/11-pe-perpendicularidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PC-006",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Produto escalar por coordenadas",
    "q": "Se u=(−3,2) e v=(5,−1), então u·v=",
    "o": [
      "−13.",
      "−17.",
      "17.",
      "13."
    ],
    "a": 1,
    "sol": "−15−2=−17.",
    "hyp": "Pode errar a multiplicação de sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-produto-coordenadas:11-pe-produto-coordenadas:calculo-sinais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-006",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PC-004",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Produto escalar por coordenadas",
    "q": "O produto escalar de dois vetores é...",
    "o": [
      "um vetor.",
      "uma reta.",
      "uma matriz.",
      "um número real."
    ],
    "a": 3,
    "sol": "O resultado do produto escalar é um escalar.",
    "hyp": "Pode confundir com soma vetorial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-produto-coordenadas:11-pe-produto-coordenadas:resultado-escalar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-004",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PC-025",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Produto escalar por coordenadas",
    "q": "Se u=(1,2), v=(3,0), w=(−1,4), então u·(v+w)=",
    "o": [
      "10.",
      "4.",
      "8.",
      "16."
    ],
    "a": 0,
    "sol": "v+w=(2,4); u·(2,4)=1×2+2×4=10.",
    "hyp": "Pode somar os produtos erradamente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-produto-coordenadas:11-pe-produto-coordenadas:distributividade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-025",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PC-015",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Produto escalar por coordenadas",
    "q": "Se u·v=0 e ambos são não nulos, então u e v são...",
    "o": [
      "paralelos.",
      "iguais.",
      "perpendiculares.",
      "opostos."
    ],
    "a": 2,
    "sol": "Produto escalar nulo caracteriza perpendicularidade entre vetores não nulos.",
    "hyp": "Pode confundir com colinearidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-produto-coordenadas:11-pe-produto-coordenadas:produto-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-015",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PC-046",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Produto escalar por coordenadas",
    "q": "Uma força F=(10,0), em newtons, atua durante um deslocamento d=(3,4), em metros. Quanto vale o produto escalar F·d, em joules?",
    "o": [
      "40.",
      "30.",
      "50.",
      "70."
    ],
    "a": 1,
    "sol": "Multiplicam-se as componentes correspondentes e somam-se os produtos. Assim, F·d=10×3+0×4=30 J.",
    "hyp": "Pode usar apenas normas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-produto-coordenadas:11-pe-produto-coordenadas:trabalho-simplificado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-046",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PC-002",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Produto escalar por coordenadas",
    "q": "Se u=(2,3) e v=(4,5), então u·v=",
    "o": [
      "26.",
      "23.",
      "10.",
      "40."
    ],
    "a": 1,
    "sol": "2×4+3×5=8+15=23.",
    "hyp": "Pode somar componentes ou multiplicar tudo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-produto-coordenadas:11-pe-produto-coordenadas:calculo-plano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-002",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-PC-021",
    "themeId": "11-pe",
    "subtopicId": "11-pe-produto-coordenadas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Produto escalar por coordenadas",
    "q": "Para qualquer escalar λ, (λu)·v é igual a...",
    "o": [
      "λ(u·v).",
      "λ²(u·v).",
      "u·v+λ.",
      "(u·v)/λ sempre."
    ],
    "a": 0,
    "sol": "O produto escalar é linear em cada argumento.",
    "hyp": "Pode elevar λ ao quadrado sem motivo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-produto-coordenadas:11-pe-produto-coordenadas:linearidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-PC-021",
    "sourceFile": "content/vnext/math-a/11/11-pe-produto-coordenadas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-RP-006",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Duas retas distintas do plano têm vetores diretores (1,2) e (2,4). Qual é a sua posição relativa?",
    "o": [
      "perpendiculares.",
      "paralelas.",
      "de ângulo 45°.",
      "sem relação."
    ],
    "a": 1,
    "sol": "Os vetores diretores são proporcionais, pois (2,4)=2(1,2). As retas têm a mesma direção e, por serem distintas, são paralelas.",
    "hyp": "Pode olhar apenas para componentes diferentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-retas-planos:11-pe-retas-planos:retas-diretores",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-006",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-RP-002",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Se duas retas têm vetores diretores paralelos, elas são...",
    "o": [
      "perpendiculares.",
      "paralelas ou coincidentes.",
      "reversas sempre.",
      "secantes sempre."
    ],
    "a": 1,
    "sol": "Vetores diretores proporcionais dão a mesma direção.",
    "hyp": "Pode concluir coincidência sem verificar posição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-retas-planos:11-pe-retas-planos:retas-paralelas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-002",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-RP-021",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "A reta de diretor (1,2,2) é perpendicular ao plano x+2y+2z=4?",
    "o": [
      "Sim.",
      "Não.",
      "Só se passar por (0,0,0).",
      "Só se for vertical."
    ],
    "a": 0,
    "sol": "O diretor é igual à normal do plano.",
    "hyp": "Pode impor produto zero em vez de paralelismo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-retas-planos:11-pe-retas-planos:reta-perpendicular-plano",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-021",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-RP-012",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Se uma reta é paralela a um plano, o ângulo entre reta e plano é...",
    "o": [
      "90°.",
      "45°.",
      "indefinido.",
      "0°."
    ],
    "a": 3,
    "sol": "Uma reta paralela ao plano tem direção contida no plano.",
    "hyp": "Pode confundir com a normal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-retas-planos:11-pe-retas-planos:reta-plano-paralela",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-012",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-RP-046",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Uma rampa liga O=(0,0,0) a P=(3,0,1). O ponto H=(3,0,0) é a projeção de P no chão horizontal. Qual é o seno do ângulo que os segmentos [OP] e [OH] formam em O?",
    "o": [
      "3/√10.",
      "1/√10.",
      "1/3.",
      "√10."
    ],
    "a": 1,
    "sol": "O triângulo OPH é retângulo em H. O cateto oposto ao ângulo é PH=1 e a hipotenusa é OP=√(3²+1²)=√10. Logo, o seno é 1/√10.",
    "hyp": "Pode usar a componente horizontal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-retas-planos:11-pe-retas-planos:modelacao-rampa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-046",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-RP-003",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "Se duas retas no espaço não são paralelas nem se intersectam, chamam-se...",
    "o": [
      "coincidentes.",
      "perpendiculares.",
      "reversas.",
      "concorrentes."
    ],
    "a": 2,
    "sol": "Retas reversas são exclusivas do espaço tridimensional.",
    "hyp": "Pode confundir não interseção com paralelismo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-retas-planos:11-pe-retas-planos:retas-reversas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-003",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11PE-RP-022",
    "themeId": "11-pe",
    "subtopicId": "11-pe-retas-planos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Ângulos e posições relativas de retas e planos",
    "q": "O ângulo entre dois planos é o menor ângulo que se pode formar com as respetivas normais. Qual é o ângulo entre os planos x=0 e x+y=0?",
    "o": [
      "90°.",
      "45°.",
      "30°.",
      "60°."
    ],
    "a": 1,
    "sol": "As normais podem ser (1,0,0) e (1,1,0). O seu produto escalar é 1 e as normas são 1 e √2. Logo, o cosseno do menor ângulo é 1/√2, correspondente a 45°.",
    "hyp": "Pode usar diretamente coeficientes sem normalizar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-pe-retas-planos:11-pe-retas-planos:angulo-planos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11PE-RP-022",
    "sourceFile": "content/vnext/math-a/11/11-pe-retas-planos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-MC-006",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Um valor inicial de 200 aumenta 10 unidades por período. Após 4 aumentos vale...",
    "o": [
      "230.",
      "240.",
      "220.",
      "242."
    ],
    "a": 1,
    "sol": "200+4×10=240.",
    "hyp": "Pode contar o valor inicial como um aumento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:linear-passos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-006",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-MC-002",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Interpretação",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Se uma quantidade aumenta sempre pela mesma diferença absoluta, o modelo natural é...",
    "o": [
      "uma PG.",
      "uma PA.",
      "uma sucessão alternada.",
      "uma função trigonométrica."
    ],
    "a": 1,
    "sol": "Acréscimos absolutos constantes correspondem a progressões aritméticas.",
    "hyp": "Pode confundir crescimento absoluto com percentual.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:pa-modelo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-002",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-MC-021",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Qual modelo é compatível com os primeiros termos 100; 110; 121; 133,1; …?",
    "o": [
      "PG de razão 1,1.",
      "PA de razão 10.",
      "PA de razão 11.",
      "PG de razão 10."
    ],
    "a": 0,
    "sol": "Cada um destes termos a partir do segundo é 1,1 vezes o anterior: 110/100=121/110=133,1/121=1,1. O modelo compatível é uma PG de razão 1,1.",
    "hyp": "Pode olhar apenas para a primeira diferença.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:reconhecer-percentual",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-021",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-MC-017",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Modelação",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Uma conta começa com 1000 € e recebe 50 € fixos por mês, sem juros. Um termo geral após n−1 depósitos é...",
    "o": [
      "u_n=1000+50(n−1).",
      "u_n=1000·1,05^{n−1}.",
      "u_n=50n.",
      "u_n=1000−50(n−1)."
    ],
    "a": 0,
    "sol": "O acréscimo é absoluto e constante.",
    "hyp": "Pode interpretar 50 como 5%.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:deposito-fixo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-017",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-MC-037",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Um capital passa de 1000 para 1210 em 2 períodos com a mesma taxa percentual. A taxa por período é...",
    "o": [
      "10%.",
      "21%.",
      "5%.",
      "20%."
    ],
    "a": 0,
    "sol": "1000(1+r)^2=1210 =>(1+r)^2=1,21 =>1+r=1,1 =>r=10%.",
    "hyp": "Pode dividir 21% por 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:taxa-composta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-037",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-MC-003",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Interpretação",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Se uma quantidade aumenta sempre pela mesma percentagem, o modelo natural é...",
    "o": [
      "uma PA.",
      "uma sucessão constante.",
      "uma PG.",
      "uma soma aritmética."
    ],
    "a": 2,
    "sol": "Percentagens constantes correspondem a fatores multiplicativos constantes.",
    "hyp": "Pode somar sempre a mesma percentagem em valor absoluto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:pg-modelo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-003",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-MC-022",
    "themeId": "11-suc",
    "subtopicId": "11-suc-modelacao-comportamento",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Comportamento e modelação com sucessões",
    "q": "Qual modelo descreve 100,110,120,130,...?",
    "o": [
      "PG de razão 1,1.",
      "PA de razão 10.",
      "PG de razão 10.",
      "sucessão quadrática."
    ],
    "a": 1,
    "sol": "A diferença é sempre 10.",
    "hyp": "Pode associar aumento de 10 a 10%.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-modelacao-comportamento:11-suc-modelacao-comportamento:reconhecer-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-MC-022",
    "sourceFile": "content/vnext/math-a/11/11-suc-modelacao-comportamento.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PA-006",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Progressões aritméticas",
    "q": "Numa PA com u_1=4 e r=3, u_5=",
    "o": [
      "19.",
      "16.",
      "15.",
      "12."
    ],
    "a": 1,
    "sol": "u_5=4+4×3=16.",
    "hyp": "Pode usar 5r em vez de 4r.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pa:11-suc-pa:calcular-termo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-006",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PA-002",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Progressões aritméticas",
    "q": "Na PA, a constante u_{n+1}−u_n chama-se...",
    "o": [
      "média.",
      "razão.",
      "amplitude.",
      "produto."
    ],
    "a": 1,
    "sol": "Tradicionalmente chama-se razão da PA, apesar de ser uma diferença.",
    "hyp": "Pode confundir com a razão multiplicativa de uma PG.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pa:11-suc-pa:razao-pa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-002",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PA-021",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Progressões aritméticas",
    "q": "Numa PA, u_4=14 e u_9=34. Qual é r?",
    "o": [
      "4.",
      "5.",
      "20.",
      "2."
    ],
    "a": 0,
    "sol": "34−14=20 ao longo de 5 passos, logo r=4.",
    "hyp": "Pode dividir por 9 em vez de 5.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pa:11-suc-pa:dois-termos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-021",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PA-013",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Progressões aritméticas",
    "q": "Uma PA de razão positiva é...",
    "o": [
      "estritamente crescente.",
      "estritamente decrescente.",
      "constante.",
      "alternada."
    ],
    "a": 0,
    "sol": "Cada termo aumenta por uma quantidade positiva.",
    "hyp": "Pode confundir sinal da razão com sinal dos termos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pa:11-suc-pa:monotonia-pa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-013",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PA-044",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Progressões aritméticas",
    "q": "Uma bancada tem 12 lugares na primeira fila e cada fila seguinte tem mais 3. Quantos lugares tem a 10.ª fila?",
    "o": [
      "42.",
      "30.",
      "36.",
      "39."
    ],
    "a": 3,
    "sol": "12+9×3=39.",
    "hyp": "Pode multiplicar 10×3 e somar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pa:11-suc-pa:modelacao-filas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-044",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PA-003",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Progressões aritméticas",
    "q": "A sucessão 2,5,8,11,... é uma PA de razão...",
    "o": [
      "2.",
      "5.",
      "3.",
      "8."
    ],
    "a": 2,
    "sol": "5−2=3 e a diferença mantém-se.",
    "hyp": "Pode usar o primeiro termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pa:11-suc-pa:identificar-razao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-003",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PA-022",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pa",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Progressões aritméticas",
    "q": "Numa PA, u_4=14 e u_9=34. Qual é u_1?",
    "o": [
      "−2.",
      "2.",
      "6.",
      "10."
    ],
    "a": 1,
    "sol": "u_4=u_1+3r =>14=u_1+12 =>u_1=2.",
    "hyp": "Pode usar 4r em vez de 3r.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pa:11-suc-pa:achar-primeiro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PA-022",
    "sourceFile": "content/vnext/math-a/11/11-suc-pa.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PG-006",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Progressões geométricas",
    "q": "Numa PG com u_1=2 e q=3, u_4=",
    "o": [
      "18.",
      "54.",
      "81.",
      "24."
    ],
    "a": 1,
    "sol": "u_4=2×3³=54.",
    "hyp": "Pode usar expoente 4.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pg:11-suc-pg:calcular-termo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-006",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PG-002",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Progressões geométricas",
    "q": "Na PG, a constante multiplicativa entre termos consecutivos chama-se...",
    "o": [
      "diferença.",
      "razão.",
      "média.",
      "amplitude."
    ],
    "a": 1,
    "sol": "A razão q multiplica cada termo para obter o seguinte.",
    "hyp": "Pode confundir com a razão aditiva de uma PA.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pg:11-suc-pg:razao-pg",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-002",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PG-021",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Progressões geométricas",
    "q": "Se u_n=3·(1/4)^{n−1}, a razão é...",
    "o": [
      "1/4.",
      "3.",
      "4.",
      "−1/4."
    ],
    "a": 0,
    "sol": "O fator que multiplica de termo para termo é 1/4.",
    "hyp": "Pode usar o inverso.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pg:11-suc-pg:reconhecer-pg",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-021",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PG-013",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Progressões geométricas",
    "q": "Se u_1>0 e q>1, a PG é...",
    "o": [
      "estritamente crescente.",
      "estritamente decrescente.",
      "constante.",
      "alternada."
    ],
    "a": 0,
    "sol": "Multiplicar um termo positivo por q>1 aumenta-o.",
    "hyp": "Pode ignorar a condição u_1>0.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pg:11-suc-pg:monotonia-pg",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-013",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PG-044",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Progressões geométricas",
    "q": "O volume de água num depósito é inicialmente de 500 L e aumenta 10% por período. Se o volume inicial é o primeiro valor da sucessão, qual é o quarto valor, em litros?",
    "o": [
      "650.",
      "550.",
      "605.",
      "665,5."
    ],
    "a": 3,
    "sol": "Do primeiro até ao quarto valor há três aumentos. Cada um multiplica o volume por 1,1, logo o quarto valor é 500×1,1³=665,5 L.",
    "hyp": "Pode somar sempre 50 em vez de aplicar percentagem ao novo valor.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pg:11-suc-pg:crescimento-percentual",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-044",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PG-003",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Progressões geométricas",
    "q": "A sucessão 2,6,18,54,... é uma PG de razão...",
    "o": [
      "2.",
      "6.",
      "3.",
      "9."
    ],
    "a": 2,
    "sol": "6/2=3 e a razão mantém-se.",
    "hyp": "Pode usar a diferença 4.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pg:11-suc-pg:identificar-razao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-003",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-PG-022",
    "themeId": "11-suc",
    "subtopicId": "11-suc-pg",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Progressões geométricas",
    "q": "Numa PG, u_2=6 e u_6=486. Com q>0, qual é q?",
    "o": [
      "9.",
      "3.",
      "81.",
      "2."
    ],
    "a": 1,
    "sol": "486/6=81=q^4, logo q=3.",
    "hyp": "Pode tirar raiz quadrada em vez de quarta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-pg:11-suc-pg:dois-termos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-PG-022",
    "sourceFile": "content/vnext/math-a/11/11-suc-pg.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-SOM-006",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Somas de termos de PA e PG",
    "q": "Numa PA com u_1=4, r=3, qual é S_6?",
    "o": [
      "54.",
      "69.",
      "78.",
      "63."
    ],
    "a": 1,
    "sol": "u_6=19; S_6=6(4+19)/2=69.",
    "hyp": "Pode calcular u_6 como 22.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-somas:11-suc-somas:soma-pa-razao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-006",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-SOM-004",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Somas de termos de PA e PG",
    "q": "A soma dos 10 primeiros naturais positivos é...",
    "o": [
      "45.",
      "100.",
      "50.",
      "55."
    ],
    "a": 3,
    "sol": "10×11/2=55.",
    "hyp": "Pode usar 10²/2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-somas:11-suc-somas:gauss",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-004",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-SOM-021",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Somas de termos de PA e PG",
    "q": "Numa PA, u_1=7,r=4. Qual é S_10?",
    "o": [
      "250.",
      "230.",
      "270.",
      "290."
    ],
    "a": 0,
    "sol": "u_10=43; S=10(7+43)/2=250.",
    "hyp": "Pode calcular u_10 com 10 incrementos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-somas:11-suc-somas:pa-soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-021",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-SOM-011",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Somas de termos de PA e PG",
    "q": "Para uma PG de razão q≠1, a soma dos n primeiros termos é...",
    "o": [
      "S_n=n(u_1+u_n)/2.",
      "S_n=u_1q^{n−1}.",
      "S_n=u_1(1−q^n)/(1−q).",
      "S_n=nq."
    ],
    "a": 2,
    "sol": "Escreve S_n=u_1+u_1q+…+u_1q^{n−1}. Ao subtrair qS_n a S_n, os termos intermédios cancelam, dando (1−q)S_n=u_1−u_1q^n. Como q≠1, segue-se S_n=u_1(1−q^n)/(1−q).",
    "hyp": "Pode usar a fórmula de PA.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-somas:11-suc-somas:soma-pg",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-011",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-SOM-043",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Somas de termos de PA e PG",
    "q": "Considera n termos consecutivos de uma progressão aritmética, com n ímpar. Que expressão dá a soma desses termos?",
    "o": [
      "n vezes o primeiro termo.",
      "n vezes a razão.",
      "n vezes o termo central.",
      "metade do último termo."
    ],
    "a": 2,
    "sol": "Cada par de termos à mesma distância do centro tem média igual ao termo central. Com o próprio termo central, a média dos n termos mantém-se igual a esse termo. A soma é n vezes o termo central.",
    "hyp": "Pode achar que só vale para PA simétrica em torno de zero.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-somas:11-suc-somas:media-pa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-043",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-SOM-005",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Somas de termos de PA e PG",
    "q": "A soma dos 5 primeiros termos da PA 2,5,8,11,14 é...",
    "o": [
      "40.",
      "35.",
      "45.",
      "50."
    ],
    "a": 0,
    "sol": "5×(2+14)/2=40.",
    "hyp": "Pode somar apenas extremos e multiplicar por 5.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-somas:11-suc-somas:soma-pa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-005",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-SOM-022",
    "themeId": "11-suc",
    "subtopicId": "11-suc-somas",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Somas de termos de PA e PG",
    "q": "Numa PA, u_5=18 e u_12=46. Qual é a soma do 5.º ao 12.º termo inclusive?",
    "o": [
      "224.",
      "256.",
      "288.",
      "192."
    ],
    "a": 1,
    "sol": "Há 8 termos; soma=8(18+46)/2=256.",
    "hyp": "Pode contar apenas 7 intervalos como termos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-somas:11-suc-somas:soma-trecho-pa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-SOM-022",
    "sourceFile": "content/vnext/math-a/11/11-suc-somas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-TR-006",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Uma definição por recorrência especifica normalmente...",
    "o": [
      "apenas o primeiro termo.",
      "um ou mais termos iniciais e uma regra para obter termos seguintes.",
      "apenas uma fórmula em n.",
      "apenas a soma dos termos."
    ],
    "a": 1,
    "sol": "A recorrência precisa de condições iniciais e de uma relação entre termos.",
    "hyp": "Pode achar que a recorrência dispensa termos iniciais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-termo-recorrencia:11-suc-termo-recorrencia:recorrencia-definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-006",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-TR-003",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Se u_n=2n+1, então u_4=",
    "o": [
      "7.",
      "8.",
      "9.",
      "10."
    ],
    "a": 2,
    "sol": "u_4=2×4+1=9.",
    "hyp": "Pode substituir n por 3 ou esquecer o +1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-termo-recorrencia:11-suc-termo-recorrencia:termo-geral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-003",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-TR-022",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Qual é um termo geral para 3,5,7,9,... começando em n=1?",
    "o": [
      "u_n=2n−1.",
      "u_n=2n+1.",
      "u_n=n+2.",
      "u_n=3n."
    ],
    "a": 1,
    "sol": "Para n=1 dá 3 e cresce 2 por termo.",
    "hyp": "Pode ajustar apenas o primeiro termo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-termo-recorrencia:11-suc-termo-recorrencia:inferir-termo-geral",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-022",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-TR-013",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "A sucessão u_n=1/n, n≥1, é...",
    "o": [
      "positiva e decrescente.",
      "negativa e crescente.",
      "constante.",
      "alternada de sinal."
    ],
    "a": 0,
    "sol": "Os termos são positivos e diminuem à medida que n aumenta.",
    "hyp": "Pode olhar apenas para o numerador constante.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-termo-recorrencia:11-suc-termo-recorrencia:comportamento-simples",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-013",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-TR-047",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Uma população começa com 100 indivíduos e aumenta 20 em cada período. Uma recorrência adequada é...",
    "o": [
      "P_1=100, P_{n+1}=20P_n.",
      "P_n=100n².",
      "P_1=100, P_{n+1}=P_n+20.",
      "P_{n+1}=P_n−20."
    ],
    "a": 2,
    "sol": "O crescimento é aditivo e constante.",
    "hyp": "Pode usar crescimento multiplicativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-termo-recorrencia:11-suc-termo-recorrencia:modelacao-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-047",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-TR-002",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Na sucessão (u_n) indexada a partir de n=1, o que representa u_5?",
    "o": [
      "a soma dos 5 primeiros termos.",
      "o 5.º termo.",
      "o termo geral.",
      "o índice inicial."
    ],
    "a": 1,
    "sol": "O índice n identifica a posição do termo.",
    "hyp": "Pode confundir termo com soma parcial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-termo-recorrencia:11-suc-termo-recorrencia:notacao-termo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-002",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11SUC-TR-021",
    "themeId": "11-suc",
    "subtopicId": "11-suc-termo-recorrencia",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Regularidades, termo geral e recorrência",
    "q": "Duas fórmulas diferentes podem definir a mesma sucessão?",
    "o": [
      "Sim, se produzirem os mesmos termos para todos os índices do domínio.",
      "Não, nunca.",
      "Só se forem polinómios iguais.",
      "Só nos três primeiros termos."
    ],
    "a": 0,
    "sol": "A igualdade de sucessões depende dos valores em todos os índices, não da aparência algébrica da fórmula.",
    "hyp": "Pode confundir expressão com função.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-suc-termo-recorrencia:11-suc-termo-recorrencia:mesma-sucessao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11SUC-TR-021",
    "sourceFile": "content/vnext/math-a/11/11-suc-termo-recorrencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-AR-006",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "A conversão de graus para radianos faz-se multiplicando por...",
    "o": [
      "180/π",
      "π/180",
      "2π",
      "360"
    ],
    "a": 1,
    "sol": "θ(rad)=θ(°)×π/180.",
    "hyp": "Pode usar a fórmula inversa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-angulos-radianos:11-trig-angulos-radianos:converter-graus-rad",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-006",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-AR-003",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Um quarto de volta mede...",
    "o": [
      "45°",
      "180°",
      "90°",
      "270°"
    ],
    "a": 2,
    "sol": "360°/4=90°.",
    "hyp": "Pode dividir por 2 em vez de 4.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-angulos-radianos:11-trig-angulos-radianos:graus-quarto-volta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-003",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-AR-021",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Mantendo o lado inicial, qual é a amplitude em [0°, 360°[ que tem o mesmo lado final de um ângulo de 765°?",
    "o": [
      "45°",
      "135°",
      "225°",
      "315°"
    ],
    "a": 0,
    "sol": "Duas voltas completas não alteram o lado final. Subtraindo 2×360° a 765°, obtém-se 45°.",
    "hyp": "Pode retirar apenas uma volta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-angulos-radianos:11-trig-angulos-radianos:reduzir-graus",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-021",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-AR-018",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Os ângulos 30° e 390° são...",
    "o": [
      "suplementares.",
      "coterminais.",
      "complementares.",
      "opostos."
    ],
    "a": 1,
    "sol": "390°=30°+360°, logo têm o mesmo lado terminal.",
    "hyp": "Pode confundir diferença de 360° com suplementaridade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-angulos-radianos:11-trig-angulos-radianos:coterminais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-018",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-AR-037",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Um ponto percorre 5 voltas completas e mais 60° no sentido anti-horário. Qual é o ângulo orientado total?",
    "o": [
      "1860°",
      "1500°",
      "1800°",
      "186°"
    ],
    "a": 0,
    "sol": "5×360+60=1860°.",
    "hyp": "Pode contar apenas as voltas ou o ângulo residual.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-angulos-radianos:11-trig-angulos-radianos:voltas-total",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-037",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-AR-004",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Em radianos, uma volta completa mede...",
    "o": [
      "π",
      "π/2",
      "4π",
      "2π"
    ],
    "a": 3,
    "sol": "360° correspondem a 2π rad.",
    "hyp": "Pode esquecer o fator 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-angulos-radianos:11-trig-angulos-radianos:radianos-volta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-004",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-AR-022",
    "themeId": "11-trig",
    "subtopicId": "11-trig-angulos-radianos",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Ângulos orientados, arcos e radianos",
    "q": "Mantendo o lado inicial, qual é a amplitude em radianos em [0,2π[ que tem o mesmo lado final de um ângulo de 17π/6 rad?",
    "o": [
      "11π/6",
      "5π/6",
      "π/6",
      "7π/6"
    ],
    "a": 1,
    "sol": "Uma volta completa não altera o lado final. Subtraindo 2π a 17π/6, obtém-se 5π/6, que pertence ao intervalo indicado.",
    "hyp": "Pode subtrair π em vez de 2π.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-angulos-radianos:11-trig-angulos-radianos:reduzir-rad",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-AR-022",
    "sourceFile": "content/vnext/math-a/11/11-trig-angulos-radianos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-CIR-006",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Círculo trigonométrico e redução",
    "q": "O ponto associado a θ=π é...",
    "o": [
      "(0,−1).",
      "(−1,0).",
      "(1,0).",
      "(0,1)."
    ],
    "a": 1,
    "sol": "π rad=180°, lado terminal no eixo Ox negativo.",
    "hyp": "Pode confundir com 2π.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-circulo:11-trig-circulo:pontos-notaveis",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-006",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-CIR-002",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Círculo trigonométrico e redução",
    "q": "No círculo trigonométrico, cos θ corresponde...",
    "o": [
      "à ordenada.",
      "à abcissa do ponto associado ao ângulo.",
      "ao raio.",
      "ao arco."
    ],
    "a": 1,
    "sol": "O ponto associado tem coordenadas (cos θ,sen θ).",
    "hyp": "Pode trocar seno e cosseno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-circulo:11-trig-circulo:cos-abcissa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-002",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-CIR-028",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Círculo trigonométrico e redução",
    "q": "Se cos θ=√3/2 e θ∈[0,2π[, então θ pode ser...",
    "o": [
      "π/3 ou 5π/3.",
      "π/6 ou 5π/6.",
      "π/3 ou 2π/3.",
      "π/6 ou 11π/6."
    ],
    "a": 3,
    "sol": "Cosseno positivo nos quadrantes I e IV, com referência π/6.",
    "hyp": "Pode usar quadrantes do seno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-circulo:11-trig-circulo:preimagens-cos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-028",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-CIR-008",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Círculo trigonométrico e redução",
    "q": "No 1.º quadrante, seno e cosseno são...",
    "o": [
      "ambos negativos.",
      "seno positivo e cosseno negativo.",
      "seno negativo e cosseno positivo.",
      "ambos positivos."
    ],
    "a": 3,
    "sol": "x>0 e y>0 no 1.º quadrante.",
    "hyp": "Pode esquecer a interpretação coordenada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-circulo:11-trig-circulo:sinais-quadrantes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-008",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-CIR-048",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Círculo trigonométrico e redução",
    "q": "Um ponto move-se num círculo unitário e está na posição angular θ=5π/3. Qual é a sua coordenada vertical?",
    "o": [
      "√3/2",
      "−1/2",
      "1/2",
      "−√3/2"
    ],
    "a": 3,
    "sol": "A coordenada vertical é sen(5π/3)=−√3/2.",
    "hyp": "Pode usar o cosseno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-circulo:11-trig-circulo:modelacao-posicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-048",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-CIR-003",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Círculo trigonométrico e redução",
    "q": "No círculo trigonométrico, sen θ corresponde...",
    "o": [
      "à abcissa.",
      "ao raio.",
      "à ordenada do ponto associado.",
      "ao comprimento do arco."
    ],
    "a": 2,
    "sol": "O ponto associado tem coordenadas (cos θ,sen θ).",
    "hyp": "Pode trocar seno e cosseno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-circulo:11-trig-circulo:sin-ordenada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-003",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-CIR-021",
    "themeId": "11-trig",
    "subtopicId": "11-trig-circulo",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Círculo trigonométrico e redução",
    "q": "Quanto vale sen(5π/6)?",
    "o": [
      "1/2",
      "√2/2",
      "√3/2",
      "1"
    ],
    "a": 0,
    "sol": "Os pontos de 5π/6 e π/6 são simétricos em relação ao eixo Oy. Têm, por isso, a mesma ordenada: sen(5π/6)=sen(π/6)=1/2.",
    "hyp": "Pode confundir com seno de π/3.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-circulo:11-trig-circulo:valores-notaveis",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-CIR-021",
    "sourceFile": "content/vnext/math-a/11/11-trig-circulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-EQ-006",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Equações trigonométricas",
    "q": "Em [0,2π[, sen x=1/2 tem soluções...",
    "o": [
      "π/6 e 11π/6.",
      "π/6 e 5π/6.",
      "π/3 e 2π/3.",
      "5π/6 e 7π/6."
    ],
    "a": 1,
    "sol": "Seno positivo nos quadrantes I e II com referência π/6.",
    "hyp": "Pode usar quadrantes do cosseno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-equacoes:11-trig-equacoes:sin-valor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-006",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-EQ-002",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Equações trigonométricas",
    "q": "Quais são as soluções em ℝ da equação cos x=0? Nas expressões, k∈ℤ.",
    "o": [
      "x=kπ.",
      "x=π/2+kπ.",
      "x=2kπ.",
      "x=π/4+2kπ."
    ],
    "a": 1,
    "sol": "O cosseno anula-se nos ângulos π/2 e 3π/2 módulo 2π.",
    "hyp": "Pode confundir zeros de seno e cosseno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-equacoes:11-trig-equacoes:cos-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-002",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-EQ-021",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Equações trigonométricas",
    "q": "A equação cos x=−3/2 tem...",
    "o": [
      "nenhuma solução real.",
      "duas soluções em [0,2π[.",
      "uma solução em π.",
      "infinitas soluções."
    ],
    "a": 0,
    "sol": "Para todo x real, −1≤cos x≤1. Como −3/2<−1, a equação não tem soluções reais.",
    "hyp": "Pode tentar resolver numericamente um valor impossível.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-equacoes:11-trig-equacoes:sem-solucao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-021",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-EQ-018",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Equações trigonométricas",
    "q": "Resolve 3cos x+3=0 em [0,2π[.",
    "o": [
      "0.",
      "π.",
      "π/2 e 3π/2.",
      "2π."
    ],
    "a": 1,
    "sol": "cos x=−1, o que ocorre em x=π.",
    "hyp": "Pode parar em cos x=−3.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-equacoes:11-trig-equacoes:equacao-linear-cos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-018",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-EQ-048",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Equações trigonométricas",
    "q": "A altura de uma maré simplificada é h(t)=2+sen t. Em [0,2π[, quando h(t)=2?",
    "o": [
      "t=π/2 e 3π/2.",
      "t=π apenas.",
      "t=0 apenas.",
      "t=0 e t=π."
    ],
    "a": 3,
    "sol": "A igualdade h(t)=2 equivale a sen t=0. O seno anula-se nos múltiplos inteiros de π, dos quais só 0 e π pertencem a [0,2π[.",
    "hyp": "Pode procurar extremos em vez do nível médio.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-equacoes:11-trig-equacoes:modelacao-periodica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-048",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-EQ-003",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Equações trigonométricas",
    "q": "Quais são as soluções em ℝ da equação tg x=0? Nas expressões, k∈ℤ.",
    "o": [
      "x=π/2+kπ.",
      "x=π/4+kπ.",
      "x=kπ.",
      "x=2kπ apenas."
    ],
    "a": 2,
    "sol": "tg x=0 quando sen x=0 e cos x≠0, isto é, x=kπ.",
    "hyp": "Pode confundir com pontos onde a tangente não existe.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-equacoes:11-trig-equacoes:tan-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-003",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-EQ-022",
    "themeId": "11-trig",
    "subtopicId": "11-trig-equacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Equações trigonométricas",
    "q": "Resolve sen² x=1 em [0,2π[.",
    "o": [
      "0 e π.",
      "π/2 e 3π/2.",
      "π/4 e 5π/4.",
      "π/2 apenas."
    ],
    "a": 1,
    "sol": "De sen² x=1 resulta sen x=1 ou sen x=−1. Em [0,2π[, estes valores são atingidos em π/2 e 3π/2, respetivamente.",
    "hyp": "Pode considerar apenas sin x=1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-equacoes:11-trig-equacoes:quadratica-sin",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-EQ-022",
    "sourceFile": "content/vnext/math-a/11/11-trig-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-FUN-006",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Funções seno e cosseno",
    "q": "O valor mínimo de cos x é...",
    "o": [
      "0.",
      "−1.",
      "−1/2.",
      "1."
    ],
    "a": 1,
    "sol": "No círculo trigonométrico, o cosseno é a abcissa, que varia entre −1 e 1. A menor abcissa é −1 e é atingida, por exemplo, em x=π.",
    "hyp": "Pode confundir mínimo com zero.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-funcoes:11-trig-funcoes:minimo-cosseno",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-006",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-FUN-002",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Funções seno e cosseno",
    "q": "A função y=cos x tem período fundamental...",
    "o": [
      "π.",
      "2π.",
      "π/2.",
      "4π."
    ],
    "a": 1,
    "sol": "O cosseno repete-se a cada 2π.",
    "hyp": "Pode usar período π.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-funcoes:11-trig-funcoes:periodo-cosseno",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-002",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-FUN-024",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Funções seno e cosseno",
    "q": "Qual é a imagem de y=3sin x+2?",
    "o": [
      "[−3,3].",
      "[2,5].",
      "[−5,1].",
      "[−1,5]."
    ],
    "a": 3,
    "sol": "Eixo médio 2 e amplitude 3: 2±3.",
    "hyp": "Pode somar amplitude apenas ao máximo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-funcoes:11-trig-funcoes:imagem-deslocada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-024",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-FUN-019",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Funções seno e cosseno",
    "q": "O gráfico de y=sen x deslocado 2 unidades para cima torna-se...",
    "o": [
      "y=sen(x+2).",
      "y=2sin x.",
      "y=sen x+2.",
      "y=sen x−2."
    ],
    "a": 2,
    "sol": "Uma translação vertical soma 2 à saída.",
    "hyp": "Pode colocar o 2 no argumento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-funcoes:11-trig-funcoes:translacao-vertical",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-019",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-FUN-037",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Funções seno e cosseno",
    "q": "Qual é o mínimo de y=−2cos x+5?",
    "o": [
      "3.",
      "5.",
      "7.",
      "−3."
    ],
    "a": 0,
    "sol": "Como −2cos x varia em [−2,2], o mínimo total é 3.",
    "hyp": "Pode achar que o sinal negativo troca o intervalo para [0,2].",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-funcoes:11-trig-funcoes:extremo-modelo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-037",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-FUN-003",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Funções seno e cosseno",
    "q": "A imagem da função seno é...",
    "o": [
      "ℝ.",
      "[0,1].",
      "[−1,1].",
      "]−∞,1]."
    ],
    "a": 2,
    "sol": "O seno varia entre −1 e 1.",
    "hyp": "Pode esquecer os valores negativos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-funcoes:11-trig-funcoes:imagem-seno",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-003",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-FUN-021",
    "themeId": "11-trig",
    "subtopicId": "11-trig-funcoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Funções seno e cosseno",
    "q": "No modelo periódico y=A sen(Bx+C)+D, com A≠0 e B≠0, o que representa D?",
    "o": [
      "a ordenada da linha média.",
      "a amplitude.",
      "o período.",
      "a frequência angular."
    ],
    "a": 0,
    "sol": "Os valores extremos são D−|A| e D+|A|. A média destes valores é D, logo a linha média é a reta y=D.",
    "hyp": "Pode confundir com amplitude.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-funcoes:11-trig-funcoes:parametro-D",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-FUN-021",
    "sourceFile": "content/vnext/math-a/11/11-trig-funcoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-MOD-006",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo retângulo, tg α=3/4 e o cateto adjacente mede 8. O cateto oposto mede...",
    "o": [
      "8",
      "6",
      "10",
      "12"
    ],
    "a": 1,
    "sol": "oposto/8=3/4 => oposto=6.",
    "hyp": "Pode multiplicar pela razão inversa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-modelacao:11-trig-modelacao:usar-tan",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-006",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-MOD-002",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo retângulo, α é um ângulo agudo. A que razão corresponde cos α?",
    "o": [
      "cateto oposto/hipotenusa.",
      "cateto adjacente/hipotenusa.",
      "cateto oposto/cateto adjacente.",
      "hipotenusa/cateto adjacente."
    ],
    "a": 1,
    "sol": "cos α=adjacente/hipotenusa.",
    "hyp": "Pode trocar cosseno e seno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-modelacao:11-trig-modelacao:razoes-triangulo-retangulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-002",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-MOD-021",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo, A=40°, B=60°. Quanto mede C?",
    "o": [
      "80°",
      "100°",
      "60°",
      "40°"
    ],
    "a": 0,
    "sol": "C=180−40−60=80°.",
    "hyp": "Pode esquecer a soma dos ângulos internos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-modelacao:11-trig-modelacao:completar-angulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-021",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-MOD-013",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo, a é o lado oposto ao ângulo A e os outros lados medem b e c. A lei dos cossenos dá a²=b²+c²−2bc cos A. Que igualdade se obtém quando A=90°?",
    "o": [
      "a²=b²+c².",
      "a=b+c.",
      "a²=b²−c².",
      "a²=2bc."
    ],
    "a": 0,
    "sol": "Como cos 90°=0, o termo −2bc cos A é nulo. Fica a²=b²+c², a igualdade do teorema de Pitágoras.",
    "hyp": "Pode não reconhecer a ligação a Pitágoras.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-modelacao:11-trig-modelacao:cossenos-pitagoras",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-013",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-MOD-048",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Dois observadores A e B estão a 100 m um do outro e veem um ponto C. No triângulo ABC, os ângulos internos em A e B medem 45° e 60°, respetivamente. Qual é a amplitude do ângulo interno em C?",
    "o": [
      "105°",
      "15°",
      "90°",
      "75°"
    ],
    "a": 3,
    "sol": "C=180−45−60=75°.",
    "hyp": "Pode somar os ângulos em vez de subtrair de 180.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-modelacao:11-trig-modelacao:triangulacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-048",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-MOD-004",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo retângulo, relativamente a α, o cateto oposto mede 3 e a hipotenusa 5. Então sen α=",
    "o": [
      "4/5",
      "3/4",
      "5/3",
      "3/5"
    ],
    "a": 3,
    "sol": "sen α=oposto/hipotenusa=3/5.",
    "hyp": "Pode usar o cateto adjacente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-modelacao:11-trig-modelacao:razao-direta",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-004",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-MOD-022",
    "themeId": "11-trig",
    "subtopicId": "11-trig-modelacao",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Resolução de triângulos e modelação periódica",
    "q": "Num triângulo, a e b são os lados opostos aos ângulos A e B e verifica-se a/sen A=b/sen B. Se a=7, A=30° e B=45°, qual é o valor de b arredondado às centésimas?",
    "o": [
      "7,00",
      "9,90",
      "4,95",
      "14,00"
    ],
    "a": 1,
    "sol": "Da relação dada, b=7 sen 45°/sen 30°=7(√2/2)/(1/2)=7√2. Arredondando às centésimas, b≈9,90.",
    "hyp": "Pode inverter a razão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-modelacao:11-trig-modelacao:lei-senos-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-MOD-022",
    "sourceFile": "content/vnext/math-a/11/11-trig-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-REL-006",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Se sen x=5/13 e x está no 1.º quadrante, então cos x=",
    "o": [
      "−12/13",
      "12/13",
      "5/12",
      "8/13"
    ],
    "a": 1,
    "sol": "cos² x=1−25/169=144/169 e no 1.º quadrante cos>0.",
    "hyp": "Pode escolher a raiz negativa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-relacoes:11-trig-relacoes:achar-cos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-006",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-REL-002",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Quando cos x≠0, tg x é igual a...",
    "o": [
      "cos x/sen x.",
      "sen x/cos x.",
      "sen x·cos x.",
      "1/cos x."
    ],
    "a": 1,
    "sol": "A tangente é o quociente seno/cosseno.",
    "hyp": "Pode inverter o quociente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-relacoes:11-trig-relacoes:definicao-tan",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-002",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-REL-027",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Se sen x=4/5 e x∈]π/2,π[, então tg x=",
    "o": [
      "4/3",
      "−3/4",
      "−4/3",
      "3/4"
    ],
    "a": 2,
    "sol": "cos x=−3/5 e tg=(4/5)/(−3/5)=−4/3.",
    "hyp": "Pode errar o sinal ou inverter a razão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-relacoes:11-trig-relacoes:sincos-para-tan",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-027",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-REL-014",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "No 2.º quadrante, tg x é...",
    "o": [
      "positiva.",
      "negativa.",
      "zero sempre.",
      "indefinida sempre."
    ],
    "a": 1,
    "sol": "Seno positivo e cosseno negativo dão quociente negativo.",
    "hyp": "Pode confundir sinal da tangente com sinal do seno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-relacoes:11-trig-relacoes:sinal-tan",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-014",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-REL-048",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Num mecanismo circular unitário, a coordenada vertical é 12/13 e a horizontal é positiva. Qual é a tangente do ângulo?",
    "o": [
      "5/12",
      "−12/5",
      "13/5",
      "12/5"
    ],
    "a": 3,
    "sol": "cos=5/13; tg=(12/13)/(5/13)=12/5.",
    "hyp": "Pode usar o inverso ou sinal errado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-relacoes:11-trig-relacoes:modelacao-coordenadas",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-048",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-REL-003",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Se sen x=0 e cos x≠0, então tg x=",
    "o": [
      "1.",
      "não existe.",
      "0.",
      "cos x."
    ],
    "a": 2,
    "sol": "tg x=sen x/cos x=0.",
    "hyp": "Pode achar que tangente não existe sempre que seno é zero.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-relacoes:11-trig-relacoes:tan-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-003",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN11TRIG-REL-029",
    "themeId": "11-trig",
    "subtopicId": "11-trig-relacoes",
    "year": "11.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Relações e identidades trigonométricas fundamentais",
    "q": "Se tg x=1 e x∈]π,3π/2[, então sen x=",
    "o": [
      "−√2/2",
      "√2/2",
      "−1/2",
      "1/2"
    ],
    "a": 0,
    "sol": "Como tg x=1, tem-se sen x=cos x. A fórmula fundamental dá 2 sen² x=1. No 3.º quadrante o seno é negativo, pelo que sen x=−√2/2.",
    "hyp": "Pode escolher os sinais do 1.º quadrante.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:11-trig-relacoes:11-trig-relacoes:tan-para-sin",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN11TRIG-REL-029",
    "sourceFile": "content/vnext/math-a/11/11-trig-relacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-AG-006",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "O módulo |z| representa geometricamente...",
    "o": [
      "a abcissa de z.",
      "a distância da origem ao ponto z.",
      "a ordenada de z.",
      "o declive OZ."
    ],
    "a": 1,
    "sol": "|z|=√(x²+y²).",
    "hyp": "Pode confundir com uma coordenada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-argand:12-cplx-argand:modulo-geometrico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-006",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-AG-002",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "O complexo 3+2i corresponde ao ponto...",
    "o": [
      "(2,3).",
      "(3,2).",
      "(3,−2).",
      "(−3,2)."
    ],
    "a": 1,
    "sol": "Re=3, Im=2.",
    "hyp": "Pode trocar ou mudar sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-argand:12-cplx-argand:ponto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-002",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-AG-022",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "Se z1=−2 e z2=2, a condição |z+2|=|z−2| descreve...",
    "o": [
      "o eixo real.",
      "o eixo imaginário.",
      "a circunferência unitária.",
      "x=2."
    ],
    "a": 1,
    "sol": "A mediatriz de [−2,2] é x=0.",
    "hyp": "Pode escolher a reta que contém os pontos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-argand:12-cplx-argand:mediatriz-eixos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-022",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-AG-008",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "O conjugado de z corresponde geometricamente a...",
    "o": [
      "reflexão no eixo imaginário.",
      "rotação de 90°.",
      "translação horizontal.",
      "reflexão no eixo real."
    ],
    "a": 3,
    "sol": "(x,y)→(x,−y).",
    "hyp": "Pode confundir conjugação com oposto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-argand:12-cplx-argand:conjugado-geometrico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-008",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-AG-046",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "Um objeto desloca-se do ponto que representa 2+i para o ponto que representa 6+4i. Qual é a distância entre esses dois pontos?",
    "o": [
      "7.",
      "5.",
      "12.",
      "25."
    ],
    "a": 1,
    "sol": "O deslocamento entre os pontos é (6+4i)−(2+i)=4+3i. A distância é o seu módulo, √(4²+3²)=5.",
    "hyp": "Pode somar as componentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-argand:12-cplx-argand:modelacao-vetor",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-046",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-AG-003",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "O ponto (−4,5) representa o complexo...",
    "o": [
      "5−4i.",
      "−4−5i.",
      "−4+5i.",
      "4+5i."
    ],
    "a": 2,
    "sol": "z=x+yi.",
    "hyp": "Pode trocar coordenadas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-argand:12-cplx-argand:complexo-por-ponto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-003",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-AG-021",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-argand",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Plano de Argand-Gauss e interpretação geométrica",
    "q": "Se z1 e z2 são complexos distintos, o que descreve a condição |z−z1|=|z−z2|?",
    "o": [
      "a mediatriz do segmento que une z1 e z2.",
      "a reta z1z2.",
      "uma circunferência de centro z1.",
      "apenas o ponto médio."
    ],
    "a": 0,
    "sol": "A igualdade significa que o afixo de z está à mesma distância dos afixos distintos de z1 e z2, pelo que pertence à mediatriz do segmento que os une.",
    "hyp": "Pode reduzir o lugar ao ponto médio.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-argand:12-cplx-argand:mediatriz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-AG-021",
    "sourceFile": "content/vnext/math-a/12/12-cplx-argand.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-CM-008",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Conjugado e módulo",
    "q": "|−8|, visto como complexo, é...",
    "o": [
      "−8.",
      "0.",
      "64.",
      "8."
    ],
    "a": 3,
    "sol": "Módulo complexo coincide com valor absoluto nos reais.",
    "hyp": "Pode manter o sinal negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:modulo-real",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-008",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-CM-004",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Conjugado e módulo",
    "q": "O módulo de z=a+bi é...",
    "o": [
      "a²+b².",
      "|a+b|.",
      "a+b.",
      "√(a²+b²)."
    ],
    "a": 3,
    "sol": "É a distância do ponto (a,b) à origem.",
    "hyp": "Pode esquecer a raiz.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-004",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-CM-021",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Conjugado e módulo",
    "q": "Se |z|=1, então z·conj(z)=",
    "o": [
      "1.",
      "0.",
      "z.",
      "conj(z)."
    ],
    "a": 0,
    "sol": "z·conj(z)=|z|²=1.",
    "hyp": "Pode esquecer o quadrado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:modulo-unitario",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-021",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-CM-017",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Conjugado e módulo",
    "q": "Se z=conj(z), então z é...",
    "o": [
      "real.",
      "imaginário puro não nulo.",
      "de módulo 1.",
      "necessariamente zero."
    ],
    "a": 0,
    "sol": "A parte imaginária tem de ser zero.",
    "hyp": "Pode achar que só zero é igual ao conjugado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:real-criterio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-017",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-CM-048",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Conjugado e módulo",
    "q": "Se z=(6−8i)²/10, qual é o módulo de z?",
    "o": [
      "1.",
      "100.",
      "20.",
      "10."
    ],
    "a": 3,
    "sol": "Como |6−8i|=√(6²+8²)=10, obtém-se |z|=10²/10=10.",
    "hyp": "Pode usar distância Manhattan.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:modelacao-distancia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-048",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-CM-002",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Conjugado e módulo",
    "q": "O conjugado de 3+4i é...",
    "o": [
      "−3+4i.",
      "3−4i.",
      "−3−4i.",
      "4+3i."
    ],
    "a": 1,
    "sol": "Mantém-se a parte real e troca-se o sinal da imaginária.",
    "hyp": "Pode mudar ambos os sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:conjugado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-002",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-CM-022",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-conjugado-modulo",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Conjugado e módulo",
    "q": "Se |z|=2, então z·conj(z)=",
    "o": [
      "2.",
      "4.",
      "8.",
      "0."
    ],
    "a": 1,
    "sol": "É |z|²=4.",
    "hyp": "Pode usar o módulo sem quadrar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-conjugado-modulo:12-cplx-conjugado-modulo:produto-conjugado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-CM-022",
    "sourceFile": "content/vnext/math-a/12/12-cplx-conjugado-modulo.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FA-008",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Um número real r, considerado como elemento de ℂ, escreve-se em forma algébrica como...",
    "o": [
      "−r+0i.",
      "ri.",
      "r+i.",
      "r+0i."
    ],
    "a": 3,
    "sol": "A parte imaginária é zero.",
    "hyp": "Pode trocar o papel das componentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-algebrica:12-cplx-forma-algebrica:real-em-C",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-008",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FA-004",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Se z=3−2i, então Re(z)=",
    "o": [
      "−2.",
      "2.",
      "−3.",
      "3."
    ],
    "a": 3,
    "sol": "A parte real é o termo sem i.",
    "hyp": "Pode escolher o coeficiente de i.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-algebrica:12-cplx-forma-algebrica:ler-real",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-004",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FA-021",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Se z=(2a−1)+(b+3)i=5−2i, então a=",
    "o": [
      "3.",
      "2.",
      "−3.",
      "5."
    ],
    "a": 0,
    "sol": "2a−1=5 => a=3.",
    "hyp": "Pode usar a equação da parte imaginária.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-algebrica:12-cplx-forma-algebrica:parametros",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-021",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FA-018",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Se Re(z)=0, então z é...",
    "o": [
      "necessariamente real não nulo.",
      "imaginário puro ou zero.",
      "necessariamente 1.",
      "de módulo zero."
    ],
    "a": 1,
    "sol": "z=bi; pode ser 0 se b=0.",
    "hyp": "Pode excluir o zero ou classificar como real apenas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-algebrica:12-cplx-forma-algebrica:real-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-018",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FA-048",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Uma grandeza é representada por z=12+5i. A sua componente real é...",
    "o": [
      "5.",
      "17.",
      "13.",
      "12."
    ],
    "a": 3,
    "sol": "A componente real é o coeficiente sem i.",
    "hyp": "Pode somar componentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-algebrica:12-cplx-forma-algebrica:modelacao-componentes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-048",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FA-002",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Em z=a+bi, a é...",
    "o": [
      "a parte imaginária.",
      "a parte real.",
      "o módulo.",
      "o argumento."
    ],
    "a": 1,
    "sol": "Re(z)=a.",
    "hyp": "Pode trocar as duas componentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-algebrica:12-cplx-forma-algebrica:parte-real",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-002",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FA-023",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-algebrica",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Forma algébrica, parte real/imaginária e igualdade",
    "q": "Se (x+1)+(2y−3)i=4+5i, então x=",
    "o": [
      "4.",
      "2.",
      "3.",
      "5."
    ],
    "a": 2,
    "sol": "x+1=4 => x=3.",
    "hyp": "Pode não subtrair 1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-algebrica:12-cplx-forma-algebrica:sistema",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FA-023",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-algebrica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FT-007",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "Um argumento de 1+i é...",
    "o": [
      "π/2.",
      "3π/4.",
      "π/4.",
      "−π/4."
    ],
    "a": 2,
    "sol": "O ponto está no 1.º quadrante com x=y.",
    "hyp": "Pode escolher o argumento do 4.º quadrante.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-trig:12-cplx-forma-trig:arg-notavel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-007",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FT-002",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "Na forma trigonométrica z=r(cos θ+i sin θ), com r>0, o que representa r?",
    "o": [
      "a parte real.",
      "o módulo de z.",
      "a parte imaginária.",
      "o argumento."
    ],
    "a": 1,
    "sol": "r=|z|.",
    "hyp": "Pode confundir r com Re(z).",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-trig:12-cplx-forma-trig:modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-002",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FT-021",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "Se |z|=2 e arg(z)=π/3, então z em forma algébrica é...",
    "o": [
      "1+√3 i.",
      "√3+i.",
      "2+√3 i.",
      "1+(√3/2)i."
    ],
    "a": 0,
    "sol": "Como cos(π/3)=1/2 e sin(π/3)=√3/2, z=2(1/2+i√3/2)=1+√3i.",
    "hyp": "Pode esquecer multiplicar pelo módulo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-trig:12-cplx-forma-trig:converter",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-021",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FT-013",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "A forma trigonométrica de 2i é...",
    "o": [
      "2(cosπ/2+i sinπ/2).",
      "2(cos0+i sin0).",
      "2(cosπ+i sinπ).",
      "cosπ/2+i sinπ/2."
    ],
    "a": 0,
    "sol": "Módulo 2 e direção do eixo imaginário positivo.",
    "hyp": "Pode confundir com eixo real.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-trig:12-cplx-forma-trig:eixo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-013",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FT-041",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "O conjunto dos complexos com argumento π/4 e módulo positivo é...",
    "o": [
      "a semirreta de origem 0 na direção π/4, excluindo 0.",
      "uma reta inteira.",
      "uma circunferência.",
      "um disco."
    ],
    "a": 0,
    "sol": "Fixar argumento fixa direção; o módulo varia.",
    "hyp": "Pode incluir a semirreta oposta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-trig:12-cplx-forma-trig:lugar-arg",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-041",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FT-003",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "Na forma trigonométrica z=r(cos θ+i sin θ), com r>0, o que representa θ?",
    "o": [
      "o módulo.",
      "a parte real.",
      "um argumento de z.",
      "a parte imaginária."
    ],
    "a": 2,
    "sol": "O módulo r é positivo, pelo que θ mede um ângulo orientado do semieixo real positivo para o vetor que representa z.",
    "hyp": "Pode confundir com o raio.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-trig:12-cplx-forma-trig:argumento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-003",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-FT-025",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-forma-trig",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Forma trigonométrica, módulo e argumento",
    "q": "Se 0 é um argumento do número complexo z, então z é...",
    "o": [
      "real positivo.",
      "real negativo.",
      "imaginário puro positivo.",
      "zero."
    ],
    "a": 0,
    "sol": "O vetor aponta no sentido positivo de Ox.",
    "hyp": "Pode incluir z=0, que não tem argumento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-forma-trig:12-cplx-forma-trig:arg-eixo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-FT-025",
    "sourceFile": "content/vnext/math-a/12/12-cplx-forma-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OA-007",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Operações na forma algébrica",
    "q": "O produto (a+bi)(c+di) tem parte real...",
    "o": [
      "ac+bd.",
      "ad+bc.",
      "ac − bd.",
      "ad − bc."
    ],
    "a": 2,
    "sol": "bi·di=bd i²=−bd.",
    "hyp": "Pode esquecer i²=−1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:produto-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-007",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OA-002",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Operações na forma algébrica",
    "q": "(2+3i)+(4+i)=",
    "o": [
      "6+3i.",
      "6+4i.",
      "8+4i.",
      "6+2i."
    ],
    "a": 1,
    "sol": "2+4=6 e 3+1=4.",
    "hyp": "Pode somar apenas partes reais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-002",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OA-024",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Operações na forma algébrica",
    "q": "(4+3i)/(4−3i) tem módulo...",
    "o": [
      "5.",
      "25.",
      "7.",
      "1."
    ],
    "a": 3,
    "sol": "Numerador e denominador são conjugados e têm o mesmo módulo.",
    "hyp": "Pode somar os módulos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:quociente-modulo1",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-024",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OA-013",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações na forma algébrica",
    "q": "Qual é o resultado de desenvolver e simplificar (2+i)²?",
    "o": [
      "3+4i.",
      "5+4i.",
      "3+2i.",
      "4+4i."
    ],
    "a": 0,
    "sol": "4+4i+i²=3+4i.",
    "hyp": "Pode esquecer o termo cruzado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:quadrado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-013",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OA-048",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Operações na forma algébrica",
    "q": "Uma impedância simplificada z=3+4i é multiplicada por 2. O resultado é...",
    "o": [
      "5+6i.",
      "6+4i.",
      "3+8i.",
      "6+8i."
    ],
    "a": 3,
    "sol": "Multiplica-se cada componente por 2.",
    "hyp": "modelacao-escalar",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:undefined",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-048",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OA-004",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações na forma algébrica",
    "q": "A diferença (a+bi)−(c+di) é...",
    "o": [
      "(a+c)+(b+d)i.",
      "(a−d)+(b−c)i.",
      "(ac − bd)i.",
      "(a−c)+(b−d)i."
    ],
    "a": 3,
    "sol": "Subtraem-se partes correspondentes.",
    "hyp": "Pode não distribuir o sinal negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:subtracao-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-004",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OA-025",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-algebricas",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Operações na forma algébrica",
    "q": "O inverso de z≠0 pode escrever-se como...",
    "o": [
      "conj(z)/|z|².",
      "z/|z|.",
      "−z/|z|².",
      "conj(z)/|z|."
    ],
    "a": 0,
    "sol": "z·conj(z)=|z|².",
    "hyp": "Pode esquecer o quadrado no denominador.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-algebricas:12-cplx-operacoes-algebricas:inverso-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OA-025",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-algebricas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OT-006",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Se z=2(cosπ/6+i sinπ/6), então z² tem módulo...",
    "o": [
      "2.",
      "4.",
      "8.",
      "√2."
    ],
    "a": 1,
    "sol": "|z²|=2²=4.",
    "hyp": "Pode manter o módulo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-trig:12-cplx-operacoes-trig:potencia-modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-006",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OT-002",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Se z1=r1(cos α+i sin α) e z2=r2(cos β+i sin β), com r1>0 e r2>0, então um argumento de z1z2 é...",
    "o": [
      "α−β.",
      "α+β.",
      "αβ.",
      "α/β."
    ],
    "a": 1,
    "sol": "Como os módulos são positivos, α e β são argumentos dos fatores. Um argumento do produto é α+β.",
    "hyp": "Pode subtrair argumentos como na divisão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-trig:12-cplx-operacoes-trig:produto-args",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-002",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OT-021",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "As soluções de z²=1 são...",
    "o": [
      "±1.",
      "±i.",
      "1 apenas.",
      "±(1+i)."
    ],
    "a": 0,
    "sol": "São as raízes quadradas de 1.",
    "hyp": "Pode incluir apenas a raiz principal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-trig:12-cplx-operacoes-trig:raiz-quadrada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-021",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OT-007",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Se z=2(cos(π/6)+i sin(π/6)), um argumento de z² é...",
    "o": [
      "π/6.",
      "π/12.",
      "π/3.",
      "2π/3."
    ],
    "a": 2,
    "sol": "2×π/6=π/3.",
    "hyp": "Pode dividir o argumento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-trig:12-cplx-operacoes-trig:potencia-arg",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-007",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OT-045",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "No plano complexo, considera dilatações e rotações com centro na origem. A que transformação corresponde multiplicar por um complexo de módulo 2 e argumento π/3?",
    "o": [
      "uma dilatação de fator 2 e rotação de π/3.",
      "apenas uma rotação.",
      "apenas uma dilatação.",
      "uma reflexão."
    ],
    "a": 0,
    "sol": "A multiplicação duplica a distância à origem e acrescenta π/3 a um argumento de cada ponto diferente da origem. A origem permanece fixa.",
    "hyp": "Pode ignorar um dos efeitos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-trig:12-cplx-operacoes-trig:transformacao-produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-045",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OT-003",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "Sejam r1=|z1| e r2=|z2|, com z2≠0. Qual é o módulo do quociente z1/z2?",
    "o": [
      "r1r2.",
      "r1−r2.",
      "r1/r2.",
      "r1+r2."
    ],
    "a": 2,
    "sol": "Na divisão, dividem-se os módulos.",
    "hyp": "Pode multiplicar módulos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-trig:12-cplx-operacoes-trig:quociente-modulos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-003",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-OT-023",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-operacoes-trig",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Multiplicação, divisão, potenciação, radiciação, equações e condições geométricas",
    "q": "As soluções de z²=i têm módulo...",
    "o": [
      "√2.",
      "1/2.",
      "1.",
      "2."
    ],
    "a": 2,
    "sol": "|i|=1, logo módulo das raízes é √1=1.",
    "hyp": "Pode usar módulo de 1+i.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-operacoes-trig:12-cplx-operacoes-trig:raiz-i",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-OT-023",
    "sourceFile": "content/vnext/math-a/12/12-cplx-operacoes-trig.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-UE-013",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Qual é a solução da equação z²=−9 em ℂ cuja parte imaginária é positiva?",
    "o": [
      "3i.",
      "−3.",
      "9i.",
      "i/3."
    ],
    "a": 0,
    "sol": "Como (3i)²=9i²=−9, as soluções são 3i e −3i. Só 3i tem parte imaginária positiva.",
    "hyp": "Pode tratar a raiz como real.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:raiz-negativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-013",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-UE-005",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "As potências de i repetem-se com período...",
    "o": [
      "4.",
      "2.",
      "3.",
      "6."
    ],
    "a": 0,
    "sol": "i,i²,i³,i⁴ repetem-se de quatro em quatro.",
    "hyp": "Pode considerar apenas alternância de sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:periodo-potencias",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-005",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-UE-026",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Se z²=−36, então z pode ser...",
    "o": [
      "±6.",
      "±6i.",
      "36i.",
      "−36."
    ],
    "a": 1,
    "sol": "(6i)²=−36.",
    "hyp": "Pode esquecer as duas soluções.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:z-quadrado",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-026",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-UE-019",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Todo número real é também...",
    "o": [
      "um número complexo de argumento 0.",
      "um número complexo de módulo igual à sua parte real.",
      "um número complexo com parte imaginária zero.",
      "um complexo com parte real zero."
    ],
    "a": 2,
    "sol": "Todo r∈ℝ é representado em ℂ por r+0i, com parte imaginária igual a zero.",
    "hyp": "Pode pensar que reais e complexos são conjuntos disjuntos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:inclusao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-019",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-UE-049",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Num modelo algébrico surge x²+100=0. Em C, as soluções são...",
    "o": [
      "±10i.",
      "±100i.",
      "±10.",
      "não existem."
    ],
    "a": 0,
    "sol": "x²=−100.",
    "hyp": "Pode manter a restrição aos reais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:modelacao-equacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-049",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-UE-002",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "Qual é o conjugado de i⁵?",
    "o": [
      "i.",
      "−i.",
      "1.",
      "−1."
    ],
    "a": 1,
    "sol": "O ciclo de quatro potências dá i⁵=i⁴·i=i. O conjugado de i é −i.",
    "hyp": "Pode esquecer i²=−1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:potencia-i",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-002",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12CPLX-UE-032",
    "themeId": "12-cplx",
    "subtopicId": "12-cplx-unidade-equacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Unidade imaginária, conjunto C e equações de 2.º grau",
    "q": "A expressão i²+i⁶ vale...",
    "o": [
      "2.",
      "0.",
      "−2i.",
      "−2."
    ],
    "a": 3,
    "sol": "Ambas as potências têm resto 2 mod 4 e valem −1.",
    "hyp": "Pode somar expoentes em vez de valores.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-cplx-unidade-equacoes:12-cplx-unidade-equacoes:soma-potencias",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12CPLX-UE-032",
    "sourceFile": "content/vnext/math-a/12/12-cplx-unidade-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EQ-014",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve em ℝ a equação log₂(x−1)=log₂(7).",
    "o": [
      "x=7.",
      "x=8.",
      "x=6.",
      "x=14."
    ],
    "a": 1,
    "sol": "O primeiro logaritmo exige x>1. A função logarítmica de base 2 é injetiva, por isso x−1=7 e x=8, que pertence ao domínio.",
    "hyp": "Pode responder o argumento 7.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-equacoes:12-expl-equacoes:logs-iguais-14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-014",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EQ-002",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve 3^x=1/9.",
    "o": [
      "x=2.",
      "x=−2.",
      "x=−3.",
      "x=1/3."
    ],
    "a": 1,
    "sol": "Como 1/9=1/3²=3⁻² e a exponencial de base 3 é injetiva, a solução de 3^x=3⁻² é x=−2.",
    "hyp": "Pode ignorar o expoente negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-equacoes:12-expl-equacoes:exp-base-comum-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-002",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EQ-021",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve 2^x=5 usando logaritmos.",
    "o": [
      "x=ln(5)/ln(2).",
      "x=ln(2)/ln(5).",
      "x=5/2.",
      "x=ln(10)."
    ],
    "a": 0,
    "sol": "Aplicar ln aos dois membros dá x·ln(2)=ln(5). Como ln(2)≠0, divide-se por ln(2) e obtém-se x=ln(5)/ln(2).",
    "hyp": "Pode inverter a mudança de base.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-equacoes:12-expl-equacoes:exp-logaritmos-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-021",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EQ-015",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve em ℝ a equação log₂(x)+log₂(4)=5.",
    "o": [
      "x=4.",
      "x=16.",
      "x=8.",
      "x=32."
    ],
    "a": 2,
    "sol": "Como x>0 e log₂(4)=2, a equação reduz-se a log₂(x)=3. Assim, x=2³=8, que pertence ao domínio.",
    "hyp": "Pode converter a soma em log_2(x+4).",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-equacoes:12-expl-equacoes:soma-logs-15",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-015",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EQ-043",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Uma população é dada por P(t)=1000·(1,05)^t. Que valor de t satisfaz P(t)=2000?",
    "o": [
      "t=2/1,05.",
      "t=ln(2)·ln(1,05).",
      "t=ln(2)/ln(1,05).",
      "t=ln(1,05)/ln(2)."
    ],
    "a": 2,
    "sol": "Dividindo por 1000, obtém-se (1,05)^t=2. Aplicando ln, t·ln(1,05)=ln(2), logo t=ln(2)/ln(1,05).",
    "hyp": "Pode dividir os valores lineares em vez de aplicar logaritmos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-equacoes:12-expl-equacoes:modelacao-duplicacao-43",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-043",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EQ-003",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve log₂(2x)=5.",
    "o": [
      "x=8.",
      "x=32.",
      "x=16.",
      "x=10."
    ],
    "a": 2,
    "sol": "O argumento 2x tem de ser positivo. Pela definição de logaritmo, 2x=2⁵=32, logo x=16, que respeita a condição x>0.",
    "hyp": "Pode multiplicar 2×4.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-equacoes:12-expl-equacoes:log-def-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-003",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EQ-022",
    "themeId": "12-expl",
    "subtopicId": "12-expl-equacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Equações exponenciais/logarítmicas e problemas",
    "q": "Resolve 3^(2x)=7. Uma expressão para x é...",
    "o": [
      "ln(7)/ln(3).",
      "ln(7)/(2·ln(3)).",
      "2·ln(7)/ln(3).",
      "ln(3)/(2·ln(7))."
    ],
    "a": 1,
    "sol": "Aplicando ln, obtém-se 2x·ln(3)=ln(7). Como ln(3)≠0, segue-se x=ln(7)/(2·ln(3)).",
    "hyp": "Pode esquecer o fator 2 do expoente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-equacoes:12-expl-equacoes:exp-logaritmos-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EQ-022",
    "sourceFile": "content/vnext/math-a/12/12-expl-equacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EXP-006",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função exponencial",
    "q": "Para a>1, qual das afirmações é verdadeira para f(x)=a^x?",
    "o": [
      "decrescente.",
      "estritamente crescente.",
      "constante.",
      "crescente com incrementos iguais em intervalos de comprimento 1."
    ],
    "a": 1,
    "sol": "Como a>1, multiplicar f(x) por a faz aumentar o seu valor. Para x₂>x₁, o fator é a^(x₂−x₁)>1, logo f é estritamente crescente. Os incrementos em intervalos de comprimento 1 variam com x.",
    "hyp": "Pode associar expoente crescente a valores sempre decrescentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-exponencial:12-expl-exponencial:monotonia-a-maior1-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-006",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EXP-004",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Função exponencial",
    "q": "2^0 é...",
    "o": [
      "0.",
      "2.",
      "−1.",
      "1."
    ],
    "a": 3,
    "sol": "Para qualquer base não nula, a^0=1.",
    "hyp": "Pode pensar que expoente zero produz zero.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-exponencial:12-expl-exponencial:expoente-zero-4",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-004",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EXP-021",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função exponencial",
    "q": "A assíntota horizontal de y=3^x+4 é...",
    "o": [
      "y=4.",
      "x=4.",
      "y=0.",
      "x=0."
    ],
    "a": 0,
    "sol": "A assíntota y=0 desloca-se 4 unidades para cima.",
    "hyp": "Pode confundir assíntota horizontal com vertical.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-exponencial:12-expl-exponencial:assintota-trans-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-021",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EXP-008",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Função exponencial",
    "q": "O gráfico de y=a^x passa sempre pelo ponto...",
    "o": [
      "(0,0).",
      "(1,0).",
      "(1,1).",
      "(0,1)."
    ],
    "a": 3,
    "sol": "a^0=1, logo f(0)=1.",
    "hyp": "Pode confundir com uma função linear que passa na origem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-exponencial:12-expl-exponencial:ponto-01-8",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-008",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EXP-047",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Função exponencial",
    "q": "Uma quantidade multiplica por 1,05 a cada período. O fator 1,05 indica...",
    "o": [
      "decréscimo de 5%.",
      "aumento absoluto de 1,05 unidades.",
      "crescimento de 5% por período.",
      "duplicação a cada período."
    ],
    "a": 2,
    "sol": "1,05=1+0,05, portanto há acréscimo relativo de 5%.",
    "hyp": "Pode ler 1,05 como 105% de aumento em vez de 105% do valor anterior.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-exponencial:12-expl-exponencial:fator-crescimento-47",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-047",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EXP-002",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função exponencial",
    "q": "O domínio de f(x)=2^x é...",
    "o": [
      "]0,+∞[.",
      "R.",
      "[0,+∞[.",
      "R\\{0}."
    ],
    "a": 1,
    "sol": "2^x está definida para todo x real.",
    "hyp": "Pode confundir domínio com imagem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-exponencial:12-expl-exponencial:dominio-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-002",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-EXP-022",
    "themeId": "12-expl",
    "subtopicId": "12-expl-exponencial",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função exponencial",
    "q": "Qual é o conjunto de valores da função y=1−2^x, com x∈ℝ?",
    "o": [
      "]1,+∞[.",
      "]−∞,1[.",
      "]−∞,0[.",
      "R."
    ],
    "a": 1,
    "sol": "Quando x percorre ℝ, 2^x toma todos os valores positivos. Portanto, 1−2^x toma todos os valores inferiores a 1, o que dá ]−∞, 1[.",
    "hyp": "Pode não considerar a reflexão antes da translação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-exponencial:12-expl-exponencial:imagem-refletida-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-EXP-022",
    "sourceFile": "content/vnext/math-a/12/12-expl-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-IR-006",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Função inversa e raízes",
    "q": "Se f(x)=3x−6, então f^−1(x)=...",
    "o": [
      "3x+6.",
      "x/3+2.",
      "x/3−2.",
      "1/(3x−6)."
    ],
    "a": 1,
    "sol": "y=3x−6 =>x=(y+6)/3=y/3+2.",
    "hyp": "Pode não inverter a operação de subtração.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-inversa-raizes:12-expl-inversa-raizes:inversa-afim-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-006",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-IR-002",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função inversa e raízes",
    "q": "Os gráficos de f e f^−1 são simétricos relativamente à reta...",
    "o": [
      "y=0.",
      "y=x.",
      "x=0.",
      "y=−x."
    ],
    "a": 1,
    "sol": "A inversão troca coordenadas (x,y) por(y,x).",
    "hyp": "Pode escolher um eixo coordenado como simetria.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-inversa-raizes:12-expl-inversa-raizes:simetria-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-002",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-IR-023",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função inversa e raízes",
    "q": "x^(1/2)=5, com x≥0, implica...",
    "o": [
      "x=10.",
      "x=√5.",
      "x=25.",
      "x=5/2."
    ],
    "a": 2,
    "sol": "√x=5 =>x=25.",
    "hyp": "Pode dividir ou tirar outra raiz.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-inversa-raizes:12-expl-inversa-raizes:equacao-raiz-23",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-023",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-IR-008",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Função inversa e raízes",
    "q": "Sendo f(x)=x³, definida em R, qual é a expressão de f⁻¹(x)?",
    "o": [
      "x³.",
      "−∛x.",
      "1/x³.",
      "∛x."
    ],
    "a": 3,
    "sol": "A função cúbica é bijetiva em R. De y=x³ resulta x=∛y, logo f⁻¹(x)=∛x.",
    "hyp": "Pode confundir a função inversa com o inverso multiplicativo 1/x³.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-inversa-raizes:12-expl-inversa-raizes:cubica-8",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-008",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-IR-049",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Função inversa e raízes",
    "q": "Qual das expressões designa a função que a cada x associa o inverso multiplicativo de f(x), quando f(x)≠0?",
    "o": [
      "1/f.",
      "f⁻¹.",
      "−f.",
      "f²."
    ],
    "a": 0,
    "sol": "A função 1/f associa a x o número 1/f(x). Por sua vez, f⁻¹ designa a inversa da função f, quando existe.",
    "hyp": "Pode tratar o expoente −1 como recíproco em qualquer contexto funcional.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-inversa-raizes:12-expl-inversa-raizes:inversa-vs-reciproco-49",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-049",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-IR-003",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função inversa e raízes",
    "q": "Se f(a)=b e f é invertível, qual das igualdades é necessariamente verdadeira?",
    "o": [
      "f^−1(a)=b.",
      "f(b)=a.",
      "f^−1(b)=a.",
      "f^−1(a)=1/b."
    ],
    "a": 2,
    "sol": "A inversa desfaz a correspondência de f.",
    "hyp": "Pode esquecer trocar entrada e saída.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-inversa-raizes:12-expl-inversa-raizes:troca-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-003",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-IR-024",
    "themeId": "12-expl",
    "subtopicId": "12-expl-inversa-raizes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função inversa e raízes",
    "q": "x^(1/3)=−2, em R, implica...",
    "o": [
      "x=−6.",
      "não há solução real.",
      "x=8.",
      "x=−8."
    ],
    "a": 3,
    "sol": "A raiz cúbica admite valores negativos; (−2)^3=−8.",
    "hyp": "Pode aplicar a restrição da raiz quadrada à raiz cúbica.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-inversa-raizes:12-expl-inversa-raizes:raiz-impar-24",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-IR-024",
    "sourceFile": "content/vnext/math-a/12/12-expl-inversa-raizes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-LOG-009",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Função logarítmica e propriedades",
    "q": "Qual é o domínio de f(x)=log₂(x)?",
    "o": [
      "]0,+∞[.",
      "R.",
      "[0,+∞[.",
      "R\\{0}."
    ],
    "a": 0,
    "sol": "O argumento do logaritmo tem de ser positivo.",
    "hyp": "Pode incluir 0.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-logaritmica:12-expl-logaritmica:dominio-9",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-009",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-LOG-003",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Função logarítmica e propriedades",
    "q": "Quanto vale log₂(32)−log₂(4)?",
    "o": [
      "2.",
      "4.",
      "3.",
      "8."
    ],
    "a": 2,
    "sol": "A diferença de logaritmos da mesma base é o logaritmo do quociente: log₂(32/4)=log₂(8). Como 2³=8, a diferença vale 3.",
    "hyp": "Pode dividir 8 por 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-logaritmica:12-expl-logaritmica:valor-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-003",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-LOG-026",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função logarítmica e propriedades",
    "q": "Para x>0 e y>0, qual é a expressão equivalente a log₂(x)+log₂(y)?",
    "o": [
      "log₂(x+y).",
      "log₂(xy).",
      "log₂(x/y).",
      "(log₂(x))·y."
    ],
    "a": 1,
    "sol": "A soma de logaritmos da mesma base corresponde ao produto dos argumentos.",
    "hyp": "Pode somar os argumentos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-logaritmica:12-expl-logaritmica:condensar-produto-26",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-026",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-LOG-011",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Função logarítmica e propriedades",
    "q": "Para a>0 e a≠1, por que ponto passa sempre o gráfico de y=logₐ(x)?",
    "o": [
      "(0,1).",
      "(0,0).",
      "(1,0).",
      "(1,1)."
    ],
    "a": 2,
    "sol": "Como a⁰=1, tem-se logₐ(1)=0. Assim, o ponto (1, 0) pertence ao gráfico para qualquer base admissível.",
    "hyp": "Pode usar o ponto(0,1) da exponencial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-logaritmica:12-expl-logaritmica:ponto-10-11",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-011",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-LOG-037",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Função logarítmica e propriedades",
    "q": "Para a>0 e a≠1, relativamente a que reta o gráfico de y=logₐ(x) é o reflexo do gráfico de y=a^x?",
    "o": [
      "y=x.",
      "Ox.",
      "Oy.",
      "y=−x."
    ],
    "a": 0,
    "sol": "São funções inversas.",
    "hyp": "Pode escolher um eixo por analogia com conjugação/reflexões habituais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-logaritmica:12-expl-logaritmica:simetria-exp-37",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-037",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-LOG-002",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função logarítmica e propriedades",
    "q": "Em que condições está definido o logaritmo real logₐ(x)?",
    "o": [
      "a<0 e x>0.",
      "a>0, a≠1 e x>0.",
      "a>1 e x∈R.",
      "a≠0 e x≠0."
    ],
    "a": 1,
    "sol": "A base tem de ser positiva e diferente de 1; o argumento tem de ser positivo.",
    "hyp": "Pode permitir argumento negativo ou base 1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-logaritmica:12-expl-logaritmica:condicoes-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-002",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-LOG-021",
    "themeId": "12-expl",
    "subtopicId": "12-expl-logaritmica",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Função logarítmica e propriedades",
    "q": "Se a e n são bases de logaritmos admissíveis e x>0, qual é a fórmula correta para a mudança de base de a para n?",
    "o": [
      "logₐ(x)=logₙ(x)/logₙ(a).",
      "logₐ(x)=logₙ(a)/logₙ(x).",
      "logₐ(x)=logₙ(ax).",
      "logₐ(x)=a·logₙ(x)."
    ],
    "a": 0,
    "sol": "Se y=logₐ(x), então a^y=x. Aplicando logₙ, obtém-se y·logₙ(a)=logₙ(x). Dividir por logₙ(a), que é diferente de zero, dá a fórmula pretendida.",
    "hyp": "Pode inverter numerador e denominador.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-logaritmica:12-expl-logaritmica:mudanca-base-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-LOG-021",
    "sourceFile": "content/vnext/math-a/12/12-expl-logaritmica.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-MOD-006",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Uma população de 2000 cresce 10% ao ano. Um modelo é...",
    "o": [
      "P(t)=2000+0,1t.",
      "P(t)=2000·1,1^t.",
      "P(t)=2000·0,9^t.",
      "P(t)=1,1·2000t."
    ],
    "a": 1,
    "sol": "O valor inicial é 2000 e o fator anual é 1,10.",
    "hyp": "Pode modelar percentagem constante como crescimento linear.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-modelacao:12-expl-modelacao:modelo-crescimento-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-006",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-MOD-002",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Num modelo Q(t)=Q₀·a^t, com Q₀>0 e 0<a<1, que tipo de evolução tem Q?",
    "o": [
      "crescimento linear.",
      "decrescimento exponencial.",
      "crescimento exponencial.",
      "oscilação."
    ],
    "a": 1,
    "sol": "Como Q₀>0 e 0<a<1, multiplicar Q(t) pelo fator a a cada unidade de tempo diminui a quantidade. Trata-se de decrescimento exponencial.",
    "hyp": "Pode pensar que qualquer base positiva gera crescimento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-modelacao:12-expl-modelacao:decrescimento-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-002",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-MOD-021",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Uma população passa de 500 para 605 em 2 anos com taxa anual constante. O fator anual é...",
    "o": [
      "1,1.",
      "1,21.",
      "1,105.",
      "1,05."
    ],
    "a": 0,
    "sol": "605/500=1,21=1,1², logo fator anual 1,1.",
    "hyp": "Pode usar o crescimento total 21% como taxa anual.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-modelacao:12-expl-modelacao:inferir-fator-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-021",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-MOD-016",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Num modelo A(t)=1200·1,07^t, o número 1200 é...",
    "o": [
      "a taxa de 7%.",
      "o fator de crescimento.",
      "o valor após 1 período.",
      "o valor inicial A(0)."
    ],
    "a": 3,
    "sol": "A(0)=1200·1=1200.",
    "hyp": "Pode confundir coeficiente inicial com taxa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-modelacao:12-expl-modelacao:parametro-inicial-16",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-016",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-MOD-043",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Uma concentração é dada por C(t)=50·0,7^t. C(0) e a taxa de perda são, respetivamente...",
    "o": [
      "0 e 70%.",
      "50 e 70%.",
      "50 e 30%.",
      "50 e 7%."
    ],
    "a": 2,
    "sol": "Valor inicial 50; fator 0,7 significa perda 30%.",
    "hyp": "Pode interpretar 0,7 como perda 70%.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-modelacao:12-expl-modelacao:interpretar-parametros-43",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-043",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-MOD-003",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Num modelo Q(t)=Q0·1,03^t, a taxa de crescimento por período é...",
    "o": [
      "103%.",
      "1,03%.",
      "3%.",
      "30%."
    ],
    "a": 2,
    "sol": "1,03=1+0,03.",
    "hyp": "Pode interpretar o fator como a taxa em percentagem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-modelacao:12-expl-modelacao:taxa-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-003",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12EXPL-MOD-022",
    "themeId": "12-expl",
    "subtopicId": "12-expl-modelacao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Crescimento/decrescimento exponencial e modelação",
    "q": "Um investimento passa de 1000€ para 1210€ em 2 anos, com taxa anual constante. A taxa anual é...",
    "o": [
      "21%.",
      "10%.",
      "10,5%.",
      "20%."
    ],
    "a": 1,
    "sol": "1210/1000=1,21=1,1².",
    "hyp": "Pode dividir 21% por 2 e obter 10,5%, ignorando composição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-expl-modelacao:12-expl-modelacao:inferir-taxa-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12EXPL-MOD-022",
    "sourceFile": "content/vnext/math-a/12/12-expl-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-AP-006",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Uma função f é derivável em ℝ e f′(x)=2x−4. Qual é a abcissa do seu único ponto crítico?",
    "o": [
      "x=4.",
      "x=2.",
      "x=−2.",
      "x=0."
    ],
    "a": 1,
    "sol": "Como f é derivável em ℝ, os pontos críticos são zeros da derivada. Resolvendo 2x−4=0, obtém-se x=2.",
    "hyp": "Pode igualar apenas x a 4.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-aplicacoes:12-fcd-aplicacoes:critico-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-006",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-AP-002",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Se f'(x)<0 num intervalo, então f é...",
    "o": [
      "crescente.",
      "decrescente.",
      "constante.",
      "necessariamente negativa."
    ],
    "a": 1,
    "sol": "Derivada negativa implica decréscimo.",
    "hyp": "Pode confundir valor e variação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-aplicacoes:12-fcd-aplicacoes:monotonia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-002",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-AP-021",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Modelação",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Uma receita é R(q)=20q−q². Qual é a condição necessária para q ser um ponto interior de máximo de R?",
    "o": [
      "R'(q)=0.",
      "R(q)=0 apenas.",
      "R''(q)=0.",
      "q=20 obrigatoriamente."
    ],
    "a": 0,
    "sol": "Num ponto interior de máximo de uma função derivável, R′(q)=0. Aqui R′(q)=20−2q dá q=10, e R″(10)=−2 confirma o máximo local.",
    "hyp": "Pode procurar zeros da receita em vez do máximo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-aplicacoes:12-fcd-aplicacoes:otimizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-021",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-AP-007",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Se f é derivável em ℝ e f′(x)=2x−4, qual é o intervalo em que f′ é estritamente negativa?",
    "o": [
      "]2,+∞[.",
      "R.",
      "]−∞,2[.",
      "nenhum intervalo."
    ],
    "a": 2,
    "sol": "A condição 2x−4<0 equivale a x<2. Portanto, f decresce em ]−∞, 2[, onde a derivada é negativa.",
    "hyp": "Pode trocar os sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-aplicacoes:12-fcd-aplicacoes:sinal-derivada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-007",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-AP-037",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Se f é derivável em ℝ e f′(x)=(x−1)(x+2), em que intervalos abertos máximos é f′(x)>0, garantindo que f é estritamente crescente em cada um deles?",
    "o": [
      "]−∞, −2[ e ]1, +∞[.",
      "]−2,1[.",
      "R.",
      "]−∞,1[."
    ],
    "a": 0,
    "sol": "Para x<−2 os dois fatores são negativos. Para x>1 os dois fatores são positivos. Em cada um dos intervalos ]−∞, −2[ e ]1, +∞[, f′(x)>0 garante que f é estritamente crescente.",
    "hyp": "Pode construir mal a tabela de sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-aplicacoes:12-fcd-aplicacoes:sinal-produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-037",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-AP-003",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Um ponto crítico interior pode ocorrer quando...",
    "o": [
      "f(x)=0 apenas.",
      "f(x)=1.",
      "f'(x)=0 ou f' não existe.",
      "f''(x)=0 sempre."
    ],
    "a": 2,
    "sol": "Extremos interiores podem ocorrer em pontos onde a derivada é nula ou não existe.",
    "hyp": "Pode reduzir ponto crítico a raiz da função.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-aplicacoes:12-fcd-aplicacoes:critico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-003",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-AP-024",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-aplicacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Modelação",
    "focus": "Estudo de funções, modelação e otimização",
    "q": "Um custo é C(x)=x²−12x+50. O nível de produção de custo mínimo é...",
    "o": [
      "x=12.",
      "x=50.",
      "x=0.",
      "x=6."
    ],
    "a": 3,
    "sol": "Resolvendo C′(x)=2x−12=0, obtém-se x=6. Como C(x)=(x−6)²+14, qualquer outro nível de produção dá um custo maior.",
    "hyp": "Pode usar o coeficiente linear sem dividir por 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-aplicacoes:12-fcd-aplicacoes:custo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-AP-024",
    "sourceFile": "content/vnext/math-a/12/12-fcd-aplicacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-COMP-006",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Função composta e domínio",
    "q": "Com f(x)=x² e g(x)=x+1, (g∘f)(x)=",
    "o": [
      "(x+1)².",
      "x²+1.",
      "x²+x.",
      "2x+1."
    ],
    "a": 1,
    "sol": "g(f(x))=x²+1.",
    "hyp": "Pode repetir f∘g.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-composicao:12-fcd-composicao:ordem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-006",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-COMP-004",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=x+1 e g(x)=2x, então f∘g e g∘f...",
    "o": [
      "são sempre iguais.",
      "coincidem apenas em x=0.",
      "coincidem apenas em x=1.",
      "não são iguais."
    ],
    "a": 3,
    "sol": "Tem-se (f∘g)(x)=2x+1 e (g∘f)(x)=2x+2; portanto, as composições não são iguais.",
    "hyp": "Pode admitir que a composição é comutativa sem calcular as duas expressões.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-composicao:12-fcd-composicao:nao-comutativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-004",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-COMP-021",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=√x e g(x)=x²−4, o domínio de f∘g é...",
    "o": [
      "]−∞,−2]∪[2,+∞[.",
      "[−2,2].",
      "[2,+∞[.",
      "R."
    ],
    "a": 0,
    "sol": "É preciso x²−4≥0, ou seja |x|≥2.",
    "hyp": "Pode resolver x²≥4 como x≥2 apenas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-composicao:12-fcd-composicao:dominio-quadratico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-021",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-COMP-014",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Função composta e domínio",
    "q": "Se g transforma temperatura em °C para °F e f transforma °F em custo energético, então f∘g representa...",
    "o": [
      "temperatura em °C em função do custo.",
      "custo em função da temperatura em °C.",
      "soma das duas transformações.",
      "uma relação sem interpretação."
    ],
    "a": 1,
    "sol": "Primeiro converte-se a temperatura e depois calcula-se o custo.",
    "hyp": "Pode ignorar a ordem semântica.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-composicao:12-fcd-composicao:modelacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-014",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-COMP-037",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=ln x e g(x)=e^x, então (f∘g)(x)=",
    "o": [
      "x, para todo x real.",
      "x, apenas para x>0.",
      "ln x.",
      "e^x."
    ],
    "a": 0,
    "sol": "ln(e^x)=x e e^x>0 para todo x real.",
    "hyp": "Pode herdar indevidamente x>0 do ln aplicado diretamente a x.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-composicao:12-fcd-composicao:log-exp",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-037",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-COMP-002",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=2x+1 e g(x)=x², então (f∘g)(x)=",
    "o": [
      "(2x+1)².",
      "2x²+1.",
      "x²+2x+1.",
      "2x+1+x²."
    ],
    "a": 1,
    "sol": "f(g(x))=2x²+1.",
    "hyp": "Pode calcular g∘f em vez de f∘g.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-composicao:12-fcd-composicao:calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-002",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-COMP-022",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-composicao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Função composta e domínio",
    "q": "Se f(x)=1/(x−1) e g(x)=x², o domínio de f∘g é...",
    "o": [
      "R\\{1}.",
      "R\\{−1,1}.",
      "R\\{0}.",
      "]−1,1[."
    ],
    "a": 1,
    "sol": "f(g(x))=1/(x²−1), logo x²≠1.",
    "hyp": "Pode excluir apenas 1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-composicao:12-fcd-composicao:dominio-fatorizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-COMP-022",
    "sourceFile": "content/vnext/math-a/12/12-fcd-composicao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-EE-006",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Número e e derivada da exponencial",
    "q": "Para todo x real, e^x é...",
    "o": [
      "negativo.",
      "positivo.",
      "nulo em x=0.",
      "positivo apenas se x>0."
    ],
    "a": 1,
    "sol": "Uma exponencial de base positiva nunca é zero nem negativa.",
    "hyp": "Pode confundir sinal do expoente com sinal do valor.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-e-exponencial:12-fcd-e-exponencial:positividade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-006",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-EE-004",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Número e e derivada da exponencial",
    "q": "Se f(x)=e^x, então f'(0)=",
    "o": [
      "0.",
      "e.",
      "−1.",
      "1."
    ],
    "a": 3,
    "sol": "f'(0)=e^0=1.",
    "hyp": "Pode confundir valor do expoente com valor da função.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-e-exponencial:12-fcd-e-exponencial:derivada-ponto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-004",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-EE-021",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Número e e derivada da exponencial",
    "q": "A equação da tangente a y=e^x em x=0 é...",
    "o": [
      "y=x+1.",
      "y=x.",
      "y=e x.",
      "y=1."
    ],
    "a": 0,
    "sol": "Passa por (0,1) e tem declive 1.",
    "hyp": "Pode esquecer o ponto de tangência.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-e-exponencial:12-fcd-e-exponencial:tangente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-021",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-EE-008",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Número e e derivada da exponencial",
    "q": "Se f(x)=e^{2x}, então f'(x)=",
    "o": [
      "e^{2x}.",
      "2xe^{2x−1}.",
      "e^x.",
      "2e^{2x}."
    ],
    "a": 3,
    "sol": "Pela regra da cadeia, deriva-se 2x e multiplica-se.",
    "hyp": "Pode esquecer o fator 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-e-exponencial:12-fcd-e-exponencial:cadeia-linear",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-008",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-EE-037",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Número e e derivada da exponencial",
    "q": "Num modelo com população P(t)>0 e P′(t)=kP(t), com k>0, o que se pode afirmar?",
    "o": [
      "a taxa de crescimento é proporcional à população e positiva.",
      "a população é constante.",
      "a taxa é sempre decrescente.",
      "P(t) pode ser negativa."
    ],
    "a": 0,
    "sol": "A taxa instantânea de crescimento é P′(t). Pela equação P′(t)=kP(t), é proporcional a P(t) e é positiva, pois ambos os fatores são positivos.",
    "hyp": "Pode confundir crescimento relativo e absoluto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-e-exponencial:12-fcd-e-exponencial:modelo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-037",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-EE-002",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Número e e derivada da exponencial",
    "q": "A função exponencial natural é...",
    "o": [
      "x↦x^e.",
      "x↦e^x.",
      "x↦ln x.",
      "x↦e x."
    ],
    "a": 1,
    "sol": "A base é o número e.",
    "hyp": "Pode confundir potência e exponencial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-e-exponencial:12-fcd-e-exponencial:def-exp",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-002",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-EE-036",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-e-exponencial",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Modelação",
    "focus": "Número e e derivada da exponencial",
    "q": "Uma população P(t)=P0e^{kt}. A taxa instantânea P'(t) é...",
    "o": [
      "P0kt.",
      "P0e^t.",
      "P(t)/k.",
      "kP(t)."
    ],
    "a": 3,
    "sol": "P'=kP0e^{kt}=kP.",
    "hyp": "Pode derivar o expoente sem manter a exponencial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-e-exponencial:12-fcd-e-exponencial:crescimento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-EE-036",
    "sourceFile": "content/vnext/math-a/12/12-fcd-e-exponencial.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-LTP-006",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de x^{-2} é...",
    "o": [
      "2x^{-1}.",
      "−2x^{-3}.",
      "−x^{-2}.",
      "x^{-3}."
    ],
    "a": 1,
    "sol": "n=−2, logo nx^{n−1}=−2x^{-3}.",
    "hyp": "Pode errar o novo expoente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:potencia-negativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-006",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-LTP-002",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de sen(x) é...",
    "o": [
      "−sen(x).",
      "cos(x).",
      "−cos(x).",
      "tg(x)."
    ],
    "a": 1,
    "sol": "(sen(x))'=cos(x).",
    "hyp": "Pode trocar seno e cosseno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:sin-basico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-002",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-LTP-021",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de ln(sen(x)), onde sen(x)>0, é...",
    "o": [
      "cos(x)/sen(x).",
      "sen(x)/cos(x).",
      "1/sen(x).",
      "−sen(x)."
    ],
    "a": 0,
    "sol": "Pela regra da cadeia, a derivada de ln(u) é u′/u. Aqui u=sen(x) e u′=cos(x), pelo que a derivada é cos(x)/sen(x).",
    "hyp": "Pode esquecer a cadeia.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:ln-sin",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-021",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-LTP-007",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de √x=x^{1/2}, x>0, é...",
    "o": [
      "√x/2.",
      "2√x.",
      "1/(2√x).",
      "1/√x."
    ],
    "a": 2,
    "sol": "(1/2)x^{-1/2}=1/(2√x).",
    "hyp": "Pode esquecer o fator 1/2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-007",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-LTP-047",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "Se f'(x)=0 para todo x num intervalo, então f nesse intervalo é...",
    "o": [
      "estritamente crescente.",
      "estritamente decrescente.",
      "constante.",
      "necessariamente nula."
    ],
    "a": 2,
    "sol": "Derivada identicamente zero implica constância no intervalo.",
    "hyp": "Pode confundir constante com função zero.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:derivada-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-047",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-LTP-003",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de cos(x) é...",
    "o": [
      "sen(x).",
      "cos(x).",
      "−sen(x).",
      "−cos(x)."
    ],
    "a": 2,
    "sol": "(cos(x))'=−sen(x).",
    "hyp": "Pode esquecer o sinal negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:cos-basico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-003",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-LTP-022",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-log-trig-potencias",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Derivadas de logaritmos, trigonométricas e potências",
    "q": "A derivada de ln(cos(x)), onde cos(x)>0, é...",
    "o": [
      "cos(x)/sen(x).",
      "−sen(x)/cos(x).",
      "sen(x)/cos(x).",
      "−cos(x)."
    ],
    "a": 1,
    "sol": "Pela regra da cadeia, a derivada de ln(u) é u′/u. Aqui u=cos(x) e u′=−sen(x), pelo que a derivada é −sen(x)/cos(x).",
    "hyp": "Pode esquecer o sinal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-log-trig-potencias:12-fcd-log-trig-potencias:ln-cos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-LTP-022",
    "sourceFile": "content/vnext/math-a/12/12-fcd-log-trig-potencias.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-RC-007",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de x ln x, x>0, é...",
    "o": [
      "1/x.",
      "x/x.",
      "ln x+1.",
      "ln x."
    ],
    "a": 2,
    "sol": "Pela regra do produto, deriva-se x num termo e ln(x) no outro. O resultado é 1·ln(x)+x·(1/x)=ln(x)+1.",
    "hyp": "Pode esquecer um dos termos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-regras-cadeia:12-fcd-regras-cadeia:produto-log",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-007",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-RC-002",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de kf(x), com k constante, é...",
    "o": [
      "k' f(x).",
      "k f'(x).",
      "f'(x)/k.",
      "kf(x)."
    ],
    "a": 1,
    "sol": "A constante sai da derivação.",
    "hyp": "Pode derivar a constante como se fosse variável.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-regras-cadeia:12-fcd-regras-cadeia:constante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-002",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-RC-027",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de [ln x]^2, x>0, é...",
    "o": [
      "2/x.",
      "(ln x)/x².",
      "2ln x/x.",
      "2ln x."
    ],
    "a": 2,
    "sol": "Pela regra da cadeia, a derivada de [ln(x)]² é 2·ln(x) vezes a derivada de ln(x). Como esta vale 1/x, o resultado é 2·ln(x)/x.",
    "hyp": "Pode derivar o quadrado sem a função interna.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-regras-cadeia:12-fcd-regras-cadeia:cadeia-log-potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-027",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-RC-008",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "A derivada de x sen(x) é...",
    "o": [
      "cos(x).",
      "x cos(x).",
      "sen(x)−x cos(x).",
      "sen(x)+x cos(x)."
    ],
    "a": 3,
    "sol": "Pela regra do produto, a derivada de x·sen(x) é 1·sen(x)+x·cos(x)=sen(x)+x·cos(x).",
    "hyp": "Pode derivar apenas o seno.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-regras-cadeia:12-fcd-regras-cadeia:produto-trig",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-008",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-RC-046",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Interpretação",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "Antes de derivar uma expressão complexa, simplificá-la pode...",
    "o": [
      "alterar sempre a função.",
      "reduzir erros, desde que se preserve o domínio relevante.",
      "eliminar a necessidade de conhecer regras.",
      "permitir ignorar restrições de domínio."
    ],
    "a": 1,
    "sol": "Simplificações algébricas podem tornar a derivação mais clara, mas não devem apagar restrições herdadas.",
    "hyp": "Pode alargar o domínio indevidamente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-regras-cadeia:12-fcd-regras-cadeia:estrategia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-046",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-RC-004",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "Se f e g são deriváveis em x e g(x)≠0, qual é a regra para a derivada de f/g em x?",
    "o": [
      "(f/g)'=f'/g'.",
      "(f/g)'=(f'g+fg')/g².",
      "(f/g)'=(fg'−f'g)/g².",
      "(f/g)'=(f'g−fg')/g²."
    ],
    "a": 3,
    "sol": "O numerador é f′g−fg′, a diferença entre os produtos com a derivada de cada função. Divide-se por g², que é diferente de zero no ponto.",
    "hyp": "Pode trocar a ordem dos termos ou usar f'/g'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-regras-cadeia:12-fcd-regras-cadeia:quociente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-004",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCD-RC-021",
    "themeId": "12-fcd",
    "subtopicId": "12-fcd-regras-cadeia",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Operações entre derivadas e regra da cadeia",
    "q": "Para x>−1/3, qual é a derivada de f(x)=√(3x+1)?",
    "o": [
      "3/[2√(3x+1)].",
      "1/[2√(3x+1)].",
      "3√(3x+1).",
      "1/√(3x+1)."
    ],
    "a": 0,
    "sol": "Neste intervalo o radicando é positivo. A regra da cadeia dá f′(x)=3·(1/2)(3x+1)^(−1/2)=3/[2√(3x+1)].",
    "hyp": "Pode esquecer o fator 3.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcd-regras-cadeia:12-fcd-regras-cadeia:cadeia-raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCD-RC-021",
    "sourceFile": "content/vnext/math-a/12/12-fcd-regras-cadeia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-DER-006",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "A função f(x)=x² é derivável em todo R com...",
    "o": [
      "f'(x)=x.",
      "f'(x)=2x.",
      "f'(x)=2.",
      "f'(x)=x²."
    ],
    "a": 1,
    "sol": "É polinomial e a regra da potência dá 2x.",
    "hyp": "Pode esquecer o fator 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-derivabilidade:12-fcont-derivabilidade:polinomio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-006",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-DER-002",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "O recíproco 'contínua implica derivável' é...",
    "o": [
      "sempre verdadeiro.",
      "falso em geral.",
      "verdadeiro só para |x|.",
      "verdadeiro para qualquer função por ramos."
    ],
    "a": 1,
    "sol": "Por exemplo, |x| é contínua mas não derivável em 0.",
    "hyp": "Pode confundir implicação com equivalência.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-derivabilidade:12-fcont-derivabilidade:reciproco",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-002",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-DER-021",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "Considere f(x)=x² para x≤1 e f(x)=ax+b para x>1. Continuidade em 1 exige...",
    "o": [
      "a+b=1.",
      "a+b=2.",
      "2a+b=1.",
      "a=2."
    ],
    "a": 0,
    "sol": "O valor f(1) é 1 e o limite pela direita é a·1+b=a+b. O ramo esquerdo é contínuo até 1. Assim, a continuidade em 1 exige a+b=1.",
    "hyp": "Pode usar a condição de derivabilidade prematuramente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-derivabilidade:12-fcont-derivabilidade:ramos-cont",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-021",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-DER-008",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "O que se pode afirmar sobre a derivabilidade de f(x)=√x em x=0?",
    "o": [
      "tem quociente incremental igual a √h para h>0.",
      "tem derivada 0.",
      "tem derivada 1.",
      "não é derivável em 0 com derivada real finita."
    ],
    "a": 3,
    "sol": "Para h>0, o quociente incremental é (√h−0)/h=1/√h. Este tende para +∞ quando h tende para 0 pela direita. Assim, nem pela direita se obtém uma derivada real finita em 0.",
    "hyp": "Pode concluir derivabilidade a partir da continuidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-derivabilidade:12-fcont-derivabilidade:raiz-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-008",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-DER-042",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "A reta tangente ao gráfico de f(x)=√x no ponto de abcissa 4 tem equação y=2+(x−4)/4. Usando a reta tangente para aproximar √(4,1), que valor se obtém?",
    "o": [
      "2,05.",
      "2,025.",
      "2,1.",
      "2,0025."
    ],
    "a": 1,
    "sol": "L(4,1)=2+0,1/4=2,025.",
    "hyp": "Pode multiplicar o incremento por 4.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-derivabilidade:12-fcont-derivabilidade:aproximacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-042",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-DER-003",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "A função |x| é derivável em 0?",
    "o": [
      "Sim, com derivada 0.",
      "Sim, com derivada 1.",
      "Não.",
      "Sim, com derivada −1."
    ],
    "a": 2,
    "sol": "As derivadas laterais são −1 e 1.",
    "hyp": "Pode olhar apenas para continuidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-derivabilidade:12-fcont-derivabilidade:modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-003",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-DER-022",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-derivabilidade",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Derivabilidade e relação com continuidade",
    "q": "Considere f(x)=x² para x≤1 e f(x)=ax+b para x>1. Para além da continuidade em 1, a derivabilidade em 1 exige...",
    "o": [
      "a=1.",
      "a=2.",
      "b=2.",
      "a+b=2."
    ],
    "a": 1,
    "sol": "Assumindo a continuidade em 1, o ramo direito estende-se ao ponto com declive a. O ramo esquerdo tem derivada 2x, que em 1 vale 2. A derivabilidade exige a igualdade das derivadas laterais, logo a=2.",
    "hyp": "Pode igualar valores em vez de declives.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-derivabilidade:12-fcont-derivabilidade:ramos-der",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-DER-022",
    "sourceFile": "content/vnext/math-a/12/12-fcont-derivabilidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-EG-007",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Seja f contínua em x=2. Se f′ é negativa imediatamente à esquerda de 2 e positiva imediatamente à direita de 2, o que tem f em x=2?",
    "o": [
      "máximo local.",
      "assíntota.",
      "mínimo local.",
      "ponto de inflexão obrigatório."
    ],
    "a": 2,
    "sol": "A derivada negativa à esquerda e positiva à direita significa que f decresce até f(2) e cresce a partir desse valor, usando a continuidade em 2. Portanto, há um mínimo local em x=2.",
    "hyp": "Pode inverter os sinais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-estudo-global:12-fcont-estudo-global:minimo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-007",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-EG-002",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Para estudar concavidade/convexidade usa-se sobretudo o sinal de...",
    "o": [
      "f'.",
      "f''.",
      "f.",
      "1/f."
    ],
    "a": 1,
    "sol": "A segunda derivada indica a curvatura.",
    "hyp": "Pode confundir com monotonia.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-estudo-global:12-fcont-estudo-global:concavidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-002",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-EG-023",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Para f(x)=x³−3x, em x=−1 há...",
    "o": [
      "mínimo local.",
      "inflexão.",
      "máximo local.",
      "nenhum extremo."
    ],
    "a": 2,
    "sol": "Tem-se f′(x)=3x²−3 e f′(−1)=0. A segunda derivada é f″(x)=6x e f″(−1)=−6<0. Pelo teste da segunda derivada, há um máximo local em x=−1.",
    "hyp": "Pode trocar os extremos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-estudo-global:12-fcont-estudo-global:cubica-max",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-023",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-EG-008",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Se f' não muda de sinal ao atravessar um zero de f', então esse ponto...",
    "o": [
      "é sempre máximo.",
      "é sempre mínimo.",
      "é sempre ponto de inflexão.",
      "pode não ser extremo."
    ],
    "a": 3,
    "sol": "Para f(x)=x³, temos f′(0)=0 e f′(x)=3x²>0 para x≠0. Como f é crescente dos dois lados de 0, não tem extremo local em 0.",
    "hyp": "Pode assumir que todo ponto crítico é extremo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-estudo-global:12-fcont-estudo-global:critico-sem-extremo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-008",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-EG-048",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Num modelo de concentração C(t), a função é contínua em t₀ e estritamente monótona em cada um dos intervalos imediatamente antes e depois de t₀. O que representa um máximo local em t₀?",
    "o": [
      "um instante em que C=0.",
      "necessariamente o fim do processo.",
      "uma descontinuidade.",
      "um instante em que a concentração deixa de aumentar e começa a diminuir."
    ],
    "a": 3,
    "sol": "A concentração aumenta no intervalo anterior e diminui no intervalo seguinte. Com a continuidade, C(t₀) é superior às concentrações suficientemente próximas de ambos os lados.",
    "hyp": "Pode interpretar extremo sem contexto dinâmico.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-estudo-global:12-fcont-estudo-global:modelacao-extremo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-048",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-EG-003",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Que propriedade caracteriza um ponto de máximo absoluto de f?",
    "o": [
      "f'=0 obrigatoriamente.",
      "f=0.",
      "f atinge o maior dos seus valores.",
      "f''=0."
    ],
    "a": 2,
    "sol": "No máximo absoluto, o valor da função é pelo menos tão grande como todos os outros valores que toma no domínio considerado. Esse máximo pode ocorrer numa extremidade.",
    "hyp": "Pode reduzir máximos absolutos a pontos críticos interiores.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-estudo-global:12-fcont-estudo-global:maximo-absoluto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-003",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-EG-022",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-estudo-global",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Monotonia, extremos e estudo global de funções",
    "q": "Os pontos críticos de x³−3x são...",
    "o": [
      "x=0 e x=3.",
      "x=−1 e x=1.",
      "x=±√3.",
      "x=1 apenas."
    ],
    "a": 1,
    "sol": "3(x²−1)=0.",
    "hyp": "Pode resolver x²=1 com uma só raiz.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-estudo-global:12-fcont-estudo-global:cubica-criticos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-EG-022",
    "sourceFile": "content/vnext/math-a/12/12-fcont-estudo-global.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-LC-006",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Limite intuitivo e continuidade",
    "q": "Se o limite à esquerda de a é finito e o limite à direita de a é +∞, o que se conclui sobre f?",
    "o": [
      "o limite bilateral em a é +∞.",
      "o limite bilateral em a não existe.",
      "f é contínua.",
      "o limite bilateral em a é igual ao limite à esquerda."
    ],
    "a": 1,
    "sol": "Os limites laterais são diferentes, pois um é finito e o outro é +∞. Logo, o limite bilateral em a não existe.",
    "hyp": "Pode fazer média de valores laterais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-limites-continuidade:12-fcont-limites-continuidade:laterais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-006",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-LC-004",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Limite intuitivo e continuidade",
    "q": "Qual é o maior conjunto em que a função f(x)=x² é contínua?",
    "o": [
      "apenas x=0.",
      "apenas x>0.",
      "R\\{0}.",
      "todo R."
    ],
    "a": 3,
    "sol": "Polinómios são contínuos em todo R.",
    "hyp": "Pode imaginar uma restrição por haver potência.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-limites-continuidade:12-fcont-limites-continuidade:polinomio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-004",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-LC-021",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Limite intuitivo e continuidade",
    "q": "A função f(x)=|x| é contínua em 0?",
    "o": [
      "Sim.",
      "Não, porque não é derivável em 0.",
      "Só pela direita.",
      "Só pela esquerda."
    ],
    "a": 0,
    "sol": "lim_{x→0}|x|=0=f(0).",
    "hyp": "Pode confundir continuidade com derivabilidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-limites-continuidade:12-fcont-limites-continuidade:modulo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-021",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-LC-010",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Limite intuitivo e continuidade",
    "q": "Uma descontinuidade removível ocorre tipicamente quando...",
    "o": [
      "os limites laterais são diferentes.",
      "o limite existe mas o valor no ponto falta ou é diferente.",
      "a função tende a infinito.",
      "não existe domínio perto do ponto."
    ],
    "a": 1,
    "sol": "Se o limite é finito, a descontinuidade pode ser eliminada redefinindo o valor da função no ponto.",
    "hyp": "Pode confundir com salto.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-limites-continuidade:12-fcont-limites-continuidade:removivel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-010",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-LC-048",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Limite intuitivo e continuidade",
    "q": "Uma temperatura T(t) é contínua entre as 10h e as 11h, com T(10)=18°C e T(11)=22°C. Podemos afirmar que...",
    "o": [
      "a temperatura cresceu sempre.",
      "às 10h30 era exatamente 20°C.",
      "a derivada foi sempre 4.",
      "em algum instante a temperatura foi 20°C."
    ],
    "a": 3,
    "sol": "O TVI garante que 20°C foi atingido, mas não quando nem monotonia.",
    "hyp": "Pode assumir variação linear.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-limites-continuidade:12-fcont-limites-continuidade:modelacao-tvi",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-048",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-LC-002",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Limite intuitivo e continuidade",
    "q": "Para f ser contínua em a é necessário que...",
    "o": [
      "f'(a)=0.",
      "f(a) esteja definida.",
      "f(a)>0.",
      "a seja extremo local."
    ],
    "a": 1,
    "sol": "Sem valor no ponto, não há continuidade nesse ponto.",
    "hyp": "Pode pensar que basta existir limite.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-limites-continuidade:12-fcont-limites-continuidade:definicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-002",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-LC-022",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-limites-continuidade",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Limite intuitivo e continuidade",
    "q": "A função f(x)=1/(x−2) é contínua em x=2?",
    "o": [
      "Sim.",
      "Não, nem está definida em 2.",
      "Sim, porque há assíntota.",
      "Só se definirmos f(2)=0."
    ],
    "a": 1,
    "sol": "O denominador anula-se em 2.",
    "hyp": "Pode pensar que uma assíntota é continuidade 'infinita'.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-limites-continuidade:12-fcont-limites-continuidade:assintota",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-LC-022",
    "sourceFile": "content/vnext/math-a/12/12-fcont-limites-continuidade.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-OP-006",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Operações com funções contínuas",
    "q": "Qual é o maior conjunto em que f(x)=e^x cos(x) é contínua?",
    "o": [
      "x>0 apenas.",
      "todo R.",
      "R\\{0}.",
      "apenas onde cosx≠0."
    ],
    "a": 1,
    "sol": "Exponencial e cosseno são contínuos em R; zeros do produto não são problema.",
    "hyp": "Pode tratar zeros de um fator como denominadores.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-operacoes:12-fcont-operacoes:produto-exemplo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-006",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-OP-002",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações com funções contínuas",
    "q": "O produto de duas funções contínuas num ponto é...",
    "o": [
      "sempre zero.",
      "contínuo nesse ponto.",
      "descontínuo.",
      "contínuo só se um fator for constante."
    ],
    "a": 1,
    "sol": "A continuidade é preservada pelo produto.",
    "hyp": "Pode transferir restrições que não existem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-operacoes:12-fcont-operacoes:produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-002",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-OP-025",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Operações com funções contínuas",
    "q": "Qual é o maior conjunto em que a função f(x)=ln(x²+1) é contínua?",
    "o": [
      "todo R.",
      "x>0 apenas.",
      "R\\{0}.",
      "|x|>1."
    ],
    "a": 0,
    "sol": "O polinómio x²+1 é contínuo em ℝ e é sempre positivo. Como ln é contínua nos reais positivos, a função composta é contínua em todo ℝ.",
    "hyp": "Pode impor domínio x>0 ao x em vez do argumento.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-operacoes:12-fcont-operacoes:log-composicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-025",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-OP-018",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Operações com funções contínuas",
    "q": "Se lim g=0, podemos concluir automaticamente lim(f/g)?",
    "o": [
      "Sim, é 0.",
      "Não; é preciso analisar o comportamento.",
      "Sim, é lim f.",
      "Sim, é infinito sempre."
    ],
    "a": 1,
    "sol": "Denominador a tender a 0 pode originar vários comportamentos.",
    "hyp": "Pode aplicar a regra do quociente fora das hipóteses.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-operacoes:12-fcont-operacoes:quociente-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-018",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-OP-049",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Operações com funções contínuas",
    "q": "Se uma grandeza Q(t)=√(1+P(t)) e P é contínua com P(t)≥−1, então Q...",
    "o": [
      "é contínua.",
      "é sempre derivável.",
      "é descontínua quando P=0.",
      "é constante."
    ],
    "a": 0,
    "sol": "É composição de funções contínuas no domínio da raiz.",
    "hyp": "Pode confundir fronteira do domínio com descontinuidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-operacoes:12-fcont-operacoes:modelacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-049",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-OP-003",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Operações com funções contínuas",
    "q": "O quociente f/g de funções contínuas é contínuo onde...",
    "o": [
      "f não se anula.",
      "f=g.",
      "g não se anula.",
      "g>1."
    ],
    "a": 2,
    "sol": "A única nova restrição é o denominador não ser zero.",
    "hyp": "Pode excluir zeros do numerador.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-operacoes:12-fcont-operacoes:quociente",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-003",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12FCONT-OP-021",
    "themeId": "12-fcont",
    "subtopicId": "12-fcont-operacoes",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Operações com funções contínuas",
    "q": "Se lim(x→a) f(x)=L, com L∈ℝ, como se exprime lim(x→a) e^(f(x)) em função de L?",
    "o": [
      "e^L.",
      "L e.",
      "e^{lim x}.",
      "L."
    ],
    "a": 0,
    "sol": "A exponencial é contínua em R.",
    "hyp": "Pode multiplicar e por L.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-fcont-operacoes:12-fcont-operacoes:exp-limite",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12FCONT-OP-021",
    "sourceFile": "content/vnext/math-a/12/12-fcont-operacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-DA-006",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Se σ=12 e n=36, o erro padrão de X̄ é...",
    "o": [
      "12/36.",
      "2.",
      "6.",
      "72."
    ],
    "a": 1,
    "sol": "12/√36=12/6=2.",
    "hyp": "Pode dividir por n.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:ep-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-006",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-DA-002",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "A média da distribuição de amostragem de X̄, sob amostragem adequada, é...",
    "o": [
      "σ.",
      "μ.",
      "n.",
      "0 sempre."
    ],
    "a": 1,
    "sol": "E(X̄)=μ.",
    "hyp": "Pode confundir média populacional com desvio padrão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:media-xbar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-002",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-DA-021",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Se X tem média 50 e desvio padrão 10, então uma média de 25 observações tem média...",
    "o": [
      "50.",
      "10.",
      "2.",
      "250."
    ],
    "a": 0,
    "sol": "E(X̄)=μ=50.",
    "hyp": "Pode dividir a média por n.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:xbar-media",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-021",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-DA-015",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Duas amostras aleatórias do mesmo tamanho podem dar médias diferentes porque...",
    "o": [
      "a média populacional muda entre amostras.",
      "uma delas tem de estar errada.",
      "há variabilidade amostral.",
      "a estatística é constante."
    ],
    "a": 2,
    "sol": "A seleção aleatória produz flutuação natural.",
    "hyp": "Pode tratar diferença como erro necessariamente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:variabilidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-015",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-DA-046",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Os tempos de espera são observações independentes de uma população com desvio padrão σ>0. Comparando n=400 com n=100, como muda o erro padrão da média?",
    "o": [
      "um quarto.",
      "metade.",
      "quádruplo.",
      "igual."
    ],
    "a": 1,
    "sol": "O erro padrão é σ/√n. Para n=100 é σ/10 e para n=400 é σ/20, pelo que fica reduzido a metade.",
    "hyp": "Pode usar a razão de tamanhos em vez das raízes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:modelacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-046",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-DA-003",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "O desvio padrão de X̄ é chamado...",
    "o": [
      "média populacional.",
      "viés.",
      "erro padrão da média.",
      "amplitude."
    ],
    "a": 2,
    "sol": "Mede a variabilidade de médias amostrais entre amostras.",
    "hyp": "Pode confundir erro padrão e desvio padrão dos dados.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:erro-padrao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-003",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-DA-022",
    "themeId": "12-ie",
    "subtopicId": "12-ie-distribuicoes-amostragem",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Distribuições de amostragem / comportamento amostral",
    "q": "Uma população tem média 50 e desvio padrão 10. Qual é o desvio padrão da média de 25 observações independentes retiradas dessa população?",
    "o": [
      "10.",
      "2.",
      "0,4.",
      "50."
    ],
    "a": 1,
    "sol": "10/√25=2.",
    "hyp": "Pode dividir por 25.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-distribuicoes-amostragem:12-ie-distribuicoes-amostragem:xbar-ep",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-DA-022",
    "sourceFile": "content/vnext/math-a/12/12-ie-distribuicoes-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-EST-006",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Estimação de parâmetros",
    "q": "Numa amostra de 100 pessoas, 64 respondem 'sim'. A estimativa pontual de p é...",
    "o": [
      "64.",
      "0,64.",
      "0,36.",
      "1,64."
    ],
    "a": 1,
    "sol": "p̂=64/100=0,64.",
    "hyp": "Pode usar a contagem sem dividir por n.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-estimacao:12-ie-estimacao:proporcao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-006",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-EST-004",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Estimação de parâmetros",
    "q": "A média amostral X̄ é um estimador natural de...",
    "o": [
      "σ apenas.",
      "n.",
      "p̂.",
      "μ."
    ],
    "a": 3,
    "sol": "A média da amostra estima a média populacional.",
    "hyp": "Pode confundir parâmetro e estatística.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-estimacao:12-ie-estimacao:media",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-004",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-EST-022",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Estimação de parâmetros",
    "q": "Para comparar dois estimadores usa-se o erro total, dado pela soma da variância com o quadrado do viés. Quando pode ser vantajoso aceitar que aumente ligeiramente o viés em módulo?",
    "o": [
      "Quando a variância aumenta na mesma proporção.",
      "Quando a variância diminui mais do que aumenta o quadrado do viés.",
      "Quando a variância permanece igual.",
      "Quando o aumento do quadrado do viés é igual à redução da variância."
    ],
    "a": 1,
    "sol": "A soma diminui se a redução da variância for maior do que o aumento do quadrado do viés. Nesse caso, o erro total é menor.",
    "hyp": "Pode tratar não enviesamento como único critério.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-estimacao:12-ie-estimacao:bias-variance",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-022",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-EST-019",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Estimação de parâmetros",
    "q": "Se p̂=0,4 e n=100, o erro padrão estimado √(0,4·0,6/100) é aproximadamente...",
    "o": [
      "0,24.",
      "0,0049.",
      "0,049.",
      "0,4."
    ],
    "a": 2,
    "sol": "√0,0024≈0,049.",
    "hyp": "Pode confundir variância e desvio padrão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-estimacao:12-ie-estimacao:ep-proporcao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-019",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-EST-046",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Estimação de parâmetros",
    "q": "Uma fábrica estima a taxa de defeitos por p̂. Se a seleção inspeciona apenas peças de um turno...",
    "o": [
      "a fórmula de p̂ corrige automaticamente o viés.",
      "a estimativa pode não representar toda a produção.",
      "o erro padrão torna o desenho irrelevante.",
      "p̂ é sempre não enviesada para toda a fábrica."
    ],
    "a": 1,
    "sol": "O estimador pode ser adequado ao turno mas o alvo populacional é mais amplo.",
    "hyp": "Pode ignorar validade externa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-estimacao:12-ie-estimacao:fabrica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-046",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-EST-002",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Estimação de parâmetros",
    "q": "Um estimador é...",
    "o": [
      "o valor verdadeiro do parâmetro.",
      "uma regra/estatística usada para estimar um parâmetro.",
      "sempre a média populacional.",
      "uma amostra inteira."
    ],
    "a": 1,
    "sol": "O estimador é aleatório antes da amostra ser observada.",
    "hyp": "Pode confundir estimador e estimativa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-estimacao:12-ie-estimacao:estimador",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-002",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-EST-021",
    "themeId": "12-ie",
    "subtopicId": "12-ie-estimacao",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Estimação de parâmetros",
    "q": "O erro quadrático médio de um estimador T de θ é E[(T−θ)²]. Define-se o viés b=E(T)−θ, de modo que T−θ=(T−E(T))+b. Ao desenvolver o quadrado e calcular a esperança, que duas parcelas restam?",
    "o": [
      "variância e viés ao quadrado.",
      "apenas média e mediana.",
      "erro padrão e n por soma.",
      "apenas viés."
    ],
    "a": 0,
    "sol": "Ao desenvolver o quadrado, a esperança do termo cruzado é 2b E[T−E(T)]=0. A esperança de [T−E(T)]² é a variância de T. Restam a variância e o quadrado do viés b².",
    "hyp": "Pode pensar que avalia só dispersão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-estimacao:12-ie-estimacao:mse",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-EST-021",
    "sourceFile": "content/vnext/math-a/12/12-ie-estimacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IA-007",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "A média verdadeira de todos os alunos da escola é...",
    "o": [
      "uma estatística amostral.",
      "uma amostra.",
      "um parâmetro populacional.",
      "um erro de medição."
    ],
    "a": 2,
    "sol": "Refere-se a toda a população de interesse.",
    "hyp": "Pode trocar parâmetro e estatística.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:media-populacional",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-007",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IA-002",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Uma população estatística é...",
    "o": [
      "apenas os indivíduos observados.",
      "o conjunto total de unidades sobre as quais queremos concluir.",
      "sempre um conjunto de pessoas.",
      "o valor médio de uma variável."
    ],
    "a": 1,
    "sol": "A população é o universo de interesse, podendo ser pessoas, objetos, transações, etc.",
    "hyp": "Pode limitar 'população' a pessoas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:populacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-002",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IA-023",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Uma empresa quer estimar satisfação e tem 70% clientes particulares e 30% empresariais. Numa amostra proporcional de 200, quantos empresariais?",
    "o": [
      "140.",
      "30.",
      "60.",
      "70."
    ],
    "a": 2,
    "sol": "0,30×200=60.",
    "hyp": "Pode usar a percentagem como contagem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:estratificada-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-023",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IA-008",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Amostragem aleatória simples procura dar...",
    "o": [
      "vantagem aos indivíduos mais acessíveis.",
      "garantia de média exata.",
      "mais peso aos extremos.",
      "a mesma probabilidade a todas as amostras possíveis de tamanho fixado."
    ],
    "a": 3,
    "sol": "Na amostragem aleatória simples, todas as amostras possíveis de tamanho n são equiprováveis. A definição refere-se à seleção da amostra inteira.",
    "hyp": "Pode confundir aleatoriedade com precisão perfeita.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:aleatoria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-008",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IA-048",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Uma sondagem eleitoral online aberta a qualquer visitante é sobretudo vulnerável a...",
    "o": [
      "erro amostral puro apenas.",
      "ausência total de dados.",
      "amostragem estratificada automática.",
      "autoseleção e múltiplas diferenças entre visitantes e população alvo."
    ],
    "a": 3,
    "sol": "Não há seleção probabilística controlada da população alvo.",
    "hyp": "Pode confundir volume de respostas com qualidade do desenho.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:sondagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-048",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IA-005",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Uma estatística amostral é...",
    "o": [
      "uma quantidade calculada a partir dos dados da amostra.",
      "um parâmetro populacional conhecido.",
      "sempre uma probabilidade.",
      "a população inteira."
    ],
    "a": 0,
    "sol": "Exemplos: média amostral ou proporção amostral.",
    "hyp": "Pode confundir com parâmetro.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:estatistica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-005",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IA-021",
    "themeId": "12-ie",
    "subtopicId": "12-ie-inferencia-amostragem",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Raciocínio inferencial e amostragem",
    "q": "Estratos devem idealmente ser...",
    "o": [
      "internamente relativamente homogéneos quanto à característica relevante e cobrir subgrupos importantes.",
      "sempre do mesmo tamanho.",
      "escolhidos ao acaso sem critério.",
      "idênticos à amostra final."
    ],
    "a": 0,
    "sol": "A estratificação usa informação auxiliar para melhorar representação/precisão.",
    "hyp": "Pode focar apenas tamanho igual.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-inferencia-amostragem:12-ie-inferencia-amostragem:estratos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IA-021",
    "sourceFile": "content/vnext/math-a/12/12-ie-inferencia-amostragem.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IC-006",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Um intervalo de 95% não significa que...",
    "o": [
      "o procedimento cobre o parâmetro em cerca de 95% de repetições sob as condições.",
      "há 95% de probabilidade de o parâmetro fixo estar neste intervalo específico, na interpretação frequentista clássica.",
      "o intervalo depende da amostra.",
      "existe incerteza amostral."
    ],
    "a": 1,
    "sol": "Depois de calculado, o intervalo específico cobre ou não cobre o parâmetro; 95% refere-se ao procedimento repetido.",
    "hyp": "Pode interpretar diretamente como probabilidade posterior.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-intervalos-confianca:12-ie-intervalos-confianca:interpretacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-006",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IC-002",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Um intervalo de confiança típico tem forma...",
    "o": [
      "parâmetro ± n.",
      "estimativa ± margem de erro.",
      "média ± população.",
      "erro padrão ± estimativa."
    ],
    "a": 1,
    "sol": "O centro é a estimativa e a largura depende da incerteza.",
    "hyp": "Pode trocar centro e margem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-intervalos-confianca:12-ie-intervalos-confianca:forma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-002",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IC-021",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Mantendo z* e σ, para reduzir a margem para metade precisamos...",
    "o": [
      "quadruplicar n.",
      "duplicar n.",
      "reduzir n para metade.",
      "multiplicar n por 8."
    ],
    "a": 0,
    "sol": "Margem∝1/√n.",
    "hyp": "Pode usar relação linear.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-intervalos-confianca:12-ie-intervalos-confianca:planeamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-021",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IC-008",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Se estimativa=50 e margem=3, o intervalo é...",
    "o": [
      "[50,53].",
      "[3,50].",
      "[53,56].",
      "[47,53]."
    ],
    "a": 3,
    "sol": "50±3.",
    "hyp": "Pode aplicar margem só para cima.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-intervalos-confianca:12-ie-intervalos-confianca:calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-008",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IC-045",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Uma sondagem dá p̂=0,52 e um intervalo de confiança de 95% [0,49;0,55]. O que se pode concluir sobre a hipótese de a proporção populacional ser 0,50?",
    "o": [
      "0,50 é compatível com os dados ao nível de confiança usado.",
      "0,50 é excluído porque é menor do que a estimativa.",
      "0,50 é confirmado como o valor exato pelo intervalo.",
      "0,50 é excluído porque não é o centro do intervalo."
    ],
    "a": 0,
    "sol": "0,50 está dentro do intervalo.",
    "hyp": "Pode sobreinterpretar a estimativa pontual.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-intervalos-confianca:12-ie-intervalos-confianca:sondagem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-045",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IC-003",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "A margem de erro é geralmente...",
    "o": [
      "estimativa × n.",
      "erro padrão/n.",
      "quantil crítico × erro padrão.",
      "parâmetro − estimativa."
    ],
    "a": 2,
    "sol": "Combina nível de confiança e variabilidade amostral.",
    "hyp": "Pode confundir erro realizado e margem planejada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-intervalos-confianca:12-ie-intervalos-confianca:margem",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-003",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-IC-023",
    "themeId": "12-ie",
    "subtopicId": "12-ie-intervalos-confianca",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Intervalos de confiança, margem de erro e interpretação",
    "q": "Passar de 95% para 99% de confiança, com mesmos dados, faz a margem...",
    "o": [
      "diminuir.",
      "ficar igual.",
      "aumentar.",
      "mudar de sinal."
    ],
    "a": 2,
    "sol": "O quantil crítico 99% é maior.",
    "hyp": "Pode pensar que maior confiança é mais precisão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-intervalos-confianca:12-ie-intervalos-confianca:nivel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-IC-023",
    "sourceFile": "content/vnext/math-a/12/12-ie-intervalos-confianca.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-TLC-006",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "Se a população já é Normal, a média amostral é Normal...",
    "o": [
      "apenas para n≥30.",
      "para qualquer n, sob amostragem independente usual.",
      "apenas para n≥100.",
      "nunca exatamente."
    ],
    "a": 1,
    "sol": "Combinações lineares de Normais são Normais.",
    "hyp": "Pode aplicar a regra prática n≥30 como necessidade universal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-tlc:12-ie-tlc:normal-exata",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-006",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-TLC-002",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "O TLC diz que, para n suficientemente grande e condições adequadas, X̄ é aproximadamente...",
    "o": [
      "Uniforme.",
      "Normal.",
      "Exponencial.",
      "Binomial sempre."
    ],
    "a": 1,
    "sol": "A distribuição de amostragem da média aproxima-se da Normal.",
    "hyp": "Pode confundir distribuição populacional e amostral.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-tlc:12-ie-tlc:forma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-002",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-TLC-021",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "A média amostral X̄ segue aproximadamente uma normal de média 100 e variância 2². Qual é o valor padronizado z para X̄=104?",
    "o": [
      "2.",
      "1.",
      "4.",
      "0,5."
    ],
    "a": 0,
    "sol": "z=(104−100)/2=2.",
    "hyp": "Pode dividir pela variância 4.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-tlc:12-ie-tlc:padronizar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-021",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-TLC-014",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "Para amostras de observações independentes da mesma população de desvio padrão σ>0, como muda o erro padrão da média quando n passa de 25 para 100?",
    "o": [
      "fica um quarto.",
      "fica metade.",
      "duplica.",
      "não muda."
    ],
    "a": 1,
    "sol": "√100/√25=2.",
    "hyp": "Pode usar a razão n diretamente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-tlc:12-ie-tlc:escala",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-014",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-TLC-040",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Exemplo",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "Para aproximar uma variável binomial X por uma normal, representa-se cada inteiro k pelo intervalo de amplitude 1 centrado em k. Que limite superior se usa na aproximação de P(X≤20)?",
    "o": [
      "20.",
      "19,5 sempre.",
      "21,5.",
      "20,5."
    ],
    "a": 3,
    "sol": "O intervalo centrado em 20 vai de 19,5 a 20,5. Como X=20 pertence ao acontecimento X≤20, a aproximação inclui esse intervalo até 20,5.",
    "hyp": "Pode deslocar no sentido errado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-tlc:12-ie-tlc:correcao-continuidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-040",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-TLC-003",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "Uma amostra tem dois grupos de igual dimensão. As médias dos grupos têm esperanças μ−1 e μ+1. Qual é a esperança da média de toda a amostra?",
    "o": [
      "μ/n.",
      "nμ.",
      "μ.",
      "σ."
    ],
    "a": 2,
    "sol": "Como os grupos têm a mesma dimensão, a média global é a média das duas médias de grupo. Pela linearidade da esperança, o resultado exato é [(μ−1)+(μ+1)]/2=μ.",
    "hyp": "Pode dividir a média por n.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-tlc:12-ie-tlc:centro",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-003",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12IE-TLC-028",
    "themeId": "12-ie",
    "subtopicId": "12-ie-tlc",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Modelação",
    "focus": "Teorema Limite Central em contexto introdutório",
    "q": "As massas de 64 peças são observações independentes da mesma população, com média 10 g e desvio padrão 0,8 g. Qual é o erro padrão da média das massas?",
    "o": [
      "0,8g.",
      "0,0125g.",
      "6,4g.",
      "0,1g."
    ],
    "a": 3,
    "sol": "0,8/8=0,1.",
    "hyp": "Pode dividir por 64.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-ie-tlc:12-ie-tlc:lotes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12IE-TLC-028",
    "sourceFile": "content/vnext/math-a/12/12-ie-tlc.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-AR-006",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Áreas e aplicações",
    "q": "A área sob y=x² entre x=0 e x=1 é...",
    "o": [
      "1/2.",
      "1/3.",
      "1.",
      "2/3."
    ],
    "a": 1,
    "sol": "∫_0^1 x²dx=[x³/3]_0^1=1/3.",
    "hyp": "Pode usar fórmula de triângulo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-areas:12-int-areas:parabola",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-006",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-AR-002",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Áreas e aplicações",
    "q": "Se f é contínua, não positiva e não identicamente nula em [a,b], com a<b, como se escreve a área da região entre o gráfico de f e o eixo Ox nesse intervalo?",
    "o": [
      "∫_a^b f(x)dx.",
      "−∫_a^b f(x)dx.",
      "0.",
      "f(b)−f(a)."
    ],
    "a": 1,
    "sol": "Como f(x)≤0, a altura da região é |f(x)|=−f(x). Assim, a área é ∫_a^b |f(x)| dx=−∫_a^b f(x) dx.",
    "hyp": "Pode usar diretamente a integral negativa como área.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-areas:12-int-areas:area-negativa",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-002",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-AR-021",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Áreas e aplicações",
    "q": "Os gráficos y=2x e y=x² delimitam uma região entre...",
    "o": [
      "x=0 e x=2.",
      "x=−2 e x=2.",
      "x=0 e x=1.",
      "x=1 e x=2."
    ],
    "a": 0,
    "sol": "Os pontos de interseção verificam x²=2x, ou seja, x(x−2)=0. Logo, as abcissas dos extremos da região são 0 e 2.",
    "hyp": "Pode dividir por x e perder 0.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-areas:12-int-areas:intersecoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-021",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-AR-009",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Áreas e aplicações",
    "q": "A integral ∫_{−1}^1 x dx vale 0, mas a área geométrica entre y=x e Ox nesse intervalo é...",
    "o": [
      "1.",
      "0.",
      "2.",
      "1/2."
    ],
    "a": 0,
    "sol": "Há dois triângulos de área 1/2 cada, sem cancelamento geométrico.",
    "hyp": "Pode confundir integral algébrica com área total.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-areas:12-int-areas:cancelamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-009",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-AR-043",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Áreas e aplicações",
    "q": "Uma velocidade v(t) é positiva entre 0 e 4 e negativa entre 4 e 6. A distância total percorrida é...",
    "o": [
      "∫_0^6v(t)dt.",
      "|∫_0^6v(t)dt| sempre.",
      "∫_0^4v(t)dt−∫_4^6v(t)dt.",
      "v(6)−v(0)."
    ],
    "a": 2,
    "sol": "Na parte negativa, a distância usa o oposto da integral.",
    "hyp": "Pode confundir deslocamento com distância.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-areas:12-int-areas:distancia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-043",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-AR-003",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Áreas e aplicações",
    "q": "Se f muda de sinal em [a,b], para calcular área geométrica total devemos...",
    "o": [
      "usar sempre ∫_a^b f sem separar.",
      "somar apenas valores de f nos extremos.",
      "separar nos zeros e somar áreas positivas.",
      "derivar f."
    ],
    "a": 2,
    "sol": "As contribuições abaixo do eixo devem entrar em valor absoluto.",
    "hyp": "Pode deixar cancelamentos na área total.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-areas:12-int-areas:mudanca-sinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-003",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-AR-022",
    "themeId": "12-int",
    "subtopicId": "12-int-areas",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Áreas e aplicações",
    "q": "Entre os dois pontos de interseção, com 0<x<2, qual das funções y=2x e y=x² tem o gráfico acima do outro?",
    "o": [
      "x².",
      "2x.",
      "são iguais sempre.",
      "depende apenas do sinal de x."
    ],
    "a": 1,
    "sol": "Para 0<x<2 os dois fatores de 2x−x²=x(2−x) são estritamente positivos. Logo, 2x>x² entre os pontos de interseção.",
    "hyp": "Pode escolher a quadrática por crescer mais depressa fora do intervalo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-areas:12-int-areas:superior",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-AR-022",
    "sourceFile": "content/vnext/math-a/12/12-int-areas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-ID-010",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Integral definido",
    "q": "Se ∫_0^2 f=3 e ∫_2^5 f=7, então ∫_0^5 f=",
    "o": [
      "4.",
      "10.",
      "21.",
      "7."
    ],
    "a": 1,
    "sol": "Pela aditividade: 3+7=10.",
    "hyp": "Pode multiplicar integrais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-integral-definido:12-int-integral-definido:aditividade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-010",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-ID-002",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Integral definido",
    "q": "A integral definida é...",
    "o": [
      "uma família de funções.",
      "um número real, quando existe.",
      "sempre uma função de x.",
      "uma derivada."
    ],
    "a": 1,
    "sol": "Com limites fixos, a variável de integração é muda e o resultado é numérico.",
    "hyp": "Pode confundir com integral indefinida.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-integral-definido:12-int-integral-definido:numero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-002",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-ID-021",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Integral definido",
    "q": "Se ∫_0^4 f=20, o valor médio de f em [0,4] é...",
    "o": [
      "5.",
      "20.",
      "4.",
      "80."
    ],
    "a": 0,
    "sol": "20/4=5.",
    "hyp": "Pode esquecer dividir pela amplitude.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-integral-definido:12-int-integral-definido:media",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-021",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-ID-016",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Integral definido",
    "q": "Se f é contínua e f(x)≥0 para todo o x em [a,b], com a<b, o que se pode afirmar sobre ∫_a^b f(x) dx?",
    "o": [
      "é sempre zero.",
      "é negativa.",
      "não existe.",
      "é não negativa."
    ],
    "a": 3,
    "sol": "O integral coincide com a área entre o gráfico e o eixo Ox, pelo que é não negativo. Se f for identicamente nula, o integral é zero.",
    "hyp": "Pode ignorar o sinal da função.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-integral-definido:12-int-integral-definido:sinal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-016",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-ID-037",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Integral definido",
    "q": "Se v(t) é a velocidade de um móvel e muda de sinal em [a,b], o que representa o integral definido ∫_a^b v(t) dt?",
    "o": [
      "deslocamento líquido.",
      "distância total sempre.",
      "velocidade média sem divisão.",
      "aceleração."
    ],
    "a": 0,
    "sol": "Partes negativas subtraem ao deslocamento.",
    "hyp": "Pode confundir deslocamento e distância total.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-integral-definido:12-int-integral-definido:deslocamento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-037",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-ID-004",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Integral definido",
    "q": "Trocar os limites de integração faz...",
    "o": [
      "manter o valor.",
      "quadrar o valor.",
      "tornar a integral zero.",
      "mudar o sinal."
    ],
    "a": 3,
    "sol": "∫_b^a f=−∫_a^b f.",
    "hyp": "Pode pensar que ordem dos limites não importa.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-integral-definido:12-int-integral-definido:troca-limites",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-004",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-ID-024",
    "themeId": "12-int",
    "subtopicId": "12-int-integral-definido",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Exemplo",
    "focus": "Integral definido",
    "q": "Para f(x)=x em [−1,1], ∫f=0 porque...",
    "o": [
      "f é zero em todo o intervalo.",
      "a função é constante.",
      "o intervalo tem comprimento zero.",
      "as áreas simétricas positiva e negativa cancelam-se."
    ],
    "a": 3,
    "sol": "f é ímpar em intervalo simétrico.",
    "hyp": "Pode ignorar o sinal da área.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-integral-definido:12-int-integral-definido:impar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-ID-024",
    "sourceFile": "content/vnext/math-a/12/12-int-integral-definido.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-PR-006",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Uma primitiva de x² é...",
    "o": [
      "2x.",
      "x³/3.",
      "x³.",
      "3x²."
    ],
    "a": 1,
    "sol": "Deriva-se x³/3 pela regra da potência: (x³/3)′=(3x²)/3=x². Logo, x³/3 é uma primitiva de x².",
    "hyp": "Pode manter o expoente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-primitiva:12-int-primitiva:potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-006",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-PR-002",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Se F é uma primitiva de f, então F+C, com C constante, é...",
    "o": [
      "uma função diferente sem relação.",
      "também uma primitiva de f.",
      "a derivada de f.",
      "sempre zero."
    ],
    "a": 1,
    "sol": "A derivada de uma constante é zero.",
    "hyp": "Pode pensar que só existe uma primitiva.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-primitiva:12-int-primitiva:constante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-002",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-PR-025",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Se F(x)=x³−2x+7, então a função da qual F é primitiva é...",
    "o": [
      "3x²−2.",
      "x²−2.",
      "3x²+7.",
      "x³−2x."
    ],
    "a": 0,
    "sol": "Basta derivar F.",
    "hyp": "verificacao",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-primitiva:12-int-primitiva:undefined",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-025",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-PR-015",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "A notação ∫f(x)dx representa...",
    "o": [
      "apenas uma derivada.",
      "um valor numérico sempre.",
      "a família de primitivas de f.",
      "uma soma finita."
    ],
    "a": 2,
    "sol": "Sem limites de integração, é uma integral indefinida/família de primitivas.",
    "hyp": "Pode confundir com integral definida.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-primitiva:12-int-primitiva:notacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-015",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-PR-049",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Se a taxa de crescimento de uma quantidade é q'(t)=6t² e q(0)=10, então q(t)=",
    "o": [
      "2t³+10.",
      "6t³+10.",
      "3t²+10.",
      "2t³."
    ],
    "a": 0,
    "sol": "Integrar q′(t)=6t² dá q(t)=2t³+C. Ao substituir t=0 obtém-se C=q(0)=10, logo q(t)=2t³+10.",
    "hyp": "Pode esquecer o coeficiente 1/3.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-primitiva:12-int-primitiva:modelacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-049",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-PR-003",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Duas primitivas da mesma função num intervalo diferem por...",
    "o": [
      "um fator x.",
      "uma derivada.",
      "uma constante.",
      "uma função arbitrária."
    ],
    "a": 2,
    "sol": "Se F'=G', então (F−G)'=0 e F−G é constante.",
    "hyp": "Pode achar que diferem por qualquer função.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-primitiva:12-int-primitiva:unicidade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-003",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-PR-027",
    "themeId": "12-int",
    "subtopicId": "12-int-primitiva",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Conceito de primitiva/antiderivada",
    "q": "Em ]−∞,0[, uma primitiva de 1/x pode escrever-se...",
    "o": [
      "ln x.",
      "−ln(−x).",
      "ln(−x).",
      "1/x."
    ],
    "a": 2,
    "sol": "ln(−x)=ln|x| e a sua derivada é 1/x para x<0.",
    "hyp": "Pode pensar que é necessário sinal negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-primitiva:12-int-primitiva:dominio-negativo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-PR-027",
    "sourceFile": "content/vnext/math-a/12/12-int-primitiva.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TP-010",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Primitivas imediatas e propriedades",
    "q": "Qual é a expressão geral das primitivas de f(x)=√x?",
    "o": [
      "(3/2)x^{1/2}+C.",
      "(2/3)x^{3/2}+C.",
      "2√x+C.",
      "x^{3/2}+C."
    ],
    "a": 1,
    "sol": "x^{1/2} integra para x^{3/2}/(3/2).",
    "hyp": "Pode inverter 2/3.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tabela-propriedades:12-int-tabela-propriedades:raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-010",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TP-002",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Primitivas imediatas e propriedades",
    "q": "Para uma constante não nula k, como se escreve a expressão geral ∫k f(x) dx em termos de ∫f(x) dx?",
    "o": [
      "∫f(x)dx/k.",
      "k∫f(x)dx.",
      "k+∫f(x)dx.",
      "∫f(kx)dx."
    ],
    "a": 1,
    "sol": "A constante pode ser colocada fora da integral.",
    "hyp": "Pode alterar o argumento da função.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tabela-propriedades:12-int-tabela-propriedades:linearidade-constante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-002",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TP-032",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Primitivas imediatas e propriedades",
    "q": "A substituição simples u=g(x) é natural quando aparece...",
    "o": [
      "qualquer produto sem relação.",
      "apenas uma constante.",
      "uma soma de funções independentes.",
      "g'(x) junto de uma função de g(x)."
    ],
    "a": 3,
    "sol": "É a regra da cadeia ao contrário.",
    "hyp": "Pode usar substituição sem estrutura.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tabela-propriedades:12-int-tabela-propriedades:substituicao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-032",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TP-015",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Primitivas imediatas e propriedades",
    "q": "∫(4/x)dx=",
    "o": [
      "ln|4x|+C apenas.",
      "4/x²+C.",
      "4ln|x|+C.",
      "x⁴+C."
    ],
    "a": 2,
    "sol": "A constante 4 sai da integral.",
    "hyp": "Pode absorver tudo na expressão log sem perceber que ln4 é apenas constante; 4ln|x| é a forma correta base.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tabela-propriedades:12-int-tabela-propriedades:log-coef",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-015",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TP-048",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Primitivas imediatas e propriedades",
    "q": "Se uma taxa r(t)=3e^{3t}, uma quantidade acumulada compatível é...",
    "o": [
      "3e^{3t}+C.",
      "e^t+C.",
      "t e^{3t}+C.",
      "e^{3t}+C."
    ],
    "a": 3,
    "sol": "Derivar e^{3t} dá 3e^{3t}.",
    "hyp": "Pode manter o coeficiente 3.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tabela-propriedades:12-int-tabela-propriedades:modelacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-048",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TP-003",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Primitivas imediatas e propriedades",
    "q": "Qual é a expressão geral das primitivas da função constante f(x)=5?",
    "o": [
      "5+C.",
      "x⁵+C.",
      "5x+C.",
      "x/5+C."
    ],
    "a": 2,
    "sol": "A primitiva de uma constante k é kx.",
    "hyp": "Pode deixar a constante sem multiplicar por x.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tabela-propriedades:12-int-tabela-propriedades:constante",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-003",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TP-033",
    "themeId": "12-int",
    "subtopicId": "12-int-tabela-propriedades",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Primitivas imediatas e propriedades",
    "q": "Ao calcular uma primitiva de (x+1)e^{x²+2x} com constante de integração nula, obtém-se um múltiplo constante de que função?",
    "o": [
      "e^{x²+2x}.",
      "ln(x²+2x).",
      "(x+1)².",
      "e^{x+1}."
    ],
    "a": 0,
    "sol": "Derivada de x²+2x é 2(x+1), logo a integral é (1/2)e^{x²+2x}+C.",
    "hyp": "Pode não reconhecer o fator 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tabela-propriedades:12-int-tabela-propriedades:reconhecimento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TP-033",
    "sourceFile": "content/vnext/math-a/12/12-int-tabela-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TFC-016",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "O Teorema Fundamental do Cálculo liga...",
    "o": [
      "apenas áreas e trigonometria.",
      "probabilidade e matrizes.",
      "limites e vetores.",
      "derivação e integração."
    ],
    "a": 3,
    "sol": "A derivada de uma função acumulação recupera o integrando e Barrow usa primitivas para calcular integrais.",
    "hyp": "Pode tratar as operações como independentes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tfc-barrow:12-int-tfc-barrow:ligacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-016",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TFC-003",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "∫_0^1 x dx=",
    "o": [
      "1.",
      "0.",
      "1/2.",
      "2."
    ],
    "a": 2,
    "sol": "Uma primitiva é x²/2; em 1 menos em 0 dá 1/2.",
    "hyp": "Pode usar f(1)−f(0).",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tfc-barrow:12-int-tfc-barrow:basico",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-003",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TFC-021",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "Se f(x)<0 num intervalo, a função acumulação A tem nesse intervalo...",
    "o": [
      "decréscimo.",
      "crescimento.",
      "derivada zero.",
      "máximo em todo ponto."
    ],
    "a": 0,
    "sol": "A'=f<0.",
    "hyp": "Pode esquecer a ligação pelo TFC.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tfc-barrow:12-int-tfc-barrow:acumulacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-021",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TFC-012",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "∫_1^4 1/√x dx=",
    "o": [
      "3.",
      "4.",
      "1.",
      "2."
    ],
    "a": 3,
    "sol": "Uma primitiva de 1/√x em x>0 é 2√x. Pela fórmula de Barrow, o integral é 2√4−2√1=4−2=2.",
    "hyp": "Pode esquecer o fator 2.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tfc-barrow:12-int-tfc-barrow:raiz",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-012",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TFC-041",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "Se v=s' e s(0)=2, então ∫_0^5 v(t)dt=",
    "o": [
      "s(5)−2.",
      "s(5).",
      "v(5)−v(0).",
      "5s(5)."
    ],
    "a": 0,
    "sol": "Por Barrow, a integral da velocidade é a variação da posição.",
    "hyp": "Pode esquecer a posição inicial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tfc-barrow:12-int-tfc-barrow:movimento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-041",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TFC-002",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "Na expressão [F(x)]_a^b significa...",
    "o": [
      "F(a)+F(b).",
      "F(b)−F(a).",
      "F(a)−F(b).",
      "F'(b)."
    ],
    "a": 1,
    "sol": "É a notação de avaliação nos limites.",
    "hyp": "Pode somar os valores.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tfc-barrow:12-int-tfc-barrow:notacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-002",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12INT-TFC-022",
    "themeId": "12-int",
    "subtopicId": "12-int-tfc-barrow",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Teorema Fundamental do Cálculo / Fórmula de Barrow",
    "q": "Se A(x)=∫_1^x (t−2)dt, então A'(3)=",
    "o": [
      "3.",
      "1.",
      "1/2.",
      "0."
    ],
    "a": 1,
    "sol": "A'(x)=x−2; em 3 dá 1.",
    "hyp": "Pode calcular A(3) em vez da derivada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-int-tfc-barrow:12-int-tfc-barrow:tfc-ponto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12INT-TFC-022",
    "sourceFile": "content/vnext/math-a/12/12-int-tfc-barrow.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-AE-006",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "O oposto de uma matriz A é...",
    "o": [
      "A^T.",
      "−A, obtida mudando o sinal de todos os elementos.",
      "A^{-1}.",
      "a matriz nula."
    ],
    "a": 1,
    "sol": "A+(−A)=0.",
    "hyp": "Pode confundir oposto com inversa ou transposta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-adicao-escalar:12-mat-adicao-escalar:oposto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-006",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-AE-003",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "[[1,2],[3,4]]+[[5,6],[7,8]]=",
    "o": [
      "[[5,12],[21,32]].",
      "[[6,6],[10,10]].",
      "[[6,8],[10,12]].",
      "[[1,8],[3,12]]."
    ],
    "a": 2,
    "sol": "Somam-se elementos correspondentes.",
    "hyp": "Pode multiplicar em vez de somar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-adicao-escalar:12-mat-adicao-escalar:soma-calculo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-003",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-AE-028",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Se A e B são simétricas da mesma ordem, A+B é...",
    "o": [
      "antissimétrica.",
      "nula.",
      "não quadrada.",
      "simétrica."
    ],
    "a": 3,
    "sol": "(A+B)^T=A^T+B^T=A+B.",
    "hyp": "Pode achar que soma destrói simetria.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-adicao-escalar:12-mat-adicao-escalar:simetricas-soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-028",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-AE-020",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Se A e B têm dimensões 2×3 e 3×2, então A+B...",
    "o": [
      "é 2×2.",
      "é 3×3.",
      "tem 6 elementos e por isso existe.",
      "não está definida."
    ],
    "a": 3,
    "sol": "As dimensões têm de coincidir exatamente.",
    "hyp": "Pode olhar apenas para o mesmo número total de entradas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-adicao-escalar:12-mat-adicao-escalar:incompativel",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-020",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-AE-045",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Se A contém coordenadas de vários pontos por colunas e D contém deslocamentos compatíveis para esses pontos, A+D pode representar...",
    "o": [
      "translação das coordenadas.",
      "rotação obrigatoriamente.",
      "produto escalar.",
      "mudança de dimensão."
    ],
    "a": 0,
    "sol": "A adição ajusta cada coordenada pela deslocação correspondente.",
    "hyp": "Pode confundir soma com rotação matricial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-adicao-escalar:12-mat-adicao-escalar:translacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-045",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-AE-002",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "A soma de matrizes é feita...",
    "o": [
      "linha vezes coluna.",
      "elemento a elemento.",
      "multiplicando diagonais.",
      "somando apenas a diagonal."
    ],
    "a": 1,
    "sol": "Cada elemento da soma é a_ij+b_ij.",
    "hyp": "Pode confundir com produto matricial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-adicao-escalar:12-mat-adicao-escalar:soma",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-002",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-AE-024",
    "themeId": "12-mat",
    "subtopicId": "12-mat-adicao-escalar",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Adição, subtração e multiplicação por escalar",
    "q": "Se A=[[2,4],[−2,6]] e 2X=A, então X=",
    "o": [
      "[[4,8],[−4,12]].",
      "[[1,4],[−2,3]].",
      "[[0,2],[−1,6]].",
      "[[1,2],[−1,3]]."
    ],
    "a": 3,
    "sol": "Divide-se cada elemento por 2.",
    "hyp": "Pode dividir apenas uma linha.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-adicao-escalar:12-mat-adicao-escalar:resolver-X",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-AE-024",
    "sourceFile": "content/vnext/math-a/12/12-mat-adicao-escalar.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-MOD-006",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Modelação e aplicações",
    "q": "Preços p=(2,3)^T e quantidades q=(10,5)^T dão custo total...",
    "o": [
      "25.",
      "35.",
      "30.",
      "50."
    ],
    "a": 1,
    "sol": "2·10+3·5=35.",
    "hyp": "Pode somar preços e quantidades separadamente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-modelacao:12-mat-modelacao:custo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-006",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-MOD-002",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Modelação",
    "focus": "Modelação e aplicações",
    "q": "Uma matriz com linhas=lojas e colunas=produtos pode representar...",
    "o": [
      "apenas o total global.",
      "quantidades vendidas por loja e produto.",
      "uma função de uma variável.",
      "um vetor sem estrutura."
    ],
    "a": 1,
    "sol": "Cada entrada identifica uma combinação loja-produto.",
    "hyp": "Pode ignorar o significado de linhas/colunas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-modelacao:12-mat-modelacao:tabela",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-002",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-MOD-021",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Compreensão",
    "focus": "Modelação e aplicações",
    "q": "Numa rede simples e não dirigida, A é a matriz de adjacência: aᵢⱼ=1 quando i e j estão ligados e aᵢⱼ=0 nos restantes casos. O que conta a entrada (A²)ᵢⱼ?",
    "o": [
      "percursos de comprimento 2 de i para j.",
      "ligações diretas apenas.",
      "distância mínima sempre.",
      "grau de i apenas."
    ],
    "a": 0,
    "sol": "O produto aᵢₖaₖⱼ vale 1 precisamente quando se pode ir de i para k e de k para j. Ao somar sobre k, contam-se os percursos de dois passos, incluindo o regresso ao vértice de partida quando i=j.",
    "hyp": "Pode confundir potência matricial com elevar entradas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-modelacao:12-mat-modelacao:caminhos2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-021",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-MOD-009",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Modelação e aplicações",
    "q": "Se c é o vetor-coluna dos custos unitários dos recursos e A tem um recurso por linha e um produto por coluna, com aᵢⱼ igual ao consumo do recurso i por unidade do produto j, o que representa cᵀA?",
    "o": [
      "custo de recursos por produto.",
      "quantidade produzida por recurso.",
      "apenas o custo total global.",
      "a identidade dos produtos."
    ],
    "a": 0,
    "sol": "Cada coluna de A combina custos dos recursos usados por uma unidade de produto.",
    "hyp": "Pode confundir orientação dos dados.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-modelacao:12-mat-modelacao:custos-recursos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-009",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-MOD-050",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Síntese",
    "focus": "Modelação e aplicações",
    "q": "A modelação com matrizes é especialmente útil quando o problema envolve...",
    "o": [
      "uma única constante sem relações.",
      "várias quantidades interdependentes relacionadas de forma linear ou aproximadamente linear.",
      "apenas uma equação sem dados.",
      "processos que nunca podem ser organizados em tabelas."
    ],
    "a": 1,
    "sol": "Matrizes compactam relações simultâneas entre muitas variáveis.",
    "hyp": "Pode usar matrizes sem necessidade estrutural.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-modelacao:12-mat-modelacao:sintese",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-050",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-MOD-003",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Modelação e aplicações",
    "q": "A matriz Q=[[10,20],[15,5]] regista quantidades vendidas. As linhas representam lojas e as colunas representam produtos. Quantas unidades vendeu a 1.ª loja, somando os dois produtos?",
    "o": [
      "25.",
      "35.",
      "30.",
      "50."
    ],
    "a": 2,
    "sol": "Primeira linha: 10+20=30.",
    "hyp": "Pode somar a primeira coluna.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-modelacao:12-mat-modelacao:linha-total",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-003",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-MOD-022",
    "themeId": "12-mat",
    "subtopicId": "12-mat-modelacao",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Modelação e aplicações",
    "q": "Para A=[[0,1],[1,0]], A²=",
    "o": [
      "A.",
      "I_2.",
      "0.",
      "2A."
    ],
    "a": 1,
    "sol": "Pelo produto linha-coluna, A²=[[1,0],[0,1]]=I₂. Cada elemento da diagonal resulta de 1·1 e cada elemento fora da diagonal é 0.",
    "hyp": "Pode elevar entradas individualmente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-modelacao:12-mat-modelacao:rede-potencia",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-MOD-022",
    "sourceFile": "content/vnext/math-a/12/12-mat-modelacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-PRD-007",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "[[1,0],[0,1]]·[[5,−1],[2,3]]=",
    "o": [
      "[[5,0],[0,3]].",
      "[[5,2],[−1,3]].",
      "[[5,−1],[2,3]].",
      "[[1,−1],[2,1]]."
    ],
    "a": 2,
    "sol": "A identidade à esquerda também não altera a matriz.",
    "hyp": "Pode conservar apenas a diagonal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-produto:12-mat-produto:identidade-esquerda",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-007",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-PRD-002",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Se A é m×n e B é n×p, então AB é...",
    "o": [
      "n×n.",
      "m×p.",
      "m×n.",
      "p×m."
    ],
    "a": 1,
    "sol": "A dimensão externa fica m×p.",
    "hyp": "Pode conservar a dimensão de A ou trocar a ordem.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-produto:12-mat-produto:dimensao-produto",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-002",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-PRD-021",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Se A é 3×2 e B é 2×5, então BA...",
    "o": [
      "não está definido.",
      "é 2×2.",
      "é 3×5.",
      "é 2×5."
    ],
    "a": 0,
    "sol": "B tem 5 colunas e A tem 3 linhas; 5≠3.",
    "hyp": "Pode assumir que se AB existe então BA também.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-produto:12-mat-produto:ordem-dimensoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-021",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-PRD-017",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Para A=[[1,1],[0,1]] e B=[[1,0],[1,1]], tem-se AB=[[2,1],[1,1]] e BA=[[1,1],[1,2]]. Isto mostra que...",
    "o": [
      "AB≠BA em geral.",
      "AB=BA sempre.",
      "A e B não podem ser multiplicadas.",
      "produto matricial é elemento a elemento."
    ],
    "a": 0,
    "sol": "A ordem dos fatores altera o resultado.",
    "hyp": "Pode ignorar o contraexemplo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-produto:12-mat-produto:nao-comutatividade",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-017",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-PRD-045",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Se A transforma um vetor x em y=Ax e B transforma y em z=By, então a transformação total é...",
    "o": [
      "z=(BA)x.",
      "z=(AB)x.",
      "z=(A+B)x.",
      "z=B+A+x."
    ],
    "a": 0,
    "sol": "Primeiro A atua em x e depois B: B(Ax)=(BA)x.",
    "hyp": "Pode escrever as matrizes na ordem temporal direta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-produto:12-mat-produto:composicao-transformacoes",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-045",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-PRD-003",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Se A é 2×3 e B é 3×4, então AB tem dimensão...",
    "o": [
      "3×3.",
      "2×3.",
      "2×4.",
      "4×2."
    ],
    "a": 2,
    "sol": "As dimensões internas 3 coincidem; ficam 2 linhas e 4 colunas.",
    "hyp": "Pode multiplicar ou trocar dimensões.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-produto:12-mat-produto:dimensao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-003",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-PRD-022",
    "themeId": "12-mat",
    "subtopicId": "12-mat-produto",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Produto de matrizes, compatibilidade e não comutatividade",
    "q": "Se A é 2×3 e B é 3×2, então AB e BA...",
    "o": [
      "só AB existe.",
      "estão ambos definidos, com dimensões 2×2 e 3×3.",
      "só BA existe.",
      "têm ambos dimensão 2×3."
    ],
    "a": 1,
    "sol": "AB usa 2×3·3×2→2×2; BA usa 3×2·2×3→3×3.",
    "hyp": "Pode achar que os dois produtos têm a mesma dimensão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-produto:12-mat-produto:dois-produtos",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-PRD-022",
    "sourceFile": "content/vnext/math-a/12/12-mat-produto.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-RT-006",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Uma matriz quadrada é aquela que tem...",
    "o": [
      "uma única linha.",
      "o mesmo número de linhas e colunas.",
      "uma única coluna.",
      "todos os elementos iguais."
    ],
    "a": 1,
    "sol": "A dimensão é n×n.",
    "hyp": "Pode confundir forma quadrada com valores iguais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-representacao-tipos:12-mat-representacao-tipos:quadrada",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-006",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-RT-002",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "A matriz [[1,2,3],[4,5,6]] tem dimensão...",
    "o": [
      "3×2.",
      "2×3.",
      "2×2.",
      "3×3."
    ],
    "a": 1,
    "sol": "Tem 2 linhas e 3 colunas.",
    "hyp": "Pode contar primeiro as colunas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-representacao-tipos:12-mat-representacao-tipos:dimensao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-002",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-RT-027",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Numa matriz antissimétrica real, os elementos da diagonal principal são...",
    "o": [
      "1.",
      "−1.",
      "0.",
      "arbitrários."
    ],
    "a": 2,
    "sol": "a_ii=−a_ii implica a_ii=0.",
    "hyp": "Pode achar que a diagonal pode ser qualquer valor.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-representacao-tipos:12-mat-representacao-tipos:diag-antissimetrica",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-027",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-RT-008",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Uma matriz coluna tem...",
    "o": [
      "uma linha.",
      "dimensão n×n.",
      "diagonal nula.",
      "uma coluna."
    ],
    "a": 3,
    "sol": "É uma matriz m×1.",
    "hyp": "Pode trocar linha e coluna.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-representacao-tipos:12-mat-representacao-tipos:coluna",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-008",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-RT-039",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Se A é simétrica 3×3, quantos elementos independentes são necessários para a determinar?",
    "o": [
      "9.",
      "3.",
      "6.",
      "5."
    ],
    "a": 2,
    "sol": "São 3 diagonais +3 acima da diagonal; os restantes ficam determinados por simetria.",
    "hyp": "Pode contar todos os 9.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-representacao-tipos:12-mat-representacao-tipos:simetria-graus",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-039",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-RT-003",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "O elemento a_ij de uma matriz A é o elemento da...",
    "o": [
      "linha j e coluna i.",
      "diagonal i+j.",
      "linha i e coluna j.",
      "coluna i apenas."
    ],
    "a": 2,
    "sol": "O primeiro índice é a linha e o segundo a coluna.",
    "hyp": "Pode inverter os índices.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-representacao-tipos:12-mat-representacao-tipos:elemento",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-003",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-RT-032",
    "themeId": "12-mat",
    "subtopicId": "12-mat-representacao-tipos",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Modelação",
    "focus": "Representação, dimensão, elementos e tipos de matrizes",
    "q": "Uma tabela com vendas de 4 lojas em 3 meses pode ser representada por matriz...",
    "o": [
      "3×4 obrigatoriamente.",
      "4×4.",
      "3×3.",
      "4×3 se linhas=lojas e colunas=meses."
    ],
    "a": 3,
    "sol": "A convenção dada fixa 4 linhas e 3 colunas.",
    "hyp": "Pode ignorar a convenção especificada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-representacao-tipos:12-mat-representacao-tipos:dados-dim",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-RT-032",
    "sourceFile": "content/vnext/math-a/12/12-mat-representacao-tipos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-TR-007",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Transformações geométricas com matrizes",
    "q": "A matriz [[1,0],[0,−1]] representa reflexão no...",
    "o": [
      "eixo Oy.",
      "reta y=x.",
      "eixo Ox.",
      "reta y=−x."
    ],
    "a": 2,
    "sol": "Pontos sobre Ox mantêm-se e y muda de sinal.",
    "hyp": "Pode trocar Ox/Oy.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-transformacoes:12-mat-transformacoes:reflexao-ox",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-007",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-TR-002",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Transformações geométricas com matrizes",
    "q": "A matriz [[2,0],[0,2]] transforma (1,3) em...",
    "o": [
      "(3,4).",
      "(2,6).",
      "(1,6).",
      "(2,3)."
    ],
    "a": 1,
    "sol": "Multiplica ambas as coordenadas por 2.",
    "hyp": "Pode escalar apenas uma coordenada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-transformacoes:12-mat-transformacoes:escala-uniforme",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-002",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-TR-023",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Transformações geométricas com matrizes",
    "q": "Uma reflexão relativamente ao eixo Ox preserva...",
    "o": [
      "apenas a coordenada x.",
      "apenas áreas, não comprimentos.",
      "distâncias e ângulos.",
      "a orientação de todos os vetores para o eixo Ox."
    ],
    "a": 2,
    "sol": "Uma reflexão é uma isometria: preserva distâncias e amplitudes de ângulos, embora altere a orientação.",
    "hyp": "Pode pensar que a mudança do sinal da coordenada y altera comprimentos ou amplitudes.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-transformacoes:12-mat-transformacoes:isometria",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-023",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-TR-008",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Transformações geométricas com matrizes",
    "q": "A matriz [[0,1],[1,0]] envia (2,5) para...",
    "o": [
      "(−5,2).",
      "(2,−5).",
      "(−2,−5).",
      "(5,2)."
    ],
    "a": 3,
    "sol": "Troca as duas coordenadas.",
    "hyp": "Pode alterar sinais sem motivo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-transformacoes:12-mat-transformacoes:reflexao-yx",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-008",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-TR-037",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 4,
    "cognitive": "Raciocínio",
    "focus": "Transformações geométricas com matrizes",
    "q": "A matriz R=[[0,−1],[1,0]] satisfaz R²=",
    "o": [
      "−I.",
      "I.",
      "R.",
      "0."
    ],
    "a": 0,
    "sol": "Duas rotações de 90° dão 180°, isto é −I.",
    "hyp": "Pode achar que R²=I.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-transformacoes:12-mat-transformacoes:potencia-rotacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-037",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-TR-003",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Transformações geométricas com matrizes",
    "q": "Para k>0, que transformação do plano representa a matriz [[k,0],[0,k]]?",
    "o": [
      "uma rotação de 90°.",
      "uma reflexão no eixo Ox.",
      "uma dilatação/redução uniforme de fator k.",
      "uma translação."
    ],
    "a": 2,
    "sol": "Ambas as coordenadas são multiplicadas pelo mesmo fator.",
    "hyp": "Pode confundir escalamento com translação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-transformacoes:12-mat-transformacoes:escala",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-003",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12MAT-TR-021",
    "themeId": "12-mat",
    "subtopicId": "12-mat-transformacoes",
    "year": "12.º opcional",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Transformações geométricas com matrizes",
    "q": "Para θ=π, a matriz de rotação é...",
    "o": [
      "[[-1,0],[0,−1]].",
      "[[1,0],[0,1]].",
      "[[0,−1],[1,0]].",
      "[[0,1],[−1,0]]."
    ],
    "a": 0,
    "sol": "cosπ=−1 e sinπ=0.",
    "hyp": "Pode confundir π com 90°.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-mat-transformacoes:12-mat-transformacoes:rotacao-pi",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12MAT-TR-021",
    "sourceFile": "content/vnext/math-a/12/12-mat-transformacoes.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PC-006",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Probabilidade condicionada",
    "q": "Numa turma, A é «estudar música» e B é «praticar desporto». Há alunos que praticam desporto. Para calcular a probabilidade de estudar música sabendo que o aluno escolhido pratica desporto, qual é o conjunto de referência?",
    "o": [
      "A.",
      "B.",
      "A∪B.",
      "A∩B."
    ],
    "a": 1,
    "sol": "Já se sabe que o aluno pratica desporto. O conjunto de referência é B, o grupo dos alunos que praticam desporto.",
    "hyp": "Pode tomar A como novo espaço por ser o primeiro símbolo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-condicionada:12-prob-condicionada:novo-universo-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-006",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PC-002",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Probabilidade condicionada",
    "q": "Se P(B)>0, então P(A|B)=...",
    "o": [
      "P(A)/P(B).",
      "P(A∩B)/P(B).",
      "P(A∪B)/P(B).",
      "P(B)/P(A)."
    ],
    "a": 1,
    "sol": "A definição restringe o espaço ao acontecimento B.",
    "hyp": "Pode usar P(A) no numerador sem exigir A∩B.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-condicionada:12-prob-condicionada:formula-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-002",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PC-021",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade condicionada",
    "q": "Se P(A∩B)=0,12, P(A)=0,3 e P(B)=0,4, então P(B|A)=...",
    "o": [
      "0,4.",
      "0,3.",
      "0,12.",
      "0,7."
    ],
    "a": 0,
    "sol": "0,12/0,3=0,4.",
    "hyp": "Pode repetir P(A|B).",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-condicionada:12-prob-condicionada:dois-cond-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-021",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PC-010",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Probabilidade condicionada",
    "q": "Se P(A∩Bᶜ)=0,42 e P(A)=0,6, qual é o valor de P(B|A)?",
    "o": [
      "0,18.",
      "0,3.",
      "0,7.",
      "0,6."
    ],
    "a": 1,
    "sol": "A parte de A que também pertence a B tem probabilidade 0,6−0,42=0,18. Assim, P(B|A)=0,18/0,6=0,3.",
    "hyp": "Pode dividir pelo acontecimento condicionado errado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-condicionada:12-prob-condicionada:invertida-10",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-010",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PC-046",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Probabilidade condicionada",
    "q": "Um teste é positivo em 90% dos doentes. Se D='doente' e += 'teste positivo', essa informação é...",
    "o": [
      "P(D|+)=0,9.",
      "P(+|D)=0,9.",
      "P(D∩+)=0,9 necessariamente.",
      "P(+)=0,9."
    ],
    "a": 1,
    "sol": "A frase condiciona a positividade ao facto de a pessoa estar doente.",
    "hyp": "Pode inverter condicionada, erro clássico de base-rate.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-condicionada:12-prob-condicionada:teste-46",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-046",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PC-003",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Probabilidade condicionada",
    "q": "Uma turma tem 25 alunos que estudam música. Destes, 10 também praticam desporto. Escolhe-se ao acaso um dos alunos que estudam música. Qual é a probabilidade de que também pratique desporto?",
    "o": [
      "0,2.",
      "0,5.",
      "0,4.",
      "0,6."
    ],
    "a": 2,
    "sol": "A seleção faz-se entre os 25 alunos que estudam música. Desses, 10 praticam desporto, pelo que a probabilidade é 10/25=0,4.",
    "hyp": "Pode somar em vez de dividir.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-condicionada:12-prob-condicionada:calc-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-003",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PC-022",
    "themeId": "12-prob",
    "subtopicId": "12-prob-condicionada",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade condicionada",
    "q": "Se P(A|B)=1, com P(B)>0, então...",
    "o": [
      "A e B são incompatíveis.",
      "P(B\\A)=0.",
      "P(A)=1 necessariamente.",
      "P(B|A)=1 necessariamente."
    ],
    "a": 1,
    "sol": "Dentro de B, A ocorre com probabilidade 1; a parte de B fora de A tem probabilidade zero.",
    "hyp": "Pode concluir que A tem probabilidade global 1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-condicionada:12-prob-condicionada:cond1-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PC-022",
    "sourceFile": "content/vnext/math-a/12/12-prob-condicionada.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-CI-006",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Tabelas de contingência e independência",
    "q": "P(A)=0,4, P(B)=0,5 e A,B independentes. P(A∩B)=...",
    "o": [
      "0,9.",
      "0,2.",
      "0,1.",
      "0,4."
    ],
    "a": 1,
    "sol": "0,4×0,5=0,2.",
    "hyp": "Pode somar as probabilidades.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-contingencia-independencia:12-prob-contingencia-independencia:produto-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-006",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-CI-002",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Tabelas de contingência e independência",
    "q": "Numa tabela de contingência, os totais de linha e coluna são frequências...",
    "o": [
      "conjuntas.",
      "marginais.",
      "condicionais apenas.",
      "impossíveis."
    ],
    "a": 1,
    "sol": "Resultam de somar sobre a outra variável.",
    "hyp": "Pode chamar conjunta ao total marginal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-contingencia-independencia:12-prob-contingencia-independencia:marginais-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-002",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-CI-021",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Tabelas de contingência e independência",
    "q": "Se P(A)=0,4 e P(B)=0,3 e A,B independentes, P(A^c∩B^c)=...",
    "o": [
      "0,42.",
      "0,12.",
      "0,3.",
      "0,58."
    ],
    "a": 0,
    "sol": "0,6×0,7=0,42.",
    "hyp": "Pode usar complementos depois de multiplicar: 1−0,12.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-contingencia-independencia:12-prob-contingencia-independencia:dois-comp-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-021",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-CI-009",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Tabelas de contingência e independência",
    "q": "Dois acontecimentos incompatíveis com probabilidades positivas podem ser independentes?",
    "o": [
      "Não.",
      "Sim, sempre.",
      "Só se tiverem a mesma probabilidade.",
      "Só se a soma for 1."
    ],
    "a": 0,
    "sol": "Incompatibilidade dá P(A∩B)=0, mas independência exigiria P(A)P(B)>0.",
    "hyp": "Pode tratar 'não influenciam' e 'não podem ocorrer juntos' como sinónimos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-contingencia-independencia:12-prob-contingencia-independencia:incomp-9",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-009",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-CI-045",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Tabelas de contingência e independência",
    "q": "Numa empresa com 250 trabalhadores, 100 trabalham remotamente, 75 têm horário flexível e 30 reúnem as duas condições. Escolhe-se um trabalhador ao acaso. Os acontecimentos «trabalhar remotamente» e «ter horário flexível» são...",
    "o": [
      "independentes.",
      "dependentes.",
      "incompatíveis.",
      "complementares."
    ],
    "a": 0,
    "sol": "As probabilidades marginais são 100/250=0,4 e 75/250=0,3, e a conjunta é 30/250=0,12. Como 0,4×0,3=0,12, os acontecimentos são independentes.",
    "hyp": "Pode confundir sobreposição com dependência.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-contingencia-independencia:12-prob-contingencia-independencia:modelacao-45",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-045",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-CI-003",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Tabelas de contingência e independência",
    "q": "Uma célula interior da tabela representa uma frequência...",
    "o": [
      "marginal.",
      "total.",
      "conjunta.",
      "necessariamente condicional."
    ],
    "a": 2,
    "sol": "A célula corresponde simultaneamente a uma categoria de cada variável.",
    "hyp": "Pode confundir célula com total de linha.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-contingencia-independencia:12-prob-contingencia-independencia:conjunta-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-003",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-CI-022",
    "themeId": "12-prob",
    "subtopicId": "12-prob-contingencia-independencia",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Tabelas de contingência e independência",
    "q": "Com A,B independentes e P(A)=0,4, P(B)=0,3, P(A∪B)=...",
    "o": [
      "0,12.",
      "0,58.",
      "0,7.",
      "0,42."
    ],
    "a": 1,
    "sol": "0,4+0,3−0,12=0,58.",
    "hyp": "Pode somar sem subtrair a interseção.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-contingencia-independencia:12-prob-contingencia-independencia:uniao-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-CI-022",
    "sourceFile": "content/vnext/math-a/12/12-prob-contingencia-independencia.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-FA-006",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Num dado, o acontecimento A='sair número par' é...",
    "o": [
      "{1,3,5}.",
      "{2,4,6}.",
      "{2}.",
      "{1,2,3,4,5,6}."
    ],
    "a": 1,
    "sol": "Os resultados pares são 2,4 e 6.",
    "hyp": "Pode confundir par com ímpar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:evento-par-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-006",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-FA-002",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "O espaço de resultados Ω de uma experiência é...",
    "o": [
      "um único resultado observado.",
      "o conjunto de todos os resultados possíveis.",
      "o conjunto dos resultados impossíveis.",
      "a probabilidade do acontecimento certo."
    ],
    "a": 1,
    "sol": "Ω reúne todos os resultados elementares possíveis da experiência.",
    "hyp": "Pode confundir espaço amostral com acontecimento observado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:omega-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-002",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-FA-025",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Pela lei de De Morgan, (A∪B)^c é...",
    "o": [
      "A^c∩B^c.",
      "A^c∪B^c.",
      "A∩B.",
      "A∪B."
    ],
    "a": 0,
    "sol": "Não ocorrer A nem B equivale a ocorrer A^c e B^c.",
    "hyp": "Pode manter a operação união ao complementar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:demorgan-uniao-25",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-025",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-FA-019",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Dois acontecimentos complementares são sempre...",
    "o": [
      "independentes.",
      "iguais.",
      "incompatíveis e com união Ω.",
      "elementares."
    ],
    "a": 2,
    "sol": "A∩A^c=∅ e A∪A^c=Ω.",
    "hyp": "Pode confundir complementaridade com independência.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:complementares-19",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-019",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-FA-047",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Num controlo de qualidade, A='peça tem defeito de pintura' e B='peça tem defeito dimensional'. 'Tem algum dos defeitos' é...",
    "o": [
      "A∩B.",
      "A^c∩B^c.",
      "A∪B.",
      "A\\B."
    ],
    "a": 2,
    "sol": "Ter algum inclui um ou ambos os tipos de defeito.",
    "hyp": "Pode exigir simultaneamente os dois defeitos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:modelacao-defeitos-47",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-047",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-FA-003",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Lança-se uma moeda comum uma vez e regista-se a face que fica para cima. Qual é o espaço de resultados?",
    "o": [
      "{cara}.",
      "{coroa}.",
      "{cara,coroa}.",
      "{cara,coroa,duas caras}."
    ],
    "a": 2,
    "sol": "Há dois resultados elementares possíveis: cara e coroa.",
    "hyp": "Pode indicar apenas um dos resultados.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:moeda-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-003",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-FA-026",
    "themeId": "12-prob",
    "subtopicId": "12-prob-fenomeno-acontecimentos",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Fenómeno aleatório, espaço de resultados e acontecimentos",
    "q": "Pela lei de De Morgan, (A∩B)^c é...",
    "o": [
      "A^c∩B^c.",
      "A^c∪B^c.",
      "A∩B.",
      "∅."
    ],
    "a": 1,
    "sol": "Não ocorrer ambos simultaneamente equivale a falhar A ou falhar B.",
    "hyp": "Pode não trocar interseção por união.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-fenomeno-acontecimentos:12-prob-fenomeno-acontecimentos:demorgan-inter-26",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-FA-026",
    "sourceFile": "content/vnext/math-a/12/12-prob-fenomeno-acontecimentos.json",
    "optionOrderVersion": 2,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-NO-006",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Compreensão",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "O gráfico de uma distribuição Normal é...",
    "o": [
      "assimétrico à direita sempre.",
      "simétrico em torno de μ.",
      "uniforme.",
      "discreto em barras."
    ],
    "a": 1,
    "sol": "A densidade Normal é simétrica em relação à média.",
    "hyp": "Pode confundir com distribuições enviesadas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-normal:12-prob-normal:simetria-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-006",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-NO-004",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Se X é constante, então Var(X)=...",
    "o": [
      "1.",
      "E(X).",
      "não definida.",
      "0."
    ],
    "a": 3,
    "sol": "Não há dispersão quando todos os valores são iguais.",
    "hyp": "Pode achar que variância mede o próprio nível da variável.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-normal:12-prob-normal:constante-4",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-004",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-NO-024",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Pela regra empírica, a percentagem aproximadamente acima de μ+2σ é...",
    "o": [
      "5%.",
      "95%.",
      "97,5%.",
      "2,5%."
    ],
    "a": 3,
    "sol": "Fora de μ±2σ ficam cerca de 5%, divididos em duas caudas de 2,5%.",
    "hyp": "Pode atribuir os 5% todos a uma cauda.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-normal:12-prob-normal:cauda-2sigma-24",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-024",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-NO-009",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Aumentar σ mantendo μ fixo torna a curva Normal...",
    "o": [
      "mais espalhada e menos alta.",
      "mais estreita e alta.",
      "deslocada para a direita.",
      "assimétrica."
    ],
    "a": 0,
    "sol": "Maior desvio-padrão significa maior dispersão; a área total mantém-se 1.",
    "hyp": "Pode pensar que σ desloca a média.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-normal:12-prob-normal:sigma-9",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-009",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-NO-045",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "As alturas seguem uma distribuição normal com média 170 cm e desvio-padrão 6 cm. Onde se situa uma altura de 182 cm em relação à média, em unidades de desvio-padrão?",
    "o": [
      "2 desvios-padrão acima da média.",
      "12 desvios-padrão acima.",
      "1 desvio-padrão acima.",
      "2 abaixo."
    ],
    "a": 0,
    "sol": "A diferença 182−170=12 cm corresponde a 12/6=2 desvios-padrão acima da média.",
    "hyp": "Pode usar a diferença 12 como número de desvios.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-normal:12-prob-normal:modelacao-altura-45",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-045",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-NO-005",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Uma distribuição Normal é caracterizada pelos parâmetros...",
    "o": [
      "média μ e desvio-padrão σ>0.",
      "apenas mediana.",
      "mínimo e máximo.",
      "número de observações apenas."
    ],
    "a": 0,
    "sol": "A média determina o centro e σ a dispersão.",
    "hyp": "Pode tratar todos os modelos Normais como iguais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-normal:12-prob-normal:parametros-5",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-005",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-NO-027",
    "themeId": "12-prob",
    "subtopicId": "12-prob-normal",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Aplicação",
    "focus": "Valor médio/dispersão de modelos e Modelo Normal",
    "q": "Uma variável normal X tem média μ=70 e desvio-padrão σ=10. Qual é o intervalo [μ−σ, μ+σ]?",
    "o": [
      "[50,90].",
      "[70,80].",
      "[60,80].",
      "[60,90]."
    ],
    "a": 2,
    "sol": "O limite inferior é 70−10=60 e o superior é 70+10=80. O intervalo é [60, 80].",
    "hyp": "Pode somar/descontar2σ.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-normal:12-prob-normal:intervalo-27",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-NO-027",
    "sourceFile": "content/vnext/math-a/12/12-prob-normal.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PA-006",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Lança-se uma moeda equilibrada duas vezes, de forma independente. Qual é a probabilidade de obter cara nos dois lançamentos?",
    "o": [
      "1/2.",
      "1/4.",
      "1/3.",
      "1."
    ],
    "a": 1,
    "sol": "(1/2)(1/2)=1/4.",
    "hyp": "Pode somar as probabilidades dos dois lançamentos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-produto-arvores:12-prob-produto-arvores:moeda-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-006",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PA-002",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Numa árvore de probabilidade, a probabilidade de um caminho completo obtém-se...",
    "o": [
      "somando as probabilidades dos ramos.",
      "multiplicando as probabilidades ao longo do caminho.",
      "fazendo a média dos ramos.",
      "usando apenas o último ramo."
    ],
    "a": 1,
    "sol": "Cada caminho representa uma sequência/interseção de acontecimentos.",
    "hyp": "Pode somar ramos em série.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-produto-arvores:12-prob-produto-arvores:caminho-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-002",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PA-021",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Se P(A)=0,7 e P(B|A)=0,4, qual é a probabilidade P(Bᶜ|A)?",
    "o": [
      "0,6.",
      "0,4.",
      "0,3.",
      "0,42."
    ],
    "a": 0,
    "sol": "Sabendo que ocorreu A, as probabilidades de B e de Bᶜ somam 1. Logo, P(Bᶜ|A)=1−0,4=0,6.",
    "hyp": "Pode usar P(A^c).",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-produto-arvores:12-prob-produto-arvores:complemento-ramo-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-021",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PA-017",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Numa árvore, para calcular a probabilidade de um acontecimento que pode ocorrer por vários caminhos incompatíveis, deve-se...",
    "o": [
      "somar as probabilidades desses caminhos.",
      "multiplicar todos os caminhos entre si.",
      "usar só o caminho mais provável.",
      "fazer a média simples."
    ],
    "a": 0,
    "sol": "Cada caminho é uma interseção; caminhos alternativos incompatíveis somam-se.",
    "hyp": "Pode aplicar multiplicação também entre caminhos alternativos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-produto-arvores:12-prob-produto-arvores:somar-caminhos-17",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-017",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PA-045",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Um cliente entra pelo canal online com probabilidade 0,7 e, nesse canal, compra com probabilidade 0,2. P(online e compra)=...",
    "o": [
      "0,14.",
      "0,9.",
      "0,5.",
      "0,2."
    ],
    "a": 0,
    "sol": "0,7×0,2=0,14.",
    "hyp": "Pode confundir taxa de conversão condicionada com probabilidade conjunta.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-produto-arvores:12-prob-produto-arvores:modelacao-online-45",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-045",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PA-003",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "Numa árvore, os ramos que saem do mesmo nó devem ter probabilidades cuja soma é...",
    "o": [
      "0.",
      "1/2.",
      "1.",
      "depende sempre do número de ramos."
    ],
    "a": 2,
    "sol": "Os ramos a partir de um nó formam alternativas que cobrem o estado seguinte.",
    "hyp": "Pode multiplicar em vez de somar alternativas do mesmo nó.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-produto-arvores:12-prob-produto-arvores:soma-no-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-003",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PA-022",
    "themeId": "12-prob",
    "subtopicId": "12-prob-produto-arvores",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Regra do produto e árvores de probabilidade",
    "q": "P(A)=0,2 e P(B|A)=0,75. Qual é P(A∩B^c)?",
    "o": [
      "0,15.",
      "0,05.",
      "0,25.",
      "0,8."
    ],
    "a": 1,
    "sol": "P(B^c|A)=0,25; 0,2×0,25=0,05.",
    "hyp": "Pode usar 0,75 em vez do complementar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-produto-arvores:12-prob-produto-arvores:caminho-complementar-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PA-022",
    "sourceFile": "content/vnext/math-a/12/12-prob-produto-arvores.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PR-006",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Se P(A)=0,82, então P(A^c)=...",
    "o": [
      "0,82.",
      "0,18.",
      "1,82.",
      "0,28."
    ],
    "a": 1,
    "sol": "1−0,82=0,18.",
    "hyp": "Pode inverter algarismos ou somar.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-propriedades:12-prob-propriedades:complemento-num-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-006",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PR-002",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Probabilidade e propriedades elementares",
    "q": "A probabilidade do acontecimento certo Ω é...",
    "o": [
      "0.",
      "1.",
      "1/2.",
      "indefinida."
    ],
    "a": 1,
    "sol": "P(Ω)=1.",
    "hyp": "Pode trocar acontecimento certo e impossível.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-propriedades:12-prob-propriedades:omega-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-002",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PR-021",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Se P(A∪B)=1, então P((A∪B)^c)=...",
    "o": [
      "0.",
      "1.",
      "P(A∩B).",
      "1/2."
    ],
    "a": 0,
    "sol": "O complementar de um acontecimento de probabilidade 1 tem probabilidade 0.",
    "hyp": "Pode manter a mesma probabilidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-propriedades:12-prob-propriedades:comp-uniao-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-021",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PR-012",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Se A⊂B, então necessariamente...",
    "o": [
      "P(A)>P(B).",
      "P(A)=1.",
      "P(B)=0.",
      "P(A)≤P(B)."
    ],
    "a": 3,
    "sol": "A monotonia da probabilidade preserva a inclusão.",
    "hyp": "Pode inverter a desigualdade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-propriedades:12-prob-propriedades:monotonia-12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-012",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PR-045",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Numa escola, 60% praticam desporto, 45% música e 25% ambos. A percentagem que pratica pelo menos uma atividade é...",
    "o": [
      "80%.",
      "105%.",
      "35%.",
      "25%."
    ],
    "a": 0,
    "sol": "60+45−25=80.",
    "hyp": "Pode somar sem retirar a sobreposição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-propriedades:12-prob-propriedades:modelacao-uniao-45",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-045",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PR-003",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Probabilidade e propriedades elementares",
    "q": "A probabilidade do acontecimento impossível ∅ é...",
    "o": [
      "1.",
      "1/2.",
      "0.",
      "−1."
    ],
    "a": 2,
    "sol": "P(∅)=0.",
    "hyp": "Pode atribuir probabilidade negativa ao impossível.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-propriedades:12-prob-propriedades:vazio-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-003",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PR-022",
    "themeId": "12-prob",
    "subtopicId": "12-prob-propriedades",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade e propriedades elementares",
    "q": "Se P(A∩B)=0, pode concluir-se sempre que A e B são independentes?",
    "o": [
      "Sim.",
      "Não.",
      "Só se P(A)=P(B).",
      "Só se P(A∪B)=1."
    ],
    "a": 1,
    "sol": "Se P(A∩B)=0, A e B só são independentes quando P(A)P(B)=0. Por exemplo, cara e coroa num único lançamento de moeda equilibrada têm interseção de probabilidade 0 e probabilidades individuais 1/2.",
    "hyp": "Pode confundir incompatibilidade e independência.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-propriedades:12-prob-propriedades:incomp-indep-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PR-022",
    "sourceFile": "content/vnext/math-a/12/12-prob-propriedades.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PT-006",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Uma fábrica usa máquina M1 em 70% da produção e M2 em 30%. Taxas de defeito: 2% e 5%. P(defeito)=...",
    "o": [
      "0,07.",
      "0,029.",
      "0,035.",
      "0,02."
    ],
    "a": 1,
    "sol": "0,7×0,02+0,3×0,05=0,014+0,015=0,029.",
    "hyp": "Pode fazer média não ponderada 3,5%.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-total:12-prob-total:fabrica-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-006",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PT-002",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "O teorema da probabilidade total requer uma família de acontecimentos que forme...",
    "o": [
      "uma sequência crescente.",
      "uma partição do espaço de resultados.",
      "um conjunto de acontecimentos independentes obrigatoriamente.",
      "apenas dois acontecimentos iguais."
    ],
    "a": 1,
    "sol": "Os acontecimentos da partição são disjuntos e cobrem Ω.",
    "hyp": "Pode achar que independência substitui a condição de partição.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-total:12-prob-total:particao-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-002",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PT-021",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "P(A|B) após observar B é uma probabilidade...",
    "o": [
      "a posteriori.",
      "marginal anterior.",
      "impossível.",
      "de complemento."
    ],
    "a": 0,
    "sol": "A evidência B atualiza a probabilidade atribuída a A.",
    "hyp": "Pode trocar prior e posterior.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-total:12-prob-total:posterior-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-021",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PT-012",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Se P(B|A)=P(B|A^c)=0,4, então P(B)=...",
    "o": [
      "depende de P(A).",
      "0,8.",
      "0,16.",
      "0,4."
    ],
    "a": 3,
    "sol": "Qualquer média ponderada de dois valores iguais a 0,4 vale 0,4.",
    "hyp": "Pode somar as condicionais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-total:12-prob-total:cond-iguais-12",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-012",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PT-046",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Um seguro tem 30% clientes jovens e 70% adultos. Sinistro anual: 12% jovens,5% adultos. Taxa global de sinistro=...",
    "o": [
      "8,5%.",
      "7,1%.",
      "17%.",
      "5%."
    ],
    "a": 1,
    "sol": "0,3×0,12+0,7×0,05=0,036+0,035=0,071.",
    "hyp": "Pode fazer média simples 8,5%.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-total:12-prob-total:seguro-46",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-046",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PT-003",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Se {A1, …, An} é uma partição do espaço de resultados e P(Ai)>0 para cada i, como se calcula P(B) pela regra da probabilidade total?",
    "o": [
      "ΣP(Ai).",
      "ΣP(B|Ai).",
      "ΣP(B|Ai)P(Ai).",
      "ΠP(B|Ai)."
    ],
    "a": 2,
    "sol": "Para cada i de 1 a n, calcula-se P(B|Ai)P(Ai), a probabilidade da interseção B∩Ai. A soma dessas parcelas dá P(B).",
    "hyp": "Pode esquecer ponderar pelas probabilidades dos ramos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-total:12-prob-total:formula-geral-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-003",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-PT-022",
    "themeId": "12-prob",
    "subtopicId": "12-prob-total",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Probabilidade total e problemas em cadeia",
    "q": "Uma doença afeta 1% da população. Um teste dá positivo em 99% dos doentes e em 5% dos não doentes. P(positivo)=...",
    "o": [
      "0,99.",
      "0,0594.",
      "0,05.",
      "0,0495."
    ],
    "a": 1,
    "sol": "0,01×0,99+0,99×0,05=0,0099+0,0495=0,0594.",
    "hyp": "Pode confundir sensibilidade com taxa global de positivos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-total:12-prob-total:teste-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-PT-022",
    "sourceFile": "content/vnext/math-a/12/12-prob-total.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-VD-006",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "X assume 0, 1 e 2 com probabilidades 0,2; 0,5; 0,3. Qual é P(X≤1)?",
    "o": [
      "0,5.",
      "0,7.",
      "0,3.",
      "1."
    ],
    "a": 1,
    "sol": "P(X=0)+P(X=1)=0,2+0,5=0,7.",
    "hyp": "Pode usar apenas a massa em 1.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-variaveis-discretas:12-prob-variaveis-discretas:acumulada-6",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-006",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-VD-002",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "A função massa de probabilidade de X atribui a cada valor x...",
    "o": [
      "P(X≤x).",
      "P(X=x).",
      "P(X>x).",
      "o número de observações apenas."
    ],
    "a": 1,
    "sol": "A função massa dá a probabilidade pontual de cada valor possível.",
    "hyp": "Pode confundir função massa com função de distribuição acumulada.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-variaveis-discretas:12-prob-variaveis-discretas:massa-2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-002",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-VD-021",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "X assume os valores −1, 0 e 2 com probabilidades respetivas 0,2, 0,5 e 0,3. Qual é E(X)?",
    "o": [
      "0,4.",
      "0,6.",
      "0,5.",
      "1."
    ],
    "a": 0,
    "sol": "−1×0,2+0×0,5+2×0,3=−0,2+0,6=0,4.",
    "hyp": "Pode ignorar o sinal negativo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-variaveis-discretas:12-prob-variaveis-discretas:esperanca-neg-21",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-021",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-VD-014",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "O valor esperado E(X)...",
    "o": [
      "tem de ser um valor que X possa assumir.",
      "pode não ser um valor possível de X.",
      "é sempre inteiro.",
      "é sempre a moda."
    ],
    "a": 1,
    "sol": "É uma média teórica; pode situar-se entre valores possíveis.",
    "hyp": "Pode achar que a média tem de ser observável numa realização.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-variaveis-discretas:12-prob-variaveis-discretas:esperanca-interpret-14",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-014",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-VD-043",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "Um prémio aleatório paga 100€ com 0,01, 10€ com 0,09 e 0€ com 0,90. Valor esperado bruto=...",
    "o": [
      "1€.",
      "10€.",
      "1,90€.",
      "11€."
    ],
    "a": 2,
    "sol": "100×0,01+10×0,09=1+0,9=1,9€.",
    "hyp": "Pode somar prémios sem ponderação.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-variaveis-discretas:12-prob-variaveis-discretas:premio-43",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-043",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-VD-003",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "As probabilidades da função massa devem somar...",
    "o": [
      "0.",
      "o valor médio.",
      "1.",
      "o número de valores possíveis."
    ],
    "a": 2,
    "sol": "Os acontecimentos {X=x}, para cada valor possível x, são disjuntos e a sua união é o espaço de resultados. Por isso, as respetivas probabilidades somam 1.",
    "hyp": "Pode somar os valores de X em vez das probabilidades.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-variaveis-discretas:12-prob-variaveis-discretas:soma-3",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-003",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12PROB-VD-022",
    "themeId": "12-prob",
    "subtopicId": "12-prob-variaveis-discretas",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Variáveis aleatórias discretas e função massa",
    "q": "X é uma variável aleatória com um conjunto finito de valores possíveis. Se Y=2X+3, qual é E(Y)?",
    "o": [
      "E(X)^2+3.",
      "2E(X)+3.",
      "2E(X^2)+3.",
      "E(X)+5."
    ],
    "a": 1,
    "sol": "A esperança é linear: E(aX+b)=aE(X)+b.",
    "hyp": "Pode aplicar a transformação de forma não linear à média.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-prob-variaveis-discretas:12-prob-variaveis-discretas:linearidade-22",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12PROB-VD-022",
    "sourceFile": "content/vnext/math-a/12/12-prob-variaveis-discretas.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BIS-006",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Na bisseção de uma função contínua no intervalo [1,3], verifica-se f(1)<0, f(3)>0 e f(2)<0. Que intervalo resulta da primeira iteração?",
    "o": [
      "[1,2].",
      "[2,3].",
      "[1,3].",
      "[0,2]."
    ],
    "a": 1,
    "sol": "A mudança de sinal ocorre entre 2 e 3.",
    "hyp": "Pode escolher o lado com sinais iguais.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bissecao:12-rae-bissecao:novo-intervalo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-006",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BIS-002",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Em cada iteração da bisseção calcula-se...",
    "o": [
      "a derivada no extremo esquerdo.",
      "o ponto médio do intervalo.",
      "a média dos valores f(a),f(b).",
      "o zero da tangente."
    ],
    "a": 1,
    "sol": "Divide-se o intervalo em duas metades.",
    "hyp": "Pode confundir média das abcissas com média das ordenadas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bissecao:12-rae-bissecao:ponto-medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-002",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BIS-021",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Para f(x)=x²−2 em [1,2], o primeiro ponto médio é 1,5 e f(1,5)>0. O novo intervalo é...",
    "o": [
      "[1;1,5].",
      "[1,5;2].",
      "[1,25;1,5].",
      "[0;1,5]."
    ],
    "a": 0,
    "sol": "f(1)<0 e f(1,5)>0.",
    "hyp": "Pode manter a metade sem mudança de sinal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bissecao:12-rae-bissecao:sqrt2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-021",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BIS-008",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Numa iteração do método da bisseção, o ponto médio do intervalo é m. Se f(m)=0, o que se conclui?",
    "o": [
      "é obrigatório continuar.",
      "o método falhou.",
      "devemos escolher a metade direita.",
      "a raiz foi encontrada exatamente."
    ],
    "a": 3,
    "sol": "O ponto médio é a própria raiz.",
    "hyp": "Pode continuar sem necessidade.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bissecao:12-rae-bissecao:raiz-exata",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-008",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BIS-044",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Exemplo",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Para f(x)=(x−1)², f(0)>0 e f(2)>0 apesar de haver raiz em 1. Isto mostra que...",
    "o": [
      "Bolzano é falso.",
      "a função é descontínua.",
      "a raiz não é real.",
      "a condição de mudança de sinal é suficiente, mas não necessária para existir raiz."
    ],
    "a": 3,
    "sol": "Há raiz sem sinais opostos nos extremos.",
    "hyp": "Pode tratar a condição como necessária.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bissecao:12-rae-bissecao:raiz-par",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-044",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BIS-003",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "No método da bisseção, o ponto médio m verifica f(m)≠0. Qual das duas metades do intervalo se conserva para a iteração seguinte?",
    "o": [
      "sempre a metade esquerda.",
      "sempre a metade direita.",
      "a metade onde permanece a mudança de sinal.",
      "a metade com maior valor de f."
    ],
    "a": 2,
    "sol": "Mantém-se a garantia de raiz.",
    "hyp": "Pode escolher o lado pelo tamanho de f em vez do sinal.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bissecao:12-rae-bissecao:selecionar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-003",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BIS-022",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bissecao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Método da bisseção, aproximação e erro",
    "q": "Para f(x)=x²−2, após uma iteração de bisseção obteve-se o intervalo [1;1,5]. Qual é o ponto médio da iteração seguinte?",
    "o": [
      "1,75.",
      "1,25.",
      "1,125.",
      "1,5."
    ],
    "a": 1,
    "sol": "(1+1,5)/2=1,25.",
    "hyp": "Pode somar metade do extremo errado.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bissecao:12-rae-bissecao:medio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BIS-022",
    "sourceFile": "content/vnext/math-a/12/12-rae-bissecao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BL-006",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Para f(x)=x²−2, temos f(1)=−1 e f(2)=2. Logo existe uma raiz em...",
    "o": [
      "]−1,1[.",
      "]1,2[.",
      "]0,1[.",
      "]2,3[."
    ],
    "a": 1,
    "sol": "O polinómio é contínuo e muda de sinal entre 1 e 2.",
    "hyp": "Pode usar o valor √2 sem justificar pelo teorema.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:sqrt2",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-006",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BL-002",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "A condição f(a)f(b)<0 significa que...",
    "o": [
      "f(a)=f(b).",
      "f(a) e f(b) têm sinais opostos.",
      "ambos são negativos.",
      "um deles é necessariamente zero."
    ],
    "a": 1,
    "sol": "Produto negativo implica sinais contrários.",
    "hyp": "Pode confundir produto negativo com ambos negativos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:sinais",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-002",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BL-021",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Para f(x)=x²−2, f(1,4)=−0,04 e f(1,5)=0,25. Logo √2 está em...",
    "o": [
      "]1,4;1,5[.",
      "]1,3;1,4[.",
      "]1,5;1,6[.",
      "]0,04;0,25[."
    ],
    "a": 0,
    "sol": "Há mudança de sinal entre 1,4 e 1,5.",
    "hyp": "Pode usar os valores de f como extremos.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:localizacao-decimal",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-021",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BL-007",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Interpretação",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Para f(x)=x²−2, como f(1)<0 e f(2)>0, Bolzano garante uma raiz em ]1,2[. Esta conclusão refere-se à raiz positiva porque...",
    "o": [
      "Bolzano exclui raízes negativas.",
      "x²−2 só tem uma raiz.",
      "o intervalo ]1,2[ é positivo.",
      "f é crescente em todo R."
    ],
    "a": 2,
    "sol": "O intervalo escolhido localiza especificamente a raiz positiva.",
    "hyp": "Pode atribuir ao teorema exclusões que vêm do intervalo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:localizacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-007",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BL-044",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Um modelo de equilíbrio usa F(x)=procura(x)−oferta(x). Um equilíbrio ocorre quando...",
    "o": [
      "F'(x)=0 apenas.",
      "F(x)>0.",
      "F(x)<0.",
      "F(x)=0."
    ],
    "a": 3,
    "sol": "Equilíbrio significa procura=oferta.",
    "hyp": "Pode confundir equilíbrio com extremo.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:equilibrio",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-044",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BL-004",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Aplicação",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Se f é contínua e f(1)=−2, f(3)=5, então existe uma raiz em...",
    "o": [
      "]−2,5[.",
      "]0,1[.",
      "não é possível concluir.",
      "]1,3[."
    ],
    "a": 3,
    "sol": "Há mudança de sinal entre x=1 e x=3.",
    "hyp": "Pode usar os valores da função como intervalo de x.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:intervalo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-004",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-BL-022",
    "themeId": "12-rae",
    "subtopicId": "12-rae-bolzano-localizacao",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Raciocínio",
    "focus": "Teorema do Valor Intermédio/Bolzano-Cauchy e localização de raízes",
    "q": "Uma função f é contínua em [2,1;2,2] e verifica f(2,1)<0<f(2,2). Qual é a amplitude do intervalo ]2,1;2,2[, onde o Teorema de Bolzano garante pelo menos uma raiz?",
    "o": [
      "0,01.",
      "0,1.",
      "1.",
      "2,2."
    ],
    "a": 1,
    "sol": "A continuidade e os sinais opostos nos extremos garantem pelo menos uma raiz em ]2,1;2,2[. A amplitude é 2,2−2,1=0,1.",
    "hyp": "Pode confundir amplitude com casas decimais exatas.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-bolzano-localizacao:12-rae-bolzano-localizacao:erro-intervalar",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-BL-022",
    "sourceFile": "content/vnext/math-a/12/12-rae-bolzano-localizacao.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-NEW-006",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Aplicação",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Aplica o método de Newton a f(x)=x²−2 numa iteração em que xₙ≠0. Como se escreve xₙ₊₁?",
    "o": [
      "x_{n+1}=x_n/2.",
      "x_{n+1}=(x_n+2/x_n)/2.",
      "x_{n+1}=2/x_n.",
      "x_{n+1}=x_n−2."
    ],
    "a": 1,
    "sol": "x−(x²−2)/(2x)=(x+2/x)/2.",
    "hyp": "Pode simplificar incorretamente.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-newton:12-rae-newton:sqrt2-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-006",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-NEW-002",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Se f é derivável em xₙ e f′(xₙ)≠0, qual é a fórmula de Newton para calcular xₙ₊₁?",
    "o": [
      "x_{n+1}=(a+b)/2.",
      "x_{n+1}=x_n−f(x_n)/f'(x_n).",
      "x_{n+1}=f'(x_n).",
      "x_{n+1}=x_n+f(x_n)."
    ],
    "a": 1,
    "sol": "É a abcissa da interseção da tangente em x_n com o eixo.",
    "hyp": "Pode confundir com bisseção ou iteração simples.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-newton:12-rae-newton:formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-002",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-NEW-021",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Interpretação",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Ao aproximar uma raiz de f(x)=0 pelo método de Newton, qual das seguintes condições pode servir de critério de paragem baseado no resíduo?",
    "o": [
      "|f(x_n)| pequeno, com interpretação adequada.",
      "f'(x_n)>0 sempre.",
      "x_n>0.",
      "x_n próximo de 1."
    ],
    "a": 0,
    "sol": "O resíduo |f(xₙ)| mede quanto falta para satisfazer f(x)=0. Um resíduo pequeno pode justificar a paragem se a tolerância estiver definida para o valor de f. O erro na abcissa é uma grandeza diferente.",
    "hyp": "Pode confundir sinal com precisão.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-newton:12-rae-newton:residuo",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-021",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-NEW-013",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 2,
    "cognitive": "Raciocínio",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "A tangente a f em xₙ tem equação y=f(xₙ)+f′(xₙ)(x−xₙ), com f′(xₙ)≠0. Que fórmula se obtém ao impor y=0 e isolar x?",
    "o": [
      "a fórmula de Newton.",
      "a fórmula da bisseção.",
      "o Teorema de Bolzano.",
      "a regra da cadeia."
    ],
    "a": 0,
    "sol": "Resolver a tangente para a abcissa de interseção dá x_n−f/f'.",
    "hyp": "Pode não ligar a geometria à fórmula.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-newton:12-rae-newton:derivacao-formula",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-013",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-NEW-046",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 4,
    "cognitive": "Modelação",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Num modelo de equilíbrio F(p)=0, Newton requer além de avaliar F...",
    "o": [
      "conhecer duas raízes.",
      "avaliar ou aproximar F'.",
      "ter sempre um intervalo com sinais opostos.",
      "integrar F."
    ],
    "a": 1,
    "sol": "A inclinação local é necessária para construir a tangente.",
    "hyp": "Pode transferir as exigências da bisseção.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-newton:12-rae-newton:modelacao",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-046",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-NEW-003",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 1,
    "cognitive": "Compreensão",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Para aplicar Newton num passo é necessário, em geral...",
    "o": [
      "f(x_n)=0.",
      "f''(x_n)=0.",
      "f'(x_n)≠0.",
      "x_n ser inteiro."
    ],
    "a": 2,
    "sol": "A fórmula divide por f'(x_n).",
    "hyp": "Pode ignorar o denominador.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-newton:12-rae-newton:derivada-nao-zero",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-003",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  },
  {
    "id": "MS-VN12RAE-NEW-026",
    "themeId": "12-rae",
    "subtopicId": "12-rae-newton",
    "year": "12.º",
    "difficulty": 3,
    "cognitive": "Exemplo",
    "focus": "Método de Newton-Raphson, aproximação e análise de adequação",
    "q": "Aplica o método de Newton a f(x)=x²−1, a partir de x₀>0. Para que raiz converge a sucessão de aproximações?",
    "o": [
      "−1.",
      "1.",
      "0.",
      "as duas raízes simultaneamente."
    ],
    "a": 1,
    "sol": "A iteração é xₙ₊₁=(xₙ+1/xₙ)/2. Para xₙ>0, xₙ₊₁−1=(xₙ−1)²/(2xₙ)≥0. Quando xₙ≥1, tem-se também xₙ₊₁≤xₙ. A partir do primeiro passo, a sucessão converge para um limite L≥1 que verifica L=(L+1/L)/2. Logo, L=1.",
    "hyp": "Pode ignorar a influência do sinal inicial.",
    "contexts": [
      "mission"
    ],
    "signature": "mission:12-rae-newton:12-rae-newton:bacias",
    "reviewStatus": "prototype",
    "origin": "original_vnext_2026",
    "sourceQuestionId": "VN12RAE-NEW-026",
    "sourceFile": "content/vnext/math-a/12/12-rae-newton.json",
    "optionOrderVersion": 1,
    "productionEligible": false
  }
];
