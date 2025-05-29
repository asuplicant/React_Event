import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login"
import TipoUsuarios from "../pages/tipoUsuarios/TipoUsuarios";
import CadastroEventos from "../pages/cadastroEventos/CadastroEventos";
import TipoEventos from "../pages/tipoEventos/TipoEventos";
import Listagem from "../pages/listagem/Listagem";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/CadastroEventos" element={<CadastroEventos />} />
                <Route path="/TipoUsuarios" element={<TipoUsuarios />} />
                <Route path="/TipoEventos" element={<TipoEventos />} />
                <Route path="/ListagemDeEventos" element={<Listagem />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;