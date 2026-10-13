class VisaoPlanos {
  exibirPlanos(idLista, planos, textoVazio, opcoes = {}) {
    const lista = document.getElementById(idLista);

    lista.replaceChildren();

    if (planos.length === 0) {
      const mensagem = document.createElement("p");
      mensagem.className = "empty-state";
      mensagem.textContent = textoVazio;

      lista.append(mensagem);
      return;
    }

    planos.forEach((plano) => {
      const cartao = document.createElement("article");
      cartao.className = "panel";

      const titulo = document.createElement("h3");
      titulo.textContent = plano.nome;

      const descricao = document.createElement("p");
      descricao.textContent = plano.descricao;

      const preco = document.createElement("p");
      preco.textContent = Number(plano.preco).toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL"
        }
      );

      const autor = document.createElement("p");
      autor.className = "muted";
      autor.textContent = `Por ${plano.autor.nome}`;

      cartao.append(titulo, descricao, preco, autor);

      // 1. Se foi passada a opção de assinar (usado na aba Explorar)
      if (opcoes.aoAssinar) {
        const jaAssinado =
          (opcoes.planosAssinados || []).includes(plano);

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "button-primary";
        botao.textContent = jaAssinado ? "Assinado" : "Assinar";
        botao.disabled = jaAssinado;

        botao.addEventListener("click", () => {
          opcoes.aoAssinar(plano);
        });

        cartao.append(botao);
      }

      // 2. Se foi passada a opção de adicionar posts (usado na aba Meu Espaço)
      if (opcoes.aoAdicionarPost && opcoes.postsDisponiveis) {
        const containerPost = document.createElement("div");
        containerPost.className = "mt-2";

        const label = document.createElement("label");
        label.textContent = "Adicionar post ao plano:";
        label.className = "muted";

        const select = document.createElement("select");
        select.innerHTML = `<option value="" disabled selected>Selecione um post...</option>`;

        // Preenche o select apenas com posts que ainda NÃO estão neste plano
        opcoes.postsDisponiveis.forEach((post, indice) => {
          const jaNoPlano = plano.posts && plano.posts.includes(post);
          if (!jaNoPlano) {
            const option = document.createElement("option");
            option.value = indice;
            option.textContent = post.titulo;
            select.append(option);
          }
        });

        const botaoAdicionar = document.createElement("button");
        botaoAdicionar.type = "button";
        botaoAdicionar.className = "button-secondary";
        botaoAdicionar.textContent = "Vincular Post";

        botaoAdicionar.addEventListener("click", () => {
          const indicePost = select.value;
          if (indicePost !== "") {
            const postEscolhido = opcoes.postsDisponiveis[Number(indicePost)];
            opcoes.aoAdicionarPost(plano, postEscolhido);
          }
        });

        // Mostra a lista de posts que já estão dentro deste plano
        if (plano.posts && plano.posts.length > 0) {
          const tituloPosts = document.createElement("p");
          tituloPosts.innerHTML = `<strong>Posts neste plano (${plano.posts.length}):</strong>`;
          cartao.append(tituloPosts);

          const ul = document.createElement("ul");
          plano.posts.forEach((p) => {
            const li = document.createElement("li");
            li.textContent = p.titulo;
            ul.append(li);
          });
          cartao.append(ul);
        }

        containerPost.append(label, select, botaoAdicionar);
        cartao.append(containerPost);
      }

      lista.append(cartao);
    });
  }
}

export default VisaoPlanos;