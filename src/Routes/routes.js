import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login"
import TipoUsuarios from "../pages/tipoUsuarios/TipoUsuarios";
import CadastroEventos from "../pages/cadastroEventos/CadastroEventos";
import TipoEventos from "../pages/tipoEventos/TipoEventos";
import EventoAluno from "../pages/eventoAluno/EventoAluno";
import Home from "../pages/home/Home";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<Login />} exact />
                <Route path="/CadastroEventos" element={<CadastroEventos />} />
                <Route path="/TipoUsuarios" element={<TipoUsuarios />} />
                <Route path="/TiposEventos" element={<TipoEventos />} />
                <Route path="/EventoAluno" element={<EventoAluno />} />
                <Route path="/Home" element={<Home />} exact />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;