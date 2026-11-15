# Interruptores de emergência (beta pública)

Variáveis na Vercel → projeto `aplus-exames` → Settings → Environment Variables → **Production**.
**Na Vercel, uma variável alterada só tem efeito no deploy seguinte.** Depois de a mudar, faz Deployments → último deploy de produção → **Redeploy**. Demora cerca de 2 minutos e não altera o código.

| Situação | Variável | Valor | Efeito |
|---|---|---|---|
| Abuso ou excesso de registos | `APPROVA_SIGNUP_ENABLED` | `0` | Novas contas são recusadas (503 `SIGNUP_DISABLED`). Login e estudo continuam. |
| Problema na base de dados ou nas gravações | `APPROVA_CLOUD_WRITES_ENABLED` | `0` | Gravações online são recusadas (503 `CLOUD_WRITES_DISABLED`). O progresso fica no dispositivo e é sincronizado automaticamente quando o interruptor voltar a ligar. A leitura continua. |
| Comunicar uma manutenção | `NEXT_PUBLIC_APPROVA_MAINTENANCE_MESSAGE` | texto (máx. 240 caracteres) | Faixa no topo da app. |
| Tornar a conta obrigatória | `NEXT_PUBLIC_APPROVA_REQUIRE_ACCOUNT` | `1` | O estudo exige conta (PR #475). A página inicial continua pública. |

Para reativar: apagar a variável, ou pôr `1` nas duas primeiras, e fazer **Redeploy**.

Rollback completo de código: Deployments → deploy anterior → **Promote to Production** / Instant Rollback.

Mudar sem redeploy exige o Vercel Edge Config. Não está ativo, porque precisa de aprovação.
