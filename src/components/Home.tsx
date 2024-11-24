import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

export default function Home({}: HomeProps) {
  const [playerName, setPlayerName] = useState("");
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (playerName.trim() === "") {
      alert("Por favor, insira seu nome antes de começar o jogo.");
      return;
    }
    const group = groupName.trim() === "" ? "general" : groupName.trim();
    navigate("/game", { state: { playerName, groupName: group } });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 pt-8">
      <div className="card shadow-2xl w-full max-w-md bg-white rounded-lg mt-10">
        <div className="card-body">
          <p className="text-2xl mb-6 text-center font-bold text-indigo-600">Big-O Battle</p>
          <input
            type="text"
            placeholder="Seu nome"
            className="input input-bordered w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Grupo (opcional)"
            className="input input-bordered w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="flex justify-center mt-6">
            <button className="btn btn-primary btn-lg bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleStartClick}>
              Jogar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
