# Contrato para Segundo Validador Matemático

## Princípio

A app não deve ficar arquiteturalmente dependente de Wolfram, SymPy ou qualquer
outro fornecedor.

O núcleo produz um `externalValidationSpec` neutro com:
- questionId;
- templateId;
- tipo matemático;
- fingerprint;
- expressão.

Um adapter futuro transforma este contrato no formato do fornecedor escolhido.

## Resultado esperado do adapter

O adapter devolve apenas um veredito normalizado:

- `agree`
- `disagree`
- `unavailable`
- `not_configured`

Mais:
- provider;
- fingerprint;
- timestamp;
- nota técnica opcional.

Não é necessário persistir uma resposta textual extensa do fornecedor.

## Privacidade

Nunca enviar:
- nome;
- email;
- idade;
- respostas anteriores do aluno;
- perfil de desempenho;
- histórico de estudo.

O provider externo só precisa do problema matemático.

## Custos

Quando existir um provider pago, a estratégia recomendada é:
- cache por fingerprint;
- validar na criação/publicação da variante, não em cada visualização;
- nunca fazer uma chamada por aluno para a mesma variante;
- definir limites mensais e fallback local.

## Licenciamento

A ativação de um provider externo só deve ocorrer depois de rever:
- termos da API;
- utilização comercial;
- atribuição;
- armazenamento/caching permitido;
- limites;
- preços.

## Estado v4.4

Existe apenas o contrato e a configuração server-side genérica.
Nenhum pedido externo é realizado.
