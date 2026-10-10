import Usuario from "../Dominio/Usuario.js";
import Cliente from "../Dominio/Cliente.js";
import ADM from "../Dominio/ADM.js";
import Impulsionamento from "../Dominio/Impulsionamento.js";
import Feed from "../Dominio/Feed.js";
import Comentario from "../Dominio/Comentario.js";
import Post from "../Dominio/Post.js";
import Plano from "../Dominio/Plano.js";


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

    criaPost(titulo, desc) {
        if (!this.conta) return null;

        const post = new Post(
            titulo,
            desc,
            this.conta
        );

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
            this.conta.impulsionamento  =  null;
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
        if (this.logins.has(email)) {
            return null;
        }

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
        if (!this.conta || this.conta !== post.autor) return;

        this.conta.deletarPost(post);

        // Remove o post dos planos que o disponibilizavam
        if (this.planos) {
            this.planos.forEach(plano => {
                if (plano.posts) {
                    plano.posts = plano.posts.filter(
                        p => p !== post
                    );
                }
            });
        }
    }

    DeletarPlano(plano) {
        if (!this.conta || this.conta !== plano.autor) return;

        this.conta.deletarPlano(plano);

        // Remove o plano da lista geral da Fachada
        this.planos = this.planos.filter(
            p => p !== plano
        );
    }

    RecarregarFeed(feed) {
        if (!this.conta) return;

        this.conta.feed.recarregaFeed();
    }


    deletarCliente(cliente) {
        if (!cliente || this.conta !== cliente) {
            return;
        }

        // Remove o cliente da lista geral
        this.clientes = this.clientes.filter(
            c => c !== cliente
        );

        // Remove o login
        if (this.logins) {
            this.logins.delete(cliente.email);
        }

        // Remove os planos criados pelo cliente
        if (cliente.planosCriados) {
            cliente.planosCriados.forEach(plano => {
                this.planos = this.planos.filter(
                    p => p !== plano
                );
            });
        }


        // Remove o cliente dos assinantes dos planos
        if (this.planos) {
            this.planos.forEach(plano => {
                if (plano.assinantes) {
                    plano.assinantes =
                        plano.assinantes.filter(
                            c => c !== cliente
                        );
                }
            });
        }
    }
}
export default Fachada;