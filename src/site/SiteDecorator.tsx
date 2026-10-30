import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { CartProvider } from "./state/cart";

/** Wraps a site story in the router and the bag so pages work inside Storybook. */
export function SiteFrame({ path = "/", route = "*", children }: { path?: string; route?: string; children: ReactNode }) {
  return (
    <CartProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={route} element={children} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  );
}
