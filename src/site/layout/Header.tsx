import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Drawer, IconButton, Logo, NewsletterForm } from "../../components";
import { useCart } from "../state/cart";
import styles from "./Header.module.css";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/shop?c=sets", label: "Sets" },
  { to: "/story", label: "Our story" },
  { to: "/story#lookbook", label: "Lookbook" },
];

/**
 * A frosted pill that floats over the hero, after Sage, and settles into a
 * solid bar once you scroll.
 */
export function Header({ overlay = false }: { overlay?: boolean }) {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const glass = overlay && !scrolled;

  return (
    <>
      <header className={[styles.wrap, overlay && styles.overlay].filter(Boolean).join(" ")}>
        <div className={[styles.bar, glass ? styles.glass : styles.solid].join(" ")}>
          <nav className={styles.nav} aria-label="Main">
            <IconButton icon="menu" label="Menu" className={styles.menuBtn} onClick={() => setMenu(true)} />
            <ul className={styles.links}>
              {NAV.slice(0, 3).map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} className={({ isActive }) => [styles.link, isActive && n.to === "/story" && styles.active].filter(Boolean).join(" ")} end>
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/" className={styles.brand} aria-label="Solae, home">
            <Logo variant="horizontal" tone={glass ? "paper" : "ink"} title="" className={styles.logo} />
          </Link>
          <div className={styles.actions}>
            <Link to="/story#lookbook" className={[styles.link, styles.hideSm].join(" ")}>
              Lookbook
            </Link>
            <IconButton icon="bag" label="Bag" badge={count} onClick={() => setOpen(true)} />
          </div>
        </div>
      </header>

      <Drawer open={menu} onClose={() => setMenu(false)} title="Menu" side="left">
        <ul className={styles.mobileLinks}>
          {[{ to: "/", label: "Home" }, ...NAV].map((n) => (
            <li key={n.to}>
              <Link to={n.to} onClick={() => setMenu(false)}>
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileNews}>
          <p>10% off your first set when you join the list.</p>
          <NewsletterForm />
        </div>
      </Drawer>
    </>
  );
}
