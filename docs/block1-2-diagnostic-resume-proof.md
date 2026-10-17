# Bloco 1.2 · Retoma do diagnóstico

Protocolo vermelho → verde em Chromium, viewport 390×844, integrado no Beta CI existente.

## Antes da correção
- Estado local com perfil configurado, disciplina selecionada e ativa, diagnóstico por concluir.
- Sem draft de sessão.
- Abrir a app e recarregar a página.
- Esperado: voltar ao diagnóstico da disciplina ativa, nunca ao seletor vazio.
- Cobertura: Matemática A, Português e Física e Química A.

Depois da reprodução válida, o mesmo ficheiro Playwright será mantido e expandido para os casos de reload antes de responder, após duas respostas, pausa voluntária, diagnóstico concluído e fecho/reabertura do separador.
