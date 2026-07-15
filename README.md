# VORIA Jewelry

Vitrine demonstrativa premium para a VORIA, criada para apresentar uma marca de joias e semijoias de luxo com linguagem editorial, catálogo navegável e atendimento via WhatsApp.

## O que já está pronto

- Home editorial com hero, coleções, destaques e manifesto de marca.
- Catálogo com seis peças demonstrativas, páginas individuais e categorias.
- Sacola de compras local e consulta de itens pelo WhatsApp.
- Imagens autorais de produto e editoriais com modelos, salvas no próprio projeto.
- Layout responsivo, foco visível e redução de movimento respeitada.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Vitest + ESLint + Prettier

## Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Configuração

Crie um arquivo `.env.local` para definir o WhatsApp que receberá as consultas:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

Sem essa variável, a aplicação usa um número demonstrativo.

## Editar produtos e imagens

O catálogo demonstrativo está centralizado em [`src/lib/catalog.ts`](src/lib/catalog.ts). Ali é possível alterar nome, preço, categoria, descrição, detalhes e imagem de cada peça.

As imagens do protótipo ficam em `public/`:

- `voria-hero.png`: hero principal;
- `voria-earrings.png`: foto de produto;
- `voria-model.png`: editorial com modelo;
- `voria-rings.png`: editorial de anéis e pulseira.

Para trocar uma imagem, adicione o novo arquivo em `public/` e atualize o campo `imageUrl` da peça no catálogo.

## Verificação

```bash
npm run prettier
npm run lint
npm test
npm run build
```
