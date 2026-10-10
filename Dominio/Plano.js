class Plano {
    constructor(nome, descricao, preco, autor) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.posts = [];
        this.assinantes = [];
        this.autor = autor;
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

export default Plano;