import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login"
import TipoEventos from "../pages/tipoEventos/TipoEventos";

// import { Routes } from "react-router-dom";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                  <Route path="/" element={<Login/>} exact/>
                  <Route path="/TipoEventos" element={<TipoEventos/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;