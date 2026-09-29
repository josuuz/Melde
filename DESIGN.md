---
name: Meldê
description: Mel, só que cremoso. O rótulo do pote desenrolado como sistema.
colors:
  branco: "#FFFFFF"
  marrom-900: "#30251E"
  marrom-950: "#1E1712"
  mel-400: "#E5A52A"
  mel-200: "#F2CF7E"
  mel-600: "#B8761A"
  mel-800: "#7A4A10"
  mel-50: "#FFF3D6"
  marrom-700: "#4A3A2F"
  marrom-500: "#6E5A4B"
  marrom-300: "#A8978A"
  ink-on-dark-soft: "#CDBDA4"
  alerta: "#9E2A1E"
typography:
  mega:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(7rem, 1rem + 24vw, 27rem)"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 0.6rem + 7.6vw, 8.75rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1rem + 5vw, 6.25rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.375rem, 1rem + 1.4vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 118"
  lead:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 0.95rem + 0.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.38
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  note:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
    fontVariation: "'wdth' 118"
  code:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 118"
rounded:
  r-0: "0"
  r-campo: "10px"
  r-janela: "clamp(22px, 3vw, 52px)"
  r-pill: "999px"
spacing:
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  gutter: "clamp(12px, 1.6vw, 28px)"
  margem: "clamp(16px, 4.4vw, 72px)"
  secao: "clamp(88px, 10vw, 176px)"
components:
  selo:
    backgroundColor: "{colors.mel-400}"
    textColor: "{colors.marrom-900}"
    typography: "{typography.label}"
    rounded: "{rounded.r-pill}"
    padding: "7px 7px 7px 28px"
    height: "58px"
  selo-hover:
    backgroundColor: "{colors.mel-200}"
    textColor: "{colors.marrom-900}"
  selo-escuro:
    backgroundColor: "{colors.marrom-900}"
    textColor: "{colors.mel-50}"
    rounded: "{rounded.r-pill}"
    padding: "7px 7px 7px 28px"
    height: "58px"
  selo-escuro-hover:
    backgroundColor: "{colors.marrom-700}"
    textColor: "{colors.mel-50}"
  selo-compacto:
    backgroundColor: "{colors.mel-400}"
    textColor: "{colors.marrom-900}"
    rounded: "{rounded.r-pill}"
    padding: "5px 5px 5px 18px"
    height: "44px"
  campo-entrada:
    backgroundColor: "{colors.mel-50}"
    textColor: "{colors.marrom-900}"
    typography: "{typography.body}"
    rounded: "{rounded.r-campo}"
    padding: "0 20px"
    height: "58px"
  janela:
    backgroundColor: "{colors.marrom-900}"
    rounded: "{rounded.r-janela}"
  janela-nota:
    backgroundColor: "rgb(30 23 18 / 0.66)"
    textColor: "{colors.mel-50}"
    rounded: "{rounded.r-pill}"
    padding: "6px 10px"
  lacre:
    backgroundColor: "{colors.mel-400}"
    textColor: "{colors.marrom-900}"
    padding: "14px 0"
  tampa:
    backgroundColor: "{colors.marrom-900}"
    textColor: "{colors.mel-50}"
    height: "64px"
---

# Design System: Meldê

## Overview

**Creative North Star: "O rótulo desenrolado"**

A página é o rótulo do pote Meldê aberto na horizontal. Cada seção é um painel do rótulo, numerado como um código de lote (P-01 a P-08), começando numa linha de corte tracejada. O pote dá as regras: o branco do rótulo e o marrom da tampa são os únicos fundos; o dourado do mel é luz, reservado para o produto, a fotografia e a ação. Janelas arredondadas como o ombro do vidro são recortadas no rótulo para mostrar a textura cremosa por trás.

A densidade é de embalagem FMCG: tipografia enorme em caixa-alta expandida contra microtipo de rótulo espaçado, com saltos de escala de até 1:12 entre o título e a nota. Um único fio de mel atravessa a página, desenhado pela rolagem, e é o único elemento líquido do sistema. O movimento é viscoso, lento e nunca elástico. O sistema recusa o mel rústico (kraft, favos, abelhas, serifa sobre creme) e a landing de chocolate com escorridos emoldurando blocos coloridos.

**Key Characteristics:**
- Dois fundos (branco do rótulo, marrom da tampa) e um fundo profundo (sombra da tampa); o dourado é luz, não papel.
- Uma família (Archivo variável) usada pelo eixo de largura: 125% para display, 118% para rótulo, 100% para texto.
- Rótulo quadrado, vidro arredondado: painéis e tabelas sem raio, janelas de foto e botões arredondados.
- Linha de corte tracejada com código "P-0X" abrindo cada painel; o nome do painel vive só na faixa da tampa.
- Um fio de mel contínuo, preenchido e afunilado, com borda âmbar e gota na ponta.
- O circunflexo do "ê" é a seta, o marcador e o separador.

## Colors

Uma paleta tirada do pote: vidro com mel, tampa marrom, rótulo branco; o dourado aparece como luz sobre fundos neutros e quentes.

### Primary
- **Mel Dourado** (mel-400): o produto e a ação. Botão selo, faixa lacre, seleção de texto, ícones de marcador sobre fundo escuro, o traço do peso líquido, a borda do rótulo frontal. Também é o fundo do painel final P-08 (a lista de espera), o único painel inteiro em dourado, porque ali o painel inteiro é a ação.

### Secondary
- **Mel Batido** (mel-200): o realce do mel cremoso. Hover do selo, foco sobre fundo escuro, o "mel" nas fórmulas do P-05, brilho do fio.
- **Âmbar** (mel-600): profundidade do mel; cursor de texto, guias de construção do logo. **Âmbar Escuro** (mel-800): cotas e textos de construção no manual.

### Neutral
- **Branco do Rótulo** (branco): fundo padrão (P-01, P-03, P-04, P-06) e o papel do rótulo frontal.
- **Marrom Profundo** (marrom-900): a tampa. Cor de texto em fundo claro, fundo dos painéis escuros (P-02, P-05, rodapé), faixa da tampa, fundo das janelas antes da imagem carregar, contorno de foco.
- **Sombra da Tampa** (marrom-950): fundo profundo, usado só no P-07 (próximo lote), onde a foto escurecida pede mais noite.
- **Marrom Médio** (marrom-700): hover do selo escuro, tinta secundária sobre o dourado. **Marrom Suave** (marrom-500): tinta secundária sobre branco, polegar da barra de rolagem. **Marrom Névoa** (marrom-300): ícones em repouso na lista de usos.
- **Creme** (mel-50): tinta sobre fundo escuro, fundo dos campos, trilho da barra de rolagem, tintas de amostra no manual. Nunca fundo de painel.
- **Creme Apagado** (ink-on-dark-soft): texto secundário sobre marrom.
- **Alerta** (alerta): só erro de campo, como borda e ponto de 8px; o texto do erro continua em marrom.

Fios e divisórias são derivados, não cores próprias: rgb(48 37 30 / 0.16) sobre branco, rgb(255 243 214 / 0.18) sobre marrom, rgb(48 37 30 / 0.28) sobre dourado.

### Named Rules
**The Jar Rule.** Fundos de painel são só branco, marrom-900 ou marrom-950, com uma exceção: o painel da ação final pode ser inteiro mel-400. Creme é tinta de janela e de campo, nunca chão de painel.

**The Light Rule.** O dourado é luz: produto, foto, ação. Nunca carrega texto corrido nem rótulo pequeno sobre branco; sobre branco ele só aparece como forma (traço, ícone, borda) ou como palavra de escala mega preenchida pela textura do mel.

## Typography

**Display Font:** Archivo variável, auto-hospedada (wght 100–900, wdth 62–125), com Helvetica Neue e Arial
**Body Font:** Archivo (mesma família, largura 100%)
**Label/Mono Font:** Archivo em largura 118%, caixa-alta espaçada

**Character:** Uma grotesca só, esticada como o produto se espalha: caixa-alta preta expandida para gritar, largura normal para conversar, semi-expandida e espaçada para o microtipo de rótulo.

### Hierarchy
- **Mega** (900, 112–432px, 0.78, -0.035em, wdth 125): uma palavra por página, como "MEL.", preenchida pela foto macro da textura via background-clip.
- **Display** (900, 48–140px, 0.86, -0.02em, wdth 125, caixa-alta): o título do hero. No celular vai a 12vw.
- **Headline** (900, 36–100px, 0.86, -0.015em, wdth 125, caixa-alta): títulos de painel; cada painel ajusta o clamp dentro dessa faixa.
- **Title** (800, 22–36px, 1.02, wdth 118, caixa-alta): termos de tabela e listas.
- **Lead** (400, 18–24px, 1.38): a frase de apoio, 24–34ch.
- **Body** (400, 17px, 1.55, wdth 100): texto corrido, até ~38ch nas listas e 52ch no manual.
- **Note** (400, 14px, 1.45, tinta suave): legendas, legal, notas.
- **Label** (700, 12px, 0.12em, wdth 118, caixa-alta): termos de tabela, peso líquido, rótulos de campo.
- **Code** (700, 11px, 0.14em, wdth 118, caixa-alta): códigos de painel e a nota das janelas.

Números usam tabular-nums lining-nums em 900. Títulos usam text-wrap: balance; parágrafos, pretty.

### Named Rules
**The Width Axis Rule.** Hierarquia vem do eixo de largura antes do peso: 125% é voz de embalagem, 118% é microtipo, 100% é leitura. Nenhuma segunda família.

**The Line Reveal Rule.** Títulos grandes são quebrados em linhas (.linha) e revelados linha a linha; a quebra é escrita à mão no HTML, não deixada ao navegador.

## Layout

Grade de rótulo de 12 colunas (max 1680px) com margem clamp(16px, 4.4vw, 72px) e gutter clamp(12px, 1.6vw, 28px), módulo de 8px. Painéis respiram com secao, clamp(88px, 10vw, 176px), em cima e embaixo. A composição é assimétrica: texto em 1–7, foto em 8/9–12, e elementos que escapam do painel (o pote do hero, a macro da textura, a foto do pré) atravessam a divisa com margem negativa.

Cada painel abre com a linha de corte: código "P-0X" em microtipo à esquerda e um fio tracejado de 1px até a margem direita, a clamp(18px, 2.2vw, 32px) do topo. A faixa da tampa (64px, 56px no celular) fica fixa e mostra o código com nome do painel atual ("P-03 · Modo de usar") só a partir de 1080px.

Pontos de quebra observados: 1100/1080px (tampa perde o painel), 900px (colunas empilham, picker vira lista tocável com uma janela 4:3), 860px (nav some, só o selo compacto), 720px (hero reorganiza em pilha: título, janela, pote, rodapé), 560px (formulário em uma coluna, selo esticado).

No desktop o fio de mel corre pelas margens e pelas fotos da coluna direita. No celular ele pinga do hero, afina até sumir e cai de novo na colher final, para não parecer barra de rolagem.

## Elevation & Depth

Plano por padrão; a profundidade é física e pertence a objetos, não a cartões. O pote e o rótulo frontal têm sombra longa e difusa, como se estivessem sobre uma mesa; o lacre projeta sombra por estar inclinado sobre os painéis. Os fundos se separam por cor (branco, marrom, marrom profundo), não por sombra.

### Shadow Vocabulary
- **Produto** (`box-shadow: 0 30px 60px -28px rgb(30 23 18 / 0.55)`): objetos físicos. O pote recortado usa o equivalente em `filter: drop-shadow(0 36px 40px rgb(30 23 18 / 0.28))`.
- **Selo** (`box-shadow: 0 14px 28px -16px rgb(122 74 16 / 0.75)`): só no hover do botão dourado, uma poça âmbar embaixo.
- **Lacre** (`box-shadow: 0 18px 30px -22px rgb(30 23 18 / 0.6)`): a faixa inclinada sobre o painel seguinte.
- **Rótulo frontal** (`0 50px 80px -56px rgb(30 23 18 / 0.6)` no vidro, `0 24px 40px -26px rgb(30 23 18 / 0.55)` no rótulo).

### Named Rules
**The Object Shadow Rule.** Só coisa que existe na mesa projeta sombra: pote, rótulo, lacre, selo em hover. Blocos de texto, tabelas e painéis nunca.

## Shapes

Rótulo quadrado, vidro arredondado. Painéis, tabelas, lacre e faixa da tampa têm cantos retos (r-0). Janelas de foto usam o ombro do pote, clamp(22px, 3vw, 52px), e ganham um contorno de corte: 1px na cor do fio, afastado clamp(6px, 0.7vw, 10px), como se a janela fosse vazada no papel. Botões, notas de janela e o link de pular são pílulas; o ponto do selo é um círculo. Campos têm 10px. Divisórias de tabela são 3px (topo e fim) e 1px (entre linhas); a linha de corte é tracejada.

## Components

### Buttons
Tátil e cheio: um lacre dourado com um ponto marrom que carrega a seta.
- **Shape:** pílula (r-pill), 58px de altura, com círculo interno de 44px encostado à direita.
- **Primary (selo):** fundo mel-400, texto marrom-900 em 14px 800, wdth 118, 0.1em, caixa-alta; ponto marrom-900 com o circunflexo creme girado 90°.
- **Hover / Focus:** fundo passa a mel-200 com sombra Selo; o ponto anda 4px para a direita no ease-mel. Active: scale(0.98). Foco: contorno de 3px marrom-900 (mel-200 sobre escuro) a 3px. Carregando: o circunflexo gira.
- **Escuro (selo--escuro):** fundo marrom-900, texto creme, ponto dourado; hover marrom-700. Usado sobre o painel dourado (envio da lista).
- **Compacto:** 44px com ponto de 34px, na faixa da tampa, sem sombra no hover.

### Links
Sublinhado de 1.5px a 0.22em, na cor do texto a 45%; no hover o sublinhado vira mel-400. Na tampa, a navegação usa um traço dourado de 2px que cresce da esquerda.

### Inputs / Fields
- **Style:** fundo creme, 58px, raio 10px, borda de 2px transparente; rótulo em Label acima, gap 8px.
- **Focus:** borda marrom-900 e halo de 4px rgb(48 37 30 / 0.16).
- **Error:** borda alerta e mensagem em marrom com ponto alerta de 8px. Sucesso: bloco marrom com o check dourado.

### Navigation (faixa da tampa)
Faixa marrom fixa: logotipo creme de 108px, código do painel atual (troca com fade e 6px de subida), links creme 14px 600, selo compacto à direita. Abaixo de 860px, só logo e selo.

### Janela (signature)
Foto emoldurada pelo ombro do pote, fundo marrom, contorno de corte afastado, e uma nota pílula "Imagem ilustrativa" em marrom translúcido com creme (11px, 600, caixa-alta). Toda imagem autoral leva a nota enquanto não houver ensaio real. Imagens dentro da janela ganham parallax de 4–6% com escala 1.14.

### Tabela do rótulo
Linhas de definição em 5/7 colunas: termo em Label, valor em body; fio de 3px na cor do texto no topo e no fim, 1px entre linhas, 22px/20px de respiro.

### Lacre
Faixa dourada com microtipo marrom 13px 800 caixa-alta, frases separadas pelo circunflexo, inclinada -2°, cruzando a divisa entre painéis; o trilho se move com a rolagem (0.22× do scroll), parado com movimento reduzido.

### Fio de mel (signature)
Um fio contínuo desenhado como polígonos preenchidos e afunilados, não como traço: grosso ao sair da colher (18px desktop, 10px celular), afinando até 7.5px/4.2px com um leve pescoço. Camadas: borda âmbar, corpo mel-400, brilho mel-200 e reflexo creme claro, com uma gota na ponta. A ponta acompanha a rolagem a 86% da altura da tela; com movimento reduzido o fio aparece inteiro. Sobre as janelas ele é recortado pela forma da janela, para a gota pousar na colher.

### Rótulo frontal
O rótulo do pote em escala de parede no P-06: vidro dourado com a textura por trás e dois reflexos verticais, rótulo branco arredondado dentro, logotipo, "ORIGINAL / mel cremoso" e a base "100% MEL · PESO LÍQUIDO 250 g" sobre fio dourado. Medido em unidades de container (cqi) para escalar inteiro; no celular vai de borda a borda sem raio.

### Motion
Viscoso, nunca elástico. ease-mel cubic-bezier(0.2, 0.7, 0.1, 1) para revelações e deslocamentos; ease-out cubic-bezier(0.16, 1, 0.3, 1) para interface. Durações: 180ms hover, 320ms interface, 900ms revelação, 1200ms entrada. O hero entra uma vez, orquestrado (título por linha, janela abre por clip-path, pote sobe, rodapé por último); o conteúdo é visível sem JS e tudo para com prefers-reduced-motion.

## Do's and Don'ts

### Do:
- **Do** abrir cada painel novo com a linha de corte e o código "P-0X" puro; o nome vai só na faixa da tampa.
- **Do** colocar fotografia dentro de uma janela com o raio r-janela e o contorno de corte afastado, com a nota "Imagem ilustrativa" enquanto a imagem for autoral.
- **Do** usar o selo dourado para a ação principal e o selo escuro quando o fundo já for dourado.
- **Do** fazer setas, marcadores e separadores com o circunflexo girado; ícones utilitários (mais, menos, check, fechar, sacola) seguem a mesma grade de 24px com traço de 3px arredondado.
- **Do** manter a hierarquia no eixo de largura: 125% display, 118% rótulo, 100% texto.
- **Do** usar ease-mel e durações de 900–1400ms para qualquer revelação, com versão estática para movimento reduzido.

### Don't:
- **Don't** usar creme (mel-50) como fundo de painel; ele é tinta de janela e de campo.
- **Don't** escrever texto corrido ou rótulo pequeno em dourado sobre branco.
- **Don't** adicionar um segundo elemento líquido: nada de escorridos emoldurando bordas de painel ou blocos coloridos; o único mel que escorre é o fio contínuo.
- **Don't** usar favos, hexágonos decorativos, abelhas, kraft ou serifa sobre creme.
- **Don't** colocar sombra em blocos de texto, tabelas ou painéis; sombra é de objeto.
- **Don't** trazer uma segunda família tipográfica nem um conjunto de ícones de terceiros.
- **Don't** usar molas ou overshoot no movimento.
