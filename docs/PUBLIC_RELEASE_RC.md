# APProva+ · Public Release Candidate

Este documento fixa o contrato do ciclo final de hardening antes da beta pública. Não substitui os gates automáticos; resume o que este release candidate tem de provar.

## Bloqueadores resolvidos neste ciclo

- observabilidade client-side com payload técnico mínimo e sem respostas, email ou palavra-passe;
- erro React/global reportado sem expor detalhes técnicos ao aluno;
- ferramentas `/internal/*` fechadas em produção, salvo opt-in administrativo explícito;
- CSP e restantes headers de segurança públicos;
- fallback de armazenamento temporário comunicado ao aluno quando o browser não permite persistência durável;
- paridade do menu principal entre Matemática A, Português e FQ A;
- foco visível, alvos táteis críticos e piso de legibilidade para microtexto;
- Termos e Privacidade adequados à beta pública, incluindo alunos menores e encarregados de educação;
- vocabulário público de conta/progresso simplificado, mantendo conflitos e cópias de segurança tecnicamente seguros;
- sitemap, manifest, metadata social e imagem Open Graph de lançamento;
- Home dividida em bootstrap leve + aplicação de estudo lazy-loaded, recuperando margem de performance;
- `package-lock.json` para instalações reprodutíveis;
- inputs do perfil de ranking normalizados e allowlisted, embora o ranking continue explicitamente em pré-visualização simulada.

## Invariantes que não podem regredir

1. Nunca aumentar budgets de performance para fazer um build passar.
2. Nunca esconder uma falha de persistência sem informar o aluno quando o estado fica apenas temporário no separador.
3. Nunca transportar drafts de sessão pela cloud sem um protocolo próprio de conflitos.
4. Nunca expor detalhes de stack, migrations, fornecedores ou mensagens técnicas ao aluno em estados de erro normais.
5. Nunca abrir ferramentas internas em produção por simples conhecimento do URL.
6. Nunca permitir que Português ou FQ A se afastem da navegação/base visual comum sem uma razão pedagógica explícita.
7. Nunca fazer merge deste RC se Unit, Technical Gate, Public Launch Hardening, Release Candidate Journey, build e Performance Budget não estiverem verdes no SHA final.

## Validação humana ainda obrigatória

Depois de chegar a produção, repetir no dispositivo que apresentou o problema original: Matemática A → Diagnóstico → começar → responder → sair/voltar → refresh → fechar/reabrir o browser. O fallback em memória é uma rede de emergência do separador, não uma promessa de persistência após refresh quando os dois Web Storage persistentes estão bloqueados.

Também deve haver smoke humano final em Android real, iPhone/Safari e desktop antes de declarar a beta pública estável.
