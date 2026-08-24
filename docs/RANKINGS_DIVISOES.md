# Rankings e Divisões — v4.6

## Princípio

O ranking existe para incentivar estudo, não comparação académica.

Nunca são públicos:
- Domínio;
- Certeza;
- Índice de Preparação;
- nota objetivo;
- resultados de Mini-exames/Exames;
- número de erros.

O único valor competitivo é **XP competitivo semanal**.

## XP total vs XP competitivo

**XP total**
- acumula ao longo da vida da conta;
- serve como histórico/gamificação pessoal.

**XP competitivo**
- reinicia todas as segundas-feiras;
- determina rankings e divisões;
- tem regras anti-farming.

Isto permite que um aluno novo possa competir sem estar permanentemente atrás de
quem instalou a app meses antes.

## XP competitivo v1

- Missão diária: **+50 XP**
- Treino Livre: **até +40 XP por sessão**
- Mini-exame: **até +80 XP**
- Primeiro Diagnóstico: **+30 XP uma única vez**

O XP competitivo recompensa a conclusão/atividade, não a nota.

### Anti-farming no Treino Livre

A primeira sessão de um foco no mesmo dia vale 100% do XP competitivo.

Repetições do mesmo foco nesse dia:
- 2.ª sessão: 70%
- 3.ª: 40%
- 4.ª: 20%
- restantes: 10%

Trocar para uma competência diferente volta a permitir valor completo.

Isto não impede um aluno de continuar a treinar. Apenas reduz a vantagem competitiva
de repetir infinitamente o caminho mais fácil.

## Uma Missão por dia

A v4.6 torna esta regra explícita e técnica:
- só existe uma Missão principal por dia;
- depois de concluída, a Home mostra “Missão de hoje concluída”;
- uma segunda abertura direta da área de Missão fica bloqueada;
- o aluno pode continuar em Treino Livre ou Mini-exames;
- tudo o que fizer depois pode influenciar a Missão do dia seguinte.

## Rankings

Estão desenhados cinco contextos:

1. **Divisão** — grupo pequeno de ~20 alunos;
2. **Geral**;
3. **Ano escolar**;
4. **Distrito/Região**;
5. **Escola**.

Nesta versão os adversários são explicitamente simulados para testar UX. Não existe
ainda ranking real multiutilizador.

## Divisões

- Bronze
- Prata
- Ouro
- Platina
- Diamante

Modelo inicial:
- 20 alunos por liga;
- Top 5 sobem;
- últimos 3 descem;
- resto mantém-se;
- Bronze não desce;
- Diamante não sobe.

O motor puro para promoção/descida está implementado, mas a demo não altera a
divisão com base em adversários simulados. Em produção o resultado tem de vir do
backend real.

## Privacidade

Ranking público usa nickname.

Distrito/Região e Escola são opcionais e precisam de opt-in.

Limiar inicial proposto:
- ranking de escola: pelo menos 10 participantes elegíveis;
- ranking de distrito/região: pelo menos 20.

Estes limiares devem ser revistos juridicamente/operacionalmente antes da produção.

## Estado técnico

A v4.6 contém:
- motor local de XP competitivo;
- semana Monday-to-Monday;
- anti-farming;
- idempotência por sessionId;
- divisões;
- projeção de subida/manutenção/descida;
- rankings simulados determinísticos;
- UI de perfil/nickname/opt-in;
- migration PostgreSQL para arquitetura futura.

O ranking real ainda não está ligado.
