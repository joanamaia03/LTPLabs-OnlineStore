import { on, type Handle } from "remix/ui";
import { Document } from "./document.tsx";
import { CartContents } from "./public/cart-contents.tsx";
import * as styles from "../styles.ts";

export function CartPage(_handle: Handle<{}>) {
  return () => (
    <Document title="Cart | The Online Store">
      <main mix={styles.main}>
        <nav aria-label="Main navigation" mix={styles.mainNavigation}>
          <h1> The Online Store </h1>
          <div mix={styles.navigationLinks}>
            <a href="/" mix={styles.link}>Home</a>
            <a href="/shop" mix={styles.link}>Shop</a>
            <a href="/about" mix={styles.link}>About</a>
            <a href="/contact" mix={styles.link}>Contact</a>
            <a href="/blog" mix={styles.link}>Blog</a>
          </div>
          <div mix={styles.navigationActions}>
            <a href="#" mix={[styles.link, on("click", (event) => event.preventDefault())]} aria-label="Search" title="Search">
              <img
                src="https://img.icons8.com/?size=100&id=132&format=png&color=000000"
                alt=""
              />
            </a>
            <a href="#" mix={[styles.link, on("click", (event) => event.preventDefault())]} aria-label="Profile" title="Profile">
              <img
                src="https://img.icons8.com/?size=100&id=95101&format=png&color=000000"
                alt=""
              />
            </a>
            <a href="#" mix={[styles.link, on("click", (event) => event.preventDefault())]} aria-label="Cart" title="Cart">
              <img
                src="https://img.icons8.com/?size=100&id=42382&format=png&color=000000"
                alt=""
              />
            </a>
          </div>
        </nav>
        <CartContents />
      </main>
    </Document>
  );
}
