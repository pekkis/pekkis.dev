import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const baseClass = style({
  margin: 0,
  marginBottom: "2em",
  display: "flex"
});

export const flex2Class = style({
  paddingLeft: "1em"
});

export const headerClass = style({
  fontSize: "2rem",
  margin: 0
});

export const dateClass = style({
  fontSize: "1.33rem",
  margin: 0
});

export const imgClass = style({
  borderRadius: "100%"
});
