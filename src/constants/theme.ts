import { createTheme, MantineThemeOverride, Button, Text } from "@mantine/core";
import {
  customPrimary,
  textSecondary,
  textColors,
} from "../constants/customColor";

export const theme: MantineThemeOverride = createTheme({
  // Keep DM Sans as the default global font
  fontFamily: "DM Sans, sans-serif",

  // Use Clash Display for headings only
  headings: {
    fontFamily: "'Clash Display', DM Sans, sans-serif",
  },

  colors: {
    customPrimary,
    textSecondary,
  },

  primaryColor: "customPrimary",
  primaryShade: 9,

  components: {
    Button: Button.extend({
      styles: (_theme, params) => ({
        root: {
          ...(params.variant === "filled-primary" && {
            backgroundColor: "#F16722",
            color: "white",
            borderRadius: "0.75rem",
            height: "auto",
            padding: "0.9rem 1.5rem",
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            fontSize: "16px",
            justifyContent: "center",
            fontFamily: "'Clash Display', DM Sans, sans-serif",
            "&:hover": {
              backgroundColor: "#dc5f20",
            },
          }),
          ...(params.variant === "outline-primary" && {
            backgroundColor: "transparent",
            color: "#F16722",
            border: "1px solid #F16722",
            borderRadius: "0.75rem",
            padding: "0.7rem 2.6rem",
            height: "auto",
            fontWeight: 600,
            fontSize: "15px",
            fontFamily: "'Clash Display', DM Sans, sans-serif",
            "&:hover": {
              backgroundColor: "rgba(241, 103, 34, 0.1)",
            },
          }),
        },
      }),
    }),

    Text: Text.extend({
      defaultProps: {
        color: "textSecondary.7",
      },
      styles: {
        root: {
          fontFamily: "'Clash Display', DM Sans, sans-serif",
        },
      },
    }),
  },

  other: {
    textColor: textColors.primary,
    textSecondaryColor: textColors.secondary,
  },

  cursorType: "pointer",
});
