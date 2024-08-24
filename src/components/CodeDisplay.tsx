import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import clojure from "react-syntax-highlighter/dist/cjs/languages/prism/clojure";

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

// https://biplobsd.me/blogs/view/syntax-highlight-code-in-NextJS-tailwindcss-daisyui.md
