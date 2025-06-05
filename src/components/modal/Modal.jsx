import React from 'react';

const Modal = (props) => {
    const { titulo, fecharModal, tipoModel, descricao, comentarios = [], Deletar } = props;

    return (
        <>
            <div className="modal-overlay" onClick={fecharModal}></div>
            <div className="modal">
                <h1>{titulo}</h1>
                <div className="modal-conteudo">
                    {tipoModel === "descricaoEvento" ? (
                        <p>{descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>
                                    <img src={Deletar} alt="Deletar" />
                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Escreva seu comentário"
                                />
                                <button>Cadastrar</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;
