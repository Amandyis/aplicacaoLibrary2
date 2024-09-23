let livroIdParaExcluir = null; 


async function inicializaTabela() {
    livros = await conectaApi();
    renderizaTabela();
}


function prepararExclusao(id) {
    livroIdParaExcluir = id; 
}

async function excluirLivroTabela() {
    if (livroIdParaExcluir === null) return;

    try {
        await fetch(`http://192.168.208.74:3001/livros/${livroIdParaExcluir}`, {
            method: 'DELETE',
        });

        livros = livros.filter(livro => livro.id !== livroIdParaExcluir);

        renderizaTabela();
        livroIdParaExcluir = null; 
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
    }
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
                onclick="prepararExclusao(${livro.id})"
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
            </td>`;
        tbody.appendChild(tr);
    });

    atualizaInformacoesPagina(livrosParaExibir.length);
}

const botaoDeExcluir = document.getElementById('botaoExcluir');
botaoDeExcluir.addEventListener('click', excluirLivroTabela);
