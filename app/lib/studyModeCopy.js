export const STUDY_MODE_COPY={
  nudge:"Escolhe como queres estudar. Podes praticar uma matéria específica, fazer um Mini-exame ou rever conteúdos.",
  miniExam:"Treina num formato próximo do exame e revê as respostas no final.",
  review:"Estuda e consolida conteúdos sem perguntas nem avaliação."
};

export function practiceModeCopy(subjectId){
  return subjectId==="portuguese"
    ?"Escolhe o ano, área, obra ou competência que queres trabalhar. O Treino Livre não altera diretamente o teu Domínio."
    :"Escolhe o ano, matéria e submatéria que queres trabalhar. O Treino Livre não altera diretamente o teu Domínio.";
}
