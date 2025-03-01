import { style } from "@vanilla-extract/css";

const radius = "15px";

export const container = style({
  borderRadius: radius,
  border: "1px solid #000",
  display: "flex",
  width: "max-content",
  backgroundColor: "#10aaaa",
});

export const statusButton = style({
  border: "none",
  borderRight: "1px solid #000",
  borderRadius: radius,
  borderBottomRightRadius: "0px",
  borderTopRightRadius: "0px",
  padding: "5px 10px",
  margin: 0,
  backgroundColor: "transparent",
  ":active": {
    backgroundColor: "#ccc",
  },
});

export const bodyButton = style({
  border: "none",
  borderRadius: radius,
  borderBottomLeftRadius: "0px",
  borderStartStartRadius: "0px",
  margin: 0,
  backgroundColor: "transparent",
  ":active": {
    backgroundColor: "#ccc",
  },
});

export const inner = style({
  display: "block",
});
