async function conectaApi() {
  try {
    const conexao = await fetch("http://192.168.208.74:3001/livros");
    if (!conexao.ok) throw new Error("Erro ao conectar: " + conexao.status);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
  } catch (error) {
    console.error(error);
  }
}

async function criaLivro(id, titulo, imagem, genero) {
  const conexao = await fetch("http://192.168.208.74:3001/livros", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      titulo: titulo,
      imagem: imagem,
      genero: genero,
    }),
  });

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

export const listaDadosLivro = {
  conectaApi,
  criaLivro,
};
