// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import mdx from "@mdx-js/rollup";
// import rehypeHighlight from "rehype-highlight";   // Syntax highlighting for code blocks
// import remarkGfm from "remark-gfm";   // Enables Tables, Strikethrough, Task Lists
// import remarkFrontmatter from "remark-frontmatter";   // Extracts frontmatter metadata
// import remarkMdxFrontmatter from "remark-mdx-frontmatter";  // Parses frontmatter for MDX
// import rehypeMdxImportMedia from "rehype-mdx-import-media";   // Allows importing images in MDX
// import tailwindcss from "@tailwindcss/vite";  //  TailwindCSS integration

// export default defineConfig({
//   plugins: [
//     {
//       enforce: "pre",
//       ...mdx({
//         jsxImportSource: "react",
//         providerImportSource: "@mdx-js/react",
//         remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm], // Proper frontmatter support
//         rehypePlugins: [rehypeHighlight, rehypeMdxImportMedia], // Code & image support
//       }),
//     },
//     react(),
//     tailwindcss(),
//   ],
//   optimizeDeps: {
//     include: ["react", "react/jsx-runtime", "@mdx-js/react"],
//   },
//   resolve: {
//     extensions: [".js", ".jsx", ".ts", ".tsx", ".mdx"], // Ensures MDX file imports work
//   },
// });


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeMdxImportMedia from "rehype-mdx-import-media";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "react",
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeMdxImportMedia],
      }),
    },
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ["react", "react/jsx-runtime", "@mdx-js/react"],
  },
  resolve: {
    alias: {
      buffer: "buffer/", // ✅ Fix: Polyfill Buffer for browser
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mdx"],
  },
  define: {
    global: "window", // ✅ Fix: Ensure `global` is available
  },
});
