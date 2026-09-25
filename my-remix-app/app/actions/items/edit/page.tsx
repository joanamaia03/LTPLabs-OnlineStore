import { css } from "remix/ui";
import type { Handle } from "remix/ui";
import { routes } from "../../../routes.ts";
import { Document } from "../../document.tsx";
import type { Item} from "../data.ts";
import {ItemEditForm} from "./public/item-edit-form.tsx";

export function ItemEditPage(handle: Handle<{ item: Item }>) {
  return () => {
    let { item } = handle.props;
    return (
      <Document title={`Edit ${item.name} — Items`}>
        <main mix={css({ padding: "1rem" })}>
          <h1>Edit {item.name}</h1>
            <ItemEditForm item={item} />
        </main>
      </Document>
    );
  };
}