const fs = require('fs');

/*

​1) Em linguagens síncronas é comum a função sleep(tempo) assim, pode-se por exemplo escrever algo no console, pausar o script por x tempo e escrever algo mais algo como:

console.log('Olá!')

sleep(2000)

console.log('Depois de 2segs')

simule o sleep de maneira correta em Javascript (sem travar a thread principal) utilizando promises e uma função async/await

2) A função readdir disponível no módulo fs do Node, permite ler um diretório, e retornar seu conteúdo como um vetor. Crie uma versão em Promise da função.

Dica: a assinatura da função é: fs.readdir(caminho, (err, files) => {})

3) A lista de arquivos retornado no exercício anterior, também retorna diretórios. Crie uma função que retorne todos os sub-diretórios em um vetor (deve-se ignorar os arquivos retornados pelo readdir).

Algumas funções do fs e de Promises que te ajudarão:

fs.stat(caminhoArquivoDiretorio, (err, stats) => {})
stats que é retornado no callback possui um isDirectory() e um isFile()
(sou bonzinho né, cantei a pedra aqui ;) )
Promise.all(vetorDePromises): aguarda um vetor de promises ser executado, e retorna uma promise que retorna para um vetor com o resultado.
Ex:
   Promise.all([promise1, promise2]).then( results => {

     results[0] // resultado de promise1

     results[1] // resultado de promise2

   })

este exercício é um pouco mais desafiador; é normal ter um pouco de dificuldade
4) A lista de arquivos retornado no exercício 2, também retorna diretórios. Crie uma função que retorne todos os arquivos em um vetor (deve-se ignorar os diretório retornados pelo readdir).

Algumas funções do fs e de Promises que te ajudarão:

fs.stat(caminhoArquivoDiretorio, (err, stats) => {})
stats que é retornado no callback possui um isDirectory() e um isFile()
(sou bonzinho né, cantei a pedra aqui ;) )
Promise.all(vetorDePromises): aguarda um vetor de promises ser executado, e retorna uma promise que retorna para um vetor com o resultado.
Ex:
   Promise.all([promise1, promise2]).then( results => {

     results[0] // resultado de promise1

     results[1] // resultado de promise2

   })

este exercício é um pouco mais desafiador; é normal ter um pouco de dificuldade

*/


/* 1)
const sleep = async time => new Promise (resolve => setTimeout(resolve, time))

const main1 = async () => {
    const time = 2000;
    console.log('Hello');
    await sleep(time);
    console.log(`Hello After ${time}`);
}

main1();
*/

/* 2)
const readDirSync = async (dir) => {
    return new Promise((resolve, reject) =>
        fs.readdir(dir, (err, files) => {            
            if (err) {
                reject(err);
            }

            resolve(files);
        })
    );
}

const main2 = async () => {
    const files = await readDirSync('./files/');

    console.log(files);
}

main2();
*/

// 3) and 4)
const initialDir = './files/';
const readDirSync = async (dir) => {
    return new Promise((resolve, reject) =>
        fs.readdir(dir, (err, files) => {            
            if (err) {
                reject(err);
            }

            resolve(files);
        })
    );
}

const stat = async dir => new Promise((resolve, reject) => {
    fs.stat(dir, (err, stat) => {
        if (err) {
            reject(err);
        }

        resolve(stat);
    });
})

const isFile = async element => { 
    const e = await stat(element);
    
    if (e.isFile()) {
        return element;
    } else {
        return false;
    }
};

const isDirectory = async element => { 
    const e = await stat(element);
    
    if (e.isDirectory()) {
        return element;
    } else {
        return false;
    }
};

const main2 = async () => {

    const elements = await readDirSync('./files/');
    const possibleFiles = await Promise.all(elements.map(e => isFile(initialDir + e) ));
    const possibleDirectories = await Promise.all(elements.map(e => isDirectory(initialDir + e) ));

    const files = possibleFiles.filter(e => e);
    const directories = possibleDirectories.filter(e => e);

    console.log('Files', files);
    console.log('Directories', directories);
}

main2();

