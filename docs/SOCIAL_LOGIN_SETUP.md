# Entrar com Google e Microsoft — configuração (product owner)

Decisão do product owner (2026-11-21): login com **Google** e **Microsoft**.
Facebook não é suportado pelo Neon Auth (e pouco usado por alunos de 14–18 anos).

O código já está pronto, mas **os botões só aparecem depois destes passos** e
da variável `NEXT_PUBLIC_APPROVA_SOCIAL_PROVIDERS` na Vercel. Até lá, nada muda
para os alunos.

**Consentimento:** antes de «Continuar com Google/Microsoft», o aluno marca
«Tenho 13 anos ou mais e aceito os termos e a política de privacidade». No
regresso, a prova de consentimento é registada como no registo por email
(só o hash do email).

## 0. O endereço de callback (copiar do Neon)

Neon Console → projeto **APProva+ EU** → branch **main** → **Settings → Auth →
OAuth providers → Add OAuth provider**. O diálogo mostra o **authorization
callback URL** exato. Tem esta forma:

```
{NEON_AUTH_BASE_URL}/callback/google
{NEON_AUTH_BASE_URL}/callback/microsoft
```

Copia-o do diálogo (não o escrevas à mão).

## 1. Google (≈15 min, gratuito)

1. [console.cloud.google.com](https://console.cloud.google.com) → criar projeto **APProva+**.
2. **APIs e serviços → Ecrã de consentimento OAuth** (Google Auth Platform → Branding):
   - Nome da app: **APProva+**; email de suporte; logótipo (o ícone da coruja);
   - Página inicial: `https://approvamais.pt`;
   - Política de privacidade: `https://approvamais.pt/privacidade`;
   - Termos: `https://approvamais.pt/termos`;
   - Domínio autorizado: `approvamais.pt`;
   - Público: **Externo**; publicar a app (estado «Em produção»).
3. **Credenciais → Criar credenciais → ID de cliente OAuth** → tipo **Aplicação Web**:
   - Origens JavaScript autorizadas: `https://approvamais.pt`;
   - URIs de redirecionamento autorizados: o URL `…/callback/google` do passo 0.
4. Copiar **Client ID** e **Client Secret** para o Neon (diálogo do passo 0, fornecedor Google).

Os âmbitos usados são só os básicos (email e perfil): normalmente não exigem
verificação demorada da Google.

## 2. Microsoft (≈15 min, gratuito)

1. [entra.microsoft.com](https://entra.microsoft.com) → **Entra ID → App registrations → New registration**.
2. Nome **APProva+**; **Supported account types**: «Accounts in any organizational
   directory and personal Microsoft accounts» (contas da escola e pessoais).
3. **Redirect URI**: plataforma **Web**, o URL `…/callback/microsoft` do passo 0.
4. Copiar o **Application (client) ID**.
5. **Certificates & secrets → New client secret** → copiar o **Value** (só aparece uma vez).
   **Expira:** anotar a data e renovar antes (senão o login Microsoft deixa de funcionar).
6. **Token configuration → Add optional claim → ID** → marcar `acct` e `xms_edov` → aceitar a
   permissão `email`. (Sem isto, alunos que já têm conta com o mesmo email não conseguem entrar com Microsoft.)
7. No Neon (fornecedor Microsoft): Client ID, Client Secret e tenant **`common`**.

## 3. Domínio de confiança no Neon

Neon → Auth → **Trusted domains**: confirmar que `https://approvamais.pt` (e
`https://www.approvamais.pt`) estão na lista.

## 4. Ligar os botões na app

Vercel → projeto `aplus-exames` → Settings → Environment Variables (Production):

```
NEXT_PUBLIC_APPROVA_SOCIAL_PROVIDERS=google,microsoft
```

Fazer deploy (variáveis `NEXT_PUBLIC_*` só entram numa build nova).

## 5. Testar

No telemóvel: Conta → marcar a caixa → «Continuar com Google» → escolher a conta →
a app volta e abre no menu com sessão iniciada. Repetir com Microsoft.

Se falhar: desligar removendo `microsoft` (ou `google`) da variável e fazer deploy.
