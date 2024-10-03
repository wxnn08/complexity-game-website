import React, { useState } from "react";

interface HomeProps {
  onGameStart: (time: number, playerName: string, groupName: string) => void;
}

export default function Home({ onGameStart }: HomeProps) {
  const [playerName, setPlayerName] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleStartClick = (time: number) => {
    if (playerName.trim() === "") {
      alert("Por favor, insira seu nome antes de começar o jogo.");
      return;
    }
    const group = groupName.trim() === "" ? "general" : groupName.trim();
    onGameStart(time, playerName, group);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Complexity Game!</h1>
      <p className="text-xl mb-6">Digite seu nome para começar:</p>
      <input
        type="text"
        placeholder="Seu nome"
        className="input input-bordered w-full max-w-xs mb-4"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <p className="text-xl mb-6">Digite o grupo (opcional):</p>
      <input
        type="text"
        placeholder="Grupo (opcional)"
        className="input input-bordered w-full max-w-xs mb-4"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <p className="text-xl mb-6">Selecione o tempo do desafio:</p>
      <div className="flex gap-6">
        <button className="btn btn-primary btn-lg" onClick={() => handleStartClick(1)}>
          1 minuto
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => handleStartClick(3)}>
          3 minutos
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => handleStartClick(5)}>
          5 minutos
        </button>
      </div>
    </div>
  );
}
