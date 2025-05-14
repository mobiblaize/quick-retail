import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./index.css";
import "@mantine/core/styles.css";
import { theme } from "./constants/theme.ts";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
    <Notifications position="top-right" />
      <App />
    </MantineProvider>
  </StrictMode>
);
