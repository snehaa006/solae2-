import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "../Logo/Logo";
import { Sparkle } from "../Sparkle/Sparkle";
import { NoteCard, ValueCard } from "./Card";

const meta = {
  title: "Components/Cards",
  component: NoteCard,
  tags: ["autodocs"],
  args: {
    meta: "@solae.swim · solae.co",
    note: "Thank you for swimming with us",
    signature: "Ghalia",
    footer: ["Modest", "Matching", "Made for summer"],
    tone: "sunshine",
    rotate: -1.5,
    children: "Every summer I paired a one-piece with mismatched shorts and wished there was something better. So I made it, for girls like me.",
  },
  argTypes: { tone: { control: "inline-radio", options: ["sunshine", "coral", "lagoon"] } },
  decorators: [(Story) => <div style={{ maxWidth: "40rem", padding: "1rem" }}><Story /></div>],
  parameters: { docs: { description: { component: "The Seaborn Co. thank-you card, and the soft value cards from Helm House and the gastrobox site." } } },
} satisfies Meta<typeof NoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThankYouNote: Story = {};
export const CoralNote: Story = { args: { tone: "coral", rotate: 1 } };

export const ValueCards: Story = {
  decorators: [(Story) => <div style={{ padding: "2rem", background: "var(--color-coral-500)" }}><Story /></div>],
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))", gap: "1rem", maxWidth: "62rem" }}>
      <ValueCard index="01" title={<>Made to <em>match</em></>} rotate={-2.5}>
        Every one-piece has shorts cut from the same fabric.
      </ValueCard>
      <ValueCard index="02" tone="sunshine" art={<Sparkle size="3rem" />} title={<>Coverage that <em>moves</em></>} rotate={1.5}>
        Straps that stay put through dives and cartwheels.
      </ValueCard>
      <ValueCard index="03" tone="lagoon" art={<Logo variant="sun" tone="sunshine" title="" style={{ width: "5rem" }} />} title={<>Made to <em>last</em></>} rotate={-1}>
        Chlorine-resistant fabric that keeps its colour.
      </ValueCard>
    </div>
  ),
};
