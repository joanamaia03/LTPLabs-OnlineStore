import { on, type Handle } from "remix/ui";
import * as styles from "../styles.ts";

type NavigationProps = {
  activeLink?: "home" | "shop" | "about" | "contact" | "blog";
};

export function Navigation(handle: Handle<NavigationProps>) {
  return () => (
    <nav aria-label="Main navigation" mix={styles.mainNavigation}>
      <h1 mix={styles.navigationBrand}> The Online Store </h1>
      <div mix={styles.navigationLinks}>
        <a href="/" aria-current={handle.props.activeLink === "home" ? "page" : undefined} mix={linkStyle(handle.props.activeLink === "home")}>Home</a>
        <a href="/shop" aria-current={handle.props.activeLink === "shop" ? "page" : undefined} mix={linkStyle(handle.props.activeLink === "shop")}>Shop</a>
        <a href="/about" aria-current={handle.props.activeLink === "about" ? "page" : undefined} mix={linkStyle(handle.props.activeLink === "about")}>About</a>
        <a href="/contact" aria-current={handle.props.activeLink === "contact" ? "page" : undefined} mix={linkStyle(handle.props.activeLink === "contact")}>Contact</a>
        <a href="/blog" aria-current={handle.props.activeLink === "blog" ? "page" : undefined} mix={linkStyle(handle.props.activeLink === "blog")}>Blog</a>
      </div>
      <div mix={styles.navigationActions}>
        <details mix={styles.searchMenu}>
          <summary mix={[styles.link, styles.navigationIcon]} aria-label="Search" title="Search">
            <SearchIcon />
          </summary>
          <form method="get" action="/" mix={styles.searchForm}>
            <input name="search" type="search" placeholder="Search products" aria-label="Search products" mix={styles.searchInput} />
            <button type="submit" mix={styles.searchButton}>Search</button>
          </form>
        </details>
        <a href="#" mix={[styles.link, styles.navigationIcon, on("click", (event) => event.preventDefault())]} aria-label="Profile" title="Profile">
          <ProfileIcon />
        </a>
        <a href="/cart" mix={[styles.link, styles.navigationIcon]} aria-label="Cart" title="Cart">
          <CartIcon />
        </a>
      </div>
    </nav>
  );
}

function linkStyle(active: boolean) {
  return active
    ? [styles.link, styles.navigationLink, styles.navigationLinkActive]
    : [styles.link, styles.navigationLink];
}

function SearchIcon() {
  return () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.7" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
    </svg>
  );
}

function ProfileIcon() {
  return () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" stroke-width="1.7" />
      <path d="M5.5 20c.6-3.1 3.1-5 6.5-5s5.9 1.9 6.5 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
    </svg>
  );
}

function CartIcon() {
  return () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 7.5h14l-1 12H6l-1-12Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
    </svg>
  );
}
