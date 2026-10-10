import Fachada from "./Controlador/Fachada.js";
import Interface from "./Controlador/Interface.js";

const fachada = new Fachada();
const interfaceUsuario = new Interface(fachada);

interfaceUsuario.iniciar();