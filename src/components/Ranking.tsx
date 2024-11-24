import React, { useState } from "react";
import axios from "axios";
import { RankingEntry } from "../schemas/ICode";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Ranking() {
  const [group, setGroup] = useState<string>("general");
  const [rankingData, setRankingData] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = () => {
    setIsLoading(true);
    setError("");
    axios
      .get(`${apiUrl}/api/ranking`, { params: { group: group.trim() === "" ? "general" : group.trim() } })
      .then((response) => {
        const data: RankingEntry[] = response.data.ranking;
        const highestScoresMap = new Map<string, RankingEntry>();
        data.forEach(entry => {
          if (!highestScoresMap.has(entry.name) || entry.score > highestScoresMap.get(entry.name)!.score) {
            highestScoresMap.set(entry.name, entry);
          }
        });
        const highestScores = Array.from(highestScoresMap.values()).sort((a, b) => b.score - a.score);
        setRankingData(highestScores);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar o ranking:", err);
        setError("Não foi possível buscar o ranking. Tente novamente.");
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Ranking</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Nome do Grupo"
            className="input input-bordered w-full max-w-xs"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Buscar Ranking
          </button>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {!isLoading && rankingData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Ranking do Grupo: {group.trim() === "" ? "general" : group}</h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Pontuação</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.map((entry, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{entry.name}</td>
                      <td>{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {!isLoading && rankingData.length === 0 && !error && (
          <p className="text-center mt-4">Nenhum ranking encontrado para o grupo "{group.trim() === "" ? "general" : group}".</p>
        )}
      </div>
    </div>
  );
}
