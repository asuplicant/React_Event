import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Comentario from "../../assets/img/coment.svg"
import Informacao from "../../assets/img/informacao.svg"
import "./EventoAluno.css"
import { useEffect, useState } from "react";
import api from "../../Services/services"
import { format } from "date-fns";
import Modal from "../../components/modal/Modal";
import Toggle from "../../components/toggle/Toggle";
import Swal from "sweetalert2";

const EventoAluno = (props) => {

    const [listaEventos, setListaEventos] = useState([]);

    // Modal:
    const [tipoModal, setTipoModal] = useState("");  // "descricaoEvento" ou "comentario"
    const [dadosModal, setDadosModal] = useState({}); // descrição, idEvento, etc.
    const [modalAberto, setModalAberto] = useState(false);

    // Filtro
    const [filtroData, setFiltroData] = useState(["todos"]);

    const [usuarioId, setUsuarioId] = useState("817B69EB-ECFE-4E39-B872-F2871AF79756")

    // Listar Eventos.
    async function listarEventos() {
        try {
            //pego os eventos em geral
            const resposta = await api.get("Eventos");
            const todosOsEventos = resposta.data;

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return {
                    //AS INFORMACOES TANTO DE EVENTOS QUANTO DE EVENTOS QUE POSSUEM PRESENCA
                    ...atualEvento,// Mantém os dados originais do evento atual
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                }
            })

            setListaEventos(eventosComPresencas);

            console.log(`Informacoes de todos os eventos:`);
            console.log(todosOsEventos);

            console.log(`Informacoes de eventos com presenca:`);
            console.log(minhasPresencas);

            console.log(`Informacoes de todos os eventos com presenca:`);
            console.log(eventosComPresencas);

        } catch (error) {
            console.log(error);
        }
    }

    // USe Effect.
    useEffect(() => {
        listarEventos();
    }, [])

    // Abrir Modal.
    function abrirModal(tipo, dados) {
        //tipo de modal
        //dados
        setModalAberto(true)
        setTipoModal(tipo)
        setDadosModal(dados)
    }

    // Fechar Modal.
    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    // Manipular Presença.
    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca !== "") {
                //atualizacao: situacao para FALSE
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
                Swal.fire('Removido!', 'Sua presença foi removida.', 'success');
            } else if (idPresenca !== "") {
                //atualizacao: situacao para TRUE
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
            } else {
                //cadastrar uma nova presenca
                await api.post("PresencasEventos", { situacao: true, idUsuario: usuarioId, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
            }
            listarEventos()
        } catch (error) {
            console.log(error)
        }
    }

    // Filtrar Eventos.
    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje) return true;
            if (filtroData.includes("passados") && dataEvento < hoje) return true;

            return false;
        });
    }

    // Retornar.
    return (
        <>
            <Header />
            {/* Começando a listagem: */}
            <main className="main_lista_eventos layout-grid">
                <div className="titulo">
                    <h1>Eventos</h1>
                    <hr />
                </div>

                <select onChange={(e) => setFiltroData([e.target.value])}>
                    <option value="todos" selected>Todos os eventos</option>
                    <option value="futuros">Somente futuros</option>
                    <option value="passados">Somente passados</option>
                </select>

                <table className="tabela_lista_eventos">
                    <thead>
                        <tr className="th_lista_eventos">
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
                                        <img src={Informacao}
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


export default EventoAluno;

//Atalho para criar o componente-> rafce