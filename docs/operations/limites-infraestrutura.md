# Limites da infraestrutura e quando subir de plano

Decisão do product owner (2026-11-16): a Neon fica no plano **Free** até ser
necessário. Quem trabalhar na infraestrutura deve **avisar o product owner**
para passar a **Free + 5 $/mês** ("Increase your limits") quando acontecer
qualquer um destes sinais:

| Sinal | Onde ver | Limite do Free | Avisar a partir de |
|---|---|---|---|
| Horas de computação no mês | Neon → Usage | 100 CU-h | **70 CU-h** |
| Armazenamento Postgres | Neon → Usage | 1 GB | **0,7 GB** |
| Emails da Neon sobre limites ("approaching/exceeded") | email da conta | — | imediatamente |
| Alunos sem gravação online ("Não foi possível guardar online") | reportes / suporte | — | imediatamente |
| Divulgação planeada (escolas, redes sociais, anúncios) | — | — | **antes** de divulgar |

Free + 5 $ dá 250 CU-h, 5 GB e 25 GB de transferência (custo fixo). Quando a
computação se aproximar das 250 CU-h/mês, passar para **Launch** (pago por uso:
0,106 $/CU-h, 0,35 $/GB-mês, sem mínimo).

Estimativas (2026-11-16, não medidas): até ~100 alunos/mês o Free chega;
~1 000 alunos/mês pedem Free + 5 $; ~5 000 alunos/mês ≈ 40 $/mês em Launch;
~20 000 alunos/mês ≈ 80 $/mês em Launch. O armazenamento é residual
(~50 KB por aluno); o custo é dominado pelas horas em que há alunos ativos.

Vercel: o plano Hobby é só para uso não comercial. Antes de cobrar ou operar a
APProva+ como negócio, passar para Vercel Pro (~20 $/mês).
