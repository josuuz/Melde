# Meldê · identidade + landing de lançamento

Mel, só que cremoso. Landing de validação da Meldê Original (mel cremoso, 100% mel, 250 g) e o design system que vai sustentar o e-commerce.

## Abrir

HTML, CSS e JS puros, sem build. Rode um servidor estático na pasta (abrir o arquivo direto no navegador bloqueia as fontes):

```bash
python -m http.server 8765
# http://127.0.0.1:8765/            landing
# http://127.0.0.1:8765/marca.html  manual de marca / design system
```

## Estrutura

```
index.html                 landing (P-01 a P-08 + rodapé)
marca.html                 manual de marca: logo, cor, tipo, grid, componentes, ícones, foto, embalagem, movimento, voz
assets/css/tokens.css      tokens (cores, tipo, grid, espaço, raio, movimento) + @font-face
assets/css/system.css      base, superfícies do navegador e componentes reutilizáveis (selo, campo, janela, tabela, lacre, código de painel)
assets/css/landing.css     composição da landing
assets/css/marca.css       composição do manual
assets/js/main.js          entrada do hero, revelações, parallax, fio de mel, seletor de momentos, lista de espera
assets/brand/              logo em SVG (wordmark nas 4 cores, símbolo ê, favicon, circunflexo)
assets/fonts/              Archivo variável (peso 100–900, largura 62–125%), hospedada no projeto
assets/img/                fotos em WebP responsivo (+ sidecar .json com a proveniência de cada uma)
brand/embalagem/           arte plana do rótulo frontal (HTML + PNG 2x) e master do pote com rótulo
brand/logo-explore/        exploração das 4 assinaturas do ê (preview.html)
tools/                     scripts Python: aplicar rótulo no pote e tratar/exportar as fotos
PRODUCT.md                 verdade de produto (público, posicionamento, restrições)
DESIGN.md                  design system documentado a partir do que foi construído
```

## Lista de espera

O formulário (`#lista`) valida nome + WhatsApp ou e-mail. Para receber os cadastros, preencha `data-endpoint` no `<form>` em `index.html` com uma URL que aceite `POST` em JSON, por exemplo um formulário do Formspree:

```html
<form class="lista" data-lista data-endpoint="https://formspree.io/f/SEU_ID" novalidate>
```

Enquanto o endpoint estiver vazio, os cadastros ficam só no navegador de quem testou (`localStorage`, chave `melde-lista`), então nada chega até vocês.

## Fotografia: trocar pelo ensaio real

Todas as fotos desta versão foram geradas por IA (Higgsfield · Z Image) como direção de arte e estão marcadas "Imagem ilustrativa" na página. O pote é um pote gerado com rótulo em branco, e o rótulo Meldê foi aplicado por código. Antes do lançamento, substitua pelo ensaio real (shot list completo em `marca.html#foto`):

| Arquivo em assets/img | Onde aparece | O que fotografar |
|---|---|---|
| `pote-original-*` (PNG com transparência) | hero, produto, manual | packshot frontal do pote real, fundo branco, recortado |
| `colher-puxa-*` | janela do hero | colher puxando Meldê do pote, fundo marrom |
| `colher-pote-*` | P-02 textura | colher saindo do pote, fio grosso |
| `textura-dobra-*`, `textura-macro-*`, `textura-faca-*` | P-02, "MEL.", P-04, frente do pote em P-06 | macros: dobras, espiral, faca espalhando |
| `momento-*` | P-03 e P-05 | banana, pão, panqueca, iogurte, aveia, pré-treino |
| `protein-teaser-*` | P-07 | teaser escuro (sem revelar o produto) |
| `colherada-*` | P-08 | colherada flutuando, fundo marrom |

Para reprocessar: coloque os originais em `.impeccable/raw/`, ajuste a tabela `PHOTOS` em `tools/process_images.py` e rode `python tools/process_images.py` (requer Pillow e NumPy). Mantenha as larguras exportadas; o HTML usa `srcset` com elas.

## Próxima etapa: e-commerce

- Tokens e componentes já estão separados da composição: `tokens.css` + `system.css` migram como estão para Shopify, Nuvemshop, Next ou Astro.
- O produto está marcado com `data-sku="MELDE-ORIGINAL-250"` e usa a mesma tabela de rótulo que a página de produto vai usar.
- Os ícones de loja (sacola, mais, menos, fechar, confirmado) já existem no traço do circunflexo (`marca.html#icones`).
- Meldê Protein: mesmo pote, tampa e filete mudam de cor, wordmark igual (`marca.html#embalagem`).

## Pendências de produto

Preço, canais de venda, data de lançamento, domínio, redes sociais, contato e o endpoint da lista ainda não foram definidos. O rodapé diz "Instagram e loja online em breve" até lá.
