/**
 * 
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import tailwindcss from "@tailwindcss/vite"; // ✅ Added Tailwind as a Vite Plugin

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "react",
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm], // ✅ Enables Tables, Strikethrough, Task Lists
        rehypePlugins: [rehypeHighlight], // ✅ Enables Syntax Highlighting
      }),
    },
    react(),
    tailwindcss(), // ✅ Now Tailwind is added properly!
  ],
  optimizeDeps: {
    include: ["react", "react/jsx-runtime", "@mdx-js/react"],
  },
});

*/

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import rehypeHighlight from "rehype-highlight"; // ✅ Syntax highlighting for code blocks
import remarkGfm from "remark-gfm"; // ✅ Enables Tables, Strikethrough, Task Lists
import remarkFrontmatter from "remark-frontmatter"; // ✅ Extracts frontmatter metadata
import remarkMdxFrontmatter from "remark-mdx-frontmatter"; // ✅ Parses frontmatter for MDX
import rehypeMdxImportMedia from "rehype-mdx-import-media"; // ✅ Allows importing images in MDX
import tailwindcss from "@tailwindcss/vite"; // ✅ TailwindCSS integration

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "react",
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm], // ✅ Proper frontmatter support
        rehypePlugins: [rehypeHighlight, rehypeMdxImportMedia], // ✅ Code & image support
      }),
    },
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ["react", "react/jsx-runtime", "@mdx-js/react"],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mdx"], // ✅ Ensures MDX file imports work
  },
});
