import api from "../../Services/services";
import { useState } from "react";
import Deletar from "../../assets/img/deletar.svg";

const Modal = (props) => {
    const [comentarios, setComentarios] = useState([]);
    async function listarComentarios() {
        try {
            const resposta = await api.get(`Comentario/ListarSomenteExibe?id=${props.idEvento}`)
            setComentarios(resposta.data)
        } catch (error) {
            console.log(error);
        }
    }

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
                                    placeholder="Escreva seu comentário" />
                                <button>
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
