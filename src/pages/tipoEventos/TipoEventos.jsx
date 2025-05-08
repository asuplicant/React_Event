import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/banner_tipo_eventos.svg";
import Lista from "../../components/lista/Lista";

const TipoEventos = () => {
    return (
        <>
            <Header />
                <Cadastro
                    tituloCadastro = "Cadastro Tipo de Eventos"
                    img_banner = {Banner}
                    nomes = "Título"
                    visibilidade = "none"
                />
                   <Lista 
                   tituloLista ="LISTA TIPO DE EVENTOS"
                   titulo = "Título"
                   visibilidade ="none"

                />
                <Footer />
        </>
    )
}

export default TipoEventos;