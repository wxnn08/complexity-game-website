import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Tutorial() {
  const comoJogarContent = `

1. **Iniciar o jogo:**
   - Na tela inicial, insira seu nome e, opcionalmente, o nome de um grupo. O grupo se refere a qual ranking você estará competindo.
   - Clique em **Jogar** para começar.

2. **Comparando algoritmos:**
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
   - O jogo tem um tempo limite de 3 minutos. Responda o maior número de questões possível antes que o tempo acabe.

5. **Resultados:**
   - Ao final do jogo, você verá um resumo das suas respostas, sua pontuação e um ranking.
`;

  const comoIdentificarContent = `

### 1. **Entenda a operação dominante**

- **Loops:** Analise a quantidade de loops aninhados. Cada loop geralmente adiciona um fator multiplicativo à complexidade. Por exemplo, um loop dentro de outro pode resultar em *O(n²)*.

- **Recursão:** Verifique a profundidade e o número de chamadas recursivas.

### 2. **Utilize a notação Big-O**

A notação Big-O descreve como o tempo de execução cresce em função do tamanho da entrada no pior caso. Algumas complexidades comuns:

- **O(1):** Constante. Exemplo: acessar um elemento específico de uma lista.
- **O(log n):** Logarítmica. Exemplo: busca binária.
- **O(n):** Linear. Exemplo: percorrer uma lista.
- **O(n log n):** Log-linear. Exemplo: algoritmos de ordenação eficientes como MergeSort.
- **O(n²):** Quadrática. Exemplo: algoritmos de ordenação simples como Bubble Sort.

### 3. **Exemplos Práticos**

#### Busca em lista não ordenada: O(n)

~~~python
def busca_nao_ordenada(lista, alvo):
    for elemento in lista:
        if elemento == alvo:
            return True
    return False
~~~

#### Busca binária em lista já ordenada: O(log n)

~~~python
def busca_binaria(lista, alvo):
    esquerda, direita = 0, len(lista) - 1
    while esquerda <= direita:
        meio = (esquerda + direita) // 2
        if lista[meio] == alvo:
            return True
        elif lista[meio] < alvo:
            esquerda = meio + 1
        else:
            direita = meio - 1
    return False
~~~

#### Insertion sort: O(n²)

~~~python
def insertion_sort(lista):
    for i in range(1, len(lista)):
        chave = lista[i]
        j = i - 1
        while j >= 0 and chave < lista[j]:
            lista[j + 1] = lista[j]
            j -= 1
        lista[j + 1] = chave
    return lista
~~~

#### Merge sort: O(n log n)

~~~python
def merge_sort(lista):
    if len(lista) > 1:
        meio = len(lista) // 2
        esquerda = lista[:meio]
        direita = lista[meio:]

        merge_sort(esquerda)
        merge_sort(direita)

        i = j = k = 0
        while i < len(esquerda) and j < len(direita):
            if esquerda[i] < direita[j]:
                lista[k] = esquerda[i]
                i += 1
            else:
                lista[k] = direita[j]
                j += 1
            k += 1

        while i < len(esquerda):
            lista[k] = esquerda[i]
            i += 1
            k += 1

        while j < len(direita):
            lista[k] = direita[j]
            j += 1
            k += 1
    return lista
~~~

### 4. **Compare as Complexidades**

- **Menor é melhor:** O(1) é mais eficiente que O(log n), que é mais eficiente que O(n), e assim por diante.
- **Impacto prático:** para entradas pequenas, diferenças podem ser insignificantes, mas para grandes entradas, algoritmos com menor complexidade são preferíveis.

### 5. **Dicas**

- **Ignore constantes:** na prática, apenas o termo de maior ordem importa. Exemplo: O(n + log n) simplifica para O(n).
- **Considere sempre o pior caso:** a análise deve considerar o pior cenário.
- **Pratique:** a prática com diferentes algoritmos nesse jogo ajudará na familiarização com suas complexidades.

`;

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-base-100 p-6 rounded-lg shadow-lg">
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-4">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-bold">
            Como Jogar
          </div>
          <div className="collapse-content">
            <ReactMarkdown
              className="prose text-base"
              remarkPlugins={[remarkGfm]}
            >
              {comoJogarContent.replace(/`/g, "~")}
            </ReactMarkdown>
          </div>
        </div>

        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-bold">
            Como Identificar a Complexidade de Algoritmos
          </div>
          <div className="collapse-content">
            <ReactMarkdown
              className="prose text-base"
              remarkPlugins={[remarkGfm]}
            >
              {comoIdentificarContent.replace(/`/g, "~")}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
