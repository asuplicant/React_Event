import "./Lista.css";
import Editar from "../../assets/img/lapis.svg";
import Excluir from "../../assets/img/lixeira.svg";

const Lista = (props) => {
    return (
        <>
            <section className="lista">
                <h1>{`${props.tituloLista}`}</h1>
                <hr className="linha_titulo" />

                <div className="tabela layout_grid">
                    <table>
                        <thead>
                            <tr className="tabela_cabecalho">
                               <th class="left">Título</th>
                                <th className="left" style={{ display: props.visibilidade }}>Tipo de Evento</th>
                                <th className="right">Editar</th>
                                <th className="right">Deletar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.listaTipoEvento && props.listaTipoEvento.length > 0 ? (
                                props.listaTipoEvento.map((item) => (
                                    <tr className="item_lista" key={item.idTipoEvento}>
                                        <td data-cell="Nome">{item.tituloTipoEvento}</td>
                                        <td data-cell="Editar" className="botao_edicao">
                                            <img src={Editar}
                                                alt="Caneta"
                                                onClick={() => props.editarTipoEvento(item)} />
                                        </td>
                                        <td data-cell="Excluir">
                                            <img src={Excluir}
                                                alt="lixeira"
                                                onClick={() => props.excluirTipoEvento(item.idTipoEvento)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Nada cadastrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </section>

        </>
    )
}


export default Lista;