import { BrowserRouter, Route, Routes } from "react-router";
import { SiteLayout } from "./layout/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { ShopPage } from "./pages/ShopPage";
import { StoryPage } from "./pages/StoryPage";
import { CartProvider } from "./state/cart";

export function SiteRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:id" element={<ProductPage />} />
        <Route path="story" element={<StoryPage />} />
        <Route path="*" element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <SiteRoutes />
      </BrowserRouter>
    </CartProvider>
  );
}
