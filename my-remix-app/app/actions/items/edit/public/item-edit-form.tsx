import type { Handle } from "remix/ui";
import { clientEntry, css, type SerializableProps, on } from "remix/ui";
import { routes } from "../../../../routes.ts";

interface Item extends SerializableProps {
  name: string;
  id: string;
  price: number;
}

export const ItemEditForm = clientEntry(
  import.meta.url,
  function ItemEditForm(handle: Handle<{ item: Item }>) {
    let pending = false;
  return () => {
    let { item } = handle.props;

    return (
      <form
        action={routes.items.edit.action.href({ itemId: item.id })}
        method="post"
        mix={[css({
          display: "grid",
          gap: "0.75rem",
          maxWidth: "fit-content",
          "& input": {
            marginLeft: "0.5rem",
          },
        }), on("submit", () => {
              pending = true;
              handle.update();
            }),]}
      >
        <label>
          Product
          <input name="name" defaultValue={item.name} required />
        </label>
        <label>
          Price
          <input
            name="price"
            defaultValue={item.price}
            required
            type="number"
            min="0"
            step="0.01"
          />
        </label>
        <button disabled={pending} type="submit">
            {pending ? "Saving…" : "Save"}
          </button>
      </form>
    );
  };
});