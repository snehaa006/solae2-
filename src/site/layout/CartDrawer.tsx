import { Link } from "react-router";
import { Button, Drawer, IconButton, Outfit, QuantityStepper } from "../../components";
import { COLOURS, FREE_SHIPPING, getProduct, productArt, sar } from "../data/catalog";
import { lineKey, useCart } from "../state/cart";
import styles from "./CartDrawer.module.css";

export function CartDrawer() {
  const { lines, subtotal, open, setOpen, setQty, remove } = useCart();
  const left = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      title="Your bag"
      footer={
        lines.length > 0 && (
          <div className={styles.foot}>
            <div className={styles.total}>
              <span>Subtotal</span>
              <span>{sar(subtotal)}</span>
            </div>
            <Button variant="primary" size="lg" fullWidth iconEnd="arrowRight" onClick={() => alert("This is a mock store, so checkout stops here.")}>
              Checkout
            </Button>
            <p className={styles.small}>Taxes included. Shipping worked out at checkout.</p>
          </div>
        )
      }
    >
      {lines.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Your bag is empty.</p>
          <p>Start with a set: a one-piece and shorts that match.</p>
          <Button as={Link} to="/shop?c=sets" variant="secondary" onClick={() => setOpen(false)}>
            Shop sets
          </Button>
        </div>
      ) : (
        <>
          <div className={styles.ship} role="status">
            <p>{left > 0 ? `You're ${sar(left)} away from free shipping.` : "You've got free shipping."}</p>
            <div className={styles.meter} aria-hidden="true">
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
          </div>
          <ul className={styles.lines}>
            {lines.map((l) => {
              const p = getProduct(l.productId)!;
              const key = lineKey(l);
              return (
                <li key={key} className={styles.line}>
                  <div className={styles.thumb}>
                    <Outfit {...productArt(p, l.colour)} />
                  </div>
                  <div className={styles.info}>
                    <Link to={`/shop/${p.id}?colour=${l.colour}`} className={styles.name} onClick={() => setOpen(false)}>
                      {p.name}
                    </Link>
                    <p className={styles.meta}>
                      {COLOURS[l.colour].name}
                      {l.size && ` · ${l.size}`}
                    </p>
                    <div className={styles.row}>
                      <QuantityStepper size="sm" value={l.qty} onChange={(q) => setQty(key, q)} label={`Quantity of ${p.name}`} />
                      <span className={styles.price}>{sar(p.price * l.qty)}</span>
                    </div>
                  </div>
                  <IconButton icon="close" size="sm" label={`Remove ${p.name}`} onClick={() => remove(key)} className={styles.remove} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Drawer>
  );
}
