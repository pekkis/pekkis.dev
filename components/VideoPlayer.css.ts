import { style } from "@vanilla-extract/css";
import { vars } from "../services/theme.css";

export const containerClass = style({
  position: "relative",
  width: "100%",
  aspectRatio: (16 / 9).toString()
  // paddingBottom: "56.25%",
  // height: 0
});

export const innerClass = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});
