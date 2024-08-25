import CodeDisplay from "./components/CodeDisplay";
import Navbar from "./components/Navbar";
import {useState, useEffect} from 'react'
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

interface ICode {
  code: string
}

function App() {

  const [codes, setCodes] = useState<[ICode]>();
  useEffect(() => {
    axios.get(`${apiUrl}/api/code/2`)
      .then(response => {
        setCodes(response.data.codes)
      })
  }, [])

  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 gap-4 w-full px-12 h-[70vh]">
          <CodeDisplay language="clojure" mdString={codes?.at(0)?.code ?? "empty"}/>
          <CodeDisplay language="clojure" mdString={codes?.at(1)?.code ?? "empty"}/>
        </div>

      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button className="btn btn-primary">Esquerda é mais rápido</button>
        <button className="btn btn-accent">São iguais</button>
        <button className="btn btn-secondary">Direita é mais rápido</button>
      </div>
    </>
  );
}

export default App;
