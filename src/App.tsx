import React, { useState } from "react";
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
    setAnswers([]); // Reseta as respostas quando um novo jogo começa
  };

  const onGameEnd = (userAnswers: string[]) => {
    console.log(userAnswers);
    setGameStarted(false);
    // TODO: implementar a lógica para verificar a pontuação
  };

  const handleRestart = () => {
    setGameTime(null);
    setAnswers([]);
  };

  return (
    <>
      <Navbar />
      {!gameStarted && answers.length === 0 && (
        <Home onGameStart={handleGameStart} />
      )}
      {gameStarted && gameTime && (
        <GuessingPanel
          gameTime={gameTime}
          onGameEnd={onGameEnd}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {!gameStarted && answers.length > 0 && (
        <Result answers={answers} onRestart={handleRestart} />
      )}
    </>
  );
}

export default App;
