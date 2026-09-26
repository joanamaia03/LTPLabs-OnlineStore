export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
};

type ProductsResponse = {
  products: Product[];
  total: number;
};

export type ProductCategory = {
  slug: string;
  name: string;
};

export const PRODUCTS_PER_PAGE = 9;
export const MAX_PRODUCTS = 100;

export type ProductSort =
  | "default"
  | "title-asc"
  | "title-desc"
  | "price-asc"
  | "price-desc";

export async function getProduct(productId: number) {
  let response = await fetch(`https://dummyjson.com/products/${productId}`);
  if (!response.ok) {
    throw new Error(`Unable to load product: ${response.status}`);
  }

  return (await response.json()) as Product;
}
4
export async function getProducts(page: number, sort: ProductSort, category?: string | string[]) {
  let selectedCategories = normalizeCategories(category);
  let skip = (page - 1) * PRODUCTS_PER_PAGE;

  if (selectedCategories.length > 1) {
    let query = new URLSearchParams({
      limit: String(MAX_PRODUCTS),
      skip: "0",
      select: "thumbnail,title,description,category,price",
    });
    let [sortBy, order] = sort.split("-");
    if (sort !== "default") {
      query.set("sortBy", sortBy);
      query.set("order", order);
    }
    let response = await fetch(`https://dummyjson.com/products?${query}`);
    if (!response.ok) {
      throw new Error(`Unable to load products: ${response.status}`);
    }

    let data = (await response.json()) as ProductsResponse;
    let filteredProducts = data.products.filter((product) => selectedCategories.includes(product.category));
    let sortedProducts = sortProducts(filteredProducts, sort);
    let total = Math.min(sortedProducts.length, MAX_PRODUCTS);
    let totalPages = total === 0 ? 1 : Math.ceil(total / PRODUCTS_PER_PAGE);
    let normalizedPage = Math.min(Math.max(page, 1), totalPages);
    let start = (normalizedPage - 1) * PRODUCTS_PER_PAGE;

    return {
      products: sortedProducts.slice(start, start + PRODUCTS_PER_PAGE),
      page: normalizedPage,
      sort,
      total,
      totalPages,
    };
  }

  let remainingProducts = Math.max(MAX_PRODUCTS - skip, 0);
  let limit = Math.min(PRODUCTS_PER_PAGE, remainingProducts);
  let query = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
    select: "thumbnail,title,description,category,price",
  });
  let [sortBy, order] = sort.split("-");
  if (sort !== "default") {
    query.set("sortBy", sortBy);
    query.set("order", order);
  }
  let endpoint = selectedCategories[0]
    ? `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategories[0])}`
    : "https://dummyjson.com/products";
  let response = await fetch(`${endpoint}?${query}`);
  if (!response.ok) {
    throw new Error(`Unable to load products: ${response.status}`);
  }

  let data = (await response.json()) as ProductsResponse;
  return {
    products: data.products,
    page,
    sort,
    total: Math.min(data.total, MAX_PRODUCTS),
    totalPages: Math.ceil(Math.min(data.total, MAX_PRODUCTS) / PRODUCTS_PER_PAGE),
  };
}

function normalizeCategories(category?: string | string[]) {
  let selected = Array.isArray(category) ? category : category ? [category] : [];
  return [...new Set(selected.filter((value): value is string => typeof value === "string" && value.length > 0))];
}

function sortProducts(products: Product[], sort: ProductSort) {
  let sortedProducts = [...products];

  switch (sort) {
    case "title-asc":
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return sortedProducts;
}

export async function getCategories() {
  let response = await fetch("https://dummyjson.com/products/categories");
  if (!response.ok) {
    throw new Error(`Unable to load categories: ${response.status}`);
  }

  let data = (await response.json()) as Array<ProductCategory | string>;
  return data.map((category) =>
    typeof category === "string"
      ? { slug: category, name: category }
      : { slug: category.slug, name: category.name },
  );
}