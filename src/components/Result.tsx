import React from "react";

interface ResultProps {
  answers: string[];
  onRestart: () => void;
}

export default function Result({ answers, onRestart }: ResultProps) {
  // TODO: implementar a lógica para calcular a pontuação
  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold">Resultado</h2>
      <p>Você respondeu {answers.length} questões!</p>
      <button
        className="btn btn-primary mt-4"
        onClick={onRestart}
      >
        Voltar ao Início
      </button>
    </div>
  );
}
