import "./Cadastro.css";
import Botao from "../botao/Botao"

const Cadastro = (promps) => {
    return(
            <section className="section_cadastro">
                <form action="" className="layuot_grid form_cadastro">
                    <h1>{promps.tituloCadastro}</h1>
                    <hr />
                    <div className="campos_cadastro">
                        <div className="banner_cadastro">
                            <img src={promps.img_banner} />
                         </div>
                        <div className="campo_preen">
                         <div className="campo_cad_nome">
                            <label htmlFor=""></label>
                            <input type="text" nome="nome" placeholder={promps.nomes}/>
                            </div>
                         <div className="campo_cad_genero" style={{display:promps.visibilidade}}>
                         <label htmlFor="genero"></label>
                            <select name="genero" id="">
                            <option  value="" disabled selected>Selecione</option>
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                         </select>
                            </div>
                         <Botao/>
                        </div>
                    </div>
                </form>
            </section>
    )
}

export default Cadastro;