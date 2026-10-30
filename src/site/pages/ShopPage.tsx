import { Fragment } from "react";
import { Link, useSearchParams } from "react-router";
import { Button, Container, Eyebrow, Frame, Heading, Outfit, ProductCard, Section, Stripes, Tag, Text } from "../../components";
import { CATEGORIES, COLOURS, PRODUCTS, photo, productArt, sar, tintFor, type Category, type ColourId } from "../data/catalog";
import { RouterLink } from "../lib/RouterLink";
import { usePageTitle } from "../lib/usePageTitle";
import { useCart } from "../state/cart";
import styles from "./ShopPage.module.css";

const SWIM_COLOURS: ColourId[] = ["coral", "tropical", "cerulean", "powder", "cherry", "palm", "willow"];

/**
 * The shop. Sage's quiet page head (a big serif line and outlined pills), a
 * grid of sticker product shots on pale tints, and one Kava-style colour block
 * that breaks the grid with a line about the brand.
 */
export function ShopPage() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("c") as Category | null;
  const colour = params.get("colour") as ColourId | null;
  const { add } = useCart();
  usePageTitle(`${cat ? CATEGORIES.find((c) => c.id === cat)?.label : "Shop"} · Solae`);

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const groups = CATEGORIES.filter((c) => !cat || c.id === cat)
    .map((c) => ({
      ...c,
      cards: PRODUCTS.filter((p) => p.category === c.id).flatMap((p) =>
        p.colours.filter((col) => !colour || col === colour).map((col) => ({ p, col })),
      ),
    }))
    .filter((g) => g.cards.length > 0);

  return (
    <>
      <Section tone="canvas" padding="none" className={styles.head}>
        <Container>
          <Eyebrow rule>Shop · Drop 01</Eyebrow>
          <Heading as="h1" size="7" className={styles.title}>
            The summer <em>edit</em>
          </Heading>
          <Text tone="muted" measure>
            One-pieces, shorts that match them, and a few extras. Every set comes in seven colours from our first collection.
          </Text>
          <div className={styles.filters}>
            <div className={styles.cats} role="group" aria-label="Category">
              <Tag onClick={() => set("c", null)} pressed={!cat}>
                All
              </Tag>
              {CATEGORIES.map((c) => (
                <Tag key={c.id} onClick={() => set("c", c.id)} pressed={cat === c.id}>
                  {c.label}
                </Tag>
              ))}
            </div>
            <div className={styles.colours} role="group" aria-label="Colour">
              {SWIM_COLOURS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={styles.dot}
                  style={{ background: COLOURS[c].hex }}
                  aria-pressed={colour === c}
                  aria-label={COLOURS[c].name}
                  title={COLOURS[c].name}
                  onClick={() => set("colour", colour === c ? null : c)}
                />
              ))}
              {colour && (
                <button type="button" className={styles.clear} onClick={() => set("colour", null)}>
                  Clear
                </button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="canvas" padding="m" className={styles.body}>
        <Container>
          {groups.length === 0 && (
            <div className={styles.empty}>
              <Text>Nothing in that colour here yet.</Text>
              <Button variant="secondary" onClick={() => set("colour", null)}>
                Show all colours
              </Button>
            </div>
          )}
          {groups.map((g, gi) => (
            <section key={g.id} className={styles.group} aria-labelledby={`g-${g.id}`}>
              <div className={styles.groupHead}>
                <Heading as="h2" size="4" id={`g-${g.id}`}>
                  {g.label}
                </Heading>
                <span className={styles.count}>
                  {g.cards.length} {g.cards.length === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <ul className={styles.grid}>
                {g.cards.map(({ p, col }, i) => (
                  <Fragment key={`${p.id}-${col}`}>
                    {gi === 0 && i === 4 && !colour && (
                      <li className={styles.promo}>
                        <div className={styles.promoText}>
                          <Eyebrow tone="inherit">Our promise</Eyebrow>
                          <Heading as="p" size="5" tone="inherit">
                            Matching is our <em>whole thing</em>.
                          </Heading>
                          <Text tone="inherit" size="-1">
                            Every one-piece has shorts cut from the same fabric, so a set always looks like one outfit, never a one-piece with mismatched shorts.
                          </Text>
                          <Button as={Link} to="/story" variant="primary" size="sm">
                            Why we started
                          </Button>
                        </div>
                        <Frame shape="rounded" ratio="auto" src={photo("4271771", 900)} alt="A one-piece with flower straps, laid flat with sunglasses" className={styles.promoImg} />
                      </li>
                    )}
                    <li>
                      <ProductCard
                        name={p.name}
                        kind={`${COLOURS[col].name} · ${p.kind}`}
                        price={sar(p.price)}
                        media={<Outfit {...productArt(p, col)} alt={`${p.name} in ${COLOURS[col].name}`} />}
                        tone={tintFor(col)}
                        swatches={p.colours.map((c) => COLOURS[c])}
                        badge={p.badge && i < 2 ? p.badge : undefined}
                        href={`/shop/${p.id}?colour=${col}`}
                        linkAs={RouterLink}
                        onQuickAdd={() => add({ productId: p.id, colour: col, size: p.category === "extras" ? null : "M", qty: 1 })}
                      />
                    </li>
                  </Fragment>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </Section>
      <Stripes hue="sunshine" height="auto" labels={["Free shipping over SAR 300", "Easy 14-day returns", "Designed in Saudi Arabia"]} />
    </>
  );
}
