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

        if (!this.posts.includes(post)) {
            this.posts.push(post);
        }
        if (!post.PlanosDisp.includes(this)) {
            post.PlanosDisp.push(this);
        }
    }
}

export default Plano;