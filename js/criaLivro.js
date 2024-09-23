import { listaDadosLivro } from "../projeto/server.js";

const formulario = document.getElementById('form-cadastroLivro');

async function criaLivro2(evento){
    evento.preventDefault();

    const titulo = document.getElementById('inputNome').value;
    const genero = document.getElementById('inputGenero').value;
    const id = Number(document.getElementById('idLivro').value);
    const imagem = document.getElementById('inputCapa').value;

    await listaDadosLivro.criaLivro(id, titulo, imagem, genero);

    window.location.href = "controleLivros.html"

}

formulario.addEventListener('submit', evento => criaLivro2(evento));