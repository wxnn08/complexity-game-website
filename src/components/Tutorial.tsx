import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Tutorial() {
  const tutorialContent = `
# Tutorial do Big-O Battle

Bem-vindo ao **Big-O Battle**! Este jogo foi criado para ajudar você a entender e comparar a complexidade de tempo de diferentes algoritmos de forma interativa e divertida.

## Como Jogar

1. **Iniciar o Jogo:**
   - Na tela inicial, insira seu nome e, opcionalmente, o nome de um grupo.
   - Clique em **Jogar** para começar.

2. **Comparando Algoritmos:**
   - Você verá dois algoritmos lado a lado.
   - Seu objetivo é determinar qual dos dois algoritmos tem uma complexidade de tempo menor (mais rápido).
   - Se você achar que ambos têm a mesma complexidade, escolha a opção correspondente.

3. **Respostas:**
   - Selecione uma das opções:
     - **Primeiro é mais rápido**
     - **São iguais**
     - **Segundo é mais rápido**
   - Cada resposta correta aumenta sua pontuação.

4. **Tempo Limite:**
   - O jogo tem um tempo limite. Responda o maior número de questões possível antes que o tempo acabe.

5. **Resultados:**
   - Ao final do jogo, você verá um resumo das suas respostas, sua pontuação e um ranking.

## Como Fazer uma Análise Rápida de um Algoritmo

Para comparar a complexidade de tempo de dois algoritmos, siga estes passos:

1. **Identifique a Operação Principal:**
   - Determine qual operação domina o tempo de execução (por exemplo, loops aninhados, recursões, etc.).

2. **Calcule a Complexidade:**
   - Analise como o tempo de execução cresce em relação ao tamanho da entrada (n).
   - Por exemplo:
     - **O(1):** Tempo constante.
     - **O(log n):** Logarítmico.
     - **O(n):** Linear.
     - **O(n log n):** Log-linear.
     - **O(n²):** Quadrático.

3. **Compare as Complexidades:**
   - Menor complexidade indica um algoritmo mais eficiente.
   - Por exemplo, **O(n)** é mais rápido que **O(n²)** para entradas grandes.

4. **Considere Casos Especiais:**
   - Análise de pior caso, melhor caso e caso médio.
   - Certifique-se de estar comparando a mesma métrica para ambos os algoritmos.

Lembre-se de que esta é uma análise teórica. Fatores como constantes ocultas e desempenho em implementações práticas também podem influenciar a eficiência real.

Divirta-se jogando e aprimorando seu entendimento sobre a complexidade de algoritmos!
  `;

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-base-100 p-6 rounded-lg shadow-lg">
        <ReactMarkdown
          className="prose text-base"
          remarkPlugins={[remarkGfm]}
        >
          {tutorialContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
