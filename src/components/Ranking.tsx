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
      .get(`${apiUrl}/api/ranking`, {
        params: { group: group.trim() === "" ? "general" : group.trim() },
      })
      .then((response) => {
        const data: RankingEntry[] = response.data.ranking;

        const bestParticipations = new Map<string, RankingEntry>();

        data.forEach((entry) => {
          const existingEntry = bestParticipations.get(entry.name);
          const entryTime =
            new Date(entry.timestamp_end).getTime() -
            new Date(entry.timestamp_begin).getTime();
          if (!existingEntry) {
            bestParticipations.set(entry.name, entry);
          } else {
            const existingTime =
              new Date(existingEntry.timestamp_end).getTime() -
              new Date(existingEntry.timestamp_begin).getTime();

            if (
              entry.correct_answers > existingEntry.correct_answers ||
              (entry.correct_answers === existingEntry.correct_answers &&
                (entry.mistakes < existingEntry.mistakes ||
                  (entry.mistakes === existingEntry.mistakes &&
                    entryTime < existingTime)))
            ) {
              bestParticipations.set(entry.name, entry);
            }
          }
        });

        const sortedData = Array.from(bestParticipations.values()).sort(
          (a, b) => {
            if (b.correct_answers !== a.correct_answers) {
              return b.correct_answers - a.correct_answers;
            } else if (a.mistakes !== b.mistakes) {
              return a.mistakes - b.mistakes;
            } else {
              const aTime =
                new Date(a.timestamp_end).getTime() -
                new Date(a.timestamp_begin).getTime();
              const bTime =
                new Date(b.timestamp_end).getTime() -
                new Date(b.timestamp_begin).getTime();
              return aTime - bTime;
            }
          }
        );

        setRankingData(sortedData);
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
            <h3 className="text-xl font-semibold mb-2">
              Ranking do Grupo: {group.trim() === "" ? "general" : group}
            </h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Corretas</th>
                    <th>Erros</th>
                    <th>Tempo Utilizado</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.map((entry, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{entry.name}</td>
                      <td>{entry.correct_answers}</td>
                      <td>{entry.mistakes}</td>
                      <td>
                        {(
                          (new Date(entry.timestamp_end).getTime() -
                            new Date(entry.timestamp_begin).getTime()) /
                          1000
                        ).toFixed(2)}{" "}
                        s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {!isLoading && rankingData.length === 0 && !error && (
          <p className="text-center mt-4">
            Nenhum ranking encontrado para o grupo "
            {group.trim() === "" ? "general" : group}".
          </p>
        )}
      </div>
    </div>
  );
}
