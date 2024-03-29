import { RespuestaLogin } from "../interfaces/respuesta.login";
import { Usuario } from "../interfaces/usuario";


export function recibirUsuario() {
    let usuario: Usuario | null = null;
    if (localStorage.getItem('datosLogin') != null) {
        usuario = (JSON.parse(localStorage.getItem('datosLogin')!) as RespuestaLogin).usuario;
    }

    return usuario;
}
export function recibirIdUsuario(usuario: Usuario | null) {
    let id = 0

    if (usuario != null) {
        id = usuario.id;
    }

    return id;
}

export function esAdmin(usuario: Usuario | null) {
    if (usuario == null) {
        return null;
    }

    let rol = usuario.roles.find((rol: any) => rol.id == 1);

    if (rol == null) {
        return null;
    }

    return rol;
}