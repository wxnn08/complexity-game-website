import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import clojure from "react-syntax-highlighter/dist/cjs/languages/prism/clojure";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import c from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";

interface CodeDisplayProps {
    language: string;
    mdString: string;
}

export default function CodeDisplay({ language, mdString }: CodeDisplayProps) {
    return (
                <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    className="mockup-code"
                    showLineNumbers={true}
                    useInlineStyles={true}
                >
                    {mdString}
                </SyntaxHighlighter>
    );
}
SyntaxHighlighter.registerLanguage("clojure", clojure)
SyntaxHighlighter.registerLanguage("python", python)
SyntaxHighlighter.registerLanguage("cpp", cpp)
SyntaxHighlighter.registerLanguage("c", c)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("java", java)

// https://biplobsd.me/blogs/view/syntax-highlight-code-in-NextJS-tailwindcss-daisyui.md
