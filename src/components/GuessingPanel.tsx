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
  const [timeLeft, setTimeLeft] = useState(gameTime * 60); // Convertendo minutos para segundos

  const handleButtonClick = (selected: string) => {
    setAnswers((prevAnswers) => [...prevAnswers, selected]);
    if (index + 2 >= codes.length) {
      onGameEnd(answers);
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    axios.get(`${apiUrl}/api/code/20`).then((response) => {
      setCodes(response.data.codes);
    });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      onGameEnd(answers);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onGameEnd, answers]);

  // Formata o tempo restante em minutos e segundos
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Calcular a porcentagem de tempo restante
  const progressPercentage = (timeLeft / (gameTime * 60)) * 100;

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
        <button onClick={() => handleButtonClick("left")} className="btn btn-primary btn-wide">
          Esquerda é mais rápido
        </button>
        <button onClick={() => handleButtonClick("equal")} className="btn btn-accent btn-wide">
          São iguais
        </button>
        <button onClick={() => handleButtonClick("right")} className="btn btn-secondary btn-wide">
          Direita é mais rápido
        </button>
      </div>
    </>
  );
}
