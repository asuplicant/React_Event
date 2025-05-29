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
    const [instituicao, setInstituicao] = useState("8C74EEE5-0E10-4586-8B3E-1BA334FEFEDF");

    // Alertar.
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

    // Listar Tipo de Evento.
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

    // Cadastrar Evento.
    async function cadastrarEvento(e) {
        e.preventDefault();

        const dataFormatada = dataevento.split('/').reverse().join('-');

        if (evento.trim() !== "") {
            try {
                await api.post("eventos", {
                    DataEvento: dataFormatada,
                    NomeEvento: evento,
                    Descricao: descricao,
                    IdTipoEvento: tipoevento,
                    IdInstituicao: instituicao
                });

                alertar("success", "Cadastro realizado com sucesso");

                setEvento("");
                setDataEvento("");
                setDescricao("");
                setTipoEvento("");
                setInstituicao("");

                listarEvento(); // Atualiza a lista

            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!");
                console.log(error.response ? error.response.data : error.message);

                console.log({
                    DataEvento: dataFormatada,
                    NomeEvento: evento,
                    Descricao: descricao,
                    IdTipoEvento: tipoevento,
                    IdInstituicao: instituicao
                });
            }
        } else {
            alertar("warning", "Preencha o campo!");
        }
    }


    // Use Effect.
    useEffect(() => {
        listarEvento();
        listarTipoEvento();
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
