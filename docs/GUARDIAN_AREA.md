# Área do encarregado de educação

Estado: **protótipo** (dados de exemplo) em `/prototipo/encarregado`, visível só em
desenvolvimento e em pré-visualizações (nunca em produção). Os ecrãs e a lógica são
código real da app; para ficar real falta o servidor (ver «Para tornar real»).

## Decisões do product owner (2026-11-22/23)

1. **O aluno convida** o encarregado (email). O encarregado cria a sua conta pelo link
   (Google ou email, 18+). Um encarregado pode acompanhar vários educandos.
2. **O encarregado vê:** dias e tempo de estudo, missões feitas, sequência de dias,
   diagnóstico feito ou por fazer, **a evolução do índice de preparação** e a tendência
   em palavras («a subir», «estável», «precisa de atenção»), e até duas sugestões de
   «Como pode ajudar».
3. **Nunca vê:** respostas a cada pergunta, notas, comparações com outros alunos ou
   rankings. O índice aparece sempre com a nota «Não é uma previsão da nota do exame».
4. **Email semanal** ao encarregado (segunda-feira de manhã), com o mesmo resumo e
   opção de deixar de receber.
5. **A ligação só termina com o acordo dos dois** (aluno menor de 18): quem pede espera
   pela confirmação do outro. Motivo do product owner: o aluno não deve poder esconder
   o seu compromisso de quem o acompanha (e, no futuro, paga a subscrição).

### Nota legal (a resolver antes de tornar real)

Se a partilha se basear no **consentimento do aluno**, o RGPD exige que o possa retirar a
qualquer momento — o que contradiz a decisão 5. A Política de Privacidade deve, por isso,
fundamentar a ligação na **responsabilidade parental** (e, havendo, no contrato com quem
paga), não no consentimento do aluno. O aluno mantém sempre o direito de **eliminar a
conta** (já implementado), o que termina a ligação; o encarregado deve ser avisado.

## Ecrãs (protótipo)

| Separador | Conteúdo |
|---|---|
| 1 · Aluno convida | Conta → Encarregado de educação: sem ligação / convite enviado / ligados / aluno pede para terminar / encarregado pede para terminar |
| 2 · Encarregado aceita | Página do link do email: o que vê e não vê, 18+, Google ou email |
| 3 · Painel | Educandos (separadores), esta semana, disciplinas com gráfico do índice, como pode ajudar |
| 4 · Email semanal | O email tal como chega (HTML pronto para o Resend) |

Código: `app/lib/guardianDashboard.js` (modelo + email, testado em
`tests/unit/guardianDashboard.test.mjs`), `app/components/guardian/*`,
`app/prototipo/encarregado/*`.

## Para tornar real

1. **Servidor** (as tabelas já existem em `db/migrations/003_v2_4_identity_roles.sql`:
   `parent_invites`, `student_parent_links`, `parent_link_change_requests`):
   - `POST /api/guardian/invites` (aluno): cria convite (token aleatório, guarda só o hash,
     7 dias, uso único) e envia o email pelo Resend;
   - `POST /api/guardian/invites/accept` (encarregado autenticado, 18+): valida o token e o
     email, cria a ligação;
   - `GET /api/guardian/children` (encarregado): resumo de cada educando — **calculado no
     servidor** a partir do progresso guardado na conta, só com os campos permitidos;
   - `POST /api/guardian/links/:id/removal` e `.../confirm`: pedido e confirmação (dois lados).
   - Adicionar as rotas a `APPROVED_API_ADDITIONS` (auditoria de compatibilidade).
2. **Dados que ainda não existem:**
   - **tempo de estudo** por dia (hoje só há atividades por dia): registar a duração de
     cada sessão concluída;
   - **histórico semanal do índice** por disciplina: guardar um valor por semana na conta.
3. **Email semanal:** cron (como `/api/cron/weekly-report`) a enviar o HTML de
   `weeklyEmailHtml`; logótipo em `public/brand/approva-logo-email.png`; link para
   deixar de receber.
4. **Conta do encarregado:** papel `parent` (já previsto em `docs/AUTH_ROLES.md`); depois de
   entrar abre em `/encarregado` (painel), nunca nos ecrãs do aluno.
5. **Documentos:** Política de Privacidade (novo dado pessoal: email do encarregado; base
   legal da nota acima) e Termos.
6. **Substituir a «Área dos pais» atual**, que é uma demonstração local (os convites não
   saem do telemóvel e o link aponta para um endereço antigo).
