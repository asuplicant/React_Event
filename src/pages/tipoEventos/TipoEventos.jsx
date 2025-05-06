import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/banner_tipo_eventos.svg";

const TipoEventos = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro = "Cadastro Tipo de Eventos"
                    img_banner = {Banner}
                    nomes = "Título"
                    visibilidade = "none"
                />
            </main>
            <Footer />

        </>
    )
}

export default TipoEventos;