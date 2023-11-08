import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy({ targets: ["defaults", "not IE 11"] })],
  server: {
    port: 3000,
  },
});