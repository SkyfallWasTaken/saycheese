import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig } from "vite";

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
