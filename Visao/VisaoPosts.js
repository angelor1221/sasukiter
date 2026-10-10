class VisaoPosts {
  exibirPosts(idLista, posts, textoVazio) {
    const lista = document.getElementById(idLista);

    lista.replaceChildren();

    if (posts.length === 0) {
      const mensagem = document.createElement("p");
      mensagem.className = "empty-state";
      mensagem.textContent = textoVazio;

      lista.append(mensagem);
      return;
    }

    posts.forEach((post) => {
      const cartao = document.createElement("article");
      cartao.className = "panel";

      const titulo = document.createElement("h3");
      titulo.textContent = post.titulo;

      const texto = document.createElement("p");
      texto.textContent = post.texto;

      const autor = document.createElement("p");
      autor.className = "muted";
      autor.textContent = `Por ${post.autor.nome}`;

      cartao.append(titulo, texto, autor);
      lista.append(cartao);
    });
  }

  exibirOpcoesPlanos(idSelect, planos) {
    const seletor = document.getElementById(idSelect);

    seletor.replaceChildren();

    const semPlano = document.createElement("option");
    semPlano.value = "";
    semPlano.textContent = "Sem vincular a um plano";
    semPlano.defaultSelected = true;

    seletor.append(semPlano);

    planos.forEach((plano, indice) => {
      const opcao = document.createElement("option");
      opcao.value = String(indice);
      opcao.textContent = plano.nome;

      seletor.append(opcao);
    });
  }
}

export default VisaoPosts;