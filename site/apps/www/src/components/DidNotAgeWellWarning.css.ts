import { vars } from "@/services/theme.css";
import { style } from "@vanilla-extract/css";

export const alert = style({
  backgroundColor: vars.color.alert,
  padding: vars.spaces.medium,
  marginBlock: vars.spaces.medium,
  color: vars.color.white,
  borderRadius: "5px"
});
