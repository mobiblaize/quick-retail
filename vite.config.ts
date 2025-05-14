import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "react/jsx-runtime": path.resolve("./node_modules/react/jsx-runtime"),
    },
  },
});
