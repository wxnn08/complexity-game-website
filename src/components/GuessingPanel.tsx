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
    if (index + 2 >= codes.length) {
      setIsSubmitting(true);
      onGameEnd(userResponsesRef.current, complexityCost);
    } else {
      setIndex(index + 1);
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
    <div className="flex flex-col h-screen">
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
      <div className="flex-grow flex justify-center items-center mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 md:px-12 h-full">
          <CodeDisplay codeData={codes[index]} />
          <CodeDisplay codeData={codes[index + 1]} />
        </div>
      </div>
      <div className="btm-nav">
        <button
          onClick={() => handleButtonClick("left")}
          className="text-primary bg-primary text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span className="btm-nav-label">Esquerda é mais rápido</span>
        </button>
        <button
          onClick={() => handleButtonClick("equal")}
          className="text-accent bg-accent text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M5 10h14M5 14h14" />
          </svg>
          <span className="btm-nav-label">São iguais</span>
        </button>
        <button
          onClick={() => handleButtonClick("right")}
          className="text-secondary bg-secondary text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
          <span className="btm-nav-label">Direita é mais rápido</span>
        </button>
      </div>
    </div>
  );
}
