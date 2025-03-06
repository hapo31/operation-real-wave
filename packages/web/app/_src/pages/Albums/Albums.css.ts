import { style } from "@vanilla-extract/css";

export const container = style({});

export const link = style({
  color: "#ccc",
  ":visited": {
    color: "#ccc",
  },
});
