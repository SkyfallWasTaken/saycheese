import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig, type ResolvedConfig, type Plugin } from "vite";
import path from "node:path";
import fs from "node:fs";

const MAX_DATA_URI_SIZE = 2953;
// function generateDataUriPlugin(): Plugin {
//   let config: ResolvedConfig;

//   return {
//     name: "vite-plugin-generate-data-uri",
//     apply: "build",
//     async configResolved(_config) {
//       config = _config;
//     },
//     writeBundle() {
//       const inPath = path.resolve(
//         config.root,
//         config.build.outDir,
//         "index.html"
//       );
//       const outPath = path.resolve(
//         config.root,
//         config.build.outDir,
//         "index.html.datauri.txt"
//       );
//       if (!fs.existsSync(inPath)) {
//         throw new Error(`File ${inPath} does not exist`);
//       }
//       const content = fs.readFileSync(inPath, "utf-8");
//       const dataUri = `data:text/html;charset=utf-8,${encodeURIComponent(
//         content
//       )}`;
//       fs.writeFileSync(outPath, dataUri);

//       if (dataUri.length > MAX_DATA_URI_SIZE) {
//         throw new Error(
//           `Data URI size exceeds limit of ${MAX_DATA_URI_SIZE} characters by ${
//             dataUri.length - MAX_DATA_URI_SIZE
//           } characters`
//         );
//       }
//     },
//   };
// }
function getFileSizePlugin(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "vite-plugin-get-file-size",
    apply: "build",
    async configResolved(_config) {
      config = _config;
    },
    writeBundle() {
      const inPath = path.resolve(
        config.root,
        config.build.outDir,
        "index.html"
      );
      if (!fs.existsSync(inPath)) {
        throw new Error(`File ${inPath} does not exist`);
      }
      const content = fs.readFileSync(inPath, "utf-8");
      if (content.length > MAX_DATA_URI_SIZE) {
        throw new Error(
          `File size exceeds limit of ${MAX_DATA_URI_SIZE} characters by ${
            content.length - MAX_DATA_URI_SIZE
          } characters`
        );
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          filename: "index.html",
          template: "index.html",
        },
        command === "serve"
          ? {
              filename: "level-editor.html",
              template: "level-editor.html",
            }
          : undefined,
      ].filter(Boolean),
    }),
    viteSingleFile(),
    // generateDataUriPlugin(),
    getFileSizePlugin(),
  ],
  build: {
    minify: "terser",
    //cssMinify: 'esbuild',
    modulePreload: false,
    inlineDynamicImports: false,
    terserOptions:
      command === "build"
        ? {
            parse: {
              html5_comments: false,
            },
            compress: {
              drop_console: true,
              drop_debugger: true,
              keep_infinity: true,
              module: true,
              passes: 5,
            },
            format: {
              comments: false,
            },
          }
        : undefined,
  },
}));
