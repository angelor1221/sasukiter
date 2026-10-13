import Fachada from "./Controlador/Fachada.js";
import Interface from "./Visao/Interface.js";
import { carregarMockData } from "./mock-data.js"; // Importa a função de carregamento

const fachada = new Fachada();

// Carrega os dados de teste para dentro da fachada
carregarMockData(fachada);

const interfaceUsuario = new Interface(fachada);
interfaceUsuario.iniciar();