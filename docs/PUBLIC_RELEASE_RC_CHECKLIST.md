# Checklist final · APProva+ Public RC

## Automático — obrigatório no SHA final

- [ ] Unit tests
- [ ] Technical Gate
- [ ] Public Launch Hardening audit
- [ ] Release Candidate Journey audit
- [ ] Cloud resume product contract
- [ ] Competition audit
- [ ] Full production build
- [ ] Performance Budget
- [ ] Vercel Preview READY
- [ ] `/internal/*` 404 em produção/preview sem opt-in administrativo
- [ ] CSP e restantes headers presentes

## Smoke humano — obrigatório depois do deploy

- [ ] Android Chrome: onboarding → Matemática A → diagnóstico → responder → sair/voltar → refresh → fechar/reabrir
- [ ] iPhone/Safari: onboarding e fluxo de estudo equivalente
- [ ] Desktop Chrome/Edge: onboarding e fluxo de estudo equivalente
- [ ] Troca Matemática A ↔ Português ↔ FQ A sem divergências de navegação
- [ ] Conta: entrar, guardar online, terminar sessão, reentrar
- [ ] Dois dispositivos: conflito de progresso e três opções de resolução
- [ ] Sem rede durante sessão + recuperação
- [ ] Zoom 200% e navegação por teclado básica
- [ ] Termos/Privacidade/404/manifest/social image públicos

## Regra de release

Nenhuma funcionalidade nova entra entre RC e lançamento. Apenas correções de blocker, regressão ou inconsistência comprovada. Se um blocker aparecer, corrige-se e nasce RC seguinte; não se baixa um gate para manter a data.
