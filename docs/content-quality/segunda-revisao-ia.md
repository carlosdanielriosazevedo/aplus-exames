# Segunda revisão por IA (amostragem)

Decisão do product owner de 2026-11-17 (AGENTS.md): sem revisão docente. Controlos compensatórios em Português e FQ A:

1. **Revisão integral pela IA:** já feita a 2026-11-17. Abrangeu 597 perguntas de FQ A e 839 de Português. Os registos estão em `content/reviews/ai/`. Uma pergunta alterada depois da revisão deixa de contar como revista, e o CI falha até nova passagem.
2. **Segunda revisão por outra IA, por amostragem:** este documento.

## Como fazer

1. Abrir uma conversa nova noutra IA (ChatGPT, Gemini…), sem histórico desta app.
2. Colar o prompt abaixo e anexar `segunda-revisao-ia-amostra.md`. A amostra tem 154 perguntas: 70 de FQ A, 17 de Português corrigidas na primeira revisão, 34 de Português do banco geral e 33 de texto dos mini-exames.
3. Devolver a resposta ao Claude. Cada problema confirmado é corrigido. A pergunta volta a ser revista e o registo é atualizado.

Critério de aceitação da amostra: zero chaves erradas e zero perguntas com duas respostas defensáveis. Se a segunda IA encontrar mais de 3 problemas graves confirmados, a taxa de erro da primeira revisão não é aceitável e repete-se a revisão integral do tema afetado.

## Prompt

```
És revisor de conteúdos de preparação para os Exames Nacionais portugueses do ensino secundário: Português (639) e Física e Química A (715), programas e Aprendizagens Essenciais em vigor, português europeu.

Em anexo segue uma amostra de perguntas de uma app de estudo. Cada pergunta tem a chave que a app considera certa, a explicação mostrada ao aluno e, nas respostas abertas, a resposta-modelo e os critérios. A app já foi revista por outra IA; tu és a segunda verificação, independente. Não confies na chave: resolve cada pergunta antes de olhar para ela.

Para cada pergunta, verifica:
1. Chave: a opção marcada está certa? Refaz todas as contas de FQ (algarismos significativos, unidades, ordens de grandeza).
2. Unicidade: existe outra opção também defensável por um aluno bem preparado? Esta é a falha mais importante.
3. Enunciado: é ambíguo, tem dados em falta ou contraditórios, ou está fora do programa do ano indicado?
4. Explicação e resposta-modelo: estão corretas e explicam o raciocínio? A resposta-modelo cumpre o limite de palavras e os critérios?
5. Língua: há erros de português europeu, brasileirismos ou terminologia que não é a dos programas (Dicionário Terminológico, nomenclatura IUPAC em português)?
6. Pistas: a resposta certa denuncia-se pela forma (mais longa, única com «pode», repete palavras do enunciado)?

Responde só com uma tabela, uma linha por problema (não listes as perguntas sem problemas):
| N.º | ID | Gravidade (grave/média/menor) | Tipo (chave/unicidade/enunciado/explicação/língua/pista) | Problema | Correção proposta |

«Grave» = chave errada, duas respostas defensáveis ou erro científico. No fim, indica o total de perguntas revistas e quantas tinham problemas graves.

Não reescrevas perguntas que estão certas. Não proponhas alterações de estilo sem impacto na correção.
```
