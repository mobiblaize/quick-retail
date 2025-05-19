import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { theme } from "./constants/theme.ts";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
