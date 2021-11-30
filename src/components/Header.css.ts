import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const base = style({
  marginTop: 0,
  marginBottom: "2em",
  paddingLeft: "1em",
  paddingRight: "1em",
  paddingTop: "1em"
});

export const header = style({
  margin: 0,
  fontSize: "1rem"
});
