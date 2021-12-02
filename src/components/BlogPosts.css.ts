import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const baseClass = style({
  margin: 0
});

export const listClass = style({
  listStyle: "none",
  margin: 0,
  padding: 0
});

export const postClass = style({
  margin: "2em 0"
});

export const headerClass = style({
  fontSize: "1.5rem",
  margin: 0
});

export const dateClass = style({
  fontSize: "1rem",
  margin: 0
});
