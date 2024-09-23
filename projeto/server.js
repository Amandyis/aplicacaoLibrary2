
async function conectaApi() {
    const conexao = await fetch("http://localhost:3000/livros");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function criaLivro(id, titulo, imagem, genero) {
    const conexao = await fetch("http://localhost:3000/livros", {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            titulo: titulo,
            imagem: imagem,
            genero: genero

        })
    });

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function buscaLivro(termoDeBusca) {
    const conexao = await fetch(`http://localhost:3000/livros?q=${termoDeBusca}`)
    const conexaoConvertida = conexao.json()

    return conexaoConvertida
}

export const listaDadosLivro = {
    conectaApi,
    criaLivro,
    buscaLivro
}

