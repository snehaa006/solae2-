# Solae

A design system, component library and mock store for **Solae**: modest, modern swim sets for teen girls (a one-piece and matching shorts), designed in Saudi Arabia.

Built from scratch in React 19 + TypeScript + Vite, with Storybook 10 for the system.

## Run it

```bash
npm install
npm run dev              # the mock website, http://localhost:5173
npm run storybook        # the design system, http://localhost:6006
```

- `npm run build`: build the tokens, typecheck, and build the site to `dist/`
- `npm run build-storybook`: build Storybook to `storybook-static/`
- `npm run tokens`: rebuild the token outputs from `src/tokens`

## The brief

- **Elegant and simple**: one serif (Fraunces) with a single italic word per heading, one sans (Jost), lots of air.
- **Three colours only**: the blue, pink and yellow from her Brand Starter.

  | | Colour | Hex |
  | --- | --- | --- |
  | Blue | Lagoon | `#119DA4` |
  | Pink | Coral | `#F07167` |
  | Yellow | Sunshine | `#F8E077` |

  Every colour in the interface is a tint or shade of these. Text is the deepest Lagoon, and the page is the palest Sunshine. The swimsuit collection colours from the Brand Starter only show up on the products and their swatches.
- **Fluid type and space**: every size is a `clamp()` that grows from a 360px phone to a 1440px desktop.
- **Section-by-section inspiration** from the boards (see below).
- **Her logo**, vectorised from the logo sheet into SVG, so it can be recoloured anywhere.

## Where things live

```
src/
  tokens/          source of truth: colour.ts, typography.ts, space.ts, shape.ts, fluid.ts
  styles/          tokens.css (generated) and global.css
  components/      the library: one folder per component, with its CSS module and stories
  docs/            Storybook introduction and foundations (colour, type, space, shape, logo, icons)
  site/            the mock website, built only from the library
    data/          catalogue, colourways, prices (SAR)
    state/         the bag (saved to localStorage)
    layout/        header, footer, bag drawer
    pages/         home, shop, product, our story
scripts/build-tokens.ts   writes src/styles/tokens.css and tokens/tokens.json
tokens/tokens.json        W3C design tokens, ready for Figma Tokens Studio
public/img/stickers/      product cut-outs in every collection colour
```

## Components

Logo · Icon · Button and IconButton · Heading, Text, Eyebrow, Hand · Section, Container, Stack · Tag · Starburst · Sparkle and Divider · Stripes, Checker, Edge · Marquee · WaveRibbon · Frame · Sticker and Outfit · ProductCard · OptionGroup · QuantityStepper · Accordion · TextField and NewsletterForm · FeatureRow and CheckList · NoteCard and ValueCard · Drawer

Each has stories with controls and an autodocs page. The whole site is in Storybook too, under **Website/Pages**.

## Where each section came from

| Section | Inspiration | What we took |
| --- | --- | --- |
| Header | Sage | A frosted pill floating over the hero |
| Hero | Sage, The Queen | A full-bleed photo with the wordmark huge across its foot; one italic word in the headline |
| Announcement bar | Kava | A thin running line of short promises |
| Intro | Sage, The Queen | A calm serif statement, a handwritten aside, one soft-cornered photo |
| Promises | Kava | Line icons in rings on a pale band |
| Categories | Dollop, Helm House (Pinterest) | Product cut-outs on a bold blue ground; arch and oval frames with a thin ring |
| Wave ribbon | Kava, Dollop, the gastrobox site | Words drifting along a ribbon across a section edge |
| Featured set | Kava, Thynk Natural | The product large in a colour block, a zig-zag "New!" seal, outlined pills |
| Summer edit | Thynk Natural | Alternating rows, notched frames, price seals, check-mark lists, sparkle dividers |
| How we're different | Helm House, the gastrobox site | A coral band edged with check strips; tilted, numbered cards |
| Lookbook | The Queen | Giant repeated words behind three photo cards |
| Note from Ghalia | Seaborn Co. (Pinterest) | Cabana stripes and a bordered thank-you card with a line on tape |
| Footer | Dollop | A check strip, a pill sign-up, the brand mark huge and cut off at the bottom |
| Shop page head | Sage | A big serif line and outlined filter pills |
| Shop promo tile | Kava | A colour block breaking the grid |
| Complete the look | Sage | A giant word behind the products |

## Images

- **Product stickers** are the cut-outs from the previous draft (one-piece, shorts, sunglasses), recoloured into each collection colour.
- **Photos** are free-licence stand-ins from Pexels, loaded from their CDN, with no people in them. Swap them for the real shoot before launch.

## Notes

- Prices, fabric details and the size chart are placeholders.
- Checkout is a mock: it stops at an alert.
- The site uses browser routing, so a host must serve `index.html` for every path.
