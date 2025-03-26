import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const mdxFolderPath = path.resolve("./mdx-content"); // Adjust path if needed

async function testGrayMatter() {
  const slug = "2"; // Change this to any slug that exists in your mdx folder
  const mdxFilePath = path.join(mdxFolderPath, `${slug}.mdx`);

  try {
    console.log(`📂 Looking for MDX file at: ${mdxFilePath}`);
    const fileContent = await fs.readFile(mdxFilePath, "utf-8");

    console.log("📜 Raw MDX Content:", fileContent);

    const { data: metadata } = matter(fileContent);
    console.log("🔍 Extracted Metadata:", metadata);
  } catch (error) {
    console.error("❌ Error reading MDX file:", error);
  }
}

testGrayMatter();
