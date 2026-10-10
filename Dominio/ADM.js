import Usuario from "./Usuario.js";

class ADM extends Usuario {
    constructor(nome, email, senha) {
        super(nome, email, senha);
    }
}
export default ADM;