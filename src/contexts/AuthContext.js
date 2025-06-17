// importar funções do React necessãrias para criar e usar contexto

import { createContext, useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";

//Cria o contexto de autenticacao, que vai permitir compartilhar dados entre componentes
const AuthContext = createContext();

//Esse componente vai envolver a aplicação (ou parte dela) e fornecer os dados de autenticação para os filhos
//provider = prover/dar
export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin");
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined;
    });



    return (
        // O AuthContext.Provider permite que qualquer componente dentro dele acesse o 'usuario' e 'setUsuario'
        //Faz com que qualquer componente que esteja dentro a <AuthProvider> consiga acessar o valor {usuario, set Usuario} usando o hook useAuth()
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    )
}

//Esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente
//Usar

export const useAuth = () => useContext(AuthContext);