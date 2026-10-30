import { useState } from "react";
import { Link } from "react-router";
import {
  Button,
  Checker,
  CheckList,
  Container,
  Divider,
  Eyebrow,
  FeatureRow,
  Frame,
  Hand,
  Heading,
  Logo,
  NoteCard,
  OptionGroup,
  Outfit,
  Section,
  Sparkle,
  Starburst,
  Sticker,
  Stripes,
  Tag,
  Text,
  ValueCard,
  WaveRibbon,
} from "../../components";
import { CATEGORIES, COLOURS, getProduct, photo, productArt, sar, sticker, type ColourId } from "../data/catalog";
import { usePageTitle } from "../lib/usePageTitle";
import styles from "./HomePage.module.css";

export function HomePage() {
  usePageTitle("Solae · Modest swim sets, made for the sun");
  return (
    <>
      <Hero />
      <Intro />
      <Promises />
      <Stripes hue="lagoon" height="auto" labels={["Modest", "Matching", "Made for summer"]} />
      <Categories />
      <Featured />
      <SummerEdit />
      <Different />
      <Lookbook />
      <Note />
    </>
  );
}

/* 1 · Hero. Sage: a full-bleed photo with the name huge across its foot, in the
   page colour, so the letters rise out of the next section. The Queen: a
   short serif line with one italic word, and a pill button. */
function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img className={styles.heroImg} src={photo("27330805", 2000)} alt="A straw sun hat that reads “hello sunshine”, at the edge of a bright blue pool" fetchPriority="high" />
      <div className={styles.heroShade} aria-hidden="true" />
      <Container className={styles.heroContent}>
        <Eyebrow tone="inverse">Drop 01 · Summer 2026</Eyebrow>
        <Heading as="h1" id="hero-title" size="6" tone="inverse" className={styles.heroTitle}>
          Modest swim sets, <em>made for the sun</em>
        </Heading>
        <div className={styles.heroCtas}>
          <Button as={Link} to="/shop?c=sets" variant="sun" iconEnd="arrowRight">
            Shop the sets
          </Button>
          <Button as={Link} to="/story" variant="inverse">
            Our story
          </Button>
        </div>
      </Container>
      <div className={styles.heroWord} aria-hidden="true">
        <Logo variant="wordmark" tone="paper" title="" />
      </div>
    </section>
  );
}

/* 2 · Intro. Sage's "New philosophy of selfcare" block and The Queen's bold
   statement with a handwritten aside, next to a soft-cornered photo. */
function Intro() {
  return (
    <Section tone="canvas" className={styles.intro}>
      <Container className={styles.introGrid}>
        <div className={styles.introText}>
          <Eyebrow rule>Hello, we're Solae</Eyebrow>
          <Heading size="5">
            Coverage, comfort and confidence, <em>without</em> giving up on style.
          </Heading>
          <Hand className={styles.introHand} rotate={-3}>
            made for girls like me. G.
          </Hand>
          <Text tone="muted" measure>
            Solae makes matching swim sets: a one-piece paired with shorts, cut from the same fabric. Designed in Saudi Arabia for teen girls who want to swim
            in something that feels like theirs.
          </Text>
          <Button as={Link} to="/story" variant="secondary" iconEnd="arrowRight">
            More about Solae
          </Button>
        </div>
        <div className={styles.introMedia}>
          <Frame shape="rounded" ratio="4 / 5" src={photo("36188914", 1200)} alt="Striped towels on the edge of a turquoise pool" />
          <Sticker src={sticker("sunglasses-coral")} className={styles.introSticker} rotate={-14} float />
        </div>
      </Container>
    </Section>
  );
}

/* 3 · Promises. Kava's row of ringed line icons on a pale band. */
function Promises() {
  return (
    <Section tone="lagoonSoft" padding="m">
      <Container>
        <FeatureRow
          hue="coral"
          items={[
            { icon: "set", title: "Made to match", text: "A one-piece and shorts in the same fabric." },
            { icon: "layers", title: "Fully lined", text: "Opaque in and out of the water." },
            { icon: "sun", title: "UPF 50+", text: "Sun protection woven into the fabric." },
            { icon: "pin", title: "Designed in Saudi Arabia", text: "By a girl who needed it first." },
          ]}
        />
      </Container>
    </Section>
  );
}

/* 4 · Categories. Dollop's "Find your new fav": product cut-outs on a bold
   blue ground with a big friendly line. Helm House's "what's trending":
   doorway frames with a thin ring and italic captions. */
function Categories() {
  const art: Record<string, { top?: string; bottom?: string }> = {
    sets: { top: sticker("suit-flounce-coral"), bottom: sticker("shorts-coral") },
    "one-pieces": { top: sticker("suit-flounce-tropical") },
    shorts: { bottom: sticker("shorts-cerulean") },
    extras: { bottom: sticker("sunglasses") },
  };
  return (
    <Section tone="lagoon" className={styles.cats} aria-labelledby="cats-title">
      <Container>
        <div className={styles.catsHead}>
          <Heading id="cats-title" size="6" tone="sun" align="center">
            find your <em>new favourite</em>
          </Heading>
        </div>
        <ul className={styles.catsList}>
          {CATEGORIES.map((c, i) => (
            <li key={c.id} className={styles.cat}>
              <Link to={`/shop?c=${c.id}`} className={styles.catLink}>
                <Frame shape={i % 2 ? "oval" : "arch"} ring ratio="3 / 4" tone="paper" className={styles.catFrame}>
                  <Outfit {...art[c.id]} className={styles.catOutfit} />
                </Frame>
                <span className={styles.catName}>{c.label}</span>
                <span className={styles.catBlurb}>{c.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.catsFoot}>
          <Button as={Link} to="/shop" variant="link" iconEnd="arrowRight">
            View everything
          </Button>
        </div>
      </Container>
      <WaveRibbon text="Made for the sun · true to who you are" tone="sunshine" className={styles.catsRibbon} />
    </Section>
  );
}

/* 5 · Featured set. Kava's "Indispensable in your daily routine": the product
   large in a rounded colour block, the copy beside it with a stamp-like badge.
   Thynk Natural: the zig-zag "NEW!" seal and outlined pills. */
function Featured() {
  const p = getProduct("flounce-set")!;
  const [colour, setColour] = useState<ColourId>("coral");
  return (
    <Section tone="canvas" className={styles.featured} aria-labelledby="featured-title">
      <Container className={styles.featuredGrid}>
        <div className={styles.featuredMedia}>
          <Frame shape="rounded" ratio="1 / 1" tone="coral" className={styles.featuredFrame}>
            <Outfit {...productArt(p, colour)} alt={`${p.name} in ${COLOURS[colour].name}`} className={styles.featuredOutfit} />
          </Frame>
          <Starburst hue="sunshine" size="clamp(5.5rem, 4rem + 5vw, 8.5rem)" className={styles.featuredBurst} spin>
            New!
          </Starburst>
        </div>
        <div className={styles.featuredText}>
          <Eyebrow>New this summer</Eyebrow>
          <Heading id="featured-title" size="6">
            The Flounce <em>Set</em>
          </Heading>
          <Text tone="muted" measure>
            {p.blurb}
          </Text>
          <div className={styles.pills}>
            <Tag>UPF 50+</Tag>
            <Tag>Fully lined</Tag>
            <Tag>7 colours</Tag>
          </div>
          <OptionGroup
            legend="Colour"
            variant="swatch"
            value={colour}
            onChange={(v) => setColour(v as ColourId)}
            options={p.colours.map((c) => ({ value: c, label: COLOURS[c].name, hex: COLOURS[c].hex }))}
          />
          <div className={styles.featuredBuy}>
            <span className={styles.featuredPrice}>{sar(p.price)}</span>
            <Button as={Link} to={`/shop/${p.id}?colour=${colour}`} variant="primary" iconEnd="arrowRight">
              Shop the set
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* 6 · The summer edit. Thynk Natural's collection list: alternating rows,
   notched-corner frames with a zig-zag price seal, check-mark benefits, and a
   hairline between rows pinned with a long sparkle. */
function SummerEdit() {
  const rows: Array<{ id: string; colour: ColourId; tone: "lagoon" | "coral" | "sunshine" }> = [
    { id: "flounce-set", colour: "palm", tone: "sunshine" },
    { id: "flounce-one-piece", colour: "powder", tone: "coral" },
    { id: "boardwalk-short", colour: "cherry", tone: "lagoon" },
  ];
  return (
    <Section tone="sunken" className={styles.edit} aria-labelledby="edit-title">
      <Container>
        <div className={styles.editHead}>
          <Heading id="edit-title" size="5">
            The summer <em>edit</em>
          </Heading>
          <Tag variant="outline">@solae.swim</Tag>
        </div>
      </Container>
      {rows.map((r, i) => {
        const p = getProduct(r.id)!;
        return (
          <div key={r.id}>
            <Divider sparkle={i % 2 ? "start" : "end"} />
            <Container className={[styles.editRow, i % 2 && styles.editRowFlip].filter(Boolean).join(" ")}>
              <div className={styles.editMedia}>
                <Frame shape="ticket" ratio="5 / 4" tone={r.tone}>
                  <Outfit {...productArt(p, r.colour)} className={styles.editOutfit} />
                </Frame>
                <Starburst hue={r.tone === "sunshine" ? "coral" : "sunshine"} size="clamp(4.5rem, 3.5rem + 3vw, 6.5rem)" className={styles.editBurst} rotate={i % 2 ? 8 : -8}>
                  <small>SAR</small>
                  {p.price}
                </Starburst>
              </div>
              <div className={styles.editText}>
                <Heading as="h3" size="4">
                  {p.name}
                </Heading>
                <CheckList items={p.highlights.slice(0, 2)} />
                <Button as={Link} to={`/shop/${p.id}?colour=${r.colour}`} variant="secondary" size="sm" iconEnd="arrowRight">
                  Shop {COLOURS[r.colour].name.toLowerCase()}
                </Button>
              </div>
            </Container>
          </div>
        );
      })}
      <Divider />
    </Section>
  );
}

/* 7 · How we're different. Helm House: a bold colour band edged with check
   strips, a heading with one italic word, and soft cards. The gastrobox site:
   four numbered cards, each tilted a little. */
function Different() {
  const cards = [
    { title: <>Made to <em>match</em></>, text: "Every one-piece has shorts cut from the same roll of fabric, so the set looks like one outfit.", tone: "paper" as const, art: <Sticker src={sticker("shorts-coral")} outline={false} style={{ width: "4.5rem" }} /> },
    { title: <>Coverage that <em>moves</em></>, text: "Higher necklines, lined shorts and straps that stay put through dives, cartwheels and the walk home.", tone: "sunshine" as const, art: <Sparkle size="3rem" /> },
    { title: <>Made to <em>last</em></>, text: "Chlorine-resistant fabric that keeps its colour summer after summer.", tone: "lagoon" as const, art: <Logo variant="sun" tone="sunshine" title="" style={{ width: "5rem" }} /> },
    { title: <>Made by <em>one of you</em></>, text: "Solae began with a sketch of the sun Ghalia drew in 2024, long before she knew how to make a swimsuit.", tone: "paper" as const, art: <Sticker src={sticker("suit-flounce-tropical")} outline={false} style={{ width: "2.75rem" }} /> },
  ];
  return (
    <section className={styles.diff} aria-labelledby="diff-title">
      <Checker hue="coral" />
      <Section tone="coral" padding="l" as="div">
        <Container>
          <Heading id="diff-title" size="6" align="center" className={styles.diffTitle}>
            how we're <em>different</em>
          </Heading>
          <div className={styles.diffCards}>
            {cards.map((c, i) => (
              <ValueCard key={i} index={`0${i + 1}`} title={c.title} tone={c.tone} art={c.art} rotate={[-2.5, 1.5, -1, 2.5][i]}>
                {c.text}
              </ValueCard>
            ))}
          </div>
          <div className={styles.diffFoot}>
            <Button as={Link} to="/story" variant="primary">
              Read our story
            </Button>
          </div>
        </Container>
      </Section>
      <Checker hue="coral" />
    </section>
  );
}

/* 8 · Lookbook. The Queen's "EXPLORE OUR CLASSES": giant words repeated in
   rows behind three soft-cornered photo cards with centred labels. */
function Lookbook() {
  const shots = [
    { id: "9872701", alt: "A doughnut float and a pineapple float drifting in a pool", label: "Pool days" },
    { id: "4271771", alt: "A blue-grey one-piece with flower straps, laid flat with sunglasses and a straw bag", label: "Packed & ready" },
    { id: "25649794", alt: "A striped beach towel on soft sand", label: "Beach club" },
  ];
  return (
    <Section tone="sunshineSoft" className={styles.look} aria-labelledby="look-title">
      <div className={styles.lookWords} aria-hidden="true">
        {[0, 1, 2, 3].map((r) => (
          <span key={r} className={r % 2 ? styles.lookOutline : undefined}>
            the lookbook · the lookbook · the lookbook ·
          </span>
        ))}
      </div>
      <Container className={styles.lookInner}>
        <h2 id="look-title" className="visually-hidden">
          The lookbook
        </h2>
        <ul className={styles.lookCards}>
          {shots.map((s) => (
            <li key={s.id}>
              <Link to="/story#lookbook" className={styles.lookCard}>
                <Frame shape="rounded" ratio="3 / 4" src={photo(s.id, 900)} alt={s.alt} />
                <span className={styles.lookLabel}>{s.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.lookFoot}>
          <Button as={Link} to="/story#lookbook" variant="secondary">
            Explore the lookbook
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* 9 · A note from Ghalia. The Seaborn Co. thank-you card: cabana stripes,
   then a yellow card with a heavy border, a handwritten line on blue tape,
   and spaced labels top and bottom. */
function Note() {
  return (
    <section className={styles.note} aria-label="A note from our founder">
      <Stripes hue="coral" height="100%" className={styles.noteStripes} />
      <Container width="narrow" className={styles.noteInner}>
        <NoteCard
          meta={
            <span className={styles.noteMeta}>
              <span>@solae.swim</span>
              <span>solae.co</span>
            </span>
          }
          note="Thank you for swimming with us"
          signature="Ghalia"
          footer={["Modest", "Matching", "Made for summer"]}
          rotate={-1.5}
        >
          Growing up in Saudi Arabia, I struggled to find swimwear that felt right for me. Every summer I paired a one-piece with mismatched shorts and wished
          there was something better. So I made it, for girls like me who want coverage, comfort and confidence without giving up on style.
        </NoteCard>
      </Container>
    </section>
  );
}
