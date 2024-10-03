import React, { useState, useCallback } from "react";
import axios from "axios";
import GuessingPanel from "./components/GuessingPanel";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import Home from "./components/Home";
import { ICode, UserResponse } from "./schemas/ICode";

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [gameTime, setGameTime] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [loadingResult, setLoadingResult] = useState(false);

  const handleGameStart = (selectedTime: number, playerName: string) => {
    setGameTime(selectedTime);
    setGameStarted(true);
    setUserResponses([]);
    setScore(0);
    setPlayerName(playerName);
  };

  const onGameEnd = useCallback(
    async (
      userResponses: UserResponse[],
      complexityCost: { complexity: string; cost: number }[]
    ) => {
      const complexityCostMap = complexityCost.reduce((map, item) => {
        map[item.complexity] = item.cost;
        return map;
      }, {} as { [key: string]: number });

      let userScore = 0;

      const updatedResponses = userResponses.map((response) => {
        const leftComplexity = response.leftCode.time_complexity;
        const rightComplexity = response.rightCode.time_complexity;

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

        const isCorrect = response.userAnswer === correctAnswer;
        if (isCorrect) {
          userScore += 1;
        }

        return {
          ...response,
          isCorrect,
          correctAnswer,
          computedCosts: { leftCost, rightCost },
        };
      });

      console.log(updatedResponses);
      setUserResponses(updatedResponses);
      setLoadingResult(true);

      try {
        await axios.post(`${apiUrl}/api/ranking`, {
          name: playerName,
          score: userScore,
        });
      } catch (error) {
        console.error("Erro ao atualizar o ranking:", error);
      }

      setScore(userScore);
      setGameStarted(false);
      setLoadingResult(false);
    },
    [playerName]
  );

  const handleRestart = () => {
    setGameTime(null);
    setUserResponses([]);
    setScore(0);
    setPlayerName("");
  };

  return (
    <>
      <Navbar />
      {!gameStarted && gameTime === null && (
        <Home onGameStart={handleGameStart} />
      )}
      {!gameStarted && gameTime !== null && (
        <Result
          userResponses={userResponses}
          onRestart={handleRestart}
          score={score}
          playerName={playerName}
          loadingResult={loadingResult}
        />
      )}
      {gameStarted && gameTime && (
        <GuessingPanel
          gameTime={gameTime}
          onGameEnd={onGameEnd}
          userResponses={userResponses}
          setUserResponses={setUserResponses}
        />
      )}
    </>
  );
}

export default App;
