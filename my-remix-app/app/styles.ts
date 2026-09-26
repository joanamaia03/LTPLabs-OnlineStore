import { css } from "remix/ui";

export const main = css({
  width: "100%",
  boxSizing: "border-box",
  padding: "0.5rem 1.5rem 2rem 2rem",
  background: "#fcefe2",
});

export const documentBody = css({
  margin: 0,
  overflowY: "scroll",
  fontFamily: "Arial, sans-serif",
  background: "#fcefe2",
});

export const mainNavigation = css({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  gridTemplateAreas: '"brand links actions"',
  alignItems: "center",
  width: "calc(100% + 3.5rem)",
  boxSizing: "border-box",
  padding: "1rem 1.5rem 0.75rem 2rem",
  marginTop: "-0.5rem",
  marginLeft: "-2rem",
  marginBottom: "2rem",
  background: "#ffdfbe",
  borderBottom: "1px solid #040b30",
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
  color: "#040b30",
});

export const navigationLinks = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  color: "#040b30",
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
});

export const navigationIcon = css({
  color: "#040b30",
  display: "flex",
  alignItems: "center",
  "& svg": {
    width: "1.5rem",
    height: "1.5rem",
    display: "block",
  },
});

export const searchMenu = css({
  position: "relative",
  "& summary": {
    listStyle: "none",
    cursor: "pointer",
  },
  "& summary::-webkit-details-marker": {
    display: "none",
  },
});

export const searchForm = css({
  position: "absolute",
  top: "50%",
  right: "calc(100% + 0.5rem)",
  transform: "translateY(-50%)",
  zIndex: 5,
  display: "flex",
  gap: "0.35rem",
  padding: "0.5rem",
  borderRadius: "0.25rem",
  "@media (max-width: 48rem)": {
    top: "calc(100% + 0.6rem)",
    right: 0,
    transform: "none",
  },
});

export const searchInput = css({
  width: "12rem",
  padding: "0.4rem 0.5rem",
  border: "1px solid #c1c1c1",
  borderRadius: "0.2rem",
  font: "inherit",
  color: "#040b30",
});

export const searchButton = css({
  border: 0,
  borderRadius: "0.2rem",
  padding: "0.4rem 0.65rem",
  background: "#040b30",
  color: "#fffbf5",
  font: "inherit",
  cursor: "pointer",
});

export const link = css({
  color: "inherit",
  textDecoration: "none",
});

export const navigationLink = css({
  transition: "color 150ms ease",
  "&:hover, &:focus-visible": {
    color: "#656f7f",
  },
});

export const navigationLinkActive = css({
  color: "#656f7f",
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
  fontSize: "0.85rem",
  borderLeft: "1px solid #c1c1c1",
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
  color: "#040b30",
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
  color: "#8b8a91",
  fontSize: "0.9rem",
  textAlign: "right",
  justifySelf: "end",
});

export const productImage = css({
  width: "82%",
  height: "82%",
  aspectRatio: "1",
  display: "block",
  margin: "auto",
  objectFit: "contain",
  background: "#fffbf5",
  padding: "0.25rem",
  boxSizing: "border-box",
});

export const productCardFrame = css({
  background: "#fffbf5",
  border: "1px solid #c1c1c1",
  width: "100%",
  aspectRatio: "1 / 1",
  display: "grid",
  placeItems: "center",
  padding: "0.5rem",
  boxSizing: "border-box",
  transition: "border-color 150ms ease",
  "&:hover": {
    borderColor: "#040b30",
  },
});

export const productLink = css({
  transition: "color 150ms ease",
  "&:hover, &:focus-visible": {
    color: "#040b30",
  },
});

export const productTitle = css({
  fontSize: "1rem",
  margin: "0.5rem 0 0.25rem",
  fontWeight: "bold",
  color: "#040b30",
});

export const productCategory = css({
  color: "#8b8a91",
  textTransform: "capitalize",
});

export const productPrice = css({
  fontSize: "1rem",
  color: "#161b32",
  fontWeight: "normal",
  margin: "0.25rem 0 0",
});

export const productDetailLayout = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.4fr) minmax(18rem, 0.9fr)",
  gap: "2rem",
  alignItems: "stretch",
  minHeight: "24rem",
  marginTop: "1rem",
  "@media (max-width: 48rem)": {
    gridTemplateColumns: "1fr",
  },
});

export const backButton = css({
  display: "inline-block",
  marginBottom: "1rem",
  color: "#040b30",
  fontSize: "0.95rem",
  textDecoration: "none",
  transition: "color 150ms ease",
  "&:hover, &:focus-visible": {
    color: "#656f7f",
  },
});

export const productDetailImage = css({
  width: "100%",
  height: "100%",
  minHeight: "20rem",
  maxHeight: "24rem",
  margin: "auto",
  background: "#fffbf5",
  border: "1px solid #c1c1c1",
  display: "block",
  objectFit: "contain",
});

export const productDetailPanel = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  paddingTop: "0.5rem",
  gap: "1rem",
});

export const productDetailTitle = css({
  fontSize: "2rem",
  margin: 0,
  lineHeight: 1.2,
  fontWeight: "700",
  color: "#040b30",
});

export const productDetailPrice = css({
  fontSize: "1.25rem",
  fontWeight: "700",
  margin: 0,
  color: "#040b30",
});

export const productDetailButton = css({
  width: "100%",
  background: "#1f2a3a",
  color: "#fff",
  border: "none",
  borderRadius: "0.2rem",
  padding: "0.9rem 1rem",
  fontSize: "0.9rem",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  cursor: "pointer",
});

export const productDetailDivider = css({
  border: "0",
  borderTop: "1px solid #c1c1c1",
  margin: "0.5rem 0 0",
});

export const productDetailSection = css({
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const productDetailSectionTitle = css({
  margin: 0,
  fontSize: "1rem",
  fontWeight: "700",
  color: "#040b30",
});

export const productDetailDescription = css({
  margin: 0,
  lineHeight: 1.7,
  color: "#444",
  fontSize: "0.96rem",
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
  color: "#040b30",
});

export const paginationActive = css({
  background: "#ffdfbe",
  border: "1px solid #040b30",
  boxSizing: "border-box",
  color: "#040b30",
});

export const paginationNext = css({
  display: "grid",
  placeItems: "center",
  width: "2rem",
  height: "2rem",
  fontSize: "1.3rem",
  color: "#040b30",
});
