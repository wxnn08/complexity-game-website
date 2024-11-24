import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [currentCodeSide, setCurrentCodeSide] = useState<'left' | 'right'>('left');

  const userResponsesRef = React.useRef(userResponses);

  useEffect(() => {
    userResponsesRef.current = userResponses;
  }, [userResponses]);

  const handleButtonClick = (selected: string) => {
    const newResponse: UserResponse = {
      leftCode: codes[index],
      rightCode: codes[index + 1],
      userAnswer: selected,
    };
    const updatedResponses = [...userResponsesRef.current, newResponse];
    setUserResponses(updatedResponses);
    if (index + 3 >= codes.length) {
      setIsSubmitting(true);
      onGameEnd(updatedResponses, complexityCost);
    } else {
      setIndex(index + 2);
      setCurrentCodeSide('left');
    }
  };

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
  }, [timeLeft, isLoading, onGameEnd, complexityCost]);

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

      <div className="flex-grow flex flex-col mt-4">
        <div className="hidden md:flex flex-grow justify-center items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 md:px-12">
            <div className="card shadow-xl bg-base-100">
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold mb-2">Algoritmo 1</h3>
                <CodeDisplay codeData={codes[index]} height="60vh" />
              </div>
            </div>
            <div className="card shadow-xl bg-base-100">
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold mb-2">Algoritmo 2</h3>
                <CodeDisplay codeData={codes[index + 1]} height="60vh" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden flex-grow flex flex-col">
          <div className="flex-grow p-4">
            <div className="card shadow-xl bg-base-100 h-full">
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {currentCodeSide === 'left' ? 'Algoritmo 1' : 'Algoritmo 2'}
                </h3>
                <CodeDisplay
                  codeData={currentCodeSide === 'left' ? codes[index] : codes[index + 1]}
                  height="60vh"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-base-100">
        <div className="md:hidden flex justify-between p-2">
          <button
            onClick={() => setCurrentCodeSide('left')}
            className={`btn ${currentCodeSide === 'left' ? 'btn-primary' : 'btn-outline'} flex-1 mx-1`}
          >
            Algoritmo 1
          </button>
          <button
            onClick={() => setCurrentCodeSide('right')}
            className={`btn ${currentCodeSide === 'right' ? 'btn-primary' : 'btn-outline'} flex-1 mx-1`}
          >
            Algoritmo 2
          </button>
        </div>

        <div className="flex justify-between p-2">
          <button
            onClick={() => handleButtonClick("left")}
            className="btn btn-primary flex-1 mx-1"
          >
            Primeiro é mais rápido
          </button>
          <button
            onClick={() => handleButtonClick("equal")}
            className="btn btn-accent flex-1 mx-1"
          >
            São iguais
          </button>
          <button
            onClick={() => handleButtonClick("right")}
            className="btn btn-secondary flex-1 mx-1"
          >
            Segundo é mais rápido
          </button>
        </div>
      </div>
    </div>
  );
}
