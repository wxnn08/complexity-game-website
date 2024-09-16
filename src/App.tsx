import GuessingPanel from "./components/GuessingPanel";
import Navbar from "./components/Navbar";

function App() {
  const onGameEnd = (answers: string[]) => {
    console.log(answers)
  }
  return (
    <>
      <Navbar/>
      <GuessingPanel onGameEnd={(answers: string[]) => onGameEnd(answers)}/>
    </>
  );
}

export default App;
