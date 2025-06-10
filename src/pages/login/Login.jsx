import Botao from "../../components/botao/Botao.jsx";
import Logo from "../../assets/img/logo1.svg";
import Banner from "../../assets/img/fundo_login.svg";
import "./Login.css";

//importar o Sweet Alert:
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import api from "../../Services/services";

import { userDecodeToken } from "../../auth/Auth.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    // Realizar/Postar Autenticação.
    async function realizarAutenticacao(e) {
        e.preventDefault();
        // console.log(email,senha);

        const usuario = {
            email: email,
            senha: senha
        }
        if (senha.trim() !== "" || email.trim() !== "") {
            try {
                const resposta = await api.post("Login", usuario);

                const token = resposta.data.token;

                if (token) {
                    // O Token será decodificado.
                    const tokenDecodificado = userDecodeToken(token);

                    // console.log("Token decodificado: ");
                    // console.log(tokenDecodificado.tipoUsuario);

                    secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado))

                    if (tokenDecodificado.tipoUsuario === "ADM") {
                        // Redirecionar a tela de Aluno (Tela em branco).
                        navigate("/EventoAluno")
                    } else {
                        // Se não, ele vai me redirecionar para a tela de Cadastro de Eventos (Tela Vermelha)
                        navigate("/CadastroEventos")
                    }
                }

            } catch (error) {
                console.log(error);
                alert("E-mail ou senha inválidos! Para dúvidas, entre em contato com o suporte.")
            }
        } else {
            // Alerta.
            Swal.fire({
                title: "Preencha todos os campos vazios.",
                showClass: {
                    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
                },
                hideClass: {
                    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
                }
            });

        }
    }


    // Retornar.
    return (
        <main className="main_login">
            <div className="banner">
                <img src={Banner} alt="Banner do fundo do Login" />
            </div>

            <section className="section_login">
                <img src={Logo} alt="Logo do Event" />
                <form action="" className="formularioLogin" onSubmit={realizarAutenticacao} >

                    <div className="campos_login">
                        <div className="campo_imput">
                            <label htmlFor="email"></label>
                            <input className="email" type="email" name="email" placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        <div className="campo_imput">
                            <label htmlFor="senha"></label>
                            <input type="password" name="senha" placeholder="Password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />

                        </div>
                    </div>
                    <h3 className="mudar_senha">Esqueceu a senha?</h3>
                    <Botao nomeBotao="Login" />
                </form>
            </section>
        </main>
    )
}

export default Login;