import type { Handle } from "remix/ui";
import { Document } from "./document.tsx";
import type { Item } from "./items/data.ts";
import {css} from "remix/ui";

export function HomePage(handle: Handle<{ item: Item }>) {
  return () => {
    let { item } = handle.props;
    return (
      <Document title={`${item.name} — Items`}>
        <main
         mix={css({
            maxWidth: "44rem",
            margin: "0 auto",
            padding: "4rem 1.5rem",
          })}>
          <p>{handle.props.item.name}</p>
          <p mix={css({ color: "#666" })}>€{handle.props.item.price.toFixed(2)}</p>
        </main>
      </Document>
    );
  };
}