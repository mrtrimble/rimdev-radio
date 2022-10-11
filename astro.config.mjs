import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import netlify from "@astrojs/netlify/functions";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [image(), vue() ],
  output: "server",
  adapter: netlify()
});