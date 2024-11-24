import React, { useContext } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import clojure from "react-syntax-highlighter/dist/cjs/languages/prism/clojure";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import { ICode } from "../schemas/ICode";
import { FontSizeContext } from "../contexts/FontSizeContext";

SyntaxHighlighter.registerLanguage("clojure", clojure);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("java", java);

interface CodeDisplayProps {
  codeData?: ICode;
  className?: string;
  height?: string;
}

export default function CodeDisplay({ codeData, className, height }: CodeDisplayProps) {
  const { fontSize } = useContext(FontSizeContext);

  if (!codeData) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-lg">Carregando código...</div>
      </div>
    );
  }

  return (
    <SyntaxHighlighter
      style={duotoneDark}
      language={codeData.language}
      showLineNumbers={true}
      customStyle={{
        fontSize: `${fontSize}px`,
        height: height || "auto",
        overflow: "auto",
      }}
    >
      {codeData.code}
    </SyntaxHighlighter>
  );
}
