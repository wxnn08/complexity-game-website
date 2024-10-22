import React from "react";
import { UserResponse } from "../schemas/ICode";
import CodeDisplay from "./CodeDisplay";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AnswerSummaryProps {
  userResponses: UserResponse[];
}

function formatChoice(choice?: string) {
  if (choice === "left") return "Esquerda é mais rápido";
  if (choice === "right") return "Direita é mais rápido";
  if (choice === "equal") return "Ambos têm a mesma complexidade";
  return "Resposta desconhecida";
}

export default function AnswerSummary({ userResponses }: AnswerSummaryProps) {
  return (
    <div className="join join-vertical w-full mt-6">
      {userResponses.map((response, index) => {
        const questionNumber = index + 1;
        const isCorrect = response.isCorrect;

        return (
          <div
            key={index}
            className="collapse collapse-arrow join-item border border-base-300"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Questão {questionNumber}:
              <span className={`font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? " Correta" : " Incorreta"}
              </span>
            </div>
            <div className="collapse-content">
              <div className="mt-4">
                <p>
                  <strong>Sua escolha:</strong> {formatChoice(response.userAnswer)}
                </p>
                <p>
                  <strong>Resposta correta:</strong> {formatChoice(response.correctAnswer)}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <div>
                  <CodeDisplay codeData={response.leftCode} height="16rem" />
                  <div className="mt-2">
                    <strong>Explicação:</strong>
                    <ReactMarkdown
                      className="prose mt-2"
                      remarkPlugins={[remarkGfm]}
                    >
                      {response.leftCode.explanation}
                    </ReactMarkdown>
                  </div>
                </div>
                <div>
                  <CodeDisplay codeData={response.rightCode} height="16rem" />
                  <div className="mt-2">
                    <strong>Explicação:</strong>
                    <ReactMarkdown
                      className="prose mt-2"
                      remarkPlugins={[remarkGfm]}
                    >
                      {response.rightCode.explanation}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
