export function pilotPublicFields(){
  return {
    responsible:process.env.NEXT_PUBLIC_PILOT_RESPONSIBLE||"[responsável]",
    email:process.env.NEXT_PUBLIC_PILOT_CONTACT_EMAIL||"[email]",
    endDate:process.env.NEXT_PUBLIC_PILOT_END_DATE||"[data fim do piloto]"
  };
}

export function pilotConsentText(){
  const {responsible,email,endDate}=pilotPublicFields();
  return `Participar no piloto da APProva+. Estamos a testar a APProva+ com um grupo pequeno de alunos antes de a lançar. Podes ajudar-nos, se quiseres. É voluntário e não afeta nada na tua escola. O que guardamos: o nome e o endereço de email que utilizares na conta; quantas vezes usas a app e durante quanto tempo, por disciplina e por dia; o resultado de cada pergunta (certo, parcial ou errado, tempo gasto e data), mas não guardamos o texto das tuas respostas; e o feedback que escreveres, se escreveres. Para quê: perceber onde a app confunde ou é difícil, e melhorá-la. Não vendemos os teus dados, não os partilhamos e não os usamos para publicidade. Quem os vê: ${responsible}, responsável pelo projeto. Contacto: ${email}. Quanto tempo: até ${endDate}; depois apagamos ou tornamos anónimos. Tu decides: podes apagar os teus dados do piloto quando quiseres, retirar o consentimento, pedir uma cópia dos teus dados, ou queixar-te à CNPD.`;
}

export function guardianPilotText(){
  const {responsible,email,endDate}=pilotPublicFields();
  return `A APProva+ é uma app para ajudar alunos a preparar os exames nacionais de Matemática A, Português e Física e Química A. O piloto é voluntário e serve apenas para perceber onde a app pode ser melhorada antes do lançamento. Se o seu educando decidir participar, recolhemos os dados da conta que usar, o tempo de utilização, os resultados por pergunta (certo, parcial, errado ou não respondido), a disciplina, a data e o feedback que decidir escrever. Não guardamos o texto das respostas dadas às perguntas. Não vendemos os dados, não os usamos para publicidade e não os partilhamos para fins comerciais. O responsável pelo projeto é ${responsible}. Os dados do piloto são conservados até ${endDate}; depois são apagados ou tornados anónimos. O aluno pode retirar o consentimento sem apagar imediatamente os dados já recolhidos, ou pode pedir a eliminação dos dados do piloto. Também pode pedir uma cópia dos dados ou apresentar uma questão sobre privacidade através de ${email}.`;
}
