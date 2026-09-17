# Regras de arquitetura

## Código versionado não é reescrito durante o build

Esta regra é transversal ao projeto e não está limitada a Português ou Matemática.

- `app/page.js`, `app/globals.css` e qualquer outro ficheiro de código/UI versionado devem conter diretamente o comportamento que chega a produção.
- É proibido criar scripts de build, prebuild, pós-processamento ou migração permanente que localizem texto (`replace`, `includes`, `indexOf`, expressões equivalentes) e reescrevam ficheiros de código para inserir, remover ou alterar funcionalidades.
- `app/page.js` e `app/globals.css` não podem ser alvos de escrita por scripts em `scripts/`.
- Alterações funcionais devem ser feitas no ficheiro fonte ou num módulo/componente importado explicitamente e versionado.
- Geradores de artefactos ou dados podem continuar a existir quando produzem saídas declaradamente geradas a partir de fontes estruturadas; não podem ser usados como forma indireta de aplicar patches textuais ao código da aplicação.
- Uma alteração que dependa de uma frase, import, bloco JSX ou marcador CSS existir exatamente para conseguir compilar é considerada um patch frágil e não deve entrar no repositório.
- Em revisão de código, qualquer nova escrita programática sobre source versionado deve ser tratada como alteração de arquitetura, não como simples detalhe de build.

A regra é validada por `npm run source-rewrite:audit` e faz parte do Technical Gate. Qualquer nova exceção exige alterar explicitamente esta política e o respetivo audit; não deve ser contornada por mudar o nome do script ou esconder a escrita noutro passo do build.
