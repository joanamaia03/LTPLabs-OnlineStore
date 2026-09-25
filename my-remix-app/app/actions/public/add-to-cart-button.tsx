import { clientEntry, css, on, type Handle, type SerializableProps } from "remix/ui";

type CartItem = {
  productId: number;
  title?: string;
  price?: number;
  thumbnail?: string;
  quantity: number;
};

interface AddToCartButtonProps extends SerializableProps {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
}

const CART_STORAGE_KEY = "online-store-cart";

export const AddToCartButton = clientEntry(
  import.meta.url,
  function AddToCartButton(handle: Handle<AddToCartButtonProps>) {
    let quantity = typeof window === "undefined"
      ? 0
      : readCart().find((item) => item.productId === handle.props.productId)?.quantity ?? 0;
    let showPopup = false;

    return () => (
      <>
        <button
          type="button"
          mix={[
            buttonStyle,
            on("click", async () => {
              let cart = readCart();
              let item = cart.find((entry) => entry.productId === handle.props.productId);

              if (item) {
                item.quantity += 1;
                quantity = item.quantity;
              } else {
                cart.push({
                  productId: handle.props.productId,
                  title: handle.props.title,
                  price: handle.props.price,
                  thumbnail: handle.props.thumbnail,
                  quantity: 1,
                });
                quantity = 1;
              }

              window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
              showPopup = true;
              await handle.update();
            }),
          ]}
        >
          {quantity > 0 ? `Added to Cart (${quantity})` : "Add to Cart"}
        </button>
        {showPopup && (
          <div role="dialog" aria-modal="true" aria-label="Product added to cart" mix={popupOverlay}>
            <div mix={popupCard}>
              <div mix={popupProduct}>
                <img src={handle.props.thumbnail} alt={handle.props.title} mix={popupImage} />
                <div>
                  <p mix={popupEyebrow}>Added to cart</p>
                  <h2 mix={popupTitle}>{handle.props.title}</h2>
                  <p mix={popupQuantity}>Quantity: {quantity}</p>
                </div>
              </div>
              <div mix={popupActions}>
                <a href="/cart" mix={goToCartButton}>Go to Cart</a>
                <button
                  type="button"
                  mix={[continueButton, on("click", () => {
                    showPopup = false;
                    handle.update();
                  })]}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  },
);

function readCart(): CartItem[] {
  try {
    let storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) return [];

    let cart = JSON.parse(storedCart) as unknown;
    if (!Array.isArray(cart)) return [];

    return cart.filter(isCartItem);
  } catch {
    return [];
  }
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  let item = value as Partial<CartItem>;
  return Number.isInteger(item.productId) && typeof item.quantity === "number" && item.quantity > 0;
}

const buttonStyle = css({
  width: "100%",
  background: "#1f2a3a",
  color: "#fff",
  border: "none",
  borderRadius: "0.2rem",
  padding: "0.9rem 1rem",
  fontSize: "0.9rem",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  cursor: "pointer",
});

const popupOverlay = css({
  position: "fixed",
  inset: 0,
  zIndex: 10,
  display: "grid",
  placeItems: "center",
  padding: "1rem",
  background: "rgba(15, 23, 42, 0.35)",
});

const popupCard = css({
  width: "min(100%, 26rem)",
  background: "#fff",
  border: "1px solid #26384d",
  borderRadius: "0.5rem",
  padding: "1.25rem",
  boxSizing: "border-box",
  boxShadow: "0 1rem 2rem rgba(15, 23, 42, 0.18)",
});

const popupProduct = css({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

const popupImage = css({
  width: "5rem",
  height: "5rem",
  objectFit: "contain",
  background: "#e9ecef",
});

const popupEyebrow = css({
  margin: 0,
  color: "#526174",
  fontSize: "0.75rem",
});

const popupTitle = css({
  margin: "0.25rem 0",
  color: "#26384d",
  fontSize: "1rem",
});

const popupQuantity = css({
  margin: 0,
  color: "#526174",
  fontSize: "0.8rem",
});

const popupActions = css({
  display: "flex",
  gap: "0.6rem",
  marginTop: "1.25rem",
  "@media (max-width: 32rem)": { flexDirection: "column" },
});

const goToCartButton = css({
  flex: 1,
  textAlign: "center",
  textDecoration: "none",
  background: "#1f2a3a",
  color: "#fff",
  borderRadius: "0.2rem",
  padding: "0.7rem 0.8rem",
  fontSize: "0.75rem",
  fontWeight: "600",
});

const continueButton = css({
  flex: 1,
  background: "#fff",
  color: "#1f2a3a",
  border: "1px solid #1f2a3a",
  borderRadius: "0.2rem",
  padding: "0.7rem 0.8rem",
  fontSize: "0.75rem",
  cursor: "pointer",
});
