let livrosFiltrados = [];
let livros = [];
let paginaAtual = 1;
const livrosPorPagina = 5;

async function buscaLivro(termoDeBusca) {
    const conexao = await fetch(`http://192.168.208.74:3001/livros?q=${termoDeBusca}`);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function conectaApi() {
    const conexao = await fetch("http://192.168.208.74:3001/livros");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function inicializaTabela() {
    livros = await conectaApi();
    renderizaTabela();
}

function renderizaTabela() {
    const tbody = document.querySelector('.table tbody');
    tbody.innerHTML = '';

    const livrosParaExibir = livrosFiltrados.length > 0 ? livrosFiltrados : livros;
    const inicio = (paginaAtual - 1) * livrosPorPagina;
    const fim = inicio + livrosPorPagina;
    const livrosExibidos = livrosParaExibir.slice(inicio, fim);

    livrosExibidos.forEach(livro => {
        const tr = document.createElement('tr');
        tr.classList.add('linhaTabela');

        tr.innerHTML = `<td>
              <span class="texto-livro">${livro.titulo}</span>
              <button
                id="btnApagar"
                type="button"
                class="btn btn-outline-danger"
                style="
                  --bs-btn-padding-y: 0.25rem;
                  --bs-btn-padding-x: 0.5rem;
                  --bs-btn-font-size: 0.75rem;
                "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onclick="prepararExclusao(${livro.id})
              >
                Apagar
              </button>
              <button
                type="button"
                class="btn btn-outline-success"
                style="
                  --bs-btn-padding-y: 0.25rem;
                  --bs-btn-padding-x: 0.5rem;
                  --bs-btn-font-size: 0.75rem;
                "
                onclick="prepararEdicao(${livro.id})"
              >
                Editar
              </button>
            </td>`
        // const td = document.createElement('td');
        tbody.appendChild(tr);
    });

    atualizaInformacoesPagina(livrosParaExibir.length);
}

function atualizaInformacoesPagina(totalLivros) {
    const pageInfo = document.getElementById('page-info');
    const totalPaginas = Math.ceil(totalLivros / livrosPorPagina);
    pageInfo.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
}

function changePage(delta) {
    const totalLivros = livrosFiltrados.length > 0 ? livrosFiltrados.length : livros.length;
    const totalPaginas = Math.ceil(totalLivros / livrosPorPagina);
    paginaAtual += delta;

    if (paginaAtual < 1) {
        paginaAtual = 1;
    } else if (paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }

    renderizaTabela();
}

async function buscarLivro(evento) {
    evento.preventDefault();
    const dadosDePesquisa = document.getElementById('campoPesquisa').value.toLowerCase();

    if (dadosDePesquisa) {
        livrosFiltrados = await buscaLivro(dadosDePesquisa);
        paginaAtual = 1;
    } else {
        livrosFiltrados = [];
    }

    renderizaTabela();
}



const botaoDePesquisa = document.getElementById('formPesquisa');
botaoDePesquisa.addEventListener("submit", buscarLivro);


window.onload = inicializaTabela;
