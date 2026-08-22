# A+ Exames — v2.1

## Beta Piloto + Gates de Publicação

### Instrumentação da beta
A aplicação passa a registar localmente:
- início/fim do diagnóstico;
- início/fim de Missões;
- início/fim de Treino Livre;
- início/fim de Mini-exames;
- duração das sessões;
- tipo/tema das sessões;
- reports de conteúdo;
- feedback qualitativo dos participantes.

### Feedback pós-sessão
Depois de Missão, Treino ou Mini-exame, o participante pode classificar:
- clareza das perguntas;
- adequação da dificuldade;
- utilidade da sessão;
- comentário livre opcional.

### Painel interno da Beta
Mostra:
- sessões concluídas;
- taxa de conclusão;
- número de feedbacks;
- reports;
- médias de clareza/dificuldade/utilidade;
- duração média por tipo de sessão;
- últimos comentários.

### Participantes
- Código pseudónimo de participante.
- Nome da coorte.
- Exportação local dos dados do participante em JSON.

### Gates editoriais
Três modos:
1. `internal`
   - permite testar conteúdo protótipo.
2. `closed_beta`
   - Diagnóstico, Missões e Exames exigem conteúdo revisto.
   - Treino pode aceitar conteúdo pendente.
3. `production`
   - só conteúdo formalmente revisto.

O painel mostra quantas questões seriam elegíveis em cada contexto.

### Importante
Nesta versão os gates são visíveis e auditáveis, mas o motor principal continua em modo interno por defeito para não quebrar o protótipo enquanto o banco ainda não foi revisto.

### Próximo requisito real
Backend + autenticação + armazenamento central para:
- juntar dados de vários alunos;
- calcular retenção real;
- comparar coortes;
- analisar dificuldade empírica;
- sincronizar reports e revisões.
