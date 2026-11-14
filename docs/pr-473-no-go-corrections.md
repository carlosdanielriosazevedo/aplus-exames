# PR #473 — correção dos três NO-GO

Base remota confirmada: `2839e79fa7848ec75f9777c694c9c7b56d6d3b8a`.
Branch: `bot/approva-ui-issue-468`; PR em Draft. O checkout inicial estava
limpo, sem stashes nem objetos Git inacessíveis recuperáveis. Não se presumiu
que os dois ficheiros da sessão interrompida tivessem sido publicados.
O relatório anterior `pr-473-mobile-browser-regression.md` descreve a correção
de cor anterior; os seus resultados não certificam esta revisão.

## Implementação

- `public-release.css`: Apronso explicitamente alinhado ao início da mesma
  célula em Aprender/Treinar, com comportamento estático nas duas abas,
  independentemente de `prefers-reduced-motion`. A regra é limitada a estes
  dois heroes; não acrescenta animações nem implementa a issue #469.
- A linha da saudação pode crescer para textos longos. O subtítulo reserva
  duas linhas no intervalo desktop 761–1000 px, impedindo o salto observado
  imediatamente acima do breakpoint. Títulos e explicações extensos podem
  aumentar a altura sem cortes nem deslocar o topo ou a célula do Apronso.
- `StudentTop` é a fonte comum da faixa privada, com o estado `s` disponível.
  As três páginas Aprender deixam de a duplicar. `Shell` conserva a faixa
  exterior apenas em páginas sem `StudentTop`. A faixa partilha a largura e
  o espaçamento do conteúdo. Mantém-se o slot do menu quando não há XP.

## Comparação real com o HEAD publicado

Uma cópia feita por `git archive` do HEAD publicado foi compilada e aberta
apenas em `127.0.0.1:3001`; a correção em `127.0.0.1:3000`. Não se criaram
branches, snapshots de referência nem deployments. Foram recolhidos 36 estados
(2 versões × 3 larguras × 3 modos × 2 abas), capturas e medições; mais capturas
com título longo a 390 px. Os modos são interno, beta por query e estado beta
guardado sem query. As diferenças seguintes são entre Aprender e Treinar:

| Verificação | HEAD publicado | Correção |
|---|---|---|
| Movimento do Apronso | Aprender estático; Treinar `apronsoIdle` | ambos `animation:none; transform:none` |
| Topo beta por query, 390 px | y=25 / 70,6875 px | y=25 / 25 px |
| Topo beta por query, 761/1440 px | y=71 / 96,5 px | y=71 / 71 px |
| Faixa beta sem query | desaparece em Treinar | presente uma vez em ambas as abas |
| Faixa beta por query | dentro do conteúdo / fora do painel | mesma caixa dentro do conteúdo |
| Altura do hero a 761 px | 172 / 193 px | 193 / 193 px |
| Altura do hero a 390/1440 px | 172 / 172 px | 172 / 172 px |

Os cenários focados finais de 320/761 px, interno/privado, XP 123456,
passaram 4/4, incluindo as três disciplinas, navegação e textos longos.
O primeiro teste focado revelou a diferença de 21 px a 761; não se aumentou a
tolerância para a aceitar.

## Regressão e gates

`stable-workspace-slots.spec.mjs` passa a ter 48 cenários de workspace:
320/360/390/759/761/1440 px × movimento normal/reduzido × interno/privado ×
XP 1/123456 e streak 1/365. Cada cenário troca realmente entre as três
disciplinas e abas; Ranking/Progresso verificam o topo quando disponíveis.
Uma identidade aleatória do documento comprova que não houve reload.

Mantêm-se os nove cenários de diagnóstico e todos os outros testes existentes.
Não se alteram as tolerâncias originais de 2 px, os timeouts, retries, gates,
workflows ou baselines. A suite completa contém 221 testes.

O teste mede a caixa inteira do hero e os slots, incluindo a faixa opcional.
A posição do pseudo-elemento de Aprender é medida por uma sonda invisível
com os seus estilos computados na mesma célula da grelha; deixa de ser
inferida a partir da posição presumida do título. Treinar usa o DOMRect da
imagem real. As capturas complementam essa medição indireta do pseudo-elemento.

Saudação, título, explicação e nome completo de disciplina são sujeitos a
textos extensos, incluindo uma sequência sem espaços. Verificam-se caixas de
texto renderizado, sobreposições e ancestrais que possam cortar conteúdo;
`document.scrollWidth` sozinho não prova ausência de cortes. O texto original
é reposto antes da próxima navegação, sem reload. Há capturas normais e
capturas de página inteira com textos longos. O movimento normal é medido
em frames vivos, sem congelar animações nas capturas do workspace.

Comandos de aceitação, após instalar o runtime do workflow:

```sh
npx playwright test --config=playwright.config.mjs
npm run test:unit
npm run syntax:audit
npm run technical:gate
npm run build
```

Os restantes comandos são os de `.github/workflows/beta-ci.yml`. O resultado
integral remoto deve ser lido no check **Beta CI associado ao HEAD desta
correção**, incluindo build/budget e todos os passos posteriores ao browser.
Os resultados focados acima e o CI do HEAD anterior não substituem esse check.

## Limitações e fronteiras

Local: Node 20.20.2, Playwright 1.55.0, Chromium 154.0.8037.57 instalado.
O download do Chromium 140 do Playwright recebeu 403 da política de rede.
A configuração local externa apenas seleciona o browser/ffmpeg instalados,
o destino dos artefactos e o servidor já compilado; preserva todos os limites
e as asserções. O workflow remoto mantém o seu browser e configuração originais.
DATABASE_URL, Auth e Data API ficam vazios; os dados são sintéticos e locais.

As medições cobrem os tamanhos indicados, não todos os browsers ou dispositivos
físicos. O crescimento semântico de textos arbitrariamente longos é permitido;
os elementos persistentes e o Apronso mantêm a âncora. Animações contextuais
continuam pendentes na issue #469. Sem merge, deployment, produção, Neon,
leitura de segredos, alteração de limites financeiros ou execução do worker UI.
