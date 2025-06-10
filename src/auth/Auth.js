import { jwtDecode } from "jwt-decode";

export const userDecodeToken = (token) => {
    const decodificado = jwtDecode(token);
    return {
        idUsuario: decodeURI.jti,
        token: token,
        tipoUsuario: decodificado["Tipo do Usuário"]
    }

}