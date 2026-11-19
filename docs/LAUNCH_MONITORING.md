# Lançamento: email em português, resumo semanal e alarmes

Aprovado pelo product owner em 2026-11-18 (opção C: primeiro o email em
português, depois os pontos 4 a 6 da lista de lançamento).

## 1. Email de recuperação em português

**Como funciona.** Com o servidor de email próprio (SMTP), o Neon Auth só muda o
remetente: o texto continua a ser o do Neon, em inglês. Para controlar o texto,
o Neon chama um webhook nosso (`/api/auth-email`) com o código, e a app envia o
email em português pelo Resend.

- Código: `app/api/auth-email/route.js`, `app/lib/server/auth-email.js`
- Testes: `tests/unit/authEmailWebhook.test.mjs`
- Assinatura Ed25519 do Neon verificada (JWKS em `NEON_AUTH_URL/.well-known/jwks.json`).
  Pedidos sem assinatura válida ou com mais de 5 minutos são recusados.
- Cobre os três tipos de código (recuperação, confirmação de email, entrada) e as ligações mágicas.
- O email do aluno só é usado para o envio; nada é guardado.

**Atenção:** quando o webhook está ativo, se a app ou o Resend falharem, o aluno
não recebe o código (o Neon já não envia o dele). Por isso, a ordem abaixo importa.

**Passos (product owner), por esta ordem:**
1. Criar conta grátis em resend.com (3000 emails/mês, 100/dia).
2. Resend → Domains → Add domain → `approvamais.pt`, região UE (Irlanda).
3. Copiar os registos DNS que o Resend mostra (MX e TXT no subdomínio `send`,
   e TXT `resend._domainkey`) para o painel de DNS da **Amen** (o domínio usa
   `ns1.amenworld.com`; não está na Vercel). Não mexem no email que já tenhas no domínio.
4. Esperar que o Resend marque o domínio como *Verified*.
5. Resend → API Keys → criar uma chave só com permissão de envio.
6. Vercel → projeto `aplus-exames` → Settings → Environment Variables (Production):
   `RESEND_API_KEY` = a chave. Fazer deploy.
7. Só depois: Neon Console → Auth → Configuration → Webhooks → ativar, URL
   `https://approvamais.pt/api/auth-email`, eventos `send.otp` e `send.magic_link`, timeout 5 s.
8. Testar: «Esqueci-me da palavra-passe» com o teu email. Deve chegar em português.

**Desligar (emergência):** desativar o webhook no Neon. O Neon volta a enviar o email dele.

## 2. Resumo semanal (ponto 4)

Cron diário da Vercel (`vercel.json`, 07:00 UTC) → `/api/cron/weekly-report`.

- **À segunda-feira:** envia o resumo completo da semana anterior (segunda a domingo).
- **Nos outros dias:** só envia email se algum alarme disparar.
- Teste manual: `GET /api/cron/weekly-report?modo=resumo` com `Authorization: Bearer <CRON_SECRET>`.

Conteúdo: abriram a app, começaram e acabaram o diagnóstico, primeira missão,
criaram conta, voltaram no dia seguinte e na semana seguinte (com a variação face à
semana anterior), onde mais desistem, origem (rede) de cada aluno e perguntas reportadas.

**Origem:** usa `?utm_source=` (ou `?origem=`) no link de cada publicação, por exemplo
`https://approvamais.pt/?utm_source=instagram`, `?utm_source=tiktok`, `?origem=escola`.
Fica guardada só a categoria (lista fechada: direto, instagram, tiktok, whatsapp,
youtube, facebook, google, escola, outro), nunca o endereço nem a campanha.
**Sem `utm_source` nos links, tudo aparece como «direto» e não sabes que rede funciona.**

**Limitações (contagens anónimas, não por aluno):**
- As taxas são aproximadas (ex.: acabaram esta semana ÷ começaram esta semana).
- No dia do deploy, os dispositivos que já existiam enviam de uma vez os passos novos
  (`diagnostic_started`, `returned_week_after`). Ignora esse primeiro dia.

**Passos (product owner):**
1. Neon → SQL Editor → correr `db/migrations/013_funnel_source_weekly.sql` **antes** do deploy.
2. Vercel → Environment Variables (Production):
   - `CRON_SECRET` = texto aleatório longo (a Vercel usa-o automaticamente no cron);
   - `REPORT_EMAIL_TO` = o teu email (vários separados por vírgula).
   - `RESEND_API_KEY` já fica definido no passo 1.6.

## 3. Triagem dos reportes (ponto 5)

O resumo lista as perguntas reportadas com contagem por categoria e termina com
uma frase pronta a colar numa conversa com o Claude: «Revê e corrige as perguntas
reportadas: …». Os identificadores encontram-se no repositório com `grep -rn "<id>" content app/data`.

## 4. Alarmes (ponto 6)

Definidos em `ALARM_RULES` (`app/lib/server/weekly-report.js`):

| Alarme | Limite | Amostra mínima |
|---|---|---|
| Acabam o diagnóstico | < 50% | 30 diagnósticos começados |
| Voltam no dia seguinte | < 20% | 30 alunos novos |
| Mesma pergunta reportada | ≥ 3 vezes em 7 dias | — |
| Recolha parada | 2 dias sem contagens depois de ter havido | — |

Abaixo da amostra mínima, as percentagens são ruído e o alarme não dispara (o
resumo avisa). **Regra combinada: se um alarme disparar, para-se a publicidade e corrige-se.**
Um alarme ativo repete-se no email diário até a causa desaparecer da janela de 7 dias.
