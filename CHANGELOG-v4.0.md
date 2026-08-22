# v4.0 — Build Hardening + Gate Técnico

- Parser real de JS/JSX para todo o source.
- Novo `npm run syntax:audit`.
- Novo `npm run source:hygiene`.
- Novo `npm run technical:gate`.
- O gate agrega motor, fiabilidade, roadmap de revisão e ponte com professor.
- Nova GitHub Action `Beta CI`.
- Cada push/PR para `main` passa a poder executar um build Next.js de produção.
- CI verifica que a aplicação continua a compilar sem Neon configurado.
- TypeScript adicionado apenas como devDependency para parsing/QA; o projeto continua em JavaScript.
