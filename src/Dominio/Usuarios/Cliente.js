export default class Cliente {
    constructor(nome, email, senha, cpf) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.posts = [];
    }

    adicionarPost(post) {
        this.posts.push(post);
    }
}
