import { style } from "@vanilla-extract/css"
import { vars } from "../theme.css"

export const baseStyle = style({
  backgroundColor: vars.color.brand,
  fontFamily: vars.font.body,
  color: "black",
  padding: 10,
})
