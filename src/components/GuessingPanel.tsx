import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
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

  const handleButtonClick = (selected: string) => {
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
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/code/20`)
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

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold mb-4">Finalizando...</div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <>
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

      <div className="flex justify-center items-center mt-4">
        <div className="grid grid-cols-2 gap-4 w-full px-12 h-[70vh]">
          <CodeDisplay codeData={codes[index]} />
          <CodeDisplay codeData={codes[index + 1]} />
        </div>
      </div>

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
