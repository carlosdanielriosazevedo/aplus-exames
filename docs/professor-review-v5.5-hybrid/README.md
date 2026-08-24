# Revisão pedagógica híbrida v5.5

## Recomendação atual

- modelo conservador antigo: 64 revisões humanas
- modelo híbrido: 45 revisões humanas
- redução: 19 revisões (30%)
- revisão humana obrigatória: 40
- amostra humana do lane de máquina: 5
- lane de máquina: 24

## Filosofia

Não tratamos “IA disse que está certo” como certificação pedagógica.

O lane de máquina só contém questões:
- objetivas;
- fora do Diagnóstico;
- sem warnings de pré-QA;
- com fingerprint congelado;
- com oracle determinístico reproduzível.

20% desse lane continua a ser revisto por professor para apanhar problemas de
linguagem, dificuldade ou pedagogia que a validação matemática não vê.

Diagnóstico, interpretação, raciocínio, modelação, compreensão e itens com warnings
continuam no lane humano.

## Produção

Machine-only é permitido apenas no gate da beta fechada desta política.

Produção comercial continua a exigir uma política posterior, idealmente com:
- segundo validador independente;
- dados empíricos de alunos;
- monitorização de reports;
- amostragem pedagógica contínua.

O segundo validador externo está preparado por contrato técnico, mas **não está
configurado nem ativo** nesta release.

## Fluxo

1. Enviar um lote híbrido de cada vez.
2. Importar decisões.
3. Corrigir ALTERAR/BLOQUEAR.
4. Recalcular plano.
5. Continuar até o gate híbrido ficar GO.
