class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    deletarPost(post) {
        if (!post) {
            return;
        }

        // Remove o post da lista do usuário que criou o post
        if (post.autor && post.autor.posts) {
            post.autor.posts = post.autor.posts.filter(
                p => p !== post
            );
        }

    }

    deletarPlano(plano) {
        if (!plano) {
            return;
        }
    
    
        // Remove o plano da lista de planos criados pelo autor
        if (plano.autor && plano.autor.planosCriados) {
            plano.autor.planosCriados =
                plano.autor.planosCriados.filter(
                    p => p !== plano
                );
        }
    
        // Remove o plano de todos os clientes que assinaram
        if (plano.assinantes) {
            plano.assinantes.forEach(cliente => {
                if (cliente.planosAssinados) {
                    cliente.planosAssinados =
                        cliente.planosAssinados.filter(
                            p => p !== plano
                        );
                }
            });
        }
    
        // Limpa a lista de assinantes do plano
        plano.assinantes = [];
    }

}
export default  Usuario;