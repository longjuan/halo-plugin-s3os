import { fileURLToPath, URL } from "url";

import { viteConfig } from "@halo-dev/ui-plugin-bundler-kit";
import Icons from "unplugin-icons/vite";

export default viteConfig({
  vite: {
    plugins: [Icons({ compiler: "vue3" })],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
