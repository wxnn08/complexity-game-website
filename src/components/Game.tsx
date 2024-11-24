import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import GuessingPanel from "./GuessingPanel";
import Result from "./Result";
import { UserResponse } from "../schemas/ICode";

const apiUrl = process.env.REACT_APP_API_URL;

interface LocationState {
  playerName: string;
  groupName: string;
}

export default function Game() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [gameTime, setGameTime] = useState<number>(3);
  const [gameStarted, setGameStarted] = useState(true);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState(state?.playerName || "");
  const [groupName, setGroupName] = useState(state?.groupName || "general");
  const [loadingResult, setLoadingResult] = useState(false);

  const handleGameEnd = useCallback(
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

      setUserResponses(updatedResponses);
      setLoadingResult(true);

      try {
        await axios.post(`${apiUrl}/api/ranking`, {
          name: playerName,
          score: userScore,
          group: groupName,
        });
      } catch (error) {
        console.error("Erro ao atualizar o ranking:", error);
      }

      setScore(userScore);
      setGameStarted(false);
      setLoadingResult(false);
    },
    [playerName, groupName]
  );

  const handleRestart = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!state || !state.playerName) {
      navigate("/");
    }
  }, [state, navigate]);

  return (
    <div>
      {gameStarted ? (
        <GuessingPanel
          gameTime={gameTime}
          onGameEnd={handleGameEnd}
          userResponses={userResponses}
          setUserResponses={setUserResponses}
        />
      ) : (
        <Result
          userResponses={userResponses}
          onRestart={handleRestart}
          score={score}
          playerName={playerName}
          groupName={groupName}
          loadingResult={loadingResult}
        />
      )}
    </div>
  );
}
