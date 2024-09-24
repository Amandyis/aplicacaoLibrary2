let idLivro = null;

async function conectaApi() {
    const conexao = await fetch("http://192.168.208.74:3001/livros");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

function prepararEdicao(id) {
    idLivro = id; 
    window.location.href = `editar.html?id=${idLivro}`; 
}

async function carregarDadosLivro() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        const livros = await conectaApi();
        const livro = livros.find(livro => livro.id == id); 
        
        if (livro) {
            document.getElementById('inputNomeEditar').value = livro.titulo;
            document.getElementById('inputCapaEditar').value = livro.imagem;
            document.getElementById('inputGeneroEditar').value = livro.genero;
            document.getElementById('idLivroEditar').value = livro.id;
        } else {
            console.error('Livro não encontrado');
        }
    } else {
        console.error('ID não encontrado na URL');
    }
}

async function atualizaLivro(evento) {
    evento.preventDefault();
    
    const titulo = document.getElementById('inputNomeEditar').value;
    const genero = document.getElementById('inputGeneroEditar').value;
    const id = Number(document.getElementById('idLivroEditar').value);
    const imagem = document.getElementById('inputCapaEditar').value;

    await fetch(`http://192.168.208.74:3001/livros${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, imagem, genero }),
    });

    window.location.href = "controleLivros.html";
}

const form = document.getElementById('form-cadastroLivro');

form.addEventListener('submit', atualizaLivro);
window.onload = carregarDadosLivro; 