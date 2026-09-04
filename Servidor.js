import Cliente from "./Cliente.js";
import Post from "./Post.js";

export default class Servidor {

    constructor() {

        if (Servidor.instancia) {
            return Servidor.instancia;
        }

        this.usuarios = [];
        this.posts = [];

        Servidor.instancia = this;
    }

    criarUsuario(nome, email, senha, cpf) {

        const usuario =
            new Cliente(nome, email, senha, cpf);

        this.usuarios.push(usuario);

        return usuario;
    }

    criarPost(titulo, texto, autor, imagem = null) {

        const post =
            new Post(
                titulo,
                texto,
                autor,
                imagem
            );

        this.posts.push(post);

        return post;
    }
}
