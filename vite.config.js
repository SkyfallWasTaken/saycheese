import { viteSingleFile } from "vite-plugin-singlefile"
import { createHtmlPlugin } from 'vite-plugin-html'

export default {
    plugins: [
        createHtmlPlugin(),
        viteSingleFile(),
    ],
    build: {
        //minify: 'terser',
        //cssMinify: 'esbuild',
        modulePreload: false,
        // terserOptions: {
        //     parse: {
        //         html5_comments: false,
        //     },
        //     compress: {
        //         drop_console: true,
        //         drop_debugger: true,
        //         keep_infinity: true,
        //         module: true,
        //         passes: 5,
        //     },
        //     format: {
        //         comments: false,
        //     }
        // },
    },
}