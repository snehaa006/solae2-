import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { SiteFrame } from "./SiteDecorator";

const meta = {
  title: "Website/Layout",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderOverPhoto: Story = {
  name: "Header · over a photo",
  render: () => (
    <SiteFrame>
      <div style={{ minHeight: 260, background: "url(https://images.pexels.com/photos/27330805/pexels-photo-27330805.jpeg?auto=compress&cs=tinysrgb&w=1600) center/cover" }}>
        <Header overlay />
      </div>
    </SiteFrame>
  ),
};

export const HeaderOnPage: Story = {
  name: "Header · on the page",
  render: () => (
    <SiteFrame>
      <Header />
    </SiteFrame>
  ),
};

export const SiteFooter: Story = {
  name: "Footer",
  render: () => (
    <SiteFrame>
      <Footer />
    </SiteFrame>
  ),
};
