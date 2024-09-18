import React, { useState, useCallback } from "react";
import GuessingPanel from "./components/GuessingPanel";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import Home from "./components/Home";
import { ICode } from "./schemas/ICode";

function App() {
  const [gameTime, setGameTime] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const handleGameStart = (selectedTime: number) => {
    setGameTime(selectedTime);
    setGameStarted(true);
    setAnswers([]);
    setScore(0);
  };

  const onGameEnd = useCallback(
    (
      userAnswers: string[],
      codes: ICode[],
      complexityCost: { complexity: string; cost: number }[]
    ) => {
      // Cria um mapa de complexidade para custo
      const complexityCostMap = complexityCost.reduce((map, item) => {
        map[item.complexity] = item.cost;
        return map;
      }, {} as { [key: string]: number });

      let userScore = 0;

      for (let i = 0; i < userAnswers.length; i++) {
        const leftCode = codes[i];
        const rightCode = codes[i + 1];

        const leftComplexity = leftCode.time_complexity;
        const rightComplexity = rightCode.time_complexity;

        const leftCost = complexityCostMap[leftComplexity];
        const rightCost = complexityCostMap[rightComplexity];

        let correctAnswer = "";
        if (leftCost < rightCost) {
          correctAnswer = "left";
        } else if (leftCost > rightCost) {
          correctAnswer = "right";
        } else {
          correctAnswer = "equal";
        }

        if (userAnswers[i] === correctAnswer) {
          userScore += 1;
        }
      }

      setScore(userScore);
      setGameStarted(false);
    },
    []
  );

  const handleRestart = () => {
    setGameTime(null);
    setAnswers([]);
    setScore(0);
  };

  return (
    <>
      <Navbar />
      {!gameStarted && gameTime === null && (
        <Home onGameStart={handleGameStart} />
      )}
      {!gameStarted && gameTime !== null && (
        <Result answers={answers} onRestart={handleRestart} score={score} />
      )}
      {gameStarted && gameTime && (
        <GuessingPanel
          gameTime={gameTime}
          onGameEnd={onGameEnd}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
    </>
  );
}

export default App;
