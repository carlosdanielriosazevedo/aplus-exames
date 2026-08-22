# v3.0 — Motor de Evidência Robusto

Esta versão é sobretudo interna. O objetivo é impedir que o mapa pedagógico fique artificialmente confiante ou instável.

## Evidência independente
- Repetições da mesma assinatura semântica passam a ter retorno fortemente decrescente.
- Repetir uma variante pode servir para aprender, mas não pode fabricar Certeza.

## Contradições
- O motor mede a dispersão entre evidências independentes.
- Sinais contraditórios reduzem moderadamente a Certeza e aumentam a prioridade de reconfirmação.
- Contradição não provoca automaticamente uma queda grande no Domínio.

## Recência
- Evidência antiga continua a contar para o Domínio, com uma redução muito suave.
- A Certeza é mais sensível à antiguidade: conhecimento antigo precisa de ser reconfirmado.
- Os scores são recalibrados ao abrir a app e depois de nova evidência.

## Pesos
- Exames continuam a ter maior peso que Missões; Missões maior que diagnóstico.
- Dificuldade, fonte, independência, recência e força causal passam a ser combinadas no mesmo resumo.

## Cloud
- A memória pedagógica (`learningHypotheses`) passa a acompanhar o estado cloud.
- O novo schema é `aplus-student-state-v2`, mantendo leitura do v1.

## Princípio
> Certeza não é quantidade de respostas. É qualidade, diversidade, consistência e atualidade da evidência.
