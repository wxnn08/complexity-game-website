import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserResponse, RankingEntry } from "../schemas/ICode";
import AnswerSummary from "./AnswerSummary";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ResultProps {
  userResponses: UserResponse[];
  onRestart: () => void;
  score: number;
  playerName: string;
  groupName: string;
  loadingResult: boolean;
  timestampBegin: string;
  timestampEnd: string;
  totalQuestions: number;
}

export default function Result({
  userResponses,
  onRestart,
  score,
  playerName,
  groupName,
  loadingResult,
  timestampBegin,
  timestampEnd,
  totalQuestions,
}: ResultProps) {
  const [userEvolution, setUserEvolution] = useState<RankingEntry[]>([]);
  const [generalRanking, setGeneralRanking] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (loadingResult) return;

    axios
      .get(`${apiUrl}/api/ranking`, { params: { group: groupName } })
      .then((response) => {
        const rankingData: RankingEntry[] = response.data.ranking;

        const userEvolutionData = rankingData
          .filter((entry) => entry.name === playerName)
          .sort(
            (a, b) =>
              new Date(a.timestamp_begin).getTime() -
              new Date(b.timestamp_begin).getTime()
          );

        setUserEvolution(userEvolutionData);

        const bestParticipations = new Map<string, RankingEntry>();

        rankingData.forEach((entry) => {
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

        const generalRankingData = Array.from(bestParticipations.values()).sort(
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

        setGeneralRanking(generalRankingData);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar o ranking:", error);
        setIsLoading(false);
      });
  }, [loadingResult, groupName, playerName, apiUrl]);

  if (isLoading || loadingResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="text-2xl font-bold mb-4">Carregando resultados...</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  const timeUtilized =
    timestampBegin && timestampEnd
      ? (
          (new Date(timestampEnd).getTime() -
            new Date(timestampBegin).getTime()) /
          1000
        ).toFixed(2)
      : "0";

  const mistakes = totalQuestions - score;

  return (
    <div className="flex flex-col items-center mt-4 w-full px-4">
      <div className="card w-full bg-base-100 shadow-xl mb-6">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-3xl">Resultado</h2>
          {userResponses.length > 0 ? (
            <>
              <p className="text-xl">
                Você respondeu {userResponses.length} questões!
              </p>
              <p className="text-xl">Respostas corretas: {score}</p>
              <p className="text-xl">Erros: {mistakes}</p>
              <p className="text-xl">
                Tempo utilizado: {timeUtilized} segundos
              </p>
            </>
          ) : (
            <p className="text-xl">
              O tempo acabou antes que você pudesse responder alguma questão.
            </p>
          )}
          <div className="card-actions mt-4">
            <button className="btn btn-primary" onClick={onRestart}>
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row md:space-x-4 mt-4">
        <div className="md:w-1/2 w-full mb-6 md:mb-0">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl">
                Sua Evolução - Grupo: {groupName}
              </h3>
              <div className="w-full h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="timestamp_begin"
                      tickFormatter={(tick) =>
                        new Date(tick).toLocaleDateString()
                      }
                    />
                    <YAxis domain={[0, "dataMax + 1"]} allowDecimals={false} />
                    <Tooltip
                      labelFormatter={(label) =>
                        `Data: ${new Date(label).toLocaleString()}`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="correct_answers"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-2xl">
                Ranking Geral - Grupo: {groupName}
              </h3>
              <div className="overflow-x-auto mt-4">
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
                    {generalRanking.map((entry, index) => (
                      <tr
                        key={index}
                        className={entry.name === playerName ? "active" : ""}
                      >
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
          </div>
        </div>
      </div>

      <AnswerSummary userResponses={userResponses} />

      <button className="btn btn-secondary mt-6 mb-4" onClick={onRestart}>
        Voltar ao Início
      </button>
    </div>
  );
}
