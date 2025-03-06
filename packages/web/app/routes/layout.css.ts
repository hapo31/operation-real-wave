import { style } from "@vanilla-extract/css";

export const container = style({
  display: "grid",
  boxSizing: "border-box",
  gridTemplateColumns: "220px 1fr",
  gridColumnGap: "15px",
  padding: "20px",
  height: "100vh",
  color: "#ccc",
  backgroundColor: "#111",
});

export const menu = style({
  backgroundColor: "rgb(20, 55, 84)",
  padding: "0px 20px",
  borderRadius: "15px",
  boxShadow: "0 0 10px rgb(0, 183, 255)",
});

export const content = style({
  overflowY: "auto",
  backgroundColor: "#444",
  borderRadius: "15px",
  boxShadow: "0 0 10px rgb(4, 255, 0)",
});
