export const STUDY_MODE_COPY={
  nudge:"Escolhe como queres estudar. Podes praticar uma matéria específica, fazer uma prova ou rever conteúdos.",
  exams:"Faz Mini-exames ou um Exame Completo, quando disponível, e revê as respostas no final.",
  miniExam:"Faz Mini-exames ou um Exame Completo, quando disponível, e revê as respostas no final.",
  review:"Estuda e consolida conteúdos sem perguntas nem avaliação."
};

export function practiceModeCopy(subjectId){
  return subjectId==="portuguese"
    ?"Escolhe o ano, área, obra ou competência que queres trabalhar. O Treino Livre não altera diretamente o teu Domínio."
    :"Escolhe o ano, matéria e submatéria que queres trabalhar. O Treino Livre não altera diretamente o teu Domínio.";
}
