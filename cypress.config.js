import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://172.21.192.1:3000',
    env: {
      backendUrl: 'http://127.0.0.1:8000'
    }
  },
});
