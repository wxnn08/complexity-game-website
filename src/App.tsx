import React, { useState, useCallback } from "react";
import GuessingPanel from "./components/GuessingPanel";
import Navbar from "./components/Navbar";
import Result from "./components/Result";
import Home from "./components/Home";

function App() {
  const [gameTime, setGameTime] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleGameStart = (selectedTime: number) => {
    setGameTime(selectedTime);
    setGameStarted(true);
    setAnswers([]);
  };

  const onGameEnd = useCallback((userAnswers: string[]) => {
    console.log(userAnswers);
    setGameStarted(false);
    // Lógica para verificar a pontuação do usuário
  }, []);

  const handleRestart = () => {
    setGameTime(null);
    setAnswers([]);
  };

  return (
    <>
      <Navbar />
      {!gameStarted && gameTime === null && (
        <Home onGameStart={handleGameStart} />
      )}
      {!gameStarted && gameTime !== null && (
        <Result answers={answers} onRestart={handleRestart} />
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
