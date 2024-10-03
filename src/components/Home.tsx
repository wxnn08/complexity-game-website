import React, { useState } from "react";

interface HomeProps {
  onGameStart: (time: number, playerName: string) => void;
}

export default function Home({ onGameStart }: HomeProps) {
  const [playerName, setPlayerName] = useState("");

  const handleStartClick = (time: number) => {
    if (playerName.trim() === "") {
      alert("Por favor, insira seu nome antes de começar o jogo.");
      return;
    }
    onGameStart(time, playerName);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Bem-vindo ao Complexity Game!
      </h1>
      <p className="text-lg md:text-xl mb-6 text-center">
        Digite seu nome para começar:
      </p>
      <input
        type="text"
        placeholder="Seu nome"
        className="input input-bordered w-full max-w-xs mb-4"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <p className="text-lg md:text-xl mb-6 text-center">
        Selecione o tempo do desafio:
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => handleStartClick(1)}
        >
          1 minuto
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => handleStartClick(3)}
        >
          3 minutos
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => handleStartClick(5)}
        >
          5 minutos
        </button>
      </div>
    </div>
  );
}
