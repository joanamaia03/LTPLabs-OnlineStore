import { clientEntry, on, type Handle, type SerializableProps } from "remix/ui";
import type { ProductSort } from "../data.ts";

interface SortFormProps extends SerializableProps {
  sort: ProductSort;
}

export const SortForm = clientEntry(
  import.meta.url,
  function SortForm(handle: Handle<SortFormProps>) {
    return () => {
      let { sort } = handle.props;
      return (
        <form method="get" action="/">
          <label>
            Sort by{" "}
            <select
              name="sort"
              mix={on("change", (event) => {
                let select = event.currentTarget as HTMLSelectElement;
                select.form?.submit();
              })}
            >
              <option value="default" selected={sort === "default"}>Relevance</option>
              <option value="title-asc" selected={sort === "title-asc"}>Name: A-Z</option>
              <option value="title-desc" selected={sort === "title-desc"}>Name: Z-A</option>
              <option value="price-asc" selected={sort === "price-asc"}>Price: low to high</option>
              <option value="price-desc" selected={sort === "price-desc"}>Price: high to low</option>
            </select>
          </label>
        </form>
      );
    };
  },
);
