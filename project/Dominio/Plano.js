class Plano {
    constructor(nome, descricao, preco, dono) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.posts = [];
        this.assinantes = [];
        this.dono = dono;
    }

    trocaPreco(precoNovo) {
        this.preco = precoNovo;
    }

    adicionaPost(post) {
        if (!post) {
            return;
        }

        this.posts.push(post);
    }
}

module.exports = Plano;