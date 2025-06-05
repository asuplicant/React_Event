import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/coment.svg";
import Descricao from "../../assets/img/descricao.svg";
import Toggle from "../../components/toggle/Toggle";

import Swal from "sweetalert2";

// Importação do UseEffect e do UseState.
import { useEffect, useState } from "react";

// Importação da API.
import api from "../../Services/services";

import { format } from "date-fns";

import "./Listagem.css";
import Modal from "../../components/modal/Modal";

const Listagem = () => {
    const [listaEventos, setListaEventos] = useState([]);

    // Modal:
    const [tipoModal, setTipoModal] = useState("");
    //descricaoEvento ou comentario.
    const [dadosModal, setDadosModal] = useState({});
    //descricao, idEvento, etc.
    const [modalAberto, setModalAberto] = useState(false);

    // Filtro:
    const [filtroData, setFiltroData] = useState(["todos"]);

    const [usuarioId, setUsuarioId] = useState("1B5DF540-B942-4D6B-6729-08DDA4410779");

    // Listar Eventos.
    async function listarEventos() {
        try {
            // Pego os eventos em geral.
            const resposta = await api.get("Eventos");
            const todosOsEventos = resposta.data;

            const respostaPresenca = await api.get(`Presenca/ListarMinhasPresencas/${usuarioId}`)
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return {
                    // As informações tanto de EVENTOS quanto de EVENTOS que possuem PRESENÇA.
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresenca || null
                }
            })

            setListaEventos(eventosComPresencas);
        } catch (error) {
            console.log(error);
        }
    }

    // Use Effect.
    useEffect(() => {
        listarEventos();
    }, []);


    // Abrir Modal.
    function abrirModal(tipo, dados) {
        // Tipo de Modal & Dados.
        setModalAberto(true)
        setDadosModal(dados)
        setTipoModal(tipo)
    }

    // Função Fechar Modal.
    function fecharModal() {
        setModalAberto(false)
        setDadosModal([])
        setTipoModal("")
    }

    // Manipular Presença.
    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca !== "") {
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false })
                // Atualização da situação para FALSE.
            } else if (idPresenca !== "") {
                // Atualização da situação para TRUE.
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true })
                Swal.fire(`Confirmado!`, `Sua presença foi confirmada.`, `success`);
            } else {
                // Cadastrar uma NOVA situação.
                await api.post(`PresencasEventos/${idPresenca}`, { situacao: true, idUsuario: usuarioId, idEvento: idEvento });
                Swal.fire(`Confirmado!`, `Sua presença foi confirmada.`, `success`);
            }

            listarEventos()

        } catch (error) {
            console.log(error);

        }
    }

    function filtrarEventos(evento) {
        const hoje = new Date();

        const dataEvento = new Date(evento.dataEvento);

        if (filtroData.includes("todos")) return true;
        if (filtroData.includes("futuros") && dataEvento > hoje) return true;
        if (filtroData.includes("passados") && dataEvento < hoje) return true;

        return false;
    }


    // Retornar.
    return (
        <>
            <Header />

            <main className="main_lista_eventos layout_grid">
                <div className="titulo">
                    <h1>Eventos</h1>
                    <hr />
                </div>

                <select onChange={(e) => setFiltroData([e.target.value])} >
                    <option value="todos">Todos os eventos</option>
                    <option value="futuros">Somente futuros</option>
                    <option value="passados">Somente passados</option>
                </select>

                <table className="tabela_lista_eventos">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Data do Evento</th>
                            <th>Tipo Evento</th>
                            <th>Descrição</th>
                            <th>Comentários</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaEventos.length > 0 ? (
                            listaEventos.map((item) => (
                                <tr>
                                    <td>{item.nomeEvento}</td>
                                    <td>{format(item.dataEvento, "dd/MM/yy")}</td>
                                    <td>{item.tipoEvento.titulo}</td>
                                    <td
                                        data-cell="Descrição">
                                        <img src={Descricao}
                                            alt="Balão de descrição"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}
                                        />
                                    </td>
                                    <td
                                        data-cell="Comentário">
                                        <img src={Comentario}
                                            alt="Comentário"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })}
                                        />
                                    </td>
                                    <td
                                        data-cell="Participar">
                                        <Toggle manipular={() => (item.idEvento, item.possuiPresenca, item.idPresenca)}
                                            presenca={item.possuiPresenca}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Nenhum evento encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>

            <Footer />

            {/* Modal Aberto*/}
            {modalAberto && (
                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descrição do evento" : "Comentário"}

                    // Estou verificando qual é o tipo de Modal.
                    tipoModel={tipoModal}

                    idEvento={dadosModal.idEvento}

                    descricao={dadosModal.descricao}

                    fecharModal={fecharModal}

                />
            )}
        </>
    );
};

export default Listagem;
