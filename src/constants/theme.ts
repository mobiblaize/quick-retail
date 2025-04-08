import { createTheme, MantineThemeOverride, Button, Text } from "@mantine/core";
import {
  customPrimary,
  textSecondary,
  textColors,
} from "../constants/customColor";

export const theme: MantineThemeOverride = createTheme({
  fontFamily: "DM Sans, sans-serif",
  headings: { fontFamily: "DM Sans, sans-serif" },

  colors: {
    customPrimary, // Your orange palette
    textSecondary, // Your gray palette
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
            "&:hover": {
              backgroundColor: "rgba(241, 103, 34, 0.1)",
            },
          }),
        },
      }),
    }),
    Text: Text.extend({
      defaultProps: {
        // This sets all <Text> components to use textSecondary.7 by default
        color: "textSecondary.7",
      },
    }),
  },
  // Define additional theme variables that aren't part of Mantine's default theme
  other: {
    textColor: textColors.primary,
    textSecondaryColor: textColors.secondary,
  },

  cursorType: "pointer",
});
