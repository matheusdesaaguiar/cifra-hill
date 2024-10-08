function geraMatrizChave(){
    let retorno = []
    for(let i = 1; i <= 2;i++){
        retorno.push([])
        for(let j = 1; j<=2; j++) {
            retorno[i-1].push(parseInt(prompt(`Digite um número para colocar na matriz chave na linha ${i} coluna ${j}:`)))
        }
    }
    return retorno
}
function determinante(matriz) {
    let det = matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
    return det;
}

function adjunta(matriz) {
        let matrizAdjunta = [
            [0,0],
            [0,0]
        ];
    
        matrizAdjunta[0][0] = matriz[1][1];
        matrizAdjunta[0][1] = -matriz[0][1];
        matrizAdjunta[1][0] = -matriz[1][0];
        matrizAdjunta[1][1] = matriz[0][0];
    
        return matrizAdjunta;
}

function inversa(mAdjunta, chave) {
    let determinanteChave = determinante(chave);
    if(determinanteChave != 0) {
        let inversa = [[],[]]
        for(let i = 0; i<2; i++) {
            for(let j = 0; j<2; j++) {
                inversa[i][j] = (1/determinanteChave) * mAdjunta[i][j];
            }
        }
        return inversa
    } else {
        console.log("Não e possivel fazer a inversa da matriz");
    }
}

function multiplicaMatriz(matriz, chave) {
    let criptografada= [
        [0,0,0],
        [0,0,0]
    ]
    criptografada[0][0] = matriz[0][0] * chave[0][0] + matriz[1][0] * chave[1][0];
    console.log(criptografada[0][0])
    criptografada[0][1] = matriz[0][1] * chave[0][0] + matriz[1][1] * chave[1][0];
    console.log(criptografada[0][1])
    criptografada[0][2] = matriz[0][2] * chave[0][0] + matriz[1][2] * chave[1][0];
    console.log(criptografada[0][2])

    criptografada[1][0] = matriz[0][0] * chave[0][1] + matriz[1][0] * chave[1][1];
    console.log(criptografada[1][0])
    criptografada[1][1] = matriz[0][1] * chave[0][1] + matriz[1][1] * chave[1][1];
    console.log(criptografada[1][1])
    criptografada[1][2] = matriz[0][2] * chave[0][1] + matriz[1][2] * chave[1][1];
    console.log(criptografada[1][2])

    for (let i = 0; i < criptografada.length; i++) {
        for (let j = 0; j < criptografada[i].length; j++) {
            if (criptografada[i][j] < 0) {
                criptografada[i][j] *= -1;
            }
        }
    }

    return criptografada;
}

function criptografar(mensagemNumerica) {
    let criptografada = [];
    for(let i = 0; i < 2; i++) {
        criptografada.push([]);
        for(let j = 0; j < 3; j++){
            criptografada[i].push(mensagemNumerica[i][j] % 26);
        }
    }
    return criptografada
}

function criptografandoMensagem(mensagemCriptografada) {
    let letra1 = [];
    for(let i = 0; i < 2; i++) {
        letra1.push([])
        for(let j = 0; j<3; j++) {
            letra1[i].push(alfabeto[mensagemCriptografada[i][j]]);
        }
    }
    return letra1;
}

function transformaEmString(array) {
    let x = []
    for(let i = 0; i<=1; i++) {
        x.push(array[i].join().replaceAll(",", ""));
    }
    return x
}

function enumerando(resultado) {
    let posicao = 0;
    let retorno =[]
    for (palavra of resultado) {
        retorno.push([]);
        for (letra of palavra) {
            retorno[posicao].push(alfabeto.indexOf(letra));
        }
        posicao++;
    }
    return retorno
}




const alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let criptografarDescriptografar = parseInt(prompt("Digite 1 se deseja criptografar ou 2 para descriptografar uma mensagem: "));

if(criptografarDescriptografar == 1) {
    let mensagem = prompt('Digite a mensagem a ser criptografada:');
    let chave =geraMatrizChave();
    let palavra = mensagem.toLowerCase().split(" ");
    let resultado = palavra.map(palavra => palavra.split(''));
    let mensagemNumerada = enumerando(resultado);
    let mensagemNumeradaCriptografada = multiplicaMatriz(mensagemNumerada, chave)
    let mensagemCriptografada = criptografar(mensagemNumeradaCriptografada);
    let fraseCriptografada = criptografandoMensagem(mensagemCriptografada);
    let criptografadaMensagem = transformaEmString(fraseCriptografada).join().replace(",", " ");
    alert(`A mensagem criptografada é ${criptografadaMensagem}`);
} else {
    
    let mensagem = prompt('Digite a mensagem a ser descriptografada: ');
    let chave =geraMatrizChave();
    let mAdjunta = adjunta(chave);
    let inversaChave = inversa(mAdjunta, chave);
    console.log(inversaChave)
    let palavra = mensagem.toLowerCase().split(" ");
    let resultado = palavra.map(palavra => palavra.split(''));
    let mensagemNumerada = enumerando(resultado);
    console.log(mensagemNumerada)
    let mensagemNumeradaCriptografada = multiplicaMatriz(mensagemNumerada, inversaChave)
    let mensagemCriptografada = criptografar(mensagemNumeradaCriptografada);
    let fraseCriptografada = criptografandoMensagem(mensagemCriptografada);
    let criptografadaMensagem = transformaEmString(fraseCriptografada).join().replace(",", " ");
    //alert(`A mensagem descriptografada é ${criptografadaMensagem}`);
    console.log(criptografadaMensagem);

}