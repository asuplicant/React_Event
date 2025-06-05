import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../Services/services";

import Banner from "../../assets/img/banner_cadastro_evento.svg";

const CadastroEventos = () => {
    const [evento, setEvento] = useState("");
    const [listaEvento, setListaEvento] = useState([]);
    const [tipoevento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);
    const [dataevento, setDataEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [instituicao, setInstituicao] = useState("");
    const [listaInstituicao, setListaInstituicao] = useState([]);

    // Alertar
    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({
            icon: icone,
            title: mensagem,
        });
    }

    // Listar Tipo Evento.
    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Listar Evento.
    async function listarEvento() {
        try {
            const resposta = await api.get("Eventos");
            setListaEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Listar Instituições.
    async function listarInstituicoes() {
        try {
            const resposta = await api.get("Instituicoes");
            setListaInstituicao(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Cadastrar
    async function cadastrarEvento(evt) {
        evt.preventDefault();

        if (evento.trim() && tipoevento && dataevento && descricao && instituicao) {
            try {
                await api.post("Evento", {
                    nomeEvento: evento,
                    idTipoEvento: tipoevento,
                    dataEvento: dataevento,
                    descricao: descricao,
                    idInstituicao: instituicao,
                });

                alertar("success", "Cadastro realizado com sucesso!");

                setEvento("");
                setDataEvento("");
                setDescricao("");
                setTipoEvento("");
                setInstituicao("");

                listarEvento();

            } catch (error) {
                alertar("error", "Erro ao cadastrar. Contate o suporte.");
                console.log(error);
            }
        } else {
            alertar("error", "Preencha todos os campos obrigatórios.");
        }
    }

    // Use Effect.
    useEffect(() => {
        listarEvento();
        listarTipoEvento();
        listarInstituicoes();
    }, []);

    return (
        <>
            <Header nomeUsu="Administrador" />
            <Cadastro
                tituloCadastro="Cadastro de Evento"
                img_banner={Banner}
                nomes="Nome"
                funcCadastro={cadastrarEvento}
                valorInput={evento}
                setValorInput={setEvento}
                valorSelect={tipoevento}
                setValorSelect={setTipoEvento}
                valorSelect2={instituicao}
                setValorSelect2={setInstituicao}
                valorDate={dataevento}
                setValorDate={setDataEvento}
                valorText={descricao}
                setValorText={setDescricao}
                lista={listaTipoEvento}
                listaInstituicoes={listaInstituicao}
            />
            <Lista
                tituloLista="LISTA DE EVENTOS"
                titulo="Nome"
                lista={listaEvento}
                tipoLista="cadastroEvento"
            />
            <Footer />
        </>
    );
};

export default CadastroEventos;
