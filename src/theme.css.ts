import { createGlobalTheme, style } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    brand: "blue",
    white: "white"
  },
  font: {
    body: "Merriweather"
  },

  fontWeight: {
    body: "400"
  }
});
