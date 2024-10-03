import React from "react";
import { UserResponse } from "../schemas/ICode";
import CodeDisplay from "./CodeDisplay";

interface AnswerSummaryProps {
  userResponses: UserResponse[];
}

export default function AnswerSummary({ userResponses }: AnswerSummaryProps) {
  return (
    <div className="join join-vertical w-full mt-6">
      {userResponses.map((response, index) => {
        const questionNumber = index + 1;
        const isCorrect = response.isCorrect;
        const borderColor = isCorrect ? "border-green-500" : "border-red-500";

        return (
          <div key={index} className="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Questão {questionNumber}: {isCorrect ? "Correta" : "Incorreta"}
            </div>
            <div className="collapse-content">
              <div className="grid grid-cols-2 gap-4 w-full h-[70vh] mt-4">
                <div
                  className={`${
                    response.userAnswer === "left" ? `border-4 ${borderColor}` : ""
                  }`}
                >
                  <CodeDisplay codeData={response.leftCode} />
                </div>
                <div
                  className={`${
                    response.userAnswer === "right" ? `border-4 ${borderColor}` : ""
                  }`}
                >
                  <CodeDisplay codeData={response.rightCode} />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-lg font-bold">Explicação:</h4>
                <p className="mt-2">
                  <strong>Esquerda:</strong> {response.leftCode.explanation}
                </p>
                <p className="mt-2">
                  <strong>Direita:</strong> {response.rightCode.explanation}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
