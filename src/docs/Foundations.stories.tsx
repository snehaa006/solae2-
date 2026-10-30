import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { Icon, Logo, iconNames, type LogoTone, type LogoVariant } from "../components";
import { fontFamily, fontSize, palette, radius, semantic, shadow, space, motion } from "../tokens";
import styles from "./Foundations.module.css";

const meta = {
  title: "Foundations",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* WCAG contrast, to label each swatch with what text it can carry. */
function luminance(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a: string, b: string) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

function Page({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Foundations</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.intro}>{intro}</div>
      </header>
      {children}
    </div>
  );
}

export const Colour: Story = {
  render: () => (
    <Page
      title="Colour"
      intro={
        <p>
          Three hues from the Brand Starter, Lagoon, Coral and Sunshine, each stretched into eleven steps. 500 is the brand colour itself. The numbers show
          contrast against the page colour (Sunshine 50) and against Lagoon 950: 4.5 or more is fine for body text, 3 or more for large text and icons.
        </p>
      }
    >
      {Object.entries(palette).map(([hue, scale]) => (
        <section key={hue} className={styles.block}>
          <h2 className={styles.h2}>{hue[0].toUpperCase() + hue.slice(1)}</h2>
          <div className={styles.scale}>
            {Object.entries(scale).map(([step, hex]) => {
              const onPaper = contrast(hex, palette.sunshine[50]);
              const onInk = contrast(hex, palette.lagoon[950]);
              const text = onInk > onPaper ? palette.lagoon[950] : palette.sunshine[50];
              return (
                <div key={step} className={styles.swatch} style={{ background: hex, color: text }}>
                  <strong>{step}</strong>
                  <span>{hex}</span>
                  <small>
                    {onPaper.toFixed(1)} / {onInk.toFixed(1)}
                  </small>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <section className={styles.block}>
        <h2 className={styles.h2}>Semantic roles</h2>
        <p className={styles.note}>Components use these, never the raw steps, so a role can be re-pointed in one place.</p>
        <div className={styles.roles}>
          {Object.entries(semantic).flatMap(([group, roles]) =>
            typeof roles === "string"
              ? [[`--${group}`, roles] as const]
              : Object.entries(roles).map(([role, v]) => [`--${group}-${role.replace(/([A-Z])/g, "-$1").toLowerCase()}`, v] as const),
          ).map(([name, value]) => (
            <div key={name} className={styles.role}>
              <span className={styles.chip} style={{ background: value }} />
              <code>{name}</code>
              <span className={styles.muted}>{value}</span>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.block}>
        <h2 className={styles.h2}>How much of each</h2>
        <div className={styles.ratio}>
          <span style={{ flex: 60, background: palette.sunshine[50] }}>Sunshine 50 · page</span>
          <span style={{ flex: 22, background: palette.lagoon[800], color: palette.sunshine[50] }}>Lagoon · text, dark bands</span>
          <span style={{ flex: 10, background: palette.coral[500] }}>Coral</span>
          <span style={{ flex: 8, background: palette.sunshine[500] }}>Sun</span>
        </div>
      </section>
    </Page>
  ),
};

const sample = "Modest swim sets, made for the sun";

export const Typography: Story = {
  render: () => (
    <Page
      title="Typography"
      intro={
        <p>
          Fraunces for display, Jost for everything else, and a handwritten face for a few words at a time. Every size is fluid: it grows smoothly from a
          360px phone to a 1440px desktop. Drag the canvas edge to watch it.
        </p>
      }
    >
      <section className={styles.block}>
        <h2 className={styles.h2}>Families</h2>
        <div className={styles.families}>
          <div>
            <p className={styles.familySample} style={{ fontFamily: fontFamily.display, fontWeight: 360 }}>
              Aa <em>Aa</em>
            </p>
            <p>
              <strong>Fraunces</strong> · headings, prices, captions. One italic word per heading, at most.
            </p>
          </div>
          <div>
            <p className={styles.familySample} style={{ fontFamily: fontFamily.sans }}>
              Aa
            </p>
            <p>
              <strong>Jost</strong> · body, UI, and spaced capitals for labels.
            </p>
          </div>
          <div>
            <p className={styles.familySample} style={{ fontFamily: fontFamily.hand }}>
              Aa
            </p>
            <p>
              <strong>Nothing You Could Do</strong> · notes and signatures only.
            </p>
          </div>
        </div>
      </section>
      <section className={styles.block}>
        <h2 className={styles.h2}>Fluid scale</h2>
        <div className={styles.typeScale}>
          {Object.entries(fontSize)
            .filter(([k]) => k !== "poster")
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([step, value]) => (
              <div key={step} className={styles.typeRow}>
                <code className={styles.typeStep}>--step-{step}</code>
                <p style={{ fontSize: value, fontFamily: Number(step) >= 1 ? fontFamily.display : fontFamily.sans, lineHeight: 1.15, fontWeight: Number(step) >= 1 ? 360 : 400 }}>
                  {Number(step) >= 4 ? (
                    <>
                      Made for the <em>sun</em>
                    </>
                  ) : (
                    sample
                  )}
                </p>
                <code className={styles.muted}>{value}</code>
              </div>
            ))}
        </div>
      </section>
    </Page>
  ),
};

export const SpaceAndLayout: Story = {
  name: "Space & layout",
  render: () => (
    <Page title="Space & layout" intro={<p>A fluid space scale. Each step is a range, so gaps breathe on wide screens and tighten on phones.</p>}>
      <section className={styles.block}>
        {Object.entries(space).map(([k, v]) => (
          <div key={k} className={styles.spaceRow}>
            <code>--space-{k}</code>
            <span className={styles.spaceBar} style={{ width: v }} />
            <code className={styles.muted}>{v}</code>
          </div>
        ))}
      </section>
    </Page>
  ),
};

export const ShapeAndMotion: Story = {
  name: "Shape & motion",
  render: () => (
    <Page title="Shape & motion" intro={<p>Soft corners, an arch for doorway frames, quiet shadows, and calm easing.</p>}>
      <section className={styles.block}>
        <h2 className={styles.h2}>Radius</h2>
        <div className={styles.tiles}>
          {Object.entries(radius).map(([k, v]) => (
            <div key={k} className={styles.tile}>
              <span className={styles.radiusBox} style={{ borderRadius: v }} />
              <code>--radius-{k}</code>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.block}>
        <h2 className={styles.h2}>Shadow</h2>
        <div className={styles.tiles}>
          {Object.entries(shadow).map(([k, v]) => (
            <div key={k} className={styles.tile}>
              <span className={styles.shadowBox} style={{ boxShadow: v, background: k === "glass" ? palette.lagoon[500] : "#fff" }} />
              <code>--shadow-{k}</code>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.block}>
        <h2 className={styles.h2}>Motion</h2>
        <p className={styles.note}>Hover a row. Everything respects “reduce motion”.</p>
        {Object.entries(motion.duration).map(([k, v]) => (
          <div key={k} className={styles.motionRow} style={{ "--d": v, "--e": motion.easing.standard } as CSSProperties}>
            <code>--dur-{k}</code>
            <span className={styles.motionTrack}>
              <span className={styles.motionDot} />
            </span>
            <code className={styles.muted}>{v}</code>
          </div>
        ))}
      </section>
    </Page>
  ),
};

const logoCombos: Array<{ variant: LogoVariant; tone: LogoTone; bg: string; label: string }> = [
  { variant: "primary", tone: "ink", bg: palette.sunshine[50], label: "Primary · ink on canvas" },
  { variant: "primary", tone: "paper", bg: palette.lagoon[700], label: "Primary · paper on lagoon" },
  { variant: "primary", tone: "sunshine", bg: palette.lagoon[950], label: "Primary · sunshine on ink" },
  { variant: "primary", tone: "ink", bg: palette.coral[500], label: "Primary · ink on coral" },
  { variant: "horizontal", tone: "ink", bg: palette.sunshine[50], label: "Horizontal · headers" },
  { variant: "horizontal", tone: "paper", bg: palette.lagoon[700], label: "Horizontal · reversed" },
  { variant: "sun", tone: "coral", bg: palette.sunshine[50], label: "Sun · icon, labels, the suit" },
  { variant: "sun", tone: "sunshine", bg: palette.lagoon[700], label: "Sun · on lagoon" },
  { variant: "wordmark", tone: "lagoon", bg: palette.sunshine[100], label: "Wordmark" },
];

export const LogoUsage: Story = {
  name: "Logo",
  render: () => (
    <Page
      title="Logo"
      intro={
        <p>
          Vectorised from the logo sheet: the half sun with wavy rays over the horizon, and the SOLAE wordmark. Four lockups, each allowed in five tones. Keep a
          clear space of at least the height of the horizon line all round.
        </p>
      }
    >
      <div className={styles.logoGrid}>
        {logoCombos.map((c) => (
          <figure key={c.label} className={styles.logoCard} style={{ background: c.bg }}>
            <Logo variant={c.variant} tone={c.tone} style={{ width: c.variant === "sun" ? "7rem" : c.variant === "primary" ? "11rem" : "12rem" }} />
            <figcaption>{c.label}</figcaption>
          </figure>
        ))}
      </div>
    </Page>
  ),
};

export const Icons: Story = {
  render: () => (
    <Page title="Icons" intro={<p>24px line icons at a 1.5 stroke. They inherit the text colour and default to 1.25em.</p>}>
      <div className={styles.iconGrid}>
        {iconNames.map((n) => (
          <div key={n} className={styles.iconCell}>
            <Icon name={n} size="1.75rem" />
            <code>{n}</code>
          </div>
        ))}
      </div>
    </Page>
  ),
};
