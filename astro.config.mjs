// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  image: {
    domains: [
      "astro.build",
      "hadoop.apache.org",
      "media.geeksforgeeks.org",
      "technofaq.org",
      "projectcontrolacademy.com",
      "i.pinimg.com",
      "lh3.googleusercontent.com",
    ],
    remotePatterns: [{ protocol: "https" }],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    csp: true,
    svgo: true,
  },
  adapter: netlify(),
});
