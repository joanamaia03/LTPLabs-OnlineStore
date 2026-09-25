import { clientEntry, on, type Handle, type SerializableProps } from "remix/ui";
import type { ProductCategory, ProductSort } from "../data.ts";

interface CategoryFiltersProps extends SerializableProps {
  categories: ProductCategory[];
  category?: string | string[];
  sort: ProductSort;
}

export const CategoryFilters = clientEntry(
  import.meta.url,
  function CategoryFilters(handle: Handle<CategoryFiltersProps>) {
    return () => {
      let { categories, category, sort } = handle.props;
      let selectedCategories = Array.isArray(category) ? category : category ? [category] : [];
      return (
        <form method="get" action="/">
          {sort !== "default" && <input type="hidden" name="sort" value={sort} />}
          {categories.map((item) => (
            <label key={item.slug}>
              <input
                type="checkbox"
                name="category"
                value={item.slug}
                checked={selectedCategories.includes(item.slug)}
                mix={on("change", (event) => {
                  let checkbox = event.currentTarget as HTMLInputElement;
                  checkbox.form?.submit();
                })}
              />
              {item.name}
            </label>
          ))}
        </form>
      );
    };
  },
);
