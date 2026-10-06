const Usuario = require("./Usuario");
const Feed = require("./Feed");
const Plano = require("./Plano");


class Cliente extends Usuario {
    constructor(nome, email, senha) {
        super(nome, email, senha);

        this.planosCriados = [];
        this.planosAssinados = [];
        this.posts = [];
        this.feed = new Feed(this);
        this.impulsionamento = null;
    }

    criaPlano(nome, desc, preco) {
        const plano = new Plano(nome, desc, preco, this);

        this.planosCriados.push(plano);

        return plano;
    }

    deletarPost(post) {
        // Verifica se o post pertence a este cliente
        if (this.posts.includes(post)) {
            super.deletarPost(post);
        }
    }

    deletarPlano(plano) {
        // Verifica se o plano foi criado por este cliente
        if (this.planosCriados.includes(plano)) {
            super.deletarPlano(plano);
        }
    }

    deletarCliente(cliente) {
        // Verifica se o cliente é o próprio cliente que chamou o método
        if (this === cliente) {
            super.deletarCliente(cliente);
        }
    }
}
module.exports = Cliente;