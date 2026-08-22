# A+ Exames — v1.8

## Geradores paramétricos validados

Esta versão começa a resolver o maior gargalo do produto: criar variedade sem depender de IA a improvisar matemática em tempo real.

### O que entrou
- Novo módulo `app/lib/generators.js`.
- 9 templates paramétricos iniciais, cobrindo:
  - zeros de funções;
  - geometria analítica;
  - razões trigonométricas;
  - combinações;
  - derivadas;
  - módulo de complexos;
  - probabilidade condicionada;
  - equações exponenciais;
  - limites de polinómios.
- Cada variante tem:
  - `templateId`;
  - `variantSeed`;
  - resposta calculada;
  - solução;
  - hipótese de erro;
  - assinatura semântica;
  - estado de validação determinística.
- Validação estrutural automática:
  - 4 opções únicas;
  - índice de resposta válido;
  - solução e assinatura presentes.
- Missões podem misturar itens curados e variantes geradas.
- Treino Livre usa variantes paramétricas sempre que existe um gerador para o foco escolhido.
- A interface identifica discretamente quando uma pergunta é uma “Variante validada”.
- Variantes do mesmo template partilham assinatura semântica, por isso repetições com números diferentes NÃO aumentam artificialmente a Certeza da A+ como se fossem competências independentes.

### Decisão de segurança pedagógica
Os Mini-exames continuam a usar apenas itens curados do banco nesta versão.
Não expandimos automaticamente o peso avaliativo dos geradores antes de os validar com professor/alunos.

### Limites
- Estes templates são uma prova de arquitetura, não cobertura curricular completa.
- Os geradores precisam de revisão pedagógica antes da beta pública.
- Dificuldade real só poderá ser calibrada empiricamente com respostas de alunos reais.
