const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function numeroDeEntrada() {
    readline.question('Digite um número inteiro positivo: ', (valor) => {
        const numerosValidos = validarNumero(valor);

        if (numerosValidos !== false) {
            if (numerosValidos.length === 1) {
                opcao(numerosValidos[0]);
            } else {
                console.log('Digite apenas um número por vez.');
                numeroDeEntrada();
            }
        } else {
            numeroDeEntrada();
        }
    });
}

function exibirOpcoes() {
    console.log('Escolha a função:');
    console.log('1 - Função que retorna apenas o valor da soma');
    console.log('2 - Função que retorna o valor da soma e a memória de cálculo');
}

function opcao(numeroValido) {
    exibirOpcoes();

    readline.question('Opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                const resultado = calcularSoma(numeroValido);
                if (resultado !== 0) {
                    console.log(`A soma dos números menores que ${numeroValido} e divisíveis por 3 ou 5 é: ${resultado}`);
                } else {
                    console.log(`Não há números menores que ${numeroValido} e divisíveis por 3 ou 5`);
                }
                readline.close();
                break;
            case '2':
                const resultadoComMemoria = calcularSoma(numeroValido, true);
                if (resultadoComMemoria.soma !== 0) {
                    console.log(`A soma dos números menores que ${numeroValido} e divisíveis por 3 ou 5 é: ${resultadoComMemoria.soma}`);
                    console.log('Memória de cálculo:', resultadoComMemoria.memoria);
                } else {
                    console.log(`Não há números menores que ${numeroValido} e divisíveis por 3 ou 5`);
                }
                readline.close();
                break;
            default:
                console.log('Opção inválida. Escolha 1 ou 2.');
                opcao(numeroValido);
        }
    });
}

function calcularSoma(valor, numerosMemoria = false) {
    let soma = 0;
    let memoria = [];

    for (let i = 3; i < valor; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            soma += i;
            if (numerosMemoria) {
                memoria.push(i);
            }
        }
    }

    return numerosMemoria ? { soma, memoria } : soma;
}

function validarNumero(valor) {
    const numeros = valor.split(' ').map(numero => parseInt(numero));

    const saoNumerosValidos = numeros.every(numero => !isNaN(numero) && numero >= 0);

    if (!saoNumerosValidos) {
        console.log('Digite apenas números inteiros positivos.');
        return false;
    }

    if (calcularSoma(numeros[0]) === 0) {
        console.log(`Não há números menores que ${numeros[0]} e divisíveis por 3 ou 5`);
        return false;
    }

    return numeros;
}

numeroDeEntrada();
