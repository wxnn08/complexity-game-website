import React, { useState, useEffect, useCallback } from "react";
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

const isValidInput = (input: string) => /^[a-zA-Z0-9 _-]+$/.test(input);

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
  const [timestampBegin, setTimestampBegin] = useState<string>("");
  const [timestampEnd, setTimestampEnd] = useState<string>("");

  useEffect(() => {
    if (!state || !state.playerName) {
      navigate("/");
    }
  }, [state, navigate]);

  const handleGameEnd = useCallback(
    async (
      userResponses: UserResponse[],
      complexityCost: { complexity: string; cost: number }[]
    ) => {
      const complexityCostMap = complexityCost.reduce((map, item) => {
        map[item.complexity] = item.cost;
        return map;
      }, {} as { [key: string]: number });

      let correctAnswers = 0;

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
          correctAnswers += 1;
        }

        return {
          ...response,
          isCorrect,
          correctAnswer,
          computedCosts: { leftCost, rightCost },
        };
      });

      const mistakes = userResponses.length - correctAnswers;

      setUserResponses(updatedResponses);
      setLoadingResult(true);

      const timestampEndValue = new Date().toISOString();
      setTimestampEnd(timestampEndValue);

      try {
        await axios.post(`${apiUrl}/api/ranking`, {
          name: playerName,
          correct_answers: correctAnswers,
          mistakes: mistakes,
          timestamp_begin: timestampBegin,
          timestamp_end: timestampEndValue,
          group: groupName,
        });
      } catch (error) {
        console.error("Erro ao atualizar o ranking:", error);
      }

      setScore(correctAnswers);
      setGameStarted(false);
      setLoadingResult(false);
    },
    [playerName, groupName, timestampBegin]
  );

  const handleRestart = () => {
    navigate("/");
  };

  const handleCodesLoaded = useCallback(() => {
    const timestampBeginValue = new Date().toISOString();
    setTimestampBegin(timestampBeginValue);
  }, []);

  return (
    <div>
      {gameStarted ? (
        <GuessingPanel
          gameTime={gameTime}
          onGameEnd={handleGameEnd}
          userResponses={userResponses}
          setUserResponses={setUserResponses}
          onCodesLoaded={handleCodesLoaded}
        />
      ) : (
        <Result
          userResponses={userResponses}
          onRestart={handleRestart}
          score={score}
          playerName={playerName}
          groupName={groupName}
          loadingResult={loadingResult}
          timestampBegin={timestampBegin}
          timestampEnd={timestampEnd}
          totalQuestions={userResponses.length}
        />
      )}
    </div>
  );
}
