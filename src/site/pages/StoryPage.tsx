import { Link } from "react-router";
import { Button, Container, Eyebrow, Frame, Hand, Heading, Logo, Outfit, Section, Sticker, Stripes, Text } from "../../components";
import { photo, sticker } from "../data/catalog";
import { usePageTitle } from "../lib/usePageTitle";
import styles from "./StoryPage.module.css";

/**
 * Our story: the portfolio half of the site. Her words from the Brand Starter,
 * the meaning of the name, vision and mission, and the lookbook.
 */
export function StoryPage() {
  usePageTitle("Our story · Solae");
  return (
    <>
      {/* Sage: a quiet page head with a big serif line; her sun beside it. */}
      <Section tone="canvas" padding="m" className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div className={styles.heroText}>
            <Eyebrow rule>Our story</Eyebrow>
            <Heading as="h1" size="7">
              Made for the <em>sun</em>.
            </Heading>
            <Text size="1" tone="muted" measure>
              Solae makes modest, modern swim sets for teen girls: designed for comfort, made for confidence, and true to who they are.
            </Text>
          </div>
          <figure className={styles.heroSun}>
            <Logo variant="sun" tone="sunshine" title="The Solae sun" />
            <Hand className={styles.heroHand} rotate={-4}>
              where it all began, 2024
            </Hand>
          </figure>
        </Container>
      </Section>

      {/* Thynk Natural's two-column text with a framed picture; a postage-stamp frame from the Seaborn postcards. */}
      <Section tone="canvas" padding="l" className={styles.story}>
        <Container className={styles.storyGrid}>
          <div className={styles.storyAside}>
            <Heading size="4">
              It started with a sketch of the <em>sun</em>.
            </Heading>
            <Frame shape="stamp" ratio="4 / 5" src={photo("27330805", 900)} alt="A straw sun hat that reads “hello sunshine” beside a pool" focus="40% 50%" className={styles.stamp} />
          </div>
          <div className={styles.storyText}>
            <p className={styles.lead}>Solae began with a sketch of the sun I drew in 2024, long before I knew how to make a swimsuit.</p>
            <p>
              Growing up in Saudi Arabia, I struggled to find swimwear that felt right for me. Most options were either fully covered or not designed with modesty in
              mind, and very few were both stylish and comfortable. Every summer, I found myself pairing a one-piece with mismatched shorts and wishing there was
              something better.
            </p>
            <p>
              So I decided to create it. Solae makes matching swim sets, a one-piece paired with shorts, for girls like me who want coverage, comfort and confidence
              without giving up on style.
            </p>
            <p>
              The name comes from <em>soleil</em>, the French word for sun. To me, it represents what summer should feel like: bright, free and completely your own.
            </p>
            <Hand className={styles.sign}>Ghalia, founder</Hand>
          </div>
        </Container>
      </Section>

      {/* The name, set large. */}
      <Section tone="sunshine" padding="l" className={styles.name}>
        <Container className={styles.nameInner}>
          <p className={styles.nameWord} aria-hidden="true">
            <span>so·leil</span>
            <span className={styles.nameArrow}>→</span>
            <Logo variant="wordmark" tone="ink" title="" className={styles.nameMark} />
          </p>
          <Text size="1" align="center" measure>
            <em>Soleil</em> is French for sun. Solae is what summer should feel like: bright, free and completely your own.
          </Text>
        </Container>
      </Section>

      {/* Vision and mission, from the Brand Starter. */}
      <Section tone="lagoon" padding="l">
        <Container className={styles.vm}>
          <div>
            <Eyebrow>Vision</Eyebrow>
            <Heading size="4" as="p" className={styles.vmText}>
              To become the Gulf's most-loved swimwear brand for teen girls, where <em>modesty and style</em> go hand in hand.
            </Heading>
          </div>
          <div>
            <Eyebrow>Mission</Eyebrow>
            <Heading size="4" as="p" className={styles.vmText}>
              Modest, modern swim sets for teen girls: designed for comfort, made for <em>confidence</em>, and true to who they are.
            </Heading>
          </div>
        </Container>
      </Section>

      {/* The lookbook: frames from every board, mixed like a pin wall. */}
      <Section tone="canvas" padding="l" id="lookbook" aria-labelledby="lookbook-title">
        <Container>
          <div className={styles.lookHead}>
            <Heading id="lookbook-title" size="6">
              The <em>lookbook</em>
            </Heading>
            <Text tone="muted">Drop 01 · Summer 2026</Text>
          </div>
          <div className={styles.wall}>
            <figure className={styles.w1}>
              <Frame shape="arch" ratio="3 / 4" src={photo("36188914", 1000)} alt="Striped towels on the edge of a pool" />
              <figcaption>
                <Hand>towels out by ten</Hand>
              </figcaption>
            </figure>
            <figure className={styles.w2}>
              <Frame shape="rounded" ratio="1 / 1" tone="coral">
                <Outfit top={sticker("suit-flounce-coral")} bottom={sticker("shorts-coral")} className={styles.wallArt} />
              </Frame>
              <figcaption>
                <Hand>the flounce set, coral</Hand>
              </figcaption>
            </figure>
            <figure className={styles.w3}>
              <Frame shape="oval" ratio="4 / 5" src={photo("9872701", 900)} alt="Pool floats drifting in turquoise water" />
              <figcaption>
                <Hand>pool days</Hand>
              </figcaption>
            </figure>
            <figure className={styles.w4}>
              <Frame shape="stamp" ratio="4 / 5" src={photo("8371478", 900)} alt="A white lace swimsuit laid flat with orange sunglasses and a straw hat" />
              <figcaption>
                <Hand>packing list</Hand>
              </figcaption>
            </figure>
            <figure className={styles.w5}>
              <Frame shape="ticket" ratio="5 / 4" tone="lagoon">
                <Outfit top={sticker("suit-flounce-palm")} bottom={sticker("shorts-palm")} className={styles.wallArt} />
              </Frame>
              <figcaption>
                <Hand>palm, our favourite</Hand>
              </figcaption>
            </figure>
            <figure className={styles.w6}>
              <Frame shape="rounded" ratio="3 / 4" src={photo("25649794", 900)} alt="A striped beach towel on the sand" />
              <figcaption>
                <Hand>beach club</Hand>
              </figcaption>
            </figure>
            <Sticker src={sticker("sunglasses")} className={styles.wallSticker} rotate={10} />
          </div>
        </Container>
      </Section>

      <Stripes hue="lagoon" height="auto" className={styles.cta}>
        <div className={styles.ctaCard}>
          <Heading size="4" align="center">
            Ready for <em>summer</em>?
          </Heading>
          <Button as={Link} to="/shop" variant="primary" iconEnd="arrowRight">
            Shop Drop 01
          </Button>
        </div>
      </Stripes>
    </>
  );
}
