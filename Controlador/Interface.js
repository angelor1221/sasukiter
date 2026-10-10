import VisaoPlanos from "../Visao/VisaoPlano.js";
import VisaoPosts from "../Visao/VisaoPosts.js";

class Interface {
  constructor(fachada) {
    this.fachada = fachada;
    this.visaoPlanos = new VisaoPlanos();

    this.telaAutenticacao =
      document.getElementById("tela-autenticacao");

    this.telaAplicacao =
      document.getElementById("tela-aplicacao");

    this.formLogin =
      document.getElementById("form-login");

    this.formCadastro =
      document.getElementById("form-cadastro");

    this.formPlano = 
      document.getElementById("form-plano");

    this.formPesquisa =
      document.getElementById("form-pesquisa");

    this.formPost = document.getElementById("form-post");
    this.VisaoPosts = new VisaoPosts();

    this.mensagem =
      document.getElementById("mensagem");

    this.botaoSair =
      document.getElementById("botao-sair");

    this.botaoRecarregar = 
      document.getElementById("botao-recarregar");

    this.botoesNavegacao = [
      ...document.querySelectorAll("[data-tela]")
    ];

    this.telas = [
      ...document.querySelectorAll(".workspace")
    ];
  }

  iniciar() {
    this.formCadastro.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this.cadastrar();
    });

    this.formLogin.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this.entrar();
    });

    this.botaoSair.addEventListener("click", () => {
      this.sair();
    });

    this.formPlano.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this.criarPlano();
    });

    this.formPlano.querySelector("fieldset").disabled = false;
    this.formPesquisa.querySelector("input").disabled = false;
    this.formPesquisa.querySelector("button").disabled = false;

    this.formPesquisa.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this.pesquisarPlanos();
    });

    this.botoesNavegacao.forEach((botao) => {
      botao.addEventListener("click", () => {
        this.navegar(botao.dataset.tela);
      });

      botao.disabled = false;
    });

    // Habilita somente os controles conectados nesta etapa.
    this.formLogin.querySelector("fieldset").disabled = false;
    this.formCadastro.querySelector("fieldset").disabled = false;
    this.botaoSair.disabled = false;

    this.formPost.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this.criarPost();
    });
    
    this.formPost.querySelector("fieldset").disabled = false;

    this.botaoRecarregar.addEventListener("click", () => {
      this.atualizarFeed();
    });

    this.botaoRecarregar.disabled = false;
  }

  criarPlano() {
    const dados = new FormData(this.formPlano);

    const nome = dados.get("nome").trim()
    const descricao = dados.get("descricao").trim()
    const preco = Number(dados.get("preco"));

    const plano = this.fachada.criaPlano(nome, descricao, preco);
    
    if (!plano) {
      this.mostrarMensagem("Entre na sua conta para criar um plano.", "erro");
      return;
    }

    this.formPlano.reset();
    this.atualizarPlanos();
    this.mostrarMensagem("Plano criado com sucesso!", "sucesso");
  }

  pesquisarPlanos() {
    if (!this.fachada.conta) return;

    const dados = new FormData(this.formPesquisa);
    const termo = dados.get("pesquisa").trim();

    const resultados = this.fachada.pesquisar(termo);

    this.visaoPlanos.exibirPlanos(
      "lista-planos",
      resultados,
      "Nenhum plano encontrado.",
      {
        planosAssinados: this.fachada.conta.planosAssinados,
        aoAssinar: (plano) => this.assinarPlano(plano)
      }
    );
  }

  atualizarPlanos() {
    if (!this.fachada.conta) return;

    this.visaoPlanos.exibirPlanos(
      "lista-meus-planos",
      this.fachada.conta.planosCriados,
      "Você ainda não criou nenhum plano."
    );

    this.VisaoPosts.exibirOpcoesPlanos(
      "plano-post",
      this.fachada.conta.planosCriados
    );

    this.pesquisarPlanos();
  }

  criarPost() {
    const dados = new FormData(this.formPost);

    const titulo = dados.get("titulo").trim();
    const texto = dados.get("texto").trim();
    const escolhaPlano = dados.get("plano");

    const post = this.fachada.criaPost(titulo, texto);

    if (!post) {
      this.mostrarMensagem(
        "Entre na sua conta para publicar.",
        "erro"
      );
      return;
    }

    if (escolhaPlano !== null && escolhaPlano !== "") {
      const plano =
        this.fachada.conta.planosCriados[Number(escolhaPlano)];

      if (plano) {
        plano.adicionaPost(post);
      }
    }

    this.formPost.reset();
    this.atualizarPosts();

    this.mostrarMensagem(
      "Post publicado com sucesso!",
      "sucesso"
    );
  }

  atualizarPosts() {
    if (!this.fachada.conta) return;

    this.VisaoPosts.exibirPosts("lista-meus-posts", this.fachada.conta.posts, "Você ainda não publicou nenhum post.");
  }

  assinarPlano(plano) {
    if (!this.fachada.conta) return;

    this.fachada.AssinarPlano(plano);

    this.atualizarPlanos();
    this.atualizarAssinaturas();

    this.mostrarMensagem("Plano assinado com sucesso!.", "sucesso");
  }

  atualizarAssinaturas() {
    if (!this.fachada.conta) return;

    this.visaoPlanos.exibirPlanos("lista-assinaturas",
      this.fachada.conta.planosAssinados, 
      "Você ainda não assinou nenhum plano.");
  }

  atualizarFeed() {
  if (!this.fachada.conta) return;

  this.fachada.RecarregarFeed(this.fachada.conta.feed);

  this.VisaoPosts.exibirPosts(
    "lista-feed",
    this.fachada.conta.feed.posts,
    "Nenhuma publicação disponível nos planos que você assinou."
  );
}

  cadastrar() {
    const dados = new FormData(this.formCadastro);

    const nome = dados.get("nome").trim();
    const email = dados.get("email").trim();
    const senha = dados.get("senha");

    const cliente = this.fachada.Registrar(nome, email, senha);

    if (!cliente) {
      this.mostrarMensagem(
        "Este e-mail já está cadastrado.",
        "erro"
      );

      return;
    }

    this.formCadastro.reset();
    this.formLogin.reset();

    document.getElementById("email-login").value = email;
    document.getElementById("senha-login").focus();

    this.mostrarMensagem(
      "Conta criada! Entre com seu e-mail e senha.",
      "sucesso"
    );
  }

  entrar() {
    const dados = new FormData(this.formLogin);

    const email = dados.get("email").trim();
    const senha = dados.get("senha");

    const cliente = this.fachada.Login(email, senha);

    if (!cliente) {
      this.mostrarMensagem(
        "E-mail ou senha incorretos.",
        "erro"
      );

      return;
    }

    this.formLogin.reset();

    this.telaAutenticacao.hidden = true;
    this.telaAplicacao.hidden = false;

    document.getElementById("nome-usuario").textContent =
    cliente.nome;

    this.mostrarMensagem("");
    this.atualizarPlanos();
    this.atualizarPosts();
    this.atualizarAssinaturas();
    this.navegar("explorar");
  }

  navegar(destino) {
    if (!this.fachada.conta) return;

    if (destino === "feed") {
      this.atualizarFeed();
    }

    this.telas.forEach((tela) => {
      tela.hidden = tela.id !== `tela-${destino}`;
    });

    this.botoesNavegacao.forEach((botao) => {
      const ativo = botao.dataset.tela === destino;

      botao.classList.toggle("active", ativo);

      if (ativo) {
        botao.setAttribute("aria-current", "page");
      } else {
        botao.removeAttribute("aria-current");
      }
    });

    const titulo = document
      .getElementById(`tela-${destino}`)
      .querySelector("h2");

    titulo.tabIndex = -1;
    titulo.focus();
  }

  sair() {
    // A Fachada atual não possui método de logout.
    // Limpa a conta ativa e preserva os dados em memória.
    this.fachada.conta = null;

    this.telaAplicacao.hidden = true;
    this.telaAutenticacao.hidden = false;

    document.getElementById("nome-usuario").textContent = "";

    document.querySelectorAll("form").forEach((form) => {
      form.reset();
    });

    this.mostrarMensagem("Você saiu da sua conta.");

    document.getElementById("email-login").focus();
  }

  mostrarMensagem(texto, tipo = "") {
    this.mensagem.textContent = texto;

    this.mensagem.classList.toggle(
      "is-error",
      tipo === "erro"
    );

    this.mensagem.classList.toggle(
      "is-success",
      tipo === "sucesso"
    );
  }
}

export default  Interface;