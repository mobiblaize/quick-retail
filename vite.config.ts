import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()], 
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "react/jsx-runtime": path.resolve("./node_modules/react/jsx-runtime"),
    },
  },
});
