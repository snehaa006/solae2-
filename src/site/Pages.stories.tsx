import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { SiteRoutes } from "./App";
import { CartProvider } from "./state/cart";

/** The whole mock site, page by page, running on an in-memory router. Links work between stories' pages too. */
function Site({ path }: { path: string }) {
  return (
    <CartProvider>
      <MemoryRouter initialEntries={[path]}>
        <SiteRoutes />
      </MemoryRouter>
    </CartProvider>
  );
}

const meta = {
  title: "Website/Pages",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = { render: () => <Site path="/" /> };
export const Shop: Story = { render: () => <Site path="/shop" /> };
export const Product: Story = { render: () => <Site path="/shop/flounce-set?colour=palm" /> };
export const OurStory: Story = { name: "Our story", render: () => <Site path="/story" /> };
