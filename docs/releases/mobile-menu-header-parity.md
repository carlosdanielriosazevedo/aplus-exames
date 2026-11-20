# Cabeçalhos estáveis dos quatro menus — 31/10/2026

Base: main `118021d48ae354ec28b029c132d943d5a20b1c4f`. Branch isolada: `codex/stable-menu-headers`.

## Correção

Aprender, Treinar, Ranking e Progresso usavam paddings, bordas, margens negativas, fontes e âncoras diferentes. Até 760px, `app/menu-header.css` normaliza os contentores e a geometria dos cabeçalhos. Os títulos têm uma linha reservada acima de 360px e duas nas larguras menores; todas as descrições reservam três linhas. Progresso mantém o espaço reservado, sem inventar texto nem mover a mascote do cartão de preparação para o cabeçalho.

Os elementos comuns mantêm o mesmo retângulo ao alternar entre menus. As mascotes presentes no cabeçalho são ancoradas à primeira linha do título, independentemente de quebras. Os assets bloqueados e as regras desktop permanecem intactos. A lógica de sessões, XP, progresso e correção não foi alterada.

## Validação efetivamente executada

- Syntax Audit: 637 ficheiros analisados sem erros.
- Unitários: 115 ficheiros e 865 testes passaram.
- Technical Gate: GO, repetido após os ajustes finais.
- Playwright integral: **182 passaram em 7,0 minutos**, sem falhas ou skips.
- Build de produção e orçamento de performance aprovados no arranque Playwright.
- Novo teste geométrico: três disciplinas × seis larguras (320/360/390/430/576/760), quatro menus e regresso a Aprender. Exige igualdade exata de posição/dimensões do logótipo, seletor, ações, menu, slot do título e cabeçalho, além das coordenadas dos títulos/etiquetas. Compara as mascotes presentes com tolerância de 0,02px para arredondamento subpixel de pseudo-elementos versus imagens.
- Testes anteriores mantêm verificações de recuperação, ausência de sobreposição, indicadores com seis dígitos, cartões pausados e layouts desktop. Os checks da mascote passaram a verificar a primeira linha comum em vez da última linha variável.
- Revisão visual de capturas reais do Chromium em Português, 390px; verificada a reserva da descrição de Treinar, que ocupa três linhas nessa largura.

Runtime local: Node 20.20.2, Playwright 1.55.0, Chromium 154 instalado, adaptador externo `/workspace/shared/playwright-local.mjs`. O download do Chromium 140 do Playwright foi bloqueado pela política de rede; vídeo desligado. Logs, medições e capturas desta instância preservados em `/workspace/shared/menu-header-evidence`, fora de Git.

Não foi validado num telemóvel físico nem consultado/publicado em produção. A igualdade geométrica nova cobre o layout compacto até 760px; desktop foi verificado pelas regressões existentes, sem impor-lhe o novo contrato compacto. Sem merge, deployment ou alterações a dados reais.
