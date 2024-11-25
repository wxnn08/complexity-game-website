import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const isValidInput = (input: string) => /^[a-zA-Z0-9 _-]+$/.test(input);

export default function Home({}: HomeProps) {
  const [playerName, setPlayerName] = useState("");
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();

  const handleStartClick = () => {
    setPlayerName(playerName.trim())
    if (!isValidInput(playerName) || playerName !== "" || playerName.length > 20 || playerName.length < 3) {
      alert("Por favor, insira um nome válido (entre 3 e 20 caracteres, sem caracteres especiais).");
      return;
    }
    if (groupName && (!isValidInput(groupName) || groupName.length > 20)) {
      alert("O nome do grupo é inválido (máximo 20 caracteres, sem caracteres especiais).");
      return;
    }
    const group = groupName.trim() === "" ? "general" : groupName.trim();
    navigate("/game", { state: { playerName, groupName: group } });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-lg">
        <p className="text-2xl mb-6 text-center font-bold">Big-O Battle</p>
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
  );
}
