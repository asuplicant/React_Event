import { useEffect, useState } from "react";

import api from "../../Services/services";

//importar o Sweet Alert:
import Swal from 'sweetalert2';

import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import Banner from "../../assets/img/banner_cadastro_evento.svg";

const TipoEvento = () => {

    const [tiposEventos, setTiposEventos] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);

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
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    // Cadastrar Tipo Evento.
    async function cadastrarTipoEvento(e) {
        e.preventDefault();
        if (tiposEventos.trim() !== "") {
            try {
                await api.post("TipoEvento", { TituloTipoEvento: tiposEventos });
                alertar("success", "Cadastro realizado com sucesso!");
                setTiposEventos("");
                listarTipoEvento();
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte.");
                console.log(error);
            }
        } else {
            alertar("warning", "Preencha o campo.");
        }
    }

    // Listar Tipo Evento.
    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TipoEvento");
            console.log(resposta.data);
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Excluir Tipo Evento.
    async function excluirTipoEvento(id) {
        const result = await Swal.fire({
            title: "Quer mesmo excluir isso?",
            text: "Você não vai poder reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, quero deletar",
            cancelButtonText: "Não"
            
        });

        if (result.isConfirmed) {
            try {
                console.log("ID enviado para deletar:", id);
                await api.delete(`TipoEvento/${id.idTipoEvento}`);
                alertar("success", "Deletado com sucesso!");
                listarTipoEvento();
            } catch (error) {
                console.error("Erro ao deletar:", error.response || error);
                alertar("error", "Erro ao deletar.");
            }
        }
    }

    // Editar Tipo Evento.
    async function editarTipoEvento(tiposEventos) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Modifique seu Tipo Evento",
            input: "text",
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            inputLabel: "Novo Tipo Evento",
            inputValue: tiposEventos.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });

        if (novoTipoEvento) {
            try {
                await api.put(`TipoEvento/${tiposEventos.idTipoEvento}`, {
                    TituloTipoEvento: novoTipoEvento
                });

                alertar("success", "Tipo Evento Modificado!");

                await listarTipoEvento();

                Swal.fire(`Seu novo Tipo Evento é: ${novoTipoEvento}`);
            } catch (error) {
                console.error("Erro ao editar:", error);
                Swal.fire("Erro!", "Não foi possível editar o Tipo Evento.", "error");
            }
        }
    }

    // Use Effect.
    useEffect(() => {
        listarTipoEvento();
    }, []);

    
    // Retornar.
    return (
        <>
            <Header />
            <Cadastro
                tituloCadastro="Cadastro Tipo de Eventos"
                img_banner={Banner}
                nomes="Título"
                visibilidade="none"
                funcCadastro={cadastrarTipoEvento}
                valorInput={tiposEventos}
                setValorInput={setTiposEventos}
            />
            <Lista
                tituloLista="LISTA TIPO DE EVENTOS"
                titulo="Título"
                visibilidade="table-cell"
                listaTipoEvento={listaTipoEvento}
                excluirTipoEvento={excluirTipoEvento}
                editarTipoEvento={editarTipoEvento}
            />
            <Footer />
        </>
    )
}

export default TipoEvento;