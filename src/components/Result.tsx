import React from "react";

interface ResultProps {
  answers: string[];
  onRestart: () => void;
}

export default function Result({ answers, onRestart }: ResultProps) {
  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold">Resultado</h2>
      {answers.length > 0 ? (
        <p>Você respondeu {answers.length} questões!</p>
      ) : (
        <p>O tempo acabou antes que você pudesse responder alguma questão.</p>
      )}
      <button
        className="btn btn-primary mt-4"
        onClick={onRestart}
      >
        Voltar ao Início
      </button>
    </div>
  );
}
