import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Marquee } from "../../components";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";

const ANNOUNCEMENTS = ["Free shipping on orders over SAR 300", "Drop 01 is here", "Modest · matching · made for summer", "Designed in Saudi Arabia"];

export function SiteLayout() {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash, search]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Marquee items={ANNOUNCEMENTS} tone="lagoon" speed={45} />
      <Header overlay={pathname === "/"} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
