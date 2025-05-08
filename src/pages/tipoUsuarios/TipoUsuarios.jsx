import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/banner_tipo_usuarios.svg";

const TipoUsuarios = () => {
    return (
        <>
            <Header />
            <Cadastro
                tituloCadastro="Cadastro Tipo de Usuário"
                img_banner={Banner}
                nomes="Título"
                visibilidade="none"
                textoBotao="Cadastrar"
            />
            
            <Footer />
        </>
    )
}

export default TipoUsuarios;