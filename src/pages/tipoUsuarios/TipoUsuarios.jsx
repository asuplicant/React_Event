import React from "react";

import { useEffect, useState } from "react";

import api from "../../Services/services";

//importar o Sweet Alert:
import Swal from 'sweetalert2';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Banner from "../../assets/img/banner_tipo_usuarios.svg";
import Lista from "../../components/lista/Lista";

const TipoUsuarios = () => {
    const [tipoUsuario, setTipoUsuario] = useState("")
    const [listaTipoUsuario, setListaTipoUsuario] = useState([])

    // Alertar.
    function alertar(icone, mesagem) {
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
            title: mesagem
        });
    }

    // Cadastrar Usuário.
    async function cadastrarUsuario(e) {
        e.preventDefault();
        if (tipoUsuario.trim() !== "") {
            try {
                api.post("TipoUsuario", { TituloTipoUsuario: tipoUsuario })
                alertar("success", "Cadastro realizado com sucesso")
                setTipoUsuario("")
            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte!")
                console.log(error)
            }
        } else {
            alertar("warning", "Preencha o campo")
        }
    }

    // Listar Tipo Usuário.
    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("TiposUsuarios")
            setListaTipoUsuario(resposta.data);

        } catch (error) {
            console.log(error);
        }
    }

    // Excluir Tipo Usuario.
    async function excluirTipoUsuario(id) {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá desfazer esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b51d44',
            cancelButtonColor: '#b5b5b5',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`TiposUsuarios/${id.idTipoUsuario}`)
                alertar("success", "Cadastro Excluido!")
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        });
    }
    async function editarTipoUsuario(tipousuario) {
        const { value: novoUsuario } = await Swal.fire({
            title: "Modifique o tipo do usuario",
            input: "text",
            inputLabel: "Novo tipo do usuario",
            inputValue: tipoUsuario.tituloTipoUsuario,
            showCancelButton: true,
            confirmButtonColor: '#b51d44',
            cancelButtonColor: '#b5b5b5',
            resultButtonColor: '#b51d44',
            confirmButtonText: 'Sim, modificar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return "O campo precisa ser preenchido!";
                }
            }
        });
        if (novoUsuario) {
            try {
                api.put(`TiposUsuarios/${tipousuario.idTipoUsuario}`, { tituloTipoUsuario: novoUsuario });
                Swal.fire(`O usuario modificado ${novoUsuario}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        listarTipoUsuario();
    }, [listaTipoUsuario])
    return (


        <>
            <Header />
            <Cadastro
                tituloCadastro="Cadastro Tipo de Usuário"
                img_banner={Banner}
                nomes="Título"
                visibilidade="none"
                funcCadastro={cadastrarUsuario}
                valorInput={tipoUsuario}
                setValorInput={setTipoUsuario}
            />
            <Lista
                tituloLista="Lista Tipo de Evento"
                titulo="titulo"
                visibilidade="none"
                listaTipoUsuario={listaTipoUsuario}
                excluirTipoUsuario={excluirTipoUsuario}
                editarTipoUsuario={editarTipoUsuario}
            />
            <Footer />
        </>
    )
}

export default TipoUsuarios;