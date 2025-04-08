import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./index.css";
import "@mantine/core/styles.css";
import { theme } from "./constants/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={1000} />
      <App />
    </MantineProvider>
  </StrictMode>
);
