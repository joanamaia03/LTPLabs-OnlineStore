import { clientEntry, css, on, type Handle } from "remix/ui";

type CartItem = {
  productId: number;
  title?: string;
  price?: number;
  thumbnail?: string;
  quantity: number;
};

const CART_STORAGE_KEY = "online-store-cart";

export const CartContents = clientEntry(
  import.meta.url,
  function CartContents(handle: Handle<{}>) {
    let items: CartItem[] = [];

    handle.queueTask(() => {
      items = readCart();
      handle.update();
    });

    async function updateCart(nextItems: CartItem[]) {
      items = nextItems;
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      await handle.update();
    }

    return () => {
      let subtotal = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
      let shipping = items.length > 0 ? 20 : 0;
      let total = subtotal + shipping;

      return (
        <div mix={cartLayout}>
          <section mix={itemsSection}>
            {items.length === 0 ? (
              <p mix={emptyMessage}>Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <article key={item.productId} mix={cartItemStyle}>
                  <div mix={itemImageFrame}>
                    {item.thumbnail && <img src={item.thumbnail} alt={item.title ?? "Product"} mix={itemImage} />}
                  </div>
                  <div mix={itemDetails}>
                    <p mix={itemTitle}>{item.title ?? "Product"}</p>
                    <p mix={itemPrice}>{formatPrice(item.price ?? 0)}</p>
                    <div mix={itemActions}>
                      <div mix={quantityControl}>
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.title ?? "product"}`}
                          mix={on("click", async () => {
                              let nextQuantity = item.quantity - 1;
                              let nextItems = nextQuantity > 0
                                ? items.map((entry) => entry.productId === item.productId ? { ...entry, quantity: nextQuantity } : entry)
                                : items.filter((entry) => entry.productId !== item.productId);
                              await updateCart(nextItems);
                            })}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.title ?? "product"}`}
                          mix={on("click", async () => {
                              await updateCart(items.map((entry) => entry.productId === item.productId ? { ...entry, quantity: entry.quantity + 1 } : entry));
                            })}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${item.title ?? "product"} from cart`}
                        mix={[removeButton, on("click", async () => {
                            await updateCart(items.filter((entry) => entry.productId !== item.productId));
                          })]}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
          <aside mix={summaryCard}>
            <h2>Cart Summary</h2>
            <div mix={summaryRow}><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div mix={summaryRow}><span>Shipping</span><strong>{formatPrice(shipping)}</strong></div>
            <div mix={totalRow}><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <button type="button" mix={checkoutButton}>Check out</button>
            <p mix={paypalText}>Or pay with PayPal</p>
            <hr mix={summaryDivider} />
            <label mix={promoLabel}>
              Promo code
              <span mix={promoControls}>
                <input type="text" placeholder="Enter code" />
                <button type="button" mix={applyButton}>Apply</button>
              </span>
            </label>
          </aside>
        </div>
      );
    };
  },
);

function readCart(): CartItem[] {
  try {
    let storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) return [];
    let cart = JSON.parse(storedCart) as unknown;
    return Array.isArray(cart) ? cart.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  let item = value as Partial<CartItem>;
  return Number.isInteger(item.productId) && typeof item.quantity === "number" && item.quantity > 0;
}

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

const cartLayout = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 15rem",
  gap: "2rem",
  alignItems: "start",
  "@media (max-width: 48rem)": { gridTemplateColumns: "1fr" },
});

const itemsSection = css({ display: "flex", flexDirection: "column" });
const emptyMessage = css({ color: "#526174", padding: "2rem 0" });
const cartItemStyle = css({ display: "flex", gap: "1rem", padding: "0 0 0.75rem", marginBottom: "0.75rem", borderBottom: "1px solid #9aa3ad" });
const itemImageFrame = css({ width: "6rem", height: "6rem", flex: "0 0 6rem", background: "#e9ecef", display: "grid", placeItems: "center" });
const itemImage = css({ width: "100%", height: "100%", objectFit: "contain" });
const itemDetails = css({ display: "flex", flexDirection: "column", gap: "0.2rem", paddingTop: "0.1rem" });
const itemTitle = css({ margin: 0, fontSize: "0.8rem", color: "#25364b" });
const itemPrice = css({ margin: 0, fontSize: "0.8rem", color: "#25364b" });
const itemActions = css({ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "auto" });
const quantityControl = css({ display: "inline-flex", alignItems: "center", border: "1px solid #26384d", borderRadius: "0.35rem", height: "1.5rem", overflow: "hidden", "& button": { width: "1.7rem", height: "100%", border: 0, background: "#fff", color: "#26384d", cursor: "pointer" }, "& span": { minWidth: "1.2rem", textAlign: "center", fontSize: "0.75rem", color: "#26384d" } });
const removeButton = css({ border: 0, background: "transparent", color: "#26384d", fontSize: "1.35rem", cursor: "pointer", padding: 0 });
const removeIcon = css({ width: "1rem", height: "1rem", display: "block" });
const summaryCard = css({ border: "1px solid #26384d", borderRadius: "0.7rem", padding: "1rem", color: "#26384d", "& h2": { margin: "0 0 1rem", fontSize: "1rem" } });
const summaryRow = css({ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.55rem" });
const totalRow = css({ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", margin: "0.75rem 0" });
const checkoutButton = css({ width: "100%", border: 0, borderRadius: "0.3rem", background: "#26384d", color: "#fff", padding: "0.45rem", fontSize: "0.7rem", cursor: "pointer" });
const paypalText = css({ textAlign: "center", fontSize: "0.6rem", margin: "0.9rem 0" });
const summaryDivider = css({ border: 0, borderTop: "1px solid #c8ced5", margin: "0.75rem 0" });
const promoLabel = css({ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.6rem" });
const promoControls = css({ display: "flex", gap: "0.35rem", "& input": { minWidth: 0, flex: 1, border: "1px solid #718096", borderRadius: "0.3rem", padding: "0.35rem", fontSize: "0.65rem" } });
const applyButton = css({ border: 0, borderRadius: "0.3rem", background: "#26384d", color: "#fff", padding: "0 0.55rem", fontSize: "0.65rem", cursor: "pointer" });
