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

    adicionarPost(post){
        this.posts.push(post);
    }


}
module.exports = Cliente;