import { css } from "remix/ui";

export const main = css({
  maxWidth: "70rem",
  margin: "0 auto",
  padding: "0.5rem 1.5rem 2rem",
});

export const mainNavigation = css({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  gridTemplateAreas: '"brand links actions"',
  alignItems: "center",
  padding: "0.5rem 0 0.75rem",
  marginBottom: "2rem",
  borderBottom: "1px solid #ddd",
  "& h1": {
    margin: 0,
    fontSize: "1.5rem",
    lineHeight: 1.2,
  },
  "@media (max-width: 48rem)": {
    gridTemplateColumns: "1fr auto",
    gridTemplateAreas: '"brand actions" "links links"',
    rowGap: "0.75rem",
  },
});

export const navigationBrand = css({
  gridArea: "brand",
});

export const navigationLinks = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
  gridArea: "links",
  "@media (max-width: 48rem)": {
    flexWrap: "wrap",
    gap: "0.75rem 1rem",
  },
});

export const navigationActions = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "0.75rem",
  gridArea: "actions",
  "& a": {
    display: "flex",
    alignItems: "center",
  },
  "& img": {
    width: "1.50rem",
    height: "1.50rem",
    display: "block",
  },
});

export const link = css({
  color: "inherit",
  textDecoration: "none",
});

export const productGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1.5rem",
  "@media (max-width: 48rem)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (max-width: 32rem)": {
    gridTemplateColumns: "1fr",
  },
});

export const catalogLayout = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 12rem",
  gap: "2rem",
  alignItems: "start",
  "@media (max-width: 48rem)": {
    gridTemplateColumns: "minmax(0, 1fr) 9rem",
    gap: "1rem",
  },
  "@media (max-width: 32rem)": {
    gridTemplateColumns: "minmax(0, 1fr) 7rem",
    gap: "0.75rem",
  },
});

export const categories = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  paddingLeft: "1rem",
  borderLeft: "1px solid #ddd",
  "& form": {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  "& label": {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.85rem",
  },
  "@media (max-width: 48rem)": {
    paddingLeft: "0.5rem",
    gap: "0.5rem",
  },
  "@media (max-width: 32rem)": {
    paddingLeft: "0.35rem",
    "& label": {
      fontSize: "0.7rem",
      gap: "0.25rem",
    },
  },
});

export const productsHeader = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 12rem",
  alignItems: "center",
  gap: "2rem",
  marginBottom: "1.5rem",
  "@media (max-width: 48rem)": {
    gridTemplateColumns: "minmax(0, 1fr) 9rem",
    gap: "1rem",
  },
  "@media (max-width: 32rem)": {
    gridTemplateColumns: "minmax(0, 1fr) 7rem",
    gap: "0.75rem",
  },
});

export const productsControls = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minWidth: 0,
  "@media (max-width: 32rem)": {
    flexWrap: "wrap",
    rowGap: "0.75rem",
  },
});

export const categoriesHeading = css({
  margin: 0,
  paddingLeft: "1rem",
  fontSize: "1rem",
  fontWeight: "normal",
  "@media (max-width: 48rem)": {
    paddingLeft: 0,
    fontSize: "0.9rem",
  },
  "@media (max-width: 32rem)": {
    fontSize: "0.8rem",
  },
});

export const resultsSummary = css({
  margin: 0,
  color: "#666",
  fontSize: "0.9rem",
  textAlign: "right",
  justifySelf: "end",
});

export const productImage = css({
  width: "100%",
  maxWidth: "12rem",
  height: "auto",
  aspectRatio: "1",
  display: "block",
  margin: "0 auto",
  objectFit: "cover",
});

export const productTitle = css({
  fontSize: "1rem",
  margin: "0.5rem 0 0.25rem",
  fontWeight: "bold",
});

export const productCategory = css({
  color: "#666",
  textTransform: "capitalize",
});

export const productPrice = css({
  fontSize: "1rem",
  color: "#000",
  fontWeight: "normal",
  margin: "0.25rem 0 0",
});

export const pagination = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.35rem",
  marginTop: "2rem",
});

export const paginationLink = css({
  display: "grid",
  placeItems: "center",
  width: "2rem",
  height: "2rem",
  borderRadius: "0.4rem",
  fontSize: "0.8rem",
});

export const paginationActive = css({
  background: "#1f2937",
  color: "#fff",
});

export const paginationNext = css({
  display: "grid",
  placeItems: "center",
  width: "2rem",
  height: "2rem",
  fontSize: "1.3rem",
});
