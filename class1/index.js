/* Exercícios extras (Aula 01):
Os exercícios aqui propostos visam reforçar a prática da linguagem javascript de acordo com o que foi visto na primeira aula extra.

1) Dado um vetor de números, como poderia ser realizada a soma de todos os valores utilizando reduce.

2) Dado um vetor de números, como poderia ser realizada a soma de todos os valores pares utilizando reduce e filter.

3) Dado um vetor de números, como poderia ser realizada a soma de todos os valores ímpares utilizando reduce e filter.

4) Dado um vetor de valores, retorne um objeto com quantas vezes cada valor está presente no vetor (dica: utilize reduce)

5) Dado um vetor de valores, retorne um vetor com somente os valores únicos do vetor (aqueles que ocorrem apenas 1 vez dentro do vetor) (Dica 1: utilize reduce, filter e keys, Dica 2: escreva console.log(objeto.keys()) e veja como ele poderá te ajudar neste exercício)

6) Dado um vetor com números, retorne somente os números pares;

7) Dado um vetor com números, retorne somente os números ímpares;

8) Uma função é chamada da seguinte forma:

calculadora(10, '+', 20)

crie o corpo da função de forma que ela realize as 4 operações aritméticas

9) Modifique a calculadora do exercício anterior para que ela receba 2 números e uma função, e realize o cálculo. Exemplo:

const soma = (num1, num2) => num1+num2

const calculadoraFn = (....) => ….

calculadoraFn(10, soma, 20) */


const numberVector = [1, 2, 3, 3, 4, 5, 2, 5, 1, 2, 6];

const OPERATOR_LIST = {
    '+': (numberOne, numberTwo) => numberOne + numberTwo,
    '-': (numberOne, numberTwo) => numberOne - numberTwo,
    '*': (numberOne, numberTwo) => numberOne * numberTwo,
    '/': (numberOne, numberTwo) => numberOne + numberTwo,
}

const sum = (sum, actualValue) => sum + actualValue;

const pairNumber = (value) => value % 2 === 0;

const oddNumber = (value) => value % 2 !== 0;

const timesNumber = (aggregate, actualValue) =>  {                     
    if (!aggregate[actualValue]) {                
        aggregate[actualValue] = 0;                
    } 
    aggregate[actualValue] = aggregate[actualValue] + 1;        
    
    return aggregate;
};

const uniqueNumber = (element) =>  timesNumberResult[element] === 1; 

const calculator = (numberOne, operator, numberTwo) => {
    return OPERATOR_LIST[operator](numberOne, numberTwo);    
};

const calculator2 = (numberOne, operator, numberTwo) => {    
    // First way
    //return (new Function('numberOne', 'numberTwo', `return numberOne ${operator} numberTwo`)).call(this, numberOne, numberTwo);    
    // Second way
    return (new Function('numberOne', 'numberTwo', `return numberOne ${operator} numberTwo`)).apply(this, [numberOne, numberTwo]);    
};

const calculator3 = (fn, numberOne, numberTwo) => {
    return fn(numberOne, numberTwo);
};

// 1
let result = numberVector.reduce(sum);

console.log('Reduce Result', result);

// 2
result = numberVector.filter(pairNumber).reduce(sum);

console.log('Reduce Filter Pair Result', result);

// 3
result = numberVector.filter(oddNumber).reduce(sum);

console.log('Reduce Filter Odd Result', result);

// 4
result = numberVector.reduce(timesNumber, {});

console.log('Times Number Result', result);

// 5
const timesNumberResult = numberVector.reduce(timesNumber, {});

result = Object.keys(timesNumberResult).filter(uniqueNumber);

console.log('Unique Number Result', result);

// 6
result = numberVector.filter(pairNumber);

console.log('Pair Number Result', result);

// 7
result = numberVector.filter(oddNumber);

console.log('Odd Number Result', result);

// 8.1
result = calculator(10, '+', 20);

console.log('Calculator sum()', result);

// 8.2
result = calculator(20, '-', 10);

console.log('Calculator sub()', result);

// 8.3
result = calculator(10, '*', 20);

console.log('Calculator mult()', result);

// 8.4
result = calculator(20, '/', 10);

console.log('Calculator div()', result);

// 9
result = calculator2(10, '+', 20);

console.log('Calculator 2, it uses new Function()', result);

// 10
result = calculator3(OPERATOR_LIST['+'], 10, 20);

console.log('Calculator 3, it passes a function to calculator function', result);