import React from "react";

interface HomeProps {
  onGameStart: (time: number) => void;
}

export default function Home({ onGameStart }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Complexity Game!</h1>
      <p className="text-xl mb-6">Selecione o tempo do desafio:</p>
      <div className="flex gap-6">
        <button className="btn btn-primary btn-lg" onClick={() => onGameStart(1)}>
          1 minuto
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => onGameStart(3)}>
          3 minutos
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => onGameStart(5)}>
          5 minutos
        </button>
      </div>
    </div>
  );
}
