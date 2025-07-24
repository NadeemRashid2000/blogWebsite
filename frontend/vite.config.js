// Import the function that helps define Vite configuration
import { defineConfig } from "vite";

// Import the React plugin so Vite can understand JSX and React features
import react from "@vitejs/plugin-react";

// Import the plugin to support MDX files (Markdown + JSX)
import mdx from "@mdx-js/rollup";

// Highlights code blocks in Markdown files (like coloring syntax)
import rehypeHighlight from "rehype-highlight";

// Adds extra markdown features like checkboxes, tables, and strikethroughs (GitHub-style)
import remarkGfm from "remark-gfm";

// Allows reading frontmatter in markdown files (like --- title: Blog ---)
import remarkFrontmatter from "remark-frontmatter";

// Converts that frontmatter into something React can use
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

// Allows importing images, videos, or other media inside markdown
import rehypeMdxImportMedia from "rehype-mdx-import-media";

// Adds support for Tailwind CSS (so you can use classes like bg-blue-500)
import tailwindcss from "@tailwindcss/vite";

// Now we define the main configuration for Vite
export default defineConfig({
  // Plugins are tools that add extra features to the project
  plugins: [
    // Add React support (JSX, fast refresh while editing)
    {
      // Run the MDX plugin first, before other plugins
      enforce: "pre",

      // Setup MDX support
      ...mdx({
        // Allows using JSX inside MDX files
        jsxImportSource: "react",

        // Allows using <MDXProvider> for wrapping MDX content with custom components
        providerImportSource: "@mdx-js/react",

        // Add extra markdown capabilities
        remarkPlugins: [
          remarkFrontmatter, // Reads the frontmatter block at the top of MDX
          remarkMdxFrontmatter, // Makes that frontmatter usable in your React components
          remarkGfm, // Supports GitHub-style markdown (checkboxes, tables, etc.)
        ],

        // Add extra HTML processing features
        rehypePlugins: [
          rehypeHighlight, // Adds color to code blocks (like syntax highlighting)
          rehypeMdxImportMedia, // Allows adding images/videos in MDX files using `![alt](./img.png)`
        ],
      }),
    }, // Add Tailwind CSS support for utility-first styling
    react(),
    tailwindcss(),
  ],

  // Helps Vite pre-load important dependencies during development for faster startup
  optimizeDeps: {
    include: ["react", "react/jsx-runtime", "@mdx-js/react"],
  },

  // Customize how files and modules are resolved
  resolve: {
    alias: {
      // Some libraries use Node.js's Buffer (not available in browser)
      // This line tells Vite to use a browser-friendly version
      buffer: "buffer/",
    },

    // List of file extensions Vite will automatically try when importing
    // So you can import files without writing .js, .jsx, or .mdx every time
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mdx"],
  },

  // Fixes some libraries that expect a `global` variable (only available in Node)
  // This tells Vite to treat `window` as `global` in browser
  define: {
    global: "window",
  },
});
