import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/coment.svg";
import Descricao from "../../assets/img/descricao.svg";
import Toggle from "../../components/toggle/Toggle";

import { useEffect, useState } from "react";
import api from "../../Services/services";
import { format } from "date-fns";

import "./Listagem.css";
import Modal from "../../components/modal/Modal";

const Listagem = () => {
    const [listaEventos, setListaEventos] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    //descricaoEvento ou comentario.
    const [dadosModal, setDadosModal] = useState({});
    //descricao, idEvento, etc.
    const [modalAberto, setModalAberto] = useState(false);

    // Listar Eventos.
    async function listarEventos() {
        try {
            const resposta = await api.get("Eventos");
            setListaEventos(resposta.data);
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
        setTipoModal(tipo)
        setDadosModal(dados)
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

                <select defaultValue="">
                    <option value="">Todos os eventos</option>
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
                                    <td>{item.titulo}</td>
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
                                        <Toggle />
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
                    titulo={tipoModel == "descricaoEvento" ? "Descrição do evento" : "Comentário"}
                />
            )}
        </>
    );
};

export default Listagem;
