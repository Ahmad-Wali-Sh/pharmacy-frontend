import { defineConfig } from "cypress";

const ip = '192.168.0.105'
export default defineConfig({
  e2e: {
    baseUrl: `http://${ip}:3000`,
    env: {
      backendUrl: `http://${ip}:8000`
    }
  },
});
