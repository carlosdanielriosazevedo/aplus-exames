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
      "Borda considera apenas os primeiros lugares.",
      "Ter maioria de primeiros lugares não garante necessariamente vitória por Borda.",
      "Borda ignora os segundos lugares.",
      "O perfil é inválido."
    ],
    "a": 1,
    "sol": "O método de Borda valoriza toda a ordenação. B acumula muitos pontos por aparecer sempre em posições altas.",
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
    "q": "Se todos os votos de todas as listas forem multiplicados por 10, mantendo o número de mandatos, o que acontece à distribuição de D'Hondt?",
    "o": [
      "Muda sempre a favor da lista maior.",
      "Todas as listas recebem mais mandatos.",
      "Passa a existir empate.",
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
      "Sim, porque todas aumentam o mesmo.",
      "Sim, desde que haja três listas.",
      "Não, porque D'Hondt não usa votos."
    ],
    "a": 0,
    "sol": "A invariância é garantida para multiplicação comum, não para adição comum. A soma pode alterar razões e quocientes de forma diferente.",
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
    "sol": "Os cinco maiores quocientes são 1300(A), 950(B), 520(C), 433,33...(A) e 316,67...(B). Resultado 2-2-1.",
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
    "q": "Uma cooperativa vai distribuir 4 lugares entre grupos com 500, 400 e 200 votos e decidiu usar St. Laguë. Qual resultado deve comunicar?",
    "o": [
      "2-2-0",
      "2-1-1",
      "1-2-1",
      "3-1-0"
    ],
    "a": 1,
    "sol": "Os quatro maiores quocientes são 500(A),400(B),200(C),166,67(A), dando 2-1-1.",
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
      "Uma média diferente de zero.",
      "Um erro sistemático introduzido pelo modo como os elementos são escolhidos.",
      "Uma amostra grande.",
      "Uma tabela mal desenhada."
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
    "q": "O que caracteriza uma amostra aleatória simples, num modelo introdutório?",
    "o": [
      "Escolhem-se os mais fáceis de contactar.",
      "Escolhem-se apenas voluntários.",
      "Cada elemento tem a mesma oportunidade de ser selecionado.",
      "Escolhe-se exatamente metade da população."
    ],
    "a": 2,
    "sol": "A ideia central é igualdade de oportunidade de seleção, segundo o mecanismo definido.",
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
    "q": "A reta prevê y=12 para certo x, mas o valor observado é 15. Qual é o resíduo observado−previsto?",
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
    "sol": "Previsto=18; observado−previsto=3, logo o ponto está acima.",
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
    "q": "Um resíduo, num modelo de regressão, é...",
    "o": [
      "valor observado de y menos valor previsto de y.",
      "a média de x.",
      "o coeficiente de correlação.",
      "o número de observações."
    ],
    "a": 0,
    "sol": "Resíduo mede o erro vertical da previsão para um ponto.",
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
    "sol": "A caixa representa os 50% centrais entre Q1 e Q3.",
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
      "sempre o maior valor.",
      "o valor central dos dados ordenados, ou a média dos dois centrais se o número for par.",
      "a soma das frequências.",
      "o valor mais frequente."
    ],
    "a": 1,
    "sol": "A mediana depende da posição central após ordenar os dados.",
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
    "q": "Os salários mensais de cinco pessoas são 1 000,1 050,1 100,1 150 e 8 000 €. Qual medida descreve melhor o salário típico do grupo, se 8 000 € for um extremo?",
    "o": [
      "Mediana=1 100 €.",
      "Média=1 100 €.",
      "Máximo=8 000 €.",
      "Amplitude=7 000 €."
    ],
    "a": 0,
    "sol": "A mediana 1 100 € é robusta ao valor extremo.",
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
      "População: litros de água; variável: cidade.",
      "População: apenas famílias escolhidas; variável: número de ruas.",
      "População: consumo médio; variável: famílias."
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
      "São sempre idênticos.",
      "No gráfico de barras não há eixo.",
      "Histogramas só usam percentagens.",
      "No histograma, classes contíguas são representadas por retângulos adjacentes; em barras, categorias podem estar separadas."
    ],
    "a": 3,
    "sol": "O histograma representa intervalos contíguos de uma variável quantitativa.",
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
    "q": "Um trabalhador tem salário bruto de 1 400 €. Neste exercício, desconta 11% para Segurança Social e 6% de retenção. Qual é a percentagem total de descontos?",
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
      "Só se não houver imposto.",
      "Só se o rendimento for inferior ao primeiro escalão.",
      "Sim, porque as parcelas inferiores são tributadas a taxas menores."
    ],
    "a": 3,
    "sol": "A taxa efetiva é uma média ponderada das taxas aplicadas às parcelas.",
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
    "sol": "50 + 225 + 125 = 400 €.",
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
    "q": "Com capital e taxa positivos, qual comparação entre juro simples e composto é correta para mais de um período?",
    "o": [
      "O simples é sempre superior.",
      "São sempre iguais.",
      "O composto tende a dar montante superior, porque os juros também rendem.",
      "O composto elimina os juros anteriores."
    ],
    "a": 2,
    "sol": "Depois do primeiro período, a capitalização dos juros cria crescimento adicional no regime composto.",
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
    "q": "Uma poupança de 5 000 € cresce 3% ao ano durante 5 anos. Sem depósitos adicionais, qual é o montante aproximado?",
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
    "q": "No juro simples com capital e taxa fixos, como evolui o montante ao longo do tempo?",
    "o": [
      "Exponencialmente.",
      "De forma aleatória.",
      "Mantém-se constante.",
      "Linearmente."
    ],
    "a": 3,
    "sol": "O juro cresce proporcionalmente ao número de períodos, logo o montante é uma função afim do tempo.",
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
    "q": "Um depósito tem 120 L e enche a 8 L/min. Qual função V(t) é adequada?",
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
      "apenas uma fórmula.",
      "uma fórmula, tabela, gráfico ou descrição verbal adequada.",
      "apenas um gráfico.",
      "apenas uma tabela."
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
    "q": "Se f(2)=3 e f(3)=2, pode concluir-se que f não é função?",
    "o": [
      "Sim.",
      "Não.",
      "Só se f(2)=f(3).",
      "Só se o domínio for inteiro."
    ],
    "a": 1,
    "sol": "É perfeitamente possível duas entradas trocarem imagens; cada entrada continua a ter uma única saída.",
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
    "q": "Numa tabela de uma função, a mesma entrada aparece associada a 4 e a 6. A tabela representa uma função?",
    "o": [
      "Sim.",
      "Só se 4=6.",
      "Não.",
      "Só se houver mais entradas."
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
    "q": "No gráfico de y=f(x), os zeros correspondem aos pontos onde o gráfico...",
    "o": [
      "interseta o eixo Oy.",
      "interseta ou toca o eixo Ox.",
      "atinge a média.",
      "tem sempre máximo."
    ],
    "a": 1,
    "sol": "Nesses pontos y=0.",
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
    "q": "Se f(x)=x²−4, quais são os zeros?",
    "o": [
      "−2 e 2.",
      "−4 e 4.",
      "0 e 4.",
      "apenas 2."
    ],
    "a": 0,
    "sol": "x²−4=0 => x²=4 => x=±2.",
    "hyp": "Pode esquecer uma das raízes.",
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
    "q": "Se o gráfico cruza o eixo Ox em x=−1 e x=4, os zeros são...",
    "o": [
      "0 e 3.",
      "−4 e 1.",
      "−1 e 4.",
      "apenas 4."
    ],
    "a": 2,
    "sol": "As abcissas das interseções com Ox são os zeros.",
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
    "q": "Uma altura h(t)=20−5t é fisicamente válida até atingir o solo. Qual é o domínio temporal natural e o zero do modelo?",
    "o": [
      "Domínio R e zero t=5.",
      "Domínio [0,4] e zero t=4.",
      "Domínio [0,5] e zero t=4.",
      "Domínio [−4,0] e zero t=−4."
    ],
    "a": 1,
    "sol": "20−5t=0 dá t=4; fisicamente considera-se desde t=0 até esse instante.",
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
      "o contradomínio sempre por definição."
    ],
    "a": 1,
    "sol": "A imagem contém as saídas que a função realmente assume.",
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
    "q": "Se a>0, o vértice da parábola corresponde a...",
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
    "q": "A altura de um objeto é h(t)=−5t²+20t+1. Em que instante ocorre a altura máxima?",
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
    "q": "Duas retas não verticais de declives m1 e m2 são perpendiculares quando...",
    "o": [
      "m1m2=−1.",
      "m1=m2.",
      "m1+m2=0 sempre.",
      "m1m2=1."
    ],
    "a": 0,
    "sol": "Declives de retas perpendiculares são recíprocos e de sinais opostos.",
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
    "sol": "A regra padrão é (x,y)→(−y,x).",
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
    "q": "Qual é o centro e raio de x²−6x+y²+4y−12=0?",
    "o": [
      "Centro (−3,2), raio 5.",
      "Centro (3,−2), raio 12.",
      "Centro (3,−2), raio 5.",
      "Centro (6,−4), raio 5."
    ],
    "a": 2,
    "sol": "Completando quadrados: (x−3)²+(y+2)²=25.",
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
    "q": "Se v=2u, então v e u são...",
    "o": [
      "colineares e com o mesmo sentido se u≠0.",
      "perpendiculares.",
      "sempre de mesma norma.",
      "não relacionados."
    ],
    "a": 0,
    "sol": "Um múltiplo escalar positivo preserva direção e sentido.",
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
    "q": "Um deslocamento de 5 m para leste e 12 m para norte é representado por v=(5,12). Qual é o deslocamento direto?",
    "o": [
      "17 m.",
      "7 m.",
      "13 m.",
      "60 m."
    ],
    "a": 2,
    "sol": "A norma de (5,12) é 13.",
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
    "q": "Se AM=18 e G é baricentro, quanto valem AG e GM?",
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
    "sol": "Num triângulo retângulo, a circunferência com diâmetro igual à hipotenusa passa pelos três vértices.",
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
    "q": "Quer-se desenhar a maior circunferência interior tangente aos três lados de um triângulo. O seu centro é...",
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
    "q": "Três dos nove pontos são...",
    "o": [
      "os três vértices.",
      "os pontos médios dos três lados.",
      "os três excentros.",
      "os três centros de massa."
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
    "q": "Na reta de Euler, o baricentro G divide o segmento OH segundo...",
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
    "q": "Se OG=6 e GH=12, qual é OH?",
    "o": [
      "12",
      "18",
      "15",
      "24"
    ],
    "a": 1,
    "sol": "OH=6+12=18.",
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
    "q": "O centro da circunferência dos nove pontos é...",
    "o": [
      "o incentro.",
      "o baricentro sempre.",
      "o ponto médio de OH, onde O é circuncentro e H ortocentro.",
      "um vértice."
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
    "sol": "ON=12.",
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
    "q": "Para determinar o ortocentro, basta traçar...",
    "o": [
      "duas medianas.",
      "duas alturas; a terceira passa pelo mesmo ponto.",
      "duas mediatrizes.",
      "uma bissetriz."
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
    "q": "Quer-se encontrar o ponto comum às três perpendiculares traçadas dos vértices aos lados opostos de uma região triangular. Que ponto é esse?",
    "o": [
      "Baricentro.",
      "Incentro.",
      "Ortocentro.",
      "Circuncentro."
    ],
    "a": 2,
    "sol": "Essas perpendiculares são as alturas.",
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
    "q": "Se dois triângulos semelhantes têm áreas na razão 16:25, qual é a razão dos comprimentos correspondentes?",
    "o": [
      "8:10",
      "4:5",
      "16:25",
      "2:5"
    ],
    "a": 1,
    "sol": "A razão linear é a raiz quadrada da razão das áreas: 4:5.",
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
    "q": "Num triângulo equilátero, mediana, altura, mediatriz e bissetriz relativas ao mesmo vértice...",
    "o": [
      "são sempre distintas.",
      "coincidem.",
      "só duas coincidem.",
      "não existem."
    ],
    "a": 1,
    "sol": "A simetria do triângulo equilátero faz coincidir essas retas notáveis.",
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
    "cognitive": "Aplicacao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "Para f(x)=x^2, quanto vale f'(1)?",
    "o": [
      "3",
      "1",
      "4",
      "2"
    ],
    "a": 3,
    "sol": "Derivando a expressao e substituindo x=1, obtem-se 2.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
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
    "cognitive": "Compreensao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "Geometricamente, f'(a) representa",
    "o": [
      "o declive de qualquer secante",
      "o declive da reta tangente ao grafico em x=a",
      "a ordenada do ponto",
      "a distancia a origem"
    ],
    "a": 1,
    "sol": "A derivada e o declive da tangente.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
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
    "cognitive": "Raciocinio",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "Para f(x)=x^2, o limite lim_{h->0} [f(0+h)-f(0)]/h vale",
    "o": [
      "2",
      "0",
      "-2",
      "1"
    ],
    "a": 1,
    "sol": "Expandindo e simplificando, o quociente tende para 2a=0.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
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
    "cognitive": "Aplicacao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "Para f(x)=x^2, quanto vale f'(3)?",
    "o": [
      "6",
      "7",
      "5",
      "12"
    ],
    "a": 0,
    "sol": "Derivando a expressao e substituindo x=3, obtem-se 6.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
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
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "A posicao e dada por s(t)=t^2. Qual e a velocidade instantanea em t=3?",
    "o": [
      "6",
      "8",
      "4",
      "3"
    ],
    "a": 0,
    "sol": "A velocidade e s'(t); avaliando em t=3, obtem-se 6.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
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
    "cognitive": "Compreensao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "A definicao por limite de f'(a) e",
    "o": [
      "lim_{h->0} [f(a+h)+f(a)]/h",
      "f(a+h)-f(a)",
      "lim_{h->0} [f(a+h)-f(a)]/h",
      "lim_{h->0} h/[f(a+h)-f(a)]"
    ],
    "a": 2,
    "sol": "E o limite do quociente incremental.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
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
    "cognitive": "Interpretacao",
    "focus": "Taxa instantanea e derivada num ponto",
    "q": "Num ponto x=2, sabe-se que f(2)=5 e f'(2)=3. Qual e o declive da tangente?",
    "o": [
      "5",
      "2",
      "4",
      "3"
    ],
    "a": 3,
    "sol": "Por definicao, o declive da tangente e f'(2)=3.",
    "hyp": "Pode confundir taxa media com derivada, ou substituir incorretamente no quociente incremental.",
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
    "cognitive": "Aplicacao",
    "focus": "Funcao derivada",
    "q": "Se f(x)=5x^3, entao f'(x)=",
    "o": [
      "5x^3",
      "15x^2+1",
      "0",
      "15x^2"
    ],
    "a": 3,
    "sol": "Derivando termo a termo obtem-se 15x^2.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
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
    "cognitive": "Compreensao",
    "focus": "Funcao derivada",
    "q": "Se f'(x)>0 num intervalo, f e",
    "o": [
      "decrescente",
      "crescente nesse intervalo",
      "constante",
      "necessariamente positiva"
    ],
    "a": 1,
    "sol": "Sinal positivo da derivada indica crescimento.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
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
    "cognitive": "Interpretacao",
    "focus": "Funcao derivada",
    "q": "Se f'(x)=2x, em x>0, entao",
    "o": [
      "f e decrescente",
      "f e constante",
      "f e negativa",
      "f e crescente"
    ],
    "a": 3,
    "sol": "Para x>0, 2x>0.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
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
    "cognitive": "Aplicacao",
    "focus": "Funcao derivada",
    "q": "Se f(x)=2x^5, entao f'(x)=",
    "o": [
      "10x^4",
      "2x^5",
      "10x^4+1",
      "0"
    ],
    "a": 0,
    "sol": "Derivando termo a termo obtem-se 10x^4.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
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
    "cognitive": "Raciocinio",
    "focus": "Funcao derivada",
    "q": "f'(x)=4x^3; uma possibilidade para f(x) e",
    "o": [
      "4x^4+C",
      "x^4+C",
      "x^3+C",
      "x^4/4+C"
    ],
    "a": 1,
    "sol": "A derivada de x^4+C e 4x^3.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
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
    "cognitive": "Compreensao",
    "focus": "Funcao derivada",
    "q": "Se f'(x)<0 num intervalo, f e",
    "o": [
      "crescente",
      "constante",
      "decrescente nesse intervalo",
      "necessariamente negativa"
    ],
    "a": 2,
    "sol": "Sinal negativo indica decrescimento.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
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
    "cognitive": "Interpretacao",
    "focus": "Funcao derivada",
    "q": "Se f'(x)=2x, em x<0, entao",
    "o": [
      "f e decrescente",
      "f e crescente",
      "f e constante",
      "f e positiva"
    ],
    "a": 0,
    "sol": "Para x<0, 2x<0.",
    "hyp": "Pode confundir a funcao derivada com a derivada num ponto ou aplicar incorretamente regras elementares.",
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
    "cognitive": "Interpretacao",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Se f'(x)=-2x, entao junto de x=0 a situacao correta e",
    "o": [
      "crescente em ]-inf,0[ e decrescente em ]0,+inf[",
      "maximo em x=0",
      "nao se pode concluir nada",
      "crescente em ]-inf,0[ e decrescente em ]0,+inf[; maximo em x=0."
    ],
    "a": 3,
    "sol": "Analisa-se o sinal de f' antes e depois de 0.",
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
    "cognitive": "Compreensao",
    "focus": "Monotonia, extremos e otimizacao",
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
    "cognitive": "Raciocinio",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "No intervalo [-2,3], para f(x)=x^2, os extremos absolutos sao",
    "o": [
      "maximo 9 em x=3",
      "minimo 0 em x=0",
      "maximo 9 em x=3; minimo 0 em x=0.",
      "apenas o ponto onde f'=0"
    ],
    "a": 2,
    "sol": "Comparam-se valores nos pontos criticos e nas extremidades do intervalo.",
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
    "cognitive": "Aplicacao",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Para f(x)=x^2-4x+5, o extremo relevante ocorre em",
    "o": [
      "x=2, sendo minimo e f(2)=1.",
      "x=2, sendo minimo mas com outro valor",
      "x=0",
      "nao existe extremo"
    ],
    "a": 0,
    "sol": "Deriva-se, resolve-se f'(x)=0 e usa-se o sinal da derivada ou a concavidade da parabola.",
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
    "cognitive": "Raciocinio",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Se f'(x)>0 em ]-inf,1[, f'(1)=0 e f'(x)<0 em ]1,+inf[, entao",
    "o": [
      "f tem minimo local em x=1",
      "f tem maximo local em x=1",
      "f e crescente em todo o dominio",
      "f(1)=0"
    ],
    "a": 1,
    "sol": "O sinal muda de + para -.",
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
    "cognitive": "Compreensao",
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Um ponto onde f'(a)=0 chama-se frequentemente",
    "o": [
      "assintota",
      "zero obrigatorio de f",
      "ponto estacionario",
      "ponto de descontinuidade"
    ],
    "a": 2,
    "sol": "A tangente e horizontal quando f'(a)=0.",
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
    "focus": "Monotonia, extremos e otimizacao",
    "q": "Um retangulo tem perimetro 20. Se um lado mede x, a area e A(x)=x(10-x). A area maxima ocorre para",
    "o": [
      "x=10",
      "x=2",
      "x=0",
      "x=5"
    ],
    "a": 3,
    "sol": "A'(x)=10-2x=0 => x=5.",
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
    "cognitive": "Aplicacao",
    "focus": "Regras de derivacao",
    "q": "Deriva f(x)=x^7.",
    "o": [
      "x^7",
      "7x^6+1",
      "0",
      "7x^6"
    ],
    "a": 3,
    "sol": "Aplicando regra da potencia e linearidade obtem-se 7x^6.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
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
    "cognitive": "Compreensao",
    "focus": "Regras de derivacao",
    "q": "A derivada de cf, com c constante, e",
    "o": [
      "c'f",
      "cf'",
      "f'/c",
      "cf"
    ],
    "a": 1,
    "sol": "A constante multiplica a derivada.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
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
    "cognitive": "Aplicacao",
    "focus": "Regras de derivacao",
    "q": "Usando a regra do produto, deriva f(x)=x(x+1).",
    "o": [
      "2x+1",
      "2x-1",
      "x(x+1)",
      "0"
    ],
    "a": 0,
    "sol": "Aplicando (uv)'=u'v+uv' e simplificando obtem-se 2x+1.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
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
    "cognitive": "Aplicacao",
    "focus": "Regras de derivacao",
    "q": "Deriva f(x)=3x^4.",
    "o": [
      "12x^3",
      "3x^4",
      "12x^3+1",
      "0"
    ],
    "a": 0,
    "sol": "Aplicando regra da potencia e linearidade obtem-se 12x^3.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
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
    "cognitive": "Raciocinio",
    "focus": "Regras de derivacao",
    "q": "Se f'(x)=2x e g'(x)=3, entao (f+g)'(x)=",
    "o": [
      "2x+3",
      "6x",
      "2x",
      "3"
    ],
    "a": 0,
    "sol": "Somam-se as derivadas.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
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
    "cognitive": "Compreensao",
    "focus": "Regras de derivacao",
    "q": "A derivada de x^n, para n inteiro positivo, e",
    "o": [
      "x^(n-1)",
      "n x^n",
      "n x^(n-1)",
      "(n-1)x^n"
    ],
    "a": 2,
    "sol": "E a regra da potencia.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
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
    "cognitive": "Aplicacao",
    "focus": "Regras de derivacao",
    "q": "Usando a regra do produto, deriva f(x)=x^2(x+1).",
    "o": [
      "3x^2-2x",
      "3x^2+2x",
      "x^2(x+1)",
      "0"
    ],
    "a": 1,
    "sol": "Aplicando (uv)'=u'v+uv' e simplificando obtem-se 3x^2+2x.",
    "hyp": "Pode aplicar uma regra de derivacao ao objeto errado, esquecer fatores ou confundir produto/quociente com derivacao termo a termo.",
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
    "cognitive": "Aplicacao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Para f(x)=x^2, a tangente em x=2 tem equacao",
    "o": [
      "y=4x+4",
      "y=2x",
      "x=2",
      "y=4x-4"
    ],
    "a": 3,
    "sol": "Usa-se y-4=4(x-2), que simplifica para y=4x-4.",
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
    "cognitive": "Compreensao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "O declive da tangente em x=a e",
    "o": [
      "f(a)",
      "f'(a)",
      "a",
      "f(a)/a"
    ],
    "a": 1,
    "sol": "A derivada no ponto e o declive tangente.",
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
    "cognitive": "Raciocinio",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Sabendo que f(2)=5 e f'(2)=3, qual e a reta tangente?",
    "o": [
      "y=3x+5",
      "y=3x-1",
      "y=5x+3",
      "x=2"
    ],
    "a": 1,
    "sol": "y-5=3(x-2)",
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
    "cognitive": "Aplicacao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Para f(x)=x^2, a tangente em x=-1 tem equacao",
    "o": [
      "y=-2x-1",
      "y=-2x+1",
      "y=1x+-2",
      "x=-1"
    ],
    "a": 0,
    "sol": "Usa-se y-1=-2(x--1), que simplifica para y=-2x-1.",
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
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Sabendo que f(2)=5 e f'(2)=3, pela aproximacao linear f(2,1) e",
    "o": [
      "5,03",
      "aproximadamente 5,3",
      "8",
      "2,1"
    ],
    "a": 1,
    "sol": "Usa-se f(2+h)≈f(2)+f'(2)h com h=0,1.",
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
    "cognitive": "Compreensao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "Uma equacao da tangente em x=a e",
    "o": [
      "y-a=f(a)(x-f'(a))",
      "y=f(a)x+a",
      "y-f(a)=f'(a)(x-a)",
      "y=f'(a) apenas"
    ],
    "a": 2,
    "sol": "E a forma ponto-declive.",
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
    "cognitive": "Interpretacao",
    "focus": "Reta tangente e interpretacao geometrica",
    "q": "A tangente ao grafico em x=2 e y=4x-3. Entao f'(2)=",
    "o": [
      "5",
      "2",
      "-3",
      "4"
    ],
    "a": 3,
    "sol": "O declive da reta y=4x-3 e 4.",
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
    "cognitive": "Aplicacao",
    "focus": "Taxa media de variacao",
    "q": "Para f(x)=x^2, qual e a taxa media de variacao entre x=2 e x=5?",
    "o": [
      "8",
      "6",
      "21",
      "7"
    ],
    "a": 3,
    "sol": "(25-4)/(5-2)=7.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
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
    "cognitive": "Compreensao",
    "focus": "Taxa media de variacao",
    "q": "Geometricamente, a taxa media de variacao entre dois pontos do grafico e",
    "o": [
      "o declive da tangente no primeiro ponto",
      "o declive da reta secante",
      "a area sob o grafico",
      "a ordenada media"
    ],
    "a": 1,
    "sol": "A secante passa pelos dois pontos considerados.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
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
    "focus": "Taxa media de variacao",
    "q": "Uma grandeza de temperatura passa de 12 para 20 em 4 unidades de tempo. Qual e a taxa media?",
    "o": [
      "8",
      "4",
      "2",
      "0.5"
    ],
    "a": 2,
    "sol": "(20-12)/4=2 graus por hora.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
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
    "cognitive": "Aplicacao",
    "focus": "Taxa media de variacao",
    "q": "Para f(x)=x^2, qual e a taxa media de variacao entre x=0 e x=4?",
    "o": [
      "4",
      "5",
      "3",
      "16"
    ],
    "a": 0,
    "sol": "(16-0)/(4-0)=4.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
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
    "cognitive": "Raciocinio",
    "focus": "Taxa media de variacao",
    "q": "Se f(1)=5 e a taxa media em [1,4] e 3, quanto vale f(4)?",
    "o": [
      "14",
      "15",
      "13",
      "8"
    ],
    "a": 0,
    "sol": "[f(4)-5]/(4-1)=3, logo f(4)=14.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
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
    "cognitive": "Compreensao",
    "focus": "Taxa media de variacao",
    "q": "Se f mede distancia em km e t mede tempo em horas, a taxa media tem unidades",
    "o": [
      "km.h",
      "h/km",
      "km/h",
      "km"
    ],
    "a": 2,
    "sol": "As unidades da taxa sao unidades de saida por unidades de entrada.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
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
    "focus": "Taxa media de variacao",
    "q": "Uma grandeza de volume passa de 100 para 160 em 3 unidades de tempo. Qual e a taxa media?",
    "o": [
      "60",
      "3",
      "15",
      "20"
    ],
    "a": 3,
    "sol": "(160-100)/3=20 litros por minuto.",
    "hyp": "Pode confundir variacao total com taxa media ou inverter o quociente.",
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
    "q": "O princípio da multiplicação aplica-se quando um processo é feito em...",
    "o": [
      "alternativas incompatíveis.",
      "etapas sucessivas.",
      "um único caso.",
      "eventos impossíveis."
    ],
    "a": 1,
    "sol": "Se uma escolha é seguida de outra, multiplicam-se as possibilidades por etapa.",
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
    "sol": "Centenas:9 opções; dezenas e unidades:10 cada. 9×10×10=900.",
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
    "sol": "10 escolhas para presidente e 9 para vice:90.",
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
    "q": "Comparando A(n,k) e C(n,k), para k≥1...",
    "o": [
      "A(n,k)=C(n,k)/k!.",
      "A(n,k)=k!·C(n,k).",
      "A(n,k)=C(n,k).",
      "A(n,k)=n^k."
    ],
    "a": 1,
    "sol": "Cada escolha sem ordem de k elementos pode ser ordenada de k! maneiras.",
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
    "q": "Se escolher presidente e vice entre 8 pessoas, devemos usar diretamente C(8,2)?",
    "o": [
      "Sim, sempre.",
      "Só se houver 8 cargos.",
      "Só se as pessoas forem iguais.",
      "Não, porque os cargos distinguem a ordem/função."
    ],
    "a": 3,
    "sol": "O par escolhido pode ocupar os dois cargos de 2 formas.",
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
    "q": "Uma app escolhe 3 tópicos distintos entre 12 para uma revisão, sem ordem. Quantas seleções?",
    "o": [
      "220.",
      "1320.",
      "1728.",
      "36."
    ],
    "a": 0,
    "sol": "C(12,3)=220.",
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
    "q": "Quantas palavras de 2 letras sobre {A,B,C} há? Uma tabela 3×3 mostraria...",
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
    "q": "Num problema de contagem, listar casos de forma sistemática ajuda a evitar...",
    "o": [
      "omissões e duplicações.",
      "apenas cálculos com decimais.",
      "uso de símbolos.",
      "qualquer necessidade de raciocínio."
    ],
    "a": 0,
    "sol": "Uma organização consistente permite verificar cobertura e exclusividade.",
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
    "sol": "As categorias são ramos alternativos:5+2+6=13.",
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
    "q": "Quantas palavras de 2 letras sobre {A,B,C} existem se não são permitidas letras iguais?",
    "o": [
      "9.",
      "6.",
      "3.",
      "2."
    ],
    "a": 1,
    "sol": "Das 9, retiram-se AA,BB,CC: restam 6.",
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
    "q": "A expressão n! cresce, para n natural positivo, de forma...",
    "o": [
      "muito rápida.",
      "linear.",
      "constante.",
      "decrescente."
    ],
    "a": 0,
    "sol": "Cada novo termo multiplica o anterior por n+1.",
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
    "sol": "Depois de cada pessoa colocada resta uma opção a menos.",
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
    "sol": "Bloco AB com ordem fixa + 4 pessoas =5 blocos:5!=120.",
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
    "q": "Se trocarmos duas posições numa permutação de objetos distintos...",
    "o": [
      "a permutação mantém-se sempre igual.",
      "obtemos em geral uma permutação diferente.",
      "a ordem deixa de importar.",
      "o número de objetos muda."
    ],
    "a": 1,
    "sol": "A identidade dos objetos por posição muda.",
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
    "sol": "São as permutações das 7 tarefas:7!.",
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
    "sol": "Bloco ABC +3 pessoas =4 blocos:4!×3!=24×6=144.",
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
    "sol": "O denominador anula-se em x=0.",
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
    "sol": "Um fator cancelado pode criar apenas uma descontinuidade removível.",
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
    "q": "Para f(x)=(x²+2x+3)/(x+1), a divisão dá...",
    "o": [
      "x+2+1/(x+1).",
      "x+1+2/(x+1).",
      "x+1.",
      "x+3."
    ],
    "a": 1,
    "sol": "(x+1)(x+1)=x²+2x+1, sobra 2.",
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
    "sol": "y²−13y+36=(y−4)(y−9), logo x²=4 ou 9.",
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
    "sol": "Cada zero real distinto corresponde a uma interseção com Ox.",
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
    "q": "O grau do resto R na divisão por um divisor de grau 2 deve ser...",
    "o": [
      "igual a 2.",
      "inferior a 2.",
      "superior a 2.",
      "sempre 0."
    ],
    "a": 1,
    "sol": "O resto tem grau estritamente inferior ao do divisor.",
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
    "sol": "O divisor tem grau 1, logo o resto tem grau inferior a 1.",
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
    "q": "Divide x³−6x²+11x−6 por x−2. O quociente é...",
    "o": [
      "x²−5x+3.",
      "x²−4x+3.",
      "x²−4x−3.",
      "x²+4x+3."
    ],
    "a": 1,
    "sol": "Ruffini com 2 dá 1,−4,3 e resto 0.",
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
    "sol": "Multiplicam-se os valores de f e g.",
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
    "q": "Se f(x)=√x e g(x)=x−4, o domínio de f∘g é...",
    "o": [
      "[0,+∞[.",
      "R.",
      "[4,+∞[.",
      "]−∞,4]."
    ],
    "a": 2,
    "sol": "É preciso g(x)=x−4≥0.",
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
      "deixa de importar."
    ],
    "a": 0,
    "sol": "Pontos onde o denominador original era zero continuam excluídos.",
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
    "q": "Restringindo f(x)=x² a [0,+∞[, a inversa é...",
    "o": [
      "√x.",
      "−√x.",
      "x/2.",
      "1/x²."
    ],
    "a": 0,
    "sol": "No ramo não negativo, x² é injetiva e a operação inversa é a raiz quadrada principal.",
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
    "q": "Se f(x)=2x−1 e g(x)=x², então (f∘g)(x)=",
    "o": [
      "2x²−1.",
      "(2x−1)².",
      "x²−1.",
      "2x−x²."
    ],
    "a": 0,
    "sol": "f(x²)=2x²−1.",
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
    "q": "A função f(x)=(x²−1)/(x−1) coincide com y=x+1 exceto...",
    "o": [
      "em x=−1.",
      "em x=0.",
      "no ponto x=1, que está excluído.",
      "em todo o domínio."
    ],
    "a": 2,
    "sol": "A expressão original não está definida em x=1.",
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
    "q": "Se x=a é raiz de multiplicidade 2, então P tem fator...",
    "o": [
      "(x−a)².",
      "x−2a.",
      "(x+a)².",
      "x²−a."
    ],
    "a": 0,
    "sol": "Multiplicidade 2 significa o fator linear repetido duas vezes.",
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
    "q": "Num modelo polinomial, P(t)=0 representa frequentemente...",
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
    "q": "Se ||u||=3, ||v||=4 e θ=60°, então u·v=",
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
    "q": "Se u·v>0, então θ é...",
    "o": [
      "reto.",
      "obtuso.",
      "agudo.",
      "sempre 0."
    ],
    "a": 2,
    "sol": "cosθ>0 em ]0,π/2[.",
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
    "q": "Uma força de 10 N atua num deslocamento de 5 m formando 60°. O produto escalar F·d é...",
    "o": [
      "50.",
      "25.",
      "15.",
      "100."
    ],
    "a": 1,
    "sol": "10×5×cos60°=25.",
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
    "sol": "m=(8−2)/(4−1)=2, logo α=arctan2.",
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
    "q": "Uma estrada sobe 1 m por cada 10 m na horizontal. A sua inclinação é aproximadamente...",
    "o": [
      "arctan(0,1).",
      "arctan(10).",
      "sin⁻¹(0,1) obrigatoriamente.",
      "0,1 rad exatamente."
    ],
    "a": 0,
    "sol": "Declive e inclinação relacionam-se por m=tan α.",
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
    "q": "A distância de um ponto P a um plano α é...",
    "o": [
      "qualquer segmento até um ponto do plano.",
      "o comprimento do segmento perpendicular de P ao plano.",
      "a norma de P.",
      "a distância à origem."
    ],
    "a": 1,
    "sol": "A distância mínima é medida na direção normal ao plano.",
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
    "sol": "A segunda simplifica para x+y+z−3=0; distância=3/√3=√3.",
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
    "q": "A fórmula de distância ponto-plano pode ser vista como...",
    "o": [
      "a norma do vetor posição do ponto.",
      "o produto vetorial com a origem.",
      "o valor absoluto da projeção do vetor entre o ponto e um ponto do plano sobre uma normal unitária.",
      "a soma das coordenadas."
    ],
    "a": 2,
    "sol": "A distância é a componente normal do deslocamento.",
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
    "sol": "É o análogo tridimensional da distância entre retas paralelas.",
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
    "q": "Um vetor perpendicular a (a,b) pode ser...",
    "o": [
      "(a,b).",
      "(−a,−b).",
      "(b,a) sempre.",
      "(−b,a)."
    ],
    "a": 3,
    "sol": "a(−b)+ba=0.",
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
    "q": "Uma força F=(10,0) atua num deslocamento d=(3,4). O produto F·d é...",
    "o": [
      "40.",
      "30.",
      "50.",
      "70."
    ],
    "a": 1,
    "sol": "10×3+0×4=30.",
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
    "q": "As retas de diretores (1,2) e (2,4) são...",
    "o": [
      "perpendiculares.",
      "paralelas.",
      "de ângulo 45°.",
      "sem relação."
    ],
    "a": 1,
    "sol": "(2,4)=2(1,2).",
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
    "q": "Uma rampa tem direção v=(3,0,1) e o chão horizontal tem normal n=(0,0,1). O seno do ângulo da rampa com o chão é...",
    "o": [
      "3/√10.",
      "1/√10.",
      "1/3.",
      "√10."
    ],
    "a": 1,
    "sol": "sinβ=|v·n|/(||v||||n||)=1/√10.",
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
    "q": "Qual é o ângulo entre os planos x=0 e x+y=0?",
    "o": [
      "90°.",
      "45°.",
      "30°.",
      "60°."
    ],
    "a": 1,
    "sol": "Normais n1=(1,0,0), n2=(1,1,0); cosθ=1/√2.",
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
    "q": "Qual modelo descreve melhor 100,110,121,133,1,...?",
    "o": [
      "PG de razão 1,1.",
      "PA de razão 10.",
      "PA de razão 11.",
      "PG de razão 10."
    ],
    "a": 0,
    "sol": "Cada termo é 1,1 vezes o anterior.",
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
    "q": "Uma população de 500 aumenta 10% por período. Qual é o 4.º valor se o primeiro é 500?",
    "o": [
      "650.",
      "550.",
      "605.",
      "665,5."
    ],
    "a": 3,
    "sol": "500×1,1³=665,5.",
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
    "sol": "É a fórmula da soma geométrica finita.",
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
    "q": "Numa PA, a soma de um número ímpar de termos consecutivos é igual a...",
    "o": [
      "n vezes o primeiro termo.",
      "n vezes a razão.",
      "n vezes o termo central.",
      "metade do último termo."
    ],
    "a": 2,
    "sol": "A média dos termos é o termo central.",
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
    "q": "Na sucessão (u_n), u_5 representa...",
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
    "q": "Um ângulo coterminal em [0,360[ com 765° é...",
    "o": [
      "45°",
      "135°",
      "225°",
      "315°"
    ],
    "a": 0,
    "sol": "765−720=45°.",
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
    "q": "Um ângulo coterminal em [0,2π[ com 17π/6 é...",
    "o": [
      "11π/6",
      "5π/6",
      "π/6",
      "7π/6"
    ],
    "a": 1,
    "sol": "17π/6−12π/6=5π/6.",
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
    "sol": "O ponto associado tem coordenadas (cos θ,sin θ).",
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
    "sol": "A coordenada vertical é sin(5π/3)=−√3/2.",
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
    "q": "No círculo trigonométrico, sin θ corresponde...",
    "o": [
      "à abcissa.",
      "ao raio.",
      "à ordenada do ponto associado.",
      "ao comprimento do arco."
    ],
    "a": 2,
    "sol": "O ponto associado tem coordenadas (cos θ,sin θ).",
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
    "q": "Quanto vale sin(π/6)?",
    "o": [
      "1/2",
      "√2/2",
      "√3/2",
      "1"
    ],
    "a": 0,
    "sol": "É um valor notável.",
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
    "q": "Em [0,2π[, sin x=1/2 tem soluções...",
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
    "q": "A equação cos x=0 tem soluções...",
    "o": [
      "x=kπ.",
      "x=π/2+kπ, k∈Z.",
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
    "sol": "O cosseno também tem imagem [−1,1].",
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
    "q": "A altura de uma maré simplificada é h(t)=2+sin t. Em [0,2π[, quando h(t)=2?",
    "o": [
      "t=π/2 e 3π/2.",
      "t=π apenas.",
      "t=0 apenas.",
      "t=0 e t=π."
    ],
    "a": 3,
    "sol": "h=2 implica sin t=0.",
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
    "q": "A equação tan x=0 tem soluções...",
    "o": [
      "x=π/2+kπ.",
      "x=π/4+kπ.",
      "x=kπ, k∈Z.",
      "x=2kπ apenas."
    ],
    "a": 2,
    "sol": "tan x=0 quando sin x=0 e cos x≠0, isto é, x=kπ.",
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
    "q": "Resolve sin²x=1 em [0,2π[.",
    "o": [
      "0 e π.",
      "π/2 e 3π/2.",
      "π/4 e 5π/4.",
      "π/2 apenas."
    ],
    "a": 1,
    "sol": "sin²x=1 implica sin x=±1.",
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
      "−π.",
      "1."
    ],
    "a": 1,
    "sol": "O cosseno atinge −1.",
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
    "q": "O gráfico de y=sin x deslocado 2 unidades para cima torna-se...",
    "o": [
      "y=sin(x+2).",
      "y=2sin x.",
      "y=sin x+2.",
      "y=sin x−2."
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
      "R.",
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
    "q": "No modelo y=A sin(Bx+C)+D, D representa...",
    "o": [
      "o deslocamento vertical/eixo médio.",
      "a amplitude.",
      "o período.",
      "a frequência angular."
    ],
    "a": 0,
    "sol": "D desloca todo o gráfico verticalmente.",
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
    "q": "Num triângulo retângulo, tan α=3/4 e o cateto adjacente mede 8. O cateto oposto mede...",
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
    "q": "Num triângulo retângulo, cos α é...",
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
    "q": "Se A=90°, a Lei dos Cossenos reduz-se a...",
    "o": [
      "a²=b²+c².",
      "a=b+c.",
      "a²=b²−c².",
      "a²=2bc."
    ],
    "a": 0,
    "sol": "cos90°=0.",
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
    "q": "Dois observadores A e B estão a 100 m um do outro e veem um ponto C com ângulos internos A=45° e B=60°. Quanto mede C?",
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
    "q": "Num triângulo retângulo, relativamente a α, o cateto oposto mede 3 e a hipotenusa 5. Então sin α=",
    "o": [
      "4/5",
      "3/4",
      "5/3",
      "3/5"
    ],
    "a": 3,
    "sol": "sin α=oposto/hipotenusa=3/5.",
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
    "q": "Num triângulo, a=7, A=30° e B=45°. Pela Lei dos Senos, b é aproximadamente...",
    "o": [
      "7,00",
      "9,90",
      "4,95",
      "14,00"
    ],
    "a": 1,
    "sol": "b=7 sin45°/sin30°=7(√2/2)/(1/2)=7√2≈9,90.",
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
    "q": "Se sin x=5/13 e x está no 1.º quadrante, então cos x=",
    "o": [
      "−12/13",
      "12/13",
      "5/12",
      "8/13"
    ],
    "a": 1,
    "sol": "cos²x=1−25/169=144/169 e no 1.º quadrante cos>0.",
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
    "q": "Quando cos x≠0, tan x é igual a...",
    "o": [
      "cos x/sin x.",
      "sin x/cos x.",
      "sin x·cos x.",
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
    "q": "Se sin x=4/5 e x∈]π/2,π[, então tan x=",
    "o": [
      "4/3",
      "−3/4",
      "−4/3",
      "3/4"
    ],
    "a": 2,
    "sol": "cos x=−3/5 e tan=(4/5)/(−3/5)=−4/3.",
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
    "q": "No 2.º quadrante, tan x é...",
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
    "sol": "cos=5/13; tan=(12/13)/(5/13)=12/5.",
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
    "q": "Se sin x=0 e cos x≠0, então tan x=",
    "o": [
      "1.",
      "não existe.",
      "0.",
      "cos x."
    ],
    "a": 2,
    "sol": "tan x=sin x/cos x=0.",
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
    "q": "Se tan x=1 e x∈]π,3π/2[, então sin x=",
    "o": [
      "−√2/2",
      "√2/2",
      "−1/2",
      "1/2"
    ],
    "a": 0,
    "sol": "No 3.º quadrante seno e cosseno são negativos com igual módulo.",
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
    "q": "Um deslocamento no plano é representado por z=4+3i. A distância total à origem é...",
    "o": [
      "7.",
      "5.",
      "12.",
      "25."
    ],
    "a": 1,
    "sol": "É o módulo de z.",
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
    "q": "A condição |z−z1|=|z−z2| descreve...",
    "o": [
      "a mediatriz do segmento que une z1 e z2.",
      "a reta z1z2.",
      "uma circunferência de centro z1.",
      "apenas o ponto médio."
    ],
    "a": 0,
    "sol": "São os pontos equidistantes de z1 e z2.",
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
    "q": "Um ponto complexo z=6−8i está a que distância da origem?",
    "o": [
      "14.",
      "100.",
      "2.",
      "10."
    ],
    "a": 3,
    "sol": "|z|=√(36+64)=10.",
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
    "q": "Um número real r, visto em C, escreve-se...",
    "o": [
      "0+ri.",
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
    "q": "Na forma r(cosθ+i sinθ), r representa...",
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
    "q": "Na forma z=r(cosθ+i sinθ), θ representa...",
    "o": [
      "o módulo.",
      "a parte real.",
      "um argumento de z.",
      "a parte imaginária."
    ],
    "a": 2,
    "sol": "θ determina a direção do vetor complexo.",
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
    "q": "Se arg(z)=0 mod2π, então z é...",
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
      "ac−bd.",
      "ad−bc."
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
      "(ac−bd)i.",
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
    "q": "Se z1=r1(cosα+i sinα) e z2=r2(cosβ+i sinβ), então um argumento de z1z2 é...",
    "o": [
      "α−β.",
      "α+β.",
      "αβ.",
      "α/β."
    ],
    "a": 1,
    "sol": "Na multiplicação, somam-se argumentos.",
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
    "q": "Multiplicar por um complexo de módulo 2 e argumento π/3 corresponde geometricamente a...",
    "o": [
      "uma dilatação de fator 2 e rotação de π/3.",
      "apenas uma rotação.",
      "apenas uma dilatação.",
      "uma reflexão."
    ],
    "a": 0,
    "sol": "Módulo controla escala e argumento controla rotação.",
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
    "q": "No quociente z1/z2, com z2≠0, o módulo é...",
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
    "q": "√(−9), no conjunto dos complexos, pode escrever-se como...",
    "o": [
      "3i.",
      "−3.",
      "9i.",
      "i/3."
    ],
    "a": 0,
    "sol": "√(−9)=√9·i=3i, tomando a raiz principal.",
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
      "um imaginário puro.",
      "um número sem módulo.",
      "um número complexo com parte imaginária zero.",
      "um complexo com parte real zero."
    ],
    "a": 2,
    "sol": "R⊂C e a+0i representa qualquer real.",
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
    "q": "i³ é igual a...",
    "o": [
      "i.",
      "−i.",
      "1.",
      "−1."
    ],
    "a": 1,
    "sol": "i³=i²·i=−i.",
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
    "sol": "Ambas as potências têm resto 2 mod4 e valem −1.",
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
    "q": "Resolve log_2(x−1)=log_2 7.",
    "o": [
      "x=7.",
      "x=8.",
      "x=6.",
      "x=14."
    ],
    "a": 1,
    "sol": "x−1=7 =>x=8.",
    "hyp": "Pode responder o argumento7.",
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
    "sol": "1/9=3^−2.",
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
      "x=ln5/ln2.",
      "x=ln2/ln5.",
      "x=5/2.",
      "x=ln10."
    ],
    "a": 0,
    "sol": "x ln2=ln5, logo x=ln5/ln2.",
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
    "q": "Resolve log_2 x+log_2 4=5.",
    "o": [
      "x=4.",
      "x=16.",
      "x=8.",
      "x=32."
    ],
    "a": 2,
    "sol": "log_2 x+2=5 =>log_2 x=3 =>x=8.",
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
    "q": "Uma população P(t)=1000·1,05^t atinge2000 quando t satisfaz...",
    "o": [
      "t=2/1,05.",
      "t=ln2·ln1,05.",
      "t=ln2/ln1,05.",
      "t=ln1,05/ln2."
    ],
    "a": 2,
    "sol": "1,05^t=2 =>t ln1,05=ln2.",
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
    "q": "Resolve log_2 x=4.",
    "o": [
      "x=8.",
      "x=6.",
      "x=16.",
      "x=2."
    ],
    "a": 2,
    "sol": "x=2^4=16.",
    "hyp": "Pode multiplicar2×4.",
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
      "ln7/ln3.",
      "ln7/(2ln3).",
      "2ln7/ln3.",
      "ln3/(2ln7)."
    ],
    "a": 1,
    "sol": "2x ln3=ln7.",
    "hyp": "Pode esquecer o fator2 do expoente.",
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
    "q": "Se a>1, a função f(x)=a^x é...",
    "o": [
      "decrescente.",
      "estritamente crescente.",
      "constante.",
      "alternada."
    ],
    "a": 1,
    "sol": "Bases superiores a1 geram crescimento exponencial.",
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
    "q": "Uma quantidade multiplica por1,05 a cada período. O fator1,05 indica...",
    "o": [
      "decréscimo de5%.",
      "aumento absoluto de1,05 unidades.",
      "crescimento de5% por período.",
      "duplicação a cada período."
    ],
    "a": 2,
    "sol": "1,05=1+0,05, portanto há acréscimo relativo de5%.",
    "hyp": "Pode ler1,05 como105% de aumento em vez de105% do valor anterior.",
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
    "q": "A imagem de y=−2^x+1 é...",
    "o": [
      "]1,+∞[.",
      "]−∞,1[.",
      "]−∞,0[.",
      "R."
    ],
    "a": 1,
    "sol": "−2^x<0, logo−2^x+1<1; aproxima-se de1 sem atingir.",
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
    "q": "A notação f^−1 deve ser distinguida de...",
    "o": [
      "1/f, o recíproco dos valores da função.",
      "f∘g.",
      "f(x+1).",
      "f²(x) como domínio."
    ],
    "a": 0,
    "sol": "f^−1 significa função inversa, enquanto1/f é a função recíproca quando definida.",
    "hyp": "Pode tratar o expoente−1 como recíproco em qualquer contexto funcional.",
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
    "q": "Se f(a)=b e f é invertível, então...",
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
    "q": "O domínio de f(x)=log_2 x é...",
    "o": [
      "]0,+∞[.",
      "R.",
      "[0,+∞[.",
      "R\\{0}."
    ],
    "a": 0,
    "sol": "O argumento do logaritmo tem de ser positivo.",
    "hyp": "Pode incluir0.",
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
    "q": "log_2 8 é...",
    "o": [
      "2.",
      "4.",
      "3.",
      "8."
    ],
    "a": 2,
    "sol": "2³=8.",
    "hyp": "Pode dividir8 por2.",
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
    "q": "log_2 x+log_2 y simplifica para...",
    "o": [
      "log_2(x+y).",
      "log_2(xy).",
      "log_2(x/y).",
      "log_2 x·y."
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
    "q": "O gráfico de y=log_a x passa sempre por...",
    "o": [
      "(0,1).",
      "(0,0).",
      "(1,0).",
      "(1,1)."
    ],
    "a": 2,
    "sol": "log_a1=0.",
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
    "q": "O gráfico de y=log_a x é a reflexão do gráfico de y=a^x relativamente a...",
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
    "q": "Para log_a x real, exige-se...",
    "o": [
      "a<0 e x>0.",
      "a>0, a≠1 e x>0.",
      "a>1 e x∈R.",
      "a≠0 e x≠0."
    ],
    "a": 1,
    "sol": "A base tem de ser positiva e diferente de1; o argumento tem de ser positivo.",
    "hyp": "Pode permitir argumento negativo ou base1.",
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
    "q": "A fórmula de mudança de base é...",
    "o": [
      "log_a x=log_b x/log_b a.",
      "log_a x=log_b a/log_b x.",
      "log_a x=log_b(ax).",
      "log_a x=a log_b x."
    ],
    "a": 0,
    "sol": "Para uma base b válida, divide-se o logaritmo do argumento pelo da base original.",
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
    "q": "Uma população de2000 cresce10% ao ano. Um modelo é...",
    "o": [
      "P(t)=2000+0,1t.",
      "P(t)=2000·1,1^t.",
      "P(t)=2000·0,9^t.",
      "P(t)=1,1·2000t."
    ],
    "a": 1,
    "sol": "O valor inicial é2000 e o fator anual é1,10.",
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
    "q": "Se 0<a<1 em Q(t)=Q0·a^t, o modelo representa...",
    "o": [
      "crescimento linear.",
      "decrescimento exponencial.",
      "crescimento exponencial.",
      "oscilação."
    ],
    "a": 1,
    "sol": "A quantidade é multiplicada repetidamente por um fator inferior a1.",
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
    "q": "Uma população passa de500 para605 em2 anos com taxa anual constante. O fator anual é...",
    "o": [
      "1,1.",
      "1,21.",
      "1,105.",
      "1,05."
    ],
    "a": 0,
    "sol": "605/500=1,21=1,1², logo fator anual1,1.",
    "hyp": "Pode usar o crescimento total21% como taxa anual.",
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
    "q": "Num modelo A(t)=1200·1,07^t, o número1200 é...",
    "o": [
      "a taxa de7%.",
      "o fator de crescimento.",
      "o valor após1 período.",
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
      "0 e70%.",
      "50 e70%.",
      "50 e30%.",
      "50 e7%."
    ],
    "a": 2,
    "sol": "Valor inicial50; fator0,7 significa perda30%.",
    "hyp": "Pode interpretar0,7 como perda70%.",
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
    "q": "Um investimento passa de1000€ para1210€ em2 anos, com taxa anual constante. A taxa anual é...",
    "o": [
      "21%.",
      "10%.",
      "10,5%.",
      "20%."
    ],
    "a": 1,
    "sol": "1210/1000=1,21=1,1².",
    "hyp": "Pode dividir21% por2 e obter10,5%, ignorando composição.",
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
    "q": "Se f'(x)=2x−4, o ponto crítico é...",
    "o": [
      "x=4.",
      "x=2.",
      "x=−2.",
      "x=0."
    ],
    "a": 1,
    "sol": "2x−4=0 => x=2.",
    "hyp": "Pode igualar apenas x a4.",
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
    "q": "Uma receita é R(q)=20q−q². Para maximizar R, devemos resolver...",
    "o": [
      "R'(q)=0.",
      "R(q)=0 apenas.",
      "R''(q)=0.",
      "q=20 obrigatoriamente."
    ],
    "a": 0,
    "sol": "Candidatos interiores a máximo surgem de R'(q)=0.",
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
    "q": "Para f'(x)=2x−4, f é decrescente em...",
    "o": [
      "]2,+∞[.",
      "R.",
      "]−∞,2[.",
      "nenhum intervalo."
    ],
    "a": 2,
    "sol": "2x−4<0 quando x<2.",
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
    "q": "Se f'(x)=(x−1)(x+2), então f é crescente em...",
    "o": [
      "]−∞,−2[∪]1,+∞[.",
      "]−2,1[.",
      "R.",
      "]−∞,1[."
    ],
    "a": 0,
    "sol": "O produto é positivo fora das raízes −2 e1.",
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
    "sol": "C'=2x−12=0.",
    "hyp": "Pode usar o coeficiente linear sem dividir por2.",
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
      "só diferem por uma constante.",
      "têm sempre o mesmo domínio.",
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
    "sol": "Passa por (0,1) e tem declive1.",
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
    "q": "No modelo P'(t)=kP(t), se k>0...",
    "o": [
      "a taxa de crescimento é proporcional à população e positiva.",
      "a população é constante.",
      "a taxa é sempre decrescente.",
      "P(t) pode ser negativa."
    ],
    "a": 0,
    "sol": "k>0 e P>0 implicam crescimento positivo.",
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
    "q": "A derivada de sin x é...",
    "o": [
      "−sin x.",
      "cos x.",
      "−cos x.",
      "tan x."
    ],
    "a": 1,
    "sol": "(sin x)'=cos x.",
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
    "q": "A derivada de ln(sin x), onde sin x>0, é...",
    "o": [
      "cos x/sin x.",
      "sin x/cos x.",
      "1/sin x.",
      "−sin x."
    ],
    "a": 0,
    "sol": "g'/g=cosx/sinx.",
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
    "q": "A derivada de cos x é...",
    "o": [
      "sin x.",
      "cos x.",
      "−sin x.",
      "−cos x."
    ],
    "a": 2,
    "sol": "(cos x)'=−sin x.",
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
    "q": "A derivada de ln(cos x), onde cos x>0, é...",
    "o": [
      "cos x/sin x.",
      "−sin x/cos x.",
      "sin x/cos x.",
      "−cos x."
    ],
    "a": 1,
    "sol": "g'/g=(−sinx)/cosx.",
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
    "sol": "Produto:1·lnx+x·1/x=lnx+1.",
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
    "sol": "Cadeia:2lnx·1/x.",
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
    "q": "A derivada de x sin x é...",
    "o": [
      "cos x.",
      "x cos x.",
      "sin x−x cos x.",
      "sin x+x cos x."
    ],
    "a": 3,
    "sol": "Produto: sinx+xcosx.",
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
    "q": "A regra do quociente é...",
    "o": [
      "(f/g)'=f'/g'.",
      "(f/g)'=(f'g+fg')/g².",
      "(f/g)'=(fg'−f'g)/g².",
      "(f/g)'=(f'g−fg')/g²."
    ],
    "a": 3,
    "sol": "Numerador: derivada do de cima vezes o de baixo menos o de cima vezes derivada do de baixo.",
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
    "q": "A derivada de √(3x+1) é...",
    "o": [
      "3/[2√(3x+1)].",
      "1/[2√(3x+1)].",
      "3√(3x+1).",
      "1/√(3x+1)."
    ],
    "a": 0,
    "sol": "(1/2)(3x+1)^{-1/2}·3.",
    "hyp": "Pode esquecer o fator3.",
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
    "sol": "É polinomial e a regra da potência dá2x.",
    "hyp": "Pode esquecer o fator2.",
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
    "sol": "Por exemplo, |x| é contínua mas não derivável em0.",
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
    "q": "Considere f(x)=x² para x≤1 e f(x)=ax+b para x>1. Continuidade em1 exige...",
    "o": [
      "a+b=1.",
      "a+b=2.",
      "2a+b=1.",
      "a=2."
    ],
    "a": 0,
    "sol": "O valor do ramo esquerdo em1 é1.",
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
    "q": "√x é contínua em0 mas...",
    "o": [
      "é descontínua em0.",
      "tem derivada0.",
      "tem derivada1.",
      "não é derivável em0 com derivada real finita."
    ],
    "a": 3,
    "sol": "O quociente incremental é1/√h→+∞ pela direita.",
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
    "q": "Para f(x)=√x, a linearização em x=4 é L(x)=2+(x−4)/4. Usando-a, √4,1 é aproximadamente...",
    "o": [
      "2,05.",
      "2,025.",
      "2,1.",
      "2,0025."
    ],
    "a": 1,
    "sol": "L(4,1)=2+0,1/4=2,025.",
    "hyp": "Pode multiplicar o incremento por4.",
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
    "q": "A função |x| é derivável em0?",
    "o": [
      "Sim, com derivada0.",
      "Sim, com derivada1.",
      "Não.",
      "Sim, com derivada−1."
    ],
    "a": 2,
    "sol": "As derivadas laterais são −1 e1.",
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
    "q": "Considere f(x)=x² para x≤1 e f(x)=ax+b para x>1. Para além da continuidade em1, a derivabilidade em1 exige...",
    "o": [
      "a=1.",
      "a=2.",
      "b=2.",
      "a+b=2."
    ],
    "a": 1,
    "sol": "Derivada esquerda de x² em1 é2; derivada direita da reta éa.",
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
    "q": "Se f'(x)<0 antes de2 e f'(x)>0 depois de2, então x=2 é...",
    "o": [
      "máximo local.",
      "assíntota.",
      "mínimo local.",
      "ponto de inflexão obrigatório."
    ],
    "a": 2,
    "sol": "Passa de decrescente a crescente.",
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
    "sol": "f''=6x<0 em−1.",
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
      "é sempre descontinuidade.",
      "pode não ser extremo."
    ],
    "a": 3,
    "sol": "Por exemplo x³ em0.",
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
    "q": "Num modelo de concentração C(t), um máximo local representa...",
    "o": [
      "um instante em que C=0.",
      "necessariamente o fim do processo.",
      "uma descontinuidade.",
      "um instante em que a concentração deixa de aumentar e começa a diminuir."
    ],
    "a": 3,
    "sol": "Traduz a mudança de sinal de C'.",
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
    "q": "Um máximo absoluto de f num domínio é um ponto onde...",
    "o": [
      "f'=0 obrigatoriamente.",
      "f=0.",
      "f atinge o maior valor do domínio considerado.",
      "f''=0."
    ],
    "a": 2,
    "sol": "É uma definição global, podendo ocorrer numa fronteira.",
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
    "q": "Se os limites laterais em a existem mas são diferentes, então...",
    "o": [
      "o limite é a média dos laterais.",
      "o limite bilateral em a não existe.",
      "f é contínua.",
      "o limite é zero."
    ],
    "a": 1,
    "sol": "Para existir limite bilateral, os dois laterais devem coincidir.",
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
    "q": "A função f(x)=x² é contínua em...",
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
    "q": "A função f(x)=|x| é contínua em0?",
    "o": [
      "Sim.",
      "Não, porque não é derivável em0.",
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
      "às10h30 era exatamente20°C.",
      "a derivada foi sempre4.",
      "em algum instante a temperatura foi20°C."
    ],
    "a": 3,
    "sol": "O TVI garante que20°C foi atingido, mas não quando nem monotonia.",
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
      "Não, nem está definida em2.",
      "Sim, porque há assíntota.",
      "Só se definirmos f(2)=0."
    ],
    "a": 1,
    "sol": "O denominador anula-se em2.",
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
    "q": "A função e^x cos x é contínua em...",
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
    "q": "A função f(x)=ln(x²+1) é contínua em...",
    "o": [
      "todo R.",
      "x>0 apenas.",
      "R\\{0}.",
      "|x|>1."
    ],
    "a": 0,
    "sol": "x²+1>0 para todo x.",
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
      "Sim, é0.",
      "Não; é preciso analisar o comportamento.",
      "Sim, é lim f.",
      "Sim, é infinito sempre."
    ],
    "a": 1,
    "sol": "Denominador a tender a0 pode originar vários comportamentos.",
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
    "q": "Se lim f=L, então lim e^{f(x)}=",
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
    "q": "Se X tem média50 e desvio padrão10, então uma média de25 observações tem média...",
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
    "q": "Uma média de tempos de espera baseada em n=400 terá, face a n=100 e mesmo σ, erro padrão...",
    "o": [
      "um quarto.",
      "metade.",
      "quádruplo.",
      "igual."
    ],
    "a": 1,
    "sol": "√400=20 e√100=10.",
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
    "q": "Se X tem média 50 e desvio padrão 10, qual é o desvio padrão de X̄ para amostras de dimensão 25?",
    "o": [
      "10.",
      "2.",
      "0,4.",
      "50."
    ],
    "a": 1,
    "sol": "10/√25=2.",
    "hyp": "Pode dividir por25.",
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
    "q": "Numa amostra de100 pessoas, 64 respondem 'sim'. A estimativa pontual de p é...",
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
    "q": "Um pequeno viés pode ser aceitável se permitir...",
    "o": [
      "variância infinita.",
      "grande redução de variância e menor erro global.",
      "ignorar o parâmetro.",
      "eliminar os dados."
    ],
    "a": 1,
    "sol": "Há trade-offs entre viés e variância em alguns estimadores.",
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
    "q": "O erro quadrático médio (EQM/MSE) combina...",
    "o": [
      "variância e viés ao quadrado.",
      "apenas média e mediana.",
      "erro padrão e n por soma.",
      "apenas viés."
    ],
    "a": 0,
    "sol": "MSE=Var(θ̂)+Bias(θ̂)².",
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
    "q": "Uma empresa quer estimar satisfação e tem 70% clientes particulares e30% empresariais. Numa amostra proporcional de200, quantos empresariais?",
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
      "a cada amostra possível de mesmo tamanho uma chance apropriada de seleção."
    ],
    "a": 3,
    "sol": "A seleção aleatória reduz mecanismos sistemáticos de preferência.",
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
      "o procedimento cobre o parâmetro em cerca de95% de repetições sob as condições.",
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
      "multiplicar n por8."
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
    "q": "Uma sondagem dá p̂=0,52 com IC95% [0,49;0,55]. Uma leitura cuidadosa é...",
    "o": [
      "os dados são compatíveis com valores próximos de metade e não sustentam uma separação clara de0,50 ao nível considerado.",
      "p=0,52 exatamente.",
      "há 95% dos eleitores entre0,49 e0,55.",
      "p>0,5 está provado."
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
      "parâmetro−estimativa."
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
    "q": "Passar de 95% para99% de confiança, com mesmos dados, faz a margem...",
    "o": [
      "diminuir.",
      "ficar igual.",
      "aumentar.",
      "mudar de sinal."
    ],
    "a": 2,
    "sol": "O quantil crítico99% é maior.",
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
    "q": "Suponha X̄≈N(100,2²). O valor z associado a X̄=104 é...",
    "o": [
      "2.",
      "1.",
      "4.",
      "0,5."
    ],
    "a": 0,
    "sol": "z=(104−100)/2=2.",
    "hyp": "Pode dividir pela variância4.",
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
    "q": "Se n passa de25 para100, o erro padrão...",
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
    "q": "Aproximar P(X≤20) para X Binomial por Normal pode usar fronteira...",
    "o": [
      "20.",
      "19,5 sempre.",
      "21,5.",
      "20,5."
    ],
    "a": 3,
    "sol": "A correção típica inclui toda a barra de X=20 até20,5.",
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
    "q": "A média aproximada da distribuição de X̄ é...",
    "o": [
      "μ/n.",
      "nμ.",
      "μ.",
      "σ."
    ],
    "a": 2,
    "sol": "E(X̄)=μ.",
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
    "q": "Se médias de lotes de64 peças têm μ=10g, σ individual=0,8g, o erro padrão é...",
    "o": [
      "0,8g.",
      "0,0125g.",
      "6,4g.",
      "0,1g."
    ],
    "a": 3,
    "sol": "0,8/8=0,1.",
    "hyp": "Pode dividir por64.",
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
    "q": "Se f(x)≤0 em [a,b], a área geométrica entre o gráfico e Ox é...",
    "o": [
      "∫_a^b f(x)dx.",
      "−∫_a^b f(x)dx.",
      "0.",
      "f(b)−f(a)."
    ],
    "a": 1,
    "sol": "A integral é negativa, por isso a área geométrica é o seu oposto.",
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
    "sol": "x²=2x =>x(x−2)=0.",
    "hyp": "Pode dividir por x e perder0.",
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
    "q": "A integral ∫_{−1}^1 x dx vale0, mas a área geométrica entre y=x e Ox nesse intervalo é...",
    "o": [
      "1.",
      "0.",
      "2.",
      "1/2."
    ],
    "a": 0,
    "sol": "Há dois triângulos de área1/2 cada, sem cancelamento geométrico.",
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
    "q": "Uma velocidade v(t) é positiva entre0 e4 e negativa entre4 e6. A distância total percorrida é...",
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
    "q": "No intervalo [0,2], entre y=2x e y=x², a função superior é...",
    "o": [
      "x².",
      "2x.",
      "são iguais sempre.",
      "depende apenas do sinal de x."
    ],
    "a": 1,
    "sol": "2x−x²=x(2−x)≥0.",
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
    "sol": "Pela aditividade:3+7=10.",
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
    "q": "Se f(x)≥0 em [a,b], então ∫_a^b f...",
    "o": [
      "é sempre zero.",
      "é negativa.",
      "não existe.",
      "é não negativa."
    ],
    "a": 3,
    "sol": "A área algébrica coincide com área geométrica positiva.",
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
    "q": "Se v(t) muda de sinal, ∫v(t)dt representa...",
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
    "sol": "A derivada de x³/3 éx².",
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
    "sol": "Uma primitiva de6t² é2t³.",
    "hyp": "Pode esquecer o coeficiente1/3.",
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
    "q": "Em ]−∞,0[, uma primitiva de1/x pode escrever-se...",
    "o": [
      "ln x.",
      "−ln(−x).",
      "ln(−x).",
      "1/x."
    ],
    "a": 2,
    "sol": "ln(−x)=ln|x| e a sua derivada é1/x para x<0.",
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
    "q": "Para constante k, ∫k f(x)dx=",
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
    "sol": "A constante4 sai da integral.",
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
    "sol": "Derivar e^{3t} dá3e^{3t}.",
    "hyp": "Pode manter o coeficiente3.",
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
    "q": "∫(x+1)e^{x²+2x}dx é proporcional a...",
    "o": [
      "e^{x²+2x}.",
      "ln(x²+2x).",
      "(x+1)².",
      "e^{x+1}."
    ],
    "a": 0,
    "sol": "Derivada de x²+2x é2(x+1), logo a integral é (1/2)e^{x²+2x}+C.",
    "hyp": "Pode não reconhecer o fator2.",
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
    "sol": "Uma primitiva é x²/2; em1 menos em0 dá1/2.",
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
    "sol": "Primitiva2√x;4−2=2.",
    "hyp": "Pode esquecer o fator2.",
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
    "sol": "A'(x)=x−2; em3 dá1.",
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
    "q": "Se A e B têm dimensões 2×3 e3×2, então A+B...",
    "o": [
      "é2×2.",
      "é3×3.",
      "tem6 elementos e por isso existe.",
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
    "sol": "Divide-se cada elemento por2.",
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
    "q": "Em uma matriz de adjacência A, a entrada (A²)_ij conta, em rede simples apropriada...",
    "o": [
      "percursos de comprimento2 de i para j.",
      "ligações diretas apenas.",
      "distância mínima sempre.",
      "grau de i apenas."
    ],
    "a": 0,
    "sol": "Cada termo soma escolhas de um vértice intermédio.",
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
    "q": "Se c é um vetor de custos unitários de recursos e A descreve consumo de recursos por produto, então c^T A pode representar...",
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
    "q": "Se Q=[[10,20],[15,5]] representa quantidades de 2 produtos em 2 lojas, o total de unidades na 1.ª loja é...",
    "o": [
      "25.",
      "35.",
      "30.",
      "50."
    ],
    "a": 2,
    "sol": "Primeira linha:10+20=30.",
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
    "sol": "Dois passos levam cada vértice de volta a si próprio.",
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
    "hyp": "Pode contar todos os9.",
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
    "sol": "A convenção dada fixa 4 linhas e3 colunas.",
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
    "sol": "Multiplica ambas as coordenadas por2.",
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
    "sol": "Duas rotações de90° dão180°, isto é −I.",
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
    "q": "A matriz [[k,0],[0,k]] representa...",
    "o": [
      "uma rotação de90°.",
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
    "hyp": "Pode confundir π com90°.",
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
    "q": "Ao saber que B ocorreu, o novo universo de referência passa a ser...",
    "o": [
      "A.",
      "B.",
      "A∪B.",
      "Ω^c."
    ],
    "a": 1,
    "sol": "Condicionar em B restringe a atenção aos resultados em B.",
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
    "q": "P(A∩B)=0,18 e P(A)=0,6. Então P(B|A)=...",
    "o": [
      "0,18.",
      "0,3.",
      "0,78.",
      "0,6."
    ],
    "a": 1,
    "sol": "0,18/0,6=0,3.",
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
    "q": "Se P(A∩B)=0,2 e P(B)=0,5, então P(A|B)=...",
    "o": [
      "0,2.",
      "0,5.",
      "0,4.",
      "0,7."
    ],
    "a": 2,
    "sol": "0,2/0,5=0,4.",
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
    "hyp": "Pode usar complementos depois de multiplicar:1−0,12.",
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
    "q": "Numa empresa, 40% trabalham remotamente, 30% têm horário flexível e 12% têm ambos. Os dois fatores são...",
    "o": [
      "independentes.",
      "dependentes.",
      "incompatíveis.",
      "complementares."
    ],
    "a": 0,
    "sol": "0,4×0,3=0,12.",
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
    "q": "No lançamento de uma moeda, um espaço de resultados possível é...",
    "o": [
      "{cara}.",
      "{0,1,2}.",
      "{cara,coroa}.",
      "{cara,cara}."
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
    "sol": "Fora de μ±2σ ficam cerca de5%, divididos em duas caudas de2,5%.",
    "hyp": "Pode atribuir os5% todos a uma cauda.",
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
    "q": "Alturas têm modelo N(170,6). Uma altura182 cm está a...",
    "o": [
      "2 desvios-padrão acima da média.",
      "12 desvios-padrão acima.",
      "1 desvio-padrão acima.",
      "2 abaixo."
    ],
    "a": 0,
    "sol": "(182−170)/6=2.",
    "hyp": "Pode usar a diferença12 como número de desvios.",
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
    "q": "X~N(70,10). O intervalo μ±σ é...",
    "o": [
      "[50,90].",
      "[70,80].",
      "[60,80].",
      "[60,90]."
    ],
    "a": 2,
    "sol": "70−10=60 e70+10=80.",
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
    "q": "Uma moeda equilibrada é lançada duas vezes. P(cara e depois cara)=...",
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
    "q": "Se P(A)=0,7, P(B|A)=0,4 e P(B^c|A)=...",
    "o": [
      "0,6.",
      "0,4.",
      "0,3.",
      "1,1."
    ],
    "a": 0,
    "sol": "Os ramos B e B^c a partir de A somam 1:1−0,4=0,6.",
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
    "sol": "Interseção nula significa incompatibilidade probabilística; independência exigiria P(A∩B)=P(A)P(B), o que só acontece se pelo menos um tiver probabilidade 0.",
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
    "q": "Uma fábrica usa máquina M1 em 70% da produção e M2 em 30%. Taxas de defeito:2% e5%. P(defeito)=...",
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
    "sol": "Qualquer média ponderada de dois valores iguais a0,4 vale0,4.",
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
    "q": "Um seguro tem 30% clientes jovens e70% adultos. Sinistro anual:12% jovens,5% adultos. Taxa global de sinistro=...",
    "o": [
      "8,5%.",
      "7,1%.",
      "17%.",
      "5%."
    ],
    "a": 1,
    "sol": "0,3×0,12+0,7×0,05=0,036+0,035=0,071.",
    "hyp": "Pode fazer média simples8,5%.",
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
    "q": "Numa partição {A1,...,An}, P(B) é...",
    "o": [
      "ΣP(Ai).",
      "ΣP(B|Ai).",
      "ΣP(B|Ai)P(Ai).",
      "ΠP(B|Ai)."
    ],
    "a": 2,
    "sol": "Soma-se a probabilidade de B através de cada ramo da partição.",
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
    "q": "Uma doença afeta 1% da população. Um teste dá positivo em99% dos doentes e em5% dos não doentes. P(positivo)=...",
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
    "q": "X assume −1,0,2 com probabilidades0,2;0,5;0,3. E(X)=...",
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
    "q": "Um prémio aleatório paga 100€ com0,01, 10€ com0,09 e0€ com0,90. Valor esperado bruto=...",
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
    "sol": "Os valores possíveis de X formam uma partição do espaço amostral.",
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
    "q": "Se Y=2X+3, então E(Y)=...",
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
    "q": "Se f(1)<0, f(3)>0 e f(2)<0, o novo intervalo é...",
    "o": [
      "[1,2].",
      "[2,3].",
      "[1,3].",
      "[0,2]."
    ],
    "a": 1,
    "sol": "A mudança de sinal ocorre entre2 e3.",
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
    "q": "Para f(x)=x²−2 em [1,2], o primeiro ponto médio é1,5 e f(1,5)>0. O novo intervalo é...",
    "o": [
      "[1,1,5].",
      "[1,5,2].",
      "[1,25,1,5].",
      "[0,1,5]."
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
    "q": "Se f(m)=0 numa iteração, então...",
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
    "q": "Para f(x)=(x−1)², f(0)>0 e f(2)>0 apesar de haver raiz em1. Isto mostra que...",
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
    "q": "Depois de calcular o ponto médio m, escolhe-se...",
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
      "]−1,2[.",
      "]1,2[.",
      "]0,1[.",
      "]2,3[."
    ],
    "a": 1,
    "sol": "O polinómio é contínuo e muda de sinal entre1 e2.",
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
    "sol": "Há mudança de sinal entre1,4 e1,5.",
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
    "q": "Se f é contínua, f(2,1)<0 e f(2,2)>0, então a raiz fica confinada num intervalo de amplitude...",
    "o": [
      "0,01.",
      "0,1.",
      "1.",
      "2,2."
    ],
    "a": 1,
    "sol": "2,2−2,1=0,1.",
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
    "q": "Para f(x)=x²−2, a iteração de Newton pode escrever-se...",
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
    "q": "A fórmula iterativa de Newton é...",
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
    "q": "Outro critério útil é...",
    "o": [
      "|f(x_n)| pequeno, com interpretação adequada.",
      "f'(x_n)>0 sempre.",
      "x_n>0.",
      "x_n próximo de1."
    ],
    "a": 0,
    "sol": "Um resíduo pequeno indica que a aproximação quase satisfaz a equação.",
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
    "q": "A tangente a f em x_n tem equação y=f(x_n)+f'(x_n)(x−x_n). Ao impor y=0 para obter a abcissa de interseção com o eixo Ox, obtemos...",
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
    "q": "Para f(x)=x²−1, um x0 positivo razoável tende a convergir para...",
    "o": [
      "−1.",
      "1.",
      "0.",
      "as duas raízes simultaneamente."
    ],
    "a": 1,
    "sol": "Em geral, o lado positivo pertence à bacia da raiz positiva neste caso simples.",
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
