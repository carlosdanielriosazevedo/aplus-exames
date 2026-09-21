"use client";

/**
 * Regras partilhadas do seletor de disciplinas.
 * Mantemos a lista normalizada para impedir cartões duplicados quando uma
 * disciplina passa de piloto para disciplina ativa.
 */
export function uniqueSelectedSubjectIds(ids=[], availableIds=[]){
  return [...new Set(ids)].filter(id=>availableIds.includes(id));
}

export function subjectsNotSelected(subjects=[], selectedIds=[]){
  const selected=new Set(selectedIds);
  return subjects.filter(subject=>!selected.has(subject.id));
}
