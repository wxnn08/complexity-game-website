import axios from "axios";
import { useEffect, useState } from "react";
import { ICode } from "../schemas/ICode";
import CodeDisplay from "./CodeDisplay";

const apiUrl = process.env.REACT_APP_API_URL;


export default function GuessingPanel ({onGameEnd}: {onGameEnd: Function}) {
    const [codes, setCodes] = useState<ICode[]>();
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const handleButtonClick = (selected: string) => {
        setAnswers([...answers, selected]);
        if(codes && index+2 >= codes.length) {
            onGameEnd(codes, answers);
        }
        setIndex(index+1);
    }

    useEffect(() => {
        axios.get(`${apiUrl}/api/code/20`)
             .then(response => {
                 setCodes(response.data.codes)
             })
    }, [])
    return (
        <>
            <div className="flex justify-center items-center mt-4">
                <div className="grid grid-cols-2 gap-4 w-full px-12 h-[70vh]">
                    <CodeDisplay codeData={codes?.at(index)}/>
                    <CodeDisplay codeData={codes?.at(index+1)}/>
                </div>

            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
                <button onClick={() => {handleButtonClick("left")}} className="btn btn-primary">Esquerda é mais rápido</button>
                <button onClick={() => {handleButtonClick("equal")}} className="btn btn-accent">São iguais</button>
                <button onClick={() => {handleButtonClick("right")}} className="btn btn-secondary">Direita é mais rápido</button>
            </div>
        </>
    );
}
