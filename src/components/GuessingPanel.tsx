import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { ICode, UserResponse } from "../schemas/ICode";
import CodeDisplay from "./CodeDisplay";

const apiUrl = process.env.REACT_APP_API_URL;

interface GuessingPanelProps {
  gameTime: number;
  onGameEnd: (
    userResponses: UserResponse[],
    complexityCost: { complexity: string; cost: number }[]
  ) => void;
  userResponses: UserResponse[];
  setUserResponses: React.Dispatch<React.SetStateAction<UserResponse[]>>;
}

export default function GuessingPanel({
  gameTime,
  onGameEnd,
  userResponses,
  setUserResponses,
}: GuessingPanelProps) {
  const [codes, setCodes] = useState<ICode[]>([]);
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(gameTime * 60);
  const [isLoading, setIsLoading] = useState(true);
  const [complexityCost, setComplexityCost] = useState<
    { complexity: string; cost: number }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userResponsesRef = useRef(userResponses);

  useEffect(() => {
    userResponsesRef.current = userResponses;
  }, [userResponses]);

  const handleButtonClick = useCallback(
    (selected: string) => {
      const newResponse: UserResponse = {
        leftCode: codes[index],
        rightCode: codes[index + 1],
        userAnswer: selected,
      };
      setUserResponses((prevResponses) => [...prevResponses, newResponse]);
      if (index + 3 >= codes.length) {
        setIsSubmitting(true);
        onGameEnd(userResponsesRef.current, complexityCost);
      } else {
        setIndex(index + 2);
      }
    },
    [codes, index, onGameEnd, complexityCost, setUserResponses]
  );

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/code/30`)
      .then((response) => {
        setCodes(response.data.codes);
        setComplexityCost(response.data["complexity-cost"]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar códigos:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (timeLeft <= 0) {
      onGameEnd(userResponsesRef.current, complexityCost);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isLoading]);

  useEffect(() => {
    if (isLoading || isSubmitting) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') {
        handleButtonClick('left');
      } else if (event.key === '2') {
        handleButtonClick('equal');
      } else if (event.key === '3') {
        handleButtonClick('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleButtonClick, isLoading, isSubmitting]);

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="text-2xl font-bold mb-4">Carregando...</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="text-2xl font-bold mb-4">Finalizando...</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-200 pt-4">
      <div className="flex flex-col items-center mt-2">
        <div className="text-2xl font-bold mb-1">
          Tempo restante: {formatTime(timeLeft)}
        </div>
        <progress
          className="progress progress-primary w-64"
          value={progressPercentage}
          max="100"
        ></progress>
      </div>
      <div className="flex-grow flex justify-center items-start mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 md:px-12">
          <div className="card shadow-xl bg-base-100">
            <div className="card-body p-4">
              <CodeDisplay codeData={codes[index]} height="60vh" />
            </div>
          </div>
          <div className="card shadow-xl bg-base-100">
            <div className="card-body p-4">
              <CodeDisplay codeData={codes[index + 1]} height="60vh" />
            </div>
          </div>
        </div>
      </div>
      <div className="btm-nav bg-base-100 shadow-xl">
        <button
          onClick={() => handleButtonClick("left")}
          className="btn btn-primary flex-1 mx-1"
        >
          <span className="hidden sm:inline">Esquerda é mais rápido (1)</span>
          <span className="sm:hidden">Esquerda (1)</span>
        </button>
        <button
          onClick={() => handleButtonClick("equal")}
          className="btn btn-accent flex-1 mx-1"
        >
          <span className="hidden sm:inline">São iguais (2)</span>
          <span className="sm:hidden">Iguais (2)</span>
        </button>
        <button
          onClick={() => handleButtonClick("right")}
          className="btn btn-secondary flex-1 mx-1"
        >
          <span className="hidden sm:inline">Direita é mais rápido (3)</span>
          <span className="sm:hidden">Direita (3)</span>
        </button>
      </div>
    </div>
  );
}
