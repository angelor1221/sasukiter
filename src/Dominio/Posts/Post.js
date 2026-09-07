export default class Post {
    constructor(titulo, texto, autor, imagem = null) {
        this.titulo = titulo;
        this.texto = texto;
        this.autor = autor;
        this.imagem = imagem;

        autor.adicionarPost(this);
    }
}
