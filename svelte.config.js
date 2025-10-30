import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapterAuto from "@sveltejs/adapter-auto";
import adapterNetlify from "@sveltejs/adapter-netlify";

const isNetlify = process.env.NETLIFY === "true";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: isNetlify ? adapterNetlify() : adapterAuto(),
  },
};

export default config;
