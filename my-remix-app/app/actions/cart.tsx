import { type Handle } from "remix/ui";
import { Document } from "./document.tsx";
import { CartContents } from "./public/cart-contents.tsx";
import { Navigation } from "./navigation.tsx";
import * as styles from "../styles.ts";

export function CartPage(_handle: Handle<{}>) {
  return () => (
    <Document title="Cart | The Online Store">
      <main mix={styles.main}>
        <Navigation />
        <CartContents />
      </main>
    </Document>
  );
}
