const Usuario = require("./Usuario");

class ADM extends Usuario {
    constructor(nome, email, senha) {
        super(nome, email, senha);
    }
}
module.exports = ADM;