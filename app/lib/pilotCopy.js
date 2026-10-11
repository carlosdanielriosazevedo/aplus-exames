export function pilotPublicFields(){
  return {
    responsible:process.env.NEXT_PUBLIC_PILOT_RESPONSIBLE||"[responsável]",
    email:process.env.NEXT_PUBLIC_PILOT_CONTACT_EMAIL||"[email]",
    endDate:process.env.NEXT_PUBLIC_PILOT_END_DATE||"[data fim do piloto]"
  };
}

export function pilotConsentText(){
  const {responsible,email,endDate}=pilotPublicFields();
  return `Participar no piloto da APProva+. Estamos a testar a APProva+ com um grupo pequeno de alunos antes de a lançar. Podes ajudar-nos, se quiseres. É voluntário e não afeta nada na tua escola. O que guardamos: a tua conta ([email e nome que usares]); quantas vezes usas a app e durante quanto tempo, por disciplina e por dia; o resultado de cada pergunta (certo, parcial ou errado, tempo gasto e data), mas não guardamos o texto das tuas respostas; e o feedback que escreveres, se escreveres. Para quê: perceber onde a app confunde ou é difícil, e melhorá-la. Não vendemos os teus dados, não os partilhamos e não os usamos para publicidade. Quem os vê: ${responsible}, responsável pelo projeto. Contacto: ${email}. Quanto tempo: até ${endDate}; depois apagamos ou tornamos anónimos. Tu decides: podes apagar os teus dados do piloto quando quiseres, retirar o consentimento, pedir uma cópia dos teus dados, ou queixar-te à CNPD.`;
}

export function guardianPilotText(){
  const {email}=pilotPublicFields();
  return `A APProva+ é uma app para ajudar alunos a preparar os exames nacionais (Matemática A, Português e Física e Química A). Estamos a testar com alguns alunos antes de a lançar. O seu educando decidiu participar. Recolhemos só dados de utilização (tempo e resultados por pergunta) e o feedback que ele escrever. Não guardamos o texto das respostas, não vendemos nem partilhamos dados e não há publicidade. Pode apagar tudo a qualquer momento. Dúvidas: ${email}.`;
}
