import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button/Button";
import { Eyebrow, Heading, Text } from "../Typography/Typography";
import { Container, Section, type SectionTone } from "./Layout";

const meta = {
  title: "Components/Section",
  component: Section,
  tags: ["autodocs"],
  args: { tone: "canvas", padding: "m" },
  argTypes: {
    tone: { control: "select", options: ["canvas", "surface", "sunken", "lagoon", "lagoonSoft", "coral", "coralSoft", "sunshine", "sunshineSoft", "ink"] },
    padding: { control: "inline-radio", options: ["none", "s", "m", "l"] },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A full-width band in one colour role, with a `Container` inside for the content column. Dark tones (lagoon, ink) flip the text roles to paper automatically, so headings, eyebrows and buttons keep working.",
      },
    },
  },
  render: (args) => (
    <Section {...args}>
      <Container>
        <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
          <Eyebrow>Section · {args.tone}</Eyebrow>
          <Heading size="5">
            The summer <em>edit</em>
          </Heading>
          <Text measure>One-pieces, shorts that match them, and a few extras.</Text>
          <Button variant="secondary">Shop now</Button>
        </div>
      </Container>
    </Section>
  ),
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Canvas: Story = {};
export const Lagoon: Story = { args: { tone: "lagoon" } };
export const Coral: Story = { args: { tone: "coral" } };
export const Sunshine: Story = { args: { tone: "sunshine" } };

const tones: SectionTone[] = ["canvas", "sunken", "lagoonSoft", "coralSoft", "sunshineSoft", "lagoon", "coral", "sunshine", "ink"];
export const AllTones: Story = {
  render: () => (
    <>
      {tones.map((t) => (
        <Section key={t} tone={t} padding="s">
          <Container>
            <Heading size="3">
              {t} <em>section</em>
            </Heading>
          </Container>
        </Section>
      ))}
    </>
  ),
};
