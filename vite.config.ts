import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import autoImports from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const envPrefix = "APP_";
  const env = loadEnv(mode, process.cwd(), envPrefix);
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [PrimeVueResolver()],
      }),
      autoImports({
        imports: ["vue"],
        dts: "./typings/auto-imports.d.ts",
        eslintrc: {
          enabled: true, // 一般更新imports启动一次即可
        },
      }),
    ],
    envPrefix,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
