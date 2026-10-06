export default class Usuario {
    constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    deletarPost(post, fachada) {
        if (!post || !fachada) {
            return;
        }

        // Remove o post da lista geral da Fachada
        fachada.posts = fachada.posts.filter(
            p => p !== post
        );

        // Remove o post da lista do usuário que criou o post
        if (post.dono && post.dono.posts) {
            post.dono.posts = post.dono.posts.filter(
                p => p !== post
            );
        }

        // Remove o post dos planos que o disponibilizavam
        if (fachada.planos) {
            fachada.planos.forEach(plano => {
                if (plano.posts) {
                    plano.posts = plano.posts.filter(
                        p => p !== post
                    );
                }
            });
        }
    }

    deletarPlano(plano, fachada) {
        if (!plano || !fachada) {
            return;
        }
    
        // Remove o plano da lista geral da Fachada
        fachada.planos = fachada.planos.filter(
            p => p !== plano
        );
    
        // Remove o plano da lista de planos criados pelo dono
        if (plano.dono && plano.dono.planosCriados) {
            plano.dono.planosCriados =
                plano.dono.planosCriados.filter(
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

    deletarCliente(cliente, fachada) {
        if (!cliente || !fachada) {
            return;
        }

        // Remove o cliente da lista geral
        fachada.clientes = fachada.clientes.filter(
            c => c !== cliente
        );

        // Remove o login
        if (fachada.logins) {
            fachada.logins.delete(cliente.email);
        }

        // Remove os planos criados pelo cliente
        if (cliente.planosCriados) {
            cliente.planosCriados.forEach(plano => {
                fachada.planos = fachada.planos.filter(
                    p => p !== plano
                );
            });
        }

        // Remove os posts criados pelo cliente
        if (cliente.posts) {
            cliente.posts.forEach(post => {
                fachada.posts = fachada.posts.filter(
                    p => p !== post
                );
            });
        }

        // Remove o cliente dos assinantes dos planos
        if (fachada.planos) {
            fachada.planos.forEach(plano => {
                if (plano.assinantes) {
                    plano.assinantes =
                        plano.assinantes.filter(
                            c => c !== cliente
                        );
                }
            });
        }
    }
    
}
module.exports = Usuario;