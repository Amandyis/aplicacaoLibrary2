
import { listaDadosLivro } from "../projeto/server.js";

const section = document.querySelector('.teste-card');
let livros = [];

function criarCard(genero, imagem){
    const card = document.createElement("div");
    card.classList.add("card", "a");
    card.style.width = "13rem";

    card.innerHTML = `<img src="${imagem}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${genero}</h5>
  </div>`

  return card;
}

async function listaLivros() {
  livros = await listaDadosLivro.conectaApi(); 
  renderizaCards(livros); 
}


function renderizaCards(livros) {
  section.innerHTML = '';
  livros.forEach(elemento => section.appendChild(
      criarCard(elemento.genero, elemento.imagem)
  ));
}


function filtrarLivros(evento) {
  evento.preventDefault();
  const termoDeBusca = document.getElementById('campoPesquisaEstante').value.toLowerCase();

  const livrosFiltrados = livros.filter(livro => livro.titulo.toLowerCase().includes(termoDeBusca)
  || livro.genero.toLowerCase().includes(termoDeBusca)
);
  renderizaCards(livrosFiltrados);
}


const botaoDePesquisa = document.getElementById('formPesquisaEstante');
botaoDePesquisa.addEventListener("submit", filtrarLivros);


window.onload = listaLivros;