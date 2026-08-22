# Superfície de estudante — v3.4

## Objetivo
Um tester não deve ver ferramentas de desenvolvimento, versões de motor ou botões
de administração misturados com a experiência normal.

## Ferramentas internas
Na Home normal ficam ocultos:
- Identidade & Permissões demo;
- Qualidade;
- Revisão Pedagógica;
- Painel Beta;
- reset do protótipo.

Para desenvolvimento continuam acessíveis acrescentando `?dev=1` ao URL.

A conta/cloud continua visível porque faz parte da experiência futura do aluno.

## Recuperação de sessão
Missão, Treino Livre e Mini-exame criam um rascunho local temporário.
Se houver refresh/fecho do browser dentro de 24h, a app recupera a sessão.

O estado pedagógico continua a ser gravado separadamente no estado principal.

## Pausa voluntária
O aluno pode “Guardar e continuar depois”.
Na Home aparece uma sessão em pausa.

## Segurança
Rascunhos com mais de 24h são descartados.
Concluir uma sessão apaga o rascunho correspondente.
