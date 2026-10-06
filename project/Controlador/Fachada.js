const Usuario = require("../Dominio/Usuario");
const Cliente = require("../Dominio/Cliente");
const ADM = require("../Dominio/ADM");
const Impulsionamento = require("../Dominio/Impulsionamento");
const Feed = require("../Dominio/Feed");
const Comentario = require("../Dominio/Comentario");
const Post = require("../Dominio/Post");
const Plano = require("../Dominio/Plano");


class Fachada {
    constructor() {
        this.logins = new Map();
        this.clientes = [];
        this.conta = null;
        this.planos = [];
        this.adms = [];
    }

    Login(email, senha) {
        if (this.logins.has(email) && this.logins.get(email) === senha) {
            this.conta = this.clientes.find(
                cliente => cliente.email === email
            );

            return this.conta;
        }

        return null;
    }

    criaPlano(nome, desc, preco) {
        if (!this.conta) return null;

        const plano = this.conta.criaPlano(nome, desc, preco);

        this.planos.push(plano);

        return plano;
    }

    criaPost(titulo, desc, preco, plano) {
        if (!this.conta) return null;

        const post = new Post(
            titulo,
            desc,
            this.conta
        );
        
        plano.adicionaPost(post);
        this.conta.posts.push(post);

        return post;
    }

    impulsionar(impulsionamento) {
        if (!this.conta) return;

        this.conta.impulsionamento = impulsionamento;
    }

    removerImpulsionamento(impulsionamento) {
        if (
            this.conta &&
            this.conta.impulsionamento === impulsionamento
        ) {
            this.conta.impulsionamento = null;
        }
    }

    pesquisar(pesquisa) {
        const termo = pesquisa.toLowerCase();

        return this.planos.filter(plano =>
            plano.nome.toLowerCase().includes(termo) ||
            plano.descricao.toLowerCase().includes(termo)
        );
    }

    Registrar(nome, email, senha) {
        const cliente = new Cliente(nome, email, senha);

        this.clientes.push(cliente);
        this.logins.set(email, senha);

        return cliente;
    }

    AssinarPlano(plano) {
        if (!this.conta || !plano) return;

        if (!plano.assinantes.includes(this.conta)) {
            plano.assinantes.push(this.conta);
        }

        if (!this.conta.planosAssinados.includes(plano)) {
            this.conta.planosAssinados.push(plano);
        }
    }

    DeletarPost(post) {
        if (!this.conta) return;

        this.conta.deletarPost(post, this);
    }

    DeletarPlano(plano) {
        if (!this.conta) return;

        this.conta.deletarPlano(plano, this);
    }

    RecarregarFeed(feed) {
        if (!feed) return;

        feed.recarregaFeed();
    }
}
