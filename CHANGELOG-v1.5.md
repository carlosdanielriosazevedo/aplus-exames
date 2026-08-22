# A+ Exames — v1.5

## Banco + Motor de Evidência

- Conteúdo separado da interface (`app/data/content.js`).
- Regras do motor separadas da interface (`app/lib/engine.js`).
- Banco de protótipo aumentado para 63 perguntas originais.
- Cada pergunta tem tema, foco, dificuldade, tipo cognitivo e assinatura semântica.
- Evidências semanticamente repetidas passam a valer muito menos para a Certeza da A+.
- Diagnóstico usa 6–7 áreas-âncora e aprofunda apenas quando uma resposta o justifica.
- Áreas não testadas continuam sem score.
- O índice global é explicitamente apresentado como parcial enquanto a cobertura for baixa.
- Missões escolhem perguntas dinamicamente pela dificuldade estimada e procuram variedade cognitiva.
- Uma Missão termina por suficiência de evidência ou por limite de segurança, não por número fixo.
- Erros com possível pré-requisito ficam temporariamente pendentes:
  - pré-requisito confirmado -> erro pesa normalmente no foco principal;
  - pré-requisito também falha -> erro original tem peso reduzido.
- Treino Livre passa a ter sessões reais com perguntas do banco.
- Treino Livre dá XP, mas não altera Domínio.
- Desempenho forte no Treino Livre gera apenas um “sinal de possível evolução” para confirmação futura.

## Limites desta versão

O banco serve para validar o comportamento do produto. Ainda não é um banco de produção e precisa de:
1. revisão sistemática por professor de Matemática A;
2. muito mais variantes independentes;
3. validação com alunos reais;
4. calibração empírica da dificuldade.
