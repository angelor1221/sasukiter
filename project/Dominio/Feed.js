class Feed {
    constructor(dono) {
        this.dono = dono;
        this.posts = [];
    }

    recarregaFeed() {
        
        const planos = this.dono.planosAssinados || [];
    
        this.posts = [];
    
        // Faz uma cópia dos posts de cada plano
        const postsPorPlano = planos.map(plano => ({
            plano: plano,
            posts: [...(plano.posts || [])]
        }));
    
        // Embaralha os posts de cada plano
        postsPorPlano.forEach(item => {
            item.posts.sort(() => Math.random() - 0.5);
        });
    
        while (postsPorPlano.some(item => item.posts.length > 0)) {
    
            // Pega apenas os planos que ainda possuem posts
            const disponiveis = postsPorPlano.filter(
                item => item.posts.length > 0
            );
    
            // Escolhe aleatoriamente um dos planos disponíveis
            const indiceAleatorio = Math.floor(
                Math.random() * disponiveis.length
            );
    
            const escolhido = disponiveis[indiceAleatorio];
    
            // Pega um post desse plano
            const post = escolhido.posts.shift();
    
            // Adiciona no feed
            this.posts.push(post);
        }
    }
}
module.exports = Feed;