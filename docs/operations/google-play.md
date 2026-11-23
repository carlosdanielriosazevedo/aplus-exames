# Google Play — preparação (APProva+)

Estado: **em preparação**. Nada foi submetido. A app Android será uma TWA
(Trusted Web Activity), um invólucro Android que abre https://approvamais.pt em ecrã
inteiro, sem a barra do Chrome.

## 1. O que só o product owner pode fazer
1. Criar a conta de programador Google Play (25 USD, pagamento único) e verificar a identidade.
   - Uma conta **pessoal** criada depois de 13/11/2023 exige um **teste fechado com pelo menos
     12 testadores inscritos durante 14 dias seguidos** antes de pedir o acesso a produção.
     Uma conta de **organização** não tem esta exigência, mas pede um número D-U-N-S.
2. Escolher o nome do pacote. Proposta: `pt.approvamais.app` (não pode ser mudado depois).
3. Ativar a **Play App Signing** e copiar a impressão digital SHA-256 do certificado de
   assinatura da app (Play Console → Configuração → Integridade da app). Esta impressão digital vai para
   `/.well-known/assetlinks.json` — sem ela a app abre com a barra do Chrome.
4. Guardar a chave de carregamento (*upload key*) fora desta sessão. A chave nunca deve
   entrar no repositório.

## 2. O que já está feito na app web
- Manifest com `display: standalone`, `lang: pt-PT` e ícones aprovados (bloqueados; não alterar).
- Página offline (`/offline.html`, service worker mínimo, sem cache de dados privados).
- Eliminação de conta na app (Conta → Eliminar conta) e na página pública `/eliminar-conta`.
- Política de privacidade pública em `/privacidade`.

## 3. Formulário «Segurança dos dados» (Data Safety) — respostas propostas
Princípio: declarar o que o código faz, sem declarar «nenhum dado recolhido».

| Tipo de dados | Recolhido? | Partilhado? | Finalidade | Obrigatório? |
|---|---|---|---|---|
| Nome | Sim (o aluno escolhe; pode ser alcunha) | Não | Funcionalidade da app, gestão da conta | Sim, para criar conta |
| Endereço de email | Sim | Não | Gestão da conta, recuperação da palavra-passe | Sim, para criar conta |
| Atividade na app (respostas, progresso, XP, missões) | Sim | Não | Funcionalidade da app (plano de estudo, progresso) | Sim, para guardar online |
| Diagnóstico de falhas (erros técnicos, sem dados pessoais) | Sim | Não | Diagnóstico de falhas | Não pode ser recusado; não identifica |
| Contagens diárias anónimas de utilização | Não (são agregadas e anónimas, não ligadas ao utilizador) | — | — | — |
| Reportes de problemas em perguntas | Não ligados ao utilizador: guardam só a pergunta, a disciplina, a categoria, a versão da app e a data | — | Melhorar o conteúdo | Não (o aluno escolhe reportar) |

Outras respostas:
- Dados encriptados em trânsito: **Sim** (HTTPS).
- O utilizador pode pedir a eliminação dos dados: **Sim** — na app e em https://approvamais.pt/eliminar-conta
- Publicidade, venda de dados, localização, contactos, fotografias: **Não**.
- Prestadores que tratam dados por conta da APProva+ (não contam como «partilha»):
  Vercel (alojamento), Neon (base de dados e autenticação), Resend (envio dos emails de
  confirmação e de recuperação da palavra-passe: recebe só o endereço e a mensagem).
- Entrar com Google ou Microsoft: o fornecedor confirma a identidade e envia nome e email.
  Declarar nome e email como recolhidos (já estão na tabela) e indicar o login social na
  política de privacidade (já indicado em `/privacidade`).
- Eliminação de contas criadas com Google/Microsoft: não têm palavra-passe; a app pede
  para voltar a entrar com o fornecedor e eliminar nos 10 minutos seguintes.

Pendente de decisão (auditoria externa 2026-11-23, L-03): prazos de retenção por tipo de
dado (logs da Vercel, cópias de segurança da Neon, emails no Resend), região de
tratamento de cada prestador e dados do piloto/encarregado. Confirmar antes de submeter
o formulário; é matéria para o product owner e, idealmente, para parecer jurídico.

## 4. Público-alvo e conteúdo
- Faixas etárias a declarar: **13–15, 16–17 e 18+** (alunos do secundário).
  Não incluir menores de 13 — a conta exige 13 anos ou mais.
- Como o público inclui menores, a app tem de cumprir as regras da Google para apps usadas por
  menores: sem publicidade inadequada, sem SDKs de anúncios, sem recolha desnecessária.
- Classificação de conteúdo (questionário IARC): app educativa, sem violência, sem compras.
- Instruções para a revisão da Google: criar uma conta de revisão com dados fictícios
  (email `@example.invalid` não recebe emails — usar um email de revisão real do
  product owner) e indicar no Play Console como entrar.

## 5. Pacote Android (a preparar)
- Gerar o projeto TWA com Bubblewrap a partir do manifest, `targetSdk` exigido pela Google Play
  para apps novas (API 36 ou superior em 2026), ícone aprovado sem alterações.
- Publicar `/.well-known/assetlinks.json` com o nome do pacote e o SHA-256 da Play App Signing.
- Instalar a partir do canal de teste fechado e confirmar: abre sem barra do Chrome, a página offline
  funciona, entrar na conta, sair, eliminar conta.
