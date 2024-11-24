import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Tutorial from "./components/Tutorial";
import Ranking from "./components/Ranking";
import Game from "./components/Game";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
