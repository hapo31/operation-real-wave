import { style } from "@vanilla-extract/css";

export const container = style({
  display: "grid",
  gridTemplateColumns: "200px 1fr",
  height: "100vh",
  backgroundColor: "#353535",
  color: "#ccc",
});

export const menu = style({
  borderRight: "1px solid #000",
});

export const content = style({
  overflowY: "auto",
  backgroundColor: "#444",
});
