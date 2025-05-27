
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

    // Cadastrar Tipo Usuário.
    async function cadastrarUsuario(e) {
        e.preventDefault();

        if (tipoUsuario.trim() !== "") {
            try {
                await api.post("TipoUsuario", { TituloTipoUsuario: tipoUsuario })
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
            const resposta = await api.get("TipoUsuario")
            console.log(resposta.data)
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
                api.delete(`TipoUsuario/${id}`)
                alertar("success", "Cadastro Excluido!")
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        });
    }

    // Use Effect.
    useEffect(() => {
        listarTipoUsuario();
    }, [listaTipoUsuario])

    // Editar Tipo Usuário.
   async function editarTipoUsuario(tiposUsuarios) {
        const { value : novoTipoUsuario } = await Swal.fire({
            title: "Modifique seu tipo de usuário", 
            input: "text",
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            inputLabel: "Novo tipo de usuário",
            inputValue: tiposUsuarios.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if(!value) {
                    return "O campo não pode estar vazio!"
                }
            }
        })
        if(novoTipoUsuario) {
            try {
                await api.put(`TipoUsuario/${tiposUsuarios.idTipoUsuario}`,
                    { TituloTipoUsuario : novoTipoUsuario})
                alertar("success", "Tipo de usuário modificado!")
            } catch (error) {
                
            }
            Swal.fire(`Seu novo tipo de usuário: ${novoTipoUsuario}`)
        }
    }   


    // Retornar.
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
                tituloLista="LISTA TIPO DE USUÁRIO"
                titulo="Titulo"
                visibilidade="none"
                listaTipoEvento={listaTipoUsuario}
                 editarTipoUsuario={editarTipoUsuario}
   excluirTipoUsuario={excluirTipoUsuario}
            />
            <Footer />
        </>
    )
}

export default TipoUsuarios;