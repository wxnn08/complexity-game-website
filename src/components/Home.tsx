import React, { useState } from "react";

interface HomeProps {
  onGameStart: (time: number, playerName: string, groupName: string) => void;
}

export default function Home({ onGameStart }: HomeProps) {
  const [playerName, setPlayerName] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleStartClick = () => {
    if (playerName.trim() === "") {
      alert("Por favor, insira seu nome antes de começar o jogo.");
      return;
    }
    const group = groupName.trim() === "" ? "general" : groupName.trim();
    onGameStart(3, playerName, group);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200 pt-8">
      <div className="card shadow-xl w-full max-w-md bg-base-100 mt-10">
        <div className="card-body">
          <p className="text-xl mb-6 text-center">Big-O Battle</p>
          <input
            type="text"
            placeholder="Seu nome"
            className="input input-bordered w-full mb-4"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Grupo (opcional)"
            className="input input-bordered w-full mb-4"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="flex justify-center mt-6">
            <button className="btn btn-primary btn-lg" onClick={handleStartClick}>
              Jogar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
