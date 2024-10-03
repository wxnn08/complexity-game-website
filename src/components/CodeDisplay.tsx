import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import clojure from "react-syntax-highlighter/dist/cjs/languages/prism/clojure";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import { ICode } from "../schemas/ICode";

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
  if (!codeData) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-lg">Carregando código...</div>
      </div>
    );
  }

  return (
    <div className={`overflow-auto ${className || ""}`} style={{ height: height || "16rem" }}>
      <SyntaxHighlighter
        style={oneDark}
        language={codeData.language}
        className="mockup-code"
        showLineNumbers={true}
        useInlineStyles={true}
        customStyle={{ fontSize: "0.8rem", margin: 0 }}
      >
        {codeData.code}
      </SyntaxHighlighter>
    </div>
  );
}
