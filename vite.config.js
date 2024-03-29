import { defineConfig } from "vite";
import cssnanoPlugin from "cssnano";
import imagemin from "vite-plugin-imagemin";
import { resolve } from 'path';

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [
    cssnanoPlugin(),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
      webp: {
        quality: 75,
      },
    }),
  ],
});