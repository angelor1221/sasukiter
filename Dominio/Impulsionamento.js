class Impulsionamento {
    constructor(prioridade) {
        this.prioridade = prioridade;
        this.clientes = [];
    }

    adicionarCliente(cliente) {
        this.clientes.push(cliente);
    }

    removerCliente(cliente) {
        this.clientes = this.clientes.filter(c => c !== cliente);
    }
}
export default  Impulsionamento;