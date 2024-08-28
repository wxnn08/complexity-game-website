import CodeDisplay from "./components/CodeDisplay";
import Navbar from "./components/Navbar";
import {useState, useEffect} from 'react'
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

interface ICode {
  code: string
  language: string
}

function getNewIndexes(currentValueA: number, currentValueB: number, maxValue: number): [number, number] {
  let num1 = Math.floor(Math.random() * maxValue);
  let num2 = Math.floor(Math.random() * maxValue);

  while (num1 === currentValueA) {
    num1 = Math.floor(Math.random() * maxValue);
  }

  while (num2 === currentValueB || num2 === num1) {
    num2 = Math.floor(Math.random() * maxValue);
  }
  return [num1, num2]
}

function App() {

  const [codes, setCodes] = useState<[ICode]>();
  const [leftCodeIndex,  setLeftCodeIndex] = useState<number>(0);
  const [rightCodeIndex, setRightCodeIndex] = useState<number>(1);

  const handleButtonClick = () => {
    if(codes && codes.length < 2) return;

    const [num1, num2] = getNewIndexes(leftCodeIndex, rightCodeIndex, codes!.length);

    setLeftCodeIndex(num1);
    setRightCodeIndex(num2);
  }

  useEffect(() => {
    axios.get(`${apiUrl}/api/code/20`)
         .then(response => {
           setCodes(response.data.codes)
         })
  }, [])

  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center mt-4">
        <div className="grid grid-cols-2 gap-4 w-full px-12 h-[70vh]">
          <CodeDisplay language={codes?.at(leftCodeIndex)?.language ?? "empty"}
                       mdString={codes?.at(leftCodeIndex)?.code ?? "loading..."}/>

          <CodeDisplay language={codes?.at(rightCodeIndex)?.language ?? "empty"}
                       mdString={codes?.at(rightCodeIndex)?.code ?? "loading..."}/>
        </div>

      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button onClick={handleButtonClick} className="btn btn-primary">Esquerda é mais rápido</button>
        <button onClick={handleButtonClick} className="btn btn-accent">São iguais</button>
        <button onClick={handleButtonClick} className="btn btn-secondary">Direita é mais rápido</button>
      </div>
    </>
  );
}

export default App;
