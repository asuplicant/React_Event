import "./Lista.css";
import Editar from "../../assets/img/lapis.svg";
import Excluir from "../../assets/img/lixeira.svg";

const Lista = (props) => {
    return(
        <>
        <section className="lista">
            <h1>{`Lista de ${props.tituloLista}`}</h1>
            <hr className="linha_titulo" />
            
            <div className="tabela layout_grid">
                <table>
                    <thead>
                        <tr className="tabela_cabecalho">
                            <th>{props.titulo}</th>
                            <th style={{display:props.visibilidade}}>Lista</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="item_lista">
                            <td data-cell={props.titulo}>XXXXXXXXXX</td>
                            <td data-cell="Tipo Evento" style={{display:props.visibilidade}} >XXXXXXXXXX</td>
                            <td data-cell="Editar"><img src={Editar} alt="" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
        </section>
        
        </>
    )
}


export default Lista;