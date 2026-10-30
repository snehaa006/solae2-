import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import {
  Accordion,
  Button,
  CheckList,
  Container,
  Eyebrow,
  Frame,
  Heading,
  Icon,
  OptionGroup,
  Outfit,
  ProductCard,
  QuantityStepper,
  Section,
  Starburst,
  Tag,
  Text,
} from "../../components";
import { COLOURS, PRODUCTS, SIZES, getProduct, photo, productArt, sar, tintFor, type Art, type ColourId, type Product, type Size } from "../data/catalog";
import { RouterLink } from "../lib/RouterLink";
import { usePageTitle } from "../lib/usePageTitle";
import { useCart } from "../state/cart";
import styles from "./ProductPage.module.css";

type View = { label: string; art?: Art; photo?: string };

function viewsFor(p: Product, colour: ColourId): View[] {
  const art = productArt(p, colour);
  const views: View[] = [{ label: p.category === "sets" ? "The set" : "Front", art }];
  if (p.category === "sets") {
    views.push({ label: "One-piece", art: { top: art.top } }, { label: "Shorts", art: { bottom: art.bottom } });
  }
  if (p.photo) views.push({ label: "Flat lay", photo: p.photo });
  return views;
}

export function ProductPage() {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const p = getProduct(id);
  if (!p) return <NotFound />;
  return <ProductView key={p.id} p={p} initialColour={(params.get("colour") as ColourId) ?? p.hero} onColour={(c) => setParams({ colour: c }, { replace: true })} />;
}

function ProductView({ p, initialColour, onColour }: { p: Product; initialColour: ColourId; onColour: (c: ColourId) => void }) {
  const [colour, setColour] = useState<ColourId>(p.colours.includes(initialColour) ? initialColour : p.hero);
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const { add } = useCart();
  const needsSize = p.category !== "extras";
  usePageTitle(`${p.name} in ${COLOURS[colour].name} · Solae`);

  const views = viewsFor(p, colour);
  const current = views[Math.min(view, views.length - 1)];
  const tint = tintFor(colour);

  const pick = (c: ColourId) => {
    setColour(c);
    onColour(c);
  };

  const addToBag = () => {
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    add({ productId: p.id, colour, size, qty });
  };

  /* everything else, in the chosen colour where it comes in it */
  const related = PRODUCTS.filter((r) => r.id !== p.id)
    .map((r) => ({ r, c: r.colours.includes(colour) ? colour : r.hero }))
    .slice(0, 3);

  return (
    <>
      <Section tone="canvas" padding="none" className={styles.page}>
        <Container>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link to="/shop">Shop</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/shop?c=${p.category}`}>{p.category.replace("-", " ")}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{p.name}</span>
          </nav>

          <div className={styles.grid}>
            <div className={styles.gallery}>
              <div className={styles.main}>
                {current.photo ? (
                  <Frame shape="rounded" ratio="4 / 5" src={photo(current.photo, 1400)} alt={`${p.name}, laid flat`} loading="eager" />
                ) : (
                  <Frame shape="rounded" ratio="4 / 5" tone={tint}>
                    <Outfit {...current.art} alt={`${p.name} in ${COLOURS[colour].name}: ${current.label.toLowerCase()}`} className={styles.mainArt} />
                  </Frame>
                )}
                {p.badge && (
                  <Starburst hue="sunshine" size="clamp(5rem, 4rem + 3vw, 7rem)" className={styles.burst}>
                    {p.badge}!
                  </Starburst>
                )}
              </div>
              {views.length > 1 && (
                <div className={styles.thumbs} role="group" aria-label="Pictures">
                  {views.map((v, i) => (
                    <button key={v.label} type="button" className={styles.thumb} aria-pressed={i === view} aria-label={v.label} onClick={() => setView(i)}>
                      {v.photo ? <img src={photo(v.photo, 300)} alt="" /> : <Outfit {...v.art} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.info}>
              <div className={styles.titleBlock}>
                <Eyebrow>{p.kind}</Eyebrow>
                <Heading as="h1" size="6">
                  {p.name}
                </Heading>
                <p className={styles.price}>{sar(p.price)}</p>
              </div>
              <Text tone="muted">{p.blurb}</Text>

              <OptionGroup
                legend="Colour"
                variant="swatch"
                value={colour}
                onChange={(v) => pick(v as ColourId)}
                options={p.colours.map((c) => ({ value: c, label: COLOURS[c].name, hex: COLOURS[c].hex }))}
              />

              {needsSize && (
                <div>
                  <OptionGroup
                    legend="Size"
                    value={size ?? ""}
                    onChange={(v) => {
                      setSize(v as Size);
                      setSizeError(false);
                    }}
                    options={SIZES.map((s) => ({ value: s, label: s, disabled: s === "XL" && colour === "cherry" }))}
                    aside={
                      <a href="#size" className={styles.guide}>
                        Size guide
                      </a>
                    }
                  />
                  {sizeError && (
                    <p className={styles.error} role="alert">
                      Choose a size first.
                    </p>
                  )}
                </div>
              )}

              <div className={styles.buy}>
                <QuantityStepper value={qty} onChange={setQty} label={`Quantity of ${p.name}`} />
                <Button variant="primary" size="lg" iconStart="bag" onClick={addToBag} className={styles.add}>
                  Add to bag · {sar(p.price * qty)}
                </Button>
              </div>

              <p className={styles.ship}>
                <Icon name="truck" /> Free shipping over SAR 300 · <Icon name="refresh" /> 14-day returns
              </p>

              <CheckList items={p.highlights} />

              <Accordion
                defaultOpen={0}
                items={[
                  {
                    title: "Details",
                    content: (
                      <ul>
                        {p.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    ),
                  },
                  { title: "Fabric & care", content: <p>{p.fabric}</p> },
                  {
                    title: "Size & fit",
                    content: (
                      <div id="size">
                        <p>True to size, with a snug fit that holds in the water. Between sizes? Take the larger one.</p>
                        <table className={styles.sizes}>
                          <thead>
                            <tr>
                              <th scope="col">Size</th>
                              <th scope="col">Age (approx.)</th>
                              <th scope="col">Chest</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ["XS", "10–11", "71–76 cm"],
                              ["S", "12–13", "76–81 cm"],
                              ["M", "14–15", "81–86 cm"],
                              ["L", "16–17", "86–91 cm"],
                              ["XL", "18+", "91–97 cm"],
                            ].map((r) => (
                              <tr key={r[0]}>
                                {r.map((c) => (
                                  <td key={c}>{c}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ),
                  },
                  { title: "Shipping & returns", content: <p>Free shipping across Saudi Arabia on orders over SAR 300. Unworn pieces with their tags can be returned within 14 days.</p> },
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="sunken" className={styles.related} aria-labelledby="related-title">
          <div className={styles.relatedWord} aria-hidden="true">
            set
          </div>
          <Container className={styles.relatedInner}>
            <div className={styles.relatedHead}>
              <Heading id="related-title" size="5">
                Complete the <em>look</em>
              </Heading>
              <Tag variant="soft" hue="lagoon">
                Shown in {COLOURS[colour].name.toLowerCase()}
              </Tag>
            </div>
            <ul className={styles.relatedGrid}>
              {related.map(({ r, c }) => (
                <li key={r.id}>
                  <ProductCard
                    name={r.name}
                    kind={`${COLOURS[c].name} · ${r.kind}`}
                    price={sar(r.price)}
                    media={<Outfit {...productArt(r, c)} alt={`${r.name} in ${COLOURS[c].name}`} />}
                    tone={tintFor(c)}
                    swatches={r.colours.map((x) => COLOURS[x])}
                    href={`/shop/${r.id}?colour=${c}`}
                    linkAs={RouterLink}
                    onQuickAdd={() => add({ productId: r.id, colour: c, size: r.category === "extras" ? null : "M", qty: 1 })}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}

function NotFound() {
  return (
    <Section tone="canvas">
      <Container width="narrow">
        <Eyebrow>Not found</Eyebrow>
        <Heading as="h1" size="6">
          That piece has <em>swum off</em>.
        </Heading>
        <Text tone="muted" style={{ margin: "1rem 0 2rem" }}>
          It may have sold out, or the link is wrong.
        </Text>
        <Button as={Link} to="/shop" variant="primary">
          Back to the shop
        </Button>
      </Container>
    </Section>
  );
}
