import React, { useEffect, useState } from "react";
import axios from "axios";

interface RankingEntry {
  name: string;
  score: number;
}

interface ResultProps {
  answers: string[];
  onRestart: () => void;
  score: number;
}

export default function Result({ answers, onRestart, score }: ResultProps) {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/ranking`)
      .then((response) => {
        setRanking(response.data.ranking);
      })
      .catch((error) => {
        console.error("Erro ao buscar o ranking:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold">Resultado</h2>
      {answers.length > 0 ? (
        <>
          <p>Você respondeu {answers.length} questões!</p>
          <p>Sua pontuação: {score}</p>
        </>
      ) : (
        <p>O tempo acabou antes que você pudesse responder alguma questão.</p>
      )}
      <h3 className="text-xl font-bold mt-6">Ranking</h3>
      <div className="overflow-x-auto w-full max-w-md mt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Posição</th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-4" onClick={onRestart}>
        Voltar ao Início
      </button>
    </div>
  );
}
