import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserResponse } from "../schemas/ICode";
import AnswerSummary from "./AnswerSummary";

interface RankingEntry {
  name: string;
  score: number;
}

interface ResultProps {
  userResponses: UserResponse[];
  onRestart: () => void;
  score: number;
  playerName: string;
  loadingResult: boolean;
}

export default function Result({
  userResponses,
  onRestart,
  score,
  playerName,
  loadingResult,
}: ResultProps) {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (loadingResult) return;

    axios
      .get(`${apiUrl}/api/ranking`)
      .then((response) => {
        setRanking(response.data.ranking);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar o ranking:", error);
        setIsLoading(false);
      });
  }, [loadingResult]);

  if (isLoading || loadingResult) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold mb-4">Carregando resultados...</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-4 w-full px-4">
      <h2 className="text-3xl font-bold mb-4">Resultado</h2>
      {userResponses.length > 0 ? (
        <>
          <p className="text-xl">
            Você respondeu {userResponses.length} questões!
          </p>
          <p className="text-xl mb-4">Sua pontuação: {score}</p>
        </>
      ) : (
        <p className="text-xl">
          O tempo acabou antes que você pudesse responder alguma questão.
        </p>
      )}
      <h3 className="text-2xl font-bold mt-6 mb-4">Ranking</h3>
      <div className="overflow-x-auto w-full max-w-2xl mt-4">
        <table className="table w-full table-auto">
          <thead>
            <tr>
              <th className="px-2 md:px-4 py-2">Posição</th>
              <th className="px-2 md:px-4 py-2">Nome</th>
              <th className="px-2 md:px-4 py-2">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((entry, index) => (
              <tr
                key={index}
                className={
                  entry.name === playerName && entry.score === score
                    ? "bg-green-200"
                    : ""
                }
              >
                <td className="border px-2 md:px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border px-2 md:px-4 py-2">{entry.name}</td>
                <td className="border px-2 md:px-4 py-2 text-center">
                  {entry.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnswerSummary userResponses={userResponses} />

      <button className="btn btn-primary mt-6 mb-4" onClick={onRestart}>
        Voltar ao Início
      </button>
    </div>
  );
}
