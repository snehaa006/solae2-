import { Link } from "react-router";
import { Checker, Icon, Logo, NewsletterForm } from "../../components";
import styles from "./Footer.module.css";

/**
 * After Dollop's footer: a check strip, a pale yellow ground, a pill sign-up,
 * and the brand mark huge and cut off at the bottom edge, a sun going down.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <Checker hue="coral" rows={1} cell="1.1rem" />
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.about}>
            <Logo variant="horizontal" tone="ink" className={styles.logo} />
            <p>Modest, modern swim sets for teen girls. Made for morning swims, beach days and everything in between.</p>
            <div className={styles.social}>
              <a href="https://instagram.com" aria-label="Instagram" rel="noreferrer" target="_blank">
                <Icon name="instagram" />
              </a>
              <a href="https://tiktok.com" aria-label="TikTok" rel="noreferrer" target="_blank">
                <Icon name="tiktok" />
              </a>
              <a href="mailto:hello@solae.co" aria-label="Email">
                <Icon name="mail" />
              </a>
            </div>
          </div>
          <nav aria-label="Shop">
            <h2 className={styles.head}>Shop</h2>
            <ul className={styles.list}>
              <li><Link to="/shop?c=sets">Sets</Link></li>
              <li><Link to="/shop?c=one-pieces">One-pieces</Link></li>
              <li><Link to="/shop?c=shorts">Shorts</Link></li>
              <li><Link to="/shop?c=extras">Extras</Link></li>
            </ul>
          </nav>
          <nav aria-label="Solae">
            <h2 className={styles.head}>Solae</h2>
            <ul className={styles.list}>
              <li><Link to="/story">Our story</Link></li>
              <li><Link to="/story#lookbook">Lookbook</Link></li>
              <li><a href="mailto:hello@solae.co">Contact</a></li>
              <li><Link to="/shop/flounce-set#size">Size guide</Link></li>
            </ul>
          </nav>
          <div className={styles.news}>
            <h2 className={styles.newsHead}>
              Sign up for <em>10% off</em> your first set
            </h2>
            <p>New colours, restocks and the odd note from Ghalia. Nothing else.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className={styles.legal}>
          <span>© 2026 Solae. Designed in Saudi Arabia.</span>
          <span>A mock store: no real orders.</span>
        </div>
      </div>
      <div className={styles.sunset} aria-hidden="true">
        <Logo variant="sun" tone="lagoon" title="" />
      </div>
    </footer>
  );
}
