import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const base = style({
  marginTop: 0,
  marginBottom: "2em",
  backgroundColor: "transparent",
  position: "sticky",
  top: "10px",
  zIndex: 10000,
  padding: 0
});

export const header = style({
  margin: 0,
  fontSize: "1rem",
  backgroundColor: "rgb(0, 0, 0)",
  display: "inline-block",
  padding: "0.5em",
  borderRadius: "5px",
  marginLeft: "1em"
});

export const headerLink = style({
  color: "rgb(255, 255, 255)"
});
