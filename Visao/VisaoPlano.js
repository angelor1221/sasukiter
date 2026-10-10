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

      lista.append(cartao);
    });
  }
}

export default VisaoPlanos;