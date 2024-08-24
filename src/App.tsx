import CodeDisplay from "./components/CodeDisplay";
import Navbar from "./components/Navbar";

const codeString = `
(defn teste1 []
  (mapv (partial + 3))) ; aksjdlkajdlkasjdklajsdlaskjdlak`;
function App() {

  return (
    <>
      <Navbar/>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 gap-4 w-full px-12 h-[70vh]">
          <CodeDisplay language="clojure" mdString={codeString}/>
          <CodeDisplay language="clojure" mdString={codeString}/>
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
