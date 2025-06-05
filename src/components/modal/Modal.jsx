import api from "../../Services/services";
import { useState, useEffect } from "react";
import Deletar from "../../assets/img/deletar.svg";

const Modal = (props) => {
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");
    const [usuarioId, setUsuarioId] = useState("1B5DF540-B942-4D6B-6729-08DDA4410779");

    // Listar Comentário.
    async function listarComentarios() {
        try {
            const resposta = await api.get(`Comentario/ListarSomenteExibe?id=${props.idEvento}`)
            setComentarios(resposta.data)
        } catch (error) {
            console.log(error);
        }
    }

    // Cadastrar Comentário.
    async function cadastrarComentario() {
        try {
            await api.post("ComentariosEventos", {
                idUsuario: usuarioId,
                idEvento: props.idEvento,
                descricao: comentarios})
        } catch (error) {
            console.log(error)
        }
    }

    // Deletar Excluir.
    async function deletarComentario(){
        try {
            await api.delete(`ComentariosEventos/${idComentario}`);
        } catch (error) {
            console.log(error);
            
        }
    }

    // Use Effect.
    useEffect(() => {
        listarComentarios();
    }, [])

    // Retornar.
    return (
        <>
            <div className="model-overlay" onClick={props.fecharModal}></div>
            <div className="model">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo">
                    {props.tipoModel === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>
                                    <img src={Deletar} alt="Deletar" onClick={() => { props.funcDeleta(item) }} />
                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Escreva seu comentário"
                                    value={novoComentario}
                                    onChange={(e) => setNovoComentario(e.target.value)} />
                                <button onClick={() => cadastrarComentario(novoComentario)}>
                                    Cadastrar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;
