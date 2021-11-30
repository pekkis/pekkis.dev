import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../theme.css";

globalStyle("html", {
  fontFamily: vars.font.body,
  fontWeight: vars.fontWeight.body,
  lineHeight: "1.5"
});

globalStyle("html, body", {
  margin: 0,
  backgroundColor: "rgb(200, 200, 200)",
  fontSize: "16px"
});

globalStyle("a", {
  color: "rgb(0, 0, 0)"
});

export const root = style({
  backgroundColor: vars.color.white,
  color: "black",
  padding: 0
});
