import { on, type Handle } from "remix/ui";
import { Document } from "./document.tsx";
import { PRODUCTS_PER_PAGE, type Product, type ProductCategory, type ProductSort } from "./products/data.ts";
import { SortForm } from "./products/public/sort-form.tsx";
import { CategoryFilters } from "./products/public/category-filters.tsx";
import { AddToCartButton } from "./public/add-to-cart-button.tsx";
import * as styles from "../styles.ts";

export function ProductDetailPage(
  handle: Handle<{ product: Product }>,
) {
  return () => {
    let { product } = handle.props;
    return (
      <Document title={product.title}>
        <main mix={styles.main}>
          <nav
            aria-label="Main navigation"
            mix={styles.mainNavigation}
          >
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
              <a href="/cart" mix={styles.link} aria-label="Cart" title="Cart">
                <img
                  src="https://img.icons8.com/?size=100&id=42382&format=png&color=000000"
                  alt=""
                />
              </a>
            </div>
          </nav>
          <div mix={styles.productDetailLayout}>
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                mix={styles.productDetailImage}
              />
            </div>
            <aside mix={styles.productDetailPanel}>
              <h2 mix={styles.productDetailTitle}>{product.title}</h2>
              <p mix={styles.productDetailPrice}>${product.price.toFixed(2)}</p>
              <AddToCartButton
                productId={product.id}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail}
              />
              <hr mix={styles.productDetailDivider} />
              <div mix={styles.productDetailSection}>
                <h3 mix={styles.productDetailSectionTitle}>Product Details</h3>
                <p mix={styles.productDetailDescription}>{product.description}</p>
              </div>
            </aside>
          </div>
        </main>
      </Document>
    );
  };
}

export function ProductListPage(
  handle: Handle<{
    products: Product[];
    page: number;
    sort: ProductSort;
    totalPages: number;
    categories: ProductCategory[];
    category?: string | string[];
    total: number;
  }>,
) {
  return () => {
    let { categories, category, page, products, sort, total, totalPages } = handle.props;
    let visiblePages = getVisiblePages(page, totalPages);
    let firstProduct = products.length === 0 ? 0 : (page - 1) * PRODUCTS_PER_PAGE + 1;
    let lastProduct = products.length === 0 ? 0 : firstProduct + products.length - 1;
    let query = new URLSearchParams();
    if (sort !== "default") query.set("sort", sort);
    if (Array.isArray(category)) {
      category.forEach((item) => query.append("category", item));
    } else if (category) {
      query.set("category", category);
    }
    let queryString = query.toString();
    let paginationQuery = queryString ? `&${queryString}` : "";
    return (
      <Document title="The Online Store">
        <main
          mix={styles.main}
        >
          <nav
            aria-label="Main navigation"
            mix={styles.mainNavigation}
          >
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
              <a href="/cart" mix={styles.link} aria-label="Cart" title="Cart">
                <img
                  src="https://img.icons8.com/?size=100&id=42382&format=png&color=000000"
                  alt=""
                />
              </a>
            </div>
          </nav>
          <header mix={styles.productsHeader}>
            <div mix={styles.productsControls}>
              <SortForm sort={sort} />
              <p mix={styles.resultsSummary}>
                Showing {firstProduct}-{lastProduct} of {total}
              </p>
            </div>
            <h2 mix={styles.categoriesHeading}>Categories</h2>
          </header>
          <div mix={styles.catalogLayout}>
            <section mix={styles.productGrid}>
              {products.map((product) => (
                <article key={product.id}>
                  <div style={{ background: '#dfe3e7', width: '100%', aspectRatio: '1 / 1', display: 'grid', placeItems: 'center', padding: '0.5rem', boxSizing: 'border-box' }}>
                    <a href={`/products/${product.id}`} mix={styles.link}>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        width="240"
                        height="240"
                        mix={styles.productImage}
                      />
                    </a>
                  </div>
                  <p mix={styles.productCategory}>{product.category}</p>
                  <h2 mix={styles.productTitle}>
                    <a href={`/products/${product.id}`} mix={styles.link}>{product.title}</a>
                  </h2>
                  <p mix={styles.productPrice}>{product.price.toFixed(2)} €</p>
                </article>
              ))}
            </section>
            <aside mix={styles.categories}>
              <a href={`/?${sort === "default" ? "" : `sort=${sort}`}`} mix={styles.link}>
                All products
              </a>
              <CategoryFilters categories={categories} category={category} sort={sort} />
            </aside>
          </div>
          <nav
            aria-label="Product pages"
            mix={styles.pagination}
          >
            {page > 1 && (
              <a
                href={`/?page=${page - 1}${paginationQuery}`}
                aria-label="Previous page"
                mix={[styles.link, styles.paginationNext]}
              >
                &lt;
              </a>
            )}
            {visiblePages.map((pageNumber) => (
              <a
                key={pageNumber}
                href={`/?page=${pageNumber}${paginationQuery}`}
                aria-current={pageNumber === page ? "page" : undefined}
                mix={pageNumber === page
                  ? [styles.link, styles.paginationLink, styles.paginationActive]
                  : [styles.link, styles.paginationLink]}
              >
                {pageNumber}
              </a>
            ))}
            {page < totalPages && (
              <a
                href={`/?page=${page + 1}${paginationQuery}`}
                aria-label="Next page"
                mix={[styles.link, styles.paginationNext]}
              >
                &gt;
              </a>
            )}
          </nav>
        </main>
      </Document>
    );
  };
}

function getVisiblePages(page: number, totalPages: number) {
  let start = Math.max(1, Math.min(page - 2, totalPages - 4));
  let end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}