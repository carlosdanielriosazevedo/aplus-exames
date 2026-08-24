# Ranking real — segurança/backend

## Regra principal

O browser não pode ser autoridade do XP competitivo.

Se o cliente pudesse enviar:
`rankedXp: 50000`

e o servidor aceitasse, o ranking seria trivialmente manipulável.

## Arquitetura pretendida

1. Cliente conclui uma sessão.
2. Backend recebe o identificador da sessão e os dados mínimos necessários.
3. Backend valida que a sessão:
   - existe;
   - ainda não foi contabilizada;
   - pertence ao utilizador;
   - tem atividade compatível com o tipo declarado.
4. Backend calcula o XP competitivo segundo uma versão de regras server-side.
5. Evento é persistido com chave idempotente.
6. Total semanal é atualizado transacionalmente.
7. Leaderboard é calculado no servidor.

O cliente pode mostrar uma previsão imediata, mas o ranking real usa sempre o valor
confirmado pelo servidor.

## Privacidade

As tabelas RLS da migration 005 permitem ao cliente autenticado ver apenas os seus
próprios registos.

Um aluno não pode fazer uma query direta à Data API para descarregar:
- perfis de todos os alunos;
- escolas;
- regiões;
- XP de toda a base.

Os endpoints de leaderboard devem devolver apenas:
- nickname;
- posição;
- XP semanal;
- divisão;
- metadados de scope estritamente necessários.

## Escola e distrito

O backend só deve abrir um scope quando existe um mínimo de participantes elegíveis.

Proposta inicial:
- escola >= 10;
- distrito/região >= 20.

O endpoint não deve revelar a contagem exata se isso reduzir anonimato em grupos
pequenos.

## Anti-cheating

Além do diminishing return local, o backend deverá aplicar:
- limite de uma Missão competitiva por dia;
- idempotência de sessões;
- deteção de cadências impossíveis;
- limite razoável de XP/hora;
- exclusão temporária de eventos anómalos;
- auditoria sem penalização automática irreversível.

Não queremos punir alunos legítimos por estudarem muito; anomalias devem primeiro
ser investigadas.
