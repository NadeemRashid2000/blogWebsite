
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ children, className = "" }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "javascript"; // Default to JS

  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      PreTag="div"
      className="rounded-lg p-3"
    >
      {String(children).trim()}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

