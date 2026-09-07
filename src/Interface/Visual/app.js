import Servidor from "../../Servidor/Servicos/Servidor.js";


// Criar o servidor
const servidor = new Servidor();


// =====================================
// CADASTRAR USUÁRIO
// =====================================

const formUsuario =
    document.getElementById("formUsuario");


formUsuario.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const nome =
            document.getElementById("nome").value;

        const email =
            document.getElementById("email").value;

        const senha =
            document.getElementById("senha").value;

        const cpf =
            document.getElementById("cpf").value;


        // Criar usuário através do servidor
        const usuario =
            servidor.criarUsuario(
                nome,
                email,
                senha,
                cpf
            );


        console.log(
            "Usuário criado:",
            usuario
        );


        console.log(
            "Todos os usuários:",
            servidor.usuarios
        );


        // Limpar formulário
        formUsuario.reset();


        // Atualizar lista
        atualizarUsuarios();


        alert(
            "Usuário " +
            usuario.nome +
            " cadastrado com sucesso!"
        );

    }
);


// =====================================
// MOSTRAR USUÁRIOS
// =====================================

function atualizarUsuarios() {

    const lista =
        document.getElementById(
            "listaUsuarios"
        );


    // Limpar lista
    lista.innerHTML = "";


    // Limpar select de autores
    const selectAutor =
        document.getElementById("autor");


    selectAutor.innerHTML =
        '<option value="">Selecione um autor</option>';


    // Percorrer usuários
    servidor.usuarios.forEach(
        function (usuario, index) {


            // Criar div do usuário
            const div =
                document.createElement("div");


            div.className = "usuario";


            div.innerHTML =
                "<strong>" +
                usuario.nome +
                "</strong><br>" +

                "Email: " +
                usuario.email +
                "<br>" +

                "CPF: " +
                usuario.cpf;


            lista.appendChild(div);


            // Criar opção no select
            const option =
                document.createElement("option");


            option.value = index;


            option.textContent =
                usuario.nome;


            selectAutor.appendChild(option);

        }
    );

}


// =====================================
// CRIAR POST
// =====================================

const formPost =
    document.getElementById("formPost");


formPost.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const titulo =
            document.getElementById("titulo").value;


        const texto =
            document.getElementById("texto").value;


        const autorIndex =
            document.getElementById("autor").value;


        const arquivoImagem =
            document.getElementById("imagem").files[0];


        if (autorIndex === "") {

            alert("Selecione um autor!");

            return;
        }


        const autor =
            servidor.usuarios[autorIndex];


        // =====================================
        // SEM IMAGEM
        // =====================================

        if (!arquivoImagem) {

            servidor.criarPost(
                titulo,
                texto,
                autor
            );

            formPost.reset();

            atualizarPosts();

            return;
        }


        // =====================================
        // COM IMAGEM
        // =====================================

        const leitor =
            new FileReader();


        leitor.onload = function (event) {

            const imagem =
                event.target.result;


            console.log("Imagem carregada!");
            console.log(imagem);


            servidor.criarPost(
                titulo,
                texto,
                autor,
                imagem
            );


            formPost.reset();

            atualizarPosts();

        };


        leitor.readAsDataURL(arquivoImagem);

    }
);

// =====================================
// MOSTRAR POSTS
// =====================================

function atualizarPosts() {
    const lista =
        document.getElementById("listaPosts");


    lista.innerHTML = "";


    servidor.posts.forEach(
        function (post) {

            const div =
                document.createElement("div");


            div.className = "post";


            let conteudoImagem = "";


            if (post.imagem) {

                conteudoImagem =
                    `
                        <img
                            src="${post.imagem}"
                            alt="Imagem do post"
                            style="
                                width: 100%;
                                max-height: 500px;
                                object-fit: contain;
                                border-radius: 8px;
                                margin-top: 10px;
                            "
                        >
                        `;
            }


            div.innerHTML =
                `
                    <h3>
                        ${post.titulo}
                    </h3>

                    <p>
                        ${post.texto}
                    </p>

                    ${conteudoImagem}

                    <p>
                        <small>
                            Autor: ${post.autor.nome}
                        </small>
                    </p>
                    `;


            lista.appendChild(div);

        }
    );
}