import axios from "axios";
import React, { useEffect, useState } from "react";
import { ICode } from "../schemas/ICode";
import CodeDisplay from "./CodeDisplay";

const apiUrl = process.env.REACT_APP_API_URL;

interface GuessingPanelProps {
  gameTime: number;
  onGameEnd: (answers: string[]) => void;
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function GuessingPanel({
  gameTime,
  onGameEnd,
  answers,
  setAnswers,
}: GuessingPanelProps) {
  const [codes, setCodes] = useState<ICode[]>([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameTime * 60);
  const [isLoading, setIsLoading] = useState(true);

  const handleButtonClick = (selected: string) => {
    setAnswers((prevAnswers) => [...prevAnswers, selected]);
    if (index + 2 >= codes.length) {
      onGameEnd(answers);
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/code/20`)
      .then((response) => {
        setCodes(response.data.codes);
        setIsLoading(false); // Dados carregados
      })
      .catch((error) => {
        console.error("Erro ao buscar códigos:", error);
        // TODO: lidar com estado de erro
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (timeLeft <= 0) {
      onGameEnd(answers);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onGameEnd, answers, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const progressPercentage = (timeLeft / (gameTime * 60)) * 100;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold mb-4">Carregando...</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Temporizador */}
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="text-2xl font-bold mb-2">
          Tempo restante: {formatTime(timeLeft)}
        </div>
        <progress
          className="progress progress-primary w-64"
          value={progressPercentage}
          max="100"
        ></progress>
      </div>

      {/* Painel de códigos */}
      <div className="flex justify-center items-center mt-4">
        <div className="grid grid-cols-2 gap-4 w-full px-12 h-[70vh]">
          <CodeDisplay codeData={codes[index]} />
          <CodeDisplay codeData={codes[index + 1]} />
        </div>
      </div>

      {/* Botões de seleção */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => handleButtonClick("left")}
          className="btn btn-primary btn-wide"
        >
          Esquerda é mais rápido
        </button>
        <button
          onClick={() => handleButtonClick("equal")}
          className="btn btn-accent btn-wide"
        >
          São iguais
        </button>
        <button
          onClick={() => handleButtonClick("right")}
          className="btn btn-secondary btn-wide"
        >
          Direita é mais rápido
        </button>
      </div>
    </>
  );
}
