import Cliente from "./Dominio/Cliente.js";
import Post from "./Dominio/Post.js";
import Plano from "./Dominio/Plano.js";

export function carregarMockData(fachada) {
  // Lista com 10 nomes para gerar os clientes de teste
  const nomesClientes = [
    "Ana Silva", "Carlos Souza", "Beatriz Lima", "Daniel Oliveira", 
    "Elena Costa", "Felipe Santos", "Gabriela Rocha", "Lucas Mendes", 
    "Mariana Souza", "Roberto Pereira"
  ];

  const clientesCriados = [];

  // Gerando os 10 clientes por loop
  nomesClientes.forEach((nome, index) => {
    const id = index + 1;
    const email = `usuario${id}@teste.com`;
    const senha = "senha123";

    // 1. Cria o cliente
    const cliente = new Cliente(nome, email, senha);
    clientesCriados.push(cliente);

    // Registra na Fachada (Array de clientes e Map de logins)
    fachada.clientes.push(cliente);
    fachada.logins.set(email, senha);

    // Define a conta atual para que os métodos da fachada criem os dados vinculados a este usuário
    fachada.conta = cliente;

    // 2. Cada cliente cria 2 planos
    const plano1 = fachada.criaPlano(
      `Plano Essencial - ${nome.split(" ")[0]}`, 
      `Acesso a conteúdos básicos e iniciais publicados por ${nome}.`, 
      29.90
    );

    const plano2 = fachada.criaPlano(
      `Plano VIP / Master - ${nome.split(" ")[0]}`, 
      `Acesso total a conteúdos exclusivos, mentorias e posts avançados de ${nome}.`, 
      79.90
    );

    // 3. Cada plano recebe 5 posts (com imagens de exemplo geradas automaticamente)
    if (plano1) {
      for (let p = 1; p <= 5; p++) {
        // Gerando uma URL de imagem diferente para cada post (ex: Picsum Photos)
        const urlImagemMock = `https://picsum.photos/seed/cliente${id}essencial${p}/600/400`;

        const post = fachada.criaPost(
          `[Essencial] Dica ${p} de ${nome.split(" ")[0]}`, 
          `Conteúdo prático e direto ao ponto da dica número ${p} no plano essencial.`,
          urlImagemMock // Passando a imagem simulada aqui!
        );
        plano1.adicionaPost(post);
      }
    }

    if (plano2) {
      for (let p = 1; p <= 5; p++) {
        // Outra URL de imagem para o plano VIP
        const urlImagemMock = `https://picsum.photos/seed/cliente${id}vip${p}/600/400`;

        const post = fachada.criaPost(
          `[VIP] Conteúdo Avançado ${p} de ${nome.split(" ")[0]}`, 
          `Material aprofundado e exclusivo da postagem ${p} para assinantes do plano master.`,
          urlImagemMock // Passando a imagem simulada aqui!
        );
        plano2.adicionaPost(post);
      }
    }
  });

  // 4. Simulando algumas assinaturas cruzadas iniciais 
  if (clientesCriados.length >= 3 && fachada.planos.length >= 4) {
    fachada.conta = clientesCriados[0]; // Ana Silva logada
    fachada.AssinarPlano(fachada.planos[2]); // Assina o plano do Carlos
    fachada.AssinarPlano(fachada.planos[4]); // Assina o plano da Beatriz

    fachada.conta = clientesCriados[1]; // Carlos Souza logado
    fachada.AssinarPlano(fachada.planos[0]); // Assina o plano da Ana
  }

  // Deixa a fachada sem ninguém logado inicialmente
  fachada.conta = null;

  console.log("🔥 Mock data robusto com imagens carregado com sucesso!");
  console.log(`📊 Total: ${fachada.clientes.length} clientes, ${fachada.planos.length} planos e centenas de posts com imagens gerados.`);
}