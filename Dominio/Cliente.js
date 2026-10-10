import Usuario from "./Usuario.js";
import Feed from "./Feed.js";
import Plano from "./Plano.js";  


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
export default  Cliente;