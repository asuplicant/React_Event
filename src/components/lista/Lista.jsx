import "./Lista.css";
import Editar from "../../assets/img/lapis.svg";
import Excluir from "../../assets/img/lixeira.svg";

const Lista = (props) => {
    return(
        <>
        <section className="lista">
            <h1>{`${props.tituloLista}`}</h1>
            <hr className="linha_titulo" />
            
            <div className="tabela layout_grid">
                <table>
                    <thead>
                        <tr className="tabela_cabecalho">
                            <th className="left">{props.titulo}</th>
                            <th className="left" style={{display:props.visibilidade}}>Tipo de Evento</th>
                            <th className="right">Editar</th>
                            <th className="right">Deletar</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="item_lista">
                            <td className="left" data-cell={props.titulo}>Tipo Evento</td>
                            <td className="left" data-cell="Tipo Evento" style={{display:props.visibilidade}} >Tipo Evento</td>
                            <td className="right" data-cell="Editar"><img src={Editar} alt="" /></td>
                            <td className="right" data-cell="Excluir"><img src={Excluir} alt="" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        
        </section>
        
        </>
    )
}


export default Lista;